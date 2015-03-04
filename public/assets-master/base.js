var head_conf;

window.DELAY = {
  "largo": 10000,
  "grave": 25000,
  "msg_delete": 25000,
  "msg_minute": 60000,
  "presto": 50,
  "animato": 200,
  "andante": 800,
  "lento": 3200
};

head_conf = {
  screens: [460, 580, 770],
  screensCss: {
    gt: true,
    gte: false,
    lt: true,
    lte: false,
    eq: false
  }
};
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
 * lodash 3.0.1 (Custom Build) lodash.com/license | Underscore.js 1.7.0 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */

;(function(){function n(n,t){if(n!==t){var r=n===n,e=t===t;if(n>t||!r||typeof n=="undefined"&&e)return 1;if(n<t||!e||typeof t=="undefined"&&r)return-1}return 0}function t(n,t,r){if(t!==t)return p(n,r);r=(r||0)-1;for(var e=n.length;++r<e;)if(n[r]===t)return r;return-1}function r(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function e(n){return typeof n=="string"?n:null==n?"":n+""}function u(n){return n.charCodeAt(0)}function o(n,t){for(var r=-1,e=n.length;++r<e&&-1<t.indexOf(n.charAt(r)););return r
}function i(n,t){for(var r=n.length;r--&&-1<t.indexOf(n.charAt(r)););return r}function a(t,r){return n(t.a,r.a)||t.b-r.b}function f(t,r){for(var e=-1,u=t.a,o=r.a,i=u.length;++e<i;){var a=n(u[e],o[e]);if(a)return a}return t.b-r.b}function l(n){return Wt[n]}function c(n){return Nt[n]}function s(n){return"\\"+Lt[n]}function p(n,t,r){var e=n.length;for(t=r?t||e:(t||0)-1;r?t--:++t<e;){var u=n[t];if(u!==u)return t}return-1}function h(n){return n&&typeof n=="object"||false}function g(n){return 160>=n&&9<=n&&13>=n||32==n||160==n||5760==n||6158==n||8192<=n&&(8202>=n||8232==n||8233==n||8239==n||8287==n||12288==n||65279==n)
}function v(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;)n[r]===t&&(n[r]=B,o[++u]=r);return o}function d(n){for(var t=-1,r=n.length;++t<r&&g(n.charCodeAt(t)););return t}function y(n){for(var t=n.length;t--&&g(n.charCodeAt(t)););return t}function _(n){return Ft[n]}function m(g){function Wt(n){if(h(n)&&!To(n)){if(n instanceof Nt)return n;if(Nu.call(n,"__wrapped__"))return new Nt(n.__wrapped__,n.__chain__,zt(n.__actions__))}return new Nt(n)}function Nt(n,t,r){this.__actions__=r||[],this.__chain__=!!t,this.__wrapped__=n
}function Ft(n){this.actions=null,this.dir=1,this.dropCount=0,this.filtered=false,this.iteratees=null,this.takeCount=co,this.views=null,this.wrapped=n}function Ut(){this.__data__={}}function Lt(n){var t=n?n.length:0;for(this.data={hash:no(null),set:new Yu};t--;)this.push(n[t])}function Bt(n,t){var r=n.data;return(typeof t=="string"||Ge(t)?r.set.has(t):r.hash[t])?0:-1}function zt(n,t){var r=-1,e=n.length;for(t||(t=mu(e));++r<e;)t[r]=n[r];return t}function Mt(n,t){for(var r=-1,e=n.length;++r<e&&false!==t(n[r],r,n););return n
}function qt(n,t){for(var r=-1,e=n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function Pt(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;){var i=n[r];t(i,r,n)&&(o[++u]=i)}return o}function Kt(n,t){for(var r=-1,e=n.length,u=mu(e);++r<e;)u[r]=t(n[r],r,n);return u}function Vt(n){for(var t=-1,r=n.length,e=lo;++t<r;){var u=n[t];u>e&&(e=u)}return e}function Yt(n,t,r,e){var u=-1,o=n.length;for(e&&o&&(r=n[++u]);++u<o;)r=t(r,n[u],u,n);return r}function Zt(n,t,r,e){var u=n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);
return r}function Gt(n,t){for(var r=-1,e=n.length;++r<e;)if(t(n[r],r,n))return true;return false}function Jt(n,t){return typeof n=="undefined"?t:n}function Xt(n,t,r,e){return typeof n!="undefined"&&Nu.call(e,r)?n:t}function Ht(n,t,r){var e=Fo(t);if(!r)return nr(t,n,e);for(var u=-1,o=e.length;++u<o;){var i=e[u],a=n[i],f=r(a,t[i],i,n,t);(f===f?f===a:a!==a)&&(typeof a!="undefined"||i in n)||(n[i]=f)}return n}function Qt(n,t){for(var r=-1,e=n.length,u=ue(e),o=t.length,i=mu(o);++r<o;){var a=t[r];u?(a=parseFloat(a),i[r]=re(a,e)?n[a]:b):i[r]=n[a]
}return i}function nr(n,t,r){r||(r=t,t={});for(var e=-1,u=r.length;++e<u;){var o=r[e];t[o]=n[o]}return t}function tr(n,t,r){var e=typeof n;if("function"==e){if(e=typeof t!="undefined"){var e=Wt.support,u=!(e.funcNames?n.name:e.funcDecomp);if(!u){var o=Su.call(n);e.funcNames||(u=!_t.test(o)),u||(u=kt.test(o)||Je(n),bo(n,u))}e=u}n=e?Wr(n,t,r):n}else n=null==n?gu:"object"==e?wr(n,!r):Ar(n+"");return n}function rr(n,t,r,e,u,o,i){var a;if(r&&(a=u?r(n,e,u):r(n)),typeof a!="undefined")return a;if(!Ge(n))return n;
if(e=To(n)){if(a=Qr(n),!t)return zt(n,a)}else{var f=Uu.call(n),l=f==K;if(f!=Y&&f!=z&&(!l||u))return Tt[f]?te(n,f,t):u?n:{};if(a=ne(l?{}:n),!t)return nr(n,a,Fo(n))}for(o||(o=[]),i||(i=[]),u=o.length;u--;)if(o[u]==n)return i[u];return o.push(n),i.push(a),(e?Mt:gr)(n,function(e,u){a[u]=rr(e,t,r,u,n,o,i)}),a}function er(n,t,r,e){if(!Ze(n))throw new Iu($);return Zu(function(){n.apply(b,Er(r,e))},t)}function ur(n,r){var e=n?n.length:0,u=[];if(!e)return u;var o=-1,i=Hr(),a=i==t,f=a&&200<=r.length&&wo(r),l=r.length;
f&&(i=Bt,a=false,r=f);n:for(;++o<e;)if(f=n[o],a&&f===f){for(var c=l;c--;)if(r[c]===f)continue n;u.push(f)}else 0>i(r,f)&&u.push(f);return u}function or(n,t){var r=n?n.length:0;if(!ue(r))return gr(n,t);for(var e=-1,u=se(n);++e<r&&false!==t(u[e],e,u););return n}function ir(n,t){var r=n?n.length:0;if(!ue(r))return vr(n,t);for(var e=se(n);r--&&false!==t(e[r],r,e););return n}function ar(n,t){var r=true;return or(n,function(n,e,u){return r=!!t(n,e,u)}),r}function fr(n,t){var r=[];return or(n,function(n,e,u){t(n,e,u)&&r.push(n)
}),r}function lr(n,t,r,e){var u;return r(n,function(n,r,o){return t(n,r,o)?(u=e?r:n,false):void 0}),u}function cr(n,t,r,e){e=(e||0)-1;for(var u=n.length,o=-1,i=[];++e<u;){var a=n[e];if(h(a)&&ue(a.length)&&(To(a)||Ke(a))){t&&(a=cr(a,t,r));var f=-1,l=a.length;for(i.length+=l;++f<l;)i[++o]=a[f]}else r||(i[++o]=a)}return i}function sr(n,t,r){var e=-1,u=se(n);r=r(n);for(var o=r.length;++e<o;){var i=r[e];if(false===t(u[i],i,u))break}return n}function pr(n,t,r){var e=se(n);r=r(n);for(var u=r.length;u--;){var o=r[u];
if(false===t(e[o],o,e))break}return n}function hr(n,t){sr(n,t,eu)}function gr(n,t){return sr(n,t,Fo)}function vr(n,t){return pr(n,t,Fo)}function dr(n,t){for(var r=-1,e=t.length,u=-1,o=[];++r<e;){var i=t[r];Ze(n[i])&&(o[++u]=i)}return o}function yr(n,t,r){var e=-1,u=typeof t=="function",o=n?n.length:0,i=ue(o)?mu(o):[];return or(n,function(n){var o=u?t:null!=n&&n[t];i[++e]=o?o.apply(n,r):b}),i}function _r(n,t,r,e,u,o){if(n===t)return 0!==n||1/n==1/t;var i=typeof n,a=typeof t;if("function"!=i&&"object"!=i&&"function"!=a&&"object"!=a||null==n||null==t)n=n!==n&&t!==t;
else n:{var i=_r,a=To(n),f=To(t),l=D,c=D;a||(l=Uu.call(n),l==z?l=Y:l!=Y&&(a=nu(n))),f||(c=Uu.call(t),c==z?c=Y:c!=Y&&nu(t));var s=l==Y,f=c==Y,c=l==c;if(!c||a||s)if(l=s&&Nu.call(n,"__wrapped__"),f=f&&Nu.call(t,"__wrapped__"),l||f)n=i(l?n.value():n,f?t.value():t,r,e,u,o);else if(c){for(u||(u=[]),o||(o=[]),l=u.length;l--;)if(u[l]==n){n=o[l]==t;break n}u.push(n),o.push(t),n=(a?Yr:Gr)(n,t,i,r,e,u,o),u.pop(),o.pop()}else n=false;else n=Zr(n,t,l)}return n}function mr(n,t,r,e,u){var o=t.length;if(null==n)return!o;
for(var i=-1,a=!u;++i<o;)if(a&&e[i]?r[i]!==n[t[i]]:!Nu.call(n,t[i]))return false;for(i=-1;++i<o;){var f=t[i];if(a&&e[i])f=Nu.call(n,f);else{var l=n[f],c=r[i],f=u?u(l,c,f):b;typeof f=="undefined"&&(f=_r(c,l,u,true))}if(!f)return false}return true}function br(n,t){var r=[];return or(n,function(n,e,u){r.push(t(n,e,u))}),r}function wr(n,t){var r=Fo(n),e=r.length;if(1==e){var u=r[0],o=n[u];if(oe(o))return function(n){return null!=n&&o===n[u]&&Nu.call(n,u)}}t&&(n=rr(n,true));for(var i=mu(e),a=mu(e);e--;)o=n[r[e]],i[e]=o,a[e]=oe(o);
return function(n){return mr(n,r,i,a)}}function xr(n,t,r,e,u){var o=ue(t.length)&&(To(t)||nu(t));return(o?Mt:gr)(t,function(t,i,a){if(h(t)){e||(e=[]),u||(u=[]);n:{t=e;for(var f=u,l=t.length,c=a[i];l--;)if(t[l]==c){n[i]=f[l],i=void 0;break n}l=n[i],a=r?r(l,c,i,n,a):b;var s=typeof a=="undefined";s&&(a=c,ue(c.length)&&(To(c)||nu(c))?a=To(l)?l:l?zt(l):[]:Wo(c)||Ke(c)?a=Ke(l)?tu(l):Wo(l)?l:{}:s=false),t.push(c),f.push(a),s?n[i]=xr(a,c,r,t,f):(a===a?a!==l:l===l)&&(n[i]=a),i=void 0}return i}f=n[i],a=r?r(f,t,i,n,a):b,(c=typeof a=="undefined")&&(a=t),!o&&typeof a=="undefined"||!c&&(a===a?a===f:f!==f)||(n[i]=a)
}),n}function Ar(n){return function(t){return null==t?b:t[n]}}function jr(n,t){return n+qu(fo()*(t-n+1))}function kr(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function Er(n,t,r){var e=-1,u=n.length;for(t=null==t?0:+t||0,0>t&&(t=-t>u?0:u+t),r=typeof r=="undefined"||r>u?u:+r||0,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=mu(u);++e<u;)r[e]=n[e+t];return r}function Rr(n,t){var r;return or(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function Ir(n,r){var e=-1,u=Hr(),o=n.length,i=u==t,a=i&&200<=o,f=a&&wo(),l=[];
f?(u=Bt,i=false):(a=false,f=r?[]:l);n:for(;++e<o;){var c=n[e],s=r?r(c,e,n):c;if(i&&c===c){for(var p=f.length;p--;)if(f[p]===s)continue n;r&&f.push(s),l.push(c)}else 0>u(f,s)&&((r||a)&&f.push(s),l.push(c))}return l}function Or(n,t){for(var r=-1,e=t.length,u=mu(e);++r<e;)u[r]=n[t[r]];return u}function Cr(n,t){var r=n;r instanceof Ft&&(r=r.value());for(var e=-1,u=t.length;++e<u;){var r=[r],o=t[e];Ku.apply(r,o.args),r=o.func.apply(o.thisArg,r)}return r}function Tr(n,t,r){var e=0,u=n?n.length:e;if(typeof t=="number"&&t===t&&u<=ho){for(;e<u;){var o=e+u>>>1,i=n[o];
(r?i<=t:i<t)?e=o+1:u=o}return u}return Sr(n,t,gu,r)}function Sr(n,t,r,e){t=r(t);for(var u=0,o=n?n.length:0,i=t!==t,a=typeof t=="undefined";u<o;){var f=qu((u+o)/2),l=r(n[f]),c=l===l;(i?c||e:a?c&&(e||typeof l!="undefined"):e?l<=t:l<t)?u=f+1:o=f}return uo(o,po)}function Wr(n,t,r){if(typeof n!="function")return gu;if(typeof t=="undefined")return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,o){return n.call(t,r,e,u,o)
};case 5:return function(r,e,u,o,i){return n.call(t,r,e,u,o,i)}}return function(){return n.apply(t,arguments)}}function Nr(n){return zu.call(n,0)}function Fr(n,t,r){for(var e=r.length,u=-1,o=eo(n.length-e,0),i=-1,a=t.length,f=mu(o+a);++i<a;)f[i]=t[i];for(;++u<e;)f[r[u]]=n[u];for(;o--;)f[i++]=n[u++];return f}function Ur(n,t,r){for(var e=-1,u=r.length,o=-1,i=eo(n.length-u,0),a=-1,f=t.length,l=mu(i+f);++o<i;)l[o]=n[o];for(i=o;++a<f;)l[i+a]=t[a];for(;++e<u;)l[i+r[e]]=n[o++];return l}function Lr(n,t){return function(r,e,u){var o=t?t():{};
if(e=Xr(e,u,3),To(r)){u=-1;for(var i=r.length;++u<i;){var a=r[u];n(o,a,e(a,u,r),r)}}else or(r,function(t,r,u){n(o,t,e(t,r,u),u)});return o}}function $r(n){return function(){var t=arguments.length,r=arguments[0];if(2>t||null==r)return r;if(3<t&&ee(arguments[1],arguments[2],arguments[3])&&(t=2),3<t&&"function"==typeof arguments[t-2])var e=Wr(arguments[--t-1],arguments[t--],5);else 2<t&&"function"==typeof arguments[t-1]&&(e=arguments[--t]);for(var u=0;++u<t;){var o=arguments[u];o&&n(r,o,e)}return r}
}function Br(n,t){function r(){return(this instanceof r?e:n).apply(t,arguments)}var e=Dr(n);return r}function zr(n){return function(t){var r=-1;t=cu(ou(t));for(var e=t.length,u="";++r<e;)u=n(u,t[r],r);return u}}function Dr(n){return function(){var t=mo(n.prototype),r=n.apply(t,arguments);return Ge(r)?r:t}}function Mr(n,t){return function(r,e,o){o&&ee(r,e,o)&&(e=null);var i=Xr(),a=null==e;if(i===tr&&a||(a=false,e=i(e,o,3)),a){if(e=To(r),e||!Qe(r))return n(e?r:ce(r));e=u}return Jr(r,e,t)}}function qr(n,t,r,e,u,o,i,a,f,l){function c(){for(var w=arguments.length,j=w,k=mu(w);j--;)k[j]=arguments[j];
if(e&&(k=Fr(k,e,u)),o&&(k=Ur(k,o,i)),g||y){var j=c.placeholder,E=v(k,j),w=w-E.length;if(w<l){var O=a?zt(a):null,w=eo(l-w,0),C=g?E:null,E=g?null:E,T=g?k:null,k=g?null:k;return t|=g?R:I,t&=~(g?I:R),d||(t&=~(x|A)),k=qr(n,t,r,T,C,k,E,O,f,w),k.placeholder=j,k}}if(j=p?r:this,h&&(n=j[m]),a)for(O=k.length,w=uo(a.length,O),C=zt(k);w--;)E=a[w],k[w]=re(E,O)?C[E]:b;return s&&f<k.length&&(k.length=f),(this instanceof c?_||Dr(n):n).apply(j,k)}var s=t&C,p=t&x,h=t&A,g=t&k,d=t&j,y=t&E,_=!h&&Dr(n),m=n;return c}function Pr(n,t,r){return n=n.length,t=+t,n<t&&to(t)?(t-=n,r=null==r?" ":r+"",fu(r,Du(t/r.length)).slice(0,t)):""
}function Kr(n,t,r,e){function u(){for(var t=-1,a=arguments.length,f=-1,l=e.length,c=mu(a+l);++f<l;)c[f]=e[f];for(;a--;)c[f++]=arguments[++t];return(this instanceof u?i:n).apply(o?r:this,c)}var o=t&x,i=Dr(n);return u}function Vr(n,t,r,e,u,o,i,a){var f=t&A;if(!f&&!Ze(n))throw new Iu($);var l=e?e.length:0;if(l||(t&=~(R|I),e=u=null),l-=u?u.length:0,t&I){var c=e,s=u;e=u=null}var p=!f&&xo(n);if(r=[n,t,r,e,u,c,s,o,i,a],p&&true!==p){e=r[1],t=p[1],a=e|t,o=C|O,u=x|A,i=o|u|j|E;var c=e&C&&!(t&C),s=e&O&&!(t&O),h=(s?r:p)[7],g=(c?r:p)[8];
o=a>=o&&a<=i&&(e<O||(s||c)&&h.length<=g),(!(e>=O&&t>u||e>u&&t>=O)||o)&&(t&x&&(r[2]=p[2],a|=e&x?0:j),(e=p[3])&&(u=r[3],r[3]=u?Fr(u,e,p[4]):zt(e),r[4]=u?v(r[3],B):zt(p[4])),(e=p[5])&&(u=r[5],r[5]=u?Ur(u,e,p[6]):zt(e),r[6]=u?v(r[5],B):zt(p[6])),(e=p[7])&&(r[7]=zt(e)),t&C&&(r[8]=null==r[8]?p[8]:uo(r[8],p[8])),null==r[9]&&(r[9]=p[9]),r[0]=p[0],r[1]=a),t=r[1],a=r[9]}return r[9]=null==a?f?0:n.length:eo(a-l,0)||0,(p?bo:Ao)(t==x?Br(r[0],r[2]):t!=R&&t!=(x|R)||r[4].length?qr.apply(null,r):Kr.apply(null,r),r)
}function Yr(n,t,r,e,u,o,i){var a=-1,f=n.length,l=t.length,c=true;if(f!=l&&(!u||l<=f))return false;for(;c&&++a<f;){var s=n[a],p=t[a],c=b;if(e&&(c=u?e(p,s,a):e(s,p,a)),typeof c=="undefined")if(u)for(var h=l;h--&&(p=t[h],!(c=s&&s===p||r(s,p,e,u,o,i))););else c=s&&s===p||r(s,p,e,u,o,i)}return!!c}function Zr(n,t,r){switch(r){case M:case q:return+n==+t;case P:return n.name==t.name&&n.message==t.message;case V:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case Z:case G:return n==t+""}return false}function Gr(n,t,r,e,u,o,i){var a=Fo(n),f=a.length,l=Fo(t).length;
if(f!=l&&!u)return false;for(var c,l=-1;++l<f;){var s=a[l],p=Nu.call(t,s);if(p){var h=n[s],g=t[s],p=b;e&&(p=u?e(g,h,s):e(h,g,s)),typeof p=="undefined"&&(p=h&&h===g||r(h,g,e,u,o,i))}if(!p)return false;c||(c="constructor"==s)}return c||(r=n.constructor,e=t.constructor,!(r!=e&&"constructor"in n&&"constructor"in t)||typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)?true:false}function Jr(n,t,r){var e=r?co:lo,u=e,o=u;return or(n,function(n,i,a){i=t(n,i,a),((r?i<u:i>u)||i===e&&i===o)&&(u=i,o=n)
}),o}function Xr(n,t,r){var e=Wt.callback||pu,e=e===pu?tr:e;return r?e(n,t,r):e}function Hr(n,r,e){var u=Wt.indexOf||de,u=u===de?t:u;return n?u(n,r,e):u}function Qr(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&Nu.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function ne(n){return n=n.constructor,typeof n=="function"&&n instanceof n||(n=ku),new n}function te(n,t,r){var e=n.constructor;switch(t){case J:return Nr(n);case M:case q:return new e(+n);case X:case H:case Q:case nt:case tt:case rt:case et:case ut:case ot:return t=n.buffer,new e(r?Nr(t):t,n.byteOffset,n.length);
case V:case G:return new e(n);case Z:var u=new e(n.source,yt.exec(n));u.lastIndex=n.lastIndex}return u}function re(n,t){return n=+n,t=null==t?vo:t,-1<n&&0==n%1&&n<t}function ee(n,t,r){if(!Ge(r))return false;var e=typeof t;return"number"==e?(e=r.length,e=ue(e)&&re(t,e)):e="string"==e&&t in n,e&&r[t]===n}function ue(n){return typeof n=="number"&&-1<n&&0==n%1&&n<=vo}function oe(n){return n===n&&(0===n?0<1/n:!Ge(n))}function ie(n,t){n=se(n);for(var r=-1,e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])
}return u}function ae(n,t){var r={};return hr(n,function(n,e,u){t(n,e,u)&&(r[e]=n)}),r}function fe(n){var t;if(!h(n)||Uu.call(n)!=Y||!(Nu.call(n,"constructor")||(t=n.constructor,typeof t!="function"||t instanceof t)))return false;var r;return hr(n,function(n,t){r=t}),typeof r=="undefined"||Nu.call(n,r)}function le(n){for(var t=eu(n),r=t.length,e=r&&n.length,u=Wt.support,u=e&&ue(e)&&(To(n)||u.nonEnumArgs&&Ke(n)),o=-1,i=[];++o<r;){var a=t[o];(u&&re(a,e)||Nu.call(n,a))&&i.push(a)}return i}function ce(n){return null==n?[]:ue(n.length)?Ge(n)?n:ku(n):uu(n)
}function se(n){return Ge(n)?n:ku(n)}function pe(n,t,r){return n&&n.length?((r?ee(n,t,r):null==t)&&(t=1),Er(n,0>t?0:t)):[]}function he(n,t,r){var e=n?n.length:0;return e?((r?ee(n,t,r):null==t)&&(t=1),t=e-(+t||0),Er(n,0,0>t?0:t)):[]}function ge(n,t,r){var e=-1,u=n?n.length:0;for(t=Xr(t,r,3);++e<u;)if(t(n[e],e,n))return e;return-1}function ve(n){return n?n[0]:b}function de(n,r,e){var u=n?n.length:0;if(!u)return-1;if(typeof e=="number")e=0>e?eo(u+e,0):e||0;else if(e)return e=Tr(n,r),n=n[e],(r===r?r===n:n!==n)?e:-1;
return t(n,r,e)}function ye(n){return pe(n,1)}function _e(n,r,e,u){if(!n||!n.length)return[];typeof r!="boolean"&&null!=r&&(u=e,e=ee(n,r,u)?null:r,r=false);var o=Xr();if((o!==tr||null!=e)&&(e=o(e,u,3)),r&&Hr()==t){r=e;var i;e=-1,u=n.length;for(var o=-1,a=[];++e<u;){var f=n[e],l=r?r(f,e,n):f;e&&i===l||(i=l,a[++o]=f)}n=a}else n=Ir(n,e);return n}function me(n){for(var t=-1,r=(n&&n.length&&Vt(Kt(n,Wu)))>>>0,e=mu(r);++t<r;)e[t]=Kt(n,Ar(t));return e}function be(n,t){var r=-1,e=n?n.length:0,u={};for(!e||t||To(n[0])||(t=[]);++r<e;){var o=n[r];
t?u[o]=t[r]:o&&(u[o[0]]=o[1])}return u}function we(n){return n=Wt(n),n.__chain__=true,n}function xe(n,t,r){return t.call(r,n)}function Ae(n,t,r){var e=n?n.length:0;return ue(e)||(n=uu(n),e=n.length),e?(r=typeof r=="number"?0>r?eo(e+r,0):r||0:0,typeof n=="string"||!To(n)&&Qe(n)?r<e&&-1<n.indexOf(t,r):-1<Hr(n,t,r)):false}function je(n,t,r){var e=To(n)?qt:ar;return(typeof t!="function"||typeof r!="undefined")&&(t=Xr(t,r,3)),e(n,t)}function ke(n,t,r){var e=To(n)?Pt:fr;return t=Xr(t,r,3),e(n,t)}function Ee(n,t,r){return To(n)?(t=ge(n,t,r),-1<t?n[t]:b):(t=Xr(t,r,3),lr(n,t,or))
}function Re(n,t,r){return typeof t=="function"&&typeof r=="undefined"&&To(n)?Mt(n,t):or(n,Wr(t,r,3))}function Ie(n,t,r){if(typeof t=="function"&&typeof r=="undefined"&&To(n))for(r=n.length;r--&&false!==t(n[r],r,n););else n=ir(n,Wr(t,r,3));return n}function Oe(n,t,r){var e=To(n)?Kt:br;return t=Xr(t,r,3),e(n,t)}function Ce(n,t,r,e){return(To(n)?Yt:kr)(n,Xr(t,e,4),r,3>arguments.length,or)}function Te(n,t,r,e){return(To(n)?Zt:kr)(n,Xr(t,e,4),r,3>arguments.length,ir)}function Se(n,t,r){return(r?ee(n,t,r):null==t)?(n=ce(n),t=n.length,0<t?n[jr(0,t-1)]:b):(n=We(n),n.length=uo(0>t?0:+t||0,n.length),n)
}function We(n){n=ce(n);for(var t=-1,r=n.length,e=mu(r);++t<r;){var u=jr(0,t);t!=u&&(e[t]=e[u]),e[u]=n[t]}return e}function Ne(n,t,r){var e=To(n)?Gt:Rr;return(typeof t!="function"||typeof r!="undefined")&&(t=Xr(t,r,3)),e(n,t)}function Fe(n,t){var r;if(!Ze(t)){if(!Ze(n))throw new Iu($);var e=n;n=t,t=e}return function(){return 0<--n?r=t.apply(this,arguments):t=null,r}}function Ue(n,t){var r=x;if(2<arguments.length)var e=Er(arguments,2),u=v(e,Ue.placeholder),r=r|R;return Vr(n,r,t,e,u)}function Le(n,t){var r=x|A;
if(2<arguments.length)var e=Er(arguments,2),u=v(e,Le.placeholder),r=r|R;return Vr(t,r,n,e,u)}function $e(n,t,r){return r&&ee(n,t,r)&&(t=null),n=Vr(n,k,null,null,null,null,null,t),n.placeholder=$e.placeholder,n}function Be(n,t,r){return r&&ee(n,t,r)&&(t=null),n=Vr(n,E,null,null,null,null,null,t),n.placeholder=Be.placeholder,n}function ze(n,t,r){function e(){var r=t-(Co()-l);0>=r||r>t?(a&&Mu(a),r=p,a=s=p=b,r&&(h=Co(),f=n.apply(c,i),s||a||(i=c=null))):s=Zu(e,r)}function u(){s&&Mu(s),a=s=p=b,(v||g!==t)&&(h=Co(),f=n.apply(c,i),s||a||(i=c=null))
}function o(){if(i=arguments,l=Co(),c=this,p=v&&(s||!d),false===g)var r=d&&!s;else{a||d||(h=l);var o=g-(l-h),y=0>=o||o>g;y?(a&&(a=Mu(a)),h=l,f=n.apply(c,i)):a||(a=Zu(u,o))}return y&&s?s=Mu(s):s||t===g||(s=Zu(e,t)),r&&(y=true,f=n.apply(c,i)),!y||s||a||(i=c=null),f}var i,a,f,l,c,s,p,h=0,g=false,v=true;if(!Ze(n))throw new Iu($);if(t=0>t?0:t,true===r)var d=true,v=false;else Ge(r)&&(d=r.leading,g="maxWait"in r&&eo(+r.maxWait||0,t),v="trailing"in r?r.trailing:v);return o.cancel=function(){s&&Mu(s),a&&Mu(a),a=s=p=b},o}function De(){var n=arguments,t=n.length-1;
if(0>t)return function(){};if(!qt(n,Ze))throw new Iu($);return function(){for(var r=t,e=n[r].apply(this,arguments);r--;)e=n[r].call(this,e);return e}}function Me(n,t){function r(){var e=r.cache,u=t?t.apply(this,arguments):arguments[0];if(e.has(u))return e.get(u);var o=n.apply(this,arguments);return e.set(u,o),o}if(!Ze(n)||t&&!Ze(t))throw new Iu($);return r.cache=new Me.Cache,r}function qe(n){var t=Er(arguments,1),r=v(t,qe.placeholder);return Vr(n,R,null,t,r)}function Pe(n){var t=Er(arguments,1),r=v(t,Pe.placeholder);
return Vr(n,I,null,t,r)}function Ke(n){return ue(h(n)?n.length:b)&&Uu.call(n)==z||false}function Ve(n){return n&&1===n.nodeType&&h(n)&&-1<Uu.call(n).indexOf("Element")||false}function Ye(n){return h(n)&&typeof n.message=="string"&&Uu.call(n)==P||false}function Ze(n){return typeof n=="function"||false}function Ge(n){var t=typeof n;return"function"==t||n&&"object"==t||false}function Je(n){return null==n?false:Uu.call(n)==K?$u.test(Su.call(n)):h(n)&&bt.test(n)||false}function Xe(n){return typeof n=="number"||h(n)&&Uu.call(n)==V||false
}function He(n){return h(n)&&Uu.call(n)==Z||false}function Qe(n){return typeof n=="string"||h(n)&&Uu.call(n)==G||false}function nu(n){return h(n)&&ue(n.length)&&Ct[Uu.call(n)]||false}function tu(n){return nr(n,eu(n))}function ru(n){return dr(n,eu(n))}function eu(n){if(null==n)return[];Ge(n)||(n=ku(n));for(var t=n.length,t=t&&ue(t)&&(To(n)||_o.nonEnumArgs&&Ke(n))&&t||0,r=n.constructor,e=-1,r=typeof r=="function"&&r.prototype==n,u=mu(t),o=0<t;++e<t;)u[e]=e+"";for(var i in n)o&&re(i,t)||"constructor"==i&&(r||!Nu.call(n,i))||u.push(i);
return u}function uu(n){return Or(n,Fo(n))}function ou(n){return(n=e(n))&&n.replace(wt,l)}function iu(n){return(n=e(n))&&jt.test(n)?n.replace(At,"\\$&"):n}function au(n,t,r){return r&&ee(n,t,r)&&(t=0),ao(n,t)}function fu(n,t){var r="";if(n=e(n),t=+t,1>t||!n||!to(t))return r;do t%2&&(r+=n),t=qu(t/2),n+=n;while(t);return r}function lu(n,t,r){var u=n;return(n=e(n))?(r?ee(u,t,r):null==t)?n.slice(d(n),y(n)+1):(t=e(t),n.slice(o(n,t),i(n,t)+1)):n}function cu(n,t,r){return r&&ee(n,t,r)&&(t=null),n=e(n),n.match(t||Rt)||[]
}function su(n){try{return n()}catch(t){return Ye(t)?t:wu(t)}}function pu(n,t,r){return r&&ee(n,t,r)&&(t=null),tr(n,t)}function hu(n){return function(){return n}}function gu(n){return n}function vu(n){return wr(n,true)}function du(n,t,r){if(null==r){var e=Ge(t),u=e&&Fo(t);((u=u&&u.length&&dr(t,u))?u.length:e)||(u=false,r=t,t=n,n=this)}u||(u=dr(t,Fo(t)));var o=true,e=-1,i=Ze(n),a=u.length;false===r?o=false:Ge(r)&&"chain"in r&&(o=r.chain);for(;++e<a;){r=u[e];var f=t[r];n[r]=f,i&&(n.prototype[r]=function(t){return function(){var r=this.__chain__;
if(o||r){var e=n(this.__wrapped__);return(e.__actions__=zt(this.__actions__)).push({func:t,args:arguments,thisArg:n}),e.__chain__=r,e}return r=[this.value()],Ku.apply(r,arguments),t.apply(n,r)}}(f))}return n}function yu(){}function _u(n){return Ar(n+"")}g=g?Dt.defaults($t.Object(),g,Dt.pick($t,Ot)):$t;var mu=g.Array,bu=g.Date,wu=g.Error,xu=g.Function,Au=g.Math,ju=g.Number,ku=g.Object,Eu=g.RegExp,Ru=g.String,Iu=g.TypeError,Ou=mu.prototype,Cu=ku.prototype,Tu=(Tu=g.window)&&Tu.document,Su=xu.prototype.toString,Wu=Ar("length"),Nu=Cu.hasOwnProperty,Fu=0,Uu=Cu.toString,Lu=g._,$u=Eu("^"+iu(Uu).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Bu=Je(Bu=g.ArrayBuffer)&&Bu,zu=Je(zu=Bu&&new Bu(0).slice)&&zu,Du=Au.ceil,Mu=g.clearTimeout,qu=Au.floor,Pu=Je(Pu=ku.getPrototypeOf)&&Pu,Ku=Ou.push,Vu=Cu.propertyIsEnumerable,Yu=Je(Yu=g.Set)&&Yu,Zu=g.setTimeout,Gu=Ou.splice,Ju=Je(Ju=g.Uint8Array)&&Ju,Xu=Je(Xu=g.WeakMap)&&Xu,Hu=function(){try{var n=Je(n=g.Float64Array)&&n,t=new n(new Bu(10),0,1)&&n
}catch(r){}return t}(),Qu=Je(Qu=mu.isArray)&&Qu,no=Je(no=ku.create)&&no,to=g.isFinite,ro=Je(ro=ku.keys)&&ro,eo=Au.max,uo=Au.min,oo=Je(oo=bu.now)&&oo,io=Je(io=ju.isFinite)&&io,ao=g.parseInt,fo=Au.random,lo=ju.NEGATIVE_INFINITY,co=ju.POSITIVE_INFINITY,so=Au.pow(2,32)-1,po=so-1,ho=so>>>1,go=Hu?Hu.BYTES_PER_ELEMENT:0,vo=Au.pow(2,53)-1,yo=Xu&&new Xu,_o=Wt.support={};!function(n){_o.funcDecomp=!Je(g.WinRTError)&&kt.test(m),_o.funcNames=typeof xu.name=="string";try{_o.dom=11===Tu.createDocumentFragment().nodeType
}catch(t){_o.dom=false}try{_o.nonEnumArgs=!Vu.call(arguments,1)}catch(r){_o.nonEnumArgs=true}}(0,0),Wt.templateSettings={escape:ht,evaluate:gt,interpolate:vt,variable:"",imports:{_:Wt}};var mo=function(){function n(){}return function(t){if(Ge(t)){n.prototype=t;var r=new n;n.prototype=null}return r||g.Object()}}(),bo=yo?function(n,t){return yo.set(n,t),n}:gu;zu||(Nr=Bu&&Ju?function(n){var t=n.byteLength,r=Hu?qu(t/go):0,e=r*go,u=new Bu(t);if(r){var o=new Hu(u,0,r);o.set(new Hu(n,0,r))}return t!=e&&(o=new Ju(u,e),o.set(new Ju(n,e))),u
}:hu(null));var wo=no&&Yu?function(n){return new Lt(n)}:hu(null),xo=yo?function(n){return yo.get(n)}:yu,Ao=function(){var n=0,t=0;return function(r,e){var u=Co(),o=N-(u-t);if(t=u,0<o){if(++n>=W)return r}else n=0;return bo(r,e)}}(),jo=Lr(function(n,t,r){Nu.call(n,r)?++n[r]:n[r]=1}),ko=Lr(function(n,t,r){Nu.call(n,r)?n[r].push(t):n[r]=[t]}),Eo=Lr(function(n,t,r){n[r]=t}),Ro=Mr(Vt),Io=Mr(function(n){for(var t=-1,r=n.length,e=co;++t<r;){var u=n[t];u<e&&(e=u)}return e},true),Oo=Lr(function(n,t,r){n[r?0:1].push(t)
},function(){return[[],[]]}),Co=oo||function(){return(new bu).getTime()},To=Qu||function(n){return h(n)&&ue(n.length)&&Uu.call(n)==D||false};_o.dom||(Ve=function(n){return n&&1===n.nodeType&&h(n)&&!Wo(n)||false});var So=io||function(n){return typeof n=="number"&&to(n)};(Ze(/x/)||Ju&&!Ze(Ju))&&(Ze=function(n){return Uu.call(n)==K});var Wo=Pu?function(n){if(!n||Uu.call(n)!=Y)return false;var t=n.valueOf,r=Je(t)&&(r=Pu(t))&&Pu(r);return r?n==r||Pu(n)==r:fe(n)}:fe,No=$r(Ht),Fo=ro?function(n){if(n)var t=n.constructor,r=n.length;
return typeof t=="function"&&t.prototype===n||typeof n!="function"&&r&&ue(r)?le(n):Ge(n)?ro(n):[]}:le,Uo=$r(xr),Lo=zr(function(n,t,r){return t=t.toLowerCase(),r?n+t.charAt(0).toUpperCase()+t.slice(1):t}),$o=zr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()});8!=ao(It+"08")&&(au=function(n,t,r){return(r?ee(n,t,r):null==t)?t=0:t&&(t=+t),n=lu(n),ao(n,t||(mt.test(n)?16:10))});var Bo=zr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()});return Nt.prototype=Wt.prototype,Ut.prototype["delete"]=function(n){return this.has(n)&&delete this.__data__[n]
},Ut.prototype.get=function(n){return"__proto__"==n?b:this.__data__[n]},Ut.prototype.has=function(n){return"__proto__"!=n&&Nu.call(this.__data__,n)},Ut.prototype.set=function(n,t){return"__proto__"!=n&&(this.__data__[n]=t),this},Lt.prototype.push=function(n){var t=this.data;typeof n=="string"||Ge(n)?t.set.add(n):t.hash[n]=true},Me.Cache=Ut,Wt.after=function(n,t){if(!Ze(t)){if(!Ze(n))throw new Iu($);var r=n;n=t,t=r}return n=to(n=+n)?n:0,function(){return 1>--n?t.apply(this,arguments):void 0}},Wt.ary=function(n,t,r){return r&&ee(n,t,r)&&(t=null),t=n&&null==t?n.length:eo(+t||0,0),Vr(n,C,null,null,null,null,t)
},Wt.assign=No,Wt.at=function(n){return ue(n?n.length:0)&&(n=ce(n)),Qt(n,cr(arguments,false,false,1))},Wt.before=Fe,Wt.bind=Ue,Wt.bindAll=function(n){for(var t=n,r=1<arguments.length?cr(arguments,false,false,1):ru(n),e=-1,u=r.length;++e<u;){var o=r[e];t[o]=Vr(t[o],x,t)}return t},Wt.bindKey=Le,Wt.callback=pu,Wt.chain=we,Wt.chunk=function(n,t,r){t=(r?ee(n,t,r):null==t)?1:eo(+t||1,1),r=0;for(var e=n?n.length:0,u=-1,o=mu(Du(e/t));r<e;)o[++u]=Er(n,r,r+=t);return o},Wt.compact=function(n){for(var t=-1,r=n?n.length:0,e=-1,u=[];++t<r;){var o=n[t];
o&&(u[++e]=o)}return u},Wt.constant=hu,Wt.countBy=jo,Wt.create=function(n,t,r){var e=mo(n);return r&&ee(n,t,r)&&(t=null),t?nr(t,e,Fo(t)):e},Wt.curry=$e,Wt.curryRight=Be,Wt.debounce=ze,Wt.defaults=function(n){if(null==n)return n;var t=zt(arguments);return t.push(Jt),No.apply(b,t)},Wt.defer=function(n){return er(n,1,arguments,1)},Wt.delay=function(n,t){return er(n,t,arguments,2)},Wt.difference=function(){for(var n=-1,t=arguments.length;++n<t;){var r=arguments[n];if(To(r)||Ke(r))break}return ur(r,cr(arguments,false,true,++n))
},Wt.drop=pe,Wt.dropRight=he,Wt.dropRightWhile=function(n,t,r){var e=n?n.length:0;if(!e)return[];for(t=Xr(t,r,3);e--&&t(n[e],e,n););return Er(n,0,e+1)},Wt.dropWhile=function(n,t,r){var e=n?n.length:0;if(!e)return[];var u=-1;for(t=Xr(t,r,3);++u<e&&t(n[u],u,n););return Er(n,u)},Wt.filter=ke,Wt.flatten=function(n,t,r){var e=n?n.length:0;return r&&ee(n,t,r)&&(t=false),e?cr(n,t):[]},Wt.flattenDeep=function(n){return n&&n.length?cr(n,true):[]},Wt.flow=function(){var n=arguments,t=n.length;if(!t)return function(){};
if(!qt(n,Ze))throw new Iu($);return function(){for(var r=0,e=n[r].apply(this,arguments);++r<t;)e=n[r].call(this,e);return e}},Wt.flowRight=De,Wt.forEach=Re,Wt.forEachRight=Ie,Wt.forIn=function(n,t,r){return(typeof t!="function"||typeof r!="undefined")&&(t=Wr(t,r,3)),sr(n,t,eu)},Wt.forInRight=function(n,t,r){return t=Wr(t,r,3),pr(n,t,eu)},Wt.forOwn=function(n,t,r){return(typeof t!="function"||typeof r!="undefined")&&(t=Wr(t,r,3)),gr(n,t)},Wt.forOwnRight=function(n,t,r){return t=Wr(t,r,3),pr(n,t,Fo)
},Wt.functions=ru,Wt.groupBy=ko,Wt.indexBy=Eo,Wt.initial=function(n){return he(n,1)},Wt.intersection=function(){for(var n=[],r=-1,e=arguments.length,u=[],o=Hr(),i=o==t;++r<e;){var a=arguments[r];(To(a)||Ke(a))&&(n.push(a),u.push(i&&120<=a.length&&wo(r&&a)))}var e=n.length,i=n[0],f=-1,l=i?i.length:0,c=[],s=u[0];n:for(;++f<l;)if(a=i[f],0>(s?Bt(s,a):o(c,a))){for(r=e;--r;){var p=u[r];if(0>(p?Bt(p,a):o(n[r],a)))continue n}s&&s.push(a),c.push(a)}return c},Wt.invert=function(n,t,r){r&&ee(n,t,r)&&(t=null),r=-1;
for(var e=Fo(n),u=e.length,o={};++r<u;){var i=e[r],a=n[i];t?Nu.call(o,a)?o[a].push(i):o[a]=[i]:o[a]=i}return o},Wt.invoke=function(n,t){return yr(n,t,Er(arguments,2))},Wt.keys=Fo,Wt.keysIn=eu,Wt.map=Oe,Wt.mapValues=function(n,t,r){var e={};return t=Xr(t,r,3),gr(n,function(n,r,u){e[r]=t(n,r,u)}),e},Wt.matches=vu,Wt.memoize=Me,Wt.merge=Uo,Wt.mixin=du,Wt.negate=function(n){if(!Ze(n))throw new Iu($);return function(){return!n.apply(this,arguments)}},Wt.omit=function(n,t,r){if(null==n)return{};if(typeof t!="function"){var e=Kt(cr(arguments,false,false,1),Ru);
return ie(n,ur(eu(n),e))}return t=Wr(t,r,3),ae(n,function(n,r,e){return!t(n,r,e)})},Wt.once=function(n){return Fe(n,2)},Wt.pairs=function(n){for(var t=-1,r=Fo(n),e=r.length,u=mu(e);++t<e;){var o=r[t];u[t]=[o,n[o]]}return u},Wt.partial=qe,Wt.partialRight=Pe,Wt.partition=Oo,Wt.pick=function(n,t,r){return null==n?{}:typeof t=="function"?ae(n,Wr(t,r,3)):ie(n,cr(arguments,false,false,1))},Wt.pluck=function(n,t){return Oe(n,_u(t))},Wt.property=_u,Wt.propertyOf=function(n){return function(t){return null==n?b:n[t]
}},Wt.pull=function(){var n=arguments[0];if(!n||!n.length)return n;for(var t=0,r=Hr(),e=arguments.length;++t<e;)for(var u=0,o=arguments[t];-1<(u=r(n,o,u));)Gu.call(n,u,1);return n},Wt.pullAt=function(t){var r=t||[],e=cr(arguments,false,false,1),u=e.length,o=Qt(r,e);for(e.sort(n);u--;){var i=parseFloat(e[u]);if(i!=a&&re(i)){var a=i;Gu.call(r,i,1)}}return o},Wt.range=function(n,t,r){r&&ee(n,t,r)&&(t=r=null),n=+n||0,r=null==r?1:+r||0,null==t?(t=n,n=0):t=+t||0;var e=-1;t=eo(Du((t-n)/(r||1)),0);for(var u=mu(t);++e<t;)u[e]=n,n+=r;
return u},Wt.rearg=function(n){var t=cr(arguments,false,false,1);return Vr(n,O,null,null,null,t)},Wt.reject=function(n,t,r){var e=To(n)?Pt:fr;return t=Xr(t,r,3),e(n,function(n,r,e){return!t(n,r,e)})},Wt.remove=function(n,t,r){var e=-1,u=n?n.length:0,o=[];for(t=Xr(t,r,3);++e<u;)r=n[e],t(r,e,n)&&(o.push(r),Gu.call(n,e--,1),u--);return o},Wt.rest=ye,Wt.shuffle=We,Wt.slice=function(n,t,r){var e=n?n.length:0;return e?(r&&typeof r!="number"&&ee(n,t,r)&&(t=0,r=e),Er(n,t,r)):[]},Wt.sortBy=function(n,t,e){var u=-1,o=n?n.length:0,i=ue(o)?mu(o):[];
return e&&ee(n,t,e)&&(t=null),t=Xr(t,e,3),or(n,function(n,r,e){i[++u]={a:t(n,r,e),b:u,c:n}}),r(i,a)},Wt.sortByAll=function(n){var t=arguments;3<t.length&&ee(t[1],t[2],t[3])&&(t=[n,t[1]]);var e=-1,u=n?n.length:0,o=cr(t,false,false,1),i=ue(u)?mu(u):[];return or(n,function(n){for(var t=o.length,r=mu(t);t--;)r[t]=null==n?b:n[o[t]];i[++e]={a:r,b:e,c:n}}),r(i,f)},Wt.take=function(n,t,r){return n&&n.length?((r?ee(n,t,r):null==t)&&(t=1),Er(n,0,0>t?0:t)):[]},Wt.takeRight=function(n,t,r){var e=n?n.length:0;return e?((r?ee(n,t,r):null==t)&&(t=1),t=e-(+t||0),Er(n,0>t?0:t)):[]
},Wt.takeRightWhile=function(n,t,r){var e=n?n.length:0;if(!e)return[];for(t=Xr(t,r,3);e--&&t(n[e],e,n););return Er(n,e+1)},Wt.takeWhile=function(n,t,r){var e=n?n.length:0;if(!e)return[];var u=-1;for(t=Xr(t,r,3);++u<e&&t(n[u],u,n););return Er(n,0,u)},Wt.tap=function(n,t,r){return t.call(r,n),n},Wt.throttle=function(n,t,r){var e=true,u=true;if(!Ze(n))throw new Iu($);return false===r?e=false:Ge(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),St.leading=e,St.maxWait=+t,St.trailing=u,ze(n,t,St)
},Wt.thru=xe,Wt.times=function(n,t,r){if(n=+n,1>n||!to(n))return[];var e=-1,u=mu(uo(n,so));for(t=Wr(t,r,1);++e<n;)e<so?u[e]=t(e):t(e);return u},Wt.toArray=function(n){var t=n?n.length:0;return ue(t)?t?zt(n):[]:uu(n)},Wt.toPlainObject=tu,Wt.transform=function(n,t,r,e){var u=To(n)||nu(n);return t=Xr(t,e,4),null==r&&(u||Ge(n)?(e=n.constructor,r=u?To(n)?new e:[]:mo(typeof e=="function"&&e.prototype)):r={}),(u?Mt:gr)(n,function(n,e,u){return t(r,n,e,u)}),r},Wt.union=function(){return Ir(cr(arguments,false,true))
},Wt.uniq=_e,Wt.unzip=me,Wt.values=uu,Wt.valuesIn=function(n){return Or(n,eu(n))},Wt.where=function(n,t){return ke(n,vu(t))},Wt.without=function(n){return ur(n,Er(arguments,1))},Wt.wrap=function(n,t){return t=null==t?gu:t,Vr(t,R,null,[n],[])},Wt.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var r=arguments[n];if(To(r)||Ke(r))var e=e?ur(e,r).concat(ur(r,e)):r}return e?Ir(e):[]},Wt.zip=function(){for(var n=arguments.length,t=mu(n);n--;)t[n]=arguments[n];return me(t)},Wt.zipObject=be,Wt.backflow=De,Wt.collect=Oe,Wt.compose=De,Wt.each=Re,Wt.eachRight=Ie,Wt.extend=No,Wt.iteratee=pu,Wt.methods=ru,Wt.object=be,Wt.select=ke,Wt.tail=ye,Wt.unique=_e,du(Wt,Wt),Wt.attempt=su,Wt.camelCase=Lo,Wt.capitalize=function(n){return(n=e(n))&&n.charAt(0).toUpperCase()+n.slice(1)
},Wt.clone=function(n,t,r,e){return typeof t!="boolean"&&null!=t&&(e=r,r=ee(n,t,e)?null:t,t=false),r=typeof r=="function"&&Wr(r,e,1),rr(n,t,r)},Wt.cloneDeep=function(n,t,r){return t=typeof t=="function"&&Wr(t,r,1),rr(n,true,t)},Wt.deburr=ou,Wt.endsWith=function(n,t,r){n=e(n),t+="";var u=n.length;return r=(typeof r=="undefined"?u:uo(0>r?0:+r||0,u))-t.length,0<=r&&n.indexOf(t,r)==r},Wt.escape=function(n){return(n=e(n))&&pt.test(n)?n.replace(ct,c):n},Wt.escapeRegExp=iu,Wt.every=je,Wt.find=Ee,Wt.findIndex=ge,Wt.findKey=function(n,t,r){return t=Xr(t,r,3),lr(n,t,gr,true)
},Wt.findLast=function(n,t,r){return t=Xr(t,r,3),lr(n,t,ir)},Wt.findLastIndex=function(n,t,r){var e=n?n.length:0;for(t=Xr(t,r,3);e--;)if(t(n[e],e,n))return e;return-1},Wt.findLastKey=function(n,t,r){return t=Xr(t,r,3),lr(n,t,vr,true)},Wt.findWhere=function(n,t){return Ee(n,vu(t))},Wt.first=ve,Wt.has=function(n,t){return n?Nu.call(n,t):false},Wt.identity=gu,Wt.includes=Ae,Wt.indexOf=de,Wt.isArguments=Ke,Wt.isArray=To,Wt.isBoolean=function(n){return true===n||false===n||h(n)&&Uu.call(n)==M||false},Wt.isDate=function(n){return h(n)&&Uu.call(n)==q||false
},Wt.isElement=Ve,Wt.isEmpty=function(n){if(null==n)return true;var t=n.length;return ue(t)&&(To(n)||Qe(n)||Ke(n)||h(n)&&Ze(n.splice))?!t:!Fo(n).length},Wt.isEqual=function(n,t,r,e){return r=typeof r=="function"&&Wr(r,e,3),!r&&oe(n)&&oe(t)?n===t:(e=r?r(n,t):b,typeof e=="undefined"?_r(n,t,r):!!e)},Wt.isError=Ye,Wt.isFinite=So,Wt.isFunction=Ze,Wt.isMatch=function(n,t,r,e){var u=Fo(t),o=u.length;if(r=typeof r=="function"&&Wr(r,e,3),!r&&1==o){var i=u[0];if(e=t[i],oe(e))return null!=n&&e===n[i]&&Nu.call(n,i)
}for(var i=mu(o),a=mu(o);o--;)e=i[o]=t[u[o]],a[o]=oe(e);return mr(n,u,i,a,r)},Wt.isNaN=function(n){return Xe(n)&&n!=+n},Wt.isNative=Je,Wt.isNull=function(n){return null===n},Wt.isNumber=Xe,Wt.isObject=Ge,Wt.isPlainObject=Wo,Wt.isRegExp=He,Wt.isString=Qe,Wt.isTypedArray=nu,Wt.isUndefined=function(n){return typeof n=="undefined"},Wt.kebabCase=$o,Wt.last=function(n){var t=n?n.length:0;return t?n[t-1]:b},Wt.lastIndexOf=function(n,t,r){var e=n?n.length:0;if(!e)return-1;var u=e;if(typeof r=="number")u=(0>r?eo(e+r,0):uo(r||0,e-1))+1;
else if(r)return u=Tr(n,t,true)-1,n=n[u],(t===t?t===n:n!==n)?u:-1;if(t!==t)return p(n,u,true);for(;u--;)if(n[u]===t)return u;return-1},Wt.max=Ro,Wt.min=Io,Wt.noConflict=function(){return g._=Lu,this},Wt.noop=yu,Wt.now=Co,Wt.pad=function(n,t,r){n=e(n),t=+t;var u=n.length;return u<t&&to(t)?(u=(t-u)/2,t=qu(u),u=Du(u),r=Pr("",u,r),r.slice(0,t)+n+r):n},Wt.padLeft=function(n,t,r){return(n=e(n))&&Pr(n,t,r)+n},Wt.padRight=function(n,t,r){return(n=e(n))&&n+Pr(n,t,r)},Wt.parseInt=au,Wt.random=function(n,t,r){r&&ee(n,t,r)&&(t=r=null);
var e=null==n,u=null==t;return null==r&&(u&&typeof n=="boolean"?(r=n,n=1):typeof t=="boolean"&&(r=t,u=true)),e&&u&&(t=1,u=false),n=+n||0,u?(t=n,n=0):t=+t||0,r||n%1||t%1?(r=fo(),uo(n+r*(t-n+parseFloat("1e-"+((r+"").length-1))),t)):jr(n,t)},Wt.reduce=Ce,Wt.reduceRight=Te,Wt.repeat=fu,Wt.result=function(n,t,r){return t=null==n?b:n[t],typeof t=="undefined"&&(t=r),Ze(t)?t.call(n):t},Wt.runInContext=m,Wt.size=function(n){var t=n?n.length:0;return ue(t)?t:Fo(n).length},Wt.snakeCase=Bo,Wt.some=Ne,Wt.sortedIndex=function(n,t,r,e){var u=Xr(r);
return u===tr&&null==r?Tr(n,t):Sr(n,t,u(r,e,1))},Wt.sortedLastIndex=function(n,t,r,e){var u=Xr(r);return u===tr&&null==r?Tr(n,t,true):Sr(n,t,u(r,e,1),true)},Wt.startsWith=function(n,t,r){return n=e(n),r=null==r?0:uo(0>r?0:+r||0,n.length),n.lastIndexOf(t,r)==r},Wt.template=function(n,t,r){var u=Wt.templateSettings;r&&ee(n,t,r)&&(t=r=null),n=e(n),t=Ht(Ht({},r||t),u,Xt),r=Ht(Ht({},t.imports),u.imports,Xt);var o,i,a=Fo(r),f=Or(r,a),l=0;r=t.interpolate||xt;var c="__p+='";r=Eu((t.escape||xt).source+"|"+r.source+"|"+(r===vt?dt:xt).source+"|"+(t.evaluate||xt).source+"|$","g");
var p="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,u,a,f){return e||(e=u),c+=n.slice(l,f).replace(Et,s),r&&(o=true,c+="'+__e("+r+")+'"),a&&(i=true,c+="';"+a+";\n__p+='"),e&&(c+="'+((__t=("+e+"))==null?'':__t)+'"),l=f+t.length,t}),c+="';",(t=t.variable)||(c="with(obj){"+c+"}"),c=(i?c.replace(it,""):c).replace(at,"$1").replace(ft,"$1;"),c="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(o?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+c+"return __p}",t=su(function(){return xu(a,p+"return "+c).apply(b,f)
}),t.source=c,Ye(t))throw t;return t},Wt.trim=lu,Wt.trimLeft=function(n,t,r){var u=n;return(n=e(n))?n.slice((r?ee(u,t,r):null==t)?d(n):o(n,e(t))):n},Wt.trimRight=function(n,t,r){var u=n;return(n=e(n))?(r?ee(u,t,r):null==t)?n.slice(0,y(n)+1):n.slice(0,i(n,e(t))+1):n},Wt.trunc=function(n,t,r){r&&ee(n,t,r)&&(t=null);var u=T;if(r=S,null!=t)if(Ge(t)){var o="separator"in t?t.separator:o,u="length"in t?+t.length||0:u;r="omission"in t?e(t.omission):r}else u=+t||0;if(n=e(n),u>=n.length)return n;if(u-=r.length,1>u)return r;
if(t=n.slice(0,u),null==o)return t+r;if(He(o)){if(n.slice(u).search(o)){var i,a=n.slice(0,u);for(o.global||(o=Eu(o.source,(yt.exec(o)||"")+"g")),o.lastIndex=0;n=o.exec(a);)i=n.index;t=t.slice(0,null==i?u:i)}}else n.indexOf(o,u)!=u&&(o=t.lastIndexOf(o),-1<o&&(t=t.slice(0,o)));return t+r},Wt.unescape=function(n){return(n=e(n))&&st.test(n)?n.replace(lt,_):n},Wt.uniqueId=function(n){var t=++Fu;return e(n)+t},Wt.words=cu,Wt.all=je,Wt.any=Ne,Wt.contains=Ae,Wt.detect=Ee,Wt.foldl=Ce,Wt.foldr=Te,Wt.head=ve,Wt.include=Ae,Wt.inject=Ce,du(Wt,function(){var n={};
return gr(Wt,function(t,r){Wt.prototype[r]||(n[r]=t)}),n}(),false),Wt.sample=Se,Wt.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(t){return Se(t,n)}):Se(this.value())},Wt.VERSION=w,Mt("bind bindKey curry curryRight partial partialRight".split(" "),function(n){Wt[n].placeholder=Wt}),Mt(["filter","map","takeWhile"],function(n,t){var r=t==F;Ft.prototype[n]=function(n,e){var u=this.clone(),o=u.filtered,i=u.iteratees||(u.iteratees=[]);return u.filtered=o||r||t==L&&0>u.dir,i.push({iteratee:Xr(n,e,3),type:t}),u
}}),Mt(["drop","take"],function(n,t){var r=n+"Count",e=n+"While";Ft.prototype[n]=function(e){e=null==e?1:eo(+e||0,0);var u=this.clone();if(u.filtered){var o=u[r];u[r]=t?uo(o,e):o+e}else(u.views||(u.views=[])).push({size:e,type:n+(0>u.dir?"Right":"")});return u},Ft.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()},Ft.prototype[n+"RightWhile"]=function(n,t){return this.reverse()[e](n,t).reverse()}}),Mt(["first","last"],function(n,t){var r="take"+(t?"Right":"");Ft.prototype[n]=function(){return this[r](1).value()[0]
}}),Mt(["initial","rest"],function(n,t){var r="drop"+(t?"":"Right");Ft.prototype[n]=function(){return this[r](1)}}),Mt(["pluck","where"],function(n,t){var r=t?"filter":"map",e=t?vu:_u;Ft.prototype[n]=function(n){return this[r](e(n))}}),Ft.prototype.dropWhile=function(n,t){var r,e,u=0>this.dir;return n=Xr(n,t,3),this.filter(function(t,o,i){return r=r&&(u?o<e:o>e),e=o,r||(r=!n(t,o,i))})},Ft.prototype.reject=function(n,t){return n=Xr(n,t,3),this.filter(function(t,r,e){return!n(t,r,e)})},Ft.prototype.slice=function(n,t){n=null==n?0:+n||0;
var r=0>n?this.takeRight(-n):this.drop(n);return typeof t!="undefined"&&(t=+t||0,r=0>t?r.dropRight(-t):r.take(t-n)),r},gr(Ft.prototype,function(n,t){var r=Wt[t],e=/^(?:first|last)$/.test(t);Wt.prototype[t]=function(){function t(n){return n=[n],Ku.apply(n,o),r.apply(Wt,n)}var u=this.__wrapped__,o=arguments,i=this.__chain__,a=!!this.__actions__.length,f=u instanceof Ft,l=f&&!a;return e&&!i?l?n.call(u):r.call(Wt,this.value()):f||To(u)?(u=n.apply(l?u:new Ft(this),o),e||!a&&!u.actions||(u.actions||(u.actions=[])).push({func:xe,args:[t],thisArg:Wt}),new Nt(u,i)):this.thru(t)
}}),Mt("concat join pop push shift sort splice unshift".split(" "),function(n){var t=Ou[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:join|pop|shift)$/.test(n);Wt.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),Ft.prototype.clone=function(){var n=this.actions,t=this.iteratees,r=this.views,e=new Ft(this.wrapped);return e.actions=n?zt(n):null,e.dir=this.dir,e.dropCount=this.dropCount,e.filtered=this.filtered,e.iteratees=t?zt(t):null,e.takeCount=this.takeCount,e.views=r?zt(r):null,e
},Ft.prototype.reverse=function(){if(this.filtered){var n=new Ft(this);n.dir=-1,n.filtered=true}else n=this.clone(),n.dir*=-1;return n},Ft.prototype.value=function(){var n=this.wrapped.value();if(!To(n))return Cr(n,this.actions);var t,r=this.dir,e=0>r;t=n.length;for(var u=this.views,o=0,i=-1,a=u?u.length:0;++i<a;){var f=u[i],l=f.size;switch(f.type){case"drop":o+=l;break;case"dropRight":t-=l;break;case"take":t=uo(t,o+l);break;case"takeRight":o=eo(o,t-l)}}t={start:o,end:t},i=t.start,a=t.end,t=a-i,u=this.dropCount,o=uo(t,this.takeCount-u),e=e?a:i-1,a=(i=this.iteratees)?i.length:0,f=0,l=[];
n:for(;t--&&f<o;){for(var e=e+r,c=-1,s=n[e];++c<a;){var p=i[c],h=p.iteratee(s,e,n),p=p.type;if(p==U)s=h;else if(!h){if(p==F)continue n;break n}}u?u--:l[f++]=s}return l},Wt.prototype.chain=function(){return we(this)},Wt.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Ft?(this.__actions__.length&&(n=new Ft(this)),new Nt(n.reverse())):this.thru(function(n){return n.reverse()})},Wt.prototype.toString=function(){return this.value()+""},Wt.prototype.toJSON=Wt.prototype.valueOf=Wt.prototype.value=function(){return Cr(this.__wrapped__,this.__actions__)
},Wt.prototype.collect=Wt.prototype.map,Wt.prototype.head=Wt.prototype.first,Wt.prototype.select=Wt.prototype.filter,Wt.prototype.tail=Wt.prototype.rest,Wt}var b,w="3.0.1",x=1,A=2,j=4,k=8,E=16,R=32,I=64,O=128,C=256,T=30,S="...",W=150,N=16,F=0,U=1,L=2,$="Expected a function",B="__lodash_placeholder__",z="[object Arguments]",D="[object Array]",M="[object Boolean]",q="[object Date]",P="[object Error]",K="[object Function]",V="[object Number]",Y="[object Object]",Z="[object RegExp]",G="[object String]",J="[object ArrayBuffer]",X="[object Float32Array]",H="[object Float64Array]",Q="[object Int8Array]",nt="[object Int16Array]",tt="[object Int32Array]",rt="[object Uint8Array]",et="[object Uint8ClampedArray]",ut="[object Uint16Array]",ot="[object Uint32Array]",it=/\b__p\+='';/g,at=/\b(__p\+=)''\+/g,ft=/(__e\(.*?\)|\b__t\))\+'';/g,lt=/&(?:amp|lt|gt|quot|#39|#96);/g,ct=/[&<>"'`]/g,st=RegExp(lt.source),pt=RegExp(ct.source),ht=/<%-([\s\S]+?)%>/g,gt=/<%([\s\S]+?)%>/g,vt=/<%=([\s\S]+?)%>/g,dt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,yt=/\w*$/,_t=/^\s*function[ \n\r\t]+\w/,mt=/^0[xX]/,bt=/^\[object .+?Constructor\]$/,wt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,xt=/($^)/,At=/[.*+?^${}()|[\]\/\\]/g,jt=RegExp(At.source),kt=/\bthis\b/,Et=/['\n\r\u2028\u2029\\]/g,Rt=RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]{2,}(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+","g"),It=" \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",Ot="Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout document isFinite parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap window WinRTError".split(" "),Ct={};
Ct[X]=Ct[H]=Ct[Q]=Ct[nt]=Ct[tt]=Ct[rt]=Ct[et]=Ct[ut]=Ct[ot]=true,Ct[z]=Ct[D]=Ct[J]=Ct[M]=Ct[q]=Ct[P]=Ct[K]=Ct["[object Map]"]=Ct[V]=Ct[Y]=Ct[Z]=Ct["[object Set]"]=Ct[G]=Ct["[object WeakMap]"]=false;var Tt={};Tt[z]=Tt[D]=Tt[J]=Tt[M]=Tt[q]=Tt[X]=Tt[H]=Tt[Q]=Tt[nt]=Tt[tt]=Tt[V]=Tt[Y]=Tt[Z]=Tt[G]=Tt[rt]=Tt[et]=Tt[ut]=Tt[ot]=true,Tt[P]=Tt[K]=Tt["[object Map]"]=Tt["[object Set]"]=Tt["[object WeakMap]"]=false;var St={leading:false,maxWait:0,trailing:false},Wt={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Nt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Ft={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Ut={"function":true,object:true},Lt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},$t=Ut[typeof window]&&window!==(this&&this.window)?window:this,Bt=Ut[typeof exports]&&exports&&!exports.nodeType&&exports,Ut=Ut[typeof module]&&module&&!module.nodeType&&module,zt=Bt&&Ut&&typeof global=="object"&&global;
!zt||zt.global!==zt&&zt.window!==zt&&zt.self!==zt||($t=zt);var zt=Ut&&Ut.exports===Bt&&Bt,Dt=m();typeof define=="function"&&typeof define.amd=="object"&&define.amd?($t._=Dt, define(function(){return Dt})):Bt&&Ut?zt?(Ut.exports=Dt)._=Dt:Bt._=Dt:$t._=Dt}).call(this);
/*
Mithril v0.1.29
http://github.com/lhorie/mithril.js
(c) Leo Horie
License: MIT
*/

