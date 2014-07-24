        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/action"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\"><div class=\"action\"><p class=\"text ");t.b(t.v(t.d("message.style",c,p,0)));t.b("\"><b>");t.b(t.t(t.d("message.name",c,p,0)));t.b("</b><span>は、</span><span>");t.b(t.t(t.d("message.text",c,p,0)));t.b("</span></p><p class=\"mes_date\"><span>&nbsp;</span>");t.b(t.t(t.d("message.time",c,p,0)));t.b("</p></div></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/admin"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"guide ");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\"><h3 class=\"mesname\"><b>");t.b(t.t(t.d("message.name",c,p,0)));t.b("</b></h3><p class=\"text ");t.b(t.v(t.d("message.style",c,p,0)));t.b("\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p><p class=\"mes_date\"><a class=\"mark\" hogan-click=\"attention(&#39;");t.b(t.v(t.d("message.key",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(")\">注目</a>&nbsp;<a class=\"mark\" hogan-click=\"add_diary(&#39;");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(", &#39;");t.b(t.v(t.d("message.name",c,p,0)));t.b("&#39;)\">");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("</a><span>&nbsp;</span>");t.b(t.t(t.d("message.time",c,p,0)));t.b(t.t(t.d("message.cancel_btn",c,p,0)));t.b("</p></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/aim"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<table class=\"say ");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\"><tbody><tr><td class=\"img\"><img src=\"");t.b(t.v(t.d("message.img",c,p,0)));t.b("\" /></td><td class=\"field\"><div class=\"msg\"><h3 class=\"mesname\"><b>");t.b(t.t(t.d("message.name",c,p,0)));t.b("</b>&nbsp;→&nbsp;<b>");t.b(t.t(t.d("message.to",c,p,0)));t.b("</b></h3><p class=\"text ");t.b(t.v(t.d("message.style",c,p,0)));t.b("\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p><p class=\"mes_date\"><a class=\"mark\" hogan-click=\"attention(&#39;");t.b(t.v(t.d("message.key",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(")\">注目</a>&nbsp;<a class=\"mark\" hogan-click=\"add_diary(&#39;");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(", &#39;");t.b(t.v(t.d("message.name",c,p,0)));t.b("&#39;)\">");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("</a><span>&nbsp;</span>");t.b(t.t(t.d("message.time",c,p,0)));t.b(t.t(t.d("message.cancel_btn",c,p,0)));t.b("</p></div></td></tr></tbody></table>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/cast"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"formpl_gm\" template=\"navi/potofs\"></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/caution"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<p class=\"text caution\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/external"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");t.b(t.v(t.d("message.mestype",c,p,0)));t.b("\"><div class=\"action\"><p class=\"text ");t.b(t.v(t.d("message.style",c,p,0)));t.b("\"><a href=\"");t.b(t.v(t.d("message.uri",c,p,0)));t.b("\" target=\"_blank\"><span class=\"mark\">");t.b(t.v(t.d("message.protocol",c,p,0)));t.b("</span>://<span class=\"mark\">");t.b(t.v(t.d("message.host",c,p,0)));t.b("</span><span class=\"note\">");t.b(t.v(t.d("message.path",c,p,0)));t.b("</span></a></p></div></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/info"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<p class=\"text ");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p><hr class=\"invisible_hr\" />");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/memo"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<table class=\"memo ");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\"><tbody><tr><td class=\"memoleft\"><h5>");t.b(t.t(t.d("message.name",c,p,0)));t.b("</h5></td><td class=\"memoright\"><p class=\"text message.style\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p><p class=\"mes_date\">");t.b(t.t(t.d("message.time",c,p,0)));t.b("</p></td></tr></tbody></table>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["message/say"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<table class=\"say ");t.b(t.v(t.d("message.mestype",c,p,0)));t.b(" ");t.b(t.v(t.d("message._id",c,p,0)));t.b("\"><tbody><tr><td class=\"img\"><img src=\"");t.b(t.v(t.d("message.img",c,p,0)));t.b("\" /></td><td class=\"field\"><div class=\"msg\"><h3 class=\"mesname\">");t.b(t.v(t.d("message.mesicon",c,p,0)));t.b("&nbsp;<b>");t.b(t.t(t.d("message.name",c,p,0)));t.b("</b></h3><p class=\"text ");t.b(t.v(t.d("message.style",c,p,0)));t.b("\">");t.b(t.t(t.d("message.text",c,p,0)));t.b("</p><p class=\"mes_date\"><a class=\"mark\" hogan-click=\"attention(&#39;");t.b(t.v(t.d("message.key",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(")\">注目</a>&nbsp;<a class=\"mark\" hogan-click=\"add_diary(&#39;");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("&#39;, ");t.b(t.v(t.d("message.turn",c,p,0)));t.b(", &#39;");t.b(t.v(t.d("message.name",c,p,0)));t.b("&#39;)\">");t.b(t.v(t.d("message.anchor",c,p,0)));t.b("</a><span>&nbsp;</span>");t.b(t.t(t.d("message.time",c,p,0)));t.b(t.t(t.d("message.cancel_btn",c,p,0)));t.b("</p></div></td></tr></tbody></table>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sow/log_last"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"caution text\" ng-if=\"event.is_progress\" style=\"padding-left: 0;\"><table><td style=\"height: 6ex;\"><a class=\"mark glyphicon glyphicon-refresh\" hogan-click=\"pool_hand()\" style=\"font-size: 4ex;\"></a></td><td style=\"padding-left: 11px;\">⇚ ");t.b(t.v(t.d("message.timestamp",c,p,0)));t.b(" より先を見る。<br /></td></table></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sow/story_summary"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr><td><a href=\"");t.b(t.v(t.d("story.link",c,p,0)));t.b("\"><code class=\"glyphicon glyphicon-film\"></code></a><span class=\"small\">");t.b(t.v(t.d("story._id",c,p,0)));t.b("</span><a href=\"");t.b(t.v(t.d("story.file",c,p,0)));t.b("\">");t.b(t.v(t.d("story.name",c,p,0)));t.b("</a><img src=\"/images/icon/cd_");t.b(t.v(t.d("story.rating",c,p,0)));t.b(".png\" /><span class=\"note\" hide=\"stories_is_small\"><br />　　更新 : ");t.b(t.v(t.d("story.upd.time_text",c,p,0)));t.b(" ");t.b(t.v(t.d("story.upd.interval_text",c,p,0)));t.b("<br />");t.b(t.v(t.d("story.card.role_names",c,p,0)));t.b("<br />");t.b(t.v(t.d("story.card.event_names",c,p,0)));t.b("</span></td><td class=\"small\">");t.b(t.v(t.d("story.vpl.last()",c,p,0)));t.b("人</td><td class=\"small\"><span class=\"note\">");t.b(t.v(t.d("story.type.saycnt.CAPTION",c,p,0)));t.b("<br /></span>");t.b(t.v(t.d("story.type.game_rule.CAPTION",c,p,0)));t.b("</td></tr>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sow/story_summary_small"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr><td><a href=\"");t.b(t.v(t.d("story.link",c,p,0)));t.b("\"><code class=\"glyphicon glyphicon-film\"></code></a><span class=\"small\">");t.b(t.v(t.d("story._id",c,p,0)));t.b("</span><a href=\"");t.b(t.v(t.d("story.file",c,p,0)));t.b("\">");t.b(t.v(t.d("story.name",c,p,0)));t.b("</a><img src=\"/images/icon/cd_");t.b(t.v(t.d("story.rating",c,p,0)));t.b(".png\" /></td></tr>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sow/unread_info"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"message_filter\" template=\"sow/unread_info\"></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});
        this.HoganTemplates || (this.HoganTemplates = {});
        this.HoganTemplates["sow/village_info"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"message_filter\" template=\"sow/village_info\"></div>");return t.fl(); },partials: {}, subs: {  }}, "", Hogan, {});

this.DELAY = {"largo":10000,"grave":25000,"msg_delete":25000,"msg_minute":60000,"presto":100,"animato":400,"andante":1600,"lento":4000} ;

this.LOCATION = {"search":["story","timer"],"hash":["messages","news","all","page","hides","search","potof","css"],"cookie":["css"],"options":{"search":null,"width":{"current":"normal"},"layout":{"current":"stat_type"},"font":{"current":"std"},"viewed_at":{"type":"Parse.Date","current":10000},"theme":{"current":"cinema"},"item":null,"color":null,"title":null,"story_id":null,"event_id":null,"mode_id":{"current":"talk"},"potofs_order":{"current":"stat_type"},"page":{"type":"Number","current":1},"row":{"type":"Number","current":50},"hide_ids":{"type":"Parse.Array","current":[]},"message_ids":{"type":"Parse.Array","current":[]},"roletable":{"current":"ALL"},"rating":{"current":"ALL"},"game_rule":{"current":"ALL"},"potof_size":{"current":"ALL"},"card_win":{"current":"ALL"},"card_role":{"current":"ALL"},"card_event":{"current":"ALL"},"upd_time":{"current":"ALL"},"upd_interval":{"current":"ALL"}},"bind":{"page":[{"page":0}],"theme":[{"theme":"juna","item":"box-msg","color":"white","title":"審問"},{"theme":"sow","item":"box-msg","color":"white","title":"物語"},{"theme":"cinema","item":"speech","color":"white","title":"煉瓦"},{"theme":"wa","item":"speech","color":"white","title":"和の国"},{"theme":"star","item":"speech","color":"black","title":"蒼穹"},{"theme":"night","item":"speech","color":"black","title":"月夜"}]}} ;

var FixedBox, win;

win = {
  "do": {
    resize: function(e) {
      var cb, _i, _len, _ref, _results;
      win.height = window.innerHeight || $(window).height();
      win.width = window.innerWidth || $(window).width();
      win.max = {
        top: $('body').height() - win.height,
        left: $('body').width() - win.width
      };
      _ref = win.on.resize;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    scroll: function(e) {
      var cb, _i, _len, _ref, _results;
      win.left = window.pageXOffset;
      win.top = window.pageYOffset;
      if (win.max.left < win.left) {
        win.left = win.max.left;
      }
      if (win.max.top < win.top) {
        win.top = win.max.top;
      }
      if (win.left < 0) {
        win.left = 0;
      }
      if (win.top < 0) {
        win.top = 0;
      }
      _ref = win.on.scroll;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    gesture: function(e) {
      var cb, _i, _len, _ref, _results;
      _ref = win.on.gesture;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    motion: function(e) {
      var cb, _i, _len, _ref, _results;
      win.accel = e.originalEvent.acceleration;
      win.gravity = e.originalEvent.accelerationIncludingGravity;
      win.rotate = e.originalEvent.rotationRate;
      _ref = win.on.motion;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    start: function(e) {
      var cb, _i, _len, _ref, _results;
      win.is_tap = true;
      _ref = win.on.start;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    move: function(e) {
      var cb, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
      if (win.is_tap) {
        _ref = win.on.drag;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb(e));
        }
        return _results;
      } else {
        _ref1 = win.on.move;
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          cb = _ref1[_j];
          _results1.push(cb(e));
        }
        return _results1;
      }
    },
    end: function(e) {
      var cb, _i, _len, _ref, _results;
      win.is_tap = false;
      _ref = win.on.end;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb(e));
      }
      return _results;
    }
  },
  on: {
    resize: [],
    scroll: [],
    gesture: [],
    motion: [],
    start: [],
    move: [],
    drag: [],
    end: []
  },
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  accel: 0,
  gravity: 0,
  rotate: 0,
  is_tap: false,
  max: {
    top: 0,
    left: 0
  }
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

FixedBox = (function() {
  FixedBox.list = {};

  FixedBox.push = function($, dx, dy, key) {
    var _base;
    return (_base = this.list)[key] || (_base[key] = new FixedBox(dx, dy, $(key)));
  };

  function FixedBox(dx, dy, fixed_box) {
    this.dx = dx;
    this.dy = dy;
    this.box = fixed_box;
    if (this.box) {
      win.on.resize.push((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
      win.on.scroll.push((function(_this) {
        return function() {
          return _this.scroll();
        };
      })(this));
    }
  }

  FixedBox.prototype.resize = function() {
    var height, width;
    if (!this.box) {
      return;
    }
    width = win.width - this.box.width();
    height = win.height - this.box.height();
    if (this.dx < 0) {
      this.left = this.dx + width;
    }
    if (0 < this.dx) {
      this.left = this.dx;
    }
    if (this.dy < 0) {
      this.top = this.dy + height;
    }
    if (0 < this.dy) {
      return this.top = this.dy;
    }
  };

  FixedBox.prototype.scroll = function() {
    var left, top;
    if (!(this.box && head.browser.power !== "simple")) {
      return;
    }
    this.box.css({
      "z-index": (new Date).getTime(),
      position: "fixed"
    });
    if (0 === this.dx) {
      this.box.css({
        top: 0,
        left: "",
        width: this.box.parent().width()
      });
    } else {
      this.box.css({
        top: 0,
        left: 0
      });
    }
    left = this.left + win.left;
    top = this.top;
    return this.translate(left, top);
  };

  FixedBox.prototype.translate = function(left, top) {
    var transform;
    transform = "translate(" + left + "px, " + top + "px)";
    if (head.browser.webkit) {
      this.box.css("-webkit-transform", transform);
    }
    if (head.browser.mozilla) {
      this.box.css("-moz-transform", transform);
    }
    if (head.browser.ie) {
      this.box.css("-ms-transform", transform);
    }
    if (head.browser.opera) {
      this.box.css("-o-transform", transform);
    }
    return this.box.css("transform", transform);
  };

  return FixedBox;

})();
var Parse, Url, bind, binds, key, val, _i, _len, _ref, _ref1;

Parse = {
  Array: function(val) {
    if (val.split != null) {
      return val.split(",");
    } else {
      return val;
    }
  },
  Date: function(val) {
    return new Date(Number(val));
  }
};

Url = (function() {
  var pushstate;

  Url.targets = function() {
    var hash;
    return hash = {
      cookie: document.cookies,
      search: location.search,
      hash: location.hash
    };
  };

  Url.popstate = function() {
    var data, target, url_key, _ref, _results;
    _ref = Url.targets();
    _results = [];
    for (target in _ref) {
      data = _ref[target];
      if (data) {
        _results.push((function() {
          var _i, _len, _ref1, _results1;
          _ref1 = LOCATION[target];
          _results1 = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            url_key = _ref1[_i];
            _results1.push(Url.routes[url_key].popstate(data, target));
          }
          return _results1;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  pushstate = function() {
    var data, link, target, url_key, _i, _len, _ref, _ref1;
    link = location.href;
    if (typeof history !== "undefined" && history !== null) {
      _ref = Url.targets();
      for (target in _ref) {
        data = _ref[target];
        if (data) {
          _ref1 = LOCATION[target];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            url_key = _ref1[_i];
            link = Url.routes[url_key].pushstate(link);
          }
        }
      }
    }
    if (location.href !== link) {
      return history.pushState("pushstate", null, link);
    }
  };

  Url.pushstate = _.debounce(pushstate, DELAY.presto, {
    leading: false,
    trailing: true
  });

  Url.vue = new Vue({
    data: {},
    ready: function() {
      return this.$watch('$data', Url.pushstate);
    }
  });

  Url.routes = {};

  Url.boot = function() {
    $(window).on("hashchange", function(event) {
      if (event.clipboardData) {
        return console.log(event);
      } else {
        return Url.popstate();
      }
    });
    return $(window).on("popstate", function(event) {
      if (event.clipboardData) {
        return console.log(event);
      } else {
        return Url.popstate();
      }
    });
  };

  function Url(format, vue) {
    this.format = format;
    if (vue == null) {
      vue = {};
    }
    this.keys = [];
    this.scanner = new RegExp(this.format.replace(/:([a-z_]+)/ig, (function(_this) {
      return function(_, key) {
        _this.keys.push(key);
        switch (LOCATION.options[key].type) {
          case Number:
            return "([\\.0-9]+)";
          default:
            return "([^\\/\\-\\=\\.]+)";
        }
      };
    })(this), "i"));
    this.vue = new Vue(_.merge(vue, {
      data: {
        url: Url.vue.$data,
        params: []
      }
    }));
  }

  Url.prototype.popstate = function(path, target) {
    var i, key, value, _i, _len, _ref;
    this.target = target;
    this.params_in_url = [];
    this.params = [];
    this.match = this.scanner.exec(path);
    if (this.match) {
      this.match.shift();
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        key = _ref[i];
        if (key) {
          value = this.match[i];
          this.params_in_url.push(key);
          this.change(key, value);
        }
      }
    }
    this.vue.$set("url", Url.vue.$data);
    return this.vue.$set("params", this.params);
  };

  Url.prototype.pushstate = function(link) {
    var key, path, _i, _len, _ref;
    if (location[this.target] == null) {
      return link;
    }
    path = this.format;
    _ref = this.params_in_url;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      path = path.replace(RegExp(":" + key, "ig"), this.value(key));
    }
    return link.replace(this.scanner, path);
  };

  Url.prototype.change = function(key, value) {
    var subkey, subval, _ref, _results;
    this.params.push(key);
    Url.vue.$data[key] = LOCATION.options[key].type(value);
    if (LOCATION.bind[key] != null) {
      _ref = LOCATION.bind[key][Url.vue.$data[key]];
      _results = [];
      for (subkey in _ref) {
        subval = _ref[subkey];
        if (key !== subkey) {
          _results.push(this.change(subkey, subval));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  Url.prototype.value = function(key) {
    var value;
    value = Url.vue.$data[key];
    if (value != null) {
      return value;
    } else {
      return LOCATION.options[key].current;
    }
  };

  return Url;

})();

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


/*
el: the element the directive is bound to.
key: the keypath of the binding, excluding arguments and filters.
arg: the argument, if present.
expression: the raw, unparsed expression.
vm: the context ViewModel that owns this directive.
value: the current binding value.
 * <div v-href=""></div>
 */

Vue.config({
  debug: true
});

Vue.directive('href', {
  bind: function(value) {
    return this.el.addEventListener('click', (function(_this) {
      return function() {
        return _this.vm[_this.key];
      };
    })(this));
  },
  update: function(value) {
    return $(this.el).attr('href', Url.link(value));
  },
  unbind: function() {
    return this.el.removeEventListener('click', (function(_this) {
      return function() {
        return console.log('unbind');
      };
    })(this));
  }
});

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
        var h, _j, _len1, _ref2;
        h = {};
        _ref2 = this.params;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          key = _ref2[_j];
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

Url.boot();


