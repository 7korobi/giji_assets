var _ref;

Url.options = LOCATION.options;

Url.bind = LOCATION.bind;

Url.routes = {
  pathname: {
    events: new Url("/:story_id/file")
  },
  search: {
    faces: new Url("faces=:chr_set~:order~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) && "?"
    }),
    stories: new Url("stories=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    events: new Url("event=:msg_mode~:msg_security~:reduce~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && "?"
    }),
    potofs: new Url("potofs=:potofs_order~:potofs_desc", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) && "?"
    }),
    folder: new Url("folder=:folder", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    scroll: new Url("scroll=:scroll", {
      unmatch: "?"
    }),
    css: new Url("css=:theme~:width~:layout~:font", {
      cookie: {
        time: 12,
        path: "/"
      },
      unmatch: "?",
      change: function(params) {
        var h, key, val, _ref1;
        h = {};
        for (key in params) {
          val = params[key];
          if ((key != null) && (val != null) && "String" === (((_ref1 = Url.options[key]) != null ? _ref1.type : void 0) || "String")) {
            h["" + val + "-" + key] = true;
          }
        }
        GUI.header(Object.keys(h));
        return window.requestAnimationFrame(function() {
          return GUI.Layout.resize();
        });
      }
    })
  }
};
new Cache.Rule("map_face").schema(function() {
  this.belongs_to("face", {
    dependent: true
  });
  this.scope(function(all) {
    return {
      active: function(order, chr_set, search) {
        order = RAILS.map_faces_orders[order].order;
        return all["in"]({
          chr_set_ids: chr_set
        }).search(search).sort("desc", function(o) {
          var _base;
          return (_base = o.win.value)[order] != null ? _base[order] : _base[order] = 0;
        });
      }
    };
  });
  this.deploy(function(o) {
    var chr_job, list, sow_auth_id, _results;
    o._id = o.face_id;
    o.win.value.合計 = o.win.all;
    list = Cache.chr_jobs.face(o.face_id).list();
    if (list) {
      o.search_words = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          chr_job = list[_i];
          _results.push(chr_job.job);
        }
        return _results;
      })();
      o.chr_set_ids = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          chr_job = list[_i];
          _results.push(chr_job.chr_set_id);
        }
        return _results;
      })();
    } else {
      o.search_words = o.chr_set_ids = [];
    }
    o.search_words.push(o.face.name);
    _results = [];
    for (sow_auth_id in o.sow_auth_id.value) {
      _results.push(o.search_words.push(sow_auth_id));
    }
    return _results;
  });
  return this.map_reduce(function(o, emit) {
    var id, item, _i, _len, _ref, _results;
    item = {
      count: 1
    };
    _ref = o.chr_set_ids;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      _results.push(emit("chr_set", id, item));
    }
    return _results;
  });
});

new Cache.Rule("map_face_story_log").schema(function() {
  this.order(function(o) {
    return o.date.max;
  });
  return this.deploy(function(o) {
    o._id = o.logid_head;
    return o.folder = o.logid_head.split("-")[0].toUpperCase();
  });
});

new Cache.Rule("item").schema(function() {
  return this.deploy(function(o) {
    return o.updated_timer != null ? o.updated_timer : o.updated_timer = new Timer(o.updated_at, {
      prop: function() {}
    });
  });
});

