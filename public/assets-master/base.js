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
 * lodash 3.6.0 (Custom Build) lodash.com/license | Underscore.js 1.8.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */

;(function(){function n(n,t){if(n!==t){var r=n===n,e=t===t;if(n>t||!r||typeof n=="undefined"&&e)return 1;if(n<t||!e||typeof t=="undefined"&&r)return-1}return 0}function t(n,t,r){for(var e=n.length,u=r?e:-1;r?u--:++u<e;)if(t(n[u],u,n))return u;return-1}function r(n,t,r){if(t!==t)return s(n,r);r-=1;for(var e=n.length;++r<e;)if(n[r]===t)return r;return-1}function e(n){return typeof n=="function"||false}function u(n){return typeof n=="string"?n:null==n?"":n+""}function o(n){return n.charCodeAt(0)}function i(n,t){for(var r=-1,e=n.length;++r<e&&-1<t.indexOf(n.charAt(r)););return r
}function f(n,t){for(var r=n.length;r--&&-1<t.indexOf(n.charAt(r)););return r}function a(t,r){return n(t.a,r.a)||t.b-r.b}function c(n){return Wt[n]}function l(n){return Tt[n]}function p(n){return"\\"+Nt[n]}function s(n,t,r){var e=n.length;for(t+=r?0:-1;r?t--:++t<e;){var u=n[t];if(u!==u)return t}return-1}function h(n){return!!n&&typeof n=="object"}function _(n){return 160>=n&&9<=n&&13>=n||32==n||160==n||5760==n||6158==n||8192<=n&&(8202>=n||8232==n||8233==n||8239==n||8287==n||12288==n||65279==n)}function v(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;)n[r]===t&&(n[r]=B,o[++u]=r);
return o}function g(n){for(var t=-1,r=n.length;++t<r&&_(n.charCodeAt(t)););return t}function y(n){for(var t=n.length;t--&&_(n.charCodeAt(t)););return t}function d(n){return Ut[n]}function m(_){function Wt(n){if(h(n)&&!(si(n)||n instanceof Ft)){if(n instanceof Ut)return n;if(Nu.call(n,"__chain__")&&Nu.call(n,"__wrapped__"))return Ee(n)}return new Ut(n)}function Tt(){}function Ut(n,t,r){this.__wrapped__=n,this.__actions__=r||[],this.__chain__=!!t}function Ft(n){this.__wrapped__=n,this.__actions__=null,this.__dir__=1,this.__filtered__=false,this.__iteratees__=null,this.__takeCount__=so,this.__views__=null
}function Nt(){this.__data__={}}function $t(n){var t=n?n.length:0;for(this.data={hash:ro(null),set:new Gu};t--;)this.push(n[t])}function Lt(n,t){var r=n.data;return(typeof t=="string"||He(t)?r.set.has(t):r.hash[t])?0:-1}function Bt(n,t){var r=-1,e=n.length;for(t||(t=wu(e));++r<e;)t[r]=n[r];return t}function zt(n,t){for(var r=-1,e=n.length;++r<e&&false!==t(n[r],r,n););return n}function Pt(n,t){for(var r=-1,e=n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function qt(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;){var i=n[r];
t(i,r,n)&&(o[++u]=i)}return o}function Kt(n,t){for(var r=-1,e=n.length,u=wu(e);++r<e;)u[r]=t(n[r],r,n);return u}function Vt(n){for(var t=-1,r=n.length,e=po;++t<r;){var u=n[t];u>e&&(e=u)}return e}function Yt(n,t){for(var r=-1,e=n.length;++r<e;)if(t(n[r],r,n))return true;return false}function Zt(n,t){return typeof n=="undefined"?t:n}function Gt(n,t,r,e){return typeof n!="undefined"&&Nu.call(e,r)?n:t}function Jt(n,t,r){var e=ji(t);if(!r)return Ht(t,n,e);for(var u=-1,o=e.length;++u<o;){var i=e[u],f=n[i],a=r(f,t[i],i,n,t);
(a===a?a===f:f!==f)&&(typeof f!="undefined"||i in n)||(n[i]=a)}return n}function Xt(n,t){for(var r=-1,e=n.length,u=de(e),o=t.length,i=wu(o);++r<o;){var f=t[r];u?(f=parseFloat(f),i[r]=ve(f,e)?n[f]:w):i[r]=n[f]}return i}function Ht(n,t,r){r||(r=t,t={});for(var e=-1,u=r.length;++e<u;){var o=r[e];t[o]=n[o]}return t}function Qt(n,t,r){var e=typeof n;return"function"==e?typeof t=="undefined"?n:Wr(n,t,r):null==n?gu:"object"==e?vr(n):typeof t=="undefined"?dr(n+""):gr(n+"",t)}function nr(n,t,r,e,u,o,i){var f;
if(r&&(f=u?r(n,e,u):r(n)),typeof f!="undefined")return f;if(!He(n))return n;if(e=si(n)){if(f=se(n),!t)return Bt(n,f)}else{var a=Lu.call(n),c=a==K;if(a!=Y&&a!=z&&(!c||u))return Ct[a]?_e(n,a,t):u?n:{};if(f=he(c?{}:n),!t)return Ht(n,f,ji(n))}for(o||(o=[]),i||(i=[]),u=o.length;u--;)if(o[u]==n)return i[u];return o.push(n),i.push(f),(e?zt:ar)(n,function(e,u){f[u]=nr(e,t,r,u,n,o,i)}),f}function tr(n,t,r){if(typeof n!="function")throw new Ru(L);return Ju(function(){n.apply(w,r)},t)}function rr(n,t){var e=n?n.length:0,u=[];
if(!e)return u;var o=-1,i=pe(),f=i==r,a=f&&200<=t.length?Oo(t):null,c=t.length;a&&(i=Lt,f=false,t=a);n:for(;++o<e;)if(a=n[o],f&&a===a){for(var l=c;l--;)if(t[l]===a)continue n;u.push(a)}else 0>i(t,a,0)&&u.push(a);return u}function er(n,t){var r=true;return Ao(n,function(n,e,u){return r=!!t(n,e,u)}),r}function ur(n,t){var r=[];return Ao(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function or(n,t,r,e){var u;return r(n,function(n,r,o){return t(n,r,o)?(u=e?r:n,false):void 0}),u}function ir(n,t,r){for(var e=-1,u=n.length,o=-1,i=[];++e<u;){var f=n[e];
if(h(f)&&de(f.length)&&(si(f)||Ge(f))){t&&(f=ir(f,t,r));var a=-1,c=f.length;for(i.length+=c;++a<c;)i[++o]=f[a]}else r||(i[++o]=f)}return i}function fr(n,t){ko(n,t,iu)}function ar(n,t){return ko(n,t,ji)}function cr(n,t){return Eo(n,t,ji)}function lr(n,t){for(var r=-1,e=t.length,u=-1,o=[];++r<e;){var i=t[r];_i(n[i])&&(o[++u]=i)}return o}function pr(n,t,r,e,u,o){if(n===t)return 0!==n||1/n==1/t;var i=typeof n,f=typeof t;return"function"!=i&&"object"!=i&&"function"!=f&&"object"!=f||null==n||null==t?n!==n&&t!==t:sr(n,t,pr,r,e,u,o)
}function sr(n,t,r,e,u,o,i){var f=si(n),a=si(t),c=M,l=M;f||(c=Lu.call(n),c==z?c=Y:c!=Y&&(f=eu(n))),a||(l=Lu.call(t),l==z?l=Y:l!=Y&&eu(t));var p=c==Y||u&&c==K,a=l==Y||u&&l==K;if((l=c==l)&&!f&&!p)return fe(n,t,c);if(u){if(!(l||p&&a))return false}else{if(c=p&&Nu.call(n,"__wrapped__"),a=a&&Nu.call(t,"__wrapped__"),c||a)return r(c?n.value():n,a?t.value():t,e,u,o,i);if(!l)return false}for(o||(o=[]),i||(i=[]),c=o.length;c--;)if(o[c]==n)return i[c]==t;return o.push(n),i.push(t),n=(f?ie:ae)(n,t,r,e,u,o,i),o.pop(),i.pop(),n
}function hr(n,t,r,e,u){for(var o=-1,i=t.length,f=!u;++o<i;)if(f&&e[o]?r[o]!==n[t[o]]:!(t[o]in n))return false;for(o=-1;++o<i;){var a=t[o],c=n[a],l=r[o];if(f&&e[o]?a=typeof c!="undefined"||a in n:(a=u?u(c,l,a):w,typeof a=="undefined"&&(a=pr(l,c,u,true))),!a)return false}return true}function _r(n,t){var r=[];return Ao(n,function(n,e,u){r.push(t(n,e,u))}),r}function vr(n){var t=ji(n),r=t.length;if(!r)return vu(true);if(1==r){var e=t[0],u=n[e];if(me(u))return function(n){return null!=n&&n[e]===u&&(typeof u!="undefined"||e in ke(n))
}}for(var o=wu(r),i=wu(r);r--;)u=n[t[r]],o[r]=u,i[r]=me(u);return function(n){return null!=n&&hr(ke(n),t,o,i)}}function gr(n,t){return me(t)?function(r){return null!=r&&r[n]===t&&(typeof t!="undefined"||n in ke(r))}:function(r){return null!=r&&pr(t,r[n],null,true)}}function yr(n,t,r,e,u){if(!He(n))return n;var o=de(t.length)&&(si(t)||eu(t));return(o?zt:ar)(t,function(t,i,f){if(h(t)){e||(e=[]),u||(u=[]);n:{t=e;for(var a=u,c=t.length,l=f[i];c--;)if(t[c]==l){n[i]=a[c],i=void 0;break n}c=n[i],f=r?r(c,l,i,n,f):w;
var p=typeof f=="undefined";p&&(f=l,de(l.length)&&(si(l)||eu(l))?f=si(c)?c:c&&c.length?Bt(c):[]:vi(l)||Ge(l)?f=Ge(c)?uu(c):vi(c)?c:{}:p=false),t.push(l),a.push(f),p?n[i]=yr(f,l,r,t,a):(f===f?f!==c:c===c)&&(n[i]=f),i=void 0}return i}a=n[i],f=r?r(a,t,i,n,f):w,(l=typeof f=="undefined")&&(f=t),!o&&typeof f=="undefined"||!l&&(f===f?f===a:a!==a)||(n[i]=f)}),n}function dr(n){return function(t){return null==t?w:t[n]}}function mr(n,t){return n+Ku(lo()*(t-n+1))}function wr(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)
}),r}function br(n,t,r){var e=-1,u=n.length;for(t=null==t?0:+t||0,0>t&&(t=-t>u?0:u+t),r=typeof r=="undefined"||r>u?u:+r||0,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=wu(u);++e<u;)r[e]=n[e+t];return r}function xr(n,t){var r;return Ao(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function Ar(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function jr(t,r,e){var u=-1,o=t.length,i=de(o)?wu(o):[];return Ao(t,function(n){for(var t=r.length,e=wu(t);t--;)e[t]=null==n?w:n[r[t]];i[++u]={a:e,b:u,c:n}}),Ar(i,function(t,r){var u;
n:{u=-1;for(var o=t.a,i=r.a,f=o.length,a=e.length;++u<f;){var c=n(o[u],i[u]);if(c){u=u<a?c*(e[u]?1:-1):c;break n}}u=t.b-r.b}return u})}function kr(n,t){var r=0;return Ao(n,function(n,e,u){r+=+t(n,e,u)||0}),r}function Er(n,t){var e=-1,u=pe(),o=n.length,i=u==r,f=i&&200<=o,a=f?Oo():null,c=[];a?(u=Lt,i=false):(f=false,a=t?[]:c);n:for(;++e<o;){var l=n[e],p=t?t(l,e,n):l;if(i&&l===l){for(var s=a.length;s--;)if(a[s]===p)continue n;t&&a.push(p),c.push(l)}else 0>u(a,p,0)&&((t||f)&&a.push(p),c.push(l))}return c}function Ir(n,t){for(var r=-1,e=t.length,u=wu(e);++r<e;)u[r]=n[t[r]];
return u}function Or(n,t,r,e){for(var u=n.length,o=e?u:-1;(e?o--:++o<u)&&t(n[o],o,n););return r?br(n,e?0:o,e?o+1:u):br(n,e?o+1:0,e?u:o)}function Rr(n,t){var r=n;r instanceof Ft&&(r=r.value());for(var e=-1,u=t.length;++e<u;){var r=[r],o=t[e];Yu.apply(r,o.args),r=o.func.apply(o.thisArg,r)}return r}function Cr(n,t,r){var e=0,u=n?n.length:e;if(typeof t=="number"&&t===t&&u<=vo){for(;e<u;){var o=e+u>>>1,i=n[o];(r?i<=t:i<t)?e=o+1:u=o}return u}return Sr(n,t,gu,r)}function Sr(n,t,r,e){t=r(t);for(var u=0,o=n?n.length:0,i=t!==t,f=typeof t=="undefined";u<o;){var a=Ku((u+o)/2),c=r(n[a]),l=c===c;
(i?l||e:f?l&&(e||typeof c!="undefined"):e?c<=t:c<t)?u=a+1:o=a}return io(o,_o)}function Wr(n,t,r){if(typeof n!="function")return gu;if(typeof t=="undefined")return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,o){return n.call(t,r,e,u,o)};case 5:return function(r,e,u,o,i){return n.call(t,r,e,u,o,i)}}return function(){return n.apply(t,arguments)}}function Tr(n){return Du.call(n,0)}function Ur(n,t,r){for(var e=r.length,u=-1,o=oo(n.length-e,0),i=-1,f=t.length,a=wu(o+f);++i<f;)a[i]=t[i];
for(;++u<e;)a[r[u]]=n[u];for(;o--;)a[i++]=n[u++];return a}function Fr(n,t,r){for(var e=-1,u=r.length,o=-1,i=oo(n.length-u,0),f=-1,a=t.length,c=wu(i+a);++o<i;)c[o]=n[o];for(i=o;++f<a;)c[i+f]=t[f];for(;++e<u;)c[i+r[e]]=n[o++];return c}function Nr(n,t){return function(r,e,u){var o=t?t():{};if(e=le(e,u,3),si(r)){u=-1;for(var i=r.length;++u<i;){var f=r[u];n(o,f,e(f,u,r),r)}}else Ao(r,function(t,r,u){n(o,t,e(t,r,u),u)});return o}}function $r(n){return function(){var t=arguments,r=t.length,e=t[0];if(2>r||null==e)return e;
var u=t[r-2],o=t[r-1],i=t[3];for(3<r&&typeof u=="function"?(u=Wr(u,o,5),r-=2):(u=2<r&&typeof o=="function"?o:null,r-=u?1:0),i&&ge(t[1],t[2],i)&&(u=3==r?null:u,r=2),o=0;++o<r;)(i=t[o])&&n(e,i,u);return e}}function Lr(n,t){return function(r,e){var u=r?r.length:0;if(!de(u))return n(r,e);for(var o=t?u:-1,i=ke(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}function Br(n){return function(t,r,e){var u=ke(t);e=e(t);for(var o=e.length,i=n?o:-1;n?i--:++i<o;){var f=e[i];if(false===r(u[f],f,u))break}return t}}function zr(n,t){function r(){return(this&&this!==Mt&&this instanceof r?e:n).apply(t,arguments)
}var e=Dr(n);return r}function Mr(n){return function(t){var r=-1;t=hu(au(t));for(var e=t.length,u="";++r<e;)u=n(u,t[r],r);return u}}function Dr(n){return function(){var t=xo(n.prototype),r=n.apply(t,arguments);return He(r)?r:t}}function Pr(n){function t(r,e,u){return u&&ge(r,e,u)&&(e=null),r=oe(r,n,null,null,null,null,null,e),r.placeholder=t.placeholder,r}return t}function qr(n,t){return function(r,e,u){u&&ge(r,e,u)&&(e=null);var i=le(),f=null==e;if(i===Qt&&f||(f=false,e=i(e,u,3)),f){if(e=si(r),e||!ru(r))return n(e?r:je(r));
e=o}return ce(r,e,t)}}function Kr(n,r){return function(e,u,o){return u=le(u,o,3),si(e)?(u=t(e,u,r),-1<u?e[u]:w):or(e,u,n)}}function Vr(n){return function(r,e,u){return r&&r.length?(e=le(e,u,3),t(r,e,n)):-1}}function Yr(n){return function(t,r,e){return r=le(r,e,3),or(t,r,n,true)}}function Zr(n){return function(){var t=arguments.length;if(!t)return function(){return arguments[0]};for(var r,e=n?t:-1,u=0,o=wu(t);n?e--:++e<t;){var i=o[u++]=arguments[e];if(typeof i!="function")throw new Ru(L);var f=r?"":Co(i);
r="wrapper"==f?new Ut([]):r}for(e=r?-1:t;++e<t;)i=o[e],f=Co(i),r=(u="wrapper"==f?Ro(i):null)&&ye(u[0])?r[Co(u[0])].apply(r,u[3]):1==i.length&&ye(i)?r[f]():r.thru(i);return function(){var n=arguments;if(r&&1==n.length&&si(n[0]))return r.plant(n[0]).value();for(var e=0,n=o[e].apply(this,n);++e<t;)n=o[e].call(this,n);return n}}}function Gr(n,t){return function(r,e,u){return typeof e=="function"&&typeof u=="undefined"&&si(r)?n(r,e):t(r,Wr(e,u,3))}}function Jr(n){return function(t,r,e){return(typeof r!="function"||typeof e!="undefined")&&(r=Wr(r,e,3)),n(t,r,iu)
}}function Xr(n){return function(t,r,e){return(typeof r!="function"||typeof e!="undefined")&&(r=Wr(r,e,3)),n(t,r)}}function Hr(n){return function(t,r,e){return(t=u(t))&&(n?t:"")+re(t,r,e)+(n?"":t)}}function Qr(n){var t=Ze(function(r,e){var u=v(e,t.placeholder);return oe(r,n,null,e,u)});return t}function ne(n,t){return function(r,e,u,o){var i=3>arguments.length;return typeof e=="function"&&typeof o=="undefined"&&si(r)?n(r,e,u,i):wr(r,le(e,o,4),u,i,t)}}function te(n,t,r,e,u,o,i,f,a,c){function l(){for(var b=arguments.length,j=b,k=wu(b);j--;)k[j]=arguments[j];
if(e&&(k=Ur(k,e,u)),o&&(k=Fr(k,o,i)),_||y){var j=l.placeholder,E=v(k,j),b=b-E.length;if(b<c){var R=f?Bt(f):null,b=oo(c-b,0),C=_?E:null,E=_?null:E,S=_?k:null,k=_?null:k;return t|=_?I:O,t&=~(_?O:I),g||(t&=~(x|A)),k=[n,t,r,S,C,k,E,R,a,b],R=te.apply(w,k),ye(n)&&So(R,k),R.placeholder=j,R}}if(j=s?r:this,h&&(n=j[m]),f)for(R=k.length,b=io(f.length,R),C=Bt(k);b--;)E=f[b],k[b]=ve(E,R)?C[E]:w;return p&&a<k.length&&(k.length=a),(this&&this!==Mt&&this instanceof l?d||Dr(n):n).apply(j,k)}var p=t&R,s=t&x,h=t&A,_=t&k,g=t&j,y=t&E,d=!h&&Dr(n),m=n;
return l}function re(n,t,r){return n=n.length,t=+t,n<t&&eo(t)?(t-=n,r=null==r?" ":r+"",pu(r,Pu(t/r.length)).slice(0,t)):""}function ee(n,t,r,e){function u(){for(var t=-1,f=arguments.length,a=-1,c=e.length,l=wu(f+c);++a<c;)l[a]=e[a];for(;f--;)l[a++]=arguments[++t];return(this&&this!==Mt&&this instanceof u?i:n).apply(o?r:this,l)}var o=t&x,i=Dr(n);return u}function ue(n){return function(t,r,e,u){var o=le(e);return o===Qt&&null==e?Cr(t,r,n):Sr(t,r,o(e,u,1),n)}}function oe(n,t,r,e,u,o,i,f){var a=t&A;if(!a&&typeof n!="function")throw new Ru(L);
var c=e?e.length:0;if(c||(t&=~(I|O),e=u=null),c-=u?u.length:0,t&O){var l=e,p=u;e=u=null}var s=a?null:Ro(n);return r=[n,t,r,e,u,l,p,o,i,f],s&&(e=r[1],t=s[1],f=e|t,u=t==R&&e==k||t==R&&e==C&&r[7].length<=s[8]||t==(R|C)&&e==k,(f<R||u)&&(t&x&&(r[2]=s[2],f|=e&x?0:j),(e=s[3])&&(u=r[3],r[3]=u?Ur(u,e,s[4]):Bt(e),r[4]=u?v(r[3],B):Bt(s[4])),(e=s[5])&&(u=r[5],r[5]=u?Fr(u,e,s[6]):Bt(e),r[6]=u?v(r[5],B):Bt(s[6])),(e=s[7])&&(r[7]=Bt(e)),t&R&&(r[8]=null==r[8]?s[8]:io(r[8],s[8])),null==r[9]&&(r[9]=s[9]),r[0]=s[0],r[1]=f),t=r[1],f=r[9]),r[9]=null==f?a?0:n.length:oo(f-c,0)||0,(s?Io:So)(t==x?zr(r[0],r[2]):t!=I&&t!=(x|I)||r[4].length?te.apply(w,r):ee.apply(w,r),r)
}function ie(n,t,r,e,u,o,i){var f=-1,a=n.length,c=t.length,l=true;if(a!=c&&(!u||c<=a))return false;for(;l&&++f<a;){var p=n[f],s=t[f],l=w;if(e&&(l=u?e(s,p,f):e(p,s,f)),typeof l=="undefined")if(u)for(var h=c;h--&&(s=t[h],!(l=p&&p===s||r(p,s,e,u,o,i))););else l=p&&p===s||r(p,s,e,u,o,i)}return!!l}function fe(n,t,r){switch(r){case D:case P:return+n==+t;case q:return n.name==t.name&&n.message==t.message;case V:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case Z:case G:return n==t+""}return false}function ae(n,t,r,e,u,o,i){var f=ji(n),a=f.length,c=ji(t).length;
if(a!=c&&!u)return false;for(var c=u,l=-1;++l<a;){var p=f[l],s=u?p in t:Nu.call(t,p);if(s){var h=n[p],_=t[p],s=w;e&&(s=u?e(_,h,p):e(h,_,p)),typeof s=="undefined"&&(s=h&&h===_||r(h,_,e,u,o,i))}if(!s)return false;c||(c="constructor"==p)}return c||(r=n.constructor,e=t.constructor,!(r!=e&&"constructor"in n&&"constructor"in t)||typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)?true:false}function ce(n,t,r){var e=r?so:po,u=e,o=u;return Ao(n,function(n,i,f){i=t(n,i,f),((r?i<u:i>u)||i===e&&i===o)&&(u=i,o=n)
}),o}function le(n,t,r){var e=Wt.callback||_u,e=e===_u?Qt:e;return r?e(n,t,r):e}function pe(n,t,e){var u=Wt.indexOf||Ce,u=u===Ce?r:u;return n?u(n,t,e):u}function se(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&Nu.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function he(n){return n=n.constructor,typeof n=="function"&&n instanceof n||(n=Eu),new n}function _e(n,t,r){var e=n.constructor;switch(t){case J:return Tr(n);case D:case P:return new e(+n);case X:case H:case Q:case nt:case tt:case rt:case et:case ut:case ot:return t=n.buffer,new e(r?Tr(t):t,n.byteOffset,n.length);
case V:case G:return new e(n);case Z:var u=new e(n.source,dt.exec(n));u.lastIndex=n.lastIndex}return u}function ve(n,t){return n=+n,t=null==t?yo:t,-1<n&&0==n%1&&n<t}function ge(n,t,r){if(!He(r))return false;var e=typeof t;return"number"==e?(e=r.length,e=de(e)&&ve(t,e)):e="string"==e&&t in r,e?(t=r[t],n===n?n===t:t!==t):false}function ye(n){var t=Co(n);return!!t&&n===Wt[t]&&t in Ft.prototype}function de(n){return typeof n=="number"&&-1<n&&0==n%1&&n<=yo}function me(n){return n===n&&(0===n?0<1/n:!He(n))}function we(n,t){n=ke(n);
for(var r=-1,e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])}return u}function be(n,t){var r={};return fr(n,function(n,e,u){t(n,e,u)&&(r[e]=n)}),r}function xe(n){var t;if(!h(n)||Lu.call(n)!=Y||!(Nu.call(n,"constructor")||(t=n.constructor,typeof t!="function"||t instanceof t)))return false;var r;return fr(n,function(n,t){r=t}),typeof r=="undefined"||Nu.call(n,r)}function Ae(n){for(var t=iu(n),r=t.length,e=r&&n.length,u=Wt.support,u=e&&de(e)&&(si(n)||u.nonEnumArgs&&Ge(n)),o=-1,i=[];++o<r;){var f=t[o];
(u&&ve(f,e)||Nu.call(n,f))&&i.push(f)}return i}function je(n){return null==n?[]:de(n.length)?He(n)?n:Eu(n):fu(n)}function ke(n){return He(n)?n:Eu(n)}function Ee(n){return n instanceof Ft?n.clone():new Ut(n.__wrapped__,n.__chain__,Bt(n.__actions__))}function Ie(n,t,r){return n&&n.length?((r?ge(n,t,r):null==t)&&(t=1),br(n,0>t?0:t)):[]}function Oe(n,t,r){var e=n?n.length:0;return e?((r?ge(n,t,r):null==t)&&(t=1),t=e-(+t||0),br(n,0,0>t?0:t)):[]}function Re(n){return n?n[0]:w}function Ce(n,t,e){var u=n?n.length:0;
if(!u)return-1;if(typeof e=="number")e=0>e?oo(u+e,0):e;else if(e)return e=Cr(n,t),n=n[e],(t===t?t===n:n!==n)?e:-1;return r(n,t,e||0)}function Se(n){var t=n?n.length:0;return t?n[t-1]:w}function We(n){return Ie(n,1)}function Te(n,t,e,u){if(!n||!n.length)return[];null!=t&&typeof t!="boolean"&&(u=e,e=ge(n,t,u)?null:t,t=false);var o=le();if((o!==Qt||null!=e)&&(e=o(e,u,3)),t&&pe()==r){t=e;var i;e=-1,u=n.length;for(var o=-1,f=[];++e<u;){var a=n[e],c=t?t(a,e,n):a;e&&i===c||(i=c,f[++o]=a)}n=f}else n=Er(n,e);
return n}function Ue(n){for(var t=-1,r=(n&&n.length&&Vt(Kt(n,Fu)))>>>0,e=wu(r);++t<r;)e[t]=Kt(n,dr(t));return e}function Fe(n,t){var r=-1,e=n?n.length:0,u={};for(!e||t||si(n[0])||(t=[]);++r<e;){var o=n[r];t?u[o]=t[r]:o&&(u[o[0]]=o[1])}return u}function Ne(n){return n=Wt(n),n.__chain__=true,n}function $e(n,t,r){return t.call(r,n)}function Le(n,t,r){var e=si(n)?Pt:er;return r&&ge(n,t,r)&&(t=null),(typeof t!="function"||typeof r!="undefined")&&(t=le(t,r,3)),e(n,t)}function Be(n,t,r){var e=si(n)?qt:ur;
return t=le(t,r,3),e(n,t)}function ze(n,t,r,e){var u=n?n.length:0;return de(u)||(n=fu(n),u=n.length),u?(r=typeof r!="number"||e&&ge(t,r,e)?0:0>r?oo(u+r,0):r||0,typeof n=="string"||!si(n)&&ru(n)?r<u&&-1<n.indexOf(t,r):-1<pe(n,t,r)):false}function Me(n,t,r){var e=si(n)?Kt:_r;return t=le(t,r,3),e(n,t)}function De(n,t,r){return(r?ge(n,t,r):null==t)?(n=je(n),t=n.length,0<t?n[mr(0,t-1)]:w):(n=Pe(n),n.length=io(0>t?0:+t||0,n.length),n)}function Pe(n){n=je(n);for(var t=-1,r=n.length,e=wu(r);++t<r;){var u=mr(0,t);
t!=u&&(e[t]=e[u]),e[u]=n[t]}return e}function qe(n,t,r){var e=si(n)?Yt:xr;return r&&ge(n,t,r)&&(t=null),(typeof t!="function"||typeof r!="undefined")&&(t=le(t,r,3)),e(n,t)}function Ke(n,t){var r;if(typeof t!="function"){if(typeof n!="function")throw new Ru(L);var e=n;n=t,t=e}return function(){return 0<--n?r=t.apply(this,arguments):t=null,r}}function Ve(n,t,r){function e(){var r=t-(Qo()-c);0>=r||r>t?(f&&qu(f),r=s,f=p=s=w,r&&(h=Qo(),a=n.apply(l,i),p||f||(i=l=null))):p=Ju(e,r)}function u(){p&&qu(p),f=p=s=w,(v||_!==t)&&(h=Qo(),a=n.apply(l,i),p||f||(i=l=null))
}function o(){if(i=arguments,c=Qo(),l=this,s=v&&(p||!g),false===_)var r=g&&!p;else{f||g||(h=c);var o=_-(c-h),y=0>=o||o>_;y?(f&&(f=qu(f)),h=c,a=n.apply(l,i)):f||(f=Ju(u,o))}return y&&p?p=qu(p):p||t===_||(p=Ju(e,t)),r&&(y=true,a=n.apply(l,i)),!y||p||f||(i=l=null),a}var i,f,a,c,l,p,s,h=0,_=false,v=true;if(typeof n!="function")throw new Ru(L);if(t=0>t?0:+t||0,true===r)var g=true,v=false;else He(r)&&(g=r.leading,_="maxWait"in r&&oo(+r.maxWait||0,t),v="trailing"in r?r.trailing:v);return o.cancel=function(){p&&qu(p),f&&qu(f),f=p=s=w
},o}function Ye(n,t){function r(){var e=arguments,u=r.cache,o=t?t.apply(this,e):e[0];return u.has(o)?u.get(o):(e=n.apply(this,e),u.set(o,e),e)}if(typeof n!="function"||t&&typeof t!="function")throw new Ru(L);return r.cache=new Ye.Cache,r}function Ze(n,t){if(typeof n!="function")throw new Ru(L);return t=oo(typeof t=="undefined"?n.length-1:+t||0,0),function(){for(var r=arguments,e=-1,u=oo(r.length-t,0),o=wu(u);++e<u;)o[e]=r[t+e];switch(t){case 0:return n.call(this,o);case 1:return n.call(this,r[0],o);
case 2:return n.call(this,r[0],r[1],o)}for(u=wu(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function Ge(n){return de(h(n)?n.length:w)&&Lu.call(n)==z}function Je(n){return!!n&&1===n.nodeType&&h(n)&&-1<Lu.call(n).indexOf("Element")}function Xe(n){return h(n)&&typeof n.message=="string"&&Lu.call(n)==q}function He(n){var t=typeof n;return"function"==t||!!n&&"object"==t}function Qe(n){return null==n?false:Lu.call(n)==K?zu.test(Uu.call(n)):h(n)&&wt.test(n)}function nu(n){return typeof n=="number"||h(n)&&Lu.call(n)==V
}function tu(n){return h(n)&&Lu.call(n)==Z||false}function ru(n){return typeof n=="string"||h(n)&&Lu.call(n)==G}function eu(n){return h(n)&&de(n.length)&&!!Rt[Lu.call(n)]}function uu(n){return Ht(n,iu(n))}function ou(n){return lr(n,iu(n))}function iu(n){if(null==n)return[];He(n)||(n=Eu(n));for(var t=n.length,t=t&&de(t)&&(si(n)||bo.nonEnumArgs&&Ge(n))&&t||0,r=n.constructor,e=-1,r=typeof r=="function"&&r.prototype===n,u=wu(t),o=0<t;++e<t;)u[e]=e+"";for(var i in n)o&&ve(i,t)||"constructor"==i&&(r||!Nu.call(n,i))||u.push(i);
return u}function fu(n){return Ir(n,ji(n))}function au(n){return(n=u(n))&&n.replace(bt,c).replace(gt,"")}function cu(n){return(n=u(n))&&jt.test(n)?n.replace(At,"\\$&"):n}function lu(n,t,r){return r&&ge(n,t,r)&&(t=0),co(n,t)}function pu(n,t){var r="";if(n=u(n),t=+t,1>t||!n||!eo(t))return r;do t%2&&(r+=n),t=Ku(t/2),n+=n;while(t);return r}function su(n,t,r){var e=n;return(n=u(n))?(r?ge(e,t,r):null==t)?n.slice(g(n),y(n)+1):(t+="",n.slice(i(n,t),f(n,t)+1)):n}function hu(n,t,r){return r&&ge(n,t,r)&&(t=null),n=u(n),n.match(t||Et)||[]
}function _u(n,t,r){return r&&ge(n,t,r)&&(t=null),h(n)?yu(n):Qt(n,t)}function vu(n){return function(){return n}}function gu(n){return n}function yu(n){return vr(nr(n,true))}function du(n,t,r){if(null==r){var e=He(t),u=e&&ji(t);((u=u&&u.length&&lr(t,u))?u.length:e)||(u=false,r=t,t=n,n=this)}u||(u=lr(t,ji(t)));var o=true,e=-1,i=_i(n),f=u.length;false===r?o=false:He(r)&&"chain"in r&&(o=r.chain);for(;++e<f;){r=u[e];var a=t[r];n[r]=a,i&&(n.prototype[r]=function(t){return function(){var r=this.__chain__;if(o||r){var e=n(this.__wrapped__);
return(e.__actions__=Bt(this.__actions__)).push({func:t,args:arguments,thisArg:n}),e.__chain__=r,e}return r=[this.value()],Yu.apply(r,arguments),t.apply(n,r)}}(a))}return n}function mu(){}_=_?Dt.defaults(Mt.Object(),_,Dt.pick(Mt,Ot)):Mt;var wu=_.Array,bu=_.Date,xu=_.Error,Au=_.Function,ju=_.Math,ku=_.Number,Eu=_.Object,Iu=_.RegExp,Ou=_.String,Ru=_.TypeError,Cu=wu.prototype,Su=Eu.prototype,Wu=Ou.prototype,Tu=(Tu=_.window)&&Tu.document,Uu=Au.prototype.toString,Fu=dr("length"),Nu=Su.hasOwnProperty,$u=0,Lu=Su.toString,Bu=_._,zu=Iu("^"+cu(Lu).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Mu=Qe(Mu=_.ArrayBuffer)&&Mu,Du=Qe(Du=Mu&&new Mu(0).slice)&&Du,Pu=ju.ceil,qu=_.clearTimeout,Ku=ju.floor,Vu=Qe(Vu=Eu.getPrototypeOf)&&Vu,Yu=Cu.push,Zu=Su.propertyIsEnumerable,Gu=Qe(Gu=_.Set)&&Gu,Ju=_.setTimeout,Xu=Cu.splice,Hu=Qe(Hu=_.Uint8Array)&&Hu,Qu=Qe(Qu=_.WeakMap)&&Qu,no=function(){try{var n=Qe(n=_.Float64Array)&&n,t=new n(new Mu(10),0,1)&&n
}catch(r){}return t}(),to=Qe(to=wu.isArray)&&to,ro=Qe(ro=Eu.create)&&ro,eo=_.isFinite,uo=Qe(uo=Eu.keys)&&uo,oo=ju.max,io=ju.min,fo=Qe(fo=bu.now)&&fo,ao=Qe(ao=ku.isFinite)&&ao,co=_.parseInt,lo=ju.random,po=ku.NEGATIVE_INFINITY,so=ku.POSITIVE_INFINITY,ho=ju.pow(2,32)-1,_o=ho-1,vo=ho>>>1,go=no?no.BYTES_PER_ELEMENT:0,yo=ju.pow(2,53)-1,mo=Qu&&new Qu,wo={},bo=Wt.support={};!function(n){bo.funcDecomp=/\bthis\b/.test(function(){return this}),bo.funcNames=typeof Au.name=="string";try{bo.dom=11===Tu.createDocumentFragment().nodeType
}catch(t){bo.dom=false}try{bo.nonEnumArgs=!Zu.call(arguments,1)}catch(r){bo.nonEnumArgs=true}}(0,0),Wt.templateSettings={escape:ht,evaluate:_t,interpolate:vt,variable:"",imports:{_:Wt}};var xo=function(){function n(){}return function(t){if(He(t)){n.prototype=t;var r=new n;n.prototype=null}return r||_.Object()}}(),Ao=Lr(ar),jo=Lr(cr,true),ko=Br(),Eo=Br(true),Io=mo?function(n,t){return mo.set(n,t),n}:gu;Du||(Tr=Mu&&Hu?function(n){var t=n.byteLength,r=no?Ku(t/go):0,e=r*go,u=new Mu(t);if(r){var o=new no(u,0,r);
o.set(new no(n,0,r))}return t!=e&&(o=new Hu(u,e),o.set(new Hu(n,e))),u}:vu(null));var Oo=ro&&Gu?function(n){return new $t(n)}:vu(null),Ro=mo?function(n){return mo.get(n)}:mu,Co=function(){return bo.funcNames?"constant"==vu.name?dr("name"):function(n){for(var t=n.name,r=wo[t],e=r?r.length:0;e--;){var u=r[e],o=u.func;if(null==o||o==n)return u.name}return t}:vu("")}(),So=function(){var n=0,t=0;return function(r,e){var u=Qo(),o=U-(u-t);if(t=u,0<o){if(++n>=T)return r}else n=0;return Io(r,e)}}(),Wo=Ze(function(n,t){return si(n)||Ge(n)?rr(n,ir(t,false,true)):[]
}),To=Vr(),Uo=Vr(true),Fo=Ze(function(t,r){t||(t=[]),r=ir(r);var e=r.length,u=Xt(t,r);for(r.sort(n);e--;){var o=parseFloat(r[e]);if(o!=i&&ve(o)){var i=o;Xu.call(t,o,1)}}return u}),No=ue(),$o=ue(true),Lo=Ze(function(n){return Er(ir(n,false,true))}),Bo=Ze(function(n,t){return si(n)||Ge(n)?rr(n,t):[]}),zo=Ze(Ue),Mo=Ze(function(n,t){return de(n?n.length:0)&&(n=je(n)),Xt(n,ir(t))}),Do=Nr(function(n,t,r){Nu.call(n,r)?++n[r]:n[r]=1}),Po=Kr(Ao),qo=Kr(jo,true),Ko=Gr(zt,Ao),Vo=Gr(function(n,t){for(var r=n.length;r--&&false!==t(n[r],r,n););return n
},jo),Yo=Nr(function(n,t,r){Nu.call(n,r)?n[r].push(t):n[r]=[t]}),Zo=Nr(function(n,t,r){n[r]=t}),Go=Ze(function(n,t,r){var e=-1,u=typeof t=="function",o=n?n.length:0,i=de(o)?wu(o):[];return Ao(n,function(n){var o=u?t:null!=n&&n[t];i[++e]=o?o.apply(n,r):w}),i}),Jo=Nr(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),Xo=ne(function(n,t,r,e){var u=-1,o=n.length;for(e&&o&&(r=n[++u]);++u<o;)r=t(r,n[u],u,n);return r},Ao),Ho=ne(function(n,t,r,e){var u=n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);
return r},jo),Qo=fo||function(){return(new bu).getTime()},ni=Ze(function(n,t,r){var e=x;if(r.length)var u=v(r,ni.placeholder),e=e|I;return oe(n,e,t,r,u)}),ti=Ze(function(n,t){t=t.length?ir(t):ou(n);for(var r=-1,e=t.length;++r<e;){var u=t[r];n[u]=oe(n[u],x,n)}return n}),ri=Ze(function(n,t,r){var e=x|A;if(r.length)var u=v(r,ri.placeholder),e=e|I;return oe(t,e,n,r,u)}),ei=Pr(k),ui=Pr(E),oi=Ze(function(n,t){return tr(n,1,t)}),ii=Ze(function(n,t,r){return tr(n,t,r)}),fi=Zr(),ai=Zr(true),ci=Qr(I),li=Qr(O),pi=Ze(function(n,t){return oe(n,C,null,null,null,ir(t))
}),si=to||function(n){return h(n)&&de(n.length)&&Lu.call(n)==M};bo.dom||(Je=function(n){return!!n&&1===n.nodeType&&h(n)&&!vi(n)});var hi=ao||function(n){return typeof n=="number"&&eo(n)},_i=e(/x/)||Hu&&!e(Hu)?function(n){return Lu.call(n)==K}:e,vi=Vu?function(n){if(!n||Lu.call(n)!=Y)return false;var t=n.valueOf,r=Qe(t)&&(r=Vu(t))&&Vu(r);return r?n==r||Vu(n)==r:xe(n)}:xe,gi=$r(Jt),yi=Ze(function(n){var t=n[0];return null==t?t:(n.push(Zt),gi.apply(w,n))}),di=Yr(ar),mi=Yr(cr),wi=Jr(ko),bi=Jr(Eo),xi=Xr(ar),Ai=Xr(cr),ji=uo?function(n){if(n)var t=n.constructor,r=n.length;
return typeof t=="function"&&t.prototype===n||typeof n!="function"&&r&&de(r)?Ae(n):He(n)?uo(n):[]}:Ae,ki=$r(yr),Ei=Ze(function(n,t){if(null==n)return{};if("function"!=typeof t[0])return t=Kt(ir(t),Ou),we(n,rr(iu(n),t));var r=Wr(t[0],t[1],3);return be(n,function(n,t,e){return!r(n,t,e)})}),Ii=Ze(function(n,t){return null==n?{}:"function"==typeof t[0]?be(n,Wr(t[0],t[1],3)):we(n,ir(t))}),Oi=Mr(function(n,t,r){return t=t.toLowerCase(),n+(r?t.charAt(0).toUpperCase()+t.slice(1):t)}),Ri=Mr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()
}),Ci=Hr(),Si=Hr(true);8!=co(It+"08")&&(lu=function(n,t,r){return(r?ge(n,t,r):null==t)?t=0:t&&(t=+t),n=su(n),co(n,t||(mt.test(n)?16:10))});var Wi=Mr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),Ti=Mr(function(n,t,r){return n+(r?" ":"")+(t.charAt(0).toUpperCase()+t.slice(1))}),Ui=Ze(function(n,t){try{return n.apply(w,t)}catch(r){return Xe(r)?r:new xu(r)}}),Fi=qr(Vt),Ni=qr(function(n){for(var t=-1,r=n.length,e=so;++t<r;){var u=n[t];u<e&&(e=u)}return e},true);return Wt.prototype=Tt.prototype,Ut.prototype=xo(Tt.prototype),Ut.prototype.constructor=Ut,Ft.prototype=xo(Tt.prototype),Ft.prototype.constructor=Ft,Nt.prototype["delete"]=function(n){return this.has(n)&&delete this.__data__[n]
},Nt.prototype.get=function(n){return"__proto__"==n?w:this.__data__[n]},Nt.prototype.has=function(n){return"__proto__"!=n&&Nu.call(this.__data__,n)},Nt.prototype.set=function(n,t){return"__proto__"!=n&&(this.__data__[n]=t),this},$t.prototype.push=function(n){var t=this.data;typeof n=="string"||He(n)?t.set.add(n):t.hash[n]=true},Ye.Cache=Nt,Wt.after=function(n,t){if(typeof t!="function"){if(typeof n!="function")throw new Ru(L);var r=n;n=t,t=r}return n=eo(n=+n)?n:0,function(){return 1>--n?t.apply(this,arguments):void 0
}},Wt.ary=function(n,t,r){return r&&ge(n,t,r)&&(t=null),t=n&&null==t?n.length:oo(+t||0,0),oe(n,R,null,null,null,null,t)},Wt.assign=gi,Wt.at=Mo,Wt.before=Ke,Wt.bind=ni,Wt.bindAll=ti,Wt.bindKey=ri,Wt.callback=_u,Wt.chain=Ne,Wt.chunk=function(n,t,r){t=(r?ge(n,t,r):null==t)?1:oo(+t||1,1),r=0;for(var e=n?n.length:0,u=-1,o=wu(Pu(e/t));r<e;)o[++u]=br(n,r,r+=t);return o},Wt.compact=function(n){for(var t=-1,r=n?n.length:0,e=-1,u=[];++t<r;){var o=n[t];o&&(u[++e]=o)}return u},Wt.constant=vu,Wt.countBy=Do,Wt.create=function(n,t,r){var e=xo(n);
return r&&ge(n,t,r)&&(t=null),t?Ht(t,e,ji(t)):e},Wt.curry=ei,Wt.curryRight=ui,Wt.debounce=Ve,Wt.defaults=yi,Wt.defer=oi,Wt.delay=ii,Wt.difference=Wo,Wt.drop=Ie,Wt.dropRight=Oe,Wt.dropRightWhile=function(n,t,r){return n&&n.length?Or(n,le(t,r,3),true,true):[]},Wt.dropWhile=function(n,t,r){return n&&n.length?Or(n,le(t,r,3),true):[]},Wt.fill=function(n,t,r,e){var u=n?n.length:0;if(!u)return[];for(r&&typeof r!="number"&&ge(n,t,r)&&(r=0,e=u),u=n.length,r=null==r?0:+r||0,0>r&&(r=-r>u?0:u+r),e=typeof e=="undefined"||e>u?u:+e||0,0>e&&(e+=u),u=r>e?0:e>>>0,r>>>=0;r<u;)n[r++]=t;
return n},Wt.filter=Be,Wt.flatten=function(n,t,r){var e=n?n.length:0;return r&&ge(n,t,r)&&(t=false),e?ir(n,t):[]},Wt.flattenDeep=function(n){return n&&n.length?ir(n,true):[]},Wt.flow=fi,Wt.flowRight=ai,Wt.forEach=Ko,Wt.forEachRight=Vo,Wt.forIn=wi,Wt.forInRight=bi,Wt.forOwn=xi,Wt.forOwnRight=Ai,Wt.functions=ou,Wt.groupBy=Yo,Wt.indexBy=Zo,Wt.initial=function(n){return Oe(n,1)},Wt.intersection=function(){for(var n=[],t=-1,e=arguments.length,u=[],o=pe(),i=o==r;++t<e;){var f=arguments[t];(si(f)||Ge(f))&&(n.push(f),u.push(i&&120<=f.length?Oo(t&&f):null))
}var e=n.length,i=n[0],a=-1,c=i?i.length:0,l=[],p=u[0];n:for(;++a<c;)if(f=i[a],0>(p?Lt(p,f):o(l,f,0))){for(t=e;--t;){var s=u[t];if(0>(s?Lt(s,f):o(n[t],f,0)))continue n}p&&p.push(f),l.push(f)}return l},Wt.invert=function(n,t,r){r&&ge(n,t,r)&&(t=null),r=-1;for(var e=ji(n),u=e.length,o={};++r<u;){var i=e[r],f=n[i];t?Nu.call(o,f)?o[f].push(i):o[f]=[i]:o[f]=i}return o},Wt.invoke=Go,Wt.keys=ji,Wt.keysIn=iu,Wt.map=Me,Wt.mapValues=function(n,t,r){var e={};return t=le(t,r,3),ar(n,function(n,r,u){e[r]=t(n,r,u)
}),e},Wt.matches=yu,Wt.matchesProperty=function(n,t){return gr(n+"",nr(t,true))},Wt.memoize=Ye,Wt.merge=ki,Wt.mixin=du,Wt.negate=function(n){if(typeof n!="function")throw new Ru(L);return function(){return!n.apply(this,arguments)}},Wt.omit=Ei,Wt.once=function(n){return Ke(n,2)},Wt.pairs=function(n){for(var t=-1,r=ji(n),e=r.length,u=wu(e);++t<e;){var o=r[t];u[t]=[o,n[o]]}return u},Wt.partial=ci,Wt.partialRight=li,Wt.partition=Jo,Wt.pick=Ii,Wt.pluck=function(n,t){return Me(n,dr(t))},Wt.property=function(n){return dr(n+"")
},Wt.propertyOf=function(n){return function(t){return null==n?w:n[t]}},Wt.pull=function(){var n=arguments,t=n[0];if(!t||!t.length)return t;for(var r=0,e=pe(),u=n.length;++r<u;)for(var o=0,i=n[r];-1<(o=e(t,i,o));)Xu.call(t,o,1);return t},Wt.pullAt=Fo,Wt.range=function(n,t,r){r&&ge(n,t,r)&&(t=r=null),n=+n||0,r=null==r?1:+r||0,null==t?(t=n,n=0):t=+t||0;var e=-1;t=oo(Pu((t-n)/(r||1)),0);for(var u=wu(t);++e<t;)u[e]=n,n+=r;return u},Wt.rearg=pi,Wt.reject=function(n,t,r){var e=si(n)?qt:ur;return t=le(t,r,3),e(n,function(n,r,e){return!t(n,r,e)
})},Wt.remove=function(n,t,r){var e=-1,u=n?n.length:0,o=[];for(t=le(t,r,3);++e<u;)r=n[e],t(r,e,n)&&(o.push(r),Xu.call(n,e--,1),u--);return o},Wt.rest=We,Wt.restParam=Ze,Wt.shuffle=Pe,Wt.slice=function(n,t,r){var e=n?n.length:0;return e?(r&&typeof r!="number"&&ge(n,t,r)&&(t=0,r=e),br(n,t,r)):[]},Wt.sortBy=function(n,t,r){if(null==n)return[];var e=-1,u=n.length,o=de(u)?wu(u):[];return r&&ge(n,t,r)&&(t=null),t=le(t,r,3),Ao(n,function(n,r,u){o[++e]={a:t(n,r,u),b:e,c:n}}),Ar(o,a)},Wt.sortByAll=function(){var n=arguments,t=n[0],r=n[3],e=0,u=n.length-1;
if(null==t)return[];for(var o=wu(u);e<u;)o[e]=n[++e];return r&&ge(n[1],n[2],r)&&(o=n[1]),jr(t,ir(o),[])},Wt.sortByOrder=function(n,t,r,e){return null==n?[]:(e&&ge(t,r,e)&&(r=null),si(t)||(t=null==t?[]:[t]),si(r)||(r=null==r?[]:[r]),jr(n,t,r))},Wt.spread=function(n){if(typeof n!="function")throw new Ru(L);return function(t){return n.apply(this,t)}},Wt.take=function(n,t,r){return n&&n.length?((r?ge(n,t,r):null==t)&&(t=1),br(n,0,0>t?0:t)):[]},Wt.takeRight=function(n,t,r){var e=n?n.length:0;return e?((r?ge(n,t,r):null==t)&&(t=1),t=e-(+t||0),br(n,0>t?0:t)):[]
},Wt.takeRightWhile=function(n,t,r){return n&&n.length?Or(n,le(t,r,3),false,true):[]},Wt.takeWhile=function(n,t,r){return n&&n.length?Or(n,le(t,r,3)):[]},Wt.tap=function(n,t,r){return t.call(r,n),n},Wt.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new Ru(L);return false===r?e=false:He(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),St.leading=e,St.maxWait=+t,St.trailing=u,Ve(n,t,St)},Wt.thru=$e,Wt.times=function(n,t,r){if(n=+n,1>n||!eo(n))return[];var e=-1,u=wu(io(n,ho));
for(t=Wr(t,r,1);++e<n;)e<ho?u[e]=t(e):t(e);return u},Wt.toArray=function(n){var t=n?n.length:0;return de(t)?t?Bt(n):[]:fu(n)},Wt.toPlainObject=uu,Wt.transform=function(n,t,r,e){var u=si(n)||eu(n);return t=le(t,e,4),null==r&&(u||He(n)?(e=n.constructor,r=u?si(n)?new e:[]:xo(_i(e)&&e.prototype)):r={}),(u?zt:ar)(n,function(n,e,u){return t(r,n,e,u)}),r},Wt.union=Lo,Wt.uniq=Te,Wt.unzip=Ue,Wt.values=fu,Wt.valuesIn=function(n){return Ir(n,iu(n))},Wt.where=function(n,t){return Be(n,vr(t))},Wt.without=Bo,Wt.wrap=function(n,t){return t=null==t?gu:t,oe(t,I,null,[n],[])
},Wt.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var r=arguments[n];if(si(r)||Ge(r))var e=e?rr(e,r).concat(rr(r,e)):r}return e?Er(e):[]},Wt.zip=zo,Wt.zipObject=Fe,Wt.backflow=ai,Wt.collect=Me,Wt.compose=ai,Wt.each=Ko,Wt.eachRight=Vo,Wt.extend=gi,Wt.iteratee=_u,Wt.methods=ou,Wt.object=Fe,Wt.select=Be,Wt.tail=We,Wt.unique=Te,du(Wt,Wt),Wt.add=function(n,t){return n+t},Wt.attempt=Ui,Wt.camelCase=Oi,Wt.capitalize=function(n){return(n=u(n))&&n.charAt(0).toUpperCase()+n.slice(1)},Wt.clone=function(n,t,r,e){return t&&typeof t!="boolean"&&ge(n,t,r)?t=false:typeof t=="function"&&(e=r,r=t,t=false),r=typeof r=="function"&&Wr(r,e,1),nr(n,t,r)
},Wt.cloneDeep=function(n,t,r){return t=typeof t=="function"&&Wr(t,r,1),nr(n,true,t)},Wt.deburr=au,Wt.endsWith=function(n,t,r){n=u(n),t+="";var e=n.length;return r=typeof r=="undefined"?e:io(0>r?0:+r||0,e),r-=t.length,0<=r&&n.indexOf(t,r)==r},Wt.escape=function(n){return(n=u(n))&&st.test(n)?n.replace(lt,l):n},Wt.escapeRegExp=cu,Wt.every=Le,Wt.find=Po,Wt.findIndex=To,Wt.findKey=di,Wt.findLast=qo,Wt.findLastIndex=Uo,Wt.findLastKey=mi,Wt.findWhere=function(n,t){return Po(n,vr(t))},Wt.first=Re,Wt.has=function(n,t){return n?Nu.call(n,t):false
},Wt.identity=gu,Wt.includes=ze,Wt.indexOf=Ce,Wt.inRange=function(n,t,r){return t=+t||0,"undefined"===typeof r?(r=t,t=0):r=+r||0,n>=t&&n<r},Wt.isArguments=Ge,Wt.isArray=si,Wt.isBoolean=function(n){return true===n||false===n||h(n)&&Lu.call(n)==D},Wt.isDate=function(n){return h(n)&&Lu.call(n)==P},Wt.isElement=Je,Wt.isEmpty=function(n){if(null==n)return true;var t=n.length;return de(t)&&(si(n)||ru(n)||Ge(n)||h(n)&&_i(n.splice))?!t:!ji(n).length},Wt.isEqual=function(n,t,r,e){return r=typeof r=="function"&&Wr(r,e,3),!r&&me(n)&&me(t)?n===t:(e=r?r(n,t):w,typeof e=="undefined"?pr(n,t,r):!!e)
},Wt.isError=Xe,Wt.isFinite=hi,Wt.isFunction=_i,Wt.isMatch=function(n,t,r,e){var u=ji(t),o=u.length;if(!o)return true;if(null==n)return false;if(r=typeof r=="function"&&Wr(r,e,3),!r&&1==o){var i=u[0];if(e=t[i],me(e))return e===n[i]&&(typeof e!="undefined"||i in ke(n))}for(var i=wu(o),f=wu(o);o--;)e=i[o]=t[u[o]],f[o]=me(e);return hr(ke(n),u,i,f,r)},Wt.isNaN=function(n){return nu(n)&&n!=+n},Wt.isNative=Qe,Wt.isNull=function(n){return null===n},Wt.isNumber=nu,Wt.isObject=He,Wt.isPlainObject=vi,Wt.isRegExp=tu,Wt.isString=ru,Wt.isTypedArray=eu,Wt.isUndefined=function(n){return typeof n=="undefined"
},Wt.kebabCase=Ri,Wt.last=Se,Wt.lastIndexOf=function(n,t,r){var e=n?n.length:0;if(!e)return-1;var u=e;if(typeof r=="number")u=(0>r?oo(e+r,0):io(r||0,e-1))+1;else if(r)return u=Cr(n,t,true)-1,n=n[u],(t===t?t===n:n!==n)?u:-1;if(t!==t)return s(n,u,true);for(;u--;)if(n[u]===t)return u;return-1},Wt.max=Fi,Wt.min=Ni,Wt.noConflict=function(){return _._=Bu,this},Wt.noop=mu,Wt.now=Qo,Wt.pad=function(n,t,r){n=u(n),t=+t;var e=n.length;return e<t&&eo(t)?(e=(t-e)/2,t=Ku(e),e=Pu(e),r=re("",e,r),r.slice(0,t)+n+r):n
},Wt.padLeft=Ci,Wt.padRight=Si,Wt.parseInt=lu,Wt.random=function(n,t,r){r&&ge(n,t,r)&&(t=r=null);var e=null==n,u=null==t;return null==r&&(u&&typeof n=="boolean"?(r=n,n=1):typeof t=="boolean"&&(r=t,u=true)),e&&u&&(t=1,u=false),n=+n||0,u?(t=n,n=0):t=+t||0,r||n%1||t%1?(r=lo(),io(n+r*(t-n+parseFloat("1e-"+((r+"").length-1))),t)):mr(n,t)},Wt.reduce=Xo,Wt.reduceRight=Ho,Wt.repeat=pu,Wt.result=function(n,t,r){return t=null==n?w:n[t],typeof t=="undefined"&&(t=r),_i(t)?t.call(n):t},Wt.runInContext=m,Wt.size=function(n){var t=n?n.length:0;
return de(t)?t:ji(n).length},Wt.snakeCase=Wi,Wt.some=qe,Wt.sortedIndex=No,Wt.sortedLastIndex=$o,Wt.startCase=Ti,Wt.startsWith=function(n,t,r){return n=u(n),r=null==r?0:io(0>r?0:+r||0,n.length),n.lastIndexOf(t,r)==r},Wt.sum=function(n,t,r){r&&ge(n,t,r)&&(t=null);var e=le(),u=null==t;if(e===Qt&&u||(u=false,t=e(t,r,3)),u){for(n=si(n)?n:je(n),t=n.length,r=0;t--;)r+=+n[t]||0;n=r}else n=kr(n,t);return n},Wt.template=function(n,t,r){var e=Wt.templateSettings;r&&ge(n,t,r)&&(t=r=null),n=u(n),t=Jt(Jt({},r||t),e,Gt),r=Jt(Jt({},t.imports),e.imports,Gt);
var o,i,f=ji(r),a=Ir(r,f),c=0;r=t.interpolate||xt;var l="__p+='";r=Iu((t.escape||xt).source+"|"+r.source+"|"+(r===vt?yt:xt).source+"|"+(t.evaluate||xt).source+"|$","g");var s="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,u,f,a){return e||(e=u),l+=n.slice(c,a).replace(kt,p),r&&(o=true,l+="'+__e("+r+")+'"),f&&(i=true,l+="';"+f+";\n__p+='"),e&&(l+="'+((__t=("+e+"))==null?'':__t)+'"),c=a+t.length,t}),l+="';",(t=t.variable)||(l="with(obj){"+l+"}"),l=(i?l.replace(it,""):l).replace(ft,"$1").replace(at,"$1;"),l="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(o?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}",t=Ui(function(){return Au(f,s+"return "+l).apply(w,a)
}),t.source=l,Xe(t))throw t;return t},Wt.trim=su,Wt.trimLeft=function(n,t,r){var e=n;return(n=u(n))?n.slice((r?ge(e,t,r):null==t)?g(n):i(n,t+"")):n},Wt.trimRight=function(n,t,r){var e=n;return(n=u(n))?(r?ge(e,t,r):null==t)?n.slice(0,y(n)+1):n.slice(0,f(n,t+"")+1):n},Wt.trunc=function(n,t,r){r&&ge(n,t,r)&&(t=null);var e=S;if(r=W,null!=t)if(He(t)){var o="separator"in t?t.separator:o,e="length"in t?+t.length||0:e;r="omission"in t?u(t.omission):r}else e=+t||0;if(n=u(n),e>=n.length)return n;if(e-=r.length,1>e)return r;
if(t=n.slice(0,e),null==o)return t+r;if(tu(o)){if(n.slice(e).search(o)){var i,f=n.slice(0,e);for(o.global||(o=Iu(o.source,(dt.exec(o)||"")+"g")),o.lastIndex=0;n=o.exec(f);)i=n.index;t=t.slice(0,null==i?e:i)}}else n.indexOf(o,e)!=e&&(o=t.lastIndexOf(o),-1<o&&(t=t.slice(0,o)));return t+r},Wt.unescape=function(n){return(n=u(n))&&pt.test(n)?n.replace(ct,d):n},Wt.uniqueId=function(n){var t=++$u;return u(n)+t},Wt.words=hu,Wt.all=Le,Wt.any=qe,Wt.contains=ze,Wt.detect=Po,Wt.foldl=Xo,Wt.foldr=Ho,Wt.head=Re,Wt.include=ze,Wt.inject=Xo,du(Wt,function(){var n={};
return ar(Wt,function(t,r){Wt.prototype[r]||(n[r]=t)}),n}(),false),Wt.sample=De,Wt.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(t){return De(t,n)}):De(this.value())},Wt.VERSION=b,zt("bind bindKey curry curryRight partial partialRight".split(" "),function(n){Wt[n].placeholder=Wt}),zt(["dropWhile","filter","map","takeWhile"],function(n,t){var r=t!=$,e=t==F;Ft.prototype[n]=function(n,u){var o=this.__filtered__,i=o&&e?new Ft(this):this.clone();return(i.__iteratees__||(i.__iteratees__=[])).push({done:false,count:0,index:0,iteratee:le(n,u,1),limit:-1,type:t}),i.__filtered__=o||r,i
}}),zt(["drop","take"],function(n,t){var r=n+"While";Ft.prototype[n]=function(r){var e=this.__filtered__,u=e&&!t?this.dropWhile():this.clone();return r=null==r?1:oo(Ku(r)||0,0),e?t?u.__takeCount__=io(u.__takeCount__,r):Se(u.__iteratees__).limit=r:(u.__views__||(u.__views__=[])).push({size:r,type:n+(0>u.__dir__?"Right":"")}),u},Ft.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()},Ft.prototype[n+"RightWhile"]=function(n,t){return this.reverse()[r](n,t).reverse()}}),zt(["first","last"],function(n,t){var r="take"+(t?"Right":"");
Ft.prototype[n]=function(){return this[r](1).value()[0]}}),zt(["initial","rest"],function(n,t){var r="drop"+(t?"":"Right");Ft.prototype[n]=function(){return this[r](1)}}),zt(["pluck","where"],function(n,t){var r=t?"filter":"map",e=t?vr:dr;Ft.prototype[n]=function(n){return this[r](e(n))}}),Ft.prototype.compact=function(){return this.filter(gu)},Ft.prototype.reject=function(n,t){return n=le(n,t,1),this.filter(function(t){return!n(t)})},Ft.prototype.slice=function(n,t){n=null==n?0:+n||0;var r=0>n?this.takeRight(-n):this.drop(n);
return typeof t!="undefined"&&(t=+t||0,r=0>t?r.dropRight(-t):r.take(t-n)),r},Ft.prototype.toArray=function(){return this.drop(0)},ar(Ft.prototype,function(n,t){var r=Wt[t];if(r){var e=/^(?:filter|map|reject)|While$/.test(t),u=/^(?:first|last)$/.test(t);Wt.prototype[t]=function(){function t(n){return n=[n],Yu.apply(n,o),r.apply(Wt,n)}var o=arguments,i=this.__chain__,f=this.__wrapped__,a=!!this.__actions__.length,c=f instanceof Ft,l=o[0],p=c||si(f);return p&&e&&typeof l=="function"&&1!=l.length&&(c=p=false),c=c&&!a,u&&!i?c?n.call(f):r.call(Wt,this.value()):p?(f=n.apply(c?f:new Ft(this),o),u||!a&&!f.__actions__||(f.__actions__||(f.__actions__=[])).push({func:$e,args:[t],thisArg:Wt}),new Ut(f,i)):this.thru(t)
}}}),zt("concat join pop push replace shift sort splice split unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?Wu:Cu)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:join|pop|replace|shift)$/.test(n);Wt.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),ar(Ft.prototype,function(n,t){var r=Wt[t];if(r){var e=r.name;(wo[e]||(wo[e]=[])).push({name:t,func:r})}}),wo[te(null,A).name]=[{name:"wrapper",func:null}],Ft.prototype.clone=function(){var n=this.__actions__,t=this.__iteratees__,r=this.__views__,e=new Ft(this.__wrapped__);
return e.__actions__=n?Bt(n):null,e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=t?Bt(t):null,e.__takeCount__=this.__takeCount__,e.__views__=r?Bt(r):null,e},Ft.prototype.reverse=function(){if(this.__filtered__){var n=new Ft(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},Ft.prototype.value=function(){var n=this.__wrapped__.value();if(!si(n))return Rr(n,this.__actions__);var t,r=this.__dir__,e=0>r;t=n.length;for(var u=this.__views__,o=0,i=-1,f=u?u.length:0;++i<f;){var a=u[i],c=a.size;
switch(a.type){case"drop":o+=c;break;case"dropRight":t-=c;break;case"take":t=io(t,o+c);break;case"takeRight":o=oo(o,t-c)}}t={start:o,end:t},u=t.start,o=t.end,t=o-u,u=e?o:u-1,o=io(t,this.__takeCount__),f=(i=this.__iteratees__)?i.length:0,a=0,c=[];n:for(;t--&&a<o;){for(var u=u+r,l=-1,p=n[u];++l<f;){var s=i[l],h=s.iteratee,_=s.type;if(_==F){if(s.done&&(e?u>s.index:u<s.index)&&(s.count=0,s.done=false),s.index=u,!(s.done||(_=s.limit,s.done=-1<_?s.count++>=_:!h(p))))continue n}else if(s=h(p),_==$)p=s;else if(!s){if(_==N)continue n;
break n}}c[a++]=p}return c},Wt.prototype.chain=function(){return Ne(this)},Wt.prototype.commit=function(){return new Ut(this.value(),this.__chain__)},Wt.prototype.plant=function(n){for(var t,r=this;r instanceof Tt;){var e=Ee(r);t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},Wt.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Ft?(this.__actions__.length&&(n=new Ft(this)),new Ut(n.reverse(),this.__chain__)):this.thru(function(n){return n.reverse()})},Wt.prototype.toString=function(){return this.value()+""
},Wt.prototype.run=Wt.prototype.toJSON=Wt.prototype.valueOf=Wt.prototype.value=function(){return Rr(this.__wrapped__,this.__actions__)},Wt.prototype.collect=Wt.prototype.map,Wt.prototype.head=Wt.prototype.first,Wt.prototype.select=Wt.prototype.filter,Wt.prototype.tail=Wt.prototype.rest,Wt}var w,b="3.6.0",x=1,A=2,j=4,k=8,E=16,I=32,O=64,R=128,C=256,S=30,W="...",T=150,U=16,F=0,N=1,$=2,L="Expected a function",B="__lodash_placeholder__",z="[object Arguments]",M="[object Array]",D="[object Boolean]",P="[object Date]",q="[object Error]",K="[object Function]",V="[object Number]",Y="[object Object]",Z="[object RegExp]",G="[object String]",J="[object ArrayBuffer]",X="[object Float32Array]",H="[object Float64Array]",Q="[object Int8Array]",nt="[object Int16Array]",tt="[object Int32Array]",rt="[object Uint8Array]",et="[object Uint8ClampedArray]",ut="[object Uint16Array]",ot="[object Uint32Array]",it=/\b__p\+='';/g,ft=/\b(__p\+=)''\+/g,at=/(__e\(.*?\)|\b__t\))\+'';/g,ct=/&(?:amp|lt|gt|quot|#39|#96);/g,lt=/[&<>"'`]/g,pt=RegExp(ct.source),st=RegExp(lt.source),ht=/<%-([\s\S]+?)%>/g,_t=/<%([\s\S]+?)%>/g,vt=/<%=([\s\S]+?)%>/g,gt=/[\u0300-\u036f\ufe20-\ufe23]/g,yt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,dt=/\w*$/,mt=/^0[xX]/,wt=/^\[object .+?Constructor\]$/,bt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,xt=/($^)/,At=/[.*+?^${}()|[\]\/\\]/g,jt=RegExp(At.source),kt=/['\n\r\u2028\u2029\\]/g,Et=RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+","g"),It=" \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",Ot="Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout document isFinite parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap window".split(" "),Rt={};
Rt[X]=Rt[H]=Rt[Q]=Rt[nt]=Rt[tt]=Rt[rt]=Rt[et]=Rt[ut]=Rt[ot]=true,Rt[z]=Rt[M]=Rt[J]=Rt[D]=Rt[P]=Rt[q]=Rt[K]=Rt["[object Map]"]=Rt[V]=Rt[Y]=Rt[Z]=Rt["[object Set]"]=Rt[G]=Rt["[object WeakMap]"]=false;var Ct={};Ct[z]=Ct[M]=Ct[J]=Ct[D]=Ct[P]=Ct[X]=Ct[H]=Ct[Q]=Ct[nt]=Ct[tt]=Ct[V]=Ct[Y]=Ct[Z]=Ct[G]=Ct[rt]=Ct[et]=Ct[ut]=Ct[ot]=true,Ct[q]=Ct[K]=Ct["[object Map]"]=Ct["[object Set]"]=Ct["[object WeakMap]"]=false;var St={leading:false,maxWait:0,trailing:false},Wt={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Tt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Ut={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Ft={"function":true,object:true},Nt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},$t=Ft[typeof exports]&&exports&&!exports.nodeType&&exports,Lt=Ft[typeof module]&&module&&!module.nodeType&&module,Bt=Ft[typeof self]&&self&&self.Object&&self,Ft=Ft[typeof window]&&window&&window.Object&&window,zt=Lt&&Lt.exports===$t&&$t,Mt=$t&&Lt&&typeof global=="object"&&global||Ft!==(this&&this.window)&&Ft||Bt||this,Dt=m();
typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Mt._=Dt, define(function(){return Dt})):$t&&Lt?zt?(Lt.exports=Dt)._=Dt:$t._=Dt:Mt._=Dt}).call(this);
/*
Mithril v0.2.0
http://github.com/lhorie/mithril.js
(c) Leo Horie
License: MIT
*/

