require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module GijiAssets
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

#    config.middleware.use Rack::Deflater

    branch = `git rev-parse --abbrev-ref HEAD`.chomp
    config.action_controller.asset_host = "giji-assets.s3-website-ap-northeast-1.amazonaws.com"
    config.serve_static_files = false
    config.assets.prefix = "assets-#{branch}"
    # Compress JavaScripts and CSS.
    config.assets.precompile += %w(
      base.js
      const.js
      scratch.js
      rails.js
      sow.js
      spec.js
      spec_helper.js
      spec.css
    )



    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    config.i18n.default_locale = :ja
  end
end