var m=function a(b,c){function d(a){C=a.document,D=a.location,F=a.cancelAnimationFrame||a.clearTimeout,E=a.requestAnimationFrame||a.setTimeout}function e(){var a,b=[].slice.call(arguments),c=!(null==b[1]||K.call(b[1])!==G||"tag"in b[1]||"subtree"in b[1]),d=c?b[1]:{},e="class"in d?"class":"className",f={tag:"div",attrs:{}},g=[];if(K.call(b[0])!=I)throw new Error("selector in m(selector, attrs, children) should be a string");for(;a=L.exec(b[0]);)if(""===a[1]&&a[2])f.tag=a[2];else if("#"===a[1])f.attrs.id=a[2];else if("."===a[1])g.push(a[2]);else if("["===a[3][0]){var h=M.exec(a[3]);f.attrs[h[1]]=h[3]||(h[2]?"":!0)}g.length>0&&(f.attrs[e]=g.join(" "));var i=c?b[2]:b[1];f.children=K.call(i)===H?i:b.slice(c?2:1);for(var j in d)j===e?""!==d[j]&&(f.attrs[j]=(f.attrs[j]||"")+" "+d[j]):f.attrs[j]=d[j];return f}function f(a,b,d,e,j,l,m,n,o,p,q){if((null==j||null==j.toString())&&(j=""),"retain"===j.subtree)return l;var r=K.call(l),s=K.call(j);if(null==l||r!==s){if(null!=l)if(d&&d.nodes){var t=n-e,u=t+(s===H?j:l.nodes).length;i(d.nodes.slice(t,u),d.slice(t,u))}else l.nodes&&i(l.nodes,l);l=new j.constructor,l.tag&&(l={}),l.nodes=[]}if(s===H){for(var v=0,w=j.length;w>v;v++)K.call(j[v])===H&&(j=j.concat.apply([],j),v--);for(var x=[],y=l.length===j.length,z=0,A=1,B=2,D=3,E={},F=[],L=!1,v=0;v<l.length;v++)l[v]&&l[v].attrs&&null!=l[v].attrs.key&&(L=!0,E[l[v].attrs.key]={action:A,index:v});if(L){j.indexOf(null)>-1&&(j=j.filter(function(a){return null!=a}));var M=!1;if(j.length!=l.length)M=!0;else for(var O,P,v=0;O=l[v],P=j[v];v++)if(O.attrs&&P.attrs&&O.attrs.key!=P.attrs.key){M=!0;break}if(M){for(var v=0,w=j.length;w>v;v++)if(j[v]&&j[v].attrs)if(null!=j[v].attrs.key){var Q=j[v].attrs.key;E[Q]=E[Q]?{action:D,index:v,from:E[Q].index,element:l.nodes[E[Q].index]||C.createElement("div")}:{action:B,index:v}}else F.push({index:v,element:a.childNodes[v]||C.createElement("div")});var R=[];for(var S in E)R.push(E[S]);for(var T,U=R.sort(g),V=new Array(l.length),v=0;T=U[v];v++){if(T.action===A&&(i(l[T.index].nodes,l[T.index]),V.splice(T.index,1)),T.action===B){var W=C.createElement("div");W.key=j[T.index].attrs.key,a.insertBefore(W,a.childNodes[T.index]||null),V.splice(T.index,0,{attrs:{key:j[T.index].attrs.key},nodes:[W]})}T.action===D&&(a.childNodes[T.index]!==T.element&&null!==T.element&&a.insertBefore(T.element,a.childNodes[T.index]||null),V[T.index]=l[T.from])}for(var v=0,w=F.length;w>v;v++){var T=F[v];a.insertBefore(T.element,a.childNodes[T.index]||null),V[T.index]=l[T.index]}l=V,l.nodes=new Array(a.childNodes.length);for(var X,v=0;X=a.childNodes[v];v++)l.nodes[v]=X}}for(var v=0,Y=0,w=j.length;w>v;v++){var Z=f(a,b,l,n,j[v],l[Y],m,n+z||z,o,p,q);Z!==c&&(Z.nodes.intact||(y=!1),z+=Z.$trusted?(Z.match(/<[^\/]|\>\s*[^<]/g)||[]).length:K.call(Z)===H?Z.length:1,l[Y++]=Z)}if(!y){for(var v=0,w=j.length;w>v;v++)null!=l[v]&&x.push.apply(x,l[v].nodes);for(var $,v=0;$=l.nodes[v];v++)null!=$.parentNode&&x.indexOf($)<0&&i([$],[l[v]]);j.length<l.length&&(l.length=j.length),l.nodes=x}}else if(null!=j&&s===G){j.attrs||(j.attrs={}),l.attrs||(l.attrs={});var _=Object.keys(j.attrs),ab=_.length>("key"in j.attrs?1:0);if((j.tag!=l.tag||_.join()!=Object.keys(l.attrs).join()||j.attrs.id!=l.attrs.id)&&(l.nodes.length&&i(l.nodes),l.configContext&&typeof l.configContext.onunload===J&&l.configContext.onunload()),K.call(j.tag)!=I)return;var $,bb=0===l.nodes.length;if(j.attrs.xmlns?p=j.attrs.xmlns:"svg"===j.tag?p="http://www.w3.org/2000/svg":"math"===j.tag&&(p="http://www.w3.org/1998/Math/MathML"),bb?($=j.attrs.is?p===c?C.createElement(j.tag,j.attrs.is):C.createElementNS(p,j.tag,j.attrs.is):p===c?C.createElement(j.tag):C.createElementNS(p,j.tag),l={tag:j.tag,attrs:ab?h($,j.tag,j.attrs,{},p):j.attrs,children:null!=j.children&&j.children.length>0?f($,j.tag,c,c,j.children,l.children,!0,0,j.attrs.contenteditable?$:o,p,q):j.children,nodes:[$]},l.children&&!l.children.nodes&&(l.children.nodes=[]),"select"===j.tag&&j.attrs.value&&h($,j.tag,{value:j.attrs.value},{},p),a.insertBefore($,a.childNodes[n]||null)):($=l.nodes[0],ab&&h($,j.tag,j.attrs,l.attrs,p),l.children=f($,j.tag,c,c,j.children,l.children,!1,0,j.attrs.contenteditable?$:o,p,q),l.nodes.intact=!0,m===!0&&null!=$&&a.insertBefore($,a.childNodes[n]||null)),typeof j.attrs.config===J){var cb=l.configContext=l.configContext||{},db=function(a,b){return function(){return a.attrs.config.apply(a,b)}};q.push(db(j,[$,!bb,cb,l]))}}else if(typeof s!=J){var x;0===l.nodes.length?(j.$trusted?x=k(a,n,j):(x=[C.createTextNode(j)],a.nodeName.match(N)||a.insertBefore(x[0],a.childNodes[n]||null)),l="string number boolean".indexOf(typeof j)>-1?new j.constructor(j):j,l.nodes=x):l.valueOf()!==j.valueOf()||m===!0?(x=l.nodes,o&&o===C.activeElement||(j.$trusted?(i(x,l),x=k(a,n,j)):"textarea"===b?a.value=j:o?o.innerHTML=j:((1===x[0].nodeType||x.length>1)&&(i(l.nodes,l),x=[C.createTextNode(j)]),a.insertBefore(x[0],a.childNodes[n]||null),x[0].nodeValue=j)),l=new j.constructor(j),l.nodes=x):l.nodes.intact=!0}return l}function g(a,b){return a.action-b.action||a.index-b.index}function h(a,b,c,d,e){for(var f in c){var g=c[f],h=d[f];if(f in d&&h===g)"value"===f&&"input"===b&&a.value!=g&&(a.value=g);else{d[f]=g;try{if("config"===f||"key"==f)continue;if(typeof g===J&&0===f.indexOf("on"))a[f]=l(g,a);else if("style"===f&&null!=g&&K.call(g)===G){for(var i in g)(null==h||h[i]!==g[i])&&(a.style[i]=g[i]);for(var i in h)i in g||(a.style[i]="")}else null!=e?"href"===f?a.setAttributeNS("http://www.w3.org/1999/xlink","href",g):"className"===f?a.setAttribute("class",g):a.setAttribute(f,g):f in a&&"list"!==f&&"style"!==f&&"form"!==f&&"type"!==f?("input"!==b||a[f]!==g)&&(a[f]=g):a.setAttribute(f,g)}catch(j){if(j.message.indexOf("Invalid argument")<0)throw j}}}return d}function i(a,b){for(var c=a.length-1;c>-1;c--)if(a[c]&&a[c].parentNode){try{a[c].parentNode.removeChild(a[c])}catch(d){}b=[].concat(b),b[c]&&j(b[c])}0!=a.length&&(a.length=0)}function j(a){if(a.configContext&&typeof a.configContext.onunload===J&&a.configContext.onunload(),a.children)if(K.call(a.children)===H)for(var b,c=0;b=a.children[c];c++)j(b);else a.children.tag&&j(a.children)}function k(a,b,c){var d=a.childNodes[b];if(d){var e=1!=d.nodeType,f=C.createElement("span");e?(a.insertBefore(f,d||null),f.insertAdjacentHTML("beforebegin",c),a.removeChild(f)):d.insertAdjacentHTML("beforebegin",c)}else a.insertAdjacentHTML("beforeend",c);for(var g=[];a.childNodes[b]!==d;)g.push(a.childNodes[b]),b++;return g}function l(a,b){return function(c){c=c||event,e.redraw.strategy("diff"),e.startComputation();try{return a.call(b,c)}finally{ab()}}}function m(a){var b=Q.indexOf(a);return 0>b?Q.push(a)-1:b}function n(a){var b=function(){return arguments.length&&(a=arguments[0]),a};return b.toJSON=function(){return a},b}function o(){for(var a,b="all"===e.redraw.strategy(),c=0;a=T[c];c++)V[c]&&e.render(a,(U[c].view||$)(V[c]),b);Y&&(Y(),Y=null),W=null,X=new Date,e.redraw.strategy("diff")}function p(a){return a.slice(db[e.route.mode].length)}function q(a,b,c){bb={};var d=c.indexOf("?");-1!==d&&(bb=u(c.substr(d+1,c.length)),c=c.substr(0,d));for(var f in b){if(f===c)return e.module(a,b[f]),!0;var g=new RegExp("^"+f.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(g.test(c))return c.replace(g,function(){for(var c=f.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2),g=0,h=c.length;h>g;g++)bb[c[g].replace(/:|\./g,"")]=decodeURIComponent(d[g]);e.module(a,b[f])}),!0}}function r(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!==a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;var b=a.currentTarget||this,c="pathname"===e.route.mode&&b.search?u(b.search.slice(1)):{};e.route(b[e.route.mode].slice(db[e.route.mode].length),c)}}function s(){"hash"!=e.route.mode&&D.hash?D.hash=D.hash:b.scrollTo(0,0)}function t(a,b){var c=[];for(var d in a){var e=b?b+"["+d+"]":d,f=a[d],g=K.call(f),h=null!=f&&g===G?t(f,e):g===H?f.map(function(a){return encodeURIComponent(e)+"="+encodeURIComponent(a)}).join("&"):encodeURIComponent(e)+"="+encodeURIComponent(f);c.push(h)}return c.join("&")}function u(a){for(var b=a.split("&"),c={},d=0,e=b.length;e>d;d++){var f=b[d].split("=");c[decodeURIComponent(f[0])]=f[1]?decodeURIComponent(f[1]):""}return c}function v(a){var b=m(a);i(a.childNodes,R[b]),R[b]=c}function w(a){var b=e.prop();return a.then(b),b.then=function(b,c){return w(a.then(b,c))},b}function x(a,b){function c(a){l=a||j,n.map(function(a){l===i&&a.resolve(m)||a.reject(m)})}function d(a,b,c,d){if((null!=m&&K.call(m)===G||typeof m===J)&&typeof a===J)try{var f=0;a.call(m,function(a){f++||(m=a,b())},function(a){f++||(m=a,c())})}catch(g){e.deferred.onerror(g),m=g,c()}else d()}function f(){var j;try{j=m&&m.then}catch(n){return e.deferred.onerror(n),m=n,l=h,f()}d(j,function(){l=g,f()},function(){l=h,f()},function(){try{l===g&&typeof a===J?m=a(m):l===h&&"function"==typeof b&&(m=b(m),l=g)}catch(f){return e.deferred.onerror(f),m=f,c()}m===k?(m=TypeError(),c()):d(j,function(){c(i)},c,function(){c(l===g&&i)})})}var g=1,h=2,i=3,j=4,k=this,l=0,m=0,n=[];k.promise={},k.resolve=function(a){return l||(m=a,l=g,f()),this},k.reject=function(a){return l||(m=a,l=h,f()),this},k.promise.then=function(a,b){var c=new x(a,b);return l===i?c.resolve(m):l===j?c.reject(m):n.push(c),c.promise}}function y(a){return a}function z(a){if(!a.dataType||"jsonp"!==a.dataType.toLowerCase()){var d=new b.XMLHttpRequest;if(d.open(a.method,a.url,!0,a.user,a.password),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?a.onload({type:"load",target:d}):a.onerror({type:"error",target:d}))},a.serialize===JSON.stringify&&a.data&&"GET"!==a.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.deserialize===JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),typeof a.config===J){var e=a.config(d,a);null!=e&&(d=e)}var f="GET"!==a.method&&a.data?a.data:"";if(f&&K.call(f)!=I&&f.constructor!=b.FormData)throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";return d.send(f),d}var g="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),h=C.createElement("script");b[g]=function(d){h.parentNode.removeChild(h),a.onload({type:"load",target:{responseText:d}}),b[g]=c},h.onerror=function(){return h.parentNode.removeChild(h),a.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),b[g]=c,!1},h.onload=function(){return!1},h.src=a.url+(a.url.indexOf("?")>0?"&":"?")+(a.callbackKey?a.callbackKey:"callback")+"="+g+"&"+t(a.data||{}),C.body.appendChild(h)}function A(a,b,c){if("GET"===a.method&&"jsonp"!=a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=t(b);a.url=a.url+(e?d+e:"")}else a.data=c(b);return a}function B(a,b){var c=a.match(/:[a-z]\w+/gi);if(c&&b)for(var d=0;d<c.length;d++){var e=c[d].slice(1);a=a.replace(c[d],b[e]),delete b[e]}return a}var C,D,E,F,G="[object Object]",H="[object Array]",I="[object String]",J="function",K={}.toString,L=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,M=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,N=/^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;d(b);var O,P={appendChild:function(a){O===c&&(O=C.createElement("html")),C.documentElement&&C.documentElement!==a?C.replaceChild(a,C.documentElement):C.appendChild(a),this.childNodes=C.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},Q=[],R={};e.render=function(a,b,d){var e=[];if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var g=m(a),h=a===C,j=h||a===C.documentElement?P:a;h&&"html"!=b.tag&&(b={tag:"html",attrs:{},children:b}),R[g]===c&&i(j.childNodes),d===!0&&v(a),R[g]=f(j,null,c,c,b,R[g],!1,0,null,c,e);for(var k=0,l=e.length;l>k;k++)e[k]()},e.trust=function(a){return a=new String(a),a.$trusted=!0,a},e.prop=function(a){return(null!=a&&K.call(a)===G||typeof a===J)&&typeof a.then===J?w(a):n(a)};var S,T=[],U=[],V=[],W=null,X=0,Y=null,Z=16;e.module=function(a,b){if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var c=T.indexOf(a);0>c&&(c=T.length);var d=!1;if(V[c]&&typeof V[c].onunload===J){var f={preventDefault:function(){d=!0}};V[c].onunload(f)}if(!d){e.redraw.strategy("all"),e.startComputation(),T[c]=a;var g=S=b=b||{},h=new(b.controller||function(){});return g===S&&(V[c]=h,U[c]=b),ab(),V[c]}},e.redraw=function(a){W&&a!==!0?(new Date-X>Z||E===b.requestAnimationFrame)&&(W>0&&F(W),W=E(o,Z)):(o(),W=E(function(){W=null},Z))},e.redraw.strategy=e.prop();var $=function(){return""},_=0;e.startComputation=function(){_++},e.endComputation=function(){_=Math.max(_-1,0),0===_&&e.redraw()};var ab=function(){"none"==e.redraw.strategy()?(_--,e.redraw.strategy("diff")):e.endComputation()};e.withAttr=function(a,b){return function(c){c=c||event;var d=c.currentTarget||this;b(a in d?d[a]:d.getAttribute(a))}};var bb,cb,db={pathname:"",hash:"#",search:"?"},eb=function(){};return e.route=function(){if(0===arguments.length)return cb;if(3===arguments.length&&K.call(arguments[1])===I){var a=arguments[0],c=arguments[1],d=arguments[2];eb=function(b){var f=cb=p(b);q(a,d,f)||e.route(c,!0)};var f="hash"===e.route.mode?"onhashchange":"onpopstate";b[f]=function(){var a=D[e.route.mode];"pathname"===e.route.mode&&(a+=D.search),cb!=p(a)&&eb(a)},Y=s,b[f]()}else if(arguments[0].addEventListener){{var g=arguments[0];arguments[1],arguments[2]}g.href=("pathname"!==e.route.mode?D.pathname:"")+db[e.route.mode]+this.attrs.href,g.removeEventListener("click",r),g.addEventListener("click",r)}else if(K.call(arguments[0])===I){cb=arguments[0];var h=arguments[1]||{},i=cb.indexOf("?"),j=i>-1?u(cb.slice(i+1)):{};for(var k in h)j[k]=h[k];var l=t(j),m=i>-1?cb.slice(0,i):cb;l&&(cb=m+(-1===m.indexOf("?")?"?":"&")+l);var n=(3===arguments.length?arguments[2]:arguments[1])===!0||cb===arguments[0];b.history.pushState?(Y=function(){b.history[n?"replaceState":"pushState"](null,C.title,db[e.route.mode]+cb),s()},eb(db[e.route.mode]+cb)):D[e.route.mode]=cb}},e.route.param=function(a){if(!bb)throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");return bb[a]},e.route.mode="search",e.deferred=function(){var a=new x;return a.promise=w(a.promise),a},e.deferred.onerror=function(a){if("[object Error]"===K.call(a)&&!a.constructor.toString().match(/ Error/))throw a},e.sync=function(a){function b(a,b){return function(e){return g[a]=e,b||(c="reject"),0===--f&&(d.promise(g),d[c](g)),e}}var c="resolve",d=e.deferred(),f=a.length,g=new Array(f);if(a.length>0)for(var h=0;h<a.length;h++)a[h].then(b(h,!0),b(h,!1));else d.resolve([]);return d.promise},e.request=function(a){a.background!==!0&&e.startComputation();var b=e.deferred(),c=a.dataType&&"jsonp"===a.dataType.toLowerCase(),d=a.serialize=c?y:a.serialize||JSON.stringify,f=a.deserialize=c?y:a.deserialize||JSON.parse,g=a.extract||function(a){return 0===a.responseText.length&&f===JSON.parse?null:a.responseText};return a.url=B(a.url,a.data),a=A(a,a.data,d),a.onload=a.onerror=function(c){try{c=c||event;var d=("load"===c.type?a.unwrapSuccess:a.unwrapError)||y,h=d(f(g(c.target,a)));if("load"===c.type)if(K.call(h)===H&&a.type)for(var i=0;i<h.length;i++)h[i]=new a.type(h[i]);else a.type&&(h=new a.type(h));b["load"===c.type?"resolve":"reject"](h)}catch(c){e.deferred.onerror(c),b.reject(c)}a.background!==!0&&e.endComputation()},z(a),b.promise(a.initialValue),b.promise},e.deps=function(a){return d(b=a||b),b},e.deps.factory=a,e}("undefined"!=typeof window?window:{});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=m:"function"==typeof define&&define.amd&&define(function(){return m});
var define;

define = function(type, cb) {
  return Object.defineProperties(type.prototype, cb());
};

define(Array, function() {
  return {
    last: {
      get: function() {
        return this[this.length - 1];
      }
    },
    first: {
      get: function() {
        return this[0];
      }
    }
  };
});

Number.MAX_INT32 = 0x7fffffff;

_.mixin({
  parseID: function(id) {
    var time;
    time = Serial.parser.Date(id.slice(2));
    return [id.slice(0, 2), time];
  }
});
define(String, function() {
  var anchor, anchor_preview, br, id_num, link, link_regexp, link_regexp_g, nowrap, player, random, random_preview, space, unanchor, unbr, unhtml, unrandom, uri_to_link;
  player = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/(\/\*)(.*?)(\*\/|$)/g, '<em>$1<span class="player">$2</span>$3</em>');
  };
  unanchor = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/<mw (\w+),(\d+),([^>]+)>/g, function(key, a, turn, id) {
      return ">>" + id;
    });
  };
  anchor = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/<mw (\w+),(\d+),([^>]+)>/g, function(key, a, turn, id) {
      return "<span anchor=\"" + a + "," + turn + "," + id + "\" class=\"mark\">&gt;&gt;" + id + "</span>";
    });
  };
  anchor_preview = function(log) {
    return log;
  };
  unrandom = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/<rand ([^>]+),([^>]+)>/g, function(key, val, cmd) {
      return cmd;
    });
  };
  random = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/<rand ([^>]+),([^>]+)>/g, function(key, val, cmd) {
      return "<span random=\"" + cmd + "," + val + "\" class=\"mark\">" + val + "</span>";
    });
  };
  random_preview = function(log) {
    return log.replace(/\[\[([^\[]+)\]\]/g, function(key, val) {
      return "<span random=\"" + val + ",？\" class=\"mark\">" + val + "</span>";
    });
  };
  link_regexp = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/;
  link_regexp_g = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/g;
  id_num = 0;
  uri_to_link = _.memoize(function(uri) {
    var host, path, protocol, _ref;
    id_num++;
    _ref = uri.match(link_regexp), uri = _ref[0], protocol = _ref[1], host = _ref[2], path = _ref[3];
    return "<span external=\"link_" + id_num + "," + uri + "," + protocol + "," + host + "," + path + "\" class=\"emboss\">LINK - " + protocol + "</span>";
  });
  link = function(log) {
    var text, uri, uris, _i, _len;
    if (!log) {
      return log;
    }
    text = log.replace(/\s|<br>/g, ' ').replace(/(<([^>]+)>)/ig, "");
    uris = text.match(link_regexp_g);
    if (uris) {
      for (_i = 0, _len = uris.length; _i < _len; _i++) {
        uri = uris[_i];
        log = log.replace(uri, uri_to_link(uri));
      }
    }
    return log;
  };
  space = function(log) {
    if (!log) {
      return log;
    }
    return log.replace(/(^|\n|<br>)(\ *)/gm, function(full, s1, s2, offset) {
      var nbsps;
      s1 || (s1 = "");
      nbsps = s2.replace(/\ /g, '&nbsp;');
      return "" + s1 + nbsps;
    });
  };
  br = function(log) {
    return log.replace(/\n/gm, function(br) {
      return "<br>";
    });
  };
  unbr = function(log) {
    return log.replace(/<br>/gm, function(br) {
      return "\n";
    });
  };
  nowrap = function(log) {
    return log.replace(/<br>|\n/gm, function(br) {
      return " ";
    });
  };
  unhtml = function(log) {
    return log.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2f;");
  };
  return {
    deco_preview: {
      get: function() {
        return br(space(player(anchor_preview(link(random_preview(unhtml(this)))))));
      }
    },
    deco_text: {
      get: function() {
        return space(player(anchor(link(random(this)))));
      }
    },
    line_text: {
      get: function() {
        return nowrap(player(anchor(link(random(this)))));
      }
    },
    undecolate: {
      get: function() {
        return unanchor(unrandom(unbr(this)));
      }
    },
    sjis_length: {
      get: function() {
        var other;
        other = this.match(/[^\x01-\xff]/g) || [];
        return this.length + other.length;
      }
    }
  };
});
var win;

