(function() {
  var data_store, present_canvas, roop;

  roop = function() {
    return requestAnimationFrame(function() {
      m.redraw();
      return roop();
    });
  };

  roop();

  data_store = {};

  present_canvas = function(arg) {
    var arc, dx, dy, dz, height, ref, ref1, width;
    (ref = arg.size, width = ref[0], height = ref[1]), (ref1 = arg.layout, dx = ref1[0], dy = ref1[1], dz = ref1[2]);
    arc = function(ctx, x, y, size, color) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, true);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = color;
      return ctx.stroke();
    };
    return {
      config: function(canvas, is_continue, context) {
        if (is_continue) {
          return;
        }
        return new Layout(canvas, dx, dy, dz);
      },
      data: function() {
        return data_store;
      },
      background: function(arg1) {
        var ctx;
        ctx = arg1.ctx;
        return ctx.clearRect(0, 0, width, height);
      },
      draw: function(arg1) {
        var clientX, clientY, ctx, is_touch, j, len, offset, offsets, ref2, screenX, screenY, state, touches;
        state = arg1.state, ctx = arg1.ctx, offsets = arg1.offsets, is_touch = arg1.is_touch, (ref2 = arg1.event, clientX = ref2.clientX, clientY = ref2.clientY, screenX = ref2.screenX, screenY = ref2.screenY, touches = ref2.touches);
        if (is_touch) {
          for (j = 0, len = offsets.length; j < len; j++) {
            offset = offsets[j];
            arc(ctx, offset.x, offset.y, offsets.length * 10 + 50, "rgba(200,200,200,0.2)");
          }
          if ((screenX != null) && (screenY != null)) {
            arc(ctx, screenX, screenY, 4, "rgba(0,0,0,0.2)");
          }
          if ((clientX != null) && (clientY != null)) {
            return arc(ctx, clientX, clientY, 4, "rgba(0,0,0,0.2)");
          }
        }
      }
    };
  };

  m.mount(document.querySelector("#win"), {
    controller: function() {
      var test;
      this.test = test = {
        orientation: 0,
        motion: 0
      };
      win.on.orientation.push(function() {
        return test.orientation += 1;
      });
      win.on.motion.push(function() {
        return test.motion += 1;
      });
    },
    view: function(c) {
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
        btm = (f + "          ").slice(0, 3);
        return top + "." + btm;
      };
      return m("div", m("style[type='text/css']", "table th, table td { text-align: right; width: 9ex; } canvas { border: 1px solid red; } .bad { color: gray; }"), m("pre", JSON.stringify({
        test: win.test,
        redraw: c.test
      })), m("pre", JSON.stringify({
        browser: head.browser
      })), m("pre", JSON.stringify({
        ua: navigator.userAgent
      })), m("pre", JSON.stringify({
        DPR: window.devicePixelRatio,
        scrolling: win.scrolling,
        orientation: [window.orientation, screen.orientation]
      })), m("pre", JSON.stringify({
        compass: _.round(win.compass, 1),
        is_tap: win.is_tap
      })), m.component(Canvas, "#head", present_canvas, {
        size: [800, 600],
        layout: [-10, 10, 100]
      }), m.component(Canvas, "#tail", present_canvas, {
        size: [600, 400],
        layout: [10, -10, 100]
      }), m("table", m("thead", m("tr", m("th"), m("th", "x"), m("th", "y"), m("th", "z"), m("th"))), m("tbody", m("tr", m("td", "accel"), m("td", _.round(win.accel.x, 2)), m("td", _.round(win.accel.y, 2)), m("td", _.round(win.accel.z, 2)), m("td"))), m("tbody", m("tr", m("td", "gravity"), m("td", _.round(win.gravity.x, 2)), m("td", _.round(win.gravity.y, 2)), m("td", _.round(win.gravity.z, 2)), m("td"))), m("thead", m("tr", m("th"), m("th", "alpha"), m("th", "beta"), m("th", "gamma"), m("th"))), m("tbody", m("tr", m("td", "rotate"), m("td", _.round(win.rotate.alpha, 2)), m("td", _.round(win.rotate.beta, 2)), m("td", _.round(win.rotate.gamma, 2)), m("td"))), m("tbody", m("tr", m("td", "orientation"), m("td", _.round(win.orientation.alpha, 2)), m("td", _.round(win.orientation.beta, 2)), m("td", _.round(win.orientation.gamma, 2)), m("td")))), m("table", m("thead", m("tr", m("th"), m("th", "width"), m("th", "height"), m("th", "horizon"), m("th", "left"), m("th", "right"), m("th", "top"), m("th", "bottom"), m("td"))), m("tbody", m("tr", m("td", "win"), m("td", _.round(win.width)), m("td", _.round(win.height)), m("td", _.round(win.horizon)), m("td", _.round(win.left)), m("td", _.round(win.right)), m("td", _.round(win.top)), m("td", _.round(win.bottom)), m("td"))), m("tbody", m("tr", m("td", "window.inner"), m("td", _.round(window.innerWidth)), m("td", _.round(window.innerHeight)), m("td", _.round(window.innerHeight / 2)), m("td", _.round(window.scrollX)), m("td", _.round(window.innerWidth + window.scrollX)), m("td", _.round(window.scrollY)), m("td", _.round(window.scrollY + window.innerHeight)), m("td"))), m("tbody", m("tr", m("td", "(alias)"), m("td"), m("td"), m("td"), m("td", _.round(window.pageXOffset)), m("td"), m("td", _.round(window.pageYOffset)), m("td"), m("td"))), m("tbody", m("tr", m("td", "(ios not work)"), m("td", _.round(window.outerWidth)), m("td", _.round(window.outerHeight)), m("td"), m("td"), m("td"), m("td"), m("td"), m("td"))), m("tbody", m("tr", m("td", "screen"), m("td", _.round(screen.width)), m("td", _.round(screen.height)), m("td"), m("td", _.round(screen.left)), m("td", _.round(screen.right)), m("td", _.round(screen.top)), m("td", _.round(screen.bottom)), m("td"))), m("tbody", m("tr", m("td", "screen.avail〜"), m("td", _.round(screen.availWidth)), m("td", _.round(screen.availHeight)), m("td"), m("td", _.round(screen.availLeft)), m("td", _.round(screen.availRight)), m("td", _.round(screen.availTop)), m("td", _.round(screen.availBottom)), m("td"))), m("tbody", m("tr", m("td", "document"), m("td", _.round(document.width)), m("td", _.round(document.height)), m("td"), m("td", _.round(document.left)), m("td", _.round(document.right)), m("td", _.round(document.top)), m("td", _.round(document.bottom)), m("td"))), m("tbody", m("tr", m("td", "document.documentElement"), m("td", _.round(document.documentElement.clientWidth)), m("td", _.round(document.documentElement.clientHeight)), m("td"), m("td", _.round(document.documentElement.scrollLeft)), m("td"), m("td", _.round(document.documentElement.scrollTop)), m("td"), m("td"))), document.body ? m("tbody", m("tr", m("td", "document.body"), m("td", _.round(document.body.offsetWidth)), m("td", _.round(document.body.offsetHeight)), m("td"), m("td", _.round(document.body.scrollLeft)), m("td"), m("td", _.round(document.body.scrollTop)), m("td"), m("td"))) : void 0));
    }
  });

  win.on.scroll_end.push(Layout.move);

  win.on.resize.push(Layout.move);

  win.deploy();

  this.expect = chai.expect;

}).call(this);

