Url.options = LOCATION.options;

Url.bind = LOCATION.bind;

Url.routes = {
  search: {
    css: new Url("css=:theme~:width~:layout~:font", {
      change: function(params) {
        var h, key, val, _ref;
        h = {};
        for (key in params) {
          val = params[key];
          if ((key != null) && (val != null) && "String" === (((_ref = Url.options[key]) != null ? _ref.type : void 0) || "String")) {
            h["" + val + "-" + key] = true;
          }
        }
        return GUI.header(Object.keys(h));
      }
    })
  }
};
var bind, binds, key, with_throttle, _i, _len, _ref;

_ref = LOCATION.bind;
for (key in _ref) {
  binds = _ref[key];
  LOCATION.bind[key] = {};
  for (_i = 0, _len = binds.length; _i < _len; _i++) {
    bind = binds[_i];
    LOCATION.bind[key][bind[key]] = bind;
  }
}

with_throttle = function(cb, delay) {
  return _.throttle(cb, delay, {
    leading: false,
    trailing: true
  });
};

if ("onorientationchange" in window) {
  window.addEventListener('orientationchange', win["do"].resize);
  window.addEventListener('orientationchange', with_throttle(win["do"].scroll, DELAY.lento));
} else {
  window.addEventListener('resize', win["do"].resize);
  window.addEventListener('resize', with_throttle(win["do"].scroll, DELAY.lento));
}

window.addEventListener('scroll', win["do"].scroll);

window.addEventListener('scroll', with_throttle(win["do"].resize, DELAY.lento));

if ("ondeviceorientation" in window) {
  window.addEventListener('deviceorientation', win["do"].orientation);
}

if ("ondevicemotion" in window) {
  window.addEventListener('devicemotion', win["do"].motion);
}

if ("ongesturestart" in window) {
  window.addEventListener('gesturestart', with_throttle(win["do"].start, DELAY.presto));
  window.addEventListener('gesturechange', with_throttle(win["do"].move, DELAY.presto));
  window.addEventListener('gestureend', with_throttle(win["do"].end, DELAY.presto));
}

if ("ontouchstart" in window) {
  window.addEventListener('touchstart', with_throttle(win["do"].start, DELAY.presto));
  window.addEventListener('touchmove', with_throttle(win["do"].move, DELAY.presto));
  window.addEventListener('touchend', with_throttle(win["do"].end, DELAY.presto));
} else {
  window.addEventListener('mousedown', with_throttle(win["do"].start, DELAY.presto));
  window.addEventListener('mousemove', with_throttle(win["do"].move, DELAY.presto));
  window.addEventListener('mouseup', with_throttle(win["do"].end, DELAY.presto));
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


