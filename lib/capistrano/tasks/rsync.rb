require "aws-sdk"
require "hashie"
require 'mime/types'

FOG = Hashie::Mash.new(yaml: YAML.load_file('config/yaml/fog.yml')).yaml
Aws.config.update({
  region: FOG.storage.region,
  credentials: Aws::Credentials.new(FOG.storage.aws_access_key_id, FOG.storage.aws_secret_access_key ),
})

set :rsync_script, -> { "/utage/#{fetch(:application)}.rsync.sh" }

desc "deploy."
task :deploy do
  invoke "deploy:starting"
  invoke "deploy:started"
  invoke "deploy:updating"
  invoke "deploy:updated"
  invoke "deploy:publishing"
  invoke "deploy:published"
  invoke "deploy:finishing"
  invoke "deploy:finished"
end
namespace :deploy do
  task :starting do end
  task :started do end
  task :updating do end
  task :updated do end
  task :publishing do end
  task :published do end
  task :finishing do end
  task :finished do end
end

namespace :build do
  desc "asset compile"
  task :asset do
    run_locally do
      branch = `git rev-parse --abbrev-ref HEAD`.chomp
      execute "rake assets:precompile"
      execute "rm public/*/.sprockets-manifest-*.json public/assets-#{branch}/*.gz || echo 'skip removing.'"
      execute "gzip -9fk public/assets-#{branch}/*"
    end
  end
end

namespace :rsync do
  desc "deploy amazon s3."
  task :amazon do
    run_locally do
      case RUBY_PLATFORM
      when /mswin|mingw/
      else
        options = "-t --links --recursive --exclude='.git' --exclude='.svn'"
        execute "rsync #{options} ~/Dropbox/web_work/images/ /www/giji_assets/public/images/"
      end
      execute "rm -rf tmp/cache/assets/development/sprockets/*"
    end

    s3 = Aws::S3::Resource.new
    bucket = s3.bucket('giji-assets')
    amazons = {}
    bucket.objects.each do |o|
      amazons[o.key] = o
    end

    caches = amazons.keys.select {|key| key[/^stories/] }
    remote_hash = amazons.select {|key, timer| not key[/^stories/]}
    remotes = remote_hash.keys.map {|key| "public/" + key }
    locals = Dir.glob("public/**/*", File::FNM_DOTMATCH).uniq.select do |path|
      next unless File.file? path
      next if path[/\.gz$/]
      true
    end

    appends = locals.select do |path|
      key = path.match(/public\/(.*)/)[1]
      if remote_hash[key]
        remote_modify = remote_hash[key].last_modified
        local_modify = File.mtime(path)

        remote_modify < local_modify
      else
        true
      end
    end
    manifest = "public/giji.appcache"
    appends |= [manifest]

    caches = locals.map {|path| path.gsub(/^public\//, "") }.grep /^(assets-|font|images)/
    File.open(manifest, "w") do |f|
      f.puts(<<-_TEXT_)
CACHE MANIFEST
# timer #{Time.now}
      _TEXT_
      f.puts caches - %w[giji.appcache]
    end

    deletes = remotes - locals
    deletes.each_with_index do |path, index|
      print "(delete #{index}/#{deletes.size})\r"

      key = path.match(/public\/(.*)/)[1]
      amazons[key].delete
    end

    skip = 0
    appends.each_with_index do |path, index|
      print "(append #{index}/#{appends.size})(skip #{skip})\r"
      unless MIME::Types.type_for(path)[0]
        skip += 1
        next
      end

      gz = path + ".gz"
      meta = {
        key: path.match(/public\/(.*)/)[1],
        acl: "public-read",
        content_type: MIME::Types.type_for(path)[0].content_type
      }
      if File.file? gz
        path = gz
        meta[:content_encoding] = 'gzip'
      end
      meta[:body] = File.open(path)

      bucket.put_object(meta)
    end
    puts "---------- transfer complete -----------"
    puts appends
    puts "-------------- (destroy) ---------------"
    puts deletes
  end

  desc "public rsync."
  task :public do
    open(fetch(:rsync_script),"w") do |f|
      options = "--links --recursive --exclude='.git' --exclude='.svn'"
      f.puts %Q[FILE_TO=/home/7korobi/public_html]
      f.puts %Q|TARGET=/www/giji_assets/public/|
      f.puts %Q|rsync #{options} ~/Dropbox/web_work/images/ /www/giji_assets/public/images/|
      on roles(:file) do |server|
        f.puts %Q|rsync -e "ssh -p #{server.port || 22}" #{options} --exclude='stories' $TARGET #{server.user}@#{server.hostname}:$FILE_TO &|
      end
      on roles(:ftp) do |server|
        f.puts %Q|lftp -u #{server.user} #{server.hostname} -e "set ftp:ssl-allow off; mirror -X .htaccess --only-newer -R /www/giji_assets/public/ /;" &|
      end
    end
    run_locally do
      execute "chmod +x #{fetch :rsync_script}"
      execute fetch(:rsync_script)
    end
  end
  before "deploy:started",  "build:asset"
  before "deploy:updating", "rsync:amazon"
end
