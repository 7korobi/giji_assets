(function(){
  var doc, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  out$.doc = doc = {
    delegate: {
      tap_identity: function(){
        return console.log(arguments);
      },
      tap_anchor: function(){
        return console.log(arguments);
      },
      tap_random: function(){
        return console.log(arguments);
      },
      tap_external: function(){
        return console.log(arguments);
      }
    },
    component: {},
    view: {},
    user: {},
    seeing: {},
    seeing_add: function(id, sec){
      return doc.seeing[id] = (doc.seeing[id] || 0) + sec;
    },
    load: {
      event: function(shortcut, event, cb){
        if (shortcut) {
          return cb();
        } else {
          event.is_loading = true;
          return Submit.get(event.link).then(function(gon){
            catch_gon.villages();
            catch_gon.messages();
            event.is_loading = false;
            return cb();
          });
        }
      }
    },
    width: {
      content: function(){
        return document.querySelector("#contentframe").offsetWidth;
      }
    },
    template: function(v){
      var t;
      switch (false) {
      case (t = doc.component[v.template]) == null:
        return m("div", m.component(t, v));
      case (t = doc.view[v.template]) == null:
        return t(v);
      default:
        return m(".paragraph", JSON.stringify(v));
      }
    },
    messages: {
      seeing: function(filter_size, center){
        var ids;
        ids = Object.keys(doc.seeing);
        ids = slice$.call(_.sortBy(ids, function(id){
          return -doc.seeing[id];
        }), 0, filter_size + 1 || 9e9);
        if ((center != null ? center.subid : void 8) === "S") {
          ids = _.filter(ids, function(id){
            return 25 < doc.seeing[id] && id !== center._id;
          });
          ids.unshift(center._id);
        } else {
          ids = _.filter(ids, function(id){
            return 25 < doc.seeing[id];
          });
        }
        return Mem.Query.messages.finds(ids);
      },
      pins: function(arg$){
        var story_id, pins;
        story_id = arg$.story_id, pins = arg$.pins;
        return Mem.Query.messages.pins(story_id, pins);
      },
      anchor: function(arg$){
        var talk;
        talk = arg$.talk;
        return Mem.Query.messages.anchor(talk, win.scroll.prop());
      },
      home: function(arg$){
        var home;
        home = arg$.home;
        return Mem.Query.messages.home(home);
      },
      talk: function(arg$){
        var talk, open, potofs_hide, search;
        talk = arg$.talk, open = arg$.open, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.Query.messages.talk(talk, open, potofs_hide, search);
      },
      memo: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.Query.messages.memo(memo, true, potofs_hide, search);
      },
      history: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.Query.messages.memo(memo, false, potofs_hide, search);
      }
    },
    writer: function(){
      var i$, ref$, len$, o, props, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.Query.writers.list).length; i$ < len$; ++i$) {
        o = ref$[i$];
        props = {
          form: o,
          log: ""
        };
        Mem.Collection.history.merge(props);
        results$.push(o.vdom(o, props));
      }
      return results$;
    },
    mount_item: function(type){
      console.log("deploy #item-" + type);
      return win.mount("#item-" + type, function(){
        return m.component(doc.component.item, type);
      });
    }
  };
}).call(this);

(function() {
  WebStore.cookie_options = {
    time: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    secure: false
  };

  Url.define = function(key) {
    return Mem.Query.stores.hash[key];
  };

  Url.maps({
    hash: {
      pin: "pin=:back~:pins",
      mode: "mode=:scope~:icon",
      potofs: "ptf=:potofs_order~:potofs_desc~:potofs_hide"
    },
    search: {
      faces: "face=:chr_set~:order~:search",
      scroll: "scr=:scroll~:talk_at~:memo_at",
      folder: "folder=:folder",
      stories: "story=:game~:rating~:event_type~:role_type~:say_limit~:player_length~:update_at~:update_interval~:search",
      messages: "log=:home~:talk~:memo~:open~:human~:search"
    }
  });

  Url.conf.scroll.current = true;

  Url.tie = InputTie.btns(Url.params, ["theme", "width", "layout", "font"]);

  WebStore.maps({
    session: ["theme", "width", "layout", "font"]
  });

}).call(this);

(function() {
  if (((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && (gon.event != null)) {
    win.mount("#messages", function(dom) {
      win.scroll.size = 30;
      Url.conf.messages.current = true;
      doc.delegate.tap_external = function(id, uri, protocol, host, path) {
        var message;
        message = protocol + "://" + host + "\n" + path + "\n\nこのURLを開きますか？";
        if (window.confirm(message)) {
          return window.open(uri, "_giji");
        }
      };
      doc.delegate.tap_anchor = function(turn, logid, id, by_id) {
        var __, anker_id, by_logid, by_turn, event, folder, has_tap, ref, ref1, vid;
        ref = by_id.split("-"), folder = ref[0], vid = ref[1], by_turn = ref[2], by_logid = ref[3];
        anker_id = Mem.Query.messages.anker_id(folder, vid, turn, logid);
        ref1 = anker_id.split("-"), __ = ref1[0], __ = ref1[1], __ = ref1[2], logid = ref1[3];
        has_tap = Mem.Query.messages.find(anker_id);
        event = Mem.Query.events.find(folder + "-" + vid + "-" + turn);
        return doc.load.event(has_tap, event, function() {
          var pins;
          pins = Url.params.pins;
          pins[by_turn + "-" + by_logid] = true;
          pins[turn + "-" + logid] = true;
          return change_pin(by_id);
        });
      };
      doc.delegate.tap_identity = function(turn, logid, id) {
        return;
        Url.params.pins[turn + "-" + logid] = true;
        return change_pin(id);
      };
      return {
        controller: function() {
          catch_gon.villages();
          return catch_gon.messages();
        },
        view: function() {
          return win.scroll.pager("div", doc.messages[menu.params.scope](Url.params).list, doc.template);
        }
      };
    });
  }

}).call(this);

(function() {
  var menu;

  this.menu = menu = InputTie.btns(Url.params, ["icon", "scope"]);

  menu.change = function(id, value, old_value) {
    switch (id) {
      case "scope":
        switch (value) {
          case "history":
          case "memo":
            Url.params.scroll = "";
            return ScrollSpy.go(Url.params.memo_at);
          case "talk":
            Url.params.scroll = "";
            return ScrollSpy.go(Url.params.talk_at);
          case "home":
            Url.params.scroll = "";
            return ScrollSpy.go(Url.params.home_at);
          case "pins":
            Url.params.scroll = "";
            return ScrollSpy.go(Url.params.scroll);
        }
        break;
      case "icon":
        switch (value) {
          case "pin":
            menu.do_change("scope", "pins");
            break;
          case "home":
            menu.do_change("scope", "home");
            break;
          case "mail":
            menu.do_change("scope", "memo");
            break;
          case "chat-alt":
            menu.do_change("scope", "talk");
            break;
          case "clock":
            menu.do_change("scope", "history");
            break;
          case "resize-full":
            win.scroll.size = 30;
            menu.do_change("scope", "full");
            break;
          case "resize-normal":
            win.scroll.size = 120;
            menu.do_change("scope", "normal");
        }
        switch (old_value) {
          case "pin":
            Url.params.pins = {};
            return menu.do_change("scope", Url.params.back);
        }
    }
  };

  menu.input.scope.change_pin = function(id) {
    var target, target_at;
    target = Url.params.scope;
    target_at = (function() {
      switch (target) {
        case "history":
          return "memo_at";
        case "memo":
        case "talk":
        case "home":
          return target + "_at";
        default:
          return null;
      }
    })();
    if (target_at) {
      Url.params.back = target;
      Url.params[target_at] = id;
    }
    Url.params.scroll = id;
    return menu.do_change("icon", "pin");
  };

}).call(this);

(function() {
  win.scroll.prop = Url.prop.scroll;

  win.on.tick.push(function(sec) {
    var _id, ref, subid;
    if (win.scroll.center == null) {
      return;
    }
    ref = win.scroll.center, subid = ref.subid, _id = ref._id;
    if (subid === "S") {
      doc.seeing_add(_id, sec);
      if (25 === doc.seeing[_id]) {
        return m.redraw();
      }
    }
  });

  win.on.resize.push(function() {
    return m.redraw();
  });

  win.mount("title", function() {
    return doc.component.title;
  });

  win.mount("#character_tag", function() {
    return doc.component.characters;
  });

  win.mount("#to_root", function() {
    return {
      controller: function() {},
      view: doc.view.banner
    };
  });

  win.mount("#buttons", function(dom) {
    var layout;
    layout = new win.layout(dom, 1, -1);
    layout.width = 5;
    return doc.component.buttons;
  });

  win.mount("#topviewer", function(dom) {
    var layout;
    layout = new win.layout(dom, 0, 1, false, 0);
    return doc.component.topviewer;
  });

  win.mount("#sow_auth", function() {
    return {
      controller: function() {},
      view: function() {
        return m.component(doc.component.sow_auth, Url.params);
      }
    };
  });

  win.mount("#head_navi", function() {
    return {
      controller: function() {},
      view: function() {
        return m(".paragraph", m(".left_image"), m(".right_image"), m.component(doc.component.header));
      }
    };
  });

  win.mount("#headline", function() {
    return {
      controller: function() {},
      view: function() {
        return m(".choice", m.component(doc.component.header));
      }
    };
  });

  if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
    win.mount("#sayfilter", function(dom) {
      return {
        controller: function() {
          var layout, tie;
          this.layout = layout = new win.layout(dom, -1, 1);
          layout.large_mode = function() {
            return !(menu.params.icon || "small" === tie.params.sayfilter);
          };
          this.params = {};
          this.tie = tie = InputTie.btns(this.params, ["sayfilter"]);
          this.tie.change = function(id, value, old) {
            switch (id) {
              case "sayfilter":
                menu.params.icon = "";
                return layout.translate();
            }
          };
        },
        view: function(arg) {
          var attr, event, filter, layout, potofs, tie, width;
          tie = arg.tie, layout = arg.layout;
          width = doc.width.content();
          layout.width = (function() {
            switch (Url.params.layout) {
              case "right":
                return 0;
              case "center":
                return (win.width - width - 4) / 2;
              case "left":
                return win.width - width - 4;
            }
          })();
          if (layout.large_mode()) {
            layout.width += width;
          }
          if (layout.width < 90) {
            layout.width = 90;
            potofs = doc.component.potofs_hide;
            filter = doc.component.filter_hide;
          } else {
            potofs = doc.component.potofs;
            filter = doc.component.filter;
          }
          event = Mem.Query.events.find(Url.params.event_id);
          tie.draw();
          attr = tie.input.sayfilter.field({
            className: "plane fine"
          }).attr;
          return m("div", event != null ? m(".head", event.name) : m(".foot"), m("aside", m.component(potofs, attr), m.component(filter)), m(".foot"));
        }
      };
    });
  }

  if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
    Mem.Collection.story.set(gon.stories);
    win.mount("#stories", function(dom) {
      menu.do_change("icon", "resize-normal");
      return doc.component.stories;
    });
  }

  window.addEventListener("hashchange", function(arg) {
    var newURL, oldURL;
    newURL = arg.newURL, oldURL = arg.oldURL;
    return Url.popstate();
  });

  window.addEventListener("popstate", function(arg) {
    var state;
    state = arg.state;
    return Url.popstate();
  });

  win.deploy();

  m.endComputation();

}).call(this);

