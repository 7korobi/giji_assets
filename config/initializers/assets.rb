Rails.application.assets.register_engine('.slim', Slim::Template)

# see https://github.com/rails/sprockets/blob/master/lib/sprockets/manifest.rb
module Sprockets
  class Manifest
    def compile(*args)
      unless environment
        raise Error, "manifest requires environment for compilation"
      end

      filenames = []
      find(*args) do |asset|
        files[asset.logical_path] = {
          'logical_path' => asset.logical_path,
          'mtime'        => Time.now.iso8601,
          'size'         => asset.bytesize,
          'digest'       => asset.hexdigest,
          'integrity'    => DigestUtils.hexdigest_integrity_uri(asset.hexdigest)
        }
        assets[asset.logical_path] = asset.digest_path

        logical_path = asset.logical_path
        logical_target = File.join(dir, logical_path)

        logger.info "Writing #{logical_target}"
        asset.write_to logical_target

        filenames << asset.filename
      end
      save

      filenames
    end
  end
end
