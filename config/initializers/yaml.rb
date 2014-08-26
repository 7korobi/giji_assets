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


%i[CS_ALL CS_ANIMAL CS_CHANGED CS_GER CS_MAD CS_RIRINRA CS_SCHOOL CS_SF CS_TIME CS_WA].each do |const|
  data = Kernel.const_get( const )
  id = data["chr_set"]["_id"]

  data["chr_set"]["chr_set_id"] = id
  data["chr_npc"].each do |o| 
    o["_id"] = "#{id}_#{o["face_id"]}"
    o["chr_set_id"] = id
  end
  data["chr_job"].each do |o|
    o["_id"] = "#{id}_#{o["face_id"]}"
    o["chr_set_id"] = id
  end
end