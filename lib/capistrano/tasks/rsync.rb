
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
  desc "deploy heroku."
  task :heroku do
    run_locally do
      branch = `git rev-parse --abbrev-ref HEAD`.chomp
      execute "git checkout -b heroku"
      execute "git cherry-pick 27831e1bb35c39525630dea9f0595fa5dcaffc93" 
      execute "git push heroku heroku:master --force"
      execute "git checkout #{branch}"
      execute "git branch -D heroku"
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
  before "deploy:updating", "rsync:heroku"
end
