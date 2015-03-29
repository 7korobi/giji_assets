var _ref;

Url.define(LOCATION.props, LOCATION.bind);

Url.routes = {
  pathname: {
    events: new Url("/:story_id/file"),
    event: new Url("/:story_id/:turn/messages"),
    story: new Url("/:story_id.html")
  },
  hash: {
    css: new Url("css=:theme~:width~:layout~:font", {
      cookie: {
        time: 12,
        path: "/"
      },
      unmatch: "#",
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
    }),
    mode: new Url("mode=:scope~:icon", {
      unmatch: "#"
    }),
    potofs: new Url("ptf=:potofs_order~:potofs_desc~:potofs_hide", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) && "#"
    }),
    pin: new Url("pin=:back~:pins", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && "#"
    })
  },
  search: {
    faces: new Url("face=:chr_set~:order~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) && "?"
    }),
    folder: new Url("folder=:folder", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    stories: new Url("story=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) && "?"
    }),
    messages: new Url("log=:home~:talk~:memo~:open~:human~:search", {
      unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && "?"
    }),
    scrolls: new Url("scr=:scroll~:home_at~:talk_at~:memo_at", {
      unmatch: "?",
      change: function(params) {
        var folder, logid, scroll, turn, updated_at, vid, _ref1, _ref2;
        scroll = GUI.ScrollSpy.global.prop();
        _ref1 = scroll.split("-"), folder = _ref1[0], vid = _ref1[1], turn = _ref1[2], logid = _ref1[3];
        if (logid != null) {
          updated_at = ((_ref2 = Cache.messages.find(scroll)) != null ? _ref2.updated_at : void 0) || 0;
          Url.prop.updated_at(updated_at, true);
          Url.prop.event_id("" + folder + "-" + vid + "-" + turn, true);
          Url.prop.message_id("" + folder + "-" + vid + "-" + turn + "-" + logid, true);
        }
      }
    })
  }
};

win.on.resize.push(function() {
  var width;
  width = document.querySelector("#contentframe").offsetWidth;
  Url.prop.content_width = function() {
    return width;
  };
  if (width <= 770) {
    Url.prop.h1_width = function() {
      return 770;
    };
  }
  if (width <= 580) {
    Url.prop.h1_width = function() {
      return 580;
    };
  }
  if (width <= 458) {
    Url.prop.h1_width = function() {
      return 458;
    };
  }
  switch (Url.prop.layout()) {
    case "right":
      return Url.prop.right_width = function() {
        return 0;
      };
    case "center":
      return Url.prop.right_width = function() {
        return (win.width - width - 4) / 2;
      };
    case "left":
      return Url.prop.right_width = function() {
        return win.width - width - 94;
      };
  }
});