new Cache.Rule("message").schema(function() {
  this.order("updated_at");
  this.belongs_to("face");
  this.belongs_to("event");
  this.belongs_to("sow_auth");
  this.scope(function(all) {
    return {
      in_page: function(mode, security, reduce, search) {
        var query;
        query = all.where(function(o) {
          return o.is[mode] && o.security[security];
        });
        if (reduce) {
          query = query.distinct(reduce, "max_is");
        }
        return query.search(search);
      }
    };
  });
  this.deploy(function(o) {
    var anchor_num, vdom;
    o._id = o.event_id + "-" + o.logid;
    o.security = (function() {
      switch (false) {
        case !o.logid.match(/^([D].\d+)/):
          return {
            "delete": 1,
            think: 1,
            all: 1
          };
        case !o.logid.match(/^([qcS].\d+)|(MM\d+)/):
          return {
            open: 1,
            clan: 1,
            think: 1,
            all: 1
          };
        case o.mestype !== "MAKER":
          return {
            announce: 1,
            open: 1,
            clan: 1,
            think: 1,
            all: 1
          };
        case o.mestype !== "ADMIN":
          return {
            announce: 1,
            open: 1,
            clan: 1,
            think: 1,
            all: 1
          };
        case !o.logid.match(/^([I].\d+)|(vilinfo)|(potofs)/):
          return {
            announce: 1,
            open: 1,
            clan: 1,
            think: 1,
            all: 1
          };
        case !o.logid.match(/^([Ti].\d+)/):
          return {
            think: 1,
            all: 1
          };
        case !o.logid.match(/^([\-WPX].\d+)/):
          return {
            clan: 1,
            all: 1
          };
        default:
          return {};
      }
    })();
    o.security_list = Object.keys(o.security);
    anchor_num = o.logid.substring(2) - 0 || 0;
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
    if (o.updated_at == null) {
      o.updated_at = new Date(o.date) - 0;
    }
    if (o.updated_timer == null) {
      o.updated_timer = new Timer(o.updated_at, {
        prop: function() {}
      });
    }
    delete o.date;
    vdom = GUI.message.xxx;
    o.is = {};
    if (o.logid.match(/^vilinfo/)) {
      vdom = GUI.story;
      o.is.info = true;
    }
    if (o.logid.match(/^potofs/)) {
      vdom = GUI.potofs;
      o.is.info = true;
    }
    if (o.logid.match(/^.[I]/)) {
      vdom = GUI.message.info;
      o.is.info = true;
      o.is.talk = true;
    }
    if (o.logid.match(/^.[SX]/)) {
      vdom = GUI.message.talk;
      o.is.talk = true;
    }
    if (o.logid.match(/^.[M]/)) {
      vdom = GUI.message.memo;
      o.is.memo = true;
    }
    if (o.mestype === "MAKER") {
      vdom = GUI.message.admin;
      o.is.info = true;
    }
    if (o.mestype === "ADMIN") {
      vdom = GUI.message.admin;
      o.is.info = true;
    }
    if (o.logid.match(/^.[AB]/)) {
      vdom = GUI.message.action;
      o.is.action = true;
      o.is.talk = true;
    }
    o.vdom = vdom;
    return o.search_words = [o.log];
  });
  return this.map_reduce(function(o, emit) {
    var item, security, _i, _len, _ref, _results;
    item = {
      count: 1,
      max: o.updated_at,
      min: o.updated_at
    };
    emit("all", "all", item);
    emit("event", o.event_id, item);
    emit("face", o.face_id, item);
    _ref = o.security_list;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      security = _ref[_i];
      emit("all", security, item);
      if (o.is.info) {
        emit("info", security, item);
      }
      if (o.is.action) {
        emit("action", security, item);
      }
      if (o.is.talk) {
        emit("talk", security, item);
      }
      if (o.is.memo) {
        _results.push(emit("memo", security, item));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
});

new Cache.Rule("potof").schema(function() {
  var maskstate_order;
  maskstate_order = _.sortBy(_.keys(RAILS.maskstates), function(o) {
    return -o;
  });
  return this.deploy(function(o) {
    var mask, name, pt, role, roles, rolestate, stat_at, state, text, _i, _len;
    o._id = "" + o.event_id + "-" + o.csid + "-" + o.face_id;
    name = o.zapcount ? "" + RAILS.clearance[o.clearance] + o.name + "-" + o.zapcount : o.name;
    stat_at = 0 < o.deathday ? "" + o.deathday + "日" : "";
    pt = "live" === o.live ? o.say.say : o.say.gsay;
    (function(o) {
      var win_by_role;
      win_by_role = (function(_this) {
        return function(list) {
          var role, win, _i, _len, _ref, _ref1;
          _ref = _this.role;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            role = _ref[_i];
            win = (_ref1 = list[role]) != null ? _ref1.win : void 0;
            if (win) {
              return win;
            }
          }
          return null;
        };
      })(this);
      return function(story, events, event) {
        var is_dead_lose, is_lone_lose, win, win_juror, win_love, win_result, win_zombie, winner, zombie, _ref, _ref1;
        win_result = "参加";
        zombie = 0x040;
        switch (o.live) {
          case "mob":
            if ('juror' === story.type.mob) {
              win_juror = 'HUMAN';
            }
            break;
          case "suddendead":
            win_result = "";
        }
        win_love = (_ref = RAILS.loves[o.love]) != null ? _ref.win : void 0;
        win = win_juror || win_love || win_zombie || win_by_role(RAILS.gifts) || win_by_role(RAILS.roles) || "NONE";
        if (win === 'EVIL') {
          win = RAILS.folders[story.folder].evil;
        }
        switch (win) {
          case "LONEWOLF":
            is_dead_lose = 1;
            break;
          case "HATER":
            if (!_.include(o.role, "HATEDEVIL")) {
              is_dead_lose = 1;
            }
            break;
          case "LOVER":
            if (!_.include(o.role, "LOVEANGEL")) {
              is_lone_lose = 1;
            }
        }
        switch (story.type.game) {
          case "TROUBLE":
            if (0 === (o.rolestate & zombie)) {
              win_zombie = 'WOLF';
            }
            if ("HUMAN" === win) {
              is_dead_lose = 1;
            }
            break;
          case "LIVE_TABULA":
          case "LIVE_MILLERHOLLOW":
          case "SECRET":
            is_dead_lose = 1;
        }
        if (story.is_finish && !RAILS.folders[story.folder].role_play) {
          winner = event.winner || (events != null) && ((_ref1 = _.last(events)) != null ? _ref1.winner : void 0);
          win_result = "敗北";
          if (winner === "WIN_" + win) {
            win_result = "勝利";
          }
          if (winner !== "WIN_HUMAN" && winner !== "WIN_LOVER" && "EVIL" === win) {
            win_result = "勝利";
          }
          if ("victim" === o.live && "DISH" === win) {
            win_result = "勝利";
          }
          if (is_lone_lose && _.any(this.potofs, function(o) {
            return o.live !== 'live' && _.any(o.bonds, o.pno);
          })) {
            win_result = "敗北";
          }
          if (is_dead_lose && 'live' !== this.live) {
            win_result = "敗北";
          }
          if ("NONE" === win) {
            return win_result = "参加";
          }
        }
      };
    });
    roles = (function() {
      var _i, _len, _ref, _results;
      _ref = o.role;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        role = _ref[_i];
        _results.push(GUI.name.config(role));
      }
      return _results;
    })();
    text = [];
    if (o.rolestate != null) {
      rolestate = o.rolestate;
      for (_i = 0, _len = maskstate_order.length; _i < _len; _i++) {
        mask = maskstate_order[_i];
        if (0 === (rolestate & mask)) {
          state = RAILS.maskstates[mask];
          if (state) {
            text.push("" + state + " ");
          }
          rolestate |= mask;
        }
      }
    }
    if ('pixi' === o.sheep) {
      text.push("☑");
    }
    if ('love' === o.love) {
      text.push("♥");
    }
    if ('hate' === o.love) {
      text.push("☠");
    }
    if ('love' === o.pseudolove) {
      text.push("<s>♥</s>");
    }
    if ('hate' === o.pseudolove) {
      text.push("<s>☠</s>");
    }
    return o.view = {
      portrate: GUI.portrate(o.face_id),
      job: Cache.chr_jobs.find("" + (o.csid.toLowerCase()) + "_" + o.face_id).job,
      name: name,
      sow_auth_id: m("kbd", o.sow_auth_id),
      stat_at: stat_at,
      stat_type: RAILS.live[o.live],
      said_num: "" + o.point.saidcount + "回",
      pt: "" + pt + "pt",
      win: "",
      win_side: "",
      role: roles.join("、"),
      select: m("kbd", GUI.name.config(o.select)),
      text: o.text
    };
  });
});

new Cache.Rule("event").schema(function() {});

new Cache.Rule("story").schema(function() {
  var all_events, caption;
  this.scope(function(all) {
    return {
      menu: function(folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search) {
        return all.search(search).where(function(o) {
          var tf;
          tf = true;
          if (folder !== "all") {
            tf && (tf = o.folder === folder);
          }
          if (rating !== "all") {
            tf && (tf = o.rating === rating);
          }
          if (game !== "all") {
            tf && (tf = o.type.game === game);
          }
          if (say_limit !== "all") {
            tf && (tf = o.view.say_limit === say_limit);
          }
          if (update_at !== "all") {
            tf && (tf = o.view.update_at === update_at);
          }
          if (player_length !== "all") {
            tf && (tf = o.view.player_length === Number(player_length));
          }
          if (update_interval !== "all") {
            tf && (tf = o.view.update_interval === update_interval);
          }
          if (role_type !== "all") {
            tf && (tf = o.view.role_types.find(function(v) {
              return v === role_type;
            }));
          }
          if (event_type !== "all") {
            tf && (tf = o.view.event_types.find(function(v) {
              return v === event_type;
            }));
          }
          return tf;
        });
      }
    };
  });
  caption = function(field, key) {
    var data;
    data = field[key];
    if (data) {
      return data.CAPTION;
    } else {
      return null;
    }
  };
  all_events = Object.keys(RAILS.events);
  this.deploy(function(o) {
    var _ref, _ref1;
    if (!o.rating) {
      o.rating = "default";
    }
    o.card.role = _.difference(o.card.config, all_events);
    o.view = {
      rating: m("img", {
        src: GUI.img_head + ("/icon/cd_" + o.rating + ".png")
      }),
      update_at: Timer.hhmm(o.upd.hour, o.upd.minute),
      update_interval: "" + (o.upd.interval * 24) + "時間",
      player_length: o.vpl.last,
      role_types: GUI.names.config(o.card.role, function(name, size) {
        return name;
      }),
      event_types: GUI.names.config(o.card.event, function(name, size) {
        return name;
      }),
      role_cards: GUI.names.config(o.card.role, function(name, size) {
        return m("kbd", "" + name + "x" + size);
      }),
      event_cards: GUI.names.config(o.card.event, function(name, size) {
        return m("kbd", "" + name + "x" + size);
      }),
      say_limit: ((_ref = RAILS.saycnt[o.type.say]) != null ? _ref.CAPTION : void 0) || "――",
      game_rule: ((_ref1 = RAILS.game_rule[o.type.game]) != null ? _ref1.CAPTION : void 0) || "タブラの人狼"
    };
    return o.search_words = [o.name];
  });
  return this.map_reduce(function(o, emit) {
    var event_type, item, role_type, _i, _j, _len, _len1, _ref, _ref1, _results;
    item = {
      count: 1
    };
    emit("all", "all", item);
    emit("folder", o.folder, item);
    emit("game", o.type.game, item);
    emit("rating", o.rating, item);
    emit("say_limit", o.view.say_limit, item);
    emit("update_at", o.view.update_at, item);
    emit("update_interval", o.view.update_interval, item);
    emit("player_length", o.view.player_length, item);
    _ref = o.view.role_types;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      role_type = _ref[_i];
      emit("role_type", role_type, item);
    }
    _ref1 = o.view.event_types;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      event_type = _ref1[_j];
      _results.push(emit("event_type", event_type, item));
    }
    return _results;
  });
});
var face, messages_search, scroll_spy, _ref,
  __slice = [].slice;