(function() {
  doc.component.buttons = {
    controller: function() {
      var badges, icon, option, ref, section, vdom;
      badges = {
        "pin": function() {
          return doc.messages.pins(Url.params).list.length - Mem.Query.events.list.length;
        },
        "home": function() {
          return Mem.Query.messages.home("announce").list.length - Mem.Query.events.list.length;
        },
        "mail": function() {
          var params;
          params = _.merge({}, Url.params, {
            memo: "all",
            uniq: true,
            search: ""
          });
          return doc.messages.memo(params).list.length - Mem.Query.events.list.length;
        },
        "clock": function() {
          var params;
          params = _.merge({}, Url.params, {
            talk: "all",
            open: true,
            search: ""
          });
          return doc.messages.history(params).list.length - Mem.Query.events.list.length;
        },
        "chat-alt": function() {
          var params;
          params = _.merge({}, Url.params, {
            talk: "all",
            open: true,
            search: ""
          });
          return doc.messages.talk(params).list.length - Mem.Query.events.list.length;
        },
        "th-large": function() {}
      };
      ref = Mem.Query.inputs.hash.icon.options;
      for (icon in ref) {
        option = ref[icon];
        option.badge = badges[icon];
      }
      vdom = [];
      section = function(icon) {
        return vdom.push(menu.input.icon.item(icon, {
          className: "glass tooltip-right",
          tag: "bigicon"
        }));
      };
      return {
        vdom: vdom,
        section: section
      };
    },
    view: function(arg) {
      var section, vdom;
      section = arg.section, vdom = arg.vdom;
      vdom.length = 0;
      menu.draw();
      switch (Url.params.scope) {
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
      if ("pins" !== menu.params.scope) {
        section("search");
      }
      section("cog");
      return m("table", m("tr", m("td", vdom)));
    }
  };

}).call(this);

(function() {
  doc.component.calc = {
    controller: function() {},
    view: function() {
      var face, i, len, ref, say, says_calc_line, says_calc_lines, says_count_line, says_count_lines;
      face = Mem.map_face_detail;
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
      ref = face.says;
      for (i = 0, len = ref.length; i < len; i++) {
        say = ref[i];
        says_count_line = m("tr." + say.logid_head + "AY.line", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg.calc", (GUI.comma(say.max)) + " 字"), m("th.msg.calc", (GUI.comma(say.all)) + " 字"), m("th.msg.calc", (GUI.comma(say.count)) + " 回"));
        says_calc_line = m("tr." + say.logid_head + "AY.line", m("th.msg"), m("th.msg", face.say_titles[say.logid_head]), m("th.msg.calc", (GUI.comma(say.vil)) + " 村"), m("th.msg.calc", (GUI.comma(say.all / say.vil)) + " 字"), m("th.msg.calc", (GUI.comma(say.count / say.vil)) + " 回"));
        says_count_lines.push(says_count_line);
        says_calc_lines.push(says_calc_line);
      }
      return [m("table.info", win.scroll.mark("says_count"), says_count_lines), m("table.info", win.scroll.mark("says_calc"), says_calc_lines)];
    }
  };

}).call(this);

(function() {
  doc.component.characters = {
    controller: function() {
      Url.tie.bundle(Mem.conf.input.tag);
      Url.conf.tag.current = true;
      menu.input.icon["with"]("th-large", function() {
        return m(".paragraph", m("h6", "タグを選んでみよう"), Url.tie.input.tag.field());
      });
    },
    view: function() {
      var attr, cb, chr_job, chrs, input, job_name, o, params, ref, set, tag;
      ref = Url.tie, input = ref.input, params = ref.params;
      tag = params.tag;
      chrs = Mem.Query.faces.tag(tag).list;
      set = Mem.conf.tag[tag];
      return [
        menu.input.icon["with"]("th-large", false), m(".chrlist", m("div", m("h6", set.long), m(".GSAY.badge", set.label), "の" + chrs.length + "人を表示しています。"), m("hr.black"), (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = chrs.length; i < len; i++) {
            o = chrs[i];
            chr_job = Mem.Query.chr_jobs.find(set.chr_set_ids.last + "_" + o._id) || Mem.Query.chr_jobs.find("all_" + o._id);
            job_name = chr_job.job;
            cb = function() {};
            attr = {
              onmouseup: cb,
              ontouchend: cb
            };
            results.push(m(".chrbox", {
              key: o._id
            }, GUI.portrate(o._id, attr), m(".chrblank.line2", m("div", job_name), m("div", o.name))));
          }
          return results;
        })(), m("hr.black"))
      ];
    }
  };

}).call(this);

(function() {
  doc.component.chr_name_lists = {
    controller: function() {},
    view: function() {
      var code_counts, code_str, i, idx, len, ref, results;
      ref = Mem.Query.faces.name_head();
      results = [];
      for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
        code_counts = ref[idx];
        results.push(m("div", m("h2", idx + " hits の頭文字"), (function() {
          var j, len1, results1;
          if (code_counts) {
            results1 = [];
            for (j = 0, len1 = code_counts.length; j < len1; j++) {
              code_str = code_counts[j];
              results1.push(m(".paragraph", m("code", code_str)));
            }
            return results1;
          }
        })()));
      }
      return results;
    }
  };

}).call(this);

(function() {
  doc.component.chr_sets = {
    controller: function() {
      return InputTie.btns(Url.params, ["order", "search"]);
    },
    view: function(tie) {
      tie.draw();
      return menu.input.icon.item("th-large", {
        className: "glass tooltip-right",
        menu: [tie.input]
      });
    }
  };

}).call(this);

(function() {
  doc.component.filter_hide = {
    controller: function() {},
    view: function() {
      return m("div");
    }
  };

}).call(this);

(function(){
  doc.component.filter = {
    controller: function(){
      var tie, ref$, talk_at, scroll, pins, icon, scope, day, this$ = this;
      this.tie = tie = InputTie.btns({}, []);
      tie.change = function(id, value){
        var ref$, key$, ref1$;
        if (doc.seeing[o._id] >= day) {
          return ref1$ = (ref$ = doc.seeing)[key$ = o._id], delete ref$[key$], ref1$;
        } else {
          return doc.seeing_add(o._id, day);
        }
      };
      this.star = function(o){
        var _id, attr, name;
        _id = o._id;
        attr = {
          type: "checkbox_btn",
          className: o.mestype
        };
        name = doc.seeing[o._id] >= day ? "★ " : "☆ ";
        return tie.bundle({
          _id: _id,
          attr: attr,
          name: name
        });
      };
      ref$ = Url.prop, talk_at = ref$.talk_at, scroll = ref$.scroll, pins = ref$.pins, icon = ref$.icon, scope = ref$.scope;
      this.click = {
        go: function(arg$){
          var _id, cb;
          _id = arg$._id;
          cb = function(){
            talk_at(_id);
            pins({});
            icon("");
            scope("talk");
            scroll("");
            return win.scroll.rescroll(talk_at);
          };
          return {
            onclick: cb,
            onmouseup: cb,
            ontouchend: cb
          };
        },
        pin: function(list, append){
          var cb;
          cb = function(){
            var i$, ref$, len$, o;
            for (i$ = 0, len$ = (ref$ = append).length; i$ < len$; ++i$) {
              o = ref$[i$];
              pins()[o.turn + "-" + o.logid] = true;
            }
            for (i$ = 0, len$ = (ref$ = list).length; i$ < len$; ++i$) {
              o = ref$[i$];
              pins()[o.turn + "-" + o.logid] = true;
            }
            return change_pin(win.scroll.prop());
          };
          return {
            onclick: cb,
            onmouseup: cb,
            ontouchend: cb
          };
        }
      };
      this.day = day = 24 * 60 * 60;
      this.seeing_top = 100;
      this.seeing_measure = {
        config: function(elem){
          return this$.seeing_top = elem.offsetTo;
        }
      };
      this.line_text_height = 27;
      this.line_text_height_measure = {
        config: function(elem){
          return this$.line_text_height = elem.offsetHeight;
        }
      };
    },
    view: function(arg$){
      var tie, star, seeing_top, seeing_measure, line_text_height, line_text_height_measure, click, day, center_id, filter_size, anchorview, seeingview, o, tag;
      tie = arg$.tie, star = arg$.star, seeing_top = arg$.seeing_top, seeing_measure = arg$.seeing_measure, line_text_height = arg$.line_text_height, line_text_height_measure = arg$.line_text_height_measure, click = arg$.click, day = arg$.day;
      center_id = win.scroll.prop();
      filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3;
      anchorview = doc.messages.anchor(Url.params).list;
      seeingview = doc.messages.seeing(filter_size, win.scroll.center);
      tie.draw();
      return m("section.plane", m("h6", "参照されている", m("span.btn.edge.icon-pin", click.pin(anchorview, [win.scroll.center]))), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = anchorview).length; i$ < len$; ++i$) {
          o = ref$[i$];
          results$.push(m("." + o.mestype + ".line_text", m(".badge", click.go(o), o.turn + ":" + o.anchor), m.trust(o.log.line_text)));
        }
        return results$;
      }()), m("h6", seeing_measure, "よく見ていた", m("span.btn.edge.icon-pin", click.pin(seeingview, []))), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = seeingview).length; i$ < len$; ++i$) {
          o = ref$[i$];
          if (o._id === center_id) {
            tag = ".line_text.attention";
          } else {
            tag = ".line_text";
          }
          results$.push(m(tag, line_text_height_measure, star(o), m("." + o.mestype + ".badge", click.go(o), o.turn + ":" + o.anchor), m.trust(o.name + " " + o.log.line_text)));
        }
        return results$;
      }()));
    }
  };
}).call(this);

