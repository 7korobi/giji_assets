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

this.DELAY = {"largo":10000,"grave":25000,"msg_delete":25000,"msg_minute":60000,"option":{"pc":{"presto":50,"animato":200,"andante":800,"lento":2000},"mobile":{"presto":100,"animato":400,"andante":1600,"lento":4000},"simple":{"presto":200,"animato":1000,"andante":2000,"lento":5000}}} ;

this.LOCATION = {"routes":{"story":"/on/:story_id","timer":"timer=:viewed_at","messages":"/:event_id/messages/:message_ids/","news":"/:event_id/:mode_id/news/:row/","all":"/:event_id/:mode_id/all/","page":"/:event_id/:mode_id/:page.of.:row/","hides":"/hides/:hide_ids","search":"/search/:search","potof":"/potof/:potofs_order","css":"/css.:theme.:width.:layout.:font"},"search":["story","timer"],"hash":["messages","news","all","page","hides","search","potof","css"],"cookie":["css"],"options":{"search":{"type":"String","current":""},"theme":{"type":"String","current":"cinema"},"width":{"type":"String","current":"normal"},"layout":{"type":"String","current":"stat_type"},"font":{"type":"String","current":"std"},"viewed_at":{"type":"Parse.Date","current":10000},"story_id":{"type":"String","current":null},"event_id":{"type":"String","current":null},"mode_id":{"type":"String","current":"talk"},"potofs_order":{"type":"String","current":"stat_type"},"page":{"type":"Number","current":1},"row":{"type":"Number","current":50},"hide_ids":{"type":"Parse.Array","current":[]},"message_ids":{"type":"Parse.Array","current":[]},"roletable":{"type":"String","current":"ALL"},"rating":{"type":"String","current":"ALL"},"game_rule":{"type":"String","current":"ALL"},"potof_size":{"type":"String","current":"ALL"},"card_win":{"type":"String","current":"ALL"},"card_role":{"type":"String","current":"ALL"},"card_event":{"type":"String","current":"ALL"},"upd_time":{"type":"String","current":"ALL"},"upd_interval":{"type":"String","current":"ALL"}}} ;

var Parse, Url, key, val, _ref;

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
  Url.popstate = function() {
    var url_key, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
    if (document.cookies) {
      _ref = LOCATION.cookie;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        url_key = _ref[_i];
        LOCATION.routes[url_key].popstate(document.cookies);
      }
    }
    if (location.search) {
      _ref1 = LOCATION.search;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        url_key = _ref1[_j];
        LOCATION.routes[url_key].popstate(location.search);
      }
    }
    if (location.hash) {
      _ref2 = LOCATION.hash;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        url_key = _ref2[_k];
        _results.push(LOCATION.routes[url_key].popstate(location.hash));
      }
      return _results;
    }
  };

  Url.change = function(key, value) {
    var obj;
    obj = LOCATION.options[key];
    obj.value = eval(obj.type)(value);
    return console.log([key, obj.value]);
  };

  Url.value = function(key) {
    var obj;
    console.log([key, "set"]);
    obj = LOCATION.options[key];
    return obj.value | obj.current;
  };

  function Url(path) {
    this.keys = [null];
    this.scanner = new RegExp(path.replace(/:([a-z_]+)/ig, (function(_this) {
      return function(_, key) {
        _this.keys.push(key);
        return "([^\\/\\-\\=\\.]+)";
      };
    })(this), "i"));
  }

  Url.prototype.popstate = function(path) {
    var i, key, value, _i, _len, _ref, _results;
    this.match = this.scanner.exec(path);
    if (this.match) {
      _ref = this.keys;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        key = _ref[i];
        if (key) {
          value = this.match[i];
          _results.push(Url.change(key, value));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  Url.prototype.pushstate = function(path) {
    if (this.match) {
      return path.replace(this.scanner, function(_, key) {
        return Url.value(key);
      });
    }
  };

  return Url;

})();

_ref = LOCATION.routes;
for (key in _ref) {
  val = _ref[key];
  LOCATION.routes[key] = new Url(val);
}

window.onhashchange = function(event) {
  if (event.clipboardData) {
    return console.log(event);
  } else {
    return Url.popstate();
  }
};

window.onpopstate = function(event) {
  if (event.clipboardData) {
    return console.log(event);
  } else {
    return Url.popstate();
  }
};