win["do"].resize();
new Cache.Rule("map_face").schema(function() {
  var item;
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
    var list, search_words, sow_auth_id;
    o._id = o.face_id;
    o.win.value.合計 = o.win.all;
    list = Cache.chr_jobs.face(o.face_id).list();
    if (list) {
      search_words = list.map(function(o) {
        return o.job;
      });
      o.chr_set_ids = list.map(function(o) {
        return o.chr_set_id;
      });
    } else {
      search_words = o.chr_set_ids = [];
    }
    search_words.push(o.face.name);
    for (sow_auth_id in o.sow_auth_id.value) {
      search_words.push(sow_auth_id);
    }
    return o.search_words = search_words.join("\t");
  });
  item = {
    count: 1
  };
  return this.map_reduce(function(o, emit) {
    var id, _i, _len, _ref, _results;
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

new Cache.Rule("event").schema(function() {
  var bit, mask, visible, _ref;
  this.order("_id");
  _ref = RAILS.message, visible = _ref.visible, bit = _ref.bit, mask = _ref.mask;
  return this.deploy(function(o) {
    o._id || (o._id = "" + o.story_id + "-" + o.turn);
    return o.event_id = o._id;
  });
});

new Cache.Rule("story").schema(function() {
  var all_events, caption;
  this.scope(function(all) {
    return {
      menu: function(folder, game, rating, event_type, role_type, say_limit, player_length, update_at, update_interval, search) {
        return all.sort("desc", "order").search(search).where(function(o) {
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
    var _base, _base1, _ref, _ref1;
    o.order = o.folder + GUI.field(o.vid, 4);
    if (!o.rating) {
      o.rating = "default";
    }
    o.user_id = o.sow_auth_id;
    o.card.role = _.difference(o.card.config, all_events);
    if ((_base = o.type).game == null) {
      _base.game = "TABULA";
    }
    if ((_base1 = o.type).mob == null) {
      _base1.mob = "visiter";
    }
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
        return m(".emboss", "" + name + "x" + size);
      }),
      event_cards: GUI.names.config(o.card.event, function(name, size) {
        return m(".emboss", "" + name + "x" + size);
      }),
      say_limit: ((_ref = RAILS.saycnt[o.type.say]) != null ? _ref.CAPTION : void 0) || "――",
      game_rule: ((_ref1 = RAILS.game_rule[o.type.game]) != null ? _ref1.CAPTION : void 0) || "タブラの人狼"
    };
    return o.search_words = o.name;
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
new Cache.Rule("message").schema(function() {
  var bit, has_face, mask, timespan, visible, _ref;
  this.order("updated_at");
  this.belongs_to("face");
  this.belongs_to("event");
  this.belongs_to("sow_auth");
  timespan = 1000 * 3600;
  Cache.messages.has_face = has_face = {};
  _ref = RAILS.message, visible = _ref.visible, bit = _ref.bit, mask = _ref.mask;
  this.scope(function(all) {
    return {
      timeline: function(mode) {
        var enables;
        enables = visible.talk[mode];
        return all.where(function(o) {
          return o.mestype === "EVENT" || (o.show & enables);
        });
      },
      anchor: function(mode, scroll) {
        var enables, folder, logid, message, regexp, turn, vid, _ref1;
        enables = RAILS.message.visible.talk[mode];
        message = Cache.messages.find(scroll);
        if (message) {
          _ref1 = scroll.split("-"), folder = _ref1[0], vid = _ref1[1], turn = _ref1[2], logid = _ref1[3];
          regexp = RegExp("<mw " + logid + "," + turn + ",");
          return all.where(function(o) {
            return (o.show & enables) && regexp.test(o.search_words);
          });
        } else {
          return all.where(function(o) {
            return false;
          });
        }
      },
      pins: function(story_id, pins) {
        return all.where(function(o) {
          return o.logid === "EVENT-DESC" || pins["" + o.turn + "-" + o.logid] && (o.story_id === story_id);
        }).sort("desc", "updated_at");
      },
      in_event: function(event_id) {
        var enables;
        enables = visible.talk.all;
        return all.where(function(o) {
          return (o.show & enables) && (event_id === o.event_id);
        });
      },
      home: function(mode) {
        var enables;
        enables = visible.home[mode];
        return all.where(function(o) {
          return o.logid === "EVENT-ASC" || (o.show & enables);
        });
      },
      talk: function(mode, open, hides, search) {
        var enables;
        enables = visible.talk[mode];
        if (!open) {
          enables &= mask.NOT_OPEN;
        }
        return all.where(function(o) {
          return o.logid === "EVENT-ASC" || (o.show & enables) && !hides[o.face_id];
        }).search(search);
      },
      memo: function(mode, uniq, hides, search) {
        var enables, query;
        enables = visible.memo[mode];
        query = all.sort("desc", "updated_at").where(function(o) {
          return o.logid === "EVENT-DESC" || (o.show & enables) && !hides[o.face_id];
        }).search(search);
        if (uniq) {
          query = query.distinct("pen", "max_is");
        }
        return query;
      },
      warning: function(hides) {
        var enables;
        enables = visible.warning.all;
        return all.where(function(o) {
          return (o.show & enables) && !hides[o.face_id];
        });
      }
    };
  });
  this.deploy(function(o) {
    var anchor_num, lognumber, logtype, vdom;
    logtype = o.logid.slice(0, 2);
    lognumber = o.logid.slice(2);
    switch (o.mestype) {
      case "QUEUE":
        o.mestype = "SAY";
    }
    switch (logtype) {
      case "IS":
        o.logid = "II" + lognumber;
        break;
      case "iS":
        o.logid = "iI" + lognumber;
        break;
      case "CS":
        o.logid = "cI" + lognumber;
        break;
      case "AS":
        o.mestype = "ADMIN";
        break;
      case "DS":
        o.mestype = "DELETED";
        break;
      case "TS":
        o.mestype = "TSAY";
    }
    o._id = o.event_id + "-" + o.logid;
    if (o.csid == null) {
      o.csid = null;
    }
    if (o.face_id == null) {
      o.face_id = null;
    }
    o.user_id = o.sow_auth_id;
    anchor_num = o.logid.slice(2) - 0 || 0;
    o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
    o.pen = "" + o.logid.slice(0, 2) + "-" + o.face_id;
    o.potof_id = "" + o.event_id + "-" + o.csid + "-" + o.face_id;
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
    o.mask = (function() {
      switch (false) {
        case !o.logid.match(/^[\-WPX]./):
          return "CLAN";
        case !o.logid.match(/^[Ti]./):
          return "THINK";
        case !o.logid.match(/^[D]./):
          o.anchor = "del";
          return "DELETE";
        default:
          return "OPEN";
      }
    })();
    o.show = (function() {
      switch (false) {
        case !o.logid.match(/^.[SX]/):
          vdom = GUI.message.talk;
          return bit.TALK;
        case !o.logid.match(/^.[AB]/):
          vdom = GUI.message.action;
          o.anchor = "act";
          return bit.ACTION;
        case !o.logid.match(/^.[M]/):
          vdom = GUI.message.memo;
          o.anchor = "memo";
          return bit.MEMO;
        case !o.logid.match(/^.I/):
          vdom = GUI.message.info;
          o.anchor = "info";
          return bit.INFO;
        default:
          return bit.EVENT;
      }
    })();
    switch (o.mestype) {
      case "MAKER":
      case "ADMIN":
        if (o.show !== bit.ACTION) {
          vdom = GUI.message.guide;
        }
        o.mask = "ANNOUNCE";
        break;
      case "EVENT":
        vdom = GUI.message.event;
        o.pen = o.event_id;
        o.mask = "ZERO";
        o.anchor = "info";
    }
    o.show &= mask[o.mask];
    o.vdom = vdom;
    return o.search_words = o.log;
  });
  return this.map_reduce(function(o, emit) {
    var item, time_id;
    has_face[o.face_id] = true;
    if (o.vdom === GUI.message.talk || o.vdom === GUI.message.guide) {
      time_id = Serial.serializer.Date(o.updated_at / timespan);
      item = {
        count: o.log.length,
        min: o.updated_at,
        max: o.updated_at
      };
      emit("mask", time_id, o.mestype, item);
      emit("mask", time_id, "all", item);
    }
    emit("event", o.event_id, {
      max: o.updated_at
    });
    return emit("pen", o.pen, {
      max: o.updated_at
    });
  });
});
new Cache.Rule("potof").schema(function() {
  var has_face, maskstate_order, win_by_role;
  maskstate_order = _.sortBy(_.keys(RAILS.maskstates), function(o) {
    return -o;
  });
  win_by_role = (function(_this) {
    return function(o, list) {
      var role, win, _i, _len, _ref, _ref1;
      _ref = o.role;
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
  this.scope(function(all) {
    return {
      view: function(is_desc, order) {
        return all.sort(is_desc, function(o) {
          return o.order[order];
        });
      }
    };
  });
  this.deploy(function(o) {
    var chr_job, face, is_dead_lose, is_lone_lose, job, mask, name, pt, pt_no, role, role_side_order, role_text, roles, rolestate, said_num, say_type, select, stat_at, stat_order, stat_type, state, text, text_str, urge, win, win_juror, win_love, win_result, win_role, win_side_order, win_zombie, winner, zombie, _i, _len, _ref;
    o._id = "" + o.event_id + "-" + o.csid + "-" + o.face_id;
    o.user_id = o.sow_auth_id;
    face = Cache.faces.find(o.face_id);
    name = face ? face.name : o.name;
    o.name = o.zapcount ? "" + RAILS.clearance[o.clearance] + name + "-" + o.zapcount : name;
    stat_at = 0 < o.deathday ? "" + o.deathday + "日" : "";
    said_num = o.point.saidcount;
    urge = o.point.actaddpt;
    pt_no = "live" === o.live ? o.say.say : o.say.gsay;
    if (o.story_epilogue) {
      pt = "∞";
    } else {
      say_type = RAILS.saycnt[o.story_type.say];
      pt = (function() {
        switch (say_type.COST_SAY) {
          case "point":
            return "" + pt_no + "pt";
          case "count":
            return "" + pt_no + "回";
          default:
            return "∞";
        }
      })();
    }
    select = GUI.name.config(o.select);
    stat_type = RAILS.live[o.live].name;
    stat_order = RAILS.live[o.live].order;
    win_result = "参加";
    zombie = 0x040;
    switch (o.story_type.game) {
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
    switch (o.live) {
      case "mob":
        if ('juror' === o.story_type.mob) {
          win_juror = 'HUMAN';
        }
        break;
      case "suddendead":
        win_result = "";
    }
    win_love = (_ref = RAILS.loves[o.love]) != null ? _ref.win : void 0;
    win_role = win_by_role(o, RAILS.gifts) || win_by_role(o, RAILS.roles) || "NONE";
    win = win_juror || win_love || win_zombie || win_role;
    if (win === 'EVIL') {
      win = RAILS.folders[o.story_folder].evil;
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
    if (o.story_epilogue && "suddendead" !== o.live) {
      winner = o.event_winner;
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
        win_result = "参加";
      }
    }
    role_side_order = RAILS.wins[win_role].order;
    win_side_order = RAILS.wins[win].order;
    roles = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = o.role;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        role = _ref1[_i];
        _results.push(GUI.name.config(role));
      }
      return _results;
    })();
    role_text = roles.join("、");
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
    text_str = text.join();
    o.order = {
      stat_at: [o.deathday, stat_order],
      stat_type: [stat_order, o.deathday],
      said_num: [said_num, pt_no, urge],
      pt: [pt_no, said_num, urge],
      urge: [urge, pt_no, said_num],
      win_result: [win_result, win_side_order, text_str, role_text],
      win_side: [win_side_order, win_result, text_str, role_text],
      role: [role_side_order, role_text, win_side_order, select, text_str],
      select: [select, role_side_order, role_text, win_side_order, text_str],
      text: [text_str, win_side_order, role_side_order, role_text, select]
    };
    chr_job = Cache.chr_jobs.find("" + (o.csid.toLowerCase()) + "_" + o.face_id);
    job = chr_job ? chr_job.job : "***";
    return o.view = {
      portrate: GUI.portrate(o.face_id),
      job: job,
      user_id: m("kbd", o.user_id),
      stat_at: stat_at,
      stat_type: stat_type,
      said_num: "" + said_num + "回",
      pt: pt,
      urge: String.fromCharCode(urge ? 9311 + urge : 3000),
      win: win,
      win_result: win_result,
      win_side: RAILS.wins[win].name,
      role: role_text,
      select: select ? m("kbd", select) : "",
      text: text_str
    };
  });
  has_face = {};
  Cache.potofs.has_face = has_face;
  return this.map_reduce(function(o, emit) {
    return has_face[o.face_id] = o;
  });
});
var face, icon_menu, icon_mode_menu, messages, potofs_portrates, scroll_spy, security_modes, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
  __slice = [].slice;

Cache.potofs.has_faces = {
  all: function() {
    delete Cache.messages.has_face.undefined;
    delete Cache.messages.has_face["null"];
    delete Cache.messages.has_face.admin;
    delete Cache.messages.has_face.maker;
    return Object.keys(Cache.messages.has_face).sort();
  },
  potofs: function() {
    return Object.keys(Cache.potofs.has_face).sort();
  },
  others: function() {
    var face_id, _i, _len, _ref, _results;
    _ref = Cache.potofs.has_faces.all();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      face_id = _ref[_i];
      if (Cache.potofs.has_face[face_id]) {
        continue;
      }
      _results.push(face_id);
    }
    return _results;
  }
};

scroll_spy = GUI.ScrollSpy.global = new GUI.ScrollSpy(Url.prop.scroll);

icon_mode_menu = new GUI.MenuTree;

icon_mode_menu.state = Url.prop.scope;

icon_menu = new GUI.MenuTree.Icon;

icon_menu.state = Url.prop.icon;

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
          headline = [m(".GSAY.badge", Cache.chr_sets.find(Url.prop.chr_set()).caption), "の" + chrs.length + "人を、", m(".GSAY.badge", map_order_set.headline), "回数で並べています"];
        }
        return [
          m("div", headline), m("hr.black"), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = chrs.length; _i < _len; _i++) {
              o = chrs[_i];
              chr_job = Cache.chr_jobs.find("" + (Url.prop.chr_set()) + "_" + o.face._id);
              job_name = chr_job.job;
              attr = GUI.attrs({}, function() {
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
              }, GUI.portrate(o.face._id, attr), m(".chrblank.line4", m("div", job_name), m("div", o.face.name), m("div", m("a.mark", {
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
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return icon_menu.icon("th-large", {
          deploy: function(main_menu) {
            main_menu.drill("order", {
              caption: "並び順",
              view: function() {
                var key, o, _ref1, _results;
                _ref1 = RAILS.map_faces_orders;
                _results = [];
                for (key in _ref1) {
                  o = _ref1[key];
                  _results.push(m("span", Btn.set({}, Url.prop.order, key), o.caption));
                }
                return _results;
              }
            });
            return main_menu.drill("chr_set", {
              caption: "キャラセット",
              view: function(sub_menu) {
                return sub_menu.radio({
                  "class": "chr_set"
                }, Url.prop.chr_set, Cache.map_faces.reduce(), "chr_set", function(key) {
                  return Cache.chr_sets.find(key).caption;
                });
              }
            });
          },
          view: function(main_menu) {
            return m(".paragraph.guide", m("h6", "詳しく検索してみよう"), m("input.small", Txt.input(Url.prop.search)), m("span", "検索条件：キャラクター名 / 肩書き / プレイヤー "), m("h6", "キャラセットを選んでみよう"), main_menu.drills({}, ["order", "chr_set"]));
          }
        });
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
    return RAILS.wins[role.group].name;
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
        return [m("h2", face.name + " の活躍"), face.says[0] != null ? m("h6", m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.min))), m("span", m.trust("&nbsp;〜&nbsp;")), m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.max)))) : void 0, m("table.SAY.talk", scroll_spy.mark("summary"), m("tr", m("th", GUI.portrate(face.face_id)), m("td", m(".msg", letters))))];
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
          }, "総合値"), m("th.msg.calc", "一番長い発言"), m("th.msg.calc", "総文字数"), m("th.msg.calc", "総発言回数"))
        ];
        says_calc_lines = [
          m("tr.caution", m("th.msg", {
            colspan: 2
          }, "平均値"), m("th.msg.calc", "／村数"), m("th.msg.calc", "文字数"), m("th.msg.calc", "発言回数"))
        ];
        _ref1 = face.says;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          say = _ref1[_i];
          says_count_line = m("tr." + say.logid_head + "AY.line", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg.calc", "" + (GUI.comma(say.max)) + " 字"), m("th.msg.calc", "" + (GUI.comma(say.all)) + " 字"), m("th.msg.calc", "" + (GUI.comma(say.count)) + " 回"));
          says_calc_line = m("tr." + say.logid_head + "AY.line", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg.calc", "" + (GUI.comma(say.vil)) + " 村"), m("th.msg.calc", "" + (GUI.comma(say.all / say.vil)) + " 字"), m("th.msg.calc", "" + (GUI.comma(say.count / say.vil)) + " 回"));
          says_count_lines.push(says_count_line);
          says_calc_lines.push(says_calc_line);
        }
        return [m("table.info", scroll_spy.mark("says_count"), says_count_lines), m("table.info", scroll_spy.mark("says_calc"), says_calc_lines)];
      }
    });
  });
  GUI.if_exist("#village", function(dom) {
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
                    return this.left(2.8 + folder.length * 0.65, m("a", {
                      href: "http://7korobi.gehirn.ne.jp/stories/" + story_id[0] + ".html"
                    }, story_id[0]));
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
  var layout;
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
  layout = new GUI.Layout(dom, 1, -1, 120);
  layout.width = 90;
  layout.transition();
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var badges, section, vdoms;
      vdoms = [];
      section = function(icon) {
        var vdom;
        if (!icon_menu.nodes[icon]) {
          return;
        }
        vdom = m("section", icon_menu.start({}, icon), m(".bigicon", m(".icon-" + icon, " ")), badges[icon] ? m(".badge.pull-right", badges[icon]()) : void 0);
        return vdoms.push(vdom);
      };
      badges = {
        "pin": function() {
          return messages.pins(Url.prop).list().length - Cache.events.list().length;
        },
        "home": function() {
          return Cache.messages.home("announce").list().length - Cache.events.list().length;
        },
        "mail": function() {
          var prop;
          prop = _.merge({}, Url.prop, {
            memo: function() {
              return "all";
            },
            uniq: function() {
              return true;
            },
            search: function() {
              return "";
            }
          });
          return messages.memo(prop).list().length - Cache.events.list().length;
        },
        "clock": function() {
          var prop;
          prop = _.merge({}, Url.prop, {
            talk: function() {
              return "all";
            },
            open: function() {
              return true;
            },
            search: function() {
              return "";
            }
          });
          return messages.history(prop).list().length - Cache.events.list().length;
        },
        "chat-alt": function() {
          var prop;
          prop = _.merge({}, Url.prop, {
            talk: function() {
              return "all";
            },
            open: function() {
              return true;
            },
            search: function() {
              return "";
            }
          });
          return messages.talk(prop).list().length - Cache.events.list().length;
        },
        "th-large": function() {
          return Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length;
        }
      };
      switch (icon_mode_menu.state()) {
        case "pins":
          section("pin");
          break;
        case "memo":
        case "history":
          section("home");
          section("clock");
          section("mail");
          section("chat-alt");
          break;
        case "home":
        case "talk":
          section("home");
          section("mail");
          section("chat-alt");
          break;
        case "full":
          section("resize-normal");
          break;
        case "normal":
          section("resize-full");
      }
      section("pencil");
      section("th-large");
      if ("pins" !== icon_mode_menu.state()) {
        section("search");
      }
      section("cog");
      return m("table", m("tr", m("td", {
        style: "height: " + (win.height - 2) + "px;"
      }, vdoms)));
    }
  });
});