GUI.ScrollSpy.global = new GUI.ScrollSpy(Url.prop.scroll);

scroll_spy = new GUI.ScrollSpy(Url.prop.scroll);

if ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) {
  Cache.rule.chr_set.schema(function() {
    return this.order(function(o) {
      return Cache.map_faces.reduce().chr_set[o._id].count;
    });
  });
  Cache.rule.map_face.set(gon.map_reduce.faces);
  GUI.if_exist("#map_faces", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var attr, chr_job, chrs, headline, job_name, map_order_set, o;
        map_order_set = RAILS.map_faces_orders[Url.prop.order()];
        chrs = Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list();
        headline = "";
        if (chrs != null ? chrs.length : void 0) {
          headline = [m("span.badge.badge-info", Cache.chr_sets.find(Url.prop.chr_set()).caption), "の" + chrs.length + "人を、", m("span.badge.badge-info", map_order_set.headline), "回数で並べています"];
        }
        return [
          m("hr.black"), m(".mark", headline), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = chrs.length; _i < _len; _i++) {
              o = chrs[_i];
              chr_job = Cache.chr_jobs.find("" + (Url.prop.chr_set()) + "_" + o.face._id);
              job_name = chr_job.job;
              attr = GUI.attrs(function() {
                var elem;
                elem = null;
                this.over(function() {
                  return GUI.Animate.jelly.up(elem);
                });
                this.out(function() {
                  return GUI.Animate.jelly.down(elem);
                });
                return this.config(function(_elem) {
                  return elem = _elem;
                });
              });
              _results.push(m(".chrbox", {
                key: o._id
              }, GUI.portrate(o.face._id, attr), m(".chrblank", m("div", job_name), m("div", o.face.name), m("div", m("a.mark", {
                href: "/map_reduce/faces/" + o.face._id
              }, "" + map_order_set.caption + " " + o.win.value[map_order_set.order] + "回")), m("div", "♥" + o.sow_auth_id.max_is))));
            }
            return _results;
          })(), m("hr.black")
        ];
      }
    });
  });
  GUI.if_exist("#chr_sets", function(dom) {
    var touch;
    touch = new GUI.TouchMenu();
    touch.icon("th-large", function() {
      return m(".guide.form-inline", m("h6", "詳しく検索してみよう"), m("input.form-control", {
        onblur: m.withAttr("value", Url.prop.search),
        onchange: m.withAttr("value", Url.prop.search),
        value: Url.prop.search()
      }), m("h6", "キャラセットを選んでみよう"), m("span.btn.btn-default", touch.start("order"), "並び順", m("span.note", "▼")), m("span.btn.btn-default", touch.start("chr_set"), "キャラセット", m("span.note", "▼")));
    });
    touch.menu_set(Url.prop, "count", {
      order: function() {
        var key, o, _ref1, _results;
        _ref1 = RAILS.map_faces_orders;
        _results = [];
        for (key in _ref1) {
          o = _ref1[key];
          _results.push(m("a", touch.btn(Url.prop.order, key), o.caption));
        }
        return _results;
      },
      chr_set: function() {
        return this.btn_list(function(key, o) {
          return Cache.chr_sets.find(key).caption;
        });
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        touch.query = Cache.map_faces;
        return touch.menu(m(".pagenavi.choice.guide.form-inline", m("a.menuicon.icon-th", GUI.TouchMenu.icons.start("th-large"), " "), m("span", "キャラセットを選んでみよう")));
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.face : void 0) != null) {
  face = Cache.map_face_detail = gon.face;
  Cache.rule.map_face_story_log.set(face.story_logs);
  face.name = Cache.faces.find(face.face_id).name;
  face.story_id_of_folders = _.groupBy(face.story_ids, function(_arg) {
    var count, k, _ref1;
    k = _arg[0], count = _arg[1];
    return (_ref1 = k.split("-")) != null ? _ref1[0] : void 0;
  });
  face.role_of_wins = _.groupBy(face.roles, function(_arg) {
    var count, k, role;
    k = _arg[0], count = _arg[1];
    role = RAILS.gifts[k] || RAILS.roles[k] || {
      group: "OTHER"
    };
    return RAILS.groups[role.group].name;
  });
  GUI.if_exist("#summary", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var letters, role, rolename, width, win;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", face.role.all), "の役職になりました"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.win.keys;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              win = _ref1[_i];
              _results.push(GUI.letter("", "" + win + " x" + face.win.value[win] + "回", (function() {
                var _j, _len1, _ref2, _results1;
                _ref2 = face.role_of_wins[win];
                _results1 = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  role = _ref2[_j];
                  rolename = GUI.name.config(role[0]);
                  width = (function() {
                    switch (false) {
                      case !(4 < rolename.length):
                        return 10.35;
                      default:
                        return 3.75;
                    }
                  })();
                  _results1.push(GUI.inline_item(function() {
                    return [this.center(width, rolename), this.right(2.5, "x" + role[1])];
                  }));
                }
                return _results1;
              })()));
            }
            return _results;
          })()
        ];
        return [m("h2", face.name + " の活躍"), face.says[0] != null ? m("h6", m("span.code", Timer.date_time_stamp(face.says[0].date.min)), m.trust("&nbsp;〜&nbsp;"), m("span.code", Timer.date_time_stamp(face.says[0].date.max))) : void 0, m("table.say.SAY", scroll_spy.mark("summary"), m("tbody", m("tr", m("td.img", GUI.portrate(face.face_id)), m("td.field", m(".msg", letters)))))];
      }
    });
  });
  GUI.if_exist("#calc", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var say, says_calc_line, says_calc_lines, says_count_line, says_count_lines, _i, _len, _ref1;
        says_count_lines = [
          m("tr.caution", m("th.msg", {
            colspan: 2
          }, "総合値"), m("th.msg", {
            style: "text-align:right"
          }, "一番長い発言"), m("th.msg", {
            style: "text-align:right"
          }, "総文字数"), m("th.msg", {
            style: "text-align:right"
          }, "総発言回数"))
        ];
        says_calc_lines = [
          m("tr.caution", m("th.msg", {
            colspan: 2
          }, "平均値"), m("th.msg", {
            style: "text-align:right"
          }, "／村数"), m("th.msg", {
            style: "text-align:right"
          }, "文字数"), m("th.msg", {
            style: "text-align:right"
          }, "発言回数"))
        ];
        _ref1 = face.says;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          say = _ref1[_i];
          says_count_line = m("tr." + say.logid_head + "AY", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.max)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.all)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.count)) + " 回"));
          says_calc_line = m("tr." + say.logid_head + "AY", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.vil)) + " 村"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.all / say.vil)) + " 字"), m("th.msg", {
            style: "text-align:right"
          }, "" + (GUI.comma(say.count / say.vil)) + " 回"));
          says_count_lines.push(says_count_line);
          says_calc_lines.push(says_calc_line);
        }
        return [m("table.say.info", scroll_spy.mark("says_count"), says_count_lines), m("table.say.info", scroll_spy.mark("says_calc"), says_calc_lines)];
      }
    });
  });
  GUI.if_exist("#village", function(dom) {
    var touch;
    touch = new GUI.TouchMenu();
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var folder, letters, story_id;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", "" + face.folder.all + "回"), "登場しました。"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.folder.keys;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              folder = _ref1[_i];
              _results.push(GUI.letter("", "" + folder + " x" + face.folder.value[folder] + "回", (function() {
                var _j, _len1, _ref2, _results1;
                _ref2 = face.story_id_of_folders[folder];
                _results1 = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  story_id = _ref2[_j];
                  _results1.push(GUI.inline_item(function() {
                    return m("a", {
                      style: "display:block; width:" + (2.8 + folder.length * 0.65) + "em; text-align:left;",
                      href: "http://7korobi.gehirn.ne.jp/stories/" + story_id[0] + ".html"
                    }, story_id[0]);
                  }));
                }
                return _results1;
              })()));
            }
            return _results;
          })()
        ];
        return m(".MAKER.guide", scroll_spy.mark("villages"), letters);
      }
    });
  });
  GUI.if_exist("#sow_user", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var length, letters, sow_auth_id, width;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", "" + face.sow_auth_ids.length + "人"), "が、", m("span.mark", "" + face.sow_auth_id.all + "回"), "登場しました。"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.sow_auth_ids;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              sow_auth_id = _ref1[_i];
              length = sow_auth_id[0].sjis_length;
              width = (function() {
                switch (false) {
                  case !(17 < length):
                    return 14.45;
                  case !(11 < length):
                    return 10.25;
                  default:
                    return 6.0;
                }
              })();
              _results.push(GUI.inline_item(function() {
                return [this.right(width, sow_auth_id[0]), this.right(2.0, "x" + sow_auth_id[1])];
              }));
            }
            return _results;
          })()
        ];
        return m(".ADMIN.guide", scroll_spy.mark("sow_users"), letters);
      }
    });
  });
}

