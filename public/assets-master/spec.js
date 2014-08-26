/*
Copyright (c) 2008-2013 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getJasmineRequireObj() {
  if (typeof module !== "undefined" && module.exports) {
    return exports;
  } else {
    window.jasmineRequire = window.jasmineRequire || {};
    return window.jasmineRequire;
  }
}

getJasmineRequireObj().core = function(jRequire) {
  var j$ = {};

  jRequire.base(j$);
  j$.util = jRequire.util();
  j$.Any = jRequire.Any();
  j$.CallTracker = jRequire.CallTracker();
  j$.Clock = jRequire.Clock();
  j$.DelayedFunctionScheduler = jRequire.DelayedFunctionScheduler();
  j$.Env = jRequire.Env(j$);
  j$.ExceptionFormatter = jRequire.ExceptionFormatter();
  j$.Expectation = jRequire.Expectation();
  j$.buildExpectationResult = jRequire.buildExpectationResult();
  j$.JsApiReporter = jRequire.JsApiReporter();
  j$.matchersUtil = jRequire.matchersUtil(j$);
  j$.ObjectContaining = jRequire.ObjectContaining(j$);
  j$.pp = jRequire.pp(j$);
  j$.QueueRunner = jRequire.QueueRunner();
  j$.ReportDispatcher = jRequire.ReportDispatcher();
  j$.Spec = jRequire.Spec(j$);
  j$.SpyStrategy = jRequire.SpyStrategy();
  j$.Suite = jRequire.Suite();
  j$.Timer = jRequire.Timer();
  j$.version = jRequire.version();

  j$.matchers = jRequire.requireMatchers(jRequire, j$);

  return j$;
};

getJasmineRequireObj().requireMatchers = function(jRequire, j$) {
  var availableMatchers = [
      "toBe",
      "toBeCloseTo",
      "toBeDefined",
      "toBeFalsy",
      "toBeGreaterThan",
      "toBeLessThan",
      "toBeNaN",
      "toBeNull",
      "toBeTruthy",
      "toBeUndefined",
      "toContain",
      "toEqual",
      "toHaveBeenCalled",
      "toHaveBeenCalledWith",
      "toMatch",
      "toThrow",
      "toThrowError"
    ],
    matchers = {};

  for (var i = 0; i < availableMatchers.length; i++) {
    var name = availableMatchers[i];
    matchers[name] = jRequire[name](j$);
  }

  return matchers;
};

getJasmineRequireObj().base = function(j$) {
  j$.unimplementedMethod_ = function() {
    throw new Error("unimplemented method");
  };

  j$.MAX_PRETTY_PRINT_DEPTH = 40;
  j$.DEFAULT_TIMEOUT_INTERVAL = 5000;

  j$.getGlobal = (function() {
    var jasmineGlobal = eval.call(null, "this");
    return function() {
      return jasmineGlobal;
    };
  })();

  j$.getEnv = function(options) {
    var env = j$.currentEnv_ = j$.currentEnv_ || new j$.Env(options);
    //jasmine. singletons in here (setTimeout blah blah).
    return env;
  };

  j$.isArray_ = function(value) {
    return j$.isA_("Array", value);
  };

  j$.isString_ = function(value) {
    return j$.isA_("String", value);
  };

  j$.isNumber_ = function(value) {
    return j$.isA_("Number", value);
  };

  j$.isA_ = function(typeName, value) {
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
  };

  j$.isDomNode = function(obj) {
    return obj.nodeType > 0;
  };

  j$.any = function(clazz) {
    return new j$.Any(clazz);
  };

  j$.objectContaining = function(sample) {
    return new j$.ObjectContaining(sample);
  };

  j$.createSpy = function(name, originalFn) {

    var spyStrategy = new j$.SpyStrategy({
        name: name,
        fn: originalFn,
        getSpy: function() { return spy; }
      }),
      callTracker = new j$.CallTracker(),
      spy = function() {
        callTracker.track({
          object: this,
          args: Array.prototype.slice.apply(arguments)
        });
        return spyStrategy.exec.apply(this, arguments);
      };

    for (var prop in originalFn) {
      if (prop === 'and' || prop === 'calls') {
        throw new Error("Jasmine spies would overwrite the 'and' and 'calls' properties on the object being spied upon");
      }

      spy[prop] = originalFn[prop];
    }

    spy.and = spyStrategy;
    spy.calls = callTracker;

    return spy;
  };

  j$.isSpy = function(putativeSpy) {
    if (!putativeSpy) {
      return false;
    }
    return putativeSpy.and instanceof j$.SpyStrategy &&
      putativeSpy.calls instanceof j$.CallTracker;
  };

  j$.createSpyObj = function(baseName, methodNames) {
    if (!j$.isArray_(methodNames) || methodNames.length === 0) {
      throw "createSpyObj requires a non-empty array of method names to create spies for";
    }
    var obj = {};
    for (var i = 0; i < methodNames.length; i++) {
      obj[methodNames[i]] = j$.createSpy(baseName + '.' + methodNames[i]);
    }
    return obj;
  };
};

getJasmineRequireObj().util = function() {

  var util = {};

  util.inherit = function(childClass, parentClass) {
    var Subclass = function() {
    };
    Subclass.prototype = parentClass.prototype;
    childClass.prototype = new Subclass();
  };

  util.htmlEscape = function(str) {
    if (!str) {
      return str;
    }
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  util.argsToArray = function(args) {
    var arrayOfArgs = [];
    for (var i = 0; i < args.length; i++) {
      arrayOfArgs.push(args[i]);
    }
    return arrayOfArgs;
  };

  util.isUndefined = function(obj) {
    return obj === void 0;
  };

  return util;
};

getJasmineRequireObj().Spec = function(j$) {
  function Spec(attrs) {
    this.expectationFactory = attrs.expectationFactory;
    this.resultCallback = attrs.resultCallback || function() {};
    this.id = attrs.id;
    this.description = attrs.description || '';
    this.fn = attrs.fn;
    this.beforeFns = attrs.beforeFns || function() { return []; };
    this.afterFns = attrs.afterFns || function() { return []; };
    this.onStart = attrs.onStart || function() {};
    this.exceptionFormatter = attrs.exceptionFormatter || function() {};
    this.getSpecName = attrs.getSpecName || function() { return ''; };
    this.expectationResultFactory = attrs.expectationResultFactory || function() { };
    this.queueRunnerFactory = attrs.queueRunnerFactory || function() {};
    this.catchingExceptions = attrs.catchingExceptions || function() { return true; };

    this.timer = attrs.timer || {setTimeout: setTimeout, clearTimeout: clearTimeout};

    if (!this.fn) {
      this.pend();
    }

    this.result = {
      id: this.id,
      description: this.description,
      fullName: this.getFullName(),
      failedExpectations: []
    };
  }

  Spec.prototype.addExpectationResult = function(passed, data) {
    if (passed) {
      return;
    }
    this.result.failedExpectations.push(this.expectationResultFactory(data));
  };

  Spec.prototype.expect = function(actual) {
    return this.expectationFactory(actual, this);
  };

  Spec.prototype.execute = function(onComplete) {
    var self = this,
        timeout;

    this.onStart(this);

    if (this.markedPending || this.disabled) {
      complete();
      return;
    }

    function timeoutable(fn) {
      return function(done) {
        timeout = Function.prototype.apply.apply(self.timer.setTimeout, [j$.getGlobal(), [function() {
          onException(new Error('Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.'));
          done();
        }, j$.DEFAULT_TIMEOUT_INTERVAL]]);

        var callDone = function() {
          clearTimeoutable();
          done();
        };

        fn.call(this, callDone); //TODO: do we care about more than 1 arg?
      };
    }

    function clearTimeoutable() {
      Function.prototype.apply.apply(self.timer.clearTimeout, [j$.getGlobal(), [timeout]]);
      timeout = void 0;
    }

    var allFns = this.beforeFns().concat(this.fn).concat(this.afterFns()),
      allTimeoutableFns = [];
    for (var i = 0; i < allFns.length; i++) {
      var fn = allFns[i];
      allTimeoutableFns.push(fn.length > 0 ? timeoutable(fn) : fn);
    }

    this.queueRunnerFactory({
      fns: allTimeoutableFns,
      onException: onException,
      onComplete: complete
    });

    function onException(e) {
      clearTimeoutable();
      if (Spec.isPendingSpecException(e)) {
        self.pend();
        return;
      }

      self.addExpectationResult(false, {
        matcherName: "",
        passed: false,
        expected: "",
        actual: "",
        error: e
      });
    }

    function complete() {
      self.result.status = self.status();
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }
  };

  Spec.prototype.disable = function() {
    this.disabled = true;
  };

  Spec.prototype.pend = function() {
    this.markedPending = true;
  };

  Spec.prototype.status = function() {
    if (this.disabled) {
      return 'disabled';
    }

    if (this.markedPending) {
      return 'pending';
    }

    if (this.result.failedExpectations.length > 0) {
      return 'failed';
    } else {
      return 'passed';
    }
  };

  Spec.prototype.getFullName = function() {
    return this.getSpecName(this);
  };

  Spec.pendingSpecExceptionMessage = "=> marked Pending";

  Spec.isPendingSpecException = function(e) {
    return e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1;
  };

  return Spec;
};

if (typeof window == void 0 && typeof exports == "object") {
  exports.Spec = jasmineRequire.Spec;
}

getJasmineRequireObj().Env = function(j$) {
  function Env(options) {
    options = options || {};

    var self = this;
    var global = options.global || j$.getGlobal();

    var totalSpecsDefined = 0;

    var catchExceptions = true;

    var realSetTimeout = j$.getGlobal().setTimeout;
    var realClearTimeout = j$.getGlobal().clearTimeout;
    this.clock = new j$.Clock(global, new j$.DelayedFunctionScheduler());

    var runnableLookupTable = {};

    var spies = [];

    var currentSpec = null;
    var currentSuite = null;

    var reporter = new j$.ReportDispatcher([
      "jasmineStarted",
      "jasmineDone",
      "suiteStarted",
      "suiteDone",
      "specStarted",
      "specDone"
    ]);

    this.specFilter = function() {
      return true;
    };

    var equalityTesters = [];

    var customEqualityTesters = [];
    this.addCustomEqualityTester = function(tester) {
      customEqualityTesters.push(tester);
    };

    j$.Expectation.addCoreMatchers(j$.matchers);

    var nextSpecId = 0;
    var getNextSpecId = function() {
      return 'spec' + nextSpecId++;
    };

    var nextSuiteId = 0;
    var getNextSuiteId = function() {
      return 'suite' + nextSuiteId++;
    };

    var expectationFactory = function(actual, spec) {
      return j$.Expectation.Factory({
        util: j$.matchersUtil,
        customEqualityTesters: customEqualityTesters,
        actual: actual,
        addExpectationResult: addExpectationResult
      });

      function addExpectationResult(passed, result) {
        return spec.addExpectationResult(passed, result);
      }
    };

    var specStarted = function(spec) {
      currentSpec = spec;
      reporter.specStarted(spec.result);
    };

    var beforeFns = function(suite) {
      return function() {
        var befores = [];
        while(suite) {
          befores = befores.concat(suite.beforeFns);
          suite = suite.parentSuite;
        }
        return befores.reverse();
      };
    };

    var afterFns = function(suite) {
      return function() {
        var afters = [];
        while(suite) {
          afters = afters.concat(suite.afterFns);
          suite = suite.parentSuite;
        }
        return afters;
      };
    };

    var getSpecName = function(spec, suite) {
      return suite.getFullName() + ' ' + spec.description;
    };

    // TODO: we may just be able to pass in the fn instead of wrapping here
    var buildExpectationResult = j$.buildExpectationResult,
        exceptionFormatter = new j$.ExceptionFormatter(),
        expectationResultFactory = function(attrs) {
          attrs.messageFormatter = exceptionFormatter.message;
          attrs.stackFormatter = exceptionFormatter.stack;

          return buildExpectationResult(attrs);
        };

    // TODO: fix this naming, and here's where the value comes in
    this.catchExceptions = function(value) {
      catchExceptions = !!value;
      return catchExceptions;
    };

    this.catchingExceptions = function() {
      return catchExceptions;
    };

    var maximumSpecCallbackDepth = 20;
    var currentSpecCallbackDepth = 0;

    function clearStack(fn) {
      currentSpecCallbackDepth++;
      if (currentSpecCallbackDepth >= maximumSpecCallbackDepth) {
        currentSpecCallbackDepth = 0;
        realSetTimeout(fn, 0);
      } else {
        fn();
      }
    }

    var catchException = function(e) {
      return j$.Spec.isPendingSpecException(e) || catchExceptions;
    };

    var queueRunnerFactory = function(options) {
      options.catchException = catchException;
      options.clearStack = options.clearStack || clearStack;

      new j$.QueueRunner(options).execute();
    };

    var topSuite = new j$.Suite({
      env: this,
      id: getNextSuiteId(),
      description: 'Jasmine__TopLevel__Suite',
      queueRunner: queueRunnerFactory,
      resultCallback: function() {} // TODO - hook this up
    });
    runnableLookupTable[topSuite.id] = topSuite;
    currentSuite = topSuite;

    this.topSuite = function() {
      return topSuite;
    };

    this.execute = function(runnablesToRun) {
      runnablesToRun = runnablesToRun || [topSuite.id];

      var allFns = [];
      for(var i = 0; i < runnablesToRun.length; i++) {
        var runnable = runnableLookupTable[runnablesToRun[i]];
        allFns.push((function(runnable) { return function(done) { runnable.execute(done); }; })(runnable));
      }

      reporter.jasmineStarted({
        totalSpecsDefined: totalSpecsDefined
      });

      queueRunnerFactory({fns: allFns, onComplete: reporter.jasmineDone});
    };

    this.addReporter = function(reporterToAdd) {
      reporter.addReporter(reporterToAdd);
    };

    this.addMatchers = function(matchersToAdd) {
      j$.Expectation.addMatchers(matchersToAdd);
    };

    this.spyOn = function(obj, methodName) {
      if (j$.util.isUndefined(obj)) {
        throw new Error("spyOn could not find an object to spy upon for " + methodName + "()");
      }

      if (j$.util.isUndefined(obj[methodName])) {
        throw new Error(methodName + '() method does not exist');
      }

      if (obj[methodName] && j$.isSpy(obj[methodName])) {
        //TODO?: should this return the current spy? Downside: may cause user confusion about spy state
        throw new Error(methodName + ' has already been spied upon');
      }

      var spy = j$.createSpy(methodName, obj[methodName]);

      spies.push({
        spy: spy,
        baseObj: obj,
        methodName: methodName,
        originalValue: obj[methodName]
      });

      obj[methodName] = spy;

      return spy;
    };

    var suiteFactory = function(description) {
      var suite = new j$.Suite({
        env: self,
        id: getNextSuiteId(),
        description: description,
        parentSuite: currentSuite,
        queueRunner: queueRunnerFactory,
        onStart: suiteStarted,
        resultCallback: function(attrs) {
          reporter.suiteDone(attrs);
        }
      });

      runnableLookupTable[suite.id] = suite;
      return suite;
    };

    this.describe = function(description, specDefinitions) {
      var suite = suiteFactory(description);

      var parentSuite = currentSuite;
      parentSuite.addChild(suite);
      currentSuite = suite;

      var declarationError = null;
      try {
        specDefinitions.call(suite);
      } catch (e) {
        declarationError = e;
      }

      if (declarationError) {
        this.it("encountered a declaration exception", function() {
          throw declarationError;
        });
      }

      currentSuite = parentSuite;

      return suite;
    };

    this.xdescribe = function(description, specDefinitions) {
      var suite = this.describe(description, specDefinitions);
      suite.disable();
      return suite;
    };

    var specFactory = function(description, fn, suite) {
      totalSpecsDefined++;

      var spec = new j$.Spec({
        id: getNextSpecId(),
        beforeFns: beforeFns(suite),
        afterFns: afterFns(suite),
        expectationFactory: expectationFactory,
        exceptionFormatter: exceptionFormatter,
        resultCallback: specResultCallback,
        getSpecName: function(spec) {
          return getSpecName(spec, suite);
        },
        onStart: specStarted,
        description: description,
        expectationResultFactory: expectationResultFactory,
        queueRunnerFactory: queueRunnerFactory,
        fn: fn,
        timer: {setTimeout: realSetTimeout, clearTimeout: realClearTimeout}
      });

      runnableLookupTable[spec.id] = spec;

      if (!self.specFilter(spec)) {
        spec.disable();
      }

      return spec;

      function removeAllSpies() {
        for (var i = 0; i < spies.length; i++) {
          var spyEntry = spies[i];
          spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;
        }
        spies = [];
      }

      function specResultCallback(result) {
        removeAllSpies();
        j$.Expectation.resetMatchers();
        customEqualityTesters = [];
        currentSpec = null;
        reporter.specDone(result);
      }
    };

    var suiteStarted = function(suite) {
      reporter.suiteStarted(suite.result);
    };

    this.it = function(description, fn) {
      var spec = specFactory(description, fn, currentSuite);
      currentSuite.addChild(spec);
      return spec;
    };

    this.xit = function(description, fn) {
      var spec = this.it(description, fn);
      spec.pend();
      return spec;
    };

    this.expect = function(actual) {
      return currentSpec.expect(actual);
    };

    this.beforeEach = function(beforeEachFunction) {
      currentSuite.beforeEach(beforeEachFunction);
    };

    this.afterEach = function(afterEachFunction) {
      currentSuite.afterEach(afterEachFunction);
    };

    this.pending = function() {
      throw j$.Spec.pendingSpecExceptionMessage;
    };
  }

  return Env;
};

getJasmineRequireObj().JsApiReporter = function() {

  var noopTimer = {
    start: function(){},
    elapsed: function(){ return 0; }
  };

  function JsApiReporter(options) {
    var timer = options.timer || noopTimer,
        status = "loaded";

    this.started = false;
    this.finished = false;

    this.jasmineStarted = function() {
      this.started = true;
      status = 'started';
      timer.start();
    };

    var executionTime;

    this.jasmineDone = function() {
      this.finished = true;
      executionTime = timer.elapsed();
      status = 'done';
    };

    this.status = function() {
      return status;
    };

    var suites = {};

    this.suiteStarted = function(result) {
      storeSuite(result);
    };

    this.suiteDone = function(result) {
      storeSuite(result);
    };

    function storeSuite(result) {
      suites[result.id] = result;
    }

    this.suites = function() {
      return suites;
    };

    var specs = [];
    this.specStarted = function(result) { };

    this.specDone = function(result) {
      specs.push(result);
    };

    this.specResults = function(index, length) {
      return specs.slice(index, index + length);
    };

    this.specs = function() {
      return specs;
    };

    this.executionTime = function() {
      return executionTime;
    };

  }

  return JsApiReporter;
};

getJasmineRequireObj().Any = function() {

  function Any(expectedObject) {
    this.expectedObject = expectedObject;
  }

  Any.prototype.jasmineMatches = function(other) {
    if (this.expectedObject == String) {
      return typeof other == 'string' || other instanceof String;
    }

    if (this.expectedObject == Number) {
      return typeof other == 'number' || other instanceof Number;
    }

    if (this.expectedObject == Function) {
      return typeof other == 'function' || other instanceof Function;
    }

    if (this.expectedObject == Object) {
      return typeof other == 'object';
    }
    
    if (this.expectedObject == Boolean) {
      return typeof other == 'boolean';
    }

    return other instanceof this.expectedObject;
  };

  Any.prototype.jasmineToString = function() {
    return '<jasmine.any(' + this.expectedClass + ')>';
  };

  return Any;
};

getJasmineRequireObj().CallTracker = function() {

  function CallTracker() {
    var calls = [];

    this.track = function(context) {
      calls.push(context);
    };

    this.any = function() {
      return !!calls.length;
    };

    this.count = function() {
      return calls.length;
    };

    this.argsFor = function(index) {
      var call = calls[index];
      return call ? call.args : [];
    };

    this.all = function() {
      return calls;
    };

    this.allArgs = function() {
      var callArgs = [];
      for(var i = 0; i < calls.length; i++){
        callArgs.push(calls[i].args);
      }

      return callArgs;
    };

    this.first = function() {
      return calls[0];
    };

    this.mostRecent = function() {
      return calls[calls.length - 1];
    };

    this.reset = function() {
      calls = [];
    };
  }

  return CallTracker;
};

getJasmineRequireObj().Clock = function() {
  function Clock(global, delayedFunctionScheduler) {
    var self = this,
      realTimingFunctions = {
        setTimeout: global.setTimeout,
        clearTimeout: global.clearTimeout,
        setInterval: global.setInterval,
        clearInterval: global.clearInterval
      },
      fakeTimingFunctions = {
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval
      },
      installed = false,
      timer;

    self.install = function() {
      replace(global, fakeTimingFunctions);
      timer = fakeTimingFunctions;
      installed = true;
    };

    self.uninstall = function() {
      delayedFunctionScheduler.reset();
      replace(global, realTimingFunctions);
      timer = realTimingFunctions;
      installed = false;
    };

    self.setTimeout = function(fn, delay, params) {
      if (legacyIE()) {
        if (arguments.length > 2) {
          throw new Error("IE < 9 cannot support extra params to setTimeout without a polyfill");
        }
        return timer.setTimeout(fn, delay);
      }
      return Function.prototype.apply.apply(timer.setTimeout, [global, arguments]);
    };

    self.setInterval = function(fn, delay, params) {
      if (legacyIE()) {
        if (arguments.length > 2) {
          throw new Error("IE < 9 cannot support extra params to setInterval without a polyfill");
        }
        return timer.setInterval(fn, delay);
      }
      return Function.prototype.apply.apply(timer.setInterval, [global, arguments]);
    };

    self.clearTimeout = function(id) {
      return Function.prototype.call.apply(timer.clearTimeout, [global, id]);
    };

    self.clearInterval = function(id) {
      return Function.prototype.call.apply(timer.clearInterval, [global, id]);
    };

    self.tick = function(millis) {
      if (installed) {
        delayedFunctionScheduler.tick(millis);
      } else {
        throw new Error("Mock clock is not installed, use jasmine.clock().install()");
      }
    };

    return self;

    function legacyIE() {
      //if these methods are polyfilled, apply will be present
      return !(realTimingFunctions.setTimeout || realTimingFunctions.setInterval).apply;
    }

    function replace(dest, source) {
      for (var prop in source) {
        dest[prop] = source[prop];
      }
    }

    function setTimeout(fn, delay) {
      return delayedFunctionScheduler.scheduleFunction(fn, delay, argSlice(arguments, 2));
    }

    function clearTimeout(id) {
      return delayedFunctionScheduler.removeFunctionWithId(id);
    }

    function setInterval(fn, interval) {
      return delayedFunctionScheduler.scheduleFunction(fn, interval, argSlice(arguments, 2), true);
    }

    function clearInterval(id) {
      return delayedFunctionScheduler.removeFunctionWithId(id);
    }

    function argSlice(argsObj, n) {
      return Array.prototype.slice.call(argsObj, 2);
    }
  }

  return Clock;
};

getJasmineRequireObj().DelayedFunctionScheduler = function() {
  function DelayedFunctionScheduler() {
    var self = this;
    var scheduledLookup = [];
    var scheduledFunctions = {};
    var currentTime = 0;
    var delayedFnCount = 0;

    self.tick = function(millis) {
      millis = millis || 0;
      var endTime = currentTime + millis;

      runScheduledFunctions(endTime);
      currentTime = endTime;
    };

    self.scheduleFunction = function(funcToCall, millis, params, recurring, timeoutKey, runAtMillis) {
      var f;
      if (typeof(funcToCall) === 'string') {
        /* jshint evil: true */
        f = function() { return eval(funcToCall); };
        /* jshint evil: false */
      } else {
        f = funcToCall;
      }

      millis = millis || 0;
      timeoutKey = timeoutKey || ++delayedFnCount;
      runAtMillis = runAtMillis || (currentTime + millis);

      var funcToSchedule = {
        runAtMillis: runAtMillis,
        funcToCall: f,
        recurring: recurring,
        params: params,
        timeoutKey: timeoutKey,
        millis: millis
      };

      if (runAtMillis in scheduledFunctions) {
        scheduledFunctions[runAtMillis].push(funcToSchedule);
      } else {
        scheduledFunctions[runAtMillis] = [funcToSchedule];
        scheduledLookup.push(runAtMillis);
        scheduledLookup.sort(function (a, b) {
          return a - b;
        });
      }

      return timeoutKey;
    };

    self.removeFunctionWithId = function(timeoutKey) {
      for (var runAtMillis in scheduledFunctions) {
        var funcs = scheduledFunctions[runAtMillis];
        var i = indexOfFirstToPass(funcs, function (func) {
          return func.timeoutKey === timeoutKey;
        });

        if (i > -1) {
          if (funcs.length === 1) {
            delete scheduledFunctions[runAtMillis];
            deleteFromLookup(runAtMillis);
          } else {
            funcs.splice(i, 1);
          }

          // intervals get rescheduled when executed, so there's never more
          // than a single scheduled function with a given timeoutKey
          break;
        }
      }
    };

    self.reset = function() {
      currentTime = 0;
      scheduledLookup = [];
      scheduledFunctions = {};
      delayedFnCount = 0;
    };

    return self;

    function indexOfFirstToPass(array, testFn) {
      var index = -1;

      for (var i = 0; i < array.length; ++i) {
        if (testFn(array[i])) {
          index = i;
          break;
        }
      }

      return index;
    }

    function deleteFromLookup(key) {
      var value = Number(key);
      var i = indexOfFirstToPass(scheduledLookup, function (millis) {
        return millis === value;
      });

      if (i > -1) {
        scheduledLookup.splice(i, 1);
      }
    }

    function reschedule(scheduledFn) {
      self.scheduleFunction(scheduledFn.funcToCall,
        scheduledFn.millis,
        scheduledFn.params,
        true,
        scheduledFn.timeoutKey,
        scheduledFn.runAtMillis + scheduledFn.millis);
    }

    function runScheduledFunctions(endTime) {
      if (scheduledLookup.length === 0 || scheduledLookup[0] > endTime) {
        return;
      }

      do {
        currentTime = scheduledLookup.shift();

        var funcsToRun = scheduledFunctions[currentTime];
        delete scheduledFunctions[currentTime];

        for (var i = 0; i < funcsToRun.length; ++i) {
          var funcToRun = funcsToRun[i];
          funcToRun.funcToCall.apply(null, funcToRun.params || []);

          if (funcToRun.recurring) {
            reschedule(funcToRun);
          }
        }
      } while (scheduledLookup.length > 0 &&
              // checking first if we're out of time prevents setTimeout(0)
              // scheduled in a funcToRun from forcing an extra iteration
                 currentTime !== endTime  &&
                 scheduledLookup[0] <= endTime);
    }
  }

  return DelayedFunctionScheduler;
};