GUI.if_exist("#topviewer", function(dom) {
  var layout;
  layout = new GUI.Layout(dom, 0, 1, 110, head.browser.ios, 0);
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return icon_menu.view();
    }
  });
});

GUI.if_exist("#css_changer", function(dom) {
  icon_menu.icon("cog", {
    view: function() {
      return m(".paragraph.guide", m("h6", "スタイル"), Btns.radio({}, Url.prop.theme, {
        cinema: "煉瓦",
        star: "蒼穹",
        night: "闇夜",
        moon: "月夜",
        wa: "和の国"
      }), m("h6", "幅の広さ"), Btns.radio({}, Url.prop.width, {
        wide: "広域",
        std: "普通",
        mini: "携帯"
      }), m("h6", "位置"), Btns.radio({}, Url.prop.layout, {
        left: "左詰",
        center: "中央",
        right: "右詰"
      }), m("h6", "位置"), Btns.radio({}, Url.prop.font, {
        large: "大判",
        novel: "明朝",
        std: "ゴシック",
        small: "繊細"
      }));
    }
  });
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return m(".guide", m("a.menuicon.pull-right.icon-cog", icon_menu.start({}, "cog"), " "), Btns.radio({}, Url.prop.theme, {
        cinema: "煉瓦",
        star: "蒼穹",
        night: "闇夜",
        moon: "月夜",
        wa: "和の国"
      }), m("hr.black"));
    }
  });
});