GUI.if_exist("#contentframe", function(dom) {});

GUI.if_exist("#buttons", function(dom) {
  var layout, touch;
  if (!head.browser.ios) {
    win.on.orientation.push(function() {
      var alpha, anime, beta, box, gamma, rotate, z, _i, _len, _ref1, _ref2, _results;
      _ref1 = win.orientation, alpha = _ref1.alpha, beta = _ref1.beta, gamma = _ref1.gamma;
      z = -alpha + beta + gamma;
      rotate = "rotateZ(" + z + "deg)";
      anime = function(box) {
        box.style.webkitTransform = rotate;
        if (head.browser.ff) {
          box.style.mozTransform = rotate;
        }
        if (head.browser.ie) {
          box.style.msTransform = rotate;
        }
        if (head.browser.opera) {
          box.style.oTransform = rotate;
        }
        return box.style.transform = rotate;
      };
      _ref2 = document.querySelectorAll(".icon-cog");
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        box = _ref2[_i];
        _results.push(anime(box));
      }
      return _results;
    });
  }
  layout = new GUI.Layout(dom, -1, -1, 120);
  layout.transition();
  touch = GUI.TouchMenu.icons;
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var icon;
      switch (Url.prop.layout()) {
        case "right":
        case "center":
          layout.dx = 1;
          break;
        case "left":
          layout.dx = -1;
      }
      return m("nav", (function() {
        var _i, _len, _ref1, _results;
        _ref1 = ["warning-empty", "sitemap", "stopwatch", "home", "mail", "pin", "search", "pencil", "th-large", "cog"];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          icon = _ref1[_i];
          if (!touch.menus[icon]) {
            continue;
          }
          _results.push(m("div", touch.start(icon), m(".bigicon", m(".icon-" + icon))));
        }
        return _results;
      })());
    }
  });
});

