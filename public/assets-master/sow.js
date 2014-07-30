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
LOCATION.pathname = [];

LOCATION.cookie = [];

LOCATION.search = [];

LOCATION.hash = ["css"];

Url.routes = {
  css: new Url("/css.:theme.:width.:layout.:font", {
    el: "html",
    ready: function() {
      var style_p;
      style_p = "";
      return this.$watch('url', (function(_this) {
        return function() {
          var html;
          html = document.documentElement;
          html.className = html.className.replace(style_p, _this.style);
          return style_p = _this.style;
        };
      })(this));
    },
    computed: {
      style: function() {
        var h, key, val, _i, _len, _ref;
        h = {};
        _ref = this.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          val = this.url[key];
          if ((key != null) && (val != null) && String === LOCATION.options[key].type) {
            h["" + val + "-" + key] = true;
          }
        }
        return Object.keys(h).join(" ");
      }
    }
  })
};
if ("onorientationchange" in window) {
  $(window).on('orientationchange', _.throttle(win["do"].resize, DELAY.presto));
  $(window).on('orientationchange', _.throttle(win["do"].scroll, DELAY.lento));
} else {
  $(window).on('resize', _.throttle(win["do"].resize, DELAY.presto));
  $(window).on('resize', _.throttle(win["do"].scroll, DELAY.lento));
}

$(window).on('scroll', _.throttle(win["do"].scroll, DELAY.presto));

$(window).on('scroll', _.throttle(win["do"].resize, DELAY.lento));

if ("ondevicemotion" in window) {
  $(window).on('devicemotion', _.throttle(win["do"].motion, DELAY.presto));
}

if ("ongesturestart" in window) {
  $(window).on('gesturestart', _.throttle(win["do"].start, DELAY.presto));
  $(window).on('gesturechange', _.throttle(win["do"].move, DELAY.presto));
  $(window).on('gestureend', _.throttle(win["do"].end, DELAY.presto));
}

if ("ontouchstart" in window) {
  $(window).on('touchstart', _.throttle(win["do"].start, DELAY.presto));
  $(window).on('touchmove', _.throttle(win["do"].move, DELAY.presto));
  $(window).on('touchend', _.throttle(win["do"].end, DELAY.presto));
} else {
  $(window).on('mousedown', _.throttle(win["do"].start, DELAY.presto));
  $(window).on('mousemove', _.throttle(win["do"].move, DELAY.presto));
  $(window).on('mouseup', _.throttle(win["do"].end, DELAY.presto));
}

if ("onhashchange" in window) {
  $(window).on("hashchange", function(event) {
    if (event.clipboardData) {
      return console.log(event);
    } else {
      return Url.popstate();
    }
  });
}

if ("onpopstate" in window) {
  $(window).on("popstate", function(event) {
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

if ("onhaschange" in window) {
  $(window).on("haschange", function(event) {
    return console.log("on haschange");
  });
}

if ("onmessage" in window) {
  $(window).on("message", function(event) {
    return console.log("on message");
  });
}

if ("onoffline" in window) {
  $(window).on("offline", function(event) {
    return console.log("on offline");
  });
}

if ("ononline" in window) {
  $(window).on("online", function(event) {
    return console.log("on online");
  });
}

if ("onstorage" in window) {
  $(window).on("storage", function(event) {
    return console.log("on storage");
  });
}
;