if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
  Cache.rule.potof.set(gon.potofs, {
    story_folder: (_ref1 = gon.story) != null ? _ref1.folder : void 0,
    story_type: (_ref2 = gon.story) != null ? _ref2.type : void 0,
    story_epilogue: (_ref3 = gon.story) != null ? _ref3.is_epilogue : void 0,
    event_winner: ((_ref4 = gon.event) != null ? _ref4.winner : void 0) || ((_ref5 = gon.events) != null ? (_ref6 = _ref5.last) != null ? _ref6.winner : void 0 : void 0)
  });
  GUI.if_exist("#sayfilter", function(dom) {
    var layout, toggle_desc, wide_attr;
    layout = new GUI.Layout(dom, -1, 1, 100);
    layout.small_mode = true;
    layout.large_mode = function() {
      return !(icon_menu.state() || layout.small_mode);
    };
    toggle_desc = function(prop, value) {
      var attr;
      if (prop() === value) {
        attr = Btn.bool({}, Url.prop.potofs_desc);
        attr.className = "btn active";
        return attr;
      } else {
        return Btn.set({}, prop, value);
      }
    };
    wide_attr = GUI.attrs({}, function() {
      this.click(function() {
        layout.small_mode = !layout.small_mode;
        if (!layout.small_mode) {
          return icon_menu.state("");
        }
      });
      return this.actioned(function() {
        return layout.translate();
      });
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var event, filter, filter_class, hides, o, potofs, subview;
        hides = Url.prop.potofs_hide();
        layout.width = Url.prop.right_width();
        if (layout.large_mode()) {
          layout.width += Url.prop.content_width();
        }
        if (layout.width < 90) {
          layout.mode = "hide";
        } else {
          layout.mode = "show";
        }
        subview = messages.anchor(Url.prop).list();
        filter = m("section.plane", wide_attr, m("h6", "参照ログ"), (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = subview.length; _i < _len; _i++) {
            o = subview[_i];
            _results.push(m(".line_text", m("." + o.mestype + ".badge", "" + o.turn + ":" + o.anchor), m.trust(o.log.line_text)));
          }
          return _results;
        })());
        potofs = m("table.table", m("tfoot", m("tr.center", m("th[colspan=2]", m("sup", "(スクロールします。)")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "stat_at"), "日程")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "stat_type"), "状態")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "said_num"), "発言")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "pt"), "残り")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "urge"), "促")), m("th", m("span.icon-user", " ")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "select"), "希望")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "win_result"), "勝敗")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "win_side"), "陣営")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "role"), "役割")), m("th", m("a", toggle_desc(Url.prop.potofs_order, "text"), "補足")))), m("tbody.plane", wide_attr, (function() {
          var _i, _len, _ref7, _results;
          _ref7 = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list();
          _results = [];
          for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
            o = _ref7[_i];
            filter_class = hides[o.face_id] ? "filter-hide" : "";
            _results.push(m("tr", {
              className: filter_class
            }, m("th.calc", {}, o.view.job), m("th", {}, o.name), m("td.calc", {}, o.view.stat_at), m("td", {}, o.view.stat_type), m("td.calc", {}, o.view.said_num), m("td.calc", {}, o.view.pt), m("td.center", {}, o.view.urge), m("td.center", {}, o.view.user_id), m("td.center", {}, o.view.select), m("td.WIN_" + o.view.win + ".center", {}, o.view.win_result), m("td.WIN_" + o.view.win + ".calc", {}, o.view.win_side), m("td.WIN_" + o.view.win, {}, o.view.role), m("td.WIN_" + o.view.win, {}, o.view.text)));
          }
          return _results;
        })()));
        event = Cache.events.find(Url.prop.event_id());
        return m("div", event != null ? m(".head", event.name) : m(".foot"), m("aside", m("section.table-swipe", potofs), filter), m(".foot"));
      }
    });
  });
}