win = (function() {
  var scroll_end, set_scroll;
  set_scroll = function(win) {
    win.scrolling = true;
    win.left = window.pageXOffset || window.scrollX;
    return win.top = window.pageYOffset || window.scrollY;
  };
  scroll_end = function() {
    var chk, list, scan;
    chk = function() {
      var _ref, _ref1;
      return 3 === list.length && (list[0].left === (_ref = list[1].left) && _ref === list[2].left) && (list[0].top === (_ref1 = list[1].top) && _ref1 === list[2].top);
    };
    scan = function() {
      var val;
      if (3 <= list.length) {
        list.shift;
      }
      list.push(val = {});
      set_scroll(val);
      if (chk()) {
        win.scrolling = false;
        win.do_event_list(win.on.scroll_end);
        win["do"].resize();
      }
      return window.requestAnimationFrame(scan);
    };
    list = [];
    return scan();
  };
  return {
    do_event_list: function(list, e) {
      var cb, _i, _len, _results;
      if (!list.length) {
        return;
      }
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        cb = list[_i];
        _results.push(cb(e));
      }
      return _results;
    },
    "do": {
      resize: function(e) {
        var body_height, body_width, docBody, docElem;
        docElem = document.documentElement;
        docBody = document.body;
        win.height = Math.max(window.innerHeight, docElem.clientHeight);
        win.width = Math.max(window.innerWidth, docElem.clientWidth);
        win.horizon = win.height / 2;
        body_height = Math.max(docBody.clientHeight, docBody.scrollHeight, docElem.scrollHeight, docElem.clientHeight);
        body_width = Math.max(docBody.clientWidth, docBody.scrollWidth, docElem.scrollWidth, docElem.clientWidth);
        win.max = {
          top: body_height - win.height,
          left: body_width - win.width
        };
        if (win.height > win.width) {
          win.landscape = false;
          win.portlate = true;
        } else {
          win.landscape = true;
          win.portlate = false;
        }
        return win.do_event_list(win.on.resize, e);
      },
      scroll_end: _.debounce(scroll_end, DELAY.presto),
      scroll: function(e) {
        var docElem;
        docElem = document.documentElement;
        set_scroll(win);
        win.right = win.left + win.width;
        win.bottom = win.top + win.height;
        win.do_event_list(win.on.scroll, e);
        return win["do"].scroll_end();
      },
      orientation: function(e) {
        win.orientation = e;
        win.compass = e.webkitCompassHeading;
        return win.do_event_list(win.on.orientation, e);
      },
      motion: function(e) {
        win.accel = e.acceleration;
        win.gravity = e.accelerationIncludingGravity;
        win.rotate = e.rotationRate;
        return win.do_event_list(win.on.motion, e);
      },
      load: function(e) {
        win.do_event_list(win.on.load, e);
        win["do"].resize();
        return win["do"].scroll();
      }
    },
    on: {
      resize: [],
      scroll: [],
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
    width: 0,
    height: 0,
    accel: {},
    rotate: {},
    gravity: {},
    orientation: {},
    compass: 0,
    is_tap: false,
    max: {
      top: 0,
      left: 0
    }
  };
})();
var Cache,
  __slice = [].slice;

