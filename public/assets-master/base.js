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
Mithril v0.1.22
http://github.com/lhorie/mithril.js
(c) Leo Horie
License: MIT
*/

Mithril=m=new function a(b,c){function d(a){return{}.toString.call(a)}function e(a){return d(a)==I}function f(a){return d(a)==J}function g(a){return"function"==typeof a}function h(a){return d(a)==K}function i(){for(var a,b=Array.prototype.slice,c=b.call(arguments,0),g=(!(null==c[1]||!e(c[1])||"tag"in c[1]||"subtree"in c[1])),h=g?c[1]:{},i=("class"in h?"class":"className"),j={tag:"div",attrs:{}},k=[];a=L.exec(c[0]);)if(""==a[1])j.tag=a[2];else if("#"==a[1])j.attrs.id=a[2];else if("."==a[1])k.push(a[2]);else if("["==a[3][0]){var l=M.exec(a[3]);j.attrs[l[1]]=l[3]||(l[2]?"":!0)}k.length>0&&(j.attrs[i]=k.join(" "));var m=g?c[2]:c[1];j.children=f(m)||"[object Arguments]"==d(m)?b.call(m,0):c.slice(g?2:1);for(var n in h)j.attrs[n]=n==i?(j.attrs[n]||"")+" "+h[n]:h[n];return j}function j(a,e,i,m,p,q,r,s,t,u,v){if(null==p&&(p=""),"retain"===p.subtree)return q;var w=d(q),x=d(p);if(null==q||w!=x){if(null!=q)if(i&&i.nodes){var y=s-m,z=y+(x==J?p:q.nodes).length;l(i.nodes.slice(y,z),i.slice(y,z))}else q.nodes&&l(q.nodes,q);q=new p.constructor,q.tag&&(q={}),q.nodes=[]}if(x==J){p=o(p);for(var A=[],B=q.length===p.length,C=0,D=1,E=2,F=3,G={},H=[],K=!1,L=0;L<q.length;L++)q[L]&&q[L].attrs&&null!=q[L].attrs.key&&(K=!0,G[q[L].attrs.key]={action:D,index:L});if(K){for(var L=0;L<p.length;L++)if(p[L]&&p[L].attrs)if(null!=p[L].attrs.key){var M=p[L].attrs.key;G[M]=G[M]?{action:F,index:L,from:G[M].index,element:a.childNodes[G[M].index]||b.document.createElement("div")}:{action:E,index:L}}else H.push({index:L,element:a.childNodes[L]||b.document.createElement("div")});for(var O,P=Object.keys(G).map(function(a){return G[a]}),Q=P.sort(function(a,b){return a.action-b.action||a.index-b.index}),R=q.slice(),L=0;O=Q[L];L++){if(O.action==D&&(l(q[O.index].nodes,q[O.index]),R.splice(O.index,1)),O.action==E){var S=b.document.createElement("div");S.key=p[O.index].attrs.key,a.insertBefore(S,a.childNodes[O.index]),R.splice(O.index,0,{attrs:{key:p[O.index].attrs.key},nodes:[S]})}O.action==F&&(a.childNodes[O.index]!==O.element&&null!==O.element&&a.insertBefore(O.element,a.childNodes[O.index]),R[O.index]=q[O.from])}for(var L=0;L<H.length;L++){var O=H[L];a.insertBefore(O.element,a.childNodes[O.index]),R[O.index]=q[O.index]}q=R,q.nodes=[];for(var T,L=0;T=a.childNodes[L];L++)q.nodes.push(T)}for(var L=0,U=0;L<p.length;L++){var V=j(a,e,q,s,p[L],q[U],r,s+C||C,t,u,v);V!==c&&(V.nodes.intact||(B=!1),C+=f(V)?V.length:1,q[U++]=V)}if(!B){for(var L=0;L<p.length;L++)null!=q[L]&&(A=A.concat(q[L].nodes));for(var W,L=0;W=q.nodes[L];L++)null!=W.parentNode&&A.indexOf(W)<0&&l([W],[q[L]]);for(var W,L=q.nodes.length;W=A[L];L++)null==W.parentNode&&a.appendChild(W);p.length<q.length&&(q.length=p.length),q.nodes=A}}else if(null!=p&&x==I){if((p.tag!=q.tag||Object.keys(p.attrs).join()!=Object.keys(q.attrs).join()||p.attrs.id!=q.attrs.id)&&(l(q.nodes),q.configContext&&g(q.configContext.onunload)&&q.configContext.onunload()),!h(p.tag))return;var W,X=0===q.nodes.length;if(p.attrs.xmlns?u=p.attrs.xmlns:"svg"===p.tag?u="http://www.w3.org/2000/svg":"math"===p.tag&&(u="http://www.w3.org/1998/Math/MathML"),X?(W=u===c?b.document.createElement(p.tag):b.document.createElementNS(u,p.tag),q={tag:p.tag,children:j(W,p.tag,c,c,p.children,q.children,!0,0,p.attrs.contenteditable?W:t,u,v),attrs:k(W,p.tag,p.attrs,{},u),nodes:[W]},a.insertBefore(W,a.childNodes[s]||null)):(W=q.nodes[0],k(W,p.tag,p.attrs,q.attrs,u),q.children=j(W,p.tag,c,c,p.children,q.children,!1,0,p.attrs.contenteditable?W:t,u,v),q.nodes.intact=!0,r===!0&&null!=W&&a.insertBefore(W,a.childNodes[s]||null)),g(p.attrs.config)){var Y=q.configContext=q.configContext||{},Z=function(a,b){return function(){return a.attrs.config.apply(a,b)}};v.push(Z(p,[W,!X,Y,q]))}}else if(!g(x)){var A;0===q.nodes.length?(p.$trusted?A=n(a,s,p):(A=[b.document.createTextNode(p)],a.nodeName.match(N)||a.insertBefore(A[0],a.childNodes[s]||null)),q="string number boolean".indexOf(typeof p)>-1?new p.constructor(p):p,q.nodes=A):q.valueOf()!==p.valueOf()||r===!0?(A=q.nodes,t&&t===b.document.activeElement||(p.$trusted?(l(A,q),A=n(a,s,p)):"textarea"===e?a.value=p:t?t.innerHTML=p:((1==A[0].nodeType||A.length>1)&&(l(q.nodes,q),A=[b.document.createTextNode(p)]),a.insertBefore(A[0],a.childNodes[s]||null),A[0].nodeValue=p)),q=new p.constructor(p),q.nodes=A):q.nodes.intact=!0}return q}function k(a,c,d,f,h){for(var i in d){var j=d[i],k=f[i];if(!(i in f)||k!==j){f[i]=j;try{if("config"===i)continue;if(g(j)&&0==i.indexOf("on"))a[i]=p(j,a);else if("style"===i&&e(j)){for(var l in j)(null==k||k[l]!==j[l])&&(a.style[l]=j[l]);for(var l in k)l in j||(a.style[l]="")}else null!=h?"href"===i?a.setAttributeNS("http://www.w3.org/1999/xlink","href",j):"className"===i?a.setAttribute("class",j):a.setAttribute(i,j):i in a&&"list"!=i&&"style"!=i&&"form"!=i?(a!==b.document.activeElement||"value"!=i)&&(a[i]=j):a.setAttribute(i,j)}catch(m){if(m.message.indexOf("Invalid argument")<0)throw m}}}return f}function l(a,b){for(var c=a.length-1;c>-1;c--)a[c]&&a[c].parentNode&&(a[c].parentNode.removeChild(a[c]),b=[].concat(b),b[c]&&m(b[c]));0!=a.length&&(a.length=0)}function m(a){if(a.configContext&&g(a.configContext.onunload)&&a.configContext.onunload(),a.children)if(f(a.children))for(var b=0;b<a.children.length;b++)m(a.children[b]);else a.children.tag&&m(a.children)}function n(a,c,d){var e=a.childNodes[c];if(e){var f=1!=e.nodeType,g=b.document.createElement("span");f?(a.insertBefore(g,e),g.insertAdjacentHTML("beforebegin",d),a.removeChild(g)):e.insertAdjacentHTML("beforebegin",d)}else a.insertAdjacentHTML("beforeend",d);for(var h=[];a.childNodes[c]!==e;)h.push(a.childNodes[c]),c++;return h}function o(a){for(var b=[],c=0;c<a.length;c++){var d=a[c];f(d)?b.push.apply(b,o(d)):b.push(d)}return b}function p(a,b){return function(c){c=c||event,i.redraw.strategy("diff"),i.startComputation();try{return a.call(b,c)}finally{U||(U=-1),i.endComputation()}}}function q(a){var b=P.indexOf(a);return 0>b?P.push(a)-1:b}function r(a){var b=function(){return arguments.length&&(a=arguments[0]),a};return b.toJSON=function(){return a},b}function s(){for(var a=i.redraw.strategy(),b=0;b<R.length;b++)T[b]&&"none"!=a&&i.render(R[b],S[b].view(T[b]),"all"==a);W&&(W(),W=null),U=null,V=new Date,i.redraw.strategy("diff")}function t(a){return a.slice($[i.route.mode].length)}function u(a,b,c){ab={};var d=c.indexOf("?");-1!==d&&(ab=y(c.substr(d+1,c.length)),c=c.substr(0,d));for(var e in b){if(e==c)return i.module(a,b[e]),!0;var f=new RegExp("^"+e.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(f.test(c))return c.replace(f,function(){for(var c=e.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2),f=0;f<c.length;f++)ab[c[f].replace(/:|\./g,"")]=decodeURIComponent(d[f]);i.module(a,b[e])}),!0}}function v(a){if(a=a||event,!a.ctrlKey&&!a.metaKey&&2!=a.which){a.preventDefault?a.preventDefault():a.returnValue=!1;var b=a.currentTarget||this;i.route(b[i.route.mode].slice($[i.route.mode].length))}}function w(){"hash"!=i.route.mode&&b.location.hash?b.location.hash=b.location.hash:b.scrollTo(0,0)}function x(a,b){var c=[];for(var d in a){var f=b?b+"["+d+"]":d,g=a[d];c.push(e(g)?x(g,f):encodeURIComponent(f)+"="+encodeURIComponent(g))}return c.join("&")}function y(a){for(var b=a.split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");c[z(e[0])]=e[1]?z(e[1]):1===e.length?!0:""}return c}function z(a){return decodeURIComponent(a.replace(/\+/g," "))}function A(a){var b=q(a);l(a.childNodes,Q[b]),Q[b]=c}function B(a){return prop=i.prop(),a.then(prop),prop.then=function(b,c){return B(a.then(b,c))},prop}function C(a,b){function c(a){n=a||l,p.map(function(a){n==k&&a.resolve(o)||a.reject(o)})}function d(a,b,c,d){if((e(o)||g(o))&&g(a))try{var f=0;a.call(o,function(a){f++||(o=a,b())},function(a){f++||(o=a,c())})}catch(h){i.deferred.onerror(h),o=h,c()}else d()}function f(){var e;try{e=o&&o.then}catch(l){return i.deferred.onerror(l),o=l,n=j,f()}d(e,function(){n=h,f()},function(){n=j,f()},function(){try{n==h&&g(a)?o=a(o):n==j&&g(b)&&(o=b(o),n=h)}catch(f){return i.deferred.onerror(f),o=f,c()}o==m?(o=TypeError(),c()):d(e,function(){c(k)},c,function(){c(n==h&&k)})})}var h=1,j=2,k=3,l=4,m=this,n=0,o=0,p=[];m.promise={},m.resolve=function(a){return n||(o=a,n=h,f()),this},m.reject=function(a){return n||(o=a,n=j,f()),this},m.promise.then=function(a,b){var c=new C(a,b);return n==k?c.resolve(o):n==l?c.reject(o):p.push(c),c.promise}}function D(a){return a}function E(a){if(!a.dataType||"jsonp"!==a.dataType.toLowerCase()){var c=new b.XMLHttpRequest;if(c.open(a.method,a.url,!0,a.user,a.password),c.onreadystatechange=function(){4===c.readyState&&(c.status>=200&&c.status<300?a.onload({type:"load",target:c}):a.onerror({type:"error",target:c}))},a.serialize==JSON.stringify&&a.data&&"GET"!=a.method&&c.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.deserialize==JSON.parse&&c.setRequestHeader("Accept","application/json, text/*"),g(a.config)){var d=a.config(c,a);null!=d&&(c=d)}return c.send("GET"!=a.method&&a.data?a.data:""),c}var e="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),f=b.document.createElement("script");b[e]=function(c){delete b[e],b.document.body.removeChild(f),a.onload({type:"load",target:{responseText:c}})},f.onerror=function(){return delete b[e],b.document.body.removeChild(f),a.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),!1},f.onload=function(){return!1},f.src=a.url+(a.url.indexOf("?")>0?"&":"?")+(a.callbackKey?a.callbackKey:"callback")+"="+e+"&"+x(a.data||{}),b.document.body.appendChild(f)}function F(a,b,c){return b&&Object.keys(b).length>0&&("GET"==a.method?a.url=a.url+(a.url.indexOf("?")<0?"?":"&")+x(b):a.data=c(b)),a}function G(a,b){var c=a.match(/:[a-z]\w+/gi);if(c&&b)for(var d=0;d<c.length;d++){var e=c[d].slice(1);a=a.replace(c[d],b[e]),delete b[e]}return a}var H,I="[object Object]",J="[object Array]",K="[object String]",L=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,M=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,N=/AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TR‌​ACK|WBR/,O={appendChild:function(a){H===c&&(H=b.document.createElement("html")),b.document.documentElement&&b.document.documentElement!==a?b.document.replaceChild(a,b.document.documentElement):b.document.appendChild(a),this.childNodes=b.document.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},P=[],Q={};i.render=function(a,d,e){var f=[];if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var g=q(a),h=a==b.document,i=h||a==b.document.documentElement?O:a;h&&"html"!=d.tag&&(d={tag:"html",attrs:{},children:d}),Q[g]===c&&l(i.childNodes),e===!0&&A(a),Q[g]=j(i,null,c,c,d,Q[g],!1,0,null,c,f);for(var k=0;k<f.length;k++)f[k]()},i.trust=function(a){return a=new String(a),a.$trusted=!0,a},i.prop=function(a){return(e(a)||g(a))&&null!==a&&g(a.then)?B(a):r(a)};var R=[],S=[],T=[],U=null,V=0,W=null,X=16;i.module=function(a,b){var c=R.indexOf(a);0>c&&(c=R.length);var d=!1;if(T[c]&&g(T[c].onunload)){var e={preventDefault:function(){d=!0}};T[c].onunload(e)}return d?void 0:(i.redraw.strategy("all"),i.startComputation(),R[c]=a,S[c]=b,T[c]=new b.controller,i.endComputation(),T[c])},i.redraw=function(a){var c=b.cancelAnimationFrame||b.clearTimeout,d=b.requestAnimationFrame||b.setTimeout;U&&a!==!0?(new Date-V>X||d==b.requestAnimationFrame)&&(U>0&&c(U),U=d(s,X)):(s(),U=d(function(){U=null},X))},i.redraw.strategy=i.prop();var Y=0;i.startComputation=function(){Y++},i.endComputation=function(){Y=Math.max(Y-1,0),0==Y&&i.redraw()},i.withAttr=function(a,b){return function(c){c=c||event;var d=c.currentTarget||this;b(a in d?d[a]:d.getAttribute(a))}};var Z,$={pathname:"",hash:"#",search:"?"},_=function(){},ab={};return i.route=function(){if(0===arguments.length)return Z;if(3===arguments.length&&h(arguments[1])){var a=arguments[0],c=arguments[1],d=arguments[2];_=function(b){var e=Z=t(b);u(a,d,e)||i.route(c,!0)};var f="hash"==i.route.mode?"onhashchange":"onpopstate";b[f]=function(){Z!=t(b.location[i.route.mode])&&_(b.location[i.route.mode])},W=w,b[f]()}else if(arguments[0].addEventListener){var g=arguments[0],j=arguments[1],k=arguments[2];j||(k.href=g.getAttribute("href"),g.href=b.location.pathname+$[i.route.mode]+k.href,g.removeEventListener("click",v),g.addEventListener("click",v))}else if(h(arguments[0])){Z=arguments[0];var l=e(arguments[1])?x(arguments[1]):null;l&&(Z+=(-1===Z.indexOf("?")?"?":"&")+l);var m=(3==arguments.length?arguments[2]:arguments[1])===!0;b.history.pushState?(W=function(){b.history[m?"replaceState":"pushState"](null,b.document.title,$[i.route.mode]+Z),w()},_($[i.route.mode]+Z)):b.location[i.route.mode]=Z}},i.route.param=function(a){return ab[a]},i.route.mode="search",i.deferred=function(){var a=new C;return a.promise=B(a.promise),a},i.deferred.onerror=function(a){if("[object Error]"==d(a)&&!a.constructor.toString().match(/ Error/))throw a},i.sync=function(a){function b(a,b){return function(g){return f[a]=g,b||(c="reject"),0==--e&&(d.promise(f),d[c](f)),g}}var c="resolve",d=i.deferred(),e=a.length,f=new Array(e);if(a.length>0)for(var g=0;g<a.length;g++)a[g].then(b(g,!0),b(g,!1));else d.resolve();return d.promise},i.request=function(a){a.background!==!0&&i.startComputation();var b=i.deferred(),c=a.dataType&&"jsonp"===a.dataType.toLowerCase(),d=a.serialize=c?D:a.serialize||JSON.stringify,e=a.deserialize=c?D:a.deserialize||JSON.parse,g=a.extract||function(a){return 0===a.responseText.length&&e===JSON.parse?null:a.responseText};return a.url=G(a.url,a.data),a=F(a,a.data,d),a.onload=a.onerror=function(c){try{c=c||event;var d=("load"==c.type?a.unwrapSuccess:a.unwrapError)||D,h=d(e(g(c.target,a)));if("load"==c.type)if(f(h)&&a.type)for(var j=0;j<h.length;j++)h[j]=new a.type(h[j]);else a.type&&(h=new a.type(h));b["load"==c.type?"resolve":"reject"](h)}catch(c){i.deferred.onerror(c),b.reject(c)}a.background!==!0&&i.endComputation()},E(a),b.promise},i.deps=function(a){return b=a},i.deps.factory=a,i}("undefined"!=typeof window?window:{}),"undefined"!=typeof module&&null!==module&&(module.exports=m),"function"==typeof define&&define.amd&&define(function(){return m});
//fgnass.github.com/spin.js#v2.0.1
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});

this.DELAY = {"largo":10000,"grave":25000,"msg_delete":25000,"msg_minute":60000,"presto":50,"animato":200,"andante":800,"lento":3200} ;

this.LOCATION = {"options":{"search":null,"w":{"type":"Number"},"width":{"current":"std"},"layout":{"current":"center"},"font":{"current":"std"},"viewed_at":{"type":"Date","current":10000},"theme":{"current":"cinema"},"item":null,"color":null,"title":null,"story_id":null,"event_id":null,"mode_id":{"current":"talk"},"potofs_order":{"current":"stat_type"},"page":{"type":"Number","current":1},"row":{"type":"Number","current":50},"hide_ids":{"type":"Array","current":[]},"message_ids":{"type":"Array","current":[]},"roletable":{"current":"ALL"},"card_win":{"current":"ALL"},"chr_set":{"current":"all"},"order":{"current":"all"},"folder":{"current":"all"},"game":{"current":"all"},"say_limit":{"current":"all"},"player_length":{"current":"all"},"rating":{"current":"all"},"config":{"current":"all"},"event":{"current":"all"},"update_at":{"current":"all"},"update_interval":{"current":"all"}},"bind":{"folder":[{"folder":"all","nation":"- すべて -"},{"folder":"PAN","nation":"似顔絵人狼"},{"folder":"WOLF","nation":"人狼議事標準"},{"folder":"RP","nation":"人狼議事RP:"},{"folder":"PRETENSE","nation":"人狼議事RP:Advance"},{"folder":"XEBEC","nation":"人狼議事RP:Braid XEBEC"},{"folder":"CRAZY","nation":"人狼議事RP:Braid Crazy"},{"folder":"CIEL","nation":"人狼議事RP:Cheat Ciel"},{"folder":"PERJURY","nation":"人狼議事RP:Cheat Perjury"},{"folder":"ULTIMATE","nation":"人狼議事大乱闘:"},{"folder":"ALLSTAR","nation":"人狼議事大乱闘:Allstar"},{"folder":"CABALA","nation":"人狼議事CabalaCafe"},{"folder":"MORPHE","nation":"人狼議事モルペウス"},{"folder":"SOYBEAN","nation":"人狼議事鯖の味噌煮"},{"folder":"LOBBY","nation":"人狼議事ロビー"},{"folder":"OFFPARTY","nation":"人狼議事オフ相談所"},{"folder":"TEST","nation":"人狼議事テスト"}],"width":[{"width":"wide","w":770},{"width":"std","w":580},{"width":"mini","w":458}],"page":[{"page":0}],"theme":[{"theme":"juna","item":"box-msg","color":"white","title":"審問"},{"theme":"sow","item":"box-msg","color":"white","title":"物語"},{"theme":"cinema","item":"speech","color":"white","title":"煉瓦"},{"theme":"wa","item":"speech","color":"white","title":"和の国"},{"theme":"star","item":"speech","color":"black","title":"蒼穹"},{"theme":"night","item":"speech","color":"black","title":"月夜"}]}} ;

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
      return "<a hogan-click=\"popup(" + turn + ",'" + a + "')\" data=\"" + a + "," + turn + "," + id + "\" class=\"mark\">&gt;&gt;" + id + "</a>";
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
      return "<a class=\"mark\" hogan-click=\"inner('" + cmd + "','" + val + "')\">" + val + "</a>";
    });
  };
  random_preview = function(log) {
    return log.replace(/\[\[([^\[]+)\]\]/g, function(key, val) {
      return "<a class=\"mark\" hogan-click=\"inner('" + val + "','？')\">" + val + "</a>";
    });
  };
  link_regexp = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/;
  link_regexp_g = /(\w+):\/\/([^\/<>）］】」\s]+)([^<>）］】」\s]*)/g;
  id_num = 0;
  uri_to_link = _.memoize(function(uri) {
    var host, path, protocol, _ref;
    id_num++;
    _ref = uri.match(link_regexp), uri = _ref[0], protocol = _ref[1], host = _ref[2], path = _ref[3];
    return "<span class=\"badge\" hogan-click=\"external('link_" + id_num + "','" + uri + "','" + protocol + "','" + host + "','" + path + "')\">LINK - " + protocol + "</span>";
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

Number.MAX_INT32 = 0x7fffffff;

_.mixin({
  parseID: function(id) {
    var time;
    time = Serial.parser.Date(id.slice(2));
    return [id.slice(0, 2), time];
  }
});
var Cache;

Cache = (function() {
  function Cache() {}

  Cache.rule = {};

  return Cache;

})();

Cache.Finder = (function() {
  function Finder(scopes, sort_func) {
    this.scopes = scopes;
    this.sort_func = sort_func;
  }

  Finder.prototype.where = function(scopes) {
    var id, kind, kind_hash, kinds, scope, val;
    this.list = (function() {
      var _i, _len, _ref, _results;
      _ref = this.base_map();
      _results = [];
      for (id in _ref) {
        val = _ref[id];
        for (scope in scopes) {
          kinds = scopes[scope];
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
    }).call(this);
    return this;
  };

  Finder.prototype.all = function() {
    return this.where();
  };

  Finder.prototype.find = function(id, kind, scope) {
    if (kind == null) {
      kind = "all";
    }
    if (scope == null) {
      scope = "_all";
    }
    return this.scopes[scope].hash[kind][id];
  };

  Finder.prototype.sort = function(desc) {
    return this.sort_func(desc, this.list);
  };

  Finder.prototype.refresh = function() {
    this.cache = {};
    return this.diff = {};
  };

  Finder.prototype.map_reduce = function() {
    var calc, emit, first, hash, id, init, kind_key, map, reduce, scope, scope_key, target, val, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
    init = function(val) {
      return {
        count: 0,
        sum: 0
      };
    };
    this.reduce = {};
    _ref = this.base_map();
    for (id in _ref) {
      val = _ref[id];
      _ref1 = this.scopes;
      for (scope_key in _ref1) {
        scope = _ref1[scope_key];
        this.reduce[scope_key] = {};
        _ref2 = scope.hash;
        for (kind_key in _ref2) {
          hash = _ref2[kind_key];
          first = this.map(val);
          this.reduce[scope_key][kind_key] = init(first);
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
        if (!target.max || emit.max < target.max) {
          target.max = emit.max;
          target.last = val;
        }
        if (!target.min || target.min < emit.min) {
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
    _ref3 = this.base_map();
    for (id in _ref3) {
      val = _ref3[id];
      emit = map(this.map(val));
      _ref4 = this.scopes;
      for (scope_key in _ref4) {
        scope = _ref4[scope_key];
        _ref5 = scope.hash;
        for (kind_key in _ref5) {
          hash = _ref5[kind_key];
          target = this.reduce[scope_key][kind_key];
          if (hash[val._id] != null) {
            reduce(target, emit, val);
          }
        }
      }
    }
    _ref6 = this.scopes;
    _results = [];
    for (scope_key in _ref6) {
      scope = _ref6[scope_key];
      _results.push((function() {
        var _ref7, _results1;
        _ref7 = scope.hash;
        _results1 = [];
        for (kind_key in _ref7) {
          hash = _ref7[kind_key];
          target = this.reduce[scope_key][kind_key];
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
    this.scopes = {};
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
    this.finder = new Cache.Finder(this.scopes, function(list) {
      return list;
    });
    this.finder.base_map = (function(_this) {
      return function() {
        return _this.scopes._all.hash.all;
      };
    })(this);
    this.finder.map = function(o) {
      return o._id;
    };
    this.base_scope("_all", {
      kind: function() {
        return ["all"];
      },
      finder: this.finder
    });
    Cache.rule[field] = this;
    Cache[this.list_name] = this.finder;
  }

  Rule.prototype.base_scope = function(key, hash) {
    var all, scope;
    this.scopes[key] = scope = new Cache.Scope(this, hash);
    this.scope_keys = Object.keys(this.scopes).sort().reverse();
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
    _ref2 = this.scope_keys;
    for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
      key = _ref2[_l];
      scope = this.scopes[key];
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
    _ref = this.scope_keys;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      scope = this.scopes[key];
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
    var all, o, old, old_kind, _i, _j, _len, _len1, _ref, _results;
    all = this.finder.base_map();
    this.finder.refresh();
    _results = [];
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
      _results.push(merge_phase(o));
    }
    return _results;
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
var GUI,
  __slice = [].slice;

GUI = {
  img_head: "//7korobi.gehirn.ne.jp/images/",
  portrate: function(face_id) {
    return m("img", {
      src: GUI.img_head + ("/portrate/" + face_id + ".jpg")
    });
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
  attrs: function(dsl) {
    var act, list_cmds, o;
    o = {};
    act = function(cb) {
      return function(e) {
        cb(e);
        return e.preventDefault();
      };
    };
    list_cmds = {
      "class": function(str) {
        return o["class"] = str;
      },
      start: function(cb) {
        cb = act(cb);
        o.onmousedown = cb;
        o.ongesturestart = cb;
        return o.ontouchstart = cb;
      },
      move: function(cb) {
        cb = act(cb);
        o.onmousemove = cb;
        o.ongesturechange = cb;
        return o.ontouchmove = cb;
      },
      end: function(cb) {
        cb = act(cb);
        o.onmouseup = cb;
        o.ongestureend = cb;
        return o.ontouchend = cb;
      }
    };
    dsl.call(list_cmds);
    return o;
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
  letter: function() {
    var head, style, vdom;
    style = arguments[0], head = arguments[1], vdom = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    return [m("h3.mesname", m("b", head)), m("p.text." + style, vdom)];
  },
  chrs: function(chrs, headline, cb) {
    var o;
    return [
      m("hr.black"), m(".mark", headline), (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = chrs.length; _i < _len; _i++) {
          o = chrs[_i];
          _results.push(m(".chrbox", [GUI.portrate(o.face._id), m(".chrblank", cb(o, o.face))]));
        }
        return _results;
      })(), m("hr.black")
    ];
  },
  do_tick: function(cb) {
    var action;
    action = function() {
      var tick;
      m.redraw();
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
  message: {
    say: function(v) {
      return m("table.say." + v.mestype, m("tbody", m("tr", [m("td.img", GUI.portrate(v.face_id)), m("td.field", m(".msg", [GUI.letter(v.style, m.trust(v.name), m.trust(v.log)), m("p.mes_date", m("span.mark", v.anchor))]))])));
    },
    action: function(v) {
      v.updated_timer || (v.updated_timer = new Timer(v.updated_at, {
        prop: m.prop()
      }));
      return m("." + v.mestype, m(".action", [m("p.text." + v.style, [m("b", m.trust(v.name)), "は、", m.trust(v.log)]), m("p.mes_date", v.updated_timer.prop())]));
    }
  }
};

GUI.TouchMenu = (function() {
  function TouchMenu(menus) {
    this.menus = menus;
    this.state = m.prop(false);
  }

  TouchMenu.prototype.menu = function() {
    var menu_cb, options, vdom;
    options = arguments[0], vdom = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    menu_cb = this.menus[this.state()];
    if (menu_cb) {
      vdom.push(m(".drag", m(".contentframe", menu_cb(this))));
    }
    return m(".pagenavi.choice.guide.form-inline", options, vdom);
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
          return this["class"]("btn btn-success");
        } else {
          return this["class"]("btn btn-default");
        }
      }
    });
  };

  return TouchMenu;

})();
var b, key, _i, _len, _ref, _ref1;

if (head.browser != null) {
  b = head.browser;
  b.power = "pc";
  b.viewport = "width=device-width, initial-scale=1.0";
  if (navigator.userAgent.toLowerCase().indexOf('windows') !== -1) {
    b.win = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('macintosh') !== -1) {
    b.mac = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('safari') !== -1) {
    b.ios = true;
  }
  if (navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    b.android = true;
    b.power = "simple";
  }
  if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
    b.viewport = "width=device-width, initial-scale=0.5";
    b.iphone = true;
    b.ios = true;
    b.power = "mobile";
  }
  if (navigator.userAgent.toLowerCase().indexOf('ipad') !== -1) {
    b.ios = true;
    b.power = "mobile";
  }
  _ref = ['crios', 'silk', 'mercury'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    key = _ref[_i];
    if (navigator.userAgent.toLowerCase().indexOf(key) !== -1) {
      b.power = "mobile";
    }
  }
  b[b.power] = true;
}

if ((_ref1 = document.querySelector("meta[name=viewport]")) != null) {
  _ref1.attributes.content = head.browser.viewport;
}

head.useragent = navigator.userAgent;
var Layout, win;

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
      var body_height, body_width;
      win.height = Math.max(window.innerHeight, document.documentElement.clientHeight);
      win.width = Math.max(window.innerWidth, document.documentElement.clientWidth);
      body_height = Math.max(document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight);
      body_width = Math.max(document.body.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.clientWidth);
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
      win.left = window.pageXOffset;
      win.top = window.pageYOffset;
      return win.do_event_list(win.on.scroll, e);
    },
    gesture: function(e) {
      return win.do_event_list(win.on.gesture, e);
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
    motion: [],
    start: [],
    move: [],
    drag: [],
    end: [],
    load: []
  },
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  accel: 0,
  gravity: 0,
  rotate: 0,
  is_tap: false,
  max: {
    top: 0,
    left: 0
  }
};

Layout = (function() {
  Layout.list = {};

  function Layout(dx, dy, box) {
    this.dx = dx;
    this.dy = dy;
    this.box = box;
    if (!this.box) {
      return;
    }
    win.on.resize.push((function(_this) {
      return function() {
        return _this.resize();
      };
    })(this));
    win.on.scroll.push((function(_this) {
      return function() {
        return _this.scroll();
      };
    })(this));
    Layout.list[this.box.id] = this;
    this.box.style.position = "fixed";
    this.box.style.top = 0;
    this.box.style.zIndex = _.now();
  }

  Layout.prototype.resize = function() {
    var height, left, top, width;
    if (!this.box) {
      return;
    }
    width = win.width - this.box.offsetWidth;
    height = win.height - this.box.offsetHeight;
    if (this.dx < 0) {
      this.left = this.dx + width;
    }
    if (0 < this.dx) {
      this.left = this.dx;
    }
    if (this.dy < 0) {
      this.top = this.dy + height;
    }
    if (0 < this.dy) {
      this.top = this.dy;
    }
    left = this.left + win.left;
    top = this.top;
    this.translate(left, top);
    if (0 === this.dx) {
      return this.box.style.width = "" + this.box.parentElement.offsetWidth + "px";
    } else {
      return this.box.style.left = 0;
    }
  };

  Layout.prototype.scroll = function() {};

  Layout.prototype.translate = function(left, top) {
    var transform;
    transform = "translate(" + left + "px, " + top + "px)";
    this.box.style.webkitTransform = transform;
    if (head.browser.mozilla) {
      this.box.style.mozTransform = transform;
    }
    if (head.browser.ie) {
      this.box.style.msTransform = transform;
    }
    if (head.browser.opera) {
      this.box.style.oTransform = transform;
    }
    return this.box.style.transform = transform;
  };

  return Layout;

})();
var ID, Serial, func, key, _ref;

Serial = (function() {
  var c, n, _i, _len, _ref;

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
    String: String,
    "null": String,
    undefined: String
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
    Number: String,
    String: String,
    "null": String,
    undefined: String
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
      default:
        return "([^\\/\\-\\=\\.\\&\\(\\)\\\"\\'\\`\\;]+)";
    }
  })();
}

ID = (function() {
  function ID() {}

  ID.random_size = Serial.map.size * Serial.map.size * Serial.map.size;

  ID.now = function() {
    return Serial.serializer.Date(Math.random() * ID.random_size) + Serial.serializer.Date(_.now());
  };

  ID.at = function(date) {
    return Serial.serializer.Date(Math.random() * ID.random_size) + Serial.serializer.Date(new Date(date));
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
    if (location.href !== new_href) {
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
            m.startComputation();
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
            m.endComputation();
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
              return ((_ref2 = Url.options[key]) != null ? _ref2.current : void 0) || null;
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
    var ary, expires;
    ary = [value];
    if (this.options.cookie.time) {
      expires = new Date(Math.min(2147397247000, _.now() + this.options.cookie.time * 3600000));
      ary.push("expires=" + (expires.toUTCString()));
    }
    if (this.options.cookie.domain) {
      ary.push("domain=" + this.options.domain);
    }
    if (this.options.cookie.path) {
      ary.push("path=" + this.options.path);
    }
    if (this.options.cookie.secure) {
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