if (((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && (gon.event != null)) {
  if ((typeof gon !== "undefined" && gon !== null ? gon.story : void 0) != null) {
    Cache.rule.story.set([gon.story]);
  }
  Cache.rule.event.merge(gon.events, {
    story_id: (_ref7 = gon.story) != null ? _ref7._id : void 0
  });
  messages = {
    pins: function(_arg) {
      var pins, story_id;
      story_id = _arg.story_id, pins = _arg.pins;
      return Cache.messages.pins(story_id(), pins());
    },
    anchor: function(_arg) {
      var talk;
      talk = _arg.talk;
      return Cache.messages.anchor(talk(), scroll_spy.prop());
    },
    home: function(_arg) {
      var home;
      home = _arg.home;
      return Cache.messages.home(home());
    },
    talk: function(_arg) {
      var open, potofs_hide, search, talk;
      talk = _arg.talk, open = _arg.open, potofs_hide = _arg.potofs_hide, search = _arg.search;
      return Cache.messages.talk(talk(), open(), potofs_hide(), search());
    },
    memo: function(_arg) {
      var memo, potofs_hide, search;
      memo = _arg.memo, potofs_hide = _arg.potofs_hide, search = _arg.search;
      return Cache.messages.memo(memo(), true, potofs_hide(), search());
    },
    history: function(_arg) {
      var memo, potofs_hide, search;
      memo = _arg.memo, potofs_hide = _arg.potofs_hide, search = _arg.search;
      return Cache.messages.memo(memo(), false, potofs_hide(), search());
    }
  };
  security_modes = function(prop) {
    return [m("a", Btn.set({}, prop, "all"), "すべて"), m("a", Btn.set({}, prop, "think"), "独り言/内緒話"), m("a", Btn.set({}, prop, "clan"), "仲間の会話"), m("a", Btn.set({}, prop, "open"), "公開情報のみ"), m.trust("&nbsp;"), m("a", Btn.bool({}, Url.prop.open), "公開情報"), m("a", Btn.bool({}, Url.prop.human), "/*中の人*/")];
  };
  potofs_portrates = function() {
    var attr, hides, o, potofs;
    potofs = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list();
    hides = Url.prop.potofs_hide();
    return m(".chrlist", m("h6", "キャラクターフィルタ"), m("hr.black"), m(".chrbox", {
      key: "other-Btns"
    }, m(".chrblank.line9", m(".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, []), "全員表示"), m(".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.others()), "参加者表示"), m(".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.potofs()), "その他を表示"), m(".btn[style='display:block']", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.has_faces.all()), "全員隠す"))), (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = potofs.length; _i < _len; _i++) {
        o = potofs[_i];
        attr = function(o) {
          return GUI.attrs({}, function() {
            var elem;
            this.className(hides[o.face_id] ? "filter-hide" : "");
            elem = null;
            this.config(function(_elem) {
              return elem = _elem;
            });
            return this.click(function() {
              hides[o.face_id] = !hides[o.face_id];
              return Url.prop.potofs_hide(hides);
            });
          });
        };
        _results.push(m(".chrbox", {
          key: o._id
        }, GUI.portrate(o.face_id, attr(o)), m(".chrblank.line1", m("div", o.name))));
      }
      return _results;
    })(), m("hr.black"));
  };
  GUI.if_exist("#story", function(dom) {
    var story;
    story = gon.story;
    icon_menu.icon("home", {
      open: function() {
        return icon_mode_menu.change("home");
      },
      view: function() {
        var event, event_card, text, texts;
        event = Cache.events.find(Url.prop.event_id());
        if (event) {
          event_card = RAILS.events[event.event];
          texts = [];
          if ("WIN_NONE" !== event.winner) {
            texts.push(RAILS.winner[event.winner] + "の勝利です。");
          }
          if (event_card) {
            texts.push(m("kbd", event_card));
          }
          if (event.turn === event.grudge) {
            texts.push(RAILS.event_state.grudge);
          }
          if (event.turn === event.riot) {
            texts.push(RAILS.event_state.riot);
          }
          if (event.turn === event.scapegoat) {
            texts.push(RAILS.event_state.scapegoat);
          }
          if (_.find(event.eclipse, event.turn)) {
            texts.push(RAILS.event_state.eclipse);
          }
          return [
            m("." + event.winner + ".guide", m("h6", "" + event.name + " 村の情報"), (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = texts.length; _i < _len; _i++) {
                text = texts[_i];
                _results.push(m("p.text", text));
              }
              return _results;
            })(), GUI.message.game(story, event))
          ];
        } else {
          return [m(".WIN_NONE.guide", m("h6", "村の情報"), GUI.message.game(story))];
        }
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return [
          icon_menu.icon("search", {
            view: function() {
              return m(".paragraph.guide", GUI.timeline({
                base: Cache.messages.timeline(Url.prop.talk()),
                width: Url.prop.content_width(),
                choice: function(id) {
                  Url.prop.talk_at(id);
                  icon_menu.change("search");
                  return icon_mode_menu.change("talk");
                }
              }), m("input.medium", Txt.input(Url.prop.search)), m("span", "発言中の言葉を検索します。"), m("hr.black"));
            }
          }), (function() {
            if (story != null) {
              switch (icon_mode_menu.state()) {
                case "home":
                  return GUI.message.story(story);
              }
            }
          })()
        ];
      }
    });
  });
  GUI.if_exist("#messages", function(dom) {
    var change_pin;
    scroll_spy.avg_height = 150;
    change_pin = function(id) {
      var target, target_at;
      target = icon_mode_menu.state();
      switch (target) {
        case "history":
          target_at = Url.prop["memo_at"];
          break;
        case "memo":
        case "talk":
        case "home":
          target_at = Url.prop["" + target + "_at"];
      }
      if (target_at) {
        target_at(id);
        Url.prop.back(target);
      }
      Url.prop.scroll(id);
      return icon_menu.change("pin");
    };
    GUI.message.delegate.tap_anchor = function(o, turn, logid, id) {
      var pins;
      pins = Url.prop.pins();
      pins["" + o.turn + "-" + o.logid] = true;
      pins["" + turn + "-" + logid] = true;
      Url.prop.pins(pins);
      return change_pin(o._id);
    };
    GUI.message.delegate.tap_identity = function(o, turn, logid, id) {
      var pins;
      pins = Url.prop.pins();
      pins["" + turn + "-" + logid] = true;
      Url.prop.pins(pins);
      return change_pin(id);
    };
    icon_mode_menu.node("history", {
      open: function() {
        return scroll_spy.rescroll(Url.prop.memo_at);
      }
    });
    icon_mode_menu.node("memo", {
      open: function() {
        return scroll_spy.rescroll(Url.prop.memo_at);
      }
    });
    icon_mode_menu.node("talk", {
      open: function() {
        return scroll_spy.rescroll(Url.prop.talk_at);
      }
    });
    icon_mode_menu.node("home", {
      open: function() {
        return scroll_spy.rescroll(Url.prop.home_at);
      }
    });
    icon_mode_menu.node("pins", {
      open: function() {
        return scroll_spy.rescroll(Url.prop.scroll);
      }
    });
    icon_menu.icon("pin", {
      open: function() {
        return icon_mode_menu.change("pins");
      },
      close: function() {
        Url.prop.pins({});
        return icon_mode_menu.change(Url.prop.back());
      }
    });
    icon_menu.icon("mail", {
      open: function() {
        return icon_mode_menu.change("memo");
      },
      view: function() {
        return [m(".paragraph.guide", m("h6", "メモ"), security_modes(Url.prop.memo), m("p", "メモを表示します。")), potofs_portrates()];
      }
    });
    icon_menu.icon("chat-alt", {
      open: function() {
        return icon_mode_menu.change("talk");
      },
      view: function() {
        return [m(".paragraph.guide", m("h6", "発言"), security_modes(Url.prop.talk), m("p", "村内の発言を表示します。")), potofs_portrates()];
      }
    });
    icon_menu.icon("clock", {
      open: function() {
        return icon_mode_menu.change("history");
      },
      view: function() {
        return [m(".paragraph.guide", m("h6", "発言"), security_modes(Url.prop.memo), m("p", "メモ履歴を表示します。")), potofs_portrates()];
      }
    });
    m.module(dom, {
      controller: function() {},
      view: function() {
        return scroll_spy.pager("div", messages[icon_mode_menu.state()](Url.prop).list(), function(o) {
          var anchor_num;
          anchor_num = o.logid.slice(2) - 0 || 0;
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
          if (o.vdom) {
            return o.vdom(o);
          } else {
            return m(".paragraph", JSON.stringify(o));
          }
        });
      }
    });
    m.startComputation();
    return window.requestAnimationFrame(function() {
      var back_state, event, interval, set_event_messages, set_event_without_messages, turn, updated_at, _i, _j, _k, _len, _len1, _ref10, _ref8, _ref9;
      set_event_messages = function(event) {
        var first, last;
        first = event.messages.first.date;
        last = event.messages.last.date;
        return set_event_without_messages(new Date(first) - 1, new Date(last) - -1, event.messages, event);
      };
      set_event_without_messages = function(first_date, last_date, messages, _arg) {
        var name, turn, _id;
        _id = _arg._id, turn = _arg.turn, name = _arg.name;
        messages.unshift({
          name: name,
          log: name,
          logid: "EVENT-ASC",
          mestype: "EVENT",
          updated_at: first_date
        });
        messages.push({
          name: name,
          log: name,
          logid: "EVENT-DESC",
          mestype: "EVENT",
          updated_at: last_date
        });
        return Cache.rule.message.merge(messages, {
          event_id: _id,
          turn: turn
        });
      };
      interval = gon.story.upd.interval * 1000 * 3600 * 24;
      if (gon.event.messages) {
        set_event_messages(gon.event);
        turn = gon.event.turn;
        updated_at = gon.event.messages.last.updated_at;
        _ref8 = gon.events;
        for (_i = 0, _len = _ref8.length; _i < _len; _i += 1) {
          event = _ref8[_i];
          if (event.turn > turn) {
            set_event_without_messages(updated_at + 1, updated_at + interval, [], event);
            updated_at += interval;
          }
        }
        updated_at = gon.event.messages.first.updated_at;
        _ref9 = gon.events;
        for (_j = _ref9.length - 1; _j >= 0; _j += -1) {
          event = _ref9[_j];
          if (event.turn < turn) {
            set_event_without_messages(updated_at - interval, updated_at - 1, [], event);
            updated_at -= interval;
          }
        }
      }
      _ref10 = gon.events;
      for (_k = 0, _len1 = _ref10.length; _k < _len1; _k++) {
        event = _ref10[_k];
        if (event.messages) {
          set_event_messages(event);
        }
      }
      back_state = icon_mode_menu.state();
      icon_mode_menu.change("");
      icon_mode_menu.change("talk");
      icon_mode_menu.change(back_state);
      return m.endComputation();
    });
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

if ((typeof gon !== "undefined" && gon !== null ? gon.form : void 0) != null) {
  GUI.if_exist("#forms", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return [];
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
  Cache.rule.story.set(gon.stories);
  GUI.if_exist("#stories", function(dom) {
    icon_menu.icon("resize-full", {
      open: function() {
        scroll_spy.avg_height = 120;
        return icon_mode_menu.change("full");
      }
    });
    icon_menu.icon("resize-normal", {
      deploy: function() {
        return icon_mode_menu.change("normal");
      },
      open: function() {
        scroll_spy.avg_height = 22;
        return icon_mode_menu.change("normal");
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var query, _ref8;
        query = (_ref8 = Cache.storys).menu.apply(_ref8, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values())));
        return [
          icon_menu.icon("search", {
            deploy: function(main_menu) {
              main_menu.drill("rating", {
                caption: "こだわり",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    rating: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "rating"
                  }, Url.prop.rating, reduce, "rating", function(key, o) {
                    return m("span", m("img.pull-left", {
                      src: GUI.img_head + ("/icon/cd_" + o.min_is.rating + ".png")
                    }), RAILS.rating[key].caption);
                  });
                }
              });
              main_menu.drill("game", {
                caption: "ルール",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    game: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "game"
                  }, Url.prop.game, reduce, "game", function(key, o) {
                    return o.min_is.view.game_rule;
                  });
                }
              });
              main_menu.drill("folder", {
                caption: "州",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, ["all"].concat(__slice.call(Url.routes.search.stories.values()))).reduce();
                  return sub_menu.radio({
                    "class": "folder"
                  }, Url.prop.folder, reduce, "folder", function(key, o) {
                    var _ref10;
                    return (_ref10 = GAME[key]) != null ? _ref10.nation : void 0;
                  });
                }
              });
              main_menu.drill("say_limit", {
                caption: "発言制限",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    say_limit: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "say_limit"
                  }, Url.prop.say_limit, reduce, "say_limit", function(key, o) {
                    return o.min_is.view.say_limit;
                  });
                }
              });
              main_menu.drill("update_at", {
                caption: "更新時刻",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    update_at: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "update_at"
                  }, Url.prop.update_at, reduce, "update_at", function(key, o) {
                    return o.min_is.view.update_at;
                  });
                }
              });
              main_menu.drill("update_interval", {
                caption: "更新間隔",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    update_interval: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "update_interval"
                  }, Url.prop.update_interval, reduce, "update_interval", function(key, o) {
                    return o.min_is.view.update_interval;
                  });
                }
              });
              main_menu.drill("event_type", {
                caption: "事件",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    event_type: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "event_type"
                  }, Url.prop.event_type, reduce, "event_type", function(key, o) {
                    return key;
                  });
                }
              });
              main_menu.drill("role_type", {
                caption: "役職",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    role_type: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "role_type"
                  }, Url.prop.role_type, reduce, "role_type", function(key, o) {
                    return key;
                  });
                }
              });
              return main_menu.drill("player_length", {
                caption: "人数",
                view: function(sub_menu) {
                  var reduce, _ref9;
                  reduce = (_ref9 = Cache.storys).menu.apply(_ref9, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
                    player_length: "all"
                  })))).reduce();
                  return sub_menu.radio({
                    "class": "player_length"
                  }, Url.prop.role_type, reduce, "player_length", function(key, o) {
                    return o.min_is.view.player_length + "人";
                  });
                }
              });
            },
            view: function(main_menu) {
              return m(".paragraph.guide", m("h6", "検索する。"), m("input.mini", Txt.input(Url.prop.search)), main_menu.drills({}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]));
            }
          }), m("table.table.table-border.table-hover", m("thead", m("tr", m("th"))), scroll_spy.pager("tbody", query.list(), function(o) {
            return m("tr", {
              key: o._id
            }, icon_menu.state() === "resize-full" ? m("td", m("a", {
              href: o.link
            }, m("code.icon-download")), m("kbd.note", o._id), m("a", {
              href: o.file
            }, m.trust(o.name)), o.view.rating, m("table", m("tbody", m("tr", m("th", "更新"), m("td", "" + o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", "" + o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m("div", o.view.role_cards), m("div", o.view.event_cards)) : m("td", m("a", {
              href: o.link
            }, m("code.icon-download")), m("kbd.note", o._id), m("a", {
              href: o.file
            }, o.name), o.view.rating));
          }))
        ];
      }
    });
  });
}

