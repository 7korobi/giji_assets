Url.define(LOCATION.props, LOCATION.bind);

Url.bind = LOCATION.bind;

Url.routes = {
  search: {
    css: new Url("css=:theme~:width~:layout~:font", {
      change: function(params) {
        var key, list;
        list = (function() {
          var _i, _len, _ref, _results;
          _ref = ["theme", "width", "layout", "font", "w", "item", "color"];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _results.push("" + (Url.prop[key]()) + "-" + key);
          }
          return _results;
        })();
        if (!Url.prop.human()) {
          list.push("no-player");
        }
        GUI.header(list);
        return window.requestAnimationFrame(function() {
          return GUI.Layout.resize();
        });
      }
    })
  }
};
if ("onorientationchange" in window) {
  window.addEventListener('orientationchange', win["do"].scroll);
} else {
  window.addEventListener('resize', win["do"].scroll);
}

window.addEventListener('scroll', win["do"].scroll);

if ("ondeviceorientation" in window) {
  window.addEventListener('deviceorientation', win["do"].orientation);
}

if ("ondevicemotion" in window) {
  window.addEventListener('devicemotion', win["do"].motion);
}

if ("onhashchange" in window) {
  window.addEventListener("hashchange", function(event) {
    if (event.clipboardData) {
      return console.log(event);
    } else {
      return Url.popstate();
    }
  });
}

if ("onpopstate" in window) {
  window.addEventListener("popstate", function(event) {
    if (event.clipboardData) {
      return console.log(event);
    } else {
      return Url.popstate();
    }
  });
  if (!head.browser.safari) {
    Url.popstate();
  }
}

if ("onmessage" in window) {
  window.addEventListener("message", function(event) {
    return console.log("on message");
  });
}

if ("onoffline" in window) {
  window.addEventListener("offline", function(event) {
    return console.log("on offline  onLine:" + navigator.onLine);
  });
}

if ("ononline" in window) {
  window.addEventListener("online", function(event) {
    return console.log("on online  onLine:" + navigator.onLine);
  });
}

if ("onstorage" in window) {
  window.addEventListener("storage", function(event) {
    return console.log("on storage");
  });
}

if ("onload" in window) {
  window.addEventListener("load", win["do"].load);
}
;


