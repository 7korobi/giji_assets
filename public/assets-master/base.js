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
 * Bounce.js 0.8.0
 * MIT license
 */
!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.Bounce=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c,d,e;e=a("../math/matrix4d"),d={bounce:a("../easing/bounce"),sway:a("../easing/sway"),hardbounce:a("../easing/hardbounce"),hardsway:a("../easing/hardsway")},c=function(){function a(a){a||(a={}),null!=a.easing&&(this.easing=a.easing),null!=a.duration&&(this.duration=a.duration),null!=a.delay&&(this.delay=a.delay),null!=a.from&&(this.from=a.from),null!=a.to&&(this.to=a.to),this.easingObject=new d[this.easing](a)}return a.prototype.easing="bounce",a.prototype.duration=1e3,a.prototype.delay=0,a.prototype.from=null,a.prototype.to=null,a.prototype.calculateEase=function(a){return this.easingObject.calculate(a)},a.prototype.getMatrix=function(){return(new e).identity()},a.prototype.getEasedMatrix=function(){return this.getMatrix()},a.prototype.serialize=function(){var a,b,c,d;b={type:this.constructor.name.toLowerCase(),easing:this.easing,duration:this.duration,delay:this.delay,from:this.from,to:this.to},d=this.easingObject.serialize();for(a in d)c=d[a],b[a]=c;return b},a}(),b.exports=c},{"../easing/bounce":6,"../easing/hardbounce":7,"../easing/hardsway":8,"../easing/sway":10,"../math/matrix4d":12}],2:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.diff=this.to-this.from}return h(b,a),b.prototype.from=0,b.prototype.to=90,b.prototype.getMatrix=function(a){var b,c,e;return c=a/180*Math.PI,b=Math.cos(c),e=Math.sin(c),new d([b,-e,0,0,e,b,0,0,0,0,1,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return c=this.calculateEase(a),b=this.from+this.diff*c,this.getMatrix(b)},b}(c),b.exports=e},{"../math/matrix4d":12,"../math/vector2d":13,"./index":1}],3:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:.5,y:.5},b.prototype.to={x:1,y:1},b.prototype.getMatrix=function(a,b){var c;return c=1,new d([a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":12,"../math/vector2d":13,"./index":1}],4:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:0,y:0},b.prototype.to={x:20,y:0},b.prototype.getMatrix=function(a,b){var c,e,f,g;return c=a/180*Math.PI,e=b/180*Math.PI,f=Math.tan(c),g=Math.tan(e),new d([1,f,0,0,g,1,0,0,0,0,1,0,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":12,"../math/vector2d":13,"./index":1}],5:[function(a,b){var c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("../math/matrix4d"),f=a("../math/vector2d"),c=a("./index"),e=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.fromVector=new f(this.from.x,this.from.y),this.toVector=new f(this.to.x,this.to.y),this.diff=this.toVector.clone().subtract(this.fromVector)}return h(b,a),b.prototype.from={x:0,y:0},b.prototype.to={x:0,y:0},b.prototype.getMatrix=function(a,b){var c;return c=0,new d([1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1])},b.prototype.getEasedMatrix=function(a){var b,c;return b=this.calculateEase(a),c=this.fromVector.clone().add(this.diff.clone().multiply(b)),this.getMatrix(c.x,c.y)},b}(c),b.exports=e},{"../math/matrix4d":12,"../math/vector2d":13,"./index":1}],6:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("./index"),c=function(a){function b(a){var c;null==a&&(a={}),b.__super__.constructor.apply(this,arguments),null!=a.stiffness&&(this.stiffness=a.stiffness),null!=a.bounces&&(this.bounces=a.bounces),this.alpha=this.stiffness/100,c=.005/Math.pow(10,this.stiffness),this.limit=Math.floor(Math.log(c)/-this.alpha),this.omega=this.bounces*Math.PI/this.limit}return f(b,a),b.prototype.bounces=4,b.prototype.stiffness=3,b.prototype.calculate=function(a){var b;return a>=1?1:(b=a*this.limit,1-this.exponent(b)*this.oscillation(b))},b.prototype.exponent=function(a){return Math.pow(Math.E,-this.alpha*a)},b.prototype.oscillation=function(a){return Math.cos(this.omega*a)},b.prototype.serialize=function(){return{stiffness:this.stiffness,bounces:this.bounces}},b}(d),b.exports=c},{"./index":9}],7:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("./bounce"),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.oscillation=function(a){return Math.abs(Math.cos(this.omega*a))},b}(c),b.exports=d},{"./bounce":6}],8:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};d=a("./sway"),c=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.oscillation=function(a){return Math.abs(Math.sin(this.omega*a))},b}(d),b.exports=c},{"./sway":10}],9:[function(a,b){var c;c=function(){function a(){}return a.prototype.calculate=function(a){return a},a.prototype.serialize=function(){return{}},a}(),b.exports=c},{}],10:[function(a,b){var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("./bounce"),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.calculate=function(a){var b;return a>=1?0:(b=a*this.limit,this.exponent(b)*this.oscillation(b))},b.prototype.oscillation=function(a){return Math.sin(this.omega*a)},b}(c),b.exports=d},{"./bounce":6}],11:[function(a,b){var c,d,e;e=a("./math/matrix4d"),d={scale:a("./components/scale"),rotate:a("./components/rotate"),translate:a("./components/translate"),skew:a("./components/skew")},c=function(){function a(){this.components=[]}return a.FPS=30,a.counter=1,a.prototype.components=null,a.prototype.duration=0,a.prototype.scale=function(a){return this.addComponent(new d.scale(a))},a.prototype.rotate=function(a){return this.addComponent(new d.rotate(a))},a.prototype.translate=function(a){return this.addComponent(new d.translate(a))},a.prototype.skew=function(a){return this.addComponent(new d.skew(a))},a.prototype.addComponent=function(a){return this.components.push(a),this.updateDuration(),this},a.prototype.serialize=function(){var a,b,c,d,e;for(b=[],e=this.components,c=0,d=e.length;d>c;c++)a=e[c],b.push(a.serialize());return b},a.prototype.deserialize=function(a){var b,c,e;for(c=0,e=a.length;e>c;c++)b=a[c],this.addComponent(new d[b.type](b));return this},a.prototype.updateDuration=function(){return this.duration=this.components.map(function(a){return a.duration+a.delay}).reduce(function(a,b){return Math.max(a,b)})},a.prototype.define=function(b){return this.name=b||a.generateName(),this.styleElement=document.createElement("style"),this.styleElement.innerHTML=this.getKeyframeCSS({name:this.name,prefix:!0}),document.body.appendChild(this.styleElement),this},a.prototype.applyTo=function(a,b){var c,d,e,f,g,h,i,j,k,l;for(null==b&&(b={}),this.define(),a.length||(a=[a]),g=this.getPrefixes(),d=null,window.jQuery&&window.jQuery.Deferred&&(d=new window.jQuery.Deferred),h=0,j=a.length;j>h;h++)for(e=a[h],l=g.animation,i=0,k=l.length;k>i;i++)f=l[i],c=[this.name,""+this.duration+"ms","linear","both"],b.loop&&c.push("infinite"),e.style[""+f+"animation"]=c.join(" ");return b.loop||setTimeout(function(a){return function(){return b.remove&&a.remove(),"function"==typeof b.onComplete&&b.onComplete(),d?d.resolve():void 0}}(this),this.duration),d},a.prototype.remove=function(){var a;return null!=(a=this.styleElement)?a.remove():void 0},a.prototype.getPrefixes=function(a){var b,c;return b={transform:[""],animation:[""]},c=document.createElement("dummy").style,(a||!("transform"in c)&&"webkitTransform"in c)&&(b.transform=["-webkit-",""]),(a||!("animation"in c)&&"webkitAnimation"in c)&&(b.animation=["-webkit-",""]),b},a.prototype.getKeyframeCSS=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;for(null==b&&(b={}),this.name=b.name||a.generateName(),i={transform:[""],animation:[""]},(b.prefix||b.forcePrefix)&&(i=this.getPrefixes(b.forcePrefix)),e=[],f=this.getKeyframes(),r=this.keys,l=0,o=r.length;o>l;l++){for(d=r[l],g=f[d],j="matrix3d"+g,k=[],s=i.transform,m=0,p=s.length;p>m;m++)h=s[m],k.push(""+h+"transform: "+j+";");e.push(""+Math.round(100*d*1e6)/1e6+"% { "+k.join(" ")+" }")}for(c=[],t=i.animation,n=0,q=t.length;q>n;n++)h=t[n],c.push("@"+h+"keyframes "+this.name+" { \n  "+e.join("\n  ")+" \n}");return c.join("\n\n")},a.prototype.getKeyframes=function(){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q;for(d=Math.round(this.duration/1e3*a.FPS),this.keys=[],f=k=0;d>=0?d>=k:k>=d;f=d>=0?++k:--k)this.keys.push(f/d);for(h={},p=this.keys,l=0,n=p.length;n>l;l++){for(g=p[l],i=(new e).identity(),q=this.components,m=0,o=q.length;o>m;m++)b=q[m],c=g*this.duration,b.delay-c>1e-8||(j=(g-b.delay/this.duration)/(b.duration/this.duration),i.multiply(b.getEasedMatrix(j)));h[g]=i.transpose().toFixed(5)}return h},a.generateName=function(){return"animation-"+a.counter++},a.isSupported=function(){var a,b,c,d,e,f,g,h,i;for(e=document.createElement("dummy").style,d=[["transform","webkitTransform"],["animation","webkitAnimation"]],f=0,h=d.length;h>f;f++){for(c=d[f],b=!1,g=0,i=c.length;i>g;g++)a=c[g],b||(b=a in e);if(!b)return!1}return!0},a}(),b.exports=c},{"./components/rotate":2,"./components/scale":3,"./components/skew":4,"./components/translate":5,"./math/matrix4d":12}],12:[function(a,b){var c;c=function(){function a(a){this._array=(null!=a?a.slice(0):void 0)||[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}return a.prototype._array=null,a.prototype.equals=function(a){return this.toString()===a.toString()},a.prototype.identity=function(){return this.setArray([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},a.prototype.multiply=function(b){var c,d,e,f,g,h,i,j;for(f=new a,c=h=0;4>h;c=++h)for(d=i=0;4>i;d=++i)for(e=j=0;4>j;e=++j)g=f.get(c,d)+this.get(c,e)*b.get(e,d),f.set(c,d,g);return this.copy(f)},a.prototype.transpose=function(){var a;return a=this.getArray(),this.setArray([a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15]]),this},a.prototype.get=function(a,b){return this.getArray()[4*a+b]},a.prototype.set=function(a,b,c){return this._array[4*a+b]=c},a.prototype.copy=function(a){return this._array=a.getArray(),this},a.prototype.clone=function(){return new a(this.getArray())},a.prototype.getArray=function(){return this._array.slice(0)},a.prototype.setArray=function(a){return this._array=a,this},a.prototype.toString=function(){return"("+this.getArray().join(", ")+")"},a.prototype.toFixed=function(a){var b;return this._array=function(){var c,d,e,f;for(e=this._array,f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push(parseFloat(b.toFixed(a)));return f}.call(this),this},a}(),b.exports=c},{}],13:[function(a,b){var c;c=function(){function a(a,b){this.x=null!=a?a:0,this.y=null!=b?b:0}return a.prototype.x=0,a.prototype.y=0,a.prototype.add=function(b){return a.isVector2D(b)?(this.x+=b.x,this.y+=b.y,this):this._addScalar(b)},a.prototype._addScalar=function(a){return this.x+=a,this.y+=a,this},a.prototype.subtract=function(b){return a.isVector2D(b)?(this.x-=b.x,this.y-=b.y,this):this._subtractScalar(b)},a.prototype._subtractScalar=function(a){return this._addScalar(-a)},a.prototype.multiply=function(b){return a.isVector2D(b)?(this.x*=b.x,this.y*=b.y,this):this._multiplyScalar(b)},a.prototype._multiplyScalar=function(a){return this.x*=a,this.y*=a,this},a.prototype.divide=function(b){return a.isVector2D(b)?(this.x/=b.x,this.y/=b.y,this):this._divideScalar(b)},a.prototype._divideScalar=function(a){return this._multiplyScalar(1/a)},a.prototype.clone=function(){return new a(this.x,this.y)},a.prototype.copy=function(a){return this.x=a.x,this.y=a.y,this},a.prototype.equals=function(a){return a.x===this.x&&a.y===this.y},a.prototype.toString=function(){return"("+this.x+", "+this.y+")"},a.prototype.toFixed=function(a){return this.x=parseFloat(this.x.toFixed(a)),this.y=parseFloat(this.y.toFixed(a)),this},a.prototype.toArray=function(){return[this.x,this.y]},a.isVector2D=function(b){return b instanceof a},a}(),b.exports=c},{}]},{},[11])(11)});
"use strict";
/*! Copyright (c) 2014, Jeff Hlywa (jhlywa@gmail.com)
 *  Released under the BSD license
 *  https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */
;var Chess=function(ao){var p="b";var k="w";var E=-1;var X="p";var S="n";var s="b";var H="r";var j="q";var ad="k";var f="pnbrqkPNBRQK";var an="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";var B=["1-0","0-1","1/2-1/2","*"];var u={b:[16,32,17,15],w:[-16,-32,-17,-15]};var J={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]};var ac=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20];var o=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17];var av={p:0,n:1,b:2,r:3,q:4,k:5};var aj={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"};var D={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64};var W=7;var T=6;var Q=5;var P=4;var O=3;var N=2;var M=1;var K=0;var v={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119};var V={w:[{square:v.a1,flag:D.QSIDE_CASTLE},{square:v.h1,flag:D.KSIDE_CASTLE}],b:[{square:v.a8,flag:D.QSIDE_CASTLE},{square:v.h8,flag:D.KSIDE_CASTLE}]};var C=new Array(128);var ak={w:E,b:E};var t=k;var d={w:0,b:0};var x=E;var n=0;var g=1;var Z=[];var ab={};if(typeof ao==="undefined"){h(an)}else{h(ao)}function ae(){C=new Array(128);ak={w:E,b:E};t=k;d={w:0,b:0};x=E;n=0;g=1;Z=[];ab={};q(z())}function Y(){h(an)}function h(ay){var aD=ay.split(/\s+/);var aw=aD[0];var aC=0;var aB=f+"12345678/";if(!aa(ay).valid){return false}ae();for(var az=0;az<aw.length;az++){var aA=aw.charAt(az);if(aA==="/"){aC+=8}else{if(r(aA)){aC+=parseInt(aA,10)}else{var ax=(aA<"a")?k:p;aq({type:aA.toLowerCase(),color:ax},m(aC));aC++}}}t=aD[1];if(aD[2].indexOf("K")>-1){d.w|=D.KSIDE_CASTLE}if(aD[2].indexOf("Q")>-1){d.w|=D.QSIDE_CASTLE}if(aD[2].indexOf("k")>-1){d.b|=D.KSIDE_CASTLE}if(aD[2].indexOf("q")>-1){d.b|=D.QSIDE_CASTLE}x=(aD[3]==="-")?E:v[aD[3]];n=parseInt(aD[4],10);g=parseInt(aD[5],10);q(z());return true}function aa(ay){var aD={0:"No errors.",1:"FEN string must contain six space-delimited fields.",2:"6th field (move number) must be a positive integer.",3:"5th field (half move counter) must be a non-negative integer.",4:"4th field (en-passant square) is invalid.",5:"3rd field (castling availability) is invalid.",6:"2nd field (side to move) is invalid.",7:"1st field (piece positions) does not contain 8 '/'-delimited rows.",8:"1st field (piece positions) is invalid [consecutive numbers].",9:"1st field (piece positions) is invalid [invalid piece].",10:"1st field (piece positions) is invalid [row too large]."};var aC=ay.split(/\s+/);if(aC.length!==6){return{valid:false,error_number:1,error:aD[1]}}if(isNaN(aC[5])||(parseInt(aC[5],10)<=0)){return{valid:false,error_number:2,error:aD[2]}}if(isNaN(aC[4])||(parseInt(aC[4],10)<0)){return{valid:false,error_number:3,error:aD[3]}}if(!/^(-|[abcdefgh][36])$/.test(aC[3])){return{valid:false,error_number:4,error:aD[4]}}if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(aC[2])){return{valid:false,error_number:5,error:aD[5]}}if(!/^(w|b)$/.test(aC[1])){return{valid:false,error_number:6,error:aD[6]}}var aB=aC[0].split("/");if(aB.length!==8){return{valid:false,error_number:7,error:aD[7]}}for(var az=0;az<aB.length;az++){var aw=0;var aA=false;for(var ax=0;ax<aB[az].length;ax++){if(!isNaN(aB[az][ax])){if(aA){return{valid:false,error_number:8,error:aD[8]}}aw+=parseInt(aB[az][ax],10);aA=true}else{if(!/^[prnbqkPRNBQK]$/.test(aB[az][ax])){return{valid:false,error_number:9,error:aD[9]}}aw+=1;aA=false}}if(aw!==8){return{valid:false,error_number:10,error:aD[10]}}}return{valid:true,error_number:0,error:aD[0]}}function z(){var aC=0;var ay="";for(var aA=v.a8;aA<=v.h1;aA++){if(C[aA]==null){aC++}else{if(aC>0){ay+=aC;aC=0}var ax=C[aA].color;var aB=C[aA].type;ay+=(ax===k)?aB.toUpperCase():aB.toLowerCase()}if((aA+1)&136){if(aC>0){ay+=aC}if(aA!==v.h1){ay+="/"}aC=0;aA+=8}}var az="";if(d[k]&D.KSIDE_CASTLE){az+="K"}if(d[k]&D.QSIDE_CASTLE){az+="Q"}if(d[p]&D.KSIDE_CASTLE){az+="k"}if(d[p]&D.QSIDE_CASTLE){az+="q"}az=az||"-";var aw=(x===E)?"-":m(x);return[ay,t,az,aw,n,g].join(" ")}function at(aw){for(var ax=0;ax<aw.length;ax+=2){if(typeof aw[ax]==="string"&&typeof aw[ax+1]==="string"){ab[aw[ax]]=aw[ax+1]}}return ab}function q(aw){if(Z.length>0){return}if(aw!==an){ab.SetUp="1";ab.FEN=aw}else{delete ab.SetUp;delete ab.FEN}}function ag(ax){var aw=C[v[ax]];return(aw)?{type:aw.type,color:aw.color}:null}function aq(aw,ay){if(!("type" in aw&&"color" in aw)){return false}if(f.indexOf(aw.type.toLowerCase())===-1){return false}if(!(ay in v)){return false}var ax=v[ay];if(aw.type==ad&&!(ak[aw.color]==E||ak[aw.color]==ax)){return false}C[ax]={type:aw.type,color:aw.color};if(aw.type===ad){ak[aw.color]=ax}q(z());return true}function F(ax){var aw=ag(ax);C[v[ax]]=null;if(aw&&aw.type===ad){ak[aw.color]=E}q(z());return aw}function am(ay,aB,aA,ax,az){var aw={color:t,from:aB,to:aA,flags:ax,piece:ay[aB].type};if(az){aw.flags|=D.PROMOTION;aw.promotion=az}if(ay[aA]){aw.captured=ay[aA].type}else{if(ax&D.EP_CAPTURE){aw.captured=X}}return aw}function b(ay){function aN(aT,aR,aW,aV,aQ){if(aT[aW].type===X&&(U(aV)===K||U(aV)===W)){var aU=[j,H,s,S];for(var aS=0,aP=aU.length;aS<aP;aS++){aR.push(am(aT,aW,aV,aQ,aU[aS]))}}else{aR.push(am(aT,aW,aV,aQ))}}var aO=[];var aA=t;var aK=au(aA);var aL={b:M,w:T};var aF=v.a8;var aC=v.h1;var aD=false;var aB=(typeof ay!=="undefined"&&"legal" in ay)?ay.legal:true;if(typeof ay!=="undefined"&&"square" in ay){if(ay.square in v){aF=aC=v[ay.square];aD=true}else{return[]}}for(var aH=aF;aH<=aC;aH++){if(aH&136){aH+=7;continue}var ax=C[aH];if(ax==null||ax.color!==aA){continue}if(ax.type===X){var aE=aH+u[aA][0];if(C[aE]==null){aN(C,aO,aH,aE,D.NORMAL);var aE=aH+u[aA][1];if(aL[aA]===U(aH)&&C[aE]==null){aN(C,aO,aH,aE,D.BIG_PAWN)}}for(aG=2;aG<4;aG++){var aE=aH+u[aA][aG];if(aE&136){continue}if(C[aE]!=null&&C[aE].color===aK){aN(C,aO,aH,aE,D.CAPTURE)}else{if(aE===x){aN(C,aO,aH,x,D.EP_CAPTURE)}}}}else{for(var aG=0,aI=J[ax.type].length;aG<aI;aG++){var az=J[ax.type][aG];var aE=aH;while(true){aE+=az;if(aE&136){break}if(C[aE]==null){aN(C,aO,aH,aE,D.NORMAL)}else{if(C[aE].color===aA){break}aN(C,aO,aH,aE,D.CAPTURE);break}if(ax.type==="n"||ax.type==="k"){break}}}}}if((!aD)||aC===ak[aA]){if(d[aA]&D.KSIDE_CASTLE){var aM=ak[aA];var aJ=aM+2;if(C[aM+1]==null&&C[aJ]==null&&!af(aK,ak[aA])&&!af(aK,aM+1)&&!af(aK,aJ)){aN(C,aO,ak[aA],aJ,D.KSIDE_CASTLE)}}if(d[aA]&D.QSIDE_CASTLE){var aM=ak[aA];var aJ=aM-2;if(C[aM-1]==null&&C[aM-2]==null&&C[aM-3]==null&&!af(aK,ak[aA])&&!af(aK,aM-1)&&!af(aK,aJ)){aN(C,aO,ak[aA],aJ,D.QSIDE_CASTLE)}}}if(!aB){return aO}var aw=[];for(var aH=0,aI=aO.length;aH<aI;aH++){al(aO[aH]);if(!L(aA)){aw.push(aO[aH])}G()}return aw}function ar(ax){var ay="";if(ax.flags&D.KSIDE_CASTLE){ay="O-O"}else{if(ax.flags&D.QSIDE_CASTLE){ay="O-O-O"}else{var aw=c(ax);if(ax.piece!==X){ay+=ax.piece.toUpperCase()+aw}if(ax.flags&(D.CAPTURE|D.EP_CAPTURE)){if(ax.piece===X){ay+=m(ax.from)[0]}ay+="x"}ay+=m(ax.to);if(ax.flags&D.PROMOTION){ay+="="+ax.promotion.toUpperCase()}}}al(ax);if(R()){if(I()){ay+="#"}else{ay+="+"}}G();return ay}function af(ax,aD){for(var aA=v.a8;aA<=v.h1;aA++){if(aA&136){aA+=7;continue}if(C[aA]==null||C[aA].color!==ax){continue}var aE=C[aA];var aw=aA-aD;var aC=aw+119;if(ac[aC]&(1<<av[aE.type])){if(aE.type===X){if(aw>0){if(aE.color===k){return true}}else{if(aE.color===p){return true}}continue}if(aE.type==="n"||aE.type==="k"){return true}var ay=o[aC];var az=aA+ay;var aB=false;while(az!==aD){if(C[az]!=null){aB=true;break}az+=ay}if(!aB){return true}}}return false}function L(aw){return af(au(aw),ak[aw])}function R(){return L(t)}function I(){return R()&&b().length===0}function ah(){return !R()&&b().length===0}function A(){var aC={};var aB=[];var ax=0;var aD=0;for(var ay=v.a8;ay<=v.h1;ay++){aD=(aD+1)%2;if(ay&136){ay+=7;continue}var aA=C[ay];if(aA){aC[aA.type]=(aA.type in aC)?aC[aA.type]+1:1;if(aA.type===s){aB.push(aD)}ax++}}if(ax===2){return true}else{if(ax===3&&(aC[s]===1||aC[S]===1)){return true}else{if(ax===aC[s]+2){var az=0;var aw=aB.length;for(var ay=0;ay<aw;ay++){az+=aB[ay]}if(az===0||az===aw){return true}}}}return false}function i(){var ay=[];var ax={};var aA=false;while(true){var aw=G();if(!aw){break}ay.push(aw)}while(true){var az=z().split(" ").slice(0,4).join(" ");ax[az]=(az in ax)?ax[az]+1:1;if(ax[az]>=3){aA=true}if(!ay.length){break}al(ay.pop())}return aA}function e(aw){Z.push({move:aw,kings:{b:ak.b,w:ak.w},turn:t,castling:{b:d.b,w:d.w},ep_square:x,half_moves:n,move_number:g})}function al(ax){var aB=t;var aC=au(aB);e(ax);C[ax.to]=C[ax.from];C[ax.from]=null;if(ax.flags&D.EP_CAPTURE){if(t===p){C[ax.to-16]=null}else{C[ax.to+16]=null}}if(ax.flags&D.PROMOTION){C[ax.to]={type:ax.promotion,color:aB}}if(C[ax.to].type===ad){ak[C[ax.to].color]=ax.to;if(ax.flags&D.KSIDE_CASTLE){var az=ax.to-1;var aA=ax.to+1;C[az]=C[aA];C[aA]=null}else{if(ax.flags&D.QSIDE_CASTLE){var az=ax.to+1;var aA=ax.to-2;C[az]=C[aA];C[aA]=null}}d[aB]=""}if(d[aB]){for(var ay=0,aw=V[aB].length;ay<aw;ay++){if(ax.from===V[aB][ay].square&&d[aB]&V[aB][ay].flag){d[aB]^=V[aB][ay].flag;break}}}if(d[aC]){for(var ay=0,aw=V[aC].length;ay<aw;ay++){if(ax.to===V[aC][ay].square&&d[aC]&V[aC][ay].flag){d[aC]^=V[aC][ay].flag;break}}}if(ax.flags&D.BIG_PAWN){if(t==="b"){x=ax.to-16}else{x=ax.to+16}}else{x=E}if(ax.piece===X){n=0}else{if(ax.flags&(D.CAPTURE|D.EP_CAPTURE)){n=0}else{n++}}if(t===p){g++}t=au(t)}function G(){var ax=Z.pop();if(ax==null){return null}var aw=ax.move;ak=ax.kings;t=ax.turn;d=ax.castling;x=ax.ep_square;n=ax.half_moves;g=ax.move_number;var aB=t;var aC=au(t);C[aw.from]=C[aw.to];C[aw.from].type=aw.piece;C[aw.to]=null;if(aw.flags&D.CAPTURE){C[aw.to]={type:aw.captured,color:aC}}else{if(aw.flags&D.EP_CAPTURE){var ay;if(aB===p){ay=aw.to-16}else{ay=aw.to+16}C[ay]={type:X,color:aC}}}if(aw.flags&(D.KSIDE_CASTLE|D.QSIDE_CASTLE)){var az,aA;if(aw.flags&D.KSIDE_CASTLE){az=aw.to+1;aA=aw.to-1}else{if(aw.flags&D.QSIDE_CASTLE){az=aw.to-2;aA=aw.to+1}}C[az]=C[aA];C[aA]=null}return aw}function c(ax){var aw=b();var aE=ax.from;var aF=ax.to;var aI=ax.piece;var aH=0;var aD=0;var aB=0;for(var az=0,aC=aw.length;az<aC;az++){var aA=aw[az].from;var ay=aw[az].to;var aG=aw[az].piece;if(aI===aG&&aE!==aA&&aF===ay){aH++;if(U(aE)===U(aA)){aD++}if(y(aE)===y(aA)){aB++}}}if(aH>0){if(aD>0&&aB>0){return m(aE)}else{if(aB>0){return m(aE).charAt(1)}else{return m(aE).charAt(0)}}}return""}function a(){var az="   +------------------------+\n";for(var ax=v.a8;ax<=v.h1;ax++){if(y(ax)===0){az+=" 87654321"[U(ax)]+" |"}if(C[ax]==null){az+=" . "}else{var ay=C[ax].type;var aw=C[ax].color;var aA=(aw===k)?ay.toUpperCase():ay.toLowerCase();az+=" "+aA+" "}if((ax+1)&136){az+="|\n";ax+=8}}az+="   +------------------------+\n";az+="     a  b  c  d  e  f  g  h\n";return az}function U(aw){return aw>>4}function y(aw){return aw&15}function m(aw){var ay=y(aw),ax=U(aw);return"abcdefgh".substring(ay,ay+1)+"87654321".substring(ax,ax+1)}function au(aw){return aw===k?p:k}function r(aw){return"0123456789".indexOf(aw)!==-1}function l(az){var ay=w(az);ay.san=ar(ay);ay.to=m(ay.to);ay.from=m(ay.from);var ax="";for(var aw in D){if(D[aw]&ay.flags){ax+=aj[aw]}}ay.flags=ax;return ay}function w(ay){var aw=(ay instanceof Array)?[]:{};for(var ax in ay){if(typeof ax==="object"){aw[ax]=w(ay[ax])}else{aw[ax]=ay[ax]}}return aw}function ap(aw){return aw.replace(/^\s+|\s+$/g,"")}function ai(aC){var ax=b({legal:false});var az=0;var ay=t;for(var aA=0,aw=ax.length;aA<aw;aA++){al(ax[aA]);if(!L(ay)){if(aC-1>0){var aB=ai(aC-1);az+=aB}else{az++}}G()}return az}return{WHITE:k,BLACK:p,PAWN:X,KNIGHT:S,BISHOP:s,ROOK:H,QUEEN:j,KING:ad,SQUARES:(function(){var ax=[];for(var aw=v.a8;aw<=v.h1;aw++){if(aw&136){aw+=7;continue}ax.push(m(aw))}return ax})(),FLAGS:aj,load:function(aw){return h(aw)},reset:function(){return Y()},moves:function(az){var ay=b(az);var ax=[];for(var aA=0,aw=ay.length;aA<aw;aA++){if(typeof az!=="undefined"&&"verbose" in az&&az.verbose){ax.push(l(ay[aA]))}else{ax.push(ar(ay[aA]))}}return ax},in_check:function(){return R()},in_checkmate:function(){return I()},in_stalemate:function(){return ah()},in_draw:function(){return n>=100||ah()||A()||i()},insufficient_material:function(){return A()},in_threefold_repetition:function(){return i()},game_over:function(){return n>=100||I()||ah()||A()||i()},validate_fen:function(aw){return aa(aw)},fen:function(){return z()},pgn:function(aG){var az=(typeof aG==="object"&&typeof aG.newline_char==="string")?aG.newline_char:"\n";var aF=(typeof aG==="object"&&typeof aG.max_width==="number")?aG.max_width:0;var aH=[];var aD=false;for(var aB in ab){aH.push("["+aB+' "'+ab[aB]+'"]'+az);aD=true}if(aD&&Z.length){aH.push(az)}var aE=[];while(Z.length>0){aE.push(G())}var ax=[];var ay="";var aw=1;while(aE.length>0){var aA=aE.pop();if(aw===1&&aA.color==="b"){ay="1. ...";aw++}else{if(aA.color==="w"){if(ay.length){ax.push(ay)}ay=aw+".";aw++}}ay=ay+" "+ar(aA);al(aA)}if(ay.length){ax.push(ay)}if(typeof ab.Result!=="undefined"){ax.push(ab.Result)}if(aF===0){return aH.join("")+ax.join(" ")}var aC=0;for(var aB=0;aB<ax.length;aB++){if(aC+ax[aB].length>aF&&aB!==0){if(aH[aH.length-1]===" "){aH.pop()}aH.push(az);aC=0}else{if(aB!==0){aH.push(" ");aC++}}aH.push(ax[aB]);aC+=ax[aB].length}return aH.join("")},load_pgn:function(aG,aK){function aL(aM){return aM.replace(/\\/g,"\\")}function az(aO){var aN=b();for(var aP=0,aM=aN.length;aP<aM;aP++){if(aO.replace(/[+#?!=]+$/,"")==ar(aN[aP]).replace(/[+#?!=]+$/,"")){return aN[aP]}}return null}function aE(aM){return az(ap(aM))}function aw(aM){var aO=false;for(var aN in aM){aO=true}return aO}function aI(aT,aM){var aR=(typeof aM==="object"&&typeof aM.newline_char==="string")?aM.newline_char:"\r?\n";var aQ={};var aS=aT.split(new RegExp(aL(aR)));var aO="";var aP="";for(var aN=0;aN<aS.length;aN++){aO=aS[aN].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/,"$1");aP=aS[aN].replace(/^\[[A-Za-z]+\s"(.*)"\]$/,"$1");if(ap(aO).length>0){aQ[aO]=aP}}return aQ}var aB=(typeof aK==="object"&&typeof aK.newline_char==="string")?aK.newline_char:"\r?\n";var aH=new RegExp("^(\\[(.|"+aL(aB)+")*\\])("+aL(aB)+")*1.("+aL(aB)+"|.)*$","g");var aD=aG.replace(aH,"$1");if(aD[0]!=="["){aD=""}Y();var aA=aI(aD,aK);for(var aJ in aA){at([aJ,aA[aJ]])}var ay=aG.replace(aD,"").replace(new RegExp(aL(aB),"g")," ");ay=ay.replace(/(\{[^}]+\})+?/g,"");ay=ay.replace(/\d+\./g,"");var ax=ap(ay).split(new RegExp(/\s+/));ax=ax.join(",").replace(/,,+/g,",").split(",");var aC="";for(var aF=0;aF<ax.length-1;aF++){aC=aE(ax[aF]);if(aC==null){return false}else{al(aC)}}aC=ax[ax.length-1];if(B.indexOf(aC)>-1){if(aw(ab)&&typeof ab.Result==="undefined"){at(["Result",aC])}}else{aC=aE(aC);if(aC==null){return false}else{al(aC)}}return true},header:function(){return at(arguments)},ascii:function(){return a()},turn:function(){return t},move:function(aA){var az=null;var ay=b();if(typeof aA==="string"){for(var aB=0,ax=ay.length;aB<ax;aB++){if(aA===ar(ay[aB])){az=ay[aB];break}}}else{if(typeof aA==="object"){for(var aB=0,ax=ay.length;aB<ax;aB++){if(aA.from===m(ay[aB].from)&&aA.to===m(ay[aB].to)&&(!("promotion" in ay[aB])||aA.promotion===ay[aB].promotion)){az=ay[aB];break}}}}if(!az){return null}var aw=l(az);al(az);return aw},undo:function(){var aw=G();return(aw)?l(aw):null},clear:function(){return ae()},put:function(aw,ax){return aq(aw,ax)},get:function(aw){return ag(aw)},remove:function(aw){return F(aw)},perft:function(aw){return ai(aw)},square_color:function(ax){if(ax in v){var aw=v[ax];return((U(aw)+y(aw))%2===0)?"light":"dark"}return null},history:function(ay){var aA=[];var az=[];var ax=(typeof ay!=="undefined"&&"verbose" in ay&&ay.verbose);while(Z.length>0){aA.push(G())}while(aA.length>0){var aw=aA.pop();if(ax){az.push(l(aw))}else{az.push(ar(aw))}al(aw)}return az}}};if(typeof exports!=="undefined"){exports.Chess=Chess}if(typeof define!=="undefined"){define(function(){return Chess})};
/*! head.core - v1.0.2 */
(function(n,t){"use strict";function r(n){a[a.length]=n}function k(n){var t=new RegExp(" ?\\b"+n+"\\b");c.className=c.className.replace(t,"")}function p(n,t){for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}function tt(){var t,e,f,o;c.className=c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");t=n.innerWidth||c.clientWidth;e=n.outerWidth||n.screen.width;u.screen.innerWidth=t;u.screen.outerWidth=e;r("w-"+t);p(i.screens,function(n){t>n?(i.screensCss.gt&&r("gt-"+n),i.screensCss.gte&&r("gte-"+n)):t<n?(i.screensCss.lt&&r("lt-"+n),i.screensCss.lte&&r("lte-"+n)):t===n&&(i.screensCss.lte&&r("lte-"+n),i.screensCss.eq&&r("e-q"+n),i.screensCss.gte&&r("gte-"+n))});f=n.innerHeight||c.clientHeight;o=n.outerHeight||n.screen.height;u.screen.innerHeight=f;u.screen.outerHeight=o;u.feature("portrait",f>t);u.feature("landscape",f<t)}function it(){n.clearTimeout(b);b=n.setTimeout(tt,50)}var y=n.document,rt=n.navigator,ut=n.location,c=y.documentElement,a=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"},v,u,s,w,o,h,l,d,f,g,nt,e,b;if(n.head_conf)for(v in n.head_conf)n.head_conf[v]!==t&&(i[v]=n.head_conf[v]);u=n[i.head]=function(){u.ready.apply(null,arguments)};u.feature=function(n,t,i){return n?(Object.prototype.toString.call(t)==="[object Function]"&&(t=t.call()),r((t?"":"no-")+n),u[n]=!!t,i||(k("no-"+n),k(n),u.feature()),u):(c.className+=" "+a.join(" "),a=[],u)};u.feature("js",!0);s=rt.userAgent.toLowerCase();w=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);u.feature("mobile",w,!0);u.feature("desktop",!w,!0);s=/(chrome|firefox)[ \/]([\w.]+)/.exec(s)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||/(trident).+rv:(\w.)+/.exec(s)||[];o=s[1];h=parseFloat(s[2]);switch(o){case"msie":case"trident":o="ie";h=y.documentMode||h;break;case"firefox":o="ff";break;case"ipod":case"ipad":case"iphone":o="ios";break;case"webkit":o="safari"}for(u.browser={name:o,version:h},u.browser[o]=!0,l=0,d=i.browsers.length;l<d;l++)for(f in i.browsers[l])if(o===f)for(r(f),g=i.browsers[l][f].min,nt=i.browsers[l][f].max,e=g;e<=nt;e++)h>e?(i.browserCss.gt&&r("gt-"+f+e),i.browserCss.gte&&r("gte-"+f+e)):h<e?(i.browserCss.lt&&r("lt-"+f+e),i.browserCss.lte&&r("lte-"+f+e)):h===e&&(i.browserCss.lte&&r("lte-"+f+e),i.browserCss.eq&&r("eq-"+f+e),i.browserCss.gte&&r("gte-"+f+e));else r("no-"+f);r(o);r(o+parseInt(h,10));i.html5&&o==="ie"&&h<9&&p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(n){y.createElement(n)});p(ut.pathname.split("/"),function(n,u){if(this.length>2&&this[u+1]!==t)u&&r(this.slice(u,u+1).join("-").toLowerCase()+i.section);else{var f=n||"index",e=f.indexOf(".");e>0&&(f=f.substring(0,e));c.id=f.toLowerCase()+i.page;u||r("root"+i.section)}});u.screen={height:n.screen.height,width:n.screen.width};tt();b=0;n.addEventListener?n.addEventListener("resize",it,!1):n.attachEvent("onresize",it)})(window);
/*! head.css3 - v1.0.0 */
(function(n,t){"use strict";function a(n){for(var r in n)if(i[n[r]]!==t)return!0;return!1}function r(n){var t=n.charAt(0).toUpperCase()+n.substr(1),i=(n+" "+c.join(t+" ")+t).split(" ");return!!a(i)}var h=n.document,o=h.createElement("i"),i=o.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),c="Webkit Moz O ms Khtml".split(" "),l=n.head_conf&&n.head_conf.head||"head",u=n[l],f={gradient:function(){var n="background-image:";return i.cssText=(n+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+n)+s.join("linear-gradient(left top,#eee,#fff);"+n)).slice(0,-n.length),!!i.backgroundImage},rgba:function(){return i.cssText="background-color:rgba(0,0,0,0.5)",!!i.backgroundColor},opacity:function(){return o.style.opacity===""},textshadow:function(){return i.textShadow===""},multiplebgs:function(){i.cssText="background:url(https://),url(https://),red url(https://)";var n=(i.background||"").match(/url/g);return Object.prototype.toString.call(n)==="[object Array]"&&n.length===3},boxshadow:function(){return r("boxShadow")},borderimage:function(){return r("borderImage")},borderradius:function(){return r("borderRadius")},cssreflections:function(){return r("boxReflect")},csstransforms:function(){return r("transform")},csstransitions:function(){return r("transition")},touch:function(){return"ontouchstart"in n},retina:function(){return n.devicePixelRatio>1},fontface:function(){var t=u.browser.name,n=u.browser.version;switch(t){case"ie":return n>=9;case"chrome":return n>=13;case"ff":return n>=6;case"ios":return n>=5;case"android":return!1;case"webkit":return n>=5.1;case"opera":return n>=10;default:return!1}}};for(var e in f)f[e]&&u.feature(e,f[e].call(),!0);u.feature()})(window);
/*! head.load - v1.0.3 */
(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);

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