(function(){
  describe("(browser css)", function(){
    beforeEach(function(done){
      requestAnimationFrame(function(){
        done();
      });
    });
    it("spec spec", function(){
      expect(function(){
        throw "Error";
      }).to['throw']("Error");
    });
    it("disable", function(){
      expect(document.styleSheets[0].disabled = true).to.be.ok;
      expect(document.styleSheets[0].disabled = false).to.not.be.ok;
    });
    it("insert rule", function(done){
      var red;
      done();
      red = mochaStats + " { border: 3px solid red; }";
      document.styleSheets[0].insertRule(red, 0);
      expect(document.styleSheets[0].rules[0].cssText).to.eq(red);
      document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(red, 0);
    });
    it("api test", function(done){
      done();
      expect(document.querySelectorAll("li.pass")[0].tagName).to.eq("LI");
    });
  });
}).call(this);

(function(){
  describe("(basic)", function(){
    it("spec spec", function(){
      expect(function(){
        throw "Error";
      }).to['throw']("Error");
    });
  });
}).call(this);

(function(){
  describe("Mem", function(){
    describe("messages", function(){});
  });
}).call(this);

(function(){
  describe("Mem.face", function(){
    it("bye jelemy", function(){
      return expect(Mem.faces.find("c06")).to.eq(undefined);
    });
  });
  describe("Mem.chr_job", function(){
    it("zoy", function(){
      var chr;
      chr = Mem.chr_jobs.face("c10").list;
      expect(chr[0].job).to.eq("小娘");
      expect(chr[0].chr_set_id).to.eq("ririnra");
      expect(chr[0].chr_job_id).to.eq("ririnra_c10");
      expect(chr[0].face().name).to.eq("ゾーイ");
      expect(chr[0].face().face_id).to.eq("c10");
      expect(chr[1].job).to.eq("小銃協会");
      expect(chr[1].chr_set_id).to.eq("time");
      expect(chr[1].chr_job_id).to.eq("time_c10");
      expect(chr[1].face().name).to.eq("ゾーイ");
      expect(chr[1].face().face_id).to.eq("c10");
    });
    it("iris", function(){
      var chr;
      chr = Mem.chr_jobs.face("c83").list;
      expect(chr[0].job).to.eq("受付");
      expect(chr[0].chr_set_id).to.eq("ririnra");
      expect(chr[0].chr_job_id).to.eq("ririnra_c83");
      expect(chr[0].face().name).to.eq("アイリス");
      expect(chr[0].face().face_id).to.eq("c83");
      expect(chr[1].job).to.eq("虹追い");
      expect(chr[1].chr_set_id).to.eq("mad");
      expect(chr[1].chr_job_id).to.eq("mad_c83");
      expect(chr[1].face().name).to.eq("アイリス");
      expect(chr[1].face().face_id).to.eq("c83");
    });
  });
}).call(this);