(function(){
  doc.component.form = {
    controller: function(v){},
    view: function(c, v){
      var params, tie, error_and_info, select, chr_job, face, form_text, target, able, input;
      params = v.params, tie = v.tie;
      console.warn(v);
      error_and_info = function(o){
        var list, i$, ref$, len$, msg;
        list = [];
        for (i$ = 0, len$ = (ref$ = o.errors).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          list.push(m(".WSAY", m(".emboss", msg)));
        }
        for (i$ = 0, len$ = (ref$ = o.infos).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          list.push(m(".TSAY", m(".emboss", msg)));
        }
        return m("p.mes_date", list);
      };
      select = function(input, able){
        var options, pno, job, name, key, value, selected, vdoms, actions;
        if (input.targets) {
          options = m("optgroup[label=選択肢]", (function(){
            var i$, ref$, len$, ref1$, results$ = [];
            for (i$ = 0, len$ = (ref$ = input.targets).length; i$ < len$; ++i$) {
              ref1$ = ref$[i$], pno = ref1$.pno, job = ref1$.job, name = ref1$.name;
              key = value = pno;
              selected = "";
              if (input.target() === pno) {
                selected = "selected";
              }
              results$.push(m("option", {
                key: key,
                value: value,
                selected: selected
              }, job + " " + name));
            }
            return results$;
          }()));
        }
        vdoms = [];
        if (able.action) {
          actions = Mem.Query.actions.for_form(v.mestype, v.format).list.map(function(act){
            var key, value;
            key = value = act.index;
            return m("option", {
              value: value,
              key: key
            }, act.text + "");
          });
          actions.unshift(m("option", {
            value: 0,
            key: 0
          }, "↓ 自由入力、または選択してください。"));
          vdoms.push(m("fieldset.text", m("form", input.attr.form(), m("select.label", input.attr.target(), options), m("select.wrapper", input.attr.action(), actions), m("input.wrapper[type=text]", input.attr.text()), m("input.btn.edge[type=submit][value=" + able.action + "]"))));
        }
        if (able.targets) {
          vdoms.push(m("form", input.attr.form(), m("p.text", m("select.roster", input.attr.target(), options), "と", m("select.roster", input.attr.target(), options), m("input.label.btn.edge[type=submit][value=" + able.targets + "]"))));
        }
        if (able.target) {
          vdoms.push(m("form", input.attr.form(), m("p.text", m("select.roster", input.attr.target(), options), m("input.label.btn.edge[type=submit][value=" + able.target + "]"))));
        }
        if (able.sw) {
          vdoms.push(m("form", input.attr.form(), m("p.text", m("select.roster", input.attr.target(), options), m("input.label.btn.edge[type=submit][value=" + able.sw + "？]"))));
        }
        if (able.btn) {
          vdoms.push(m("form", input.attr.form(), m("p.text", m("input.label.btn.edge[type=submit][value=" + able.btn + "]"), m("span.TSAY.emboss", able.change))));
        }
        return vdoms;
      };
      chr_job = Mem.Query.chr_jobs.find(v.chr_job_id);
      face = chr_job.face;
      return m("div", {
        key: v._id
      }, m("h6", m.trust(v.role_name)), m("table." + v.mestype + ".talk", m("tr", m("th"), m("td", m(".msg", tie.input.format.field(), tie.input.mestype.field())))), (form_text = Mem.Query.form_texts.find(v._id + "-" + v.mestype + "-" + v.format)) ? (function(){
        switch (v.format) {
        case "act":
          target = form_text.target_at(form_text.target());
          return m("." + v.mestype + ".action", m("p.text", m("b", face.name), "は、", target.name, form_text.text()), m("p.mes_date", form_text.summary), m("p.text", select(form_text, {
            action: "ACT"
          })), error_and_info(form_text));
        default:
          return m("table." + v.mestype + "." + v.format, m("tr", m("th", GUI.portrate(face._id)), m("td", m(".msg", doc.ext.talk_name(v.name, chr_job.job + " " + face.name, v.to), m("form", form_text.attr.form(), m("textarea[rows=5]", form_text.attr.text())), m("p.mes_date", form_text.summary)), m(".msg", error_and_info(form_text)))));
        }
      }()) : void 8, m(".WIN_" + v.win + ".info", m(".emboss.pull-right", m.trust(v.role_name)), (function(){
        var i$, ref$, len$, ref1$, results$ = [];
        for (i$ = 0, len$ = (ref$ = v.selects).length; i$ < len$; ++i$) {
          ref1$ = ref$[i$], able = ref1$.able, input = ref1$.input;
          results$.push([select(input, able), error_and_info(input)]);
        }
        return results$;
      }()), m("p.text", m.trust(v.role_help)), v.history ? m("p.text", m.trust(v.history)) : void 8), m(".caution.info", m("p.text", m.trust(v.able_help))), m("hr.black"));
    }
  };
}).call(this);

(function() {
  doc.component.header = {
    controller: function() {
      return InputTie.btns(Url.params, ["header_state"]);
    },
    view: function(tie) {
      var input, max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec, params, top_line_attr;
      input = tie.input, params = tie.params;
      max_vage = Mem.conf.folder.PERJURY.config.cfg.MAX_VILLAGES;
      max_crazy = Mem.conf.folder.CRAZY.config.cfg.MAX_VILLAGES;
      max_xebec = Mem.conf.folder.XEBEC.config.cfg.MAX_VILLAGES;
      max_ciel = Mem.conf.folder.CIEL.config.cfg.MAX_VILLAGES;
      max_cafe = Mem.conf.folder.CABALA.config.cfg.MAX_VILLAGES;
      max_morphe = Mem.conf.folder.MORPHE.config.cfg.MAX_VILLAGES;
      max_all = (max_vage + max_crazy + max_xebec + max_ciel) + (max_cafe + max_morphe);
      max_pan = Mem.conf.folder.PAN.config.cfg.MAX_VILLAGES;
      top_line_attr = {
        style: "height: 4em; vertical-align: bottom;"
      };
      tie.draw();
      return m("table.board#headline", m("thead", (function() {
        switch (params.header_state) {
          case "progress":
            return m("tr", top_line_attr, m("th.choice[colspan=2]", {
              key: "p"
            }, m("strong", "進行中の村")), m("th[colspan=2]", {
              key: "f"
            }, m("label.btn.edge", input.header_state.item("finish"), "終了した村を見る")));
          case "finish":
            return m("tr", top_line_attr, m("th[colspan=2]", {
              key: "p"
            }, m("label.btn.edge", input.header_state.item("progress"), "進行中の村を見る")), m("th.choice[colspan=2]", {
              key: "f"
            }, m("strong", "終了した村")));
        }
      })(), m("tr", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ"))), (function() {
        switch (params.header_state) {
          case "progress":
            return m("tbody", m("tr", m("td", m("a", {
              href: Mem.conf.folder.LOBBY.config.cfg.URL_SW + "/sow.cgi"
            }, "lobby"), m("br"), "offparty"), m("td", max_morphe + "村:", m("a", {
              href: Mem.conf.folder.MORPHE.config.cfg.URL_SW + "/sow.cgi"
            }, "morphe"), m("br"), max_cafe + "村:", m("a", {
              href: Mem.conf.folder.CABALA.config.cfg.URL_SW + "/sow.cgi"
            }, "cafe")), m("td", "wolf", m("br"), "ultimate", m("br"), "allstar"), m("td", "role-play", m("br"), "RP-advance", m("br"), max_vage + "村:", m("a", {
              href: Mem.conf.folder.PERJURY.config.cfg.URL_SW + "/sow.cgi"
            }, "perjury"), m("br"), max_xebec + "村:", m("a", {
              href: Mem.conf.folder.XEBEC.config.cfg.URL_SW + "/sow.cgi"
            }, "xebec"), m("br"), max_crazy + "村:", m("a", {
              href: Mem.conf.folder.CRAZY.config.cfg.URL_SW + "/sow.cgi"
            }, "crazy"), m("br"), max_ciel + "村:", m("a", {
              href: Mem.conf.folder.CIEL.config.cfg.URL_SW + "/sow.cgi"
            }, "ciel"))));
          case "finish":
            return m("tbody", m("tr", m("td", m("a", {
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
            }, "ciel"))));
        }
      })());
    }
  };

}).call(this);

(function() {
  doc.component.item = {
    controller: function(type) {
      this.query = Mem.Query.items.where({
        type: type
      });
      switch (type) {
        case 'rolelist':
          win.scroll.size = 10;
      }
    },
    view: function(arg, type) {
      var query;
      query = arg.query;
      return win.scroll.pager("div", query.list, doc.template);
    }
  };

}).call(this);

(function() {
  var chr_box;

  chr_box = function(o) {
    var attr, attr_main;
    attr = null;
    attr_main = function() {
      var elem, out, over;
      elem = null;
      over = function() {
        return GUI.Animate.jelly.up(elem);
      };
      out = function() {
        return GUI.Animate.jelly.down(elem);
      };
      attr = {
        onmouseover: over,
        ontouchmove: over,
        onmouseup: out,
        onmouseout: out
      };
      return {
        config: function(_elem) {
          return elem = _elem;
        },
        onmouseover: over,
        ontouchmove: over,
        onmouseup: out,
        onmouseout: out,
        ontouchend: out
      };
    };
    return m(".chrbox", {
      key: o._id
    }, GUI.portrate(o.face_id, attr_main()), m(".chrblank", attr, m("div", m.trust(o.job)), m("div", m.trust(o.face.name))));
  };

  doc.component.map_faces_new = {
    controller: function() {
      var chrs;
      chrs = Mem.Query.chr_jobs.where({
        chr_set_id: "time"
      }).sort("face.order").list;
      this.old_chrs = chrs.slice(0, 24);
      this.new_chrs = chrs.slice(24);
    },
    view: function(arg) {
      var new_chrs, o, old_chrs;
      old_chrs = arg.old_chrs, new_chrs = arg.new_chrs;
      return [
        m("h6", "参考文献"), m("hr.black"), m(".mark", "〜 新人さん歓迎パーティー 〜"), m("h6", "いま記述のある新人さんの肩書、名前は仮のものです。"), (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = new_chrs.length; i < len; i++) {
            o = new_chrs[i];
            results.push(chr_box(o));
          }
          return results;
        })(), m("h6", "歓迎する人達"), (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = old_chrs.length; i < len; i++) {
            o = old_chrs[i];
            results.push(chr_box(o));
          }
          return results;
        })(), m("hr.black")
      ];
    }
  };

}).call(this);

(function() {
  doc.component.map_faces = {
    controller: function() {},
    view: function() {
      var attr, attr_main, chr_job, chr_set, chrs, headline, job_name, map_order_set, o, order, ref, search;
      ref = Url.prop, order = ref.order, chr_set = ref.chr_set, search = ref.search;
      map_order_set = Mem.conf.map_faces_order[order()];
      chrs = Mem.Query.map_faces.active(order(), chr_set(), search()).list;
      headline = "";
      if (chrs != null ? chrs.length : void 0) {
        headline = [m(".GSAY.badge", Mem.Query.chr_sets.find(chr_set()).label), "の" + chrs.length + "人を、", m(".GSAY.badge", map_order_set.headline), "回数で並べています"];
      }
      return [
        m("div", headline), m("hr.black"), (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = chrs.length; i < len; i++) {
            o = chrs[i];
            chr_job = Mem.Query.chr_jobs.find((chr_set()) + "_" + o.face_id);
            job_name = chr_job.job;
            attr = null;
            attr_main = function() {
              var elem, out, over;
              elem = null;
              over = function() {
                return GUI.Animate.jelly.up(elem);
              };
              out = function() {
                return GUI.Animate.jelly.down(elem);
              };
              attr = {
                onmouseover: over,
                ontouchmove: over,
                onmouseup: out,
                onmouseout: out
              };
              return {
                config: function(_elem) {
                  return elem = _elem;
                },
                onmouseover: over,
                ontouchmove: over,
                onmouseup: out,
                onmouseout: out,
                ontouchend: out
              };
            };
            results.push(m(".chrbox", {
              key: o._id
            }, GUI.portrate(o.face_id, attr_main()), m(".chrblank.line4", attr, m("div", job_name), m("div", o.face.name), m("div", m("a.mark", {
              href: "/map_reduce/faces/" + o.face_id
            }, map_order_set.label + " " + o.win.value[map_order_set.order] + "回")), m("div", "♥" + o.sow_auth_id.max_is))));
          }
          return results;
        })(), m("hr.black")
      ];
    }
  };

}).call(this);

