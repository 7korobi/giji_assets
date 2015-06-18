var test;

test = {
  orientation: 0,
  motion: 0
};

win.on.orientation.push(function() {
  test.orientation += 1;
  return m.redraw();
});

win.on.motion.push(function() {
  test.motion += 1;
  return m.redraw();
});

m.module(document.querySelector("#win"), {
  controller: function() {},
  view: function() {
    var format;
    format = function(n, p) {
      var btm, f, i, top;
      if (n < 0) {
        i = Math.ceil(n);
        f = Math.ceil(p * (i - n));
      } else {
        i = Math.floor(n);
        f = Math.floor(p * (n - i));
      }
      top = ("          " + i).slice(-4);
      btm = ("" + f + "          ").slice(0, 3);
      return "" + top + "." + btm;
    };
    return m("div", m("pre", JSON.stringify({
      redraw: test
    })), m("pre", JSON.stringify({
      accel: {
        x: format(win.accel.x, 100),
        y: format(win.accel.y, 100),
        z: format(win.accel.z, 100)
      }
    })), m("pre", JSON.stringify({
      rotate: {
        alpha: format(win.rotate.alpha, 100),
        beta: format(win.rotate.beta, 100),
        gamma: format(win.rotate.gamma, 100)
      }
    })), m("pre", JSON.stringify({
      gravity: {
        x: format(win.gravity.x, 100),
        y: format(win.gravity.y, 100),
        z: format(win.gravity.z, 100)
      }
    })), m("pre", JSON.stringify({
      compass: format(win.compass, 10)
    })), m("pre", JSON.stringify({
      orientation: {
        alpha: format(win.orientation.alpha, 100),
        beta: format(win.orientation.beta, 100),
        gamma: format(win.orientation.gamma, 100)
      }
    })));
  }
});

if ("ondeviceorientation" in window) {
  window.addEventListener('deviceorientation', win["do"].orientation);
}

if ("ondevicemotion" in window) {
  window.addEventListener('devicemotion', win["do"].motion);
}

