(function(A,G){if(typeof define=='function'&&define.amd)define([],G);else if(typeof module=='object'&&module.exports)module.exports=G();else A.hyperHTML=G()}(typeof self!='undefined'?self:this,function(){
/*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(N){"use strict";
/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var u=t.WeakMap,i={};
/*! (c) Andrea Giammarchi - ISC */try{i.WeakSet=WeakSet}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++})}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r}(Math.random(),Object.defineProperty)}var e=i.WeakSet,n={};
/*! (c) Andrea Giammarchi - ISC */try{n.Map=Map}catch(e){n.Map=function(){var n=0,i=[],a=[];return{delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this)},this)},get:function(e){return r(e)?a[n]:void 0},has:function(e){return r(e)},set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return-1<(n=i.indexOf(e))}}}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var l=e(n[r],1);if(t.insertBefore(l,a),o&&u&&l.selected){u=!u;var c=t.selectedIndex;t.selectedIndex=c<0?r:s.call(t.querySelectorAll("option"),l)}r++}}function y(e,t){return e==t}function b(e){return e}function w(e,t,n,r,i,a,o){var u=a-i;if(u<1)return-1;for(;u<=n-t;){for(var l=t,c=i;l<n&&c<a&&o(e[l],r[c]);)l++,c++;if(c===a)return t;t=l+1}return-1}function x(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function E(e,t,n,r,i){for(;r<i;)a(e(n[r++],-1),t)}function C(e,t,n,r,i,a,o,u,l,c,s,f,h){!function(e,t,n,r,i,a,o,u,l){for(var c=new k,s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:c.set(r[i],1),m(t,n,r,i++,i,f<u?t(a[f],0):l);break;case-1:f++}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:c.has(a[o])?o++:E(t,n,a,o++,o)}}(function(e,t,n,r,i,a,o){var u,l,c,s,f,h,d,v=n+a,p=[];e:for(u=0;u<=v;u++){if(50<u)return null;for(d=u-1,f=u?p[u-1]:[0,0],h=p[u]=[],l=-u;l<=u;l+=2){for(c=(s=l===-u||l!==u&&f[d+l-1]<f[d+l+1]?f[d+l+1]:f[d+l-1]+1)-l;s<a&&c<n&&o(r[i+s],e[t+c]);)s++,c++;if(s===a&&c===n)break e;h[u+l]=s}}var g=Array(u/2+v/2),m=g.length-1;for(u=p.length-1;0<=u;u--){for(;0<s&&0<c&&o(r[i+s-1],e[t+c-1]);)g[m--]=0,s--,c--;if(!u)break;d=u-1,f=u?p[u-1]:[0,0],(l=s-c)===-u||l!==u&&f[d+l-1]<f[d+l+1]?(c--,g[m--]=1):(s--,g[m--]=-1)}return g}(n,r,a,o,u,c,f)||function(e,t,n,r,i,a,o,u){var l=0,c=r<u?r:u,s=Array(c++),f=Array(c);f[0]=-1;for(var h=1;h<c;h++)f[h]=o;for(var d=new k,v=a;v<o;v++)d.set(i[v],v);for(var p=t;p<n;p++){var g=d.get(e[p]);null!=g&&-1<(l=A(f,c,g))&&(f[l]=g,s[l]={newi:p,oldi:g,prev:s[l-1]})}for(l=--c,--o;f[l]>o;)--l;c=u+r-l;var m=Array(c),y=s[l];for(--n;y;){for(var b=y,w=b.newi,N=b.oldi;w<n;)m[--c]=1,--n;for(;N<o;)m[--c]=-1,--o;m[--c]=0,--n,--o,y=y.prev}for(;t<=n;)m[--c]=1,--n;for(;a<=o;)m[--c]=-1,--o;return m}(n,r,i,a,o,u,l,c),e,t,n,r,o,u,s,h)}function l(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,l=u,c=0,s=n.length,f=0;c<l&&f<s&&i(t[c],n[f]);)c++,f++;for(;c<l&&f<s&&i(t[l-1],n[s-1]);)l--,s--;var h=c===l,d=f===s;if(h&&d)return n;if(h&&f<s)return m(a,e,n,f,s,x(a,t,c,u,o)),n;if(d&&c<l)return E(a,e,t,c,l),n;var v=l-c,p=s-f,g=-1;if(v<p){if(-1<(g=w(n,f,s,t,c,l,i)))return m(a,e,n,f,g,a(t[c],0)),m(a,e,n,g+v,s,x(a,t,l,u,o)),n}else if(p<v&&-1<(g=w(t,c,l,n,f,s,i)))return E(a,e,t,c,g),E(a,e,t,g+p,l),n;return v<2||p<2?(m(a,e,n,f,s,a(t[c],0)),E(a,e,t,c,l)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,c,l,i)?m(a,e,n,f,s,x(a,t,l,u,o)):C(a,e,n,f,s,p,t,c,l,v,u,i,o),n}var r,k=n.Map,s=[].indexOf,A=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a}return r},a=function(e,t){(a="remove"in e?function(e){e.remove()}:function(e,t){e.parentNode===t&&t.removeChild(e)})(e,t)},o={};function c(e,t){t=t||{};var n=N.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}o.CustomEvent="function"==typeof CustomEvent?CustomEvent:(c[r="prototype"]=new c("").constructor[r],c);var f=o.CustomEvent;function h(){return this}function d(e,t){var n="_"+e+"$";return{get:function(){return this[n]||v(this,n,t.call(this,e))},set:function(e){v(this,n,e)}}}var v=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(h.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var p,g,S,T,M,_,O={},j={},L=[],P=j.hasOwnProperty,D=0,W={attributes:O,define:function(e,t){e.indexOf("-")<0?(e in j||(D=L.push(e)),j[e]=t):O[e]=t},invoke:function(e,t){for(var n=0;n<D;n++){var r=L[n];if(P.call(e,r))return j[r](e[r],t)}}},$=Array.isArray||(g=(p={}.toString).call([]),function(e){return p.call(e)===g}),R=(S=N,T="fragment",_="content"in H(M="template")?function(e){var t=H(M);return t.innerHTML=e,t.content}:function(e){var t=H(T),n=H(M),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(i)}else n.innerHTML=e,r=n.childNodes;return F(t,r),t},function(e,t){return("svg"===t?function(e){var t=H(T),n=H("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",F(t,n.firstChild.childNodes),t}:_)(e)});function F(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function H(e){return e===T?S.createDocumentFragment():S.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */
var I,z,V,Z,G,q,B,J,K,Q,U=(z="appendChild",V="cloneNode",Z="createTextNode",q=(G="importNode")in(I=N),(B=I.createDocumentFragment())[z](I[Z]("g")),B[z](I[Z]("")),(q?I[G](B,!0):B[V](!0)).childNodes.length<2?function e(t,n){for(var r=t[V](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[z](e(i[o],n));return r}:q?I[G]:function(e,t){return e[V](!!t)}),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%",ee=!1;try{J=N.createElement("template"),Q="tabindex",(K="content")in J&&(J.innerHTML="<p "+Q+'="'+Y+'"></p>',J[K].childNodes[0].getAttribute(Q)==Y)||(Y="_dt: "+Y.slice(1,-1)+";",ee=!0)}catch(e){}var te="\x3c!--"+Y+"--\x3e",ne=8,re=1,ie=3,ae=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ue=" \\f\\n\\r\\t",le="[^"+ue+"\\/>\"'=]+",ce="["+ue+"]+"+le,se="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",fe="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+le.replace("\\/","")+"))?)",he=new RegExp(se+ce+fe+"+)(["+ue+"]*/?>)","g"),de=new RegExp(se+ce+fe+"*)(["+ue+"]*/>)","g"),ve=new RegExp("("+ce+"\\s*=\\s*)(['\"]?)"+te+"\\2","gi");function pe(e,t,n,r){return"<"+t+n.replace(ve,ge)+r}function ge(e,t,n){return t+(n||'"')+Y+(n||'"')}function me(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}function ye(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function be(e,t,n,r){for(var i=new k,a=e.attributes,o=[],u=o.slice.call(a,0),l=u.length,c=0;c<l;){var s,f=u[c++],h=f.value===Y;if(h||1<(s=f.value.split(te)).length){var d=f.name;if(!i.has(d)){var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(i.set(d,p),h)t.push(we(p,r,v,null));else{for(var g=s.length-2;g--;)n.shift();t.push(we(p,r,v,s))}}o.push(f)}}for(var m=((c=0)<(l=o.length)&&ee&&!("ownerSVGElement"in e));c<l;){var y=o[c++];m&&(y.value=""),e.removeAttribute(y.name)}var b=e.nodeName;if(/^script$/i.test(b)){var w=N.createElement(b);for(l=a.length,c=0;c<l;)w.setAttributeNode(a[c++].cloneNode(!0));w.textContent=e.textContent,e.parentNode.replaceChild(w,e)}}function we(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function Ne(e,t){return{type:"text",node:e,path:t}}var xe=new u,Ee=new u;function Ce(o,f){var e=(o.convert||
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(te).replace(de,me).replace(he,pe)})(f),t=o.transform;t&&(e=t(e));var n=R(e,o.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r)}}
/*! (c) Andrea Giammarchi - ISC */(n);var u=[];!function e(t,n,r,i){for(var a,o,u=t.childNodes,l=u.length,c=0;c<l;){var s=u[c];switch(s.nodeType){case re:var f=i.concat(c);be(s,n,r,f),e(s,n,r,f);break;case ne:var h=s.textContent;if(h===Y)r.shift(),n.push(ae.test(t.nodeName)?Ne(t,i):(a=s,o=i.concat(c),{type:"any",node:a,path:o}));else switch(h.slice(0,2)){case"/*":if("*/"!==h.slice(-2))break;case"👻":t.removeChild(s),c--,l--}break;case ie:ae.test(t.nodeName)&&X.call(s.textContent)===te&&(r.shift(),n.push(Ne(t,i)))}c++}}(n,u,f.slice(0),[]);var r={content:n,updates:function(l){for(var c=[],s=u.length,e=0,t=0;e<s;){var n=u[e++],r=ye(l,n.path);switch(n.type){case"any":c.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?c.push({fn:a,sparse:!1}):(t+=i.length-2,c.push({fn:a,sparse:!0,values:i}));break;case"text":c.push({fn:o.text(r),sparse:!1}),r.textContent=""}}return s+=t,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=c[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a)}else r.fn(arguments[t++])}return l}}};return xe.set(f,r),r}function ke(n){return function(e){var t=Ee.get(n);return null!=t&&t.template===e||(t=function(e,t){var n=xe.get(t)||Ce(e,t),r=U.call(N,n.content,!0),i={content:r,template:t,updates:n.updates(r)};return Ee.set(e,i),i}(n,e)),t.updates.apply(null,arguments),t.content}}var Ae,Se,Te=(Ae=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Se=/([^A-Z])([A-Z]+)/g,function(e,t){return"ownerSVGElement"in e?function(e,t){var n;return(n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),_e(n,!0)}(e,t):_e(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Me(e,t,n){return t+"-"+n.toLowerCase()}function _e(a,o){var u,l;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&l!==e)for(n in l)n in e||(a[n]="")}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||Ae.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Se,Me),":",e[t],";");return n.join("")}(l=t):l=e;break}default:l!=e&&(u="string",l=e,o?a.value=e||"":a.cssText=e||"")}}}var Oe,je,Le=(Oe=[].slice,(je=Pe.prototype).ELEMENT_NODE=1,je.nodeType=111,je.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents()}return n},je.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},Pe);function Pe(e){var t=this.childNodes=Oe.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null}function De(e){return{html:e}}function We(e,t){switch(e.nodeType){case Be:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case qe:return We(e.render(),t);default:return e}}function $e(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(De).then(t):Promise.resolve(W.invoke(e,t)).then(t)}function Re(e){return null!=e&&"then"in e}var Fe,He,Ie,ze,Ve,Ze="ownerSVGElement",Ge="connected",qe=h.prototype.nodeType,Be=Le.prototype.nodeType,Je=(He=(Fe={Event:f,WeakSet:e}).Event,Ie=Fe.WeakSet,ze=!0,Ve=null,function(e){return ze&&(ze=!ze,Ve=new Ie,function(t){var i=new Ie,a=new Ie;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0})}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length))},0)};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]})},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]})},!0)}function u(e){for(var t,n=e.length,r=0;r<n;r++)l((t=e[r]).removedNodes,"disconnected",a,i),l(t.addedNodes,"connected",i,a)}function l(e,t,n,r){for(var i,a=new He(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&c(i,a,t,n,r));}function c(e,t,n,r,i){Ve.has(e)&&!r.has(e)&&(i.delete(e),r.add(e),e.dispatchEvent(t));for(var a=e.children||[],o=a.length,u=0;u<o;c(a[u++],t,n,r,i));}}(e.ownerDocument)),Ve.add(e),e}),Ke=/^(?:form|list)$/i,Qe=[].slice;function Ue(e){return this.type=e,ke(this)}var Xe=!(Ue.prototype={attribute:function(n,r,e){var i,t=Ze in n;if("style"===r)return Te(n,e,t);if(/^on/.test(r)){var a=r.slice(2);return a===Ge||"disconnected"===a?Je(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1))}}if("data"===r||!t&&r in n&&!Ke.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e)};if(r in W.attributes)return function(e){var t=W.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t))};var o=!1,u=e.cloneNode(!0);return function(e){i!==e&&(i=e,u.value!==e&&(null==e?(o&&(o=!1,n.removeAttributeNode(u)),u.value=e):(u.value=e,o||(o=!0,n.setAttributeNode(u)))))}},any:function(n,r){var i,a={node:We,before:n},o=Ze in n?"svg":"html",u=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":u?i!==t&&(i=t,r[0].textContent=t):(u=!0,i=t,r=l(n.parentNode,r,[function(e,t){return e.ownerDocument.createTextNode(t)}(n,t)],a));break;case"function":e(t(n));break;case"object":case"undefined":if(null==t){u=!1,r=l(n.parentNode,r,[],a);break}default:if(u=!1,$(i=t))if(0===t.length)r.length&&(r=l(n.parentNode,r,[],a));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if($(t[0])&&(t=t.concat.apply([],t)),Re(t[0])){Promise.all(t).then(e);break}default:r=l(n.parentNode,r,t,a)}else!function(e){return"ELEMENT_NODE"in e}(t)?Re(t)?t.then(e):"placeholder"in t?$e(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?r=l(n.parentNode,r,Qe.call(R([].concat(t.html).join(""),o).childNodes),a):e("length"in t?Qe.call(t):W.invoke(t,e)):r=l(n.parentNode,r,11===t.nodeType?Qe.call(t.childNodes):[t],a)}}},text:function(r){var i;return function e(t){if(i!==t){var n=typeof(i=t);"object"==n&&t?Re(t)?t.then(e):"placeholder"in t?$e(t,e):e("text"in t?String(t.text):"any"in t?t.any:"html"in t?[].concat(t.html).join(""):"length"in t?Qe.call(t).join(""):W.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t}}}}),Ye=function(e){var t,n=(t=(N.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(t)),r=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);if(n||r){var i={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return i[t]||(i[t]=e)};if(r)Ye=a;else{var o=new u;Ye=function(e){return o.get(e)||function(e,t){return o.set(e,t),t}(e,a(e))}}}else Xe=!0;return et(e)};function et(e){return Xe?e:Ye(e)}function tt(e){for(var t=arguments.length,n=[et(e)],r=1;r<t;)n.push(arguments[r++]);return n}var nt=new u,rt=function(t){var n,r,i;return function(){var e=tt.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Ue(t),n=at(r.apply(r,e))):r.apply(r,e),n}},it=function(e,t){var n=t.indexOf(":"),r=nt.get(e),i=t;return-1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||nt.set(e,r={}),r[i]||(r[i]=rt(t))},at=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Le(t):e},ot=new u;function ut(){var e=ot.get(this),t=tt.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ue(Ze in this?"svg":"html");ot.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments))}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var lt,ct,st,ft,ht=W.define,dt=Ue.prototype;function vt(e){return arguments.length<2?null==e?rt("html"):"string"==typeof e?vt.wire(null,e):"raw"in e?rt("html")(e):"nodeType"in e?vt.bind(e):it(e,"html"):("raw"in e?rt("html"):vt.wire).apply(null,arguments)}return vt.Component=h,vt.bind=function(e){return ut.bind(e)},vt.define=ht,vt.diff=l,(vt.hyper=vt).observe=Je,vt.tagger=dt,vt.wire=function(e,t){return null==e?rt(t||"html"):it(e,t||"html")},vt._={WeakMap:u,WeakSet:e},lt=rt,ct=new u,st=Object.create,ft=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(h,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i=t.get(e)||ft(e,t);switch(typeof r){case"object":case"function":var a=i.w||(i.w=new u);return a.get(r)||function(e,t,n){return e.set(t,n),n}(a,r,new e(n));default:var o=i.p||(i.p=st(null));return o[r]||(o[r]=new e(n))}}(this,ct.get(e)||function(e){var t=new k;return ct.set(e,t),t}(e),e,null==t?"default":t)}}}),Object.defineProperties(h.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:d("html",lt),svg:d("svg",lt),state:d("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new f(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return!1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return!1!==t&&this.render(),this}}}),vt}(document);
return hyperHTML}));