(function() {
  doc.component.potof_modes = {
    controller: function() {
      var face, keys, params;
      params = {};
      face = new win.gesture({
        check: function(arg) {
          var value;
          value = arg.value;
          params = Mem.unpack.Keys(value);
          return Url.prop.potofs_hide(params);
        }
      });
      keys = new win.gesture({
        check: function(arg) {
          var value;
          value = arg.value;
          params[value] = !params[value];
          return Url.prop.potofs_hide(params);
        }
      });
      return {
        face: face,
        keys: keys,
        params: params
      };
    },
    view: function(arg) {
      var face, keys, o, params, potofs, potofs_desc, potofs_hide, potofs_order, ref, ref1, ref2, reset_key, turn;
      face = arg.face, keys = arg.keys, params = arg.params;
      ref = Url.prop, potofs_desc = ref.potofs_desc, potofs_order = ref.potofs_order, potofs_hide = ref.potofs_hide;
      potofs = Mem.Query.potofs.view(potofs_desc(), potofs_order()).list;
      turn = ((ref1 = win.scroll.center) != null ? (ref2 = ref1.event) != null ? ref2.turn : void 0 : void 0) || 0;
      reset_key = function(value) {
        var now, set;
        now = Mem.pack.Keys(params);
        set = Mem.pack.Keys(value);
        return keys.tap(value, {
          className: now === set ? "active" : ""
        });
      };
      return m(".minilist", m("h6", "キャラクターフィルタ"), m("p", m("a", reset_key([]), "全員表示"), m("a", reset_key(Mem.Query.potofs.others()), "参加者表示"), m("a", reset_key(Mem.Query.potofs.potofs()), "その他を表示"), m("a", reset_key(Mem.Query.potofs.full()), "全員隠す")), m("hr.black"), (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = potofs.length; i < len; i++) {
          o = potofs[i];
          results.push(m(".chrbox", {
            key: o._id
          }, GUI.portrate(o.face_id, face.tap(o.face_id, {
            className: params[o.face_id] ? "filter-hide" : ""
          })), m(".bar." + o.live)));
        }
        return results;
      })(), m("hr.black"));
    }
  };

}).call(this);

(function(){
  doc.component.potofs_hide = {
    controller: function(){},
    view: function(c, wide_attr){
      return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]"))), m("tbody.plane", wide_attr, m("tr", m("th.calc", "…")))));
    }
  };
}).call(this);

(function(){
  doc.component.potofs = {
    controller: function(){
      var tie;
      tie = InputTie.btns(Url.params, ["potofs_order"]);
      tie.change = function(id, value, old_value){
        return Url.params.potofs_desc = false;
      };
      tie.stay = function(id, value){
        return Url.prop.potofs_desc(!Url.params.potofs_desc);
      };
      return tie;
    },
    view: function(tie, wide_attr){
      var c, ref$, potofs_order, potofs_desc, potofs_hide, o, className;
      c = tie.input.potofs_order;
      ref$ = Url.params, potofs_order = ref$.potofs_order, potofs_desc = ref$.potofs_desc, potofs_hide = ref$.potofs_hide;
      tie.draw();
      return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]", m("sup", "(スクロールします。)")), m("th", m("a", c.item("stat_at"))), m("th", m("a", c.item("stat_type"))), m("th", m("a", c.item("said_num"))), m("th", m("a", c.item("pt"))), m("th", m("a", c.item("urge"))), m("th", m("span.icon-user", " ")), m("th", m("a", c.item("select"))), m("th", m("a", c.item("win_result"))), m("th", m("a", c.item("win_side"))), m("th", m("a", c.item("role"))), m("th", m("a", c.item("text"))))), m("tbody.plane", wide_attr, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = Mem.Query.potofs.view(potofs_desc, potofs_order).list).length; i$ < len$; ++i$) {
          o = ref$[i$];
          className = potofs_hide[o.face_id] ? "filter-hide" : "";
          results$.push(m("tr", {
            className: className
          }, m("th." + o.live + ".calc", {}, o.view.job), m("th." + o.live, {}, o.name), m("td." + o.live + ".calc", {}, o.view.stat_at), m("td." + o.live, {}, o.view.stat_type), m("td." + o.live + ".calc", {}, o.view.said_num), m("td." + o.live + ".calc", {}, o.view.pt), m("td." + o.live + ".center", {}, o.view.urge), m("td." + o.live + ".center", {}, o.view.user_id), m("td." + o.live + ".center", {}, o.view.select), m("td.WIN_" + o.view.win + ".center", {}, o.view.win_result), m("td.WIN_" + o.view.win + ".calc", {}, o.view.win_side), m("td.WIN_" + o.view.win, {}, o.view.role), m("td.WIN_" + o.view.win, {}, m.trust(o.view.text))));
        }
        return results$;
      }()))));
    }
  };
}).call(this);

(function() {
  var slice = [].slice;

  doc.component.role_matrix = {
    controller: function() {},
    view: function() {
      var query, ref;
      query = (ref = Mem.Query.storys).menu.apply(ref, [Url.params.folder].concat(slice.call(Url.conf.stories.values())));
      return m(".paragraph", menu.input.icon.item("search"), {
        className: "glass tooltip-right"
      }, m("table.vindex", m("thead", m("tr", m("th"))), win.scroll.pager("tbody", query.list, function(o) {
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
        }, menu.params.icon === "resize-full" ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m(".list", o.view.role_cards), m(".list", o.view.trap_cards)) : m("td", header));
      })));
    }
  };

}).call(this);

(function() {
  var rule_accordion;

  rule_accordion = function(type) {
    var key;
    key = "rule_" + type;
    win.mount("#rule-" + type, function() {
      return doc.component[key];
    });
    return doc.component[key] = {
      controller: function() {
        var cb;
        cb = function() {
          return list.tap = null;
        };
        this.list = RULE[type].list;
        this.cancel = {
          onmouseup: cb,
          ontouchend: cb
        };
      },
      view: function(arg) {
        var cancel, cb, i, items, j, len, list, o;
        list = arg.list, cancel = arg.cancel;
        items = [];
        items.push(m("dt", cancel, m("span.mark", m.trust("&#x2718"))));
        cb = function(arg1, idx) {
          var head, tap, text;
          head = arg1.head, text = arg1.text;
          cb = function(e) {
            return list.tap = idx;
          };
          tap = {
            onmouseup: cb,
            ontouchend: cb
          };
          items.push(m("dt", tap, m("strong", m.trust(head)), m(".allow", "↨")));
          if (list.tap === idx) {
            return items.push(m("dd", m.trust(text)));
          }
        };
        for (i = j = 0, len = list.length; j < len; i = ++j) {
          o = list[i];
          cb(o, i);
        }
        return m("dl.accordion", win.scroll.mark(type), items);
      }
    };
  };

  rule_accordion("nation");

  rule_accordion("village");

  rule_accordion("maker");

  rule_accordion("player");

}).call(this);

(function() {
  doc.component.security_modes = {
    controller: function(prop) {
      var options, tie;
      tie = InputTie.btns(Url.params, ["show", "open", "human"]);
      tie.check(function() {
        prop(Url.params.show);
        return Url.replacestate();
      });
      options = Mem.Query.inputs.hash.show.options;
      tie.do_draw(function() {
        var grave_label, has, mob, story, think_label;
        has = Mem.Query.messages.has;
        story = Mem.Query.storys.list.first;
        mob = Mem.Query.roles.find(story != null ? story.type.mob : void 0);
        grave_label = [];
        if (has.grave) {
          grave_label.push("墓下");
        }
        if (has.vsay && mob.label) {
          grave_label.push(mob.label);
        }
        options.grave.label = grave_label.join("/") + "つき";
        think_label = [];
        if (has.think) {
          think_label.push("独り言");
        }
        if (has.to) {
          think_label.push("内緒話");
        }
        options.think.label = think_label.join("/") + "つき";
        return options.clan._id = has.clan ? "clan" : null;
      });
      return tie;
    },
    view: function(tie, prop) {
      var input;
      input = tie.input;
      tie.draw();
      return m("p", input.show.field(), m.trust("&nbsp;"), input.open.field(), input.open.label(), input.human.field(), input.human.label());
    }
  };

}).call(this);

(function(){
  var ua;
  ua = "javascript";
  doc.component.sow_auth = {
    controller: function(){
      var url, deploy, this$ = this;
      url = gon.url;
      doc.user = {};
      deploy = function(arg$){
        var sow_auth;
        sow_auth = arg$.sow_auth;
        if (!sow_auth) {
          return;
        }
        doc.user.is_login = 0 < sow_auth.is_login;
        doc.user.is_admin = 0 < sow_auth.is_admin;
        doc.user.id = sow_auth.uid;
        if (doc.user.is_login) {
          WebStore.cookie.copyTo(this$.tie);
        }
      };
      this.params = {
        ua: ua,
        cmd: "login"
      };
      this.tie = InputTie.form(this.params, ['uid', 'pwd']);
      this.tie.timeout = 5000;
      this.tie.do_draw(function(){
        var ref$, uid, pwd, is_same;
        ref$ = this$.params, uid = ref$.uid, pwd = ref$.pwd;
        is_same = uid === pwd ? "パスワードとIDが同じです。" : void 8;
        return this$.tie.input.pwd.error(is_same);
      });
      this.tie.action = function(){
        var params, cmd;
        params = doc.user.is_login
          ? (cmd = "logout", {
            cmd: cmd,
            ua: ua
          })
          : this$.params;
        return Submit.iframe(url, params).then(function(gon){
          var e, msgs;
          if (e = gon.errors) {
            msgs = e.login || e[""];
            this$.tie.input.uid.error(msgs);
          }
          deploy(gon);
        });
      };
      deploy(gon);
    },
    view: function(arg$){
      var tie;
      tie = arg$.tie;
      tie.draw();
      return tie.form({}, doc.user.is_login
        ? m(".paragraph", tie.submit(doc.user.id + " がログアウト"))
        : m(".paragraph", tie.input.uid.head(), tie.input.uid.field(), tie.input.pwd.head(), tie.input.pwd.field(), tie.submit("ログイン")), m(".paragraph", tie.infos(function(msg){
        return m(".TSAY", m(".emboss", msg));
      }), tie.errors(function(msg){
        return m(".WSAY", m(".emboss", msg));
      })));
    }
  };
}).call(this);

(function() {
  doc.component.sow_users = {
    controller: function() {},
    view: function() {
      var face, length, letters, sow_auth_id, width;
      face = Mem.map_face_detail;
      letters = [
        m("p.name", m("b", face.name)), m("p.text", "全部で", m("span.mark", face.sow_auth_ids.length + "人"), "が、", m("span.mark", face.sow_auth_id.all + "回"), "登場しました。"), (function() {
          var i, len, ref, results;
          ref = face.sow_auth_ids;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            sow_auth_id = ref[i];
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
            results.push(GUI.inline_item(function() {
              return [this.right(width, sow_auth_id[0]), this.right(2.0, "x" + sow_auth_id[1])];
            }));
          }
          return results;
        })()
      ];
      return m(".ADMIN.guide", win.scroll.mark("sow_users"), letters);
    }
  };

}).call(this);

(function() {
  var slice = [].slice;

  doc.component.stories = {
    controller: function() {},
    view: function() {
      var query, ref;
      query = (ref = Mem.Query.storys).menu.apply(ref, [Url.params.folder].concat(slice.call(Url.conf.stories.values())));
      return m(".paragraph", menu.input.icon.item("search", {
        className: "glass tooltip-right"
      }), m("table.vindex", m("thead", m("tr", m("th"))), win.scroll.pager("tbody", query.list, function(o) {
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
        }, menu.params.icon === "resize-full" ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m(".list", o.view.role_cards), m(".list", o.view.trap_cards)) : m("td", header));
      })));
    }
  };

}).call(this);

