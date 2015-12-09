//=include app/before/**/*.js
(function() {
  var ref;

  Url.define(URL_PROPS, {});

  Url.routes = {
    pathname: {
      root: new Url("/"),
      faces: new Url("/map_reduce/faces"),
      events: new Url("/:story_id/file"),
      event: new Url("/:story_id/:turn/messages"),
      story: new Url("/stories/:story_id")
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
      faces: new Url("face=:chr_set~:order~:search", {
        unmatch: ((typeof gon !== "undefined" && gon !== null ? (ref = gon.map_reduce) != null ? ref.faces : void 0 : void 0) != null) && "?"
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
      scroll: new Url("scr=:scroll~:talk_at~:memo_at", {
        unmatch: "?",
        change: function(params) {
          var folder, logid, ref1, ref2, scroll, turn, updated_at, vid;
          scroll = win.scroll.prop();
          ref1 = scroll.split("-"), folder = ref1[0], vid = ref1[1], turn = ref1[2], logid = ref1[3];
          if (logid != null) {
            updated_at = ((ref2 = Mem.messages.find(scroll)) != null ? ref2.updated_at : void 0) || 0;
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
    css: Url.cookie("css=:theme~:width~:layout~:font", {
      time: 12,
      path: "/"
    })
  };

  Url.cookies.css.options.change = function(params) {
    var key, list;
    list = (function() {
      var i, len, ref1, results;
      ref1 = ["theme", "width", "layout", "font", "item", "color"];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        key = ref1[i];
        results.push((Url.prop[key]()) + "-" + key);
      }
      return results;
    })();
    if (!Url.prop.human()) {
      list.push("no-player");
    }
    GUI.header(list);
    return window.requestAnimationFrame(function() {
      return Layout.move();
    });
  };

}).call(this);

(function() {
  if ((typeof gon !== "undefined" && gon !== null ? gon.face : void 0) != null) {
    catch_gon.face();
    GUI.if_exist("#summary", function(dom) {
      return m.mount(dom, {
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
      });
    });
    GUI.if_exist("#calc", function(dom) {
      return m.mount(dom, {
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
      });
    });
    GUI.if_exist("#village", function(dom) {
      return m.mount(dom, {
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
      });
    });
    GUI.if_exist("#sow_user", function(dom) {
      return m.mount(dom, {
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
      });
    });
  }

}).call(this);

(function() {
  var ref;

  if ((typeof gon !== "undefined" && gon !== null ? (ref = gon.map_reduce) != null ? ref.faces : void 0 : void 0) != null) {
    catch_gon.map_reduce_faces();
    GUI.if_exist("#map_faces", function(dom) {
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          var attr, attr_main, chr_job, chr_set, chrs, headline, job_name, map_order_set, o, order, ref1, search;
          ref1 = Url.prop, order = ref1.order, chr_set = ref1.chr_set, search = ref1.search;
          map_order_set = Mem.conf.map_faces_order[order()];
          chrs = Mem.map_faces.active(order(), chr_set(), search()).list();
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
                }, GUI.portrate(o.face_id, attr_main), m(".chrblank.line4", attr, m("div", job_name), m("div", o.face().name), m("div", m("a.mark", {
                  href: "/map_reduce/faces/" + o.face_id
                }, map_order_set.caption + " " + o.win.value[map_order_set.order] + "回")), m("div", "♥" + o.sow_auth_id.max_is))));
              }
              return results;
            })(), m("hr.black")
          ];
        }
      });
    });
    GUI.if_exist("#chr_sets", function(dom) {
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          return menu.icon.icon("th-large", {
            deploy: function(main_menu) {
              main_menu.drill("order", {
                caption: "並び順",
                view: function() {
                  var key, o, ref1, results;
                  ref1 = Mem.conf.map_faces_order;
                  results = [];
                  for (key in ref1) {
                    o = ref1[key];
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
                  }, Url.prop.chr_set, Mem.map_faces.reduce(), "chr_set", function(key) {
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
      });
    });
  }

}).call(this);

(function() {
  var chr_box, chrs, new_chrs, old_chrs;

  if (((typeof gon !== "undefined" && gon !== null ? gon.new_chr_faces : void 0) != null) && ((typeof gon !== "undefined" && gon !== null ? gon.new_chr_jobs : void 0) != null)) {
    Mem.rule.face.merge(gon.new_chr_faces);
    Mem.rule.chr_job.merge(gon.new_chr_jobs);
    chrs = Mem.chr_jobs.where({
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
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          var o;
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
      });
    });
  }

}).call(this);

