/*
Copyright (c) 2008-2015 Pivotal Labs

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

var getJasmineRequireObj = (function (jasmineGlobal) {
  var jasmineRequire;

  if (typeof module !== 'undefined' && module.exports) {
    jasmineGlobal = global;
    jasmineRequire = exports;
  } else {
    if (typeof window !== 'undefined' && typeof window.toString === 'function' && window.toString() === '[object GjsGlobal]') {
      jasmineGlobal = window;
    }
    jasmineRequire = jasmineGlobal.jasmineRequire = jasmineGlobal.jasmineRequire || {};
  }

  function getJasmineRequire() {
    return jasmineRequire;
  }

  getJasmineRequire().core = function(jRequire) {
    var j$ = {};

    jRequire.base(j$, jasmineGlobal);
    j$.util = jRequire.util();
    j$.Any = jRequire.Any();
    j$.Anything = jRequire.Anything(j$);
    j$.CallTracker = jRequire.CallTracker();
    j$.MockDate = jRequire.MockDate();
    j$.Clock = jRequire.Clock();
    j$.DelayedFunctionScheduler = jRequire.DelayedFunctionScheduler();
    j$.Env = jRequire.Env(j$);
    j$.ExceptionFormatter = jRequire.ExceptionFormatter();
    j$.Expectation = jRequire.Expectation();
    j$.buildExpectationResult = jRequire.buildExpectationResult();
    j$.JsApiReporter = jRequire.JsApiReporter();
    j$.matchersUtil = jRequire.matchersUtil(j$);
    j$.ObjectContaining = jRequire.ObjectContaining(j$);
    j$.ArrayContaining = jRequire.ArrayContaining(j$);
    j$.pp = jRequire.pp(j$);
    j$.QueueRunner = jRequire.QueueRunner(j$);
    j$.ReportDispatcher = jRequire.ReportDispatcher();
    j$.Spec = jRequire.Spec(j$);
    j$.SpyRegistry = jRequire.SpyRegistry(j$);
    j$.SpyStrategy = jRequire.SpyStrategy();
    j$.StringMatching = jRequire.StringMatching(j$);
    j$.Suite = jRequire.Suite();
    j$.Timer = jRequire.Timer();
    j$.version = jRequire.version();

    j$.matchers = jRequire.requireMatchers(jRequire, j$);

    return j$;
  };

  return getJasmineRequire;
})(this);

getJasmineRequireObj().requireMatchers = function(jRequire, j$) {
  var availableMatchers = [
      'toBe',
      'toBeCloseTo',
      'toBeDefined',
      'toBeFalsy',
      'toBeGreaterThan',
      'toBeLessThan',
      'toBeNaN',
      'toBeNull',
      'toBeTruthy',
      'toBeUndefined',
      'toContain',
      'toEqual',
      'toHaveBeenCalled',
      'toHaveBeenCalledWith',
      'toMatch',
      'toThrow',
      'toThrowError'
    ],
    matchers = {};

  for (var i = 0; i < availableMatchers.length; i++) {
    var name = availableMatchers[i];
    matchers[name] = jRequire[name](j$);
  }

  return matchers;
};

getJasmineRequireObj().base = function(j$, jasmineGlobal) {
  j$.unimplementedMethod_ = function() {
    throw new Error('unimplemented method');
  };

  j$.MAX_PRETTY_PRINT_DEPTH = 40;
  j$.MAX_PRETTY_PRINT_ARRAY_LENGTH = 100;
  j$.DEFAULT_TIMEOUT_INTERVAL = 5000;

  j$.getGlobal = function() {
    return jasmineGlobal;
  };

  j$.getEnv = function(options) {
    var env = j$.currentEnv_ = j$.currentEnv_ || new j$.Env(options);
    //jasmine. singletons in here (setTimeout blah blah).
    return env;
  };

  j$.isArray_ = function(value) {
    return j$.isA_('Array', value);
  };

  j$.isString_ = function(value) {
    return j$.isA_('String', value);
  };

  j$.isNumber_ = function(value) {
    return j$.isA_('Number', value);
  };

  j$.isA_ = function(typeName, value) {
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
  };

  j$.isDomNode = function(obj) {
    return obj.nodeType > 0;
  };

  j$.fnNameFor = function(func) {
    return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];
  };

  j$.any = function(clazz) {
    return new j$.Any(clazz);
  };

  j$.anything = function() {
    return new j$.Anything();
  };

  j$.objectContaining = function(sample) {
    return new j$.ObjectContaining(sample);
  };

  j$.stringMatching = function(expected) {
    return new j$.StringMatching(expected);
  };

  j$.arrayContaining = function(sample) {
    return new j$.ArrayContaining(sample);
  };

  j$.createSpy = function(name, originalFn) {

    var spyStrategy = new j$.SpyStrategy({
        name: name,
        fn: originalFn,
        getSpy: function() { return spy; }
      }),
      callTracker = new j$.CallTracker(),
      spy = function() {
        var callData = {
          object: this,
          args: Array.prototype.slice.apply(arguments)
        };

        callTracker.track(callData);
        var returnValue = spyStrategy.exec.apply(this, arguments);
        callData.returnValue = returnValue;

        return returnValue;
      };

    for (var prop in originalFn) {
      if (prop === 'and' || prop === 'calls') {
        throw new Error('Jasmine spies would overwrite the \'and\' and \'calls\' properties on the object being spied upon');
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
    if (j$.isArray_(baseName) && j$.util.isUndefined(methodNames)) {
      methodNames = baseName;
      baseName = 'unknown';
    }

    if (!j$.isArray_(methodNames) || methodNames.length === 0) {
      throw 'createSpyObj requires a non-empty array of method names to create spies for';
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

  util.arrayContains = function(array, search) {
    var i = array.length;
    while (i--) {
      if (array[i] === search) {
        return true;
      }
    }
    return false;
  };

  util.clone = function(obj) {
    if (Object.prototype.toString.apply(obj) === '[object Array]') {
      return obj.slice();
    }

    var cloned = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cloned[prop] = obj[prop];
      }
    }

    return cloned;
  };

  return util;
};

getJasmineRequireObj().Spec = function(j$) {
  function Spec(attrs) {
    this.expectationFactory = attrs.expectationFactory;
    this.resultCallback = attrs.resultCallback || function() {};
    this.id = attrs.id;
    this.description = attrs.description || '';
    this.queueableFn = attrs.queueableFn;
    this.beforeAndAfterFns = attrs.beforeAndAfterFns || function() { return {befores: [], afters: []}; };
    this.userContext = attrs.userContext || function() { return {}; };
    this.onStart = attrs.onStart || function() {};
    this.getSpecName = attrs.getSpecName || function() { return ''; };
    this.expectationResultFactory = attrs.expectationResultFactory || function() { };
    this.queueRunnerFactory = attrs.queueRunnerFactory || function() {};
    this.catchingExceptions = attrs.catchingExceptions || function() { return true; };

    if (!this.queueableFn.fn) {
      this.pend();
    }

    this.result = {
      id: this.id,
      description: this.description,
      fullName: this.getFullName(),
      failedExpectations: [],
      passedExpectations: [],
      pendingReason: ''
    };
  }

  Spec.prototype.addExpectationResult = function(passed, data) {
    var expectationResult = this.expectationResultFactory(data);
    if (passed) {
      this.result.passedExpectations.push(expectationResult);
    } else {
      this.result.failedExpectations.push(expectationResult);
    }
  };

  Spec.prototype.expect = function(actual) {
    return this.expectationFactory(actual, this);
  };

  Spec.prototype.execute = function(onComplete) {
    var self = this;

    this.onStart(this);

    if (this.markedPending || this.disabled) {
      complete();
      return;
    }

    var fns = this.beforeAndAfterFns();
    var allFns = fns.befores.concat(this.queueableFn).concat(fns.afters);

    this.queueRunnerFactory({
      queueableFns: allFns,
      onException: function() { self.onException.apply(self, arguments); },
      onComplete: complete,
      userContext: this.userContext()
    });

    function complete() {
      self.result.status = self.status();
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }
  };

  Spec.prototype.onException = function onException(e) {
    if (Spec.isPendingSpecException(e)) {
      this.pend(extractCustomPendingMessage(e));
      return;
    }

    this.addExpectationResult(false, {
      matcherName: '',
      passed: false,
      expected: '',
      actual: '',
      error: e
    });
  };

  Spec.prototype.disable = function() {
    this.disabled = true;
  };

  Spec.prototype.pend = function(message) {
    this.markedPending = true;
    if (message) {
      this.result.pendingReason = message;
    }
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

  Spec.prototype.isExecutable = function() {
    return !this.disabled && !this.markedPending;
  };

  Spec.prototype.getFullName = function() {
    return this.getSpecName(this);
  };

  var extractCustomPendingMessage = function(e) {
    var fullMessage = e.toString(),
        boilerplateStart = fullMessage.indexOf(Spec.pendingSpecExceptionMessage),
        boilerplateEnd = boilerplateStart + Spec.pendingSpecExceptionMessage.length;

    return fullMessage.substr(boilerplateEnd);
  };

  Spec.pendingSpecExceptionMessage = '=> marked Pending';

  Spec.isPendingSpecException = function(e) {
    return !!(e && e.toString && e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1);
  };

  return Spec;
};

if (typeof window == void 0 && typeof exports == 'object') {
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
    this.clock = new j$.Clock(global, new j$.DelayedFunctionScheduler(), new j$.MockDate(global));

    var runnableLookupTable = {};
    var runnableResources = {};

    var currentSpec = null;
    var currentlyExecutingSuites = [];
    var currentDeclarationSuite = null;

    var currentSuite = function() {
      return currentlyExecutingSuites[currentlyExecutingSuites.length - 1];
    };

    var currentRunnable = function() {
      return currentSpec || currentSuite();
    };

    var reporter = new j$.ReportDispatcher([
      'jasmineStarted',
      'jasmineDone',
      'suiteStarted',
      'suiteDone',
      'specStarted',
      'specDone'
    ]);

    this.specFilter = function() {
      return true;
    };

    this.addCustomEqualityTester = function(tester) {
      if(!currentRunnable()) {
        throw new Error('Custom Equalities must be added in a before function or a spec');
      }
      runnableResources[currentRunnable().id].customEqualityTesters.push(tester);
    };

    this.addMatchers = function(matchersToAdd) {
      if(!currentRunnable()) {
        throw new Error('Matchers must be added in a before function or a spec');
      }
      var customMatchers = runnableResources[currentRunnable().id].customMatchers;
      for (var matcherName in matchersToAdd) {
        customMatchers[matcherName] = matchersToAdd[matcherName];
      }
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
        customEqualityTesters: runnableResources[spec.id].customEqualityTesters,
        customMatchers: runnableResources[spec.id].customMatchers,
        actual: actual,
        addExpectationResult: addExpectationResult
      });

      function addExpectationResult(passed, result) {
        return spec.addExpectationResult(passed, result);
      }
    };

    var defaultResourcesForRunnable = function(id, parentRunnableId) {
      var resources = {spies: [], customEqualityTesters: [], customMatchers: {}};

      if(runnableResources[parentRunnableId]){
        resources.customEqualityTesters = j$.util.clone(runnableResources[parentRunnableId].customEqualityTesters);
        resources.customMatchers = j$.util.clone(runnableResources[parentRunnableId].customMatchers);
      }

      runnableResources[id] = resources;
    };

    var clearResourcesForRunnable = function(id) {
        spyRegistry.clearSpies();
        delete runnableResources[id];
    };

    var beforeAndAfterFns = function(suite, runnablesExplictlySet) {
      return function() {
        var befores = [],
          afters = [],
          beforeAlls = [],
          afterAlls = [];

        while(suite) {
          befores = befores.concat(suite.beforeFns);
          afters = afters.concat(suite.afterFns);

          if (runnablesExplictlySet()) {
            beforeAlls = beforeAlls.concat(suite.beforeAllFns);
            afterAlls = afterAlls.concat(suite.afterAllFns);
          }

          suite = suite.parentSuite;
        }
        return {
          befores: beforeAlls.reverse().concat(befores.reverse()),
          afters: afters.concat(afterAlls)
        };
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
      options.timer = {setTimeout: realSetTimeout, clearTimeout: realClearTimeout};
      options.fail = self.fail;

      new j$.QueueRunner(options).execute();
    };

    var topSuite = new j$.Suite({
      env: this,
      id: getNextSuiteId(),
      description: 'Jasmine__TopLevel__Suite',
      queueRunner: queueRunnerFactory
    });
    runnableLookupTable[topSuite.id] = topSuite;
    defaultResourcesForRunnable(topSuite.id);
    currentDeclarationSuite = topSuite;

    this.topSuite = function() {
      return topSuite;
    };

    this.execute = function(runnablesToRun) {
      if(runnablesToRun) {
        runnablesExplictlySet = true;
      } else if (focusedRunnables.length) {
        runnablesExplictlySet = true;
        runnablesToRun = focusedRunnables;
      } else {
        runnablesToRun = [topSuite.id];
      }

      var allFns = [];
      for(var i = 0; i < runnablesToRun.length; i++) {
        var runnable = runnableLookupTable[runnablesToRun[i]];
        allFns.push((function(runnable) { return { fn: function(done) { runnable.execute(done); } }; })(runnable));
      }

      reporter.jasmineStarted({
        totalSpecsDefined: totalSpecsDefined
      });

      queueRunnerFactory({queueableFns: allFns, onComplete: reporter.jasmineDone});
    };

    this.addReporter = function(reporterToAdd) {
      reporter.addReporter(reporterToAdd);
    };

    var spyRegistry = new j$.SpyRegistry({currentSpies: function() {
      if(!currentRunnable()) {
        throw new Error('Spies must be created in a before function or a spec');
      }
      return runnableResources[currentRunnable().id].spies;
    }});

    this.spyOn = function() {
      return spyRegistry.spyOn.apply(spyRegistry, arguments);
    };

    var suiteFactory = function(description) {
      var suite = new j$.Suite({
        env: self,
        id: getNextSuiteId(),
        description: description,
        parentSuite: currentDeclarationSuite,
        queueRunner: queueRunnerFactory,
        onStart: suiteStarted,
        expectationFactory: expectationFactory,
        expectationResultFactory: expectationResultFactory,
        runnablesExplictlySetGetter: runnablesExplictlySetGetter,
        resultCallback: function(attrs) {
          if (!suite.disabled) {
            clearResourcesForRunnable(suite.id);
          }
          currentlyExecutingSuites.pop();
          reporter.suiteDone(attrs);
        }
      });

      runnableLookupTable[suite.id] = suite;
      return suite;

      function suiteStarted(suite) {
        currentlyExecutingSuites.push(suite);
        defaultResourcesForRunnable(suite.id, suite.parentSuite.id);
        reporter.suiteStarted(suite.result);
      }
    };

    this.describe = function(description, specDefinitions) {
      var suite = suiteFactory(description);
      addSpecsToSuite(suite, specDefinitions);
      return suite;
    };

    this.xdescribe = function(description, specDefinitions) {
      var suite = this.describe(description, specDefinitions);
      suite.disable();
      return suite;
    };

    var focusedRunnables = [];

    this.fdescribe = function(description, specDefinitions) {
      var suite = suiteFactory(description);
      suite.isFocused = true;

      focusedRunnables.push(suite.id);
      unfocusAncestor();
      addSpecsToSuite(suite, specDefinitions);

      return suite;
    };

    function addSpecsToSuite(suite, specDefinitions) {
      var parentSuite = currentDeclarationSuite;
      parentSuite.addChild(suite);
      currentDeclarationSuite = suite;

      var declarationError = null;
      try {
        specDefinitions.call(suite);
      } catch (e) {
        declarationError = e;
      }

      if (declarationError) {
        self.it('encountered a declaration exception', function() {
          throw declarationError;
        });
      }

      currentDeclarationSuite = parentSuite;
    }

    function findFocusedAncestor(suite) {
      while (suite) {
        if (suite.isFocused) {
          return suite.id;
        }
        suite = suite.parentSuite;
      }

      return null;
    }

    function unfocusAncestor() {
      var focusedAncestor = findFocusedAncestor(currentDeclarationSuite);
      if (focusedAncestor) {
        for (var i = 0; i < focusedRunnables.length; i++) {
          if (focusedRunnables[i] === focusedAncestor) {
            focusedRunnables.splice(i, 1);
            break;
          }
        }
      }
    }

    var runnablesExplictlySet = false;

    var runnablesExplictlySetGetter = function(){
      return runnablesExplictlySet;
    };

    var specFactory = function(description, fn, suite, timeout) {
      totalSpecsDefined++;
      var spec = new j$.Spec({
        id: getNextSpecId(),
        beforeAndAfterFns: beforeAndAfterFns(suite, runnablesExplictlySetGetter),
        expectationFactory: expectationFactory,
        resultCallback: specResultCallback,
        getSpecName: function(spec) {
          return getSpecName(spec, suite);
        },
        onStart: specStarted,
        description: description,
        expectationResultFactory: expectationResultFactory,
        queueRunnerFactory: queueRunnerFactory,
        userContext: function() { return suite.clonedSharedUserContext(); },
        queueableFn: {
          fn: fn,
          timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
        }
      });

      runnableLookupTable[spec.id] = spec;

      if (!self.specFilter(spec)) {
        spec.disable();
      }

      return spec;

      function specResultCallback(result) {
        clearResourcesForRunnable(spec.id);
        currentSpec = null;
        reporter.specDone(result);
      }

      function specStarted(spec) {
        currentSpec = spec;
        defaultResourcesForRunnable(spec.id, suite.id);
        reporter.specStarted(spec.result);
      }
    };

    this.it = function(description, fn, timeout) {
      var spec = specFactory(description, fn, currentDeclarationSuite, timeout);
      currentDeclarationSuite.addChild(spec);
      return spec;
    };

    this.xit = function() {
      var spec = this.it.apply(this, arguments);
      spec.pend();
      return spec;
    };

    this.fit = function(){
      var spec = this.it.apply(this, arguments);

      focusedRunnables.push(spec.id);
      unfocusAncestor();
      return spec;
    };

    this.expect = function(actual) {
      if (!currentRunnable()) {
        throw new Error('\'expect\' was used when there was no current spec, this could be because an asynchronous test timed out');
      }

      return currentRunnable().expect(actual);
    };

    this.beforeEach = function(beforeEachFunction, timeout) {
      currentDeclarationSuite.beforeEach({
        fn: beforeEachFunction,
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
      });
    };

    this.beforeAll = function(beforeAllFunction, timeout) {
      currentDeclarationSuite.beforeAll({
        fn: beforeAllFunction,
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
      });
    };

    this.afterEach = function(afterEachFunction, timeout) {
      currentDeclarationSuite.afterEach({
        fn: afterEachFunction,
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
      });
    };

    this.afterAll = function(afterAllFunction, timeout) {
      currentDeclarationSuite.afterAll({
        fn: afterAllFunction,
        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
      });
    };

    this.pending = function(message) {
      var fullMessage = j$.Spec.pendingSpecExceptionMessage;
      if(message) {
        fullMessage += message;
      }
      throw fullMessage;
    };

    this.fail = function(error) {
      var message = 'Failed';
      if (error) {
        message += ': ';
        message += error.message || error;
      }

      currentRunnable().addExpectationResult(false, {
        matcherName: '',
        passed: false,
        expected: '',
        actual: '',
        message: message,
        error: error && error.message ? error : null
      });
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
        status = 'loaded';

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

    var suites = [],
      suites_hash = {};

    this.suiteStarted = function(result) {
      suites_hash[result.id] = result;
    };

    this.suiteDone = function(result) {
      storeSuite(result);
    };

    this.suiteResults = function(index, length) {
      return suites.slice(index, index + length);
    };

    function storeSuite(result) {
      suites.push(result);
      suites_hash[result.id] = result;
    }

    this.suites = function() {
      return suites_hash;
    };

    var specs = [];

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
  function Clock(global, delayedFunctionScheduler, mockDate) {
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

      return self;
    };

    self.uninstall = function() {
      delayedFunctionScheduler.reset();
      mockDate.uninstall();
      replace(global, realTimingFunctions);

      timer = realTimingFunctions;
      installed = false;
    };

    self.mockDate = function(initialDate) {
      mockDate.install(initialDate);
    };

    self.setTimeout = function(fn, delay, params) {
      if (legacyIE()) {
        if (arguments.length > 2) {
          throw new Error('IE < 9 cannot support extra params to setTimeout without a polyfill');
        }
        return timer.setTimeout(fn, delay);
      }
      return Function.prototype.apply.apply(timer.setTimeout, [global, arguments]);
    };

    self.setInterval = function(fn, delay, params) {
      if (legacyIE()) {
        if (arguments.length > 2) {
          throw new Error('IE < 9 cannot support extra params to setInterval without a polyfill');
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
        mockDate.tick(millis);
        delayedFunctionScheduler.tick(millis);
      } else {
        throw new Error('Mock clock is not installed, use jasmine.clock().install()');
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
      return Array.prototype.slice.call(argsObj, n);
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

    function forEachFunction(funcsToRun, callback) {
      for (var i = 0; i < funcsToRun.length; ++i) {
        callback(funcsToRun[i]);
      }
    }

    function runScheduledFunctions(endTime) {
      if (scheduledLookup.length === 0 || scheduledLookup[0] > endTime) {
        return;
      }

      do {
        currentTime = scheduledLookup.shift();

        var funcsToRun = scheduledFunctions[currentTime];
        delete scheduledFunctions[currentTime];

        forEachFunction(funcsToRun, function(funcToRun) {
          if (funcToRun.recurring) {
            reschedule(funcToRun);
          }
        });

        forEachFunction(funcsToRun, function(funcToRun) {
          funcToRun.funcToCall.apply(null, funcToRun.params || []);
        });
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
      var message = '';

      if (error.name && error.message) {
        message += error.name + ': ' + error.message;
      } else {
        message += error.toString() + ' thrown';
      }

      if (error.fileName || error.sourceURL) {
        message += ' in ' + (error.fileName || error.sourceURL);
      }

      if (error.line || error.lineNumber) {
        message += ' (line ' + (error.line || error.lineNumber) + ')';
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

  function Expectation(options) {
    this.util = options.util || { buildFailureMessage: function() {} };
    this.customEqualityTesters = options.customEqualityTesters || [];
    this.actual = options.actual;
    this.addExpectationResult = options.addExpectationResult || function(){};
    this.isNot = options.isNot;

    var customMatchers = options.customMatchers || {};
    for (var matcherName in customMatchers) {
      this[matcherName] = Expectation.prototype.wrapCompare(matcherName, customMatchers[matcherName]);
    }
  }

  Expectation.prototype.wrapCompare = function(name, matcherFactory) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0),
        expected = args.slice(0),
        message = '';

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
          if (Object.prototype.toString.apply(result.message) === '[object Function]') {
            message = result.message();
          } else {
            message = result.message;
          }
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

    var result = {
      matcherName: options.matcherName,
      message: message(),
      stack: stack(),
      passed: options.passed
    };

    if(!result.passed) {
      result.expected = options.expected;
      result.actual = options.actual;
    }

    return result;

    function message() {
      if (options.passed) {
        return 'Passed.';
      } else if (options.message) {
        return options.message;
      } else if (options.error) {
        return messageFormatter(options.error);
      }
      return '';
    }

    function stack() {
      if (options.passed) {
        return '';
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

getJasmineRequireObj().MockDate = function() {
  function MockDate(global) {
    var self = this;
    var currentTime = 0;

    if (!global || !global.Date) {
      self.install = function() {};
      self.tick = function() {};
      self.uninstall = function() {};
      return self;
    }

    var GlobalDate = global.Date;

    self.install = function(mockDate) {
      if (mockDate instanceof GlobalDate) {
        currentTime = mockDate.getTime();
      } else {
        currentTime = new GlobalDate().getTime();
      }

      global.Date = FakeDate;
    };

    self.tick = function(millis) {
      millis = millis || 0;
      currentTime = currentTime + millis;
    };

    self.uninstall = function() {
      currentTime = 0;
      global.Date = GlobalDate;
    };

    createDateProperties();

    return self;

    function FakeDate() {
      switch(arguments.length) {
        case 0:
          return new GlobalDate(currentTime);
        case 1:
          return new GlobalDate(arguments[0]);
        case 2:
          return new GlobalDate(arguments[0], arguments[1]);
        case 3:
          return new GlobalDate(arguments[0], arguments[1], arguments[2]);
        case 4:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3]);
        case 5:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4]);
        case 6:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4], arguments[5]);
        default:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4], arguments[5], arguments[6]);
      }
    }

    function createDateProperties() {
      FakeDate.prototype = GlobalDate.prototype;

      FakeDate.now = function() {
        if (GlobalDate.now) {
          return currentTime;
        } else {
          throw new Error('Browser does not support Date.now()');
        }
      };

      FakeDate.toSource = GlobalDate.toSource;
      FakeDate.toString = GlobalDate.toString;
      FakeDate.parse = GlobalDate.parse;
      FakeDate.UTC = GlobalDate.UTC;
    }
	}

  return MockDate;
};

getJasmineRequireObj().pp = function(j$) {

  function PrettyPrinter() {
    this.ppNestLevel_ = 0;
    this.seen = [];
  }

  PrettyPrinter.prototype.format = function(value) {
    this.ppNestLevel_++;
    try {
      if (j$.util.isUndefined(value)) {
        this.emitScalar('undefined');
      } else if (value === null) {
        this.emitScalar('null');
      } else if (value === 0 && 1/value === -Infinity) {
        this.emitScalar('-0');
      } else if (value === j$.getGlobal()) {
        this.emitScalar('<global>');
      } else if (value.jasmineToString) {
        this.emitScalar(value.jasmineToString());
      } else if (typeof value === 'string') {
        this.emitString(value);
      } else if (j$.isSpy(value)) {
        this.emitScalar('spy on ' + value.and.identity());
      } else if (value instanceof RegExp) {
        this.emitScalar(value.toString());
      } else if (typeof value === 'function') {
        this.emitScalar('Function');
      } else if (typeof value.nodeType === 'number') {
        this.emitScalar('HTMLNode');
      } else if (value instanceof Date) {
        this.emitScalar('Date(' + value + ')');
      } else if (j$.util.arrayContains(this.seen, value)) {
        this.emitScalar('<circular reference: ' + (j$.isArray_(value) ? 'Array' : 'Object') + '>');
      } else if (j$.isArray_(value) || j$.isA_('Object', value)) {
        this.seen.push(value);
        if (j$.isArray_(value)) {
          this.emitArray(value);
        } else {
          this.emitObject(value);
        }
        this.seen.pop();
      } else {
        this.emitScalar(value.toString());
      }
    } finally {
      this.ppNestLevel_--;
    }
  };

  PrettyPrinter.prototype.iterateObject = function(obj, fn) {
    for (var property in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, property)) { continue; }
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
    this.append('\'' + value + '\'');
  };

  StringPrettyPrinter.prototype.emitArray = function(array) {
    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
      this.append('Array');
      return;
    }
    var length = Math.min(array.length, j$.MAX_PRETTY_PRINT_ARRAY_LENGTH);
    this.append('[ ');
    for (var i = 0; i < length; i++) {
      if (i > 0) {
        this.append(', ');
      }
      this.format(array[i]);
    }
    if(array.length > length){
      this.append(', ...');
    }
    this.append(' ]');
  };

  StringPrettyPrinter.prototype.emitObject = function(obj) {
    var constructorName = obj.constructor ? j$.fnNameFor(obj.constructor) : 'null';
    this.append(constructorName);

    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
      return;
    }

    var self = this;
    this.append('({ ');
    var first = true;

    this.iterateObject(obj, function(property, isGetter) {
      if (first) {
        first = false;
      } else {
        self.append(', ');
      }

      self.append(property);
      self.append(': ');
      if (isGetter) {
        self.append('<getter>');
      } else {
        self.format(obj[property]);
      }
    });

    this.append(' })');
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

getJasmineRequireObj().QueueRunner = function(j$) {

  function once(fn) {
    var called = false;
    return function() {
      if (!called) {
        called = true;
        fn();
      }
    };
  }

  function QueueRunner(attrs) {
    this.queueableFns = attrs.queueableFns || [];
    this.onComplete = attrs.onComplete || function() {};
    this.clearStack = attrs.clearStack || function(fn) {fn();};
    this.onException = attrs.onException || function() {};
    this.catchException = attrs.catchException || function() { return true; };
    this.userContext = attrs.userContext || {};
    this.timer = attrs.timeout || {setTimeout: setTimeout, clearTimeout: clearTimeout};
    this.fail = attrs.fail || function() {};
  }

  QueueRunner.prototype.execute = function() {
    this.run(this.queueableFns, 0);
  };

  QueueRunner.prototype.run = function(queueableFns, recursiveIndex) {
    var length = queueableFns.length,
      self = this,
      iterativeIndex;


    for(iterativeIndex = recursiveIndex; iterativeIndex < length; iterativeIndex++) {
      var queueableFn = queueableFns[iterativeIndex];
      if (queueableFn.fn.length > 0) {
        attemptAsync(queueableFn);
        return;
      } else {
        attemptSync(queueableFn);
      }
    }

    var runnerDone = iterativeIndex >= length;

    if (runnerDone) {
      this.clearStack(this.onComplete);
    }

    function attemptSync(queueableFn) {
      try {
        queueableFn.fn.call(self.userContext);
      } catch (e) {
        handleException(e, queueableFn);
      }
    }

    function attemptAsync(queueableFn) {
      var clearTimeout = function () {
          Function.prototype.apply.apply(self.timer.clearTimeout, [j$.getGlobal(), [timeoutId]]);
        },
        next = once(function () {
          clearTimeout(timeoutId);
          self.run(queueableFns, iterativeIndex + 1);
        }),
        timeoutId;

      next.fail = function() {
        self.fail.apply(null, arguments);
        next();
      };

      if (queueableFn.timeout) {
        timeoutId = Function.prototype.apply.apply(self.timer.setTimeout, [j$.getGlobal(), [function() {
          var error = new Error('Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.');
          onException(error, queueableFn);
          next();
        }, queueableFn.timeout()]]);
      }

      try {
        queueableFn.fn.call(self.userContext, next);
      } catch (e) {
        handleException(e, queueableFn);
        next();
      }
    }

    function onException(e, queueableFn) {
      self.onException(e);
    }

    function handleException(e, queueableFn) {
      onException(e, queueableFn);
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


getJasmineRequireObj().SpyRegistry = function(j$) {

  function SpyRegistry(options) {
    options = options || {};
    var currentSpies = options.currentSpies || function() { return []; };

    this.spyOn = function(obj, methodName) {
      if (j$.util.isUndefined(obj)) {
        throw new Error('spyOn could not find an object to spy upon for ' + methodName + '()');
      }

      if (j$.util.isUndefined(methodName)) {
        throw new Error('No method name supplied');
      }

      if (j$.util.isUndefined(obj[methodName])) {
        throw new Error(methodName + '() method does not exist');
      }

      if (obj[methodName] && j$.isSpy(obj[methodName])) {
        //TODO?: should this return the current spy? Downside: may cause user confusion about spy state
        throw new Error(methodName + ' has already been spied upon');
      }

      var spy = j$.createSpy(methodName, obj[methodName]);

      currentSpies().push({
        spy: spy,
        baseObj: obj,
        methodName: methodName,
        originalValue: obj[methodName]
      });

      obj[methodName] = spy;

      return spy;
    };

    this.clearSpies = function() {
      var spies = currentSpies();
      for (var i = 0; i < spies.length; i++) {
        var spyEntry = spies[i];
        spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;
      }
    };
  }

  return SpyRegistry;
};

getJasmineRequireObj().SpyStrategy = function() {

  function SpyStrategy(options) {
    options = options || {};

    var identity = options.name || 'unknown',
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

    this.returnValues = function() {
      var values = Array.prototype.slice.call(arguments);
      plan = function () {
        return values.shift();
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
    this.expectationFactory = attrs.expectationFactory;
    this.expectationResultFactory = attrs.expectationResultFactory;
    this.runnablesExplictlySetGetter = attrs.runnablesExplictlySetGetter || function() {};

    this.beforeFns = [];
    this.afterFns = [];
    this.beforeAllFns = [];
    this.afterAllFns = [];
    this.queueRunner = attrs.queueRunner || function() {};
    this.disabled = false;

    this.children = [];

    this.result = {
      id: this.id,
      description: this.description,
      fullName: this.getFullName(),
      failedExpectations: []
    };
  }

  Suite.prototype.expect = function(actual) {
    return this.expectationFactory(actual, this);
  };

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

  Suite.prototype.beforeAll = function(fn) {
    this.beforeAllFns.push(fn);
  };

  Suite.prototype.afterEach = function(fn) {
    this.afterFns.unshift(fn);
  };

  Suite.prototype.afterAll = function(fn) {
    this.afterAllFns.push(fn);
  };

  Suite.prototype.addChild = function(child) {
    this.children.push(child);
  };

  Suite.prototype.status = function() {
    if (this.disabled) {
      return 'disabled';
    }

    if (this.result.failedExpectations.length > 0) {
      return 'failed';
    } else {
      return 'finished';
    }
  };

  Suite.prototype.execute = function(onComplete) {
    var self = this;

    this.onStart(this);

    if (this.disabled) {
      complete();
      return;
    }

    var allFns = [];

    for (var i = 0; i < this.children.length; i++) {
      allFns.push(wrapChildAsAsync(this.children[i]));
    }

    if (this.isExecutable()) {
      allFns = this.beforeAllFns.concat(allFns);
      allFns = allFns.concat(this.afterAllFns);
    }

    this.queueRunner({
      queueableFns: allFns,
      onComplete: complete,
      userContext: this.sharedUserContext(),
      onException: function() { self.onException.apply(self, arguments); }
    });

    function complete() {
      self.result.status = self.status();
      self.resultCallback(self.result);

      if (onComplete) {
        onComplete();
      }
    }

    function wrapChildAsAsync(child) {
      return { fn: function(done) { child.execute(done); } };
    }
  };

  Suite.prototype.isExecutable = function() {
    var runnablesExplicitlySet = this.runnablesExplictlySetGetter();
    return !runnablesExplicitlySet && hasExecutableChild(this.children);
  };

  Suite.prototype.sharedUserContext = function() {
    if (!this.sharedContext) {
      this.sharedContext = this.parentSuite ? clone(this.parentSuite.sharedUserContext()) : {};
    }

    return this.sharedContext;
  };

  Suite.prototype.clonedSharedUserContext = function() {
    return clone(this.sharedUserContext());
  };

  Suite.prototype.onException = function() {
    if(isAfterAll(this.children)) {
      var data = {
        matcherName: '',
        passed: false,
        expected: '',
        actual: '',
        error: arguments[0]
      };
      this.result.failedExpectations.push(this.expectationResultFactory(data));
    } else {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.onException.apply(child, arguments);
      }
    }
  };

  Suite.prototype.addExpectationResult = function () {
    if(isAfterAll(this.children) && isFailure(arguments)){
      var data = arguments[1];
      this.result.failedExpectations.push(this.expectationResultFactory(data));
    } else {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.addExpectationResult.apply(child, arguments);
      }
    }
  };

  function isAfterAll(children) {
    return children && children[0].result.status;
  }

  function isFailure(args) {
    return !args[0];
  }

  function hasExecutableChild(children) {
    var foundActive = false;
    for (var i = 0; i < children.length; i++) {
      if (children[i].isExecutable()) {
        foundActive = true;
        break;
      }
    }
    return foundActive;
  }

  function clone(obj) {
    var clonedObj = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        clonedObj[prop] = obj[prop];
      }
    }

    return clonedObj;
  }

  return Suite;
};

if (typeof window == void 0 && typeof exports == 'object') {
  exports.Suite = jasmineRequire.Suite;
}

getJasmineRequireObj().Timer = function() {
  var defaultNow = (function(Date) {
    return function() { return new Date().getTime(); };
  })(Date);

  function Timer(options) {
    options = options || {};

    var now = options.now || defaultNow,
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

getJasmineRequireObj().Any = function() {

  function Any(expectedObject) {
    this.expectedObject = expectedObject;
  }

  Any.prototype.asymmetricMatch = function(other) {
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
    return '<jasmine.any(' + this.expectedObject + ')>';
  };

  return Any;
};

getJasmineRequireObj().Anything = function(j$) {

  function Anything() {}

  Anything.prototype.asymmetricMatch = function(other) {
    return !j$.util.isUndefined(other) && other !== null;
  };

  Anything.prototype.jasmineToString = function() {
    return '<jasmine.anything>';
  };

  return Anything;
};

getJasmineRequireObj().ArrayContaining = function(j$) {
  function ArrayContaining(sample) {
    this.sample = sample;
  }

  ArrayContaining.prototype.asymmetricMatch = function(other) {
    var className = Object.prototype.toString.call(this.sample);
    if (className !== '[object Array]') { throw new Error('You must provide an array to arrayContaining, not \'' + this.sample + '\'.'); }

    for (var i = 0; i < this.sample.length; i++) {
      var item = this.sample[i];
      if (!j$.matchersUtil.contains(other, item)) {
        return false;
      }
    }

    return true;
  };

  ArrayContaining.prototype.jasmineToString = function () {
    return '<jasmine.arrayContaining(' + jasmine.pp(this.sample) +')>';
  };

  return ArrayContaining;
};

getJasmineRequireObj().ObjectContaining = function(j$) {

  function ObjectContaining(sample) {
    this.sample = sample;
  }

  ObjectContaining.prototype.asymmetricMatch = function(other) {
    if (typeof(this.sample) !== 'object') { throw new Error('You must provide an object to objectContaining, not \''+this.sample+'\'.'); }

    for (var property in this.sample) {
      if (!Object.prototype.hasOwnProperty.call(other, property) ||
          !j$.matchersUtil.equals(this.sample[property], other[property])) {
        return false;
      }
    }

    return true;
  };

  ObjectContaining.prototype.jasmineToString = function() {
    return '<jasmine.objectContaining(' + j$.pp(this.sample) + ')>';
  };

  return ObjectContaining;
};

getJasmineRequireObj().StringMatching = function(j$) {

  function StringMatching(expected) {
    if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {
      throw new Error('Expected is not a String or a RegExp');
    }

    this.regexp = new RegExp(expected);
  }

  StringMatching.prototype.asymmetricMatch = function(other) {
    return this.regexp.test(other);
  };

  StringMatching.prototype.jasmineToString = function() {
    return '<jasmine.stringMatching(' + this.regexp + ')>';
  };

  return StringMatching;
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

      if ((Object.prototype.toString.apply(haystack) === '[object Array]') ||
        (!!haystack && !haystack.indexOf))
      {
        for (var i = 0; i < haystack.length; i++) {
          if (eq(haystack[i], needle, [], [], customTesters)) {
            return true;
          }
        }
        return false;
      }

      return !!haystack && haystack.indexOf(needle) >= 0;
    },

    buildFailureMessage: function() {
      var args = Array.prototype.slice.call(arguments, 0),
        matcherName = args[0],
        isNot = args[1],
        actual = args[2],
        expected = args.slice(3),
        englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });

      var message = 'Expected ' +
        j$.pp(actual) +
        (isNot ? ' not ' : ' ') +
        englishyPredicate;

      if (expected.length > 0) {
        for (var i = 0; i < expected.length; i++) {
          if (i > 0) {
            message += ',';
          }
          message += ' ' + j$.pp(expected[i]);
        }
      }

      return message + '.';
    }
  };

  function isAsymmetric(obj) {
    return obj && j$.isA_('Function', obj.asymmetricMatch);
  }

  function asymmetricMatch(a, b) {
    var asymmetricA = isAsymmetric(a),
        asymmetricB = isAsymmetric(b);

    if (asymmetricA && asymmetricB) {
      return undefined;
    }

    if (asymmetricA) {
      return a.asymmetricMatch(b);
    }

    if (asymmetricB) {
      return b.asymmetricMatch(a);
    }
  }

  // Equality function lovingly adapted from isEqual in
  //   [Underscore](http://underscorejs.org)
  function eq(a, b, aStack, bStack, customTesters) {
    var result = true;

    var asymmetricResult = asymmetricMatch(a, b);
    if (!j$.util.isUndefined(asymmetricResult)) {
      return asymmetricResult;
    }

    for (var i = 0; i < customTesters.length; i++) {
      var customTesterResult = customTesters[i](a, b);
      if (!j$.util.isUndefined(customTesterResult)) {
        return customTesterResult;
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

    var aIsDomNode = j$.isDomNode(a);
    var bIsDomNode = j$.isDomNode(b);
    if (aIsDomNode && bIsDomNode) {
      // At first try to use DOM3 method isEqualNode
      if (a.isEqualNode) {
        return a.isEqualNode(b);
      }
      // IE8 doesn't support isEqualNode, try to use outerHTML && innerText
      var aIsElement = a instanceof Element;
      var bIsElement = b instanceof Element;
      if (aIsElement && bIsElement) {
        return a.outerHTML == b.outerHTML;
      }
      if (aIsElement || bIsElement) {
        return false;
      }
      return a.innerText == b.innerText && a.textContent == b.textContent;
    }
    if (aIsDomNode || bIsDomNode) {
      return false;
    }

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
    // Compare array lengths to determine if a deep comparison is necessary.
    if (className == '[object Array]' && a.length !== b.length) {
      result = false;
    }

    if (result) {
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
      return Object.prototype.hasOwnProperty.call(obj, key);
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
          result.message = 'Expected actual not to be NaN.';
        } else {
          result.message = function() { return 'Expected ' + j$.pp(actual) + ' to be NaN.'; };
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
          'Expected spy ' + actual.and.identity() + ' not to have been called.' :
          'Expected spy ' + actual.and.identity() + ' to have been called.';

        return result;
      }
    };
  }

  return toHaveBeenCalled;
};

getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {

  function toHaveBeenCalledWith(util, customEqualityTesters) {
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
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but it was never called.'; };
          return result;
        }

        if (util.contains(actual.calls.allArgs(), expectedArgs, customEqualityTesters)) {
          result.pass = true;
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' not to have been called with ' + j$.pp(expectedArgs) + ' but it was.'; };
        } else {
          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but actual calls were ' + j$.pp(actual.calls.allArgs()).replace(/^\[ | \]$/g, '') + '.'; };
        }

        return result;
      }
    };
  }

  return toHaveBeenCalledWith;
};

getJasmineRequireObj().toMatch = function(j$) {

  function toMatch() {
    return {
      compare: function(actual, expected) {
        if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {
          throw new Error('Expected is not a String or a RegExp');
        }

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

        if (typeof actual != 'function') {
          throw new Error('Actual is not a Function');
        }

        try {
          actual();
        } catch (e) {
          threw = true;
          thrown = e;
        }

        if (!threw) {
          result.message = 'Expected function to throw an exception.';
          return result;
        }

        if (arguments.length == 1) {
          result.pass = true;
          result.message = function() { return 'Expected function not to throw, but it threw ' + j$.pp(thrown) + '.'; };

          return result;
        }

        if (util.equals(thrown, expected)) {
          result.pass = true;
          result.message = function() { return 'Expected function not to throw ' + j$.pp(expected) + '.'; };
        } else {
          result.message = function() { return 'Expected function to throw ' + j$.pp(expected) + ', but it threw ' +  j$.pp(thrown) + '.'; };
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
          pass = {pass: true},
          fail = {pass: false},
          thrown;

        if (typeof actual != 'function') {
          throw new Error('Actual is not a Function');
        }

        var errorMatcher = getMatcher.apply(null, arguments);

        try {
          actual();
        } catch (e) {
          threw = true;
          thrown = e;
        }

        if (!threw) {
          fail.message = 'Expected function to throw an Error.';
          return fail;
        }

        if (!(thrown instanceof Error)) {
          fail.message = function() { return 'Expected function to throw an Error, but it threw ' + j$.pp(thrown) + '.'; };
          return fail;
        }

        if (errorMatcher.hasNoSpecifics()) {
          pass.message = 'Expected function not to throw an Error, but it threw ' + j$.fnNameFor(thrown) + '.';
          return pass;
        }

        if (errorMatcher.matches(thrown)) {
          pass.message = function() {
            return 'Expected function not to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() + '.';
          };
          return pass;
        } else {
          fail.message = function() {
            return 'Expected function to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() +
              ', but it threw ' + errorMatcher.thrownDescription(thrown) + '.';
          };
          return fail;
        }
      }
    };

    function getMatcher() {
      var expected = null,
          errorType = null;

      if (arguments.length == 2) {
        expected = arguments[1];
        if (isAnErrorType(expected)) {
          errorType = expected;
          expected = null;
        }
      } else if (arguments.length > 2) {
        errorType = arguments[1];
        expected = arguments[2];
        if (!isAnErrorType(errorType)) {
          throw new Error('Expected error type is not an Error.');
        }
      }

      if (expected && !isStringOrRegExp(expected)) {
        if (errorType) {
          throw new Error('Expected error message is not a string or RegExp.');
        } else {
          throw new Error('Expected is not an Error, string, or RegExp.');
        }
      }

      function messageMatch(message) {
        if (typeof expected == 'string') {
          return expected == message;
        } else {
          return expected.test(message);
        }
      }

      return {
        errorTypeDescription: errorType ? j$.fnNameFor(errorType) : 'an exception',
        thrownDescription: function(thrown) {
          var thrownName = errorType ? j$.fnNameFor(thrown.constructor) : 'an exception',
              thrownMessage = '';

          if (expected) {
            thrownMessage = ' with message ' + j$.pp(thrown.message);
          }

          return thrownName + thrownMessage;
        },
        messageDescription: function() {
          if (expected === null) {
            return '';
          } else if (expected instanceof RegExp) {
            return ' with a message matching ' + j$.pp(expected);
          } else {
            return ' with message ' + j$.pp(expected);
          }
        },
        hasNoSpecifics: function() {
          return expected === null && errorType === null;
        },
        matches: function(error) {
          return (errorType === null || error.constructor === errorType) &&
            (expected === null || messageMatch(error.message));
        }
      };
    }

    function isStringOrRegExp(potential) {
      return potential instanceof RegExp || (typeof potential == 'string');
    }

    function isAnErrorType(type) {
      if (typeof type !== 'function') {
        return false;
      }

      var Surrogate = function() {};
      Surrogate.prototype = type.prototype;
      return (new Surrogate()) instanceof Error;
    }
  }

  return toThrowError;
};

getJasmineRequireObj().interface = function(jasmine, env) {
  var jasmineInterface = {
    describe: function(description, specDefinitions) {
      return env.describe(description, specDefinitions);
    },

    xdescribe: function(description, specDefinitions) {
      return env.xdescribe(description, specDefinitions);
    },

    fdescribe: function(description, specDefinitions) {
      return env.fdescribe(description, specDefinitions);
    },

    it: function() {
      return env.it.apply(env, arguments);
    },

    xit: function() {
      return env.xit.apply(env, arguments);
    },

    fit: function() {
      return env.fit.apply(env, arguments);
    },

    beforeEach: function() {
      return env.beforeEach.apply(env, arguments);
    },

    afterEach: function() {
      return env.afterEach.apply(env, arguments);
    },

    beforeAll: function() {
      return env.beforeAll.apply(env, arguments);
    },

    afterAll: function() {
      return env.afterAll.apply(env, arguments);
    },

    expect: function(actual) {
      return env.expect(actual);
    },

    pending: function() {
      return env.pending.apply(env, arguments);
    },

    fail: function() {
      return env.fail.apply(env, arguments);
    },

    spyOn: function(obj, methodName) {
      return env.spyOn(obj, methodName);
    },

    jsApiReporter: new jasmine.JsApiReporter({
      timer: new jasmine.Timer()
    }),

    jasmine: jasmine
  };

  jasmine.addCustomEqualityTester = function(tester) {
    env.addCustomEqualityTester(tester);
  };

  jasmine.addMatchers = function(matchers) {
    return env.addMatchers(matchers);
  };

  jasmine.clock = function() {
    return env.clock;
  };

  return jasmineInterface;
};

getJasmineRequireObj().version = function() {
  return '2.2.0';
};
/*
Copyright (c) 2008-2015 Pivotal Labs

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
      addToExistingQueryString = options.addToExistingQueryString || defaultQueryString,
      timer = options.timer || noopTimer,
      results = [],
      specsExecuted = 0,
      failureCount = 0,
      pendingSpecCount = 0,
      htmlReporterMain,
      symbols,
      failedSuites = [];

    this.initialize = function() {
      clearPrior();
      htmlReporterMain = createDom('div', {className: 'jasmine_html-reporter'},
        createDom('div', {className: 'banner'},
          createDom('a', {className: 'title', href: 'http://jasmine.github.io/', target: '_blank'}),
          createDom('span', {className: 'version'}, j$.version)
        ),
        createDom('ul', {className: 'symbol-summary'}),
        createDom('div', {className: 'alert'}),
        createDom('div', {className: 'results'},
          createDom('div', {className: 'failures'})
        )
      );
      getContainer().appendChild(htmlReporterMain);

      symbols = find('.symbol-summary');
    };

    var totalSpecsDefined;
    this.jasmineStarted = function(options) {
      totalSpecsDefined = options.totalSpecsDefined || 0;
      timer.start();
    };

    var summary = createDom('div', {className: 'summary'});

    var topResults = new j$.ResultsNode({}, '', null),
      currentParent = topResults;

    this.suiteStarted = function(result) {
      currentParent.addChild(result, 'suite');
      currentParent = currentParent.last();
    };

    this.suiteDone = function(result) {
      if (result.status == 'failed') {
        failedSuites.push(result);
      }

      if (currentParent == topResults) {
        return;
      }

      currentParent = currentParent.parent;
    };

    this.specStarted = function(result) {
      currentParent.addChild(result, 'spec');
    };

    var failures = [];
    this.specDone = function(result) {
      if(noExpectations(result) && typeof console !== 'undefined' && typeof console.error !== 'undefined') {
        console.error('Spec \'' + result.fullName + '\' has no expectations.');
      }

      if (result.status != 'disabled') {
        specsExecuted++;
      }

      symbols.appendChild(createDom('li', {
          className: noExpectations(result) ? 'empty' : result.status,
          id: 'spec_' + result.id,
          title: result.fullName
        }
      ));

      if (result.status == 'failed') {
        failureCount++;

        var failure =
          createDom('div', {className: 'spec-detail failed'},
            createDom('div', {className: 'description'},
              createDom('a', {title: result.fullName, href: specHref(result)}, result.fullName)
            ),
            createDom('div', {className: 'messages'})
          );
        var messages = failure.childNodes[1];

        for (var i = 0; i < result.failedExpectations.length; i++) {
          var expectation = result.failedExpectations[i];
          messages.appendChild(createDom('div', {className: 'result-message'}, expectation.message));
          messages.appendChild(createDom('div', {className: 'stack-trace'}, expectation.stack));
        }

        failures.push(failure);
      }

      if (result.status == 'pending') {
        pendingSpecCount++;
      }
    };

    this.jasmineDone = function() {
      var banner = find('.banner');
      banner.appendChild(createDom('span', {className: 'duration'}, 'finished in ' + timer.elapsed() / 1000 + 's'));

      var alert = find('.alert');

      alert.appendChild(createDom('span', { className: 'exceptions' },
        createDom('label', { className: 'label', 'for': 'raise-exceptions' }, 'raise exceptions'),
        createDom('input', {
          className: 'raise',
          id: 'raise-exceptions',
          type: 'checkbox'
        })
      ));
      var checkbox = find('#raise-exceptions');

      checkbox.checked = !env.catchingExceptions();
      checkbox.onclick = onRaiseExceptionsClick;

      if (specsExecuted < totalSpecsDefined) {
        var skippedMessage = 'Ran ' + specsExecuted + ' of ' + totalSpecsDefined + ' specs - run all';
        alert.appendChild(
          createDom('span', {className: 'bar skipped'},
            createDom('a', {href: '?', title: 'Run all specs'}, skippedMessage)
          )
        );
      }
      var statusBarMessage = '';
      var statusBarClassName = 'bar ';

      if (totalSpecsDefined > 0) {
        statusBarMessage += pluralize('spec', specsExecuted) + ', ' + pluralize('failure', failureCount);
        if (pendingSpecCount) { statusBarMessage += ', ' + pluralize('pending spec', pendingSpecCount); }
        statusBarClassName += (failureCount > 0) ? 'failed' : 'passed';
      } else {
        statusBarClassName += 'skipped';
        statusBarMessage += 'No specs found';
      }

      alert.appendChild(createDom('span', {className: statusBarClassName}, statusBarMessage));

      for(i = 0; i < failedSuites.length; i++) {
        var failedSuite = failedSuites[i];
        for(var j = 0; j < failedSuite.failedExpectations.length; j++) {
          var errorBarMessage = 'AfterAll ' + failedSuite.failedExpectations[j].message;
          var errorBarClassName = 'bar errored';
          alert.appendChild(createDom('span', {className: errorBarClassName}, errorBarMessage));
        }
      }

      var results = find('.results');
      results.appendChild(summary);

      summaryList(topResults, summary);

      function summaryList(resultsTree, domParent) {
        var specListNode;
        for (var i = 0; i < resultsTree.children.length; i++) {
          var resultNode = resultsTree.children[i];
          if (resultNode.type == 'suite') {
            var suiteListNode = createDom('ul', {className: 'suite', id: 'suite-' + resultNode.result.id},
              createDom('li', {className: 'suite-detail'},
                createDom('a', {href: specHref(resultNode.result)}, resultNode.result.description)
              )
            );

            summaryList(resultNode, suiteListNode);
            domParent.appendChild(suiteListNode);
          }
          if (resultNode.type == 'spec') {
            if (domParent.getAttribute('class') != 'specs') {
              specListNode = createDom('ul', {className: 'specs'});
              domParent.appendChild(specListNode);
            }
            var specDescription = resultNode.result.description;
            if(noExpectations(resultNode.result)) {
              specDescription = 'SPEC HAS NO EXPECTATIONS ' + specDescription;
            }
            if(resultNode.result.status === 'pending' && resultNode.result.pendingReason !== '') {
              specDescription = specDescription + ' PENDING WITH MESSAGE: ' + resultNode.result.pendingReason;
            }
            specListNode.appendChild(
              createDom('li', {
                  className: resultNode.result.status,
                  id: 'spec-' + resultNode.result.id
                },
                createDom('a', {href: specHref(resultNode.result)}, specDescription)
              )
            );
          }
        }
      }

      if (failures.length) {
        alert.appendChild(
          createDom('span', {className: 'menu bar spec-list'},
            createDom('span', {}, 'Spec List | '),
            createDom('a', {className: 'failures-menu', href: '#'}, 'Failures')));
        alert.appendChild(
          createDom('span', {className: 'menu bar failure-list'},
            createDom('a', {className: 'spec-list-menu', href: '#'}, 'Spec List'),
            createDom('span', {}, ' | Failures ')));

        find('.failures-menu').onclick = function() {
          setMenuModeTo('failure-list');
        };
        find('.spec-list-menu').onclick = function() {
          setMenuModeTo('spec-list');
        };

        setMenuModeTo('failure-list');

        var failureNode = find('.failures');
        for (var i = 0; i < failures.length; i++) {
          failureNode.appendChild(failures[i]);
        }
      }
    };

    return this;

    function find(selector) {
      return getContainer().querySelector('.jasmine_html-reporter ' + selector);
    }

    function clearPrior() {
      // return the reporter
      var oldReporter = find('');

      if(oldReporter) {
        getContainer().removeChild(oldReporter);
      }
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
        if (attr == 'className') {
          el[attr] = attrs[attr];
        } else {
          el.setAttribute(attr, attrs[attr]);
        }
      }

      return el;
    }

    function pluralize(singular, count) {
      var word = (count == 1 ? singular : singular + 's');

      return '' + count + ' ' + word;
    }

    function specHref(result) {
      return addToExistingQueryString('spec', result.fullName);
    }

    function defaultQueryString(key, value) {
      return '?' + key + '=' + value;
    }

    function setMenuModeTo(mode) {
      htmlReporterMain.setAttribute('class', 'jasmine_html-reporter ' + mode);
    }

    function noExpectations(result) {
      return (result.failedExpectations.length + result.passedExpectations.length) === 0 &&
        result.status === 'passed';
    }
  }

  return HtmlReporter;
};

jasmineRequire.HtmlSpecFilter = function() {
  function HtmlSpecFilter(options) {
    var filterString = options && options.filterString() && options.filterString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
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

    this.navigateWithNewParam = function(key, value) {
      options.getWindowLocation().search = this.fullStringWithNewParam(key, value);
    };

    this.fullStringWithNewParam = function(key, value) {
      var paramMap = queryStringToParamMap();
      paramMap[key] = value;
      return toQueryString(paramMap);
    };

    this.getParam = function(key) {
      return queryStringToParamMap()[key];
    };

    return this;

    function toQueryString(paramMap) {
      var qStrPairs = [];
      for (var prop in paramMap) {
        qStrPairs.push(encodeURIComponent(prop) + '=' + encodeURIComponent(paramMap[prop]));
      }
      return '?' + qStrPairs.join('&');
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
          if (value === 'true' || value === 'false') {
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
Copyright (c) 2008-2015 Pivotal Labs

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
  if (typeof module !== 'undefined' && module.exports) {
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
      },
      failedSuites = [];

    print('ConsoleReporter is deprecated and will be removed in a future version.');

    this.jasmineStarted = function() {
      specCount = 0;
      failureCount = 0;
      pendingCount = 0;
      print('Started');
      printNewline();
      timer.start();
    };

    this.jasmineDone = function() {
      printNewline();
      for (var i = 0; i < failedSpecs.length; i++) {
        specFailureDetails(failedSpecs[i]);
      }

      if(specCount > 0) {
        printNewline();

        var specCounts = specCount + ' ' + plural('spec', specCount) + ', ' +
          failureCount + ' ' + plural('failure', failureCount);

        if (pendingCount) {
          specCounts += ', ' + pendingCount + ' pending ' + plural('spec', pendingCount);
        }

        print(specCounts);
      } else {
        print('No specs found');
      }

      printNewline();
      var seconds = timer.elapsed() / 1000;
      print('Finished in ' + seconds + ' ' + plural('second', seconds));
      printNewline();

      for(i = 0; i < failedSuites.length; i++) {
        suiteFailureDetails(failedSuites[i]);
      }

      onComplete(failureCount === 0);
    };

    this.specDone = function(result) {
      specCount++;

      if (result.status == 'pending') {
        pendingCount++;
        print(colored('yellow', '*'));
        return;
      }

      if (result.status == 'passed') {
        print(colored('green', '.'));
        return;
      }

      if (result.status == 'failed') {
        failureCount++;
        failedSpecs.push(result);
        print(colored('red', 'F'));
      }
    };

    this.suiteDone = function(result) {
      if (result.failedExpectations && result.failedExpectations.length > 0) {
        failureCount++;
        failedSuites.push(result);
      }
    };

    return this;

    function printNewline() {
      print('\n');
    }

    function colored(color, str) {
      return showColors ? (ansi[color] + str + ansi.none) : str;
    }

    function plural(str, count) {
      return count == 1 ? str : str + 's';
    }

    function repeat(thing, times) {
      var arr = [];
      for (var i = 0; i < times; i++) {
        arr.push(thing);
      }
      return arr;
    }

    function indent(str, spaces) {
      var lines = (str || '').split('\n');
      var newArr = [];
      for (var i = 0; i < lines.length; i++) {
        newArr.push(repeat(' ', spaces).join('') + lines[i]);
      }
      return newArr.join('\n');
    }

    function specFailureDetails(result) {
      printNewline();
      print(result.fullName);

      for (var i = 0; i < result.failedExpectations.length; i++) {
        var failedExpectation = result.failedExpectations[i];
        printNewline();
        print(indent(failedExpectation.message, 2));
        print(indent(failedExpectation.stack, 2));
      }

      printNewline();
    }

    function suiteFailureDetails(result) {
      for (var i = 0; i < result.failedExpectations.length; i++) {
        printNewline();
        print(colored('red', 'An error was thrown in an afterAll'));
        printNewline();
        print(colored('red', 'AfterAll ' + result.failedExpectations[i].message));

      }
      printNewline();
    }
  }

  return ConsoleReporter;
};
/**
 Starting with version 2.0, this file "boots" Jasmine, performing all of the necessary initialization before executing the loaded environment and all of a project's specs. This file should be loaded after `jasmine.js` and `jasmine_html.js`, but before any project source files or spec files are loaded. Thus this file can also be used to customize Jasmine for a project.

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
  var jasmineInterface = jasmineRequire.interface(jasmine, env);

  /**
   * Add all of the Jasmine global/public interface to the proper global, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
   */
  if (typeof window == "undefined" && typeof exports == "object") {
    extend(exports, jasmineInterface);
  } else {
    extend(window, jasmineInterface);
  }

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
    onRaiseExceptionsClick: function() { queryString.navigateWithNewParam("catch", !env.catchingExceptions()); },
    addToExistingQueryString: function(key, value) { return queryString.fullStringWithNewParam(key, value); },
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
var chr_set_id, face, face_id, job, list, _id;

