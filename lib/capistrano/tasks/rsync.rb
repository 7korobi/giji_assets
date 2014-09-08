
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
      execute "rake assets:clobber"
      execute "rake assets:precompile"
    end
  end
end

namespace :rsync do
  desc "public rsync."
  task :public do
    open(fetch(:rsync_script),"w") do |f|
      f.puts %Q[FILE_TO=/home/7korobi/public_html]
      on roles(:file) do |server|
        options = "--links --recursive --exclude='.git' --exclude='.svn'"
        f.puts %Q|rsync #{options} ~/Dropbox/web_work/images/ /www/giji_assets/public/images/|
        f.puts %Q|TARGET=/www/giji_assets/public/|
        f.puts %Q|rsync -e "ssh -p #{server.port || 22}" #{options} --exclude='stories' $TARGET #{server.user}@#{server.hostname}:$FILE_TO &|
      end
    end
    run_locally do
      execute "chmod +x #{fetch :rsync_script}"
      execute fetch(:rsync_script)
    end
  end
  before "deploy:started",  "build:asset"
  before "deploy:updating", "rsync:public"
end