(function() {
  doc.component.summary = {
    controller: function() {},
    view: function() {
      var face, letters, role, rolename, width, win_side;
      face = Mem.map_face_detail;
      letters = [
        m("p.name", m("b", face.name)), m("p.text", "全部で", m("span.mark", face.role.all), "の役職になりました"), (function() {
          var i, len, ref, results;
          ref = face.win.keys;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            win_side = ref[i];
            results.push([
              m("p.name", m("b", win_side + " x" + face.win.value[win_side] + "回")), m("p.text", (function() {
                var j, len1, ref1, results1;
                ref1 = face.role_of_wins[win_side];
                results1 = [];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                  role = ref1[j];
                  rolename = GUI.name.config(role[0]);
                  width = (function() {
                    switch (false) {
                      case !(4 < rolename.length):
                        return 10.35;
                      default:
                        return 3.75;
                    }
                  })();
                  results1.push(GUI.inline_item(function() {
                    return [this.center(width, rolename), this.right(2.5, "x" + role[1])];
                  }));
                }
                return results1;
              })())
            ]);
          }
          return results;
        })()
      ];
      return [m("h2", face.name + " の活躍"), face.says[0] != null ? m("h6", m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.min))), m("span", m.trust("&nbsp;〜&nbsp;")), m("span.code", Timer.date_time_stamp(new Date(face.says[0].date.max)))) : void 0, m("table.SAY.talk", win.scroll.mark("summary"), m("tr", m("th", GUI.portrate(face.face_id)), m("td", m(".msg", letters))))];
    }
  };

}).call(this);

(function(){
  var timespan, mestype_orders;
  timespan = 1000 * 3600;
  mestype_orders = ['SAY', 'MSAY', 'VSAY', 'VGSAY', 'GSAY', 'SPSAY', 'WSAY', 'XSAY', 'BSAY', 'AIM', 'TSAY', 'MAKER', 'ADMIN'];
  doc.component.timeline = Canvas(function(arg$){
    var ref$, width, height, talk, open, potofs_hide, talk_at, search, icon, scope, scroll, graph_height, base, masks, time_ids, x, y, max_height, time_width, view_port_x, view_port_y, index_at, choice_last;
    ref$ = arg$.size, width = ref$[0], height = ref$[1];
    ref$ = Url.prop, talk = ref$.talk, open = ref$.open, potofs_hide = ref$.potofs_hide, talk_at = ref$.talk_at, search = ref$.search, icon = ref$.icon, scope = ref$.scope, scroll = ref$.scroll;
    if (!Mem.Query.events.list.length) {
      return;
    }
    graph_height = height - 50;
    base = {};
    masks = {};
    time_ids = [];
    x = y = max_height = time_width = 0;
    view_port_x = function(){
      var i$, ref$, len$, event, left, right;
      base = Mem.Query.messages.talk(talk(), open(), potofs_hide());
      if (!base.reduce) {
        return false;
      }
      masks = base.reduce.mask || {};
      for (i$ = 0, len$ = (ref$ = Mem.Query.events.list).length; i$ < len$; ++i$) {
        event = ref$[i$];
        if (event.created_at) {
          left = Mem.pack.Date(event.created_at / timespan);
          right = Mem.pack.Date(event.updated_at / timespan);
          masks[left] == null && (masks[left] = {});
          masks[right] == null && (masks[right] = {});
        }
      }
      time_ids = _.sortBy(Object.keys(masks), Mem.unpack.Date);
      time_width = time_ids.length;
      x = width / time_width;
      return true;
    };
    view_port_y = function(){
      var i$, ref$, len$, time_id, mask;
      for (i$ = 0, len$ = (ref$ = time_ids).length; i$ < len$; ++i$) {
        time_id = ref$[i$];
        mask = masks[time_id];
        if (max_height < mask.all.count) {
          max_height = mask.all.count;
        }
      }
      y = graph_height / max_height;
      return true;
    };
    index_at = function(updated_at){
      var time_id;
      time_id = Mem.pack.Date(updated_at / timespan);
      return time_ids.indexOf(time_id);
    };
    choice_last = function(query, time){
      var i$, ref$, o;
      for (i$ = (ref$ = query.list).length - 1; i$ >= 0; --i$) {
        o = ref$[i$];
        if (time > o.updated_at) {
          talk_at(o._id);
          icon("search");
          scope("talk");
          scroll("");
          win.scroll.rescroll(talk_at);
          return;
        }
      }
    };
    return {
      data: function(){
        view_port_x();
        return base.reduce;
      },
      onmove: function(arg$){
        var state, is_touch, offset, index, time, query;
        state = arg$.state, is_touch = arg$.is_touch, offset = arg$.offset;
        if (!(is_touch && offset != null && view_port_x())) {
          return;
        }
        search("");
        index = Math.floor(offset.x / x);
        time = masks[time_ids[index]].all.min;
        query = graph_height < offset.y ? Mem.Query.messages.talk("open", false, {}) : base;
        return choice_last(query, time);
      },
      draw: function(arg$){
        var ctx, focus, offset;
        ctx = arg$.ctx;
        focus = Mem.Query.messages.find(talk_at());
        if (!(focus && view_port_x())) {
          return;
        }
        offset = index_at(focus.updated_at);
        ctx.beginPath();
        ctx.strokeStyle = RAILS.log.colors.focus;
        ctx.globalAlpha = 1;
        ctx.moveTo(x * offset, height);
        ctx.lineTo(x * offset, 0);
        return ctx.stroke();
      },
      background: function(arg$){
        var ctx, count_width, i$, ref$, len$, left, time_id, mask, top, j$, ref1$, len1$, mestype, color, count_height, event, right, max_width;
        ctx = arg$.ctx;
        if (!(view_port_x() && view_port_y())) {
          return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = RAILS.log.colors.back;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, x * time_width, y * max_height);
        count_width = 1;
        for (i$ = 0, len$ = (ref$ = time_ids).length; i$ < len$; ++i$) {
          left = i$;
          time_id = ref$[i$];
          mask = masks[time_id];
          top = max_height;
          for (j$ = 0, len1$ = (ref1$ = mestype_orders).length; j$ < len1$; ++j$) {
            mestype = ref1$[j$];
            color = RAILS.log.colors[mestype];
            if (mask[mestype]) {
              count_height = mask[mestype].count;
              top -= count_height;
              ctx.fillStyle = color;
              ctx.globalAlpha = 1;
              ctx.fillRect(x * left, y * top, 1 + x * count_width, y * count_height);
            }
          }
        }
        ctx.beginPath();
        for (i$ = 0, len$ = (ref$ = Mem.Query.events.list).length; i$ < len$; ++i$) {
          event = ref$[i$];
          if (event.created_at) {
            right = index_at(event.updated_at);
            left = index_at(event.created_at);
            ctx.strokeStyle = RAILS.log.colors.line;
            ctx.globalAlpha = 1;
            ctx.moveTo(x * left, height);
            ctx.lineTo(x * left, 0);
            ctx.fillStyle = RAILS.log.colors.event;
            ctx.fillRect(x * left, graph_height, x * time_width, height);
            ctx.textAlign = "left";
            ctx.fillStyle = RAILS.log.colors.text;
            ctx.font = "30px serif";
            max_width = x * (right - left) - 4;
            if (0 < max_width) {
              ctx.fillText(event.name, x * left, height - 12, max_width);
            }
          }
        }
        return ctx.stroke();
      }
    };
  });
}).call(this);

(function() {
  doc.component.title = {
    controller: function() {
      var html, meta, old_snap, params;
      html = document.querySelector("html");
      meta = document.querySelector("meta[name=viewport]");
      WebStore.copyTo(Url);
      Url.popstate();
      params = Url.params;
      old_snap = "";
      this.scroll_adjust = function() {
        var folder, logid, ref, ref1, scroll, turn, updated_at, vid;
        scroll = win.scroll.prop();
        if (!scroll) {
          return;
        }
        updated_at = ((ref = Mem.Query.messages.find(scroll)) != null ? ref.updated_at : void 0) || 0;
        Url.params.scroll = scroll;
        Url.params.updated_at = updated_at;
        ref1 = scroll.split("-"), folder = ref1[0], vid = ref1[1], turn = ref1[2], logid = ref1[3];
        if (logid == null) {
          return;
        }
        Url.params.folder = folder;
        Url.params.turn = turn;
        Url.params.story_id = folder + "-" + vid;
        Url.params.event_id = folder + "-" + vid + "-" + turn;
        return Url.params.message_id = folder + "-" + vid + "-" + turn + "-" + logid;
      };
      this.refresh = function() {
        var base_style, key, list;
        this.scroll_adjust();
        Url.replacestate();
        WebStore.copyBy(Url);
        base_style = html.className.replace(old_snap, "").trim();
        list = (function() {
          var i, len, ref, results;
          ref = ["theme", "width", "layout", "font", "item", "color"];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            key = ref[i];
            results.push(params[key] + "-" + key);
          }
          return results;
        })();
        if (!params.human) {
          list.push("no-player");
        }
        old_snap = list.join(" ");
        list.push(base_style);
        html.className = list.join(" ");
        meta.content = head.browser.viewport = win.short < 380 ? "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5" : "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0";
        return window.requestAnimationFrame(function() {
          return win["do"].layout();
        });
      };
    },
    view: function(c) {
      var event, event_id, ref, story, story_id;
      c.refresh();
      ref = Url.params, story_id = ref.story_id, event_id = ref.event_id;
      story = Mem.Query.storys.find(story_id);
      event = Mem.Query.events.find(event_id);
      if ((story != null) && (event != null)) {
        return story.name + " " + event.name;
      } else {
        return "人狼議事";
      }
    }
  };

}).call(this);