new Cache.Rule("face").schema(function() {
  var item;
  this.order("order");
  this.scope(function(all) {
    return {
      tag: function(tag_id) {
        switch (tag_id) {
          case "all":
            return all;
          default:
            return all["in"]({
              tags: tag_id
            });
        }
      },
      chr_jobs: function(chr_job_id) {
        return all.where({
          chr_job_id: chr_job_id
        });
      },
      name_head: function() {
        var counts, idx, key, names, _i, _name, _ref, _ref1;
        counts = [];
        for (idx = _i = _ref = "ア".charCodeAt(0), _ref1 = "ン".charCodeAt(0); _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; idx = _ref <= _ref1 ? ++_i : --_i) {
          key = String.fromCharCode(idx);
          names = all.where({
            name: RegExp("^" + key)
          }).list().map(function(o) {
            return o.name;
          });
          if (counts[_name = names.length] == null) {
            counts[_name] = [];
          }
          counts[names.length].push("<" + key + ">" + (names.join(" ")));
        }
        return counts;
      }
    };
  });
  item = {
    count: 1
  };
  return this.map_reduce(function(o, emit) {
    var tag, _i, _len, _ref, _results;
    emit("all", "all", item);
    _ref = o.tags;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tag = _ref[_i];
      _results.push(emit("tag", tag, item));
    }
    return _results;
  });
});