(function(){
  describe("Serial", function(){
    describe("parser", function(){
      it("Keys", function(){
        expect(unpack.Keys("a,b,c")).to.eql({
          a: true,
          b: true,
          c: true
        });
        expect(unpack.Keys({
          a: 1,
          b: 1
        })).to.eql({
          a: true,
          b: true
        });
      });
      it("Array", function(){
        expect(unpack.Array("1,2,3")).to.eql(["1", "2", "3"]);
        expect(unpack.Array(",z,")).to.eql(["", "z", ""]);
      });
      it("Date", function(){
        expect(unpack.Date("KfmhEBZ")).to.eq(1400000000000);
        expect(unpack.Date("@@@")).to.not.eq(0);
      });
      it("Number", function(){
        expect(unpack.Number("100")).to.eq(100);
        expect(unpack.Number("-100")).to.eq(-100);
        expect(unpack.Number("1.5")).to.eq(1.5);
        expect(unpack.Number("0")).to.eq(0);
        expect(unpack.Number("aaa")).to.not.eq(0);
      });
      it("Text", function(){
        expect(unpack.Text(null)).to.eq("");
        expect(unpack.Text(undefined)).to.eq("");
        expect(unpack.Text("aaa")).to.eq("aaa");
      });
      it("String", function(){
        expect(unpack.String(null)).to.eq("");
        expect(unpack.String(undefined)).to.eq("");
        expect(unpack.String("aaa")).to.eq("aaa");
      });
      it("Bool", function(){
        expect(unpack.Bool("T")).to.eq(true);
        expect(unpack.Bool("F")).to.eq(false);
      });
      it("(null)", function(){
        expect(unpack[null]("aaa")).to.eq("aaa");
      });
    });
    describe("serializer", function(){
      it("Keys", function(){
        expect(pack.Keys({
          a: true,
          b: true,
          c: true
        })).to.eq("a,b,c");
        expect(pack.Keys({
          a: 1,
          b: 1
        })).to.eq("a,b");
      });
      it("Array", function(){
        expect(pack.Array([1, 2, 3])).to.eq("1,2,3");
        expect(pack.Array(["", "z", ""])).to.eq(",z,");
      });
      it("Date", function(){
        expect(pack.Date(1400000000000)).to.eq("KfmhEBZ");
      });
      it("Number", function(){
        expect(pack.Number(100)).to.eq("100");
        expect(pack.Number(-100)).to.eq("-100");
        expect(pack.Number(1.5)).to.eq("1%2e5");
        expect(pack.Number(0)).to.eq("0");
        expect(pack.Number(Number.NaN)).to.eq("NaN");
      });
      it("Text", function(){
        expect(pack.Text(null)).to.eq("");
        expect(pack.Text(undefined)).to.eq("");
        expect(pack.Text("aaa")).to.eq("aaa");
      });
      it("String", function(){
        expect(pack.String(null)).to.eq("");
        expect(pack.String(undefined)).to.eq("");
        expect(pack.String("aaa")).to.eq("aaa");
      });
      it("Bool", function(){
        expect(pack.Bool(true)).to.eq("T");
        expect(pack.Bool(false)).to.eq("F");
      });
      it("(null)", function(){
        expect(pack[null]("aaa")).to.eq("aaa");
      });
    });
    describe("url", function(){
      it("Array", function(){
        expect("a,b,c").to.match(new RegExp(Serial.url.Array));
      });
      it("Date", function(){
        expect("1400000000000").to.match(new RegExp(Serial.url.Date));
      });
      it("Number", function(){
        expect("-100").to.match(new RegExp(Serial.url.Number));
        expect("100").to.match(new RegExp(Serial.url.Number));
        expect("3.5").to.match(new RegExp(Serial.url.Number));
      });
      it("String", function(){
        expect("a,b^c~d").to.match(new RegExp(Serial.url.String));
      });
      it("(null)", function(){
        expect("a,b^c~d").to.match(new RegExp(Serial.url[null]));
      });
    });
    describe("id", function(){
      it("now", function(){
        expect(Serial.ID.now()).to.not.eq(Serial.ID.now());
        expect(Serial.ID.now().slice(3, 9)).to.eq(Serial.ID.now().slice(3, 9));
      });
    });
  });
}).call(this);

