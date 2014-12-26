require 'capistrano/setup'

set :rbenv_type, :user
set :rbenv_ruby, "2.2.0"

require 'capistrano/console'
import 'lib/capistrano/logger/utage.rb'
Dir.glob('lib/capistrano/tasks/*.rb').each { |rb| import rb }
