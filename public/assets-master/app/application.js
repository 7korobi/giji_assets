var bind, binds, key, val, _i, _len, _ref, _ref1;

_ref = LOCATION.options;
for (key in _ref) {
  val = _ref[key];
  val || (val = {});
  LOCATION.options[key] = {
    type: eval(val.type || "String"),
    current: val.current || null
  };
}

_ref1 = LOCATION.bind;
for (key in _ref1) {
  binds = _ref1[key];
  LOCATION.bind[key] = {};
  for (_i = 0, _len = binds.length; _i < _len; _i++) {
    bind = binds[_i];
    LOCATION.bind[key][bind[key]] = bind;
  }
}

Vue.config({
  debug: true
});
