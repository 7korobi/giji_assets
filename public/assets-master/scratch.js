var bind, binds, key, _i, _len, _ref;

_ref = LOCATION.bind;
for (key in _ref) {
  binds = _ref[key];
  LOCATION.bind[key] = {};
  for (_i = 0, _len = binds.length; _i < _len; _i++) {
    bind = binds[_i];
    LOCATION.bind[key][bind[key]] = bind;
  }
}

Vue.config({
  debug: true
});
Url.cookie = ["css"];

Url.search = ["story", "timer"];

Url.hash = ["messages", "news", "all", "page", "hides", "search", "potof", "css", "timer"];

Url.options = LOCATION.options;

Url.bind = LOCATION.bind;

Url.routes = {
  story: new Url("/on/:story_id"),
  timer: new Url("timer=:viewed_at"),
  messages: new Url("/:event_id/messages/:message_ids/"),
  news: new Url("/:event_id/:mode_id/news/:row/"),
  all: new Url("/:event_id/:mode_id/all/"),
  page: new Url("/:event_id/:mode_id/:page.of.:row/"),
  hides: new Url("/hides/:hide_ids"),
  search: new Url("/search/:search"),
  potof: new Url("/potof/:potofs_order"),
  css: new Url("/css-:theme-:width-:layout-:font", {
    el: "html",
    ready: function() {
      var style_change, style_p;
      style_p = "";
      style_change = (function(_this) {
        return function() {
          var html;
          html = document.documentElement;
          html.className = html.className.replace(style_p, _this.style);
          return style_p = _this.style;
        };
      })(this);
      return this.$watch('url', _.debounce(style_change, DELAY.presto, {
        leading: false,
        trailing: true
      }));
    },
    computed: {
      style: function() {
        var h, key, val, _i, _len, _ref, _ref1;
        h = {};
        _ref = this.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          val = this.url[key];
          if ((key != null) && (val != null) && "String" === (((_ref1 = Url.options[key]) != null ? _ref1.type : void 0) || "String")) {
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



