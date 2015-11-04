source 'https://rubygems.org'
ruby "2.2.3"

gem "nokogiri", "=1.6.7.rc3", platforms: [:x64_mingw]
gem "tzinfo-data", platforms: [:x64_mingw]


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 4.2.0'

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

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'coffee-script-source', '1.8.0'
gem 'livescript-rails'
gem 'livescript-source', github: "7korobi/livescript-source"

gem "bourbon"
gem "neat"

gem "slim"
gem "thor"
gem "hashie"
gem "mime-types"

group :development do
  gem "capistrano"
  gem "aws-sdk"
end