Cache = (function() {
  function Cache() {}

  Cache.rule = {};

  return Cache;

})();

Cache.Query = (function() {
  function Query(finder, match, desc, sort_by) {
    this.finder = finder;
    this.match = match;
    this.desc = desc;
    this.sort_by = sort_by;
  }

  Query.prototype._match = function(query, cb) {
    var is_object, match, req, target;
    if (!Object.keys(query).length) {
      return this;
    }
    match = this.match.concat();
    for (target in query) {
      req = query[target];
      is_object = "object" === typeof req;
      match.push(cb(target, req, (function() {
        switch (typeof req) {
          case "object":
            switch (false) {
              case req.test == null:
                return RegExp;
              case req.length == null:
                return Array;
              default:
                return Object;
            }
            break;
          case "number":
            return Number;
          case "string":
            return String;
        }
      })()));
    }
    return new Cache.Query(this.finder, match, this.desc, this.sort_by);
  };

  Query.prototype["in"] = function(query) {
    switch (typeof query) {
      case "object":
        return this._match(query, function(target, req, type) {
          switch (type) {
            case Array:
              return function(o) {
                var key, val, _i, _j, _len, _len1, _ref;
                for (_i = 0, _len = req.length; _i < _len; _i++) {
                  key = req[_i];
                  _ref = o[target];
                  for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    val = _ref[_j];
                    if (val === key) {
                      return true;
                    }
                  }
                }
                return false;
              };
            case RegExp:
              return function(o) {
                var val, _i, _len, _ref;
                _ref = o[target];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  val = _ref[_i];
                  if (req.test(val)) {
                    return true;
                  }
                }
                return false;
              };
            default:
              return function(o) {
                var val, _i, _len, _ref;
                _ref = o[target];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  val = _ref[_i];
                  if (val === req) {
                    return true;
                  }
                }
                return false;
              };
          }
        });
    }
  };

  Query.prototype.distinct = function(reduce, target) {
    var query;
    query = new Cache.Query(this.finder, this.match, this.desc, this.sort_by);
    query._distinct = {
      reduce: reduce,
      target: target
    };
    return query;
  };

  Query.prototype.where = function(query) {
    var match;
    if (!query) {
      return this;
    }
    switch (typeof query) {
      case "object":
        return this._match(query, function(target, req, type) {
          switch (type) {
            case Array:
              return function(o) {
                var key, _i, _len;
                for (_i = 0, _len = req.length; _i < _len; _i++) {
                  key = req[_i];
                  if (o[target] === key) {
                    return true;
                  }
                }
                return false;
              };
            case RegExp:
              return function(o) {
                return req.test(o[target]);
              };
            default:
              return function(o) {
                return o[target] === req;
              };
          }
        });
      case "function":
        match = this.match.concat(query);
        return new Cache.Query(this.finder, match, this.desc, this.sort_by);
    }
  };

  Query.prototype.search = function(text) {
    var item, list, regexp;
    if (!text) {
      return this;
    }
    list = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split(/\s+/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        if (!item.length) {
          continue;
        }
        _results.push("(" + item + ")");
      }
      return _results;
    })();
    if (!list.length) {
      return this;
    }
    regexp = new RegExp(list.join("|"), "ig");
    return this.where(function(o) {
      return regexp.test(o.search_words);
    });
  };

  Query.prototype.sort = function(desc, order) {
    var sort_by;
    if (order == null) {
      order = this.sort_by;
    }
    sort_by = (function() {
      switch (typeof order) {
        case "function":
          return order;
        case "string":
          return function(o) {
            return o[order];
          };
      }
    })();
    if (desc === this.desc && sort_by === this.sort_by) {
      return this;
    }
    return new Cache.Query(this.finder, this.match, desc, sort_by);
  };

  Query.prototype.reduce = function() {
    if (this._reduce == null) {
      this.finder.calculate(this);
    }
    return this._reduce;
  };

  Query.prototype.list = function() {
    if (this._list == null) {
      this.finder.calculate(this);
    }
    return this._list;
  };

  Query.prototype.hash = function() {
    if (this._hash == null) {
      this.finder.calculate(this);
    }
    return this._hash;
  };

  Query.prototype.find = function(id) {
    var _ref;
    return (_ref = this.hash()[id]) != null ? _ref.item : void 0;
  };

  return Query;

})();

