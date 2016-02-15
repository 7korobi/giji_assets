(function(){
  var change_pin, doc, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  out$.change_pin = change_pin = function(id){
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
    timeline: function(){
      return m.component(doc.component.timeline, '#timeline', {
        size: [2 * doc.width.content(), 150]
      });
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
  Url.define(URL_PROPS);

  Url.binds({});

  Url.routes = {
    pathname: {
      story: new Url("/sow.cgi")
    },
    hash: {
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
      messages: new Url("log=:home~:talk~:memo~:open~:human~:search", {
        unmatch: ((typeof gon !== "undefined" && gon !== null ? gon.events : void 0) != null) && "?"
      }),
      scroll: new Url("scr=:scroll~:talk_at~:memo_at", {
        unmatch: "?",
        change: function(params) {
          var folder, logid, ref, ref1, scroll, turn, updated_at, vid;
          scroll = win.scroll.prop();
          ref = scroll.split("-"), folder = ref[0], vid = ref[1], turn = ref[2], logid = ref[3];
          if (logid != null) {
            updated_at = ((ref1 = Mem.messages.find(scroll)) != null ? ref1.updated_at : void 0) || 0;
            Url.prop.updated_at(updated_at);
            Url.prop.folder(folder);
            Url.prop.turn(turn);
            Url.prop.story_id(folder + "-" + vid);
            Url.prop.event_id(folder + "-" + vid + "-" + turn);
            Url.prop.message_id(folder + "-" + vid + "-" + turn + "-" + logid);
          }
        }
      })
    }
  };

  Url.cookies = {
    uid: Url.cookie("uid=:uid;", "readonly"),
    pwd: Url.cookie("pwd=:pwd;", "readonly"),
    css: Url.cookie("css=:theme~:width~:layout~:font", {
      time: 12,
      path: "/"
    })
  };

  Url.cookies.css.options.change = function(params) {
    var key, list;
    list = (function() {
      var i, len, ref, results;
      ref = ["theme", "width", "layout", "font", "item", "color"];
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
  };

}).call(this);

(function() {
  var deploy_samples, i, len, name, ref,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Mem.rule.item.set([
    {
      "_id": "howto-head-h2-1",
      "log": "遊び方"
    }, {
      "_id": "howto-paragraph--2",
      "log": "<ul>\n<li><a href=\"#regist\">ユーザー登録とログイン</a>\n<li><a href=\"#entry\">村への参加</a>\n<li><a href=\"#exit\">村から出る</a>\n<li><a href=\"#muster\">点呼をとる</a>\n<li><a href=\"#rolerule\">能力者</a>\n<ul>\n<li><b><a href=\"sow.cgi?cmd=roleaspect&$docid\">能力、恩恵ごとの、細かい特徴</a></b>\n<li><b><a href=\"sow.cgi?cmd=rolelist&$docid\">役職とインターフェース</a></b>\n</ul>\n<li><a href=\"#role\">村側の能力者（役職）</a>\n<li><a href=\"#rolewolf\">人狼側の能力者（役職）</a>\n<li><a href=\"#rolepixi\">妖精の能力者（役職）</a>\n<li><a href=\"#roleother\">その他の能力者（役職）</a>\n<li><a href=\"#rolegift\">能力者以外の要素（恩恵）</a>\n<li><a href=\"#rolerule\">能力とルールの細かいところ</a>\n<li><a href=\"#event\">村を翻弄する運命（事件）</a>\n<li><a href=\"#start\">村が始まったら</a>\n<li><a href=\"#die\">死亡</a>\n<li><a href=\"#suddendeath\">突然死</a>\n<li><a href=\"#ending\">勝敗の決定</a>\n</ul>"
    }, {
      "_id": "howto-head-h3-3",
      "log": "ユーザー登録とログイン"
    }, {
      "_id": "howto-paragraph--4",
      "log": "人狼議事で遊ぶためには、まずユーザー登録が必要です。ユーザー登録をするには、右上にある「ログイン」ボタンで行います。\n<br>\n（「ログイン」ボタンはユーザー登録ボタンを兼ねています）。\n<br>\n<br>\n好きなユーザーIDと悪用を防ぐためのパスワードを決めたら、「user id」欄にユーザID、「password:」欄にパスワードを入力して「ログイン」ボタンを押してください。\n<br>\nそのユーザーIDを誰かが既に使用していなければ、user id:xxxxx [ログアウト] と表示されます。この表示が出れば登録成功です。\n<br>\n<br>\nゲームをするには、ログインしなければなりません。既にログインしているなら「ログアウト」ボタンが表示されていますが、表示されていないならログインしましょう。\n<br>\nログインのやり方には、ユーザー登録のやり方と同じです。右上の入力欄にユーザIDとパスワードを入力して「ログイン」ボタンを押してください。"
    }, {
      "_id": "howto-head-h3-5",
      "log": "村への参加"
    }, {
      "_id": "howto-paragraph--6",
      "log": "次に、参加したい村をトップページの「村の一覧」から選びます。村の一覧の「進行」という欄を見て下さい。\n<br>\nここが「募集中」なら、あなたはその村へ参加する事ができます。\n<br>\n<br>\n参加したい村を決めたら、村の名前をクリックしてください。その村のプロローグが表示され、一番下に参加者入力欄が表示されます。\n<br>\n「希望する配役」は、あなたの好きな配役（キャラ）を選ぶ欄です。プレイ中に発言をすると、その発言の発言者名がここで選んだ配役の名前となります。\n<br>\n<br>\n人狼議事は村の勝敗が決するまでの間、誰が参加しているのか誰にもわからないようになっています。\n<br>\n「配役」とは、あなたが誰なのかをわからないようにするための変名のようなものです。雰囲気を盛り上げるため、ある程度配役になりきった方が楽しめるでしょう。\n<br>\n「希望する能力」は、あなたが村人になりたいか人狼になりたいかの希望を出す欄です。希望が必ず通るとは限りません。\n<br>\n希望者が多かった場合、抽選で外れて希望していない能力者になってしまう事があります。\n<br>\n人狼議事には、「村人」「人狼」以外にも様々な「能力者」がいます。彼らはそれぞれ特有の特殊能力を持っています。\n<br>\n<br>\nこのとき、村によっては「見物する」選択肢が含まれていることがあります。見物人は勝敗にかかわらず、ただ村の行く末を見届ける立場です。\n<br>\n村ごとに見物人の立場が設定してあり、会話できる範囲が異なります。\n<br>"
    }, {
      "_id": "howto-helps-help-7",
      "query": "roles is mob"
    }, {
      "_id": "howto-paragraph--8",
      "log": "「希望する配役」「希望する能力」「参加する時のセリフ」を選択・入力し終わったら、「この村に参加」ボタンを押してください。\nあなたが希望した配役の名前で「参加する時のセリフ」が村の画面に表示されます。\n<br>\nこれであなたは、この村の参加者となりました。ゲームが開始するまで、他の村人たちと雑談でもしましょう。\n<br>\n<br>\n参加人数が定員まで達してしまうと、たとえ見物人の席が空いていても開始待ちとなります。見物人の募集は締め切られませんが、今まさに開始するかもしれません。"
    }, {
      "_id": "howto-head-h3-9",
      "log": "村から出る"
    }, {
      "_id": "howto-paragraph--10",
      "log": "一旦参加しても、プロローグ中であれば村から出ることが可能です。\n<br>\n発言フォームの下にある「村を出る」を選びましょう。\n<br>\nあなたの操作以外に、プロローグで長い間発言がないとき、あなたが村に居るべきでないと判断されたとき、あなたは村から出ています。\n<br>\n村建て人は、村の中にいてはまずい、と判断した人を退去させる機能を持っています。\n「村の情報」欄の理解が浅い、参加姿勢に不安があるなどの判断をされた場合、立ち退きとなりますので、しっかりと村の情報を読んで参加し、全員で楽しめるプレイを心がけましょう。\n<br>"
    }, {
      "_id": "howto-head-h3-11",
      "log": "点呼をとる"
    }, {
      "_id": "howto-paragraph--12",
      "log": "そろそろ開始、というときに、集まりが悪いといざ始まったときにも勢いよくは会話できませんね。\nそれはつまらない、と考える村建て人のために、点呼をとる機能があります。\n<br>\n点呼を開始すると、いちど全員の発言した回数をゼロにするので、その瞬間以降で発言のない人がはっきりわかります。\n<br>\nその次の更新時まで待機すれば自動的に無発言扱いで村を出ますし、手動更新のつもりでいるなら、更新の１０分前あたりをめどに、そこまで無発言のままの人は参加できない事情ができたと見なします。などとアナウンスしておくと、参加に不自由しそうな人をはっきり見分けることができます。\nそれが決めておいた方針なら、退去いただくのもいいでしょう\n<br>"
    }, {
      "_id": "howto-head-h3-13",
      "log": "能力"
    }, {
      "_id": "howto-head-h3-21",
      "log": "村側の能力者"
    }, {
      "_id": "howto-paragraph--22",
      "log": "力を合わせて、悪者達を撃退しましょう。彼らは特別なことがない限り、村人陣営として活躍します。"
    }, {
      "_id": "howto-paragraph--23",
      "object": "winners find WIN_HUMAN HELP"
    }, {
      "_id": "howto-table-WIN_HUMAN-24",
      "query": "roles is human",
      "heads": ["役職", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-table-WIN_EVIL-39",
      "query": "roles is evil",
      "heads": ["役職", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-41",
      "log": "人狼側の能力者"
    }, {
      "_id": "howto-paragraph--42",
      "log": "村には善良な村人達の他に、彼らになりすまして村人を襲う人狼や、人間でありながら人狼に協力する裏切り者達もいます。夜はあなたたちの時間です。"
    }, {
      "_id": "howto-paragraph--43",
      "object": "winners find WIN_WOLF HELP"
    }, {
      "_id": "howto-table-WIN_WOLF-49",
      "query": "roles is wolf",
      "heads": ["役職", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-51",
      "log": "第三勢力の能力者"
    }, {
      "_id": "howto-paragraph--52",
      "log": "村には村側にも人狼側にも属さない者達がいます。村人側か人狼側が勝利する条件を満たした時、彼らは横から勝利を浚っていきます。"
    }, {
      "_id": "howto-paragraph--53",
      "object": "winners find WIN_PIXI HELP"
    }, {
      "_id": "howto-table-WIN_PIXI-59",
      "query": "roles is pixi",
      "heads": ["役職", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-61",
      "log": "それ以外の能力者"
    }, {
      "_id": "howto-paragraph--62",
      "log": "上記にあてはまらない、特殊な能力の持ち主です。どうしたら勝利するか、どのような性質の役職か、まちまちなのでよく確認しましょう。"
    }, {
      "_id": "howto-table-WIN_NONE-69",
      "query": "roles is other",
      "heads": ["役職", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-71",
      "log": "役職以外の能力"
    }, {
      "_id": "howto-paragraph--72",
      "log": "能力とは独立して、特別なルールが加わることもあります。どうしたら勝利するか、どのような性質の役職か、まちまちなのでよく確認しましょう。"
    }, {
      "_id": "howto-table-gift-79",
      "query": "roles is gift",
      "heads": ["恩恵", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-81",
      "log": "村が始まったら"
    }, {
      "_id": "howto-paragraph--82",
      "log": "村が始まると参加者の希望に応じて能力者が決定され、そしてどんな能力者が何人いるのかという内訳が表示されます。\n<br>\nまずはあなたがどんな能力者になっているのか確認しましょう。希望が通って望み通りの能力者になっているかもしれませんし、思いがけない能力者になってしまっているかもしれません。\n<br>\n<br>\nあなたの能力を確認したら、さあいよいよゲームの始まりです。\n<br>\nあなたが村人側であれば、人狼を探し始めましょう。人狼は人間になりすましています。しかし、完全に人間になりすますのは難しいものです。\nおかしいと感じたところがあれば、その人の発言をよく見直してみましょう。\n<br>\nあなたが人狼であれば、きっと仲間がいるはずです。人狼だけがこっそりと会話を交わせる「囁き」と呼ばれる特殊な発言欄があるはずです。\nまずはそこで挨拶をしてみましょう。そして、表では人間の振りをして、「私は人狼を探しているのだ」というようなポーズを取り、周りの人間達を信用させましょう。\n<br>\n最初はどう発言すればいいのかわからないかもしれません。大丈夫、きっと誰かが「議題」を出してくれます。最初はこの議題に答えていけばいいのです。\n議題に答えるうち、誰かがあなたの回答に質問をぶつけて来るでしょう。今度はその質問に答えてみましょう。そうやっている内に、あなたもだんだん慣れてくるはず。"
    }, {
      "_id": "howto-head-h3-83",
      "log": "事件"
    }, {
      "_id": "howto-paragraph--84",
      "log": "特殊な事情が発生する日があります。その日、村は提示されたルールに従うでしょう。"
    }, {
      "_id": "howto-table-INFONOM-79",
      "query": "traps",
      "heads": ["事件", "解説"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-head-h3-91",
      "log": "死亡"
    }, {
      "_id": "howto-paragraph--92",
      "log": "ゲームを進めていくうち、処刑されたり人狼に襲撃されたりして、あなたが命を落とす事になるかもしれません。\n<br>\n死亡すると、あなたは死者の世界へ向かいます。死者の世界では死者同士が会話を交わす事ができます。ただし、死者同士の会話は生存者には聞こえません。\n死者たるあなたは生存者と会話を交わす事ができません。\n<br>\n「幽界トーク」の設定がされている村では、死亡していても生存している人狼、妖精と会話を交わすことが可能です。\n<br>\n<br>\n一つ注意しておいて下さい。あなたが一人きりの孤独な妖精などではない限り、あなたには仲間がいます。\n<br>\nこのゲームは他のゲームと違い、あなたが死亡してもすぐあなたの敗北となるわけではありません。あなたの仲間達が勝利すれば、あなたもこのゲームに勝利する事になります。\nこのゲームの勝敗に、あなた個人の生死は直接関係しません。\n<br>\n状況によっては、あなたが死を受け入れる事で、あなた自身の勝ち目を高める事もあるでしょう。\n<br>\n<br>\nしかし、死亡してしまったあなたには、もう直接勝敗に関わる事はできません。\nですので、他の死者たちとともにまだ生きている仲間たちを応援したり、生存者のおかしな意見にツッコミを入れたり、あるいは単に雑談したりして、死者の世界を楽しみましょう。"
    }, {
      "_id": "howto-head-h3-93",
      "log": "突然死"
    }, {
      "_id": "howto-paragraph--94",
      "log": "発言をしないまま更新を迎えると、ゲーム放棄とみなされて自動的に「突然死」し、ゲームから除外されます。\n<br>\nこの動作はときに乱暴すぎ、村の方針と馴染まないこともあるでしょう。\n<br>\n<br>\n突然死を防ぐには、更新までに通常発言を最低一回してください。アクションや独り言、人狼のささやきなどで発言しても突然死を防げません。\n<br>\nまた、通常発言を行っても確定する前に削除してしまった場合は「通常発言をした」とはみなされません。\n<br>\n<br>\n村に未発言者がいる場合、発言入力欄のすぐ上に「本日まだ発言していない者は～」というシステムメッセージが表示されます。\nここに自分の名前が表示されていなければ、あなたは更新を迎えても突然死しません。"
    }, {
      "_id": "howto-head-h3-95",
      "log": "勝敗の決定"
    }, {
      "_id": "howto-paragraph--96",
      "log": "村人側が人狼を全滅させるか、人間の人数が人狼の人数と同じまたはそれ以下にまで減るか、そのどちらかの条件を満たすと勝負が終わります。\n人間に数える役職、人狼に数える役職については<a class=\"btn edge\" href=\"#rolerule\">こちらを見ましょう</a>。\n<br>\n<br>\n勝負が終わると、生き残りの人数や、特定の役が生きているか、どのように死んだのかによって、勝敗が決定します。\n結果によって勝利宣言がなされ、全員のIDと割り当てられた能力が公開されます。\nまた、独り言や囁きなど、勝負の最中には他人に見えないようになっていた発言も公開されます。"
    }, {
      "_id": "howto-table--97",
      "query": "winners shows",
      "heads": ["勝利", "勝利条件"],
      "cols": ["name", "HELP"]
    }, {
      "_id": "howto-paragraph--101",
      "log": "ここからはエピローグの時間です。明かされた全ての発言などを話の種にして、みんなで色々笑ったり嘆いたりしましょう。\n楽しくて別れ難いなら、村建て人さんは更新を延長してもいいでしょう。お疲れ様でした。"
    }, {
      "_id": "oldlog-head-h3-10",
      "log": "終了済みの村の一覧"
    }, {
      "_id": "oldlog-head-h3-20",
      "log": "廃村の一覧"
    }, {
      "_id": "rolelist-head-h2-1",
      "log": "役職を選んでみよう。"
    }, {
      "_id": "rolelist-form-SAY-2",
      "mob": "visiter",
      "enemy": "evil",
      "turn": "prologue",
      "chr_job_id": "all_c118",
      "win": "HUMAN",
      "live": "live",
      "role": [],
      "rolestate": 1903,
      "sheep": "pixi",
      "love": "hate"
    }, {
      "_id": "rolelist-form-SAY-3",
      "mob": "visiter",
      "enemy": "evil",
      "turn": "epilogue",
      "chr_job_id": "all_c117",
      "win": "HUMAN",
      "live": "live",
      "role": [],
      "rolestate": 1903,
      "sheep": "pixi",
      "love": "hate"
    }, {
      "_id": "rolelist-form-SAY-4",
      "mob": "visiter",
      "enemy": "evil",
      "turn": "epilogue",
      "chr_job_id": "all_c117",
      "win": "HUMAN",
      "live": "live",
      "role": [],
      "ext": ["master"],
      "rolestate": 1903,
      "sheep": "pixi",
      "love": "hate"
    }, {
      "_id": "rolelist-form-SAY-5",
      "mob": "visiter",
      "enemy": "evil",
      "turn": "main",
      "chr_job_id": "all_c116",
      "win": "HUMAN",
      "live": "live",
      "role": ["hide"],
      "rolestate": 1903,
      "sheep": "pixi",
      "love": "hate"
    }, {
      "_id": "title-head-h6-2",
      "log": "終了した村"
    }, {
      "_id": "title-talk-TSAY-3",
      "face_id": "c76",
      "name": "留守番 ジョージ",
      "updated_at": 1437461000000,
      "log": "この奥だよ。もう<a class=\"btn edge\" href=\"./sow.cgi?cmd=oldlog\">終了した村</a>の記録が眠っている。\n静かに、ひっそりとね。"
    }, {
      "_id": "title-head-h6-4",
      "log": "プレイガイド"
    }, {
      "_id": "title-action-SAY-5",
      "name": "ティモシー",
      "updated_at": 1437461000000,
      "log": "（↓）をそっと畳み、営業を再開した。<br><a href=\"http://crazy-crazy.sakura.ne.jp/giji/\"><img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/banner/guide.png\"></a>"
    }, {
      "_id": "title-talk-SAY-6",
      "face_id": "c07",
      "name": "雑貨屋 ティモシー",
      "updated_at": 1437461000000,
      "style": null,
      "log": "いらっしゃい。人狼議事のことを知りたいんだね。それなら、人狼議事公式ガイドブックを開いてごらん。\n<br>\nあるいは、ほかのリンク先をお求めかな。\n<br>\n<br>\n<a class=\"btn edge\" href=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/about.html\">ご紹介</a>\n<a class=\"btn edge\" href=\"sow.cgi?cmd=howto\">遊び方</a>\n<a class=\"btn edge\" href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Knowledge)Operation\">操作方法</a>"
    }, {
      "_id": "title-head-h2-11",
      "log": "村を選ぶ"
    }, {
      "_id": "title-talk-SAY-12",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1437461000000,
      "style": "head",
      "log": "<a class=\"btn edge\" href=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~\">ルール</a>\nと\n<a class=\"btn edge\" href=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~\">心構え</a>\nを守って、楽しく、強く遊ぼう。\n<br>\nここでは、みんなに守ってほしいルールや、吟味してほしい心構えを紹介するよ。\n<br>\nでは、リンク先の１ページ目から―――"
    }, {
      "_id": "title-head-h6-13",
      "log": "キャラクター画像一覧"
    }, {
      "_id": "title-paragraph--14",
      "log": "<a class=\"btn edge\" href=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/character_tag.html\">キャラクター画像はこちら</a>\nキャラクターを選ぶ参考に、<a class=\"btn edge\" href=\"http://giji.check.jp/map_reduce/faces\">人気度集計</a>をチェックしてもいいかもね。"
    }, {
      "_id": "title-head-h6-15",
      "log": "この州の設定"
    }, {
      "_id": "title-action-WSAY-18",
      "name": "新聞配達 モリス",
      "updated_at": 1437461000000,
      "log": "人目を避けて去っていった…。"
    }, {
      "_id": "title-paragraph--20",
      "log": "<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/key.png\">\nマークの付いた村は、参加にパスワードが必要です。\n<br>\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_love.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_sexy.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_violence.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_teller.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_drunk.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_gamble.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_crime.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_drug.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_word.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_fireplace.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_appare.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_ukkari.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_child.png\">\n<img src=\"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_biohazard.png\">\nマークは、<a class=\"btn edge\" href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Knowledge)Manual#mark\">こだわり</a>のある村についています。まず村の情報をよく読んで、好みのあう村を選びましょう。"
    }, {
      "_id": "title-head-h3-22",
      "log": "進行中"
    }, {
      "_id": "title-head-h3-31",
      "log": "別のサイトから探す"
    }, {
      "_id": "title-paragraph--32",
      "log": "<dl class=\"XSAY paragraph\">\n\n<dt><a class=\"btn edge\" href=\"http://giji.check.jp/\">人狼議事総合トップ</a>\n<dd>人狼議事全体の過去ログ、募集中の村の一覧など。\n\n<dt><a class=\"btn edge\" href=\"http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD\">企画村予定表</a>（wiki：stinさん管理）\n<dd>これから始まる村の予定が並んでいる。好みの村があるかもね。\n\n<dt><a class=\"btn edge\" href=\"http://melon-cirrus.sakura.ne.jp/wiki/?%A5%B5%A1%BC%A5%D0%A1%BC%A5%EA%A5%B9%A5%C8\">人狼物語Server一覧</a>\n<dd>「人狼物語」シリーズのサイトについてまとめてある。\n\n<dt><a class=\"TSAY btn edge\" href=\"http://melon-cirrus.sakura.ne.jp/wiki/\">人狼物語専用wiki</a>（wiki：melonkoさん管理）\n<dd>「人狼物語」スクリプトを利用して運営されている国のための総合wiki。\n\n</dl>"
    }, {
      "_id": "title-head-h3-33",
      "log": "自分で村をつくる"
    }, {
      "_id": "title-vmake-VSAY-34",
      "log": ""
    }, {
      "_id": "title-paragraph--35",
      "log": "<dl class=\"TSAY paragraph\">\n\n<dt><a class=\"btn edge\" href=\"http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby/sow.cgi?vid=11#mode=talk_all_open&navi=info\">村建て相談所</a>\n<dd>遊びたい村の相談をする場所。迷ったら飛び込むといい。\n\n<dt><a class=\"btn edge\" href=\"http://crazy-crazy.sakura.ne.jp/giji/?(Knowledge)Manual\">村建てマニュアル</a>\n<dd>自分で村を建てる手順や考え方の解説。\n\n<dt><a class=\"btn edge\" href=\"./sow.cgi?cmd=rolematrix\">役職配分一覧</a>\n<dd>役職配分をシステム任せにするときの参考に。\n\n<dt><a class=\"btn edge\" href=\"http://crazy-crazy.sakura.ne.jp/giji/?(List)SayCnt\">発言pt量の一覧</a>\n<dd>村で使う発言ptの設定内容について、詳しい一覧表\n\n<dt><a class=\"btn edge\" href=\"./sow.cgi?cmd=trslist&trsid=all\">ゲーム内での文章を見る</a>\n<dd>\n  ゲーム内で現れる文章の一覧を見ることができます。参考にどうぞ。\n\n</dl>"
    }, {
      "_id": "title-head-h2-91",
      "log": "技術情報"
    }, {
      "_id": "title-head-h6-92",
      "log": "対応ブラウザ"
    }, {
      "_id": "title-talk-SAY-93",
      "face_id": "c67",
      "name": "店番 ソフィア",
      "updated_at": 1437461000000,
      "style": "head",
      "log": "これらのブラウザで動作確認済みです。\n<br>\n<ul class=\"text\">\n<li>Internet Explorer : 9 以降\n<li>Firefox : 20.0 以降\n<li>Opera 12.15 以降\n<li>Safari : 6.0.3 以降\n<li>iOS : 5.1.1 以降\n<li>Chrome : 26.0 以降\n<li>Android : 2.2.1 以降\n</ul>"
    }, {
      "_id": "title-head-h6-94",
      "log": "プログラム"
    }, {
      "_id": "title-talk-SAY-95",
      "face_id": "sf02",
      "name": "哲学者 エスペラント",
      "updated_at": 1437461000000,
      "style": null,
      "log": "<dt>\n<a class=\"btn edge\" href=\"https://github.com/7korobi/giji_rails/commits/show-fix\">総合トップ</a>\n<a class=\"btn edge\" href=\"https://github.com/7korobi/giji_assets/commits/master\">デザイン</a>\n<a class=\"btn edge\" href=\"https://github.com/7korobi/sow-giji/commits/cabala\">ゲーム</a>\n<a class=\"btn edge\" href=\"https://github.com/7korobi/sow-giji/commits/show-fix\">ゲーム（新）</a>\n</dt>\n<dd>人狼議事を構成するプログラムの、更新履歴はこちら。</dd>\n\n<dt>\n<a class=\"btn edge\" href=\"https://github.com/7korobi/sow-giji/releases\">安定版ダウンロード</a>\n</dt>"
    }, {
      "_id": "title-head-h6-96",
      "log": "謝辞"
    }, {
      "_id": "title-talk-SAY-97",
      "face_id": "m05",
      "name": "ななころび",
      "updated_at": 1437461000000,
      "style": "head",
      "log": "作成にあたり、こちらのサイトを参考にさせていただきました。\n<br>\nありがとうございます。\n<ul>\n<li>人狼審問 - Neighbour Wolves - (終了)\n<li>The Village of Headless Knight (一時休止中)\n<li>おとぎの国の人狼（欧州 おしまい）\n<li>人狼の悪夢 (閉鎖)\n<li>汝は人狼なりや？Shadow Gallery Ver 2.0（終了）\n<li>MAD PEOPLE（終了）\n<li><a class=\"btn edge\" href=\"http://ninjinix.com/\">人狼BBS</a>\n<li><a class=\"btn edge\" href=\"http://wolfbbs.jp/\">人狼BBS まとめサイト</a>\n<li><a class=\"btn edge\" href=\"http://mshe.skr.jp/\">人狼BBQ 四国</a>\n<li><a class=\"btn edge\" href=\"http://melon-cirrus.sakura.ne.jp/sow/\">人狼物語 瓜科国</a>\n<li><a class=\"btn edge\" href=\"http://www3.marimo.or.jp/~fgmaster/cabala/sow.cgi\">人狼物語 ぐたるてぃめっと</a>\n<li><a class=\"btn edge\" href=\"http://o8o8.o0o0.jp/wolf/sow.cgi\">人狼物語暗黒編</a>\n<li><a class=\"btn edge\" href=\"http://tkido.com/m_jinro/index.html\">メビウス人狼</a>\n<li><a class=\"btn edge\" href=\"http://trpg.scenecritique.com/Paranoia_O/\">PARANOIA O</a>\n<li><a class=\"btn edge\" href=\"http://scpjapan.wiki.fc2.com\">The SCP Foundation</a>\n</ul>"
    }
  ]);

  if ((typeof gon !== "undefined" && gon !== null ? gon.items : void 0) != null) {
    Mem.rule.item.merge(gon.items);
  }

  deploy_samples = function() {
    var deploy, faceno, forms, i, index, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, role, rolename, subrole, subrolename;
    deploy = function(role, call) {
      var able, chr_job_id, data, i, is_main, j, len, len1, ref, turn, turns;
      chr_job_id = "all_c";
      if (indexOf.call([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], faceno) >= 0) {
        chr_job_id = "all_c0";
      }
      chr_job_id += faceno;
      turns = ["start", "main"];
      is_main = false;
      ref = role.ables;
      for (i = 0, len = ref.length; i < len; i++) {
        able = ref[i];
        if (able !== "vote" && able !== "entrust") {
          is_main || (is_main = Mem.ables.find(able).at.main);
        }
      }
      if (is_main) {
        turns = ["main"];
      }
      for (j = 0, len1 = turns.length; j < len1; j++) {
        turn = turns[j];
        if (data = call(turn)) {
          _.merge(data, {
            _id: "rolelist-form--" + index,
            turn: turn,
            chr_job_id: chr_job_id,
            history: "",
            point: {
              actaddpt: 0,
              saidcount: 0,
              saidpoint: 0
            },
            say: {
              say_act: 10,
              say: 1000,
              gsay: 1000,
              spsay: 1000,
              tsay: 1000,
              wsay: 1000,
              xsay: 1000
            }
          });
          Mem.rule.item.merge([data]);
        }
        index++;
      }
      faceno++;
      if (faceno === 6) {
        faceno++;
      }
      if (faceno === 10) {
        return faceno++;
      }
    };
    faceno = 1;
    index = 10;
    ref = Mem.roles.where({
      group: "MOB"
    }).list;
    for (i = 0, len = ref.length; i < len; i++) {
      role = ref[i];
      deploy(role, function(turn) {
        if ("start" === turn) {
          return;
        }
        return {
          mob: role._id,
          enemy: "evil",
          win: "NONE",
          live: "mob",
          role: ["mob"],
          ext: [role._id],
          rolestate: 0x76f,
          sheep: [],
          love: null
        };
      });
    }
    ref1 = Mem.roles.where({
      group: "LIVE"
    }).list;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      role = ref1[j];
      deploy(role, function(turn) {
        if ("start" === turn) {
          return;
        }
        return {
          mob: "visiter",
          enemy: "evil",
          turn: turn,
          win: "HUMAN",
          live: role._id,
          role: ["villager"],
          rolestate: 0x76f,
          sheep: [],
          love: null
        };
      });
    }
    ref2 = SOW_RECORD.roles;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      rolename = ref2[k];
      if (role = Mem.roles.find(rolename)) {
        deploy(role, function(turn) {
          return {
            mob: "visiter",
            enemy: "evil",
            turn: turn,
            win: role.win || "NONE",
            live: "live",
            role: [role._id],
            rolestate: 0x76f,
            sheep: [],
            love: null
          };
        });
      }
    }
    ref3 = SOW_RECORD.gifts;
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      rolename = ref3[l];
      if (role = Mem.roles.find(rolename)) {
        ref4 = ["lonewolf"];
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          subrolename = ref4[m];
          subrole = Mem.roles.find(subrolename);
          deploy(role, function(turn) {
            return {
              mob: "visiter",
              enemy: "evil",
              turn: "main",
              win: role.win || subrole.win || "NONE",
              live: "live",
              role: [subrolename, rolename],
              rolestate: 0x76f,
              sheep: [],
              love: null
            };
          });
        }
      }
    }
    forms = Mem.items.where({
      template: "form"
    }).list;
    Mem.rule.story.set([
      {
        "_id": "morphe-126",
        "folder": "MORPHE",
        "is_epilogue": true,
        "is_finish": false,
        "options": ["select-role"],
        "timer": {
          "updateddt": 1439222662000,
          "nextupdatedt": 1440430200000,
          "nextchargedt": 1440430200000,
          "nextcommitdt": 1440003600000,
          "scraplimitdt": 1439739000000
        },
        "type": {
          "mob": "grave",
          "say": "vulcan",
          "vote": "anonymity",
          "game": "TABULA"
        },
        "card": {
          "config": [],
          "event": [],
          "role": []
        },
        "vpl": [20],
        "upd": {
          "interval": 1,
          "hour": 0,
          "minute": 30
        }
      }
    ]);
    Mem.rule.event.set([
      {
        "story_id": "morphe-126",
        "turn": 9
      }
    ]);
    Mem.rule.potof.set([
      {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 2,
        "event_id": "morphe-126-9",
        "face_id": "all",
        "history": null,
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 1,
        "point": {
          "actaddpt": 12,
          "saidcount": 0,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["villager"],
        "rolestate": -1,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "villager",
        "sheep": null,
        "sow_auth_id": "master",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439222662000,
          "limitentrydt": 0
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 7,
        "event_id": "morphe-126-9",
        "face_id": "c56",
        "history": null,
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 2,
        "point": {
          "actaddpt": 12,
          "saidcount": 4,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["hunter"],
        "rolestate": 248,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": null,
        "sheep": "pixi",
        "sow_auth_id": "icemaze00",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478917000,
          "limitentrydt": 1440516427000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 7,
        "event_id": "morphe-126-9",
        "face_id": "t10",
        "history": "<b>1日目</b>の夜、<b>ヨーランダ</b>と<b>サミュエル</b>を誘い込んだ。<br><b>2日目</b>の夜、<b>オルギア</b>と<b>ジャック</b>を誘い込んだ。<br><b>3日目</b>の夜、<b>ケイイチ</b>と<b>丁助</b>を誘い込んだ。<br><b>4日目</b>の夜、<b>アオイ</b>と<b>小鈴</b>を誘い込んだ。<br><b>5日目</b>の夜、<b>ゴドウィン</b>と<b>辰次</b>を誘い込んだ。<br>",
        "jobname": null,
        "live": "executed",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 3,
        "point": {
          "actaddpt": 12,
          "saidcount": 5,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["guru"],
        "rolestate": 255,
        "say": {
          "say": 40296,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 40296,
          "say_act": 144
        },
        "select": "loveangel",
        "sheep": null,
        "sow_auth_id": "唐花",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478915000,
          "limitentrydt": 1440516315000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": ["18", "2"],
        "clearance": 1,
        "csid": "all",
        "deathday": 6,
        "event_id": "morphe-126-9",
        "face_id": "t22",
        "history": "<b>1日目</b>の夜、<b>ジャック</b>が<b>あなた</b>と運命を分かち合いました。<br>",
        "jobname": null,
        "live": "suicide",
        "love": "love",
        "name": null,
        "overhear": [],
        "pno": 4,
        "point": {
          "actaddpt": 12,
          "saidcount": 2,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["guard"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "witch",
        "sheep": "pixi",
        "sow_auth_id": "sazanami",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479129000,
          "limitentrydt": 1440516457000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 8,
        "event_id": "morphe-126-9",
        "face_id": "m04",
        "history": "<b>サミュエル</b>は<b>信仰霊能者</b>のようだ。<br><b>ジャック</b>は<b>守護者</b>のようだ。<br><b>トレイル</b>は<b>笛吹き</b>のようだ。<br><b>丁助</b>は<b>仔狼</b>のようだ。<br><b>小鈴</b>は<b>恋愛天使</b>のようだ。<br><b>スージー</b>は<b>魔女</b>のようだ。<br>",
        "jobname": null,
        "live": "executed",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 5,
        "point": {
          "actaddpt": 12,
          "saidcount": 3,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["sorcerer"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "lover",
        "sheep": "pixi",
        "sow_auth_id": "Marionette",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439315676000,
          "limitentrydt": 1440356449000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -1,
        "event_id": "morphe-126-9",
        "face_id": "c23",
        "history": null,
        "jobname": null,
        "live": "live",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 6,
        "point": {
          "actaddpt": 3,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": [null],
        "rolestate": -1,
        "say": {
          "say": 3000,
          "tsay": 1000,
          "spsay": 1500,
          "wsay": 4000,
          "xsay": null,
          "gsay": 3000,
          "say_act": 36
        },
        "select": "bat",
        "sheep": null,
        "sow_auth_id": "suikei",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439316955000,
          "limitentrydt": 1439489755000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -2,
        "event_id": "morphe-126-9",
        "face_id": "c116",
        "history": null,
        "jobname": null,
        "live": "mob",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 7,
        "point": {
          "actaddpt": 3,
          "saidcount": 2,
          "saidpoint": 25
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": [null],
        "rolestate": -1,
        "say": {
          "say": 3000,
          "tsay": 1000,
          "spsay": 1500,
          "wsay": 4000,
          "xsay": null,
          "gsay": 2976,
          "say_act": 35
        },
        "select": null,
        "sheep": null,
        "sow_auth_id": "lobelia",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439325701000,
          "limitentrydt": 1439560997000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -1,
        "event_id": "morphe-126-9",
        "face_id": "t24",
        "history": null,
        "jobname": null,
        "live": "live",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 8,
        "point": {
          "actaddpt": 3,
          "saidcount": 10,
          "saidpoint": 239
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": [null],
        "rolestate": -1,
        "say": {
          "say": 2763,
          "tsay": 1000,
          "spsay": 1500,
          "wsay": 4000,
          "xsay": null,
          "gsay": 3000,
          "say_act": 34
        },
        "select": "lover",
        "sheep": null,
        "sow_auth_id": "ameyoru",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439337503000,
          "limitentrydt": 1439642566000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": ["14"],
        "clearance": 1,
        "csid": "all",
        "deathday": 6,
        "event_id": "morphe-126-9",
        "face_id": "sf17",
        "history": "<b>1日目</b>の夜、<b>あなた</b>は<b>ケイイチ</b>と運命を分かち合いました。<br><b>3日目</b>の夜、<b>ケイイチ</b>を襲撃から守った。<br>",
        "jobname": null,
        "live": "suicide",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 9,
        "point": {
          "actaddpt": 12,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["guard"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "lover",
        "sheep": "pixi",
        "sow_auth_id": "hesychia",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479527000,
          "limitentrydt": 1440233023000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": ["14"],
        "clearance": 1,
        "csid": "all",
        "deathday": 6,
        "event_id": "morphe-126-9",
        "face_id": "w04",
        "history": "<b>1日目</b>の夜、<b>小鈴</b>と<b>ケイイチ</b>の間に運命の絆を結んだ。<br>",
        "jobname": null,
        "live": "cursed",
        "love": "love",
        "name": null,
        "overhear": [],
        "pno": 10,
        "point": {
          "actaddpt": 12,
          "saidcount": 8,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["loveangel"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "loveangel",
        "sheep": "pixi",
        "sow_auth_id": "yucca",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439358537000,
          "limitentrydt": 1440516563000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 4,
        "event_id": "morphe-126-9",
        "face_id": "t34",
        "history": null,
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 11,
        "point": {
          "actaddpt": 12,
          "saidcount": 16,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["invalid"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "invalid",
        "sheep": null,
        "sow_auth_id": "scarecrow",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479300000,
          "limitentrydt": 1440516563000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 6,
        "event_id": "morphe-126-9",
        "face_id": "mad11",
        "history": "<b>1日目</b>の夜、<b>モスキート</b>と<b>ソフィア</b>の間に運命の絆を結んだ。<br>",
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 12,
        "point": {
          "actaddpt": 12,
          "saidcount": 0,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["loveangel"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "loveangel",
        "sheep": "pixi",
        "sow_auth_id": "geppei",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479200000,
          "limitentrydt": 1440349986000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -1,
        "event_id": "morphe-126-9",
        "face_id": "c111",
        "history": "<b>4日目</b>の夜、<b>ゴドウィン</b>を<b>蘇生</b>した。<br><b>5日目</b>の夜、<b>小鈴</b>を<b>殺害</b>した。<br>",
        "jobname": null,
        "live": "live",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 13,
        "point": {
          "actaddpt": 12,
          "saidcount": 3,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["witch"],
        "rolestate": 252,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "witch",
        "sheep": null,
        "sow_auth_id": "benico",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479057000,
          "limitentrydt": 1440514205000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 5,
        "event_id": "morphe-126-9",
        "face_id": "t06",
        "history": "<b>モスキート</b>は<b>恋人陣営</b>のようだ。<br><b>ゴドウィン</b>は<b>村人陣営</b>のようだ。<br>",
        "jobname": null,
        "live": "executed",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 14,
        "point": {
          "actaddpt": 12,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["mediumwin"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": null,
        "sheep": "pixi",
        "sow_auth_id": "轟",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478948000,
          "limitentrydt": 1440262462000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 3,
        "event_id": "morphe-126-9",
        "face_id": "m19",
        "history": null,
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 15,
        "point": {
          "actaddpt": 12,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["hunter"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "seerwin",
        "sheep": null,
        "sow_auth_id": "narumi",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478932000,
          "limitentrydt": 1440516450000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": ["8"],
        "clearance": 1,
        "csid": "all",
        "deathday": 3,
        "event_id": "morphe-126-9",
        "face_id": "c67",
        "history": "<b>1日目</b>の夜、<b>あなた</b>は<b>モスキート</b>と運命を分かち合いました。<br>",
        "jobname": null,
        "live": "suicide",
        "love": "love",
        "name": null,
        "overhear": [],
        "pno": 16,
        "point": {
          "actaddpt": 12,
          "saidcount": 14,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["passion"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "passion",
        "sheep": null,
        "sow_auth_id": "tear_stone",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478773000,
          "limitentrydt": 1440516452000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -2,
        "event_id": "morphe-126-9",
        "face_id": "w13",
        "history": null,
        "jobname": null,
        "live": "mob",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 17,
        "point": {
          "actaddpt": 12,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": [null],
        "rolestate": -1,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": null,
        "sheep": null,
        "sow_auth_id": "pure_g",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439443194000,
          "limitentrydt": 1440515364000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 5,
        "event_id": "morphe-126-9",
        "face_id": "c51",
        "history": "<b>モスキート</b>は<b>恋人陣営</b>のようだ。<br><b>ジャック</b>は<b>村人陣営</b>のようだ。<br><b>ドン</b>は<b>村人陣営</b>のようだ。<br><b>アオイ</b>は<b>裏切りの陣営</b>のようだ。<br>",
        "jobname": null,
        "live": "victim",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 18,
        "point": {
          "actaddpt": 12,
          "saidcount": 0,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["seerwin"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "seerwin",
        "sheep": "pixi",
        "sow_auth_id": "springkraut",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439479225000,
          "limitentrydt": 1440375099000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -2,
        "event_id": "morphe-126-9",
        "face_id": "c60",
        "history": null,
        "jobname": null,
        "live": "mob",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 19,
        "point": {
          "actaddpt": 12,
          "saidcount": 1,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": [null],
        "rolestate": -1,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": null,
        "sheep": null,
        "sow_auth_id": "navi_chang",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439468865000,
          "limitentrydt": 1440516549000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": 6,
        "event_id": "morphe-126-9",
        "face_id": "w24",
        "history": "<b>1日目</b>の夜、<b>パルック</b>を<b>殺害</b>した。<b>パルック</b>は<b>村人</b>のようだ。<br><b>2日目</b>の夜、<b>タルト</b>を<b>殺害</b>した。<b>タルト</b>は<b>賞金稼</b>のようだ。<br><b>4日目</b>の夜、<b>ヨーランダ</b>を<b>殺害</b>した。<b>ヨーランダ</b>は<b>信仰占師</b>のようだ。<br>",
        "jobname": null,
        "live": "executed",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 20,
        "point": {
          "actaddpt": 12,
          "saidcount": 9,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["intwolf"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "intwolf",
        "sheep": "pixi",
        "sow_auth_id": "＠寿司",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439469093000,
          "limitentrydt": 1440514019000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": [],
        "clearance": 1,
        "csid": "all",
        "deathday": -1,
        "event_id": "morphe-126-9",
        "face_id": "w50",
        "history": "<b>1日目</b>の夜、<b>パルック</b>を<b>殺害</b>した。<br><b>2日目</b>の夜、<b>タルト</b>を<b>殺害</b>した。<br><b>4日目</b>の夜、<b>ヨーランダ</b>を<b>殺害</b>した。<br><b>5日目</b>の夜、<b>オルギア</b>を<b>殺害</b>した。<br><b>6日目</b>の夜、<b>ゴドウィン</b>を<b>殺害</b>した。<br>",
        "jobname": null,
        "live": "live",
        "love": null,
        "name": null,
        "overhear": [],
        "pno": 21,
        "point": {
          "actaddpt": 11,
          "saidcount": 15,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["childwolf"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "semiwolf",
        "sheep": "pixi",
        "sow_auth_id": "k_karura",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439475167000,
          "limitentrydt": 1440516530000
        },
        "user_id": null,
        "zapcount": 0
      }, {
        "bonds": ["7"],
        "clearance": 1,
        "csid": "all",
        "deathday": 3,
        "event_id": "morphe-126-9",
        "face_id": "sf027",
        "history": "<b>1日目</b>の夜、<b>パルック</b>を<b>殺害</b>した。<br>",
        "jobname": null,
        "live": "executed",
        "love": "love",
        "name": null,
        "overhear": [],
        "pno": 22,
        "point": {
          "actaddpt": 12,
          "saidcount": 5,
          "saidpoint": 0
        },
        "pseudobonds": [],
        "pseudolove": null,
        "role": ["headless"],
        "rolestate": 255,
        "say": {
          "say": 39996,
          "tsay": 4000,
          "spsay": 6000,
          "wsay": 16000,
          "xsay": null,
          "gsay": 39996,
          "say_act": 144
        },
        "select": "loveangel",
        "sheep": null,
        "sow_auth_id": "Aigis",
        "story_id": "morphe-126",
        "timer": {
          "entrieddt": 1439478829000,
          "limitentrydt": 1440516408000
        },
        "user_id": null,
        "zapcount": 0
      }
    ]);
    return Mem.rule.form.set(forms);
  };

  if (document.querySelector("#item-rolelist")) {
    deploy_samples();
  }

  ref = ["howto", "oldlog", "rolelist", "title"];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    GUI.items_module(name);
  }

}).call(this);

(function(){
  var sw, target, text, form, menu;
  sw = {
    controller: function(f){},
    view: function(c, f){
      m("select[name=target]", m("option", {
        value: -1,
        selected: selected
      }, "（パス）"), m("option", {
        value: v,
        selected: selected
      }, able.sw + "する"));
      return m("input", {
        type: 'submit',
        value: '変更',
        disabled: disabled
      });
    }
  };
  target = {
    controller: function(f){},
    view: function(c, f){}
  };
  text = {
    controller: function(f){},
    view: function(c, f){}
  };
  form = {
    controller: function(f){},
    view: function(c, f){}
  };
  menu = {
    open: function(){},
    close: function(){},
    view: function(){
      var event, role;
      return m(".SAY.paragraph", doc.timeline(), m("h6", "あなたが書き込む内容です。 - 記述"), (event = Mem.events.list.last()) ? (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = Mem.roles.list).length; i$ < len$; ++i$) {
          role = ref$[i$];
          results$.push(m.component(form, role, story, event, potof));
        }
        return results$;
      }()) : void 8);
    }
  };
}).call(this);

(function() {
  win.mount("#css_changer", function(dom) {
    return {
      controller: function() {},
      view: function() {
        var pwd, ref, uid;
        return m(".paragraph", m("a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "), doc.user.is_login ? ((ref = Url.prop, uid = ref.uid, pwd = ref.pwd, ref), m("a.btn.edge[href=" + gon.url + "?ua=mb&cmd=vindex&uid=" + (uid()) + "&pwd=" + (pwd()) + "]", "携帯")) : m("a.btn.edge[href=" + gon.url + "?ua=mb]", "携帯"), Btns.radio({}, Url.prop.theme, {
          cinema: "煉瓦",
          star: "蒼穹",
          night: "闇夜",
          moon: "月夜",
          wa: "和の国"
        }), m("hr.black"));
      }
    };
  });

}).call(this);

(function() {
  var countup, params;

  params = function(form, type, o) {
    var key, name, ref, ref1, val;
    for (key in form) {
      val = form[key];
      if (name = (ref = Mem.conf.option[key]) != null ? (ref1 = ref.query) != null ? ref1[type] : void 0 : void 0) {
        o[name] = val;
      }
    }
    return o;
  };

  countup = function(data, list) {
    var i, id, key, len, results;
    results = [];
    for (i = 0, len = list.length; i < len; i++) {
      id = list[i];
      key = "cnt" + id;
      if (data[key] == null) {
        data[key] = 0;
      }
      results.push(data[key]++);
    }
    return results;
  };

  win.mount("#make_vil", function(dom) {
    return {
      controller: function() {
        return {
          _id: "new",
          is_loading: false,
          http: {
            errors: [],
            infos: []
          },
          mestype: "SSAY",
          submit: function(form) {
            var data;
            this.is_loading = true;
            data = params(form, "SOW", {
              cmd: "makevil",
              trsid: form.chr_npc,
              hour: form.time.slice(0, 2),
              minite: form.time.slice(3, 5),
              eventcard: form.trap.join("/"),
              csid: Mem.options.hash.chr_npc.options[form.chr_npc].csid,
              votetype: form.vote_sign ? "sign" : "anonymity",
              starttype: form.start_auto ? "wbbs" : "manual",
              entrylimit: form.entry_password ? 'password' : 'free'
            });
            countup(data, form.extra);
            countup(data, form.role);
            countup(data, form.gift);
            return Submit.iframe("sow.cgi", data).then((function(_this) {
              return function(o) {
                var errors;
                _this.is_loading = false;
                console.log(data);
                errors = o.errors;
                if (errors) {
                  _this.http = {
                    errors: errors.makevil,
                    infos: ["作成に失敗しました。"]
                  };
                }
                if (!errors) {
                  return console.log(o);
                }
              };
            })(this));
          }
        };
      },
      view: function(v) {
        return m.component(doc.component.vmake_form, v);
      }
    };
  });

}).call(this);

(function(){

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

(function() {
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
  win.mount('title', function(){
    return doc.component.title;
  });
  win.mount('#to_root', function(){
    return {
      controller: function(){},
      view: doc.view.banner
    };
  });
  win.mount('#character_tag', function(){
    return {
      controller: function(){},
      view: doc.view.characters
    };
  });
  win.mount('#buttons', function(dom){
    var layout;
    layout = new win.layout(dom, 1, -1);
    layout.width = 5;
    return doc.component.buttons;
  });
  win.mount('#topviewer', function(dom){
    return {
      controller: function(){
        var layout;
        return layout = new win.layout(dom, 0, 1, false, 0);
      },
      view: function(){
        return menu.icon.view();
      }
    };
  });
  win.mount('#sow_auth', function(){
    return {
      controller: function(){},
      view: function(){
        return m.component(doc.component.sow_auth, Url.prop);
      }
    };
  });
  win.mount('#head_navi', function(){
    return {
      controller: function(){},
      view: function(){
        return m(".paragraph", m(".left_image"), m(".right_image"), m.component(doc.component.header));
      }
    };
  });
  win.mount('#headline', function(){
    return {
      controller: function(){},
      view: function(){
        return m(".choice", m.component(doc.component.header));
      }
    };
  });
  if ((typeof gon != 'undefined' && gon !== null ? gon.potofs : void 8) != null) {
    win.mount('#sayfilter', function(dom){
      return {
        controller: function(){
          var layout;
          this.layout = layout = new win.layout(dom, -1, 1);
          layout.small_mode = true;
          layout.large_mode = function(){
            return !(menu.icon.state() || this.small_mode);
          };
          this.wide_attr = GUI.attrs({}, function(){
            this.click(function(){
              layout.small_mode = !layout.small_mode;
              if (!layout.small_mode) {
                return menu.icon.state("");
              }
            });
            return this.actioned(function(){
              return layout.translate();
            });
          });
          this.wide_attr.className = "plane fine";
        },
        view: function(arg$){
          var click, wide_attr, layout, width, potofs, filter, event;
          click = arg$.click, wide_attr = arg$.wide_attr, layout = arg$.layout;
          width = doc.width.content();
          layout.width = (function(){
            switch (Url.prop.layout()) {
            case "right":
              return 0;
            case "center":
              return (win.width - width - 4) / 2;
            case "left":
              return win.width - width - 4;
            }
          }());
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
          event = Mem.events.find(Url.prop.event_id());
          return m("div", event != null
            ? m(".head", event.name)
            : m(".foot"), m("aside", m.component(potofs, Url.prop, wide_attr), m.component(filter, Url.prop)), m(".foot"));
        }
      };
    });
  }
  if ((typeof gon != 'undefined' && gon !== null ? gon.stories : void 8) != null) {
    Mem.rule.story.set(gon.stories);
    win.mount('#stories', function(dom){
      menu.icon.icon("resize-full", {
        open: function(){
          win.scroll.size = 30;
          return menu.scope.change("full");
        }
      });
      menu.icon.icon("resize-normal", {
        deploy: function(){
          win.scroll.size = 120;
          return menu.scope.change("normal");
        },
        open: function(){
          win.scroll.size = 120;
          return menu.scope.change("normal");
        }
      });
      return doc.component.stories;
    });
  }
  win.deploy();
  m.endComputation();
}).call(this);

(function() {
  win.deploy();

  m.endComputation();

}).call(this);

(function() {
  doc.component.buttons = {
    controller: function() {
      return {
        tap: function(icon) {
          return menu.icon.start({
            "class": "glass"
          }, icon);
        },
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
        vdom = m(tag, c.tap(icon), m(".bigicon", m(".icon-" + icon, " ")), badges[icon] ? m(".badge.pull-right", badges[icon]()) : void 0);
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
  doc.component.chr_name_lists = {
    controller: function() {},
    view: function() {
      var code_counts, code_str, i, idx, len, ref, results;
      ref = Mem.faces.name_head();
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
    controller: function() {},
    view: function() {
      return menu.icon.icon("th-large", {
        deploy: function(main_menu) {
          main_menu.drill("order", {
            caption: "並び順",
            view: function() {
              var key, o, ref, results;
              ref = Mem.conf.map_faces_order;
              results = [];
              for (key in ref) {
                o = ref[key];
                results.push(m("span", Btn.set({}, Url.prop.order, key), o.caption));
              }
              return results;
            }
          });
          return main_menu.drill("chr_set", {
            caption: "キャラセット",
            view: function(sub_menu) {
              return sub_menu.radio({
                "class": "chr_set"
              }, Url.prop.chr_set, Mem.map_faces.reduce, "chr_set", function(key) {
                return Mem.chr_sets.find(key).caption;
              });
            }
          });
        },
        view: function(main_menu) {
          return m(".paragraph", m("h6", "詳しく検索してみよう"), m("input.small", Txt.input(Url.prop.search)), m("span", "検索条件：キャラクター名 / 肩書き / プレイヤー "), m("h6", "キャラセットを選んでみよう"), main_menu.drills({}, ["order", "chr_set"]));
        }
      });
    }
  };

}).call(this);

(function(){
  doc.component.filter_hide = {
    controller: function(){},
    view: function(){
      return m("div");
    }
  };
}).call(this);

(function(){
  doc.component.filter = {
    controller: function(arg$){
      var talk_at, scroll, pins, this$ = this;
      talk_at = arg$.talk_at, scroll = arg$.scroll, pins = arg$.pins;
      this.click = {
        go: function(arg$){
          var _id;
          _id = arg$._id;
          return GUI.attrs({}, function(){
            return this.click(function(){
              talk_at(_id);
              pins({});
              menu.icon.change("");
              menu.scope.change("talk");
              scroll("");
              return win.scroll.rescroll(talk_at);
            });
          });
        },
        pin: function(list, append){
          return GUI.attrs({}, function(){
            return this.click(function(){
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
            });
          });
        }
      };
      this.day = 24 * 60 * 60;
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
    view: function(arg$, prop){
      var seeing_top, seeing_measure, line_text_height, line_text_height_measure, click, day, center_id, filter_size, anchorview, seeingview, star, o, tag;
      seeing_top = arg$.seeing_top, seeing_measure = arg$.seeing_measure, line_text_height = arg$.line_text_height, line_text_height_measure = arg$.line_text_height_measure, click = arg$.click, day = arg$.day;
      center_id = win.scroll.prop();
      filter_size = Math.floor((win.height - seeing_top) / line_text_height) - 3;
      anchorview = doc.messages.anchor(prop).list;
      seeingview = doc.messages.seeing(filter_size, win.scroll.center);
      star = function(o){
        var attr;
        if (doc.seeing[o._id] >= day) {
          attr = GUI.attrs({}, function(){
            return this.end(function(e){
              var ref$, key$, ref1$;
              return ref1$ = (ref$ = doc.seeing)[key$ = o._id], delete ref$[key$], ref1$;
            });
          });
          return m("span." + o.mestype + ".btn.edge", attr, "★ ");
        } else {
          attr = GUI.attrs({}, function(){
            return this.end(function(e){
              return doc.seeing_add(o._id, day);
            });
          });
          return m("span." + o.mestype + ".btn.edge", attr, "☆ ");
        }
      };
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
      this.state = m.prop("finish");
    },
    view: function(arg) {
      var max_all, max_cafe, max_ciel, max_crazy, max_morphe, max_pan, max_vage, max_xebec, state, top_line_attr;
      state = arg.state;
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
    }
  };

}).call(this);

(function() {
  var chr_box;

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

  doc.component.map_faces_new = {
    controller: function() {
      var chrs;
      chrs = Mem.chr_jobs.where({
        chr_set_id: "time"
      }).sort(false, function(o) {
        return o.face.order;
      }).list;
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
      chrs = Mem.map_faces.active(order(), chr_set(), search()).list;
      headline = "";
      if (chrs != null ? chrs.length : void 0) {
        headline = [m(".GSAY.badge", Mem.chr_sets.find(chr_set()).caption), "の" + chrs.length + "人を、", m(".GSAY.badge", map_order_set.headline), "回数で並べています"];
      }
      return [
        m("div", headline), m("hr.black"), (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = chrs.length; i < len; i++) {
            o = chrs[i];
            chr_job = Mem.chr_jobs.find((chr_set()) + "_" + o.face_id);
            job_name = chr_job.job;
            attr = null;
            attr_main = GUI.attrs({}, function() {
              var config, elem, out, over;
              elem = null;
              config = function(_elem) {
                return elem = _elem;
              };
              over = function() {
                return GUI.Animate.jelly.up(elem);
              };
              out = function() {
                return GUI.Animate.jelly.down(elem);
              };
              this.config(config);
              this.over(over);
              this.out(out);
              return attr = GUI.attrs({}, function() {
                this.over(over);
                return this.out(out);
              });
            });
            results.push(m(".chrbox", {
              key: o._id
            }, GUI.portrate(o.face_id, attr_main), m(".chrblank.line4", attr, m("div", job_name), m("div", o.face.name), m("div", m("a.mark", {
              href: "/map_reduce/faces/" + o.face_id
            }, map_order_set.caption + " " + o.win.value[map_order_set.order] + "回")), m("div", "♥" + o.sow_auth_id.max_is))));
          }
          return results;
        })(), m("hr.black")
      ];
    }
  };

}).call(this);

(function(){
  doc.component.potofs_hide = {
    controller: function(){},
    view: function(c, prop, wide_attr){
      return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]"))), m("tbody.plane", wide_attr, m("tr", m("th.calc", "…")))));
    }
  };
}).call(this);

(function(){
  var toggle_desc;
  toggle_desc = function(prop, desc, value){
    var reset, change, attr;
    reset = function(){
      if (prop() === value) {
        return attr.className = "btn edge active";
      } else {
        return attr.className = "btn edge";
      }
    };
    change = function(){
      if (prop() === value) {
        desc(!desc());
      }
      return prop(value);
    };
    attr = {
      className: "",
      onmouseup: change,
      ontouchend: change
    };
    return function(){
      reset();
      return attr;
    };
  };
  doc.component.potofs = {
    controller: function(arg$){
      var potofs_order, potofs_desc;
      potofs_order = arg$.potofs_order, potofs_desc = arg$.potofs_desc;
      this.stat_at = toggle_desc(potofs_order, potofs_desc, "stat_at");
      this.stat_type = toggle_desc(potofs_order, potofs_desc, "stat_type");
      this.said_num = toggle_desc(potofs_order, potofs_desc, "said_num");
      this.pt = toggle_desc(potofs_order, potofs_desc, "pt");
      this.urge = toggle_desc(potofs_order, potofs_desc, "urge");
      this.select = toggle_desc(potofs_order, potofs_desc, "select");
      this.win_result = toggle_desc(potofs_order, potofs_desc, "win_result");
      this.win_side = toggle_desc(potofs_order, potofs_desc, "win_side");
      this.role = toggle_desc(potofs_order, potofs_desc, "role");
      this.text = toggle_desc(potofs_order, potofs_desc, "text");
    },
    view: function(c, arg$, wide_attr){
      var potofs_order, potofs_desc, potofs_hide, o, className;
      potofs_order = arg$.potofs_order, potofs_desc = arg$.potofs_desc, potofs_hide = arg$.potofs_hide;
      return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]", m("sup", "(スクロールします。)")), m("th", m("a", c.stat_at(), "日程")), m("th", m("a", c.stat_type(), "状態")), m("th", m("a", c.said_num(), "発言")), m("th", m("a", c.pt(), "残り")), m("th", m("a", c.urge(), "促")), m("th", m("span.icon-user", " ")), m("th", m("a", c.select(), "希望")), m("th", m("a", c.win_result(), "勝敗")), m("th", m("a", c.win_side(), "陣営")), m("th", m("a", c.role(), "役割")), m("th", m("a", c.text(), "補足")))), m("tbody.plane", wide_attr, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = Mem.potofs.view(potofs_desc(), potofs_order()).list).length; i$ < len$; ++i$) {
          o = ref$[i$];
          className = potofs_hide()[o.face_id] ? "filter-hide" : "";
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
  var rule_accordion;

  rule_accordion = function(type) {
    var key;
    key = "rule_" + type;
    win.mount("#rule-" + type, function() {
      return doc.component[key];
    });
    return doc.component[key] = {
      controller: function() {
        this.list = RULE[type].list;
        this.cancel = GUI.attrs({}, function() {
          return this.end(function(e) {
            return list.tap = null;
          });
        });
      },
      view: function(arg) {
        var cancel, cb, i, items, j, len, list, o;
        list = arg.list, cancel = arg.cancel;
        items = [];
        items.push(m("dt", cancel, m("span.mark", m.trust("&#x2718"))));
        cb = function(arg1, idx) {
          var head, tap, text;
          head = arg1.head, text = arg1.text;
          tap = GUI.attrs({}, function() {
            return this.end(function(e) {
              return list.tap = idx;
            });
          });
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

(function(){
  doc.component.sow_auth = {
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

}).call(this);

(function(){
  doc.component.story_game = {
    controller: function(){},
    view: function(c, arg$){
      var event, story, roletable, mob, trap_card, texts, text, option_id, option;
      event = arg$.event, story = arg$.story;
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
    }
  };
  doc.component.story_rule = {
    controller: function(){},
    view: function(c, arg$){
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
      }), m.trust(rating.caption)), m("div", m("code", "発言制限"), m.trust(saycnt.CAPTION + "<br>" + saycnt.HELP)), m("div", m("code", "更新"), story.view.update_at + "(" + story.view.update_interval + "ごと)")), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
    }
  };
  doc.component.story_text = {
    controller: function(){},
    view: function(c, arg$){
      var _id, story, head, nindex;
      _id = arg$._id, story = arg$.story, head = arg$.head;
      nindex = 0;
      return m(".MAKER.guide", {
        key: "STORY-TEXT"
      }, m("p.name", m("b", story.name)), doc.ext.talk_text(_id, "head", story.comment), m("p", "■国のルール"), RULE.nation.list.map(function(o){
        return m("p", (++nindex) + "." + head);
      }), m(".emboss", "以上の項目が、人狼議事の", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=nation~~"]', "ルール"), "と", m('a[href="http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/assets-master/rule.html?scr=player~~"]', "心構え"), "なんだ。"), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
    }
  };
  doc.component.story_spines = {
    controller: function(){},
    view: function(c){
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
  var mestype_orders;
  mestype_orders = ['SAY', 'MSAY', 'VSAY', 'VGSAY', 'GSAY', 'SPSAY', 'WSAY', 'XSAY', 'BSAY', 'AIM', 'TSAY', 'MAKER', 'ADMIN'];
  doc.component.timeline = Canvas(function(arg$){
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
  });
}).call(this);

(function() {
  doc.component.title = {
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
  var error_and_info, field;

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

  doc.component.vmake_form = {
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
  var tag_dom, vdom;

  vdom = function(name, val) {
    return [m("span", name), m("span.emboss.pull-right", val)];
  };

  tag_dom = function(type) {
    return vdom(Mem.conf.tag[type].name, Mem.faces.reduce.tag[type].count);
  };

  doc.view.characters = function() {
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
  doc.view.toc = function(o){};
  doc.view.helps = function(t){
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
    }, ext.talk_name(v.user_id, v.name, v.to), ext.talk_text(v._id, v.style, v.log), m("p.mes_date", m("span.emboss", identity_action(v), v.anchor), GUI.timer("span", v)));
  };
  doc.view.action = function(v){
    return m("." + v.mestype + ".action", {
      key: v._id
    }, ext.action_text(v._id, v.name, v.style, v.log), m("p.mes_date", GUI.timer("span", v)));
  };
  doc.view.memo = function(v){
    return m("table." + v.mestype + ".memo", {
      key: v._id
    }, m("tr", m("th", GUI.portrate(v.face_id), m("div", m("b", v.name))), m("td", ext.talk_text(v._id, v.style, v.log), m("p.mes_date", GUI.timer("span", v)))));
  };
  doc.view.talk = function(v){
    return ext.say_base(v, m("span.emboss", identity_action(v), v.anchor), GUI.timer("span", v));
  };
  doc.view.history = function(v){
    return ext.say_base(v, m("span.mark", v.anchor));
  };
}).call(this);

(function(){
  doc.view.sow_stories = function(v){
    return m(".paragraph", m("table.vindex", m("thead", m("tr", m("td", "id"), m("td", "村の名前"), m("td", "人数"), m("td", "進行"), m("td", "ルール"), m("td", "制限"))), m("tbody", v.error
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
      }))));
  };
}).call(this);