(function(){
  GUI.if_exist('#chr_name_lists', function(dom){
    return m.mount(dom, {
      controller: function(){},
      view: function(){
        var i$, ref$, len$, idx, code_counts, lresult$, code_str, results$ = [];
        for (i$ = 0, len$ = (ref$ = Mem.faces.name_head()).length; i$ < len$; ++i$) {
          idx = i$;
          code_counts = ref$[i$];
          lresult$ = [];
          lresult$.push(m("div", m("h2", idx + " hits の頭文字"), code_counts ? (fn$()) : void 8));
          results$.push(lresult$);
        }
        return results$;
        function fn$(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = code_counts).length; i$ < len$; ++i$) {
            code_str = ref$[i$];
            results$.push(m(".paragraph", m("code", code_str)));
          }
          return results$;
        }
      }
    });
  });
}).call(this);

(function() {
  GUI.if_exist("#css_changer", function(dom) {
    return m.mount(dom, {
      controller: function() {},
      view: function() {
        return m(".paragraph", m("a.menuicon.pull-right.icon-cog", menu.icon.start({}, "cog"), " "), Btns.radio({}, Url.prop.theme, {
          cinema: "煉瓦",
          star: "蒼穹",
          night: "闇夜",
          moon: "月夜",
          wa: "和の国"
        }), m("hr.black"));
      }
    });
  });

}).call(this);

(function() {
  if ((typeof gon !== "undefined" && gon !== null ? gon.villages : void 0) != null) {
    GUI.if_exist("#villages", function(dom) {
      Mem.rule.item.set(gon.villages);
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          return win.scroll.pager("div", Mem.items.list(), function(v) {
            return doc.message.action(v);
          });
        }
      });
    });
  }

  if ((typeof gon !== "undefined" && gon !== null ? gon.byebyes : void 0) != null) {
    GUI.if_exist("#byebyes", function(dom) {
      Mem.rule.item.set(gon.byebyes);
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          return win.scroll.pager("div", Mem.items.list(), function(v) {
            return doc.message.action(v);
          });
        }
      });
    });
  }

  if ((typeof gon !== "undefined" && gon !== null ? gon.history : void 0) != null) {
    GUI.if_exist("#history", function(dom) {
      Mem.rule.item.set(gon.history);
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          return win.scroll.pager("div", Mem.items.list(), function(v) {
            return doc.message.history(v);
          });
        }
      });
    });
  }

}).call(this);

