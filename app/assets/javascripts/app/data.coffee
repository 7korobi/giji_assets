for key, binds of LOCATION.bind
  LOCATION.bind[key] = {}
  for bind in binds
    LOCATION.bind[key][bind[key]] = bind


Vue.config
  debug: true