(function(){
  describe("Timer", function(){
    describe("module", function(){
      it("time_stamp", function(){
        expect(Timer.time_stamp(1400000000000)).to.eq("(水) 午前01時53分");
        expect(Timer.time_stamp(Number.NaN)).to.eq("(？) ？？..時..分");
        return expect(Timer.time_stamp(1400000000000)).to.eq("(水) 午前01時53分");
      });
      it("date_time_stamp", function(){
        expect(Timer.date_time_stamp(1400000000000)).to.eq("2014-05-14 (水) 午前02時頃");
        expect(Timer.date_time_stamp(Number.NaN)).to.eq("....-..-.. (？) ？？..時頃");
        expect(Timer.date_time_stamp(1400000000000)).to.eq("2014-05-14 (水) 午前02時頃");
      });
    });
    describe("object", function(){
      it("show lax time", function(){
        var clock, attr, t;
        clock = sinon.useFakeTimers(0);
        attr = {
          onunload: function(){},
          update: function(text){}
        };
        (t = new Timer(clock.now - 10800000)) && t.start(attr) && expect(t.text).to.not.eq("3時間前");
        (t = new Timer(clock.now - 10800000 + 2)) && t.start(attr) && expect(t.text).to.eq("2時間前");
        (t = new Timer(clock.now - 3600000)) && t.start(attr) && expect(t.text).to.eq("1時間前");
        (t = new Timer(clock.now - 3600000 + 2)) && t.start(attr) && expect(t.text).to.eq("59分前");
        (t = new Timer(clock.now - 120000)) && t.start(attr) && expect(t.text).to.eq("2分前");
        (t = new Timer(clock.now - 60000)) && t.start(attr) && expect(t.text).to.eq("1分前");
        (t = new Timer(clock.now - 60000 + 2)) && t.start(attr) && expect(t.text).to.eq("1分以内");
        (t = new Timer(clock.now - 25000)) && t.start(attr) && expect(t.text).to.eq("1分以内");
        (t = new Timer(clock.now - 25000 + 2)) && t.start(attr) && expect(t.text).to.eq("25秒以内");
        (t = new Timer(clock.now + 25000 - 2)) && t.start(attr) && expect(t.text).to.eq("25秒以内");
        (t = new Timer(clock.now + 25000)) && t.start(attr) && expect(t.text).to.eq("1分以内");
        (t = new Timer(clock.now + 60000 - 2)) && t.start(attr) && expect(t.text).to.eq("1分以内");
        (t = new Timer(clock.now + 60000)) && t.start(attr) && expect(t.text).to.eq("1分後");
        (t = new Timer(clock.now + 120000)) && t.start(attr) && expect(t.text).to.eq("2分後");
        (t = new Timer(clock.now + 3600000 - 2)) && t.start(attr) && expect(t.text).to.eq("59分後");
        (t = new Timer(clock.now + 3600000)) && t.start(attr) && expect(t.text).to.eq("1時間後");
        (t = new Timer(clock.now + 10800000 - 2)) && t.start(attr) && expect(t.text).to.eq("2時間後");
        (t = new Timer(clock.now + 10800000)) && t.start(attr) && expect(t.text).to.not.eq("3時間後");
        clock.restore();
      });
      it("show lax time by tick", function(){
        var clock, attr, timer;
        clock = sinon.useFakeTimers(0);
        attr = {
          onunload: function(){},
          update: function(text){}
        };
        timer = new Timer(10800000);
        timer.start(attr);
        clock.tick(7200000) && timer.tick(clock.now) && expect(timer.text).to.eq("1時間後");
        clock.tick(60000) && timer.tick(clock.now) && expect(timer.text).to.eq("59分後");
        clock.tick(58 * 60000) && timer.tick(clock.now) && expect(timer.text).to.eq("1分後");
        clock.tick(1) && timer.tick(clock.now) && expect(timer.text).to.eq("1分以内");
        clock.tick(35000) && timer.tick(clock.now) && expect(timer.text).to.eq("25秒以内");
        clock.tick(49998) && timer.tick(clock.now) && expect(timer.text).to.eq("25秒以内");
        clock.tick(35000) && timer.tick(clock.now) && expect(timer.text).to.eq("1分以内");
        clock.tick(1) && timer.tick(clock.now) && expect(timer.text).to.eq("1分前");
        clock.tick(58 * 60000) && timer.tick(clock.now) && expect(timer.text).to.eq("59分前");
        clock.tick(60000) && timer.tick(clock.now) && expect(timer.text).to.eq("1時間前");
        clock.restore();
      });
    });
  });
}).call(this);