GUI.if_exist("#topviewer", function(dom) {
  var layout;
  layout = new GUI.Layout(dom, 0, 1, 110, head.browser.ios, 0);
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return GUI.TouchMenu.icons.menu();
    }
  });
});

GUI.if_exist("#css_changer", function(dom) {
  var touch;
  GUI.attrs_to(document, "body", function() {
    this.swipe("thru");
    this.left(function(diff, flick) {
      var layout;
      layout = (function() {
        switch (Url.prop.layout()) {
          case "right":
            return "center";
          default:
            return "left";
        }
      })();
      return Url.prop.layout(layout);
    });
    return this.right(function(diff, flick) {
      var layout;
      layout = (function() {
        switch (Url.prop.layout()) {
          case "left":
            return "center";
          default:
            return "right";
        }
      })();
      return Url.prop.layout(layout);
    });
  });
  touch = new GUI.TouchMenu();
  touch.icon("cog", function() {
    return m(".guide.form-inline", m("h6", "スタイル"), m(".form-group", m("a", touch.btn(Url.prop.theme, "cinema"), "煉瓦"), m("a", touch.btn(Url.prop.theme, "night"), "月夜"), m("a", touch.btn(Url.prop.theme, "star"), "蒼穹"), m("a", touch.btn(Url.prop.theme, "wa"), "和の国")), m("h6", "幅の広さ"), m(".form-group", m("a", touch.btn(Url.prop.width, "mini"), "携帯"), m("a", touch.btn(Url.prop.width, "std"), "普通"), m("a", touch.btn(Url.prop.width, "wide"), "広域")), m("h6", "位置"), m(".form-group", m("a", touch.btn(Url.prop.layout, "left"), "左詰"), m("a", touch.btn(Url.prop.layout, "center"), "中央"), m("a", touch.btn(Url.prop.layout, "right"), "右詰")), m("h6", "位置"), m(".form-group", m("a", touch.btn(Url.prop.font, "large"), "大判"), m("a", touch.btn(Url.prop.font, "novel"), "明朝"), m("a", touch.btn(Url.prop.font, "std"), "ゴシック"), m("a", touch.btn(Url.prop.font, "small"), "繊細")));
  });
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return touch.menu(m(".pagenavi.choice.guide.form-inline", m("a.menuicon.icon-cog", GUI.TouchMenu.icons.start("cog"), " "), m(".form-group", m("a.mark", touch.btn(Url.prop.theme, "cinema"), "煉瓦"), m("a.mark", touch.btn(Url.prop.theme, "night"), "月夜"), m("a.mark", touch.btn(Url.prop.theme, "star"), "蒼穹"), m("a.mark", touch.btn(Url.prop.theme, "wa"), "和の国"))));
    }
  });
});

