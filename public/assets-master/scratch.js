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
    view: {},
    component: {},
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
    messages: {
      seeing: function(filter_size, center){
        var ids, list;
        ids = Object.keys(doc.seeing);
        ids = slice$.call(_.sortBy(ids, function(id){
          return -doc.seeing[id];
        }), 0, filter_size + 1 || 9e9);
        if ((center != null ? center.subid : void 8) === "S") {
          ids = _.filter(ids, function(id){
            return 25 < doc.seeing[id] && id !== center._id;
          });
          list = Mem.messages.finds(ids);
          list.unshift(center);
        } else {
          ids = _.filter(ids, function(id){
            return 25 < doc.seeing[id];
          });
          list = Mem.messages.finds(ids);
        }
        return list;
      },
      pins: function(arg$){
        var story_id, pins;
        story_id = arg$.story_id, pins = arg$.pins;
        return Mem.messages.pins(story_id(), pins());
      },
      anchor: function(arg$){
        var talk;
        talk = arg$.talk;
        return Mem.messages.anchor(talk(), win.scroll.prop());
      },
      home: function(arg$){
        var home;
        home = arg$.home;
        return Mem.messages.home(home());
      },
      talk: function(arg$){
        var talk, open, potofs_hide, search;
        talk = arg$.talk, open = arg$.open, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.messages.talk(talk(), open(), potofs_hide(), search());
      },
      memo: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.messages.memo(memo(), true, potofs_hide(), search());
      },
      history: function(arg$){
        var memo, potofs_hide, search;
        memo = arg$.memo, potofs_hide = arg$.potofs_hide, search = arg$.search;
        return Mem.messages.memo(memo(), false, potofs_hide(), search());
      }
    },
    security_modes: function(prop){
      var story, mob, grave_caption, think_caption, list;
      story = Mem.storys.list.first;
      mob = Mem.roles.find(story != null ? story.type.mob : void 8);
      grave_caption = [];
      if (Mem.messages.has.grave) {
        grave_caption.push("墓下");
      }
      if (Mem.messages.has.vsay && mob.CAPTION) {
        grave_caption.push(mob.CAPTION);
      }
      think_caption = [];
      if (Mem.messages.has.think) {
        think_caption.push("独り言");
      }
      if (Mem.messages.has.to) {
        think_caption.push("内緒話");
      }
      list = [];
      list.push(m("a", Btn.set({}, prop, "all"), "すべて"));
      if (think_caption.length > 0) {
        list.push(m("a", Btn.set({}, prop, "think"), think_caption.join("/") + "つき"));
      }
      if (Mem.messages.has.clan) {
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
      var ref$, potofs_desc, potofs_order, potofs_hide, potofs, hides, turn, ref1$, o, attr;
      ref$ = Url.prop, potofs_desc = ref$.potofs_desc, potofs_order = ref$.potofs_order, potofs_hide = ref$.potofs_hide;
      potofs = Mem.potofs.view(potofs_desc(), potofs_order()).list;
      hides = potofs_hide();
      turn = ((ref$ = win.scroll.center) != null ? (ref1$ = ref$.event) != null ? ref1$.turn : void 8 : void 8) || 0;
      return m(".minilist", m("h6", "キャラクターフィルタ"), m("p", m("a", Btn.keys_reset({}, potofs_hide, []), "全員表示"), m("a", Btn.keys_reset({}, potofs_hide, Mem.potofs.others()), "参加者表示"), m("a", Btn.keys_reset({}, potofs_hide, Mem.potofs.potofs()), "その他を表示"), m("a", Btn.keys_reset({}, potofs_hide, Mem.potofs.full()), "全員隠す")), m("hr.black"), (function(){
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
              return potofs_hide(hides);
            });
          });
        }
      }()), m("hr.black"));
    },
    writer: function(){
      var i$, ref$, len$, o, props, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.writers.list).length; i$ < len$; ++i$) {
        o = ref$[i$];
        props = {
          form: o,
          log: ""
        };
        Mem.rule.history.merge(props);
        results$.push(o.vdom(o, props));
      }
      return results$;
    }
  };
}).call(this);

(function() {
  Url.define(URL_PROPS, {});

  Url.routes = {
    hash: {
      story: new Url("/on/:story_id"),
      timer: new Url("timer=:viewed_at"),
      messages: new Url("/:event_id/messages/:message_ids/"),
      news: new Url("/:event_id/:mode_id/news/:row/"),
      all: new Url("/:event_id/:mode_id/all/"),
      page: new Url("/:event_id/:mode_id/:page.of.:row/"),
      hides: new Url("/hides/:hide_ids"),
      search: new Url("/search/:search"),
      potof: new Url("/potof/:potofs_order")
    },
    search: {
      css: new Url("css=:theme~:width~:layout~:font", {
        unmatch: "?",
        change: function(params) {
          var key, list;
          list = (function() {
            var i, len, ref, results;
            ref = ["theme", "width", "layout", "font", "w", "item", "color"];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              key = ref[i];
              results.push((Url.prop[key]()) + "-" + key);
            }
            return results;
          })();
          if (!Url.prop.human()) {
            list.push("no-player");
          }
          GUI.header(list);
          return window.requestAnimationFrame(function() {
            return win["do"].layout();
          });
        }
      })
    }
  };

}).call(this);