m.endComputation();
GUI.if_exist("#head_navi", function(dom) {
  var state;
  state = m.prop();
  state("finish");
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec, top_line_attr;
      max_vage = GAME.PERJURY.config.cfg.MAX_VILLAGES;
      max_crazy = GAME.CRAZY.config.cfg.MAX_VILLAGES;
      max_xebec = GAME.XEBEC.config.cfg.MAX_VILLAGES;
      max_ciel = GAME.CIEL.config.cfg.MAX_VILLAGES;
      max_cafe = GAME.CABALA.config.cfg.MAX_VILLAGES;
      max_pan = GAME.PAN.config.cfg.MAX_VILLAGES;
      max_morphe = GAME.MORPHE.config.cfg.MAX_VILLAGES;
      max_all = max_vage + max_crazy + max_xebec + max_ciel;
      max_all += max_cafe + max_morphe;
      top_line_attr = {
        style: "height: 4em; vertical-align: bottom;"
      };
      return [
        m(".left_image"), m(".right_image"), m("table.board#headline", m("thead", "progress" === state() ? m("tr", top_line_attr, m("th.choice[colspan=2]", {
          key: "p"
        }, m("strong", "進行中の村")), m("th[colspan=2]", {
          key: "f"
        }, m("a", Btn.set({}, state, "finish"), "終了した村を見る"))) : void 0, "finish" === state() ? m("tr", top_line_attr, m("th[colspan=2]", {
          key: "p"
        }, m("a", Btn.set({}, state, "progress"), "進行中の村を見る")), m("th.choice[colspan=2]", {
          key: "f"
        }, m("strong", "終了した村"))) : void 0, m("tr", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ"))), "progress" === state() ? m("tbody", m("tr", m("td", {
          key: "L"
        }, m("a", {
          href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
        }, "lobby"), m("br"), "offparty", m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "D"
        }, "" + max_morphe + "村:", m("a", {
          href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
        }, "morphe"), m("br"), "" + max_cafe + "村:", m("a", {
          href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
        }, "cafe"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "C"
        }, "wolf", m("br"), "ultimate", m("br"), "allstar", m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "R"
        }, "role-play", m("br"), "RP-advance", m("br"), "" + max_vage + "村:", m("a", {
          href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
        }, "perjury"), m("br"), "" + max_xebec + "村:", m("a", {
          href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
        }, "xebec"), m("br"), "" + max_crazy + "村:", m("a", {
          href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
        }, "crazy"), m("br"), "" + max_ciel + "村:", m("a", {
          href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
        }, "ciel")))) : void 0, "finish" === state() ? m("tbody", m("tr", m("td", {
          key: "P"
        }, m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
        }, "lobby"), m("br"), m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
        }, "offparty"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "D"
        }, m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
        }, "morphe"), m("br"), m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
        }, "cafe"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "C"
        }, m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
        }, "wolf"), m("br"), m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
        }, "ultimate"), m("br"), m("a", {
          href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
        }, "allstar"), m("br"), m("br"), m("br"), m("br")), m("td", {
          key: "R"
        }, m("a", {
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
        }, "ciel")))) : void 0)
      ];
    }
  });
});

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
        }, GUI.title(Url.prop.h1_width(), Url.prop.theme(), day_or_night()))
      ];
    }
  });
});

