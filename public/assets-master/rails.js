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
    var face, list, search_words, sow_auth_id;
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
    face = o.face();
    if (face) {
      search_words.push(face.name);
      for (sow_auth_id in o.sow_auth_id.value) {
        search_words.push(sow_auth_id);
      }
      return o.search_words = search_words.join("\t");
    }
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
  return this.deploy(function(o) {});
});
new Cache.Rule("event").schema(function() {
  var bit, mask, visible, _ref;
  this.belongs_to("story", {
    dependent: true
  });
  this.order("updated_at");
  _ref = RAILS.message, visible = _ref.visible, bit = _ref.bit, mask = _ref.mask;
  this.scope(function(all) {
    return {};
  });
  this.deploy(function(o) {
    o._id || (o._id = "" + o.story_id + "-" + o.turn);
    o.event_id = o._id;
    return o.view = {
      btn: function() {
        var submit;
        switch (false) {
          case !o.is_full:
            return null;
          case !o.is_loading:
            return m(".SSAY", "読み込み…");
          default:
            submit = function() {
              return doc.load.event(false, o, function() {});
            };
            return m(".SSAY", Btn.call({}, submit), "読み込み");
        }
      }
    };
  });
  return this.map_reduce(function(o, emit) {});
});
new Cache.Rule("target").schema(function() {
  this.scope(function(all) {
    return {
      command: function(type) {
        return all;
      },
      vote: function(type) {
        return all;
      }
    };
  });
  return this.deploy(function(o) {});
});

new Cache.Rule("command").schema(function() {
  this.scope(function(all) {
    return {
      target: function() {
        return all.where({
          jst: "target"
        });
      }
    };
  });
  return this.deploy(function(o) {});
});

new Cache.Rule("writer").schema(function() {
  this.belongs_to("chr_job");
  this.scope(function(all) {
    return {};
  });
  return this.deploy(function(o) {
    o._id = o.cmd;
    o.vdom = GUI.form[o.jst];
    o.is_preview = m.prop(false);
    o.style = m.prop("text");
    o.log = function(log) {
      if (log) {
        o.hisoty = {
          form: o,
          text: log
        };
        Cache.rule.history.merge(o.history);
        return log;
      } else {
        return o.history;
      }
    };
    return o.submit = (function() {
      switch (o.cmd) {
        case "entry":
          return (function(_this) {
            return function(_arg) {
              var csid_cid, entrypwd, mes, role, style, turn, vid;
              turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, csid_cid = _arg.csid_cid, role = _arg.role, entrypwd = _arg.entrypwd;
              _arg = {
                turn: turn,
                vid: vid,
                mes: mes,
                style: style,
                csid_cid: csid_cid,
                role: role,
                entrypwd: entrypwd
              };
              _arg.cmd = "entry";
              _arg.target = -1;
              return _arg;
            };
          })(this);
        case "write":
          return (function(_this) {
            return function(_arg) {
              var mes, style, target, turn, vid;
              turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, target = _arg.target;
              _arg.cmd = "write";
              return _arg;
            };
          })(this);
        case "wrmemo":
          return (function(_this) {
            return function(_arg) {
              var mes, style, target, turn, vid;
              turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, target = _arg.target;
              _arg.cmd = "wrmemo";
              return _arg;
            };
          })(this);
        case "action":
          return (function(_this) {
            return function(_arg) {
              var actionno, actiontext, style, target, turn, vid;
              turn = _arg.turn, vid = _arg.vid, actiontext = _arg.actiontext, style = _arg.style, target = _arg.target, actionno = _arg.actionno;
              _arg.cmd = "action";
              return _arg;
            };
          })(this);
        case "select":
          return (function(_this) {
            return function(_arg) {
              var cmd, target1, target2, vid;
              vid = _arg.vid, target1 = _arg.target1, target2 = _arg.target2, cmd = _arg.cmd;
              if ('vote' === cmd) {
                _arg.entrust = '';
              }
              if ('entrust' === cmd) {
                _arg.entrust = 'entrust';
              }
              return _arg;
            };
          })(this);
        case "select_commit":
          return (function(_this) {
            return function(_arg) {
              var commit, vid;
              vid = _arg.vid, commit = _arg.commit;
              _arg.cmd = "commit";
              return _arg;
            };
          })(this);
      }
    }).call(this);
  });
});