(function() {
  var slice = [].slice;

  doc.component.topviewer = {
    controller: function() {
      var deploy, inputs, story;
      inputs = [];
      deploy = function(type, hash) {
        inputs.push(type);
        return Mem.Query.inputs.hash[type].options = hash;
      };
      deploy("menu_order", Mem.conf.map_faces_order);
      deploy("menu_chr_set", Mem.Query.map_faces.reduce);
      if (Url.conf.stories) {
        story = function(h) {
          var ref;
          return (ref = Mem.Query.storys).menu.apply(ref, [Url.params.folder].concat(slice.call(Url.conf.stories.values(h)))).reduce;
        };
        deploy("menu_folder", story());
        deploy("menu_game", story({
          game: "all"
        }));
        deploy("menu_rating", story({
          rating: "all"
        }));
        deploy("menu_say_limit", story({
          say_limit: "all"
        }));
        deploy("menu_update_at", story({
          update_at: "all"
        }));
        deploy("menu_role_type", story({
          role_type: "all"
        }));
        deploy("menu_event_type", story({
          event_type: "all"
        }));
        deploy("menu_player_length", story({
          player_length: "all"
        }));
        deploy("menu_update_interval", story({
          update_interval: "all"
        }));
      }
      this.tie = InputTie.btns(Url.params, inputs);
      return;
      main_menu.drill("order", {
        label: "並び順",
        view: function() {
          var attr, key, o, ref, results;
          ref = Mem.conf.map_faces_order;
          results = [];
          for (key in ref) {
            o = ref[key];
            attr = g.menu(key, params.order, {});
            results.push(m("span", attr, o.label));
          }
          return results;
        }
      });
      main_menu.drill("chr_set", {
        label: "キャラセット",
        view: function(sub_menu) {
          return sub_menu.radio({
            "class": "chr_set"
          }, params.chr_set, Mem.Query.map_faces.reduce, "chr_set", function(key) {
            return Mem.Query.chr_sets.find(key).label;
          });
        }
      });
      main_menu.drill("rating", {
        label: "こだわり",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge rating"
          }, Url.prop.rating, reduce({
            rating: "all"
          }), "rating", function(key, o) {
            return m("span", m("img.pull-left", {
              src: GUI.img_head + ("/icon/cd_" + o.min_is.rating + ".png")
            }), Mem.conf.rating[key].label);
          }));
        }
      });
      main_menu.drill("game", {
        label: "ルール",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge game"
          }, Url.prop.game, reduce({
            game: "all"
          }), "game", function(key, o) {
            return o.min_is.view.game_rule;
          }));
        }
      });
      main_menu.drill("folder", {
        label: "州",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge folder"
          }, Url.prop.folder, reduce(), "folder", function(key, o) {
            var ref;
            return (ref = CONF_FOLDER[key]) != null ? ref.nation : void 0;
          }));
        }
      });
      main_menu.drill("say_limit", {
        label: "発言制限",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge say_limit"
          }, Url.prop.say_limit, reduce({
            say_limit: "all"
          }), "say_limit", function(key, o) {
            return o.min_is.view.say_limit;
          }));
        }
      });
      main_menu.drill("update_at", {
        label: "更新時刻",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge update_at"
          }, Url.prop.update_at, reduce({
            update_at: "all"
          }), "update_at", function(key, o) {
            return o.min_is.view.update_at;
          }));
        }
      });
      main_menu.drill("update_interval", {
        label: "更新間隔",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge update_interval"
          }, Url.prop.update_interval, reduce({
            update_interval: "all"
          }), "update_interval", function(key, o) {
            return o.min_is.view.update_interval;
          }));
        }
      });
      main_menu.drill("event_type", {
        label: "事件",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge event_type"
          }, Url.prop.event_type, reduce({
            event_type: "all"
          }), "event_type", function(key, o) {
            return key;
          }));
        }
      });
      main_menu.drill("role_type", {
        label: "役職",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge role_type"
          }, Url.prop.role_type, reduce({
            role_type: "all"
          }), "role_type", function(key, o) {
            return key;
          }));
        }
      });
      return main_menu.drill("player_length", {
        label: "人数",
        view: function(sub_menu) {
          return m(".paragraph", sub_menu.radio({
            "class": "edge player_length"
          }, Url.prop.player_length, reduce({
            player_length: "all"
          }), "player_length", function(key, o) {
            return o.min_is.view.player_length + "人";
          }));
        }
      });
    },
    view: function(arg) {
      var btns, input, tie, timeline;
      tie = arg.tie;
      input = tie.input;
      timeline = function() {
        return m.component(doc.component.timeline, "#timeline", {
          size: [2 * doc.width.content(), 150]
        });
      };
      switch (menu.params.icon) {
        case "cog":
          btns = function(btn) {
            return [btn.head(), btn.field()];
          };
          input = Url.tie.input;
          return m(".paragraph", btns(input.theme), btns(input.width), btns(input.layout), btns(input.font));
        case "pin":
        case "home":
          return m(".paragraph", timeline());
        case "mail":
          return m(".paragraph", timeline(), m("h6", "貼り付けたメモを表示します。 - メモ"), m.component(doc.component.security_modes, Url.prop.memo), m.component(doc.component.potof_modes));
        case "chat-alt":
          return m(".paragraph", timeline(), m("h6", "村内の発言を表示します。 - 発言"), m.component(doc.component.security_modes, Url.prop.talk), m.component(doc.component.potof_modes));
        case "clock":
          return m(".paragraph", timeline(), m("h6", "メモを履歴形式で表示します。 - メモ"), m.component(doc.component.security_modes, Url.prop.memo), m.component(doc.component.potof_modes));
        case "search":
          input = Url.tie.input;
          input.search;
          m(".paragraph", timeline(), input.search.field(), input.search.label(), m("hr.black"));
          return m(".paragraph", m("h6", "検索する。"), input.search.field(), main_menu.drills({}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]));
        case "th-large":
          return menu.input.icon["with"]("th-large", true);

          /* chr_sets
          [
            m "h6", "詳しく検索してみよう"
            input.search.field()
            m "span", "検索条件：キャラクター名 / 肩書き / プレイヤー "
            m "h6", "キャラセットを選んでみよう"
            main_menu.drills {}, ["order", "chr_set"]
          ]
           */
        case "resize-full":
          return [];
        case "resize-normal":
          return [];
        default:
          return [];
      }
    }
  };

}).call(this);

(function() {
  doc.component.villages = {
    controller: function() {},
    view: function() {
      var face, folder, letters, story_id;
      face = Mem.map_face_detail;
      letters = [
        m("p.name", m("b", face.name)), m("p.text", "全部で", m("span.mark", face.folder.all + "回"), "登場しました。"), (function() {
          var i, len, ref, results;
          ref = face.folder.keys;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            folder = ref[i];
            results.push([
              m("p.name", m("b", folder + " x" + face.folder.value[folder] + "回")), m("p.text", (function() {
                var j, len1, ref1, results1;
                ref1 = face.story_id_of_folders[folder];
                results1 = [];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                  story_id = ref1[j];
                  results1.push(GUI.inline_item(function() {
                    return this.left(2.8 + folder.length * 0.65, m("a", {
                      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/" + story_id[0]
                    }, story_id[0]));
                  }));
                }
                return results1;
              })())
            ]);
          }
          return results;
        })()
      ];
      return m(".MAKER.guide", win.scroll.mark("villages"), letters);
    }
  };

}).call(this);