getJasmineRequireObj().ExceptionFormatter = function() {
  function ExceptionFormatter() {
    this.message = function(error) {
      var message = error.name +
        ': ' +
        error.message;

      if (error.fileName || error.sourceURL) {
        message += " in " + (error.fileName || error.sourceURL);
      }

      if (error.line || error.lineNumber) {
        message += " (line " + (error.line || error.lineNumber) + ")";
      }

      return message;
    };

    this.stack = function(error) {
      return error ? error.stack : null;
    };
  }

  return ExceptionFormatter;
};

getJasmineRequireObj().Expectation = function() {

  var matchers = {};

  function Expectation(options) {
    this.util = options.util || { buildFailureMessage: function() {} };
    this.customEqualityTesters = options.customEqualityTesters || [];
    this.actual = options.actual;
    this.addExpectationResult = options.addExpectationResult || function(){};
    this.isNot = options.isNot;

    for (var matcherName in matchers) {
      this[matcherName] = matchers[matcherName];
    }
  }

  Expectation.prototype.wrapCompare = function(name, matcherFactory) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0),
        expected = args.slice(0),
        message = "";

      args.unshift(this.actual);

      var matcher = matcherFactory(this.util, this.customEqualityTesters),
          matcherCompare = matcher.compare;

      function defaultNegativeCompare() {
        var result = matcher.compare.apply(null, args);
        result.pass = !result.pass;
        return result;
      }

      if (this.isNot) {
        matcherCompare = matcher.negativeCompare || defaultNegativeCompare;
      }

      var result = matcherCompare.apply(null, args);

      if (!result.pass) {
        if (!result.message) {
          args.unshift(this.isNot);
          args.unshift(name);
          message = this.util.buildFailureMessage.apply(null, args);
        } else {
          message = result.message;
        }
      }

      if (expected.length == 1) {
        expected = expected[0];
      }

      // TODO: how many of these params are needed?
      this.addExpectationResult(
        result.pass,
        {
          matcherName: name,
          passed: result.pass,
          message: message,
          actual: this.actual,
          expected: expected // TODO: this may need to be arrayified/sliced
        }
      );
    };
  };

  Expectation.addCoreMatchers = function(matchers) {
    var prototype = Expectation.prototype;
    for (var matcherName in matchers) {
      var matcher = matchers[matcherName];
      prototype[matcherName] = prototype.wrapCompare(matcherName, matcher);
    }
  };

  Expectation.addMatchers = function(matchersToAdd) {
    for (var name in matchersToAdd) {
      var matcher = matchersToAdd[name];
      matchers[name] = Expectation.prototype.wrapCompare(name, matcher);
    }
  };

  Expectation.resetMatchers = function() {
    for (var name in matchers) {
      delete matchers[name];
    }
  };

  Expectation.Factory = function(options) {
    options = options || {};

    var expect = new Expectation(options);

    // TODO: this would be nice as its own Object - NegativeExpectation
    // TODO: copy instead of mutate options
    options.isNot = true;
    expect.not = new Expectation(options);

    return expect;
  };

  return Expectation;
};

//TODO: expectation result may make more sense as a presentation of an expectation.
getJasmineRequireObj().buildExpectationResult = function() {
  function buildExpectationResult(options) {
    var messageFormatter = options.messageFormatter || function() {},
      stackFormatter = options.stackFormatter || function() {};

    return {
      matcherName: options.matcherName,
      expected: options.expected,
      actual: options.actual,
      message: message(),
      stack: stack(),
      passed: options.passed
    };

    function message() {
      if (options.passed) {
        return "Passed.";
      } else if (options.message) {
        return options.message;
      } else if (options.error) {
        return messageFormatter(options.error);
      }
      return "";
    }

    function stack() {
      if (options.passed) {
        return "";
      }

      var error = options.error;
      if (!error) {
        try {
          throw new Error(message());
        } catch (e) {
          error = e;
        }
      }
      return stackFormatter(error);
    }
  }

  return buildExpectationResult;
};

getJasmineRequireObj().ObjectContaining = function(j$) {

  function ObjectContaining(sample) {
    this.sample = sample;
  }

  ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
    if (typeof(this.sample) !== "object") { throw new Error("You must provide an object to objectContaining, not '"+this.sample+"'."); }

    mismatchKeys = mismatchKeys || [];
    mismatchValues = mismatchValues || [];

    var hasKey = function(obj, keyName) {
      return obj !== null && !j$.util.isUndefined(obj[keyName]);
    };

    for (var property in this.sample) {
      if (!hasKey(other, property) && hasKey(this.sample, property)) {
        mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
      }
      else if (!j$.matchersUtil.equals(this.sample[property], other[property])) {
        mismatchValues.push("'" + property + "' was '" + (other[property] ? j$.util.htmlEscape(other[property].toString()) : other[property]) + "' in actual, but was '" + (this.sample[property] ? j$.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in expected.");
      }
    }

    return (mismatchKeys.length === 0 && mismatchValues.length === 0);
  };

  ObjectContaining.prototype.jasmineToString = function() {
    return "<jasmine.objectContaining(" + j$.pp(this.sample) + ")>";
  };

  return ObjectContaining;
};

getJasmineRequireObj().pp = function(j$) {

  function PrettyPrinter() {
    this.ppNestLevel_ = 0;
  }

  PrettyPrinter.prototype.format = function(value) {
    this.ppNestLevel_++;
    try {
      if (j$.util.isUndefined(value)) {
        this.emitScalar('undefined');
      } else if (value === null) {
        this.emitScalar('null');
      } else if (value === j$.getGlobal()) {
        this.emitScalar('<global>');
      } else if (value.jasmineToString) {
        this.emitScalar(value.jasmineToString());
      } else if (typeof value === 'string') {
        this.emitString(value);
      } else if (j$.isSpy(value)) {
        this.emitScalar("spy on " + value.and.identity());
      } else if (value instanceof RegExp) {
        this.emitScalar(value.toString());
      } else if (typeof value === 'function') {
        this.emitScalar('Function');
      } else if (typeof value.nodeType === 'number') {
        this.emitScalar('HTMLNode');
      } else if (value instanceof Date) {
        this.emitScalar('Date(' + value + ')');
      } else if (value.__Jasmine_been_here_before__) {
        this.emitScalar('<circular reference: ' + (j$.isArray_(value) ? 'Array' : 'Object') + '>');
      } else if (j$.isArray_(value) || j$.isA_('Object', value)) {
        value.__Jasmine_been_here_before__ = true;
        if (j$.isArray_(value)) {
          this.emitArray(value);
        } else {
          this.emitObject(value);
        }
        delete value.__Jasmine_been_here_before__;
      } else {
        this.emitScalar(value.toString());
      }
    } finally {
      this.ppNestLevel_--;
    }
  };

  PrettyPrinter.prototype.iterateObject = function(obj, fn) {
    for (var property in obj) {
      if (!obj.hasOwnProperty(property)) { continue; }
      if (property == '__Jasmine_been_here_before__') { continue; }
      fn(property, obj.__lookupGetter__ ? (!j$.util.isUndefined(obj.__lookupGetter__(property)) &&
          obj.__lookupGetter__(property) !== null) : false);
    }
  };

  PrettyPrinter.prototype.emitArray = j$.unimplementedMethod_;
  PrettyPrinter.prototype.emitObject = j$.unimplementedMethod_;
  PrettyPrinter.prototype.emitScalar = j$.unimplementedMethod_;
  PrettyPrinter.prototype.emitString = j$.unimplementedMethod_;

  function StringPrettyPrinter() {
    PrettyPrinter.call(this);

    this.string = '';
  }

  j$.util.inherit(StringPrettyPrinter, PrettyPrinter);

  StringPrettyPrinter.prototype.emitScalar = function(value) {
    this.append(value);
  };

  StringPrettyPrinter.prototype.emitString = function(value) {
    this.append("'" + value + "'");
  };

  StringPrettyPrinter.prototype.emitArray = function(array) {
    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
      this.append("Array");
      return;
    }

    this.append('[ ');
    for (var i = 0; i < array.length; i++) {
      if (i > 0) {
        this.append(', ');
      }
      this.format(array[i]);
    }
    this.append(' ]');
  };

  StringPrettyPrinter.prototype.emitObject = function(obj) {
    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
      this.append("Object");
      return;
    }

    var self = this;
    this.append('{ ');
    var first = true;

    this.iterateObject(obj, function(property, isGetter) {
      if (first) {
        first = false;
      } else {
        self.append(', ');
      }

      self.append(property);
      self.append(' : ');
      if (isGetter) {
        self.append('<getter>');
      } else {
        self.format(obj[property]);
      }
    });

    this.append(' }');
  };

  StringPrettyPrinter.prototype.append = function(value) {
    this.string += value;
  };

  return function(value) {
    var stringPrettyPrinter = new StringPrettyPrinter();
    stringPrettyPrinter.format(value);
    return stringPrettyPrinter.string;
  };
};

getJasmineRequireObj().QueueRunner = function() {

  function QueueRunner(attrs) {
    this.fns = attrs.fns || [];
    this.onComplete = attrs.onComplete || function() {};
    this.clearStack = attrs.clearStack || function(fn) {fn();};
    this.onException = attrs.onException || function() {};
    this.catchException = attrs.catchException || function() { return true; };
    this.userContext = {};
  }

  QueueRunner.prototype.execute = function() {
    this.run(this.fns, 0);
  };

  QueueRunner.prototype.run = function(fns, recursiveIndex) {
    var length = fns.length,
        self = this,
        iterativeIndex;

    for(iterativeIndex = recursiveIndex; iterativeIndex < length; iterativeIndex++) {
      var fn = fns[iterativeIndex];
      if (fn.length > 0) {
        return attemptAsync(fn);
      } else {
        attemptSync(fn);
      }
    }

    var runnerDone = iterativeIndex >= length;

    if (runnerDone) {
      this.clearStack(this.onComplete);
    }

    function attemptSync(fn) {
      try {
        fn.call(self.userContext);
      } catch (e) {
        handleException(e);
      }
    }

    function attemptAsync(fn) {
      var next = function () { self.run(fns, iterativeIndex + 1); };

      try {
        fn.call(self.userContext, next);
      } catch (e) {
        handleException(e);
        next();
      }
    }

    function handleException(e) {
      self.onException(e);
      if (!self.catchException(e)) {
        //TODO: set a var when we catch an exception and
        //use a finally block to close the loop in a nice way..
        throw e;
      }
    }
  };

  return QueueRunner;
};

getJasmineRequireObj().ReportDispatcher = function() {
  function ReportDispatcher(methods) {

    var dispatchedMethods = methods || [];

    for (var i = 0; i < dispatchedMethods.length; i++) {
      var method = dispatchedMethods[i];
      this[method] = (function(m) {
        return function() {
          dispatch(m, arguments);
        };
      }(method));
    }

    var reporters = [];

    this.addReporter = function(reporter) {
      reporters.push(reporter);
    };

    return this;

    function dispatch(method, args) {
      for (var i = 0; i < reporters.length; i++) {
        var reporter = reporters[i];
        if (reporter[method]) {
          reporter[method].apply(reporter, args);
        }
      }
    }
  }

  return ReportDispatcher;
};


getJasmineRequireObj().SpyStrategy = function() {

  function SpyStrategy(options) {
    options = options || {};

    var identity = options.name || "unknown",
        originalFn = options.fn || function() {},
        getSpy = options.getSpy || function() {},
        plan = function() {};

    this.identity = function() {
      return identity;
    };

    this.exec = function() {
      return plan.apply(this, arguments);
    };

    this.callThrough = function() {
      plan = originalFn;
      return getSpy();
    };

    this.returnValue = function(value) {
      plan = function() {
        return value;
      };
      return getSpy();
    };

    this.throwError = function(something) {
      var error = (something instanceof Error) ? something : new Error(something);
      plan = function() {
        throw error;
      };
      return getSpy();
    };

    this.callFake = function(fn) {
      plan = fn;
      return getSpy();
    };

    this.stub = function(fn) {
      plan = function() {};
      return getSpy();
    };
  }

  return SpyStrategy;
};

getJasmineRequireObj().Suite = function() {
  function Suite(attrs) {
    this.env = attrs.env;
    this.id = attrs.id;
    this.parentSuite = attrs.parentSuite;
    this.description = attrs.description;
    this.onStart = attrs.onStart || function() {};
    this.resultCallback = attrs.resultCallback || function() {};
    this.clearStack = attrs.clearStack || function(fn) {fn();};

    this.beforeFns = [];
    this.afterFns = [];
    this.queueRunner = attrs.queueRunner || function() {};
    this.disabled = false;

    this.children = [];

    this.result = {
      id: this.id,
      status: this.disabled ? 'disabled' : '',
      description: this.description,
      fullName: this.getFullName()
    };
  }

  Suite.prototype.getFullName = function() {
    var fullName = this.description;
    for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {
      if (parentSuite.parentSuite) {
        fullName = parentSuite.description + ' ' + fullName;
      }
    }
    return fullName;
  };

  Suite.prototype.disable = function() {
    this.disabled = true;
  };

  Suite.prototype.beforeEach = function(fn) {
    this.beforeFns.unshift(fn);
  };

  Suite.prototype.afterEach = function(fn) {
    this.afterFns.unshift(fn);
  };

  Suite.prototype.addChild = function(child) {
    this.children.push(child);
  };

  Suite.prototype.execute = function(onComplete) {
    var self = this;
    if (this.disabled) {
      complete();
      return;
    }

    var allFns = [];

    for (var i = 0; i < this.children.length; i++) {
      allFns.push(wrapChildAsAsync(this.children[i]));
    }

    this.onStart(this);

    this.queueRunner({
      fns: allFns,
      onComplete: complete
    });

    function complete() {
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }

    function wrapChildAsAsync(child) {
      return function(done) { child.execute(done); };
    }
  };

  return Suite;
};

if (typeof window == void 0 && typeof exports == "object") {
  exports.Suite = jasmineRequire.Suite;
}

getJasmineRequireObj().Timer = function() {
  function Timer(options) {
    options = options || {};

    var now = options.now || function() { return new Date().getTime(); },
        startTime;

    this.start = function() {
      startTime = now();
    };

    this.elapsed = function() {
      return now() - startTime;
    };
  }

  return Timer;
};

getJasmineRequireObj().matchersUtil = function(j$) {
  // TODO: what to do about jasmine.pp not being inject? move to JSON.stringify? gut PrettyPrinter?

  return {
    equals: function(a, b, customTesters) {
      customTesters = customTesters || [];

      return eq(a, b, [], [], customTesters);
    },

    contains: function(haystack, needle, customTesters) {
      customTesters = customTesters || [];

      if (Object.prototype.toString.apply(haystack) === "[object Array]") {
        for (var i = 0; i < haystack.length; i++) {
          if (eq(haystack[i], needle, [], [], customTesters)) {
            return true;
          }
        }
        return false;
      }
      return haystack.indexOf(needle) >= 0;
    },

    buildFailureMessage: function() {
      var args = Array.prototype.slice.call(arguments, 0),
        matcherName = args[0],
        isNot = args[1],
        actual = args[2],
        expected = args.slice(3),
        englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });

      var message = "Expected " +
        j$.pp(actual) +
        (isNot ? " not " : " ") +
        englishyPredicate;

      if (expected.length > 0) {
        for (var i = 0; i < expected.length; i++) {
          if (i > 0) {
            message += ",";
          }
          message += " " + j$.pp(expected[i]);
        }
      }

      return message + ".";
    }
  };

  // Equality function lovingly adapted from isEqual in
  //   [Underscore](http://underscorejs.org)
  function eq(a, b, aStack, bStack, customTesters) {
    var result = true;

    for (var i = 0; i < customTesters.length; i++) {
      var customTesterResult = customTesters[i](a, b);
      if (!j$.util.isUndefined(customTesterResult)) {
        return customTesterResult;
      }
    }

    if (a instanceof j$.Any) {
      result = a.jasmineMatches(b);
      if (result) {
        return true;
      }
    }

    if (b instanceof j$.Any) {
      result = b.jasmineMatches(a);
      if (result) {
        return true;
      }
    }

    if (b instanceof j$.ObjectContaining) {
      result = b.jasmineMatches(a);
      if (result) {
        return true;
      }
    }

    if (a instanceof Error && b instanceof Error) {
      return a.message == b.message;
    }

    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) { return a !== 0 || 1 / a == 1 / b; }
    // A strict comparison is necessary because `null == undefined`.
    if (a === null || b === null) { return a === b; }
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b)) { return false; }
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a === 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
          a.global == b.global &&
          a.multiline == b.multiline &&
          a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') { return false; }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) { return bStack[length] == b; }
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack, customTesters))) { break; }
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && (aCtor instanceof aCtor) &&
        isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = has(b, key) && eq(a[key], b[key], aStack, bStack, customTesters))) { break; }
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (has(b, key) && !(size--)) { break; }
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();

    return result;

    function has(obj, key) {
      return obj.hasOwnProperty(key);
    }

    function isFunction(obj) {
      return typeof obj === 'function';
    }
  }
};