/*
Mithril v0.2.0
http://github.com/lhorie/mithril.js
(c) Leo Horie
License: MIT
*/
var m=function a(b,c){function d(a){D=a.document,E=a.location,G=a.cancelAnimationFrame||a.clearTimeout,F=a.requestAnimationFrame||a.setTimeout}function e(){var a,b=[].slice.call(arguments),c=!(null==b[1]||L.call(b[1])!==H||"tag"in b[1]||"view"in b[1]||"subtree"in b[1]),d=c?b[1]:{},e="class"in d?"class":"className",f={tag:"div",attrs:{}},g=[];if(L.call(b[0])!=J)throw new Error("selector in m(selector, attrs, children) should be a string");for(;a=M.exec(b[0]);)if(""===a[1]&&a[2])f.tag=a[2];else if("#"===a[1])f.attrs.id=a[2];else if("."===a[1])g.push(a[2]);else if("["===a[3][0]){var h=N.exec(a[3]);f.attrs[h[1]]=h[3]||(h[2]?"":!0)}var i=b.slice(c?2:1);f.children=1===i.length&&L.call(i[0])===I?i[0]:i;for(var j in d)d.hasOwnProperty(j)&&(j===e&&null!=d[j]&&""!==d[j]?(g.push(d[j]),f.attrs[j]=""):f.attrs[j]=d[j]);return g.length>0&&(f.attrs[e]=g.join(" ")),f}function f(a,b,d,j,l,m,n,o,p,q,r){try{(null==l||null==l.toString())&&(l="")}catch(s){l=""}if("retain"===l.subtree)return m;var t=L.call(m),u=L.call(l);if(null==m||t!==u){if(null!=m)if(d&&d.nodes){var v=o-j,w=v+(u===I?l:m.nodes).length;i(d.nodes.slice(v,w),d.slice(v,w))}else m.nodes&&i(m.nodes,m);m=new l.constructor,m.tag&&(m={}),m.nodes=[]}if(u===I){for(var x=0,y=l.length;y>x;x++)L.call(l[x])===I&&(l=l.concat.apply([],l),x--,y=l.length);for(var z=[],A=m.length===l.length,B=0,C=1,E=2,F=3,G={},M=!1,x=0;x<m.length;x++)m[x]&&m[x].attrs&&null!=m[x].attrs.key&&(M=!0,G[m[x].attrs.key]={action:C,index:x});for(var N=0,x=0,y=l.length;y>x;x++)if(l[x]&&l[x].attrs&&null!=l[x].attrs.key){for(var Q=0,y=l.length;y>Q;Q++)l[Q]&&l[Q].attrs&&null==l[Q].attrs.key&&(l[Q].attrs.key="__mithril__"+N++);break}if(M){var R=!1;if(l.length!=m.length)R=!0;else for(var S,T,x=0;S=m[x],T=l[x];x++)if(S.attrs&&T.attrs&&S.attrs.key!=T.attrs.key){R=!0;break}if(R){for(var x=0,y=l.length;y>x;x++)if(l[x]&&l[x].attrs&&null!=l[x].attrs.key){var U=l[x].attrs.key;G[U]=G[U]?{action:F,index:x,from:G[U].index,element:m.nodes[G[U].index]||D.createElement("div")}:{action:E,index:x}}var V=[];for(var W in G)V.push(G[W]);var X=V.sort(g),Y=new Array(m.length);Y.nodes=m.nodes.slice();for(var Z,x=0;Z=X[x];x++){if(Z.action===C&&(i(m[Z.index].nodes,m[Z.index]),Y.splice(Z.index,1)),Z.action===E){var $=D.createElement("div");$.key=l[Z.index].attrs.key,a.insertBefore($,a.childNodes[Z.index]||null),Y.splice(Z.index,0,{attrs:{key:l[Z.index].attrs.key},nodes:[$]}),Y.nodes[Z.index]=$}Z.action===F&&(a.childNodes[Z.index]!==Z.element&&null!==Z.element&&a.insertBefore(Z.element,a.childNodes[Z.index]||null),Y[Z.index]=m[Z.from],Y.nodes[Z.index]=Z.element)}m=Y}}for(var x=0,_=0,y=l.length;y>x;x++){var bb=f(a,b,m,o,l[x],m[_],n,o+B||B,p,q,r);bb!==c&&(bb.nodes.intact||(A=!1),B+=bb.$trusted?(bb.match(/<[^\/]|\>\s*[^<]/g)||[0]).length:L.call(bb)===I?bb.length:1,m[_++]=bb)}if(!A){for(var x=0,y=l.length;y>x;x++)null!=m[x]&&z.push.apply(z,m[x].nodes);for(var cb,x=0;cb=m.nodes[x];x++)null!=cb.parentNode&&z.indexOf(cb)<0&&i([cb],[m[x]]);l.length<m.length&&(m.length=l.length),m.nodes=z}}else if(null!=l&&u===H){for(var eb=[],fb=[];l.view;){var gb=l.view.$original||l.view,hb="diff"==e.redraw.strategy()&&m.views?m.views.indexOf(gb):-1,ib=hb>-1?m.controllers[hb]:new(l.controller||P),U=l&&l.attrs&&l.attrs.key;if(l=0==db||m&&m.controllers&&m.controllers.indexOf(ib)>-1?l.view(ib):{tag:"placeholder"},"retain"===l.subtree)return m;U&&(l.attrs||(l.attrs={}),l.attrs.key=U),ib.onunload&&ab.push({controller:ib,handler:ib.onunload}),eb.push(gb),fb.push(ib)}if(!l.tag&&fb.length)throw new Error("Component template must return a virtual element, not an array, string, etc.");l.attrs||(l.attrs={}),m.attrs||(m.attrs={});var jb=Object.keys(l.attrs),kb=jb.length>("key"in l.attrs?1:0);if((l.tag!=m.tag||jb.sort().join()!=Object.keys(m.attrs).sort().join()||l.attrs.id!=m.attrs.id||l.attrs.key!=m.attrs.key||"all"==e.redraw.strategy()&&(!m.configContext||m.configContext.retain!==!0)||"diff"==e.redraw.strategy()&&m.configContext&&m.configContext.retain===!1)&&(m.nodes.length&&i(m.nodes),m.configContext&&typeof m.configContext.onunload===K&&m.configContext.onunload(),m.controllers))for(var ib,x=0;ib=m.controllers[x];x++)typeof ib.onunload===K&&ib.onunload({preventDefault:P});if(L.call(l.tag)!=J)return;var cb,lb=0===m.nodes.length;if(l.attrs.xmlns?q=l.attrs.xmlns:"svg"===l.tag?q="http://www.w3.org/2000/svg":"math"===l.tag&&(q="http://www.w3.org/1998/Math/MathML"),lb){if(cb=l.attrs.is?q===c?D.createElement(l.tag,l.attrs.is):D.createElementNS(q,l.tag,l.attrs.is):q===c?D.createElement(l.tag):D.createElementNS(q,l.tag),m={tag:l.tag,attrs:kb?h(cb,l.tag,l.attrs,{},q):l.attrs,children:null!=l.children&&l.children.length>0?f(cb,l.tag,c,c,l.children,m.children,!0,0,l.attrs.contenteditable?cb:p,q,r):l.children,nodes:[cb]},fb.length){m.views=eb,m.controllers=fb;for(var ib,x=0;ib=fb[x];x++)if(ib.onunload&&ib.onunload.$old&&(ib.onunload=ib.onunload.$old),db&&ib.onunload){var mb=ib.onunload;ib.onunload=P,ib.onunload.$old=mb}}m.children&&!m.children.nodes&&(m.children.nodes=[]),"select"===l.tag&&"value"in l.attrs&&h(cb,l.tag,{value:l.attrs.value},{},q),a.insertBefore(cb,a.childNodes[o]||null)}else cb=m.nodes[0],kb&&h(cb,l.tag,l.attrs,m.attrs,q),m.children=f(cb,l.tag,c,c,l.children,m.children,!1,0,l.attrs.contenteditable?cb:p,q,r),m.nodes.intact=!0,fb.length&&(m.views=eb,m.controllers=fb),n===!0&&null!=cb&&a.insertBefore(cb,a.childNodes[o]||null);if(typeof l.attrs.config===K){var nb=m.configContext=m.configContext||{},ob=function(a,b){return function(){return a.attrs.config.apply(a,b)}};r.push(ob(l,[cb,!lb,nb,m]))}}else if(typeof l!=K){var z;0===m.nodes.length?(l.$trusted?z=k(a,o,l):(z=[D.createTextNode(l)],a.nodeName.match(O)||a.insertBefore(z[0],a.childNodes[o]||null)),m="string number boolean".indexOf(typeof l)>-1?new l.constructor(l):l,m.nodes=z):m.valueOf()!==l.valueOf()||n===!0?(z=m.nodes,p&&p===D.activeElement||(l.$trusted?(i(z,m),z=k(a,o,l)):"textarea"===b?a.value=l:p?p.innerHTML=l:((1===z[0].nodeType||z.length>1)&&(i(m.nodes,m),z=[D.createTextNode(l)]),a.insertBefore(z[0],a.childNodes[o]||null),z[0].nodeValue=l)),m=new l.constructor(l),m.nodes=z):m.nodes.intact=!0}return m}function g(a,b){return a.action-b.action||a.index-b.index}function h(a,b,c,d,e){for(var f in c){var g=c[f],h=d[f];if(f in d&&h===g)"value"===f&&"input"===b&&a.value!=g&&(a.value=g);else{d[f]=g;try{if("config"===f||"key"==f)continue;if(typeof g===K&&0===f.indexOf("on"))a[f]=l(g,a);else if("style"===f&&null!=g&&L.call(g)===H){for(var i in g)(null==h||h[i]!==g[i])&&(a.style[i]=g[i]);for(var i in h)i in g||(a.style[i]="")}else null!=e?"href"===f?a.setAttributeNS("http://www.w3.org/1999/xlink","href",g):"className"===f?a.setAttribute("class",g):a.setAttribute(f,g):f in a&&"list"!==f&&"style"!==f&&"form"!==f&&"type"!==f&&"width"!==f&&"height"!==f?("input"!==b||a[f]!==g)&&(a[f]=g):a.setAttribute(f,g)}catch(j){if(j.message.indexOf("Invalid argument")<0)throw j}}}return d}function i(a,b){for(var c=a.length-1;c>-1;c--)if(a[c]&&a[c].parentNode){try{a[c].parentNode.removeChild(a[c])}catch(d){}b=[].concat(b),b[c]&&j(b[c])}0!=a.length&&(a.length=0)}function j(a){if(a.configContext&&typeof a.configContext.onunload===K&&(a.configContext.onunload(),a.configContext.onunload=null),a.controllers)for(var b,c=0;b=a.controllers[c];c++)typeof b.onunload===K&&b.onunload({preventDefault:P});if(a.children)if(L.call(a.children)===I)for(var d,c=0;d=a.children[c];c++)j(d);else a.children.tag&&j(a.children)}function k(a,b,c){var d=a.childNodes[b];if(d){var e=1!=d.nodeType,f=D.createElement("span");e?(a.insertBefore(f,d||null),f.insertAdjacentHTML("beforebegin",c),a.removeChild(f)):d.insertAdjacentHTML("beforebegin",c)}else a.insertAdjacentHTML("beforeend",c);for(var g=[];a.childNodes[b]!==d;)g.push(a.childNodes[b]),b++;return g}function l(a,b){return function(c){c=c||event,e.redraw.strategy("diff"),e.startComputation();try{return a.call(b,c)}finally{eb()}}}function m(a){var b=S.indexOf(a);return 0>b?S.push(a)-1:b}function n(a){var b=function(){return arguments.length&&(a=arguments[0]),a};return b.toJSON=function(){return a},b}function o(a,b){var c=function(){return(a.controller||P).apply(this,b)||this},d=function(c){return arguments.length>1&&(b=b.concat([].slice.call(arguments,1))),a.view.apply(a,b?[c].concat(b):[c])};d.$original=a.view;var e={controller:c,view:d};return b[0]&&null!=b[0].key&&(e.attrs={key:b[0].key}),e}function p(){$&&($(),$=null);for(var a,b=0;a=V[b];b++)if(X[b]){var c=W[b].controller&&W[b].controller.$$args?[X[b]].concat(W[b].controller.$$args):[X[b]];e.render(a,W[b].view?W[b].view(X[b],c):"")}_&&(_(),_=null),Y=null,Z=new Date,e.redraw.strategy("diff")}function q(a){return a.slice(hb[e.route.mode].length)}function r(a,b,c){fb={};var d=c.indexOf("?");-1!==d&&(fb=v(c.substr(d+1,c.length)),c=c.substr(0,d));var f=Object.keys(b),g=f.indexOf(c);if(-1!==g)return e.mount(a,b[f[g]]),!0;for(var h in b){if(h===c)return e.mount(a,b[h]),!0;var i=new RegExp("^"+h.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(i.test(c))return c.replace(i,function(){for(var c=h.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2),f=0,g=c.length;g>f;f++)fb[c[f].replace(/:|\./g,"")]=decodeURIComponent(d[f]);e.mount(a,b[h])}),!0}}function s(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!==a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;for(var b=a.currentTarget||a.srcElement,c="pathname"===e.route.mode&&b.search?v(b.search.slice(1)):{};b&&"A"!=b.nodeName.toUpperCase();)b=b.parentNode;e.route(b[e.route.mode].slice(hb[e.route.mode].length),c)}}function t(){"hash"!=e.route.mode&&E.hash?E.hash=E.hash:b.scrollTo(0,0)}function u(a,b){var d={},e=[];for(var f in a){var g=b?b+"["+f+"]":f,h=a[f],i=L.call(h),j=null===h?encodeURIComponent(g):i===H?u(h,g):i===I?h.reduce(function(a,b){return d[g]||(d[g]={}),d[g][b]?a:(d[g][b]=!0,a.concat(encodeURIComponent(g)+"="+encodeURIComponent(b)))},[]).join("&"):encodeURIComponent(g)+"="+encodeURIComponent(h);h!==c&&e.push(j)}return e.join("&")}function v(a){"?"===a.charAt(0)&&(a=a.substring(1));for(var b=a.split("&"),c={},d=0,e=b.length;e>d;d++){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=2==f.length?decodeURIComponent(f[1]):null;null!=c[g]?(L.call(c[g])!==I&&(c[g]=[c[g]]),c[g].push(h)):c[g]=h}return c}function w(a){var b=m(a);i(a.childNodes,T[b]),T[b]=c}function x(a,b){var c=e.prop(b);return a.then(c),c.then=function(c,d){return x(a.then(c,d),b)},c}function y(a,b){function c(a){l=a||j,n.map(function(a){l===i&&a.resolve(m)||a.reject(m)})}function d(a,b,c,d){if((null!=m&&L.call(m)===H||typeof m===K)&&typeof a===K)try{var f=0;a.call(m,function(a){f++||(m=a,b())},function(a){f++||(m=a,c())})}catch(g){e.deferred.onerror(g),m=g,c()}else d()}function f(){var j;try{j=m&&m.then}catch(n){return e.deferred.onerror(n),m=n,l=h,f()}d(j,function(){l=g,f()},function(){l=h,f()},function(){try{l===g&&typeof a===K?m=a(m):l===h&&"function"==typeof b&&(m=b(m),l=g)}catch(f){return e.deferred.onerror(f),m=f,c()}m===k?(m=TypeError(),c()):d(j,function(){c(i)},c,function(){c(l===g&&i)})})}var g=1,h=2,i=3,j=4,k=this,l=0,m=0,n=[];k.promise={},k.resolve=function(a){return l||(m=a,l=g,f()),this},k.reject=function(a){return l||(m=a,l=h,f()),this},k.promise.then=function(a,b){var c=new y(a,b);return l===i?c.resolve(m):l===j?c.reject(m):n.push(c),c.promise}}function z(a){return a}function A(a){if(!a.dataType||"jsonp"!==a.dataType.toLowerCase()){var d=new b.XMLHttpRequest;if(d.open(a.method,a.url,!0,a.user,a.password),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?a.onload({type:"load",target:d}):a.onerror({type:"error",target:d}))},a.serialize===JSON.stringify&&a.data&&"GET"!==a.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.deserialize===JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),typeof a.config===K){var e=a.config(d,a);null!=e&&(d=e)}var f="GET"!==a.method&&a.data?a.data:"";if(f&&L.call(f)!=J&&f.constructor!=b.FormData)throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";return d.send(f),d}var g="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),h=D.createElement("script");b[g]=function(d){h.parentNode.removeChild(h),a.onload({type:"load",target:{responseText:d}}),b[g]=c},h.onerror=function(){return h.parentNode.removeChild(h),a.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),b[g]=c,!1},h.onload=function(){return!1},h.src=a.url+(a.url.indexOf("?")>0?"&":"?")+(a.callbackKey?a.callbackKey:"callback")+"="+g+"&"+u(a.data||{}),D.body.appendChild(h)}function B(a,b,c){if("GET"===a.method&&"jsonp"!=a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=u(b);a.url=a.url+(e?d+e:"")}else a.data=c(b);return a}function C(a,b){var c=a.match(/:[a-z]\w+/gi);if(c&&b)for(var d=0;d<c.length;d++){var e=c[d].slice(1);a=a.replace(c[d],b[e]),delete b[e]}return a}var D,E,F,G,H="[object Object]",I="[object Array]",J="[object String]",K="function",L={}.toString,M=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,N=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,O=/^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/,P=function(){};d(b);var Q,R={appendChild:function(a){Q===c&&(Q=D.createElement("html")),D.documentElement&&D.documentElement!==a?D.replaceChild(a,D.documentElement):D.appendChild(a),this.childNodes=D.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},S=[],T={};e.render=function(a,b,d){var e=[];if(!a)throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var g=m(a),h=a===D,j=h||a===D.documentElement?R:a;h&&"html"!=b.tag&&(b={tag:"html",attrs:{},children:b}),T[g]===c&&i(j.childNodes),d===!0&&w(a),T[g]=f(j,null,c,c,b,T[g],!1,0,null,c,e);for(var k=0,l=e.length;l>k;k++)e[k]()},e.trust=function(a){return a=new String(a),a.$trusted=!0,a},e.prop=function(a){return(null!=a&&L.call(a)===H||typeof a===K)&&typeof a.then===K?x(a):n(a)};var U,V=[],W=[],X=[],Y=null,Z=0,$=null,_=null,ab=[],bb=16;e.component=function(a){return o(a,[].slice.call(arguments,1))},e.mount=e.module=function(a,b){if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var c=V.indexOf(a);0>c&&(c=V.length);for(var d,f=!1,g={preventDefault:function(){f=!0,$=_=null}},h=0;d=ab[h];h++)d.handler.call(d.controller,g),d.controller.onunload=null;if(f)for(var d,h=0;d=ab[h];h++)d.controller.onunload=d.handler;else ab=[];if(X[c]&&typeof X[c].onunload===K&&X[c].onunload(g),!f){e.redraw.strategy("all"),e.startComputation(),V[c]=a,arguments.length>2&&(b=subcomponent(b,[].slice.call(arguments,2)));var i=U=b=b||{controller:function(){}},j=b.controller||P,k=new j;return i===U&&(X[c]=k,W[c]=b),eb(),X[c]}};var cb=!1;e.redraw=function(a){cb||(cb=!0,Y&&a!==!0?(F===b.requestAnimationFrame||new Date-Z>bb)&&(Y>0&&G(Y),Y=F(p,bb)):(p(),Y=F(function(){Y=null},bb)),cb=!1)},e.redraw.strategy=e.prop();var db=0;e.startComputation=function(){db++},e.endComputation=function(){db=Math.max(db-1,0),0===db&&e.redraw()};var eb=function(){"none"==e.redraw.strategy()?(db--,e.redraw.strategy("diff")):e.endComputation()};e.withAttr=function(a,b){return function(c){c=c||event;var d=c.currentTarget||this;b(a in d?d[a]:d.getAttribute(a))}};var fb,gb,hb={pathname:"",hash:"#",search:"?"},ib=P,jb=!1;return e.route=function(){if(0===arguments.length)return gb;if(3===arguments.length&&L.call(arguments[1])===J){var a=arguments[0],c=arguments[1],d=arguments[2];ib=function(b){var f=gb=q(b);if(!r(a,d,f)){if(jb)throw new Error("Ensure the default route matches one of the routes defined in m.route");jb=!0,e.route(c,!0),jb=!1}};var f="hash"===e.route.mode?"onhashchange":"onpopstate";b[f]=function(){var a=E[e.route.mode];"pathname"===e.route.mode&&(a+=E.search),gb!=q(a)&&ib(a)},$=t,b[f]()}else if(arguments[0].addEventListener||arguments[0].attachEvent){var g=arguments[0],h=(arguments[1],arguments[2],arguments[3]);g.href=("pathname"!==e.route.mode?E.pathname:"")+hb[e.route.mode]+h.attrs.href,g.addEventListener?(g.removeEventListener("click",s),g.addEventListener("click",s)):(g.detachEvent("onclick",s),g.attachEvent("onclick",s))}else if(L.call(arguments[0])===J){var i=gb;gb=arguments[0];var j=arguments[1]||{},k=gb.indexOf("?"),l=k>-1?v(gb.slice(k+1)):{};for(var m in j)l[m]=j[m];var n=u(l),o=k>-1?gb.slice(0,k):gb;n&&(gb=o+(-1===o.indexOf("?")?"?":"&")+n);var p=(3===arguments.length?arguments[2]:arguments[1])===!0||i===arguments[0];b.history.pushState?($=t,_=function(){b.history[p?"replaceState":"pushState"](null,D.title,hb[e.route.mode]+gb)},ib(hb[e.route.mode]+gb)):(E[e.route.mode]=gb,ib(hb[e.route.mode]+gb))}},e.route.param=function(a){if(!fb)throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");return fb[a]},e.route.mode="search",e.route.buildQueryString=u,e.route.parseQueryString=v,e.deferred=function(){var a=new y;return a.promise=x(a.promise),a},e.deferred.onerror=function(a){if("[object Error]"===L.call(a)&&!a.constructor.toString().match(/ Error/))throw a},e.sync=function(a){function b(a,b){return function(e){return g[a]=e,b||(c="reject"),0===--f&&(d.promise(g),d[c](g)),e}}var c="resolve",d=e.deferred(),f=a.length,g=new Array(f);if(a.length>0)for(var h=0;h<a.length;h++)a[h].then(b(h,!0),b(h,!1));else d.resolve([]);return d.promise},e.request=function(a){a.background!==!0&&e.startComputation();var b=new y,c=a.dataType&&"jsonp"===a.dataType.toLowerCase(),d=a.serialize=c?z:a.serialize||JSON.stringify,f=a.deserialize=c?z:a.deserialize||JSON.parse,g=c?function(a){return a.responseText}:a.extract||function(a){return 0===a.responseText.length&&f===JSON.parse?null:a.responseText};return a.method=(a.method||"GET").toUpperCase(),a.url=C(a.url,a.data),a=B(a,a.data,d),a.onload=a.onerror=function(c){try{c=c||event;var d=("load"===c.type?a.unwrapSuccess:a.unwrapError)||z,h=d(f(g(c.target,a)),c.target);if("load"===c.type)if(L.call(h)===I&&a.type)for(var i=0;i<h.length;i++)h[i]=new a.type(h[i]);else a.type&&(h=new a.type(h));b["load"===c.type?"resolve":"reject"](h)}catch(c){e.deferred.onerror(c),b.reject(c)}a.background!==!0&&e.endComputation()},A(a),b.promise=x(b.promise,a.initialValue),b.promise},e.deps=function(a){return d(b=a||b),b},e.deps.factory=a,e}("undefined"!=typeof window?window:{});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=m:"function"==typeof define&&define.amd&&define(function(){return m});

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
Canvas v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var calc, Canvas, out$ = typeof exports != 'undefined' && exports || this;
  calc = {
    touch: head.browser.ios || head.browser.ff || head.browser.old && head.browser.chrome
      ? function(arg$, arg1$){
        var pageX, pageY, left, top, x, y;
        pageX = arg$.pageX, pageY = arg$.pageY;
        left = arg1$.left, top = arg1$.top;
        x = 2 * (pageX - left - window.scrollX);
        y = 2 * (pageY - top - window.scrollY);
        return {
          x: x,
          y: y
        };
      }
      : function(arg$, arg1$){
        var pageX, pageY, left, top, x, y;
        pageX = arg$.pageX, pageY = arg$.pageY;
        left = arg1$.left, top = arg1$.top;
        x = 2 * (pageX - left);
        y = 2 * (pageY - top - window.scrollY);
        return {
          x: x,
          y: y
        };
      },
    mouse: function(event){
      var x, y;
      x = event.offsetX || event.layerX;
      y = event.offsetY || event.layerY;
      if (x != null && y != null) {
        x *= 2;
        y *= 2;
        return {
          x: x,
          y: y
        };
      }
    },
    offsets: function(e, elem, o){
      var rect, res$, i$, ref$, len$, touch;
      o.offset = null;
      o.offsets = [];
      if (!(e != null && elem != null)) {
        return;
      }
      if (e.touches != null) {
        rect = elem.getBoundingClientRect();
        res$ = [];
        for (i$ = 0, len$ = (ref$ = e.touches).length; i$ < len$; ++i$) {
          touch = ref$[i$];
          res$.push(calc.touch(touch, rect));
        }
        o.offsets = res$;
        if (1 === e.touches.length) {
          return o.offset = o.offsets[0];
        }
      } else {
        o.offset = calc.mouse(e);
        if (o.offset != null) {
          return o.offsets = [o.offset];
        }
      }
    },
    offset: function(e, elem){
      var rect;
      if (!(e != null && elem != null)) {
        return null;
      }
      if (e.touches != null) {
        rect = elem.getBoundingClientRect();
        return calc.touch(e.touches[0], rect);
      } else {
        return calc.mouse(e);
      }
    }
  };
  out$.Canvas = Canvas = {
    controller: function(attr, present, options){
      var ref$, width, height, size, canvas, ctrl, i$, len$, func, args, common, start, cancel, end, move, do_background, draw, config;
      ref$ = options.size, width = ref$[0], height = ref$[1];
      size = width + "x" + height;
      canvas = null;
      ctrl = new present(options);
      for (i$ = 0, len$ = (ref$ = ['config', 'data', 'background', 'draw', 'onmove']).length; i$ < len$; ++i$) {
        func = ref$[i$];
        ctrl[func] == null && (ctrl[func] = fn$);
      }
      args = {
        state: "boot",
        is_touch: false,
        offsets: [],
        event: {}
      };
      common = function(event){
        event.preventDefault();
        args.event = event;
        ctrl.onmove(args);
        return draw();
      };
      start = function(event){
        args.state = "onstart";
        args.is_touch = true;
        return common(event);
      };
      cancel = function(event){
        args.state = "oncancel";
        args.is_touch = false;
        return common(event);
      };
      end = function(event){
        args.state = "onend";
        args.is_touch = false;
        return common(event);
      };
      move = function(event){
        args.state = "onmove";
        calc.offsets(event, canvas, args);
        args.event = event;
        return common(event);
      };
      do_background = function(){
        var ctx, data, image;
        ctx = args.ctx;
        data = ctrl.data();
        if (data) {
          data.canvas == null && (data.canvas = {});
          if (image = data.canvas[size]) {
            ctx.putImageData(image, 0, 0);
            return;
          }
        }
        ctrl.background(args);
        if (data) {
          return data.canvas[size] = ctx.getImageData(0, 0, width * 2, height * 2);
        }
      };
      draw = function(){
        do_background();
        return ctrl.draw(args);
      };
      config = function(elem, is_continue, context){
        if (!args.ctx) {
          canvas = elem;
          args.ctx = canvas.getContext("2d");
        }
        ctrl.config(canvas, is_continue, context);
        ctrl.onmove(args);
        return draw();
      };
      this.canvas_attr = {
        width: width,
        height: height,
        style: "width: " + width / 2 + "px; height: " + height / 2 + "px;",
        ontouchend: end,
        ontouchmove: move,
        ontouchstart: start,
        ontouchcancel: cancel,
        onmouseup: end,
        onmousemove: move,
        onmousedown: start,
        onmouseout: end,
        onmouseover: move,
        config: config
      };
      function fn$(){}
    },
    view: function(c, attr){
      return m("canvas" + attr, c.canvas_attr);
    }
  };
}).call(this);