(function() {
  var error_and_info, field,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  field = Mem.Query.inputs.hash;

  error_and_info = function(v) {
    return m("p.mes_date", v.tie.errors(function(msg) {
      return m(".WSAY", m(".emboss", msg));
    }), v.tie.infos(function(msg) {
      return m(".TSAY", m(".emboss", msg));
    }));
  };

  doc.component.vmake_form = {
    controller: function(v) {
      var add_btn, chk, vil_comment, vindex;
      vindex = 0;
      vil_comment = ["（村のルールは、自由に編集できるよ！）", " ", "■村のルール"].concat(RULE.village.list.map(function(o) {
        return (++vindex) + "." + o.head;
      })).join("\r\n");
      v.params = {
        vil_comment: vil_comment
      };
      v.tie = InputTie.form(v.params, ["extra", "role", "gift", "trap", "vil_name", "vil_comment", "rating", "trs_type", "say_count", "time", "interval", "entry_password", "chr_npc", "mob_type", "game_rule", "role_table", "player_count", "player_count_start"]);
      v.tie.input.say_count.label_for = function(o) {
        return m.trust(o.help);
      };
      v.tie.input.mob_type.label_for = function(o) {
        return m.trust(o.help);
      };
      v.tie.input.game_rule.label_for = function(o) {
        return m("ul", m.trust(o.help));
      };
      v.tie.input.trs_type.label_for = function(o) {
        return m("div", m.trust(o.help));
      };
      v.tie.input.rating.label_for = function(o) {
        return m("img", {
          src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_" + o._id + ".png"
        });
      };
      v.tie.action = function() {
        return v.submit(v.params);
      };
      v.tie.input.checkboxes = (function() {
        var i, len, ref, results;
        ref = Mem.Query.inputs.checkbox("vil").list;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          chk = ref[i];
          results.push(v.tie.bundle(chk));
        }
        return results;
      })();
      console.warn(v.tie);

      /*
      v.tie.validate =
        extra:
        role:
        gift:
        trap:
        player_count:
        role_table:
        game_rule:
       */
      v.tie.do_draw(function() {
        var cards, cards_set, i, len, o, ref, results, role_table;
        role_table = Mem.Query.role_tables.find(v.params.role_table);
        if (!role_table) {
          return;
        }
        cards_set = role_table.cards;
        if (!cards_set) {
          return;
        }
        v.params.role.length = 0;
        v.params.gift.length = 0;
        cards = cards_set[v.params.player_count];
        if (!cards) {
          return;
        }
        ref = Mem.Query.roles.finds(cards);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          results.push(v.params[o.cmd].push(o._id));
        }
        return results;
      });
      v.tie.do_draw(function() {
        var anchor, chr_job, chr_npc, chr_set, face, face_id, mestype, name, say_0, say_1, updated_at, user_id;
        if (chr_npc = Mem.Query.chr_npcs.find(v.params.chr_npc)) {
          v.jobs = chr_npc.chr_set.chr_jobs.list;
        } else {
          v.jobs = [];
        }
        if (!chr_npc) {
          return null;
        }
        chr_set = chr_npc.chr_set;
        if (!chr_set) {
          return null;
        }
        face_id = chr_npc.face_id, say_0 = chr_npc.say_0, say_1 = chr_npc.say_1;
        chr_job = chr_set.chr_jobs.find(chr_set._id + "_" + face_id);
        if (!chr_job) {
          return null;
        }
        updated_at = Date.now();
        mestype = "SAY";
        user_id = "master";
        anchor = "0";
        face = Mem.Query.faces.find(face_id);
        name = chr_job.job + " " + face.name;
        return v.npc_says = [
          m("h3", "プロローグ"), doc.view.talk({
            face_id: face_id,
            user_id: user_id,
            anchor: anchor,
            name: name,
            mestype: mestype,
            updated_at: updated_at,
            log: say_0.deco_text_lf
          }), m("h3", "１日目"), doc.view.talk({
            face_id: face_id,
            user_id: user_id,
            anchor: anchor,
            name: name,
            mestype: mestype,
            updated_at: updated_at,
            log: say_1.deco_text_lf
          }), m("h3", "参加キャラクター")
        ];
      });
      v.tie.do_draw(function() {
        var drop, extra, full, game_rule, gift, gift_appends, gift_items, gift_sides, human, human_count, minus, mob_type, mob_type_info, player, player_count, player_count_start, player_count_start_error, ref, robber, role, role_table_error, role_table_info, start_auto, vdoms, villager, wolf;
        ref = v.params, role = ref.role, gift = ref.gift, extra = ref.extra, mob_type = ref.mob_type, game_rule = ref.game_rule, start_auto = ref.start_auto, player_count = ref.player_count, player_count_start = ref.player_count_start;
        full = slice.call(role).concat(slice.call(gift));
        extra = extra.length;
        minus = 0;
        minus += 2 * Mem.Query.roles.minus2(role).length;
        minus += 1 * Mem.Query.roles.minus1(full).length;
        wolf = Mem.Query.roles.wolfs(full).length;
        human = Mem.Query.roles.humans(role).length - minus;
        player = Mem.Query.roles.players(role).length;
        robber = Mem.Query.roles.robbers(role).length;
        villager = Mem.Query.roles.villagers(role).length;
        gift_sides = Mem.Query.roles.gift_sides(gift).length;
        gift_items = Mem.Query.roles.gift_items(gift).length;
        gift_appends = Mem.Query.roles.gift_appends(gift).length;
        drop = player - player_count;
        vdoms = [];
        vdoms.push("最大 ");
        vdoms.push(m("span.mark.SSAY", player + "人"));
        if (extra) {
          vdoms.push(m("span.mark.VSAY", "+" + extra + "人"));
        }
        vdoms.push(" が参加できます。");
        v.player_summary = m("div", vdoms, error_and_info(v));
        switch (mob_type) {
          case "juror":
            if (!(extra || (indexOf.call(gift, "decide") >= 0))) {
              role_table_error = "投票する人物が必要です。見物人（陪審）または、決定者を割り当てましょう。";
            }
            break;
          case "gamemaster":
            if (!extra) {
              mob_type_info = "見物人（黒幕）を割り当てましょう。";
            }
        }
        switch (game_rule) {
          case "TABULA":
          case "LIVE_TABULA":
          case "TROUBLE":
            if (!((0 < wolf && wolf < human))) {
              role_table_error = "人間(" + human + "人)は人狼(" + wolf + "人)より多く必要です。";
            }
            break;
          case "MILLERHOLLOW":
          case "LIVE_MILLERHOLLOW":
          case "MISTERY":
            if (!(1 < villager)) {
              role_table_error = "村人(" + villager + "人)が足りません。";
            }
            if (!(0 < wolf)) {
              role_table_error = "人狼(" + wolf + "人)が足りません。";
            }
        }
        if (start_auto) {
          if (!(player_count_start <= player_count)) {
            player_count_start_error = "ゲームが開始できません。";
          }
          if (!(3 < player_count_start)) {
            player_count_start_error = "最少催行人数が少なすぎます。";
          }
        }
        if (game_rule === "LIVE_TABULA" || game_rule === "LIVE_MILLERHOLLOW") {
          if (indexOf.call(role, "dish") >= 0) {
            role_table_error = "鱗魚人が勝利できません。";
          }
        }
        if (robber) {
          if (player < player_count) {
            role_table_error = "役職(" + player + "人)が足りません。盗賊(" + robber + "人)には余り札が必要です。";
          }
          if (wolf <= robber) {
            role_table_error = "人狼(" + wolf + "人)が足りません。盗賊(" + robber + "人)より多くないと、人狼がいない村になる可能性があります。";
          }
        } else {
          if (drop < 0) {
            role_table_error = "役職(" + player + "人)が足りません。定員以上にしましょう。";
          }
        }
        if ((gift_sides + gift_appends) && gift_items) {
          role_table_error = "光の輪や魔鏡と、能力や勝利条件を付与する恩恵は共存できません。";
        }
        if (gift_sides && gift_appends) {
          role_table_error = "能力を加える恩恵と、勝利条件が変わる恩恵は共存できません。";
        }
        if (indexOf.call(role, "villager") < 0) {
          role_table_error = "NPCのために、村人をひとつ入れてください。";
        }
        role_table_info = 0 < drop ? "役職配布時、余り札（" + drop + "枚）は捨て去ります。" : void 0;
        if (human) {
          human_count = minus ? human + "人以上は村人です。" : human + "人は村人です。";
        }
        v.tie.input.player_count_start.error(player_count_start_error);
        v.tie.input.player_count.info(human_count);
        v.tie.input.role_table.error(role_table_error);
        v.tie.input.role_table.info(role_table_info);
        return v.tie.input.mob_type.info(mob_type_info);
      });
      v.tie.draw();
      add_btn = function(arg) {
        var _id, cmd, label, win;
        _id = arg._id, cmd = arg.cmd, win = arg.win, label = arg.label;
        v.tie.input[cmd].options[_id] = {
          _id: _id,
          label: label
        };
        return v.tie.input[cmd].item(_id, {
          className: "WIN_" + win
        });
      };
      v.adds = {
        human: Mem.Query.roles.is("human").list.map(add_btn),
        evil: Mem.Query.roles.is("evil").list.map(add_btn),
        wolf: Mem.Query.roles.is("wolf").list.map(add_btn),
        pixi: Mem.Query.roles.is("pixi").list.map(add_btn),
        other: Mem.Query.roles.is("other").list.map(add_btn),
        gift: Mem.Query.roles.is("gift").list.map(add_btn),
        trap: Mem.Query.traps.show().list.map(add_btn),
        mob: [
          {
            _id: "mob",
            cmd: "extra",
            win: "NONE",
            label: "見物人"
          }
        ].map(add_btn)
      };
      return v;
    },
    view: function(v) {
      var chk, nindex, o, sets;
      sets = function(method, cmd) {
        return m("div", v.tie.input[cmd].back(), GUI.names[method](v.params[cmd], function(size, arg) {
          var label, win;
          label = arg.label, win = arg.win;
          if (size > 1) {
            return m("span.WIN_" + win + ".emboss", label + "x" + size);
          } else {
            return m("span.WIN_" + win + ".emboss", "" + label);
          }
        }));
      };
      nindex = 0;
      v.tie.draw();
      return v.tie.form({}, m(".vmake", {
        key: v._id
      }, m(".INFOSP.info", m("p.text", "村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。", m("br"), "村作成から", m("span.mark", Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP + "日間"), "が、募集の期限となります。期限内に村が開始しなかった場合、廃村となります。")), m(".MAKER.plane", m("fieldset.msg", m("legend.emboss", "村の名前、説明、ルール"), v.tie.input.vil_name.field(), v.tie.input.vil_comment.field(), m("p.mes_date", v.tie.input.vil_comment.foot()), m("p", "■国のルール"), RULE.nation.list.map(function(o) {
        return m("p", (++nindex) + "." + o.head);
      }), m(".emboss", "以上の項目が、人狼議事の", m('a', {
        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"
      }, "ルール"), "と", m('a', {
        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"
      }, "心構え"), "なんだ。編集していい部分は、自由に変更してかまわない。"))), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "設定"), m("p", v.tie.input.trs_type.field(), v.tie.input.trs_type.label()), m("p", v.tie.input.rating.field(), v.tie.input.rating.label()), m("p", v.tie.input.say_count.field(), v.tie.input.say_count.label()), v.tie.input.time.field(), v.tie.input.time.label(), m("p", v.tie.input.interval.field(), v.tie.input.interval.label()), m("p", v.tie.input.entry_password.field(), v.tie.input.entry_password.label()))), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "ゲームルール"), v.tie.input.game_rule.field(), v.tie.input.game_rule.label(), (function() {
        var i, len, ref, results;
        ref = v.tie.input.checkboxes;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          chk = ref[i];
          results.push(m("p", chk.field(), chk.label()));
        }
        return results;
      })())), m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成"), m("p", v.tie.input.mob_type.field(), v.tie.input.mob_type.label()), m("p", v.tie.input.role_table.field()), v.player_summary)), (function() {
        switch (v.params.role_table) {
          case void 0:
            return m(".WSAY.plane", m("fieldset.msg", m("legend.emboss", "編成詳細"), m("p", "まずは、役職配分を選択してください。")));
          case "custom":
            return m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成自由設定"), m("p", v.tie.input.player_count.field(), v.tie.input.player_count.label()), v.params.start_auto ? m("p", v.tie.input.player_count_start.field(), v.tie.input.player_count_start.label()) : void 0, sets("config", "extra"), sets("config", "role"), sets("config", "gift"), v.params.seq_event ? sets("order", "trap") : sets("config", "trap"), m("h6", "村側"), v.adds.human, m("h6", "敵方の人間"), v.adds.evil, m("h6", "人狼"), v.adds.wolf, m("h6", "妖精"), v.adds.pixi, m("h6", "その他"), v.adds.other, v.adds.mob, m("h6", "恩恵"), v.adds.gift, m("h6", "事件"), v.adds.trap));
          default:
            return m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成詳細"), m("p", v.tie.input.player_count.field(), v.tie.input.player_count.label()), v.params.start_auto ? m("p", v.tie.input.player_count_start.field(), v.tie.input.player_count_start.label()) : void 0, sets("config", "extra"), sets("config", "role"), sets("config", "gift"), v.params.seq_event ? sets("order", "trap") : sets("config", "trap"), v.adds.mob));
        }
      })(), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "登場人物"), m("p", v.tie.input.chr_npc.field(), v.tie.input.chr_npc.label()))), v.npc_says, m(".minilist", m("hr.black"), (function() {
        var i, len, ref, results;
        ref = v.jobs;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          results.push(m(".chrbox", {
            key: o.face_id
          }, GUI.portrate(o.face_id), m(".bar.live")));
        }
        return results;
      })(), m("hr.black")), m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "決定"), v.tie.submit("村の作成"), error_and_info(v)))));
    }
  };

}).call(this);

(function(){
  doc.component.vmake = {
    controller: function(v){
      this.is_check = m.prop(false);
      this.mosaic = {
        type: "checkbox",
        onchange: m.withAttr("checked", this.is_check)
      };
    },
    view: function(arg$, arg1$){
      var is_check, mosaic, _id, mestype, style;
      is_check = arg$.is_check, mosaic = arg$.mosaic;
      _id = arg1$._id, mestype = arg1$.mestype, style = arg1$.style;
      return m("." + mestype + ".action", {
        key: _id
      }, m("p.text." + style, "便利な", m('a.btn.edge', {
        href: "http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD"
      }, "企画村予定表"), "はもう見た？建てた村に人が集まりそうかどうか、予想できるかもしれないよ。", m("br")), doc.user.is_login
        ? is_check()
          ? m('a.btn.edge[href="./sow.cgi?cmd=makevilform"]', "村の作成")
          : m("h6", "見たよ！今から、村を立てるよ！", m("input", mosaic))
        : m("h6", "村を作成する場合はログインして下さい。"));
    }
  };
}).call(this);

(function() {
  var day_or_night, h1_width, hour;

  hour = 1000 * 60 * 60;

  h1_width = 770;

  day_or_night = 0;

  Timer.tick(function(now) {
    var zone;
    zone = now + 3 * hour;
    day_or_night = Math.floor(zone / (12 * hour)) % 2;
    m.redraw();
    return 12 * hour - zone % (12 * hour);
  });

  win.on.resize.push(function() {
    var width;
    width = doc.width.content();
    h1_width = 770;
    if (width <= 580) {
      h1_width = 580;
    }
    if (width <= 458) {
      return h1_width = 458;
    }
  });

  doc.view.banner = function() {
    var theme;
    theme = Mem.conf.theme[Url.prop.theme()];
    return m('a[href="//giji.check.jp/"]', m("img", {
      src: GUI.img_head + ("/banner/title" + h1_width) + theme.width[h1_width][day_or_night]
    }));
  };

}).call(this);

(function() {
  doc.view.css_changer = function(tie) {
    var input;
    input = tie.input;
    tie.draw();
    return m(".paragraph", menu.input.icon.item("cog", {
      className: "pull-right tooltip-left"
    }), input.theme.field(), m("hr.black"));
  };

}).call(this);