Cache.Finder = (function() {
  function Finder(sort_by) {
    var all;
    this.sort_by = sort_by;
    all = new Cache.Query(this, [], false, this.sort_by);
    all._hash = {};
    this.scope = {
      all: all
    };
    this.query = {
      all: all
    };
  }

  Finder.prototype.rehash = function(rules) {
    var rule, _i, _len;
    this.query.all._list = null;
    this.query.all._reduce = null;
    this.query = {
      all: this.query.all
    };
    if (!(this.diff.del || this.diff.change)) {
      return;
    }
    for (_i = 0, _len = rules.length; _i < _len; _i++) {
      rule = rules[_i];
      rule;
    }
  };

  Finder.prototype.calculate_reduce = function(query) {
    var base, calc, emits, group, id, init, item, key, keys, last, map, o, reduce, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    init = (function(_this) {
      return function(map) {
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
    })(this);
    reduce = (function(_this) {
      return function(item, o, map) {
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
    })(this);
    calc = (function(_this) {
      return function(o) {
        if (o.all && o.count) {
          return o.avg = o.all / o.count;
        }
      };
    })(this);
    base = {};
    _ref = query._hash;
    for (id in _ref) {
      _ref1 = _ref[id], item = _ref1.item, emits = _ref1.emits;
      for (_i = 0, _len = emits.length; _i < _len; _i++) {
        _ref2 = emits[_i], keys = _ref2[0], last = _ref2[1], map = _ref2[2];
        o = base;
        for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
          key = keys[_j];
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
    var gt, is_array, list, lt, o, s, _i, _len, _ref;
    list = query._list;
    _ref = query.desc ? [1, -1] : [-1, 1], lt = _ref[0], gt = _ref[1];
    s = query.orders = {};
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      o = list[_i];
      s[o._id] = query.sort_by(o);
    }
    if (list.length) {
      is_array = Array.isArray(query.sort_by(list[0]));
    }
    return query._list = is_array ? list.sort(function(a, b) {
      var a_list, a_val, b_list, b_val, index, _j, _len1;
      a_list = s[a._id];
      b_list = s[b._id];
      for (index = _j = 0, _len1 = a_list.length; _j < _len1; index = ++_j) {
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
    var id, o, reduce, target, _ref;
    _ref = query._distinct, reduce = _ref.reduce, target = _ref.target;
    return query._list = (function() {
      var _ref1, _results;
      _ref1 = query._reduce[reduce];
      _results = [];
      for (id in _ref1) {
        o = _ref1[id];
        _results.push(o[target]);
      }
      return _results;
    })();
  };

  Finder.prototype.calculate_list = function(query, all) {
    var deploy, id, match, o;
    if (query._hash !== all) {
      query._hash = {};
      deploy = function(id, o) {
        query._hash[id] = o;
        return o.item;
      };
    } else {
      deploy = function(id, o) {
        return o.item;
      };
    }
    return query._list = (function() {
      var _i, _len, _ref, _results;
      _results = [];
      for (id in all) {
        o = all[id];
        _ref = query.match;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          match = _ref[_i];
          if (!match(o.item)) {
            o = null;
          }
          if (!o) {
            break;
          }
        }
        if (!o) {
          continue;
        }
        _results.push(deploy(id, o));
      }
      return _results;
    })();
  };

  Finder.prototype.calculate = function(query) {
    this.calculate_list(query, this.query.all._hash);
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

Cache.Rule = (function() {
  function Rule(field) {
    this.id = "" + field + "_id";
    this.list_name = "" + field + "s";
    this.validates = [];
    this.responses = [];
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
    this.finder = new Cache.Finder(function(list) {
      return list;
    });
    Cache.rule[field] = this;
    Cache[this.list_name] = this.finder.query.all;
  }

  Rule.prototype.schema = function(cb) {
    var definer;
    definer = {
      scope: (function(_this) {
        return function(cb) {
          var key, query_call, set_scope, _ref, _results;
          _this.finder.scope = cb(_this.finder.query.all);
          set_scope = function(key, finder, query_call) {
            return finder.query.all[key] = function() {
              var args, _base, _name;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return (_base = finder.query)[_name = "" + key + ":" + (JSON.stringify(args))] != null ? _base[_name] : _base[_name] = query_call.apply(null, args);
            };
          };
          _ref = _this.finder.scope;
          _results = [];
          for (key in _ref) {
            query_call = _ref[key];
            _results.push(set_scope(key, _this.finder, query_call));
          }
          return _results;
        };
      })(this),
      belongs_to: (function(_this) {
        return function(parent, option) {
          var dependent, parent_id, parents;
          parents = "" + parent + "s";
          parent_id = "" + parent + "_id";
          dependent = (option != null ? option.dependent : void 0) != null;
          if (dependent) {
            Cache.rule[parent].responses.push(_this);
          }
          return _this.validates.push(function(o) {
            var that, _ref;
            that = (_ref = Cache[parents]) != null ? _ref.find(o[parent_id]) : void 0;
            if (that != null) {
              return o[parent] = that;
            } else {
              return !dependent;
            }
          });
        };
      })(this),
      order: (function(_this) {
        return function(order) {
          var query;
          query = _this.finder.query.all.sort(false, order);
          query._hash = _this.finder.query.all._hash;
          return Cache[_this.list_name] = _this.finder.query.all = query;
        };
      })(this),
      protect: (function(_this) {
        return function() {
          var keys;
          keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return _this.protect = function(o, old) {
            var key, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
              key = keys[_i];
              _results.push(o[key] = old[key]);
            }
            return _results;
          };
        };
      })(this),
      deploy: (function(_this) {
        return function(deploy) {
          _this.deploy = deploy;
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

  Rule.prototype.set_base = function(mode, from, parent) {
    var all, diff, emit, finder, item, key, o, old, val, validate_item, _i, _j, _len, _len1, _ref, _ref1;
    finder = this.finder;
    diff = finder.diff;
    all = finder.query.all._hash;
    validate_item = (function(_this) {
      return function(item) {
        var validate, _i, _len, _ref;
        _ref = _this.validates;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          validate = _ref[_i];
          if (!validate(item)) {
            return false;
          }
        }
        return true;
      };
    })(this);
    switch (mode) {
      case "merge":
        _ref = from || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (!validate_item(item)) {
            continue;
          }
          for (key in parent) {
            val = parent[key];
            item[key] = val;
          }
          this.deploy(item);
          o = {
            item: item,
            emits: []
          };
          old = all[item._id];
          if (old != null) {
            this.protect(item, old.item);
            diff.change = true;
          } else {
            diff.add = true;
          }
          all[item._id] = o;
          emit = (function(_this) {
            return function() {
              var keys, last, map, _j;
              keys = 3 <= arguments.length ? __slice.call(arguments, 0, _j = arguments.length - 2) : (_j = 0, []), last = arguments[_j++], map = arguments[_j++];
              finder.map_reduce = true;
              return o.emits.push([keys, last, map]);
            };
          })(this);
          this.map_reduce(o.item, emit);
        }
        break;
      default:
        _ref1 = from || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          this.deploy(item);
          o = {
            item: item,
            emits: []
          };
          old = all[item._id];
          if (old != null) {
            diff.del = true;
            delete all[item._id];
          }
        }
    }
    finder.rehash(this.responses);
  };

  Rule.prototype.set = function(list, parent) {
    var key, val, _ref;
    this.finder.diff = {};
    _ref = this.finder.query.all._hash;
    for (key in _ref) {
      val = _ref[key];
      this.finder.query.all._hash = {};
      this.finder.diff.del = true;
      break;
    }
    return this.set_base("merge", list, parent, "merge");
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
var Btn, Btns, Txt,
  __slice = [].slice;

Txt = (function() {
  return {
    input: function(prop) {
      return {
        onblur: m.withAttr("value", prop),
        onchange: m.withAttr("value", prop),
        value: prop()
      };
    }
  };
})();

Btns = (function() {
  var base;
  base = function(btn, style, prop, options, order) {
    var attr, caption, key, _i, _len, _results;
    if (order == null) {
      order = Object.keys(options);
    }
    _results = [];
    for (_i = 0, _len = order.length; _i < _len; _i++) {
      key = order[_i];
      caption = options[key];
      attr = btn(style, prop, key);
      _results.push(m("span", attr, caption));
    }
    return _results;
  };
  return {
    check: function() {
      return base.apply(null, [Btn.keys].concat(__slice.call(arguments)));
    },
    radio: function() {
      return base.apply(null, [Btn.set].concat(__slice.call(arguments)));
    },
    menu: function() {
      return base.apply(null, [Btn.menu].concat(__slice.call(arguments)));
    }
  };
})();

Btn = (function() {
  var base, eq, include, is_true, keys_eq;
  base = function(style, check, store, load, key) {
    return GUI.attrs({}, function() {
      this.end(function() {
        return store(key);
      });
      if (check(load, key)) {
        return this.className("btn " + style["class"] + " active");
      } else {
        return this.className("btn " + style["class"]);
      }
    });
  };
  is_true = function(load) {
    return load();
  };
  eq = function(load, key) {
    return key === load();
  };
  include = function(load, key) {
    return load()[key];
  };
  keys_eq = function(load, keys) {
    var to_s;
    to_s = Serial.serializer.Keys;
    return to_s(load()) === to_s(keys);
  };
  return {
    base: base,
    bool: function(style, prop) {
      return base(style, is_true, prop, prop, !prop());
    },
    set: function(style, prop, val) {
      return base(style, eq, prop, prop, val);
    },
    keys_reset: function(style, prop, val) {
      var setter;
      setter = function(key) {
        if (!keys_eq(prop, val)) {
          return prop(Serial.parser.Keys(val));
        }
      };
      return base(style, keys_eq, setter, prop, val);
    },
    keys: function(style, prop, val) {
      var setter;
      setter = function(key) {
        var keys;
        keys = prop();
        keys[key] = !keys[key];
        return prop(keys);
      };
      return base(style, include, setter, prop, val);
    },
    menu: function(style, prop, val) {
      var setter;
      setter = (function(_this) {
        return function(key) {
          var target;
          target = eq(prop, key) ? "" : key;
          return prop(target);
        };
      })(this);
      return base(style, eq, setter, prop, val);
    }
  };
})();
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

  Gesture.prototype.start = function(_arg) {
    var layerX, offsetX, pageX, pageY, target;
    pageX = _arg.pageX, pageY = _arg.pageY, offsetX = _arg.offsetX, layerX = _arg.layerX, target = _arg.target;
    return this.pStart = {
      x: pageX,
      y: pageY,
      at: _.now(),
      offset: offsetX || layerX,
      target: target
    };
  };

  Gesture.prototype.move = function(_arg) {
    var is_fast, layerX, offsetX, pageX, pageY, target;
    pageX = _arg.pageX, pageY = _arg.pageY, offsetX = _arg.offsetX, layerX = _arg.layerX, target = _arg.target;
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
var GUI,
  __slice = [].slice;

GUI = (function() {
  var name_config, names_base;
  names_base = function(name) {
    return function(list, cb) {
      var hash, key, size, _i, _len, _results;
      hash = {};
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        key = list[_i];
        hash[key] || (hash[key] = 0);
        hash[key] += 1;
      }
      _results = [];
      for (key in hash) {
        size = hash[key];
        _results.push(cb(name(key), size));
      }
      return _results;
    };
  };
  name_config = function(o) {
    var _ref, _ref1, _ref2;
    return ((_ref = RAILS.roles[o]) != null ? _ref.name : void 0) || ((_ref1 = RAILS.gifts[o]) != null ? _ref1.name : void 0) || ((_ref2 = RAILS.events[o]) != null ? _ref2.name : void 0) || o || "";
  };
  return {
    img_head: "http://7korobi.gehirn.ne.jp/images",
    portrate: function(face_id, attr) {
      if (attr == null) {
        attr = {};
      }
      attr.src = GUI.img_head + ("/portrate/" + face_id + ".jpg");
      return m("img", attr);
    },
    title: function(width, theme, day_or_night) {
      var _ref, _ref1;
      return m("img", {
        src: GUI.img_head + ("/banner/title" + width) + ((_ref = RAILS.head_img[width]) != null ? (_ref1 = _ref[theme]) != null ? _ref1[day_or_night] : void 0 : void 0)
      });
    },
    header_style_p: "",
    header: function(keys) {
      var html, style;
      style = keys.join(" ");
      html = document.documentElement;
      html.className = html.className.replace(GUI.header_style_p, style);
      return GUI.header_style_p = style;
    },
    attrs_to: function(parent, query, base_attrs, cb) {
      var attr, attr_cb, data, elem, func, key, tag, vdom, _i, _len, _ref, _ref1, _results;
      vdom = m(query);
      tag = vdom.tag;
      attr = Object.keys(vdom.attrs)[0];
      attr_cb = function(elem, data, cb) {
        return function() {
          return cb.apply(this, data);
        };
      };
      _ref = parent.querySelectorAll(query);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        data = attr && ((_ref1 = elem.attributes[attr]) != null ? _ref1.value.split(",") : void 0);
        _results.push((function() {
          var _ref2, _results1;
          _ref2 = GUI.attrs(base_attrs, attr_cb(elem, data, cb));
          _results1 = [];
          for (key in _ref2) {
            func = _ref2[key];
            _results1.push(elem[key] = func);
          }
          return _results1;
        })());
      }
      return _results;
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
            var e1, _ref;
            console.log(e.changedTouches);
            e1 = (_ref = e.changedTouches) != null ? _ref[0] : void 0;
            return gesture.start(e1 || e);
          });
          move = act(function(e) {
            var e1, _ref;
            console.log(e.changedTouches);
            e1 = (_ref = e.changedTouches) != null ? _ref[0] : void 0;
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
        canvas: function(width, height, _arg) {
          var background, cache, draw, size;
          cache = _arg.cache, background = _arg.background, draw = _arg.draw;
          size = "" + width + "x" + height;
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
    timer: function(query, at) {
      var attr;
      attr = {
        config: function(elem, is_continue, context) {
          return at.prop = function(text) {
            elem.innerText && (elem.innerText = text);
            return elem.textContent && (elem.textContent = text);
          };
        }
      };
      return m(query, attr, at.text);
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
          em = arguments[0], vdom = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return inline_item_span("center", em, vdom);
        },
        right: function() {
          var em, vdom;
          em = arguments[0], vdom = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return inline_item_span("right", em, vdom);
        },
        left: function() {
          var em, vdom;
          em = arguments[0], vdom = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return inline_item_span("left", em, vdom);
        }
      };
      return m("ul.inline.mark", cb.call(list_cmds));
    },
    do_tick: function(cb) {
      var action;
      action = function() {
        var tick;
        m.startComputation();
        tick = cb(_.now());
        if (tick) {
          setTimeout(function() {
            return action();
          }, tick);
        }
        return m.endComputation();
      };
      return action();
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
      config: names_base(name_config)
    },
    letter: function() {
      var head, style, vdom;
      style = arguments[0], head = arguments[1], vdom = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return [m("p.name", m("b", head)), m("p.text." + style, vdom)];
    }
  };
})();
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

  jelly_down.define("jelly-down");

  apply = function(duration, sequence, _arg) {
    var begin, finish;
    begin = _arg.begin, finish = _arg.finish;
    return function(dom) {
      var style;
      style = "" + sequence + " " + duration + "ms linear both";
      if (typeof begin === "function") {
        begin(dom);
      }
      dom.style.animation = style;
      dom.style.webkitAnimation = style;
      return setTimeout(function() {
        return typeof finish === "function" ? finish(dom) : void 0;
      }, duration);
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
      begin: zIndex(2)
    }),
    down: apply(DELAY.andante, "jelly-down", {
      begin: zIndex(1),
      finish: zIndex(0)
    })
  };

  return Animate;

})();
GUI.Layout = (function() {
  var move;

  Layout.list = {};

  Layout.resize = function() {
    var key, o, _ref, _results;
    _ref = GUI.Layout.list;
    _results = [];
    for (key in _ref) {
      o = _ref[key];
      _results.push(o.translate());
    }
    return _results;
  };

  win.on.resize.push(Layout.resize);

  function Layout(box, dx, dy, dz, absolute, duration) {
    this.box = box;
    this.dx = dx;
    this.dy = dy;
    this.absolute = absolute != null ? absolute : false;
    this.duration = duration != null ? duration : DELAY.animato;
    if (!this.box) {
      return;
    }
    if (this.absolute) {
      this.duration /= 4;
    }
    GUI.Layout.list[this.box.id] = this;
    this.box.style.zIndex = dz;
    this.mode = "show";
    this.from = this.hide();
    this.transform(this.from);
    this.transition();
  }

  move = function(cb) {
    var h, w, x, y;
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

  Layout.prototype.show = function() {
    return move.call(this, function(x, y, w, h, win) {
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

  Layout.prototype.hide = function() {
    return move.call(this, function(x, y, w, h, win) {
      x = -x + (function() {
        switch (false) {
          case !(0 < x):
            return -w;
          case !(x < 0):
            return win.width;
        }
      })();
      y = -y + (function() {
        switch (false) {
          case !(0 < y):
            return -h;
          case !(y < 0):
            return win.height;
        }
      })();
      return {
        x: x,
        y: y,
        w: w,
        h: h,
        win: win
      };
    });
  };

  Layout.prototype.transform = function(_arg) {
    var transform, x, y;
    x = _arg.x, y = _arg.y;
    if (this.width) {
      this.box.style.width = "" + this.width + "px";
    }
    if (this.height) {
      this.box.style.height = "" + this.height + "px";
    }
    if (this.absolute) {
      this.box.style.position = "absolute";
      this.box.style.left = "" + (x + win.left) + "px";
      this.box.style.top = "" + (y + win.top) + "px";
      this.box.style.webkitTransform = "";
      this.box.style.mozTransform = "";
      this.box.style.msTransform = "";
      this.box.style.oTransform = "";
      return this.box.style.transform = "";
    } else {
      this.box.style.position = "fixed";
      this.box.style.top = 0;
      this.box.style.left = 0;
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

  Layout.prototype.transition = function() {
    var transition;
    transition = this.duration && !this.absolute ? "all " + this.duration + "ms ease-in-out 0" : "";
    if (head.browser.ff) {
      this.box.style.mozTransition = transition;
    }
    if (head.browser.ie) {
      this.box.style.msTransition = transition;
    }
    if (head.browser.opera) {
      this.box.style.oTransition = transition;
    }
    return this.box.style.transition = transition;
  };

  Layout.prototype.translate = function() {
    var to;
    to = this[this.mode]();
    if (_.isEqual(this.from, to)) {
      return;
    }
    this.transform(to);
    return setTimeout((function(_this) {
      return function() {
        _this.from = to;
        return _this.translate();
      };
    })(this), this.duration);
  };

  return Layout;

})();
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GUI.MenuTree = (function() {
  function MenuTree() {
    this.state = m.prop();
    this.nodes = {};
    this.change = (function(_this) {
      return function(val) {
        var old;
        old = _this.state();
        if (!arguments.length) {
          return old;
        }
        _this.state(val);
        if (old !== val) {
          if (_this.nodes[val]) {
            _this.nodes[val].open(_this.nodes[val].menu);
          }
          if (_this.nodes[old]) {
            return _this.nodes[old].close(_this.nodes[old].menu);
          }
        }
      };
    })(this);
  }

  MenuTree.prototype.start = function(style, mark) {
    style.key = "start-" + mark;
    return Btn.menu(style, this.change, mark);
  };

  MenuTree.prototype.cancel = function(style) {
    style.key = "cancel-" + mark;
    return Btn.set(style, this.change, "");
  };

  MenuTree.prototype.node = function(state) {
    var node;
    node = this.nodes[state];
    if (state !== this.state()) {
      return node.view(node.menu);
    }
  };

  MenuTree.prototype.view = function(node) {
    if (node == null) {
      node = this.nodes[this.state()];
    }
    if (node) {
      return [node.view(node.menu), node.menu.view()];
    } else {
      return [];
    }
  };

  MenuTree.prototype.each = function(order, cb) {
    var item, node, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = order.length; _i < _len; _i++) {
      item = order[_i];
      node = this.nodes[item];
      if (!node) {
        continue;
      }
      _results.push(cb(node));
    }
    return _results;
  };

  MenuTree.prototype.radio = function(style, prop, reduce_base, field_name, name_cb) {
    var caption_vdom, data, key, list, name, order, order_by, reduce, size, _i, _len;
    caption_vdom = function(name, val) {
      return [m("span", name), m("span.emboss.pull-right", val)];
    };
    reduce = reduce_base[field_name];
    data = {};
    order_by = {};
    list = Object.keys(reduce);
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      key = list[_i];
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
    order = list.sort(function(a, b) {
      return order_by[b] - order_by[a];
    });
    return Btns.radio(style, prop, data, order);
  };

  MenuTree.prototype.node = function(id, options) {
    var _base;
    return (_base = this.nodes)[id] != null ? _base[id] : _base[id] = new GUI.MenuNode(id, options);
  };

  return MenuTree;

})();

GUI.MenuTree.Drill = (function(_super) {
  __extends(Drill, _super);

  function Drill() {
    return Drill.__super__.constructor.apply(this, arguments);
  }

  Drill.prototype.drill = function(id, options) {
    var node;
    return node = this.node(id, options);
  };

  Drill.prototype.drills = function(style, order) {
    return this.each(order, (function(_this) {
      return function(drill) {
        return m("span.btn", _this.start(style, drill.id), drill.caption, m("span.note", "▼"));
      };
    })(this));
  };

  return Drill;

})(GUI.MenuTree);

GUI.MenuTree.Icon = (function(_super) {
  __extends(Icon, _super);

  function Icon() {
    return Icon.__super__.constructor.apply(this, arguments);
  }

  Icon.prototype.icon = function(id, options) {
    var node;
    node = this.node(id, options);
    if (this.state() === id) {
      return [];
    } else {
      return this.view(node);
    }
  };

  return Icon;

})(GUI.MenuTree);

GUI.MenuNode = (function() {
  function MenuNode(id, options) {
    var key, val;
    this.id = id;
    this.menu = new GUI.MenuTree.Drill();
    for (key in options) {
      val = options[key];
      this[key] = val;
    }
    this.deploy(this.menu);
  }

  MenuNode.prototype.caption = "";

  MenuNode.prototype.deploy = function() {};

  MenuNode.prototype.open = function() {};

  MenuNode.prototype.close = function() {};

  MenuNode.prototype.view = function() {
    return [];
  };

  return MenuNode;

})();
var __slice = [].slice;

GUI.message = (function() {
  var deco_action;
  deco_action = function(o) {
    return {
      config: function(parent, is_continue, context) {
        GUI.attrs_to(parent, "span[anchor]", {}, function(a, turn, id) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_anchor(o, turn, a, id);
            return m.endComputation();
          });
        });
        GUI.attrs_to(parent, "span[random]", {}, function(cmd, val) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_random(o, cmd, val);
            return m.endComputation();
          });
        });
        return GUI.attrs_to(parent, "span[external]", {}, function(id, uri, protocol, host, path) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_external(o, id, uri, protocol, host, path);
            return m.endComputation();
          });
        });
      }
    };
  };
  return {
    delegate: {
      tap_anchor: function() {
        return console.log(arguments);
      },
      tap_random: function() {
        return console.log(arguments);
      },
      tap_external: function() {
        return console.log(arguments);
      }
    },
    game: function(story, event) {
      var mob, option, option_id, roletable;
      roletable = RAILS.roletable[story.type.roletable];
      mob = RAILS.mob[story.type.mob];
      return [
        GUI.letter("", story.view.game_rule, m("ul.note", m.trust(RAILS.game_rule[story.type.game].HELP)), m("ul.note", (function() {
          var _i, _len, _ref, _results;
          _ref = story.options;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            option_id = _ref[_i];
            option = RAILS.options[option_id];
            if (!option) {
              continue;
            }
            _results.push(m("li", option.help));
          }
          return _results;
        })())), GUI.letter("", "" + roletable + " / " + story.view.player_length + "人", m("div", m("code", "事件"), story.view.event_cards), m("div", m("code", "役職"), story.view.role_cards), m("div", m("code", mob.CAPTION), m("kbd", "" + mob.HELP)))
      ];
    },
    story: function(story) {
      var rating, saycnt;
      rating = RAILS.rating[story.rating];
      saycnt = RAILS.saycnt[story.type.say] || {};
      return m(".ADMIN.guide", {
        key: story._id
      }, [
        GUI.letter("head", story.name, m("div", m("code", "こだわり"), m("img.pull-left", {
          src: GUI.img_head + ("/icon/cd_" + story.rating + ".png")
        }), rating.caption), m("div", m("code", "発言制限"), m.trust(saycnt.CAPTION + "<br>" + saycnt.HELP)), m("div", m("code", "更新"), story.view.update_at + "(" + story.view.update_interval + "ごと)")), GUI.letter("", "設定", m.trust(story.comment)), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black")
      ]);
    },

    /*
    "epilogue":0,
    "event":null,
    "say":{},
    "seance":{},
    "turn":0,
     */
    potofs: function(v) {
      return m("div", {
        key: v._id
      }, ".U.C " + v._id);
    },
    xxx: function(v) {
      return m("div", {
        key: v._id
      }, ".U.C " + v._id);
    },
    event: function(v) {
      return m("h3", {
        key: v._id
      }, v.name);
    },
    info: function(v) {
      return m("." + v.mestype + ".info", {
        key: v._id
      }, m("p.text", deco_action(v), m.trust(v.log.deco_text)));
    },
    guide: function(v) {
      return m("." + v.mestype + ".guide", {
        key: v._id
      }, m("p.name", m("b", m.trust(v.name))), m("p.text." + v.style, deco_action(v), m.trust(v.log.deco_text)), m("p.mes_date", m("span.mark", v.anchor), GUI.timer("span", v.updated_timer)));
    },
    action: function(v) {
      return m("." + v.mestype + ".action", {
        key: v._id
      }, m("p.text." + v.style, deco_action(v), m("b", m.trust(v.name)), "は、", m("span", m.trust(v.log.deco_text))), GUI.timer("p.mes_date", v.updated_timer));
    },
    memo: function(v) {
      return m("table." + v.mestype + ".memo", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id), m("div", m("b", v.name))), m("td", m("p.text." + v.style, deco_action(v), m.trust(v.log.deco_text)), m("p.mes_date", GUI.timer("span", v.updated_timer)))));
    },
    talk: function(v) {
      return GUI.message.say_base(v, m("span.mark", v.anchor), GUI.timer("span", v.updated_timer));
    },
    history: function(v) {
      return GUI.message.say_base(v, m("span.mark", v.anchor));
    },
    say_base: function() {
      var timer, v;
      v = arguments[0], timer = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return m("table." + v.mestype + ".talk", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id)), m("td", m(".msg", m("p.name", m("b", m.trust(v.name)), m(".emboss.pull-right", v.user_id)), m("p.text." + v.style, deco_action(v), m.trust(v.log.deco_text)), m("p.mes_date", timer)))));
    }
  };
})();
GUI.ScrollSpy = (function() {
  var size;

  ScrollSpy.elems = {};

  ScrollSpy.list = [];

  ScrollSpy.go = function(id, offset) {
    var elem, left_by, rect, top_by;
    elem = ScrollSpy.elems[id];
    if (elem) {
      rect = elem.getBoundingClientRect();
      if (offset == null) {
        offset = -2 + Math.min(win.horizon, rect.height);
      }
      top_by = rect.top - win.horizon + offset;
      left_by = 0;
      return window.scrollBy(left_by, top_by);
    }
  };

  win.on.scroll_end.push(function() {
    var id, spy, spy_id, _i, _j, _len, _len1, _ref, _ref1, _results;
    id = ScrollSpy.view();
    _ref = ScrollSpy.list;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      spy = _ref[_i];
      if (spy.list != null) {
        spy_id = spy.view();
      }
      id || (id = spy_id);
    }
    _ref1 = ScrollSpy.list;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      spy = _ref1[_j];
      if (id !== spy.prop()) {
        _results.push(spy.prop(id, true));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });

  ScrollSpy.view = function() {
    var elem, id, key, rect, result, vision, _ref, _ref1;
    result = null;
    _ref = ScrollSpy.elems;
    for (key in _ref) {
      elem = _ref[key];
      id = elem.vision.id;
      rect = elem.getBoundingClientRect();
      vision = elem.vision;
      vision.top = rect.top;
      vision.btm = rect.bottom;
      if (elem.vision.id === key && rect.height && rect.width) {
        if (!result && (vision.top < (_ref1 = win.horizon) && _ref1 < vision.btm)) {
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
    GUI.ScrollSpy.list.push(this);
    this.start();
  }

  ScrollSpy.prototype.rescroll = function(prop) {
    this.prop = prop;
    return window.requestAnimationFrame(function() {
      return GUI.ScrollSpy.go(prop());
    });
  };

  ScrollSpy.prototype.start = function() {
    this.head = this.tail = 0;
    this.avg_height = 150;
    return this.show_upper = true;
  };

  ScrollSpy.prototype.view = function() {
    var elem, id, idx, o, pager_rect, vision, _i, _len, _ref, _ref1, _ref2;
    pager_rect = this.pager_elem.getBoundingClientRect();
    this.pager_top = pager_rect.top;
    _ref = this.list;
    for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
      o = _ref[idx];
      id = o._id;
      if (elem = GUI.ScrollSpy.elems[id]) {
        vision = elem.vision;
        if (!this.adjust && (this.pager_top < (_ref1 = win.horizon) && _ref1 < vision.btm)) {
          vision.offset = Math.max(1, win.horizon - vision.top);
          this.adjust = vision;
        }
      }
    }
    m.startComputation();
    window.requestAnimationFrame(function() {
      return m.endComputation();
    });
    return (_ref2 = this.adjust) != null ? _ref2.id : void 0;
  };

  size = function(page_size, avg) {
    return 5 + Math.ceil(win.height * page_size / avg);
  };

  ScrollSpy.prototype.pager = function(tag, list, cb) {
    var attr, btm, idx, key, new_size, o, pager_cb, rect, show_bottom, show_under, show_upper, top, vdom, vdom_items, _ref;
    this.list = list;
    if (!((_ref = this.list) != null ? _ref.length : void 0)) {
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
    new_size = size(3, this.avg_height);
    if (!(3 > Math.abs(this.size - new_size))) {
      this.size = new_size;
    }
    this.tail = Math.min(btm, idx + this.size);
    this.head = Math.max(top, idx - this.size);
    pager_cb = (function(_this) {
      return function(pager_elem, is_continue, context) {
        var diff_bottom, elem_bottom;
        _this.pager_elem = pager_elem;
        rect = _this.pager_elem.getBoundingClientRect();
        _this.show_under = rect.bottom < win.horizon;
        _this.show_upper = win.horizon < rect.top;
        _this.avg_height = rect.height / (1 + _this.tail - _this.head);
        elem_bottom = rect.bottom + win.top;
        diff_bottom = elem_bottom - _this.elem_bottom;
        if (_this.show_under && !_this.prop() && win.bottom < document.height) {
          window.scrollBy(0, diff_bottom);
        }
        return _this.elem_bottom = elem_bottom;
      };
    })(this);
    vdom_items = (function() {
      var _i, _len, _ref1, _ref2, _results;
      _ref1 = this.list.slice(this.head, +this.tail + 1 || 9e9);
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        o = _ref1[_i];
        vdom = cb(o);
        _ref2 = this.mark(o._id);
        for (key in _ref2) {
          attr = _ref2[key];
          vdom.attrs[key] = attr;
        }
        _results.push(vdom);
      }
      return _results;
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
          GUI.ScrollSpy.elems[id] = elem;
          elem.vision = {
            id: id
          };
          if (_this.adjust) {
            if (id === _this.adjust.id) {
              offset = _this.adjust.offset;
              _this.adjust = null;
              return GUI.ScrollSpy.go(id, offset);
            }
          } else {
            if (!is_continue) {
              if (id === _this.prop()) {
                return GUI.ScrollSpy.go(id);
              }
            }
          }
        };
      })(this)
    };
  };

  return ScrollSpy;

})();
GUI.timeline = function(_arg) {
  var attr, base, choice, colors, first_at, last_at, max_height, mestype_orders, time_width, width, x, y, _ref, _ref1;
  width = _arg.width, base = _arg.base, choice = _arg.choice;
  colors = {
    SAY: "#cb8",
    MSAY: "#cb8",
    VSAY: "#ca6",
    SPSAY: "#dcb",
    GSAY: "#bbd",
    WSAY: "#a55",
    XSAY: "#9a7",
    BSAY: "#9a7",
    AIM: "#dcb",
    TSAY: "#a98",
    MAKER: "#000",
    ADMIN: "#000",
    text: "yellow",
    back: "#000",
    event: "#224",
    line: "#44a",
    focus: "yellow"
  };
  mestype_orders = ["SAY", "MSAY", "VSAY", "SPSAY", "GSAY", "WSAY", "XSAY", "BSAY", "AIM", "TSAY", "MAKER", "ADMIN"];
  last_at = ((_ref = base.list().last) != null ? _ref.updated_at : void 0) / (1000 * 3600);
  first_at = ((_ref1 = base.list().first) != null ? _ref1.updated_at : void 0) / (1000 * 3600);
  time_width = last_at - first_at;
  max_height = y = 0;
  attr = GUI.attrs({}, function() {
    var find_last, point;
    find_last = function(list, time) {
      var o, _i;
      for (_i = list.length - 1; _i >= 0; _i += -1) {
        o = list[_i];
        if (time > o.updated_at) {
          return o._id;
        }
      }
      return null;
    };
    point = function(e) {
      var canvas, id, list, offsetX, offsetY, open, potofs_hide, talk, _ref2, _ref3, _ref4;
      if (!win.is_touch) {
        return;
      }
      Url.prop.search("");
      canvas = document.querySelector("canvas");
      if ((_ref2 = e.touches) != null ? (_ref3 = _ref2[0]) != null ? _ref3.pageX : void 0 : void 0) {
        offsetX = (e.touches[0].pageX - canvas.offsetLeft) * 2;
        offsetY = (e.touches[0].pageY - canvas.offsetTop) * 2;
      } else {
        offsetX = (e.offsetX || e.layerX || e.x) * 2;
        offsetY = (e.offsetY || e.layerY || e.y) * 2;
      }
      list = 100 < offsetY ? Cache.messages.talk("open", false, {}).list() : ((_ref4 = Url.prop, talk = _ref4.talk, open = _ref4.open, potofs_hide = _ref4.potofs_hide, _ref4), Cache.messages.talk(talk(), open(), potofs_hide()).list());
      id = find_last(list, Math.ceil(1000 * 3600 * (first_at + offsetX / x)));
      if (!id) {
        return;
      }
      m.startComputation();
      choice(id);
      return m.endComputation();
    };
    this.start(function(e) {
      win.is_touch = true;
      return point(e);
    });
    this.end(function(e) {
      win.is_touch = false;
      return point(e);
    });
    this.cancel(function(e) {
      win.is_touch = false;
      return point(e);
    });
    this.move(point);
    return this.canvas(width, 75, {
      cache: function() {
        return base.reduce();
      },
      draw: function(ctx) {
        var focus, offset;
        focus = Cache.messages.find(Url.prop.talk_at());
        if (!focus) {
          return;
        }
        ctx.beginPath();
        offset = focus.updated_at / (1000 * 3600) - first_at;
        ctx.strokeStyle = colors.focus;
        ctx.globalAlpha = 1;
        ctx.moveTo(x * offset, 150);
        ctx.lineTo(x * offset, 0);
        return ctx.stroke();
      },
      background: function(ctx) {
        var color, event_id, height, left, mask, mestype, reduce, right, time_id, top, _i, _len, _ref2, _ref3, _ref4;
        if (!base.reduce()) {
          return;
        }
        _ref2 = base.reduce().mask;
        for (time_id in _ref2) {
          mask = _ref2[time_id];
          if (max_height < mask.all.count) {
            max_height = mask.all.count;
          }
        }
        y = 100 / max_height;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = colors.back;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, x * time_width, y * max_height);
        width = 1;
        _ref3 = base.reduce().mask;
        for (time_id in _ref3) {
          mask = _ref3[time_id];
          left = Serial.parser.Date(time_id) - first_at;
          top = max_height;
          for (_i = 0, _len = mestype_orders.length; _i < _len; _i++) {
            mestype = mestype_orders[_i];
            color = colors[mestype];
            if (mask[mestype]) {
              height = mask[mestype].count;
              top -= height;
              ctx.fillStyle = color;
              ctx.globalAlpha = 1;
              ctx.fillRect(x * left, y * top, 1 + x * width, y * height);
            }
          }
        }
        left = 0;
        ctx.beginPath();
        _ref4 = base.reduce().event;
        for (event_id in _ref4) {
          reduce = _ref4[event_id];
          right = reduce.max / (1000 * 3600) - first_at;
          ctx.strokeStyle = colors.line;
          ctx.globalAlpha = 1;
          ctx.moveTo(x * right, 150);
          ctx.lineTo(x * right, 0);
          ctx.fillStyle = colors.event;
          ctx.fillRect(x * left, 100, x * right, 150);
          ctx.textAlign = "left";
          ctx.fillStyle = colors.text;
          ctx.font = "30px serif";
          ctx.fillText(Cache.events.find(event_id).name, x * left, 150 - 12, x * (right - left) - 4);
          left = right;
        }
        return ctx.stroke();
      }
    });
  });
  x = attr.width / time_width;
  return m("canvas", attr);
};
var b, _ref;

