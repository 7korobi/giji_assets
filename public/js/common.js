gijiP([2],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}n(24);var o=n(25),r=i(o),a=n(31),l=i(a);new l.default(r.default)},24:function(t,e){"use strict";function n(t){var e="A"===t.tagName,n="parent"===t.getAttribute("data-submit");return e&&n}function i(t){for(;t&&t!==document&&t.nodeType===Node.ELEMENT_NODE;){if("FORM"===t.tagName)return t;t=t.parentNode}return null}function o(t){for(;t&&t.getAttribute;){if(n(t)){var e=t.getAttribute("data-confirm");return(null===e||confirm(e))&&i(t).submit(),!0}t=t.parentNode}return!1}window.addEventListener("click",function(t){if(t.target&&o(t.target))return t.preventDefault(),!1},!1)},25:function(t,e,n){n(26);var i=n(30)(null,null,null,null);t.exports=i.exports},26:function(t,e,n){var i=n(27);"string"==typeof i&&(i=[[t.id,i,""]]);n(29)(i,{});i.locals&&(t.exports=i.locals)},27:function(t,e,n){e=t.exports=n(28)(),e.push([t.id,"b{font-weight:700}.btn,[data-tooltip],[title],a,b,button,code,input,input[type=button],input[type=checkbox],input[type=color],input[type=image],input[type=radio],input[type=reset],input[type=submit],kbd,select,textarea{display:inline-block;user-select:none;box-sizing:border-box;vertical-align:baseline;text-align:center;text-decoration:none;margin:4px 2px;padding:2px;border-radius:3px;border-width:0;border-style:outset;align-items:flex-start;cursor:hand;text-rendering:auto;letter-spacing:normal;word-spacing:normal;text-transform:none;text-shadow:none;text-indent:0}.contentframe,.inframe,.outframe{box-sizing:content-box}.chat,h1,h2,h3,h4,h5,h6{box-sizing:border-box}h6{font-weight:700;display:block;margin:0;padding:.1em .25em;line-height:1em;border-bottom:1px solid #e5e5e5;background-color:hsla(0,0%,100%,.25)}sup{vertical-align:10px}sub{vertical-align:-10px}sub,sup{border-radius:7px;font-size:12px;line-height:14px;height:14px;margin-right:0;padding:2px 6px 0;display:inline-block;font-weight:700;text-align:center}.chat{padding:0 4px}.chat .name{color:$emboss;font-weight:700;line-height:1.3em}.chat .text{line-height:1.2em;overflow:visible;word-wrap:break-word;word-break:break-strict}.chat .text.head:first-line{font-weight:700}.chat .text.mono{font-family:monospace;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.chat .date{color:$emboss;text-align:right;font-size:10.5px;line-height:1.1em}.btns{line-height:30px}.btns span{margin:0 6px}",""])}});
//# sourceMappingURL=common.js.map