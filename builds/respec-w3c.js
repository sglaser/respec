"use strict";
<<<<<<< gh-pages
window.respecVersion = "25.0.2";
"use strict";window.addEventListener("error",e=>{console.error(e.error,e.message,e)});const modules=[Promise.resolve().then((function(){return baseRunner})),Promise.resolve().then((function(){return ui$1})),Promise.resolve().then((function(){return reindent$1})),Promise.resolve().then((function(){return locationHash})),Promise.resolve().then((function(){return l10n$1})),Promise.resolve().then((function(){return defaults$6})),Promise.resolve().then((function(){return style})),Promise.resolve().then((function(){return style$1})),Promise.resolve().then((function(){return l10n$2})),Promise.resolve().then((function(){return github$1})),Promise.resolve().then((function(){return dataInclude})),Promise.resolve().then((function(){return markdown})),Promise.resolve().then((function(){return headers})),Promise.resolve().then((function(){return abstract})),Promise.resolve().then((function(){return dataTransform})),Promise.resolve().then((function(){return dataAbbr})),Promise.resolve().then((function(){return inlines})),Promise.resolve().then((function(){return conformance})),Promise.resolve().then((function(){return dfn})),Promise.resolve().then((function(){return pluralize$2})),Promise.resolve().then((function(){return examples})),Promise.resolve().then((function(){return issuesNotes})),Promise.resolve().then((function(){return bestPractices})),Promise.resolve().then((function(){return figures})),Promise.resolve().then((function(){return webidl})),Promise.resolve().then((function(){return dataCite})),Promise.resolve().then((function(){return biblio$1})),Promise.resolve().then((function(){return webidlIndex})),Promise.resolve().then((function(){return linkToDfn})),Promise.resolve().then((function(){return renderBiblio})),Promise.resolve().then((function(){return contrib})),Promise.resolve().then((function(){return fixHeaders})),Promise.resolve().then((function(){return structure$1})),Promise.resolve().then((function(){return informative})),Promise.resolve().then((function(){return idHeaders})),Promise.resolve().then((function(){return caniuse})),Promise.resolve().then((function(){return mdnAnnotation})),Promise.resolve().then((function(){return saveHtml})),Promise.resolve().then((function(){return searchSpecref})),Promise.resolve().then((function(){return searchXref})),Promise.resolve().then((function(){return dfnList})),Promise.resolve().then((function(){return aboutRespec})),Promise.resolve().then((function(){return seo})),Promise.resolve().then((function(){return seo$1})),Promise.resolve().then((function(){return highlight})),Promise.resolve().then((function(){return webidlClipboard})),Promise.resolve().then((function(){return dataTests})),Promise.resolve().then((function(){return listSorter})),Promise.resolve().then((function(){return highlightVars$1})),Promise.resolve().then((function(){return dfnPanel})),Promise.resolve().then((function(){return dataType})),Promise.resolve().then((function(){return algorithms})),Promise.resolve().then((function(){return anchorExpander})),Promise.resolve().then((function(){return index})),Promise.resolve().then((function(){return linter$1}))];async function domReady(){"loading"===document.readyState&&await new Promise(e=>document.addEventListener("DOMContentLoaded",e))}(async()=>{const[e,{ui:t},...n]=await Promise.all(modules);try{t.show(),await domReady(),await e.runAll(n)}finally{t.enable()}})().catch(e=>{console.error(e)});const inAmd=!!window.require;if(!inAmd){const e=function(e,t){const n=e.map(e=>{if(!(e in window.require.modules))throw new Error(`Unsupported dependency name: ${e}`);return window.require.modules[e]});Promise.all(n).then(e=>t(...e))};e.modules={},window.require=e}function expose(e,t){inAmd||(window.require.modules[e]=t)}const name="core/pubsubhub",subscriptions=new Map;function pub(e,...t){if(!subscriptions.has(e))return;if(Array.from(subscriptions.get(e)).forEach(e=>{try{e(...t)}catch(t){pub("error",`Error when calling function ${e.name}. See developer console.`),console.error(t)}}),window.parent===window.self)return;const n=t.map(e=>String(JSON.stringify(e.stack||e)));window.parent.postMessage({topic:e,args:n},window.parent.location.origin)}function sub(e,t,n={once:!1}){return n.once?sub(e,(function n(...r){unsub({topic:e,cb:n}),t(...r)})):(subscriptions.has(e)?subscriptions.get(e).add(t):subscriptions.set(e,new Set([t])),{topic:e,cb:t})}function unsub({topic:e,cb:t}){const n=subscriptions.get(e);return n&&n.has(t)?n.delete(t):(console.warn("Already unsubscribed:",e,t),!1)}sub("error",e=>{console.error(e,e.stack)}),sub("warn",e=>{console.warn(e)}),expose(name,{sub:sub});const userConfig={},amendConfig=e=>Object.assign(userConfig,e),removeList=["githubToken","githubUser"];function overrideConfig(e){const t=document.location.search.replace(/;/g,"&"),n=new URLSearchParams(t),r=Array.from(n).filter(([e,t])=>!!e&&!!t).map(([e,t])=>{const n=decodeURIComponent(e),r=decodeURIComponent(t.replace(/%3D/g,"="));let o;try{o=JSON.parse(r)}catch{o=r}return{key:n,value:o}}).reduce((e,{key:t,value:n})=>(e[t]=n,e),{});Object.assign(e,r),pub("amend-user-config",r)}sub("start-all",amendConfig),sub("amend-user-config",amendConfig),sub("end-all",()=>{const e=document.createElement("script");e.id="initialUserConfig",e.type="application/json";for(const e of removeList)e in userConfig&&delete userConfig[e];e.innerHTML=JSON.stringify(userConfig,null,2),document.head.appendChild(e)}),sub("start-all",overrideConfig,{once:!0});const respecDonePromise=new Promise(e=>{sub("end-all",e,{once:!0})});let doneResolver;Object.defineProperty(document,"respecIsReady",{get:()=>respecDonePromise});const done=new Promise(e=>{doneResolver=e});let doneResolver$1;sub("plugins-done",async e=>{const t=[];if(Array.isArray(e.postProcess)){const n=e.postProcess.filter(e=>{const t="function"==typeof e;return t||pub("error","Every item in `postProcess` must be a JS function."),t}).map(async t=>{try{return await t(e,document)}catch(e){pub("error",`Function ${t.name} threw an error during \`postProcess\`. See developer console.`),console.error(e)}}),r=await Promise.all(n);t.push(...r)}"function"==typeof e.afterEnd&&t.push(await e.afterEnd(e,document)),doneResolver(t)},{once:!0});const done$1=new Promise(e=>{doneResolver$1=e});sub("start-all",async e=>{const t=[];if(Array.isArray(e.preProcess)){const n=e.preProcess.filter(e=>{const t="function"==typeof e;return t||pub("error","Every item in `preProcess` must be a JS function."),t}).map(async t=>{try{return await t(e,document)}catch(e){pub("error",`Function ${t.name} threw an error during \`preProcess\`. See developer console.`),console.error(e)}}),r=await Promise.all(n);t.push(...r)}doneResolver$1(t)},{once:!0});const name$1="core/l10n",html=document.documentElement;html&&!html.hasAttribute("lang")&&(html.lang="en",html.hasAttribute("dir")||(html.dir="ltr"));const base={about_respec:"About",abstract:"Abstract",bug_tracker:"Bug tracker:",close_parens:")",definition_list:"Definitions",editors_note:"Editor's note",feature_at_risk:"(Feature at Risk) Issue",info_references:"Informative references",issue_summary:"Issue Summary",issue:"Issue",list_of_definitions:"List of Definitions",norm_references:"Normative references",note:"Note",open_bugs:"open bugs",open_parens:"(",participate:"Participate",references:"References",save_as:"Save as",save_snapshot:"Export",search_specref:"Search Specref",toc:"Table of Contents",warning:"Warning"},ko={abstract:"요약"},zh={about_respec:"关于",abstract:"摘要",bug_tracker:"错误跟踪：",file_a_bug:"反馈错误",note:"注",open_bugs:"修正中的错误",participate:"参与：",toc:"内容大纲"},ja={abstract:"要約",bug_tracker:"バグの追跡履歴：",file_a_bug:"問題報告",note:"注",open_bugs:"改修されていないバグ",participate:"参加方法：",toc:"目次"},nl={about_respec:"Over",abstract:"Samenvatting",bug_tracker:"Meldingensysteem:",definition_list:"Lijst van Definities",editors_note:"Redactionele noot",file_a_bug:"Dien een melding in",info_references:"Informatieve referenties",issue_summary:"Lijst met issues",list_of_definitions:"Lijst van Definities",norm_references:"Normatieve referenties",note:"Noot",open_bugs:"open meldingen",participate:"Doe mee",references:"Referenties",save_as:"Bewaar als",save_snapshot:"Bewaar Snapshot",search_specref:"Doorzoek Specref",toc:"Inhoudsopgave",warning:"Waarschuwing"},es={abstract:"Resumen",authors:"Autores:",bug_tracker:"Repositorio de bugs:",close_parens:")",editors_note:"Nota de editor",file_a_bug:"Nota un bug",info_references:"Referencias informativas",issue_summary:"Resumen de la cuestión",issue:"Cuestión",norm_references:"Referencias normativas",note:"Nota",open_bugs:"Bugs abiertos",open_parens:"(",participate:"Participad",references:"Referencias",toc:"Tabla de Contenidos",warning:"Aviso"},l10n={en:{...base},ko:{...base,...ko},zh:{...base,...zh},ja:{...base,...ja},nl:{...base,...nl},es:{...base,...es}};l10n["zh-hans"]=l10n.zh,l10n["zh-cn"]=l10n.zh;const lang=html&&html.lang in l10n?html.lang:"en";function getIntlData(e){return new Proxy(e,{get(e,t){const n=e[lang][t]||e.en[t];if(!n)throw new Error(`No l10n data for key: "${t}"`);return n}})}function run(e){e.l10n=l10n[lang]||l10n.en}var l10n$1=Object.freeze({__proto__:null,name:name$1,l10n:l10n,lang:lang,getIntlData:getIntlData,run:run});const instanceOfAny=(e,t)=>t.some(t=>e instanceof t);let idbProxyableTypes,cursorAdvanceMethods;function getIdbProxyableTypes(){return idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function getCursorAdvanceMethods(){return cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;function promisifyRequest(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{t(wrap(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&cursorRequestMap.set(t,e)}).catch(()=>{}),reverseTransformCache.set(t,e),t}function cacheDonePromiseForTransaction(e){if(transactionDoneMap.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{t(),r()},i=()=>{n(e.error),r()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)});transactionDoneMap.set(e,t)}let idbProxyTraps={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return transactionDoneMap.get(e);if("objectStoreNames"===t)return e.objectStoreNames||transactionStoreNamesMap.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(e[t])},has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function addTraps(e){idbProxyTraps=e(idbProxyTraps)}function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?getCursorAdvanceMethods().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(cursorRequestMap.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...n){const r=e.call(unwrap(this),t,...n);return transactionStoreNamesMap.set(r,t.sort?t.sort():[t]),wrap(r)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&cacheDonePromiseForTransaction(e),instanceOfAny(e,getIdbProxyableTypes())?new Proxy(e,idbProxyTraps):e)}function wrap(e){if(e instanceof IDBRequest)return promisifyRequest(e);if(transformCache.has(e))return transformCache.get(e);const t=transformCachableValue(e);return t!==e&&(transformCache.set(e,t),reverseTransformCache.set(t,e)),t}const unwrap=e=>reverseTransformCache.get(e);function openDB(e,t,{blocked:n,upgrade:r,blocking:o}={}){const i=indexedDB.open(e,t),s=wrap(i);return r&&i.addEventListener("upgradeneeded",e=>{r(wrap(i.result),e.oldVersion,e.newVersion,wrap(i.transaction))}),n&&i.addEventListener("blocked",()=>n()),o&&s.then(e=>e.addEventListener("versionchange",o)).catch(()=>{}),s}function deleteDB(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",()=>t()),wrap(n).then(()=>void 0)}const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(cachedMethods.get(t))return cachedMethods.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=writeMethods.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!readMethods.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,o?"readwrite":"readonly");let s=i.store;r&&(s=s.index(t.shift()));const a=s[n](...t);return o&&await i.done,a};return cachedMethods.set(t,i),i}addTraps(e=>({get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)}));var _idb=Object.freeze({__proto__:null,openDB:openDB,deleteDB:deleteDB,unwrap:unwrap,wrap:wrap});function lastLine(e){const t=e.split("\n");return t[t.length-1]}function error(e,t,n,r,o,{level:i="error",autofix:s,ruleName:a}={}){function c(n){return n>0?e.slice(t,t+n):e.slice(Math.max(t+n,0),t)}function l(n,{precedes:r}={}){const o=n.map(e=>e.trivia+e.value).join(""),i=e[t];return"eof"===i.type?o:r?o+i.trivia:o.slice(i.trivia.length)}const u="eof"!==e[t].type?e[t].line:e.length>1?e[t-1].line:1,d=lastLine(l(c(-5),{precedes:!0})),p=c(5),h=l(p),f=d+h.split("\n")[0]+"\n"+(" ".repeat(d.length)+"^"),m="Syntax"===o?"since":"inside",g=`${o} error at line ${u}${e.name?` in ${e.name}`:""}${n&&n.name?`, ${m} \`${n.partial?"partial ":""}${n.type} ${n.name}\``:""}:\n${f}`;return{message:`${g} ${r}`,bareMessage:r,context:g,line:u,sourceName:e.name,level:i,ruleName:a,autofix:s,input:h,tokens:p}}function syntaxError(e,t,n,r){return error(e,t,n,r,"Syntax")}function validationError(e,t,n,r,o={}){return o.ruleName=n,error(t.source,e.index,t,r,"Validation",o)}class Base{constructor({source:e,tokens:t}){Object.defineProperties(this,{source:{value:e},tokens:{value:t},parent:{value:null,writable:!0},this:{value:this}})}toJSON(){const e={type:void 0,name:void 0,inheritance:void 0};let t=this;for(;t!==Object.prototype;){const n=Object.getOwnPropertyDescriptors(t);for(const[t,r]of Object.entries(n))(r.enumerable||r.get)&&(e[t]=this[t]);t=Object.getPrototypeOf(t)}return e}}function idlTypeIncludesDictionary(e,t,{useNullableInner:n}={}){if(!e.union){const r=t.unique.get(e.idlType);if(!r)return;if("typedef"===r.type){const{typedefIncludesDictionary:n}=t.cache;if(n.has(r))return n.get(r);t.cache.typedefIncludesDictionary.set(r,void 0);const o=idlTypeIncludesDictionary(r.idlType,t);if(t.cache.typedefIncludesDictionary.set(r,o),o)return{reference:e,dictionary:o.dictionary}}if("dictionary"===r.type&&(n||!e.nullable))return{reference:e,dictionary:r}}for(const n of e.subtype){const e=idlTypeIncludesDictionary(n,t);if(e)return n.union?e:{reference:n,dictionary:e.dictionary}}}function dictionaryIncludesRequiredField(e,t){if(t.cache.dictionaryIncludesRequiredField.has(e))return t.cache.dictionaryIncludesRequiredField.get(e);if(t.cache.dictionaryIncludesRequiredField.set(e,void 0),e.inheritance){const n=t.unique.get(e.inheritance);if(!n)return!0;if(dictionaryIncludesRequiredField(n,t))return!0}const n=e.members.some(e=>e.required);return t.cache.dictionaryIncludesRequiredField.set(e,n),n}function generic_type(e,t){const n=e.consume("FrozenArray","Promise","sequence","record");if(!n)return;const r=autoParenter(new Type({source:e.source,tokens:{base:n}}));switch(r.tokens.open=e.consume("<")||e.error(`No opening bracket after ${n.type}`),n.type){case"Promise":{e.probe("[")&&e.error("Promise type cannot have extended attribute");const n=return_type(e,t)||e.error("Missing Promise subtype");r.subtype.push(n);break}case"sequence":case"FrozenArray":{const o=type_with_extended_attributes(e,t)||e.error(`Missing ${n.type} subtype`);r.subtype.push(o);break}case"record":{e.probe("[")&&e.error("Record key cannot have extended attribute");const n=e.consume(...stringTypes)||e.error(`Record key must be one of: ${stringTypes.join(", ")}`),o=new Type({source:e.source,tokens:{base:n}});o.tokens.separator=e.consume(",")||e.error("Missing comma after record key type"),o.type=t;const i=type_with_extended_attributes(e,t)||e.error("Error parsing generic type record");r.subtype.push(o,i);break}}return r.idlType||e.error(`Error parsing generic type ${n.type}`),r.tokens.close=e.consume(">")||e.error(`Missing closing bracket after ${n.type}`),r.this}function type_suffix(e,t){const n=e.consume("?");n&&(t.tokens.nullable=n),e.probe("?")&&e.error("Can't nullable more than once")}function single_type(e,t){let n=generic_type(e,t)||primitive_type(e);if(!n){const t=e.consume("identifier",...stringTypes,...typeNameKeywords);if(!t)return;n=new Type({source:e.source,tokens:{base:t}}),e.probe("<")&&e.error(`Unsupported generic type ${t.value}`)}return"Promise"===n.generic&&e.probe("?")&&e.error("Promise type cannot be nullable"),n.type=t||null,type_suffix(e,n),n.nullable&&"any"===n.idlType&&e.error("Type `any` cannot be made nullable"),n}function union_type(e,t){const n={};if(n.open=e.consume("("),!n.open)return;const r=autoParenter(new Type({source:e.source,tokens:n}));for(r.type=t||null;;){const t=type_with_extended_attributes(e)||e.error("No type after open parenthesis or 'or' in union type");"any"===t.idlType&&e.error("Type `any` cannot be included in a union type"),"Promise"===t.generic&&e.error("Type `Promise` cannot be included in a union type"),r.subtype.push(t);const n=e.consume("or");if(!n)break;t.tokens.separator=n}return r.idlType.length<2&&e.error("At least two types are expected in a union type but found less"),n.close=e.consume(")")||e.error("Unterminated union type"),type_suffix(e,r),r.this}class Type extends Base{static parse(e,t){return single_type(e,t)||union_type(e,t)}constructor({source:e,tokens:t}){super({source:e,tokens:t}),Object.defineProperty(this,"subtype",{value:[],writable:!0}),this.extAttrs=[]}get generic(){return this.subtype.length&&this.tokens.base?this.tokens.base.value:""}get nullable(){return Boolean(this.tokens.nullable)}get union(){return Boolean(this.subtype.length)&&!this.tokens.base}get idlType(){if(this.subtype.length)return this.subtype;return unescape([this.tokens.prefix,this.tokens.base,this.tokens.postfix].filter(e=>e).map(e=>e.value).join(" "))}*validate(e){const t=!this.union&&e.unique.get(this.idlType),n=this.union?this:t&&"typedef"===t.type?t.idlType:void 0;if(n&&this.nullable){const{reference:t}=idlTypeIncludesDictionary(n,e)||{};if(t){const e=(this.union?t:this).tokens.base,n="Nullable union cannot include a dictionary type";yield validationError(e,this,"no-nullable-union-dict",n)}}else for(const t of this.subtype)yield*t.validate(e)}}class Default extends Base{static parse(e){const t=e.consume("=");if(!t)return null;const n=const_value(e)||e.consume("string","null","[","{")||e.error("No value for default"),r=[n];if("["===n.type){const t=e.consume("]")||e.error("Default sequence value must be empty");r.push(t)}else if("{"===n.type){const t=e.consume("}")||e.error("Default dictionary value must be empty");r.push(t)}return new Default({source:e.source,tokens:{assign:t},expression:r})}constructor({source:e,tokens:t,expression:n}){super({source:e,tokens:t}),n.parent=this,Object.defineProperty(this,"expression",{value:n})}get type(){return const_data(this.expression[0]).type}get value(){return const_data(this.expression[0]).value}get negative(){return const_data(this.expression[0]).negative}}class ArrayBase extends Array{constructor({source:e,tokens:t}){super(),Object.defineProperties(this,{source:{value:e},tokens:{value:t},parent:{value:null,writable:!0}})}}class Token extends Base{static parser(e,t){return()=>{const n=e.consume(t);if(n)return new Token({source:e.source,tokens:{value:n}})}}get value(){return unescape(this.tokens.value.value)}}function tokens(e,t){return list(e,{parser:Token.parser(e,t),listName:t+" list"})}function identifiersOrStrings(e){let t=tokens(e,"identifier");return t.length?t:(t=tokens(e,"string"),t.length?t:void e.error("Expected identifiers or strings but none found"))}class ExtendedAttributeParameters extends Base{static parse(e){const t={assign:e.consume("=")},n=autoParenter(new ExtendedAttributeParameters({source:e.source,tokens:t}));return t.assign&&(t.secondaryName=e.consume("identifier","decimal","integer","string")),t.open=e.consume("("),t.open?(n.list=n.rhsIsList?identifiersOrStrings(e):argument_list(e),t.close=e.consume(")")||e.error("Unexpected token in extended attribute argument list")):n.hasRhs&&!t.secondaryName&&e.error("No right hand side to extended attribute assignment"),n.this}get rhsIsList(){return this.tokens.assign&&!this.tokens.secondaryName}get rhsType(){return this.rhsIsList?this.list[0].tokens.value.type+"-list":this.tokens.secondaryName?this.tokens.secondaryName.type:null}}class SimpleExtendedAttribute extends Base{static parse(e){const t=e.consume("identifier");if(t)return new SimpleExtendedAttribute({source:e.source,tokens:{name:t},params:ExtendedAttributeParameters.parse(e)})}constructor({source:e,tokens:t,params:n}){super({source:e,tokens:t}),n.parent=this,Object.defineProperty(this,"params",{value:n})}get type(){return"extended-attribute"}get name(){return this.tokens.name.value}get rhs(){const{rhsType:e,tokens:t,list:n}=this.params;return e?{type:e,value:this.params.rhsIsList?n:unescape(t.secondaryName.value)}:null}get arguments(){const{rhsIsList:e,list:t}=this.params;return!t||e?[]:t}*validate(e){if("NoInterfaceObject"===this.name){const e="`[NoInterfaceObject]` extended attribute is an undesirable feature that may be removed from Web IDL in the future. Refer to the [relevant upstream PR](https://github.com/heycam/webidl/pull/609) for more information.";yield validationError(this.tokens.name,this,"no-nointerfaceobject",e,{level:"warning"})}for(const t of this.arguments)yield*t.validate(e)}}class ExtendedAttributes extends ArrayBase{static parse(e){const t={};if(t.open=e.consume("["),!t.open)return new ExtendedAttributes({});const n=new ExtendedAttributes({source:e.source,tokens:t});return n.push(...list(e,{parser:SimpleExtendedAttribute.parse,listName:"extended attribute"})),t.close=e.consume("]")||e.error("Unexpected closing token of extended attribute"),n.length||e.error("Found an empty extended attribute"),e.probe("[")&&e.error("Illegal double extended attribute lists, consider merging them"),n}*validate(e){for(const t of this)yield*t.validate(e)}}class Argument extends Base{static parse(e){const t=e.position,n={},r=autoParenter(new Argument({source:e.source,tokens:n}));return r.extAttrs=ExtendedAttributes.parse(e),n.optional=e.consume("optional"),r.idlType=type_with_extended_attributes(e,"argument-type"),r.idlType?(n.optional||(n.variadic=e.consume("...")),n.name=e.consume("identifier",...argumentNameKeywords),n.name?(r.default=n.optional?Default.parse(e):null,r.this):e.unconsume(t)):e.unconsume(t)}get type(){return"argument"}get optional(){return!!this.tokens.optional}get variadic(){return!!this.tokens.variadic}get name(){return unescape(this.tokens.name.value)}*validate(e){yield*this.idlType.validate(e);const t=idlTypeIncludesDictionary(this.idlType,e,{useNullableInner:!0});if(t)if(this.idlType.nullable){const e="Dictionary arguments cannot be nullable.";yield validationError(this.tokens.name,this,"no-nullable-dict-arg",e)}else if(this.optional){if(!this.default){const e="Optional dictionary arguments must have a default value of `{}`.";yield validationError(this.tokens.name,this,"dict-arg-default",e,{autofix:autofixOptionalDictionaryDefaultValue(this)})}}else if(this.parent&&!dictionaryIncludesRequiredField(t.dictionary,e)&&isLastRequiredArgument(this)){const e="Dictionary argument must be optional if it has no required fields";yield validationError(this.tokens.name,this,"dict-arg-optional",e,{autofix:autofixDictionaryArgumentOptionality(this)})}}}function isLastRequiredArgument(e){const t=e.parent.arguments||e.parent.list,n=t.indexOf(e);return!t.slice(n+1).some(e=>!e.optional)}function autofixDictionaryArgumentOptionality(e){return()=>{const t=getFirstToken(e.idlType);e.tokens.optional={type:"optional",value:"optional",trivia:t.trivia},t.trivia=" ",autofixOptionalDictionaryDefaultValue(e)()}}function autofixOptionalDictionaryDefaultValue(e){return()=>{e.default=Default.parse(new Tokeniser(" = {}"))}}class Operation extends Base{static parse(e,{special:t,regular:n}={}){const r={special:t},o=autoParenter(new Operation({source:e.source,tokens:r}));return t&&"stringifier"===t.value&&(r.termination=e.consume(";"),r.termination)?(o.arguments=[],o):(t||n||(r.special=e.consume("getter","setter","deleter")),o.idlType=return_type(e)||e.error("Missing return type"),r.name=e.consume("identifier","includes"),r.open=e.consume("(")||e.error("Invalid operation"),o.arguments=argument_list(e),r.close=e.consume(")")||e.error("Unterminated operation"),r.termination=e.consume(";")||e.error("Unterminated operation, expected `;`"),o.this)}get type(){return"operation"}get name(){const{name:e}=this.tokens;return e?unescape(e.value):""}get special(){return this.tokens.special?this.tokens.special.value:""}*validate(e){if(!this.name&&["","static"].includes(this.special)){const e="Regular or static operations must have both a return type and an identifier.";yield validationError(this.tokens.open,this,"incomplete-op",e)}this.idlType&&(yield*this.idlType.validate(e));for(const t of this.arguments)yield*t.validate(e)}}class Attribute extends Base{static parse(e,{special:t,noInherit:n=!1,readonly:r=!1}={}){const o=e.position,i={special:t},s=autoParenter(new Attribute({source:e.source,tokens:i}));if(t||n||(i.special=e.consume("inherit")),"inherit"===s.special&&e.probe("readonly")&&e.error("Inherited attributes cannot be read-only"),i.readonly=e.consume("readonly"),r&&!i.readonly&&e.probe("attribute")&&e.error("Attributes must be readonly in this context"),i.base=e.consume("attribute"),i.base){switch(s.idlType=type_with_extended_attributes(e,"attribute-type")||e.error("Attribute lacks a type"),s.idlType.generic){case"sequence":case"record":e.error(`Attributes cannot accept ${s.idlType.generic} types`)}return i.name=e.consume("identifier","async","required")||e.error("Attribute lacks a name"),i.termination=e.consume(";")||e.error("Unterminated attribute, expected `;`"),s.this}e.unconsume(o)}get type(){return"attribute"}get special(){return this.tokens.special?this.tokens.special.value:""}get readonly(){return!!this.tokens.readonly}get name(){return unescape(this.tokens.name.value)}*validate(e){yield*this.idlType.validate(e)}}function unescape(e){return e.startsWith("_")?e.slice(1):e}function list(e,{parser:t,allowDangler:n,listName:r="list"}){const o=t(e);if(!o)return[];o.tokens.separator=e.consume(",");const i=[o];for(;o.tokens.separator;){const o=t(e);if(!o){n||e.error(`Trailing comma in ${r}`);break}if(o.tokens.separator=e.consume(","),i.push(o),!o.tokens.separator)break}return i}function const_value(e){return e.consume("true","false","Infinity","-Infinity","NaN","decimal","integer")}function const_data({type:e,value:t}){switch(e){case"true":case"false":return{type:"boolean",value:"true"===e};case"Infinity":case"-Infinity":return{type:"Infinity",negative:e.startsWith("-")};case"[":return{type:"sequence",value:[]};case"{":return{type:"dictionary"};case"decimal":case"integer":return{type:"number",value:t};case"string":return{type:"string",value:t.slice(1,-1)};default:return{type:e}}}function primitive_type(e){const{source:t}=e,n=function(){const n=e.consume("unsigned"),r=e.consume("short","long");if(r){const o=e.consume("long");return new Type({source:t,tokens:{prefix:n,base:r,postfix:o}})}n&&e.error("Failed to parse integer type")}()||function(){const n=e.consume("unrestricted"),r=e.consume("float","double");if(r)return new Type({source:t,tokens:{prefix:n,base:r}});n&&e.error("Failed to parse float type")}();if(n)return n;const r=e.consume("boolean","byte","octet");return r?new Type({source:t,tokens:{base:r}}):void 0}function argument_list(e){return list(e,{parser:Argument.parse,listName:"arguments list"})}function type_with_extended_attributes(e,t){const n=ExtendedAttributes.parse(e),r=Type.parse(e,t);return r&&(autoParenter(r).extAttrs=n),r}function return_type(e,t){const n=Type.parse(e,t||"return-type");if(n)return n;const r=e.consume("void");if(r){const t=new Type({source:e.source,tokens:{base:r}});return t.type="return-type",t}}function stringifier(e){const t=e.consume("stringifier");if(t)return Attribute.parse(e,{special:t})||Operation.parse(e,{special:t})||e.error("Unterminated stringifier")}function getLastIndentation(e){const t=e.split("\n");if(t.length){const e=t[t.length-1].match(/^\s+/);if(e)return e[0]}return""}function getMemberIndentation(e){const t=getLastIndentation(e),n=t.includes("\t")?"\t":"  ";return t+n}function autofixAddExposedWindow(e){return()=>{if(e.extAttrs.length){const t=new Tokeniser("Exposed=Window,"),n=SimpleExtendedAttribute.parse(t);n.tokens.separator=t.consume(",");const r=e.extAttrs[0];/^\s/.test(r.tokens.name.trivia)||(r.tokens.name.trivia=` ${r.tokens.name.trivia}`),e.extAttrs.unshift(n)}else{autoParenter(e).extAttrs=ExtendedAttributes.parse(new Tokeniser("[Exposed=Window]"));const t=e.tokens.base.trivia;e.extAttrs.tokens.open.trivia=t,e.tokens.base.trivia=`\n${getLastIndentation(t)}`}}}function getFirstToken(e){if(e.extAttrs.length)return e.extAttrs.tokens.open;if("operation"===e.type&&!e.special)return getFirstToken(e.idlType);return Object.values(e.tokens).sort((e,t)=>e.index-t.index)[0]}function findLastIndex(e,t){const n=e.slice().reverse().findIndex(t);return-1===n?n:e.length-n-1}function autoParenter(e,t){return t||(t=e),e?new Proxy(e,{get(e,t){const n=e[t];return Array.isArray(n)?autoParenter(n,e):n},set(e,n,r){if(e[n]=r,!r)return!0;if(Array.isArray(r))for(const e of r)void 0!==e.parent&&(e.parent=t);else void 0!==r.parent&&(r.parent=t);return!0}}):e}const tokenRe={decimal:/-?(?=[0-9]*\.|[0-9]+[eE])(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][-+]?[0-9]+)?|[0-9]+[Ee][-+]?[0-9]+)/y,integer:/-?(0([Xx][0-9A-Fa-f]+|[0-7]*)|[1-9][0-9]*)/y,identifier:/[_-]?[A-Za-z][0-9A-Z_a-z-]*/y,string:/"[^"]*"/y,whitespace:/[\t\n\r ]+/y,comment:/((\/(\/.*|\*([^*]|\*[^/])*\*\/)[\t\n\r ]*)+)/y,other:/[^\t\n\r 0-9A-Za-z]/y},typeNameKeywords=["ArrayBuffer","DataView","Int8Array","Int16Array","Int32Array","Uint8Array","Uint16Array","Uint32Array","Uint8ClampedArray","Float32Array","Float64Array","any","object","symbol"],stringTypes=["ByteString","DOMString","USVString"],argumentNameKeywords=["async","attribute","callback","const","constructor","deleter","dictionary","enum","getter","includes","inherit","interface","iterable","maplike","namespace","partial","required","setlike","setter","static","stringifier","typedef","unrestricted"],nonRegexTerminals=["-Infinity","FrozenArray","Infinity","NaN","Promise","boolean","byte","double","false","float","long","mixin","null","octet","optional","or","readonly","record","sequence","short","true","unsigned","void"].concat(argumentNameKeywords,stringTypes,typeNameKeywords),punctuations=["(",")",",","...",":",";","<","=",">","?","[","]","{","}"],reserved=["_constructor","toString","_toString"];function tokenise(e){const t=[];let n=0,r="",o=1,i=0;for(;n<e.length;){const a=e.charAt(n);let c=-1;if(/[\t\n\r ]/.test(a)?c=s("whitespace",{noFlushTrivia:!0}):"/"===a&&(c=s("comment",{noFlushTrivia:!0})),-1!==c){const e=t.pop().value;o+=(e.match(/\n/g)||[]).length,r+=e,i-=1}else if(/[-0-9.A-Z_a-z]/.test(a)){if(c=s("decimal"),-1===c&&(c=s("integer")),-1===c){c=s("identifier");const e=t.length-1,n=t[e];if(-1!==c){if(reserved.includes(n.value)){const r=`${unescape(n.value)} is a reserved identifier and must not be used.`;throw new WebIDLParseError(syntaxError(t,e,null,r))}nonRegexTerminals.includes(n.value)&&(n.type=n.value)}}}else'"'===a&&(c=s("string"));for(const s of punctuations)if(e.startsWith(s,n)){t.push({type:s,value:s,trivia:r,line:o,index:i}),r="",n+=s.length,c=n;break}if(-1===c&&(c=s("other")),-1===c)throw new Error("Token stream not progressing");n=c,i+=1}return t.push({type:"eof",value:"",trivia:r}),t;function s(s,{noFlushTrivia:a}={}){const c=tokenRe[s];c.lastIndex=n;const l=c.exec(e);return l?(t.push({type:s,value:l[0],trivia:r,line:o,index:i}),a||(r=""),c.lastIndex):-1}}class Tokeniser{constructor(e){this.source=tokenise(e),this.position=0}error(e){throw new WebIDLParseError(syntaxError(this.source,this.position,this.current,e))}probe(e){return this.source.length>this.position&&this.source[this.position].type===e}consume(...e){for(const t of e){if(!this.probe(t))continue;const e=this.source[this.position];return this.position++,e}}unconsume(e){this.position=e}}class WebIDLParseError extends Error{constructor({message:e,bareMessage:t,context:n,line:r,sourceName:o,input:i,tokens:s}){super(e),this.name="WebIDLParseError",this.bareMessage=t,this.context=n,this.line=r,this.sourceName=o,this.input=i,this.tokens=s}}class EnumValue extends Token{static parse(e){const t=e.consume("string");if(t)return new EnumValue({source:e.source,tokens:{value:t}})}get type(){return"enum-value"}get value(){return super.value.slice(1,-1)}}class Enum extends Base{static parse(e){const t={};if(t.base=e.consume("enum"),!t.base)return;t.name=e.consume("identifier")||e.error("No name for enum");const n=autoParenter(new Enum({source:e.source,tokens:t}));return e.current=n.this,t.open=e.consume("{")||e.error("Bodyless enum"),n.values=list(e,{parser:EnumValue.parse,allowDangler:!0,listName:"enumeration"}),e.probe("string")&&e.error("No comma between enum values"),t.close=e.consume("}")||e.error("Unexpected value in enum"),n.values.length||e.error("No value in enum"),t.termination=e.consume(";")||e.error("No semicolon after enum"),n.this}get type(){return"enum"}get name(){return unescape(this.tokens.name.value)}}class Includes extends Base{static parse(e){const t=e.consume("identifier");if(!t)return;const n={target:t};if(n.includes=e.consume("includes"),n.includes)return n.mixin=e.consume("identifier")||e.error("Incomplete includes statement"),n.termination=e.consume(";")||e.error("No terminating ; for includes statement"),new Includes({source:e.source,tokens:n});e.unconsume(t.index)}get type(){return"includes"}get target(){return unescape(this.tokens.target.value)}get includes(){return unescape(this.tokens.mixin.value)}}class Typedef extends Base{static parse(e){const t={},n=autoParenter(new Typedef({source:e.source,tokens:t}));if(t.base=e.consume("typedef"),t.base)return n.idlType=type_with_extended_attributes(e,"typedef-type")||e.error("Typedef lacks a type"),t.name=e.consume("identifier")||e.error("Typedef lacks a name"),e.current=n.this,t.termination=e.consume(";")||e.error("Unterminated typedef, expected `;`"),n.this}get type(){return"typedef"}get name(){return unescape(this.tokens.name.value)}*validate(e){yield*this.idlType.validate(e)}}class CallbackFunction extends Base{static parse(e,t){const n={base:t},r=autoParenter(new CallbackFunction({source:e.source,tokens:n}));return n.name=e.consume("identifier")||e.error("Callback lacks a name"),e.current=r.this,n.assign=e.consume("=")||e.error("Callback lacks an assignment"),r.idlType=return_type(e)||e.error("Callback lacks a return type"),n.open=e.consume("(")||e.error("Callback lacks parentheses for arguments"),r.arguments=argument_list(e),n.close=e.consume(")")||e.error("Unterminated callback"),n.termination=e.consume(";")||e.error("Unterminated callback, expected `;`"),r.this}get type(){return"callback"}get name(){return unescape(this.tokens.name.value)}*validate(e){yield*this.idlType.validate(e)}}function inheritance(e){const t=e.consume(":");return t?{colon:t,inheritance:e.consume("identifier")||e.error("Inheritance lacks a type")}:{}}class Container extends Base{static parse(e,t,{type:n,inheritable:r,allowedMembers:o}){const{tokens:i}=t;for(i.name=e.consume("identifier")||e.error(`Missing name in ${t.type}`),e.current=t,t=autoParenter(t),r&&Object.assign(i,inheritance(e)),i.open=e.consume("{")||e.error(`Bodyless ${n}`),t.members=[];;){if(i.close=e.consume("}"),i.close)return i.termination=e.consume(";")||e.error(`Missing semicolon after ${n}`),t.this;const r=ExtendedAttributes.parse(e);let s;for(const[t,...n]of o)if(s=autoParenter(t(e,...n)),s)break;s||e.error("Unknown member"),s.extAttrs=r,t.members.push(s.this)}}get partial(){return!!this.tokens.partial}get name(){return unescape(this.tokens.name.value)}get inheritance(){return this.tokens.inheritance?unescape(this.tokens.inheritance.value):null}*validate(e){for(const t of this.members)t.validate&&(yield*t.validate(e))}}class Constant extends Base{static parse(e){const t={};if(t.base=e.consume("const"),!t.base)return;let n=primitive_type(e);if(!n){const t=e.consume("identifier")||e.error("Const lacks a type");n=new Type({source:e.source,tokens:{base:t}})}e.probe("?")&&e.error("Unexpected nullable constant type"),n.type="const-type",t.name=e.consume("identifier")||e.error("Const lacks a name"),t.assign=e.consume("=")||e.error("Const lacks value assignment"),t.value=const_value(e)||e.error("Const lacks a value"),t.termination=e.consume(";")||e.error("Unterminated const, expected `;`");const r=new Constant({source:e.source,tokens:t});return autoParenter(r).idlType=n,r}get type(){return"const"}get name(){return unescape(this.tokens.name.value)}get value(){return const_data(this.tokens.value)}}class IterableLike extends Base{static parse(e){const t=e.position,n={},r=autoParenter(new IterableLike({source:e.source,tokens:n}));if(n.readonly=e.consume("readonly"),n.readonly||(n.async=e.consume("async")),n.base=n.readonly?e.consume("maplike","setlike"):n.async?e.consume("iterable"):e.consume("iterable","maplike","setlike"),!n.base)return void e.unconsume(t);const{type:o}=r,i="maplike"===o||r.async,s=i||"iterable"===o;n.open=e.consume("<")||e.error(`Missing less-than sign \`<\` in ${o} declaration`);const a=type_with_extended_attributes(e)||e.error(`Missing a type argument in ${o} declaration`);return r.idlType=[a],s&&(a.tokens.separator=e.consume(","),a.tokens.separator?r.idlType.push(type_with_extended_attributes(e)):i&&e.error(`Missing second type argument in ${o} declaration`)),n.close=e.consume(">")||e.error(`Missing greater-than sign \`>\` in ${o} declaration`),n.termination=e.consume(";")||e.error(`Missing semicolon after ${o} declaration`),r.this}get type(){return this.tokens.base.value}get readonly(){return!!this.tokens.readonly}get async(){return!!this.tokens.async}}function*checkInterfaceMemberDuplication(e,t){const n=new Set(s(t).map(e=>e.name)),r=e.partials.get(t.name)||[],o=e.mixinMap.get(t.name)||[];for(const e of[...r,...o]){const r=s(e);yield*i(r,n,e,t);for(const e of r)n.add(e.name)}function*i(e,t,n,r){for(const o of e){const{name:e}=o;if(e&&t.has(e)){const t=`The operation "${e}" has already been defined for the base interface "${r.name}" either in itself or in a mixin`;yield validationError(o.tokens.name,n,"no-cross-overload",t)}}}function s(e){return e.members.filter(({type:e})=>"operation"===e)}}class Constructor extends Base{static parse(e){const t=e.consume("constructor");if(!t)return;const n={base:t};n.open=e.consume("(")||e.error("No argument list in constructor");const r=argument_list(e);n.close=e.consume(")")||e.error("Unterminated constructor"),n.termination=e.consume(";")||e.error("No semicolon after constructor");const o=new Constructor({source:e.source,tokens:n});return autoParenter(o).arguments=r,o}get type(){return"constructor"}*validate(e){this.idlType&&(yield*this.idlType.validate(e));for(const t of this.arguments)yield*t.validate(e)}}function static_member(e){const t=e.consume("static");if(t)return Attribute.parse(e,{special:t})||Operation.parse(e,{special:t})||e.error("No body in static member")}class Interface extends Container{static parse(e,t,{partial:n=null}={}){const r={partial:n,base:t};return Container.parse(e,new Interface({source:e.source,tokens:r}),{type:"interface",inheritable:!n,allowedMembers:[[Constant.parse],[Constructor.parse],[static_member],[stringifier],[IterableLike.parse],[Attribute.parse],[Operation.parse]]})}get type(){return"interface"}*validate(e){if(yield*this.extAttrs.validate(e),!this.partial&&this.extAttrs.every(e=>"Exposed"!==e.name)&&this.extAttrs.every(e=>"NoInterfaceObject"!==e.name)){const e="Interfaces must have `[Exposed]` extended attribute. To fix, add, for example, `[Exposed=Window]`. Please also consider carefully if your interface should also be exposed in a Worker scope. Refer to the [WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) for more information.";yield validationError(this.tokens.name,this,"require-exposed",e,{autofix:autofixAddExposedWindow(this)})}const t=this.extAttrs.filter(e=>"Constructor"===e.name);for(const e of t){const t="Constructors should now be represented as a `constructor()` operation on the interface instead of `[Constructor]` extended attribute. Refer to the [WebIDL spec section on constructor operations](https://heycam.github.io/webidl/#idl-constructors) for more information.";yield validationError(e.tokens.name,this,"constructor-member",t,{autofix:autofixConstructor(this,e)})}if(this.extAttrs.some(e=>"Global"===e.name)){const e=this.extAttrs.filter(e=>"NamedConstructor"===e.name);for(const t of e){const e="Interfaces marked as `[Global]` cannot have named constructors.";yield validationError(t.tokens.name,this,"no-constructible-global",e)}const t=this.members.filter(e=>"constructor"===e.type);for(const e of t){const t="Interfaces marked as `[Global]` cannot have constructors.";yield validationError(e.tokens.base,this,"no-constructible-global",t)}}yield*super.validate(e),this.partial||(yield*checkInterfaceMemberDuplication(e,this))}}function autofixConstructor(e,t){return e=autoParenter(e),()=>{const n=getLastIndentation(e.extAttrs.tokens.open.trivia),r=e.members.length?getLastIndentation(getFirstToken(e.members[0]).trivia):getMemberIndentation(n),o=Constructor.parse(new Tokeniser(`\n${r}constructor();`));o.extAttrs=[],autoParenter(o).arguments=t.arguments;const i=findLastIndex(e.members,e=>"constructor"===e.type);e.members.splice(i+1,0,o);const{close:s}=e.tokens;s.trivia.includes("\n")||(s.trivia+=`\n${n}`);const{extAttrs:a}=e,c=a.indexOf(t),l=a.splice(c,1);a.length?a.length===c?a[c-1].tokens.separator=void 0:a[c].tokens.name.trivia.trim()||(a[c].tokens.name.trivia=l[0].tokens.name.trivia):a.tokens.open=a.tokens.close=void 0}}class Mixin extends Container{static parse(e,t,{partial:n}={}){const r={partial:n,base:t};if(r.mixin=e.consume("mixin"),r.mixin)return Container.parse(e,new Mixin({source:e.source,tokens:r}),{type:"interface mixin",allowedMembers:[[Constant.parse],[stringifier],[Attribute.parse,{noInherit:!0}],[Operation.parse,{regular:!0}]]})}get type(){return"interface mixin"}}class Field extends Base{static parse(e){const t={},n=autoParenter(new Field({source:e.source,tokens:t}));return n.extAttrs=ExtendedAttributes.parse(e),t.required=e.consume("required"),n.idlType=type_with_extended_attributes(e,"dictionary-type")||e.error("Dictionary member lacks a type"),t.name=e.consume("identifier")||e.error("Dictionary member lacks a name"),n.default=Default.parse(e),t.required&&n.default&&e.error("Required member must not have a default"),t.termination=e.consume(";")||e.error("Unterminated dictionary member, expected `;`"),n.this}get type(){return"field"}get name(){return unescape(this.tokens.name.value)}get required(){return!!this.tokens.required}*validate(e){yield*this.idlType.validate(e)}}class Dictionary extends Container{static parse(e,{partial:t}={}){const n={partial:t};if(n.base=e.consume("dictionary"),n.base)return Container.parse(e,new Dictionary({source:e.source,tokens:n}),{type:"dictionary",inheritable:!t,allowedMembers:[[Field.parse]]})}get type(){return"dictionary"}}class Namespace extends Container{static parse(e,{partial:t}={}){const n={partial:t};if(n.base=e.consume("namespace"),n.base)return Container.parse(e,new Namespace({source:e.source,tokens:n}),{type:"namespace",allowedMembers:[[Attribute.parse,{noInherit:!0,readonly:!0}],[Operation.parse,{regular:!0}]]})}get type(){return"namespace"}*validate(e){if(!this.partial&&this.extAttrs.every(e=>"Exposed"!==e.name)){const e="Namespaces must have [Exposed] extended attribute. To fix, add, for example, [Exposed=Window]. Please also consider carefully if your namespace should also be exposed in a Worker scope. Refer to the [WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) for more information.";yield validationError(this.tokens.name,this,"require-exposed",e,{autofix:autofixAddExposedWindow(this)})}yield*super.validate(e)}}class CallbackInterface extends Container{static parse(e,t,{partial:n=null}={}){const r={callback:t};if(r.base=e.consume("interface"),r.base)return Container.parse(e,new CallbackInterface({source:e.source,tokens:r}),{type:"callback interface",inheritable:!n,allowedMembers:[[Constant.parse],[Operation.parse,{regular:!0}]]})}get type(){return"callback interface"}}function parseByTokens(e,t){const n=e.source;function r(t){e.error(t)}function o(...t){return e.consume(...t)}function i(t){const n=o("interface");if(n)return Mixin.parse(e,n,t)||Interface.parse(e,n,t)||r("Interface has no proper body")}function s(){return function(){const t=o("callback");if(t)return e.probe("interface")?CallbackInterface.parse(e,t):CallbackFunction.parse(e,t)}()||i()||function(){const t=o("partial");if(t)return Dictionary.parse(e,{partial:t})||i({partial:t})||Namespace.parse(e,{partial:t})||r("Partial doesn't apply to anything")}()||Dictionary.parse(e)||Enum.parse(e)||Typedef.parse(e)||Includes.parse(e)||Namespace.parse(e)}const a=function(){if(!n.length)return[];const i=[];for(;;){const t=ExtendedAttributes.parse(e),n=s();if(!n){t.length&&r("Stray extended attributes");break}autoParenter(n).extAttrs=t,i.push(n)}const a=o("eof");return t.concrete&&i.push(a),i}();return e.position<n.length&&r("Unrecognised tokens"),a}function parse(e,t={}){const n=new Tokeniser(e);return void 0!==t.sourceName&&(n.source.name=t.sourceName),parseByTokens(n,t)}function noop(e){return e}const templates={wrap:e=>e.join(""),trivia:noop,name:noop,reference:noop,type:noop,generic:noop,nameless:noop,inheritance:noop,definition:noop,extendedAttribute:noop,extendedAttributeReference:noop};function write(e,{templates:t=templates}={}){function n(e,{unescaped:n,context:r}){return n||(n=e.startsWith("_")?e.slice(1):e),t.reference(e,n,r)}function r(e,n=noop,...r){if(!e)return"";const o=n(e.value,...r);return t.wrap([t.trivia(e.trivia),o])}function o(e,t){return r(e,n,{context:t})}function i(e,n){return r(e,t.name,n)}function s(e){if(e.union||e.generic)return t.wrap([r(e.tokens.base,t.generic),r(e.tokens.open),...e.subtype.map(a),r(e.tokens.close)]);const o=e.tokens.prefix||e.tokens.base,i=e.tokens.prefix?[e.tokens.prefix.value,t.trivia(e.tokens.base.trivia)]:[],s=n(t.wrap([...i,e.tokens.base.value,r(e.tokens.postfix)]),{unescaped:e.idlType,context:e});return t.wrap([t.trivia(o.trivia),s])}function a(e){return t.wrap([p(e.extAttrs),s(e),r(e.tokens.nullable),r(e.tokens.separator)])}function c(e){return e?t.wrap([r(e.tokens.assign),...e.expression.map(e=>r(e))]):""}function l(e){return t.wrap([p(e.extAttrs),r(e.tokens.optional),t.type(a(e.idlType)),r(e.tokens.variadic),i(e.tokens.name,{data:e}),c(e.default),r(e.tokens.separator)])}function u(e){return t.wrap([r(e.tokens.value),r(e.tokens.separator)])}function d(e){const{rhsType:n}=e.params;return t.wrap([t.trivia(e.tokens.name.trivia),t.extendedAttribute(t.wrap([t.extendedAttributeReference(e.name),r(e.params.tokens.assign),o(e.params.tokens.secondaryName,e),r(e.params.tokens.open),...e.params.list?e.params.list.map("identifier-list"===n?n=>(function(e,n){return t.wrap([o(e.tokens.value,n),r(e.tokens.separator)])})(n,e):"string-list"===n?u:l):[],r(e.params.tokens.close)])),r(e.tokens.separator)])}function p(e){return e.length?t.wrap([r(e.tokens.open),...e.map(d),r(e.tokens.close)]):""}function h(e){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.callback),r(e.tokens.partial),r(e.tokens.base),r(e.tokens.mixin),i(e.tokens.name,{data:e}),(o=e,o.tokens.inheritance?t.wrap([r(o.tokens.colon),t.trivia(o.tokens.inheritance.trivia),t.inheritance(n(o.tokens.inheritance.value,{context:o}))]):""),r(e.tokens.open),g(e.members,e),r(e.tokens.close),r(e.tokens.termination)]),{data:e});var o}function f(e,n){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.readonly),r(e.tokens.async),r(e.tokens.base,t.generic),r(e.tokens.open),t.wrap(e.idlType.map(a)),r(e.tokens.close),r(e.tokens.termination)]),{data:e,parent:n})}t=Object.assign({},templates,t);const m={interface:h,"interface mixin":h,namespace:h,operation:function(e,n){const o=e.idlType?[t.type(a(e.idlType)),i(e.tokens.name,{data:e,parent:n}),r(e.tokens.open),t.wrap(e.arguments.map(l)),r(e.tokens.close)]:[];return t.definition(t.wrap([p(e.extAttrs),e.tokens.name?r(e.tokens.special):r(e.tokens.special,t.nameless,{data:e,parent:n}),...o,r(e.tokens.termination)]),{data:e,parent:n})},attribute:function(e,n){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.special),r(e.tokens.readonly),r(e.tokens.base),t.type(a(e.idlType)),i(e.tokens.name,{data:e,parent:n}),r(e.tokens.termination)]),{data:e,parent:n})},constructor:function(e,n){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.base,t.nameless,{data:e,parent:n}),r(e.tokens.open),t.wrap(e.arguments.map(l)),r(e.tokens.close),r(e.tokens.termination)]),{data:e,parent:n})},dictionary:h,field:function(e,n){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.required),t.type(a(e.idlType)),i(e.tokens.name,{data:e,parent:n}),c(e.default),r(e.tokens.termination)]),{data:e,parent:n})},const:function(e,n){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.base),t.type(a(e.idlType)),i(e.tokens.name,{data:e,parent:n}),r(e.tokens.assign),r(e.tokens.value),r(e.tokens.termination)]),{data:e,parent:n})},typedef:function(e){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.base),t.type(a(e.idlType)),i(e.tokens.name,{data:e}),r(e.tokens.termination)]),{data:e})},includes:function(e){return t.definition(t.wrap([p(e.extAttrs),o(e.tokens.target,e),r(e.tokens.includes),o(e.tokens.mixin,e),r(e.tokens.termination)]),{data:e})},callback:function(e){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.base),i(e.tokens.name,{data:e}),r(e.tokens.assign),t.type(a(e.idlType)),r(e.tokens.open),...e.arguments.map(l),r(e.tokens.close),r(e.tokens.termination)]),{data:e})},enum:function(e){return t.definition(t.wrap([p(e.extAttrs),r(e.tokens.base),i(e.tokens.name,{data:e}),r(e.tokens.open),g(e.values,e),r(e.tokens.close),r(e.tokens.termination)]),{data:e})},"enum-value":function(e,n){return t.wrap([t.trivia(e.tokens.value.trivia),t.definition(t.wrap(['"',t.name(e.value,{data:e,parent:n}),'"']),{data:e,parent:n}),r(e.tokens.separator)])},iterable:f,maplike:f,setlike:f,"callback interface":h,eof:function(e){return t.trivia(e.trivia)}};function g(e,n){if(!e)return;const r=e.map(e=>(function(e,t){if(!m[e.type])throw new Error(`Type "${e.type}" is unsupported`);return m[e.type](e,t)})(e,n));return t.wrap(r)}return g(e)}function getMixinMap(e,t){const n=new Map,r=e.filter(e=>"includes"===e.type);for(const e of r){const r=t.get(e.includes);if(!r)continue;const o=n.get(e.target);o?o.push(r):n.set(e.target,[r])}return n}function groupDefinitions(e){const t=new Map,n=new Set,r=new Map;for(const o of e)if(o.partial){const e=r.get(o.name);e?e.push(o):r.set(o.name,[o])}else o.name&&(t.has(o.name)?n.add(o):t.set(o.name,o));return{all:e,unique:t,partials:r,duplicates:n,mixinMap:getMixinMap(e,t),cache:{typedefIncludesDictionary:new WeakMap,dictionaryIncludesRequiredField:new WeakMap}}}function*checkDuplicatedNames({unique:e,duplicates:t}){for(const n of t){const{name:t}=n,r=`The name "${t}" of type "${e.get(t).type}" was already seen`;yield validationError(n.tokens.name,n,"no-duplicate",r)}}function*validateIterable(e){const t=groupDefinitions(e);for(const e of t.all)e.validate&&(yield*e.validate(t));yield*checkDuplicatedNames(t)}function flatten(e){return e.flat?e.flat():[].concat(...e)}function validate(e){return[...validateIterable(flatten(e))]}var _webidl2=Object.freeze({__proto__:null,parse:parse,write:write,validate:validate,WebIDLParseError:WebIDLParseError}),hyperHTML=function(e){/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap}catch(u){t.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,o=i.prototype;return o.delete=function(e){return this.has(e)&&delete e[this._]},o.get=function(e){return this.has(e)?e[this._]:void 0},o.has=function(e){return r.call(e,this._)},o.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},i;function i(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(s,this)}function s(e){this.set(e[0],e[1])}}(Math.random(),Object)}var n=t.WeakMap,r={};
/*! (c) Andrea Giammarchi - ISC */try{r.WeakSet=WeakSet}catch(u){!function(e,t){var n=o.prototype;function o(){t(this,"_",{value:"_@ungap/weakmap"+e++})}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},r.WeakSet=o}(Math.random(),Object.defineProperty)}function o(e,t,n,r,o,i){for(var s=("selectedIndex"in t),a=s;r<o;){var c=e(n[r],1);if(t.insertBefore(c,i),s&&a&&c.selected){a=!a;var l=t.selectedIndex;t.selectedIndex=l<0?r:d.call(t.querySelectorAll("option"),c)}r++}}function i(e,t){return e==t}function s(e){return e}function a(e,t,n,r,o,i,s){var a=i-o;if(a<1)return-1;for(;a<=n-t;){for(var c=t,l=o;c<n&&l<i&&s(e[c],r[l]);)c++,l++;if(l===i)return t;t=c+1}return-1}function c(e,t,n,r,o){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:o}function l(e,t,n,r){for(;n<r;)h(e(t[n++],-1))}var u=r.WeakSet,d=[].indexOf,p=function(e,t,n){for(var r=1,o=t;r<o;){var i=(r+o)/2>>>0;n<e[i]?o=i:r=1+i}return r},h=function(e){return(e.remove||function(){var e=this.parentNode;e&&e.removeChild(this)}
/*! (c) 2018 Andrea Giammarchi (ISC) */).call(e)};function f(e,t,n,r){for(var u=(r=r||{}).compare||i,d=r.node||s,h=null==r.before?null:d(r.before,0),f=t.length,m=f,g=0,b=n.length,y=0;g<m&&y<b&&u(t[g],n[y]);)g++,y++;for(;g<m&&y<b&&u(t[m-1],n[b-1]);)m--,b--;var $=g===m,w=y===b;if($&&w)return n;if($&&y<b)return o(d,e,n,y,b,c(d,t,g,f,h)),n;if(w&&g<m)return l(d,t,g,m),n;var v=m-g,k=b-y,x=-1;if(v<k){if(-1<(x=a(n,y,b,t,g,m,u)))return o(d,e,n,y,x,d(t[g],0)),o(d,e,n,x+v,b,c(d,t,m,f,h)),n}else if(k<v&&-1<(x=a(t,g,m,n,y,b,u)))return l(d,t,g,x),l(d,t,x+k,m),n;return v<2||k<2?(o(d,e,n,y,b,d(t[g],0)),l(d,t,g,m)):v==k&&function(e,t,n,r,o,i){for(;r<o&&i(n[r],e[t-1]);)r++,t--;return 0===t}(n,b,t,g,m,u)?o(d,e,n,y,b,c(d,t,m,f,h)):function(e,t,n,r,i,s,a,c,u,d,h,f,m){!function(e,t,n,r,i,s,a,c,u){for(var d=[],p=e.length,h=a,f=0;f<p;)switch(e[f++]){case 0:i++,h++;break;case 1:d.push(r[i]),o(t,n,r,i++,i,h<c?t(s[h],0):u);break;case-1:h++}for(f=0;f<p;)switch(e[f++]){case 0:a++;break;case-1:-1<d.indexOf(s[a])?a++:l(t,s,a++,a)}}(function(e,t,n,r,o,i,s){var a,c,l,u,d,p,h,f=n+i,m=[];e:for(a=0;a<=f;a++){if(50<a)return null;for(h=a-1,d=a?m[a-1]:[0,0],p=m[a]=[],c=-a;c<=a;c+=2){for(l=(u=c===-a||c!==a&&d[h+c-1]<d[h+c+1]?d[h+c+1]:d[h+c-1]+1)-c;u<i&&l<n&&s(r[o+u],e[t+l]);)u++,l++;if(u===i&&l===n)break e;p[a+c]=u}}var g=Array(a/2+f/2),b=g.length-1;for(a=m.length-1;0<=a;a--){for(;0<u&&0<l&&s(r[o+u-1],e[t+l-1]);)g[b--]=0,u--,l--;if(!a)break;h=a-1,d=a?m[a-1]:[0,0],(c=u-l)==-a||c!==a&&d[h+c-1]<d[h+c+1]?(l--,g[b--]=1):(u--,g[b--]=-1)}return g}(n,r,s,a,c,d,f)||function(e,t,n,r,o,i,s,a){var c=0,l=r<a?r:a,u=Array(l++),d=Array(l);d[0]=-1;for(var h=1;h<l;h++)d[h]=s;for(var f=o.slice(i,s),m=t;m<n;m++){var g=f.indexOf(e[m]);if(-1<g){var b=g+i;-1<(c=p(d,l,b))&&(d[c]=b,u[c]={newi:m,oldi:b,prev:u[c-1]})}}for(c=--l,--s;d[c]>s;)--c;l=a+r-c;var y=Array(l),$=u[c];for(--n;$;){for(var w=$.newi,v=$.oldi;w<n;)y[--l]=1,--n;for(;v<s;)y[--l]=-1,--s;y[--l]=0,--n,--s,$=$.prev}for(;t<=n;)y[--l]=1,--n;for(;i<=s;)y[--l]=-1,--s;return y}(n,r,i,s,a,c,u,d),e,t,n,r,a,c,h,m)}(d,e,n,y,b,k,t,g,m,v,f,u,h),n}var m={};
/*! (c) Andrea Giammarchi - ISC */function g(t,n){n=n||{};var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!!n.bubbles,!!n.cancelable,n.detail),r}m.CustomEvent="function"==typeof CustomEvent?CustomEvent:(g["prototype"]=new g("").constructor.prototype,g);var b=m.CustomEvent,y={};
/*! (c) Andrea Giammarchi - ISC */try{y.Map=Map}catch(u){y.Map=function(){var e=0,t=[],n=[];return{delete:function(o){var i=r(o);return i&&(t.splice(e,1),n.splice(e,1)),i},forEach:function(e,r){t.forEach((function(t,o){e.call(r,n[o],t,this)}),this)},get:function(t){return r(t)?n[e]:void 0},has:function(e){return r(e)},set:function(o,i){return n[r(o)?e:t.push(o)-1]=i,this}};function r(n){return-1<(e=t.indexOf(n))}}}var $=y.Map;function w(){return this}function v(e,t){var n="_"+e+"$";return{get:function(){return this[n]||k(this,n,t.call(this,e))},set:function(e){k(this,n,e)}}}var k=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(w.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var x,T,L,C,S,_,E={},R={},A=[],D=R.hasOwnProperty,I=0,M={attributes:E,define:function(e,t){e.indexOf("-")<0?(e in R||(I=A.push(e)),R[e]=t):E[e]=t},invoke:function(e,t){for(var n=0;n<I;n++){var r=A[n];if(D.call(e,r))return R[r](e[r],t)}}},P=Array.isArray||(T=(x={}.toString).call([]),function(e){return x.call(e)===T}),N=(L=e,C="fragment",_="content"in O(S="template")?function(e){var t=O(S);return t.innerHTML=e,t.content}:function(e){var t=O(C),n=O(S),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var o=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(o)}else n.innerHTML=e,r=n.childNodes;return H(t,r),t},function(e,t){return("svg"===t?function(e){var t=O(C),n=O("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",H(t,n.firstChild.childNodes),t}:_)(e)});function H(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function O(e){return e===C?L.createDocumentFragment():L.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */var j,W,U,F,z,B,q,G,V,Z=(W="appendChild",U="cloneNode",F="createTextNode",B=(z="importNode")in(j=e),(q=j.createDocumentFragment())[W](j[F]("g")),q[W](j[F]("")),(B?j[z](q,!0):q[U](!0)).childNodes.length<2?function e(t,n){for(var r=t[U](),o=t.childNodes||[],i=o.length,s=0;n&&s<i;s++)r[W](e(o[s],n));return r}:B?j[z]:function(e,t){return e[U](!!t)}),Y="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},K="-"+Math.random().toFixed(6)+"%",J=!1;try{G=e.createElement("template"),V="tabindex","content"in G&&(G.innerHTML="<p "+V+'="'+K+'"></p>',G.content.childNodes[0].getAttribute(V)==K)||(K="_dt: "+K.slice(1,-1)+";",J=!0)}catch(u){}var X="\x3c!--"+K+"--\x3e",Q=8,ee=1,te=3,ne=/^(?:style|textarea)$/i,re=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,oe=" \\f\\n\\r\\t",ie="[^"+oe+"\\/>\"'=]+",se="["+oe+"]+"+ie,ae="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",ce="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ie.replace("\\/","")+"))?)",le=new RegExp(ae+se+ce+"+)(["+oe+"]*/?>)","g"),ue=new RegExp(ae+se+ce+"*)(["+oe+"]*/>)","g"),de=new RegExp("("+se+"\\s*=\\s*)(['\"]?)"+X+"\\2","gi");function pe(e,t,n,r){return"<"+t+n.replace(de,he)+r}function he(e,t,n){return t+(n||'"')+K+(n||'"')}function fe(e,t,n){return re.test(t)?e:"<"+t+n+"></"+t+">"}var me=J?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort((function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1}))}:function(e,t){return t.slice.call(e,0)};function ge(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function be(t,n,r,o){for(var i=t.attributes,s=[],a=[],c=me(i,r),l=c.length,u=0;u<l;){var d,p=c[u++],h=p.value===K;if(h||1<(d=p.value.split(X)).length){var f=p.name;if(s.indexOf(f)<0){s.push(f);var m=r.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+f+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),g=i[m]||i[m.toLowerCase()];if(h)n.push(ye(g,o,m,null));else{for(var b=d.length-2;b--;)r.shift();n.push(ye(g,o,m,d))}}a.push(p)}}for(var y=((u=0)<(l=a.length)&&J&&!("ownerSVGElement"in t));u<l;){var $=a[u++];y&&($.value=""),t.removeAttribute($.name)}var w=t.nodeName;if(/^script$/i.test(w)){var v=e.createElement(w);for(l=i.length,u=0;u<l;)v.setAttributeNode(i[u++].cloneNode(!0));v.textContent=t.textContent,t.parentNode.replaceChild(v,t)}}function ye(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function $e(e,t){return{type:"text",node:e,path:t}}var we=new n;function ve(e,t){var n=(e.convert||
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(X).replace(ue,fe).replace(le,pe)})(t),r=e.transform;r&&(n=r(n));var o=N(n,e.type);xe(o);var i=[];!function e(t,n,r,o){for(var i=t.childNodes,s=i.length,a=0;a<s;){var c=i[a];switch(c.nodeType){case ee:var l=o.concat(a);be(c,n,r,l),e(c,n,r,l);break;case Q:var u=c.textContent;if(u===K)r.shift(),n.push(ne.test(t.nodeName)?$e(t,o):{type:"any",node:c,path:o.concat(a)});else switch(u.slice(0,2)){case"/*":if("*/"!==u.slice(-2))break;case"👻":t.removeChild(c),a--,s--}break;case te:ne.test(t.nodeName)&&Y.call(c.textContent)===X&&(r.shift(),n.push($e(t,o)))}a++}}(o,i,t.slice(0),[]);var s={content:o,updates:function(n){for(var r=[],o=i.length,s=0,a=0;s<o;){var c=i[s++],l=ge(n,c.path);switch(c.type){case"any":r.push({fn:e.any(l,[]),sparse:!1});break;case"attr":var u=c.sparse,d=e.attribute(l,c.name,c.node);null===u?r.push({fn:d,sparse:!1}):(a+=u.length-2,r.push({fn:d,sparse:!0,values:u}));break;case"text":r.push({fn:e.text(l),sparse:!1}),l.textContent=""}}return o+=a,function(){var e=arguments.length;if(o!==e-1)throw new Error(e-1+" values instead of "+o+"\n"+t.join("${value}"));for(var i=1,s=1;i<e;){var a=r[i-s];if(a.sparse){var c=a.values,l=c[0],u=1,d=c.length;for(s+=d-2;u<d;)l+=arguments[i++]+c[u++];a.fn(l)}else a.fn(arguments[i++])}return n}}};return we.set(t,s),s}var ke=[];function xe(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===Y.call(r.textContent).length&&e.removeChild(r)}}
/*! (c) Andrea Giammarchi - ISC */var Te,Le,Ce=(Te=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Le=/([^A-Z])([A-Z]+)/g,function(e,t){return"ownerSVGElement"in e?function(e,t){var n;return(n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),_e(n,!0)}(e,t):_e(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Se(e,t,n){return t+"-"+n.toLowerCase()}function _e(e,t){var n,r;return function(o){var i,s,a,c;switch(typeof o){case"object":if(o){if("object"===n){if(!t&&r!==o)for(s in r)s in o||(e[s]="")}else t?e.value="":e.cssText="";for(s in i=t?{}:e,o)a="number"!=typeof(c=o[s])||Te.test(s)?c:c+"px",!t&&/^--/.test(s)?i.setProperty(s,a):i[s]=a;n="object",t?e.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Le,Se),":",e[t],";");return n.join("")}(r=i):r=o;break}default:r!=o&&(n="string",r=o,t?e.value=o||"":e.cssText=o||"")}}}var Ee,Re,Ae=(Ee=[].slice,(Re=De.prototype).ELEMENT_NODE=1,Re.nodeType=111,Re.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var o=this.ownerDocument.createRange();o.setStartBefore(e?t[1]:n),o.setEndAfter(r),o.deleteContents()}return n},Re.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,o=0,i=r.length;o<i;o++)t.appendChild(r[o]);return t},De);function De(e){var t=this.childNodes=Ee.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null}function Ie(e){return{html:e}}function Me(e,t){switch(e.nodeType){case Be:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case ze:return Me(e.render(),t);default:return e}}function Pe(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(Ie).then(t):Promise.resolve(M.invoke(e,t)).then(t)}function Ne(e){return null!=e&&"then"in e}var He,Oe,je,We,Ue,Fe="ownerSVGElement",ze=w.prototype.nodeType,Be=Ae.prototype.nodeType,qe=(Oe=(He={Event:b,WeakSet:u}).Event,je=He.WeakSet,We=!0,Ue=null,function(e){return We&&(We=!We,Ue=new je,function(e){var t=new je,n=new je;try{new MutationObserver(s).observe(e,{subtree:!0,childList:!0})}catch(t){var r=0,o=[],i=function(e){o.push(e),clearTimeout(r),r=setTimeout((function(){s(o.splice(r=0,o.length))}),0)};e.addEventListener("DOMNodeRemoved",(function(e){i({addedNodes:[],removedNodes:[e.target]})}),!0),e.addEventListener("DOMNodeInserted",(function(e){i({addedNodes:[e.target],removedNodes:[]})}),!0)}function s(e){for(var r,o=e.length,i=0;i<o;i++)a((r=e[i]).removedNodes,"disconnected",n,t),a(r.addedNodes,"connected",t,n)}function a(e,t,n,r){for(var o,i=new Oe(t),s=e.length,a=0;a<s;1===(o=e[a++]).nodeType&&c(o,i,t,n,r));}function c(e,t,n,r,o){Ue.has(e)&&!r.has(e)&&(o.delete(e),r.add(e),e.dispatchEvent(t));for(var i=e.children||[],s=i.length,a=0;a<s;c(i[a++],t,n,r,o));}}(e.ownerDocument)),Ue.add(e),e}),Ge=/^(?:form|list)$/i,Ve=[].slice;function Ze(t){return this.type=t,function(t){var n=ke,r=xe;return function(o){var i,s,a;return n!==o&&(i=t,s=n=o,a=we.get(s)||ve(i,s),r=a.updates(Z.call(e,a.content,!0))),r.apply(null,arguments)}}(this)}var Ye=!(Ze.prototype={attribute:function(e,t,n){var r,o=Fe in e;if("style"===t)return Ce(e,n,o);if(/^on/.test(t)){var i=t.slice(2);return"connected"===i||"disconnected"===i?qe(e):t.toLowerCase()in e&&(i=i.toLowerCase()),function(t){r!==t&&(r&&e.removeEventListener(i,r,!1),(r=t)&&e.addEventListener(i,t,!1))}}if("data"===t||!o&&t in e&&!Ge.test(t))return function(n){r!==n&&(r=n,e[t]!==n&&null==n?(e[t]="",e.removeAttribute(t)):e[t]=n)};if(t in M.attributes)return function(n){var o=M.attributes[t](e,n);r!==o&&(null==(r=o)?e.removeAttribute(t):e.setAttribute(t,o))};var s=!1,a=n.cloneNode(!0);return function(t){r!==t&&(r=t,a.value!==t&&(null==t?(s&&(s=!1,e.removeAttributeNode(a)),a.value=t):(a.value=t,s||(s=!0,e.setAttributeNode(a)))))}},any:function(e,t){var n,r={node:Me,before:e},o=Fe in e?"svg":"html",i=!1;return function s(a){switch(typeof a){case"string":case"number":case"boolean":i?n!==a&&(n=a,t[0].textContent=a):(i=!0,n=a,t=f(e.parentNode,t,[(c=a,e.ownerDocument.createTextNode(c))],r));break;case"function":s(a(e));break;case"object":case"undefined":if(null==a){i=!1,t=f(e.parentNode,t,[],r);break}default:if(i=!1,P(n=a))if(0===a.length)t.length&&(t=f(e.parentNode,t,[],r));else switch(typeof a[0]){case"string":case"number":case"boolean":s({html:a});break;case"object":if(P(a[0])&&(a=a.concat.apply([],a)),Ne(a[0])){Promise.all(a).then(s);break}default:t=f(e.parentNode,t,a,r)}else"ELEMENT_NODE"in a?t=f(e.parentNode,t,11===a.nodeType?Ve.call(a.childNodes):[a],r):Ne(a)?a.then(s):"placeholder"in a?Pe(a,s):"text"in a?s(String(a.text)):"any"in a?s(a.any):"html"in a?t=f(e.parentNode,t,Ve.call(N([].concat(a.html).join(""),o).childNodes),r):s("length"in a?Ve.call(a):M.invoke(a,s))}var c}},text:function(e){var t;return function n(r){if(t!==r){var o=typeof(t=r);"object"==o&&r?Ne(r)?r.then(n):"placeholder"in r?Pe(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?Ve.call(r).join(""):M.invoke(r,n)):"function"==o?n(r(e)):e.textContent=null==r?"":r}}}}),Ke=function(t){var r,o=(r=(e.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(r)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(r)),i=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(o||i){var s={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return s[t]||(s[t]=e)};if(i)Ke=a;else{var c=new n;Ke=function(e){return c.get(e)||(n=a(t=e),c.set(t,n),n);var t,n}}}else Ye=!0;return Je(t)};function Je(e){return Ye?e:Ke(e)}function Xe(e){for(var t=arguments.length,n=[Je(e)],r=1;r<t;)n.push(arguments[r++]);return n}var Qe=new n,et=function(e){var t,n,r;return function(){var o=Xe.apply(null,arguments);return r!==o[0]?(r=o[0],n=new Ze(e),t=nt(n.apply(n,o))):n.apply(n,o),t}},tt=function(e,t){var n=t.indexOf(":"),r=Qe.get(e),o=t;return-1<n&&(o=t.slice(n+1),t=t.slice(0,n)||"html"),r||Qe.set(e,r={}),r[o]||(r[o]=et(t))},nt=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Ae(t):e},rt=new n;function ot(){var e=rt.get(this),t=Xe.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ze(Fe in this?"svg":"html");rt.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments))}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var it,st,at,ct,lt=M.define,ut=Ze.prototype;function dt(e){return arguments.length<2?null==e?et("html"):"string"==typeof e?dt.wire(null,e):"raw"in e?et("html")(e):"nodeType"in e?dt.bind(e):tt(e,"html"):("raw"in e?et("html"):dt.wire).apply(null,arguments)}return dt.Component=w,dt.bind=function(e){return ot.bind(e)},dt.define=lt,dt.diff=f,(dt.hyper=dt).observe=qe,dt.tagger=ut,dt.wire=function(e,t){return null==e?et(t||"html"):tt(e,t||"html")},dt._={WeakMap:n,WeakSet:u},it=et,st=new n,at=Object.create,ct=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(w,{for:{configurable:!0,value:function(e,t){return function(e,t,r,o){var i,s,a,c=t.get(e)||ct(e,t);switch(typeof o){case"object":case"function":var l=c.w||(c.w=new n);return l.get(o)||(i=l,s=o,a=new e(r),i.set(s,a),a);default:var u=c.p||(c.p=at(null));return u[o]||(u[o]=new e(r))}}(this,st.get(e)||(r=e,o=new $,st.set(r,o),o),e,null==t?"default":t);var r,o}}}),Object.defineProperties(w.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:v("html",it),svg:v("svg",it),state:v("state",(function(){return this.defaultState})),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new b(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return!1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var o in r)n[o]=r[o];return!1!==t&&this.render(),this}}}),dt}(document);
/*! (c) Andrea Giammarchi (ISC) */function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var defaults=createCommonjsModule((function(e){function t(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1},getDefaults:t,changeDefaults:function(t){e.exports.defaults=t}}})),defaults_1=defaults.defaults,defaults_2=defaults.getDefaults,defaults_3=defaults.changeDefaults;const escapeTest=/[&<>"']/,escapeReplace=/[&<>"']/g,escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g,escapeReplacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},getEscapeReplacement=e=>escapeReplacements[e];function escape(e,t){if(t){if(escapeTest.test(e))return e.replace(escapeReplace,getEscapeReplacement)}else if(escapeTestNoEncode.test(e))return e.replace(escapeReplaceNoEncode,getEscapeReplacement);return e}const unescapeTest=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function unescape$1(e){return e.replace(unescapeTest,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const caret=/(^|[^\[])\^/g;function edit(e,t){e=e.source||e,t=t||"";const n={replace:(t,r)=>(r=(r=r.source||r).replace(caret,"$1"),e=e.replace(t,r),n),getRegex:()=>new RegExp(e,t)};return n}const nonWordAndColonTest=/[^\w:]/g,originIndependentUrl=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function cleanUrl(e,t,n){if(e){let e;try{e=decodeURIComponent(unescape$1(n)).replace(nonWordAndColonTest,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!originIndependentUrl.test(n)&&(n=resolveUrl(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}const baseUrls={},justDomain=/^[^:]+:\/*[^/]*$/,protocol=/^([^:]+:)[\s\S]*$/,domain=/^([^:]+:\/*[^/]*)[\s\S]*$/;function resolveUrl(e,t){baseUrls[" "+e]||(justDomain.test(e)?baseUrls[" "+e]=e+"/":baseUrls[" "+e]=rtrim(e,"/",!0));const n=-1===(e=baseUrls[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(protocol,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(domain,"$1")+t:e+t}const noopTest={exec:function(){}};function merge(e){let t,n,r=1;for(;r<arguments.length;r++)for(n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function splitCells(e,t){const n=e.replace(/\|/g,(e,t,n)=>{let r=!1,o=t;for(;--o>=0&&"\\"===n[o];)r=!r;return r?"|":" |"}).split(/ \|/);let r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function rtrim(e,t,n){const r=e.length;if(0===r)return"";let o=0;for(;o<r;){const i=e.charAt(r-o-1);if(i!==t||n){if(i===t||!n)break;o++}else o++}return e.substr(0,r-o)}function findClosingBracket(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let r=0,o=0;for(;o<n;o++)if("\\"===e[o])o++;else if(e[o]===t[0])r++;else if(e[o]===t[1]&&(r--,r<0))return o;return-1}function checkSanitizeDeprecation(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}var helpers={escape:escape,unescape:unescape$1,edit:edit,cleanUrl:cleanUrl,resolveUrl:resolveUrl,noopTest:noopTest,merge:merge,splitCells:splitCells,rtrim:rtrim,findClosingBracket:findClosingBracket,checkSanitizeDeprecation:checkSanitizeDeprecation};const{noopTest:noopTest$1,edit:edit$1,merge:merge$1}=helpers,block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:noopTest$1,table:noopTest$1,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};block.def=edit$1(block.def).replace("label",block._label).replace("title",block._title).getRegex(),block.bullet=/(?:[*+-]|\d{1,9}\.)/,block.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,block.item=edit$1(block.item,"gm").replace(/bull/g,block.bullet).getRegex(),block.list=edit$1(block.list).replace(/bull/g,block.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+block.def.source+")").getRegex(),block._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",block._comment=/<!--(?!-?>)[\s\S]*?-->/,block.html=edit$1(block.html,"i").replace("comment",block._comment).replace("tag",block._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),block.paragraph=edit$1(block._paragraph).replace("hr",block.hr).replace("heading"," {0,3}#{1,6} +").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",block._tag).getRegex(),block.blockquote=edit$1(block.blockquote).replace("paragraph",block.paragraph).getRegex(),block.normal=merge$1({},block),block.gfm=merge$1({},block.normal,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),block.pedantic=merge$1({},block.normal,{html:edit$1("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",block._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:noopTest$1,paragraph:edit$1(block.normal._paragraph).replace("hr",block.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",block.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const inline={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:noopTest$1,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:noopTest$1,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"};inline.em=edit$1(inline.em).replace(/punctuation/g,inline._punctuation).getRegex(),inline._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,inline._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,inline._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,inline.autolink=edit$1(inline.autolink).replace("scheme",inline._scheme).replace("email",inline._email).getRegex(),inline._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,inline.tag=edit$1(inline.tag).replace("comment",block._comment).replace("attribute",inline._attribute).getRegex(),inline._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,inline._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,inline._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,inline.link=edit$1(inline.link).replace("label",inline._label).replace("href",inline._href).replace("title",inline._title).getRegex(),inline.reflink=edit$1(inline.reflink).replace("label",inline._label).getRegex(),inline.normal=merge$1({},inline),inline.pedantic=merge$1({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:edit$1(/^!?\[(label)\]\((.*?)\)/).replace("label",inline._label).getRegex(),reflink:edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",inline._label).getRegex()}),inline.gfm=merge$1({},inline.normal,{escape:edit$1(inline.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),inline.gfm.url=edit$1(inline.gfm.url,"i").replace("email",inline.gfm._extended_email).getRegex(),inline.breaks=merge$1({},inline.gfm,{br:edit$1(inline.br).replace("{2,}","*").getRegex(),text:edit$1(inline.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var rules={block:block,inline:inline};const{defaults:defaults$1}=defaults,{block:block$1}=rules,{rtrim:rtrim$1,splitCells:splitCells$1,escape:escape$1}=helpers;var Lexer_1=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||defaults$1,this.rules=block$1.normal,this.options.pedantic?this.rules=block$1.pedantic:this.options.gfm&&(this.rules=block$1.gfm)}static get rules(){return block$1}static lex(t,n){return new e(n).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.token(e,!0)}token(e,t){let n,r,o,i,s,a,c,l,u,d,p,h,f,m,g,b;for(e=e.replace(/^ +$/gm,"");e;)if((o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e)){const t=this.tokens[this.tokens.length-1];e=e.substring(o[0].length),t&&"paragraph"===t.type?t.text+="\n"+o[0].trimRight():(o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?o:rtrim$1(o,"\n")}))}else if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2]?o[2].trim():o[2],text:o[3]||""});else if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if((o=this.rules.nptable.exec(e))&&(a={type:"table",header:splitCells$1(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},a.header.length===a.align.length)){for(e=e.substring(o[0].length),p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=splitCells$1(a.cells[p],a.header.length);this.tokens.push(a)}else if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,t),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),i=o[2],m=i.length>1,c={type:"list_start",ordered:m,start:m?+i:"",loose:!1},this.tokens.push(c),o=o[0].match(this.rules.item),l=[],n=!1,f=o.length,p=0;p<f;p++)a=o[p],d=a.length,a=a.replace(/^ *([*+-]|\d+\.) */,""),~a.indexOf("\n ")&&(d-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+d+"}","gm"),"")),p!==f-1&&(s=block$1.bullet.exec(o[p+1])[0],(i.length>1?1===s.length:s.length>1||this.options.smartLists&&s!==i)&&(e=o.slice(p+1).join("\n")+e,p=f-1)),r=n||/\n\n(?!\s*$)/.test(a),p!==f-1&&(n="\n"===a.charAt(a.length-1),r||(r=n)),r&&(c.loose=!0),g=/^\[[ xX]\] /.test(a),b=void 0,g&&(b=" "!==a[1],a=a.replace(/^\[[ xX]\] +/,"")),u={type:"list_item_start",task:g,checked:b,loose:r},l.push(u),this.tokens.push(u),this.token(a,!1),this.tokens.push({type:"list_item_end"});if(c.loose)for(f=l.length,p=0;p<f;p++)l[p].loose=!0;this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):escape$1(o[0]):o[0]});else if(t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),o[3]&&(o[3]=o[3].substring(1,o[3].length-1)),h=o[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[h]||(this.tokens.links[h]={href:o[2],title:o[3]});else if((o=this.rules.table.exec(e))&&(a={type:"table",header:splitCells$1(o[1].replace(/^ *| *\| *$/g,"")),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3]?o[3].replace(/\n$/,"").split("\n"):[]},a.header.length===a.align.length)){for(e=e.substring(o[0].length),p=0;p<a.align.length;p++)/^ *-+: *$/.test(a.align[p])?a.align[p]="right":/^ *:-+: *$/.test(a.align[p])?a.align[p]="center":/^ *:-+ *$/.test(a.align[p])?a.align[p]="left":a.align[p]=null;for(p=0;p<a.cells.length;p++)a.cells[p]=splitCells$1(a.cells[p].replace(/^ *\| *| *\| *$/g,""),a.header.length);this.tokens.push(a)}else if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2].charAt(0)?1:2,text:o[1]});else if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens}};const{defaults:defaults$2}=defaults,{cleanUrl:cleanUrl$1,escape:escape$2}=helpers;var Renderer_1=class{constructor(e){this.options=e||defaults$2}code(e,t,n){const r=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,r);null!=t&&t!==e&&(n=!0,e=t)}return r?'<pre><code class="'+this.options.langPrefix+escape$2(r,!0)+'">'+(n?e:escape$2(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:escape$2(e,!0))+"</code></pre>"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,n,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let r='<a href="'+escape$2(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">",r}text(e){return e}},Slugger_1=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}};const{defaults:defaults$3}=defaults,{inline:inline$1}=rules,{findClosingBracket:findClosingBracket$1,escape:escape$3}=helpers;var InlineLexer_1=class e{constructor(e,t){if(this.options=t||defaults$3,this.links=e,this.rules=inline$1.normal,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=inline$1.pedantic:this.options.gfm&&(this.options.breaks?this.rules=inline$1.breaks:this.rules=inline$1.gfm)}static get rules(){return inline$1}static output(t,n,r){return new e(n,r).output(t)}output(t){let n,r,o,i,s,a,c="";for(;t;)if(s=this.rules.escape.exec(t))t=t.substring(s[0].length),c+=escape$3(s[1]);else if(s=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(s[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(s[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(s[0])&&(this.inRawBlock=!1),t=t.substring(s[0].length),c+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):escape$3(s[0]):s[0];else if(s=this.rules.link.exec(t)){const r=findClosingBracket$1(s[2],"()");if(r>-1){const e=(0===s[0].indexOf("!")?5:4)+s[1].length+r;s[2]=s[2].substring(0,r),s[0]=s[0].substring(0,e).trim(),s[3]=""}t=t.substring(s[0].length),this.inLink=!0,o=s[2],this.options.pedantic?(n=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o),n?(o=n[1],i=n[3]):i=""):i=s[3]?s[3].slice(1,-1):"",o=o.trim().replace(/^<([\s\S]*)>$/,"$1"),c+=this.outputLink(s,{href:e.escapes(o),title:e.escapes(i)}),this.inLink=!1}else if((s=this.rules.reflink.exec(t))||(s=this.rules.nolink.exec(t))){if(t=t.substring(s[0].length),n=(s[2]||s[1]).replace(/\s+/g," "),n=this.links[n.toLowerCase()],!n||!n.href){c+=s[0].charAt(0),t=s[0].substring(1)+t;continue}this.inLink=!0,c+=this.outputLink(s,n),this.inLink=!1}else if(s=this.rules.strong.exec(t))t=t.substring(s[0].length),c+=this.renderer.strong(this.output(s[4]||s[3]||s[2]||s[1]));else if(s=this.rules.em.exec(t))t=t.substring(s[0].length),c+=this.renderer.em(this.output(s[6]||s[5]||s[4]||s[3]||s[2]||s[1]));else if(s=this.rules.code.exec(t))t=t.substring(s[0].length),c+=this.renderer.codespan(escape$3(s[2].trim(),!0));else if(s=this.rules.br.exec(t))t=t.substring(s[0].length),c+=this.renderer.br();else if(s=this.rules.del.exec(t))t=t.substring(s[0].length),c+=this.renderer.del(this.output(s[1]));else if(s=this.rules.autolink.exec(t))t=t.substring(s[0].length),"@"===s[2]?(r=escape$3(this.mangle(s[1])),o="mailto:"+r):(r=escape$3(s[1]),o=r),c+=this.renderer.link(o,null,r);else if(this.inLink||!(s=this.rules.url.exec(t))){if(s=this.rules.text.exec(t))t=t.substring(s[0].length),this.inRawBlock?c+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):escape$3(s[0]):s[0]):c+=this.renderer.text(escape$3(this.smartypants(s[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else{if("@"===s[2])r=escape$3(s[0]),o="mailto:"+r;else{do{a=s[0],s[0]=this.rules._backpedal.exec(s[0])[0]}while(a!==s[0]);r=escape$3(s[0]),o="www."===s[1]?"http://"+r:r}t=t.substring(s[0].length),c+=this.renderer.link(o,null,r)}return c}static escapes(t){return t?t.replace(e.rules._escapes,"$1"):t}outputLink(e,t){const n=t.href,r=t.title?escape$3(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,escape$3(e[1]))}smartypants(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e}mangle(e){if(!this.options.mangle)return e;const t=e.length;let n,r="",o=0;for(;o<t;o++)n=e.charCodeAt(o),Math.random()>.5&&(n="x"+n.toString(16)),r+="&#"+n+";";return r}},TextRenderer_1=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}};const{defaults:defaults$4}=defaults,{merge:merge$2,unescape:unescape$1$1}=helpers;var Parser_1=class e{constructor(e){this.tokens=[],this.token=null,this.options=e||defaults$4,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new Slugger_1}static parse(t,n){return new e(n).parse(t)}parse(e){this.inline=new InlineLexer_1(e.links,this.options),this.inlineText=new InlineLexer_1(e.links,merge$2({},this.options,{renderer:new TextRenderer_1})),this.tokens=e.reverse();let t="";for(;this.next();)t+=this.tok();return t}next(){return this.token=this.tokens.pop(),this.token}peek(){return this.tokens[this.tokens.length-1]||0}parseText(){let e=this.token.text;for(;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)}tok(){let e="";switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,unescape$1$1(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":{let t,n,r,o,i="";for(r="",t=0;t<this.token.header.length;t++)r+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(i+=this.renderer.tablerow(r),t=0;t<this.token.cells.length;t++){for(n=this.token.cells[t],r="",o=0;o<n.length;o++)r+=this.renderer.tablecell(this.inline.output(n[o]),{header:!1,align:this.token.align[o]});e+=this.renderer.tablerow(r)}return this.renderer.table(i,e)}case"blockquote_start":for(e="";"blockquote_end"!==this.next().type;)e+=this.tok();return this.renderer.blockquote(e);case"list_start":{e="";const t=this.token.ordered,n=this.token.start;for(;"list_end"!==this.next().type;)e+=this.tok();return this.renderer.list(e,t,n)}case"list_item_start":{e="";const t=this.token.loose,n=this.token.checked,r=this.token.task;if(this.token.task)if(t)if("text"===this.peek().type){const e=this.peek();e.text=this.renderer.checkbox(n)+" "+e.text}else this.tokens.push({type:"text",text:this.renderer.checkbox(n)});else e+=this.renderer.checkbox(n);for(;"list_item_end"!==this.next().type;)e+=t||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(e,r,n)}case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:{const e='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(e);console.log(e)}}}};const{merge:merge$3,checkSanitizeDeprecation:checkSanitizeDeprecation$1,escape:escape$4}=helpers,{getDefaults:getDefaults,changeDefaults:changeDefaults,defaults:defaults$5}=defaults;function marked(e,t,n){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(n||"function"==typeof t){n||(n=t,t=null),t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t);const r=t.highlight;let o,i,s=0;try{o=Lexer_1.lex(e,t)}catch(e){return n(e)}i=o.length;const a=function(e){if(e)return t.highlight=r,n(e);let i;try{i=Parser_1.parse(o,t)}catch(t){e=t}return t.highlight=r,e?n(e):n(null,i)};if(!r||r.length<3)return a();if(delete t.highlight,!i)return a();for(;s<o.length;s++)!function(e){"code"!==e.type?--i||a():r(e.text,e.lang,(function(t,n){return t?a(t):null==n||n===e.text?--i||a():(e.text=n,e.escaped=!0,void(--i||a()))}))}(o[s])}else try{return t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t),Parser_1.parse(Lexer_1.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||marked.defaults).silent)return"<p>An error occurred:</p><pre>"+escape$4(e.message+"",!0)+"</pre>";throw e}}marked.options=marked.setOptions=function(e){return merge$3(marked.defaults,e),changeDefaults(marked.defaults),marked},marked.getDefaults=getDefaults,marked.defaults=defaults$5,marked.Parser=Parser_1,marked.parser=Parser_1.parse,marked.Renderer=Renderer_1,marked.TextRenderer=TextRenderer_1,marked.Lexer=Lexer_1,marked.lexer=Lexer_1.lex,marked.InlineLexer=InlineLexer_1,marked.inlineLexer=InlineLexer_1.output,marked.Slugger=Slugger_1,marked.parse=marked;var marked_1=marked,commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function createCommonjsModule$1(e,t){return e(t={exports:{}},t.exports),t.exports}var pluralize=createCommonjsModule$1((function(e,t){!function(t,n){"function"==typeof commonjsRequire?e.exports=n():t.pluralize=n()}(commonjsGlobal,(function(){var e=[],t=[],n={},r={},o={};function i(e){return"string"==typeof e?new RegExp("^"+e+"$","i"):e}function s(e,t){return e===t?t:e===e.toLowerCase()?t.toLowerCase():e===e.toUpperCase()?t.toUpperCase():e[0]===e[0].toUpperCase()?t.charAt(0).toUpperCase()+t.substr(1).toLowerCase():t.toLowerCase()}function a(e,t){return e.replace(/\$(\d{1,2})/g,(function(e,n){return t[n]||""}))}function c(e,t){return e.replace(t[0],(function(n,r){var o=a(t[1],arguments);return s(""===n?e[r-1]:n,o)}))}function l(e,t,r){if(!e.length||n.hasOwnProperty(e))return t;for(var o=r.length;o--;){var i=r[o];if(i[0].test(t))return c(t,i)}return t}function u(e,t,n){return function(r){var o=r.toLowerCase();return t.hasOwnProperty(o)?s(r,o):e.hasOwnProperty(o)?s(r,e[o]):l(o,r,n)}}function d(e,t,n,r){return function(r){var o=r.toLowerCase();return!!t.hasOwnProperty(o)||!e.hasOwnProperty(o)&&l(o,o,n)===o}}function p(e,t,n){return(n?t+" ":"")+(1===t?p.singular(e):p.plural(e))}return p.plural=u(o,r,e),p.isPlural=d(o,r,e),p.singular=u(r,o,t),p.isSingular=d(r,o,t),p.addPluralRule=function(t,n){e.push([i(t),n])},p.addSingularRule=function(e,n){t.push([i(e),n])},p.addUncountableRule=function(e){"string"!=typeof e?(p.addPluralRule(e,"$0"),p.addSingularRule(e,"$0")):n[e.toLowerCase()]=!0},p.addIrregularRule=function(e,t){t=t.toLowerCase(),e=e.toLowerCase(),o[e]=t,r[t]=e},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach((function(e){return p.addIrregularRule(e[0],e[1])})),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach((function(e){return p.addPluralRule(e[0],e[1])})),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach((function(e){return p.addSingularRule(e[0],e[1])})),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[eé]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(p.addUncountableRule),p}))}));const idb=_idb,webidl2=_webidl2,hyperHTML$1=hyperHTML,marked$1=marked_1,pluralize$1=pluralize,dashes=/-/g;function hashString(e){let t=0;for(const n of e)t=Math.imul(31,t)+n.charCodeAt(0)|0;return String(t)}const ISODate=new Intl.DateTimeFormat(["en-ca-iso8601"],{timeZone:"UTC",year:"numeric",month:"2-digit",day:"2-digit"}),resourceHints=new Set(["dns-prefetch","preconnect","preload","prerender"]),fetchDestinations=new Set(["document","embed","font","image","manifest","media","object","report","script","serviceworker","sharedworker","style","worker","xslt",""]),nonNormativeSelector=".informative, .note, .issue, .example, .ednote, .practice, .introductory";function createResourceHint(e){if(!e||"object"!=typeof e)throw new TypeError("Missing options");if(!resourceHints.has(e.hint))throw new TypeError("Invalid resources hint");const t=new URL(e.href,location.href),n=document.createElement("link");let{href:r}=t;switch(n.rel=e.hint,n.rel){case"dns-prefetch":case"preconnect":r=t.origin,(e.corsMode||t.origin!==document.location.origin)&&(n.crossOrigin=e.corsMode||"anonymous");break;case"preload":"as"in e&&"string"==typeof e.as&&(fetchDestinations.has(e.as)||console.warn(`Unknown request destination: ${e.as}`),n.setAttribute("as",e.as))}return n.href=r,e.dontRemove||n.classList.add("removeOnSave"),n}function removeReSpec(e){e.querySelectorAll(".remove, script[data-requiremodule]").forEach(e=>{e.remove()})}function showInlineWarning(e,t,n){Array.isArray(e)||(e=[e]);const r=e.map((e,r)=>(markAsOffending(e,t,n),generateMarkdownLink(e,r))).join(", ");pub("warn",`${t} at: ${r}.`),console.warn(t,e)}function showInlineError(e,t,n,{details:r}={}){Array.isArray(e)||(e=[e]);const o=e.map((e,r)=>(markAsOffending(e,t,n),generateMarkdownLink(e,r))).join(", ");let i=`${t} at: ${o}.`;r&&(i+=`\n\n<details>${r}</details>`),pub("error",i),console.error(t,e)}function markAsOffending(e,t,n){e.classList.add("respec-offending-element"),e.hasAttribute("title")||e.setAttribute("title",n||t),e.id||addId(e,"respec-offender")}function generateMarkdownLink(e,t){return`[${t+1}](#${e.id})`}class IDBKeyVal{constructor(e,t){this.idb=e,this.storeName=t}async get(e){return await this.idb.transaction(this.storeName).objectStore(this.storeName).get(e)}async getMany(e){const t=new Set(e),n=new Map;let r=await this.idb.transaction(this.storeName).store.openCursor();for(;r;)t.has(r.key)&&n.set(r.key,r.value),r=await r.continue();return n}async set(e,t){const n=this.idb.transaction(this.storeName,"readwrite");return n.objectStore(this.storeName).put(t,e),await n.done}async addMany(e){const t=this.idb.transaction(this.storeName,"readwrite");for(const[n,r]of e)t.objectStore(this.storeName).put(r,n);return await t.done}async clear(){const e=this.idb.transaction(this.storeName,"readwrite");return e.objectStore(this.storeName).clear(),await e.done}async keys(){const e=this.idb.transaction(this.storeName),t=e.objectStore(this.storeName).getAllKeys();return await e.done,t}}function joinAnd(e=[],t=(e=>e),n=lang){const r=e.map(t);if(Intl.ListFormat&&"function"==typeof Intl.ListFormat){return new Intl.ListFormat(n,{style:"long",type:"conjunction"}).format(r)}switch(r.length){case 0:case 1:return r.toString();case 2:return r.join(" and ");default:{const e=r.join(", "),t=e.lastIndexOf(",");return`${e.substr(0,t+1)} and ${e.slice(t+2)}`}}}function xmlEscape(e){return e.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function norm(e){return e.trim().replace(/\s+/g," ")}function concatDate(e,t=""){return ISODate.format(e).replace(dashes,t)}function toShortIsoDate(e){return ISODate.format(e)}function humanDate(e=new Date,t=document.documentElement.lang||"en"){e instanceof Date||(e=new Date(e));const n=[t,"en"];return`${e.toLocaleString(n,{day:"2-digit",timeZone:"UTC"})} ${e.toLocaleString(n,{month:"long",timeZone:"UTC"})} ${e.toLocaleString(n,{year:"numeric",timeZone:"UTC"})}`}function toKeyValuePairs(e,t=", ",n="="){return Array.from(Object.entries(e)).map(([e,t])=>`${e}${n}${JSON.stringify(t)}`).join(t)}function linkCSS(e,t){const n=[].concat(t).map(t=>{const n=e.createElement("link");return n.rel="stylesheet",n.href=t,n}).reduce((e,t)=>(e.appendChild(t),e),e.createDocumentFragment());e.head.appendChild(n)}function runTransforms(e,t){let n=[this,e];const r=Array.from(arguments);if(r.shift(),r.shift(),n=n.concat(r),t){const r=t.split(/\s+/);for(let t=0;t<r.length;t++){const o=r[t],i=window[o];if(i)try{e=i.apply(this,n)}catch(e){pub("warn",`call to \`${o}()\` failed with: ${e}. See error console for stack trace.`),console.error(e)}}}return e}async function fetchAndCache(e,t=864e5){const n=new Request(e),r=new URL(n.url);let o,i;if("caches"in window)try{if(o=await caches.open(r.origin),i=await o.match(n),i&&new Date(i.headers.get("Expires"))>new Date)return i}catch(e){console.error("Failed to use Cache API.",e)}const s=await fetch(n);if(!s.ok&&i)return console.warn(`Returning a stale cached response for ${r}`),i;if(o&&s.ok){const e=s.clone(),r=new Headers(s.headers),i=new Date(Date.now()+t);r.set("Expires",i.toString());const a=new Response(await e.blob(),{headers:r});await o.put(n,a).catch(console.error)}return s}function flatten$1(e,t){const n=Array.isArray(t)?t.slice().reduce(flatten$1,[]):[t];return e.push(...n),e}function htmlJoinAnd(e,t=(e=>e)){const n=e.map(t);switch(n.length){case 0:case 1:return n[0];case 2:return hyperHTML$1`${n[0]} and ${n[1]}`;default:{const e=n.slice(0,-1).map(e=>hyperHTML$1`${e}, `);return hyperHTML$1`${e}and ${n[n.length-1]}`}}}function addHashId(e,t=""){return addId(e,t,hashString(norm(e.textContent)))}function addId(e,t="",n="",r=!1){if(e.id)return e.id;n||(n=(e.title?e.title:e.textContent).trim());let o=r?n:n.toLowerCase();if(o=o.trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\W+/gim,"-").replace(/^-+/,"").replace(/-+$/,""),o?"example"===t?o=n:!/\.$/.test(o)&&/^[a-z]/i.test(o)||(o=`x${o}`):o="generatedID",t&&(o=`${t}-${o}`),e.ownerDocument.getElementById(o)){let t=0,n=`${o}-${t}`;for(;e.ownerDocument.getElementById(n);)t+=1,n=`${o}-${t}`;o=n}return e.id=o,o}function getTextNodes(e,t=[],n={wsNodes:!0}){const r=t.join(", "),o=document.createNodeIterator(e,NodeFilter.SHOW_TEXT,e=>n.wsNodes||e.data.trim()?r&&e.parentElement.closest(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT),i=[];let s;for(;s=o.nextNode();)i.push(s);return i}function getDfnTitles(e){const t=new Set,n="ltNodefault"in e.dataset?"":norm(e.textContent),r=e.children[0];if(e.dataset.lt?e.dataset.lt.split("|").map(e=>norm(e)).forEach(e=>t.add(e)):1===e.childNodes.length&&1===e.getElementsByTagName("abbr").length&&r.title?t.add(r.title):'""'===e.textContent&&t.add("the-empty-string"),t.add(n),t.delete(""),e.dataset.localLt){e.dataset.localLt.split("|").forEach(e=>t.add(norm(e)))}return[...t]}function getLinkTargets(e){const t=e.closest("[data-link-for]"),n=t?t.dataset.linkFor:"";return getDfnTitles(e).reduce((e,t)=>{const r=t.split(".");return 2===r.length&&e.push({for:r[0],title:r[1]}),e.push({for:n,title:t}),""!==n&&e.push({for:"",title:t}),e},[])}function renameElement(e,t){if(e.localName===t)return e;const n=e.ownerDocument.createElement(t);for(const{name:t,value:r}of e.attributes)n.setAttribute(t,r);return n.append(...e.childNodes),e.replaceWith(n),n}function refTypeFromContext(e,t){const n=t.closest(nonNormativeSelector);let r=!1;if(n&&(r=!t.closest(".normative")||!n.querySelector(".normative")),e.startsWith("!")){if(r)return{type:"informative",illegal:!0};r=!1}else e.startsWith("?")&&(r=!0);return{type:r?"informative":"normative",illegal:!1}}function wrapInner(e,t){return t.append(...e.childNodes),e.appendChild(t),e}function parents(e,t){const n=[];let r=e.parentElement;for(;r;){const e=r.closest(t);if(!e)break;n.push(e),r=e.parentElement}return n}function children(e,t){try{return e.querySelectorAll(`:scope > ${t}`)}catch{let n="";e.id||(n=`temp-${String(Math.random()).substr(2)}`,e.id=n);const r=`#${e.id} > ${t}`,o=e.parentElement.querySelectorAll(r);return n&&(e.id=""),o}}function msgIdGenerator(e,t=0){const n=function*(e,t){for(;;)yield`${e}:${t}`,t++}(e,t);return()=>n.next().value}class InsensitiveStringSet extends Set{constructor(e=[]){super();for(const t of e)this.add(t)}add(e){return this.has(e)||this.getCanonicalKey(e)?this:super.add(e)}has(e){return super.has(e)||[...this.keys()].some(t=>t.toLowerCase()===e.toLowerCase())}delete(e){return super.has(e)?super.delete(e):super.delete(this.getCanonicalKey(e))}getCanonicalKey(e){return super.has(e)?e:[...this.keys()].find(t=>t.toLowerCase()===e.toLowerCase())}}function makeSafeCopy(e){const t=e.cloneNode(!0);return t.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id")),t.querySelectorAll("dfn").forEach(e=>renameElement(e,"span")),t.hasAttribute("id")&&t.removeAttribute("id"),removeCommentNodes(t),t}function removeCommentNodes(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT);for(const e of[...walkTree(t)])e.remove()}function*walkTree(e){for(;e.nextNode();)yield e.currentNode}const name$2="core/base-runner",canMeasure=performance.mark&&performance.measure;function toRunnable(e){const t=e.name||"";return t||console.warn("Plugin lacks name:",e),n=>new Promise(async(r,o)=>{const i=setTimeout(()=>{const n=`Plugin ${t} took too long.`;console.error(n,e),o(new Error(n))},15e3);canMeasure&&performance.mark(`${t}-start`);try{e.run.length<=1?(await e.run(n),r()):(console.warn(`Plugin ${t} uses a deprecated callback signature. Return a Promise instead. Read more at: https://github.com/w3c/respec/wiki/Developers-Guide#plugins`),e.run(n,document,r))}catch(e){o(e)}finally{clearTimeout(i)}canMeasure&&(performance.mark(`${t}-end`),performance.measure(t,`${t}-start`,`${t}-end`))})}async function runAll(e){pub("start-all",respecConfig),canMeasure&&performance.mark(`${name$2}-start`),await done$1;const t=e.filter(e=>e&&e.run).map(toRunnable);for(const e of t)try{await e(respecConfig)}catch(e){console.error(e)}pub("plugins-done",respecConfig),await done,pub("end-all",respecConfig),removeReSpec(document),canMeasure&&(performance.mark(`${name$2}-end`),performance.measure(name$2,`${name$2}-start`,`${name$2}-end`))}var baseRunner=Object.freeze({__proto__:null,name:name$2,runAll:runAll});async function fetchBase(e){const t=await fetch(new URL(`../../${e}`,"undefined"==typeof document?new(require("url").URL)("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("respec-w3c.js",document.baseURI).href));return await t.text()}async function fetchAsset(e){return fetchBase(`assets/${e}`)}const name$3="core/markdown",gtEntity=/&gt;/gm,ampEntity=/&amp;/gm,endsWithSpace=/\s+$/gm,inlineElems=new Set(["a","abbr","acronym","b","bdo","big","br","button","cite","code","dfn","em","i","img","input","kbd","label","map","object","q","samp","script","select","small","span","strong","sub","sup","textarea","time","tt","var"]);class Renderer extends marked$1.Renderer{code(e,t,n){return/(^webidl$)/i.test(t)?`<pre class="idl">${e}</pre>`:super.code(e,t,n)}heading(e,t,n,r){const o=/(.+)\s+{#([\w-]+)}$/;if(o.test(e)){const[,n,r]=e.match(o);return`<h${t} id="${r}">${n}</h${t}>`}return super.heading(e,t,n,r)}}function normalizePadding(e){if(!e)return"";if("string"!=typeof e)throw TypeError("Invalid input");if("\n"===e)return"\n";function t(e){return null!==e&&e.nodeType===Node.TEXT_NODE}const n=document.createRange().createContextualFragment(e);var r;Array.from(n.children).filter(e=>!inlineElems.has(e.localName)).filter(e=>"pre"!==e.localName).filter(e=>"table"!==e.localName).forEach(e=>{e.innerHTML=normalizePadding(e.innerHTML)}),Array.from(n.childNodes).filter(e=>t(e)&&""===e.textContent.trim()).forEach(e=>e.replaceWith("\n")),null!==(r=n.firstChild)&&r.nodeType===Node.ELEMENT_NODE&&Array.from(n.firstChild.children).filter(e=>"table"!==e.localName).forEach(e=>{e.innerHTML=normalizePadding(e.innerHTML)}),n.normalize();const o=n.textContent.replace(/^ *\n/,"").split("\n").filter(e=>e&&e.startsWith(" "))[0],i=o?o.match(/ +/)[0].length:0;if(i){Array.from(n.childNodes).filter(e=>"PRE"!==e.nodeName).filter(t).filter(e=>{const t=e.previousElementSibling,n=t&&t.localName;return!inlineElems.has(n)||e.textContent.trim().includes("\n")}).reduce((e,t)=>{let n="";const r=t.previousElementSibling,o=r&&r.localName;return/^[\t ]/.test(t.textContent)&&inlineElems.has(o)&&(n=t.textContent.match(/^\s+/)[0]),t.textContent=n+t.textContent.replace(e,""),e},new RegExp(`^ {1,${i}}`,"gm"));const e=new RegExp(`\\ {${i}}$`,"gm");Array.from(n.querySelectorAll("pre")).map(e=>e.previousSibling).filter(t).reduce((t,n)=>(e.test(n.textContent)&&(n.textContent=n.textContent.substr(0,n.textContent.length-t)),t),i)}const s=document.createElement("body");return s.append(n),endsWithSpace.test(s.innerHTML)?`${s.innerHTML.trimRight()}\n`:s.innerHTML}function markdownToHtml(e){const t=normalizePadding(e).replace(gtEntity,">").replace(ampEntity,"&");return marked$1(t,{sanitize:!1,gfm:!0,headerIds:!1,langPrefix:"",renderer:new Renderer})}function convertElements(e){return t=>{const n=t.querySelectorAll(e);return n.forEach(convertElement),Array.from(n)}}function convertElement(e){e.innerHTML=markdownToHtml(e.innerHTML)}function enableBlockLevelMarkdown(e,t){const n=e.querySelectorAll(t);for(const e of n)e.innerHTML.match(/^\n\s*\n/)||e.prepend("\n\n")}class Builder{constructor(e){this.doc=e,this.root=e.createDocumentFragment(),this.stack=[this.root],this.current=this.root}findPosition(e){return parseInt(e.tagName.charAt(1),10)}findParent(e){let t;for(;e>0;)if(e--,t=this.stack[e],t)return t}findHeader({firstChild:e}){for(;e;){if(/H[1-6]/.test(e.tagName))return e;e=e.nextSibling}return null}addHeader(e){const t=this.doc.createElement("section"),n=this.findPosition(e);t.appendChild(e),this.findParent(n).appendChild(t),this.stack[n]=t,this.stack.length=n+1,this.current=t}addSection(e,t){const n=this.findHeader(e),r=n?this.findPosition(n):1,o=this.findParent(r);n&&e.removeChild(n),e.appendChild(t(e)),n&&e.prepend(n),o.appendChild(e),this.current=o}addElement(e){this.current.appendChild(e)}}function structure(e,t){return function e(n){const r=new Builder(t);for(;n.firstChild;){const t=n.firstChild;if(t.nodeType===Node.ELEMENT_NODE)switch(t.localName){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":r.addHeader(t);break;case"section":r.addSection(t,e);break;default:r.addElement(t)}else n.removeChild(t)}return r.root}(e)}function substituteWithTextNodes(e){Array.from(e).forEach(e=>{e.replaceWith(e.textContent)})}const processMDSections=convertElements("[data-format='markdown']:not(body)"),blockLevelElements="[data-format=markdown], section, div, address, article, aside, figure, header, main";function run$1(e){const t=!!document.querySelector("[data-format=markdown]:not(body)"),n="markdown"===e.format;if(!n&&!t)return;if(!n)return void processMDSections(document.body).map(e=>{return{structuredInternals:structure(e,e.ownerDocument),elem:e}}).forEach(({elem:e,structuredInternals:t})=>{if(e.setAttribute("aria-busy","true"),"section"===t.firstElementChild.localName&&"section"===e.localName){const n=t.firstElementChild;n.remove(),e.append(...n.childNodes)}else e.textContent="";e.appendChild(t),e.setAttribute("aria-busy","false")});const r=document.getElementById("respec-ui");r.remove();const o=document.body.cloneNode(!0);enableBlockLevelMarkdown(o,blockLevelElements),convertElement(o),substituteWithTextNodes(o.querySelectorAll(".nolinks a[href]"));const i=structure(o,document);o.append(r,i),document.body.replaceWith(o)}var markdown=Object.freeze({__proto__:null,name:name$3,markdownToHtml:markdownToHtml,run:run$1}),shortcut={all_shortcuts:{},add:function(e,t,n){var r={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(n)for(var o in r)void 0===n[o]&&(n[o]=r[o]);else n=r;var i=n.target;"string"==typeof n.target&&(i=document.getElementById(n.target)),e=e.toLowerCase();var s=function(r){var o,i;if((r=r||window.event,n.disable_in_input)&&(r.target?i=r.target:r.srcElement&&(i=r.srcElement),3==i.nodeType&&(i=i.parentNode),"INPUT"==i.tagName||"TEXTAREA"==i.tagName))return;r.keyCode?o=r.keyCode:r.which&&(o=r.which);var s=String.fromCharCode(o).toLowerCase();188==o&&(s=","),190==o&&(s=".");var a=e.split("+"),c=0,l={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},u={esc:27,escape:27,tab:9,space:32,return:13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,break:19,insert:45,home:36,delete:46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},d={shift:{wanted:!1,pressed:!1},ctrl:{wanted:!1,pressed:!1},alt:{wanted:!1,pressed:!1},meta:{wanted:!1,pressed:!1}};r.ctrlKey&&(d.ctrl.pressed=!0),r.shiftKey&&(d.shift.pressed=!0),r.altKey&&(d.alt.pressed=!0),r.metaKey&&(d.meta.pressed=!0);for(var p,h=0;p=a[h],h<a.length;h++)"ctrl"==p||"control"==p?(c++,d.ctrl.wanted=!0):"shift"==p?(c++,d.shift.wanted=!0):"alt"==p?(c++,d.alt.wanted=!0):"meta"==p?(c++,d.meta.wanted=!0):p.length>1?u[p]==o&&c++:n.keycode?n.keycode==o&&c++:s==p?c++:l[s]&&r.shiftKey&&(s=l[s])==p&&c++;if(c==a.length&&d.ctrl.pressed==d.ctrl.wanted&&d.shift.pressed==d.shift.wanted&&d.alt.pressed==d.alt.wanted&&d.meta.pressed==d.meta.wanted&&(t(r),!n.propagate))return r.cancelBubble=!0,r.returnValue=!1,r.stopPropagation&&(r.stopPropagation(),r.preventDefault()),!1};this.all_shortcuts[e]={callback:s,target:i,event:n.type},i.addEventListener?i.addEventListener(n.type,s,!1):i.attachEvent?i.attachEvent("on"+n.type,s):i["on"+n.type]=s}};const name$4="core/ui";async function loadStyle(){try{return(await Promise.resolve().then((function(){return ui$3}))).default}catch{return fetchAsset("ui.css")}}async function insertStyle(){const e=document.createElement("style");return e.id="respec-ui-styles",e.textContent=await loadStyle(),e.classList.add("removeOnSave"),document.head.appendChild(e),e}function ariaDecorate(e,t){e&&Array.from(t).forEach(([t,n])=>{e.setAttribute(`aria-${t}`,n)})}insertStyle();const respecUI=hyperHTML$1`<div id='respec-ui' class='removeOnSave' hidden></div>`,menu=hyperHTML$1`<ul id=respec-menu role=menu aria-labelledby='respec-pill' hidden></ul>`;let modal,overlay;const errors=[],warnings=[],buttons={};sub("start-all",()=>document.body.prepend(respecUI),{once:!0}),sub("end-all",()=>document.body.prepend(respecUI),{once:!0});const respecPill=hyperHTML$1`<button id='respec-pill' disabled>ReSpec</button>`;respecUI.appendChild(respecPill),respecPill.addEventListener("click",e=>{e.stopPropagation(),menu.hidden?(menu.classList.remove("respec-hidden"),menu.classList.add("respec-visible")):(menu.classList.add("respec-hidden"),menu.classList.remove("respec-visible")),respecPill.setAttribute("aria-expanded",String(menu.hidden)),menu.hidden=!menu.hidden}),document.documentElement.addEventListener("click",()=>{menu.hidden||(menu.classList.remove("respec-visible"),menu.classList.add("respec-hidden"),menu.hidden=!0)}),respecUI.appendChild(menu);const ariaMap=new Map([["controls","respec-menu"],["expanded","false"],["haspopup","true"],["label","ReSpec Menu"]]);function errWarn(e,t,n,r){t.push(e),buttons.hasOwnProperty(n)||(buttons[n]=createWarnButton(n,t,r),respecUI.appendChild(buttons[n]));const o=buttons[n];o.textContent=t.length;const i=1===t.length?pluralize$1.singular(r):r;ariaDecorate(o,new Map([["label",`${t.length} ${i}`]]))}function createWarnButton(e,t,n){const r=hyperHTML$1`<button id='${`respec-pill-${e}`}' class='respec-info-button'>`;r.addEventListener("click",()=>{r.setAttribute("aria-expanded","true");const o=hyperHTML$1`<ol class='${`respec-${e}-list`}'></ol>`;for(const e of t){const t=document.createRange().createContextualFragment(markdownToHtml(e)),n=document.createElement("li");t.firstElementChild===t.lastElementChild?n.append(...t.firstElementChild.childNodes):n.appendChild(t),o.appendChild(n)}ui.freshModal(n,o,r)});const o=new Map([["expanded","false"],["haspopup","true"],["controls",`respec-pill-${e}-modal`]]);return ariaDecorate(r,o),r}ariaDecorate(respecPill,ariaMap);const ui={show(){try{respecUI.hidden=!1}catch(e){console.error(e)}},hide(){respecUI.hidden=!0},enable(){respecPill.removeAttribute("disabled")},addCommand(e,t,n,r){r=r||"";const o=`respec-button-${e.toLowerCase().replace(/\s+/,"-")}`,i=hyperHTML$1`<button id="${o}" class="respec-option" title="${n}">
      <span class="respec-cmd-icon" aria-hidden="true">${r}</span> ${e}…
    </button>`,s=hyperHTML$1`<li role=menuitem>${i}</li>`;return s.addEventListener("click",t),menu.appendChild(s),n&&shortcut.add(n,t),i},error(e){errWarn(e,errors,"error","ReSpec Errors")},warning(e){errWarn(e,warnings,"warning","ReSpec Warnings")},closeModal(e){overlay&&(overlay.classList.remove("respec-show-overlay"),overlay.classList.add("respec-hide-overlay"),overlay.addEventListener("transitionend",()=>{overlay.remove(),overlay=null})),e&&e.setAttribute("aria-expanded","false"),modal&&(modal.remove(),modal=null)},freshModal(e,t,n){modal&&modal.remove(),overlay&&overlay.remove(),overlay=hyperHTML$1`<div id='respec-overlay' class='removeOnSave'></div>`;const r=`${n.id}-modal`,o=`${r}-heading`;modal=hyperHTML$1`<div id='${r}' class='respec-modal removeOnSave' role='dialog'>
      <h3 id="${o}">${e}</h3>
      <div class='inside'>${t}</div>
    </div>`;const i=new Map([["labelledby",o]]);ariaDecorate(modal,i),document.body.append(overlay,modal),overlay.addEventListener("click",()=>this.closeModal(n)),overlay.classList.toggle("respec-show-overlay"),modal.hidden=!1}};shortcut.add("Esc",()=>ui.closeModal()),shortcut.add("Ctrl+Alt+Shift+E",()=>{buttons.error&&buttons.error.click()}),shortcut.add("Ctrl+Alt+Shift+W",()=>{buttons.warning&&buttons.warning.click()}),window.respecUI=ui,sub("error",e=>ui.error(e)),sub("warn",e=>ui.warning(e));var ui$1=Object.freeze({__proto__:null,name:name$4,ui:ui});const name$5="core/reindent";function reindent(e){if(!e)return e;const t=e.trimRight().split("\n");for(;t.length&&!t[0].trim();)t.shift();const n=t.filter(e=>e.trim()).map(e=>e.search(/[^\s]/)),r=Math.min(...n);return t.map(e=>e.slice(r)).join("\n")}function run$2(){for(const e of document.getElementsByTagName("pre"))e.innerHTML=reindent(e.innerHTML)}var reindent$1=Object.freeze({__proto__:null,name:name$5,run:run$2});const name$6="core/location-hash";function run$3(){pub("start","core/location-hash"),location.hash&&document.respecIsReady.then(()=>{let e=decodeURIComponent(location.hash).substr(1);const t=document.getElementById(e),n=/\W/.test(e);if(!t&&n){const t=e.replace(/[\W]+/gim,"-").replace(/^-+/,"").replace(/-+$/,"");document.getElementById(t)&&(e=t)}location.hash=`#${e}`})}var locationHash=Object.freeze({__proto__:null,name:name$6,run:run$3});const privs=new WeakMap;function canLint(e,t){return!(!1===e.hasOwnProperty("lint")||!1===e.lint||!e.lint[t])}class LinterRule{constructor(e,t){privs.set(this,{name:e,lintingFunction:t})}get name(){return privs.get(this).name}lint(e={lint:{[this.name]:!1}},t=document){if(canLint(e,this.name))return privs.get(this).lintingFunction(e,t)}}const name$7="check-charset",meta={en:{description:"Document must only contain one `<meta>` tag with charset set to 'utf-8'",howToFix:'Add this line in your document `<head>` section - `<meta charset="utf-8">` or set charset to "utf-8" if not set already.'}},lang$1=lang in meta?lang:"en";function linterFunction(e,t){const n=t.querySelectorAll("meta[charset]"),r=[];for(const e of n)r.push(e.getAttribute("charset").trim().toLowerCase());return r.includes("utf-8")&&1===n.length?[]:{name:name$7,occurrences:n.length,...meta[lang$1]}}const rule=new LinterRule(name$7,linterFunction),name$8="check-internal-slots",meta$1={en:{description:"Internal slots should be preceded by a '.'",howToFix:"Add a '.' between the elements mentioned.",help:"See developer console."}},lang$2=lang in meta$1?lang:"en";function linterFunction$1(e,t){const n=[...t.querySelectorAll("var+a")].filter(({previousSibling:{nodeName:e}})=>{return e&&"VAR"===e});if(n.length)return{name:name$8,offendingElements:n,occurrences:n.length,...meta$1[lang$2]}}const rule$1=new LinterRule(name$8,linterFunction$1),name$9="check-punctuation",punctuationMarks=[".",":","!","?"],humanMarks=punctuationMarks.map(e=>`"${e}"`).join(", "),meta$2={en:{description:"`p` elements should end with a punctuation mark.",howToFix:`Please make sure \`p\` elements end with one of: ${humanMarks}.`}},lang$3=lang in meta$2?lang:"en";function lintingFunction(e,t){const n=new RegExp(`[${punctuationMarks.join("")}\\]]$|^ *$`,"m"),r=[...t.querySelectorAll("p:not(#back-to-top)")].filter(e=>!n.test(e.textContent.trim()));if(r.length)return{name:name$9,offendingElements:r,occurrences:r.length,...meta$2[lang$3]}}const rule$2=new LinterRule(name$9,lintingFunction),name$a="core/linter",privates=new WeakMap;class Linter{constructor(){privates.set(this,{rules:new Set})}get rules(){return privates.get(this).rules}register(...e){e.forEach(e=>this.rules.add(e))}async lint(e,t=window.document){const n=[...privates.get(this).rules].map(n=>toLinterWarning(n.lint(e,t)));await n}}const linter=new Linter,baseResult={name:"unknown",description:"",occurrences:0,howToFix:"",offendingElements:[],help:""};async function toLinterWarning(e){const t=await e;if(!t)return;const n={...baseResult,...t},{description:r,help:o,howToFix:i,name:s,occurrences:a,offendingElements:c}=n,l=`Linter (${s}): ${r} ${i} ${o}`;c.length?showInlineWarning(c,`${l} Occured`):pub("warn",`${l} (Count: ${a})`)}function run$4(e){!1!==e.lint&&(async()=>{await document.respecIsReady;try{await linter.lint(e,document)}catch(e){console.error("Error ocurred while running the linter",e)}})()}var linter$1=Object.freeze({__proto__:null,name:name$a,default:linter,run:run$4});const name$b="local-refs-exist",meta$3={en:{description:"Broken local reference found in document.",howToFix:"Please fix the links mentioned.",help:"See developer console."}},lang$4=lang in meta$3?lang:"en";function linterFunction$2(e,t){const n=[...t.querySelectorAll("a[href^='#']")].filter(isBrokenHyperlink);if(n.length)return{name:name$b,offendingElements:n,occurrences:n.length,...meta$3[lang$4]}}const rule$3=new LinterRule(name$b,linterFunction$2);function isBrokenHyperlink(e){const t=e.getAttribute("href").substring(1);return!e.ownerDocument.getElementById(t)}const name$c="no-headingless-sections",meta$4={en:{description:"All sections must start with a `h2-6` element.",howToFix:"Add a `h2-6` to the offending section or use a `<div>`.",help:"See developer console."},nl:{description:"Alle secties moeten beginnen met een `h2-6` element.",howToFix:"Voeg een `h2-6` toe aan de conflicterende sectie of gebruik een `<div>`.",help:"Zie de developer console."}},lang$5=lang in meta$4?lang:"en",hasNoHeading=({firstElementChild:e})=>null===e||!1===/^h[1-6]$/.test(e.localName);function linterFunction$3(e,t){const n=[...t.querySelectorAll("section")].filter(hasNoHeading);if(n.length)return{name:name$c,offendingElements:n,occurrences:n.length,...meta$4[lang$5]}}const rule$4=new LinterRule(name$c,linterFunction$3),name$d="no-http-props",meta$5={en:{description:"Insecure URLs are not allowed in `respecConfig`.",howToFix:"Please change the following properties to 'https://': "}},lang$6=lang in meta$5?lang:"en";function lintingFunction$1(e,t){if(!t.location.href.startsWith("http"))return;const n=Object.getOwnPropertyNames(e).filter(e=>e.endsWith("URI")||"prevED"===e).filter(n=>new URL(e[n],t.location.href).href.startsWith("http://"));if(!n.length)return;const r={name:name$d,occurrences:n.length,...meta$5[lang$6]};return r.howToFix+=`${n.map(e=>`\`${e}\``).join(", ")}.`,r}const rule$5=new LinterRule(name$d,lintingFunction$1),name$e="privsec-section",meta$6={en:{description:"Document must a 'Privacy and/or Security' Considerations section.",howToFix:"Add a privacy and/or security considerations section.",help:"See the [Self-Review Questionnaire](https://w3ctag.github.io/security-questionnaire/)."}},lang$7=lang in meta$6?lang:"en";function hasPriSecConsiderations(e){return Array.from(e.querySelectorAll("h2, h3, h4, h5, h6")).some(({textContent:e})=>{const t=/(privacy|security)/im.test(e),n=/(considerations)/im.test(e);return t&&n||t})}function lintingFunction$2(e,t){if(e.isRecTrack&&!hasPriSecConsiderations(t))return{name:name$e,occurrences:1,...meta$6[lang$7]}}const rule$6=new LinterRule(name$e,lintingFunction$2);linter.register(rule$5,rule$4,rule$2,rule$3,rule$1,rule,rule$6);const coreDefaults={lint:{"no-headingless-sections":!0,"no-http-props":!0,"check-punctuation":!1,"local-refs-exist":!0,"check-internal-slots":!1,"check-charset":!1,"privsec-section":!1},pluralize:!1,specStatus:"base",highlightVars:!0,addSectionLinks:!0},definitionMap=Object.create(null);function registerDefinition(e,t){for(const n of t.map(e=>e.toLowerCase()))n in definitionMap==!1?definitionMap[n]=[e]:definitionMap[n].includes(e)||definitionMap[n].push(e)}const name$f="wpt-tests-exist",meta$7={en:{description:"Non-existent Web Platform Tests",howToFix:"Please fix the tests mentioned.",help:"See developer console."}},lang$8=lang in meta$7?lang:"en";async function linterFunction$4(e,t){const n=await getFilesInWPT(e.testSuiteURI,e.githubAPI);if(!n)return;const r=[],o=new Set,i=[...t.querySelectorAll("[data-tests]")].filter(e=>e.dataset.tests);for(const e of i){const t=e.dataset.tests.split(/,/gm).map(e=>e.trim().split("#")[0]).filter(e=>e).filter(e=>!n.has(e));t.length&&(r.push(e),t.forEach(e=>o.add(e)))}if(!r.length)return;const s=[...o].map(e=>`\`${e}\``);return{name:name$f,offendingElements:r,occurrences:r.length,...meta$7[lang$8],description:`${meta$7[lang$8].description}: ${s.join(", ")}.`}}const rule$7=new LinterRule(name$f,linterFunction$4);async function getFilesInWPT(e,t){let n;try{const t=new URL(e);if(t.pathname.startsWith("/web-platform-tests/wpt/")){const e=/web-platform-tests\/wpt\/(.+)/;n=t.pathname.match(e)[1].replace(/\//g,"")}else n=t.pathname.replace(/\//g,"")}catch(e){return pub("warn","Failed to parse WPT directory from testSuiteURI"),console.error(e),null}const r=new URL("web-platform-tests/wpt/files",`${t}/`);r.searchParams.set("path",n);const o=await fetch(r);if(!o.ok){return pub("warn","Failed to fetch files from WPT repository. "+`Request failed with error: ${await o.text()} (${o.status})`),null}const{entries:i}=await o.json(),s=i.filter(e=>!e.endsWith("/"));return new Set(s)}const name$g="w3c/defaults";linter.register(rule$6,rule$7);const w3cDefaults={lint:{"privsec-section":!0,"wpt-tests-exist":!1},pluralize:!0,doJsonLd:!1,license:"w3c-software-doc",logos:[{src:"https://www.w3.org/StyleSheets/TR/2016/logos/W3C",alt:"W3C",height:48,width:72,url:"https://www.w3.org/"}],xref:!0};function run$5(e){if("unofficial"===e.specStatus)return;const t=!1!==e.lint&&{...coreDefaults.lint,...w3cDefaults.lint,...e.lint};Object.assign(e,{...coreDefaults,...w3cDefaults,...e,lint:t}),Object.assign(e,{definitionMap:definitionMap})}var defaults$6=Object.freeze({__proto__:null,name:name$g,run:run$5});const name$h="core/style",styleElement=insertStyle$1();async function loadStyle$1(){try{return(await Promise.resolve().then((function(){return respec$1}))).default}catch{return fetchAsset("respec.css")}}async function insertStyle$1(){const e=document.createElement("style");return e.id="respec-mainstyle",e.textContent=await loadStyle$1(),document.head.appendChild(e),e}async function run$6(e){e.noReSpecCSS&&(await styleElement).remove()}var style=Object.freeze({__proto__:null,name:name$h,run:run$6});const name$i="w3c/style";function attachFixupScript(e,t){const n=e.createElement("script");location.hash&&n.addEventListener("load",()=>{window.location.href=location.hash},{once:!0}),n.src=`https://www.w3.org/scripts/TR/${t}/fixup.js`,e.body.appendChild(n)}function createMetaViewport(){const e=document.createElement("meta");e.name="viewport";return e.content=toKeyValuePairs({width:"device-width","initial-scale":"1","shrink-to-fit":"no"}).replace(/"/g,""),e}function createBaseStyle(){const e=document.createElement("link");return e.rel="stylesheet",e.href="https://www.w3.org/StyleSheets/TR/2016/base.css",e.classList.add("removeOnSave"),e}function selectStyleVersion(e){let t="";switch(e){case null:case!0:t="2016";break;default:e&&!isNaN(e)&&(t=e.toString().trim())}return t}function createResourceHints(){return[{hint:"preconnect",href:"https://www.w3.org"},{hint:"preload",href:"https://www.w3.org/scripts/TR/2016/fixup.js",as:"script"},{hint:"preload",href:"https://www.w3.org/StyleSheets/TR/2016/base.css",as:"style"},{hint:"preload",href:"https://www.w3.org/StyleSheets/TR/2016/logos/W3C",as:"image"}].map(createResourceHint).reduce((e,t)=>(e.appendChild(t),e),document.createDocumentFragment())}const elements=createResourceHints();function styleMover(e){return t=>{const n=t.querySelector(`head link[href="${e}"]`);t.querySelector("head").append(n)}}function run$7(e){if(!e.specStatus){const t="`respecConfig.specStatus` missing. Defaulting to 'base'.";e.specStatus="base",pub("warn",t)}let t="W3C-";switch(e.specStatus.toUpperCase()){case"CG-DRAFT":case"CG-FINAL":case"BG-DRAFT":case"BG-FINAL":t=e.specStatus.toLowerCase();break;case"FPWD":case"LC":case"WD-NOTE":case"LC-NOTE":t+="WD";break;case"WG-NOTE":case"FPWD-NOTE":t+="WG-NOTE.css";break;case"UNOFFICIAL":t+="UD";break;case"FINDING":case"FINDING-DRAFT":case"BASE":t="base.css";break;default:t+=e.specStatus}const n=selectStyleVersion(e.useExperimentalStyles||"2016");n&&!e.noToc&&sub("end-all",()=>{attachFixupScript(document,n)},{once:!0});const r=`https://www.w3.org/StyleSheets/TR/${n?`${n}/`:""}${t}`;linkCSS(document,r),sub("beforesave",styleMover(r))}elements.appendChild(createBaseStyle()),document.head.querySelector("meta[name=viewport]")||elements.prepend(createMetaViewport()),document.head.prepend(elements);var style$1=Object.freeze({__proto__:null,name:name$i,run:run$7});const name$j="w3c/l10n",additions={en:{status_at_publication:"This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/."},ko:{status_at_publication:"This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/."},zh:{status_at_publication:"本章节描述了本文档的发布状态。其它更新版本可能会覆盖本文档。W3C的文档列 表和最新版本可通过<a href='https://www.w3.org/TR/'>W3C技术报告</a>索引访问。"},ja:{status_at_publication:"この節には、公開時点でのこの文書の位置づけが記されている。他の文書によって置き換えられる可能性がある。現時点でのW3Cの発行文書とこのテクニカルレポートの最新版は、下記から参照できる。 <a href='https://www.w3.org/TR/'>W3C technical reports index</a> (https://www.w3.org/TR/)"},nl:{status_at_publication:"This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/."},es:{status_at_publication:"Esta sección describe el estado del presente documento al momento de su publicación. El presente documento puede ser remplazado por otros. Una lista de las publicaciones actuales del W3C y la última revisión del presente informe técnico puede hallarse en http://www.w3.org/TR/ <a href='https://www.w3.org/TR/'>el índice de informes técnicos</a> del W3C."}};Object.keys(additions).forEach(e=>{Object.assign(l10n[e],additions[e])});var l10n$2=Object.freeze({__proto__:null,name:name$j});const name$k="core/github";let resolveGithubPromise,rejectGithubPromise;const github=new Promise((e,t)=>{resolveGithubPromise=e,rejectGithubPromise=e=>{pub("error",e),t(new Error(e))}}),localizationStrings={en:{file_a_bug:"File a bug",participate:"Participate",commit_history:"Commit history"},nl:{commit_history:"Revisiehistorie",file_a_bug:"Dien een melding in",participate:"Doe mee"},es:{commit_history:"Historia de cambios",file_a_bug:"Nota un bug",participate:"Participe"}},l10n$3=getIntlData(localizationStrings);async function run$8(e){if(!e.hasOwnProperty("github")||!e.github)return void resolveGithubPromise(null);if("object"==typeof e.github&&!e.github.hasOwnProperty("repoURL")){return void rejectGithubPromise("Config option `[github](https://github.com/w3c/respec/wiki/github)` is missing property `repoURL`.")}let t,n=e.github.repoURL||e.github;n.endsWith("/")||(n+="/");try{t=new URL(n,"https://github.com")}catch{return void rejectGithubPromise(`\`respecConf.github\` is not a valid URL? (${t})`)}if("https://github.com"!==t.origin){return void rejectGithubPromise(`\`respecConf.github\` must be HTTPS and pointing to GitHub. (${t})`)}const[r,o]=t.pathname.split("/").filter(e=>e);if(!r||!o){return void rejectGithubPromise("`respecConf.github` URL needs a path with, for example, w3c/my-spec")}const i=e.github.branch||"gh-pages",s=new URL("./issues/",t).href,a={edDraftURI:`https://${r.toLowerCase()}.github.io/${o}/`,githubToken:void 0,githubUser:void 0,issueBase:s,atRiskBase:s,otherLinks:[],pullBase:new URL("./pulls/",t).href,shortName:o},c={key:l10n$3.participate,data:[{value:`GitHub ${r}/${o}`,href:t},{value:l10n$3.file_a_bug,href:a.issueBase},{value:l10n$3.commit_history,href:new URL(`./commits/${i}`,t.href).href},{value:"Pull requests",href:a.pullBase}]};let l="https://respec.org/github";if(e.githubAPI)if(new URL(e.githubAPI).hostname===window.parent.location.hostname)l=e.githubAPI;else{pub("warn","`respecConfig.githubAPI` should not be added manually.")}const u={branch:i,repoURL:t.href,apiBase:l,fullName:`${r}/${o}`};resolveGithubPromise(u);const d={...a,...e,github:u,githubAPI:l};Object.assign(e,d),e.otherLinks.unshift(c)}var github$1=Object.freeze({__proto__:null,name:name$k,github:github,run:run$8});const name$l="core/data-include";function processResponse(e,t,n){const r=document.querySelector(`[data-include-id=${t}]`),o=r.ownerDocument,i=runTransforms(e,r.dataset.oninclude,n),s="string"==typeof r.dataset.includeReplace;let a;switch(r.dataset.includeFormat){case"text":s?(a=o.createTextNode(i),r.replaceWith(a)):r.textContent=i;break;default:if(r.innerHTML=i,s){for(a=o.createDocumentFragment();r.hasChildNodes();)a.append(r.removeChild(r.firstChild));r.replaceWith(a)}}o.contains(r)&&cleanUp(r)}function cleanUp(e){["data-include","data-include-format","data-include-replace","data-include-id","oninclude"].forEach(t=>e.removeAttribute(t))}async function run$9(){const e=document.querySelectorAll("[data-include]"),t=Array.from(e).map(async e=>{const t=e.dataset.include;if(!t)return;const n=`include-${String(Math.random()).substr(2)}`;e.dataset.includeId=n;try{const e=await fetch(t);processResponse(await e.text(),n,t)}catch(n){const r=`\`data-include\` failed: \`${t}\` (${n.message}). See console for details.`;console.error("data-include failed for element: ",e,n),pub("error",r)}});await Promise.all(t)}var dataInclude=Object.freeze({__proto__:null,name:name$l,run:run$9});const html$1=hyperHTML$1;var showLink=e=>{if(!e.key){const t="Found a link without `key` attribute in the configuration. See dev console.";return pub("warn",t),void console.warn("warn",t,e)}return html$1`
    <dt class="${e.class?e.class:null}">${e.key}:</dt>
    ${e.data?e.data.map(showLinkData):showLinkData(e)}
  `};function showLinkData(e){return html$1`
    <dd class="${e.class?e.class:null}">
      ${e.href?html$1`
            <a href="${e.href}">${e.value||e.href}</a>
          `:""}
    </dd>
  `}var showLogo=e=>{const t=hyperHTML$1`
    <a href="${e.url||""}" class="logo"></a>
  `;e.alt||showInlineWarning(t,"Found spec logo without an `alt` attribute");const n=hyperHTML$1`
    <img
      id="${e.id}"
      alt="${e.alt}"
      width="${e.width}"
      height="${e.height}"
    />
  `;return n.src=e.src,t.append(n),t};const localizationStrings$1={en:{until:"Until"},es:{until:"Hasta"}},lang$9=lang in localizationStrings$1?lang:"en";var showPeople=(e=[])=>{const t=localizationStrings$1[lang$9];return e.map((function(e){const r=[e.name],o=[e.company],i=e.w3cid?parseInt(e.w3cid,10):null,s=hyperHTML$1`
      <dd class="p-author h-card vcard" data-editor-id="${i}"></dd>
    `,a=document.createDocumentFragment(),c=[];e.mailto?c.push(hyperHTML$1`
        <a class="ed_mailto u-email email p-name" href="${`mailto:${e.mailto}`}"
          >${r}</a
        >
      `):e.url?c.push(hyperHTML$1`
        <a class="u-url url p-name fn" href="${e.url}">${r}</a>
      `):c.push(hyperHTML$1`
          <span class="p-name fn">${r}</span>
        `);e.orcid&&c.push(hyperHTML$1`
          <a class="p-name orcid" href="${e.orcid}"
=======
window.respecVersion = "24.34.1";
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
  Promise.resolve().then(function () { return headers; }),
  Promise.resolve().then(function () { return abstract; }),
  Promise.resolve().then(function () { return dataTransform; }),
  Promise.resolve().then(function () { return dataAbbr; }),
  Promise.resolve().then(function () { return inlines; }),
  Promise.resolve().then(function () { return conformance; }),
  Promise.resolve().then(function () { return dfn; }),
  Promise.resolve().then(function () { return pluralize$2; }),
  Promise.resolve().then(function () { return examples; }),
  Promise.resolve().then(function () { return issuesNotes; }),
  Promise.resolve().then(function () { return requirements; }),
  Promise.resolve().then(function () { return bestPractices; }),
  Promise.resolve().then(function () { return figures; }),
  Promise.resolve().then(function () { return webidl; }),
  Promise.resolve().then(function () { return dataCite; }),
  Promise.resolve().then(function () { return biblio$1; }),
  Promise.resolve().then(function () { return webidlIndex; }),
  Promise.resolve().then(function () { return linkToDfn; }),
  Promise.resolve().then(function () { return renderBiblio; }),
  Promise.resolve().then(function () { return contrib; }),
  Promise.resolve().then(function () { return fixHeaders; }),
  Promise.resolve().then(function () { return structure$1; }),
  Promise.resolve().then(function () { return informative; }),
  Promise.resolve().then(function () { return idHeaders; }),
  Promise.resolve().then(function () { return caniuse; }),
  Promise.resolve().then(function () { return mdnAnnotation; }),
  Promise.resolve().then(function () { return saveHtml; }),
  Promise.resolve().then(function () { return searchSpecref; }),
  Promise.resolve().then(function () { return searchXref; }),
  Promise.resolve().then(function () { return dfnList; }),
  Promise.resolve().then(function () { return aboutRespec; }),
  Promise.resolve().then(function () { return seo; }),
  Promise.resolve().then(function () { return seo$1; }),
  Promise.resolve().then(function () { return highlight; }),
  Promise.resolve().then(function () { return webidlClipboard; }),
  Promise.resolve().then(function () { return dataTests; }),
  Promise.resolve().then(function () { return listSorter; }),
  Promise.resolve().then(function () { return highlightVars$1; }),
  Promise.resolve().then(function () { return dataType; }),
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
const dashes = /-/g;

const ISODate = new Intl.DateTimeFormat(["en-ca-iso8601"], {
  timeZone: "UTC",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

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
  ".informative, .note, .issue, .example, .ednote, .practice, .introductory";
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

// --- DATE HELPERS -------------------------------------------------------------------------------
// Takes a Date object and an optional separator and returns the year,month,day representation with
// the custom separator (defaulting to none) and proper 0-padding
function concatDate(date, sep = "") {
  return ISODate.format(date).replace(dashes, sep);
}

// formats a date to "yyyy-mm-dd"
function toShortIsoDate(date) {
  return ISODate.format(date);
}

// given either a Date object or a date in YYYY-MM-DD format,
// return a human-formatted date suitable for use in a W3C specification
function humanDate(
  date = new Date(),
  lang = document.documentElement.lang || "en"
) {
  if (!(date instanceof Date)) date = new Date(date);
  const langs = [lang, "en"];
  const day = date.toLocaleString(langs, {
    day: "2-digit",
    timeZone: "UTC",
  });
  const month = date.toLocaleString(langs, {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.toLocaleString(langs, {
    year: "numeric",
    timeZone: "UTC",
  });
  // date month year
  return `${day} ${month} ${year}`;
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
  const response = await fetch(new URL(`../../${path}`, (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('respec-w3c.js', document.baseURI).href))));
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

/**
 * @param {string} text
 */
function lastLine(text) {
  const splitted = text.split("\n");
  return splitted[splitted.length - 1];
}

/**
 * @typedef {object} WebIDL2ErrorOptions
 * @property {"error" | "warning"} [level]
 * @property {Function} [autofix]
 *
 * @param {string} message error message
 * @param {"Syntax" | "Validation"} kind error type
 * @param {WebIDL2ErrorOptions} [options]
 */
function error(source, position, current, message, kind, { level = "error", autofix, ruleName } = {}) {
  /**
   * @param {number} count
   */
  function sliceTokens(count) {
    return count > 0 ?
      source.slice(position, position + count) :
      source.slice(Math.max(position + count, 0), position);
  }

  function tokensToText(inputs, { precedes } = {}) {
    const text = inputs.map(t => t.trivia + t.value).join("");
    const nextToken = source[position];
    if (nextToken.type === "eof") {
      return text;
    }
    if (precedes) {
      return text + nextToken.trivia;
    }
    return text.slice(nextToken.trivia.length);
  }

  const maxTokens = 5; // arbitrary but works well enough
  const line =
    source[position].type !== "eof" ? source[position].line :
    source.length > 1 ? source[position - 1].line :
    1;

  const precedingLastLine = lastLine(
    tokensToText(sliceTokens(-maxTokens), { precedes: true })
  );

  const subsequentTokens = sliceTokens(maxTokens);
  const subsequentText = tokensToText(subsequentTokens);
  const subsequentFirstLine = subsequentText.split("\n")[0];

  const spaced = " ".repeat(precedingLastLine.length) + "^";
  const sourceContext = precedingLastLine + subsequentFirstLine + "\n" + spaced;

  const contextType = kind === "Syntax" ? "since" : "inside";
  const inSourceName = source.name ? ` in ${source.name}` : "";
  const grammaticalContext = (current && current.name) ? `, ${contextType} \`${current.partial ? "partial " : ""}${current.type} ${current.name}\`` : "";
  const context = `${kind} error at line ${line}${inSourceName}${grammaticalContext}:\n${sourceContext}`;
  return {
    message: `${context} ${message}`,
    bareMessage: message,
    context,
    line,
    sourceName: source.name,
    level,
    ruleName,
    autofix,
    input: subsequentText,
    tokens: subsequentTokens
  };
}

/**
 * @param {string} message error message
 */
function syntaxError(source, position, current, message) {
  return error(source, position, current, message, "Syntax");
}

/**
 * @param {string} message error message
 * @param {WebIDL2ErrorOptions} [options]
 */
function validationError(token, current, ruleName, message, options = {}) {
  options.ruleName = ruleName;
  return error(current.source, token.index, current, message, "Validation", options);
}

// @ts-check

class Base {
  /**
   * @param {object} initializer
   * @param {Base["source"]} initializer.source
   * @param {Base["tokens"]} initializer.tokens
   */
  constructor({ source, tokens }) {
    Object.defineProperties(this, {
      source: { value: source },
      tokens: { value: tokens },
      parent: { value: null, writable: true },
      this: { value: this } // useful when escaping from proxy
    });
  }

  toJSON() {
    const json = { type: undefined, name: undefined, inheritance: undefined };
    let proto = this;
    while (proto !== Object.prototype) {
      const descMap = Object.getOwnPropertyDescriptors(proto);
      for (const [key, value] of Object.entries(descMap)) {
        if (value.enumerable || value.get) {
          // @ts-ignore - allow indexing here
          json[key] = this[key];
        }
      }
      proto = Object.getPrototypeOf(proto);
    }
    return json;
  }
}

// @ts-check

/**
 * @typedef {import("../productions/dictionary.js").Dictionary} Dictionary
 *
 * @param {*} idlType
 * @param {import("../validator.js").Definitions} defs
 * @param {object} [options]
 * @param {boolean} [options.useNullableInner] use when the input idlType is nullable and you want to use its inner type
 * @return {{ reference: *, dictionary: Dictionary }} the type reference that ultimately includes dictionary.
 */
function idlTypeIncludesDictionary(idlType, defs, { useNullableInner } = {}) {
  if (!idlType.union) {
    const def = defs.unique.get(idlType.idlType);
    if (!def) {
      return;
    }
    if (def.type === "typedef") {
      const { typedefIncludesDictionary } = defs.cache;
      if (typedefIncludesDictionary.has(def)) {
        // Note that this also halts when it met indeterminate state
        // to prevent infinite recursion
        return typedefIncludesDictionary.get(def);
      }
      defs.cache.typedefIncludesDictionary.set(def, undefined); // indeterminate state
      const result = idlTypeIncludesDictionary(def.idlType, defs);
      defs.cache.typedefIncludesDictionary.set(def, result);
      if (result) {
        return {
          reference: idlType,
          dictionary: result.dictionary
        };
      }
    }
    if (def.type === "dictionary" && (useNullableInner || !idlType.nullable)) {
      return {
        reference: idlType,
        dictionary: def
      };
    }
  }
  for (const subtype of idlType.subtype) {
    const result = idlTypeIncludesDictionary(subtype, defs);
    if (result) {
      if (subtype.union) {
        return result;
      }
      return {
        reference: subtype,
        dictionary: result.dictionary
      };
    }
  }
}

/**
 * @param {*} dict dictionary type
 * @param {import("../validator.js").Definitions} defs
 * @return {boolean}
 */
function dictionaryIncludesRequiredField(dict, defs) {
  if (defs.cache.dictionaryIncludesRequiredField.has(dict)) {
    return defs.cache.dictionaryIncludesRequiredField.get(dict);
  }
  defs.cache.dictionaryIncludesRequiredField.set(dict, undefined); // indeterminate
  if (dict.inheritance) {
    const superdict = defs.unique.get(dict.inheritance);
    if (!superdict) {
      return true;
    }
    if (dictionaryIncludesRequiredField(superdict, defs)) {
      return true;
    }
  }
  const result = dict.members.some(field => field.required);
  defs.cache.dictionaryIncludesRequiredField.set(dict, result);
  return result;
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} typeName
 */
function generic_type(tokeniser, typeName) {
  const base = tokeniser.consume("FrozenArray", "Promise", "sequence", "record");
  if (!base) {
    return;
  }
  const ret = autoParenter(new Type({ source: tokeniser.source, tokens: { base } }));
  ret.tokens.open = tokeniser.consume("<") || tokeniser.error(`No opening bracket after ${base.type}`);
  switch (base.type) {
    case "Promise": {
      if (tokeniser.probe("[")) tokeniser.error("Promise type cannot have extended attribute");
      const subtype = return_type(tokeniser, typeName) || tokeniser.error("Missing Promise subtype");
      ret.subtype.push(subtype);
      break;
    }
    case "sequence":
    case "FrozenArray": {
      const subtype = type_with_extended_attributes(tokeniser, typeName) || tokeniser.error(`Missing ${base.type} subtype`);
      ret.subtype.push(subtype);
      break;
    }
    case "record": {
      if (tokeniser.probe("[")) tokeniser.error("Record key cannot have extended attribute");
      const keyType = tokeniser.consume(...stringTypes) || tokeniser.error(`Record key must be one of: ${stringTypes.join(", ")}`);
      const keyIdlType = new Type({ source: tokeniser.source, tokens: { base: keyType }});
      keyIdlType.tokens.separator = tokeniser.consume(",") || tokeniser.error("Missing comma after record key type");
      keyIdlType.type = typeName;
      const valueType = type_with_extended_attributes(tokeniser, typeName) || tokeniser.error("Error parsing generic type record");
      ret.subtype.push(keyIdlType, valueType);
      break;
    }
  }
  if (!ret.idlType) tokeniser.error(`Error parsing generic type ${base.type}`);
  ret.tokens.close = tokeniser.consume(">") || tokeniser.error(`Missing closing bracket after ${base.type}`);
  return ret.this;
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function type_suffix(tokeniser, obj) {
  const nullable = tokeniser.consume("?");
  if (nullable) {
    obj.tokens.nullable = nullable;
  }
  if (tokeniser.probe("?")) tokeniser.error("Can't nullable more than once");
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} typeName
 */
function single_type(tokeniser, typeName) {
  let ret = generic_type(tokeniser, typeName) || primitive_type(tokeniser);
  if (!ret) {
    const base = tokeniser.consume("identifier", ...stringTypes, ...typeNameKeywords);
    if (!base) {
      return;
    }
    ret = new Type({ source: tokeniser.source, tokens: { base } });
    if (tokeniser.probe("<")) tokeniser.error(`Unsupported generic type ${base.value}`);
  }
  if (ret.generic === "Promise" && tokeniser.probe("?")) {
    tokeniser.error("Promise type cannot be nullable");
  }
  ret.type = typeName || null;
  type_suffix(tokeniser, ret);
  if (ret.nullable && ret.idlType === "any") tokeniser.error("Type `any` cannot be made nullable");
  return ret;
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} type
 */
function union_type(tokeniser, type) {
  const tokens = {};
  tokens.open = tokeniser.consume("(");
  if (!tokens.open) return;
  const ret = autoParenter(new Type({ source: tokeniser.source, tokens }));
  ret.type = type || null;
  while (true) {
    const typ = type_with_extended_attributes(tokeniser) || tokeniser.error("No type after open parenthesis or 'or' in union type");
    if (typ.idlType === "any") tokeniser.error("Type `any` cannot be included in a union type");
    if (typ.generic === "Promise") tokeniser.error("Type `Promise` cannot be included in a union type");
    ret.subtype.push(typ);
    const or = tokeniser.consume("or");
    if (or) {
      typ.tokens.separator = or;
    }
    else break;
  }
  if (ret.idlType.length < 2) {
    tokeniser.error("At least two types are expected in a union type but found less");
  }
  tokens.close = tokeniser.consume(")") || tokeniser.error("Unterminated union type");
  type_suffix(tokeniser, ret);
  return ret.this;
}

class Type extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {string} typeName
   */
  static parse(tokeniser, typeName) {
    return single_type(tokeniser, typeName) || union_type(tokeniser, typeName);
  }

  constructor({ source, tokens }) {
    super({ source, tokens });
    Object.defineProperty(this, "subtype", { value: [], writable: true });
    this.extAttrs = [];
  }

  get generic() {
    if (this.subtype.length && this.tokens.base) {
      return this.tokens.base.value;
    }
    return "";
  }
  get nullable() {
    return Boolean(this.tokens.nullable);
  }
  get union() {
    return Boolean(this.subtype.length) && !this.tokens.base;
  }
  get idlType() {
    if (this.subtype.length) {
      return this.subtype;
    }
    // Adding prefixes/postfixes for "unrestricted float", etc.
    const name = [
      this.tokens.prefix,
      this.tokens.base,
      this.tokens.postfix
    ].filter(t => t).map(t => t.value).join(" ");
    return unescape(name);
  }

  *validate(defs) {
    /*
     * If a union is nullable, its subunions cannot include a dictionary
     * If not, subunions may include dictionaries if each union is not nullable
     */
    const typedef = !this.union && defs.unique.get(this.idlType);
    const target =
      this.union ? this :
      (typedef && typedef.type === "typedef") ? typedef.idlType :
      undefined;
    if (target && this.nullable) {
      // do not allow any dictionary
      const { reference } = idlTypeIncludesDictionary(target, defs) || {};
      if (reference) {
        const targetToken = (this.union ? reference : this).tokens.base;
        const message = `Nullable union cannot include a dictionary type`;
        yield validationError(targetToken, this, "no-nullable-union-dict", message);
      }
    } else {
      // allow some dictionary
      for (const subtype of this.subtype) {
        yield* subtype.validate(defs);
      }
    }
  }
}

class Default extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const assign = tokeniser.consume("=");
    if (!assign) {
      return null;
    }
    const def = const_value(tokeniser) || tokeniser.consume("string", "null", "[", "{") || tokeniser.error("No value for default");
    const expression = [def];
    if (def.type === "[") {
      const close = tokeniser.consume("]") || tokeniser.error("Default sequence value must be empty");
      expression.push(close);
    } else if (def.type === "{") {
      const close = tokeniser.consume("}") || tokeniser.error("Default dictionary value must be empty");
      expression.push(close);
    }
    return new Default({ source: tokeniser.source, tokens: { assign }, expression });
  }

  constructor({ source, tokens, expression }) {
    super({ source, tokens });
    expression.parent = this;
    Object.defineProperty(this, "expression", { value: expression });
  }

  get type() {
    return const_data(this.expression[0]).type;
  }
  get value() {
    return const_data(this.expression[0]).value;
  }
  get negative() {
    return const_data(this.expression[0]).negative;
  }
}

// @ts-check

class ArrayBase extends Array {
  constructor({ source, tokens }) {
    super();
    Object.defineProperties(this, {
      source: { value: source },
      tokens: { value: tokens },
      parent: { value: null, writable: true }
    });
  }
}

// @ts-check

class Token extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {string} type
   */
  static parser(tokeniser, type) {
    return () => {
      const value = tokeniser.consume(type);
      if (value) {
        return new Token({ source: tokeniser.source, tokens: { value } });
      }
    };
  }

  get value() {
    return unescape(this.tokens.value.value);
  }
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} tokenName
 */
function tokens(tokeniser, tokenName) {
  const toks = list(tokeniser, {
    parser: Token.parser(tokeniser, tokenName),
    listName: tokenName + " list"
  });
  return toks;
}

/**
 * This will allow a set of identifiers or strings to be parsed.
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function identifiersOrStrings(tokeniser) {
  let toks = tokens(tokeniser, "identifier");
  if (toks.length) {
    return toks;
  }
  toks = tokens(tokeniser, "string");
  if (toks.length) {
    return toks;
  }
  tokeniser.error(`Expected identifiers or strings but none found`);
}


class ExtendedAttributeParameters extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const tokens = { assign: tokeniser.consume("=") };
    const ret = autoParenter(new ExtendedAttributeParameters({ source: tokeniser.source, tokens }));
    if (tokens.assign) {
      tokens.secondaryName = tokeniser.consume("identifier", "decimal", "integer", "string");
    }
    tokens.open = tokeniser.consume("(");
    if (tokens.open) {
      ret.list = ret.rhsIsList ?
        // [Exposed=(Window,Worker)]
        identifiersOrStrings(tokeniser) :
        // [NamedConstructor=Audio(DOMString src)] or [Constructor(DOMString str)]
        argument_list(tokeniser);
      tokens.close = tokeniser.consume(")") || tokeniser.error("Unexpected token in extended attribute argument list");
    } else if (ret.hasRhs && !tokens.secondaryName) {
      tokeniser.error("No right hand side to extended attribute assignment");
    }
    return ret.this;
  }

  get rhsIsList() {
    return this.tokens.assign && !this.tokens.secondaryName;
  }

  get rhsType() {
    if (this.rhsIsList) {
      return this.list[0].tokens.value.type + "-list";
    }
    if (this.tokens.secondaryName) {
      return this.tokens.secondaryName.type;
    }
    return null;
  }
}

class SimpleExtendedAttribute extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const name = tokeniser.consume("identifier");
    if (name) {
      return new SimpleExtendedAttribute({
        source: tokeniser.source,
        tokens: { name },
        params: ExtendedAttributeParameters.parse(tokeniser)
      });
    }
  }

  constructor({ source, tokens, params }) {
    super({ source, tokens });
    params.parent = this;
    Object.defineProperty(this, "params", { value: params });
  }

  get type() {
    return "extended-attribute";
  }
  get name() {
    return this.tokens.name.value;
  }
  get rhs() {
    const { rhsType: type, tokens, list } = this.params;
    if (!type) {
      return null;
    }
    const value = this.params.rhsIsList ? list : unescape(tokens.secondaryName.value);
    return { type, value };
  }
  get arguments() {
    const { rhsIsList, list } = this.params;
    if (!list || rhsIsList) {
      return [];
    }
    return list;
  }

  *validate(defs) {
    if (this.name === "NoInterfaceObject") {
      const message = `\`[NoInterfaceObject]\` extended attribute is an \
undesirable feature that may be removed from Web IDL in the future. Refer to the \
[relevant upstream PR](https://github.com/heycam/webidl/pull/609) for more \
information.`;
      yield validationError(this.tokens.name, this, "no-nointerfaceobject", message, { level: "warning" });
    }
    for (const arg of this.arguments) {
      yield* arg.validate(defs);
    }
  }
}

// Note: we parse something simpler than the official syntax. It's all that ever
// seems to be used
class ExtendedAttributes extends ArrayBase {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const tokens = {};
    tokens.open = tokeniser.consume("[");
    if (!tokens.open) return new ExtendedAttributes({});
    const ret = new ExtendedAttributes({ source: tokeniser.source, tokens });
    ret.push(...list(tokeniser, {
      parser: SimpleExtendedAttribute.parse,
      listName: "extended attribute"
    }));
    tokens.close = tokeniser.consume("]") || tokeniser.error("Unexpected closing token of extended attribute");
    if (!ret.length) {
      tokeniser.error("Found an empty extended attribute");
    }
    if (tokeniser.probe("[")) {
      tokeniser.error("Illegal double extended attribute lists, consider merging them");
    }
    return ret;
  }

  *validate(defs) {
    for (const extAttr of this) {
      yield* extAttr.validate(defs);
    }
  }
}

// @ts-check

class Argument extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const start_position = tokeniser.position;
    /** @type {Base["tokens"]} */
    const tokens = {};
    const ret = autoParenter(new Argument({ source: tokeniser.source, tokens }));
    ret.extAttrs = ExtendedAttributes.parse(tokeniser);
    tokens.optional = tokeniser.consume("optional");
    ret.idlType = type_with_extended_attributes(tokeniser, "argument-type");
    if (!ret.idlType) {
      return tokeniser.unconsume(start_position);
    }
    if (!tokens.optional) {
      tokens.variadic = tokeniser.consume("...");
    }
    tokens.name = tokeniser.consume("identifier", ...argumentNameKeywords);
    if (!tokens.name) {
      return tokeniser.unconsume(start_position);
    }
    ret.default = tokens.optional ? Default.parse(tokeniser) : null;
    return ret.this;
  }

  get type() {
    return "argument";
  }
  get optional() {
    return !!this.tokens.optional;
  }
  get variadic() {
    return !!this.tokens.variadic;
  }
  get name() {
    return unescape(this.tokens.name.value);
  }

  /**
   * @param {import("../validator.js").Definitions} defs
   */
  *validate(defs) {
    yield* this.idlType.validate(defs);
    const result = idlTypeIncludesDictionary(this.idlType, defs, { useNullableInner: true });
    if (result) {
      if (this.idlType.nullable) {
        const message = `Dictionary arguments cannot be nullable.`;
        yield validationError(this.tokens.name, this, "no-nullable-dict-arg", message);
      } else if (!this.optional) {
        if (this.parent && !dictionaryIncludesRequiredField(result.dictionary, defs) && isLastRequiredArgument(this)) {
          const message = `Dictionary argument must be optional if it has no required fields`;
          yield validationError(this.tokens.name, this, "dict-arg-optional", message, {
            autofix: autofixDictionaryArgumentOptionality(this)
          });
        }
      } else if (!this.default) {
        const message = `Optional dictionary arguments must have a default value of \`{}\`.`;
        yield validationError(this.tokens.name, this, "dict-arg-default", message, {
          autofix: autofixOptionalDictionaryDefaultValue(this)
        });
      }
    }
  }
}

/**
 * @param {Argument} arg
 */
function isLastRequiredArgument(arg) {
  const list = arg.parent.arguments || arg.parent.list;
  const index = list.indexOf(arg);
  const requiredExists = list.slice(index + 1).some(a => !a.optional);
  return !requiredExists;
}

/**
 * @param {Argument} arg
 */
function autofixDictionaryArgumentOptionality(arg) {
  return () => {
    const firstToken = getFirstToken(arg.idlType);
    arg.tokens.optional = { type: "optional", value: "optional", trivia: firstToken.trivia };
    firstToken.trivia = " ";
    autofixOptionalDictionaryDefaultValue(arg)();
  };
}

/**
 * @param {Argument} arg
 */
function autofixOptionalDictionaryDefaultValue(arg) {
  return () => {
    arg.default = Default.parse(new Tokeniser(" = {}"));
  };
}

class Operation extends Base {
  /**
   * @typedef {import("../tokeniser.js").Token} Token
   *
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   * @param {object} [options]
   * @param {Token} [options.special]
   * @param {Token} [options.regular]
   */
  static parse(tokeniser, { special, regular } = {}) {
    const tokens = { special };
    const ret = autoParenter(new Operation({ source: tokeniser.source, tokens }));
    if (special && special.value === "stringifier") {
      tokens.termination = tokeniser.consume(";");
      if (tokens.termination) {
        ret.arguments = [];
        return ret;
      }
    }
    if (!special && !regular) {
      tokens.special = tokeniser.consume("getter", "setter", "deleter");
    }
    ret.idlType = return_type(tokeniser) || tokeniser.error("Missing return type");
    tokens.name = tokeniser.consume("identifier", "includes");
    tokens.open = tokeniser.consume("(") || tokeniser.error("Invalid operation");
    ret.arguments = argument_list(tokeniser);
    tokens.close = tokeniser.consume(")") || tokeniser.error("Unterminated operation");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated operation, expected `;`");
    return ret.this;
  }

  get type() {
    return "operation";
  }
  get name() {
    const { name } = this.tokens;
    if (!name) {
      return "";
    }
    return unescape(name.value);
  }
  get special() {
    if (!this.tokens.special) {
      return "";
    }
    return this.tokens.special.value;
  }

  *validate(defs) {
    if (!this.name && ["", "static"].includes(this.special)) {
      const message = `Regular or static operations must have both a return type and an identifier.`;
      yield validationError(this.tokens.open, this, "incomplete-op", message);
    }
    if (this.idlType) {
      yield* this.idlType.validate(defs);
    }
    for (const argument of this.arguments) {
      yield* argument.validate(defs);
    }
  }
}

class Attribute extends Base {
  /**
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   */
  static parse(tokeniser, { special, noInherit = false, readonly = false } = {}) {
    const start_position = tokeniser.position;
    const tokens = { special };
    const ret = autoParenter(new Attribute({ source: tokeniser.source, tokens }));
    if (!special && !noInherit) {
      tokens.special = tokeniser.consume("inherit");
    }
    if (ret.special === "inherit" && tokeniser.probe("readonly")) {
      tokeniser.error("Inherited attributes cannot be read-only");
    }
    tokens.readonly = tokeniser.consume("readonly");
    if (readonly && !tokens.readonly && tokeniser.probe("attribute")) {
      tokeniser.error("Attributes must be readonly in this context");
    }
    tokens.base = tokeniser.consume("attribute");
    if (!tokens.base) {
      tokeniser.unconsume(start_position);
      return;
    }
    ret.idlType = type_with_extended_attributes(tokeniser, "attribute-type") || tokeniser.error("Attribute lacks a type");
    switch (ret.idlType.generic) {
      case "sequence":
      case "record": tokeniser.error(`Attributes cannot accept ${ret.idlType.generic} types`);
    }
    tokens.name = tokeniser.consume("identifier", "async", "required") || tokeniser.error("Attribute lacks a name");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated attribute, expected `;`");
    return ret.this;
  }

  get type() {
    return "attribute";
  }
  get special() {
    if (!this.tokens.special) {
      return "";
    }
    return this.tokens.special.value;
  }
  get readonly() {
    return !!this.tokens.readonly;
  }
  get name() {
    return unescape(this.tokens.name.value);
  }

  *validate(defs) {
    yield* this.idlType.validate(defs);
  }
}

/**
 * @param {string} identifier
 */
function unescape(identifier) {
  return identifier.startsWith('_') ? identifier.slice(1) : identifier;
}

/**
 * Parses comma-separated list
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {object} args
 * @param {Function} args.parser parser function for each item
 * @param {boolean} [args.allowDangler] whether to allow dangling comma
 * @param {string} [args.listName] the name to be shown on error messages
 */
function list(tokeniser, { parser, allowDangler, listName = "list" }) {
  const first = parser(tokeniser);
  if (!first) {
    return [];
  }
  first.tokens.separator = tokeniser.consume(",");
  const items = [first];
  while (first.tokens.separator) {
    const item = parser(tokeniser);
    if (!item) {
      if (!allowDangler) {
        tokeniser.error(`Trailing comma in ${listName}`);
      }
      break;
    }
    item.tokens.separator = tokeniser.consume(",");
    items.push(item);
    if (!item.tokens.separator) break;
  }
  return items;
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function const_value(tokeniser) {
  return tokeniser.consume("true", "false", "Infinity", "-Infinity", "NaN", "decimal", "integer");
}

/**
 * @param {object} token
 * @param {string} token.type
 * @param {string} token.value
 */
function const_data({ type, value }) {
  switch (type) {
    case "true":
    case "false":
      return { type: "boolean", value: type === "true" };
    case "Infinity":
    case "-Infinity":
      return { type: "Infinity", negative: type.startsWith("-") };
    case "[":
      return { type: "sequence", value: [] };
    case "{":
      return { type: "dictionary" };
    case "decimal":
    case "integer":
      return { type: "number", value };
    case "string":
      return { type: "string", value: value.slice(1, -1) };
    default:
      return { type };
  }
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function primitive_type(tokeniser) {
  function integer_type() {
    const prefix = tokeniser.consume("unsigned");
    const base = tokeniser.consume("short", "long");
    if (base) {
      const postfix = tokeniser.consume("long");
      return new Type({ source, tokens: { prefix, base, postfix } });
    }
    if (prefix) tokeniser.error("Failed to parse integer type");
  }

  function decimal_type() {
    const prefix = tokeniser.consume("unrestricted");
    const base = tokeniser.consume("float", "double");
    if (base) {
      return new Type({ source, tokens: { prefix, base } });
    }
    if (prefix) tokeniser.error("Failed to parse float type");
  }

  const { source } = tokeniser;
  const num_type = integer_type() || decimal_type();
  if (num_type) return num_type;
  const base = tokeniser.consume("boolean", "byte", "octet");
  if (base) {
    return new Type({ source, tokens: { base } });
  }
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function argument_list(tokeniser) {
  return list(tokeniser, { parser: Argument.parse, listName: "arguments list" });
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} typeName
 */
function type_with_extended_attributes(tokeniser, typeName) {
  const extAttrs = ExtendedAttributes.parse(tokeniser);
  const ret = Type.parse(tokeniser, typeName);
  if (ret) autoParenter(ret).extAttrs = extAttrs;
  return ret;
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 * @param {string} typeName
 */
function return_type(tokeniser, typeName) {
  const typ = Type.parse(tokeniser, typeName || "return-type");
  if (typ) {
    return typ;
  }
  const voidToken = tokeniser.consume("void");
  if (voidToken) {
    const ret = new Type({ source: tokeniser.source, tokens: { base: voidToken } });
    ret.type = "return-type";
    return ret;
  }
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function stringifier(tokeniser) {
  const special = tokeniser.consume("stringifier");
  if (!special) return;
  const member = Attribute.parse(tokeniser, { special }) ||
    Operation.parse(tokeniser, { special }) ||
    tokeniser.error("Unterminated stringifier");
  return member;
}

/**
 * @param {string} str
 */
function getLastIndentation(str) {
  const lines = str.split("\n");
  // the first line visually binds to the preceding token
  if (lines.length) {
    const match = lines[lines.length - 1].match(/^\s+/);
    if (match) {
      return match[0];
    }
  }
  return "";
}

/**
 * @param {string} parentTrivia
 */
function getMemberIndentation(parentTrivia) {
  const indentation = getLastIndentation(parentTrivia);
  const indentCh = indentation.includes("\t") ? "\t" : "  ";
  return indentation + indentCh;
}

/**
 * @param {object} def
 * @param {import("./extended-attributes.js").ExtendedAttributes} def.extAttrs
 */
function autofixAddExposedWindow(def) {
  return () => {
    if (def.extAttrs.length){
      const tokeniser = new Tokeniser("Exposed=Window,");
      const exposed = SimpleExtendedAttribute.parse(tokeniser);
      exposed.tokens.separator = tokeniser.consume(",");
      const existing = def.extAttrs[0];
      if (!/^\s/.test(existing.tokens.name.trivia)) {
        existing.tokens.name.trivia = ` ${existing.tokens.name.trivia}`;
      }
      def.extAttrs.unshift(exposed);
    } else {
      autoParenter(def).extAttrs = ExtendedAttributes.parse(new Tokeniser("[Exposed=Window]"));
      const trivia = def.tokens.base.trivia;
      def.extAttrs.tokens.open.trivia = trivia;
      def.tokens.base.trivia = `\n${getLastIndentation(trivia)}`;
    }
  };
}

/**
 * Get the first syntax token for the given IDL object.
 * @param {*} data
 */
function getFirstToken(data) {
  if (data.extAttrs.length) {
    return data.extAttrs.tokens.open;
  }
  if (data.type === "operation" && !data.special) {
    return getFirstToken(data.idlType);
  }
  const tokens = Object.values(data.tokens).sort((x, y) => x.index - y.index);
  return tokens[0];
}

/**
 * @template T
 * @param {T[]} array
 * @param {(item: T) => boolean} predicate
 */
function findLastIndex(array, predicate) {
  const index = array.slice().reverse().findIndex(predicate);
  if (index === -1) {
    return index;
  }
  return array.length - index - 1;
}

/**
 * Returns a proxy that auto-assign `parent` field.
 * @template T
 * @param {T} data
 * @param {*} [parent] The object that will be assigned to `parent`.
 *                     If absent, it will be `data` by default.
 * @return {T}
 */
function autoParenter(data, parent) {
  if (!parent) {
    // Defaults to `data` unless specified otherwise.
    parent = data;
  }
  if (!data) {
    // This allows `autoParenter(undefined)` which again allows
    // `autoParenter(parse())` where the function may return nothing.
    return data;
  }
  return new Proxy(data, {
    get(target, p) {
      const value = target[p];
      if (Array.isArray(value)) {
        // Wraps the array so that any added items will also automatically
        // get their `parent` values.
        return autoParenter(value, target);
      }
      return value;
    },
    set(target, p, value) {
      target[p] = value;
      if (!value) {
        return true;
      } else if (Array.isArray(value)) {
        // Assigning an array will add `parent` to its items.
        for (const item of value) {
          if (typeof item.parent !== "undefined") {
            item.parent = parent;
          }
        }
      } else if (typeof value.parent !== "undefined") {
        value.parent = parent;
      }
      return true;
    }
  });
}

// These regular expressions use the sticky flag so they will only match at
// the current location (ie. the offset of lastIndex).
const tokenRe = {
  // This expression uses a lookahead assertion to catch false matches
  // against integers early.
  "decimal": /-?(?=[0-9]*\.|[0-9]+[eE])(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][-+]?[0-9]+)?|[0-9]+[Ee][-+]?[0-9]+)/y,
  "integer": /-?(0([Xx][0-9A-Fa-f]+|[0-7]*)|[1-9][0-9]*)/y,
  "identifier": /[_-]?[A-Za-z][0-9A-Z_a-z-]*/y,
  "string": /"[^"]*"/y,
  "whitespace": /[\t\n\r ]+/y,
  "comment": /((\/(\/.*|\*([^*]|\*[^/])*\*\/)[\t\n\r ]*)+)/y,
  "other": /[^\t\n\r 0-9A-Za-z]/y
};

const typeNameKeywords = [
  "ArrayBuffer",
  "DataView",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Float32Array",
  "Float64Array",
  "any",
  "object",
  "symbol"
];

const stringTypes = [
  "ByteString",
  "DOMString",
  "USVString"
];

const argumentNameKeywords = [
  "async",
  "attribute",
  "callback",
  "const",
  "constructor",
  "deleter",
  "dictionary",
  "enum",
  "getter",
  "includes",
  "inherit",
  "interface",
  "iterable",
  "maplike",
  "namespace",
  "partial",
  "required",
  "setlike",
  "setter",
  "static",
  "stringifier",
  "typedef",
  "unrestricted"
];

const nonRegexTerminals = [
  "-Infinity",
  "FrozenArray",
  "Infinity",
  "NaN",
  "Promise",
  "boolean",
  "byte",
  "double",
  "false",
  "float",
  "long",
  "mixin",
  "null",
  "octet",
  "optional",
  "or",
  "readonly",
  "record",
  "sequence",
  "short",
  "true",
  "unsigned",
  "void"
].concat(argumentNameKeywords, stringTypes, typeNameKeywords);

const punctuations = [
  "(",
  ")",
  ",",
  "...",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "[",
  "]",
  "{",
  "}"
];

const reserved = [
  // "constructor" is now a keyword
  "_constructor",
  "toString",
  "_toString",
];

/**
 * @typedef {ArrayItemType<ReturnType<typeof tokenise>>} Token
 * @param {string} str
 */
function tokenise(str) {
  const tokens = [];
  let lastCharIndex = 0;
  let trivia = "";
  let line = 1;
  let index = 0;
  while (lastCharIndex < str.length) {
    const nextChar = str.charAt(lastCharIndex);
    let result = -1;

    if (/[\t\n\r ]/.test(nextChar)) {
      result = attemptTokenMatch("whitespace", { noFlushTrivia: true });
    } else if (nextChar === '/') {
      result = attemptTokenMatch("comment", { noFlushTrivia: true });
    }

    if (result !== -1) {
      const currentTrivia = tokens.pop().value;
      line += (currentTrivia.match(/\n/g) || []).length;
      trivia += currentTrivia;
      index -= 1;
    } else if (/[-0-9.A-Z_a-z]/.test(nextChar)) {
      result = attemptTokenMatch("decimal");
      if (result === -1) {
        result = attemptTokenMatch("integer");
      }
      if (result === -1) {
        result = attemptTokenMatch("identifier");
        const lastIndex = tokens.length - 1;
        const token = tokens[lastIndex];
        if (result !== -1) {
          if (reserved.includes(token.value)) {
            const message = `${unescape(token.value)} is a reserved identifier and must not be used.`;
            throw new WebIDLParseError(syntaxError(tokens, lastIndex, null, message));
          } else if (nonRegexTerminals.includes(token.value)) {
            token.type = token.value;
          }
        }
      }
    } else if (nextChar === '"') {
      result = attemptTokenMatch("string");
    }

    for (const punctuation of punctuations) {
      if (str.startsWith(punctuation, lastCharIndex)) {
        tokens.push({ type: punctuation, value: punctuation, trivia, line, index });
        trivia = "";
        lastCharIndex += punctuation.length;
        result = lastCharIndex;
        break;
      }
    }

    // other as the last try
    if (result === -1) {
      result = attemptTokenMatch("other");
    }
    if (result === -1) {
      throw new Error("Token stream not progressing");
    }
    lastCharIndex = result;
    index += 1;
  }

  // remaining trivia as eof
  tokens.push({
    type: "eof",
    value: "",
    trivia
  });

  return tokens;

  /**
   * @param {keyof typeof tokenRe} type
   * @param {object} options
   * @param {boolean} [options.noFlushTrivia]
   */
  function attemptTokenMatch(type, { noFlushTrivia } = {}) {
    const re = tokenRe[type];
    re.lastIndex = lastCharIndex;
    const result = re.exec(str);
    if (result) {
      tokens.push({ type, value: result[0], trivia, line, index });
      if (!noFlushTrivia) {
        trivia = "";
      }
      return re.lastIndex;
    }
    return -1;
  }
}

class Tokeniser {
  /**
   * @param {string} idl
   */
  constructor(idl) {
    this.source = tokenise(idl);
    this.position = 0;
  }

  /**
   * @param {string} message
   * @return {never}
   */
  error(message) {
    throw new WebIDLParseError(syntaxError(this.source, this.position, this.current, message));
  }

  /**
   * @param {string} type
   */
  probe(type) {
    return this.source.length > this.position && this.source[this.position].type === type;
  }

  /**
   * @param  {...string} candidates
   */
  consume(...candidates) {
    for (const type of candidates) {
      if (!this.probe(type)) continue;
      const token = this.source[this.position];
      this.position++;
      return token;
    }
  }

  /**
   * @param {number} position
   */
  unconsume(position) {
    this.position = position;
  }
}

class WebIDLParseError extends Error {
  /**
   * @param {object} options
   * @param {string} options.message
   * @param {string} options.bareMessage
   * @param {string} options.context
   * @param {number} options.line
   * @param {*} options.sourceName
   * @param {string} options.input
   * @param {*[]} options.tokens
   */
  constructor({ message, bareMessage, context, line, sourceName, input, tokens }) {
    super(message);

    this.name = "WebIDLParseError"; // not to be mangled
    this.bareMessage = bareMessage;
    this.context = context;
    this.line = line;
    this.sourceName = sourceName;
    this.input = input;
    this.tokens = tokens;
  }
}

class EnumValue extends Token {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const value = tokeniser.consume("string");
    if (value) {
      return new EnumValue({ source: tokeniser.source, tokens: { value } });
    }
  }

  get type() {
    return "enum-value";
  }
  get value() {
    return super.value.slice(1, -1);
  }
}

class Enum extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    /** @type {Base["tokens"]} */
    const tokens = {};
    tokens.base = tokeniser.consume("enum");
    if (!tokens.base) {
      return;
    }
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("No name for enum");
    const ret = autoParenter(new Enum({ source: tokeniser.source, tokens }));
    tokeniser.current = ret.this;
    tokens.open = tokeniser.consume("{") || tokeniser.error("Bodyless enum");
    ret.values = list(tokeniser, {
      parser: EnumValue.parse,
      allowDangler: true,
      listName: "enumeration"
    });
    if (tokeniser.probe("string")) {
      tokeniser.error("No comma between enum values");
    }
    tokens.close = tokeniser.consume("}") || tokeniser.error("Unexpected value in enum");
    if (!ret.values.length) {
      tokeniser.error("No value in enum");
    }
    tokens.termination = tokeniser.consume(";") || tokeniser.error("No semicolon after enum");
    return ret.this;
  }

  get type() {
    return "enum";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }
}

// @ts-check

class Includes extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const target = tokeniser.consume("identifier");
    if (!target) {
      return;
    }
    const tokens = { target };
    tokens.includes = tokeniser.consume("includes");
    if (!tokens.includes) {
      tokeniser.unconsume(target.index);
      return;
    }
    tokens.mixin = tokeniser.consume("identifier") || tokeniser.error("Incomplete includes statement");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("No terminating ; for includes statement");
    return new Includes({ source: tokeniser.source, tokens });
  }

  get type() {
    return "includes";
  }
  get target() {
    return unescape(this.tokens.target.value);
  }
  get includes() {
    return unescape(this.tokens.mixin.value);
  }
}

class Typedef extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    /** @type {Base["tokens"]} */
    const tokens = {};
    const ret = autoParenter(new Typedef({ source: tokeniser.source, tokens }));
    tokens.base = tokeniser.consume("typedef");
    if (!tokens.base) {
      return;
    }
    ret.idlType = type_with_extended_attributes(tokeniser, "typedef-type") || tokeniser.error("Typedef lacks a type");
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("Typedef lacks a name");
    tokeniser.current = ret.this;
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated typedef, expected `;`");
    return ret.this;
  }

  get type() {
    return "typedef";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }

  *validate(defs) {
    yield* this.idlType.validate(defs);
  }
}

class CallbackFunction extends Base {
  /**
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   */
  static parse(tokeniser, base) {
    const tokens = { base };
    const ret = autoParenter(new CallbackFunction({ source: tokeniser.source, tokens }));
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("Callback lacks a name");
    tokeniser.current = ret.this;
    tokens.assign = tokeniser.consume("=") || tokeniser.error("Callback lacks an assignment");
    ret.idlType = return_type(tokeniser) || tokeniser.error("Callback lacks a return type");
    tokens.open = tokeniser.consume("(") || tokeniser.error("Callback lacks parentheses for arguments");
    ret.arguments = argument_list(tokeniser);
    tokens.close = tokeniser.consume(")") || tokeniser.error("Unterminated callback");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated callback, expected `;`");
    return ret.this;
  }

  get type() {
    return "callback";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }

  *validate(defs) {
    yield* this.idlType.validate(defs);
  }
}

/**
 * @param {import("../tokeniser.js").Tokeniser} tokeniser
 */
function inheritance(tokeniser) {
  const colon = tokeniser.consume(":");
  if (!colon) {
    return {};
  }
  const inheritance = tokeniser.consume("identifier") || tokeniser.error("Inheritance lacks a type");
  return { colon, inheritance };
}

class Container extends Base {
    /**
     * @template T
     * @param {import("../tokeniser.js").Tokeniser} tokeniser
     * @param {T} instance
     * @param {*} args
     */
    static parse(tokeniser, instance, { type, inheritable, allowedMembers }) {
      const { tokens } = instance;
      tokens.name = tokeniser.consume("identifier") || tokeniser.error(`Missing name in ${instance.type}`);
      tokeniser.current = instance;
      instance = autoParenter(instance);
      if (inheritable) {
        Object.assign(tokens, inheritance(tokeniser));
      }
      tokens.open = tokeniser.consume("{") || tokeniser.error(`Bodyless ${type}`);
      instance.members = [];
      while (true) {
        tokens.close = tokeniser.consume("}");
        if (tokens.close) {
          tokens.termination = tokeniser.consume(";") || tokeniser.error(`Missing semicolon after ${type}`);
          return instance.this;
        }
        const ea = ExtendedAttributes.parse(tokeniser);
        let mem;
        for (const [parser, ...args] of allowedMembers) {
          mem = autoParenter(parser(tokeniser, ...args));
          if (mem) {
            break;
          }
        }
        if (!mem) {
          tokeniser.error("Unknown member");
        }
        mem.extAttrs = ea;
        instance.members.push(mem.this);
      }
    }

    get partial() {
      return !!this.tokens.partial;
    }
    get name() {
      return unescape(this.tokens.name.value);
    }
    get inheritance() {
      if (!this.tokens.inheritance) {
        return null;
      }
      return unescape(this.tokens.inheritance.value);
    }

    *validate(defs) {
      for (const member of this.members) {
        if (member.validate) {
          yield* member.validate(defs);
        }
      }
    }
  }

class Constant extends Base {
  /**
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    /** @type {Base["tokens"]} */
    const tokens = {};
    tokens.base = tokeniser.consume("const");
    if (!tokens.base) {
      return;
    }
    let idlType = primitive_type(tokeniser);
    if (!idlType) {
      const base = tokeniser.consume("identifier") || tokeniser.error("Const lacks a type");
      idlType = new Type({ source: tokeniser.source, tokens: { base } });
    }
    if (tokeniser.probe("?")) {
      tokeniser.error("Unexpected nullable constant type");
    }
    idlType.type = "const-type";
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("Const lacks a name");
    tokens.assign = tokeniser.consume("=") || tokeniser.error("Const lacks value assignment");
    tokens.value = const_value(tokeniser) || tokeniser.error("Const lacks a value");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated const, expected `;`");
    const ret = new Constant({ source: tokeniser.source, tokens });
    autoParenter(ret).idlType = idlType;
    return ret;
  }

  get type() {
    return "const";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }
  get value() {
    return const_data(this.tokens.value);
  }
}

class IterableLike extends Base {
  /**
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const start_position = tokeniser.position;
    const tokens = {};
    const ret = autoParenter(new IterableLike({ source: tokeniser.source, tokens }));
    tokens.readonly = tokeniser.consume("readonly");
    if (!tokens.readonly) {
      tokens.async = tokeniser.consume("async");
    }
    tokens.base =
      tokens.readonly ? tokeniser.consume("maplike", "setlike") :
      tokens.async ? tokeniser.consume("iterable") :
      tokeniser.consume("iterable", "maplike", "setlike");
    if (!tokens.base) {
      tokeniser.unconsume(start_position);
      return;
    }

    const { type } = ret;
    const secondTypeRequired = type === "maplike" || ret.async;
    const secondTypeAllowed = secondTypeRequired || type === "iterable";

    tokens.open = tokeniser.consume("<") || tokeniser.error(`Missing less-than sign \`<\` in ${type} declaration`);
    const first = type_with_extended_attributes(tokeniser) || tokeniser.error(`Missing a type argument in ${type} declaration`);
    ret.idlType = [first];
    if (secondTypeAllowed) {
      first.tokens.separator = tokeniser.consume(",");
      if (first.tokens.separator) {
        ret.idlType.push(type_with_extended_attributes(tokeniser));
      }
      else if (secondTypeRequired) {
        tokeniser.error(`Missing second type argument in ${type} declaration`);
      }
    }
    tokens.close = tokeniser.consume(">") || tokeniser.error(`Missing greater-than sign \`>\` in ${type} declaration`);
    tokens.termination = tokeniser.consume(";") || tokeniser.error(`Missing semicolon after ${type} declaration`);

    return ret.this;
  }

  get type() {
    return this.tokens.base.value;
  }
  get readonly() {
    return !!this.tokens.readonly;
  }
  get async() {
    return !!this.tokens.async;
  }
}

// @ts-check

function* checkInterfaceMemberDuplication(defs, i) {
  const opNames = new Set(getOperations(i).map(op => op.name));
  const partials = defs.partials.get(i.name) || [];
  const mixins = defs.mixinMap.get(i.name) || [];
  for (const ext of [...partials, ...mixins]) {
    const additions = getOperations(ext);
    yield* forEachExtension(additions, opNames, ext, i);
    for (const addition of additions) {
      opNames.add(addition.name);
    }
  }

  function* forEachExtension(additions, existings, ext, base) {
    for (const addition of additions) {
      const { name } = addition;
      if (name && existings.has(name)) {
        const message = `The operation "${name}" has already been defined for the base interface "${base.name}" either in itself or in a mixin`;
        yield validationError(addition.tokens.name, ext, "no-cross-overload", message);
      }
    }
  }

  function getOperations(i) {
    return i.members
      .filter(({type}) => type === "operation");
  }
}

class Constructor extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    const base = tokeniser.consume("constructor");
    if (!base) {
      return;
    }
    /** @type {Base["tokens"]} */
    const tokens = { base };
    tokens.open = tokeniser.consume("(") || tokeniser.error("No argument list in constructor");
    const args = argument_list(tokeniser);
    tokens.close = tokeniser.consume(")") || tokeniser.error("Unterminated constructor");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("No semicolon after constructor");
    const ret = new Constructor({ source: tokeniser.source, tokens });
    autoParenter(ret).arguments = args;
    return ret;
  }

  get type() {
    return "constructor";
  }

  *validate(defs) {
    if (this.idlType) {
      yield* this.idlType.validate(defs);
    }
    for (const argument of this.arguments) {
      yield* argument.validate(defs);
    }
  }
}

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function static_member(tokeniser) {
  const special = tokeniser.consume("static");
  if (!special) return;
  const member = Attribute.parse(tokeniser, { special }) ||
    Operation.parse(tokeniser, { special }) ||
    tokeniser.error("No body in static member");
  return member;
}

class Interface extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser, base, { partial = null } = {}) {
    const tokens = { partial, base };
    return Container.parse(tokeniser, new Interface({ source: tokeniser.source, tokens }), {
      type: "interface",
      inheritable: !partial,
      allowedMembers: [
        [Constant.parse],
        [Constructor.parse],
        [static_member],
        [stringifier],
        [IterableLike.parse],
        [Attribute.parse],
        [Operation.parse]
      ]
    });
  }

  get type() {
    return "interface";
  }

  *validate(defs) {
    yield* this.extAttrs.validate(defs);
    if (
      !this.partial &&
      this.extAttrs.every(extAttr => extAttr.name !== "Exposed") &&
      this.extAttrs.every(extAttr => extAttr.name !== "NoInterfaceObject")
    ) {
      const message = `Interfaces must have \`[Exposed]\` extended attribute. \
To fix, add, for example, \`[Exposed=Window]\`. Please also consider carefully \
if your interface should also be exposed in a Worker scope. Refer to the \
[WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) \
for more information.`;
      yield validationError(this.tokens.name, this, "require-exposed", message, {
        autofix: autofixAddExposedWindow(this)
      });
    }
    const oldConstructors = this.extAttrs.filter(extAttr => extAttr.name === "Constructor");
    for (const constructor of oldConstructors) {
      const message = `Constructors should now be represented as a \`constructor()\` operation on the interface \
instead of \`[Constructor]\` extended attribute. Refer to the \
[WebIDL spec section on constructor operations](https://heycam.github.io/webidl/#idl-constructors) \
for more information.`;
      yield validationError(constructor.tokens.name, this, "constructor-member", message, {
        autofix: autofixConstructor(this, constructor)
      });
    }

    const isGlobal = this.extAttrs.some(extAttr => extAttr.name === "Global");
    if (isGlobal) {
      const namedConstructors = this.extAttrs.filter(extAttr => extAttr.name === "NamedConstructor");
      for (const named of namedConstructors) {
        const message = `Interfaces marked as \`[Global]\` cannot have named constructors.`;
        yield validationError(named.tokens.name, this, "no-constructible-global", message);
      }

      const constructors = this.members.filter(member => member.type === "constructor");
      for (const named of constructors) {
        const message = `Interfaces marked as \`[Global]\` cannot have constructors.`;
        yield validationError(named.tokens.base, this, "no-constructible-global", message);
      }
    }

    yield* super.validate(defs);
    if (!this.partial) {
      yield* checkInterfaceMemberDuplication(defs, this);
    }
  }
}

function autofixConstructor(interfaceDef, constructorExtAttr) {
  interfaceDef = autoParenter(interfaceDef);
  return () => {
    const indentation = getLastIndentation(interfaceDef.extAttrs.tokens.open.trivia);
    const memberIndent = interfaceDef.members.length ?
      getLastIndentation(getFirstToken(interfaceDef.members[0]).trivia) :
      getMemberIndentation(indentation);
    const constructorOp = Constructor.parse(new Tokeniser(`\n${memberIndent}constructor();`));
    constructorOp.extAttrs = [];
    autoParenter(constructorOp).arguments = constructorExtAttr.arguments;

    const existingIndex = findLastIndex(interfaceDef.members, m => m.type === "constructor");
    interfaceDef.members.splice(existingIndex + 1, 0, constructorOp);

    const { close }  = interfaceDef.tokens;
    if (!close.trivia.includes("\n")) {
      close.trivia += `\n${indentation}`;
    }

    const { extAttrs } = interfaceDef;
    const index = extAttrs.indexOf(constructorExtAttr);
    const removed = extAttrs.splice(index, 1);
    if (!extAttrs.length) {
      extAttrs.tokens.open = extAttrs.tokens.close = undefined;
    } else if (extAttrs.length === index) {
      extAttrs[index - 1].tokens.separator = undefined;
    } else if (!extAttrs[index].tokens.name.trivia.trim()) {
      extAttrs[index].tokens.name.trivia = removed[0].tokens.name.trivia;
    }
  };
}

class Mixin extends Container {
  /**
   * @typedef {import("../tokeniser.js").Token} Token
   *
   * @param {import("../tokeniser.js").Tokeniser} tokeniser
   * @param {Token} base
   * @param {object} [options]
   * @param {Token} [options.partial]
   */
  static parse(tokeniser, base, { partial } = {}) {
    const tokens = { partial, base };
    tokens.mixin = tokeniser.consume("mixin");
    if (!tokens.mixin) {
      return;
    }
    return Container.parse(tokeniser, new Mixin({ source: tokeniser.source, tokens }), {
      type: "interface mixin",
      allowedMembers: [
        [Constant.parse],
        [stringifier],
        [Attribute.parse, { noInherit: true }],
        [Operation.parse, { regular: true }]
      ]
    });
  }

  get type() {
    return "interface mixin";
  }
}

class Field extends Base {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser) {
    /** @type {Base["tokens"]} */
    const tokens = {};
    const ret = autoParenter(new Field({ source: tokeniser.source, tokens }));
    ret.extAttrs = ExtendedAttributes.parse(tokeniser);
    tokens.required = tokeniser.consume("required");
    ret.idlType = type_with_extended_attributes(tokeniser, "dictionary-type") || tokeniser.error("Dictionary member lacks a type");
    tokens.name = tokeniser.consume("identifier") || tokeniser.error("Dictionary member lacks a name");
    ret.default = Default.parse(tokeniser);
    if (tokens.required && ret.default) tokeniser.error("Required member must not have a default");
    tokens.termination = tokeniser.consume(";") || tokeniser.error("Unterminated dictionary member, expected `;`");
    return ret.this;
  }

  get type() {
    return "field";
  }
  get name() {
    return unescape(this.tokens.name.value);
  }
  get required() {
    return !!this.tokens.required;
  }

  *validate(defs) {
    yield* this.idlType.validate(defs);
  }
}

// @ts-check

class Dictionary extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {object} [options]
   * @param {import("../tokeniser.js").Token} [options.partial]
   */
  static parse(tokeniser, { partial } = {}) {
    const tokens = { partial };
    tokens.base = tokeniser.consume("dictionary");
    if (!tokens.base) {
      return;
    }
    return Container.parse(tokeniser, new Dictionary({ source: tokeniser.source, tokens }), {
      type: "dictionary",
      inheritable: !partial,
      allowedMembers: [
        [Field.parse],
      ]
    });
  }

  get type() {
    return "dictionary";
  }
}

class Namespace extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {object} [options]
   * @param {import("../tokeniser.js").Token} [options.partial]
   */
  static parse(tokeniser, { partial } = {}) {
    const tokens = { partial };
    tokens.base = tokeniser.consume("namespace");
    if (!tokens.base) {
      return;
    }
    return Container.parse(tokeniser, new Namespace({ source: tokeniser.source, tokens }), {
      type: "namespace",
      allowedMembers: [
        [Attribute.parse, { noInherit: true, readonly: true }],
        [Operation.parse, { regular: true }]
      ]
    });
  }

  get type() {
    return "namespace";
  }

  *validate(defs) {
    if (!this.partial && this.extAttrs.every(extAttr => extAttr.name !== "Exposed")) {
      const message = `Namespaces must have [Exposed] extended attribute. \
To fix, add, for example, [Exposed=Window]. Please also consider carefully \
if your namespace should also be exposed in a Worker scope. Refer to the \
[WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) \
for more information.`;
      yield validationError(this.tokens.name, this, "require-exposed", message, {
        autofix: autofixAddExposedWindow(this)
      });
    }
    yield* super.validate(defs);
  }
}

// @ts-check

class CallbackInterface extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser, callback, { partial = null } = {}) {
    const tokens = { callback };
    tokens.base = tokeniser.consume("interface");
    if (!tokens.base) {
      return;
    }
    return Container.parse(tokeniser, new CallbackInterface({ source: tokeniser.source, tokens }), {
      type: "callback interface",
      inheritable: !partial,
      allowedMembers: [
        [Constant.parse],
        [Operation.parse, { regular: true }]
      ]
    });
  }

  get type() {
    return "callback interface";
  }
}

/**
 * @param {Tokeniser} tokeniser
 * @param {object} options
 * @param {boolean} [options.concrete]
 */
function parseByTokens(tokeniser, options) {
  const source = tokeniser.source;

  function error(str) {
    tokeniser.error(str);
  }

  function consume(...candidates) {
    return tokeniser.consume(...candidates);
  }

  function callback() {
    const callback = consume("callback");
    if (!callback) return;
    if (tokeniser.probe("interface")) {
      return CallbackInterface.parse(tokeniser, callback);
    }
    return CallbackFunction.parse(tokeniser, callback);
  }

  function interface_(opts) {
    const base = consume("interface");
    if (!base) return;
    const ret = Mixin.parse(tokeniser, base, opts) ||
      Interface.parse(tokeniser, base, opts) ||
      error("Interface has no proper body");
    return ret;
  }

  function partial() {
    const partial = consume("partial");
    if (!partial) return;
    return Dictionary.parse(tokeniser, { partial }) ||
      interface_({ partial }) ||
      Namespace.parse(tokeniser, { partial }) ||
      error("Partial doesn't apply to anything");
  }

  function definition() {
    return callback() ||
      interface_() ||
      partial() ||
      Dictionary.parse(tokeniser) ||
      Enum.parse(tokeniser) ||
      Typedef.parse(tokeniser) ||
      Includes.parse(tokeniser) ||
      Namespace.parse(tokeniser);
  }

  function definitions() {
    if (!source.length) return [];
    const defs = [];
    while (true) {
      const ea = ExtendedAttributes.parse(tokeniser);
      const def = definition();
      if (!def) {
        if (ea.length) error("Stray extended attributes");
        break;
      }
      autoParenter(def).extAttrs = ea;
      defs.push(def);
    }
    const eof = consume("eof");
    if (options.concrete) {
      defs.push(eof);
    }
    return defs;
  }
  const res = definitions();
  if (tokeniser.position < source.length) error("Unrecognised tokens");
  return res;
}

/**
 * @param {string} str
 * @param {object} [options]
 * @param {*} [options.sourceName]
 * @param {boolean} [options.concrete]
 */
function parse(str, options = {}) {
  const tokeniser = new Tokeniser(str);
  if (typeof options.sourceName !== "undefined") {
    tokeniser.source.name = options.sourceName;
  }
  return parseByTokens(tokeniser, options);
}

function noop(arg) {
  return arg;
}

const templates = {
  wrap: items => items.join(""),
  trivia: noop,
  name: noop,
  reference: noop,
  type: noop,
  generic: noop,
  nameless: noop,
  inheritance: noop,
  definition: noop,
  extendedAttribute: noop,
  extendedAttributeReference: noop
};

function write(ast, { templates: ts = templates } = {}) {
  ts = Object.assign({}, templates, ts);

  function reference(raw, { unescaped, context }) {
    if (!unescaped) {
      unescaped = raw.startsWith("_") ? raw.slice(1) : raw;
    }
    return ts.reference(raw, unescaped, context);
  }

  function token(t, wrapper = noop, ...args) {
    if (!t) {
      return "";
    }
    const value = wrapper(t.value, ...args);
    return ts.wrap([ts.trivia(t.trivia), value]);
  }

  function reference_token(t, context) {
    return token(t, reference, { context });
  }

  function name_token(t, arg) {
    return token(t, ts.name, arg);
  }

  function type_body(it) {
    if (it.union || it.generic) {
      return ts.wrap([
        token(it.tokens.base, ts.generic),
        token(it.tokens.open),
        ...it.subtype.map(type),
        token(it.tokens.close)
      ]);
    }
    const firstToken = it.tokens.prefix || it.tokens.base;
    const prefix = it.tokens.prefix ? [
      it.tokens.prefix.value,
      ts.trivia(it.tokens.base.trivia)
    ] : [];
    const ref = reference(ts.wrap([
      ...prefix,
      it.tokens.base.value,
      token(it.tokens.postfix)
    ]), { unescaped: it.idlType, context: it });
    return ts.wrap([ts.trivia(firstToken.trivia), ref]);
  }
  function type(it) {
    return ts.wrap([
      extended_attributes(it.extAttrs),
      type_body(it),
      token(it.tokens.nullable),
      token(it.tokens.separator)
    ]);
  }
  function default_(def) {
    if (!def) {
      return "";
    }
    return ts.wrap([
      token(def.tokens.assign),
      ...def.expression.map(t => token(t))
    ]);
  }
  function argument(arg) {
    return ts.wrap([
      extended_attributes(arg.extAttrs),
      token(arg.tokens.optional),
      ts.type(type(arg.idlType)),
      token(arg.tokens.variadic),
      name_token(arg.tokens.name, { data: arg }),
      default_(arg.default),
      token(arg.tokens.separator)
    ]);
  }
  function string(str) {
    return ts.wrap([
      token(str.tokens.value),
      token(str.tokens.separator)
    ]);
  }
  function identifier(id, context) {
    return ts.wrap([
      reference_token(id.tokens.value, context),
      token(id.tokens.separator)
    ]);
  }
  function make_ext_at(it) {
    const { rhsType } = it.params;
    return ts.wrap([
      ts.trivia(it.tokens.name.trivia),
      ts.extendedAttribute(ts.wrap([
        ts.extendedAttributeReference(it.name),
        token(it.params.tokens.assign),
        reference_token(it.params.tokens.secondaryName, it),
        token(it.params.tokens.open),
        ...!it.params.list ? [] :
          it.params.list.map(
            rhsType === "identifier-list" ? id => identifier(id, it) :
            rhsType === "string-list" ? string :
            argument
          ),
        token(it.params.tokens.close)
      ])),
      token(it.tokens.separator)
    ]);
  }
  function extended_attributes(eats) {
    if (!eats.length) return "";
    return ts.wrap([
      token(eats.tokens.open),
      ...eats.map(make_ext_at),
      token(eats.tokens.close)
    ]);
  }

  function operation(it, parent) {
    const body = it.idlType ? [
      ts.type(type(it.idlType)),
      name_token(it.tokens.name, { data: it, parent }),
      token(it.tokens.open),
      ts.wrap(it.arguments.map(argument)),
      token(it.tokens.close),
    ] : [];
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      it.tokens.name ? token(it.tokens.special) : token(it.tokens.special, ts.nameless, { data: it, parent }),
      ...body,
      token(it.tokens.termination)
    ]), { data: it, parent });
  }

  function attribute(it, parent) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.special),
      token(it.tokens.readonly),
      token(it.tokens.base),
      ts.type(type(it.idlType)),
      name_token(it.tokens.name, { data: it, parent }),
      token(it.tokens.termination)
    ]), { data: it, parent });
  }

  function constructor(it, parent) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.base, ts.nameless, { data: it, parent }),
      token(it.tokens.open),
      ts.wrap(it.arguments.map(argument)),
      token(it.tokens.close),
      token(it.tokens.termination)
    ]), { data: it, parent });
  }

  function inheritance(inh) {
    if (!inh.tokens.inheritance) {
      return "";
    }
    return ts.wrap([
      token(inh.tokens.colon),
      ts.trivia(inh.tokens.inheritance.trivia),
      ts.inheritance(reference(inh.tokens.inheritance.value, { context: inh }))
    ]);
  }

  function container(it) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.callback),
      token(it.tokens.partial),
      token(it.tokens.base),
      token(it.tokens.mixin),
      name_token(it.tokens.name, { data: it }),
      inheritance(it),
      token(it.tokens.open),
      iterate(it.members, it),
      token(it.tokens.close),
      token(it.tokens.termination)
    ]), { data: it });
  }

  function field(it, parent) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.required),
      ts.type(type(it.idlType)),
      name_token(it.tokens.name, { data: it, parent }),
      default_(it.default),
      token(it.tokens.termination)
    ]), { data: it, parent });
  }
  function const_(it, parent) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.base),
      ts.type(type(it.idlType)),
      name_token(it.tokens.name, { data: it, parent }),
      token(it.tokens.assign),
      token(it.tokens.value),
      token(it.tokens.termination)
    ]), { data: it, parent });
  }
  function typedef(it) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.base),
      ts.type(type(it.idlType)),
      name_token(it.tokens.name, { data: it }),
      token(it.tokens.termination)
    ]), { data: it });
  }
  function includes(it) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      reference_token(it.tokens.target, it),
      token(it.tokens.includes),
      reference_token(it.tokens.mixin, it),
      token(it.tokens.termination)
    ]), { data: it });
  }
  function callback(it) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.base),
      name_token(it.tokens.name, { data: it }),
      token(it.tokens.assign),
      ts.type(type(it.idlType)),
      token(it.tokens.open),
      ...it.arguments.map(argument),
      token(it.tokens.close),
      token(it.tokens.termination),
    ]), { data: it });
  }
  function enum_(it) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.base),
      name_token(it.tokens.name, { data: it }),
      token(it.tokens.open),
      iterate(it.values, it),
      token(it.tokens.close),
      token(it.tokens.termination)
    ]), { data: it });
  }
  function enum_value(v, parent) {
    return ts.wrap([
      ts.trivia(v.tokens.value.trivia),
      ts.definition(
        ts.wrap(['"', ts.name(v.value, { data: v, parent }), '"']),
        { data: v, parent }
      ),
      token(v.tokens.separator)
    ]);
  }
  function iterable_like(it, parent) {
    return ts.definition(ts.wrap([
      extended_attributes(it.extAttrs),
      token(it.tokens.readonly),
      token(it.tokens.async),
      token(it.tokens.base, ts.generic),
      token(it.tokens.open),
      ts.wrap(it.idlType.map(type)),
      token(it.tokens.close),
      token(it.tokens.termination)
    ]), { data: it, parent });
  }
  function eof(it) {
    return ts.trivia(it.trivia);
  }

  const table = {
    interface: container,
    "interface mixin": container,
    namespace: container,
    operation,
    attribute,
    constructor,
    dictionary: container,
    field,
    const: const_,
    typedef,
    includes,
    callback,
    enum: enum_,
    "enum-value": enum_value,
    iterable: iterable_like,
    maplike: iterable_like,
    setlike: iterable_like,
    "callback interface": container,
    eof
  };
  function dispatch(it, parent) {
    const dispatcher = table[it.type];
    if (!dispatcher) {
      throw new Error(`Type "${it.type}" is unsupported`);
    }
    return table[it.type](it, parent);
  }
  function iterate(things, parent) {
    if (!things) return;
    const results = things.map(thing => dispatch(thing, parent));
    return ts.wrap(results);
  }
  return iterate(ast);
}

function getMixinMap(all, unique) {
  const map = new Map();
  const includes = all.filter(def => def.type === "includes");
  for (const include of includes) {
    const mixin = unique.get(include.includes);
    if (!mixin) {
      continue;
    }
    const array = map.get(include.target);
    if (array) {
      array.push(mixin);
    } else {
      map.set(include.target, [mixin]);
    }
  }
  return map;
}

/**
 * @typedef {ReturnType<typeof groupDefinitions>} Definitions
 */
function groupDefinitions(all) {
  const unique = new Map();
  const duplicates = new Set();
  const partials = new Map();
  for (const def of all) {
    if (def.partial) {
      const array = partials.get(def.name);
      if (array) {
        array.push(def);
      } else {
        partials.set(def.name, [def]);
      }
      continue;
    }
    if (!def.name) {
      continue;
    }
    if (!unique.has(def.name)) {
      unique.set(def.name, def);
    } else {
      duplicates.add(def);
    }
  }
  return {
    all,
    unique,
    partials,
    duplicates,
    mixinMap: getMixinMap(all, unique),
    cache: {
      typedefIncludesDictionary: new WeakMap(),
      dictionaryIncludesRequiredField: new WeakMap()
    },
  };
}

function* checkDuplicatedNames({ unique, duplicates }) {
  for (const dup of duplicates) {
    const { name } = dup;
    const message = `The name "${name}" of type "${unique.get(name).type}" was already seen`;
    yield validationError(dup.tokens.name, dup, "no-duplicate", message);
  }
}

function* validateIterable(ast) {
  const defs = groupDefinitions(ast);
  for (const def of defs.all) {
    if (def.validate) {
      yield* def.validate(defs);
    }
  }
  yield* checkDuplicatedNames(defs);
}

// Remove this once all of our support targets expose `.flat()` by default
function flatten$1(array) {
  if (array.flat) {
    return array.flat();
  }
  return [].concat(...array);
}

/**
 * @param {*} ast AST or array of ASTs
 */
function validate(ast) {
  return [...validateIterable(flatten$1(ast))];
}



var _webidl2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parse: parse,
  write: write,
  validate: validate,
  WebIDLParseError: WebIDLParseError
});

/*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(N){/*! (c) Andrea Giammarchi - ISC */var t={};try{t.WeakMap=WeakMap;}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this);}function o(e){this.set(e[0],e[1]);}}(Math.random(),Object);}var u=t.WeakMap,i={};
/*! (c) Andrea Giammarchi - ISC */try{i.WeakSet=WeakSet;}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++});}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r;}(Math.random(),Object.defineProperty);}var e=i.WeakSet,n={};
/*! (c) Andrea Giammarchi - ISC */try{n.Map=Map;}catch(e){n.Map=function(){var n=0,i=[],a=[];return {delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this);},this);},get:function(e){return r(e)?a[n]:void 0},has:function(e){return r(e)},set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return -1<(n=i.indexOf(e))}};}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var l=e(n[r],1);if(t.insertBefore(l,a),o&&u&&l.selected){u=!u;var c=t.selectedIndex;t.selectedIndex=c<0?r:s.call(t.querySelectorAll("option"),l);}r++;}}function y(e,t){return e==t}function b(e){return e}function w(e,t,n,r,i,a,o){var u=a-i;if(u<1)return -1;for(;u<=n-t;){for(var l=t,c=i;l<n&&c<a&&o(e[l],r[c]);)l++,c++;if(c===a)return t;t=l+1;}return -1}function x(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function E(e,t,n,r,i){for(;r<i;)a(e(n[r++],-1),t);}function C(e,t,n,r,i,a,o,u,l,c,s,f,h){!function(e,t,n,r,i,a,o,u,l){for(var c=new k,s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:c.set(r[i],1),m(t,n,r,i++,i,f<u?t(a[f],0):l);break;case-1:f++;}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:c.has(a[o])?o++:E(t,n,a,o++,o);}}(function(e,t,n,r,i,a,o){var u,l,c,s,f,h,d,v=n+a,p=[];e:for(u=0;u<=v;u++){if(50<u)return null;for(d=u-1,f=u?p[u-1]:[0,0],h=p[u]=[],l=-u;l<=u;l+=2){for(c=(s=l===-u||l!==u&&f[d+l-1]<f[d+l+1]?f[d+l+1]:f[d+l-1]+1)-l;s<a&&c<n&&o(r[i+s],e[t+c]);)s++,c++;if(s===a&&c===n)break e;h[u+l]=s;}}var g=Array(u/2+v/2),m=g.length-1;for(u=p.length-1;0<=u;u--){for(;0<s&&0<c&&o(r[i+s-1],e[t+c-1]);)g[m--]=0,s--,c--;if(!u)break;d=u-1,f=u?p[u-1]:[0,0],(l=s-c)===-u||l!==u&&f[d+l-1]<f[d+l+1]?(c--,g[m--]=1):(s--,g[m--]=-1);}return g}(n,r,a,o,u,c,f)||function(e,t,n,r,i,a,o,u){var l=0,c=r<u?r:u,s=Array(c++),f=Array(c);f[0]=-1;for(var h=1;h<c;h++)f[h]=o;for(var d=new k,v=a;v<o;v++)d.set(i[v],v);for(var p=t;p<n;p++){var g=d.get(e[p]);null!=g&&-1<(l=S(f,c,g))&&(f[l]=g,s[l]={newi:p,oldi:g,prev:s[l-1]});}for(l=--c,--o;f[l]>o;)--l;c=u+r-l;var m=Array(c),y=s[l];for(--n;y;){for(var b=y,w=b.newi,N=b.oldi;w<n;)m[--c]=1,--n;for(;N<o;)m[--c]=-1,--o;m[--c]=0,--n,--o,y=y.prev;}for(;t<=n;)m[--c]=1,--n;for(;a<=o;)m[--c]=-1,--o;return m}(n,r,i,a,o,u,l,c),e,t,n,r,o,u,s,h);}function l(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,l=u,c=0,s=n.length,f=0;c<l&&f<s&&i(t[c],n[f]);)c++,f++;for(;c<l&&f<s&&i(t[l-1],n[s-1]);)l--,s--;var h=c===l,d=f===s;if(h&&d)return n;if(h&&f<s)return m(a,e,n,f,s,x(a,t,c,u,o)),n;if(d&&c<l)return E(a,e,t,c,l),n;var v=l-c,p=s-f,g=-1;if(v<p){if(-1<(g=w(n,f,s,t,c,l,i)))return m(a,e,n,f,g,a(t[c],0)),m(a,e,n,g+v,s,x(a,t,l,u,o)),n}else if(p<v&&-1<(g=w(t,c,l,n,f,s,i)))return E(a,e,t,c,g),E(a,e,t,g+p,l),n;return v<2||p<2?(m(a,e,n,f,s,a(t[c],0)),E(a,e,t,c,l)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,c,l,i)?m(a,e,n,f,s,x(a,t,l,u,o)):C(a,e,n,f,s,p,t,c,l,v,u,i,o),n}var r,k=n.Map,s=[].indexOf,S=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a;}return r},a=function(e,t){(a="remove"in e?function(e){e.remove();}:function(e,t){e.parentNode===t&&t.removeChild(e);})(e,t);},o={};function c(e,t){t=t||{};var n=N.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}o.CustomEvent="function"==typeof CustomEvent?CustomEvent:(c[r="prototype"]=new c("").constructor[r],c);var f=o.CustomEvent;function h(){return this}function d(e,t){var n="_"+e+"$";return {get:function(){return this[n]||v(this,n,t.call(this,e))},set:function(e){v(this,n,e);}}}var v=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(h.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var p,g,A,T,M,_,O={},j={},L=[],P=j.hasOwnProperty,D=0,W={attributes:O,define:function(e,t){e.indexOf("-")<0?(e in j||(D=L.push(e)),j[e]=t):O[e]=t;},invoke:function(e,t){for(var n=0;n<D;n++){var r=L[n];if(P.call(e,r))return j[r](e[r],t)}}},$=Array.isArray||(g=(p={}.toString).call([]),function(e){return p.call(e)===g}),R=(A=N,T="fragment",_="content"in H(M="template")?function(e){var t=H(M);return t.innerHTML=e,t.content}:function(e){var t=H(T),n=H(M),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(i);}else n.innerHTML=e,r=n.childNodes;return F(t,r),t},function(e,t){return ("svg"===t?function(e){var t=H(T),n=H("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",F(t,n.firstChild.childNodes),t}:_)(e)});function F(e,t){for(var n=t.length;n--;)e.appendChild(t[0]);}function H(e){return e===T?A.createDocumentFragment():A.createElementNS("http://www.w3.org/1999/xhtml",e)}
/*! (c) Andrea Giammarchi - ISC */
var I,z,V,Z,G,q,B,J,K,Q,U=(z="appendChild",V="cloneNode",Z="createTextNode",q=(G="importNode")in(I=N),(B=I.createDocumentFragment())[z](I[Z]("g")),B[z](I[Z]("")),(q?I[G](B,!0):B[V](!0)).childNodes.length<2?function e(t,n){for(var r=t[V](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[z](e(i[o],n));return r}:q?I[G]:function(e,t){return e[V](!!t)}),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%",ee=!1;try{J=N.createElement("template"),Q="tabindex",(K="content")in J&&(J.innerHTML="<p "+Q+'="'+Y+'"></p>',J[K].childNodes[0].getAttribute(Q)==Y)||(Y="_dt: "+Y.slice(1,-1)+";",ee=!0);}catch(e){}var te="\x3c!--"+Y+"--\x3e",ne=8,re=1,ie=3,ae=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ue=" \\f\\n\\r\\t",le="[^"+ue+"\\/>\"'=]+",ce="["+ue+"]+"+le,se="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",fe="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+le.replace("\\/","")+"))?)",he=new RegExp(se+ce+fe+"+)(["+ue+"]*/?>)","g"),de=new RegExp(se+ce+fe+"*)(["+ue+"]*/>)","g"),ve=new RegExp("("+ce+"\\s*=\\s*)(['\"]?)"+te+"\\2","gi");function pe(e,t,n,r){return "<"+t+n.replace(ve,ge)+r}function ge(e,t,n){return t+(n||'"')+Y+(n||'"')}function me(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}function ye(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function be(e,t,n,r){for(var i=new k,a=e.attributes,o=[],u=o.slice.call(a,0),l=u.length,c=0;c<l;){var s,f=u[c++],h=f.value===Y;if(h||1<(s=f.value.split(te)).length){var d=f.name;if(!i.has(d)){var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(i.set(d,p),h)t.push(we(p,r,v,null));else{for(var g=s.length-2;g--;)n.shift();t.push(we(p,r,v,s));}}o.push(f);}}for(var m=((c=0)<(l=o.length)&&ee&&!("ownerSVGElement"in e));c<l;){var y=o[c++];m&&(y.value=""),e.removeAttribute(y.name);}var b=e.nodeName;if(/^script$/i.test(b)){var w=N.createElement(b);for(l=a.length,c=0;c<l;)w.setAttributeNode(a[c++].cloneNode(!0));w.textContent=e.textContent,e.parentNode.replaceChild(w,e);}}function we(e,t,n,r){return {type:"attr",node:e,path:t,name:n,sparse:r}}function Ne(e,t){return {type:"text",node:e,path:t}}var xe=new u,Ee=new u;function Ce(o,f){var e=(o.convert||
/*! (c) Andrea Giammarchi - ISC */
function(e){return e.join(te).replace(de,me).replace(he,pe)})(f),t=o.transform;t&&(e=t(e));var n=R(e,o.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r);}}
/*! (c) Andrea Giammarchi - ISC */(n);var u=[];!function e(t,n,r,i){for(var a,o,u=t.childNodes,l=u.length,c=0;c<l;){var s=u[c];switch(s.nodeType){case re:var f=i.concat(c);be(s,n,r,f),e(s,n,r,f);break;case ne:var h=s.textContent;if(h===Y)r.shift(),n.push(ae.test(t.nodeName)?Ne(t,i):(a=s,o=i.concat(c),{type:"any",node:a,path:o}));else switch(h.slice(0,2)){case"/*":if("*/"!==h.slice(-2))break;case"👻":t.removeChild(s),c--,l--;}break;case ie:ae.test(t.nodeName)&&X.call(s.textContent)===te&&(r.shift(),n.push(Ne(t,i)));}c++;}}(n,u,f.slice(0),[]);var r={content:n,updates:function(l){for(var c=[],s=u.length,e=0,t=0;e<s;){var n=u[e++],r=ye(l,n.path);switch(n.type){case"any":c.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?c.push({fn:a,sparse:!1}):(t+=i.length-2,c.push({fn:a,sparse:!0,values:i}));break;case"text":c.push({fn:o.text(r),sparse:!1}),r.textContent="";}}return s+=t,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=c[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a);}else r.fn(arguments[t++]);}return l}}};return xe.set(f,r),r}function ke(n){return function(e){var t=Ee.get(n);return null!=t&&t.template===e||(t=function(e,t){var n=xe.get(t)||Ce(e,t),r=U.call(N,n.content,!0),i={content:r,template:t,updates:n.updates(r)};return Ee.set(e,i),i}(n,e)),t.updates.apply(null,arguments),t.content}}var Se,Ae,Te=(Se=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Ae=/([^A-Z])([A-Z]+)/g,function(e,t){return "ownerSVGElement"in e?function(e,t){var n;return (n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),_e(n,!0)}(e,t):_e(e.style,!1)});
/*! (c) Andrea Giammarchi - ISC */function Me(e,t,n){return t+"-"+n.toLowerCase()}function _e(a,o){var u,l;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&l!==e)for(n in l)n in e||(a[n]="");}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||Se.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Ae,Me),":",e[t],";");return n.join("")}(l=t):l=e;break}default:l!=e&&(u="string",l=e,o?a.value=e||"":a.cssText=e||"");}}}var Oe,je,Le=(Oe=[].slice,(je=Pe.prototype).ELEMENT_NODE=1,je.nodeType=111,je.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents();}return n},je.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},Pe);function Pe(e){var t=this.childNodes=Oe.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null;}function De(e){return {html:e}}function We(e,t){switch(e.nodeType){case Be:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case qe:return We(e.render(),t);default:return e}}function $e(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(De).then(t):Promise.resolve(W.invoke(e,t)).then(t);}function Re(e){return null!=e&&"then"in e}var Fe,He,Ie,ze,Ve,Ze="ownerSVGElement",Ge="connected",qe=h.prototype.nodeType,Be=Le.prototype.nodeType,Je=(He=(Fe={Event:f,WeakSet:e}).Event,Ie=Fe.WeakSet,ze=!0,Ve=null,function(e){return ze&&(ze=!ze,Ve=new Ie,function(t){var i=new Ie,a=new Ie;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0});}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length));},0);};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]});},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]});},!0);}function u(e){for(var t,n=e.length,r=0;r<n;r++)l((t=e[r]).removedNodes,"disconnected",a,i),l(t.addedNodes,"connected",i,a);}function l(e,t,n,r){for(var i,a=new He(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&c(i,a,t,n,r));}function c(e,t,n,r,i){Ve.has(e)&&!r.has(e)&&(i.delete(e),r.add(e),e.dispatchEvent(t));for(var a=e.children||[],o=a.length,u=0;u<o;c(a[u++],t,n,r,i));}}(e.ownerDocument)),Ve.add(e),e}),Ke=/^(?:form|list)$/i,Qe=[].slice;function Ue(e){return this.type=e,ke(this)}var Xe=!(Ue.prototype={attribute:function(n,r,e){var i,t=Ze in n;if("style"===r)return Te(n,e,t);if(/^on/.test(r)){var a=r.slice(2);return a===Ge||"disconnected"===a?Je(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1));}}if("data"===r||!t&&r in n&&!Ke.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e);};if(r in W.attributes)return function(e){var t=W.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t));};var o=!1,u=e.cloneNode(!0);return function(e){i!==e&&(i=e,u.value!==e&&(null==e?(o&&(o=!1,n.removeAttributeNode(u)),u.value=e):(u.value=e,o||(o=!0,n.setAttributeNode(u)))));}},any:function(n,r){var i,a={node:We,before:n},o=Ze in n?"svg":"html",u=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":u?i!==t&&(i=t,r[0].textContent=t):(u=!0,i=t,r=l(n.parentNode,r,[function(e,t){return e.ownerDocument.createTextNode(t)}(n,t)],a));break;case"function":e(t(n));break;case"object":case"undefined":if(null==t){u=!1,r=l(n.parentNode,r,[],a);break}default:if(u=!1,$(i=t))if(0===t.length)r.length&&(r=l(n.parentNode,r,[],a));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if($(t[0])&&(t=t.concat.apply([],t)),Re(t[0])){Promise.all(t).then(e);break}default:r=l(n.parentNode,r,t,a);}else!function(e){return "ELEMENT_NODE"in e}(t)?Re(t)?t.then(e):"placeholder"in t?$e(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?r=l(n.parentNode,r,Qe.call(R([].concat(t.html).join(""),o).childNodes),a):e("length"in t?Qe.call(t):W.invoke(t,e)):r=l(n.parentNode,r,11===t.nodeType?Qe.call(t.childNodes):[t],a);}}},text:function(r){var i;return function e(t){if(i!==t){var n=typeof(i=t);"object"==n&&t?Re(t)?t.then(e):"placeholder"in t?$e(t,e):e("text"in t?String(t.text):"any"in t?t.any:"html"in t?[].concat(t.html).join(""):"length"in t?Qe.call(t).join(""):W.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t;}}}}),Ye=function(e){var t,n=(t=(N.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(t)),r=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);if(n||r){var i={},a=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return i[t]||(i[t]=e)};if(r)Ye=a;else{var o=new u;Ye=function(e){return o.get(e)||function(e,t){return o.set(e,t),t}(e,a(e))};}}else Xe=!0;return et(e)};function et(e){return Xe?e:Ye(e)}function tt(e){for(var t=arguments.length,n=[et(e)],r=1;r<t;)n.push(arguments[r++]);return n}var nt=new u,rt=function(t){var n,r,i;return function(){var e=tt.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Ue(t),n=at(r.apply(r,e))):r.apply(r,e),n}},it=function(e,t){var n=t.indexOf(":"),r=nt.get(e),i=t;return -1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||nt.set(e,r={}),r[i]||(r[i]=rt(t))},at=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Le(t):e},ot=new u;function ut(){var e=ot.get(this),t=tt.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ue(Ze in this?"svg":"html");ot.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments));}
/*! (c) Andrea Giammarchi (ISC) */.apply(this,t),this}var lt,ct,st,ft,ht=W.define,dt=Ue.prototype;function vt(e){return arguments.length<2?null==e?rt("html"):"string"==typeof e?vt.wire(null,e):"raw"in e?rt("html")(e):"nodeType"in e?vt.bind(e):it(e,"html"):("raw"in e?rt("html"):vt.wire).apply(null,arguments)}return vt.Component=h,vt.bind=function(e){return ut.bind(e)},vt.define=ht,vt.diff=l,(vt.hyper=vt).observe=Je,vt.tagger=dt,vt.wire=function(e,t){return null==e?rt(t||"html"):it(e,t||"html")},vt._={WeakMap:u,WeakSet:e},lt=rt,ct=new u,st=Object.create,ft=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(h,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i=t.get(e)||ft(e,t);switch(typeof r){case"object":case"function":var a=i.w||(i.w=new u);return a.get(r)||function(e,t,n){return e.set(t,n),n}(a,r,new e(n));default:var o=i.p||(i.p=st(null));return o[r]||(o[r]=new e(n))}}(this,ct.get(e)||function(e){var t=new k;return ct.set(e,t),t}(e),e,null==t?"default":t)}}}),Object.defineProperties(h.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e);}},html:d("html",lt),svg:d("svg",lt),state:d("state",function(){return this.defaultState}),defaultState:{get:function(){return {}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new f(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return !1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return !1!==t&&this.render(),this}}}),vt}(document);

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
const webidl2 = _webidl2;
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
/**
 * Sets the defaults for W3C specs
 */
const name$f = "w3c/defaults";

linter.register(rule$6);

const w3cDefaults = {
  lint: {
    "privsec-section": true,
  },
  pluralize: true,
  doJsonLd: false,
  license: "w3c-software-doc",
  logos: [
    {
      src: "https://www.w3.org/StyleSheets/TR/2016/logos/W3C",
      alt: "W3C",
      height: 48,
      width: 72,
      url: "https://www.w3.org/",
    },
  ],
  xref: true,
};

function run$5(conf) {
  if (conf.specStatus === "unofficial") return;
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...w3cDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...w3cDefaults,
    ...conf,
    lint,
  });

  // TODO: eventually, we want to remove this.
  // It's here for legacy support of json-ld specs
  // see https://github.com/w3c/respec/issues/2019
  Object.assign(conf, { definitionMap });
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
const name$h = "w3c/style";
function attachFixupScript(doc, version) {
  const script = doc.createElement("script");
  if (location.hash) {
    script.addEventListener(
      "load",
      () => {
        window.location.href = location.hash;
      },
      { once: true }
    );
  }
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

function createBaseStyle() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://www.w3.org/StyleSheets/TR/2016/base.css";
  link.classList.add("removeOnSave");
  return link;
}

function selectStyleVersion(styleVersion) {
  let version = "";
  switch (styleVersion) {
    case null:
    case true:
      version = "2016";
      break;
    default:
      if (styleVersion && !isNaN(styleVersion)) {
        version = styleVersion.toString().trim();
      }
  }
  return version;
}

function createResourceHints() {
  const resourceHints = [
    {
      hint: "preconnect", // for W3C styles and scripts.
      href: "https://www.w3.org",
    },
    {
      hint: "preload", // all specs need it, and we attach it on end-all.
      href: "https://www.w3.org/scripts/TR/2016/fixup.js",
      as: "script",
    },
    {
      hint: "preload", // all specs include on base.css.
      href: "https://www.w3.org/StyleSheets/TR/2016/base.css",
      as: "style",
    },
    {
      hint: "preload", // all specs show the logo.
      href: "https://www.w3.org/StyleSheets/TR/2016/logos/W3C",
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

// Opportunistically apply base style
elements.appendChild(createBaseStyle());
if (!document.head.querySelector("meta[name=viewport]")) {
  // Make meta viewport the first element in the head.
  elements.prepend(createMetaViewport());
}

document.head.prepend(elements);

function styleMover(linkURL) {
  return exportDoc => {
    const w3cStyle = exportDoc.querySelector(`head link[href="${linkURL}"]`);
    exportDoc.querySelector("head").append(w3cStyle);
  };
}

function run$7(conf) {
  if (!conf.specStatus) {
    const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
    conf.specStatus = "base";
    pub("warn", warn);
  }

  let styleFile = "W3C-";

  // Figure out which style file to use.
  switch (conf.specStatus.toUpperCase()) {
    case "CG-DRAFT":
    case "CG-FINAL":
    case "BG-DRAFT":
    case "BG-FINAL":
      styleFile = conf.specStatus.toLowerCase();
      break;
    case "FPWD":
    case "LC":
    case "WD-NOTE":
    case "LC-NOTE":
      styleFile += "WD";
      break;
    case "WG-NOTE":
    case "FPWD-NOTE":
      styleFile += "WG-NOTE.css";
      break;
    case "UNOFFICIAL":
      styleFile += "UD";
      break;
    case "FINDING":
    case "FINDING-DRAFT":
    case "BASE":
      styleFile = "base.css";
      break;
    default:
      styleFile += conf.specStatus;
  }

  // Select between released styles and experimental style.
  const version = selectStyleVersion(conf.useExperimentalStyles || "2016");
  // Attach W3C fixup script after we are done.
  if (version && !conf.noToc) {
    sub(
      "end-all",
      () => {
        attachFixupScript(document, version);
      },
      { once: true }
    );
  }
  const finalVersionPath = version ? `${version}/` : "";
  const finalStyleURL = `https://www.w3.org/StyleSheets/TR/${finalVersionPath}${styleFile}`;
  linkCSS(document, finalStyleURL);
  // Make sure the W3C stylesheet is the last stylesheet, as required by W3C Pub Rules.
  const moveStyle = styleMover(finalStyleURL);
  sub("beforesave", moveStyle);
}

var style$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$h,
  run: run$7
});

// @ts-check
const name$i = "w3c/l10n";
const additions = {
  en: {
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/.",
  },
  ko: {
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/.",
  },
  zh: {
    status_at_publication:
      "本章节描述了本文档的发布状态。其它更新版本可能会覆盖本文档。W3C的文档列 表和最新版本可通过<a href='https://www.w3.org/TR/'>W3C技术报告</a>索引访问。",
  },
  ja: {
    status_at_publication:
      "この節には、公開時点でのこの文書の位置づけが記されている。他の文書によって置き換えられる可能性がある。現時点でのW3Cの発行文書とこのテクニカルレポートの最新版は、下記から参照できる。 <a href='https://www.w3.org/TR/'>W3C technical reports index</a> (https://www.w3.org/TR/)",
  },
  nl: {
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the <a href='https://www.w3.org/TR/'>W3C technical reports index</a> at https://www.w3.org/TR/.",
  },
  es: {
    status_at_publication:
      "Esta sección describe el estado del presente documento al momento de su publicación. El presente documento puede ser remplazado por otros. Una lista de las publicaciones actuales del W3C y la última revisión del presente informe técnico puede hallarse en http://www.w3.org/TR/ <a href='https://www.w3.org/TR/'>el índice de informes técnicos</a> del W3C.",
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
const html$1 = hyperHTML$1;

var showLink = link => {
  if (!link.key) {
    const msg =
      "Found a link without `key` attribute in the configuration. See dev console.";
    pub("warn", msg);
    console.warn("warn", msg, link);
    return;
  }
  return html$1`
    <dt class="${link.class ? link.class : null}">${link.key}:</dt>
    ${link.data ? link.data.map(showLinkData) : showLinkData(link)}
  `;
};

function showLinkData(data) {
  return html$1`
    <dd class="${data.class ? data.class : null}">
      ${data.href
        ? html$1`
            <a href="${data.href}">${data.value || data.href}</a>
          `
        : ""}
    </dd>
  `;
}

// @ts-check

var showLogo = obj => {
  /** @type {HTMLAnchorElement} */
  const a = hyperHTML$1`
    <a href="${obj.url || ""}" class="logo"></a>
  `;
  if (!obj.alt) {
    showInlineWarning(a, "Found spec logo without an `alt` attribute");
  }
  /** @type {HTMLImageElement} */
  const img = hyperHTML$1`
    <img
      id="${obj.id}"
      alt="${obj.alt}"
      width="${obj.width}"
      height="${obj.height}"
    />
  `;
  // avoid triggering 404 requests from dynamically generated
  // hyperHTML attribute values
  img.src = obj.src;
  a.append(img);
  return a;
};

// @ts-check

const localizationStrings$1 = {
  en: {
    until: "Until",
  },
  es: {
    until: "Hasta",
  },
};

const lang$9 = lang in localizationStrings$1 ? lang : "en";

var showPeople = (items = []) => {
  const l10n = localizationStrings$1[lang$9];
  return items.map(getItem);

  function getItem(p) {
    const personName = [p.name]; // treated as opt-in HTML by hyperHTML
    const company = [p.company];
    const editorid = p.w3cid ? parseInt(p.w3cid, 10) : null;
    /** @type {HTMLElement} */
    const dd = hyperHTML$1`
      <dd class="p-author h-card vcard" data-editor-id="${editorid}"></dd>
    `;
    const span = document.createDocumentFragment();
    const contents = [];
    if (p.mailto) {
      contents.push(hyperHTML$1`
        <a class="ed_mailto u-email email p-name" href="${`mailto:${p.mailto}`}"
          >${personName}</a
        >
      `);
    } else if (p.url) {
      contents.push(hyperHTML$1`
        <a class="u-url url p-name fn" href="${p.url}">${personName}</a>
      `);
    } else {
      contents.push(
        hyperHTML$1`
          <span class="p-name fn">${personName}</span>
        `
      );
    }
    if (p.orcid) {
      contents.push(
        hyperHTML$1`
          <a class="p-name orcid" href="${p.orcid}"
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
            ><svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <style>
                .st1 {
                  fill: #fff;
                }
              </style>
              <path
                d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"
                fill="#a6ce39"
              />
              <path
                class="st1"
                d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1s10.1 4.6 10.1 10.1z"
              />
            </svg>
          </a>
<<<<<<< gh-pages
        `);e.company&&(e.companyURL?c.push(hyperHTML$1`
            (<a class="p-org org h-org h-card" href="${e.companyURL}"
              >${o}</a
            >)
          `):c.push(hyperHTML$1`
            (${o})
          `));e.note&&c.push(document.createTextNode(` (${e.note})`));if(e.extras){const t=e.extras.filter(e=>e.name&&e.name.trim()).map(n);for(const e of t)c.push(document.createTextNode(", "),e)}if(e.retiredDate){const n=new Date(e.retiredDate),r="Invalid Date"!==n.toString(),o=document.createElement("time");o.textContent=r?humanDate(n):"Invalid Date",r||showInlineError(o,"The date is invalid. The expected format is YYYY-MM-DD.","Invalid date"),o.dateTime=toShortIsoDate(n),c.push(hyperHTML$1`
          - ${t.until.concat(" ")}${o}
        `)}return hyperHTML$1.bind(a)`${c}`,s.appendChild(a),s}));function n(e){const t=hyperHTML$1`
      <span class="${e.class||null}"></span>
    `;let n=t;return e.href&&(n=hyperHTML$1`
        <a href="${e.href}"></a>
      `,t.appendChild(n)),n.textContent=e.name,t}};const ccLicense="https://creativecommons.org/licenses/by/4.0/",w3cLicense="https://www.w3.org/Consortium/Legal/copyright-documents",legalDisclaimer="https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer",w3cTrademark="https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks",localizationStrings$2={en:{author:"Author:",authors:"Authors:",editor:"Editor:",editors:"Editors:",former_editor:"Former editor:",former_editors:"Former editors:",latest_editors_draft:"Latest editor's draft:",latest_published_version:"Latest published version:",this_version:"This version:"},ko:{author:"저자:",authors:"저자:",editor:"편집자:",editors:"편집자:",former_editor:"이전 편집자:",former_editors:"이전 편집자:",latest_editors_draft:"최신 편집 초안:",latest_published_version:"최신 버전:",this_version:"현재 버전:"},zh:{editor:"编辑：",editors:"编辑：",former_editor:"原编辑：",former_editors:"原编辑：",latest_editors_draft:"最新编辑草稿：",latest_published_version:"最新发布版本：",this_version:"本版本："},ja:{author:"著者：",authors:"著者：",editor:"編者：",editors:"編者：",former_editor:"以前の版の編者：",former_editors:"以前の版の編者：",latest_editors_draft:"最新の編集用草案：",latest_published_version:"最新バージョン：",this_version:"このバージョン："},nl:{author:"Auteur:",authors:"Auteurs:",editor:"Redacteur:",editors:"Redacteurs:",latest_editors_draft:"Laatste werkversie:",latest_published_version:"Laatst gepubliceerde versie:",this_version:"Deze versie:"},es:{author:"Autor:",authors:"Autores:",editor:"Editor:",editors:"Editores:",latest_editors_draft:"Borrador de editor mas reciente:",latest_published_version:"Versión publicada mas reciente:",this_version:"Ésta versión:"}},l10n$4=getIntlData(localizationStrings$2);function getSpecTitleElem(e){const t=document.querySelector("h1#title")||document.createElement("h1");if(t.parentElement?t.remove():(t.textContent=e.title,t.id="title"),e.isPreview&&e.prNumber){const{childNodes:n}=hyperHTML$1`
      Preview of PR <a href="${e.prUrl}">#${e.prNumber}</a>:
    `;t.prepend(...n)}return e.title=norm(t.textContent),t.classList.add("title","p-name"),null===document.querySelector("title")?document.title=e.title:document.title!==e.title&&pub("warn","The document's title and the `<title>` element differ."),t}function getSpecSubTitleElem(e){let t=document.querySelector("h2#subtitle");return t&&t.parentElement?(t.remove(),e.subtitle=t.textContent.trim()):e.subtitle&&(t=document.createElement("h2"),t.textContent=e.subtitle,t.id="subtitle"),t&&t.classList.add("subtitle"),t}var headersTmpl=e=>hyperHTML$1`
    <div class="head">
      ${e.logos.map(showLogo)} ${getSpecTitleElem(e)}
      ${getSpecSubTitleElem(e)}
      <h2>
        ${e.prependW3C?"W3C ":""}${e.textStatus}
        <time class="dt-published" datetime="${e.dashDate}"
          >${e.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${e.isNoTrack?"":hyperHTML$1`
              <dt>${l10n$4.this_version}</dt>
              <dd>
                <a class="u-url" href="${e.thisVersion}"
                  >${e.thisVersion}</a
                >
              </dd>
              <dt>${l10n$4.latest_published_version}</dt>
              <dd>
                ${e.latestVersion?hyperHTML$1`
                      <a href="${e.latestVersion}">${e.latestVersion}</a>
                    `:"none"}
              </dd>
            `}
        ${e.edDraftURI?hyperHTML$1`
              <dt>${l10n$4.latest_editors_draft}</dt>
              <dd><a href="${e.edDraftURI}">${e.edDraftURI}</a></dd>
            `:""}
        ${e.testSuiteURI?hyperHTML$1`
              <dt>Test suite:</dt>
              <dd><a href="${e.testSuiteURI}">${e.testSuiteURI}</a></dd>
            `:""}
        ${e.implementationReportURI?hyperHTML$1`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${e.implementationReportURI}"
                  >${e.implementationReportURI}</a
                >
              </dd>
            `:""}
        ${e.isED&&e.prevED?hyperHTML$1`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${e.prevED}">${e.prevED}</a></dd>
            `:""}
        ${e.showPreviousVersion?hyperHTML$1`
              <dt>Previous version:</dt>
              <dd><a href="${e.prevVersion}">${e.prevVersion}</a></dd>
            `:""}
        ${e.prevRecURI?e.isRec?hyperHTML$1`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${e.prevRecURI}">${e.prevRecURI}</a></dd>
            `:hyperHTML$1`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${e.prevRecURI}">${e.prevRecURI}</a></dd>
            `:""}
        <dt>${e.multipleEditors?l10n$4.editors:l10n$4.editor}</dt>
        ${showPeople(e.editors)}
        ${Array.isArray(e.formerEditors)&&e.formerEditors.length>0?hyperHTML$1`
              <dt>
                ${e.multipleFormerEditors?l10n$4.former_editors:l10n$4.former_editor}
              </dt>
              ${showPeople(e.formerEditors)}
            `:""}
        ${e.authors?hyperHTML$1`
              <dt>
                ${e.multipleAuthors?l10n$4.authors:l10n$4.author}
              </dt>
              ${showPeople(e.authors)}
            `:""}
        ${e.otherLinks?e.otherLinks.map(showLink):""}
      </dl>
      ${e.errata?hyperHTML$1`
            <p>
              Please check the
              <a href="${e.errata}"><strong>errata</strong></a> for any
              errors or issues reported since publication.
            </p>
          `:""}
      ${e.isRec?hyperHTML$1`
            <p>
              See also
              <a
                href="${`http://www.w3.org/2003/03/Translations/byTechnology?technology=${e.shortName}`}"
=======
        `
      );
    }
    if (p.company) {
      if (p.companyURL) {
        contents.push(
          hyperHTML$1`
            (<a class="p-org org h-org h-card" href="${p.companyURL}"
              >${company}</a
            >)
          `
        );
      } else {
        contents.push(
          hyperHTML$1`
            (${company})
          `
        );
      }
    }
    if (p.note) contents.push(document.createTextNode(` (${p.note})`));
    if (p.extras) {
      const results = p.extras
        // Remove empty names
        .filter(extra => extra.name && extra.name.trim())
        // Convert to HTML
        .map(getExtra);
      for (const result of results) {
        contents.push(document.createTextNode(", "), result);
      }
    }
    if (p.retiredDate) {
      const retiredDate = new Date(p.retiredDate);
      const isValidDate = retiredDate.toString() !== "Invalid Date";
      const timeElem = document.createElement("time");
      timeElem.textContent = isValidDate
        ? humanDate(retiredDate)
        : "Invalid Date"; // todo: Localise invalid date
      if (!isValidDate) {
        showInlineError(
          timeElem,
          "The date is invalid. The expected format is YYYY-MM-DD.",
          "Invalid date"
        );
      }
      timeElem.dateTime = toShortIsoDate(retiredDate);
      contents.push(
        hyperHTML$1`
          - ${l10n.until.concat(" ")}${[timeElem]}
        `
      );
    }

    // @ts-ignore: hyperhtml types only support Element but we use a DocumentFragment here
    hyperHTML$1.bind(span)`${contents}`;
    dd.appendChild(span);
    return dd;
  }

  function getExtra(extra) {
    const span = hyperHTML$1`
      <span class="${extra.class || null}"></span>
    `;
    let textContainer = span;
    if (extra.href) {
      textContainer = hyperHTML$1`
        <a href="${extra.href}"></a>
      `;
      span.appendChild(textContainer);
    }
    textContainer.textContent = extra.name;
    return span;
  }
};

// @ts-check

var cgbgHeadersTmpl = conf => {
  return hyperHTML$1`
    <div class="head">
      ${conf.logos.map(showLogo)}
      <h1 class="title p-name" id="title">${conf.title}</h1>
      ${conf.subtitle
        ? hyperHTML$1`
            <h2 id="subtitle">${conf.subtitle}</h2>
          `
        : ""}
      <h2>
        ${conf.longStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${conf.thisVersion
          ? hyperHTML$1`
              <dt>${conf.l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
            `
          : ""}
        ${conf.latestVersion
          ? hyperHTML$1`
              <dt>${conf.l10n.latest_published_version}</dt>
              <dd>
                <a href="${conf.latestVersion}">${conf.latestVersion}</a>
              </dd>
            `
          : ""}
        ${conf.edDraftURI
          ? hyperHTML$1`
              <dt>${conf.l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.testSuiteURI
          ? hyperHTML$1`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? hyperHTML$1`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.bugTrackerHTML
          ? hyperHTML$1`
              <dt>${conf.l10n.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            `
          : ""}
        ${conf.prevVersion
          ? hyperHTML$1`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.isCGFinal
          ? hyperHTML$1`
              ${conf.prevED
                ? hyperHTML$1`
                    <dt>Previous editor's draft:</dt>
                    <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
                  `
                : ""}
            `
          : ""}
        <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
        ${showPeople(conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? hyperHTML$1`
              <dt>
                ${conf.multipleFormerEditors
                  ? conf.l10n.former_editors
                  : conf.l10n.former_editor}
              </dt>
              ${showPeople(conf.formerEditors)}
            `
          : ""}
        ${conf.authors
          ? hyperHTML$1`
              <dt>
                ${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}
              </dt>
              ${showPeople(conf.authors)}
            `
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
      ${conf.alternateFormats
        ? hyperHTML$1`
            <p>
              ${conf.multipleAlternates
                ? "This document is also available in these non-normative formats:"
                : "This document is also available in this non-normative format:"}
              ${[conf.alternatesHTML]}
            </p>
          `
        : ""}
      <p class="copyright">
        <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright"
          >Copyright</a
        >
        &copy;
        ${conf.copyrightStart
          ? `${conf.copyrightStart}-`
          : ""}${conf.publishYear}
        ${conf.additionalCopyrightHolders
          ? hyperHTML$1`
              ${[conf.additionalCopyrightHolders]} &amp;
            `
          : ""}
        the Contributors to the ${conf.title} Specification, published by the
        <a href="${conf.wgURI}">${conf.wg}</a> under the
        ${conf.isCGFinal
          ? hyperHTML$1`
              <a href="https://www.w3.org/community/about/agreements/fsa/"
                >W3C Community Final Specification Agreement (FSA)</a
              >. A human-readable
              <a href="https://www.w3.org/community/about/agreements/fsa-deed/"
                >summary</a
              >
              is available.
            `
          : hyperHTML$1`
              <a href="https://www.w3.org/community/about/agreements/cla/"
                >W3C Community Contributor License Agreement (CLA)</a
              >. A human-readable
              <a href="https://www.w3.org/community/about/agreements/cla-deed/"
                >summary</a
              >
              is available.
            `}
      </p>
      <hr title="Separator for header" />
    </div>
  `;
};

// @ts-check

var cgbgSotdTmpl = (conf, opts) => {
  return hyperHTML$1`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview
      ? hyperHTML$1`
          <details class="annoying-warning" open="">
            <summary
              >This is a
              preview${conf.prUrl && conf.prNumber
                ? hyperHTML$1`
                    of pull request
                    <a href="${conf.prUrl}">#${conf.prNumber}</a>
                  `
                : ""}</summary
            >
            <p>
              Do not attempt to implement this version of the specification. Do
              not reference this version as authoritative in any way.
              ${conf.edDraftURI
                ? hyperHTML$1`
                    Instead, see
                    <a href="${conf.edDraftURI}">${conf.edDraftURI}</a> for the
                    Editor's draft.
                  `
                : ""}
            </p>
          </details>
        `
      : ""}
    <p>
      This specification was published by the
      <a href="${conf.wgURI}">${conf.wg}</a>. It is not a W3C Standard nor is it
      on the W3C Standards Track.
      ${conf.isCGFinal
        ? hyperHTML$1`
            Please note that under the
            <a href="https://www.w3.org/community/about/agreements/final/"
              >W3C Community Final Specification Agreement (FSA)</a
            >
            other conditions apply.
          `
        : hyperHTML$1`
            Please note that under the
            <a href="https://www.w3.org/community/about/agreements/cla/"
              >W3C Community Contributor License Agreement (CLA)</a
            >
            there is a limited opt-out and other conditions apply.
          `}
      Learn more about
      <a href="https://www.w3.org/community/"
        >W3C Community and Business Groups</a
      >.
    </p>
    ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
    ${conf.wgPublicList
      ? hyperHTML$1`
          <p>
            If you wish to make comments regarding this document, please send
            them to
            <a href="${opts.mailToWGPublicListWithSubject}"
              >${conf.wgPublicList}@w3.org</a
            >
            (<a href="${opts.mailToWGPublicListSubscription}">subscribe</a>,
            <a
              href="${`https://lists.w3.org/Archives/Public/${conf.wgPublicList}/`}"
              >archives</a
            >)${conf.subjectPrefix
              ? hyperHTML$1`
                  with <code>${conf.subjectPrefix}</code> at the start of your
                  email's subject
                `
              : ""}.
          </p>
        `
      : ""}
    ${conf.sotdAfterWGinfo ? opts.additionalContent : ""}
    ${opts.additionalSections}
  `;
};

// @ts-check

const ccLicense = "https://creativecommons.org/licenses/by/4.0/";
const w3cLicense = "https://www.w3.org/Consortium/Legal/copyright-documents";
const legalDisclaimer =
  "https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer";
const w3cTrademark =
  "https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks";

function getSpecTitleElem(conf) {
  const specTitleElem =
    document.querySelector("h1#title") || document.createElement("h1");
  if (specTitleElem.parentElement) {
    specTitleElem.remove();
  } else {
    specTitleElem.textContent = conf.title;
    specTitleElem.id = "title";
  }
  if (conf.isPreview && conf.prNumber) {
    const { childNodes } = hyperHTML$1`
      Preview of PR <a href="${conf.prUrl}">#${conf.prNumber}</a>:
    `;
    specTitleElem.prepend(...childNodes);
  }
  conf.title = norm(specTitleElem.textContent);
  specTitleElem.classList.add("title", "p-name");
  if (document.querySelector("title") === null) {
    document.title = conf.title;
  } else if (document.title !== conf.title) {
    pub("warn", "The document's title and the `<title>` element differ.");
  }
  return specTitleElem;
}

function getSpecSubTitleElem(conf) {
  let specSubTitleElem = document.querySelector("h2#subtitle");

  if (specSubTitleElem && specSubTitleElem.parentElement) {
    specSubTitleElem.remove();
    conf.subtitle = specSubTitleElem.textContent.trim();
  } else if (conf.subtitle) {
    specSubTitleElem = document.createElement("h2");
    specSubTitleElem.textContent = conf.subtitle;
    specSubTitleElem.id = "subtitle";
  }
  if (specSubTitleElem) {
    specSubTitleElem.classList.add("subtitle");
  }
  return specSubTitleElem;
}

var headersTmpl = conf => {
  return hyperHTML$1`
    <div class="head">
      ${conf.logos.map(showLogo)} ${getSpecTitleElem(conf)}
      ${getSpecSubTitleElem(conf)}
      <h2>
        ${conf.prependW3C ? "W3C " : ""}${conf.textStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${!conf.isNoTrack
          ? hyperHTML$1`
              <dt>${conf.l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
              <dt>${conf.l10n.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion
                  ? hyperHTML$1`
                      <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                    `
                  : "none"}
              </dd>
            `
          : ""}
        ${conf.edDraftURI
          ? hyperHTML$1`
              <dt>${conf.l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.testSuiteURI
          ? hyperHTML$1`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? hyperHTML$1`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.bugTrackerHTML
          ? hyperHTML$1`
              <dt>${conf.l10n.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            `
          : ""}
        ${conf.isED && conf.prevED
          ? hyperHTML$1`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            `
          : ""}
        ${conf.showPreviousVersion
          ? hyperHTML$1`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.prevRecURI
          ? ""
          : conf.isRec
          ? hyperHTML$1`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `
          : hyperHTML$1`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
        ${showPeople(conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? hyperHTML$1`
              <dt>
                ${conf.multipleFormerEditors
                  ? conf.l10n.former_editors
                  : conf.l10n.former_editor}
              </dt>
              ${showPeople(conf.formerEditors)}
            `
          : ""}
        ${conf.authors
          ? hyperHTML$1`
              <dt>
                ${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}
              </dt>
              ${showPeople(conf.authors)}
            `
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
      ${conf.errata
        ? hyperHTML$1`
            <p>
              Please check the
              <a href="${conf.errata}"><strong>errata</strong></a> for any
              errors or issues reported since publication.
            </p>
          `
        : ""}
      ${conf.isRec
        ? hyperHTML$1`
            <p>
              See also
              <a
                href="${`http://www.w3.org/2003/03/Translations/byTechnology?technology=${conf.shortName}`}"
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
              >
                <strong>translations</strong></a
              >.
            </p>
<<<<<<< gh-pages
          `:""}
      ${e.alternateFormats?hyperHTML$1`
            <p>
              ${e.multipleAlternates?"This document is also available in these non-normative formats:":"This document is also available in this non-normative format:"}
              ${[e.alternatesHTML]}
            </p>
          `:""}
      ${renderCopyright(e)}
      <hr title="Separator for header" />
    </div>
  `;function linkLicense(e,t,n){return hyperHTML$1`
    <a rel="license" href="${t}" class="${n}">${e}</a>
  `}function renderCopyright(e){const t=document.querySelector(".copyright");if(t)return t.remove(),t;if(e.hasOwnProperty("overrideCopyright")){pub("warn",'The `overrideCopyright` configuration option is deprecated. Please use `<p class="copyright">` instead.')}return e.isUnofficial?e.additionalCopyrightHolders?hyperHTML$1`
          <p class="copyright">${[e.additionalCopyrightHolders]}</p>
        `:e.overrideCopyright?[e.overrideCopyright]:hyperHTML$1`
          <p class="copyright">
            This document is licensed under a
            ${linkLicense("Creative Commons Attribution 4.0 License",ccLicense,"subfoot")}.
          </p>
        `:e.overrideCopyright?[e.overrideCopyright]:renderOfficialCopyright(e)}function renderOfficialCopyright(e){return hyperHTML$1`
=======
          `
        : ""}
      ${conf.alternateFormats
        ? hyperHTML$1`
            <p>
              ${conf.multipleAlternates
                ? "This document is also available in these non-normative formats:"
                : "This document is also available in this non-normative format:"}
              ${[conf.alternatesHTML]}
            </p>
          `
        : ""}
      ${renderCopyright(conf)}
      <hr title="Separator for header" />
    </div>
  `;
};

/**
 * @param {string} text
 * @param {string} url
 * @param {string=} cssClass
 */
function linkLicense(text, url, cssClass) {
  return hyperHTML$1`
    <a rel="license" href="${url}" class="${cssClass}">${text}</a>
  `;
}

function renderCopyright(conf) {
  return conf.isUnofficial
    ? conf.additionalCopyrightHolders
      ? hyperHTML$1`
          <p class="copyright">${[conf.additionalCopyrightHolders]}</p>
        `
      : conf.overrideCopyright
      ? [conf.overrideCopyright]
      : hyperHTML$1`
          <p class="copyright">
            This document is licensed under a
            ${linkLicense(
              "Creative Commons Attribution 4.0 License",
              ccLicense,
              "subfoot"
            )}.
          </p>
        `
    : conf.overrideCopyright
    ? [conf.overrideCopyright]
    : renderOfficialCopyright(conf);
}

function renderOfficialCopyright(conf) {
  return hyperHTML$1`
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
    <p class="copyright">
      <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright"
        >Copyright</a
      >
      &copy;
<<<<<<< gh-pages
      ${e.copyrightStart?`${e.copyrightStart}-`:""}${e.publishYear}
      ${e.additionalCopyrightHolders?hyperHTML$1`
            ${[e.additionalCopyrightHolders]} &amp;
          `:""}
=======
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      ${conf.additionalCopyrightHolders
        ? hyperHTML$1`
            ${[conf.additionalCopyrightHolders]} &amp;
          `
        : ""}
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
      <a href="https://www.w3.org/"
        ><abbr title="World Wide Web Consortium">W3C</abbr></a
      ><sup>&reg;</sup> (<a href="https://www.csail.mit.edu/"
        ><abbr title="Massachusetts Institute of Technology">MIT</abbr></a
      >,
      <a href="https://www.ercim.eu/"
        ><abbr
          title="European Research Consortium for Informatics and Mathematics"
          >ERCIM</abbr
        ></a
      >, <a href="https://www.keio.ac.jp/">Keio</a>,
<<<<<<< gh-pages
      <a href="https://ev.buaa.edu.cn/">Beihang</a>). ${noteIfDualLicense(e)}
      W3C <a href="${legalDisclaimer}">liability</a>,
      <a href="${w3cTrademark}">trademark</a> and ${linkDocumentUse(e)} rules
      apply.
    </p>
  `}function noteIfDualLicense(e){if(e.isCCBY)return hyperHTML$1`
    Some Rights Reserved: this document is dual-licensed,
    ${linkLicense("CC-BY",ccLicense)} and
    ${linkLicense("W3C Document License",w3cLicense)}.
  `}function linkDocumentUse(e){return e.isCCBY?linkLicense("document use","https://www.w3.org/Consortium/Legal/2013/copyright-documents-dual.html"):e.isW3CSoftAndDocLicense?linkLicense("permissive document license","https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document"):linkLicense("document use",w3cLicense)}var cgbgHeadersTmpl=e=>{const t=document.querySelector(".copyright");return t&&t.remove(),hyperHTML$1`
    <div class="head">
      ${e.logos.map(showLogo)}
      <h1 class="title p-name" id="title">${e.title}</h1>
      ${e.subtitle?hyperHTML$1`
            <h2 id="subtitle">${e.subtitle}</h2>
          `:""}
      <h2>
        ${e.longStatus}
        <time class="dt-published" datetime="${e.dashDate}"
          >${e.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${e.thisVersion?hyperHTML$1`
              <dt>${l10n$4.this_version}</dt>
              <dd>
                <a class="u-url" href="${e.thisVersion}"
                  >${e.thisVersion}</a
                >
              </dd>
            `:""}
        ${e.latestVersion?hyperHTML$1`
              <dt>${l10n$4.latest_published_version}</dt>
              <dd>
                <a href="${e.latestVersion}">${e.latestVersion}</a>
              </dd>
            `:""}
        ${e.edDraftURI?hyperHTML$1`
              <dt>${l10n$4.latest_editors_draft}</dt>
              <dd><a href="${e.edDraftURI}">${e.edDraftURI}</a></dd>
            `:""}
        ${e.testSuiteURI?hyperHTML$1`
              <dt>Test suite:</dt>
              <dd><a href="${e.testSuiteURI}">${e.testSuiteURI}</a></dd>
            `:""}
        ${e.implementationReportURI?hyperHTML$1`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${e.implementationReportURI}"
                  >${e.implementationReportURI}</a
                >
              </dd>
            `:""}
        ${e.prevVersion?hyperHTML$1`
              <dt>Previous version:</dt>
              <dd><a href="${e.prevVersion}">${e.prevVersion}</a></dd>
            `:""}
        ${e.isCGFinal?"":hyperHTML$1`
              ${e.prevED?hyperHTML$1`
                    <dt>Previous editor's draft:</dt>
                    <dd><a href="${e.prevED}">${e.prevED}</a></dd>
                  `:""}
            `}
        <dt>${e.multipleEditors?l10n$4.editors:l10n$4.editor}</dt>
        ${showPeople(e.editors)}
        ${Array.isArray(e.formerEditors)&&e.formerEditors.length>0?hyperHTML$1`
              <dt>
                ${e.multipleFormerEditors?l10n$4.former_editors:l10n$4.former_editor}
              </dt>
              ${showPeople(e.formerEditors)}
            `:""}
        ${e.authors?hyperHTML$1`
              <dt>
                ${e.multipleAuthors?l10n$4.authors:l10n$4.author}
              </dt>
              ${showPeople(e.authors)}
            `:""}
        ${e.otherLinks?e.otherLinks.map(showLink):""}
      </dl>
      ${e.alternateFormats?hyperHTML$1`
            <p>
              ${e.multipleAlternates?"This document is also available in these non-normative formats:":"This document is also available in this non-normative format:"}
              ${[e.alternatesHTML]}
            </p>
          `:""}
      ${t||hyperHTML$1`
            <p class="copyright">
              <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright"
                >Copyright</a
              >
              &copy;
              ${e.copyrightStart?`${e.copyrightStart}-`:""}${e.publishYear}
              ${e.additionalCopyrightHolders?hyperHTML$1`
                    ${[e.additionalCopyrightHolders]} &amp;
                  `:""}
              the Contributors to the ${e.title} Specification, published by
              the
              <a href="${e.wgURI}">${e.wg}</a> under the
              ${e.isCGFinal?hyperHTML$1`
                    <a href="https://www.w3.org/community/about/agreements/fsa/"
                      >W3C Community Final Specification Agreement (FSA)</a
                    >. A human-readable
                    <a
                      href="https://www.w3.org/community/about/agreements/fsa-deed/"
                      >summary</a
                    >
                    is available.
                  `:hyperHTML$1`
                    <a href="https://www.w3.org/community/about/agreements/cla/"
                      >W3C Community Contributor License Agreement (CLA)</a
                    >. A human-readable
                    <a
                      href="https://www.w3.org/community/about/agreements/cla-deed/"
                      >summary</a
                    >
                    is available.
                  `}
            </p>
          `}
      <hr title="Separator for header" />
    </div>
  `};const localizationStrings$3={en:{sotd:"Status of This Document"},ko:{sotd:"현재 문서의 상태"},zh:{sotd:"关于本文档"},ja:{sotd:"この文書の位置付け"},nl:{sotd:"Status van dit document"},es:{sotd:"Estado de este Document"}},l10n$5=getIntlData(localizationStrings$3);var sotdTmpl=(e,t)=>hyperHTML$1`
    <h2>${l10n$5.sotd}</h2>
    ${e.isPreview?renderPreview(e):""}
    ${e.isUnofficial?renderIsUnofficial(t):e.isTagFinding?t.additionalContent:e.isNoTrack?renderIsNoTrack(e,t):hyperHTML$1`
          <p><em>${[e.l10n.status_at_publication]}</em></p>
          ${e.isSubmission?noteForSubmission(e,t):hyperHTML$1`
                ${e.sotdAfterWGinfo?"":t.additionalContent}
                ${e.overrideStatus?"":hyperHTML$1`
                      ${linkToWorkingGroup(e)} ${linkToCommunity(e,t)}
                      ${e.isCR||e.isPER||e.isPR?hyperHTML$1`
                            <p>
                              ${e.isCR?`\n                  W3C publishes a Candidate Recommendation to indicate that the document is believed to be\n                  stable and to encourage implementation by the developer community. This Candidate\n                  Recommendation is expected to advance to Proposed Recommendation no earlier than\n                  ${e.humanCREnd}.\n                `:""}
                              ${e.isPER?hyperHTML$1`
                                    W3C Advisory Committee Members are invited
                                    to send formal review comments on this
                                    Proposed Edited Recommendation to the W3C
                                    Team until ${e.humanPEREnd}. Members of
=======
      <a href="https://ev.buaa.edu.cn/">Beihang</a>). ${noteIfDualLicense(conf)}
      W3C <a href="${legalDisclaimer}">liability</a>,
      <a href="${w3cTrademark}">trademark</a> and ${linkDocumentUse(conf)} rules
      apply.
    </p>
  `;
}

function noteIfDualLicense(conf) {
  if (!conf.isCCBY) {
    return;
  }
  return hyperHTML$1`
    Some Rights Reserved: this document is dual-licensed,
    ${linkLicense("CC-BY", ccLicense)} and
    ${linkLicense("W3C Document License", w3cLicense)}.
  `;
}

function linkDocumentUse(conf) {
  if (conf.isCCBY) {
    return linkLicense(
      "document use",
      "https://www.w3.org/Consortium/Legal/2013/copyright-documents-dual.html"
    );
  }
  if (conf.isW3CSoftAndDocLicense) {
    return linkLicense(
      "permissive document license",
      "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document"
    );
  }
  return linkLicense("document use", w3cLicense);
}

// @ts-check

var sotdTmpl = (conf, opts) => {
  return hyperHTML$1`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview ? renderPreview(conf) : ""}
    ${conf.isUnofficial
      ? renderIsUnofficial(opts)
      : conf.isTagFinding
      ? opts.additionalContent
      : conf.isNoTrack
      ? renderIsNoTrack(conf, opts)
      : hyperHTML$1`
          <p><em>${[conf.l10n.status_at_publication]}</em></p>
          ${conf.isSubmission
            ? noteForSubmission(conf, opts)
            : hyperHTML$1`
                ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${!conf.overrideStatus
                  ? hyperHTML$1`
                      ${linkToWorkingGroup(conf)} ${linkToCommunity(conf, opts)}
                      ${conf.isCR || conf.isPER || conf.isPR
                        ? hyperHTML$1`
                            <p>
                              ${conf.isCR
                                ? `
                  W3C publishes a Candidate Recommendation to indicate that the document is believed to be
                  stable and to encourage implementation by the developer community. This Candidate
                  Recommendation is expected to advance to Proposed Recommendation no earlier than
                  ${conf.humanCREnd}.
                `
                                : ""}
                              ${conf.isPER
                                ? hyperHTML$1`
                                    W3C Advisory Committee Members are invited
                                    to send formal review comments on this
                                    Proposed Edited Recommendation to the W3C
                                    Team until ${conf.humanPEREnd}. Members of
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
                                    the Advisory Committee will find the
                                    appropriate review form for this document by
                                    consulting their list of current
                                    <a
                                      href="https://www.w3.org/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >.
<<<<<<< gh-pages
                                  `:""}
                              ${e.isPR?hyperHTML$1`
=======
                                  `
                                : ""}
                              ${conf.isPR
                                ? hyperHTML$1`
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
                                    The W3C Membership and other interested
                                    parties are invited to review the document
                                    and send comments to
                                    <a
                                      rel="discussion"
<<<<<<< gh-pages
                                      href="${t.mailToWGPublicList}"
                                      >${e.wgPublicList}@w3.org</a
                                    >
                                    (<a
                                      href="${t.mailToWGPublicListSubscription}"
                                      >subscribe</a
                                    >,
                                    <a
                                      href="${`https://lists.w3.org/Archives/Public/${e.wgPublicList}/`}"
                                      >archives</a
                                    >) through ${e.humanPREnd}. Advisory
=======
                                      href="${opts.mailToWGPublicList}"
                                      >${conf.wgPublicList}@w3.org</a
                                    >
                                    (<a
                                      href="${opts.mailToWGPublicListSubscription}"
                                      >subscribe</a
                                    >,
                                    <a
                                      href="${`https://lists.w3.org/Archives/Public/${conf.wgPublicList}/`}"
                                      >archives</a
                                    >) through ${conf.humanPREnd}. Advisory
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
                                    Committee Representatives should consult
                                    their
                                    <a
                                      href="https://www.w3.org/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >. Note that substantive technical comments
                                    were expected during the Candidate
                                    Recommendation review period that ended
<<<<<<< gh-pages
                                    ${e.humanCREnd}.
                                  `:""}
                            </p>
                          `:""}
                    `}
                ${e.implementationReportURI?renderImplementationReportURI(e):""}
                ${e.sotdAfterWGinfo?t.additionalContent:""}
                ${e.notRec?renderNotRec(e):""}
                ${e.isRec?renderIsRec():""} ${renderDeliverer(e)}
=======
                                    ${conf.humanCREnd}.
                                  `
                                : ""}
                            </p>
                          `
                        : ""}
                    `
                  : ""}
                ${conf.implementationReportURI
                  ? renderImplementationReportURI(conf)
                  : ""}
                ${conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${conf.notRec ? renderNotRec(conf) : ""}
                ${conf.isRec ? renderIsRec() : ""} ${renderDeliverer(conf)}
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
                <p>
                  This document is governed by the
                  <a
                    id="w3c_process_revision"
                    href="https://www.w3.org/2019/Process-20190301/"
                    >1 March 2019 W3C Process Document</a
                  >.
                </p>
<<<<<<< gh-pages
                ${e.addPatentNote?hyperHTML$1`
                      <p>${[e.addPatentNote]}</p>
                    `:""}
              `}
        `}
    ${t.additionalSections}
  `;function renderPreview(e){const{prUrl:t,prNumber:n,edDraftURI:r}=e;return hyperHTML$1`
    <details class="annoying-warning" open="">
      <summary
        >This is a
        preview${t&&n?hyperHTML$1`
              of pull request
              <a href="${t}">#${n}</a>
            `:""}</summary
=======
                ${conf.addPatentNote
                  ? hyperHTML$1`
                      <p>${[conf.addPatentNote]}</p>
                    `
                  : ""}
              `}
        `}
    ${opts.additionalSections}
  `;
};

function renderPreview(conf) {
  const { prUrl, prNumber, edDraftURI } = conf;
  return hyperHTML$1`
    <details class="annoying-warning" open="">
      <summary
        >This is a
        preview${prUrl && prNumber
          ? hyperHTML$1`
              of pull request
              <a href="${prUrl}">#${prNumber}</a>
            `
          : ""}</summary
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
      >
      <p>
        Do not attempt to implement this version of the specification. Do not
        reference this version as authoritative in any way.
<<<<<<< gh-pages
        ${r?hyperHTML$1`
              Instead, see
              <a href="${r}">${r}</a> for the Editor's draft.
            `:""}
      </p>
    </details>
  `}function renderIsUnofficial(e){const{additionalContent:t}=e;return hyperHTML$1`
=======
        ${edDraftURI
          ? hyperHTML$1`
              Instead, see
              <a href="${edDraftURI}">${edDraftURI}</a> for the Editor's draft.
            `
          : ""}
      </p>
    </details>
  `;
}

function renderIsUnofficial(opts) {
  const { additionalContent } = opts;
  return hyperHTML$1`
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
    <p>
      This document is draft of a potential specification. It has no official
      standing of any kind and does not represent the support or consensus of
      any standards organization.
    </p>
<<<<<<< gh-pages
    ${t}
  `}function renderIsNoTrack(e,t){const{isMO:n}=e,{additionalContent:r}=t;return hyperHTML$1`
    <p>
      This document is merely a W3C-internal
      ${n?"member-confidential":""} document. It has no official standing
      of any kind and does not represent consensus of the W3C Membership.
    </p>
    ${r}
  `}function renderImplementationReportURI(e){const{implementationReportURI:t}=e;return hyperHTML$1`
    <p>
      Please see the Working Group's
      <a href="${t}">implementation report</a>.
    </p>
  `}function renderNotRec(e){const{anOrA:t,textStatus:n}=e;return hyperHTML$1`
    <p>
      Publication as ${t} ${n} does not imply endorsement by the
=======
    ${additionalContent}
  `;
}

function renderIsNoTrack(conf, opts) {
  const { isMO } = conf;
  const { additionalContent } = opts;
  return hyperHTML$1`
    <p>
      This document is merely a W3C-internal
      ${isMO ? "member-confidential" : ""} document. It has no official standing
      of any kind and does not represent consensus of the W3C Membership.
    </p>
    ${additionalContent}
  `;
}

function renderImplementationReportURI(conf) {
  const { implementationReportURI } = conf;
  return hyperHTML$1`
    <p>
      Please see the Working Group's
      <a href="${implementationReportURI}">implementation report</a>.
    </p>
  `;
}

function renderNotRec(conf) {
  const { anOrA, textStatus } = conf;
  return hyperHTML$1`
    <p>
      Publication as ${anOrA} ${textStatus} does not imply endorsement by the
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
      W3C Membership. This is a draft document and may be updated, replaced or
      obsoleted by other documents at any time. It is inappropriate to cite this
      document as other than work in progress.
    </p>
<<<<<<< gh-pages
  `}function renderIsRec(){hyperHTML$1`
=======
  `;
}

function renderIsRec() {
  hyperHTML$1`
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
    <p>
      This document has been reviewed by W3C Members, by software developers,
      and by other W3C groups and interested parties, and is endorsed by the
      Director as a W3C Recommendation. It is a stable document and may be used
      as reference material or cited from another document. W3C's role in making
      the Recommendation is to draw attention to the specification and to
      promote its widespread deployment. This enhances the functionality and
      interoperability of the Web.
    </p>
<<<<<<< gh-pages
  `}function renderDeliverer(e){const{isNote:t,wgId:n,isIGNote:r,multipleWGs:o,recNotExpected:i,wgPatentHTML:s,wgPatentURI:a,charterDisclosureURI:c}=e,l=r?"":hyperHTML$1`
        This document was produced by ${o?"groups":"a group"}
=======
  `;
}

function renderDeliverer(conf) {
  const {
    isNote,
    wgId,
    isIGNote,
    multipleWGs,
    recNotExpected,
    wgPatentHTML,
    wgPatentURI,
    charterDisclosureURI,
  } = conf;

  const producers = !isIGNote
    ? hyperHTML$1`
        This document was produced by ${multipleWGs ? "groups" : "a group"}
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
        operating under the
        <a href="https://www.w3.org/Consortium/Patent-Policy/"
          >W3C Patent Policy</a
        >.
<<<<<<< gh-pages
      `;return hyperHTML$1`
    <p data-deliverer="${t?n:null}">
      ${l} ${i?"The group does not expect this document to become a W3C Recommendation.":""}
      ${t||r?"":hyperHTML$1`
            ${o?hyperHTML$1`
                  W3C maintains ${s}
                `:hyperHTML$1`
                  W3C maintains a
                  <a href="${[a]}" rel="disclosure"
=======
      `
    : "";
  const wontBeRec = recNotExpected
    ? "The group does not expect this document to become a W3C Recommendation."
    : "";
  return hyperHTML$1`
    <p data-deliverer="${isNote ? wgId : null}">
      ${producers} ${wontBeRec}
      ${!isNote && !isIGNote
        ? hyperHTML$1`
            ${multipleWGs
              ? hyperHTML$1`
                  W3C maintains ${[wgPatentHTML]}
                `
              : hyperHTML$1`
                  W3C maintains a
                  <a href="${[wgPatentURI]}" rel="disclosure"
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
                    >public list of any patent disclosures</a
                  >
                `}
            made in connection with the deliverables of
<<<<<<< gh-pages
            ${o?"each group; these pages also include":"the group; that page also includes"}
=======
            ${multipleWGs
              ? "each group; these pages also include"
              : "the group; that page also includes"}
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
            instructions for disclosing a patent. An individual who has actual
            knowledge of a patent which the individual believes contains
            <a href="https://www.w3.org/Consortium/Patent-Policy/#def-essential"
              >Essential Claim(s)</a
            >
            must disclose the information in accordance with
            <a
              href="https://www.w3.org/Consortium/Patent-Policy/#sec-Disclosure"
              >section 6 of the W3C Patent Policy</a
            >.
<<<<<<< gh-pages
          `}
      ${r?hyperHTML$1`
            The disclosure obligations of the Participants of this group are
            described in the
            <a href="${c}">charter</a>.
          `:""}
    </p>
  `}function noteForSubmission(e,t){return hyperHTML$1`
    ${t.additionalContent}
    ${e.isMemberSubmission?noteForMemberSubmission(e):e.isTeamSubmission?noteForTeamSubmission(e,t):""}
  `}function noteForMemberSubmission(e){const t=`https://www.w3.org/Submission/${e.publishDate.getUTCFullYear()}/${e.submissionCommentNumber}/Comment/`;return hyperHTML$1`
    <p>
      By publishing this document, W3C acknowledges that the
      <a href="${e.thisVersion}">Submitting Members</a> have made a formal
=======
          `
        : ""}
      ${isIGNote
        ? hyperHTML$1`
            The disclosure obligations of the Participants of this group are
            described in the
            <a href="${charterDisclosureURI}">charter</a>.
          `
        : ""}
    </p>
  `;
}

function noteForSubmission(conf, opts) {
  return hyperHTML$1`
    ${opts.additionalContent}
    ${conf.isMemberSubmission
      ? noteForMemberSubmission(conf)
      : conf.isTeamSubmission
      ? noteForTeamSubmission(conf, opts)
      : ""}
  `;
}

function noteForMemberSubmission(conf) {
  const teamComment = `https://www.w3.org/Submission/${conf.publishDate.getUTCFullYear()}/${
    conf.submissionCommentNumber
  }/Comment/`;
  return hyperHTML$1`
    <p>
      By publishing this document, W3C acknowledges that the
      <a href="${conf.thisVersion}">Submitting Members</a> have made a formal
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
      Submission request to W3C for discussion. Publication of this document by
      W3C indicates no endorsement of its content by W3C, nor that W3C has, is,
      or will be allocating any resources to the issues addressed by it. This
      document is not the product of a chartered W3C group, but is published as
      potential input to the
      <a href="https://www.w3.org/Consortium/Process">W3C Process</a>. A
<<<<<<< gh-pages
      <a href="${t}">W3C Team Comment</a> has been published in
=======
      <a href="${teamComment}">W3C Team Comment</a> has been published in
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
      conjunction with this Member Submission. Publication of acknowledged
      Member Submissions at the W3C site is one of the benefits of
      <a href="https://www.w3.org/Consortium/Prospectus/Joining">
        W3C Membership</a
      >. Please consult the requirements associated with Member Submissions of
      <a href="https://www.w3.org/Consortium/Patent-Policy/#sec-submissions"
        >section 3.3 of the W3C Patent Policy</a
      >. Please consult the complete
      <a href="https://www.w3.org/Submission"
        >list of acknowledged W3C Member Submissions</a
      >.
    </p>
<<<<<<< gh-pages
  `}function noteForTeamSubmission(e,t){return hyperHTML$1`
    <p>
      If you wish to make comments regarding this document, please send them to
      <a href="${t.mailToWGPublicListWithSubject}"
        >${e.wgPublicList}@w3.org</a
      >
      (<a href="${t.mailToWGPublicListSubscription}">subscribe</a>,
      <a href="${`https://lists.w3.org/Archives/Public/${e.wgPublicList}/`}"
        >archives</a
      >)${e.subjectPrefix?hyperHTML$1`
            with <code>${e.subjectPrefix}</code> at the start of your email's
            subject
          `:""}.
=======
  `;
}

function noteForTeamSubmission(conf, opts) {
  return hyperHTML$1`
    <p>
      If you wish to make comments regarding this document, please send them to
      <a href="${opts.mailToWGPublicListWithSubject}"
        >${conf.wgPublicList}@w3.org</a
      >
      (<a href="${opts.mailToWGPublicListSubscription}">subscribe</a>,
      <a href="${`https://lists.w3.org/Archives/Public/${conf.wgPublicList}/`}"
        >archives</a
      >)${conf.subjectPrefix
        ? hyperHTML$1`
            with <code>${conf.subjectPrefix}</code> at the start of your email's
            subject
          `
        : ""}.
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
    </p>
    <p>
      Please consult the complete
      <a href="https://www.w3.org/TeamSubmission/">list of Team Submissions</a>.
    </p>
<<<<<<< gh-pages
  `}function linkToWorkingGroup(e){if(e.wg)return hyperHTML$1`
    <p>
      This document was published by ${e.wgHTML} as ${e.anOrA}
      ${e.longStatus}.
      ${e.notYetRec?"This document is intended to become a W3C Recommendation.":""}
    </p>
  `}function linkToCommunity(e,t){if(e.github||e.wgPublicList)return hyperHTML$1`
    <p>
      ${e.github?hyperHTML$1`
            <a href="${e.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `:""}
      ${e.wgPublicList?hyperHTML$1`
            ${e.github&&e.wgPublicList?"Alternatively, you can send comments to our mailing list.":"Comments regarding this document are welcome."}
            Please send them to
            <a href="${t.mailToWGPublicListWithSubject}"
              >${e.wgPublicList}@w3.org</a
            >
            (<a
              href="${`https://lists.w3.org/Archives/Public/${e.wgPublicList}/`}"
              >archives</a
            >)${e.subjectPrefix?hyperHTML$1`
                  with <code>${e.subjectPrefix}</code> at the start of your
                  email's subject
                `:""}.
          `:""}
    </p>
  `}var cgbgSotdTmpl=(e,t)=>hyperHTML$1`
    <h2>${l10n$5.sotd}</h2>
    ${e.isPreview?hyperHTML$1`
          <details class="annoying-warning" open="">
            <summary
              >This is a
              preview${e.prUrl&&e.prNumber?hyperHTML$1`
                    of pull request
                    <a href="${e.prUrl}">#${e.prNumber}</a>
                  `:""}</summary
            >
            <p>
              Do not attempt to implement this version of the specification. Do
              not reference this version as authoritative in any way.
              ${e.edDraftURI?hyperHTML$1`
                    Instead, see
                    <a href="${e.edDraftURI}">${e.edDraftURI}</a> for the
                    Editor's draft.
                  `:""}
            </p>
          </details>
        `:""}
    <p>
      This specification was published by the
      <a href="${e.wgURI}">${e.wg}</a>. It is not a W3C Standard nor is it
      on the W3C Standards Track.
      ${e.isCGFinal?hyperHTML$1`
            Please note that under the
            <a href="https://www.w3.org/community/about/agreements/final/"
              >W3C Community Final Specification Agreement (FSA)</a
            >
            other conditions apply.
          `:hyperHTML$1`
            Please note that under the
            <a href="https://www.w3.org/community/about/agreements/cla/"
              >W3C Community Contributor License Agreement (CLA)</a
            >
            there is a limited opt-out and other conditions apply.
          `}
      Learn more about
      <a href="https://www.w3.org/community/"
        >W3C Community and Business Groups</a
      >.
    </p>
    ${e.sotdAfterWGinfo?"":t.additionalContent}
    ${e.wgPublicList?hyperHTML$1`
          <p>
            If you wish to make comments regarding this document, please send
            them to
            <a href="${t.mailToWGPublicListWithSubject}"
              >${e.wgPublicList}@w3.org</a
            >
            (<a href="${t.mailToWGPublicListSubscription}">subscribe</a>,
            <a
              href="${`https://lists.w3.org/Archives/Public/${e.wgPublicList}/`}"
              >archives</a
            >)${e.subjectPrefix?hyperHTML$1`
                  with <code>${e.subjectPrefix}</code> at the start of your
                  email's subject
                `:""}.
          </p>
        `:""}
    ${e.sotdAfterWGinfo?t.additionalContent:""}
    ${t.additionalSections}
  `;const name$m="w3c/headers",W3CDate=new Intl.DateTimeFormat(["en-AU"],{timeZone:"UTC",year:"numeric",month:"long",day:"2-digit"}),status2maturity={LS:"WD",LD:"WD",FPWD:"WD",LC:"WD",FPLC:"WD","FPWD-NOTE":"NOTE","WD-NOTE":"WD","LC-NOTE":"LC","IG-NOTE":"NOTE","WG-NOTE":"NOTE"},status2rdf={NOTE:"w3p:NOTE",WD:"w3p:WD",LC:"w3p:LastCall",CR:"w3p:CR",PR:"w3p:PR",REC:"w3p:REC",PER:"w3p:PER",RSCND:"w3p:RSCND"},status2text={NOTE:"Working Group Note","WG-NOTE":"Working Group Note","CG-NOTE":"Co-ordination Group Note","IG-NOTE":"Interest Group Note","Member-SUBM":"Member Submission","Team-SUBM":"Team Submission",MO:"Member-Only Document",ED:"Editor's Draft",LS:"Living Standard",LD:"Living Document",FPWD:"First Public Working Draft",WD:"Working Draft","FPWD-NOTE":"Working Group Note","WD-NOTE":"Working Draft","LC-NOTE":"Working Draft",FPLC:"First Public and Last Call Working Draft",LC:"Last Call Working Draft",CR:"Candidate Recommendation",PR:"Proposed Recommendation",PER:"Proposed Edited Recommendation",REC:"Recommendation",RSCND:"Rescinded Recommendation",unofficial:"Unofficial Draft",base:"Document",finding:"TAG Finding","draft-finding":"Draft TAG Finding","CG-DRAFT":"Draft Community Group Report","CG-FINAL":"Final Community Group Report","BG-DRAFT":"Draft Business Group Report","BG-FINAL":"Final Business Group Report"},status2long={...status2text,"FPWD-NOTE":"First Public Working Group Note","LC-NOTE":"Last Call Working Draft"},maybeRecTrack=["FPWD","WD"],recTrackStatus=["FPLC","LC","CR","PR","PER","REC"],noTrackStatus=["base","BG-DRAFT","BG-FINAL","CG-DRAFT","CG-FINAL","draft-finding","finding","MO","unofficial"],cgbg=["CG-DRAFT","CG-FINAL","BG-DRAFT","BG-FINAL"],precededByAn=["ED","IG-NOTE"],licenses={cc0:{name:"Creative Commons 0 Public Domain Dedication",short:"CC0",url:"https://creativecommons.org/publicdomain/zero/1.0/"},"w3c-software":{name:"W3C Software Notice and License",short:"W3C Software",url:"https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231"},"w3c-software-doc":{name:"W3C Software and Document Notice and License",short:"W3C Software and Document",url:"https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document"},"cc-by":{name:"Creative Commons Attribution 4.0 International Public License",short:"CC-BY",url:"https://creativecommons.org/licenses/by/4.0/legalcode"}},baseLogo=Object.freeze({id:"",alt:"",href:"",src:"",height:"48",width:"72"});function validateDateAndRecover(e,t,n=new Date){const r=e[t]?new Date(e[t]):new Date(n);if(Number.isFinite(r.valueOf())){const e=ISODate.format(r);return new Date(e)}return pub("error",`[\`${t}\`](https://github.com/w3c/respec/wiki/${t}) `+`is not a valid date: "${e[t]}". Expected format 'YYYY-MM-DD'.`),new Date(ISODate.format(new Date))}function run$a(e){if(e.isUnofficial="unofficial"===e.specStatus,e.isUnofficial&&!Array.isArray(e.logos)&&(e.logos=[]),e.isCCBY="cc-by"===e.license,e.isW3CSoftAndDocLicense="w3c-software-doc"===e.license,["cc-by"].includes(e.license)){let t=`You cannot use license "\`${e.license}\`" with W3C Specs. `;t+='Please set `respecConfig.license: "w3c-software-doc"` instead.',pub("error",t)}if(e.licenseInfo=licenses[e.license],e.isCGBG=cgbg.includes(e.specStatus),e.isCGFinal=e.isCGBG&&e.specStatus.endsWith("G-FINAL"),e.isBasic="base"===e.specStatus,e.isRegular=!e.isCGBG&&!e.isBasic,e.specStatus||pub("error","Missing required configuration: `specStatus`"),e.isRegular&&!e.shortName&&pub("error","Missing required configuration: `shortName`"),e.testSuiteURI){const t=new URL(e.testSuiteURI,location.href),{host:n,pathname:r}=t;if("github.com"===n&&r.startsWith("/w3c/web-platform-tests/")){pub("warn","Web Platform Tests have moved to a new Github Organization at https://github.com/web-platform-tests. Please update your [`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI) to point to the "+`new tests repository (e.g., https://github.com/web-platform-tests/wpt/${e.shortName} ).`)}}if(e.title=document.title||"No Title",document.title&&e.isPreview&&e.prNumber&&(document.title=`Preview of PR #${e.prNumber}: ${document.title}`),e.subtitle||(e.subtitle=""),e.publishDate=validateDateAndRecover(e,"publishDate",document.lastModified),e.publishYear=e.publishDate.getUTCFullYear(),e.publishHumanDate=W3CDate.format(e.publishDate),e.isNoTrack=noTrackStatus.includes(e.specStatus),e.isRecTrack=!e.noRecTrack&&recTrackStatus.concat(maybeRecTrack).includes(e.specStatus),e.isMemberSubmission="Member-SUBM"===e.specStatus,e.isMemberSubmission){const t={alt:"W3C Member Submission",href:"https://www.w3.org/Submission/",src:"https://www.w3.org/Icons/member_subm-v.svg",width:"211"};e.logos.push({...baseLogo,...t})}if(e.isTeamSubmission="Team-SUBM"===e.specStatus,e.isTeamSubmission){const t={alt:"W3C Team Submission",href:"https://www.w3.org/TeamSubmission/",src:"https://www.w3.org/Icons/team_subm-v.svg",width:"211"};e.logos.push({...baseLogo,...t})}e.isSubmission=e.isMemberSubmission||e.isTeamSubmission,e.anOrA=precededByAn.includes(e.specStatus)?"an":"a",e.isTagFinding="finding"===e.specStatus||"draft-finding"===e.specStatus,e.edDraftURI||(e.edDraftURI="","ED"===e.specStatus&&pub("warn","Editor's Drafts should set edDraftURI.")),e.maturity=status2maturity[e.specStatus]?status2maturity[e.specStatus]:e.specStatus;let t="TR";if("Member-SUBM"===e.specStatus?t="Submission":"Team-SUBM"===e.specStatus&&(t="TeamSubmission"),e.isRegular&&(e.thisVersion=`https://www.w3.org/${t}/${e.publishDate.getUTCFullYear()}/${e.maturity}-${e.shortName}-${concatDate(e.publishDate)}/`),"ED"===e.specStatus&&(e.thisVersion=e.edDraftURI),e.isRegular&&(e.latestVersion=`https://www.w3.org/${t}/${e.shortName}/`),e.isTagFinding&&(e.latestVersion=`https://www.w3.org/2001/tag/doc/${e.shortName}`,e.thisVersion=`${e.latestVersion}-${ISODate.format(e.publishDate)}`),e.previousPublishDate){e.previousMaturity||e.isTagFinding||pub("error","`previousPublishDate` is set, but not `previousMaturity`."),e.previousPublishDate=validateDateAndRecover(e,"previousPublishDate");const t=status2maturity[e.previousMaturity]?status2maturity[e.previousMaturity]:e.previousMaturity;e.isTagFinding?e.prevVersion=`${e.latestVersion}-${ISODate.format(e.previousPublishDate)}`:e.isCGBG?e.prevVersion=e.prevVersion||"":e.isBasic?e.prevVersion="":e.prevVersion=`https://www.w3.org/TR/${e.previousPublishDate.getUTCFullYear()}/${t}-${e.shortName}-${concatDate(e.previousPublishDate)}/`}else e.specStatus.endsWith("NOTE")||"FPWD"===e.specStatus||"FPLC"===e.specStatus||"ED"===e.specStatus||e.noRecTrack||e.isNoTrack||e.isSubmission||pub("error","Document on track but no previous version: Add `previousMaturity`, and `previousPublishDate` to ReSpec's config."),e.prevVersion||(e.prevVersion="");e.prevRecShortname&&!e.prevRecURI&&(e.prevRecURI=`https://www.w3.org/TR/${e.prevRecShortname}`);const n=function(e){if(e.name||pub("error","All authors and editors must have a name."),e.orcid)try{e.orcid=normalizeOrcid(e.orcid)}catch(t){pub("error",`"${e.orcid}" is not an ORCID. ${t.message}`),delete e.orcid}};if(e.formerEditors||(e.formerEditors=[]),e.editors){e.editors.forEach(n);for(let t=0;t<e.editors.length;t++){const n=e.editors[t];"retiredDate"in n&&(e.formerEditors.push(n),e.editors.splice(t--,1))}}e.editors&&0!==e.editors.length||pub("error","At least one editor is required"),e.formerEditors.length&&e.formerEditors.forEach(n),e.authors&&e.authors.forEach(n),e.multipleEditors=e.editors&&e.editors.length>1,e.multipleFormerEditors=e.formerEditors.length>1,e.multipleAuthors=e.authors&&e.authors.length>1,(e.alternateFormats||[]).forEach(e=>{e.uri&&e.label||pub("error","All alternate formats must have a uri and a label.")}),e.multipleAlternates=e.alternateFormats&&e.alternateFormats.length>1,e.alternatesHTML=e.alternateFormats&&htmlJoinAnd(e.alternateFormats,e=>{const t=e.hasOwnProperty("lang")&&e.lang?e.lang:null,n=e.hasOwnProperty("type")&&e.type?e.type:null;return hyperHTML$1`<a rel='alternate' href='${e.uri}' hreflang='${t}' type='${n}'>${e.label}</a>`}),e.copyrightStart&&e.copyrightStart==e.publishYear&&(e.copyrightStart=""),e.longStatus=status2long[e.specStatus],e.textStatus=status2text[e.specStatus],status2rdf[e.specStatus]&&(e.rdfStatus=status2rdf[e.specStatus]),e.showThisVersion=!e.isNoTrack||e.isTagFinding,e.showPreviousVersion="FPWD"!==e.specStatus&&"FPLC"!==e.specStatus&&"ED"!==e.specStatus&&!e.isNoTrack&&!e.isSubmission,e.specStatus.endsWith("NOTE")&&!e.prevVersion&&(e.showPreviousVersion=!1),e.isTagFinding&&(e.showPreviousVersion=!!e.previousPublishDate),e.notYetRec=e.isRecTrack&&"REC"!==e.specStatus,e.isRec=e.isRecTrack&&"REC"===e.specStatus,e.isRec&&!e.errata&&pub("error","Recommendations must have an errata link."),e.notRec="REC"!==e.specStatus,e.prependW3C=!e.isUnofficial,e.isED="ED"===e.specStatus,e.isCR="CR"===e.specStatus,e.isPR="PR"===e.specStatus,e.isPER="PER"===e.specStatus,e.isMO="MO"===e.specStatus,e.isNote=["FPWD-NOTE","WG-NOTE"].includes(e.specStatus),e.isIGNote="IG-NOTE"===e.specStatus,e.dashDate=ISODate.format(e.publishDate),e.publishISODate=e.publishDate.toISOString(),e.shortISODate=ISODate.format(e.publishDate),e.hasOwnProperty("wgPatentURI")&&!Array.isArray(e.wgPatentURI)?Object.defineProperty(e,"wgId",{get(){const e=this.wgPatentURI.split("/"),t=e.findIndex(e=>"pp-impl"===e)+1;return e[t]||""}}):e.wgId=e.wgId?e.wgId:"";const r=(e.isCGBG?cgbgHeadersTmpl:headersTmpl)(e);document.body.prepend(r),document.body.classList.add("h-entry");const o=document.getElementById("sotd")||document.createElement("section");!e.isCGBG&&e.isNoTrack&&!e.isTagFinding||o.id||pub("error","A custom SotD paragraph is required for your type of document."),o.id=o.id||"sotd",o.classList.add("introductory");const i=[e.wg,e.wgURI,e.wgPatentURI];if(i.some(e=>Array.isArray(e))&&!i.every(e=>Array.isArray(e))&&pub("error","If one of '`wg`', '`wgURI`', or '`wgPatentURI`' is an array, they all have to be."),e.isCGBG&&!e.wg&&pub("error","[`wg`](https://github.com/w3c/respec/wiki/wg) configuration option is required for this kind of document."),Array.isArray(e.wg)){e.multipleWGs=e.wg.length>1,e.wgHTML=htmlJoinAnd(e.wg,(t,n)=>hyperHTML$1`the <a href='${e.wgURI[n]}'>${t}</a>`);const t=[];for(let n=0,r=e.wg.length;n<r;n++)t.push(hyperHTML$1`a <a href='${e.wgPatentURI[n]}' rel='disclosure'>public list of any patent disclosures (${e.wg[n]})</a>`);e.wgPatentHTML=htmlJoinAnd(t)}else e.multipleWGs=!1,e.wg&&(e.wgHTML=hyperHTML$1`the <a href='${e.wgURI}'>${e.wg}</a>`);"PR"!==e.specStatus||e.crEnd||pub("error",'`specStatus` is "PR" but no `crEnd` is specified (needed to indicate end of previous CR).'),"CR"!==e.specStatus||e.crEnd||pub("error",'`specStatus` is "CR", but no `crEnd` is specified in Respec config.'),e.crEnd=validateDateAndRecover(e,"crEnd"),e.humanCREnd=W3CDate.format(e.crEnd),"PR"!==e.specStatus||e.prEnd||pub("error",'`specStatus` is "PR" but no `prEnd` is specified.'),e.prEnd=validateDateAndRecover(e,"prEnd"),e.humanPREnd=W3CDate.format(e.prEnd),"PER"!==e.specStatus||e.perEnd||pub("error","Status is PER but no perEnd is specified"),e.perEnd=validateDateAndRecover(e,"perEnd"),e.humanPEREnd=W3CDate.format(e.perEnd),e.recNotExpected=!(!e.noRecTrack&&!e.recNotExpected)||!e.isRecTrack&&"WD"==e.maturity&&"FPWD-NOTE"!==e.specStatus,e.noRecTrack&&recTrackStatus.includes(e.specStatus)&&pub("error",`Document configured as [\`noRecTrack\`](https://github.com/w3c/respec/wiki/noRecTrack), but its status ("${e.specStatus}") puts it on the W3C Rec Track. Status cannot be any of: ${recTrackStatus.join(", ")}. [More info](https://github.com/w3c/respec/wiki/noRecTrack).`),e.isIGNote&&!e.charterDisclosureURI&&pub("error","IG-NOTEs must link to charter's disclosure section using `charterDisclosureURI`."),o.classList.contains("override")||hyperHTML$1.bind(o)`${populateSoTD(e,o)}`,!e.implementationReportURI&&e.isCR&&pub("error","CR documents must have an [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI) that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience)."),!e.implementationReportURI&&e.isPR&&pub("warn","PR documents should include an  [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI) that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience)."),pub("amend-user-config",{publishISODate:e.publishISODate,generatedSubtitle:`${e.longStatus} ${e.publishHumanDate}`})}function populateSoTD(e,t){const n={...collectSotdContent(t,e),get mailToWGPublicList(){return`mailto:${e.wgPublicList}@w3.org`},get mailToWGPublicListWithSubject(){const t=e.subjectPrefix?`?subject=${encodeURIComponent(e.subjectPrefix)}`:"";return this.mailToWGPublicList+t},get mailToWGPublicListSubscription(){return`mailto:${e.wgPublicList}-request@w3.org?subject=subscribe`}};return(e.isCGBG?cgbgSotdTmpl:sotdTmpl)(e,n)}function collectSotdContent(e,{isTagFinding:t=!1}){const n=e.cloneNode(!0),r=document.createDocumentFragment();for(;n.hasChildNodes()&&(!isElement(n.firstChild)||"section"!==n.firstChild.localName);)r.appendChild(n.firstChild);return t&&!r.hasChildNodes()&&pub("warn","ReSpec does not support automated SotD generation for TAG findings, please add the prerequisite content in the 'sotd' section"),{additionalContent:r,additionalSections:n.childNodes}}function normalizeOrcid(e){const t=new URL(e,"https://orcid.org/");if("https://orcid.org"!==t.origin)throw new Error(`The origin should be "https://orcid.org", not "${t.origin}".`);const n=t.pathname.slice(1).replace(/\/$/,"");if(!/^\d{4}-\d{4}-\d{4}-\d{3}(\d|X)$/.test(n))throw new Error(`ORCIDs have the format "1234-1234-1234-1234", not "${n}"`);const r=n[n.length-1],o=(12-n.split("").slice(0,-1).filter(e=>/\d/.test(e)).map(Number).reduce((e,t)=>2*(e+t),0)%11)%11;if(r!==(10===o?"X":String(o)))throw new Error(`"${n}" has an invalid checksum.`);return t.href}function isElement(e){return e.nodeType===Node.ELEMENT_NODE}var headers=Object.freeze({__proto__:null,name:name$m,run:run$a});const name$n="w3c/abstract";async function run$b(){const e=document.getElementById("abstract");if(!e)return void pub("error",'Document must have one element with `id="abstract"');e.classList.add("introductory");let t=document.querySelector("#abstract>h2");t||(t=document.createElement("h2"),t.textContent=l10n[lang].abstract,e.prepend(t))}var abstract=Object.freeze({__proto__:null,name:name$n,run:run$b});const name$o="core/data-transform";function run$c(){document.querySelectorAll("[data-transform]").forEach(e=>{e.innerHTML=runTransforms(e.innerHTML,e.dataset.transform),e.removeAttribute("data-transform")})}var dataTransform=Object.freeze({__proto__:null,name:name$o,run:run$c});const name$p="core/dfn-abbr";function run$d(){const e=document.querySelectorAll("[data-abbr]");for(const t of e){const{localName:e}=t;switch(e){case"dfn":processDfnElement(t);break;default:showInlineWarning(t,"[`data-abbr`](https://github.com/w3c/respec/wiki/data-abbr)"+` attribute not supported on \`${e}\` elements.`,"Error: unsupported.")}}}function processDfnElement(e){const t=generateAbbreviation(e),n=e.textContent.replace(/\s\s+/g," ").trim();e.insertAdjacentHTML("afterend",` (<abbr title="${n}">${t}</abbr>)`);const r=e.dataset.lt||"";e.dataset.lt=r.split("|").filter(e=>e.trim()).concat(t).join("|")}function generateAbbreviation(e){return e.dataset.abbr?e.dataset.abbr:e.textContent.match(/\b([a-z])/gi).join("").toUpperCase()}var dataAbbr=Object.freeze({__proto__:null,name:name$p,run:run$d});const idlPrimitiveRegex=/^[a-z]+(\s+[a-z]+)+$/,exceptionRegex=/\B"([^"]*)"\B/,methodRegex=/(\w+)\((.*)\)$/,slotRegex=/^\[\[(\w+)\]\]$/,attributeRegex=/^((?:\[\[)?(?:\w+)(?:\]\])?)$/,enumRegex=/^(\w+)\["([\w- ]*)"\]$/,methodSplitRegex=/\.?(\w+\(.*\)$)/;function parseInlineIDL(e){const[t,n]=e.split(methodSplitRegex),r=t.split(/[./]/).concat(n).filter(e=>e&&e.trim()).map(e=>e.trim()),o=!e.includes("/"),i=[];for(;r.length;){const t=r.pop();if(methodRegex.test(t)){const[,e,n]=t.match(methodRegex),r=n.split(/,\s*/).filter(e=>e);i.push({type:"method",identifier:e,args:r,renderParent:o})}else if(enumRegex.test(t)){const[,e,n]=t.match(enumRegex);i.push({type:"enum",identifier:e,enumValue:n,renderParent:o})}else if(exceptionRegex.test(t)){const[,e]=t.match(exceptionRegex);o?i.push({type:"exception",identifier:e}):i.push({type:"enum",enumValue:e,renderParent:o})}else if(slotRegex.test(t)){const[,e]=t.match(slotRegex);i.push({type:"internal-slot",identifier:e,renderParent:o})}else if(attributeRegex.test(t)&&r.length){const[,e]=t.match(attributeRegex);i.push({type:"attribute",identifier:e,renderParent:o})}else if(idlPrimitiveRegex.test(t))i.push({type:"idl-primitive",identifier:t,renderParent:o});else{if(!attributeRegex.test(t)||0!==r.length)throw new SyntaxError(`IDL micro-syntax parsing error in \`{{ ${e} }}\``);i.push({type:"base",identifier:t,renderParent:o})}}return i.forEach((e,t,n)=>{e.parent=n[t+1]||null}),i.reverse()}function renderBase(e){const{identifier:t,renderParent:n}=e;if(n)return hyperHTML$1`<a data-xref-type="_IDL_"><code>${t}</code></a>`}function renderInternalSlot(e){const{identifier:t,parent:n,renderParent:r}=e,{identifier:o}=n||{};return hyperHTML$1`${n&&r?".":""}<a
    data-xref-type="attribute"
    data-link-for=${o}
    data-xref-for=${o}
    data-lt="${`[[${t}]]`}"><code>[[${t}]]</code></a>`}function renderAttribute(e){const{parent:t,identifier:n,renderParent:r}=e,{identifier:o}=t||{};return hyperHTML$1`${r?".":""}<a
      data-xref-type="attribute|dict-member"
      data-link-for="${o}"
      data-xref-for="${o}"
    ><code>${n}</code></a>`}function renderMethod(e){const{args:t,identifier:n,type:r,parent:o,renderParent:i}=e,{identifier:s}=o||{},a=t.map(e=>`<var>${e}</var>`).join(", "),c=`${n}(${t.join(", ")})`;return hyperHTML$1`${o&&i?".":""}<a
    data-xref-type="${r}"
    data-link-for="${s}"
    data-xref-for="${s}"
    data-lt="${c}"
    ><code>${n}</code></a><code>(${[a]})</code>`}function renderEnum(e){const{identifier:t,enumValue:n,parent:r}=e,o=r?r.identifier:t;return hyperHTML$1`"<a
    data-xref-type="enum-value"
    data-link-for="${o}"
    data-xref-for="${o}"
    data-lt="${n?null:"the-empty-string"}"
    ><code>${n}</code></a>"`}function renderException(e){const{identifier:t}=e;return hyperHTML$1`"<a
    data-cite="WebIDL"
    data-xref-type="exception"
    ><code>${t}</code></a>"`}function renderIdlPrimitiveType(e){const{identifier:t}=e;return hyperHTML$1`<a
    data-cite="WebIDL"
    data-xref-type="interface"
    ><code>${t}</code></a>`}function idlStringToHtml(e){let t;try{t=parseInlineIDL(e)}catch(t){const n=hyperHTML$1`<span>{{ ${e} }}</span>`;return showInlineError(n,t.message,"Error: Invalid inline IDL string"),n}const n=hyperHTML$1(document.createDocumentFragment()),r=[];for(const e of t)switch(e.type){case"base":{const t=renderBase(e);t&&r.push(t);break}case"attribute":r.push(renderAttribute(e));break;case"internal-slot":r.push(renderInternalSlot(e));break;case"method":r.push(renderMethod(e));break;case"enum":r.push(renderEnum(e));break;case"exception":r.push(renderException(e));break;case"idl-primitive":r.push(renderIdlPrimitiveType(e));break;default:throw new Error("Unknown type.")}return n`${r}`}const ALLOWED_TYPES=new Set(["alias","reference"]),readyPromise=openIdb();async function openIdb(){return await idb.openDB("respec-biblio2",12,{upgrade(e){Array.from(e.objectStoreNames).map(t=>e.deleteObjectStore(t)),e.createObjectStore("alias",{keyPath:"id"}).createIndex("aliasOf","aliasOf",{unique:!1}),e.createObjectStore("reference",{keyPath:"id"})}})}const biblioDB={get ready(){return readyPromise},async find(e){return await this.isAlias(e)&&(e=await this.resolveAlias(e)),await this.get("reference",e)},async has(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if(!t)throw new TypeError("id is required");const n=(await this.ready).transaction(e,"readonly").store,r=IDBKeyRange.only(t);return!!await n.openCursor(r)},async isAlias(e){return await this.has("alias",e)},async resolveAlias(e){if(!e)throw new TypeError("id is required");const t=(await this.ready).transaction("alias","readonly").store,n=IDBKeyRange.only(e),r=await t.openCursor(n);return r?r.value.aliasOf:r},async get(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if(!t)throw new TypeError("id is required");const n=(await this.ready).transaction(e,"readonly").store,r=IDBKeyRange.only(t),o=await n.openCursor(r);return o?o.value:o},async addAll(e){if(!e)return;const t={alias:new Set,reference:new Set};Object.keys(e).filter(t=>{if("string"==typeof e[t]){let e=`Legacy SpecRef entries are not supported: \`[[${t}]]\`. `;return e+="Please update it to the new format at [specref repo](https://github.com/tobie/specref/)",pub("error",e),!1}return!0}).map(t=>Object.assign({id:t},e[t])).forEach(e=>{e.aliasOf?t.alias.add(e):t.reference.add(e)});const n=[...ALLOWED_TYPES].map(e=>Array.from(t[e]).map(t=>this.add(e,t))).reduce(flatten$1,[]);await Promise.all(n)},async add(e,t){if(!ALLOWED_TYPES.has(e))throw new TypeError(`Invalid type: ${e}`);if("object"!=typeof t)throw new TypeError("details should be an object");if("alias"===e&&!t.hasOwnProperty("aliasOf"))throw new TypeError("Invalid alias object.");const n=await this.ready,r=await this.has(e,t.id),o=n.transaction(e,"readwrite").store;return r?await o.put(t):await o.add(t)},async close(){(await this.ready).close()},async clear(){const e=await this.ready,t=[...ALLOWED_TYPES],n=e.transaction(t,"readwrite"),r=t.map(e=>n.objectStore(e).clear());await Promise.all(r)}},biblio={},name$q="core/biblio",bibrefsURL=new URL("https://specref.herokuapp.com/bibrefs?refs=");function normalizeReferences(e){const t=new Set([...e.normativeReferences].map(e=>e.toLowerCase()));Array.from(e.informativeReferences).filter(e=>t.has(e.toLowerCase())).forEach(t=>e.informativeReferences.delete(t))}function getRefKeys(e){return{informativeReferences:Array.from(e.informativeReferences),normativeReferences:Array.from(e.normativeReferences)}}const link=createResourceHint({hint:"dns-prefetch",href:bibrefsURL.origin});let doneResolver$2;document.head.appendChild(link);const done$2=new Promise(e=>{doneResolver$2=e});async function updateFromNetwork(e,t={forceUpdate:!1}){const n=[...new Set(e)].filter(e=>e.trim());if(!n.length||!1===navigator.onLine)return null;let r;try{r=await fetch(bibrefsURL.href+n.join(","))}catch(e){return console.error(e),null}if(!t.forceUpdate&&!r.ok||200!==r.status)return null;const o=await r.json();try{await biblioDB.addAll(o)}catch(e){console.error(e)}return o}async function resolveRef(e){const t=await done$2;if(!t.hasOwnProperty(e))return null;const n=t[e];return n.aliasOf?await resolveRef(n.aliasOf):n}async function run$e(e){if(e.localBiblio||(e.localBiblio={}),e.biblio){let e="Overriding `.biblio` in config. Please use ";e+="`.localBiblio` for custom biblio entries.",pub("warn",e)}e.biblio=biblio;const t=Object.keys(e.localBiblio).filter(t=>e.localBiblio[t].hasOwnProperty("aliasOf")).map(t=>e.localBiblio[t].aliasOf).filter(t=>!e.localBiblio.hasOwnProperty(t));normalizeReferences(e);const n=getRefKeys(e),r=n.normativeReferences.concat(n.informativeReferences).filter(t=>!e.localBiblio.hasOwnProperty(t)).concat(t).reduce((e,t)=>(-1===e.indexOf(t)&&e.push(t),e),[]).sort(),o=[];try{await biblioDB.ready;const e=r.map(async e=>({id:e,data:await biblioDB.find(e)}));o.push(...await Promise.all(e))}catch(e){o.push(...r.map(e=>({id:e,data:null}))),console.warn(e)}const i={hasData:[],noData:[]};o.forEach(e=>{(e.data?i.hasData:i.noData).push(e)}),i.hasData.forEach(e=>{biblio[e.id]=e.data});const s=i.noData.map(e=>e.id);if(s.length){const e=await updateFromNetwork(s,{forceUpdate:!0});Object.assign(biblio,e)}Object.assign(biblio,e.localBiblio),doneResolver$2(e.biblio)}var biblio$1=Object.freeze({__proto__:null,biblio:biblio,name:name$q,updateFromNetwork:updateFromNetwork,resolveRef:resolveRef,run:run$e,wireReference:wireReference,stringifyReference:stringifyReference});const name$r="core/render-biblio",localizationStrings$4={en:{info_references:"Informative references",norm_references:"Normative references",references:"References"},nl:{info_references:"Informatieve referenties",norm_references:"Normatieve referenties",references:"Referenties"},es:{info_references:"Referencias informativas",norm_references:"Referencias normativas",references:"Referencias"}},l10n$6=getIntlData(localizationStrings$4),REF_STATUSES=new Map([["CR","W3C Candidate Recommendation"],["ED","W3C Editor's Draft"],["FPWD","W3C First Public Working Draft"],["LCWD","W3C Last Call Working Draft"],["NOTE","W3C Note"],["PER","W3C Proposed Edited Recommendation"],["PR","W3C Proposed Recommendation"],["REC","W3C Recommendation"],["WD","W3C Working Draft"],["WG-NOTE","W3C Working Group Note"]]),defaultsReference=Object.freeze({authors:[],date:"",href:"",publisher:"",status:"",title:"",etAl:!1}),endWithDot=endNormalizer(".");function run$f(e){const t=Array.from(e.informativeReferences),n=Array.from(e.normativeReferences);if(!t.length&&!n.length)return;const r=document.querySelector("section#references")||hyperHTML$1`<section id='references'></section>`;document.querySelector("section#references > h2")||r.prepend(hyperHTML$1`<h2>${l10n$6.references}</h2>`),r.classList.add("appendix");for(const e of["Normative","Informative"]){const o="Normative"===e?n:t;if(!o.length)continue;const i=hyperHTML$1`
      <section>
        <h3>${"Normative"===e?l10n$6.norm_references:l10n$6.info_references}</h3>
      </section>`;addId(i);const{goodRefs:s,badRefs:a}=o.map(toRefContent).reduce((e,t)=>{return e[t.refcontent?"goodRefs":"badRefs"].push(t),e},{goodRefs:[],badRefs:[]}),c=[...s.reduce((e,t)=>(e.has(t.refcontent.id)||e.set(t.refcontent.id,t),e),new Map).values()],l=c.concat(a).sort((e,t)=>e.ref.toLocaleLowerCase().localeCompare(t.ref.toLocaleLowerCase()));i.appendChild(hyperHTML$1`
      <dl class='bibliography'>
        ${l.map(showRef)}
      </dl>`),r.appendChild(i),decorateInlineReference(c,getAliases(s)),warnBadRefs(a)}document.body.appendChild(r)}function toRefContent(e){let t=biblio[e],n=e;const r=new Set([n]);for(;t&&t.aliasOf;)if(r.has(t.aliasOf)){t=null,pub("error",`Circular reference in biblio DB between [\`${e}\`] and [\`${n}\`].`)}else n=t.aliasOf,t=biblio[n],r.add(n);return t&&!t.id&&(t.id=e.toLowerCase()),{ref:e,refcontent:t}}function renderInlineCitation(e){const t=e.replace(/^(!|\?)/,""),n=`#bib-${t.toLowerCase()}`;return hyperHTML$1`[<cite><a class="bibref" href="${n}" data-link-type="biblio">${t}</a></cite>]`}function showRef({ref:e,refcontent:t}){const n=`bib-${e.toLowerCase()}`;return t?hyperHTML$1`
      <dt id="${n}">[${e}]</dt>
      <dd>${{html:stringifyReference(t)}}</dd>
    `:hyperHTML$1`
      <dt id="${n}">[${e}]</dt>
      <dd><em class="respec-offending-element">Reference not found.</em></dd>
    `}function endNormalizer(e){return t=>{const n=t.trim();return!n||n.endsWith(e)?n:n+e}}function wireReference(e,t="_blank"){if("object"!=typeof e)throw new TypeError("Only modern object references are allowed");const n=Object.assign({},defaultsReference,e),r=n.authors.join("; ")+(n.etAl?" et al":""),o=REF_STATUSES.get(n.status)||n.status;return hyperHTML$1.wire(n)`
    <cite>
      <a
        href="${n.href}"
        target="${t}"
        rel="noopener noreferrer">
        ${n.title.trim()}</a>.
    </cite>
    <span class="authors">
      ${endWithDot(r)}
    </span>
    <span class="publisher">
      ${endWithDot(n.publisher)}
    </span>
    <span class="pubDate">
      ${endWithDot(n.date)}
    </span>
    <span class="pubStatus">
      ${endWithDot(o)}
    </span>
  `}function stringifyReference(e){if("string"==typeof e)return e;let t=`<cite>${e.title}</cite>`;return t=e.href?`<a href="${e.href}">${t}</a>. `:`${t}. `,e.authors&&e.authors.length&&(t+=e.authors.join("; "),e.etAl&&(t+=" et al"),t+=". "),e.publisher&&(t=`${t} ${endWithDot(e.publisher)} `),e.date&&(t+=`${e.date}. `),e.status&&(t+=`${REF_STATUSES.get(e.status)||e.status}. `),e.href&&(t+=`URL: <a href="${e.href}">${e.href}</a>`),t}function getAliases(e){return e.reduce((e,t)=>{const n=t.refcontent.id;return(e.has(n)?e.get(n):e.set(n,[]).get(n)).push(t.ref),e},new Map)}function decorateInlineReference(e,t){e.map(({ref:e,refcontent:n})=>{const r=`#bib-${e.toLowerCase()}`,o=t.get(n.id).map(e=>`a.bibref[href="#bib-${e.toLowerCase()}"]`).join(",");return{refUrl:r,elems:document.querySelectorAll(o),refcontent:n}}).forEach(({refUrl:e,elems:t,refcontent:n})=>{t.forEach(t=>{t.setAttribute("href",e),t.setAttribute("title",n.title),t.dataset.linkType="biblio"})})}function warnBadRefs(e){e.forEach(({ref:e})=>{const t=[...document.querySelectorAll(`a.bibref[href="#bib-${e.toLowerCase()}"]`)].filter(({textContent:t})=>t.toLowerCase()===e.toLowerCase());pub("error",`Bad reference: [\`${e}\`] (appears ${t.length} times)`),console.warn("Bad references: ",t)})}var renderBiblio=Object.freeze({__proto__:null,name:name$r,run:run$f,renderInlineCitation:renderInlineCitation,wireReference:wireReference,stringifyReference:stringifyReference});const name$s="core/inlines",rfc2119Usage={},inlineCodeRegExp=/(?:`[^`]+`)(?!`)/,inlineIdlReference=/(?:{{[^}]+}})/,inlineVariable=/\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/,inlineCitation=/(?:\[\[(?:!|\\|\?)?[A-Za-z0-9.-]+\]\])/,inlineExpansion=/(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/,inlineAnchor=/(?:\[=[^=]+=\])/,inlineElement=/(?:\[\^[A-Za-z]+(?:-[A-Za-z]+)?\^\])/;function inlineElementMatches(e){const t=e.slice(2,-2).trim();return hyperHTML$1`<code><a data-xref-type="element">${t}</a></code>`}function inlineRFC2119Matches(e){const t=norm(e),n=hyperHTML$1`<em class="rfc2119" title="${t}">${t}</em>`;return rfc2119Usage[t]=!0,n}function inlineRefMatches(e){const t=e.slice(3,-3).trim();if(!t.startsWith("#"))return hyperHTML$1`<a data-cite="${t}"></a>`;if(document.querySelector(t))return hyperHTML$1`<a href="${t}"></a>`;const n=hyperHTML$1`<span>${e}</span>`;return showInlineError(n,`Wasn't able to expand ${e} as it didn't match any id in the document.`,`Please make sure there is element with id ${t} in the document.`),n}function inlineXrefMatches(e){const t=e.slice(2,-2).trim();return t.startsWith("\\")?e.replace("\\",""):idlStringToHtml(norm(t))}function inlineBibrefMatches(e,t,n){const r=e.slice(2,-2);if(r.startsWith("\\"))return[`[[${r.slice(1)}]]`];const{type:o,illegal:i}=refTypeFromContext(r,t.parentNode),s=renderInlineCitation(r),a=r.replace(/^(!|\?)/,"");return i&&!n.normativeReferences.has(a)&&showInlineWarning(s.childNodes[1],"Normative references in informative sections are not allowed. "+`Remove '!' from the start of the reference \`[[${r}]]\``),"informative"!==o||i?n.normativeReferences.add(a):n.informativeReferences.add(a),s.childNodes}function inlineAbbrMatches(e,t,n){return"ABBR"===t.parentElement.tagName?e:hyperHTML$1`<abbr title="${n.get(e)}">${e}</abbr>`}function inlineVariableMatches(e){const t=e.slice(1,-1).split(":",2),[n,r]=t.map(e=>e.trim());return hyperHTML$1`<var data-type="${r}">${n}</var>`}function inlineAnchorMatches(e){const t=(e=e.slice(2,-2)).split("/",2).map(e=>e.trim()),[n,r]=2===t.length?t:[null,t[0]],[o,i]=r.includes("|")?r.split("|",2).map(e=>e.trim()):[null,r],s=processInlineContent(i),a=n?norm(n):null;return hyperHTML$1`<a data-link-for="${a}" data-xref-for="${a}" data-lt="${o}">${s}</a>`}function inlineCodeMatches(e){const t=e.slice(1,-1);return hyperHTML$1`<code>${t}</code>`}function processInlineContent(e){return inlineCodeRegExp.test(e)?e.split(/(`[^`]+`)(?!`)/).map(e=>e.startsWith("`")?inlineCodeMatches(e):processInlineContent(e)):document.createTextNode(e)}function run$g(e){const t=new Map;document.normalize(),document.querySelector("section#conformance")||document.body.classList.add("informative"),e.normativeReferences=new InsensitiveStringSet,e.informativeReferences=new InsensitiveStringSet,e.respecRFC2119||(e.respecRFC2119=rfc2119Usage);const n=document.querySelectorAll("abbr[title]");for(const e of n)t.set(e.textContent,e.title);const r=[...t.keys()],o=r.length?`(?:\\b${r.join("\\b)|(?:\\b")}\\b)`:null,i=getTextNodes(document.body,["#respec-ui",".head","pre"],{wsNodes:!1}),s=new RegExp(["\\bMUST(?:\\s+NOT)?\\b","\\bSHOULD(?:\\s+NOT)?\\b","\\bSHALL(?:\\s+NOT)?\\b","\\bMAY\\b","\\b(?:NOT\\s+)?REQUIRED\\b","\\b(?:NOT\\s+)?RECOMMENDED\\b","\\bOPTIONAL\\b"].join("|")),a=new RegExp(`(${[s.source,inlineIdlReference.source,inlineVariable.source,inlineCitation.source,inlineExpansion.source,inlineAnchor.source,inlineCodeRegExp.source,inlineElement.source,...o?[o]:[]].join("|")})`);for(const n of i){const r=n.data.split(a);if(1===r.length)continue;const o=document.createDocumentFragment();let i=!0;for(const a of r)if(i=!i,i)if(a.startsWith("{{")){const e=inlineXrefMatches(a);o.append(e)}else if(a.startsWith("[[[")){const e=inlineRefMatches(a);o.append(e)}else if(a.startsWith("[[")){const t=inlineBibrefMatches(a,n,e);o.append(...t)}else if(a.startsWith("|")){const e=inlineVariableMatches(a);o.append(e)}else if(a.startsWith("[=")){const e=inlineAnchorMatches(a);o.append(e)}else if(a.startsWith("`")){const e=inlineCodeMatches(a);o.append(e)}else if(a.startsWith("[^")){const e=inlineElementMatches(a);o.append(e)}else if(t.has(a)){const e=inlineAbbrMatches(a,n,t);o.append(e)}else{if(!s.test(a))throw new Error(`Found token '${a}' but it does not correspond to anything`);{const e=inlineRFC2119Matches(a);o.append(e)}}else o.append(a);n.replaceWith(o)}}var inlines=Object.freeze({__proto__:null,name:name$s,rfc2119Usage:rfc2119Usage,run:run$g});const name$t="w3c/conformance";function processConformance(e,t){const n=[...Object.keys(rfc2119Usage)];n.length&&(t.normativeReferences.add("RFC2119"),t.normativeReferences.add("RFC8174"));const r=htmlJoinAnd(n.sort(),e=>hyperHTML$1`
        <em class="rfc2119">${e}</em>
      `),o=n.length>1,i=hyperHTML$1`
=======
  `;
}

function linkToWorkingGroup(conf) {
  if (!conf.wg) {
    return;
  }
  return hyperHTML$1`
    <p>
      This document was published by ${[conf.wgHTML]} as ${conf.anOrA}
      ${conf.longStatus}.
      ${conf.notYetRec
        ? "This document is intended to become a W3C Recommendation."
        : ""}
    </p>
  `;
}

function linkToCommunity(conf, opts) {
  if (!conf.github && !conf.wgPublicList) {
    return;
  }
  return hyperHTML$1`
    <p>
      ${conf.github
        ? hyperHTML$1`
            <a href="${conf.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `
        : ""}
      ${conf.wgPublicList
        ? hyperHTML$1`
            ${conf.github && conf.wgPublicList
              ? "Alternatively, you can send comments to our mailing list."
              : "Comments regarding this document are welcome."}
            Please send them to
            <a href="${opts.mailToWGPublicListWithSubject}"
              >${conf.wgPublicList}@w3.org</a
            >
            (<a
              href="${`https://lists.w3.org/Archives/Public/${conf.wgPublicList}/`}"
              >archives</a
            >)${conf.subjectPrefix
              ? hyperHTML$1`
                  with <code>${conf.subjectPrefix}</code> at the start of your
                  email's subject
                `
              : ""}.
          `
        : ""}
    </p>
  `;
}

// @ts-check

const name$l = "w3c/headers";

const W3CDate = new Intl.DateTimeFormat(["en-AU"], {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const status2maturity = {
  LS: "WD",
  LD: "WD",
  FPWD: "WD",
  LC: "WD",
  FPLC: "WD",
  "FPWD-NOTE": "NOTE",
  "WD-NOTE": "WD",
  "LC-NOTE": "LC",
  "IG-NOTE": "NOTE",
  "WG-NOTE": "NOTE",
};

const status2rdf = {
  NOTE: "w3p:NOTE",
  WD: "w3p:WD",
  LC: "w3p:LastCall",
  CR: "w3p:CR",
  PR: "w3p:PR",
  REC: "w3p:REC",
  PER: "w3p:PER",
  RSCND: "w3p:RSCND",
};
const status2text = {
  NOTE: "Working Group Note",
  "WG-NOTE": "Working Group Note",
  "CG-NOTE": "Co-ordination Group Note",
  "IG-NOTE": "Interest Group Note",
  "Member-SUBM": "Member Submission",
  "Team-SUBM": "Team Submission",
  MO: "Member-Only Document",
  ED: "Editor's Draft",
  LS: "Living Standard",
  LD: "Living Document",
  FPWD: "First Public Working Draft",
  WD: "Working Draft",
  "FPWD-NOTE": "Working Group Note",
  "WD-NOTE": "Working Draft",
  "LC-NOTE": "Working Draft",
  FPLC: "First Public and Last Call Working Draft",
  LC: "Last Call Working Draft",
  CR: "Candidate Recommendation",
  PR: "Proposed Recommendation",
  PER: "Proposed Edited Recommendation",
  REC: "Recommendation",
  RSCND: "Rescinded Recommendation",
  unofficial: "Unofficial Draft",
  base: "Document",
  finding: "TAG Finding",
  "draft-finding": "Draft TAG Finding",
  "CG-DRAFT": "Draft Community Group Report",
  "CG-FINAL": "Final Community Group Report",
  "BG-DRAFT": "Draft Business Group Report",
  "BG-FINAL": "Final Business Group Report",
};
const status2long = {
  ...status2text,
  "FPWD-NOTE": "First Public Working Group Note",
  "LC-NOTE": "Last Call Working Draft",
};
const maybeRecTrack = ["FPWD", "WD"];
const recTrackStatus = ["FPLC", "LC", "CR", "PR", "PER", "REC"];
const noTrackStatus = [
  "base",
  "BG-DRAFT",
  "BG-FINAL",
  "CG-DRAFT",
  "CG-FINAL",
  "draft-finding",
  "finding",
  "MO",
  "unofficial",
];
const cgbg = ["CG-DRAFT", "CG-FINAL", "BG-DRAFT", "BG-FINAL"];
const precededByAn = ["ED", "IG-NOTE"];
const licenses = {
  cc0: {
    name: "Creative Commons 0 Public Domain Dedication",
    short: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "w3c-software": {
    name: "W3C Software Notice and License",
    short: "W3C Software",
    url: "https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231",
  },
  "w3c-software-doc": {
    name: "W3C Software and Document Notice and License",
    short: "W3C Software and Document",
    url:
      "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document",
  },
  "cc-by": {
    name: "Creative Commons Attribution 4.0 International Public License",
    short: "CC-BY",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode",
  },
};

const baseLogo = Object.freeze({
  id: "",
  alt: "",
  href: "",
  src: "",
  height: "48",
  width: "72",
});

/**
 * @param {*} conf
 * @param {string} prop
 * @param {string | number | Date} fallbackDate
 */
function validateDateAndRecover(conf, prop, fallbackDate = new Date()) {
  const date = conf[prop] ? new Date(conf[prop]) : new Date(fallbackDate);
  // if date is valid
  if (Number.isFinite(date.valueOf())) {
    const formattedDate = ISODate.format(date);
    return new Date(formattedDate);
  }
  const msg =
    `[\`${prop}\`](https://github.com/w3c/respec/wiki/${prop}) ` +
    `is not a valid date: "${conf[prop]}". Expected format 'YYYY-MM-DD'.`;
  pub("error", msg);
  return new Date(ISODate.format(new Date()));
}

function run$a(conf) {
  conf.isUnofficial = conf.specStatus === "unofficial";
  if (conf.isUnofficial && !Array.isArray(conf.logos)) {
    conf.logos = [];
  }
  conf.isCCBY = conf.license === "cc-by";
  conf.isW3CSoftAndDocLicense = conf.license === "w3c-software-doc";
  if (["cc-by"].includes(conf.license)) {
    let msg = `You cannot use license "\`${conf.license}\`" with W3C Specs. `;
    msg += `Please set \`respecConfig.license: "w3c-software-doc"\` instead.`;
    pub("error", msg);
  }
  conf.licenseInfo = licenses[conf.license];
  conf.isCGBG = cgbg.includes(conf.specStatus);
  conf.isCGFinal = conf.isCGBG && conf.specStatus.endsWith("G-FINAL");
  conf.isBasic = conf.specStatus === "base";
  conf.isRegular = !conf.isCGBG && !conf.isBasic;
  if (!conf.specStatus) {
    pub("error", "Missing required configuration: `specStatus`");
  }
  if (conf.isRegular && !conf.shortName) {
    pub("error", "Missing required configuration: `shortName`");
  }
  if (conf.testSuiteURI) {
    const url = new URL(conf.testSuiteURI, location.href);
    const { host, pathname } = url;
    if (
      host === "github.com" &&
      pathname.startsWith("/w3c/web-platform-tests/")
    ) {
      const msg =
        "Web Platform Tests have moved to a new Github Organization at https://github.com/web-platform-tests. " +
        "Please update your [`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI) to point to the " +
        `new tests repository (e.g., https://github.com/web-platform-tests/wpt/${conf.shortName} ).`;
      pub("warn", msg);
    }
  }
  conf.title = document.title || "No Title";
  if (document.title && conf.isPreview && conf.prNumber) {
    document.title = `Preview of PR #${conf.prNumber}: ${document.title}`;
  }
  if (!conf.subtitle) conf.subtitle = "";
  conf.publishDate = validateDateAndRecover(
    conf,
    "publishDate",
    document.lastModified
  );
  conf.publishYear = conf.publishDate.getUTCFullYear();
  conf.publishHumanDate = W3CDate.format(conf.publishDate);
  conf.isNoTrack = noTrackStatus.includes(conf.specStatus);
  conf.isRecTrack = conf.noRecTrack
    ? false
    : recTrackStatus.concat(maybeRecTrack).includes(conf.specStatus);
  conf.isMemberSubmission = conf.specStatus === "Member-SUBM";
  if (conf.isMemberSubmission) {
    const memSubmissionLogo = {
      alt: "W3C Member Submission",
      href: "https://www.w3.org/Submission/",
      src: "https://www.w3.org/Icons/member_subm-v.svg",
      width: "211",
    };
    conf.logos.push({ ...baseLogo, ...memSubmissionLogo });
  }
  conf.isTeamSubmission = conf.specStatus === "Team-SUBM";
  if (conf.isTeamSubmission) {
    const teamSubmissionLogo = {
      alt: "W3C Team Submission",
      href: "https://www.w3.org/TeamSubmission/",
      src: "https://www.w3.org/Icons/team_subm-v.svg",
      width: "211",
    };
    conf.logos.push({ ...baseLogo, ...teamSubmissionLogo });
  }
  conf.isSubmission = conf.isMemberSubmission || conf.isTeamSubmission;
  conf.anOrA = precededByAn.includes(conf.specStatus) ? "an" : "a";
  conf.isTagFinding =
    conf.specStatus === "finding" || conf.specStatus === "draft-finding";
  if (!conf.edDraftURI) {
    conf.edDraftURI = "";
    if (conf.specStatus === "ED")
      pub("warn", "Editor's Drafts should set edDraftURI.");
  }
  conf.maturity = status2maturity[conf.specStatus]
    ? status2maturity[conf.specStatus]
    : conf.specStatus;
  let publishSpace = "TR";
  if (conf.specStatus === "Member-SUBM") publishSpace = "Submission";
  else if (conf.specStatus === "Team-SUBM") publishSpace = "TeamSubmission";
  if (conf.isRegular)
    conf.thisVersion = `https://www.w3.org/${publishSpace}/${conf.publishDate.getUTCFullYear()}/${
      conf.maturity
    }-${conf.shortName}-${concatDate(conf.publishDate)}/`;
  if (conf.specStatus === "ED") conf.thisVersion = conf.edDraftURI;
  if (conf.isRegular)
    conf.latestVersion = `https://www.w3.org/${publishSpace}/${conf.shortName}/`;
  if (conf.isTagFinding) {
    conf.latestVersion = `https://www.w3.org/2001/tag/doc/${conf.shortName}`;
    conf.thisVersion = `${conf.latestVersion}-${ISODate.format(
      conf.publishDate
    )}`;
  }
  if (conf.previousPublishDate) {
    if (!conf.previousMaturity && !conf.isTagFinding) {
      pub("error", "`previousPublishDate` is set, but not `previousMaturity`.");
    }

    conf.previousPublishDate = validateDateAndRecover(
      conf,
      "previousPublishDate"
    );

    const pmat = status2maturity[conf.previousMaturity]
      ? status2maturity[conf.previousMaturity]
      : conf.previousMaturity;
    if (conf.isTagFinding) {
      conf.prevVersion = `${conf.latestVersion}-${ISODate.format(
        conf.previousPublishDate
      )}`;
    } else if (conf.isCGBG) {
      conf.prevVersion = conf.prevVersion || "";
    } else if (conf.isBasic) {
      conf.prevVersion = "";
    } else {
      conf.prevVersion = `https://www.w3.org/TR/${conf.previousPublishDate.getUTCFullYear()}/${pmat}-${
        conf.shortName
      }-${concatDate(conf.previousPublishDate)}/`;
    }
  } else {
    if (
      !conf.specStatus.endsWith("NOTE") &&
      conf.specStatus !== "FPWD" &&
      conf.specStatus !== "FPLC" &&
      conf.specStatus !== "ED" &&
      !conf.noRecTrack &&
      !conf.isNoTrack &&
      !conf.isSubmission
    )
      pub(
        "error",
        "Document on track but no previous version:" +
          " Add `previousMaturity`, and `previousPublishDate` to ReSpec's config."
      );
    if (!conf.prevVersion) conf.prevVersion = "";
  }
  if (conf.prevRecShortname && !conf.prevRecURI)
    conf.prevRecURI = `https://www.w3.org/TR/${conf.prevRecShortname}`;
  const peopCheck = function(it) {
    if (!it.name) pub("error", "All authors and editors must have a name.");
    if (it.orcid) {
      try {
        it.orcid = normalizeOrcid(it.orcid);
      } catch (e) {
        pub("error", `"${it.orcid}" is not an ORCID. ${e.message}`);
        // A failed orcid link could link to something outside of orcid,
        // which would be misleading.
        delete it.orcid;
      }
    }
  };
  if (!conf.formerEditors) conf.formerEditors = [];
  if (conf.editors) {
    conf.editors.forEach(peopCheck);
    // Move any editors with retiredDate to formerEditors.
    for (let i = 0; i < conf.editors.length; i++) {
      const editor = conf.editors[i];
      if ("retiredDate" in editor) {
        conf.formerEditors.push(editor);
        conf.editors.splice(i--, 1);
      }
    }
  }
  if (!conf.editors || conf.editors.length === 0)
    pub("error", "At least one editor is required");
  if (conf.formerEditors.length) {
    conf.formerEditors.forEach(peopCheck);
  }
  if (conf.authors) {
    conf.authors.forEach(peopCheck);
  }
  conf.multipleEditors = conf.editors && conf.editors.length > 1;
  conf.multipleFormerEditors = conf.formerEditors.length > 1;
  conf.multipleAuthors = conf.authors && conf.authors.length > 1;
  (conf.alternateFormats || []).forEach(it => {
    if (!it.uri || !it.label) {
      pub("error", "All alternate formats must have a uri and a label.");
    }
  });
  conf.multipleAlternates =
    conf.alternateFormats && conf.alternateFormats.length > 1;
  conf.alternatesHTML =
    conf.alternateFormats &&
    joinAnd(conf.alternateFormats, alt => {
      let optional =
        alt.hasOwnProperty("lang") && alt.lang ? ` hreflang='${alt.lang}'` : "";
      optional +=
        alt.hasOwnProperty("type") && alt.type ? ` type='${alt.type}'` : "";
      return `<a rel='alternate' href='${alt.uri}'${optional}>${alt.label}</a>`;
    });
  if (conf.bugTracker) {
    if (conf.bugTracker.new && conf.bugTracker.open) {
      conf.bugTrackerHTML = `<a href='${conf.bugTracker.new}'>${conf.l10n.file_a_bug}</a> ${conf.l10n.open_parens}<a href='${conf.bugTracker.open}'>${conf.l10n.open_bugs}</a>${conf.l10n.close_parens}`;
    } else if (conf.bugTracker.open) {
      conf.bugTrackerHTML = `<a href='${conf.bugTracker.open}'>open bugs</a>`;
    } else if (conf.bugTracker.new) {
      conf.bugTrackerHTML = `<a href='${conf.bugTracker.new}'>file a bug</a>`;
    }
  }
  if (conf.copyrightStart && conf.copyrightStart == conf.publishYear)
    conf.copyrightStart = "";
  conf.longStatus = status2long[conf.specStatus];
  conf.textStatus = status2text[conf.specStatus];
  if (status2rdf[conf.specStatus]) {
    conf.rdfStatus = status2rdf[conf.specStatus];
  }
  conf.showThisVersion = !conf.isNoTrack || conf.isTagFinding;
  conf.showPreviousVersion =
    conf.specStatus !== "FPWD" &&
    conf.specStatus !== "FPLC" &&
    conf.specStatus !== "ED" &&
    !conf.isNoTrack &&
    !conf.isSubmission;
  if (conf.specStatus.endsWith("NOTE") && !conf.prevVersion)
    conf.showPreviousVersion = false;
  if (conf.isTagFinding)
    conf.showPreviousVersion = conf.previousPublishDate ? true : false;
  conf.notYetRec = conf.isRecTrack && conf.specStatus !== "REC";
  conf.isRec = conf.isRecTrack && conf.specStatus === "REC";
  if (conf.isRec && !conf.errata)
    pub("error", "Recommendations must have an errata link.");
  conf.notRec = conf.specStatus !== "REC";
  conf.prependW3C = !conf.isUnofficial;
  conf.isED = conf.specStatus === "ED";
  conf.isCR = conf.specStatus === "CR";
  conf.isPR = conf.specStatus === "PR";
  conf.isPER = conf.specStatus === "PER";
  conf.isMO = conf.specStatus === "MO";
  conf.isNote = ["FPWD-NOTE", "WG-NOTE"].includes(conf.specStatus);
  conf.isIGNote = conf.specStatus === "IG-NOTE";
  conf.dashDate = ISODate.format(conf.publishDate);
  conf.publishISODate = conf.publishDate.toISOString();
  conf.shortISODate = ISODate.format(conf.publishDate);
  if (conf.hasOwnProperty("wgPatentURI") && !Array.isArray(conf.wgPatentURI)) {
    Object.defineProperty(conf, "wgId", {
      get() {
        // it's always at "pp-impl" + 1
        const urlParts = this.wgPatentURI.split("/");
        const pos = urlParts.findIndex(item => item === "pp-impl") + 1;
        return urlParts[pos] || "";
      },
    });
  } else {
    conf.wgId = conf.wgId ? conf.wgId : "";
  }
  // configuration done - yay!

  // insert into document
  const header = (conf.isCGBG ? cgbgHeadersTmpl : headersTmpl)(conf);
  document.body.prepend(header);
  document.body.classList.add("h-entry");

  // handle SotD
  const sotd =
    document.getElementById("sotd") || document.createElement("section");
  if ((conf.isCGBG || !conf.isNoTrack || conf.isTagFinding) && !sotd.id) {
    pub(
      "error",
      "A custom SotD paragraph is required for your type of document."
    );
  }
  sotd.id = sotd.id || "sotd";
  sotd.classList.add("introductory");
  // NOTE:
  //  When arrays, wg and wgURI have to be the same length (and in the same order).
  //  Technically wgURI could be longer but the rest is ignored.
  //  However wgPatentURI can be shorter. This covers the case where multiple groups
  //  publish together but some aren't used for patent policy purposes (typically this
  //  happens when one is foolish enough to do joint work with the TAG). In such cases,
  //  the groups whose patent policy applies need to be listed first, and wgPatentURI
  //  can be shorter — but it still needs to be an array.
  const wgPotentialArray = [conf.wg, conf.wgURI, conf.wgPatentURI];
  if (
    wgPotentialArray.some(item => Array.isArray(item)) &&
    !wgPotentialArray.every(item => Array.isArray(item))
  ) {
    pub(
      "error",
      "If one of '`wg`', '`wgURI`', or '`wgPatentURI`' is an array, they all have to be."
    );
  }
  if (conf.isCGBG && !conf.wg) {
    pub(
      "error",
      "[`wg`](https://github.com/w3c/respec/wiki/wg)" +
        " configuration option is required for this kind of document."
    );
  }
  if (Array.isArray(conf.wg)) {
    conf.multipleWGs = conf.wg.length > 1;
    conf.wgHTML = joinAnd(conf.wg, (wg, idx) => {
      return `the <a href='${conf.wgURI[idx]}'>${wg}</a>`;
    });
    const pats = [];
    for (let i = 0, n = conf.wg.length; i < n; i++) {
      pats.push(
        `a <a href='${conf.wgPatentURI[i]}' rel='disclosure'>` +
          `public list of any patent disclosures  (${conf.wg[i]})</a>`
      );
    }
    conf.wgPatentHTML = joinAnd(pats);
  } else {
    conf.multipleWGs = false;
    if (conf.wg) {
      conf.wgHTML = `the <a href='${conf.wgURI}'>${conf.wg}</a>`;
    }
  }
  if (conf.specStatus === "PR" && !conf.crEnd) {
    pub(
      "error",
      `\`specStatus\` is "PR" but no \`crEnd\` is specified (needed to indicate end of previous CR).`
    );
  }

  if (conf.specStatus === "CR" && !conf.crEnd) {
    pub(
      "error",
      `\`specStatus\` is "CR", but no \`crEnd\` is specified in Respec config.`
    );
  }
  conf.crEnd = validateDateAndRecover(conf, "crEnd");
  conf.humanCREnd = W3CDate.format(conf.crEnd);

  if (conf.specStatus === "PR" && !conf.prEnd) {
    pub("error", `\`specStatus\` is "PR" but no \`prEnd\` is specified.`);
  }
  conf.prEnd = validateDateAndRecover(conf, "prEnd");
  conf.humanPREnd = W3CDate.format(conf.prEnd);

  if (conf.specStatus === "PER" && !conf.perEnd) {
    pub("error", "Status is PER but no perEnd is specified");
  }
  conf.perEnd = validateDateAndRecover(conf, "perEnd");
  conf.humanPEREnd = W3CDate.format(conf.perEnd);
  conf.recNotExpected =
    conf.noRecTrack || conf.recNotExpected
      ? true
      : !conf.isRecTrack &&
        conf.maturity == "WD" &&
        conf.specStatus !== "FPWD-NOTE";
  if (conf.noRecTrack && recTrackStatus.includes(conf.specStatus)) {
    pub(
      "error",
      `Document configured as [\`noRecTrack\`](https://github.com/w3c/respec/wiki/noRecTrack), but its status ("${
        conf.specStatus
      }") puts it on the W3C Rec Track. Status cannot be any of: ${recTrackStatus.join(
        ", "
      )}. [More info](https://github.com/w3c/respec/wiki/noRecTrack).`
    );
  }
  if (conf.isIGNote && !conf.charterDisclosureURI) {
    pub(
      "error",
      "IG-NOTEs must link to charter's disclosure section using `charterDisclosureURI`."
    );
  }

  hyperHTML$1.bind(sotd)`${populateSoTD(conf, sotd)}`;

  if (!conf.implementationReportURI && conf.isCR) {
    pub(
      "error",
      "CR documents must have an [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI) " +
        "that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience)."
    );
  }
  if (!conf.implementationReportURI && conf.isPR) {
    pub(
      "warn",
      "PR documents should include an " +
        " [`implementationReportURI`](https://github.com/w3c/respec/wiki/implementationReportURI)" +
        " that describes [implementation experience](https://www.w3.org/2019/Process-20190301/#implementation-experience)."
    );
  }

  // Requested by https://github.com/w3c/respec/issues/504
  // Makes a record of a few auto-generated things.
  pub("amend-user-config", {
    publishISODate: conf.publishISODate,
    generatedSubtitle: `${conf.longStatus} ${conf.publishHumanDate}`,
  });
}

/**
 * @param {*} conf
 * @param {HTMLElement} sotd
 */
function populateSoTD(conf, sotd) {
  const options = {
    ...collectSotdContent(sotd, conf),

    get mailToWGPublicList() {
      return `mailto:${conf.wgPublicList}@w3.org`;
    },
    get mailToWGPublicListWithSubject() {
      const fragment = conf.subjectPrefix
        ? `?subject=${encodeURIComponent(conf.subjectPrefix)}`
        : "";
      return this.mailToWGPublicList + fragment;
    },
    get mailToWGPublicListSubscription() {
      return `mailto:${conf.wgPublicList}-request@w3.org?subject=subscribe`;
    },
  };
  const template = conf.isCGBG ? cgbgSotdTmpl : sotdTmpl;
  return template(conf, options);
}

/**
 * @param {HTMLElement} sotd
 */
function collectSotdContent(sotd, { isTagFinding = false }) {
  const sotdClone = sotd.cloneNode(true);
  const additionalContent = document.createDocumentFragment();
  // we collect everything until we hit a section,
  // that becomes the custom content.
  while (sotdClone.hasChildNodes()) {
    if (
      isElement(sotdClone.firstChild) &&
      sotdClone.firstChild.localName === "section"
    ) {
      break;
    }
    additionalContent.appendChild(sotdClone.firstChild);
  }
  if (isTagFinding && !additionalContent.hasChildNodes()) {
    pub(
      "warn",
      "ReSpec does not support automated SotD generation for TAG findings, " +
        "please add the prerequisite content in the 'sotd' section"
    );
  }
  return {
    additionalContent,
    // Whatever sections are left, we throw at the end.
    additionalSections: sotdClone.childNodes,
  };
}

/**
 * @param {string} orcid Either an ORCID URL or just the 16-digit ID which comes after the /
 * @return {string} the full ORCID URL. Throws an error if the ID is invalid.
 */
function normalizeOrcid(orcid) {
  const orcidUrl = new URL(orcid, "https://orcid.org/");
  if (orcidUrl.origin !== "https://orcid.org") {
    throw new Error(
      `The origin should be "https://orcid.org", not "${orcidUrl.origin}".`
    );
  }

  // trailing slash would mess up checksum
  const orcidId = orcidUrl.pathname.slice(1).replace(/\/$/, "");
  if (!/^\d{4}-\d{4}-\d{4}-\d{3}(\d|X)$/.test(orcidId)) {
    throw new Error(
      `ORCIDs have the format "1234-1234-1234-1234", not "${orcidId}"`
    );
  }

  // calculate checksum as per https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
  const lastDigit = orcidId[orcidId.length - 1];
  const remainder = orcidId
    .split("")
    .slice(0, -1)
    .filter(c => /\d/.test(c))
    .map(Number)
    .reduce((acc, c) => (acc + c) * 2, 0);
  const lastDigitInt = (12 - (remainder % 11)) % 11;
  const lastDigitShould = lastDigitInt === 10 ? "X" : String(lastDigitInt);
  if (lastDigit !== lastDigitShould) {
    throw new Error(`"${orcidId}" has an invalid checksum.`);
  }

  return orcidUrl.href;
}

/**
 * @param {Node} node
 * @return {node is Element}
 */
function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}

var headers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$l,
  run: run$a
});

// @ts-check
const name$m = "w3c/abstract";

async function run$b() {
  const abs = document.getElementById("abstract");
  if (!abs) {
    pub("error", `Document must have one element with \`id="abstract"`);
    return;
  }
  abs.classList.add("introductory");
  let abstractHeading = document.querySelector("#abstract>h2");
  if (abstractHeading) {
    return;
  }
  abstractHeading = document.createElement("h2");
  abstractHeading.textContent = l10n[lang].abstract;
  abs.prepend(abstractHeading);
}

var abstract = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$m,
  run: run$b
});

// @ts-check

const name$n = "core/data-transform";

function run$c() {
  /** @type {NodeListOf<HTMLElement>} */
  const transformables = document.querySelectorAll("[data-transform]");
  transformables.forEach(el => {
    el.innerHTML = runTransforms(el.innerHTML, el.dataset.transform);
    el.removeAttribute("data-transform");
  });
}

var dataTransform = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$n,
  run: run$c
});

// @ts-check
const name$o = "core/dfn-abbr";

function run$d() {
  /** @type {NodeListOf<HTMLElement>} */
  const elements = document.querySelectorAll("[data-abbr]");
  for (const elem of elements) {
    const { localName } = elem;
    switch (localName) {
      case "dfn":
        processDfnElement(elem);
        break;
      default: {
        const msg =
          `[\`data-abbr\`](https://github.com/w3c/respec/wiki/data-abbr)` +
          ` attribute not supported on \`${localName}\` elements.`;
        showInlineWarning(elem, msg, "Error: unsupported.");
      }
    }
  }
}
/**
 * @param {HTMLElement} dfn
 */
function processDfnElement(dfn) {
  const abbr = generateAbbreviation(dfn);
  // get normalized <dfn> textContent to remove spaces, tabs, new lines.
  const fullForm = dfn.textContent.replace(/\s\s+/g, " ").trim();
  dfn.insertAdjacentHTML(
    "afterend",
    ` (<abbr title="${fullForm}">${abbr}</abbr>)`
  );
  const lt = dfn.dataset.lt || "";
  dfn.dataset.lt = lt
    .split("|")
    .filter(i => i.trim())
    .concat(abbr)
    .join("|");
}

function generateAbbreviation(elem) {
  if (elem.dataset.abbr) return elem.dataset.abbr;
  // Generates abbreviation from textContent
  // e.g., "Permanent Account Number" -> "PAN"
  return elem.textContent
    .match(/\b([a-z])/gi)
    .join("")
    .toUpperCase();
}

var dataAbbr = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$o,
  run: run$d
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

const name$p = "core/biblio";

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

async function run$e(conf) {
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
  name: name$p,
  updateFromNetwork: updateFromNetwork,
  resolveRef: resolveRef,
  run: run$e,
  wireReference: wireReference,
  stringifyReference: stringifyReference
});

// @ts-check

const name$q = "core/render-biblio";

const localizationStrings$2 = {
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

const lang$a = lang in localizationStrings$2 ? lang : "en";

const l10n$4 = localizationStrings$2[lang$a];

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

function run$f(conf) {
  const informs = Array.from(conf.informativeReferences);
  const norms = Array.from(conf.normativeReferences);

  if (!informs.length && !norms.length && !conf.refNote) return;

  const refsec = hyperHTML$1`
    <section id='references' class='appendix'>
      <h2>${l10n$4.references}</h2>
      ${conf.refNote ? hyperHTML$1`<p>${conf.refNote}</p>` : ""}
    </section>`;

  for (const type of ["Normative", "Informative"]) {
    const refs = type === "Normative" ? norms : informs;
    if (!refs.length) continue;

    const sec = hyperHTML$1`
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
  name: name$q,
  run: run$f,
  renderInlineCitation: renderInlineCitation,
  wireReference: wireReference,
  stringifyReference: stringifyReference
});

// @ts-check

const name$r = "core/inlines";
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

function run$g(conf) {
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
    [
      "\\bMUST(?:\\s+NOT)?\\b",
      "\\bSHOULD(?:\\s+NOT)?\\b",
      "\\bSHALL(?:\\s+NOT)?\\b",
      "\\bMAY\\b",
      "\\b(?:NOT\\s+)?REQUIRED\\b",
      "\\b(?:NOT\\s+)?RECOMMENDED\\b",
      "\\bOPTIONAL\\b",
    ].join("|")
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
  name: name$r,
  rfc2119Usage: rfc2119Usage,
  run: run$g
});

// @ts-check
const name$s = "w3c/conformance";

/**
 * @param {Element} conformance
 * @param {*} conf
 */
function processConformance(conformance, conf) {
  const terms = [...Object.keys(rfc2119Usage)];
  // Add RFC2119 to blibliography
  if (terms.length) {
    conf.normativeReferences.add("RFC2119");
    conf.normativeReferences.add("RFC8174");
  }
  // Put in the 2119 clause and reference
  const keywords = joinAnd(
    terms.sort(),
    item => `<em class="rfc2119">${item}</em>`
  );
  const plural = terms.length > 1;
  const content = hyperHTML$1`
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
    <h2>Conformance</h2>
    <p>
      As well as sections marked as non-normative, all authoring guidelines,
      diagrams, examples, and notes in this specification are non-normative.
      Everything else in this specification is normative.
    </p>
<<<<<<< gh-pages
    ${n.length?hyperHTML$1`
          <p>
            The key word${o?"s":""} ${r} in this document
            ${o?"are":"is"} to be interpreted as described in
=======
    ${terms.length
      ? hyperHTML$1`
          <p>
            The key word${plural ? "s" : ""} ${[keywords]} in this document
            ${plural ? "are" : "is"} to be interpreted as described in
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
            <a href="https://tools.ietf.org/html/bcp14">BCP 14</a>
            ${renderInlineCitation("RFC2119")}
            ${renderInlineCitation("RFC8174")} when, and only when, they appear
            in all capitals, as shown here.
          </p>
<<<<<<< gh-pages
        `:null}
  `;e.prepend(...i.childNodes)}function run$h(e){const t=document.querySelector("section#conformance");t&&!t.classList.contains("override")&&processConformance(t,e),!t&&Object.keys(rfc2119Usage).length&&pub("warn",'Document uses RFC2119 keywords but lacks a conformance section. Please add a `<section id="conformance">`.'),pub("end",name$t)}var conformance=Object.freeze({__proto__:null,name:name$t,run:run$h});const name$u="core/dfn";function run$i(){document.querySelectorAll("dfn").forEach(e=>{const t=getDfnTitles(e);registerDefinition(e,t),e.dataset.dfnType||(e.dataset.dfnType="dfn"),1===t.length&&t[0]===norm(e.textContent)||(e.dataset.lt=t.join("|"))})}var dfn=Object.freeze({__proto__:null,name:name$u,run:run$i});const name$v="core/pluralize";function run$j(e){if(!e.pluralize)return;const t=getPluralizer();document.querySelectorAll("dfn:not([data-lt-no-plural]):not([data-lt-noDefault])").forEach(e=>{const n=[e.textContent];e.dataset.lt&&n.push(...e.dataset.lt.split("|")),e.dataset.localLt&&n.push(...e.dataset.localLt.split("|"));const r=new Set(n.map(t).filter(e=>e));if(r.size){const t=e.dataset.plurals?e.dataset.plurals.split("|"):[],n=[...new Set([...t,...r])];e.dataset.plurals=n.join("|"),registerDefinition(e,n)}})}function getPluralizer(){const e=new Set;document.querySelectorAll("a:not([href])").forEach(t=>{const n=norm(t.textContent).toLowerCase();e.add(n),t.dataset.lt&&e.add(t.dataset.lt)});const t=new Set;return document.querySelectorAll("dfn:not([data-lt-noDefault])").forEach(e=>{const n=norm(e.textContent).toLowerCase();t.add(n),e.dataset.lt&&e.dataset.lt.split("|").forEach(e=>t.add(e)),e.dataset.localLt&&e.dataset.localLt.split("|").forEach(e=>t.add(e))}),function(n){const r=norm(n).toLowerCase(),o=pluralize$1.isSingular(r)?pluralize$1.plural(r):pluralize$1.singular(r);return e.has(o)&&!t.has(o)?o:""}}var pluralize$2=Object.freeze({__proto__:null,name:name$v,run:run$j});const name$w="core/examples",localizationStrings$5={en:{example:"Example"},nl:{example:"Voorbeeld"},es:{example:"Ejemplo"}},l10n$7=getIntlData(localizationStrings$5),cssPromise=loadStyle$2();async function loadStyle$2(){try{return(await Promise.resolve().then((function(){return examples$2}))).default}catch{return fetchAsset("examples.css")}}function makeTitle(e,t,n){n.title=e.title,n.title&&e.removeAttribute("title");const r=t>0?` ${t}`:"",o=n.title?hyperHTML$1`
        <span class="example-title">: ${n.title}</span>
      `:"";return hyperHTML$1`
    <div class="marker">
      <a class="self-link">${l10n$7.example}<bdi>${r}</bdi></a
      >${o}
    </div>
  `}async function run$k(){const e=document.querySelectorAll("pre.example, pre.illegal-example, aside.example");if(!e.length)return;const t=await cssPromise;document.head.insertBefore(hyperHTML$1`
      <style>
        ${t}
      </style>
    `,document.querySelector("link"));let n=0;e.forEach(e=>{const t=e.classList.contains("illegal-example"),r={number:n,illegal:t},{title:o}=e;if("aside"===e.localName){++n;const t=makeTitle(e,n,r);e.prepend(t),o?addId(e,`example-${n}`,o):addId(e,"example",String(n));const{id:i}=e;t.querySelector("a.self-link").href=`#${i}`,pub("example",r)}else{const t=!!e.closest("aside");t||++n,r.content=e.innerHTML,e.classList.remove("example","illegal-example");const i=e.id?e.id:null;i&&e.removeAttribute("id");const s=makeTitle(e,t?0:n,r),a=hyperHTML$1`
        <div class="example" id="${i}">
          ${s} ${e.cloneNode(!0)}
        </div>
      `;o&&addId(a,`example-${n}`,o),addId(a,"example",String(n)),a.querySelector("a.self-link").href=`#${a.id}`,e.replaceWith(a),t||pub("example",r)}})}var examples=Object.freeze({__proto__:null,name:name$w,run:run$k});const name$x="core/issues-notes",localizationStrings$6={en:{issue_summary:"Issue Summary",no_issues_in_spec:"There are no issues listed in this specification."},nl:{issue_summary:"Lijst met issues",no_issues_in_spec:"Er zijn geen problemen vermeld in deze specificatie."},es:{issue_summary:"Resumen de la cuestión",no_issues_in_spec:"No hay problemas enumerados en esta especificación."}},cssPromise$1=loadStyle$3();async function loadStyle$3(){try{return(await Promise.resolve().then((function(){return issuesNotes$2}))).default}catch{return fetchAsset("issues-notes.css")}}const l10n$8=getIntlData(localizationStrings$6);function handleIssues(e,t,n){const r=!!document.querySelector(".issue[data-number]");let o=0;const i=document.createElement("ul");e.forEach(e=>{const{type:s,displayType:a,isFeatureAtRisk:c}=getIssueType(e,n),l="issue"===s,u="span"===e.localName,{number:d}=e.dataset,p={type:s,inline:u,title:e.title};if(!l||u||r?d&&(p.number=Number(d)):(o++,p.number=o),!u){const u=hyperHTML$1`<div class="${c?`${s} atrisk`:s}" role="${"note"===s?"note":null}"></div>`,h=document.createElement("span"),f=hyperHTML$1`
        <div role='heading' class='${`${s}-title marker`}'>${h}</div>`;addId(f,"h",s);let m,g=a;if(e.id?(u.id=e.id,e.removeAttribute("id")):addId(u,"issue-container",p.number?`number-${p.number}`:""),l){if(r){if(d){g+=` ${d}`;const e=linkToIssueTracker(d,n,{isFeatureAtRisk:c});e&&(h.before(e),e.append(h)),h.classList.add("issue-number"),m=t.get(d),m||pub("warning",`Failed to fetch issue number ${d}`),m&&!p.title&&(p.title=m.title)}}else g+=` ${o}`;void 0!==p.number&&i.append(createIssueSummaryEntry(n.l10n.issue,p,u.id))}if(h.textContent=g,p.title){e.removeAttribute("title");const{repoURL:t=""}=n.github||{},r=m?m.labels:[];m&&"CLOSED"===m.state&&u.classList.add("closed"),f.append(createLabelsGroup(r,p.title,t))}let b=e;e.replaceWith(u),b.classList.remove(s),b.removeAttribute("data-number"),m&&!b.innerHTML.trim()&&(b=document.createRange().createContextualFragment(m.bodyHTML)),u.append(f,b);const y=parents(f,"section").length+2;f.setAttribute("aria-level",y)}pub(p.type,p)}),makeIssueSectionSummary(i)}function getIssueType(e,t){const n=e.classList.contains("issue"),r=e.classList.contains("warning"),o=e.classList.contains("ednote"),i=e.classList.contains("atrisk");return{type:n?"issue":r?"warning":o?"ednote":"note",displayType:n?i?t.l10n.feature_at_risk:t.l10n.issue:r?t.l10n.warning:o?t.l10n.editors_note:t.l10n.note,isFeatureAtRisk:i}}function linkToIssueTracker(e,t,{isFeatureAtRisk:n=!1}={}){return!n&&t.issueBase?hyperHTML$1`<a href='${t.issueBase+e}'/>`:n&&t.atRiskBase?hyperHTML$1`<a href='${t.atRiskBase+e}'/>`:void 0}function createIssueSummaryEntry(e,t,n){const r=`${e} ${t.number}`,o=t.title?hyperHTML$1`<span style="text-transform: none">: ${t.title}</span>`:"";return hyperHTML$1`
    <li><a href="${`#${n}`}">${r}</a>${o}</li>
  `}function makeIssueSectionSummary(e){const t=document.getElementById("issue-summary");if(!t)return;const n=t.querySelector("h2, h3, h4, h5, h6");e.hasChildNodes()?t.append(e):t.append(hyperHTML$1`<p>${l10n$8.no_issues_in_spec}</p>`),(!n||n&&n!==t.firstElementChild)&&t.insertAdjacentHTML("afterbegin",`<h2>${l10n$8.issue_summary}</h2>`)}function isLight(e){return.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e>>0&255)>140}function createLabelsGroup(e,t,n){const r=e.map(e=>createLabel(e,n)),o=e.map(e=>e.name),i=joinAnd(o);if(r.length&&r.unshift(document.createTextNode(" ")),o.length){return hyperHTML$1`<span
      class="issue-label"
      aria-label="${`This issue is labelled as ${i}.`}">: ${t}${r}</span>`}return hyperHTML$1`<span class="issue-label">: ${t}${r}</span>`}function createLabel(e,t){const{color:n,name:r}=e,o=new URL("./issues/",t);o.searchParams.set("q",`is:issue is:open label:"${e.name}"`);const i=parseInt(n,16),s=isNaN(i)||isLight(i)?"light":"dark";return hyperHTML$1`<a
    class="${`respec-gh-label respec-label-${s}`}"
    style="${`background-color: #${n}`}"
    href="${o.href}">${r}</a>`}async function fetchAndStoreGithubIssues(e){if(!e||!e.apiBase)return new Map;const t=[...document.querySelectorAll(".issue[data-number]")].map(e=>Number.parseInt(e.dataset.number,10)).filter(e=>e);if(!t.length)return new Map;const n=new URL("issues",`${e.apiBase}/${e.fullName}/`);n.searchParams.set("issues",t.join(","));const r=await fetch(n.href);if(!r.ok){return pub("error",`Error fetching issues from GitHub. (HTTP Status ${r.status}).`),new Map}const o=await r.json();return new Map(Object.entries(o))}async function run$l(e){const t=document.querySelectorAll(".issue, .note, .warning, .ednote");if(!t.length)return;const n=await fetchAndStoreGithubIssues(e.github),r=await cssPromise$1,{head:o}=document;o.insertBefore(hyperHTML$1`<style>${[r]}</style>`,o.querySelector("link")),handleIssues(t,n,e),document.querySelectorAll(".ednote").forEach(e=>{e.classList.remove("ednote"),e.classList.add("note")})}var issuesNotes=Object.freeze({__proto__:null,name:name$x,run:run$l});const name$y="core/best-practices",localizationStrings$7={en:{best_practice:"Best Practice "}},l10n$9=getIntlData(localizationStrings$7),lang$a=lang in localizationStrings$7?lang:"en";function run$m(){const e=document.querySelectorAll(".practicelab"),t=document.getElementById("bp-summary"),n=t?document.createElement("ul"):null;[...e].forEach((e,t)=>{const r=addId(e,"bp"),o=hyperHTML$1`
      <a class="marker self-link" href="${`#${r}`}"><bdi lang="${lang$a}">${l10n$9.best_practice}${t+1}</bdi></a>`;if(n){const t=hyperHTML$1`
        <li>
          ${o}: ${makeSafeCopy(e)}
        </li>
      `;n.appendChild(t)}const i=e.closest("div");if(!i)return void e.classList.add("advisement");i.classList.add("advisement");const s=hyperHTML$1`${o.cloneNode(!0)}: ${e}`;i.prepend(...s.childNodes)}),e.length?t&&(t.appendChild(hyperHTML$1`<h2>Best Practices Summary</h2>`),t.appendChild(n)):t&&(pub("warn","Using best practices summary (#bp-summary) but no best practices found."),t.remove())}var bestPractices=Object.freeze({__proto__:null,name:name$y,run:run$m});const name$z="core/figures",localizationStrings$8={en:{list_of_figures:"List of Figures",fig:"Figure "},ja:{fig:"図",list_of_figures:"図のリスト"},ko:{fig:"그림 ",list_of_figures:"그림 목록"},nl:{fig:"Figuur ",list_of_figures:"Lijst met figuren"},es:{fig:"Figura ",list_of_figures:"Lista de Figuras"},zh:{fig:"圖 ",list_of_figures:"List of Figures"}},l10n$a=getIntlData(localizationStrings$8);function run$n(){normalizeImages(document);const e=collectFigures(),t=document.getElementById("tof");e.length&&t&&(decorateTableOfFigures(t),t.append(hyperHTML$1`<h2>${l10n$a.list_of_figures}</h2>`,hyperHTML$1`<ul class='tof'>${e}</ul>`))}function collectFigures(){const e=[];return document.querySelectorAll("figure").forEach((t,n)=>{const r=t.querySelector("figcaption");r?(decorateFigure(t,r,n),e.push(getTableOfFiguresListItem(t.id,r))):showInlineWarning(t,"Found a `<figure>` without a `<figcaption>`")}),e}function decorateFigure(e,t,n){addId(e,"fig",t.textContent),wrapInner(t,hyperHTML$1`<span class='fig-title'>`),t.prepend(l10n$a.fig,hyperHTML$1`<bdi class='figno'>${n+1}</bdi>`," ")}function getTableOfFiguresListItem(e,t){const n=t.cloneNode(!0);return n.querySelectorAll("a").forEach(e=>{renameElement(e,"span").removeAttribute("href")}),hyperHTML$1`<li class='tofline'>
    <a class='tocxref' href='${`#${e}`}'>${n.childNodes}</a>
  </li>`}function normalizeImages(e){e.querySelectorAll(":not(picture)>img:not([width]):not([height]):not([srcset])").forEach(e=>{0!==e.naturalHeight&&0!==e.naturalWidth&&(e.height=e.naturalHeight,e.width=e.naturalWidth)})}function decorateTableOfFigures(e){if(e.classList.contains("appendix")||e.classList.contains("introductory")||e.closest("section"))return;const t=getPreviousSections(e);t.every(e=>e.classList.contains("introductory"))?e.classList.add("introductory"):t.some(e=>e.classList.contains("appendix"))&&e.classList.add("appendix")}function getPreviousSections(e){const t=[];for(const n of iteratePreviousElements(e))"section"===n.localName&&t.push(n);return t}function*iteratePreviousElements(e){let t=e;for(;t.previousElementSibling;)t=t.previousElementSibling,yield t}var figures=Object.freeze({__proto__:null,name:name$z,run:run$n});const topLevelEntities=new Set(["callback interface","callback","dictionary","enum","interface mixin","interface","typedef"]);function findDfn(e,t,{parent:n=""}={}){switch(e.type){case"constructor":case"operation":return findOperationDfn(e,n,t);default:return findNormalDfn(e,n,t)}}function getAlternativeNames(e,t,n){const{type:r}=e,o=`${t}.${n}`;switch(r){case"constructor":case"operation":return{local:[o,`${o}()`,n],exportable:[`${n}()`,...generateMethodNamesWithArgs(n,e.arguments)]};case"attribute":return{local:[o],exportable:[n]}}}function generateMethodNamesWithArgs(e,t){const n=[];if(0===t.length)return n;const r=[],o=[];for(const{name:e,optional:n,variadic:i}of t)n||i?o.push(e):r.push(e);const i=r.join(", "),s=`${e}(${i})`;n.push(s);const a=o.map((t,n)=>{const r=o.slice(0,n+1).join(", ");return`${e}(${i}${r?`, ${r}`:""})`});return n.push(...a),n}function findOperationDfn(e,t,n){if(n.includes("!overload"))return findNormalDfn(e,t,n);return findNormalDfn(e,t,`${n}()`,n)}function addAlternativeNames(e,t){const{local:n,exportable:r}=t,o=e.dataset.lt?new Set(e.dataset.lt.split("|")):new Set;for(const e of r)o.add(e);n.filter(e=>o.has(e)).forEach(e=>o.delete(e)),e.dataset.lt=[...o].join("|"),e.dataset.localLt=n.join("|"),registerDefinition(e,[...n,...r])}function findNormalDfn(e,t,...n){for(const r of n){let n="enum-value"===e.type&&""===r?"the-empty-string":r.toLowerCase(),o=definitionMap[n],i=getDfns(o,t,r,e.type);if(0===i.length&&""!==t?(n=`${t}.${n}`,o=definitionMap[n.toLowerCase()],void 0!==o&&1===o.length&&(i=o,delete definitionMap[n],registerDefinition(i[0],[n]))):n=r,i.length>1){showInlineError(i,`WebIDL identifier \`${r}\` ${t?`for \`${t}\``:""} is defined multiple times`,"Duplicate definition.")}if(i.length)return i[0]}}function decorateDfn(e,t,n,r){if(!e.id){const t=n.toLowerCase(),o=t?`${t}-`:"";let i=r.toLowerCase().replace(/[()]/g,"").replace(/\s/g,"-");""===i&&(i="the-empty-string"),e.id=`dom-${o}${i}`}switch(e.dataset.idl=t.type,e.dataset.title=e.textContent,e.dataset.dfnFor=n,t.type){case"operation":case"attribute":case"field":e.dataset.type=getDataType(t)}switch(e.querySelector("code")||e.closest("code")||!e.children||wrapInner(e,e.ownerDocument.createElement("code")),t.type){case"attribute":case"constructor":case"operation":addAlternativeNames(e,getAlternativeNames(t,n,r))}return e}function getDfns(e,t,n,r){if(!e)return[];const o=e.filter(e=>{const n=e.closest("[data-dfn-for]");return n&&n.dataset.dfnFor===t});if(0===o.length&&""===t&&1===e.length)return e[0].textContent===n?e:[];if(topLevelEntities.has(r)&&e.length){const t=e.find(e=>e.textContent.trim()===n);if(t)return[t]}return o}function getDataType(e){const{idlType:t,generic:n,union:r}=e;return"string"==typeof t?t:n||(r?t.map(getDataType).join("|"):getDataType(t))}const name$A="core/webidl-clipboard";function createButton(){const e=document.createElement("button");return e.innerHTML='<svg height="16" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"/></svg>',e.title="Copy IDL to clipboard",e.classList.add("respec-button-copy-paste","removeOnSave"),e}const copyButton=createButton();function addCopyIDLButton(e){const t=e.closest("pre.idl").cloneNode(!0);t.querySelector(".idlHeader").remove();const{textContent:n}=t,r=copyButton.cloneNode(!0);r.addEventListener("click",()=>{clipboardWriteText(n)}),e.append(r)}function clipboardWriteText(e){return navigator.clipboard?navigator.clipboard.writeText(e):new Promise(t=>{document.addEventListener("copy",n=>{n.clipboardData.setData("text/plain",e),t()},{once:!0}),document.execCommand("copy")})}var webidlClipboard=Object.freeze({__proto__:null,name:name$A,addCopyIDLButton:addCopyIDLButton});const name$B="core/webidl",operationNames={},idlPartials={},templates$1={wrap:e=>e.reduce(flatten$1,[]).filter(e=>""!==e).map(e=>"string"==typeof e?new Text(e):e),trivia:e=>e.trim()?hyperHTML$1`<span class='idlSectionComment'>${e}</span>`:e,generic:e=>/^[A-Z]/.test(e)?hyperHTML$1`<a data-xref-type="interface" data-cite="WebIDL">${e}</a>`:hyperHTML$1`<a data-xref-type="dfn" data-cite="WebIDL">${e}</a>`,reference(e,t,n){if("extended-attribute"===n.type&&"Exposed"!==n.name)return e;let r,o="_IDL_",i=null;switch(t){case"Window":o="interface",i="HTML";break;case"object":o="interface",i="WebIDL";break;default:t.includes("Worker")&&"extended-attribute"===n.type&&(r=`${t}GlobalScope`,o="interface",i=["Worker","DedicatedWorker","SharedWorker"].includes(t)?"HTML":null)}return hyperHTML$1`<a
      data-xref-type="${o}" data-cite="${i}" data-lt="${r}">${e}</a>`},name(e,{data:t,parent:n}){if(t.idlType&&"argument-type"===t.idlType.type)return hyperHTML$1`<span class="idlParamName">${e}</span>`;const r=defineIdlName(e,t,n);if("enum-value"!==t.type){const e=n?"idlName":"idlID";r.classList.add(e)}return r},nameless(e,{data:t,parent:n}){switch(t.type){case"constructor":return defineIdlName(e,t,n);default:return e}},type:e=>hyperHTML$1`<span class="idlType">${e}</span>`,inheritance:e=>hyperHTML$1`<span class="idlSuperclass">${e}</span>`,definition(e,{data:t,parent:n}){const r=getIdlDefinitionClassName(t);switch(t.type){case"includes":case"enum-value":return hyperHTML$1`<span class='${r}'>${e}</span>`}const o=n?n.name:"",{name:i,idlId:s}=getNameAndId(t,o);return hyperHTML$1`<span class='${r}' id='${s}' data-idl data-title='${i}'>${e}</span>`},extendedAttribute:e=>hyperHTML$1`<span class="extAttr">${e}</span>`,extendedAttributeReference:e=>hyperHTML$1`<a data-xref-type="extended-attribute">${e}</a>`};function defineIdlName(e,t,n){const r=n?n.name:"",{name:o}=getNameAndId(t,r),i=findDfn(t,o,{parent:r}),s=getDfnType(t.type);if(i){t.partial||(i.dataset.export="",i.dataset.dfnType=s),decorateDfn(i,t,r,o);const n=`#${i.id}`;return hyperHTML$1`<a
      data-link-for="${r}"
      data-link-type="${s}"
      href="${n}"
      class="internalDFN"
      ><code>${e}</code></a>`}if("operation"===t.type&&"toJSON"===t.name&&t.extAttrs.some(({name:e})=>"Default"===e))return hyperHTML$1`<a
     data-link-type="dfn"
     data-lt="default toJSON operation">${e}</a>`;if(!t.partial){const n=hyperHTML$1`<dfn data-export data-dfn-type="${s}">${e}</dfn>`;return registerDefinition(n,[o]),decorateDfn(n,t,r,o),n}const a=hyperHTML$1`<a
    data-idl="${t.partial?"partial":null}"
    data-link-type="${s}"
    data-title="${t.name}"
    data-xref-type="${s}"
    >${e}</a>`;if(o&&"typedef"!==t.type&&!(t.partial&&!i)){showInlineWarning(a,`Missing \`<dfn>\` for${r?` \`${r}\`'s`:""} \`${"operation"===t.type?`${o}()`:o}\` ${t.type}. [More info](https://github.com/w3c/respec/wiki/WebIDL-thing-is-not-defined).`,"")}return a}function getDfnType(e){switch(e){case"operation":return"method";case"field":return"dict-member";case"callback interface":case"interface mixin":return"interface";default:return e}}function getIdlDefinitionClassName(e){switch(e.type){case"callback interface":return"idlInterface";case"operation":return"idlMethod";case"field":return"idlMember";case"enum-value":return"idlEnumItem";case"callback function":return"idlCallback"}return`idl${e.type[0].toUpperCase()}${e.type.slice(1)}`}const nameResolverMap=new WeakMap;function getNameAndId(e,t=""){if(nameResolverMap.has(e))return nameResolverMap.get(e);const n=resolveNameAndId(e,t);return nameResolverMap.set(e,n),n}function resolveNameAndId(e,t){let n=getDefnName(e),r=getIdlId(n,t);switch(e.type){case"callback interface":case"dictionary":case"interface":case"interface mixin":r+=resolvePartial(e);break;case"constructor":case"operation":{const o=resolveOverload(n,t);o?(n+=o,r+=o):e.arguments.length&&(r+=e.arguments.map(e=>`-${e.name.toLowerCase()}`).join(""));break}}return{name:n,idlId:r}}function resolvePartial(e){return e.partial?(idlPartials[e.name]||(idlPartials[e.name]=0),idlPartials[e.name]+=1,`-partial-${idlPartials[e.name]}`):""}function resolveOverload(e,t){const n=`${t}.${e}`,r=`${n}()`;let o;return operationNames[r]||(operationNames[r]=0),operationNames[n]?o=`!overload-${operationNames[n]}`:operationNames[n]=0,operationNames[r]+=1,operationNames[n]+=1,o||""}function getIdlId(e,t){return t?`idl-def-${t.toLowerCase()}-${e.toLowerCase()}`:`idl-def-${e.toLowerCase()}`}function getDefnName(e){switch(e.type){case"enum-value":return e.value;case"operation":return e.name;default:return e.name||e.type}}function renderWebIDL(e,t){let n;try{n=webidl2.parse(e.textContent,{sourceName:String(t)})}catch(t){return showInlineError(e,`Failed to parse WebIDL: ${t.bareMessage}.`,t.bareMessage,{details:`<pre>${t.context}</pre>`}),[]}e.classList.add("def","idl");const r=webidl2.write(n,{templates:templates$1});hyperHTML$1.bind(e)`${r}`,e.querySelectorAll("[data-idl]").forEach(e=>{if(e.dataset.dfnFor)return;const t=e.dataset.title,n=e.parentElement.closest("[data-idl][data-title]");n&&(e.dataset.dfnFor=n.dataset.title),registerDefinition(e,[t])});const o=e.closest("[data-cite], body"),{dataset:i}=o;if(i.cite||(i.cite="WebIDL"),!/\bwebidl\b/i.test(i.cite)){const e=i.cite.trim().split(/\s+/);i.cite=["WebIDL",...e].join(" ")}return addIDLHeader(e),n}function addIDLHeader(e){addHashId(e,"webidl");const t=hyperHTML$1`<div class="idlHeader"><a
      class="self-link"
      href="${`#${e.id}`}"
    >WebIDL</a></div>`;e.prepend(t),addCopyIDLButton(t)}const cssPromise$2=loadStyle$4();async function loadStyle$4(){try{return(await Promise.resolve().then((function(){return webidl$2}))).default}catch{return fetchAsset("webidl.css")}}async function run$o(){const e=document.querySelectorAll("pre.idl, pre.webidl");if(!e.length)return;if(!document.querySelector(".idl:not(pre), .webidl:not(pre)")){const e=document.querySelector("head link");if(e){const t=document.createElement("style");t.textContent=await cssPromise$2,e.before(t)}}const t=[...e].map(renderWebIDL),n=webidl2.validate(t);for(const r of n){let n=`<pre>${r.context}</pre>`;if(r.autofix){r.autofix(),n+=`Try fixing as:\n      <pre>${xmlEscape(webidl2.write(t[r.sourceName]))}</pre>`}showInlineError(e[r.sourceName],`WebIDL validation error: ${r.bareMessage}`,r.bareMessage,{details:n})}document.normalize()}var webidl=Object.freeze({__proto__:null,name:name$B,addIDLHeader:addIDLHeader,run:run$o});const name$C="core/data-cite";function requestLookup(e){const t=citeDetailsConverter(e);return async n=>{const r=n.dataset.cite,{key:o,frag:i,path:s}=t(n);let a="",c="";if(o.toLowerCase()===e.shortName.toLowerCase())console.log(n,`The reference "${o}" is resolved into the current document per \`conf.shortName\`.`),a=document.location.href;else{const e=await resolveRef(o);if(cleanElement(n),!e)return void showInlineWarning(n,`Couldn't find a match for "${r}"`);a=e.href,c=e.title}if(s){const e=s.startsWith("/")?`.${s}`:s;a=new URL(e,a).href}switch(i&&(a=new URL(i,a).href),n.localName){case"a":if(""===n.textContent&&"the-empty-string"!==n.dataset.lt&&(n.textContent=c),n.href=a,!s&&!i){const e=document.createElement("cite");n.replaceWith(e),e.append(n)}break;case"dfn":{const e=document.createElement("a");if(e.href=a,n.textContent?wrapInner(n,e):(e.textContent=c,n.append(e)),!s&&!i){const t=document.createElement("cite");t.append(e),n.append(t)}"export"in n.dataset&&(showInlineError(n,"Exporting an linked external definition is not allowed. Please remove the `data-export` attribute","Please remove the `data-export` attribute."),delete n.dataset.export),n.dataset.noExport="";break}}}}function cleanElement(e){["data-cite","data-cite-frag"].filter(t=>e.hasAttribute(t)).forEach(t=>e.removeAttribute(t))}function makeComponentFinder(e){return t=>{const n=t.search(e);return-1!==n?t.substring(n):""}}function citeDetailsConverter(e){const t=makeComponentFinder("#"),n=makeComponentFinder("/");return function r(o){const{dataset:i}=o,{cite:s,citeFrag:a,citePath:c}=i;if(s.startsWith("#")&&!a){const t=o.parentElement.closest('[data-cite]:not([data-cite^="#"])'),{key:n,isNormative:a}=t?r(t):{key:e.shortName||"",isNormative:!1};return i.cite=a?n:`?${n}`,i.citeFrag=s.replace("#",""),r(o)}const l=a?`#${a}`:t(s),u=c||n(s).split("#")[0],{type:d}=refTypeFromContext(s,o),p="normative"===d,h=/^[?|!]/.test(s);return{key:s.split(/[/|#]/)[0].substring(Number(h)),isNormative:p,frag:l,path:u}}}async function run$p(e){const t=citeDetailsConverter(e),n=document.querySelectorAll("dfn[data-cite], a[data-cite]");Array.from(n).filter(e=>e.dataset.cite).map(t).filter(({key:t})=>t.toLowerCase()!==(e.shortName||"").toLowerCase()).forEach(({isNormative:t,key:n})=>{t||e.normativeReferences.has(n)?(e.normativeReferences.add(n),e.informativeReferences.delete(n)):e.informativeReferences.add(n)})}async function linkInlineCitations(e,t=respecConfig){const n=requestLookup(t),r=[...e.querySelectorAll("dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])")],o=citeDetailsConverter(t),i=r.map(o).map(async e=>{return{entry:e,result:await resolveRef(e.key)}}),s=(await Promise.all(i)).filter(({result:e})=>null===e).map(({entry:{key:e}})=>e),a=await updateFromNetwork(s);a&&Object.assign(biblio,a);const c=[...new Set(r)].map(n);return await Promise.all(c)}var dataCite=Object.freeze({__proto__:null,name:name$C,run:run$p,linkInlineCitations:linkInlineCitations});const name$D="core/webidl-index";function run$q(){const e=document.querySelector("section#idl-index");if(!e)return;const t=[2,3,4,5,6].map(e=>`h${e}:first-child`).join(",");if(!e.querySelector(t)){const t=document.createElement("h2");e.title?(t.textContent=e.title,e.removeAttribute("title")):t.textContent="IDL Index",e.prepend(t)}const n=Array.from(document.querySelectorAll("pre.def.idl:not(.exclude)")).filter(e=>!e.closest(nonNormativeSelector));if(0===n.length){const t="This specification doesn't declare any Web IDL.";return void e.append(t)}const r=document.createElement("pre");r.classList.add("idl","def"),r.id="actual-idl-index",n.map(e=>{const t=document.createDocumentFragment();for(const n of e.children)t.appendChild(n.cloneNode(!0));return t}).forEach(e=>{r.lastChild&&r.append("\n\n"),r.appendChild(e)}),r.querySelectorAll("*[id]").forEach(e=>e.removeAttribute("id")),r.querySelectorAll(".idlHeader").forEach(e=>e.remove()),e.appendChild(r),addIDLHeader(r)}var webidlIndex=Object.freeze({__proto__:null,name:name$D,run:run$q});const VERSION_CHECK_WAIT=18e6;async function getIdbCache(){const e=await idb.openDB("xref",1,{upgrade(e){e.createObjectStore("xrefs")}});return new IDBKeyVal(e,"xrefs")}async function resolveXrefCache(e){try{const t=await getIdbCache();return await resolveFromCache(e,t)}catch(e){return console.error(e),new Map}}async function resolveFromCache(e,t){return await shouldBustCache(t)?(await t.clear(),new Map):await t.getMany(e.map(e=>e.id))}async function shouldBustCache(e){const t=await e.get("__LAST_VERSION_CHECK__"),n=Date.now();if(!t)return await e.set("__LAST_VERSION_CHECK__",n),!1;if(n-t<VERSION_CHECK_WAIT)return!1;const r=new URL("meta/version",API_URL).href,o=await fetch(r);if(!o.ok)return!1;const i=await o.text();return await e.set("__LAST_VERSION_CHECK__",n),parseInt(i,10)>t}async function cacheXrefData(e){try{const t=await getIdbCache();await t.addMany(e)}catch(e){console.error(e)}}const profiles={"web-platform":["HTML","INFRA","URL","WEBIDL","DOM","FETCH"]},API_URL="https://respec.org/xref/";if(!document.querySelector("link[rel='preconnect'][href='https://respec.org']")){const e=createResourceHint({hint:"preconnect",href:"https://respec.org"});document.head.appendChild(e)}async function run$r(e,t){const n=normalizeConfig(e.xref);if(n.specs){const e=document.body.dataset.cite?document.body.dataset.cite.split(/\s+/):[];document.body.dataset.cite=e.concat(n.specs).join(" ")}if(!t.length)return;const r=[];for(const e of t){const t=getRequestEntry(e),n=await objectHash(t);r.push({...t,id:n})}addDataCiteToTerms(t,r,await getData(r,n.url),e)}function normalizeConfig(e){const t={url:API_URL,specs:null},n=Object.assign({},t);switch(Array.isArray(e)?"array":typeof e){case"boolean":break;case"string":e.toLowerCase()in profiles?Object.assign(n,{specs:profiles[e.toLowerCase()]}):r(e);break;case"array":Object.assign(n,{specs:e});break;case"object":if(Object.assign(n,e),e.profile){const t=e.profile.toLowerCase();if(t in profiles){const r=(e.specs||[]).concat(profiles[t]);Object.assign(n,{specs:r})}else r(e.profile)}break;default:pub("error",`Invalid value for \`xref\` configuration option. Received: "${e}".`)}return n;function r(e){pub("error",`Invalid profile "${e}" in \`respecConfig.xref\`. `+`Please use one of the supported profiles: ${Object.keys(profiles).map(e=>`"${e}"`).join(", ")}.`)}}function getRequestEntry(e){const t="xrefType"in e.dataset;let n=getTermFromElement(e);t||(n=n.toLowerCase());const r=[];let o=e.closest("[data-cite]");for(;o;){const t=o.dataset.cite.toLowerCase().replace(/[!?]/g,"").split(/\s+/).filter(e=>e);if(t.length&&r.push(t.sort()),o===e)break;o=o.parentElement.closest("[data-cite]")}if(e.closest("[data-cite]")!==e){const t=e.closest("section"),n=[...t?t.querySelectorAll("a.bibref"):[]].map(e=>e.textContent.toLowerCase()),o=[...new Set(n)].sort();o.length&&r.unshift(o)}const i=[];t?e.dataset.xrefType?i.push(...e.dataset.xrefType.split("|")):i.push("_IDL_"):i.push("_CONCEPT_");let{xrefFor:s}=e.dataset;if(!s&&t){const t=e.closest("[data-xref-for]");t&&(s=norm(t.dataset.xrefFor))}else s&&"string"==typeof s&&(s=norm(s));return{term:n,types:i,...r.length&&{specs:r},..."string"==typeof s&&{for:s}}}function getTermFromElement(e){const{lt:t}=e.dataset;let n=t?t.split("|",1)[0]:e.textContent;return n=norm(n),"the-empty-string"===n?"":n}async function getData(e,t){const n=new Set,r=e.filter(e=>!n.has(e.id)&&(n.add(e.id)&&!0)),o=await resolveXrefCache(r),i=r.filter(e=>!o.get(e.id)),s=await fetchFromNetwork(i,t);return s.size&&await cacheXrefData(s),new Map([...o,...s])}async function fetchFromNetwork(e,t){if(!e.length)return new Map;const n={keys:e},r={method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}},o=await fetch(t,r),i=await o.json();return new Map(i.result)}function isNormative(e){const t=e.closest(".normative"),n=e.closest(nonNormativeSelector);return!n||e===t||t&&n&&n.contains(t)}function addDataCiteToTerms(e,t,n,r){const o={ambiguous:new Map,notFound:new Map};for(let i=0,s=e.length;i<s;i++){if(e[i].closest("[data-no-xref]"))continue;const s=e[i],a=t[i],{id:c}=a,l=n.get(c);if(1===l.length)addDataCite(s,a,l[0],r);else{const e=o[0===l.length?"notFound":"ambiguous"];e.has(c)||e.set(c,{elems:[],results:l,query:a}),e.get(c).elems.push(s)}}showErrors(o)}function addDataCite(e,t,n,r){const{term:o}=t,{uri:i,shortname:s,normative:a,type:c}=n,l=i.includes("/")?i.split("/",1)[1]:i,[u,d]=l.split("#"),p={cite:s,citePath:u,citeFrag:d,type:c};Object.assign(e.dataset,p),addToReferences(e,s,a,o,r)}function addToReferences(e,t,n,r,o){if(!isNormative(e))return void(o.normativeReferences.has(t)||o.informativeReferences.add(t));if(n){const e=o.informativeReferences.has(t)?o.informativeReferences.getCanonicalKey(t):t;return o.normativeReferences.add(e),void o.informativeReferences.delete(e)}showInlineWarning(e,`Adding an informative reference to "${r}" from "${t}" `+"in a normative section","Error: Informative reference in normative section")}function showErrors({ambiguous:e,notFound:t}){const n=(e,t,n=[])=>{const r=new URL(API_URL);return r.searchParams.set("term",e),t.for&&r.searchParams.set("for",t.for),r.searchParams.set("types",t.types.join(",")),n.length&&r.searchParams.set("cite",n.join(",")),r};for(const{query:e,elems:r}of t.values()){const t=[...new Set(flatten$1([],e.specs))].sort(),o=getTermFromElement(r[0]),i=n(o,e,t);showInlineError(r,`Couldn't match "**${o}**" to anything in the document or in any other document cited in this specification: ${t.map(e=>`\`${e}\``).join(", ")}. `+`See [how to cite to resolve the error](${i})`,"Error: No matching dfn found.")}for(const{query:t,elems:r,results:o}of e.values()){const e=[...new Set(o.map(e=>e.shortname))].sort(),i=e.map(e=>`**${e}**`).join(", "),s=getTermFromElement(r[0]);showInlineError(r,`The term "**${s}**" is defined in ${i} in multiple ways, so it's ambiguous. `+`See [how to cite to resolve the error](${n(s,t,e)})`,"Error: Linking an ambiguous dfn.")}}function objectHash(e){const t=JSON.stringify(e,Object.keys(e).sort()),n=(new TextEncoder).encode(t);return crypto.subtle.digest("SHA-1",n).then(bufferToHexString)}function bufferToHexString(e){return[...new Uint8Array(e)].map(e=>e.toString(16).padStart(2,"0")).join("")}const name$E="core/link-to-dfn",localizationStrings$9={en:{duplicateMsg:e=>`Duplicate definition(s) of '${e}'`,duplicateTitle:"This is defined more than once in the document."}},l10n$b=getIntlData(localizationStrings$9);class CaseInsensitiveMap extends Map{constructor(e=[]){return super(),e.forEach(([e,t])=>{this.set(e,t)}),this}set(e,t){return super.set(e.toLowerCase(),t),this}get(e){return super.get(e.toLowerCase())}has(e){return super.has(e.toLowerCase())}delete(e){return super.delete(e.toLowerCase())}}async function run$s(e){const t=mapTitleToDfns(),n=[],r=[];if(document.querySelectorAll("a[data-cite=''], a:not([href]):not([data-cite]):not(.logo):not(.externalDFN)").forEach(e=>{const o=getLinkTargets(e);o.some(r=>findLinkTarget(r,e,t,n))||0===o.length||(""===e.dataset.cite?r.push(e):n.push(e))}),showLinkingError(r),e.xref){n.push(...findExplicitExternalLinks());try{await run$r(e,n)}catch(e){console.error(e),showLinkingError(n)}}else showLinkingError(n);await linkInlineCitations(document,e),pub("end","core/link-to-dfn")}function mapTitleToDfns(){const e=new CaseInsensitiveMap;return Object.keys(definitionMap).forEach(t=>{const{result:n,duplicates:r}=collectDfns(t);e.set(t,n),r.length>0&&showInlineError(r,l10n$b.duplicateMsg(t),l10n$b.duplicateTitle)}),e}function collectDfns(e){const t=new Map,n=[];return definitionMap[e].forEach(r=>{const{dfnFor:o=""}=r.dataset;if(t.has(o)){const e="dfn"===t.get(o).localName,i="dfn"===r.localName;if(e){if(!i)return;n.push(r)}}t.set(o,r),addId(r,"dfn",e)}),{result:t,duplicates:n}}function findLinkTarget(e,t,n,r){const{linkFor:o}=t.dataset;if(!n.has(e.title)||!n.get(e.title).get(e.for))return!1;const i=n.get(e.title).get(e.for);if(i.dataset.cite)t.dataset.cite=i.dataset.cite;else if(o&&!n.get(o))r.push(t);else if(i.classList.contains("externalDFN")){const e=i.dataset.lt?i.dataset.lt.split("|"):[];t.dataset.lt=e[0]||i.textContent,r.push(t)}else"partial"===t.dataset.idl?r.push(t):(t.href=`#${i.id}`,t.classList.add("internalDFN"));return t.hasAttribute("data-link-type")||(t.dataset.linkType="idl"in i.dataset?"idl":"dfn"),isCode(i)&&wrapAsCode(t,i),!0}function isCode(e){if(e.closest("code,pre"))return!0;if(1!==e.childNodes.length)return!1;const[t]=e.childNodes;return"code"===t.localName}function wrapAsCode(e,t){const n=e.textContent.trim(),r=t.dataset.hasOwnProperty("idl"),o=shouldWrapByCode(e)||shouldWrapByCode(t,n);r&&!o||wrapInner(e,document.createElement("code"))}function shouldWrapByCode(e,t=""){switch(e.localName){case"a":if(e.querySelector("code"))return!0;break;default:{const{dataset:n}=e;if(e.textContent.trim()===t)return!0;if(n.title===t)return!0;if(n.lt||n.localLt){const e=[];return n.lt&&e.push(...n.lt.split("|")),n.localLt&&e.push(...n.localLt.split("|")),e.includes(t)}}}return!1}function findExplicitExternalLinks(){const e=document.querySelectorAll("a[data-cite]:not([data-cite='']):not([data-cite*='#']), dfn[data-cite]:not([data-cite='']):not([data-cite*='#'])"),t=document.querySelectorAll("dfn.externalDFN");return[...e].filter(e=>{if(""===e.textContent.trim())return!1;const t=e.closest("[data-cite]");return!t||""!==t.dataset.cite}).concat(...t)}function showLinkingError(e){e.forEach(e=>{showInlineWarning(e,`Found linkless \`<a>\` element with text "${e.textContent}" but no matching \`<dfn>\``,"Linking error: not matching `<dfn>`")})}var linkToDfn=Object.freeze({__proto__:null,name:name$E,run:run$s});const name$F="core/contrib";async function run$t(e){if(!document.getElementById("gh-contributors"))return;if(!e.github){return void pub("error","Requested list of contributors from GitHub, but [`github`](https://github.com/w3c/respec/wiki/github) configuration option is not set.")}const t=e.editors.map(e=>e.name),n=`${e.github.apiBase}/${e.github.fullName}/`;await showContributors(t,n)}async function showContributors(e,t){const n=document.getElementById("gh-contributors");if(!n)return;n.textContent="Fetching list of contributors...";const r=await async function(){const{href:n}=new URL("contributors",t);try{const t=await fetchAndCache(n);if(!t.ok)throw new Error(`Request to ${n} failed with status code ${t.status}`);return(await t.json()).filter(t=>!e.includes(t.name||t.login))}catch(e){return pub("error","Error loading contributors from GitHub."),console.error(e),null}}();null!==r?toHTML(r,n):n.textContent="Failed to fetch contributors."}function toHTML(e,t){const n=e.sort((e,t)=>{const n=e.name||e.login,r=t.name||t.login;return n.toLowerCase().localeCompare(r.toLowerCase())});if("UL"===t.tagName)return void hyperHTML$1(t)`${n.map(({name:e,login:t})=>`<li><a href="https://github.com/${t}">${e||t}</a></li>`)}`;const r=n.map(e=>e.name||e.login);t.textContent=joinAnd(r)}var contrib=Object.freeze({__proto__:null,name:name$F,run:run$t});const name$G="core/fix-headers";function run$u(){[...document.querySelectorAll("section:not(.introductory)")].map(e=>e.querySelector("h1, h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{renameElement(e,`h${Math.min(getParents(e,"section").length+1,6)}`)})}function getParents(e,t){const n=[];for(;e!=e.ownerDocument.body;)e.matches(t)&&n.push(e),e=e.parentElement;return n}var fixHeaders=Object.freeze({__proto__:null,name:name$G,run:run$u});const lowerHeaderTags=["h2","h3","h4","h5","h6"],headerTags=["h1",...lowerHeaderTags],alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ",name$H="core/structure",localizationStrings$a={en:{toc:"Table of Contents"},nl:{toc:"Inhoudsopgave"},es:{toc:"Tabla de Contenidos"}},l10n$c=getIntlData(localizationStrings$a);function scanSections(e,t,{prefix:n=""}={}){let r=!1,o=0,i=1;if(n.length&&!n.endsWith(".")&&(n+="."),0===e.length)return null;const s=hyperHTML$1`<ol class='toc'>`;for(const a of e){!a.isAppendix||n||r||(o=i,r=!0);let e=a.isIntro?"":r?alphabet.charAt(i-o):n+i;const c=Math.ceil(e.length/2);if(1===c&&(e+=".",a.header.before(document.createComment("OddPage"))),a.isIntro||(i+=1,a.header.prepend(hyperHTML$1`<bdi class='secno'>${e} </bdi>`)),c<=t){const n=a.header.id||a.element.id,r=createTocListItem(a.header,n),o=scanSections(a.subsections,t,{prefix:e});o&&r.append(o),s.append(r)}}return s}function getSectionTree(e,{tocIntroductory:t=!1}={}){const n=children(e,t?"section":"section:not(.introductory)"),r=[];for(const e of n){const n=e.classList.contains("notoc");if(!e.children.length||n)continue;const o=e.children[0];if(!lowerHeaderTags.includes(o.localName))continue;const i=o.textContent;addId(e,null,i),r.push({element:e,header:o,title:i,isIntro:e.classList.contains("introductory"),isAppendix:e.classList.contains("appendix"),subsections:getSectionTree(e,{tocIntroductory:t})})}return r}function createTocListItem(e,t){const n=hyperHTML$1`<a href="${`#${t}`}" class="tocxref"/>`;return n.append(...e.cloneNode(!0).childNodes),filterHeader(n),hyperHTML$1`<li class='tocline'>${n}</li>`}function filterHeader(e){e.querySelectorAll("a").forEach(e=>{const t=renameElement(e,"span");t.className="formerLink",t.removeAttribute("href")}),e.querySelectorAll("dfn").forEach(e=>{renameElement(e,"span").removeAttribute("id")})}function run$v(e){if("tocIntroductory"in e==!1&&(e.tocIntroductory=!1),"maxTocLevel"in e==!1&&(e.maxTocLevel=1/0),renameSectionHeaders(),!e.noTOC){const t=scanSections(getSectionTree(document.body,{tocIntroductory:e.tocIntroductory}),e.maxTocLevel);t&&createTableOfContents(t)}}function renameSectionHeaders(){const e=getNonintroductorySectionHeaders();e.length&&e.forEach(e=>{const t=`h${Math.min(parents(e,"section").length+1,6)}`;e.localName!==t&&renameElement(e,t)})}function getNonintroductorySectionHeaders(){const e=headerTags.map(e=>`section:not(.introductory) ${e}:first-child`).join(",");return[...document.querySelectorAll(e)].filter(e=>!e.closest("section.introductory"))}function createTableOfContents(e){if(!e)return;const t=hyperHTML$1`<nav id="toc">`,n=hyperHTML$1`<h2 class="introductory">${l10n$c.toc}</h2>`;addId(n),t.append(n,e);const r=document.getElementById("toc")||document.getElementById("sotd")||document.getElementById("abstract");r&&("toc"===r.id?r.replaceWith(t):r.after(t));const o=hyperHTML$1`<p role='navigation' id='back-to-top'><a href='#title'><abbr title='Back to Top'>&uarr;</abbr></a></p>`;document.body.append(o)}var structure$1=Object.freeze({__proto__:null,name:name$H,run:run$v});const name$I="core/informative",localizationStrings$b={en:{informative:"This section is non-normative."},nl:{informative:"Dit onderdeel is niet normatief."}},l10n$d=getIntlData(localizationStrings$b);function run$w(){Array.from(document.querySelectorAll("section.informative")).map(e=>e.querySelector("h2, h3, h4, h5, h6")).filter(e=>e).forEach(e=>{e.after(hyperHTML$1`<p><em>${l10n$d.informative}</em></p>`)})}var informative=Object.freeze({__proto__:null,name:name$I,run:run$w});const name$J="core/id-headers";function run$x(e){const t=document.querySelectorAll("section:not(.head):not(.introductory) h2, h3, h4, h5, h6");for(const n of t){let t=n.id;t||(addId(n),t=n.parentElement.id||n.id),e.addSectionLinks&&n.appendChild(hyperHTML$1`
      <a href="${`#${t}`}" class="self-link" aria-label="§"></a>
    `)}}var idHeaders=Object.freeze({__proto__:null,name:name$J,run:run$x});const name$K="core/caniuse",API_URL$1="https://respec.org/caniuse/",BROWSERS=new Map([["and_chr","Chrome (Android)"],["and_ff","Firefox (Android)"],["and_uc","UC Browser (Android)"],["android","Android"],["bb","Blackberry"],["chrome","Chrome"],["edge","Edge"],["firefox","Firefox"],["ie","IE"],["ios_saf","Safari (iOS)"],["op_mini","Opera Mini"],["op_mob","Opera Mobile"],["opera","Opera"],["safari","Safari"],["samsung","Samsung Internet"]]),supportTitles=new Map([["y","Supported."],["a","Almost supported (aka Partial support)."],["n","No support, or disabled by default."],["p","No support, but has Polyfill."],["u","Support unknown."],["x","Requires prefix to work."],["d","Disabled by default (needs to enabled)."]]);if(!document.querySelector("link[rel='preconnect'][href='https://respec.org']")){const e=createResourceHint({hint:"preconnect",href:"https://respec.org"});document.head.appendChild(e)}const caniuseCssPromise=loadStyle$5();async function loadStyle$5(){try{return(await Promise.resolve().then((function(){return caniuse$2}))).default}catch{return fetchAsset("caniuse.css")}}async function run$y(e){if(!e.caniuse)return;const t=getNormalizedConf(e);if(e.caniuse=t,!t.feature)return;const n=new URL(t.feature,"https://caniuse.com/").href,r=await caniuseCssPromise;document.head.appendChild(hyperHTML$1`
    <style class="removeOnSave">${r}</style>`);const o=document.querySelector(".head dl"),i=(async()=>{try{const e=t.apiURL||API_URL$1,r=await fetchStats(e,t);return createTableHTML(n,r)}catch(e){return console.error(e),pub("error",`Couldn't find feature "${t.feature}" on caniuse.com? `+"Please check the feature key on [caniuse.com](https://caniuse.com)"),hyperHTML$1`<a href="${n}">caniuse.com</a>`}})(),s=hyperHTML$1`
    <dt class="caniuse-title">Browser support:</dt>
    <dd class="caniuse-stats">${{any:i,placeholder:"Fetching data from caniuse.com..."}}</dd>`;o.append(...s.childNodes),await i,pub("amend-user-config",{caniuse:t.feature}),sub("beforesave",e=>{hyperHTML$1.bind(e.querySelector(".caniuse-stats"))`
      <a href="${n}">caniuse.com</a>`})}function getNormalizedConf(e){const t={versions:4};if("string"==typeof e.caniuse)return{feature:e.caniuse,...t};const n={...t,...e.caniuse},{browsers:r}=n;if(Array.isArray(r)){const e=r.filter(e=>!BROWSERS.has(e));if(e.length){pub("warn",`Ignoring invalid browser(s): ${e.map(e=>`"\`${e}\`"`).join(", ")} in `+"[`respecConfig.caniuse.browsers`](https://github.com/w3c/respec/wiki/caniuse)")}}return n}async function fetchStats(e,t){const{feature:n,versions:r,browsers:o}=t,i=new URLSearchParams;i.set("feature",n),i.set("versions",r),Array.isArray(o)&&i.set("browsers",o.join(","));const s=`${e}?${i.toString()}`,a=await fetch(s);return await a.json()}function createTableHTML(e,t){return hyperHTML$1`
    ${Object.entries(t).map(addBrowser)}
    <a href="${e}"
      title="Get details at caniuse.com">More info
    </a>`}function addBrowser([e,t]){const n=e=>{const t=e.filter(e=>supportTitles.has(e)).map(e=>supportTitles.get(e));return{className:`caniuse-cell ${e.join(" ")}`,title:t.join(" ")}},[r,...o]=t;return hyperHTML$1`
    <div class="caniuse-browser">
      ${(([t,r])=>{const{className:o,title:i}=n(r),s=`${BROWSERS.get(e)||e} ${t}`;return hyperHTML$1`
      <button class="${o}" title="${i}">${s}</button>`})(r)}
      <ul>
        ${o.map(([e,t])=>{const{className:r,title:o}=n(t);return hyperHTML$1`<li class="${r}" title="${o}">${e}</li>`})}
      </ul>
    </div>`}var caniuse=Object.freeze({__proto__:null,name:name$K,run:run$y});const name$L="core/mdn-annoatation",SPEC_MAP_URL="https://raw.githubusercontent.com/w3c/mdn-spec-links/master/SPECMAP.json",BASE_JSON_PATH="https://w3c.github.io/mdn-spec-links/",MDN_URL_BASE="https://developer.mozilla.org/en-US/docs/Web/",MDN_BROWSERS={chrome:"Chrome",chrome_android:"Chrome Android",edge:"Edge",edge_mobile:"Edge Mobile",firefox:"Firefox",firefox_android:"Firefox Android",ie:"Internet Explorer",opera:"Opera",opera_android:"Opera Android",safari:"Safari",safari_ios:"Safari iOS",samsunginternet_android:"Samsung Internet",webview_android:"WebView Android"},mdnCssPromise=loadStyle$6();async function loadStyle$6(){try{return(await Promise.resolve().then((function(){return mdnAnnotation$2}))).default}catch{return fetchAsset("mdn-annotation.css")}}function fetchAndCacheJson(e,t){return e?fetchAndCache(e,t).then(e=>e.json()):{}}function insertMDNBox(e){const t=e.closest("section"),{previousElementSibling:n,parentNode:r}=t;if(n&&n.classList.contains("mdn"))return n;const o=hyperHTML$1`<aside class="mdn before wrapped"></aside>`;return r.insertBefore(o,t),o}function attachMDNDetail(e,t){const{slug:n,summary:r}=t;e.innerHTML+='<button onclick="toggleMDNStatus(this.parentNode)" aria-label="Expand MDN details"><b>MDN</b></button>';const o=n.slice(n.indexOf("/")+1),i=hyperHTML$1`
    <div>
      <a title="${r}" href="${`${MDN_URL_BASE}${n}`}">${o}</a>
    </div>
  `;attachMDNBrowserSupport(i,t),e.appendChild(i)}function attachMDNBrowserSupport(e,t){if(!t.support)return void(e.innerHTML+='<p class="nosupportdata">No support data.</p>');const n=hyperHTML$1`<p class="mdnsupport">
    ${[buildBrowserSupportTable(t.support)]}
  </p>`;e.appendChild(n)}function buildBrowserSupportTable(e){let t="";function n(e,n,r){const o="Unknown"===n?"?":n,i=`\n      <span class="${`${e} ${n.toLowerCase()}`}">\n        <span class="browser-name">${MDN_BROWSERS[e]}</span>\n        <span class="version">${r||o}</span>\n      </span>`;t+=i}function r(e,t){if(t.version_removed)return void n(e,"No","");const r=t.version_added;r?"boolean"==typeof r?n(e,r?"Yes":"No",""):n(e,"Yes",`${r}+`):n(e,"Unknown","")}return Object.keys(MDN_BROWSERS).forEach(t=>{e[t]?Array.isArray(e[t])?e[t].forEach(e=>{r(t,e)}):r(t,e[t]):n(t,"Unknown","")}),t}async function run$z(e){const{shortName:t,mdn:n}=e;if(!t||!n)return;const r=n.maxAge||864e5,o=n.specMapUrl||SPEC_MAP_URL,i=n.baseJsonPath||BASE_JSON_PATH,s=await fetchAndCacheJson(o,r);if(!Object.values(s).some(e=>e===`${t}.json`))return;const a=await fetchAndCacheJson(`${i}/${t}.json`,r),c=await mdnCssPromise;document.head.appendChild(hyperHTML$1`<style>${[c]}</style>`),document.head.appendChild(hyperHTML$1`<script>
     function toggleMDNStatus(div) {
       div.parentNode.classList.toggle('wrapped');
     }
  </script>`),[...document.querySelectorAll("[id]")].filter(e=>{return-1===["STYLE","SCRIPT","BODY"].indexOf(e.tagName)&&a[e.id]&&Array.isArray(a[e.id])}).forEach(e=>{const t=a[e.id],n=insertMDNBox(e);t.map(e=>{const t=document.createElement("div");return attachMDNDetail(t,e),t}).forEach(e=>n.appendChild(e))})}var mdnAnnotation=Object.freeze({__proto__:null,name:name$L,run:run$z});const mimeTypes=new Map([["text/html","html"],["application/xml","xml"]]);function rsDocToDataURL(e,t=document){const n=mimeTypes.get(e);if(!n){const t=[...mimeTypes.values()].join(", ");throw new TypeError(`Invalid format: ${e}. Expected one of: ${t}.`)}const r=serialize(n,t);return`data:${e};charset=utf-8,${encodeURIComponent(r)}`}function serialize(e,t){const n=t.cloneNode(!0);cleanup(n);let r="";switch(e){case"xml":r=(new XMLSerializer).serializeToString(n);break;default:n.doctype&&(r+=(new XMLSerializer).serializeToString(n.doctype)),r+=n.documentElement.outerHTML}return r}function cleanup(e){const{head:t,body:n,documentElement:r}=e;removeCommentNodes(e),e.querySelectorAll(".removeOnSave, #toc-nav").forEach(e=>e.remove()),n.classList.remove("toc-sidebar"),removeReSpec(r);const o=e.createDocumentFragment(),i=e.querySelector("meta[name='viewport']");i&&t.firstChild!==i&&o.appendChild(i);let s=e.querySelector("meta[charset], meta[content*='charset=']");s||(s=hyperHTML$1`<meta charset="utf-8">`),o.appendChild(s);const a=`ReSpec ${window.respecVersion||"Developer Channel"}`,c=hyperHTML$1`
    <meta name="generator" content="${a}">
  `;o.appendChild(c),t.prepend(o),pub("beforesave",r)}expose("core/exporter",{rsDocToDataURL:rsDocToDataURL});const name$M="ui/save-html",epubURL=new URL("https://labs.w3.org/epub-generator/cgi-bin/epub-generator.py");epubURL.searchParams.append("type","respec"),epubURL.searchParams.append("url",document.location.href);const downloadLinks=[{id:"respec-save-as-html",fileName:"index.html",title:"HTML",type:"text/html",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-xml",fileName:"index.xhtml",title:"XML",type:"application/xml",get href(){return rsDocToDataURL(this.type)}},{id:"respec-save-as-epub",fileName:"spec.epub",title:"EPUB 3",type:"application/epub+zip",href:epubURL.href}];function toDownloadLink(e){const{id:t,href:n,fileName:r,title:o,type:i}=e;return hyperHTML$1`
    <a
      href="${n}"
      id="${t}"
      download="${r}"
      type="${i}"
      class="respec-save-button"
      onclick=${()=>ui.closeModal()}
    >${o}</a>`}const saveDialog={async show(e){await document.respecIsReady;const t=hyperHTML$1`
      <div class="respec-save-buttons">
        ${downloadLinks.map(toDownloadLink)}
      </div>`;ui.freshModal(l10n[lang].save_snapshot,t,e)}},supportsDownload="download"in HTMLAnchorElement.prototype;let button;function show(){supportsDownload&&saveDialog.show(button)}function exportDocument(e,t){const n="Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed. Use core/exporter `rsDocToDataURL()` instead.";return pub("warn",n),console.warn(n),rsDocToDataURL(t)}supportsDownload&&(button=ui.addCommand(l10n[lang].save_snapshot,show,"Ctrl+Shift+Alt+S","💾"));var saveHtml=Object.freeze({__proto__:null,name:name$M,exportDocument:exportDocument});const button$1=ui.addCommand(l10n[lang].search_specref,show$1,"Ctrl+Shift+Alt+space","🔎"),specrefURL="https://specref.herokuapp.com/",refSearchURL=`${specrefURL}search-refs`,reveseLookupURL=`${specrefURL}reverse-lookup`,form=document.createElement("form"),renderer=hyperHTML$1.bind(form),resultList=hyperHTML$1.bind(document.createElement("div"));function renderResults(e,t,n){if(!e.size)return resultList`
      <p class="state">
        Your search - <strong> ${t} </strong> -
        did not match any references.
      </p>
    `;const r=Array.from(e).slice(0,99).map(toDefinitionPair).reduce((e,t)=>e.concat(t),[]);return resultList`
    <p class="result-stats">
      ${e.size} results (${n} seconds).
      ${e.size>99?"First 100 results.":""}
    </p>
    <dl class="specref-results">${r}</dl>
  `}function toDefinitionPair([e,t]){return hyperHTML$1.wire(t)`
    <dt>
      [${e}]
    </dt>
    <dd>${wireReference(t)}</dd>
  `}function resultProcessor({includeVersions:e=!1}={}){return(...t)=>{const n=Object.assign({},...t),r=new Map(Object.entries(n));return Array.from(r).filter(([,e])=>e.aliasOf).map(([e])=>e).reduce((e,t)=>e.delete(t)&&e,r),e||Array.from(r.values()).filter(e=>"object"==typeof e&&"versions"in e).reduce(flatten$1,[]).forEach(e=>{r.delete(e)}),Array.from(r).filter(([,e])=>"object"!=typeof e).forEach(([e])=>r.delete(e)),r}}function show$1(){render(),ui.freshModal(l10n[lang].search_specref,form,button$1),form.querySelector("input[type=search]").focus()}form.id="specref-ui",form.addEventListener("submit",async e=>{e.preventDefault();const{searchBox:t}=form,n=t.value;if(!n)return void t.focus();render({state:"Searching Specref…"});const r=new URL(refSearchURL);r.searchParams.set("q",n);const o=new URL(reveseLookupURL);o.searchParams.set("urls",n);try{const e=performance.now(),i=await Promise.all([fetch(r).then(e=>e.json()),fetch(o).then(e=>e.json())]),{checked:s}=form.includeVersions;render({query:n,results:resultProcessor({includeVersions:s})(...i),state:"",timeTaken:Math.round(performance.now()-e)/1e3})}catch(e){console.error(e),render({state:"Error! Couldn't do search."})}finally{t.focus()}});const mast=hyperHTML$1.wire()`
=======
        `
      : null}
  `;
  conformance.prepend(...content.childNodes);
}

function run$h(conf) {
  const conformance = document.querySelector("section#conformance");
  if (conformance) {
    processConformance(conformance, conf);
  }
  // Added message for legacy compat with Aria specs
  // See https://github.com/w3c/respec/issues/793
  pub("end", name$s);
}

var conformance = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$s,
  run: run$h
});

// @ts-check

const name$t = "core/dfn";

function run$i() {
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
  name: name$t,
  run: run$i
});

// @ts-check

const name$u = "core/pluralize";

function run$j(conf) {
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
  name: name$u,
  run: run$j
});

// @ts-check

const name$v = "core/examples";

const localizationStrings$3 = {
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

const lang$b = lang in localizationStrings$3 ? lang : "en";

const l10n$5 = localizationStrings$3[lang$b];

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
    <div class="marker">
      <a class="self-link">${l10n$5.example}<bdi>${number}</bdi></a
      >${title}
    </div>
  `;
}

async function run$k() {
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
  name: name$v,
  run: run$k
});

// @ts-check

const name$w = "core/issues-notes";

const localizationStrings$4 = {
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

const lang$c = lang in localizationStrings$4 ? lang : "en";

const l10n$6 = localizationStrings$4[lang$c];

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
  const isFeatureAtRisk = inno.classList.contains("atrisk");
  const type = isIssue
    ? "issue"
    : isWarning
    ? "warning"
    : isEdNote
    ? "ednote"
    : "note";
  const displayType = isIssue
    ? isFeatureAtRisk
      ? conf.l10n.feature_at_risk
      : conf.l10n.issue
    : isWarning
    ? conf.l10n.warning
    : isEdNote
    ? conf.l10n.editors_note
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
  return hyperHTML$1`<span class="issue-label">: ${title}${labelsGroup}</span>`;
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

async function run$l(conf) {
  const query = ".issue, .note, .warning, .ednote";
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
  name: name$w,
  run: run$l
});

// @ts-check

const name$x = "core/requirements";

function run$m() {
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
  name: name$x,
  run: run$m
});

// @ts-check

const name$y = "core/best-practices";

const localizationStrings$5 = {
  en: {
    best_practice: "Best Practice ",
  },
};
const lang$d = lang in localizationStrings$5 ? lang : "en";

function run$n() {
  /** @type {NodeListOf<HTMLElement>} */
  const bps = document.querySelectorAll(".practicelab");
  const l10n = localizationStrings$5[lang$d];
  const bpSummary = document.getElementById("bp-summary");
  const summaryItems = bpSummary ? document.createElement("ul") : null;
  [...bps].forEach((bp, num) => {
    const id = addId(bp, "bp");
    const localizedBpName = hyperHTML$1`
      <a class="marker self-link" href="${`#${id}`}"><bdi lang="${lang$d}">${
      l10n.best_practice
    }${num + 1}</bdi></a>`;

    // Make the summary items, if we have a summary
    if (summaryItems) {
      const li = hyperHTML$1`
        <li>
          ${localizedBpName}: ${makeSafeCopy(bp)}
        </li>
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
  name: name$y,
  run: run$n
});

// @ts-check

const name$z = "core/figures";

const localizationStrings$6 = {
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

const lang$e = lang in localizationStrings$6 ? lang : "en";

const l10n$7 = localizationStrings$6[lang$e];

function run$o() {
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
  document.querySelectorAll("figure").forEach((fig, i) => {
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
  name: name$z,
  run: run$o
});

// @ts-check

const topLevelEntities = new Set([
  "callback interface",
  "callback",
  "dictionary",
  "enum",
  "interface mixin",
  "interface",
  "typedef",
]);

/**
 * This function looks for a <dfn> element whose title is 'name' and
 * that is "for" 'parent', which is the empty string when 'name'
 * refers to a top-level entity. For top-level entities, <dfn>
 * elements that inherit a non-empty [dfn-for] attribute are also
 * counted as matching.
 *
 * When a matching <dfn> is found, it's given <code> formatting,
 * marked as an IDL definition, and returned. If no <dfn> is found,
 * the function returns 'undefined'.
 * @param {*} defn
 * @param {string} name
 */
function findDfn(defn, name, { parent = "" } = {}) {
  switch (defn.type) {
    case "constructor":
    case "operation":
      return findOperationDfn(defn, parent, name);
    default:
      return findNormalDfn(defn, parent, name);
  }
}

/**
 * @param {string} type
 * @param {string} parent
 * @param {string} name
 */
function getAlternativeNames(type, parent, name) {
  const asQualifiedName = `${parent}.${name}`;
  switch (type) {
    case "constructor":
    case "operation": {
      // Allow linking to both "method()" and "method" name.
      const asMethodName = `${name}()`;
      const asFullyQualifiedName = `${asQualifiedName}()`;
      return [asFullyQualifiedName, asQualifiedName, asMethodName, name];
    }
    case "attribute":
      return [asQualifiedName, name];
  }
}

/**
 * @param {*} defn
 * @param {string} parent
 * @param {string} name
 */
function findOperationDfn(defn, parent, name) {
  // Overloads all have unique names
  if (name.includes("!overload")) {
    return findNormalDfn(defn, parent, name);
  }
  const asMethodName = `${name}()`;
  return findNormalDfn(defn, parent, asMethodName, name);
}

/**
 * @param {HTMLElement} dfn
 * @param {string[]} names
 */
function addAlternativeNames(dfn, names) {
  const lt = dfn.dataset.lt ? dfn.dataset.lt.split("|") : [];
  lt.push(...names);
  dfn.dataset.lt = [...new Set(lt)].join("|");
  registerDefinition(dfn, names);
}

/**
 * @param {*} defn
 * @param {string} parent
 * @param {...string} names
 */
function findNormalDfn(defn, parent, ...names) {
  for (const name of names) {
    let resolvedName =
      defn.type === "enum-value" && name === ""
        ? "the-empty-string"
        : name.toLowerCase();
    let dfnForArray = definitionMap[resolvedName];
    let dfns = getDfns(dfnForArray, parent, name, defn.type);
    // If we haven't found any definitions with explicit [for]
    // and [title], look for a dotted definition, "parent.name".
    if (dfns.length === 0 && parent !== "") {
      resolvedName = `${parent}.${resolvedName}`;
      dfnForArray = definitionMap[resolvedName.toLowerCase()];
      if (dfnForArray !== undefined && dfnForArray.length === 1) {
        dfns = dfnForArray;
        // Found it: register with its local name
        delete definitionMap[resolvedName];
        registerDefinition(dfns[0], [resolvedName]);
      }
    } else {
      resolvedName = name;
    }
    if (dfns.length > 1) {
      const msg = `WebIDL identifier \`${name}\` ${
        parent ? `for \`${parent}\`` : ""
      } is defined multiple times`;
      showInlineError(dfns, msg, "Duplicate definition.");
    }
    if (dfns.length) {
      if (name !== resolvedName) {
        dfns[0].dataset.lt = resolvedName;
      }
      return dfns[0];
    }
  }
}

/**
 * @param {HTMLElement} dfn
 * @param {*} defn
 * @param {string} parent
 * @param {string} name
 */
function decorateDfn(dfn, defn, parent, name) {
  if (!dfn.id) {
    const lCaseParent = parent.toLowerCase();
    const middle = lCaseParent ? `${lCaseParent}-` : "";
    let last = name
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/\s/g, "-");
    if (last === "") last = "the-empty-string";
    dfn.id = `dom-${middle}${last}`;
  }
  dfn.dataset.idl = defn.type;
  dfn.dataset.title = dfn.textContent;
  dfn.dataset.dfnFor = parent;
  // Derive the data-type for dictionary members, interface attributes,
  // and methods
  switch (defn.type) {
    case "operation":
    case "attribute":
    case "field":
      dfn.dataset.type = getDataType(defn);
      break;
  }

  // Mark the definition as code.
  if (!dfn.querySelector("code") && !dfn.closest("code") && dfn.children) {
    wrapInner(dfn, dfn.ownerDocument.createElement("code"));
  }

  // Add data-lt values and register them
  switch (defn.type) {
    case "attribute":
    case "constructor":
    case "operation":
      addAlternativeNames(dfn, getAlternativeNames(defn.type, parent, name));
      break;
  }

  return dfn;
}

/**
 * @param {HTMLElement[]} dfnForArray
 * @param {string} parent data-dfn-for
 * @param {string} originalName
 * @param {string} type
 */
function getDfns(dfnForArray, parent, originalName, type) {
  if (!dfnForArray) {
    return [];
  }
  // Definitions that have a name and [data-dfn-for] that exactly match the
  // IDL entity:
  const dfns = dfnForArray.filter(dfn => {
    /** @type {HTMLElement} */
    const closestDfnFor = dfn.closest(`[data-dfn-for]`);
    return closestDfnFor && closestDfnFor.dataset.dfnFor === parent;
  });

  if (dfns.length === 0 && parent === "" && dfnForArray.length === 1) {
    // Make sure the name exactly matches
    return dfnForArray[0].textContent === originalName ? dfnForArray : [];
  } else if (topLevelEntities.has(type) && dfnForArray.length) {
    const dfn = dfnForArray.find(
      dfn => dfn.textContent.trim() === originalName
    );
    if (dfn) return [dfn];
  }
  return dfns;
}

/**
 * @return {string}
 */
function getDataType(idlStruct) {
  const { idlType, generic, union } = idlStruct;
  if (typeof idlType === "string") return idlType;
  if (generic) return generic;
  // join on "|" handles for "unsigned short" etc.
  if (union) return idlType.map(getDataType).join("|");
  return getDataType(idlType);
}

// Module core/webidl

const name$A = "core/webidl";

const operationNames = {};
const idlPartials = {};

const templates$1 = {
  wrap(items) {
    return items
      .reduce(flatten, [])
      .filter(x => x !== "")
      .map(x => (typeof x === "string" ? new Text(x) : x));
  },
  trivia(t) {
    if (!t.trim()) {
      return t;
    }
    return hyperHTML$1`<span class='idlSectionComment'>${t}</span>`;
  },
  generic(keyword) {
    // Shepherd classifies "interfaces" as starting with capital letters,
    // like Promise, FrozenArray, etc.
    return /^[A-Z]/.test(keyword)
      ? hyperHTML$1`<a data-xref-type="interface" data-cite="WebIDL">${keyword}</a>`
      : // Other keywords like sequence, maplike, etc...
        hyperHTML$1`<a data-xref-type="dfn" data-cite="WebIDL">${keyword}</a>`;
  },
  reference(wrapped, unescaped, context) {
    if (context.type === "extended-attribute" && context.name !== "Exposed") {
      return wrapped;
    }
    let type = "_IDL_";
    let cite = null;
    let lt;
    switch (unescaped) {
      case "Window":
        type = "interface";
        cite = "HTML";
        break;
      case "object":
        type = "interface";
        cite = "WebIDL";
        break;
      default: {
        const isWorkerType = unescaped.includes("Worker");
        if (isWorkerType && context.type === "extended-attribute") {
          lt = `${unescaped}GlobalScope`;
          type = "interface";
          cite = ["Worker", "DedicatedWorker", "SharedWorker"].includes(
            unescaped
          )
            ? "HTML"
            : null;
        }
      }
    }
    return hyperHTML$1`<a
      data-xref-type="${type}" data-cite="${cite}" data-lt="${lt}">${wrapped}</a>`;
  },
  name(escaped, { data, parent }) {
    if (data.idlType && data.idlType.type === "argument-type") {
      return hyperHTML$1`<span class="idlParamName">${escaped}</span>`;
    }
    const idlLink = defineIdlName(escaped, data, parent);
    if (data.type !== "enum-value") {
      const className = parent ? "idlName" : "idlID";
      idlLink.classList.add(className);
    }
    return idlLink;
  },
  nameless(escaped, { data, parent }) {
    switch (data.type) {
      case "constructor":
        return defineIdlName(escaped, data, parent);
      default:
        return escaped;
    }
  },
  type(contents) {
    return hyperHTML$1`<span class="idlType">${contents}</span>`;
  },
  inheritance(contents) {
    return hyperHTML$1`<span class="idlSuperclass">${contents}</span>`;
  },
  definition(contents, { data, parent }) {
    const className = getIdlDefinitionClassName(data);
    switch (data.type) {
      case "includes":
      case "enum-value":
        return hyperHTML$1`<span class='${className}'>${contents}</span>`;
    }
    const parentName = parent ? parent.name : "";
    const { name, idlId } = getNameAndId(data, parentName);
    return hyperHTML$1`<span class='${className}' id='${idlId}' data-idl data-title='${name}'>${contents}</span>`;
  },
  extendedAttribute(contents) {
    const result = hyperHTML$1`<span class="extAttr">${contents}</span>`;
    return result;
  },
  extendedAttributeReference(name) {
    return hyperHTML$1`<a data-xref-type="extended-attribute">${name}</a>`;
  },
};

/**
 * Returns a link to existing <dfn> or creates one if doesn’t exists.
 */
function defineIdlName(escaped, data, parent) {
  const parentName = parent ? parent.name : "";
  const { name } = getNameAndId(data, parentName);
  const dfn = findDfn(data, name, {
    parent: parentName,
  });
  const linkType = getDfnType(data.type);
  if (dfn) {
    if (!data.partial) {
      dfn.dataset.export = "";
      dfn.dataset.dfnType = linkType;
    }
    decorateDfn(dfn, data, parentName, name);
    const href = `#${dfn.id}`;
    return hyperHTML$1`<a
      data-link-for="${parentName}"
      data-link-type="${linkType}"
      href="${href}"
      class="internalDFN"
      ><code>${escaped}</code></a>`;
  }

  const isDefaultJSON =
    data.type === "operation" &&
    data.name === "toJSON" &&
    data.extAttrs.some(({ name }) => name === "Default");
  if (isDefaultJSON) {
    return hyperHTML$1`<a
     data-link-type="dfn"
     data-lt="default toJSON operation">${escaped}</a>`;
  }
  if (!data.partial) {
    const dfn = hyperHTML$1`<dfn data-export data-dfn-type="${linkType}">${escaped}</dfn>`;
    registerDefinition(dfn, [name]);
    decorateDfn(dfn, data, parentName, name);
    return dfn;
  }

  const unlinkedAnchor = hyperHTML$1`<a
    data-idl="${data.partial ? "partial" : null}"
    data-link-type="${linkType}"
    data-title="${data.name}"
    data-xref-type="${linkType}"
    >${escaped}</a>`;

  const showWarnings =
    name && data.type !== "typedef" && !(data.partial && !dfn);
  if (showWarnings) {
    const styledName = data.type === "operation" ? `${name}()` : name;
    const ofParent = parentName ? ` \`${parentName}\`'s` : "";
    const msg = `Missing \`<dfn>\` for${ofParent} \`${styledName}\` ${data.type}. [More info](https://github.com/w3c/respec/wiki/WebIDL-thing-is-not-defined).`;
    showInlineWarning(unlinkedAnchor, msg, "");
  }
  return unlinkedAnchor;
}

/**
 * Map to Shepherd types, for export.
 * @see https://tabatkins.github.io/bikeshed/#dfn-types
 */
function getDfnType(idlType) {
  switch (idlType) {
    case "operation":
      return "method";
    case "field":
      return "dict-member";
    case "callback interface":
    case "interface mixin":
      return "interface";
    default:
      return idlType;
  }
}

function getIdlDefinitionClassName(defn) {
  switch (defn.type) {
    case "callback interface":
      return "idlInterface";
    case "operation":
      return "idlMethod";
    case "field":
      return "idlMember";
    case "enum-value":
      return "idlEnumItem";
    case "callback function":
      return "idlCallback";
  }
  return `idl${defn.type[0].toUpperCase()}${defn.type.slice(1)}`;
}

const nameResolverMap = new WeakMap();
function getNameAndId(defn, parent = "") {
  if (nameResolverMap.has(defn)) {
    return nameResolverMap.get(defn);
  }
  const result = resolveNameAndId(defn, parent);
  nameResolverMap.set(defn, result);
  return result;
}

function resolveNameAndId(defn, parent) {
  let name = getDefnName(defn);
  let idlId = getIdlId(name, parent);
  switch (defn.type) {
    // Top-level entities with linkable members.
    case "callback interface":
    case "dictionary":
    case "interface":
    case "interface mixin": {
      idlId += resolvePartial(defn);
      break;
    }
    case "constructor":
    case "operation": {
      const overload = resolveOverload(name, parent);
      if (overload) {
        name += overload;
        idlId += overload;
      } else if (defn.arguments.length) {
        idlId += defn.arguments
          .map(arg => `-${arg.name.toLowerCase()}`)
          .join("");
      }
      break;
    }
  }
  return { name, idlId };
}

function resolvePartial(defn) {
  if (!defn.partial) {
    return "";
  }
  if (!idlPartials[defn.name]) {
    idlPartials[defn.name] = 0;
  }
  idlPartials[defn.name] += 1;
  return `-partial-${idlPartials[defn.name]}`;
}

function resolveOverload(name, parentName) {
  const qualifiedName = `${parentName}.${name}`;
  const fullyQualifiedName = `${qualifiedName}()`;
  let overload;
  if (!operationNames[fullyQualifiedName]) {
    operationNames[fullyQualifiedName] = 0;
  }
  if (!operationNames[qualifiedName]) {
    operationNames[qualifiedName] = 0;
  } else {
    overload = `!overload-${operationNames[qualifiedName]}`;
  }
  operationNames[fullyQualifiedName] += 1;
  operationNames[qualifiedName] += 1;
  return overload || "";
}

function getIdlId(name, parentName) {
  if (!parentName) {
    return `idl-def-${name.toLowerCase()}`;
  }
  return `idl-def-${parentName.toLowerCase()}-${name.toLowerCase()}`;
}

function getDefnName(defn) {
  switch (defn.type) {
    case "enum-value":
      return defn.value;
    case "operation":
      return defn.name;
    default:
      return defn.name || defn.type;
  }
}

function renderWebIDL(idlElement, index) {
  let parse;
  try {
    parse = webidl2.parse(idlElement.textContent, {
      sourceName: String(index),
    });
  } catch (e) {
    showInlineError(
      idlElement,
      `Failed to parse WebIDL: ${e.bareMessage}.`,
      e.bareMessage,
      { details: `<pre>${e.context}</pre>` }
    );
    // Skip this <pre> and move on to the next one.
    return [];
  }
  idlElement.classList.add("def", "idl");
  const html = webidl2.write(parse, { templates: templates$1 });
  const render = hyperHTML$1.bind(idlElement);
  render`${html}`;
  idlElement.querySelectorAll("[data-idl]").forEach(elem => {
    if (elem.dataset.dfnFor) {
      return;
    }
    const title = elem.dataset.title;
    // Select the nearest ancestor element that can contain members.
    const parent = elem.parentElement.closest("[data-idl][data-title]");
    if (parent) {
      elem.dataset.dfnFor = parent.dataset.title;
    }
    registerDefinition(elem, [title]);
  });
  // cross reference
  const closestCite = idlElement.closest("[data-cite], body");
  const { dataset } = closestCite;
  if (!dataset.cite) dataset.cite = "WebIDL";
  // includes webidl in some form
  if (!/\bwebidl\b/i.test(dataset.cite)) {
    const cites = dataset.cite.trim().split(/\s+/);
    dataset.cite = ["WebIDL", ...cites].join(" ");
  }
  return parse;
}

const cssPromise$2 = loadStyle$4();

async function loadStyle$4() {
  try {
    return (await Promise.resolve().then(function () { return webidl$2; })).default;
  } catch {
    return fetchAsset("webidl.css");
  }
}

async function run$p() {
  const idls = document.querySelectorAll("pre.idl");
  if (!idls.length) {
    return;
  }
  if (!document.querySelector(".idl:not(pre)")) {
    const link = document.querySelector("head link");
    if (link) {
      const style = document.createElement("style");
      style.textContent = await cssPromise$2;
      link.before(style);
    }
  }
  const astArray = [...idls].map(renderWebIDL);

  const validations = webidl2.validate(astArray);
  for (const validation of validations) {
    let details = `<pre>${validation.context}</pre>`;
    if (validation.autofix) {
      validation.autofix();
      details += `Try fixing as:
      <pre>${webidl2.write(astArray[validation.sourceName])}</pre>`;
    }
    showInlineError(
      idls[validation.sourceName],
      `WebIDL validation error: ${validation.bareMessage}`,
      validation.bareMessage,
      { details }
    );
  }
  document.normalize();
}

var webidl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$A,
  run: run$p
});

// @ts-check
const name$B = "core/data-cite";

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

async function run$q(conf) {
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
  name: name$B,
  run: run$q,
  linkInlineCitations: linkInlineCitations
});

// @ts-check
/**
 * Module: core/webidl-index
 * constructs a summary of WebIDL in the document by
 * cloning all the generated WebIDL nodes and
 * appending them to pre element.
 *
 * Usage
 * Add a <section id="idl-index"> to the document.
 * It also supports title elements to generate a header.
 * Or if a header element is an immediate child, then
 * that is preferred.
 */
const name$C = "core/webidl-index";

function run$r() {
  /** @type {HTMLElement | null} */
  const idlIndexSec = document.querySelector("section#idl-index");
  if (!idlIndexSec) {
    return;
  }
  // Query for decedents headings, e.g., "h2:first-child, etc.."
  const query = [2, 3, 4, 5, 6].map(level => `h${level}:first-child`).join(",");
  if (!idlIndexSec.querySelector(query)) {
    const header = document.createElement("h2");
    if (idlIndexSec.title) {
      header.textContent = idlIndexSec.title;
      idlIndexSec.removeAttribute("title");
    } else {
      header.textContent = "IDL Index";
    }
    idlIndexSec.prepend(header);
  }

  // filter out the IDL marked with class="exclude" and the IDL in non-normative sections
  const idlIndex = Array.from(
    document.querySelectorAll("pre.def.idl:not(.exclude)")
  ).filter(idl => !idl.closest(nonNormativeSelector));

  if (idlIndex.length === 0) {
    const text = "This specification doesn't declare any Web IDL.";
    idlIndexSec.append(text);
    return;
  }

  const pre = document.createElement("pre");
  pre.classList.add("idl", "def");
  pre.id = "actual-idl-index";
  idlIndex
    .map(elem => {
      const fragment = document.createDocumentFragment();
      for (const child of elem.children) {
        fragment.appendChild(child.cloneNode(true));
      }
      return fragment;
    })
    .forEach(elem => {
      if (pre.lastChild) {
        pre.append("\n\n");
      }
      pre.appendChild(elem);
    });
  // Remove duplicate IDs
  pre.querySelectorAll("*[id]").forEach(elem => elem.removeAttribute("id"));
  idlIndexSec.appendChild(pre);
}

var webidlIndex = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$C,
  run: run$r
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
async function run$s(conf, elems) {
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
const name$D = "core/link-to-dfn";
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
const lang$f = lang in l10n$8 ? lang : "en";

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

async function run$t(conf) {
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
      await run$s(conf, possibleExternalLinks);
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
        l10n$8[lang$f].duplicateMsg(title),
        l10n$8[lang$f].duplicateTitle
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
  name: name$D,
  run: run$t
});

// @ts-check
const name$E = "core/contrib";

async function run$u(conf) {
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
  name: name$E,
  run: run$u
});

// @ts-check

const name$F = "core/fix-headers";

function run$v() {
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
  name: name$F,
  run: run$v
});

// @ts-check

const lowerHeaderTags = ["h2", "h3", "h4", "h5", "h6"];
const headerTags = ["h1", ...lowerHeaderTags];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const name$G = "core/structure";

const localizationStrings$7 = {
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

const lang$g = lang in localizationStrings$7 ? lang : "en";

const l10n$9 = localizationStrings$7[lang$g];

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
      ? alphabet.charAt(index - lastNonAppendix)
      : prefix + index;
    const level = Math.ceil(secno.length / 2);
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
}

function run$w(conf) {
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
    const depth = Math.min(parents(header, "section").length + 1, 6);
    const h = `h${depth}`;
    if (header.localName !== h) {
      renameElement(header, h);
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

var structure$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$G,
  run: run$w
});

// @ts-check

const name$H = "core/informative";

const localizationStrings$8 = {
  en: {
    informative: "This section is non-normative.",
  },
  nl: {
    informative: "Dit onderdeel is niet normatief.",
  },
};

const lang$h = lang in localizationStrings$8 ? lang : "en";

const l10n$a = localizationStrings$8[lang$h];

function run$x() {
  Array.from(document.querySelectorAll("section.informative"))
    .map(informative => informative.querySelector("h2, h3, h4, h5, h6"))
    .filter(heading => heading)
    .forEach(heading => {
      heading.after(hyperHTML$1`<p><em>${l10n$a.informative}</em></p>`);
    });
}

var informative = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$H,
  run: run$x
});

// @ts-check
// Module core/id-headers
// All headings are expected to have an ID, unless their immediate container has one.
// This is currently in core though it comes from a W3C rule. It may move in the future.

const name$I = "core/id-headers";

function run$y(conf) {
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
  name: name$I,
  run: run$y
});

// @ts-check

const name$J = "core/caniuse";

const API_URL$1 = "https://respec.org/caniuse/";

// browser name dictionary
const BROWSERS = new Map([
  ["and_chr", "Chrome (Android)"],
  ["and_ff", "Firefox (Android)"],
  ["and_uc", "UC Browser (Android)"],
  ["android", "Android"],
  ["bb", "Blackberry"],
  ["chrome", "Chrome"],
  ["edge", "Edge"],
  ["firefox", "Firefox"],
  ["ie", "IE"],
  ["ios_saf", "Safari (iOS)"],
  ["op_mini", "Opera Mini"],
  ["op_mob", "Opera Mobile"],
  ["opera", "Opera"],
  ["safari", "Safari"],
  ["samsung", "Samsung Internet"],
]);

// Keys from https://github.com/Fyrd/caniuse/blob/master/CONTRIBUTING.md
const supportTitles = new Map([
  ["y", "Supported."],
  ["a", "Almost supported (aka Partial support)."],
  ["n", "No support, or disabled by default."],
  ["p", "No support, but has Polyfill."],
  ["u", "Support unknown."],
  ["x", "Requires prefix to work."],
  ["d", "Disabled by default (needs to enabled)."],
]);

if (
  !document.querySelector("link[rel='preconnect'][href='https://respec.org']")
) {
  const link = createResourceHint({
    hint: "preconnect",
    href: "https://respec.org",
  });
  document.head.appendChild(link);
}

const caniuseCssPromise = loadStyle$5();

async function loadStyle$5() {
  try {
    return (await Promise.resolve().then(function () { return caniuse$2; })).default;
  } catch {
    return fetchAsset("caniuse.css");
  }
}

async function run$z(conf) {
  if (!conf.caniuse) {
    return; // nothing to do.
  }
  const options = getNormalizedConf(conf);
  conf.caniuse = options; // for tests
  if (!options.feature) {
    return; // no feature to show
  }
  const featureURL = new URL(options.feature, "https://caniuse.com/").href;

  const caniuseCss = await caniuseCssPromise;
  document.head.appendChild(hyperHTML$1`
    <style class="removeOnSave">${caniuseCss}</style>`);

  const headDlElem = document.querySelector(".head dl");
  const contentPromise = (async () => {
    try {
      const apiUrl = options.apiURL || API_URL$1;
      const stats = await fetchStats(apiUrl, options);
      return createTableHTML(featureURL, stats);
    } catch (err) {
      console.error(err);
      const msg =
        `Couldn't find feature "${options.feature}" on caniuse.com? ` +
        "Please check the feature key on [caniuse.com](https://caniuse.com)";
      pub("error", msg);
      return hyperHTML$1`<a href="${featureURL}">caniuse.com</a>`;
    }
  })();
  const definitionPair = hyperHTML$1`
    <dt class="caniuse-title">Browser support:</dt>
    <dd class="caniuse-stats">${{
      any: contentPromise,
      placeholder: "Fetching data from caniuse.com...",
    }}</dd>`;
  headDlElem.append(...definitionPair.childNodes);
  await contentPromise;

  // remove from export
  pub("amend-user-config", { caniuse: options.feature });
  sub("beforesave", outputDoc => {
    hyperHTML$1.bind(outputDoc.querySelector(".caniuse-stats"))`
      <a href="${featureURL}">caniuse.com</a>`;
  });
}

/**
 * returns normalized `conf.caniuse` configuration
 * @param {Object} conf   configuration settings
 */
function getNormalizedConf(conf) {
  const DEFAULTS = { versions: 4 };
  if (typeof conf.caniuse === "string") {
    return { feature: conf.caniuse, ...DEFAULTS };
  }
  const caniuseConf = { ...DEFAULTS, ...conf.caniuse };
  const { browsers } = caniuseConf;
  if (Array.isArray(browsers)) {
    const invalidBrowsers = browsers.filter(browser => !BROWSERS.has(browser));
    if (invalidBrowsers.length) {
      const names = invalidBrowsers.map(b => `"\`${b}\`"`).join(", ");
      pub(
        "warn",
        `Ignoring invalid browser(s): ${names} in ` +
          "[`respecConfig.caniuse.browsers`](https://github.com/w3c/respec/wiki/caniuse)"
      );
    }
  }
  return caniuseConf;
}

/**
 * @param {string} apiURL
 * @typedef {Record<string, [string, string[]][]>} ApiResponse
 * @return {Promise<ApiResponse>}
 * @throws {Error} on failure
 */
async function fetchStats(apiURL, options) {
  const { feature, versions, browsers } = options;
  const searchParams = new URLSearchParams();
  searchParams.set("feature", feature);
  searchParams.set("versions", versions);
  if (Array.isArray(browsers)) {
    searchParams.set("browsers", browsers.join(","));
  }
  const url = `${apiURL}?${searchParams.toString()}`;
  const response = await fetch(url);
  const stats = await response.json();
  return stats;
}

/**
 * Get HTML element for the canIUse support table.
 * @param {string} featureURL
 * @param {ApiResponse} stats
 */
function createTableHTML(featureURL, stats) {
  // render the support table
  return hyperHTML$1`
    ${Object.entries(stats).map(addBrowser)}
    <a href="${featureURL}"
      title="Get details at caniuse.com">More info
    </a>`;
}

/**
 * Add a browser and it's support to table.
 * @param {[ string, ApiResponse["browserName"] ]} args
 */
function addBrowser([browserName, browserData]) {
  /** @param {string[]} supportKeys */
  const getSupport = supportKeys => {
    const titles = supportKeys
      .filter(key => supportTitles.has(key))
      .map(key => supportTitles.get(key));
    return {
      className: `caniuse-cell ${supportKeys.join(" ")}`,
      title: titles.join(" "),
    };
  };

  /** @param {[string, string[]]} args */
  const addLatestVersion = ([version, supportKeys]) => {
    const { className, title } = getSupport(supportKeys);
    const buttonText = `${BROWSERS.get(browserName) || browserName} ${version}`;
    return hyperHTML$1`
      <button class="${className}" title="${title}">${buttonText}</button>`;
  };

  /** @param {[string, string[]]} args */
  const addBrowserVersion = ([version, supportKeys]) => {
    const { className, title } = getSupport(supportKeys);
    return `<li class="${className}" title="${title}">${version}</li>`;
  };

  const [latestVersion, ...olderVersions] = browserData;
  return hyperHTML$1`
    <div class="caniuse-browser">
      ${addLatestVersion(latestVersion)}
      <ul>
        ${olderVersions.map(addBrowserVersion)}
      </ul>
    </div>`;
}

var caniuse = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$J,
  run: run$z
});

// @ts-check

const name$K = "core/mdn-annoatation";

const SPEC_MAP_URL =
  "https://raw.githubusercontent.com/w3c/mdn-spec-links/master/SPECMAP.json";
const BASE_JSON_PATH = "https://w3c.github.io/mdn-spec-links/";
const MDN_URL_BASE = "https://developer.mozilla.org/en-US/docs/Web/";
const MDN_BROWSERS = {
  // The browser IDs here must match the ones in the imported JSON data.
  // See the list of browser IDs at https://goo.gl/iDacWP.
  chrome: "Chrome",
  chrome_android: "Chrome Android",
  edge: "Edge",
  edge_mobile: "Edge Mobile",
  firefox: "Firefox",
  firefox_android: "Firefox Android",
  ie: "Internet Explorer",
  // nodejs: "Node.js", // no data for features in HTML
  opera: "Opera",
  opera_android: "Opera Android",
  // qq_android: "QQ Browser", // not enough data for features in HTML
  safari: "Safari",
  safari_ios: "Safari iOS",
  samsunginternet_android: "Samsung Internet",
  // uc_android: "UC browser", // not enough data for features in HTML
  // uc_chinese_android: "Chinese UC Browser", // not enough data for features in HTML
  webview_android: "WebView Android",
};

const mdnCssPromise = loadStyle$6();

async function loadStyle$6() {
  try {
    return (await Promise.resolve().then(function () { return mdnAnnotation$2; })).default;
  } catch {
    return fetchAsset("mdn-annotation.css");
  }
}

function fetchAndCacheJson(url, maxAge) {
  if (!url) return {};
  return fetchAndCache(url, maxAge).then(r => r.json());
}

function insertMDNBox(node) {
  const targetAncestor = node.closest("section");
  const { previousElementSibling: targetSibling, parentNode } = targetAncestor;
  if (targetSibling && targetSibling.classList.contains("mdn")) {
    // If the target ancestor already has a mdnBox inserted, we just use it
    return targetSibling;
  }
  const mdnBox = hyperHTML$1`<aside class="mdn before wrapped"></aside>`;
  parentNode.insertBefore(mdnBox, targetAncestor);
  return mdnBox;
}

function attachMDNDetail(container, mdnSpec) {
  const { slug, summary } = mdnSpec;
  container.innerHTML += `<button onclick="toggleMDNStatus(this.parentNode)" aria-label="Expand MDN details"><b>MDN</b></button>`;
  const mdnSubPath = slug.slice(slug.indexOf("/") + 1);
  const mdnDetail = document.createElement("div");
  const href = `${MDN_URL_BASE}${slug}`;
  hyperHTML$1(mdnDetail)`
      <a title="${summary}" href="${href}">${mdnSubPath}</a>
  `;
  attachMDNBrowserSupport(mdnDetail, mdnSpec);
  container.appendChild(mdnDetail);
}

function attachMDNBrowserSupport(container, mdnSpec) {
  if (!mdnSpec.support) {
    container.innerHTML += `<p class="nosupportdata">No support data.</p>`;
    return;
  }
  const supportTable = hyperHTML$1`<p class="mdnsupport">
    ${[buildBrowserSupportTable(mdnSpec.support)]}
  </p>`;
  container.appendChild(supportTable);
}

function buildBrowserSupportTable(support) {
  let innerHTML = "";
  function addMDNBrowserRow(browserId, yesNoUnknown, version) {
    const displayStatus = yesNoUnknown === "Unknown" ? "?" : yesNoUnknown;
    const classList = `${browserId} ${yesNoUnknown.toLowerCase()}`;
    const browserRow = `
      <span class="${classList}">
        <span class="browser-name">${MDN_BROWSERS[browserId]}</span>
        <span class="version">${version ? version : displayStatus}</span>
      </span>`;
    innerHTML += browserRow;
  }

  function processBrowserData(browserId, versionData) {
    if (versionData.version_removed) {
      addMDNBrowserRow(browserId, "No", "");
      return;
    }
    const versionAdded = versionData.version_added;
    if (!versionAdded) {
      addMDNBrowserRow(browserId, "Unknown", "");
      return;
    }
    if (typeof versionAdded === "boolean") {
      addMDNBrowserRow(browserId, versionAdded ? "Yes" : "No", "");
    } else {
      addMDNBrowserRow(browserId, "Yes", `${versionAdded}+`);
    }
  }

  Object.keys(MDN_BROWSERS).forEach(browserId => {
    if (!support[browserId]) {
      addMDNBrowserRow(browserId, "Unknown", "");
    } else {
      if (Array.isArray(support[browserId])) {
        support[browserId].forEach(b => {
          processBrowserData(browserId, b);
        });
      } else {
        processBrowserData(browserId, support[browserId]);
      }
    }
  });
  return innerHTML;
}

async function run$A(conf) {
  const { shortName, mdn } = conf;
  if (!shortName || !mdn) {
    // Nothing to do if shortName is not provided
    return;
  }
  const maxAge = mdn.maxAge || 60 * 60 * 24 * 1000;
  const specMapUrl = mdn.specMapUrl || SPEC_MAP_URL;
  const baseJsonPath = mdn.baseJsonPath || BASE_JSON_PATH;
  const specMap = await fetchAndCacheJson(specMapUrl, maxAge);
  const hasSpecJson = Object.values(specMap).some(
    jsonName => jsonName === `${shortName}.json`
  );
  if (!hasSpecJson) {
    return;
  }
  const mdnSpecJson = await fetchAndCacheJson(
    `${baseJsonPath}/${shortName}.json`,
    maxAge
  );
  const mdnCss = await mdnCssPromise;
  document.head.appendChild(hyperHTML$1`<style>${[mdnCss]}</style>`);
  document.head.appendChild(hyperHTML$1`<script>
     function toggleMDNStatus(div) {
       div.parentNode.classList.toggle('wrapped');
     }
  </script>`);
  const nodesWithId = document.querySelectorAll("[id]");
  [...nodesWithId]
    .filter(node => {
      const unlikelyTagNames = ["STYLE", "SCRIPT", "BODY"];
      return (
        unlikelyTagNames.indexOf(node.tagName) === -1 &&
        mdnSpecJson[node.id] &&
        Array.isArray(mdnSpecJson[node.id])
      );
    })
    .forEach(node => {
      const mdnSpecArray = mdnSpecJson[node.id];
      const mdnBox = insertMDNBox(node);
      mdnSpecArray
        .map(spec => {
          const mdnDiv = document.createElement("div");
          attachMDNDetail(mdnDiv, spec);
          return mdnDiv;
        })
        .forEach(mdnDiv => mdnBox.appendChild(mdnDiv));
    });
}

var mdnAnnotation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$K,
  run: run$A
});

// @ts-check

const mimeTypes = new Map([["text/html", "html"], ["application/xml", "xml"]]);

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

const name$L = "ui/save-html";

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
  name: name$L,
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
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
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
<<<<<<< gh-pages
`;function render({state:e="",results:t,timeTaken:n,query:r}={}){t?renderer`
    <div>${mast}</div>
    <p class="state" hidden="${!e}">
      ${e}
    </p>
    <section hidden="${!t}">${t?renderResults(t,r,n):[]}</section>
  `:renderer`<div>${mast}</div>`}var searchSpecref=Object.freeze({__proto__:null});const XREF_URL="https://respec.org/xref/",localizationStrings$c={en:{title:"Search definitions"}},lang$b=lang in localizationStrings$c?lang:"en",l10n$e=localizationStrings$c[lang$b],button$2=ui.addCommand(l10n$e.title,show$2,"Ctrl+Shift+Alt+x","📚");function show$2(){const e=document.createElement("iframe");e.id="xref-ui",e.src=XREF_URL,e.onload=()=>e.classList.add("ready"),ui.freshModal(l10n$e.title,e,button$2)}var searchXref=Object.freeze({__proto__:null});const button$3=ui.addCommand(l10n[lang].definition_list,show$3,"Ctrl+Shift+Alt+D","📔"),ul=document.createElement("ul");ul.classList.add("respec-dfn-list");const render$1=hyperHTML$1.bind(ul);function show$3(){const e=Object.entries(definitionMap).sort(([e],[t])=>e.localeCompare(t)).map(([,[e]])=>hyperHTML$1.wire(e,":li>a")`
        <li>
          <a href="${`#${e.id}`}">
            ${e.textContent}
          </a>
        </li>
      `);render$1`${e}`,ui.freshModal(l10n[lang].list_of_definitions,ul,button$3)}ul.addEventListener("click",e=>{ui.closeModal(),e.stopPropagation()});var dfnList=Object.freeze({__proto__:null});window.respecVersion=window.respecVersion||"Developer Edition";const div=document.createElement("div"),render$2=hyperHTML$1.bind(div),button$4=ui.addCommand(`About ${window.respecVersion}`,show$4,"Ctrl+Shift+Alt+A","ℹ️");function show$4(){ui.freshModal(`${l10n[lang].about_respec} - ${window.respecVersion}`,div,button$4);const e=[];"getEntriesByType"in performance&&performance.getEntriesByType("measure").sort((e,t)=>t.duration-e.duration).map(({name:e,duration:t})=>{return{name:e,duration:t>1e3?`${Math.round(t/1e3)} second(s)`:`${t.toFixed(2)} milliseconds`}}).map(perfEntryToTR).forEach(t=>{e.push(t)}),render$2`
=======
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

const XREF_URL = "https://respec.org/xref/";

const localizationStrings$9 = {
  en: {
    title: "Search definitions",
  },
};
const lang$i = lang in localizationStrings$9 ? lang : "en";
const l10n$b = localizationStrings$9[lang$i];

const button$2 = ui.addCommand(l10n$b.title, show$2, "Ctrl+Shift+Alt+x", "📚");

function show$2() {
  const iframe = document.createElement("iframe");
  iframe.id = "xref-ui";
  iframe.src = XREF_URL;
  iframe.onload = () => iframe.classList.add("ready");
  ui.freshModal(l10n$b.title, iframe, button$2);
}

var searchXref = /*#__PURE__*/Object.freeze({
  __proto__: null
});

// @ts-check

const button$3 = ui.addCommand(
  l10n[lang].definition_list,
  show$3,
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

function show$3() {
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
  ui.freshModal(l10n[lang].list_of_definitions, ul, button$3);
}

var dfnList = /*#__PURE__*/Object.freeze({
  __proto__: null
});

// @ts-check

// window.respecVersion is added at build time (see tools/builder.js)
window.respecVersion = window.respecVersion || "Developer Edition";
const div = document.createElement("div");
const render$2 = hyperHTML$1.bind(div);
const button$4 = ui.addCommand(
  `About ${window.respecVersion}`,
  show$4,
  "Ctrl+Shift+Alt+A",
  "ℹ️"
);

function show$4() {
  ui.freshModal(
    `${l10n[lang].about_respec} - ${window.respecVersion}`,
    div,
    button$4
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
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
  <p>
    ReSpec is a document production toolchain, with a notable focus on W3C specifications.
  </p>
  <p>
    <a href='https://github.com/w3c/respec/wiki'>Documentation</a>,
    <a href='https://github.com/w3c/respec/issues'>Bugs</a>.
  </p>
<<<<<<< gh-pages
  <table border="1" width="100%" hidden="${!e.length}">
=======
  <table border="1" width="100%" hidden="${entries.length ? false : true}">
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
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
<<<<<<< gh-pages
    <tbody>${e}</tbody>
  </table>
`}function perfEntryToTR({name:e,duration:t}){return hyperHTML$1`
    <tr>
      <td><a href="${`https://github.com/w3c/respec/tree/develop/src/${e}.js`}">${e}</a></td>
      <td>${t}</td>
    </tr>
  `}var aboutRespec=Object.freeze({__proto__:null});const name$N="core/seo";function run$A(){const e=document.querySelector("#abstract p:first-of-type");if(!e)return;const t=e.textContent.replace(/\s+/," ").trim(),n=document.createElement("meta");n.name="description",n.content=t,document.head.appendChild(n)}var seo=Object.freeze({__proto__:null,name:name$N,run:run$A});const name$O="w3c/seo";async function run$B(e){if(!e.canonicalURI)switch(e.specStatus){case"CG-DRAFT":case"BG-DRAFT":case"unofficial":return}const t=e.shortName?`https://www.w3.org/TR/${e.shortName}/`:null;switch(e.canonicalURI){case"edDraft":e.edDraftURI?e.canonicalURI=new URL(e.edDraftURI,document.location.href).href:(pub("warn","Canonical URI set to edDraft, but no edDraftURI is set in configuration"),e.canonicalURI=null);break;case"TR":t?e.canonicalURI=t:(pub("warn","Canonical URI set to TR, but no shortName is set in configuration"),e.canonicalURI=null);break;default:if(e.canonicalURI)try{e.canonicalURI=new URL(e.canonicalURI,document.location.href).href}catch(t){pub("warn",`CanonicalURI is an invalid URL: ${t.message}`),e.canonicalURI=null}else t&&(e.canonicalURI=t)}if(e.canonicalURI){const t=document.createElement("link");t.setAttribute("rel","canonical"),t.setAttribute("href",e.canonicalURI),document.head.appendChild(t)}e.doJsonLd&&await addJSONLDInfo(e,document)}async function addJSONLDInfo(e,t){const n=["TechArticle"];e.rdfStatus&&n.push(e.rdfStatus);const r={"@context":["http://schema.org",{"@vocab":"http://schema.org/","@language":t.documentElement.lang||"en",w3p:"http://www.w3.org/2001/02pd/rec54#",foaf:"http://xmlns.com/foaf/0.1/",datePublished:{"@type":"http://www.w3.org/2001/XMLSchema#date"},inLanguage:{"@language":null},isBasedOn:{"@type":"@id"},license:{"@type":"@id"}}],id:e.canonicalURI||e.thisVersion,type:n,name:e.title,inLanguage:t.documentElement.lang||"en",license:e.licenseInfo.url,datePublished:e.dashDate,copyrightHolder:{name:"World Wide Web Consortium",url:"https://www.w3.org/"},discussionUrl:e.issueBase,alternativeHeadline:e.subtitle,isBasedOn:e.prevVersion};if(e.additionalCopyrightHolders){const t=Array.isArray(e.additionalCopyrightHolders)?e.additionalCopyrightHolders:[e.additionalCopyrightHolders];r.copyrightHolder=[r.copyrightHolder,...t.map(e=>({name:e}))]}const o=t.head.querySelector("meta[name=description]");o&&(r.description=o.content),e.editors&&(r.editor=e.editors.map(addPerson)),e.authors&&(r.contributor=e.authors.map(addPerson));const i=[...e.normativeReferences,...e.informativeReferences],s=await Promise.all(i.map(e=>resolveRef(e)));r.citation=s.filter(e=>"object"==typeof e).map(addRef);const a=t.createElement("script");a.type="application/ld+json",a.textContent=JSON.stringify(r,null,2),t.head.appendChild(a)}function addPerson({name:e,url:t,mailto:n,company:r,companyURL:o}){const i={type:"Person",name:e,url:t,"foaf:mbox":n};return(r||o)&&(i.worksFor={name:r,url:o}),i}function addRef(e){const{href:t,title:n,href:r}=e,o={id:t,type:"TechArticle",name:n,url:r};return e.authors&&(o.creator=e.authors.map(e=>({name:e}))),e.rawDate&&(o.publishedDate=e.rawDate),e.isbn&&(o.identifier=e.isbn),e.publisher&&(o.publisher={name:e.publisher}),o}var seo$1=Object.freeze({__proto__:null,name:name$O,run:run$B});const name$P="core/worker",hint={hint:"preload",href:"https://www.w3.org/Tools/respec/respec-highlight.js",as:"script"},link$1=createResourceHint(hint);async function loadWorkerScript(){try{return(await Promise.resolve().then((function(){return respecWorker$1}))).default}catch{return fetchBase("worker/respec-worker.js")}}async function createWorker(){const e=await loadWorkerScript(),t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Worker(t)}document.head.appendChild(link$1);const workerPromise=createWorker();expose(name$P,workerPromise.then(e=>({worker:e})));const name$Q="core/highlight",nextMsgId=msgIdGenerator("highlight"),ghCssPromise=loadStyle$7();async function loadStyle$7(){try{return(await Promise.resolve().then((function(){return highlight$2}))).default}catch{return fetchAsset("highlight.css")}}function getLanguageHint(e){return Array.from(e).filter(e=>"highlight"!==e&&"nolinks"!==e).map(e=>e.toLowerCase())}async function highlightElement(e){e.setAttribute("aria-busy","true");const t=getLanguageHint(e.classList);let n;try{n=await sendHighlightRequest(e.innerText,t)}catch(e){return void console.error(e)}const{language:r,value:o}=n;switch(e.localName){case"pre":e.classList.remove(r),e.innerHTML=`<code class="hljs${r?` ${r}`:""}">${o}</code>`,e.classList.length||e.removeAttribute("class");break;case"code":e.innerHTML=o,e.classList.add("hljs"),r&&e.classList.add(r)}e.setAttribute("aria-busy","false")}async function sendHighlightRequest(e,t){const n={action:"highlight",code:e,id:nextMsgId(),languages:t},r=await workerPromise;return r.postMessage(n),new Promise((e,t)=>{const o=setTimeout(()=>{t(new Error("Timed out waiting for highlight."))},4e3);r.addEventListener("message",(function t(i){const{data:{id:s,language:a,value:c}}=i;s===n.id&&(r.removeEventListener("message",t),clearTimeout(o),e({language:a,value:c}))}))})}async function run$C(e){if(e.noHighlightCSS)return;const t=[...document.querySelectorAll("\n    pre:not(.idl):not(.nohighlight) > code:not(.nohighlight),\n    pre:not(.idl):not(.nohighlight),\n    code.highlight\n  ")].filter(e=>"pre"!==e.localName||!e.querySelector("code"));if(!t.length)return;const n=t.filter(e=>e.textContent.trim()).map(highlightElement),r=await ghCssPromise;document.head.appendChild(hyperHTML$1`
      <style>
        ${r}
      </style>
    `),await Promise.all(n)}var highlight=Object.freeze({__proto__:null,name:name$Q,run:run$C});const localizationStrings$d={en:{missing_test_suite_uri:"Found tests in your spec, but missing '[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' in your ReSpec config.",tests:"tests",test:"test"}},l10n$f=getIntlData(localizationStrings$d),name$R="core/data-tests";function toListItem(e){const t=[],[n]=new URL(e).pathname.split("/").reverse(),r=n.split(".");let[o]=r;if(r.find(e=>"https"===e)){const e=document.createElement("span");e.textContent="🔒",e.setAttribute("aria-label","requires a secure connection"),e.setAttribute("title","Test requires HTTPS"),o=o.replace(".https",""),t.push(e)}if(o.split(".").join("-").split("-").find(e=>"manual"===e)){const e=document.createElement("span");e.textContent="💪",e.setAttribute("aria-label","the test must be run manually"),e.setAttribute("title","Manual test"),o=o.replace("-manual",""),t.push(e)}return hyperHTML$1`
    <li>
      <a href="${e}">
        ${o}
      </a> ${t}
    </li>
  `}function run$D(e){const t=[...document.querySelectorAll("[data-tests]")].filter(e=>e.dataset.tests);if(t.length)if(e.testSuiteURI)for(const n of t){const t=toTestURLs(n.dataset.tests.split(/,/gm).map(e=>e.trim()),e.testSuiteURI);handleDuplicates(t,n);const r=toHTML$1(t);n.append(r)}else pub("error",l10n$f.missing_test_suite_uri)}function toTestURLs(e,t){return e.map(e=>{try{return new URL(e,t).href}catch{pub("warn",`Bad URI: ${e}`)}}).filter(e=>e)}function handleDuplicates(e,t){const n=e.filter((e,t,n)=>n.indexOf(e)!==t);n.length&&showInlineWarning(t,"Duplicate tests found",`To fix, remove duplicates from "data-tests": ${n.map(e=>new URL(e).pathname).join(", ")}`)}function toHTML$1(e){const t=[...new Set(e)];return hyperHTML$1`
    <details class="respec-tests-details removeOnSave">
      <summary>
        tests: ${t.length}
      </summary>
      <ul>${t.map(toListItem)}</ul>
    </details>
  `}var dataTests=Object.freeze({__proto__:null,name:name$R,run:run$D});const name$S="core/list-sorter";function makeSorter(e){return({textContent:t},{textContent:n})=>"ascending"===e?t.localeCompare(n):n.localeCompare(t)}function sortListItems(e,t){return[...children(e,"li")].sort(makeSorter(t)).reduce((e,t)=>(e.appendChild(t),e),document.createDocumentFragment())}function sortDefinitionTerms(e,t){return[...children(e,"dt")].sort(makeSorter(t)).reduce((e,t)=>{const{nodeType:n,nodeName:r}=t,o=document.createDocumentFragment();let{nextSibling:i}=t;for(;i&&i.nextSibling;){o.appendChild(i.cloneNode(!0));const{nodeType:e,nodeName:t}=i.nextSibling;if(e===n&&t===r)break;i=i.nextSibling}return o.prepend(t.cloneNode(!0)),e.appendChild(o),e},document.createDocumentFragment())}function run$E(){const e=document.querySelectorAll("[data-sort]");for(const t of e){let e;const n=t.dataset.sort||"ascending";switch(t.localName){case"dl":e=sortDefinitionTerms(t,n);break;case"ol":case"ul":e=sortListItems(t,n);break;default:pub("warning",`ReSpec can't sort ${t.localName} elements.`)}if(e){const n=document.createRange();n.selectNodeContents(t),n.deleteContents(),t.appendChild(e)}}}var listSorter=Object.freeze({__proto__:null,name:name$S,sortListItems:sortListItems,sortDefinitionTerms:sortDefinitionTerms,run:run$E});const name$T="core/highlight-vars",hlVarsPromise=loadStyle$8();async function loadStyle$8(){try{return(await Promise.resolve().then((function(){return _var$1}))).default}catch{return fetchAsset("var.css")}}async function run$F(e){if(!e.highlightVars)return;const t=document.createElement("style");t.textContent=await hlVarsPromise,t.classList.add("removeOnSave"),document.head.appendChild(t),document.querySelectorAll("var").forEach(e=>e.addEventListener("click",highlightListener)),sub("beforesave",e=>{e.querySelectorAll("var.respec-hl").forEach(removeHighlight)})}function highlightListener(e){e.stopPropagation();const{target:t}=e,n=highlightVars(t),r=()=>{const e=getHighlightColor(t);n.forEach(t=>removeHighlight(t,e)),[...HL_COLORS.keys()].forEach(e=>HL_COLORS.set(e,!0))};n.length&&document.body.addEventListener("click",r,{once:!0})}const HL_COLORS=new Map([["respec-hl-c1",!0],["respec-hl-c2",!0],["respec-hl-c3",!0],["respec-hl-c4",!0],["respec-hl-c5",!0],["respec-hl-c6",!0],["respec-hl-c7",!0]]);function getHighlightColor(e){const{value:t}=e.classList,n=/respec-hl-\w+/,r=n.test(t)&&t.match(n);return r?r[0]:!0===HL_COLORS.get("respec-hl-c1")?"respec-hl-c1":[...HL_COLORS.keys()].find(e=>HL_COLORS.get(e))||"respec-hl-c1"}function highlightVars(e){const t=e.textContent.trim(),n=e.closest("section"),r=getHighlightColor(e),o=[...n.querySelectorAll("var")].filter(e=>e.textContent.trim()===t&&e.closest("section")===n),i=o[0].classList.contains("respec-hl");return HL_COLORS.set(r,i),i?(o.forEach(e=>removeHighlight(e,r)),[]):(o.forEach(e=>addHighlight(e,r)),o)}function removeHighlight(e,t){e.classList.remove("respec-hl",t),e.classList.length||e.removeAttribute("class")}function addHighlight(e,t){e.classList.add("respec-hl",t)}var highlightVars$1=Object.freeze({__proto__:null,name:name$T,run:run$F});const name$U="core/dfn-panel";async function run$G(){const e=await loadStyle$9();let t;document.head.insertBefore(hyperHTML$1`<style>${e}</style>`,document.querySelector("link")),document.body.addEventListener("click",e=>{const n=e.target;switch(deriveAction(n)){case"show":{t&&t.remove();const e=n.closest("dfn");t=createPanel(e),displayPanel(e,t);break}case"dock":t.classList.add("docked");break;case"hide":t.remove()}})}function deriveAction(e){const t=!!e.closest("a");if(e.closest("dfn"))return t?null:"show";if(e.closest("#dfn-panel")){if(t){return e.classList.contains("self-link")?"hide":"dock"}return e.closest("#dfn-panel").classList.contains("docked")?"hide":null}return document.getElementById("dfn-panel")?"hide":null}function createPanel(e){const{id:t}=e,n=`#${t}`,r=document.querySelectorAll(`a[href="${n}"]`);return hyperHTML$1`
    <aside class="dfn-panel" id="dfn-panel">
      <b><a class="self-link" href="${n}">Permalink</a></b>
      <b>Referenced in:</b>
      ${referencesToHTML(t,r)}
    </aside>
  `}function referencesToHTML(e,t){if(!t.length)return hyperHTML$1`<ul><li>Not referenced in this document.</li></ul>`;const n=new Map;t.forEach((t,r)=>{const o=t.id||`ref-for-${e}-${r+1}`;t.id||(t.id=o);const i=getReferenceTitle(t);(n.get(i)||n.set(i,[]).get(i)).push(o)});return hyperHTML$1`<ul>${[...n.entries()].map(e=>hyperHTML$1`<li>${(([e,t])=>[{title:e,id:t[0]}].concat(t.slice(1).map((e,t)=>({title:`(${t+2})`,id:e}))))(e).map(e=>hyperHTML$1`<a href="#${e.id}">${e.title}</a>${" "}`)}</li>`)}</ul>`}function getReferenceTitle(e){const t=e.closest("section");if(!t)return null;const n=t.querySelector("h1, h2, h3, h4, h5, h6");return n?norm(n.textContent):null}function displayPanel(e,t){document.body.appendChild(t);const n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),o=r.right-r.left;let i=window.scrollY+n.top,s=n.left+n.width+5;s+o>document.body.scrollWidth&&(s=n.left-(o+5),s<0&&(s=n.left,i+=n.height)),t.style.setProperty("--left",`${s}px`),t.style.setProperty("--top",`${i}px`)}async function loadStyle$9(){try{return(await Promise.resolve().then((function(){return dfnPanel$2}))).default}catch{return fetchAsset("dfn-panel.css")}}var dfnPanel=Object.freeze({__proto__:null,name:name$U,run:run$G});const name$V="core/data-type",tooltipStylePromise=loadStyle$a();async function loadStyle$a(){try{return(await Promise.resolve().then((function(){return datatype$1}))).default}catch{return fetchAsset("datatype.css")}}async function run$H(e){if(!e.highlightVars)return;const t=document.createElement("style");t.textContent=await tooltipStylePromise,document.head.appendChild(t);let n=null;const r=new Map,o=document.querySelectorAll("section var");for(const e of o){const t=e.closest("section");if(n!==t&&(n=t,r.clear()),e.dataset.type){r.set(e.textContent.trim(),e.dataset.type);continue}const o=r.get(e.textContent.trim());o&&(e.dataset.type=o)}}var dataType=Object.freeze({__proto__:null,name:name$V,run:run$H});const name$W="core/algorithms",cssPromise$3=loadStyle$b();async function loadStyle$b(){try{return(await Promise.resolve().then((function(){return algorithms$2}))).default}catch{return fetchAsset("algorithms.css")}}async function run$I(){if(Array.from(document.querySelectorAll("ol.algorithm li")).filter(e=>e.textContent.trim().startsWith("Assert: ")).forEach(e=>e.classList.add("assert")),document.querySelector(".assert")){const e=document.createElement("style");e.textContent=await cssPromise$3,document.head.appendChild(e)}}var algorithms=Object.freeze({__proto__:null,name:name$W,run:run$I});const name$X="core/anchor-expander";function run$J(){const e=[...document.querySelectorAll("a[href^='#']:not(.self-link):not([href$='the-empty-string'])")].filter(e=>""===e.textContent.trim());for(const t of e){const e=t.getAttribute("href").slice(1),n=document.getElementById(e);if(n){switch(n.localName){case"h6":case"h5":case"h4":case"h3":case"h2":processHeading(n,t);break;case"section":processSection(n,e,t);break;case"figure":processFigure(n,e,t);break;case"aside":case"div":processBox(n,e,t);break;default:t.textContent=t.getAttribute("href"),showInlineError(t,"ReSpec doesn't support expanding this kind of reference.",`Can't expand "#${e}".`)}localize(n,t),t.normalize()}else{t.textContent=t.getAttribute("href"),showInlineError(t,`Couldn't expand inline reference. The id "${e}" is not in the document.`,`No matching id in document: ${e}.`)}}}function processBox(e,t,n){const r=e.querySelector(".marker .self-link");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching element "${t}", but it has no title or marker.`,"Missing title.")}const o=makeSafeCopy(r);n.append(...o.childNodes),n.classList.add("box-ref")}function processFigure(e,t,n){const r=e.querySelector("figcaption");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,`Found matching figure "${t}", but figure is lacking a \`<figcaption>\`.`,"Missing figcaption in referenced figure.")}const o=[...makeSafeCopy(r).childNodes].filter(e=>!e.classList||!e.classList.contains("fig-title"));o.pop(),n.append(...o),n.classList.add("fig-ref");const i=r.querySelector(".fig-title");!n.hasAttribute("title")&&i&&(n.title=norm(i.textContent))}function processSection(e,t,n){const r=e.querySelector("h6, h5, h4, h3, h2");if(!r){return n.textContent=n.getAttribute("href"),void showInlineError(n,"Found matching section, but the section was lacking a heading element.",`No matching id in document: "${t}".`)}processHeading(r,n),localize(r,n)}function processHeading(e,t){const n=e.querySelector(".self-link"),r=[...makeSafeCopy(e).childNodes].filter(e=>!e.classList||!e.classList.contains("self-link"));t.append(...r),n&&t.prepend("§ "),t.classList.add("sec-ref")}function localize(e,t){for(const n of["dir","lang"]){if(t.hasAttribute(n))continue;const r=e.closest(`[${n}]`);if(!r)continue;const o=t.closest(`[${n}]`);o&&o.getAttribute(n)===r.getAttribute(n)||t.setAttribute(n,r.getAttribute(n))}}var anchorExpander=Object.freeze({__proto__:null,name:name$X,run:run$J});const name$Y="rs-changelog",element=class extends HTMLElement{constructor(){super(),this.props={from:this.getAttribute("from"),to:this.getAttribute("to")||"HEAD",filter:"function"==typeof window[this.getAttribute("filter")]?window[this.getAttribute("filter")]:()=>!0}}connectedCallback(){const{from:e,to:t,filter:n}=this.props;hyperHTML$1.bind(this)`
      <ul>
      ${{any:fetchCommits(e,t,n).then(e=>toHTML$2(e)).catch(e=>showInlineError(this,e.message,e.message)).finally(()=>{this.dispatchEvent(new CustomEvent("done"))}),placeholder:"Loading list of commits..."}}
      </ul>
    `}};async function fetchCommits(e,t,n){let r;try{const o=await github;if(!o)throw new Error("`respecConfig.github` is not set");const i=new URL("commits",`${o.apiBase}/${o.fullName}/`);i.searchParams.set("from",e),i.searchParams.set("to",t);const s=await fetch(i.href);if(!s.ok)throw new Error(`Request to ${i} failed with status code ${s.status}`);if(r=await s.json(),!r.length)throw new Error(`No commits between ${e}..${t}.`);r=r.filter(n)}catch(e){const t=`Error loading commits from GitHub. ${e.message}`;throw console.error(e),new Error(t)}return r}async function toHTML$2(e){const{repoURL:t}=await github;return e.map(e=>{const[n,r=null]=e.message.split(/\(#(\d+)\)/,2),o=`${t}commit/${e.hash}`,i=r&&hyperHTML$1` (<a href="${r?`${t}pull/${r}`:null}">#${r}</a>)`;return hyperHTML$1`<li><a href="${o}">${n.trim()}</a>${i}</li>`})}var changelog=Object.freeze({__proto__:null,name:name$Y,element:element});const CUSTOM_ELEMENTS=[changelog],name$Z="core/custom-elements";async function run$K(){CUSTOM_ELEMENTS.forEach(e=>{customElements.define(e.name,e.element)});const e=CUSTOM_ELEMENTS.map(e=>e.name).join(", "),t=[...document.querySelectorAll(e)].map(e=>new Promise(t=>e.addEventListener("done",t,{once:!0})));await Promise.all(t)}var index=Object.freeze({__proto__:null,name:name$Z,run:run$K}),ui$2='#respec-ui {\n  position: fixed;\n  display: flex;\n  flex-direction: row-reverse;\n  top: 20px;\n  right: 20px;\n  width: 202px;\n  text-align: right;\n  z-index: 9000;\n}\n\n#respec-pill,\n.respec-info-button {\n  background: #fff;\n  height: 2.5em;\n  color: rgb(120, 120, 120);\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n}\n\n.respec-info-button {\n  border: none;\n  opacity: 0.75;\n  border-radius: 2em;\n  margin-right: 1em;\n  min-width: 3.5em;\n}\n\n.respec-info-button:focus,\n.respec-info-button:hover {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#respec-pill:disabled {\n  font-size: 2.8px;\n  text-indent: -9999em;\n  border-top: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-right: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-bottom: 1.1em solid rgba(40, 40, 40, 0.2);\n  border-left: 1.1em solid #ffffff;\n  transform: translateZ(0);\n  animation: respec-spin 0.5s infinite linear;\n  box-shadow: none;\n}\n\n#respec-pill:disabled,\n#respec-pill:disabled:after {\n  border-radius: 50%;\n  width: 10em;\n  height: 10em;\n}\n\n@keyframes respec-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.respec-hidden {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s linear;\n}\n\n.respec-visible {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.2s linear;\n}\n\n#respec-pill:hover,\n#respec-pill:focus {\n  color: rgb(0, 0, 0);\n  background-color: rgb(245, 245, 245);\n  transition: color 0.2s;\n}\n\n#respec-menu {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background: #fff;\n  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.5);\n  width: 200px;\n  display: none;\n  text-align: left;\n  margin-top: 32px;\n  font-size: 0.8em;\n}\n\n#respec-menu:not([hidden]) {\n  display: block;\n}\n\n#respec-menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.respec-save-buttons {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(47%, 2fr));\n  grid-gap: 0.5cm;\n  padding: 0.5cm;\n}\n\n.respec-save-button:link {\n  padding-top: 16px;\n  color: rgb(240, 240, 240);\n  background: rgb(42, 90, 168);\n  justify-self: stretch;\n  height: 1cm;\n  text-decoration: none;\n  text-align: center;\n  font-size: inherit;\n  border: none;\n  border-radius: 0.2cm;\n}\n\n.respec-save-button:link:hover {\n  color: white;\n  background: rgb(42, 90, 168);\n  padding: 0;\n  margin: 0;\n  border: 0;\n  padding-top: 16px;\n}\n\n#respec-ui button:focus,\n#respec-pill:focus,\n.respec-option:focus {\n  outline: 0;\n  outline-style: none;\n}\n\n#respec-pill-error {\n  background-color: red;\n  color: white;\n}\n\n#respec-pill-warning {\n  background-color: orange;\n  color: white;\n}\n\n.respec-warning-list,\n.respec-error-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  font-family: sans-serif;\n  background-color: rgb(255, 251, 230);\n  font-size: 0.85em;\n}\n\n.respec-warning-list > li,\n.respec-error-list > li {\n  padding: 0.4em 0.7em;\n}\n\n.respec-warning-list > li::before {\n  content: "⚠️";\n  padding-right: 0.5em;\n}\n.respec-warning-list p,\n.respec-error-list p {\n  padding: 0;\n  margin: 0;\n}\n\n.respec-warning-list li {\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 245, 194);\n}\n\n.respec-error-list,\n.respec-error-list li {\n  background-color: rgb(255, 240, 240);\n}\n\n.respec-error-list li::before {\n  content: "💥";\n  padding-right: 0.5em;\n}\n\n.respec-error-list li {\n  padding: 0.4em 0.7em;\n  color: rgb(92, 59, 0);\n  border-bottom: thin solid rgb(255, 215, 215);\n}\n\n.respec-error-list li > p {\n  margin: 0;\n  padding: 0;\n  display: inline-block;\n}\n\n#respec-overlay {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%;\n  background: #000;\n}\n\n.respec-show-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0.5;\n}\n\n.respec-hide-overlay {\n  transition: opacity 0.2s linear;\n  opacity: 0;\n}\n\n.respec-modal {\n  display: block;\n  position: fixed;\n  z-index: 11000;\n  margin: auto;\n  top: 10%;\n  background: #fff;\n  border: 5px solid #666;\n  min-width: 20%;\n  width: 79%;\n  padding: 0;\n  max-height: 80%;\n  overflow-y: auto;\n  margin: 0 -0.5cm;\n}\n\n@media screen and (min-width: 78em) {\n  .respec-modal {\n    width: 62%;\n  }\n}\n\n.respec-modal h3 {\n  margin: 0;\n  padding: 0.2em;\n  text-align: center;\n  color: black;\n  background: linear-gradient(\n    to bottom,\n    rgba(238, 238, 238, 1) 0%,\n    rgba(238, 238, 238, 1) 50%,\n    rgba(204, 204, 204, 1) 100%\n  );\n  font-size: 1em;\n}\n\n.respec-modal .inside div p {\n  padding-left: 1cm;\n}\n\n#respec-menu button.respec-option {\n  background: white;\n  padding: 0 0.2cm;\n  border: none;\n  width: 100%;\n  text-align: left;\n  font-size: inherit;\n  padding: 1.2em 1.2em;\n}\n\n#respec-menu button.respec-option:hover,\n#respec-menu button:focus {\n  background-color: #eeeeee;\n}\n\n.respec-cmd-icon {\n  padding-right: 0.5em;\n}\n\n#respec-ui button.respec-option:last-child {\n  border: none;\n  border-radius: inherit;\n}\n\n.respec-button-copy-paste {\n  position: absolute;\n  height: 28px;\n  width: 40px;\n  cursor: pointer;\n  background-image: linear-gradient(#fcfcfc, #eee);\n  border: 1px solid rgb(144, 184, 222);\n  border-left: 0;\n  border-radius: 0px 0px 3px 0;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  top: 0;\n  left: 127px;\n}\n\n#specref-ui {\n  margin: 0 2%;\n  margin-bottom: 0.5cm;\n}\n\n#specref-ui header {\n  font-size: 0.7em;\n  background-color: #eee;\n  text-align: center;\n  padding: 0.2cm;\n  margin-bottom: 0.5cm;\n  border-radius: 0 0 0.2cm 0.2cm;\n}\n\n#specref-ui header h1 {\n  padding: 0;\n  margin: 0;\n  color: black;\n}\n\n#specref-ui p {\n  padding: 0;\n  margin: 0;\n  font-size: 0.8em;\n  text-align: center;\n}\n\n#specref-ui p.state {\n  margin: 1cm;\n}\n\n#specref-ui .searchcomponent {\n  font-size: 16px;\n  display: grid;\n  grid-template-columns: auto 2cm;\n}\n#specref-ui .searchcomponent:focus {\n}\n\n#specref-ui input,\n#specref-ui button {\n  border: 0;\n  padding: 6px 12px;\n}\n\n#specref-ui label {\n  font-size: 0.6em;\n  grid-column-end: 3;\n  text-align: right;\n  grid-column-start: 1;\n}\n\n#specref-ui input[type="search"] {\n  -webkit-appearance: none;\n  font-size: 16px;\n  border-radius: 0.1cm 0 0 0.1cm;\n  border: 1px solid rgb(204, 204, 204);\n}\n\n#specref-ui button[type="submit"] {\n  color: white;\n  border-radius: 0 0.1cm 0.1cm 0;\n  background-color: rgb(51, 122, 183);\n}\n\n#specref-ui button[type="submit"]:hover {\n  background-color: #286090;\n  border-color: #204d74;\n}\n\n#specref-ui .result-stats {\n  margin: 0;\n  padding: 0;\n  color: rgb(128, 128, 128);\n  font-size: 0.7em;\n  font-weight: bold;\n}\n\n#specref-ui .specref-results {\n  font-size: 0.8em;\n}\n\n#specref-ui .specref-results dd + dt {\n  margin-top: 0.51cm;\n}\n\n#specref-ui .specref-results a {\n  text-transform: capitalize;\n}\n#specref-ui .specref-results .authors {\n  display: block;\n  color: #006621;\n}\n\n@media print {\n  #respec-ui {\n    display: none;\n  }\n}\n\n#xref-ui {\n  width: 100%;\n  min-height: 550px;\n  height: 100%;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n#xref-ui:not(.ready) {\n  background: url("https://respec.org/xref/loader.gif") no-repeat center;\n}\n',ui$3=Object.freeze({__proto__:null,default:ui$2}),respec='/*****************************************************************\n * ReSpec specific CSS\n *****************************************************************/\n@keyframes pop {\n  0% {\n    transform: scale(1, 1);\n  }\n  25% {\n    transform: scale(1.25, 1.25);\n    opacity: 0.75;\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n}\n\n/* Override code highlighter background */\n.hljs {\n  background: transparent !important;\n}\n\n/* --- INLINES --- */\nh1 abbr,\nh2 abbr,\nh3 abbr,\nh4 abbr,\nh5 abbr,\nh6 abbr,\na abbr {\n  border: none;\n}\n\ndfn {\n  font-weight: bold;\n}\n\na.internalDFN {\n  color: inherit;\n  border-bottom: 1px solid #99c;\n  text-decoration: none;\n}\n\na.externalDFN {\n  color: inherit;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\na.bibref {\n  text-decoration: none;\n}\n\n.respec-offending-element:target {\n  animation: pop 0.25s ease-in-out 0s 1;\n}\n\n.respec-offending-element,\na[href].respec-offending-element {\n  text-decoration: red wavy underline;\n}\n@supports not (text-decoration: red wavy underline) {\n  .respec-offending-element:not(pre) {\n    display: inline-block;\n  }\n  .respec-offending-element {\n    /* Red squiggly line */\n    background: url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=)\n      bottom repeat-x;\n  }\n}\n\n#references :target {\n  background: #eaf3ff;\n  animation: pop 0.4s ease-in-out 0s 1;\n}\n\ncite .bibref {\n  font-style: normal;\n}\n\ncode {\n  color: #c83500;\n}\n\nth code {\n  color: inherit;\n}\n\na[href].orcid {\n    padding-left: 4px;\n    padding-right: 4px;\n}\n\na[href].orcid > svg {\n    margin-bottom: -2px;\n}\n\n/* --- TOC --- */\n\n.toc a,\n.tof a {\n  text-decoration: none;\n}\n\na .secno,\na .figno {\n  color: #000;\n}\n\nul.tof,\nol.tof {\n  list-style: none outside none;\n}\n\n.caption {\n  margin-top: 0.5em;\n  font-style: italic;\n}\n\n/* --- TABLE --- */\n\ntable.simple {\n  border-spacing: 0;\n  border-collapse: collapse;\n  border-bottom: 3px solid #005a9c;\n}\n\n.simple th {\n  background: #005a9c;\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th a {\n  color: #fff;\n  padding: 3px 5px;\n  text-align: left;\n}\n\n.simple th[scope="row"] {\n  background: inherit;\n  color: inherit;\n  border-top: 1px solid #ddd;\n}\n\n.simple td {\n  padding: 3px 10px;\n  border-top: 1px solid #ddd;\n}\n\n.simple tr:nth-child(even) {\n  background: #f0f6ff;\n}\n\n/* --- DL --- */\n\n.section dd > p:first-child {\n  margin-top: 0;\n}\n\n.section dd > p:last-child {\n  margin-bottom: 0;\n}\n\n.section dd {\n  margin-bottom: 1em;\n}\n\n.section dl.attrs dd,\n.section dl.eldef dd {\n  margin-bottom: 0;\n}\n\n#issue-summary > ul,\n.respec-dfn-list {\n  column-count: 2;\n}\n\n#issue-summary li,\n.respec-dfn-list li {\n  list-style: none;\n}\n\ndetails.respec-tests-details {\n  margin-left: 1em;\n  display: inline-block;\n  vertical-align: top;\n}\n\ndetails.respec-tests-details > * {\n  padding-right: 2em;\n}\n\ndetails.respec-tests-details[open] {\n  z-index: 999999;\n  position: absolute;\n  border: thin solid #cad3e2;\n  border-radius: 0.3em;\n  background-color: white;\n  padding-bottom: 0.5em;\n}\n\ndetails.respec-tests-details[open] > summary {\n  border-bottom: thin solid #cad3e2;\n  padding-left: 1em;\n  margin-bottom: 1em;\n  line-height: 2em;\n}\n\ndetails.respec-tests-details > ul {\n  width: 100%;\n  margin-top: -0.3em;\n}\n\ndetails.respec-tests-details > li {\n  padding-left: 1em;\n}\n\na[href].self-link:hover {\n  opacity: 1;\n  text-decoration: none;\n  background-color: transparent;\n}\n\nh2,\nh3,\nh4,\nh5,\nh6 {\n  position: relative;\n}\n\naside.example .marker > a.self-link {\n  color: inherit;\n}\n\nh2 > a.self-link,\nh3 > a.self-link,\nh4 > a.self-link,\nh5 > a.self-link,\nh6 > a.self-link {\n  border: none;\n  color: inherit;\n  font-size: 83%;\n  height: 2em;\n  left: -1.6em;\n  opacity: 0.5;\n  position: absolute;\n  text-align: center;\n  text-decoration: none;\n  top: 0;\n  transition: opacity 0.2s;\n  width: 2em;\n}\n\nh2 > a.self-link::before,\nh3 > a.self-link::before,\nh4 > a.self-link::before,\nh5 > a.self-link::before,\nh6 > a.self-link::before {\n  content: "§";\n  display: block;\n}\n\n@media (max-width: 767px) {\n  dd {\n    margin-left: 0;\n  }\n\n  /* Don\'t position self-link in headings off-screen */\n  h2 > a.self-link,\n  h3 > a.self-link,\n  h4 > a.self-link,\n  h5 > a.self-link,\n  h6 > a.self-link {\n    left: auto;\n    top: auto;\n  }\n}\n\n@media print {\n  .removeOnSave {\n    display: none;\n  }\n}\n',respec$1=Object.freeze({__proto__:null,default:respec}),examples$1="/* --- EXAMPLES --- */\nspan.example-title {\n    text-transform: none;\n}\naside.example, div.example, div.illegal-example {\n    padding: 0.5em;\n    margin: 1em 0;\n    position: relative;\n    clear: both;\n}\ndiv.illegal-example { color: red }\ndiv.illegal-example p { color: black }\naside.example, div.example {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n    border-color: #e0cb52;\n    background: #fcfaee;\n}\n\naside.example div.example {\n    border-left-width: .1em;\n    border-color: #999;\n    background: #fff;\n}\naside.example div.example span.example-title {\n    color: #999;\n}\n",examples$2=Object.freeze({__proto__:null,default:examples$1}),issuesNotes$1='/* --- ISSUES/NOTES --- */\n.issue-label {\n    text-transform: initial;\n}\n\n.warning > p:first-child { margin-top: 0 }\n.warning {\n    padding: .5em;\n    border-left-width: .5em;\n    border-left-style: solid;\n}\nspan.warning { padding: .1em .5em .15em; }\n\n.issue.closed span.issue-number {\n    text-decoration: line-through;\n}\n\n.warning {\n    border-color: #f11;\n    border-width: .2em;\n    border-style: solid;\n    background: #fbe9e9;\n}\n\n.warning-title:before{\n    content: "⚠"; /*U+26A0 WARNING SIGN*/\n    font-size: 1.3em;\n    float: left;\n    padding-right: .3em;\n    margin-top: -0.3em;\n}\n\nli.task-list-item {\n    list-style: none;\n}\n\ninput.task-list-item-checkbox {\n    margin: 0 0.35em 0.25em -1.6em;\n    vertical-align: middle;\n}\n\n.issue a.respec-gh-label {\n  padding: 5px;\n  margin: 0 2px 0 2px;\n  font-size: 10px;\n  text-transform: none;\n  text-decoration: none;\n  font-weight: bold;\n  border-radius: 4px;\n  position: relative;\n  bottom: 2px;\n  border: none;\n  display: inline-block;\n}\n\n.issue a.respec-label-dark {\n  color: #fff;\n  background-color: #000;\n}\n\n.issue a.respec-label-light {\n  color: #000;\n  background-color: #fff;\n}\n',issuesNotes$2=Object.freeze({__proto__:null,default:issuesNotes$1}),webidl$1="/* --- WEB IDL --- */\n\npre.idl {\n  padding: 1em;\n  position: relative;\n}\n\n@media print {\n  pre.idl {\n    white-space: pre-wrap;\n  }\n}\n\ndiv.idlHeader {\n  display: block;\n  width: 150px;\n  background: #90b8de;\n  color: #fff;\n  font-family: sans-serif;\n  font-weight: bold;\n  margin: -1em 0 1em -1em;\n  height: 28px;\n  line-height: 28px;\n}\n\ndiv.idlHeader a.self-link {\n   color: #fff;\n   margin-left: .3cm;\n   text-decoration: none;\n   border-bottom: none;\n}\n\n.idlID {\n  font-weight: bold;\n  color: #005a9c;\n}\n\n.idlType {\n  color: #005a9c;\n}\n\n.idlName {\n  color: #ff4500;\n}\n\n.idlName a {\n  color: #ff4500;\n  border-bottom: 1px dotted #ff4500;\n  text-decoration: none;\n}\n\na.idlEnumItem {\n  color: #000;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\n.idlSuperclass {\n  font-style: italic;\n  color: #005a9c;\n}\n\n\n/*.idlParam*/\n\n.idlParamName,\n.idlDefaultValue {\n  font-style: italic;\n}\n\n.extAttr {\n  color: #666;\n}\n\n\n/*.idlSectionComment*/\n\n.idlSectionComment {\n  color: gray;\n}\n\n.idlIncludes a {\n  font-weight: bold;\n}\n\n.respec-button-copy-paste:focus {\n  text-decoration: none;\n  border-color: #51a7e8;\n  outline: none;\n  box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);\n}\n\n.respec-button-copy-paste:focus:hover,\n.respec-button-copy-paste.selected:focus {\n  border-color: #51a7e8;\n}\n\n.respec-button-copy-paste:hover,\n.respec-button-copy-paste:active,\n.respec-button-copy-paste.zeroclipboard-is-hover,\n.respec-button-copy-paste.zeroclipboard-is-active {\n  text-decoration: none;\n  background-color: #ddd;\n  background-image: linear-gradient(#eee, #ddd);\n  border-color: #ccc;\n}\n\n.respec-button-copy-paste:active,\n.respec-button-copy-paste.selected,\n.respec-button-copy-paste.zeroclipboard-is-active {\n  background-color: #dcdcdc;\n  background-image: none;\n  border-color: #b5b5b5;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15)\n}\n\n.respec-button-copy-paste.selected:hover {\n  background-color: #cfcfcf;\n}\n\n.respec-button-copy-paste:disabled,\n.respec-button-copy-paste:disabled:hover,\n.respec-button-copy-paste.disabled,\n.respec-button-copy-paste.disabled:hover {\n  color: rgba(102, 102, 102, 0.5);\n  cursor: default;\n  background-color: rgba(229, 229, 229, 0.5);\n  background-image: none;\n  border-color: rgba(197, 197, 197, 0.5);\n  box-shadow: none;\n}\n\n@media print {\n  .respec-button-copy-paste {\n    visibility: hidden;\n  }\n}\n",webidl$2=Object.freeze({__proto__:null,default:webidl$1}),caniuse$1='/* container for stats */\n.caniuse-stats {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: baseline;\n  cursor: pointer;\n}\n\nbutton.caniuse-cell {\n  margin: 1px 1px 0 0;\n  border: none;\n}\n\n.caniuse-browser {\n  position: relative;\n}\n\n/* handle case when printing */\n@media print {\n  .caniuse-cell.y::before {\n    content: "✔️";\n    padding: 0.5em;\n  }\n\n  .caniuse-cell.n::before{\n    content: "❌";\n    padding: 0.5em;\n  }\n\n  .caniuse-cell.d::before,\n  .caniuse-cell.a::before,\n  .caniuse-cell.x::before,\n  .caniuse-cell.p::before {\n    content: "⚠️";\n    padding: 0.5em;\n  }\n}\n\n/* reset styles, hide old versions by default */\n.caniuse-browser ul {\n  display: none;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  left: 0;\n  z-index: 2;\n  background: #fff;\n  margin-top: 1px;\n}\n\n.caniuse-stats a {\n  white-space: nowrap;\n  align-self: center;\n  margin-left: .5em;\n}\n\n/* a browser version */\n.caniuse-cell {\n  display: flex;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 90%;\n  height: 0.8cm;\n  margin-right: 1px;\n  margin-top: 0;\n  min-width: 3cm;\n  overflow: visible;\n  justify-content: center;\n  align-items: center;\n}\n\nli.caniuse-cell {\n  margin-bottom: 1px;\n}\n\n.caniuse-cell:focus {\n  outline: none;\n}\n\n.caniuse-cell:hover {\n  color: rgba(0, 0, 0, 1);\n}\n\n/* supports */\n.caniuse-cell.y {\n  background: #8bc34a;\n}\n\n/* no support */\n.caniuse-cell.n {\n  background: #e53935;\n}\n\n/* not supported by default / partial support etc\nsee https://github.com/Fyrd/caniuse/blob/master/CONTRIBUTING.md for stats */\n.caniuse-cell.d,\n.caniuse-cell.a,\n.caniuse-cell.x,\n.caniuse-cell.p {\n  background: #ffc107;\n}\n\n/* show rest of the browser versions */\n.caniuse-stats button:focus + ul,\n.caniuse-stats .caniuse-browser:hover > ul {\n  display: block;\n}\n',caniuse$2=Object.freeze({__proto__:null,default:caniuse$1}),mdnAnnotation$1='.mdn {\n  display: block;\n  font: 12px sans-serif;\n  position: absolute;\n  z-index: 9;\n  right: 0.3em;\n  background-color: #eee;\n  margin: -26px 0 0 0;\n  padding: 7px 5px 5px 6px;\n  min-width: 140px;\n  box-shadow: 0 0 3px #999;\n}\n\n.mdn button {\n  cursor: pointer;\n  border: none;\n  color: #000;\n  background: transparent;\n  margin: -8px;\n  outline: none;\n}\n\n.mdn b {\n  color: #fff;\n  background-color: #000;\n  font-weight: normal;\n  font-family: zillaslab, Palatino, "Palatino Linotype", serif;\n  padding: 2px 3px 0px 3px;\n  line-height: 1.3em;\n  vertical-align: top;\n}\n\n.mdn > div > div {\n  display: inline-block;\n  margin-left: 5px;\n}\n\n\n.nosupportdata {\n  font-style: italic;\n  margin-top: 4px;\n  margin-left: 8px;\n  padding-bottom: 8px;\n}\n\n.mdnsupport {\n  display: table;\n  margin-top: 4px;\n}\n\n.mdnsupport > span {\n  display: table-row;\n  padding: 0.2em 0;\n  padding-top: 0.2em;\n  font-size: 9.6px;\n}\n\n.mdnsupport > span > span {\n  display: table-cell;\n  padding: 0 0.5em;\n  vertical-align: top;\n  line-height: 1.5em;\n}\n\n.mdnsupport > span > span:last-child {\n  text-align: right;\n  padding: 0;\n}\n\n.mdnsupport > span.no {\n  color: #cccccc;\n  filter: grayscale(100%);\n}\n\n.mdnsupport > span.unknown {\n  color: #cccccc;\n  filter: grayscale(100%);\n}\n\n.mdnsupport > span.no::before {\n  opacity: 0.5;\n}\n\n.mdnsupport > span.unknown::before {\n  opacity: 0.5;\n}\n\n.mdnsupport > span::before {\n  content: "";\n  display: table-cell;\n  min-width: 1.5em;\n  height: 1.5em;\n  background: no-repeat center center / contain;\n  text-align: right;\n  font-size: 0.75em;\n  font-weight: bold;\n}\n\n.mdnsupport > .chrome::before,\n.mdnsupport > .chrome_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/chrome.svg);\n}\n\n.mdnsupport > .edge::before,\n.mdnsupport > .edge_mobile::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/edge.svg);\n}\n\n.mdnsupport > .firefox::before,\n.mdnsupport > .firefox_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/firefox.png);\n}\n\n.mdnsupport > .ie::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/ie.png);\n}\n\n.mdnsupport > .opera::before,\n.mdnsupport > .opera_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/opera.svg);\n}\n\n.mdnsupport > .safari::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/safari.png);\n}\n\n.mdnsupport > .safari_ios::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/safari-ios.svg);\n}\n\n.mdnsupport > .samsunginternet_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/samsung.svg);\n}\n\n.mdnsupport > .webview_android::before {\n  background-image: url(https://cdnjs.loli.net/ajax/libs/browser-logos/41.0.0/android-webview-beta/android-webview-beta_32x32.png);\n}\n\n.mdn.wrapped div:nth-child(n + 3) {\n  display: none;\n}\n\n.mdn div:nth-child(n + 3) > b {\n  color: #eee;\n  background-color: #eee;\n}\n\np + .mdn {\n  margin-top: -45px;\n}\n\n.mdn.before {\n  margin-top: 3em;\n}\n\nh2 + .mdn {\n  margin: -48px 0 0 0;\n}\n\nh3 + .mdn {\n  margin: -46px 0 0 0;\n}\n\nh4 + .mdn {\n  margin: -42px 0 0 0;\n}\n\nh5 + .mdn {\n  margin: -40px 0 0 0;\n}\n\nh6 + .mdn {\n  margin: -40px 0 0 0;\n}\n\n.mdn div {\n  margin: 0;\n}\n\n.mdn :link {\n  color: #0000ee;\n}\n\n.mdn :visited {\n  color: #551a8b;\n}\n\n.mdn :link:active,\n:visited:active {\n  color: #ff0000;\n}\n\n.mdn :link,\n:visited {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.mdn.wrapped {\n  min-width: 0px;\n}\n\n.mdn.wrapped > div > div {\n  display: none;\n}\n\n.mdn:hover {\n  z-index: 11;\n}\n\n.mdn:focus-within {\n  z-index: 11;\n}\n',mdnAnnotation$2=Object.freeze({__proto__:null,default:mdnAnnotation$1}),respecWorker='// ReSpec Worker v1.0.0\n"use strict";\ntry {\n  importScripts("https://www.w3.org/Tools/respec/respec-highlight.js");\n} catch (err) {\n  console.error("Network error loading highlighter", err);\n}\n\nself.addEventListener("message", ({ data: originalData }) => {\n  const data = Object.assign({}, originalData);\n  switch (data.action) {\n    case "highlight-load-lang": {\n      const { langURL, propName, lang } = data;\n      importScripts(langURL);\n      self.hljs.registerLanguage(lang, self[propName]);\n      break;\n    }\n    case "highlight": {\n      const { code } = data;\n      const langs = data.languages.length ? data.languages : undefined;\n      try {\n        const { value, language } = self.hljs.highlightAuto(code, langs);\n        Object.assign(data, { value, language });\n      } catch (err) {\n        console.error("Could not transform some code?", err);\n        // Post back the original code\n        Object.assign(data, { value: code, language: "" });\n      }\n      break;\n    }\n  }\n  self.postMessage(data);\n});\n',respecWorker$1=Object.freeze({__proto__:null,default:respecWorker}),highlight$1="/*\nAtom One Light by Daniel Gamage\nOriginal One Light Syntax theme from https://github.com/atom/one-light-syntax\nbase:    #fafafa\nmono-1:  #383a42\nmono-2:  #686b77\nmono-3:  #a0a1a7\nhue-1:   #0184bb\nhue-2:   #4078f2\nhue-3:   #a626a4\nhue-4:   #50a14f\nhue-5:   #e45649\nhue-5-2: #c91243\nhue-6:   #986801\nhue-6-2: #c18401\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #383a42;\n  background: #fafafa;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #a0a1a7;\n  font-style: italic;\n}\n\n.hljs-doctag,\n.hljs-keyword,\n.hljs-formula {\n  color: #a626a4;\n}\n\n.hljs-section,\n.hljs-name,\n.hljs-selector-tag,\n.hljs-deletion,\n.hljs-subst {\n  color: #e45649;\n}\n\n.hljs-literal {\n  color: #0184bb;\n}\n\n.hljs-string,\n.hljs-regexp,\n.hljs-addition,\n.hljs-attribute,\n.hljs-meta-string {\n  color: #50a14f;\n}\n\n.hljs-built_in,\n.hljs-class .hljs-title {\n  color: #c18401;\n}\n\n.hljs-attr,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-type,\n.hljs-selector-class,\n.hljs-selector-attr,\n.hljs-selector-pseudo,\n.hljs-number {\n  color: #986801;\n}\n\n.hljs-symbol,\n.hljs-bullet,\n.hljs-link,\n.hljs-meta,\n.hljs-selector-id,\n.hljs-title {\n  color: #4078f2;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n\n.hljs-link {\n  text-decoration: underline;\n}\n",highlight$2=Object.freeze({__proto__:null,default:highlight$1}),_var="var:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nvar.respec-hl {\n  color: var(--color, #000);\n  background-color: var(--bg-color);\n  box-shadow: 0 0 0px 2px var(--bg-color);\n}\n\n/* highlight colors\n  https://github.com/w3c/tr-design/issues/152\n*/\nvar.respec-hl-c1 {\n  --bg-color: #f4d200;\n}\n\nvar.respec-hl-c2 {\n  --bg-color: #ff87a2;\n}\n\nvar.respec-hl-c3 {\n  --bg-color: #96e885;\n}\n\nvar.respec-hl-c4 {\n  --bg-color: #3eeed2;\n}\n\nvar.respec-hl-c5 {\n  --bg-color: #eacfb6;\n}\n\nvar.respec-hl-c6 {\n  --bg-color: #82ddff;\n}\n\nvar.respec-hl-c7 {\n  --bg-color: #ffbcf2;\n}\n\n@media print {\n  var.respec-hl {\n    background: none;\n    color: #000;\n    box-shadow: unset;\n  }\n}\n",_var$1=Object.freeze({__proto__:null,default:_var}),dfnPanel$1="/* dfn popup panel that list all local references to a dfn */\ndfn {\n  cursor: pointer;\n}\n\n.dfn-panel {\n  position: absolute;\n  left: var(--left); /* set via JS */\n  top: var(--top); /* set via JS */\n  z-index: 35;\n  height: auto;\n  width: max-content;\n  max-width: 300px;\n  max-height: 500px;\n  overflow: auto;\n  padding: 0.5em 0.75em;\n  font: small Helvetica Neue, sans-serif, Droid Sans Fallback;\n  background: #dddddd;\n  color: black;\n  border: outset 0.2em;\n}\n\n.dfn-panel * {\n  margin: 0;\n}\n\n.dfn-panel > b {\n  display: block;\n}\n\n.dfn-panel ul a[href] {\n  color: black;\n}\n\n.dfn-panel a:not(:hover) {\n  text-decoration: none !important;\n  border-bottom: none !important;\n}\n\n.dfn-panel a[href]:hover {\n  border-bottom-width: 1px;\n}\n\n.dfn-panel > b + b {\n  margin-top: 0.25em;\n}\n\n.dfn-panel ul {\n  padding: 0;\n}\n\n.dfn-panel li {\n  list-style: inside;\n}\n\n.dfn-panel.docked {\n  display: inline-block;\n  position: fixed;\n  left: 0.5em;\n  top: unset;\n  bottom: 2em;\n  margin: 0 auto;\n  /* 0.75em from padding (x2), 0.5em from left position, 0.2em border (x2) */\n  max-width: calc(100vw - 0.75em * 2 - 0.5em - 0.2em * 2);\n  max-height: 30vh;\n}\n",dfnPanel$2=Object.freeze({__proto__:null,default:dfnPanel$1}),datatype='var {\n  position: relative;\n  cursor: pointer;\n}\n\nvar[data-type]::before,\nvar[data-type]::after {\n  position: absolute;\n  left: 50%;\n  top: -6px;\n  opacity: 0;\n  transition: opacity 0.4s;\n  pointer-events: none;\n}\n\n/* the triangle or arrow or caret or whatever */\nvar[data-type]::before {\n  content: "";\n  transform: translateX(-50%);\n  border-width: 4px 6px 0 6px;\n  border-style: solid;\n  border-color: transparent;\n  border-top-color: #000;\n}\n\n/* actual text */\nvar[data-type]::after {\n  content: attr(data-type);\n  transform: translateX(-50%) translateY(-100%);\n  background: #000;\n  text-align: center;\n  /* additional styling */\n  font-family: "Dank Mono", "Fira Code", monospace;\n  font-style: normal;\n  padding: 6px;\n  border-radius: 3px;\n  color: #daca88;\n  text-indent: 0;\n  font-weight: normal;\n}\n\nvar[data-type]:hover::after,\nvar[data-type]:hover::before {\n  opacity: 1;\n}\n',datatype$1=Object.freeze({__proto__:null,default:datatype}),algorithms$1="/* For assertions in lists containing algorithms */\n\n.assert {\n    background: #EEE;\n    border-left: 0.5em solid #AAA;\n    padding: 0.3em;\n}\n",algorithms$2=Object.freeze({__proto__:null,default:algorithms$1});
=======
    <tbody>${entries}</tbody>
  </table>
`;
}

function perfEntryToTR({ name, duration }) {
  const render = hyperHTML$1.bind(document.createElement("tr"));
  const moduleURL = `https://github.com/w3c/respec/tree/develop/src/${name}.js`;
  return render`
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

const name$M = "core/seo";

function run$B() {
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
  name: name$M,
  run: run$B
});

// @ts-check
const name$N = "w3c/seo";
function run$C(conf) {
  // Don't include a canonical URL for documents
  // that haven't been published.
  if (!conf.canonicalURI) {
    switch (conf.specStatus) {
      case "CG-DRAFT":
      case "BG-DRAFT":
      case "unofficial":
        return;
    }
  }
  const trLatestUri = conf.shortName
    ? `https://www.w3.org/TR/${conf.shortName}/`
    : null;
  switch (conf.canonicalURI) {
    case "edDraft":
      if (conf.edDraftURI) {
        conf.canonicalURI = new URL(
          conf.edDraftURI,
          document.location.href
        ).href;
      } else {
        pub(
          "warn",
          "Canonical URI set to edDraft, " +
            "but no edDraftURI is set in configuration"
        );
        conf.canonicalURI = null;
      }
      break;
    case "TR":
      if (trLatestUri) {
        conf.canonicalURI = trLatestUri;
      } else {
        pub(
          "warn",
          "Canonical URI set to TR, but " +
            "no shortName is set in configuration"
        );
        conf.canonicalURI = null;
      }
      break;
    default:
      if (conf.canonicalURI) {
        try {
          conf.canonicalURI = new URL(
            conf.canonicalURI,
            document.location.href
          ).href;
        } catch (err) {
          pub("warn", `CanonicalURI is an invalid URL: ${err.message}`);
          conf.canonicalURI = null;
        }
      } else if (trLatestUri) {
        conf.canonicalURI = trLatestUri;
      }
  }
  if (conf.canonicalURI) {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "canonical");
    linkElem.setAttribute("href", conf.canonicalURI);
    document.head.appendChild(linkElem);
  }
  if (conf.doJsonLd) {
    addJSONLDInfo(conf, document);
  }
}

async function addJSONLDInfo(conf, doc) {
  await doc.respecIsReady;
  // Content for JSON
  const type = ["TechArticle"];
  if (conf.rdfStatus) type.push(conf.rdfStatus);

  const jsonld = {
    "@context": [
      "http://schema.org",
      {
        "@vocab": "http://schema.org/",
        "@language": doc.documentElement.lang || "en",
        w3p: "http://www.w3.org/2001/02pd/rec54#",
        foaf: "http://xmlns.com/foaf/0.1/",
        datePublished: { "@type": "http://www.w3.org/2001/XMLSchema#date" },
        inLanguage: { "@language": null },
        isBasedOn: { "@type": "@id" },
        license: { "@type": "@id" },
      },
    ],
    id: conf.canonicalURI || conf.thisVersion,
    type,
    name: conf.title,
    inLanguage: doc.documentElement.lang || "en",
    license: conf.licenseInfo.url,
    datePublished: conf.dashDate,
    /** @type {{ name: string, url?: string } | { name: string, url?: string }[]} */
    copyrightHolder: {
      name: "World Wide Web Consortium",
      url: "https://www.w3.org/",
    },
    discussionUrl: conf.issueBase,
    alternativeHeadline: conf.subtitle,
    isBasedOn: conf.prevVersion,
  };

  // add any additional copyright holders
  if (conf.additionalCopyrightHolders) {
    const addl = Array.isArray(conf.additionalCopyrightHolders)
      ? conf.additionalCopyrightHolders
      : [conf.additionalCopyrightHolders];
    jsonld.copyrightHolder = [
      jsonld.copyrightHolder,
      ...addl.map(h => ({ name: h })),
    ];
  }

  // description from meta description
  const description = doc.head.querySelector("meta[name=description]");
  if (description) {
    jsonld.description = description.content;
  }

  // Editors
  if (conf.editors) {
    jsonld.editor = conf.editors.map(addPerson);
  }
  if (conf.authors) {
    jsonld.contributor = conf.authors.map(addPerson);
  }

  // normative and informative references
  jsonld.citation = [...conf.normativeReferences, ...conf.informativeReferences]
    .map(ref => biblio[ref])
    .filter(ref => typeof ref === "object")
    .map(addRef);

  const script = doc.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonld, null, 2);
  doc.head.appendChild(script);
}

/**
 * Turn editors and authors into a list of JSON-LD relationships
 */
function addPerson({ name, url, mailto, company, companyURL }) {
  const ed = {
    type: "Person",
    name,
    url,
    "foaf:mbox": mailto,
  };
  if (company || companyURL) {
    ed.worksFor = {
      name: company,
      url: companyURL,
    };
  }
  return ed;
}

/**
 * Create a reference URL from the ref
 */
function addRef(ref) {
  const { href: id, title: name, href: url } = ref;
  return {
    id,
    type: "TechArticle",
    name,
    url,
  };
}

var seo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$N,
  run: run$C
});

// @ts-check
/**
 * Module core/worker
 *
 * Exports a Web Worker for ReSpec, allowing for
 * multi-threaded processing of things.
 */
const name$O = "core/worker";
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

expose(name$O, workerPromise.then(worker => ({ worker })));

// @ts-check
const name$P = "core/highlight";

const nextMsgId = msgIdGenerator("highlight");

const ghCssPromise = loadStyle$7();

async function loadStyle$7() {
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

async function run$D(conf) {
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
  name: name$P,
  run: run$D
});

// @ts-check
const name$Q = "core/webidl-clipboard";

const copyButtonPromise = createButton();

async function loadSVG() {
  try {
    return (await Promise.resolve().then(function () { return clipboard$1; })).default;
  } catch {
    return fetchAsset("clipboard.svg");
  }
}

async function createButton() {
  const copyButton = document.createElement("button");
  copyButton.innerHTML = await loadSVG();
  copyButton.title = "Copy IDL to clipboard";
  copyButton.classList.add("respec-button-copy-paste", "removeOnSave");
  return copyButton;
}

async function run$E() {
  // This button serves a prototype that we clone as needed.
  const copyButton = await copyButtonPromise;
  for (const pre of document.querySelectorAll("pre.idl")) {
    const button = copyButton.cloneNode(true);
    button.addEventListener("click", () => {
      clipboardWriteText(pre.textContent);
    });
    pre.prepend(button);
  }
}

/**
 * Mocks navigator.clipboard.writeText()
 * @param {string} text
 */
function clipboardWriteText(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(resolve => {
    document.addEventListener(
      "copy",
      ev => {
        ev.clipboardData.setData("text/plain", text);
        resolve();
      },
      { once: true }
    );
    document.execCommand("copy");
  });
}

var webidlClipboard = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$Q,
  run: run$E
});

// @ts-check
const l10n$c = {
  en: {
    missing_test_suite_uri:
      "Found tests in your spec, but missing '" +
      "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' in your ReSpec config.",
    tests: "tests",
    test: "test",
  },
};

const name$R = "core/data-tests";

const lang$j = lang in l10n$c ? lang : "en";

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

function run$F(conf) {
  /** @type {NodeListOf<HTMLElement>} */
  const testables = document.querySelectorAll("[data-tests]");
  if (!testables.length) {
    return;
  }
  if (!conf.testSuiteURI) {
    pub("error", l10n$c[lang$j].missing_test_suite_uri);
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
            pub("warn", `${l10n$c[lang$j].bad_uri}: ${url}`);
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
  name: name$R,
  run: run$F
});

// @ts-check
const name$S = "core/list-sorter";

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

function run$G() {
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
  name: name$S,
  sortListItems: sortListItems,
  sortDefinitionTerms: sortDefinitionTerms,
  run: run$G
});

// @ts-check

const name$T = "core/highlight-vars";

const hlVarsPromise = loadStyle$8();

async function loadStyle$8() {
  try {
    return (await Promise.resolve().then(function () { return _var$1; })).default;
  } catch {
    return fetchAsset("var.css");
  }
}

async function run$H(conf) {
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
  name: name$T,
  run: run$H
});

// @ts-check

const name$U = "core/data-type";

const tooltipStylePromise = loadStyle$9();

async function loadStyle$9() {
  try {
    return (await Promise.resolve().then(function () { return datatype$1; })).default;
  } catch {
    return fetchAsset("datatype.css");
  }
}

async function run$I(conf) {
  if (!conf.highlightVars) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = await tooltipStylePromise;
  document.head.appendChild(style);

  let section = null;
  const varMap = new Map();
  /** @type {NodeListOf<HTMLElement>} */
  const variables = document.querySelectorAll("section var");
  for (const varElem of variables) {
    const currentSection = varElem.closest("section");
    if (section !== currentSection) {
      section = currentSection;
      varMap.clear();
    }
    if (varElem.dataset.type) {
      varMap.set(varElem.textContent.trim(), varElem.dataset.type);
      continue;
    }
    const type = varMap.get(varElem.textContent.trim());
    if (type) varElem.dataset.type = type;
  }
}

var dataType = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$U,
  run: run$I
});

// @ts-check

const name$V = "core/algorithms";

const cssPromise$3 = loadStyle$a();

async function loadStyle$a() {
  try {
    return (await Promise.resolve().then(function () { return algorithms$2; })).default;
  } catch {
    return fetchAsset("algorithms.css");
  }
}

async function run$J() {
  const elements = Array.from(document.querySelectorAll("ol.algorithm li"));
  elements
    .filter(li => li.textContent.trim().startsWith("Assert: "))
    .forEach(li => li.classList.add("assert"));
  if (document.querySelector(".assert")) {
    const style = document.createElement("style");
    style.textContent = await cssPromise$3;
    document.head.appendChild(style);
  }
}

var algorithms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name$V,
  run: run$J
});

// @ts-check

const name$W = "core/anchor-expander";

function run$K() {
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
  if (!figcaption) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching figure "${id}", but figure is lacking a \`<figcaption>\`.`;
    showInlineError(a, msg, "Missing figcaption in referenced figure.");
    return;
  }
  // remove the figure's title
  const children = [...makeSafeCopy(figcaption).childNodes].filter(
    node => !node.classList || !node.classList.contains("fig-title")
  );
  // drop an empty space at the end.
  children.pop();
  a.append(...children);
  a.classList.add("fig-ref");
  const figTitle = figcaption.querySelector(".fig-title");
  if (!a.hasAttribute("title") && figTitle) {
    a.title = norm(figTitle.textContent);
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
  name: name$W,
  run: run$K
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

var webidl$1 = "/* --- WEB IDL --- */\n\npre.idl {\n  padding: 1em;\n  position: relative;\n}\n\n@media print {\n  pre.idl {\n    white-space: pre-wrap;\n  }\n}\n\npre.idl::before {\n  content: \"WebIDL\";\n  display: block;\n  width: 150px;\n  background: #90b8de;\n  color: #fff;\n  font-family: sans-serif;\n  font-weight: bold;\n  margin: -1em 0 1em -1em;\n  height: 28px;\n  line-height: 28px;  \n}\n\n.idlID {\n  font-weight: bold;\n  color: #005a9c;\n}\n\n.idlType {\n  color: #005a9c;\n}\n\n.idlName {\n  color: #ff4500;\n}\n\n.idlName a {\n  color: #ff4500;\n  border-bottom: 1px dotted #ff4500;\n  text-decoration: none;\n}\n\na.idlEnumItem {\n  color: #000;\n  border-bottom: 1px dotted #ccc;\n  text-decoration: none;\n}\n\n.idlSuperclass {\n  font-style: italic;\n  color: #005a9c;\n}\n\n\n/*.idlParam*/\n\n.idlParamName,\n.idlDefaultValue {\n  font-style: italic;\n}\n\n.extAttr {\n  color: #666;\n}\n\n\n/*.idlSectionComment*/\n\n.idlSectionComment {\n  color: gray;\n}\n\n.idlIncludes a {\n  font-weight: bold;\n}\n\n.respec-button-copy-paste:focus {\n  text-decoration: none;\n  border-color: #51a7e8;\n  outline: none;\n  box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);\n}\n\n.respec-button-copy-paste:focus:hover,\n.respec-button-copy-paste.selected:focus {\n  border-color: #51a7e8;\n}\n\n.respec-button-copy-paste:hover,\n.respec-button-copy-paste:active,\n.respec-button-copy-paste.zeroclipboard-is-hover,\n.respec-button-copy-paste.zeroclipboard-is-active {\n  text-decoration: none;\n  background-color: #ddd;\n  background-image: linear-gradient(#eee, #ddd);\n  border-color: #ccc;\n}\n\n.respec-button-copy-paste:active,\n.respec-button-copy-paste.selected,\n.respec-button-copy-paste.zeroclipboard-is-active {\n  background-color: #dcdcdc;\n  background-image: none;\n  border-color: #b5b5b5;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15)\n}\n\n.respec-button-copy-paste.selected:hover {\n  background-color: #cfcfcf;\n}\n\n.respec-button-copy-paste:disabled,\n.respec-button-copy-paste:disabled:hover,\n.respec-button-copy-paste.disabled,\n.respec-button-copy-paste.disabled:hover {\n  color: rgba(102, 102, 102, 0.5);\n  cursor: default;\n  background-color: rgba(229, 229, 229, 0.5);\n  background-image: none;\n  border-color: rgba(197, 197, 197, 0.5);\n  box-shadow: none;\n}\n\n@media print {\n  .respec-button-copy-paste {\n    visibility: hidden;\n  }\n}\n";

var webidl$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': webidl$1
});

var caniuse$1 = "/* container for stats */\n.caniuse-stats {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: baseline;\n  cursor: pointer;\n}\n\nbutton.caniuse-cell {\n  margin: 1px 1px 0 0;\n  border: none;\n}\n\n.caniuse-browser {\n  position: relative;\n}\n\n/* handle case when printing */\n@media print {\n  .caniuse-cell.y::before {\n    content: \"✔️\";\n    padding: 0.5em;\n  }\n\n  .caniuse-cell.n::before{\n    content: \"❌\";\n    padding: 0.5em;\n  }\n\n  .caniuse-cell.d::before,\n  .caniuse-cell.a::before,\n  .caniuse-cell.x::before,\n  .caniuse-cell.p::before {\n    content: \"⚠️\";\n    padding: 0.5em;\n  }\n}\n\n/* reset styles, hide old versions by default */\n.caniuse-browser ul {\n  display: none;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  left: 0;\n  z-index: 2;\n  background: #fff;\n  margin-top: 1px;\n}\n\n.caniuse-stats a {\n  white-space: nowrap;\n  align-self: center;\n  margin-left: .5em;\n}\n\n/* a browser version */\n.caniuse-cell {\n  display: flex;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 90%;\n  height: 0.8cm;\n  margin-right: 1px;\n  margin-top: 0;\n  min-width: 3cm;\n  overflow: visible;\n  justify-content: center;\n  align-items: center;\n}\n\nli.caniuse-cell {\n  margin-bottom: 1px;\n}\n\n.caniuse-cell:focus {\n  outline: none;\n}\n\n.caniuse-cell:hover {\n  color: rgba(0, 0, 0, 1);\n}\n\n/* supports */\n.caniuse-cell.y {\n  background: #8bc34a;\n}\n\n/* no support */\n.caniuse-cell.n {\n  background: #e53935;\n}\n\n/* not supported by default / partial support etc\nsee https://github.com/Fyrd/caniuse/blob/master/CONTRIBUTING.md for stats */\n.caniuse-cell.d,\n.caniuse-cell.a,\n.caniuse-cell.x,\n.caniuse-cell.p {\n  background: #ffc107;\n}\n\n/* show rest of the browser versions */\n.caniuse-stats button:focus + ul,\n.caniuse-stats .caniuse-browser:hover > ul {\n  display: block;\n}\n";

var caniuse$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': caniuse$1
});

var mdnAnnotation$1 = ".mdn {\n  display: block;\n  font: 12px sans-serif;\n  position: absolute;\n  z-index: 9;\n  right: 0.3em;\n  background-color: #eee;\n  margin: -26px 0 0 0;\n  padding: 7px 5px 5px 6px;\n  min-width: 140px;\n  box-shadow: 0 0 3px #999;\n}\n\n.mdn button {\n  cursor: pointer;\n  border: none;\n  color: #000;\n  background: transparent;\n  margin: -8px;\n  outline: none;\n}\n\n.mdn b {\n  color: #fff;\n  background-color: #000;\n  font-weight: normal;\n  font-family: zillaslab, Palatino, \"Palatino Linotype\", serif;\n  padding: 2px 3px 0px 3px;\n  line-height: 1.3em;\n  vertical-align: top;\n}\n\n.mdn > div > div {\n  display: inline-block;\n  margin-left: 5px;\n}\n\n\n.nosupportdata {\n  font-style: italic;\n  margin-top: 4px;\n  margin-left: 8px;\n  padding-bottom: 8px;\n}\n\n.mdnsupport {\n  display: table;\n  margin-top: 4px;\n}\n\n.mdnsupport > span {\n  display: table-row;\n  padding: 0.2em 0;\n  padding-top: 0.2em;\n  font-size: 9.6px;\n}\n\n.mdnsupport > span > span {\n  display: table-cell;\n  padding: 0 0.5em;\n  vertical-align: top;\n  line-height: 1.5em;\n}\n\n.mdnsupport > span > span:last-child {\n  text-align: right;\n  padding: 0;\n}\n\n.mdnsupport > span.no {\n  color: #cccccc;\n  filter: grayscale(100%);\n}\n\n.mdnsupport > span.unknown {\n  color: #cccccc;\n  filter: grayscale(100%);\n}\n\n.mdnsupport > span.no::before {\n  opacity: 0.5;\n}\n\n.mdnsupport > span.unknown::before {\n  opacity: 0.5;\n}\n\n.mdnsupport > span::before {\n  content: \"\";\n  display: table-cell;\n  min-width: 1.5em;\n  height: 1.5em;\n  background: no-repeat center center / contain;\n  text-align: right;\n  font-size: 0.75em;\n  font-weight: bold;\n}\n\n.mdnsupport > .chrome::before,\n.mdnsupport > .chrome_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/chrome.svg);\n}\n\n.mdnsupport > .edge::before,\n.mdnsupport > .edge_mobile::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/edge.svg);\n}\n\n.mdnsupport > .firefox::before,\n.mdnsupport > .firefox_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/firefox.png);\n}\n\n.mdnsupport > .ie::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/ie.png);\n}\n\n.mdnsupport > .opera::before,\n.mdnsupport > .opera_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/opera.svg);\n}\n\n.mdnsupport > .safari::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/safari.png);\n}\n\n.mdnsupport > .safari_ios::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/safari-ios.svg);\n}\n\n.mdnsupport > .samsunginternet_android::before {\n  background-image: url(https://resources.whatwg.org/browser-logos/samsung.svg);\n}\n\n.mdnsupport > .webview_android::before {\n  background-image: url(https://cdnjs.loli.net/ajax/libs/browser-logos/41.0.0/android-webview-beta/android-webview-beta_32x32.png);\n}\n\n.mdn.wrapped div:nth-child(n + 3) {\n  display: none;\n}\n\n.mdn div:nth-child(n + 3) > b {\n  color: #eee;\n  background-color: #eee;\n}\n\np + .mdn {\n  margin-top: -45px;\n}\n\n.mdn.before {\n  margin-top: 3em;\n}\n\nh2 + .mdn {\n  margin: -48px 0 0 0;\n}\n\nh3 + .mdn {\n  margin: -46px 0 0 0;\n}\n\nh4 + .mdn {\n  margin: -42px 0 0 0;\n}\n\nh5 + .mdn {\n  margin: -40px 0 0 0;\n}\n\nh6 + .mdn {\n  margin: -40px 0 0 0;\n}\n\n.mdn div {\n  margin: 0;\n}\n\n.mdn :link {\n  color: #0000ee;\n}\n\n.mdn :visited {\n  color: #551a8b;\n}\n\n.mdn :link:active,\n:visited:active {\n  color: #ff0000;\n}\n\n.mdn :link,\n:visited {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.mdn.wrapped {\n  min-width: 0px;\n}\n\n.mdn.wrapped > div > div {\n  display: none;\n}\n\n.mdn:hover {\n  z-index: 11;\n}\n\n.mdn:focus-within {\n  z-index: 11;\n}\n";

var mdnAnnotation$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': mdnAnnotation$1
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

var clipboard = "<svg height=\"16\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z\"/></svg>";

var clipboard$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': clipboard
});

var _var = "var:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nvar.respec-hl {\n  color: var(--color, #000);\n  background-color: var(--bg-color);\n  box-shadow: 0 0 0px 2px var(--bg-color);\n}\n\n/* highlight colors\n  https://github.com/w3c/tr-design/issues/152\n*/\nvar.respec-hl-c1 {\n  --bg-color: #f4d200;\n}\n\nvar.respec-hl-c2 {\n  --bg-color: #ff87a2;\n}\n\nvar.respec-hl-c3 {\n  --bg-color: #96e885;\n}\n\nvar.respec-hl-c4 {\n  --bg-color: #3eeed2;\n}\n\nvar.respec-hl-c5 {\n  --bg-color: #eacfb6;\n}\n\nvar.respec-hl-c6 {\n  --bg-color: #82ddff;\n}\n\nvar.respec-hl-c7 {\n  --bg-color: #ffbcf2;\n}\n\n@media print {\n  var.respec-hl {\n    background: none;\n    color: #000;\n    box-shadow: unset;\n  }\n}\n";

var _var$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _var
});

var datatype = "var {\n  position: relative;\n  cursor: pointer;\n}\n\nvar[data-type]::before,\nvar[data-type]::after {\n  position: absolute;\n  left: 50%;\n  top: -6px;\n  opacity: 0;\n  transition: opacity 0.4s;\n  pointer-events: none;\n}\n\n/* the triangle or arrow or caret or whatever */\nvar[data-type]::before {\n  content: \"\";\n  transform: translateX(-50%);\n  border-width: 4px 6px 0 6px;\n  border-style: solid;\n  border-color: transparent;\n  border-top-color: #000;\n}\n\n/* actual text */\nvar[data-type]::after {\n  content: attr(data-type);\n  transform: translateX(-50%) translateY(-100%);\n  background: #000;\n  text-align: center;\n  /* additional styling */\n  font-family: \"Dank Mono\", \"Fira Code\", monospace;\n  font-style: normal;\n  padding: 6px;\n  border-radius: 3px;\n  color: #daca88;\n  text-indent: 0;\n  font-weight: normal;\n}\n\nvar[data-type]:hover::after,\nvar[data-type]:hover::before {\n  opacity: 1;\n}\n";

var datatype$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': datatype
});

var algorithms$1 = "/* For assertions in lists containing algorithms */\n\n.assert {\n    background: #EEE;\n    border-left: 0.5em solid #AAA;\n    padding: 0.3em;\n}\n";

var algorithms$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': algorithms$1
});
>>>>>>> Fix package.json (revert to mostly origin/develop version). Make it build, add pcisig-common profile.
//# sourceMappingURL=respec-w3c.js.map