/*
form v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var btns, btn, is_true, eq, include, keys_eq, Txt, Btns, Btn, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  btns = function(btn, style, prop, options, order){
    var i$, len$, key, caption, attr, results$ = [];
    order == null && (order = Object.keys(options));
    for (i$ = 0, len$ = order.length; i$ < len$; ++i$) {
      key = order[i$];
      caption = options[key];
      attr = btn(style, prop, key);
      results$.push(m("span", attr, caption));
    }
    return results$;
  };
  btn = function(style, check, store, load, key){
    var cb, class_name;
    style['class'] == null && (style['class'] = 'edge');
    cb = function(){
      return store(key);
    };
    if (check(load, key)) {
      class_name = "btn " + style['class'] + " active";
    } else {
      class_name = "btn " + style['class'];
    }
    return {
      className: class_name,
      onmouseup: cb,
      ontouchend: cb
    };
  };
  is_true = function(load){
    return load();
  };
  eq = function(load, key){
    return key === load();
  };
  include = function(load, key){
    return load()[key];
  };
  keys_eq = function(load, keys){
    var to_s;
    to_s = pack.Keys;
    return to_s(load()) === to_s(keys);
  };
  out$.Txt = Txt = {
    input: function(prop){
      return {
        onblur: m.withAttr("value", prop),
        onchange: m.withAttr("value", prop),
        value: prop()
      };
    }
  };
  out$.Btns = Btns = {
    check: function(){
      return btns.apply(null, [Btn.keys].concat(slice$.call(arguments)));
    },
    radio: function(){
      return btns.apply(null, [Btn.set].concat(slice$.call(arguments)));
    },
    menu: function(){
      return btns.apply(null, [Btn.menu].concat(slice$.call(arguments)));
    }
  };
  out$.Btn = Btn = {
    base: btn,
    bool: function(style, prop){
      return btn(style, is_true, prop, prop, !prop());
    },
    call: function(style, call){
      var prop;
      prop = function(){
        return null;
      };
      return btn(style, eq, call, prop, "call");
    },
    set: function(style, prop, val){
      return btn(style, eq, prop, prop, val);
    },
    keys_reset: function(style, prop, val){
      var setter;
      setter = function(key){
        if (!keys_eq(prop, val)) {
          return prop(unpack.Keys(val));
        }
      };
      return btn(style, keys_eq, setter, prop, val);
    },
    keys: function(style, prop, val){
      var setter;
      setter = function(key){
        var keys;
        keys = prop();
        keys[key] = !keys[key];
        return prop(keys);
      };
      return btn(style, include, setter, prop, val);
    },
    menu: function(style, prop, val){
      var setter, this$ = this;
      setter = function(key){
        var target;
        target = eq(prop, key) ? "" : key;
        return prop(target);
      };
      return btn(style, eq, setter, prop, val);
    }
  };
}).call(this);

/*
layout v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var Layout, out$ = typeof exports != 'undefined' && exports || this;
  out$.Layout = Layout = (function(){
    Layout.displayName = 'Layout';
    var move, prototype = Layout.prototype, constructor = Layout;
    Layout.list = {};
    Layout.move = function(){
      var key, ref$, o, results$ = [];
      for (key in ref$ = Layout.list) {
        o = ref$[key];
        results$.push(o.translate());
      }
      return results$;
    };
    move = function(cb){
      var w, h, x, y;
      w = this.width || this.box.offsetWidth;
      h = this.height || this.box.offsetHeight;
      if (this.dx) {
        x = this.dx;
      } else {
        this.width = this.box.parentElement.offsetWidth;
        x = this.box.parentElement.offsetLeft;
      }
      if (this.dy) {
        y = this.dy;
      }
      return cb(x, y, w, h, {
        top: win.top,
        left: win.left,
        width: win.width,
        height: win.height
      });
    };
    function Layout(box, dx, dy, dz, absolute, duration){
      this.box = box;
      this.dx = dx;
      this.dy = dy;
      this.absolute = absolute != null ? absolute : false;
      this.duration = duration != null
        ? duration
        : DELAY.animato;
      if (!this.box) {
        return;
      }
      if (this.absolute) {
        this.duration /= 4;
      }
      Layout.list[this.box.id] = this;
      this.box.style.zIndex = dz;
      this.mode = "show";
      this.from = this.hide();
      this.transform(this.from);
      this.transition();
    }
    prototype.show = function(){
      return move.call(this, function(x, y, w, h, win){
        if (x < 0) {
          x += win.width - w;
        }
        if (y < 0) {
          y += win.height - h;
        }
        return {
          x: x,
          y: y,
          w: w,
          h: h,
          win: win
        };
      });
    };
    prototype.hide = function(){
      return move.call(this, function(x, y, w, h, win){
        x = -x + (function(){
          switch (false) {
          case !(0 < x):
            return -w;
          case !(x < 0):
            return win.width;
          }
        }());
        y = -y + (function(){
          switch (false) {
          case !(0 < y):
            return -h;
          case !(y < 0):
            return win.height;
          }
        }());
        return {
          x: x,
          y: y,
          w: w,
          h: h,
          win: win
        };
      });
    };
    prototype.transform = function(arg$){
      var x, y, transform;
      x = arg$.x, y = arg$.y;
      if (this.width) {
        this.box.style.width = this.width + "px";
      }
      if (this.height) {
        this.box.style.height = this.height + "px";
      }
      if (this.absolute) {
        this.box.style.position = "absolute";
        this.box.style.left = (x + win.left) + "px";
        this.box.style.top = (y + win.top) + "px";
        this.box.style.webkitTransform = "";
        this.box.style.mozTransform = "";
        this.box.style.msTransform = "";
        this.box.style.oTransform = "";
        return this.box.style.transform = "";
      } else {
        this.box.style.position = "fixed";
        this.box.style.left = 0;
        this.box.style.top = 0;
        transform = "translate(" + x + "px, " + y + "px)";
        this.box.style.webkitTransform = transform;
        if (head.browser.ff) {
          this.box.style.mozTransform = transform;
        }
        if (head.browser.ie) {
          this.box.style.msTransform = transform;
        }
        if (head.browser.opera) {
          this.box.style.oTransform = transform;
        }
        return this.box.style.transform = transform;
      }
    };
    prototype.transition = function(){
      var trans;
      trans = this.duration && !this.absolute ? "all " + this.duration + "ms ease-in-out 0" : "";
      if (head.browser.ff) {
        this.box.style.mozTransition = trans;
      }
      if (head.browser.ie) {
        this.box.style.msTransition = trans;
      }
      if (head.browser.opera) {
        this.box.style.oTransition = trans;
      }
      return this.box.style.transition = trans;
    };
    prototype.translate = function(){
      var to, this$ = this;
      to = this[this.mode]();
      if (_.isEqual(this.from, to)) {
        return;
      }
      this.transform(to);
      return setTimeout(function(){
        this$.from = to;
        return this$.translate();
      }, this.duration);
    };
    return Layout;
  }());
}).call(this);


/*
Mem v0.0.3
http://github.com/7korobi/---
(c) 7korobi
License: MIT
 */

