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
    end
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