new Cache.Rule("history").schema(function() {
  var point;
  point = function(size) {
    var pt;
    pt = 20;
    if (50 < size) {
      pt += (size - 50) / 14;
    }
    return Math.floor(pt);
  };
  return this.deploy(function(o) {
    o.text = o.text.replace(/\n$/g, '\n ');
    o._id = JSON.stringify([o.form._id, o.text]);
    o.compact = o.text.replace(/\s/g, '');
    o.compact_size = o.compact.sjis_length;
    o.lines = o.text.split("\n").length;
    o.size = o.text.sjis_length;
    return o.point = point(o.size);
  });
});
new Cache.Rule("message").schema(function() {
  var bit, has, mask, timespan, visible, _ref;
  this.belongs_to("event", {
    dependent: true
  });
  this.belongs_to("story", {
    dependent: true
  });
  this.belongs_to("face");
  this.order("updated_at");
  timespan = 1000 * 3600;
  Cache.messages.has = has = {
    face: {},
    vsay: false,
    bug: false
  };
  _ref = RAILS.message, visible = _ref.visible, bit = _ref.bit, mask = _ref.mask;
  this.scope(function(all) {
    return {
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
        var enables;
        enables = RAILS.message.visible.appendex.event_desc;
        return all.sort("desc", "updated_at").where(function(o) {
          return (o.show & enables) || pins["" + o.turn + "-" + o.logid] && (o.story_id === story_id);
        });
      },
      home: function(mode) {
        var enables;
        enables = visible.home[mode];
        return all.where(function(o) {
          return o.show & enables;
        });
      },
      talk: function(mode, open, hides, search) {
        var enables;
        enables = visible.talk[mode];
        if (!open) {
          enables &= mask.NOT_OPEN;
        }
        return all.where(function(o) {
          return (o.show & enables) && !hides[o.face_id];
        }).search(search);
      },
      memo: function(mode, uniq, hides, search) {
        var enables, query;
        enables = visible.memo[mode];
        query = all.sort("desc", "updated_at").where(function(o) {
          return (o.show & enables) && !hides[o.face_id];
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
    var anchor_num, event, folder, lognumber, logtype, story, turn, vdom, vid, _ref1;
    logtype = o.logid.slice(0, 2);
    lognumber = o.logid.slice(2);
    switch (o.mestype) {
      case "QUEUE":
        o.mestype = "SAY";
        break;
      case "VSAY":
        story = o.story();
        event = o.event();
        has.vsay = true;
        if (story && event && "grave" === story.type.mob && !event.name.match(/プロローグ|エピローグ/)) {
          o.mestype = "VGSAY";
        }
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
        if (o.to) {
          has.to = true;
        } else {
          o.mestype = "TSAY";
        }
    }
    _ref1 = o.event_id.split("-"), folder = _ref1[0], vid = _ref1[1], turn = _ref1[2];
    o.folder || (o.folder = folder);
    o.vid || (o.vid = vid);
    o.turn || (o.turn = turn);
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
    o.pen = "" + o.mestype + "-" + o.face_id;
    o.potof_id = "" + o.event_id + "-" + o.csid + "-" + o.face_id;
    if (!o.updated_at) {
      o.updated_at = new Date(o.date) - 0;
    }
    vdom = GUI.message.xxx;
    switch (o.logid[1]) {
      case "S":
      case "X":
        vdom = GUI.message.talk;
        o.show = bit.TALK;
        break;
      case "A":
      case "B":
        vdom = GUI.message.action;
        o.anchor = "act";
        o.show = bit.ACTION;
        break;
      case "M":
        o.logid = o.mestype.slice(0, 1) + o.logid.slice(1);
        vdom = GUI.message.memo;
        o.anchor = "memo";
        o.show = bit.MEMO;
        break;
      case "I":
        vdom = GUI.message.info;
        o.anchor = "info";
        o.show = bit.INFO;
    }
    o.mask = (function() {
      switch (o.logid[0]) {
        case "-":
        case "W":
        case "P":
        case "X":
          has.clan = true;
          return "CLAN";
        case "T":
        case "i":
          has.think = true;
          return "THINK";
        case "V":
        case "G":
          has.grave = true;
          return "GRAVE";
        case "D":
          o.anchor = "del";
          return "DELETE";
        default:
          return "MAIN";
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
      case "CAST":
        vdom = GUI.message.potofs;
        break;
      case "STORY":
        o.pen = o.event_id;
        o.mask = "ALL";
        switch (o.logid) {
          case "STORY-TEXT":
            vdom = GUI.message.story_text;
            break;
          case "STORY-RULE":
            vdom = GUI.message.story_rule;
            break;
          case "STORY-GAME":
            vdom = GUI.message.story_game;
        }
        break;
      case "EVENT":
        vdom = GUI.message.event;
        o.pen = o.event_id;
        o.mask = "ALL";
    }
    o.show &= mask[o.mask];
    o.vdom = vdom;
    if (o.log == null) {
      o.log = "";
    }
    return o.search_words = o.log;
  });
  return this.map_reduce(function(o, emit) {
    var item, time_id;
    has.face[o.face_id] = true;
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
var __slice = [].slice;

new Cache.Rule("potof").schema(function() {
  var id_list, maskstate_order, win_by_role;
  this.belongs_to("event");
  this.belongs_to("face");
  this.depend_on("message");
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
  id_list = function(query) {
    return query.list().map(function(o) {
      return o.face_id;
    }).sort();
  };
  this.scope(function(all) {
    return {
      full: function() {
        delete Cache.messages.has.face.undefined;
        delete Cache.messages.has.face["null"];
        delete Cache.messages.has.face.admin;
        delete Cache.messages.has.face.maker;
        return Object.keys(Cache.messages.has.face).sort();
      },
      potofs: function() {
        return _.without.apply(_, [all.full()].concat(__slice.call(all.others())));
      },
      not_lives: function(turn) {
        return _.without.apply(_, [all.full()].concat(__slice.call(all.lives(turn))));
      },
      not_deads: function(turn) {
        return _.without.apply(_, [all.full()].concat(__slice.call(all.deads(turn))));
      },
      lives: function(turn) {
        return id_list(all.where(function(o) {
          return o.hide.dead && turn < o.hide.dead;
        }));
      },
      deads: function(turn) {
        return id_list(all.where(function(o) {
          return o.hide.dead && o.hide.dead <= turn;
        }));
      },
      others: function() {
        return id_list(all.where(function(o) {
          return o.hide.other;
        }));
      },
      view: function(is_desc, order) {
        return all.sort(is_desc, function(o) {
          return o.order[order];
        });
      }
    };
  });
  this.deploy(function(o) {
    var chr_job, face, is_dead_lose, is_lone_lose, job, mask, name, pt, pt_no, role, role_side_order, role_text, roles, rolestate, said_num, say_type, select, stat_at, stat_order, stat_type, state, text, text_str, urge, win, win_juror, win_love, win_result, win_role, win_side_order, win_zombie, winner, zombie, _i, _len, _ref, _ref1;
    o._id = "" + o.event_id + "-" + o.csid + "-" + o.face_id;
    o.user_id = o.sow_auth_id;
    o.hide = {};
    if (o.event_id) {
      if (o.event_id.match(/-0$/)) {
        o.live = "leave";
      }
    } else {
      o.live = "leave";
    }
    face = o.face();
    name = face ? face.name : o.name;
    o.name = o.zapcount ? "" + RAILS.clearance[o.clearance] + name + "-" + o.zapcount : name;
    stat_at = (0 < (_ref = o.deathday) && _ref < Infinity) ? "" + o.deathday + "日" : (o.deathday = Infinity, "");
    said_num = o.point.saidcount;
    urge = o.point.actaddpt;
    pt_no = o.say.gsay;
    switch (o.live) {
      case "live":
        pt_no = o.say.say;
        o.hide.dead = o.deathday;
        break;
      case "mob":
        if ('juror' === o.story.type.mob) {
          win_juror = 'HUMAN';
        }
        break;
      case "suddendead":
        win_juror = 'LEAVE';
        o.hide.other = true;
        o.hide.dead = o.deathday;
        break;
      case "leave":
        win_juror = 'LEAVE';
        o.hide.other = true;
        pt = 0;
        urge = 0;
        said_num = 0;
        break;
      default:
        o.hide.dead = o.deathday;
    }
    if (o.story.is_epilogue) {
      pt = "∞";
    } else {
      say_type = RAILS.saycnt[o.story.type.say];
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
    win_result = "参加";
    zombie = 0x040;
    switch (o.story.type.game) {
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
    win_love = (_ref1 = RAILS.loves[o.love]) != null ? _ref1.win : void 0;
    win_role = win_by_role(o, RAILS.gifts) || win_by_role(o, RAILS.roles) || "NONE";
    win = win_juror || win_love || win_zombie || win_role;
    if (win === 'EVIL') {
      win = RAILS.folders[o.story.folder].evil;
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
    if (o.story.is_epilogue) {
      switch (o.live) {
        case "suddendead":
        case "leave":
          win_result = "―";
          break;
        default:
          winner = o.event.winner;
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
          if (is_dead_lose && 'live' !== o.live) {
            win_result = "敗北";
          }
          if (is_lone_lose && _.any(o.bonds, function(o) {
            return o.live !== 'live' && _.any(o.bonds, o.pno);
          })) {
            win_result = "敗北";
          }
          if ("NONE" === win) {
            win_result = "参加";
          }
      }
    }
    stat_type = RAILS.live[o.live].name;
    stat_order = RAILS.live[o.live].order;
    win_side_order = RAILS.wins[win].order;
    role_side_order = RAILS.wins[win_role].order;
    roles = (function() {
      var _i, _len, _ref2, _results;
      _ref2 = o.role;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        role = _ref2[_i];
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
      stat_at: [-o.deathday, -stat_order],
      stat_type: [stat_order, -o.deathday],
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
      said_num: said_num ? "" + said_num + "回" : "",
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
  return this.map_reduce(function(o, emit) {});
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
        if (size > 1) {
          return m(".emboss", "" + name + "x" + size);
        } else {
          return m(".emboss", "" + name);
        }
      }),
      event_cards: GUI.names.config(o.card.event, function(name, size) {
        if (size > 1) {
          return m(".emboss", "" + name + "x" + size);
        } else {
          return m(".emboss", "" + name);
        }
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
// Generated by LiveScript 1.3.1
(function(){
  var set_event_without_messages, set_event_messages, catch_gon, out$ = typeof exports != 'undefined' && exports || this;
  set_event_without_messages = function(arg$){
    var _id, story_id, name, created_at, updated_at, messages;
    _id = arg$._id, story_id = arg$.story_id, name = arg$.name, created_at = arg$.created_at, updated_at = arg$.updated_at;
    if (!created_at) {
      return;
    }
    if (!updated_at) {
      return;
    }
    messages = [];
    if ("プロローグ" === name) {
      messages.push({
        event_id: _id,
        story_id: story_id,
        logid: "STORY-TEXT",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 4
      });
      messages.push({
        event_id: _id,
        story_id: story_id,
        logid: "STORY-RULE",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 3
      });
      messages.push({
        event_id: _id,
        story_id: story_id,
        logid: "STORY-GAME",
        mestype: "STORY",
        anchor: "info",
        show: RAILS.message.bit.STORY,
        name: name,
        updated_at: created_at - 2
      });
    }
    messages.push({
      event_id: _id,
      story_id: story_id,
      logid: "EVENT-ASC",
      mestype: "EVENT",
      anchor: "info",
      show: RAILS.message.bit.EVENT_ASC,
      name: name,
      updated_at: created_at - 5
    });
    messages.push({
      event_id: _id,
      story_id: story_id,
      logid: "EVENT-DESC",
      mestype: "EVENT",
      anchor: "info",
      show: RAILS.message.bit.EVENT_DESC,
      name: name,
      updated_at: updated_at - -1
    });
    return Cache.rule.message.merge(messages);
  };
  set_event_messages = function(event){
    Cache.rule.message.merge(event.messages, {
      event_id: event._id
    });
    return console.log(event.messages.length + " messages cache. (" + event._id + ")");
  };
  out$.catch_gon = catch_gon = {
    face: function(){
      var face;
      face = Cache.map_face_detail = gon.face;
      Cache.rule.map_face_story_log.set(face.story_logs);
      face.name = Cache.faces.find(face.face_id).name;
      face.story_id_of_folders = _.groupBy(face.story_ids, function(arg$){
        var k, count, ref$;
        k = arg$[0], count = arg$[1];
        return (ref$ = k.split("-")) != null ? ref$[0] : void 8;
      });
      return face.role_of_wins = _.groupBy(face.roles, function(arg$){
        var k, count, role;
        k = arg$[0], count = arg$[1];
        role = RAILS.gifts[k] || RAILS.roles[k] || {
          group: "OTHER"
        };
        return RAILS.wins[role.group].name;
      });
    },
    form: function(){
      var i$, ref$, len$, o;
      for (i$ = 0, len$ = (ref$ = gon.form.texts).length; i$ < len$; ++i$) {
        o = ref$[i$];
        if (o.csid_cid) {
          o.chr_job_id = o.csid_cid.replace("/", "_").toLowerCase();
        }
      }
      return Cache.rule.writer.set(gon.form.texts);
    },
    map_reduce_faces: function(){
      Cache.rule.chr_set.schema(function(){
        return this.order(function(o){
          return Cache.map_faces.reduce().chr_set[o._id].count;
        });
      });
      return Cache.rule.map_face.set(gon.map_reduce.faces);
    },
    potofs: function(){
      return Cache.rule.potof.set(gon.potofs, {
        story: gon.story
      });
    },
    story: function(){
      if ((typeof gon != 'undefined' && gon !== null ? gon.story : void 8) != null) {
        Cache.rule.story.set([gon.story]);
        return console.log("1 story cache.");
      }
    },
    events: function(){
      var i$, ref$, len$, event, id, ref1$;
      for (i$ = 0, len$ = (ref$ = gon.events).length; i$ < len$; ++i$) {
        event = ref$[i$];
        id = event.story_id + "-" + event.turn;
        event.is_full || (event.is_full = (ref1$ = Cache.events.find(id)) != null ? ref1$.is_full : void 8);
      }
      Cache.rule.event.merge(gon.events);
      return console.log(gon.events.length + " events cache. (" + ((ref$ = gon.story) != null ? ref$._id : void 8) + ")");
    },
    messages: function(){
      var interval, turn, i$, ref$, len$, event;
      interval = gon.story.upd.interval * 1000 * 3600 * 24;
      if (gon.event.messages) {
        turn = gon.event.turn;
        set_event_messages(gon.event);
        set_event_without_messages(gon.event);
      }
      for (i$ = 0, len$ = (ref$ = gon.events).length; i$ < len$; ++i$) {
        event = ref$[i$];
        console.log(event._id + ", " + event.name);
        if (event.messages) {
          set_event_messages(event);
        }
        if (turn !== event.turn) {
          set_event_without_messages(event);
        }
      }
      if (!Url.prop.talk_at()) {
        Url.prop.talk_at(doc.messages.talk(Url.prop).list().first._id);
      }
      if (!Url.prop.memo_at()) {
        Url.prop.memo_at(doc.messages.memo(Url.prop).list().first._id);
      }
      if (!Url.prop.home_at()) {
        return Url.prop.home_at(doc.messages.home(Url.prop).list().first._id);
      }
    },
    sow_auth: function(){
      var deploy;
      deploy = function(o){
        o.uid = m.prop(o.uid);
        o.pwd = m.prop();
        o.is_login = o.is_login > 0;
        return o.is_admin = o.is_admin > 0;
      };
      if ((typeof gon != 'undefined' && gon !== null ? gon.sow_auth : void 8) != null) {
        deploy(gon.sow_auth);
        return sow.auth = gon.sow_auth;
      }
    }
  };
}).call(this);
var _ref;

Url.define(LOCATION.props, LOCATION.bind);

Url.routes = {
  pathname: {
    root: new Url("/"),
    faces: new Url("/map_reduce/faces"),
    events: new Url("/:story_id/file"),
    event: new Url("/:story_id/:turn/messages"),
    story: new Url("/stories/:story_id")
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
    scrolls: new Url("scr=:scroll~:talk_at~:memo_at", {
      unmatch: "?",
      change: function(params) {
        var folder, logid, scroll, turn, updated_at, vid, _ref1, _ref2;
        scroll = win.scroll.prop();
        _ref1 = scroll.split("-"), folder = _ref1[0], vid = _ref1[1], turn = _ref1[2], logid = _ref1[3];
        if (logid != null) {
          updated_at = ((_ref2 = Cache.messages.find(scroll)) != null ? _ref2.updated_at : void 0) || 0;
          Url.prop.updated_at(updated_at, true);
          Url.prop.folder(folder, true);
          Url.prop.turn(turn, true);
          Url.prop.story_id("" + folder + "-" + vid, true);
          Url.prop.event_id("" + folder + "-" + vid + "-" + turn, true);
          Url.prop.message_id("" + folder + "-" + vid + "-" + turn + "-" + logid, true);
        }
      }
    })
  }
};
var _ref;

GUI.if_exist("#css_changer", function(dom) {
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return m(".guide", m("a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "), Btns.radio({}, Url.prop.theme, {
        cinema: "煉瓦",
        star: "蒼穹",
        night: "闇夜",
        moon: "月夜",
        wa: "和の国"
      }), m("hr.black"));
    }
  });
});

if ((typeof gon !== "undefined" && gon !== null ? (_ref = gon.map_reduce) != null ? _ref.faces : void 0 : void 0) != null) {
  catch_gon.map_reduce_faces();
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
              chr_job = Cache.chr_jobs.find("" + (Url.prop.chr_set()) + "_" + o.face_id);
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
              }, GUI.portrate(o.face_id, attr), m(".chrblank.line4", m("div", job_name), m("div", o.face().name), m("div", m("a.mark", {
                href: "/map_reduce/faces/" + o.face_id
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
        return menu.icon.icon("th-large", {
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
  catch_gon.face();
  GUI.if_exist("#summary", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var face, letters, role, rolename, width, win_side;
        face = Cache.map_face_detail;
        letters = [
          GUI.letter("", face.name, "全部で", m("span.mark", face.role.all), "の役職になりました"), (function() {
            var _i, _len, _ref1, _results;
            _ref1 = face.win.keys;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              win_side = _ref1[_i];
              _results.push(GUI.letter("", "" + win_side + " x" + face.win.value[win_side] + "回", (function() {
                var _j, _len1, _ref2, _results1;
                _ref2 = face.role_of_wins[win_side];
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
        return [m("h2", face.name + " の活躍"), face.says[0] != null ? m("h6", m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.min))), m("span", m.trust("&nbsp;〜&nbsp;")), m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.max)))) : void 0, m("table.SAY.talk", win.scroll.mark("summary"), m("tr", m("th", GUI.portrate(face.face_id)), m("td", m(".msg", letters))))];
      }
    });
  });
  GUI.if_exist("#calc", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var face, say, says_calc_line, says_calc_lines, says_count_line, says_count_lines, _i, _len, _ref1;
        face = Cache.map_face_detail;
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
        return [m("table.info", win.scroll.mark("says_count"), says_count_lines), m("table.info", win.scroll.mark("says_calc"), says_calc_lines)];
      }
    });
  });
  GUI.if_exist("#village", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var face, folder, letters, story_id;
        face = Cache.map_face_detail;
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
                      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/" + story_id[0]
                    }, story_id[0]));
                  }));
                }
                return _results1;
              })()));
            }
            return _results;
          })()
        ];
        return m(".MAKER.guide", win.scroll.mark("villages"), letters);
      }
    });
  });
  GUI.if_exist("#sow_user", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var face, length, letters, sow_auth_id, width;
        face = Cache.map_face_detail;
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
        return m(".ADMIN.guide", win.scroll.mark("sow_users"), letters);
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.villages : void 0) != null) {
  GUI.if_exist("#villages", function(dom) {
    Cache.rule.item.set(gon.villages);
    return m.module(dom, {
      controller: function() {},
      view: function() {
        return win.scroll.pager("div", Cache.items.list(), function(v) {
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
        return win.scroll.pager("div", Cache.items.list(), function(v) {
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
        return win.scroll.pager("div", Cache.items.list(), function(v) {
          return GUI.message.history(v);
        });
      }
    });
  });
}
;
var chr_box, chrs, new_chrs, old_chrs;

if (((typeof gon !== "undefined" && gon !== null ? gon.new_chr_faces : void 0) != null) && ((typeof gon !== "undefined" && gon !== null ? gon.new_chr_jobs : void 0) != null)) {
  Cache.rule.face.merge(gon.new_chr_faces);
  Cache.rule.chr_job.merge(gon.new_chr_jobs);
  chrs = Cache.chr_jobs.where({
    chr_set_id: "time"
  }).sort(false, function(o) {
    return o.face.order;
  }).list();
  old_chrs = chrs.slice(0, 24);
  new_chrs = chrs.slice(24);
  chr_box = function(o) {
    var attr;
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
    return m(".chrbox", {
      key: o._id
    }, GUI.portrate(o.face_id, attr), m(".chrblank", m("div", m.trust(o.job)), m("div", m.trust(o.face.name))));
  };
  GUI.if_exist("#map_faces", function(dom) {
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var o;
        return [
          m("h6", "参考文献"), m("hr.black"), m(".mark", "〜 新人さん歓迎パーティー 〜"), m("h6", "いま記述のある新人さんの肩書、名前は仮のものです。"), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = new_chrs.length; _i < _len; _i++) {
              o = new_chrs[_i];
              _results.push(chr_box(o));
            }
            return _results;
          })(), m("h6", "歓迎する人達"), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = old_chrs.length; _i < _len; _i++) {
              o = old_chrs[_i];
              _results.push(chr_box(o));
            }
            return _results;
          })(), m("hr.black")
        ];
      }
    });
  });
}
;
// Generated by LiveScript 1.3.1
(function(){
  var doc, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  out$.doc = doc = {
    seeing: {},
    seeing_add: function(id, sec){
      return doc.seeing[id] = (doc.seeing[id] || 0) + sec;
    },
    load: {
      event: function(shortcut, event, cb){
        event.is_loading = true;
        if (shortcut) {
          return cb();
        } else {
          return window.requestAnimationFrame(function(){
            return Submit.get(event.link).then(function(gon){
              catch_gon.events();
              catch_gon.potofs();
              catch_gon.messages();
              event.is_loading = false;
              return cb();
            });
          });
        }
      }
    },
    messages: {
      seeing: function(filter_size, center){
        var ids, list;
        ids = Object.keys(doc.seeing);
        ids = slice$.call(_.sortBy(ids, function(id){
          return -doc.seeing[id];
        }), 0, filter_size + 1 || 9e9);
        if ((center != null ? center.subid : void 8) === "S") {
          ids = _.select(ids, function(id){
            return 25 < doc.seeing[id] && id !== center._id;
          });
          list = Cache.messages.finds(ids);
          list.unshift(center);
        } else {
          ids = _.select(ids, function(id){
            return 25 < doc.seeing[id];
          });
          list = Cache.messages.finds(ids);
        }
        return list;
      },
      pins: function(arg$){
        var story_id, pins;
        story_id = arg$.story_id, pins = arg$.pins;
        return Cache.messages.pins(story_id(), pins());
      },
      anchor: function(arg$){
        var talk;
        talk = arg$.talk;
        return Cache.messages.anchor(talk(), win.scroll.prop());
      },
      home: function(arg$){
        var home;
        home = arg$.home;
        return Cache.messages.home(home());
      },
      talk: function(arg$){
        var talk, open, potofs_hide, search;
        talk = arg$.talk, open = arg$.open, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Cache.messages.talk(talk(), open(), potofs_hide(), search());
      },
      memo: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Cache.messages.memo(memo(), true, potofs_hide(), search());
      },
      history: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Cache.messages.memo(memo(), false, potofs_hide(), search());
      }
    },
    timeline: function(){
      var ref$, talk, open, potofs_hide, content_width, talk_at;
      ref$ = Url.prop, talk = ref$.talk, open = ref$.open, potofs_hide = ref$.potofs_hide, content_width = ref$.content_width, talk_at = ref$.talk_at;
      return GUI.timeline({
        base: Cache.messages.talk(talk(), open(), potofs_hide()),
        width: content_width(),
        choice: function(id){
          talk_at(id);
          menu.icon.change("search");
          menu.scope.change("talk");
          Url.prop.scroll("");
          return win.scroll.rescroll(talk_at);
        }
      });
    },
    security_modes: function(prop){
      var story, mob, grave_caption, think_caption, list;
      story = Cache.storys.list().first;
      mob = RAILS.mob[story != null ? story.type.mob : void 8];
      grave_caption = [];
      if (Cache.messages.has.grave) {
        grave_caption.push("墓下");
      }
      if (Cache.messages.has.vsay && mob.CAPTION) {
        grave_caption.push(mob.CAPTION);
      }
      think_caption = [];
      if (Cache.messages.has.think) {
        think_caption.push("独り言");
      }
      if (Cache.messages.has.to) {
        think_caption.push("内緒話");
      }
      list = [];
      list.push(m("a", Btn.set({}, prop, "all"), "すべて"));
      if (think_caption.length > 0) {
        list.push(m("a", Btn.set({}, prop, "think"), think_caption.join("/") + "つき"));
      }
      if (Cache.messages.has.clan) {
        list.push(m("a", Btn.set({}, prop, "clan"), "仲間つき"));
      }
      list.push(m("a", Btn.set({}, prop, "open"), "公開情報のみ"));
      list.push(m("a", Btn.set({}, prop, "main"), "出席者のみ"));
      if (grave_caption.length > 0) {
        list.push(m("a", Btn.set({}, prop, "grave"), grave_caption.join("/") + "のみ"));
      }
      list.push(m.trust("&nbsp;"));
      list.push(m("a", Btn.bool({}, Url.prop.open), "公開情報"));
      list.push(m("a", Btn.bool({}, Url.prop.human), "/*中の人*/"));
      return m("p", list);
    },
    potofs: function(){
      var potofs, hides, turn, ref$, ref1$, o, attr;
      potofs = Cache.potofs.view(Url.prop.potofs_desc(), Url.prop.potofs_order()).list();
      hides = Url.prop.potofs_hide();
      turn = ((ref$ = win.scroll.center) != null ? (ref1$ = ref$.event()) != null ? ref1$.turn : void 8 : void 8) || 0;
      return m(".minilist", m("h6", "キャラクターフィルタ"), m("p", m("a", Btn.keys_reset({}, Url.prop.potofs_hide, []), "全員表示"), m("a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.others()), "参加者表示"), m("a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.potofs()), "その他を表示"), m("a", Btn.keys_reset({}, Url.prop.potofs_hide, Cache.potofs.full()), "全員隠す")), m("hr.black"), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = potofs).length; i$ < len$; ++i$) {
          o = ref$[i$];
          attr = fn$;
          results$.push(m(".chrbox", {
            key: o._id
          }, GUI.portrate(o.face_id, attr(o)), m(".bar." + o.live)));
        }
        return results$;
        function fn$(o){
          return GUI.attrs({}, function(){
            var elem;
            this.className(hides[o.face_id] ? "filter-hide" : "");
            elem = null;
            this.config(function(_elem){
              var elem;
              return elem = _elem;
            });
            return this.click(function(){
              hides[o.face_id] = !hides[o.face_id];
              return Url.prop.potofs_hide(hides);
            });
          });
        }
      }()), m("hr.black"));
    },
    writer: function(){
      var i$, ref$, len$, o, props, results$ = [];
      for (i$ = 0, len$ = (ref$ = Cache.writers.list()).length; i$ < len$; ++i$) {
        o = ref$[i$];
        props = {
          form: o,
          log: ""
        };
        Cache.rule.history.merge(props);
        results$.push(o.vdom(o, props));
      }
      return results$;
    }
  };
  win.scroll = new GUI.ScrollSpy(Url.prop.scroll);
  win.scroll.tick = function(center, sec){
    if (center.subid === "S") {
      doc.seeing_add(center._id, sec);
      if (25 === doc.seeing[center._id]) {
        return m.redraw();
      }
    }
  };
  win.on.resize.push(function(){
    var width;
    width = document.querySelector('#contentframe').offsetWidth;
    Url.prop.content_width(width);
    if (width <= 770) {
      Url.prop.h1_width(770);
    }
    if (width <= 580) {
      Url.prop.h1_width(580);
    }
    if (width <= 458) {
      Url.prop.h1_width(458);
    }
    switch (Url.prop.layout()) {
    case "right":
      return Url.prop.right_width(0);
    case "center":
      return Url.prop.right_width((win.width - width - 4) / 2);
    case "left":
      return Url.prop.right_width(win.width - width - 4);
    }
  });
}).call(this);
// Generated by LiveScript 1.3.1
(function(){
  var menu, out$ = typeof exports != 'undefined' && exports || this;
  out$.menu = menu = {
    icon: new GUI.MenuTree.Icon,
    scope: new GUI.MenuTree
  };
  menu.icon.icon("cog", {
    view: function(){
      return m(".paragraph.guide", m("h6", "スタイル"), Btns.radio({}, Url.prop.theme, {
        cinema: "煉瓦",
        star: "蒼穹",
        night: "闇夜",
        moon: "月夜",
        wa: "和の国"
      }), m("h6", "幅の広さ"), Btns.radio({}, Url.prop.width, {
        full: "最大",
        wide: "広域",
        std: "普通"
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
}).call(this);
var __slice = [].slice;

GUI.if_exist("#contentframe", function(dom) {});

GUI.if_exist("#buttons", function(dom) {
  var layout;
  if (!head.browser.ios) {
    win.on.orientation.push(function() {
      var alpha, anime, beta, box, gamma, rotate, z, _i, _len, _ref, _ref1, _results;
      _ref = win.orientation, alpha = _ref.alpha, beta = _ref.beta, gamma = _ref.gamma;
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
      _ref1 = document.querySelectorAll(".icon-cog");
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        box = _ref1[_i];
        _results.push(anime(box));
      }
      return _results;
    });
  }
  layout = new GUI.Layout(dom, 1, -1, 120);
  layout.width = 5;
  layout.transition();
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var badges, section, vdoms;
      vdoms = [];
      section = function(icon) {
        var vdom;
        if (!menu.icon.nodes[icon]) {
          return;
        }
        vdom = m("section", menu.icon.start({
          "class": "glass"
        }, icon), m(".bigicon", m(".icon-" + icon, " ")), badges[icon] ? m(".badge.pull-right", badges[icon]()) : void 0);
        return vdoms.push(vdom);
      };
      badges = {
        "pin": function() {
          return doc.messages.pins(Url.prop).list().length - Cache.events.list().length;
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
          return doc.messages.memo(prop).list().length - Cache.events.list().length;
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
          return doc.messages.history(prop).list().length - Cache.events.list().length;
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
          return doc.messages.talk(prop).list().length - Cache.events.list().length;
        },
        "th-large": function() {
          return Cache.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length;
        }
      };
      switch (menu.scope.state()) {
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
      if ("pins" !== menu.scope.state()) {
        section("search");
      }
      section("cog");
      return m("table", m("tr", m("td", vdoms)));
    }
  });
});

GUI.if_exist("#topviewer", function(dom) {
  var layout;
  layout = new GUI.Layout(dom, 0, 1, 110, head.browser.ios, 0);
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return menu.icon.view();
    }
  });
});