if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
  Cache.rule.potof.set(gon.potofs);
  GUI.if_exist("#sayfilter", function(dom) {
    var layout, touch;
    layout = new GUI.Layout(dom, 1, 1, 100);
    touch = new GUI.TouchMenu();
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var event, event_id, filter, o, potofs, _ref1;
        layout.width = win.width - Url.prop.w() - 4;
        switch (Url.prop.layout()) {
          case "right":
            layout.dx = 1;
            break;
          case "center":
            layout.dx = -1;
            layout.width /= 2;
            break;
          case "left":
            layout.dx = -1;
        }
        filter = m("div", m("h6", "スタイル"), m("span", m("a.menuicon.icon-home", touch.btn(Url.prop.msg_mode, "info"), " "), m("a.menuicon.icon-warning-empty", touch.btn(Url.prop.msg_mode, "action"), " "), m("a.menuicon.icon-chat-alt", touch.btn(Url.prop.msg_mode, "talk"), " "), m("a.menuicon.icon-mail", touch.btn(Url.prop.msg_mode, "memo"), " ")), m("span", m("a.menuicon.icon-trash", touch.btn(Url.prop.msg_security, "delete"), " "), m("a.menuicon.icon-warning-empty", touch.btn(Url.prop.msg_security, "announce"), " ")), m("span", m("a.menuicon.icon-sun", touch.btn(Url.prop.msg_security, "open"), " "), m("a.menuicon.icon-moon", touch.btn(Url.prop.msg_security, "clan"), " "), m("a.menuicon.icon-comment", touch.btn(Url.prop.msg_security, "think"), " "), m("a.menuicon.icon-chat-alt", touch.btn(Url.prop.msg_security, "all"), " ")));
        potofs = m("table.potofs", m("tbody", (function() {
          var _i, _len, _ref1, _results;
          _ref1 = Cache.potofs.list();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            o = _ref1[_i];
            _results.push(m("tr", m("th.calc", {}, o.view.job), m("th", {}, o.view.name), m("td.center", {}, o.view.sow_auth_id), m("td.calc", {}, o.view.stat_at), m("td", {}, o.view.stat_type), m("td.calc", {}, o.view.said_num), m("td.calc", {}, o.view.pt), m("td", {}, o.view.win), m("td.calc", {}, o.view.win_side), m("td", {}, o.view.role), m("td", {}, o.view.select), m("td", {}, o.view.text)));
          }
          return _results;
        })()), m("tfoot.head", m("tr", m("th[colspan=3].center", m("sup", "(スクロールします。)")), m("th.calc", m("a", touch.btn(Url.prop.potofs_order, "stat_at"), "日程")), m("th", m("a", touch.btn(Url.prop.potofs_order, "stat_type"), "状態")), m("th.calc", m("a", touch.btn(Url.prop.potofs_order, "said_num"), "発言数")), m("th.calc", m("a", touch.btn(Url.prop.potofs_order, "pt"), "残pt")), m("th", m("a", touch.btn(Url.prop.potofs_order, "win"), "勝敗")), m("th.calc", m("a", touch.btn(Url.prop.potofs_order, "win_side"), "陣営")), m("th", m("a", touch.btn(Url.prop.potofs_order, "role"), "役割")), m("th", m("a", touch.btn(Url.prop.potofs_order, "select"), "希望")), m("th", m("a", touch.btn(Url.prop.potofs_order, "text"), "補足")))));
        event_id = (_ref1 = Url.prop.scroll()) != null ? _ref1.split("-").slice(0, 3).join("-") : void 0;
        event = Cache.events.find(event_id);
        return m("div", event != null ? m(".sayfilter_heading", event.name) : m(".sayfilter_heading.bottom"), m(".insayfilter", m(".paragraph", m(".table-swipe.sayfilter_content", potofs)), m(".paragraph", m(".sayfilter_content.form-inline", m(".form-group", filter)))), m(".sayfilter_heading.bottom"));
      }
    });
  });
}

messages_search = function() {
  var event_id, mode, reduce, search, security, _ref1;
  event_id = (_ref1 = Url.prop.scroll()) != null ? _ref1.split("-").slice(0, 3).join("-") : void 0;
  mode = Url.prop.msg_mode();
  reduce = Url.prop.reduce();
  search = Url.prop.search();
  security = Url.prop.msg_security();
  return Cache.messages.in_page(mode, security, reduce, search).list();
};