(function(){
  var deco_action, identity_action, ext, slice$ = [].slice;
  deco_action = function(by_id){
    return {
      config: function(parent, is_continue, context){
        GUI.dom(parent, "span[anchor]", function(a, turn, id){
          return this.onmouseup = this.ontouchend = function(e){
            m.startComputation();
            doc.delegate.tap_anchor(turn, a, id, by_id);
            return m.endComputation();
          };
        });
        GUI.dom(parent, "span[random]", function(cmd, val){
          return this.onmouseup = this.ontouchend = function(e){
            m.startComputation();
            doc.delegate.tap_random(cmd, val, by_turn, by_id);
            return m.endComputation();
          };
        });
        return GUI.dom(parent, "span[external]", function(id, uri, protocol, host, path){
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
    var attr;
    return attr = GUI.attrs({}, function(){
      return this.end(function(e){
        return doc.delegate.tap_identity(o.turn, o.logid, o._id);
      });
    });
  };
  doc.ext = ext = {
    say_base: function(v){
      var timer;
      timer = slice$.call(arguments, 1);
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
  doc.message = {
    ext: ext,
    toc: function(o){},
    helps: function(t){
      var o;
      return m(".paragraph." + t.mestype, {
        key: t._id
      }, m("ul", (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = t.list || []).length; i$ < len$; ++i$) {
          o = ref$[i$];
          results$.push(m("li", m("code", m.trust(o.name)), m("kbd", m.trust(o.HELP))));
        }
        return results$;
      }())));
    },
    table: function(t){
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
    },
    paragraph: function(o){
      return m(".paragraph", {
        key: o._id
      }, m.trust(o.log.deco_text_br));
    },
    head: function(o){
      return m(o.mestype, {
        key: o._id
      }, m('a', {
        name: o._id
      }), m.trust(o.log.deco_text_br));
    },
    event: function(o){
      switch (menu.scope.state()) {
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
    },
    xxx: function(v){
      return m("div", {
        key: v._id
      }, ".U.C " + v._id);
    },
    info: function(v){
      return m("." + v.mestype + ".info", {
        key: v._id
      }, ext.talk_text(v._id, "", v.log));
    },
    guide: function(v){
      return m("." + v.mestype + ".guide", {
        key: v._id
      }, ext.talk_name(v.user_id, v.name, v.to), ext.talk_text(v._id, v.style, v.log), m("p.mes_date", m("span.emboss", identity_action(v), v.anchor), GUI.timer("span", v)));
    },
    action: function(v){
      return m("." + v.mestype + ".action", {
        key: v._id
      }, ext.action_text(v._id, v.name, v.style, v.log), m("p.mes_date", GUI.timer("span", v)));
    },
    memo: function(v){
      return m("table." + v.mestype + ".memo", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id), m("div", m("b", v.name))), m("td", ext.talk_text(v._id, v.style, v.log), m("p.mes_date", GUI.timer("span", v)))));
    },
    talk: function(v){
      return ext.say_base(v, m("span.emboss", identity_action(v), v.anchor), GUI.timer("span", v));
    },
    history: function(v){
      return ext.say_base(v, m("span.mark", v.anchor));
    }
  };
}).call(this);

(function(){
  doc.message.form = function(v){
    var error_and_info, select, chr_job, face, vv, form_text, target, able, input;
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
        actions = Mem.actions.for_form(v.mestype, v.format).list.map(function(act){
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
    chr_job = Mem.chr_jobs.find(v.chr_job_id);
    face = chr_job.face;
    return m("div", {
      key: v._id
    }, m("h6", m.trust(v.role_name)), m("table." + v.mestype + ".talk", m("tr", m("th"), m("td", m(".msg", (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.form_texts.formats(v._id, v.mestype).list).length; i$ < len$; ++i$) {
        vv = ref$[i$];
        results$.push(m("span.btn.edge", v.format_on(vv.format), vv.format_name));
      }
      return results$;
    }()), (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.form_texts.mestypes(v._id, v.format).list).length; i$ < len$; ++i$) {
        vv = ref$[i$];
        results$.push(m("span.btn.edge", v.mestype_on(vv.mestype), vv.mestype_name));
      }
      return results$;
    }()))))), (form_text = Mem.form_texts.find(v._id + "-" + v.mestype + "-" + v.format)) ? (function(){
      switch (v.format) {
      case "act":
        target = form_text.target_at(form_text.target());
        return m("." + v.mestype + ".action", m("p.text", m("b", face.name), "は、", target.name, form_text.text()), m("p.mes_date", form_text.summary), m("p.text", select(form_text, {
          action: "ACT"
        })), error_and_info(form_text));
      default:
        return m("table." + v.mestype + "." + v.format, m("tr", m("th", GUI.portrate(face._id)), m("td", m(".msg", doc.message.ext.talk_name(v.name, chr_job.job + " " + face.name, v.to), m("form", form_text.attr.form(), m("textarea[rows=5]", form_text.attr.text())), m("p.mes_date", form_text.summary)), m(".msg", error_and_info(form_text)))));
      }
    }()) : void 8, m(".WIN_" + v.win + ".info", m(".emboss.pull-right", m.trust(v.role_name)), (function(){
      var i$, ref$, len$, ref1$, results$ = [];
      for (i$ = 0, len$ = (ref$ = v.selects).length; i$ < len$; ++i$) {
        ref1$ = ref$[i$], able = ref1$.able, input = ref1$.input;
        results$.push([select(input, able), error_and_info(input)]);
      }
      return results$;
    }()), m("p.text", m.trust(v.role_help)), v.history ? m("p.text", m.trust(v.history)) : void 8), m(".caution.info", m("p.text", m.trust(v.able_help))), m("hr.black"));
  };
}).call(this);

(function(){
  var toggle_desc;
  toggle_desc = function(prop, desc, value){
    var attr;
    if (prop() === value) {
      attr = Btn.bool({}, desc);
      attr.className = "btn edge active";
      return attr;
    } else {
      return Btn.set({}, prop, value);
    }
  };
  doc.message.potofs = function(v){
    var ref$, potofs_order, potofs_desc, hides, o, filter_class;
    ref$ = Url.prop, potofs_order = ref$.potofs_order, potofs_desc = ref$.potofs_desc;
    hides = Url.prop.potofs_hide();
    return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]", m("sup", "(スクロールします。)")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "stat_at"), "日程")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "stat_type"), "状態")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "said_num"), "発言")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "pt"), "残り")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "urge"), "促")), m("th", m("span.icon-user", " ")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "select"), "希望")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "win_result"), "勝敗")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "win_side"), "陣営")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "role"), "役割")), m("th", m("a", toggle_desc(potofs_order, potofs_desc, "text"), "補足")))), m("tbody.plane", {
      test: "test"
    }, (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.potofs.view(potofs_desc(), potofs_order()).list).length; i$ < len$; ++i$) {
        o = ref$[i$];
        filter_class = hides[o.face_id] ? "filter-hide" : "";
        results$.push(m("tr", {
          className: filter_class
        }, m("th." + o.live + ".calc", {}, o.view.job), m("th." + o.live, {}, o.name), m("td." + o.live + ".calc", {}, o.view.stat_at), m("td." + o.live, {}, o.view.stat_type), m("td." + o.live + ".calc", {}, o.view.said_num), m("td." + o.live + ".calc", {}, o.view.pt), m("td." + o.live + ".center", {}, o.view.urge), m("td." + o.live + ".center", {}, o.view.user_id), m("td." + o.live + ".center", {}, o.view.select), m("td.WIN_" + o.view.win + ".center", {}, o.view.win_result), m("td.WIN_" + o.view.win + ".calc", {}, o.view.win_side), m("td.WIN_" + o.view.win, {}, o.view.role), m("td.WIN_" + o.view.win, {}, m.trust(o.view.text))));
      }
      return results$;
    }()))));
  };
}).call(this);

(function(){
  var stories;
  stories = {
    controller: function(v){
      return v;
    },
    view: function(v){
      return m("tbody", v.error
        ? m("tr", m("td[colspan=6]", v.error))
        : Mem.storys[v.mestype]().list.map(function(v){
          var chr_set;
          chr_set = Mem.chr_sets.hash[v.csid] || Mem.chr_sets.where({
            csid: v.csid
          }).list.first;
          return m("tr", m("td", v.vid), m("td", m('a', {
            href: v.link
          }, v.name), m("span.note", m("br"), "〈", m('a', {
            href: v.link
          }, "最新"), "〉", v.entry_limit === "password" ? m('img[src="#{GUI.img_head}/icon/key.png"][alt="[鍵]"]') : void 8), v.view.rating, m("span.note", m("br"), "　　人物 ： " + chr_set.caption, m("br"), "　　更新 ： " + v.view.update_at + " " + v.view.update_interval + "毎", m("br"), "　 ")), m("td", v.player_count), m("td", v.status + ""), m("td", v.trs, m("br"), v.view.game_rule), m("td", m("span.note", v.view.say_limit_help)));
        }));
    }
  };
  doc.message.stories = function(v){
    return m(".paragraph", m("table.vindex", m("thead", m("tr", m("td", "id"), m("td", "村の名前"), m("td", "人数"), m("td", "進行"), m("td", "ルール"), m("td", "制限"))), m.component(stories, v)));
  };
}).call(this);