(function(){
  var timer, dom, deco_action, identity_action, ext;
  timer = function(query, o){
    var child, attr;
    child = "";
    attr = {
      config: function(elem, is_continue, context){
        var at;
        at = Timer.fetch(o.updated_at);
        context.onunload = function(){
          var ref$;
          return ref$ = context.update, delete context.update, ref$;
        };
        context.update = function(text){
          var child;
          child = text;
          elem.innerText = text;
          return elem.textContent = text;
        };
        if (!is_continue) {
          return at.start(context);
        }
      }
    };
    return m(query, attr, child);
  };
  dom = function(parent, query, cb){
    var vdom, tag, attr, i$, ref$, len$, elem, data, ref1$, results$ = [];
    vdom = m(query);
    tag = vdom.tag;
    attr = Object.keys(vdom.attrs)[0];
    for (i$ = 0, len$ = (ref$ = parent.querySelectorAll(query)).length; i$ < len$; ++i$) {
      elem = ref$[i$];
      data = attr && Mem.unpack.Array((ref1$ = elem.attributes[attr]) != null ? ref1$.value : void 8);
      results$.push(cb.apply(elem, data));
    }
    return results$;
  };
  deco_action = function(by_id){
    return {
      config: function(parent, is_continue, context){
        dom(parent, "span[anchor]", function(a, turn, id){
          return this.onmouseup = this.ontouchend = function(e){
            m.startComputation();
            doc.delegate.tap_anchor(turn, a, id, by_id);
            return m.endComputation();
          };
        });
        dom(parent, "span[random]", function(cmd, val){
          return this.onmouseup = this.ontouchend = function(e){
            m.startComputation();
            doc.delegate.tap_random(cmd, val, by_turn, by_id);
            return m.endComputation();
          };
        });
        return dom(parent, "span[external]", function(id, uri, protocol, host, path){
          return this.onmouseup = this.ontouchend = function(e){
            m.startComputation();
            doc.delegate.tap_external(id, uri, protocol, host, path, by_id);
            return m.endComputation();
          };
        });
      }
    };
  };
  identity_action = function(o){
    var cb;
    cb = function(){
      return doc.delegate.tap_identity(o.turn, o.logid, o._id);
    };
    return {
      onmouseup: cb,
      ontouchend: cb
    };
  };
  doc.ext = ext = {
    say_base: function(v){
      var timer, res$, i$, to$;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      timer = res$;
      return m("table." + v.mestype + ".talk", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id)), m("td", m(".msg", ext.talk_name(v.user_id, v.name, v.to), ext.talk_text(v._id, v.style, v.log), m("p.mes_date", timer)))));
    },
    action_text: function(by_id, name, style, text){
      return m("p.text." + style, deco_action(by_id), m("b", m.trust(name)), "は、", m("span", m.trust(text.deco_text_br)));
    },
    talk_name: function(user_id, name, to){
      if (to) {
        return m("p.name.center", m("b.pull-left", m.trust(name + "")), m("b", "▷"), m("b.pull-right", m.trust(to + "")));
      } else {
        return m("p.name", m("b", m.trust(name)), m(".emboss.pull-right", user_id));
      }
    },
    talk_text: function(by_id, style, text){
      return m("p.text." + style, deco_action(by_id), m.trust(text.deco_text_br));
    }
  };
  doc.view.toc = function(o){};
  doc.view.helps = function(t){
    var o;
    return m(".paragraph." + t.mestype, {
      key: t._id
    }, m("ul", (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = t.list || []).length; i$ < len$; ++i$) {
        o = ref$[i$];
        results$.push(m("li", m("code", m.trust(o.name)), m("kbd", m.trust(o.help))));
      }
      return results$;
    }())));
  };
  doc.view.table = function(t){
    var header, o, key;
    return m(".paragraph." + t.mestype, {
      key: t._id
    }, m("table", t.heads ? m("thead", m("tr", (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = t.heads).length; i$ < len$; ++i$) {
        header = ref$[i$];
        results$.push(m("th", m.trust(header)));
      }
      return results$;
    }()))) : void 8, t.cols ? m("tbody", (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = t.list || []).length; i$ < len$; ++i$) {
        o = ref$[i$];
        results$.push(m("tr", (fn$())));
      }
      return results$;
      function fn$(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = t.cols).length; i$ < len$; ++i$) {
          key = ref$[i$];
          results$.push(m("td", m("p", m.trust(o[key]))));
        }
        return results$;
      }
    }())) : void 8));
  };
  doc.view.paragraph = function(o){
    return m(".paragraph", {
      key: o._id
    }, m.trust(o.log.deco_text_br));
  };
  doc.view.head = function(o){
    return m(o.mestype, {
      key: o._id
    }, m('a', {
      name: o._id
    }), m.trust(o.log.deco_text_br));
  };
  doc.view.event = function(o){
    switch (menu.params.scope) {
    case "home":
    case "talk":
      switch (o.logid) {
      case "EVENT-ASC":
        return m("." + o.mestype, {
          key: o._id
        }, m("h3", m.trust(o.name)));
      case "EVENT-DESC":
        return m("." + o.mestype, {
          key: o._id
        }, o.event.view.btn());
      }
      break;
    case "pins":
    case "memo":
    case "history":
      switch (o.logid) {
      case "EVENT-DESC":
        return m("." + o.mestype, {
          key: o._id
        }, m("h3", m.trust(o.name)), o.event.view.btn());
      case "EVENT-ASC":
        return m("." + o.mestype, {
          key: o._id
        });
      }
    }
  };
  doc.view.xxx = function(v){
    return m("div", {
      key: v._id
    }, ".U.C " + v._id);
  };
  doc.view.info = function(v){
    return m("." + v.mestype + ".info", {
      key: v._id
    }, ext.talk_text(v._id, "", v.log));
  };
  doc.view.guide = function(v){
    return m("." + v.mestype + ".guide", {
      key: v._id
    }, ext.talk_name(v.user_id, v.name, v.to), ext.talk_text(v._id, v.style, v.log), m("p.mes_date", m("span.emboss", identity_action(v), v.anchor), timer("span", v)));
  };
  doc.view.action = function(v){
    return m("." + v.mestype + ".action", {
      key: v._id
    }, ext.action_text(v._id, v.name, v.style, v.log), m("p.mes_date", timer("span", v)));
  };
  doc.view.memo = function(v){
    return m("table." + v.mestype + ".memo", {
      key: v._id
    }, m("tr", m("th", GUI.portrate(v.face_id), m("div", m("b", v.name))), m("td", ext.talk_text(v._id, v.style, v.log), m("p.mes_date", timer("span", v)))));
  };
  doc.view.talk = function(v){
    return ext.say_base(v, m("span.emboss", identity_action(v), v.anchor), timer("span", v));
  };
  doc.view.history = function(v){
    return ext.say_base(v, m("span.mark", v.anchor));
  };
}).call(this);

(function() {
  doc.view.sow_css_changer = function(tie) {
    var input, pwd, ref, ref1, uid, url;
    input = tie.input;
    url = (ref = window.gon) != null ? ref.url : void 0;
    tie.draw();
    return m(".paragraph", menu.input.icon.item("cog", {
      className: "pull-right menuicon tooltip-left"
    }), url ? doc.user.is_login ? ((ref1 = WebStore.cookie.prop, uid = ref1.uid, pwd = ref1.pwd, ref1), m("a.btn.edge", {
      href: url + "?ua=mb&cmd=vindex&uid=" + (uid()) + "&pwd=" + (pwd())
    }, "携帯")) : m("a.btn.edge", {
      href: url + "?ua=mb"
    }, "携帯") : void 0, input.theme.field(), m("hr.black"));
  };

}).call(this);

(function(){
  doc.view.sow_stories = function(v){
    return m(".paragraph", m("table.vindex", m("thead", m("tr", m("td", "id"), m("td", "村の名前"), m("td", "人数"), m("td", "進行"), m("td", "ルール"), m("td", "制限"))), m("tbody", v.error
      ? m("tr", m("td[colspan=6]", v.error))
      : Mem.Query.storys[v.mestype]().list.map(function(v){
        var chr_set;
        chr_set = Mem.Query.chr_sets.hash[v.csid] || Mem.Query.chr_sets.where({
          csid: v.csid
        }).list.first;
        return m("tr", m("td", v.vid), m("td", m('a', {
          href: v.link
        }, v.name), m("span.note", m("br"), "〈", m('a', {
          href: v.link
        }, "最新"), "〉", v.entry_limit === "password" ? m('img[src="#{GUI.img_head}/icon/key.png"][alt="[鍵]"]') : void 8), v.view.rating, m("span.note", m("br"), "　　人物 ： " + chr_set.label, m("br"), "　　更新 ： " + v.view.update_at + " " + v.view.update_interval + "毎", m("br"), "　 ")), m("td", v.player_count), m("td", v.status + ""), m("td", v.trs, m("br"), v.view.game_rule), m("td", m("span.note", v.view.say_limit_help)));
      }))));
  };
}).call(this);

(function(){
  doc.view.story_game = function(arg$){
    var event, story, roletable, mob, trap_card, texts, text, option_id, option;
    event = arg$.event, story = arg$.story;
    if (!(event && story)) {
      return [];
    }
    roletable = Mem.conf.role_table[story.type.roletable];
    mob = Mem.Query.roles.find(story.type.mob);
    trap_card = Mem.Query.traps.find(event.event);
    texts = [];
    if (event.winner && "WIN_NONE" !== event.winner) {
      texts.push(Mem.Query.winners.find(event.winner).label + "の勝利です。");
    }
    if (trap_card) {
      texts.push(m("kbd", trap_card));
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
    return m(".MAKER." + event.winner + ".guide", {
      key: "STORY-GAME"
    }, (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = texts).length; i$ < len$; ++i$) {
        text = ref$[i$];
        results$.push(m("p.text", text));
      }
      return results$;
    }()), [
      m("p.name", m("b", story.view.game_rule)), m("p.text", m("ul.note", m.trust(Mem.conf.rule[story.type.game].help)), m("ul.note", (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = story.options).length; i$ < len$; ++i$) {
          option_id = ref$[i$];
          option = Mem.conf.option[option_id];
          if (!option) {
            continue;
          }
          results$.push(m("li", option.label));
        }
        return results$;
      }()))), m("p.name", m("b", roletable.label + " / " + story.view.player_length + "人")), m("p.text", m("div", m("code", "事件"), story.view.trap_cards), m("div", m("code", "役職"), story.view.role_cards), m("div", m("code", mob.label), m("kbd", mob.help + ""))), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black")
    ]);
  };
}).call(this);

(function(){
  doc.view.story_rule = function(arg$){
    var event, story, rating, saycnt;
    event = arg$.event, story = arg$.story;
    if (!(event && story)) {
      return [];
    }
    rating = Mem.conf.rating[story.rating];
    saycnt = Mem.conf.say[story.type.say] || {};
    return m(".MAKER." + event.winner + ".guide", {
      key: "STORY-RULE"
    }, m("p.name", m("b", "設定")), m("p.text", m("div", m("code", "こだわり"), m("img", {
      src: GUI.img_head + ("/icon/cd_" + story.rating + ".png")
    }), m.trust(rating.label)), m("div", m("code", "発言制限"), m.trust(saycnt.label + "<br>" + saycnt.help)), m("div", m("code", "更新"), story.view.update_at + "(" + story.view.update_interval + "ごと)")), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
  };
}).call(this);

(function(){
  doc.view.story_spines = function(arg$){
    var _id, link, name, view, header;
    _id = arg$._id, link = arg$.link, name = arg$.name, view = arg$.view;
    header = m("div", m("a", {
      href: "http://giji.check.jp" + link
    }, m("code.icon-download")), m("a", {
      href: "http://7korobi.gehirn.ne.jp/stories/" + _id + ".html"
    }, m("code.icon-download")), m("kbd.note", _id), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/" + _id
    }, m.trust(name)), m("kbd", view.rating));
    return m("tr", {
      key: _id
    }, menu.params.icon === "resize-full"
      ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", view.update_at + " " + view.update_interval)), m("tr", m("th", "規模"), m("td", view.player_length + "人 " + view.say_limit)), m("tr", m("th", "ルール"), m("td", view.game_rule + "")))), m(".list", view.role_cards), m(".list", view.trap_cards))
      : m("td", header));
  };
}).call(this);

(function(){
  doc.view.story_text = function(arg$){
    var _id, story, nindex;
    _id = arg$._id, story = arg$.story;
    nindex = 0;
    return m(".MAKER.guide", {
      key: "STORY-TEXT"
    }, m("p.name", m("b", story.name)), doc.ext.talk_text(_id, "head", story.comment), m("p", "■国のルール"), RULE.nation.list.map(function(o){
      return m("p", (++nindex) + "." + o.head);
    }), m(".emboss", "以上の項目が、人狼議事の", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"), "と", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"), "なんだ。"), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
  };
}).call(this);

