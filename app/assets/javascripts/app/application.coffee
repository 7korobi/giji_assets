for key, val of LOCATION.options
  val ||= {}
  LOCATION.options[key] =
    type: eval(val.type || "String")
    current: val.current || null

for key, binds of LOCATION.bind
  LOCATION.bind[key] = {}
  for bind in binds
    LOCATION.bind[key][bind[key]] = bind


Vue.config
  debug: true