(function(){
  var ext;
  ext = doc.ext;
  /*
  "epilogue":0,
  "event":null,
  "say":{},
  "seance":{},
  "turn":0,
  */
  doc.message.story_game = function(o){
    var event, story, roletable, mob, trap_card, texts, text, option_id, option;
    event = o.event;
    story = o.story;
    if (!(event && story)) {
      return [];
    }
    roletable = Mem.conf.role_table[story.type.roletable];
    mob = Mem.roles.find(story.type.mob);
    trap_card = Mem.traps.find(event.event);
    texts = [];
    if (event.winner && "WIN_NONE" !== event.winner) {
      texts.push(Mem.winners.find(event.winner).name + "の勝利です。");
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
      m("p.name", m("b", story.view.game_rule)), m("p.text", m("ul.note", m.trust(Mem.conf.rule[story.type.game].HELP)), m("ul.note", (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = story.options).length; i$ < len$; ++i$) {
          option_id = ref$[i$];
          option = Mem.conf.option[option_id];
          if (!option) {
            continue;
          }
          results$.push(m("li", option.help));
        }
        return results$;
      }()))), m("p.name", m("b", roletable.name + " / " + story.view.player_length + "人")), m("p.text", m("div", m("code", "事件"), story.view.trap_cards), m("div", m("code", "役職"), story.view.role_cards), m("div", m("code", mob.name), m("kbd", mob.HELP + ""))), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black")
    ]);
  };
  doc.message.story_rule = function(o){
    var event, story, rating, saycnt;
    event = o.event;
    story = o.story;
    if (!(event && story)) {
      return [];
    }
    rating = Mem.conf.rating[story.rating];
    saycnt = Mem.conf.say[story.type.say] || {};
    return m(".MAKER." + event.winner + ".guide", {
      key: "STORY-RULE"
    }, m("p.name", m("b", "設定")), m("p.text", m("div", m("code", "こだわり"), m("img", {
      src: GUI.img_head + ("/icon/cd_" + story.rating + ".png")
    }), m.trust(rating.caption)), m("div", m("code", "発言制限"), m.trust(saycnt.CAPTION + "<br>" + saycnt.HELP)), m("div", m("code", "更新"), story.view.update_at + "(" + story.view.update_interval + "ごと)")), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
  };
  doc.message.story_text = function(o){
    var story, nindex;
    story = o.story;
    nindex = 0;
    return m(".MAKER.guide", {
      key: "STORY-TEXT"
    }, m("p.name", m("b", story.name)), ext.talk_text(o._id, "head", story.comment), m("p", "■国のルール"), RULE.nation.list.map(function(o){
      return m("p", (++nindex) + "." + o.head);
    }), m(".emboss", "以上の項目が、人狼議事の", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"), "と", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"), "なんだ。"), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
  };
  doc.message.story_spines = function(v){
    var header;
    header = m("div", m("a", {
      href: "http://giji.check.jp" + v.link
    }, m("code.icon-download")), m("a", {
      href: "http://7korobi.gehirn.ne.jp/stories/" + v._id + ".html"
    }, m("code.icon-download")), m("kbd.note", v._id), m("a", {
      href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/stories/" + v._id
    }, m.trust(v.name)), m("kbd", v.view.rating));
    return m("tr", {
      key: v._id
    }, menu.icon.state() === "resize-full"
      ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", v.view.update_at + " " + v.view.update_interval)), m("tr", m("th", "規模"), m("td", v.view.player_length + "人 " + v.view.say_limit)), m("tr", m("th", "ルール"), m("td", v.view.game_rule + "")))), m(".list", v.view.role_cards), m(".list", v.view.trap_cards))
      : m("td", header));
  };
}).call(this);