(function(){
  var url_bind, url_props;
  url_bind = {
    fname: [
      {
        fname: "test_mocha",
        title: "基本"
      }, {
        fname: "other",
        title: "変更"
      }
    ]
  };
  url_props = {
    aaa: {
      current: 1,
      type: "Number"
    },
    bbb: {
      current: "B"
    },
    ccc: {
      current: "C"
    },
    ddd: {
      current: 1400000000000,
      type: "Date"
    },
    fname: null,
    ext: null,
    title: null
  };
  Url.define(url_props);
  Url.binds(url_bind);
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
  describe("Url", function(){
    describe("should capture file name", function(){
      it("file", function(done){
        Url.popstate();
        setTimeout(function(){
          expect(Url.prop.fname()).to.eq("test_mocha");
          expect(Url.prop.ext()).to.eq("html");
          return done();
        }, 10);
      });
    });
    describe("popstate url", function(){
      it("param", function(done){
        Url.popstate();
        setTimeout(function(){
          expect(Url.prop.aaa()).to.eq(1);
          expect(Url.prop.bbb()).to.eq("B");
          expect(Url.prop.ccc()).to.eq("C");
          expect(Url.prop.ddd()).to.eq(1400000000000);
          expect(Url.location().search).to.eq("?param=1~B~C~KfmhEBZ");
          return done();
        }, 10);
      });
    });
    describe("bind variable", function(){
      it("location other", function(){
        Url.prop.fname("other");
        expect(Url.prop.title()).to.eq("変更");
      });
      it("location basic", function(){
        Url.prop.fname("test_mocha");
        expect(Url.prop.title()).to.eq("基本");
      });
    });
  });
}).call(this);

