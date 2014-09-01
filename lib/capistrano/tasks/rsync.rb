
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
        f.puts %Q|rsync --links --recursive --exclude='.git' --exclude='.svn' ~/Dropbox/web_work/images/ /www/giji_rails/public/images/|
        %w[
          /www/giji_rails/public/
          /www/giji_assets/public/
        ].each do |path|
          options = "--links --recursive --exclude='stories' --exclude='.git' --exclude='.svn'"
          f.puts %Q|TARGET=#{path}; rsync -e "ssh -p #{server.port || 22}" #{options} $TARGET #{server.user}@#{server.hostname}:$FILE_TO &|
        end
      end
    end
    run_locally do
      execute "chmod +x #{fetch :rsync_script}"
      execute fetch(:rsync_script)
    end
  end
  before "deploy:updating", "rsync:public"
end