new Cache.Rule("chr_set").schema(function() {
  return this.order("caption");
});

new Cache.Rule("chr_npc").schema(function() {
  this.belongs_to("chr_set", {
    dependent: true
  });
  return this.belongs_to("face", {
    dependent: true
  });
});

new Cache.Rule("chr_job").schema(function() {
  var order;
  this.order(function(o) {
    return o.face.order;
  });
  this.belongs_to("chr_set", {
    dependent: true
  });
  this.belongs_to("face", {
    dependent: true
  });
  this.deploy(function(o) {
    o.chr_job_id = o._id;
    return o.chr_set_idx = order.indexOf(o.chr_set_id);
  });
  order = ["ririnra", "wa", "time", "sf", "mad", "ger", "changed", "animal", "school", "all"];
  return this.scope(function(all) {
    return {
      face: function(face_id) {
        return all.where(function(o) {
          return face_id === o.face_id;
        }).sort(false, function(o) {
          return o.chr_set_idx;
        });
      }
    };
  });
});

Cache.rule.face.set([
  {
    "_id": "c49",
    "comment": "test",
    "face_id": "c49",
    "name": "ボリス",
    "order": 1,
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c38",
    "order": 2,
    "face_id": "c38",
    "name": "コリーン",
    "tags": ["giji", "market", "young"]
  }, {
    "_id": "c77",
    "order": 3,
    "face_id": "c77",
    "name": "キャロライナ",
    "tags": ["giji", "servant", "road", "farm", "young"]
  }, {
    "_id": "c35",
    "order": 4,
    "face_id": "c35",
    "name": "ダン",
    "tags": ["giji", "guild", "middle"]
  }, {
    "_id": "c53",
    "order": 5,
    "face_id": "c53",
    "name": "ゼルダ",
    "tags": ["giji", "government", "farm", "elegant", "elder"]
  }, {
    "_id": "c74",
    "order": 6,
    "face_id": "c74",
    "name": "フランシスカ",
    "tags": ["giji", "market", "young"]
  }, {
    "_id": "c50",
    "order": 8,
    "face_id": "c50",
    "name": "ディーン",
    "tags": ["giji", "government", "guild", "young"]
  }, {
    "_id": "c36",
    "order": 8,
    "face_id": "c36",
    "name": "ミッシェル",
    "tags": ["giji", "guild", "servant", "young"]
  }, {
    "_id": "c26",
    "order": 8,
    "face_id": "c26",
    "name": "モニカ",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c09",
    "order": 9,
    "face_id": "c09",
    "name": "ヒロシ",
    "tags": ["giji", "immoral", "travel", "river", "middle"]
  }, {
    "_id": "c55",
    "order": 10,
    "face_id": "c55",
    "name": "パピヨン",
    "tags": ["giji", "apartment", "elegant", "middle"]
  }, {
    "_id": "c29",
    "order": 11,
    "face_id": "c29",
    "name": "イアン",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c12",
    "order": 12,
    "face_id": "c12",
    "name": "バーナバス",
    "tags": ["giji", "servant", "road", "middle"]
  }, {
    "_id": "c16",
    "order": 127,
    "face_id": "c16",
    "name": "マリアンヌ",
    "tags": ["giji", "apartment", "market", "medical", "young"]
  }, {
    "_id": "c34",
    "order": 14,
    "face_id": "c34",
    "name": "トニー",
    "tags": ["giji", "road", "servant", "kid"]
  }, {
    "_id": "c44",
    "order": 15,
    "face_id": "c44",
    "name": "ドナルド",
    "tags": ["giji", "immoral", "young"]
  }, {
    "_id": "c11",
    "order": 16,
    "face_id": "c11",
    "name": "カルヴィン",
    "tags": ["giji", "elegant", "apartment", "kid"]
  }, {
    "_id": "c10",
    "order": 17,
    "face_id": "c10",
    "name": "ゾーイ",
    "tags": ["travel", "giji", "apartment", "kid"]
  }, {
    "_id": "c70",
    "order": 18,
    "face_id": "c70",
    "name": "パティ",
    "tags": ["giji", "servant", "apartment", "young"]
  }, {
    "_id": "c56",
    "order": 19,
    "face_id": "c56",
    "name": "ゴドウィン",
    "tags": ["giji", "guild", "market", "middle"]
  }, {
    "_id": "c07",
    "order": 20,
    "face_id": "c07",
    "name": "ティモシー",
    "tags": ["giji", "guild", "elder"]
  }, {
    "_id": "c41",
    "order": 21,
    "face_id": "c41",
    "name": "ヤニク",
    "tags": ["giji", "immoral", "river", "young"]
  }, {
    "_id": "c58",
    "order": 22,
    "face_id": "c58",
    "name": "ブルーノ",
    "tags": ["giji", "ecclesia", "middle", "elder"]
  }, {
    "_id": "c17",
    "order": 23,
    "face_id": "c17",
    "name": "ユリシーズ",
    "tags": ["giji", "market", "middle"]
  }, {
    "_id": "c39",
    "order": 24,
    "face_id": "c39",
    "name": "シビル",
    "tags": ["giji", "servant", "guild", "middle"]
  }, {
    "_id": "c40",
    "order": 25,
    "face_id": "c40",
    "name": "ハワード",
    "tags": ["giji", "servant", "elder"]
  }, {
    "_id": "c65",
    "order": 26,
    "face_id": "c65",
    "name": "ズリエル",
    "tags": ["giji", "immoral", "middle"]
  }, {
    "_id": "c59",
    "order": 27,
    "face_id": "c59",
    "name": "ムパムピス",
    "tags": ["giji", "ecclesia", "young"]
  }, {
    "_id": "c57",
    "order": 28,
    "face_id": "c57",
    "name": "ツェツィーリヤ",
    "tags": ["giji", "ecclesia", "young", "middle"]
  }, {
    "_id": "c04",
    "order": 29,
    "face_id": "c04",
    "name": "ノーリーン",
    "tags": ["giji", "servant", "middle"]
  }, {
    "_id": "c46",
    "order": 30,
    "face_id": "c46",
    "name": "ゲイル",
    "tags": ["giji", "apartment", "medical", "young", "middle"]
  }, {
    "_id": "c14",
    "order": 31,
    "face_id": "c14",
    "name": "レティーシャ",
    "tags": ["giji", "ecclesia", "kid"]
  }, {
    "_id": "c42",
    "order": 33,
    "face_id": "c42",
    "name": "ラルフ",
    "tags": ["giji", "servant", "young"]
  }, {
    "_id": "c37",
    "order": 34,
    "face_id": "c37",
    "name": "セシル",
    "tags": ["giji", "market", "young"]
  }, {
    "_id": "c75",
    "order": 35,
    "face_id": "c75",
    "name": "ビリー",
    "tags": ["giji", "market", "middle"]
  }, {
    "_id": "c32",
    "order": 36,
    "face_id": "c32",
    "name": "オスカー",
    "tags": ["giji", "apartment", "kid"]
  }, {
    "_id": "c33",
    "order": 37,
    "face_id": "c33",
    "name": "ホリー",
    "tags": ["giji", "apartment", "kid"]
  }, {
    "_id": "c02",
    "order": 38,
    "face_id": "c02",
    "name": "アルフレッド",
    "tags": ["giji", "government", "middle"]
  }, {
    "_id": "c66",
    "order": 39,
    "face_id": "c66",
    "name": "クリストファー",
    "tags": ["giji", "servant", "guild", "farm", "middle"]
  }, {
    "_id": "c24",
    "order": 41,
    "face_id": "c24",
    "name": "ナタリア",
    "tags": ["giji", "government", "apartment", "elder"]
  }, {
    "_id": "c79",
    "order": 42,
    "face_id": "c79",
    "name": "マーゴ",
    "tags": ["giji", "government", "apartment", "young"]
  }, {
    "_id": "c61",
    "order": 43,
    "face_id": "c61",
    "name": "ヌマタロウ",
    "tags": ["giji", "river", "farm", "elder"]
  }, {
    "_id": "c23",
    "order": 44,
    "face_id": "c23",
    "name": "チャールズ",
    "tags": ["giji", "ecclesia", "middle"]
  }, {
    "_id": "c28",
    "comment": "",
    "face_id": "c28",
    "name": "ケイト",
    "order": 47,
    "tags": ["giji", "apartment", "young"]
  }, {
    "_id": "c68",
    "order": 48,
    "face_id": "c68",
    "name": "ヨアヒム",
    "tags": ["giji", "market", "immoral", "elegant", "middle", "elder"]
  }, {
    "_id": "c30",
    "order": 49,
    "face_id": "c30",
    "name": "フィリップ",
    "tags": ["giji", "road", "river", "market", "young"]
  }, {
    "_id": "c21",
    "order": 50,
    "face_id": "c21",
    "name": "ニール",
    "tags": ["giji", "farm", "guild", "young", "middle"]
  }, {
    "_id": "c52",
    "order": 52,
    "face_id": "c52",
    "name": "ギリアン",
    "tags": ["giji", "medical", "ecclesia", "young"]
  }, {
    "_id": "c51",
    "order": 53,
    "face_id": "c51",
    "name": "ヨーランダ",
    "tags": ["giji", "medical", "ecclesia", "young"]
  }, {
    "_id": "c01",
    "comment": "",
    "face_id": "c01",
    "name": "メアリー",
    "order": 55,
    "tags": ["giji", "market", "road", "young"]
  }, {
    "_id": "c69",
    "order": 56,
    "face_id": "c69",
    "name": "ギネス",
    "tags": ["giji", "guild", "market", "middle"]
  }, {
    "_id": "c63",
    "order": 57,
    "face_id": "c63",
    "name": "ピッパ",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c05",
    "order": 59,
    "face_id": "c05",
    "name": "キャサリン",
    "tags": ["giji", "medical", "young"]
  }, {
    "_id": "c22",
    "order": 60,
    "face_id": "c22",
    "name": "ワット",
    "tags": ["giji", "farm", "middle"]
  }, {
    "_id": "c62",
    "order": 61,
    "face_id": "c62",
    "name": "ヴェラ",
    "tags": ["giji", "immoral", "river", "middle"]
  }, {
    "_id": "c13",
    "order": 62,
    "face_id": "c13",
    "name": "ロミオ",
    "tags": ["giji", "medical", "elder"]
  }, {
    "_id": "c18",
    "order": 63,
    "face_id": "c18",
    "name": "エマ",
    "tags": ["giji", "medical", "elder"]
  }, {
    "_id": "c27",
    "order": 65,
    "face_id": "c27",
    "name": "リンダ",
    "tags": ["giji", "farm", "young"]
  }, {
    "_id": "c08",
    "order": 66,
    "face_id": "c08",
    "name": "ベネット",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c19",
    "order": 67,
    "face_id": "c19",
    "name": "タバサ",
    "tags": ["giji", "immoral", "market", "young"]
  }, {
    "_id": "c71",
    "order": 70,
    "face_id": "c71",
    "name": "ノックス",
    "tags": ["giji", "road", "farm", "young"]
  }, {
    "_id": "c03",
    "order": 71,
    "face_id": "c03",
    "name": "スティーブン",
    "tags": ["giji", "medical", "middle"]
  }, {
    "_id": "c43",
    "order": 72,
    "face_id": "c43",
    "name": "ガストン",
    "tags": ["giji", "farm", "middle"]
  }, {
    "_id": "c15",
    "order": 73,
    "face_id": "c15",
    "name": "ウェーズリー",
    "tags": ["giji", "government", "road", "middle"]
  }, {
    "_id": "c54",
    "order": 75,
    "face_id": "c54",
    "name": "ザック",
    "tags": ["giji", "guild", "medical", "young"]
  }, {
    "_id": "c25",
    "order": 77,
    "face_id": "c25",
    "name": "ルーカス",
    "tags": ["giji", "elegant", "young"]
  }, {
    "_id": "c20",
    "order": 79,
    "face_id": "c20",
    "name": "グロリア",
    "tags": ["giji", "elegant", "young"]
  }, {
    "_id": "c72",
    "order": 81,
    "face_id": "c72",
    "name": "ヴェスパタイン",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c73",
    "order": 83,
    "face_id": "c73",
    "name": "ローズマリー",
    "tags": ["giji", "immoral", "market", "young"]
  }, {
    "_id": "c47",
    "order": 85,
    "face_id": "c47",
    "name": "ペラジー",
    "tags": ["giji", "ecclesia", "river", "young"]
  }, {
    "_id": "c80",
    "order": 87,
    "face_id": "c80",
    "name": "テッド",
    "tags": ["giji", "road", "apartment", "young"]
  }, {
    "_id": "c96",
    "face_id": "c96",
    "name": "レオナルド",
    "comment": "2011/12/11",
    "order": 89,
    "tags": ["giji", "government", "ecclesia", "middle"]
  }, {
    "_id": "c95",
    "face_id": "c95",
    "name": "モリス",
    "comment": "2011/12/11",
    "order": 91,
    "tags": ["giji", "guild", "road", "young"]
  }, {
    "_id": "c97",
    "face_id": "c97",
    "name": "ジェフ",
    "comment": "2011/12/14 超常現象はあるんだ…",
    "order": 93,
    "tags": ["giji", "government", "river", "young", "middle"]
  }, {
    "_id": "c98",
    "face_id": "c98",
    "name": "オズワルド",
    "comment": "2011/12/29 この髭はぜったいワックス使ってる。",
    "order": 95,
    "tags": ["giji", "immoral", "river", "middle"]
  }, {
    "_id": "c100",
    "face_id": "c100",
    "name": "グレッグ",
    "comment": "2012/12/30 スポーツ系中学生くらいに見える",
    "order": 97,
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c101",
    "face_id": "c101",
    "name": "クラリッサ",
    "comment": "2011/12/30 美人さん♪",
    "order": 99,
    "tags": ["giji", "servant", "apartment", "young"]
  }, {
    "_id": "c90",
    "face_id": "c90",
    "name": "ケヴィン",
    "comment": "2011/12/06",
    "order": 125,
    "tags": ["giji", "government", "river", "farm", "young"]
  }, {
    "_id": "c88",
    "face_id": "c88",
    "name": "ピエール",
    "order": 126,
    "comment": "2011/12/05",
    "tags": ["giji", "servant", "market", "middle"]
  }, {
    "_id": "c89",
    "face_id": "c89",
    "name": "カトリーナ",
    "comment": "2011/12/06",
    "order": 128,
    "tags": ["giji", "apartment", "young"]
  }, {
    "_id": "c84",
    "face_id": "c84",
    "name": "ブレンダ",
    "order": 129,
    "comment": "2011/12/05",
    "tags": ["giji", "apartment", "middle"]
  }, {
    "_id": "c85",
    "face_id": "c85",
    "name": "ハナ",
    "order": 130,
    "comment": "2011/12/05",
    "tags": ["giji", "road", "servant", "kid"]
  }, {
    "_id": "c91",
    "comment": "2011/12/06 姦しい奥様♪",
    "face_id": "c91",
    "name": "ドロシー",
    "order": 143,
    "tags": ["giji", "river", "servant", "middle"]
  }, {
    "_id": "c92",
    "comment": "2011/12/06 姦し娘ーず♪",
    "face_id": "c92",
    "name": "セレスト",
    "order": 144,
    "tags": ["giji", "river", "servant", "young"]
  }, {
    "_id": "c93",
    "comment": "2011/12/06 えー○○が許されるのは小学生までだよねー♪",
    "face_id": "c93",
    "name": "ベッキー",
    "order": 145,
    "tags": ["giji", "river", "servant", "young"]
  }, {
    "_id": "c78",
    "order": 150,
    "face_id": "c78",
    "name": "ネイサン",
    "tags": ["giji", "market", "middle"]
  }, {
    "_id": "c82",
    "order": 148,
    "face_id": "c82",
    "name": "ロビン",
    "tags": ["giji", "servant", "kid"]
  }, {
    "_id": "c94",
    "face_id": "c94",
    "name": "ダーラ",
    "comment": "2011/12/11",
    "order": 165,
    "tags": ["giji", "elegant", "immoral", "market", "middle"]
  }, {
    "_id": "c64",
    "order": 180,
    "face_id": "c64",
    "name": "ヘクター",
    "tags": ["giji", "immoral", "middle"]
  }, {
    "_id": "c81",
    "order": 190,
    "face_id": "c81",
    "name": "サイラス",
    "tags": ["giji", "medical", "guild", "farm", "young"]
  }, {
    "_id": "c67",
    "order": 200,
    "face_id": "c67",
    "name": "ソフィア",
    "tags": ["giji", "guild", "young"]
  }, {
    "_id": "c76",
    "order": 210,
    "face_id": "c76",
    "name": "ジョージ",
    "tags": ["giji", "apartment", "kid"]
  }, {
    "_id": "c60",
    "order": 213,
    "face_id": "c60",
    "name": "ポーチュラカ",
    "tags": ["giji", "elegant", "kid"]
  }, {
    "_id": "c87",
    "face_id": "c87",
    "name": "エリアス",
    "order": 217,
    "comment": "2011/12/05",
    "tags": ["giji", "elegant", "medical", "young"]
  }, {
    "_id": "c45",
    "order": 220,
    "face_id": "c45",
    "name": "プリシラ",
    "tags": ["giji", "immoral", "young"]
  }, {
    "_id": "c48",
    "order": 225,
    "face_id": "c48",
    "name": "ビアンカ",
    "tags": ["giji", "elegant", "middle", "elder"]
  }, {
    "_id": "c86",
    "face_id": "c86",
    "name": "ホレーショー",
    "order": 230,
    "comment": "2011/12/05",
    "tags": ["giji", "immoral", "apartment", "middle"]
  }, {
    "_id": "c83",
    "order": 240,
    "face_id": "c83",
    "name": "アイリス",
    "tags": ["marchen", "giji", "road", "medical", "market", "young"]
  }, {
    "_id": "c31",
    "order": 250,
    "face_id": "c31",
    "name": "ネル",
    "tags": ["giji", "guild", "apartment", "young"]
  }, {
    "_id": "c99",
    "order": 999,
    "face_id": "c99",
    "name": "サイモン",
    "tags": ["giji", "apartment", "young", "middle"]
  }, {
    "order": 10001,
    "face_id": "g01",
    "name": "露蝶",
    "comment": "中国女性名",
    "_id": "g01",
    "tags": ["asia"]
  }, {
    "order": 215,
    "face_id": "g02",
    "name": "志偉",
    "comment": "台湾男性名 越南の名前も探したかったが、見つからぬ…",
    "_id": "g02",
    "tags": ["asia"]
  }, {
    "order": 10003,
    "face_id": "g03",
    "name": "芙蓉",
    "comment": "里帰り",
    "_id": "g03",
    "tags": ["asia"]
  }, {
    "order": 10004,
    "face_id": "gc61",
    "name": "沼太郎",
    "comment": "里帰り",
    "_id": "gc61",
    "tags": ["asia"]
  }, {
    "name": "デメテル",
    "face_id": "mad01",
    "comment": "阿片窟からきました",
    "order": 20001,
    "_id": "mad01",
    "tags": ["marchen"]
  }, {
    "name": "エルゴット",
    "face_id": "mad02",
    "comment": "阿片窟からきました",
    "order": 245,
    "_id": "mad02",
    "tags": ["marchen"]
  }, {
    "name": "シーシャ",
    "face_id": "mad03",
    "comment": "阿片窟からきました",
    "order": 223,
    "_id": "mad03",
    "tags": ["marchen"]
  }, {
    "name": "ドリベル",
    "face_id": "mad04",
    "comment": "阿片窟からきました",
    "order": 20004,
    "_id": "mad04",
    "tags": ["marchen"]
  }, {
    "name": "ヤヘイ",
    "face_id": "mad05",
    "comment": "阿片窟からきました",
    "order": 1010,
    "_id": "mad05",
    "tags": ["marchen"]
  }, {
    "name": "アヤワスカ",
    "face_id": "mad06",
    "comment": "阿片窟からきました",
    "order": 236,
    "_id": "mad06",
    "tags": ["marchen"]
  }, {
    "name": "チアキ",
    "face_id": "t01",
    "comment": "時をかける少女",
    "order": 30001,
    "_id": "t01",
    "tags": ["travel"]
  }, {
    "name": "リッキィ",
    "face_id": "t02",
    "comment": "夏への扉",
    "order": 30002,
    "_id": "t02",
    "tags": ["travel"]
  }, {
    "name": "ミナカタ",
    "face_id": "t03",
    "comment": "ー仁ー",
    "order": 156,
    "_id": "t03",
    "tags": ["travel"]
  }, {
    "name": "カイル",
    "face_id": "t04",
    "comment": "サラ・コナー・クロニクルズ",
    "order": 30004,
    "_id": "t04",
    "tags": ["travel"]
  }, {
    "name": "ジェニファー",
    "face_id": "t05",
    "comment": "バック・トゥ・ザ・フューチャー",
    "order": 30005,
    "_id": "t05",
    "tags": ["travel"]
  }, {
    "_id": "m99",
    "order": 70001,
    "face_id": "m99",
    "name": "パルック",
    "tags": ["myth"]
  }, {
    "_id": "m06",
    "order": 70002,
    "face_id": "m06",
    "name": "リリンラ",
    "tags": ["myth"]
  }, {
    "_id": "m03",
    "order": 70003,
    "face_id": "m03",
    "name": "トノサマ",
    "tags": ["myth"]
  }, {
    "_id": "m05",
    "order": 70004,
    "face_id": "m05",
    "name": "ナナコロ",
    "tags": ["myth"]
  }, {
    "_id": "m15",
    "order": 70005,
    "face_id": "m15",
    "name": "ミソチャ",
    "tags": ["myth"]
  }, {
    "_id": "m07",
    "order": 70006,
    "face_id": "m07",
    "name": "アリス",
    "tags": ["myth"]
  }, {
    "_id": "r30",
    "order": 70006,
    "face_id": "r30",
    "name": "トリ",
    "tags": ["myth"]
  }, {
    "_id": "m01",
    "order": 70007,
    "face_id": "m01",
    "name": "ケムシ",
    "tags": ["myth"]
  }, {
    "_id": "m02",
    "order": 70008,
    "face_id": "m02",
    "name": "ポプラ",
    "tags": ["myth"]
  }, {
    "_id": "m04",
    "order": 70009,
    "face_id": "m04",
    "name": "アオイ",
    "tags": ["myth"]
  }, {
    "_id": "b44",
    "comment": "",
    "face_id": "b44",
    "name": "ドナルド",
    "order": 70010,
    "tags": ["myth"]
  }, {
    "_id": "m08",
    "order": 70011,
    "face_id": "m08",
    "name": "おっぱい",
    "tags": ["myth"]
  }, {
    "_id": "m09",
    "order": 70012,
    "face_id": "m09",
    "name": "カミジャー",
    "tags": ["myth"]
  }, {
    "_id": "r12",
    "order": 70012,
    "face_id": "r12",
    "name": "バーナバス",
    "tags": ["myth"]
  }, {
    "_id": "b49",
    "comment": "",
    "face_id": "b49",
    "name": "ボリス",
    "order": 70012,
    "tags": ["myth"]
  }, {
    "_id": "m10",
    "order": 70013,
    "face_id": "m10",
    "name": "アチャポ",
    "tags": ["myth"]
  }, {
    "_id": "m12",
    "comment": "",
    "face_id": "m12",
    "name": "トルニトス",
    "order": 70014,
    "tags": ["myth"]
  }, {
    "_id": "m11",
    "order": 70015,
    "face_id": "m11",
    "name": "ライトニング",
    "tags": ["myth"]
  }, {
    "_id": "m13",
    "order": 70016,
    "face_id": "m13",
    "name": "ミケ",
    "tags": ["myth"]
  }, {
    "_id": "m14",
    "order": 70017,
    "face_id": "m14",
    "name": "カリュクス",
    "tags": ["myth"]
  }, {
    "_id": "sf01",
    "order": 80000,
    "face_id": "sf01",
    "name": "ラッシード",
    "comment": "りしあさん＆かれやなぎさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf02",
    "order": 80001,
    "face_id": "sf02",
    "name": "エスペラント",
    "comment": "ふらぅさん＆かれやなぎさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf03",
    "order": 80002,
    "face_id": "sf03",
    "name": "ピート",
    "comment": "たるっとさん＆りちゃさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf04",
    "order": 80003,
    "face_id": "sf04",
    "name": "アシモフ",
    "comment": "あすたん＆りりんら",
    "tags": ["stratos"]
  }, {
    "_id": "sf05",
    "order": 80004,
    "face_id": "sf05",
    "name": "モナリザ",
    "comment": "ななころび＆りりんら",
    "tags": ["stratos"]
  }, {
    "_id": "sf06",
    "order": 80005,
    "face_id": "sf06",
    "name": "ワレンチナ",
    "comment": "まりもさん＆あずまさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf07",
    "order": 80007,
    "face_id": "sf07",
    "name": "ヤンファ",
    "comment": "りしあさん＆はむおくん",
    "tags": ["stratos"]
  }, {
    "_id": "sf08",
    "order": 80008,
    "face_id": "sf08",
    "name": "ＰＪ",
    "comment": "りしあさん＆ふらぅさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf09",
    "order": 80009,
    "face_id": "sf09",
    "name": "キリシマ",
    "comment": "ななころび＆ふらぅさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf10",
    "order": 80010,
    "face_id": "sf10",
    "name": "ナユタ",
    "comment": "かれやなぎさん＆かいさん",
    "tags": ["stratos"]
  }, {
    "_id": "sf11",
    "order": 80011,
    "face_id": "sf11",
    "name": "イワノフ",
    "comment": "かれやなぎさん＆りちゃさん",
    "tags": ["stratos"]
  }, {
    "order": 80012,
    "face_id": "sf12",
    "name": "†ルシフェル†",
    "comment": null,
    "_id": "sf12",
    "tags": ["stratos"]
  }, {
    "order": 80013,
    "face_id": "sf13",
    "name": "トルドヴィン",
    "comment": null,
    "_id": "sf13",
    "tags": ["stratos"]
  }, {
    "order": 80014,
    "face_id": "sf18",
    "name": "玖休",
    "comment": null,
    "_id": "sf18",
    "tags": ["stratos"]
  }, {
    "order": 80015,
    "face_id": "sf19",
    "name": "参休",
    "comment": null,
    "_id": "sf19",
    "tags": ["stratos"]
  }, {
    "order": 80016,
    "face_id": "sf14",
    "name": "クリスマス",
    "comment": null,
    "_id": "sf14",
    "tags": ["stratos"]
  }, {
    "order": 80017,
    "face_id": "sf15",
    "name": "ジェームス",
    "comment": null,
    "_id": "sf15",
    "tags": ["stratos"]
  }, {
    "order": 80018,
    "face_id": "sf16",
    "name": "ライジ",
    "comment": null,
    "_id": "sf16",
    "tags": ["stratos"]
  }, {
    "order": 80019,
    "face_id": "sf17",
    "name": "ジャック",
    "comment": null,
    "_id": "sf17",
    "tags": ["stratos"]
  }, {
    "_id": "w05",
    "order": 90001,
    "face_id": "w05",
    "name": "定吉",
    "comment": "ぷえるとりこの旅人　エージ―エー",
    "tags": ["shoji"]
  }, {
    "_id": "w21",
    "order": 90002,
    "face_id": "w21",
    "name": "鉄平",
    "comment": "日本の伝統　熊木彫",
    "tags": ["shoji"]
  }, {
    "_id": "w22",
    "order": 90003,
    "face_id": "w22",
    "name": "竹三",
    "comment": "雪国の風雅　熊木彫",
    "tags": ["shoji"]
  }, {
    "_id": "w36",
    "order": 90004,
    "face_id": "w36",
    "name": "ウト",
    "tags": ["shoji"]
  }, {
    "_id": "w16",
    "order": 90005,
    "face_id": "w16",
    "name": "勢",
    "comment": "ぶたさん印の　あおいジンギスカン",
    "tags": ["shoji"]
  }, {
    "_id": "w18",
    "order": 90006,
    "face_id": "w18",
    "name": "菊",
    "tags": ["shoji"]
  }, {
    "_id": "w26",
    "order": 90007,
    "face_id": "w26",
    "name": "勝丸",
    "tags": ["shoji"]
  }, {
    "_id": "w35",
    "comment": "",
    "face_id": "w35",
    "name": "奈須麿",
    "order": 90008,
    "tags": ["shoji"]
  }, {
    "_id": "w24",
    "order": 90009,
    "face_id": "w24",
    "name": "辰次",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業",
    "tags": ["shoji"]
  }, {
    "_id": "w37",
    "order": 90010,
    "face_id": "w37",
    "name": "芙蓉",
    "tags": ["shoji"]
  }, {
    "_id": "w29",
    "order": 90011,
    "face_id": "w29",
    "name": "志乃",
    "tags": ["shoji"]
  }, {
    "_id": "w20",
    "order": 90012,
    "face_id": "w20",
    "name": "藤之助",
    "tags": ["shoji"]
  }, {
    "_id": "w31",
    "order": 90013,
    "face_id": "w31",
    "name": "日向",
    "tags": ["shoji"]
  }, {
    "_id": "w12",
    "order": 90014,
    "face_id": "w12",
    "name": "おみつ",
    "comment": "道を外して60年　GEDOU協会",
    "tags": ["shoji"]
  }, {
    "_id": "w10",
    "order": 90015,
    "face_id": "w10",
    "name": "博史",
    "tags": ["shoji"]
  }, {
    "_id": "w25",
    "order": 90016,
    "face_id": "w25",
    "name": "法泉",
    "tags": ["shoji"]
  }, {
    "_id": "w09",
    "order": 90017,
    "face_id": "w09",
    "name": "チャールズ",
    "comment": "チャールズ派遣ならおまかせ　O-ririn",
    "tags": ["shoji"]
  }, {
    "_id": "w30",
    "order": 90018,
    "face_id": "w30",
    "name": "雪代",
    "tags": ["shoji"]
  }, {
    "_id": "w14",
    "order": 90019,
    "face_id": "w14",
    "name": "華月斎",
    "comment": "めげないゼラチン作り　MEGEゼラチン",
    "tags": ["shoji"]
  }, {
    "_id": "w13",
    "order": 90020,
    "face_id": "w13",
    "name": "たまこ",
    "comment": "世界の道をつなぐ　議事国地図",
    "tags": ["shoji"]
  }, {
    "_id": "w11",
    "order": 90021,
    "face_id": "w11",
    "name": "沼太郎",
    "tags": ["shoji"]
  }, {
    "_id": "w03",
    "order": 90022,
    "face_id": "w03",
    "name": "朔",
    "comment": "新しい議事をつくる　たき学会",
    "tags": ["shoji"]
  }, {
    "_id": "w34",
    "order": 90023,
    "face_id": "w34",
    "name": "余四朗",
    "tags": ["shoji"]
  }, {
    "_id": "w27",
    "order": 90024,
    "face_id": "w27",
    "name": "源蔵",
    "tags": ["shoji"]
  }, {
    "_id": "w28",
    "order": 90025,
    "face_id": "w28",
    "name": "甚六",
    "tags": ["shoji"]
  }, {
    "_id": "w17",
    "order": 90026,
    "face_id": "w17",
    "name": "雷門",
    "comment": "輝く月に未来を託す　暁月商事",
    "tags": ["shoji"]
  }, {
    "_id": "w39",
    "comment": "",
    "face_id": "w39",
    "name": "沙耶",
    "order": 90027,
    "tags": ["shoji"]
  }, {
    "_id": "w08",
    "order": 90028,
    "face_id": "w08",
    "name": "朝顔",
    "tags": ["shoji"]
  }, {
    "_id": "w43",
    "order": 90029,
    "face_id": "w43",
    "name": "春松",
    "tags": ["shoji"]
  }, {
    "_id": "w07",
    "order": 90030,
    "face_id": "w07",
    "name": "夕顔",
    "tags": ["shoji"]
  }, {
    "_id": "w40",
    "order": 90031,
    "face_id": "w40",
    "name": "朧",
    "tags": ["shoji"]
  }, {
    "_id": "w33",
    "comment": "",
    "face_id": "w33",
    "name": "団十郎",
    "order": 90032,
    "tags": ["shoji"]
  }, {
    "_id": "w23",
    "order": 90033,
    "face_id": "w23",
    "name": "仁右衛門",
    "tags": ["shoji"]
  }, {
    "_id": "w04",
    "order": 90034,
    "face_id": "w04",
    "name": "小鈴",
    "comment": "お口の愛人　タルッティ・タルット",
    "tags": ["shoji"]
  }, {
    "_id": "w06",
    "order": 90035,
    "face_id": "w06",
    "name": "ゆり",
    "comment": "道を外して60年　GEDOU協会",
    "tags": ["shoji"]
  }, {
    "_id": "w38",
    "comment": "",
    "face_id": "w38",
    "name": "一平太",
    "order": 90037,
    "tags": ["shoji"]
  }, {
    "_id": "w01",
    "order": 90038,
    "face_id": "w01",
    "name": "鏡花",
    "comment": "輝く月に未来を託す　暁月商事",
    "tags": ["shoji"]
  }, {
    "_id": "w15",
    "order": 90039,
    "face_id": "w15",
    "name": "八重",
    "comment": "桃源郷ぐた国のめぐみ　ふらう乳業",
    "tags": ["shoji"]
  }, {
    "_id": "w32",
    "order": 90040,
    "face_id": "w32",
    "name": "明之進",
    "tags": ["shoji"]
  }, {
    "_id": "w02",
    "order": 90041,
    "face_id": "w02",
    "name": "慶三郎",
    "comment": "カメラのことなら　MISEKI",
    "tags": ["shoji"]
  }, {
    "_id": "w44",
    "face_id": "w44",
    "name": "雪客",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90042,
    "tags": ["shoji"]
  }, {
    "_id": "w45",
    "face_id": "w45",
    "name": "亀吉",
    "comment": "りりんラハウス呑んだくれ大会",
    "order": 90043,
    "tags": ["shoji"]
  }, {
    "_id": "w46",
    "face_id": "w46",
    "name": "梅子",
    "order": 90044,
    "comment": "お誕生日記念☆",
    "tags": ["shoji"]
  }, {
    "face_id": "w47",
    "name": "置壱",
    "comment": "日本の美徳強化月間",
    "order": 90045,
    "_id": "w47",
    "tags": ["shoji"]
  }, {
    "face_id": "all",
    "name": "パルック",
    "order": 99999,
    "_id": "all",
    "tags": ["god"]
  }, {
    "_id": "g04",
    "face_id": "g04",
    "name": "攻芸",
    "comment": "台湾男性名",
    "order": 10005,
    "tags": ["asia"]
  }, {
    "_id": "g05",
    "face_id": "g05",
    "name": "麻雀",
    "comment": "中国女性名",
    "order": 170,
    "tags": ["asia"]
  }, {
    "_id": "g06",
    "face_id": "g06",
    "name": "黍炉",
    "comment": "ダリダイ・オッチギン",
    "order": 10007,
    "tags": ["asia"]
  }, {
    "_id": "mad07",
    "face_id": "mad07",
    "name": "ダイミ",
    "comment": "阿片窟からきました",
    "order": 20007,
    "tags": ["marchen"]
  }, {
    "_id": "mad08",
    "face_id": "mad08",
    "name": "エフェドラ",
    "comment": "阿片窟からきました",
    "order": 20008,
    "tags": ["marchen"]
  }, {
    "_id": "t06",
    "face_id": "t06",
    "name": "サミュエル",
    "comment": "トランスフォーマー",
    "order": 30006,
    "tags": ["travel"]
  }, {
    "_id": "t07",
    "face_id": "t07",
    "name": "アカリ",
    "comment": "時をかける少女",
    "order": 30019,
    "tags": ["travel"]
  }, {
    "_id": "t08",
    "face_id": "t08",
    "name": "ミルフィ",
    "comment": "海賊戦隊ゴーカイジャー",
    "order": 30020,
    "tags": ["travel"]
  }, {
    "_id": "t09",
    "face_id": "t09",
    "name": "ゴロウ",
    "comment": "時をかける少女",
    "order": 30009,
    "tags": ["travel"]
  }, {
    "_id": "t10",
    "face_id": "t10",
    "name": "トレイル",
    "comment": "ゼルダの伝説 ムジュラの仮面",
    "order": 30010,
    "tags": ["travel"]
  }, {
    "_id": "t11",
    "face_id": "t11",
    "name": "マドカ",
    "comment": "宇宙戦艦ヤマモト・ヨーコ",
    "order": 30019,
    "tags": ["travel"]
  }, {
    "_id": "t12",
    "face_id": "t12",
    "name": "フランク",
    "comment": "オーロラの彼方へ",
    "order": 30012,
    "tags": ["travel"]
  }, {
    "_id": "t13",
    "face_id": "t13",
    "name": "ジャニス",
    "comment": "フラッシュフォワード",
    "order": 30013,
    "tags": ["travel"]
  }, {
    "_id": "c105",
    "comment": "年末カウントダウン♪",
    "name": "シメオン",
    "face_id": "c105",
    "order": 82,
    "tags": ["giji", "apartment", "ecclesia", "young"]
  }, {
    "_id": "c104",
    "comment": "年末カウントダウン♪",
    "name": "ヒュー",
    "face_id": "c104",
    "order": 89,
    "tags": ["giji", "medical", "young"]
  }, {
    "_id": "c106",
    "comment": "年末カウントダウン♪",
    "face_id": "c106",
    "name": "ワンダ",
    "order": 90,
    "tags": ["giji", "river", "guild", "middle"]
  }, {
    "_id": "c108",
    "face_id": "c108",
    "name": "ブローリン",
    "comment": "年末カウントダウン♪",
    "order": 91,
    "tags": ["giji", "farm", "young", "middle"]
  }, {
    "_id": "c109",
    "face_id": "c109",
    "name": "ラディスラヴァ",
    "comment": "年末カウントダウン♪",
    "order": 185,
    "tags": ["giji", "apartment", "young"]
  }, {
    "_id": "c102",
    "comment": "年末カウントダウン♪",
    "face_id": "c102",
    "name": "ウォーレン",
    "order": 155,
    "tags": ["giji", "market", "elder"]
  }, {
    "_id": "c107",
    "face_id": "c107",
    "name": "イヴォン",
    "comment": "年末カウントダウン♪",
    "order": 205,
    "tags": ["giji", "elegant", "middle", "elder"]
  }, {
    "_id": "c103",
    "comment": "年末カウントダウン♪",
    "name": "ナンシー",
    "face_id": "c103",
    "order": 234,
    "tags": ["giji", "apartment", "young"]
  }, {
    "_id": "t14",
    "face_id": "t14",
    "name": "クシャミ",
    "comment": "吾輩は猫である。",
    "order": 30014,
    "tags": ["travel"]
  }, {
    "_id": "t15",
    "face_id": "t15",
    "name": "ガーディ",
    "comment": "ベイカー街少年探偵団",
    "order": 30015,
    "tags": ["travel"]
  }, {
    "_id": "sf20",
    "face_id": "sf20",
    "name": "ティソ",
    "comment": null,
    "order": 80020,
    "tags": ["stratos"]
  }, {
    "_id": "g07",
    "face_id": "g07",
    "name": "ジリヤ",
    "comment": "ロシア女性名",
    "order": 10008,
    "tags": ["asia"]
  }, {
    "_id": "t16",
    "face_id": "t16",
    "name": "アラン",
    "comment": "映画監督たちの共用偽名",
    "order": 30016,
    "tags": ["travel"]
  }, {
    "_id": "w48",
    "face_id": "w48",
    "name": "直円",
    "comment": "和算復活月間",
    "order": 90048,
    "tags": ["shoji"]
  }, {
    "_id": "w49",
    "face_id": "w49",
    "name": "錠",
    "comment": "ポルトガル人にジオゴっているんだぜ。へー。かっこいー。",
    "order": 90049,
    "tags": ["shoji"]
  }, {
    "_id": "w50",
    "face_id": "w50",
    "name": "丁助",
    "comment": "負けるたびに追い博打",
    "order": 90050,
    "tags": ["shoji"]
  }, {
    "_id": "t17",
    "face_id": "t17",
    "name": "ススム",
    "comment": "おもいっきり探偵団 覇悪怒組",
    "order": 30018,
    "tags": ["travel"]
  }, {
    "_id": "t18",
    "face_id": "t18",
    "name": "マユミ",
    "comment": "まんがはじめて物語（二代目）",
    "order": 30018,
    "tags": ["travel"]
  }, {
    "_id": "c110",
    "face_id": "c110",
    "name": "リー",
    "comment": "",
    "order": 92,
    "tags": ["giji", "immoral", "apartment", "young"]
  }, {
    "_id": "t19",
    "face_id": "t19",
    "name": "ハルカ",
    "comment": "はるかリフレイン",
    "order": 30017,
    "tags": ["travel"]
  }, {
    "_id": "w51",
    "face_id": "w51",
    "name": "鬼丞",
    "comment": "リニューアル記念！",
    "order": 90051,
    "tags": ["shoji"]
  }, {
    "_id": "w52",
    "face_id": "w52",
    "name": "櫻子",
    "comment": "リニューアル記念！",
    "order": 90052,
    "tags": ["shoji"]
  }, {
    "_id": "c111",
    "face_id": "c111",
    "name": "スージー",
    "comment": "リニューアル記念！ 弟がいるという噂が…",
    "order": 160,
    "tags": ["giji", "apartment", "elegant", "immoral", "young"]
  }, {
    "_id": "c113",
    "face_id": "c113",
    "name": "ジェレミー",
    "comment": "リニューアル記念！",
    "order": 228,
    "tags": ["giji", "apartment", "immoral", "young", "middle"]
  }, {
    "_id": "c112",
    "face_id": "c112",
    "name": "ニコラス",
    "comment": "！？",
    "order": 128,
    "tags": ["giji", "elegant", "young"]
  }, {
    "_id": "m16",
    "face_id": "m16",
    "name": "アーサー",
    "comment": "円卓の騎士",
    "order": 70018,
    "tags": ["myth"]
  }, {
    "_id": "t20",
    "face_id": "t20",
    "name": "エリ",
    "comment": "英国情報局秘密組織チェラブ (CHERUB)",
    "order": 30022,
    "tags": ["travel"]
  }, {
    "_id": "g08",
    "face_id": "g08",
    "name": "イワン",
    "comment": "Иван-дурак",
    "order": 10009,
    "tags": ["asia"]
  }, {
    "_id": "c114",
    "face_id": "c114",
    "name": "モンド",
    "comment": "８８件のご応募、ありがとう。そして、ありがとう。",
    "order": 131,
    "tags": ["giji", "government", "immoral", "middle"]
  }, {
    "_id": "m18",
    "face_id": "m18",
    "name": "ミーム",
    "comment": "インターネット・ミームから。 えんいー",
    "order": 70020,
    "tags": ["myth"]
  }, {
    "_id": "m19",
    "face_id": "m19",
    "name": "タルト",
    "comment": "https://twitter.com/7korobi/status/510069062974447617",
    "order": 70021,
    "tags": ["myth"]
  }, {
    "_id": "m20",
    "face_id": "m20",
    "name": "ショコラ",
    "comment": "https://twitter.com/noa_marimo/status/510100541536358400",
    "order": 70022,
    "tags": ["myth"]
  }, {
    "_id": "c115",
    "face_id": "c115",
    "name": "マリオ",
    "comment": "じつは、牧場育ちらしいよ。",
    "order": 132,
    "tags": ["giji", "guild", "road", "kid"]
  }, {
    "_id": "t21",
    "face_id": "t21",
    "name": "トシミ",
    "comment": "代紋TAKE2",
    "order": 30019,
    "tags": ["travel"]
  }, {
    "_id": "t22",
    "face_id": "t22",
    "name": "ケイイチ",
    "comment": "ひぐらしのなく頃に",
    "order": 30021,
    "tags": ["travel"]
  }, {
    "_id": "w53",
    "face_id": "w53",
    "name": "おもん",
    "comment": "三拾糎程の「もふもふねこひよこ」　せんいち",
    "order": 90053,
    "tags": ["shoji"]
  }, {
    "_id": "sf021",
    "face_id": "sf021",
    "name": "アンタレス",
    "comment": "",
    "order": 80022,
    "tags": ["stratos"]
  }, {
    "_id": "sf023",
    "face_id": "sf023",
    "name": "エフ",
    "comment": "",
    "order": 80023,
    "tags": ["stratos"]
  }, {
    "_id": "sf024",
    "face_id": "sf024",
    "name": "アイライト",
    "comment": "",
    "order": 80024,
    "tags": ["stratos"]
  }, {
    "_id": "sf025",
    "face_id": "sf025",
    "name": "アマルテア",
    "comment": "",
    "order": 80006,
    "tags": ["stratos"]
  }, {
    "_id": "sf026",
    "face_id": "sf026",
    "name": "ポーラ",
    "comment": "",
    "order": 80026,
    "tags": ["stratos"]
  }, {
    "_id": "sf022",
    "face_id": "sf022",
    "name": "チェビイ",
    "comment": "",
    "order": 80027,
    "tags": ["stratos"]
  }, {
    "_id": "sf027",
    "face_id": "sf027",
    "name": "モスキート",
    "comment": "",
    "order": 80028,
    "tags": ["stratos"]
  }, {
    "_id": "sf032",
    "face_id": "sf032",
    "name": "ワクラバ",
    "comment": "",
    "order": 80029,
    "tags": ["stratos"]
  }, {
    "_id": "sf028",
    "face_id": "sf028",
    "name": "コータ",
    "comment": "",
    "order": 80030,
    "tags": ["stratos"]
  }, {
    "_id": "sf029",
    "face_id": "sf029",
    "name": "ミツボシ",
    "comment": "",
    "order": 80031,
    "tags": ["stratos"]
  }, {
    "_id": "sf030",
    "face_id": "sf030",
    "name": "クレパスキュール",
    "comment": "",
    "order": 80032,
    "tags": ["stratos"]
  }, {
    "_id": "sf031",
    "face_id": "sf031",
    "name": "シルク",
    "comment": "",
    "order": 80033,
    "tags": ["stratos"]
  }, {
    "_id": "t23",
    "face_id": "t23",
    "name": "ナナオ",
    "comment": "",
    "order": 30023,
    "tags": ["travel"]
  }, {
    "_id": "t24",
    "face_id": "t24",
    "name": "キルロイ",
    "comment": "「キルロイここに現る」",
    "order": 30024,
    "tags": ["travel"]
  }, {
    "_id": "t25",
    "face_id": "t25",
    "name": "ミサキ",
    "comment": "",
    "order": 30025,
    "tags": ["travel"]
  }, {
    "_id": "t26",
    "face_id": "t26",
    "name": "アツタネ",
    "comment": "平田篤胤",
    "order": 30026,
    "tags": ["travel"]
  }, {
    "_id": "t27",
    "face_id": "t27",
    "name": "みょんこ",
    "comment": "",
    "order": 30027,
    "tags": ["travel"]
  }, {
    "_id": "t28",
    "face_id": "t28",
    "name": "リツ",
    "comment": "",
    "order": 30028,
    "tags": ["travel"]
  }, {
    "_id": "t29",
    "face_id": "t29",
    "name": "ヒナコ",
    "comment": "",
    "order": 30020,
    "tags": ["travel"]
  }, {
    "_id": "t30",
    "face_id": "t30",
    "name": "ワタヌキ",
    "comment": "四月朔日",
    "order": 30030,
    "tags": ["travel"]
  }, {
    "_id": "t31",
    "face_id": "t31",
    "name": "ホウイチ",
    "comment": "",
    "order": 158,
    "tags": ["travel"]
  }, {
    "_id": "t32",
    "face_id": "t32",
    "name": "トヨタ",
    "comment": "洋画の日本人名",
    "order": 30032,
    "tags": ["travel"]
  }, {
    "_id": "t33",
    "face_id": "t33",
    "name": "エツコ",
    "comment": "",
    "order": 30033,
    "tags": ["travel"]
  }, {
    "_id": "t34",
    "face_id": "t34",
    "name": "ドン",
    "comment": "",
    "order": 17,
    "tags": ["travel"]
  }, {
    "_id": "c116",
    "face_id": "c116",
    "name": "メルヤ",
    "comment": "",
    "order": 116,
    "tags": ["giji", "medical", "immoral", "young"]
  }, {
    "_id": "c117",
    "face_id": "c117",
    "name": "ルパート",
    "comment": "",
    "order": 135,
    "tags": ["giji", "road", "guild", "elder"]
  }, {
    "_id": "c118",
    "face_id": "c118",
    "name": "ユージン",
    "comment": "",
    "order": 118,
    "tags": ["giji", "river", "young", "middle"]
  }, {
    "_id": "c119",
    "face_id": "c119",
    "name": "オーレリア",
    "comment": "",
    "order": 119,
    "tags": ["giji", "ecclesia", "young"]
  }, {
    "_id": "c120",
    "face_id": "c120",
    "name": "ノア",
    "comment": "",
    "order": 120,
    "tags": ["giji", "servant", "young", "middle"]
  }, {
    "_id": "t35",
    "face_id": "t35",
    "name": "イスルギ",
    "comment": "",
    "order": 30020,
    "tags": ["travel"]
  }, {
    "_id": "c121",
    "face_id": "c121",
    "name": "ブッカ",
    "comment": "ブッカ・ホワイト氏から。",
    "order": 121,
    "tags": ["giji", "farm"]
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "ger",
    "admin": "闇の呟き",
    "maker": "馬頭琴の調",
    "caption": "エクスパンション・セット「大陸議事」",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「大陸議事」",
    "csid": "ger",
    "face_id": "g03",
    "say_0": "まさか……これは……？<br><br>真相が分かったわ！<br>日が出たらすぐ、麓の皆に知らせないと！",
    "say_1": "飛車が…壊れてる……<br>葛橋が…焼けてる……<br><br>！　なんだ、猫か……。おどかさないでよ。<br>ん？",
    "_id": "ger_g03",
    "chr_set_id": "ger"
  }
]);