(function() {
  var def, type, typeof_str,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  typeof_str = Object.prototype.toString;

  type = function(o) {
    return typeof_str.call(o).slice(8, -1);
  };

  def = function(obj, key, arg) {
    var configurable, enumerable, get, set;
    get = arg.get, set = arg.set;
    configurable = false;
    enumerable = false;
    Object.defineProperty(obj, key, {
      configurable: configurable,
      enumerable: enumerable,
      get: get,
      set: set
    });
  };

  this.Mem = (function() {
    function Mem() {}

    Mem.rule = {};

    return Mem;

  })();

  Mem.Query = (function() {
    function Query(finder1, filters1, desc1, sort_by1) {
      this.finder = finder1;
      this.filters = filters1;
      this.desc = desc1;
      this.sort_by = sort_by1;
    }

    Query.prototype._filters = function(query, cb) {
      var filters, req, target;
      if (!query) {
        return this;
      }
      filters = this.filters.concat();
      switch (type(query)) {
        case "Object":
          for (target in query) {
            req = query[target];
            filters.push(cb(target, req));
          }
          break;
        case "Function":
          filters.push(cb(null, query));
          break;
        default:
          console.log([type(query, query)]);
          throw Error('unimplemented');
      }
      return new Mem.Query(this.finder, filters, this.desc, this.sort_by);
    };

    Query.prototype["in"] = function(query) {
      return this._filters(query, function(target, req) {
        switch (type(req)) {
          case "Array":
            return function(o) {
              var i, key, len;
              for (i = 0, len = req.length; i < len; i++) {
                key = req[i];
                if (indexOf.call(o[target], key) >= 0) {
                  return true;
                }
              }
              return false;
            };
          case "RegExp":
            return function(o) {
              var i, len, ref, val;
              ref = o[target];
              for (i = 0, len = ref.length; i < len; i++) {
                val = ref[i];
                if (req.test(val)) {
                  return true;
                }
              }
              return false;
            };
          case "Null":
          case "Boolean":
          case "String":
          case "Number":
            return function(o) {
              return indexOf.call(o[target], req) >= 0;
            };
          default:
            console.log([type(req, req)]);
            throw Error('unimplemented');
        }
      });
    };

    Query.prototype.distinct = function(reduce, target) {
      var query;
      query = new Mem.Query(this.finder, this.filters, this.desc, this.sort_by);
      query._distinct = {
        reduce: reduce,
        target: target
      };
      return query;
    };

    Query.prototype.where = function(query) {
      return this._filters(query, function(target, req) {
        switch (type(req)) {
          case "Array":
            return function(o) {
              var ref;
              return ref = o[target], indexOf.call(req, ref) >= 0;
            };
          case "RegExp":
            return function(o) {
              return req.test(o[target]);
            };
          case "Function":
            return req;
          case "Null":
          case "Boolean":
          case "String":
          case "Number":
            return function(o) {
              return o[target] === req;
            };
          default:
            console.log([type(req, req)]);
            throw Error('unimplemented');
        }
      });
    };

    Query.prototype.search = function(text) {
      var item, list, regexp;
      if (!text) {
        return this;
      }
      list = (function() {
        var i, len, ref, results;
        ref = text.split(/\s+/);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          if (!item.length) {
            continue;
          }
          results.push("(" + item + ")");
        }
        return results;
      })();
      if (!list.length) {
        return this;
      }
      regexp = new RegExp(list.join("|"), "ig");
      return this.where(function(o) {
        return (!o.search_words) || regexp.test(o.search_words);
      });
    };

    Query.prototype.sort = function(desc, order) {
      var sort_by;
      if (order == null) {
        order = this.sort_by;
      }
      sort_by = (function() {
        switch (type(order)) {
          case "Function":
            return order;
          case "String":
          case "Number":
            return function(o) {
              return o[order];
            };
          default:
            console.log([type(req, req)]);
            throw Error('unimplemented');
        }
      })();
      if (desc === this.desc && sort_by === this.sort_by) {
        return this;
      }
      return new Mem.Query(this.finder, this.filters, desc, sort_by);
    };

    Query.prototype.clear = function() {
      delete this._reduce;
      delete this._list;
      delete this._hash;
      return delete this._memory;
    };

    def(Query.prototype, "reduce", {
      get: function() {
        if (this._reduce == null) {
          this.finder.calculate(this);
        }
        return this._reduce;
      }
    });

    def(Query.prototype, "list", {
      get: function() {
        if (this._list == null) {
          this.finder.calculate(this);
        }
        return this._list;
      }
    });

    def(Query.prototype, "hash", {
      get: function() {
        if (this._hash == null) {
          this.finder.calculate(this);
        }
        return this._hash;
      }
    });

    def(Query.prototype, "memory", {
      get: function() {
        if (this._memory == null) {
          this.finder.calculate(this);
        }
        return this._memory;
      }
    });

    def(Query.prototype, "ids", {
      get: function() {
        return Object.keys(this.memory);
      }
    });

    Query.prototype.find = function(id) {
      return this.hash[id];
    };

    Query.prototype.finds = function(ids) {
      var i, id, len, o, results;
      results = [];
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        if (o = this.hash[id]) {
          results.push(o);
        }
      }
      return results;
    };

    Query.prototype.pluck = function() {
      var keys;
      keys = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      switch (keys.length) {
        case 0:
          return this.list.map(function() {
            return null;
          });
        case 1:
          return this.list.map(function(o) {
            return o[keys[0]];
          });
        default:
          return this.list.map(function(o) {
            var i, key, len, results;
            results = [];
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              results.push(o[key]);
            }
            return results;
          });
      }
    };

    return Query;

  })();

  Mem.Finder = (function() {
    function Finder(sort_by1) {
      var all;
      this.sort_by = sort_by1;
      all = new Mem.Query(this, [], false, this.sort_by);
      all._memory = {};
      this.scope = {
        all: all
      };
      this.query = {
        all: all
      };
    }

    Finder.prototype.rehash = function(rules, diff) {
      var i, len, rule;
      delete this.query.all._reduce;
      delete this.query.all._list;
      delete this.query.all._hash;
      this.query = {
        all: this.query.all
      };
      for (i = 0, len = rules.length; i < len; i++) {
        rule = rules[i];
        rule.rehash(diff);
      }
    };

    Finder.prototype.calculate_reduce = function(query) {
      var base, calc, emits, group, i, id, init, item, j, key, keys, last, len, len1, map, o, reduce, ref, ref1, ref2;
      init = function(map) {
        var o;
        o = {};
        if (map.count) {
          o.count = 0;
        }
        if (map.all) {
          o.all = 0;
        }
        return o;
      };
      reduce = function(item, o, map) {
        if (!(map.max <= o.max)) {
          o.max_is = item;
          o.max = map.max;
        }
        if (!(o.min <= map.min)) {
          o.min_is = item;
          o.min = map.min;
        }
        if (map.count) {
          o.count += map.count;
        }
        if (map.all) {
          return o.all += map.all;
        }
      };
      calc = function(o) {
        if (o.all && o.count) {
          return o.avg = o.all / o.count;
        }
      };
      base = {};
      ref = query._memory;
      for (id in ref) {
        ref1 = ref[id], item = ref1.item, emits = ref1.emits;
        for (i = 0, len = emits.length; i < len; i++) {
          ref2 = emits[i], keys = ref2[0], last = ref2[1], map = ref2[2];
          o = base;
          for (j = 0, len1 = keys.length; j < len1; j++) {
            key = keys[j];
            o = o[key] || (o[key] = {});
          }
          o = o[last] || (o[last] = init(map));
          reduce(item, o, map);
        }
      }
      for (group in base) {
        emits = base[group];
        for (key in emits) {
          map = emits[key];
          calc(map);
        }
      }
      return query._reduce = base;
    };

    Finder.prototype.calculate_sort = function(query) {
      var gt, i, is_array, len, list, lt, o, ref, s;
      list = query._list;
      ref = query.desc ? [1, -1] : [-1, 1], lt = ref[0], gt = ref[1];
      s = query.orders = {};
      for (i = 0, len = list.length; i < len; i++) {
        o = list[i];
        s[o._id] = query.sort_by(o);
      }
      if (list.length) {
        is_array = Array.isArray(query.sort_by(list[0]));
      }
      return query._list = is_array ? list.sort(function(a, b) {
        var a_list, a_val, b_list, b_val, index, j, len1;
        a_list = s[a._id];
        b_list = s[b._id];
        for (index = j = 0, len1 = a_list.length; j < len1; index = ++j) {
          a_val = a_list[index];
          b_val = b_list[index];
          if (a_val < b_val) {
            return lt;
          }
          if (a_val > b_val) {
            return gt;
          }
        }
        return 0;
      }) : list.sort(function(a, b) {
        var a_val, b_val;
        a_val = s[a._id];
        b_val = s[b._id];
        if (a_val < b_val) {
          return lt;
        }
        if (a_val > b_val) {
          return gt;
        }
        return 0;
      });
    };

    Finder.prototype.calculate_group = function(query) {
      var id, o, reduce, ref, target;
      ref = query._distinct, reduce = ref.reduce, target = ref.target;
      return query._list = (function() {
        var ref1, results;
        ref1 = query._reduce[reduce];
        results = [];
        for (id in ref1) {
          o = ref1[id];
          results.push(o[target]);
        }
        return results;
      })();
    };

    Finder.prototype.calculate_list = function(query, all) {
      var deploy, filters, id, o;
      if (query._memory === all) {
        deploy = function(id, o) {
          return query._hash[id] = o.item;
        };
      } else {
        query._memory = {};
        deploy = function(id, o) {
          query._memory[id] = o;
          return query._hash[id] = o.item;
        };
      }
      query._hash = {};
      return query._list = (function() {
        var i, len, ref, results;
        results = [];
        for (id in all) {
          o = all[id];
          ref = query.filters;
          for (i = 0, len = ref.length; i < len; i++) {
            filters = ref[i];
            if (!filters(o.item)) {
              o = null;
            }
            if (!o) {
              break;
            }
          }
          if (!o) {
            continue;
          }
          results.push(deploy(id, o));
        }
        return results;
      })();
    };

    Finder.prototype.calculate = function(query) {
      this.calculate_list(query, this.query.all._memory);
      if (query._list.length && (this.map_reduce != null)) {
        this.calculate_reduce(query);
        if (query._distinct != null) {
          this.calculate_group(query);
        }
      }
      this.calculate_sort(query);
    };

    return Finder;

  })();

  Mem.Rule = (function() {
    Rule.responses = {};

    function Rule(field) {
      var base1;
      this.id = field + "_id";
      this.list_name = field + "s";
      this.base_obj = {};
      this.validates = [];
      this.responses = (base1 = Mem.Rule.responses)[field] != null ? base1[field] : base1[field] = [];
      this.map_reduce = function() {};
      this.protect = function() {};
      this.deploy = (function(_this) {
        return function(o) {
          if (!o._id) {
            o._id = o[_this.id];
          }
          if (!o[_this.id]) {
            return o[_this.id] = o._id;
          }
        };
      })(this);
      this.finder = new Mem.Finder(function(list) {
        return list;
      });
      this.finder.name = this.list_name;
      Mem.rule[field] = this;
      Mem[this.list_name] = this.finder.query.all;
    }

    Rule.prototype.schema = function(cb) {
      var cache_scope, definer;
      cache_scope = function(key, finder, query_call) {
        switch (type(query_call)) {
          case "Function":
            return finder.query.all[key] = function() {
              var args, base1, name;
              args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              return (base1 = finder.query)[name = key + ":" + (JSON.stringify(args))] != null ? base1[name] : base1[name] = query_call.apply(null, args);
            };
          default:
            return finder.query.all[key] = query_call;
        }
      };
      definer = {
        scope: (function(_this) {
          return function(cb) {
            var key, query_call, ref, results;
            _this.finder.scope = cb(_this.finder.query.all);
            ref = _this.finder.scope;
            results = [];
            for (key in ref) {
              query_call = ref[key];
              results.push(cache_scope(key, _this.finder, query_call));
            }
            return results;
          };
        })(this),
        "default": (function(_this) {
          return function(cb) {
            var key, ref, results, val;
            ref = cb();
            results = [];
            for (key in ref) {
              val = ref[key];
              results.push(_this.base_obj[key] = val);
            }
            return results;
          };
        })(this),
        depend_on: (function(_this) {
          return function(parent) {
            var base1;
            if ((base1 = Mem.Rule.responses)[parent] == null) {
              base1[parent] = [];
            }
            return Mem.Rule.responses[parent].push(_this);
          };
        })(this),
        belongs_to: (function(_this) {
          return function(parent, option) {
            var dependent, parent_id, parents;
            parents = parent + "s";
            parent_id = parent + "_id";
            def(_this.base_obj, parent, {
              get: function() {
                return Mem[parents].find(this[parent_id]);
              }
            });
            dependent = (option != null ? option.dependent : void 0) != null;
            if (dependent) {
              definer.depend_on(parent);
              return _this.validates.push(function(o) {
                return o[parent] != null;
              });
            }
          };
        })(this),
        has_many: (function(_this) {
          return function(children, option) {
            var all, key, query;
            key = _this.id;
            all = _this.finder.query.all;
            query = option != null ? option.query : void 0;
            cache_scope(children, _this.finder, function(id) {
              if (query == null) {
                query = Mem[children];
              }
              return query.where(function(o) {
                return o[key] === id;
              });
            });
            return def(_this.base_obj, children, {
              get: function() {
                return all[children](this._id);
              }
            });
          };
        })(this),
        order: (function(_this) {
          return function(order) {
            var query;
            query = _this.finder.query.all.sort(false, order);
            query._memory = _this.finder.query.all._memory;
            return Mem[_this.list_name] = _this.finder.query.all = query;
          };
        })(this),
        protect: (function(_this) {
          return function() {
            var keys;
            keys = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return _this.protect = function(o, old) {
              var i, key, len, results;
              results = [];
              for (i = 0, len = keys.length; i < len; i++) {
                key = keys[i];
                results.push(o[key] = old[key]);
              }
              return results;
            };
          };
        })(this),
        deploy: (function(_this) {
          return function(deploy1) {
            _this.deploy = deploy1;
          };
        })(this),
        map_reduce: (function(_this) {
          return function(map_reduce) {
            _this.map_reduce = map_reduce;
          };
        })(this)
      };
      return cb.call(definer, this);
    };

    Rule.prototype.rehash = function(diff) {
      return this.finder.rehash(this.responses, diff);
    };

    Rule.prototype.set_base = function(mode, from, parent) {
      var all, deployer, diff, each, finder, validate_item;
      finder = this.finder;
      diff = finder.diff;
      all = finder.query.all._memory;
      deployer = (function(_this) {
        return function(o) {
          o.__proto__ = _this.base_obj;
          return _this.deploy(o);
        };
      })(this);
      validate_item = (function(_this) {
        return function(item) {
          var i, len, ref, validate;
          ref = _this.validates;
          for (i = 0, len = ref.length; i < len; i++) {
            validate = ref[i];
            if (!validate(item)) {
              return false;
            }
          }
          return true;
        };
      })(this);
      each = function(process) {
        var i, id, item, len, ref, ref1;
        switch (type(from)) {
          case "Array":
            ref = from || [];
            for (i = 0, len = ref.length; i < len; i++) {
              item = ref[i];
              if (!item) {
                continue;
              }
              process(item);
            }
            break;
          case "Object":
            ref1 = from || {};
            for (id in ref1) {
              item = ref1[id];
              if (!item) {
                continue;
              }
              item._id = id;
              process(item);
            }
        }
      };
      switch (mode) {
        case "merge":
          each((function(_this) {
            return function(item) {
              var emit, key, o, old, val;
              for (key in parent) {
                val = parent[key];
                item[key] = val;
              }
              deployer(item);
              if (!validate_item(item)) {
                return;
              }
              o = {
                item: item,
                emits: []
              };
              old = all[item._id];
              if (old != null) {
                _this.protect(item, old.item);
                diff.change = true;
              } else {
                diff.add = true;
              }
              all[item._id] = o;
              emit = function() {
                var i, keys, last, map;
                keys = 3 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 2) : (i = 0, []), last = arguments[i++], map = arguments[i++];
                finder.map_reduce = true;
                return o.emits.push([keys, last, map]);
              };
              _this.map_reduce(o.item, emit);
            };
          })(this));
          break;
        default:
          each((function(_this) {
            return function(item) {
              var old;
              old = all[item._id];
              if (old != null) {
                diff.del = true;
                delete all[item._id];
              }
            };
          })(this));
      }
      this.rehash(diff);
    };

    Rule.prototype.set = function(list, parent) {
      var key, ref, val;
      this.finder.diff = {};
      ref = this.finder.query.all._memory;
      for (key in ref) {
        val = ref[key];
        this.finder.query.all._memory = {};
        this.finder.diff.del = true;
        break;
      }
      return this.set_base("merge", list, parent);
    };

    Rule.prototype.reject = function(list) {
      this.finder.diff = {};
      return this.set_base(false, list, null);
    };

    Rule.prototype.merge = function(list, parent) {
      this.finder.diff = {};
      return this.set_base("merge", list, parent);
    };

    return Rule;

  })();

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
ScrollSpy v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
 */