GUI.if_exist("title", function(dom) {
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var event, story;
      story = Cache.storys.find(Url.prop.story_id());
      event = Cache.events.find(Url.prop.event_id());
      if ((story != null) && (event != null)) {
        return "" + story.name + " " + event.name;
      } else {
        return "人狼議事";
      }
    }
  });
});

if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
  catch_gon.potofs();
  GUI.if_exist("#sayfilter", function(dom) {
    var layout, line_text_height, line_text_height_measure, seeing_measure, seeing_top, wide_attr;
    layout = new GUI.Layout(dom, -1, 1, 100);
    layout.small_mode = true;
    layout.large_mode = function() {
      return !(menu.icon.state() || layout.small_mode);
    };
    wide_attr = GUI.attrs({}, function() {
      this.click(function() {
        layout.small_mode = !layout.small_mode;
        if (!layout.small_mode) {
          return menu.icon.state("");
        }
      });
      return this.actioned(function() {
        return layout.translate();
      });
    });
    seeing_top = 100;
    seeing_measure = {
      config: function(elem) {
        return seeing_top = elem.offsetTop;
      }
    };
    line_text_height = 27;
    line_text_height_measure = {
      config: function(elem) {
        return line_text_height = elem.offsetHeight;
      }
    };
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var anchorview, center_id, day, event, filter, filter_size, go_click, key, o, potofs, seeingview, star, tag, val;
        layout.width = Url.prop.right_width();
        if (layout.large_mode()) {
          layout.width += Url.prop.content_width();
        }
        if (layout.width < 90) {
          layout.width = 90;
          potofs = m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]"))), m("tbody.plane", {
            test: "test"
          }, m("tr", m("th.calc", "…")))));
          filter = [];
        } else {
          filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3;
          center_id = win.scroll.prop();
          potofs = GUI.message.potofs();
          anchorview = doc.messages.anchor(Url.prop).list();
          seeingview = doc.messages.seeing(filter_size, win.scroll.center);
          go_click = function(o) {
            return GUI.attrs({}, function() {
              return this.click(function() {
                Url.prop.talk_at(o._id);
                Url.prop.pins({});
                menu.icon.change("");
                menu.scope.change("talk");
                Url.prop.scroll("");
                return win.scroll.rescroll(Url.prop.talk_at);
              });
            });
          };
          day = 24 * 60 * 60;
          star = function(o) {
            var attr;
            if (doc.seeing[o._id] >= day) {
              attr = GUI.attrs({}, function() {
                return this.start(function(e) {
                  return delete doc.seeing[o._id];
                });
              });
              return m("span.btn.edge", attr, "★ ");
            } else {
              attr = GUI.attrs({}, function() {
                return this.start(function(e) {
                  return doc.seeing_add(o._id, day);
                });
              });
              return m("span.btn.edge", attr, "☆ ");
            }
          };
          filter = m("section.plane", m("h6", "参照ログ"), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = anchorview.length; _i < _len; _i++) {
              o = anchorview[_i];
              _results.push(m(".line_text", m("." + o.mestype + ".badge", go_click(o), "" + o.turn + ":" + o.anchor), m.trust(o.log.line_text)));
            }
            return _results;
          })(), m("h6", seeing_measure, "よく見ていたログ"), (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = seeingview.length; _i < _len; _i++) {
              o = seeingview[_i];
              if (o._id === center_id) {
                tag = ".line_text.attention";
              } else {
                tag = ".line_text";
              }
              _results.push(m(tag, line_text_height_measure, star(o), m("." + o.mestype + ".badge", go_click(o), "" + o.turn + ":" + o.anchor), m.trust("" + o.name + " " + o.log.line_text)));
            }
            return _results;
          })());
        }
        potofs.children[0].children[1].attrs.className = "plane fine";
        for (key in wide_attr) {
          val = wide_attr[key];
          potofs.children[0].children[1].attrs[key] = val;
        }
        event = Cache.events.find(Url.prop.event_id());
        return m("div", event != null ? m(".head", event.name) : m(".foot"), m("aside", potofs, filter), m(".foot"));
      }
    });
  });
}