(function(){
  var mestype_orders, timeline_present;
  mestype_orders = ['SAY', 'MSAY', 'VSAY', 'VGSAY', 'GSAY', 'SPSAY', 'WSAY', 'XSAY', 'BSAY', 'AIM', 'TSAY', 'MAKER', 'ADMIN'];
  timeline_present = function(arg$){
    var ref$, width, height, talk, open, potofs_hide, talk_at, search, graph_height, base, masks, time_ids, x, y, max_height, time_width, view_port_x, view_port_y, index_at, choice_last;
    ref$ = arg$.size, width = ref$[0], height = ref$[1];
    ref$ = Url.prop, talk = ref$.talk, open = ref$.open, potofs_hide = ref$.potofs_hide, talk_at = ref$.talk_at, search = ref$.search;
    if (!Mem.events.list.length) {
      return;
    }
    graph_height = height - 50;
    base = {};
    masks = {};
    time_ids = [];
    x = y = max_height = time_width = 0;
    view_port_x = function(){
      base = Mem.messages.talk(talk(), open(), potofs_hide());
      if (!base.reduce) {
        return false;
      }
      masks = base.reduce.mask || {};
      time_ids = _.sortBy(Object.keys(masks), unpack.Date);
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
      var i$, ref$, len$, i, time_id, mask;
      for (i$ = 0, len$ = (ref$ = time_ids).length; i$ < len$; ++i$) {
        i = i$;
        time_id = ref$[i$];
        mask = masks[time_id];
        if (updated_at <= mask.all.max) {
          return i;
        }
      }
      for (i$ = (ref$ = time_ids).length - 1; i$ >= 0; --i$) {
        i = i$;
        time_id = ref$[i$];
        mask = masks[time_id];
        if (mask.all.min <= updated_at) {
          return i;
        }
      }
      return 0;
    };
    choice_last = function(query, time){
      var i$, ref$, o;
      for (i$ = (ref$ = query.list).length - 1; i$ >= 0; --i$) {
        o = ref$[i$];
        if (time > o.updated_at) {
          talk_at(o._id);
          menu.icon.change("search");
          menu.scope.change("talk");
          Url.prop.scroll("");
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
        query = graph_height < offset.y ? Mem.messages.talk("open", false, {}) : base;
        return choice_last(query, time);
      },
      draw: function(arg$){
        var ctx, focus, offset;
        ctx = arg$.ctx;
        focus = Mem.messages.find(talk_at());
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
        for (i$ = 0, len$ = (ref$ = Mem.events.list).length; i$ < len$; ++i$) {
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
  };
  doc.timeline = function(){
    return m.component(Canvas, '#timeline', timeline_present, {
      size: [2 * doc.width.content(), 150]
    });
  };
}).call(this);

(function() {
  var slice = [].slice;

  if ((typeof gon !== "undefined" && gon !== null ? gon.stories : void 0) != null) {
    Mem.rule.story.set(gon.stories);
    win.mount("#stories", function(dom) {
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
      return {
        controller: function() {},
        view: function() {
          var query, ref;
          query = (ref = Mem.storys).menu.apply(ref, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values())));
          return m(".paragraph", menu.icon.icon("search", {
            deploy: function(main_menu) {
              main_menu.drill("rating", {
                caption: "こだわり",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    rating: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge rating"
                  }, Url.prop.rating, reduce, "rating", function(key, o) {
                    return m("span", m("img.pull-left", {
                      src: GUI.img_head + ("/icon/cd_" + o.min_is.rating + ".png")
                    }), Mem.conf.rating[key].caption);
                  }));
                }
              });
              main_menu.drill("game", {
                caption: "ルール",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    game: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge game"
                  }, Url.prop.game, reduce, "game", function(key, o) {
                    return o.min_is.view.game_rule;
                  }));
                }
              });
              main_menu.drill("folder", {
                caption: "州",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, ["all"].concat(slice.call(Url.routes.search.stories.values()))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge folder"
                  }, Url.prop.folder, reduce, "folder", function(key, o) {
                    var ref2;
                    return (ref2 = CONF_FOLDER[key]) != null ? ref2.nation : void 0;
                  }));
                }
              });
              main_menu.drill("say_limit", {
                caption: "発言制限",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    say_limit: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge say_limit"
                  }, Url.prop.say_limit, reduce, "say_limit", function(key, o) {
                    return o.min_is.view.say_limit;
                  }));
                }
              });
              main_menu.drill("update_at", {
                caption: "更新時刻",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    update_at: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge update_at"
                  }, Url.prop.update_at, reduce, "update_at", function(key, o) {
                    return o.min_is.view.update_at;
                  }));
                }
              });
              main_menu.drill("update_interval", {
                caption: "更新間隔",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    update_interval: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge update_interval"
                  }, Url.prop.update_interval, reduce, "update_interval", function(key, o) {
                    return o.min_is.view.update_interval;
                  }));
                }
              });
              main_menu.drill("event_type", {
                caption: "事件",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    event_type: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge event_type"
                  }, Url.prop.event_type, reduce, "event_type", function(key, o) {
                    return key;
                  }));
                }
              });
              main_menu.drill("role_type", {
                caption: "役職",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    role_type: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge role_type"
                  }, Url.prop.role_type, reduce, "role_type", function(key, o) {
                    return key;
                  }));
                }
              });
              return main_menu.drill("player_length", {
                caption: "人数",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    player_length: "all"
                  })))).reduce;
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge player_length"
                  }, Url.prop.player_length, reduce, "player_length", function(key, o) {
                    return o.min_is.view.player_length + "人";
                  }));
                }
              });
            },
            view: function(main_menu) {
              return m(".paragraph", m("h6", "検索する。"), m("input.mini", Txt.input(Url.prop.search)), main_menu.drills({}, ["folder", "game", "event_type", "role_type", "rating", "say_limit", "player_length", "update_at", "update_interval"]));
            }
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
            }, menu.icon.state() === "resize-full" ? m("td", header, m("table.detail", m("tbody", m("tr", m("th", "更新"), m("td", o.view.update_at + " " + o.view.update_interval)), m("tr", m("th", "規模"), m("td", o.view.player_length + "人 " + o.view.say_limit)), m("tr", m("th", "ルール"), m("td", "" + o.view.game_rule)))), m(".list", o.view.role_cards), m(".list", o.view.trap_cards)) : m("td", header));
          })));
        }
      };
    });
  }

}).call(this);