GUI.if_exist("#headline", function(dom) {
  var state;
  state = m.prop();
  state("finish");
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
      return m(".choice", m("table.board", m("thead", "progress" === state() ? m("tr", m("th.choice[colspan=2]", {
        key: "p"
      }, m("strong", "進行中の村")), m("th[colspan=2]", {
        key: "f"
      }, m("a", Btn.set({}, state, "finish"), "終了した村を見る"))) : void 0, "finish" === state() ? m("tr", m("th[colspan=2]", {
        key: "p"
      }, m("a", Btn.set({}, state, "progress"), "進行中の村を見る")), m("th.choice[colspan=2]", {
        key: "f"
      }, m("strong", "終了した村"))) : void 0, m("tr", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ"))), "progress" === state() ? m("tbody", m("tr", m("td", {
        key: "L"
      }, m("a", {
        href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
      }, "lobby"), m("br"), "offparty", m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "D"
      }, "" + max_morphe + "村:", m("a", {
        href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
      }, "morphe"), m("br"), "" + max_cafe + "村:", m("a", {
        href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
      }, "cafe"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "C"
      }, "wolf", m("br"), "ultimate", m("br"), "allstar", m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "R"
      }, "role-play", m("br"), "RP-advance", m("br"), "" + max_vage + "村:", m("a", {
        href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
      }, "perjury"), m("br"), "" + max_xebec + "村:", m("a", {
        href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
      }, "xebec"), m("br"), "" + max_crazy + "村:", m("a", {
        href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
      }, "crazy"), m("br"), "" + max_ciel + "村:", m("a", {
        href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
      }, "ciel")))) : void 0, "finish" === state() ? m("tbody", m("tr", m("td", {
        key: "P"
      }, m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=LOBBY"
      }, "lobby"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=OFFPARTY"
      }, "offparty"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "D"
      }, m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=MORPHE"
      }, "morphe"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=CABALA"
      }, "cafe"), m("br"), m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "C"
      }, m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=WOLF"
      }, "wolf"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ULTIMATE"
      }, "ultimate"), m("br"), m("a", {
        href: "http://7korobi.gehirn.ne.jp/stories/all?folder=ALLSTAR"
      }, "allstar"), m("br"), m("br"), m("br"), m("br")), m("td", {
        key: "R"
      }, m("a", {
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
      }, "ciel")))) : void 0));
    }
  });
});
var chrs, links;

