Dir.glob('*/yaml/*.yml').uniq.each do |path|
  file, name = /(\w+).yml/.match(path).to_a
  const = name.upcase.to_sym

  if Kernel.constants.member? const
    raise SyntaxError.new("duplicate yaml : #{path}")
  end

  set = Hashie::Mash.new(yaml: YAML.load_file(path)).yaml
  case set
  when Hash
    env = (set[Rails.env] || set)
  else
    env = set
  end
  Kernel.const_set( const, env )
end

Kernel.constants.grep(/^MSG_/).each do |const|
  data = Kernel.const_get( const )
  if data.rails
    MESSAGE.rails += data.rails
    MESSAGE.module.rails.push data.module
  end
  if data.sow
    MESSAGE.sow += data.sow
    MESSAGE.module.sow.push data.module
  end
end

Kernel.constants.grep(/^CS_/).each do |const|
  data = Kernel.const_get( const )
  id = data.chr_set._id

  data.chr_set.chr_set_id = id
  data.chr_npc.each do |o|
    o._id = "#{id}_#{o.face_id}"
    o.chr_set_id = id
  end
  data.chr_job.each do |o|
    o._id = "#{id}_#{o.face_id}"
    o.chr_set_id = id
  end
end