beforeEach(function() {
  return jasmine.addMatchers({
    toBePlaying: function() {
      return {
        compare: function(actual, expected) {
          var player;
          player = actual;
          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});
describe("(basic)", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  return it("basic", function(done) {
    jasmine.clock().install();
    expect(true).toBeTruthy();
    jasmine.clock().tick(1000);
    expect(1).not.toBeFalsy();
    expect(0).toBeFalsy();
    expect(null).toBeFalsy();
    expect(false).toBeFalsy();
    jasmine.clock().uninstall();
    return done();
  });
});


/*
  it "spec spec", ->
    spyOn(url, 'value').andReturn true
    expect(url.value "event_id").toEqual true

  it "spec spec", ->
    spyOn(url, 'value').andThrow "bad"
    expect(url.value).toThrow "good"

  it "spec spec", ->
    expect ->
      throw "Error"
    .toThrowError "bad"
 */
;
describe("(browser css)", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  it("disable", function(done) {
    expect(document.styleSheets[0].disabled = true).toBeTruthy();
    done();
    return expect(document.styleSheets[0].disabled = false).toBeFalsy();
  });
  it("insert rule", function(done) {
    var red;
    red = ".bar { border: 3px solid red; }";
    document.styleSheets[0].insertRule(red, 0);
    expect(document.styleSheets[0].rules[0].cssText).toEqual(red);
    done();
    document.styleSheets[0].deleteRule(0);
    return document.styleSheets[0].insertRule(red, 0);
  });
  return it("api test", function(done) {
    done();
    return expect(document.querySelectorAll("li.passed")[0].tagName).toEqual("LI");
  });
});
var event1, fab1, form1, msg1, msg2, msg3, msg4, scene1, scene2, scene3, story1;

new Cache.Rule("site").schema(function() {});

new Cache.Rule("story").schema(function() {
  return this.belongs_to("site");
});

new Cache.Rule("event").schema(function() {
  this.belongs_to("site");
  return this.belongs_to("story");
});

new Cache.Rule("scene").schema(function() {
  this.belongs_to("site");
  this.belongs_to("story");
  return this.belongs_to("event");
});

new Cache.Rule("potof").schema(function() {
  return this.belongs_to("scene");
});

new Cache.Rule("fab").schema(function() {
  return this.belongs_to("message");
});

new Cache.Rule("form").schema(function() {
  this.protect("text");
  return this.belongs_to("scene");
});

scene1 = ID.now();

scene2 = ID.now();

scene3 = ID.now();

story1 = ID.now();

event1 = ID.now();

msg1 = ID.now();

msg2 = ID.now();

msg3 = ID.now();

msg4 = ID.now();

fab1 = ID.now();

form1 = ID.now();

Cache.rule.site.set([
  {
    _id: "a",
    title: "α complex"
  }, {
    _id: "b",
    title: "β complex"
  }
]);

Cache.rule.story.set([
  {
    _id: story1,
    site_id: "a",
    title: "ストーリー１"
  }
]);

Cache.rule.event.set([
  {
    _id: event1,
    site_id: "a",
    story_id: story1,
    title: "イベント１"
  }
]);

Cache.rule.scene.set([
  {
    _id: scene1,
    site_id: "a",
    title: "7korobi-say"
  }, {
    _id: scene2,
    site_id: "b",
    title: "7korobi-say"
  }
]);

Cache.rule.fab.set([
  {
    _id: fab1,
    message_id: msg3,
    name: "7korobi",
    created_at: 10,
    updated_at: 10
  }
]);

Cache.rule.form.set([
  {
    _id: form1,
    scene_id: scene1,
    text: "last submit text."
  }
]);

describe("Cache", function() {
  var cache_message, cache_message_with_scope;
  cache_message = function() {
    new Cache.Rule("message").schema(function() {
      this.order("created_at");
      return this.belongs_to("scene");
    });
    Cache.rule.message.cleanup();
    return Cache.rule.message.merge([
      {
        _id: msg2,
        scene_id: scene2,
        name: "7korobi",
        text: "text 2",
        created_at: 2,
        updated_at: 2
      }, {
        _id: msg3,
        scene_id: scene3,
        name: "7korobi",
        text: "text 3",
        created_at: 3,
        updated_at: 3
      }, {
        _id: msg1,
        scene_id: scene1,
        name: "7korobi",
        text: "text 1",
        created_at: 1,
        updated_at: 1
      }
    ]);
  };
  cache_message_with_scope = function() {
    cache_message();
    return Cache.rule.message.schema(function() {
      var kind;
      kind = function(o) {
        switch (o.scene_id) {
          case scene2:
            return ["also"];
          case scene1:
          case scene3:
            return ["good"];
        }
      };
      return this.scope("of", kind);
    });
  };
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  describe("form input", function() {
    return it("guard user input", function(done) {
      expect(Cache.forms.list().first.text).toEqual("last submit text.");
      Cache.forms.list().first.text = "new user input.";
      expect(Cache.forms.list().first.text).toEqual("new user input.");
      Cache.rule.form.set([
        {
          _id: form1,
          text: "last submit text."
        }
      ]);
      expect(Cache.forms.list().first.text).toEqual("new user input.");
      return done();
    });
  });
  describe("replace item", function() {
    return it("link with data", function(done) {
      var scene;
      expect(Cache.scenes.where({
        event: [event1]
      }).list()).toEqual([]);
      scene = Cache.scenes.list().first;
      scene.event_id = event1;
      Cache.rule.scene.set([scene]);
      expect(Cache.scenes.where({
        event: [event1]
      }).list().length).toEqual(1);
      return done();
    });
  });
  describe("messages", function() {
    it("is not have scope", function(done) {
      cache_message();
      expect(Cache.messages.of).toEqual(void 0);
      return done();
    });
    return it("has scene", function(done) {
      cache_message();
      expect(Cache.messages.where({
        scene: [scene1]
      }).list().length).toEqual(1);
      expect(Cache.messages.where({
        scene: [scene2]
      }).list().length).toEqual(1);
      expect(Cache.messages.where({
        scene: [scene3]
      }).list().length).toEqual(1);
      expect(Cache.messages.where({
        scene: [scene1]
      }).list().first.text).toEqual("text 1");
      expect(Cache.messages.where({
        scene: [scene2]
      }).list().first.text).toEqual("text 2");
      expect(Cache.messages.where({
        scene: [scene3]
      }).list().first.text).toEqual("text 3");
      return done();
    });
  });
  describe("messages with scope", function() {
    it("sepalate items", function(done) {
      cache_message_with_scope();
      expect(Cache.messages.list().length).toEqual(3);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().length).toEqual(1);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().first.text).toEqual("text 2");
      expect(Cache.messages.where({
        of: ["good"]
      }).list().length).toEqual(2);
      expect(Cache.messages.where({
        of: ["good"]
      }).list().first.text).toEqual("text 1");
      expect(Cache.messages.where({
        of: ["good"]
      }).list().last.text).toEqual("text 3");
      return done();
    });
    it("replace item", function(done) {
      cache_message_with_scope();
      Cache.rule.message.merge([
        {
          _id: msg1,
          scene_id: scene2,
          name: "7korobi",
          text: "text 4",
          created_at: 1,
          updated_at: 4
        }
      ]);
      expect(Cache.messages.list().length).toEqual(3);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().length).toEqual(2);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().first.text).toEqual("text 4");
      expect(Cache.messages.where({
        of: ["also"]
      }).list().last.text).toEqual("text 2");
      expect(Cache.messages.where({
        of: ["good"]
      }).list().length).toEqual(1);
      expect(Cache.messages.where({
        of: ["good"]
      }).list().last.text).toEqual("text 3");
      return done();
    });
    return it("append item", function(done) {
      cache_message_with_scope();
      Cache.rule.message.merge([
        {
          _id: msg4,
          scene_id: scene2,
          name: "7korobi",
          text: "text 5",
          created_at: 5,
          updated_at: 5
        }
      ]);
      expect(Cache.messages.list().length).toEqual(4);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().length).toEqual(2);
      expect(Cache.messages.where({
        of: ["also"]
      }).list().first.text).toEqual("text 2");
      expect(Cache.messages.where({
        of: ["also"]
      }).list().last.text).toEqual("text 5");
      expect(Cache.messages.where({
        of: ["good"]
      }).list().length).toEqual(2);
      expect(Cache.messages.where({
        of: ["good"]
      }).list().first.text).toEqual("text 1");
      expect(Cache.messages.where({
        of: ["good"]
      }).list().last.text).toEqual("text 3");
      return done();
    });
  });
  describe("face data", function() {
    it("all values", function(done) {
      expect(Cache.faces.find("all")).toEqual({
        face_id: "all",
        name: "パルック",
        order: 99999,
        _id: "all"
      });
      expect(Cache.faces.list().length).toEqual(244);
      expect(Cache.chr_jobs.list().length).toEqual(706);
      expect(Cache.chr_jobs.where({
        chr_set: ["all"]
      }).list().length).toEqual(244);
      return done();
    });
    return it("delete item", function(done) {
      Cache.rule.face.reject([
        {
          _id: "all"
        }
      ]);
      expect(Cache.faces.find("all")).toEqual(void 0);
      expect(Cache.faces.list().length).toEqual(243);
      expect(Cache.chr_jobs.list().length).toEqual(705);
      expect(Cache.chr_jobs.where({
        chr_set: ["all"]
      }).list().length).toEqual(243);
      return done();
    });
  });
  return describe("import sample data", function() {
    return it("get all item", function(done) {
      var event, _i, _len, _ref;
      new Cache.Rule("message").schema(function() {
        this.order("updated_at");
        this.belongs_to("face");
        this.belongs_to("event");
        this.belongs_to("sow_auth");
        this.scope("logid", function(o) {
          return [o.logid];
        });
        this.scope("unread", function(o) {
          return null;
        });
        this.scope("info", function(o) {
          return o.is.info && o.security;
        });
        this.scope("action", function(o) {
          return o.is.action && o.security;
        });
        this.scope("talk", function(o) {
          return o.is.talk && o.security;
        });
        this.scope("memo", function(o) {
          return o.is.memo && o.security;
        });
        return this.deploy(function(o) {
          var anchor_num, vdom;
          o._id = o.event_id + "-" + o.logid;
          o.security = (function() {
            switch (false) {
              case !o.logid.match(/^([D].\d+)/):
                return ["delete", "think", "all"];
              case !o.logid.match(/^([qcS].\d+)|(MM\d+)/):
                return ["open", "clan", "think", "all"];
              case o.mestype !== "MAKER":
                return ["announce", "open", "clan", "think", "all"];
              case o.mestype !== "ADMIN":
                return ["announce", "open", "clan", "think", "all"];
              case !o.logid.match(/^([I].\d+)|(vilinfo)|(potofs)/):
                return ["announce", "open", "clan", "think", "all"];
              case !o.logid.match(/^([Ti].\d+)/):
                return ["think", "all"];
              case !o.logid.match(/^([\-WPX].\d+)/):
                return ["clan", "all"];
              default:
                return [];
            }
          })();
          o.scene_id = o.event_id + "-" + o.security[0];
          anchor_num = o.logid.substring(2) - 0 || 0;
          o.anchor = RAILS.log.anchor[o.logid[0]] + anchor_num || "";
          if (o.updated_at == null) {
            o.updated_at = new Date(o.date) - 0;
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
          return o.search_words = o.log;
        });
      });
      done();
      if (sample.messages != null) {
        Cache.rule.message.merge(sample.messages);
      }
      if (sample.events != null) {
        _ref = sample.events;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          Cache.rule.message.merge(event.messages, {
            event_id: event._id
          });
        }
      }
      return expect(Cache.messages.list().length).toEqual(1604);
    });
  });
});
describe("FixedBox", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  return describe("adjust", function() {});
});
describe("Serial", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  describe("parser", function() {
    it("Array", function(done) {
      expect(Serial.parser.Array("1,2,3")).toEqual(["1", "2", "3"]);
      expect(Serial.parser.Array(",z,")).toEqual(["", "z", ""]);
      return done();
    });
    it("Date", function(done) {
      expect(Serial.parser.Date("KfmhEBZ")).toEqual(1400000000000);
      expect(Serial.parser.Date("@@@")).toEqual(Number.NaN);
      return done();
    });
    it("Number", function(done) {
      expect(Serial.parser.Number("100")).toEqual(100);
      expect(Serial.parser.Number("-100")).toEqual(-100);
      expect(Serial.parser.Number("1.5")).toEqual(1.5);
      expect(Serial.parser.Number("0")).toEqual(0);
      expect(Serial.parser.Number("aaa")).toEqual(Number.NaN);
      return done();
    });
    it("String", function(done) {
      expect(Serial.parser.String("aaa")).toEqual("aaa");
      return done();
    });
    return it("(null)", function(done) {
      expect(Serial.parser[null]("aaa")).toEqual("aaa");
      return done();
    });
  });
  return describe("url", function() {
    it("Array", function(done) {
      expect("a,b,c").toMatch(new RegExp(Serial.url.Array));
      return done();
    });
    it("Date", function(done) {
      expect("1400000000000").toMatch(new RegExp(Serial.url.Date));
      return done();
    });
    it("Number", function(done) {
      expect("-100").toMatch(new RegExp(Serial.url.Number));
      expect("100").toMatch(new RegExp(Serial.url.Number));
      expect("3.5").toMatch(new RegExp(Serial.url.Number));
      return done();
    });
    it("String", function(done) {
      expect("a,b^c~d").toMatch(new RegExp(Serial.url.String));
      return done();
    });
    return it("(null)", function(done) {
      expect("a,b^c~d").toMatch(new RegExp(Serial.url[null]));
      return done();
    });
  });
});
describe("Timer", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  describe("module", function() {
    it("time_stamp", function(done) {
      expect(Timer.time_stamp(1400000000000)).toEqual("(水) 午前01時53分");
      expect(Timer.time_stamp(Number.NaN)).toEqual("(？) ？？..時..分");
      expect(Timer.time_stamp(1400000000000)).toEqual("(水) 午前01時53分");
      return done();
    });
    return it("date_time_stamp", function(done) {
      expect(Timer.date_time_stamp(1400000000000)).toEqual("2014-05-14 (水) 午前02時頃");
      expect(Timer.date_time_stamp(Number.NaN)).toEqual("....-..-.. (？) ？？..時頃");
      expect(Timer.date_time_stamp(1400000000000)).toEqual("2014-05-14 (水) 午前02時頃");
      return done();
    });
  });
  return describe("object", function() {
    it("show lax time", function(done) {
      jasmine.clock().install();
      jasmine.clock().tick(0);
      jasmine.clock().uninstall();
      expect(new Timer(_.now() - 10800000).text).not.toEqual("3時間前");
      expect(new Timer(_.now() - 10800000 + 2).text).toEqual("2時間前");
      expect(new Timer(_.now() - 3600000).text).toEqual("1時間前");
      expect(new Timer(_.now() - 3600000 + 2).text).toEqual("59分前");
      expect(new Timer(_.now() - 120000).text).toEqual("2分前");
      expect(new Timer(_.now() - 60000).text).toEqual("1分前");
      expect(new Timer(_.now() - 60000 + 2).text).toEqual("1分以内");
      expect(new Timer(_.now() - 25000).text).toEqual("1分以内");
      expect(new Timer(_.now() - 25000 + 2).text).toEqual("25秒以内");
      expect(new Timer(_.now() + 25000 - 2).text).toEqual("25秒以内");
      expect(new Timer(_.now() + 25000).text).toEqual("1分以内");
      expect(new Timer(_.now() + 60000 - 2).text).toEqual("1分以内");
      expect(new Timer(_.now() + 60000).text).toEqual("1分後");
      expect(new Timer(_.now() + 120000).text).toEqual("2分後");
      expect(new Timer(_.now() + 3600000 - 2).text).toEqual("59分後");
      expect(new Timer(_.now() + 3600000).text).toEqual("1時間後");
      expect(new Timer(_.now() + 10800000 - 2).text).toEqual("2時間後");
      expect(new Timer(_.now() + 10800000).text).not.toEqual("3時間後");
      return done();
    });
    return it("show lax time by tick", function(done) {
      var timer;
      jasmine.clock().install();
      timer = new Timer(_.now() + 10800000);
      jasmine.clock().tick(7200000) && expect(timer.text).toEqual("1時間後");
      jasmine.clock().tick(60000) && expect(timer.text).toEqual("59分後");
      jasmine.clock().tick(58 * 60000) && expect(timer.text).toEqual("1分後");
      jasmine.clock().tick(1) && expect(timer.text).toEqual("1分以内");
      jasmine.clock().tick(35000) && expect(timer.text).toEqual("25秒以内");
      jasmine.clock().tick(49998) && expect(timer.text).toEqual("25秒以内");
      jasmine.clock().tick(35000) && expect(timer.text).toEqual("1分以内");
      jasmine.clock().tick(1) && expect(timer.text).toEqual("1分前");
      jasmine.clock().tick(58 * 60000) && expect(timer.text).toEqual("59分前");
      jasmine.clock().tick(60000) && expect(timer.text).toEqual("1時間前");
      jasmine.clock().uninstall();
      return done();
    });
  });
});
var url_bind, url_props;