(function(){
  describe("Mem.ables", function(){
    var do_test_selects;
    do_test_selects = function(able){
      return it(able._id + "", function(){
        expect(['prologue', 'start', 'main', 'epilogue']).to.include.members(Object.keys(able.at));
        expect(able.change).to.exist;
      });
    };
    describe("has switch", function(){
      var i$, ref$, len$, role;
      for (i$ = 0, len$ = (ref$ = Mem.ables.where(fn$).list).length; i$ < len$; ++i$) {
        role = ref$[i$];
        do_test_selects(role);
      }
      function fn$(o){
        return o.sw != null;
      }
    });
    describe("has target", function(){
      var i$, ref$, len$, role;
      for (i$ = 0, len$ = (ref$ = Mem.ables.where(fn$).list).length; i$ < len$; ++i$) {
        role = ref$[i$];
        do_test_selects(role);
      }
      function fn$(o){
        return o.target != null;
      }
    });
    describe("has targets", function(){
      var i$, ref$, len$, role;
      for (i$ = 0, len$ = (ref$ = Mem.ables.where(fn$).list).length; i$ < len$; ++i$) {
        role = ref$[i$];
        do_test_selects(role);
      }
      function fn$(o){
        return o.targets != null;
      }
    });
  });
}).call(this);

(function(){
  describe("(sow) Mem.roles", function(){
    var do_test_mob;
    do_test_mob = function(role){
      return it(role.name + "", function(){
        expect(role.ables).to.include.members(["VSAY"]);
      });
    };
    describe(" has VSAY", function(){
      var i$, ref$, len$, role;
      for (i$ = 0, len$ = (ref$ = Mem.roles.where({
        group: "MOB"
      }).list).length; i$ < len$; ++i$) {
        role = ref$[i$];
        do_test_mob(role);
      }
    });
  });
}).call(this);

(function(){
  describe("(sow) Mem.forms", function(){
    var for_all_forms;
    for_all_forms = function(call){
      var i$, ref$, len$, live, lresult$, live_name, j$, ref1$, len1$, turn, results$ = [];
      for (i$ = 0, len$ = (ref$ = ['live', 'executed', 'victim', 'cursed', 'droop', 'suicide', 'feared', 'suddendead']).length; i$ < len$; ++i$) {
        live = ref$[i$];
        lresult$ = [];
        live_name = Mem.roles.find(live).name;
        for (j$ = 0, len1$ = (ref1$ = ['prologue', 'start', 'main', 'epilogue']).length; j$ < len1$; ++j$) {
          turn = ref1$[j$];
          lresult$.push(it(live_name + " " + turn, fn$));
        }
        results$.push(lresult$);
      }
      return results$;
      function fn$(){
        var i$, ref$, len$, role, j$, ref1$, len1$, enemy, k$, ref2$, len2$, mob, form;
        for (i$ = 0, len$ = (ref$ = Mem.roles.list).length; i$ < len$; ++i$) {
          role = ref$[i$];
          for (j$ = 0, len1$ = (ref1$ = ['evil', 'wolf']).length; j$ < len1$; ++j$) {
            enemy = ref1$[j$];
            for (k$ = 0, len2$ = (ref2$ = ['visiter', 'grave', 'alive', 'juror', 'gamemaster']).length; k$ < len2$; ++k$) {
              mob = ref2$[k$];
              Mem.Collection.form.set([{
                enemy: enemy,
                turn: turn,
                live: live,
                chr_job_id: "all_c99",
                _id: "SAY-1",
                win: role.win || "NONE",
                mob: "visiter",
                role: [role._id],
                rolestate: 0x76f,
                sheep: [],
                love: null
              }]);
              form = Mem.forms.list.first;
              call(form);
            }
          }
        }
      }
    };
    describe("can input text", function(){
      for_all_forms(function(form){
        expect(Mem.form_texts.where({
          form_id: form._id,
          mestype: "TSAY"
        }).pluck("format")).to.include.members(["memo", "talk"]);
        return expect(Mem.form_texts.where({
          form_id: form._id,
          mestype: ['SAY', 'GSAY']
        }).pluck("format")).to.include.members(["act", "memo", "talk"]);
      });
    });
  });
}).call(this);


mocha.checkLeaks();
mocha.globals([]);
mocha.run();