(function() {
  this.ScrollSpy = (function() {
    var interval;

    ScrollSpy.elems = {};

    ScrollSpy.go = function(id, offset) {
      var elem, left_by, rect, top_by;
      elem = ScrollSpy.elems[id];
      if (elem) {
        rect = elem.getBoundingClientRect();
        if (offset == null) {
          offset = Math.min(win.horizon, rect.height) * 0.5;
        }
        top_by = rect.top - win.horizon + offset;
        left_by = 0;
        if (left_by || top_by) {
          return window.scrollBy(left_by, top_by);
        }
      }
    };

    interval = 5000;

    window.setInterval(function() {
      var ref;
      if ((ref = win.scroll) != null ? ref.center : void 0) {
        return win.scroll.tick(win.scroll.center, interval / 1000);
      }
    }, interval);

    ScrollSpy.capture = function() {
      var full_id, id, spy;
      full_id = ScrollSpy.view();
      spy = win.scroll;
      if (spy != null) {
        if (spy.list != null) {
          id = spy.view();
          if (id !== spy.prop()) {
            return spy.prop(id);
          }
        }
      }
    };

    ScrollSpy.view = function() {
      var elem, id, key, rect, ref, ref1, result, vision;
      result = null;
      ref = ScrollSpy.elems;
      for (key in ref) {
        elem = ref[key];
        id = elem.vision.id;
        rect = elem.getBoundingClientRect();
        vision = elem.vision;
        vision.top = rect.top;
        vision.btm = rect.bottom;
        if (elem.vision.id === key && rect.height && rect.width) {
          if (!result && (vision.top < (ref1 = win.horizon) && ref1 < vision.btm)) {
            result = id;
          }
        } else {
          delete ScrollSpy.elems[key];
        }
      }
      return result;
    };

    function ScrollSpy(prop) {
      this.prop = prop;
      this.show_upper = true;
      this.size = 30;
      this.head = this.tail = 0;
    }

    ScrollSpy.prototype.rescroll = function(prop) {
      this.prop = prop;
      return window.requestAnimationFrame((function(_this) {
        return function() {
          return ScrollSpy.go(_this.prop());
        };
      })(this));
    };

    ScrollSpy.prototype.tick = function(center) {
      return console.log(center);
    };

    ScrollSpy.prototype.view = function() {
      var elem, i, id, idx, len, o, pager_rect, ref, ref1, ref2, vision;
      pager_rect = this.pager_elem.getBoundingClientRect();
      this.pager_top = pager_rect.top;
      ref = this.list;
      for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
        o = ref[idx];
        id = o._id;
        if (elem = ScrollSpy.elems[id]) {
          vision = elem.vision;
          if (!this.adjust && (this.pager_top < (ref1 = win.horizon) && ref1 < vision.btm)) {
            vision.offset = Math.max(1, win.horizon - vision.top);
            this.adjust = vision;
          }
        }
      }
      m.startComputation();
      window.requestAnimationFrame(function() {
        return m.endComputation();
      });
      return (ref2 = this.adjust) != null ? ref2.id : void 0;
    };

    ScrollSpy.prototype.pager = function(tag, list, cb) {
      var attr, btm, idx, key, o, pager_cb, rect, ref, show_bottom, show_under, show_upper, top, vdom, vdom_items;
      this.list = list;
      if (!((ref = this.list) != null ? ref.length : void 0)) {
        return m(tag, {
          config: (function(_this) {
            return function(pager_elem) {
              _this.pager_elem = pager_elem;
            };
          })(this)
        });
      }
      top = 0;
      btm = this.list.length - 1;
      if (this.pager_elem != null) {
        rect = this.pager_elem.getBoundingClientRect();
        show_bottom = win.height - rect.bottom;
        show_upper = 0 < rect.top;
        show_under = 0 < show_bottom;
      }
      idx = _.findIndex(this.list, {
        _id: typeof this.prop === "function" ? this.prop() : void 0
      });
      if (idx < 0) {
        idx = (function() {
          if (this.past_list === this.list) {
            switch (false) {
              case !show_upper:
                return this.head;
              case !show_under:
                return this.tail;
              default:
                return this.head;
            }
          } else {
            switch (false) {
              case !show_upper:
                return top;
              case !show_under:
                return btm;
              default:
                return top;
            }
          }
        }).call(this);
      }
      this.past_list = this.list;
      this.center = this.list[idx];
      this.tail = Math.min(btm, _.ceil(idx + this.size, -1));
      this.head = Math.max(top, idx - this.size);
      pager_cb = (function(_this) {
        return function(pager_elem, is_continue, context) {
          var avg, diff_bottom, elem_bottom, size;
          _this.pager_elem = pager_elem;
          rect = _this.pager_elem.getBoundingClientRect();
          _this.show_under = rect.bottom < win.horizon;
          _this.show_upper = win.horizon < rect.top;
          avg = rect.height / (1 + _this.tail - _this.head);
          size = 3 * win.height / avg;
          if (_this.size < size) {
            console.log("!alert! scroll spy size " + _this.size + " < " + size);
          }
          elem_bottom = rect.bottom + win.top;
          diff_bottom = elem_bottom - _this.elem_bottom;
          if (_this.show_under && diff_bottom && !_this.prop() && win.bottom < document.height) {
            window.scrollBy(0, diff_bottom);
          }
          return _this.elem_bottom = elem_bottom;
        };
      })(this);
      vdom_items = (function() {
        var i, len, ref1, ref2, results;
        ref1 = this.list.slice(this.head, +this.tail + 1 || 9e9);
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          o = ref1[i];
          vdom = cb(o);
          ref2 = this.mark(o._id);
          for (key in ref2) {
            attr = ref2[key];
            vdom.attrs[key] = attr;
          }
          results.push(vdom);
        }
        return results;
      }).call(this);
      return m(tag, {
        config: pager_cb
      }, vdom_items);
    };

    ScrollSpy.prototype.mark = function(id) {
      return {
        config: (function(_this) {
          return function(elem, is_continue, context) {
            var offset;
            ScrollSpy.elems[id] = elem;
            elem.vision = {
              id: id
            };
            if (_this.adjust) {
              if (id === _this.adjust.id) {
                offset = _this.adjust.offset;
                _this.adjust = null;
                return ScrollSpy.go(id, offset);
              }
            } else {
              if (!is_continue) {
                if (id === _this.prop()) {
                  return window.requestAnimationFrame(function() {
                    return ScrollSpy.go(id);
                  });
                }
              }
            }
          };
        })(this)
      };
    };

    return ScrollSpy;

  })();

}).call(this);