if (((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && (gon.event != null)) {
  if ((typeof gon !== "undefined" && gon !== null ? gon.story : void 0) != null) {
    Cache.rule.story.set([gon.story]);
  }
  Cache.rule.event.merge(gon.events);
  GUI.if_exist("#story", function(dom) {
    var story, touch;
    story = gon.story;
    touch = new GUI.TouchMenu();
    touch.icon("home", function() {
      Url.prop.msg_mode("info");
      return Url.prop.scroll(messages_search().first._id);
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var event, event_id, _ref1;
        event_id = (_ref1 = Url.prop.scroll()) != null ? _ref1.split("-").slice(0, 3).join("-") : void 0;
        event = Cache.events.find(event_id);
        if (event != null) {
          touch.icon("sitemap", function() {
            return GUI.message.event(event, story);
          });
        } else {
          touch.icon("sitemap");
        }
        if (story != null) {
          switch (Url.prop.msg_mode()) {
            case "info":
              return GUI.message.story(story);
            default:
              return touch.menu(m("h2", m("a.menuicon.icon-book", GUI.TouchMenu.icons.start("sitemap"), " "), m("span", story.name)));
          }
        }
      }
    });
  });
  GUI.if_exist("#messages", function(dom) {
    var touch;
    scroll_spy.avg_height = 150;
    touch = new GUI.TouchMenu();
    touch.icon("pin", function() {
      Url.prop.msg_mode("pin");
      return Url.prop.scroll(messages_search().first._id);
    });
    touch.icon("stopwatch", function() {
      Url.prop.msg_mode("time");
      return Url.prop.scroll(messages_search().first._id);
    });
    touch.icon("mail", function() {
      Url.prop.msg_mode("memo");
      return Url.prop.scroll(messages_search().first._id);
    });
    touch.icon("warning-empty", function() {
      Url.prop.msg_security("announce");
      return m(".pagenavi.choice.guide.form-inline", m("h6", "アクション。"));
    });
    touch.icon("pencil", function() {});
    touch.icon("search", function() {
      return m(".pagenavi.choice.guide.form-inline", m("h6", "検索する。"), m("input.form-control", {
        onblur: m.withAttr("value", Url.prop.search),
        onchange: m.withAttr("value", Url.prop.search),
        value: Url.prop.search()
      }));
    });
    m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", messages_search(), function(o) {
          var anchor_num;
          anchor_num = o.logid.substring(2) - 0 || 0;
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
          if (o.updated_at == null) {
            o.updated_at = new Date(o.date) - 0;
          }
          if (o.updated_timer == null) {
            o.updated_timer = new Timer(o.updated_at, {
              prop: function() {}
            });
          }
          delete o.date;
          return o.vdom(o);
        });
      }
    });
    m.startComputation();
    return setTimeout(function() {
      var event, _i, _len, _ref1;
      if (gon.event.messages) {
        Cache.rule.message.merge(gon.event.messages, {
          event_id: gon.event._id
        });
      }
      _ref1 = gon.events;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        event = _ref1[_i];
        if (event.messages) {
          Cache.rule.message.merge(event.messages, {
            event_id: event._id
          });
        }
      }
      return m.endComputation();
    }, DELAY.animato);
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.villages : void 0) != null) {
  GUI.if_exist("#villages", function(dom) {
    Cache.rule.item.set(gon.villages);
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", Cache.items.list(), function(v) {
          return GUI.message.action(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.byebyes : void 0) != null) {
  GUI.if_exist("#byebyes", function(dom) {
    Cache.rule.item.set(gon.byebyes);
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", Cache.items.list(), function(v) {
          return GUI.message.action(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.history : void 0) != null) {
  GUI.if_exist("#history", function(dom) {
    Cache.rule.item.set(gon.history);
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", Cache.items.list(), function(v) {
          return GUI.message.history(v);
        });
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
  Cache.rule.story.set(gon.stories);
  GUI.if_exist("#stories", function(dom) {
    var touch, touch_sw;
    scroll_spy.avg_height = 22;
    touch_sw = new GUI.TouchMenu();
    touch = new GUI.TouchMenu();
    touch.menu_set(Url.prop, "count", {
      rating: function() {
        return this.btn_group(27, function(key, o) {
          return m("span", m("img.pull-left", {
            src: GUI.img_head + ("/icon/cd_" + o.min_is.rating + ".png")
          }), RAILS.rating[key].caption);
        });
      },
      game: function() {
        return this.btn_group(21, function(key, o) {
          return o.min_is.view.game_rule;
        });
      },
      folder: function() {
        return this.btn_group(15, function(key) {
          var _ref1;
          return (_ref1 = GAME[key]) != null ? _ref1.nation : void 0;
        });
      },
      say_limit: function() {
        return this.btn_group(15, function(key, o) {
          return o.min_is.view.say_limit;
        });
      },
      update_at: function() {
        return this.btn_group(15, function(key, o) {
          return o.min_is.view.update_at;
        });
      },
      update_interval: function() {
        return this.btn_group(15, function(key, o) {
          return o.min_is.view.update_interval;
        });
      },
      event_type: function() {
        return this.btn_group(12, function(key) {
          return key;
        });
      },
      role_type: function() {
        return this.btn_group(10, function(key) {
          return key;
        });
      },
      player_length: function() {
        return this.btn_group(9, function(key, o) {
          return o.min_is.view.player_length + "人";
        });
      }
    });
    touch.icon("home", function() {
      var icon;
      icon = touch_sw.state() ? "icon-resize-normal" : "icon-resize-full";
      return m(".pagenavi.choice.guide.form-inline", m("h6", "検索する。　　　　"), m("input.form-control", {
        onblur: m.withAttr("value", Url.prop.search),
        onchange: m.withAttr("value", Url.prop.search),
        value: Url.prop.search()
      }), m("span.btn.btn-default", touch_sw.start(true), m("i." + icon)), m("span.btn.btn-default", touch.start("folder"), m("i.icon-book"), m("span.note", "▼")), m("span.btn.btn-default", touch.start("game"), "ルール", m("span.note", "▼")), m("span.btn.btn-default", touch.start("event_type"), "事件", m("span.note", "▼")), m("span.btn.btn-default", touch.start("role_type"), "役職", m("span.note", "▼")), m("span.btn.btn-default", touch.start("rating"), "こだわり", m("span.note", "▼")), m("span.btn.btn-default", touch.start("say_limit"), "発言制限", m("span.note", "▼")), m("span.btn.btn-default", touch.start("player_length"), "人数", m("span.note", "▼")), m("span.btn.btn-default", touch.start("update_at"), "更新時刻", m("span.note", "▼")), m("span.btn.btn-default", touch.start("update_interval"), "更新間隔", m("span.note", "▼")));
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var vdom, _ref1;
        touch.query = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values())));
        vdom = touch.menu(m(".pagenavi.choice.guide.form-inline", m("a.menuicon.icon-home", GUI.TouchMenu.icons.start("home"), " "), m("span", "村を検索してみよう。")));
        vdom.push(m("table.table.table-border.table-hover", m("thead", m("tr", m("th"))), scroll_spy.pager("tbody", touch.query.list(), function(o) {
          return m("tr", {
            key: o._id
          }, touch_sw.state() ? m("td", m("a", {
            href: o.link
          }, m("code.icon-download")), m("kbd.note", o._id), m("a", {
            href: o.file
          }, m.trust(o.name)), o.view.rating, m("table", m("tbody", m("tr", m("th", "更新"), m("td", "" + o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", "" + o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m("div", o.view.role_cards), m("div", o.view.event_cards)) : m("td", m("a", {
            href: o.link
          }, m("code.icon-download")), m("kbd.note", o._id), m("a", {
            href: o.file
          }, o.name), o.view.rating));
        })));
        return vdom;
      }
    });
  });
}

GUI.if_exist("#headline", function(dom) {
  var touch;
  touch = new GUI.TouchMenu();
  touch.state("finish");
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec;
      max_vage = GAME.PERJURY.config.cfg.MAX_VILLAGES;
      max_crazy = GAME.CRAZY.config.cfg.MAX_VILLAGES;
      max_xebec = GAME.XEBEC.config.cfg.MAX_VILLAGES;
      max_ciel = GAME.CIEL.config.cfg.MAX_VILLAGES;
      max_cafe = GAME.CABALA.config.cfg.MAX_VILLAGES;
      max_pan = GAME.PAN.config.cfg.MAX_VILLAGES;
      max_morphe = GAME.MORPHE.config.cfg.MAX_VILLAGES;
      max_all = max_vage + max_crazy + max_xebec + max_ciel;
      max_all += max_cafe + max_morphe;
      return m(".choice", m("table.board", "progress" === touch.state() ? m("tr", m("th.choice[colspan=2]", m("strong", "進行中の村")), m("th.no_choice[colspan=2]", m("a", touch.start("finish"), "終了した村を見る"))) : void 0, "finish" === touch.state() ? m("tr", m("th.no_choice[colspan=2]", m("a", touch.start("progress"), "進行中の村を見る")), m("th.choice[colspan=2]", m("strong", "終了した村"))) : void 0, m("tr.link", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ")), "progress" === touch.state() ? m("tr", m("td.no_choice", m("a", {
        href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
      }, "lobby"), m("br"), "offparty", m("br"), m("br"), m("br")), m("td.no_choice", "" + max_morphe + "村:", m("a", {
        href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
      }, "morphe"), m("br"), "" + max_cafe + "村:", m("a", {
        href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
      }, "cafe"), m("br"), m("br"), m("br")), m("td.no_choice", "wolf", m("br"), "ultimate", m("br"), "allstar", m("br"), "cabala", m("br")), m("td.no_choice", "role-play", m("br"), "RP-advance", m("br"), "" + max_vage + "村:", m("a", {
        href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
      }, "perjury"), m("br"), "" + max_xebec + "村:", m("a", {
        href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
      }, "xebec"), m("br"), "" + max_crazy + "村:", m("a", {
        href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
      }, "crazy"), m("br"), "" + max_ciel + "村:", m("a", {
        href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
      }, "ciel"))) : void 0, "finish" === touch.state() ? m("tr", m("td.no_choice", m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
      }, "lobby"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
      }, "offparty"), m("br"), m("br"), m("br")), m("td.no_choice", m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
      }, "morphe"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
      }, "cafe"), m("br"), m("br"), m("br")), m("td.no_choice", m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
      }, "wolf"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
      }, "ultimate"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
      }, "allstar"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
      }, "cabala"), m("br")), m("td.no_choice", m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=RP"
      }, "role-play"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PRETENSE"
      }, "advance"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=PERJURY"
      }, "perjury"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=XEBEC"
      }, "xebec"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CRAZY"
      }, "crazy"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CIEL"
      }, "ciel"))) : void 0));
    }
  });
});


