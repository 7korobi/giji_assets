//=include spec/**/*.js

mocha.checkLeaks();
mocha.globals([]);
mocha.run();