getJasmineRequireObj().toBe = function() {
  function toBe() {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual === expected
        };
      }
    };
  }

  return toBe;
};

getJasmineRequireObj().toBeCloseTo = function() {

  function toBeCloseTo() {
    return {
      compare: function(actual, expected, precision) {
        if (precision !== 0) {
          precision = precision || 2;
        }

        return {
          pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)
        };
      }
    };
  }

  return toBeCloseTo;
};

getJasmineRequireObj().toBeDefined = function() {
  function toBeDefined() {
    return {
      compare: function(actual) {
        return {
          pass: (void 0 !== actual)
        };
      }
    };
  }

  return toBeDefined;
};

getJasmineRequireObj().toBeFalsy = function() {
  function toBeFalsy() {
    return {
      compare: function(actual) {
        return {
          pass: !!!actual
        };
      }
    };
  }

  return toBeFalsy;
};

getJasmineRequireObj().toBeGreaterThan = function() {

  function toBeGreaterThan() {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual > expected
        };
      }
    };
  }

  return toBeGreaterThan;
};


getJasmineRequireObj().toBeLessThan = function() {
  function toBeLessThan() {
    return {

      compare: function(actual, expected) {
        return {
          pass: actual < expected
        };
      }
    };
  }

  return toBeLessThan;
};
getJasmineRequireObj().toBeNaN = function(j$) {

  function toBeNaN() {
    return {
      compare: function(actual) {
        var result = {
          pass: (actual !== actual)
        };

        if (result.pass) {
          result.message = "Expected actual not to be NaN.";
        } else {
          result.message = "Expected " + j$.pp(actual) + " to be NaN.";
        }

        return result;
      }
    };
  }

  return toBeNaN;
};

getJasmineRequireObj().toBeNull = function() {

  function toBeNull() {
    return {
      compare: function(actual) {
        return {
          pass: actual === null
        };
      }
    };
  }

  return toBeNull;
};

getJasmineRequireObj().toBeTruthy = function() {

  function toBeTruthy() {
    return {
      compare: function(actual) {
        return {
          pass: !!actual
        };
      }
    };
  }

  return toBeTruthy;
};

getJasmineRequireObj().toBeUndefined = function() {

  function toBeUndefined() {
    return {
      compare: function(actual) {
        return {
          pass: void 0 === actual
        };
      }
    };
  }

  return toBeUndefined;
};

getJasmineRequireObj().toContain = function() {
  function toContain(util, customEqualityTesters) {
    customEqualityTesters = customEqualityTesters || [];

    return {
      compare: function(actual, expected) {

        return {
          pass: util.contains(actual, expected, customEqualityTesters)
        };
      }
    };
  }

  return toContain;
};

getJasmineRequireObj().toEqual = function() {

  function toEqual(util, customEqualityTesters) {
    customEqualityTesters = customEqualityTesters || [];

    return {
      compare: function(actual, expected) {
        var result = {
          pass: false
        };

        result.pass = util.equals(actual, expected, customEqualityTesters);

        return result;
      }
    };
  }

  return toEqual;
};

getJasmineRequireObj().toHaveBeenCalled = function(j$) {

  function toHaveBeenCalled() {
    return {
      compare: function(actual) {
        var result = {};

        if (!j$.isSpy(actual)) {
          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');
        }

        if (arguments.length > 1) {
          throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
        }

        result.pass = actual.calls.any();

        result.message = result.pass ?
          "Expected spy " + actual.and.identity() + " not to have been called." :
          "Expected spy " + actual.and.identity() + " to have been called.";

        return result;
      }
    };
  }

  return toHaveBeenCalled;
};

getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {

  function toHaveBeenCalledWith(util) {
    return {
      compare: function() {
        var args = Array.prototype.slice.call(arguments, 0),
          actual = args[0],
          expectedArgs = args.slice(1),
          result = { pass: false };

        if (!j$.isSpy(actual)) {
          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');
        }

        if (!actual.calls.any()) {
          result.message = "Expected spy " + actual.and.identity() + " to have been called with " + j$.pp(expectedArgs) + " but it was never called.";
          return result;
        }

        if (util.contains(actual.calls.allArgs(), expectedArgs)) {
          result.pass = true;
          result.message = "Expected spy " + actual.and.identity() + " not to have been called with " + j$.pp(expectedArgs) + " but it was.";
        } else {
          result.message = "Expected spy " + actual.and.identity() + " to have been called with " + j$.pp(expectedArgs) + " but actual calls were " + j$.pp(actual.calls.allArgs()).replace(/^\[ | \]$/g, '') + ".";
        }

        return result;
      }
    };
  }

  return toHaveBeenCalledWith;
};

getJasmineRequireObj().toMatch = function() {

  function toMatch() {
    return {
      compare: function(actual, expected) {
        var regexp = new RegExp(expected);

        return {
          pass: regexp.test(actual)
        };
      }
    };
  }

  return toMatch;
};

getJasmineRequireObj().toThrow = function(j$) {

  function toThrow(util) {
    return {
      compare: function(actual, expected) {
        var result = { pass: false },
          threw = false,
          thrown;

        if (typeof actual != "function") {
          throw new Error("Actual is not a Function");
        }

        try {
          actual();
        } catch (e) {
          threw = true;
          thrown = e;
        }

        if (!threw) {
          result.message = "Expected function to throw an exception.";
          return result;
        }

        if (arguments.length == 1) {
          result.pass = true;
          result.message = "Expected function not to throw, but it threw " + j$.pp(thrown) + ".";

          return result;
        }

        if (util.equals(thrown, expected)) {
          result.pass = true;
          result.message = "Expected function not to throw " + j$.pp(expected) + ".";
        } else {
          result.message = "Expected function to throw " + j$.pp(expected) + ", but it threw " +  j$.pp(thrown) + ".";
        }

        return result;
      }
    };
  }

  return toThrow;
};

getJasmineRequireObj().toThrowError = function(j$) {
  function toThrowError (util) {
    return {
      compare: function(actual) {
        var threw = false,
          thrown,
          errorType,
          message,
          regexp,
          name,
          constructorName;

        if (typeof actual != "function") {
          throw new Error("Actual is not a Function");
        }

        extractExpectedParams.apply(null, arguments);

        try {
          actual();
        } catch (e) {
          threw = true;
          thrown = e;
        }

        if (!threw) {
          return fail("Expected function to throw an Error.");
        }

        if (!(thrown instanceof Error)) {
          return fail("Expected function to throw an Error, but it threw " + thrown + ".");
        }

        if (arguments.length == 1) {
          return pass("Expected function not to throw an Error, but it threw " + fnNameFor(thrown) + ".");
        }

        if (errorType) {
          name = fnNameFor(errorType);
          constructorName = fnNameFor(thrown.constructor);
        }

        if (errorType && message) {
          if (thrown.constructor == errorType && util.equals(thrown.message, message)) {
            return pass("Expected function not to throw " + name + " with message \"" + message + "\".");
          } else {
            return fail("Expected function to throw " + name + " with message \"" + message +
                        "\", but it threw " + constructorName + " with message \"" + thrown.message + "\".");
          }
        }

        if (errorType && regexp) {
          if (thrown.constructor == errorType && regexp.test(thrown.message)) {
            return pass("Expected function not to throw " + name + " with message matching " + regexp + ".");
          } else {
            return fail("Expected function to throw " + name + " with message matching " + regexp +
                        ", but it threw " + constructorName + " with message \"" + thrown.message + "\".");
          }
        }

        if (errorType) {
          if (thrown.constructor == errorType) {
            return pass("Expected function not to throw " + name + ".");
          } else {
            return fail("Expected function to throw " + name + ", but it threw " + constructorName + ".");
          }
        }

        if (message) {
          if (thrown.message == message) {
            return pass("Expected function not to throw an exception with message " + j$.pp(message) + ".");
          } else {
            return fail("Expected function to throw an exception with message " + j$.pp(message) +
                        ", but it threw an exception with message " + j$.pp(thrown.message) + ".");
          }
        }

        if (regexp) {
          if (regexp.test(thrown.message)) {
            return pass("Expected function not to throw an exception with a message matching " + j$.pp(regexp) + ".");
          } else {
            return fail("Expected function to throw an exception with a message matching " + j$.pp(regexp) +
                        ", but it threw an exception with message " + j$.pp(thrown.message) + ".");
          }
        }

        function fnNameFor(func) {
            return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];
        }

        function pass(notMessage) {
          return {
            pass: true,
            message: notMessage
          };
        }

        function fail(message) {
          return {
            pass: false,
            message: message
          };
        }

        function extractExpectedParams() {
          if (arguments.length == 1) {
            return;
          }

          if (arguments.length == 2) {
            var expected = arguments[1];

            if (expected instanceof RegExp) {
              regexp = expected;
            } else if (typeof expected == "string") {
              message = expected;
            } else if (checkForAnErrorType(expected)) {
              errorType = expected;
            }

            if (!(errorType || message || regexp)) {
              throw new Error("Expected is not an Error, string, or RegExp.");
            }
          } else {
            if (checkForAnErrorType(arguments[1])) {
              errorType = arguments[1];
            } else {
              throw new Error("Expected error type is not an Error.");
            }

            if (arguments[2] instanceof RegExp) {
              regexp = arguments[2];
            } else if (typeof arguments[2] == "string") {
              message = arguments[2];
            } else {
              throw new Error("Expected error message is not a string or RegExp.");
            }
          }
        }

        function checkForAnErrorType(type) {
          if (typeof type !== "function") {
            return false;
          }

          var Surrogate = function() {};
          Surrogate.prototype = type.prototype;
          return (new Surrogate()) instanceof Error;
        }
      }
    };
  }

  return toThrowError;
};

getJasmineRequireObj().version = function() {
  return "2.0.0";
};
/*
Copyright (c) 2008-2013 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

jasmineRequire.html = function(j$) {
  j$.ResultsNode = jasmineRequire.ResultsNode();
  j$.HtmlReporter = jasmineRequire.HtmlReporter(j$);
  j$.QueryString = jasmineRequire.QueryString();
  j$.HtmlSpecFilter = jasmineRequire.HtmlSpecFilter();
};

jasmineRequire.HtmlReporter = function(j$) {

  var noopTimer = {
    start: function() {},
    elapsed: function() { return 0; }
  };

  function HtmlReporter(options) {
    var env = options.env || {},
      getContainer = options.getContainer,
      createElement = options.createElement,
      createTextNode = options.createTextNode,
      onRaiseExceptionsClick = options.onRaiseExceptionsClick || function() {},
      timer = options.timer || noopTimer,
      results = [],
      specsExecuted = 0,
      failureCount = 0,
      pendingSpecCount = 0,
      htmlReporterMain,
      symbols;

    this.initialize = function() {
      htmlReporterMain = createDom("div", {className: "html-reporter"},
        createDom("div", {className: "banner"},
          createDom("span", {className: "title"}, "Jasmine"),
          createDom("span", {className: "version"}, j$.version)
        ),
        createDom("ul", {className: "symbol-summary"}),
        createDom("div", {className: "alert"}),
        createDom("div", {className: "results"},
          createDom("div", {className: "failures"})
        )
      );
      getContainer().appendChild(htmlReporterMain);

      symbols = find(".symbol-summary");
    };

    var totalSpecsDefined;
    this.jasmineStarted = function(options) {
      totalSpecsDefined = options.totalSpecsDefined || 0;
      timer.start();
    };

    var summary = createDom("div", {className: "summary"});

    var topResults = new j$.ResultsNode({}, "", null),
      currentParent = topResults;

    this.suiteStarted = function(result) {
      currentParent.addChild(result, "suite");
      currentParent = currentParent.last();
    };

    this.suiteDone = function(result) {
      if (currentParent == topResults) {
        return;
      }

      currentParent = currentParent.parent;
    };

    this.specStarted = function(result) {
      currentParent.addChild(result, "spec");
    };

    var failures = [];
    this.specDone = function(result) {
      if (result.status != "disabled") {
        specsExecuted++;
      }

      symbols.appendChild(createDom("li", {
          className: result.status,
          id: "spec_" + result.id,
          title: result.fullName
        }
      ));

      if (result.status == "failed") {
        failureCount++;

        var failure =
          createDom("div", {className: "spec-detail failed"},
            createDom("div", {className: "description"},
              createDom("a", {title: result.fullName, href: specHref(result)}, result.fullName)
            ),
            createDom("div", {className: "messages"})
          );
        var messages = failure.childNodes[1];

        for (var i = 0; i < result.failedExpectations.length; i++) {
          var expectation = result.failedExpectations[i];
          messages.appendChild(createDom("div", {className: "result-message"}, expectation.message));
          messages.appendChild(createDom("div", {className: "stack-trace"}, expectation.stack));
        }

        failures.push(failure);
      }

      if (result.status == "pending") {
        pendingSpecCount++;
      }
    };

    this.jasmineDone = function() {
      var banner = find(".banner");
      banner.appendChild(createDom("span", {className: "duration"}, "finished in " + timer.elapsed() / 1000 + "s"));

      var alert = find(".alert");

      alert.appendChild(createDom("span", { className: "exceptions" },
        createDom("label", { className: "label", 'for': "raise-exceptions" }, "raise exceptions"),
        createDom("input", {
          className: "raise",
          id: "raise-exceptions",
          type: "checkbox"
        })
      ));
      var checkbox = find("input");

      checkbox.checked = !env.catchingExceptions();
      checkbox.onclick = onRaiseExceptionsClick;

      if (specsExecuted < totalSpecsDefined) {
        var skippedMessage = "Ran " + specsExecuted + " of " + totalSpecsDefined + " specs - run all";
        alert.appendChild(
          createDom("span", {className: "bar skipped"},
            createDom("a", {href: "?", title: "Run all specs"}, skippedMessage)
          )
        );
      }
      var statusBarMessage = "" + pluralize("spec", specsExecuted) + ", " + pluralize("failure", failureCount);
      if (pendingSpecCount) { statusBarMessage += ", " + pluralize("pending spec", pendingSpecCount); }

      var statusBarClassName = "bar " + ((failureCount > 0) ? "failed" : "passed");
      alert.appendChild(createDom("span", {className: statusBarClassName}, statusBarMessage));

      var results = find(".results");
      results.appendChild(summary);

      summaryList(topResults, summary);

      function summaryList(resultsTree, domParent) {
        var specListNode;
        for (var i = 0; i < resultsTree.children.length; i++) {
          var resultNode = resultsTree.children[i];
          if (resultNode.type == "suite") {
            var suiteListNode = createDom("ul", {className: "suite", id: "suite-" + resultNode.result.id},
              createDom("li", {className: "suite-detail"},
                createDom("a", {href: specHref(resultNode.result)}, resultNode.result.description)
              )
            );

            summaryList(resultNode, suiteListNode);
            domParent.appendChild(suiteListNode);
          }
          if (resultNode.type == "spec") {
            if (domParent.getAttribute("class") != "specs") {
              specListNode = createDom("ul", {className: "specs"});
              domParent.appendChild(specListNode);
            }
            specListNode.appendChild(
              createDom("li", {
                  className: resultNode.result.status,
                  id: "spec-" + resultNode.result.id
                },
                createDom("a", {href: specHref(resultNode.result)}, resultNode.result.description)
              )
            );
          }
        }
      }

      if (failures.length) {
        alert.appendChild(
          createDom('span', {className: "menu bar spec-list"},
            createDom("span", {}, "Spec List | "),
            createDom('a', {className: "failures-menu", href: "#"}, "Failures")));
        alert.appendChild(
          createDom('span', {className: "menu bar failure-list"},
            createDom('a', {className: "spec-list-menu", href: "#"}, "Spec List"),
            createDom("span", {}, " | Failures ")));

        find(".failures-menu").onclick = function() {
          setMenuModeTo('failure-list');
        };
        find(".spec-list-menu").onclick = function() {
          setMenuModeTo('spec-list');
        };

        setMenuModeTo('failure-list');

        var failureNode = find(".failures");
        for (var i = 0; i < failures.length; i++) {
          failureNode.appendChild(failures[i]);
        }
      }
    };

    return this;

    function find(selector) {
      return getContainer().querySelector(selector);
    }

    function createDom(type, attrs, childrenVarArgs) {
      var el = createElement(type);

      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];

        if (typeof child === 'string') {
          el.appendChild(createTextNode(child));
        } else {
          if (child) {
            el.appendChild(child);
          }
        }
      }

      for (var attr in attrs) {
        if (attr == "className") {
          el[attr] = attrs[attr];
        } else {
          el.setAttribute(attr, attrs[attr]);
        }
      }

      return el;
    }

    function pluralize(singular, count) {
      var word = (count == 1 ? singular : singular + "s");

      return "" + count + " " + word;
    }

    function specHref(result) {
      return "?spec=" + encodeURIComponent(result.fullName);
    }

    function setMenuModeTo(mode) {
      htmlReporterMain.setAttribute("class", "html-reporter " + mode);
    }
  }

  return HtmlReporter;
};

jasmineRequire.HtmlSpecFilter = function() {
  function HtmlSpecFilter(options) {
    var filterString = options && options.filterString() && options.filterString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var filterPattern = new RegExp(filterString);

    this.matches = function(specName) {
      return filterPattern.test(specName);
    };
  }

  return HtmlSpecFilter;
};

jasmineRequire.ResultsNode = function() {
  function ResultsNode(result, type, parent) {
    this.result = result;
    this.type = type;
    this.parent = parent;

    this.children = [];

    this.addChild = function(result, type) {
      this.children.push(new ResultsNode(result, type, this));
    };

    this.last = function() {
      return this.children[this.children.length - 1];
    };
  }

  return ResultsNode;
};

jasmineRequire.QueryString = function() {
  function QueryString(options) {

    this.setParam = function(key, value) {
      var paramMap = queryStringToParamMap();
      paramMap[key] = value;
      options.getWindowLocation().search = toQueryString(paramMap);
    };

    this.getParam = function(key) {
      return queryStringToParamMap()[key];
    };

    return this;

    function toQueryString(paramMap) {
      var qStrPairs = [];
      for (var prop in paramMap) {
        qStrPairs.push(encodeURIComponent(prop) + "=" + encodeURIComponent(paramMap[prop]));
      }
      return "?" + qStrPairs.join('&');
    }

    function queryStringToParamMap() {
      var paramStr = options.getWindowLocation().search.substring(1),
        params = [],
        paramMap = {};

      if (paramStr.length > 0) {
        params = paramStr.split('&');
        for (var i = 0; i < params.length; i++) {
          var p = params[i].split('=');
          var value = decodeURIComponent(p[1]);
          if (value === "true" || value === "false") {
            value = JSON.parse(value);
          }
          paramMap[decodeURIComponent(p[0])] = value;
        }
      }

      return paramMap;
    }

  }

  return QueryString;
};
/*
Copyright (c) 2008-2013 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getJasmineRequireObj() {
  if (typeof module !== "undefined" && module.exports) {
    return exports;
  } else {
    window.jasmineRequire = window.jasmineRequire || {};
    return window.jasmineRequire;
  }
}

getJasmineRequireObj().console = function(jRequire, j$) {
  j$.ConsoleReporter = jRequire.ConsoleReporter();
};

getJasmineRequireObj().ConsoleReporter = function() {

  var noopTimer = {
    start: function(){},
    elapsed: function(){ return 0; }
  };

  function ConsoleReporter(options) {
    var print = options.print,
      showColors = options.showColors || false,
      onComplete = options.onComplete || function() {},
      timer = options.timer || noopTimer,
      specCount,
      failureCount,
      failedSpecs = [],
      pendingCount,
      ansi = {
        green: '\x1B[32m',
        red: '\x1B[31m',
        yellow: '\x1B[33m',
        none: '\x1B[0m'
      };

    this.jasmineStarted = function() {
      specCount = 0;
      failureCount = 0;
      pendingCount = 0;
      print("Started");
      printNewline();
      timer.start();
    };

    this.jasmineDone = function() {
      printNewline();
      for (var i = 0; i < failedSpecs.length; i++) {
        specFailureDetails(failedSpecs[i]);
      }

      printNewline();
      var specCounts = specCount + " " + plural("spec", specCount) + ", " +
        failureCount + " " + plural("failure", failureCount);

      if (pendingCount) {
        specCounts += ", " + pendingCount + " pending " + plural("spec", pendingCount);
      }

      print(specCounts);

      printNewline();
      var seconds = timer.elapsed() / 1000;
      print("Finished in " + seconds + " " + plural("second", seconds));

      printNewline();

      onComplete(failureCount === 0);
    };

    this.specDone = function(result) {
      specCount++;

      if (result.status == "pending") {
        pendingCount++;
        print(colored("yellow", "*"));
        return;
      }

      if (result.status == "passed") {
        print(colored("green", '.'));
        return;
      }

      if (result.status == "failed") {
        failureCount++;
        failedSpecs.push(result);
        print(colored("red", 'F'));
      }
    };

    return this;

    function printNewline() {
      print("\n");
    }

    function colored(color, str) {
      return showColors ? (ansi[color] + str + ansi.none) : str;
    }

    function plural(str, count) {
      return count == 1 ? str : str + "s";
    }

    function repeat(thing, times) {
      var arr = [];
      for (var i = 0; i < times; i++) {
        arr.push(thing);
      }
      return arr;
    }

    function indent(str, spaces) {
      var lines = (str || '').split("\n");
      var newArr = [];
      for (var i = 0; i < lines.length; i++) {
        newArr.push(repeat(" ", spaces).join("") + lines[i]);
      }
      return newArr.join("\n");
    }

    function specFailureDetails(result) {
      printNewline();
      print(result.fullName);

      for (var i = 0; i < result.failedExpectations.length; i++) {
        var failedExpectation = result.failedExpectations[i];
        printNewline();
        print(indent(failedExpectation.stack, 2));
      }

      printNewline();
    }
  }

  return ConsoleReporter;
};
/**
 Starting with version 2.0, this file "boots" Jasmine, performing all of the necessary initialization before executing the loaded environment and all of a project's specs. This file should be loaded after `jasmine.js`, but before any project source files or spec files are loaded. Thus this file can also be used to customize Jasmine for a project.

 If a project is using Jasmine via the standalone distribution, this file can be customized directly. If a project is using Jasmine via the [Ruby gem][jasmine-gem], this file can be copied into the support directory via `jasmine copy_boot_js`. Other environments (e.g., Python) will have different mechanisms.

 The location of `boot.js` can be specified and/or overridden in `jasmine.yml`.

 [jasmine-gem]: http://github.com/pivotal/jasmine-gem
 */


