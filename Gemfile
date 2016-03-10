source 'https://rubygems.org'
ruby "2.3.0"

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
gem "nokogiri", ">= 1.6.7.2"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.2'

gem 'sqlite3', :group => [:development, :test]
group :production do
  gem 'pg'
  gem 'rails_12factor'
end

# javascript
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby
gem "bson_ext"
gem 'yajl-ruby'

# Use SCSS for stylesheets
gem 'sass-rails', '>= 4.0.0'

gem "thor"
gem "hashie"
gem "mime-types"

group :development do
  gem "capistrano"
  gem "aws-sdk"
end