/*
  css: new Url "css=:theme-:width-:layout-:font", (params)->

  .pagenavi
    h6(ng-if="mode" style="text-align:left;") 見るログを選ぶ
    .form-inline(ng-if="mode" style="text-align:left;")
      .form-group
        a.mark(ng-click="event.show_info()") 情報
      | &thinsp;
      .form-group(ng-repeat="e in events")
        a.mark(ng-click="e.show_talk()") {{e.name}}
      .form-group(ng-if="story.news().is_progress")
        | &thinsp;/&thinsp;
        a.mark(ng-click="story.news().show_news()") 最新
        | &thinsp;
        a.mark(ng-click="story.news().show_unread()") 未読

    h6(ng-if="show_style_navi && msg_style") ログの表示方法
    .form-inline(ng-if="show_style_navi && msg_style")
      .form-group
        label
          select.form-control.input-medium(ng-model="css.value" ng-options="o.val as o.name group by o.group for o in css.select")
      | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.power"   ng-options="key as selectors.power[key] for key in selector_keys.power" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.order"   ng-options="key as selectors.order[key] for key in selector_keys.order" )
        | &thinsp;
      .form-group
        label
          select.form-control.input-mini(ng-model="msg_styles.row"   ng-options="key as selectors.row[key] for key in selector_keys.row" )
        | &thinsp;

    h6(ng-if="show_style_navi && mode") ログから表示する部分を選ぶ
    .form-inline(ng-if="show_style_navi && mode")
      .form-group.mark
        label
          input(type="radio" tabindex="-1" value="open"  ng-model="modes.view") 公開
        label
          input(type="radio" tabindex="-1" value="clan"  ng-model="modes.view") 内緒話
        label
          input(type="radio" tabindex="-1" value="think" ng-model="modes.view") 独り言
        label
          input(type="radio" tabindex="-1" value="all"   ng-model="modes.view") 全部
      | &thinsp;
      .form-group.mark
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.last") 最後の言葉
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="modes.open") 公開発言
        label.checkbox
          input(type="checkbox" tabindex="-1" ng-model="msg_styles.pl") 中身発言


    h6(ng-if="event") ページ移動
    .form-inline(ng-if="event" style="text-align:right;")
      .form-group(ng-if="page && ! event.is_news" template="navi/paginate")
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[1].value") メモ
      | &thinsp;
      .form-group(ng-if="mode")
        a.mark.click(ng-click="mode.value = mode_common[2].value") 議事
      | &thinsp;
      .form-group
        input.form-control.input-medium(type="text" ng-model="search_input" ng-blur="search.value = search_input" placeholder="ログを探す")
      | &thinsp;
      .form-group(ng-if="event.is_progress")
        a.mark.click.icon-pencil(ng-click="go.form()")
 */

GUI.if_exist("#to_root", function(dom) {
  var day_or_night;
  day_or_night = m.prop();
  return m.module(dom, {
    controller: function() {
      var hour;
      hour = 1000 * 60 * 60;
      return GUI.do_tick(function(now) {
        var zone;
        zone = now + 3 * hour;
        day_or_night(Math.floor(zone / (12 * hour)) % 2);
        return 12 * hour - zone % (12 * hour);
      });
    },
    view: function() {
      return [
        m("a", {
          href: "//giji.check.jp/"
        }, GUI.title(Url.prop.w(), Url.prop.theme(), day_or_night()))
      ];
    }
  });
});

m.endComputation();
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