(function() {

  /**
   * ## Require &amp; Instantiate
   *
   * Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
   */
  window.jasmine = jasmineRequire.core(jasmineRequire);

  /**
   * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
   */
  jasmineRequire.html(jasmine);

  /**
   * Create the Jasmine environment. This is used to run all specs in a project.
   */
  var env = jasmine.getEnv();

  /**
   * ## The Global Interface
   *
   * Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
   */
  var jasmineInterface = {
    describe: function(description, specDefinitions) {
      return env.describe(description, specDefinitions);
    },

    xdescribe: function(description, specDefinitions) {
      return env.xdescribe(description, specDefinitions);
    },

    it: function(desc, func) {
      return env.it(desc, func);
    },

    xit: function(desc, func) {
      return env.xit(desc, func);
    },

    beforeEach: function(beforeEachFunction) {
      return env.beforeEach(beforeEachFunction);
    },

    afterEach: function(afterEachFunction) {
      return env.afterEach(afterEachFunction);
    },

    expect: function(actual) {
      return env.expect(actual);
    },

    pending: function() {
      return env.pending();
    },

    spyOn: function(obj, methodName) {
      return env.spyOn(obj, methodName);
    },

    jsApiReporter: new jasmine.JsApiReporter({
      timer: new jasmine.Timer()
    })
  };

  /**
   * Add all of the Jasmine global/public interface to the proper global, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
   */
  if (typeof window == "undefined" && typeof exports == "object") {
    extend(exports, jasmineInterface);
  } else {
    extend(window, jasmineInterface);
  }

  /**
   * Expose the interface for adding custom equality testers.
   */
  jasmine.addCustomEqualityTester = function(tester) {
    env.addCustomEqualityTester(tester);
  };

  /**
   * Expose the interface for adding custom expectation matchers
   */
  jasmine.addMatchers = function(matchers) {
    return env.addMatchers(matchers);
  };

  /**
   * Expose the mock interface for the JavaScript timeout functions
   */
  jasmine.clock = function() {
    return env.clock;
  };

  /**
   * ## Runner Parameters
   *
   * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
   */

  var queryString = new jasmine.QueryString({
    getWindowLocation: function() { return window.location; }
  });

  var catchingExceptions = queryString.getParam("catch");
  env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

  /**
   * ## Reporters
   * The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
   */
  var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
    getContainer: function() { return document.body; },
    createElement: function() { return document.createElement.apply(document, arguments); },
    createTextNode: function() { return document.createTextNode.apply(document, arguments); },
    timer: new jasmine.Timer()
  });

  /**
   * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
   */
  env.addReporter(jasmineInterface.jsApiReporter);
  env.addReporter(htmlReporter);

  /**
   * Filter which specs will be run by matching the start of the full name against the `spec` query param.
   */
  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  /**
   * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
   */
  window.setTimeout = window.setTimeout;
  window.setInterval = window.setInterval;
  window.clearTimeout = window.clearTimeout;
  window.clearInterval = window.clearInterval;

  /**
   * ## Execution
   *
   * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
   */
  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    htmlReporter.initialize();
    env.execute();
  };

  /**
   * Helper function for readability above.
   */
  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

}());
var chr_set_id, face, face_id, faced_jobs, job, list, order, _i, _id, _len, _ref, _ref1, _ref2;

new Cache.Append("face").schema(function() {
  return this.order_by("order");
});

new Cache.Append("chr_set").schema(function() {});

new Cache.Append("chr_npc").schema(function() {
  return this.belongs_to("chr_set");
});

new Cache.Append("chr_job").schema(function() {
  this.order(function(o) {
    var face;
    face = Cache.faces.find[o.face_id];
    if (face != null) {
      return face.order;
    } else {
      return 999999;
    }
  });
  this.belongs_to("chr_set");
  this.belongs_to("face");
  return this.scope("invalid", function(o) {
    return (!Cache.faces.find[o.face_id]) && o.chr_set_id;
  });
});

