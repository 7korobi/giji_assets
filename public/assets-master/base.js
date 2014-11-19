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
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */

;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
/*
Mithril v0.1.24
http://github.com/lhorie/mithril.js
(c) Leo Horie
License: MIT
*/

Mithril=m=new function a(b,c){function d(a){D=a.document,E=a.location,G=a.cancelAnimationFrame||a.clearTimeout,F=a.requestAnimationFrame||a.setTimeout}function e(){for(var a,b=[].slice.call(arguments),c=(!(null==b[1]||L.call(b[1])!=H||"tag"in b[1]||"subtree"in b[1])),d=c?b[1]:{},e=("class"in d?"class":"className"),f={tag:"div",attrs:{}},g=[];a=M.exec(b[0]);)if(""==a[1]&&a[2])f.tag=a[2];else if("#"==a[1])f.attrs.id=a[2];else if("."==a[1])g.push(a[2]);else if("["==a[3][0]){var h=N.exec(a[3]);f.attrs[h[1]]=h[3]||(h[2]?"":!0)}g.length>0&&(f.attrs[e]=g.join(" "));var i=c?b[2]:b[1];f.children=L.call(i)==I?i:b.slice(c?2:1);for(var j in d)f.attrs[j]=j==e?(f.attrs[j]||"")+" "+d[j]:d[j];return f}function f(a,b,d,e,i,l,m,n,o,p,q){if(null==i&&(i=""),"retain"===i.subtree)return l;var r=L.call(l),s=L.call(i);if(null==l||r!=s){if(null!=l)if(d&&d.nodes){var t=n-e,u=t+(s==I?i:l.nodes).length;h(d.nodes.slice(t,u),d.slice(t,u))}else l.nodes&&h(l.nodes,l);l=new i.constructor,l.tag&&(l={}),l.nodes=[]}if(s==I){i=k(i);for(var v=[],w=l.length===i.length,x=0,y=1,z=2,A=3,B={},C=[],E=!1,F=0;F<l.length;F++)l[F]&&l[F].attrs&&null!=l[F].attrs.key&&(E=!0,B[l[F].attrs.key]={action:y,index:F});if(E){for(var F=0;F<i.length;F++)if(i[F]&&i[F].attrs)if(null!=i[F].attrs.key){var G=i[F].attrs.key;B[G]=B[G]?{action:A,index:F,from:B[G].index,element:a.childNodes[B[G].index]||D.createElement("div")}:{action:z,index:F}}else C.push({index:F,element:a.childNodes[F]||D.createElement("div")});for(var M,N=Object.keys(B).map(function(a){return B[a]}),P=N.sort(function(a,b){return a.action-b.action||a.index-b.index}),Q=l.slice(),F=0;M=P[F];F++){if(M.action==y&&(h(l[M.index].nodes,l[M.index]),Q.splice(M.index,1)),M.action==z){var R=D.createElement("div");R.key=i[M.index].attrs.key,a.insertBefore(R,a.childNodes[M.index]||null),Q.splice(M.index,0,{attrs:{key:i[M.index].attrs.key},nodes:[R]})}M.action==A&&(a.childNodes[M.index]!==M.element&&null!==M.element&&a.insertBefore(M.element,a.childNodes[M.index]||null),Q[M.index]=l[M.from])}for(var F=0;F<C.length;F++){var M=C[F];a.insertBefore(M.element,a.childNodes[M.index]||null),Q[M.index]=l[M.index]}l=Q,l.nodes=[];for(var S,F=0;S=a.childNodes[F];F++)l.nodes.push(S)}for(var F=0,T=0;F<i.length;F++){var U=f(a,b,l,n,i[F],l[T],m,n+x||x,o,p,q);U!==c&&(U.nodes.intact||(w=!1),x+=U.$trusted?(U.match(/<[^\/]|\>\s*[^<]/g)||[]).length:L.call(U)==I?U.length:1,l[T++]=U)}if(!w){for(var F=0;F<i.length;F++)null!=l[F]&&(v=v.concat(l[F].nodes));for(var V,F=0;V=l.nodes[F];F++)null!=V.parentNode&&v.indexOf(V)<0&&h([V],[l[F]]);for(var V,F=l.nodes.length;V=v[F];F++)null==V.parentNode&&a.appendChild(V);i.length<l.length&&(l.length=i.length),l.nodes=v}}else if(null!=i&&s==H){i.attrs||(i.attrs={}),l.attrs||(l.attrs={});var W=Object.keys(i.attrs);if((i.tag!=l.tag||W.join()!=Object.keys(l.attrs).join()||i.attrs.id!=l.attrs.id)&&(l.nodes.length&&h(l.nodes),l.configContext&&typeof l.configContext.onunload==K&&l.configContext.onunload()),L.call(i.tag)!=J)return;var V,X=0===l.nodes.length;if(i.attrs.xmlns?p=i.attrs.xmlns:"svg"===i.tag?p="http://www.w3.org/2000/svg":"math"===i.tag&&(p="http://www.w3.org/1998/Math/MathML"),X?(V=i.attrs.is?p===c?D.createElement(i.tag,i.attrs.is):D.createElementNS(p,i.tag,i.attrs.is):p===c?D.createElement(i.tag):D.createElementNS(p,i.tag),l={tag:i.tag,attrs:W.length?g(V,i.tag,i.attrs,{},p):{},children:null!=i.children&&i.children.length>0?f(V,i.tag,c,c,i.children,l.children,!0,0,i.attrs.contenteditable?V:o,p,q):i.children,nodes:[V]},l.children&&!l.children.nodes&&(l.children.nodes=[]),"select"==i.tag&&i.attrs.value&&g(V,i.tag,{value:i.attrs.value},{},p),a.insertBefore(V,a.childNodes[n]||null)):(V=l.nodes[0],W.length&&g(V,i.tag,i.attrs,l.attrs,p),l.children=f(V,i.tag,c,c,i.children,l.children,!1,0,i.attrs.contenteditable?V:o,p,q),l.nodes.intact=!0,m===!0&&null!=V&&a.insertBefore(V,a.childNodes[n]||null)),typeof i.attrs.config==K){var Y=l.configContext=l.configContext||{},Z=function(a,b){return function(){return a.attrs.config.apply(a,b)}};q.push(Z(i,[V,!X,Y,l]))}}else if(typeof s!=K){var v;0===l.nodes.length?(i.$trusted?v=j(a,n,i):(v=[D.createTextNode(i)],a.nodeName.match(O)||a.insertBefore(v[0],a.childNodes[n]||null)),l="string number boolean".indexOf(typeof i)>-1?new i.constructor(i):i,l.nodes=v):l.valueOf()!==i.valueOf()||m===!0?(v=l.nodes,o&&o===D.activeElement||(i.$trusted?(h(v,l),v=j(a,n,i)):"textarea"===b?a.value=i:o?o.innerHTML=i:((1==v[0].nodeType||v.length>1)&&(h(l.nodes,l),v=[D.createTextNode(i)]),a.insertBefore(v[0],a.childNodes[n]||null),v[0].nodeValue=i)),l=new i.constructor(i),l.nodes=v):l.nodes.intact=!0}return l}function g(a,b,c,d,e){for(var f in c){var g=c[f],h=d[f];if(f in d&&h===g)"value"===f&&"input"===b&&a.value!==g&&(a.value=g);else{d[f]=g;try{if("config"===f)continue;if(typeof g==K&&0==f.indexOf("on"))a[f]=l(g,a);else if("style"===f&&null!=g&&L.call(g)==H){for(var i in g)(null==h||h[i]!==g[i])&&(a.style[i]=g[i]);for(var i in h)i in g||(a.style[i]="")}else null!=e?"href"===f?a.setAttributeNS("http://www.w3.org/1999/xlink","href",g):"className"===f?a.setAttribute("class",g):a.setAttribute(f,g):f in a&&"list"!=f&&"style"!=f&&"form"!=f?a[f]=g:a.setAttribute(f,g)}catch(j){if(j.message.indexOf("Invalid argument")<0)throw j}}}return d}function h(a,b){for(var c=a.length-1;c>-1;c--)a[c]&&a[c].parentNode&&(a[c].parentNode.removeChild(a[c]),b=[].concat(b),b[c]&&i(b[c]));0!=a.length&&(a.length=0)}function i(a){if(a.configContext&&typeof a.configContext.onunload==K&&a.configContext.onunload(),a.children)if(L.call(a.children)==I)for(var b=0;b<a.children.length;b++)i(a.children[b]);else a.children.tag&&i(a.children)}function j(a,b,c){var d=a.childNodes[b];if(d){var e=1!=d.nodeType,f=D.createElement("span");e?(a.insertBefore(f,d||null),f.insertAdjacentHTML("beforebegin",c),a.removeChild(f)):d.insertAdjacentHTML("beforebegin",c)}else a.insertAdjacentHTML("beforeend",c);for(var g=[];a.childNodes[b]!==d;)g.push(a.childNodes[b]),b++;return g}function k(a){var b=0;a:for(;;){for(var c=b;c<a.length;c++){{a[c]}if(L.call(a[c])==I){b=c,a=a.concat.apply([],a);continue a}}break}return a}function l(a,b){return function(c){c=c||event,e.redraw.strategy("diff"),e.startComputation();try{return a.call(b,c)}finally{e.endComputation()}}}function m(a){var b=R.indexOf(a);return 0>b?R.push(a)-1:b}function n(a){var b=function(){return arguments.length&&(a=arguments[0]),a};return b.toJSON=function(){return a},b}function o(){for(var a=e.redraw.strategy(),b=0;b<U.length;b++)W[b]&&"none"!=a&&e.render(U[b],V[b].view(W[b]),"all"==a);Z&&(Z(),Z=null),X=null,Y=new Date,e.redraw.strategy("diff")}function p(a){return a.slice(bb[e.route.mode].length)}function q(a,b,c){db={};var d=c.indexOf("?");-1!==d&&(db=u(c.substr(d+1,c.length)),c=c.substr(0,d));for(var f in b){if(f==c)return e.module(a,b[f]),!0;var g=new RegExp("^"+f.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(g.test(c))return c.replace(g,function(){for(var c=f.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2),g=0;g<c.length;g++)db[c[g].replace(/:|\./g,"")]=decodeURIComponent(d[g]);e.module(a,b[f])}),!0}}function r(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!=a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;var b=a.currentTarget||this,c="pathname"==e.route.mode&&b.search?u(b.search.slice(1)):{};e.route(b[e.route.mode].slice(bb[e.route.mode].length),c)}}function s(){"hash"!=e.route.mode&&E.hash?E.hash=E.hash:b.scrollTo(0,0)}function t(a,b){var c=[];for(var d in a){var e=b?b+"["+d+"]":d,f=a[d];c.push(null!=f&&L.call(f)==H?t(f,e):encodeURIComponent(e)+"="+encodeURIComponent(f))}return c.join("&")}function u(a){for(var b=a.split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");c[v(e[0])]=e[1]?v(e[1]):1===e.length?!0:""}return c}function v(a){return decodeURIComponent(a.replace(/\+/g," "))}function w(a){var b=m(a);h(a.childNodes,S[b]),S[b]=c}function x(a){var b=e.prop();return a.then(b),b.then=function(b,c){return x(a.then(b,c))},b}function y(a,b){function c(a){l=a||j,n.map(function(a){l==i&&a.resolve(m)||a.reject(m)})}function d(a,b,c,d){if((null!=m&&L.call(m)==H||typeof m==K)&&typeof a==K)try{var f=0;a.call(m,function(a){f++||(m=a,b())},function(a){f++||(m=a,c())})}catch(g){e.deferred.onerror(g),m=g,c()}else d()}function f(){var j;try{j=m&&m.then}catch(n){return e.deferred.onerror(n),m=n,l=h,f()}d(j,function(){l=g,f()},function(){l=h,f()},function(){try{l==g&&typeof a==K?m=a(m):l==h&&"function"==typeof b&&(m=b(m),l=g)}catch(f){return e.deferred.onerror(f),m=f,c()}m==k?(m=TypeError(),c()):d(j,function(){c(i)},c,function(){c(l==g&&i)})})}var g=1,h=2,i=3,j=4,k=this,l=0,m=0,n=[];k.promise={},k.resolve=function(a){return l||(m=a,l=g,f()),this},k.reject=function(a){return l||(m=a,l=h,f()),this},k.promise.then=function(a,b){var c=new y(a,b);return l==i?c.resolve(m):l==j?c.reject(m):n.push(c),c.promise}}function z(a){return a}function A(a){if(!a.dataType||"jsonp"!==a.dataType.toLowerCase()){var d=new b.XMLHttpRequest;if(d.open(a.method,a.url,!0,a.user,a.password),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?a.onload({type:"load",target:d}):a.onerror({type:"error",target:d}))},a.serialize==JSON.stringify&&a.data&&"GET"!=a.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.deserialize==JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),typeof a.config==K){var e=a.config(d,a);null!=e&&(d=e)}var f="GET"!=a.method&&a.data?a.data:"";if(f&&L.call(f)!=J&&f.constructor!=b.FormData)throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";return d.send(f),d}var g="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),h=D.createElement("script");b[g]=function(d){D.body.removeChild(h),a.onload({type:"load",target:{responseText:d}}),b[g]=c},h.onerror=function(){return D.body.removeChild(h),a.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),b[g]=c,!1},h.onload=function(){return!1},h.src=a.url+(a.url.indexOf("?")>0?"&":"?")+(a.callbackKey?a.callbackKey:"callback")+"="+g+"&"+t(a.data||{}),D.body.appendChild(h)}function B(a,b,c){if("GET"==a.method&&"jsonp"!=a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=t(b);a.url=a.url+(e?d+e:"")}else a.data=c(b);return a}function C(a,b){var c=a.match(/:[a-z]\w+/gi);if(c&&b)for(var d=0;d<c.length;d++){var e=c[d].slice(1);a=a.replace(c[d],b[e]),delete b[e]}return a}var D,E,F,G,H="[object Object]",I="[object Array]",J="[object String]",K="function",L={}.toString,M=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,N=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,O=/AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR/;d(b);var P,Q={appendChild:function(a){P===c&&(P=D.createElement("html")),D.documentElement&&D.documentElement!==a?D.replaceChild(a,D.documentElement):D.appendChild(a),this.childNodes=D.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},R=[],S={};e.render=function(a,b,d){var e=[];if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var g=m(a),i=a==D,j=i||a==D.documentElement?Q:a;i&&"html"!=b.tag&&(b={tag:"html",attrs:{},children:b}),S[g]===c&&h(j.childNodes),d===!0&&w(a),S[g]=f(j,null,c,c,b,S[g],!1,0,null,c,e);for(var k=0;k<e.length;k++)e[k]()},e.trust=function(a){return a=new String(a),a.$trusted=!0,a},e.prop=function(a){return(null!=a&&L.call(a)==H||typeof a==K)&&typeof a.then==K?x(a):n(a)};var T,U=[],V=[],W=[],X=null,Y=0,Z=null,$=16;e.module=function(a,b){var c=U.indexOf(a);0>c&&(c=U.length);var d=!1;if(W[c]&&typeof W[c].onunload==K){var f={preventDefault:function(){d=!0}};W[c].onunload(f)}if(!d){e.redraw.strategy("all"),e.startComputation(),U[c]=a;var g=T=b,h=new b.controller;return g==T&&(W[c]=h,V[c]=b),e.endComputation(),W[c]}},e.redraw=function(a){X&&a!==!0?(new Date-Y>$||F==b.requestAnimationFrame)&&(X>0&&G(X),X=F(o,$)):(o(),X=F(function(){X=null},$))},e.redraw.strategy=e.prop();var _=0;e.startComputation=function(){_++},e.endComputation=function(){_=Math.max(_-1,0),0==_&&e.redraw()},e.withAttr=function(a,b){return function(c){c=c||event;var d=c.currentTarget||this;b(a in d?d[a]:d.getAttribute(a))}};var ab,bb={pathname:"",hash:"#",search:"?"},cb=function(){},db={};return e.route=function(){if(0===arguments.length)return ab;if(3===arguments.length&&L.call(arguments[1])==J){var a=arguments[0],c=arguments[1],d=arguments[2];cb=function(b){var f=ab=p(b);q(a,d,f)||e.route(c,!0)};var f="hash"==e.route.mode?"onhashchange":"onpopstate";b[f]=function(){ab!=p(E[e.route.mode])&&cb(E[e.route.mode])},Z=s,b[f]()}else if(arguments[0].addEventListener){{var g=arguments[0];arguments[1],arguments[2]}g.href=("pathname"!==e.route.mode?E.pathname:"")+bb[e.route.mode]+this.attrs.href,g.removeEventListener("click",r),g.addEventListener("click",r)}else if(L.call(arguments[0])==J){ab=arguments[0];var h=null!=arguments[1]&&L.call(arguments[1])==H?t(arguments[1]):null;h&&(ab+=(-1===ab.indexOf("?")?"?":"&")+h);var i=(3==arguments.length?arguments[2]:arguments[1])===!0;b.history.pushState?(Z=function(){b.history[i?"replaceState":"pushState"](null,D.title,bb[e.route.mode]+ab),s()},cb(bb[e.route.mode]+ab)):E[e.route.mode]=ab}},e.route.param=function(a){return db[a]},e.route.mode="search",e.deferred=function(){var a=new y;return a.promise=x(a.promise),a},e.deferred.onerror=function(a){if("[object Error]"==L.call(a)&&!a.constructor.toString().match(/ Error/))throw a},e.sync=function(a){function b(a,b){return function(e){return g[a]=e,b||(c="reject"),0==--f&&(d.promise(g),d[c](g)),e}}var c="resolve",d=e.deferred(),f=a.length,g=new Array(f);if(a.length>0)for(var h=0;h<a.length;h++)a[h].then(b(h,!0),b(h,!1));else d.resolve([]);return d.promise},e.request=function(a){a.background!==!0&&e.startComputation();var b=e.deferred(),c=a.dataType&&"jsonp"===a.dataType.toLowerCase(),d=a.serialize=c?z:a.serialize||JSON.stringify,f=a.deserialize=c?z:a.deserialize||JSON.parse,g=a.extract||function(a){return 0===a.responseText.length&&f===JSON.parse?null:a.responseText};return a.url=C(a.url,a.data),a=B(a,a.data,d),a.onload=a.onerror=function(c){try{c=c||event;var d=("load"==c.type?a.unwrapSuccess:a.unwrapError)||z,h=d(f(g(c.target,a)));if("load"==c.type)if(L.call(h)==I&&a.type)for(var i=0;i<h.length;i++)h[i]=new a.type(h[i]);else a.type&&(h=new a.type(h));b["load"==c.type?"resolve":"reject"](h)}catch(c){e.deferred.onerror(c),b.reject(c)}a.background!==!0&&e.endComputation()},A(a),b.promise(a.initialValue),b.promise},e.deps=function(a){return d(b=a||b),b},e.deps.factory=a,e}("undefined"!=typeof window?window:{}),"undefined"!=typeof module&&null!==module&&(module.exports=m),"function"==typeof define&&define.amd&&define(function(){return m});
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
  var anchor, anchor_preview, br, id_num, link, link_regexp, link_regexp_g, player, random, random_preview, space, unanchor, unbr, unhtml, unrandom, uri_to_link;
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
      return "<a anchor=\"" + a + "," + turn + "," + id + "\" class=\"mark\">&gt;&gt;" + id + "</a>";
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
      return "<a random=\"" + cmd + "," + val + "\" class=\"mark\">" + val + "</a>";
    });
  };
  random_preview = function(log) {
    return log.replace(/\[\[([^\[]+)\]\]/g, function(key, val) {
      return "<a random=\"" + val + ",？\" class=\"mark\">" + val + "</a>";
    });
  };
  link_regexp = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/;
  link_regexp_g = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/g;
  id_num = 0;
  uri_to_link = _.memoize(function(uri) {
    var host, path, protocol, _ref;
    id_num++;
    _ref = uri.match(link_regexp), uri = _ref[0], protocol = _ref[1], host = _ref[2], path = _ref[3];
    return "<span external=\"link_" + id_num + "," + uri + "," + protocol + "," + host + "," + path + "\" class=\"badge\">LINK - " + protocol + "</span>";
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

win = {
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
    scroll: function(e) {
      var docElem;
      docElem = document.documentElement;
      win.left = window.pageXOffset || window.scrollX;
      win.left -= docElem.clientTop;
      win.top = window.pageYOffset || window.scrollY;
      win.top -= docElem.clientLeft;
      win.bottom = win.top + win.height;
      win.right = win.left + win.width;
      return win.do_event_list(win.on.scroll, e);
    },
    gesture: function(e) {
      return win.do_event_list(win.on.gesture, e);
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
    start: function(e) {
      win.is_tap = true;
      return win.do_event_list(win.on.start, e);
    },
    move: function(e) {
      if (win.is_tap) {
        return win.do_event_list(win.on.drag, e);
      } else {
        return win.do_event_list(win.on.move, e);
      }
    },
    end: function(e) {
      win.is_tap = false;
      return win.do_event_list(win.on.end, e);
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
    gesture: [],
    orientation: [],
    motion: [],
    start: [],
    move: [],
    drag: [],
    end: [],
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
var Cache;

Cache = (function() {
  function Cache() {}

  Cache.rule = {};

  return Cache;

})();

Cache.Query = (function() {
  function Query(finder) {
    this.finder = finder;
    this.q = {};
  }

  Query.prototype.where = function(scopes) {
    var query;
    query = new Cache.Query(this.finder);
    query.q = _.extend({}, this.q, scopes);
    return query;
  };

  Query.prototype.search = function(text) {
    var item, list;
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
    this.finder.search(new RegExp(list.join("|"), "ig"));
    return this.where({
      search: ["match"]
    });
  };

  Query.prototype.find = function(id, kind, scope) {
    if (kind == null) {
      kind = "all";
    }
    if (scope == null) {
      scope = "_all";
    }
    return this.finder.scopes[scope].hash[kind][id];
  };

  Query.prototype.sort = function(desc) {
    return this.finder.sort_func(desc, this.finder.list(this.q));
  };

  Query.prototype.list = function() {
    return this.finder.list(this.q);
  };

  return Query;

})();

Cache.Finder = (function() {
  function Finder(scopes, sort_func) {
    this.scopes = scopes;
    this.sort_func = sort_func;
    this.all = new Cache.Query(this);
    this.base_map = (function(_this) {
      return function() {
        return _this.scopes._all.hash.all;
      };
    })(this);
    this.map = function(o) {
      return o._id;
    };
  }

  Finder.prototype.search = function(search_regexp) {
    var all, scope;
    this.search_regexp = search_regexp;
    all = _.values(this.base_map());
    scope = this.scopes.search;
    scope.hash = {};
    scope.merge(all);
    return this.map_reduce({
      search: this.scopes.search
    });
  };

  Finder.prototype.list = function(query) {
    var id, kind, kind_hash, kinds, scope, val, _i, _len, _ref, _results;
    _ref = this.base_map();
    _results = [];
    for (id in _ref) {
      val = _ref[id];
      for (scope in query) {
        kinds = query[scope];
        val = null;
        for (_i = 0, _len = kinds.length; _i < _len; _i++) {
          kind = kinds[_i];
          kind_hash = this.scopes[scope].hash[kind];
          if (!kind_hash) {
            continue;
          }
          val = kind_hash != null ? kind_hash[id] : void 0;
          if (val) {
            break;
          }
        }
        if (!val) {
          break;
        }
      }
      if (!val) {
        continue;
      }
      _results.push(val);
    }
    return _results;
  };

  Finder.prototype.refresh = function() {
    this.cache = {};
    return this.diff = {};
  };

  Finder.prototype.map_reduce = function(scopes) {
    var calc, emit, first, hash, id, init, kind_key, map, reduce, scope, scope_key, target, val, _base, _ref, _ref1, _ref2, _ref3, _results;
    init = function(val) {
      return {
        count: 0,
        sum: 0
      };
    };
    if (scopes != null) {
      if ((_base = this.all).reduce == null) {
        _base.reduce = {};
      }
    } else {
      this.all.reduce = {};
      scopes = this.scopes;
    }
    _ref = this.base_map();
    for (id in _ref) {
      val = _ref[id];
      for (scope_key in scopes) {
        scope = scopes[scope_key];
        this.all.reduce[scope_key] = {};
        _ref1 = scope.hash;
        for (kind_key in _ref1) {
          hash = _ref1[kind_key];
          first = this.map(val);
          this.all.reduce[scope_key][kind_key] = init(first);
        }
      }
      break;
    }
    switch (typeof first) {
      case "number":
        this.reduce_calc = true;
        map = function(val) {
          return {
            max: val,
            min: val,
            count: 1,
            sum: val
          };
        };
        break;
      default:
        map = function(val) {
          return {
            max: val,
            min: val,
            count: 1
          };
        };
    }
    reduce = (function(_this) {
      return function(target, emit, val) {
        if (!(emit.max <= target.max)) {
          target.max = emit.max;
          target.last = val;
        }
        if (!(target.min <= emit.min)) {
          target.min = emit.min;
          target.first = val;
        }
        if (emit.count) {
          target.count += emit.count;
        }
        if (emit.sum) {
          return target.sum += emit.sum;
        }
      };
    })(this);
    calc = (function(_this) {
      return function(target) {
        if (_this.reduce_calc) {
          return target.avg = target.sum / target.count;
        }
      };
    })(this);
    _ref2 = this.base_map();
    for (id in _ref2) {
      val = _ref2[id];
      emit = map(this.map(val));
      for (scope_key in scopes) {
        scope = scopes[scope_key];
        _ref3 = scope.hash;
        for (kind_key in _ref3) {
          hash = _ref3[kind_key];
          target = this.all.reduce[scope_key][kind_key];
          if (hash[val._id] != null) {
            reduce(target, emit, val);
          }
        }
      }
    }
    _results = [];
    for (scope_key in scopes) {
      scope = scopes[scope_key];
      _results.push((function() {
        var _ref4, _results1;
        _ref4 = scope.hash;
        _results1 = [];
        for (kind_key in _ref4) {
          hash = _ref4[kind_key];
          target = this.all.reduce[scope_key][kind_key];
          _results1.push(calc(target));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return Finder;

})();

Cache.Rule = (function() {
  function Rule(field) {
    this.id = "" + field + "_id";
    this.list_name = "" + field + "s";
    this.validates = [];
    this.responses = [];
    this.adjust = {
      _id: function(o) {
        if (!o._id) {
          return o._id = o[this.id];
        }
      }
    };
    this.adjust[this.id] = (function(_this) {
      return function(o) {
        if (!o[_this.id]) {
          return o[_this.id] = o._id;
        }
      };
    })(this);
    this.adjust_keys = ["_id", this.id];
    this.finder = new Cache.Finder({}, function(list) {
      return list;
    });
    this.base_scope("_all", {
      kind: function() {
        return ["all"];
      },
      finder: this.finder
    });
    Cache.rule[field] = this;
    Cache[this.list_name] = this.finder.all;
  }

  Rule.prototype.base_scope = function(key, hash) {
    var all, scope;
    this.finder.scopes[key] = scope = new Cache.Scope(this, hash);
    this.finder.scope_keys = Object.keys(this.finder.scopes).sort().reverse();
    scope.cleanup();
    all = _.values(this.finder.base_map());
    if (0 < (all != null ? all.length : void 0)) {
      scope.merge(all);
    }
    return scope;
  };

  Rule.prototype.schema = function(cb) {
    var definer, order_base;
    order_base = (function(_this) {
      return function(func) {
        _this.finder.map = func;
        return _this.finder.sort_func = function(desc, list) {
          var gt, lt, o, s, _i, _len, _ref;
          _ref = desc ? [1, -1] : [-1, 1], lt = _ref[0], gt = _ref[1];
          _this.finder.orders = s = {};
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            o = list[_i];
            s[o._id] = func(o);
          }
          return list.sort(function(a, b) {
            if (s[a._id] < s[b._id]) {
              return lt;
            }
            if (s[a._id] > s[b._id]) {
              return gt;
            }
            return 0;
          });
        };
      };
    })(this);
    definer = {
      scope: (function(_this) {
        return function(key, kind) {
          var cache;
          cache = Cache[_this.list_name];
          return _this.base_scope(key, {
            kind: kind,
            finder: _this.finder
          });
        };
      })(this),
      search: (function(_this) {
        return function(targets) {
          var kind;
          kind = function(o) {
            var regexp, text, _i, _len, _ref;
            regexp = _this.finder.search_regexp;
            if (regexp) {
              _ref = targets(o);
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                text = _ref[_i];
                if (text && text.match(regexp)) {
                  return ["match"];
                }
              }
            }
            return [];
          };
          return _this.base_scope("search", {
            kind: kind,
            finder: _this.finder
          });
        };
      })(this),
      pager: (function(_this) {
        return function(key, items) {};
      })(this),
      belongs_to: (function(_this) {
        return function(parent, option) {
          var cache, parent_id, parents;
          cache = Cache[_this.list_name];
          parents = "" + parent + "s";
          parent_id = "" + parent + "_id";
          _this.base_scope(parent, {
            kind: function(o) {
              return [o[parent_id]];
            },
            finder: _this.finder
          });
          if ((option != null ? option.dependent : void 0) != null) {
            _this.validates.push(function(o) {
              var that, _ref;
              that = (_ref = Cache[parents]) != null ? _ref.find(o[parent_id]) : void 0;
              if (that != null) {
                return o[parent] = that;
              }
            });
            return Cache.rule[parent].responses.push(_this);
          }
        };
      })(this),
      order: (function(_this) {
        return function(func) {
          return order_base(func);
        };
      })(this),
      order_by: (function(_this) {
        return function(key) {
          return order_base(function(o) {
            return o[key];
          });
        };
      })(this),
      fields: (function(_this) {
        return function(adjust) {
          var key, _results;
          _results = [];
          for (key in adjust) {
            cb = adjust[key];
            _results.push(_this.adjust[key] = cb);
          }
          return _results;
        };
      })(this),
      protect: (function(_this) {
        return function(key) {
          return _this.adjust[key] = function(o, old) {
            if (old != null) {
              return o[key] = old[key];
            }
          };
        };
      })(this)
    };
    cb.call(definer, this);
    return this.adjust_keys = _.keys(this.adjust).sort();
  };

  Rule.prototype.set_base = function(from, cb) {
    var accept, all, key, list, o, old, scope, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
    all = this.finder.base_map();
    list = [];
    accept = (function(_this) {
      return function(o) {
        var validate, _i, _len, _ref;
        _ref = _this.validates;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          validate = _ref[_i];
          if (!validate(o)) {
            return;
          }
        }
        return list.push(o);
      };
    })(this);
    _ref = from || [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      accept(o);
    }
    for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
      o = list[_j];
      old = all != null ? all[o._id] : void 0;
      _ref1 = this.adjust_keys;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        key = _ref1[_k];
        this.adjust[key](o, old);
      }
    }
    _ref2 = this.finder.scope_keys;
    for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
      key = _ref2[_l];
      scope = this.finder.scopes[key];
      cb(scope, list);
    }
    this.finder.map_reduce();
  };

  Rule.prototype.reject = function(list) {
    var rule, _i, _len, _ref, _results;
    this.set_base(list, function(scope, list) {
      return scope.reject(list);
    });
    _ref = this.responses;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      if (this.finder.diff.del || this.finder.diff.change) {
        _results.push(rule.rehash());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Rule.prototype.merge = function(list) {
    return this.set_base(list, function(scope, list) {
      return scope.merge(list);
    });
  };

  Rule.prototype.set = function(list) {
    var rule, _i, _len, _ref, _results;
    this.set_base(list, function(scope, list) {
      scope.hash = {};
      return scope.merge(list);
    });
    _ref = this.responses;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      if (this.finder.diff.del || this.finder.diff.change) {
        _results.push(rule.rehash());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Rule.prototype.rehash = function() {
    var all;
    all = _.values(this.finder.base_map());
    return this.set(all);
  };

  Rule.prototype.cleanup = function() {
    var key, scope, _i, _len, _ref, _results;
    _ref = this.finder.scope_keys;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      scope = this.finder.scopes[key];
      _results.push(scope.cleanup());
    }
    return _results;
  };

  return Rule;

})();

Cache.Scope = (function() {
  function Scope(rule, _arg) {
    this.rule = rule;
    this.kind = _arg.kind, this.finder = _arg.finder;
  }

  Scope.prototype.adjust = function(list, merge_phase) {
    var all, o, old, old_kind, _i, _j, _len, _len1, _ref;
    all = this.finder.base_map();
    this.finder.refresh();
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      o = list[_i];
      if (all != null) {
        old = all[o._id];
      }
      if (old != null) {
        _ref = this.kind(old) || [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          old_kind = _ref[_j];
          if (this.hash[old_kind] != null) {
            this.finder.diff.del = true;
            delete this.hash[old_kind][o._id];
          }
        }
      }
      merge_phase(o);
    }
  };

  Scope.prototype.reject = function(list) {
    return this.adjust(list, function() {});
  };

  Scope.prototype.merge = function(list) {
    return this.adjust(list, (function(_this) {
      return function(o) {
        var kind, _base, _i, _len, _ref;
        _ref = _this.kind(o) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kind = _ref[_i];
          if (kind || kind === 0) {
            (_base = _this.hash)[kind] || (_base[kind] = {});
            if (_this.hash[kind][o._id]) {
              _this.finder.diff.change = true;
            } else {
              _this.finder.diff.add = true;
            }
            _this.hash[kind][o._id] = o;
          }
        }
      };
    })(this));
  };

  Scope.prototype.cleanup = function() {
    return this.hash = {};
  };

  return Scope;

})();


/*
new Cache.Append  face: []

new Cache.Replace rule: []
new Cache.Guard   text: ["potof"], ["target", "targets","text", "style", "count"]
new Cache.Guard   vote: ["potof"], ["target", "targets"]

new Cache.Replace site:  []
new Cache.Replace story: ["site"]
new Cache.Append  event: ["story"]
new Cache.Append  scene: ["site"]

new Cache.Append message: ["scene"]
new Cache.Replace  potof: ["scene"]

Cache.data =
  form:
    role: {}
    text:
      title: "title-write"
      cmd: "write"
      csid_cid: ""
      text: ""
      style: ""
      target: ""
      targets: []
    vote: {}
    is_preview: off

    texts:
      - cmd: entry
        title:
        text:
        style:
        csid_cid:
        csid_cids:
        role:
        roles:
        is_preview:
        img: ->
        preview: ->
        request: ->
      - cmd: action
        title:
        text:
        target:
        targets:
        action:
        actions:
        no:
        nos:
        is_preview:
        preview: ->
        request: ->

      targets:
      - cmd: vote
        jst: target
        title:
        target:
        target2:
        targets:
        request: ->
      - cmd: entrust
        title:
        target:
        targets:
        request: ->
      - cmd: role
        title:
        target:
        target2:
        targets:
        request: ->
      - cmd: gift
        title:
        target:
        target2:
        targets:
        request: ->

      commands:
      - cmd: kick
        jst: target
        title:
        target:
        request: ->
      - cmd: maker
        jst: target
        title:
        target:
        request: ->

      - cmd: muster
        jst: button
        title:
        request: ->
      - cmd: start
        jst: button
        title:
        request: ->
      - cmd: update
        jst: button
        title:
        request: ->
      - cmd: extend
        jst: button
        title:
        request: ->
      - cmd: scrapvil
        jst: button
        title:
        request: ->

      links:
      - cmd: exit
        jst: button
        title:
        request: ->
      - cmd: makevilform
        title:
        request: ->

      side:
      - cmd: rolelist
        trsid:
        game:
        request: ->

  stories:
  events:
  potofs:
  story:
    story_id:
  event:
    story_id:
    event_id:
  potof:
    story_id:
    potof_id:
    user_id:
    sow_autn_id:

    longname:
    shortname:
    name:

    win:
      visible:
      result:
    point:
      actaddpt:
      saidpoint:
      saidcount:
    say:
      say:
      tsay:
      spsay:
      wsay:
      gsay:
      say_act:
    is:
      voter:
      human:
      enemy:
      wolf:
      pixi:
      sensible:
      committer:
    timer:
      entry:
      entry_expired:

    live:
    love:
    overhear:

    history:
    status:
 */
;
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
    var pageX, pageY, target;
    pageX = _arg.pageX, pageY = _arg.pageY, target = _arg.target;
    return this.pStart = {
      x: pageX,
      y: pageY,
      at: _.now(),
      target: target
    };
  };

  Gesture.prototype.move = function(_arg) {
    var is_fast, pageX, pageY, target;
    pageX = _arg.pageX, pageY = _arg.pageY, target = _arg.target;
    this.pEnd = {
      x: pageX,
      y: pageY,
      at: _.now(),
      target: target
    };
    if ((this.pStart != null) && (this.pEnd != null)) {
      this.diff = {
        x: this.pEnd.x - this.pStart.x,
        y: this.pEnd.y - this.pStart.y,
        at: this.pEnd.at - this.pStart.at
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

GUI = {
  img_head: "http://7korobi.gehirn.ne.jp/images",
  portrate: function(face_id) {
    var attr, dom;
    dom = null;
    attr = GUI.attrs(function() {
      this.over(function() {
        return GUI.Animate.jelly.up(dom);
      });
      return this.out(function() {
        return GUI.Animate.jelly.down(dom);
      });
    });
    attr.config = function(elem, isInit, context) {
      return dom = elem;
    };
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
  attrs_to: function(parent, query, cb) {
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
        _ref2 = GUI.attrs(attr_cb(elem, data, cb));
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
  attrs: function(dsl, thru) {
    var act, func, o;
    o = {};
    act = function(cb) {
      return function(e) {
        cb(e);
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
          e1 = (_ref = event.changedTouches) != null ? _ref[0] : void 0;
          return gesture.start(e1 || e);
        });
        move = act(function(e) {
          var e1, _ref;
          e1 = (_ref = event.changedTouches) != null ? _ref[0] : void 0;
          return gesture.move(e1 || e);
        });
        end = act(function(e) {
          return gesture.end(e);
        });
        cancel = act(function(e) {
          return gesture.cancel(e);
        });
        o.onmousedown = start;
        o.ontouchstart = start;
        o.onmousemove = move;
        o.ontouchmove = move;
        o.onmouseup = end;
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
      start: function(cb) {
        cb = act(cb);
        o.onmousedown = cb;
        o.ongesturestart = cb;
        return o.ontouchstart = cb;
      },
      end: function(cb) {
        cb = act(cb);
        o.onmouseup = cb;
        o.ongestureend = cb;
        return o.ontouchend = cb;
      },
      over: function(cb) {
        cb = act(cb);
        o.onmouseover = cb;
        o.ongesturestart = cb;
        return o.ontouchstart = cb;
      },
      out: function(cb) {
        cb = act(cb);
        o.onmousedown = cb;
        o.onmouseout = cb;
        o.ongestureend = cb;
        return o.ontouchend = cb;
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
      }
    };
    return m("ul.mark.inline", cb.call(list_cmds));
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
  name: {
    config: function(o) {
      var _ref, _ref1, _ref2;
      return ((_ref = RAILS.roles[o]) != null ? _ref.name : void 0) || ((_ref1 = RAILS.gifts[o]) != null ? _ref1.name : void 0) || ((_ref2 = RAILS.events[o]) != null ? _ref2.name : void 0) || o || "";
    }
  },
  names: {
    config: function(list, cb) {
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
        _results.push(cb(GUI.name.config(key), size));
      }
      return _results;
    }
  },
  letter: function() {
    var head, style, vdom;
    style = arguments[0], head = arguments[1], vdom = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    return [m("h3.mesname", m("b", head)), m("p.text." + style, vdom)];
  }
};
GUI.Animate = (function() {
  var apply, jelly_down, jelly_up, zIndex;

  function Animate() {}

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

  function Layout(dx, dy, box, animation) {
    this.dx = dx;
    this.dy = dy;
    this.box = box;
    this.animation = animation != null ? animation : function() {};
    if (!this.box) {
      return;
    }
    GUI.Layout.list[this.box.id] = this;
    this.mode = "show";
    this.box.style.zIndex = _.now();
  }

  Layout.prototype.show = function() {
    var height, left, top, width;
    width = win.width - this.box.offsetWidth;
    height = win.height - this.box.offsetHeight;
    if (0 === this.dx) {
      left = this.box.parentElement.offsetLeft;
    }
    if (this.dx < 0) {
      left = this.dx + width;
    }
    if (0 < this.dx) {
      left = this.dx;
    }
    if (this.dy < 0) {
      top = this.dy + height;
    }
    if (0 < this.dy) {
      top = this.dy;
    }
    return {
      x: left,
      y: top,
      w: this.box.offsetWidth,
      h: this.box.offsetHeight,
      win: {
        left: win.left,
        top: win.top
      }
    };
  };

  Layout.prototype.hide = function() {
    var left, top;
    if (0 === this.dx) {
      left = this.box.parentElement.offsetLeft;
    }
    if (this.dx < 0) {
      left = -this.dx + win.width;
    }
    if (0 < this.dx) {
      left = -this.dx - this.box.offsetWidth;
    }
    if (this.dy < 0) {
      top = -this.dy + win.height;
    }
    if (0 < this.dy) {
      top = -this.dy - this.box.offsetHeight;
    }
    return {
      x: left,
      y: top,
      w: this.box.offsetWidth,
      h: this.box.offsetHeight,
      win: {
        left: win.left,
        top: win.top
      }
    };
  };

  Layout.prototype.transform = function(_arg) {
    var transform, x, y;
    x = _arg.x, y = _arg.y;
    if (0 === this.dx) {
      this.box.style.width = "" + this.box.parentElement.offsetWidth + "px";
    }
    if (head.browser.ios) {
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

  Layout.prototype.transition = function(duration) {
    var transition;
    this.duration = duration;
    if (head.browser.ios) {
      this.duration /= 4;
      return;
    }
    transition = this.duration ? "all " + this.duration + "ms ease-in-out 0" : "";
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
    if (!this.box) {
      return;
    }
    if (!this.from) {
      window.requestAnimationFrame((function(_this) {
        return function() {
          _this.transition(DELAY.andante);
          return _this.translate();
        };
      })(this));
      this.from = this.hide();
      this.transform(this.from);
      return;
    }
    to = this[this.mode]();
    if (this.from.x === to.x && this.from.y === to.y && this.from.w === to.w && this.from.h === to.h && this.from.win.left === win.left && this.from.win.top === win.top) {
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
var __slice = [].slice;

GUI.message = (function() {
  var deco_action;
  deco_action = {
    config: function(parent, is_continue, context) {
      GUI.attrs_to(parent, "a[anchor]", function(a, turn, id) {
        return this.start(function(e) {
          return console.log([a, turn, id]);
        });
      });
      GUI.attrs_to(parent, "a[random]", function(cmd, val) {
        return this.start(function(e) {
          return console.log([cmd, val]);
        });
      });
      return GUI.attrs_to(parent, "span[external]", function(id, uri, protocol, host, path) {
        return this.start(function(e) {
          return console.log([id, uri, protocol, host, path]);
        });
      });
    }
  };
  return {
    story: function(story) {
      var mob, option, option_id, rating, roletable, saycnt;
      mob = RAILS.mob[story.type.mob];
      rating = RAILS.rating[story.rating];
      saycnt = RAILS.saycnt[story.type.say];
      roletable = RAILS.roletable[story.type.roletable];
      return m(".ADMIN.guide", [
        GUI.letter("head", story.name, m("dl.dl-horizontal.note", m("dt.text", "こだわり"), m("dd.text", m("img.pull-left", {
          src: GUI.img_head + ("/icon/cd_" + story.rating + ".png")
        }), rating.caption), m("dt.text", "発言制限"), m("dd.text", m.trust(saycnt != null ? saycnt.CAPTION : void 0), m("br"), m.trust(saycnt != null ? saycnt.HELP : void 0)), m("dt.text", "更新"), m("dd.text", story.view.update_at + "(" + story.view.update_interval + "ごと)"))), GUI.letter("", story.view.game_rule, m("ul.note", m.trust(RAILS.game_rule[story.type.game].HELP)), m("ul.note", (function() {
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
        })())), GUI.letter("head", "" + story.view.player_length + "人の配役設定", m("div", roletable), m("div", m("span.mark", "事件"), story.view.event_cards), m("div", m("span.mark", "役職"), story.view.role_cards), m("div", m("span.mark", "見物人"), "" + mob.CAPTION + " " + mob.HELP)), m("span.mes_date.pull-right", "managed by ", m("kbd", story.sow_auth_id)), GUI.letter("", "設定", m.trust(story.comment)), JSON.stringify(story)
      ]);
    },

    /*
    "epilogue":0,
    "event":null,
    "say":{},
    "seance":{},
    "turn":0,
     */
    event: function(event, story) {
      var event_card, modes;
      delete event.messages;
      event_card = RAILS.events[event.event];
      modes = [];
      if (event.turn === event.grudge) {
        modes.push(RAILS.event_state.grudge);
      }
      if (event.turn === event.riot) {
        modes.push(RAILS.event_state.riot);
      }
      if (event.turn === event.scapegoat) {
        modes.push(RAILS.event_state.scapegoat);
      }
      if (_.find(event.eclipse, event.turn)) {
        modes.push(RAILS.event_state.eclipse);
      }
      return m(".MAKER.guide", GUI.letter(event.winner + ".head", event.name, RAILS.winner[event.winner] + "の勝利です。", m("br"), event_card ? m("kbd", event_card) : void 0));
    },
    potofs: function(v) {
      return m("div", ".U.C");
    },
    xxx: function(v) {
      return m("div", ".U.C");
    },
    memo: function(v) {
      return m("div", ".U.C");
    },
    info: function(v) {
      return m("p.text." + v.mestype, deco_action, m.trust(v.log.deco_text));
    },
    admin: function(v) {
      return m(".guide." + v.mestype, m("h3.mesname", m("b", m.trust(v.name))), m("p.text." + v.style, deco_action, m.trust(v.log.deco_text)), m("p.mes_date", m("span.mark", v.anchor), GUI.timer("span", v.updated_timer)));
    },
    action: function(v) {
      return m("." + v.mestype, m(".action", m("p.text." + v.style, deco_action), m("b", m.trust(v.name)), "は、", m("span", m.trust(v.log.deco_text)), GUI.timer("p.mes_date", v.updated_timer)));
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
      return m("table.say." + v.mestype, m("tbody", m("tr", m("td.img", GUI.portrate(v.face_id)), m("td.field", m(".msg", m("h3.mesname", m("b", m.trust(v.name))), m("p.text." + v.style, deco_action, m.trust(v.log.deco_text)), m("p.mes_date", timer))))));
    }
  };
})();
GUI.ScrollSpy = (function() {
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

  ScrollSpy.do_scroll = function() {
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
  };

  ScrollSpy.scroll = _.debounce(ScrollSpy.do_scroll, DELAY.animato);

  win.on.scroll.push(ScrollSpy.scroll);

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

  ScrollSpy.prototype.pager = function(tag, list, cb) {
    var attr, btm, head, idx, key, o, pager_cb, tail, top, vdom, vdom_items;
    this.list = list;
    top = 0;
    btm = list.length - 1;
    idx = _.findIndex(this.list, {
      _id: typeof this.prop === "function" ? this.prop() : void 0
    });
    if (idx < 0) {
      idx = top;
      if (this.show_under) {
        idx = btm;
      }
    } else {

    }
    head = Math.max(top, idx - 5 - Math.ceil(win.height * 2 / this.avg_height));
    tail = Math.min(btm, idx + 5 + Math.ceil(win.height * 3 / this.avg_height));
    if (3 < Math.abs(this.head - head)) {
      this.head = head;
    }
    if (3 < Math.abs(this.tail - tail)) {
      this.tail = tail;
    }
    pager_cb = (function(_this) {
      return function(pager_elem, is_continue, context) {
        var rect, scroll_diff, show_bottom, show_under, show_upper;
        _this.pager_elem = pager_elem;
        rect = _this.pager_elem.getBoundingClientRect();
        show_bottom = win.height - rect.bottom;
        show_under = 0 < show_bottom;
        show_upper = 0 < rect.top;
        _this.avg_height = rect.height / (1 + _this.tail - _this.head);
        scroll_diff = show_bottom - _this.show_bottom;
        console.log([0, show_bottom, "-", _this.show_bottom, "=", scroll_diff]);
        if (show_under && !_this.prop()) {
          window.scrollBy(0, scroll_diff);
          if (!_this.show_under) {
            m.startComputation();
            window.requestAnimationFrame(function() {
              return m.endComputation();
            });
          }
        }
        _this.show_bottom = show_bottom;
        _this.show_under = show_under;
        _this.show_upper = show_upper;
        if (!(show_under === _this.show_under && show_upper === _this.show_upper)) {
          m.startComputation();
          return window.requestAnimationFrame(function() {
            return m.endComputation();
          });
        }
      };
    })(this);
    vdom_items = (function() {
      var _i, _len, _ref, _ref1, _results;
      _ref = this.list.slice(this.head, +this.tail + 1 || 9e9);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        vdom = cb(o);
        _ref1 = this.mark(o._id);
        for (key in _ref1) {
          attr = _ref1[key];
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
              GUI.ScrollSpy.go(id, offset);
              return window.requestAnimationFrame(function() {
                return GUI.ScrollSpy.go(id, offset);
              });
            }
          } else {
            if (!is_continue) {
              if (id === _this.prop()) {
                GUI.ScrollSpy.go(id);
                return window.requestAnimationFrame(function() {
                  return GUI.ScrollSpy.go(id);
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
var __slice = [].slice;

GUI.TouchMenu = (function() {
  var menu_of;

  TouchMenu.icons = new TouchMenu;

  function TouchMenu(menus) {
    this.menus = menus != null ? menus : {};
    this.state = m.prop(false);
  }

  TouchMenu.prototype.by_menu = function() {
    var hash, menu, prop;
    hash = {};
    for (menu in this.menus) {
      prop = this.prop[menu]();
      if (this.all.reduce[menu][prop]) {
        hash[menu] = [prop];
      }
    }
    return this.all.where(hash);
  };

  TouchMenu.prototype.menu_set = function(all, prop, sort_by, menus) {
    var menu_item;
    this.all = all;
    this.prop = prop;
    this.menus = menus;
    menu_item = (function(_this) {
      return function(caption_func, item_func) {
        var caption, key, keys, menu, o, reduce;
        menu = _this.state();
        prop = _this.prop[menu];
        reduce = _this.all.reduce[menu];
        keys = Object.keys(reduce).sort(function(a, b) {
          return reduce[b][sort_by] - reduce[a][sort_by];
        });
        return [
          !((reduce.all != null) && caption_func("all", reduce.all)) ? (o = _this.all.reduce._all.all, item_func(o[sort_by], _this.btn(prop, "all"), "-全体-")) : void 0, (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
              key = keys[_i];
              o = reduce[key];
              caption = caption_func(key, o);
              if (!caption) {
                continue;
              }
              _results.push(item_func(o[sort_by], this.btn(prop, key), caption));
            }
            return _results;
          }).call(_this)
        ];
      };
    })(this);
    return this.helper = {
      btn_group: function(em, caption_func) {
        return menu_item(caption_func, function(size, btn, caption) {
          btn.style = "width: " + em + "em;";
          return m("a", btn, m("span", caption), m("span.badge.pull-right", size));
        });
      },
      btn_list: function(caption_func) {
        return m("ul", menu_item(caption_func, function(size, btn, caption) {
          return m("li.btn-block", btn, m("span", caption), m("span.badge.pull-right", size));
        }));
      }
    };
  };

  menu_of = function(o) {
    return o.menus[o.state()];
  };

  TouchMenu.prototype.menu = function() {
    var menu_cb, vdom;
    vdom = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    menu_cb = menu_of(this);
    if (menu_cb && !this.icon_key) {
      vdom.push(m(".drag", m(".contentframe", menu_cb.call(this.helper, this))));
    }
    return vdom;
  };

  TouchMenu.prototype.start = function(mark) {
    var state;
    state = this.state;
    return GUI.attrs(function() {
      return this.start(function() {
        return state(mark !== state() && mark);
      });
    });
  };

  TouchMenu.prototype.cancel = function() {
    var state;
    state = this.state;
    return GUI.attrs(function() {
      return this.end(function() {
        return state(false);
      });
    });
  };

  TouchMenu.prototype.btn = function(prop, val) {
    var state;
    state = this.state;
    return GUI.attrs(function() {
      if (prop) {
        this.end(function() {
          state(false);
          return prop(val);
        });
        if (val === prop()) {
          return this.className("btn btn-success");
        } else {
          return this.className("btn btn-default");
        }
      }
    });
  };

  TouchMenu.prototype.icon = function(icon_key, menu_cb) {
    this.icon_key = icon_key;
    menu_cb.menu = this;
    return GUI.TouchMenu.icons.menus[this.icon_key] = menu_cb;
  };

  TouchMenu.icons.menu = function() {
    var menu_cb, o, set_menu, vdom;
    vdom = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    set_menu = function(o, cb) {
      if (!cb) {
        return;
      }
      return vdom.push(cb.call(o.helper, o));
    };
    menu_cb = menu_of(this);
    if (menu_cb) {
      o = menu_cb.menu;
      set_menu(o, menu_cb);
      set_menu(o, menu_of(o));
    }
    if (vdom.length) {
      return m(".drag", m(".contentframe", vdom));
    }
  };

  return TouchMenu;

})();
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
  this.remove = function() {
    var arr, el, parent;
    arr = document.getElementsByTagName(hiliteTag);
    while (arr.length && (el = arr[0])) {
      parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  };
  this.apply = function(input) {
    this.remove();
    if (input === undefined || !input) {
      return;
    }
    this.setRegex(input);
    this.hiliteWords(targetNode);
  };
};
var ID, Serial, func, key, _ref;

Serial = (function() {
  var c, n, string_parser, string_serializer, _i, _len, _ref;

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

  Serial.parser = {
    Array: function(val) {
      if (val.split != null) {
        return val.split(",");
      } else {
        return [val];
      }
    },
    Date: function(code) {
      var base, result, _j, _len1;
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
    Number: Number,
    Text: string_parser,
    String: string_parser,
    "null": string_parser,
    undefined: string_parser
  };

  Serial.serializer = {
    Array: function(val) {
      if (val.join != null) {
        return val.join(",");
      } else {
        return [val];
      }
    },
    Date: function(val) {
      var result, time;
      time = Math.ceil(val);
      result = "";
      while (time >= 1) {
        result += Serial.map.to_s[time % Serial.map.size];
        time = Math.floor(time / Serial.map.size);
      }
      return result;
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
var Url;

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
    this.keys = [];
    this.keys_in_url = [];
    this.data = {};
    if (this.options.cookie) {
      Url.cookie[ID.now()] = this;
    }
    this.scanner = new RegExp(this.format.replace(/[.]/ig, function(key) {
      return "\\" + key;
    }).replace(/:([a-z_]+)/ig, (function(_this) {
      return function(_, key) {
        var type, _ref;
        type = (_ref = Url.options[key]) != null ? _ref.type : void 0;
        _this.keys.push(key);
        _this.keys_in_url.push(key);
        _this.parse(key);
        return Serial.url[type];
      };
    })(this), "i"));
  }

  Url.prototype.popstate = function(path, target) {
    var i, key, val, _base, _i, _len, _ref;
    this.data = {};
    this.match = this.scanner.exec(path);
    if (this.match) {
      this.match.shift();
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        key = _ref[i];
        val = decodeURI(this.match[i]);
        this.prop(key)(val, true);
      }
      this.params = Object.keys(this.data);
      if (typeof (_base = this.options).change === "function") {
        _base.change(this.data);
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
      val = this.prop(key)();
      path = path.replace(RegExp(":" + key, "ig"), Serial.serializer[type](val));
    }
    return path;
  };

  Url.prototype.prop = function(key) {
    var prop;
    if (!Url.prop[key]) {
      prop = m.prop();
      Url.prop[key] = (function(_this) {
        return function(val, is_replace) {
          var subkey, subval, type, value, _ref, _ref1, _ref2;
          if (arguments.length) {
            type = (_ref = Url.options[key]) != null ? _ref.type : void 0;
            val = Serial.parser[type](val);
            prop(_this.data[key] = val);
            if (Url.bind[key] != null) {
              _ref1 = Url.bind[key][val];
              for (subkey in _ref1) {
                subval = _ref1[subkey];
                if (key !== subkey) {
                  _this.prop(subkey)(subval, true);
                }
              }
            }
            if (is_replace) {
              return Url.replacestate();
            } else {
              return Url.pushstate();
            }
          } else {
            value = prop();
            if (value != null) {
              return value;
            } else {
              return (_ref2 = Url.options[key]) != null ? _ref2.current : void 0;
            }
          }
        };
      })(this);
    }
    return Url.prop[key];
  };

  Url.prototype.parse = function(key) {
    var obj, subkey, subval, value, _ref, _results;
    this.prop(key);
    if (Url.bind[key] != null) {
      _ref = Url.bind[key];
      _results = [];
      for (value in _ref) {
        obj = _ref[value];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (subkey in obj) {
            subval = obj[subkey];
            if (!Url.prop[subkey]) {
              _results1.push(this.parse(subkey));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }
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