(function() {
  var i, len, name, ref, rule_accordion;

  Mem.rule.item.set([
    {
      "_id": "about-paragraph--1",
      "log": "人狼議事は、やや敷居の高いゲームです。遊び方をよく読み、更に既に終了した村のログを２～３村ほど読んで感覚をある程度掴んでから、参加される事をお薦めします。"
    }, {
      "_id": "about-guide-MAKER-2",
      "name": "そもそも「人狼ゲーム」って何？？？",
      "updated_at": 1370662886000,
      "log": "村人と人狼との、村の存続をかけた戦いを楽しむゲームです。\n<br>\n人狼は自分の正体がばれないよう、普段は村人として振る舞います。そして一日につき一人村人を食い殺していきます。\n<br>\n村人は人狼を退治するため、人狼と思われる人を一日につき一人処刑していきます。\n<br>\n首尾よく村人側が人狼たちを全員退治できれば村人側の勝ちです。\n<br>\n村人側がずっと間違え続けて罪のない村人ばかりを処刑してしまい、村人の人数が人狼の人数以下にまで減ってしまったら、人狼側の勝ちになります。\n<br>\n時には妖精と呼ばれる第三勢力が、漁夫の利を狙って紛れ込むこともあります。\n<br>\n<br>\nこのシステムを利用して、キャラクターで物語を紡ぐ村も存在します。\n<br>\nRP州は、そのために遊びやすいことを目標にしていますので、一度ご覧下さい。"
    }, {
      "_id": "about-guide-MAKER-3",
      "name": "人狼議事のスタンス",
      "updated_at": 1370662886000,
      "log": "この国の各州では、人狼スクリプトを利用したいかなる遊び方も禁止しておりません。ただし、遊ぶうえでサーバーには負荷がかかります。\n各州は同一のサーバーを共用していますので、あまりにも重い利用をすると、他村も含めて不便を強いられる結果になる場合も、考えられます。\n<br>\n公園で遊ぶとき程度には、他村にも気を配ってあげてください。\n<br>\n「○○でなければ人狼ではない」というような言い方はしませんが、そういった言葉を選ぶことを禁じません。人の言葉に振り回されるばかりにならないよう、強い心を持ってください。"
    }, {
      "_id": "about-guide-ADMIN-4",
      "name": "人狼議事の運営について。",
      "updated_at": 1370662886000,
      "log": "この国は\n<span class=\"btn edge\">自宅サーバー</span>\n<a class=\"btn edge\" href=\"http://www.sakura.ne.jp\">さくらサーバーズ</a>\n<a class=\"btn edge\" href=\"http://aws.amazon.com/jp/free\">アマゾン ウェブ サービス</a>\nにより稼働しています。\n<br>\n通信回線の不調、自宅のルーターの不調、サーバーの不調などで、アクセス不能になってしまうことも希にはありますが、迅速に復旧する保証はありません。\n（流行の「ベストエフォート」というやつです。）\n<br>\nまた、不慮の事故でログが失われた場合、最大で１２時間、巻き戻る可能性があります。\n<br>\n人狼議事は ninjin氏作人狼BBSのクローンです。ただし人狼BBSと違い時間によって村が自動生成される事はありません。\nこれは管理人またはプレイヤーが自分で村を作成して楽しむ「カスタム村専用人狼BBS」なのです。"
    }, {
      "_id": "maker-talk-GSAY-1",
      "face_id": "t10",
      "name": "営利政府 トレイル",
      "updated_at": 1437461000000,
      "log": "村建てフォームには、村のルールが既に記入してあります。\n<br>\n賛同できる内容はそのまま残して、不足なら筆を加え、余分と判断する事項は削除して村を建ててください。\n<br>\n<br>\n村を建てるとき気をつけると良いことを心構えに纏めました。\n<br>\nぜひご覧ください。"
    }, {
      "_id": "ruleguide-head-h2-1",
      "log": "準備はいいかな？"
    }, {
      "_id": "ruleguide-talk-GSAY-2",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1370662886001,
      "log": "ようこそ。ここにはこのサイトを楽しむためのルールや心構えを綴ってある。\n暖炉のそばが開いているから、腰を下ろして熟読しよう。楽しいゲームは全員が対等で、全員が読んで理解しているルールがあって成り立つんだ。\n<br>\n<br>\nただし、やむを得ず、ルール違反をすることもあるだろうね。違反してしまった事実は覆らないけれど、ルールを破らざるをえなかった事情は、落ち着いて聞いてあげよう。\n<a class=\"mark\" href=\"http://www.nihonjiten.com/data/763.html\">罪を憎んで、人を憎まず。</a>\nこれは話し合いをするゲームなんだ。\n<br>\n<br>\n<a title=\"法案や、企業の自主規制に従う必要はない。逆らう必要もない。それよりもきみのそばの十数人のためを思おう。\">このサイトは日本国の法律に従っている</a>。\n特にここで、六法全書を引き写して退屈な思いをするつもりはないけれど、不正アクセス禁止法、個人情報保護法は関わりが深いはずだ。\n<br>"
    }, {
      "_id": "violation-head-h2-1",
      "log": "ルール違反があったら？"
    }, {
      "_id": "violation-head-h3-2",
      "log": "はじめに"
    }, {
      "_id": "violation-talk-GSAY-3",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1370662886002,
      "log": "もし、ルールに違反してしまったとしたら？とても残念なことだけれど、まだ絶望しなくていい。\n<br>\n<br>\nきみには全員に釈明する、貴重な機会が残されているんだ。遊びに集まった皆が笑い合って解散するために、勇気を奮ってエピローグに顔を出してごらん。\n<br>\n<br>\n真剣な話し合いが必要なときは、協力してそのための時間をなんとか捻り出してほしい。\n家に帰るまでが遠足なのと同じで、エピローグが済むまでがその村なんだ。"
    }, {
      "_id": "violation-talk-GSAY-4",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1370662886003,
      "log": "エピローグでは全員が一同に介し、墓下と地上にわかれることなく、勝つための嘘もなく、より率直な話ができる。この特性から、人狼議事ではエピローグでの話し合いを推奨しているよ。\n<br>\n古い時代にサムライは、どのような事情にも沈黙して咎を一身に引き受けることを美徳としていたそうだ。\n起こったことを水に流すにはそれもいいだろうけれど、残念ながらみんなの気持ちはこのことに残ってしまうので、あまりよくない。\n<br>\n<br>\n解散するときに心残りなく、さっぱりとお別れができるよう、エピローグを活用してほしい。もやもやと蟠りが残るのは、だめだね。"
    }, {
      "_id": "violation-head-h3-5",
      "log": "突然死"
    }, {
      "_id": "violation-talk-GSAY-6",
      "face_id": "t07",
      "name": "勧善懲悪委 アカリ",
      "updated_at": 1437461000000,
      "style": "head",
      "log": "突然死は悪！そうですよね先生！\n<br>\n<br>\nみんな一生懸命がんばっているのに、そんなことで汚されるの、悔しいです！"
    }, {
      "_id": "violation-talk-GSAY-7",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1437461000000,
      "log": "正解、国のルールだね。\n<br>\nただ、人狼議事では、１日間発言しない場合には２つの措置をとっている。\n<br>\n<br>\nひとつ、突然死とする措置。\n<br>\nふたつ、ゲーム不参加扱いとする措置。\n<br>\n<br>\nこれらの罰則を超えて重大なことなのか、冷静に考えて行動しよう。また、事故的な、やむを得ない事情があるかもしれないよ。もし事情があれば、考慮して考えてみよう。\n<br>\n僕らはここに遊びに来ているんだ。最後には笑い合って解散できることを目指そうね。"
    }, {
      "_id": "violation-head-h3-8",
      "log": "どうすればいいの？"
    }, {
      "_id": "violation-talk-GSAY-9",
      "face_id": "c96",
      "name": "学者 レオナルド",
      "updated_at": 1437461000000,
      "log": "ここでは、ルール違反についてとるべき対応を話そう。\n<br>\n<br>\nさきの項目でアカリくんが嘆いていたように、真剣なゲームをしていれば、ルール違反を許したくないという強い情動もあるものなんだ。\n<br>\nいっぽう、粗相があったらコップ一杯の日本酒を一気飲みして、ちょっといいところを見せればよい、という考え方もあるものだよ。\n<br>\n<br>\nこうした考え方が村の中でずれていると、いざ何かがあったときに困ったり、不満が溜まったりしてしまう。\n<br>\n開始前に、あなたの村ではどう対応する、という方針を明らかにしておくと、志向の合わない人と衝突してしまうこも減るはずだよ。\n<br>\nどう対応するとよいのかを宿題にします、みなさんの良心にしたがって考えてみよう。"
    }, {
      "_id": "violation-talk-GSAY-10",
      "face_id": "g02",
      "name": "白鶴拳 志偉",
      "updated_at": 1437461000000,
      "log": "うちの道場じゃ、気の抜けた奴は師範代が叩き出してるぜ！リアルがヤバそうだったり、難しくてわかんないなら控えとけよってことよ。\n<br>\n<br>\nよーし、俺の建てる村は違反なんて許さん。アカリや†ルシフェル†みたいに、きちんと参加できるやつら誘ってガンガンいくのだあ！"
    }, {
      "_id": "violation-talk-GSAY-11",
      "face_id": "t01",
      "name": "友愛組合 チアキ",
      "updated_at": 1437461000000,
      "log": "道場みたいな処だと窮屈だな。僕は自分で、別の村を建てるよ。僕の村は忙しい人もフォローするし、ルール違反（突然死とか）があっても、厳しく責め立てたくはないんだ。\n<br>\n<br>\n…村に書いちゃうの勇気いるなあ。違反してもOKみたいに聞かれてしまいそうだ。ゴクリ。\n<br>\n<sub>せっかく集まった仲間を責めたくないだけなんだけれど…どう伝えよう…</sub>"
    }, {
      "_id": "violation-talk-GSAY-12",
      "face_id": "c24",
      "name": "長老 ナタリア",
      "updated_at": 1437461000000,
      "log": "あたしは難しいことを考えるのが苦手でねえ。あんまり上手に勝とうとできていなくても、厳しくしてほしくないねえ。\n<br>\n<br>\nそうだわ、ヌマタロウさんをお誘いして、そういう村を建ててみようかしらねえ。お茶受けは拳骨煎餅かしらねえ。"
    }
  ]);

  if ((typeof gon !== "undefined" && gon !== null ? gon.items : void 0) != null) {
    Mem.rule.item.merge(gon.items);
  }

  ref = ["about", "maker", "ruleguide", "violation"];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    GUI.items_module(name);
  }

  rule_accordion = function(type) {
    return GUI.if_exist("#rule-" + type, function(dom) {
      return m.mount(dom, {
        controller: function() {},
        view: function() {
          return GUI.accordion(type, RULE[type].list);
        }
      });
    });
  };

  rule_accordion("nation");

  rule_accordion("village");

  rule_accordion("maker");

  rule_accordion("player");

}).call(this);

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
          ids = _.select(ids, function(id){
            return 25 < doc.seeing[id] && id !== center._id;
          });
          list = Mem.messages.finds(ids);
          list.unshift(center);
        } else {
          ids = _.select(ids, function(id){
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
      story = Mem.storys.list().first;
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
      potofs = Mem.potofs.view(potofs_desc(), potofs_order()).list();
      hides = potofs_hide();
      turn = ((ref$ = win.scroll.center) != null ? (ref1$ = ref$.event()) != null ? ref1$.turn : void 8 : void 8) || 0;
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
      for (i$ = 0, len$ = (ref$ = Mem.writers.list()).length; i$ < len$; ++i$) {
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
      return m("p.text." + style, deco_action(by_id), m("b", m.trust(name)), "は、", m("span", m.trust(text.deco_text)));
    },
    talk_name: function(user_id, name, to){
      if (to) {
        return m("p.name.center", m("b.pull-left", m.trust(name + "")), m("b", "▷"), m("b.pull-right", m.trust(to + "")));
      } else {
        return m("p.name", m("b", m.trust(name)), m(".emboss.pull-right", user_id));
      }
    },
    talk_text: function(by_id, style, text){
      return m("p.text." + style, deco_action(by_id), m.trust(text.deco_text));
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
        for (i$ = 0, len$ = (ref$ = t.list() || []).length; i$ < len$; ++i$) {
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
        for (i$ = 0, len$ = (ref$ = t.list() || []).length; i$ < len$; ++i$) {
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
      }, m.trust(o.log.deco_text));
    },
    head: function(o){
      return m(o.mestype, {
        key: o._id
      }, m('a', {
        name: o._id
      }), m.trust(o.log.deco_text));
    },
    event: function(o){
      var btn, list;
      btn = o.event().view.btn();
      list = [];
      list.push(m("h3", m.trust(o.name)));
      if (btn) {
        list.push(btn);
      }
      return m("." + o.mestype, {
        key: o._id
      }, list);
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
      var msg;
      return m("p.mes_date", (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = o.errors).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          results$.push(m(".WSAY", m(".emboss", msg)));
        }
        return results$;
      }()), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = o.infos).length; i$ < len$; ++i$) {
          msg = ref$[i$];
          results$.push(m(".TSAY", m(".emboss", msg)));
        }
        return results$;
      }()));
    };
    select = function(input, able){
      var selected, options, pno, job, name, vdoms, actions;
      selected = function(prop, val){
        if (val === prop()) {
          return "[selected]";
        } else {
          return "";
        }
      };
      if (input.targets) {
        options = m("optgroup[label=選択肢]", (function(){
          var i$, ref$, len$, ref1$, results$ = [];
          for (i$ = 0, len$ = (ref$ = input.targets).length; i$ < len$; ++i$) {
            ref1$ = ref$[i$], pno = ref1$.pno, job = ref1$.job, name = ref1$.name;
            selected = "";
            if (input.target() === pno) {
              selected = "[selected]";
            }
            results$.push(m("option[value=" + pno + "]" + selected, {
              key: pno
            }, job + " " + name));
          }
          return results$;
        }()));
      }
      vdoms = [];
      if (able.action) {
        actions = Mem.actions.for_form(v.mestype, v.format).list().map(function(act){
          return m("option[value=" + act.index + "]", {
            key: act.index
          }, act.text + "");
        });
        actions.unshift(m("option[value=0]", {
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
    face = chr_job.face();
    return m("div", {
      key: v._id
    }, m("h6", m.trust(v.role_name)), m("table." + v.mestype + ".talk", m("tr", m("th"), m("td", m(".msg", (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.form_texts.formats(v._id, v.mestype).list()).length; i$ < len$; ++i$) {
        vv = ref$[i$];
        results$.push(m("span.btn.edge", v.format_on(vv.format), vv.format_name));
      }
      return results$;
    }()), (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = Mem.form_texts.mestypes(v._id, v.format).list()).length; i$ < len$; ++i$) {
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
        select(input, able);
        results$.push(error_and_info(input));
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
      for (i$ = 0, len$ = (ref$ = Mem.potofs.view(potofs_desc(), potofs_order()).list()).length; i$ < len$; ++i$) {
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
        : Mem.storys[v.mestype]().list().map(function(v){
          var chr_set;
          chr_set = Mem.chr_sets.find(v.csid);
          return m("tr", m("td", v.vid, m('a[href="#{v.link}"]', v.name), m("span.note", m("br"), "〈", m('a[href="#{v.link}"]', "最新"), "〉", v.entry_limit === "password" ? m('img[src="#{GUI.img_head}/icon/key.png"][alt="[鍵]"]') : void 8), v.view.rating, m("span.note", m("br"), "　　人物 ： " + chr_set.caption, m("br"), "　　更新 ： " + v.view.updated_at + " " + v.view.update_interval + "毎", m("br"), "　 ")), m("td.small", v.player_count, m("span.note", m("br")), v.status + ""), m("td"), m("span.note", v.view.say_limit_help), v.view.game_rule, m("span.note", m("br"), v.trs));
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
    event = o.event();
    story = o.story();
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
    event = o.event();
    story = o.story();
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
    var story;
    story = o.story();
    return m(".MAKER.guide", {
      key: "STORY-TEXT"
    }, m("p.name", m("b", story.name)), ext.talk_text(o._id, "head", story.comment), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
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
  var vmake_form;
  vmake_form = {
    controller: function(v){
      v.form = {
        role: [],
        gift: [],
        trap: [],
        extra: []
      };
      return v;
    },
    view: function(v){
      var npc_says, btn, add_btn, sets, add_btns, base, option, select, vindex, nindex, vtext, o;
      npc_says = function(csid){
        var face_id, say_0, say_1, chr_set, chr_job, updated_at, mestype, face, name;
        if (csid) {
          face_id = csid.face_id, say_0 = csid.say_0, say_1 = csid.say_1;
          chr_set = v.form.chr_set();
          chr_job = chr_set.chr_jobs().find(chr_set._id + "_" + face_id);
          if (chr_job) {
            updated_at = _.now();
            mestype = "SAY";
            face = Mem.faces.find(face_id);
            name = chr_job.job + " " + face.name;
            return [
              doc.message.talk({
                face_id: face_id,
                name: name,
                mestype: mestype,
                updated_at: updated_at,
                log: say_0
              }), doc.message.talk({
                face_id: face_id,
                name: name,
                mestype: mestype,
                updated_at: updated_at,
                log: say_1
              })
            ];
          }
        }
      };
      btn = function(tap){
        var attr;
        return attr = {
          onmouseup: tap,
          ontouchend: tap
        };
      };
      add_btn = function(o){
        var tap;
        tap = function(){
          return v.form[o.cmd].push(o._id);
        };
        return m("a.WIN_" + o.win + ".btn.edge", btn(tap), o.name);
      };
      sets = function(method, list){
        var tap;
        tap = function(){
          return list.pop();
        };
        return m("div", m("a.btn.edge.icon-cancel-alt", btn(tap), ""), m("span", list.length + "人"), GUI.names[method](list, function(name, size, style){
          if (size > 1) {
            return m("span." + style + ".emboss", name + "x" + size);
          } else {
            return m("span." + style + ".emboss", name + "");
          }
        }));
      };
      add_btns = function(query){
        var i$, ref$, len$, o, results$ = [];
        for (i$ = 0, len$ = (ref$ = query.list()).length; i$ < len$; ++i$) {
          o = ref$[i$];
          results$.push(add_btn(o));
        }
        return results$;
      };
      base = function(key){
        var ref$;
        (ref$ = v.form)[key] == null && (ref$[key] = m.prop(null));
        return v.form[key];
      };
      option = function(o){
        var prop, ref$;
        prop = base(o._id);
        (ref$ = o.attr).onchange == null && (ref$.onchange = m.withAttr(o.attr_value, prop));
        return m("div", m("input", o.attr), m("label", {
          'for': o.attr.name
        }, prop()
          ? o.help_on
          : o.help_off));
      };
      select = function(key, hash, data, help){
        var prop, select_attr, label_attr, value, o;
        prop = base(key);
        select_attr = {
          id: key,
          name: key,
          onchange: m.withAttr("value", function(value){
            return prop(hash[value]);
          })
        };
        label_attr = {
          'for': key
        };
        return m('div', m('select', select_attr, m('option', {
          value: ""
        }, "- 選択してください -"), (function(){
          var ref$, results$ = [];
          for (value in ref$ = hash) {
            o = ref$[value];
            results$.push(m('option', {
              value: value
            }, data(o)));
          }
          return results$;
        }())), help && prop() ? m("label", label_attr, m.trust(help(prop()))) : void 8);
      };
      vindex = 0;
      nindex = 0;
      vtext = ["（村のルールは、自由に編集できるよ！）", "■村のルール"].concat(RULE.village.list.map(function(o){
        return (++vindex) + "." + o.head;
      }));
      return m(".vmake.paragraph", {
        key: v._id
      }, m("fieldset." + v.mestype, m("p", "村建てマニュアルや同村者の意見を参考に、魅力的な村を作っていきましょう。募集期限は作成した日から" + Mem.conf.folder.MORPHE.config.cfg.TIMEOUT_SCRAP + "日間です。期限内に村が開始しなかった場合、廃村となります。")), m("fieldset." + v.mestype, m("legend", "村の名前と説明"), m("input", Mem.options.find("vil-name").attr), m("textarea", Mem.options.find("vil-comment").attr, vtext.join("\r\n"))), m("fieldset." + v.mestype, m("p", "■国のルール"), RULE.nation.list.map(function(o){
        return m("p", (++nindex) + "." + o.head);
      })), m("fieldset." + v.mestype, m("p.tips", "以上の項目が、", m('a[href="./sow.cgi?cmd=rule"]', "人狼議事のルール"), "なんだ。編集していい部分は、自由に変更してかまわない。")), m("fieldset." + v.mestype, m("legend", "設定"), option(Mem.options.find("entry-password")), (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = Mem.options.checkbox().list()).length; i$ < len$; ++i$) {
          o = ref$[i$];
          results$.push(option(o));
        }
        return results$;
      }())), m("h6", "ゲームルール"), select("game", Mem.conf.rule, function(o){
        return o.CAPTION;
      }, function(o){
        return o.HELP;
      }), m("h6", "こだわり"), select("rating", Mem.conf.rating, function(o){
        return o.caption;
      }, function(o){
        return m("img", {
          src: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images/icon/cd_" + o._id + ".png"
        });
      }), m("h6", "登場人物"), select("chr_set", Mem.chr_sets.hash(), function(o){
        return o.caption;
      }), v.form.chr_set() ? select("csid", v.form.chr_set().chr_npcs().hash(), function(o){
        return o.caption;
      }) : void 8, v.form.chr_set() && v.form.csid() ? npc_says(v.form.csid()) : void 8, m("h6", "発言制限"), select("saycnttype", Mem.says.finds(Mem.conf.folder.MORPHE.config.saycnt), function(o){
        return o.CAPTION;
      }, function(o){
        return o.HELP;
      }), m("h6", "開始方法"), select("starttype", Mem.conf.start_type, function(o){
        return o.caption;
      }, function(o){
        return o.help;
      }), m("fieldset", m("h6", "見物人"), select("mob", Mem.roles.mob().hash(), function(o){
        return o.name;
      }, function(o){
        return o.HELP;
      }), m("h6", "編成"), sets("config", v.form.mob), sets("config", v.form.role), sets("config", v.form.gift), v.form.seqevent && v.form.seqevent()
        ? sets("order", v.form.trap)
        : sets("config", v.form.trap), m("h6", "村側"), add_btns(Mem.roles.is("human")), m("h6", "敵方の人間"), add_btns(Mem.roles.is("evil")), m("h6", "人狼"), add_btns(Mem.roles.is("wolf")), m("h6", "妖精"), add_btns(Mem.roles.is("pixi")), m("h6", "その他"), add_btn, {
        _id: "mob",
        cmd: "extra",
        win: "NONE",
        name: "見物人"
      }, add_btns(Mem.roles.is("other")), m("h6", "恩恵"), add_btns(Mem.roles.is("gift")), m("h6", "事件"), add_btns(Mem.traps.show())), m("fieldset", m("input", {
        name: "cmd",
        value: v.cmd,
        type: "hidden"
      }), m("input", {
        type: "submit",
        value: "村の作成"
      })));
    }
  };
  doc.message.vmake_form = function(v){
    return m("div", m.component(vmake_form, v));
  };
}).call(this);

(function(){
  var vmake;
  vmake = {
    controller: function(v){
      v.is_check = m.prop(false);
      v.mosaic = {
        type: "checkbox",
        onchange: m.withAttr("checked", v.is_check)
      };
      return v;
    },
    view: function(v){
      return m("." + v.mestype + ".action", {
        key: v._id
      }, m("p.text." + v.style, "便利な", m('a.btn.edge[href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD"]', "企画村予定表"), "はもう見た？建てた村に人が集まりそうかどうか、予想できるかもしれないよ。", m("br")), doc.user.is_login
        ? v.is_check()
          ? m('a.btn.edge[href="./sow.cgi?cmd=makevilform"]', "村の作成")
          : m("h6", "見たよ！今から、村を立てるよ！", m("input", v.mosaic))
        : m("h6", "村を作成する場合はログインして下さい。"));
    }
  };
  doc.message.vmake = function(v){
    return m("div", m.component(vmake, v));
  };
}).call(this);

(function(){
  var mestype_orders, timeline_present;
  mestype_orders = ['SAY', 'MSAY', 'VSAY', 'VGSAY', 'GSAY', 'SPSAY', 'WSAY', 'XSAY', 'BSAY', 'AIM', 'TSAY', 'MAKER', 'ADMIN'];
  timeline_present = function(arg$){
    var ref$, width, height, talk, open, potofs_hide, talk_at, search, graph_height, base, masks, time_ids, x, y, max_height, time_width, view_port_x, view_port_y, index_at, choice_last;
    ref$ = arg$.size, width = ref$[0], height = ref$[1];
    ref$ = Url.prop, talk = ref$.talk, open = ref$.open, potofs_hide = ref$.potofs_hide, talk_at = ref$.talk_at, search = ref$.search;
    if (!Mem.events.list().length) {
      return;
    }
    graph_height = height - 50;
    base = {};
    masks = {};
    time_ids = [];
    x = y = max_height = time_width = 0;
    view_port_x = function(){
      base = Mem.messages.talk(talk(), open(), potofs_hide());
      if (!base.reduce()) {
        return false;
      }
      masks = base.reduce().mask;
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
      for (i$ = (ref$ = query.list()).length - 1; i$ >= 0; --i$) {
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
        return base.reduce();
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
        for (i$ = 0, len$ = (ref$ = Mem.events.list()).length; i$ < len$; ++i$) {
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
      return m.mount(dom, {
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
                  })))).reduce();
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
                  })))).reduce();
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
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, ["all"].concat(slice.call(Url.routes.search.stories.values()))).reduce();
                  return m(".paragraph", sub_menu.radio({
                    "class": "edge folder"
                  }, Url.prop.folder, reduce, "folder", function(key, o) {
                    var ref2;
                    return (ref2 = GAME[key]) != null ? ref2.nation : void 0;
                  }));
                }
              });
              main_menu.drill("say_limit", {
                caption: "発言制限",
                view: function(sub_menu) {
                  var reduce, ref1;
                  reduce = (ref1 = Mem.storys).menu.apply(ref1, [Url.prop.folder()].concat(slice.call(Url.routes.search.stories.values({
                    say_limit: "all"
                  })))).reduce();
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
                  })))).reduce();
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
                  })))).reduce();
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
                  })))).reduce();
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
                  })))).reduce();
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
                  })))).reduce();
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
          }), m("table.vindex", m("thead", m("tr", m("th"))), win.scroll.pager("tbody", query.list(), function(o) {
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
      });
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
    GUI.if_exist("#messages", function(dom) {
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
      m.mount(dom, {
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
        catch_gon.villages();
        catch_gon.messages();
        menu.scope.open();
        return m.endComputation();
      });
    });
  }

}).call(this);

