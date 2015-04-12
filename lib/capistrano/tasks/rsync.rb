require "fog"
require "hashie"
FOG = Hashie::Mash.new(yaml: YAML.load_file('config/yaml/fog.yml')).yaml

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
      execute "rake assets:precompile"
    end
  end
end

namespace :rsync do
  desc "deploy amazon s3."
  task :amazon do
    run_locally do
      options = "-t --links --recursive --exclude='.git' --exclude='.svn'"
      execute "rsync #{options} ~/Dropbox/web_work/images/ /www/giji_assets/public/images/"
    end

    remotes = Fog::Storage.new(FOG.storage).directories.find{|o|o.key == "giji-assets"}.files.select {|o| not o.key[/^stories/]}
    remote_hash = remotes.group_by(&:key)
    locals = Dir.glob("public/**/*", File::FNM_DOTMATCH).uniq
    appends = locals.select do |path|
      next unless File.file? path
      key = path.match(/public\/(.*)/)[1]
      if remote_hash[key]
        remote_modify = remote_hash[key][0].last_modified
        local_modify = File.mtime(path)

        remote_modify < local_modify
      else
        true
      end
    end
    deletes = remotes.map {|o| "public/" + o.key } - locals
    deletes.each_with_index do |path, index|
      print "(delete #{index}/#{deletes.size})\r"

      key = path.match(/public\/(.*)/)[1]
      remote_hash[key][0].destroy
    end
    appends.each_with_index do |path, index|
      print "(append #{index}/#{appends.size})\r"

      key = path.match(/public\/(.*)/)[1]
      remotes.create(
        key: key,
        body: File.open(path),
        public: true
      )
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
