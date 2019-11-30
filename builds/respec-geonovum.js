"use strict";
<<<<<<< gh-pages
window.respecVersion = "25.0.2";
"use strict";window.addEventListener("error",e=>{console.error(e.error,e.message,e)});const modules=[Promise.resolve().then((function(){return baseRunner})),Promise.resolve().then((function(){return ui$1})),Promise.resolve().then((function(){return reindent$1})),Promise.resolve().then((function(){return locationHash})),Promise.resolve().then((function(){return l10n$1})),Promise.resolve().then((function(){return defaults$6})),Promise.resolve().then((function(){return style})),Promise.resolve().then((function(){return style$1})),Promise.resolve().then((function(){return l10n$2})),Promise.resolve().then((function(){return github$1})),Promise.resolve().then((function(){return dataInclude})),Promise.resolve().then((function(){return markdown})),Promise.resolve().then((function(){return dataTransform})),Promise.resolve().then((function(){return inlines})),Promise.resolve().then((function(){return dfn})),Promise.resolve().then((function(){return pluralize$2})),Promise.resolve().then((function(){return examples})),Promise.resolve().then((function(){return issuesNotes})),Promise.resolve().then((function(){return bestPractices})),Promise.resolve().then((function(){return figures})),Promise.resolve().then((function(){return dataCite})),Promise.resolve().then((function(){return biblio$1})),Promise.resolve().then((function(){return linkToDfn})),Promise.resolve().then((function(){return renderBiblio})),Promise.resolve().then((function(){return contrib})),Promise.resolve().then((function(){return fixHeaders})),Promise.resolve().then((function(){return structure$1})),Promise.resolve().then((function(){return informative})),Promise.resolve().then((function(){return idHeaders})),Promise.resolve().then((function(){return conformance})),Promise.resolve().then((function(){return saveHtml})),Promise.resolve().then((function(){return searchSpecref})),Promise.resolve().then((function(){return dfnList})),Promise.resolve().then((function(){return aboutRespec})),Promise.resolve().then((function(){return seo})),Promise.resolve().then((function(){return highlight})),Promise.resolve().then((function(){return dataTests})),Promise.resolve().then((function(){return listSorter})),Promise.resolve().then((function(){return highlightVars$1})),Promise.resolve().then((function(){return dfnPanel})),Promise.resolve().then((function(){return algorithms})),Promise.resolve().then((function(){return anchorExpander})),Promise.resolve().then((function(){return linter$1}))];async function domReady(){"loading"===document.readyState&&await new Promise(e=>document.addEventListener("DOMContentLoaded",e))}(async()=>{const[e,{ui:t},...n]=await Promise.all(modules);try{t.show(),await domReady(),await e.runAll(n)}finally{t.enable()}})().catch(e=>{console.error(e)});const inAmd=!!window.require;if(!inAmd){const e=function(e,t){const n=e.map(e=>{if(!(e in window.require.modules))throw new Error(`Unsupported dependency name: ${e}`);return window.require.modules[e]});Promise.all(n).then(e=>t(...e))};e.modules={},window.require=e}function expose(e,t){inAmd||(window.require.modules[e]=t)}const name="core/pubsubhub",subscriptions=new Map;function pub(e,...t){if(!subscriptions.has(e))return;if(Array.from(subscriptions.get(e)).forEach(e=>{try{e(...t)}catch(t){pub("error",`Error when calling function ${e.name}. See developer console.`),console.error(t)}}),window.parent===window.self)return;const n=t.map(e=>String(JSON.stringify(e.stack||e)));window.parent.postMessage({topic:e,args:n},window.parent.location.origin)}function sub(e,t,n={once:!1}){return n.once?sub(e,(function n(...r){unsub({topic:e,cb:n}),t(...r)})):(subscriptions.has(e)?subscriptions.get(e).add(t):subscriptions.set(e,new Set([t])),{topic:e,cb:t})}function unsub({topic:e,cb:t}){const n=subscriptions.get(e);return n&&n.has(t)?n.delete(t):(console.warn("Already unsubscribed:",e,t),!1)}sub("error",e=>{console.error(e,e.stack)}),sub("warn",e=>{console.warn(e)}),expose(name,{sub:sub});const userConfig={},amendConfig=e=>Object.assign(userConfig,e),removeList=["githubToken","githubUser"];function overrideConfig(e){const t=document.location.search.replace(/;/g,"&"),n=new URLSearchParams(t),r=Array.from(n).filter(([e,t])=>!!e&&!!t).map(([e,t])=>{const n=decodeURIComponent(e),r=decodeURIComponent(t.replace(/%3D/g,"="));let o;try{o=JSON.parse(r)}catch{o=r}return{key:n,value:o}}).reduce((e,{key:t,value:n})=>(e[t]=n,e),{});Object.assign(e,r),pub("amend-user-config",r)}sub("start-all",amendConfig),sub("amend-user-config",amendConfig),sub("end-all",()=>{const e=document.createElement("script");e.id="initialUserConfig",e.type="application/json";for(const e of removeList)e in userConfig&&delete userConfig[e];e.innerHTML=JSON.stringify(userConfig,null,2),document.head.appendChild(e)}),sub("start-all",overrideConfig,{once:!0});const respecDonePromise=new Promise(e=>{sub("end-all",e,{once:!0})});let doneResolver;Object.defineProperty(document,"respecIsReady",{get:()=>respecDonePromise});const done=new Promise(e=>{doneResolver=e});let doneResolver$1;sub("plugins-done",async e=>{const t=[];if(Array.isArray(e.postProcess)){const n=e.postProcess.filter(e=>{const t="function"==typeof e;return t||pub("error","Every item in `postProcess` must be a JS function."),t}).map(async t=>{try{return await t(e,document)}catch(e){pub("error",`Function ${t.name} threw an error during \`postProcess\`. See developer console.`),console.error(e)}}),r=await Promise.all(n);t.push(...r)}"function"==typeof e.afterEnd&&t.push(await e.afterEnd(e,document)),doneResolver(t)},{once:!0});const done$1=new Promise(e=>{doneResolver$1=e});sub("start-all",async e=>{const t=[];if(Array.isArray(e.preProcess)){const n=e.preProcess.filter(e=>{const t="function"==typeof e;return t||pub("error","Every item in `preProcess` must be a JS function."),t}).map(async t=>{try{return await t(e,document)}catch(e){pub("error",`Function ${t.name} threw an error during \`preProcess\`. See developer console.`),console.error(e)}}),r=await Promise.all(n);t.push(...r)}doneResolver$1(t)},{once:!0});const name$1="core/l10n",html=document.documentElement;html&&!html.hasAttribute("lang")&&(html.lang="en",html.hasAttribute("dir")||(html.dir="ltr"));const base={about_respec:"About",abstract:"Abstract",bug_tracker:"Bug tracker:",close_parens:")",definition_list:"Definitions",editors_note:"Editor's note",feature_at_risk:"(Feature at Risk) Issue",info_references:"Informative references",issue_summary:"Issue Summary",issue:"Issue",list_of_definitions:"List of Definitions",norm_references:"Normative references",note:"Note",open_bugs:"open bugs",open_parens:"(",participate:"Participate",references:"References",save_as:"Save as",save_snapshot:"Export",search_specref:"Search Specref",toc:"Table of Contents",warning:"Warning"},ko={abstract:"요약"},zh={about_respec:"关于",abstract:"摘要",bug_tracker:"错误跟踪：",file_a_bug:"反馈错误",note:"注",open_bugs:"修正中的错误",participate:"参与：",toc:"内容大纲"},ja={abstract:"要約",bug_tracker:"バグの追跡履歴：",file_a_bug:"問題報告",note:"注",open_bugs:"改修されていないバグ",participate:"参加方法：",toc:"目次"},nl={about_respec:"Over",abstract:"Samenvatting",bug_tracker:"Meldingensysteem:",definition_list:"Lijst van Definities",editors_note:"Redactionele noot",file_a_bug:"Dien een melding in",info_references:"Informatieve referenties",issue_summary:"Lijst met issues",list_of_definitions:"Lijst van Definities",norm_references:"Normatieve referenties",note:"Noot",open_bugs:"open meldingen",participate:"Doe mee",references:"Referenties",save_as:"Bewaar als",save_snapshot:"Bewaar Snapshot",search_specref:"Doorzoek Specref",toc:"Inhoudsopgave",warning:"Waarschuwing"},es={abstract:"Resumen",authors:"Autores:",bug_tracker:"Repositorio de bugs:",close_parens:")",editors_note:"Nota de editor",file_a_bug:"Nota un bug",info_references:"Referencias informativas",issue_summary:"Resumen de la cuestión",issue:"Cuestión",norm_references:"Referencias normativas",note:"Nota",open_bugs:"Bugs abiertos",open_parens:"(",participate:"Participad",references:"Referencias",toc:"Tabla de Contenidos",warning:"Aviso"},l10n={en:{...base},ko:{...base,...ko},zh:{...base,...zh},ja:{...base,...ja},nl:{...base,...nl},es:{...base,...es}};l10n["zh-hans"]=l10n.zh,l10n["zh-cn"]=l10n.zh;const lang=html&&html.lang in l10n?html.lang:"en";function getIntlData(e){return new Proxy(e,{get(e,t){const n=e[lang][t]||e.en[t];if(!n)throw new Error(`No l10n data for key: "${t}"`);return n}})}function run(e){e.l10n=l10n[lang]||l10n.en}var l10n$1=Object.freeze({__proto__:null,name:name$1,l10n:l10n,lang:lang,getIntlData:getIntlData,run:run});const instanceOfAny=(e,t)=>t.some(t=>e instanceof t);let idbProxyableTypes,cursorAdvanceMethods;function getIdbProxyableTypes(){return idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function getCursorAdvanceMethods(){return cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;function promisifyRequest(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{t(wrap(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&cursorRequestMap.set(t,e)}).catch(()=>{}),reverseTransformCache.set(t,e),t}function cacheDonePromiseForTransaction(e){if(transactionDoneMap.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{t(),r()},i=()=>{n(e.error),r()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)});transactionDoneMap.set(e,t)}let idbProxyTraps={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return transactionDoneMap.get(e);if("objectStoreNames"===t)return e.objectStoreNames||transactionStoreNamesMap.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(e[t])},has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function addTraps(e){idbProxyTraps=e(idbProxyTraps)}function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?getCursorAdvanceMethods().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(cursorRequestMap.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...n){const r=e.call(unwrap(this),t,...n);return transactionStoreNamesMap.set(r,t.sort?t.sort():[t]),wrap(r)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&cacheDonePromiseForTransaction(e),instanceOfAny(e,getIdbProxyableTypes())?new Proxy(e,idbProxyTraps):e)}function wrap(e){if(e instanceof IDBRequest)return promisifyRequest(e);if(transformCache.has(e))return transformCache.get(e);const t=transformCachableValue(e);return t!==e&&(transformCache.set(e,t),reverseTransformCache.set(t,e)),t}const unwrap=e=>reverseTransformCache.get(e);function openDB(e,t,{blocked:n,upgrade:r,blocking:o}={}){const i=indexedDB.open(e,t),s=wrap(i);return r&&i.addEventListener("upgradeneeded",e=>{r(wrap(i.result),e.oldVersion,e.newVersion,wrap(i.transaction))}),n&&i.addEventListener("blocked",()=>n()),o&&s.then(e=>e.addEventListener("versionchange",o)).catch(()=>{}),s}function deleteDB(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",()=>t()),wrap(n).then(()=>void 0)}const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(cachedMethods.get(t))return cachedMethods.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=writeMethods.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!readMethods.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,o?"readwrite":"readonly");let s=i.store;r&&(s=s.index(t.shift()));const a=s[n](...t);return o&&await i.done,a};return cachedMethods.set(t,i),i}addTraps(e=>({get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)}));var _idb=Object.freeze({__proto__:null,openDB:openDB,deleteDB:deleteDB,unwrap:unwrap,wrap:wrap}),hyperHTML=function(e){/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap}catch(u){t.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,o=i.prototype;return o.delete=function(e){return this.has(e)&&delete e[this._]},o.get=function(e){return this.has(e)?e[this._]:void 0},o.has=function(e){return r.call(e,this._)},o.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},i;function i(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(s,this)}function s(e){this.set(e[0],e[1])}}(Math.random(),Object)}var n=t.WeakMap,r={};
/*! (c) Andrea Giammarchi - ISC */try{r.WeakSet=WeakSet}catch(u){!function(e,t){var n=o.prototype;function o(){t(this,"_",{value:"_@ungap/weakmap"+e++})}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},r.WeakSet=o}(Math.random(),Object.defineProperty)}function o(e,t,n,r,o,i){for(var s=("selectedIndex"in t),a=s;r<o;){var l=e(n[r],1);if(t.insertBefore(l,i),s&&a&&l.selected){a=!a;var c=t.selectedIndex;t.selectedIndex=c<0?r:d.call(t.querySelectorAll("option"),l)}r++}}function i(e,t){return e==t}function s(e){return e}function a(e,t,n,r,o,i,s){var a=i-o;if(a<1)return-1;for(;a<=n-t;){for(var l=t,c=o;l<n&&c<i&&s(e[l],r[c]);)l++,c++;if(c===i)return t;t=l+1}return-1}function l(e,t,n,r,o){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:o}function c(e,t,n,r){for(;n<r;)h(e(t[n++],-1))}var u=r.WeakSet,d=[].indexOf,p=function(e,t,n){for(var r=1,o=t;r<o;){var i=(r+o)/2>>>0;n<e[i]?o=i:r=1+i}return r},h=function(e){return(e.remove||function(){var e=this.parentNode;e&&e.removeChild(this)}
/*! (c) 2018 Andrea Giammarchi (ISC) */).call(e)};function f(e,t,n,r){for(var u=(r=r||{}).compare||i,d=r.node||s,h=null==r.before?null:d(r.before,0),f=t.length,m=f,g=0,b=n.length,$=0;g<m&&$<b&&u(t[g],n[$]);)g++,$++;for(;g<m&&$<b&&u(t[m-1],n[b-1]);)m--,b--;var y=g===m,w=$===b;if(y&&w)return n;if(y&&$<b)return o(d,e,n,$,b,l(d,t,g,f,h)),n;if(w&&g<m)return c(d,t,g,m),n;var v=m-g,k=b-$,x=-1;if(v<k){if(-1<(x=a(n,$,b,t,g,m,u)))return o(d,e,n,$,x,d(t[g],0)),o(d,e,n,x+v,b,l(d,t,m,f,h)),n}else if(k<v&&-1<(x=a(t,g,m,n,$,b,u)))return c(d,t,g,x),c(d,t,x+k,m),n;return v<2||k<2?(o(d,e,n,$,b,d(t[g],0)),c(d,t,g,m)):v==k&&function(e,t,n,r,o,i){for(;r<o&&i(n[r],e[t-1]);)r++,t--;return 0===t}(n,b,t,g,m,u)?o(d,e,n,$,b,l(d,t,m,f,h)):function(e,t,n,r,i,s,a,l,u,d,h,f,m){!function(e,t,n,r,i,s,a,l,u){for(var d=[],p=e.length,h=a,f=0;f<p;)switch(e[f++]){case 0:i++,h++;break;case 1:d.push(r[i]),o(t,n,r,i++,i,h<l?t(s[h],0):u);break;case-1:h++}for(f=0;f<p;)switch(e[f++]){case 0:a++;break;case-1:-1<d.indexOf(s[a])?a++:c(t,s,a++,a)}}(function(e,t,n,r,o,i,s){var a,l,c,u,d,p,h,f=n+i,m=[];e:for(a=0;a<=f;a++){if(50<a)return null;for(h=a-1,d=a?m[a-1]:[0,0],p=m[a]=[],l=-a;l<=a;l+=2){for(c=(u=l===-a||l!==a&&d[h+l-1]<d[h+l+1]?d[h+l+1]:d[h+l-1]+1)-l;u<i&&c<n&&s(r[o+u],e[t+c]);)u++,c++;if(u===i&&c===n)break e;p[a+l]=u}}var g=Array(a/2+f/2),b=g.length-1;for(a=m.length-1;0<=a;a--){for(;0<u&&0<c&&s(r[o+u-1],e[t+c-1]);)g[b--]=0,u--,c--;if(!a)break;h=a-1,d=a?m[a-1]:[0,0],(l=u-c)==-a||l!==a&&d[h+l-1]<d[h+l+1]?(c--,g[b--]=1):(u--,g[b--]=-1)}return g}(n,r,s,a,l,d,f)||function(e,t,n,r,o,i,s,a){var l=0,c=r<a?r:a,u=Array(c++),d=Array(c);d[0]=-1;for(var h=1;h<c;h++)d[h]=s;for(var f=o.slice(i,s),m=t;m<n;m++){var g=f.indexOf(e[m]);if(-1<g){var b=g+i;-1<(l=p(d,c,b))&&(d[l]=b,u[l]={newi:m,oldi:b,prev:u[l-1]})}}for(l=--c,--s;d[l]>s;)--l;c=a+r-l;var $=Array(c),y=u[l];for(--n;y;){for(var w=y.newi,v=y.oldi;w<n;)$[--c]=1,--n;for(;v<s;)$[--c]=-1,--s;$[--c]=0,--n,--s,y=y.prev}for(;t<=n;)$[--c]=1,--n;for(;i<=s;)$[--c]=-1,--s;return $}(n,r,i,s,a,l,u,d),e,t,n,r,a,l,h,m)}(d,e,n,$,b,k,t,g,m,v,f,u,h),n}var m={};
/*! (c) Andrea Giammarchi - ISC */function g(t,n){n=n||{};var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!!n.bubbles,!!n.cancelable,n.detail),r}m.CustomEvent="function"==typeof CustomEvent?CustomEvent:(g["prototype"]=new g("").constructor.prototype,g);var b=m.CustomEvent,$={};
/*! (c) Andrea Giammarchi - ISC */try{$.Map=Map}catch(u){$.Map=function(){var e=0,t=[],n=[];return{delete:function(o){var i=r(o);return i&&(t.splice(e,1),n.splice(e,1)),i},forEach:function(e,r){t.forEach((function(t,o){e.call(r,n[o],t,this)}),this)},get:function(t){return r(t)?n[e]:void 0},has:function(e){return r(e)},set:function(o,i){return n[r(o)?e:t.push(o)-1]=i,this}};function r(n){return-1<(e=t.indexOf(n))}}}var y=$.Map;function w(){return this}function v(e,t){var n="_"+e+"$";return{get:function(){return this[n]||k(this,n,t.call(this,e))},set:function(e){k(this,n,e)}}}var k=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(w.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var x,_,L,S,C,E,T={},R={},A=[],M=R.hasOwnProperty,P=0,N={attributes:T,define:function(e,t){e.indexOf("-")<0?(e in R||(P=A.push(e)),R[e]=t):T[e]=t},invoke:function(e,t){for(var n=0;n<P;n++){var r=A[n];if(M.call(e,r))return R[r](e[r],t)}}},I=Array.isArray||(_=(x={}.toString).call([]),function(e){return x.call(e)===_}),D=(L=e,S="fragment",E="content"in O(C="template")?function(e){var t=O(C);return t.innerHTML=e,t.content}:function(e){var t=O(S),n=O(C),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var o=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(o)}else n.innerHTML=e,r=n.childNodes;return j(t,r),t},function(e,t){return("svg"===t?function(e){var t=O(S),n=O("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",j(t,n.firstChild.childNodes),t}:E)(e)});function j(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function O(e){return e===S?L.createDocumentFragment():L.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */var z,H,B,q,F,U,W,G,V,Z=(H="appendChild",B="cloneNode",q="createTextNode",U=(F="importNode")in(z=e),(W=z.createDocumentFragment())[H](z[q]("g")),W[H](z[q]("")),(U?z[F](W,!0):W[B](!0)).childNodes.length<2?function e(t,n){for(var r=t[B](),o=t.childNodes||[],i=o.length,s=0;n&&s<i;s++)r[H](e(o[s],n));return r}:U?z[F]:function(e,t){return e[B](!!t)}),K="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},J="-"+Math.random().toFixed(6)+"%",X=!1;try{G=e.createElement("template"),V="tabindex","content"in G&&(G.innerHTML="<p "+V+'="'+J+'"></p>',G.content.childNodes[0].getAttribute(V)==J)||(J="_dt: "+J.slice(1,-1)+";",X=!0)}catch(u){}var Y="\x3c!--"+J+"--\x3e",Q=8,ee=1,te=3,ne=/^(?:style|textarea)$/i,re=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,oe=" \\f\\n\\r\\t",ie="[^"+oe+"\\/>\"'=]+",se="["+oe+"]+"+ie,ae="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",le="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ie.replace("\\/","")+"))?)",ce=new RegExp(ae+se+le+"+)(["+oe+"]*/?>)","g"),ue=new RegExp(ae+se+le+"*)(["+oe+"]*/>)","g"),de=new RegExp("("+se+"\\s*=\\s*)(['\"]?)"+Y+"\\2","gi");function pe(e,t,n,r){return"<"+t+n.replace(de,he)+r}function he(e,t,n){return t+(n||'"')+J+(n||'"')}function fe(e,t,n){return re.test(t)?e:"<"+t+n+"></"+t+">"}var me=X?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort((function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1}))}:function(e,t){return t.slice.call(e,0)};function ge(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function be(t,n,r,o){for(var i=t.attributes,s=[],a=[],l=me(i,r),c=l.length,u=0;u<c;){var d,p=l[u++],h=p.value===J;if(h||1<(d=p.value.split(Y)).length){var f=p.name;if(s.indexOf(f)<0){s.push(f);var m=r.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+f+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),g=i[m]||i[m.toLowerCase()];if(h)n.push($e(g,o,m,null));else{for(var b=d.length-2;b--;)r.shift();n.push($e(g,o,m,d))}}a.push(p)}}for(var $=((u=0)<(c=a.length)&&X&&!("ownerSVGElement"in t));u<c;){var y=a[u++];$&&(y.value=""),t.removeAttribute(y.name)}var w=t.nodeName;if(/^script$/i.test(w)){var v=e.createElement(w);for(c=i.length,u=0;u<c;)v.setAttributeNode(i[u++].cloneNode(!0));v.textContent=t.textContent,t.parentNode.replaceChild(v,t)}}function $e(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function ye(e,t){return{type:"text",node:e,path:t}}var we=new n;function ve(e,t){var n=(e.convert||
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(Y).replace(ue,fe).replace(ce,pe)})(t),r=e.transform;r&&(n=r(n));var o=D(n,e.type);xe(o);var i=[];!function e(t,n,r,o){for(var i=t.childNodes,s=i.length,a=0;a<s;){var l=i[a];switch(l.nodeType){case ee:var c=o.concat(a);be(l,n,r,c),e(l,n,r,c);break;case Q:var u=l.textContent;if(u===J)r.shift(),n.push(ne.test(t.nodeName)?ye(t,o):{type:"any",node:l,path:o.concat(a)});else switch(u.slice(0,2)){case"/*":if("*/"!==u.slice(-2))break;case"👻":t.removeChild(l),a--,s--}break;case te:ne.test(t.nodeName)&&K.call(l.textContent)===Y&&(r.shift(),n.push(ye(t,o)))}a++}}(o,i,t.slice(0),[]);var s={content:o,updates:function(n){for(var r=[],o=i.length,s=0,a=0;s<o;){var l=i[s++],c=ge(n,l.path);switch(l.type){case"any":r.push({fn:e.any(c,[]),sparse:!1});break;case"attr":var u=l.sparse,d=e.attribute(c,l.name,l.node);null===u?r.push({fn:d,sparse:!1}):(a+=u.length-2,r.push({fn:d,sparse:!0,values:u}));break;case"text":r.push({fn:e.text(c),sparse:!1}),c.textContent=""}}return o+=a,function(){var e=arguments.length;if(o!==e-1)throw new Error(e-1+" values instead of "+o+"\n"+t.join("${value}"));for(var i=1,s=1;i<e;){var a=r[i-s];if(a.sparse){var l=a.values,c=l[0],u=1,d=l.length;for(s+=d-2;u<d;)c+=arguments[i++]+l[u++];a.fn(c)}else a.fn(arguments[i++])}return n}}};return we.set(t,s),s}var ke=[];function xe(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===K.call(r.textContent).length&&e.removeChild(r)}}
/*! (c) Andrea Giammarchi - ISC */var _e,Le,Se=(_e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Le=/([^A-Z])([A-Z]+)/g,function(e,t){return"ownerSVGElement"in e?function(e,t){var n;return(n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),Ee(n,!0)}(e,t):Ee(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Ce(e,t,n){return t+"-"+n.toLowerCase()}function Ee(e,t){var n,r;return function(o){var i,s,a,l;switch(typeof o){case"object":if(o){if("object"===n){if(!t&&r!==o)for(s in r)s in o||(e[s]="")}else t?e.value="":e.cssText="";for(s in i=t?{}:e,o)a="number"!=typeof(l=o[s])||_e.test(s)?l:l+"px",!t&&/^--/.test(s)?i.setProperty(s,a):i[s]=a;n="object",t?e.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Le,Ce),":",e[t],";");return n.join("")}(r=i):r=o;break}default:r!=o&&(n="string",r=o,t?e.value=o||"":e.cssText=o||"")}}}var Te,Re,Ae=(Te=[].slice,(Re=Me.prototype).ELEMENT_NODE=1,Re.nodeType=111,Re.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var o=this.ownerDocument.createRange();o.setStartBefore(e?t[1]:n),o.setEndAfter(r),o.deleteContents()}return n},Re.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,o=0,i=r.length;o<i;o++)t.appendChild(r[o]);return t},Me);function Me(e){var t=this.childNodes=Te.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null}function Pe(e){return{html:e}}function Ne(e,t){switch(e.nodeType){case Ue:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case Fe:return Ne(e.render(),t);default:return e}}function Ie(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(Pe).then(t):Promise.resolve(N.invoke(e,t)).then(t)}function De(e){return null!=e&&"then"in e}var je,Oe,ze,He,Be,qe="ownerSVGElement",Fe=w.prototype.nodeType,Ue=Ae.prototype.nodeType,We=(Oe=(je={Event:b,WeakSet:u}).Event,ze=je.WeakSet,He=!0,Be=null,function(e){return He&&(He=!He,Be=new ze,function(e){var t=new ze,n=new ze;try{new MutationObserver(s).observe(e,{subtree:!0,childList:!0})}catch(t){var r=0,o=[],i=function(e){o.push(e),clearTimeout(r),r=setTimeout((function(){s(o.splice(r=0,o.length))}),0)};e.addEventListener("DOMNodeRemoved",(function(e){i({addedNodes:[],removedNodes:[e.target]})}),!0),e.addEventListener("DOMNodeInserted",(function(e){i({addedNodes:[e.target],removedNodes:[]})}),!0)}function s(e){for(var r,o=e.length,i=0;i<o;i++)a((r=e[i]).removedNodes,"disconnected",n,t),a(r.addedNodes,"connected",t,n)}function a(e,t,n,r){for(var o,i=new Oe(t),s=e.length,a=0;a<s;1===(o=e[a++]).nodeType&&l(o,i,t,n,r));}function l(e,t,n,r,o){Be.has(e)&&!r.has(e)&&(o.delete(e),r.add(e),e.dispatchEvent(t));for(var i=e.children||[],s=i.length,a=0;a<s;l(i[a++],t,n,r,o));}}(e.ownerDocument)),Be.add(e),e}),Ge=/^(?:form|list)$/i,Ve=[].slice;function Ze(t){return this.type=t,function(t){var n=ke,r=xe;return function(o){var i,s,a;return n!==o&&(i=t,s=n=o,a=we.get(s)||ve(i,s),r=a.updates(Z.call(e,a.content,!0))),r.apply(null,arguments)}}(this)}var Ke=!(Ze.prototype={attribute:function(e,t,n){var r,o=qe in e;if("style"===t)return Se(e,n,o);if(/^on/.test(t)){var i=t.slice(2);return"connected"===i||"disconnected"===i?We(e):t.toLowerCase()in e&&(i=i.toLowerCase()),function(t){r!==t&&(r&&e.removeEventListener(i,r,!1),(r=t)&&e.addEventListener(i,t,!1))}}if("data"===t||!o&&t in e&&!Ge.test(t))return function(n){r!==n&&(r=n,e[t]!==n&&null==n?(e[t]="",e.removeAttribute(t)):e[t]=n)};if(t in N.attributes)return function(n){var o=N.attributes[t](e,n);r!==o&&(null==(r=o)?e.removeAttribute(t):e.setAttribute(t,o))};var s=!1,a=n.cloneNode(!0);return function(t){r!==t&&(r=t,a.value!==t&&(null==t?(s&&(s=!1,e.removeAttributeNode(a)),a.value=t):(a.value=t,s||(s=!0,e.setAttributeNode(a)))))}},any:function(e,t){var n,r={node:Ne,before:e},o=qe in e?"svg":"html",i=!1;return function s(a){switch(typeof a){case"string":case"number":case"boolean":i?n!==a&&(n=a,t[0].textContent=a):(i=!0,n=a,t=f(e.parentNode,t,[(l=a,e.ownerDocument.createTextNode(l))],r));break;case"function":s(a(e));break;case"object":case"undefined":if(null==a){i=!1,t=f(e.parentNode,t,[],r);break}default:if(i=!1,I(n=a))if(0===a.length)t.length&&(t=f(e.parentNode,t,[],r));else switch(typeof a[0]){case"string":case"number":case"boolean":s({html:a});break;case"object":if(I(a[0])&&(a=a.concat.apply([],a)),De(a[0])){Promise.all(a).then(s);break}default:t=f(e.parentNode,t,a,r)}else"ELEMENT_NODE"in a?t=f(e.parentNode,t,11===a.nodeType?Ve.call(a.childNodes):[a],r):De(a)?a.then(s):"placeholder"in a?Ie(a,s):"text"in a?s(String(a.text)):"any"in a?s(a.any):"html"in a?t=f(e.parentNode,t,Ve.call(D([].concat(a.html).join(""),o).childNodes),r):s("length"in a?Ve.call(a):N.invoke(a,s))}var l}},text:function(e){var t;return function n(r){if(t!==r){var o=typeof(t=r);"object"==o&&r?De(r)?r.then(n):"placeholder"in r?Ie(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?Ve.call(r).join(""):N.invoke(r,n)):"function"==o?n(r(e)):e.textContent=null==r?"":r}}}}),Je=function(t){var r,o=(r=(e.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(r)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(r)),i=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(o||i){var s={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return s[t]||(s[t]=e)};if(i)Je=a;else{var l=new n;Je=function(e){return l.get(e)||(n=a(t=e),l.set(t,n),n);var t,n}}}else Ke=!0;return Xe(t)};function Xe(e){return Ke?e:Je(e)}function Ye(e){for(var t=arguments.length,n=[Xe(e)],r=1;r<t;)n.push(arguments[r++]);return n}var Qe=new n,et=function(e){var t,n,r;return function(){var o=Ye.apply(null,arguments);return r!==o[0]?(r=o[0],n=new Ze(e),t=nt(n.apply(n,o))):n.apply(n,o),t}},tt=function(e,t){var n=t.indexOf(":"),r=Qe.get(e),o=t;return-1<n&&(o=t.slice(n+1),t=t.slice(0,n)||"html"),r||Qe.set(e,r={}),r[o]||(r[o]=et(t))},nt=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Ae(t):e},rt=new n;function ot(){var e=rt.get(this),t=Ye.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ze(qe in this?"svg":"html");rt.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments))}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var it,st,at,lt,ct=N.define,ut=Ze.prototype;function dt(e){return arguments.length<2?null==e?et("html"):"string"==typeof e?dt.wire(null,e):"raw"in e?et("html")(e):"nodeType"in e?dt.bind(e):tt(e,"html"):("raw"in e?et("html"):dt.wire).apply(null,arguments)}return dt.Component=w,dt.bind=function(e){return ot.bind(e)},dt.define=ct,dt.diff=f,(dt.hyper=dt).observe=We,dt.tagger=ut,dt.wire=function(e,t){return null==e?et(t||"html"):tt(e,t||"html")},dt._={WeakMap:n,WeakSet:u},it=et,st=new n,at=Object.create,lt=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(w,{for:{configurable:!0,value:function(e,t){return function(e,t,r,o){var i,s,a,l=t.get(e)||lt(e,t);switch(typeof o){case"object":case"function":var c=l.w||(l.w=new n);return c.get(o)||(i=c,s=o,a=new e(r),i.set(s,a),a);default:var u=l.p||(l.p=at(null));return u[o]||(u[o]=new e(r))}}(this,st.get(e)||(r=e,o=new y,st.set(r,o),o),e,null==t?"default":t);var r,o}}}),Object.defineProperties(w.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:v("html",it),svg:v("svg",it),state:v("state",(function(){return this.defaultState})),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new b(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return!1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var o in r)n[o]=r[o];return!1!==t&&this.render(),this}}}),dt}(document);
/*! (c) Andrea Giammarchi (ISC) */function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var defaults=createCommonjsModule((function(e){function t(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1},getDefaults:t,changeDefaults:function(t){e.exports.defaults=t}}})),defaults_1=defaults.defaults,defaults_2=defaults.getDefaults,defaults_3=defaults.changeDefaults;const escapeTest=/[&<>"']/,escapeReplace=/[&<>"']/g,escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g,escapeReplacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},getEscapeReplacement=e=>escapeReplacements[e];function escape(e,t){if(t){if(escapeTest.test(e))return e.replace(escapeReplace,getEscapeReplacement)}else if(escapeTestNoEncode.test(e))return e.replace(escapeReplaceNoEncode,getEscapeReplacement);return e}const unescapeTest=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function unescape(e){return e.replace(unescapeTest,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const caret=/(^|[^\[])\^/g;function edit(e,t){e=e.source||e,t=t||"";const n={replace:(t,r)=>(r=(r=r.source||r).replace(caret,"$1"),e=e.replace(t,r),n),getRegex:()=>new RegExp(e,t)};return n}const nonWordAndColonTest=/[^\w:]/g,originIndependentUrl=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function cleanUrl(e,t,n){if(e){let e;try{e=decodeURIComponent(unescape(n)).replace(nonWordAndColonTest,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!originIndependentUrl.test(n)&&(n=resolveUrl(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}const baseUrls={},justDomain=/^[^:]+:\/*[^/]*$/,protocol=/^([^:]+:)[\s\S]*$/,domain=/^([^:]+:\/*[^/]*)[\s\S]*$/;function resolveUrl(e,t){baseUrls[" "+e]||(justDomain.test(e)?baseUrls[" "+e]=e+"/":baseUrls[" "+e]=rtrim(e,"/",!0));const n=-1===(e=baseUrls[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(protocol,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(domain,"$1")+t:e+t}const noopTest={exec:function(){}};function merge(e){let t,n,r=1;for(;r<arguments.length;r++)for(n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function splitCells(e,t){const n=e.replace(/\|/g,(e,t,n)=>{let r=!1,o=t;for(;--o>=0&&"\\"===n[o];)r=!r;return r?"|":" |"}).split(/ \|/);let r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function rtrim(e,t,n){const r=e.length;if(0===r)return"";let o=0;for(;o<r;){const i=e.charAt(r-o-1);if(i!==t||n){if(i===t||!n)break;o++}else o++}return e.substr(0,r-o)}function findClosingBracket(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let r=0,o=0;for(;o<n;o++)if("\\"===e[o])o++;else if(e[o]===t[0])r++;else if(e[o]===t[1]&&(r--,r<0))return o;return-1}function checkSanitizeDeprecation(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}var helpers={escape:escape,unescape:unescape,edit:edit,cleanUrl:cleanUrl,resolveUrl:resolveUrl,noopTest:noopTest,merge:merge,splitCells:splitCells,rtrim:rtrim,findClosingBracket:findClosingBracket,checkSanitizeDeprecation:checkSanitizeDeprecation};const{noopTest:noopTest$1,edit:edit$1,merge:merge$1}=helpers,block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:noopTest$1,table:noopTest$1,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};block.def=edit$1(block.def).replace("label",block._label).replace("title",block._title).getRegex(),block.bullet=/(?:[*+-]|\d{1,9}\.)/,block.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,block.item=edit$1(block.item,"gm").replace(/bull/g,block.bullet).getRegex(),block.list=edit$1(block.list).replace(/bull/g,block.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+block.def.source+")").getRegex(),block._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",block._comment=/<!--(?!-?>)[\s\S]*?-->/,block.html=edit$1(block.html,"i").replace("comment",block._comment).replace("tag",block._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),block.paragraph=edit$1(block._paragraph).replace("hr",block.hr).replace("heading"," {0,3}#{1,6} +").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",block._tag).getRegex(),block.blockquote=edit$1(block.blockquote).replace("paragraph",block.paragraph).getRegex(),block.normal=merge$1({},block),block.gfm=merge$1({},block.normal,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),block.pedantic=merge$1({},block.normal,{html:edit$1("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",block._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:noopTest$1,paragraph:edit$1(block.normal._paragraph).replace("hr",block.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",block.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const inline={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:noopTest$1,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:noopTest$1,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"};inline.em=edit$1(inline.em).replace(/punctuation/g,inline._punctuation).getRegex(),inline._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,inline._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,inline._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,inline.autolink=edit$1(inline.autolink).replace("scheme",inline._scheme).replace("email",inline._email).getRegex(),inline._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,inline.tag=edit$1(inline.tag).replace("comment",block._comment).replace("attribute",inline._attribute).getRegex(),inline._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,inline._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,inline._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,inline.link=edit$1(inline.link).replace("label",inline._label).replace("href",inline._href).replace("title",inline._title).getRegex(),inline.reflink=edit$1(inline.reflink).replace("label",inline._label).getRegex(),inline.normal=merge$1({},inline),inline.pedantic=merge$1({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:edit$1(/^!?\[(label)\]\((.*?)\)/).replace("label",inline._label).getRegex(),reflink:edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",inline._label).getRegex()}),inline.gfm=merge$1({},inline.normal,{escape:edit$1(inline.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),inline.gfm.url=edit$1(inline.gfm.url,"i").replace("email",inline.gfm._extended_email).getRegex(),inline.breaks=merge$1({},inline.gfm,{br:edit$1(inline.br).replace("{2,}","*").getRegex(),text:edit$1(inline.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var rules={block:block,inline:inline};const{defaults:defaults$1}=defaults,{block:block$1}=rules,{rtrim:rtrim$1,splitCells:splitCells$1,escape:escape$1}=helpers;var Lexer_1=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||defaults$1,this.rules=block$1.normal,this.options.pedantic?this.rules=block$1.pedantic:this.options.gfm&&(this.rules=block$1.gfm)}static get rules(){return block$1}static lex(t,n){return new e(n).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.token(e,!0)}token(e,t){let n,r,o,i,s,a,l,c,u,d,p,h,f,m,g,b;for(e=e.replace(/^ +$/gm,"");e;)if((o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e)){const t=this.tokens[this.tokens.length-1];e=e.substring(o[0].length),t&&"paragraph"===t.type?t.text+="\n"+o[0].trimRight():(o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?o:rtrim$1(o,"\n")}))}else if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2]?o[2].trim():o[2],text:o[3]||""});else if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if((o=this.rules.nptable.exec(e))&&(a={type:"table",header:splitCells$1(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},a.header.length===a.align.length)){for(e=e.substring(o[0].length),p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=splitCells$1(a.cells[p],a.header.length);this.tokens.push(a)}else if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,t),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),i=o[2],m=i.length>1,l={type:"list_start",ordered:m,start:m?+i:"",loose:!1},this.tokens.push(l),o=o[0].match(this.rules.item),c=[],n=!1,f=o.length,p=0;p<f;p++)a=o[p],d=a.length,a=a.replace(/^ *([*+-]|\d+\.) */,""),~a.indexOf("\n ")&&(d-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+d+"}","gm"),"")),p!==f-1&&(s=block$1.bullet.exec(o[p+1])[0],(i.length>1?1===s.length:s.length>1||this.options.smartLists&&s!==i)&&(e=o.slice(p+1).join("\n")+e,p=f-1)),r=n||/\n\n(?!\s*$)/.test(a),p!==f-1&&(n="\n"===a.charAt(a.length-1),r||(r=n)),r&&(l.loose=!0),g=/^\[[ xX]\] /.test(a),b=void 0,g&&(b=" "!==a[1],a=a.replace(/^\[[ xX]\] +/,"")),u={type:"list_item_start",task:g,checked:b,loose:r},c.push(u),this.tokens.push(u),this.token(a,!1),this.tokens.push({type:"list_item_end"});if(l.loose)for(f=c.length,p=0;p<f;p++)c[p].loose=!0;this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):escape$1(o[0]):o[0]});else if(t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),o[3]&&(o[3]=o[3].substring(1,o[3].length-1)),h=o[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[h]||(this.tokens.links[h]={href:o[2],title:o[3]});else if((o=this.rules.table.exec(e))&&(a={type:"table",header:splitCells$1(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},a.header.length===a.align.length)){for(e=e.substring(o[0].length),p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=splitCells$1(a.cells[p].replace(/^ *\| *| *\| *$/g,""),a.header.length);this.tokens.push(a)}else if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2].charAt(0)?1:2,text:o[1]});else if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens}};const{defaults:defaults$2}=defaults,{cleanUrl:cleanUrl$1,escape:escape$2}=helpers;var Renderer_1=class{constructor(e){this.options=e||defaults$2}code(e,t,n){const r=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,r);null!=t&&t!==e&&(n=!0,e=t)}return r?'<pre><code class="'+this.options.langPrefix+escape$2(r,!0)+'">'+(n?e:escape$2(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:escape$2(e,!0))+"</code></pre>"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,n,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let r='<a href="'+escape$2(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">",r}text(e){return e}},Slugger_1=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}};const{defaults:defaults$3}=defaults,{inline:inline$1}=rules,{findClosingBracket:findClosingBracket$1,escape:escape$3}=helpers;var InlineLexer_1=class e{constructor(e,t){if(this.options=t||defaults$3,this.links=e,this.rules=inline$1.normal,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=inline$1.pedantic:this.options.gfm&&(this.options.breaks?this.rules=inline$1.breaks:this.rules=inline$1.gfm)}static get rules(){return inline$1}static output(t,n,r){return new e(n,r).output(t)}output(t){let n,r,o,i,s,a,l="";for(;t;)if(s=this.rules.escape.exec(t))t=t.substring(s[0].length),l+=escape$3(s[1]);else if(s=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(s[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(s[0])&&(this.inRawBlock=!1),t=t.substring(s[0].length),l+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):escape$3(s[0]):s[0];else if(s=this.rules.link.exec(t)){const r=findClosingBracket$1(s[2],"()");if(r>-1){const e=(0===s[0].indexOf("!")?5:4)+s[1].length+r;s[2]=s[2].substring(0,r),s[0]=s[0].substring(0,e).trim(),s[3]=""}t=t.substring(s[0].length),this.inLink=!0,o=s[2],this.options.pedantic?(n=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o),n?(o=n[1],i=n[3]):i=""):i=s[3]?s[3].slice(1,-1):"",o=o.trim().replace(/^<([\s\S]*)>$/,"$1"),l+=this.outputLink(s,{href:e.escapes(o),title:e.escapes(i)}),this.inLink=!1}else if((s=this.rules.reflink.exec(t))||(s=this.rules.nolink.exec(t))){if(t=t.substring(s[0].length),n=(s[2]||s[1]).replace(/\s+/g," "),n=this.links[n.toLowerCase()],!n||!n.href){l+=s[0].charAt(0),t=s[0].substring(1)+t;continue}this.inLink=!0,l+=this.outputLink(s,n),this.inLink=!1}else if(s=this.rules.strong.exec(t))t=t.substring(s[0].length),l+=this.renderer.strong(this.output(s[4]||s[3]||s[2]||s[1]));else if(s=this.rules.em.exec(t))t=t.substring(s[0].length),l+=this.renderer.em(this.output(s[6]||s[5]||s[4]||s[3]||s[2]||s[1]));else if(s=this.rules.code.exec(t))t=t.substring(s[0].length),l+=this.renderer.codespan(escape$3(s[2].trim(),!0));else if(s=this.rules.br.exec(t))t=t.substring(s[0].length),l+=this.renderer.br();else if(s=this.rules.del.exec(t))t=t.substring(s[0].length),l+=this.renderer.del(this.output(s[1]));else if(s=this.rules.autolink.exec(t))t=t.substring(s[0].length),"@"===s[2]?(r=escape$3(this.mangle(s[1])),o="mailto:"+r):(r=escape$3(s[1]),o=r),l+=this.renderer.link(o,null,r);else if(this.inLink||!(s=this.rules.url.exec(t))){if(s=this.rules.text.exec(t))t=t.substring(s[0].length),this.inRawBlock?l+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):escape$3(s[0]):s[0]):l+=this.renderer.text(escape$3(this.smartypants(s[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else{if("@"===s[2])r=escape$3(s[0]),o="mailto:"+r;else{do{a=s[0],s[0]=this.rules._backpedal.exec(s[0])[0]}while(a!==s[0]);r=escape$3(s[0]),o="www."===s[1]?"http://"+r:r}t=t.substring(s[0].length),l+=this.renderer.link(o,null,r)}return l}static escapes(t){return t?t.replace(e.rules._escapes,"$1"):t}outputLink(e,t){const n=t.href,r=t.title?escape$3(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,escape$3(e[1]))}smartypants(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e}mangle(e){if(!this.options.mangle)return e;const t=e.length;let n,r="",o=0;for(;o<t;o++)n=e.charCodeAt(o),Math.random()>.5&&(n="x"+n.toString(16)),r+="&#"+n+";";return r}},TextRenderer_1=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}};const{defaults:defaults$4}=defaults,{merge:merge$2,unescape:unescape$1}=helpers;var Parser_1=class e{constructor(e){this.tokens=[],this.token=null,this.options=e||defaults$4,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new Slugger_1}static parse(t,n){return new e(n).parse(t)}parse(e){this.inline=new InlineLexer_1(e.links,this.options),this.inlineText=new InlineLexer_1(e.links,merge$2({},this.options,{renderer:new TextRenderer_1})),this.tokens=e.reverse();let t="";for(;this.next();)t+=this.tok();return t}next(){return this.token=this.tokens.pop(),this.token}peek(){return this.tokens[this.tokens.length-1]||0}parseText(){let e=this.token.text;for(;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)}tok(){let e="";switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,unescape$1(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":{let t,n,r,o,i="";for(r="",t=0;t<this.token.header.length;t++)r+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(i+=this.renderer.tablerow(r),t=0;t<this.token.cells.length;t++){for(n=this.token.cells[t],r="",o=0;o<n.length;o++)r+=this.renderer.tablecell(this.inline.output(n[o]),{header:!1,align:this.token.align[o]});e+=this.renderer.tablerow(r)}return this.renderer.table(i,e)}case"blockquote_start":for(e="";"blockquote_end"!==this.next().type;)e+=this.tok();return this.renderer.blockquote(e);case"list_start":{e="";const t=this.token.ordered,n=this.token.start;for(;"list_end"!==this.next().type;)e+=this.tok();return this.renderer.list(e,t,n)}case"list_item_start":{e="";const t=this.token.loose,n=this.token.checked,r=this.token.task;if(this.token.task)if(t)if("text"===this.peek().type){const e=this.peek();e.text=this.renderer.checkbox(n)+" "+e.text}else this.tokens.push({type:"text",text:this.renderer.checkbox(n)});else e+=this.renderer.checkbox(n);for(;"list_item_end"!==this.next().type;)e+=t||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(e,r,n)}case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:{const e='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(e);console.log(e)}}}};const{merge:merge$3,checkSanitizeDeprecation:checkSanitizeDeprecation$1,escape:escape$4}=helpers,{getDefaults:getDefaults,changeDefaults:changeDefaults,defaults:defaults$5}=defaults;function marked(e,t,n){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(n||"function"==typeof t){n||(n=t,t=null),t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t);const r=t.highlight;let o,i,s=0;try{o=Lexer_1.lex(e,t)}catch(e){return n(e)}i=o.length;const a=function(e){if(e)return t.highlight=r,n(e);let i;try{i=Parser_1.parse(o,t)}catch(t){e=t}return t.highlight=r,e?n(e):n(null,i)};if(!r||r.length<3)return a();if(delete t.highlight,!i)return a();for(;s<o.length;s++)!function(e){"code"!==e.type?--i||a():r(e.text,e.lang,(function(t,n){return t?a(t):null==n||n===e.text?--i||a():(e.text=n,e.escaped=!0,void(--i||a()))}))}(o[s])}else try{return t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t),Parser_1.parse(Lexer_1.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||marked.defaults).silent)return"<p>An error occurred:</p><pre>"+escape$4(e.message+"",!0)+"</pre>";throw e}}marked.options=marked.setOptions=function(e){return merge$3(marked.defaults,e),changeDefaults(marked.defaults),marked},marked.getDefaults=getDefaults,marked.defaults=defaults$5,marked.Parser=Parser_1,marked.parser=Parser_1.parse,marked.Renderer=Renderer_1,marked.TextRenderer=TextRenderer_1,marked.Lexer=Lexer_1,marked.lexer=Lexer_1.lex,marked.InlineLexer=InlineLexer_1,marked.inlineLexer=InlineLexer_1.output,marked.Slugger=Slugger_1,marked.parse=marked;var marked_1=marked,commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function createCommonjsModule$1(e,t){return e(t={exports:{}},t.exports),t.exports}var pluralize=createCommonjsModule$1((function(e,t){!function(t,n){"function"==typeof commonjsRequire?e.exports=n():t.pluralize=n()}(commonjsGlobal,(function(){var e=[],t=[],n={},r={},o={};function i(e){return"string"==typeof e?new RegExp("^"+e+"$","i"):e}function s(e,t){return e===t?t:e===e.toLowerCase()?t.toLowerCase():e===e.toUpperCase()?t.toUpperCase():e[0]===e[0].toUpperCase()?t.charAt(0).toUpperCase()+t.substr(1).toLowerCase():t.toLowerCase()}function a(e,t){return e.replace(/\$(\d{1,2})/g,(function(e,n){return t[n]||""}))}function l(e,t){return e.replace(t[0],(function(n,r){var o=a(t[1],arguments);return s(""===n?e[r-1]:n,o)}))}function c(e,t,r){if(!e.length||n.hasOwnProperty(e))return t;for(var o=r.length;o--;){var i=r[o];if(i[0].test(t))return l(t,i)}return t}function u(e,t,n){return function(r){var o=r.toLowerCase();return t.hasOwnProperty(o)?s(r,o):e.hasOwnProperty(o)?s(r,e[o]):c(o,r,n)}}function d(e,t,n,r){return function(r){var o=r.toLowerCase();return!!t.hasOwnProperty(o)||!e.hasOwnProperty(o)&&c(o,o,n)===o}}function p(e,t,n){return(n?t+" ":"")+(1===t?p.singular(e):p.plural(e))}return p.plural=u(o,r,e),p.isPlural=d(o,r,e),p.singular=u(r,o,t),p.isSingular=d(r,o,t),p.addPluralRule=function(t,n){e.push([i(t),n])},p.addSingularRule=function(e,n){t.push([i(e),n])},p.addUncountableRule=function(e){"string"!=typeof e?(p.addPluralRule(e,"$0"),p.addSingularRule(e,"$0")):n[e.toLowerCase()]=!0},p.addIrregularRule=function(e,t){t=t.toLowerCase(),e=e.toLowerCase(),o[e]=t,r[t]=e},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach((function(e){return p.addIrregularRule(e[0],e[1])})),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach((function(e){return p.addPluralRule(e[0],e[1])})),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach((function(e){return p.addSingularRule(e[0],e[1])})),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[eé]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(p.addUncountableRule),p}))}));const idb=_idb,hyperHTML$1=hyperHTML,marked$1=marked_1,pluralize$1=pluralize,resourceHints=new Set(["dns-prefetch","preconnect","preload","prerender"]),fetchDestinations=new Set(["document","embed","font","image","manifest","media","object","report","script","serviceworker","sharedworker","style","worker","xslt",""]),nonNormativeSelector=".informative, .note, .issue, .example, .ednote, .practice, .introductory";function createResourceHint(e){if(!e||"object"!=typeof e)throw new TypeError("Missing options");if(!resourceHints.has(e.hint))throw new TypeError("Invalid resources hint");const t=new URL(e.href,location.href),n=document.createElement("link");let{href:r}=t;switch(n.rel=e.hint,n.rel){case"dns-prefetch":case"preconnect":r=t.origin,(e.corsMode||t.origin!==document.location.origin)&&(n.crossOrigin=e.corsMode||"anonymous");break;case"preload":"as"in e&&"string"==typeof e.as&&(fetchDestinations.has(e.as)||console.warn(`Unknown request destination: ${e.as}`),n.setAttribute("as",e.as))}return n.href=r,e.dontRemove||n.classList.add("removeOnSave"),n}function removeReSpec(e){e.querySelectorAll(".remove, script[data-requiremodule]").forEach(e=>{e.remove()})}function showInlineWarning(e,t,n){Array.isArray(e)||(e=[e]);const r=e.map((e,r)=>(markAsOffending(e,t,n),generateMarkdownLink(e,r))).join(", ");pub("warn",`${t} at: ${r}.`),console.warn(t,e)}function showInlineError(e,t,n,{details:r}={}){Array.isArray(e)||(e=[e]);const o=e.map((e,r)=>(markAsOffending(e,t,n),generateMarkdownLink(e,r))).join(", ");let i=`${t} at: ${o}.`;r&&(i+=`\n\n<details>${r}</details>`),pub("error",i),console.error(t,e)}function markAsOffending(e,t,n){e.classList.add("respec-offending-element"),e.hasAttribute("title")||e.setAttribute("title",n||t),e.id||addId(e,"respec-offender")}function generateMarkdownLink(e,t){return`[${t+1}](#${e.id})`}class IDBKeyVal{constructor(e,t){this.idb=e,this.storeName=t}async get(e){return await this.idb.transaction(this.storeName).objectStore(this.storeName).get(e)}async getMany(e){const t=new Set(e),n=new Map;let r=await this.idb.transaction(this.storeName).store.openCursor();for(;r;)t.has(r.key)&&n.set(r.key,r.value),r=await r.continue();return n}async set(e,t){const n=this.idb.transaction(this.storeName,"readwrite");return n.objectStore(this.storeName).put(t,e),await n.done}async addMany(e){const t=this.idb.transaction(this.storeName,"readwrite");for(const[n,r]of e)t.objectStore(this.storeName).put(r,n);return await t.done}async clear(){const e=this.idb.transaction(this.storeName,"readwrite");return e.objectStore(this.storeName).clear(),await e.done}async keys(){const e=this.idb.transaction(this.storeName),t=e.objectStore(this.storeName).getAllKeys();return await e.done,t}}function joinAnd(e=[],t=(e=>e),n=lang){const r=e.map(t);if(Intl.ListFormat&&"function"==typeof Intl.ListFormat){return new Intl.ListFormat(n,{style:"long",type:"conjunction"}).format(r)}switch(r.length){case 0:case 1:return r.toString();case 2:return r.join(" and ");default:{const e=r.join(", "),t=e.lastIndexOf(",");return`${e.substr(0,t+1)} and ${e.slice(t+2)}`}}}function norm(e){return e.trim().replace(/\s+/g," ")}function toKeyValuePairs(e,t=", ",n="="){return Array.from(Object.entries(e)).map(([e,t])=>`${e}${n}${JSON.stringify(t)}`).join(t)}function linkCSS(e,t){const n=[].concat(t).map(t=>{const n=e.createElement("link");return n.rel="stylesheet",n.href=t,n}).reduce((e,t)=>(e.appendChild(t),e),e.createDocumentFragment());e.head.appendChild(n)}function runTransforms(e,t){let n=[this,e];const r=Array.from(arguments);if(r.shift(),r.shift(),n=n.concat(r),t){const r=t.split(/\s+/);for(let t=0;t<r.length;t++){const o=r[t],i=window[o];if(i)try{e=i.apply(this,n)}catch(e){pub("warn",`call to \`${o}()\` failed with: ${e}. See error console for stack trace.`),console.error(e)}}}return e}async function fetchAndCache(e,t=864e5){const n=new Request(e),r=new URL(n.url);let o,i;if("caches"in window)try{if(o=await caches.open(r.origin),i=await o.match(n),i&&new Date(i.headers.get("Expires"))>new Date)return i}catch(e){console.error("Failed to use Cache API.",e)}const s=await fetch(n);if(!s.ok&&i)return console.warn(`Returning a stale cached response for ${r}`),i;if(o&&s.ok){const e=s.clone(),r=new Headers(s.headers),i=new Date(Date.now()+t);r.set("Expires",i.toString());const a=new Response(await e.blob(),{headers:r});await o.put(n,a).catch(console.error)}return s}function flatten(e,t){const n=Array.isArray(t)?t.slice().reduce(flatten,[]):[t];return e.push(...n),e}function addId(e,t="",n="",r=!1){if(e.id)return e.id;n||(n=(e.title?e.title:e.textContent).trim());let o=r?n:n.toLowerCase();if(o=o.trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\W+/gim,"-").replace(/^-+/,"").replace(/-+$/,""),o?"example"===t?o=n:!/\.$/.test(o)&&/^[a-z]/i.test(o)||(o=`x${o}`):o="generatedID",t&&(o=`${t}-${o}`),e.ownerDocument.getElementById(o)){let t=0,n=`${o}-${t}`;for(;e.ownerDocument.getElementById(n);)t+=1,n=`${o}-${t}`;o=n}return e.id=o,o}function getTextNodes(e,t=[],n={wsNodes:!0}){const r=t.join(", "),o=document.createNodeIterator(e,NodeFilter.SHOW_TEXT,e=>n.wsNodes||e.data.trim()?r&&e.parentElement.closest(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT),i=[];let s;for(;s=o.nextNode();)i.push(s);return i}function getDfnTitles(e){const t=new Set,n="ltNodefault"in e.dataset?"":norm(e.textContent),r=e.children[0];if(e.dataset.lt?e.dataset.lt.split("|").map(e=>norm(e)).forEach(e=>t.add(e)):1===e.childNodes.length&&1===e.getElementsByTagName("abbr").length&&r.title?t.add(r.title):'""'===e.textContent&&t.add("the-empty-string"),t.add(n),t.delete(""),e.dataset.localLt){e.dataset.localLt.split("|").forEach(e=>t.add(norm(e)))}return[...t]}function getLinkTargets(e){const t=e.closest("[data-link-for]"),n=t?t.dataset.linkFor:"";return getDfnTitles(e).reduce((e,t)=>{const r=t.split(".");return 2===r.length&&e.push({for:r[0],title:r[1]}),e.push({for:n,title:t}),""!==n&&e.push({for:"",title:t}),e},[])}function renameElement(e,t){if(e.localName===t)return e;const n=e.ownerDocument.createElement(t);for(const{name:t,value:r}of e.attributes)n.setAttribute(t,r);return n.append(...e.childNodes),e.replaceWith(n),n}function refTypeFromContext(e,t){const n=t.closest(nonNormativeSelector);let r=!1;if(n&&(r=!t.closest(".normative")||!n.querySelector(".normative")),e.startsWith("!")){if(r)return{type:"informative",illegal:!0};r=!1}else e.startsWith("?")&&(r=!0);return{type:r?"informative":"normative",illegal:!1}}function wrapInner(e,t){return t.append(...e.childNodes),e.appendChild(t),e}function parents(e,t){const n=[];let r=e.parentElement;for(;r;){const e=r.closest(t);if(!e)break;n.push(e),r=e.parentElement}return n}function children(e,t){try{return e.querySelectorAll(`:scope > ${t}`)}catch{let n="";e.id||(n=`temp-${String(Math.random()).substr(2)}`,e.id=n);const r=`#${e.id} > ${t}`,o=e.parentElement.querySelectorAll(r);return n&&(e.id=""),o}}function msgIdGenerator(e,t=0){const n=function*(e,t){for(;;)yield`${e}:${t}`,t++}(e,t);return()=>n.next().value}class InsensitiveStringSet extends Set{constructor(e=[]){super();for(const t of e)this.add(t)}add(e){return this.has(e)||this.getCanonicalKey(e)?this:super.add(e)}has(e){return super.has(e)||[...this.keys()].some(t=>t.toLowerCase()===e.toLowerCase())}delete(e){return super.has(e)?super.delete(e):super.delete(this.getCanonicalKey(e))}getCanonicalKey(e){return super.has(e)?e:[...this.keys()].find(t=>t.toLowerCase()===e.toLowerCase())}}function makeSafeCopy(e){const t=e.cloneNode(!0);return t.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id")),t.querySelectorAll("dfn").forEach(e=>renameElement(e,"span")),t.hasAttribute("id")&&t.removeAttribute("id"),removeCommentNodes(t),t}function removeCommentNodes(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT);for(const e of[...walkTree(t)])e.remove()}function*walkTree(e){for(;e.nextNode();)yield e.currentNode}const name$2="core/base-runner",canMeasure=performance.mark&&performance.measure;function toRunnable(e){const t=e.name||"";return t||console.warn("Plugin lacks name:",e),n=>new Promise(async(r,o)=>{const i=setTimeout(()=>{const n=`Plugin ${t} took too long.`;console.error(n,e),o(new Error(n))},15e3);canMeasure&&performance.mark(`${t}-start`);try{e.run.length<=1?(await e.run(n),r()):(console.warn(`Plugin ${t} uses a deprecated callback signature. Return a Promise instead. Read more at: https://github.com/w3c/respec/wiki/Developers-Guide#plugins`),e.run(n,document,r))}catch(e){o(e)}finally{clearTimeout(i)}canMeasure&&(performance.mark(`${t}-end`),performance.measure(t,`${t}-start`,`${t}-end`))})}async function runAll(e){pub("start-all",respecConfig),canMeasure&&performance.mark(`${name$2}-start`),await done$1;const t=e.filter(e=>e&&e.run).map(toRunnable);for(const e of t)try{await e(respecConfig)}catch(e){console.error(e)}pub("plugins-done",respecConfig),await done,pub("end-all",respecConfig),removeReSpec(document),canMeasure&&(performance.mark(`${name$2}-end`),performance.measure(name$2,`${name$2}-start`,`${name$2}-end`))}var baseRunner=Object.freeze({__proto__:null,name:name$2,runAll:runAll});async function fetchBase(e){const t=await fetch(new URL(`../../${e}`,"undefined"==typeof document?new(require("url").URL)("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("respec-geonovum.js",document.baseURI).href));return await t.text()}async function fetchAsset(e){return fetchBase(`assets/${e}`)}const name$3="core/markdown",gtEntity=/&gt;/gm,ampEntity=/&amp;/gm,endsWithSpace=/\s+$/gm,inlineElems=new Set(["a","abbr","acronym","b","bdo","big","br","button","cite","code","dfn","em","i","img","input","kbd","label","map","object","q","samp","script","select","small","span","strong","sub","sup","textarea","time","tt","var"]);class Renderer extends marked$1.Renderer{code(e,t,n){return/(^webidl$)/i.test(t)?`<pre class="idl">${e}</pre>`:super.code(e,t,n)}heading(e,t,n,r){const o=/(.+)\s+{#([\w-]+)}$/;if(o.test(e)){const[,n,r]=e.match(o);return`<h${t} id="${r}">${n}</h${t}>`}return super.heading(e,t,n,r)}}function normalizePadding(e){if(!e)return"";if("string"!=typeof e)throw TypeError("Invalid input");if("\n"===e)return"\n";function t(e){return null!==e&&e.nodeType===Node.TEXT_NODE}const n=document.createRange().createContextualFragment(e);var r;Array.from(n.children).filter(e=>!inlineElems.has(e.localName)).filter(e=>"pre"!==e.localName).filter(e=>"table"!==e.localName).forEach(e=>{e.innerHTML=normalizePadding(e.innerHTML)}),Array.from(n.childNodes).filter(e=>t(e)&&""===e.textContent.trim()).forEach(e=>e.replaceWith("\n")),null!==(r=n.firstChild)&&r.nodeType===Node.ELEMENT_NODE&&Array.from(n.firstChild.children).filter(e=>"table"!==e.localName).forEach(e=>{e.innerHTML=normalizePadding(e.innerHTML)}),n.normalize();const o=n.textContent.replace(/^ *\n/,"").split("\n").filter(e=>e&&e.startsWith(" "))[0],i=o?o.match(/ +/)[0].length:0;if(i){Array.from(n.childNodes).filter(e=>"PRE"!==e.nodeName).filter(t).filter(e=>{const t=e.previousElementSibling,n=t&&t.localName;return!inlineElems.has(n)||e.textContent.trim().includes("\n")}).reduce((e,t)=>{let n="";const r=t.previousElementSibling,o=r&&r.localName;return/^[\t ]/.test(t.textContent)&&inlineElems.has(o)&&(n=t.textContent.match(/^\s+/)[0]),t.textContent=n+t.textContent.replace(e,""),e},new RegExp(`^ {1,${i}}`,"gm"));const e=new RegExp(`\\ {${i}}$`,"gm");Array.from(n.querySelectorAll("pre")).map(e=>e.previousSibling).filter(t).reduce((t,n)=>(e.test(n.textContent)&&(n.textContent=n.textContent.substr(0,n.textContent.length-t)),t),i)}const s=document.createElement("body");return s.append(n),endsWithSpace.test(s.innerHTML)?`${s.innerHTML.trimRight()}\n`:s.innerHTML}function markdownToHtml(e){const t=normalizePadding(e).replace(gtEntity,">").replace(ampEntity,"&");return marked$1(t,{sanitize:!1,gfm:!0,headerIds:!1,langPrefix:"",renderer:new Renderer})}function convertElements(e){return t=>{const n=t.querySelectorAll(e);return n.forEach(convertElement),Array.from(n)}}function convertElement(e){e.innerHTML=markdownToHtml(e.innerHTML)}function enableBlockLevelMarkdown(e,t){const n=e.querySelectorAll(t);for(const e of n)e.innerHTML.match(/^\n\s*\n/)||e.prepend("\n\n")}class Builder{constructor(e){this.doc=e,this.root=e.createDocumentFragment(),this.stack=[this.root],this.current=this.root}findPosition(e){return parseInt(e.tagName.charAt(1),10)}findParent(e){let t;for(;e>0;)if(e--,t=this.stack[e],t)return t}findHeader({firstChild:e}){for(;e;){if(/H[1-6]/.test(e.tagName))return e;e=e.nextSibling}return null}addHeader(e){const t=this.doc.createElement("section"),n=this.findPosition(e);t.appendChild(e),this.findParent(n).appendChild(t),this.stack[n]=t,this.stack.length=n+1,this.current=t}addSection(e,t){const n=this.findHeader(e),r=n?this.findPosition(n):1,o=this.findParent(r);n&&e.removeChild(n),e.appendChild(t(e)),n&&e.prepend(n),o.appendChild(e),this.current=o}addElement(e){this.current.appendChild(e)}}function structure(e,t){return function e(n){const r=new Builder(t);for(;n.firstChild;){const t=n.firstChild;if(t.nodeType===Node.ELEMENT_NODE)switch(t.localName){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":r.addHeader(t);break;case"section":r.addSection(t,e);break;default:r.addElement(t)}else n.removeChild(t)}return r.root}(e)}function substituteWithTextNodes(e){Array.from(e).forEach(e=>{e.replaceWith(e.textContent)})}const processMDSections=convertElements("[data-format='markdown']:not(body)"),blockLevelElements="[data-format=markdown], section, div, address, article, aside, figure, header, main";function run$1(e){const t=!!document.querySelector("[data-format=markdown]:not(body)"),n="markdown"===e.format;if(!n&&!t)return;if(!n)return void processMDSections(document.body).map(e=>{return{structuredInternals:structure(e,e.ownerDocument),elem:e}}).forEach(({elem:e,structuredInternals:t})=>{if(e.setAttribute("aria-busy","true"),"section"===t.firstElementChild.localName&&"section"===e.localName){const n=t.firstElementChild;n.remove(),e.append(...n.childNodes)}else e.textContent="";e.appendChild(t),e.setAttribute("aria-busy","false")});const r=document.getElementById("respec-ui");r.remove();const o=document.body.cloneNode(!0);enableBlockLevelMarkdown(o,blockLevelElements),convertElement(o),substituteWithTextNodes(o.querySelectorAll(".nolinks a[href]"));const i=structure(o,document);o.append(r,i),document.body.replaceWith(o)}var markdown=Object.freeze({__proto__:null,name:name$3,markdownToHtml:markdownToHtml,run:run$1}),shortcut={all_shortcuts:{},add:function(e,t,n){var r={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(n)for(var o in r)void 0===n[o]&&(n[o]=r[o]);else n=r;var i=n.target;"string"==typeof n.target&&(i=document.getElementById(n.target)),e=e.toLowerCase();var s=function(r){var o,i;if((r=r||window.event,n.disable_in_input)&&(r.target?i=r.target:r.srcElement&&(i=r.srcElement),3==i.nodeType&&(i=i.parentNode),"INPUT"==i.tagName||"TEXTAREA"==i.tagName))return;r.keyCode?o=r.keyCode:r.which&&(o=r.which);var s=String.fromCharCode(o).toLowerCase();188==o&&(s=","),190==o&&(s=".");var a=e.split("+"),l=0,c={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},u={esc:27,escape:27,tab:9,space:32,return:13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,break:19,insert:45,home:36,delete:46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},d={shift:{wanted:!1,pressed:!1},ctrl:{wanted:!1,pressed:!1},alt:{wanted:!1,pressed:!1},meta:{wanted:!1,pressed:!1}};r.ctrlKey&&(d.ctrl.pressed=!0),r.shiftKey&&(d.shift.pressed=!0),r.altKey&&(d.alt.pressed=!0),r.metaKey&&(d.meta.pressed=!0);for(var p,h=0;p=a[h],h<a.length;h++)"ctrl"==p||"control"==p?(l++,d.ctrl.wanted=!0):"shift"==p?(l++,d.shift.wanted=!0):"alt"==p?(l++,d.alt.wanted=!0):"meta"==p?(l++,d.meta.wanted=!0):p.length>1?u[p]==o&&l++:n.keycode?n.keycode==o&&l++:s==p?l++:c[s]&&r.shiftKey&&(s=c[s])==p&&l++;if(l==a.length&&d.ctrl.pressed==d.ctrl.wanted&&d.shift.pressed==d.shift.wanted&&d.alt.pressed==d.alt.wanted&&d.meta.pressed==d.meta.wanted&&(t(r),!n.propagate))return r.cancelBubble=!0,r.returnValue=!1,r.stopPropagation&&(r.stopPropagation(),r.preventDefault()),!1};this.all_shortcuts[e]={callback:s,target:i,event:n.type},i.addEventListener?i.addEventListener(n.type,s,!1):i.attachEvent?i.attachEvent("on"+n.type,s):i["on"+n.type]=s}};const name$4="core/ui";async function loadStyle(){try{return(await Promise.resolve().then((function(){return ui$3}))).default}catch{return fetchAsset("ui.css")}}async function insertStyle(){const e=document.createElement("style");return e.id="respec-ui-styles",e.textContent=await loadStyle(),e.classList.add("removeOnSave"),document.head.appendChild(e),e}function ariaDecorate(e,t){e&&Array.from(t).forEach(([t,n])=>{e.setAttribute(`aria-${t}`,n)})}insertStyle();const respecUI=hyperHTML$1`<div id='respec-ui' class='removeOnSave' hidden></div>`,menu=hyperHTML$1`<ul id=respec-menu role=menu aria-labelledby='respec-pill' hidden></ul>`;let modal,overlay;const errors=[],warnings=[],buttons={};sub("start-all",()=>document.body.prepend(respecUI),{once:!0}),sub("end-all",()=>document.body.prepend(respecUI),{once:!0});const respecPill=hyperHTML$1`<button id='respec-pill' disabled>ReSpec</button>`;respecUI.appendChild(respecPill),respecPill.addEventListener("click",e=>{e.stopPropagation(),menu.hidden?(menu.classList.remove("respec-hidden"),menu.classList.add("respec-visible")):(menu.classList.add("respec-hidden"),menu.classList.remove("respec-visible")),respecPill.setAttribute("aria-expanded",String(menu.hidden)),menu.hidden=!menu.hidden}),document.documentElement.addEventListener("click",()=>{menu.hidden||(menu.classList.remove("respec-visible"),menu.classList.add("respec-hidden"),menu.hidden=!0)}),respecUI.appendChild(menu);const ariaMap=new Map([["controls","respec-menu"],["expanded","false"],["haspopup","true"],["label","ReSpec Menu"]]);function errWarn(e,t,n,r){t.push(e),buttons.hasOwnProperty(n)||(buttons[n]=createWarnButton(n,t,r),respecUI.appendChild(buttons[n]));const o=buttons[n];o.textContent=t.length;const i=1===t.length?pluralize$1.singular(r):r;ariaDecorate(o,new Map([["label",`${t.length} ${i}`]]))}function createWarnButton(e,t,n){const r=hyperHTML$1`<button id='${`respec-pill-${e}`}' class='respec-info-button'>`;r.addEventListener("click",()=>{r.setAttribute("aria-expanded","true");const o=hyperHTML$1`<ol class='${`respec-${e}-list`}'></ol>`;for(const e of t){const t=document.createRange().createContextualFragment(markdownToHtml(e)),n=document.createElement("li");t.firstElementChild===t.lastElementChild?n.append(...t.firstElementChild.childNodes):n.appendChild(t),o.appendChild(n)}ui.freshModal(n,o,r)});const o=new Map([["expanded","false"],["haspopup","true"],["controls",`respec-pill-${e}-modal`]]);return ariaDecorate(r,o),r}ariaDecorate(respecPill,ariaMap);const ui={show(){try{respecUI.hidden=!1}catch(e){console.error(e)}},hide(){respecUI.hidden=!0},enable(){respecPill.removeAttribute("disabled")},addCommand(e,t,n,r){r=r||"";const o=`respec-button-${e.toLowerCase().replace(/\s+/,"-")}`,i=hyperHTML$1`<button id="${o}" class="respec-option" title="${n}">
      <span class="respec-cmd-icon" aria-hidden="true">${r}</span> ${e}…
    </button>`,s=hyperHTML$1`<li role=menuitem>${i}</li>`;return s.addEventListener("click",t),menu.appendChild(s),n&&shortcut.add(n,t),i},error(e){errWarn(e,errors,"error","ReSpec Errors")},warning(e){errWarn(e,warnings,"warning","ReSpec Warnings")},closeModal(e){overlay&&(overlay.classList.remove("respec-show-overlay"),overlay.classList.add("respec-hide-overlay"),overlay.addEventListener("transitionend",()=>{overlay.remove(),overlay=null})),e&&e.setAttribute("aria-expanded","false"),modal&&(modal.remove(),modal=null)},freshModal(e,t,n){modal&&modal.remove(),overlay&&overlay.remove(),overlay=hyperHTML$1`<div id='respec-overlay' class='removeOnSave'></div>`;const r=`${n.id}-modal`,o=`${r}-heading`;modal=hyperHTML$1`<div id='${r}' class='respec-modal removeOnSave' role='dialog'>
      <h3 id="${o}">${e}</h3>
      <div class='inside'>${t}</div>
    </div>`;const i=new Map([["labelledby",o]]);ariaDecorate(modal,i),document.body.append(overlay,modal),overlay.addEventListener("click",()=>this.closeModal(n)),overlay.classList.toggle("respec-show-overlay"),modal.hidden=!1}};shortcut.add("Esc",()=>ui.closeModal()),shortcut.add("Ctrl+Alt+Shift+E",()=>{buttons.error&&buttons.error.click()}),shortcut.add("Ctrl+Alt+Shift+W",()=>{buttons.warning&&buttons.warning.click()}),window.respecUI=ui,sub("error",e=>ui.error(e)),sub("warn",e=>ui.warning(e));var ui$1=Object.freeze({__proto__:null,name:name$4,ui:ui});const name$5="core/reindent";function reindent(e){if(!e)return e;const t=e.trimRight().split("\n");for(;t.length&&!t[0].trim();)t.shift();const n=t.filter(e=>e.trim()).map(e=>e.search(/[^\s]/)),r=Math.min(...n);return t.map(e=>e.slice(r)).join("\n")}function run$2(){for(const e of document.getElementsByTagName("pre"))e.innerHTML=reindent(e.innerHTML)}var reindent$1=Object.freeze({__proto__:null,name:name$5,run:run$2});const name$6="core/location-hash";function run$3(){pub("start","core/location-hash"),location.hash&&document.respecIsReady.then(()=>{let e=decodeURIComponent(location.hash).substr(1);const t=document.getElementById(e),n=/\W/.test(e);if(!t&&n){const t=e.replace(/[\W]+/gim,"-").replace(/^-+/,"").replace(/-+$/,"");document.getElementById(t)&&(e=t)}location.hash=`#${e}`})}var locationHash=Object.freeze({__proto__:null,name:name$6,run:run$3});const privs=new WeakMap;function canLint(e,t){return!(!1===e.hasOwnProperty("lint")||!1===e.lint||!e.lint[t])}class LinterRule{constructor(e,t){privs.set(this,{name:e,lintingFunction:t})}get name(){return privs.get(this).name}lint(e={lint:{[this.name]:!1}},t=document){if(canLint(e,this.name))return privs.get(this).lintingFunction(e,t)}}const name$7="check-charset",meta={en:{description:"Document must only contain one `<meta>` tag with charset set to 'utf-8'",howToFix:'Add this line in your document `<head>` section - `<meta charset="utf-8">` or set charset to "utf-8" if not set already.'}},lang$1=lang in meta?lang:"en";function linterFunction(e,t){const n=t.querySelectorAll("meta[charset]"),r=[];for(const e of n)r.push(e.getAttribute("charset").trim().toLowerCase());return r.includes("utf-8")&&1===n.length?[]:{name:name$7,occurrences:n.length,...meta[lang$1]}}const rule=new LinterRule(name$7,linterFunction),name$8="check-internal-slots",meta$1={en:{description:"Internal slots should be preceded by a '.'",howToFix:"Add a '.' between the elements mentioned.",help:"See developer console."}},lang$2=lang in meta$1?lang:"en";function linterFunction$1(e,t){const n=[...t.querySelectorAll("var+a")].filter(({previousSibling:{nodeName:e}})=>{return e&&"VAR"===e});if(n.length)return{name:name$8,offendingElements:n,occurrences:n.length,...meta$1[lang$2]}}const rule$1=new LinterRule(name$8,linterFunction$1),name$9="check-punctuation",punctuationMarks=[".",":","!","?"],humanMarks=punctuationMarks.map(e=>`"${e}"`).join(", "),meta$2={en:{description:"`p` elements should end with a punctuation mark.",howToFix:`Please make sure \`p\` elements end with one of: ${humanMarks}.`}},lang$3=lang in meta$2?lang:"en";function lintingFunction(e,t){const n=new RegExp(`[${punctuationMarks.join("")}\\]]$|^ *$`,"m"),r=[...t.querySelectorAll("p:not(#back-to-top)")].filter(e=>!n.test(e.textContent.trim()));if(r.length)return{name:name$9,offendingElements:r,occurrences:r.length,...meta$2[lang$3]}}const rule$2=new LinterRule(name$9,lintingFunction),name$a="core/linter",privates=new WeakMap;class Linter{constructor(){privates.set(this,{rules:new Set})}get rules(){return privates.get(this).rules}register(...e){e.forEach(e=>this.rules.add(e))}async lint(e,t=window.document){const n=[...privates.get(this).rules].map(n=>toLinterWarning(n.lint(e,t)));await n}}const linter=new Linter,baseResult={name:"unknown",description:"",occurrences:0,howToFix:"",offendingElements:[],help:""};async function toLinterWarning(e){const t=await e;if(!t)return;const n={...baseResult,...t},{description:r,help:o,howToFix:i,name:s,occurrences:a,offendingElements:l}=n,c=`Linter (${s}): ${r} ${i} ${o}`;l.length?showInlineWarning(l,`${c} Occured`):pub("warn",`${c} (Count: ${a})`)}function run$4(e){!1!==e.lint&&(async()=>{await document.respecIsReady;try{await linter.lint(e,document)}catch(e){console.error("Error ocurred while running the linter",e)}})()}var linter$1=Object.freeze({__proto__:null,name:name$a,default:linter,run:run$4});const name$b="local-refs-exist",meta$3={en:{description:"Broken local reference found in document.",howToFix:"Please fix the links mentioned.",help:"See developer console."}},lang$4=lang in meta$3?lang:"en";function linterFunction$2(e,t){const n=[...t.querySelectorAll("a[href^='#']")].filter(isBrokenHyperlink);if(n.length)return{name:name$b,offendingElements:n,occurrences:n.length,...meta$3[lang$4]}}const rule$3=new LinterRule(name$b,linterFunction$2);function isBrokenHyperlink(e){const t=e.getAttribute("href").substring(1);return!e.ownerDocument.getElementById(t)}const name$c="no-headingless-sections",meta$4={en:{description:"All sections must start with a `h2-6` element.",howToFix:"Add a `h2-6` to the offending section or use a `<div>`.",help:"See developer console."},nl:{description:"Alle secties moeten beginnen met een `h2-6` element.",howToFix:"Voeg een `h2-6` toe aan de conflicterende sectie of gebruik een `<div>`.",help:"Zie de developer console."}},lang$5=lang in meta$4?lang:"en",hasNoHeading=({firstElementChild:e})=>null===e||!1===/^h[1-6]$/.test(e.localName);function linterFunction$3(e,t){const n=[...t.querySelectorAll("section")].filter(hasNoHeading);if(n.length)return{name:name$c,offendingElements:n,occurrences:n.length,...meta$4[lang$5]}}const rule$4=new LinterRule(name$c,linterFunction$3),name$d="no-http-props",meta$5={en:{description:"Insecure URLs are not allowed in `respecConfig`.",howToFix:"Please change the following properties to 'https://': "}},lang$6=lang in meta$5?lang:"en";function lintingFunction$1(e,t){if(!t.location.href.startsWith("http"))return;const n=Object.getOwnPropertyNames(e).filter(e=>e.endsWith("URI")||"prevED"===e).filter(n=>new URL(e[n],t.location.href).href.startsWith("http://"));if(!n.length)return;const r={name:name$d,occurrences:n.length,...meta$5[lang$6]};return r.howToFix+=`${n.map(e=>`\`${e}\``).join(", ")}.`,r}const rule$5=new LinterRule(name$d,lintingFunction$1),name$e="privsec-section",meta$6={en:{description:"Document must a 'Privacy and/or Security' Considerations section.",howToFix:"Add a privacy and/or security considerations section.",help:"See the [Self-Review Questionnaire](https://w3ctag.github.io/security-questionnaire/)."}},lang$7=lang in meta$6?lang:"en";function hasPriSecConsiderations(e){return Array.from(e.querySelectorAll("h2, h3, h4, h5, h6")).some(({textContent:e})=>{const t=/(privacy|security)/im.test(e),n=/(considerations)/im.test(e);return t&&n||t})}function lintingFunction$2(e,t){if(e.isRecTrack&&!hasPriSecConsiderations(t))return{name:name$e,occurrences:1,...meta$6[lang$7]}}const rule$6=new LinterRule(name$e,lintingFunction$2);linter.register(rule$5,rule$4,rule$2,rule$3,rule$1,rule,rule$6);const coreDefaults={lint:{"no-headingless-sections":!0,"no-http-props":!0,"check-punctuation":!1,"local-refs-exist":!0,"check-internal-slots":!1,"check-charset":!1,"privsec-section":!1},pluralize:!1,specStatus:"base",highlightVars:!0,addSectionLinks:!0},name$f="geonovum/defaults";linter.register(rule$6);const licenses=new Map([["cc0",{name:"Creative Commons 0 Public Domain Dedication",short:"CC0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}],["cc-by",{name:"Creative Commons Attribution 4.0 International Public License",short:"CC-BY",url:"https://creativecommons.org/licenses/by/4.0/legalcode"}],["cc-by-nd",{name:"Creative Commons Attribution-NoDerivatives 4.0 International Public License",short:"CC-BY-ND",url:"https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl"}]]),geonovumDefaults={lint:{"privsec-section":!0},doJsonLd:!0,license:"cc-by",specStatus:"GN-BASIS",logos:[{src:"https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg",alt:"Geonovum",id:"Geonovum",height:67,width:132,url:"https://www.geonovum.nl/"}]};function computeProps(e){return{isCCBY:"cc-by"===e.license,licenseInfo:licenses.get(e.license),isBasic:"GN-BASIS"===e.specStatus,isRegular:"GN-BASIS"===e.specStatus}}function run$5(e){const t=!1!==e.lint&&{...coreDefaults.lint,...geonovumDefaults.lint,...e.lint};Object.assign(e,{...coreDefaults,...geonovumDefaults,...e,lint:t}),Object.assign(e,computeProps(e))}var defaults$6=Object.freeze({__proto__:null,name:name$f,run:run$5});const name$g="core/style",styleElement=insertStyle$1();async function loadStyle$1(){try{return(await Promise.resolve().then((function(){return respec$1}))).default}catch{return fetchAsset("respec.css")}}async function insertStyle$1(){const e=document.createElement("style");return e.id="respec-mainstyle",e.textContent=await loadStyle$1(),document.head.appendChild(e),e}async function run$6(e){e.noReSpecCSS&&(await styleElement).remove()}var style=Object.freeze({__proto__:null,name:name$g,run:run$6});const name$h="geonovum/style";function attachFixupScript(e,t){const n=e.createElement("script");n.addEventListener("load",()=>{window.location.hash&&(window.location.href=window.location.hash)},{once:!0}),n.src=`https://www.w3.org/scripts/TR/${t}/fixup.js`,e.body.appendChild(n)}function createMetaViewport(){const e=document.createElement("meta");e.name="viewport";return e.content=toKeyValuePairs({width:"device-width","initial-scale":"1","shrink-to-fit":"no"}).replace(/"/g,""),e}function createStyle(e){const t=document.createElement("link");return t.rel="stylesheet",t.href=`https://tools.geostandaarden.nl/respec/style/${e}.css`,t}function createResourceHints(){return[{hint:"preconnect",href:"https://www.w3.org"},{hint:"preload",href:"https://www.w3.org/scripts/TR/2016/fixup.js",as:"script"},{hint:"preconnect",href:"https://tools.geostandaarden.nl/"},{hint:"preload",href:"https://tools.geostandaarden.nl/respec/style/base.css",as:"style"},{hint:"preload",href:"https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg",as:"image"}].map(createResourceHint).reduce((e,t)=>(e.appendChild(t),e),document.createDocumentFragment())}const elements=createResourceHints(),favicon=document.createElement("link");function run$7(e){if(!e.specStatus){const t="`respecConfig.specStatus` missing. Defaulting to 'GN-BASIS'.";e.specStatus="GN-BASIS",pub("warn",t)}document.body.querySelector("figure.scalable")&&(document.head.appendChild(createStyle("leaflet")),document.head.appendChild(createStyle("font-awesome")));let t="";switch(e.specStatus.toUpperCase()){case"GN-WV":t+="GN-WV.css";break;case"GN-CV":t+="GN-CV.css";break;case"GN-VV":t+="GN-VV.css";break;case"GN-DEF":t+="GN-DEF.css";break;case"GN-BASIS":t+="GN-BASIS.css";break;default:t="base.css"}e.noToc||sub("end-all",()=>{attachFixupScript(document,"2016")},{once:!0}),linkCSS(document,`https://tools.geostandaarden.nl/respec/style/${t}`)}favicon.rel="shortcut icon",favicon.type="image/x-icon",favicon.href="https://tools.geostandaarden.nl/respec/style/logos/Geonovum.ico",document.head.prepend(favicon),document.head.querySelector("meta[name=viewport]")||elements.prepend(createMetaViewport()),document.head.prepend(elements);var style$1=Object.freeze({__proto__:null,name:name$h,run:run$7});const name$i="geonovum/l10n",additions={en:{status_at_publication:"This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current Geonovum publications and the latest revision of this document can be found via <a href='https://www.geonovum.nl/geo-standaarden/alle-standaarden'>https://www.geonovum.nl/geo-standaarden/alle-standaarden</a>(in Dutch)."},nl:{status_at_publication:"Deze paragraaf beschrijft de status van dit document ten tijde van publicatie. Het is mogelijk dat er actuelere versies van dit document bestaan. Een lijst van Geonovum publicaties en de laatste gepubliceerde versie van dit document zijn te vinden op <a href='https://www.geonovum.nl/geo-standaarden/alle-standaarden'>https://www.geonovum.nl/geo-standaarden/alle-standaarden</a>."}};Object.keys(additions).forEach(e=>{Object.assign(l10n[e],additions[e])});var l10n$2=Object.freeze({__proto__:null,name:name$i});const name$j="core/github";let resolveGithubPromise,rejectGithubPromise;const github=new Promise((e,t)=>{resolveGithubPromise=e,rejectGithubPromise=e=>{pub("error",e),t(new Error(e))}}),localizationStrings={en:{file_a_bug:"File a bug",participate:"Participate",commit_history:"Commit history"},nl:{commit_history:"Revisiehistorie",file_a_bug:"Dien een melding in",participate:"Doe mee"},es:{commit_history:"Historia de cambios",file_a_bug:"Nota un bug",participate:"Participe"}},l10n$3=getIntlData(localizationStrings);async function run$8(e){if(!e.hasOwnProperty("github")||!e.github)return void resolveGithubPromise(null);if("object"==typeof e.github&&!e.github.hasOwnProperty("repoURL")){return void rejectGithubPromise("Config option `[github](https://github.com/w3c/respec/wiki/github)` is missing property `repoURL`.")}let t,n=e.github.repoURL||e.github;n.endsWith("/")||(n+="/");try{t=new URL(n,"https://github.com")}catch{return void rejectGithubPromise(`\`respecConf.github\` is not a valid URL? (${t})`)}if("https://github.com"!==t.origin){return void rejectGithubPromise(`\`respecConf.github\` must be HTTPS and pointing to GitHub. (${t})`)}const[r,o]=t.pathname.split("/").filter(e=>e);if(!r||!o){return void rejectGithubPromise("`respecConf.github` URL needs a path with, for example, w3c/my-spec")}const i=e.github.branch||"gh-pages",s=new URL("./issues/",t).href,a={edDraftURI:`https://${r.toLowerCase()}.github.io/${o}/`,githubToken:void 0,githubUser:void 0,issueBase:s,atRiskBase:s,otherLinks:[],pullBase:new URL("./pulls/",t).href,shortName:o},l={key:l10n$3.participate,data:[{value:`GitHub ${r}/${o}`,href:t},{value:l10n$3.file_a_bug,href:a.issueBase},{value:l10n$3.commit_history,href:new URL(`./commits/${i}`,t.href).href},{value:"Pull requests",href:a.pullBase}]};let c="https://respec.org/github";if(e.githubAPI)if(new URL(e.githubAPI).hostname===window.parent.location.hostname)c=e.githubAPI;else{pub("warn","`respecConfig.githubAPI` should not be added manually.")}const u={branch:i,repoURL:t.href,apiBase:c,fullName:`${r}/${o}`};resolveGithubPromise(u);const d={...a,...e,github:u,githubAPI:c};Object.assign(e,d),e.otherLinks.unshift(l)}var github$1=Object.freeze({__proto__:null,name:name$j,github:github,run:run$8});const name$k="core/data-include";function processResponse(e,t,n){const r=document.querySelector(`[data-include-id=${t}]`),o=r.ownerDocument,i=runTransforms(e,r.dataset.oninclude,n),s="string"==typeof r.dataset.includeReplace;let a;switch(r.dataset.includeFormat){case"text":s?(a=o.createTextNode(i),r.replaceWith(a)):r.textContent=i;break;default:if(r.innerHTML=i,s){for(a=o.createDocumentFragment();r.hasChildNodes();)a.append(r.removeChild(r.firstChild));r.replaceWith(a)}}o.contains(r)&&cleanUp(r)}function cleanUp(e){["data-include","data-include-format","data-include-replace","data-include-id","oninclude"].forEach(t=>e.removeAttribute(t))}async function run$9(){const e=document.querySelectorAll("[data-include]"),t=Array.from(e).map(async e=>{const t=e.dataset.include;if(!t)return;const n=`include-${String(Math.random()).substr(2)}`;e.dataset.includeId=n;try{const e=await fetch(t);processResponse(await e.text(),n,t)}catch(n){const r=`\`data-include\` failed: \`${t}\` (${n.message}). See console for details.`;console.error("data-include failed for element: ",e,n),pub("error",r)}});await Promise.all(t)}var dataInclude=Object.freeze({__proto__:null,name:name$k,run:run$9});const name$l="core/data-transform";function run$a(){document.querySelectorAll("[data-transform]").forEach(e=>{e.innerHTML=runTransforms(e.innerHTML,e.dataset.transform),e.removeAttribute("data-transform")})}var dataTransform=Object.freeze({__proto__:null,name:name$l,run:run$a});const idlPrimitiveRegex=/^[a-z]+(\s+[a-z]+)+$/,exceptionRegex=/\B"([^"]*)"\B/,methodRegex=/(\w+)\((.*)\)$/,slotRegex=/^\[\[(\w+)\]\]$/,attributeRegex=/^((?:\[\[)?(?:\w+)(?:\]\])?)$/,enumRegex=/^(\w+)\["([\w- ]*)"\]$/,methodSplitRegex=/\.?(\w+\(.*\)$)/;function parseInlineIDL(e){const[t,n]=e.split(methodSplitRegex),r=t.split(/[./]/).concat(n).filter(e=>e&&e.trim()).map(e=>e.trim()),o=!e.includes("/"),i=[];for(;r.length;){const t=r.pop();if(methodRegex.test(t)){const[,e,n]=t.match(methodRegex),r=n.split(/,\s*/).filter(e=>e);i.push({type:"method",identifier:e,args:r,renderParent:o})}else if(enumRegex.test(t)){const[,e,n]=t.match(enumRegex);i.push({type:"enum",identifier:e,enumValue:n,renderParent:o})}else if(exceptionRegex.test(t)){const[,e]=t.match(exceptionRegex);o?i.push({type:"exception",identifier:e}):i.push({type:"enum",enumValue:e,renderParent:o})}else if(slotRegex.test(t)){const[,e]=t.match(slotRegex);i.push({type:"internal-slot",identifier:e,renderParent:o})}else if(attributeRegex.test(t)&&r.length){const[,e]=t.match(attributeRegex);i.push({type:"attribute",identifier:e,renderParent:o})}else if(idlPrimitiveRegex.test(t))i.push({type:"idl-primitive",identifier:t,renderParent:o});else{if(!attributeRegex.test(t)||0!==r.length)throw new SyntaxError(`IDL micro-syntax parsing error in \`{{ ${e} }}\``);i.push({type:"base",identifier:t,renderParent:o})}}return i.forEach((e,t,n)=>{e.parent=n[t+1]||null}),i.reverse()}function renderBase(e){const{identifier:t,renderParent:n}=e;if(n)return hyperHTML$1`<a data-xref-type="_IDL_"><code>${t}</code></a>`}function renderInternalSlot(e){const{identifier:t,parent:n,renderParent:r}=e,{identifier:o}=n||{};return hyperHTML$1`${n&&r?".":""}<a
    data-xref-type="attribute"
    data-link-for=${o}
    data-xref-for=${o}
    data-lt="${`[[${t}]]`}"><code>[[${t}]]</code></a>`}function renderAttribute(e){const{parent:t,identifier:n,renderParent:r}=e,{identifier:o}=t||{};return hyperHTML$1`${r?".":""}<a
      data-xref-type="attribute|dict-member"
      data-link-for="${o}"
      data-xref-for="${o}"
    ><code>${n}</code></a>`}function renderMethod(e){const{args:t,identifier:n,type:r,parent:o,renderParent:i}=e,{identifier:s}=o||{},a=t.map(e=>`<var>${e}</var>`).join(", "),l=`${n}(${t.join(", ")})`;return hyperHTML$1`${o&&i?".":""}<a
=======
window.respecVersion = "24.35.0";
'use strict';

// In case everything else fails, we want the error
window.addEventListener("error", ev => {
  console.error(ev.error, ev.message, ev);
});

const modules = [
  // order is significant
  Promise.resolve().then(function () { return baseRunner; }),
  Promise.resolve().then(function () { return ui$1; }),
  Promise.resolve().then(function () { return reindent$1; }),
  Promise.resolve().then(function () { return locationHash; }),
  Promise.resolve().then(function () { return l10n$1; }),
  Promise.resolve().then(function () { return defaults; }),
  Promise.resolve().then(function () { return style; }),
  Promise.resolve().then(function () { return style$1; }),
  Promise.resolve().then(function () { return l10n$2; }),
  Promise.resolve().then(function () { return github; }),
  Promise.resolve().then(function () { return dataInclude; }),
  Promise.resolve().then(function () { return markdown; }),
  Promise.resolve().then(function () { return dataTransform; }),
  Promise.resolve().then(function () { return inlines; }),
  Promise.resolve().then(function () { return dfn; }),
  Promise.resolve().then(function () { return pluralize$2; }),
  Promise.resolve().then(function () { return examples; }),
  Promise.resolve().then(function () { return issuesNotes; }),
  Promise.resolve().then(function () { return requirements; }),
  Promise.resolve().then(function () { return bestPractices; }),
  Promise.resolve().then(function () { return figures; }),
  Promise.resolve().then(function () { return dataCite; }),
  Promise.resolve().then(function () { return biblio$1; }),
  Promise.resolve().then(function () { return linkToDfn; }),
  Promise.resolve().then(function () { return renderBiblio; }),
  Promise.resolve().then(function () { return contrib; }),
  Promise.resolve().then(function () { return fixHeaders; }),
  Promise.resolve().then(function () { return structure$1; }),
  Promise.resolve().then(function () { return informative; }),
  Promise.resolve().then(function () { return idHeaders; }),
  Promise.resolve().then(function () { return conformance; }),
  Promise.resolve().then(function () { return saveHtml; }),
  Promise.resolve().then(function () { return searchSpecref; }),
  Promise.resolve().then(function () { return dfnList; }),
  Promise.resolve().then(function () { return aboutRespec; }),
  Promise.resolve().then(function () { return seo; }),
  Promise.resolve().then(function () { return highlight; }),
  Promise.resolve().then(function () { return dataTests; }),
  Promise.resolve().then(function () { return listSorter; }),
  Promise.resolve().then(function () { return highlightVars$1; }),
  Promise.resolve().then(function () { return algorithms; }),
  Promise.resolve().then(function () { return anchorExpander; }),
  /* Linter must be the last thing to run */
  Promise.resolve().then(function () { return linter$1; }),
];

async function domReady() {
  if (document.readyState === "loading") {
    await new Promise(resolve =>
      document.addEventListener("DOMContentLoaded", resolve)
    );
  }
}

(async () => {
  const [runner, { ui }, ...plugins] = await Promise.all(modules);
  try {
    ui.show();
    await domReady();
    await runner.runAll(plugins);
  } finally {
    ui.enable();
  }
})().catch(err => {
  console.error(err);
});

// @ts-check
const inAmd = !!window.require;
if (!inAmd) {
  /**
   * @type {any}
   * @param {string[]} deps
   * @param {(...modules: any[]) => void} callback
   */
  const require = function(deps, callback) {
    const modules = deps.map(dep => {
      if (!(dep in window.require.modules)) {
        throw new Error(`Unsupported dependency name: ${dep}`);
      }
      return window.require.modules[dep];
    });
    Promise.all(modules).then(results => callback(...results));
  };
  require.modules = {};
  window.require = require;
}

/**
 * @param {string} name
 * @param {object | Promise<object>} object
 */
function expose(name, object) {
  if (!inAmd) {
    window.require.modules[name] = object;
  }
}

// @ts-check

/**
 * Module core/pubsubhub
 *
 * Returns a singleton that can be used for message broadcasting
 * and message receiving. Replaces legacy "msg" code in ReSpec.
 */
const name = "core/pubsubhub";

const subscriptions = new Map();

function pub(topic, ...data) {
  if (!subscriptions.has(topic)) {
    return; // Nothing to do...
  }
  Array.from(subscriptions.get(topic)).forEach(cb => {
    try {
      cb(...data);
    } catch (err) {
      pub(
        "error",
        `Error when calling function ${cb.name}. See developer console.`
      );
      console.error(err);
    }
  });
  if (window.parent === window.self) {
    return;
  }
  // If this is an iframe, postMessage parent (used in testing).
  const args = data
    // to structured clonable
    .map(arg => String(JSON.stringify(arg.stack || arg)));
  window.parent.postMessage({ topic, args }, window.parent.location.origin);
}
/**
 * Subscribes to a message type.
 *
 * @param  {string} topic        The topic to subscribe to (e.g., "start-all")
 * @param  {Function} cb         Callback function
 * @param  {Object} [opts]
 * @param  {Boolean} [opts.once] Add prop "once" for single notification.
 * @return {Object}              An object that should be considered opaque,
 *                               used for unsubscribing from messages.
 */
function sub(topic, cb, opts = { once: false }) {
  if (opts.once) {
    return sub(topic, function wrapper(...args) {
      unsub({ topic, cb: wrapper });
      cb(...args);
    });
  }
  if (subscriptions.has(topic)) {
    subscriptions.get(topic).add(cb);
  } else {
    subscriptions.set(topic, new Set([cb]));
  }
  return { topic, cb };
}
/**
 * Unsubscribe from messages.
 *
 * @param {Object} opaque The object that was returned from calling sub()
 */
function unsub({ topic, cb }) {
  // opaque is whatever is returned by sub()
  const callbacks = subscriptions.get(topic);
  if (!callbacks || !callbacks.has(cb)) {
    console.warn("Already unsubscribed:", topic, cb);
    return false;
  }
  return callbacks.delete(cb);
}

sub("error", err => {
  console.error(err, err.stack);
});

sub("warn", str => {
  console.warn(str);
});

expose(name, { sub });

// @ts-check

const userConfig = {};
const amendConfig = newValues => Object.assign(userConfig, newValues);
const removeList = ["githubToken", "githubUser"];

sub("start-all", amendConfig);
sub("amend-user-config", amendConfig);
sub("end-all", () => {
  const script = document.createElement("script");
  script.id = "initialUserConfig";
  script.type = "application/json";
  for (const prop of removeList) {
    if (prop in userConfig) delete userConfig[prop];
  }
  script.innerHTML = JSON.stringify(userConfig, null, 2);
  document.head.appendChild(script);
});

// @ts-check

function overrideConfig(config) {
  // For legacy reasons, we still support both ";" and "&"
  const searchQuery = document.location.search.replace(/;/g, "&");
  const params = new URLSearchParams(searchQuery);
  const overrideProps = Array.from(params)
    .filter(([key, value]) => !!key && !!value)
    .map(([codedKey, codedValue]) => {
      const key = decodeURIComponent(codedKey);
      const decodedValue = decodeURIComponent(codedValue.replace(/%3D/g, "="));
      let value;
      try {
        value = JSON.parse(decodedValue);
      } catch {
        value = decodedValue;
      }
      return { key, value };
    })
    .reduce((collector, { key, value }) => {
      collector[key] = value;
      return collector;
    }, {});
  Object.assign(config, overrideProps);
  pub("amend-user-config", overrideProps);
}
sub("start-all", overrideConfig, { once: true });

// @ts-check

/** @type {Promise<void>} */
const respecDonePromise = new Promise(resolve => {
  sub("end-all", resolve, { once: true });
});

Object.defineProperty(document, "respecIsReady", {
  get() {
    return respecDonePromise;
  },
});

// @ts-check

let doneResolver;
const done = new Promise(resolve => {
  doneResolver = resolve;
});

sub(
  "plugins-done",
  async config => {
    const result = [];
    if (Array.isArray(config.postProcess)) {
      const promises = config.postProcess
        .filter(f => {
          const isFunction = typeof f === "function";
          if (!isFunction) {
            pub("error", "Every item in `postProcess` must be a JS function.");
          }
          return isFunction;
        })
        .map(async f => {
          try {
            return await f(config, document);
          } catch (err) {
            pub(
              "error",
              `Function ${f.name} threw an error during \`postProcess\`. See developer console.`
            );
            console.error(err);
          }
        });
      const values = await Promise.all(promises);
      result.push(...values);
    }
    if (typeof config.afterEnd === "function") {
      result.push(await config.afterEnd(config, document));
    }
    doneResolver(result);
  },
  { once: true }
);

// @ts-check

let doneResolver$1;
const done$1 = new Promise(resolve => {
  doneResolver$1 = resolve;
});

sub(
  "start-all",
  async config => {
    const result = [];
    if (Array.isArray(config.preProcess)) {
      const promises = config.preProcess
        .filter(f => {
          const isFunction = typeof f === "function";
          if (!isFunction) {
            pub("error", "Every item in `preProcess` must be a JS function.");
          }
          return isFunction;
        })
        .map(async f => {
          try {
            return await f(config, document);
          } catch (err) {
            pub(
              "error",
              `Function ${f.name} threw an error during \`preProcess\`. See developer console.`
            );
            console.error(err);
          }
        });
      const values = await Promise.all(promises);
      result.push(...values);
    }
    doneResolver$1(result);
  },
  { once: true }
);

// @ts-check
/**
 * Module core/l10n
 *
 * Looks at the lang attribute on the root element and uses it
 * to manage the config.l10n object so that other parts of the system can
 * localize their text.
 */
const name$1 = "core/l10n";

const html = document.documentElement;
if (html && !html.hasAttribute("lang")) {
  html.lang = "en";
  if (!html.hasAttribute("dir")) {
    html.dir = "ltr";
  }
}

// We use en-US as the base
const base = {
  about_respec: "About",
  abstract: "Abstract",
  author: "Author:",
  authors: "Authors:",
  bug_tracker: "Bug tracker:",
  close_parens: ")",
  definition_list: "Definitions",
  editor: "Editor:",
  editors_note: "Editor's note",
  editors: "Editors:",
  feature_at_risk: "(Feature at Risk) Issue",
  former_editor: "Former editor:",
  former_editors: "Former editors:",
  implementation_note: "Implementation Note",
  info_references: "Informative references",
  issue_summary: "Issue Summary",
  issue: "Issue",
  latest_editors_draft: "Latest editor's draft:",
  latest_published_version: "Latest published version:",
  list_of_definitions: "List of Definitions",
  norm_references: "Normative references",
  note: "Note",
  open_bugs: "open bugs",
  open_parens: "(",
  participate: "Participate",
  references: "References",
  save_as: "Save as",
  save_snapshot: "Export",
  search_specref: "Search Specref",
  sotd: "Status of This Document",
  this_version: "This version:",
  toc: "Table of Contents",
  warning: "Warning",
};

const ko = {
  abstract: "요약",
  author: "저자:",
  authors: "저자:",
  latest_published_version: "최신 버전:",
  sotd: "현재 문서의 상태",
  this_version: "현재 버전:",
};

const zh = {
  about_respec: "关于",
  abstract: "摘要",
  bug_tracker: "错误跟踪：",
  editor: "编辑：",
  editors: "编辑：",
  file_a_bug: "反馈错误",
  former_editor: "原编辑：",
  former_editors: "原编辑：",
  latest_editors_draft: "最新编辑草稿：",
  latest_published_version: "最新发布版本：",
  note: "注",
  open_bugs: "修正中的错误",
  participate: "参与：",
  sotd: "关于本文档",
  this_version: "本版本：",
  toc: "内容大纲",
};

const ja = {
  abstract: "要約",
  author: "著者：",
  authors: "著者：",
  bug_tracker: "バグの追跡履歴：",
  editor: "編者：",
  editors: "編者：",
  file_a_bug: "問題報告",
  former_editor: "以前の版の編者：",
  former_editors: "以前の版の編者：",
  latest_editors_draft: "最新の編集用草案：",
  latest_published_version: "最新バージョン：",
  note: "注",
  open_bugs: "改修されていないバグ",
  participate: "参加方法：",
  sotd: "この文書の位置付け",
  this_version: "このバージョン：",
  toc: "目次",
};

const nl = {
  about_respec: "Over",
  abstract: "Samenvatting",
  author: "Auteur:",
  authors: "Auteurs:",
  bug_tracker: "Meldingensysteem:",
  definition_list: "Lijst van Definities",
  editor: "Redacteur:",
  editors_note: "Redactionele noot",
  editors: "Redacteurs:",
  file_a_bug: "Dien een melding in",
  info_references: "Informatieve referenties",
  issue_summary: "Lijst met issues",
  latest_editors_draft: "Laatste werkversie:",
  latest_published_version: "Laatst gepubliceerde versie:",
  list_of_definitions: "Lijst van Definities",
  norm_references: "Normatieve referenties",
  note: "Noot",
  open_bugs: "open meldingen",
  participate: "Doe mee",
  references: "Referenties",
  save_as: "Bewaar als",
  save_snapshot: "Bewaar Snapshot",
  search_specref: "Doorzoek Specref",
  sotd: "Status van dit document",
  this_version: "Deze versie:",
  toc: "Inhoudsopgave",
  warning: "Waarschuwing",
};

const es = {
  abstract: "Resumen",
  author: "Autor:",
  authors: "Autores:",
  bug_tracker: "Repositorio de bugs:",
  close_parens: ")",
  editor: "Editor:",
  editors_note: "Nota de editor",
  editors: "Editores:",
  file_a_bug: "Nota un bug",
  info_references: "Referencias informativas",
  issue_summary: "Resumen de la cuestión",
  issue: "Cuestión",
  latest_editors_draft: "Borrador de editor mas reciente:",
  latest_published_version: "Versión publicada mas reciente:",
  norm_references: "Referencias normativas",
  note: "Nota",
  open_bugs: "Bugs abiertos",
  open_parens: "(",
  participate: "Participad",
  references: "Referencias",
  sotd: "Estado de este Document",
  this_version: "Ésta versión:",
  toc: "Tabla de Contenidos",
  warning: "Aviso",
};

const l10n = {
  en: { ...base },
  ko: { ...base, ...ko },
  zh: { ...base, ...zh },
  ja: { ...base, ...ja },
  nl: { ...base, ...nl },
  es: { ...base, ...es },
};

l10n["zh-hans"] = l10n.zh;
l10n["zh-cn"] = l10n.zh;

const lang = html && html.lang in l10n ? html.lang : "en";

function run(config) {
  config.l10n = l10n[lang] || l10n.en;
}

var l10n$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$1,
  l10n: l10n,
  lang: lang,
  run: run
});

// @ts-check

const resourceHints = new Set([
  "dns-prefetch",
  "preconnect",
  "preload",
  "prerender",
]);

const fetchDestinations = new Set([
  "document",
  "embed",
  "font",
  "image",
  "manifest",
  "media",
  "object",
  "report",
  "script",
  "serviceworker",
  "sharedworker",
  "style",
  "worker",
  "xslt",
  "",
]);

// CSS selector for matching elements that are non-normative
const nonNormativeSelector =
  ".informative, .note, .issue, .impnote, .example, .ednote, .practice, .introductory";
/**
 * Creates a link element that represents a resource hint.
 *
 * @param {Object} opts Configure the resource hint.
 * @param {String} opts.hint The type of hint (see resourceHints).
 * @param {String} opts.href The URL for the resource or origin.
 * @param {String} [opts.corsMode] Optional, the CORS mode to use (see HTML spec).
 * @param {String} [opts.as] Optional, fetch destination type (see fetchDestinations).
 * @param {boolean} [opts.dontRemove] If the hint should remain in the spec after processing.
 * @return {HTMLLinkElement} A link element ready to use.
 */
function createResourceHint(opts) {
  if (!opts || typeof opts !== "object") {
    throw new TypeError("Missing options");
  }
  if (!resourceHints.has(opts.hint)) {
    throw new TypeError("Invalid resources hint");
  }
  const url = new URL(opts.href, location.href);
  const linkElem = document.createElement("link");
  let { href } = url;
  linkElem.rel = opts.hint;
  switch (linkElem.rel) {
    case "dns-prefetch":
    case "preconnect":
      href = url.origin;
      if (opts.corsMode || url.origin !== document.location.origin) {
        linkElem.crossOrigin = opts.corsMode || "anonymous";
      }
      break;
    case "preload":
      if ("as" in opts && typeof opts.as === "string") {
        if (!fetchDestinations.has(opts.as)) {
          console.warn(`Unknown request destination: ${opts.as}`);
        }
        linkElem.setAttribute("as", opts.as);
      }
      break;
  }
  linkElem.href = href;
  if (!opts.dontRemove) {
    linkElem.classList.add("removeOnSave");
  }
  return linkElem;
}

// RESPEC STUFF
function removeReSpec(doc) {
  doc.querySelectorAll(".remove, script[data-requiremodule]").forEach(elem => {
    elem.remove();
  });
}

/**
 * Adds error class to each element while emitting a warning
 * @param {HTMLElement|HTMLElement[]} elems
 * @param {String} msg message to show in warning
 * @param {String=} title error message to add on each element
 */
function showInlineWarning(elems, msg, title) {
  if (!Array.isArray(elems)) elems = [elems];
  const links = elems
    .map((element, i) => {
      markAsOffending(element, msg, title);
      return generateMarkdownLink(element, i);
    })
    .join(", ");
  pub("warn", `${msg} at: ${links}.`);
  console.warn(msg, elems);
}

/**
 * Adds error class to each element while emitting a warning
 * @param {HTMLElement|HTMLElement[]} elems
 * @param {String} msg message to show in warning
 * @param {String} title error message to add on each element
 * @param {object} [options]
 * @param {string} [options.details]
 */
function showInlineError(elems, msg, title, { details } = {}) {
  if (!Array.isArray(elems)) elems = [elems];
  const links = elems
    .map((element, i) => {
      markAsOffending(element, msg, title);
      return generateMarkdownLink(element, i);
    })
    .join(", ");
  let message = `${msg} at: ${links}.`;
  if (details) {
    message += `\n\n<details>${details}</details>`;
  }
  pub("error", message);
  console.error(msg, elems);
}

/**
 * Adds error class to each element while emitting a warning
 * @param {HTMLElement} elem
 * @param {String} msg message to show in warning
 * @param {String=} title error message to add on each element
 */
function markAsOffending(elem, msg, title) {
  elem.classList.add("respec-offending-element");
  if (!elem.hasAttribute("title")) {
    elem.setAttribute("title", title || msg);
  }
  if (!elem.id) {
    addId(elem, "respec-offender");
  }
}

/**
 * @param {Element} element
 * @param {number} i
 */
function generateMarkdownLink(element, i) {
  return `[${i + 1}](#${element.id})`;
}

class IDBKeyVal {
  /**
   * @param {import("idb").IDBPDatabase} idb
   * @param {string} storeName
   */
  constructor(idb, storeName) {
    this.idb = idb;
    this.storeName = storeName;
  }

  /** @param {string} key */
  async get(key) {
    return await this.idb
      .transaction(this.storeName)
      .objectStore(this.storeName)
      .get(key);
  }

  /**
   * @param {string[]} keys
   */
  async getMany(keys) {
    const keySet = new Set(keys);
    /** @type {Map<string, any>} */
    const results = new Map();
    let cursor = await this.idb.transaction(this.storeName).store.openCursor();
    while (cursor) {
      if (keySet.has(cursor.key)) {
        results.set(cursor.key, cursor.value);
      }
      cursor = await cursor.continue();
    }
    return results;
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  async set(key, value) {
    const tx = this.idb.transaction(this.storeName, "readwrite");
    tx.objectStore(this.storeName).put(value, key);
    return await tx.done;
  }

  async addMany(entries) {
    const tx = this.idb.transaction(this.storeName, "readwrite");
    for (const [key, value] of entries) {
      tx.objectStore(this.storeName).put(value, key);
    }
    return await tx.done;
  }

  async clear() {
    const tx = this.idb.transaction(this.storeName, "readwrite");
    tx.objectStore(this.storeName).clear();
    return await tx.done;
  }

  async keys() {
    const tx = this.idb.transaction(this.storeName);
    /** @type {Promise<string[]>} */
    const keys = tx.objectStore(this.storeName).getAllKeys();
    await tx.done;
    return keys;
  }
}

// STRING HELPERS
// Takes an array and returns a string that separates each of its items with the proper commas and
// "and". The second argument is a mapping function that can convert the items before they are
// joined
function joinAnd(array = [], mapper = item => item, lang$1 = lang) {
  const items = array.map(mapper);
  if (Intl.ListFormat && typeof Intl.ListFormat === "function") {
    const formatter = new Intl.ListFormat(lang$1, {
      style: "long",
      type: "conjunction",
    });
    return formatter.format(items);
  }
  switch (items.length) {
    case 0:
    case 1: // "x"
      return items.toString();
    case 2: // x and y
      return items.join(" and ");
    default: {
      // x, y, and z
      const str = items.join(", ");
      const lastComma = str.lastIndexOf(",");
      return `${str.substr(0, lastComma + 1)} and ${str.slice(lastComma + 2)}`;
    }
  }
}

/**
 * Trims string at both ends and replaces all other white space with a single space
 * @param {string} str
 */
function norm(str) {
  return str.trim().replace(/\s+/g, " ");
}

// Given an object, it converts it to a key value pair separated by
// ("=", configurable) and a delimiter (" ," configurable).
// for example, {"foo": "bar", "baz": 1} becomes "foo=bar, baz=1"
function toKeyValuePairs(obj, delimiter = ", ", separator = "=") {
  return Array.from(Object.entries(obj))
    .map(([key, value]) => `${key}${separator}${JSON.stringify(value)}`)
    .join(delimiter);
}

// STYLE HELPERS
// take a document and either a link or an array of links to CSS and appends
// a <link/> element to the head pointing to each
function linkCSS(doc, styles) {
  const stylesArray = [].concat(styles);
  const frag = stylesArray
    .map(url => {
      const link = doc.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      return link;
    })
    .reduce((elem, nextLink) => {
      elem.appendChild(nextLink);
      return elem;
    }, doc.createDocumentFragment());
  doc.head.appendChild(frag);
}

// TRANSFORMATIONS
// Run list of transforms over content and return result.
// Please note that this is a legacy method that is only kept in order
// to maintain compatibility
// with RSv1. It is therefore not tested and not actively supported.
/**
 * @this {any}
 * @param {string} [flist]
 */
function runTransforms(content, flist) {
  let args = [this, content];
  const funcArgs = Array.from(arguments);
  funcArgs.shift();
  funcArgs.shift();
  args = args.concat(funcArgs);
  if (flist) {
    const methods = flist.split(/\s+/);
    for (let j = 0; j < methods.length; j++) {
      const meth = methods[j];
      /** @type {any} */
      const method = window[meth];
      if (method) {
        // the initial call passed |this| directly, so we keep it that way
        try {
          content = method.apply(this, args);
        } catch (e) {
          pub(
            "warn",
            `call to \`${meth}()\` failed with: ${e}. See error console for stack trace.`
          );
          console.error(e);
        }
      }
    }
  }
  return content;
}

/**
 * Cached request handler
 * @param {RequestInfo} input
 * @param {number} maxAge cache expiration duration in ms. defaults to 24 hours (86400000 ms)
 * @return {Promise<Response>}
 *  if a cached response is available and it's not stale, return it
 *  else: request from network, cache and return fresh response.
 *    If network fails, return a stale cached version if exists (else throw)
 */
async function fetchAndCache(input, maxAge = 86400000) {
  const request = new Request(input);
  const url = new URL(request.url);

  // use data from cache data if valid and render
  let cache;
  let cachedResponse;
  if ("caches" in window) {
    try {
      cache = await caches.open(url.origin);
      cachedResponse = await cache.match(request);
      if (
        cachedResponse &&
        new Date(cachedResponse.headers.get("Expires")) > new Date()
      ) {
        return cachedResponse;
      }
    } catch (err) {
      console.error("Failed to use Cache API.", err);
    }
  }

  // otherwise fetch new data and cache
  const response = await fetch(request);
  if (!response.ok) {
    if (cachedResponse) {
      // return stale version
      console.warn(`Returning a stale cached response for ${url}`);
      return cachedResponse;
    }
  }

  // cache response
  if (cache && response.ok) {
    const clonedResponse = response.clone();
    const customHeaders = new Headers(response.headers);
    const expiryDate = new Date(Date.now() + maxAge);
    customHeaders.set("Expires", expiryDate.toString());
    const cacheResponse = new Response(await clonedResponse.blob(), {
      headers: customHeaders,
    });
    // put in cache, and forget it (there is no recovery if it throws, but that's ok).
    await cache.put(request, cacheResponse).catch(console.error);
  }
  return response;
}

// --- COLLECTION/ITERABLE HELPERS ---------------
/**
 * Spreads one iterable into another.
 *
 * @param {Array} collector
 * @param {any|Array} item
 * @returns {Array}
 */
function flatten(collector, item) {
  const items = !Array.isArray(item)
    ? [item]
    : item.slice().reduce(flatten, []);
  collector.push(...items);
  return collector;
}

// --- DOM HELPERS -------------------------------

/**
 * Creates and sets an ID to an element (elem)
 * using a specific prefix if provided, and a specific text if given.
 * @param {HTMLElement} elem element
 * @param {String} pfx prefix
 * @param {String} txt text
 * @param {Boolean} noLC do not convert to lowercase
 * @returns {String} generated (or existing) id for element
 */
function addId(elem, pfx = "", txt = "", noLC = false) {
  if (elem.id) {
    return elem.id;
  }
  if (!txt) {
    txt = (elem.title ? elem.title : elem.textContent).trim();
  }
  let id = noLC ? txt : txt.toLowerCase();
  id = id
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\W+/gim, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  if (!id) {
    id = "generatedID";
  } else if (pfx === "example") {
    id = txt;
  } else if (/\.$/.test(id) || !/^[a-z]/i.test(id)) {
    id = `x${id}`; // trailing . doesn't play well with jQuery
  }
  if (pfx) {
    id = `${pfx}-${id}`;
  }
  if (elem.ownerDocument.getElementById(id)) {
    let i = 0;
    let nextId = `${id}-${i}`;
    while (elem.ownerDocument.getElementById(nextId)) {
      i += 1;
      nextId = `${id}-${i}`;
    }
    id = nextId;
  }
  elem.id = id;
  return id;
}

/**
 * Returns all the descendant text nodes of an element.
 * @param {Node} el
 * @param {string[]} exclusions node localName to exclude
 * @param {object} options
 * @param {boolean} options.wsNodes if nodes that only have whitespace are returned.
 * @returns {Text[]}
 */
function getTextNodes(el, exclusions = [], options = { wsNodes: true }) {
  const exclusionQuery = exclusions.join(", ");
  const acceptNode = (/** @type {Text} */ node) => {
    if (!options.wsNodes && !node.data.trim()) {
      return NodeFilter.FILTER_REJECT;
    }
    if (exclusionQuery && node.parentElement.closest(exclusionQuery)) {
      return NodeFilter.FILTER_REJECT;
    }
    return NodeFilter.FILTER_ACCEPT;
  };
  const nodeIterator = document.createNodeIterator(
    el,
    NodeFilter.SHOW_TEXT,
    acceptNode
  );
  /** @type {Text[]} */
  const textNodes = [];
  let node;
  while ((node = nodeIterator.nextNode())) {
    textNodes.push(/** @type {Text} */ (node));
  }
  return textNodes;
}

/**
 * For any element, returns an array of title strings that applies
 *   the algorithm used for determining the actual title of a
 *   <dfn> element (but can apply to other as well).
 * if args.isDefinition is true, then the element is a definition, not a
 *   reference to a definition. Any @title will be replaced with
 *   @data-lt to be consistent with Bikeshed / Shepherd.
 * This method now *prefers* the data-lt attribute for the list of
 *   titles. That attribute is added by this method to dfn elements, so
 *   subsequent calls to this method will return the data-lt based list.
 * @param {HTMLElement} elem
 * @returns {String[]} array of title strings
 */
function getDfnTitles(elem) {
  const titleSet = new Set();
  // data-lt-noDefault avoid using the text content of a definition
  // in the definition list.
  // ltNodefault is === "data-lt-noDefault"... someone screwed up 😖
  const normText = "ltNodefault" in elem.dataset ? "" : norm(elem.textContent);
  const child = /** @type {HTMLElement | undefined} */ (elem.children[0]);
  if (elem.dataset.lt) {
    // prefer @data-lt for the list of title aliases
    elem.dataset.lt
      .split("|")
      .map(item => norm(item))
      .forEach(item => titleSet.add(item));
  } else if (
    elem.childNodes.length === 1 &&
    elem.getElementsByTagName("abbr").length === 1 &&
    child.title
  ) {
    titleSet.add(child.title);
  } else if (elem.textContent === '""') {
    titleSet.add("the-empty-string");
  }

  titleSet.add(normText);
  titleSet.delete("");
  const titles = [...titleSet];
  return titles;
}

/**
 * For an element (usually <a>), returns an array of targets that
 * element might refer to, of the form
 * @typedef {object} LinkTarget
 * @property {string} for
 * @property {string} title
 *
 * For an element like:
 *  <p data-link-for="Int1"><a data-link-for="Int2">Int3.member</a></p>
 * we'll return:
 *  * {for: "int2", title: "int3.member"}
 *  * {for: "int3", title: "member"}
 *  * {for: "", title: "int3.member"}
 * @param {HTMLElement} elem
 * @returns {LinkTarget[]}
 */
function getLinkTargets(elem) {
  /** @type {HTMLElement} */
  const linkForElem = elem.closest("[data-link-for]");
  const linkFor = linkForElem ? linkForElem.dataset.linkFor : "";
  const titles = getDfnTitles(elem);
  const results = titles.reduce((result, title) => {
    // supports legacy <dfn>Foo.Bar()</dfn> definitions
    const split = title.split(".");
    if (split.length === 2) {
      // If there are multiple '.'s, this won't match an
      // Interface/member pair anyway.
      result.push({ for: split[0], title: split[1] });
    }
    result.push({ for: linkFor, title });

    // Finally, we can try to match without link for
    if (linkFor !== "") result.push({ for: "", title });
    return result;
  }, []);
  return results;
}

/**
 * Changes name of a DOM Element
 * @param {Element} elem element to rename
 * @param {String} newName new element name
 * @returns {Element} new renamed element
 */
function renameElement(elem, newName) {
  if (elem.localName === newName) return elem;
  const newElement = elem.ownerDocument.createElement(newName);
  // copy attributes
  for (const { name, value } of elem.attributes) {
    newElement.setAttribute(name, value);
  }
  // copy child nodes
  newElement.append(...elem.childNodes);
  elem.replaceWith(newElement);
  return newElement;
}

function refTypeFromContext(ref, element) {
  const closestInformative = element.closest(nonNormativeSelector);
  let isInformative = false;
  if (closestInformative) {
    // check if parent is not normative
    isInformative =
      !element.closest(".normative") ||
      !closestInformative.querySelector(".normative");
  }
  // prefixes `!` and `?` override section behavior
  if (ref.startsWith("!")) {
    if (isInformative) {
      // A (forced) normative reference in informative section is illegal
      return { type: "informative", illegal: true };
    }
    isInformative = false;
  } else if (ref.startsWith("?")) {
    isInformative = true;
  }
  const type = isInformative ? "informative" : "normative";
  return { type, illegal: false };
}

/**
 * Wraps inner contents with the wrapper node
 * @param {Node} outer outer node to be modified
 * @param {Element} wrapper wrapper node to be appended
 */
function wrapInner(outer, wrapper) {
  wrapper.append(...outer.childNodes);
  outer.appendChild(wrapper);
  return outer;
}

/**
 * Applies the selector for all its ancestors.
 * @param {Element} element
 * @param {string} selector
 */
function parents(element, selector) {
  /** @type {Element[]} */
  const list = [];
  let parent = element.parentElement;
  while (parent) {
    const closest = parent.closest(selector);
    if (!closest) {
      break;
    }
    list.push(closest);
    parent = closest.parentElement;
  }
  return list;
}

/**
 * Applies the selector for direct descendants.
 * This is a helper function for browsers without :scope support.
 * Note that this doesn't support comma separated selectors.
 * @param {Element} element
 * @param {string} selector
 * @returns {NodeListOf<HTMLElement>}
 */
function children(element, selector) {
  try {
    return element.querySelectorAll(`:scope > ${selector}`);
  } catch {
    let tempId = "";
    // We give a temporary id, to overcome lack of ":scope" support in Edge.
    if (!element.id) {
      tempId = `temp-${String(Math.random()).substr(2)}`;
      element.id = tempId;
    }
    const query = `#${element.id} > ${selector}`;
    /** @type {NodeListOf<HTMLElement>} */
    const elements = element.parentElement.querySelectorAll(query);
    if (tempId) {
      element.id = "";
    }
    return elements;
  }
}

/**
 * Generates simple ids. The id's increment after it yields.
 *
 * @param {String} namespace A string like "highlight".
 * @param {number} counter A number, which can start at a given value.
 */
function msgIdGenerator(namespace, counter = 0) {
  function* idGenerator(namespace, counter) {
    while (true) {
      yield `${namespace}:${counter}`;
      counter++;
    }
  }
  const gen = idGenerator(namespace, counter);
  return () => {
    return gen.next().value;
  };
}

class InsensitiveStringSet extends Set {
  /**
   * @param {Array<String>} [keys] Optional, initial keys
   */
  constructor(keys = []) {
    super();
    for (const key of keys) {
      this.add(key);
    }
  }
  /**
   * @param {string} key
   */
  add(key) {
    if (!this.has(key) && !this.getCanonicalKey(key)) {
      return super.add(key);
    }
    return this;
  }
  /**
   * @param {string} key
   */
  has(key) {
    return (
      super.has(key) ||
      [...this.keys()].some(
        existingKey => existingKey.toLowerCase() === key.toLowerCase()
      )
    );
  }
  /**
   * @param {string} key
   */
  delete(key) {
    return super.has(key)
      ? super.delete(key)
      : super.delete(this.getCanonicalKey(key));
  }
  /**
   * @param {string} key
   */
  getCanonicalKey(key) {
    return super.has(key)
      ? key
      : [...this.keys()].find(
          existingKey => existingKey.toLowerCase() === key.toLowerCase()
        );
  }
}

function makeSafeCopy(node) {
  const clone = node.cloneNode(true);
  clone.querySelectorAll("[id]").forEach(elem => elem.removeAttribute("id"));
  clone.querySelectorAll("dfn").forEach(dfn => renameElement(dfn, "span"));
  clone
    .querySelectorAll("span.footnote")
    .forEach(footnote => footnote.remove());
  clone.querySelectorAll("span.issue").forEach(issue => issue.remove());
  if (clone.hasAttribute("id")) clone.removeAttribute("id");
  removeCommentNodes(clone);
  return clone;
}

function removeCommentNodes(node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT);
  for (const comment of [...walkTree(walker)]) {
    comment.remove();
  }
}

/**
 * @template {Node} T
 * @param {TreeWalker<T>} walker
 * @return {IterableIterator<T>}
 */
function* walkTree(walker) {
  while (walker.nextNode()) {
    yield /** @type {T} */ (walker.currentNode);
  }
}

// @ts-check

const name$2 = "core/base-runner";
const canMeasure = performance.mark && performance.measure;

function toRunnable(plug) {
  const name = plug.name || "";
  if (!name) {
    console.warn("Plugin lacks name:", plug);
  }
  return config => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const timerId = setTimeout(() => {
        const msg = `Plugin ${name} took too long.`;
        console.error(msg, plug);
        reject(new Error(msg));
      }, 15000);
      if (canMeasure) {
        performance.mark(`${name}-start`);
      }
      try {
        if (plug.run.length <= 1) {
          await plug.run(config);
          resolve();
        } else {
          console.warn(
            `Plugin ${name} uses a deprecated callback signature. Return a Promise instead. Read more at: https://github.com/w3c/respec/wiki/Developers-Guide#plugins`
          );
          plug.run(config, document, resolve);
        }
      } catch (err) {
        reject(err);
      } finally {
        clearTimeout(timerId);
      }
      if (canMeasure) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      }
    });
  };
}

async function runAll(plugs) {
  pub("start-all", respecConfig);
  if (canMeasure) {
    performance.mark(`${name$2}-start`);
  }
  await done$1;
  const runnables = plugs.filter(plug => plug && plug.run).map(toRunnable);
  for (const task of runnables) {
    try {
      await task(respecConfig);
    } catch (err) {
      console.error(err);
    }
  }
  pub("plugins-done", respecConfig);
  await done;
  pub("end-all", respecConfig);
  removeReSpec(document);
  if (canMeasure) {
    performance.mark(`${name$2}-end`);
    performance.measure(name$2, `${name$2}-start`, `${name$2}-end`);
  }
}

var baseRunner = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$2,
  runAll: runAll
});

/**
 * @param {string} path
 */
async function fetchBase(path) {
  const response = await fetch(new URL(`../../${path}`, (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('respec-geonovum.js', document.baseURI).href))));
  return await response.text();
}

/**
 * @param {string} fileName
 */
async function fetchAsset(fileName) {
  return fetchBase(`assets/${fileName}`);
}

const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then(value => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error);
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function addTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', event => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    if (blocking) {
        openPromise.then(db => db.addEventListener('versionchange', blocking)).catch(() => { });
    }
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return wrap(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
addTraps(oldTraps => ({
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

var _idb = /*#__PURE__*/Object.freeze({
  __proto__: null,
  openDB: openDB,
  deleteDB: deleteDB,
  unwrap: unwrap,
  wrap: wrap
});

/*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(N){/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap;}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this);}function o(e){this.set(e[0],e[1]);}}(Math.random(),Object);}var u=t.WeakMap,i={};
/*! (c) Andrea Giammarchi - ISC */try{i.WeakSet=WeakSet;}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++});}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r;}(Math.random(),Object.defineProperty);}var e=i.WeakSet,n={};
/*! (c) Andrea Giammarchi - ISC */try{n.Map=Map;}catch(e){n.Map=function(){var n=0,i=[],a=[];return {delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this);},this);},get:function(e){return r(e)?a[n]:void 0},has:function(e){return r(e)},set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return -1<(n=i.indexOf(e))}};}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var l=e(n[r],1);if(t.insertBefore(l,a),o&&u&&l.selected){u=!u;var c=t.selectedIndex;t.selectedIndex=c<0?r:s.call(t.querySelectorAll("option"),l);}r++;}}function y(e,t){return e==t}function b(e){return e}function w(e,t,n,r,i,a,o){var u=a-i;if(u<1)return -1;for(;u<=n-t;){for(var l=t,c=i;l<n&&c<a&&o(e[l],r[c]);)l++,c++;if(c===a)return t;t=l+1;}return -1}function x(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function E(e,t,n,r){for(;n<r;)a(e(t[n++],-1));}function C(e,t,n,r,i,a,o,u,l,c,s,f,h){!function(e,t,n,r,i,a,o,u,l){for(var c=new k,s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:c.set(r[i],1),m(t,n,r,i++,i,f<u?t(a[f],0):l);break;case-1:f++;}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:c.has(a[o])?o++:E(t,a,o++,o);}}(function(e,t,n,r,i,a,o){var u,l,c,s,f,h,d,v=n+a,p=[];e:for(u=0;u<=v;u++){if(50<u)return null;for(d=u-1,f=u?p[u-1]:[0,0],h=p[u]=[],l=-u;l<=u;l+=2){for(c=(s=l===-u||l!==u&&f[d+l-1]<f[d+l+1]?f[d+l+1]:f[d+l-1]+1)-l;s<a&&c<n&&o(r[i+s],e[t+c]);)s++,c++;if(s===a&&c===n)break e;h[u+l]=s;}}var g=Array(u/2+v/2),m=g.length-1;for(u=p.length-1;0<=u;u--){for(;0<s&&0<c&&o(r[i+s-1],e[t+c-1]);)g[m--]=0,s--,c--;if(!u)break;d=u-1,f=u?p[u-1]:[0,0],(l=s-c)===-u||l!==u&&f[d+l-1]<f[d+l+1]?(c--,g[m--]=1):(s--,g[m--]=-1);}return g}(n,r,a,o,u,c,f)||function(e,t,n,r,i,a,o,u){var l=0,c=r<u?r:u,s=Array(c++),f=Array(c);f[0]=-1;for(var h=1;h<c;h++)f[h]=o;for(var d=new k,v=a;v<o;v++)d.set(i[v],v);for(var p=t;p<n;p++){var g=d.get(e[p]);null!=g&&-1<(l=S(f,c,g))&&(f[l]=g,s[l]={newi:p,oldi:g,prev:s[l-1]});}for(l=--c,--o;f[l]>o;)--l;c=u+r-l;var m=Array(c),y=s[l];for(--n;y;){for(var b=y,w=b.newi,N=b.oldi;w<n;)m[--c]=1,--n;for(;N<o;)m[--c]=-1,--o;m[--c]=0,--n,--o,y=y.prev;}for(;t<=n;)m[--c]=1,--n;for(;a<=o;)m[--c]=-1,--o;return m}(n,r,i,a,o,u,l,c),e,t,n,r,o,u,s,h);}var k=n.Map,s=[].indexOf,S=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a;}return r},a=function(e){return (e.remove||function(){var e=this.parentNode;e&&e.removeChild(this);}
/*! (c) 2018 Andrea Giammarchi (ISC) */).call(e)};function l(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,l=u,c=0,s=n.length,f=0;c<l&&f<s&&i(t[c],n[f]);)c++,f++;for(;c<l&&f<s&&i(t[l-1],n[s-1]);)l--,s--;var h=c===l,d=f===s;if(h&&d)return n;if(h&&f<s)return m(a,e,n,f,s,x(a,t,c,u,o)),n;if(d&&c<l)return E(a,t,c,l),n;var v=l-c,p=s-f,g=-1;if(v<p){if(-1<(g=w(n,f,s,t,c,l,i)))return m(a,e,n,f,g,a(t[c],0)),m(a,e,n,g+v,s,x(a,t,l,u,o)),n}else if(p<v&&-1<(g=w(t,c,l,n,f,s,i)))return E(a,t,c,g),E(a,t,g+p,l),n;return v<2||p<2?(m(a,e,n,f,s,a(t[c],0)),E(a,t,c,l)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,c,l,i)?m(a,e,n,f,s,x(a,t,l,u,o)):C(a,e,n,f,s,p,t,c,l,v,u,i,o),n}var r,o={};
/*! (c) Andrea Giammarchi - ISC */function c(e,t){t=t||{};var n=N.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}o.CustomEvent="function"==typeof CustomEvent?CustomEvent:(c[r="prototype"]=new c("").constructor[r],c);var f=o.CustomEvent;function h(){return this}function d(e,t){var n="_"+e+"$";return {get:function(){return this[n]||v(this,n,t.call(this,e))},set:function(e){v(this,n,e);}}}var v=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(h.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var p,g,A,T,O,M,_={},j={},L=[],P=j.hasOwnProperty,D=0,W={attributes:_,define:function(e,t){e.indexOf("-")<0?(e in j||(D=L.push(e)),j[e]=t):_[e]=t;},invoke:function(e,t){for(var n=0;n<D;n++){var r=L[n];if(P.call(e,r))return j[r](e[r],t)}}},$=Array.isArray||(g=(p={}.toString).call([]),function(e){return p.call(e)===g}),R=(A=N,T="fragment",M="content"in H(O="template")?function(e){var t=H(O);return t.innerHTML=e,t.content}:function(e){var t=H(T),n=H(O),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(i);}else n.innerHTML=e,r=n.childNodes;return F(t,r),t},function(e,t){return ("svg"===t?function(e){var t=H(T),n=H("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",F(t,n.firstChild.childNodes),t}:M)(e)});function F(e,t){for(var n=t.length;n--;)e.appendChild(t[0]);}function H(e){return e===T?A.createDocumentFragment():A.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */
var I,z,V,Z,G,q,B,J,K,Q,U=(z="appendChild",V="cloneNode",Z="createTextNode",q=(G="importNode")in(I=N),(B=I.createDocumentFragment())[z](I[Z]("g")),B[z](I[Z]("")),(q?I[G](B,!0):B[V](!0)).childNodes.length<2?function e(t,n){for(var r=t[V](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[z](e(i[o],n));return r}:q?I[G]:function(e,t){return e[V](!!t)}),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%",ee=!1;try{J=N.createElement("template"),Q="tabindex",(K="content")in J&&(J.innerHTML="<p "+Q+'="'+Y+'"></p>',J[K].childNodes[0].getAttribute(Q)==Y)||(Y="_dt: "+Y.slice(1,-1)+";",ee=!0);}catch(e){}var te="\x3c!--"+Y+"--\x3e",ne=8,re=1,ie=3,ae=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ue=" \\f\\n\\r\\t",le="[^"+ue+"\\/>\"'=]+",ce="["+ue+"]+"+le,se="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",fe="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+le.replace("\\/","")+"))?)",he=new RegExp(se+ce+fe+"+)(["+ue+"]*/?>)","g"),de=new RegExp(se+ce+fe+"*)(["+ue+"]*/>)","g"),ve=new RegExp("("+ce+"\\s*=\\s*)(['\"]?)"+te+"\\2","gi");function pe(e,t,n,r){return "<"+t+n.replace(ve,ge)+r}function ge(e,t,n){return t+(n||'"')+Y+(n||'"')}function me(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}var ye=ee?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort(function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1})}:function(e,t){return t.slice.call(e,0)};function be(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function we(e,t,n,r){for(var i=new k,a=e.attributes,o=[],u=ye(a,n),l=u.length,c=0;c<l;){var s,f=u[c++],h=f.value===Y;if(h||1<(s=f.value.split(te)).length){var d=f.name;if(!i.has(d)){var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(i.set(d,p),h)t.push(Ne(p,r,v,null));else{for(var g=s.length-2;g--;)n.shift();t.push(Ne(p,r,v,s));}}o.push(f);}}for(var m=((c=0)<(l=o.length)&&ee&&!("ownerSVGElement"in e));c<l;){var y=o[c++];m&&(y.value=""),e.removeAttribute(y.name);}var b=e.nodeName;if(/^script$/i.test(b)){var w=N.createElement(b);for(l=a.length,c=0;c<l;)w.setAttributeNode(a[c++].cloneNode(!0));w.textContent=e.textContent,e.parentNode.replaceChild(w,e);}}function Ne(e,t,n,r){return {type:"attr",node:e,path:t,name:n,sparse:r}}function xe(e,t){return {type:"text",node:e,path:t}}var Ee=new u,Ce=new u;function ke(o,f){var e=(o.convert||
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(te).replace(de,me).replace(he,pe)})(f),t=o.transform;t&&(e=t(e));var n=R(e,o.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r);}}
/*! (c) Andrea Giammarchi - ISC */(n);var u=[];!function e(t,n,r,i){for(var a,o,u=t.childNodes,l=u.length,c=0;c<l;){var s=u[c];switch(s.nodeType){case re:var f=i.concat(c);we(s,n,r,f),e(s,n,r,f);break;case ne:var h=s.textContent;if(h===Y)r.shift(),n.push(ae.test(t.nodeName)?xe(t,i):(a=s,o=i.concat(c),{type:"any",node:a,path:o}));else switch(h.slice(0,2)){case"/*":if("*/"!==h.slice(-2))break;case"👻":t.removeChild(s),c--,l--;}break;case ie:ae.test(t.nodeName)&&X.call(s.textContent)===te&&(r.shift(),n.push(xe(t,i)));}c++;}}(n,u,f.slice(0),[]);var r={content:n,updates:function(l){for(var c=[],s=u.length,e=0,t=0;e<s;){var n=u[e++],r=be(l,n.path);switch(n.type){case"any":c.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?c.push({fn:a,sparse:!1}):(t+=i.length-2,c.push({fn:a,sparse:!0,values:i}));break;case"text":c.push({fn:o.text(r),sparse:!1}),r.textContent="";}}return s+=t,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=c[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a);}else r.fn(arguments[t++]);}return l}}};return Ee.set(f,r),r}function Se(n){return function(e){var t=Ce.get(n);return null!=t&&t.template===e||(t=function(e,t){var n=Ee.get(t)||ke(e,t),r=U.call(N,n.content,!0),i={content:r,template:t,updates:n.updates(r)};return Ce.set(e,i),i}(n,e)),t.updates.apply(null,arguments),t.content}}var Ae,Te,Oe=(Ae=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Te=/([^A-Z])([A-Z]+)/g,function(e,t){return "ownerSVGElement"in e?function(e,t){var n;return (n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),_e(n,!0)}(e,t):_e(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Me(e,t,n){return t+"-"+n.toLowerCase()}function _e(a,o){var u,l;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&l!==e)for(n in l)n in e||(a[n]="");}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||Ae.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Te,Me),":",e[t],";");return n.join("")}(l=t):l=e;break}default:l!=e&&(u="string",l=e,o?a.value=e||"":a.cssText=e||"");}}}var je,Le,Pe=(je=[].slice,(Le=De.prototype).ELEMENT_NODE=1,Le.nodeType=111,Le.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents();}return n},Le.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},De);function De(e){var t=this.childNodes=je.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null;}function We(e){return {html:e}}function $e(e,t){switch(e.nodeType){case Je:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case Be:return $e(e.render(),t);default:return e}}function Re(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(We).then(t):Promise.resolve(W.invoke(e,t)).then(t);}function Fe(e){return null!=e&&"then"in e}var He,Ie,ze,Ve,Ze,Ge="ownerSVGElement",qe="connected",Be=h.prototype.nodeType,Je=Pe.prototype.nodeType,Ke=(Ie=(He={Event:f,WeakSet:e}).Event,ze=He.WeakSet,Ve=!0,Ze=null,function(e){return Ve&&(Ve=!Ve,Ze=new ze,function(t){var i=new ze,a=new ze;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0});}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length));},0);};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]});},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]});},!0);}function u(e){for(var t,n=e.length,r=0;r<n;r++)l((t=e[r]).removedNodes,"disconnected",a,i),l(t.addedNodes,"connected",i,a);}function l(e,t,n,r){for(var i,a=new Ie(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&c(i,a,t,n,r));}function c(e,t,n,r,i){Ze.has(e)&&!r.has(e)&&(i.delete(e),r.add(e),e.dispatchEvent(t));for(var a=e.children||[],o=a.length,u=0;u<o;c(a[u++],t,n,r,i));}}(e.ownerDocument)),Ze.add(e),e}),Qe=/^(?:form|list)$/i,Ue=[].slice;function Xe(e){return this.type=e,Se(this)}var Ye=!(Xe.prototype={attribute:function(n,r,e){var i,t=Ge in n;if("style"===r)return Oe(n,e,t);if(/^on/.test(r)){var a=r.slice(2);return a===qe||"disconnected"===a?Ke(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1));}}if("data"===r||!t&&r in n&&!Qe.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e);};if(r in W.attributes)return function(e){var t=W.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t));};var o=!1,u=e.cloneNode(!0);return function(e){i!==e&&(i=e,u.value!==e&&(null==e?(o&&(o=!1,n.removeAttributeNode(u)),u.value=e):(u.value=e,o||(o=!0,n.setAttributeNode(u)))));}},any:function(n,r){var i,a={node:$e,before:n},o=Ge in n?"svg":"html",u=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":u?i!==t&&(i=t,r[0].textContent=t):(u=!0,i=t,r=l(n.parentNode,r,[function(e,t){return e.ownerDocument.createTextNode(t)}(n,t)],a));break;case"function":e(t(n));break;case"object":case"undefined":if(null==t){u=!1,r=l(n.parentNode,r,[],a);break}default:if(u=!1,$(i=t))if(0===t.length)r.length&&(r=l(n.parentNode,r,[],a));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if($(t[0])&&(t=t.concat.apply([],t)),Fe(t[0])){Promise.all(t).then(e);break}default:r=l(n.parentNode,r,t,a);}else!function(e){return "ELEMENT_NODE"in e}(t)?Fe(t)?t.then(e):"placeholder"in t?Re(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?r=l(n.parentNode,r,Ue.call(R([].concat(t.html).join(""),o).childNodes),a):e("length"in t?Ue.call(t):W.invoke(t,e)):r=l(n.parentNode,r,11===t.nodeType?Ue.call(t.childNodes):[t],a);}}},text:function(r){var i;return function e(t){if(i!==t){var n=typeof(i=t);"object"==n&&t?Fe(t)?t.then(e):"placeholder"in t?Re(t,e):e("text"in t?String(t.text):"any"in t?t.any:"html"in t?[].concat(t.html).join(""):"length"in t?Ue.call(t).join(""):W.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t;}}}}),et=function(e){var t,n=(t=(N.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(t)),r=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);if(n||r){var i={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return i[t]||(i[t]=e)};if(r)et=a;else{var o=new u;et=function(e){return o.get(e)||function(e,t){return o.set(e,t),t}(e,a(e))};}}else Ye=!0;return tt(e)};function tt(e){return Ye?e:et(e)}function nt(e){for(var t=arguments.length,n=[tt(e)],r=1;r<t;)n.push(arguments[r++]);return n}var rt=new u,it=function(t){var n,r,i;return function(){var e=nt.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Xe(t),n=ot(r.apply(r,e))):r.apply(r,e),n}},at=function(e,t){var n=t.indexOf(":"),r=rt.get(e),i=t;return -1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||rt.set(e,r={}),r[i]||(r[i]=it(t))},ot=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Pe(t):e},ut=new u;function lt(){var e=ut.get(this),t=nt.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Xe(Ge in this?"svg":"html");ut.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments));}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var ct,st,ft,ht,dt=W.define,vt=Xe.prototype;function pt(e){return arguments.length<2?null==e?it("html"):"string"==typeof e?pt.wire(null,e):"raw"in e?it("html")(e):"nodeType"in e?pt.bind(e):at(e,"html"):("raw"in e?it("html"):pt.wire).apply(null,arguments)}return pt.Component=h,pt.bind=function(e){return lt.bind(e)},pt.define=dt,pt.diff=l,(pt.hyper=pt).observe=Ke,pt.tagger=vt,pt.wire=function(e,t){return null==e?it(t||"html"):at(e,t||"html")},pt._={WeakMap:u,WeakSet:e},ct=it,st=new u,ft=Object.create,ht=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(h,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i=t.get(e)||ht(e,t);switch(typeof r){case"object":case"function":var a=i.w||(i.w=new u);return a.get(r)||function(e,t,n){return e.set(t,n),n}(a,r,new e(n));default:var o=i.p||(i.p=ft(null));return o[r]||(o[r]=new e(n))}}(this,st.get(e)||function(e){var t=new k;return st.set(e,t),t}(e),e,null==t?"default":t)}}}),Object.defineProperties(h.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e);}},html:d("html",ct),svg:d("svg",ct),state:d("state",function(){return this.defaultState}),defaultState:{get:function(){return {}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new f(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return !1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return !1!==t&&this.render(),this}}}),pt}(document);

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var marked = createCommonjsModule(function (module, exports) {
(function(root) {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noop,
  table: noop,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} +')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noop, // fences not supported
  paragraph: edit(block.normal._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = Object.create(null);
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    this.rules = block.gfm;
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      var lastToken = this.tokens[this.tokens.length - 1];
      src = src.substring(cap[0].length);
      // An indented code block cannot interrupt a paragraph.
      if (lastToken && lastToken.type === 'paragraph') {
        lastToken.text += '\n' + cap[0].trimRight();
      } else {
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          codeBlockStyle: 'indented',
          text: !this.options.pedantic
            ? rtrim(cap, '\n')
            : cap
        });
      }
      continue;
    }

    // fences
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2] ? cap[2].trim() : cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (cap = this.rules.nptable.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      };

      this.tokens.push(listStart);

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      listItems = [];
      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull.length > 1 ? b.length === 1
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          listStart.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose: loose
        };

        listItems.push(t);
        this.tokens.push(t);

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      if (listStart.loose) {
        l = listItems.length;
        i = 0;
        for (; i < l; i++) {
          listItems[i].loose = true;
        }
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (cap = this.rules.table.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noop,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
};

// list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)
inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline.gfm.url = edit(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[1]);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }

      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      var lastParenIndex = findClosingBracket(cap[2], '()');
      if (lastParenIndex > -1) {
        var linkLen = 4 + cap[1].length + lastParenIndex;
        cap[2] = cap[2].substring(0, lastParenIndex);
        cap[0] = cap[0].substring(0, linkLen).trim();
        cap[3] = '';
      }
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      src = src.substring(cap[0].length);
      out += this.renderer.link(href, null, text);
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      if (this.inRawBlock) {
        out += this.renderer.text(this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]);
      } else {
        out += this.renderer.text(escape(this.smartypants(cap[0])));
      }
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw, slugger) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + slugger.slug(raw)
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function(text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
  this.slugger = new Slugger();
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, { renderer: new TextRenderer() })
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  this.token = this.tokens.pop();
  return this.token;
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)),
        this.slugger);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;
      var checked = this.token.checked;
      var task = this.token.task;

      if (this.token.task) {
        body += this.renderer.checkbox(checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }
      return this.renderer.listitem(body, task, checked);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
    default: {
      var errMsg = 'Token with "' + this.token.type + '" type was not found.';
      if (this.options.silent) {
        console.log(errMsg);
      } else {
        throw new Error(errMsg);
      }
    }
  }
};

/**
 * Slugger generates header id
 */

function Slugger() {
  this.seen = {};
}

/**
 * Convert string to unique id
 */

Slugger.prototype.slug = function(value) {
  var slug = value
    .toLowerCase()
    .trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');

  if (this.seen.hasOwnProperty(slug)) {
    var originalSlug = slug;
    do {
      this.seen[originalSlug]++;
      slug = originalSlug + '-' + this.seen[originalSlug];
    } while (this.seen.hasOwnProperty(slug));
  }
  this.seen[slug] = 0;

  return slug;
};

/**
 * Helpers
 */

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function(ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function(ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function(match, offset, str) {
        var escaped = false,
            curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  if (str.length === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < str.length) {
    var currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  var level = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    checkSanitizeDeprecation(opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
};

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.Slugger = Slugger;

marked.parse = marked;

{
  module.exports = marked;
}
})();
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pluralize = createCommonjsModule$1(function (module, exports) {
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['passerby', 'passersby']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
});

// @ts-check

/** @type {import("idb")} */
// @ts-ignore
const idb = _idb;
/** @type {import("hyperhtml").default} */
// @ts-ignore
const hyperHTML$1 = hyperHTML;
/** @type {import("marked")} */
// @ts-ignore
const marked$1 = marked;
/** @type {import("pluralize")} */
// @ts-ignore
const pluralize$1 = pluralize;

// @ts-check
const name$3 = "core/markdown";

const gtEntity = /&gt;/gm;
const ampEntity = /&amp;/gm;
const endsWithSpace = /\s+$/gm;

const inlineElems = new Set([
  "a",
  "abbr",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "button",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "map",
  "object",
  "q",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "textarea",
  "time",
  "tt",
  "var",
]);

/**
 * @param {string} text
 */
function normalizePadding(text) {
  if (!text) {
    return "";
  }
  if (typeof text !== "string") {
    throw TypeError("Invalid input");
  }
  if (text === "\n") {
    return "\n";
  }

  /**
   * @param {Node} node
   * @return {node is Text}
   */
  function isTextNode(node) {
    return node !== null && node.nodeType === Node.TEXT_NODE;
  }
  /**
   * @param {Node} node
   * @return {node is Element}
   */
  function isElementNode(node) {
    return node !== null && node.nodeType === Node.ELEMENT_NODE;
  }
  const doc = document.createRange().createContextualFragment(text);
  // Normalize block level elements children first
  Array.from(doc.children)
    .filter(elem => !inlineElems.has(elem.localName))
    .filter(elem => elem.localName !== "pre")
    .filter(elem => elem.localName !== "table")
    .forEach(elem => {
      elem.innerHTML = normalizePadding(elem.innerHTML);
    });
  // Normalize root level now
  Array.from(doc.childNodes)
    .filter(node => isTextNode(node) && node.textContent.trim() === "")
    .forEach(node => node.replaceWith("\n"));
  // Normalize text node
  if (isElementNode(doc.firstChild)) {
    Array.from(doc.firstChild.children)
      .filter(child => child.localName !== "table")
      .forEach(child => {
        child.innerHTML = normalizePadding(child.innerHTML);
      });
  }
  doc.normalize();
  // use the first space as an indicator of how much to chop off the front
  const firstSpace = doc.textContent
    .replace(/^ *\n/, "")
    .split("\n")
    .filter(item => item && item.startsWith(" "))[0];
  const chop = firstSpace ? firstSpace.match(/ +/)[0].length : 0;
  if (chop) {
    // Chop chop from start, but leave pre elem alone
    Array.from(doc.childNodes)
      .filter(node => node.nodeName !== "PRE")
      .filter(isTextNode)
      .filter(node => {
        // we care about text next to a block level element
        const prevSib = node.previousElementSibling;
        const nextTo = prevSib && prevSib.localName;
        // and we care about text elements that finish on a new line
        return (
          !inlineElems.has(nextTo) || node.textContent.trim().includes("\n")
        );
      })
      .reduce((replacer, node) => {
        // We need to retain white space if the text Node is next to an in-line element
        let padding = "";
        const prevSib = node.previousElementSibling;
        const nextTo = prevSib && prevSib.localName;
        if (/^[\t ]/.test(node.textContent) && inlineElems.has(nextTo)) {
          padding = node.textContent.match(/^\s+/)[0];
        }
        node.textContent = padding + node.textContent.replace(replacer, "");
        return replacer;
      }, new RegExp(`^ {1,${chop}}`, "gm"));
    // deal with pre elements... we can chop whitespace from their siblings
    const endsWithSpace = new RegExp(`\\ {${chop}}$`, "gm");
    Array.from(doc.querySelectorAll("pre"))
      .map(elem => elem.previousSibling)
      .filter(isTextNode)
      .reduce((chop, node) => {
        if (endsWithSpace.test(node.textContent)) {
          node.textContent = node.textContent.substr(
            0,
            node.textContent.length - chop
          );
        }
        return chop;
      }, chop);
  }
  const wrap = document.createElement("body");
  wrap.append(doc);
  const result = endsWithSpace.test(wrap.innerHTML)
    ? `${wrap.innerHTML.trimRight()}\n`
    : wrap.innerHTML;
  return result;
}

/**
 * @param {string} text
 */
function markdownToHtml(text) {
  const normalizedLeftPad = normalizePadding(text);
  // As markdown is pulled from HTML, > and & are already escaped and
  // so blockquotes aren't picked up by the parser. This fixes it.
  const potentialMarkdown = normalizedLeftPad
    .replace(gtEntity, ">")
    .replace(ampEntity, "&");
  // @ts-ignore
  const result = marked$1(potentialMarkdown, {
    sanitize: false,
    gfm: true,
    headerIds: false,
  });
  return result;
}

function processElements(selector) {
  return element => {
    const elements = Array.from(element.querySelectorAll(selector));
    elements.reverse().forEach(element => {
      element.innerHTML = markdownToHtml(element.innerHTML);
    });
    return elements;
  };
}

class Builder {
  constructor(doc) {
    this.doc = doc;
    this.root = doc.createDocumentFragment();
    this.stack = [this.root];
    this.current = this.root;
  }
  findPosition(header) {
    return parseInt(header.tagName.charAt(1), 10);
  }
  findParent(position) {
    let parent;
    while (position > 0) {
      position--;
      parent = this.stack[position];
      if (parent) return parent;
    }
  }
  findHeader({ firstChild: node }) {
    while (node) {
      if (/H[1-6]/.test(node.tagName)) {
        return node;
      }
      node = node.nextSibling;
    }
    return null;
  }

  addHeader(header) {
    const section = this.doc.createElement("section");
    const position = this.findPosition(header);

    section.appendChild(header);
    this.findParent(position).appendChild(section);
    this.stack[position] = section;
    this.stack.length = position + 1;
    this.current = section;
  }

  addSection(node, process) {
    const header = this.findHeader(node);
    const position = header ? this.findPosition(header) : 1;
    const parent = this.findParent(position);

    if (header) {
      node.removeChild(header);
    }

    node.appendChild(process(node));

    if (header) {
      node.prepend(header);
    }

    parent.appendChild(node);
    this.current = parent;
  }

  addElement(node) {
    this.current.appendChild(node);
  }
}

function structure(fragment, doc) {
  function process(root) {
    const stack = new Builder(doc);
    while (root.firstChild) {
      const node = root.firstChild;
      if (node.nodeType !== Node.ELEMENT_NODE) {
        root.removeChild(node);
        continue;
      }
      switch (node.localName) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          stack.addHeader(node);
          break;
        case "section":
          stack.addSection(node, process);
          break;
        default:
          stack.addElement(node);
      }
    }
    return stack.root;
  }
  return process(fragment);
}

/**
 * @param {Iterable<Element>} elements
 */
function substituteWithTextNodes(elements) {
  Array.from(elements).forEach(element => {
    element.replaceWith(element.textContent);
  });
}

const processMDSections = processElements("[data-format='markdown']:not(body)");
const processBlockLevelElements = processElements(
  "[data-format=markdown]:not(body), section, div, address, article, aside, figure, header, main, body"
);

function run$1(conf) {
  const hasMDSections = !!document.querySelector(
    "[data-format=markdown]:not(body)"
  );
  const isMDFormat = conf.format === "markdown";
  if (!isMDFormat && !hasMDSections) {
    return; // Nothing to be done
  }
  // Only has markdown-format sections
  if (!isMDFormat) {
    processMDSections(document.body)
      .map(elem => {
        const structuredInternals = structure(elem, elem.ownerDocument);
        return {
          structuredInternals,
          elem,
        };
      })
      .forEach(({ elem, structuredInternals }) => {
        elem.setAttribute("aria-busy", "true");
        if (
          structuredInternals.firstElementChild.localName === "section" &&
          elem.localName === "section"
        ) {
          const section = structuredInternals.firstElementChild;
          section.remove();
          elem.append(...section.childNodes);
        } else {
          elem.textContent = "";
        }
        elem.appendChild(structuredInternals);
        elem.setAttribute("aria-busy", "false");
      });
    return;
  }
  // We transplant the UI to do the markdown processing
  const rsUI = document.getElementById("respec-ui");
  rsUI.remove();
  // The new body will replace the old body
  const newHTML = document.createElement("html");
  const newBody = document.createElement("body");
  newBody.innerHTML = document.body.innerHTML;
  // Marked expects markdown be flush against the left margin
  // so we need to normalize the inner text of some block
  // elements.
  newHTML.appendChild(newBody);
  processBlockLevelElements(newHTML);
  // Process root level text nodes
  const cleanHTML = newBody.innerHTML
    // Markdown parsing sometimes inserts empty p tags
    .replace(/<p>\s*<\/p>/gm, "");
  newBody.innerHTML = cleanHTML;
  // Remove links where class .nolinks
  substituteWithTextNodes(newBody.querySelectorAll(".nolinks a[href]"));
  // Restructure the document properly
  const fragment = structure(newBody, document);
  // Frankenstein the whole thing back together
  newBody.appendChild(fragment);
  newBody.prepend(rsUI);
  document.body.replaceWith(newBody);
}

var markdown = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$3,
  markdownToHtml: markdownToHtml,
  run: run$1
});

/**
 * www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
var shortcut = {
  all_shortcuts: {}, //All the shortcuts are stored in this array
  add: function(shortcut_combination, callback, opt) {
    //Provide a set of default options
    var default_options = {
      type: "keydown",
      propagate: false,
      disable_in_input: false,
      target: document,
      keycode: false,
    };
    if (!opt) {
      opt = default_options;
    } else {
      for (var dfo in default_options) {
        if (typeof opt[dfo] == "undefined") opt[dfo] = default_options[dfo];
      }
    }

    var ele = opt.target;
    if (typeof opt.target == "string")
      ele = document.getElementById(opt.target);
    shortcut_combination = shortcut_combination.toLowerCase();

    //The function to be called at keypress
    var func = function(e) {
      var code;
      e = e || window.event;

      if (opt["disable_in_input"]) {
        //Don't enable shortcut keys in Input, Textarea fields
        var element;
        if (e.target) element = e.target;
        else if (e.srcElement) element = e.srcElement;
        if (element.nodeType == 3) element = element.parentNode;

        if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") return;
      }

      //Find Which key is pressed
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      var character = String.fromCharCode(code).toLowerCase();

      if (code == 188) character = ","; //If the user presses , when the type is onkeydown
      if (code == 190) character = "."; //If the user presses , when the type is onkeydown

      var keys = shortcut_combination.split("+");
      //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
      var kp = 0;

      //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
      var shift_nums = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ":",
        "'": '"',
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|",
      };
      //Special Keys - and their codes
      var special_keys = {
        esc: 27,
        escape: 27,
        tab: 9,
        space: 32,
        return: 13,
        enter: 13,
        backspace: 8,

        scrolllock: 145,
        scroll_lock: 145,
        scroll: 145,
        capslock: 20,
        caps_lock: 20,
        caps: 20,
        numlock: 144,
        num_lock: 144,
        num: 144,

        pause: 19,
        break: 19,

        insert: 45,
        home: 36,
        delete: 46,
        end: 35,

        pageup: 33,
        page_up: 33,
        pu: 33,

        pagedown: 34,
        page_down: 34,
        pd: 34,

        left: 37,
        up: 38,
        right: 39,
        down: 40,

        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
      };

      var modifiers = {
        shift: { wanted: false, pressed: false },
        ctrl: { wanted: false, pressed: false },
        alt: { wanted: false, pressed: false },
        meta: { wanted: false, pressed: false }, //Meta is Mac specific
      };

      if (e.ctrlKey) modifiers.ctrl.pressed = true;
      if (e.shiftKey) modifiers.shift.pressed = true;
      if (e.altKey) modifiers.alt.pressed = true;
      if (e.metaKey) modifiers.meta.pressed = true;

      for (var i = 0, k; (k = keys[i]), i < keys.length; i++) {
        //Modifiers
        if (k == "ctrl" || k == "control") {
          kp++;
          modifiers.ctrl.wanted = true;
        } else if (k == "shift") {
          kp++;
          modifiers.shift.wanted = true;
        } else if (k == "alt") {
          kp++;
          modifiers.alt.wanted = true;
        } else if (k == "meta") {
          kp++;
          modifiers.meta.wanted = true;
        } else if (k.length > 1) {
          //If it is a special key
          if (special_keys[k] == code) kp++;
        } else if (opt["keycode"]) {
          if (opt["keycode"] == code) kp++;
        } else {
          //The special keys did not match
          if (character == k) kp++;
          else {
            if (shift_nums[character] && e.shiftKey) {
              //Stupid Shift key bug created by using lowercase
              character = shift_nums[character];
              if (character == k) kp++;
            }
          }
        }
      }

      if (
        kp == keys.length &&
        modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
        modifiers.shift.pressed == modifiers.shift.wanted &&
        modifiers.alt.pressed == modifiers.alt.wanted &&
        modifiers.meta.pressed == modifiers.meta.wanted
      ) {
        callback(e);

        if (!opt["propagate"]) {
          //Stop the event
          //e.cancelBubble is supported by IE - this will kill the bubbling process.
          e.cancelBubble = true;
          e.returnValue = false;

          //e.stopPropagation works in Firefox.
          if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
          }
          return false;
        }
      }
    };
    this.all_shortcuts[shortcut_combination] = {
      callback: func,
      target: ele,
      event: opt["type"],
    };
    //Attach the function with the event
    if (ele.addEventListener) ele.addEventListener(opt["type"], func, false);
    else if (ele.attachEvent) ele.attachEvent("on" + opt["type"], func);
    else ele["on" + opt["type"]] = func;
  },

  //Remove the shortcut - just specify the shortcut and I will remove the binding
  // 'remove':function(shortcut_combination) {
  //  shortcut_combination = shortcut_combination.toLowerCase();
  //  var binding = this.all_shortcuts[shortcut_combination];
  //  delete(this.all_shortcuts[shortcut_combination])
  //  if(!binding) return;
  //  var type = binding['event'];
  //  var ele = binding['target'];
  //  var callback = binding['callback'];
  //
  //  if(ele.detachEvent) ele.detachEvent('on'+type, callback);
  //  else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
  //  else ele['on'+type] = false;
  // }
};

// @ts-check
const name$4 = "core/ui";

// Opportunistically inserts the style, with the chance to reduce some FOUC
insertStyle();

async function loadStyle() {
  try {
    return (await Promise.resolve().then(function () { return ui$3; })).default;
  } catch {
    return fetchAsset("ui.css");
  }
}

async function insertStyle() {
  const styleElement = document.createElement("style");
  styleElement.id = "respec-ui-styles";
  styleElement.textContent = await loadStyle();
  styleElement.classList.add("removeOnSave");
  document.head.appendChild(styleElement);
  return styleElement;
}

function ariaDecorate(elem, ariaMap) {
  if (!elem) {
    return;
  }
  Array.from(ariaMap).forEach(([name, value]) => {
    elem.setAttribute(`aria-${name}`, value);
  });
}

const respecUI = hyperHTML$1`<div id='respec-ui' class='removeOnSave' hidden></div>`;
const menu = hyperHTML$1`<ul id=respec-menu role=menu aria-labelledby='respec-pill' hidden></ul>`;
let modal;
let overlay;
const errors = [];
const warnings = [];
const buttons = {};

sub("start-all", () => document.body.prepend(respecUI), { once: true });
sub("end-all", () => document.body.prepend(respecUI), { once: true });

const respecPill = hyperHTML$1`<button id='respec-pill' disabled>ReSpec</button>`;
respecUI.appendChild(respecPill);
respecPill.addEventListener("click", e => {
  e.stopPropagation();
  if (menu.hidden) {
    menu.classList.remove("respec-hidden");
    menu.classList.add("respec-visible");
  } else {
    menu.classList.add("respec-hidden");
    menu.classList.remove("respec-visible");
  }
  respecPill.setAttribute("aria-expanded", String(menu.hidden));
  menu.hidden = !menu.hidden;
});
document.documentElement.addEventListener("click", () => {
  if (!menu.hidden) {
    menu.classList.remove("respec-visible");
    menu.classList.add("respec-hidden");
    menu.hidden = true;
  }
});
respecUI.appendChild(menu);

const ariaMap = new Map([
  ["controls", "respec-menu"],
  ["expanded", "false"],
  ["haspopup", "true"],
  ["label", "ReSpec Menu"],
]);
ariaDecorate(respecPill, ariaMap);

function errWarn(msg, arr, butName, title) {
  arr.push(msg);
  if (!buttons.hasOwnProperty(butName)) {
    buttons[butName] = createWarnButton(butName, arr, title);
    respecUI.appendChild(buttons[butName]);
  }
  buttons[butName].textContent = arr.length;
}

function createWarnButton(butName, arr, title) {
  const buttonId = `respec-pill-${butName}`;
  const button = hyperHTML$1`<button id='${buttonId}' class='respec-info-button'>`;
  button.addEventListener("click", () => {
    button.setAttribute("aria-expanded", "true");
    const ol = hyperHTML$1`<ol class='${`respec-${butName}-list`}'></ol>`;
    for (const err of arr) {
      const fragment = document
        .createRange()
        .createContextualFragment(markdownToHtml(err));
      const li = document.createElement("li");
      // if it's only a single element, just copy the contents into li
      if (fragment.firstElementChild === fragment.lastElementChild) {
        li.append(...fragment.firstElementChild.childNodes);
        // Otherwise, take everything.
      } else {
        li.appendChild(fragment);
      }
      ol.appendChild(li);
    }
    ui.freshModal(title, ol, button);
  });
  const ariaMap = new Map([
    ["expanded", "false"],
    ["haspopup", "true"],
    ["controls", `respec-pill-${butName}-modal`],
    ["label", `Document ${title.toLowerCase()}`],
  ]);
  ariaDecorate(button, ariaMap);
  return button;
}

const ui = {
  show() {
    try {
      respecUI.hidden = false;
    } catch (err) {
      console.error(err);
    }
  },
  hide() {
    respecUI.hidden = true;
  },
  enable() {
    respecPill.removeAttribute("disabled");
  },
  addCommand(label, handler, keyShort, icon) {
    icon = icon || "";
    const id = `respec-button-${label.toLowerCase().replace(/\s+/, "-")}`;
    const button = hyperHTML$1`<button id="${id}" class="respec-option" title="${keyShort}">
      <span class="respec-cmd-icon">${icon}</span> ${label}…
    </button>`;
    const menuItem = hyperHTML$1`<li role=menuitem>${button}</li>`;
    menuItem.addEventListener("click", handler);
    menu.appendChild(menuItem);
    if (keyShort) shortcut.add(keyShort, handler);
    return button;
  },
  error(msg) {
    errWarn(msg, errors, "error", "Errors");
  },
  warning(msg) {
    errWarn(msg, warnings, "warning", "Warnings");
  },
  closeModal(owner) {
    if (overlay) {
      overlay.classList.remove("respec-show-overlay");
      overlay.classList.add("respec-hide-overlay");
      overlay.addEventListener("transitionend", () => {
        overlay.remove();
        overlay = null;
      });
    }
    if (owner) {
      owner.setAttribute("aria-expanded", "false");
    }
    if (!modal) return;
    modal.remove();
    modal = null;
  },
  freshModal(title, content, currentOwner) {
    if (modal) modal.remove();
    if (overlay) overlay.remove();
    overlay = hyperHTML$1`<div id='respec-overlay' class='removeOnSave'></div>`;
    const id = `${currentOwner.id}-modal`;
    const headingId = `${id}-heading`;
    modal = hyperHTML$1`<div id='${id}' class='respec-modal removeOnSave' role='dialog'>
      <h3 id="${headingId}">${title}</h3>
      <div class='inside'>${content}</div>
    </div>`;
    const ariaMap = new Map([["labelledby", headingId]]);
    ariaDecorate(modal, ariaMap);
    document.body.append(overlay, modal);
    overlay.addEventListener("click", () => this.closeModal(currentOwner));
    overlay.classList.toggle("respec-show-overlay");
    modal.hidden = false;
  },
};
shortcut.add("Esc", () => ui.closeModal());
shortcut.add("Ctrl+Alt+Shift+E", () => {
  if (buttons.error) buttons.error.click();
});
shortcut.add("Ctrl+Alt+Shift+W", () => {
  if (buttons.warning) buttons.warning.click();
});
window.respecUI = ui;
sub("error", details => ui.error(details));
sub("warn", details => ui.warning(details));

var ui$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$4,
  ui: ui
});

// @ts-check
/**
 * Removes common indents across the IDL texts,
 * so that indentation inside <pre> won't affect the rendered result.
 * @param {string} text IDL text
 */

const name$5 = "core/reindent";

/**
 * @param {string} text
 */
function reindent(text) {
  if (!text) {
    return text;
  }
  // TODO: use trimEnd when Edge supports it
  const lines = text.trimRight().split("\n");
  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }
  const indents = lines.filter(s => s.trim()).map(s => s.search(/[^\s]/));
  const leastIndent = Math.min(...indents);
  return lines.map(s => s.slice(leastIndent)).join("\n");
}

function run$2() {
  for (const pre of document.getElementsByTagName("pre")) {
    pre.innerHTML = reindent(pre.innerHTML);
  }
}

var reindent$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$5,
  run: run$2
});

// @ts-check
const name$6 = "core/location-hash";

function run$3() {
  // Added message for legacy compat with Aria specs
  // See https://github.com/w3c/respec/issues/793
  pub("start", "core/location-hash");
  if (!location.hash) {
    return;
  }
  document.respecIsReady.then(() => {
    let hash = decodeURIComponent(location.hash).substr(1);
    const hasLink = document.getElementById(hash);
    const isLegacyFrag = /\W/.test(hash);
    // Allow some degree of recovery for legacy fragments format.
    // See https://github.com/w3c/respec/issues/1353
    if (!hasLink && isLegacyFrag) {
      const id = hash
        .replace(/[\W]+/gim, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
      if (document.getElementById(id)) {
        hash = id;
      }
    }
    location.hash = `#${hash}`;
  });
}

var locationHash = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$6,
  run: run$3
});

// @ts-check
/**
 * @typedef {object} LinterResult
 * @property {string} description
 * @property {string} help
 * @property {string} howToFix
 * @property {string} name
 * @property {number} occurrences
 * @property {HTMLElement[]} offendingElements
 *
 * @typedef {(conf: any, doc: Document) => (LinterResult | Promise<LinterResult>)} LintingFunction
 */

/** @type {WeakMap<LinterRule, { name: string, lintingFunction: LintingFunction }>} */
const privs = new WeakMap();

/**
 * Checks if the linter rule is enabled.
 *
 * @param {Object} conf ReSpec config object.
 * @param {string} name linter rule name
 */
function canLint(conf, name) {
  return !(
    conf.hasOwnProperty("lint") === false ||
    conf.lint === false ||
    !conf.lint[name]
  );
}

class LinterRule {
  /**
   *
   * @param {String} name the name of the rule
   * @param {LintingFunction} lintingFunction
   */
  constructor(name, lintingFunction) {
    privs.set(this, { name, lintingFunction });
  }
  get name() {
    return privs.get(this).name;
  }
  /**
   * Runs linter rule.
   *
   * @param {Object} conf The ReSpec config.
   * @param {Document} doc The document to be checked.
   */
  lint(conf = { lint: { [this.name]: false } }, doc = document) {
    if (canLint(conf, this.name)) {
      return privs.get(this).lintingFunction(conf, doc);
    }
  }
}

// @ts-check

const name$7 = "check-charset";
const meta = {
  en: {
    description: `Document must only contain one \`<meta>\` tag with charset set to 'utf-8'`,
    howToFix: `Add this line in your document \`<head>\` section - \`<meta charset="utf-8">\` or set charset to "utf-8" if not set already.`,
  },
};

// Fall back to english, if language is missing
const lang$1 = lang in meta ? lang : "en";

/**
 * Runs linter rule.
 *
 * @param {Object} _ The ReSpec config.
 * @param {Document} doc The document to be checked.
 */
function linterFunction(_, doc) {
  const metas = doc.querySelectorAll("meta[charset]");
  const val = [];
  for (const meta of metas) {
    val.push(
      meta
        .getAttribute("charset")
        .trim()
        .toLowerCase()
    );
  }
  const utfExists = val.includes("utf-8");

  // only a single meta[charset] and is set to utf-8, correct case
  if (utfExists && metas.length === 1) {
    return [];
  }
  // if more than one meta[charset] tag defined along with utf-8
  // or
  // no meta[charset] present in the document
  return {
    name: name$7,
    occurrences: metas.length,
    ...meta[lang$1],
  };
}
const rule = new LinterRule(name$7, linterFunction);

// @ts-check

const name$8 = "check-internal-slots";

const meta$1 = {
  en: {
    description: "Internal slots should be preceded by a '.'",
    howToFix: "Add a '.' between the elements mentioned.",
    help: "See developer console.",
  },
};

// Fall back to english, if language is missing
const lang$2 = lang in meta$1 ? lang : "en";

/**
 * Runs linter rule.
 * @param {Object} _ The ReSpec config.
 * @param {Document} doc The document to be checked.
 * @return {import("../../core/LinterRule").LinterResult}
 */
function linterFunction$1(_, doc) {
  const offendingElements = [...doc.querySelectorAll("var+a")].filter(
    ({ previousSibling: { nodeName } }) => {
      const isPrevVar = nodeName && nodeName === "VAR";
      return isPrevVar;
    }
  );

  if (!offendingElements.length) {
    return;
  }

  return {
    name: name$8,
    offendingElements,
    occurrences: offendingElements.length,
    ...meta$1[lang$2],
  };
}

const rule$1 = new LinterRule(name$8, linterFunction$1);

// @ts-check

const name$9 = "check-punctuation";
const punctuationMarks = [".", ":", "!", "?"];
const humanMarks = punctuationMarks.map(mark => `"${mark}"`).join(", ");
const meta$2 = {
  en: {
    description: "`p` elements should end with a punctuation mark.",
    howToFix: `Please make sure \`p\` elements end with one of: ${humanMarks}.`,
  },
};
// Fall back to english, if language is missing
const lang$3 = lang in meta$2 ? lang : "en";

/**
 * Runs linter rule.
 *
 * @param {Object} _ The ReSpec config.
 * @param  {Document} doc The document to be checked.
 * @return {import("../../core/LinterRule").LinterResult}
 */
function lintingFunction(_, doc) {
  // Check string ends with one of ., !, ?, :, ], or is empty.
  const punctuatingRegExp = new RegExp(
    `[${punctuationMarks.join("")}\\]]$|^ *$`,
    "m"
  );
  const offendingElements = [
    ...doc.querySelectorAll("p:not(#back-to-top)"),
  ].filter(elem => !punctuatingRegExp.test(elem.textContent.trim()));
  if (!offendingElements.length) {
    return;
  }
  return {
    name: name$9,
    offendingElements,
    occurrences: offendingElements.length,
    ...meta$2[lang$3],
  };
}
const rule$2 = new LinterRule(name$9, lintingFunction);

// @ts-check
const name$a = "core/linter";

/** @type {WeakMap<Linter, { rules: Set<import("./LinterRule").default> }>} */
const privates = new WeakMap();

class Linter {
  constructor() {
    privates.set(this, {
      rules: new Set(),
    });
  }
  get rules() {
    return privates.get(this).rules;
  }
  /**
   * @param  {...import("./LinterRule").default} newRules
   */
  register(...newRules) {
    newRules.forEach(newRule => this.rules.add(newRule));
  }
  async lint(conf, doc = window.document) {
    const promisesToLint = [...privates.get(this).rules].map(rule =>
      toLinterWarning(rule.lint(conf, doc))
    );
    await promisesToLint;
  }
}

const linter = new Linter();

const baseResult = {
  name: "unknown",
  description: "",
  occurrences: 0,
  howToFix: "",
  offendingElements: [], // DOM Nodes
  help: "", // where to get help
};

/**
 * @typedef {import("./LinterRule").LinterResult} LinterResult
 * @param {LinterResult | Promise<LinterResult>} [resultPromise]
 */
async function toLinterWarning(resultPromise) {
  const result = await resultPromise;
  if (!result) {
    return;
  }
  const output = { ...baseResult, ...result };
  const {
    description,
    help,
    howToFix,
    name,
    occurrences,
    offendingElements,
  } = output;
  const message = `Linter (${name}): ${description} ${howToFix} ${help}`;
  if (offendingElements.length) {
    showInlineWarning(offendingElements, `${message} Occured`);
  } else {
    pub("warn", `${message} (Count: ${occurrences})`);
  }
}

function run$4(conf) {
  if (conf.lint === false) {
    return; // nothing to do
  }
  // return early, continue processing other things
  (async () => {
    await document.respecIsReady;
    try {
      await linter.lint(conf, document);
    } catch (err) {
      console.error("Error ocurred while running the linter", err);
    }
  })();
}

var linter$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$a,
  'default': linter,
  run: run$4
});

// @ts-check

const name$b = "local-refs-exist";

const meta$3 = {
  en: {
    description: "Broken local reference found in document.",
    howToFix: "Please fix the links mentioned.",
    help: "See developer console.",
  },
};

// Fall back to english, if language is missing
const lang$4 = lang in meta$3 ? lang : "en";

/**
 * Runs linter rule.
 * @param {Object} _ The ReSpec config.
 * @param  {Document} doc The document to be checked.
 * @return {import("../../core/LinterRule").LinterResult}
 */
function linterFunction$2(_, doc) {
  const offendingElements = [...doc.querySelectorAll("a[href^='#']")].filter(
    isBrokenHyperlink
  );
  if (!offendingElements.length) {
    return;
  }
  return {
    name: name$b,
    offendingElements,
    occurrences: offendingElements.length,
    ...meta$3[lang$4],
  };
}

const rule$3 = new LinterRule(name$b, linterFunction$2);

function isBrokenHyperlink(elem) {
  const id = elem.getAttribute("href").substring(1);
  return !elem.ownerDocument.getElementById(id);
}

// @ts-check
const name$c = "no-headingless-sections";
const meta$4 = {
  en: {
    description: "All sections must start with a `h2-6` element.",
    howToFix: "Add a `h2-6` to the offending section or use a `<div>`.",
    help: "See developer console.",
  },
  nl: {
    description: "Alle secties moeten beginnen met een `h2-6` element.",
    howToFix:
      "Voeg een `h2-6` toe aan de conflicterende sectie of gebruik een `<div>`.",
    help: "Zie de developer console.",
  },
};

// Fall back to english, if language is missing
const lang$5 = lang in meta$4 ? lang : "en";
const hasNoHeading = ({ firstElementChild: elem }) => {
  return elem === null || /^h[1-6]$/.test(elem.localName) === false;
};

/**
 * @param {*} _
 * @param {Document} doc
 * @return {import("../../core/LinterRule").LinterResult}
 */
function linterFunction$3(_, doc) {
  const offendingElements = [...doc.querySelectorAll("section")].filter(
    hasNoHeading
  );
  if (!offendingElements.length) {
    return;
  }
  return {
    name: name$c,
    offendingElements,
    occurrences: offendingElements.length,
    ...meta$4[lang$5],
  };
}
const rule$4 = new LinterRule(name$c, linterFunction$3);

// @ts-check

const name$d = "no-http-props";

const meta$5 = {
  en: {
    description: "Insecure URLs are not allowed in `respecConfig`.",
    howToFix: "Please change the following properties to 'https://': ",
  },
};

// Fall back to english, if language is missing
const lang$6 = lang in meta$5 ? lang : "en";

/**
 * Runs linter rule.
 *
 * @param {Object} conf The ReSpec config.
 * @param {Document} doc The document to be checked.
 */
function lintingFunction$1(conf, doc) {
  // We can only really perform this check over http/https
  if (!doc.location.href.startsWith("http")) {
    return;
  }
  const offendingMembers = Object.getOwnPropertyNames(conf)
    // this check is cheap, "prevED" is w3c exception.
    .filter(key => key.endsWith("URI") || key === "prevED")
    // this check is expensive, so separate step
    .filter(key =>
      new URL(conf[key], doc.location.href).href.startsWith("http://")
    );
  if (!offendingMembers.length) {
    return;
  }
  /** @type {import("../../core/LinterRule").LinterResult} */
  const result = {
    name: name$d,
    occurrences: offendingMembers.length,
    ...meta$5[lang$6],
  };
  result.howToFix += `${offendingMembers
    .map(item => `\`${item}\``)
    .join(", ")}.`;
  return result;
}

const rule$5 = new LinterRule(name$d, lintingFunction$1);

// @ts-check
const name$e = "privsec-section";
const meta$6 = {
  en: {
    description:
      "Document must a 'Privacy and/or Security' Considerations section.",
    howToFix: "Add a privacy and/or security considerations section.",
    help:
      "See the [Self-Review Questionnaire](https://w3ctag.github.io/security-questionnaire/).",
  },
};

// Fall back to english, if language is missing
const lang$7 = lang in meta$6 ? lang : "en";

function hasPriSecConsiderations(doc) {
  return Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6")).some(
    ({ textContent: text }) => {
      const saysPrivOrSec = /(privacy|security)/im.test(text);
      const saysConsiderations = /(considerations)/im.test(text);
      return (saysPrivOrSec && saysConsiderations) || saysPrivOrSec;
    }
  );
}

/**
 * @param {*} conf
 * @param {Document} doc
 * @return {import("../LinterRule").LinterResult}
 */
function lintingFunction$2(conf, doc) {
  if (conf.isRecTrack && !hasPriSecConsiderations(doc)) {
    return { name: name$e, occurrences: 1, ...meta$6[lang$7] };
  }
}

const rule$6 = new LinterRule(name$e, lintingFunction$2);

// @ts-check

linter.register(
  rule$5,
  rule$4,
  rule$2,
  rule$3,
  rule$1,
  rule,
  rule$6
);

const coreDefaults = {
  lint: {
    "no-headingless-sections": true,
    "no-http-props": true,
    "check-punctuation": false,
    "local-refs-exist": true,
    "check-internal-slots": false,
    "check-charset": false,
    "privsec-section": false,
  },
  pluralize: false,
  specStatus: "base",
  highlightVars: true,
  addSectionLinks: true,
};

// @ts-check
/**
 * Sets the defaults for Geonovum documents
 */
const name$f = "geonovum/defaults";

linter.register(rule$6);

const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
  ],
  [
    "cc-by-nd",
    {
      name:
        "Creative Commons Attribution-NoDerivatives 4.0 International Public License",
      short: "CC-BY-ND",
      url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
    },
  ],
]);

const geonovumDefaults = {
  lint: {
    "privsec-section": true,
  },
  doJsonLd: true,
  license: "cc-by",
  specStatus: "GN-BASIS",
  logos: [
    {
      src: "https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg",
      alt: "Geonovum",
      id: "Geonovum",
      height: 67,
      width: 132,
      url: "https://www.geonovum.nl/",
    },
  ],
};

function computeProps(conf) {
  return {
    isCCBY: conf.license === "cc-by",
    licenseInfo: licenses.get(conf.license),
    isBasic: conf.specStatus === "GN-BASIS",
    isRegular: conf.specStatus === "GN-BASIS",
  };
}

function run$5(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...geonovumDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...geonovumDefaults,
    ...conf,
    lint,
  });
  // computed properties
  Object.assign(conf, computeProps(conf));
}

var defaults = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$f,
  run: run$5
});

// @ts-check
const name$g = "core/style";

// Opportunistically inserts the style, with the chance to reduce some FOUC
const styleElement = insertStyle$1();

async function loadStyle$1() {
  try {
    return (await Promise.resolve().then(function () { return respec2$1; })).default;
  } catch {
    return fetchAsset("respec2.css");
  }
}

async function insertStyle$1() {
  const styleElement = document.createElement("style");
  styleElement.id = "respec-mainstyle";
  styleElement.textContent = await loadStyle$1();
  document.head.appendChild(styleElement);
  return styleElement;
}

async function run$6(conf) {
  if (conf.noReSpecCSS) {
    (await styleElement).remove();
  }
}

var style = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$g,
  run: run$6
});

// @ts-check
const name$h = "geonovum/style";
function attachFixupScript(doc, version) {
  const script = doc.createElement("script");
  script.addEventListener(
    "load",
    () => {
      if (window.location.hash) {
        window.location.href = window.location.hash;
      }
    },
    { once: true }
  );
  script.src = `https://www.w3.org/scripts/TR/${version}/fixup.js`;
  doc.body.appendChild(script);
}

/**
 * Make a best effort to attach meta viewport at the top of the head.
 * Other plugins might subsequently push it down, but at least we start
 * at the right place. When ReSpec exports the HTML, it again moves the
 * meta viewport to the top of the head - so to make sure it's the first
 * thing the browser sees. See js/ui/save-html.js.
 */
function createMetaViewport() {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  const contentProps = {
    width: "device-width",
    "initial-scale": "1",
    "shrink-to-fit": "no",
  };
  meta.content = toKeyValuePairs(contentProps).replace(/"/g, "");
  return meta;
}

function createStyle(css_name) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://tools.geostandaarden.nl/respec/style/${css_name}.css`;
  return link;
}

function createResourceHints() {
  const resourceHints = [
    {
      hint: "preconnect", // for W3C fixup.js
      href: "https://www.w3.org",
    },
    {
      hint: "preload", // all specs need it, and we attach it on end-all.
      href: "https://www.w3.org/scripts/TR/2016/fixup.js",
      as: "script",
    },
    {
      hint: "preconnect", // for Geonovum styles and scripts.
      href: "https://tools.geostandaarden.nl/",
    },
    {
      hint: "preload", // all Geonovum specs import base.css.
      href: "https://tools.geostandaarden.nl/respec/style/base.css",
      as: "style",
    },
    {
      hint: "preload", // all Geonovum specs show the logo.
      href: "https://tools.geostandaarden.nl/respec/style/logos/Geonovum.svg",
      as: "image",
    },
  ]
    .map(createResourceHint)
    .reduce((frag, link) => {
      frag.appendChild(link);
      return frag;
    }, document.createDocumentFragment());
  return resourceHints;
}

// Collect elements for insertion (document fragment)
const elements = createResourceHints();

// add favicon for Geonovum
const favicon = document.createElement("link");
favicon.rel = "shortcut icon";
favicon.type = "image/x-icon";
favicon.href =
  "https://tools.geostandaarden.nl/respec/style/logos/Geonovum.ico";
document.head.prepend(favicon);

if (!document.head.querySelector("meta[name=viewport]")) {
  // Make meta viewport the first element in the head.
  elements.prepend(createMetaViewport());
}

document.head.prepend(elements);

// export function run(conf, doc, cb) {
function run$7(conf) {
  if (!conf.specStatus) {
    const warn = "`respecConfig.specStatus` missing. Defaulting to 'GN-BASIS'.";
    conf.specStatus = "GN-BASIS";
    pub("warn", warn);
  }

  if (document.body.querySelector("figure.scalable")) {
    // Apply leaflet style if class scalable is present
    document.head.appendChild(createStyle("leaflet"));
    document.head.appendChild(createStyle("font-awesome"));
  }

  let styleFile = "";

  // Figure out which style file to use.
  switch (conf.specStatus.toUpperCase()) {
    case "GN-WV":
      styleFile += "GN-WV.css";
      break;
    case "GN-CV":
      styleFile += "GN-CV.css";
      break;
    case "GN-VV":
      styleFile += "GN-VV.css";
      break;
    case "GN-DEF":
      styleFile += "GN-DEF.css";
      break;
    case "GN-BASIS":
      styleFile += "GN-BASIS.css";
      break;
    default:
      styleFile = "base.css";
  }

  if (!conf.noToc) {
    sub(
      "end-all",
      () => {
        attachFixupScript(document, "2016");
      },
      { once: true }
    );
  }
  const finalStyleURL = `https://tools.geostandaarden.nl/respec/style/${styleFile}`;
  linkCSS(document, finalStyleURL);
}

var style$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$h,
  run: run$7
});

// @ts-check
const name$i = "geonovum/l10n";
const additions = {
  en: {
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current Geonovum publications and the latest revision of this document can be found via <a href='https://www.geonovum.nl/geo-standaarden/alle-standaarden'>https://www.geonovum.nl/geo-standaarden/alle-standaarden</a>(in Dutch).",
  },
  nl: {
    status_at_publication:
      "Deze paragraaf beschrijft de status van dit document ten tijde van publicatie. Het is mogelijk dat er actuelere versies van dit document bestaan. Een lijst van Geonovum publicaties en de laatste gepubliceerde versie van dit document zijn te vinden op <a href='https://www.geonovum.nl/geo-standaarden/alle-standaarden'>https://www.geonovum.nl/geo-standaarden/alle-standaarden</a>.",
  },
};

Object.keys(additions).forEach(key => {
  Object.assign(l10n[key], additions[key]);
});

var l10n$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$i
});

// @ts-check
const name$j = "core/github";

const localizationStrings = {
  en: {
    file_a_bug: "File a bug",
    participate: "Participate",
    commit_history: "Commit history",
  },
  nl: {
    commit_history: "Revisiehistorie",
    file_a_bug: "Dien een melding in",
    participate: "Doe mee",
  },
  es: {
    commit_history: "Historia de cambios",
    file_a_bug: "Nota un bug",
    participate: "Participe",
  },
};
const lang$8 = lang in localizationStrings ? lang : "en";
const l10n$3 = localizationStrings[lang$8];

async function run$8(conf) {
  if (!conf.hasOwnProperty("github") || !conf.github) {
    // nothing to do, bail out.
    return;
  }
  if (
    typeof conf.github === "object" &&
    !conf.github.hasOwnProperty("repoURL")
  ) {
    const msg =
      "Config option `[github](https://github.com/w3c/respec/wiki/github)` " +
      "is missing property `repoURL`.";
    pub("error", msg);
    return;
  }
  let tempURL = conf.github.repoURL || conf.github;
  if (!tempURL.endsWith("/")) tempURL += "/";
  let ghURL;
  try {
    ghURL = new URL(tempURL, "https://github.com");
  } catch {
    pub("error", `\`respecConf.github\` is not a valid URL? (${ghURL})`);
    return;
  }
  if (ghURL.origin !== "https://github.com") {
    const msg = `\`respecConf.github\` must be HTTPS and pointing to GitHub. (${ghURL})`;
    pub("error", msg);
    return;
  }
  const [org, repo] = ghURL.pathname.split("/").filter(item => item);
  if (!org || !repo) {
    const msg =
      "`respecConf.github` URL needs a path with, for example, w3c/my-spec";
    pub("error", msg);
    return;
  }
  const branch = conf.github.branch || "gh-pages";
  const issueBase = new URL("./issues/", ghURL).href;
  const newProps = {
    edDraftURI: `https://${org.toLowerCase()}.github.io/${repo}/`,
    githubToken: undefined,
    githubUser: undefined,
    issueBase,
    atRiskBase: issueBase,
    otherLinks: [],
    pullBase: new URL("./pulls/", ghURL).href,
    shortName: repo,
  };
  const otherLink = {
    key: l10n$3.participate,
    data: [
      {
        value: `GitHub ${org}/${repo}`,
        href: ghURL,
      },
      {
        value: l10n$3.file_a_bug,
        href: newProps.issueBase,
      },
      {
        value: l10n$3.commit_history,
        href: new URL(`./commits/${branch}`, ghURL.href).href,
      },
      {
        value: "Pull requests",
        href: newProps.pullBase,
      },
    ],
  };
  // Assign new properties, but retain existing ones
  let githubAPI = `https://respec.org/github/${org}/${repo}/`;
  if (conf.githubAPI) {
    if (new URL(conf.githubAPI).hostname === window.parent.location.hostname) {
      // for testing
      githubAPI = conf.githubAPI;
    } else {
      const msg = "`respecConfig.githubAPI` should not be added manually.";
      pub("warn", msg);
    }
  }
  const normalizedGHObj = {
    branch,
    repoURL: ghURL.href,
  };

  const normalizedConfig = {
    ...newProps,
    ...conf,
    github: normalizedGHObj,
    githubAPI,
  };
  Object.assign(conf, normalizedConfig);
  conf.otherLinks.unshift(otherLink);
}

var github = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$j,
  run: run$8
});

// @ts-check

const name$k = "core/data-include";

function processResponse(rawData, id, url) {
  /** @type {HTMLElement} */
  const el = document.querySelector(`[data-include-id=${id}]`);
  const doc = el.ownerDocument;
  const data = runTransforms(rawData, el.dataset.oninclude, url);
  const replace = typeof el.dataset.includeReplace === "string";
  let replacementNode;
  switch (el.dataset.includeFormat) {
    case "text":
      if (replace) {
        replacementNode = doc.createTextNode(data);
        el.replaceWith(replacementNode);
      } else {
        el.textContent = data;
      }
      break;
    default:
      // html, which is just using "innerHTML"
      el.innerHTML = data;
      if (replace) {
        replacementNode = doc.createDocumentFragment();
        while (el.hasChildNodes()) {
          replacementNode.append(el.removeChild(el.firstChild));
        }
        el.replaceWith(replacementNode);
      }
  }
  // If still in the dom tree, clean up
  if (doc.contains(el)) {
    cleanUp(el);
  }
}
/**
 * Removes attributes after they are used for inclusion, if present.
 *
 * @param {Element} el The element to clean up.
 */
function cleanUp(el) {
  [
    "data-include",
    "data-include-format",
    "data-include-replace",
    "data-include-id",
    "oninclude",
  ].forEach(attr => el.removeAttribute(attr));
}

async function run$9() {
  /** @type {NodeListOf<HTMLElement>} */
  const includables = document.querySelectorAll("[data-include]");

  const promisesToInclude = Array.from(includables).map(async el => {
    const url = el.dataset.include;
    if (!url) {
      return; // just skip it
    }
    const id = `include-${String(Math.random()).substr(2)}`;
    el.dataset.includeId = id;
    try {
      const response = await fetch(url);
      const text = await response.text();
      processResponse(text, id, url);
    } catch (err) {
      const msg = `\`data-include\` failed: \`${url}\` (${err.message}). See console for details.`;
      console.error("data-include failed for element: ", el, err);
      pub("error", msg);
    }
  });
  await Promise.all(promisesToInclude);
}

var dataInclude = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$k,
  run: run$9
});

// @ts-check

const name$l = "core/data-transform";

function run$a() {
  /** @type {NodeListOf<HTMLElement>} */
  const transformables = document.querySelectorAll("[data-transform]");
  transformables.forEach(el => {
    el.innerHTML = runTransforms(el.innerHTML, el.dataset.transform);
    el.removeAttribute("data-transform");
  });
}

var dataTransform = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$l,
  run: run$a
});

// @ts-check
const idlPrimitiveRegex = /^[a-z]+(\s+[a-z]+)+$/; // {{unrestricted double}} {{ double }}
const exceptionRegex = /\B"([^"]*)"\B/; // {{ "SomeException" }}
const methodRegex = /(\w+)\((.*)\)$/;
const slotRegex = /^\[\[(\w+)\]\]$/;
// matches: `value` or `[[value]]`
// NOTE: [[value]] is actually a slot, but database has this as type="attribute"
const attributeRegex = /^((?:\[\[)?(?:\w+)(?:\]\])?)$/;
const enumRegex = /^(\w+)\["([\w- ]*)"\]$/;
// TODO: const splitRegex = /(?<=\]\]|\b)\./
// https://github.com/w3c/respec/pull/1848/files#r225087385
const methodSplitRegex = /\.?(\w+\(.*\)$)/;

/**
 * @typedef {object} IdlBase
 * @property {"base"} type
 * @property {string} identifier
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlAttribute
 * @property {"attribute"} type
 * @property {string} identifier
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlInternalSlot
 * @property {"internal-slot"} type
 * @property {string} identifier
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlMethod
 * @property {"method"} type
 * @property {string} identifier
 * @property {string[]} args
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlEnum
 * @property {"enum"} type
 * @property {string} [identifier]
 * @property {string} enumValue
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlException
 * @property {"exception"} type
 * @property {string} identifier
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {object} IdlPrimitive
 * @property {"idl-primitive"} type
 * @property {string} identifier
 * @property {boolean} renderParent
 * @property {InlineIdl | null} [parent]
 *
 * @typedef {IdlBase | IdlAttribute | IdlInternalSlot | IdlMethod | IdlEnum | IdlException | IdlPrimitive} InlineIdl
 */

/**
 * @param {string} str
 * @returns {InlineIdl[]}
 */
function parseInlineIDL(str) {
  const [nonMethodPart, methodPart] = str.split(methodSplitRegex);
  const tokens = nonMethodPart
    .split(/[./]/)
    .concat(methodPart)
    .filter(s => s && s.trim())
    .map(s => s.trim());
  const renderParent = !str.includes("/");
  /** @type {InlineIdl[]} */
  const results = [];
  while (tokens.length) {
    const value = tokens.pop();
    // Method
    if (methodRegex.test(value)) {
      const [, identifier, allArgs] = value.match(methodRegex);
      const args = allArgs.split(/,\s*/).filter(arg => arg);
      results.push({ type: "method", identifier, args, renderParent });
      continue;
    }
    // Enum["enum value"]
    if (enumRegex.test(value)) {
      const [, identifier, enumValue] = value.match(enumRegex);
      results.push({ type: "enum", identifier, enumValue, renderParent });
      continue;
    }
    // Exception - "NotAllowedError"
    // Or alternate enum syntax: {{ EnumContainer / "some enum value" }}
    if (exceptionRegex.test(value)) {
      const [, identifier] = value.match(exceptionRegex);
      if (renderParent) {
        results.push({ type: "exception", identifier });
      } else {
        results.push({ type: "enum", enumValue: identifier, renderParent });
      }
      continue;
    }
    // internal slot
    if (slotRegex.test(value)) {
      const [, identifier] = value.match(slotRegex);
      results.push({ type: "internal-slot", identifier, renderParent });
      continue;
    }
    // attribute
    if (attributeRegex.test(value) && tokens.length) {
      const [, identifier] = value.match(attributeRegex);
      results.push({ type: "attribute", identifier, renderParent });
      continue;
    }
    if (idlPrimitiveRegex.test(value)) {
      results.push({ type: "idl-primitive", identifier: value, renderParent });
      continue;
    }
    // base, always final token
    if (attributeRegex.test(value) && tokens.length === 0) {
      results.push({ type: "base", identifier: value, renderParent });
      continue;
    }
    throw new SyntaxError(`IDL micro-syntax parsing error in \`{{ ${str} }}\``);
  }
  // link the list
  results.forEach((item, i, list) => {
    item.parent = list[i + 1] || null;
  });
  // return them in the order we found them...
  return results.reverse();
}

/**
 * @param {IdlBase} details
 */
function renderBase(details) {
  // Check if base is a local variable in a section
  const { identifier, renderParent } = details;
  if (renderParent) {
    return hyperHTML$1`<a data-xref-type="_IDL_">${identifier}</a>`;
  }
}

/**
 * Internal slot: .[[identifier]] or [[identifier]]
 * @param {IdlInternalSlot} details
 */
function renderInternalSlot(details) {
  const { identifier, parent, renderParent } = details;
  const { identifier: linkFor } = parent || {};
  const lt = `[[${identifier}]]`;
  const html = hyperHTML$1`${parent && renderParent ? "." : ""}[[<a
    data-xref-type="attribute"
    data-link-for=${linkFor}
    data-xref-for=${linkFor}
    data-lt="${lt}">${identifier}</a>]]`;
  return html;
}

/**
 * Attribute: .identifier
 * @param {IdlAttribute} details
 */
function renderAttribute(details) {
  const { parent, identifier, renderParent } = details;
  const { identifier: linkFor } = parent || {};
  const html = hyperHTML$1`${renderParent ? "." : ""}<a
      data-xref-type="attribute|dict-member"
<<<<<<< gh-pages
      data-link-for="${o}"
      data-xref-for="${o}"
    >${n}</a>`}function renderMethod(e){const{args:t,identifier:n,type:r,parent:o,renderParent:i}=e,{identifier:s}=o||{},a=t.map(e=>`<var>${e}</var>`).join(", "),l=`${n}(${t.join(", ")})`;return hyperHTML$1`${o&&i?".":""}<a
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
    data-xref-type="${r}"
    data-link-for="${s}"
    data-xref-for="${s}"
    data-lt="${l}"
<<<<<<< gh-pages
    ><code>${n}</code></a><code>(${[a]})</code>`}function renderEnum(e){const{identifier:t,enumValue:n,parent:r}=e,o=r?r.identifier:t;return hyperHTML$1`"<a
=======
    >${n}</a>(${[a]})`}function renderEnum(e){const{identifier:t,enumValue:n,parent:r}=e,o=r?r.identifier:t;return hyperHTML$1`"<a
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
    data-xref-type="enum-value"
    data-link-for="${o}"
    data-xref-for="${o}"
    data-lt="${n?null:"the-empty-string"}"
<<<<<<< gh-pages
    ><code>${n}</code></a>"`}function renderException(e){const{identifier:t}=e;return hyperHTML$1`"<a
    data-cite="WebIDL"
    data-xref-type="exception"
    ><code>${t}</code></a>"`}function renderIdlPrimitiveType(e){const{identifier:t}=e;return hyperHTML$1`<a
    data-cite="WebIDL"
    data-xref-type="interface"
    ><code>${t}</code></a>`}function idlStringToHtml(e){let t;try{t=parseInlineIDL(e)}catch(t){const n=hyperHTML$1`<span>{{ ${e} }}</span>`;return showInlineError(n,t.message,"Error: Invalid inline IDL string"),n}const n=hyperHTML$1(document.createDocumentFragment()),r=[];for(const e of t)switch(e.type){case"base":{const t=renderBase(e);t&&r.push(t);break}case"attribute":r.push(renderAttribute(e));break;case"internal-slot":r.push(renderInternalSlot(e));break;case"method":r.push(renderMethod(e));break;case"enum":r.push(renderEnum(e));break;case"exception":r.push(renderException(e));break;case"idl-primitive":r.push(renderIdlPrimitiveType(e));break;default:throw new Error("Unknown type.")}return n`${r}`}const ALLOWED_TYPES=new Set(["alias","reference"]),readyPromise=openIdb();async function openIdb(){return await idb.openDB("respec-biblio2",12,{upgrade(e){Array.from(e.objectStoreNames).map(t=>e.deleteObjectStore(t)),e.createObjectStore("alias",{keyPath:"id"}).createIndex("aliasOf","aliasOf",{unique:!1}),e.createObjectStore("reference",{keyPath:"id"})}})}const biblioDB={get ready(){return readyPromise},async find(e){return await this.isAlias(e)&&(e=await this.resolveAlias(e)),await this.get("reference",e)},async has(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if(!t)throw new TypeError("id is required");const n=(await this.ready).transaction(e,"readonly").store,r=IDBKeyRange.only(t);return!!await n.openCursor(r)},async isAlias(e){return await this.has("alias",e)},async resolveAlias(e){if(!e)throw new TypeError("id is required");const t=(await this.ready).transaction("alias","readonly").store,n=IDBKeyRange.only(e),r=await t.openCursor(n);return r?r.value.aliasOf:r},async get(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if(!t)throw new TypeError("id is required");const n=(await this.ready).transaction(e,"readonly").store,r=IDBKeyRange.only(t),o=await n.openCursor(r);return o?o.value:o},async addAll(e){if(!e)return;const t={alias:new Set,reference:new Set};Object.keys(e).filter(t=>{if("string"==typeof e[t]){let e=`Legacy SpecRef entries are not supported: \`[[${t}]]\`. `;return e+="Please update it to the new format at [specref repo](https://github.com/tobie/specref/)",pub("error",e),!1}return!0}).map(t=>Object.assign({id:t},e[t])).forEach(e=>{e.aliasOf?t.alias.add(e):t.reference.add(e)});const n=[...ALLOWED_TYPES].map(e=>Array.from(t[e]).map(t=>this.add(e,t))).reduce(flatten,[]);await Promise.all(n)},async add(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if("object"!=typeof t)throw new TypeError("details should be an object");if("alias"===e&&!t.hasOwnProperty("aliasOf"))throw new TypeError("Invalid alias object.");const n=await this.ready,r=await this.has(e,t.id),o=n.transaction(e,"readwrite").store;return r?await o.put(t):await o.add(t)},async close(){(await this.ready).close()},async clear(){const e=await this.ready,t=[...ALLOWED_TYPES],n=e.transaction(t,"readwrite"),r=t.map(e=>n.objectStore(e).clear());await Promise.all(r)}},biblio={},name$m="core/biblio",bibrefsURL=new URL("https://specref.herokuapp.com/bibrefs?refs=");function normalizeReferences(e){const t=new Set([...e.normativeReferences].map(e=>e.toLowerCase()));Array.from(e.informativeReferences).filter(e=>t.has(e.toLowerCase())).forEach(t=>e.informativeReferences.delete(t))}function getRefKeys(e){return{informativeReferences:Array.from(e.informativeReferences),normativeReferences:Array.from(e.normativeReferences)}}const link=createResourceHint({hint:"dns-prefetch",href:bibrefsURL.origin});let doneResolver$2;document.head.appendChild(link);const done$2=new Promise(e=>{doneResolver$2=e});async function updateFromNetwork(e,t={forceUpdate:!1}){const n=[...new Set(e)].filter(e=>e.trim());if(!n.length||!1===navigator.onLine)return null;let r;try{r=await fetch(bibrefsURL.href+n.join(","))}catch(e){return console.error(e),null}if(!t.forceUpdate&&!r.ok||200!==r.status)return null;const o=await r.json();try{await biblioDB.addAll(o)}catch(e){console.error(e)}return o}async function resolveRef(e){const t=await done$2;if(!t.hasOwnProperty(e))return null;const n=t[e];return n.aliasOf?await resolveRef(n.aliasOf):n}async function run$b(e){if(e.localBiblio||(e.localBiblio={}),e.biblio){let e="Overriding `.biblio` in config. Please use ";e+="`.localBiblio` for custom biblio entries.",pub("warn",e)}e.biblio=biblio;const t=Object.keys(e.localBiblio).filter(t=>e.localBiblio[t].hasOwnProperty("aliasOf")).map(t=>e.localBiblio[t].aliasOf).filter(t=>!e.localBiblio.hasOwnProperty(t));normalizeReferences(e);const n=getRefKeys(e),r=n.normativeReferences.concat(n.informativeReferences).filter(t=>!e.localBiblio.hasOwnProperty(t)).concat(t).reduce((e,t)=>(-1===e.indexOf(t)&&e.push(t),e),[]).sort(),o=[];try{await biblioDB.ready;const e=r.map(async e=>({id:e,data:await biblioDB.find(e)}));o.push(...await Promise.all(e))}catch(e){o.push(...r.map(e=>({id:e,data:null}))),console.warn(e)}const i={hasData:[],noData:[]};o.forEach(e=>{(e.data?i.hasData:i.noData).push(e)}),i.hasData.forEach(e=>{biblio[e.id]=e.data});const s=i.noData.map(e=>e.id);if(s.length){const e=await updateFromNetwork(s,{forceUpdate:!0});Object.assign(biblio,e)}Object.assign(biblio,e.localBiblio),doneResolver$2(e.biblio)}var biblio$1=Object.freeze({__proto__:null,biblio:biblio,name:name$m,updateFromNetwork:updateFromNetwork,resolveRef:resolveRef,run:run$b,wireReference:wireReference,stringifyReference:stringifyReference});const name$n="core/render-biblio",localizationStrings$1={en:{info_references:"Informative references",norm_references:"Normative references",references:"References"},nl:{info_references:"Informatieve referenties",norm_references:"Normatieve referenties",references:"Referenties"},es:{info_references:"Referencias informativas",norm_references:"Referencias normativas",references:"Referencias"}},l10n$4=getIntlData(localizationStrings$1),REF_STATUSES=new Map([["CR","W3C Candidate Recommendation"],["ED","W3C Editor's Draft"],["FPWD","W3C First Public Working Draft"],["LCWD","W3C Last Call Working Draft"],["NOTE","W3C Note"],["PER","W3C Proposed Edited Recommendation"],["PR","W3C Proposed Recommendation"],["REC","W3C Recommendation"],["WD","W3C Working Draft"],["WG-NOTE","W3C Working Group Note"]]),defaultsReference=Object.freeze({authors:[],date:"",href:"",publisher:"",status:"",title:"",etAl:!1}),endWithDot=endNormalizer(".");function run$c(e){const t=Array.from(e.informativeReferences),n=Array.from(e.normativeReferences);if(!t.length&&!n.length)return;const r=document.querySelector("section#references")||hyperHTML$1`<section id='references'></section>`;document.querySelector("section#references > h2")||r.prepend(hyperHTML$1`<h2>${l10n$4.references}</h2>`),r.classList.add("appendix");for(const e of["Normative","Informative"]){const o="Normative"===e?n:t;if(!o.length)continue;const i=hyperHTML$1`
=======
    >${n}</a>"`}function renderException(e){const{identifier:t}=e;return hyperHTML$1`"<a
=======
      data-link-for="${linkFor}"
      data-xref-for="${linkFor}"
    >${identifier}</a>`;
  return html;
}

/**
 * Method: .identifier(arg1, arg2, ...), identifier(arg1, arg2, ...)
 * @param {IdlMethod} details
 */
function renderMethod(details) {
  const { args, identifier, type, parent, renderParent } = details;
  const { identifier: linkFor } = parent || {};
  const argsText = args.map(arg => `<var>${arg}</var>`).join(", ");
  const searchText = `${identifier}(${args.join(", ")})`;
  const html = hyperHTML$1`${parent && renderParent ? "." : ""}<a
    data-xref-type="${type}"
    data-link-for="${linkFor}"
    data-xref-for="${linkFor}"
    data-lt="${searchText}"
    >${identifier}</a>(${[argsText]})`;
  return html;
}

/**
 * Enum:
 * Identifier["enum value"]
 * Identifer / "enum value"
 * @param {IdlEnum} details
 */
function renderEnum(details) {
  const { identifier, enumValue, parent } = details;
  const forContext = parent ? parent.identifier : identifier;
  const html = hyperHTML$1`"<a
    data-xref-type="enum-value"
    data-link-for="${forContext}"
    data-xref-for="${forContext}"
    data-lt="${!enumValue ? "the-empty-string" : null}"
    >${enumValue}</a>"`;
  return html;
}

/**
 * Exception value: "NotAllowedError"
 * Only the WebIDL spec can define exceptions
 * @param {IdlException} details
 */
function renderException(details) {
  const { identifier } = details;
  const html = hyperHTML$1`"<a
>>>>>>> Build
    data-cite="WebIDL"
    data-xref-type="exception"
    >${identifier}</a>"`;
  return html;
}

/**
 * Interface types: {{ unrestricted double }} {{long long}}
 * Only the WebIDL spec defines these types.
 * @param {IdlPrimitive} details
 */
function renderIdlPrimitiveType(details) {
  const { identifier } = details;
  const html = hyperHTML$1`<a
    data-cite="WebIDL"
    data-xref-type="interface"
    >${identifier}</a>`;
  return html;
}

/**
 * Generates HTML by parsing an IDL string
 * @param {String} str IDL string
 * @return {Node} html output
 */
function idlStringToHtml(str) {
  let results;
  try {
    results = parseInlineIDL(str);
  } catch (error) {
    const el = hyperHTML$1`<span>{{ ${str} }}</span>`;
    showInlineError(el, error.message, "Error: Invalid inline IDL string");
    return el;
  }
  const render = hyperHTML$1(document.createDocumentFragment());
  const output = [];
  for (const details of results) {
    switch (details.type) {
      case "base": {
        const base = renderBase(details);
        if (base) output.push(base);
        break;
      }
      case "attribute":
        output.push(renderAttribute(details));
        break;
      case "internal-slot":
        output.push(renderInternalSlot(details));
        break;
      case "method":
        output.push(renderMethod(details));
        break;
      case "enum":
        output.push(renderEnum(details));
        break;
      case "exception":
        output.push(renderException(details));
        break;
      case "idl-primitive":
        output.push(renderIdlPrimitiveType(details));
        break;
      default:
        throw new Error("Unknown type.");
    }
  }
  const result = render`<code>${output}</code>`;
  return result;
}

// @ts-check

/**
 * @typedef {keyof BiblioDb} AllowedType
 * @type {Set<AllowedType>}
 */
const ALLOWED_TYPES = new Set(["alias", "reference"]);
/* Database initialization tracker */
const readyPromise = openIdb();

/**
 * @typedef {object} BiblioDb
 *
 * @property {object} alias Object store for alias objects
 * @property {string} alias.key
 * @property {object} alias.value
 * @property {object} alias.indexes
 * @property {string} alias.aliasOf
 *
 * @property {object} reference Object store for reference objects
 * @property {string} reference.key
 * @property {object} reference.value
 *
 * @returns {Promise<import("idb").IDBPDatabase<BiblioDb>>}
 */
async function openIdb() {
  return await idb.openDB("respec-biblio2", 12, {
    upgrade(db) {
      Array.from(db.objectStoreNames).map(storeName =>
        db.deleteObjectStore(storeName)
      );
      const store = db.createObjectStore("alias", { keyPath: "id" });
      store.createIndex("aliasOf", "aliasOf", { unique: false });
      db.createObjectStore("reference", { keyPath: "id" });
    },
  });
}

const biblioDB = {
  get ready() {
    return readyPromise;
  },
  /**
   * Finds either a reference or an alias.
   * If it's an alias, it resolves it.
   *
   * @param {String} id The reference or alias to look for.
   * @return {Promise<Object?>} The reference or null.
   */
  async find(id) {
    if (await this.isAlias(id)) {
      id = await this.resolveAlias(id);
    }
    return await this.get("reference", id);
  },
  /**
   * Checks if the database has an id for a given type.
   *
   * @param {AllowedType} type One of the ALLOWED_TYPES.
   * @param {String} id The reference to find.
   * @return {Promise<Boolean>} True if it has it, false otherwise.
   */
  async has(type, id) {
    if (!ALLOWED_TYPES.has(type)) {
      throw new TypeError(`Invalid type: ${type}`);
    }
    if (!id) {
      throw new TypeError("id is required");
    }
    const db = await this.ready;
    const objectStore = db.transaction(type, "readonly").store;
    const range = IDBKeyRange.only(id);
    const result = await objectStore.openCursor(range);
    return !!result;
  },
  /**
   * Checks if a given id is an alias.
   *
   * @param {String} id The reference to check.
   * @return {Promise<Boolean>} Resolves with true if found.
   */
  async isAlias(id) {
    return await this.has("alias", id);
  },
  /**
   * Resolves an alias to its corresponding reference id.
   *
   * @param {String} id The id of the alias to look up.
   * @return {Promise<String>} The id of the resolved reference.
   */
  async resolveAlias(id) {
    if (!id) {
      throw new TypeError("id is required");
    }
    const db = await this.ready;

    const objectStore = db.transaction("alias", "readonly").store;
    const range = IDBKeyRange.only(id);
    const result = await objectStore.openCursor(range);
    return result ? result.value.aliasOf : result;
  },
  /**
   * Get a reference or alias out of the database.
   *
   * @param {AllowedType} type The type as per ALLOWED_TYPES.
   * @param {string} id The id for what to look up.
   * @return {Promise<Object?>} Resolves with the retrieved object, or null.
   */
  async get(type, id) {
    if (!ALLOWED_TYPES.has(type)) {
      throw new TypeError(`Invalid type: ${type}`);
    }
    if (!id) {
      throw new TypeError("id is required");
    }
    const db = await this.ready;
    const objectStore = db.transaction(type, "readonly").store;
    const range = IDBKeyRange.only(id);
    const result = await objectStore.openCursor(range);
    return result ? result.value : result;
  },
  /**
   * Adds references and aliases to database. This is usually the data from
   * Specref's output (parsed JSON).
   *
   * @param {Object} data An object that contains references and aliases.
   */
  async addAll(data) {
    if (!data) {
      return;
    }
    const aliasesAndRefs = {
      alias: new Set(),
      reference: new Set(),
    };
    Object.keys(data)
      .filter(key => {
        if (typeof data[key] === "string") {
          let msg = `Legacy SpecRef entries are not supported: \`[[${key}]]\`. `;
          msg +=
            "Please update it to the new format at [specref repo](https://github.com/tobie/specref/)";
          pub("error", msg);
          return false;
        }
        return true;
      })
      .map(id => Object.assign({ id }, data[id]))
      .forEach(obj => {
        if (obj.aliasOf) {
          aliasesAndRefs.alias.add(obj);
        } else {
          aliasesAndRefs.reference.add(obj);
        }
      });
    const promisesToAdd = [...ALLOWED_TYPES]
      .map(type => {
        return Array.from(aliasesAndRefs[type]).map(details =>
          this.add(type, details)
        );
      })
      .reduce(flatten, []);
    await Promise.all(promisesToAdd);
  },
  /**
   * Adds a reference or alias to the database.
   *
   * @param {AllowedType} type The type as per ALLOWED_TYPES.
   * @param {Object} details The object to store.
   */
  async add(type, details) {
    if (!ALLOWED_TYPES.has(type)) {
      throw new TypeError(`Invalid type: ${type}`);
    }
    if (typeof details !== "object") {
      throw new TypeError("details should be an object");
    }
    if (type === "alias" && !details.hasOwnProperty("aliasOf")) {
      throw new TypeError("Invalid alias object.");
    }
    const db = await this.ready;
    const isInDB = await this.has(type, details.id);
    const store = db.transaction(type, "readwrite").store;
    // update or add, depending of already having it in db
    return isInDB ? await store.put(details) : await store.add(details);
  },
  /**
   * Closes the underlying database.
   *
   * @return {Promise<void>} Resolves after database closes.
   */
  async close() {
    const db = await this.ready;
    db.close();
  },

  /**
   * Clears the underlying database
   */
  async clear() {
    const db = await this.ready;
    const storeNames = [...ALLOWED_TYPES];
    const stores = db.transaction(storeNames, "readwrite");
    const clearStorePromises = storeNames.map(name => {
      return stores.objectStore(name).clear();
    });
    await Promise.all(clearStorePromises);
  },
};

// @ts-check
const biblio = {};

const name$m = "core/biblio";

const bibrefsURL = new URL("https://specref.herokuapp.com/bibrefs?refs=");

/**
 * Normative references take precedence over informative ones,
 * so any duplicates ones are removed from the informative set.
 */
function normalizeReferences(conf) {
  const normalizedNormativeRefs = new Set(
    [...conf.normativeReferences].map(key => key.toLowerCase())
  );
  Array.from(conf.informativeReferences)
    .filter(key => normalizedNormativeRefs.has(key.toLowerCase()))
    .forEach(redundantKey => conf.informativeReferences.delete(redundantKey));
}

function getRefKeys(conf) {
  return {
    informativeReferences: Array.from(conf.informativeReferences),
    normativeReferences: Array.from(conf.normativeReferences),
  };
}

// Opportunistically dns-prefetch to bibref server, as we don't know yet
// if we will actually need to download references yet.
const link = createResourceHint({
  hint: "dns-prefetch",
  href: bibrefsURL.origin,
});
document.head.appendChild(link);
let doneResolver$2;
const done$2 = new Promise(resolve => {
  doneResolver$2 = resolve;
});

async function updateFromNetwork(
  refs,
  options = { forceUpdate: false }
) {
  const refsToFetch = [...new Set(refs)].filter(ref => ref.trim());
  // Update database if needed, if we are online
  if (!refsToFetch.length || navigator.onLine === false) {
    return null;
  }
  let response;
  try {
    response = await fetch(bibrefsURL.href + refsToFetch.join(","));
  } catch (err) {
    console.error(err);
    return null;
  }
  if ((!options.forceUpdate && !response.ok) || response.status !== 200) {
    return null;
  }
  const data = await response.json();
  try {
    await biblioDB.addAll(data);
  } catch (err) {
    console.error(err);
  }
  return data;
}

/**
 * @param {string} key
 */
async function resolveRef(key) {
  const biblio = await done$2;
  if (!biblio.hasOwnProperty(key)) {
    return null;
  }
  const entry = biblio[key];
  if (entry.aliasOf) {
    return await resolveRef(entry.aliasOf);
  }
  return entry;
}

async function run$b(conf) {
  const finish = () => {
    doneResolver$2(conf.biblio);
  };
  if (!conf.localBiblio) {
    conf.localBiblio = {};
  }
  if (conf.biblio) {
    let msg = "Overriding `.biblio` in config. Please use ";
    msg += "`.localBiblio` for custom biblio entries.";
    pub("warn", msg);
  }
  conf.biblio = biblio;
  const localAliases = Array.from(Object.keys(conf.localBiblio))
    .filter(key => conf.localBiblio[key].hasOwnProperty("aliasOf"))
    .map(key => conf.localBiblio[key].aliasOf);
  normalizeReferences(conf);
  const allRefs = getRefKeys(conf);
  const neededRefs = allRefs.normativeReferences
    .concat(allRefs.informativeReferences)
    // Filter, as to not go to network for local refs
    .filter(key => !conf.localBiblio.hasOwnProperty(key))
    // but include local aliases, in case they refer to external specs
    .concat(localAliases)
    // remove duplicates
    .reduce((collector, item) => {
      if (collector.indexOf(item) === -1) {
        collector.push(item);
      }
      return collector;
    }, [])
    .sort();
  const idbRefs = [];

  // See if we have them in IDB
  try {
    await biblioDB.ready; // can throw
    const promisesToFind = neededRefs.map(async id => ({
      id,
      data: await biblioDB.find(id),
    }));
    idbRefs.push(...(await Promise.all(promisesToFind)));
  } catch (err) {
    // IndexedDB died, so we need to go to the network for all
    // references
    idbRefs.push(...neededRefs.map(id => ({ id, data: null })));
    console.warn(err);
  }
  const split = { hasData: [], noData: [] };
  idbRefs.forEach(ref => {
    (ref.data ? split.hasData : split.noData).push(ref);
  });
  split.hasData.forEach(ref => {
    biblio[ref.id] = ref.data;
  });
  const externalRefs = split.noData.map(item => item.id);
  if (externalRefs.length) {
    // Going to the network for refs we don't have
    const data = await updateFromNetwork(externalRefs, { forceUpdate: true });
    Object.assign(biblio, data);
  }
  Object.assign(biblio, conf.localBiblio);
  finish();
}

var biblio$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  biblio: biblio,
  name: name$m,
  updateFromNetwork: updateFromNetwork,
  resolveRef: resolveRef,
  run: run$b,
  wireReference: wireReference,
  stringifyReference: stringifyReference
});

// @ts-check

const name$n = "core/render-biblio";

const localizationStrings$1 = {
  en: {
    info_references: "Informative references",
    norm_references: "Normative references",
    references: "References",
  },
  nl: {
    info_references: "Informatieve referenties",
    norm_references: "Normatieve referenties",
    references: "Referenties",
  },
  es: {
    info_references: "Referencias informativas",
    norm_references: "Referencias normativas",
    references: "Referencias",
  },
};

const lang$9 = lang in localizationStrings$1 ? lang : "en";

const l10n$4 = localizationStrings$1[lang$9];

const REF_STATUSES = new Map([
  ["CR", "W3C Candidate Recommendation"],
  ["ED", "W3C Editor's Draft"],
  ["FPWD", "W3C First Public Working Draft"],
  ["LCWD", "W3C Last Call Working Draft"],
  ["NOTE", "W3C Note"],
  ["PER", "W3C Proposed Edited Recommendation"],
  ["PR", "W3C Proposed Recommendation"],
  ["REC", "W3C Recommendation"],
  ["WD", "W3C Working Draft"],
  ["WG-NOTE", "W3C Working Group Note"],
]);

const defaultsReference = Object.freeze({
  authors: [],
  date: "",
  href: "",
  publisher: "",
  status: "",
  title: "",
  etAl: false,
});

const endWithDot = endNormalizer(".");

function run$c(conf) {
  const informs = Array.from(conf.informativeReferences);
  const norms = Array.from(conf.normativeReferences);

  if (!informs.length && !norms.length && !conf.refNote) return;

  const refsec = hyperHTML$1`
    <section id='references' class='appendix'>
      <h2>${l10n$4.references}</h2>
<<<<<<< gh-pages
      ${e.refNote?hyperHTML$1`<p>${e.refNote}</p>`:""}
    </section>`;for(const e of["Normative","Informative"]){const o="Normative"===e?n:t;if(!o.length)continue;const i=hyperHTML$1`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
=======
      ${conf.refNote ? hyperHTML$1`<p>${conf.refNote}</p>` : ""}
    </section>`;

  for (const type of ["Normative", "Informative"]) {
    const refs = type === "Normative" ? norms : informs;
    if (!refs.length) continue;

    const sec = hyperHTML$1`
>>>>>>> Build
      <section>
        <h3>${
          type === "Normative" ? l10n$4.norm_references : l10n$4.info_references
        }</h3>
      </section>`;
    addId(sec);

    const { goodRefs, badRefs } = refs.map(toRefContent).reduce(
      (refObjects, ref) => {
        const refType = ref.refcontent ? "goodRefs" : "badRefs";
        refObjects[refType].push(ref);
        return refObjects;
      },
      { goodRefs: [], badRefs: [] }
    );

    const uniqueRefs = [
      ...goodRefs
        .reduce((uniqueRefs, ref) => {
          if (!uniqueRefs.has(ref.refcontent.id)) {
            // the condition ensures that only the first used [[TERM]]
            // shows up in #references section
            uniqueRefs.set(ref.refcontent.id, ref);
          }
          return uniqueRefs;
        }, new Map())
        .values(),
    ];

    const refsToShow = uniqueRefs
      .concat(badRefs)
      .sort((a, b) =>
        a.ref.toLocaleLowerCase().localeCompare(b.ref.toLocaleLowerCase())
      );

    sec.appendChild(hyperHTML$1`
      <dl class='bibliography'>
<<<<<<< gh-pages
        ${c.map(showRef)}
<<<<<<< gh-pages
      </dl>`),r.appendChild(i),decorateInlineReference(l,getAliases(s)),warnBadRefs(a)}document.body.appendChild(r)}function toRefContent(e){let t=biblio[e],n=e;const r=new Set([n]);for(;t&&t.aliasOf;)if(r.has(t.aliasOf)){t=null,pub("error",`Circular reference in biblio DB between [\`${e}\`] and [\`${n}\`].`)}else n=t.aliasOf,t=biblio[n],r.add(n);return t&&!t.id&&(t.id=e.toLowerCase()),{ref:e,refcontent:t}}function renderInlineCitation(e){const t=e.replace(/^(!|\?)/,""),n=`#bib-${t.toLowerCase()}`;return hyperHTML$1`[<cite><a class="bibref" href="${n}" data-link-type="biblio">${t}</a></cite>]`}function showRef({ref:e,refcontent:t}){const n=`bib-${e.toLowerCase()}`;return t?hyperHTML$1`
=======
      </dl>`),r.appendChild(i),decorateInlineReference(l,getAliases(s)),warnBadRefs(a)}document.body.appendChild(r)}function toRefContent(e){let t=biblio[e],n=e;const r=new Set([n]);for(;t&&t.aliasOf;)if(r.has(t.aliasOf)){t=null,pub("error",`Circular reference in biblio DB between [\`${e}\`] and [\`${n}\`].`)}else n=t.aliasOf,t=biblio[n],r.add(n);return t&&!t.id&&(t.id=e.toLowerCase()),{ref:e,refcontent:t}}function renderInlineCitation(e){const t=e.replace(/^(!|\?)/,""),n=`#bib-${t.toLowerCase()}`;return hyperHTML$1`[<cite><a class="bibref" href="${n}">${t}</a></cite>]`}function showRef({ref:e,refcontent:t}){const n=`bib-${e.toLowerCase()}`;return t?hyperHTML$1`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
      <dt id="${n}">[${e}]</dt>
      <dd>${{html:stringifyReference(t)}}</dd>
    `:hyperHTML$1`
      <dt id="${n}">[${e}]</dt>
=======
        ${refsToShow.map(showRef)}
      </dl>`);
    refsec.appendChild(sec);

    const aliases = getAliases(goodRefs);
    decorateInlineReference(uniqueRefs, aliases);
    warnBadRefs(badRefs);
  }

  document.body.appendChild(refsec);
}

/**
 * returns refcontent and unique key for a reference among its aliases
 * and warns about circular references
 * @param {String} ref
 */
function toRefContent(ref) {
  let refcontent = biblio[ref];
  let key = ref;
  const circular = new Set([key]);
  while (refcontent && refcontent.aliasOf) {
    if (circular.has(refcontent.aliasOf)) {
      refcontent = null;
      const msg = `Circular reference in biblio DB between [\`${ref}\`] and [\`${key}\`].`;
      pub("error", msg);
    } else {
      key = refcontent.aliasOf;
      refcontent = biblio[key];
      circular.add(key);
    }
  }
  if (refcontent && !refcontent.id) {
    refcontent.id = ref.toLowerCase();
  }
  return { ref, refcontent };
}

/**
 * Render an inline citation
 *
 * @param {String} ref the inline reference.
 * @returns HTMLElement
 */
function renderInlineCitation(ref) {
  const key = ref.replace(/^(!|\?)/, "");
  const href = `#bib-${key.toLowerCase()}`;
  return hyperHTML$1`[<cite><a class="bibref" href="${href}">${key}</a></cite>]`;
}

/**
 * renders a reference
 */
function showRef({ ref, refcontent }) {
  const refId = `bib-${ref.toLowerCase()}`;
  if (refcontent) {
    return hyperHTML$1`
      <dt id="${refId}">[${ref}]</dt>
      <dd>${{ html: stringifyReference(refcontent) }}</dd>
    `;
  } else {
    return hyperHTML$1`
      <dt id="${refId}">[${ref}]</dt>
>>>>>>> Build
      <dd><em class="respec-offending-element">Reference not found.</em></dd>
    `;
  }
}

function endNormalizer(endStr) {
  return str => {
    const trimmed = str.trim();
    const result =
      !trimmed || trimmed.endsWith(endStr) ? trimmed : trimmed + endStr;
    return result;
  };
}

function wireReference(rawRef, target = "_blank") {
  if (typeof rawRef !== "object") {
    throw new TypeError("Only modern object references are allowed");
  }
  const ref = Object.assign({}, defaultsReference, rawRef);
  const authors = ref.authors.join("; ") + (ref.etAl ? " et al" : "");
  const status = REF_STATUSES.get(ref.status) || ref.status;
  return hyperHTML$1.wire(ref)`
    <cite>
      <a
        href="${ref.href}"
        target="${target}"
        rel="noopener noreferrer">
        ${ref.title.trim()}</a>.
    </cite>
    <span class="authors">
      ${endWithDot(authors)}
    </span>
    <span class="publisher">
      ${endWithDot(ref.publisher)}
    </span>
    <span class="pubDate">
      ${endWithDot(ref.date)}
    </span>
    <span class="pubStatus">
      ${endWithDot(status)}
    </span>
<<<<<<< gh-pages
<<<<<<< gh-pages
  `}function stringifyReference(e){if("string"==typeof e)return e;let t=`<cite>${e.title}</cite>`;return t=e.href?`<a href="${e.href}">${t}</a>. `:`${t}. `,e.authors&&e.authors.length&&(t+=e.authors.join("; "),e.etAl&&(t+=" et al"),t+=". "),e.publisher&&(t=`${t} ${endWithDot(e.publisher)} `),e.date&&(t+=`${e.date}. `),e.status&&(t+=`${REF_STATUSES.get(e.status)||e.status}. `),e.href&&(t+=`URL: <a href="${e.href}">${e.href}</a>`),t}function getAliases(e){return e.reduce((e,t)=>{const n=t.refcontent.id;return(e.has(n)?e.get(n):e.set(n,[]).get(n)).push(t.ref),e},new Map)}function decorateInlineReference(e,t){e.map(({ref:e,refcontent:n})=>{const r=`#bib-${e.toLowerCase()}`,o=t.get(n.id).map(e=>`a.bibref[href="#bib-${e.toLowerCase()}"]`).join(",");return{refUrl:r,elems:document.querySelectorAll(o),refcontent:n}}).forEach(({refUrl:e,elems:t,refcontent:n})=>{t.forEach(t=>{t.setAttribute("href",e),t.setAttribute("title",n.title),t.dataset.linkType="biblio"})})}function warnBadRefs(e){e.forEach(({ref:e})=>{const t=[...document.querySelectorAll(`a.bibref[href="#bib-${e.toLowerCase()}"]`)].filter(({textContent:t})=>t.toLowerCase()===e.toLowerCase());pub("error",`Bad reference: [\`${e}\`] (appears ${t.length} times)`),console.warn("Bad references: ",t)})}var renderBiblio=Object.freeze({__proto__:null,name:name$n,run:run$c,renderInlineCitation:renderInlineCitation,wireReference:wireReference,stringifyReference:stringifyReference});const name$o="core/inlines",rfc2119Usage={},inlineCodeRegExp=/(?:`[^`]+`)(?!`)/,inlineIdlReference=/(?:{{[^}]+}})/,inlineVariable=/\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/,inlineCitation=/(?:\[\[(?:!|\\|\?)?[A-Za-z0-9.-]+\]\])/,inlineExpansion=/(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/,inlineAnchor=/(?:\[=[^=]+=\])/,inlineElement=/(?:\[\^[A-Za-z]+(?:-[A-Za-z]+)?\^\])/;function inlineElementMatches(e){const t=e.slice(2,-2).trim();return hyperHTML$1`<code><a data-xref-type="element">${t}</a></code>`}function inlineRFC2119Matches(e){const t=norm(e),n=hyperHTML$1`<em class="rfc2119" title="${t}">${t}</em>`;return rfc2119Usage[t]=!0,n}function inlineRefMatches(e){const t=e.slice(3,-3).trim();if(!t.startsWith("#"))return hyperHTML$1`<a data-cite="${t}"></a>`;if(document.querySelector(t))return hyperHTML$1`<a href="${t}"></a>`;const n=hyperHTML$1`<span>${e}</span>`;return showInlineError(n,`Wasn't able to expand ${e} as it didn't match any id in the document.`,`Please make sure there is element with id ${t} in the document.`),n}function inlineXrefMatches(e){const t=e.slice(2,-2).trim();return t.startsWith("\\")?e.replace("\\",""):idlStringToHtml(norm(t))}function inlineBibrefMatches(e,t,n){const r=e.slice(2,-2);if(r.startsWith("\\"))return[`[[${r.slice(1)}]]`];const{type:o,illegal:i}=refTypeFromContext(r,t.parentNode),s=renderInlineCitation(r),a=r.replace(/^(!|\?)/,"");return i&&!n.normativeReferences.has(a)&&showInlineWarning(s.childNodes[1],"Normative references in informative sections are not allowed. "+`Remove '!' from the start of the reference \`[[${r}]]\``),"informative"!==o||i?n.normativeReferences.add(a):n.informativeReferences.add(a),s.childNodes}function inlineAbbrMatches(e,t,n){return"ABBR"===t.parentElement.tagName?e:hyperHTML$1`<abbr title="${n.get(e)}">${e}</abbr>`}function inlineVariableMatches(e){const t=e.slice(1,-1).split(":",2),[n,r]=t.map(e=>e.trim());return hyperHTML$1`<var data-type="${r}">${n}</var>`}function inlineAnchorMatches(e){const t=(e=e.slice(2,-2)).split("/",2).map(e=>e.trim()),[n,r]=2===t.length?t:[null,t[0]],[o,i]=r.includes("|")?r.split("|",2).map(e=>e.trim()):[null,r],s=processInlineContent(i),a=n?norm(n):null;return hyperHTML$1`<a data-link-for="${a}" data-xref-for="${a}" data-lt="${o}">${s}</a>`}function inlineCodeMatches(e){const t=e.slice(1,-1);return hyperHTML$1`<code>${t}</code>`}function processInlineContent(e){return inlineCodeRegExp.test(e)?e.split(/(`[^`]+`)(?!`)/).map(e=>e.startsWith("`")?inlineCodeMatches(e):processInlineContent(e)):document.createTextNode(e)}function run$d(e){const t=new Map;document.normalize(),document.querySelector("section#conformance")||document.body.classList.add("informative"),e.normativeReferences=new InsensitiveStringSet,e.informativeReferences=new InsensitiveStringSet,e.respecRFC2119||(e.respecRFC2119=rfc2119Usage);const n=document.querySelectorAll("abbr[title]");for(const e of n)t.set(e.textContent,e.title);const r=[...t.keys()],o=r.length?`(?:\\b${r.join("\\b)|(?:\\b")}\\b)`:null,i=getTextNodes(document.body,["#respec-ui",".head","pre"],{wsNodes:!1}),s=new RegExp(["\\bMUST(?:\\s+NOT)?\\b","\\bSHOULD(?:\\s+NOT)?\\b","\\bSHALL(?:\\s+NOT)?\\b","\\bMAY\\b","\\b(?:NOT\\s+)?REQUIRED\\b","\\b(?:NOT\\s+)?RECOMMENDED\\b","\\bOPTIONAL\\b"].join("|")),a=new RegExp(`(${[s.source,inlineIdlReference.source,inlineVariable.source,inlineCitation.source,inlineExpansion.source,inlineAnchor.source,inlineCodeRegExp.source,inlineElement.source,...o?[o]:[]].join("|")})`);for(const n of i){const r=n.data.split(a);if(1===r.length)continue;const o=document.createDocumentFragment();let i=!0;for(const a of r)if(i=!i,i)if(a.startsWith("{{")){const e=inlineXrefMatches(a);o.append(e)}else if(a.startsWith("[[[")){const e=inlineRefMatches(a);o.append(e)}else if(a.startsWith("[[")){const t=inlineBibrefMatches(a,n,e);o.append(...t)}else if(a.startsWith("|")){const e=inlineVariableMatches(a);o.append(e)}else if(a.startsWith("[=")){const e=inlineAnchorMatches(a);o.append(e)}else if(a.startsWith("`")){const e=inlineCodeMatches(a);o.append(e)}else if(a.startsWith("[^")){const e=inlineElementMatches(a);o.append(e)}else if(t.has(a)){const e=inlineAbbrMatches(a,n,t);o.append(e)}else{if(!s.test(a))throw new Error(`Found token '${a}' but it does not correspond to anything`);{const e=inlineRFC2119Matches(a);o.append(e)}}else o.append(a);n.replaceWith(o)}}var inlines=Object.freeze({__proto__:null,name:name$o,rfc2119Usage:rfc2119Usage,run:run$d});const definitionMap=Object.create(null);function registerDefinition(e,t){for(const n of t.map(e=>e.toLowerCase()))n in definitionMap==!1?definitionMap[n]=[e]:definitionMap[n].includes(e)||definitionMap[n].push(e)}const name$p="core/dfn";function run$e(){document.querySelectorAll("dfn").forEach(e=>{const t=getDfnTitles(e);registerDefinition(e,t),e.dataset.dfnType||(e.dataset.dfnType="dfn"),1===t.length&&t[0]===norm(e.textContent)||(e.dataset.lt=t.join("|"))})}var dfn=Object.freeze({__proto__:null,name:name$p,run:run$e});const name$q="core/pluralize";function run$f(e){if(!e.pluralize)return;const t=getPluralizer();document.querySelectorAll("dfn:not([data-lt-no-plural]):not([data-lt-noDefault])").forEach(e=>{const n=[e.textContent];e.dataset.lt&&n.push(...e.dataset.lt.split("|")),e.dataset.localLt&&n.push(...e.dataset.localLt.split("|"));const r=new Set(n.map(t).filter(e=>e));if(r.size){const t=e.dataset.plurals?e.dataset.plurals.split("|"):[],n=[...new Set([...t,...r])];e.dataset.plurals=n.join("|"),registerDefinition(e,n)}})}function getPluralizer(){const e=new Set;document.querySelectorAll("a:not([href])").forEach(t=>{const n=norm(t.textContent).toLowerCase();e.add(n),t.dataset.lt&&e.add(t.dataset.lt)});const t=new Set;return document.querySelectorAll("dfn:not([data-lt-noDefault])").forEach(e=>{const n=norm(e.textContent).toLowerCase();t.add(n),e.dataset.lt&&e.dataset.lt.split("|").forEach(e=>t.add(e)),e.dataset.localLt&&e.dataset.localLt.split("|").forEach(e=>t.add(e))}),function(n){const r=norm(n).toLowerCase(),o=pluralize$1.isSingular(r)?pluralize$1.plural(r):pluralize$1.singular(r);return e.has(o)&&!t.has(o)?o:""}}var pluralize$2=Object.freeze({__proto__:null,name:name$q,run:run$f});const name$r="core/examples",localizationStrings$2={en:{example:"Example"},nl:{example:"Voorbeeld"},es:{example:"Ejemplo"}},l10n$5=getIntlData(localizationStrings$2),cssPromise=loadStyle$2();async function loadStyle$2(){try{return(await Promise.resolve().then((function(){return examples$2}))).default}catch{return fetchAsset("examples.css")}}function makeTitle(e,t,n){n.title=e.title,n.title&&e.removeAttribute("title");const r=t>0?` ${t}`:"",o=n.title?hyperHTML$1`
=======
  `}function stringifyReference(e){if("string"==typeof e)return e;let t=`<cite>${e.title}</cite>`;return t=e.href?`<a href="${e.href}">${t}</a>. `:`${t}. `,e.authors&&e.authors.length&&(t+=e.authors.join("; "),e.etAl&&(t+=" et al"),t+=". "),e.publisher&&(t=`${t} ${endWithDot(e.publisher)} `),e.date&&(t+=`${e.date}. `),e.status&&(t+=`${REF_STATUSES.get(e.status)||e.status}. `),e.href&&(t+=`URL: <a href="${e.href}">${e.href}</a>`),t}function getAliases(e){return e.reduce((e,t)=>{const n=t.refcontent.id;return(e.has(n)?e.get(n):e.set(n,[]).get(n)).push(t.ref),e},new Map)}function decorateInlineReference(e,t){e.map(({ref:e,refcontent:n})=>{const r=`#bib-${e.toLowerCase()}`,o=t.get(n.id).map(e=>`a.bibref[href="#bib-${e.toLowerCase()}"]`).join(",");return{refUrl:r,elems:document.querySelectorAll(o),refcontent:n}}).forEach(({refUrl:e,elems:t,refcontent:n})=>{t.forEach(t=>{t.setAttribute("href",e),t.setAttribute("title",n.title),t.dataset.linkType="biblio"})})}function warnBadRefs(e){e.forEach(({ref:e})=>{const t=[...document.querySelectorAll(`a.bibref[href="#bib-${e.toLowerCase()}"]`)].filter(({textContent:t})=>t.toLowerCase()===e.toLowerCase());pub("error",`Bad reference: [\`${e}\`] (appears ${t.length} times)`),console.warn("Bad references: ",t)})}var renderBiblio=Object.freeze({__proto__:null,name:name$n,run:run$c,renderInlineCitation:renderInlineCitation,wireReference:wireReference,stringifyReference:stringifyReference});const name$o="core/inlines",rfc2119Usage={},inlineCodeRegExp=/(?:`[^`]+`)(?!`)/,inlineIdlReference=/(?:{{[^}]+}})/,inlineVariable=/\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/,inlineCitation=/(?:\[\[(?:!|\\|\?)?[A-Za-z0-9.-]+\]\])/,inlineExpansion=/(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/,inlineAnchor=/(?:\[=[^=]+=\])/,inlineElement=/(?:\[\^[A-Za-z]+(?:-[A-Za-z]+)?\^\])/;function inlineElementMatches(e){const t=e.slice(2,-2).trim();return hyperHTML$1`<code><a data-xref-type="element">${t}</a></code>`}function inlineRFC2119Matches(e){const t=norm(e),n=hyperHTML$1`<em class="rfc2119" title="${t}">${t}</em>`;return rfc2119Usage[t]=!0,n}function inlineRefMatches(e){const t=e.slice(3,-3).trim();if(!t.startsWith("#"))return hyperHTML$1`<a data-cite="${t}"></a>`;if(document.querySelector(t))return hyperHTML$1`<a href="${t}"></a>`;const n=hyperHTML$1`<span>${e}</span>`;return showInlineError(n,`Wasn't able to expand ${e} as it didn't match any id in the document.`,`Please make sure there is element with id ${t} in the document.`),n}function inlineXrefMatches(e){const t=e.slice(2,-2).trim();return t.startsWith("\\")?e.replace("\\",""):idlStringToHtml(norm(t))}function inlineBibrefMatches(e,t,n){const r=e.slice(2,-2);if(r.startsWith("\\"))return[`[[${r.slice(1)}]]`];const{type:o,illegal:i}=refTypeFromContext(r,t.parentNode),s=renderInlineCitation(r),a=r.replace(/^(!|\?)/,"");return i&&!n.normativeReferences.has(a)&&showInlineWarning(s.childNodes[1],"Normative references in informative sections are not allowed. "+`Remove '!' from the start of the reference \`[[${r}]]\``),"informative"!==o||i?n.normativeReferences.add(a):n.informativeReferences.add(a),s.childNodes}function inlineAbbrMatches(e,t,n){return"ABBR"===t.parentElement.tagName?e:hyperHTML$1`<abbr title="${n.get(e)}">${e}</abbr>`}function inlineVariableMatches(e){const t=e.slice(1,-1).split(":",2),[n,r]=t.map(e=>e.trim());return hyperHTML$1`<var data-type="${r}">${n}</var>`}function inlineAnchorMatches(e){const t=(e=e.slice(2,-2)).split("/",2).map(e=>e.trim()),[n,r]=2===t.length?t:[null,t[0]],[o,i]=r.includes("|")?r.split("|",2).map(e=>e.trim()):[null,r],s=processInlineContent(i),a=n?norm(n):null;return hyperHTML$1`<a data-link-for="${a}" data-xref-for="${a}" data-lt="${o}">${s}</a>`}function inlineCodeMatches(e){const t=e.slice(1,-1);return hyperHTML$1`<code>${t}</code>`}function processInlineContent(e){return inlineCodeRegExp.test(e)?e.split(/(`[^`]+`)(?!`)/).map(e=>e.startsWith("`")?inlineCodeMatches(e):processInlineContent(e)):document.createTextNode(e)}function run$d(e){const t=new Map;document.normalize(),document.querySelector("section#conformance")||document.body.classList.add("informative"),e.normativeReferences=new InsensitiveStringSet,e.informativeReferences=new InsensitiveStringSet,e.respecRFC2119||(e.respecRFC2119=rfc2119Usage);const n=document.querySelectorAll("abbr[title]");for(const e of n)t.set(e.textContent,e.title);const r=[...t.keys()],o=r.length?`(?:\\b${r.join("\\b)|(?:\\b")}\\b)`:null,i=getTextNodes(document.body,["#respec-ui",".head","pre"],{wsNodes:!1}),s=new RegExp((e.respecRFC2119Keywords||["\\bMUST(?:\\s+NOT)?\\b","\\bSHOULD(?:\\s+NOT)?\\b","\\bSHALL(?:\\s+NOT)?\\b","\\bMAY\\b","\\b(?:NOT\\s+)?REQUIRED\\b","\\b(?:NOT\\s+)?RECOMMENDED\\b","\\bOPTIONAL\\b"]).join("|")),a=new RegExp(`(${[s.source,inlineIdlReference.source,inlineVariable.source,inlineCitation.source,inlineExpansion.source,inlineAnchor.source,inlineCodeRegExp.source,inlineElement.source,...o?[o]:[]].join("|")})`);for(const n of i){const r=n.data.split(a);if(1===r.length)continue;const o=document.createDocumentFragment();let i=!0;for(const a of r)if(i=!i)if(a.startsWith("{{")){const e=inlineXrefMatches(a);o.append(e)}else if(a.startsWith("[[[")){const e=inlineRefMatches(a);o.append(e)}else if(a.startsWith("[[")){const t=inlineBibrefMatches(a,n,e);o.append(...t)}else if(a.startsWith("|")){const e=inlineVariableMatches(a);o.append(e)}else if(a.startsWith("[=")){const e=inlineAnchorMatches(a);o.append(e)}else if(a.startsWith("`")){const e=inlineCodeMatches(a);o.append(e)}else if(a.startsWith("[^")){const e=inlineElementMatches(a);o.append(e)}else if(t.has(a)){const e=inlineAbbrMatches(a,n,t);o.append(e)}else{if(!s.test(a))throw new Error(`Found token '${a}' but it does not correspond to anything`);{const e=inlineRFC2119Matches(a);o.append(e)}}else o.append(a);n.replaceWith(o)}}var inlines=Object.freeze({__proto__:null,name:name$o,rfc2119Usage:rfc2119Usage,run:run$d});const definitionMap=Object.create(null);function registerDefinition(e,t){for(const n of t.map(e=>e.toLowerCase()))n in definitionMap==!1?definitionMap[n]=[e]:definitionMap[n].includes(e)||definitionMap[n].push(e)}const name$p="core/dfn";function run$e(){document.querySelectorAll("dfn").forEach(e=>{const t=getDfnTitles(e);registerDefinition(e,t),e.dataset.dfnType||(e.dataset.dfnType="dfn"),1===t.length&&t[0]===norm(e.textContent)||(e.dataset.lt=t.join("|"))})}var dfn=Object.freeze({__proto__:null,name:name$p,run:run$e});const name$q="core/pluralize";function run$f(e){if(!e.pluralize)return;const t=getPluralizer();document.querySelectorAll("dfn:not([data-lt-no-plural]):not([data-lt-noDefault])").forEach(e=>{const n=[e.textContent];e.dataset.lt&&n.push(...e.dataset.lt.split("|"));const r=new Set(n.map(t).filter(e=>e));if(r.size){const t=e.dataset.plurals?e.dataset.plurals.split("|"):[],n=[...new Set([...t,...r])];e.dataset.plurals=n.join("|"),registerDefinition(e,n)}})}function getPluralizer(){const e=new Set;document.querySelectorAll("a:not([href])").forEach(t=>{const n=norm(t.textContent).toLowerCase();e.add(n),t.dataset.lt&&e.add(t.dataset.lt)});const t=new Set;return document.querySelectorAll("dfn:not([data-lt-noDefault])").forEach(e=>{const n=norm(e.textContent).toLowerCase();t.add(n),e.dataset.lt&&e.dataset.lt.split("|").forEach(e=>t.add(e))}),function(n){const r=norm(n).toLowerCase(),o=pluralize$1.isSingular(r)?pluralize$1.plural(r):pluralize$1.singular(r);return e.has(o)&&!t.has(o)?o:""}}var pluralize$2=Object.freeze({__proto__:null,name:name$q,run:run$f});const name$r="core/examples",localizationStrings$2={en:{example:"Example"},nl:{example:"Voorbeeld"},es:{example:"Ejemplo"}},lang$a=lang in localizationStrings$2?lang:"en",l10n$5=localizationStrings$2[lang$a],cssPromise=loadStyle$2();async function loadStyle$2(){try{return(await Promise.resolve().then((function(){return examples$2}))).default}catch{return fetchAsset("examples.css")}}function makeTitle(e,t,n){n.title=e.title,n.title&&e.removeAttribute("title");const r=t>0?` ${t}`:"",o=n.title?hyperHTML$1`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
        <span class="example-title">: ${n.title}</span>
      `:"";return hyperHTML$1`
=======
  `;
}

function stringifyReference(ref) {
  if (typeof ref === "string") return ref;
  let output = `<cite>${ref.title}</cite>`;

  output = ref.href ? `<a href="${ref.href}">${output}</a>. ` : `${output}. `;

  if (ref.authors && ref.authors.length) {
    output += ref.authors.join("; ");
    if (ref.etAl) output += " et al";
    output += ". ";
  }
  if (ref.publisher) {
    output = `${output} ${endWithDot(ref.publisher)} `;
  }
  if (ref.date) output += `${ref.date}. `;
  if (ref.status) output += `${REF_STATUSES.get(ref.status) || ref.status}. `;
  if (ref.href) output += `URL: <a href="${ref.href}">${ref.href}</a>`;
  return output;
}

/**
 * get aliases for a reference "key"
 */
function getAliases(refs) {
  return refs.reduce((aliases, ref) => {
    const key = ref.refcontent.id;
    const keys = !aliases.has(key)
      ? aliases.set(key, []).get(key)
      : aliases.get(key);
    keys.push(ref.ref);
    return aliases;
  }, new Map());
}

/**
 * fix biblio reference URLs
 * Add title attribute to references
 */
function decorateInlineReference(refs, aliases) {
  refs
    .map(({ ref, refcontent }) => {
      const refUrl = `#bib-${ref.toLowerCase()}`;
      const selectors = aliases
        .get(refcontent.id)
        .map(alias => `a.bibref[href="#bib-${alias.toLowerCase()}"]`)
        .join(",");
      const elems = document.querySelectorAll(selectors);
      return { refUrl, elems, refcontent };
    })
    .forEach(({ refUrl, elems, refcontent }) => {
      elems.forEach(a => {
        a.setAttribute("href", refUrl);
        a.setAttribute("title", refcontent.title);
        a.dataset.linkType = "biblio";
      });
    });
}

/**
 * warn about bad references
 */
function warnBadRefs(badRefs) {
  badRefs.forEach(({ ref }) => {
    const badrefs = [
      ...document.querySelectorAll(
        `a.bibref[href="#bib-${ref.toLowerCase()}"]`
      ),
    ].filter(({ textContent: t }) => t.toLowerCase() === ref.toLowerCase());
    const msg = `Bad reference: [\`${ref}\`] (appears ${badrefs.length} times)`;
    pub("error", msg);
    console.warn("Bad references: ", badrefs);
  });
}

var renderBiblio = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$n,
  run: run$c,
  renderInlineCitation: renderInlineCitation,
  wireReference: wireReference,
  stringifyReference: stringifyReference
});

// @ts-check

const name$o = "core/inlines";
const rfc2119Usage = {};

// Inline `code`
// TODO: Replace (?!`) at the end with (?:<!`) at the start when Firefox + Safari
// add support.
const inlineCodeRegExp = /(?:`[^`]+`)(?!`)/; // `code`
const inlineIdlReference = /(?:{{[^}]+}})/; // {{ WebIDLThing }}
const inlineVariable = /\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/; // |var : Type|
const inlineCitation = /(?:\[\[(?:!|\\|\?)?[A-Za-z0-9.-]+\]\])/; // [[citation]]
const inlineExpansion = /(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/; // [[[expand]]]
const inlineAnchor = /(?:\[=[^=]+=\])/; // Inline [= For/link =]
const inlineElement = /(?:\[\^[A-Za-z]+(?:-[A-Za-z]+)?\^\])/; // Inline [^element^]

/**
 * @param {string} matched
 * @return {HTMLElement}
 */
function inlineElementMatches(matched) {
  const value = matched.slice(2, -2).trim();
  const html = hyperHTML$1`<code><a data-xref-type="element">${value}</a></code>`;
  return html;
}

/**
 * @param {string} matched
 * @return {HTMLElement}
 */
function inlineRFC2119Matches(matched) {
  const value = norm(matched);
  const nodeElement = hyperHTML$1`<em class="rfc2119" title="${value}">${value}</em>`;
  // remember which ones were used
  rfc2119Usage[value] = true;
  return nodeElement;
}

/**
 * @param {string} matched
 * @return {HTMLElement}
 */
function inlineRefMatches(matched) {
  // slices "[[[" at the beginning and "]]]" at the end
  const ref = matched.slice(3, -3).trim();
  if (!ref.startsWith("#")) {
    return hyperHTML$1`<a data-cite="${ref}"></a>`;
  }
  if (document.querySelector(ref)) {
    return hyperHTML$1`<a href="${ref}"></a>`;
  }
  const badReference = hyperHTML$1`<span>${matched}</span>`;
  showInlineError(
    badReference, // cite element
    `Wasn't able to expand ${matched} as it didn't match any id in the document.`,
    `Please make sure there is element with id ${ref} in the document.`
  );
  return badReference;
}

/**
 * @param {string} matched
 */
function inlineXrefMatches(matched) {
  // slices "{{" at the beginning and "}}" at the end
  const ref = matched.slice(2, -2).trim();
  return ref.startsWith("\\")
    ? matched.replace("\\", "")
    : idlStringToHtml(norm(ref));
}

/**
 * @param {string} matched
 * @param {Text} txt
 * @param {Object} conf
 * @return {Iterable<string | Node>}
 */
function inlineBibrefMatches(matched, txt, conf) {
  // slices "[[" at the start and "]]" at the end
  const ref = matched.slice(2, -2);
  if (ref.startsWith("\\")) {
    return [`[[${ref.slice(1)}]]`];
  }
  const { type, illegal } = refTypeFromContext(ref, txt.parentNode);
  const cite = renderInlineCitation(ref);
  const cleanRef = ref.replace(/^(!|\?)/, "");
  if (illegal && !conf.normativeReferences.has(cleanRef)) {
    showInlineWarning(
      cite.childNodes[1], // cite element
      "Normative references in informative sections are not allowed. " +
        `Remove '!' from the start of the reference \`[[${ref}]]\``
    );
  }

  if (type === "informative" && !illegal) {
    conf.informativeReferences.add(cleanRef);
  } else {
    conf.normativeReferences.add(cleanRef);
  }
  return cite.childNodes;
}

/**
 * @param {string} matched
 * @param {Text} txt
 * @param {Map<string, string>} abbrMap
 */
function inlineAbbrMatches(matched, txt, abbrMap) {
  return txt.parentElement.tagName === "ABBR"
    ? matched
    : hyperHTML$1`<abbr title="${abbrMap.get(matched)}">${matched}</abbr>`;
}

/**
 * @example |varName: type| => <var data-type="type">varName</var>
 * @example |varName| => <var>varName</var>
 * @param {string} matched
 */
function inlineVariableMatches(matched) {
  // remove "|" at the beginning and at the end, then split at an optional `:`
  const matches = matched.slice(1, -1).split(":", 2);
  const [varName, type] = matches.map(s => s.trim());
  return hyperHTML$1`<var data-type="${type}">${varName}</var>`;
}

/**
 * @example [= foo =] => <a>foo</a>
 * @example [= bar/foo =] => <a data-link-for="bar" data-xref-for="bar">foo</a>
 * @example [= `foo` =] => <a><code>foo</code></a>
 * @example [= foo|bar =] => <a data-lt="foo">bar</a>
 * @param {string} matched
 */
function inlineAnchorMatches(matched) {
  matched = matched.slice(2, -2); // Chop [= =]
  const parts = matched.split("/", 2).map(s => s.trim());
  const [isFor, content] = parts.length === 2 ? parts : [null, parts[0]];
  const [linkingText, text] = content.includes("|")
    ? content.split("|", 2).map(s => s.trim())
    : [null, content];
  const processedContent = processInlineContent(text);
  const forContext = isFor ? norm(isFor) : null;
  return hyperHTML$1`<a data-link-for="${forContext}" data-xref-for="${forContext}" data-lt="${linkingText}">${processedContent}</a>`;
}

function inlineCodeMatches(matched) {
  const clean = matched.slice(1, -1); // Chop ` and `
  return hyperHTML$1`<code>${clean}</code>`;
}

function processInlineContent(text) {
  if (inlineCodeRegExp.test(text)) {
    // We use a capture group to split, so we can process all the parts.
    return text.split(/(`[^`]+`)(?!`)/).map(part => {
      return part.startsWith("`")
        ? inlineCodeMatches(part)
        : processInlineContent(part);
    });
  }
  return document.createTextNode(text);
}

function run$d(conf) {
  const abbrMap = new Map();
  document.normalize();
  if (!document.querySelector("section#conformance")) {
    // make the document informative
    document.body.classList.add("informative");
  }
  conf.normativeReferences = new InsensitiveStringSet();
  conf.informativeReferences = new InsensitiveStringSet();

  if (!conf.respecRFC2119) conf.respecRFC2119 = rfc2119Usage;

  // PRE-PROCESSING
  /** @type {NodeListOf<HTMLElement>} */
  const abbrs = document.querySelectorAll("abbr[title]");
  for (const abbr of abbrs) {
    abbrMap.set(abbr.textContent, abbr.title);
  }
  const aKeys = [...abbrMap.keys()];
  const abbrRx = aKeys.length ? `(?:\\b${aKeys.join("\\b)|(?:\\b")}\\b)` : null;

  // PROCESSING
  // Don't gather text nodes for these:
  const exclusions = ["#respec-ui", ".head", "pre"];
  const txts = getTextNodes(document.body, exclusions, {
    wsNodes: false, // we don't want nodes with just whitespace
  });
  const keywords = new RegExp(
    (
      conf.respecRFC2119Keywords || [
        "\\bMUST(?:\\s+NOT)?\\b",
        "\\bSHOULD(?:\\s+NOT)?\\b",
        "\\bSHALL(?:\\s+NOT)?\\b",
        "\\bMAY\\b",
        "\\b(?:NOT\\s+)?REQUIRED\\b",
        "\\b(?:NOT\\s+)?RECOMMENDED\\b",
        "\\bOPTIONAL\\b",
      ]
    ).join("|")
  );
  const rx = new RegExp(
    `(${[
      keywords.source,
      inlineIdlReference.source,
      inlineVariable.source,
      inlineCitation.source,
      inlineExpansion.source,
      inlineAnchor.source,
      inlineCodeRegExp.source,
      inlineElement.source,
      ...(abbrRx ? [abbrRx] : []),
    ].join("|")})`
  );
  for (const txt of txts) {
    const subtxt = txt.data.split(rx);
    if (subtxt.length === 1) continue;
    const df = document.createDocumentFragment();
    let matched = true;
    for (const t of subtxt) {
      matched = !matched;
      if (!matched) {
        df.append(t);
      } else if (t.startsWith("{{")) {
        const node = inlineXrefMatches(t);
        df.append(node);
      } else if (t.startsWith("[[[")) {
        const node = inlineRefMatches(t);
        df.append(node);
      } else if (t.startsWith("[[")) {
        const nodes = inlineBibrefMatches(t, txt, conf);
        df.append(...nodes);
      } else if (t.startsWith("|")) {
        const node = inlineVariableMatches(t);
        df.append(node);
      } else if (t.startsWith("[=")) {
        const node = inlineAnchorMatches(t);
        df.append(node);
      } else if (t.startsWith("`")) {
        const node = inlineCodeMatches(t);
        df.append(node);
      } else if (t.startsWith("[^")) {
        const node = inlineElementMatches(t);
        df.append(node);
      } else if (abbrMap.has(t)) {
        const node = inlineAbbrMatches(t, txt, abbrMap);
        df.append(node);
      } else if (keywords.test(t)) {
        const node = inlineRFC2119Matches(t);
        df.append(node);
      } else {
        // FAIL -- not sure that this can really happen
        throw new Error(
          `Found token '${t}' but it does not correspond to anything`
        );
      }
    }
    txt.replaceWith(df);
  }
}

var inlines = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$o,
  rfc2119Usage: rfc2119Usage,
  run: run$d
});

// @ts-check

/** @type {Record<string, HTMLElement[]>} */
const definitionMap = Object.create(null);

/**
 * @param {HTMLElement} dfn A definition element to register
 * @param {string[]} names Names to register the element by
 */
function registerDefinition(dfn, names) {
  for (const name of names.map(name => name.toLowerCase())) {
    if (name in definitionMap === false) {
      definitionMap[name] = [dfn];
    } else if (!definitionMap[name].includes(dfn)) {
      definitionMap[name].push(dfn);
    }
  }
}

// @ts-check

const name$p = "core/dfn";

function run$e() {
  document.querySelectorAll("dfn").forEach(dfn => {
    const titles = getDfnTitles(dfn);
    registerDefinition(dfn, titles);

    // Default to `dfn` as the type... other modules may override
    if (!dfn.dataset.dfnType) dfn.dataset.dfnType = "dfn";

    // Only add `lt`s that are different from the text content
    if (titles.length === 1 && titles[0] === norm(dfn.textContent)) {
      return;
    }
    dfn.dataset.lt = titles.join("|");
  });
}

var dfn = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$p,
  run: run$e
});

// @ts-check

const name$q = "core/pluralize";

function run$f(conf) {
  if (!conf.pluralize) return;

  const pluralizeDfn = getPluralizer();

  /** @type {NodeListOf<HTMLElement>} */
  const dfns = document.querySelectorAll(
    "dfn:not([data-lt-no-plural]):not([data-lt-noDefault])"
  );
  dfns.forEach(dfn => {
    const terms = [dfn.textContent];
    if (dfn.dataset.lt) terms.push(...dfn.dataset.lt.split("|"));

    const plurals = new Set(terms.map(pluralizeDfn).filter(plural => plural));

    if (plurals.size) {
      const userDefinedPlurals = dfn.dataset.plurals
        ? dfn.dataset.plurals.split("|")
        : [];
      const uniquePlurals = [...new Set([...userDefinedPlurals, ...plurals])];
      dfn.dataset.plurals = uniquePlurals.join("|");
      registerDefinition(dfn, uniquePlurals);
    }
  });
}

function getPluralizer() {
  /** @type {Set<string>} */
  const links = new Set();
  /** @type {NodeListOf<HTMLAnchorElement>} */
  const reflessAnchors = document.querySelectorAll("a:not([href])");
  reflessAnchors.forEach(el => {
    const normText = norm(el.textContent).toLowerCase();
    links.add(normText);
    if (el.dataset.lt) {
      links.add(el.dataset.lt);
    }
  });

  /** @type {Set<string>} */
  const dfnTexts = new Set();
  /** @type {NodeListOf<HTMLElement>} */
  const dfns = document.querySelectorAll("dfn:not([data-lt-noDefault])");
  dfns.forEach(dfn => {
    const normText = norm(dfn.textContent).toLowerCase();
    dfnTexts.add(normText);
    if (dfn.dataset.lt) {
      dfn.dataset.lt.split("|").forEach(lt => dfnTexts.add(lt));
    }
  });

  // returns pluralized/singularized term if `text` needs pluralization/singularization, "" otherwise
  return function pluralizeDfn(/** @type {string} */ text) {
    const normText = norm(text).toLowerCase();
    const plural = pluralize$1.isSingular(normText)
      ? pluralize$1.plural(normText)
      : pluralize$1.singular(normText);
    return links.has(plural) && !dfnTexts.has(plural) ? plural : "";
  };
}

var pluralize$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$q,
  run: run$f
});

// @ts-check

const name$r = "core/examples";

const localizationStrings$2 = {
  en: {
    example: "Example",
  },
  nl: {
    example: "Voorbeeld",
  },
  es: {
    example: "Ejemplo",
  },
};

const lang$a = lang in localizationStrings$2 ? lang : "en";

const l10n$5 = localizationStrings$2[lang$a];

const cssPromise = loadStyle$2();

async function loadStyle$2() {
  try {
    return (await Promise.resolve().then(function () { return examples$2; })).default;
  } catch {
    return fetchAsset("examples.css");
  }
}

/**
 * @typedef {object} Report
 * @property {number} number
 * @property {boolean} illegal
 * @property {string} [title]
 * @property {string} [content]
 *
 * @param {HTMLElement} elem
 * @param {number} num
 * @param {Report} report
 */
function makeTitle(elem, num, report) {
  report.title = elem.title;
  if (report.title) elem.removeAttribute("title");
  const number = num > 0 ? ` ${num}` : "";
  const title = report.title
    ? hyperHTML$1`
        <span class="example-title">: ${report.title}</span>
      `
    : "";
  return hyperHTML$1`
>>>>>>> Build
    <div class="marker">
      <a class="self-link">${l10n$5.example}<bdi>${number}</bdi></a
      >${title}
    </div>
  `;
}

async function run$g() {
  /** @type {NodeListOf<HTMLElement>} */
  const examples = document.querySelectorAll(
    "pre.example, pre.illegal-example, aside.example"
  );
  if (!examples.length) return;

  const css = await cssPromise;
  document.head.insertBefore(
    hyperHTML$1`
      <style>
        ${css}
      </style>
<<<<<<< gh-pages
<<<<<<< gh-pages
    `,document.querySelector("link"));let n=0;e.forEach(e=>{const t=e.classList.contains("illegal-example"),r={number:n,illegal:t},{title:o}=e;if("aside"===e.localName){++n;const t=makeTitle(e,n,r);e.prepend(t),o?addId(e,`example-${n}`,o):addId(e,"example",String(n));const{id:i}=e;t.querySelector("a.self-link").href=`#${i}`,pub("example",r)}else{const t=!!e.closest("aside");t||++n,r.content=e.innerHTML,e.classList.remove("example","illegal-example");const i=e.id?e.id:null;i&&e.removeAttribute("id");const s=makeTitle(e,t?0:n,r),a=hyperHTML$1`
        <div class="example" id="${i}">
          ${s} ${e.cloneNode(!0)}
        </div>
      `;o&&addId(a,`example-${n}`,o),addId(a,"example",String(n)),a.querySelector("a.self-link").href=`#${a.id}`,e.replaceWith(a),t||pub("example",r)}})}var examples=Object.freeze({__proto__:null,name:name$r,run:run$g});const name$s="core/issues-notes",localizationStrings$3={en:{issue_summary:"Issue Summary",no_issues_in_spec:"There are no issues listed in this specification."},nl:{issue_summary:"Lijst met issues",no_issues_in_spec:"Er zijn geen problemen vermeld in deze specificatie."},es:{issue_summary:"Resumen de la cuestión",no_issues_in_spec:"No hay problemas enumerados en esta especificación."}},cssPromise$1=loadStyle$3();async function loadStyle$3(){try{return(await Promise.resolve().then((function(){return issuesNotes$2}))).default}catch{return fetchAsset("issues-notes.css")}}const l10n$6=getIntlData(localizationStrings$3);function handleIssues(e,t,n){const r=!!document.querySelector(".issue[data-number]");let o=0;const i=document.createElement("ul");e.forEach(e=>{const{type:s,displayType:a,isFeatureAtRisk:l}=getIssueType(e,n),c="issue"===s,u="span"===e.localName,{number:d}=e.dataset,p={type:s,inline:u,title:e.title};if(!c||u||r?d&&(p.number=Number(d)):(o++,p.number=o),!u){const u=hyperHTML$1`<div class="${l?`${s} atrisk`:s}" role="${"note"===s?"note":null}"></div>`,h=document.createElement("span"),f=hyperHTML$1`
        <div role='heading' class='${`${s}-title marker`}'>${h}</div>`;addId(f,"h",s);let m,g=a;if(e.id?(u.id=e.id,e.removeAttribute("id")):addId(u,"issue-container",p.number?`number-${p.number}`:""),c){if(r){if(d){g+=` ${d}`;const e=linkToIssueTracker(d,n,{isFeatureAtRisk:l});e&&(h.before(e),e.append(h)),h.classList.add("issue-number"),m=t.get(d),m||pub("warning",`Failed to fetch issue number ${d}`),m&&!p.title&&(p.title=m.title)}}else g+=` ${o}`;void 0!==p.number&&i.append(createIssueSummaryEntry(n.l10n.issue,p,u.id))}if(h.textContent=g,p.title){e.removeAttribute("title");const{repoURL:t=""}=n.github||{},r=m?m.labels:[];m&&"CLOSED"===m.state&&u.classList.add("closed"),f.append(createLabelsGroup(r,p.title,t))}let b=e;e.replaceWith(u),b.classList.remove(s),b.removeAttribute("data-number"),m&&!b.innerHTML.trim()&&(b=document.createRange().createContextualFragment(m.bodyHTML)),u.append(f,b);const $=parents(f,"section").length+2;f.setAttribute("aria-level",$)}pub(p.type,p)}),makeIssueSectionSummary(i)}function getIssueType(e,t){const n=e.classList.contains("issue"),r=e.classList.contains("warning"),o=e.classList.contains("ednote"),i=e.classList.contains("atrisk");return{type:n?"issue":r?"warning":o?"ednote":"note",displayType:n?i?t.l10n.feature_at_risk:t.l10n.issue:r?t.l10n.warning:o?t.l10n.editors_note:t.l10n.note,isFeatureAtRisk:i}}function linkToIssueTracker(e,t,{isFeatureAtRisk:n=!1}={}){return!n&&t.issueBase?hyperHTML$1`<a href='${t.issueBase+e}'/>`:n&&t.atRiskBase?hyperHTML$1`<a href='${t.atRiskBase+e}'/>`:void 0}function createIssueSummaryEntry(e,t,n){const r=`${e} ${t.number}`,o=t.title?hyperHTML$1`<span style="text-transform: none">: ${t.title}</span>`:"";return hyperHTML$1`
    <li><a href="${`#${n}`}">${r}</a>${o}</li>
  `}function makeIssueSectionSummary(e){const t=document.getElementById("issue-summary");if(!t)return;const n=t.querySelector("h2, h3, h4, h5, h6");e.hasChildNodes()?t.append(e):t.append(hyperHTML$1`<p>${l10n$6.no_issues_in_spec}</p>`),(!n||n&&n!==t.firstElementChild)&&t.insertAdjacentHTML("afterbegin",`<h2>${l10n$6.issue_summary}</h2>`)}function isLight(e){return.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e>>0&255)>140}function createLabelsGroup(e,t,n){const r=e.map(e=>createLabel(e,n)),o=e.map(e=>e.name),i=joinAnd(o);if(r.length&&r.unshift(document.createTextNode(" ")),o.length){return hyperHTML$1`<span
      class="issue-label"
      aria-label="${`This issue is labelled as ${i}.`}">: ${t}${r}</span>`}return hyperHTML$1`<span class="issue-label">: ${t}${r}</span>`}function createLabel(e,t){const{color:n,name:r}=e,o=new URL("./issues/",t);o.searchParams.set("q",`is:issue is:open label:"${e.name}"`);const i=parseInt(n,16),s=isNaN(i)||isLight(i)?"light":"dark";return hyperHTML$1`<a
    class="${`respec-gh-label respec-label-${s}`}"
    style="${`background-color: #${n}`}"
    href="${o.href}">${r}</a>`}async function fetchAndStoreGithubIssues(e){if(!e||!e.apiBase)return new Map;const t=[...document.querySelectorAll(".issue[data-number]")].map(e=>Number.parseInt(e.dataset.number,10)).filter(e=>e);if(!t.length)return new Map;const n=new URL("issues",`${e.apiBase}/${e.fullName}/`);n.searchParams.set("issues",t.join(","));const r=await fetch(n.href);if(!r.ok){return pub("error",`Error fetching issues from GitHub. (HTTP Status ${r.status}).`),new Map}const o=await r.json();return new Map(Object.entries(o))}async function run$h(e){const t=document.querySelectorAll(".issue, .note, .warning, .ednote");if(!t.length)return;const n=await fetchAndStoreGithubIssues(e.github),r=await cssPromise$1,{head:o}=document;o.insertBefore(hyperHTML$1`<style>${[r]}</style>`,o.querySelector("link")),handleIssues(t,n,e),document.querySelectorAll(".ednote").forEach(e=>{e.classList.remove("ednote"),e.classList.add("note")})}var issuesNotes=Object.freeze({__proto__:null,name:name$s,run:run$h});const name$t="core/best-practices",localizationStrings$4={en:{best_practice:"Best Practice "}},l10n$7=getIntlData(localizationStrings$4),lang$8=lang in localizationStrings$4?lang:"en";function run$i(){const e=document.querySelectorAll(".practicelab"),t=document.getElementById("bp-summary"),n=t?document.createElement("ul"):null;[...e].forEach((e,t)=>{const r=addId(e,"bp"),o=hyperHTML$1`
      <a class="marker self-link" href="${`#${r}`}"><bdi lang="${lang$8}">${l10n$7.best_practice}${t+1}</bdi></a>`;if(n){const t=hyperHTML$1`
        <li>
          ${o}: ${makeSafeCopy(e)}
        </li>
      `;n.appendChild(t)}const i=e.closest("div");if(!i)return void e.classList.add("advisement");i.classList.add("advisement");const s=hyperHTML$1`${o.cloneNode(!0)}: ${e}`;i.prepend(...s.childNodes)}),e.length?t&&(t.appendChild(hyperHTML$1`<h2>Best Practices Summary</h2>`),t.appendChild(n)):t&&(pub("warn","Using best practices summary (#bp-summary) but no best practices found."),t.remove())}var bestPractices=Object.freeze({__proto__:null,name:name$t,run:run$i});const name$u="core/figures",localizationStrings$5={en:{list_of_figures:"List of Figures",fig:"Figure "},ja:{fig:"図",list_of_figures:"図のリスト"},ko:{fig:"그림 ",list_of_figures:"그림 목록"},nl:{fig:"Figuur ",list_of_figures:"Lijst met figuren"},es:{fig:"Figura ",list_of_figures:"Lista de Figuras"},zh:{fig:"圖 ",list_of_figures:"List of Figures"}},l10n$8=getIntlData(localizationStrings$5);function run$j(){normalizeImages(document);const e=collectFigures(),t=document.getElementById("tof");e.length&&t&&(decorateTableOfFigures(t),t.append(hyperHTML$1`<h2>${l10n$8.list_of_figures}</h2>`,hyperHTML$1`<ul class='tof'>${e}</ul>`))}function collectFigures(){const e=[];return document.querySelectorAll("figure").forEach((t,n)=>{const r=t.querySelector("figcaption");r?(decorateFigure(t,r,n),e.push(getTableOfFiguresListItem(t.id,r))):showInlineWarning(t,"Found a `<figure>` without a `<figcaption>`")}),e}function decorateFigure(e,t,n){addId(e,"fig",t.textContent),wrapInner(t,hyperHTML$1`<span class='fig-title'>`),t.prepend(l10n$8.fig,hyperHTML$1`<bdi class='figno'>${n+1}</bdi>`," ")}function getTableOfFiguresListItem(e,t){const n=t.cloneNode(!0);return n.querySelectorAll("a").forEach(e=>{renameElement(e,"span").removeAttribute("href")}),hyperHTML$1`<li class='tofline'>
    <a class='tocxref' href='${`#${e}`}'>${n.childNodes}</a>
  </li>`}function normalizeImages(e){e.querySelectorAll(":not(picture)>img:not([width]):not([height]):not([srcset])").forEach(e=>{0!==e.naturalHeight&&0!==e.naturalWidth&&(e.height=e.naturalHeight,e.width=e.naturalWidth)})}function decorateTableOfFigures(e){if(e.classList.contains("appendix")||e.classList.contains("introductory")||e.closest("section"))return;const t=getPreviousSections(e);t.every(e=>e.classList.contains("introductory"))?e.classList.add("introductory"):t.some(e=>e.classList.contains("appendix"))&&e.classList.add("appendix")}function getPreviousSections(e){const t=[];for(const n of iteratePreviousElements(e))"section"===n.localName&&t.push(n);return t}function*iteratePreviousElements(e){let t=e;for(;t.previousElementSibling;)t=t.previousElementSibling,yield t}var figures=Object.freeze({__proto__:null,name:name$u,run:run$j});const name$v="core/data-cite";function requestLookup(e){const t=citeDetailsConverter(e);return async n=>{const r=n.dataset.cite,{key:o,frag:i,path:s}=t(n);let a="",l="";if(o.toLowerCase()===e.shortName.toLowerCase())console.log(n,`The reference "${o}" is resolved into the current document per \`conf.shortName\`.`),a=document.location.href;else{const e=await resolveRef(o);if(cleanElement(n),!e)return void showInlineWarning(n,`Couldn't find a match for "${r}"`);a=e.href,l=e.title}if(s){const e=s.startsWith("/")?`.${s}`:s;a=new URL(e,a).href}switch(i&&(a=new URL(i,a).href),n.localName){case"a":if(""===n.textContent&&"the-empty-string"!==n.dataset.lt&&(n.textContent=l),n.href=a,!s&&!i){const e=document.createElement("cite");n.replaceWith(e),e.append(n)}break;case"dfn":{const e=document.createElement("a");if(e.href=a,n.textContent?wrapInner(n,e):(e.textContent=l,n.append(e)),!s&&!i){const t=document.createElement("cite");t.append(e),n.append(t)}"export"in n.dataset&&(showInlineError(n,"Exporting an linked external definition is not allowed. Please remove the `data-export` attribute","Please remove the `data-export` attribute."),delete n.dataset.export),n.dataset.noExport="";break}}}}function cleanElement(e){["data-cite","data-cite-frag"].filter(t=>e.hasAttribute(t)).forEach(t=>e.removeAttribute(t))}function makeComponentFinder(e){return t=>{const n=t.search(e);return-1!==n?t.substring(n):""}}function citeDetailsConverter(e){const t=makeComponentFinder("#"),n=makeComponentFinder("/");return function r(o){const{dataset:i}=o,{cite:s,citeFrag:a,citePath:l}=i;if(s.startsWith("#")&&!a){const t=o.parentElement.closest('[data-cite]:not([data-cite^="#"])'),{key:n,isNormative:a}=t?r(t):{key:e.shortName||"",isNormative:!1};return i.cite=a?n:`?${n}`,i.citeFrag=s.replace("#",""),r(o)}const c=a?`#${a}`:t(s),u=l||n(s).split("#")[0],{type:d}=refTypeFromContext(s,o),p="normative"===d,h=/^[?|!]/.test(s);return{key:s.split(/[/|#]/)[0].substring(Number(h)),isNormative:p,frag:c,path:u}}}async function run$k(e){const t=citeDetailsConverter(e),n=document.querySelectorAll("dfn[data-cite], a[data-cite]");Array.from(n).filter(e=>e.dataset.cite).map(t).filter(({key:t})=>t.toLowerCase()!==(e.shortName||"").toLowerCase()).forEach(({isNormative:t,key:n})=>{t||e.normativeReferences.has(n)?(e.normativeReferences.add(n),e.informativeReferences.delete(n)):e.informativeReferences.add(n)})}async function linkInlineCitations(e,t=respecConfig){const n=requestLookup(t),r=[...e.querySelectorAll("dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])")],o=citeDetailsConverter(t),i=r.map(o).map(async e=>{return{entry:e,result:await resolveRef(e.key)}}),s=(await Promise.all(i)).filter(({result:e})=>null===e).map(({entry:{key:e}})=>e),a=await updateFromNetwork(s);a&&Object.assign(biblio,a);const l=[...new Set(r)].map(n);return await Promise.all(l)}var dataCite=Object.freeze({__proto__:null,name:name$v,run:run$k,linkInlineCitations:linkInlineCitations});const VERSION_CHECK_WAIT=18e6;async function getIdbCache(){const e=await idb.openDB("xref",1,{upgrade(e){e.createObjectStore("xrefs")}});return new IDBKeyVal(e,"xrefs")}async function resolveXrefCache(e){try{const t=await getIdbCache();return await resolveFromCache(e,t)}catch(e){return console.error(e),new Map}}async function resolveFromCache(e,t){return await shouldBustCache(t)?(await t.clear(),new Map):await t.getMany(e.map(e=>e.id))}async function shouldBustCache(e){const t=await e.get("__LAST_VERSION_CHECK__"),n=Date.now();if(!t)return await e.set("__LAST_VERSION_CHECK__",n),!1;if(n-t<VERSION_CHECK_WAIT)return!1;const r=new URL("meta/version",API_URL).href,o=await fetch(r);if(!o.ok)return!1;const i=await o.text();return await e.set("__LAST_VERSION_CHECK__",n),parseInt(i,10)>t}async function cacheXrefData(e){try{const t=await getIdbCache();await t.addMany(e)}catch(e){console.error(e)}}const profiles={"web-platform":["HTML","INFRA","URL","WEBIDL","DOM","FETCH"]},API_URL="https://respec.org/xref/";if(!document.querySelector("link[rel='preconnect'][href='https://respec.org']")){const e=createResourceHint({hint:"preconnect",href:"https://respec.org"});document.head.appendChild(e)}async function run$l(e,t){const n=normalizeConfig(e.xref);if(n.specs){const e=document.body.dataset.cite?document.body.dataset.cite.split(/\s+/):[];document.body.dataset.cite=e.concat(n.specs).join(" ")}if(!t.length)return;const r=[];for(const e of t){const t=getRequestEntry(e),n=await objectHash(t);r.push({...t,id:n})}addDataCiteToTerms(t,r,await getData(r,n.url),e)}function normalizeConfig(e){const t={url:API_URL,specs:null},n=Object.assign({},t);switch(Array.isArray(e)?"array":typeof e){case"boolean":break;case"string":e.toLowerCase()in profiles?Object.assign(n,{specs:profiles[e.toLowerCase()]}):r(e);break;case"array":Object.assign(n,{specs:e});break;case"object":if(Object.assign(n,e),e.profile){const t=e.profile.toLowerCase();if(t in profiles){const r=(e.specs||[]).concat(profiles[t]);Object.assign(n,{specs:r})}else r(e.profile)}break;default:pub("error",`Invalid value for \`xref\` configuration option. Received: "${e}".`)}return n;function r(e){pub("error",`Invalid profile "${e}" in \`respecConfig.xref\`. `+`Please use one of the supported profiles: ${Object.keys(profiles).map(e=>`"${e}"`).join(", ")}.`)}}function getRequestEntry(e){const t="xrefType"in e.dataset;let n=getTermFromElement(e);t||(n=n.toLowerCase());const r=[];let o=e.closest("[data-cite]");for(;o;){const t=o.dataset.cite.toLowerCase().replace(/[!?]/g,"").split(/\s+/).filter(e=>e);if(t.length&&r.push(t.sort()),o===e)break;o=o.parentElement.closest("[data-cite]")}if(e.closest("[data-cite]")!==e){const t=e.closest("section"),n=[...t?t.querySelectorAll("a.bibref"):[]].map(e=>e.textContent.toLowerCase()),o=[...new Set(n)].sort();o.length&&r.unshift(o)}const i=[];t?e.dataset.xrefType?i.push(...e.dataset.xrefType.split("|")):i.push("_IDL_"):i.push("_CONCEPT_");let{xrefFor:s}=e.dataset;if(!s&&t){const t=e.closest("[data-xref-for]");t&&(s=norm(t.dataset.xrefFor))}else s&&"string"==typeof s&&(s=norm(s));return{term:n,types:i,...r.length&&{specs:r},..."string"==typeof s&&{for:s}}}function getTermFromElement(e){const{lt:t}=e.dataset;let n=t?t.split("|",1)[0]:e.textContent;return n=norm(n),"the-empty-string"===n?"":n}async function getData(e,t){const n=new Set,r=e.filter(e=>!n.has(e.id)&&(n.add(e.id)&&!0)),o=await resolveXrefCache(r),i=r.filter(e=>!o.get(e.id)),s=await fetchFromNetwork(i,t);return s.size&&await cacheXrefData(s),new Map([...o,...s])}async function fetchFromNetwork(e,t){if(!e.length)return new Map;const n={keys:e},r={method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}},o=await fetch(t,r),i=await o.json();return new Map(i.result)}function isNormative(e){const t=e.closest(".normative"),n=e.closest(nonNormativeSelector);return!n||e===t||t&&n&&n.contains(t)}function addDataCiteToTerms(e,t,n,r){const o={ambiguous:new Map,notFound:new Map};for(let i=0,s=e.length;i<s;i++){if(e[i].closest("[data-no-xref]"))continue;const s=e[i],a=t[i],{id:l}=a,c=n.get(l);if(1===c.length)addDataCite(s,a,c[0],r);else{const e=o[0===c.length?"notFound":"ambiguous"];e.has(l)||e.set(l,{elems:[],results:c,query:a}),e.get(l).elems.push(s)}}showErrors(o)}function addDataCite(e,t,n,r){const{term:o}=t,{uri:i,shortname:s,normative:a,type:l}=n,c=i.includes("/")?i.split("/",1)[1]:i,[u,d]=c.split("#"),p={cite:s,citePath:u,citeFrag:d,type:l};Object.assign(e.dataset,p),addToReferences(e,s,a,o,r)}function addToReferences(e,t,n,r,o){if(!isNormative(e))return void(o.normativeReferences.has(t)||o.informativeReferences.add(t));if(n){const e=o.informativeReferences.has(t)?o.informativeReferences.getCanonicalKey(t):t;return o.normativeReferences.add(e),void o.informativeReferences.delete(e)}showInlineWarning(e,`Adding an informative reference to "${r}" from "${t}" `+"in a normative section","Error: Informative reference in normative section")}function showErrors({ambiguous:e,notFound:t}){const n=(e,t,n=[])=>{const r=new URL(API_URL);return r.searchParams.set("term",e),t.for&&r.searchParams.set("for",t.for),r.searchParams.set("types",t.types.join(",")),n.length&&r.searchParams.set("cite",n.join(",")),r};for(const{query:e,elems:r}of t.values()){const t=[...new Set(flatten([],e.specs))].sort(),o=getTermFromElement(r[0]),i=n(o,e,t);showInlineError(r,`Couldn't match "**${o}**" to anything in the document or in any other document cited in this specification: ${t.map(e=>`\`${e}\``).join(", ")}. `+`See [how to cite to resolve the error](${i})`,"Error: No matching dfn found.")}for(const{query:t,elems:r,results:o}of e.values()){const e=[...new Set(o.map(e=>e.shortname))].sort(),i=e.map(e=>`**${e}**`).join(", "),s=getTermFromElement(r[0]);showInlineError(r,`The term "**${s}**" is defined in ${i} in multiple ways, so it's ambiguous. `+`See [how to cite to resolve the error](${n(s,t,e)})`,"Error: Linking an ambiguous dfn.")}}function objectHash(e){const t=JSON.stringify(e,Object.keys(e).sort()),n=(new TextEncoder).encode(t);return crypto.subtle.digest("SHA-1",n).then(bufferToHexString)}function bufferToHexString(e){return[...new Uint8Array(e)].map(e=>e.toString(16).padStart(2,"0")).join("")}const name$w="core/link-to-dfn",localizationStrings$6={en:{duplicateMsg:e=>`Duplicate definition(s) of '${e}'`,duplicateTitle:"This is defined more than once in the document."}},l10n$9=getIntlData(localizationStrings$6);class CaseInsensitiveMap extends Map{constructor(e=[]){return super(),e.forEach(([e,t])=>{this.set(e,t)}),this}set(e,t){return super.set(e.toLowerCase(),t),this}get(e){return super.get(e.toLowerCase())}has(e){return super.has(e.toLowerCase())}delete(e){return super.delete(e.toLowerCase())}}async function run$m(e){const t=mapTitleToDfns(),n=[],r=[];if(document.querySelectorAll("a[data-cite=''], a:not([href]):not([data-cite]):not(.logo):not(.externalDFN)").forEach(e=>{const o=getLinkTargets(e);o.some(r=>findLinkTarget(r,e,t,n))||0===o.length||(""===e.dataset.cite?r.push(e):n.push(e))}),showLinkingError(r),e.xref){n.push(...findExplicitExternalLinks());try{await run$l(e,n)}catch(e){console.error(e),showLinkingError(n)}}else showLinkingError(n);await linkInlineCitations(document,e),pub("end","core/link-to-dfn")}function mapTitleToDfns(){const e=new CaseInsensitiveMap;return Object.keys(definitionMap).forEach(t=>{const{result:n,duplicates:r}=collectDfns(t);e.set(t,n),r.length>0&&showInlineError(r,l10n$9.duplicateMsg(t),l10n$9.duplicateTitle)}),e}function collectDfns(e){const t=new Map,n=[];return definitionMap[e].forEach(r=>{const{dfnFor:o=""}=r.dataset;if(t.has(o)){const e="dfn"===t.get(o).localName,i="dfn"===r.localName;if(e){if(!i)return;n.push(r)}}t.set(o,r),addId(r,"dfn",e)}),{result:t,duplicates:n}}function findLinkTarget(e,t,n,r){const{linkFor:o}=t.dataset;if(!n.has(e.title)||!n.get(e.title).get(e.for))return!1;const i=n.get(e.title).get(e.for);if(i.dataset.cite)t.dataset.cite=i.dataset.cite;else if(o&&!n.get(o))r.push(t);else if(i.classList.contains("externalDFN")){const e=i.dataset.lt?i.dataset.lt.split("|"):[];t.dataset.lt=e[0]||i.textContent,r.push(t)}else"partial"===t.dataset.idl?r.push(t):(t.href=`#${i.id}`,t.classList.add("internalDFN"));return t.hasAttribute("data-link-type")||(t.dataset.linkType="idl"in i.dataset?"idl":"dfn"),isCode(i)&&wrapAsCode(t,i),!0}function isCode(e){if(e.closest("code,pre"))return!0;if(1!==e.childNodes.length)return!1;const[t]=e.childNodes;return"code"===t.localName}function wrapAsCode(e,t){const n=e.textContent.trim(),r=t.dataset.hasOwnProperty("idl"),o=shouldWrapByCode(e)||shouldWrapByCode(t,n);r&&!o||wrapInner(e,document.createElement("code"))}function shouldWrapByCode(e,t=""){switch(e.localName){case"a":if(e.querySelector("code"))return!0;break;default:{const{dataset:n}=e;if(e.textContent.trim()===t)return!0;if(n.title===t)return!0;if(n.lt||n.localLt){const e=[];return n.lt&&e.push(...n.lt.split("|")),n.localLt&&e.push(...n.localLt.split("|")),e.includes(t)}}}return!1}function findExplicitExternalLinks(){const e=document.querySelectorAll("a[data-cite]:not([data-cite='']):not([data-cite*='#']), dfn[data-cite]:not([data-cite='']):not([data-cite*='#'])"),t=document.querySelectorAll("dfn.externalDFN");return[...e].filter(e=>{if(""===e.textContent.trim())return!1;const t=e.closest("[data-cite]");return!t||""!==t.dataset.cite}).concat(...t)}function showLinkingError(e){e.forEach(e=>{showInlineWarning(e,`Found linkless \`<a>\` element with text "${e.textContent}" but no matching \`<dfn>\``,"Linking error: not matching `<dfn>`")})}var linkToDfn=Object.freeze({__proto__:null,name:name$w,run:run$m});const name$x="core/contrib";async function run$n(e){if(!document.getElementById("gh-contributors"))return;if(!e.github){return void pub("error","Requested list of contributors from GitHub, but [`github`](https://github.com/w3c/respec/wiki/github) configuration option is not set.")}const t=e.editors.map(e=>e.name),n=`${e.github.apiBase}/${e.github.fullName}/`;await showContributors(t,n)}async function showContributors(e,t){const n=document.getElementById("gh-contributors");if(!n)return;n.textContent="Fetching list of contributors...";const r=await async function(){const{href:n}=new URL("contributors",t);try{const t=await fetchAndCache(n);if(!t.ok)throw new Error(`Request to ${n} failed with status code ${t.status}`);return(await t.json()).filter(t=>!e.includes(t.name||t.login))}catch(e){return pub("error","Error loading contributors from GitHub."),console.error(e),null}}();null!==r?toHTML(r,n):n.textContent="Failed to fetch contributors."}function toHTML(e,t){const n=e.sort((e,t)=>{const n=e.name||e.login,r=t.name||t.login;return n.toLowerCase().localeCompare(r.toLowerCase())});if("UL"===t.tagName)return void hyperHTML$1(t)`${n.map(({name:e,login:t})=>`<li><a href="https://github.com/${t}">${e||t}</a></li>`)}`;const r=n.map(e=>e.name||e.login);t.textContent=joinAnd(r)}var contrib=Object.freeze({__proto__:null,name:name$x,run:run$n});const name$y="core/fix-headers";function run$o(){[...document.querySelectorAll("section:not(.introductory)")].map(e=>e.querySelector("h1, h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{renameElement(e,`h${Math.min(getParents(e,"section").length+1,6)}`)})}function getParents(e,t){const n=[];for(;e!=e.ownerDocument.body;)e.matches(t)&&n.push(e),e=e.parentElement;return n}var fixHeaders=Object.freeze({__proto__:null,name:name$y,run:run$o});const lowerHeaderTags=["h2","h3","h4","h5","h6"],headerTags=["h1",...lowerHeaderTags],alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ",name$z="core/structure",localizationStrings$7={en:{toc:"Table of Contents"},nl:{toc:"Inhoudsopgave"},es:{toc:"Tabla de Contenidos"}},l10n$a=getIntlData(localizationStrings$7);function scanSections(e,t,{prefix:n=""}={}){let r=!1,o=0,i=1;if(n.length&&!n.endsWith(".")&&(n+="."),0===e.length)return null;const s=hyperHTML$1`<ol class='toc'>`;for(const a of e){!a.isAppendix||n||r||(o=i,r=!0);let e=a.isIntro?"":r?alphabet.charAt(i-o):n+i;const l=Math.ceil(e.length/2);if(1===l&&(e+=".",a.header.before(document.createComment("OddPage"))),a.isIntro||(i+=1,a.header.prepend(hyperHTML$1`<bdi class='secno'>${e} </bdi>`)),l<=t){const n=a.header.id||a.element.id,r=createTocListItem(a.header,n),o=scanSections(a.subsections,t,{prefix:e});o&&r.append(o),s.append(r)}}return s}function getSectionTree(e,{tocIntroductory:t=!1}={}){const n=children(e,t?"section":"section:not(.introductory)"),r=[];for(const e of n){const n=e.classList.contains("notoc");if(!e.children.length||n)continue;const o=e.children[0];if(!lowerHeaderTags.includes(o.localName))continue;const i=o.textContent;addId(e,null,i),r.push({element:e,header:o,title:i,isIntro:e.classList.contains("introductory"),isAppendix:e.classList.contains("appendix"),subsections:getSectionTree(e,{tocIntroductory:t})})}return r}function createTocListItem(e,t){const n=hyperHTML$1`<a href="${`#${t}`}" class="tocxref"/>`;return n.append(...e.cloneNode(!0).childNodes),filterHeader(n),hyperHTML$1`<li class='tocline'>${n}</li>`}function filterHeader(e){e.querySelectorAll("a").forEach(e=>{const t=renameElement(e,"span");t.className="formerLink",t.removeAttribute("href")}),e.querySelectorAll("dfn").forEach(e=>{renameElement(e,"span").removeAttribute("id")})}function run$p(e){if("tocIntroductory"in e==!1&&(e.tocIntroductory=!1),"maxTocLevel"in e==!1&&(e.maxTocLevel=1/0),renameSectionHeaders(),!e.noTOC){const t=scanSections(getSectionTree(document.body,{tocIntroductory:e.tocIntroductory}),e.maxTocLevel);t&&createTableOfContents(t)}}function renameSectionHeaders(){const e=getNonintroductorySectionHeaders();e.length&&e.forEach(e=>{const t=`h${Math.min(parents(e,"section").length+1,6)}`;e.localName!==t&&renameElement(e,t)})}function getNonintroductorySectionHeaders(){const e=headerTags.map(e=>`section:not(.introductory) ${e}:first-child`).join(",");return[...document.querySelectorAll(e)].filter(e=>!e.closest("section.introductory"))}function createTableOfContents(e){if(!e)return;const t=hyperHTML$1`<nav id="toc">`,n=hyperHTML$1`<h2 class="introductory">${l10n$a.toc}</h2>`;addId(n),t.append(n,e);const r=document.getElementById("toc")||document.getElementById("sotd")||document.getElementById("abstract");r&&("toc"===r.id?r.replaceWith(t):r.after(t));const o=hyperHTML$1`<p role='navigation' id='back-to-top'><a href='#title'><abbr title='Back to Top'>&uarr;</abbr></a></p>`;document.body.append(o)}var structure$1=Object.freeze({__proto__:null,name:name$z,run:run$p});const name$A="core/informative",localizationStrings$8={en:{informative:"This section is non-normative."},nl:{informative:"Dit onderdeel is niet normatief."}},l10n$b=getIntlData(localizationStrings$8);function run$q(){Array.from(document.querySelectorAll("section.informative")).map(e=>e.querySelector("h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{e.after(hyperHTML$1`<p><em>${l10n$b.informative}</em></p>`)})}var informative=Object.freeze({__proto__:null,name:name$A,run:run$q});const name$B="core/id-headers";function run$r(e){const t=document.querySelectorAll("section:not(.head):not(.introductory) h2, h3, h4, h5, h6");for(const n of t){let t=n.id;t||(addId(n),t=n.parentElement.id||n.id),e.addSectionLinks&&n.appendChild(hyperHTML$1`
      <a href="${`#${t}`}" class="self-link" aria-label="§"></a>
    `)}}var idHeaders=Object.freeze({__proto__:null,name:name$B,run:run$r});const name$C="geonovum/conformance";function processConformance(e){const t=hyperHTML$1`
=======
    `,document.querySelector("link"));let n=0;e.forEach(e=>{const t=e.classList.contains("illegal-example"),r={number:n,illegal:t},{title:o}=e;if("aside"===e.localName){const t=makeTitle(e,++n,r);e.prepend(t),o?addId(e,`example-${n}`,o):addId(e,"example",String(n));const{id:i}=e;t.querySelector("a.self-link").href=`#${i}`,pub("example",r)}else{const t=!!e.closest("aside");t||++n,r.content=e.innerHTML,e.classList.remove("example","illegal-example");const i=e.id?e.id:null;i&&e.removeAttribute("id");const s=makeTitle(e,t?0:n,r),a=hyperHTML$1`
        <div class="example" id="${i}">
          ${s} ${e.cloneNode(!0)}
=======
    `,
    document.querySelector("link")
  );

  let number = 0;
  examples.forEach(example => {
    const illegal = example.classList.contains("illegal-example");
    /** @type {Report} */
    const report = {
      number,
      illegal,
    };
    const { title } = example;
    if (example.localName === "aside") {
      ++number;
      const div = makeTitle(example, number, report);
      example.prepend(div);
      if (title) {
        addId(example, `example-${number}`, title); // title gets used
      } else {
        // use the number as the title... so, e.g., "example-5"
        addId(example, `example`, String(number));
      }
      const { id } = example;
      const selfLink = div.querySelector("a.self-link");
      selfLink.href = `#${id}`;
      pub("example", report);
    } else {
      const inAside = !!example.closest("aside");
      if (!inAside) ++number;

      report.content = example.innerHTML;

      // wrap
      example.classList.remove("example", "illegal-example");
      // relocate the id to the div
      const id = example.id ? example.id : null;
      if (id) example.removeAttribute("id");
      const exampleTitle = makeTitle(example, inAside ? 0 : number, report);
      const div = hyperHTML$1`
        <div class="example" id="${id}">
          ${exampleTitle} ${example.cloneNode(true)}
>>>>>>> Build
        </div>
      `;
      if (title) {
        addId(div, `example-${number}`, title);
      }
      addId(div, `example`, String(number));
      const selfLink = div.querySelector("a.self-link");
      selfLink.href = `#${div.id}`;
      example.replaceWith(div);
      if (!inAside) pub("example", report);
    }
  });
}

var examples = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$r,
  run: run$g
});

// @ts-check

const name$s = "core/issues-notes";

const localizationStrings$3 = {
  en: {
    issue_summary: "Issue Summary",
    no_issues_in_spec: "There are no issues listed in this specification.",
  },
  nl: {
    issue_summary: "Lijst met issues",
    no_issues_in_spec: "Er zijn geen problemen vermeld in deze specificatie.",
  },
  es: {
    issue_summary: "Resumen de la cuestión",
    no_issues_in_spec: "No hay problemas enumerados en esta especificación.",
  },
};

const cssPromise$1 = loadStyle$3();

async function loadStyle$3() {
  try {
    return (await Promise.resolve().then(function () { return issuesNotes$2; })).default;
  } catch {
    return fetchAsset("issues-notes.css");
  }
}

const lang$b = lang in localizationStrings$3 ? lang : "en";

const l10n$6 = localizationStrings$3[lang$b];

/**
 * @typedef {object} Report
 * @property {string} type
 * @property {boolean} inline
 * @property {number} number
 * @property {string} title

 * @typedef {object} GitHubLabel
 * @property {string} color
 * @property {string} name
 *
 * @typedef {object} GitHubIssue
 * @property {string} title
 * @property {string} state
 * @property {string} bodyHTML
 * @property {GitHubLabel[]} labels

 * @param {NodeListOf<HTMLElement>} ins
 * @param {Map<string, GitHubIssue>} ghIssues
 * @param {*} conf
 */
function handleIssues(ins, ghIssues, conf) {
  const hasDataNum = !!document.querySelector(".issue[data-number]");
  let issueNum = 0;
  const issueList = document.createElement("ul");
  ins.forEach(inno => {
    const { type, displayType, isFeatureAtRisk } = getIssueType(inno, conf);
    const isIssue = type === "issue";
    const isInline = inno.localName === "span";
    const { number: dataNum } = inno.dataset;
    /** @type {Partial<Report>} */
    const report = {
      type,
      inline: isInline,
      title: inno.title,
    };
    if (isIssue && !isInline && !hasDataNum) {
      issueNum++;
      report.number = issueNum;
    } else if (dataNum) {
      report.number = Number(dataNum);
    }
    // wrap
    if (!isInline) {
      const cssClass = isFeatureAtRisk ? `${type} atrisk` : type;
      const ariaRole = type === "note" ? "note" : null;
      const div = hyperHTML$1`<div class="${cssClass}" role="${ariaRole}"></div>`;
      const title = document.createElement("span");
      const titleParent = hyperHTML$1`
        <div role='heading' class='${`${type}-title marker`}'>${title}</div>`;
      addId(titleParent, "h", type);
      let text = displayType;
      if (inno.id) {
        div.id = inno.id;
        inno.removeAttribute("id");
      } else {
        addId(
          div,
          "issue-container",
          report.number ? `number-${report.number}` : ""
        );
      }
      /** @type {GitHubIssue} */
      let ghIssue;
      if (isIssue) {
        if (!hasDataNum) {
          text += ` ${issueNum}`;
        } else if (dataNum) {
          text += ` ${dataNum}`;
          const link = linkToIssueTracker(dataNum, conf, { isFeatureAtRisk });
          if (link) {
            title.before(link);
            link.append(title);
          }
          title.classList.add("issue-number");
          ghIssue = ghIssues.get(dataNum);
          if (!ghIssue) {
            pub("warning", `Failed to fetch issue number ${dataNum}`);
          }
          if (ghIssue && !report.title) {
            report.title = ghIssue.title;
          }
        }
        if (report.number !== undefined) {
          // Add entry to #issue-summary.
          issueList.append(
            createIssueSummaryEntry(conf.l10n.issue, report, div.id)
          );
        }
      }
      title.textContent = text;
      if (report.title) {
        inno.removeAttribute("title");
        const { repoURL = "" } = conf.github || {};
        const labels = ghIssue ? ghIssue.labels : [];
        if (ghIssue && ghIssue.state === "CLOSED") {
          div.classList.add("closed");
        }
        titleParent.append(createLabelsGroup(labels, report.title, repoURL));
      }
      /** @type {HTMLElement | DocumentFragment} */
      let body = inno;
      inno.replaceWith(div);
      body.classList.remove(type);
      body.removeAttribute("data-number");
      if (ghIssue && !body.innerHTML.trim()) {
        body = document
          .createRange()
          .createContextualFragment(ghIssue.bodyHTML);
      }
      div.append(titleParent, body);
      const level = parents(titleParent, "section").length + 2;
      titleParent.setAttribute("aria-level", level);
    }
    pub(report.type, report);
  });
  makeIssueSectionSummary(issueList);
}

/**
 * @typedef {object} IssueType
 * @property {string} type
 * @property {string} displayType
 * @property {boolean} isFeatureAtRisk
 *
 * @param {HTMLElement} inno
 * @return {IssueType}
 */
function getIssueType(inno, conf) {
  const isIssue = inno.classList.contains("issue");
  const isWarning = inno.classList.contains("warning");
  const isEdNote = inno.classList.contains("ednote");
  const isImpNote = inno.classList.contains("impnote");
  const isFeatureAtRisk = inno.classList.contains("atrisk");
  const type = isIssue
    ? "issue"
    : isWarning
    ? "warning"
    : isEdNote
    ? "ednote"
    : isImpNote
    ? "impnote"
    : "note";
  const displayType = isIssue
    ? isFeatureAtRisk
      ? conf.l10n.feature_at_risk
      : conf.l10n.issue
    : isWarning
    ? conf.l10n.warning
    : isEdNote
    ? conf.l10n.editors_note
    : isImpNote
    ? conf.l10n.implementation_note
    : conf.l10n.note;
  return { type, displayType, isFeatureAtRisk };
}

/**
 * @param {string} dataNum
 * @param {*} conf
 */
function linkToIssueTracker(dataNum, conf, { isFeatureAtRisk = false } = {}) {
  // Set issueBase to cause issue to be linked to the external issue tracker
  if (!isFeatureAtRisk && conf.issueBase) {
    return hyperHTML$1`<a href='${conf.issueBase + dataNum}'/>`;
  } else if (isFeatureAtRisk && conf.atRiskBase) {
    return hyperHTML$1`<a href='${conf.atRiskBase + dataNum}'/>`;
  }
}

/**
 * @param {string} l10nIssue
 * @param {Partial<Report>} report
 */
function createIssueSummaryEntry(l10nIssue, report, id) {
  const issueNumberText = `${l10nIssue} ${report.number}`;
  const title = report.title
    ? hyperHTML$1`<span style="text-transform: none">: ${report.title}</span>`
    : "";
  return hyperHTML$1`
    <li><a href="${`#${id}`}">${issueNumberText}</a>${title}</li>
  `;
}

/**
 *
 * @param {HTMLUListElement} issueList
 */
function makeIssueSectionSummary(issueList) {
  const issueSummaryElement = document.getElementById("issue-summary");
  if (!issueSummaryElement) return;
  const heading = issueSummaryElement.querySelector("h2, h3, h4, h5, h6");

  issueList.hasChildNodes()
    ? issueSummaryElement.append(issueList)
    : issueSummaryElement.append(hyperHTML$1`<p>${l10n$6.no_issues_in_spec}</p>`);
  if (
    !heading ||
    (heading && heading !== issueSummaryElement.firstElementChild)
  ) {
    issueSummaryElement.insertAdjacentHTML(
      "afterbegin",
      `<h2>${l10n$6.issue_summary}</h2>`
    );
  }
}

function isLight(rgb) {
  const red = (rgb >> 16) & 0xff;
  const green = (rgb >> 8) & 0xff;
  const blue = (rgb >> 0) & 0xff;
  const illumination = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  return illumination > 140;
}

/**
 * @param {GitHubLabel[]} labels
 * @param {string} title
 * @param {string} repoURL
 */
function createLabelsGroup(labels, title, repoURL) {
  const labelsGroup = labels.map(label => createLabel(label, repoURL));
  const labelNames = labels.map(label => label.name);
  const joinedNames = joinAnd(labelNames);
  if (labelsGroup.length) {
    labelsGroup.unshift(document.createTextNode(" "));
  }
  if (labelNames.length) {
    const ariaLabel = `This issue is labelled as ${joinedNames}.`;
    return hyperHTML$1`<span
      class="issue-label"
      aria-label="${ariaLabel}">: ${title}${labelsGroup}</span>`;
  }
  return hyperHTML$1`<span class="issue-label"><span class="issue-label-colon">: </span>${title}${labelsGroup}</span>`;
}

/**
 * @param {GitHubLabel} label
 * @param {string} repoURL
 */
function createLabel(label, repoURL) {
  const { color, name } = label;
  const issuesURL = new URL("./issues/", repoURL);
  issuesURL.searchParams.set("q", `is:issue is:open label:"${label.name}"`);
  const rgb = parseInt(color, 16);
  const textColorClass = isNaN(rgb) || isLight(rgb) ? "light" : "dark";
  const cssClasses = `respec-gh-label respec-label-${textColorClass}`;
  const style = `background-color: #${color}`;
  return hyperHTML$1`<a
    class="${cssClasses}"
    style="${style}"
    href="${issuesURL.href}">${name}</a>`;
}

/**
 * @param {string} githubAPI
 * @returns {Promise<Map<string, GitHubIssue>>}
 */
async function fetchAndStoreGithubIssues(githubAPI) {
  if (!githubAPI) {
    return new Map();
  }

  /** @type {NodeListOf<HTMLElement>} */
  const specIssues = document.querySelectorAll(".issue[data-number]");
  const issueNumbers = [...specIssues]
    .map(elem => Number.parseInt(elem.dataset.number, 10))
    .filter(issueNumber => issueNumber);

  if (!issueNumbers.length) {
    return new Map();
  }

  const url = new URL("issues", githubAPI);
  url.searchParams.set("issues", issueNumbers.join(","));

  const response = await fetch(url.href);
  if (!response.ok) {
    const msg = `Error fetching issues from GitHub. (HTTP Status ${response.status}).`;
    pub("error", msg);
    return new Map();
  }

  /** @type {{ [issueNumber: string]: GitHubIssue }} */
  const issues = await response.json();
  return new Map(Object.entries(issues));
}

async function run$h(conf) {
  const query = ".issue, .note, .warning, .ednote, .impnote";
  /** @type {NodeListOf<HTMLElement>} */
  const issuesAndNotes = document.querySelectorAll(query);
  if (!issuesAndNotes.length) {
    return; // nothing to do.
  }
  const ghIssues = await fetchAndStoreGithubIssues(conf.githubAPI);
  const css = await cssPromise$1;
  const { head: headElem } = document;
  headElem.insertBefore(
    hyperHTML$1`<style>${[css]}</style>`,
    headElem.querySelector("link")
  );
  handleIssues(issuesAndNotes, ghIssues, conf);
  const ednotes = document.querySelectorAll(".ednote");
  ednotes.forEach(ednote => {
    ednote.classList.remove("ednote");
    ednote.classList.add("note");
  });
}

var issuesNotes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$s,
  run: run$h
});

// @ts-check

const name$t = "core/requirements";

function run$i() {
  document.querySelectorAll(".req").forEach((req, i) => {
    const frag = `#${req.getAttribute("id")}`;
    const el = hyperHTML$1`<a href="${frag}">Req. ${i + 1}</a>`;
    req.prepend(el, ": ");
  });

  document.querySelectorAll("a.reqRef[href]").forEach(ref => {
    const href = ref.getAttribute("href");
    const id = href.substring(1); // href looks like `#id`
    const req = document.getElementById(id);
    let txt;
    if (req) {
      txt = req.querySelector("a:first-child").textContent;
    } else {
      txt = `Req. not found '${id}'`;
      const msg = `Requirement not found in element \`a.reqRef\`: ${id}`;
      pub("error", msg);
      console.warn(msg, ref);
    }
    ref.textContent = txt;
  });
}

var requirements = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$t,
  run: run$i
});

// @ts-check

const name$u = "core/best-practices";

const localizationStrings$4 = {
  en: {
    best_practice: "Best Practice ",
  },
};
const lang$c = lang in localizationStrings$4 ? lang : "en";

function run$j() {
  /** @type {NodeListOf<HTMLElement>} */
  const bps = document.querySelectorAll(".practicelab");
  const l10n = localizationStrings$4[lang$c];
  const bpSummary = document.getElementById("bp-summary");
  const summaryItems = bpSummary ? document.createElement("ul") : null;
  [...bps].forEach((bp, num) => {
    const id = addId(bp, "bp");
    const localizedBpName = hyperHTML$1`
      <a class="marker self-link" href="${`#${id}`}"><bdi lang="${lang$c}">${
      l10n.best_practice
    }${num + 1}</bdi></a>`;

    // Make the summary items, if we have a summary
    if (summaryItems) {
      const li = hyperHTML$1`
        <li>
          ${localizedBpName}: ${makeSafeCopy(bp)}
        </li>
<<<<<<< gh-pages
      `;r.appendChild(t)}const s=e.closest("div");if(!s)return void e.classList.add("advisement");s.classList.add("advisement");const a=hyperHTML$1`${i.cloneNode(!0)}: ${e}`;s.prepend(...a.childNodes)}),e.length?n&&(n.appendChild(hyperHTML$1`<h2>Best Practices Summary</h2>`),n.appendChild(r)):n&&(pub("warn","Using best practices summary (#bp-summary) but no best practices found."),n.remove())}var bestPractices=Object.freeze({__proto__:null,name:name$u,run:run$j});const name$v="core/figures",localizationStrings$5={en:{list_of_figures:"List of Figures",fig:"Figure "},ja:{fig:"図",list_of_figures:"図のリスト"},ko:{fig:"그림 ",list_of_figures:"그림 목록"},nl:{fig:"Figuur ",list_of_figures:"Lijst met figuren"},es:{fig:"Figura ",list_of_figures:"Lista de Figuras"},zh:{fig:"圖 ",list_of_figures:"List of Figures"}},lang$d=lang in localizationStrings$5?lang:"en",l10n$7=localizationStrings$5[lang$d];function run$k(){normalizeImages(document);const e=collectFigures(),t=document.getElementById("tof");e.length&&t&&(decorateTableOfFigures(t),t.append(hyperHTML$1`<h2>${l10n$7.list_of_figures}</h2>`,hyperHTML$1`<ul class='tof'>${e}</ul>`))}function collectFigures(){const e=[];return document.querySelectorAll("figure:not(.equation)").forEach((t,n)=>{const r=t.querySelector("figcaption");r?(decorateFigure(t,r,n),e.push(getTableOfFiguresListItem(t.id,r))):showInlineWarning(t,"Found a `<figure>` without a `<figcaption>`")}),e}function decorateFigure(e,t,n){addId(e,"fig",t.textContent),wrapInner(t,hyperHTML$1`<span class='fig-title'>`),t.prepend(l10n$7.fig,hyperHTML$1`<bdi class='figno'>${n+1}</bdi>`," ")}function getTableOfFiguresListItem(e,t){const n=t.cloneNode(!0);return n.querySelectorAll("a").forEach(e=>{renameElement(e,"span").removeAttribute("href")}),n.querySelectorAll("dfn").forEach(e=>{renameElement(e,"span")}),n.querySelectorAll("[id]").forEach(e=>{e.removeAttribute("id")}),n.querySelectorAll("span.footnote, span.issue, span.respec-error, span.noToc").forEach(e=>{e.remove()}),hyperHTML$1`<li class='tofline'>
    <a class='tocxref' href='${`#${e}`}'>${n.childNodes}</a>
  </li>`}function normalizeImages(e){e.querySelectorAll(":not(picture)>img:not([width]):not([height]):not([srcset])").forEach(e=>{0!==e.naturalHeight&&0!==e.naturalWidth&&(e.height=e.naturalHeight,e.width=e.naturalWidth)})}function decorateTableOfFigures(e){if(e.classList.contains("appendix")||e.classList.contains("introductory")||e.closest("section"))return;const t=getPreviousSections(e);t.every(e=>e.classList.contains("introductory"))?e.classList.add("introductory"):t.some(e=>e.classList.contains("appendix"))&&e.classList.add("appendix")}function getPreviousSections(e){const t=[];for(const n of iteratePreviousElements(e))"section"===n.localName&&t.push(n);return t}function*iteratePreviousElements(e){let t=e;for(;t.previousElementSibling;)t=t.previousElementSibling,yield t}var figures=Object.freeze({__proto__:null,name:name$v,run:run$k});const name$w="core/data-cite";function requestLookup(e){const t=citeDetailsConverter(e);return async n=>{const r=n.dataset.cite,{key:o,frag:i,path:s}=t(n);let a="",l="";if(o.toLowerCase()===e.shortName.toLowerCase())console.log(n,`The reference "${o}" is resolved into the current document per \`conf.shortName\`.`),a=document.location.href;else{const e=await resolveRef(o);if(cleanElement(n),!e)return void showInlineWarning(n,`Couldn't find a match for "${r}"`);a=e.href,l=e.title}if(s){const e=s.startsWith("/")?`.${s}`:s;a=new URL(e,a).href}switch(i&&(a=new URL(i,a).href),n.localName){case"a":if(""===n.textContent&&"the-empty-string"!==n.dataset.lt&&(n.textContent=l),n.href=a,!s&&!i){const e=document.createElement("cite");n.replaceWith(e),e.append(n)}break;case"dfn":{const e=document.createElement("a");if(e.href=a,n.textContent?wrapInner(n,e):(e.textContent=l,n.append(e)),!s&&!i){const t=document.createElement("cite");t.append(e),n.append(t)}"export"in n.dataset&&(showInlineError(n,"Exporting an linked external definition is not allowed. Please remove the `data-export` attribute","Please remove the `data-export` attribute."),delete n.dataset.export),n.dataset.noExport="";break}}}}function cleanElement(e){["data-cite","data-cite-frag"].filter(t=>e.hasAttribute(t)).forEach(t=>e.removeAttribute(t))}function makeComponentFinder(e){return t=>{const n=t.search(e);return-1!==n?t.substring(n):""}}function citeDetailsConverter(e){const t=makeComponentFinder("#"),n=makeComponentFinder("/");return function r(o){const{dataset:i}=o,{cite:s,citeFrag:a,citePath:l}=i;if(s.startsWith("#")&&!a){const t=o.parentElement.closest('[data-cite]:not([data-cite^="#"])'),{key:n,isNormative:a}=t?r(t):{key:e.shortName||"",isNormative:!1};return i.cite=a?n:`?${n}`,i.citeFrag=s.replace("#",""),r(o)}const c=a?`#${a}`:t(s),u=l||n(s).split("#")[0],{type:d}=refTypeFromContext(s,o),p="normative"===d,h=/^[?|!]/.test(s);return{key:s.split(/[/|#]/)[0].substring(Number(h)),isNormative:p,frag:c,path:u}}}async function run$l(e){const t=citeDetailsConverter(e),n=document.querySelectorAll("dfn[data-cite], a[data-cite]");Array.from(n).filter(e=>e.dataset.cite).map(t).filter(({key:t})=>t.toLowerCase()!==(e.shortName||"").toLowerCase()).forEach(({isNormative:t,key:n})=>{t||e.normativeReferences.has(n)?(e.normativeReferences.add(n),e.informativeReferences.delete(n)):e.informativeReferences.add(n)})}async function linkInlineCitations(e,t=respecConfig){const n=requestLookup(t),r=[...e.querySelectorAll("dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])")],o=citeDetailsConverter(t),i=r.map(o).map(async e=>{return{entry:e,result:await resolveRef(e.key)}}),s=(await Promise.all(i)).filter(({result:e})=>null===e).map(({entry:{key:e}})=>e),a=await updateFromNetwork(s);a&&Object.assign(biblio,a);const l=[...new Set(r)].map(n);return await Promise.all(l)}var dataCite=Object.freeze({__proto__:null,name:name$w,run:run$l,linkInlineCitations:linkInlineCitations});const VERSION_CHECK_WAIT=18e6;async function getIdbCache(){const e=await idb.openDB("xref",1,{upgrade(e){e.createObjectStore("xrefs")}});return new IDBKeyVal(e,"xrefs")}async function resolveXrefCache(e){try{const t=await getIdbCache();return await resolveFromCache(e,t)}catch(e){return console.error(e),new Map}}async function resolveFromCache(e,t){return await shouldBustCache(t)?(await t.clear(),new Map):await t.getMany(e.map(e=>e.id))}async function shouldBustCache(e){const t=await e.get("__LAST_VERSION_CHECK__"),n=Date.now();if(!t)return await e.set("__LAST_VERSION_CHECK__",n),!1;if(n-t<VERSION_CHECK_WAIT)return!1;const r=new URL("meta/version",API_URL).href,o=await fetch(r);if(!o.ok)return!1;const i=await o.text();return await e.set("__LAST_VERSION_CHECK__",n),parseInt(i,10)>t}async function cacheXrefData(e){try{const t=await getIdbCache();await t.addMany(e)}catch(e){console.error(e)}}const profiles={"web-platform":["HTML","INFRA","URL","WEBIDL","DOM","FETCH"]},API_URL="https://respec.org/xref/";if(!document.querySelector("link[rel='preconnect'][href='https://respec.org']")){const e=createResourceHint({hint:"preconnect",href:"https://respec.org"});document.head.appendChild(e)}async function run$m(e,t){const n=normalizeConfig(e.xref);if(n.specs){const e=document.body.dataset.cite?document.body.dataset.cite.split(/\s+/):[];document.body.dataset.cite=e.concat(n.specs).join(" ")}if(!t.length)return;const r=[];for(const e of t){const t=getRequestEntry(e),n=await objectHash(t);r.push({...t,id:n})}addDataCiteToTerms(t,r,await getData(r,n.url),e)}function normalizeConfig(e){const t={url:API_URL,specs:null},n=Object.assign({},t);switch(Array.isArray(e)?"array":typeof e){case"boolean":break;case"string":e.toLowerCase()in profiles?Object.assign(n,{specs:profiles[e.toLowerCase()]}):r(e);break;case"array":Object.assign(n,{specs:e});break;case"object":if(Object.assign(n,e),e.profile){const t=e.profile.toLowerCase();if(t in profiles){const r=(e.specs||[]).concat(profiles[t]);Object.assign(n,{specs:r})}else r(e.profile)}break;default:pub("error",`Invalid value for \`xref\` configuration option. Received: "${e}".`)}return n;function r(e){pub("error",`Invalid profile "${e}" in \`respecConfig.xref\`. `+`Please use one of the supported profiles: ${Object.keys(profiles).map(e=>`"${e}"`).join(", ")}.`)}}function getRequestEntry(e){const t="xrefType"in e.dataset;let n=getTermFromElement(e);t||(n=n.toLowerCase());const r=[];let o=e.closest("[data-cite]");for(;o;){const t=o.dataset.cite.toLowerCase().replace(/[!?]/g,"").split(/\s+/).filter(e=>e);if(t.length&&r.push(t.sort()),o===e)break;o=o.parentElement.closest("[data-cite]")}if(e.closest("[data-cite]")!==e){const t=e.closest("section"),n=[...t?t.querySelectorAll("a.bibref"):[]].map(e=>e.textContent.toLowerCase()),o=[...new Set(n)].sort();o.length&&r.unshift(o)}const i=[];t?e.dataset.xrefType?i.push(...e.dataset.xrefType.split("|")):i.push("_IDL_"):i.push("_CONCEPT_");let{xrefFor:s}=e.dataset;if(!s&&t){const t=e.closest("[data-xref-for]");t&&(s=norm(t.dataset.xrefFor))}else s&&"string"==typeof s&&(s=norm(s));return{term:n,types:i,...r.length&&{specs:r},..."string"==typeof s&&{for:s}}}function getTermFromElement(e){const{lt:t}=e.dataset;let n=t?t.split("|",1)[0]:e.textContent;return"the-empty-string"===(n=norm(n))?"":n}async function getData(e,t){const n=new Set,r=e.filter(e=>!n.has(e.id)&&(n.add(e.id)&&!0)),o=await resolveXrefCache(r),i=r.filter(e=>!o.get(e.id)),s=await fetchFromNetwork(i,t);return s.size&&await cacheXrefData(s),new Map([...o,...s])}async function fetchFromNetwork(e,t){if(!e.length)return new Map;const n={keys:e},r={method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}},o=await fetch(t,r),i=await o.json();return new Map(i.result)}function isNormative(e){const t=e.closest(".normative"),n=e.closest(nonNormativeSelector);return!n||e===t||t&&n&&n.contains(t)}function addDataCiteToTerms(e,t,n,r){const o={ambiguous:new Map,notFound:new Map};for(let i=0,s=e.length;i<s;i++){if(e[i].closest("[data-no-xref]"))continue;const s=e[i],a=t[i],{id:l}=a,c=n.get(l);if(1===c.length)addDataCite(s,a,c[0],r);else{const e=o[0===c.length?"notFound":"ambiguous"];e.has(l)||e.set(l,{elems:[],results:c,query:a}),e.get(l).elems.push(s)}}showErrors(o)}function addDataCite(e,t,n,r){const{term:o}=t,{uri:i,shortname:s,normative:a,type:l}=n,c=i.includes("/")?i.split("/",1)[1]:i,[u,d]=c.split("#"),p={cite:s,citePath:u,citeFrag:d,type:l};Object.assign(e.dataset,p),document.querySelectorAll(`[data-dfn-type="xref"][data-xref="${o.toLowerCase()}"]`).forEach(e=>{e.removeAttribute("data-xref"),Object.assign(e.dataset,p)}),addToReferences(e,s,a,o,r)}function addToReferences(e,t,n,r,o){if(!isNormative(e))return void(o.normativeReferences.has(t)||o.informativeReferences.add(t));if(n){const e=o.informativeReferences.has(t)?o.informativeReferences.getCanonicalKey(t):t;return o.normativeReferences.add(e),void o.informativeReferences.delete(e)}showInlineWarning(e,`Adding an informative reference to "${r}" from "${t}" `+"in a normative section","Error: Informative reference in normative section")}function showErrors({ambiguous:e,notFound:t}){const n=(e,t,n=[])=>{const r=new URL(API_URL);return r.searchParams.set("term",e),t.for&&r.searchParams.set("for",t.for),r.searchParams.set("types",t.types.join(",")),n.length&&r.searchParams.set("cite",n.join(",")),r};for(const{query:e,elems:r}of t.values()){const t=[...new Set(flatten([],e.specs))].sort(),o=getTermFromElement(r[0]),i=n(o,e,t);showInlineError(r,`Couldn't match "**${o}**" to anything in the document or in any other document cited in this specification: ${t.map(e=>`\`${e}\``).join(", ")}. `+`See [how to cite to resolve the error](${i})`,"Error: No matching dfn found.")}for(const{query:t,elems:r,results:o}of e.values()){const e=[...new Set(o.map(e=>e.shortname))].sort(),i=e.map(e=>`**${e}**`).join(", "),s=getTermFromElement(r[0]);showInlineError(r,`The term "**${s}**" is defined in ${i} in multiple ways, so it's ambiguous. `+`See [how to cite to resolve the error](${n(s,t,e)})`,"Error: Linking an ambiguous dfn.")}}function objectHash(e){const t=JSON.stringify(e,Object.keys(e).sort()),n=(new TextEncoder).encode(t);return crypto.subtle.digest("SHA-1",n).then(bufferToHexString)}function bufferToHexString(e){return[...new Uint8Array(e)].map(e=>e.toString(16).padStart(2,"0")).join("")}const name$x="core/link-to-dfn",l10n$8={en:{duplicateMsg:e=>`Duplicate definition(s) of '${e}'`,duplicateTitle:"This is defined more than once in the document."}},lang$e=lang in l10n$8?lang:"en";class CaseInsensitiveMap extends Map{constructor(e=[]){return super(),e.forEach(([e,t])=>{this.set(e,t)}),this}set(e,t){return super.set(e.toLowerCase(),t),this}get(e){return super.get(e.toLowerCase())}has(e){return super.has(e.toLowerCase())}delete(e){return super.delete(e.toLowerCase())}}async function run$n(e){const t=mapTitleToDfns(),n=[],r=[];if(document.querySelectorAll("a[data-cite=''], a:not([href]):not([data-cite]):not(.logo):not(.externalDFN)").forEach(e=>{const o=getLinkTargets(e);o.some(r=>findLinkTarget(r,e,t,n))||0===o.length||(""===e.dataset.cite?r.push(e):n.push(e))}),showLinkingError(r),e.xref){n.push(...findExplicitExternalLinks());try{await run$m(e,n)}catch(e){console.error(e),showLinkingError(n)}}else showLinkingError(n);await linkInlineCitations(document,e),pub("end","core/link-to-dfn")}function mapTitleToDfns(){const e=new CaseInsensitiveMap;return Object.keys(definitionMap).forEach(t=>{const{result:n,duplicates:r}=collectDfns(t);e.set(t,n),r.length>0&&showInlineError(r,l10n$8[lang$e].duplicateMsg(t),l10n$8[lang$e].duplicateTitle)}),e}function collectDfns(e){const t=new Map,n=[];return definitionMap[e].forEach(r=>{const{dfnFor:o=""}=r.dataset;if(t.has(o)){const e="dfn"===t.get(o).localName,i="dfn"===r.localName;if(e){if(!i)return;n.push(r)}}t.set(o,r),addId(r,"dfn",e)}),{result:t,duplicates:n}}function findLinkTarget(e,t,n,r){const{linkFor:o}=t.dataset;if(!n.has(e.title)||!n.get(e.title).get(e.for))return!1;const i=n.get(e.title).get(e.for);if(i.dataset.cite)t.dataset.cite=i.dataset.cite;else if(o&&!n.get(o))r.push(t);else if(i.classList.contains("externalDFN")){const e=i.dataset.lt?i.dataset.lt.split("|"):[];t.dataset.lt=e[0]||i.textContent,r.push(t)}else"partial"===t.dataset.idl?r.push(t):(t.href=`#${i.id}`,t.classList.add("internalDFN"));return t.hasAttribute("data-link-type")||(t.dataset.linkType="idl"in i.dataset?"idl":"dfn"),isCode(i)&&wrapAsCode(t,i),!0}function isCode(e){if(e.closest("code,pre"))return!0;if(1!==e.childNodes.length)return!1;const[t]=e.childNodes;return"code"===t.localName}function wrapAsCode(e,t){const n=e.textContent.trim(),r=t.dataset.hasOwnProperty("idl"),o=shouldWrapByCode(t,n);r&&!o||wrapInner(e,document.createElement("code"))}function shouldWrapByCode(e,t){const{dataset:n}=e;return e.textContent.trim()===t||(n.title===t||!!n.lt&&n.lt.split("|").includes(t))}function findExplicitExternalLinks(){const e=document.querySelectorAll("a[data-cite]:not([data-cite='']):not([data-cite*='#']), dfn[data-cite]:not([data-cite='']):not([data-cite*='#'])"),t=document.querySelectorAll("dfn.externalDFN");return[...e].filter(e=>{if(""===e.textContent.trim())return!1;const t=e.closest("[data-cite]");return!t||""!==t.dataset.cite}).concat(...t)}function showLinkingError(e){e.forEach(e=>{showInlineWarning(e,`Found linkless \`<a>\` element with text "${e.textContent}" but no matching \`<dfn>\``,"Linking error: not matching `<dfn>`")})}var linkToDfn=Object.freeze({__proto__:null,name:name$x,run:run$n});const name$y="core/contrib";async function run$o(e){if(!document.getElementById("gh-contributors"))return;if(!e.github){return void pub("error","Requested list of contributors from GitHub, but [`github`](https://github.com/w3c/respec/wiki/github) configuration option is not set.")}const t=e.editors.map(e=>e.name);await showContributors(t,e.githubAPI)}async function showContributors(e,t){const n=document.getElementById("gh-contributors");if(!n)return;n.textContent="Fetching list of contributors...";const r=await async function(){const{href:n}=new URL("contributors",t);try{const t=await fetchAndCache(n);if(!t.ok)throw new Error(`Request to ${n} failed with status code ${t.status}`);return(await t.json()).filter(t=>!e.includes(t.name||t.login))}catch(e){return pub("error","Error loading contributors from GitHub."),console.error(e),null}}();null!==r?toHTML(r,n):n.textContent="Failed to fetch contributors."}function toHTML(e,t){const n=e.sort((e,t)=>{const n=e.name||e.login,r=t.name||t.login;return n.toLowerCase().localeCompare(r.toLowerCase())});if("UL"===t.tagName)return void hyperHTML$1(t)`${n.map(({name:e,login:t})=>`<li><a href="https://github.com/${t}">${e||t}</a></li>`)}`;const r=n.map(e=>e.name||e.login);t.textContent=joinAnd(r)}var contrib=Object.freeze({__proto__:null,name:name$y,run:run$o});const name$z="core/fix-headers";function run$p(){[...document.querySelectorAll("section:not(.introductory)")].map(e=>e.querySelector("h1, h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{renameElement(e,`h${Math.min(getParents(e,"section").length+1,6)}`)})}function getParents(e,t){const n=[];for(;e!=e.ownerDocument.body;)e.matches(t)&&n.push(e),e=e.parentElement;return n}var fixHeaders=Object.freeze({__proto__:null,name:name$z,run:run$p});const lowerHeaderTags=["h2","h3","h4","h5","h6"],headerTags=["h1",...lowerHeaderTags],name$A="core/structure",localizationStrings$6={en:{toc:"Table of Contents"},nl:{toc:"Inhoudsopgave"},es:{toc:"Tabla de Contenidos"}},lang$f=lang in localizationStrings$6?lang:"en",l10n$9=localizationStrings$6[lang$f];function scanSections(e,t,{prefix:n=""}={}){let r=!1,o=0,i=1;if(n.length&&!n.endsWith(".")&&(n+="."),0===e.length)return null;const s=hyperHTML$1`<ol class='toc'>`;for(const a of e){!a.isAppendix||n||r||(o=i,r=!0);let e=a.isIntro?"":r?appendixNumber(i-o):n+i;const l=parents(a,"section").length+1;if(1===l&&(e+=".",a.header.before(document.createComment("OddPage"))),a.isIntro||(i+=1,a.header.prepend(hyperHTML$1`<bdi class='secno'>${e} </bdi>`)),l<=t){const n=createTocListItem(a.header,a.element.id),r=scanSections(a.subsections,t,{prefix:e});r&&n.append(r),s.append(n)}}return s}function getSectionTree(e,{tocIntroductory:t=!1}={}){const n=children(e,t?"section":"section:not(.introductory)"),r=[];for(const e of n){const n=e.classList.contains("notoc");if(!e.children.length||n)continue;const o=e.children[0];if(!lowerHeaderTags.includes(o.localName))continue;const i=o.textContent;addId(e,null,i),r.push({element:e,header:o,title:i,isIntro:e.classList.contains("introductory"),isAppendix:e.classList.contains("appendix"),subsections:getSectionTree(e,{tocIntroductory:t})})}return r}function createTocListItem(e,t){const n=hyperHTML$1`<a href="${`#${t}`}" class="tocxref"/>`;return n.append(...e.cloneNode(!0).childNodes),filterHeader(n),hyperHTML$1`<li class='tocline'>${n}</li>`}function filterHeader(e){e.querySelectorAll("a").forEach(e=>{const t=renameElement(e,"span");t.className="formerLink",t.removeAttribute("href")}),e.querySelectorAll("dfn").forEach(e=>{renameElement(e,"span").removeAttribute("id")}),e.querySelectorAll("span.footnote, span.issue").forEach(e=>e.remove())}function run$q(e){if("tocIntroductory"in e==!1&&(e.tocIntroductory=!1),"maxTocLevel"in e==!1&&(e.maxTocLevel=1/0),renameSectionHeaders(),!e.noTOC){const t=scanSections(getSectionTree(document.body,{tocIntroductory:e.tocIntroductory}),e.maxTocLevel);t&&createTableOfContents(t)}}function renameSectionHeaders(){const e=getNonintroductorySectionHeaders();e.length&&e.forEach(e=>{const t=parents(e,"section").length+1,n=`h${Math.min(t,6)}`;e.localName!==n&&renameElement(e,n),t>6&&(e.classList?e.classList.add(`h${t}`):e.className=`h${t}`)})}function getNonintroductorySectionHeaders(){const e=headerTags.map(e=>`section:not(.introductory) ${e}:first-child`).join(",");return[...document.querySelectorAll(e)].filter(e=>!e.closest("section.introductory"))}function createTableOfContents(e){if(!e)return;const t=hyperHTML$1`<nav id="toc">`,n=hyperHTML$1`<h2 class="introductory">${l10n$9.toc}</h2>`;addId(n),t.append(n,e);const r=document.getElementById("toc")||document.getElementById("sotd")||document.getElementById("abstract");r&&("toc"===r.id?r.replaceWith(t):r.after(t));const o=hyperHTML$1`<p role='navigation' id='back-to-top'><a href='#title'><abbr title='Back to Top'>&uarr;</abbr></a></p>`;document.body.append(o)}function appendixNumber(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",n=t.charAt(e%t.length);return e<t.length?n:appendixNumber(Math.floor(e/t.length))+n}var structure$1=Object.freeze({__proto__:null,name:name$A,run:run$q});const name$B="core/informative",localizationStrings$7={en:{informative:"This section is non-normative."},nl:{informative:"Dit onderdeel is niet normatief."}},lang$g=lang in localizationStrings$7?lang:"en",l10n$a=localizationStrings$7[lang$g];function run$r(){Array.from(document.querySelectorAll("section.informative")).map(e=>e.querySelector("h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{e.after(hyperHTML$1`<p><em>${l10n$a.informative}</em></p>`)})}var informative=Object.freeze({__proto__:null,name:name$B,run:run$r});const name$C="core/id-headers";function run$s(e){const t=document.querySelectorAll("section:not(.head):not(.introductory) h2, h3, h4, h5, h6");for(const n of t){if(addId(n),!e.addSectionLinks)continue;const t=n.parentElement.id||n.id;n.appendChild(hyperHTML$1`
      <a href="${`#${t}`}" class="self-link" aria-label="§"></a>
    `)}}var idHeaders=Object.freeze({__proto__:null,name:name$C,run:run$s});const name$D="geonovum/conformance";function processConformance(e){const t=hyperHTML$1`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
=======
      `;
      summaryItems.appendChild(li);
    }

    const container = bp.closest("div");
    if (!container) {
      // This is just an inline best practice...
      bp.classList.add("advisement");
      return;
    }

    // Make the advisement box
    container.classList.add("advisement");
    const title = hyperHTML$1`${localizedBpName.cloneNode(true)}: ${bp}`;
    container.prepend(...title.childNodes);
  });
  if (bps.length) {
    if (bpSummary) {
      bpSummary.appendChild(hyperHTML$1`<h2>Best Practices Summary</h2>`);
      bpSummary.appendChild(summaryItems);
    }
  } else if (bpSummary) {
    pub(
      "warn",
      "Using best practices summary (#bp-summary) but no best practices found."
    );
    bpSummary.remove();
  }
}

var bestPractices = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$u,
  run: run$j
});

// @ts-check

const name$v = "core/figures";

const localizationStrings$5 = {
  en: {
    list_of_figures: "List of Figures",
    fig: "Figure ",
  },
  ja: {
    fig: "図",
    list_of_figures: "図のリスト",
  },
  ko: {
    fig: "그림 ",
    list_of_figures: "그림 목록",
  },
  nl: {
    fig: "Figuur ",
    list_of_figures: "Lijst met figuren",
  },
  es: {
    fig: "Figura ",
    list_of_figures: "Lista de Figuras",
  },
  zh: {
    fig: "圖 ",
    list_of_figures: "List of Figures",
  },
};

const lang$d = lang in localizationStrings$5 ? lang : "en";

const l10n$7 = localizationStrings$5[lang$d];

function run$k() {
  normalizeImages(document);

  const tof = collectFigures();

  // Create a Table of Figures if a section with id 'tof' exists.
  const tofElement = document.getElementById("tof");
  if (tof.length && tofElement) {
    decorateTableOfFigures(tofElement);
    tofElement.append(
      hyperHTML$1`<h2>${l10n$7.list_of_figures}</h2>`,
      hyperHTML$1`<ul class='tof'>${tof}</ul>`
    );
  }
}

/**
 * process all figures
 */
function collectFigures() {
  /** @type {HTMLElement[]} */
  const tof = [];
  document.querySelectorAll("figure:not(.equation)").forEach((fig, i) => {
    const caption = fig.querySelector("figcaption");

    if (caption) {
      decorateFigure(fig, caption, i);
      tof.push(getTableOfFiguresListItem(fig.id, caption));
    } else {
      showInlineWarning(fig, "Found a `<figure>` without a `<figcaption>`");
    }
  });
  return tof;
}

/**
 * @param {HTMLElement} figure
 * @param {HTMLElement} caption
 * @param {number} i
 */
function decorateFigure(figure, caption, i) {
  const title = caption.textContent;
  addId(figure, "fig", title);
  // set proper caption title
  wrapInner(caption, hyperHTML$1`<span class='fig-title'>`);
  caption.prepend(l10n$7.fig, hyperHTML$1`<bdi class='figno'>${i + 1}</bdi>`, " ");
}

/**
 * @param {string} figureId
 * @param {HTMLElement} caption
 * @return {HTMLElement}
 */
function getTableOfFiguresListItem(figureId, caption) {
  const tofCaption = caption.cloneNode(true);
  tofCaption.querySelectorAll("a").forEach(anchor => {
    renameElement(anchor, "span").removeAttribute("href");
  });
  tofCaption.querySelectorAll("dfn").forEach(dfn => {
    renameElement(dfn, "span");
  });
  tofCaption.querySelectorAll("[id]").forEach(anchor => {
    anchor.removeAttribute("id");
  });
  tofCaption
    .querySelectorAll(
      "span.footnote, span.issue, span.respec-error, span.noToc"
    )
    .forEach(anchor => {
      // footnotes, issues, errors, and text explicitly marked noToC are not in a ToC
      anchor.remove();
    });
  return hyperHTML$1`<li class='tofline'>
    <a class='tocxref' href='${`#${figureId}`}'>${tofCaption.childNodes}</a>
  </li>`;
}

function normalizeImages(doc) {
  doc
    .querySelectorAll(
      ":not(picture)>img:not([width]):not([height]):not([srcset])"
    )
    .forEach(img => {
      if (img.naturalHeight === 0 || img.naturalWidth === 0) return;
      img.height = img.naturalHeight;
      img.width = img.naturalWidth;
    });
}

/**
 * if it has a parent section, don't touch it
 * if it has a class of appendix or introductory, don't touch it
 * if all the preceding section siblings are introductory, make it introductory
 * if there is a preceding section sibling which is an appendix, make it appendix
 * @param {Element} tofElement
 */
function decorateTableOfFigures(tofElement) {
  if (
    tofElement.classList.contains("appendix") ||
    tofElement.classList.contains("introductory") ||
    tofElement.closest("section")
  ) {
    return;
  }

  const previousSections = getPreviousSections(tofElement);
  if (previousSections.every(sec => sec.classList.contains("introductory"))) {
    tofElement.classList.add("introductory");
  } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
    tofElement.classList.add("appendix");
  }
}

/**
 * @param {Element} element
 */
function getPreviousSections(element) {
  /** @type {Element[]} */
  const sections = [];
  for (const previous of iteratePreviousElements(element)) {
    if (previous.localName === "section") {
      sections.push(previous);
    }
  }
  return sections;
}

/**
 * @param {Element} element
 */
function* iteratePreviousElements(element) {
  let previous = element;
  while (previous.previousElementSibling) {
    previous = previous.previousElementSibling;
    yield previous;
  }
}

var figures = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$v,
  run: run$k
});

// @ts-check
const name$w = "core/data-cite";

function requestLookup(conf) {
  const toCiteDetails = citeDetailsConverter(conf);
  return async elem => {
    const originalKey = elem.dataset.cite;
    const { key, frag, path } = toCiteDetails(elem);
    let href = "";
    let title = "";
    // This is just referring to this document
    if (key.toLowerCase() === conf.shortName.toLowerCase()) {
      console.log(
        elem,
        `The reference "${key}" is resolved into the current document per \`conf.shortName\`.`
      );
      href = document.location.href;
    } else {
      // Let's go look it up in spec ref...
      const entry = await resolveRef(key);
      cleanElement(elem);
      if (!entry) {
        showInlineWarning(elem, `Couldn't find a match for "${originalKey}"`);
        return;
      }
      href = entry.href;
      title = entry.title;
    }
    if (path) {
      // See: https://github.com/w3c/respec/issues/1856#issuecomment-429579475
      const relPath = path.startsWith("/") ? `.${path}` : path;
      href = new URL(relPath, href).href;
    }
    if (frag) {
      href = new URL(frag, href).href;
    }
    switch (elem.localName) {
      case "a": {
        if (elem.textContent === "" && elem.dataset.lt !== "the-empty-string") {
          elem.textContent = title;
        }
        elem.href = href;
        if (!path && !frag) {
          const cite = document.createElement("cite");
          elem.replaceWith(cite);
          cite.append(elem);
        }
        break;
      }
      case "dfn": {
        const anchor = document.createElement("a");
        anchor.href = href;
        if (!elem.textContent) {
          anchor.textContent = title;
          elem.append(anchor);
        } else {
          wrapInner(elem, anchor);
        }
        if (!path && !frag) {
          const cite = document.createElement("cite");
          cite.append(anchor);
          elem.append(cite);
        }
        if ("export" in elem.dataset) {
          showInlineError(
            elem,
            "Exporting an linked external definition is not allowed. Please remove the `data-export` attribute",
            "Please remove the `data-export` attribute."
          );
          delete elem.dataset.export;
        }
        elem.dataset.noExport = "";
        break;
      }
    }
  };
}

function cleanElement(elem) {
  ["data-cite", "data-cite-frag"]
    .filter(attrName => elem.hasAttribute(attrName))
    .forEach(attrName => elem.removeAttribute(attrName));
}

/**
 * @param {string} component
 * @return {(key: string) => string}
 */
function makeComponentFinder(component) {
  return key => {
    const position = key.search(component);
    return position !== -1 ? key.substring(position) : "";
  };
}

/**
 * @typedef {object} CiteDetails
 * @property {string} key
 * @property {boolean} isNormative
 * @property {string} frag
 * @property {string} path
 *
 * @return {(elem: HTMLElement) => CiteDetails};
 */
function citeDetailsConverter(conf) {
  const findFrag = makeComponentFinder("#");
  const findPath = makeComponentFinder("/");
  return function toCiteDetails(elem) {
    const { dataset } = elem;
    const { cite: rawKey, citeFrag, citePath } = dataset;
    // The key is a fragment, resolve using the shortName as key
    if (rawKey.startsWith("#") && !citeFrag) {
      // Closes data-cite not starting with "#"
      /** @type {HTMLElement} */
      const closest = elem.parentElement.closest(
        `[data-cite]:not([data-cite^="#"])`
      );
      const { key: parentKey, isNormative: closestIsNormative } = closest
        ? toCiteDetails(closest)
        : { key: conf.shortName || "", isNormative: false };
      dataset.cite = closestIsNormative ? parentKey : `?${parentKey}`;
      dataset.citeFrag = rawKey.replace("#", ""); // the key is acting as fragment
      return toCiteDetails(elem);
    }
    const frag = citeFrag ? `#${citeFrag}` : findFrag(rawKey);
    const path = citePath || findPath(rawKey).split("#")[0]; // path is always before "#"
    const { type } = refTypeFromContext(rawKey, elem);
    const isNormative = type === "normative";
    // key is before "/" and "#" but after "!" or "?" (e.g., ?key/path#frag)
    const hasPrecedingMark = /^[?|!]/.test(rawKey);
    const key = rawKey.split(/[/|#]/)[0].substring(Number(hasPrecedingMark));
    const details = { key, isNormative, frag, path };
    return details;
  };
}

async function run$l(conf) {
  const toCiteDetails = citeDetailsConverter(conf);
  /** @type {NodeListOf<HTMLElement>} */
  const cites = document.querySelectorAll("dfn[data-cite], a[data-cite]");
  Array.from(cites)
    .filter(el => el.dataset.cite)
    .map(toCiteDetails)
    // it's not the same spec
    .filter(({ key }) => {
      return key.toLowerCase() !== (conf.shortName || "").toLowerCase();
    })
    .forEach(({ isNormative, key }) => {
      if (!isNormative && !conf.normativeReferences.has(key)) {
        conf.informativeReferences.add(key);
        return;
      }
      conf.normativeReferences.add(key);
      conf.informativeReferences.delete(key);
    });
}

/**
 * @param {Document} doc
 * @param {*} conf
 */
async function linkInlineCitations(doc, conf = respecConfig) {
  const toLookupRequest = requestLookup(conf);
  const elems = [
    ...doc.querySelectorAll(
      "dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])"
    ),
  ];
  const citeConverter = citeDetailsConverter(conf);

  const promisesForMissingEntries = elems
    .map(citeConverter)
    .map(async entry => {
      const result = await resolveRef(entry.key);
      return { entry, result };
    });
  const bibEntries = await Promise.all(promisesForMissingEntries);

  const missingBibEntries = bibEntries
    .filter(({ result }) => result === null)
    .map(({ entry: { key } }) => key);

  // we now go to network to fetch missing entries
  const newEntries = await updateFromNetwork(missingBibEntries);
  if (newEntries) Object.assign(biblio, newEntries);

  const lookupRequests = [...new Set(elems)].map(toLookupRequest);
  return await Promise.all(lookupRequests);
}

var dataCite = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$w,
  run: run$l,
  linkInlineCitations: linkInlineCitations
});

// @ts-check

/**
 * @typedef {import('core/xref').RequestEntry} RequestEntry
 * @typedef {import('core/xref').Response} Response
 * @typedef {import('core/xref').SearchResultEntry} SearchResultEntry
 */

const VERSION_CHECK_WAIT = 5 * 60 * 60 * 1000; // 5 min

async function getIdbCache() {
  const db = await idb.openDB("xref", 1, {
    upgrade(db) {
      db.createObjectStore("xrefs");
    },
  });
  return new IDBKeyVal(db, "xrefs");
}

/**
 * @param {RequestEntry[]} uniqueQueryKeys
 * @returns {Promise<Map<string, SearchResultEntry[]>>}
 */
async function resolveXrefCache(uniqueQueryKeys) {
  try {
    const cache = await getIdbCache();
    return await resolveFromCache(uniqueQueryKeys, cache);
  } catch (err) {
    console.error(err);
    return new Map();
  }
}

/**
 * @param {RequestEntry[]} keys
 * @param {IDBKeyVal} cache
 * @returns {Promise<Map<string, SearchResultEntry[]>>}
 */
async function resolveFromCache(keys, cache) {
  const bustCache = await shouldBustCache(cache);
  if (bustCache) {
    await cache.clear();
    return new Map();
  }

  const cachedData = await cache.getMany(keys.map(key => key.id));
  return cachedData;
}

/**
 * Get last updated timestamp from server and bust cache based on that. This
 * way, we prevent dirty/erroneous/stale data being kept on a client (which is
 * possible if we use a `MAX_AGE` based caching strategy).
 * @param {IDBKeyVal} cache
 */
async function shouldBustCache(cache) {
  const lastChecked = await cache.get("__LAST_VERSION_CHECK__");
  const now = Date.now();

  if (!lastChecked) {
    await cache.set("__LAST_VERSION_CHECK__", now);
    return false;
  }
  if (now - lastChecked < VERSION_CHECK_WAIT) {
    // avoid checking network for any data update if old cache "fresh"
    return false;
  }

  const url = new URL("meta/version", API_URL).href;
  const res = await fetch(url);
  if (!res.ok) return false;
  const lastUpdated = await res.text();
  await cache.set("__LAST_VERSION_CHECK__", now);
  return parseInt(lastUpdated, 10) > lastChecked;
}

/**
 * @param {Map<string, SearchResultEntry[]>} data
 */
async function cacheXrefData(data) {
  try {
    const cache = await getIdbCache();
    // add data to cache
    await cache.addMany(data);
  } catch (e) {
    console.error(e);
  }
}

// @ts-check

const profiles = {
  "web-platform": ["HTML", "INFRA", "URL", "WEBIDL", "DOM", "FETCH"],
};

const API_URL = "https://respec.org/xref/";

if (
  !document.querySelector("link[rel='preconnect'][href='https://respec.org']")
) {
  const link = createResourceHint({
    hint: "preconnect",
    href: "https://respec.org",
  });
  document.head.appendChild(link);
}

/**
 * main external reference driver
 * @param {Object} conf respecConfig
 * @param {HTMLElement[]} elems possibleExternalLinks
 */
async function run$m(conf, elems) {
  const xref = normalizeConfig(conf.xref);
  if (xref.specs) {
    const bodyCite = document.body.dataset.cite
      ? document.body.dataset.cite.split(/\s+/)
      : [];
    document.body.dataset.cite = bodyCite.concat(xref.specs).join(" ");
  }

  if (!elems.length) return;

  /** @type {RequestEntry[]} */
  const queryKeys = [];
  for (const elem of elems) {
    const entry = getRequestEntry(elem);
    const id = await objectHash(entry);
    queryKeys.push({ ...entry, id });
  }

  const data = await getData(queryKeys, xref.url);
  addDataCiteToTerms(elems, queryKeys, data, conf);
}

/**
 * converts conf.xref to object with url and spec properties
 */
function normalizeConfig(xref) {
  const defaults = {
    url: API_URL,
    specs: null,
  };

  const config = Object.assign({}, defaults);

  const type = Array.isArray(xref) ? "array" : typeof xref;
  switch (type) {
    case "boolean":
      // using defaults already, as above
      break;
    case "string":
      if (xref.toLowerCase() in profiles) {
        Object.assign(config, { specs: profiles[xref.toLowerCase()] });
      } else {
        invalidProfileError(xref);
      }
      break;
    case "array":
      Object.assign(config, { specs: xref });
      break;
    case "object":
      Object.assign(config, xref);
      if (xref.profile) {
        const profile = xref.profile.toLowerCase();
        if (profile in profiles) {
          const specs = (xref.specs || []).concat(profiles[profile]);
          Object.assign(config, { specs });
        } else {
          invalidProfileError(xref.profile);
        }
      }
      break;
    default:
      pub(
        "error",
        `Invalid value for \`xref\` configuration option. Received: "${xref}".`
      );
  }
  return config;

  function invalidProfileError(profile) {
    const supportedProfiles = Object.keys(profiles)
      .map(p => `"${p}"`)
      .join(", ");
    const msg =
      `Invalid profile "${profile}" in \`respecConfig.xref\`. ` +
      `Please use one of the supported profiles: ${supportedProfiles}.`;
    pub("error", msg);
  }
}

/**
 * get xref API request entry (term and context) for given xref element
 * @param {HTMLElement} elem
 */
function getRequestEntry(elem) {
  const isIDL = "xrefType" in elem.dataset;

  let term = getTermFromElement(elem);
  if (!isIDL) term = term.toLowerCase();

  /** @type {string[][]} */
  const specs = [];
  /** @type {HTMLElement} */
  let dataciteElem = elem.closest("[data-cite]");
  while (dataciteElem) {
    const cite = dataciteElem.dataset.cite.toLowerCase().replace(/[!?]/g, "");
    const cites = cite.split(/\s+/).filter(s => s);
    if (cites.length) {
      specs.push(cites.sort());
    }
    if (dataciteElem === elem) break;
    dataciteElem = dataciteElem.parentElement.closest("[data-cite]");
  }
  // if element itself contains data-cite, we don't take inline context into account
  if (elem.closest("[data-cite]") !== elem) {
    const closestSection = elem.closest("section");
    /** @type {Iterable<HTMLElement>} */
    const bibrefs = closestSection
      ? closestSection.querySelectorAll("a.bibref")
      : [];
    const inlineRefs = [...bibrefs].map(el => el.textContent.toLowerCase());
    const uniqueInlineRefs = [...new Set(inlineRefs)].sort();
    if (uniqueInlineRefs.length) {
      specs.unshift(uniqueInlineRefs);
    }
  }

  const types = [];
  if (isIDL) {
    if (elem.dataset.xrefType) {
      types.push(...elem.dataset.xrefType.split("|"));
    } else {
      types.push("_IDL_");
    }
  } else {
    types.push("_CONCEPT_");
  }

  let { xrefFor: forContext } = elem.dataset;
  if (!forContext && isIDL) {
    /** @type {HTMLElement} */
    const dataXrefForElem = elem.closest("[data-xref-for]");
    if (dataXrefForElem) {
      forContext = norm(dataXrefForElem.dataset.xrefFor);
    }
  } else if (forContext && typeof forContext === "string") {
    forContext = norm(forContext);
  }
  return {
    term,
    types,
    ...(specs.length && { specs }),
    ...(typeof forContext === "string" && { for: forContext }),
  };
}

/** @param {HTMLElement} elem */
function getTermFromElement(elem) {
  const { lt: linkingText } = elem.dataset;
  let term = linkingText ? linkingText.split("|", 1)[0] : elem.textContent;
  term = norm(term);
  return term === "the-empty-string" ? "" : term;
}

/**
 * @param {RequestEntry[]} queryKeys
 * @param {string} apiUrl
 * @returns {Promise<Map<string, SearchResultEntry[]>>}
 */
async function getData(queryKeys, apiUrl) {
  const uniqueIds = new Set();
  const uniqueQueryKeys = queryKeys.filter(key => {
    return uniqueIds.has(key.id) ? false : uniqueIds.add(key.id) && true;
  });

  const resultsFromCache = await resolveXrefCache(uniqueQueryKeys);

  const termsToLook = uniqueQueryKeys.filter(
    key => !resultsFromCache.get(key.id)
  );
  const fetchedResults = await fetchFromNetwork(termsToLook, apiUrl);
  if (fetchedResults.size) {
    // add data to cache
    await cacheXrefData(fetchedResults);
  }

  return new Map([...resultsFromCache, ...fetchedResults]);
}

/**
 * @param {RequestEntry[]} keys
 * @param {string} url
 * @returns {Promise<Map<string, SearchResultEntry[]>>}
 */
async function fetchFromNetwork(keys, url) {
  if (!keys.length) return new Map();

  const query = { keys };
  const options = {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return new Map(json.result);
}

/**
 * Figures out from the tree structure if the reference is
 * normative (true) or informative (false).
 * @param {HTMLElement} elem
 */
function isNormative(elem) {
  const closestNormative = elem.closest(".normative");
  const closestInform = elem.closest(nonNormativeSelector);
  if (!closestInform || elem === closestNormative) {
    return true;
  }
  return (
    closestNormative &&
    closestInform &&
    closestInform.contains(closestNormative)
  );
}

/**
 * adds data-cite attributes to elems for each term for which results are found.
 * adds citations to references section.
 * collects and shows linking errors if any.
 * @param {HTMLElement[]} elems
 * @param {RequestEntry[]} queryKeys
 * @param {Map<string, SearchResultEntry[]>} data
 * @param {any} conf
 */
function addDataCiteToTerms(elems, queryKeys, data, conf) {
  /** @type {Errors} */
  const errors = { ambiguous: new Map(), notFound: new Map() };

  for (let i = 0, l = elems.length; i < l; i++) {
    if (elems[i].closest("[data-no-xref]")) continue;

    const elem = elems[i];
    const query = queryKeys[i];

    const { id } = query;
    const results = data.get(id);
    if (results.length === 1) {
      addDataCite(elem, query, results[0], conf);
    } else {
      const collector = errors[results.length === 0 ? "notFound" : "ambiguous"];
      if (!collector.has(id)) {
        collector.set(id, { elems: [], results, query });
      }
      collector.get(id).elems.push(elem);
    }
  }

  showErrors(errors);
}

/**
 * @param {HTMLElement} elem
 * @param {RequestEntry} query
 * @param {SearchResultEntry} result
 * @param {any} conf
 */
function addDataCite(elem, query, result, conf) {
  const { term } = query;
  const { uri, shortname: cite, normative, type } = result;

  const path = uri.includes("/") ? uri.split("/", 1)[1] : uri;
  const [citePath, citeFrag] = path.split("#");
  const dataset = { cite, citePath, citeFrag, type };
  Object.assign(elem.dataset, dataset);

  // update indirect links (data-lt, data-plurals)
  /** @type {NodeListOf<HTMLElement>} */
  const indirectLinks = document.querySelectorAll(
    `[data-dfn-type="xref"][data-xref="${term.toLowerCase()}"]`
  );
  indirectLinks.forEach(el => {
    el.removeAttribute("data-xref");
    Object.assign(el.dataset, dataset);
  });

  addToReferences(elem, cite, normative, term, conf);
}

/**
 * add specs for citation (references section)
 * @param {HTMLElement} elem
 * @param {string} cite
 * @param {boolean} normative
 * @param {string} term
 * @param {any} conf
 */
function addToReferences(elem, cite, normative, term, conf) {
  const isNormRef = isNormative(elem);
  if (!isNormRef) {
    // Only add it if not already normative...
    if (!conf.normativeReferences.has(cite)) {
      conf.informativeReferences.add(cite);
    }
    return;
  }
  if (normative) {
    // If it was originally informative, we move the existing
    // key to be normative.
    const existingKey = conf.informativeReferences.has(cite)
      ? conf.informativeReferences.getCanonicalKey(cite)
      : cite;
    conf.normativeReferences.add(existingKey);
    conf.informativeReferences.delete(existingKey);
    return;
  }

  const msg =
    `Adding an informative reference to "${term}" from "${cite}" ` +
    "in a normative section";
  const title = "Error: Informative reference in normative section";
  showInlineWarning(elem, msg, title);
}

/** @param {Errors} errors */
function showErrors({ ambiguous, notFound }) {
  const getPrefilledFormURL = (term, query, specs = []) => {
    const url = new URL(API_URL);
    url.searchParams.set("term", term);
    if (query.for) url.searchParams.set("for", query.for);
    url.searchParams.set("types", query.types.join(","));
    if (specs.length) url.searchParams.set("cite", specs.join(","));
    return url;
  };

  for (const { query, elems } of notFound.values()) {
    const specs = [...new Set(flatten([], query.specs))].sort();
    const originalTerm = getTermFromElement(elems[0]);
    const formUrl = getPrefilledFormURL(originalTerm, query, specs);
    const specsString = specs.map(spec => `\`${spec}\``).join(", ");
    const msg =
      `Couldn't match "**${originalTerm}**" to anything in the document or in any other document cited in this specification: ${specsString}. ` +
      `See [how to cite to resolve the error](${formUrl})`;
    showInlineError(elems, msg, "Error: No matching dfn found.");
  }

  for (const { query, elems, results } of ambiguous.values()) {
    const specs = [...new Set(results.map(entry => entry.shortname))].sort();
    const specsString = specs.map(s => `**${s}**`).join(", ");
    const originalTerm = getTermFromElement(elems[0]);
    const formUrl = getPrefilledFormURL(originalTerm, query, specs);
    const msg =
      `The term "**${originalTerm}**" is defined in ${specsString} in multiple ways, so it's ambiguous. ` +
      `See [how to cite to resolve the error](${formUrl})`;
    showInlineError(elems, msg, "Error: Linking an ambiguous dfn.");
  }
}

function objectHash(obj) {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  const buffer = new TextEncoder().encode(str);
  return crypto.subtle.digest("SHA-1", buffer).then(bufferToHexString);
}

/** @param {ArrayBuffer} buffer */
function bufferToHexString(buffer) {
  const byteArray = new Uint8Array(buffer);
  return [...byteArray].map(v => v.toString(16).padStart(2, "0")).join("");
}

// @ts-check
const name$x = "core/link-to-dfn";
const l10n$8 = {
  en: {
    /**
     * @param {string} title
     */
    duplicateMsg(title) {
      return `Duplicate definition(s) of '${title}'`;
    },
    duplicateTitle: "This is defined more than once in the document.",
  },
};
const lang$e = lang in l10n$8 ? lang : "en";

class CaseInsensitiveMap extends Map {
  /**
   * @param {Array<[String, HTMLElement]>} [entries]
   */
  constructor(entries = []) {
    super();
    entries.forEach(([key, elem]) => {
      this.set(key, elem);
    });
    return this;
  }
  set(key, elem) {
    super.set(key.toLowerCase(), elem);
    return this;
  }
  get(key) {
    return super.get(key.toLowerCase());
  }
  has(key) {
    return super.has(key.toLowerCase());
  }
  delete(key) {
    return super.delete(key.toLowerCase());
  }
}

async function run$n(conf) {
  const titleToDfns = mapTitleToDfns();
  /** @type {HTMLElement[]} */
  const possibleExternalLinks = [];
  /** @type {HTMLAnchorElement[]} */
  const badLinks = [];

  const localLinkSelector =
    "a[data-cite=''], a:not([href]):not([data-cite]):not(.logo):not(.externalDFN)";
  document.querySelectorAll(localLinkSelector).forEach((
    /** @type {HTMLAnchorElement} */ anchor
  ) => {
    const linkTargets = getLinkTargets(anchor);
    const foundDfn = linkTargets.some(target => {
      return findLinkTarget(target, anchor, titleToDfns, possibleExternalLinks);
    });
    if (!foundDfn && linkTargets.length !== 0) {
      if (anchor.dataset.cite === "") {
        badLinks.push(anchor);
      } else {
        possibleExternalLinks.push(anchor);
      }
    }
  });

  showLinkingError(badLinks);

  if (conf.xref) {
    possibleExternalLinks.push(...findExplicitExternalLinks());
    try {
      await run$m(conf, possibleExternalLinks);
    } catch (error) {
      console.error(error);
      showLinkingError(possibleExternalLinks);
    }
  } else {
    showLinkingError(possibleExternalLinks);
  }

  await linkInlineCitations(document, conf);
  // Added message for legacy compat with Aria specs
  // See https://github.com/w3c/respec/issues/793
  pub("end", "core/link-to-dfn");
}

function mapTitleToDfns() {
  const titleToDfns = new CaseInsensitiveMap();
  Object.keys(definitionMap).forEach(title => {
    const { result, duplicates } = collectDfns(title);
    titleToDfns.set(title, result);
    if (duplicates.length > 0) {
      showInlineError(
        duplicates,
        l10n$8[lang$e].duplicateMsg(title),
        l10n$8[lang$e].duplicateTitle
      );
    }
  });
  return titleToDfns;
}

/**
 * @param {string} title
 */
function collectDfns(title) {
  /** @type {Map<string, HTMLElement>} */
  const result = new Map();
  const duplicates = [];
  definitionMap[title].forEach(dfn => {
    const { dfnFor = "" } = dfn.dataset;
    if (result.has(dfnFor)) {
      // We want <dfn> definitions to take precedence over
      // definitions from WebIDL. WebIDL definitions wind
      // up as <span>s instead of <dfn>.
      const oldIsDfn = result.get(dfnFor).localName === "dfn";
      const newIsDfn = dfn.localName === "dfn";
      if (oldIsDfn) {
        if (!newIsDfn) {
          // Don't overwrite <dfn> definitions.
          return;
        }
        duplicates.push(dfn);
      }
    }
    result.set(dfnFor, dfn);
    addId(dfn, "dfn", title);
  });
  return { result, duplicates };
}

/**
 * @param {import("./utils.js").LinkTarget} target
 * @param {HTMLAnchorElement} anchor
 * @param {CaseInsensitiveMap} titleToDfns
 * @param {HTMLElement[]} possibleExternalLinks
 */
function findLinkTarget(target, anchor, titleToDfns, possibleExternalLinks) {
  const { linkFor } = anchor.dataset;
  if (
    !titleToDfns.has(target.title) ||
    !titleToDfns.get(target.title).get(target.for)
  ) {
    return false;
  }
  const dfn = titleToDfns.get(target.title).get(target.for);
  if (dfn.dataset.cite) {
    anchor.dataset.cite = dfn.dataset.cite;
  } else if (linkFor && !titleToDfns.get(linkFor)) {
    possibleExternalLinks.push(anchor);
  } else if (dfn.classList.contains("externalDFN")) {
    // data-lt[0] serves as unique id for the dfn which this element references
    const lt = dfn.dataset.lt ? dfn.dataset.lt.split("|") : [];
    anchor.dataset.lt = lt[0] || dfn.textContent;
    possibleExternalLinks.push(anchor);
  } else {
    if (anchor.dataset.idl === "partial") {
      possibleExternalLinks.push(anchor);
    } else {
      anchor.href = `#${dfn.id}`;
      anchor.classList.add("internalDFN");
    }
  }
  if (!anchor.hasAttribute("data-link-type")) {
    anchor.dataset.linkType = "idl" in dfn.dataset ? "idl" : "dfn";
  }
  if (isCode(dfn)) {
    wrapAsCode(anchor, dfn);
  }
  return true;
}

/**
 * Check if a definition is a code
 * @param {HTMLElement} dfn a definition
 */
function isCode(dfn) {
  if (dfn.closest("code,pre")) {
    return true;
  }
  // Note that childNodes.length === 1 excludes
  // definitions that have either other text, or other
  // whitespace, inside the <dfn>.
  if (dfn.childNodes.length !== 1) {
    return false;
  }
  const [first] = /** @type {NodeListOf<HTMLElement>} */ (dfn.childNodes);
  return first.localName === "code";
}

/**
 * Wrap links by <code>.
 * @param {HTMLAnchorElement} ant a link
 * @param {HTMLElement} dfn a definition
 */
function wrapAsCode(ant, dfn) {
  // only add code to IDL when the definition matches
  const term = ant.textContent.trim();
  const isIDL = dfn.dataset.hasOwnProperty("idl");
  const needsCode = shouldWrapByCode(dfn, term);
  if (!isIDL || needsCode) {
    wrapInner(ant, document.createElement("code"));
  }
}

/**
 * @param {HTMLElement} dfn
 * @param {string} term
 */
function shouldWrapByCode(dfn, term) {
  const { dataset } = dfn;
  if (dfn.textContent.trim() === term) {
    return true;
  } else if (dataset.title === term) {
    return true;
  } else if (dataset.lt) {
    return dataset.lt.split("|").includes(term);
  }
  return false;
}

/**
 * Find additional references that need to be looked up externally.
 * Examples: a[data-cite="spec"], dfn[data-cite="spec"], dfn.externalDFN
 */
function findExplicitExternalLinks() {
  /** @type {NodeListOf<HTMLElement>} */
  const links = document.querySelectorAll(
    "a[data-cite]:not([data-cite='']):not([data-cite*='#']), " +
      "dfn[data-cite]:not([data-cite='']):not([data-cite*='#'])"
  );
  /** @type {NodeListOf<HTMLElement>} */
  const externalDFNs = document.querySelectorAll("dfn.externalDFN");
  return [...links]
    .filter(el => {
      // ignore empties
      if (el.textContent.trim() === "") return false;
      /** @type {HTMLElement} */
      const closest = el.closest("[data-cite]");
      return !closest || closest.dataset.cite !== "";
    })
    .concat(...externalDFNs);
}

function showLinkingError(elems) {
  elems.forEach(elem => {
    showInlineWarning(
      elem,
      `Found linkless \`<a>\` element with text "${elem.textContent}" but no matching \`<dfn>\``,
      "Linking error: not matching `<dfn>`"
    );
  });
}

var linkToDfn = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$x,
  run: run$n
});

// @ts-check
const name$y = "core/contrib";

async function run$o(conf) {
  const ghContributors = document.getElementById("gh-contributors");
  if (!ghContributors) {
    return;
  }

  if (!conf.github) {
    const msg =
      "Requested list of contributors from GitHub, but " +
      "[`github`](https://github.com/w3c/respec/wiki/github) configuration option is not set.";
    pub("error", msg);
    return;
  }

  const editors = conf.editors.map(editor => editor.name);
  await showContributors(editors, conf.githubAPI);
}

/**
 * Show list of contributors in #gh-contributors
 * @param {string[]} editors
 * @param {string} apiURL
 */
async function showContributors(editors, apiURL) {
  const elem = document.getElementById("gh-contributors");
  if (!elem) return;

  elem.textContent = "Fetching list of contributors...";
  const contributors = await getContributors();
  if (contributors !== null) {
    toHTML(contributors, elem);
  } else {
    elem.textContent = "Failed to fetch contributors.";
  }

  async function getContributors() {
    const { href: url } = new URL("contributors", apiURL);
    try {
      const res = await fetchAndCache(url);
      if (!res.ok) {
        throw new Error(
          `Request to ${url} failed with status code ${res.status}`
        );
      }
      /** @type {Contributor[]} */
      const contributors = await res.json();
      return contributors.filter(
        user => !editors.includes(user.name || user.login)
      );
    } catch (error) {
      pub("error", "Error loading contributors from GitHub.");
      console.error(error);
      return null;
    }
  }
}

/**
 * @typedef {{ name?: string, login: string }} Contributor
 * @param {Contributor[]} contributors
 * @param {HTMLElement} element
 */
function toHTML(contributors, element) {
  const sortedContributors = contributors.sort((a, b) => {
    const nameA = a.name || a.login;
    const nameB = b.name || b.login;
    return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
  });

  if (element.tagName === "UL") {
    hyperHTML$1(element)`${sortedContributors.map(
      ({ name, login }) =>
        `<li><a href="https://github.com/${login}">${name || login}</a></li>`
    )}`;
    return;
  }

  const names = sortedContributors.map(user => user.name || user.login);
  element.textContent = joinAnd(names);
}

var contrib = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$y,
  run: run$o
});

// @ts-check

const name$z = "core/fix-headers";

function run$p() {
  [...document.querySelectorAll("section:not(.introductory)")]
    .map(sec => sec.querySelector("h1, h2, h3, h4, h5, h6"))
    .filter(h => h)
    .forEach(heading => {
      const depth = Math.min(getParents(heading, "section").length + 1, 6);
      renameElement(heading, `h${depth}`);
    });
}

function getParents(el, selector) {
  const parents = [];
  while (el != el.ownerDocument.body) {
    if (el.matches(selector)) parents.push(el);
    el = el.parentElement;
  }
  return parents;
}

var fixHeaders = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$z,
  run: run$p
});

// @ts-check

const lowerHeaderTags = ["h2", "h3", "h4", "h5", "h6"];
const headerTags = ["h1", ...lowerHeaderTags];

const name$A = "core/structure";

const localizationStrings$6 = {
  en: {
    toc: "Table of Contents",
  },
  nl: {
    toc: "Inhoudsopgave",
  },
  es: {
    toc: "Tabla de Contenidos",
  },
};

const lang$f = lang in localizationStrings$6 ? lang : "en";

const l10n$9 = localizationStrings$6[lang$f];

/**
 * @typedef {object} SectionInfo
 * @property {string} secno
 * @property {string} title
 *
 * Scans sections and generate ordered list element + ID-to-anchor-content dictionary.
 * @param {Section[]} sections the target element to find child sections
 * @param {number} maxTocLevel
 */
function scanSections(sections, maxTocLevel, { prefix = "" } = {}) {
  let appendixMode = false;
  let lastNonAppendix = 0;
  let index = 1;
  if (prefix.length && !prefix.endsWith(".")) {
    prefix += ".";
  }
  if (sections.length === 0) {
    return null;
  }
  /** @type {HTMLElement} */
  const ol = hyperHTML$1`<ol class='toc'>`;
  for (const section of sections) {
    if (section.isAppendix && !prefix && !appendixMode) {
      lastNonAppendix = index;
      appendixMode = true;
    }
    let secno = section.isIntro
      ? ""
      : appendixMode
      ? appendixNumber(index - lastNonAppendix)
      : prefix + index;
    const level = parents(section, "section").length + 1;
    if (level === 1) {
      secno += ".";
      // if this is a top level item, insert
      // an OddPage comment so html2ps will correctly
      // paginate the output
      section.header.before(document.createComment("OddPage"));
    }

    if (!section.isIntro) {
      index += 1;
      section.header.prepend(hyperHTML$1`<bdi class='secno'>${secno} </bdi>`);
    }

    if (level <= maxTocLevel) {
      const item = createTocListItem(section.header, section.element.id);
      const sub = scanSections(section.subsections, maxTocLevel, {
        prefix: secno,
      });
      if (sub) {
        item.append(sub);
      }
      ol.append(item);
    }
  }
  return ol;
}

/**
 * @typedef {object} Section
 * @property {Element} element
 * @property {Element} header
 * @property {string} title
 * @property {boolean} isIntro
 * @property {boolean} isAppendix
 * @property {Section[]} subsections
 *
 * @param {Element} parent
 */
function getSectionTree(parent, { tocIntroductory = false } = {}) {
  const sectionElements = children(
    parent,
    tocIntroductory ? "section" : "section:not(.introductory)"
  );
  /** @type {Section[]} */
  const sections = [];

  for (const section of sectionElements) {
    const noToc = section.classList.contains("notoc");
    if (!section.children.length || noToc) {
      continue;
    }
    const header = section.children[0];
    if (!lowerHeaderTags.includes(header.localName)) {
      continue;
    }
    const title = header.textContent;
    addId(section, null, title);
    sections.push({
      element: section,
      header,
      title,
      isIntro: section.classList.contains("introductory"),
      isAppendix: section.classList.contains("appendix"),
      subsections: getSectionTree(section, { tocIntroductory }),
    });
  }
  return sections;
}

/**
 * @param {Element} header
 * @param {string} id
 */
function createTocListItem(header, id) {
  const anchor = hyperHTML$1`<a href="${`#${id}`}" class="tocxref"/>`;
  anchor.append(...header.cloneNode(true).childNodes);
  filterHeader(anchor);
  return hyperHTML$1`<li class='tocline'>${anchor}</li>`;
}

/**
 * Replaces any child <a> and <dfn> with <span>.
 * Removes footnotes and issues
 * @param {HTMLElement} h
 */
function filterHeader(h) {
  h.querySelectorAll("a").forEach(anchor => {
    const span = renameElement(anchor, "span");
    span.className = "formerLink";
    span.removeAttribute("href");
  });
  h.querySelectorAll("dfn").forEach(dfn => {
    const span = renameElement(dfn, "span");
    span.removeAttribute("id");
  });
  h.querySelectorAll("span.footnote, span.issue").forEach(elem =>
    elem.remove()
  );
}

function run$q(conf) {
  if ("tocIntroductory" in conf === false) {
    conf.tocIntroductory = false;
  }
  if ("maxTocLevel" in conf === false) {
    conf.maxTocLevel = Infinity;
  }

  renameSectionHeaders();

  // makeTOC
  if (!conf.noTOC) {
    const sectionTree = getSectionTree(document.body, {
      tocIntroductory: conf.tocIntroductory,
    });
    const result = scanSections(sectionTree, conf.maxTocLevel);
    if (result) {
      createTableOfContents(result);
    }
  }
}

function renameSectionHeaders() {
  const headers = getNonintroductorySectionHeaders();
  if (!headers.length) {
    return;
  }
  headers.forEach(header => {
    const depth = parents(header, "section").length + 1;
    const h = `h${Math.min(depth, 6)}`;
    if (header.localName !== h) {
      renameElement(header, h);
    }
    if (depth > 6) {
      if (header.classList) {
        header.classList.add(`h${depth}`);
      } else {
        header.className = `h${depth}`;
      }
    }
  });
}

function getNonintroductorySectionHeaders() {
  const headerSelector = headerTags
    .map(h => `section:not(.introductory) ${h}:first-child`)
    .join(",");
  return [...document.querySelectorAll(headerSelector)].filter(
    elem => !elem.closest("section.introductory")
  );
}

/**
 * @param {HTMLElement} ol
 */
function createTableOfContents(ol) {
  if (!ol) {
    return;
  }
  const nav = hyperHTML$1`<nav id="toc">`;
  const h2 = hyperHTML$1`<h2 class="introductory">${l10n$9.toc}</h2>`;
  addId(h2);
  nav.append(h2, ol);
  const ref =
    document.getElementById("toc") ||
    document.getElementById("sotd") ||
    document.getElementById("abstract");
  if (ref) {
    if (ref.id === "toc") {
      ref.replaceWith(nav);
    } else {
      ref.after(nav);
    }
  }

  const link = hyperHTML$1`<p role='navigation' id='back-to-top'><a href='#title'><abbr title='Back to Top'>&uarr;</abbr></a></p>`;
  document.body.append(link);
}

function appendixNumber(index) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lastChar = alphabet.charAt(index % alphabet.length);
  if (index < alphabet.length) {
    return lastChar;
  }
  return appendixNumber(Math.floor(index / alphabet.length)) + lastChar;
}

var structure$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$A,
  run: run$q
});

// @ts-check

const name$B = "core/informative";

const localizationStrings$7 = {
  en: {
    informative: "This section is non-normative.",
  },
  nl: {
    informative: "Dit onderdeel is niet normatief.",
  },
};

const lang$g = lang in localizationStrings$7 ? lang : "en";

const l10n$a = localizationStrings$7[lang$g];

function run$r() {
  Array.from(document.querySelectorAll("section.informative"))
    .map(informative => informative.querySelector("h2, h3, h4, h5, h6"))
    .filter(heading => heading)
    .forEach(heading => {
      heading.after(hyperHTML$1`<p><em>${l10n$a.informative}</em></p>`);
    });
}

var informative = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$B,
  run: run$r
});

// @ts-check
// Module core/id-headers
// All headings are expected to have an ID, unless their immediate container has one.
// This is currently in core though it comes from a W3C rule. It may move in the future.

const name$C = "core/id-headers";

function run$s(conf) {
  /** @type {NodeListOf<HTMLElement>} */
  const headings = document.querySelectorAll(
    `section:not(.head):not(.introductory) h2, h3, h4, h5, h6`
  );
  for (const h of headings) {
    addId(h);
    if (!conf.addSectionLinks) continue;
    const id = h.parentElement.id || h.id;
    h.appendChild(hyperHTML$1`
      <a href="${`#${id}`}" class="self-link" aria-label="§"></a>
    `);
  }
}

var idHeaders = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$C,
  run: run$s
});

// @ts-check
const name$D = "geonovum/conformance";

/**
 * @param {Element} conformance
 */
function processConformance(conformance) {
  const content = hyperHTML$1`
>>>>>>> Build
    <h2>Conformiteit</h2>
    <p>
      Naast onderdelen die als niet normatief gemarkeerd zijn, zijn ook alle
      diagrammen, voorbeelden, en noten in dit document niet normatief. Verder
      is alles in dit document normatief.
    </p>
    <p>
      Informatief en normatief.
    </p>
<<<<<<< gh-pages
<<<<<<< gh-pages
  `;e.prepend(...t.childNodes)}function run$s(){const e=document.querySelector("section#conformance");e&&processConformance(e)}var conformance=Object.freeze({__proto__:null,name:name$C,run:run$s});const mimeTypes=new Map([["text/html","html"],["application/xml","xml"]]);function rsDocToDataURL(e,t=document){const n=mimeTypes.get(e);if(!n){const t=[...mimeTypes.values()].join(", ");throw new TypeError(`Invalid format: ${e}. Expected one of: ${t}.`)}const r=serialize(n,t);return`data:${e};charset=utf-8,${encodeURIComponent(r)}`}function serialize(e,t){const n=t.cloneNode(!0);cleanup(n);let r="";switch(e){case"xml":r=(new XMLSerializer).serializeToString(n);break;default:n.doctype&&(r+=(new XMLSerializer).serializeToString(n.doctype)),r+=n.documentElement.outerHTML}return r}function cleanup(e){const{head:t,body:n,documentElement:r}=e;removeCommentNodes(e),e.querySelectorAll(".removeOnSave, #toc-nav").forEach(e=>e.remove()),n.classList.remove("toc-sidebar"),removeReSpec(r);const o=e.createDocumentFragment(),i=e.querySelector("meta[name='viewport']");i&&t.firstChild!==i&&o.appendChild(i);let s=e.querySelector("meta[charset], meta[content*='charset=']");s||(s=hyperHTML$1`<meta charset="utf-8">`),o.appendChild(s);const a=`ReSpec ${window.respecVersion||"Developer Channel"}`,l=hyperHTML$1`
    <meta name="generator" content="${a}">
  `;o.appendChild(l),t.prepend(o),pub("beforesave",r)}expose("core/exporter",{rsDocToDataURL:rsDocToDataURL});const name$D="ui/save-html",epubURL=new URL("https://labs.w3.org/epub-generator/cgi-bin/epub-generator.py");epubURL.searchParams.append("type","respec"),epubURL.searchParams.append("url",document.location.href);const downloadLinks=[{id:"respec-save-as-html",fileName:"index.html",title:"HTML",type:"text/html",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-xml",fileName:"index.xhtml",title:"XML",type:"application/xml",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-epub",fileName:"spec.epub",title:"EPUB 3",type:"application/epub+zip",href:epubURL.href}];function toDownloadLink(e){const{id:t,href:n,fileName:r,title:o,type:i}=e;return hyperHTML$1`
=======
  `;e.prepend(...t.childNodes)}function run$t(){const e=document.querySelector("section#conformance");e&&processConformance(e)}var conformance=Object.freeze({__proto__:null,name:name$D,run:run$t});const mimeTypes=new Map([["text/html","html"],["application/xml","xml"]]);function rsDocToDataURL(e,t=document){const n=mimeTypes.get(e);if(!n){const t=[...mimeTypes.values()].join(", ");throw new TypeError(`Invalid format: ${e}. Expected one of: ${t}.`)}const r=serialize(n,t);return`data:${e};charset=utf-8,${encodeURIComponent(r)}`}function serialize(e,t){const n=t.cloneNode(!0);cleanup(n);let r="";switch(e){case"xml":r=(new XMLSerializer).serializeToString(n);break;default:n.doctype&&(r+=(new XMLSerializer).serializeToString(n.doctype)),r+=n.documentElement.outerHTML}return r}function cleanup(e){const{head:t,body:n,documentElement:r}=e;removeCommentNodes(e),e.querySelectorAll(".removeOnSave, #toc-nav").forEach(e=>e.remove()),n.classList.remove("toc-sidebar"),removeReSpec(r);const o=e.createDocumentFragment(),i=e.querySelector("meta[name='viewport']");i&&t.firstChild!==i&&o.appendChild(i);let s=e.querySelector("meta[charset], meta[content*='charset=']");s||(s=hyperHTML$1`<meta charset="utf-8">`),o.appendChild(s);const a=`ReSpec ${window.respecVersion||"Developer Channel"}`,l=hyperHTML$1`
    <meta name="generator" content="${a}">
  `;o.appendChild(l),t.prepend(o),pub("beforesave",r)}expose("core/exporter",{rsDocToDataURL:rsDocToDataURL});const name$E="ui/save-html",epubURL=new URL("https://labs.w3.org/epub-generator/cgi-bin/epub-generator.py");epubURL.searchParams.append("type","respec"),epubURL.searchParams.append("url",document.location.href);const downloadLinks=[{id:"respec-save-as-html",fileName:"index.html",title:"HTML",type:"text/html",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-xml",fileName:"index.xhtml",title:"XML",type:"application/xml",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-epub",fileName:"spec.epub",title:"EPUB 3",type:"application/epub+zip",href:epubURL.href}];function toDownloadLink(e){const{id:t,href:n,fileName:r,title:o,type:i}=e;return hyperHTML$1`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
=======
  `;
  conformance.prepend(...content.childNodes);
}

function run$t() {
  const conformance = document.querySelector("section#conformance");
  if (conformance) {
    processConformance(conformance);
  }
}

var conformance = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$D,
  run: run$t
});

// @ts-check

const mimeTypes = new Map([
  ["text/html", "html"],
  ["application/xml", "xml"],
]);

/**
 * Creates a dataURI from a ReSpec document. It also cleans up the document
 * removing various things.
 *
 * @param {String} mimeType mimetype. one of `mimeTypes` above
 * @param {Document} doc document to export. useful for testing purposes
 * @returns a stringified data-uri of document that can be saved.
 */
function rsDocToDataURL(mimeType, doc = document) {
  const format = mimeTypes.get(mimeType);
  if (!format) {
    const validTypes = [...mimeTypes.values()].join(", ");
    const msg = `Invalid format: ${mimeType}. Expected one of: ${validTypes}.`;
    throw new TypeError(msg);
  }
  const data = serialize(format, doc);
  const encodedString = encodeURIComponent(data);
  return `data:${mimeType};charset=utf-8,${encodedString}`;
}

function serialize(format, doc) {
  const cloneDoc = doc.cloneNode(true);
  cleanup(cloneDoc);
  let result = "";
  switch (format) {
    case "xml":
      result = new XMLSerializer().serializeToString(cloneDoc);
      break;
    default: {
      if (cloneDoc.doctype) {
        result += new XMLSerializer().serializeToString(cloneDoc.doctype);
      }
      result += cloneDoc.documentElement.outerHTML;
    }
  }
  return result;
}

function cleanup(cloneDoc) {
  const { head, body, documentElement } = cloneDoc;
  removeCommentNodes(cloneDoc);

  cloneDoc
    .querySelectorAll(".removeOnSave, #toc-nav")
    .forEach(elem => elem.remove());
  body.classList.remove("toc-sidebar");
  removeReSpec(documentElement);

  const insertions = cloneDoc.createDocumentFragment();

  // Move meta viewport, as it controls the rendering on mobile.
  const metaViewport = cloneDoc.querySelector("meta[name='viewport']");
  if (metaViewport && head.firstChild !== metaViewport) {
    insertions.appendChild(metaViewport);
  }

  // Move charset to near top, as it needs to be in the first 512 bytes.
  let metaCharset = cloneDoc.querySelector(
    "meta[charset], meta[content*='charset=']"
  );
  if (!metaCharset) {
    metaCharset = hyperHTML$1`<meta charset="utf-8">`;
  }
  insertions.appendChild(metaCharset);

  // Add meta generator
  const respecVersion = `ReSpec ${window.respecVersion || "Developer Channel"}`;
  const metaGenerator = hyperHTML$1`
    <meta name="generator" content="${respecVersion}">
  `;

  insertions.appendChild(metaGenerator);
  head.prepend(insertions);
  pub("beforesave", documentElement);
}

expose("core/exporter", { rsDocToDataURL });

// @ts-check

const name$E = "ui/save-html";

// Create and download an EPUB 3 version of the content
// Using (by default) the EPUB 3 conversion service set up at labs.w3.org/epub-generator
// For more details on that service, see https://github.com/iherman/respec2epub
const epubURL = new URL(
  "https://labs.w3.org/epub-generator/cgi-bin/epub-generator.py"
);
epubURL.searchParams.append("type", "respec");
epubURL.searchParams.append("url", document.location.href);

const downloadLinks = [
  {
    id: "respec-save-as-html",
    fileName: "index.html",
    title: "HTML",
    type: "text/html",
    get href() {
      return rsDocToDataURL(this.type);
    },
  },
  {
    id: "respec-save-as-xml",
    fileName: "index.xhtml",
    title: "XML",
    type: "application/xml",
    get href() {
      return rsDocToDataURL(this.type);
    },
  },
  {
    id: "respec-save-as-epub",
    fileName: "spec.epub",
    title: "EPUB 3",
    type: "application/epub+zip",
    href: epubURL.href,
  },
];

function toDownloadLink(details) {
  const { id, href, fileName, title, type } = details;
  return hyperHTML$1`
>>>>>>> Build
    <a
      href="${href}"
      id="${id}"
      download="${fileName}"
      type="${type}"
      class="respec-save-button"
      onclick=${() => ui.closeModal()}
    >${title}</a>`;
}

const saveDialog = {
  async show(button) {
    await document.respecIsReady;
    const div = hyperHTML$1`
      <div class="respec-save-buttons">
        ${downloadLinks.map(toDownloadLink)}
<<<<<<< gh-pages
<<<<<<< gh-pages
      </div>`;ui.freshModal(l10n[lang].save_snapshot,t,e)}},supportsDownload="download"in HTMLAnchorElement.prototype;let button;function show(){supportsDownload&&saveDialog.show(button)}function exportDocument(e,t){const n="Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed. Use core/exporter `rsDocToDataURL()` instead.";return pub("warn",n),console.warn(n),rsDocToDataURL(t)}supportsDownload&&(button=ui.addCommand(l10n[lang].save_snapshot,show,"Ctrl+Shift+Alt+S","💾"));var saveHtml=Object.freeze({__proto__:null,name:name$D,exportDocument:exportDocument});const button$1=ui.addCommand(l10n[lang].search_specref,show$1,"Ctrl+Shift+Alt+space","🔎"),specrefURL="https://specref.herokuapp.com/",refSearchURL=`${specrefURL}search-refs`,reveseLookupURL=`${specrefURL}reverse-lookup`,form=document.createElement("form"),renderer=hyperHTML$1.bind(form),resultList=hyperHTML$1.bind(document.createElement("div"));function renderResults(e,t,n){if(!e.size)return resultList`
=======
      </div>`;ui.freshModal(l10n[lang].save_snapshot,t,e)}},supportsDownload="download"in HTMLAnchorElement.prototype;let button;function show(){supportsDownload&&saveDialog.show(button)}function exportDocument(e,t){const n="Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed. Use core/exporter `rsDocToDataURL()` instead.";return pub("warn",n),console.warn(n),rsDocToDataURL(t)}supportsDownload&&(button=ui.addCommand(l10n[lang].save_snapshot,show,"Ctrl+Shift+Alt+S","💾"));var saveHtml=Object.freeze({__proto__:null,name:name$E,exportDocument:exportDocument});const button$1=ui.addCommand(l10n[lang].search_specref,show$1,"Ctrl+Shift+Alt+space","🔎"),specrefURL="https://specref.herokuapp.com/",refSearchURL=`${specrefURL}search-refs`,reveseLookupURL=`${specrefURL}reverse-lookup`,form=document.createElement("form"),renderer=hyperHTML$1.bind(form),resultList=hyperHTML$1.bind(document.createElement("div"));function renderResults(e,t,n){if(!e.size)return resultList`
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
=======
      </div>`;
    ui.freshModal(l10n[lang].save_snapshot, div, button);
  },
};

const supportsDownload = "download" in HTMLAnchorElement.prototype;
let button;
if (supportsDownload) {
  button = ui.addCommand(
    l10n[lang].save_snapshot,
    show,
    "Ctrl+Shift+Alt+S",
    "💾"
  );
}

function show() {
  if (!supportsDownload) return;
  saveDialog.show(button);
}

/**
 * @param {*} _
 * @param {string} mimeType
 */
function exportDocument(_, mimeType) {
  const msg =
    "Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed. " +
    "Use core/exporter `rsDocToDataURL()` instead.";
  pub("warn", msg);
  console.warn(msg);
  return rsDocToDataURL(mimeType);
}

var saveHtml = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$E,
  exportDocument: exportDocument
});

// @ts-check

const button$1 = ui.addCommand(
  l10n[lang].search_specref,
  show$1,
  "Ctrl+Shift+Alt+space",
  "🔎"
);
const specrefURL = "https://specref.herokuapp.com/";
const refSearchURL = `${specrefURL}search-refs`;
const reveseLookupURL = `${specrefURL}reverse-lookup`;
const form = document.createElement("form");
const renderer = hyperHTML$1.bind(form);
const resultList = hyperHTML$1.bind(document.createElement("div"));

form.id = "specref-ui";

/**
 * @param {Map<string, string>} resultMap
 * @param {string} query
 * @param {number} timeTaken
 */
function renderResults(resultMap, query, timeTaken) {
  if (!resultMap.size) {
    return resultList`
>>>>>>> Build
      <p class="state">
        Your search - <strong> ${query} </strong> -
        did not match any references.
      </p>
    `;
  }
  const wires = Array.from(resultMap)
    .slice(0, 99)
    .map(toDefinitionPair)
    .reduce((collector, pair) => collector.concat(pair), []);
  return resultList`
    <p class="result-stats">
      ${resultMap.size} results (${timeTaken} seconds).
      ${resultMap.size > 99 ? "First 100 results." : ""}
    </p>
    <dl class="specref-results">${wires}</dl>
  `;
}

function toDefinitionPair([key, entry]) {
  return hyperHTML$1.wire(entry)`
    <dt>
      [${key}]
    </dt>
    <dd>${wireReference(entry)}</dd>
  `;
}

function resultProcessor({ includeVersions = false } = {}) {
  return (...fetchedData) => {
    /** @type {{ [key: string]: any }} */
    const combinedResults = Object.assign({}, ...fetchedData);
    const results = new Map(Object.entries(combinedResults));
    // remove aliases
    Array.from(results)
      .filter(([, entry]) => entry.aliasOf)
      .map(([key]) => key)
      .reduce((results, key) => results.delete(key) && results, results);
    // Remove versions, if asked to
    if (!includeVersions) {
      Array.from(results.values())
        .filter(entry => typeof entry === "object" && "versions" in entry)
        .reduce(flatten, [])
        .forEach(version => {
          results.delete(version);
        });
    }
    // Remove legacy string entries
    Array.from(results)
      .filter(([, value]) => typeof value !== "object")
      .forEach(([key]) => results.delete(key));
    return results;
  };
}

form.addEventListener("submit", async ev => {
  ev.preventDefault();
  const { searchBox } = form;
  const query = searchBox.value;
  if (!query) {
    searchBox.focus();
    return;
  }
  render({ state: "Searching Specref…" });
  const refSearch = new URL(refSearchURL);
  refSearch.searchParams.set("q", query);
  const reverseLookup = new URL(reveseLookupURL);
  reverseLookup.searchParams.set("urls", query);
  try {
    const startTime = performance.now();
    const jsonData = await Promise.all([
      fetch(refSearch).then(response => response.json()),
      fetch(reverseLookup).then(response => response.json()),
    ]);
    const { checked: includeVersions } = form.includeVersions;
    const processResults = resultProcessor({ includeVersions });
    const results = processResults(...jsonData);
    render({
      query,
      results,
      state: "",
      timeTaken: Math.round(performance.now() - startTime) / 1000,
    });
  } catch (err) {
    console.error(err);
    render({ state: "Error! Couldn't do search." });
  } finally {
    searchBox.focus();
  }
});

function show$1() {
  render();
  ui.freshModal(l10n[lang].search_specref, form, button$1);
  /** @type {HTMLElement} */
  const input = form.querySelector("input[type=search]");
  input.focus();
}

const mast = hyperHTML$1.wire()`
  <header>
    <p>
      An Open-Source, Community-Maintained Database of
      Web Standards & Related References.
    </p>
  </header>
  <div class="searchcomponent">
    <input
      name="searchBox"
      type="search"
      autocomplete="off"
      placeholder="Keywords, titles, authors, urls…">
    <button
      type="submit">
        Search
    </button>
    <label>
      <input type="checkbox" name="includeVersions"> Include all versions.
    </label>
  </div>
`;

/**
 * @param {object} options
 * @param {string} [options.state]
 * @param {Map<string, string>} [options.results]
 * @param {number} [options.timeTaken]
 * @param {string} [options.query]
 */
function render({ state = "", results, timeTaken, query } = {}) {
  if (!results) {
    renderer`<div>${mast}</div>`;
    return;
  }
  renderer`
    <div>${mast}</div>
    <p class="state" hidden="${!state}">
      ${state}
    </p>
    <section hidden="${!results}">${
    results ? renderResults(results, query, timeTaken) : []
  }</section>
  `;
}

var searchSpecref = /*#__PURE__*/Object.freeze({
  __proto__: null
});

// @ts-check

const button$2 = ui.addCommand(
  l10n[lang].definition_list,
  show$2,
  "Ctrl+Shift+Alt+D",
  "📔"
);

const ul = document.createElement("ul");
ul.classList.add("respec-dfn-list");
const render$1 = hyperHTML$1.bind(ul);

ul.addEventListener("click", ev => {
  ui.closeModal();
  ev.stopPropagation();
});

function show$2() {
  const definitionLinks = Object.entries(definitionMap)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, [dfn]]) => {
      return hyperHTML$1.wire(dfn, ":li>a")`
        <li>
          <a href="${`#${dfn.id}`}">
            ${dfn.textContent}
          </a>
        </li>
      `;
    });
  render$1`${definitionLinks}`;
  ui.freshModal(l10n[lang].list_of_definitions, ul, button$2);
}

var dfnList = /*#__PURE__*/Object.freeze({
  __proto__: null
});

// @ts-check

// window.respecVersion is added at build time (see tools/builder.js)
window.respecVersion = window.respecVersion || "Developer Edition";
const div = document.createElement("div");
const render$2 = hyperHTML$1.bind(div);
const button$3 = ui.addCommand(
  `About ${window.respecVersion}`,
  show$3,
  "Ctrl+Shift+Alt+A",
  "ℹ️"
);

function show$3() {
  ui.freshModal(
    `${l10n[lang].about_respec} - ${window.respecVersion}`,
    div,
    button$3
  );
  const entries = [];
  if ("getEntriesByType" in performance) {
    performance
      .getEntriesByType("measure")
      .sort((a, b) => b.duration - a.duration)
      .map(({ name, duration }) => {
        const humanDuration =
          duration > 1000
            ? `${Math.round(duration / 1000.0)} second(s)`
            : `${duration.toFixed(2)} milliseconds`;
        return { name, duration: humanDuration };
      })
      .map(perfEntryToTR)
      .forEach(entry => {
        entries.push(entry);
      });
  }
  render$2`
  <p>
    ReSpec is a document production toolchain, with a notable focus on W3C specifications.
  </p>
  <p>
    <a href='https://github.com/w3c/respec/wiki'>Documentation</a>,
    <a href='https://github.com/w3c/respec/issues'>Bugs</a>.
  </p>
  <table border="1" width="100%" hidden="${entries.length ? false : true}">
    <caption>
      Loaded plugins
    </caption>
    <thead>
      <tr>
        <th>
          Plugin Name
        </th>
        <th>
          Processing time
        </th>
      </tr>
    </thead>
    <tbody>${entries}</tbody>
  </table>
<<<<<<< gh-pages
<<<<<<< gh-pages
`}function perfEntryToTR({name:e,duration:t}){return hyperHTML$1`
    <tr>
      <td><a href="${`https://github.com/w3c/respec/tree/develop/src/${e}.js`}">${e}</a></td>
      <td>${t}</td>
    </tr>
  `}var aboutRespec=Object.freeze({__proto__:null});const name$E="core/seo";function run$t(){const e=document.querySelector("#abstract p:first-of-type");if(!e)return;const t=e.textContent.replace(/\s+/," ").trim(),n=document.createElement("meta");n.name="description",n.content=t,document.head.appendChild(n)}var seo=Object.freeze({__proto__:null,name:name$E,run:run$t});const name$F="core/worker",hint={hint:"preload",href:"https://www.w3.org/Tools/respec/respec-highlight.js",as:"script"},link$1=createResourceHint(hint);async function loadWorkerScript(){try{return(await Promise.resolve().then((function(){return respecWorker$1}))).default}catch{return fetchBase("worker/respec-worker.js")}}async function createWorker(){const e=await loadWorkerScript(),t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Worker(t)}document.head.appendChild(link$1);const workerPromise=createWorker();expose(name$F,workerPromise.then(e=>({worker:e})));const name$G="core/highlight",nextMsgId=msgIdGenerator("highlight"),ghCssPromise=loadStyle$4();async function loadStyle$4(){try{return(await Promise.resolve().then((function(){return highlight$2}))).default}catch{return fetchAsset("highlight.css")}}function getLanguageHint(e){return Array.from(e).filter(e=>"highlight"!==e&&"nolinks"!==e).map(e=>e.toLowerCase())}async function highlightElement(e){e.setAttribute("aria-busy","true");const t=getLanguageHint(e.classList);let n;try{n=await sendHighlightRequest(e.innerText,t)}catch(e){return void console.error(e)}const{language:r,value:o}=n;switch(e.localName){case"pre":e.classList.remove(r),e.innerHTML=`<code class="hljs${r?` ${r}`:""}">${o}</code>`,e.classList.length||e.removeAttribute("class");break;case"code":e.innerHTML=o,e.classList.add("hljs"),r&&e.classList.add(r)}e.setAttribute("aria-busy","false")}async function sendHighlightRequest(e,t){const n={action:"highlight",code:e,id:nextMsgId(),languages:t},r=await workerPromise;return r.postMessage(n),new Promise((e,t)=>{const o=setTimeout(()=>{t(new Error("Timed out waiting for highlight."))},4e3);r.addEventListener("message",(function t(i){const{data:{id:s,language:a,value:l}}=i;s===n.id&&(r.removeEventListener("message",t),clearTimeout(o),e({language:a,value:l}))}))})}async function run$u(e){if(e.noHighlightCSS)return;const t=[...document.querySelectorAll("\n    pre:not(.idl):not(.nohighlight) > code:not(.nohighlight),\n    pre:not(.idl):not(.nohighlight),\n    code.highlight\n  ")].filter(e=>"pre"!==e.localName||!e.querySelector("code"));if(!t.length)return;const n=t.filter(e=>e.textContent.trim()).map(highlightElement),r=await ghCssPromise;document.head.appendChild(hyperHTML$1`
      <style>
        ${r}
      </style>
    `),await Promise.all(n)}var highlight=Object.freeze({__proto__:null,name:name$G,run:run$u});const localizationStrings$9={en:{missing_test_suite_uri:"Found tests in your spec, but missing '[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' in your ReSpec config.",tests:"tests",test:"test"}},l10n$c=getIntlData(localizationStrings$9),name$H="core/data-tests";function toListItem(e){const t=[],[n]=new URL(e).pathname.split("/").reverse(),r=n.split(".");let[o]=r;if(r.find(e=>"https"===e)){const e=document.createElement("span");e.textContent="🔒",e.setAttribute("aria-label","requires a secure connection"),e.setAttribute("title","Test requires HTTPS"),o=o.replace(".https",""),t.push(e)}if(o.split(".").join("-").split("-").find(e=>"manual"===e)){const e=document.createElement("span");e.textContent="💪",e.setAttribute("aria-label","the test must be run manually"),e.setAttribute("title","Manual test"),o=o.replace("-manual",""),t.push(e)}return hyperHTML$1`
    <li>
      <a href="${e}">
        ${o}
      </a> ${t}
    </li>
  `}function run$v(e){const t=[...document.querySelectorAll("[data-tests]")].filter(e=>e.dataset.tests);if(t.length)if(e.testSuiteURI)for(const n of t){const t=toTestURLs(n.dataset.tests.split(/,/gm).map(e=>e.trim()),e.testSuiteURI);handleDuplicates(t,n);const r=toHTML$1(t);n.append(r)}else pub("error",l10n$c.missing_test_suite_uri)}function toTestURLs(e,t){return e.map(e=>{try{return new URL(e,t).href}catch{pub("warn",`Bad URI: ${e}`)}}).filter(e=>e)}function handleDuplicates(e,t){const n=e.filter((e,t,n)=>n.indexOf(e)!==t);n.length&&showInlineWarning(t,"Duplicate tests found",`To fix, remove duplicates from "data-tests": ${n.map(e=>new URL(e).pathname).join(", ")}`)}function toHTML$1(e){const t=[...new Set(e)];return hyperHTML$1`
    <details class="respec-tests-details removeOnSave">
      <summary>
        tests: ${t.length}
      </summary>
      <ul>${t.map(toListItem)}</ul>
    </details>
  `}var dataTests=Object.freeze({__proto__:null,name:name$H,run:run$v});const name$I="core/list-sorter";function makeSorter(e){return({textContent:t},{textContent:n})=>"ascending"===e?t.localeCompare(n):n.localeCompare(t)}function sortListItems(e,t){return[...children(e,"li")].sort(makeSorter(t)).reduce((e,t)=>(e.appendChild(t),e),document.createDocumentFragment())}function sortDefinitionTerms(e,t){return[...children(e,"dt")].sort(makeSorter(t)).reduce((e,t)=>{const{nodeType:n,nodeName:r}=t,o=document.createDocumentFragment();let{nextSibling:i}=t;for(;i&&i.nextSibling;){o.appendChild(i.cloneNode(!0));const{nodeType:e,nodeName:t}=i.nextSibling;if(e===n&&t===r)break;i=i.nextSibling}return o.prepend(t.cloneNode(!0)),e.appendChild(o),e},document.createDocumentFragment())}function run$w(){const e=document.querySelectorAll("[data-sort]");for(const t of e){let e;const n=t.dataset.sort||"ascending";switch(t.localName){case"dl":e=sortDefinitionTerms(t,n);break;case"ol":case"ul":e=sortListItems(t,n);break;default:pub("warning",`ReSpec can't sort ${t.localName} elements.`)}if(e){const n=document.createRange();n.selectNodeContents(t),n.deleteContents(),t.appendChild(e)}}}var listSorter=Object.freeze({__proto__:null,name:name$I,sortListItems:sortListItems,sortDefinitionTerms:sortDefinitionTerms,run:run$w});const name$J="core/highlight-vars",hlVarsPromise=loadStyle$5();async function loadStyle$5(){try{return(await Promise.resolve().then((function(){return _var$1}))).default}catch{return fetchAsset("var.css")}}async function run$x(e){if(!e.highlightVars)return;const t=document.createElement("style");t.textContent=await hlVarsPromise,t.classList.add("removeOnSave"),document.head.appendChild(t),document.querySelectorAll("var").forEach(e=>e.addEventListener("click",highlightListener)),sub("beforesave",e=>{e.querySelectorAll("var.respec-hl").forEach(removeHighlight)})}function highlightListener(e){e.stopPropagation();const{target:t}=e,n=highlightVars(t),r=()=>{const e=getHighlightColor(t);n.forEach(t=>removeHighlight(t,e)),[...HL_COLORS.keys()].forEach(e=>HL_COLORS.set(e,!0))};n.length&&document.body.addEventListener("click",r,{once:!0})}const HL_COLORS=new Map([["respec-hl-c1",!0],["respec-hl-c2",!0],["respec-hl-c3",!0],["respec-hl-c4",!0],["respec-hl-c5",!0],["respec-hl-c6",!0],["respec-hl-c7",!0]]);function getHighlightColor(e){const{value:t}=e.classList,n=/respec-hl-\w+/,r=n.test(t)&&t.match(n);return r?r[0]:!0===HL_COLORS.get("respec-hl-c1")?"respec-hl-c1":[...HL_COLORS.keys()].find(e=>HL_COLORS.get(e))||"respec-hl-c1"}function highlightVars(e){const t=e.textContent.trim(),n=e.closest("section"),r=getHighlightColor(e),o=[...n.querySelectorAll("var")].filter(e=>e.textContent.trim()===t&&e.closest("section")===n),i=o[0].classList.contains("respec-hl");return HL_COLORS.set(r,i),i?(o.forEach(e=>removeHighlight(e,r)),[]):(o.forEach(e=>addHighlight(e,r)),o)}function removeHighlight(e,t){e.classList.remove("respec-hl",t),e.classList.length||e.removeAttribute("class")}function addHighlight(e,t){e.classList.add("respec-hl",t)}var highlightVars$1=Object.freeze({__proto__:null,name:name$J,run:run$x});const name$K="core/dfn-panel";async function run$y(){const e=await loadStyle$6();let t;document.head.insertBefore(hyperHTML$1`<style>${e}</style>`,document.querySelector("link")),document.body.addEventListener("click",e=>{const n=e.target;switch(deriveAction(n)){case"show":{t&&t.remove();const e=n.closest("dfn");t=createPanel(e),displayPanel(e,t);break}case"dock":t.classList.add("docked");break;case"hide":t.remove()}})}function deriveAction(e){const t=!!e.closest("a");if(e.closest("dfn"))return t?null:"show";if(e.closest("#dfn-panel")){if(t){return e.classList.contains("self-link")?"hide":"dock"}return e.closest("#dfn-panel").classList.contains("docked")?"hide":null}return document.getElementById("dfn-panel")?"hide":null}function createPanel(e){const{id:t}=e,n=`#${t}`,r=document.querySelectorAll(`a[href="${n}"]`);return hyperHTML$1`
    <aside class="dfn-panel" id="dfn-panel">
      <b><a class="self-link" href="${n}">Permalink</a></b>
      <b>Referenced in:</b>
      ${referencesToHTML(t,r)}
    </aside>
  `}function referencesToHTML(e,t){if(!t.length)return hyperHTML$1`<ul><li>Not referenced in this document.</li></ul>`;const n=new Map;t.forEach((t,r)=>{const o=t.id||`ref-for-${e}-${r+1}`;t.id||(t.id=o);const i=getReferenceTitle(t);(n.get(i)||n.set(i,[]).get(i)).push(o)});return hyperHTML$1`<ul>${[...n.entries()].map(e=>hyperHTML$1`<li>${(([e,t])=>[{title:e,id:t[0]}].concat(t.slice(1).map((e,t)=>({title:`(${t+2})`,id:e}))))(e).map(e=>hyperHTML$1`<a href="#${e.id}">${e.title}</a>${" "}`)}</li>`)}</ul>`}function getReferenceTitle(e){const t=e.closest("section");if(!t)return null;const n=t.querySelector("h1, h2, h3, h4, h5, h6");return n?norm(n.textContent):null}function displayPanel(e,t){document.body.appendChild(t);const n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),o=r.right-r.left;let i=window.scrollY+n.top,s=n.left+n.width+5;s+o>document.body.scrollWidth&&(s=n.left-(o+5),s<0&&(s=n.left,i+=n.height)),t.style.setProperty("--left",`${s}px`),t.style.setProperty("--top",`${i}px`)}async function loadStyle$6(){try{return(await Promise.resolve().then((function(){return dfnPanel$2}))).default}catch{return fetchAsset("dfn-panel.css")}}var dfnPanel=Object.freeze({__proto__:null,name:name$K,run:run$y});const name$L="core/algorithms",cssPromise$2=loadStyle$7();async function loadStyle$7(){try{return(await Promise.resolve().then((function(){return algorithms$2}))).default}catch{return fetchAsset("algorithms.css")}}async function run$z(){if(Array.from(document.querySelectorAll("ol.algorithm li")).filter(e=>e.textContent.trim().startsWith("Assert: ")).forEach(e=>e.classList.add("assert")),document.querySelector(".assert")){const e=document.createElement("style");e.textContent=await cssPromise$2,document.head.appendChild(e)}}var algorithms=Object.freeze({__proto__:null,name:name$L,run:run$z});const name$M="core/anchor-expander";function run$A(){const e=[...document.querySelectorAll("a[href^='#']:not(.self-link):not([href$='the-empty-string'])")].filter(e=>""===e.textContent.trim());for(const t of e){const e=t.getAttribute("href").slice(1),n=document.getElementById(e);if(n){switch(n.localName){case"h6":case"h5":case"h4":case"h3":case"h2":processHeading(n,t);break;case"section":processSection(n,e,t);break;case"figure":processFigure(n,e,t);break;case"aside":case"div":processBox(n,e,t);break;default:t.textContent=t.getAttribute("href"),showInlineError(t,"ReSpec doesn't support expanding this kind of reference.",`Can't expand "#${e}".`)}localize(n,t),t.normalize()}else{t.textContent=t.getAttribute("href"),showInlineError(t,`Couldn't expand inline reference. The id "${e}" is not in the document.`,`No matching id in document: ${e}.`)}}}function processBox(e,t,n){const r=e.querySelector(".marker .self-link");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching element "${t}", but it has no title or marker.`,"Missing title.")}const o=makeSafeCopy(r);n.append(...o.childNodes),n.classList.add("box-ref")}function processFigure(e,t,n){const r=e.querySelector("figcaption");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching figure "${t}", but figure is lacking a \`<figcaption>\`.`,"Missing figcaption in referenced figure.")}const o=[...makeSafeCopy(r).childNodes].filter(e=>!e.classList||!e.classList.contains("fig-title"));o.pop(),n.append(...o),n.classList.add("fig-ref");const i=r.querySelector(".fig-title");!n.hasAttribute("title")&&i&&(n.title=norm(i.textContent))}function processSection(e,t,n){const r=e.querySelector("h6, h5, h4, h3, h2");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,"Found matching section, but the section was lacking a heading element.",`No matching id in document: "${t}".`)}processHeading(r,n),localize(r,n)}function processHeading(e,t){const n=e.querySelector(".self-link"),r=[...makeSafeCopy(e).childNodes].filter(e=>!e.classList||!e.classList.contains("self-link"));t.append(...r),n&&t.prepend("§ "),t.classList.add("sec-ref")}function localize(e,t){for(const n of["dir","lang"]){if(t.hasAttribute(n))continue;const r=e.closest(`[${n}]`);if(!r)continue;const o=t.closest(`[${n}]`);o&&o.getAttribute(n)===r.getAttribute(n)||t.setAttribute(n,r.getAttribute(n))}}var anchorExpander=Object.freeze({__proto__:null,name:name$M,run:run$A}),ui$2='#respec-ui {\n  position: fixed;\n  display: flex;\n  flex-direction: row-reverse;\n  top: 20px;\n  right: 20px;\n  width: 202px;\n  text-align: right;\n  z-index: 9000;\n}\n\n#respec-pill,\n.respec-info-button {\n  background: #fff;\n  height: 2.5em;\n  color: rgb(120, 120, 120);\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n}\n\n.respec-info-button {\n  border: none;\n  opacity: 0.75;\n  border-radius: 2em;\n  margin-right: 1em;\n  min-width: 3.5em;\n}\n\n.respec-info-button:focus,\n.respec-info-button:hover {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#respec-pill:disabled {\n  font-size: 2.8px;\n  text-indent: -9999em;\n  border-top: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-right: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-bottom: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-left: 1.1em solid #ffffff;\n  transform: translateZ(0);\n  animation: respec-spin 0.5s infinite linear;\n  box-shadow: none;\n}\n\n#respec-pill:disabled,\n#respec-pill:disabled:after {\n  border-radius: 50%;\n  width: 10em;\n  height: 10em;\n}\n\n@keyframes respec-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.respec-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s linear;\n}\n\n.respec-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s linear;\n}\n\n#respec-pill:hover,\n#respec-pill:focus {\n  color: rgb(0, 0, 0);\n  background-color: rgb(245, 245, 245);\n  transition: color 0.2s;\n}\n\n#respec-menu {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background: #fff;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n  width: 200px;\n  display: none;\n  text-align: left;\n  margin-top: 32px;\n  font-size: 0.8em;\n}\n\n#respec-menu:not([hidden]) {\n  display: block;\n}\n\n#respec-menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.respec-save-buttons {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(47%, 2fr));\n  grid-gap: 0.5cm;\n  padding: 0.5cm;\n}\n\n.respec-save-button:link {\n  padding-top: 16px;\n  color: rgb(240, 240, 240);\n  background: rgb(42, 90, 168);\n  justify-self: stretch;\n  height: 1cm;\n  text-decoration: none;\n  text-align: center;\n  font-size: inherit;\n  border: none;\n  border-radius: 0.2cm;\n}\n\n.respec-save-button:link:hover {\n  color: white;\n  background: rgb(42, 90, 168);\n  padding: 0;\n  margin: 0;\n  border: 0;\n  padding-top: 16px;\n}\n\n#respec-ui button:focus,\n#respec-pill:focus,\n.respec-option:focus {\n  outline: 0;\n  outline-style: none;\n}\n\n#respec-pill-error {\n  background-color: red;\n  color: white;\n}\n\n#respec-pill-warning {\n  background-color: orange;\n  color: white;\n}\n\n.respec-warning-list,\n.respec-error-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-family: sans-serif;\n  background-color: rgb(255, 251, 230);\n  font-size: 0.85em;\n}\n\n.respec-warning-list > li,\n.respec-error-list > li {\n  padding: 0.4em 0.7em;\n}\n\n.respec-warning-list > li::before {\n  content: "⚠️";\n  padding-right: 0.5em;\n}\n.respec-warning-list p,\n.respec-error-list p {\n  padding: 0;\n  margin: 0;\n}\n\n.respec-warning-list li {\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 245, 194);\n}\n\n.respec-error-list,\n.respec-error-list li {\n  background-color: rgb(255, 240, 240);\n}\n\n.respec-error-list li::before {\n  content: "💥";\n  padding-right: 0.5em;\n}\n\n.respec-error-list li {\n  padding: 0.4em 0.7em;\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 215, 215);\n}\n\n.respec-error-list li > p {\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n}\n\n#respec-overlay {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%;\n  background: #000;\n}\n\n.respec-show-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0.5;\n}\n\n.respec-hide-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0;\n}\n\n.respec-modal {\n  display: block;\n  position: fixed;\n  z-index: 11000;\n  margin: auto;\n  top: 10%;\n  background: #fff;\n  border: 5px solid #666;\n  min-width: 20%;\n  width: 79%;\n  padding: 0;\n  max-height: 80%;\n  overflow-y: auto;\n  margin: 0 -0.5cm;\n}\n\n@media screen and (min-width: 78em) {\n  .respec-modal {\n    width: 62%;\n  }\n}\n\n.respec-modal h3 {\n  margin: 0;\n  padding: 0.2em;\n  text-align: center;\n  color: black;\n  background: linear-gradient(\n    to bottom,\n    rgba(238, 238, 238, 1) 0%,\n    rgba(238, 238, 238, 1) 50%,\n    rgba(204, 204, 204, 1) 100%\n  );\n  font-size: 1em;\n}\n\n.respec-modal .inside div p {\n  padding-left: 1cm;\n}\n\n#respec-menu button.respec-option {\n  background: white;\n  padding: 0 0.2cm;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: inherit;\n  padding: 1.2em 1.2em;\n}\n\n#respec-menu button.respec-option:hover,\n#respec-menu button:focus {\n  background-color: #eeeeee;\n}\n\n.respec-cmd-icon {\n  padding-right: 0.5em;\n}\n\n#respec-ui button.respec-option:last-child {\n  border: none;\n  border-radius: inherit;\n}\n\n.respec-button-copy-paste {\n  position: absolute;\n  height: 28px;\n  width: 40px;\n  cursor: pointer;\n  background-image: linear-gradient(#fcfcfc, #eee);\n  border: 1px solid rgb(144, 184, 222);\n  border-left: 0;\n  border-radius: 0px 0px 3px 0;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  top: 0;\n  left: 127px;\n}\n\n#specref-ui {\n  margin: 0 2%;\n  margin-bottom: 0.5cm;\n}\n\n#specref-ui header {\n  font-size: 0.7em;\n  background-color: #eee;\n  text-align: center;\n  padding: 0.2cm;\n  margin-bottom: 0.5cm;\n  border-radius: 0 0 0.2cm 0.2cm;\n}\n\n#specref-ui header h1 {\n  padding: 0;\n  margin: 0;\n  color: black;\n}\n\n#specref-ui p {\n  padding: 0;\n  margin: 0;\n  font-size: 0.8em;\n  text-align: center;\n}\n\n#specref-ui p.state {\n  margin: 1cm;\n}\n\n#specref-ui .searchcomponent {\n  font-size: 16px;\n  display: grid;\n  grid-template-columns: auto 2cm;\n}\n#specref-ui .searchcomponent:focus {\n}\n\n#specref-ui input,\n#specref-ui button {\n  border: 0;\n  padding: 6px 12px;\n}\n\n#specref-ui label {\n  font-size: 0.6em;\n  grid-column-end: 3;\n  text-align: right;\n  grid-column-start: 1;\n}\n\n#specref-ui input[type="search"] {\n  -webkit-appearance: none;\n  font-size: 16px;\n  border-radius: 0.1cm 0 0 0.1cm;\n  border: 1px solid rgb(204, 204, 204);\n}\n\n#specref-ui button[type="submit"] {\n  color: white;\n  border-radius: 0 0.1cm 0.1cm 0;\n  background-color: rgb(51, 122, 183);\n}\n\n#specref-ui button[type="submit"]:hover {\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n#specref-ui .result-stats {\n  margin: 0;\n  padding: 0;\n  color: rgb(128, 128, 128);\n  font-size: 0.7em;\n  font-weight: bold;\n}\n\n#specref-ui .specref-results {\n  font-size: 0.8em;\n}\n\n#specref-ui .specref-results dd + dt {\n  margin-top: 0.51cm;\n}\n\n#specref-ui .specref-results a {\n  text-transform: capitalize;\n}\n#specref-ui .specref-results .authors {\n  display: block;\n  color: #006621;\n}\n\n@media print {\n  #respec-ui {\n    display: none;\n  }\n}\n\n#xref-ui {\n  width: 100%;\n  min-height: 550px;\n  height: 100%;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n#xref-ui:not(.ready) {\n  background: url("https://respec.org/xref/loader.gif") no-repeat center;\n}\n',ui$3=Object.freeze({__proto__:null,default:ui$2}),respec='/*****************************************************************\n * ReSpec specific CSS\n *****************************************************************/\n@keyframes pop {\n  0% {\n    transform: scale(1, 1);\n  }\n  25% {\n    transform: scale(1.25, 1.25);\n    opacity: 0.75;\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n}\n\n/* Override code highlighter background */\n.hljs {\n  background: transparent !important;\n}\n\n/* --- INLINES --- */\nh1 abbr,\nh2 abbr,\nh3 abbr,\nh4 abbr,\nh5 abbr,\nh6 abbr,\na abbr {\n  border: none;\n}\n\ndfn {\n  font-weight: bold;\n}\n\na.internalDFN {\n  color: inherit;\n  border-bottom: 1px solid #99c;\n  text-decoration: none;\n}\n\na.externalDFN {\n  color: inherit;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\na.bibref {\n  text-decoration: none;\n}\n\n.respec-offending-element:target {\n  animation: pop 0.25s ease-in-out 0s 1;\n}\n\n.respec-offending-element,\na[href].respec-offending-element {\n  text-decoration: red wavy underline;\n}\n@supports not (text-decoration: red wavy underline) {\n  .respec-offending-element:not(pre) {\n    display: inline-block;\n  }\n  .respec-offending-element {\n    /* Red squiggly line */\n    background: url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=)\n      bottom repeat-x;\n  }\n}\n\n#references :target {\n  background: #eaf3ff;\n  animation: pop 0.4s ease-in-out 0s 1;\n}\n\ncite .bibref {\n  font-style: normal;\n}\n\ncode {\n  color: #c83500;\n}\n\nth code {\n  color: inherit;\n}\n\na[href].orcid {\n    padding-left: 4px;\n    padding-right: 4px;\n}\n\na[href].orcid > svg {\n    margin-bottom: -2px;\n}\n\n/* --- TOC --- */\n\n.toc a,\n.tof a {\n  text-decoration: none;\n}\n\na .secno,\na .figno {\n  color: #000;\n}\n\nul.tof,\nol.tof {\n  list-style: none outside none;\n}\n\n.caption {\n  margin-top: 0.5em;\n  font-style: italic;\n}\n\n/* --- TABLE --- */\n\ntable.simple {\n  border-spacing: 0;\n  border-collapse: collapse;\n  border-bottom: 3px solid #005a9c;\n}\n\n.simple th {\n  background: #005a9c;\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th a {\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th[scope="row"] {\n  background: inherit;\n  color: inherit;\n  border-top: 1px solid #ddd;\n}\n\n.simple td {\n  padding: 3px 10px;\n  border-top: 1px solid #ddd;\n}\n\n.simple tr:nth-child(even) {\n  background: #f0f6ff;\n}\n\n/* --- DL --- */\n\n.section dd > p:first-child {\n  margin-top: 0;\n}\n\n.section dd > p:last-child {\n  margin-bottom: 0;\n}\n\n.section dd {\n  margin-bottom: 1em;\n}\n\n.section dl.attrs dd,\n.section dl.eldef dd {\n  margin-bottom: 0;\n}\n\n#issue-summary > ul,\n.respec-dfn-list {\n  column-count: 2;\n}\n\n#issue-summary li,\n.respec-dfn-list li {\n  list-style: none;\n}\n\ndetails.respec-tests-details {\n  margin-left: 1em;\n  display: inline-block;\n  vertical-align: top;\n}\n\ndetails.respec-tests-details > * {\n  padding-right: 2em;\n}\n\ndetails.respec-tests-details[open] {\n  z-index: 999999;\n  position: absolute;\n  border: thin solid #cad3e2;\n  border-radius: 0.3em;\n  background-color: white;\n  padding-bottom: 0.5em;\n}\n\ndetails.respec-tests-details[open] > summary {\n  border-bottom: thin solid #cad3e2;\n  padding-left: 1em;\n  margin-bottom: 1em;\n  line-height: 2em;\n}\n\ndetails.respec-tests-details > ul {\n  width: 100%;\n  margin-top: -0.3em;\n}\n\ndetails.respec-tests-details > li {\n  padding-left: 1em;\n}\n\na[href].self-link:hover {\n  opacity: 1;\n  text-decoration: none;\n  background-color: transparent;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  position: relative;\n}\n\naside.example .marker > a.self-link {\n  color: inherit;\n}\n\nh2 > a.self-link,\nh3 > a.self-link,\nh4 > a.self-link,\nh5 > a.self-link,\nh6 > a.self-link {\n  border: none;\n  color: inherit;\n  font-size: 83%;\n  height: 2em;\n  left: -1.6em;\n  opacity: 0.5;\n  position: absolute;\n  text-align: center;\n  text-decoration: none;\n  top: 0;\n  transition: opacity 0.2s;\n  width: 2em;\n}\n\nh2 > a.self-link::before,\nh3 > a.self-link::before,\nh4 > a.self-link::before,\nh5 > a.self-link::before,\nh6 > a.self-link::before {\n  content: "§";\n  display: block;\n}\n\n@media (max-width: 767px) {\n  dd {\n    margin-left: 0;\n  }\n\n  /* Don\'t position self-link in headings off-screen */\n  h2 > a.self-link,\n  h3 > a.self-link,\n  h4 > a.self-link,\n  h5 > a.self-link,\n  h6 > a.self-link {\n    left: auto;\n    top: auto;\n  }\n}\n\n@media print {\n  .removeOnSave {\n    display: none;\n  }\n}\n',respec$1=Object.freeze({__proto__:null,default:respec}),examples$1="/* --- EXAMPLES --- */\nspan.example-title {\n    text-transform: none;\n}\naside.example, div.example, div.illegal-example {\n    padding: 0.5em;\n    margin: 1em 0;\n    position: relative;\n    clear: both;\n}\ndiv.illegal-example { color: red }\ndiv.illegal-example p { color: black }\naside.example, div.example {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n    border-color: #e0cb52;\n    background: #fcfaee;\n}\n\naside.example div.example {\n    border-left-width: .1em;\n    border-color: #999;\n    background: #fff;\n}\naside.example div.example span.example-title {\n    color: #999;\n}\n",examples$2=Object.freeze({__proto__:null,default:examples$1}),issuesNotes$1='/* --- ISSUES/NOTES --- */\n.issue-label {\n    text-transform: initial;\n}\n\n.warning > p:first-child { margin-top: 0 }\n.warning {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n}\nspan.warning { padding: .1em .5em .15em; }\n\n.issue.closed span.issue-number {\n    text-decoration: line-through;\n}\n\n.warning {\n    border-color: #f11;\n    border-width: .2em;\n    border-style: solid;\n    background: #fbe9e9;\n}\n\n.warning-title:before{\n    content: "⚠"; /*U+26A0 WARNING SIGN*/\n    font-size: 1.3em;\n    float: left;\n    padding-right: .3em;\n    margin-top: -0.3em;\n}\n\nli.task-list-item {\n    list-style: none;\n}\n\ninput.task-list-item-checkbox {\n    margin: 0 0.35em 0.25em -1.6em;\n    vertical-align: middle;\n}\n\n.issue a.respec-gh-label {\n  padding: 5px;\n  margin: 0 2px 0 2px;\n  font-size: 10px;\n  text-transform: none;\n  text-decoration: none;\n  font-weight: bold;\n  border-radius: 4px;\n  position: relative;\n  bottom: 2px;\n  border: none;\n  display: inline-block;\n}\n\n.issue a.respec-label-dark {\n  color: #fff;\n  background-color: #000;\n}\n\n.issue a.respec-label-light {\n  color: #000;\n  background-color: #fff;\n}\n',issuesNotes$2=Object.freeze({__proto__:null,default:issuesNotes$1}),respecWorker='// ReSpec Worker v1.0.0\n"use strict";\ntry {\n  importScripts("https://www.w3.org/Tools/respec/respec-highlight.js");\n} catch (err) {\n  console.error("Network error loading highlighter", err);\n}\n\nself.addEventListener("message", ({ data: originalData }) => {\n  const data = Object.assign({}, originalData);\n  switch (data.action) {\n    case "highlight-load-lang": {\n      const { langURL, propName, lang } = data;\n      importScripts(langURL);\n      self.hljs.registerLanguage(lang, self[propName]);\n      break;\n    }\n    case "highlight": {\n      const { code } = data;\n      const langs = data.languages.length ? data.languages : undefined;\n      try {\n        const { value, language } = self.hljs.highlightAuto(code, langs);\n        Object.assign(data, { value, language });\n      } catch (err) {\n        console.error("Could not transform some code?", err);\n        // Post back the original code\n        Object.assign(data, { value: code, language: "" });\n      }\n      break;\n    }\n  }\n  self.postMessage(data);\n});\n',respecWorker$1=Object.freeze({__proto__:null,default:respecWorker}),highlight$1="/*\nAtom One Light by Daniel Gamage\nOriginal One Light Syntax theme from https://github.com/atom/one-light-syntax\nbase:    #fafafa\nmono-1:  #383a42\nmono-2:  #686b77\nmono-3:  #a0a1a7\nhue-1:   #0184bb\nhue-2:   #4078f2\nhue-3:   #a626a4\nhue-4:   #50a14f\nhue-5:   #e45649\nhue-5-2: #c91243\nhue-6:   #986801\nhue-6-2: #c18401\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #383a42;\n  background: #fafafa;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #a0a1a7;\n  font-style: italic;\n}\n\n.hljs-doctag,\n.hljs-keyword,\n.hljs-formula {\n  color: #a626a4;\n}\n\n.hljs-section,\n.hljs-name,\n.hljs-selector-tag,\n.hljs-deletion,\n.hljs-subst {\n  color: #e45649;\n}\n\n.hljs-literal {\n  color: #0184bb;\n}\n\n.hljs-string,\n.hljs-regexp,\n.hljs-addition,\n.hljs-attribute,\n.hljs-meta-string {\n  color: #50a14f;\n}\n\n.hljs-built_in,\n.hljs-class .hljs-title {\n  color: #c18401;\n}\n\n.hljs-attr,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-type,\n.hljs-selector-class,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-number {\n  color: #986801;\n}\n\n.hljs-symbol,\n.hljs-bullet,\n.hljs-link,\n.hljs-meta,\n.hljs-selector-id,\n.hljs-title {\n  color: #4078f2;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n\n.hljs-link {\n  text-decoration: underline;\n}\n",highlight$2=Object.freeze({__proto__:null,default:highlight$1}),_var="var:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nvar.respec-hl {\n  color: var(--color, #000);\n  background-color: var(--bg-color);\n  box-shadow: 0 0 0px 2px var(--bg-color);\n}\n\n/* highlight colors\n  https://github.com/w3c/tr-design/issues/152\n*/\nvar.respec-hl-c1 {\n  --bg-color: #f4d200;\n}\n\nvar.respec-hl-c2 {\n  --bg-color: #ff87a2;\n}\n\nvar.respec-hl-c3 {\n  --bg-color: #96e885;\n}\n\nvar.respec-hl-c4 {\n  --bg-color: #3eeed2;\n}\n\nvar.respec-hl-c5 {\n  --bg-color: #eacfb6;\n}\n\nvar.respec-hl-c6 {\n  --bg-color: #82ddff;\n}\n\nvar.respec-hl-c7 {\n  --bg-color: #ffbcf2;\n}\n\n@media print {\n  var.respec-hl {\n    background: none;\n    color: #000;\n    box-shadow: unset;\n  }\n}\n",_var$1=Object.freeze({__proto__:null,default:_var}),dfnPanel$1="/* dfn popup panel that list all local references to a dfn */\ndfn {\n  cursor: pointer;\n}\n\n.dfn-panel {\n  position: absolute;\n  left: var(--left); /* set via JS */\n  top: var(--top); /* set via JS */\n  z-index: 35;\n  height: auto;\n  width: max-content;\n  max-width: 300px;\n  max-height: 500px;\n  overflow: auto;\n  padding: 0.5em 0.75em;\n  font: small Helvetica Neue, sans-serif, Droid Sans Fallback;\n  background: #dddddd;\n  color: black;\n  border: outset 0.2em;\n}\n\n.dfn-panel * {\n  margin: 0;\n}\n\n.dfn-panel > b {\n  display: block;\n}\n\n.dfn-panel ul a[href] {\n  color: black;\n}\n\n.dfn-panel a:not(:hover) {\n  text-decoration: none !important;\n  border-bottom: none !important;\n}\n\n.dfn-panel a[href]:hover {\n  border-bottom-width: 1px;\n}\n\n.dfn-panel > b + b {\n  margin-top: 0.25em;\n}\n\n.dfn-panel ul {\n  padding: 0;\n}\n\n.dfn-panel li {\n  list-style: inside;\n}\n\n.dfn-panel.docked {\n  display: inline-block;\n  position: fixed;\n  left: 0.5em;\n  top: unset;\n  bottom: 2em;\n  margin: 0 auto;\n  /* 0.75em from padding (x2), 0.5em from left position, 0.2em border (x2) */\n  max-width: calc(100vw - 0.75em * 2 - 0.5em - 0.2em * 2);\n  max-height: 30vh;\n}\n",dfnPanel$2=Object.freeze({__proto__:null,default:dfnPanel$1}),algorithms$1="/* For assertions in lists containing algorithms */\n\n.assert {\n    background: #EEE;\n    border-left: 0.5em solid #AAA;\n    padding: 0.3em;\n}\n",algorithms$2=Object.freeze({__proto__:null,default:algorithms$1});
=======
`}function perfEntryToTR({name:e,duration:t}){return hyperHTML$1.bind(document.createElement("tr"))`
=======
`;
}

function perfEntryToTR({ name, duration }) {
  const render = hyperHTML$1.bind(document.createElement("tr"));
  const moduleURL = `https://github.com/w3c/respec/tree/develop/src/${name}.js`;
  return render`
>>>>>>> Build
    <td>
      <a href="${moduleURL}">
        ${name}
      </a>
    </td>
    <td>
      ${duration}
    </td>
  `;
}

var aboutRespec = /*#__PURE__*/Object.freeze({
  __proto__: null
});

// @ts-check
/**
 * This Module adds a metatag description to the document, based on the
 * first paragraph of the abstract.
 */

const name$F = "core/seo";

function run$u() {
  // This is not critical, so let's continue other processing first
  (async () => {
    await document.respecIsReady;
    const firstParagraph = document.querySelector("#abstract p:first-of-type");
    if (!firstParagraph) {
      return; // no abstract, so nothing to do
    }
    insertMetaDescription(firstParagraph);
  })();
}

function insertMetaDescription(firstParagraph) {
  // Normalize whitespace: trim, remove new lines, tabs, etc.
  const doc = firstParagraph.ownerDocument;
  const content = firstParagraph.textContent.replace(/\s+/, " ").trim();
  const metaElem = doc.createElement("meta");
  metaElem.name = "description";
  metaElem.content = content;
  doc.head.appendChild(metaElem);
}

var seo = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$F,
  run: run$u
});

// @ts-check
/**
 * Module core/worker
 *
 * Exports a Web Worker for ReSpec, allowing for
 * multi-threaded processing of things.
 */
const name$G = "core/worker";
// Opportunistically preload syntax highlighter
const hint = {
  hint: "preload",
  href: "https://www.w3.org/Tools/respec/respec-highlight.js",
  as: "script",
};
const link$1 = createResourceHint(hint);
document.head.appendChild(link$1);

async function loadWorkerScript() {
  try {
    return (await Promise.resolve().then(function () { return respecWorker$1; })).default;
  } catch {
    return fetchBase("worker/respec-worker.js");
  }
}

async function createWorker() {
  const workerScript = await loadWorkerScript();
  const workerURL = URL.createObjectURL(
    new Blob([workerScript], { type: "application/javascript" })
  );
  return new Worker(workerURL);
}

const workerPromise = createWorker();

expose(
  name$G,
  workerPromise.then(worker => ({ worker }))
);

// @ts-check
const name$H = "core/highlight";

const nextMsgId = msgIdGenerator("highlight");

const ghCssPromise = loadStyle$4();

async function loadStyle$4() {
  try {
    return (await Promise.resolve().then(function () { return github$2; })).default;
  } catch {
    return fetchAsset("github.css");
  }
}

function getLanguageHint(classList) {
  return Array.from(classList)
    .filter(item => item !== "highlight" && item !== "nolinks")
    .map(item => item.toLowerCase());
}

async function highlightElement(elem) {
  elem.setAttribute("aria-busy", "true");
  const languages = getLanguageHint(elem.classList);
  let response;
  try {
    response = await sendHighlightRequest(elem.innerText, languages);
  } catch (err) {
    console.error(err);
    return;
  }
  const { language, value } = response;
  switch (elem.localName) {
    case "pre":
      elem.classList.remove(language);
      elem.innerHTML = `<code class="hljs${
        language ? ` ${language}` : ""
      }">${value}</code>`;
      if (!elem.classList.length) elem.removeAttribute("class");
      break;
    case "code":
      elem.innerHTML = value;
      elem.classList.add("hljs");
      if (language) elem.classList.add(language);
      break;
  }
  elem.setAttribute("aria-busy", "false");
}

async function sendHighlightRequest(code, languages) {
  const msg = {
    action: "highlight",
    code,
    id: nextMsgId(),
    languages,
  };
  const worker = await workerPromise;
  worker.postMessage(msg);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timed out waiting for highlight."));
    }, 4000);
    worker.addEventListener("message", function listener(ev) {
      const {
        data: { id, language, value },
      } = ev;
      if (id !== msg.id) return; // not for us!
      worker.removeEventListener("message", listener);
      clearTimeout(timeoutId);
      resolve({ language, value });
    });
  });
}

async function run$v(conf) {
  // Nothing to highlight
  if (conf.noHighlightCSS) return;
  const highlightables = [
    ...document.querySelectorAll(`
    pre:not(.idl):not(.nohighlight) > code:not(.nohighlight),
    pre:not(.idl):not(.nohighlight),
    code.highlight
  `),
  ].filter(
    // Filter pre's that contain code
    elem => elem.localName !== "pre" || !elem.querySelector("code")
  );
  // Nothing to highlight
  if (!highlightables.length) {
    return;
  }
  const promisesToHighlight = highlightables
    .filter(elem => elem.textContent.trim())
    .map(highlightElement);
  const ghCss = await ghCssPromise;
  document.head.appendChild(
    hyperHTML$1`
      <style>
        ${ghCss}
      </style>
    `
  );
  await Promise.all(promisesToHighlight);
}

var highlight = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$H,
  run: run$v
});

// @ts-check
const l10n$b = {
  en: {
    missing_test_suite_uri:
      "Found tests in your spec, but missing '" +
      "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' in your ReSpec config.",
    tests: "tests",
    test: "test",
  },
};

const name$I = "core/data-tests";

const lang$h = lang in l10n$b ? lang : "en";

function toListItem(href) {
  const emojiList = [];
  const [testFile] = new URL(href).pathname.split("/").reverse();
  const testParts = testFile.split(".");
  let [testFileName] = testParts;

  const isSecureTest = testParts.find(part => part === "https");
  if (isSecureTest) {
    const requiresConnectionEmoji = document.createElement("span");
    requiresConnectionEmoji.textContent = "🔒";
    requiresConnectionEmoji.setAttribute(
      "aria-label",
      "requires a secure connection"
    );
    requiresConnectionEmoji.setAttribute("title", "Test requires HTTPS");
    testFileName = testFileName.replace(".https", "");
    emojiList.push(requiresConnectionEmoji);
  }

  const isManualTest = testFileName
    .split(".")
    .join("-")
    .split("-")
    .find(part => part === "manual");
  if (isManualTest) {
    const manualPerformEmoji = document.createElement("span");
    manualPerformEmoji.textContent = "💪";
    manualPerformEmoji.setAttribute(
      "aria-label",
      "the test must be run manually"
    );
    manualPerformEmoji.setAttribute("title", "Manual test");
    testFileName = testFileName.replace("-manual", "");
    emojiList.push(manualPerformEmoji);
  }

  const testList = hyperHTML$1.bind(document.createElement("li"))`
    <a href="${href}">
      ${testFileName}
    </a> ${emojiList}
  `;
  return testList;
}

function run$w(conf) {
  /** @type {NodeListOf<HTMLElement>} */
  const testables = document.querySelectorAll("[data-tests]");
  if (!testables.length) {
    return;
  }
  if (!conf.testSuiteURI) {
    pub("error", l10n$b[lang$h].missing_test_suite_uri);
    return;
  }
  Array.from(testables)
    .filter(elem => elem.dataset.tests)
    // Render details + ul, returns HTMLDetailsElement
    .map(elem => {
      const details = document.createElement("details");
      const renderer = hyperHTML$1.bind(details);
      const testURLs = elem.dataset.tests
        .split(/,/gm)
        .map(url => url.trim())
        .map(url => {
          let href = "";
          try {
            href = new URL(url, conf.testSuiteURI).href;
          } catch {
            pub("warn", `${l10n$b[lang$h].bad_uri}: ${url}`);
          }
          return href;
        });
      const duplicates = testURLs.filter(
        (links, i, self) => self.indexOf(links) !== i
      );
      if (duplicates.length) {
        showInlineWarning(
          elem,
          `Duplicate tests found`,
          `To fix, remove duplicates from "data-tests": ${duplicates
            .map(url => new URL(url).pathname)
            .join(", ")}`
        );
      }
      details.classList.add("respec-tests-details", "removeOnSave");
      const uniqueList = [...new Set(testURLs)];
      renderer`
        <summary>
          tests: ${uniqueList.length}
        </summary>
<<<<<<< gh-pages
        <ul>${s.map(toListItem)}</ul>
      `,{elem:t,details:n}}).forEach(({elem:e,details:t})=>{delete e.dataset.tests,e.append(t)}):pub("error",l10n$b[lang$h].missing_test_suite_uri))}var dataTests=Object.freeze({__proto__:null,name:name$I,run:run$w});const name$J="core/list-sorter";function makeSorter(e){return({textContent:t},{textContent:n})=>"ascending"===e?t.localeCompare(n):n.localeCompare(t)}function sortListItems(e,t){return[...children(e,"li")].sort(makeSorter(t)).reduce((e,t)=>(e.appendChild(t),e),document.createDocumentFragment())}function sortDefinitionTerms(e,t){return[...children(e,"dt")].sort(makeSorter(t)).reduce((e,t)=>{const{nodeType:n,nodeName:r}=t,o=document.createDocumentFragment();let{nextSibling:i}=t;for(;i&&i.nextSibling;){o.appendChild(i.cloneNode(!0));const{nodeType:e,nodeName:t}=i.nextSibling;if(e===n&&t===r)break;i=i.nextSibling}return o.prepend(t.cloneNode(!0)),e.appendChild(o),e},document.createDocumentFragment())}function run$x(){const e=document.querySelectorAll("[data-sort]");for(const t of e){let e;const n=t.dataset.sort||"ascending";switch(t.localName){case"dl":e=sortDefinitionTerms(t,n);break;case"ol":case"ul":e=sortListItems(t,n);break;default:pub("warning",`ReSpec can't sort ${t.localName} elements.`)}if(e){const n=document.createRange();n.selectNodeContents(t),n.deleteContents(),t.appendChild(e)}}}var listSorter=Object.freeze({__proto__:null,name:name$J,sortListItems:sortListItems,sortDefinitionTerms:sortDefinitionTerms,run:run$x});const name$K="core/highlight-vars",hlVarsPromise=loadStyle$5();async function loadStyle$5(){try{return(await Promise.resolve().then((function(){return _var$1}))).default}catch{return fetchAsset("var.css")}}async function run$y(e){if(!e.highlightVars)return;const t=document.createElement("style");t.textContent=await hlVarsPromise,t.classList.add("removeOnSave"),document.head.appendChild(t),document.querySelectorAll("var").forEach(e=>e.addEventListener("click",highlightListener)),sub("beforesave",e=>{e.querySelectorAll("var.respec-hl").forEach(removeHighlight)})}function highlightListener(e){e.stopPropagation();const{target:t}=e,n=highlightVars(t),r=()=>{const e=getHighlightColor(t);n.forEach(t=>removeHighlight(t,e)),[...HL_COLORS.keys()].forEach(e=>HL_COLORS.set(e,!0))};n.length&&document.body.addEventListener("click",r,{once:!0})}const HL_COLORS=new Map([["respec-hl-c1",!0],["respec-hl-c2",!0],["respec-hl-c3",!0],["respec-hl-c4",!0],["respec-hl-c5",!0],["respec-hl-c6",!0],["respec-hl-c7",!0]]);function getHighlightColor(e){const{value:t}=e.classList,n=/respec-hl-\w+/,r=n.test(t)&&t.match(n);return r?r[0]:!0===HL_COLORS.get("respec-hl-c1")?"respec-hl-c1":[...HL_COLORS.keys()].find(e=>HL_COLORS.get(e))||"respec-hl-c1"}function highlightVars(e){const t=e.textContent.trim(),n=e.closest("section"),r=getHighlightColor(e),o=[...n.querySelectorAll("var")].filter(e=>e.textContent.trim()===t&&e.closest("section")===n),i=o[0].classList.contains("respec-hl");return HL_COLORS.set(r,i),i?(o.forEach(e=>removeHighlight(e,r)),[]):(o.forEach(e=>addHighlight(e,r)),o)}function removeHighlight(e,t){e.classList.remove("respec-hl",t),e.classList.length||e.removeAttribute("class")}function addHighlight(e,t){e.classList.add("respec-hl",t)}var highlightVars$1=Object.freeze({__proto__:null,name:name$K,run:run$y});const name$L="core/algorithms",cssPromise$2=loadStyle$6();async function loadStyle$6(){try{return(await Promise.resolve().then((function(){return algorithms$2}))).default}catch{return fetchAsset("algorithms.css")}}async function run$z(){if(Array.from(document.querySelectorAll("ol.algorithm li")).filter(e=>e.textContent.trim().startsWith("Assert: ")).forEach(e=>e.classList.add("assert")),document.querySelector(".assert")){const e=document.createElement("style");e.textContent=await cssPromise$2,document.head.appendChild(e)}}var algorithms=Object.freeze({__proto__:null,name:name$L,run:run$z});const name$M="core/anchor-expander";function run$A(){const e=[...document.querySelectorAll("a[href^='#']:not(.self-link):not([href$='the-empty-string'])")].filter(e=>""===e.textContent.trim());for(const t of e){const e=t.getAttribute("href").slice(1),n=document.getElementById(e);if(n){switch(n.localName){case"h6":case"h5":case"h4":case"h3":case"h2":processHeading(n,t);break;case"section":processSection(n,e,t);break;case"figure":processFigure(n,e,t);break;case"table":processTable(n,e,t);break;case"aside":case"div":processBox(n,e,t);break;default:t.textContent=t.getAttribute("href"),showInlineError(t,"ReSpec doesn't support expanding this kind of reference.",`Can't expand "#${e}".`)}localize(n,t),t.normalize()}else{t.textContent=t.getAttribute("href"),showInlineError(t,`Couldn't expand inline reference. The id "${e}" is not in the document.`,`No matching id in document: ${e}.`)}}}function processBox(e,t,n){const r=e.querySelector(".marker .self-link");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching element "${t}", but it has no title or marker.`,"Missing title.")}const o=makeSafeCopy(r);n.append(...o.childNodes),n.classList.add("box-ref")}function processFigure(e,t,n){const r=e.querySelector("figcaption"),o=!e.classList||(e.classList.contains("equation")?"eqn":"fig");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching figure "${t}", but figure is lacking a \`<figcaption>\`.`,"Missing figcaption in referenced figure.")}const i=[...makeSafeCopy(r).childNodes].filter(e=>!e.classList||!e.classList.contains(`${o}-title`));i.pop(),n.append(...i),n.classList.add(`${o}-ref`);const s=r.querySelector(`.${o}-title`);!n.hasAttribute("title")&&s&&(n.title=norm(s.textContent))}function processTable(e,t,n){const r=e.querySelector("caption");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching table "${t}", but table is lacking a \`<caption>\`.`,"Missing caption in referenced table.")}const o=[...makeSafeCopy(r).childNodes].filter(e=>!e.classList||!e.classList.contains("tbl-title"));o.pop(),n.append(...o),n.classList.add("tbl-ref");const i=r.querySelector(".tbl-title");!n.hasAttribute("title")&&i&&(n.title=norm(i.textContent))}function processSection(e,t,n){const r=e.querySelector("h6, h5, h4, h3, h2");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,"Found matching section, but the section was lacking a heading element.",`No matching id in document: "${t}".`)}processHeading(r,n),localize(r,n)}function processHeading(e,t){const n=e.querySelector(".self-link"),r=[...makeSafeCopy(e).childNodes].filter(e=>!e.classList||!e.classList.contains("self-link"));t.append(...r),n&&t.prepend("§ "),t.classList.add("sec-ref")}function localize(e,t){for(const n of["dir","lang"]){if(t.hasAttribute(n))continue;const r=e.closest(`[${n}]`);if(!r)continue;const o=t.closest(`[${n}]`);o&&o.getAttribute(n)===r.getAttribute(n)||t.setAttribute(n,r.getAttribute(n))}}var anchorExpander=Object.freeze({__proto__:null,name:name$M,run:run$A}),ui$2='#respec-ui {\n  position: fixed;\n  display: flex;\n  flex-direction: row-reverse;\n  top: 20px;\n  right: 20px;\n  width: 202px;\n  text-align: right;\n  z-index: 9000;\n}\n\n#respec-pill,\n.respec-info-button {\n  background: #fff;\n  height: 2.5em;\n  color: rgb(120, 120, 120);\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n}\n\n.respec-info-button {\n  border: none;\n  opacity: 0.75;\n  border-radius: 2em;\n  margin-right: 1em;\n  min-width: 3.5em;\n}\n\n.respec-info-button:focus,\n.respec-info-button:hover {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#respec-pill:disabled {\n  font-size: 2.8px;\n  text-indent: -9999em;\n  border-top: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-right: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-bottom: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-left: 1.1em solid #ffffff;\n  transform: translateZ(0);\n  animation: respec-spin 0.5s infinite linear;\n  box-shadow: none;\n}\n\n#respec-pill:disabled,\n#respec-pill:disabled:after {\n  border-radius: 50%;\n  width: 10em;\n  height: 10em;\n}\n\n@keyframes respec-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.respec-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s linear;\n}\n\n.respec-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s linear;\n}\n\n#respec-pill:hover,\n#respec-pill:focus {\n  color: rgb(0, 0, 0);\n  background-color: rgb(245, 245, 245);\n  transition: color 0.2s;\n}\n\n#respec-menu {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background: #fff;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n  width: 200px;\n  display: none;\n  text-align: left;\n  margin-top: 32px;\n  font-size: 0.8em;\n}\n\n#respec-menu:not([hidden]) {\n  display: block;\n}\n\n#respec-menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.respec-save-buttons {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(47%, 2fr));\n  grid-gap: 0.5cm;\n  padding: 0.5cm;\n}\n\n.respec-save-button:link {\n  padding-top: 16px;\n  color: rgb(240, 240, 240);\n  background: rgb(42, 90, 168);\n  justify-self: stretch;\n  height: 1cm;\n  text-decoration: none;\n  text-align: center;\n  font-size: inherit;\n  border: none;\n  border-radius: 0.2cm;\n}\n\n.respec-save-button:link:hover {\n  color: white;\n  background: rgb(42, 90, 168);\n  padding: 0;\n  margin: 0;\n  border: 0;\n  padding-top: 16px;\n}\n\n#respec-ui button:focus,\n#respec-pill:focus,\n.respec-option:focus {\n  outline: 0;\n  outline-style: none;\n}\n\n#respec-pill-error {\n  background-color: red;\n  color: white;\n}\n\n#respec-pill-warning {\n  background-color: orange;\n  color: white;\n}\n\n.respec-warning-list,\n.respec-error-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-family: sans-serif;\n  background-color: rgb(255, 251, 230);\n  font-size: 0.85em;\n}\n\n.respec-warning-list > li,\n.respec-error-list > li {\n  padding: 0.4em 0.7em;\n}\n\n.respec-warning-list > li::before {\n  content: "⚠️";\n  padding-right: 0.5em;\n}\n.respec-warning-list p,\n.respec-error-list p {\n  padding: 0;\n  margin: 0;\n}\n\n.respec-warning-list li {\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 245, 194);\n}\n\n.respec-error-list,\n.respec-error-list li {\n  background-color: rgb(255, 240, 240);\n}\n\n.respec-error-list li::before {\n  content: "💥";\n  padding-right: 0.5em;\n}\n\n.respec-error-list li {\n  padding: 0.4em 0.7em;\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 215, 215);\n}\n\n.respec-error-list li > p {\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n}\n\n#respec-overlay {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%;\n  background: #000;\n}\n\n.respec-show-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0.5;\n}\n\n.respec-hide-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0;\n}\n\n.respec-modal {\n  display: block;\n  position: fixed;\n  z-index: 11000;\n  margin: auto;\n  top: 10%;\n  background: #fff;\n  border: 5px solid #666;\n  min-width: 20%;\n  width: 79%;\n  padding: 0;\n  max-height: 80%;\n  overflow-y: auto;\n  margin: 0 -0.5cm;\n}\n\n@media screen and (min-width: 78em) {\n  .respec-modal {\n    width: 62%;\n  }\n}\n\n.respec-modal h3 {\n  margin: 0;\n  padding: 0.2em;\n  text-align: center;\n  color: black;\n  background: linear-gradient(\n    to bottom,\n    rgba(238, 238, 238, 1) 0%,\n    rgba(238, 238, 238, 1) 50%,\n    rgba(204, 204, 204, 1) 100%\n  );\n  font-size: 1em;\n}\n\n.respec-modal .inside div p {\n  padding-left: 1cm;\n}\n\n#respec-menu button.respec-option {\n  background: white;\n  padding: 0 0.2cm;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: inherit;\n  padding: 1.2em 1.2em;\n}\n\n#respec-menu button.respec-option:hover,\n#respec-menu button:focus {\n  background-color: #eeeeee;\n}\n\n.respec-cmd-icon {\n  padding-right: 0.5em;\n}\n\n#respec-ui button.respec-option:last-child {\n  border: none;\n  border-radius: inherit;\n}\n\n.respec-button-copy-paste {\n  position: absolute;\n  height: 28px;\n  width: 40px;\n  cursor: pointer;\n  background-image: linear-gradient(#fcfcfc, #eee);\n  border: 1px solid rgb(144, 184, 222);\n  border-left: 0;\n  border-radius: 0px 0px 3px 0;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  top: 0;\n  left: 127px;\n}\n\n#specref-ui {\n  margin: 0 2%;\n  margin-bottom: 0.5cm;\n}\n\n#specref-ui header {\n  font-size: 0.7em;\n  background-color: #eee;\n  text-align: center;\n  padding: 0.2cm;\n  margin-bottom: 0.5cm;\n  border-radius: 0 0 0.2cm 0.2cm;\n}\n\n#specref-ui header h1 {\n  padding: 0;\n  margin: 0;\n  color: black;\n}\n\n#specref-ui p {\n  padding: 0;\n  margin: 0;\n  font-size: 0.8em;\n  text-align: center;\n}\n\n#specref-ui p.state {\n  margin: 1cm;\n}\n\n#specref-ui .searchcomponent {\n  font-size: 16px;\n  display: grid;\n  grid-template-columns: auto 2cm;\n}\n#specref-ui .searchcomponent:focus {\n}\n\n#specref-ui input,\n#specref-ui button {\n  border: 0;\n  padding: 6px 12px;\n}\n\n#specref-ui label {\n  font-size: 0.6em;\n  grid-column-end: 3;\n  text-align: right;\n  grid-column-start: 1;\n}\n\n#specref-ui input[type="search"] {\n  -webkit-appearance: none;\n  font-size: 16px;\n  border-radius: 0.1cm 0 0 0.1cm;\n  border: 1px solid rgb(204, 204, 204);\n}\n\n#specref-ui button[type="submit"] {\n  color: white;\n  border-radius: 0 0.1cm 0.1cm 0;\n  background-color: rgb(51, 122, 183);\n}\n\n#specref-ui button[type="submit"]:hover {\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n#specref-ui .result-stats {\n  margin: 0;\n  padding: 0;\n  color: rgb(128, 128, 128);\n  font-size: 0.7em;\n  font-weight: bold;\n}\n\n#specref-ui .specref-results {\n  font-size: 0.8em;\n}\n\n#specref-ui .specref-results dd + dt {\n  margin-top: 0.51cm;\n}\n\n#specref-ui .specref-results a {\n  text-transform: capitalize;\n}\n#specref-ui .specref-results .authors {\n  display: block;\n  color: #006621;\n}\n\n@media print {\n  #respec-ui {\n    display: none;\n  }\n}\n\n#xref-ui {\n  width: 100%;\n  min-height: 550px;\n  height: 100%;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n#xref-ui:not(.ready) {\n  background: url("https://respec.org/xref/loader.gif") no-repeat center;\n}\n',ui$3=Object.freeze({__proto__:null,default:ui$2}),respec2='/*****************************************************************\n * ReSpec 3 CSS\n * Robin Berjon - http://berjon.com/\n *****************************************************************/\n\n@keyframes pop {\n  0% {\n    transform: scale(1, 1);\n  }\n  25% {\n    transform: scale(1.25, 1.25);\n    opacity: 0.75;\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n}\n\n/* Override code highlighter background */\n.hljs {\n  background: transparent !important;\n}\n\n/* --- INLINES --- */\nh1 abbr,\nh2 abbr,\nh3 abbr,\nh4 abbr,\nh5 abbr,\nh6 abbr,\na abbr {\n  border: none;\n}\n\ndfn {\n  font-weight: bold;\n}\n\na.internalDFN {\n  color: inherit;\n  border-bottom: 1px solid #99c;\n  text-decoration: none;\n}\n\na.externalDFN {\n  color: inherit;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\na.bibref {\n  text-decoration: none;\n}\n\n.respec-offending-element:target {\n  animation: pop 0.25s ease-in-out 0s 1;\n}\n\n.respec-offending-element,\na[href].respec-offending-element {\n  text-decoration: red wavy underline;\n}\n@supports not (text-decoration: red wavy underline) {\n  .respec-offending-element:not(pre) {\n    display: inline-block;\n  }\n  .respec-offending-element {\n    /* Red squiggly line */\n    background: url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=)\n      bottom repeat-x;\n  }\n}\n\n#references :target {\n  background: #eaf3ff;\n  animation: pop 0.4s ease-in-out 0s 1;\n}\n\ncite .bibref {\n  font-style: normal;\n}\n\ncode {\n  color: #c83500;\n}\n\nth code {\n  color: inherit;\n}\n\na[href].orcid {\n    padding-left: 4px;\n    padding-right: 4px;\n}\n\na[href].orcid > svg {\n    margin-bottom: -2px;\n}\n\n/* --- TOC --- */\n\n.toc a,\n.tof a {\n  text-decoration: none;\n}\n\na .secno,\na .figno {\n  color: #000;\n}\n\nul.tof,\nol.tof {\n  list-style: none outside none;\n}\n\n.caption {\n  margin-top: 0.5em;\n  font-style: italic;\n}\n\n/* --- TABLE --- */\n\ntable.simple {\n  border-spacing: 0;\n  border-collapse: collapse;\n  border-bottom: 3px solid #005a9c;\n}\n\n.simple th {\n  background: #005a9c;\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th a {\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th[scope="row"] {\n  background: inherit;\n  color: inherit;\n  border-top: 1px solid #ddd;\n}\n\n.simple td {\n  padding: 3px 10px;\n  border-top: 1px solid #ddd;\n}\n\n.simple tr:nth-child(even) {\n  background: #f0f6ff;\n}\n\n/* --- DL --- */\n\n.section dd > p:first-child {\n  margin-top: 0;\n}\n\n.section dd > p:last-child {\n  margin-bottom: 0;\n}\n\n.section dd {\n  margin-bottom: 1em;\n}\n\n.section dl.attrs dd,\n.section dl.eldef dd {\n  margin-bottom: 0;\n}\n\n#issue-summary > ul,\n.respec-dfn-list {\n  column-count: 2;\n}\n\n#issue-summary li,\n.respec-dfn-list li {\n  list-style: none;\n}\n\ndetails.respec-tests-details {\n  margin-left: 1em;\n  display: inline-block;\n  vertical-align: top;\n}\n\ndetails.respec-tests-details > * {\n  padding-right: 2em;\n}\n\ndetails.respec-tests-details[open] {\n  z-index: 999999;\n  position: absolute;\n  border: thin solid #cad3e2;\n  border-radius: 0.3em;\n  background-color: white;\n  padding-bottom: 0.5em;\n}\n\ndetails.respec-tests-details[open] > summary {\n  border-bottom: thin solid #cad3e2;\n  padding-left: 1em;\n  margin-bottom: 1em;\n  line-height: 2em;\n}\n\ndetails.respec-tests-details > ul {\n  width: 100%;\n  margin-top: -0.3em;\n}\n\ndetails.respec-tests-details > li {\n  padding-left: 1em;\n}\n\na[href].self-link:hover {\n  opacity: 1;\n  text-decoration: none;\n  background-color: transparent;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  position: relative;\n}\n\naside.example .marker > a.self-link {\n  color: inherit;\n}\n\nh2 > a.self-link,\nh3 > a.self-link,\nh4 > a.self-link,\nh5 > a.self-link,\nh6 > a.self-link {\n  border: none;\n  color: inherit;\n  font-size: 83%;\n  height: 2em;\n  left: -1.6em;\n  opacity: 0.5;\n  position: absolute;\n  text-align: center;\n  text-decoration: none;\n  top: 0;\n  transition: opacity 0.2s;\n  width: 2em;\n}\n\nh2 > a.self-link::before,\nh3 > a.self-link::before,\nh4 > a.self-link::before,\nh5 > a.self-link::before,\nh6 > a.self-link::before {\n  content: "§";\n  display: block;\n}\n\n@media (max-width: 767px) {\n  dd {\n    margin-left: 0;\n  }\n\n  /* Don\'t position self-link in headings off-screen */\n  h2 > a.self-link,\n  h3 > a.self-link,\n  h4 > a.self-link,\n  h5 > a.self-link,\n  h6 > a.self-link {\n    left: auto;\n    top: auto;\n  }\n}\n\n@media print {\n  .removeOnSave {\n    display: none;\n  }\n}\n',respec2$1=Object.freeze({__proto__:null,default:respec2}),examples$1="/* --- EXAMPLES --- */\nspan.example-title {\n    text-transform: none;\n}\naside.example, div.example, div.illegal-example {\n    padding: 0.5em;\n    margin: 1em 0;\n    position: relative;\n    clear: both;\n}\ndiv.illegal-example { color: red }\ndiv.illegal-example p { color: black }\naside.example, div.example {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n    border-color: #e0cb52;\n    background: #fcfaee;\n}\n\naside.example div.example {\n    border-left-width: .1em;\n    border-color: #999;\n    background: #fff;\n}\naside.example div.example span.example-title {\n    color: #999;\n}\n",examples$2=Object.freeze({__proto__:null,default:examples$1}),issuesNotes$1='/* --- ISSUES/NOTES --- */\n.issue-label {\n    text-transform: initial;\n}\n\n.warning > p:first-child { margin-top: 0 }\n.warning {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n}\nspan.warning { padding: .1em .5em .15em; }\n\n.issue.closed span.issue-number {\n    text-decoration: line-through;\n}\n\n.warning {\n    border-color: #f11;\n    border-width: .2em;\n    border-style: solid;\n    background: #fbe9e9;\n}\n\n.warning-title:before{\n    content: "⚠"; /*U+26A0 WARNING SIGN*/\n    font-size: 1.3em;\n    float: left;\n    padding-right: .3em;\n    margin-top: -0.3em;\n}\n\nli.task-list-item {\n    list-style: none;\n}\n\ninput.task-list-item-checkbox {\n    margin: 0 0.35em 0.25em -1.6em;\n    vertical-align: middle;\n}\n\n.issue a.respec-gh-label {\n  padding: 5px;\n  margin: 0 2px 0 2px;\n  font-size: 10px;\n  text-transform: none;\n  text-decoration: none;\n  font-weight: bold;\n  border-radius: 4px;\n  position: relative;\n  bottom: 2px;\n  border: none;\n}\n\n.issue a.respec-label-dark {\n  color: #fff;\n  background-color: #000;\n}\n\n.issue a.respec-label-light {\n  color: #000;\n  background-color: #fff;\n}\n',issuesNotes$2=Object.freeze({__proto__:null,default:issuesNotes$1}),respecWorker='// ReSpec Worker v1.0.0\n"use strict";\ntry {\n  importScripts("https://www.w3.org/Tools/respec/respec-highlight.js");\n} catch (err) {\n  console.error("Network error loading highlighter", err);\n}\n\nself.addEventListener("message", ({ data: originalData }) => {\n  const data = Object.assign({}, originalData);\n  switch (data.action) {\n    case "highlight-load-lang": {\n      const { langURL, propName, lang } = data;\n      importScripts(langURL);\n      self.hljs.registerLanguage(lang, self[propName]);\n      break;\n    }\n    case "highlight": {\n      const { code } = data;\n      const langs = data.languages.length ? data.languages : undefined;\n      try {\n        const { value, language } = self.hljs.highlightAuto(code, langs);\n        Object.assign(data, { value, language });\n      } catch (err) {\n        console.error("Could not transform some code?", err);\n        // Post back the original code\n        Object.assign(data, { value: code, language: "" });\n      }\n      break;\n    }\n  }\n  self.postMessage(data);\n});\n',respecWorker$1=Object.freeze({__proto__:null,default:respecWorker}),github$1="/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #998;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-subst {\n  color: #333;\n  font-weight: bold;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag .hljs-attr {\n  color: #008080;\n}\n\n.hljs-string,\n.hljs-doctag {\n  color: #d14;\n}\n\n.hljs-title,\n.hljs-section,\n.hljs-selector-id {\n  color: #900;\n  font-weight: bold;\n}\n\n.hljs-subst {\n  font-weight: normal;\n}\n\n.hljs-type,\n.hljs-class .hljs-title {\n  color: #458;\n  font-weight: bold;\n}\n\n.hljs-tag,\n.hljs-name,\n.hljs-attribute {\n  color: #000080;\n  font-weight: normal;\n}\n\n.hljs-regexp,\n.hljs-link {\n  color: #009926;\n}\n\n.hljs-symbol,\n.hljs-bullet {\n  color: #990073;\n}\n\n.hljs-built_in,\n.hljs-builtin-name {\n  color: #0086b3;\n}\n\n.hljs-meta {\n  color: #999;\n  font-weight: bold;\n}\n\n.hljs-deletion {\n  background: #fdd;\n}\n\n.hljs-addition {\n  background: #dfd;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n",github$2=Object.freeze({__proto__:null,default:github$1}),_var="var:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nvar.respec-hl {\n  color: var(--color, #000);\n  background-color: var(--bg-color);\n  box-shadow: 0 0 0px 2px var(--bg-color);\n}\n\n/* highlight colors\n  https://github.com/w3c/tr-design/issues/152\n*/\nvar.respec-hl-c1 {\n  --bg-color: #f4d200;\n}\n\nvar.respec-hl-c2 {\n  --bg-color: #ff87a2;\n}\n\nvar.respec-hl-c3 {\n  --bg-color: #96e885;\n}\n\nvar.respec-hl-c4 {\n  --bg-color: #3eeed2;\n}\n\nvar.respec-hl-c5 {\n  --bg-color: #eacfb6;\n}\n\nvar.respec-hl-c6 {\n  --bg-color: #82ddff;\n}\n\nvar.respec-hl-c7 {\n  --bg-color: #ffbcf2;\n}\n\n@media print {\n  var.respec-hl {\n    background: none;\n    color: #000;\n    box-shadow: unset;\n  }\n}\n",_var$1=Object.freeze({__proto__:null,default:_var}),algorithms$1="/* For assertions in lists containing algorithms */\n\n.assert {\n    background: #EEE;\n    border-left: 0.5em solid #AAA;\n    padding: 0.3em;\n}\n",algorithms$2=Object.freeze({__proto__:null,default:algorithms$1});
>>>>>>> Working snapshot of pcisig changes. TODO: Split them out into individual pull requests to w3c:develop.
=======
        <ul>${uniqueList.map(toListItem)}</ul>
      `;
      return { elem, details };
    })
    .forEach(({ elem, details }) => {
      delete elem.dataset.tests;
      elem.append(details);
    });
}

var dataTests = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$I,
  run: run$w
});

// @ts-check
const name$J = "core/list-sorter";

function makeSorter(direction) {
  return ({ textContent: a }, { textContent: b }) => {
    return direction === "ascending" ? a.localeCompare(b) : b.localeCompare(a);
  };
}
/**
 * Shallow sort list items in OL, and UL elements.
 *
 * @param {HTMLUListElement} elem
 * @returns {DocumentFragment}
 */
function sortListItems(elem, dir) {
  const elements = [...children(elem, "li")];
  const sortedElements = elements.sort(makeSorter(dir)).reduce((frag, elem) => {
    frag.appendChild(elem);
    return frag;
  }, document.createDocumentFragment());
  return sortedElements;
}

/**
 * Shallow sort a definition list based on its definition terms (dt) elements.
 *
 * @param {HTMLDListElement} dl
 * @returns {DocumentFragment}
 */
function sortDefinitionTerms(dl, dir) {
  const elements = [...children(dl, "dt")];
  const sortedElements = elements.sort(makeSorter(dir)).reduce((frag, elem) => {
    const { nodeType, nodeName } = elem;
    const children = document.createDocumentFragment();
    let { nextSibling: next } = elem;
    while (next) {
      if (!next.nextSibling) {
        break;
      }
      children.appendChild(next.cloneNode(true));
      const { nodeType: nextType, nodeName: nextName } = next.nextSibling;
      const isSameType = nextType === nodeType && nextName === nodeName;
      if (isSameType) {
        break;
      }
      next = next.nextSibling;
    }
    children.prepend(elem.cloneNode(true));
    frag.appendChild(children);
    return frag;
  }, document.createDocumentFragment());
  return sortedElements;
}

function run$x() {
  /** @type {NodeListOf<HTMLElement>} */
  const sortables = document.querySelectorAll("[data-sort]");
  for (const elem of sortables) {
    let sortedElems;
    const dir = elem.dataset.sort || "ascending";
    switch (elem.localName) {
      case "dl": {
        const definition = /** @type {HTMLDListElement} */ (elem);
        sortedElems = sortDefinitionTerms(definition, dir);
        break;
      }
      case "ol":
      case "ul": {
        const list = /** @type {HTMLUListElement} */ (elem);
        sortedElems = sortListItems(list, dir);
        break;
      }
      default:
        pub("warning", `ReSpec can't sort ${elem.localName} elements.`);
    }
    if (sortedElems) {
      const range = document.createRange();
      range.selectNodeContents(elem);
      range.deleteContents();
      elem.appendChild(sortedElems);
    }
  }
}

var listSorter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$J,
  sortListItems: sortListItems,
  sortDefinitionTerms: sortDefinitionTerms,
  run: run$x
});

// @ts-check

const name$K = "core/highlight-vars";

const hlVarsPromise = loadStyle$5();

async function loadStyle$5() {
  try {
    return (await Promise.resolve().then(function () { return _var$1; })).default;
  } catch {
    return fetchAsset("var.css");
  }
}

async function run$y(conf) {
  if (!conf.highlightVars) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.textContent = await hlVarsPromise;
  styleElement.classList.add("removeOnSave");
  document.head.appendChild(styleElement);

  document
    .querySelectorAll("var")
    .forEach(varElem => varElem.addEventListener("click", highlightListener));

  // remove highlights, cleanup empty class/style attributes
  sub("beforesave", outputDoc => {
    outputDoc.querySelectorAll("var.respec-hl").forEach(removeHighlight);
  });
}

function highlightListener(ev) {
  ev.stopPropagation();
  const { target: varElem } = ev;
  const hightligtedElems = highlightVars(varElem);
  const resetListener = () => {
    const hlColor = getHighlightColor(varElem);
    hightligtedElems.forEach(el => removeHighlight(el, hlColor));
    [...HL_COLORS.keys()].forEach(key => HL_COLORS.set(key, true));
  };
  if (hightligtedElems.length) {
    document.body.addEventListener("click", resetListener, { once: true });
  }
}

// availability of highlight colors. colors from var.css
const HL_COLORS = new Map([
  ["respec-hl-c1", true],
  ["respec-hl-c2", true],
  ["respec-hl-c3", true],
  ["respec-hl-c4", true],
  ["respec-hl-c5", true],
  ["respec-hl-c6", true],
  ["respec-hl-c7", true],
]);

function getHighlightColor(target) {
  // return current colors if applicable
  const { value } = target.classList;
  const re = /respec-hl-\w+/;
  const activeClass = re.test(value) && value.match(re);
  if (activeClass) return activeClass[0];

  // first color preference
  if (HL_COLORS.get("respec-hl-c1") === true) return "respec-hl-c1";

  // otherwise get some other available color
  return [...HL_COLORS.keys()].find(c => HL_COLORS.get(c)) || "respec-hl-c1";
}

function highlightVars(varElem) {
  const textContent = varElem.textContent.trim();
  const parent = varElem.closest("section");
  const highlightColor = getHighlightColor(varElem);

  const varsToHighlight = [...parent.querySelectorAll("var")].filter(
    el =>
      el.textContent.trim() === textContent && el.closest("section") === parent
  );

  // update availability of highlight color
  const colorStatus = varsToHighlight[0].classList.contains("respec-hl");
  HL_COLORS.set(highlightColor, colorStatus);

  // highlight vars
  if (colorStatus) {
    varsToHighlight.forEach(el => removeHighlight(el, highlightColor));
    return [];
  } else {
    varsToHighlight.forEach(el => addHighlight(el, highlightColor));
  }
  return varsToHighlight;
}

function removeHighlight(el, highlightColor) {
  el.classList.remove("respec-hl", highlightColor);
  // clean up empty class attributes so they don't come in export
  if (!el.classList.length) el.removeAttribute("class");
}

function addHighlight(elem, highlightColor) {
  elem.classList.add("respec-hl", highlightColor);
}

var highlightVars$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$K,
  run: run$y
});

// @ts-check

const name$L = "core/algorithms";

const cssPromise$2 = loadStyle$6();

async function loadStyle$6() {
  try {
    return (await Promise.resolve().then(function () { return algorithms$2; })).default;
  } catch {
    return fetchAsset("algorithms.css");
  }
}

async function run$z() {
  const elements = Array.from(document.querySelectorAll("ol.algorithm li"));
  elements
    .filter(li => li.textContent.trim().startsWith("Assert: "))
    .forEach(li => li.classList.add("assert"));
  if (document.querySelector(".assert")) {
    const style = document.createElement("style");
    style.textContent = await cssPromise$2;
    document.head.appendChild(style);
  }
}

var algorithms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$L,
  run: run$z
});

// @ts-check

const name$M = "core/anchor-expander";

function run$A() {
  /** @type {NodeListOf<HTMLElement>} */
  const anchorElements = document.querySelectorAll(
    "a[href^='#']:not(.self-link):not([href$='the-empty-string'])"
  );
  const anchors = [...anchorElements].filter(a => a.textContent.trim() === "");
  for (const a of anchors) {
    const id = a.getAttribute("href").slice(1);
    const matchingElement = document.getElementById(id);
    if (!matchingElement) {
      a.textContent = a.getAttribute("href");
      const msg = `Couldn't expand inline reference. The id "${id}" is not in the document.`;
      showInlineError(a, msg, `No matching id in document: ${id}.`);
      continue;
    }
    switch (matchingElement.localName) {
      case "h6":
      case "h5":
      case "h4":
      case "h3":
      case "h2": {
        processHeading(matchingElement, a);
        break;
      }
      case "section": {
        // find first heading in the section
        processSection(matchingElement, id, a);
        break;
      }
      case "figure": {
        processFigure(matchingElement, id, a);
        break;
      }
      case "table": {
        processTable(matchingElement, id, a);
        break;
      }
      case "aside":
      case "div": {
        processBox(matchingElement, id, a);
        break;
      }
      default: {
        a.textContent = a.getAttribute("href");
        const msg = "ReSpec doesn't support expanding this kind of reference.";
        showInlineError(a, msg, `Can't expand "#${id}".`);
      }
    }
    localize(matchingElement, a);
    a.normalize();
  }
}

function processBox(matchingElement, id, a) {
  const selfLink = matchingElement.querySelector(".marker .self-link");
  if (!selfLink) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching element "${id}", but it has no title or marker.`;
    showInlineError(a, msg, "Missing title.");
    return;
  }
  const copy = makeSafeCopy(selfLink);
  a.append(...copy.childNodes);
  a.classList.add("box-ref");
}

function processFigure(matchingElement, id, a) {
  const figcaption = matchingElement.querySelector("figcaption");
  const figEqn =
    !matchingElement.classList ||
    (!matchingElement.classList.contains("equation") ? "fig" : "eqn");
  if (!figcaption) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching figure "${id}", but figure is lacking a \`<figcaption>\`.`;
    showInlineError(a, msg, "Missing figcaption in referenced figure.");
    return;
  }
  // remove the figure's title
  const children = [...makeSafeCopy(figcaption).childNodes].filter(
    node => !node.classList || !node.classList.contains(`${figEqn}-title`)
  );
  // drop an empty space at the end.
  children.pop();
  a.append(...children);
  a.classList.add(`${figEqn}-ref`);
  const figTitle = figcaption.querySelector(`.${figEqn}-title`);
  if (!a.hasAttribute("title") && figTitle) {
    a.title = norm(figTitle.textContent);
  }
}

function processTable(matchingElement, id, a) {
  const caption = matchingElement.querySelector("caption");
  if (!caption) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching table "${id}", but table is lacking a \`<caption>\`.`;
    showInlineError(a, msg, "Missing caption in referenced table.");
    return;
  }
  // remove the table's title
  const children = [...makeSafeCopy(caption).childNodes].filter(
    node => !node.classList || !node.classList.contains("tbl-title")
  );
  // drop an empty space at the end.
  children.pop();
  a.append(...children);
  a.classList.add("tbl-ref");
  const tblTitle = caption.querySelector(".tbl-title");
  if (!a.hasAttribute("title") && tblTitle) {
    a.title = norm(tblTitle.textContent);
  }
}

function processSection(matchingElement, id, a) {
  const heading = matchingElement.querySelector("h6, h5, h4, h3, h2");
  if (!heading) {
    a.textContent = a.getAttribute("href");
    const msg =
      "Found matching section, but the section was lacking a heading element.";
    showInlineError(a, msg, `No matching id in document: "${id}".`);
    return;
  }
  processHeading(heading, a);
  localize(heading, a);
}

function processHeading(heading, a) {
  const hadSelfLink = heading.querySelector(".self-link");
  const children = [...makeSafeCopy(heading).childNodes].filter(
    node => !node.classList || !node.classList.contains("self-link")
  );
  a.append(...children);
  if (hadSelfLink) a.prepend("§\u00A0");
  a.classList.add("sec-ref");
}

function localize(matchingElement, newElement) {
  for (const attrName of ["dir", "lang"]) {
    // Already set on element, don't override.
    if (newElement.hasAttribute(attrName)) continue;

    // Closest in tree setting the attribute
    const matchingClosest = matchingElement.closest(`[${attrName}]`);
    if (!matchingClosest) continue;

    // Closest to reference setting the attribute
    const newClosest = newElement.closest(`[${attrName}]`);

    // It's the same, so already inherited from closest (probably HTML element or body).
    if (
      newClosest &&
      newClosest.getAttribute(attrName) ===
        matchingClosest.getAttribute(attrName)
    )
      continue;
    // Otherwise, set it.
    newElement.setAttribute(attrName, matchingClosest.getAttribute(attrName));
  }
}

var anchorExpander = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$M,
  run: run$A
});

var ui$2 = "#respec-ui {\n  position: fixed;\n  display: flex;\n  flex-direction: row-reverse;\n  top: 20px;\n  right: 20px;\n  width: 202px;\n  text-align: right;\n  z-index: 9000;\n}\n\n#respec-pill,\n.respec-info-button {\n  background: #fff;\n  height: 2.5em;\n  color: rgb(120, 120, 120);\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n}\n\n.respec-info-button {\n  border: none;\n  opacity: 0.75;\n  border-radius: 2em;\n  margin-right: 1em;\n  min-width: 3.5em;\n}\n\n.respec-info-button:focus,\n.respec-info-button:hover {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#respec-pill:disabled {\n  font-size: 2.8px;\n  text-indent: -9999em;\n  border-top: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-right: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-bottom: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-left: 1.1em solid #ffffff;\n  transform: translateZ(0);\n  animation: respec-spin 0.5s infinite linear;\n  box-shadow: none;\n}\n\n#respec-pill:disabled,\n#respec-pill:disabled:after {\n  border-radius: 50%;\n  width: 10em;\n  height: 10em;\n}\n\n@keyframes respec-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.respec-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s linear;\n}\n\n.respec-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s linear;\n}\n\n#respec-pill:hover,\n#respec-pill:focus {\n  color: rgb(0, 0, 0);\n  background-color: rgb(245, 245, 245);\n  transition: color 0.2s;\n}\n\n#respec-menu {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background: #fff;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n  width: 200px;\n  display: none;\n  text-align: left;\n  margin-top: 32px;\n  font-size: 0.8em;\n}\n\n#respec-menu:not([hidden]) {\n  display: block;\n}\n\n#respec-menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.respec-save-buttons {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(47%, 2fr));\n  grid-gap: 0.5cm;\n  padding: 0.5cm;\n}\n\n.respec-save-button:link {\n  padding-top: 16px;\n  color: rgb(240, 240, 240);\n  background: rgb(42, 90, 168);\n  justify-self: stretch;\n  height: 1cm;\n  text-decoration: none;\n  text-align: center;\n  font-size: inherit;\n  border: none;\n  border-radius: 0.2cm;\n}\n\n.respec-save-button:link:hover {\n  color: white;\n  background: rgb(42, 90, 168);\n  padding: 0;\n  margin: 0;\n  border: 0;\n  padding-top: 16px;\n}\n\n#respec-ui button:focus,\n#respec-pill:focus,\n.respec-option:focus {\n  outline: 0;\n  outline-style: none;\n}\n\n#respec-pill-error {\n  background-color: red;\n  color: white;\n}\n\n#respec-pill-warning {\n  background-color: orange;\n  color: white;\n}\n\n.respec-warning-list,\n.respec-error-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-family: sans-serif;\n  background-color: rgb(255, 251, 230);\n  font-size: 0.85em;\n}\n\n.respec-warning-list > li,\n.respec-error-list > li {\n  padding: 0.4em 0.7em;\n}\n\n.respec-warning-list > li::before {\n  content: \"⚠️\";\n  padding-right: 0.5em;\n}\n.respec-warning-list p,\n.respec-error-list p {\n  padding: 0;\n  margin: 0;\n}\n\n.respec-warning-list li {\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 245, 194);\n}\n\n.respec-error-list,\n.respec-error-list li {\n  background-color: rgb(255, 240, 240);\n}\n\n.respec-error-list li::before {\n  content: \"💥\";\n  padding-right: 0.5em;\n}\n\n.respec-error-list li {\n  padding: 0.4em 0.7em;\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 215, 215);\n}\n\n.respec-error-list li > p {\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n}\n\n#respec-overlay {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%;\n  background: #000;\n}\n\n.respec-show-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0.5;\n}\n\n.respec-hide-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0;\n}\n\n.respec-modal {\n  display: block;\n  position: fixed;\n  z-index: 11000;\n  margin: auto;\n  top: 10%;\n  background: #fff;\n  border: 5px solid #666;\n  min-width: 20%;\n  width: 79%;\n  padding: 0;\n  max-height: 80%;\n  overflow-y: auto;\n  margin: 0 -0.5cm;\n}\n\n@media screen and (min-width: 78em) {\n  .respec-modal {\n    width: 62%;\n  }\n}\n\n.respec-modal h3 {\n  margin: 0;\n  padding: 0.2em;\n  text-align: center;\n  color: black;\n  background: linear-gradient(\n    to bottom,\n    rgba(238, 238, 238, 1) 0%,\n    rgba(238, 238, 238, 1) 50%,\n    rgba(204, 204, 204, 1) 100%\n  );\n  font-size: 1em;\n}\n\n.respec-modal .inside div p {\n  padding-left: 1cm;\n}\n\n#respec-menu button.respec-option {\n  background: white;\n  padding: 0 0.2cm;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: inherit;\n  padding: 1.2em 1.2em;\n}\n\n#respec-menu button.respec-option:hover,\n#respec-menu button:focus {\n  background-color: #eeeeee;\n}\n\n.respec-cmd-icon {\n  padding-right: 0.5em;\n}\n\n#respec-ui button.respec-option:last-child {\n  border: none;\n  border-radius: inherit;\n}\n\n.respec-button-copy-paste {\n  position: absolute;\n  height: 28px;\n  width: 40px;\n  cursor: pointer;\n  background-image: linear-gradient(#fcfcfc, #eee);\n  border: 1px solid rgb(144, 184, 222);\n  border-left: 0;\n  border-radius: 0px 0px 3px 0;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  top: 0;\n  left: 127px;\n}\n\n#specref-ui {\n  margin: 0 2%;\n  margin-bottom: 0.5cm;\n}\n\n#specref-ui header {\n  font-size: 0.7em;\n  background-color: #eee;\n  text-align: center;\n  padding: 0.2cm;\n  margin-bottom: 0.5cm;\n  border-radius: 0 0 0.2cm 0.2cm;\n}\n\n#specref-ui header h1 {\n  padding: 0;\n  margin: 0;\n  color: black;\n}\n\n#specref-ui p {\n  padding: 0;\n  margin: 0;\n  font-size: 0.8em;\n  text-align: center;\n}\n\n#specref-ui p.state {\n  margin: 1cm;\n}\n\n#specref-ui .searchcomponent {\n  font-size: 16px;\n  display: grid;\n  grid-template-columns: auto 2cm;\n}\n#specref-ui .searchcomponent:focus {\n}\n\n#specref-ui input,\n#specref-ui button {\n  border: 0;\n  padding: 6px 12px;\n}\n\n#specref-ui label {\n  font-size: 0.6em;\n  grid-column-end: 3;\n  text-align: right;\n  grid-column-start: 1;\n}\n\n#specref-ui input[type=\"search\"] {\n  -webkit-appearance: none;\n  font-size: 16px;\n  border-radius: 0.1cm 0 0 0.1cm;\n  border: 1px solid rgb(204, 204, 204);\n}\n\n#specref-ui button[type=\"submit\"] {\n  color: white;\n  border-radius: 0 0.1cm 0.1cm 0;\n  background-color: rgb(51, 122, 183);\n}\n\n#specref-ui button[type=\"submit\"]:hover {\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n#specref-ui .result-stats {\n  margin: 0;\n  padding: 0;\n  color: rgb(128, 128, 128);\n  font-size: 0.7em;\n  font-weight: bold;\n}\n\n#specref-ui .specref-results {\n  font-size: 0.8em;\n}\n\n#specref-ui .specref-results dd + dt {\n  margin-top: 0.51cm;\n}\n\n#specref-ui .specref-results a {\n  text-transform: capitalize;\n}\n#specref-ui .specref-results .authors {\n  display: block;\n  color: #006621;\n}\n\n@media print {\n  #respec-ui {\n    display: none;\n  }\n}\n\n#xref-ui {\n  width: 100%;\n  min-height: 550px;\n  height: 100%;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n#xref-ui:not(.ready) {\n  background: url(\"https://respec.org/xref/loader.gif\") no-repeat center;\n}\n";

var ui$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ui$2
});

var respec2 = "/*****************************************************************\n * ReSpec 3 CSS\n * Robin Berjon - http://berjon.com/\n *****************************************************************/\n\n@keyframes pop {\n  0% {\n    transform: scale(1, 1);\n  }\n  25% {\n    transform: scale(1.25, 1.25);\n    opacity: 0.75;\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n}\n\n/* Override code highlighter background */\n.hljs {\n  background: transparent !important;\n}\n\n/* --- INLINES --- */\nh1 abbr,\nh2 abbr,\nh3 abbr,\nh4 abbr,\nh5 abbr,\nh6 abbr,\na abbr {\n  border: none;\n}\n\ndfn {\n  font-weight: bold;\n}\n\na.internalDFN {\n  color: inherit;\n  border-bottom: 1px solid #99c;\n  text-decoration: none;\n}\n\na.externalDFN {\n  color: inherit;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\na.bibref {\n  text-decoration: none;\n}\n\n.respec-offending-element:target {\n  animation: pop 0.25s ease-in-out 0s 1;\n}\n\n.respec-offending-element,\na[href].respec-offending-element {\n  text-decoration: red wavy underline;\n}\n@supports not (text-decoration: red wavy underline) {\n  .respec-offending-element:not(pre) {\n    display: inline-block;\n  }\n  .respec-offending-element {\n    /* Red squiggly line */\n    background: url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=)\n      bottom repeat-x;\n  }\n}\n\n#references :target {\n  background: #eaf3ff;\n  animation: pop 0.4s ease-in-out 0s 1;\n}\n\ncite .bibref {\n  font-style: normal;\n}\n\ncode {\n  color: #c83500;\n}\n\nth code {\n  color: inherit;\n}\n\na[href].orcid {\n    padding-left: 4px;\n    padding-right: 4px;\n}\n\na[href].orcid > svg {\n    margin-bottom: -2px;\n}\n\n/* --- TOC --- */\n\n.toc a,\n.tof a {\n  text-decoration: none;\n}\n\na .secno,\na .figno {\n  color: #000;\n}\n\nul.tof,\nol.tof {\n  list-style: none outside none;\n}\n\n.caption {\n  margin-top: 0.5em;\n  font-style: italic;\n}\n\n/* --- TABLE --- */\n\ntable.simple {\n  border-spacing: 0;\n  border-collapse: collapse;\n  border-bottom: 3px solid #005a9c;\n}\n\n.simple th {\n  background: #005a9c;\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th a {\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th[scope=\"row\"] {\n  background: inherit;\n  color: inherit;\n  border-top: 1px solid #ddd;\n}\n\n.simple td {\n  padding: 3px 10px;\n  border-top: 1px solid #ddd;\n}\n\n.simple tr:nth-child(even) {\n  background: #f0f6ff;\n}\n\n/* --- DL --- */\n\n.section dd > p:first-child {\n  margin-top: 0;\n}\n\n.section dd > p:last-child {\n  margin-bottom: 0;\n}\n\n.section dd {\n  margin-bottom: 1em;\n}\n\n.section dl.attrs dd,\n.section dl.eldef dd {\n  margin-bottom: 0;\n}\n\n#issue-summary > ul,\n.respec-dfn-list {\n  column-count: 2;\n}\n\n#issue-summary li,\n.respec-dfn-list li {\n  list-style: none;\n}\n\ndetails.respec-tests-details {\n  margin-left: 1em;\n  display: inline-block;\n  vertical-align: top;\n}\n\ndetails.respec-tests-details > * {\n  padding-right: 2em;\n}\n\ndetails.respec-tests-details[open] {\n  z-index: 999999;\n  position: absolute;\n  border: thin solid #cad3e2;\n  border-radius: 0.3em;\n  background-color: white;\n  padding-bottom: 0.5em;\n}\n\ndetails.respec-tests-details[open] > summary {\n  border-bottom: thin solid #cad3e2;\n  padding-left: 1em;\n  margin-bottom: 1em;\n  line-height: 2em;\n}\n\ndetails.respec-tests-details > ul {\n  width: 100%;\n  margin-top: -0.3em;\n}\n\ndetails.respec-tests-details > li {\n  padding-left: 1em;\n}\n\na[href].self-link:hover {\n  opacity: 1;\n  text-decoration: none;\n  background-color: transparent;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  position: relative;\n}\n\naside.example .marker > a.self-link {\n  color: inherit;\n}\n\nh2 > a.self-link,\nh3 > a.self-link,\nh4 > a.self-link,\nh5 > a.self-link,\nh6 > a.self-link {\n  border: none;\n  color: inherit;\n  font-size: 83%;\n  height: 2em;\n  left: -1.6em;\n  opacity: 0.5;\n  position: absolute;\n  text-align: center;\n  text-decoration: none;\n  top: 0;\n  transition: opacity 0.2s;\n  width: 2em;\n}\n\nh2 > a.self-link::before,\nh3 > a.self-link::before,\nh4 > a.self-link::before,\nh5 > a.self-link::before,\nh6 > a.self-link::before {\n  content: \"§\";\n  display: block;\n}\n\n@media (max-width: 767px) {\n  dd {\n    margin-left: 0;\n  }\n\n  /* Don't position self-link in headings off-screen */\n  h2 > a.self-link,\n  h3 > a.self-link,\n  h4 > a.self-link,\n  h5 > a.self-link,\n  h6 > a.self-link {\n    left: auto;\n    top: auto;\n  }\n}\n\n@media print {\n  .removeOnSave {\n    display: none;\n  }\n}\n";

var respec2$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': respec2
});

var examples$1 = "/* --- EXAMPLES --- */\nspan.example-title {\n    text-transform: none;\n}\naside.example, div.example, div.illegal-example {\n    padding: 0.5em;\n    margin: 1em 0;\n    position: relative;\n    clear: both;\n}\ndiv.illegal-example { color: red }\ndiv.illegal-example p { color: black }\naside.example, div.example {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n    border-color: #e0cb52;\n    background: #fcfaee;\n}\n\naside.example div.example {\n    border-left-width: .1em;\n    border-color: #999;\n    background: #fff;\n}\naside.example div.example span.example-title {\n    color: #999;\n}\n";

var examples$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': examples$1
});

var issuesNotes$1 = "/* --- ISSUES/NOTES --- */\n.issue-label {\n    text-transform: initial;\n}\n\n.warning > p:first-child { margin-top: 0 }\n.warning {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n}\nspan.warning { padding: .1em .5em .15em; }\n\n.issue.closed span.issue-number {\n    text-decoration: line-through;\n}\n\n.warning {\n    border-color: #f11;\n    border-width: .2em;\n    border-style: solid;\n    background: #fbe9e9;\n}\n\n.warning-title:before{\n    content: \"⚠\"; /*U+26A0 WARNING SIGN*/\n    font-size: 1.3em;\n    float: left;\n    padding-right: .3em;\n    margin-top: -0.3em;\n}\n\nli.task-list-item {\n    list-style: none;\n}\n\ninput.task-list-item-checkbox {\n    margin: 0 0.35em 0.25em -1.6em;\n    vertical-align: middle;\n}\n\n.issue a.respec-gh-label {\n  padding: 5px;\n  margin: 0 2px 0 2px;\n  font-size: 10px;\n  text-transform: none;\n  text-decoration: none;\n  font-weight: bold;\n  border-radius: 4px;\n  position: relative;\n  bottom: 2px;\n  border: none;\n}\n\n.issue a.respec-label-dark {\n  color: #fff;\n  background-color: #000;\n}\n\n.issue a.respec-label-light {\n  color: #000;\n  background-color: #fff;\n}\n";

var issuesNotes$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': issuesNotes$1
});

var respecWorker = "// ReSpec Worker v1.0.0\n\"use strict\";\ntry {\n  importScripts(\"https://www.w3.org/Tools/respec/respec-highlight.js\");\n} catch (err) {\n  console.error(\"Network error loading highlighter\", err);\n}\n\nself.addEventListener(\"message\", ({ data: originalData }) => {\n  const data = Object.assign({}, originalData);\n  switch (data.action) {\n    case \"highlight-load-lang\": {\n      const { langURL, propName, lang } = data;\n      importScripts(langURL);\n      self.hljs.registerLanguage(lang, self[propName]);\n      break;\n    }\n    case \"highlight\": {\n      const { code } = data;\n      const langs = data.languages.length ? data.languages : undefined;\n      try {\n        const { value, language } = self.hljs.highlightAuto(code, langs);\n        Object.assign(data, { value, language });\n      } catch (err) {\n        console.error(\"Could not transform some code?\", err);\n        // Post back the original code\n        Object.assign(data, { value: code, language: \"\" });\n      }\n      break;\n    }\n  }\n  self.postMessage(data);\n});\n";

var respecWorker$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': respecWorker
});

var github$1 = "/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #998;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-subst {\n  color: #333;\n  font-weight: bold;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-tag .hljs-attr {\n  color: #008080;\n}\n\n.hljs-string,\n.hljs-doctag {\n  color: #d14;\n}\n\n.hljs-title,\n.hljs-section,\n.hljs-selector-id {\n  color: #900;\n  font-weight: bold;\n}\n\n.hljs-subst {\n  font-weight: normal;\n}\n\n.hljs-type,\n.hljs-class .hljs-title {\n  color: #458;\n  font-weight: bold;\n}\n\n.hljs-tag,\n.hljs-name,\n.hljs-attribute {\n  color: #000080;\n  font-weight: normal;\n}\n\n.hljs-regexp,\n.hljs-link {\n  color: #009926;\n}\n\n.hljs-symbol,\n.hljs-bullet {\n  color: #990073;\n}\n\n.hljs-built_in,\n.hljs-builtin-name {\n  color: #0086b3;\n}\n\n.hljs-meta {\n  color: #999;\n  font-weight: bold;\n}\n\n.hljs-deletion {\n  background: #fdd;\n}\n\n.hljs-addition {\n  background: #dfd;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n";

var github$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': github$1
});

var _var = "var:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nvar.respec-hl {\n  color: var(--color, #000);\n  background-color: var(--bg-color);\n  box-shadow: 0 0 0px 2px var(--bg-color);\n}\n\n/* highlight colors\n  https://github.com/w3c/tr-design/issues/152\n*/\nvar.respec-hl-c1 {\n  --bg-color: #f4d200;\n}\n\nvar.respec-hl-c2 {\n  --bg-color: #ff87a2;\n}\n\nvar.respec-hl-c3 {\n  --bg-color: #96e885;\n}\n\nvar.respec-hl-c4 {\n  --bg-color: #3eeed2;\n}\n\nvar.respec-hl-c5 {\n  --bg-color: #eacfb6;\n}\n\nvar.respec-hl-c6 {\n  --bg-color: #82ddff;\n}\n\nvar.respec-hl-c7 {\n  --bg-color: #ffbcf2;\n}\n\n@media print {\n  var.respec-hl {\n    background: none;\n    color: #000;\n    box-shadow: unset;\n  }\n}\n";

var _var$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _var
});

var algorithms$1 = "/* For assertions in lists containing algorithms */\n\n.assert {\n    background: #EEE;\n    border-left: 0.5em solid #AAA;\n    padding: 0.3em;\n}\n";

var algorithms$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': algorithms$1
});
>>>>>>> Build
//# sourceMappingURL=respec-geonovum.js.map