(function() {
  GUI.if_exist("#buttons", function(dom) {
    var layout;
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
    layout = new Layout(dom, 1, -1, 120);
    layout.width = 5;
    layout.transition();
    return m.mount(dom, {
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
            return doc.messages.pins(Url.prop).list().length - Mem.events.list().length;
          },
          "home": function() {
            return Mem.messages.home("announce").list().length - Mem.events.list().length;
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
            return doc.messages.memo(prop).list().length - Mem.events.list().length;
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
            return doc.messages.history(prop).list().length - Mem.events.list().length;
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
            return doc.messages.talk(prop).list().length - Mem.events.list().length;
          },
          "th-large": function() {
            return Mem.map_faces.active(Url.prop.order(), Url.prop.chr_set(), Url.prop.search()).list().length;
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

}).call(this);

(function() {
  if ((typeof gon !== "undefined" && gon !== null ? gon.potofs : void 0) != null) {
    GUI.if_exist("#sayfilter", function(dom) {
      var layout, line_text_height, line_text_height_measure, seeing_measure, seeing_top, wide_attr;
      layout = new Layout(dom, -1, 1, 100);
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
      return m.mount(dom, {
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
      });
    });
  }

}).call(this);

(function() {
  GUI.if_exist("#topviewer", function(dom) {
    var layout;
    layout = new Layout(dom, 0, 1, 110, false, 0);
    return m.mount(dom, {
      controller: function() {},
      view: function() {
        return menu.icon.view();
      }
    });
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
  GUI.if_exist("#character_tag", function(dom) {
    var tag_dom, vdom;
    vdom = function(name, val) {
      return [m("span", name), m("span.emboss.pull-right", val)];
    };
    tag_dom = function(type) {
      return vdom(Mem.conf.tag[type].name, Mem.faces.reduce().tag[type].count);
    };
    return m.mount(dom, {
      controller: function() {},
      view: function() {
        var attr, chr_job, chrs, job_name, o, set, tag;
        tag = Url.prop.tag;
        chrs = Mem.faces.tag(tag()).list();
        set = Mem.conf.tag[tag()];
        return [
          menu.icon.icon("th-large", {
            view: function(main_menu) {
              return m(".paragraph", m("h6", "タグを選んでみよう"), Btns.radio({
                "class": "edge"
              }, tag, {
                all: vdom("- 全体 -", Mem.faces.reduce().all.all.count),
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
    });
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

  GUI.if_exist("#head_navi", function(dom) {
    var state;
    state = m.prop("finish");
    return m.mount(dom, {
      controller: function() {},
      view: function() {
        return m(".paragraph", m(".left_image"), m(".right_image"), head_menu(state));
      }
    });
  });

  GUI.if_exist("#headline", function(dom) {
    var state;
    state = m.prop("finish");
    return m.mount(dom, {
      controller: function() {},
      view: function() {
        return m(".choice", head_menu(state));
      }
    });
  });

  GUI.if_exist("#to_root", function(dom) {
    return m.mount(dom, {
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
    });
  });

}).call(this);

(function() {
  GUI.if_exist("title", function(dom) {
    return m.mount(dom, {
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
    });
  });

}).call(this);

(function(){
  win.scroll = new ScrollSpy(Url.prop.scroll);
  win.scroll.tick = function(center, sec){
    if (center.subid === "S") {
      doc.seeing_add(center._id, sec);
      if (25 === doc.seeing[center._id]) {
        return m.redraw();
      }
    }
  };
  win.on.scroll_end.push(Layout.move);
  win.on.scroll_end.push(function(){
    return ScrollSpy.capture();
  });
  win.on.resize.push(Layout.move);
}).call(this);

(function() {
  win.deploy();

  win["do"].resize();

  m.endComputation();

}).call(this);