if (head.browser != null) {
  b = head.browser;
  b.viewport = "width=device-width, initial-scale=1.0";
  if (navigator.userAgent.toLowerCase().indexOf('windows') !== -1) {
    b.win = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('macintosh') !== -1) {
    b.mac = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    b.android = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
    b.viewport = "width=device-width, initial-scale=0.5";
  }
}

if ((_ref = document.querySelector("meta[name=viewport]")) != null) {
  _ref.attributes.content = head.browser.viewport;
}

head.useragent = navigator.userAgent;
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
var ID, Serial, func, key, _ref;

Serial = (function() {
  var array_base_parser, c, n, string_parser, string_serializer, _i, _len, _ref;

  function Serial() {}

  Serial.map = {
    to_s: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    to_i: {}
  };

  _ref = Serial.map.to_s;
  for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
    c = _ref[n];
    Serial.map.to_i[c] = n;
  }

  Serial.map.size = Serial.map.to_s.length;

  string_parser = function(val) {
    switch (val) {
      case "":
      case null:
      case void 0:
        return "";
      default:
        return String(val);
    }
  };

  string_serializer = function(val) {
    switch (val) {
      case "":
      case null:
      case void 0:
        return "";
      default:
        return String(val).replace(/[~\/=.&\?\#\[\]()\"'`;]/g, function(s) {
          return "%" + s.charCodeAt(0).toString(16);
        });
    }
  };

  array_base_parser = function(val) {
    if (Array.isArray(val)) {
      return val;
    } else {
      return ("" + val).split(",");
    }
  };

  Serial.parser = {
    Keys: function(val) {
      var bool, hash, key, list, _j, _len1;
      hash = {};
      if (val.length) {
        list = array_base_parser(val);
        for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
          key = list[_j];
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
    Array: function(val) {
      if (val.length) {
        return array_base_parser(val);
      } else {
        return [];
      }
    },
    Date: function(code) {
      var base, result, _j, _len1;
      if (0 < code) {
        return code;
      }
      base = 1;
      result = 0;
      for (_j = 0, _len1 = code.length; _j < _len1; _j++) {
        c = code[_j];
        n = Serial.map.to_i[c];
        if (n == null) {
          return Number.NaN;
        }
        result += n * base;
        base *= Serial.map.size;
      }
      return result;
    },
    Bool: function(val) {
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
    "null": string_parser,
    undefined: string_parser
  };

  Serial.serializer = {
    Keys: function(val) {
      var item, key, list;
      list = (function() {
        var _results;
        if (Array.isArray(val)) {
          return val;
        } else {
          _results = [];
          for (key in val) {
            item = val[key];
            if (!item) {
              continue;
            }
            _results.push(key);
          }
          return _results;
        }
      })();
      return Serial.serializer.Array(list.sort());
    },
    Array: function(val) {
      if (Array.isArray(val)) {
        return val.join(",");
      } else {
        return "" + val;
      }
    },
    Date: function(val) {
      var result, time;
      time = Math.floor(val);
      result = "";
      while (time >= 1) {
        result += Serial.map.to_s[time % Serial.map.size];
        time = Math.floor(time / Serial.map.size);
      }
      return result;
    },
    Bool: function(bool) {
      if (bool) {
        return "T";
      } else {
        return "F";
      }
    },
    Number: string_serializer,
    Text: string_serializer,
    String: string_serializer,
    "null": string_serializer,
    undefined: string_serializer
  };

  Serial.url = {};

  return Serial;

})();

_ref = Serial.parser;
for (key in _ref) {
  func = _ref[key];
  Serial.url[key] = (function() {
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
  })();
}

ID = (function() {
  function ID() {}

  ID.patch_size = Serial.map.size * Serial.map.size * Serial.map.size;

  ID.now = function() {
    return this.at(_.now());
  };

  ID.at = function(date, count) {
    if (count == null) {
      count = Math.random() * this.patch_size;
    }
    return Serial.serializer.Date(date * this.patch_size + count);
  };

  return ID;

})();
var Timer;

Timer = (function() {
  Timer.week = ["日", "月", "火", "水", "木", "金", "土"];

  Timer.dow = function(dow) {
    return Timer.week[dow];
  };

  Timer.hh = _.memoize(function(hh) {
    var tt;
    tt = ["午前", "午後"][Math.floor(hh / 12)];
    hh = hh % 12;
    if (hh < 10) {
      hh = "0" + hh;
    }
    return "" + tt + hh + "時";
  });

  Timer.hhmm = _.memoize(function(hh, mi) {
    if (mi < 10) {
      mi = "0" + mi;
    }
    return "" + (Timer.hh(hh)) + mi + "分";
  });

  Timer.time_stamp = _.memoize(function(date) {
    var dd, dow, hh, mi, mm, now;
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
    return "(" + dow + ") " + (Timer.hhmm(hh, mi));
  });

  Timer.date_time_stamp = _.memoize(function(date) {
    var dd, dow, hh, mi, mm, now, postfix, yyyy;
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
    return "" + yyyy + "-" + mm + "-" + dd + " (" + dow + ") " + (Timer.hh(hh)) + postfix;
  });

  function Timer(at, options) {
    var key, val;
    this.at = at;
    if (options == null) {
      options = {};
    }
    for (key in options) {
      val = options[key];
      this[key] = val;
    }
    GUI.do_tick((function(_this) {
      return function(now) {
        _this.msec = now - _this.at;
        return _this.next(_this.msec / 1000, function(text, sec_span) {
          var diff, msec_span;
          _this.text = text;
          if (sec_span == null) {
            sec_span = Number.NaN;
          }
          if (_this.prop) {
            _this.prop(_this.text);
          }
          msec_span = sec_span * 1000;
          diff = _this.msec % msec_span;
          if (0 < diff) {
            return msec_span - diff;
          } else {
            return 1 - diff;
          }
        });
      };
    })(this));
  }

  Timer.prototype.next = function(second, tick) {
    var hour, limit, minute;
    if (0 < second) {
      minute = Math.floor(second / 60);
      hour = Math.floor(second / 3600);
    }
    if (second < 0) {
      minute = Math.floor(-second / 60);
      hour = Math.floor(-second / 3600);
    }
    limit = 3 * 60 * 60;
    if ((-25 < second && second < 25)) {
      return tick("25秒以内", 25);
    }
    if ((0 < second && second < 60)) {
      return tick("1分以内", 60);
    }
    if ((-60 < second && second < 0)) {
      return tick("1分以内", 25);
    }
    if ((-3600 < second && second < 0)) {
      return tick("" + minute + "分後", 60);
    }
    if ((0 < second && second < 3600)) {
      return tick("" + minute + "分前", 60);
    }
    if ((-limit < second && second < 0)) {
      return tick("" + hour + "時間後", 3600);
    }
    if ((0 < second && second < limit)) {
      return tick("" + hour + "時間前", 3600);
    }
    if (second < -limit) {
      return tick(Timer.date_time_stamp(this.at), 3600);
    }
    if (limit < second) {
      return tick(Timer.date_time_stamp(this.at));
    }
  };

  return Timer;

})();


/*
log.updated = new Timer log.updated_at,
  draw: (text)->
    log.elm = $("." + log._id)
    log.elm.find("[time]").html text

log.cancel_btn = 
  if log.logid? && "q" == log.logid[0]
    new Timer log.updated_at,
      next: (second, tick)->
        return tick """<span cancel_btn>なら削除できます。<a hogan-click='cancel_say("#{@logid}")()' class="btn btn-danger click glyphicon glyphicon-trash"></a></span>""", 25 if -25 < second < 25
        return tick ""
      draw: (text)->
        log.elm = $("." + log._id)
        log.elm.find("[cancel_btn]").html text
  else
    text: ""
 */
;
var Url,
  __slice = [].slice;

Url = (function() {
  Url.routes = {};

  Url.cookie = {};

  Url.prop = {};

  Url.location = function() {
    return {
      cookie: document.cookie,
      protocol: location.protocol,
      host: location.host,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    };
  };

  Url.define = function() {
    var bind_table, do_define, key, prop_option, props, _results;
    bind_table = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    do_define = function(key, option) {
      var bind, bind_base, binder, current, parser, prop, type;
      type = option.type, current = option.current;
      bind_base = Url.bind[key];
      parser = Serial.parser[type];
      prop = m.prop();
      bind = (function() {
        var _i, _len;
        if (bind_base) {
          switch (typeof bind_base) {
            case "object":
              binder = {};
              for (_i = 0, _len = bind_base.length; _i < _len; _i++) {
                bind = bind_base[_i];
                binder[bind[key]] = bind;
              }
              return function(val) {
                var subkey, subval, _ref;
                _ref = binder[val];
                for (subkey in _ref) {
                  subval = _ref[subkey];
                  if (!Url.prop[subkey]) {
                    console.log([subkey, subval, binder[val]]);
                  }
                  if (key !== subkey) {
                    Url.prop[subkey](subval, true);
                  }
                }
              };
            case "function":
              return bind_base;
          }
        } else {
          return function() {};
        }
      })();
      return Url.prop[key] = (function(_this) {
        return function(val, is_replace) {
          var value;
          if (arguments.length) {
            val = parser(val);
            prop(val);
            bind(val);
            return Url.replacestate();
          } else {
            value = prop();
            if (value != null) {
              return value;
            } else {
              return current;
            }
          }
        };
      })(this);
    };
    props = bind_table[0];
    bind_table[0] = {};
    Url.bind = _.merge.apply(_, bind_table);
    Url.options = props;
    _results = [];
    for (key in props) {
      prop_option = props[key];
      if (!prop_option) {
        props[key] = prop_option = {};
      }
      if (prop_option.type == null) {
        prop_option.type = "String";
      }
      _results.push(do_define(key, prop_option));
    }
    return _results;
  };

  Url.each = function(cb) {
    var data, route, target, targets, url_key, _ref;
    Url.routes.cookie = Url.cookie;
    targets = Url.location();
    for (target in targets) {
      data = targets[target];
      _ref = Url.routes[target];
      for (url_key in _ref) {
        route = _ref[url_key];
        cb(route, targets[target], target, targets);
      }
    }
    return targets;
  };

  Url.popstate = function() {
    console.log("pop state");
    Url.each(function(route, data, target) {
      return route.popstate(data, target);
    });
    return Url.mode = "replaceState";
  };

  Url.state = _.debounce(function() {
    var new_href;
    new_href = Url.href();
    if (decodeURI(location.href) !== decodeURI(new_href)) {
      if (typeof history !== "undefined" && history !== null) {
        history[Url.mode]("pushstate", null, new_href);
      }
      return Url.popstate();
    }
  }, DELAY.presto);

  Url.pushstate = function() {
    Url.mode = "pushState";
    return Url.state();
  };

  Url.replacestate = function() {
    return Url.state();
  };

  Url.href = function() {
    var link;
    link = Url.each(function(route, data, target, targets) {
      return targets[target] = route.pushstate(data, target);
    });
    return link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
  };

  function Url(format, options) {
    this.format = format;
    this.options = options != null ? options : {};
    this.keys_in_url = [];
    if (this.options.cookie) {
      Url.cookie[ID.now()] = this;
    }
    this.scanner = new RegExp(this.format.replace(/[.]/ig, function(key) {
      return "\\" + key;
    }).replace(/:([a-z_]+)/ig, (function(_this) {
      return function(_, key) {
        var type, _ref;
        type = (_ref = Url.options[key]) != null ? _ref.type : void 0;
        _this.keys_in_url.push(key);
        return Serial.url[type];
      };
    })(this), "i"));
  }

  Url.prototype.values = function(diff) {
    var key, _i, _len, _ref, _results;
    if (diff == null) {
      diff = {};
    }
    _ref = this.keys_in_url;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _results.push(diff[key] || Url.prop[key]());
    }
    return _results;
  };

  Url.prototype.popstate = function(path, target) {
    var data, i, key, val, _base, _i, _len, _ref;
    data = {};
    this.match = this.scanner.exec(path);
    if (this.match) {
      this.match.shift();
      _ref = this.keys_in_url;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        key = _ref[i];
        val = decodeURI(this.match[i]);
        data[key] = val;
        Url.prop[key](val, true);
      }
      if (typeof (_base = this.options).change === "function") {
        _base.change(data);
      }
    }
    return Url.replacestate();
  };

  Url.prototype.pushstate = function(path, target) {
    if (target === "cookie" && this.options.cookie) {
      return this.set_cookie(this.serialize());
    }
    if (this.scanner.exec(path)) {
      return path.replace(this.scanner, this.serialize());
    }
    if (this.options.unmatch) {
      path += path.length ? "&" : this.options.unmatch;
      path += this.serialize();
    }
    return path;
  };

  Url.prototype.serialize = function() {
    var key, path, type, val, _i, _len, _ref, _ref1;
    path = this.format;
    _ref = this.keys_in_url;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      type = (_ref1 = Url.options[key]) != null ? _ref1.type : void 0;
      val = Url.prop[key]();
      path = path.replace(RegExp(":" + key, "ig"), Serial.serializer[type](val));
    }
    return path;
  };

  Url.prototype.set_cookie = function(value) {
    var ary, domain, expires, path, secure, time, _ref;
    ary = [value];
    _ref = this.options.cookie, time = _ref.time, domain = _ref.domain, path = _ref.path, secure = _ref.secure;
    if (time) {
      expires = new Date(Math.min(2147397247000, _.now() + time * 3600000));
      ary.push("expires=" + (expires.toUTCString()));
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

  return Url;

})();
var InputBase, InputSow,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

InputBase = (function() {
  var calc_point;

  function InputBase() {}

  calc_point = function(size) {
    var point;
    point = 20;
    if (50 < size) {
      point += (size - 50) / 14;
    }
    return Math.floor(point);
  };

  InputBase.prototype.change = function(text) {
    var mark, message;
    if (text == null) {
      text = "";
    }
    this.text = text.replace(/\n$/g, '\n ');
    this.lines = this.text.split("\n").length;
    this.size = this.text.sjis_length;
    this.point = calc_point(this.size);
    message = this.bad[this.validate.type]();
    this.is_bad = !!message;
    this.can_preview = !this.is_bad;
    if (this.valid) {
      if ('point' === this.max.unit) {
        mark = "" + point + "pt ";
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
    return this.out.html = this.max ? "" + mark + " " + size + "<sub>/" + this.max.size + "字</sub>  " + lines + "<sub>/" + this.max.line + "行</sub>" : "";
  };

  InputBase.prototype.bad_input = function() {
    if (this.text == null) {
      return true;
    }
    if (this.validate.is_disable) {
      return true;
    }
    if (this.text.replace(/\s/g, '').sjis_length < 4) {
      return true;
    }
    if (this.max != null) {
      if (this.max.size < this.size) {
        return true;
      }
      if (this.max.line < this.lines) {
        return true;
      }
    }
    return null;
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

InputSow = (function(_super) {
  __extends(InputSow, _super);

  function InputSow(max, validate) {
    this.max = max;
    this.validate = validate;
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
            return "" + _this.validate.title + "をクリックしましょう。";
          }
        };
      })(this)
    };
    this.requests = {
      entry: (function(_this) {
        return function(_arg) {
          var csid_cid, entrypwd, mes, role, style, turn, vid;
          turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, csid_cid = _arg.csid_cid, role = _arg.role, entrypwd = _arg.entrypwd;
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
        return function(_arg) {
          var mes, style, target, turn, vid;
          turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, target = _arg.target;
          _arg.cmd = "write";
          return _arg;
        };
      })(this),
      memo: (function(_this) {
        return function(_arg) {
          var mes, style, target, turn, vid;
          turn = _arg.turn, vid = _arg.vid, mes = _arg.mes, style = _arg.style, target = _arg.target;
          _arg.cmd = "wrmemo";
          return _arg;
        };
      })(this),
      action: (function(_this) {
        return function(_arg) {
          var actionno, actiontext, style, target, turn, vid;
          turn = _arg.turn, vid = _arg.vid, actiontext = _arg.actiontext, style = _arg.style, target = _arg.target, actionno = _arg.actionno;
          _arg.cmd = "action";
          return _arg;
        };
      })(this),
      select: (function(_this) {
        return function(_arg) {
          var cmd, target1, target2, vid;
          vid = _arg.vid, target1 = _arg.target1, target2 = _arg.target2, cmd = _arg.cmd;
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
        return function(_arg) {
          var commit, vid;
          vid = _arg.vid, commit = _arg.commit;
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

  InputSow.prototype.danger_anker = function() {
    if (this.validate.is_open && this.text.match(/>>[\=\*\!]\d+/)) {
      return "あぶない！秘密会話へのアンカーがありますよ！";
    }
  };

  return InputSow;

})(InputBase);