Cache.rule.chr_job.merge([
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

Cache.rule.chr_set.merge([
  {
    "_id": "mad",
    "admin": "闇の呟き",
    "maker": "天上の調べ",
    "caption": "エクスパンション・セット「狂騒議事」",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「狂騒議事」",
    "csid": "mad",
    "face_id": "c83",
    "say_0": "どうせ、殺されるわみんな。…みんな<br><br><br>/* 死ねばいいのに */",
    "say_1": "１人になるのゎ私ばっか。どっちの道ぉ選んでも、<br>私ゎ十分です。明日も待っててね。お願いだから、<br>離れて行かないで？<br>いつまでも、<br>なんで私ばっか<br><br><b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>",
    "_id": "mad_c83",
    "chr_set_id": "mad"
  }
]);

Cache.rule.chr_job.merge([
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

Cache.rule.chr_set.merge([
  {
    "_id": "school",
    "admin": "校内放送",
    "maker": "校内放送",
    "caption": "私立七転学園",
    "chr_set_id": "school"
  }
]);

Cache.rule.chr_npc.merge([
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

Cache.rule.chr_job.merge([
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

Cache.rule.chr_set.merge([
  {
    "_id": "sf",
    "admin": "黒体放射のエヴェレット解釈",
    "maker": "重ね合せ猫のユニタリ変換",
    "caption": "明後日への道標",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "明後日への道標",
    "csid": "SF",
    "face_id": "sf04",
    "say_0": "とたたたたんっ。<br><br><b>めざましい速さで木の洞に駆け込むと、じっと潜んだ暗闇に瞳がふたつ。<br>いちど大好きな閉所に収まると、そうかんたんに出てはこないのだ。</b> ",
    "say_1": "ちゅー！<br><br>　ちゅー！<br><br><b>がりがり、がりがり。ケージの縁をひっかくと、うろうろ、うろうろ右へ左へ駆け回る。木の洞に目もくれず、夜中じゅう走り続けるのだった……</b> ",
    "_id": "sf_sf04",
    "chr_set_id": "sf"
  }, {
    "caption": "明後日への道標（ナユタ）",
    "csid": "SF_sf10",
    "face_id": "sf10",
    "say_0": "f*ck！またチオチモリンと二酸化炭素分圧だし！<br>エアコンがコンタミるしスタグるしf*ck'nオーロラの季節だし、ガルタイトもサクラダイトもf*ck'n高っけーし…<br><br><b>同日 整備日誌<br>　定期点検。ただちに健康に影響はないが、擦過痕…</b>",
    "say_1": "よーf*ck'nおまえら。<br>マジ聞け。エヴァってでかい１０円キズ見つけた。誰だし？<br>マジ怒んねーから手ぇ挙げ<br><br><b>ぷつん</b><br><br>っと。瞬停った…。f*ck。<br>ちょっと外の様子見てくる。俺のプリン残しといてくれよ。<br>",
    "_id": "sf_sf10",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_job.merge([
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
  }, {
    "face_id": "sf021",
    "job": "星間帆走",
    "_id": "sf_sf021",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf022",
    "job": "鉱滓地区",
    "_id": "sf_sf022",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf023",
    "job": "地下軌道",
    "_id": "sf_sf023",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf024",
    "job": "光彩楽団",
    "_id": "sf_sf024",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf025",
    "job": "救星隊",
    "_id": "sf_sf025",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf026",
    "job": "星先案内",
    "_id": "sf_sf026",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf027",
    "job": "鉱滓皇帝",
    "_id": "sf_sf027",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf028",
    "job": "溶接技師",
    "_id": "sf_sf028",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf029",
    "job": "機巧忍軍",
    "_id": "sf_sf029",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf030",
    "job": "閉鎖管理",
    "_id": "sf_sf030",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf031",
    "job": "意匠造形",
    "_id": "sf_sf031",
    "chr_set_id": "sf"
  }, {
    "face_id": "sf032",
    "job": "鉱滓地区",
    "_id": "sf_sf032",
    "chr_set_id": "sf"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "time",
    "admin": "第四の壁の深奥",
    "maker": "次元X式コンピューター",
    "caption": "エクスパンション・セット「帰還者議事」",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "エクスパンション・セット「帰還者議事」",
    "csid": "time",
    "face_id": "c10",
    "say_0": "M4ライフルを持ってさえいれば…、なーんて、思っててもしょうがないね。鍵かけとこう。",
    "say_1": "やっぱさ、銃を持った善人がいないとさ。<br><br>ちょっと出かけてくる！プリン食べちゃダメだよ！",
    "_id": "time_c10",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_job.merge([
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
  }, {
    "face_id": "t21",
    "job": "九未知会",
    "_id": "time_t21",
    "chr_set_id": "time"
  }, {
    "face_id": "t22",
    "job": "学園特警",
    "_id": "time_t22",
    "chr_set_id": "time"
  }, {
    "face_id": "t23",
    "job": "孤高天使連合",
    "_id": "time_t23",
    "chr_set_id": "time"
  }, {
    "face_id": "t24",
    "job": "トレーサー",
    "_id": "time_t24",
    "chr_set_id": "time"
  }, {
    "face_id": "t25",
    "job": "2.14革命機構",
    "_id": "time_t25",
    "chr_set_id": "time"
  }, {
    "face_id": "t26",
    "job": "法隆寺",
    "_id": "time_t26",
    "chr_set_id": "time"
  }, {
    "face_id": "t27",
    "job": "硯友社",
    "_id": "time_t27",
    "chr_set_id": "time"
  }, {
    "face_id": "t28",
    "job": "樫の樹の子ら",
    "_id": "time_t28",
    "chr_set_id": "time"
  }, {
    "face_id": "t29",
    "job": "透明女子会",
    "_id": "time_t29",
    "chr_set_id": "time"
  }, {
    "face_id": "t30",
    "job": "旅団✡肘笠雨",
    "_id": "time_t30",
    "chr_set_id": "time"
  }, {
    "face_id": "t31",
    "job": "呵呵老会",
    "_id": "time_t31",
    "chr_set_id": "time"
  }, {
    "face_id": "t32",
    "job": "安全調査局",
    "_id": "time_t32",
    "chr_set_id": "time"
  }, {
    "face_id": "t33",
    "job": "亡命同盟",
    "_id": "time_t33",
    "chr_set_id": "time"
  }, {
    "face_id": "t34",
    "job": "大銃協会",
    "_id": "time_t34",
    "chr_set_id": "time"
  }, {
    "face_id": "t35",
    "job": "紅客連盟",
    "_id": "time_t35",
    "chr_set_id": "time"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "wa",
    "admin": "闇の呟き",
    "maker": "稲荷のお告げ",
    "caption": "和の国てやんでえ",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_npc.merge([
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

Cache.rule.chr_job.merge([
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
  }, {
    "face_id": "w53",
    "job": "旅籠",
    "_id": "wa_w53",
    "chr_set_id": "wa"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "ririnra",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "caption": "人狼議事",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_npc.merge([
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
    "say_0": "壁の向こうだ、やつの足音が聞こえる。いよいよ隣室に迫る。<br>明日は、もう……",
    "say_1": "足音が部屋の前で止まった。そして、ドアノブがゆっくりと回る音が聞こえる。振り向いてはいけない、振り向けば<br><br><b>日記はそこで途切れ、発見されるまで打ち捨てられていた。</b>",
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
    "say_0": "こんばんわ、こんな遅くにたいへんですね。<br><br>………<br>行っちゃった。へんなの。",
    "say_1": "まさかあの時、あのひとが……？<br>人殺しと一緒にいるなんて……！へや…、部屋に戻らせてもらいます！",
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
    "say_1": "……あの、わたし。この騒ぎが落ち着いたら此処を出たいんです。<br>幼馴染から手紙が来たの。お金を貯めたから、遠くで一緒に暮らそうって。",
    "_id": "ririnra_c51",
    "chr_set_id": "ririnra"
  }, {
    "_id": "ririnra_c20",
    "caption": "人狼議事（グロリア）",
    "csid": "ririnra_c20",
    "face_id": "c20",
    "say_0": "紳士ならびに淑女の皆様、わたくしの館へようこそ。<br>世間の噂など唯の噂話、此処でひととき御寛ぎなさいな。",
    "say_1": "ちょっと！そこの貴方、何をしているの！<br>聞いたでしょう人狼がいるのよ、はやく見つけて処刑なさい！",
    "chr_set_id": "ririnra"
  }, {
    "caption": "人狼議事（オスカー）",
    "csid": "ririnra_c32",
    "face_id": "c32",
    "say_0": "…そっちじゃないよ、こっちだよ。<br>ここ、秘密基地なんだ。雨もへいきだし暖かいよ。",
    "say_1": "ねえ。見て見て。パン持ってきたんだ。<br>みんなにはナイショだよ？",
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

Cache.rule.chr_job.merge([
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
  }, {
    "face_id": "c115",
    "job": "廃品回収",
    "_id": "ririnra_c115",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c116",
    "job": "逃亡者",
    "_id": "ririnra_c116",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c117",
    "job": "宿屋",
    "_id": "ririnra_c117",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c118",
    "job": "渡し船",
    "_id": "ririnra_c118",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c119",
    "job": "信徒",
    "_id": "ririnra_c119",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c120",
    "job": "庭師",
    "_id": "ririnra_c120",
    "chr_set_id": "ririnra"
  }, {
    "face_id": "c121",
    "job": "農薬売",
    "_id": "ririnra_c121",
    "chr_set_id": "ririnra"
  }
]);

Cache.rule.chr_set.merge([
  {
    "_id": "animal",
    "admin": "大地の震動",
    "maker": "草原のざわめき",
    "caption": "うきうきサバンナ",
    "chr_set_id": "animal"
  }
]);

Cache.rule.chr_npc.merge([
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

Cache.rule.chr_job.merge([
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

Cache.rule.chr_set.merge([
  {
    "_id": "changed",
    "admin": "闇の呟き",
    "maker": "広場のお告げ",
    "caption": "はおうの広場",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "とのさま広場",
    "csid": "changed",
    "face_id": "m08",
    "say_0": "じんろう？<br>そんななまえのこ、いたかしら……",
    "say_1": "さあ、ぼうやたちいらっしゃい。ごはんのじかんよ。",
    "_id": "changed_m08",
    "chr_set_id": "changed"
  }, {
    "_id": "changed_m05",
    "caption": "はおうの広場",
    "csid": "changed_m05",
    "face_id": "m05",
    "say_0": "ママ？ママなの？<br>…もう大丈夫なの？ここには人狼なんていないのかい？<br><br>…そっかあ…<br><br><br>人狼だって？！",
    "say_1": "誰にも、腰抜けなんて…言わせないぞっ",
    "chr_set_id": "changed"
  }
]);

Cache.rule.chr_job.merge([
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
    "face_id": "m18",
    "job": "記号の妖精",
    "_id": "changed_m18",
    "chr_set_id": "changed"
  }, {
    "face_id": "m19",
    "job": "おひめさま",
    "_id": "changed_m19",
    "chr_set_id": "changed"
  }, {
    "face_id": "m20",
    "job": "げぼく",
    "_id": "changed_m20",
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

Cache.rule.chr_set.merge([
  {
    "_id": "all",
    "admin": "闇の呟き",
    "maker": "天のお告げ",
    "caption": "人狼議事 ちゃんぷる",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_npc.merge([
  {
    "caption": "人狼議事 ちゃんぷる",
    "csid": "all",
    "face_id": "all",
    "say_0": "ちゃんとご注文通り、さまざまな人たちをお呼びしましたよ。<br>いたるところから…そう、地平の果てや、宇宙の彼方からも。<br><br>中には、主様を消してくださるような方もいらっしゃるかもしれません。",
    "say_1": "皆さまお集まりありがとうございます。えー、ごほん。<br>この催し物、しっかりと楽しんでくださいませ。<br><br>…何があっても、文句は言いませんよう、ご了承くださいませ。<br>",
    "_id": "all_all",
    "chr_set_id": "all"
  }
]);

Cache.rule.chr_job.merge([
  {
    "face_id": "all",
    "job": "かみさま",
    "_id": "all_all",
    "chr_set_id": "all"
  }
]);

list = (function() {
  var _i, _len, _ref, _ref1, _results;
  _ref = Cache.faces.list();
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    face = _ref[_i];
    chr_set_id = "all";
    face_id = face._id;
    _id = "all_" + face_id;
    job = (_ref1 = Cache.chr_jobs.face(face_id).list().first) != null ? _ref1.job : void 0;
    if (job == null) {
      continue;
    }
    _results.push({
      chr_set_id: chr_set_id,
      face_id: face_id,
      job: job,
      _id: _id
    });
  }
  return _results;
})();

Cache.rule.chr_job.merge(list);

SOW_RECORD = {"monospace":[null,"mono","head",null],"roles":[null,"villager","stigma","fm","sympathy","seer","seerwin","aura","seerrole","guard","medium","mediumwin","mediumrole","necromancer","follow","fan","hunter","weredog","prince","rightwolf","doctor","curse","dying","invalid","alchemist","witch","girl","scapegoat","elder",29,30,"jammer","snatch","bat",34,35,36,37,38,39,40,"possess","fanatic","muppeting","wisper","semiwolf","dyingpossess","oracle","sorcerer","walpurgis",50,51,"headless",53,54,55,56,57,58,59,60,"wolf","aurawolf","intwolf","cursewolf","whitewolf","childwolf","dyingwolf","silentwolf",69,70,71,72,73,74,75,76,77,78,79,80,"hamster",82,83,84,85,"mimicry",87,"dyingpixi","trickster","hatedevil","loveangel","passion","lover","robber",95,"lonewolf","guru","dish",99,100,"bitch","tangle",103,104,105,106,107,108,109,null],"gifts":[null,null,"lost","bind",4,"shield","glass","ogre","fairy","fink",10,"decide","seeronce","dipsy",14,15,16,17,18,19,null],"events":[null,"nothing","aprilfool","turnfink","turnfairy","eclipse","cointoss","force","miracle","prophecy",10,"clamor","fire","nightmare","ghost","escape","seance",17,18,19,null],"winners":["WIN_NONE","WIN_HUMAN","WIN_WOLF","WIN_GURU","WIN_PIXI","WIN_PIXI","WIN_LONEWOLF","WIN_LOVER","WIN_HATER",null],"mestypes":[null,"INFOSP","DELETEDADMIN","CAST","MAKER","ADMIN","QUEUE","INFONOM","DELETED","SAY","TSAY","WSAY","GSAY","SPSAY","XSAY","VSAY","MSAY","AIM","ANONYMOUS","INFOWOLF",null]};
LOCATION = {"props":{"scroll":{"type":"Text","current":""},"back":{"type":"Text","current":""},"pins":{"type":"Keys","current":{}},"search":{"type":"Text","current":""},"w":{"type":"Number"},"width":{"current":"std"},"layout":{"current":"center"},"font":{"current":"std"},"theme":{"current":"cinema"},"item":null,"color":null,"title":null,"nation":null,"icon":{"type":"Text","current":""},"updated_at":{"type":"Date"},"turn":{"type":"Number"},"message_id":null,"event_id":null,"story_id":null,"mode_id":{"current":"talk"},"potofs_order":{"current":"said_num"},"potofs_desc":{"type":"Bool","current":true},"potofs_hide":{"type":"Keys","current":{}},"scope":{"current":"talk"},"home":{"current":"village"},"home_at":{"type":"Text","current":""},"talk":{"current":"open"},"talk_at":{"type":"Text","current":""},"memo":{"current":"all"},"memo_at":{"type":"Text","current":""},"open":{"type":"Bool","current":true},"uniq":{"type":"Bool","current":true},"human":{"type":"Bool","current":true},"roletable":{"current":"ALL"},"card_win":{"current":"ALL"},"chr_set":{"current":"all"},"order":{"current":"all"},"folder":{"current":"all"},"game":{"current":"all"},"say_limit":{"current":"all"},"player_length":{"current":"all"},"rating":{"current":"all"},"config":{"current":"all"},"event_type":{"current":"all"},"gift_type":{"current":"all"},"role_type":{"current":"all"},"update_at":{"current":"all"},"update_interval":{"current":"all"},"content_width":{"type":"Number"},"h1_width":{"type":"Number"},"right_width":{"type":"Number"}},"bind":{"folder":[{"folder":"all","nation":"- すべて -"},{"folder":"PAN","nation":"似顔絵人狼"},{"folder":"WOLF","nation":"人狼議事標準"},{"folder":"RP","nation":"人狼議事RP:"},{"folder":"PRETENSE","nation":"人狼議事RP:Advance"},{"folder":"XEBEC","nation":"人狼議事RP:Braid XEBEC"},{"folder":"CRAZY","nation":"人狼議事RP:Braid Crazy"},{"folder":"CIEL","nation":"人狼議事RP:Cheat Ciel"},{"folder":"PERJURY","nation":"人狼議事RP:Cheat Perjury"},{"folder":"ULTIMATE","nation":"人狼議事大乱闘:"},{"folder":"ALLSTAR","nation":"人狼議事大乱闘:Allstar"},{"folder":"CABALA","nation":"人狼議事CabalaCafe"},{"folder":"MORPHE","nation":"人狼議事モルペウス"},{"folder":"SOYBEAN","nation":"人狼議事鯖の味噌煮"},{"folder":"LOBBY","nation":"人狼議事ロビー"},{"folder":"OFFPARTY","nation":"人狼議事オフ相談所"},{"folder":"TEST","nation":"人狼議事テスト"}],"theme":[{"theme":"juna","item":"box-msg","title":"審問"},{"theme":"sow","item":"box-msg","title":"物語"},{"theme":"night","item":"speech","title":"闇夜"},{"theme":"moon","item":"speech","title":"月夜"},{"theme":"cinema","item":"speech","title":"煉瓦"},{"theme":"wa","item":"speech","title":"和の国"},{"theme":"star","item":"speech","title":"蒼穹"}]}};
RAILS = {"maskstates":{"268435200":null,"1024":"投票対象外","512":"恩恵対象外","256":"能力対象外","64":"感染","32":"負傷","8":"<s>投票</s>","7":"<s>全能力</s>","4":"<s>恩恵</s>","3":"<s>能力</s>","2":"<s>毒薬</s>","1":"<s>蘇生薬</s>"},"tag":{"giji":{"name":"人狼議事","long":"「人狼議事」のキャラクター","chr_set_ids":["animal","school","ririnra"]},"shoji":{"name":"てやんでえ","long":"「和の国てやんでえ」のキャラクター","chr_set_ids":["all","wa"]},"travel":{"name":"帰還者議事","long":"「帰還者議事」のキャラクター","chr_set_ids":["all","time"]},"stratos":{"name":"明後日への道標","long":"「明後日への道標」のキャラクター","chr_set_ids":["all","SF"]},"myth":{"name":"はおうのひろば","long":"「はおうのひろば」のキャラクター","chr_set_ids":["all","changed"]},"asia":{"name":"大陸議事","long":"「大陸議事」のキャラクター","chr_set_ids":["all","ger"]},"marchen":{"name":"狂騒議事","long":"「狂騒議事」のキャラクター","chr_set_ids":["all","mad"]},"kid":{"name":"(児童)","long":"児童のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"young":{"name":"(若者)","long":"若者のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"middle":{"name":"(中年)","long":"中年のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"elder":{"name":"(老人)","long":"老人のキャラクター","chr_set_ids":["all","animal","school","ririnra"]},"river":{"name":"-運河-","long":"往く人来る人休む人","chr_set_ids":["all","animal","school","ririnra"]},"road":{"name":"-往来-","long":"往く人来る人休む人","chr_set_ids":["all","animal","school","ririnra"]},"immoral":{"name":"-裏道-","long":"街灯の裏の背徳達","chr_set_ids":["all","animal","school","ririnra"]},"guild":{"name":"-商工会-","long":"商人と職人の集うギルド","chr_set_ids":["all","animal","school","ririnra"]},"elegant":{"name":"-舞踏会-","long":"瀟洒な館の舞踏会","chr_set_ids":["all","animal","school","ririnra"]},"ecclesia":{"name":"-公教会-","long":"信仰と道徳と学識の源泉","chr_set_ids":["all","animal","school","ririnra"]},"medical":{"name":"-施療院-","long":"病苦毒霊と戦う砦","chr_set_ids":["all","animal","school","ririnra"]},"market":{"name":"-歌劇酒場-","long":"芸の極みに華が咲く","chr_set_ids":["all","animal","school","ririnra"]},"apartment":{"name":"-自室の窓-","long":"窓から外を眺めると","chr_set_ids":["all","animal","school","ririnra"]},"servant":{"name":"-使用人-","long":"良家を支えるスタッフ","chr_set_ids":["all","animal","school","ririnra"]},"farm":{"name":"-森の農場-","long":"森に接する田畑","chr_set_ids":["all","animal","school","ririnra"]},"government":{"name":"-統治公共-","long":"所領を治める権能者","chr_set_ids":["all","animal","school","ririnra"]},"god":{"name":"-かみさま-","long":"かみさま","chr_set_ids":["all"]},"all":{"name":"すべて","long":"「人狼議事 ちゃんぷる」のキャラクター","chr_set_ids":["all"]}},"message":{"visible":{"appendex":{"event_asc":8192,"event_desc":4096},"home":{"village":12160,"cast":10112,"announce":9088},"warning":{"all":8768},"talk":{"open":8736,"clan":9008,"think":8872,"all":9144},"memo":{"open":4100,"clan":4102,"think":4101,"all":4103}},"bit":{"EVENT_ASC":8192,"EVENT_DESC":4096,"INFO":896,"ACTION":120,"TALK":56,"MEMO":7},"mask":{"ALL":16383,"NOT_OPEN":15835,"ANNOUNCE":16383,"OPEN":15972,"CLAN":15698,"THINK":15561,"DELETE":12297,"ZERO":12288}},"head_img":{"770":{"cinema":["morning.png","moon.png"],"night":["morning.png","moon.png"],"moon":["morning.png","moon.png"],"wa":["morning.png","lupino.png"],"star":["morning.png","lupino.png"],"juna":["morning.png","lupino.png"],"sow":["morning.png","lupino.png"]},"580":{"cinema":["b.jpg","w.jpg"],"night":["b.jpg","w.jpg"],"moon":["b.jpg","w.jpg"],"wa":["b.jpg","w.jpg"],"star":["r.jpg","c.jpg"],"juna":["b.jpg","w.jpg"],"sow":["r.jpg","c.jpg"]},"458":{"cinema":["b.jpg","w.jpg"],"night":["b.jpg","w.jpg"],"moon":["b.jpg","w.jpg"],"wa":["b.jpg","w.jpg"],"star":["r.jpg","c.jpg"],"juna":["b.jpg","w.jpg"],"sow":["r.jpg","c.jpg"]}},"clearance":["IR-","R-","O-","Y-","G-","B-","I-","V-","UV-"],"rating":{"default":{"caption":"とくになし"},"love":{"caption":"[愛] 恋愛を重視","alt":"愛"},"sexy":{"caption":"[性] 性表現あり","alt":"性"},"sexylove":{"caption":"[性愛] 大人の恋愛","alt":"性愛"},"violence":{"caption":"[暴] 暴力、グロ","alt":"暴"},"sexyviolence":{"caption":"[性暴] えろぐろ","alt":"性暴"},"teller":{"caption":"[怖] 恐怖を煽る","alt":"怖"},"drunk":{"caption":"[楽] 享楽に耽る","alt":"楽"},"gamble":{"caption":"[賭] 賭博に耽る","alt":"賭"},"crime":{"caption":"[罪] 犯罪描写あり","alt":"罪"},"drug":{"caption":"[薬] 薬物表現あり","alt":"薬"},"word":{"caption":"[言] 殺伐、暴言あり","alt":"言"},"fireplace":{"caption":"[暢] のんびり雑談","alt":"暢"},"appare":{"caption":"[遖] あっぱれネタ風味","alt":"遖"},"ukkari":{"caption":"[張] うっかりハリセン","alt":"張"},"child":{"caption":"[全] 大人も子供も初心者も、みんな安心","alt":"全"},"biohazard":{"caption":"[危] 無茶ぶり上等","alt":"危"},"":{"caption":"null","alt":""},"0":{"caption":"0","alt":""},"r15":{"caption":"１５禁","alt":""},"r18":{"caption":"１８禁","alt":""},"gro":{"caption":"暴力、グロ","alt":""},"view":{"caption":"view"},"alert":{"caption":"要注意","alt":""}},"folders":{"PAN":{"evil":"WOLF","role_play":false},"OFFPARTY":{"evil":"EVIL","role_play":false},"LOBBY":{"evil":"EVIL","role_play":false},"RP":{"evil":"WOLF","role_play":true},"PRETENSE":{"evil":"WOLF","role_play":true},"PERJURY":{"evil":"WOLF","role_play":true},"XEBEC":{"evil":"WOLF","role_play":true},"CRAZY":{"evil":"WOLF","role_play":true},"SOYBEAN":{"evil":"WOLF","role_play":true},"BRAID":{"evil":"WOLF","role_play":true},"CIEL":{"evil":"WOLF","role_play":true},"WOLF":{"evil":"WOLF","role_play":false},"ULTIMATE":{"evil":"EVIL","role_play":false},"ALLSTAR":{"evil":"EVIL","role_play":false},"CABALA":{"evil":"EVIL","role_play":false},"MORPHE":{"evil":"EVIL","role_play":false}},"map_faces_orders":{"all":{"caption":"登場","headline":"登場した","order":"合計"},"human":{"caption":"村側","headline":"人間だった","order":"村人陣営"},"wolf":{"caption":"狼側","headline":"人狼だった","order":"人狼陣営"},"enemy":{"caption":"敵側","headline":"敵側の人間だった","order":"敵側の人間"},"pixi":{"caption":"妖精","headline":"妖精だった","order":"妖精"},"other":{"caption":"その他","headline":"その他だった","order":"その他"}},"options":{"seq-event":{"help":"事件が順序どおりに発生する"},"show-id":{"help":"ユーザーIDを公開する"},"entrust":{"help":"委任投票をする"},"select-role":{"help":"役職希望を受け付ける"},"random-target":{"help":"投票・能力の対象に「ランダム」を含める"},"undead-talk":{"help":"狼・妖精と死者との間で、会話ができる"},"aiming-talk":{"help":"ふたりだけの内緒話をすることができる"}},"roletable":{"secret":"詳細は黒幕だけが知っています。","custom":"自由設定","default":"標準","hamster":"ハムスター","mistery":"（なんだっけ？？？）","random":"ランダム","test1st":"人狼審問試験壱型","test2nd":"人狼審問試験弐型","ultimate":"アルティメット","wbbs_c":"人狼BBS-C国","wbbs_f":"人狼BBS-F国","wbbs_g":"人狼BBS-G国","lover":"恋愛天使"},"vote":{"sign":{"CAPTION":"記名で投票"},"anonymity":{"CAPTION":"匿名で投票"}},"mes_text":["mes_text","mes_text_monospace","mes_text_report"],"monospace":{"mono":1,"head":2},"n_rule_name":["短期はここではできない。","情報ページ（ここ）を熟読する。","ルールを守り、つねに心構えに気を配る。","進行中は、どんな嘘でもＯＫ。","ただし、（村建て人）、（管理人）の発言では嘘をつかないこと。","突然死をしない。"],"switch":{"wolf":{"mestype":"WSAY"},"pixi":{"mestype":"XSAY"},"muppet":{"mestype":"SAY"},"sympathy":{"mestype":"SPSAY"}},"loves":{"love":{"win":"LOVER"},"hate":{"win":"HATER"}},"wins":{"HUMAN":{"name":"村人陣営","order":1},"EVIL":{"name":"敵側の人間","order":2},"WOLF":{"name":"人狼陣営","order":3},"LONEWOLF":{"name":"一匹狼","order":4},"PIXI":{"name":"妖精","order":5},"OTHER":{"name":"その他","order":6},"GURU":{"name":"笛吹き","order":6},"LOVER":{"name":"恋人陣営","order":7},"HATER":{"name":"邪気陣営","order":8},"DISH":{"name":"据え膳","order":9},"NONE":{"name":"―","order":98},"MOB":{"name":"見物人","order":99},"LEAVE":{"name":"―","order":100}},"winner":{"WIN_NONE":"―","WIN_LEAVE":"―","WIN_DISH":"据え膳","WIN_LOVER":"恋人陣営","WIN_HATER":"邪気陣営","WIN_LONEWOLF":"一匹狼","WIN_HUMAN":"村人陣営","WIN_WOLF":"人狼陣営","WIN_PIXI":"妖精","WIN_GURU":"笛吹き","WIN_EVIL":"裏切りの陣営"},"specials":{"mob":{"name":"見物人","win":"MOB"}},"roles":{"mob":{"name":"見物人","win":"MOB","group":"OTHER"},"lover":{"name":"弟子","win":null,"group":"OTHER"},"robber":{"name":"盗賊","win":null,"group":"OTHER"},"tangle":{"name":"怨念","win":null,"group":"OTHER"},"villager":{"name":"村人","win":"HUMAN","group":"HUMAN"},"stigma":{"name":"聖痕者","win":"HUMAN","group":"HUMAN"},"fm":{"name":"結社員","win":"HUMAN","group":"HUMAN"},"sympathy":{"name":"共鳴者","win":"HUMAN","group":"HUMAN"},"seer":{"name":"占い師","win":"HUMAN","group":"HUMAN"},"seerwin":{"name":"信仰占師","win":"HUMAN","group":"HUMAN"},"oura":{"name":"気占師","win":"HUMAN","group":"HUMAN"},"aura":{"name":"気占師","win":"HUMAN","group":"HUMAN"},"seerrole":{"name":"賢者","win":"HUMAN","group":"HUMAN"},"guard":{"name":"守護者","win":"HUMAN","group":"HUMAN"},"medium":{"name":"霊能者","win":"HUMAN","group":"HUMAN"},"mediumwin":{"name":"信仰霊能者","win":"HUMAN","group":"HUMAN"},"mediumrole":{"name":"導師","win":"HUMAN","group":"HUMAN"},"necromancer":{"name":"降霊者","win":"HUMAN","group":"HUMAN"},"follow":{"name":"追従者","win":"HUMAN","group":"HUMAN"},"fan":{"name":"煽動者","win":"HUMAN","group":"HUMAN"},"hunter":{"name":"賞金稼","win":"HUMAN","group":"HUMAN"},"weredog":{"name":"人犬","win":"HUMAN","group":"HUMAN"},"prince":{"name":"王子様","win":"HUMAN","group":"HUMAN"},"rightwolf":{"name":"狼血族","win":"HUMAN","group":"HUMAN"},"doctor":{"name":"医師","win":"HUMAN","group":"HUMAN"},"curse":{"name":"呪人","win":"HUMAN","group":"HUMAN"},"dying":{"name":"預言者","win":"HUMAN","group":"HUMAN"},"invalid":{"name":"病人","win":"HUMAN","group":"HUMAN"},"alchemist":{"name":"錬金術師","win":"HUMAN","group":"HUMAN"},"witch":{"name":"魔女","win":"HUMAN","group":"HUMAN"},"girl":{"name":"少女","win":"HUMAN","group":"HUMAN"},"scapegoat":{"name":"生贄","win":"HUMAN","group":"HUMAN"},"elder":{"name":"長老","win":"HUMAN","group":"HUMAN"},"jammer":{"name":"邪魔之民","win":"EVIL","group":"EVIL"},"snatch":{"name":"宿借之民","win":"EVIL","group":"EVIL"},"bat":{"name":"念波之民","win":"EVIL","group":"EVIL"},"cpossess":{"name":"囁き狂人","win":"EVIL","group":"EVIL"},"possess":{"name":"狂人","win":"EVIL","group":"EVIL"},"fanatic":{"name":"狂信者","win":"EVIL","group":"EVIL"},"muppeting":{"name":"人形使い","win":"EVIL","group":"EVIL"},"wisper":{"name":"囁き狂人","win":"EVIL","group":"EVIL"},"semiwolf":{"name":"半狼","win":"EVIL","group":"EVIL"},"dyingpossess":{"name":"---","win":"EVIL","group":"EVIL"},"oracle":{"name":"魔神官","win":"EVIL","group":"EVIL"},"sorcerer":{"name":"魔術師","win":"EVIL","group":"EVIL"},"walpurgis":{"name":"魔法少年","win":"EVIL","group":"EVIL"},"headless":{"name":"首無騎士","win":"WOLF","group":"WOLF"},"wolf":{"name":"人狼","win":"WOLF","group":"WOLF"},"aurawolf":{"name":"---","win":"WOLF","group":"WOLF"},"intwolf":{"name":"智狼","win":"WOLF","group":"WOLF"},"cwolf":{"name":"呪狼","win":"WOLF","group":"WOLF"},"cursewolf":{"name":"呪狼","win":"WOLF","group":"WOLF"},"whitewolf":{"name":"白狼","win":"WOLF","group":"WOLF"},"childwolf":{"name":"仔狼","win":"WOLF","group":"WOLF"},"dyingwolf":{"name":"衰狼","win":"WOLF","group":"WOLF"},"silentwolf":{"name":"黙狼","win":"WOLF","group":"WOLF"},"werebat":{"name":"蝙蝠人間","win":"PIXI","group":"PIXI"},"hamster":{"name":"栗鼠妖精","win":"PIXI","group":"PIXI"},"mimicry":{"name":"擬狼妖精","win":"PIXI","group":"PIXI"},"dyingpixi":{"name":"風花妖精","win":"PIXI","group":"PIXI"},"trickster":{"name":"悪戯妖精","win":"PIXI","group":"PIXI"},"hatedevil":{"name":"邪気悪魔","win":"HATER","group":"OTHER"},"loveangel":{"name":"恋愛天使","win":"LOVER","group":"OTHER"},"passion":{"name":"片思い","win":"LOVER","group":"OTHER"},"lonewolf":{"name":"一匹狼","win":"LONEWOLF","group":"WOLF"},"guru":{"name":"笛吹き","win":"GURU","group":"OTHER"},"dish":{"name":"鱗魚人","win":"DISH","group":"OTHER"},"bitch":{"name":"遊び人","win":"LOVER","group":"OTHER"}},"gifts":{"none":{"name":"","win":null,"group":null},"lost":{"name":"喪失","win":null,"group":"OTHER"},"bind":{"name":"---","win":null,"group":null},"shield":{"name":"光の輪","win":null,"group":"OTHER"},"glass":{"name":"魔鏡","win":null,"group":"OTHER"},"ogre":{"name":"悪鬼","win":"WOLF","group":"WOLF"},"fairy":{"name":"妖精の子","win":"PIXI","group":"PIXI"},"fink":{"name":"半端者","win":"EVIL","group":"EVIL"},"decide":{"name":"決定者","win":null,"group":"OTHER"},"seeronce":{"name":"夢占師","win":null,"group":"OTHER"},"dipsy":{"name":"酔払い","win":null,"group":"OTHER"}},"events":{"nothing":{"name":"普通の日"},"aprilfool":{"name":"四月馬鹿"},"turnfink":{"name":"二重スパイ"},"turnfairy":{"name":"妖精の輪"},"eclipse":{"name":"日蝕"},"cointoss":{"name":"Sir Cointoss"},"force":{"name":"影響力"},"miracle":{"name":"奇跡"},"prophecy":{"name":"聖者のお告げ"},"clamor":{"name":"不満"},"fire":{"name":"熱意"},"nightmare":{"name":"悪夢"},"ghost":{"name":"亡霊"},"escape":{"name":"逃亡"},"seance":{"name":"降霊会"}},"event_state":{"grudge":"今夜は２名分の襲撃をします。それが奴等への復讐なのです。","riot":"今夜は２名分の投票をします。この荒波のような流行に乗らなくては！","scapegoat":"今夜の投票相手は決まっています。","eclipse":"今日の議論は、誰が発言しているか不明になります。"},"live":{"live":{"name":"生存者","order":2},"executed":{"name":"処刑","order":3},"victim":{"name":"襲撃","order":4},"cursed":{"name":"呪詛","order":5},"droop":{"name":"衰退","order":6},"suicide":{"name":"後追","order":7},"feared":{"name":"恐怖","order":8},"mob":{"name":"見物人","order":10},"suddendead":{"name":"突然死","order":100},"leave":{"name":"―","order":101}},"live_caption":{"live":"生存者","executed":"処刑","victim":"犠牲者","cursed":"犠牲者","droop":"犠牲者","suicide":"犠牲者","feared":"犠牲者","suddendead":"突然死","mob":"見物人"},"mob":{"visiter":{"CAPTION":"客席","HELP":"進行中会話は客席同士のみ"},"grave":{"CAPTION":"裏方","HELP":"進行中会話は墓下と"},"alive":{"CAPTION":"舞台","HELP":"進行中会話は地上、墓下、両方と"},"juror":{"CAPTION":"陪審","HELP":"進行中会話は陪審同士のみ。陪審（＆決定者）だけが投票する。"},"gamemaster":{"CAPTION":"黒幕","HELP":"進行中会話は地上、墓下、両方と。場を支配する特権をもつ。"}},"game_rule":{"TABULA":{"CAPTION":"タブラの人狼","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"MILLERHOLLOW":{"CAPTION":"ミラーズホロウ","HELP":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>すべての死者は役職が公開される。\n<li>狼を全滅させると、村勝利。\n<li>「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"LIVE_TABULA":{"CAPTION":"タブラの人狼（死んだら負け）","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"LIVE_MILLERHOLLOW":{"CAPTION":"ミラーズホロウ（死んだら負け）","HELP":"<li>同数票の処刑候補が複数いた場合、処刑をとりやめる。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>「村人」を全滅させると、狼勝利。役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n<li>ただし、仲間が勝利していても、死んでしまった者は敗北である。\n"},"TROUBLE":{"CAPTION":"Trouble☆Aliens","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>守護者は、より大人数の人狼からは守りきることができず、身代わりに感染する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村側の生存者が勝利（村側は死んだら負ける）。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼と感染者の勝利。\n"},"MISTERY":{"CAPTION":"深い霧の夜","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>村側は自分の役職を自覚しない。\n<li>村側は、能力の結果不審者を見かけることがある。\n<li>人狼の行動対象に選ばれると、不審者を見かける。\n<li>狼を全滅させると、村勝利。\n<li>役職「村人」を全滅させると、狼勝利。<br>役職を持つ村側の生き残りは、勝利に直接は寄与しない。\n"},"VOV":{"CAPTION":"狂犬病の谷","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>１人の人狼が襲撃すると感染、複数の人狼や一匹狼、賞金稼ぎが襲撃すると死亡する。\n<li>狼を全滅させると、村勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼勝利。\n"},"SECRET":{"CAPTION":"陰謀に集う胡蝶","HELP":"<li>同数票の処刑候補が複数いた場合、ランダムに処刑する。\n<li>人狼は会話できない。襲撃候補リストで判断できない。\n<li>襲撃先は翌日、犠牲候補と人狼に開示される。\n<li>狼を全滅させると、村側の生存者が勝利。\n<li>人≦狼、つまり人間と人狼を１対１にしたとき、人間が余計にいなくなったら、狼の生存者が勝利。\n<li>いかなる場合も、死んでしまったものは敗北である。\n"}},"trs":{"all":{"CAPTION":"オール☆スター","HELP":"すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。"},"simple":{"CAPTION":"ラッキー☆スター","HELP":"初心者向けの、シンプルな設定です。拡張設定の一部が固定になっています。"},"star":{"CAPTION":"Orbital☆Star","HELP":"すべての役職、恩恵、事件を楽しむことができます。また、進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>宇宙時代に突入した「全部入り」のセットです。村落共同体は渓谷や高原ではなく、小惑星帯や人工コロニー、移民船にあるでしょう。事件が始まるまでは、とても充実した近代的なインフラが整っていたのですが……"},"regend":{"CAPTION":"議事☆伝承","HELP":"すべての役職、恩恵、事件を楽しむことができる、「全部入り」のセットです。アクション内容は穏当になり、未来的ですばらしいクローンも居ません。"},"fool":{"CAPTION":"適当系","HELP":"てきとーな感じ。"},"sow":{"CAPTION":"人狼物語","HELP":"ウェブゲーム「人狼物語」風の役職を楽しめます。ただし、細かい動作に違いがあります。"},"wbbs":{"CAPTION":"人狼BBS","HELP":"ウェブゲーム「人狼BBS」風の役職を楽しめます。ただし、細かい動作に違いがあります。"},"juna":{"CAPTION":"人狼審問","HELP":"ウェブゲーム「人狼審問」風の役職を楽しめます。ただし、細かい動作に違いがあります。"},"complex":{"CAPTION":"PARANOIA","HELP":"ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"},"complexx":{"CAPTION":"ParanoiA","HELP":"ようこそ、トラブルシューター。市民達は進行中以外はクローンにされたり、セキュリティ・クリアランスが変ったりします。<br>！注意！　入村直後の市民はクローンではありません。ただちに別れを告げてあげましょう。　！注意！"},"cabala":{"CAPTION":"ギロチン広場","HELP":"権謀術数を弄び、虚実まじえた会話を楽しむためのセットです。"},"tabula":{"CAPTION":"タブラの人狼","HELP":"カードゲーム「Lupus in Tabula」風の役職を楽しめます。ただし、疫病神、公証人、悪魔くん、には対応していません。"},"millerhollow":{"CAPTION":"ミラーズホロウ","HELP":"カードゲーム「The Werewolves of Millers Hollow + New Moon」風の役職を楽しめます。ただし、愚か者には対応していません。守護者、笛吹きにすこし違いがあります。"},"ultimate":{"CAPTION":"アルティメット","HELP":"カードゲーム「アルティメット人狼」風の役職を楽しめます。ただし、ドワーフ、ドッペルゲンガー、アル中、愚か者、倫理学者には対応していません。"}},"saycnt":{"sow":{"CAPTION":"人狼物語","HELP":null},"say5":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10},"point":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999},"count":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0},"lobby":{"CAPTION":"ロビー","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"say5x200":{"CAPTION":"寡黙への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 200字x5回/5act'","MAX_MESCNT":200},"say5x300":{"CAPTION":"小論文への挑戦","COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","RECOVERY":1,"MAX_SAY":5,"MAX_TSAY":5,"MAX_SPSAY":5,"MAX_WSAY":10,"MAX_GSAY":10,"MAX_PSAY":10,"MAX_ESAY":999,"MAX_SAY_ACT":5,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESLINE":10,"HELP":"（24h回復） 300字x5回/15act'","MAX_MESCNT":300},"saving":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"節約","HELP":"250字x20回/15act","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":10,"MAX_SPSAY":10,"MAX_WSAY":30,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":15,"MAX_MESCNT":250,"MAX_MESLINE":10},"wbbs":{"COST_SAY":"count","COST_MEMO":"none","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"人狼BBS","HELP":"200字x20回","RECOVERY":0,"MAX_SAY":20,"MAX_TSAY":5,"MAX_SPSAY":20,"MAX_WSAY":40,"MAX_GSAY":20,"MAX_PSAY":20,"MAX_ESAY":999,"MAX_SAY_ACT":0,"MAX_MESCNT":200,"MAX_MESLINE":5},"euro":{"COST_SAY":"count","COST_MEMO":"count","COST_ACT":"count","ADD_SAY":0,"MAX_ADDSAY":0,"CAPTION":"欧州","HELP":"（24h回復） 800字x30回/30act","RECOVERY":1,"MAX_SAY":30,"MAX_TSAY":999,"MAX_SPSAY":999,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":30,"MAX_ESAY":999,"MAX_SAY_ACT":30,"MAX_MESCNT":800,"MAX_MESLINE":20},"tiny":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"たりない","HELP":"（24h回復）（メモは20pt） 333pt/9act","RECOVERY":1,"MAX_SAY":333,"MAX_TSAY":999,"MAX_SPSAY":333,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":999,"MAX_SAY_ACT":9,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":300,"MAX_MESLINE":10},"weak":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 777pt/15act","RECOVERY":1,"MAX_SAY":777,"MAX_TSAY":777,"MAX_SPSAY":777,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 1200pt/24act","RECOVERY":1,"MAX_SAY":1200,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":0,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20},"weak_braid":{"COST_SAY":"point","COST_MEMO":"point","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"むりせず","HELP":"（24h回復）（メモは20pt） 600pt++100pt/15act","RECOVERY":1,"MAX_SAY":600,"MAX_TSAY":600,"MAX_SPSAY":600,"MAX_WSAY":999,"MAX_GSAY":999,"MAX_PSAY":1200,"MAX_SAY_ACT":15,"ADD_SAY":100,"MAX_ADDSAY":2,"MAX_MESCNT":600,"MAX_MESLINE":15},"juna_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"しんもん","HELP":"（24h回復） 800pt++200pt/24act","RECOVERY":1,"MAX_SAY":800,"MAX_TSAY":700,"MAX_SPSAY":700,"MAX_WSAY":3000,"MAX_GSAY":2000,"MAX_PSAY":2000,"MAX_SAY_ACT":24,"ADD_SAY":200,"MAX_ADDSAY":2,"MAX_MESCNT":1000,"MAX_MESLINE":20},"vulcan_braid":{"COST_SAY":"point","COST_MEMO":"count","COST_ACT":"count","MAX_ESAY":9999,"CAPTION":"いっぱい","HELP":"（24h回復） 1000pt+++300pt/36act","RECOVERY":1,"MAX_SAY":1000,"MAX_TSAY":1000,"MAX_SPSAY":1500,"MAX_WSAY":4000,"MAX_GSAY":3000,"MAX_PSAY":3000,"MAX_SAY_ACT":36,"ADD_SAY":300,"MAX_ADDSAY":3,"MAX_MESCNT":1000,"MAX_MESLINE":20},"infinity_braid":{"CAPTION":"むげん","HELP":"∞pt/∞act","COST_SAY":"none","COST_MEMO":"none","COST_ACT":"none","RECOVERY":1,"MAX_SAY":9999,"MAX_TSAY":9999,"MAX_SPSAY":9999,"MAX_WSAY":9999,"MAX_GSAY":9999,"MAX_PSAY":9999,"MAX_ESAY":9999,"MAX_SAY_ACT":99,"ADD_SAY":9999,"MAX_ADDSAY":0,"MAX_MESCNT":1000,"MAX_MESLINE":20}},"log":{"anchor":{"m":"#","a":"%","S":"","T":"-","W":"*","G":"+","P":"=","X":"!","V":"@"},"mestypetext":[null,null,"【管理人削除】",null,null,null,"【未確】",null,"【削除】","【人】","【独】","【赤】","【墓】","【鳴】","【念】","【見】","【憑】",null,null,null],"font":[null,null,"color=\"gray\"",null,null,null,null,null,"color=\"gray\"",null,"color=\"gray\"","color=\"red\"","color=\"teal\"","color=\"blue\"","color=\"green\"","color=\"maroon\"",null,"color=\"purple\"",null,"color=\"red\""]}};
GAME = {"PERL_DEFAULT":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]}}},"PERL_NEW":{"config":{"trsid":["all","star","regend","heavy","complexx","secret"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"]}},"PERL_GAME":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"}}},"PERL_UNION":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"UNION","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"PERL_BRAID":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com"}}},"TESTBED":{"config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","say5x200","say5x300","wbbs","saving","euro","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../testbed/lib","DIR_HTML":"../testbed/html","DIR_RS":"../testbed/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":1,"TIMEOUT_SCRAP":1,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/testbed","BASEDIR_CGIERR":"http://utage.family.jp//testbed","NAME_HOME":"人狼議事 手元テスト","MAX_VILLAGES":9},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[0,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/testbed/config.pl"}},"PERJURY_OLD":{"server":"utage.family.jp","oldlog":"/perjury/sow.cgi?cmd=oldlog&rowall=on","livelog":"/perjury/sow.cgi?cmd=rss","folder":"PERJURY_OLD","info_url":"/perjury/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Bp","epi_url":"/perjury/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Bp","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/perjury","BASEDIR_CGIERR":"http://utage.family.jp//perjury","NAME_HOME":"人狼議事 Role Play braid perjury","MAX_VILLAGES":0},"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/perjury/config.pl"}},"PRETENSE":{"server":"utage.family.jp","oldlog":"/pretense/sow.cgi?cmd=oldlog&rowall=on","folder":"PRETENSE","info_url":"/pretense/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:A","epi_url":"/pretense/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"A"},"RP":{"server":"utage.family.jp","oldlog":"/rp/sow.cgi?cmd=oldlog&rowall=on","folder":"RP","info_url":"/rp/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:","epi_url":"/rp/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":""},"CABALA_OLD":{"server":"utage.family.jp","oldlog":"/cabala/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cabala/sow.cgi?cmd=rss","folder":"CABALA","info_url":"/cabala/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事陰謀:","epi_url":"/cabala/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"C","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../cafe/data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"CABALA","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/cabala","BASEDIR_CGIERR":"http://utage.family.jp//cabala","NAME_HOME":"人狼議事 陰謀の苑","MAX_VILLAGES":0},"pl":"/www/giji_log/cabala/config.pl"}},"ALLSTAR_OLD":{"server":"utage.family.jp","oldlog":"/allstar/sow.cgi?cmd=oldlog&rowall=on","livelog":"/allstar/sow.cgi?cmd=rss","folder":"ALLSTAR","info_url":"/allstar/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事大乱闘:A","epi_url":"/allstar/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"A","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"../cabala/lib","DIR_HTML":"../cabala/html","DIR_RS":"../cabala/rs","DIR_VIL":"../jksy/data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"CABALA","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://utage.family.jp/allstar","BASEDIR_CGIERR":"http://utage.family.jp//allstar","NAME_HOME":"人狼議事 大乱闘オールスター","MAX_VILLAGES":0},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/allstar/config.pl"}},"ULTIMATE":{"server":"utage.family.jp","oldlog":"/ultimate/sow.cgi?cmd=oldlog&rowall=on","folder":"ULTIMATE","info_url":"/ultimate/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事大乱闘:","epi_url":"/ultimate/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":""},"WOLF":{"folder":"WOLF","nation":"人狼議事標準:","server":"utage.family.jp","oldlog":"/wolf/sow.cgi?cmd=oldlog&rowall=on","livelog":"/wolf/sow.cgi?cmd=rss","info_url":"/wolf/sow.cgi?ua=mb&vid=%s&cmd=vinfo","epi_url":"/wolf/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":""},"PAN":{"server":"soy-bean.sakura.ne.jp","oldlog":"/pan/sow.cgi?cmd=oldlog&rowall=on","livelog":"/pan/sow.cgi?cmd=rss","folder":"PAN","info_url":"/pan/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"似顔絵人狼","epi_url":"/pan/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","config":{"csid":["sow","juna","name","bloody","orange","15girls","tmmi","cat","bunmei"],"erb":"./app/views/sow/pan.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"cfg":{"TYPE":"CABALA","RULE":"PAN","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"../sow/_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/pan","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/pan//","NAME_HOME":"似顔絵人狼","MAX_VILLAGES":1},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[0,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/pan/config.pl","is_angular":"show-fix"}},"MORPHE":{"server":"morphe.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","folder":"MORPHE","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事:M","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"M","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","vulcan","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"MORPHE","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://morphe.sakura.ne.jp/morphe","BASEDIR_CGIERR":"http://morphe.sakura.ne.jp/morphe//","NAME_HOME":"人狼議事 夢の形","MAX_VILLAGES":4},"pl":"/www/giji_log/morphe/config.pl"}},"SOYBEAN":{"server":"soy-bean.sakura.ne.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","folder":"SOYBEAN","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Cs","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Bs","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["all","star","regend","heavy","complexx","secret"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[1,"1:事件正順の選択を有効にする。"],"ENABLED_TEST_ROLE":[1,"1:テスト中役職を有効にする。"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://soy-bean.sakura.ne.jp/soy-bean","BASEDIR_CGIERR":"http://soy-bean.sakura.ne.jp/soy-bean//","NAME_HOME":"人狼議事 鯖の味噌煮","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/soy-bean/config.pl","is_angular":"show-fix"}},"CIEL":{"server":"ciel.moo.jp","oldlog":"/cheat/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cheat/sow.cgi?cmd=rss","folder":"CIEL","info_url":"/cheat/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Cc","epi_url":"/cheat/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Cc","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["all","star","regend","heavy","complexx","secret"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CHEAT","RULE":"CIEL","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","BASEDIR_CGIERR":"http://ciel.moo.jp//cheat","URL_SW":"http://ciel.moo.jp/cheat","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 ciel<br>- Role Play Cheat -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/ciel/config.pl","is_angular":"show-fix"}},"PERJURY":{"server":"perjury.rulez.jp","oldlog":"/sow.cgi?cmd=oldlog&rowall=on","livelog":"/sow.cgi?cmd=rss","folder":"PERJURY","info_url":"/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Cp","epi_url":"/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Bp","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan","infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"CHEAT","RULE":"PERJURY","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","BASEDIR_CGIERR":"http://perjury.rulez.jp//","URL_SW":"http://perjury.rulez.jp","MAX_VILLAGES":2,"NAME_HOME":"人狼議事 perjury rulez<br>- Role Play Cheat -"},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/vage/config.pl","is_angular":"show-fix"}},"XEBEC":{"server":"xebec.x0.to","oldlog":"/xebec/sow.cgi?cmd=oldlog&rowall=on","livelog":"/xebec/sow.cgi?cmd=rss","folder":"XEBEC","info_url":"/xebec/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Bx","epi_url":"/xebec/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Bx","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["weak","juna","vulcan"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://xebec.x0.to/xebec","BASEDIR_CGIERR":"http://xebec.x0.to//xebec","NAME_HOME":"人狼議事 xebec<br>- Role Play braid -","MAX_VILLAGES":3},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"pl":"/www/giji_log/xebec/config.pl"}},"CRAZY":{"server":"crazy-crazy.sakura.ne.jp","oldlog":"/crazy/sow.cgi?cmd=oldlog&rowall=on","livelog":"/crazy/sow.cgi?cmd=rss","folder":"CRAZY","info_url":"/crazy/sow.cgi?\\ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事RP:Bc","epi_url":"/crazy/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"Bc","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"演","maxsize":{"MAXSIZE_ACTION":120,"MAXSIZE_MEMOCNT":2000,"MAXSIZE_MEMOLINE":25},"saycnt":["infinity"],"game":["TABULA","MILLERHOLLOW","TROUBLE","MISTERY"],"trsid":["all","star","regend","heavy","complexx"],"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[0,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[0,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[0,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[1,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[0,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[0,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"BRAID","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/crazy","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//crazy","NAME_HOME":"人狼議事 crazy<br>- Role Play braid -","MAX_VILLAGES":2},"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"./data/user"},"pl":"/www/giji_log/crazy/config.pl"}},"CABALA":{"server":"cabala.halfmoon.jp","oldlog":"/cafe/sow.cgi?cmd=oldlog&rowall=on","livelog":"/cafe/sow.cgi?cmd=rss","folder":"CABALA","info_url":"/cafe/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事CabalaCafe:","epi_url":"/cafe/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"C","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["all","star","regend","heavy","complexx","secret"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"cfg":{"TYPE":"BRAID","RULE":"CABALA","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":1,"TIMEOUT_ENTRY":2,"TIMEOUT_SCRAP":5,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://cabala.halfmoon.jp/cafe","BASEDIR_CGIERR":"http://cabala.halfmoon.jp//cafe","NAME_HOME":"人狼議事 Cabala Cafe","MAX_VILLAGES":4},"pl":"/www/giji_log/cafe/config.pl","is_angular":"show-fix"}},"ALLSTAR":{"server":"jinro.jksy.org","oldlog":"/~nanakorobi?cmd=oldlog&rowall=on","livelog":"/~nanakorobi?cmd=rss","folder":"ALLSTAR","info_url":"/~nanakorobi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事大乱闘:A","epi_url":"/~nanakorobi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"A","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["tiny","weak","juna","say5x200","say5x300","wbbs","saving","euro"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["sow","all","star","regend","heavy","complexx","tabula","millerhollow","ultimate"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../sow/data/user"},"cfg":{"TYPE":"BRAID","RULE":"ALLSTAR","USERID_NPC":"master","USERID_ADMIN":"admin","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":10,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://jinro.jksy.org/~nanakorobi","BASEDIR_CGIERR":"http://jinro.jksy.org//~nanakorobi","NAME_HOME":"人狼議事 大乱闘All☆Star","MAX_VILLAGES":4},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[1,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[0,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"]},"pl":"/www/giji_log/jksy/config.pl"}},"LOBBY_OLD":{"folder":"LOBBY_OLD","nation":"人狼議事旧ロビー","vid_code":"O"},"LOBBY":{"server":"crazy-crazy.sakura.ne.jp","oldlog":"/giji_lobby/lobby/sow.cgi?cmd=oldlog&rowall=on","livelog":"/giji_lobby/lobby/sow.cgi?cmd=rss","folder":"LOBBY","info_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事ロビー","epi_url":"/giji_lobby/lobby/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"L","config":{"csid":["ririnra","ririnra_c05","ririnra_c08","ririnra_c19","ririnra_c67","ririnra_c68","ririnra_c72","ririnra_c51","ririnra_c20","ririnra_c32","all","mad","time","ger","animal","school","changed","changed_m05","SF","SF_sf10","wa","wa_w23"],"erb":"./app/views/sow/giji.pl.erb","cd_default":"戦","maxsize":{"MAXSIZE_ACTION":60,"MAXSIZE_MEMOCNT":1000,"MAXSIZE_MEMOLINE":25},"saycnt":["lobby"],"game":["TABULA","LIVE_TABULA","MILLERHOLLOW","LIVE_MILLERHOLLOW","TROUBLE","MISTERY","SECRET"],"trsid":["all","star","regend","heavy","complexx","secret"],"path":{"DIR_LIB":"./lib","DIR_HTML":"./html","DIR_RS":"./rs","DIR_VIL":"./data/vil","DIR_USER":"../data/user"},"cfg":{"TYPE":"BRAID","RULE":"LOBBY","USERID_NPC":"master","USERID_ADMIN":"master","ENABLED_VMAKE":0,"TIMEOUT_ENTRY":3,"TIMEOUT_SCRAP":365,"TOPPAGE_INFO":"./_info.pl","BASEDIR_CGI":".","BASEDIR_DAT":"./data","BASEDIR_DOC":"http://giji-assets.s3-website-ap-northeast-1.amazonaws.com","URL_SW":"http://crazy-crazy.sakura.ne.jp/giji_lobby/lobby","BASEDIR_CGIERR":"http://crazy-crazy.sakura.ne.jp//giji_lobby/lobby","NAME_HOME":"人狼議事 ロビー","MAX_VILLAGES":10,"MAX_LOG":750},"enable":{"DEFAULT_VOTETYPE":["anonymity","標準の投票方法(sign: 記名、anonymity:無記名)"],"ENABLED_DELETED":[1,"削除発言を表示するかどうか"],"ENABLED_WINNER_LABEL":[1,"1:勝利者表示をする。"],"ENABLED_MAX_ESAY":[0,"エピローグを発言制限対象に 0:しない、1:する"],"ENABLED_RANDOMTARGET":[1,"1:投票・能力先に「ランダム」を含める"],"ENABLED_SUDDENDEATH":[1,"1:突然死あり"],"ENABLED_BITTY":[1,"少女や交霊者ののぞきみがひらがなのみ。"],"ENABLED_PERMIT_DEAD":[0,"墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか"],"ENABLED_UNDEAD":[0,"1:幽界トーク村を設定可能"],"ENABLED_AIMING":[1,"1:対象を指定した発言（内緒話）を含める"],"ENABLED_MOB_AIMING":[1,"1:見物人が内緒話を使える。"],"ENABLED_AMBIDEXTER":[1,"1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）"],"ENABLED_SUICIDE_VOTE":[1,"1:自殺投票"],"ENABLED_SEQ_EVENT":[0,"0:ランダムイベント 1:順序通りのイベント"]},"pl":"/www/giji_log/lobby/config.pl","is_angular":"show-fix"}},"OFFPARTY":{"server":"party.ps.land.to","oldlog":"/kitchen/sow.cgi?cmd=oldlog&rowall=on","livelog":"/kitchen/sow.cgi?cmd=rss","folder":"OFFPARTY","info_url":"/kitchen/sow.cgi?ua=mb&vid=%s&cmd=vinfo","nation":"人狼議事オフ相談所","epi_url":"/kitchen/sow.cgi?ua=mb&vid=%s&turn=%s&move=page&pageno=1&row=50","vid_code":"P"}};
var giji;

giji = {
  gon: function() {
    return _.merge({}, OPTION.gon);
  },
  log: {
    mesicon: function(mestype) {
      return SOW_RECORD.mestypeicons[mestype];
    },
    mestype: function(mestype) {
      return SOW_RECORD.mestypes[mestype];
    }
  },
  form: {},
  potof: {
    roles: function(role, gift) {
      return _.compact([SOW_RECORD.roles[role], SOW_RECORD.gifts[gift]]);
    },
    select: function(selrole) {
      switch (selrole) {
        case -1:
          return "ランダム";
        case 999:
          return "見物人";
        default:
          return SOW_RECORD.roles[selrole];
      }
    }
  },
  story: {
    card: {
      event: function(list) {
        return _.compact(_.map(list.split('/'), function(id) {
          return SOW_RECORD.events[id];
        }));
      },
      discard: function(list) {
        return _.compact(_.map(list.split('/'), function(id) {
          return SOW_RECORD.events[id];
        }));
      }
    }
  },
  event: {
    event: function(id) {
      return SOW_RECORD.events[id];
    },
    winner: function(id) {
      return SOW_RECORD.winners[id];
    }
  }
};
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