var m=function a(b,c){function d(a){D=a.document,E=a.location,G=a.cancelAnimationFrame||a.clearTimeout,F=a.requestAnimationFrame||a.setTimeout}function e(){var a,b=[].slice.call(arguments),c=!(null==b[1]||L.call(b[1])!==H||"tag"in b[1]||"view"in b[1]||"subtree"in b[1]),d=c?b[1]:{},e="class"in d?"class":"className",f={tag:"div",attrs:{}},g=[];if(L.call(b[0])!=J)throw new Error("selector in m(selector, attrs, children) should be a string");for(;a=M.exec(b[0]);)if(""===a[1]&&a[2])f.tag=a[2];else if("#"===a[1])f.attrs.id=a[2];else if("."===a[1])g.push(a[2]);else if("["===a[3][0]){var h=N.exec(a[3]);f.attrs[h[1]]=h[3]||(h[2]?"":!0)}var i=b.slice(c?2:1);f.children=1===i.length&&L.call(i[0])===I?i[0]:i;for(var j in d)d.hasOwnProperty(j)&&(j===e&&null!=d[j]&&""!==d[j]?(g.push(d[j]),f.attrs[j]=""):f.attrs[j]=d[j]);return g.length>0&&(f.attrs[e]=g.join(" ")),f}function f(a,b,d,j,l,m,n,o,p,q,r){try{(null==l||null==l.toString())&&(l="")}catch(s){l=""}if("retain"===l.subtree)return m;var t=L.call(m),u=L.call(l);if(null==m||t!==u){if(null!=m)if(d&&d.nodes){var v=o-j,w=v+(u===I?l:m.nodes).length;i(d.nodes.slice(v,w),d.slice(v,w))}else m.nodes&&i(m.nodes,m);m=new l.constructor,m.tag&&(m={}),m.nodes=[]}if(u===I){for(var x=0,y=l.length;y>x;x++)L.call(l[x])===I&&(l=l.concat.apply([],l),x--,y=l.length);for(var z=[],A=m.length===l.length,B=0,C=1,E=2,F=3,G={},M=!1,x=0;x<m.length;x++)m[x]&&m[x].attrs&&null!=m[x].attrs.key&&(M=!0,G[m[x].attrs.key]={action:C,index:x});for(var N=0,x=0,y=l.length;y>x;x++)if(l[x]&&l[x].attrs&&null!=l[x].attrs.key){for(var Q=0,y=l.length;y>Q;Q++)l[Q]&&l[Q].attrs&&null==l[Q].attrs.key&&(l[Q].attrs.key="__mithril__"+N++);break}if(M){var R=!1;if(l.length!=m.length)R=!0;else for(var S,T,x=0;S=m[x],T=l[x];x++)if(S.attrs&&T.attrs&&S.attrs.key!=T.attrs.key){R=!0;break}if(R){for(var x=0,y=l.length;y>x;x++)if(l[x]&&l[x].attrs&&null!=l[x].attrs.key){var U=l[x].attrs.key;G[U]=G[U]?{action:F,index:x,from:G[U].index,element:m.nodes[G[U].index]||D.createElement("div")}:{action:E,index:x}}var V=[];for(var W in G)V.push(G[W]);var X=V.sort(g),Y=new Array(m.length);Y.nodes=m.nodes.slice();for(var Z,x=0;Z=X[x];x++){if(Z.action===C&&(i(m[Z.index].nodes,m[Z.index]),Y.splice(Z.index,1)),Z.action===E){var $=D.createElement("div");$.key=l[Z.index].attrs.key,a.insertBefore($,a.childNodes[Z.index]||null),Y.splice(Z.index,0,{attrs:{key:l[Z.index].attrs.key},nodes:[$]}),Y.nodes[Z.index]=$}Z.action===F&&(a.childNodes[Z.index]!==Z.element&&null!==Z.element&&a.insertBefore(Z.element,a.childNodes[Z.index]||null),Y[Z.index]=m[Z.from],Y.nodes[Z.index]=Z.element)}m=Y}}for(var x=0,_=0,y=l.length;y>x;x++){var bb=f(a,b,m,o,l[x],m[_],n,o+B||B,p,q,r);bb!==c&&(bb.nodes.intact||(A=!1),B+=bb.$trusted?(bb.match(/<[^\/]|\>\s*[^<]/g)||[0]).length:L.call(bb)===I?bb.length:1,m[_++]=bb)}if(!A){for(var x=0,y=l.length;y>x;x++)null!=m[x]&&z.push.apply(z,m[x].nodes);for(var cb,x=0;cb=m.nodes[x];x++)null!=cb.parentNode&&z.indexOf(cb)<0&&i([cb],[m[x]]);l.length<m.length&&(m.length=l.length),m.nodes=z}}else if(null!=l&&u===H){for(var eb=[],fb=[];l.view;){var gb=l.view.$original||l.view,hb="diff"==e.redraw.strategy()&&m.views?m.views.indexOf(gb):-1,ib=hb>-1?m.controllers[hb]:new(l.controller||P),U=l&&l.attrs&&l.attrs.key;if(l=0==db||m&&m.controllers&&m.controllers.indexOf(ib)>-1?l.view(ib):{tag:"placeholder"},"retain"===l.subtree)return m;U&&(l.attrs||(l.attrs={}),l.attrs.key=U),ib.onunload&&ab.push({controller:ib,handler:ib.onunload}),eb.push(gb),fb.push(ib)}if(!l.tag&&fb.length)throw new Error("Component template must return a virtual element, not an array, string, etc.");l.attrs||(l.attrs={}),m.attrs||(m.attrs={});var jb=Object.keys(l.attrs),kb=jb.length>("key"in l.attrs?1:0);if((l.tag!=m.tag||jb.sort().join()!=Object.keys(m.attrs).sort().join()||l.attrs.id!=m.attrs.id||l.attrs.key!=m.attrs.key||"all"==e.redraw.strategy()&&(!m.configContext||m.configContext.retain!==!0)||"diff"==e.redraw.strategy()&&m.configContext&&m.configContext.retain===!1)&&(m.nodes.length&&i(m.nodes),m.configContext&&typeof m.configContext.onunload===K&&m.configContext.onunload(),m.controllers))for(var ib,x=0;ib=m.controllers[x];x++)typeof ib.onunload===K&&ib.onunload({preventDefault:P});if(L.call(l.tag)!=J)return;var cb,lb=0===m.nodes.length;if(l.attrs.xmlns?q=l.attrs.xmlns:"svg"===l.tag?q="http://www.w3.org/2000/svg":"math"===l.tag&&(q="http://www.w3.org/1998/Math/MathML"),lb){if(cb=l.attrs.is?q===c?D.createElement(l.tag,l.attrs.is):D.createElementNS(q,l.tag,l.attrs.is):q===c?D.createElement(l.tag):D.createElementNS(q,l.tag),m={tag:l.tag,attrs:kb?h(cb,l.tag,l.attrs,{},q):l.attrs,children:null!=l.children&&l.children.length>0?f(cb,l.tag,c,c,l.children,m.children,!0,0,l.attrs.contenteditable?cb:p,q,r):l.children,nodes:[cb]},fb.length){m.views=eb,m.controllers=fb;for(var ib,x=0;ib=fb[x];x++)if(ib.onunload&&ib.onunload.$old&&(ib.onunload=ib.onunload.$old),db&&ib.onunload){var mb=ib.onunload;ib.onunload=P,ib.onunload.$old=mb}}m.children&&!m.children.nodes&&(m.children.nodes=[]),"select"===l.tag&&"value"in l.attrs&&h(cb,l.tag,{value:l.attrs.value},{},q),a.insertBefore(cb,a.childNodes[o]||null)}else cb=m.nodes[0],kb&&h(cb,l.tag,l.attrs,m.attrs,q),m.children=f(cb,l.tag,c,c,l.children,m.children,!1,0,l.attrs.contenteditable?cb:p,q,r),m.nodes.intact=!0,fb.length&&(m.views=eb,m.controllers=fb),n===!0&&null!=cb&&a.insertBefore(cb,a.childNodes[o]||null);if(typeof l.attrs.config===K){var nb=m.configContext=m.configContext||{},ob=function(a,b){return function(){return a.attrs.config.apply(a,b)}};r.push(ob(l,[cb,!lb,nb,m]))}}else if(typeof l!=K){var z;0===m.nodes.length?(l.$trusted?z=k(a,o,l):(z=[D.createTextNode(l)],a.nodeName.match(O)||a.insertBefore(z[0],a.childNodes[o]||null)),m="string number boolean".indexOf(typeof l)>-1?new l.constructor(l):l,m.nodes=z):m.valueOf()!==l.valueOf()||n===!0?(z=m.nodes,p&&p===D.activeElement||(l.$trusted?(i(z,m),z=k(a,o,l)):"textarea"===b?a.value=l:p?p.innerHTML=l:((1===z[0].nodeType||z.length>1)&&(i(m.nodes,m),z=[D.createTextNode(l)]),a.insertBefore(z[0],a.childNodes[o]||null),z[0].nodeValue=l)),m=new l.constructor(l),m.nodes=z):m.nodes.intact=!0}return m}function g(a,b){return a.action-b.action||a.index-b.index}function h(a,b,c,d,e){for(var f in c){var g=c[f],h=d[f];if(f in d&&h===g)"value"===f&&"input"===b&&a.value!=g&&(a.value=g);else{d[f]=g;try{if("config"===f||"key"==f)continue;if(typeof g===K&&0===f.indexOf("on"))a[f]=l(g,a);else if("style"===f&&null!=g&&L.call(g)===H){for(var i in g)(null==h||h[i]!==g[i])&&(a.style[i]=g[i]);for(var i in h)i in g||(a.style[i]="")}else null!=e?"href"===f?a.setAttributeNS("http://www.w3.org/1999/xlink","href",g):"className"===f?a.setAttribute("class",g):a.setAttribute(f,g):f in a&&"list"!==f&&"style"!==f&&"form"!==f&&"type"!==f&&"width"!==f&&"height"!==f?("input"!==b||a[f]!==g)&&(a[f]=g):a.setAttribute(f,g)}catch(j){if(j.message.indexOf("Invalid argument")<0)throw j}}}return d}function i(a,b){for(var c=a.length-1;c>-1;c--)if(a[c]&&a[c].parentNode){try{a[c].parentNode.removeChild(a[c])}catch(d){}b=[].concat(b),b[c]&&j(b[c])}0!=a.length&&(a.length=0)}function j(a){if(a.configContext&&typeof a.configContext.onunload===K&&(a.configContext.onunload(),a.configContext.onunload=null),a.controllers)for(var b,c=0;b=a.controllers[c];c++)typeof b.onunload===K&&b.onunload({preventDefault:P});if(a.children)if(L.call(a.children)===I)for(var d,c=0;d=a.children[c];c++)j(d);else a.children.tag&&j(a.children)}function k(a,b,c){var d=a.childNodes[b];if(d){var e=1!=d.nodeType,f=D.createElement("span");e?(a.insertBefore(f,d||null),f.insertAdjacentHTML("beforebegin",c),a.removeChild(f)):d.insertAdjacentHTML("beforebegin",c)}else a.insertAdjacentHTML("beforeend",c);for(var g=[];a.childNodes[b]!==d;)g.push(a.childNodes[b]),b++;return g}function l(a,b){return function(c){c=c||event,e.redraw.strategy("diff"),e.startComputation();try{return a.call(b,c)}finally{eb()}}}function m(a){var b=S.indexOf(a);return 0>b?S.push(a)-1:b}function n(a){var b=function(){return arguments.length&&(a=arguments[0]),a};return b.toJSON=function(){return a},b}function o(a,b){var c=function(){return(a.controller||P).apply(this,b)||this},d=function(c){return arguments.length>1&&(b=b.concat([].slice.call(arguments,1))),a.view.apply(a,b?[c].concat(b):[c])};d.$original=a.view;var e={controller:c,view:d};return b[0]&&null!=b[0].key&&(e.attrs={key:b[0].key}),e}function p(){$&&($(),$=null);for(var a,b=0;a=V[b];b++)if(X[b]){var c=W[b].controller&&W[b].controller.$$args?[X[b]].concat(W[b].controller.$$args):[X[b]];e.render(a,W[b].view?W[b].view(X[b],c):"")}_&&(_(),_=null),Y=null,Z=new Date,e.redraw.strategy("diff")}function q(a){return a.slice(hb[e.route.mode].length)}function r(a,b,c){fb={};var d=c.indexOf("?");-1!==d&&(fb=v(c.substr(d+1,c.length)),c=c.substr(0,d));var f=Object.keys(b),g=f.indexOf(c);if(-1!==g)return e.mount(a,b[f[g]]),!0;for(var h in b){if(h===c)return e.mount(a,b[h]),!0;var i=new RegExp("^"+h.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(i.test(c))return c.replace(i,function(){for(var c=h.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2),f=0,g=c.length;g>f;f++)fb[c[f].replace(/:|\./g,"")]=decodeURIComponent(d[f]);e.mount(a,b[h])}),!0}}function s(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!==a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;for(var b=a.currentTarget||a.srcElement,c="pathname"===e.route.mode&&b.search?v(b.search.slice(1)):{};b&&"A"!=b.nodeName.toUpperCase();)b=b.parentNode;e.route(b[e.route.mode].slice(hb[e.route.mode].length),c)}}function t(){"hash"!=e.route.mode&&E.hash?E.hash=E.hash:b.scrollTo(0,0)}function u(a,b){var d={},e=[];for(var f in a){var g=b?b+"["+f+"]":f,h=a[f],i=L.call(h),j=null===h?encodeURIComponent(g):i===H?u(h,g):i===I?h.reduce(function(a,b){return d[g]||(d[g]={}),d[g][b]?a:(d[g][b]=!0,a.concat(encodeURIComponent(g)+"="+encodeURIComponent(b)))},[]).join("&"):encodeURIComponent(g)+"="+encodeURIComponent(h);h!==c&&e.push(j)}return e.join("&")}function v(a){"?"===a.charAt(0)&&(a=a.substring(1));for(var b=a.split("&"),c={},d=0,e=b.length;e>d;d++){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=2==f.length?decodeURIComponent(f[1]):null;null!=c[g]?(L.call(c[g])!==I&&(c[g]=[c[g]]),c[g].push(h)):c[g]=h}return c}function w(a){var b=m(a);i(a.childNodes,T[b]),T[b]=c}function x(a,b){var c=e.prop(b);return a.then(c),c.then=function(c,d){return x(a.then(c,d),b)},c}function y(a,b){function c(a){l=a||j,n.map(function(a){l===i&&a.resolve(m)||a.reject(m)})}function d(a,b,c,d){if((null!=m&&L.call(m)===H||typeof m===K)&&typeof a===K)try{var f=0;a.call(m,function(a){f++||(m=a,b())},function(a){f++||(m=a,c())})}catch(g){e.deferred.onerror(g),m=g,c()}else d()}function f(){var j;try{j=m&&m.then}catch(n){return e.deferred.onerror(n),m=n,l=h,f()}d(j,function(){l=g,f()},function(){l=h,f()},function(){try{l===g&&typeof a===K?m=a(m):l===h&&"function"==typeof b&&(m=b(m),l=g)}catch(f){return e.deferred.onerror(f),m=f,c()}m===k?(m=TypeError(),c()):d(j,function(){c(i)},c,function(){c(l===g&&i)})})}var g=1,h=2,i=3,j=4,k=this,l=0,m=0,n=[];k.promise={},k.resolve=function(a){return l||(m=a,l=g,f()),this},k.reject=function(a){return l||(m=a,l=h,f()),this},k.promise.then=function(a,b){var c=new y(a,b);return l===i?c.resolve(m):l===j?c.reject(m):n.push(c),c.promise}}function z(a){return a}function A(a){if(!a.dataType||"jsonp"!==a.dataType.toLowerCase()){var d=new b.XMLHttpRequest;if(d.open(a.method,a.url,!0,a.user,a.password),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?a.onload({type:"load",target:d}):a.onerror({type:"error",target:d}))},a.serialize===JSON.stringify&&a.data&&"GET"!==a.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.deserialize===JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),typeof a.config===K){var e=a.config(d,a);null!=e&&(d=e)}var f="GET"!==a.method&&a.data?a.data:"";if(f&&L.call(f)!=J&&f.constructor!=b.FormData)throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";return d.send(f),d}var g="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),h=D.createElement("script");b[g]=function(d){h.parentNode.removeChild(h),a.onload({type:"load",target:{responseText:d}}),b[g]=c},h.onerror=function(){return h.parentNode.removeChild(h),a.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),b[g]=c,!1},h.onload=function(){return!1},h.src=a.url+(a.url.indexOf("?")>0?"&":"?")+(a.callbackKey?a.callbackKey:"callback")+"="+g+"&"+u(a.data||{}),D.body.appendChild(h)}function B(a,b,c){if("GET"===a.method&&"jsonp"!=a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=u(b);a.url=a.url+(e?d+e:"")}else a.data=c(b);return a}function C(a,b){var c=a.match(/:[a-z]\w+/gi);if(c&&b)for(var d=0;d<c.length;d++){var e=c[d].slice(1);a=a.replace(c[d],b[e]),delete b[e]}return a}var D,E,F,G,H="[object Object]",I="[object Array]",J="[object String]",K="function",L={}.toString,M=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,N=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,O=/^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/,P=function(){};d(b);var Q,R={appendChild:function(a){Q===c&&(Q=D.createElement("html")),D.documentElement&&D.documentElement!==a?D.replaceChild(a,D.documentElement):D.appendChild(a),this.childNodes=D.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},S=[],T={};e.render=function(a,b,d){var e=[];if(!a)throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var g=m(a),h=a===D,j=h||a===D.documentElement?R:a;h&&"html"!=b.tag&&(b={tag:"html",attrs:{},children:b}),T[g]===c&&i(j.childNodes),d===!0&&w(a),T[g]=f(j,null,c,c,b,T[g],!1,0,null,c,e);for(var k=0,l=e.length;l>k;k++)e[k]()},e.trust=function(a){return a=new String(a),a.$trusted=!0,a},e.prop=function(a){return(null!=a&&L.call(a)===H||typeof a===K)&&typeof a.then===K?x(a):n(a)};var U,V=[],W=[],X=[],Y=null,Z=0,$=null,_=null,ab=[],bb=16;e.component=function(a){return o(a,[].slice.call(arguments,1))},e.mount=e.module=function(a,b){if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var c=V.indexOf(a);0>c&&(c=V.length);for(var d,f=!1,g={preventDefault:function(){f=!0,$=_=null}},h=0;d=ab[h];h++)d.handler.call(d.controller,g),d.controller.onunload=null;if(f)for(var d,h=0;d=ab[h];h++)d.controller.onunload=d.handler;else ab=[];if(X[c]&&typeof X[c].onunload===K&&X[c].onunload(g),!f){e.redraw.strategy("all"),e.startComputation(),V[c]=a,arguments.length>2&&(b=subcomponent(b,[].slice.call(arguments,2)));var i=U=b=b||{controller:function(){}},j=b.controller||P,k=new j;return i===U&&(X[c]=k,W[c]=b),eb(),X[c]}};var cb=!1;e.redraw=function(a){cb||(cb=!0,Y&&a!==!0?(F===b.requestAnimationFrame||new Date-Z>bb)&&(Y>0&&G(Y),Y=F(p,bb)):(p(),Y=F(function(){Y=null},bb)),cb=!1)},e.redraw.strategy=e.prop();var db=0;e.startComputation=function(){db++},e.endComputation=function(){db=Math.max(db-1,0),0===db&&e.redraw()};var eb=function(){"none"==e.redraw.strategy()?(db--,e.redraw.strategy("diff")):e.endComputation()};e.withAttr=function(a,b){return function(c){c=c||event;var d=c.currentTarget||this;b(a in d?d[a]:d.getAttribute(a))}};var fb,gb,hb={pathname:"",hash:"#",search:"?"},ib=P,jb=!1;return e.route=function(){if(0===arguments.length)return gb;if(3===arguments.length&&L.call(arguments[1])===J){var a=arguments[0],c=arguments[1],d=arguments[2];ib=function(b){var f=gb=q(b);if(!r(a,d,f)){if(jb)throw new Error("Ensure the default route matches one of the routes defined in m.route");jb=!0,e.route(c,!0),jb=!1}};var f="hash"===e.route.mode?"onhashchange":"onpopstate";b[f]=function(){var a=E[e.route.mode];"pathname"===e.route.mode&&(a+=E.search),gb!=q(a)&&ib(a)},$=t,b[f]()}else if(arguments[0].addEventListener||arguments[0].attachEvent){var g=arguments[0],h=(arguments[1],arguments[2],arguments[3]);g.href=("pathname"!==e.route.mode?E.pathname:"")+hb[e.route.mode]+h.attrs.href,g.addEventListener?(g.removeEventListener("click",s),g.addEventListener("click",s)):(g.detachEvent("onclick",s),g.attachEvent("onclick",s))}else if(L.call(arguments[0])===J){var i=gb;gb=arguments[0];var j=arguments[1]||{},k=gb.indexOf("?"),l=k>-1?v(gb.slice(k+1)):{};for(var m in j)l[m]=j[m];var n=u(l),o=k>-1?gb.slice(0,k):gb;n&&(gb=o+(-1===o.indexOf("?")?"?":"&")+n);var p=(3===arguments.length?arguments[2]:arguments[1])===!0||i===arguments[0];b.history.pushState?($=t,_=function(){b.history[p?"replaceState":"pushState"](null,D.title,hb[e.route.mode]+gb)},ib(hb[e.route.mode]+gb)):(E[e.route.mode]=gb,ib(hb[e.route.mode]+gb))}},e.route.param=function(a){if(!fb)throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");return fb[a]},e.route.mode="search",e.route.buildQueryString=u,e.route.parseQueryString=v,e.deferred=function(){var a=new y;return a.promise=x(a.promise),a},e.deferred.onerror=function(a){if("[object Error]"===L.call(a)&&!a.constructor.toString().match(/ Error/))throw a},e.sync=function(a){function b(a,b){return function(e){return g[a]=e,b||(c="reject"),0===--f&&(d.promise(g),d[c](g)),e}}var c="resolve",d=e.deferred(),f=a.length,g=new Array(f);if(a.length>0)for(var h=0;h<a.length;h++)a[h].then(b(h,!0),b(h,!1));else d.resolve([]);return d.promise},e.request=function(a){a.background!==!0&&e.startComputation();var b=new y,c=a.dataType&&"jsonp"===a.dataType.toLowerCase(),d=a.serialize=c?z:a.serialize||JSON.stringify,f=a.deserialize=c?z:a.deserialize||JSON.parse,g=c?function(a){return a.responseText}:a.extract||function(a){return 0===a.responseText.length&&f===JSON.parse?null:a.responseText};return a.method=(a.method||"GET").toUpperCase(),a.url=C(a.url,a.data),a=B(a,a.data,d),a.onload=a.onerror=function(c){try{c=c||event;var d=("load"===c.type?a.unwrapSuccess:a.unwrapError)||z,h=d(f(g(c.target,a)),c.target);if("load"===c.type)if(L.call(h)===I&&a.type)for(var i=0;i<h.length;i++)h[i]=new a.type(h[i]);else a.type&&(h=new a.type(h));b["load"===c.type?"resolve":"reject"](h)}catch(c){e.deferred.onerror(c),b.reject(c)}a.background!==!0&&e.endComputation()},A(a),b.promise=x(b.promise,a.initialValue),b.promise},e.deps=function(a){return d(b=a||b),b},e.deps.factory=a,e}("undefined"!=typeof window?window:{});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=m:"function"==typeof define&&define.amd&&define(function(){return m});
// Generated by LiveScript 1.3.1
(function(){
  var player, unanchor, anchor, anchor_preview, unrandom, random, random_preview, link_regexp, link_regexp_g, id_num, uri_to_link, link, space, br, unbr, nowrap, unhtml, ref$;
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
    return "<span external=\"link_" + id_num + "," + uri + "," + protocol + "," + host + "," + path + "\" class=\"emboss\">LINK - " + protocol + "</span>";
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
  ref$ = Array.prototype;
  Object.defineProperty(ref$, 'last', {
    get: function(){
      return this[this.length - 1];
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(ref$, 'first', {
    get: function(){
      return this[0];
    },
    configurable: true,
    enumerable: true
  });
  ref$ = String.prototype;
  Object.defineProperty(ref$, 'deco_preview', {
    get: function(){
      return br(space(player(anchor_preview(link(random_preview(unhtml(this)))))));
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(ref$, 'deco_text', {
    get: function(){
      return space(player(anchor(link(random(this)))));
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(ref$, 'line_text', {
    get: function(){
      return nowrap(player(anchor(link(random(this)))));
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(ref$, 'undecolate', {
    get: function(){
      return unanchor(unrandom(unbr(this)));
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(ref$, 'sjis_length', {
    get: function(){
      var other;
      other = this.match(/[^\x01-\xff]/g) || [];
      return this.length + other.length;
    },
    configurable: true,
    enumerable: true
  });
}).call(this);
// Generated by LiveScript 1.3.1
(function(){
  var set_scroll, scroll_end, win, out$ = typeof exports != 'undefined' && exports || this;
  set_scroll = function(win){
    win.left = window.pageXOffset || window.scrollX;
    return win.top = window.pageYOffset || window.scrollY;
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
        var docElem, docBody, ref$, body_height, body_width;
        docElem = document.documentElement;
        docBody = document.body;
        win.height = Math.max(window.innerHeight, docElem.clientHeight);
        win.width = Math.max(window.innerWidth, docElem.clientWidth);
        if (win.width < 380 || win.height < 380) {
          head.browser.viewport = "width=device-width, maximum-scale=2.0, minimum-scale=0.5, initial-scale=0.5";
          if ((ref$ = document.querySelector("meta[name=viewport]")) != null) {
            ref$.content = head.browser.viewport;
          }
        }
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
      scroll_end: scroll_end,
      scroll: function(e){
        var docElem;
        docElem = document.documentElement;
        set_scroll(win);
        win.right = win.left + win.width;
        win.bottom = win.top + win.height;
        if (!win.scrolling) {
          win.do_event_list(win.on.scroll_start);
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
    width: 0,
    height: 0,
    scroll: null,
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
}).call(this);
// Generated by LiveScript 1.3.1
(function(){
  var Cache, Query, Finder, Rule, out$ = typeof exports != 'undefined' && exports || this, toString$ = {}.toString, slice$ = [].slice;
  out$.Cache = Cache = (function(){
    Cache.displayName = 'Cache';
    var prototype = Cache.prototype, constructor = Cache;
    Cache.rule = {};
    function Cache(){}
    return Cache;
  }());
  Cache.Query = Query = (function(){
    Query.displayName = 'Query';
    var prototype = Query.prototype, constructor = Query;
    function Query(finder, filters, desc, sort_by){
      this.finder = finder;
      this.filters = filters;
      this.desc = desc;
      this.sort_by = sort_by;
    }
    prototype._filters = function(query, cb){
      var filters, target, req;
      if (!query) {
        return this;
      }
      filters = this.filters.concat();
      switch (toString$.call(query).slice(8, -1)) {
      case 'Object':
        for (target in query) {
          req = query[target];
          filters.push(cb(target, req));
        }
        break;
      case 'Function':
        filters.push(cb(null, query));
        break;
      default:
        console.log([toString$.call(query).slice(8, -1), query]);
        throw Error('unimplemented');
      }
      return new Cache.Query(this.finder, filters, this.desc, this.sort_by);
    };
    prototype['in'] = function(query){
      return this._filters(query, function(target, req){
        switch (toString$.call(req).slice(8, -1)) {
        case 'Array':
          return function(o){
            var i$, ref$, len$, key, j$, ref1$, len1$, val;
            for (i$ = 0, len$ = (ref$ = req).length; i$ < len$; ++i$) {
              key = ref$[i$];
              for (j$ = 0, len1$ = (ref1$ = o[target]).length; j$ < len1$; ++j$) {
                val = ref1$[j$];
                if (val === key) {
                  return true;
                }
              }
            }
            return false;
          };
        case 'RegExp':
          return function(o){
            var i$, ref$, len$, val;
            for (i$ = 0, len$ = (ref$ = o[target]).length; i$ < len$; ++i$) {
              val = ref$[i$];
              if (req.test(val)) {
                return true;
              }
            }
            return false;
          };
        case 'Null':
        case 'Boolean':
        case 'String':
        case 'Number':
          return function(o){
            var i$, ref$, len$, val;
            for (i$ = 0, len$ = (ref$ = o[target]).length; i$ < len$; ++i$) {
              val = ref$[i$];
              if (val === req) {
                return true;
              }
            }
            return false;
          };
        default:
          console.log([toString$.call(req).slice(8, -1), req]);
          throw Error('unimplemented');
        }
      });
    };
    prototype.distinct = function(reduce, target){
      var query;
      query = new Cache.Query(this.finder, this.filters, this.desc, this.sort_by);
      query._distinct = {
        reduce: reduce,
        target: target
      };
      return query;
    };
    prototype.where = function(query){
      return this._filters(query, function(target, req){
        switch (toString$.call(req).slice(8, -1)) {
        case 'Array':
          return function(o){
            var i$, ref$, len$, key;
            for (i$ = 0, len$ = (ref$ = req).length; i$ < len$; ++i$) {
              key = ref$[i$];
              if (o[target] === key) {
                return true;
              }
            }
            return false;
          };
        case 'RegExp':
          return function(o){
            return req.test(o[target]);
          };
        case 'Function':
          return req;
        case 'Null':
        case 'Boolean':
        case 'String':
        case 'Number':
          return function(o){
            return o[target] === req;
          };
        default:
          console.log([toString$.call(req).slice(8, -1), req]);
          throw Error('unimplemented');
        }
      });
    };
    prototype.search = function(text){
      var list, res$, i$, ref$, len$, item, regexp;
      if (!text) {
        return this;
      }
      res$ = [];
      for (i$ = 0, len$ = (ref$ = text.split(/\s+/)).length; i$ < len$; ++i$) {
        item = ref$[i$];
        item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        if (!item.length) {
          continue;
        }
        res$.push("(" + item + ")");
      }
      list = res$;
      if (!list.length) {
        return this;
      }
      regexp = new RegExp(list.join("|"), "ig");
      return this.where(function(o){
        return !o.search_words || regexp.test(o.search_words);
      });
    };
    prototype.sort = function(desc, order){
      var sort_by;
      order == null && (order = this.sort_by);
      sort_by = (function(){
        switch (toString$.call(order).slice(8, -1)) {
        case 'Function':
          return order;
        case 'String':
        case 'Number':
          return function(o){
            return o[order];
          };
        default:
          console.log([toString$.call(req).slice(8, -1), req]);
          throw Error('unimplemented');
        }
      }());
      if (desc === this.desc && sort_by === this.sort_by) {
        return this;
      }
      return new Cache.Query(this.finder, this.filters, desc, sort_by);
    };
    prototype.clear = function(){
      var ref$;
      delete this._reduce;
      delete this._list;
      return ref$ = this._hash, delete this._hash, ref$;
    };
    prototype.reduce = function(){
      if (this._reduce == null) {
        this.finder.calculate(this);
      }
      return this._reduce;
    };
    prototype.list = function(){
      if (this._list == null) {
        this.finder.calculate(this);
      }
      return this._list;
    };
    prototype.hash = function(){
      if (this._hash == null) {
        this.finder.calculate(this);
      }
      return this._hash;
    };
    prototype.find = function(id){
      var ref$;
      return (ref$ = this.hash()[id]) != null ? ref$.item : void 8;
    };
    return Query;
  }());
  Cache.Finder = Finder = (function(){
    Finder.displayName = 'Finder';
    var prototype = Finder.prototype, constructor = Finder;
    function Finder(sort_by){
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
    prototype.rehash = function(rules, diff){
      var i$, len$, rule;
      delete this.query.all._reduce;
      delete this.query.all._list;
      this.query = {
        all: this.query.all
      };
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        rule.rehash(diff);
      }
    };
    prototype.calculate_reduce = function(query){
      var init, reduce, calc, base, id, ref$, ref1$, item, emits, i$, len$, keys, last, map, o, j$, len1$, key, group;
      init = function(map){
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
      reduce = function(item, o, map){
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
      calc = function(o){
        if (o.all && o.count) {
          return o.avg = o.all / o.count;
        }
      };
      base = {};
      for (id in ref$ = query._hash) {
        ref1$ = ref$[id], item = ref1$.item, emits = ref1$.emits;
        for (i$ = 0, len$ = emits.length; i$ < len$; ++i$) {
          ref1$ = emits[i$], keys = ref1$[0], last = ref1$[1], map = ref1$[2];
          o = base;
          for (j$ = 0, len1$ = keys.length; j$ < len1$; ++j$) {
            key = keys[j$];
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
    prototype.calculate_sort = function(query){
      var list, ref$, lt, gt, s, i$, len$, o, is_array;
      list = query._list;
      ref$ = query.desc
        ? [1, -1]
        : [-1, 1], lt = ref$[0], gt = ref$[1];
      s = query.orders = {};
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        o = list[i$];
        s[o._id] = query.sort_by(o);
      }
      if (list.length) {
        is_array = Array.isArray(query.sort_by(list[0]));
      }
      return query._list = is_array
        ? list.sort(function(a, b){
          var a_list, b_list, i$, len$, index, a_val, b_val;
          a_list = s[a._id];
          b_list = s[b._id];
          for (i$ = 0, len$ = a_list.length; i$ < len$; ++i$) {
            index = i$;
            a_val = a_list[i$];
            b_val = b_list[index];
            if (a_val < b_val) {
              return lt;
            }
            if (a_val > b_val) {
              return gt;
            }
          }
          return 0;
        })
        : list.sort(function(a, b){
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
    prototype.calculate_group = function(query){
      var ref$, reduce, target, id, o;
      ref$ = query._distinct, reduce = ref$.reduce, target = ref$.target;
      return query._list = (function(){
        var ref$, results$ = [];
        for (id in ref$ = query._reduce[reduce]) {
          o = ref$[id];
          results$.push(o[target]);
        }
        return results$;
      }());
    };
    prototype.calculate_list = function(query, all){
      var deploy, id, o, filters;
      if (query._hash !== all) {
        query._hash = {};
        deploy = function(id, o){
          query._hash[id] = o;
          return o.item;
        };
      } else {
        deploy = function(id, o){
          return o.item;
        };
      }
      return query._list = (function(){
        var ref$, i$, ref1$, len$, results$ = [];
        for (id in ref$ = all) {
          o = ref$[id];
          for (i$ = 0, len$ = (ref1$ = query.filters).length; i$ < len$; ++i$) {
            filters = ref1$[i$];
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
          results$.push(deploy(id, o));
        }
        return results$;
      }());
    };
    prototype.calculate = function(query){
      this.calculate_list(query, this.query.all._hash);
      if (query._list.length && this.map_reduce != null) {
        this.calculate_reduce(query);
        if (query._distinct != null) {
          this.calculate_group(query);
        }
      }
      this.calculate_sort(query);
    };
    return Finder;
  }());
  Cache.Rule = Rule = (function(){
    Rule.displayName = 'Rule';
    var prototype = Rule.prototype, constructor = Rule;
    Rule.responses = {};
    function Rule(field){
      var ref$, ref1$, this$ = this;
      this.id = field + "_id";
      this.list_name = field + "s";
      this.validates = [];
      this.responses = (ref1$ = (ref$ = Cache.Rule.responses)[field]) != null
        ? ref1$
        : ref$[field] = [];
      this.map_reduce = function(){};
      this.protect = function(){};
      this.deploy = function(o){
        if (!o._id) {
          o._id = o[this$.id];
        }
        if (!o[this$.id]) {
          return o[this$.id] = o._id;
        }
      };
      this.finder = new Cache.Finder(function(list){
        return list;
      });
      this.finder.name = this.list_name;
      Cache.rule[field] = this;
      Cache[this.list_name] = this.finder.query.all;
    }
    prototype.schema = function(cb){
      var definer, this$ = this;
      definer = {
        scope: function(cb){
          var set_scope, key, ref$, query_call, results$ = [];
          this$.finder.scope = cb(this$.finder.query.all);
          set_scope = function(key, finder, query_call){
            return finder.query.all[key] = function(){
              var args, ref$, key$, ref1$;
              args = slice$.call(arguments);
              return (ref1$ = (ref$ = finder.query)[key$ = key + ":" + JSON.stringify(args)]) != null
                ? ref1$
                : ref$[key$] = query_call.apply(null, args);
            };
          };
          for (key in ref$ = this$.finder.scope) {
            query_call = ref$[key];
            results$.push(set_scope(key, this$.finder, query_call));
          }
          return results$;
        },
        depend_on: function(parent){
          var ref$;
          (ref$ = Cache.Rule.responses)[parent] == null && (ref$[parent] = []);
          return Cache.Rule.responses[parent].push(this$);
        },
        belongs_to: function(parent, option){
          var parents, parent_id, dependent, ref$;
          parents = parent + "s";
          parent_id = parent + "_id";
          dependent = (option != null ? option.dependent : void 8) != null;
          if (dependent) {
            (ref$ = Cache.Rule.responses)[parent] == null && (ref$[parent] = []);
            Cache.Rule.responses[parent].push(this$);
          }
          return this$.validates.push(function(o){
            var that, ref$;
            that = (ref$ = Cache[parents]) != null ? ref$.find(o[parent_id]) : void 8;
            if (that != null) {
              return o[parent] = that;
            } else {
              return !dependent;
            }
          });
        },
        order: function(order){
          var query;
          query = this$.finder.query.all.sort(false, order);
          query._hash = this$.finder.query.all._hash;
          return Cache[this$.list_name] = this$.finder.query.all = query;
        },
        protect: function(){
          var keys;
          keys = slice$.call(arguments);
          return this$.protect = function(o, old){
            var i$, ref$, len$, key, results$ = [];
            for (i$ = 0, len$ = (ref$ = keys).length; i$ < len$; ++i$) {
              key = ref$[i$];
              results$.push(o[key] = old[key]);
            }
            return results$;
          };
        },
        deploy: function(deploy){
          this$.deploy = deploy;
        },
        map_reduce: function(map_reduce){
          this$.map_reduce = map_reduce;
        }
      };
      return cb.call(definer, this);
    };
    prototype.rehash = function(diff){
      return this.finder.rehash(this.responses, diff);
    };
    prototype.set_base = function(mode, from, parent){
      var finder, diff, all, validate_item, i$, ref$, len$, item, key, val, o, old, emit, this$ = this;
      finder = this.finder;
      diff = finder.diff;
      all = finder.query.all._hash;
      validate_item = function(item){
        var i$, ref$, len$, validate;
        for (i$ = 0, len$ = (ref$ = this$.validates).length; i$ < len$; ++i$) {
          validate = ref$[i$];
          if (!validate(item)) {
            return false;
          }
        }
        return true;
      };
      switch (mode) {
      case "merge":
        for (i$ = 0, len$ = (ref$ = from || []).length; i$ < len$; ++i$) {
          item = ref$[i$];
          for (key in parent) {
            val = parent[key];
            item[key] = val;
          }
          if (!validate_item(item)) {
            continue;
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
          emit = fn$;
          this.map_reduce(o.item, emit);
        }
        break;
      default:
        for (i$ = 0, len$ = (ref$ = from || []).length; i$ < len$; ++i$) {
          item = ref$[i$];
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
      this.rehash(diff);
      function fn$(){
        var i$, keys, last, map;
        keys = 0 < (i$ = arguments.length - 2) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), last = arguments[i$], map = arguments[i$ + 1];
        finder.map_reduce = true;
        return o.emits.push([keys, last, map]);
      }
    };
    prototype.set = function(list, parent){
      var key, ref$, val;
      this.finder.diff = {};
      for (key in ref$ = this.finder.query.all._hash) {
        val = ref$[key];
        this.finder.query.all._hash = {};
        this.finder.diff.del = true;
        break;
      }
      return this.set_base("merge", list, parent);
    };
    prototype.reject = function(list){
      this.finder.diff = {};
      return this.set_base(false, list, null);
    };
    prototype.merge = function(list, parent){
      this.finder.diff = {};
      return this.set_base("merge", list, parent);
    };
    return Rule;
  }());
}).call(this);
var Btn, Btns, Submit, Txt,
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

Submit = (function() {
  return {
    get: function(url) {
      var query;
      query = {
        method: "GET",
        url: url,
        serialize: function(data) {
          console.log(data);
          return data;
        },
        deserialize: Serial.parser.HtmlGon
      };
      return m.request(query);
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
    if (style["class"] == null) {
      style["class"] = 'edge';
    }
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
    call: function(style, call) {
      var prop;
      prop = function() {
        return null;
      };
      return base(style, eq, call, prop, "call");
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
      var hash, key, order, _i, _j, _len, _len1, _results;
      hash = {};
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        key = list[_i];
        hash[key] || (hash[key] = 0);
        hash[key] += 1;
      }
      order = Object.keys(hash).sort(function(a, b) {
        return hash[b] - hash[a];
      });
      _results = [];
      for (_j = 0, _len1 = order.length; _j < _len1; _j++) {
        key = order[_j];
        _results.push(cb(name(key), hash[key]));
      }
      return _results;
    };
  };
  name_config = function(o) {
    var _ref, _ref1, _ref2;
    return ((_ref = RAILS.roles[o]) != null ? _ref.name : void 0) || ((_ref1 = RAILS.gifts[o]) != null ? _ref1.name : void 0) || ((_ref2 = RAILS.events[o]) != null ? _ref2.name : void 0) || o || "";
  };
  return {
    img_head: "http://giji-assets.s3-website-ap-northeast-1.amazonaws.com/images",
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
        data = attr && Serial.parser.Array((_ref1 = elem.attributes[attr]) != null ? _ref1.value : void 0);
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
        tick = cb(_.now());
        if (tick) {
          return setTimeout(function() {
            return action();
          }, tick);
        }
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
GUI.form = (function() {
  var submit;
  submit = function(props, f) {
    return GUI.attrs({}, function() {
      return this.start(function(e) {
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
      }, GUI.message.action_text(null, f.name, f.style, f.log().deco_preview), m("h6", "" + f.count + " " + f.title), m(".mark", f.errors), m(".formpl_content", m("select.mini", Txt.input(props.target), f.targets), m("select.mini", Txt.input(props.action), f.actions)), m("input[type=text]", Txt.input(f.log))), m("p", m("a.btn", submit(props, f), "アクション")), m("p", m("span" + f.error, f.valid_text)));
    },
    entry: function(f, props) {
      return m("form[name=entry_form]", m("table." + f.mestype + ".talk", {
        key: f._id
      }, m("tr", m("th", GUI.portrate(f.chr_job.face_id)), m("td", m(".msg", m("p", m("label.medium[for=entry_pwd]", "参加パスワード"), m("input#entry_pwd[type=password][maxlength=8][size=8]", Txt.input(props.password))), m("p", m("label.medium[for=entry_csid]", "希望する配役"), m("select#entry_csid", Txt.input(props.csid_cid), f.csid_cids)), m("p", m("label.medium[for=entry_role]", "希望する役職"), m("select#entry_role", Txt.input(props.role), f.roles)), m("div", f.is_preview() ? (GUI.message.talk_name(null, "" + f.chr_job.job + " " + f.chr_job.face.name), GUI.message.talk_text(null, props.style(), f.log().deco_preview), m("h6", "参加する時のセリフ")) : (m("textarea[cols=30][rows=" + f.lines + "]", Txt.input(f.log)), m("h6", "参加する時のセリフ"), m(".mark", f.errors))), m("p", f.is_preview() ? (m("a.btn", Btn.bool(f.is_preview), "戻る"), m("a.btn", submit(props, f), f.title), f.count, m("select.small", Txt.input(props.style), f.styles)) : (m("a.btn", Btn.bool(f.is_preview), f.title), f.count, m("select.small", Txt.input(props.style), f.styles))), m("p", f.caption, m("span." + f.error, f.valid_text), !f.is_preview() ? m("span", f.diary) : void 0))))));
    },
    memo: function(f, props) {
      return m("form[name=memo_form]", m("table." + f.mestype + ".memo", {
        key: f._id
      }, m("tr", m("th", GUI.portrate(f.chr_job.face_id), m("div", m("b", "" + f.chr_job.job + " " + f.chr_job.face.name))), m("td", f.is_preview() ? (GUI.message.talk_text(props.style(), f.log().deco_preview), m("h6", "参加する時のセリフ")) : (m("textarea[cols=30][rows=" + f.lines + "]", Txt.input(f.log)), m("h6", "参加する時のセリフ"), m(".mark", f.errors)), m("p", f.is_preview() ? (m("a.btn", Btn.bool(f.is_preview), "戻る"), m("a.btn", submit(props, f), f.title), f.count, m("select.small", Txt.input(props.style), f.styles)) : (m("a.btn", Btn.bool(f.is_preview), f.title), f.count, m("select.small", Txt.input(props.style), f.styles))), m("p", f.caption, m("span." + f.error, f.valid_text), !f.is_preview() ? m("span", f.diary) : void 0)))));
    },
    open: function(f, props) {},
    secret: function(f, props) {},
    silent: function(f, props) {},
    version: function(f, props) {},
    votes: function(f, props) {},
    story: function(f, props) {}
  };
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

  MenuTree.prototype.open = function(node) {
    if (node == null) {
      node = this.nodes[this.state()];
    }
    if (node) {
      return node.open(node.menu);
    }
  };

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
  var deco_action, identity_action;
  deco_action = function(by_id) {
    return {
      config: function(parent, is_continue, context) {
        GUI.attrs_to(parent, "span[anchor]", {}, function(a, turn, id) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_anchor(turn, a, id, by_id);
            return m.endComputation();
          });
        });
        GUI.attrs_to(parent, "span[random]", {}, function(cmd, val) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_random(cmd, val, by_turn, by_id);
            return m.endComputation();
          });
        });
        return GUI.attrs_to(parent, "span[external]", {}, function(id, uri, protocol, host, path) {
          return this.start(function(e) {
            m.startComputation();
            GUI.message.delegate.tap_external(id, uri, protocol, host, path, by_id);
            return m.endComputation();
          });
        });
      }
    };
  };
  identity_action = function(o) {
    var attr;
    return attr = GUI.attrs({}, function() {
      return this.start(function(e) {
        return GUI.message.delegate.tap_identity(o.event.turn, o.logid, o._id);
      });
    });
  };
  return {
    delegate: {
      tap_identity: function() {
        return console.log(arguments);
      },
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
    cmd_target: function() {
      var button, buttons, target, targets;
      targets = (function() {
        var _i, _len, _ref, _results;
        _ref = Cache.targets.command(o.cmd).list();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          target = _ref[_i];
          _results.push(m("option", {
            value: target.val
          }, target.name));
        }
        return _results;
      })();
      targets.unshift(m("option", {
        value: "?",
        selected: true
      }, "- 選択してください -"));
      buttons = (function() {
        var _i, _len, _ref, _results;
        _ref = Cache.commands.target().list();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          button = _ref[_i];
          _results.push(m("option", button.title));
        }
        return _results;
      })();
      return m("p.commitbutton", m("select", targets), m("select", buttons), Btn.submit({}, {}));
    },

    /*
    "epilogue":0,
    "event":null,
    "say":{},
    "seance":{},
    "turn":0,
     */
    story_game: function(o) {
      var event, event_card, mob, option, option_id, roletable, story, text, texts;
      event = o.event;
      story = o.event.story;
      if (!(event && story)) {
        return [];
      }
      roletable = RAILS.roletable[story.type.roletable];
      mob = RAILS.mob[story.type.mob];
      event_card = RAILS.events[event.event];
      texts = [];
      if (event.winner && "WIN_NONE" !== event.winner) {
        texts.push(RAILS.winner[event.winner] + "の勝利です。");
      }
      if (event_card) {
        texts.push(m("kbd", event_card));
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
      }, (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = texts.length; _i < _len; _i++) {
          text = texts[_i];
          _results.push(m("p.text", text));
        }
        return _results;
      })(), [
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
        })())), GUI.letter("", "" + roletable + " / " + story.view.player_length + "人", m("div", m("code", "事件"), story.view.event_cards), m("div", m("code", "役職"), story.view.role_cards), m("div", m("code", mob.CAPTION), m("kbd", "" + mob.HELP))), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black")
      ]);
    },
    story_rule: function(o) {
      var event, rating, saycnt, story;
      event = o.event;
      story = o.event.story;
      if (!(event && story)) {
        return [];
      }
      rating = RAILS.rating[story.rating];
      saycnt = RAILS.saycnt[story.type.say] || {};
      return m(".MAKER." + event.winner + ".guide", {
        key: "STORY-RULE"
      }, GUI.letter("", "設定", m("div", m("code", "こだわり"), m("img", {
        src: GUI.img_head + ("/icon/cd_" + story.rating + ".png")
      }), m.trust(rating.caption)), m("div", m("code", "発言制限"), m.trust(saycnt.CAPTION + "<br>" + saycnt.HELP)), m("div", m("code", "更新"), story.view.update_at + "(" + story.view.update_interval + "ごと)")), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
    },
    story_text: function(o) {
      var story;
      story = o.event.story;
      return m(".MAKER.guide", {
        key: "STORY-TEXT"
      }, GUI.letter("head", story.name, m.trust(story.comment)), m("span.mes_date.pull-right", "managed by ", m(".emboss", story.user_id)), m("hr.black"));
    },
    event: function(o) {
      var btn, list;
      btn = o.event.view.btn();
      list = [];
      list.push(m("h3", m.trust(o.name)));
      if (btn) {
        list.push(btn);
      }
      return m("." + o.mestype, {
        key: o._id
      }, list);
    },
    potofs: function(v) {
      var filter_class, hides, o, potofs_desc, potofs_order, toggle_desc, _ref;
      _ref = Url.prop, potofs_order = _ref.potofs_order, potofs_desc = _ref.potofs_desc;
      toggle_desc = function(prop, value) {
        var attr;
        if (prop() === value) {
          attr = Btn.bool({}, potofs_desc);
          attr.className = "btn edge active";
          return attr;
        } else {
          return Btn.set({}, prop, value);
        }
      };
      hides = Url.prop.potofs_hide();
      return m("section.table-swipe", m("table", m("tfoot", m("tr.center", m("th[colspan=2]", m("sup", "(スクロールします。)")), m("th", m("a", toggle_desc(potofs_order, "stat_at"), "日程")), m("th", m("a", toggle_desc(potofs_order, "stat_type"), "状態")), m("th", m("a", toggle_desc(potofs_order, "said_num"), "発言")), m("th", m("a", toggle_desc(potofs_order, "pt"), "残り")), m("th", m("a", toggle_desc(potofs_order, "urge"), "促")), m("th", m("span.icon-user", " ")), m("th", m("a", toggle_desc(potofs_order, "select"), "希望")), m("th", m("a", toggle_desc(potofs_order, "win_result"), "勝敗")), m("th", m("a", toggle_desc(potofs_order, "win_side"), "陣営")), m("th", m("a", toggle_desc(potofs_order, "role"), "役割")), m("th", m("a", toggle_desc(potofs_order, "text"), "補足")))), m("tbody.plane", {
        test: "test"
      }, (function() {
        var _i, _len, _ref1, _results;
        _ref1 = Cache.potofs.view(potofs_desc(), potofs_order()).list();
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          o = _ref1[_i];
          filter_class = hides[o.face_id] ? "filter-hide" : "";
          _results.push(m("tr", {
            className: filter_class
          }, m("th." + o.live + ".calc", {}, o.view.job), m("th." + o.live, {}, o.name), m("td." + o.live + ".calc", {}, o.view.stat_at), m("td." + o.live, {}, o.view.stat_type), m("td." + o.live + ".calc", {}, o.view.said_num), m("td." + o.live + ".calc", {}, o.view.pt), m("td." + o.live + ".center", {}, o.view.urge), m("td." + o.live + ".center", {}, o.view.user_id), m("td." + o.live + ".center", {}, o.view.select), m("td.WIN_" + o.view.win + ".center", {}, o.view.win_result), m("td.WIN_" + o.view.win + ".calc", {}, o.view.win_side), m("td.WIN_" + o.view.win, {}, o.view.role), m("td.WIN_" + o.view.win, {}, m.trust(o.view.text))));
        }
        return _results;
      })())));
    },
    xxx: function(v) {
      return m("div", {
        key: v._id
      }, ".U.C " + v._id);
    },
    info: function(v) {
      return m("." + v.mestype + ".info", {
        key: v._id
      }, GUI.message.talk_text(v._id, "", v.log.deco_text));
    },
    guide: function(v) {
      return m("." + v.mestype + ".guide", {
        key: v._id
      }, GUI.message.talk_name(v.user_id, v.name, v.to), GUI.message.talk_text(v._id, v.style, v.log.deco_text), m("p.mes_date", m("span.mark", identity_action(v), v.anchor), GUI.timer("span", v)));
    },
    action: function(v) {
      return m("." + v.mestype + ".action", {
        key: v._id
      }, GUI.message.action_text(v._id, v.name, v.style, v.log.deco_text), m("p.mes_date", GUI.timer("span", v)));
    },
    memo: function(v) {
      return m("table." + v.mestype + ".memo", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id), m("div", m("b", v.name))), m("td", GUI.message.talk_text(v._id, v.style, v.log.deco_text), m("p.mes_date", GUI.timer("span", v)))));
    },
    talk: function(v) {
      return GUI.message.say_base(v, m("span.mark", identity_action(v), v.anchor), GUI.timer("span", v));
    },
    history: function(v) {
      return GUI.message.say_base(v, m("span.mark", v.anchor));
    },
    say_base: function() {
      var timer, v;
      v = arguments[0], timer = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return m("table." + v.mestype + ".talk", {
        key: v._id
      }, m("tr", m("th", GUI.portrate(v.face_id)), m("td", m(".msg", GUI.message.talk_name(v.user_id, v.name, v.to), GUI.message.talk_text(v._id, v.style, v.log.deco_text), m("p.mes_date", timer)))));
    },
    action_text: function(by_id, name, style, text) {
      return m("p.text." + style, deco_action(by_id), m("b", m.trust(name)), "は、", m("span", m.trust(text)));
    },
    talk_name: function(user_id, name, to) {
      if (to) {
        return m("p.name.center", m("b.pull-left", m.trust("" + name)), m("b", "▷"), m("b.pull-right", m.trust("" + to)));
      } else {
        return m("p.name", m("b", m.trust(name)), m(".emboss.pull-right", user_id));
      }
    },
    talk_text: function(by_id, style, text) {
      return m("p.text." + style, deco_action(by_id), m.trust(text));
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
        offset = Math.min(win.horizon, rect.height) * 0.5;
      }
      top_by = rect.top - win.horizon + offset;
      left_by = 0;
      if (left_by || top_by) {
        return window.scrollBy(left_by, top_by);
      }
    }
  };

  GUI.do_tick(function(now) {
    var spy, _i, _len, _ref;
    _ref = ScrollSpy.list;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      spy = _ref[_i];
      if (spy.center) {
        spy.tick(spy.center);
      }
    }
    return 5000;
  });

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
    this.show_upper = true;
    this.size = 30;
    return this.head = this.tail = 0;
  };

  ScrollSpy.prototype.tick = function(center) {
    return console.log(center);
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
    var attr, btm, idx, key, o, pager_cb, rect, show_bottom, show_under, show_upper, top, vdom, vdom_items, _ref;
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
    this.center = this.list[idx];
    this.tail = Math.min(btm, idx + this.size);
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
GUI.timeline = function(_arg) {
  var attr, base, choice, colors, first_at, graph_height, height, last_at, max_height, mestype_orders, time_width, width, x, y;
  width = _arg.width, base = _arg.base, choice = _arg.choice;
  colors = {
    VSAY: "#ca6",
    VGSAY: "#a8a8e8",
    GSAY: "#bbd",
    SAY: "#cb8",
    MSAY: "#cb8",
    SPSAY: "#dcb",
    AIM: "#dcb",
    WSAY: "#a55",
    XSAY: "#9a7",
    BSAY: "#9a7",
    AIM: "#dcb",
    TSAY: "#a98",
    MAKER: "#000",
    ADMIN: "#000",
    text: "yellow",
    back: "#222",
    event: "#224",
    line: "#44a",
    focus: "yellow"
  };
  mestype_orders = ["SAY", "MSAY", "VSAY", "VGSAY", "GSAY", "SPSAY", "WSAY", "XSAY", "BSAY", "AIM", "TSAY", "MAKER", "ADMIN"];
  if (!Cache.events.list().length) {
    return;
  }
  last_at = Cache.events.list().last.updated_at / (1000 * 3600);
  first_at = Cache.events.list().first.created_at / (1000 * 3600);
  time_width = last_at - first_at;
  height = 130;
  graph_height = height - 50;
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
      var canvas, id, list, offsetX, offsetY, rect, _ref, _ref1;
      if (!win.is_touch) {
        return;
      }
      Url.prop.search("");
      canvas = document.querySelector("canvas");
      switch (false) {
        case !e.offsetX:
          offsetX = e.offsetX * 2;
          offsetY = e.offsetY * 2;
          break;
        case !e.layerX:
          offsetX = e.layerX * 2;
          offsetY = e.layerY * 2;
          break;
        case !e.pageX:
          rect = canvas.getBoundingClientRect();
          offsetX = (e.pageX - rect.left) * 2;
          offsetY = (e.pageY - rect.top) * 2;
          break;
        case !((_ref = e.touches) != null ? (_ref1 = _ref[0]) != null ? _ref1.pageX : void 0 : void 0):
          rect = canvas.getBoundingClientRect();
          offsetX = (e.touches[0].pageX - rect.left) * 2;
          offsetY = (e.touches[0].pageY - rect.top) * 2;
      }
      list = graph_height < offsetY ? Cache.messages.talk("open", false, {}).list() : base.list();
      id = find_last(list, Math.ceil(1000 * 3600 * (first_at + offsetX / x)));
      if (!id) {
        return;
      }
      return choice(id);
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
    return this.canvas(width, height / 2, {
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
        ctx.moveTo(x * offset, height);
        ctx.lineTo(x * offset, 0);
        return ctx.stroke();
      },
      background: function(ctx) {
        var color, count_height, count_width, event, left, mask, max_width, mestype, right, time_id, top, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        if (!base.reduce()) {
          return;
        }
        _ref = base.reduce().mask;
        for (time_id in _ref) {
          mask = _ref[time_id];
          if (max_height < mask.all.count) {
            max_height = mask.all.count;
          }
        }
        y = graph_height / max_height;
        ctx.clearRect(0, 0, width * 2, height);
        ctx.fillStyle = colors.back;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, x * time_width, y * max_height);
        count_width = 1;
        _ref1 = base.reduce().mask;
        for (time_id in _ref1) {
          mask = _ref1[time_id];
          left = Serial.parser.Date(time_id) - first_at;
          top = max_height;
          for (_i = 0, _len = mestype_orders.length; _i < _len; _i++) {
            mestype = mestype_orders[_i];
            color = colors[mestype];
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
        _ref2 = Cache.events.list();
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          if (!event.created_at) {
            continue;
          }
          right = event.updated_at / (1000 * 3600) - first_at;
          left = event.created_at / (1000 * 3600) - first_at;
          ctx.strokeStyle = colors.line;
          ctx.globalAlpha = 1;
          ctx.moveTo(x * left, height);
          ctx.lineTo(x * left, 0);
          ctx.fillStyle = colors.event;
          ctx.fillRect(x * left, graph_height, x * last_at, height);
          ctx.textAlign = "left";
          ctx.fillStyle = colors.text;
          ctx.font = "30px serif";
          max_width = x * (right - left) - 4;
          if (0 < max_width) {
            ctx.fillText(event.name, x * left, height - 12, max_width);
          }
        }
        return ctx.stroke();
      }
    });
  });
  x = attr.width / time_width;
  return m("canvas", attr);
};
var b;

if (head.browser != null) {
  b = head.browser;
  b.viewport = "width=device-width, maximum-scale=4.0, minimum-scale=1.0, initial-scale=1.0";
  if (navigator.userAgent.toLowerCase().indexOf('windows') !== -1) {
    b.win = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('macintosh') !== -1) {
    b.mac = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    b.android = true;
  }
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
    HtmlGon: function(html) {
      var code, match, pattern;
      pattern = /<script.*?>([\s\S]*?)<\/script>/ig;
      while (match = pattern.exec(html)) {
        code = match[1];
        if (code.length > 0) {
          eval(code);
        }
      }
      return gon;
    },
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

  Timer.cache = {};

  Timer.fetch = function(at) {
    var _base;
    return (_base = Timer.cache)[at] != null ? _base[at] : _base[at] = new Timer(at);
  };

  function Timer(at) {
    this.at = at;
  }

  Timer.prototype.start = function(bind) {
    return GUI.do_tick((function(_this) {
      return function(now) {
        _this.msec = now - _this.at;
        return _this.next(_this.msec / 1000, function(text, sec_span) {
          var diff, msec_span;
          _this.text = text;
          if (sec_span == null) {
            sec_span = Number.NaN;
          }
          if (!bind.update) {
            return 0;
          }
          bind.update(_this.text);
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
  };

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
var InputBase, InputSow, player_talk,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

new Cache.Rule("check").schema(function() {
  this.scope(function(all) {
    return {
      error: function(mode, text) {
        var max, query, validate;
        max = {
          unit: point,
          size: 1000,
          line: 20
        };
        validate = {
          type: null,
          is_open: true,
          is_disable: false,
          is_change: true,
          preview: "action",
          target: "TARGET",
          head: "HEAD"
        };
        query = all.where({
          type: "error",
          mode: mode
        }).where(function(o) {});
        query.input = InputSow["new"](max, validate);
        return query;
      }
    };
  });
  return this.deploy(function(o) {});
});

player_talk = /(^|\/\*)(.*)(\*\/|$)/ig;

Cache.rule.check.merge([
  {
    type: "error",
    chk: function(o) {
      return o.text == null;
    }
  }, {
    type: "error",
    chk: function(o) {
      return o.compact_size < 4;
    }
  }, {
    type: "warn",
    msg: "/*中の人の発言があります*/",
    chk: function(o) {
      return player_talk.exec;
    }
  }
]);

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