/*
Serial v0.0.3
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var serial, i$, ref$, len$, n, c, patch_size, string_parser, string_serializer, array_base_parser, pack, unpack, Serial, key, func, out$ = typeof exports != 'undefined' && exports || this;
  serial = {
    to_s: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    to_i: {}
  };
  for (i$ = 0, len$ = (ref$ = serial.to_s).length; i$ < len$; ++i$) {
    n = i$;
    c = ref$[i$];
    serial.to_i[c] = n;
  }
  serial.size = serial.to_s.length;
  patch_size = serial.size * serial.size * serial.size;
  string_parser = function(val){
    switch (val) {
    case "":
    case null:
    case undefined:
      return "";
    default:
      return String(val);
    }
  };
  string_serializer = function(val){
    switch (val) {
    case "":
    case null:
    case undefined:
      return "";
    default:
      return String(val).replace(/[~\/=.&\?\#\[\]()\"'`;]/g, function(s){
        return "%" + s.charCodeAt(0).toString(16);
      });
    }
  };
  array_base_parser = function(val){
    if (Array.isArray(val)) {
      return val;
    } else {
      return (val + "").split(",");
    }
  };
  out$.pack = pack = {
    Keys: function(val){
      var list, key, item;
      list = Array.isArray(val)
        ? val
        : (function(){
          var ref$, results$ = [];
          for (key in ref$ = val) {
            item = ref$[key];
            if (!item) {
              continue;
            }
            results$.push(key);
          }
          return results$;
        }());
      return pack.Array(list.sort());
    },
    Array: function(val){
      if (Array.isArray(val)) {
        return val.join(",");
      } else {
        return val + "";
      }
    },
    Date: function(val){
      var time, result;
      time = Math.floor(val);
      result = "";
      while (time >= 1) {
        result += serial.to_s[time % serial.size];
        time = Math.floor(time / serial.size);
      }
      return result;
    },
    Bool: function(bool){
      if (bool) {
        return "T";
      } else {
        return "F";
      }
    },
    Number: string_serializer,
    Text: string_serializer,
    String: string_serializer,
    'null': string_serializer,
    undefined: string_serializer
  };
  out$.unpack = unpack = {
    HtmlGon: function(html){
      var pattern, script, code;
      pattern = /<script.*?>([\s\S]*?)<\/script>/ig;
      while (script = pattern.exec(html)) {
        code = script[1];
        if (code.length > 0) {
          eval(code);
        }
      }
      return gon;
    },
    Keys: function(val){
      var hash, list, i$, len$, key, bool;
      hash = {};
      if (val.length) {
        list = array_base_parser(val);
        for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
          key = list[i$];
          hash[key] = true;
        }
      } else {
        for (key in val) {
          bool = val[key];
          if (bool) {
            hash[key] = true;
          }
        }
      }
      return hash;
    },
    Array: function(val){
      if (val.length) {
        return array_base_parser(val);
      } else {
        return [];
      }
    },
    Date: function(code){
      var base, result, i$, len$, c, n;
      if (0 < code) {
        return code;
      }
      base = 1;
      result = 0;
      for (i$ = 0, len$ = code.length; i$ < len$; ++i$) {
        c = code[i$];
        n = serial.to_i[c];
        if (n == null) {
          return Number.NaN;
        }
        result += n * base;
        base *= serial.size;
      }
      return result;
    },
    Bool: function(val){
      switch (val) {
      case true:
      case "T":
        return true;
      case false:
      case "F":
        return false;
      default:
        return Number.NaN;
      }
    },
    Number: Number,
    Text: string_parser,
    String: string_parser,
    'null': string_parser,
    undefined: string_parser
  };
  out$.Serial = Serial = {
    url: {},
    ID: {
      now: function(){
        return Serial.ID.at(_.now());
      },
      at: function(date, count){
        count == null && (count = Math.random() * patch_size);
        return pack.Date(date * patch_size + count);
      }
    }
  };
  for (key in unpack) {
    func = unpack[key];
    Serial.url[key] = (fn$());
  }
  function fn$(){
    switch (key) {
    case "Number":
      return "([-]?[\\.0-9]+)";
    case "Date":
      return "([0-9a-zA-Z]+)";
    case "Array":
    case "Keys":
      return "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)";
    case "Text":
      return "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]*)";
    default:
      return "([^\\~\\/\\=\\.\\&\\[\\]\\(\\)\\\"\\'\\`\\;]+)";
    }
  }
}).call(this);

/*
submit v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var iframe_handler, Submit, out$ = typeof exports != 'undefined' && exports || this;
  iframe_handler = document.createElement("div");
  document.body.appendChild(iframe_handler);
  iframe_handler.style.display = "none";
  out$.Submit = Submit = {
    get: function(url, params){
      var query_string, key, val, query;
      query_string = "?";
      for (key in params) {
        val = params[key];
        query_string += key + "=" + val;
      }
      query = {
        method: "GET",
        url: url + encodeURI(query_string),
        deserialize: unpack.HtmlGon
      };
      return m.request(query);
    },
    iframe: function(url, params){
      var deferred, auto_submit, auto_load, key, val;
      deferred = m.deferred();
      auto_submit = {
        action: encodeURI(url),
        method: "POST",
        target: "submit_result",
        config: function(form){
          form.style.display = "none";
          return form.submit();
        }
      };
      auto_load = {
        name: "submit_result",
        config: function(iframe){
          var timer;
          timer = setTimeout(function(){
            return deferred.reject(Error("form request time out."));
          }, DELAY.largo);
          iframe.style.display = "none";
          iframe.contentWindow.name = "submit_result";
          return iframe.onload = function(){
            var e;
            try {
              clearTimeout(timer);
              return deferred.resolve(unpack.HtmlGon(iframe.contentDocument.body.innerHTML));
            } catch (e$) {
              e = e$;
              return deferred.reject(e);
            } finally {
              m.endComputation();
            }
          };
        }
      };
      m.startComputation();
      m.render(iframe_handler, [
        m('iframe', auto_load), m('form#submit_request', auto_submit, (function(){
          var ref$, results$ = [];
          for (key in ref$ = params) {
            val = ref$[key];
            if (val == null) {
              break;
            }
            results$.push(m('input', {
              type: "hidden",
              name: key,
              value: val
            }));
          }
          return results$;
        }()))
      ]);
      return deferred.promise;
    }
  };
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

/*
Win v0.0.1
http://github.com/7korobi/---
(c) 7korobi
License: MIT
*/
(function(){
  var set_scroll, scroll_end, win, out$ = typeof exports != 'undefined' && exports || this;
  set_scroll = function(win){
    win.left = window.scrollX;
    return win.top = window.scrollY;
  };
  scroll_end = function(){
    var check, count, chk, scan;
    if (win.scrolling) {
      return;
    }
    check = {};
    count = 0;
    chk = function(){
      var local;
      local = {};
      set_scroll(local);
      if (check.top === local.top && check.left === local.left) {
        return 10 < count++;
      } else {
        check = local;
        count = 0;
        return false;
      }
    };
    scan = function(){
      if (chk()) {
        win.scrolling = false;
        win.do_event_list(win.on.scroll_end);
        win['do'].resize();
      } else {
        window.requestAnimationFrame(scan);
      }
    };
    scan();
  };
  out$.win = win = {
    do_event_list: function(list, e){
      var i$, len$, cb;
      if (!(0 < list.length)) {
        return;
      }
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        cb = list[i$];
        cb(e);
      }
    },
    'do': {
      resize: function(e){
        var docElem, short, ref$;
        docElem = document.documentElement;
        short = Math.min(docElem.clientWidth, docElem.clientHeight);
        win.width = docElem.clientWidth;
        if (short < 380) {
          head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5";
          if ((ref$ = document.querySelector("meta[name=viewport]")) != null) {
            ref$.content = head.browser.viewport;
          }
        }
        if (window.innerHeight > window.innerWidth) {
          win.landscape = false;
          win.portlate = true;
        } else {
          win.landscape = true;
          win.portlate = false;
        }
        return win.do_event_list(win.on.resize, e);
      },
      scroll_end: scroll_end,
      scroll: function(e){
        set_scroll(win);
        win.height = window.innerHeight;
        win.right = win.left + window.innerWidth;
        win.bottom = win.top + win.height;
        win.horizon = win.height / 2;
        if (!win.scrolling) {
          win.do_event_list(win.on.scroll_start, e);
        }
        win['do'].scroll_end();
        win.scrolling = true;
        return win.do_event_list(win.on.scroll, e);
      },
      orientation: function(e){
        win.orientation = e;
        win.compass = e.webkitCompassHeading;
        return win.do_event_list(win.on.orientation, e);
      },
      motion: function(e){
        win.accel = e.acceleration;
        win.gravity = e.accelerationIncludingGravity;
        win.rotate = e.rotationRate;
        return win.do_event_list(win.on.motion, e);
      },
      load: function(e){
        win.do_event_list(win.on.load, e);
        win['do'].resize();
        return win['do'].scroll();
      }
    },
    on: {
      resize: [],
      scroll: [],
      scroll_start: [],
      scroll_end: [],
      orientation: [],
      motion: [],
      load: []
    },
    top: 0,
    horizon: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
    scroll: null,
    accel: {},
    rotate: {},
    gravity: {},
    orientation: {},
    compass: 0,
    is_tap: false,
    deploy: function(){
      if ("onorientationchange" in window) {
        window.addEventListener('orientationchange', win['do'].scroll);
      } else {
        window.addEventListener('resize', win['do'].scroll);
      }
      window.addEventListener('scroll', win['do'].scroll);
      if ("ondeviceorientation" in window) {
        window.addEventListener('deviceorientation', win['do'].orientation);
      }
      if ("ondevicemotion" in window) {
        window.addEventListener('devicemotion', win['do'].motion);
      }
      if ("onhashchange" in window) {
        window.addEventListener("hashchange", function(event){
          if (event.clipboardData) {
            return console.log(event);
          } else {
            return Url.popstate();
          }
        });
      }
      if ("onpopstate" in window) {
        window.addEventListener("popstate", function(event){
          if (event.clipboardData) {
            return console.log(event);
          } else {
            return Url.popstate();
          }
        });
        if (!head.browser.safari) {
          Url.popstate();
        }
      }
      if ("onmessage" in window) {
        window.addEventListener("message", function(event){
          return console.log("on message");
        });
      }
      if ("onoffline" in window) {
        window.addEventListener("offline", function(event){
          return console.log("on offline  onLine:" + navigator.onLine);
        });
      }
      if ("ononline" in window) {
        window.addEventListener("online", function(event){
          return console.log("on online  onLine:" + navigator.onLine);
        });
      }
      if ("onstorage" in window) {
        window.addEventListener("storage", function(event){
          return console.log("on storage");
        });
      }
      if ("onload" in window) {
        return window.addEventListener("load", win['do'].load);
      }
    }
  };
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
  var Gesture;

  Gesture = (function() {
    function Gesture(event) {
      this.size = 100;
      this.timer = 400;
      this.ondown = this.onup = this.onright = this.onleft = this.onmove = function() {};
      if (event) {
        this.start(event);
      }
    }

    Gesture.prototype.start = function(arg) {
      var layerX, offsetX, pageX, pageY, target;
      pageX = arg.pageX, pageY = arg.pageY, offsetX = arg.offsetX, layerX = arg.layerX, target = arg.target;
      return this.pStart = {
        x: pageX,
        y: pageY,
        at: _.now(),
        offset: offsetX || layerX,
        target: target
      };
    };

    Gesture.prototype.move = function(arg) {
      var is_fast, layerX, offsetX, pageX, pageY, target;
      pageX = arg.pageX, pageY = arg.pageY, offsetX = arg.offsetX, layerX = arg.layerX, target = arg.target;
      this.pEnd = {
        x: pageX,
        y: pageY,
        at: _.now(),
        offset: offsetX || layerX,
        target: target
      };
      if ((this.pStart != null) && (this.pEnd != null)) {
        this.diff = {
          x: this.pEnd.x - this.pStart.x,
          y: this.pEnd.y - this.pStart.y,
          at: this.pEnd.at - this.pStart.at,
          offset: offsetX || layerX,
          target: target
        };
      } else {
        this.diff = null;
      }
      is_fast = (this.diff != null) && this.timer < this.diff.at;
      return this.onmove(this.diff, is_fast);
    };

    Gesture.prototype.end = function(event) {
      if ((this.pStart != null) && (this.pEnd != null)) {
        this.pEnd.at = _.now();
        if (this.diff != null) {
          this.diff.at = this.pEnd.at - this.pStart.at;
          this.fire();
        }
      }
      return this.cancel(event);
    };

    Gesture.prototype.cancel = function(event) {
      return this.pStart = this.pEnd = null;
    };

    Gesture.prototype.fire = function() {
      var is_fast;
      is_fast = (this.diff != null) && this.diff.at < this.timer;
      if (Math.abs(this.diff.x) < this.size) {
        if (Math.abs(this.diff.y) < this.size) {

        } else {
          if (0 < this.diff.y) {
            return this.ondown(this.diff, is_fast);
          } else {
            return this.onup(this.diff, is_fast);
          }
        }
      } else {
        if (Math.abs(this.diff.y) < this.size) {
          if (0 < this.diff.x) {
            return this.onright(this.diff, is_fast);
          } else {
            return this.onleft(this.diff, is_fast);
          }
        } else {

        }
      }
    };

    return Gesture;

  })();

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

(function() {
  var Hilitor;

  Hilitor = function(id, tag) {
    var colorIdx, colors, hiliteTag, matchRegex, openLeft, openRight, skipTags, targetNode, wordColor;
    targetNode = document.getElementById(id) || document.body;
    hiliteTag = tag || "EM";
    skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    wordColor = [];
    colorIdx = 0;
    matchRegex = "";
    openLeft = false;
    openRight = false;
    this.setMatchType = function(type) {
      switch (type) {
        case "left":
          this.openLeft = false;
          this.openRight = true;
          break;
        case "right":
          this.openLeft = true;
          this.openRight = false;
          break;
        case "open":
          this.openLeft = this.openRight = true;
          break;
        default:
          this.openLeft = this.openRight = false;
      }
    };
    this.setRegex = function(input) {
      var re;
      input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
      re = "(" + input + ")";
      if (!this.openLeft) {
        re = "\\b" + re;
      }
      if (!this.openRight) {
        re = re + "\\b";
      }
      matchRegex = new RegExp(re, "i");
    };
    this.getRegex = function() {
      var retval;
      retval = matchRegex.toString();
      retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
      retval = retval.replace(/\|/g, " ");
      return retval;
    };
    this.hiliteWords = function(node) {
      var after, i, match, nv, regs;
      if (node === undefined || !node) {
        return;
      }
      if (!matchRegex) {
        return;
      }
      if (skipTags.test(node.nodeName)) {
        return;
      }
      if (node.hasChildNodes()) {
        i = 0;
        while (i < node.childNodes.length) {
          this.hiliteWords(node.childNodes[i]);
          i++;
        }
      }
      if (node.nodeType === 3) {
        if ((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
          if (!wordColor[regs[0].toLowerCase()]) {
            wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
          }
          match = document.createElement(hiliteTag);
          match.appendChild(document.createTextNode(regs[0]));
          match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
          match.style.fontStyle = "inherit";
          match.style.color = "#000";
          after = node.splitText(regs.index);
          after.nodeValue = after.nodeValue.substring(regs[0].length);
          node.parentNode.insertBefore(match, after);
        }
      }
    };
    this.emove = function() {
      var arr, el, parent;
      arr = document.getElementsByTagName(hiliteTag);
      while (arr.length && (el = arr[0])) {
        parent = el.parentNode;
        parent.replaceChild(el.firstChild, el);
        parent.normalize();
      }
    };
    this.apply = function(input) {
      this.emove();
      if (input === undefined || !input) {
        return;
      }
      this.setRegex(input);
      this.hiliteWords(targetNode);
    };
  };

}).call(this);

(function() {
  var InputBase, InputSow,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  new Mem.Rule("check").schema(function() {
    return this.scope(function(all) {
      return {
        error: function(mode, text) {
          var max, validate;
          max = {
            unit: point,
            size: 1000,
            line: 20
          };
          return validate = {
            type: null,
            is_open: true,
            is_disable: false,
            is_change: true,
            preview: "action",
            target: "TARGET",
            head: "HEAD"
          };
        }
      };
    });
  });

  InputBase = (function() {
    function InputBase() {}

    InputBase.prototype.change = function(text) {
      var mark, message;
      if (text == null) {
        text = "";
      }
      message = this.bad[this.validate.type]();
      this.is_bad = !!message;
      this.can_preview = !this.is_bad;
      if (this.valid) {
        if ('point' === this.max.unit) {
          mark = point + "pt ";
        } else {
          mark = "";
        }
      } else {
        mark = "⊘";
      }
      this.out = {
        style: "cautiontext",
        lines: _.max([5, this.lines]),
        error: message
      };
      if ("string" !== typeof this.out.error) {
        this.out.error = "";
      }
      return this.out.html = this.max ? mark + " " + size + "<sub>/" + this.max.size + "字</sub>  " + lines + "<sub>/" + this.max.line + "行</sub>" : "";
    };

    InputBase.prototype.preview = function(cb) {
      var head, target, text;
      if (this.can_preview) {
        this.text_preview = (function() {
          switch (this.validate.preview) {
            case "talk":
              return this.text.deco_preview;
            case "action":
              target = this.validate.target;
              head = this.validate.head + "は、";
              text = 0 < this.text.length ? this.text.replace(/\n$/g, '\n ') : this.validate.text;
              return "" + head + target + text.deco_preview;
          }
        }).call(this);
        this.is_preview = true;
        return cb();
      } else {

      }
    };

    return InputBase;

  })();

  InputSow = (function(superClass) {
    extend(InputSow, superClass);

    function InputSow(max1, validate1) {
      this.max = max1;
      this.validate = validate1;
      this.bad = {
        entry: (function(_this) {
          return function() {
            return _this.bad.talk();
          };
        })(this),
        talk: (function(_this) {
          return function() {
            return _this.danger_anker() || _this.bad_input();
          };
        })(this),
        memo: (function(_this) {
          return function() {
            return (0 < _this.size) && _this.bad.talk();
          };
        })(this),
        action: (function(_this) {
          return function() {
            return (0 < _this.size) && _this.bad.talk();
          };
        })(this),
        action_free: (function(_this) {
          return function() {
            return _this.bad.talk();
          };
        })(this),
        action_bookmark: (function(_this) {
          return function() {
            return _this.bad_input();
          };
        })(this),
        select: (function(_this) {
          return function() {
            if (_this.validate.is_change) {
              _this.validate.style = "warn";
              return _this.validate.title + "をクリックしましょう。";
            }
          };
        })(this)
      };
      this.requests = {
        entry: (function(_this) {
          return function(arg) {
            var _arg, csid_cid, entrypwd, mes, role, style, turn, vid;
            turn = arg.turn, vid = arg.vid, mes = arg.mes, style = arg.style, csid_cid = arg.csid_cid, role = arg.role, entrypwd = arg.entrypwd;
            _arg = {
              turn: turn,
              vid: vid,
              mes: mes,
              style: style,
              csid_cid: csid_cid,
              role: role,
              entrypwd: entrypwd
            };
            _arg.cmd = "entry";
            _arg.target = -1;
            return _arg;
          };
        })(this),
        talk: (function(_this) {
          return function(arg) {
            var mes, style, target, turn, vid;
            turn = arg.turn, vid = arg.vid, mes = arg.mes, style = arg.style, target = arg.target;
            _arg.cmd = "write";
            return _arg;
          };
        })(this),
        memo: (function(_this) {
          return function(arg) {
            var mes, style, target, turn, vid;
            turn = arg.turn, vid = arg.vid, mes = arg.mes, style = arg.style, target = arg.target;
            _arg.cmd = "wrmemo";
            return _arg;
          };
        })(this),
        action: (function(_this) {
          return function(arg) {
            var actionno, actiontext, style, target, turn, vid;
            turn = arg.turn, vid = arg.vid, actiontext = arg.actiontext, style = arg.style, target = arg.target, actionno = arg.actionno;
            _arg.cmd = "action";
            return _arg;
          };
        })(this),
        select: (function(_this) {
          return function(arg) {
            var cmd, target1, target2, vid;
            vid = arg.vid, target1 = arg.target1, target2 = arg.target2, cmd = arg.cmd;
            if ('vote' === cmd) {
              _arg.entrust = '';
            }
            if ('entrust' === cmd) {
              _arg.entrust = 'entrust';
            }
            return _arg;
          };
        })(this),
        select_commit: (function(_this) {
          return function(arg) {
            var commit, vid;
            vid = arg.vid, commit = arg.commit;
            _arg.cmd = "commit";
            return _arg;
          };
        })(this)
      };
      this.resets = {
        entry: (function(_this) {
          return function() {
            _this.out.error = "";
            _this.is_preview = false;
            return _this.text = "";
          };
        })(this),
        talk: (function(_this) {
          return function() {
            _this.out.error = "";
            _this.is_preview = false;
            return _this.text = "";
          };
        })(this),
        memo: (function(_this) {
          return function() {
            _this.out.error = "";
            _this.is_preview = false;
            return _this.text = last_memo;
          };
        })(this),
        action: (function(_this) {
          return function() {
            _this.out.error = "";
            _this.text = "";
            _this.target = "-1";
            return _this.action = "-99";
          };
        })(this)
      };
      this.change();
    }

    return InputSow;

  })(InputBase);

}).call(this);