Cache.rule.face.set([
  {
    "_id": "c49",
    "comment": "test",
    "face_id": "c49",
    "name": "ボリス",
    "order": 1
  }, {
    "_id": "c38",
    "order": 2,
    "face_id": "c38",
    "name": "コリーン"
  }, {
    "_id": "c77",
    "order": 3,
    "face_id": "c77",
    "name": "キャロライナ"
  }, {
    "_id": "c35",
    "order": 4,
    "face_id": "c35",
    "name": "ダン"
  }, {
    "_id": "c53",
    "order": 5,
    "face_id": "c53",
    "name": "ゼルダ"
  }, {
    "_id": "c74",
    "order": 6,
    "face_id": "c74",
    "name": "フランシスカ"
  }, {
    "_id": "c50",
    "order": 7,
    "face_id": "c50",
    "name": "ディーン"
  }, {
    "_id": "c36",
    "order": 8,
    "face_id": "c36",
    "name": "ミッシェル"
  }, {
    "_id": "c26",
    "order": 9,
    "face_id": "c26",
    "name": "モニカ"
  }, {
    "_id": "c55",
    "order": 10,
    "face_id": "c55",
    "name": "パピヨン"
  }, {
    "_id": "c29",
    "order": 11,
    "face_id": "c29",
    "name": "イアン"
  }, {
    "_id": "c12",
    "order": 12,
    "face_id": "c12",
    "name": "バーナバス"
  }, {
    "_id": "c16",
    "order": 13,
    "face_id": "c16",
    "name": "マリアンヌ"
  }, {
    "_id": "c34",
    "order": 14,
    "face_id": "c34",
    "name": "トニー"
  }, {
    "_id": "c44",
    "order": 15,
    "face_id": "c44",
    "name": "ドナルド"
  }, {
    "_id": "c11",
    "order": 16,
    "face_id": "c11",
    "name": "カルヴィン"
  }, {
    "_id": "c10",
    "order": 17,
    "face_id": "c10",
    "name": "ゾーイ"
  }, {
    "_id": "c70",
    "order": 18,
    "face_id": "c70",
    "name": "パティ"
  }, {
    "_id": "c56",
    "order": 19,
    "face_id": "c56",
    "name": "ゴドウィン"
  }, {
    "_id": "c07",
    "order": 20,
    "face_id": "c07",
    "name": "ティモシー"
  }, {
    "_id": "c41",
    "order": 21,
    "face_id": "c41",
    "name": "ヤニク"
  }, {
    "_id": "c58",
    "order": 22,
    "face_id": "c58",
    "name": "ブルーノ"
  }, {
    "_id": "c17",
    "order": 23,
    "face_id": "c17",
    "name": "ユリシーズ"
  }, {
    "_id": "c39",
    "order": 24,
    "face_id": "c39",
    "name": "シビル"
  }, {
    "_id": "c40",
    "order": 25,
    "face_id": "c40",
    "name": "ハワード"
  }, {
    "_id": "c65",
    "order": 26,
    "face_id": "c65",
    "name": "ズリエル"
  }, {
    "_id": "c59",
    "order": 27,
    "face_id": "c59",
    "name": "ムパムピス"
  }, {
    "_id": "c57",
    "order": 28,
    "face_id": "c57",
    "name": "ツェツィーリヤ"
  }, {
    "_id": "c04",
    "order": 29,
    "face_id": "c04",
    "name": "ノーリーン"
  }, {
    "_id": "c46",
    "order": 30,
    "face_id": "c46",
    "name": "ゲイル"
  }, {
    "_id": "c14",
    "order": 31,
    "face_id": "c14",
    "name": "レティーシャ"
  }, {
    "_id": "c09",
    "order": 32,
    "face_id": "c09",
    "name": "ヒロシ"
  }, {
    "_id": "c42",
    "order": 33,
    "face_id": "c42",
    "name": "ラルフ"
  }, {
    "_id": "c37",
    "order": 34,
    "face_id": "c37",
    "name": "セシル"
  }, {
    "_id": "c75",
    "order": 35,
    "face_id": "c75",
    "name": "ビリー"
  }, {
    "_id": "c32",
    "order": 36,
    "face_id": "c32",
    "name": "オスカー"
  }, {
    "_id": "c33",
    "order": 37,
    "face_id": "c33",
    "name": "ホリー"
  }, {
    "_id": "c02",
    "order": 38,
    "face_id": "c02",
    "name": "アルフレッド"
  }, {
    "_id": "c66",
    "order": 39,
    "face_id": "c66",
    "name": "クリストファー"
  }, {
    "_id": "c24",
    "order": 41,
    "face_id": "c24",
    "name": "ナタリア"
  }, {
    "_id": "c79",
    "order": 42,
    "face_id": "c79",
    "name": "マーゴ"
  }, {
    "_id": "c61",
    "order": 43,
    "face_id": "c61",
    "name": "ヌマタロウ"
  }, {
    "_id": "c23",
    "order": 44,
    "face_id": "c23",
    "name": "チャールズ"
  }, {
    "_id": "c28",
    "comment": "",
    "face_id": "c28",
    "name": "ケイト",
    "order": 47
  }, {
    "_id": "c68",
    "order": 48,
    "face_id": "c68",
    "name": "ヨアヒム"
  }, {
    "_id": "c30",
    "order": 49,
    "face_id": "c30",
    "name": "フィリップ"
  }, {
    "_id": "c21",
    "order": 50,
    "face_id": "c21",
    "name": "ニール"
  }, {
    "_id": "c52",
    "order": 52,
    "face_id": "c52",
    "name": "ギリアン"
  }, {
    "_id": "c51",
    "order": 53,
    "face_id": "c51",
    "name": "ヨーランダ"
  }, {
    "_id": "c01",
    "comment": "",
    "face_id": "c01",
    "name": "メアリー",
    "order": 55
  }, {
    "_id": "c69",
    "order": 56,
    "face_id": "c69",
    "name": "ギネス"
  }, {
    "_id": "c63",
    "order": 57,
    "face_id": "c63",
    "name": "ピッパ"
  }, {
    "_id": "c05",
    "order": 59,
    "face_id": "c05",
    "name": "キャサリン"
  }, {
    "_id": "c22",
    "order": 60,
    "face_id": "c22",
    "name": "ワット"
  }, {
    "_id": "c62",
    "order": 61,
    "face_id": "c62",
    "name": "ヴェラ"
  }, {
    "_id": "c13",
    "order": 62,
    "face_id": "c13",
    "name": "ロミオ"
  }, {
    "_id": "c18",
    "order": 63,
    "face_id": "c18",
    "name": "エマ"
  }, {
    "_id": "c27",
    "order": 65,
    "face_id": "c27",
    "name": "リンダ"
  }, {
    "_id": "c08",
    "order": 66,
    "face_id": "c08",
    "name": "ベネット"
  }, {
    "_id": "c19",
    "order": 67,
    "face_id": "c19",
    "name": "タバサ"
  }, {
    "_id": "c71",
    "order": 70,
    "face_id": "c71",
    "name": "ノックス"
  }, {
    "_id": "c03",
    "order": 71,
    "face_id": "c03",
    "name": "スティーブン"
  }, {
    "_id": "c43",
    "order": 72,
    "face_id": "c43",
    "name": "ガストン"
  }, {
    "_id": "c15",
    "order": 73,
    "face_id": "c15",
    "name": "ウェーズリー"
  }, {
    "_id": "c54",
    "order": 75,
    "face_id": "c54",
    "name": "ザック"
  }, {
    "_id": "c25",
    "order": 77,
    "face_id": "c25",
    "name": "ルーカス"
  }, {
    "_id": "c20",
    "order": 78,
    "face_id": "c20",
    "name": "グロリア"
  }, {
    "_id": "c72",
    "order": 79,
    "face_id": "c72",
    "name": "ヴェスパタイン"
  }, {
    "_id": "c47",
    "order": 80,
    "face_id": "c47",
    "name": "ペラジー"
  }, {
    "_id": "c80",
    "order": 81,
    "face_id": "c80",
    "name": "テッド"
  }, {
    "_id": "c105",
    "comment": "年末カウントダウン♪",
    "name": "シメオン",
    "face_id": "c105",
    "order": 82
  }, {
    "_id": "c96",
    "face_id": "c96",
    "name": "レオナルド",
    "comment": "2011/12/11",
    "order": 83
  }, {
    "_id": "c95",
    "face_id": "c95",
    "name": "モリス",
    "comment": "2011/12/11",
    "order": 84
  }, {
    "_id": "c97",
    "face_id": "c97",
    "name": "ジェフ",
    "comment": "2011/12/14 超常現象はあるんだ…",
    "order": 85
  }, {
    "_id": "c98",
    "face_id": "c98",
    "name": "オズワルド",
    "comment": "2011/12/29 この髭はぜったいワックス使ってる。",
    "order": 86
  }, {
    "_id": "c100",
    "face_id": "c100",
    "name": "グレッグ",
    "comment": "2012/12/30 スポーツ系中学生くらいに見える",
    "order": 87
  }, {
    "_id": "c101",
    "face_id": "c101",
    "name": "クラリッサ",
    "comment": "2011/12/30 美人さん♪",
    "order": 88
  }, {
    "_id": "c104",
    "comment": "年末カウントダウン♪",
    "name": "ヒュー",
    "face_id": "c104",
    "order": 89
  }, {
    "_id": "c106",
    "comment": "年末カウントダウン♪",
    "face_id": "c106",
    "name": "ワンダ",
    "order": 90
  }, {
    "_id": "c108",
    "face_id": "c108",
    "name": "ブローリン",
    "comment": "年末カウントダウン♪",
    "order": 91
  }, {
    "_id": "c90",
    "face_id": "c90",
    "name": "ケヴィン",
    "comment": "2011/12/06",
    "order": 125
  }, {
    "_id": "c88",
    "face_id": "c88",
    "name": "ピエール",
    "order": 126,
    "comment": "2011/12/05"
  }, {
    "_id": "c89",
    "face_id": "c89",
    "name": "カトリーナ",
    "comment": "2011/12/06",
    "order": 127
  }, {
    "_id": "c84",
    "face_id": "c84",
    "name": "ブレンダ",
    "order": 129,
    "comment": "2011/12/05"
  }, {
    "_id": "c85",
    "face_id": "c85",
    "name": "ハナ",
    "order": 130,
    "comment": "2011/12/05"
  }, {
    "_id": "c91",
    "comment": "2011/12/06 姦しい奥様♪",
    "face_id": "c91",
    "name": "ドロシー",
    "order": 143
  }, {
    "_id": "c92",
    "comment": "2011/12/06 姦し娘ーず♪",
    "face_id": "c92",
    "name": "セレスト",
    "order": 144
  }, {
    "_id": "c93",
    "comment": "2011/12/06 えー○○が許されるのは小学生までだよねー♪",
    "face_id": "c93",
    "name": "ベッキー",
    "order": 145
  }, {
    "_id": "c78",
    "order": 150,
    "face_id": "c78",
    "name": "ネイサン"
  }, {
    "_id": "c82",
    "order": 160,
    "face_id": "c82",
    "name": "ロビン"
  }, {
    "_id": "c109",
    "face_id": "c109",
    "name": "ラディスラヴァ",
    "comment": "年末カウントダウン♪",
    "order": 163
  }, {
    "_id": "c94",
    "face_id": "c94",
    "name": "ダーラ",
    "comment": "2011/12/11",
    "order": 165
  }, {
    "_id": "c102",
    "comment": "年末カウントダウン♪",
    "face_id": "c102",
    "name": "ウォーレン",
    "order": 168
  }, {
    "_id": "c73",
    "order": 170,
    "face_id": "c73",
    "name": "ローズマリー"
  }, {
    "_id": "c81",
    "order": 180,
    "face_id": "c81",
    "name": "サイラス"
  }, {
    "_id": "c64",
    "order": 190,
    "face_id": "c64",
    "name": "ヘクター"
  }, {
    "_id": "c107",
    "face_id": "c107",
    "name": "イヴォン",
    "comment": "年末カウントダウン♪",
    "order": 195
  }, {
    "_id": "c67",
    "order": 200,
    "face_id": "c67",
    "name": "ソフィア"
  }, {
    "_id": "c76",
    "order": 210,
    "face_id": "c76",
    "name": "ジョージ"
  }, {
    "_id": "c60",
    "order": 215,
    "face_id": "c60",
    "name": "ポーチュラカ"
  }, {
    "_id": "c45",
    "order": 218,
    "face_id": "c45",
    "name": "プリシラ"
  }, {
    "_id": "c87",
    "face_id": "c87",
    "name": "エリアス",
    "order": 220,
    "comment": "2011/12/05"
  }, {
    "_id": "c48",
    "order": 225,
    "face_id": "c48",
    "name": "ビアンカ"
  }, {
    "_id": "c86",
    "face_id": "c86",
    "name": "ホレーショー",
    "order": 230,
    "comment": "2011/12/05"
  }, {
    "_id": "c83",
    "order": 240,
    "face_id": "c83",
    "name": "アイリス"
  }, {
    "_id": "c31",
    "order": 250,
    "face_id": "c31",
    "name": "ネル"
  }, {
    "_id": "c103",
    "comment": "年末カウントダウン♪",
    "name": "ナンシー",
    "face_id": "c103",
    "order": 998
  }, {
    "_id": "c99",
    "order": 999,
    "face_id": "c99",
    "name": "サイモン"
  }, {
    "order": 10001,
    "face_id": "g01",
    "name": "露蝶",
    "comment": "中国女性名",
    "_id": "g01"
  }, {
    "order": 10002,
    "face_id": "g02",
    "name": "志偉",
    "comment": "台湾男性名 越南の名前も探したかったが、見つからぬ…",
    "_id": "g02"
  }, {
    "order": 10003,
    "face_id": "g03",
    "name": "芙蓉",
    "comment": "里帰り",
    "_id": "g03"
  }, {
    "order": 10004,
    "face_id": "gc61",
    "name": "沼太郎",
    "comment": "里帰り",
    "_id": "gc61"
  }, {
    "name": "デメテル",
    "face_id": "mad01",
    "comment": "阿片窟からきました",
    "order": 20001,
    "_id": "mad01"
  }, {
    "name": "エルゴット",
    "face_id": "mad02",
    "comment": "阿片窟からきました",
    "order": 20002,
    "_id": "mad02"
  }, {
    "name": "シーシャ",
    "face_id": "mad03",
    "comment": "阿片窟からきました",
    "order": 20003,
    "_id": "mad03"
  }, {
    "name": "ドリベル",
    "face_id": "mad04",
    "comment": "阿片窟からきました",
    "order": 20004,
    "_id": "mad04"
  }, {
    "name": "ヤヘイ",
    "face_id": "mad05",
    "comment": "阿片窟からきました",
    "order": 20005,
    "_id": "mad05"
  }, {
    "name": "アヤワスカ",
    "face_id": "mad06",
    "comment": "阿片窟からきました",
    "order": 20006,
    "_id": "mad06"
  }, {
    "name": "チアキ",
    "face_id": "t01",
    "comment": "時をかける少女",
    "order": 30001,
    "_id": "t01"
  }, {
    "name": "リッキィ",
    "face_id": "t02",
    "comment": "夏への扉",
    "order": 30002,
    "_id": "t02"
  }, {
    "name": "ミナカタ",
    "face_id": "t03",
    "comment": "ー仁ー",
    "order": 30003,
    "_id": "t03"
  }, {
    "name": "カイル",
    "face_id": "t04",
    "comment": "サラ・コナー・クロニクルズ",
    "order": 30004,
    "_id": "t04"
  }, {
    "name": "ジェニファー",
    "face_id": "t05",
    "comment": "バック・トゥ・ザ・フューチャー",
    "order": 30005,
    "_id": "t05"
  }, {
    "_id": "m99",
    "order": 70001,
    "face_id": "m99",
    "name": "パルック"
  }, {
    "_id": "m06",
    "order": 70002,
    "face_id": "m06",
    "name": "リリンラ"
  }, {
    "_id": "m03",
    "order": 70003,
    "face_id": "m03",
    "name": "トノサマ"
  }, {
    "_id": "m05",
    "order": 70004,
    "face_id": "m05",
    "name": "ナナコロ"
  }, {
    "_id": "m15",
    "order": 70005,
    "face_id": "m15",
    "name": "ミソチャ"
  }, {
    "_id": "m07",
    "order": 70006,
    "face_id": "m07",
    "name": "アリス"
  }, {
    "_id": "r30",
    "order": 70006,
    "face_id": "r30",
    "name": "トリ"
  }, {
    "_id": "m01",
    "order": 70007,
    "face_id": "m01",
    "name": "ケムシ"
  }, {
    "_id": "m02",
    "order": 70008,
    "face_id": "m02",
    "name": "ポプラ"
  }, {
    "_id": "m04",
    "order": 70009,
    "face_id": "m04",
    "name": "アオイ"
  }, {
    "_id": "b44",
    "comment": "",
    "face_id": "b44",
    "name": "ドナルド",
    "order": 70010
  }, {
    "_id": "m08",
    "order": 70011,
    "face_id": "m08",
    "name": "おっぱい"
  }, {
    "_id": "m09",
    "order": 70012,
    "face_id": "m09",
    "name": "カミジャー"
  }, {
    "_id": "r12",
    "order": 70012,
    "face_id": "r12",
    "name": "バーナバス"
  }, {
    "_id": "b49",
    "comment": "",
    "face_id": "b49",
    "name": "ボリス",
    "order": 70012
  }, {
    "_id": "m10",
    "order": 70013,
    "face_id": "m10",
    "name": "アチャポ"
  }, {
    "_id": "m12",
    "comment": "",
    "face_id": "m12",
    "name": "トルニトス",
    "order": 70014
  }, {
    "_id": "m11",
    "order": 70015,
    "face_id": "m11",
    "name": "ライトニング"
  }, {
    "_id": "m13",
    "order": 70016,
    "face_id": "m13",
    "name": "ミケ"
  }, {
    "_id": "m14",
    "order": 70017,
    "face_id": "m14",
    "name": "カリュクス"
  }, {
    "_id": "sf01",
    "order": 80001,
    "face_id": "sf01",
    "name": "ラッシード",
    "comment": "りしあさん＆かれやなぎさん"
  }, {
    "_id": "sf02",
    "order": 80002,
    "face_id": "sf02",
    "name": "エスペラント",
    "comment": "ふらぅさん＆かれやなぎさん"
  }, {
    "_id": "sf03",
    "order": 80003,
    "face_id": "sf03",
    "name": "ピート",
    "comment": "たるっとさん＆りちゃさん"
  }, {
    "_id": "sf04",
    "order": 80004,
    "face_id": "sf04",
    "name": "アシモフ",
    "comment": "あすたん＆りりんら"
  }, {
    "_id": "sf05",
    "order": 80005,
    "face_id": "sf05",
    "name": "モナリザ",
    "comment": "ななころび＆りりんら"
  }, {
    "_id": "sf06",
    "order": 80006,
    "face_id": "sf06",
    "name": "ワレンチナ",
    "comment": "まりもさん＆あずまさん"
  }, {
    "_id": "sf07",
    "order": 80007,
    "face_id": "sf07",
    "name": "ヤンファ",
    "comment": "りしあさん＆はむおくん"
  }, {
    "_id": "sf08",
    "order": 80008,
    "face_id": "sf08",
    "name": "ＰＪ",
    "comment": "りしあさん＆ふらぅさん"
  }, {
    "_id": "sf09",
    "order": 80009,
    "face_id": "sf09",
    "name": "キリシマ",
    "comment": "ななころび＆ふらぅさん"
  }, {
    "_id": "sf10",
    "order": 80010,
    "face_id": "sf10",
    "name": "ナユタ",
    "comment": "かれやなぎさん＆かいさん"
  }, {
    "_id": "sf11",
    "order": 80011,
    "face_id": "sf11",
    "name": "イワノフ",
    "comment": "かれやなぎさん＆りちゃさん"
  }, {
    "order": 80012,
    "face_id": "sf12",
    "name": "†ルシフェル†",
    "comment": null,
    "_id": "sf12"
  }, {
    "order": 80013,
    "face_id": "sf13",
    "name": "トルドヴィン",
    "comment": null,
    "_id": "sf13"
  }, {
    "order": 80014,
    "face_id": "sf18",
    "name": "玖休",
    "comment": null,
    "_id": "sf18"
  }, {
    "order": 80015,
    "face_id": "sf19",
    "name": "参休",
    "comment": null,
    "_id": "sf19"
  }, {
    "order": 80016,
    "face_id": "sf14",
    "name": "クリスマス",
    "comment": null,
    "_id": "sf14"
  }, {
    "order": 80017,
    "face_id": "sf15",
    "name": "ジェームス",
    "comment": null,
    "_id": "sf15"
  }, {
    "order": 80018,
    "face_id": "sf16",
    "name": "ライジ",
    "comment": null,
    "_id": "sf16"
  }, {
    "order": 80019,
    "face_id": "sf17",
    "name": "ジャック",
    "comment": null,
    "_id": "sf17"
  }, {
    "_id": "w05",
    "order": 90001,
    "face_id": "w05",
    "name": "定吉",
    "comment": "ぷえるとりこの旅人　エージ―エー"
  }, {
    "_id": "w21",
    "order": 90002,
    "face_id": "w21",
    "name": "鉄平",
    "comment": "日本の伝統　熊木彫"
  }, {
    "_id": "w22",
    "order": 90003,
    "face_id": "w22",
    "name": "竹三",
    "comment": "雪国の風雅　熊木彫"
  }, {
    "_id": "w36",
    "order": 90004,
    "face_id": "w36",
    "name": "ウト"
  }, {
    "_id": "w16",
    "order": 90005,
    "face_id": "w16",
    "name": "勢",
    "comment": "ぶたさん印の　あおいジンギスカン"
  }, {
    "_id": "w18",
    "order": 90006,
    "face_id": "w18",
    "name": "菊"
  }, {
    "_id": "w26",
    "order": 90007,
    "face_id": "w26",
    "name": "勝丸"
  }, {
    "_id": "w35",
    "comment": "",
    "face_id": "w35",
    "name": "奈須麿",
    "order": 90008
  }, {
    "_id": "w24",
    "order": 90009,
    "face_id": "w24",
    "name": "辰次",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業"
  }, {
    "_id": "w37",
    "order": 90010,
    "face_id": "w37",
    "name": "芙蓉"
  }, {
    "_id": "w29",
    "order": 90011,
    "face_id": "w29",
    "name": "志乃"
  }, {
    "_id": "w20",
    "order": 90012,
    "face_id": "w20",
    "name": "藤之助"
  }, {
    "_id": "w31",
    "order": 90013,
    "face_id": "w31",
    "name": "日向"
  }, {
    "_id": "w12",
    "order": 90014,
    "face_id": "w12",
    "name": "おみつ",
    "comment": "道を外して60年　GEDOU協会"
  }, {
    "_id": "w10",
    "order": 90015,
    "face_id": "w10",
    "name": "博史"
  }, {
    "_id": "w25",
    "order": 90016,
    "face_id": "w25",
    "name": "法泉"
  }, {
    "_id": "w09",
    "order": 90017,
    "face_id": "w09",
    "name": "チャールズ",
    "comment": "チャールズ派遣ならおまかせ　O-ririn"
  }, {
    "_id": "w30",
    "order": 90018,
    "face_id": "w30",
    "name": "雪代"
  }, {
    "_id": "w14",
    "order": 90019,
    "face_id": "w14",
    "name": "華月斎",
    "comment": "めげないゼラチン作り　MEGEゼラチン"
  }, {
    "_id": "w13",
    "order": 90020,
    "face_id": "w13",
    "name": "たまこ",
    "comment": "世界の道をつなぐ　議事国地図"
  }, {
    "_id": "w11",
    "order": 90021,
    "face_id": "w11",
    "name": "沼太郎"
  }, {
    "_id": "w03",
    "order": 90022,
    "face_id": "w03",
    "name": "朔",
    "comment": "新しい議事をつくる　たき学会"
  }, {
    "_id": "w34",
    "order": 90023,
    "face_id": "w34",
    "name": "余四朗"
  }, {
    "_id": "w27",
    "order": 90024,
    "face_id": "w27",
    "name": "源蔵"
  }, {
    "_id": "w28",
    "order": 90025,
    "face_id": "w28",
    "name": "甚六"
  }, {
    "_id": "w17",
    "order": 90026,
    "face_id": "w17",
    "name": "雷門",
    "comment": "輝く月に未来を託す　暁月商事"
  }, {
    "_id": "w39",
    "comment": "",
    "face_id": "w39",
    "name": "沙耶",
    "order": 90027
  }, {
    "_id": "w08",
    "order": 90028,
    "face_id": "w08",
    "name": "朝顔"
  }, {
    "_id": "w43",
    "order": 90029,
    "face_id": "w43",
    "name": "春松"
  }, {
    "_id": "w07",
    "order": 90030,
    "face_id": "w07",
    "name": "夕顔"
  }, {
    "_id": "w40",
    "order": 90031,
    "face_id": "w40",
    "name": "朧"
  }, {
    "_id": "w33",
    "comment": "",
    "face_id": "w33",
    "name": "団十郎",
    "order": 90032
  }, {
    "_id": "w23",
    "order": 90033,
    "face_id": "w23",
    "name": "仁右衛門"
  }, {
    "_id": "w04",
    "order": 90034,
    "face_id": "w04",
    "name": "小鈴",
    "comment": "お口の愛人　タルッティ・タルット"
  }, {
    "_id": "w06",
    "order": 90035,
    "face_id": "w06",
    "name": "ゆり",
    "comment": "道を外して60年　GEDOU協会"
  }, {
    "_id": "w38",
    "comment": "",
    "face_id": "w38",
    "name": "一平太",
    "order": 90037
  }, {
    "_id": "w01",
    "order": 90038,
    "face_id": "w01",
    "name": "鏡花",
    "comment": "輝く月に未来を託す　暁月商事"
  }, {
    "_id": "w15",
    "order": 90039,
    "face_id": "w15",
    "name": "八重",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業"
  }, {
    "_id": "w32",
    "order": 90040,
    "face_id": "w32",
    "name": "明之進"
  }, {
    "_id": "w02",
    "order": 90041,
    "face_id": "w02",
    "name": "慶三郎",
    "comment": "カメラのことなら　MISEKI"
  }, {
    "_id": "w44",
    "face_id": "w44",
    "name": "雪客",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90042
  }, {
    "_id": "w45",
    "face_id": "w45",
    "name": "亀吉",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90043
  }, {
    "_id": "w46",
    "face_id": "w46",
    "name": "梅子",
    "order": 90044,
    "comment": "お誕生日記念☆"
  }, {
    "face_id": "w47",
    "name": "置壱",
    "comment": "日本の美徳強化月間",
    "order": 90045,
    "_id": "w47"
  }, {
    "face_id": "all",
    "name": "パルック",
    "order": 99999,
    "_id": "all"
  }, {
    "_id": "g04",
    "face_id": "g04",
    "name": "攻芸",
    "comment": "台湾男性名",
    "order": 10005
  }, {
    "_id": "g05",
    "face_id": "g05",
    "name": "麻雀",
    "comment": "中国女性名",
    "order": 10006
  }, {
    "_id": "g06",
    "face_id": "g06",
    "name": "黍炉",
    "comment": "ダリダイ・オッチギン",
    "order": 10007
  }, {
    "_id": "mad07",
    "face_id": "mad07",
    "name": "ダイミ",
    "comment": "阿片窟からきました",
    "order": 20007
  }, {
    "_id": "mad08",
    "face_id": "mad08",
    "name": "エフェドラ",
    "comment": "阿片窟からきました",
    "order": 20008
  }, {
    "_id": "t06",
    "face_id": "t06",
    "name": "サミュエル",
    "comment": "トランスフォーマー",
    "order": 30006
  }, {
    "_id": "t07",
    "face_id": "t07",
    "name": "アカリ",
    "comment": "時をかける少女",
    "order": 30007
  }, {
    "_id": "t08",
    "face_id": "t08",
    "name": "ミルフィ",
    "comment": "海賊戦隊ゴーカイジャー",
    "order": 30008
  }, {
    "_id": "t09",
    "face_id": "t09",
    "name": "ゴロウ",
    "comment": "時をかける少女",
    "order": 30009
  }, {
    "_id": "t10",
    "face_id": "t10",
    "name": "トレイル",
    "comment": "ゼルダの伝説 ムジュラの仮面",
    "order": 30010
  }, {
    "_id": "t11",
    "face_id": "t11",
    "name": "マドカ",
    "comment": "宇宙戦艦ヤマモト・ヨーコ",
    "order": 30011
  }, {
    "_id": "t12",
    "face_id": "t12",
    "name": "フランク",
    "comment": "オーロラの彼方へ",
    "order": 30012
  }, {
    "_id": "t13",
    "face_id": "t13",
    "name": "ジャニス",
    "comment": "フラッシュフォワード",
    "order": 30013
  }, {
    "_id": "t14",
    "face_id": "t14",
    "name": "クシャミ",
    "comment": "吾輩は猫である。",
    "order": 30014
  }, {
    "_id": "t15",
    "face_id": "t15",
    "name": "ガーディ",
    "comment": "ベイカー街少年探偵団",
    "order": 30015
  }, {
    "_id": "sf20",
    "face_id": "sf20",
    "name": "ティソ",
    "comment": null,
    "order": 80020
  }, {
    "_id": "g07",
    "face_id": "g07",
    "name": "ジリヤ",
    "comment": "ロシア女性名",
    "order": 10008
  }, {
    "_id": "t16",
    "face_id": "t16",
    "name": "アラン",
    "comment": "映画監督たちの共用偽名",
    "order": 30016
  }, {
    "_id": "w48",
    "face_id": "w48",
    "name": "直円",
    "comment": "和算復活月間",
    "order": 90048
  }, {
    "_id": "w49",
    "face_id": "w49",
    "name": "錠",
    "comment": "ポルトガル人にジオゴっているんだぜ。へー。かっこいー。",
    "order": 90049
  }, {
    "_id": "w50",
    "face_id": "w50",
    "name": "丁助",
    "comment": "負けるたびに追い博打",
    "order": 90050
  }, {
    "_id": "t17",
    "face_id": "t17",
    "name": "ススム",
    "comment": "おもいっきり探偵団 覇悪怒組",
    "order": 30018
  }, {
    "_id": "t18",
    "face_id": "t18",
    "name": "マユミ",
    "comment": "まんがはじめて物語（二代目）",
    "order": 30019
  }, {
    "_id": "c110",
    "face_id": "c110",
    "name": "リー",
    "comment": "",
    "order": 92
  }, {
    "_id": "t19",
    "face_id": "t19",
    "name": "ハルカ",
    "comment": "はるかリフレイン",
    "order": 30017
  }, {
    "_id": "w51",
    "face_id": "w51",
    "name": "鬼丞",
    "comment": "リニューアル記念！",
    "order": 90051
  }, {
    "_id": "w52",
    "face_id": "w52",
    "name": "櫻子",
    "comment": "リニューアル記念！",
    "order": 90052
  }, {
    "_id": "c111",
    "face_id": "c111",
    "name": "スージー",
    "comment": "リニューアル記念！ 弟がいるという噂が…",
    "order": 93
  }, {
    "_id": "c113",
    "face_id": "c113",
    "name": "ジェレミー",
    "comment": "リニューアル記念！",
    "order": 94
  }, {
    "_id": "c112",
    "face_id": "c112",
    "name": "ニコラス",
    "comment": "！？",
    "order": 128
  }, {
    "_id": "m16",
    "face_id": "m16",
    "name": "アーサー",
    "comment": "円卓の騎士",
    "order": 70018
  }, {
    "_id": "t20",
    "face_id": "t20",
    "name": "エリ",
    "comment": "英国情報局秘密組織チェラブ (CHERUB)",
    "order": 30020
  }, {
    "_id": "g08",
    "face_id": "g08",
    "name": "イワン",
    "comment": "Иван-дурак",
    "order": 10009
  }, {
    "_id": "c114",
    "face_id": "c114",
    "name": "モンド",
    "comment": "８８件のご応募、ありがとう。そして、ありがとう。",
    "order": 131
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "ger",
    "admin": "闇の呟き",
    "maker": "馬頭琴の調",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "エクスパンション・セット「大陸議事」",
    "csid": "ger",
    "face_id": "g03",
    "say_0": "まさか……これは……？\u003Cbr\u003E\u003Cbr\u003E真相が分かったわ！\u003Cbr\u003E日が出たらすぐ、麓の皆に知らせないと！",
    "say_1": "飛車が…壊れてる……\u003Cbr\u003E葛橋が…焼けてる……\u003Cbr\u003E\u003Cbr\u003E！　なんだ、猫か……。おどかさないでよ。\u003Cbr\u003Eん？",
    "_id": "ger_g03",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "g01",
    "job": "三元道士",
    "_id": "ger_g01",
    "chr_set_id": "ger"
  }, {
    "face_id": "g02",
    "job": "白鶴拳",
    "_id": "ger_g02",
    "chr_set_id": "ger"
  }, {
    "face_id": "g03",
    "job": "吹牛方士",
    "_id": "ger_g03",
    "chr_set_id": "ger"
  }, {
    "face_id": "gc61",
    "job": "釣り師",
    "_id": "ger_gc61",
    "chr_set_id": "ger"
  }, {
    "face_id": "g04",
    "job": "心意六合拳",
    "_id": "ger_g04",
    "chr_set_id": "ger"
  }, {
    "face_id": "g05",
    "job": "本草方士",
    "_id": "ger_g05",
    "chr_set_id": "ger"
  }, {
    "face_id": "g06",
    "job": "宝飾交易",
    "_id": "ger_g06",
    "chr_set_id": "ger"
  }, {
    "face_id": "g07",
    "job": "お針子",
    "_id": "ger_g07",
    "chr_set_id": "ger"
  }, {
    "face_id": "g08",
    "job": "馬鹿",
    "_id": "ger_g08",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "mad",
    "admin": "闇の呟き",
    "maker": "天上の調べ",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "エクスパンション・セット「狂騒議事」",
    "csid": "mad",
    "face_id": "c83",
    "say_0": "どうせ、殺されるわみんな。…みんな\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E/* 死ねばいいのに */",
    "say_1": "１人になるのゎ私ばっか。どっちの道ぉ選んでも、\u003Cbr\u003E私ゎ十分です。明日も待っててね。お願いだから、\u003Cbr\u003E離れて行かないで？\u003Cbr\u003Eいつまでも、\u003Cbr\u003Eなんで私ばっか\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E日記はそこで途切れ、発見されるまで打ち捨てられていた。\u003C/b\u003E",
    "_id": "mad_c83",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "c103",
    "job": "厭世家",
    "_id": "mad_c103",
    "chr_set_id": "mad"
  }, {
    "face_id": "c83",
    "job": "虹追い",
    "_id": "mad_c83",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad01",
    "job": "青い鳥",
    "_id": "mad_mad01",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad02",
    "job": "蟻塚崩し",
    "_id": "mad_mad02",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad03",
    "job": "露店巡り",
    "_id": "mad_mad03",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad04",
    "job": "酸味探し",
    "_id": "mad_mad04",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad05",
    "job": "天井手繰り",
    "_id": "mad_mad05",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad06",
    "job": "隠れん坊",
    "_id": "mad_mad06",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad07",
    "job": "早口言葉",
    "_id": "mad_mad07",
    "chr_set_id": "mad"
  }, {
    "face_id": "mad08",
    "job": "妄執の誓い",
    "_id": "mad_mad08",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "school",
    "admin": "校内放送",
    "maker": "校内放送",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "私立七転学園",
    "csid": "school",
    "face_id": "c99",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "school_c99",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "c01",
    "job": "華道部",
    "_id": "school_c01",
    "chr_set_id": "school"
  }, {
    "face_id": "c02",
    "job": "校長",
    "_id": "school_c02",
    "chr_set_id": "school"
  }, {
    "face_id": "c03",
    "job": "化学教師",
    "_id": "school_c03",
    "chr_set_id": "school"
  }, {
    "face_id": "c04",
    "job": "ＳＯＳ団",
    "_id": "school_c04",
    "chr_set_id": "school"
  }, {
    "face_id": "c05",
    "job": "留年生",
    "_id": "school_c05",
    "chr_set_id": "school"
  }, {
    "face_id": "c06",
    "job": "保健体育教師",
    "_id": "school_c06",
    "chr_set_id": "school"
  }, {
    "face_id": "c07",
    "job": "歴史教師",
    "_id": "school_c07",
    "chr_set_id": "school"
  }, {
    "face_id": "c08",
    "job": "図書委員",
    "_id": "school_c08",
    "chr_set_id": "school"
  }, {
    "face_id": "c09",
    "job": "動く銅像",
    "_id": "school_c09",
    "chr_set_id": "school"
  }, {
    "face_id": "c10",
    "job": "ミーハー",
    "_id": "school_c10",
    "chr_set_id": "school"
  }, {
    "face_id": "c11",
    "job": "優等生",
    "_id": "school_c11",
    "chr_set_id": "school"
  }, {
    "face_id": "c12",
    "job": "用務員",
    "_id": "school_c12",
    "chr_set_id": "school"
  }, {
    "face_id": "c13",
    "job": "生物教師",
    "_id": "school_c13",
    "chr_set_id": "school"
  }, {
    "face_id": "c14",
    "job": "コーラス部",
    "_id": "school_c14",
    "chr_set_id": "school"
  }, {
    "face_id": "c15",
    "job": "地理教師",
    "_id": "school_c15",
    "chr_set_id": "school"
  }, {
    "face_id": "c16",
    "job": "食堂のおねいさん",
    "_id": "school_c16",
    "chr_set_id": "school"
  }, {
    "face_id": "c17",
    "job": "演劇部顧問",
    "_id": "school_c17",
    "chr_set_id": "school"
  }, {
    "face_id": "c18",
    "job": "数学教師",
    "_id": "school_c18",
    "chr_set_id": "school"
  }, {
    "face_id": "c19",
    "job": "チアリーダー",
    "_id": "school_c19",
    "chr_set_id": "school"
  }, {
    "face_id": "c20",
    "job": "理事長の孫",
    "_id": "school_c20",
    "chr_set_id": "school"
  }, {
    "face_id": "c21",
    "job": "球部顧問",
    "_id": "school_c21",
    "chr_set_id": "school"
  }, {
    "face_id": "c22",
    "job": "農業科",
    "_id": "school_c22",
    "chr_set_id": "school"
  }, {
    "face_id": "c23",
    "job": "現国教師",
    "_id": "school_c23",
    "chr_set_id": "school"
  }, {
    "face_id": "c24",
    "job": "理事長",
    "_id": "school_c24",
    "chr_set_id": "school"
  }, {
    "face_id": "c25",
    "job": "校長の孫",
    "_id": "school_c25",
    "chr_set_id": "school"
  }, {
    "face_id": "c26",
    "job": "吹奏楽部",
    "_id": "school_c26",
    "chr_set_id": "school"
  }, {
    "face_id": "c27",
    "job": "手芸部",
    "_id": "school_c27",
    "chr_set_id": "school"
  }, {
    "face_id": "c28",
    "job": "文芸部",
    "_id": "school_c28",
    "chr_set_id": "school"
  }, {
    "face_id": "c29",
    "job": "新聞部",
    "_id": "school_c29",
    "chr_set_id": "school"
  }, {
    "face_id": "c30",
    "job": "飼育委員",
    "_id": "school_c30",
    "chr_set_id": "school"
  }, {
    "face_id": "c31",
    "job": "漫画研究部",
    "_id": "school_c31",
    "chr_set_id": "school"
  }, {
    "face_id": "c32",
    "job": "演劇部",
    "_id": "school_c32",
    "chr_set_id": "school"
  }, {
    "face_id": "c33",
    "job": "演劇部",
    "_id": "school_c33",
    "chr_set_id": "school"
  }, {
    "face_id": "c34",
    "job": "球児",
    "_id": "school_c34",
    "chr_set_id": "school"
  }, {
    "face_id": "c35",
    "job": "体育教師",
    "_id": "school_c35",
    "chr_set_id": "school"
  }, {
    "face_id": "c36",
    "job": "美術部",
    "_id": "school_c36",
    "chr_set_id": "school"
  }, {
    "face_id": "c37",
    "job": "音楽教師",
    "_id": "school_c37",
    "chr_set_id": "school"
  }, {
    "face_id": "c38",
    "job": "軽音楽部",
    "_id": "school_c38",
    "chr_set_id": "school"
  }, {
    "face_id": "c39",
    "job": "家政科教師",
    "_id": "school_c39",
    "chr_set_id": "school"
  }, {
    "face_id": "c40",
    "job": "教頭先生",
    "_id": "school_c40",
    "chr_set_id": "school"
  }, {
    "face_id": "c41",
    "job": "登山部",
    "_id": "school_c41",
    "chr_set_id": "school"
  }, {
    "face_id": "c42",
    "job": "生徒会執行部",
    "_id": "school_c42",
    "chr_set_id": "school"
  }, {
    "face_id": "c43",
    "job": "番長",
    "_id": "school_c43",
    "chr_set_id": "school"
  }, {
    "face_id": "c44",
    "job": "問題児",
    "_id": "school_c44",
    "chr_set_id": "school"
  }, {
    "face_id": "c45",
    "job": "スケバン",
    "_id": "school_c45",
    "chr_set_id": "school"
  }, {
    "face_id": "c46",
    "job": "保険医",
    "_id": "school_c46",
    "chr_set_id": "school"
  }, {
    "face_id": "c47",
    "job": "転校生",
    "_id": "school_c47",
    "chr_set_id": "school"
  }, {
    "face_id": "c48",
    "job": "美術教師",
    "_id": "school_c48",
    "chr_set_id": "school"
  }, {
    "face_id": "c49",
    "job": "技術教師",
    "_id": "school_c49",
    "chr_set_id": "school"
  }, {
    "face_id": "c50",
    "job": "風紀委員",
    "_id": "school_c50",
    "chr_set_id": "school"
  }, {
    "face_id": "c51",
    "job": "幽霊部員",
    "_id": "school_c51",
    "chr_set_id": "school"
  }, {
    "face_id": "c52",
    "job": "映画研究会",
    "_id": "school_c52",
    "chr_set_id": "school"
  }, {
    "face_id": "c53",
    "job": "寮管理人",
    "_id": "school_c53",
    "chr_set_id": "school"
  }, {
    "face_id": "c54",
    "job": "野球部",
    "_id": "school_c54",
    "chr_set_id": "school"
  }, {
    "face_id": "c55",
    "job": "肖像画",
    "_id": "school_c55",
    "chr_set_id": "school"
  }, {
    "face_id": "c56",
    "job": "世界史教師",
    "_id": "school_c56",
    "chr_set_id": "school"
  }, {
    "face_id": "c57",
    "job": "修士",
    "_id": "school_c57",
    "chr_set_id": "school"
  }, {
    "face_id": "c58",
    "job": "名誉教授",
    "_id": "school_c58",
    "chr_set_id": "school"
  }, {
    "face_id": "c59",
    "job": "修士",
    "_id": "school_c59",
    "chr_set_id": "school"
  }, {
    "face_id": "c60",
    "job": "ラクロス部",
    "_id": "school_c60",
    "chr_set_id": "school"
  }, {
    "face_id": "c61",
    "job": "魚拓部",
    "_id": "school_c61",
    "chr_set_id": "school"
  }, {
    "face_id": "c62",
    "job": "守衛",
    "_id": "school_c62",
    "chr_set_id": "school"
  }, {
    "face_id": "c63",
    "job": "マネージャー",
    "_id": "school_c63",
    "chr_set_id": "school"
  }, {
    "face_id": "c64",
    "job": "格闘技同好会",
    "_id": "school_c64",
    "chr_set_id": "school"
  }, {
    "face_id": "c65",
    "job": "教育実習",
    "_id": "school_c65",
    "chr_set_id": "school"
  }, {
    "face_id": "c66",
    "job": "茶道部顧問",
    "_id": "school_c66",
    "chr_set_id": "school"
  }, {
    "face_id": "c67",
    "job": "購買部",
    "_id": "school_c67",
    "chr_set_id": "school"
  }, {
    "face_id": "c68",
    "job": "後援者",
    "_id": "school_c68",
    "chr_set_id": "school"
  }, {
    "face_id": "c69",
    "job": "陶芸部",
    "_id": "school_c69",
    "chr_set_id": "school"
  }, {
    "face_id": "c70",
    "job": "先輩",
    "_id": "school_c70",
    "chr_set_id": "school"
  }, {
    "face_id": "c71",
    "job": "帰宅部",
    "_id": "school_c71",
    "chr_set_id": "school"
  }, {
    "face_id": "c72",
    "job": "ヴィジュアル系バンド部",
    "_id": "school_c72",
    "chr_set_id": "school"
  }, {
    "face_id": "c73",
    "job": "チアガール",
    "_id": "school_c73",
    "chr_set_id": "school"
  }, {
    "face_id": "c74",
    "job": "社交ダンス部",
    "_id": "school_c74",
    "chr_set_id": "school"
  }, {
    "face_id": "c75",
    "job": "演奏講師",
    "_id": "school_c75",
    "chr_set_id": "school"
  }, {
    "face_id": "c76",
    "job": "委員長",
    "_id": "school_c76",
    "chr_set_id": "school"
  }, {
    "face_id": "c77",
    "job": "いきもの係",
    "_id": "school_c77",
    "chr_set_id": "school"
  }, {
    "face_id": "c78",
    "job": "演劇部",
    "_id": "school_c78",
    "chr_set_id": "school"
  }, {
    "face_id": "c79",
    "job": "水泳部",
    "_id": "school_c79",
    "chr_set_id": "school"
  }, {
    "face_id": "c80",
    "job": "陸上部",
    "_id": "school_c80",
    "chr_set_id": "school"
  }, {
    "face_id": "c81",
    "job": "科学部",
    "_id": "school_c81",
    "chr_set_id": "school"
  }, {
    "face_id": "c82",
    "job": "ガリ勉",
    "_id": "school_c82",
    "chr_set_id": "school"
  }, {
    "face_id": "c83",
    "job": "放送部",
    "_id": "school_c83",
    "chr_set_id": "school"
  }, {
    "face_id": "c99",
    "job": "不登校児",
    "_id": "school_c99",
    "chr_set_id": "school"
  }, {
    "face_id": "c86",
    "job": "柔道部",
    "_id": "school_c86",
    "chr_set_id": "school"
  }, {
    "face_id": "c94",
    "job": "PTA会長",
    "_id": "school_c94",
    "chr_set_id": "school"
  }, {
    "face_id": "c92",
    "job": "テニス部",
    "_id": "school_c92",
    "chr_set_id": "school"
  }, {
    "face_id": "c90",
    "job": "ラグビー部",
    "_id": "school_c90",
    "chr_set_id": "school"
  }, {
    "face_id": "c95",
    "job": "人体模型",
    "_id": "school_c95",
    "chr_set_id": "school"
  }, {
    "face_id": "c97",
    "job": "駐在さん",
    "_id": "school_c97",
    "chr_set_id": "school"
  }, {
    "face_id": "c100",
    "job": "サッカー部",
    "_id": "school_c100",
    "chr_set_id": "school"
  }, {
    "face_id": "c106",
    "job": "水泳部顧問",
    "_id": "school_c106",
    "chr_set_id": "school"
  }, {
    "face_id": "c89",
    "job": "新任教師",
    "_id": "school_c89",
    "chr_set_id": "school"
  }, {
    "face_id": "c91",
    "job": "緑のおばさん",
    "_id": "school_c91",
    "chr_set_id": "school"
  }, {
    "face_id": "c93",
    "job": "書道部",
    "_id": "school_c93",
    "chr_set_id": "school"
  }, {
    "face_id": "c107",
    "job": "前理事長",
    "_id": "school_c107",
    "chr_set_id": "school"
  }, {
    "face_id": "c85",
    "job": "おてんば",
    "_id": "school_c85",
    "chr_set_id": "school"
  }, {
    "face_id": "c105",
    "job": "弓道部",
    "_id": "school_c105",
    "chr_set_id": "school"
  }, {
    "face_id": "c96",
    "job": "助教授",
    "_id": "school_c96",
    "chr_set_id": "school"
  }, {
    "face_id": "c98",
    "job": "教授",
    "_id": "school_c98",
    "chr_set_id": "school"
  }, {
    "face_id": "c101",
    "job": "園芸部",
    "_id": "school_c101",
    "chr_set_id": "school"
  }, {
    "face_id": "c104",
    "job": "剣道部",
    "_id": "school_c104",
    "chr_set_id": "school"
  }, {
    "face_id": "c108",
    "job": "無線部",
    "_id": "school_c108",
    "chr_set_id": "school"
  }, {
    "face_id": "c88",
    "job": "栄養士",
    "_id": "school_c88",
    "chr_set_id": "school"
  }, {
    "face_id": "c84",
    "job": "講師",
    "_id": "school_c84",
    "chr_set_id": "school"
  }, {
    "face_id": "c109",
    "job": "占い研究会",
    "_id": "school_c109",
    "chr_set_id": "school"
  }, {
    "face_id": "c102",
    "job": "前校長",
    "_id": "school_c102",
    "chr_set_id": "school"
  }, {
    "face_id": "c87",
    "job": "天文部",
    "_id": "school_c87",
    "chr_set_id": "school"
  }, {
    "face_id": "c103",
    "job": "オカルト同好会",
    "_id": "school_c103",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "sf",
    "admin": "黒体放射のエヴェレット解釈",
    "maker": "重ね合せ猫のユニタリ変換",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "明後日への道標",
    "csid": "SF",
    "face_id": "sf04",
    "say_0": "とたたたたんっ。\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eめざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。\u003Cbr\u003Eいちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。\u003C/b\u003E ",
    "say_1": "ちゅー！\u003Cbr\u003E\u003Cbr\u003E　ちゅー！\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eがりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……\u003C/b\u003E ",
    "_id": "sf_sf04",
    "chr_set_id": "sf"
  }, {
    "caption": "明後日への道標（ナユタ）",
    "csid": "SF_sf10",
    "face_id": "sf10",
    "say_0": "f*ck！またチオチモリンと二酸化炭素分圧だし！\u003Cbr\u003Eエアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E同日 整備日誌\u003Cbr\u003E　定期点検。ただちに健康に影響はないが、擦過痕…\u003C/b\u003E",
    "say_1": "よーf*ck'nおまえら。\u003Cbr\u003Eマジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？\u003Cbr\u003Eマジ怒んねーから手ぇ挙げ\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003Eぷつん\u003C/b\u003E\u003Cbr\u003E\u003Cbr\u003Eっと。瞬停った…。f*ck。\u003Cbr\u003Eちょっと外の様子見てくる。俺のプリン残しといてくれよ。\u003Cbr\u003E",
    "_id": "sf_sf10",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "sf01",
    "job": "通信士",
    "_id": "sf_sf01",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf02",
    "job": "哲学者",
    "_id": "sf_sf02",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf03",
    "job": "道案内",
    "_id": "sf_sf03",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf04",
    "job": "お散歩隊長",
    "_id": "sf_sf04",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf05",
    "job": "新製品",
    "_id": "sf_sf05",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf06",
    "job": "士官",
    "_id": "sf_sf06",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf07",
    "job": "遊泳員",
    "_id": "sf_sf07",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf08",
    "job": "服飾商",
    "_id": "sf_sf08",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf09",
    "job": "研修生",
    "_id": "sf_sf09",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf10",
    "job": "保安技師",
    "_id": "sf_sf10",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf11",
    "job": "艇長",
    "_id": "sf_sf11",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf12",
    "job": "廃神",
    "_id": "sf_sf12",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf13",
    "job": "消防隊長",
    "_id": "sf_sf13",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf14",
    "job": "対面販売",
    "_id": "sf_sf14",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf15",
    "job": "忍者隊",
    "_id": "sf_sf15",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf16",
    "job": "保険調査",
    "_id": "sf_sf16",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf17",
    "job": "幽閉児",
    "_id": "sf_sf17",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf18",
    "job": "感性子",
    "_id": "sf_sf18",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf19",
    "job": "理性子",
    "_id": "sf_sf19",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf20",
    "job": "測量士",
    "_id": "sf_sf20",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "time",
    "admin": "第四の壁の深奥",
    "maker": "次元X式コンピューター",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "エクスパンション・セット「帰還者議事」",
    "csid": "time",
    "face_id": "c10",
    "say_0": "M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。",
    "say_1": "やっぱさ、銃を持った善人がいないとさ。\u003Cbr\u003E\u003Cbr\u003Eちょっと出かけてくる！プリン食べちゃダメだよ！",
    "_id": "time_c10",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "c10",
    "job": "小銃協会",
    "_id": "time_c10",
    "chr_set_id": "time"
  }, {
    "face_id": "t01",
    "job": "友愛組合",
    "_id": "time_t01",
    "chr_set_id": "time"
  }, {
    "face_id": "t02",
    "job": "幸運の科学",
    "_id": "time_t02",
    "chr_set_id": "time"
  }, {
    "face_id": "t03",
    "job": "FSM団",
    "_id": "time_t03",
    "chr_set_id": "time"
  }, {
    "face_id": "t04",
    "job": "截拳道",
    "_id": "time_t04",
    "chr_set_id": "time"
  }, {
    "face_id": "t05",
    "job": "開放的市民",
    "_id": "time_t05",
    "chr_set_id": "time"
  }, {
    "face_id": "c09",
    "job": "暗殺教団",
    "_id": "time_c09",
    "chr_set_id": "time"
  }, {
    "face_id": "t06",
    "job": "死ね死ね団",
    "_id": "time_t06",
    "chr_set_id": "time"
  }, {
    "face_id": "t07",
    "job": "勧善懲悪委",
    "_id": "time_t07",
    "chr_set_id": "time"
  }, {
    "face_id": "t08",
    "job": "覆面嫉妬団",
    "_id": "time_t08",
    "chr_set_id": "time"
  }, {
    "face_id": "t09",
    "job": "匿名軍団",
    "_id": "time_t09",
    "chr_set_id": "time"
  }, {
    "face_id": "t10",
    "job": "営利政府",
    "_id": "time_t10",
    "chr_set_id": "time"
  }, {
    "face_id": "t11",
    "job": "鷹の爪団",
    "_id": "time_t11",
    "chr_set_id": "time"
  }, {
    "face_id": "t12",
    "job": "地下鉄道",
    "_id": "time_t12",
    "chr_set_id": "time"
  }, {
    "face_id": "t13",
    "job": "MNU機関",
    "_id": "time_t13",
    "chr_set_id": "time"
  }, {
    "face_id": "t14",
    "job": "猫の集会",
    "_id": "time_t14",
    "chr_set_id": "time"
  }, {
    "face_id": "t15",
    "job": "少年探偵団",
    "_id": "time_t15",
    "chr_set_id": "time"
  }, {
    "face_id": "t16",
    "job": "安全保障局",
    "_id": "time_t16",
    "chr_set_id": "time"
  }, {
    "face_id": "t17",
    "job": "薔薇∴十字",
    "_id": "time_t17",
    "chr_set_id": "time"
  }, {
    "face_id": "t18",
    "job": "白銀∴秘星",
    "_id": "time_t18",
    "chr_set_id": "time"
  }, {
    "face_id": "t19",
    "job": "聖戦士募集",
    "_id": "time_t19",
    "chr_set_id": "time"
  }, {
    "face_id": "t20",
    "job": "MI:18",
    "_id": "time_t20",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "wa",
    "admin": "闇の呟き",
    "maker": "稲荷のお告げ",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "和の国てやんでえ",
    "csid": "wa",
    "face_id": "w17",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "wa_w17",
    "chr_set_id": "wa"
  }, {
    "caption": "和の国てやんでえ（仁右衛門）",
    "csid": "wa_w23",
    "face_id": "w23",
    "say_0": "なんと、これは奇っ怪……分かったゾ！",
    "say_1": "やっぱり人狼は実在するんだヨ！　うっひょひょーい！",
    "_id": "wa_w23",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "w01",
    "job": "役者",
    "_id": "wa_w01",
    "chr_set_id": "wa"
  }, {
    "face_id": "w02",
    "job": "浪人",
    "_id": "wa_w02",
    "chr_set_id": "wa"
  }, {
    "face_id": "w03",
    "job": "忍者",
    "_id": "wa_w03",
    "chr_set_id": "wa"
  }, {
    "face_id": "w04",
    "job": "町娘",
    "_id": "wa_w04",
    "chr_set_id": "wa"
  }, {
    "face_id": "w05",
    "job": "飴師",
    "_id": "wa_w05",
    "chr_set_id": "wa"
  }, {
    "face_id": "w06",
    "job": "巫女",
    "_id": "wa_w06",
    "chr_set_id": "wa"
  }, {
    "face_id": "w07",
    "job": "双子",
    "_id": "wa_w07",
    "chr_set_id": "wa"
  }, {
    "face_id": "w08",
    "job": "双子",
    "_id": "wa_w08",
    "chr_set_id": "wa"
  }, {
    "face_id": "w09",
    "job": "宣教師",
    "_id": "wa_w09",
    "chr_set_id": "wa"
  }, {
    "face_id": "w10",
    "job": "刺客",
    "_id": "wa_w10",
    "chr_set_id": "wa"
  }, {
    "face_id": "w11",
    "job": "釣り師",
    "_id": "wa_w11",
    "chr_set_id": "wa"
  }, {
    "face_id": "w12",
    "job": "女中",
    "_id": "wa_w12",
    "chr_set_id": "wa"
  }, {
    "face_id": "w13",
    "job": "団子屋",
    "_id": "wa_w13",
    "chr_set_id": "wa"
  }, {
    "face_id": "w14",
    "job": "手妻師",
    "_id": "wa_w14",
    "chr_set_id": "wa"
  }, {
    "face_id": "w15",
    "job": "山姥",
    "_id": "wa_w15",
    "chr_set_id": "wa"
  }, {
    "face_id": "w16",
    "job": "髪結い",
    "_id": "wa_w16",
    "chr_set_id": "wa"
  }, {
    "face_id": "w17",
    "job": "病人",
    "_id": "wa_w17",
    "chr_set_id": "wa"
  }, {
    "face_id": "w18",
    "job": "後妻",
    "_id": "wa_w18",
    "chr_set_id": "wa"
  }, {
    "face_id": "w20",
    "job": "呉服問屋",
    "_id": "wa_w20",
    "chr_set_id": "wa"
  }, {
    "face_id": "w21",
    "job": "うどん職人",
    "_id": "wa_w21",
    "chr_set_id": "wa"
  }, {
    "face_id": "w22",
    "job": "そば職人",
    "_id": "wa_w22",
    "chr_set_id": "wa"
  }, {
    "face_id": "w23",
    "job": "弁士",
    "_id": "wa_w23",
    "chr_set_id": "wa"
  }, {
    "face_id": "w24",
    "job": "喧嘩屋",
    "_id": "wa_w24",
    "chr_set_id": "wa"
  }, {
    "face_id": "w25",
    "job": "説法師",
    "_id": "wa_w25",
    "chr_set_id": "wa"
  }, {
    "face_id": "w26",
    "job": "餓鬼大将",
    "_id": "wa_w26",
    "chr_set_id": "wa"
  }, {
    "face_id": "w27",
    "job": "発明家",
    "_id": "wa_w27",
    "chr_set_id": "wa"
  }, {
    "face_id": "w28",
    "job": "飛脚",
    "_id": "wa_w28",
    "chr_set_id": "wa"
  }, {
    "face_id": "w29",
    "job": "琴弾き",
    "_id": "wa_w29",
    "chr_set_id": "wa"
  }, {
    "face_id": "w30",
    "job": "宗主",
    "_id": "wa_w30",
    "chr_set_id": "wa"
  }, {
    "face_id": "w31",
    "job": "子守り",
    "_id": "wa_w31",
    "chr_set_id": "wa"
  }, {
    "face_id": "w32",
    "job": "落胤",
    "_id": "wa_w32",
    "chr_set_id": "wa"
  }, {
    "face_id": "w33",
    "job": "船大工",
    "_id": "wa_w33",
    "chr_set_id": "wa"
  }, {
    "face_id": "w34",
    "job": "野伏り",
    "_id": "wa_w34",
    "chr_set_id": "wa"
  }, {
    "face_id": "w35",
    "job": "神主",
    "_id": "wa_w35",
    "chr_set_id": "wa"
  }, {
    "face_id": "w36",
    "job": "楽士",
    "_id": "wa_w36",
    "chr_set_id": "wa"
  }, {
    "face_id": "w37",
    "job": "薬売り",
    "_id": "wa_w37",
    "chr_set_id": "wa"
  }, {
    "face_id": "w38",
    "job": "門下生",
    "_id": "wa_w38",
    "chr_set_id": "wa"
  }, {
    "face_id": "w39",
    "job": "武家の娘",
    "_id": "wa_w39",
    "chr_set_id": "wa"
  }, {
    "face_id": "w40",
    "job": "懐刀",
    "_id": "wa_w40",
    "chr_set_id": "wa"
  }, {
    "face_id": "w41",
    "job": "物乞い",
    "_id": "wa_w41",
    "chr_set_id": "wa"
  }, {
    "face_id": "w43",
    "job": "丁稚",
    "_id": "wa_w43",
    "chr_set_id": "wa"
  }, {
    "face_id": "w44",
    "job": "機織り",
    "_id": "wa_w44",
    "chr_set_id": "wa"
  }, {
    "face_id": "w45",
    "job": "座敷守",
    "_id": "wa_w45",
    "chr_set_id": "wa"
  }, {
    "face_id": "w46",
    "job": "屍漁り",
    "_id": "wa_w46",
    "chr_set_id": "wa"
  }, {
    "face_id": "w47",
    "job": "肥代取り",
    "_id": "wa_w47",
    "chr_set_id": "wa"
  }, {
    "face_id": "w48",
    "job": "和算家",
    "_id": "wa_w48",
    "chr_set_id": "wa"
  }, {
    "_id": "wa_w49",
    "face_id": "w49",
    "job": "抜荷",
    "chr_set_id": "wa"
  }, {
    "face_id": "w50",
    "job": "半の目",
    "_id": "wa_w50",
    "chr_set_id": "wa"
  }, {
    "face_id": "w51",
    "job": "真剣師",
    "_id": "wa_w51",
    "chr_set_id": "wa"
  }, {
    "face_id": "w52",
    "job": "看板娘",
    "_id": "wa_w52",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "ririnra",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "人狼議事（キャサリン）",
    "csid": "ririnra_c05",
    "face_id": "c05",
    "say_0": "たいへん、たいへん、たいへん！",
    "say_1": "大変、人狼が出たよ！　いつもは嘘だけど、今度は本当の本当に本当！",
    "_id": "ririnra_c05",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ベネット）",
    "csid": "ririnra_c08",
    "face_id": "c08",
    "say_0": "壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。\u003Cbr\u003E明日は、もう……",
    "say_1": "足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば\u003Cbr\u003E\u003Cbr\u003E\u003Cb\u003E日記はそこで途切れ、発見されるまで打ち捨てられていた。\u003C/b\u003E",
    "_id": "ririnra_c08",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（タバサ）",
    "csid": "ririnra_c19",
    "face_id": "c19",
    "say_0": "ねぇ、遊んでかない？今夜はあなたが狼よ……",
    "say_1": "人狼なんているわけないじゃん？みんな大げさなのさ。",
    "_id": "ririnra_c19",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ソフィア）",
    "csid": "ririnra_c67",
    "face_id": "c67",
    "say_0": "こんばんわ、こんな遅くにたいへんですね。\u003Cbr\u003E\u003Cbr\u003E………\u003Cbr\u003E行っちゃった。へんなの。",
    "say_1": "まさかあの時、あのひとが……？\u003Cbr\u003E人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！",
    "_id": "ririnra_c67",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヨアヒム）",
    "csid": "ririnra_c68",
    "face_id": "c68",
    "say_0": "ふひ、ふひひ！人狼になど……くれてやるものかヨ！",
    "say_1": "人殺しと一緒にいるなんてごめんだヨ！へ…へっ、部屋に戻らせてもらうヨ！",
    "_id": "ririnra_c68",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヴェスパタイン）",
    "csid": "ririnra_c72",
    "face_id": "c72",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "ririnra_c72",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（ヨーランダ）",
    "csid": "ririnra_c51",
    "face_id": "c51",
    "say_0": "夜風に乗って、遠くから声がとどきます。昨夜は幽かに。今夜は響き。きっと明日は……",
    "say_1": "……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。\u003Cbr\u003E幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。",
    "_id": "ririnra_c51",
    "chr_set_id": "ririnra"
  }, {
    "_id": "ririnra_c20",
    "caption": "人狼議事（グロリア）",
    "csid": "ririnra_c20",
    "face_id": "c20",
    "say_0": "紳士ならびに淑女の皆様、わたくしの館へようこそ。\u003Cbr\u003E世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。",
    "say_1": "ちょっと！そこの貴方、何をしているの！\u003Cbr\u003E聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（オスカー）",
    "csid": "ririnra_c32",
    "face_id": "c32",
    "say_0": "…そっちじゃないよ、こっちだよ。\u003Cbr\u003Eここ、秘密基地なんだ。雨もへいきだし暖かいよ。",
    "say_1": "ねえ。見て見て。パン持ってきたんだ。\u003Cbr\u003Eみんなにはナイショだよ？",
    "_id": "ririnra_c32",
    "chr_set_id": "ririnra"
  }, {
    "csid": "ririnra",
    "caption": "人狼議事",
    "say_0": "嗚呼、聞こえ る。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "face_id": "c99",
    "_id": "ririnra_c99",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "c01",
    "job": "花売り",
    "_id": "ririnra_c01",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c02",
    "job": "村長",
    "_id": "ririnra_c02",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c03",
    "job": "見習い医師",
    "_id": "ririnra_c03",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c04",
    "job": "女中",
    "_id": "ririnra_c04",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c05",
    "job": "病人",
    "_id": "ririnra_c05",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c06",
    "job": "紐",
    "_id": "ririnra_c06",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c07",
    "job": "雑貨屋",
    "_id": "ririnra_c07",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c08",
    "job": "本屋",
    "_id": "ririnra_c08",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c09",
    "job": "刺客",
    "_id": "ririnra_c09",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c10",
    "job": "小娘",
    "_id": "ririnra_c10",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c11",
    "job": "小僧",
    "_id": "ririnra_c11",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c12",
    "job": "御者",
    "_id": "ririnra_c12",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c13",
    "job": "ベテラン医師",
    "_id": "ririnra_c13",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c14",
    "job": "聖歌隊員",
    "_id": "ririnra_c14",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c15",
    "job": "郵便屋",
    "_id": "ririnra_c15",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c16",
    "job": "食いしん坊",
    "_id": "ririnra_c16",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c17",
    "job": "詩人",
    "_id": "ririnra_c17",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c18",
    "job": "ベテラン看護婦",
    "_id": "ririnra_c18",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c19",
    "job": "水商売",
    "_id": "ririnra_c19",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c20",
    "job": "良家の娘",
    "_id": "ririnra_c20",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c21",
    "job": "肉屋",
    "_id": "ririnra_c21",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c22",
    "job": "百姓",
    "_id": "ririnra_c22",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c23",
    "job": "伝道師",
    "_id": "ririnra_c23",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c24",
    "job": "長老",
    "_id": "ririnra_c24",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c25",
    "job": "良家の息子",
    "_id": "ririnra_c25",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c26",
    "job": "楽器職人",
    "_id": "ririnra_c26",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c27",
    "job": "牧人",
    "_id": "ririnra_c27",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c28",
    "job": "読書家",
    "_id": "ririnra_c28",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c29",
    "job": "記者",
    "_id": "ririnra_c29",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c30",
    "job": "鳥使い",
    "_id": "ririnra_c30",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c31",
    "job": "童話作家",
    "_id": "ririnra_c31",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c32",
    "job": "双生児",
    "_id": "ririnra_c32",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c33",
    "job": "双生児",
    "_id": "ririnra_c33",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c34",
    "job": "靴磨き",
    "_id": "ririnra_c34",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c35",
    "job": "親方",
    "_id": "ririnra_c35",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c36",
    "job": "飾り職",
    "_id": "ririnra_c36",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c37",
    "job": "奏者",
    "_id": "ririnra_c37",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c38",
    "job": "歌い手",
    "_id": "ririnra_c38",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c39",
    "job": "仕立て屋",
    "_id": "ririnra_c39",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c40",
    "job": "執事",
    "_id": "ririnra_c40",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c41",
    "job": "さすらい人",
    "_id": "ririnra_c41",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c42",
    "job": "掃除夫",
    "_id": "ririnra_c42",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c43",
    "job": "森番",
    "_id": "ririnra_c43",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c44",
    "job": "小悪党",
    "_id": "ririnra_c44",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c45",
    "job": "博徒",
    "_id": "ririnra_c45",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c46",
    "job": "助手",
    "_id": "ririnra_c46",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c47",
    "job": "流浪者",
    "_id": "ririnra_c47",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c48",
    "job": "宝石収集家",
    "_id": "ririnra_c48",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c49",
    "job": "石工",
    "_id": "ririnra_c49",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c50",
    "job": "会計士",
    "_id": "ririnra_c50",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c51",
    "job": "墓守",
    "_id": "ririnra_c51",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c52",
    "job": "墓堀",
    "_id": "ririnra_c52",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c53",
    "job": "大地主",
    "_id": "ririnra_c53",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c54",
    "job": "理髪師",
    "_id": "ririnra_c54",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c55",
    "job": "寡婦",
    "_id": "ririnra_c55",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c56",
    "job": "酒屋",
    "_id": "ririnra_c56",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c57",
    "job": "修道女",
    "_id": "ririnra_c57",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c58",
    "job": "司祭",
    "_id": "ririnra_c58",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c59",
    "job": "修道士",
    "_id": "ririnra_c59",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c60",
    "job": "良家の末娘",
    "_id": "ririnra_c60",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c61",
    "job": "釣り師",
    "_id": "ririnra_c61",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c62",
    "job": "風来坊",
    "_id": "ririnra_c62",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c63",
    "job": "漂白工",
    "_id": "ririnra_c63",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c64",
    "job": "墓荒らし",
    "_id": "ririnra_c64",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c65",
    "job": "始末屋",
    "_id": "ririnra_c65",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c66",
    "job": "紅茶屋",
    "_id": "ririnra_c66",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c67",
    "job": "店番",
    "_id": "ririnra_c67",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c68",
    "job": "賭場の主",
    "_id": "ririnra_c68",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c69",
    "job": "美術家",
    "_id": "ririnra_c69",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c70",
    "job": "子守り",
    "_id": "ririnra_c70",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c71",
    "job": "道案内",
    "_id": "ririnra_c71",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c72",
    "job": "ランタン職人",
    "_id": "ririnra_c72",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c73",
    "job": "水商売",
    "_id": "ririnra_c73",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c74",
    "job": "踊り手",
    "_id": "ririnra_c74",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c75",
    "job": "奏者",
    "_id": "ririnra_c75",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c76",
    "job": "留守番",
    "_id": "ririnra_c76",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c77",
    "job": "馬飼い",
    "_id": "ririnra_c77",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c78",
    "job": "道化師",
    "_id": "ririnra_c78",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c79",
    "job": "長老の孫",
    "_id": "ririnra_c79",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c80",
    "job": "若者",
    "_id": "ririnra_c80",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c81",
    "job": "薬屋",
    "_id": "ririnra_c81",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c82",
    "job": "執事見習い",
    "_id": "ririnra_c82",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c83",
    "job": "受付",
    "_id": "ririnra_c83",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c84",
    "job": "妻",
    "_id": "ririnra_c84",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c85",
    "job": "お使い",
    "_id": "ririnra_c85",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c86",
    "job": "放蕩者",
    "_id": "ririnra_c86",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c87",
    "job": "病人",
    "_id": "ririnra_c87",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c88",
    "job": "料理人",
    "_id": "ririnra_c88",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c99",
    "job": "厭世家",
    "_id": "ririnra_c99",
    "chr_set_id": "ririnra"
  }, {
    "job": "新妻",
    "face_id": "c89",
    "_id": "ririnra_c89",
    "chr_set_id": "ririnra"
  }, {
    "job": "粉ひき",
    "face_id": "c90",
    "_id": "ririnra_c90",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c91",
    "_id": "ririnra_c91",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c92",
    "_id": "ririnra_c92",
    "chr_set_id": "ririnra"
  }, {
    "job": "洗濯婦",
    "face_id": "c93",
    "_id": "ririnra_c93",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c94",
    "job": "女主人",
    "_id": "ririnra_c94",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c95",
    "job": "新聞配達",
    "_id": "ririnra_c95",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c96",
    "job": "学者",
    "_id": "ririnra_c96",
    "chr_set_id": "ririnra"
  }, {
    "job": "捜査官",
    "face_id": "c97",
    "_id": "ririnra_c97",
    "chr_set_id": "ririnra"
  }, {
    "job": "探偵",
    "face_id": "c98",
    "_id": "ririnra_c98",
    "chr_set_id": "ririnra"
  }, {
    "job": "徒弟",
    "face_id": "c100",
    "_id": "ririnra_c100",
    "chr_set_id": "ririnra"
  }, {
    "job": "手伝い",
    "face_id": "c101",
    "_id": "ririnra_c101",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c102",
    "job": "指揮者",
    "_id": "ririnra_c102",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c103",
    "job": "厭世家",
    "_id": "ririnra_c103",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c104",
    "job": "負傷兵",
    "_id": "ririnra_c104",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c105",
    "job": "教え子",
    "_id": "ririnra_c105",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c106",
    "job": "魚屋",
    "_id": "ririnra_c106",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c107",
    "job": "成金",
    "_id": "ririnra_c107",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c108",
    "job": "採集人",
    "_id": "ririnra_c108",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c109",
    "job": "村娘",
    "_id": "ririnra_c109",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c110",
    "job": "ろくでなし",
    "_id": "ririnra_c110",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c111",
    "job": "愛人",
    "_id": "ririnra_c111",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c112",
    "job": "許婚",
    "_id": "ririnra_c112",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c113",
    "job": "紐",
    "_id": "ririnra_c113",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c114",
    "job": "革命家",
    "_id": "ririnra_c114",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "animal",
    "admin": "大地の震動",
    "maker": "草原のざわめき",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "うきうきサバンナ",
    "csid": "animal",
    "face_id": "c99",
    "say_0": "嗚呼、聞こえる。やつの足音が聞こえる……。",
    "say_1": "逃げろ。逃げろ！おまえらだけでも逃げろ。",
    "_id": "animal_c99",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "c01",
    "job": "こじか",
    "_id": "animal_c01",
    "chr_set_id": "animal"
  }, {
    "face_id": "c02",
    "job": "よーくしゃーてりあ",
    "_id": "animal_c02",
    "chr_set_id": "animal"
  }, {
    "face_id": "c03",
    "job": "かもすぞ",
    "_id": "animal_c03",
    "chr_set_id": "animal"
  }, {
    "face_id": "c04",
    "job": "くろひょう",
    "_id": "animal_c04",
    "chr_set_id": "animal"
  }, {
    "face_id": "c05",
    "job": "いとまきえい",
    "_id": "animal_c05",
    "chr_set_id": "animal"
  }, {
    "face_id": "c06",
    "job": "へび",
    "_id": "animal_c06",
    "chr_set_id": "animal"
  }, {
    "face_id": "c07",
    "job": "てのりぶんちょう",
    "_id": "animal_c07",
    "chr_set_id": "animal"
  }, {
    "face_id": "c08",
    "job": "たぬき",
    "_id": "animal_c08",
    "chr_set_id": "animal"
  }, {
    "face_id": "c09",
    "job": "にほんおおかみ",
    "_id": "animal_c09",
    "chr_set_id": "animal"
  }, {
    "face_id": "c10",
    "job": "そまり",
    "_id": "animal_c10",
    "chr_set_id": "animal"
  }, {
    "face_id": "c11",
    "job": "みけ",
    "_id": "animal_c11",
    "chr_set_id": "animal"
  }, {
    "face_id": "r12",
    "job": "うえきばち",
    "_id": "animal_r12",
    "chr_set_id": "animal"
  }, {
    "face_id": "c13",
    "job": "かたつむり",
    "_id": "animal_c13",
    "chr_set_id": "animal"
  }, {
    "face_id": "c14",
    "job": "くらげ",
    "_id": "animal_c14",
    "chr_set_id": "animal"
  }, {
    "face_id": "c15",
    "job": "しゃち",
    "_id": "animal_c15",
    "chr_set_id": "animal"
  }, {
    "face_id": "c16",
    "job": "あふりかぞう",
    "_id": "animal_c16",
    "chr_set_id": "animal"
  }, {
    "face_id": "c17",
    "job": "おらうーたん",
    "_id": "animal_c17",
    "chr_set_id": "animal"
  }, {
    "face_id": "c18",
    "job": "かまきり",
    "_id": "animal_c18",
    "chr_set_id": "animal"
  }, {
    "face_id": "c19",
    "job": "あげはちょう",
    "_id": "animal_c19",
    "chr_set_id": "animal"
  }, {
    "face_id": "c20",
    "job": "とら",
    "_id": "animal_c20",
    "chr_set_id": "animal"
  }, {
    "face_id": "c21",
    "job": "おおたこ",
    "_id": "animal_c21",
    "chr_set_id": "animal"
  }, {
    "face_id": "c22",
    "job": "うちゅうせん",
    "_id": "animal_c22",
    "chr_set_id": "animal"
  }, {
    "face_id": "c23",
    "job": "ぱんだ",
    "_id": "animal_c23",
    "chr_set_id": "animal"
  }, {
    "face_id": "c24",
    "job": "ぶるどっぐ",
    "_id": "animal_c24",
    "chr_set_id": "animal"
  }, {
    "face_id": "c25",
    "job": "うし",
    "_id": "animal_c25",
    "chr_set_id": "animal"
  }, {
    "face_id": "c26",
    "job": "えりまきとかげ",
    "_id": "animal_c26",
    "chr_set_id": "animal"
  }, {
    "face_id": "c27",
    "job": "ひつじ",
    "_id": "animal_c27",
    "chr_set_id": "animal"
  }, {
    "face_id": "c28",
    "job": "うさぎ",
    "_id": "animal_c28",
    "chr_set_id": "animal"
  }, {
    "face_id": "c29",
    "job": "しまうま",
    "_id": "animal_c29",
    "chr_set_id": "animal"
  }, {
    "face_id": "c30",
    "job": "おうむ",
    "_id": "animal_c30",
    "chr_set_id": "animal"
  }, {
    "face_id": "c31",
    "job": "かえる",
    "_id": "animal_c31",
    "chr_set_id": "animal"
  }, {
    "face_id": "c32",
    "job": "きんぎょ",
    "_id": "animal_c32",
    "chr_set_id": "animal"
  }, {
    "face_id": "c33",
    "job": "ねったいぎょ",
    "_id": "animal_c33",
    "chr_set_id": "animal"
  }, {
    "face_id": "c34",
    "job": "すなねずみ",
    "_id": "animal_c34",
    "chr_set_id": "animal"
  }, {
    "face_id": "c35",
    "job": "ごりら",
    "_id": "animal_c35",
    "chr_set_id": "animal"
  }, {
    "face_id": "c36",
    "job": "さらぶれっど",
    "_id": "animal_c36",
    "chr_set_id": "animal"
  }, {
    "face_id": "c37",
    "job": "ぺるしゃ",
    "_id": "animal_c37",
    "chr_set_id": "animal"
  }, {
    "face_id": "c38",
    "job": "だいおういか",
    "_id": "animal_c38",
    "chr_set_id": "animal"
  }, {
    "face_id": "c39",
    "job": "もみのき",
    "_id": "animal_c39",
    "chr_set_id": "animal"
  }, {
    "face_id": "c40",
    "job": "らいおん",
    "_id": "animal_c40",
    "chr_set_id": "animal"
  }, {
    "face_id": "c41",
    "job": "ろぶすたー",
    "_id": "animal_c41",
    "chr_set_id": "animal"
  }, {
    "face_id": "c42",
    "job": "みつりょうしゃ",
    "_id": "animal_c42",
    "chr_set_id": "animal"
  }, {
    "face_id": "c43",
    "job": "くまー",
    "_id": "animal_c43",
    "chr_set_id": "animal"
  }, {
    "face_id": "c44",
    "job": "いわとびぺんぎん",
    "_id": "animal_c44",
    "chr_set_id": "animal"
  }, {
    "face_id": "c45",
    "job": "はいえな",
    "_id": "animal_c45",
    "chr_set_id": "animal"
  }, {
    "face_id": "c46",
    "job": "あらいぐま",
    "_id": "animal_c46",
    "chr_set_id": "animal"
  }, {
    "face_id": "c47",
    "job": "しろまどうし",
    "_id": "animal_c47",
    "chr_set_id": "animal"
  }, {
    "face_id": "c48",
    "job": "くじゃく",
    "_id": "animal_c48",
    "chr_set_id": "animal"
  }, {
    "face_id": "c49",
    "job": "にほんざる",
    "_id": "animal_c49",
    "chr_set_id": "animal"
  }, {
    "face_id": "c50",
    "job": "きつね",
    "_id": "animal_c50",
    "chr_set_id": "animal"
  }, {
    "face_id": "c51",
    "job": "かげろう",
    "_id": "animal_c51",
    "chr_set_id": "animal"
  }, {
    "face_id": "c52",
    "job": "ありじごく",
    "_id": "animal_c52",
    "chr_set_id": "animal"
  }, {
    "face_id": "c53",
    "job": "やみふくろう",
    "_id": "animal_c53",
    "chr_set_id": "animal"
  }, {
    "face_id": "c54",
    "job": "さめ",
    "_id": "animal_c54",
    "chr_set_id": "animal"
  }, {
    "face_id": "c55",
    "job": "もるふぉちょう",
    "_id": "animal_c55",
    "chr_set_id": "animal"
  }, {
    "face_id": "c56",
    "job": "ぶた",
    "_id": "animal_c56",
    "chr_set_id": "animal"
  }, {
    "face_id": "c57",
    "job": "らくだ",
    "_id": "animal_c57",
    "chr_set_id": "animal"
  }, {
    "face_id": "c58",
    "job": "ゆにこーん",
    "_id": "animal_c58",
    "chr_set_id": "animal"
  }, {
    "face_id": "c59",
    "job": "れとりばー",
    "_id": "animal_c59",
    "chr_set_id": "animal"
  }, {
    "face_id": "c60",
    "job": "はむすたー",
    "_id": "animal_c60",
    "chr_set_id": "animal"
  }, {
    "face_id": "c61",
    "job": "すっぽん",
    "_id": "animal_c61",
    "chr_set_id": "animal"
  }, {
    "face_id": "c62",
    "job": "きつねりす",
    "_id": "animal_c62",
    "chr_set_id": "animal"
  }, {
    "face_id": "c63",
    "job": "おこじょ",
    "_id": "animal_c63",
    "chr_set_id": "animal"
  }, {
    "face_id": "c64",
    "job": "やまあらし",
    "_id": "animal_c64",
    "chr_set_id": "animal"
  }, {
    "face_id": "c65",
    "job": "ちすいこうもり",
    "_id": "animal_c65",
    "chr_set_id": "animal"
  }, {
    "face_id": "c66",
    "job": "ばいにん",
    "_id": "animal_c66",
    "chr_set_id": "animal"
  }, {
    "face_id": "c67",
    "job": "りす",
    "_id": "animal_c67",
    "chr_set_id": "animal"
  }, {
    "face_id": "c68",
    "job": "なまこ",
    "_id": "animal_c68",
    "chr_set_id": "animal"
  }, {
    "face_id": "c69",
    "job": "びーる",
    "_id": "animal_c69",
    "chr_set_id": "animal"
  }, {
    "face_id": "c70",
    "job": "かんがるー",
    "_id": "animal_c70",
    "chr_set_id": "animal"
  }, {
    "face_id": "c71",
    "job": "なまけもの",
    "_id": "animal_c71",
    "chr_set_id": "animal"
  }, {
    "face_id": "c72",
    "job": "ほたる",
    "_id": "animal_c72",
    "chr_set_id": "animal"
  }, {
    "face_id": "c73",
    "job": "くりおね",
    "_id": "animal_c73",
    "chr_set_id": "animal"
  }, {
    "face_id": "c74",
    "job": "はいびすかす",
    "_id": "animal_c74",
    "chr_set_id": "animal"
  }, {
    "face_id": "c75",
    "job": "いえてぃ",
    "_id": "animal_c75",
    "chr_set_id": "animal"
  }, {
    "face_id": "c76",
    "job": "めがねざる",
    "_id": "animal_c76",
    "chr_set_id": "animal"
  }, {
    "face_id": "c77",
    "job": "にんじん",
    "_id": "animal_c77",
    "chr_set_id": "animal"
  }, {
    "face_id": "c78",
    "job": "かめれおん",
    "_id": "animal_c78",
    "chr_set_id": "animal"
  }, {
    "face_id": "c79",
    "job": "わかめ",
    "_id": "animal_c79",
    "chr_set_id": "animal"
  }, {
    "face_id": "c80",
    "job": "りかおん",
    "_id": "animal_c80",
    "chr_set_id": "animal"
  }, {
    "face_id": "c81",
    "job": "ふぇねっく",
    "_id": "animal_c81",
    "chr_set_id": "animal"
  }, {
    "face_id": "c82",
    "job": "どぶねずみ",
    "_id": "animal_c82",
    "chr_set_id": "animal"
  }, {
    "face_id": "c83",
    "job": "いそぎんちゃく",
    "_id": "animal_c83",
    "chr_set_id": "animal"
  }, {
    "face_id": "c99",
    "job": "しんかいぎょ",
    "_id": "animal_c99",
    "chr_set_id": "animal"
  }, {
    "face_id": "c86",
    "job": "かも",
    "_id": "animal_c86",
    "chr_set_id": "animal"
  }, {
    "face_id": "c94",
    "job": "あかまむし",
    "_id": "animal_c94",
    "chr_set_id": "animal"
  }, {
    "face_id": "c92",
    "job": "さば",
    "_id": "animal_c92",
    "chr_set_id": "animal"
  }, {
    "face_id": "c90",
    "job": "さい",
    "_id": "animal_c90",
    "chr_set_id": "animal"
  }, {
    "face_id": "c95",
    "job": "やもり",
    "_id": "animal_c95",
    "chr_set_id": "animal"
  }, {
    "face_id": "c97",
    "job": "しぇぱーど",
    "_id": "animal_c97",
    "chr_set_id": "animal"
  }, {
    "face_id": "c100",
    "job": "びーばー",
    "_id": "animal_c100",
    "chr_set_id": "animal"
  }, {
    "face_id": "c106",
    "job": "まんぼう",
    "_id": "animal_c106",
    "chr_set_id": "animal"
  }, {
    "face_id": "c89",
    "job": "かば",
    "_id": "animal_c89",
    "chr_set_id": "animal"
  }, {
    "face_id": "c91",
    "job": "あるぱか",
    "_id": "animal_c91",
    "chr_set_id": "animal"
  }, {
    "face_id": "c93",
    "job": "わらいかわせみ",
    "_id": "animal_c93",
    "chr_set_id": "animal"
  }, {
    "face_id": "c107",
    "job": "いぼいのしし",
    "_id": "animal_c107",
    "chr_set_id": "animal"
  }, {
    "face_id": "c85",
    "job": "かみつきがめ",
    "_id": "animal_c85",
    "chr_set_id": "animal"
  }, {
    "face_id": "c105",
    "job": "うみねこ",
    "_id": "animal_c105",
    "chr_set_id": "animal"
  }, {
    "face_id": "c96",
    "job": "せあかごけぐも",
    "_id": "animal_c96",
    "chr_set_id": "animal"
  }, {
    "face_id": "c98",
    "job": "はしびろこう",
    "_id": "animal_c98",
    "chr_set_id": "animal"
  }, {
    "face_id": "c101",
    "job": "すずらん",
    "_id": "animal_c101",
    "chr_set_id": "animal"
  }, {
    "face_id": "c104",
    "job": "みいら",
    "_id": "animal_c104",
    "chr_set_id": "animal"
  }, {
    "face_id": "c108",
    "job": "ぶろっこりー",
    "_id": "animal_c108",
    "chr_set_id": "animal"
  }, {
    "face_id": "c88",
    "job": "ゆでたまご",
    "_id": "animal_c88",
    "chr_set_id": "animal"
  }, {
    "face_id": "c84",
    "job": "しろへび",
    "_id": "animal_c84",
    "chr_set_id": "animal"
  }, {
    "face_id": "c109",
    "job": "しろちゃとら",
    "_id": "animal_c109",
    "chr_set_id": "animal"
  }, {
    "face_id": "c102",
    "job": "さんた",
    "_id": "animal_c102",
    "chr_set_id": "animal"
  }, {
    "face_id": "c87",
    "job": "りゅう",
    "_id": "animal_c87",
    "chr_set_id": "animal"
  }, {
    "face_id": "c103",
    "job": "おうむがい",
    "_id": "animal_c103",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "changed",
    "admin": "闇の呟き",
    "maker": "広場のお告げ",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "とのさま広場",
    "csid": "changed",
    "face_id": "m08",
    "say_0": "じんろう？\u003Cbr\u003Eそんななまえのこ、いたかしら……",
    "say_1": "さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。",
    "_id": "changed_m08",
    "chr_set_id": "changed"
  }, {
    "_id": "changed_m05",
    "caption": "はおうの広場",
    "csid": "changed_m05",
    "face_id": "m05",
    "say_0": "ママ？ママなの？\u003Cbr\u003E…もう大丈夫なの？ここには人狼なんていないのかい？\u003Cbr\u003E\u003Cbr\u003E…そっかあ…\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E人狼だって？！",
    "say_1": "誰にも、腰抜けなんて…言わせないぞっ",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_job.set([
  {
    "face_id": "b44",
    "job": "こあくとう",
    "_id": "changed_b44",
    "chr_set_id": "changed"
  }, {
    "face_id": "b49",
    "job": "いしく",
    "_id": "changed_b49",
    "chr_set_id": "changed"
  }, {
    "face_id": "m01",
    "job": "ようせい",
    "_id": "changed_m01",
    "chr_set_id": "changed"
  }, {
    "face_id": "m02",
    "job": "ようせい",
    "_id": "changed_m02",
    "chr_set_id": "changed"
  }, {
    "face_id": "m03",
    "job": "しょうぐん",
    "_id": "changed_m03",
    "chr_set_id": "changed"
  }, {
    "face_id": "m04",
    "job": "すくみず",
    "_id": "changed_m04",
    "chr_set_id": "changed"
  }, {
    "face_id": "m05",
    "job": "はおう",
    "_id": "changed_m05",
    "chr_set_id": "changed"
  }, {
    "face_id": "m06",
    "job": "きゅうていがか",
    "_id": "changed_m06",
    "chr_set_id": "changed"
  }, {
    "face_id": "m07",
    "job": "こひつじ",
    "_id": "changed_m07",
    "chr_set_id": "changed"
  }, {
    "face_id": "m08",
    "job": "おふくろのあじ",
    "_id": "changed_m08",
    "chr_set_id": "changed"
  }, {
    "face_id": "m09",
    "job": "しーさー",
    "_id": "changed_m09",
    "chr_set_id": "changed"
  }, {
    "face_id": "m10",
    "job": "ころぽっくる",
    "_id": "changed_m10",
    "chr_set_id": "changed"
  }, {
    "face_id": "m11",
    "job": "神聖騎士",
    "_id": "changed_m11",
    "chr_set_id": "changed"
  }, {
    "face_id": "m12",
    "job": "暗黒騎士",
    "_id": "changed_m12",
    "chr_set_id": "changed"
  }, {
    "face_id": "m13",
    "job": "調律師",
    "_id": "changed_m13",
    "chr_set_id": "changed"
  }, {
    "face_id": "m14",
    "job": "奇跡の子",
    "_id": "changed_m14",
    "chr_set_id": "changed"
  }, {
    "face_id": "m15",
    "job": "びじん",
    "_id": "changed_m15",
    "chr_set_id": "changed"
  }, {
    "face_id": "m16",
    "job": "りゅうきへい",
    "_id": "changed_m16",
    "chr_set_id": "changed"
  }, {
    "face_id": "m99",
    "job": "かみさま",
    "_id": "changed_m99",
    "chr_set_id": "changed"
  }, {
    "face_id": "r30",
    "job": "ひとづかい",
    "_id": "changed_r30",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_set.set([
  {
    "_id": "all",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_npc.set([
  {
    "caption": "人狼議事 ちゃんぷる",
    "csid": "all",
    "face_id": "all",
    "say_0": "ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。\u003Cbr\u003Eいたるところから…そう、地平の果てや、宇宙の彼方からも。\u003Cbr\u003E\u003Cbr\u003E中には、主様を消してくださるような方もいらっしゃるかもしれません。",
    "say_1": "皆さまお集まりありがとうございます。えー、ごほん。\u003Cbr\u003Eこの催し物、しっかりと楽しんでくださいませ。\u003Cbr\u003E\u003Cbr\u003E…何があっても、文句は言いませんよう、ご了承くださいませ。\u003Cbr\u003E",
    "_id": "all_all",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_job.set([]);

list = [];

order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school"];

_ref = Cache.faces.all;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  face = _ref[_i];
  chr_set_id = "all";
  face_id = face._id;
  _id = "all_" + face_id;
  faced_jobs = Cache.chr_jobs.face[face_id];
  if (faced_jobs != null) {
    job = (_ref1 = _.sortBy(faced_jobs, function(o) {
      return order.indexOf(o.chr_set_id);
    })) != null ? (_ref2 = _ref1.first) != null ? _ref2.job : void 0 : void 0;
  }
  if (job != null) {
    list.push({
      chr_set_id: chr_set_id,
      face_id: face_id,
      job: job,
      _id: _id
    });
  }
}

Cache.rule.chr_job.set(list);
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
  return it("insert rule", function(done) {
    var red;
    red = ".bar { border: 3px solid red; }";
    document.styleSheets[0].insertRule(red, 0);
    expect(document.styleSheets[0].rules[0].cssText).toEqual(red);
    done();
    document.styleSheets[0].deleteRule(0);
    return document.styleSheets[0].insertRule(red, 0);
  });
});
var event1, fab1, form1, msg1, msg2, msg3, msg4, scene1, scene2, scene3, story1;

new Cache.Replace("site").schema(function() {});

new Cache.Replace("story").schema(function() {
  return this.belongs_to("site");
});

new Cache.Replace("event").schema(function() {
  this.belongs_to("site");
  return this.belongs_to("story");
});

new Cache.Append("scene").schema(function() {
  this.belongs_to("site");
  this.belongs_to("story");
  return this.belongs_to("event");
});

new Cache.Replace("potof").schema(function() {
  return this.belongs_to("scene");
});

new Cache.Append("fab").schema(function() {
  return this.belongs_to("message");
});

new Cache.Replace("form").schema(function() {
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
    new Cache.Append("message").schema(function() {
      this.order_by("created_at");
      return this.belongs_to("scene");
    });
    Cache.rule.message.cleanup();
    return Cache.rule.message.set([
      {
        _id: msg1,
        scene_id: scene1,
        name: "7korobi",
        text: "text 1",
        created_at: 1,
        updated_at: 1
      }, {
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
            return "also";
          case scene1:
          case scene3:
            return "good";
          default:
            return false;
        }
      };
      this.scope("of", kind);
      this.pager("of", 5);
      return this.pager("all", 5);
    });
  };
  beforeEach(function(done) {
    return setTimeout(function() {
      return done();
    }, 0);
  });
  describe("form input", function() {
    return it("guard user input", function(done) {
      expect(Cache.forms.all.first.text).toEqual("last submit text.");
      Cache.forms.all.first.text = "new user input.";
      expect(Cache.forms.all.first.text).toEqual("new user input.");
      Cache.rule.form.set([
        {
          _id: form1,
          text: "last submit text."
        }
      ]);
      expect(Cache.forms.all.first.text).toEqual("new user input.");
      return done();
    });
  });
  describe("replace item", function() {
    return it("link with data", function(done) {
      var scene;
      expect(Cache.scenes.event[event1]).toEqual(void 0);
      scene = Cache.scenes.all.first;
      scene.event_id = event1;
      Cache.rule.scene.set([scene]);
      expect(Cache.scenes.event[event1].length).toEqual(1);
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
      expect(Cache.messages.scene[scene1].length).toEqual(1);
      expect(Cache.messages.scene[scene2].length).toEqual(1);
      expect(Cache.messages.scene[scene3].length).toEqual(1);
      expect(Cache.messages.scene[scene1].first.text).toEqual("text 1");
      expect(Cache.messages.scene[scene2].first.text).toEqual("text 2");
      expect(Cache.messages.scene[scene3].first.text).toEqual("text 3");
      return done();
    });
  });
  return describe("messages with scope", function() {
    it("sepalate items", function(done) {
      cache_message_with_scope();
      expect(Cache.messages.all.length).toEqual(3);
      expect(Cache.messages.of.also.length).toEqual(1);
      expect(Cache.messages.of.also.first.text).toEqual("text 2");
      expect(Cache.messages.of.good.length).toEqual(2);
      expect(Cache.messages.of.good.first.text).toEqual("text 1");
      expect(Cache.messages.of.good.last.text).toEqual("text 3");
      return done();
    });
    it("replace item", function(done) {
      cache_message_with_scope();
      Cache.rule.message.set([
        {
          _id: msg1,
          scene_id: scene2,
          name: "7korobi",
          text: "text 4",
          created_at: 1,
          updated_at: 4
        }
      ]);
      expect(Cache.messages.all.length).toEqual(3);
      expect(Cache.messages.of.also.length).toEqual(2);
      expect(Cache.messages.of.also.first.text).toEqual("text 4");
      expect(Cache.messages.of.also.last.text).toEqual("text 2");
      expect(Cache.messages.of.good.length).toEqual(1);
      expect(Cache.messages.of.good.last.text).toEqual("text 3");
      return done();
    });
    return it("append item", function(done) {
      cache_message_with_scope();
      Cache.rule.message.set([
        {
          _id: msg4,
          scene_id: scene2,
          name: "7korobi",
          text: "text 5",
          created_at: 5,
          updated_at: 5
        }
      ]);
      expect(Cache.messages.all.length).toEqual(4);
      expect(Cache.messages.of.also.length).toEqual(2);
      expect(Cache.messages.of.also.first.text).toEqual("text 2");
      expect(Cache.messages.of.also.last.text).toEqual("text 5");
      expect(Cache.messages.of.good.length).toEqual(2);
      expect(Cache.messages.of.good.first.text).toEqual("text 1");
      expect(Cache.messages.of.good.last.text).toEqual("text 3");
      return done();
    });
  });
});

/*
jQuery ->
  FixedBox.push  angular.element,   0, 1, '#topviewer'
  FixedBox.push  angular.element,   1,-1, '#sayfilter'
  FixedBox.push  angular.element, -12,-1, '#buttons'
 */
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
      expect(Serial.parser.Date("LtUhQ0W")).toEqual(1400000000000);
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
      expect(new Timer(_.now() - 10800000 + 2).text).toEqual("3時間前");
      expect(new Timer(_.now() - 3540000).text).toEqual("1時間前");
      expect(new Timer(_.now() - 3540000 + 2).text).toEqual("59分前");
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
      expect(new Timer(_.now() + 3540000 - 2).text).toEqual("59分後");
      expect(new Timer(_.now() + 3540000).text).toEqual("1時間後");
      expect(new Timer(_.now() + 10800000 - 2).text).toEqual("3時間後");
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
if (location.search !== "?param=1-B-C-LtUhQ0W") {
  location.search = "?param=1-B-C-LtUhQ0W";
}

Url.bind = {
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

Url.options = {
  aaa: {
    current: null,
    type: "Number"
  },
  bbb: {
    current: null,
    type: "String"
  },
  ccc: {
    current: null,
    type: "String"
  },
  ddd: {
    current: null,
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

Url.pathname = ["file"];

Url.cookie = ["file"];

Url.search = ["param"];

Url.routes = {
  param: new Url("param=:aaa-:bbb-:ccc-:ddd"),
  file: new Url("/:fname.:ext")
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
      expect(Url.data.fname).toEqual("jasmine");
      return expect(Url.data.ext).toEqual("html");
    });
    return it("file", function(done) {
      Url.popstate();
      done();
      expect(Url.routes.file.data.fname).toEqual("jasmine");
      return expect(Url.routes.file.data.ext).toEqual("html");
    });
  });
  describe("popstate url", function(done) {
    return it("param", function(done) {
      Url.popstate();
      done();
      expect(Url.routes.param.data.aaa).toEqual(1);
      expect(Url.routes.param.data.bbb).toEqual("B");
      expect(Url.routes.param.data.ccc).toEqual("C");
      return expect(Url.routes.param.data.ddd).toEqual(1400000000000);
    });
  });
  return describe("bind variable", function(done) {
    it("location other", function(done) {
      Url.popstate();
      Url.routes.file.data.fname = "other";
      Url.routes.file.change("fname", "other");
      expect(Url.routes.file.data.title).toEqual("変更");
      return done();
    });
    return it("location basic", function(done) {
      Url.popstate();
      Url.routes.file.vue.$data.url.fname = "jasmine";
      Url.routes.file.change("fname", "jasmine");
      expect(Url.routes.file.data.title).toEqual("基本");
      return done();
    });
  });
});