if (((typeof gon !== "undefined" && gon !== null ? gon.new_chr_faces : void 0) != null) && ((typeof gon !== "undefined" && gon !== null ? gon.new_chr_jobs : void 0) != null)) {
  Cache.faces._hash.t12.item.order = 100000;
  Cache.rule.face.merge(gon.new_chr_faces);
  Cache.rule.chr_job.merge(gon.new_chr_jobs);
  chrs = Cache.chr_jobs.where({
    chr_set_id: "sf"
  }).sort(false, function(o) {
    return o.face.order;
  }).list();
  links = {
    "アルミニウム赤泥流出事故": "http://ja.wikipedia.org/wiki/ハンガリーアルミニウム赤泥流出事故",
    "未来ロードマップ": "http://forevision.jp/wiki/?未来ロードマップ",
    "蒼井印の創作忍者bot": "https://twitter.com/Aonnj_bot",
    "宇宙人": "http://ja.wikipedia.org/wiki/宇宙人",
    "創世記": "http://ja.wikipedia.org/wiki/創世記",
    "ケイ素生物": "http://ja.wikipedia.org/wiki/ケイ素生物",
    "赤ちゃん命名辞典": "http://www.baby-name.jp",
    "架空の人名": "http://ja.wikipedia.org/wiki/Category:架空の人物"
  };
  setTimeout(function() {
    Cache.chr_jobs._hash.all_t12.item.chr_set_id = "sf";
    Cache.chr_jobs._hash.all_c71.item.chr_set_id = "sf";
    Cache.faces._hash.sf15.item.order = 21 - 0.1;
    Cache.faces._hash.sf10.item.order = 21 + 0.1;
    Cache.faces._hash.sf028.item.order = 22 - 0.1;
    Cache.faces._hash.sf027.item.order = 22 + 0.1;
    Cache.faces._hash.sf032.item.order = 22 + 0.2;
    Cache.faces._hash.sf16.item.order = 22 + 0.3;
    Cache.faces._hash.t12.item.order = 23 - 0.1;
    Cache.faces._hash.sf06.item.order = 25 - 0.1;
    Cache.faces._hash.c71.item.order = 26 - 0.1;
    Cache.faces._hash.sf04.item.order = 29 - 0.1;
    Cache.faces._hash.sf05.item.order = 29 + 0.1;
    Cache.faces._hash.sf20.item.order = 30 - 0.1;
    Cache.faces._hash.sf07.item.order = 30 + 0.1;
    Cache.faces._hash.sf024.item.order = 31 - 0.2;
    Cache.faces._hash.sf08.item.order = 31 - 0.1;
    Cache.rule.chr_job.reject([]);
    chrs = Cache.chr_jobs.where({
      chr_set_id: "sf"
    }).sort(false, function(o) {
      return o.face.order;
    }).list();
    return m.redraw();
  }, 10000);
  GUI.if_exist("#map_faces", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var attr, blank_attr, link, o, title;
        return [
          m("h6", "参考文献"), m(".paragraph", (function() {
            var _results;
            _results = [];
            for (title in links) {
              link = links[title];
              _results.push(m("a.btn.btn-default.mark", {
                href: link,
                target: "_blank"
              }, title));
            }
            return _results;
          })()), m("hr.black"), m(".mark", "明後日の道標 〜 新人さん歓迎パーティー"), m("h6", "１０秒経つと、親近感のある人たちが新人さんのまわりに集まります。"), m("h6", "いま記述のある新人さんの肩書、名前は仮のものです。"), m("h6", ""), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = chrs.length; _i < _len; _i++) {
              o = chrs[_i];
              attr = GUI.attrs({}, function() {
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
              blank_attr = /sf\d\d\d/.test(o.face_id) ? {
                style: 'background-color: #126; min-height: 100px;'
              } : {
                style: 'min-height: 100px;'
              };
              _results.push(m(".chrbox", {
                key: o._id
              }, GUI.portrate(o.face_id, attr), m(".chrblank", blank_attr, m("div", m.trust(o.job)), m("div", m.trust(o.face.name)))));
            }
            return _results;
          })(), m("hr.black")
        ];
      }
    });
  });
}
;
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