(function() {
  this.change_pin = function(id) {
    var target, target_at;
    target = menu.scope.state();
    switch (target) {
      case "history":
        target_at = Url.prop.memo_at;
        break;
      case "memo":
      case "talk":
      case "home":
        target_at = Url.prop[target + "_at"];
    }
    if (target_at) {
      target_at(id);
      Url.prop.back(target);
    }
    Url.prop.scroll(id);
    return menu.icon.change("pin");
  };

  if (((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && (gon.event != null)) {
    win.mount("#messages", function(dom) {
      win.scroll.size = 30;
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
        anker_id = Mem.messages.anker_id(folder, vid, turn, logid);
        ref1 = anker_id.split("-"), __ = ref1[0], __ = ref1[1], __ = ref1[2], logid = ref1[3];
        has_tap = Mem.messages.find(anker_id);
        event = Mem.events.find(folder + "-" + vid + "-" + turn);
        return doc.load.event(has_tap, event, function() {
          var pins;
          pins = Url.prop.pins();
          pins[by_turn + "-" + by_logid] = true;
          pins[turn + "-" + logid] = true;
          return change_pin(by_id);
        });
      };
      doc.delegate.tap_identity = function(turn, logid, id) {
        var pins;
        return;
        pins = Url.prop.pins();
        pins[turn + "-" + logid] = true;
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
          return [m(".paragraph", doc.timeline())];
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
          return [m(".paragraph", doc.timeline(), m("h6", "貼り付けたメモを表示します。 - メモ"), doc.security_modes(Url.prop.memo)), doc.potofs()];
        }
      });
      menu.icon.icon("chat-alt", {
        open: function() {
          return menu.scope.change("talk");
        },
        view: function() {
          return [m(".paragraph", doc.timeline(), m("h6", "村内の発言を表示します。 - 発言"), doc.security_modes(Url.prop.talk)), doc.potofs()];
        }
      });
      menu.icon.icon("clock", {
        open: function() {
          return menu.scope.change("history");
        },
        view: function() {
          return [m(".paragraph", doc.timeline(), m("h6", "メモを履歴形式で表示します。 - メモ"), doc.security_modes(Url.prop.memo)), doc.potofs()];
        }
      });
      menu.icon.icon("search", {
        view: function() {
          return m(".paragraph", doc.timeline(), m("input.medium", Txt.input(Url.prop.search)), m("span", "発言中の言葉を検索します。"), m("hr.black"));
        }
      });
      m.startComputation();
      window.requestAnimationFrame(function() {
        catch_gon.villages();
        catch_gon.messages();
        menu.scope.open();
        return m.endComputation();
      });
      return {
        controller: function() {},
        view: function() {
          return win.scroll.pager("div", doc.messages[menu.scope.state()](Url.prop).list, function(o) {
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
      };
    });
  }

}).call(this);

(function() {
  win.mount("#buttons", function(dom) {
    var layout;
    layout = new win.layout(dom, 1, -1);
    layout.width = 5;
    if (!head.browser.ios) {
      win.on.orientation.push(function() {
        var alpha, anime, beta, box, gamma, i, len, ref, ref1, results, rotate, z;
        ref = win.orientation, alpha = ref.alpha, beta = ref.beta, gamma = ref.gamma;
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
        ref1 = document.querySelectorAll(".icon-cog");
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          box = ref1[i];
          results.push(anime(box));
        }
        return results;
      });
    }
    return {
      controller: function() {
        return {
          helps: {
            "cog": "画面表示を調整します。",
            "home": "村の設定、アナウンスを表示します。",
            "clock": "メモの履歴を表示します。",
            "mail": "最新のメモを表示します。",
            "chat-alt": "発言を表示します。",
            "search": "検索機能をつかいます。",
            "resize-normal": "簡略な表記にします。",
            "resize-full": "詳細な表記にします。",
            "th-large": "条件で絞り込みます。",
            "pencil": "書き込み機能"
          }
        };
      },
      view: function(c) {
        var badges, section, vdoms;
        vdoms = [];
        section = function(icon) {
          var help, tag, vdom;
          if (!menu.icon.nodes[icon]) {
            return;
          }
          help = c.helps[icon];
          if (help != null) {
            tag = "section.tooltip-right[data-tooltip=\"" + help + "\"]";
          } else {
            tag = "section";
          }
          vdom = m(tag, menu.icon.start({
            "class": "glass"
          }, icon), m(".bigicon", m(".icon-" + icon, " ")), badges[icon] ? m(".badge.pull-right", badges[icon]()) : void 0);
          return vdoms.push(vdom);
        };
        badges = {
          "pin": function() {
            return doc.messages.pins(Url.prop).list.length - Mem.events.list.length;
          },
          "home": function() {
            return Mem.messages.home("announce").list.length - Mem.events.list.length;
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
            return doc.messages.memo(prop).list.length - Mem.events.list.length;
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
            return doc.messages.history(prop).list.length - Mem.events.list.length;
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
            return doc.messages.talk(prop).list.length - Mem.events.list.length;
          },
          "th-large": function() {
            return Mem.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list.length;
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
    };
  });

}).call(this);

(function() {
  if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
    win.mount("#sayfilter", function(dom) {
      var layout, line_text_height, line_text_height_measure, seeing_measure, seeing_top, wide_attr;
      layout = new win.layout(dom, -1, 1);
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
      return {
        controller: function() {},
        view: function(c) {
          var anchorview, center_id, day, event, filter, filter_size, go_click, key, o, pin_click, potofs, right_width, seeingview, star, tag, val, width;
          width = doc.width.content();
          right_width = (function() {
            switch (Url.prop.layout()) {
              case "right":
                return 0;
              case "center":
                return (win.width - width - 4) / 2;
              case "left":
                return win.width - width - 4;
            }
          })();
          layout.width = right_width;
          if (layout.large_mode()) {
            layout.width += doc.width.content();
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
            potofs = doc.message.potofs();
            anchorview = doc.messages.anchor(Url.prop).list;
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
            pin_click = function(list, append) {
              return GUI.attrs({}, function() {
                return this.click(function() {
                  var i, j, len, len1, o, pins;
                  pins = Url.prop.pins();
                  for (i = 0, len = append.length; i < len; i++) {
                    o = append[i];
                    pins[o.turn + "-" + o.logid] = true;
                  }
                  for (j = 0, len1 = list.length; j < len1; j++) {
                    o = list[j];
                    pins[o.turn + "-" + o.logid] = true;
                  }
                  return change_pin(center_id);
                });
              });
            };
            day = 24 * 60 * 60;
            star = function(o) {
              var attr;
              if (doc.seeing[o._id] >= day) {
                attr = GUI.attrs({}, function() {
                  return this.end(function(e) {
                    return delete doc.seeing[o._id];
                  });
                });
                return m("span." + o.mestype + ".btn.edge", attr, "★ ");
              } else {
                attr = GUI.attrs({}, function() {
                  return this.end(function(e) {
                    return doc.seeing_add(o._id, day);
                  });
                });
                return m("span." + o.mestype + ".btn.edge", attr, "☆ ");
              }
            };
            filter = m("section.plane", m("h6", "参照されている", m("span.btn.edge.icon-pin", pin_click(anchorview, [win.scroll.center]))), (function() {
              var i, len, results;
              results = [];
              for (i = 0, len = anchorview.length; i < len; i++) {
                o = anchorview[i];
                results.push(m("." + o.mestype + ".line_text", m(".badge", go_click(o), o.turn + ":" + o.anchor), m.trust(o.log.line_text)));
              }
              return results;
            })(), m("h6", seeing_measure, "よく見ていた", m("span.btn.edge.icon-pin", pin_click(seeingview, []))), (function() {
              var i, len, results;
              results = [];
              for (i = 0, len = seeingview.length; i < len; i++) {
                o = seeingview[i];
                if (o._id === center_id) {
                  tag = ".line_text.attention";
                } else {
                  tag = ".line_text";
                }
                results.push(m(tag, line_text_height_measure, star(o), m("." + o.mestype + ".badge", go_click(o), o.turn + ":" + o.anchor), m.trust(o.name + " " + o.log.line_text)));
              }
              return results;
            })());
          }
          potofs.children[0].children[1].attrs.className = "plane fine";
          for (key in wide_attr) {
            val = wide_attr[key];
            potofs.children[0].children[1].attrs[key] = val;
          }
          event = Mem.events.find(Url.prop.event_id());
          return m("div", event != null ? m(".head", event.name) : m(".foot"), m("aside", potofs, filter), m(".foot"));
        }
      };
    });
  }

}).call(this);

(function() {
  win.mount("#topviewer", function(dom) {
    return {
      controller: function() {
        var layout;
        return layout = new win.layout(dom, 0, 1, false, 0);
      },
      view: function() {
        return menu.icon.view();
      }
    };
  });

}).call(this);

(function(){
  var menu, out$ = typeof exports != 'undefined' && exports || this;
  out$.menu = menu = {
    icon: new MenuTree.Icon,
    scope: new MenuTree
  };
  menu.icon.state = Url.prop.icon;
  menu.scope.state = Url.prop.scope;
  menu.icon.icon("cog", {
    view: function(){
      return m(".paragraph", m("h6", "スタイル"), Btns.radio({}, Url.prop.theme, {
        cinema: "煉瓦",
        star: "蒼穹",
        night: "闇夜",
        moon: "月夜",
        wa: "和の国"
      }), m("h6", "幅の広さ"), Btns.radio({}, Url.prop.width, {
        full: "最大",
        wide: "広域",
        std: "狭域"
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
  /*
  map_reduce
    menu.tree
    menu.tree
      icon th-large:
        drill order:
          radio all:
          radio human:
          radio wolf:
          radio enemy:
          radio pixi:
          radio other:
        drill chr_set:
          radio Mem.map_faces.reduce
      icon cog:
  
  
  character_tag
    menu.tree
    menu.tree
      icon th-large:
        drill ***:
      icon cog:
  
  in_story
    menu.tree
      node full:
      node normal:
    menu.tree
      icon resie-full:
      icon resize-normal:
      icon search:
      icon resie-full:
      icon resize-normal:
      icon search:
        drill rating:
        drill game:
        drill folder:
        drill say_limit:
        drill update_at:
        drill update_interval:
        drill event_type:
        drill role_type:
        drill player_length:
      icon cog:
  
  in_vil
    menu.tree
      node home:
      node talk:
      node memo:
      node history:
      node pins:
    menu.tree
      icon pin:
      icon home:
      icon mail:
      icon chat-alt:
      icon clock:
      icon search:
      icon pencil:
      icon cog:
  */
}).call(this);

(function() {
  win.mount("#character_tag", function(dom) {
    var tag_dom, vdom;
    vdom = function(name, val) {
      return [m("span", name), m("span.emboss.pull-right", val)];
    };
    tag_dom = function(type) {
      return vdom(Mem.conf.tag[type].name, Mem.faces.reduce.tag[type].count);
    };
    return {
      controller: function() {},
      view: function() {
        var attr, chr_job, chrs, job_name, o, set, tag;
        tag = Url.prop.tag;
        chrs = Mem.faces.tag(tag()).list;
        set = Mem.conf.tag[tag()];
        return [
          menu.icon.icon("th-large", {
            view: function(main_menu) {
              return m(".paragraph", m("h6", "タグを選んでみよう"), Btns.radio({
                "class": "edge"
              }, tag, {
                all: vdom("- 全体 -", Mem.faces.reduce.all.all.count),
                giji: tag_dom("giji"),
                shoji: tag_dom("shoji"),
                travel: tag_dom("travel"),
                stratos: tag_dom("stratos"),
                myth: tag_dom("myth"),
                asia: tag_dom("asia"),
                marchen: tag_dom("marchen"),
                kid: tag_dom("kid"),
                young: tag_dom("young"),
                middle: tag_dom("middle"),
                elder: tag_dom("elder"),
                river: tag_dom("river"),
                road: tag_dom("road"),
                immoral: tag_dom("immoral"),
                guild: tag_dom("guild"),
                elegant: tag_dom("elegant"),
                ecclesia: tag_dom("ecclesia"),
                medical: tag_dom("medical"),
                market: tag_dom("market"),
                apartment: tag_dom("apartment"),
                servant: tag_dom("servant"),
                farm: tag_dom("farm"),
                government: tag_dom("government"),
                god: tag_dom("god")
              }));
            }
          }), m(".chrlist", m("div", m("h6", set.long), m(".GSAY.badge", set.name), "の" + chrs.length + "人を表示しています。"), m("hr.black"), (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = chrs.length; i < len; i++) {
              o = chrs[i];
              chr_job = Mem.chr_jobs.find(set.chr_set_ids.last + "_" + o._id) || Mem.chr_jobs.find("all_" + o._id);
              job_name = chr_job.job;
              attr = GUI.attrs({}, function() {
                return this.click(function() {});
              });
              results.push(m(".chrbox", {
                key: o._id
              }, GUI.portrate(o._id, attr), m(".chrblank.line2", m("div", job_name), m("div", o.name))));
            }
            return results;
          })(), m("hr.black"))
        ];
      }
    };
  });

}).call(this);

(function() {
  var head_menu;

  head_menu = function(state) {
    var max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec, top_line_attr;
    max_vage = Mem.conf.folder.PERJURY.config.cfg.MAX_VILLAGES;
    max_crazy = Mem.conf.folder.CRAZY.config.cfg.MAX_VILLAGES;
    max_xebec = Mem.conf.folder.XEBEC.config.cfg.MAX_VILLAGES;
    max_ciel = Mem.conf.folder.CIEL.config.cfg.MAX_VILLAGES;
    max_cafe = Mem.conf.folder.CABALA.config.cfg.MAX_VILLAGES;
    max_pan = Mem.conf.folder.PAN.config.cfg.MAX_VILLAGES;
    max_morphe = Mem.conf.folder.MORPHE.config.cfg.MAX_VILLAGES;
    max_all = max_vage + max_crazy + max_xebec + max_ciel;
    max_all += max_cafe + max_morphe;
    top_line_attr = {
      style: "height: 4em; vertical-align: bottom;"
    };
    return m("table.board#headline", m("thead", "progress" === state() ? m("tr", top_line_attr, m("th.choice[colspan=2]", {
      key: "p"
    }, m("strong", "進行中の村")), m("th[colspan=2]", {
      key: "f"
    }, m("a", Btn.set({}, state, "finish"), "終了した村を見る"))) : void 0, "finish" === state() ? m("tr", top_line_attr, m("th[colspan=2]", {
      key: "p"
    }, m("a", Btn.set({}, state, "progress"), "進行中の村を見る")), m("th.choice[colspan=2]", {
      key: "f"
    }, m("strong", "終了した村"))) : void 0, m("tr", m("th.choice", "ロビー"), m("th.choice", "夢の形"), m("th.choice", "陰謀"), m("th.choice", "ＲＰ"))), "progress" === state() ? m("tbody", m("tr", m("td", m("a", {
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
    }, "ciel")))) : void 0);
  };

  win.mount("#head_navi", function(dom) {
    var state;
    state = m.prop("finish");
    return {
      controller: function() {},
      view: function() {
        return m(".paragraph", m(".left_image"), m(".right_image"), head_menu(state));
      }
    };
  });

  win.mount("#headline", function(dom) {
    var state;
    state = m.prop("finish");
    return {
      controller: function() {},
      view: function() {
        return m(".choice", head_menu(state));
      }
    };
  });

  win.mount("#to_root", function(dom) {
    return {
      controller: function() {
        var hour;
        hour = 1000 * 60 * 60;
        Timer.tick((function(_this) {
          return function(now) {
            var zone;
            zone = now + 3 * hour;
            _this.day_or_night = Math.floor(zone / (12 * hour)) % 2;
            m.redraw();
            return 12 * hour - zone % (12 * hour);
          };
        })(this));
        win.on.resize.push((function(_this) {
          return function() {
            var width;
            width = doc.width.content();
            _this.h1_width = 770;
            if (width <= 580) {
              _this.h1_width = 580;
            }
            if (width <= 458) {
              return _this.h1_width = 458;
            }
          };
        })(this));
      },
      view: function(c) {
        var theme;
        theme = Mem.conf.theme[Url.prop.theme()];
        return m('a[href="//giji.check.jp/"]', m("img", {
          src: GUI.img_head + ("/banner/title" + c.h1_width) + theme.width[c.h1_width][c.day_or_night]
        }));
      }
    };
  });

}).call(this);

(function() {
  win.mount("title", function(dom) {
    return {
      controller: function() {},
      view: function() {
        var event, event_id, ref, story, story_id;
        ref = Url.prop, story_id = ref.story_id, event_id = ref.event_id;
        story = Mem.storys.find(story_id());
        event = Mem.events.find(event_id());
        if ((story != null) && (event != null)) {
          return story.name + " " + event.name;
        } else {
          return "人狼議事";
        }
      }
    };
  });

}).call(this);

(function(){
  win.scroll.prop = Url.prop.scroll;
  win.scroll.tick = function(center, sec){
    if (center.subid === "S") {
      doc.seeing_add(center._id, sec);
      if (25 === doc.seeing[center._id]) {
        return m.redraw();
      }
    }
  };
  win.on.resize.push(function(){
    var ref$;
    if (win.short < 380) {
      head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5";
      return (ref$ = document.querySelector("meta[name=viewport]")) != null ? ref$.content = head.browser.viewport : void 8;
    }
  });
}).call(this);

(function() {
  win.deploy();

  m.endComputation();

}).call(this);

(function(){
  var sow_auth;
  sow_auth = {
    controller: function(arg$){
      var uid, pwd, loading, error, refresh, deploy, text, this$ = this;
      uid = arg$.uid, pwd = arg$.pwd;
      this.url = gon.url;
      loading = function(b){
        return this$.uid.disabled = this$.pwd.disabled = b;
      };
      error = function(message){
        this$.errors = [message];
        return loading(false);
      };
      refresh = function(gon){
        var e;
        if (e = gon.errors) {
          this$.errors = e.login || e[""];
        } else {}
        deploy(gon);
        loading(false);
      };
      deploy = function(gon){
        var o;
        o = gon.sow_auth;
        if (!o) {
          return;
        }
        doc.user.is_login = o.is_login > 0;
        doc.user.is_admin = o.is_admin > 0;
        validate.sow_auth(this$);
        Url.popstate();
      };
      deploy(gon);
      this.logout = function(){
        loading(true);
        return Submit.get(this$.url, {
          cmd: "logout"
        }).then(refresh, error);
      };
      this.login = function(){
        if (validate.sow_auth(this$)) {
          loading(true);
          return Submit.iframe(this$.url, {
            cmd: "login",
            uid: uid(),
            pwd: pwd()
          }).then(refresh, error);
        }
      };
      text = function(prop){
        var set;
        set = m.withAttr("value", function(val){
          if (this$.is_loading) {
            return;
          }
          prop(val);
          return validate.sow_auth(this$);
        });
        return {
          disabled: false,
          onblur: set,
          onchange: set,
          onkeyup: set,
          value: prop()
        };
      };
      this.form = {
        onsubmit: function(){
          if (this$.is_loading) {
            return false;
          }
          if (doc.user.is_login) {
            this$.logout();
          } else {
            this$.login();
          }
          return false;
        }
      };
      this.uid = text(uid);
      this.pwd = text(pwd);
    },
    view: function(c, arg$){
      var uid, pwd, submit, msg;
      uid = arg$.uid, pwd = arg$.pwd;
      submit = function(label){
        return {
          className: "btn edge",
          value: label,
          type: "submit"
        };
      };
      return m("form", c.form, doc.user.is_login
        ? m(".paragraph", !c.is_loading ? m("input", submit(uid() + " がログアウト")) : void 8)
        : m(".paragraph", m("label", m("span.mark", "user id : "), m("input", c.uid)), m("label", m("span.mark", "password : "), m("input[type=password]", c.pwd)), !c.is_loading ? m("input", submit("ログイン")) : void 8), m(".paragraph", (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = c.errors).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          results$.push(m(".WSAY", m(".emboss", msg)));
        }
        return results$;
      }()), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = c.infos).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          results$.push(m(".TSAY", m(".emboss", msg)));
        }
        return results$;
      }())));
    }
  };
  doc.component.sow_auth = sow_auth;
  win.mount('#sow_auth', function(){
    return {
      controller: function(){},
      view: function(){
        return m.component(doc.component.sow_auth, Url.prop);
      }
    };
  });
}).call(this);

