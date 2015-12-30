(function() {
  this.DELAY = {
    "largo": 10000,
    "grave": 25000,
    "msg_delete": 25000,
    "msg_minute": 60000,
    "presto": 50,
    "animato": 200,
    "andante": 800,
    "lento": 3200
  };

  this.head_conf = {
    screens: [460, 580, 770],
    screensCss: {
      gt: true,
      gte: false,
      lt: true,
      lte: false,
      eq: false
    }
  };

}).call(this);

/**
 * Bounce.js 0.8.2
 * MIT license
 */
!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.Bounce=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c,d,e;e=a("../math/matrix4d"),d={bounce:a("../easing/bounce"),sway:a("../easing/sway"),hardbounce:a("../easing/hardbounce"),hardsway:a("../easing/hardsway")},c=function(){function a(a){a||(a={}),null!=a.easing&&(this.easing=a.easing),null!=a.duration&&(this.duration=a.duration),null!=a.delay&&(this.delay=a.delay),null!=a.from&&(this.from=a.from),null!=a.to&&(this.to=a.to),this.easingObject=new d[this.easing](a)}return a.prototype.easing="bounce",a.prototype.duration=1e3,a.prototype.delay=0,a.prototype.from=null,a.prototype.to=null,a.prototype.calculateEase=function(a){return this.easingObject.calculate(a)},a.prototype.getMatrix=function(){return(new e).identity()},a.prototype.getEasedMatrix=function(){return this.getMatrix()},a.prototype.serialize=function(){var a,b,c,d;b={type:this.constructor.name.toLowerCase(),easing:this.easing,duration:this.duration,delay:this.delay,from:this.from,to:this.to},d=this.easingObject.serialize();for(a in d)c=d[a],b[a]=c;return b},a}(),b.exports=c},{"../easing/bounce":6,"../easing/hardbounce":7,"../easing/hardsway":8,"../easing/sway":10,"../math/matrix4d":13}],2:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.diff=this.to-this.from}return h(b,a),b.prototype.from=0,b.prototype.to=90,b.prototype.getMatrix=function(a){var b,c,e;return c=a/180*Math.PI,b=Math.cos(c),e=Math.sin(c),new d([b,-e,0,0,e,b,0,0,0,0,1,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return c=this.calculateEase(a),b=this.from+this.diff*c,this.getMatrix(b)},b}(c),b.exports=e},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],3:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:.5,y:.5},b.prototype.to={x:1,y:1},b.prototype.getMatrix=function(a,b){var c;return c=1,new d([a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],4:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:0,y:0},b.prototype.to={x:20,y:0},b.prototype.getMatrix=function(a,b){var c,e,f,g;return c=a/180*Math.PI,e=b/180*Math.PI,f=Math.tan(c),g=Math.tan(e),new d([1,f,0,0,g,1,0,0,0,0,1,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],5:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:0,y:0},b.prototype.to={x:0,y:0},b.prototype.getMatrix=function(a,b){var c;return c=0,new d([1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],6:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("./index"),c=function(a){function b(a){var c;null==a&&(a={}),b.__super__.constructor.apply(this,arguments),null!=a.stiffness&&(this.stiffness=a.stiffness),null!=a.bounces&&(this.bounces=a.bounces),this.alpha=this.stiffness/100,c=.005/Math.pow(10,this.stiffness),this.limit=Math.floor(Math.log(c)/-this.alpha),this.omega=this.calculateOmega(this.bounces,this.limit)}return f(b,a),b.prototype.bounces=4,b.prototype.stiffness=3,b.prototype.calculate=function(a){var b;return a>=1?1:(b=a*this.limit,1-this.exponent(b)*this.oscillation(b))},b.prototype.calculateOmega=function(){return(this.bounces+.5)*Math.PI/this.limit},b.prototype.exponent=function(a){return Math.pow(Math.E,-this.alpha*a)},b.prototype.oscillation=function(a){return Math.cos(this.omega*a)},b.prototype.serialize=function(){return{stiffness:this.stiffness,bounces:this.bounces}},b}(d),b.exports=c},{"./index":9}],7:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("./bounce"),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.oscillation=function(a){return Math.abs(Math.cos(this.omega*a))},b}(c),b.exports=d},{"./bounce":6}],8:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("./sway"),c=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.oscillation=function(a){return Math.abs(Math.sin(this.omega*a))},b}(d),b.exports=c},{"./sway":10}],9:[function(a,b){var c,d;d=a("../math/helpers"),c=function(){function a(){}return a.prototype.calculate=function(a){return a},a.prototype.serialize=function(){return{}},a.prototype.findOptimalKeyPoints=function(a,b){var c,e,f,g,h,i,j,k;for(null==a&&(a=1),null==b&&(b=1e3),h=[0],k=function(){var a,c;for(c=[],f=a=0;b>=0?b>a:a>b;f=b>=0?++a:--a)c.push(this.calculate(f/b));return c}.call(this),h=h.concat(d.findTurningPoints(k)),h.push(b-1),f=0,i=1e3;i--&&f!==h.length-1;)c=d.areaBetweenLineAndCurve(k,h[f],h[f+1]),a>=c?f++:(e=Math.round(h[f]+(h[f+1]-h[f])/2),h.splice(f+1,0,e));return 0===i?[]:j=function(){var a,c,d;for(d=[],a=0,c=h.length;c>a;a++)g=h[a],d.push(g/(b-1));return d}()},a}(),b.exports=c},{"../math/helpers":12}],10:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("./bounce"),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.calculate=function(a){var b;return a>=1?0:(b=a*this.limit,this.exponent(b)*this.oscillation(b))},b.prototype.calculateOmega=function(){return this.bounces*Math.PI/this.limit},b.prototype.oscillation=function(a){return Math.sin(this.omega*a)},b}(c),b.exports=d},{"./bounce":6}],11:[function(a,b){var c,d,e;e=a("./math/matrix4d"),d={scale:a("./components/scale"),rotate:a("./components/rotate"),translate:a("./components/translate"),skew:a("./components/skew")},c=function(){function a(){this.components=[]}return a.FPS=30,a.counter=1,a.prototype.components=null,a.prototype.duration=0,a.prototype.scale=function(a){return this.addComponent(new d.scale(a))},a.prototype.rotate=function(a){return this.addComponent(new d.rotate(a))},a.prototype.translate=function(a){return this.addComponent(new d.translate(a))},a.prototype.skew=function(a){return this.addComponent(new d.skew(a))},a.prototype.addComponent=function(a){return this.components.push(a),this.updateDuration(),this},a.prototype.serialize=function(){var a,b,c,d,e;for(b=[],e=this.components,c=0,d=e.length;d>c;c++)a=e[c],b.push(a.serialize());return b},a.prototype.deserialize=function(a){var b,c,e;for(c=0,e=a.length;e>c;c++)b=a[c],this.addComponent(new d[b.type](b));return this},a.prototype.updateDuration=function(){return this.duration=this.components.map(function(a){return a.duration+a.delay}).reduce(function(a,b){return Math.max(a,b)})},a.prototype.define=function(b){return this.name=b||a.generateName(),this.styleElement=document.createElement("style"),this.styleElement.innerHTML=this.getKeyframeCSS({name:this.name,prefix:!0}),document.body.appendChild(this.styleElement),this},a.prototype.applyTo=function(a,b){var c,d,e,f,g,h,i,j,k,l;for(null==b&&(b={}),this.define(),a.length||(a=[a]),g=this.getPrefixes(),d=null,window.jQuery&&window.jQuery.Deferred&&(d=new window.jQuery.Deferred),h=0,j=a.length;j>h;h++)for(e=a[h],l=g.animation,i=0,k=l.length;k>i;i++)f=l[i],c=[this.name,""+this.duration+"ms","linear","both"],b.loop&&c.push("infinite"),e.style[""+f+"animation"]=c.join(" ");return b.loop||setTimeout(function(a){return function(){return b.remove&&a.remove(),"function"==typeof b.onComplete&&b.onComplete(),d?d.resolve():void 0}}(this),this.duration),d},a.prototype.remove=function(){var a;if(this.styleElement)return this.styleElement.remove?this.styleElement.remove():null!=(a=this.styleElement.parentNode)?a.removeChild(this.styleElement):void 0},a.prototype.getPrefixes=function(a){var b,c;return b={transform:[""],animation:[""]},c=document.createElement("dummy").style,(a||!("transform"in c)&&"webkitTransform"in c)&&(b.transform=["-webkit-",""]),(a||!("animation"in c)&&"webkitAnimation"in c)&&(b.animation=["-webkit-",""]),b},a.prototype.getKeyframeCSS=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;for(null==b&&(b={}),this.name=b.name||a.generateName(),i={transform:[""],animation:[""]},(b.prefix||b.forcePrefix)&&(i=this.getPrefixes(b.forcePrefix)),e=[],f=this.getKeyframes(b),r=this.keys,l=0,o=r.length;o>l;l++){for(d=r[l],g=f[d],j="matrix3d"+g,k=[],s=i.transform,m=0,p=s.length;p>m;m++)h=s[m],k.push(""+h+"transform: "+j+";");e.push(""+Math.round(100*d*100)/100+"% { "+k.join(" ")+" }")}for(c=[],t=i.animation,n=0,q=t.length;q>n;n++)h=t[n],c.push("@"+h+"keyframes "+this.name+" { \n  "+e.join("\n  ")+" \n}");return c.join("\n\n")},a.prototype.getKeyframes=function(b){var c,d,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;if(null==b&&(b={}),k=[0,1],b.optimized)for(u=this.components,n=0,r=u.length;r>n;n++)c=u[n],d=c.easingObject.findOptimalKeyPoints().map(function(a){return function(b){return b*c.duration/a.duration+c.delay/a.duration}}(this)),c.delay&&d.push(c.delay/this.duration-.001),k=k.concat(d);else for(g=Math.round(this.duration/1e3*a.FPS),h=o=0;g>=0?g>=o:o>=g;h=g>=0?++o:--o)k.push(h/g);for(k=k.sort(function(a,b){return a-b}),this.keys=[],j={},p=0,s=k.length;s>p;p++)if(i=k[p],!j[i]){for(l=(new e).identity(),v=this.components,q=0,t=v.length;t>q;q++)c=v[q],f=i*this.duration,c.delay-f>1e-8||(m=(i-c.delay/this.duration)/(c.duration/this.duration),l.multiply(c.getEasedMatrix(m)));this.keys.push(i),j[i]=l.transpose().toFixed(3)}return j},a.generateName=function(){return"animation-"+a.counter++},a.isSupported=function(){var a,b,c,d,e,f,g,h,i;for(e=document.createElement("dummy").style,d=[["transform","webkitTransform"],["animation","webkitAnimation"]],f=0,h=d.length;h>f;f++){for(c=d[f],b=!1,g=0,i=c.length;i>g;g++)a=c[g],b||(b=a in e);if(!b)return!1}return!0},a}(),b.exports=c},{"./components/rotate":2,"./components/scale":3,"./components/skew":4,"./components/translate":5,"./math/matrix4d":13}],12:[function(a,b){var c;c=function(){function a(){}return a.prototype.sign=function(a){return 0>a?-1:1},a.prototype.findTurningPoints=function(a){var b,c,d,e,f,g;for(e=[],b=f=1,g=a.length-1;g>=1?g>f:f>g;b=g>=1?++f:--f)c=this.sign(a[b]-a[b-1]),d=this.sign(a[b+1]-a[b]),c!==d&&e.push(b);return e},a.prototype.areaBetweenLineAndCurve=function(a,b,c){var d,e,f,g,h,i,j,k;for(g=c-b,j=a[b],i=a[c],d=0,f=k=0;g>=0?g>=k:k>=g;f=g>=0?++k:--k)e=a[b+f],h=j+f/g*(i-j),d+=Math.abs(h-e);return d},a}(),b.exports=new c},{}],13:[function(a,b){var c;c=function(){function a(a){this._array=(null!=a?a.slice(0):void 0)||[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}return a.prototype._array=null,a.prototype.equals=function(a){return this.toString()===a.toString()},a.prototype.identity=function(){return this.setArray([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},a.prototype.multiply=function(b){var c,d,e,f,g,h,i,j;for(f=new a,c=h=0;4>h;c=++h)for(d=i=0;4>i;d=++i)for(e=j=0;4>j;e=++j)g=f.get(c,d)+this.get(c,e)*b.get(e,d),f.set(c,d,g);return this.copy(f)},a.prototype.transpose=function(){var a;return a=this.getArray(),this.setArray([a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15]]),this},a.prototype.get=function(a,b){return this.getArray()[4*a+b]},a.prototype.set=function(a,b,c){return this._array[4*a+b]=c},a.prototype.copy=function(a){return this._array=a.getArray(),this},a.prototype.clone=function(){return new a(this.getArray())},a.prototype.getArray=function(){return this._array.slice(0)},a.prototype.setArray=function(a){return this._array=a,this},a.prototype.toString=function(){return"("+this.getArray().join(", ")+")"},a.prototype.toFixed=function(a){var b;return this._array=function(){var c,d,e,f;for(e=this._array,f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push(parseFloat(b.toFixed(a)));return f}.call(this),this},a}(),b.exports=c},{}],14:[function(a,b){var c;c=function(){function a(a,b){this.x=null!=a?a:0,this.y=null!=b?b:0}return a.prototype.x=0,a.prototype.y=0,a.prototype.add=function(b){return a.isVector2D(b)?(this.x+=b.x,this.y+=b.y,this):this._addScalar(b)},a.prototype._addScalar=function(a){return this.x+=a,this.y+=a,this},a.prototype.subtract=function(b){return a.isVector2D(b)?(this.x-=b.x,this.y-=b.y,this):this._subtractScalar(b)},a.prototype._subtractScalar=function(a){return this._addScalar(-a)},a.prototype.multiply=function(b){return a.isVector2D(b)?(this.x*=b.x,this.y*=b.y,this):this._multiplyScalar(b)},a.prototype._multiplyScalar=function(a){return this.x*=a,this.y*=a,this},a.prototype.divide=function(b){return a.isVector2D(b)?(this.x/=b.x,this.y/=b.y,this):this._divideScalar(b)},a.prototype._divideScalar=function(a){return this._multiplyScalar(1/a)},a.prototype.clone=function(){return new a(this.x,this.y)},a.prototype.copy=function(a){return this.x=a.x,this.y=a.y,this},a.prototype.equals=function(a){return a.x===this.x&&a.y===this.y},a.prototype.toString=function(){return"("+this.x+", "+this.y+")"},a.prototype.toFixed=function(a){return this.x=parseFloat(this.x.toFixed(a)),this.y=parseFloat(this.y.toFixed(a)),this},a.prototype.toArray=function(){return[this.x,this.y]},a.isVector2D=function(b){return b instanceof a},a}(),b.exports=c},{}]},{},[11])(11)});
/*! Chess.js v0.1.0 | Copyright (c) 2015, Jeff Hlywa (jhlywa@gmail.com) | github.com/jhlywa/chess.js/blob/master/LICENSE */!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Chess=a()}}(function(){var a,b,c;return function d(a,b,c){function e(g,h){if(!b[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=b[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,d,a,b,c)}return b[g].exports}for(var f="function"==typeof require&&require,g=0;g<c.length;g++)e(c[g]);return e}({1:[function(a,b,c){"use strict";function d(a){this.chess=a}d.prototype={WHITE:WHITE,BLACK:BLACK,PAWN:PAWN,KNIGHT:KNIGHT,BISHOP:BISHOP,ROOK:ROOK,QUEEN:QUEEN,KING:KING,SQUARES:["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"],FLAGS:FLAGS,load:function(a){this.chess.load(a)},reset:function(){return this.chess.reset()},moves:function(a){return this.chess.moves(a)},inCheck:function(){return this.chess.inCheck()},inCheckmate:function(){return this.chess.inCheckmate()},inStalemate:function(){return this.chess.inStalemate()},inDraw:function(){return this.chess.halfMoves>=100||this.chess.inStalemate()||this.chess.insufficientMaterial()||this.chess.inThreefoldRepetition()},insufficientMaterial:function(){return this.chess.insufficientMaterial()},inThreefoldRepetition:function(){return this.chess.inThreefoldRepetition()},gameOver:function(){return this.chess.halfMoves>=100||this.chess.inCheckmate()||this.chess.inStalemate()||this.chess.insufficientMaterial()||this.chess.inThreefoldRepetition()},validateFen:function(a){return this.chess.validateFen(a)},fen:function(){return this.chess.generateFen()},pgn:function(a){return this.chess.pgn(a)},moveFromSan:function(a){return this.chess.moveFromSan(a)},loadPgn:function(a,b){return this.chess.loadPgn(a,b)},header:function(a){return this.chess.setHeader(a)},ascii:function(){return this.chess.ascii()},turn:function(){return this.chess.turn},move:function(a){return this.chess.move(a)},undo:function(){var a=this.chess.undoMove();return a?this.chess.makePretty(a):null},clear:function(){return this.chess.clear()},put:function(a,b){return this.chess.put(a,b)},get:function(a){return this.chess.get(a)},remove:function(a){return this.chess.remove(a)},perft:function(a){return this.chess.perft(a)},squareColor:function(a){if(a in this.chess.SQUARES){var b=this.chess.SQUARES[a];return(this.chess.rank(b)+this.chess.file(b))%2===0?"light":"dark"}return null},history:function(a){var b=[],c=[],d="undefined"!=typeof a&&"verbose"in a&&a.verbose;while(this.chess.history.length>0)b.push(this.chess.undoMove());while(b.length>0){var e=b.pop();d?c.push(this.chess.makePretty(e)):c.push(this.chess.moveToSan(e)),this.chess.makeMove(e)}return c}},b.exports=d},{}],2:[function(a,b,c){"use strict";function d(a){this.board=new Array(128),this.kings={w:EMPTY,b:EMPTY},this.turn=WHITE,this.castling={w:0,b:0},this.epSquare=EMPTY,this.halfMoves=0,this.moveNumber=1,this.history=[],this.header={},"undefined"==typeof a?this.load(DEFAULT_POSITION):this.load(a)}d.prototype={clear:function(){this.board=new Array(128),this.kings={w:EMPTY,b:EMPTY},this.turn=WHITE,this.castling={w:0,b:0},this.epSquare=EMPTY,this.halfMoves=0,this.moveNumber=1,this.history=[],this.header={},this.updateSetup(this.generateFen())},reset:function(){this.load(DEFAULT_POSITION)},load:function(a){var b=a.split(/\s+/),c=b[0],d=0,e=SYMBOLS+"12345678/";if(!this.validateFen(a).valid)return!1;this.clear();for(var f=0;f<c.length;f++){var g=c.charAt(f);if("/"===g)d+=8;else if(this.isDigit(g))d+=parseInt(g,10);else{var h="a">g?WHITE:BLACK;this.put({type:g.toLowerCase(),color:h},this.algebraic(d)),d++}}return this.turn=b[1],b[2].indexOf("K")>-1&&(this.castling.w|=BITS.KSIDE_CASTLE),b[2].indexOf("Q")>-1&&(this.castling.w|=BITS.QSIDE_CASTLE),b[2].indexOf("k")>-1&&(this.castling.b|=BITS.KSIDE_CASTLE),b[2].indexOf("q")>-1&&(this.castling.b|=BITS.QSIDE_CASTLE),this.epSquare="-"===b[3]?EMPTY:SQUARES[b[3]],this.halfMoves=parseInt(b[4],10),this.moveNumber=parseInt(b[5],10),this.updateSetup(this.generateFen()),!0},validateFen:function(a){var b=a.split(/\s+/);if(6!==b.length)return{valid:!1,errorNumber:1,error:ERRORS[1]};if(isNaN(b[5])||parseInt(b[5],10)<=0)return{valid:!1,errorNumber:2,error:ERRORS[2]};if(isNaN(b[4])||parseInt(b[4],10)<0)return{valid:!1,errorNumber:3,error:ERRORS[3]};if(!/^(-|[abcdefgh][36])$/.test(b[3]))return{valid:!1,errorNumber:4,error:ERRORS[4]};if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(b[2]))return{valid:!1,errorNumber:5,error:ERRORS[5]};if(!/^(w|b)$/.test(b[1]))return{valid:!1,errorNumber:6,error:ERRORS[6]};var c=b[0].split("/");if(8!==c.length)return{valid:!1,errorNumber:7,error:ERRORS[7]};for(var d=0;d<c.length;d++){for(var e=0,f=!1,g=0;g<c[d].length;g++)if(isNaN(c[d][g])){if(!/^[prnbqkPRNBQK]$/.test(c[d][g]))return{valid:!1,errorNumber:9,error:ERRORS[9]};e+=1,f=!1}else{if(f)return{valid:!1,errorNumber:8,error:ERRORS[8]};e+=parseInt(c[d][g],10),f=!0}if(8!==e)return{valid:!1,errorNumber:10,error:ERRORS[10]}}return{valid:!0,errorNumber:0,error:ERRORS[0]}},generateFen:function(){for(var a=0,b="",c=SQUARES.a8;c<=SQUARES.h1;c++){if(null==this.board[c])a++;else{a>0&&(b+=a,a=0);var d=this.board[c].color,e=this.board[c].type;b+=d===WHITE?e.toUpperCase():e.toLowerCase()}c+1&136&&(a>0&&(b+=a),c!==SQUARES.h1&&(b+="/"),a=0,c+=8)}var f="";this.castling[WHITE]&BITS.KSIDE_CASTLE&&(f+="K"),this.castling[WHITE]&BITS.QSIDE_CASTLE&&(f+="Q"),this.castling[BLACK]&BITS.KSIDE_CASTLE&&(f+="k"),this.castling[BLACK]&BITS.QSIDE_CASTLE&&(f+="q"),f=f||"-";var g=this.epSquare===EMPTY?"-":this.algebraic(this.epSquare);return[b,this.turn,f,g,this.halfMoves,this.moveNumber].join(" ")},setHeader:function(a){for(var b=0;b<a.length;b+=2)"string"==typeof a[b]&&"string"==typeof a[b+1]&&(this.header[a[b]]=a[b+1]);return this.header},updateSetup:function(a){this.history.length>0||(a!==DEFAULT_POSITION?(this.header.SetUp="1",this.header.FEN=a):(delete this.header.SetUp,delete this.header.FEN))},get:function(a){var b=this.board[SQUARES[a]];return b?{type:b.type,color:b.color}:null},put:function(a,b){if(!("type"in a&&"color"in a))return!1;if(-1===SYMBOLS.indexOf(a.type.toLowerCase()))return!1;if(!(b in SQUARES))return!1;var c=SQUARES[b];return a.type===KING&&this.kings[a.color]!==EMPTY&&this.kings[a.color]!==c?!1:(this.board[c]={type:a.type,color:a.color},a.type===KING&&(this.kings[a.color]=c),this.updateSetup(this.generateFen()),!0)},remove:function(a){var b=this.get(a);return this.board[SQUARES[a]]=null,b&&b.type===KING&&(this.kings[b.color]=EMPTY),this.updateSetup(this.generateFen()),b},buildMove:function(a,b,c,d){var e={color:this.turn,from:a,to:b,flags:c,piece:this.board[a].type};return d&&(e.flags|=BITS.PROMOTION,e.promotion=d),this.board[b]?e.captured=this.board[b].type:c&BITS.EP_CAPTURE&&(e.captured=PAWN),e},addMove:function(a,b,c,d){if(this.board[b].type!==PAWN||this.rank(c)!==RANK_8&&this.rank(c)!==RANK_1)a.push(this.buildMove(b,c,d));else for(var e=[QUEEN,ROOK,BISHOP,KNIGHT],f=0,g=e.length;g>f;f++)a.push(this.buildMove(b,c,d,e[f]))},generateMoves:function(a){var b=[],c=this.turn,d=this.swapColor(c),e={b:RANK_7,w:RANK_2},f=SQUARES.a8,g=SQUARES.h1,h=!1,i="undefined"!=typeof a&&"legal"in a?a.legal:!0;if("undefined"!=typeof a&&"square"in a){if(!(a.square in SQUARES))return[];f=g=SQUARES[a.square],h=!0}for(var j=f;g>=j;j++)if(136&j)j+=7;else{var k=this.board[j];if(null!=k&&k.color===c)if(k.type===PAWN){var l=j+PAWN_OFFSETS[c][0];if(null==this.board[l]){this.addMove(b,j,l,BITS.NORMAL);var l=j+PAWN_OFFSETS[c][1];e[c]===this.rank(j)&&null==this.board[l]&&this.addMove(b,j,l,BITS.BIG_PAWN)}for(m=2;4>m;m++){var l=j+PAWN_OFFSETS[c][m];136&l||(null!=this.board[l]&&this.board[l].color===d?this.addMove(b,j,l,BITS.CAPTURE):l===this.epSquare&&this.addMove(b,j,l,BITS.EP_CAPTURE))}}else for(var m=0,n=PIECE_OFFSETS[k.type].length;n>m;m++){var o=PIECE_OFFSETS[k.type][m],l=j;while(!0){if(l+=o,136&l)break;if(null!=this.board[l]){if(this.board[l].color===c)break;this.addMove(b,j,l,BITS.CAPTURE);break}if(this.addMove(b,j,l,BITS.NORMAL),k.type===KNIGHT||k.type===KING)break}}}if(!h||g===this.kings[c]){if(this.castling[c]&BITS.KSIDE_CASTLE){var p=this.kings[c],q=p+2;null!=this.board[p+1]||null!=this.board[q]||this.attacked(d,this.kings[c])||this.attacked(d,p+1)||this.attacked(d,q)||this.addMove(b,this.kings[c],q,BITS.KSIDE_CASTLE)}if(this.castling[c]&BITS.QSIDE_CASTLE){var p=this.kings[c],q=p-2;null!=this.board[p-1]||null!=this.board[p-2]||null!=this.board[p-3]||this.attacked(d,this.kings[c])||this.attacked(d,p-1)||this.attacked(d,q)||this.addMove(b,this.kings[c],q,BITS.QSIDE_CASTLE)}}if(!i)return b;for(var r=[],j=0,n=b.length;n>j;j++)this.makeMove(b[j]),this.kingAttacked(c)||r.push(b[j]),this.undoMove();return r},moveToSan:function(a){var b="";if(a.flags&BITS.KSIDE_CASTLE)b="O-O";else if(a.flags&BITS.QSIDE_CASTLE)b="O-O-O";else{var c=this.getDisambiguator(a);a.piece!==PAWN&&(b+=a.piece.toUpperCase()+c),a.flags&(BITS.CAPTURE|BITS.EP_CAPTURE)&&(a.piece===PAWN&&(b+=this.algebraic(a.from)[0]),b+="x"),b+=this.algebraic(a.to),a.flags&BITS.PROMOTION&&(b+="="+a.promotion.toUpperCase())}return this.makeMove(a),this.inCheck()&&(b+=this.inCheckmate()?"#":"+"),this.undoMove(),b},moveFromSan:function(a){for(var b=a.replace(/[+#?!=]/,""),c=this.generateMoves(),d=0,e=c.length;e>d;d++)if(b===this.moveToSan(c[d]).replace(/[+#?!=]/,""))return c[d];return null},attacked:function(a,b){for(var c=SQUARES.a8;c<=SQUARES.h1;c++)if(136&c)c+=7;else if(null!=this.board[c]&&this.board[c].color===a){var d=this.board[c],e=c-b,f=e+119;if(ATTACKS[f]&1<<SHIFTS[d.type]){if(d.type===PAWN){if(e>0){if(d.color===WHITE)return!0}else if(d.color===BLACK)return!0;continue}if(d.type===KNIGHT||d.type===KING)return!0;var g=RAYS[f],h=c+g,i=!1;while(h!==b){if(null!=this.board[h]){i=!0;break}h+=g}if(!i)return!0}}return!1},kingAttacked:function(a){return this.attacked(this.swapColor(a),this.kings[a])},inCheck:function(){return this.kingAttacked(this.turn)},inCheckmate:function(){return this.inCheck()&&0===this.generateMoves().length},inStalemate:function(){return!this.inCheck()&&0===this.generateMoves().length},insufficientMaterial:function(){for(var a={},b=[],c=0,d=0,e=SQUARES.a8;e<=SQUARES.h1;e++)if(d=(d+1)%2,136&e)e+=7;else{var f=this.board[e];f&&(a[f.type]=f.type in a?a[f.type]+1:1,f.type===BISHOP&&b.push(d),c++)}if(2===c)return!0;if(3===c&&(1===a[BISHOP]||1===a[KNIGHT]))return!0;if(c===a[BISHOP]+2){for(var g=0,h=b.length,e=0;h>e;e++)g+=b[e];if(0===g||g===h)return!0}return!1},inThreefoldRepetition:function(){var a=[],b={},c=!1;while(!0){var d=this.undoMove();if(!d)break;a.push(d)}while(!0){var e=this.generateFen().split(" ").slice(0,4).join(" ");if(b[e]=e in b?b[e]+1:1,b[e]>=3&&(c=!0),!a.length)break;this.makeMove(a.pop())}return c},push:function(a){this.history.push({move:a,kings:{b:this.kings.b,w:this.kings.w},turn:this.turn,castling:{b:this.castling.b,w:this.castling.w},epSquare:this.epSquare,halfMoves:this.halfMoves,moveNumber:this.moveNumber})},makeMove:function(a){var b=this.turn,c=this.swapColor(b);if(this.push(a),this.board[a.to]=this.board[a.from],this.board[a.from]=null,a.flags&BITS.EP_CAPTURE&&(this.turn===BLACK?this.board[a.to-16]=null:this.board[a.to+16]=null),a.flags&BITS.PROMOTION&&(this.board[a.to]={type:a.promotion,color:b}),this.board[a.to].type===KING){if(this.kings[this.board[a.to].color]=a.to,a.flags&BITS.KSIDE_CASTLE){var d=a.to-1,e=a.to+1;this.board[d]=this.board[e],this.board[e]=null}else if(a.flags&BITS.QSIDE_CASTLE){var d=a.to+1,e=a.to-2;this.board[d]=this.board[e],this.board[e]=null}this.castling[b]=""}if(this.castling[b])for(var f=0,g=ROOKS[b].length;g>f;f++)if(a.from===ROOKS[b][f].square&&this.castling[b]&ROOKS[b][f].flag){this.castling[b]^=ROOKS[b][f].flag;break}if(this.castling[c])for(var f=0,g=ROOKS[c].length;g>f;f++)if(a.to===ROOKS[c][f].square&&this.castling[c]&ROOKS[c][f].flag){this.castling[c]^=ROOKS[c][f].flag;break}a.flags&BITS.BIG_PAWN?this.turn===BLACK?this.epSquare=a.to-16:this.epSquare=a.to+16:this.epSquare=EMPTY,a.piece===PAWN?this.halfMoves=0:a.flags&(BITS.CAPTURE|BITS.EP_CAPTURE)?this.halfMoves=0:this.halfMoves++,this.turn===BLACK&&this.moveNumber++,this.turn=this.swapColor(this.turn)},undoMove:function(){var a=this.history.pop();if(null==a)return null;var b=a.move;this.kings=a.kings,this.turn=a.turn,this.castling=a.castling,this.epSquare=a.epSquare,this.halfMoves=a.halfMoves,this.moveNumber=a.moveNumber;var c=this.turn,d=this.swapColor(this.turn);if(this.board[b.from]=this.board[b.to],this.board[b.from].type=b.piece,this.board[b.to]=null,b.flags&BITS.CAPTURE)this.board[b.to]={type:b.captured,color:d};else if(b.flags&BITS.EP_CAPTURE){var e;e=c===BLACK?b.to-16:b.to+16,this.board[e]={type:PAWN,color:d}}if(b.flags&(BITS.KSIDE_CASTLE|BITS.QSIDE_CASTLE)){var f,g;b.flags&BITS.KSIDE_CASTLE?(f=b.to+1,g=b.to-1):b.flags&BITS.QSIDE_CASTLE&&(f=b.to-2,g=b.to+1),this.board[f]=this.board[g],this.board[g]=null}return b},getDisambiguator:function(a){for(var b=this.generateMoves(),c=a.from,d=a.to,e=a.piece,f=0,g=0,h=0,i=0,j=b.length;j>i;i++){var k=b[i].from,l=b[i].to,m=b[i].piece;e===m&&c!==k&&d===l&&(f++,this.rank(c)===this.rank(k)&&g++,this.file(c)===this.file(k)&&h++)}return f>0?g>0&&h>0?this.algebraic(c):h>0?this.algebraic(c).charAt(1):this.algebraic(c).charAt(0):""},ascii:function(){for(var a="   +------------------------+\n",b=SQUARES.a8;b<=SQUARES.h1;b++){if(0===this.file(b)&&(a+=" "+"87654321"[this.rank(b)]+" |"),null==this.board[b])a+=" . ";else{var c=this.board[b].type,d=this.board[b].color,e=d===WHITE?c.toUpperCase():c.toLowerCase();a+=" "+e+" "}b+1&136&&(a+="|\n",b+=8)}return a+="   +------------------------+\n",a+="     a  b  c  d  e  f  g  h\n"},rank:function(a){return a>>4},file:function(a){return 15&a},algebraic:function(a){var b=this.file(a),c=this.rank(a);return"abcdefgh".substring(b,b+1)+"87654321".substring(c,c+1)},swapColor:function(a){return a===WHITE?BLACK:WHITE},isDigit:function(a){return-1!=="0123456789".indexOf(a)},makePretty:function(a){var b=this.clone(a);b.san=this.moveToSan(b),b.to=this.algebraic(b.to),b.from=this.algebraic(b.from);var c="";for(var d in BITS)BITS[d]&b.flags&&(c+=FLAGS[d]);return b.flags=c,b},moves:function(a){for(var b=this.generateMoves(a),c=[],d=0,e=b.length;e>d;d++)"undefined"!=typeof a&&"verbose"in a&&a.verbose?c.push(this.makePretty(b[d])):c.push(this.moveToSan(b[d]));return c},pgn:function(a){var b="object"==typeof a&&"string"==typeof a.newlineChar?a.newlineChar:"\n",c="object"==typeof a&&"number"==typeof a.maxWidth?a.maxWidth:0,d=[],e=!1;for(var f in this.header)d.push("["+f+' "'+this.header[f]+'"]'+b),e=!0;e&&this.history.length&&d.push(b);var g=[];while(this.history.length>0)g.push(this.undoMove());var h=[],i="",j=1;while(g.length>0){var k=g.pop();1===j&&"b"===k.color?(i="1. ...",j++):"w"===k.color&&(i.length&&h.push(i),i=j+".",j++),i=i+" "+this.moveToSan(k),this.makeMove(k)}if(i.length&&h.push(i),"undefined"!=typeof this.header.Result&&h.push(this.header.Result),0===c)return d.join("")+h.join(" ");for(var l=0,f=0;f<h.length;f++)l+h[f].length>c&&0!==f?(" "===d[d.length-1]&&d.pop(),d.push(b),l=0):0!==f&&(d.push(" "),l++),d.push(h[f]),l+=h[f].length;return d.join("")},move:function(a){var b=null,c=this.generateMoves();if("string"==typeof a){for(var d=a.replace(/[+#?!=]/,""),e=0,f=c.length;f>e;e++)if(d===this.moveToSan(c[e]).replace(/[+#?!=]/,"")){b=c[e];break}}else if("object"==typeof a)for(var e=0,f=c.length;f>e;e++)if(!(a.from!==this.algebraic(c[e].from)||a.to!==this.algebraic(c[e].to)||"promotion"in c[e]&&a.promotion!==c[e].promotion)){b=c[e];break}if(!b)return null;var g=this.makePretty(b);return this.makeMove(b),g},mask:function(a){return a.replace(/\\/g,"\\")},getMoveObj:function(a){return this.moveFromSan(this.trim(a))},hasKeys:function(a){var b=!1;for(var c in a)b=!0;return b},newlineChar:function(a){return"object"==typeof a&&"string"==typeof a.newlineChar?a.newlineChar:"\r?\n"},parsePgnHeader:function(a,b){for(var c=this.newlineChar(b),d={},e=a.split(new RegExp(this.mask(c))),f="",g="",h=0;h<e.length;h++)f=e[h].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/,"$1"),g=e[h].replace(/^\[[A-Za-z]+\s"(.*)"\]$/,"$1"),this.trim(f).length>0&&(d[f]=g);return d},loadPgn:function(a,b){var c=this.newlineChar(b),d=new RegExp("^(\\[(.|"+this.mask(c)+")*\\])("+this.mask(c)+")*1.("+this.mask(c)+"|.)*$","g"),e=a.replace(d,"$1");"["!==e[0]&&(e=""),this.reset();var f=this.parsePgnHeader(e,b);for(var g in f)this.setHeader([g,f[g]]);var h=a.replace(e,"").replace(new RegExp(this.mask(c),"g")," ");h=h.replace(/(\{[^}]+\})+?/g,""),h=h.replace(/\d+\./g,"");var i=this.trim(h).split(new RegExp(/\s+/));i=i.join(",").replace(/,,+/g,",").split(",");for(var j="",k=0;k<i.length-1;k++){if(j=this.getMoveObj(i[k]),null==j)return!1;this.makeMove(j)}if(j=i[i.length-1],POSSIBLE_RESULTS.indexOf(j)>-1)this.hasKeys(this.header)&&"undefined"==typeof this.header.Result&&this.setHeader(["Result",j]);else{if(j=this.getMoveObj(j),null==j)return!1;this.makeMove(j)}return!0},clone:function(a){var b=a instanceof Array?[]:{};for(var c in a)"object"==typeof c?b[c]=this.clone(a[c]):b[c]=a[c];return b},perft:function(a){for(var b=this.generateMoves({legal:!1}),c=0,d=this.turn,e=0,f=b.length;f>e;e++){if(this.makeMove(b[e]),!this.kingAttacked(d))if(a-1>0){var g=this.perft(a-1);c+=g}else c++;this.undoMove()}return c},trim:function(a){return a.replace(/^\s+|\s+$/g,"")}},b.exports=d},{}],3:[function(a,b,c){(function(a){"use strict";a.BLACK="b",a.WHITE="w",a.EMPTY=-1,a.PAWN="p",a.KNIGHT="n",a.BISHOP="b",a.ROOK="r",a.QUEEN="q",a.KING="k",a.SYMBOLS="pnbrqkPNBRQK",a.DEFAULT_POSITION="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",a.POSSIBLE_RESULTS=["1-0","0-1","1/2-1/2","*"],a.PAWN_OFFSETS={b:[16,32,17,15],w:[-16,-32,-17,-15]},a.PIECE_OFFSETS={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},a.ATTACKS=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],a.RAYS=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],a.SHIFTS={p:0,n:1,b:2,r:3,q:4,k:5},a.FLAGS={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"},a.BITS={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},a.RANK_1=7,a.RANK_2=6,a.RANK_3=5,a.RANK_4=4,a.RANK_5=3,a.RANK_6=2,a.RANK_7=1,a.RANK_8=0,a.SQUARES={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},a.ROOKS={w:[{square:SQUARES.a1,flag:BITS.QSIDE_CASTLE},{square:SQUARES.h1,flag:BITS.KSIDE_CASTLE}],b:[{square:SQUARES.a8,flag:BITS.QSIDE_CASTLE},{square:SQUARES.h8,flag:BITS.KSIDE_CASTLE}]},a.ERRORS={0:"No errors.",1:"FEN string must contain six space-delimited fields.",2:"6th field (move number) must be a positive integer.",3:"5th field (half move counter) must be a non-negative integer.",4:"4th field (en-passant square) is invalid.",5:"3rd field (castling availability) is invalid.",6:"2nd field (side to move) is invalid.",7:"1st field (piece positions) does not contain 8 '/'-delimited rows.",8:"1st field (piece positions) is invalid [consecutive numbers].",9:"1st field (piece positions) is invalid [invalid piece].",10:"1st field (piece positions) is invalid [row too large]."}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(a,b,c){"use strict";a("./globals");var d=a("./chess"),e=a("./api");b.exports=function(a){return new e(new d(a))}},{"./api":1,"./chess":2,"./globals":3}]},{},[4])(4)});
/*! head.core - v1.0.2 */
(function(n,t){"use strict";function r(n){a[a.length]=n}function k(n){var t=new RegExp(" ?\\b"+n+"\\b");c.className=c.className.replace(t,"")}function p(n,t){for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}function tt(){var t,e,f,o;c.className=c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");t=n.innerWidth||c.clientWidth;e=n.outerWidth||n.screen.width;u.screen.innerWidth=t;u.screen.outerWidth=e;r("w-"+t);p(i.screens,function(n){t>n?(i.screensCss.gt&&r("gt-"+n),i.screensCss.gte&&r("gte-"+n)):t<n?(i.screensCss.lt&&r("lt-"+n),i.screensCss.lte&&r("lte-"+n)):t===n&&(i.screensCss.lte&&r("lte-"+n),i.screensCss.eq&&r("e-q"+n),i.screensCss.gte&&r("gte-"+n))});f=n.innerHeight||c.clientHeight;o=n.outerHeight||n.screen.height;u.screen.innerHeight=f;u.screen.outerHeight=o;u.feature("portrait",f>t);u.feature("landscape",f<t)}function it(){n.clearTimeout(b);b=n.setTimeout(tt,50)}var y=n.document,rt=n.navigator,ut=n.location,c=y.documentElement,a=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"},v,u,s,w,o,h,l,d,f,g,nt,e,b;if(n.head_conf)for(v in n.head_conf)n.head_conf[v]!==t&&(i[v]=n.head_conf[v]);u=n[i.head]=function(){u.ready.apply(null,arguments)};u.feature=function(n,t,i){return n?(Object.prototype.toString.call(t)==="[object Function]"&&(t=t.call()),r((t?"":"no-")+n),u[n]=!!t,i||(k("no-"+n),k(n),u.feature()),u):(c.className+=" "+a.join(" "),a=[],u)};u.feature("js",!0);s=rt.userAgent.toLowerCase();w=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);u.feature("mobile",w,!0);u.feature("desktop",!w,!0);s=/(chrome|firefox)[ \/]([\w.]+)/.exec(s)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||/(trident).+rv:(\w.)+/.exec(s)||[];o=s[1];h=parseFloat(s[2]);switch(o){case"msie":case"trident":o="ie";h=y.documentMode||h;break;case"firefox":o="ff";break;case"ipod":case"ipad":case"iphone":o="ios";break;case"webkit":o="safari"}for(u.browser={name:o,version:h},u.browser[o]=!0,l=0,d=i.browsers.length;l<d;l++)for(f in i.browsers[l])if(o===f)for(r(f),g=i.browsers[l][f].min,nt=i.browsers[l][f].max,e=g;e<=nt;e++)h>e?(i.browserCss.gt&&r("gt-"+f+e),i.browserCss.gte&&r("gte-"+f+e)):h<e?(i.browserCss.lt&&r("lt-"+f+e),i.browserCss.lte&&r("lte-"+f+e)):h===e&&(i.browserCss.lte&&r("lte-"+f+e),i.browserCss.eq&&r("eq-"+f+e),i.browserCss.gte&&r("gte-"+f+e));else r("no-"+f);r(o);r(o+parseInt(h,10));i.html5&&o==="ie"&&h<9&&p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(n){y.createElement(n)});p(ut.pathname.split("/"),function(n,u){if(this.length>2&&this[u+1]!==t)u&&r(this.slice(u,u+1).join("-").toLowerCase()+i.section);else{var f=n||"index",e=f.indexOf(".");e>0&&(f=f.substring(0,e));c.id=f.toLowerCase()+i.page;u||r("root"+i.section)}});u.screen={height:n.screen.height,width:n.screen.width};tt();b=0;n.addEventListener?n.addEventListener("resize",it,!1):n.attachEvent("onresize",it)})(window);
/*! head.css3 - v1.0.0 */
(function(n,t){"use strict";function a(n){for(var r in n)if(i[n[r]]!==t)return!0;return!1}function r(n){var t=n.charAt(0).toUpperCase()+n.substr(1),i=(n+" "+c.join(t+" ")+t).split(" ");return!!a(i)}var h=n.document,o=h.createElement("i"),i=o.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),c="Webkit Moz O ms Khtml".split(" "),l=n.head_conf&&n.head_conf.head||"head",u=n[l],f={gradient:function(){var n="background-image:";return i.cssText=(n+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+n)+s.join("linear-gradient(left top,#eee,#fff);"+n)).slice(0,-n.length),!!i.backgroundImage},rgba:function(){return i.cssText="background-color:rgba(0,0,0,0.5)",!!i.backgroundColor},opacity:function(){return o.style.opacity===""},textshadow:function(){return i.textShadow===""},multiplebgs:function(){i.cssText="background:url(https://),url(https://),red url(https://)";var n=(i.background||"").match(/url/g);return Object.prototype.toString.call(n)==="[object Array]"&&n.length===3},boxshadow:function(){return r("boxShadow")},borderimage:function(){return r("borderImage")},borderradius:function(){return r("borderRadius")},cssreflections:function(){return r("boxReflect")},csstransforms:function(){return r("transform")},csstransitions:function(){return r("transition")},touch:function(){return"ontouchstart"in n},retina:function(){return n.devicePixelRatio>1},fontface:function(){var t=u.browser.name,n=u.browser.version;switch(t){case"ie":return n>=9;case"chrome":return n>=13;case"ff":return n>=6;case"ios":return n>=5;case"android":return!1;case"webkit":return n>=5.1;case"opera":return n>=10;default:return!1}}};for(var e in f)f[e]&&u.feature(e,f[e].call(),!0);u.feature()})(window);
/*! head.load - v1.0.3 */
(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);
/*
//# sourceMappingURL=head.min.js.map
*/
/**
 * @license
 * lodash 3.10.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */
;(function(){function n(n,t){if(n!==t){var r=null===n,e=n===w,u=n===n,o=null===t,i=t===w,f=t===t;if(n>t&&!o||!u||r&&!i&&f||e&&f)return 1;if(n<t&&!r||!f||o&&!e&&u||i&&u)return-1}return 0}function t(n,t,r){for(var e=n.length,u=r?e:-1;r?u--:++u<e;)if(t(n[u],u,n))return u;return-1}function r(n,t,r){if(t!==t)return p(n,r);r-=1;for(var e=n.length;++r<e;)if(n[r]===t)return r;return-1}function e(n){return typeof n=="function"||false}function u(n){return null==n?"":n+""}function o(n,t){for(var r=-1,e=n.length;++r<e&&-1<t.indexOf(n.charAt(r)););
return r}function i(n,t){for(var r=n.length;r--&&-1<t.indexOf(n.charAt(r)););return r}function f(t,r){return n(t.a,r.a)||t.b-r.b}function a(n){return Nn[n]}function c(n){return Tn[n]}function l(n,t,r){return t?n=Bn[n]:r&&(n=Dn[n]),"\\"+n}function s(n){return"\\"+Dn[n]}function p(n,t,r){var e=n.length;for(t+=r?0:-1;r?t--:++t<e;){var u=n[t];if(u!==u)return t}return-1}function h(n){return!!n&&typeof n=="object"}function _(n){return 160>=n&&9<=n&&13>=n||32==n||160==n||5760==n||6158==n||8192<=n&&(8202>=n||8232==n||8233==n||8239==n||8287==n||12288==n||65279==n);
}function v(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;)n[r]===t&&(n[r]=z,o[++u]=r);return o}function g(n){for(var t=-1,r=n.length;++t<r&&_(n.charCodeAt(t)););return t}function y(n){for(var t=n.length;t--&&_(n.charCodeAt(t)););return t}function d(n){return Ln[n]}function m(_){function Nn(n){if(h(n)&&!(Oo(n)||n instanceof zn)){if(n instanceof Ln)return n;if(nu.call(n,"__chain__")&&nu.call(n,"__wrapped__"))return Mr(n)}return new Ln(n)}function Tn(){}function Ln(n,t,r){this.__wrapped__=n,this.__actions__=r||[],
this.__chain__=!!t}function zn(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=Ru,this.__views__=[]}function Bn(){this.__data__={}}function Dn(n){var t=n?n.length:0;for(this.data={hash:gu(null),set:new lu};t--;)this.push(n[t])}function Mn(n,t){var r=n.data;return(typeof t=="string"||ge(t)?r.set.has(t):r.hash[t])?0:-1}function qn(n,t){var r=-1,e=n.length;for(t||(t=Be(e));++r<e;)t[r]=n[r];return t}function Pn(n,t){for(var r=-1,e=n.length;++r<e&&false!==t(n[r],r,n););
return n}function Kn(n,t){for(var r=-1,e=n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function Vn(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;){var i=n[r];t(i,r,n)&&(o[++u]=i)}return o}function Gn(n,t){for(var r=-1,e=n.length,u=Be(e);++r<e;)u[r]=t(n[r],r,n);return u}function Jn(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function Xn(n,t,r,e){var u=-1,o=n.length;for(e&&o&&(r=n[++u]);++u<o;)r=t(r,n[u],u,n);return r}function Hn(n,t){for(var r=-1,e=n.length;++r<e;)if(t(n[r],r,n))return true;
return false}function Qn(n,t,r,e){return n!==w&&nu.call(e,r)?n:t}function nt(n,t,r){for(var e=-1,u=zo(t),o=u.length;++e<o;){var i=u[e],f=n[i],a=r(f,t[i],i,n,t);(a===a?a===f:f!==f)&&(f!==w||i in n)||(n[i]=a)}return n}function tt(n,t){return null==t?n:et(t,zo(t),n)}function rt(n,t){for(var r=-1,e=null==n,u=!e&&Er(n),o=u?n.length:0,i=t.length,f=Be(i);++r<i;){var a=t[r];f[r]=u?Cr(a,o)?n[a]:w:e?w:n[a]}return f}function et(n,t,r){r||(r={});for(var e=-1,u=t.length;++e<u;){var o=t[e];r[o]=n[o]}return r}function ut(n,t,r){
var e=typeof n;return"function"==e?t===w?n:Bt(n,t,r):null==n?Fe:"object"==e?bt(n):t===w?ze(n):xt(n,t)}function ot(n,t,r,e,u,o,i){var f;if(r&&(f=u?r(n,e,u):r(n)),f!==w)return f;if(!ge(n))return n;if(e=Oo(n)){if(f=kr(n),!t)return qn(n,f)}else{var a=ru.call(n),c=a==K;if(a!=Z&&a!=B&&(!c||u))return Fn[a]?Rr(n,a,t):u?n:{};if(f=Ir(c?{}:n),!t)return tt(f,n)}for(o||(o=[]),i||(i=[]),u=o.length;u--;)if(o[u]==n)return i[u];return o.push(n),i.push(f),(e?Pn:_t)(n,function(e,u){f[u]=ot(e,t,r,u,n,o,i)}),f}function it(n,t,r){
if(typeof n!="function")throw new Ge(L);return su(function(){n.apply(w,r)},t)}function ft(n,t){var e=n?n.length:0,u=[];if(!e)return u;var o=-1,i=xr(),f=i===r,a=f&&t.length>=F&&gu&&lu?new Dn(t):null,c=t.length;a&&(i=Mn,f=false,t=a);n:for(;++o<e;)if(a=n[o],f&&a===a){for(var l=c;l--;)if(t[l]===a)continue n;u.push(a)}else 0>i(t,a,0)&&u.push(a);return u}function at(n,t){var r=true;return Su(n,function(n,e,u){return r=!!t(n,e,u)}),r}function ct(n,t,r,e){var u=e,o=u;return Su(n,function(n,i,f){i=+t(n,i,f),(r(i,u)||i===e&&i===o)&&(u=i,
o=n)}),o}function lt(n,t){var r=[];return Su(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function st(n,t,r,e){var u;return r(n,function(n,r,o){return t(n,r,o)?(u=e?r:n,false):void 0}),u}function pt(n,t,r,e){e||(e=[]);for(var u=-1,o=n.length;++u<o;){var i=n[u];h(i)&&Er(i)&&(r||Oo(i)||pe(i))?t?pt(i,t,r,e):Jn(e,i):r||(e[e.length]=i)}return e}function ht(n,t){Nu(n,t,Re)}function _t(n,t){return Nu(n,t,zo)}function vt(n,t){return Tu(n,t,zo)}function gt(n,t){for(var r=-1,e=t.length,u=-1,o=[];++r<e;){var i=t[r];
ve(n[i])&&(o[++u]=i)}return o}function yt(n,t,r){if(null!=n){r!==w&&r in Br(n)&&(t=[r]),r=0;for(var e=t.length;null!=n&&r<e;)n=n[t[r++]];return r&&r==e?n:w}}function dt(n,t,r,e,u,o){if(n===t)n=true;else if(null==n||null==t||!ge(n)&&!h(t))n=n!==n&&t!==t;else n:{var i=dt,f=Oo(n),a=Oo(t),c=D,l=D;f||(c=ru.call(n),c==B?c=Z:c!=Z&&(f=xe(n))),a||(l=ru.call(t),l==B?l=Z:l!=Z&&xe(t));var s=c==Z,a=l==Z,l=c==l;if(!l||f||s){if(!e&&(c=s&&nu.call(n,"__wrapped__"),a=a&&nu.call(t,"__wrapped__"),c||a)){n=i(c?n.value():n,a?t.value():t,r,e,u,o);
break n}if(l){for(u||(u=[]),o||(o=[]),c=u.length;c--;)if(u[c]==n){n=o[c]==t;break n}u.push(n),o.push(t),n=(f?yr:mr)(n,t,i,r,e,u,o),u.pop(),o.pop()}else n=false}else n=dr(n,t,c)}return n}function mt(n,t,r){var e=t.length,u=e,o=!r;if(null==n)return!u;for(n=Br(n);e--;){var i=t[e];if(o&&i[2]?i[1]!==n[i[0]]:!(i[0]in n))return false}for(;++e<u;){var i=t[e],f=i[0],a=n[f],c=i[1];if(o&&i[2]){if(a===w&&!(f in n))return false}else if(i=r?r(a,c,f):w,i===w?!dt(c,a,r,true):!i)return false}return true}function wt(n,t){var r=-1,e=Er(n)?Be(n.length):[];
return Su(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function bt(n){var t=Ar(n);if(1==t.length&&t[0][2]){var r=t[0][0],e=t[0][1];return function(n){return null==n?false:n[r]===e&&(e!==w||r in Br(n))}}return function(n){return mt(n,t)}}function xt(n,t){var r=Oo(n),e=Wr(n)&&t===t&&!ge(t),u=n+"";return n=Dr(n),function(o){if(null==o)return false;var i=u;if(o=Br(o),!(!r&&e||i in o)){if(o=1==n.length?o:yt(o,Et(n,0,-1)),null==o)return false;i=Zr(n),o=Br(o)}return o[i]===t?t!==w||i in o:dt(t,o[i],w,true)}}function At(n,t,r,e,u){
if(!ge(n))return n;var o=Er(t)&&(Oo(t)||xe(t)),i=o?w:zo(t);return Pn(i||t,function(f,a){if(i&&(a=f,f=t[a]),h(f)){e||(e=[]),u||(u=[]);n:{for(var c=a,l=e,s=u,p=l.length,_=t[c];p--;)if(l[p]==_){n[c]=s[p];break n}var p=n[c],v=r?r(p,_,c,n,t):w,g=v===w;g&&(v=_,Er(_)&&(Oo(_)||xe(_))?v=Oo(p)?p:Er(p)?qn(p):[]:me(_)||pe(_)?v=pe(p)?ke(p):me(p)?p:{}:g=false),l.push(_),s.push(v),g?n[c]=At(v,_,r,l,s):(v===v?v!==p:p===p)&&(n[c]=v)}}else c=n[a],l=r?r(c,f,a,n,t):w,(s=l===w)&&(l=f),l===w&&(!o||a in n)||!s&&(l===l?l===c:c!==c)||(n[a]=l);
}),n}function jt(n){return function(t){return null==t?w:t[n]}}function kt(n){var t=n+"";return n=Dr(n),function(r){return yt(r,n,t)}}function It(n,t){for(var r=n?t.length:0;r--;){var e=t[r];if(e!=u&&Cr(e)){var u=e;pu.call(n,e,1)}}}function Rt(n,t){return n+yu(ku()*(t-n+1))}function Ot(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function Et(n,t,r){var e=-1,u=n.length;for(t=null==t?0:+t||0,0>t&&(t=-t>u?0:u+t),r=r===w||r>u?u:+r||0,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Be(u);++e<u;)r[e]=n[e+t];
return r}function Ct(n,t){var r;return Su(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function Ut(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function Wt(t,r,e){var u=wr(),o=-1;return r=Gn(r,function(n){return u(n)}),t=wt(t,function(n){return{a:Gn(r,function(t){return t(n)}),b:++o,c:n}}),Ut(t,function(t,r){var u;n:{for(var o=-1,i=t.a,f=r.a,a=i.length,c=e.length;++o<a;)if(u=n(i[o],f[o])){if(o>=c)break n;o=e[o],u*="asc"===o||true===o?1:-1;break n}u=t.b-r.b}return u})}function $t(n,t){
var r=0;return Su(n,function(n,e,u){r+=+t(n,e,u)||0}),r}function St(n,t){var e=-1,u=xr(),o=n.length,i=u===r,f=i&&o>=F,a=f&&gu&&lu?new Dn(void 0):null,c=[];a?(u=Mn,i=false):(f=false,a=t?[]:c);n:for(;++e<o;){var l=n[e],s=t?t(l,e,n):l;if(i&&l===l){for(var p=a.length;p--;)if(a[p]===s)continue n;t&&a.push(s),c.push(l)}else 0>u(a,s,0)&&((t||f)&&a.push(s),c.push(l))}return c}function Ft(n,t){for(var r=-1,e=t.length,u=Be(e);++r<e;)u[r]=n[t[r]];return u}function Nt(n,t,r,e){for(var u=n.length,o=e?u:-1;(e?o--:++o<u)&&t(n[o],o,n););
return r?Et(n,e?0:o,e?o+1:u):Et(n,e?o+1:0,e?u:o)}function Tt(n,t){var r=n;r instanceof zn&&(r=r.value());for(var e=-1,u=t.length;++e<u;)var o=t[e],r=o.func.apply(o.thisArg,Jn([r],o.args));return r}function Lt(n,t,r){var e=0,u=n?n.length:e;if(typeof t=="number"&&t===t&&u<=Eu){for(;e<u;){var o=e+u>>>1,i=n[o];(r?i<=t:i<t)&&null!==i?e=o+1:u=o}return u}return zt(n,t,Fe,r)}function zt(n,t,r,e){t=r(t);for(var u=0,o=n?n.length:0,i=t!==t,f=null===t,a=t===w;u<o;){var c=yu((u+o)/2),l=r(n[c]),s=l!==w,p=l===l;
(i?p||e:f?p&&s&&(e||null!=l):a?p&&(e||s):null==l?0:e?l<=t:l<t)?u=c+1:o=c}return xu(o,Ou)}function Bt(n,t,r){if(typeof n!="function")return Fe;if(t===w)return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,o){return n.call(t,r,e,u,o)};case 5:return function(r,e,u,o,i){return n.call(t,r,e,u,o,i)}}return function(){return n.apply(t,arguments)}}function Dt(n){var t=new ou(n.byteLength);return new hu(t).set(new hu(n)),
t}function Mt(n,t,r){for(var e=r.length,u=-1,o=bu(n.length-e,0),i=-1,f=t.length,a=Be(f+o);++i<f;)a[i]=t[i];for(;++u<e;)a[r[u]]=n[u];for(;o--;)a[i++]=n[u++];return a}function qt(n,t,r){for(var e=-1,u=r.length,o=-1,i=bu(n.length-u,0),f=-1,a=t.length,c=Be(i+a);++o<i;)c[o]=n[o];for(i=o;++f<a;)c[i+f]=t[f];for(;++e<u;)c[i+r[e]]=n[o++];return c}function Pt(n,t){return function(r,e,u){var o=t?t():{};if(e=wr(e,u,3),Oo(r)){u=-1;for(var i=r.length;++u<i;){var f=r[u];n(o,f,e(f,u,r),r)}}else Su(r,function(t,r,u){
n(o,t,e(t,r,u),u)});return o}}function Kt(n){return le(function(t,r){var e=-1,u=null==t?0:r.length,o=2<u?r[u-2]:w,i=2<u?r[2]:w,f=1<u?r[u-1]:w;for(typeof o=="function"?(o=Bt(o,f,5),u-=2):(o=typeof f=="function"?f:w,u-=o?1:0),i&&Ur(r[0],r[1],i)&&(o=3>u?w:o,u=1);++e<u;)(i=r[e])&&n(t,i,o);return t})}function Vt(n,t){return function(r,e){var u=r?Bu(r):0;if(!Sr(u))return n(r,e);for(var o=t?u:-1,i=Br(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}function Zt(n){return function(t,r,e){var u=Br(t);e=e(t);for(var o=e.length,i=n?o:-1;n?i--:++i<o;){
var f=e[i];if(false===r(u[f],f,u))break}return t}}function Yt(n,t){function r(){return(this&&this!==Zn&&this instanceof r?e:n).apply(t,arguments)}var e=Jt(n);return r}function Gt(n){return function(t){var r=-1;t=$e(Ce(t));for(var e=t.length,u="";++r<e;)u=n(u,t[r],r);return u}}function Jt(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:
return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=$u(n.prototype),t=n.apply(r,t);return ge(t)?t:r}}function Xt(n){function t(r,e,u){return u&&Ur(r,e,u)&&(e=w),r=gr(r,n,w,w,w,w,w,e),r.placeholder=t.placeholder,r}return t}function Ht(n,t){return le(function(r){var e=r[0];return null==e?e:(r.push(t),n.apply(w,r))})}function Qt(n,t){return function(r,e,u){if(u&&Ur(r,e,u)&&(e=w),e=wr(e,u,3),1==e.length){
u=r=Oo(r)?r:zr(r);for(var o=e,i=-1,f=u.length,a=t,c=a;++i<f;){var l=u[i],s=+o(l);n(s,a)&&(a=s,c=l)}if(u=c,!r.length||u!==t)return u}return ct(r,e,n,t)}}function nr(n,r){return function(e,u,o){return u=wr(u,o,3),Oo(e)?(u=t(e,u,r),-1<u?e[u]:w):st(e,u,n)}}function tr(n){return function(r,e,u){return r&&r.length?(e=wr(e,u,3),t(r,e,n)):-1}}function rr(n){return function(t,r,e){return r=wr(r,e,3),st(t,r,n,true)}}function er(n){return function(){for(var t,r=arguments.length,e=n?r:-1,u=0,o=Be(r);n?e--:++e<r;){
var i=o[u++]=arguments[e];if(typeof i!="function")throw new Ge(L);!t&&Ln.prototype.thru&&"wrapper"==br(i)&&(t=new Ln([],true))}for(e=t?-1:r;++e<r;){var i=o[e],u=br(i),f="wrapper"==u?zu(i):w;t=f&&$r(f[0])&&f[1]==(E|k|R|C)&&!f[4].length&&1==f[9]?t[br(f[0])].apply(t,f[3]):1==i.length&&$r(i)?t[u]():t.thru(i)}return function(){var n=arguments,e=n[0];if(t&&1==n.length&&Oo(e)&&e.length>=F)return t.plant(e).value();for(var u=0,n=r?o[u].apply(this,n):e;++u<r;)n=o[u].call(this,n);return n}}}function ur(n,t){
return function(r,e,u){return typeof e=="function"&&u===w&&Oo(r)?n(r,e):t(r,Bt(e,u,3))}}function or(n){return function(t,r,e){return(typeof r!="function"||e!==w)&&(r=Bt(r,e,3)),n(t,r,Re)}}function ir(n){return function(t,r,e){return(typeof r!="function"||e!==w)&&(r=Bt(r,e,3)),n(t,r)}}function fr(n){return function(t,r,e){var u={};return r=wr(r,e,3),_t(t,function(t,e,o){o=r(t,e,o),e=n?o:e,t=n?t:o,u[e]=t}),u}}function ar(n){return function(t,r,e){return t=u(t),(n?t:"")+pr(t,r,e)+(n?"":t)}}function cr(n){
var t=le(function(r,e){var u=v(e,t.placeholder);return gr(r,n,w,e,u)});return t}function lr(n,t){return function(r,e,u,o){var i=3>arguments.length;return typeof e=="function"&&o===w&&Oo(r)?n(r,e,u,i):Ot(r,wr(e,o,4),u,i,t)}}function sr(n,t,r,e,u,o,i,f,a,c){function l(){for(var m=arguments.length,b=m,j=Be(m);b--;)j[b]=arguments[b];if(e&&(j=Mt(j,e,u)),o&&(j=qt(j,o,i)),_||y){var b=l.placeholder,k=v(j,b),m=m-k.length;if(m<c){var I=f?qn(f):w,m=bu(c-m,0),E=_?k:w,k=_?w:k,C=_?j:w,j=_?w:j;return t|=_?R:O,t&=~(_?O:R),
g||(t&=~(x|A)),j=[n,t,r,C,E,j,k,I,a,m],I=sr.apply(w,j),$r(n)&&Du(I,j),I.placeholder=b,I}}if(b=p?r:this,I=h?b[n]:n,f)for(m=j.length,E=xu(f.length,m),k=qn(j);E--;)C=f[E],j[E]=Cr(C,m)?k[C]:w;return s&&a<j.length&&(j.length=a),this&&this!==Zn&&this instanceof l&&(I=d||Jt(n)),I.apply(b,j)}var s=t&E,p=t&x,h=t&A,_=t&k,g=t&j,y=t&I,d=h?w:Jt(n);return l}function pr(n,t,r){return n=n.length,t=+t,n<t&&mu(t)?(t-=n,r=null==r?" ":r+"",Ue(r,vu(t/r.length)).slice(0,t)):""}function hr(n,t,r,e){function u(){for(var t=-1,f=arguments.length,a=-1,c=e.length,l=Be(c+f);++a<c;)l[a]=e[a];
for(;f--;)l[a++]=arguments[++t];return(this&&this!==Zn&&this instanceof u?i:n).apply(o?r:this,l)}var o=t&x,i=Jt(n);return u}function _r(n){var t=Pe[n];return function(n,r){return(r=r===w?0:+r||0)?(r=au(10,r),t(n*r)/r):t(n)}}function vr(n){return function(t,r,e,u){var o=wr(e);return null==e&&o===ut?Lt(t,r,n):zt(t,r,o(e,u,1),n)}}function gr(n,t,r,e,u,o,i,f){var a=t&A;if(!a&&typeof n!="function")throw new Ge(L);var c=e?e.length:0;if(c||(t&=~(R|O),e=u=w),c-=u?u.length:0,t&O){var l=e,s=u;e=u=w}var p=a?w:zu(n);
return r=[n,t,r,e,u,l,s,o,i,f],p&&(e=r[1],t=p[1],f=e|t,u=t==E&&e==k||t==E&&e==C&&r[7].length<=p[8]||t==(E|C)&&e==k,(f<E||u)&&(t&x&&(r[2]=p[2],f|=e&x?0:j),(e=p[3])&&(u=r[3],r[3]=u?Mt(u,e,p[4]):qn(e),r[4]=u?v(r[3],z):qn(p[4])),(e=p[5])&&(u=r[5],r[5]=u?qt(u,e,p[6]):qn(e),r[6]=u?v(r[5],z):qn(p[6])),(e=p[7])&&(r[7]=qn(e)),t&E&&(r[8]=null==r[8]?p[8]:xu(r[8],p[8])),null==r[9]&&(r[9]=p[9]),r[0]=p[0],r[1]=f),t=r[1],f=r[9]),r[9]=null==f?a?0:n.length:bu(f-c,0)||0,(p?Lu:Du)(t==x?Yt(r[0],r[2]):t!=R&&t!=(x|R)||r[4].length?sr.apply(w,r):hr.apply(w,r),r);
}function yr(n,t,r,e,u,o,i){var f=-1,a=n.length,c=t.length;if(a!=c&&(!u||c<=a))return false;for(;++f<a;){var l=n[f],c=t[f],s=e?e(u?c:l,u?l:c,f):w;if(s!==w){if(s)continue;return false}if(u){if(!Hn(t,function(n){return l===n||r(l,n,e,u,o,i)}))return false}else if(l!==c&&!r(l,c,e,u,o,i))return false}return true}function dr(n,t,r){switch(r){case M:case q:return+n==+t;case P:return n.name==t.name&&n.message==t.message;case V:return n!=+n?t!=+t:n==+t;case Y:case G:return n==t+""}return false}function mr(n,t,r,e,u,o,i){var f=zo(n),a=f.length,c=zo(t).length;
if(a!=c&&!u)return false;for(c=a;c--;){var l=f[c];if(!(u?l in t:nu.call(t,l)))return false}for(var s=u;++c<a;){var l=f[c],p=n[l],h=t[l],_=e?e(u?h:p,u?p:h,l):w;if(_===w?!r(p,h,e,u,o,i):!_)return false;s||(s="constructor"==l)}return s||(r=n.constructor,e=t.constructor,!(r!=e&&"constructor"in n&&"constructor"in t)||typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)?true:false}function wr(n,t,r){var e=Nn.callback||Se,e=e===Se?ut:e;return r?e(n,t,r):e}function br(n){for(var t=n.name+"",r=Wu[t],e=r?r.length:0;e--;){
var u=r[e],o=u.func;if(null==o||o==n)return u.name}return t}function xr(n,t,e){var u=Nn.indexOf||Vr,u=u===Vr?r:u;return n?u(n,t,e):u}function Ar(n){n=Oe(n);for(var t=n.length;t--;){var r=n[t][1];n[t][2]=r===r&&!ge(r)}return n}function jr(n,t){var r=null==n?w:n[t];return ye(r)?r:w}function kr(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&nu.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Ir(n){return n=n.constructor,typeof n=="function"&&n instanceof n||(n=Ve),
new n}function Rr(n,t,r){var e=n.constructor;switch(t){case J:return Dt(n);case M:case q:return new e(+n);case X:case H:case Q:case nn:case tn:case rn:case en:case un:case on:return t=n.buffer,new e(r?Dt(t):t,n.byteOffset,n.length);case V:case G:return new e(n);case Y:var u=new e(n.source,kn.exec(n));u.lastIndex=n.lastIndex}return u}function Or(n,t,r){return null==n||Wr(t,n)||(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),t=Zr(t)),t=null==n?n:n[t],null==t?w:t.apply(n,r)}function Er(n){return null!=n&&Sr(Bu(n));
}function Cr(n,t){return n=typeof n=="number"||On.test(n)?+n:-1,t=null==t?Cu:t,-1<n&&0==n%1&&n<t}function Ur(n,t,r){if(!ge(r))return false;var e=typeof t;return("number"==e?Er(r)&&Cr(t,r.length):"string"==e&&t in r)?(t=r[t],n===n?n===t:t!==t):false}function Wr(n,t){var r=typeof n;return"string"==r&&dn.test(n)||"number"==r?true:Oo(n)?false:!yn.test(n)||null!=t&&n in Br(t)}function $r(n){var t=br(n),r=Nn[t];return typeof r=="function"&&t in zn.prototype?n===r?true:(t=zu(r),!!t&&n===t[0]):false}function Sr(n){return typeof n=="number"&&-1<n&&0==n%1&&n<=Cu;
}function Fr(n,t){return n===w?t:Eo(n,t,Fr)}function Nr(n,t){n=Br(n);for(var r=-1,e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])}return u}function Tr(n,t){var r={};return ht(n,function(n,e,u){t(n,e,u)&&(r[e]=n)}),r}function Lr(n){for(var t=Re(n),r=t.length,e=r&&n.length,u=!!e&&Sr(e)&&(Oo(n)||pe(n)),o=-1,i=[];++o<r;){var f=t[o];(u&&Cr(f,e)||nu.call(n,f))&&i.push(f)}return i}function zr(n){return null==n?[]:Er(n)?ge(n)?n:Ve(n):Ee(n)}function Br(n){return ge(n)?n:Ve(n)}function Dr(n){if(Oo(n))return n;
var t=[];return u(n).replace(mn,function(n,r,e,u){t.push(e?u.replace(An,"$1"):r||n)}),t}function Mr(n){return n instanceof zn?n.clone():new Ln(n.__wrapped__,n.__chain__,qn(n.__actions__))}function qr(n,t,r){return n&&n.length?((r?Ur(n,t,r):null==t)&&(t=1),Et(n,0>t?0:t)):[]}function Pr(n,t,r){var e=n?n.length:0;return e?((r?Ur(n,t,r):null==t)&&(t=1),t=e-(+t||0),Et(n,0,0>t?0:t)):[]}function Kr(n){return n?n[0]:w}function Vr(n,t,e){var u=n?n.length:0;if(!u)return-1;if(typeof e=="number")e=0>e?bu(u+e,0):e;else if(e)return e=Lt(n,t),
e<u&&(t===t?t===n[e]:n[e]!==n[e])?e:-1;return r(n,t,e||0)}function Zr(n){var t=n?n.length:0;return t?n[t-1]:w}function Yr(n){return qr(n,1)}function Gr(n,t,e,u){if(!n||!n.length)return[];null!=t&&typeof t!="boolean"&&(u=e,e=Ur(n,t,u)?w:t,t=false);var o=wr();if((null!=e||o!==ut)&&(e=o(e,u,3)),t&&xr()===r){t=e;var i;e=-1,u=n.length;for(var o=-1,f=[];++e<u;){var a=n[e],c=t?t(a,e,n):a;e&&i===c||(i=c,f[++o]=a)}n=f}else n=St(n,e);return n}function Jr(n){if(!n||!n.length)return[];var t=-1,r=0;n=Vn(n,function(n){
return Er(n)?(r=bu(n.length,r),true):void 0});for(var e=Be(r);++t<r;)e[t]=Gn(n,jt(t));return e}function Xr(n,t,r){return n&&n.length?(n=Jr(n),null==t?n:(t=Bt(t,r,4),Gn(n,function(n){return Xn(n,t,w,true)}))):[]}function Hr(n,t){var r=-1,e=n?n.length:0,u={};for(!e||t||Oo(n[0])||(t=[]);++r<e;){var o=n[r];t?u[o]=t[r]:o&&(u[o[0]]=o[1])}return u}function Qr(n){return n=Nn(n),n.__chain__=true,n}function ne(n,t,r){return t.call(r,n)}function te(n,t,r){var e=Oo(n)?Kn:at;return r&&Ur(n,t,r)&&(t=w),(typeof t!="function"||r!==w)&&(t=wr(t,r,3)),
e(n,t)}function re(n,t,r){var e=Oo(n)?Vn:lt;return t=wr(t,r,3),e(n,t)}function ee(n,t,r,e){var u=n?Bu(n):0;return Sr(u)||(n=Ee(n),u=n.length),r=typeof r!="number"||e&&Ur(t,r,e)?0:0>r?bu(u+r,0):r||0,typeof n=="string"||!Oo(n)&&be(n)?r<=u&&-1<n.indexOf(t,r):!!u&&-1<xr(n,t,r)}function ue(n,t,r){var e=Oo(n)?Gn:wt;return t=wr(t,r,3),e(n,t)}function oe(n,t,r){if(r?Ur(n,t,r):null==t){n=zr(n);var e=n.length;return 0<e?n[Rt(0,e-1)]:w}r=-1,n=je(n);var e=n.length,u=e-1;for(t=xu(0>t?0:+t||0,e);++r<t;){var e=Rt(r,u),o=n[e];
n[e]=n[r],n[r]=o}return n.length=t,n}function ie(n,t,r){var e=Oo(n)?Hn:Ct;return r&&Ur(n,t,r)&&(t=w),(typeof t!="function"||r!==w)&&(t=wr(t,r,3)),e(n,t)}function fe(n,t){var r;if(typeof t!="function"){if(typeof n!="function")throw new Ge(L);var e=n;n=t,t=e}return function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=w),r}}function ae(n,t,r){function e(t,r){r&&iu(r),a=p=h=w,t&&(_=ho(),c=n.apply(s,f),p||a||(f=s=w))}function u(){var n=t-(ho()-l);0>=n||n>t?e(h,a):p=su(u,n)}function o(){e(g,p);
}function i(){if(f=arguments,l=ho(),s=this,h=g&&(p||!y),false===v)var r=y&&!p;else{a||y||(_=l);var e=v-(l-_),i=0>=e||e>v;i?(a&&(a=iu(a)),_=l,c=n.apply(s,f)):a||(a=su(o,e))}return i&&p?p=iu(p):p||t===v||(p=su(u,t)),r&&(i=true,c=n.apply(s,f)),!i||p||a||(f=s=w),c}var f,a,c,l,s,p,h,_=0,v=false,g=true;if(typeof n!="function")throw new Ge(L);if(t=0>t?0:+t||0,true===r)var y=true,g=false;else ge(r)&&(y=!!r.leading,v="maxWait"in r&&bu(+r.maxWait||0,t),g="trailing"in r?!!r.trailing:g);return i.cancel=function(){p&&iu(p),a&&iu(a),
_=0,a=p=h=w},i}function ce(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=n.apply(this,e),r.cache=o.set(u,e),e)}if(typeof n!="function"||t&&typeof t!="function")throw new Ge(L);return r.cache=new ce.Cache,r}function le(n,t){if(typeof n!="function")throw new Ge(L);return t=bu(t===w?n.length-1:+t||0,0),function(){for(var r=arguments,e=-1,u=bu(r.length-t,0),o=Be(u);++e<u;)o[e]=r[t+e];switch(t){case 0:return n.call(this,o);case 1:return n.call(this,r[0],o);
case 2:return n.call(this,r[0],r[1],o)}for(u=Be(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function se(n,t){return n>t}function pe(n){return h(n)&&Er(n)&&nu.call(n,"callee")&&!cu.call(n,"callee")}function he(n,t,r,e){return e=(r=typeof r=="function"?Bt(r,e,3):w)?r(n,t):w,e===w?dt(n,t,r):!!e}function _e(n){return h(n)&&typeof n.message=="string"&&ru.call(n)==P}function ve(n){return ge(n)&&ru.call(n)==K}function ge(n){var t=typeof n;return!!n&&("object"==t||"function"==t)}function ye(n){
return null==n?false:ve(n)?uu.test(Qe.call(n)):h(n)&&Rn.test(n)}function de(n){return typeof n=="number"||h(n)&&ru.call(n)==V}function me(n){var t;if(!h(n)||ru.call(n)!=Z||pe(n)||!(nu.call(n,"constructor")||(t=n.constructor,typeof t!="function"||t instanceof t)))return false;var r;return ht(n,function(n,t){r=t}),r===w||nu.call(n,r)}function we(n){return ge(n)&&ru.call(n)==Y}function be(n){return typeof n=="string"||h(n)&&ru.call(n)==G}function xe(n){return h(n)&&Sr(n.length)&&!!Sn[ru.call(n)]}function Ae(n,t){
return n<t}function je(n){var t=n?Bu(n):0;return Sr(t)?t?qn(n):[]:Ee(n)}function ke(n){return et(n,Re(n))}function Ie(n){return gt(n,Re(n))}function Re(n){if(null==n)return[];ge(n)||(n=Ve(n));for(var t=n.length,t=t&&Sr(t)&&(Oo(n)||pe(n))&&t||0,r=n.constructor,e=-1,r=typeof r=="function"&&r.prototype===n,u=Be(t),o=0<t;++e<t;)u[e]=e+"";for(var i in n)o&&Cr(i,t)||"constructor"==i&&(r||!nu.call(n,i))||u.push(i);return u}function Oe(n){n=Br(n);for(var t=-1,r=zo(n),e=r.length,u=Be(e);++t<e;){var o=r[t];
u[t]=[o,n[o]]}return u}function Ee(n){return Ft(n,zo(n))}function Ce(n){return(n=u(n))&&n.replace(En,a).replace(xn,"")}function Ue(n,t){var r="";if(n=u(n),t=+t,1>t||!n||!mu(t))return r;do t%2&&(r+=n),t=yu(t/2),n+=n;while(t);return r}function We(n,t,r){var e=n;return(n=u(n))?(r?Ur(e,t,r):null==t)?n.slice(g(n),y(n)+1):(t+="",n.slice(o(n,t),i(n,t)+1)):n}function $e(n,t,r){return r&&Ur(n,t,r)&&(t=w),n=u(n),n.match(t||Wn)||[]}function Se(n,t,r){return r&&Ur(n,t,r)&&(t=w),h(n)?Ne(n):ut(n,t)}function Fe(n){
return n}function Ne(n){return bt(ot(n,true))}function Te(n,t,r){if(null==r){var e=ge(t),u=e?zo(t):w;((u=u&&u.length?gt(t,u):w)?u.length:e)||(u=false,r=t,t=n,n=this)}u||(u=gt(t,zo(t)));var o=true,e=-1,i=ve(n),f=u.length;false===r?o=false:ge(r)&&"chain"in r&&(o=r.chain);for(;++e<f;){r=u[e];var a=t[r];n[r]=a,i&&(n.prototype[r]=function(t){return function(){var r=this.__chain__;if(o||r){var e=n(this.__wrapped__);return(e.__actions__=qn(this.__actions__)).push({func:t,args:arguments,thisArg:n}),e.__chain__=r,e}return t.apply(n,Jn([this.value()],arguments));
}}(a))}return n}function Le(){}function ze(n){return Wr(n)?jt(n):kt(n)}_=_?Yn.defaults(Zn.Object(),_,Yn.pick(Zn,$n)):Zn;var Be=_.Array,De=_.Date,Me=_.Error,qe=_.Function,Pe=_.Math,Ke=_.Number,Ve=_.Object,Ze=_.RegExp,Ye=_.String,Ge=_.TypeError,Je=Be.prototype,Xe=Ve.prototype,He=Ye.prototype,Qe=qe.prototype.toString,nu=Xe.hasOwnProperty,tu=0,ru=Xe.toString,eu=Zn._,uu=Ze("^"+Qe.call(nu).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ou=_.ArrayBuffer,iu=_.clearTimeout,fu=_.parseFloat,au=Pe.pow,cu=Xe.propertyIsEnumerable,lu=jr(_,"Set"),su=_.setTimeout,pu=Je.splice,hu=_.Uint8Array,_u=jr(_,"WeakMap"),vu=Pe.ceil,gu=jr(Ve,"create"),yu=Pe.floor,du=jr(Be,"isArray"),mu=_.isFinite,wu=jr(Ve,"keys"),bu=Pe.max,xu=Pe.min,Au=jr(De,"now"),ju=_.parseInt,ku=Pe.random,Iu=Ke.NEGATIVE_INFINITY,Ru=Ke.POSITIVE_INFINITY,Ou=4294967294,Eu=2147483647,Cu=9007199254740991,Uu=_u&&new _u,Wu={};
Nn.support={},Nn.templateSettings={escape:_n,evaluate:vn,interpolate:gn,variable:"",imports:{_:Nn}};var $u=function(){function n(){}return function(t){if(ge(t)){n.prototype=t;var r=new n;n.prototype=w}return r||{}}}(),Su=Vt(_t),Fu=Vt(vt,true),Nu=Zt(),Tu=Zt(true),Lu=Uu?function(n,t){return Uu.set(n,t),n}:Fe,zu=Uu?function(n){return Uu.get(n)}:Le,Bu=jt("length"),Du=function(){var n=0,t=0;return function(r,e){var u=ho(),o=S-(u-t);if(t=u,0<o){if(++n>=$)return r}else n=0;return Lu(r,e)}}(),Mu=le(function(n,t){
return h(n)&&Er(n)?ft(n,pt(t,false,true)):[]}),qu=tr(),Pu=tr(true),Ku=le(function(n){for(var t=n.length,e=t,u=Be(l),o=xr(),i=o===r,f=[];e--;){var a=n[e]=Er(a=n[e])?a:[];u[e]=i&&120<=a.length&&gu&&lu?new Dn(e&&a):null}var i=n[0],c=-1,l=i?i.length:0,s=u[0];n:for(;++c<l;)if(a=i[c],0>(s?Mn(s,a):o(f,a,0))){for(e=t;--e;){var p=u[e];if(0>(p?Mn(p,a):o(n[e],a,0)))continue n}s&&s.push(a),f.push(a)}return f}),Vu=le(function(t,r){r=pt(r);var e=rt(t,r);return It(t,r.sort(n)),e}),Zu=vr(),Yu=vr(true),Gu=le(function(n){return St(pt(n,false,true));
}),Ju=le(function(n,t){return Er(n)?ft(n,t):[]}),Xu=le(Jr),Hu=le(function(n){var t=n.length,r=2<t?n[t-2]:w,e=1<t?n[t-1]:w;return 2<t&&typeof r=="function"?t-=2:(r=1<t&&typeof e=="function"?(--t,e):w,e=w),n.length=t,Xr(n,r,e)}),Qu=le(function(n){return n=pt(n),this.thru(function(t){t=Oo(t)?t:[Br(t)];for(var r=n,e=-1,u=t.length,o=-1,i=r.length,f=Be(u+i);++e<u;)f[e]=t[e];for(;++o<i;)f[e++]=r[o];return f})}),no=le(function(n,t){return rt(n,pt(t))}),to=Pt(function(n,t,r){nu.call(n,r)?++n[r]:n[r]=1}),ro=nr(Su),eo=nr(Fu,true),uo=ur(Pn,Su),oo=ur(function(n,t){
for(var r=n.length;r--&&false!==t(n[r],r,n););return n},Fu),io=Pt(function(n,t,r){nu.call(n,r)?n[r].push(t):n[r]=[t]}),fo=Pt(function(n,t,r){n[r]=t}),ao=le(function(n,t,r){var e=-1,u=typeof t=="function",o=Wr(t),i=Er(n)?Be(n.length):[];return Su(n,function(n){var f=u?t:o&&null!=n?n[t]:w;i[++e]=f?f.apply(n,r):Or(n,t,r)}),i}),co=Pt(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),lo=lr(Xn,Su),so=lr(function(n,t,r,e){var u=n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r},Fu),po=le(function(n,t){
if(null==n)return[];var r=t[2];return r&&Ur(t[0],t[1],r)&&(t.length=1),Wt(n,pt(t),[])}),ho=Au||function(){return(new De).getTime()},_o=le(function(n,t,r){var e=x;if(r.length)var u=v(r,_o.placeholder),e=e|R;return gr(n,e,t,r,u)}),vo=le(function(n,t){t=t.length?pt(t):Ie(n);for(var r=-1,e=t.length;++r<e;){var u=t[r];n[u]=gr(n[u],x,n)}return n}),go=le(function(n,t,r){var e=x|A;if(r.length)var u=v(r,go.placeholder),e=e|R;return gr(t,e,n,r,u)}),yo=Xt(k),mo=Xt(I),wo=le(function(n,t){return it(n,1,t)}),bo=le(function(n,t,r){
return it(n,t,r)}),xo=er(),Ao=er(true),jo=le(function(n,t){if(t=pt(t),typeof n!="function"||!Kn(t,e))throw new Ge(L);var r=t.length;return le(function(e){for(var u=xu(e.length,r);u--;)e[u]=t[u](e[u]);return n.apply(this,e)})}),ko=cr(R),Io=cr(O),Ro=le(function(n,t){return gr(n,C,w,w,w,pt(t))}),Oo=du||function(n){return h(n)&&Sr(n.length)&&ru.call(n)==D},Eo=Kt(At),Co=Kt(function(n,t,r){return r?nt(n,t,r):tt(n,t)}),Uo=Ht(Co,function(n,t){return n===w?t:n}),Wo=Ht(Eo,Fr),$o=rr(_t),So=rr(vt),Fo=or(Nu),No=or(Tu),To=ir(_t),Lo=ir(vt),zo=wu?function(n){
var t=null==n?w:n.constructor;return typeof t=="function"&&t.prototype===n||typeof n!="function"&&Er(n)?Lr(n):ge(n)?wu(n):[]}:Lr,Bo=fr(true),Do=fr(),Mo=le(function(n,t){if(null==n)return{};if("function"!=typeof t[0])return t=Gn(pt(t),Ye),Nr(n,ft(Re(n),t));var r=Bt(t[0],t[1],3);return Tr(n,function(n,t,e){return!r(n,t,e)})}),qo=le(function(n,t){return null==n?{}:"function"==typeof t[0]?Tr(n,Bt(t[0],t[1],3)):Nr(n,pt(t))}),Po=Gt(function(n,t,r){return t=t.toLowerCase(),n+(r?t.charAt(0).toUpperCase()+t.slice(1):t);
}),Ko=Gt(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Vo=ar(),Zo=ar(true),Yo=Gt(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),Go=Gt(function(n,t,r){return n+(r?" ":"")+(t.charAt(0).toUpperCase()+t.slice(1))}),Jo=le(function(n,t){try{return n.apply(w,t)}catch(r){return _e(r)?r:new Me(r)}}),Xo=le(function(n,t){return function(r){return Or(r,n,t)}}),Ho=le(function(n,t){return function(r){return Or(n,r,t)}}),Qo=_r("ceil"),ni=_r("floor"),ti=Qt(se,Iu),ri=Qt(Ae,Ru),ei=_r("round");return Nn.prototype=Tn.prototype,
Ln.prototype=$u(Tn.prototype),Ln.prototype.constructor=Ln,zn.prototype=$u(Tn.prototype),zn.prototype.constructor=zn,Bn.prototype["delete"]=function(n){return this.has(n)&&delete this.__data__[n]},Bn.prototype.get=function(n){return"__proto__"==n?w:this.__data__[n]},Bn.prototype.has=function(n){return"__proto__"!=n&&nu.call(this.__data__,n)},Bn.prototype.set=function(n,t){return"__proto__"!=n&&(this.__data__[n]=t),this},Dn.prototype.push=function(n){var t=this.data;typeof n=="string"||ge(n)?t.set.add(n):t.hash[n]=true;
},ce.Cache=Bn,Nn.after=function(n,t){if(typeof t!="function"){if(typeof n!="function")throw new Ge(L);var r=n;n=t,t=r}return n=mu(n=+n)?n:0,function(){return 1>--n?t.apply(this,arguments):void 0}},Nn.ary=function(n,t,r){return r&&Ur(n,t,r)&&(t=w),t=n&&null==t?n.length:bu(+t||0,0),gr(n,E,w,w,w,w,t)},Nn.assign=Co,Nn.at=no,Nn.before=fe,Nn.bind=_o,Nn.bindAll=vo,Nn.bindKey=go,Nn.callback=Se,Nn.chain=Qr,Nn.chunk=function(n,t,r){t=(r?Ur(n,t,r):null==t)?1:bu(yu(t)||1,1),r=0;for(var e=n?n.length:0,u=-1,o=Be(vu(e/t));r<e;)o[++u]=Et(n,r,r+=t);
return o},Nn.compact=function(n){for(var t=-1,r=n?n.length:0,e=-1,u=[];++t<r;){var o=n[t];o&&(u[++e]=o)}return u},Nn.constant=function(n){return function(){return n}},Nn.countBy=to,Nn.create=function(n,t,r){var e=$u(n);return r&&Ur(n,t,r)&&(t=w),t?tt(e,t):e},Nn.curry=yo,Nn.curryRight=mo,Nn.debounce=ae,Nn.defaults=Uo,Nn.defaultsDeep=Wo,Nn.defer=wo,Nn.delay=bo,Nn.difference=Mu,Nn.drop=qr,Nn.dropRight=Pr,Nn.dropRightWhile=function(n,t,r){return n&&n.length?Nt(n,wr(t,r,3),true,true):[]},Nn.dropWhile=function(n,t,r){
return n&&n.length?Nt(n,wr(t,r,3),true):[]},Nn.fill=function(n,t,r,e){var u=n?n.length:0;if(!u)return[];for(r&&typeof r!="number"&&Ur(n,t,r)&&(r=0,e=u),u=n.length,r=null==r?0:+r||0,0>r&&(r=-r>u?0:u+r),e=e===w||e>u?u:+e||0,0>e&&(e+=u),u=r>e?0:e>>>0,r>>>=0;r<u;)n[r++]=t;return n},Nn.filter=re,Nn.flatten=function(n,t,r){var e=n?n.length:0;return r&&Ur(n,t,r)&&(t=false),e?pt(n,t):[]},Nn.flattenDeep=function(n){return n&&n.length?pt(n,true):[]},Nn.flow=xo,Nn.flowRight=Ao,Nn.forEach=uo,Nn.forEachRight=oo,Nn.forIn=Fo,
Nn.forInRight=No,Nn.forOwn=To,Nn.forOwnRight=Lo,Nn.functions=Ie,Nn.groupBy=io,Nn.indexBy=fo,Nn.initial=function(n){return Pr(n,1)},Nn.intersection=Ku,Nn.invert=function(n,t,r){r&&Ur(n,t,r)&&(t=w),r=-1;for(var e=zo(n),u=e.length,o={};++r<u;){var i=e[r],f=n[i];t?nu.call(o,f)?o[f].push(i):o[f]=[i]:o[f]=i}return o},Nn.invoke=ao,Nn.keys=zo,Nn.keysIn=Re,Nn.map=ue,Nn.mapKeys=Bo,Nn.mapValues=Do,Nn.matches=Ne,Nn.matchesProperty=function(n,t){return xt(n,ot(t,true))},Nn.memoize=ce,Nn.merge=Eo,Nn.method=Xo,Nn.methodOf=Ho,
Nn.mixin=Te,Nn.modArgs=jo,Nn.negate=function(n){if(typeof n!="function")throw new Ge(L);return function(){return!n.apply(this,arguments)}},Nn.omit=Mo,Nn.once=function(n){return fe(2,n)},Nn.pairs=Oe,Nn.partial=ko,Nn.partialRight=Io,Nn.partition=co,Nn.pick=qo,Nn.pluck=function(n,t){return ue(n,ze(t))},Nn.property=ze,Nn.propertyOf=function(n){return function(t){return yt(n,Dr(t),t+"")}},Nn.pull=function(){var n=arguments,t=n[0];if(!t||!t.length)return t;for(var r=0,e=xr(),u=n.length;++r<u;)for(var o=0,i=n[r];-1<(o=e(t,i,o));)pu.call(t,o,1);
return t},Nn.pullAt=Vu,Nn.range=function(n,t,r){r&&Ur(n,t,r)&&(t=r=w),n=+n||0,r=null==r?1:+r||0,null==t?(t=n,n=0):t=+t||0;var e=-1;t=bu(vu((t-n)/(r||1)),0);for(var u=Be(t);++e<t;)u[e]=n,n+=r;return u},Nn.rearg=Ro,Nn.reject=function(n,t,r){var e=Oo(n)?Vn:lt;return t=wr(t,r,3),e(n,function(n,r,e){return!t(n,r,e)})},Nn.remove=function(n,t,r){var e=[];if(!n||!n.length)return e;var u=-1,o=[],i=n.length;for(t=wr(t,r,3);++u<i;)r=n[u],t(r,u,n)&&(e.push(r),o.push(u));return It(n,o),e},Nn.rest=Yr,Nn.restParam=le,
Nn.set=function(n,t,r){if(null==n)return n;var e=t+"";t=null!=n[e]||Wr(t,n)?[e]:Dr(t);for(var e=-1,u=t.length,o=u-1,i=n;null!=i&&++e<u;){var f=t[e];ge(i)&&(e==o?i[f]=r:null==i[f]&&(i[f]=Cr(t[e+1])?[]:{})),i=i[f]}return n},Nn.shuffle=function(n){return oe(n,Ru)},Nn.slice=function(n,t,r){var e=n?n.length:0;return e?(r&&typeof r!="number"&&Ur(n,t,r)&&(t=0,r=e),Et(n,t,r)):[]},Nn.sortBy=function(n,t,r){if(null==n)return[];r&&Ur(n,t,r)&&(t=w);var e=-1;return t=wr(t,r,3),n=wt(n,function(n,r,u){return{a:t(n,r,u),
b:++e,c:n}}),Ut(n,f)},Nn.sortByAll=po,Nn.sortByOrder=function(n,t,r,e){return null==n?[]:(e&&Ur(t,r,e)&&(r=w),Oo(t)||(t=null==t?[]:[t]),Oo(r)||(r=null==r?[]:[r]),Wt(n,t,r))},Nn.spread=function(n){if(typeof n!="function")throw new Ge(L);return function(t){return n.apply(this,t)}},Nn.take=function(n,t,r){return n&&n.length?((r?Ur(n,t,r):null==t)&&(t=1),Et(n,0,0>t?0:t)):[]},Nn.takeRight=function(n,t,r){var e=n?n.length:0;return e?((r?Ur(n,t,r):null==t)&&(t=1),t=e-(+t||0),Et(n,0>t?0:t)):[]},Nn.takeRightWhile=function(n,t,r){
return n&&n.length?Nt(n,wr(t,r,3),false,true):[]},Nn.takeWhile=function(n,t,r){return n&&n.length?Nt(n,wr(t,r,3)):[]},Nn.tap=function(n,t,r){return t.call(r,n),n},Nn.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new Ge(L);return false===r?e=false:ge(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),ae(n,t,{leading:e,maxWait:+t,trailing:u})},Nn.thru=ne,Nn.times=function(n,t,r){if(n=yu(n),1>n||!mu(n))return[];var e=-1,u=Be(xu(n,4294967295));for(t=Bt(t,r,1);++e<n;)4294967295>e?u[e]=t(e):t(e);
return u},Nn.toArray=je,Nn.toPlainObject=ke,Nn.transform=function(n,t,r,e){var u=Oo(n)||xe(n);return t=wr(t,e,4),null==r&&(u||ge(n)?(e=n.constructor,r=u?Oo(n)?new e:[]:$u(ve(e)?e.prototype:w)):r={}),(u?Pn:_t)(n,function(n,e,u){return t(r,n,e,u)}),r},Nn.union=Gu,Nn.uniq=Gr,Nn.unzip=Jr,Nn.unzipWith=Xr,Nn.values=Ee,Nn.valuesIn=function(n){return Ft(n,Re(n))},Nn.where=function(n,t){return re(n,bt(t))},Nn.without=Ju,Nn.wrap=function(n,t){return t=null==t?Fe:t,gr(t,R,w,[n],[])},Nn.xor=function(){for(var n=-1,t=arguments.length;++n<t;){
var r=arguments[n];if(Er(r))var e=e?Jn(ft(e,r),ft(r,e)):r}return e?St(e):[]},Nn.zip=Xu,Nn.zipObject=Hr,Nn.zipWith=Hu,Nn.backflow=Ao,Nn.collect=ue,Nn.compose=Ao,Nn.each=uo,Nn.eachRight=oo,Nn.extend=Co,Nn.iteratee=Se,Nn.methods=Ie,Nn.object=Hr,Nn.select=re,Nn.tail=Yr,Nn.unique=Gr,Te(Nn,Nn),Nn.add=function(n,t){return(+n||0)+(+t||0)},Nn.attempt=Jo,Nn.camelCase=Po,Nn.capitalize=function(n){return(n=u(n))&&n.charAt(0).toUpperCase()+n.slice(1)},Nn.ceil=Qo,Nn.clone=function(n,t,r,e){return t&&typeof t!="boolean"&&Ur(n,t,r)?t=false:typeof t=="function"&&(e=r,
r=t,t=false),typeof r=="function"?ot(n,t,Bt(r,e,3)):ot(n,t)},Nn.cloneDeep=function(n,t,r){return typeof t=="function"?ot(n,true,Bt(t,r,3)):ot(n,true)},Nn.deburr=Ce,Nn.endsWith=function(n,t,r){n=u(n),t+="";var e=n.length;return r=r===w?e:xu(0>r?0:+r||0,e),r-=t.length,0<=r&&n.indexOf(t,r)==r},Nn.escape=function(n){return(n=u(n))&&hn.test(n)?n.replace(sn,c):n},Nn.escapeRegExp=function(n){return(n=u(n))&&bn.test(n)?n.replace(wn,l):n||"(?:)"},Nn.every=te,Nn.find=ro,Nn.findIndex=qu,Nn.findKey=$o,Nn.findLast=eo,
Nn.findLastIndex=Pu,Nn.findLastKey=So,Nn.findWhere=function(n,t){return ro(n,bt(t))},Nn.first=Kr,Nn.floor=ni,Nn.get=function(n,t,r){return n=null==n?w:yt(n,Dr(t),t+""),n===w?r:n},Nn.gt=se,Nn.gte=function(n,t){return n>=t},Nn.has=function(n,t){if(null==n)return false;var r=nu.call(n,t);if(!r&&!Wr(t)){if(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),null==n)return false;t=Zr(t),r=nu.call(n,t)}return r||Sr(n.length)&&Cr(t,n.length)&&(Oo(n)||pe(n))},Nn.identity=Fe,Nn.includes=ee,Nn.indexOf=Vr,Nn.inRange=function(n,t,r){
return t=+t||0,r===w?(r=t,t=0):r=+r||0,n>=xu(t,r)&&n<bu(t,r)},Nn.isArguments=pe,Nn.isArray=Oo,Nn.isBoolean=function(n){return true===n||false===n||h(n)&&ru.call(n)==M},Nn.isDate=function(n){return h(n)&&ru.call(n)==q},Nn.isElement=function(n){return!!n&&1===n.nodeType&&h(n)&&!me(n)},Nn.isEmpty=function(n){return null==n?true:Er(n)&&(Oo(n)||be(n)||pe(n)||h(n)&&ve(n.splice))?!n.length:!zo(n).length},Nn.isEqual=he,Nn.isError=_e,Nn.isFinite=function(n){return typeof n=="number"&&mu(n)},Nn.isFunction=ve,Nn.isMatch=function(n,t,r,e){
return r=typeof r=="function"?Bt(r,e,3):w,mt(n,Ar(t),r)},Nn.isNaN=function(n){return de(n)&&n!=+n},Nn.isNative=ye,Nn.isNull=function(n){return null===n},Nn.isNumber=de,Nn.isObject=ge,Nn.isPlainObject=me,Nn.isRegExp=we,Nn.isString=be,Nn.isTypedArray=xe,Nn.isUndefined=function(n){return n===w},Nn.kebabCase=Ko,Nn.last=Zr,Nn.lastIndexOf=function(n,t,r){var e=n?n.length:0;if(!e)return-1;var u=e;if(typeof r=="number")u=(0>r?bu(e+r,0):xu(r||0,e-1))+1;else if(r)return u=Lt(n,t,true)-1,n=n[u],(t===t?t===n:n!==n)?u:-1;
if(t!==t)return p(n,u,true);for(;u--;)if(n[u]===t)return u;return-1},Nn.lt=Ae,Nn.lte=function(n,t){return n<=t},Nn.max=ti,Nn.min=ri,Nn.noConflict=function(){return Zn._=eu,this},Nn.noop=Le,Nn.now=ho,Nn.pad=function(n,t,r){n=u(n),t=+t;var e=n.length;return e<t&&mu(t)?(e=(t-e)/2,t=yu(e),e=vu(e),r=pr("",e,r),r.slice(0,t)+n+r):n},Nn.padLeft=Vo,Nn.padRight=Zo,Nn.parseInt=function(n,t,r){return(r?Ur(n,t,r):null==t)?t=0:t&&(t=+t),n=We(n),ju(n,t||(In.test(n)?16:10))},Nn.random=function(n,t,r){r&&Ur(n,t,r)&&(t=r=w);
var e=null==n,u=null==t;return null==r&&(u&&typeof n=="boolean"?(r=n,n=1):typeof t=="boolean"&&(r=t,u=true)),e&&u&&(t=1,u=false),n=+n||0,u?(t=n,n=0):t=+t||0,r||n%1||t%1?(r=ku(),xu(n+r*(t-n+fu("1e-"+((r+"").length-1))),t)):Rt(n,t)},Nn.reduce=lo,Nn.reduceRight=so,Nn.repeat=Ue,Nn.result=function(n,t,r){var e=null==n?w:n[t];return e===w&&(null==n||Wr(t,n)||(t=Dr(t),n=1==t.length?n:yt(n,Et(t,0,-1)),e=null==n?w:n[Zr(t)]),e=e===w?r:e),ve(e)?e.call(n):e},Nn.round=ei,Nn.runInContext=m,Nn.size=function(n){var t=n?Bu(n):0;
return Sr(t)?t:zo(n).length},Nn.snakeCase=Yo,Nn.some=ie,Nn.sortedIndex=Zu,Nn.sortedLastIndex=Yu,Nn.startCase=Go,Nn.startsWith=function(n,t,r){return n=u(n),r=null==r?0:xu(0>r?0:+r||0,n.length),n.lastIndexOf(t,r)==r},Nn.sum=function(n,t,r){if(r&&Ur(n,t,r)&&(t=w),t=wr(t,r,3),1==t.length){n=Oo(n)?n:zr(n),r=n.length;for(var e=0;r--;)e+=+t(n[r])||0;n=e}else n=$t(n,t);return n},Nn.template=function(n,t,r){var e=Nn.templateSettings;r&&Ur(n,t,r)&&(t=r=w),n=u(n),t=nt(tt({},r||t),e,Qn),r=nt(tt({},t.imports),e.imports,Qn);
var o,i,f=zo(r),a=Ft(r,f),c=0;r=t.interpolate||Cn;var l="__p+='";r=Ze((t.escape||Cn).source+"|"+r.source+"|"+(r===gn?jn:Cn).source+"|"+(t.evaluate||Cn).source+"|$","g");var p="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,u,f,a){return e||(e=u),l+=n.slice(c,a).replace(Un,s),r&&(o=true,l+="'+__e("+r+")+'"),f&&(i=true,l+="';"+f+";\n__p+='"),e&&(l+="'+((__t=("+e+"))==null?'':__t)+'"),c=a+t.length,t}),l+="';",(t=t.variable)||(l="with(obj){"+l+"}"),l=(i?l.replace(fn,""):l).replace(an,"$1").replace(cn,"$1;"),
l="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(o?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}",t=Jo(function(){return qe(f,p+"return "+l).apply(w,a)}),t.source=l,_e(t))throw t;return t},Nn.trim=We,Nn.trimLeft=function(n,t,r){var e=n;return(n=u(n))?n.slice((r?Ur(e,t,r):null==t)?g(n):o(n,t+"")):n},Nn.trimRight=function(n,t,r){var e=n;return(n=u(n))?(r?Ur(e,t,r):null==t)?n.slice(0,y(n)+1):n.slice(0,i(n,t+"")+1):n;
},Nn.trunc=function(n,t,r){r&&Ur(n,t,r)&&(t=w);var e=U;if(r=W,null!=t)if(ge(t)){var o="separator"in t?t.separator:o,e="length"in t?+t.length||0:e;r="omission"in t?u(t.omission):r}else e=+t||0;if(n=u(n),e>=n.length)return n;if(e-=r.length,1>e)return r;if(t=n.slice(0,e),null==o)return t+r;if(we(o)){if(n.slice(e).search(o)){var i,f=n.slice(0,e);for(o.global||(o=Ze(o.source,(kn.exec(o)||"")+"g")),o.lastIndex=0;n=o.exec(f);)i=n.index;t=t.slice(0,null==i?e:i)}}else n.indexOf(o,e)!=e&&(o=t.lastIndexOf(o),
-1<o&&(t=t.slice(0,o)));return t+r},Nn.unescape=function(n){return(n=u(n))&&pn.test(n)?n.replace(ln,d):n},Nn.uniqueId=function(n){var t=++tu;return u(n)+t},Nn.words=$e,Nn.all=te,Nn.any=ie,Nn.contains=ee,Nn.eq=he,Nn.detect=ro,Nn.foldl=lo,Nn.foldr=so,Nn.head=Kr,Nn.include=ee,Nn.inject=lo,Te(Nn,function(){var n={};return _t(Nn,function(t,r){Nn.prototype[r]||(n[r]=t)}),n}(),false),Nn.sample=oe,Nn.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(t){return oe(t,n)}):oe(this.value());
},Nn.VERSION=b,Pn("bind bindKey curry curryRight partial partialRight".split(" "),function(n){Nn[n].placeholder=Nn}),Pn(["drop","take"],function(n,t){zn.prototype[n]=function(r){var e=this.__filtered__;if(e&&!t)return new zn(this);r=null==r?1:bu(yu(r)||0,0);var u=this.clone();return e?u.__takeCount__=xu(u.__takeCount__,r):u.__views__.push({size:r,type:n+(0>u.__dir__?"Right":"")}),u},zn.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),Pn(["filter","map","takeWhile"],function(n,t){
var r=t+1,e=r!=T;zn.prototype[n]=function(n,t){var u=this.clone();return u.__iteratees__.push({iteratee:wr(n,t,1),type:r}),u.__filtered__=u.__filtered__||e,u}}),Pn(["first","last"],function(n,t){var r="take"+(t?"Right":"");zn.prototype[n]=function(){return this[r](1).value()[0]}}),Pn(["initial","rest"],function(n,t){var r="drop"+(t?"":"Right");zn.prototype[n]=function(){return this.__filtered__?new zn(this):this[r](1)}}),Pn(["pluck","where"],function(n,t){var r=t?"filter":"map",e=t?bt:ze;zn.prototype[n]=function(n){
return this[r](e(n))}}),zn.prototype.compact=function(){return this.filter(Fe)},zn.prototype.reject=function(n,t){return n=wr(n,t,1),this.filter(function(t){return!n(t)})},zn.prototype.slice=function(n,t){n=null==n?0:+n||0;var r=this;return r.__filtered__&&(0<n||0>t)?new zn(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==w&&(t=+t||0,r=0>t?r.dropRight(-t):r.take(t-n)),r)},zn.prototype.takeRightWhile=function(n,t){return this.reverse().takeWhile(n,t).reverse()},zn.prototype.toArray=function(){return this.take(Ru);
},_t(zn.prototype,function(n,t){var r=/^(?:filter|map|reject)|While$/.test(t),e=/^(?:first|last)$/.test(t),u=Nn[e?"take"+("last"==t?"Right":""):t];u&&(Nn.prototype[t]=function(){function t(n){return e&&i?u(n,1)[0]:u.apply(w,Jn([n],o))}var o=e?[1]:arguments,i=this.__chain__,f=this.__wrapped__,a=!!this.__actions__.length,c=f instanceof zn,l=o[0],s=c||Oo(f);return s&&r&&typeof l=="function"&&1!=l.length&&(c=s=false),l={func:ne,args:[t],thisArg:w},a=c&&!a,e&&!i?a?(f=f.clone(),f.__actions__.push(l),n.call(f)):u.call(w,this.value())[0]:!e&&s?(f=a?f:new zn(this),
f=n.apply(f,o),f.__actions__.push(l),new Ln(f,i)):this.thru(t)})}),Pn("join pop push replace shift sort splice split unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?He:Je)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:join|pop|replace|shift)$/.test(n);Nn.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),_t(zn.prototype,function(n,t){var r=Nn[t];if(r){var e=r.name+"";(Wu[e]||(Wu[e]=[])).push({
name:t,func:r})}}),Wu[sr(w,A).name]=[{name:"wrapper",func:w}],zn.prototype.clone=function(){var n=new zn(this.__wrapped__);return n.__actions__=qn(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=qn(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=qn(this.__views__),n},zn.prototype.reverse=function(){if(this.__filtered__){var n=new zn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},zn.prototype.value=function(){
var n,t=this.__wrapped__.value(),r=this.__dir__,e=Oo(t),u=0>r,o=e?t.length:0;n=o;for(var i=this.__views__,f=0,a=-1,c=i.length;++a<c;){var l=i[a],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=xu(n,f+s);break;case"takeRight":f=bu(f,n-s)}}if(n={start:f,end:n},i=n.start,f=n.end,n=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,a=0,c=xu(n,this.__takeCount__),!e||o<F||o==n&&c==n)return Tt(t,this.__actions__);e=[];n:for(;n--&&a<c;){for(u+=r,o=-1,l=t[u];++o<f;){var p=i[o],s=p.type,p=p.iteratee(l);
if(s==T)l=p;else if(!p){if(s==N)continue n;break n}}e[a++]=l}return e},Nn.prototype.chain=function(){return Qr(this)},Nn.prototype.commit=function(){return new Ln(this.value(),this.__chain__)},Nn.prototype.concat=Qu,Nn.prototype.plant=function(n){for(var t,r=this;r instanceof Tn;){var e=Mr(r);t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},Nn.prototype.reverse=function(){function n(n){return n.reverse()}var t=this.__wrapped__;return t instanceof zn?(this.__actions__.length&&(t=new zn(this)),
t=t.reverse(),t.__actions__.push({func:ne,args:[n],thisArg:w}),new Ln(t,this.__chain__)):this.thru(n)},Nn.prototype.toString=function(){return this.value()+""},Nn.prototype.run=Nn.prototype.toJSON=Nn.prototype.valueOf=Nn.prototype.value=function(){return Tt(this.__wrapped__,this.__actions__)},Nn.prototype.collect=Nn.prototype.map,Nn.prototype.head=Nn.prototype.first,Nn.prototype.select=Nn.prototype.filter,Nn.prototype.tail=Nn.prototype.rest,Nn}var w,b="3.10.1",x=1,A=2,j=4,k=8,I=16,R=32,O=64,E=128,C=256,U=30,W="...",$=150,S=16,F=200,N=1,T=2,L="Expected a function",z="__lodash_placeholder__",B="[object Arguments]",D="[object Array]",M="[object Boolean]",q="[object Date]",P="[object Error]",K="[object Function]",V="[object Number]",Z="[object Object]",Y="[object RegExp]",G="[object String]",J="[object ArrayBuffer]",X="[object Float32Array]",H="[object Float64Array]",Q="[object Int8Array]",nn="[object Int16Array]",tn="[object Int32Array]",rn="[object Uint8Array]",en="[object Uint8ClampedArray]",un="[object Uint16Array]",on="[object Uint32Array]",fn=/\b__p\+='';/g,an=/\b(__p\+=)''\+/g,cn=/(__e\(.*?\)|\b__t\))\+'';/g,ln=/&(?:amp|lt|gt|quot|#39|#96);/g,sn=/[&<>"'`]/g,pn=RegExp(ln.source),hn=RegExp(sn.source),_n=/<%-([\s\S]+?)%>/g,vn=/<%([\s\S]+?)%>/g,gn=/<%=([\s\S]+?)%>/g,yn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,dn=/^\w*$/,mn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,wn=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,bn=RegExp(wn.source),xn=/[\u0300-\u036f\ufe20-\ufe23]/g,An=/\\(\\)?/g,jn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,kn=/\w*$/,In=/^0[xX]/,Rn=/^\[object .+?Constructor\]$/,On=/^\d+$/,En=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,Cn=/($^)/,Un=/['\n\r\u2028\u2029\\]/g,Wn=RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+","g"),$n="Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "),Sn={};
Sn[X]=Sn[H]=Sn[Q]=Sn[nn]=Sn[tn]=Sn[rn]=Sn[en]=Sn[un]=Sn[on]=true,Sn[B]=Sn[D]=Sn[J]=Sn[M]=Sn[q]=Sn[P]=Sn[K]=Sn["[object Map]"]=Sn[V]=Sn[Z]=Sn[Y]=Sn["[object Set]"]=Sn[G]=Sn["[object WeakMap]"]=false;var Fn={};Fn[B]=Fn[D]=Fn[J]=Fn[M]=Fn[q]=Fn[X]=Fn[H]=Fn[Q]=Fn[nn]=Fn[tn]=Fn[V]=Fn[Z]=Fn[Y]=Fn[G]=Fn[rn]=Fn[en]=Fn[un]=Fn[on]=true,Fn[P]=Fn[K]=Fn["[object Map]"]=Fn["[object Set]"]=Fn["[object WeakMap]"]=false;var Nn={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a",
"\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y",
"\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Tn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Ln={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},zn={"function":true,object:true},Bn={0:"x30",1:"x31",2:"x32",3:"x33",4:"x34",5:"x35",6:"x36",7:"x37",8:"x38",9:"x39",A:"x41",B:"x42",C:"x43",D:"x44",E:"x45",F:"x46",a:"x61",b:"x62",c:"x63",d:"x64",e:"x65",f:"x66",n:"x6e",r:"x72",t:"x74",u:"x75",v:"x76",x:"x78"},Dn={"\\":"\\",
"'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Mn=zn[typeof exports]&&exports&&!exports.nodeType&&exports,qn=zn[typeof module]&&module&&!module.nodeType&&module,Pn=zn[typeof self]&&self&&self.Object&&self,Kn=zn[typeof window]&&window&&window.Object&&window,Vn=qn&&qn.exports===Mn&&Mn,Zn=Mn&&qn&&typeof global=="object"&&global&&global.Object&&global||Kn!==(this&&this.window)&&Kn||Pn||this,Yn=m();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Zn._=Yn, define(function(){
return Yn})):Mn&&qn?Vn?(qn.exports=Yn)._=Yn:Mn._=Yn:Zn._=Yn}).call(this);
/**
 memory-record - activerecord like in-memory data manager
 @version v0.0.8
 @link https://github.com/7korobi/memory-record
 @license 
**/
(function(){this.Mem=function(){function t(){}return t.rule={},t}()}).call(this),function(){this.Mem.Finder=function(){function t(t){var e;this.sort_by=t,e=new Mem.Query(this,[],!1,this.sort_by),e._memory={},this.scope={all:e},this.query={all:e}}return t.prototype.rehash=function(t,e){var r,n,i;for(delete this.query.all._reduce,delete this.query.all._list,delete this.query.all._hash,this.query={all:this.query.all},r=0,n=t.length;n>r;r++)i=t[r],i.rehash(e)},t.prototype.calculate_reduce=function(t){var e,r,n,i,u,s,o,l,c,a,h,f,d,p,m,_,y,g,v,b;o=function(t){var e;return e={},t.count&&(e.count=0),t.all&&(e.all=0),e},y=function(t,e,r){return r.max<=e.max||(e.max_is=t,e.max=r.max),e.min<=r.min||(e.min_is=t,e.min=r.min),r.count&&(e.count+=r.count),r.all?e.all+=r.all:void 0},r=function(t){return t.all&&t.count?t.avg=t.all/t.count:void 0},e={},g=t._memory;for(s in g)for(v=g[s],l=v.item,n=v.emits,u=0,d=n.length;d>u;u++){for(b=n[u],h=b[0],f=b[1],m=b[2],_=e,c=0,p=h.length;p>c;c++)a=h[c],_=_[a]||(_[a]={});_=_[f]||(_[f]=o(m)),y(l,_,m)}for(i in e){n=e[i];for(a in n)m=n[a],r(m)}return t._reduce=e},t.prototype.calculate_sort=function(t){var e,r,n,i,u,s,o,l,c;for(u=t._list,l=t.desc?[1,-1]:[-1,1],s=l[0],e=l[1],c=t.orders={},r=0,i=u.length;i>r;r++)o=u[r],c[o._id]=t.sort_by(o);return u.length&&(n=Array.isArray(t.sort_by(u[0]))),t._list=n?u.sort(function(t,r){var n,i,u,o,l,a,h;for(n=c[t._id],u=c[r._id],l=a=0,h=n.length;h>a;l=++a){if(i=n[l],o=u[l],o>i)return s;if(i>o)return e}return 0}):u.sort(function(t,r){var n,i;return n=c[t._id],i=c[r._id],i>n?s:n>i?e:0})},t.prototype.calculate_group=function(t){var e,r,n,i,u;return i=t._distinct,n=i.reduce,u=i.target,t._list=function(){var i,s;i=t._reduce[n],s=[];for(e in i)r=i[e],s.push(r[u]);return s}()},t.prototype.calculate_list=function(t,e){var r,n,i,u;return t._memory===e?r=function(e,r){return t._hash[e]=r.item}:(t._memory={},r=function(e,r){return t._memory[e]=r,t._hash[e]=r.item}),t._hash={},t._list=function(){var s,o,l,c;c=[];for(i in e){for(u=e[i],l=t.filters,s=0,o=l.length;o>s&&(n=l[s],n(u.item)||(u=null),u);s++);u&&c.push(r(i,u))}return c}()},t.prototype.calculate=function(t){this.calculate_list(t,this.query.all._memory),t._list.length&&null!=this.map_reduce&&(this.calculate_reduce(t),null!=t._distinct&&this.calculate_group(t)),this.calculate_sort(t)},t}()}.call(this),function(){var t,e,r,n=[].indexOf||function(t){for(var e=0,r=this.length;r>e;e++)if(e in this&&this[e]===t)return e;return-1},i=[].slice;r=Object.prototype.toString,e=function(t){return r.call(t).slice(8,-1)},t=function(t,e,r){var n,i,u,s;u=r.get,s=r.set,n=!1,i=!1,Object.defineProperty(t,e,{configurable:n,enumerable:i,get:u,set:s})},this.Mem.Query=function(){function r(t,e,r,n){this.finder=t,this.filters=e,this.desc=r,this.sort_by=n}return r.prototype._filters=function(t,r){var n,i,u;if(!t)return this;switch(n=this.filters.concat(),e(t)){case"Object":for(u in t)i=t[u],n.push(r(u,i));break;case"Function":n.push(r(null,t));break;default:throw console.log([e(t,t)]),Error("unimplemented")}return new Mem.Query(this.finder,n,this.desc,this.sort_by)},r.prototype["in"]=function(t){return this._filters(t,function(t,r){switch(e(r)){case"Array":return function(e){var i,u,s;for(i=0,s=r.length;s>i;i++)if(u=r[i],n.call(e[t],u)>=0)return!0;return!1};case"RegExp":return function(e){var n,i,u,s;for(u=e[t],n=0,i=u.length;i>n;n++)if(s=u[n],r.test(s))return!0;return!1};case"Null":case"Boolean":case"String":case"Number":return function(e){return n.call(e[t],r)>=0};default:throw console.log([e(r,r)]),Error("unimplemented")}})},r.prototype.distinct=function(t,e){var r;return r=new Mem.Query(this.finder,this.filters,this.desc,this.sort_by),r._distinct={reduce:t,target:e},r},r.prototype.where=function(t){return this._filters(t,function(t,r){switch(e(r)){case"Array":return function(e){var i;return i=e[t],n.call(r,i)>=0};case"RegExp":return function(e){return r.test(e[t])};case"Function":return r;case"Null":case"Boolean":case"String":case"Number":return function(e){return e[t]===r};default:throw console.log([e(r,r)]),Error("unimplemented")}})},r.prototype.search=function(t){var e,r,n;return t?(r=function(){var r,n,i,u;for(i=t.split(/\s+/),u=[],r=0,n=i.length;n>r;r++)e=i[r],e=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),e.length&&u.push("("+e+")");return u}(),r.length?(n=new RegExp(r.join("|"),"ig"),this.where(function(t){return!t.search_words||n.test(t.search_words)})):this):this},r.prototype.sort=function(t,r){var n;return null==r&&(r=this.sort_by),n=function(){switch(e(r)){case"Function":return r;case"String":case"Number":return function(t){return t[r]};default:throw console.log([e(req,req)]),Error("unimplemented")}}(),t===this.desc&&n===this.sort_by?this:new Mem.Query(this.finder,this.filters,t,n)},r.prototype.clear=function(){return delete this._reduce,delete this._list,delete this._hash,delete this._memory},t(r.prototype,"reduce",{get:function(){return null==this._reduce&&this.finder.calculate(this),this._reduce}}),t(r.prototype,"list",{get:function(){return null==this._list&&this.finder.calculate(this),this._list}}),t(r.prototype,"hash",{get:function(){return null==this._hash&&this.finder.calculate(this),this._hash}}),t(r.prototype,"memory",{get:function(){return null==this._memory&&this.finder.calculate(this),this._memory}}),t(r.prototype,"ids",{get:function(){return Object.keys(this.memory)}}),r.prototype.find=function(t){return this.hash[t]},r.prototype.finds=function(t){var e,r,n,i,u;for(u=[],e=0,n=t.length;n>e;e++)r=t[e],(i=this.hash[r])&&u.push(i);return u},r.prototype.pluck=function(){var t;switch(t=1<=arguments.length?i.call(arguments,0):[],t.length){case 0:return this.list.map(function(){return null});case 1:return this.list.map(function(e){return e[t[0]]});default:return this.list.map(function(e){var r,n,i,u;for(u=[],r=0,i=t.length;i>r;r++)n=t[r],u.push(e[n]);return u})}},r}()}.call(this),function(){var t,e,r,n=[].slice;r=Object.prototype.toString,e=function(t){return r.call(t).slice(8,-1)},t=function(t,e,r){var n,i,u,s;u=r.get,s=r.set,n=!1,i=!1,Object.defineProperty(t,e,{configurable:n,enumerable:i,get:u,set:s})},this.Mem.Rule=function(){function r(t){var e;this.id=t+"_id",this.list_name=t+"s",this.base_obj={},this.validates=[],this.responses=null!=(e=Mem.Rule.responses)[t]?e[t]:e[t]=[],this.map_reduce=function(){},this.protect=function(){},this.deploy=function(t){return function(e){return e._id||(e._id=e[t.id]),e[t.id]?void 0:e[t.id]=e._id}}(this),this.finder=new Mem.Finder(function(t){return t}),this.finder.name=this.list_name,Mem.rule[t]=this,Mem[this.list_name]=this.finder.query.all}return r.responses={},r.prototype.schema=function(r){var i,u;return i=function(t,r,i){switch(e(i)){case"Function":return r.query.all[t]=function(){var e,u,s;return e=1<=arguments.length?n.call(arguments,0):[],null!=(u=r.query)[s=t+":"+JSON.stringify(e)]?u[s]:u[s]=i.apply(null,e)};default:return r.query.all[t]=i}},u={scope:function(t){return function(e){var r,n,u,s;t.finder.scope=e(t.finder.query.all),u=t.finder.scope,s=[];for(r in u)n=u[r],s.push(i(r,t.finder,n));return s}}(this),"default":function(t){return function(e){var r,n,i,u;n=e(),i=[];for(r in n)u=n[r],i.push(t.base_obj[r]=u);return i}}(this),depend_on:function(t){return function(e){var r;return null==(r=Mem.Rule.responses)[e]&&(r[e]=[]),Mem.Rule.responses[e].push(t)}}(this),belongs_to:function(e){return function(r,n){var i,s,o;return o=r+"s",s=r+"_id",t(e.base_obj,r,{get:function(){return Mem[o].find(this[s])}}),i=null!=(null!=n?n.dependent:void 0),i?(u.depend_on(r),e.validates.push(function(t){return null!=t[r]})):void 0}}(this),has_many:function(e){return function(r,n){var u,s,o;return s=e.id,u=e.finder.query.all,o=null!=n?n.query:void 0,i(r,e.finder,function(t){return null==o&&(o=Mem[r]),o.where(function(e){return e[s]===t})}),t(e.base_obj,r,{get:function(){return u[r](this._id)}})}}(this),order:function(t){return function(e){var r;return r=t.finder.query.all.sort(!1,e),r._memory=t.finder.query.all._memory,Mem[t.list_name]=t.finder.query.all=r}}(this),protect:function(t){return function(){var e;return e=1<=arguments.length?n.call(arguments,0):[],t.protect=function(t,r){var n,i,u,s;for(s=[],n=0,u=e.length;u>n;n++)i=e[n],s.push(t[i]=r[i]);return s}}}(this),deploy:function(t){return function(e){t.deploy=e}}(this),map_reduce:function(t){return function(e){t.map_reduce=e}}(this)},r.call(u,this)},r.prototype.rehash=function(t){return this.finder.rehash(this.responses,t)},r.prototype.set_base=function(t,r,i){var u,s,o,l,c,a;switch(c=this.finder,o=c.diff,u=c.query.all._memory,s=function(t){return function(e){return e.__proto__=t.base_obj,t.deploy(e)}}(this),a=function(t){return function(e){var r,n,i,u;for(i=t.validates,r=0,n=i.length;n>r;r++)if(u=i[r],!u(e))return!1;return!0}}(this),l=function(t){var n,i,u,s,o,l;switch(e(r)){case"Array":for(o=r||[],n=0,s=o.length;s>n;n++)u=o[n],u&&t(u);break;case"Object":l=r||{};for(i in l)u=l[i],u&&(u._id=i,t(u))}},t){case"merge":l(function(t){return function(e){var r,l,h,f,d;for(l in i)d=i[l],e[l]=d;s(e),a(e)&&(h={item:e,emits:[]},f=u[e._id],null!=f?(t.protect(e,f.item),o.change=!0):o.add=!0,u[e._id]=h,r=function(){var t,e,r,i;return e=3<=arguments.length?n.call(arguments,0,t=arguments.length-2):(t=0,[]),r=arguments[t++],i=arguments[t++],c.map_reduce=!0,h.emits.push([e,r,i])},t.map_reduce(h.item,r))}}(this));break;default:l(function(t){return function(t){var e;e=u[t._id],null!=e&&(o.del=!0,delete u[t._id])}}(this))}this.rehash(o)},r.prototype.set=function(t,e){var r,n,i;this.finder.diff={},n=this.finder.query.all._memory;for(r in n){i=n[r],this.finder.query.all._memory={},this.finder.diff.del=!0;break}return this.set_base("merge",t,e)},r.prototype.reject=function(t){return this.finder.diff={},this.set_base(!1,t,null)},r.prototype.merge=function(t,e){return this.finder.diff={},this.set_base("merge",t,e)},r}()}.call(this);
/**
 mithril-giji - mithril library for 人狼議事
 @version v0.0.8
 @link https://github.com/7korobi/mithril-giji
 @license 
**/
(function(){var t,n,i,e,o,r,s=[].slice;n=function(t,n,i,e,o){var r,s,l,a,u,c;for(null==o&&(o=Object.keys(e)),c=[],l=0,u=o.length;u>l;l++)a=o[l],s=e[a],r=t(n,i,a),c.push(m("span",r,s));return c},t=function(t,n,i,e,o){var r,s;return null==t["class"]&&(t["class"]="edge"),r=function(){return i(o)},s=n(e,o)?"btn "+t["class"]+" active":"btn "+t["class"],{className:s,onmouseup:r,ontouchend:r}},o=function(t){return t()},i=function(t,n){return n===t()},e=function(t,n){return t()[n]},r=function(t,n){var i;return i=pack.Keys,i(t())===i(n)},this.Btns={check:function(){return n.apply(null,[Btn.keys].concat(s.call(arguments)))},radio:function(){return n.apply(null,[Btn.set].concat(s.call(arguments)))},menu:function(){return n.apply(null,[Btn.menu].concat(s.call(arguments)))}},this.Btn={base:t,bool:function(n,i){return t(n,o,i,i,!i())},call:function(n,e){var o;return o=function(){return null},t(n,i,e,o,"call")},set:function(n,e,o){return t(n,i,e,e,o)},keys_reset:function(n,i,e){var o;return o=function(t){return r(i,e)?void 0:i(unpack.Keys(e))},t(n,r,o,i,e)},keys:function(n,i,o){var r;return r=function(t){var n;return n=i(),n[t]=!n[t],i(n)},t(n,e,r,i,o)},menu:function(n,e,o){var r;return r=function(t){return function(t){var n;return n=i(e,t)?"":t,e(n)}}(this),t(n,i,r,e,o)}}}).call(this),function(){var t,n;t={touch:head.browser.ios||head.browser.ff||head.browser.old&&head.browser.chrome?function(t,n){var i,e,o,r,s,l;return e=t.pageX,o=t.pageY,i=n.left,r=n.top,s=2*(e-i-window.scrollX),l=2*(o-r-window.scrollY),{x:s,y:l}}:function(t,n){var i,e,o,r,s,l;return e=t.pageX,o=t.pageY,i=n.left,r=n.top,s=2*(e-i),l=2*(o-r-window.scrollY),{x:s,y:l}},mouse:function(t){var n,i;return n=t.offsetX||t.layerX,i=t.offsetY||t.layerY,null!=n&&null!=i?(n*=2,i*=2,{x:n,y:i}):void 0},offsets:function(n,i,e){var o,r;if(e.offset=null,e.offsets=[],null!=n&&null!=i)if(null!=n.touches){if(o=i.getBoundingClientRect(),e.offsets=function(){var i,e,s,l;for(s=n.touches,l=[],i=0,e=s.length;e>i;i++)r=s[i],l.push(t.touch(r,o));return l}(),1===n.touches.length)return e.offset=e.offsets[0]}else if(e.offset=t.mouse(n),null!=e.offset)return e.offsets=[e.offset]},offset:function(n,i){var e;return null==n||null==i?null:null!=n.touches?(e=i.getBoundingClientRect(),t.touch(n.touches[0],e)):t.mouse(n)}},n=["config","data","background","draw","onmove"],this.Canvas={controller:function(i,e,o){var r,s,l,a,u,c,h,d,f,w,m,p,v,g,b,y,x,_;for(b=o.size,_=b[0],m=b[1],y=_+"x"+m,l=null,c=new e(o),p=0,v=n.length;v>p;p++)w=n[p],null==c[w]&&(c[w]=function(){});r={state:"boot",is_touch:!1,offsets:[],event:{}},a=function(t){return t.preventDefault(),r.event=t,c.onmove(r),d()},x=function(t){return r.state="onstart",r.is_touch=!0,a(t)},s=function(t){return r.state="oncancel",r.is_touch=!1,a(t)},f=function(t){return r.state="onend",r.is_touch=!1,a(t)},g=function(n){return r.state="onmove",t.offsets(n,l,r),r.event=n,a(n)},h=function(){var t,n,i;return t=r.ctx,n=c.data(),n&&(null==n.canvas&&(n.canvas={}),i=n.canvas[y])?void t.putImageData(i,0,0):(c.background(r),n?n.canvas[y]=t.getImageData(0,0,2*_,2*m):void 0)},d=function(){return h(),c.draw(r)},u=function(t,n,i){return r.ctx||(l=t,r.ctx=l.getContext("2d")),c.config(l,n,i),c.onmove(r),d()},this.canvas_attr={width:_,height:m,style:"width: "+_/2+"px; height: "+m/2+"px;",ontouchend:f,ontouchmove:g,ontouchstart:x,ontouchcancel:s,onmouseup:f,onmousemove:g,onmousedown:x,onmouseout:f,onmouseover:g,config:u}},view:function(t,n){return m("canvas"+n,t.canvas_attr)}}}.call(this),function(){}.call(this),function(){this.Layout=function(){function t(n,i,e,o,r,s){this.box=n,this.dx=i,this.dy=e,this.absolute=null!=r?r:!1,this.duration=null!=s?s:DELAY.animato,this.box&&(this.absolute&&(this.duration/=4),t.list[this.box.id]=this,this.box.style.zIndex=o,this.mode="show",this.from=this.hide(),this.transform(this.from),this.transition())}var n;return t.list={},t.move=function(){var n,i,e,o;e=t.list,o=[];for(n in e)i=e[n],o.push(i.translate());return o},n=function(t){var n,i,e,o;return i=this.width||this.box.offsetWidth,n=this.height||this.box.offsetHeight,this.dx?e=this.dx:(this.width=this.box.parentElement.offsetWidth,e=this.box.parentElement.offsetLeft),this.dy&&(o=this.dy),t(e,o,i,n,{top:win.top,left:win.left,width:win.width,height:win.height})},t.prototype.show=function(){return n.call(this,function(t,n,i,e,o){return 0>t&&(t+=o.width-i),0>n&&(n+=o.height-e),{x:t,y:n,w:i,h:e,win:o}})},t.prototype.hide=function(){return n.call(this,function(t,n,i,e,o){return t=-t+function(){switch(!1){case!(t>0):return-i;case!(0>t):return o.width}}(),n=-n+function(){switch(!1){case!(n>0):return-e;case!(0>n):return o.height}}(),{x:t,y:n,w:i,h:e,win:o}})},t.prototype.transform=function(t){var n,i,e;return i=t.x,e=t.y,this.width&&(this.box.style.width=this.width+"px"),this.height&&(this.box.style.height=this.height+"px"),this.absolute?(this.box.style.position="absolute",this.box.style.left=i+win.left+"px",this.box.style.top=e+win.top+"px",this.box.style.webkitTransform="",this.box.style.mozTransform="",this.box.style.msTransform="",this.box.style.oTransform="",this.box.style.transform=""):(this.box.style.position="fixed",this.box.style.left=0,this.box.style.top=0,n="translate("+i+"px, "+e+"px)",this.box.style.webkitTransform=n,head.browser.ff&&(this.box.style.mozTransform=n),head.browser.ie&&(this.box.style.msTransform=n),head.browser.opera&&(this.box.style.oTransform=n),this.box.style.transform=n)},t.prototype.transition=function(){var t;return t=this.duration&&!this.absolute?"all "+this.duration+"ms ease-in-out 0":"",head.browser.ff&&(this.box.style.mozTransition=t),head.browser.ie&&(this.box.style.msTransition=t),head.browser.opera&&(this.box.style.oTransition=t),this.box.style.transition=t},t.prototype.translate=function(){var t;return t=this[this.mode](),_.isEqual(this.from,t)?void 0:(this.transform(t),setTimeout(function(n){return function(){return n.from=t,n.translate()}}(this),this.duration))},t}()}.call(this),function(){this.ScrollSpy=function(){function t(t){this.prop=t,this.show_upper=!0,this.size=30,this.head=this.tail=0}var n;return t.elems={},t.go=function(n,i){var e,o,r,s;return e=t.elems[n],e&&(r=e.getBoundingClientRect(),null==i&&(i=.5*Math.min(win.horizon,r.height)),s=r.top-win.horizon+i,o=0,o||s)?window.scrollBy(o,s):void 0},n=5e3,window.setInterval(function(){var t;return(null!=(t=win.scroll)?t.center:void 0)?win.scroll.tick(win.scroll.center,n/1e3):void 0},n),t.capture=function(){var n,i,e;return n=t.view(),e=win.scroll,null!=e&&null!=e.list&&(i=e.view(),i!==e.prop())?e.prop(i):void 0},t.view=function(){var n,i,e,o,r,s,l,a;l=null,r=t.elems;for(e in r)n=r[e],i=n.vision.id,o=n.getBoundingClientRect(),a=n.vision,a.top=o.top,a.btm=o.bottom,n.vision.id===e&&o.height&&o.width?!l&&a.top<(s=win.horizon)&&s<a.btm&&(l=i):delete t.elems[e];return l},t.prototype.rescroll=function(n){return this.prop=n,window.requestAnimationFrame(function(n){return function(){return t.go(n.prop())}}(this))},t.prototype.tick=function(t){return console.log(t)},t.prototype.view=function(){var n,i,e,o,r,s,l,a,u,c,h;for(l=this.pager_elem.getBoundingClientRect(),this.pager_top=l.top,a=this.list,o=i=0,r=a.length;r>i;o=++i)s=a[o],e=s._id,(n=t.elems[e])&&(h=n.vision,!this.adjust&&this.pager_top<(u=win.horizon)&&u<h.btm&&(h.offset=Math.max(1,win.horizon-h.top),this.adjust=h));return m.startComputation(),window.requestAnimationFrame(function(){return m.endComputation()}),null!=(c=this.adjust)?c.id:void 0},t.prototype.pager=function(t,n,i){var e,o,r,s,l,a,u,c,h,d,f,w,p,v;return this.list=n,(null!=(c=this.list)?c.length:void 0)?(w=0,o=this.list.length-1,null!=this.pager_elem&&(u=this.pager_elem.getBoundingClientRect(),h=win.height-u.bottom,f=0<u.top,d=h>0),r=_.findIndex(this.list,{_id:"function"==typeof this.prop?this.prop():void 0}),0>r&&(r=function(){if(this.past_list===this.list)switch(!1){case!f:return this.head;case!d:return this.tail;default:return this.head}else switch(!1){case!f:return w;case!d:return o;default:return w}}.call(this)),this.past_list=this.list,this.center=this.list[r],this.tail=Math.min(o,_.ceil(r+this.size,-1)),this.head=Math.max(w,r-this.size),a=function(t){return function(n,i,e){var o,r,s,l;return t.pager_elem=n,u=t.pager_elem.getBoundingClientRect(),t.show_under=u.bottom<win.horizon,t.show_upper=win.horizon<u.top,o=u.height/(1+t.tail-t.head),l=3*win.height/o,t.size<l&&console.log("!alert! scroll spy size "+t.size+" < "+l),s=u.bottom+win.top,r=s-t.elem_bottom,t.show_under&&r&&!t.prop()&&win.bottom<document.height&&window.scrollBy(0,r),t.elem_bottom=s}}(this),v=function(){var t,n,o,r,a;for(o=this.list.slice(this.head,+this.tail+1||9e9),a=[],t=0,n=o.length;n>t;t++){l=o[t],p=i(l),r=this.mark(l._id);for(s in r)e=r[s],p.attrs[s]=e;a.push(p)}return a}.call(this),m(t,{config:a},v)):m(t,{config:function(t){return function(n){t.pager_elem=n}}(this)})},t.prototype.mark=function(n){return{config:function(i){return function(e,o,r){var s;if(t.elems[n]=e,e.vision={id:n},i.adjust){if(n===i.adjust.id)return s=i.adjust.offset,i.adjust=null,t.go(n,s)}else if(!o&&n===i.prop())return window.requestAnimationFrame(function(){return t.go(n)})}}(this)}},t}()}.call(this),function(){var t;t=document.createElement("div"),document.body.appendChild(t),t.style.display="none",this.Submit={get:function(t,n){var i,e,o,r;o="?";for(i in n)r=n[i],o+=i+"="+r;return e={method:"GET",url:t+encodeURI(o),deserialize:unpack.HtmlGon},m.request(e)},iframe:function(n,i){var e,o,r,s,l;return r=m.deferred(),o={action:encodeURI(n),method:"POST",target:"submit_result",config:function(t){return t.style.display="none",t.submit()}},e={name:"submit_result",config:function(t){var n;return n=setTimeout(function(){return r.reject(Error("form request time out."))},DELAY.largo),t.style.display="none",t.contentWindow.name="submit_result",t.onload=function(){var i,e;try{return clearTimeout(n),r.resolve(unpack.HtmlGon(t.contentDocument.body.innerHTML))}catch(e){return i=e,r.reject(i)}finally{m.endComputation()}}}},m.startComputation(),m.render(t,m("iframe",e),m("form#submit_request",o,function(){var t;t=[];for(s in i){if(l=i[s],null==l)break;t.push(m("input",{type:"hidden",name:s,value:l}))}return t}())),r.promise}}}.call(this),function(){var t,n;n=function(t){return t.left=window.scrollX,t.top=window.scrollY},t=function(){var t,i,e,o;if(!win.scrolling)return t={},e=0,i=function(){var i;return i={},n(i),t.top===i.top&&t.left===i.left?10<e++:(t=i,e=0,!1)},(o=function(){i()?(win.scrolling=!1,win.do_event_list(win.on.scroll_end),win["do"].resize()):window.requestAnimationFrame(o)})()},this.win={do_event_list:function(t,n){var i,e,o;if(0<t.length)for(e=0,o=t.length;o>e;e++)(i=t[e])(n)},"do":{resize:function(t){var n,i,e;return n=document.documentElement,e=Math.min(n.clientWidth,n.clientHeight),win.width=n.clientWidth,380>e&&(head.browser.viewport="width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5",null!=(i=document.querySelector("meta[name=viewport]"))&&(i.content=head.browser.viewport)),window.innerHeight>window.innerWidth?(win.landscape=!1,win.portlate=!0):(win.landscape=!0,win.portlate=!1),win.do_event_list(win.on.resize,t)},scroll_end:t,scroll:function(t){return n(win),win.height=window.innerHeight,win.right=win.left+window.innerWidth,win.bottom=win.top+win.height,win.horizon=win.height/2,win.scrolling||win.do_event_list(win.on.scroll_start,t),win["do"].scroll_end(),win.scrolling=!0,win.do_event_list(win.on.scroll,t)},orientation:function(t){return win.orientation=t,win.compass=t.webkitCompassHeading,win.do_event_list(win.on.orientation,t)},motion:function(t){return win.accel=t.acceleration,win.gravity=t.accelerationIncludingGravity,win.rotate=t.rotationRate,win.do_event_list(win.on.motion,t)},load:function(t){return win.do_event_list(win.on.load,t),win["do"].resize(),win["do"].scroll()}},on:{resize:[],scroll:[],scroll_start:[],scroll_end:[],orientation:[],motion:[],load:[]},top:0,horizon:0,bottom:0,left:0,right:0,height:0,width:0,scroll:null,accel:{},rotate:{},gravity:{},orientation:{},compass:0,is_tap:!1,deploy:function(){return"onorientationchange"in window?window.addEventListener("orientationchange",win["do"].scroll):window.addEventListener("resize",win["do"].scroll),window.addEventListener("scroll",win["do"].scroll),"ondeviceorientation"in window&&window.addEventListener("deviceorientation",win["do"].orientation),"ondevicemotion"in window&&window.addEventListener("devicemotion",win["do"].motion),"onhashchange"in window&&window.addEventListener("hashchange",function(t){return t.clipboardData?console.log(t):Url.popstate()}),"onpopstate"in window&&(window.addEventListener("popstate",function(t){return t.clipboardData?console.log(t):Url.popstate()}),head.browser.safari||Url.popstate()),"onmessage"in window&&window.addEventListener("message",function(t){return console.log("on message")}),"onoffline"in window&&window.addEventListener("offline",function(t){return console.log("on offline  onLine:"+navigator.onLine)}),"ononline"in window&&window.addEventListener("online",function(t){return console.log("on online  onLine:"+navigator.onLine)}),"onstorage"in window&&window.addEventListener("storage",function(t){return console.log("on storage")}),"onload"in window?window.addEventListener("load",win["do"].load):void 0}}}.call(this);
/*
Mithril v0.2.1
http://mithril.js.org
(c) 2014-2015 Leo Horie
License: MIT
*/
!function(a,b){"use strict";var c=b("undefined"!=typeof window?window:{});"object"==typeof module&&null!=module&&module.exports?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a.m=c}(this,function(a,b){"use strict";function c(a){return"function"==typeof a}function d(a){return"[object Object]"===bc.call(a)}function e(a){return"[object String]"===bc.call(a)}function f(){}function g(a,b){for(var c=0;c<a.length;c++)b(a[c],c)}function h(a,b){for(var c in a)cc.call(a,c)&&b(a[c],c)}function i(a){Zb=a.document,$b=a.location,ac=a.cancelAnimationFrame||a.clearTimeout,_b=a.requestAnimationFrame||a.setTimeout}function j(a){function b(){return arguments.length&&(a=arguments[0]),a}return b.toJSON=function(){return a},b}function k(a){return null!=a&&(d(a)||c(a))&&c(a.then)}function l(a,b){return a.then?a.then(b):b()}function m(a){var b=r.prop();return a.then(b),b.then=function(c,d){return a.then(function(){return c(b())},d)},b.catch=function(c){return a.then(function(){return b()},c)},b.finally=function(b){return a.then(function(a){return l(b(),function(){return a})},function(a){return l(b(),function(){throw a})})},b}function n(a){return null!=a&&d(a)&&!("tag"in a||"view"in a||"subtree"in a)}function o(a,b){for(var c,d=[],e=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g;null!=(c=e.exec(a));)if(""===c[1]&&null!=c[2])b.tag=c[2];else if("#"===c[1])b.attrs.id=c[2];else if("."===c[1])d.push(c[2]);else if("["===c[3][0]){var f=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(c[3]);b.attrs[f[1]]=f[3]||(f[2]?"":!0)}return d}function p(a,b,c,d){var e=!1;if(cc.call(b,c)){var f=b[c];null!=f&&""!==f&&(e=!0,d.push(f))}h(b,function(b,d){a[d]=d===c&&e?"":b}),d.length&&(a[c]=d.join(" "))}function q(a){function b(){return g.apply(this,d)||this}function c(b){for(var c=[b].concat(d),e=1;e<arguments.length;e++)c.push(arguments[e]);return h.apply(a,c)}for(var d=[],e=1;e<arguments.length;e++)d.push(arguments[e]);var g=a.controller||f;g!==f&&(b.prototype=g.prototype);var h=a.view||f;c.$original=h;var i={controller:b,view:c};return d[0]&&null!=d[0].key&&(i.attrs={key:d[0].key}),i}function r(a,b){if(d(a))return q.apply(null,arguments);if(!e(a))throw new TypeError("selector in m(selector, attrs, children) should be a string");if(!a)throw new TypeError("selector cannot be an empty string");for(var c=n(b),f=[],g=c?2:1;g<arguments.length;g++)f.push(arguments[g]);var h;h=1===f.length&&dc(f[0])?f[0]:f;var i={tag:"div",attrs:{},children:h};return p(i.attrs,c?b:{},c&&"class"in b?"class":"className",o(a,i)),i}function s(a,b){for(var c=0;c<a.length;c++){var d=a[c];if(d=d&&d.attrs,d&&null!=d.key&&b(d,c))break}}function t(a){try{if(null!=a&&null!=a.toString())return a}catch(b){}return""}function u(a){for(var b=0;b<a.length;b++)dc(a[b])&&(a=a.concat.apply([],a),b--);return a}function v(a,b,c){a.insertBefore(b,a.childNodes[c]||null)}function w(a,b,c,d,e,f,g,h,i,j,k){return{parent:a,pTag:b,pCache:c,pIndex:d,data:e,cached:f,reattach:g,index:h,editable:i,ns:j,cfgs:k}}function x(a){return a.data=t(a.data),"retain"===a.data.subtree?a.cached:(y(a),dc(a.data)?B(a):null!=a.data&&d(a.data)?H(a):c(a.data)?a.cached:_(a))}function y(a){if(null!=a.cached){if(bc.call(a.cached)===bc.call(a.data))return;if(a.pCache&&a.pCache.nodes){var b=a.index-a.pIndex,c=b+(dc(a.data)?a.data:a.cached.nodes).length;nb(a.pCache.nodes.slice(b,c),a.pCache.slice(b,c))}else a.cached.nodes&&nb(a.cached.nodes,a.cached)}a.cached=new a.data.constructor,a.cached.tag&&(a.cached={}),a.cached.nodes=[]}function z(a){var b=0;s(a,function(){return g(a,function(a){a=a&&a.attrs,a&&null==a.key&&(a.key="__mithril__"+b++)}),!0})}function A(a,b,c,d){return x(w(a.parent,a.pTag,a.cached,a.index,b,c,a.reattach,a.index+d||d,a.editable,a.ns,a.cfgs))}function B(a){a.data=u(a.data);var c=[],d=a.cached.length===a.data.length,e=0,f={},g=!1;s(a.cached,function(a,b){g=!0,f[a.key]={action:ec,index:b}}),z(a.data),g&&C(a,f);for(var h=0,i=0,j=a.data.length;j>i;i++){var k=A(a,a.data[i],a.cached[h],e);k!==b&&(d=d&&k.nodes.intact,e+=gb(k),a.cached[h++]=k)}return d||E(a,c),a.cached}function C(a,b){var c=a.data.length!==a.cached.length;c||s(a.data,function(b,d){var e=a.cached[d];return c=e&&e.attrs&&e.attrs.key!==b.key}),c&&D(a,b)}function D(a,b){var c=a.cached.nodes;s(a.data,function(a,d){a=a.key,b[a]=b[a]?{action:gc,index:d,from:b[a].index,element:c[b[a].index]||Zb.createElement("div")}:{action:fc,index:d}});var d=[];h(b,function(a){d.push(a)});var e=d.sort(hb),f=new Array(a.cached.length);f.nodes=a.cached.nodes.slice(),g(e,function(b){var c=b.index;switch(b.action){case ec:nb(a.cached[c].nodes,a.cached[c]),f.splice(c,1);break;case fc:var d=Zb.createElement("div");d.key=a.data[c].attrs.key,v(a.parent,d,c),f.splice(c,0,{attrs:{key:a.data[c].attrs.key},nodes:[d]}),f.nodes[c]=d;break;case gc:var e=b.element;a.parent.childNodes[c]!==e&&a.parent.insertBefore(e,a.parent.childNodes[c]||null),f[c]=a.cached[b.from],f.nodes[c]=e}}),a.cached=f}function E(a,b){for(var c=0,d=a.data.length;d>c;c++){var e=a.cached[c];null!=e&&b.push.apply(b,e.nodes)}g(a.cached.nodes,function(c,d){null!=c.parentNode&&b.indexOf(c)<0&&nb([c],[a.cached[d]])}),a.data.length<a.cached.length&&(a.cached.length=a.data.length),a.cached.nodes=b}function F(a){var b=a.data.attrs=a.data.attrs||{};a.cached.attrs=a.cached.attrs||{};var c=Object.keys(a.data.attrs);return N(a,c),c.length>+("key"in b)}function G(a){var b=a.data;return b.attrs.xmlns?b.attrs.xmlns:"svg"===b.tag?"http://www.w3.org/2000/svg":"math"===b.tag?"http://www.w3.org/1998/Math/MathML":a.ns}function H(a){var b=[],c=[];if(I(a,b,c),!a.data.tag&&c.length)throw new Error("Component template must return a virtual element, not an array, string, etc.");var d=F(a);return e(a.data.tag)?R({builder:a,hasKeys:d,views:b,controllers:c,ns:G(a)}):void 0}function I(a,b,c){for(var d=a.cached&&a.cached.controllers;null!=a.data.view;)J(a,d,c,b)}function J(a,b,c,d){var e=a.data.view.$original||a.data.view,f=M(a.cached.views,e,b,a.data.controller),g=+(a.data&&a.data.attrs&&a.data.attrs.key);return a.data=0===ic||hc||b&&b.indexOf(f)>-1?a.data.view(f):{tag:"placeholder"},"retain"===a.data.subtree?a.cached:(g===g&&((a.data.attrs=a.data.attrs||{}).key=g),void L(d,c,e,f))}function K(a,b){a.ctrls.splice(a.ctrls.indexOf(a.ctrl),1),a.views.splice(a.views.indexOf(a.view),1),a.ctrl&&c(a.ctrl.onunload)&&a.ctrl.onunload(b)}function L(a,b,c,d){a.push(c),jc[b.push(d)-1]={views:a,view:c,ctrl:d,ctrls:b}}function M(a,b,d,e){var f="diff"===lc()&&a?a.indexOf(b):-1;return f>-1?d[f]:c(e)?new e:{}}function N(a,b){P(a,b)&&(a.cached.nodes.length&&nb(a.cached.nodes),a.cached.cfgCtx&&c(a.cached.cfgCtx.onunload)&&a.cached.cfgCtx.onunload(),a.cached.controllers&&g(a.cached.controllers,function(a){a.unload&&a.onunload({preventDefault:f})}))}function O(a,c){var d=a.length;if(d!==c.length)return!1;for(var e=0,f=Object.create(null);d>e;)f[c[e]]=e++;for(;0!==e;)if(f[a[--e]]===b)return!1;return!0}function P(a,b){var c=a.data,d=a.cached;return c.tag!==d.tag?!0:O(b,Object.keys(d.attrs))?c.attrs.id!==d.attrs.id?!0:c.attrs.key!==d.attrs.key?!0:"all"===lc()?!d.cfgCtx||d.cfgCtx.retain!==!0:"diff"===lc()?d.cfgCtx&&d.cfgCtx.retain===!1:!1:!0}function Q(a){var b=S(a);return a.builder.cached=W(a,b,T(a,b),V(a,b)),b}function R(a){var b=a.builder,c=0===b.cached.nodes.length,d=c?Q(a):Z(a);return(c||b.reattach&&null!=d)&&v(b.parent,d,b.index),$(b,d,c),b.cached}function S(a){var c=a.builder.data;return a.ns===b?c.attrs.is?Zb.createElement(c.tag,c.attrs.is):Zb.createElement(c.tag):c.attrs.is?Zb.createElementNS(a.ns,c.tag,c.attrs.is):Zb.createElementNS(a.ns,c.tag)}function T(a,b){var c=a.builder.data;return a.hasKeys?lb(b,c.tag,c.attrs,{},a.ns):c.attrs}function U(a,c,d){var e=a.builder;return x(w(c,e.data.tag,b,b,e.data.children,e.cached.children,d,0,e.data.attrs.contenteditable?c:e.editable,a.ns,e.cfgs))}function V(a,b){var c=a.builder.data.children;return null!=c&&c.length?U(a,b,!0):c}function W(a,b,c,d){var e=a.builder.data,f={tag:e.tag,attrs:c,children:d,nodes:[b]};return Y(a,f),f.children&&!f.children.nodes&&(f.children.nodes=[]),"select"===e.tag&&"value"in e.attrs&&lb(b,e.tag,{value:e.attrs.value},{},a.ns),f}function X(a){if(a.onunload&&a.onunload.$old&&(a.onunload=a.onunload.$old),ic&&a.onunload){var b=a.onunload;a.onunload=f,a.onunload.$old=b}}function Y(a,b){a.controllers.length&&(b.views=a.views,b.controllers=a.controllers,g(a.controllers,X))}function Z(a){var b=a.builder.cached,c=b.nodes[0];return a.hasKeys&&lb(c,a.builder.data.tag,a.builder.data.attrs,b.attrs,a.ns),b.children=U(a,c,!1),b.nodes.intact=!0,a.controllers.length&&(b.views=a.views,b.controllers=a.controllers),c}function $(a,b,d){var e=a.data,f=a.cached,g=e.attrs.config;if(c(g)){var h=f.cfgCtx=f.cfgCtx||{};a.cfgs.push(function(){return g.call(e,b,!d,h,f)})}}function _(a){return 0===a.cached.nodes.length?bb(a):a.cached.valueOf()!==a.data.valueOf()||a.reattach?cb(a):(a.cached.nodes.intact=!0,a.cached)}function ab(a){return!/^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/.test(a)}function bb(a){var b;a.data.$trusted?b=pb(a.parent,a.index,a.data):(b=[Zb.createTextNode(a.data)],ab(a.parent.nodeName)&&v(a.parent,b[0],a.index));var c;return c="string"==typeof a.data||"number"==typeof a.data||"boolean"==typeof a.data?new a.data.constructor(a.data):a.data,c.nodes=b,c}function cb(a){var b=a.cached.nodes;return a.editable&&a.editable===Zb.activeElement||(a.data.$trusted?(nb(b,a.cached),b=pb(a.parent,a.index,a.data)):"textarea"===a.pTag?a.parent.value=a.data:a.editable?a.editable.innerHTML=a.data:((1===b[0].nodeType||b.length>1||b[0].nodeValue.trim&&!b[0].nodeValue.trim())&&(nb(a.cached.nodes,a.cached),b=[Zb.createTextNode(a.data)]),db(a,b[0]))),a.cached=new a.data.constructor(a.data),a.cached.nodes=b,a.cached}function db(a,b){try{v(a.parent,b,a.index),b.nodeValue=a.data}catch(c){}}function eb(){ic++}function fb(){ic>1?ic--:(ic=0,r.redraw())}function gb(a){if(!a.$trusted)return dc(a)?a.length:1;var b=a.match(/<[^\/]|\>\s*[^<]/g);return null!=b?b.length:void 0}function hb(a,b){return a.action-b.action||a.index-b.index}function ib(a){return!/^(list|style|form|type|width|height)$/.test(a)}function jb(a,b,e,f,g,i){if("config"!==a&&"key"!==a)if(c(b)&&"on"===a.slice(0,2))f[a]=qb(b,f);else if("style"===a&&null!=b&&d(b)){h(b,function(a,b){(null==e||e[b]!==a)&&(f.style[b]=a)});for(var j in e)cc.call(e,j)&&(cc.call(b,j)||(f.style[j]=""))}else null!=g?"href"===a?f.setAttributeNS("http://www.w3.org/1999/xlink","href",b):f.setAttribute("className"===a?"class":a,b):a in f&&ib(a)?("input"!==i||f[a]!==b)&&(f[a]=b):f.setAttribute(a,b)}function kb(a,b,c,d,e,f){try{jb(a,b,c,d,e,f)}catch(g){if(/\bInvalid argument\b/.test(g.message))throw g}}function lb(a,b,c,d,e){return h(c,function(c,f){var g=d[f];f in d&&g===c?"value"===f&&"input"===b&&a.value!=c&&(a.value=c):(d[f]=c,kb(f,c,g,a,e,b))}),d}function mb(a){try{a.parentNode.removeChild(a)}catch(b){}}function nb(a,b){if(a.length){b=[].concat(b);for(var c=a.length-1;c>=0;c--){var d=a[c];null!=d&&d.parentNode&&(mb(d),b[c]&&ob(b[c]))}a.length&&(a.length=0)}}function ob(a){a.cfgCtx&&c(a.cfgCtx.onunload)&&(a.cfgCtx.onunload(),a.cfgCtx.onunload=null),a.controllers&&g(a.controllers,function(a){c(a.onunload)&&a.onunload({preventDefault:f})}),a.children&&(dc(a.children)?g(a.children,ob):a.children.tag&&ob(a.children))}function pb(a,b,c){var d=a.childNodes[b];if(d)if(1!==d.nodeType){var e=Zb.createElement("span");a.insertBefore(e,d||null),e.insertAdjacentHTML("beforebegin",c),a.removeChild(e)}else d.insertAdjacentHTML("beforebegin",c);else mc(a,c);for(var f=[];a.childNodes[b]!==d;)f.push(a.childNodes[b++]);return f}function qb(a,b){return function(c){lc("diff"),eb();try{return a.call(b,c||event)}finally{zb()}}}function rb(a){var b=oc.indexOf(a);return 0>b?oc.push(a)-1:b}function sb(a,b,c,d){var e=null===a;if(!d){lc("all"),eb(),rc[c]=b,a=qc=a||{controller:f};var g=new(a.controller||f);return a===qc&&(tc[c]=g,sc[c]=a),zb(),e&&ub(b,c),tc[c]}e&&ub(b,c)}function tb(a,b){if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var d=rc.indexOf(a);0>d&&(d=rc.length);var e=!1,f={preventDefault:function(){e=!0,uc=vc=null}};return g(jc,function(a){null!=a.ctrl&&(K(a,f),a.ctrl.onunload=null)}),e?g(jc,function(a){a.ctrl.onunload=function(b){K(a,b)}}):jc=[],tc[d]&&c(tc[d].onunload)&&tc[d].onunload(f),sb(b,a,d,e)}function ub(a,b){rc.splice(b,1),tc.splice(b,1),sc.splice(b,1),Ob(a),oc.splice(rb(a),1)}function vb(){0!==xc&&ac(xc),xc=_b(yb,wc)}function wb(){xc=0}function xb(a){xc&&!a?zc():(yb(),xc=_b(wb,wc))}function yb(){uc&&(uc(),uc=null);for(var a=0;a<rc.length;a++){var b=rc[a],c=sc[a],d=tc[a];null!=d&&r.render(b,c.view?c.view(d,[d]):"")}vc&&(vc(),vc=null),xc=null,yc=new Date,lc("diff")}function zb(){"none"===lc()?(ic--,lc("diff")):fb()}function Ab(){var a=$b[Hb.mode];"pathname"===Hb.mode&&(a+=$b.search),Bc!==Ib(a)&&Dc(a)}function Bb(b){a[b]=Ab,uc=Lb,a[b]()}function Cb(){return("pathname"===Hb.mode?"":$b.pathname)+Cc[Hb.mode]}function Db(){a.history.pushState(null,Zb.title,Cc[Hb.mode]+Bc)}function Eb(){a.history.replaceState(null,Zb.title,Cc[Hb.mode]+Bc)}function Fb(b){a.history.pushState?(uc=Lb,vc=b?Eb:Db,Dc(Cc[Hb.mode]+Bc)):($b[Hb.mode]=Bc,Dc(Cc[Hb.mode]+Bc))}function Gb(a,b,c){arguments.length<3&&"object"!=typeof b&&(c=b,b=null);var d=Bc;Bc=a;var e,f,g=b||{},i=Bc.indexOf("?");if(i>=0){var j=Nb(Bc.slice(i+1));h(g,function(a,b){j[b]=g[b]}),e=Mb(j),f=Bc.slice(0,i)}else e=Mb(b),f=Bc;if(e){var k=-1===f.indexOf("?")?"?":"&";Bc=f+k+e}return Fb(c||d===a)}function Hb(a,b,c,d){if(0===arguments.length)return Bc;if(3===arguments.length&&e(b))Dc=function(d){var e=Bc=Ib(d);if(!Jb(a,c,e)){if(Ec)throw new Error("Ensure the default route matches one of the routes defined in m.route");Ec=!0,Hb(b,!0),Ec=!1}},Bb("hash"===Hb.mode?"onhashchange":"onpopstate");else if(a.addEventListener||a.attachEvent)a.href=Cb()+d.attrs.href,a.addEventListener?(a.removeEventListener("click",Kb),a.addEventListener("click",Kb)):(a.detachEvent("onclick",Kb),a.attachEvent("onclick",Kb));else if(e(a))return Gb.apply(null,arguments)}function Ib(a){return a.slice(Cc[Hb.mode].length)}function Jb(a,b,c){var d=c.indexOf("?");d>=0?(Ac=Nb(c.substr(d+1,c.length)),c=c.substr(0,d)):Ac={};var e=Object.keys(b),f=e.indexOf(c);if(f>=0)return tb(a,b[e[f]]),!0;for(var h in b)if(cc.call(b,h)){if(h===c)return tb(a,b[h]),!0;var i=new RegExp("^"+h.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(i.test(c))return c.replace(i,function(){for(var a=[],b=1,c=arguments.length-2;c>b;)a.push(arguments[b++]);var d=h.match(/:[^\/]+/g)||[];g(d,function(b,c){b=b.replace(/:|\./g,""),Ac[b]=decodeURIComponent(a[c])})}),tb(a,b[h]),!0}}function Kb(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!==a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;var b,c=a.currentTarget||a.srcElement;for(b="pathname"===Hb.mode&&c.search?Nb(c.search.slice(1)):{};c&&"A"!==c.nodeName.toUpperCase();)c=c.parentNode;ic=0,Hb(c[Hb.mode].slice(Cc[Hb.mode].length),b)}}function Lb(){"hash"!==Hb.mode&&$b.hash?$b.hash=$b.hash:a.scrollTo(0,0)}function Mb(a,c){var e={},f=[];return h(a,function(a,h){var i=c?c+"["+h+"]":h;if(null===a)f.push(encodeURIComponent(i));else if(d(a))f.push(Mb(a,i));else if(dc(a)){var j=[];e[i]=e[i]||{},g(a,function(a){e[i][a]||(e[i][a]=!0,j.push(encodeURIComponent(i)+"="+encodeURIComponent(a)))}),f.push(j.join("&"))}else a!==b&&f.push(encodeURIComponent(i)+"="+encodeURIComponent(a))}),f.join("&")}function Nb(a){if(!a)return{};"?"===a[0]&&(a=a.slice(1));var b=a.split("&"),c={};return g(b,function(a){var b=a.split("="),d=decodeURIComponent(b[0]),e=2===b.length?decodeURIComponent(b[1]):null;null!=c[d]?(dc(c[d])||(c[d]=[c[d]]),c[d].push(e)):c[d]=e}),c}function Ob(a){var c=rb(a);nb(a.childNodes,pc[c]),pc[c]=b}function Pb(a,b,c){return k(a)?a.then(function(a){Pb(a,b,c)},function(a){Pb(a,c,c)}):b(a)}function Qb(a,d){function e(a){r=a}function f(a){a.resolve(r)}function h(a){a.reject(r)}function i(a){return u!==h&&a(r),a}function j(a){t.push(a)}function l(a,b){var c=Rb().resolve(a()).promise;return b!==h&&c(r),c.then(b)}function m(a){u=a,g(t,a),n=q=null}function n(a,b){Pb(a,function(a){r=a,m(b===Hc?f:h)},function(a){r=a,m(h)})}function o(a,b){var c=0;try{return a.then(function(a){c++||q(Fc,a,b)},function(a){c++||q(Gc,a,b)})}catch(d){return Rb.onerror(d),q(Gc,d,b)}}function p(b,e,f){try{e===Fc&&c(a)?b=a(b):e===Gc&&c(d)&&(b=d(b),e=Fc)}catch(g){return Rb.onerror(g),n(g,Ic)}return b===f?n(TypeError(),Ic):n(b,e===Fc?Hc:Ic)}function q(a,b,c){var d;try{d=k(b)}catch(e){return Rb.onerror(e),q(Gc,e,c)}return a===Gc&&Rb.onerror(b),d?o(b,c):p(b,a,c)}var r,s=this,t=[],u=j;s.resolve=function(a){return u===j&&q(Fc,a,s),s},s.reject=function(a){return u===j&&q(Gc,a,s),s},s.promise=function(a){return arguments.length&&Pb(a,e,e),u!==h?r:b},s.promise.then=function(a,b){var c=new Qb(a,b);return u(c),i(c.promise)},s.promise.catch=function(a){return s.promise.then(null,a)},s.promise.finally=function(a){return s.promise.then(function(){return l(a,function(){return r})},function(){return l(a,function(){throw r})})}}function Rb(){return new Qb}function Sb(a){return a instanceof EvalError||a instanceof RangeError||a instanceof ReferenceError||a instanceof SyntaxError||a instanceof TypeError||a instanceof URIError}function Tb(){return"mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36)}function Ub(c){var d=Tb(),e=Zb.createElement("script");a[d]=function(f){e.parentNode.removeChild(e),c.onload({success:!0,target:{responseText:f}}),a[d]=b},e.onerror=function(){return e.parentNode.removeChild(e),c.onerror({success:!1,target:{status:500,responseText:'{"error": "Error making jsonp request"}'}}),a[d]=b,!1},e.onload=function(){return!1},e.src=c.url+(c.url.indexOf("?")>0?"&":"?")+(c.callbackKey||"callback")+"="+d+"&"+Mb(c.data||{}),Zb.body.appendChild(e)}function Vb(b){var d=new a.XMLHttpRequest;if(d.open(b.method,b.url,!0,b.user,b.password),d.onreadystatechange=function(){4===this.readyState&&(this.status>=200&&this.status<300?b.onload({success:!0,target:this}):b.onerror({success:!1,target:this}))},b.serialize===JSON.stringify&&b.data&&"GET"!==b.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),b.deserialize===JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),c(b.config)){var f=b.config(d,b);null!=f&&(d=f)}var g;if(g="GET"!==b.method&&b.data?b.data:"",g&&!e(g)&&!(g instanceof a.FormData))throw new Error("Request data should be either be a string or FormData. Check the `serialize` option in `m.request`");return d.send(g),d}function Wb(a){return a.dataType&&"JSONP"===a.dataType.toUpperCase()?Ub(a):Vb(a)}function Xb(a,b,c){if("GET"===a.method&&"jsonp"!==a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=Mb(b);a.url+=e?d+e:""}else a.data=c(b);return a}function Yb(a,b){var c=a.match(/:[a-z]\w+/gi);return c&&b&&g(c,function(c){var d=c.slice(1);a=a.replace(c,b[d]),delete b[d]}),a}r.version=function(){return"v0.2.1"};var Zb,$b,_b,ac,bc={}.toString,cc={}.hasOwnProperty,dc=Array.isArray||function(a){return"[object Array]"===bc.call(a)};i(a),r.deps=function(b){return i(a=b||a),a},r.prop=function(a){return k(a)?m(a):j(a)},r.component=q;var ec=1,fc=2,gc=3,hc=!1,ic=0,jc=[],kc=!1;r.redraw=function(a){if(!kc){kc=!0,a&&(hc=!0);try{xb(a)}finally{kc=hc=!1}}};var lc=r.redraw.strategy=r.prop();r.startComputation=eb,r.endComputation=fb;var mc=function(){try{return Zb.createRange().createContextualFragment("x"),function(a,b){a.appendChild(Zb.createRange().createContextualFragment(b))}}catch(a){return function(a,b){a.insertAdjacentHTML("beforeend",b)}}}(),nc={appendChild:function(a){Zb.documentElement&&Zb.documentElement!==a?Zb.replaceChild(a,Zb.documentElement):Zb.appendChild(a),this.childNodes=Zb.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},oc=[],pc={};r.render=function(a,c,d){if(!a)throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render exists.");var e,f=[],h=rb(a),i=a===Zb;e=i||a===Zb.documentElement?nc:a,i&&"html"!==c.tag&&(c={tag:"html",attrs:{},children:c}),pc[h]===b&&nb(e.childNodes),d===!0&&Ob(a),pc[h]=x(w(e,null,b,b,c,pc[h],!1,0,null,b,f)),g(f,function(a){a()})},r.trust=function(a){return a=new String(a),a.$trusted=!0,a};var qc,rc=[],sc=[],tc=[],uc=null,vc=null,wc=16;r.mount=r.module=tb;var xc=0,yc=0,zc=_b===a.requestAnimationFrame?vb:function(){+new Date-yc>wc&&vb()};r.withAttr=function(a,b,c){return function(d){d=d||event;var e,f=d.currentTarget||this;e=a in f?f[a]:f.getAttribute(a),b.call(c||this,e)}};var Ac,Bc,Cc={pathname:"",hash:"#",search:"?"},Dc=f,Ec=!1;r.route=Hb,Hb.param=function(a){if(!Ac)throw new Error("You must call m.route(element, defaultRoute, routes) before calling mroute.param()");return a?Ac[a]:Ac},Hb.mode="search",Hb.buildQueryString=Mb,Hb.parseQueryString=Nb;var Fc=1,Gc=2,Hc=3,Ic=4;return r.deferred=Rb,Rb.prototype=Qb.prototype,Rb.prototype.constructor=Rb,Rb.onerror=function(a){if(Sb(a))throw ic=0,a},r.sync=function(a){function b(a,b){return e[a]=b,0===--d&&(c.promise(e),c[f](e)),b}var c=new Qb,d=a.length,e=new Array(d),f="resolve";return a.length>0?g(a,function(a,c){a.then(function(a){return b(c,a)},function(a){return f="reject",b(c,a)})}):c.resolve([]),c.promise},r.request=function(a){a.background!==!0&&eb();var b=Rb(),c=function(a){return a},d=c,e=function(a){return a.responseText};return a.dataType&&"JSONP"===a.dataType.toUpperCase()||(c=a.serialize||JSON.stringify,d=a.deserialize||JSON.parse,e=a.extract||function(a){return a.responseText.length||d!==JSON.parse?a.responseText:null}),a.serialize=c,a.deserialize=d,a.method=(a.method||"GET").toUpperCase(),a.url=Yb(a.url,a.data),a=Xb(a,a.data,c),a.onload=a.onerror=function(c){c=c||event;var f,h=c.success;f=h?a.unwrapSuccess:a.unwrapError;try{var i=d(e(c.target,a));f&&(i=f(i,c.target)),h?(dc(i)&&a.type?g(i,function(b,c){i[c]=new a.type(b)}):a.type&&(i=new a.type(i)),b.resolve(i)):b.reject(i)}catch(j){b.reject(j)}finally{a.background!==!0&&fb()}},Wb(a),b.promise(a.initialValue),b.promise},r});
//# sourceMappingURL=mithril.min.js.map
/**
 serialized-property - serialize and deserialize property
 @version v0.0.1
 @link https://github.com/7korobi/serialized-property
 @license 
**/
(function(){var Serial,array_base_parser,c,func,i,key,len,n,pack,patch_size,ref,serial,string_parser,string_serializer,unpack;for(serial={to_s:"0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",to_i:{}},ref=serial.to_s,n=i=0,len=ref.length;len>i;n=++i)c=ref[n],serial.to_i[c]=n;serial.size=serial.to_s.length,patch_size=serial.size*serial.size*serial.size,string_parser=function(r){switch(r){case"":case null:case void 0:return"";default:return String(r)}},string_serializer=function(r){switch(r){case"":case null:case void 0:return"";default:return String(r).replace(/[~\/=.&\?\#\[\]()\"'`;]/g,function(r){return"%"+r.charCodeAt(0).toString(16)})}},array_base_parser=function(r){return Array.isArray(r)?r:(""+r).split(",")},pack={Keys:function(r){var e,n,t;return t=function(){var t;if(Array.isArray(r))return r;t=[];for(n in r)e=r[n],e&&t.push(n);return t}(),pack.Array(t.sort())},Array:function(r){return Array.isArray(r)?r.join(","):""+r},Date:function(r){var e,n;for(n=Math.floor(r),e="";n>=1;)e+=serial.to_s[n%serial.size],n=Math.floor(n/serial.size);return e},Bool:function(r){return r?"T":"F"},Number:string_serializer,Text:string_serializer,String:string_serializer,"null":string_serializer,undefined:string_serializer,Thru:function(r){return r}},unpack={HtmlGon:function(html){var code,pattern,script;for(pattern=/<script.*?>([\s\S]*?)<\/script>/gi;script=pattern.exec(html);)code=script[1],code.length>0&&eval(code);return gon},Keys:function(r){var e,n,t,a,i,s;if(n={},r.length)for(s=array_base_parser(r),t=0,i=s.length;i>t;t++)a=s[t],n[a]=!0;else for(a in r)e=r[a],e&&(n[a]=!0);return n},Array:function(r){return r.length?array_base_parser(r):[]},Date:function(r){var e,t,a,i;if(r>0)return r;for(e=1,i=0,t=0,a=r.length;a>t;t++){if(c=r[t],n=serial.to_i[c],null==n)return Number.NaN;i+=n*e,e*=serial.size}return i},Bool:function(r){switch(r){case!0:case"T":return!0;case!1:case"F":return!1;default:return Number.NaN}},Number:Number,Text:string_parser,String:string_parser,"null":string_parser,undefined:string_parser,Thru:function(r){return r}},Serial={url:{},ID:{now:function(){return Serial.ID.at(_.now())},at:function(r,e){return null==e&&(e=Math.random()*patch_size),pack.Date(r*patch_size+e)}}};for(key in unpack)func=unpack[key],Serial.url[key]=function(){switch(key){case"Number":return"([-]?[\\.0-9]+)";case"Date":return"([0-9a-zA-Z]+)";case"Array":case"Keys":return"([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)";case"Text":return"([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)";default:return"([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]+)"}}();this.pack=pack,this.unpack=unpack,this.Serial=Serial}).call(this);
(function() {
  var b;

  if (head.browser != null) {
    b = head.browser;
    b.viewport = "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0";
    if (-1 < navigator.userAgent.toLowerCase().indexOf('windows')) {
      b.win = true;
    }
    if (-1 < navigator.userAgent.toLowerCase().indexOf('macintosh')) {
      b.mac = true;
    }
    if (-1 < navigator.userAgent.toLowerCase().indexOf('android')) {
      b.android = true;
    }
    if (b.chrome && b.version < 40) {
      b.old = true;
    }
  }

  head.useragent = navigator.userAgent;

}).call(this);

/*
form v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var Txt, out$ = typeof exports != 'undefined' && exports || this;
  out$.Txt = Txt = {
    input: function(prop){
      return {
        onblur: m.withAttr("value", prop),
        onchange: m.withAttr("value", prop),
        value: prop()
      };
    }
  };
}).call(this);

/*
MenuTree v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var MenuTree, Drill, Icon, MenuNode, out$ = typeof exports != 'undefined' && exports || this;
  out$.MenuTree = MenuTree = (function(){
    MenuTree.displayName = 'MenuTree';
    var prototype = MenuTree.prototype, constructor = MenuTree;
    function MenuTree(){
      var this$ = this;
      this.state = m.prop();
      this.nodes = {};
      this.change = function(val){
        var old;
        old = this$.state();
        if (!arguments.length) {
          return old;
        }
        this$.state(val);
        if (old !== val) {
          if (this$.nodes[val]) {
            this$.nodes[val].open(this$.nodes[val].menu);
          }
          if (this$.nodes[old]) {
            return this$.nodes[old].close(this$.nodes[old].menu);
          }
        }
      };
    }
    prototype.open = function(node){
      node == null && (node = this.nodes[this.state()]);
      if (node) {
        return node.open(node.menu);
      }
    };
    prototype.start = function(style, mark){
      style.key = "start-" + mark;
      return Btn.menu(style, this.change, mark);
    };
    prototype.cancel = function(style){
      style.key = "cancel-" + mark;
      return Btn.set(style, this.change, "");
    };
    prototype.view = function(node){
      node == null && (node = this.nodes[this.state()]);
      if (node) {
        return [node.view(node.menu), node.menu.view()];
      } else {
        return [];
      }
    };
    prototype.each = function(order, cb){
      var i$, len$, item, node, results$ = [];
      for (i$ = 0, len$ = order.length; i$ < len$; ++i$) {
        item = order[i$];
        node = this.nodes[item];
        if (!node) {
          continue;
        }
        results$.push(cb(node));
      }
      return results$;
    };
    prototype.radio = function(style, prop, reduce_base, field_name, name_cb){
      var caption_vdom, reduce, data, order_by, list, i$, len$, key, size, name, order;
      caption_vdom = function(name, val){
        return [m("span", name), m("span.emboss.pull-right", val)];
      };
      reduce = reduce_base[field_name];
      data = {};
      order_by = {};
      list = Object.keys(reduce);
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        key = list[i$];
        size = reduce[key].count;
        name = name_cb(key, reduce[key]);
        order_by[key] = size;
        data[key] = caption_vdom(name, size);
      }
      if (!data.all) {
        list.push("all");
        size = reduce_base.all.all.count;
        order_by.all = size;
        data.all = caption_vdom("- 全体 -", size);
      }
      order = list.sort(function(a, b){
        return order_by[b] - order_by[a];
      });
      return Btns.radio(style, prop, data, order);
    };
    prototype.node = function(id, options){
      var ref$, ref1$;
      return (ref1$ = (ref$ = this.nodes)[id]) != null
        ? ref1$
        : ref$[id] = new MenuNode(id, options);
    };
    return MenuTree;
  }());
  MenuTree.Drill = Drill = (function(superclass){
    var prototype = extend$((import$(Drill, superclass).displayName = 'Drill', Drill), superclass).prototype, constructor = Drill;
    prototype.drill = function(id, options){
      var node;
      return node = this.node(id, options);
    };
    prototype.drills = function(style, order){
      var this$ = this;
      return this.each(order, function(drill){
        return m("span.btn", this$.start(style, drill.id), drill.caption, m("span.note", "▼"));
      });
    };
    function Drill(){
      Drill.superclass.apply(this, arguments);
    }
    return Drill;
  }(MenuTree));
  MenuTree.Icon = Icon = (function(superclass){
    var prototype = extend$((import$(Icon, superclass).displayName = 'Icon', Icon), superclass).prototype, constructor = Icon;
    prototype.icon = function(id, options){
      var node;
      node = this.node(id, options);
      if (this.state() === id) {
        return [];
      } else {
        return this.view(node);
      }
    };
    function Icon(){
      Icon.superclass.apply(this, arguments);
    }
    return Icon;
  }(MenuTree));
  MenuNode = (function(){
    MenuNode.displayName = 'MenuNode';
    var prototype = MenuNode.prototype, constructor = MenuNode;
    function MenuNode(id, options){
      var key, val;
      this.id = id;
      this.menu = new MenuTree.Drill();
      for (key in options) {
        val = options[key];
        this[key] = val;
      }
      this.deploy(this.menu);
    }
    prototype.caption = "";
    prototype.deploy = function(){};
    prototype.open = function(){};
    prototype.close = function(){};
    prototype.view = function(){
      return [];
    };
    return MenuNode;
  }());
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

/*
timer v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var Timer, out$ = typeof exports != 'undefined' && exports || this;
  out$.Timer = Timer = (function(){
    Timer.displayName = 'Timer';
    var prototype = Timer.prototype, constructor = Timer;
    Timer.week = ["日", "月", "火", "水", "木", "金", "土"];
    Timer.dow = function(dow){
      return Timer.week[dow];
    };
    Timer.hh = _.memoize(function(hh){
      var tt;
      tt = ["午前", "午後"][Math.floor(hh / 12)];
      hh = hh % 12;
      if (hh < 10) {
        hh = "0" + hh;
      }
      return tt + "" + hh + "時";
    });
    Timer.hhmm = _.memoize(function(hh, mi){
      if (mi < 10) {
        mi = "0" + mi;
      }
      return Timer.hh(hh) + "" + mi + "分";
    });
    Timer.time_stamp = _.memoize(function(date){
      var now, hh, mi, dow, mm, dd;
      if (!date) {
        return "(？) ？？..時..分";
      }
      now = new Date(date);
      hh = now.getHours();
      mi = now.getMinutes();
      dow = Timer.dow(now.getDay());
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
      return "(" + dow + ") " + Timer.hhmm(hh, mi);
    });
    Timer.date_time_stamp = _.memoize(function(date){
      var now, yyyy, mm, dd, dow, hh, mi, postfix;
      if (!date) {
        return "....-..-.. (？) ？？..時頃";
      }
      now = new Date(date - -15 * 60000);
      yyyy = now.getFullYear();
      mm = now.getMonth() + 1;
      dd = now.getDate();
      dow = Timer.dow(now.getDay());
      hh = now.getHours();
      mi = now.getMinutes();
      postfix = ["頃", "半頃"][Math.floor(mi / 30)];
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
      return yyyy + "-" + mm + "-" + dd + " (" + dow + ") " + Timer.hh(hh) + postfix;
    });
    Timer.cache = {};
    Timer.fetch = function(at){
      var ref$, ref1$;
      return (ref1$ = (ref$ = Timer.cache)[at]) != null
        ? ref1$
        : ref$[at] = new Timer(at);
    };
    Timer.tick = function(cb){
      var action;
      action = function(){
        var tick;
        tick = cb(_.now());
        if (tick) {
          return setTimeout(function(){
            return action();
          }, tick);
        }
      };
      return action();
    };
    function Timer(at){
      this.at = at;
    }
    prototype.start = function(bind){
      var this$ = this;
      this.tick = function(now){
        this$.msec = now - this$.at;
        return this$.next(this$.msec / 1000, function(text, sec_span){
          var msec_span, diff;
          this$.text = text;
          sec_span == null && (sec_span = Number.NaN);
          if (!bind.update) {
            return 0;
          }
          bind.update(this$.text);
          msec_span = sec_span * 1000;
          diff = this$.msec % msec_span;
          if (0 < diff) {
            return msec_span - diff;
          } else {
            return 1 - diff;
          }
        });
      };
      return Timer.tick(this.tick);
    };
    prototype.next = function(second, tick){
      var minute, hour, limit;
      if (0 < second) {
        minute = Math.floor(second / 60);
        hour = Math.floor(second / 3600);
      }
      if (second < 0) {
        minute = Math.floor(-second / 60);
        hour = Math.floor(-second / 3600);
      }
      limit = 3 * 60 * 60;
      if (-25 < second && second < 25) {
        return tick("25秒以内", 25);
      }
      if (0 < second && second < 60) {
        return tick("1分以内", 60);
      }
      if (-60 < second && second < 0) {
        return tick("1分以内", 25);
      }
      if (-3600 < second && second < 0) {
        return tick(minute + "分後", 60);
      }
      if (0 < second && second < 3600) {
        return tick(minute + "分前", 60);
      }
      if (-limit < second && second < 0) {
        return tick(hour + "時間後", 3600);
      }
      if (0 < second && second < limit) {
        return tick(hour + "時間前", 3600);
      }
      if (second < -limit) {
        return tick(Timer.date_time_stamp(this.at), 3600);
      }
      if (limit < second) {
        return tick(Timer.date_time_stamp(this.at));
      }
    };
    return Timer;
  }());
}).call(this);

/*
Url v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var getter_setter, do_define, Url, toString$ = {}.toString, out$ = typeof exports != 'undefined' && exports || this;
  getter_setter = {
    callee: function(store, current, parse, serial, key){
      var prop;
      prop = function(){
        var newval;
        if (arguments.length) {
          newval = parse(arguments[0]);
          newval == null && (newval = current);
          if (store !== newval) {
            store = newval;
            Url.options[key].bind(store);
            Url.replacestate();
          }
        }
        return store;
      };
      prop.toJSON = function(){
        return serial(store);
      };
      return prop;
    }
  };
  do_define = function(key, option){
    var parse, serial, current, ref$;
    parse = option.parse, serial = option.serial, current = option.current;
    (ref$ = Url.options[key]).bind == null && (ref$.bind = function(){});
    return Url.prop[key] = getter_setter.callee(current, current, parse, serial, key);
  };
  Url = (function(){
    Url.displayName = 'Url';
    var prototype = Url.prototype, constructor = Url;
    Url.routes = {};
    Url.cookies = {};
    Url.prop = {};
    Url.location = function(){
      return {
        cookie: document.cookie,
        protocol: location.protocol,
        host: location.host,
        pathname: location.pathname,
        search: location.search,
        hash: location.hash
      };
    };
    Url.define = function(props){
      var key, o, results$ = [];
      Url.options = props;
      for (key in props) {
        o = props[key];
        if (!o) {
          props[key] = o = {};
        }
        o.type == null && (o.type = "String");
        o.url = Serial.url[o.type];
        o.parse = unpack[o.type];
        o.serial = pack[o.type];
        o.current == null && (o.current = o.parse(""));
        results$.push(do_define(key, o));
      }
      return results$;
    };
    Url.binds = function(binds){
      var key, list, results$ = [];
      for (key in binds) {
        list = binds[key];
        results$.push(Url.bind(key, list));
      }
      return results$;
    };
    Url.bind = function(key, list){
      var binder, subs;
      Url.options[key].bind = (function(){
        var i$, ref$, len$;
        switch (toString$.call(list).slice(8, -1)) {
        case 'Function':
          return list;
        case 'Array':
          binder = Url.options[key].binder = {};
          for (i$ = 0, len$ = (ref$ = list).length; i$ < len$; ++i$) {
            subs = ref$[i$];
            binder[subs[key]] = subs;
          }
          return function(val){
            var subkey, ref$, subval;
            for (subkey in ref$ = binder[val]) {
              subval = ref$[subkey];
              if (!Url.prop[subkey]) {
                console.log([subkey, subval, binder[val]]);
              }
              if (key !== subkey) {
                Url.prop[subkey](subval);
              }
            }
          };
        }
      }());
    };
    Url.each = function(cb){
      var targets, target, data, url_key, ref$, route;
      Url.routes.cookie = Url.cookies;
      targets = Url.location();
      for (target in targets) {
        data = targets[target];
        for (url_key in ref$ = Url.routes[target]) {
          route = ref$[url_key];
          cb(route, targets[target], target, targets);
        }
      }
      return targets;
    };
    Url.popstate = function(){
      console.log("pop state");
      Url.each(function(route, data, target){
        return route.popstate(data, target);
      });
      return Url.mode = "replaceState";
    };
    Url.state = _.debounce(function(){
      var is_change, old_cookie, new_href;
      is_change = false;
      old_cookie = document.cookie;
      new_href = Url.href();
      if (old_cookie !== document.cookie) {
        is_change = true;
      }
      if (decodeURI(location.href) !== decodeURI(new_href)) {
        if (typeof history != 'undefined' && history !== null) {
          history[Url.mode]("pushstate", null, new_href);
        }
        is_change = true;
      }
      if (is_change) {
        return Url.popstate();
      }
    }, DELAY.presto);
    Url.pushstate = function(){
      Url.mode = "pushState";
      return Url.state();
    };
    Url.replacestate = function(){
      return Url.state();
    };
    Url.href = function(){
      var link;
      link = Url.each(function(route, data, target, targets){
        return targets[target] = route.replace(data, target);
      });
      return link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
    };
    Url.cookie = function(format, options){
      var url;
      url = new Url(format);
      url.options.cookie = options;
      return url;
    };
    function Url(format, options){
      var this$ = this;
      this.format = format;
      this.options = options != null
        ? options
        : {};
      this.keys_in_url = [];
      if (this.options.cookie) {
        Url.cookies[Serial.ID.now()] = this;
      }
      this.scanner = new RegExp(this.format.replace(/[.]/gi, function(key){
        return "\\" + key;
      }).replace(/:([a-z_]+)/gi, function(_, key){
        var ref$;
        this$.keys_in_url.push(key);
        return (ref$ = Url.options[key]) != null ? ref$.url : void 8;
      }, "i"));
    }
    prototype.popstate = function(path, target){
      var data, i$, ref$, len$, i, key, val;
      data = {};
      this.match = this.scanner.exec(path);
      if (this.match) {
        this.match.shift();
        for (i$ = 0, len$ = (ref$ = this.keys_in_url).length; i$ < len$; ++i$) {
          i = i$;
          key = ref$[i$];
          val = decodeURI(this.match[i]);
          data[key] = val;
          Url.prop[key](val);
        }
        if (typeof (ref$ = this.options).change == 'function') {
          ref$.change(data);
        }
      }
      return Url.replacestate();
    };
    prototype.replace = function(path, target){
      if (target === "cookie" && 'Object' === toString$.call(this.options.cookie).slice(8, -1)) {
        return this.set_cookie(this.serialize());
      }
      if (this.scanner.exec(path)) {
        return path.replace(this.scanner, this.serialize());
      }
      if (this.options.unmatch) {
        path += path.length
          ? "&"
          : this.options.unmatch;
        path += this.serialize();
      }
      return path;
    };
    prototype.serialize = function(){
      var path, i$, ref$, len$, key, serial, ref1$, val;
      path = this.format;
      for (i$ = 0, len$ = (ref$ = this.keys_in_url).length; i$ < len$; ++i$) {
        key = ref$[i$];
        serial = (ref1$ = Url.options[key]) != null ? ref1$.serial : void 8;
        val = Url.prop[key]();
        path = path.replace(RegExp(':' + key, 'gi'), serial(val));
      }
      return path;
    };
    prototype.set_cookie = function(value){
      var ary, ref$, time, domain, path, secure, expires;
      ary = [value];
      ref$ = this.options.cookie, time = ref$.time, domain = ref$.domain, path = ref$.path, secure = ref$.secure;
      if (time) {
        expires = new Date(Math.min(2147397247000, _.now() + time * 3600000));
        ary.push("expires=" + expires.toUTCString());
      }
      if (domain) {
        ary.push("domain=" + domain);
      }
      if (path) {
        ary.push("path=" + path);
      }
      if (secure) {
        ary.push("secure");
      }
      return document.cookie = ary.join("; ");
    };
    prototype.values = function(diff){
      var i$, ref$, len$, key, results$ = [];
      diff == null && (diff = {});
      for (i$ = 0, len$ = (ref$ = this.keys_in_url).length; i$ < len$; ++i$) {
        key = ref$[i$];
        results$.push(diff[key] || Url.prop[key]());
      }
      return results$;
    };
    return Url;
  }());
  out$.Url = Url;
}).call(this);

(function(){
  var player, unanchor, anchor, anchor_preview, unrandom, random, random_preview, link_regexp, link_regexp_g, id_num, uri_to_link, link, space, br, unbr, nowrap, unhtml, defines;
  player = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/(\/\*)(.*?)(\*\/|$)/g, '<em>$1<span class="player">$2</span>$3</em>');
  };
  unanchor = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/<mw (\w+),(\d+),([^>]+)>/g, function(key, a, turn, id){
      return ">>" + id;
    });
  };
  anchor = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/<mw (\w+),(\d+),([^>]+)>/g, function(key, a, turn, id){
      return "<span anchor=\"" + a + "," + turn + "," + id + "\" class=\"mark\">&gt;&gt;" + id + "</span>";
    });
  };
  anchor_preview = function(log){
    return log;
  };
  unrandom = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/<rand ([^>]+),([^>]+)>/g, function(key, val, cmd){
      return cmd;
    });
  };
  random = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/<rand ([^>]+),([^>]+)>/g, function(key, val, cmd){
      cmd = cmd.replace(/]]]]/, "]]");
      return "<span data-tooltip=\"" + cmd + " = " + val + "\" class=\"mark tooltip-top\">" + val + "</span>";
    });
  };
  random_preview = function(log){
    return log.replace(/\[\[([^\[]+)\]\]/g, function(key, val){
      return "<span data-tooltip=\"" + val + " = ？\" class=\"mark tooltip-top\">" + val + "</span>";
    });
  };
  link_regexp = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/;
  link_regexp_g = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/g;
  id_num = 0;
  uri_to_link = _.memoize(function(uri){
    var ref$, protocol, host, path;
    id_num++;
    ref$ = uri.match(link_regexp), uri = ref$[0], protocol = ref$[1], host = ref$[2], path = ref$[3];
    return "<span data-tooltip=\"\n  " + host + "\n  " + path + "\n\n\" external=\"link_" + id_num + "," + uri + "," + protocol + "," + host + "," + path + "\" class=\"emboss tooltip-top\">LINK - " + protocol + "</span>";
  });
  link = function(log){
    var text, uris, i$, len$, uri;
    if (!log) {
      return log;
    }
    text = log.replace(/\s|<br>/g, ' ').replace(/(<([^>]+)>)/ig, "");
    uris = text.match(link_regexp_g);
    if (uris) {
      for (i$ = 0, len$ = uris.length; i$ < len$; ++i$) {
        uri = uris[i$];
        log = log.replace(uri, uri_to_link(uri));
      }
    }
    return log;
  };
  space = function(log){
    if (!log) {
      return log;
    }
    return log.replace(/(^|\n|<br>)(\ *)/gm, function(full, s1, s2, offset){
      var nbsps;
      s1 || (s1 = "");
      nbsps = s2.replace(/\ /g, '&nbsp;');
      return s1 + "" + nbsps;
    });
  };
  br = function(log){
    return log.replace(/\n/gm, function(br){
      return "<br>";
    });
  };
  unbr = function(log){
    return log.replace(/<br>/gm, function(br){
      return "\n";
    });
  };
  nowrap = function(log){
    return log.replace(/<br>|\n/gm, function(br){
      return " ";
    });
  };
  unhtml = function(log){
    return log.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2f;");
  };
  Number.MAX_INT32 = 0x7fffffff;
  Number.MAX_BITS = 0xffffffff;
  defines = function(obj, hash){
    var configurable, enumerable, key, ref$, get, set;
    configurable = false;
    enumerable = false;
    for (key in hash) {
      ref$ = hash[key], get = ref$.get, set = ref$.set;
      Object.defineProperty(obj.prototype, key, {
        configurable: configurable,
        enumerable: enumerable,
        get: get,
        set: set
      });
    }
  };
  defines(Array, {
    last: {
      get: function(){
        return this[this.length - 1];
      }
    },
    first: {
      get: function(){
        return this[0];
      }
    }
  });
  defines(String, {
    deco_preview: {
      get: function(){
        return br(space(player(anchor_preview(link(random_preview(unhtml(this)))))));
      }
    },
    deco_text: {
      get: function(){
        return space(player(anchor(link(random(this)))));
      }
    },
    line_text: {
      get: function(){
        return nowrap(player(anchor(link(random(this)))));
      }
    },
    undecolate: {
      get: function(){
        return unanchor(unrandom(unbr(this)));
      }
    },
    sjis_length: {
      get: function(){
        var other;
        other = this.match(/[^\x01-\xff]/g) || [];
        return this.length + other.length;
      }
    }
  });
}).call(this);

(function() {
  var ids_list, ids_sort, name_config, obj_config,
    slice = [].slice;

  ids_list = function(list, cb) {
    var j, key, len, results;
    results = [];
    for (j = 0, len = list.length; j < len; j++) {
      key = list[j];
      results.push(obj_config(cb, key, 1));
    }
    return results;
  };

  ids_sort = function(list, cb) {
    var hash, j, k, key, len, len1, order, results;
    hash = {};
    for (j = 0, len = list.length; j < len; j++) {
      key = list[j];
      hash[key] || (hash[key] = 0);
      hash[key] += 1;
    }
    order = Object.keys(hash).sort(function(a, b) {
      return hash[b] - hash[a];
    });
    results = [];
    for (k = 0, len1 = order.length; k < len1; k++) {
      key = order[k];
      results.push(obj_config(cb, key, hash[key]));
    }
    return results;
  };

  obj_config = function(cb, key, count) {
    var obj;
    obj = Mem.roles.find(key) || Mem.traps.find(key);
    if (obj) {
      return cb(count, obj);
    } else {
      return cb(count, {
        _id: key,
        win: ""
      });
    }
  };

  name_config = function(key) {
    var obj;
    obj = Mem.roles.find(key) || Mem.traps.find(key);
    return (obj != null ? obj.name : void 0) || key || "";
  };

  this.GUI = {
    img_head: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images",
    portrate: function(face_id, attr) {
      if (attr == null) {
        attr = {};
      }
      attr.src = GUI.img_head + ("/portrate/" + face_id + ".jpg");
      return m("img", attr);
    },
    header_style_p: "",
    header: function(keys) {
      var html, style;
      style = keys.join(" ");
      html = document.documentElement;
      html.className = html.className.replace(GUI.header_style_p, style);
      return GUI.header_style_p = style;
    },
    dom: function(parent, query, cb) {
      var attr, data, elem, j, len, ref, ref1, results, tag, vdom;
      vdom = m(query);
      tag = vdom.tag;
      attr = Object.keys(vdom.attrs)[0];
      ref = parent.querySelectorAll(query);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        elem = ref[j];
        data = attr && unpack.Array((ref1 = elem.attributes[attr]) != null ? ref1.value : void 0);
        results.push(cb.apply(elem, data));
      }
      return results;
    },
    attrs_to: function(parent, query, base_attrs, cb) {
      var attr, attr_cb, data, elem, func, j, key, len, ref, ref1, results, tag, vdom;
      vdom = m(query);
      tag = vdom.tag;
      attr = Object.keys(vdom.attrs)[0];
      attr_cb = function(elem, data, cb) {
        return function() {
          return cb.apply(this, data);
        };
      };
      ref = parent.querySelectorAll(query);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        elem = ref[j];
        data = attr && unpack.Array((ref1 = elem.attributes[attr]) != null ? ref1.value : void 0);
        results.push((function() {
          var ref2, results1;
          ref2 = GUI.attrs(base_attrs, attr_cb(elem, data, cb));
          results1 = [];
          for (key in ref2) {
            func = ref2[key];
            results1.push(elem[key] = func);
          }
          return results1;
        })());
      }
      return results;
    },
    attrs: function(o, dsl) {
      var act, actioned_cb, func;
      actioned_cb = null;
      act = function(cb) {
        return function(e) {
          cb(e, e.srcElement, e.toElement);
          if (actioned_cb) {
            window.requestAnimationFrame(actioned_cb);
          }
          return e.preventDefault();
        };
      };
      func = {
        className: function(str) {
          return o.className = str;
        },
        swipe: function(thru) {
          var cancel, draw, end, gesture, move, start;
          if (thru) {
            act = function(cb) {
              return cb;
            };
          }
          start = act(function(e) {
            var e1, ref;
            console.log(e.changedTouches);
            e1 = (ref = e.changedTouches) != null ? ref[0] : void 0;
            return gesture.start(e1 || e);
          });
          move = act(function(e) {
            var e1, ref;
            console.log(e.changedTouches);
            e1 = (ref = e.changedTouches) != null ? ref[0] : void 0;
            return gesture.move(e1 || e);
          });
          end = act(function(e) {
            return gesture.end(e);
          });
          cancel = act(function(e) {
            return gesture.cancel(e);
          });
          o.ontouchstart = start;
          o.ontouchmove = move;
          o.ontouchend = end;
          o.ontouchcancel = cancel;
          draw = function(cb) {
            return function(diff, is_fast) {
              m.startComputation();
              cb(diff, is_fast);
              return m.endComputation();
            };
          };
          gesture = new Gesture();
          func.up = function(cb) {
            return gesture.onup = draw(cb);
          };
          func.down = function(cb) {
            return gesture.ondown = draw(cb);
          };
          func.left = function(cb) {
            return gesture.onleft = draw(cb);
          };
          func.right = function(cb) {
            return gesture.onright = draw(cb);
          };
          return func.move = function(cb) {
            return gesture.onmove = draw(cb);
          };
        },
        click: function(cb) {
          cb = act(cb);
          return o.onclick = cb;
        },
        start: function(cb) {
          cb = act(cb);
          o.onmousedown = cb;
          return o.ontouchstart = cb;
        },
        end: function(cb) {
          cb = act(cb);
          o.onmouseup = cb;
          return o.ontouchend = cb;
        },
        cancel: function(cb) {
          cb = act(cb);
          o.onmouseout = cb;
          o.onmouseover = cb;
          return o.ontouchcancel = cb;
        },
        move: function(cb) {
          cb = act(cb);
          o.onmousemove = cb;
          return o.ontouchmove = cb;
        },
        over: function(cb) {
          cb = act(cb);
          o.onmouseover = cb;
          return o.ontouchmove = cb;
        },
        out: function(cb) {
          cb = act(cb);
          o.onmouseup = cb;
          o.onmouseout = cb;
          return o.ontouchend = cb;
        },
        canvas: function(width, height, arg) {
          var background, cache, draw, size;
          cache = arg.cache, background = arg.background, draw = arg.draw;
          size = width + "x" + height;
          o.width = width * 2;
          o.height = height * 2;
          o.style = "width: " + width + "px; height: " + height + "px;";
          return o.config = function(canvas, is_continue, context) {
            var caches, ctx, image;
            ctx = canvas.getContext("2d");
            caches = typeof cache === "function" ? cache() : void 0;
            if (caches) {
              if (caches.canvas == null) {
                caches.canvas = {};
              }
              if (image = caches.canvas[size]) {
                ctx.putImageData(image, 0, 0);
                if (typeof draw === "function") {
                  draw(ctx);
                }
                return;
              }
            }
            if (typeof background === "function") {
              background(ctx);
            }
            if (caches) {
              caches.canvas[size] = ctx.getImageData(0, 0, o.width, o.height);
              return typeof draw === "function" ? draw(ctx) : void 0;
            }
          };
        },
        config: function(cb) {
          return o.config = cb;
        },
        actioned: function(cb) {
          return actioned_cb = cb;
        }
      };
      dsl.call(func);
      return o;
    },
    timer: function(query, o) {
      var attr, child;
      child = "";
      attr = {
        config: function(elem, is_continue, context) {
          var at;
          at = Timer.fetch(o.updated_at);
          context.onunload = function() {
            return delete context.update;
          };
          context.update = function(text) {
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
    },
    inline_item: function(cb) {
      var inline_item_span, list_cmds;
      inline_item_span = function(align, em, vdom) {
        return m("li", {
          style: "width:" + em + "em; text-align:" + align + ";"
        }, vdom);
      };
      list_cmds = {
        center: function() {
          var em, vdom;
          em = arguments[0], vdom = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          return inline_item_span("center", em, vdom);
        },
        right: function() {
          var em, vdom;
          em = arguments[0], vdom = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          return inline_item_span("right", em, vdom);
        },
        left: function() {
          var em, vdom;
          em = arguments[0], vdom = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          return inline_item_span("left", em, vdom);
        }
      };
      return m("ul.inline.mark", cb.call(list_cmds));
    },
    if_exist: function(query, cb) {
      return win.on.load.push(function() {
        var dom;
        dom = document.querySelector(query);
        if (!!dom && cb) {
          return cb(dom);
        }
      });
    },
    comma: function(num) {
      return (String(Math.round(num))).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    },
    field: function(num, length) {
      return ("0000000000" + num).slice(-length);
    },
    name: {
      config: name_config
    },
    names: {
      order: ids_list,
      config: ids_sort
    },
    accordion: function(mark, list) {
      var cancel, cb, i, items, j, len, o;
      cancel = GUI.attrs({}, function() {
        return this.end(function(e) {
          return list.tap = null;
        });
      });
      items = [];
      items.push(m("dt", cancel, m("span.mark", m.trust("&#x2718"))));
      cb = function(arg, idx) {
        var head, tap, text;
        head = arg.head, text = arg.text;
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
      return m("dl.accordion", win.scroll.mark(mark), items);
    }
  };

}).call(this);

(function() {
  GUI.Animate = (function() {
    var apply, jelly_down, jelly_up, spin, zIndex;

    function Animate() {}

    spin = new Bounce;

    spin.rotate({
      from: 0,
      to: 360
    });

    spin.define("spin");

    jelly_up = new Bounce;

    jelly_up.scale({
      from: {
        x: 1,
        y: 1
      },
      to: {
        x: 1,
        y: 2
      },
      easing: "bounce",
      bounces: 4,
      stiffness: 1
    });

    jelly_up.scale({
      from: {
        x: 1,
        y: 1
      },
      to: {
        x: 2,
        y: 1
      },
      easing: "bounce",
      bounces: 6,
      stiffness: 1
    });

    jelly_up.translate({
      from: {
        x: 0,
        y: 0
      },
      to: {
        x: 0,
        y: -30
      },
      easing: "bounce",
      bounces: 8,
      stiffness: 1
    });

    jelly_up.define("jelly-up");

    jelly_down = new Bounce;

    jelly_down.scale({
      from: {
        x: 1,
        y: 2
      },
      to: {
        x: 1,
        y: 1
      },
      easing: "bounce",
      bounces: 4,
      stiffness: 1
    });

    jelly_down.scale({
      from: {
        x: 2,
        y: 1
      },
      to: {
        x: 1,
        y: 1
      },
      easing: "bounce",
      bounces: 6,
      stiffness: 1
    });

    jelly_down.translate({
      from: {
        x: 0,
        y: -30
      },
      to: {
        x: 0,
        y: 0
      },
      easing: "bounce",
      bounces: 8,
      stiffness: 1
    });

    jelly_down.define("jelly-down");

    apply = function(duration, sequence, arg) {
      var begin, finish;
      begin = arg.begin, finish = arg.finish;
      return function(dom) {
        var style;
        if (dom.bounce_style !== sequence) {
          dom.bounce_style = sequence;
          style = sequence + " " + duration + "ms linear both";
          if (typeof begin === "function") {
            begin(dom);
          }
          dom.style.animation = style;
          dom.style.webkitAnimation = style;
          return setTimeout(function() {
            return typeof finish === "function" ? finish(dom) : void 0;
          }, duration);
        }
      };
    };

    zIndex = function(z) {
      return function(dom) {
        return dom.style.zIndex = z;
      };
    };

    Animate.spin = apply(DELAY.lento, "spin", {});

    Animate.jelly = {
      up: apply(DELAY.andante, "jelly-up", {
        begin: zIndex(3)
      }),
      down: apply(DELAY.andante, "jelly-down", {
        begin: zIndex(2),
        finish: zIndex(1)
      })
    };

    return Animate;

  })();

}).call(this);

(function() {
  GUI.form = (function() {
    var submit;
    submit = function(props, f) {
      return GUI.attrs({}, function() {
        return this.end(function(e) {
          return GUI.form.delegate.submit(props, f);
        });
      });
    };
    return {
      delegate: {
        submit: function() {
          return console.log(arguments);
        }
      },
      action: function(f, props) {
        return m("form[name=action_form]", m("." + f.mestype + ".action", {
          key: f._id
        }, doc.message.ext.action_text(null, f.name, f.style, f.log().deco_preview), m("h6", f.count + " " + f.title), m(".mark", f.errors), m(".formpl_content", m("select.mini", Txt.input(props.target), f.targets), m("select.mini", Txt.input(props.action), f.actions)), m("input[type=text]", Txt.input(f.log))), m("p", m("a.btn", submit(props, f), "アクション")), m("p", m("span" + f.error, f.valid_text)));
      },
      entry: function(f, props) {
        return m("form[name=entry_form]", m("table." + f.mestype + ".talk", {
          key: f._id
        }, m("tr", m("th", GUI.portrate(f.chr_job.face_id)), m("td", m(".msg", m("p", m("label.medium[for=entry_pwd]", "参加パスワード"), m("input#entry_pwd[type=password][maxlength=8][size=8]", Txt.input(props.password))), m("p", m("label.medium[for=entry_csid]", "希望する配役"), m("select#entry_csid", Txt.input(props.csid_cid), f.csid_cids)), m("p", m("label.medium[for=entry_role]", "希望する役職"), m("select#entry_role", Txt.input(props.role), f.roles)), m("div", f.is_preview() ? (doc.message.ext.talk_name(null, f.chr_job.job + " " + f.chr_job.face.name), doc.message.ext.talk_text(null, props.style(), f.log().deco_preview), m("h6", "参加する時のセリフ")) : (m("textarea[cols=30][rows=" + f.lines + "]", Txt.input(f.log)), m("h6", "参加する時のセリフ"), m(".mark", f.errors))), m("p", f.is_preview() ? (m("a.btn", Btn.bool(f.is_preview), "戻る"), m("a.btn", submit(props, f), f.title), f.count, m("select.small", Txt.input(props.style), f.styles)) : (m("a.btn", Btn.bool(f.is_preview), f.title), f.count, m("select.small", Txt.input(props.style), f.styles))), m("p", f.caption, m("span." + f.error, f.valid_text), !f.is_preview() ? m("span", f.diary) : void 0))))));
      },
      memo: function(f, props) {
        return m("form[name=memo_form]", m("table." + f.mestype + ".memo", {
          key: f._id
        }, m("tr", m("th", GUI.portrate(f.chr_job.face_id), m("div", m("b", f.chr_job.job + " " + f.chr_job.face.name))), m("td", f.is_preview() ? (doc.message.ext.talk_text(props.style(), f.log().deco_preview), m("h6", "参加する時のセリフ")) : (m("textarea[cols=30][rows=" + f.lines + "]", Txt.input(f.log)), m("h6", "参加する時のセリフ"), m(".mark", f.errors)), m("p", f.is_preview() ? (m("a.btn", Btn.bool(f.is_preview), "戻る"), m("a.btn", submit(props, f), f.title), f.count, m("select.small", Txt.input(props.style), f.styles)) : (m("a.btn", Btn.bool(f.is_preview), f.title), f.count, m("select.small", Txt.input(props.style), f.styles))), m("p", f.caption, m("span." + f.error, f.valid_text), !f.is_preview() ? m("span", f.diary) : void 0)))));
      },
      open: function(f, props) {},
      secret: function(f, props) {},
      silent: function(f, props) {},
      version: function(f, props) {},
      votes: function(f, props) {},
      story: function(f, props) {}
    };
  })();

}).call(this);

