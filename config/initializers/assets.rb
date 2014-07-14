Tilt::CoffeeScriptTemplate.default_bare = true

module Sprockets
  class Manifest
    def compile(*args)
      unless environment
        raise Error, "manifest requires environment for compilation"
      end
      branch = `git rev-parse --abbrev-ref HEAD`.chomp
      paths = environment.each_logical_path(*args).to_a + args.flatten.select do|fn|
        Pathname.new(fn).absolute? if fn.is_a?(String)
      end

      paths.each do |path|
        if asset = find_asset(path)
          files[asset.digest_path] = {
            'logical_path' => asset.logical_path,
            'mtime' => asset.mtime.iso8601,
            'size' => asset.bytesize,
            'digest' => asset.digest
          }
          logical_path = asset.logical_path
          assets[asset.logical_path] = asset.digest_path

          logical_target = File.join("#{dir}-#{branch}", logical_path)
          logger.info "Writing #{logical_target}"
          asset.write_to logical_target
          asset.write_to "#{logical_target}.gz" if asset.is_a?(BundledAsset)

          save
          asset
        end
      end
    end
  end
end

Dir.glob('app/yaml/*.yml').uniq.each do |path|
  file, name = /(\w+).yml/.match(path).to_a
  const = name.upcase.to_sym

  if Kernel.constants.member? const
    raise SyntaxError.new("duplicate yaml : #{path}")
  end

  set = YAML.load_file(path)
  case set
  when Hash
    env = (set[Rails.env] || set).with_indifferent_access
  else
    env = set
  end
  Kernel.const_set( const, env )
end