(function() {
  var error_and_info, field, vmake_form;

  field = Mem.options.hash;

  error_and_info = function(o) {
    var msg;
    return m("p.mes_date", (function() {
      var i, len, ref, results;
      ref = o.errors;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        msg = ref[i];
        results.push(m(".WSAY", m(".emboss", msg)));
      }
      return results;
    })(), (function() {
      var i, len, ref, results;
      ref = o.infos;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        msg = ref[i];
        results.push(m(".TSAY", m(".emboss", msg)));
      }
      return results;
    })());
  };

  vmake_form = {
    controller: function(v) {
      var _id, i, init, len, ref, ref1, vindex;
      v.form = {
        extra: [],
        role: [],
        gift: [],
        trap: [],
        attr: {
          onreset: function(e) {
            console.log(e);
            return false;
          },
          onsubmit: function(e) {
            if (validate.cards(v)) {
              v.submit(v.form);
            }
            return false;
          }
        }
      };
      ref = Mem.options.list;
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], _id = ref1._id, init = ref1.init;
        v.form[_id] = init || null;
      }
      vindex = 0;
      v.form.vil_comment = ["（村のルールは、自由に編集できるよ！）", " ", "■村のルール"].concat(RULE.village.list.map(function(o) {
        return (++vindex) + "." + o.head;
      })).join("\r\n");
      v.reset = function() {
        var cards, cards_set, j, len1, o, player_count, ref2, results, role_table;
        player_count = v.form.player_count;
        role_table = Mem.role_tables.find(v.form.role_table);
        if (!role_table) {
          return null;
        }
        cards_set = role_table.cards;
        if (!cards_set) {
          return null;
        }
        v.form.role = [];
        v.form.gift = [];
        cards = cards_set[player_count];
        if (!cards) {
          return null;
        }
        ref2 = Mem.roles.finds(cards);
        results = [];
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          o = ref2[j];
          results.push(v.form[o.cmd].push(o._id));
        }
        return results;
      };
      v.player_summary = function(form) {
        var extra, human, minus, player, ref2, vdoms;
        vdoms = [];
        if (validate.cards(v)) {
          ref2 = v.size, player = ref2.player, extra = ref2.extra, human = ref2.human, minus = ref2.minus;
          vdoms.push("最大 ");
          vdoms.push(m("span.mark.SSAY", player + "人"));
          if (extra) {
            vdoms.push(m("span.mark.VSAY", "+" + extra + "人"));
          }
          vdoms.push(" が参加できます。");
          if (human) {
            vdoms.push(m("span", m("span.mark.TSAY", human + "人"), minus ? "以上" : void 0, "は村人です。"));
          }
        }
        return m("div", vdoms, error_and_info(v));
      };
      v.npc_says = function(chr_npc) {
        var anchor, chr_job, chr_set, face, face_id, mestype, name, say_0, say_1, updated_at, user_id;
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
        updated_at = _.now();
        mestype = "SAY";
        user_id = "master";
        anchor = "0";
        face = Mem.faces.find(face_id);
        name = chr_job.job + " " + face.name;
        return [
          m("h3", "プロローグ"), doc.message.talk({
            face_id: face_id,
            user_id: user_id,
            anchor: anchor,
            name: name,
            mestype: mestype,
            updated_at: updated_at,
            log: say_0.deco_text_lf
          }), m("h3", "１日目"), doc.message.talk({
            face_id: face_id,
            user_id: user_id,
            anchor: anchor,
            name: name,
            mestype: mestype,
            updated_at: updated_at,
            log: say_1.deco_text_lf
          }), m("h3", "参加キャラクター")
        ];
      };
      return v;
    },
    view: function(v) {
      var add_btn, add_btns, btn, chk, jobs, nindex, npc, o, sets;
      btn = function(tap) {
        var attr;
        return attr = {
          onmouseup: tap,
          ontouchend: tap
        };
      };
      add_btn = function(o) {
        var tap;
        tap = function() {
          return v.form[o.cmd].push(o._id);
        };
        return m("a.WIN_" + o.win + ".btn.edge", btn(tap), o.name);
      };
      sets = function(method, list) {
        var tap;
        tap = function() {
          return list.pop();
        };
        return m("div", m("a.btn.edge.icon-cancel-alt", btn(tap), ""), GUI.names[method](list, function(size, arg) {
          var name, win;
          name = arg.name, win = arg.win;
          if (size > 1) {
            return m("span.WIN_" + win + ".emboss", name + "x" + size);
          } else {
            return m("span.WIN_" + win + ".emboss", "" + name);
          }
        }));
      };
      add_btns = function(query) {
        var i, len, o, ref, results;
        ref = query.list;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          results.push(add_btn(o));
        }
        return results;
      };
      v.reset();
      nindex = 0;
      if (npc = Mem.chr_npcs.find(v.form.chr_npc)) {
        jobs = npc.chr_set.chr_jobs.list;
      } else {
        jobs = [];
      }
      return m("form", v.form.attr, m(".vmake", {
        key: v._id
      }, m(".INFOSP.info", m("p.text", "村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。", m("br"), "村作成から", m("span.mark", Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP + "日間"), "が、募集の期限となります。期限内に村が開始しなかった場合、廃村となります。")), m(".MAKER.plane", m("fieldset.msg", m("legend.emboss", "村の名前、説明、ルール"), field.vil_name.view(v.form, function(input) {
        return input();
      }), field.vil_comment.view(v.form, function(input) {
        return input();
      }), m("p", "■国のルール"), RULE.nation.list.map(function(o) {
        return m("p", (++nindex) + "." + o.head);
      }), m(".emboss", "以上の項目が、人狼議事の", m('a', {
        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"
      }, "ルール"), "と", m('a', {
        href: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"
      }, "心構え"), "なんだ。編集していい部分は、自由に変更してかまわない。"))), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "設定"), field.trs_type.view(v.form, function(select, label) {
        return m("p", select(function(o) {
          return o.CAPTION;
        }), label(function(o) {
          return m("div", m.trust(o.HELP));
        }));
      }), field.rating.view(v.form, function(select, label) {
        return m("p", select(function(o) {
          return o.caption;
        }), label(function(o) {
          return m("img", {
            src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_" + o._id + ".png"
          });
        }));
      }), field.say_count.view(v.form, function(select, label) {
        return m("p", select(function(o) {
          return o.CAPTION;
        }), label(function(o) {
          return m.trust(o.HELP);
        }));
      }), field.time.view(v.form, function(input) {
        return input();
      }), field.interval.view(v.form, function(select) {
        return m("p", select(function(o) {
          return o.caption;
        }));
      }), field.entry_password.view(v.form, function(input, label) {
        return m("p", input(), label());
      }))), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "ゲームルール"), field.game_rule.view(v.form, function(select, label) {
        return [
          select(function(o) {
            return o.CAPTION;
          }), label(function(o) {
            return m("ul", m.trust(o.HELP));
          })
        ];
      }), (function() {
        var i, len, ref, results;
        ref = Mem.options.checkbox().list;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          chk = ref[i];
          results.push(chk.view(v.form, function(input, label) {
            return m("p", input(), label());
          }));
        }
        return results;
      })())), m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成"), field.mob_type.view(v.form, function(select, label) {
        return m("p", select(function(o) {
          return o.name;
        }), label(function(o) {
          return m.trust(o.HELP);
        }));
      }), field.role_table.view(v.form, function(select, label) {
        return m("p", select(function(o) {
          return o.name;
        }));
      }), v.player_summary(v.form))), (function() {
        switch (v.form.role_table) {
          case void 0:
            return m(".WSAY.plane", m("fieldset.msg", m("legend.emboss", "編成詳細"), m("p", "まずは、役職配分を選択してください。")));
          case "custom":
            return m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成自由設定"), field.player_count.view(v.form, function(input, label) {
              return m("p", input(), label());
            }), v.form.start_auto ? field.player_count_start.view(v.form, function(input, label) {
              return m("p", input(), label());
            }) : void 0, sets("config", v.form.extra), sets("config", v.form.role), sets("config", v.form.gift), v.form.seq_event ? sets("order", v.form.trap) : sets("config", v.form.trap), m("h6", "村側"), add_btns(Mem.roles.is("human")), m("h6", "敵方の人間"), add_btns(Mem.roles.is("evil")), m("h6", "人狼"), add_btns(Mem.roles.is("wolf")), m("h6", "妖精"), add_btns(Mem.roles.is("pixi")), m("h6", "その他"), add_btns(Mem.roles.is("other")), add_btn({
              _id: "mob",
              cmd: "extra",
              win: "NONE",
              name: "見物人"
            }), m("h6", "恩恵"), add_btns(Mem.roles.is("gift")), m("h6", "事件"), add_btns(Mem.traps.show())));
          default:
            return m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "編成詳細"), field.player_count.view(v.form, function(input, label) {
              return m("p", input(), label());
            }), v.form.start_auto ? field.player_count_start.view(v.form, function(input, label) {
              return m("p", input(), label());
            }) : void 0, sets("config", v.form.extra), sets("config", v.form.role), sets("config", v.form.gift), v.form.seq_event ? sets("order", v.form.trap) : sets("config", v.form.trap), add_btn({
              _id: "mob",
              cmd: "extra",
              win: "NONE",
              name: "見物人"
            })));
        }
      })(), m(".SSAY.plane", m("fieldset.msg", m("legend.emboss", "登場人物"), field.chr_npc.view(v.form, function(input, label) {
        return m("p", input(function(o) {
          return o.caption;
        }), label());
      }))), v.npc_says(npc), m(".minilist", m("hr.black"), (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = jobs.length; i < len; i++) {
          o = jobs[i];
          results.push(m(".chrbox", {
            key: o.face_id
          }, GUI.portrate(o.face_id), m(".bar.live")));
        }
        return results;
      })(), m("hr.black")), m(".VSAY.plane", m("fieldset.msg", m("legend.emboss", "決定"), m("input", {
        type: "submit",
        value: "村の作成"
      }), error_and_info(v.http)))));
    }
  };

  doc.component.vmake_form = vmake_form;

}).call(this);

(function(){
  var vmake;
  vmake = {
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
  doc.component.vmake = vmake;
}).call(this);