url_bind = {
  fname: {
    jasmine: {
      fname: "jasmine",
      title: "基本"
    },
    other: {
      fname: "other",
      title: "変更"
    }
  }
};

url_props = {
  aaa: {
    current: 1,
    type: "Number"
  },
  bbb: {
    current: "B",
    type: "String"
  },
  ccc: {
    current: "C",
    type: "String"
  },
  ddd: {
    current: 1400000000000,
    type: "Date"
  },
  fname: {
    current: null,
    type: "String"
  },
  ext: {
    current: null,
    type: "String"
  },
  title: {
    current: null,
    type: "String"
  }
};

Url.define(url_props, url_bind);

Url.routes = {
  pathname: {
    file: new Url("/:fname.:ext")
  },
  search: {
    param: new Url("param=:aaa~:bbb~:ccc~:ddd", {
      unmatch: "?"
    })
  }
};

describe("Url", function() {
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  describe("should capture file name", function() {
    it("(global)", function(done) {
      Url.popstate();
      done();
      expect(Url.prop.fname()).toEqual("jasmine");
      return expect(Url.prop.ext()).toEqual("html");
    });
    return it("file", function(done) {
      Url.popstate();
      done();
      expect(Url.routes.pathname.file.data.fname).toEqual("jasmine");
      return expect(Url.routes.pathname.file.data.ext).toEqual("html");
    });
  });
  describe("popstate url", function(done) {
    return it("param", function(done) {
      Url.popstate();
      done();
      expect(Url.routes.search.param.data.aaa).toEqual(1);
      expect(Url.routes.search.param.data.bbb).toEqual("B");
      expect(Url.routes.search.param.data.ccc).toEqual("C");
      return expect(Url.routes.search.param.data.ddd).toEqual(1400000000000);
    });
  });
  return describe("bind variable", function(done) {
    it("location other", function(done) {
      Url.popstate();
      Url.prop.fname("other");
      expect(Url.prop.title()).toEqual("変更");
      return done();
    });
    return it("location basic", function(done) {
      Url.popstate();
      Url.prop.fname("jasmine");
      expect(Url.prop.title()).toEqual("基本");
      return done();
    });
  });
});

mocha.checkLeaks();
mocha.globals([]);
mocha.run();
