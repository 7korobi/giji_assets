
set :rsync_script, -> { "/utage/#{fetch(:application)}.rsync.sh" }

desc "deploy."
task :deploy do
  invoke "deploy:updating"
end
namespace :deploy do
  task :updating do
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
  before "deploy:updating", "rsync:public"
end