if (((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && (gon.event != null)) {
  catch_gon.story();
  catch_gon.events();
  GUI.if_exist("#messages", function(dom) {
    var change_pin;
    win.scroll.size = 30;
    change_pin = function(id) {
      var target, target_at;
      target = menu.scope.state();
      switch (target) {
        case "history":
          target_at = Url.prop.memo_at;
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
      return menu.icon.change("pin");
    };
    GUI.message.delegate.tap_anchor = function(turn, logid, id, by_id) {
      var by_logid, by_turn, event, folder, has_tap, vid, _ref;
      _ref = by_id.split("-"), folder = _ref[0], vid = _ref[1], by_turn = _ref[2], by_logid = _ref[3];
      has_tap = Cache.messages.find("" + folder + "-" + vid + "-" + turn + "-" + logid) != null;
      event = Cache.events.find("" + folder + "-" + vid + "-" + turn);
      return doc.load.event(has_tap, event, function() {
        var pins;
        pins = Url.prop.pins();
        pins["" + by_turn + "-" + by_logid] = true;
        pins["" + turn + "-" + logid] = true;
        Url.prop.pins(pins);
        return change_pin(by_id);
      });
    };
    GUI.message.delegate.tap_identity = function(turn, logid, id) {
      var pins;
      pins = Url.prop.pins();
      pins["" + turn + "-" + logid] = true;
      Url.prop.pins(pins);
      return change_pin(id);
    };
    menu.scope.node("history", {
      open: function() {
        Url.prop.scroll("");
        return win.scroll.rescroll(Url.prop.memo_at);
      }
    });
    menu.scope.node("memo", {
      open: function() {
        Url.prop.scroll("");
        return win.scroll.rescroll(Url.prop.memo_at);
      }
    });
    menu.scope.node("talk", {
      open: function() {
        Url.prop.scroll("");
        return win.scroll.rescroll(Url.prop.talk_at);
      }
    });
    menu.scope.node("home", {
      open: function() {
        Url.prop.scroll("");
        return win.scroll.rescroll(Url.prop.home_at);
      }
    });
    menu.scope.node("pins", {
      open: function() {
        return win.scroll.rescroll(Url.prop.scroll);
      }
    });
    menu.icon.icon("pin", {
      open: function() {
        return menu.scope.change("pins");
      },
      close: function() {
        Url.prop.pins({});
        return menu.scope.change(Url.prop.back());
      },
      view: function() {
        return [m(".paragraph.guide", doc.timeline())];
      }
    });
    menu.icon.icon("home", {
      open: function() {
        return menu.scope.change("home");
      },
      view: function() {
        return [doc.timeline()];
      }
    });
    menu.icon.icon("mail", {
      open: function() {
        return menu.scope.change("memo");
      },
      view: function() {
        return [m(".paragraph.guide", doc.timeline(), m("h6", "貼り付けたメモを表示します。 - メモ"), doc.security_modes(Url.prop.memo)), doc.potofs()];
      }
    });
    menu.icon.icon("chat-alt", {
      open: function() {
        return menu.scope.change("talk");
      },
      view: function() {
        return [m(".paragraph.guide", doc.timeline(), m("h6", "村内の発言を表示します。 - 発言"), doc.security_modes(Url.prop.talk)), doc.potofs()];
      }
    });
    menu.icon.icon("clock", {
      open: function() {
        return menu.scope.change("history");
      },
      view: function() {
        return [m(".paragraph.guide", doc.timeline(), m("h6", "メモを履歴形式で表示します。 - メモ"), doc.security_modes(Url.prop.memo)), doc.potofs()];
      }
    });
    menu.icon.icon("search", {
      view: function() {
        return m(".paragraph.guide", doc.timeline(), m("input.medium", Txt.input(Url.prop.search)), m("span", "発言中の言葉を検索します。"), m("hr.black"));
      }
    });
    m.module(dom, {
      controller: function() {},
      view: function() {
        return win.scroll.pager("div", doc.messages[menu.scope.state()](Url.prop).list(), function(o) {
          var anchor_num;
          anchor_num = o.logid.slice(2) - 0 || 0;
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
          if (!o.updated_at) {
            o.updated_at = new Date(o.date) - 0;
            delete o.date;
          }
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
      catch_gon.events();
      catch_gon.messages();
      menu.scope.open();
      return m.endComputation();
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
  Cache.rule.story.set(gon.stories);
  GUI.if_exist("#stories", function(dom) {
    menu.icon.icon("resize-full", {
      open: function() {
        win.scroll.size = 30;
        return menu.scope.change("full");
      }
    });
    menu.icon.icon("resize-normal", {
      deploy: function() {
        win.scroll.size = 120;
        return menu.scope.change("normal");
      },
      open: function() {
        win.scroll.size = 120;
        return menu.scope.change("normal");
      }
    });
    return m.module(dom, {
      controller: function() {},
      view: function() {
        var query, _ref;
        query = (_ref = Cache.storys).menu.apply(_ref, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values())));
        return [
          menu.icon.icon("search", {
            deploy: function(main_menu) {
              main_menu.drill("rating", {
                caption: "こだわり",
                view: function(sub_menu) {
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, ["all"].concat(__slice.call(Url.routes.search.stories.values()))).reduce();
                  return sub_menu.radio({
                    "class": "folder"
                  }, Url.prop.folder, reduce, "folder", function(key, o) {
                    var _ref2;
                    return (_ref2 = GAME[key]) != null ? _ref2.nation : void 0;
                  });
                }
              });
              main_menu.drill("say_limit", {
                caption: "発言制限",
                view: function(sub_menu) {
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
                  var reduce, _ref1;
                  reduce = (_ref1 = Cache.storys).menu.apply(_ref1, [Url.prop.folder()].concat(__slice.call(Url.routes.search.stories.values({
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
          }), m("table", m("thead", m("tr", m("th"))), win.scroll.pager("tbody", query.list(), function(o) {
            var header;
            header = m("div", m("a", {
              href: "http://giji.check.jp" + o.link
            }, m("code.icon-download")), m("a", {
              href: "http://7korobi.gehirn.ne.jp/stories/" + o._id + ".html"
            }, m("code.icon-download")), m("kbd.note", o._id), m("a", {
              href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/" + o._id
            }, m.trust(o.name)), m("kbd", o.view.rating));
            return m("tr", {
              key: o._id
            }, menu.icon.state() === "resize-full" ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", "" + o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", "" + o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m(".list", o.view.role_cards), m(".list", o.view.event_cards)) : m("td", header));
          }))
        ];
      }
    });
  });
}

if ((typeof gon !== "undefined" && gon !== null ? gon.form : void 0) != null) {
  catch_gon.form();
  menu.icon.icon("pencil", {
    open: function() {},
    close: function() {},
    view: function() {
      return [m(".paragraph.guide", doc.timeline(), m("h6", "あなたが書き込む内容です。 - 記述"), doc.writer())];
    }
  });
}
;
GUI.if_exist("#character_tag", function(dom) {
  var tag, vdom;
  tag = m.prop();
  tag("all");
  vdom = function(name, val) {
    return [m("span", name), m("span.emboss.pull-right", val)];
  };
  return m.module(dom, {
    controller: function() {},
    view: function() {
      var attr, chr_job, chrs, job_name, o;
      chrs = Cache.faces.tag(tag()).list();
      return [
        menu.icon.icon("th-large", {
          view: function(main_menu) {
            return m(".paragraph.guide", m("h6", "タグを選んでみよう"), Btns.radio({
              "class": "edge"
            }, tag, {
              all: vdom("- 全体 -", Cache.faces.reduce().all.all.count),
              giji: vdom(RAILS.tag.giji.name, Cache.faces.reduce().tag.giji.count),
              shoji: vdom(RAILS.tag.shoji.name, Cache.faces.reduce().tag.shoji.count),
              travel: vdom(RAILS.tag.travel.name, Cache.faces.reduce().tag.travel.count),
              stratos: vdom(RAILS.tag.stratos.name, Cache.faces.reduce().tag.stratos.count),
              myth: vdom(RAILS.tag.myth.name, Cache.faces.reduce().tag.myth.count),
              asia: vdom(RAILS.tag.asia.name, Cache.faces.reduce().tag.asia.count),
              marchen: vdom(RAILS.tag.marchen.name, Cache.faces.reduce().tag.marchen.count),
              kid: vdom(RAILS.tag.kid.name, Cache.faces.reduce().tag.kid.count),
              young: vdom(RAILS.tag.young.name, Cache.faces.reduce().tag.young.count),
              middle: vdom(RAILS.tag.middle.name, Cache.faces.reduce().tag.middle.count),
              elder: vdom(RAILS.tag.elder.name, Cache.faces.reduce().tag.elder.count),
              river: vdom(RAILS.tag.river.name, Cache.faces.reduce().tag.river.count),
              road: vdom(RAILS.tag.road.name, Cache.faces.reduce().tag.road.count),
              immoral: vdom(RAILS.tag.immoral.name, Cache.faces.reduce().tag.immoral.count),
              guild: vdom(RAILS.tag.guild.name, Cache.faces.reduce().tag.guild.count),
              elegant: vdom(RAILS.tag.elegant.name, Cache.faces.reduce().tag.elegant.count),
              ecclesia: vdom(RAILS.tag.ecclesia.name, Cache.faces.reduce().tag.ecclesia.count),
              medical: vdom(RAILS.tag.medical.name, Cache.faces.reduce().tag.medical.count),
              market: vdom(RAILS.tag.market.name, Cache.faces.reduce().tag.market.count),
              apartment: vdom(RAILS.tag.apartment.name, Cache.faces.reduce().tag.apartment.count),
              servant: vdom(RAILS.tag.servant.name, Cache.faces.reduce().tag.servant.count),
              farm: vdom(RAILS.tag.farm.name, Cache.faces.reduce().tag.farm.count),
              government: vdom(RAILS.tag.government.name, Cache.faces.reduce().tag.government.count),
              god: vdom(RAILS.tag.god.name, Cache.faces.reduce().tag.god.count)
            }));
          }
        }), m(".chrlist", m("div", m("h6", RAILS.tag[tag()].long), m(".GSAY.badge", RAILS.tag[tag()].name), "の" + chrs.length + "人を表示しています。"), m("hr.black"), (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = chrs.length; _i < _len; _i++) {
            o = chrs[_i];
            chr_job = Cache.chr_jobs.find("all_" + o._id);
            job_name = chr_job.job;
            attr = GUI.attrs({}, function() {
              return this.click(function() {});
            });
            _results.push(m(".chrbox", {
              key: o._id
            }, GUI.portrate(o._id, attr), m(".chrblank.line2", m("div", job_name), m("div", o.name))));
          }
          return _results;
        })(), m("hr.black"))
      ];
    }
  });
});
var head_menu;

head_menu = function(state) {
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
    }, m("strong", "終了した村"))) : void 0, m("tr", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ"))), "progress" === state() ? m("tbody", m("tr", m("td", m("a", {
      href: GAME.LOBBY.config.cfg.URL_SW + "/sow.cgi"
    }, "lobby"), m("br"), "offparty"), m("td", "" + max_morphe + "村:", m("a", {
      href: GAME.MORPHE.config.cfg.URL_SW + "/sow.cgi"
    }, "morphe"), m("br"), "" + max_cafe + "村:", m("a", {
      href: GAME.CABALA.config.cfg.URL_SW + "/sow.cgi"
    }, "cafe")), m("td", "wolf", m("br"), "ultimate", m("br"), "allstar"), m("td", "role-play", m("br"), "RP-advance", m("br"), "" + max_vage + "村:", m("a", {
      href: GAME.PERJURY.config.cfg.URL_SW + "/sow.cgi"
    }, "perjury"), m("br"), "" + max_xebec + "村:", m("a", {
      href: GAME.XEBEC.config.cfg.URL_SW + "/sow.cgi"
    }, "xebec"), m("br"), "" + max_crazy + "村:", m("a", {
      href: GAME.CRAZY.config.cfg.URL_SW + "/sow.cgi"
    }, "crazy"), m("br"), "" + max_ciel + "村:", m("a", {
      href: GAME.CIEL.config.cfg.URL_SW + "/sow.cgi"
    }, "ciel")))) : void 0, "finish" === state() ? m("tbody", m("tr", m("td", m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=LOBBY"
    }, "lobby"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=OFFPARTY"
    }, "offparty")), m("td", m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=MORPHE"
    }, "morphe"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CABALA"
    }, "cafe")), m("td", m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=WOLF"
    }, "wolf"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=ULTIMATE"
    }, "ultimate"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=ALLSTAR"
    }, "allstar")), m("td", m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=RP"
    }, "role-play"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=PRETENSE"
    }, "advance"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=PERJURY"
    }, "perjury"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=XEBEC"
    }, "xebec"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CRAZY"
    }, "crazy"), m("br"), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/all?folder=CIEL"
    }, "ciel")))) : void 0)
  ];
};

GUI.if_exist("#head_navi", function(dom) {
  var state;
  state = m.prop("finish");
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return [m(".left_image"), m(".right_image"), m("table.board#headline", head_menu(state))];
    }
  });
});

GUI.if_exist("#headline", function(dom) {
  var state;
  state = m.prop("finish");
  return m.module(dom, {
    controller: function() {},
    view: function() {
      return m(".choice", m("table.board", head_menu(state)));
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
        m.redraw();
        return 12 * hour - zone % (12 * hour);
      });
    },
    view: function() {
      var width, _base;
      width = typeof (_base = Url.prop).h1_width === "function" ? _base.h1_width() : void 0;
      if (width == null) {
        width = 458;
      }
      return m("a", {
        href: "//giji.check.jp/"
      }, GUI.title(width, Url.prop.theme(), day_or_night()));
    }
  });
});
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

menu.icon.state = Url.prop.icon;

menu.scope.state = Url.prop.scope;

win["do"].resize();

m.endComputation();



