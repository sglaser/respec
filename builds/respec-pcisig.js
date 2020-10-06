window.respecVersion = "25.16.5";

(function () {
  'use strict';

  // In case everything else fails, we want the error
  window.addEventListener("error", ev => {
    console.error(ev.error, ev.message, ev);
  });

  const modules = [
    // order is significant
    Promise.resolve().then(function () { return baseRunner; }),
    Promise.resolve().then(function () { return ui$1; }),
    Promise.resolve().then(function () { return locationHash; }),
    Promise.resolve().then(function () { return l10n$1; }),
    Promise.resolve().then(function () { return pcisigDefaults$1; }),
    Promise.resolve().then(function () { return style; }),
    Promise.resolve().then(function () { return pcisigStyle; }),
    Promise.resolve().then(function () { return l10n$3; }),
    Promise.resolve().then(function () { return github$1; }),
    Promise.resolve().then(function () { return dataInclude; }),
    Promise.resolve().then(function () { return markdown; }),
    Promise.resolve().then(function () { return reindent$1; }),
    Promise.resolve().then(function () { return title; }),
    Promise.resolve().then(function () { return pcisigHeaders; }),
    Promise.resolve().then(function () { return footnotes; }),
    // import("../src/w3c/abstract.js"),
    Promise.resolve().then(function () { return tablenotes; }),
    Promise.resolve().then(function () { return dataTransform; }),
    Promise.resolve().then(function () { return dataAbbr; }),
    Promise.resolve().then(function () { return inlines; }),
    Promise.resolve().then(function () { return pcisigConformance; }),
    Promise.resolve().then(function () { return preDfn; }),
    Promise.resolve().then(function () { return dfn; }),
    Promise.resolve().then(function () { return pluralize$2; }),
    Promise.resolve().then(function () { return examples; }),
    Promise.resolve().then(function () { return issuesNotes; }),
    Promise.resolve().then(function () { return bestPractices; }),
    Promise.resolve().then(function () { return drawCsrs; }),
    Promise.resolve().then(function () { return regpict; }),
    Promise.resolve().then(function () { return figures; }),
    Promise.resolve().then(function () { return equations; }),
    Promise.resolve().then(function () { return tables; }),
    // import("../src/core/webidl.js"),
    Promise.resolve().then(function () { return dataCite; }),
    Promise.resolve().then(function () { return biblio$1; }),
    // import("../src/core/webidl-index.js"),
    Promise.resolve().then(function () { return linkToDfn; }),
    Promise.resolve().then(function () { return renderBiblio; }),
    Promise.resolve().then(function () { return contrib; }),
    Promise.resolve().then(function () { return fixHeaders; }),
    Promise.resolve().then(function () { return structure$1; }),
    // must run after structure, equations, figures, and tables
    Promise.resolve().then(function () { return figTblEqnNumbering; }),
    Promise.resolve().then(function () { return informative; }),
    Promise.resolve().then(function () { return idHeaders; }),
    Promise.resolve().then(function () { return caniuse; }),
    Promise.resolve().then(function () { return mdnAnnotation; }),
    Promise.resolve().then(function () { return saveHtml; }),
    // import("../src/ui/search-specref.js"),
    // import("../src/ui/search-xref.js"),
    // import("../src/ui/dfn-list.js"),
    Promise.resolve().then(function () { return aboutRespec; }),
    Promise.resolve().then(function () { return seo; }),
    // import("../src/w3c/seo.js"),
    // import("../src/core/highlight.js"),
    // import("../src/core/webidl-clipboard.js"),
    Promise.resolve().then(function () { return dataTests; }),
    Promise.resolve().then(function () { return listSorter; }),
    // import("../src/core/highlight-vars.js"),
    Promise.resolve().then(function () { return dfnPanel; }),
    Promise.resolve().then(function () { return dataType; }),
    Promise.resolve().then(function () { return algorithms; }),
    Promise.resolve().then(function () { return anchorExpander; }),
    Promise.resolve().then(function () { return includeFinalConfig; }),
    Promise.resolve().then(function () { return index; }),
    Promise.resolve().then(function () { return railroad; }),
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
    const require = function (deps, callback) {
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
    const params = new URLSearchParams(document.location.search);
    const overrideEntries = Array.from(params)
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
        return [key, value];
      });
    const overrideProps = Object.fromEntries(overrideEntries);
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

  class ReSpec {
    get version() {
      return window.respecVersion;
    }

    get ready() {
      return document.respecIsReady;
    }
  }

  function init() {
    const respec = new ReSpec();
    Object.defineProperty(document, "respec", { value: respec });
  }

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

  const l10n = {};

  const lang = html.lang;

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

  const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

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
          .then((value) => {
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
              reject(tx.error || new DOMException('AbortError', 'AbortError'));
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
      set(target, prop, value) {
          target[prop] = value;
          return true;
      },
      has(target, prop) {
          if (target instanceof IDBTransaction &&
              (prop === 'done' || prop === 'store')) {
              return true;
          }
          return prop in target;
      },
  };
  function replaceTraps(callback) {
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
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
      const request = indexedDB.open(name, version);
      const openPromise = wrap(request);
      if (upgrade) {
          request.addEventListener('upgradeneeded', (event) => {
              upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
          });
      }
      if (blocked)
          request.addEventListener('blocked', () => blocked());
      openPromise
          .then((db) => {
          if (terminated)
              db.addEventListener('close', () => terminated());
          if (blocking)
              db.addEventListener('versionchange', () => blocking());
      })
          .catch(() => { });
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
          const returnVal = await target[targetFuncName](...args);
          if (isWrite)
              await tx.done;
          return returnVal;
      };
      cachedMethods.set(prop, method);
      return method;
  }
  replaceTraps((oldTraps) => ({
      ...oldTraps,
      get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
      has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
  }));

  var _idb = /*#__PURE__*/Object.freeze({
    __proto__: null,
    deleteDB: deleteDB,
    openDB: openDB,
    unwrap: unwrap,
    wrap: wrap
  });

  /**
   * marked - a markdown parser
   * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/markedjs/marked
   */

  /**
   * DO NOT EDIT THIS FILE
   * The code in this file is generated from files in ./src/
   */

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var defaults = createCommonjsModule(function (module) {
  function getDefaults() {
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
      renderer: null,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      walkTokens: null,
      xhtml: false
    };
  }

  function changeDefaults(newDefaults) {
    module.exports.defaults = newDefaults;
  }

  module.exports = {
    defaults: getDefaults(),
    getDefaults,
    changeDefaults
  };
  });
  var defaults_1 = defaults.defaults;
  var defaults_2 = defaults.getDefaults;
  var defaults_3 = defaults.changeDefaults;

  /**
   * Helpers
   */
  const escapeTest = /[&<>"']/;
  const escapeReplace = /[&<>"']/g;
  const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  const getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }

    return html;
  }

  const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, (_, n) => {
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

  const caret = /(^|[^\[])\^/g;
  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    const obj = {
      replace: (name, val) => {
        val = val.source || val;
        val = val.replace(caret, '$1');
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: () => {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }

  const nonWordAndColonTest = /[^\w:]/g;
  const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      let prot;
      try {
        prot = decodeURIComponent(unescape(href))
          .replace(nonWordAndColonTest, '')
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

  const baseUrls = {};
  const justDomain = /^[^:]+:\/*[^/]*$/;
  const protocol = /^([^:]+:)[\s\S]*$/;
  const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }
    base = baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;

    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }
      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }
      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  const noopTest = { exec: function noopTest() {} };

  function merge(obj) {
    let i = 1,
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
    const row = tableRow.replace(/\|/g, (match, offset, str) => {
        let escaped = false,
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
      cells = row.split(/ \|/);
    let i = 0;

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
    const l = str.length;
    if (l === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    let suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    const l = str.length;
    let level = 0,
      i = 0;
    for (; i < l; i++) {
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

  var helpers = {
    escape,
    unescape,
    edit,
    cleanUrl,
    resolveUrl,
    noopTest,
    merge,
    splitCells,
    rtrim,
    findClosingBracket,
    checkSanitizeDeprecation
  };

  const { defaults: defaults$1 } = defaults;
  const {
    rtrim: rtrim$1,
    splitCells: splitCells$1,
    escape: escape$1,
    findClosingBracket: findClosingBracket$1
  } = helpers;

  function outputLink(cap, link, raw) {
    const href = link.href;
    const title = link.title ? escape$1(link.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, '$1');

    if (cap[0].charAt(0) !== '!') {
      return {
        type: 'link',
        raw,
        href,
        title,
        text
      };
    } else {
      return {
        type: 'image',
        raw,
        href,
        title,
        text: escape$1(text)
      };
    }
  }

  function indentCodeCompensation(raw, text) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

    if (matchIndentToCode === null) {
      return text;
    }

    const indentToCode = matchIndentToCode[1];

    return text
      .split('\n')
      .map(node => {
        const matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
          return node;
        }

        const [indentInNode] = matchIndentInNode;

        if (indentInNode.length >= indentToCode.length) {
          return node.slice(indentToCode.length);
        }

        return node;
      })
      .join('\n');
  }

  /**
   * Tokenizer
   */
  var Tokenizer_1 = class Tokenizer {
    constructor(options) {
      this.options = options || defaults$1;
    }

    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap) {
        if (cap[0].length > 1) {
          return {
            type: 'space',
            raw: cap[0]
          };
        }
        return { raw: '\n' };
      }
    }

    code(src, tokens) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const lastToken = tokens[tokens.length - 1];
        // An indented code block cannot interrupt a paragraph.
        if (lastToken && lastToken.type === 'paragraph') {
          return {
            raw: cap[0],
            text: cap[0].trimRight()
          };
        }

        const text = cap[0].replace(/^ {4}/gm, '');
        return {
          type: 'code',
          raw: cap[0],
          codeBlockStyle: 'indented',
          text: !this.options.pedantic
            ? rtrim$1(text, '\n')
            : text
        };
      }
    }

    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || '');

        return {
          type: 'code',
          raw,
          lang: cap[2] ? cap[2].trim() : cap[2],
          text
        };
      }
    }

    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: cap[2]
        };
      }
    }

    nptable(src) {
      const cap = this.rules.block.nptable.exec(src);
      if (cap) {
        const item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
          raw: cap[0]
        };

        if (item.header.length === item.align.length) {
          let l = item.align.length;
          let i;
          for (i = 0; i < l; i++) {
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

          l = item.cells.length;
          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(item.cells[i], item.header.length);
          }

          return item;
        }
      }
    }

    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: 'hr',
          raw: cap[0]
        };
      }
    }

    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        const text = cap[0].replace(/^ *> ?/gm, '');

        return {
          type: 'blockquote',
          raw: cap[0],
          text
        };
      }
    }

    list(src) {
      const cap = this.rules.block.list.exec(src);
      if (cap) {
        let raw = cap[0];
        const bull = cap[2];
        const isordered = bull.length > 1;
        const isparen = bull[bull.length - 1] === ')';

        const list = {
          type: 'list',
          raw,
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : '',
          loose: false,
          items: []
        };

        // Get each top-level item.
        const itemMatch = cap[0].match(this.rules.block.item);

        let next = false,
          item,
          space,
          b,
          addBack,
          loose,
          istask,
          ischecked;

        const l = itemMatch.length;
        for (let i = 0; i < l; i++) {
          item = itemMatch[i];
          raw = item;

          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+[.)]) */, '');

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
            b = this.rules.block.bullet.exec(itemMatch[i + 1])[0];
            if (isordered ? b.length === 1 || (!isparen && b[b.length - 1] === ')')
              : (b.length > 1 || (this.options.smartLists && b !== bull))) {
              addBack = itemMatch.slice(i + 1).join('\n');
              list.raw = list.raw.substring(0, list.raw.length - addBack.length);
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
            list.loose = true;
          }

          // Check for task list items
          istask = /^\[[ xX]\] /.test(item);
          ischecked = undefined;
          if (istask) {
            ischecked = item[1] !== ' ';
            item = item.replace(/^\[[ xX]\] +/, '');
          }

          list.items.push({
            type: 'list_item',
            raw,
            task: istask,
            checked: ischecked,
            loose: loose,
            text: item
          });
        }

        return list;
      }
    }

    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        return {
          type: this.options.sanitize
            ? 'paragraph'
            : 'html',
          raw: cap[0],
          pre: !this.options.sanitizer
            && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
          text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0]
        };
      }
    }

    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
        const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
        return {
          tag,
          raw: cap[0],
          href: cap[2],
          title: cap[3]
        };
      }
    }

    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (cap) {
        const item = {
          type: 'table',
          header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
          align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
        };

        if (item.header.length === item.align.length) {
          item.raw = cap[0];

          let l = item.align.length;
          let i;
          for (i = 0; i < l; i++) {
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

          l = item.cells.length;
          for (i = 0; i < l; i++) {
            item.cells[i] = splitCells$1(
              item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
              item.header.length);
          }

          return item;
        }
      }
    }

    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[2].charAt(0) === '=' ? 1 : 2,
          text: cap[1]
        };
      }
    }

    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        return {
          type: 'paragraph',
          raw: cap[0],
          text: cap[1].charAt(cap[1].length - 1) === '\n'
            ? cap[1].slice(0, -1)
            : cap[1]
        };
      }
    }

    text(src, tokens) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        const lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'text') {
          return {
            raw: cap[0],
            text: cap[0]
          };
        }

        return {
          type: 'text',
          raw: cap[0],
          text: cap[0]
        };
      }
    }

    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: 'escape',
          raw: cap[0],
          text: escape$1(cap[1])
        };
      }
    }

    tag(src, inLink, inRawBlock) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!inLink && /^<a /i.test(cap[0])) {
          inLink = true;
        } else if (inLink && /^<\/a>/i.test(cap[0])) {
          inLink = false;
        }
        if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = true;
        } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          inRawBlock = false;
        }

        return {
          type: this.options.sanitize
            ? 'text'
            : 'html',
          raw: cap[0],
          inLink,
          inRawBlock,
          text: this.options.sanitize
            ? (this.options.sanitizer
              ? this.options.sanitizer(cap[0])
              : escape$1(cap[0]))
            : cap[0]
        };
      }
    }

    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const lastParenIndex = findClosingBracket$1(cap[2], '()');
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf('!') === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }
        let href = cap[2];
        let title = '';
        if (this.options.pedantic) {
          const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

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
        const token = outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0]);
        return token;
      }
    }

    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src))
          || (cap = this.rules.inline.nolink.exec(src))) {
        let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = links[link.toLowerCase()];
        if (!link || !link.href) {
          const text = cap[0].charAt(0);
          return {
            type: 'text',
            raw: text,
            text
          };
        }
        const token = outputLink(cap, link, cap[0]);
        return token;
      }
    }

    strong(src, maskedSrc, prevChar = '') {
      let match = this.rules.inline.strong.start.exec(src);

      if (match && (!match[1] || (match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))))) {
        maskedSrc = maskedSrc.slice(-1 * src.length);
        const endReg = match[0] === '**' ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;

        endReg.lastIndex = 0;

        let cap;
        while ((match = endReg.exec(maskedSrc)) != null) {
          cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));
          if (cap) {
            return {
              type: 'strong',
              raw: src.slice(0, cap[0].length),
              text: src.slice(2, cap[0].length - 2)
            };
          }
        }
      }
    }

    em(src, maskedSrc, prevChar = '') {
      let match = this.rules.inline.em.start.exec(src);

      if (match && (!match[1] || (match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar))))) {
        maskedSrc = maskedSrc.slice(-1 * src.length);
        const endReg = match[0] === '*' ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;

        endReg.lastIndex = 0;

        let cap;
        while ((match = endReg.exec(maskedSrc)) != null) {
          cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));
          if (cap) {
            return {
              type: 'em',
              raw: src.slice(0, cap[0].length),
              text: src.slice(1, cap[0].length - 1)
            };
          }
        }
      }
    }

    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(/\n/g, ' ');
        const hasNonSpaceChars = /[^ ]/.test(text);
        const hasSpaceCharsOnBothEnds = text.startsWith(' ') && text.endsWith(' ');
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        text = escape$1(text, true);
        return {
          type: 'codespan',
          raw: cap[0],
          text
        };
      }
    }

    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: 'br',
          raw: cap[0]
        };
      }
    }

    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: 'del',
          raw: cap[0],
          text: cap[1]
        };
      }
    }

    autolink(src, mangle) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === '@') {
          text = escape$1(this.options.mangle ? mangle(cap[1]) : cap[1]);
          href = 'mailto:' + text;
        } else {
          text = escape$1(cap[1]);
          href = text;
        }

        return {
          type: 'link',
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: 'text',
              raw: text,
              text
            }
          ]
        };
      }
    }

    url(src, mangle) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === '@') {
          text = escape$1(this.options.mangle ? mangle(cap[0]) : cap[0]);
          href = 'mailto:' + text;
        } else {
          // do extended autolink path validation
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape$1(cap[0]);
          if (cap[1] === 'www.') {
            href = 'http://' + text;
          } else {
            href = text;
          }
        }
        return {
          type: 'link',
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: 'text',
              raw: text,
              text
            }
          ]
        };
      }
    }

    inlineText(src, inRawBlock, smartypants) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        let text;
        if (inRawBlock) {
          text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0];
        } else {
          text = escape$1(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
        }
        return {
          type: 'text',
          raw: cap[0],
          text
        };
      }
    }
  };

  const {
    noopTest: noopTest$1,
    edit: edit$1,
    merge: merge$1
  } = helpers;

  /**
   * Block-Level Grammar
   */
  const block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
      + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
      + '|comment[^\\n]*(\\n+|$)' // (2)
      + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
      + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
      + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
      + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
      + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
      + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
      + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noopTest$1,
    table: noopTest$1,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
    text: /^[^\n]+/
  };

  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit$1(block.def)
    .replace('label', block._label)
    .replace('title', block._title)
    .getRegex();

  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
  block.item = edit$1(block.item, 'gm')
    .replace(/bull/g, block.bullet)
    .getRegex();

  block.list = edit$1(block.list)
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
  block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  block.html = edit$1(block.html, 'i')
    .replace('comment', block._comment)
    .replace('tag', block._tag)
    .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
    .getRegex();

  block.paragraph = edit$1(block._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
    .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
    .getRegex();

  block.blockquote = edit$1(block.blockquote)
    .replace('paragraph', block.paragraph)
    .getRegex();

  /**
   * Normal Block Grammar
   */

  block.normal = merge$1({}, block);

  /**
   * GFM Block Grammar
   */

  block.gfm = merge$1({}, block.normal, {
    nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
      + ' {0,3}([-:]+ *\\|[-| :]*)' // Align
      + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)', // Cells
    table: '^ *\\|(.+)\\n' // Header
      + ' {0,3}\\|?( *[-:]+[-| :]*)' // Align
      + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
  });

  block.gfm.nptable = edit$1(block.gfm.nptable)
    .replace('hr', block.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
    .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
    .getRegex();

  block.gfm.table = edit$1(block.gfm.table)
    .replace('hr', block.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
    .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
    .getRegex();

  /**
   * Pedantic grammar (original John Gruber's loose markdown specification)
   */

  block.pedantic = merge$1({}, block.normal, {
    html: edit$1(
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
    fences: noopTest$1, // fences not supported
    paragraph: edit$1(block.normal._paragraph)
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
   * Inline-Level Grammar
   */
  const inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest$1,
    tag: '^comment'
      + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
      + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
      + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
      + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
      + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    strong: {
      start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/, // (1) returns if starts w/ punctuation
      middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
      endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/, // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
    },
    em: {
      start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/, // (1) returns if starts w/ punctuation
      middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
      endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/, // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest$1,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\s*punctuation])/
  };

  // list of punctuation marks from common mark spec
  // without * and _ to workaround cases with double emphasis
  inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
  inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

  // sequences em should skip over [title](link), `code`, <html>
  inline._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>';
  inline._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*';

  inline._comment = edit$1(block._comment).replace('(?:-->|$)', '-->').getRegex();

  inline.em.start = edit$1(inline.em.start)
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.em.middle = edit$1(inline.em.middle)
    .replace(/punctuation/g, inline._punctuation)
    .replace(/overlapSkip/g, inline._overlapSkip)
    .getRegex();

  inline.em.endAst = edit$1(inline.em.endAst, 'g')
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.em.endUnd = edit$1(inline.em.endUnd, 'g')
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.strong.start = edit$1(inline.strong.start)
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.strong.middle = edit$1(inline.strong.middle)
    .replace(/punctuation/g, inline._punctuation)
    .replace(/overlapSkip/g, inline._overlapSkip)
    .getRegex();

  inline.strong.endAst = edit$1(inline.strong.endAst, 'g')
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.strong.endUnd = edit$1(inline.strong.endUnd, 'g')
    .replace(/punctuation/g, inline._punctuation)
    .getRegex();

  inline.blockSkip = edit$1(inline._blockSkip, 'g')
    .getRegex();

  inline.overlapSkip = edit$1(inline._overlapSkip, 'g')
    .getRegex();

  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit$1(inline.autolink)
    .replace('scheme', inline._scheme)
    .replace('email', inline._email)
    .getRegex();

  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

  inline.tag = edit$1(inline.tag)
    .replace('comment', inline._comment)
    .replace('attribute', inline._attribute)
    .getRegex();

  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

  inline.link = edit$1(inline.link)
    .replace('label', inline._label)
    .replace('href', inline._href)
    .replace('title', inline._title)
    .getRegex();

  inline.reflink = edit$1(inline.reflink)
    .replace('label', inline._label)
    .getRegex();

  inline.reflinkSearch = edit$1(inline.reflinkSearch, 'g')
    .replace('reflink', inline.reflink)
    .replace('nolink', inline.nolink)
    .getRegex();

  /**
   * Normal Inline Grammar
   */

  inline.normal = merge$1({}, inline);

  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge$1({}, inline.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit$1(/^!?\[(label)\]\((.*?)\)/)
      .replace('label', inline._label)
      .getRegex(),
    reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace('label', inline._label)
      .getRegex()
  });

  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge$1({}, inline.normal, {
    escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^~+(?=\S)([\s\S]*?\S)~+/,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });

  inline.gfm.url = edit$1(inline.gfm.url, 'i')
    .replace('email', inline.gfm._extended_email)
    .getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge$1({}, inline.gfm, {
    br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
    text: edit$1(inline.gfm.text)
      .replace('\\b_', '\\b_| {2,}\\n')
      .replace(/\{2,\}/g, '*')
      .getRegex()
  });

  var rules = {
    block,
    inline
  };

  const { defaults: defaults$2 } = defaults;
  const { block: block$1, inline: inline$1 } = rules;

  /**
   * smartypants text replacement
   */
  function smartypants(text) {
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
  }

  /**
   * mangle email addresses
   */
  function mangle(text) {
    let out = '',
      i,
      ch;

    const l = text.length;
    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }

    return out;
  }

  /**
   * Block Lexer
   */
  var Lexer_1 = class Lexer {
    constructor(options) {
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options || defaults$2;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;

      const rules = {
        block: block$1.normal,
        inline: inline$1.normal
      };

      if (this.options.pedantic) {
        rules.block = block$1.pedantic;
        rules.inline = inline$1.pedantic;
      } else if (this.options.gfm) {
        rules.block = block$1.gfm;
        if (this.options.breaks) {
          rules.inline = inline$1.breaks;
        } else {
          rules.inline = inline$1.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }

    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block: block$1,
        inline: inline$1
      };
    }

    /**
     * Static Lex Method
     */
    static lex(src, options) {
      const lexer = new Lexer(options);
      return lexer.lex(src);
    }

    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options) {
      const lexer = new Lexer(options);
      return lexer.inlineTokens(src);
    }

    /**
     * Preprocessing
     */
    lex(src) {
      src = src
        .replace(/\r\n|\r/g, '\n')
        .replace(/\t/g, '    ');

      this.blockTokens(src, this.tokens, true);

      this.inline(this.tokens);

      return this.tokens;
    }

    /**
     * Lexing
     */
    blockTokens(src, tokens = [], top = true) {
      src = src.replace(/^ +$/gm, '');
      let token, i, l, lastToken;

      while (src) {
        // newline
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          if (token.type) {
            tokens.push(token);
          }
          continue;
        }

        // code
        if (token = this.tokenizer.code(src, tokens)) {
          src = src.substring(token.raw.length);
          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }
          continue;
        }

        // fences
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // heading
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // table no leading pipe (gfm)
        if (token = this.tokenizer.nptable(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // hr
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // blockquote
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.blockTokens(token.text, [], top);
          tokens.push(token);
          continue;
        }

        // list
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          l = token.items.length;
          for (i = 0; i < l; i++) {
            token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
          }
          tokens.push(token);
          continue;
        }

        // html
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // def
        if (top && (token = this.tokenizer.def(src))) {
          src = src.substring(token.raw.length);
          if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }

        // table (gfm)
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // lheading
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // top-level paragraph
        if (top && (token = this.tokenizer.paragraph(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // text
        if (token = this.tokenizer.text(src, tokens)) {
          src = src.substring(token.raw.length);
          if (token.type) {
            tokens.push(token);
          } else {
            lastToken = tokens[tokens.length - 1];
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          }
          continue;
        }

        if (src) {
          const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    }

    inline(tokens) {
      let i,
        j,
        k,
        l2,
        row,
        token;

      const l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];
        switch (token.type) {
          case 'paragraph':
          case 'text':
          case 'heading': {
            token.tokens = [];
            this.inlineTokens(token.text, token.tokens);
            break;
          }
          case 'table': {
            token.tokens = {
              header: [],
              cells: []
            };

            // header
            l2 = token.header.length;
            for (j = 0; j < l2; j++) {
              token.tokens.header[j] = [];
              this.inlineTokens(token.header[j], token.tokens.header[j]);
            }

            // cells
            l2 = token.cells.length;
            for (j = 0; j < l2; j++) {
              row = token.cells[j];
              token.tokens.cells[j] = [];
              for (k = 0; k < row.length; k++) {
                token.tokens.cells[j][k] = [];
                this.inlineTokens(row[k], token.tokens.cells[j][k]);
              }
            }

            break;
          }
          case 'blockquote': {
            this.inline(token.tokens);
            break;
          }
          case 'list': {
            l2 = token.items.length;
            for (j = 0; j < l2; j++) {
              this.inline(token.items[j].tokens);
            }
            break;
          }
        }
      }

      return tokens;
    }

    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = [], inLink = false, inRawBlock = false, prevChar = '') {
      let token;

      // String with links masked to avoid interference with em and strong
      let maskedSrc = src;
      let match;

      // Mask out reflinks
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      // Mask out other blocks
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }

      while (src) {
        // escape
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // tag
        if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
          src = src.substring(token.raw.length);
          inLink = token.inLink;
          inRawBlock = token.inRawBlock;
          tokens.push(token);
          continue;
        }

        // link
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }
          tokens.push(token);
          continue;
        }

        // reflink, nolink
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
          }
          tokens.push(token);
          continue;
        }

        // strong
        if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        }

        // em
        if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        }

        // code
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // br
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // del (gfm)
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
          tokens.push(token);
          continue;
        }

        // autolink
        if (token = this.tokenizer.autolink(src, mangle)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // url (gfm)
        if (!inLink && (token = this.tokenizer.url(src, mangle))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }

        // text
        if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
          src = src.substring(token.raw.length);
          prevChar = token.raw.slice(-1);
          tokens.push(token);
          continue;
        }

        if (src) {
          const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }

      return tokens;
    }
  };

  const { defaults: defaults$3 } = defaults;
  const {
    cleanUrl: cleanUrl$1,
    escape: escape$2
  } = helpers;

  /**
   * Renderer
   */
  var Renderer_1 = class Renderer {
    constructor(options) {
      this.options = options || defaults$3;
    }

    code(code, infostring, escaped) {
      const lang = (infostring || '').match(/\S*/)[0];
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }

      if (!lang) {
        return '<pre><code>'
          + (escaped ? code : escape$2(code, true))
          + '</code></pre>\n';
      }

      return '<pre><code class="'
        + this.options.langPrefix
        + escape$2(lang, true)
        + '">'
        + (escaped ? code : escape$2(code, true))
        + '</code></pre>\n';
    }

    blockquote(quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    }

    html(html) {
      return html;
    }

    heading(text, level, raw, slugger) {
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
    }

    hr() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    }

    list(body, ordered, start) {
      const type = ordered ? 'ol' : 'ul',
        startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
      return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    }

    listitem(text) {
      return '<li>' + text + '</li>\n';
    }

    checkbox(checked) {
      return '<input '
        + (checked ? 'checked="" ' : '')
        + 'disabled="" type="checkbox"'
        + (this.options.xhtml ? ' /' : '')
        + '> ';
    }

    paragraph(text) {
      return '<p>' + text + '</p>\n';
    }

    table(header, body) {
      if (body) body = '<tbody>' + body + '</tbody>';

      return '<table>\n'
        + '<thead>\n'
        + header
        + '</thead>\n'
        + body
        + '</table>\n';
    }

    tablerow(content) {
      return '<tr>\n' + content + '</tr>\n';
    }

    tablecell(content, flags) {
      const type = flags.header ? 'th' : 'td';
      const tag = flags.align
        ? '<' + type + ' align="' + flags.align + '">'
        : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    }

    // span level renderer
    strong(text) {
      return '<strong>' + text + '</strong>';
    }

    em(text) {
      return '<em>' + text + '</em>';
    }

    codespan(text) {
      return '<code>' + text + '</code>';
    }

    br() {
      return this.options.xhtml ? '<br/>' : '<br>';
    }

    del(text) {
      return '<del>' + text + '</del>';
    }

    link(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      let out = '<a href="' + escape$2(href) + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    }

    image(href, title, text) {
      href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }

      let out = '<img src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
      return out;
    }

    text(text) {
      return text;
    }
  };

  /**
   * TextRenderer
   * returns only the textual part of the token
   */
  var TextRenderer_1 = class TextRenderer {
    // no need for block level renderers
    strong(text) {
      return text;
    }

    em(text) {
      return text;
    }

    codespan(text) {
      return text;
    }

    del(text) {
      return text;
    }

    html(text) {
      return text;
    }

    text(text) {
      return text;
    }

    link(href, title, text) {
      return '' + text;
    }

    image(href, title, text) {
      return '' + text;
    }

    br() {
      return '';
    }
  };

  /**
   * Slugger generates header id
   */
  var Slugger_1 = class Slugger {
    constructor() {
      this.seen = {};
    }

    serialize(value) {
      return value
        .toLowerCase()
        .trim()
        // remove html tags
        .replace(/<[!\/a-z].*?>/ig, '')
        // remove unwanted chars
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
        .replace(/\s/g, '-');
    }

    /**
     * Finds the next safe (unique) slug to use
     */
    getNextSafeSlug(originalSlug, isDryRun) {
      let slug = originalSlug;
      let occurenceAccumulator = 0;
      if (this.seen.hasOwnProperty(slug)) {
        occurenceAccumulator = this.seen[originalSlug];
        do {
          occurenceAccumulator++;
          slug = originalSlug + '-' + occurenceAccumulator;
        } while (this.seen.hasOwnProperty(slug));
      }
      if (!isDryRun) {
        this.seen[originalSlug] = occurenceAccumulator;
        this.seen[slug] = 0;
      }
      return slug;
    }

    /**
     * Convert string to unique id
     * @param {object} options
     * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
     */
    slug(value, options = {}) {
      const slug = this.serialize(value);
      return this.getNextSafeSlug(slug, options.dryrun);
    }
  };

  const { defaults: defaults$4 } = defaults;
  const {
    unescape: unescape$1
  } = helpers;

  /**
   * Parsing & Compiling
   */
  var Parser_1 = class Parser {
    constructor(options) {
      this.options = options || defaults$4;
      this.options.renderer = this.options.renderer || new Renderer_1();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer_1();
      this.slugger = new Slugger_1();
    }

    /**
     * Static Parse Method
     */
    static parse(tokens, options) {
      const parser = new Parser(options);
      return parser.parse(tokens);
    }

    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options) {
      const parser = new Parser(options);
      return parser.parseInline(tokens);
    }

    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      let out = '',
        i,
        j,
        k,
        l2,
        l3,
        row,
        cell,
        header,
        body,
        token,
        ordered,
        start,
        loose,
        itemBody,
        item,
        checked,
        task,
        checkbox;

      const l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];
        switch (token.type) {
          case 'space': {
            continue;
          }
          case 'hr': {
            out += this.renderer.hr();
            continue;
          }
          case 'heading': {
            out += this.renderer.heading(
              this.parseInline(token.tokens),
              token.depth,
              unescape$1(this.parseInline(token.tokens, this.textRenderer)),
              this.slugger);
            continue;
          }
          case 'code': {
            out += this.renderer.code(token.text,
              token.lang,
              token.escaped);
            continue;
          }
          case 'table': {
            header = '';

            // header
            cell = '';
            l2 = token.header.length;
            for (j = 0; j < l2; j++) {
              cell += this.renderer.tablecell(
                this.parseInline(token.tokens.header[j]),
                { header: true, align: token.align[j] }
              );
            }
            header += this.renderer.tablerow(cell);

            body = '';
            l2 = token.cells.length;
            for (j = 0; j < l2; j++) {
              row = token.tokens.cells[j];

              cell = '';
              l3 = row.length;
              for (k = 0; k < l3; k++) {
                cell += this.renderer.tablecell(
                  this.parseInline(row[k]),
                  { header: false, align: token.align[k] }
                );
              }

              body += this.renderer.tablerow(cell);
            }
            out += this.renderer.table(header, body);
            continue;
          }
          case 'blockquote': {
            body = this.parse(token.tokens);
            out += this.renderer.blockquote(body);
            continue;
          }
          case 'list': {
            ordered = token.ordered;
            start = token.start;
            loose = token.loose;
            l2 = token.items.length;

            body = '';
            for (j = 0; j < l2; j++) {
              item = token.items[j];
              checked = item.checked;
              task = item.task;

              itemBody = '';
              if (item.task) {
                checkbox = this.renderer.checkbox(checked);
                if (loose) {
                  if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                    item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                      item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                    }
                  } else {
                    item.tokens.unshift({
                      type: 'text',
                      text: checkbox
                    });
                  }
                } else {
                  itemBody += checkbox;
                }
              }

              itemBody += this.parse(item.tokens, loose);
              body += this.renderer.listitem(itemBody, task, checked);
            }

            out += this.renderer.list(body, ordered, start);
            continue;
          }
          case 'html': {
            // TODO parse inline content if parameter markdown=1
            out += this.renderer.html(token.text);
            continue;
          }
          case 'paragraph': {
            out += this.renderer.paragraph(this.parseInline(token.tokens));
            continue;
          }
          case 'text': {
            body = token.tokens ? this.parseInline(token.tokens) : token.text;
            while (i + 1 < l && tokens[i + 1].type === 'text') {
              token = tokens[++i];
              body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
            }
            out += top ? this.renderer.paragraph(body) : body;
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return;
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }

      return out;
    }

    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      let out = '',
        i,
        token;

      const l = tokens.length;
      for (i = 0; i < l; i++) {
        token = tokens[i];
        switch (token.type) {
          case 'escape': {
            out += renderer.text(token.text);
            break;
          }
          case 'html': {
            out += renderer.html(token.text);
            break;
          }
          case 'link': {
            out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
            break;
          }
          case 'image': {
            out += renderer.image(token.href, token.title, token.text);
            break;
          }
          case 'strong': {
            out += renderer.strong(this.parseInline(token.tokens, renderer));
            break;
          }
          case 'em': {
            out += renderer.em(this.parseInline(token.tokens, renderer));
            break;
          }
          case 'codespan': {
            out += renderer.codespan(token.text);
            break;
          }
          case 'br': {
            out += renderer.br();
            break;
          }
          case 'del': {
            out += renderer.del(this.parseInline(token.tokens, renderer));
            break;
          }
          case 'text': {
            out += renderer.text(token.text);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return;
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };

  const {
    merge: merge$2,
    checkSanitizeDeprecation: checkSanitizeDeprecation$1,
    escape: escape$3
  } = helpers;
  const {
    getDefaults,
    changeDefaults,
    defaults: defaults$5
  } = defaults;

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

    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }

    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);

    if (callback) {
      const highlight = opt.highlight;
      let tokens;

      try {
        tokens = Lexer_1.lex(src, opt);
      } catch (e) {
        return callback(e);
      }

      const done = function(err) {
        let out;

        if (!err) {
          try {
            out = Parser_1.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
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

      if (!tokens.length) return done();

      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }

              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });

      if (pending === 0) {
        done();
      }

      return;
    }

    try {
      const tokens = Lexer_1.lex(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      return Parser_1.parse(tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if (opt.silent) {
        return '<p>An error occurred:</p><pre>'
          + escape$3(e.message + '', true)
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
    merge$2(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };

  marked.getDefaults = getDefaults;

  marked.defaults = defaults$5;

  /**
   * Use Extension
   */

  marked.use = function(extension) {
    const opts = merge$2({}, extension);
    if (extension.renderer) {
      const renderer = marked.defaults.renderer || new Renderer_1();
      for (const prop in extension.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args) => {
          let ret = extension.renderer[prop].apply(renderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (extension.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer_1();
      for (const prop in extension.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args) => {
          let ret = extension.tokenizer[prop].apply(tokenizer, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (extension.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = (token) => {
        extension.walkTokens(token);
        if (walkTokens) {
          walkTokens(token);
        }
      };
    }
    marked.setOptions(opts);
  };

  /**
   * Run callback for every token
   */

  marked.walkTokens = function(tokens, callback) {
    for (const token of tokens) {
      callback(token);
      switch (token.type) {
        case 'table': {
          for (const cell of token.tokens.header) {
            marked.walkTokens(cell, callback);
          }
          for (const row of token.tokens.cells) {
            for (const cell of row) {
              marked.walkTokens(cell, callback);
            }
          }
          break;
        }
        case 'list': {
          marked.walkTokens(token.items, callback);
          break;
        }
        default: {
          if (token.tokens) {
            marked.walkTokens(token.tokens, callback);
          }
        }
      }
    }
  };

  /**
   * Parse Inline
   */
  marked.parseInline = function(src, opt) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked.parseInline(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked.parseInline(): input parameter is of type '
        + Object.prototype.toString.call(src) + ', string expected');
    }

    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);

    try {
      const tokens = Lexer_1.lexInline(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      return Parser_1.parseInline(tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if (opt.silent) {
        return '<p>An error occurred:</p><pre>'
          + escape$3(e.message + '', true)
          + '</pre>';
      }
      throw e;
    }
  };

  /**
   * Expose
   */

  marked.Parser = Parser_1;
  marked.parser = Parser_1.parse;

  marked.Renderer = Renderer_1;
  marked.TextRenderer = TextRenderer_1;

  marked.Lexer = Lexer_1;
  marked.lexer = Lexer_1.lex;

  marked.Tokenizer = Tokenizer_1;

  marked.Slugger = Slugger_1;

  marked.parse = marked;

  var marked_1 = marked;

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

  /*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(N){var t={};try{t.WeakMap=WeakMap;}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this);}function o(e){this.set(e[0],e[1]);}}(Math.random(),Object);}var s=t.WeakMap,i={};try{i.WeakSet=WeakSet;}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++});}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r;}(Math.random(),Object.defineProperty);}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var c,l=e(n[r],1);t.insertBefore(l,a),o&&u&&l.selected&&(u=!u,c=t.selectedIndex,t.selectedIndex=c<0?r:f.call(t.querySelectorAll("option"),l)),r++;}}function y(e,t){return e==t}function b(e){return e}function w(e,t,n,r,i,a,o){var u=a-i;if(u<1)return -1;for(;u<=n-t;){for(var c=t,l=i;c<n&&l<a&&o(e[c],r[l]);)c++,l++;if(l===a)return t;t=c+1;}return -1}function x(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function E(e,t,n,r){for(;n<r;)a(e(t[n++],-1));}function C(e,t,n,r,i,a,o,u,c,l,s,f,h){!function(e,t,n,r,i,a,o,u,c){for(var l=[],s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:l.push(r[i]),m(t,n,r,i++,i,f<u?t(a[f],0):c);break;case-1:f++;}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:-1<l.indexOf(a[o])?o++:E(t,a,o++,o);}}(function(e,t,n,r,i,a,o){var u,c,l,s,f,h,d=n+a,v=[];e:for(m=0;m<=d;m++){if(50<m)return null;for(h=m-1,s=m?v[m-1]:[0,0],f=v[m]=[],u=-m;u<=m;u+=2){for(c=(l=u===-m||u!==m&&s[h+u-1]<s[h+u+1]?s[h+u+1]:s[h+u-1]+1)-u;l<a&&c<n&&o(r[i+l],e[t+c]);)l++,c++;if(l===a&&c===n)break e;f[m+u]=l;}}for(var p=Array(m/2+d/2),g=p.length-1,m=v.length-1;0<=m;m--){for(;0<l&&0<c&&o(r[i+l-1],e[t+c-1]);)p[g--]=0,l--,c--;if(!m)break;h=m-1,s=m?v[m-1]:[0,0],(u=l-c)===-m||u!==m&&s[h+u-1]<s[h+u+1]?(c--,p[g--]=1):(l--,p[g--]=-1);}return p}(n,r,a,o,u,l,f)||function(e,t,n,r,i,a,o,u){var c=0,l=r<u?r:u,s=Array(l++),f=Array(l);f[0]=-1;for(var h=1;h<l;h++)f[h]=o;for(var d=i.slice(a,o),v=t;v<n;v++){var p,g=d.indexOf(e[v]);-1<g&&(-1<(c=k(f,l,p=g+a))&&(f[c]=p,s[c]={newi:v,oldi:p,prev:s[c-1]}));}for(c=--l,--o;f[c]>o;)--c;l=u+r-c;var m=Array(l),y=s[c];for(--n;y;){for(var b=y.newi,w=y.oldi;b<n;)m[--l]=1,--n;for(;w<o;)m[--l]=-1,--o;m[--l]=0,--n,--o,y=y.prev;}for(;t<=n;)m[--l]=1,--n;for(;a<=o;)m[--l]=-1,--o;return m}(n,r,i,a,o,u,c,l),e,t,n,r,o,u,s,h);}var e=i.WeakSet,f=[].indexOf,k=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a;}return r},a=function(e){return (e.remove||function(){var e=this.parentNode;e&&e.removeChild(this);}).call(e)};function l(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,c=u,l=0,s=n.length,f=0;l<c&&f<s&&i(t[l],n[f]);)l++,f++;for(;l<c&&f<s&&i(t[c-1],n[s-1]);)c--,s--;var h=l===c,d=f===s;if(h&&d)return n;if(h&&f<s)return m(a,e,n,f,s,x(a,t,l,u,o)),n;if(d&&l<c)return E(a,t,l,c),n;var v=c-l,p=s-f,g=-1;if(v<p){if(-1<(g=w(n,f,s,t,l,c,i)))return m(a,e,n,f,g,a(t[l],0)),m(a,e,n,g+v,s,x(a,t,c,u,o)),n}else if(p<v&&-1<(g=w(t,l,c,n,f,s,i)))return E(a,t,l,g),E(a,t,g+p,c),n;return v<2||p<2?(m(a,e,n,f,s,a(t[l],0)),E(a,t,l,c)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,l,c,i)?m(a,e,n,f,s,x(a,t,c,u,o)):C(a,e,n,f,s,p,t,l,c,v,u,i,o),n}var n,r={};function o(e,t){t=t||{};var n=N.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}r.CustomEvent="function"==typeof CustomEvent?CustomEvent:(o[n="prototype"]=new o("").constructor[n],o);var u=r.CustomEvent,c={};try{c.Map=Map;}catch(e){c.Map=function(){var n=0,i=[],a=[];return {delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this);},this);},get:function(e){return r(e)?a[n]:void 0},has:r,set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return -1<(n=i.indexOf(e))}};}var h=c.Map;function d(){return this}function v(e,t){var n="_"+e+"$";return {get:function(){return this[n]||p(this,n,t.call(this,e))},set:function(e){p(this,n,e);}}}var p=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(d.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var g,A,S,O,T,M,_={},j={},L=[],P=j.hasOwnProperty,D=0,W={attributes:_,define:function(e,t){e.indexOf("-")<0?(e in j||(D=L.push(e)),j[e]=t):_[e]=t;},invoke:function(e,t){for(var n=0;n<D;n++){var r=L[n];if(P.call(e,r))return j[r](e[r],t)}}},$=Array.isArray||(A=(g={}.toString).call([]),function(e){return g.call(e)===A}),R=(S=N,O="fragment",M="content"in H(T="template")?function(e){var t=H(T);return t.innerHTML=e,t.content}:function(e){var t,n=H(O),r=H(T);return F(n,/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)?(t=RegExp.$1,r.innerHTML="<table>"+e+"</table>",r.querySelectorAll(t)):(r.innerHTML=e,r.childNodes)),n},function(e,t){return ("svg"===t?function(e){var t=H(O),n=H("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",F(t,n.firstChild.childNodes),t}:M)(e)});function F(e,t){for(var n=t.length;n--;)e.appendChild(t[0]);}function H(e){return e===O?S.createDocumentFragment():S.createElementNS("http://www.w3.org/1999/xhtml",e)}var I,z,V,Z,G,q,B,J,K,Q,U=(z="appendChild",V="cloneNode",Z="createTextNode",q=(G="importNode")in(I=N),(B=I.createDocumentFragment())[z](I[Z]("g")),B[z](I[Z]("")),(q?I[G](B,!0):B[V](!0)).childNodes.length<2?function e(t,n){for(var r=t[V](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[z](e(i[o],n));return r}:q?I[G]:function(e,t){return e[V](!!t)}),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%",ee=!1;try{J=N.createElement("template"),Q="tabindex",(K="content")in J&&(J.innerHTML="<p "+Q+'="'+Y+'"></p>',J[K].childNodes[0].getAttribute(Q)==Y)||(Y="_dt: "+Y.slice(1,-1)+";",ee=!0);}catch(e){}var te="\x3c!--"+Y+"--\x3e",ne=8,re=1,ie=3,ae=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ue=" \\f\\n\\r\\t",ce="[^"+ue+"\\/>\"'=]+",le="["+ue+"]+"+ce,se="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",fe="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ce.replace("\\/","")+"))?)",he=new RegExp(se+le+fe+"+)(["+ue+"]*/?>)","g"),de=new RegExp(se+le+fe+"*)(["+ue+"]*/>)","g"),ve=new RegExp("("+le+"\\s*=\\s*)(['\"]?)"+te+"\\2","gi");function pe(e,t,n,r){return "<"+t+n.replace(ve,ge)+r}function ge(e,t,n){return t+(n||'"')+Y+(n||'"')}function me(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}var ye=ee?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort(function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1})}:function(e,t){return t.slice.call(e,0)};function be(e,t,n,r){for(var i=e.childNodes,a=i.length,o=0;o<a;){var u=i[o];switch(u.nodeType){case re:var c=r.concat(o);!function(e,t,n,r){var i,a=e.attributes,o=[],u=[],c=ye(a,n),l=c.length,s=0;for(;s<l;){var f=c[s++],h=f.value===Y;if(h||1<(i=f.value.split(te)).length){var d=f.name;if(o.indexOf(d)<0){o.push(d);var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(h)t.push(we(p,r,v,null));else {for(var g=i.length-2;g--;)n.shift();t.push(we(p,r,v,i));}}u.push(f);}}l=u.length;var m=(s=0)<l&&ee&&!("ownerSVGElement"in e);for(;s<l;){var y=u[s++];m&&(y.value=""),e.removeAttribute(y.name);}var b=e.nodeName;if(/^script$/i.test(b)){var w=N.createElement(b);for(l=a.length,s=0;s<l;)w.setAttributeNode(a[s++].cloneNode(!0));w.textContent=e.textContent,e.parentNode.replaceChild(w,e);}}(u,t,n,c),be(u,t,n,c);break;case ne:var l=u.textContent;if(l===Y)n.shift(),t.push(ae.test(e.nodeName)?Ne(e,r):{type:"any",node:u,path:r.concat(o)});else switch(l.slice(0,2)){case"/*":if("*/"!==l.slice(-2))break;case"👻":e.removeChild(u),o--,a--;}break;case ie:ae.test(e.nodeName)&&X.call(u.textContent)===te&&(n.shift(),t.push(Ne(e,r)));}o++;}}function we(e,t,n,r){return {type:"attr",node:e,path:t,name:n,sparse:r}}function Ne(e,t){return {type:"text",node:e,path:t}}var xe,Ee=(xe=new s,{get:function(e){return xe.get(e)},set:function(e,t){return xe.set(e,t),t}});function Ce(o,f){var e=(o.convert||function(e){return e.join(te).replace(de,me).replace(he,pe)})(f),t=o.transform;t&&(e=t(e));var n=R(e,o.type);Se(n);var u=[];return be(n,u,f.slice(0),[]),{content:n,updates:function(c){for(var l=[],s=u.length,e=0,t=0;e<s;){var n=u[e++],r=function(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}(c,n.path);switch(n.type){case"any":l.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?l.push({fn:a,sparse:!1}):(t+=i.length-2,l.push({fn:a,sparse:!0,values:i}));break;case"text":l.push({fn:o.text(r),sparse:!1}),r.textContent="";}}return s+=t,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=l[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a);}else r.fn(arguments[t++]);}return c}}}}var ke=[];function Ae(i){var a=ke,o=Se;return function(e){var t,n,r;return a!==e&&(t=i,n=a=e,r=Ee.get(n)||Ee.set(n,Ce(t,n)),o=r.updates(U.call(N,r.content,!0))),o.apply(null,arguments)}}function Se(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r);}}var Oe,Te,Me=(Oe=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Te=/([^A-Z])([A-Z]+)/g,function(e,t){return "ownerSVGElement"in e?function(e,t){var n;return (n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),je(n,!0)}(e,t):je(e.style,!1)});function _e(e,t,n){return t+"-"+n.toLowerCase()}function je(a,o){var u,c;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&c!==e)for(n in c)n in e||(a[n]="");}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||Oe.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Te,_e),":",e[t],";");return n.join("")}(c=t):c=e;break}default:c!=e&&(u="string",c=e,o?a.value=e||"":a.cssText=e||"");}}}var Le,Pe,De=(Le=[].slice,(Pe=We.prototype).ELEMENT_NODE=1,Pe.nodeType=111,Pe.remove=function(e){var t,n=this.childNodes,r=this.firstChild,i=this.lastChild;return this._=null,e&&2===n.length?i.parentNode.removeChild(i):((t=this.ownerDocument.createRange()).setStartBefore(e?n[1]:r),t.setEndAfter(i),t.deleteContents()),r},Pe.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},We);function We(e){var t=this.childNodes=Le.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null;}function $e(e){return {html:e}}function Re(e,t){switch(e.nodeType){case Ke:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case Je:return Re(e.render(),t);default:return e}}function Fe(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then($e).then(t):Promise.resolve(W.invoke(e,t)).then(t);}function He(e){return null!=e&&"then"in e}var Ie,ze,Ve,Ze,Ge,qe="ownerSVGElement",Be="connected",Je=d.prototype.nodeType,Ke=De.prototype.nodeType,Qe=(ze=(Ie={Event:u,WeakSet:e}).Event,Ve=Ie.WeakSet,Ze=!0,Ge=null,function(e){return Ze&&(Ze=!Ze,Ge=new Ve,function(t){var i=new Ve,a=new Ve;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0});}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length));},0);};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]});},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]});},!0);}function u(e){for(var t,n=e.length,r=0;r<n;r++)c((t=e[r]).removedNodes,"disconnected",a,i),c(t.addedNodes,"connected",i,a);}function c(e,t,n,r){for(var i,a=new ze(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&function e(t,n,r,i,a){Ge.has(t)&&!i.has(t)&&(a.delete(t),i.add(t),t.dispatchEvent(n));for(var o=t.children||[],u=o.length,c=0;c<u;e(o[c++],n,r,i,a));}(i,a,t,n,r));}}(e.ownerDocument)),Ge.add(e),e}),Ue=/^(?:form|list)$/i,Xe=[].slice;function Ye(e){return this.type=e,Ae(this)}var et=!(Ye.prototype={attribute:function(n,r,e){var i,t=qe in n;if("style"===r)return Me(n,e,t);if("."===r.slice(0,1))return o=n,u=r.slice(1),t?function(t){try{o[u]=t;}catch(e){o.setAttribute(u,t);}}:function(e){o[u]=e;};if(/^on/.test(r)){var a=r.slice(2);return a===Be||"disconnected"===a?Qe(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1));}}if("data"===r||!t&&r in n&&!Ue.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e);};if(r in W.attributes)return function(e){var t=W.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t));};var o,u,c=!1,l=e.cloneNode(!0);return function(e){i!==e&&(i=e,l.value!==e&&(null==e?(c&&(c=!1,n.removeAttributeNode(l)),l.value=e):(l.value=e,c||(c=!0,n.setAttributeNode(l)))));}},any:function(r,i){var a,o={node:Re,before:r},u=qe in r?"svg":"html",c=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":c?a!==t&&(a=t,i[0].textContent=t):(c=!0,a=t,i=l(r.parentNode,i,[(n=t,r.ownerDocument.createTextNode(n))],o));break;case"function":e(t(r));break;case"object":case"undefined":if(null==t){c=!1,i=l(r.parentNode,i,[],o);break}default:if(c=!1,$(a=t))if(0===t.length)i.length&&(i=l(r.parentNode,i,[],o));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if($(t[0])&&(t=t.concat.apply([],t)),He(t[0])){Promise.all(t).then(e);break}default:i=l(r.parentNode,i,t,o);}else "ELEMENT_NODE"in t?i=l(r.parentNode,i,11===t.nodeType?Xe.call(t.childNodes):[t],o):He(t)?t.then(e):"placeholder"in t?Fe(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?i=l(r.parentNode,i,Xe.call(R([].concat(t.html).join(""),u).childNodes),o):"length"in t?e(Xe.call(t)):e(W.invoke(t,e));}var n;}},text:function(r){var i;return function e(t){var n;i!==t&&("object"==(n=typeof(i=t))&&t?He(t)?t.then(e):"placeholder"in t?Fe(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?e([].concat(t.html).join("")):"length"in t?e(Xe.call(t).join("")):e(W.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t);}}}),tt=function(e){var t,r,i,a,n=(t=(N.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(t)),o=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);return n||o?(r={},i=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return r[t]||(r[t]=e)},tt=o?i:(a=new s,function(e){return a.get(e)||(n=i(t=e),a.set(t,n),n);var t,n;})):et=!0,nt(e)};function nt(e){return et?e:tt(e)}function rt(e){for(var t=arguments.length,n=[nt(e)],r=1;r<t;)n.push(arguments[r++]);return n}var it=new s,at=function(t){var n,r,i;return function(){var e=rt.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Ye(t),n=ut(r.apply(r,e))):r.apply(r,e),n}},ot=function(e,t){var n=t.indexOf(":"),r=it.get(e),i=t;return -1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||it.set(e,r={}),r[i]||(r[i]=at(t))},ut=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new De(t):e},ct=new s;function lt(){var e=ct.get(this),t=rt.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ye(qe in this?"svg":"html");ct.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments));}.apply(this,t),this}var st,ft,ht,dt,vt=W.define,pt=Ye.prototype;function gt(e){return arguments.length<2?null==e?at("html"):"string"==typeof e?gt.wire(null,e):"raw"in e?at("html")(e):"nodeType"in e?gt.bind(e):ot(e,"html"):("raw"in e?at("html"):gt.wire).apply(null,arguments)}return gt.Component=d,gt.bind=function(e){return lt.bind(e)},gt.define=vt,gt.diff=l,(gt.hyper=gt).observe=Qe,gt.tagger=pt,gt.wire=function(e,t){return null==e?at(t||"html"):ot(e,t||"html")},gt._={WeakMap:s,WeakSet:e},st=at,ft=new s,ht=Object.create,dt=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(d,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i,a,o,u=t.get(e)||dt(e,t);switch(typeof r){case"object":case"function":var c=u.w||(u.w=new s);return c.get(r)||(i=c,a=r,o=new e(n),i.set(a,o),o);default:var l=u.p||(u.p=ht(null));return l[r]||(l[r]=new e(n))}}(this,ft.get(e)||(n=e,r=new h,ft.set(n,r),r),e,null==t?"default":t);var n,r;}}}),Object.defineProperties(d.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e);}},html:v("html",st),svg:v("svg",st),state:v("state",function(){return this.defaultState}),defaultState:{get:function(){return {}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new u(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return !1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return !1!==t&&this.render(),this}}}),gt}(document);

  // @ts-check

  /** @type {import("idb")} */
  // @ts-ignore
  const idb = _idb;
  /** @type {import("hyperhtml").default} */
  // @ts-ignore
  const html$1 = hyperHTML;
  /** @type {import("marked")} */
  // @ts-ignore
  const marked$1 = marked_1;
  /** @type {import("pluralize")} */
  // @ts-ignore
  const pluralize$1 = pluralize;

  // @ts-check

  const dashes = /-/g;

  const localizationStrings = {
    en: {
      x_and_y: " and ",
      x_y_and_z: ", and ",
    },
    de: {
      x_and_y: " und ",
      x_y_and_z: " und ",
    },
  };
  const l10n$2 = getIntlData(localizationStrings);

  const ISODate = new Intl.DateTimeFormat(["en-ca-iso8601"], {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // CSS selector for matching elements that are non-normative
  const nonNormativeSelector =
    ".informative, .note, .issue, .impnote, .example, .ednote, .practice, .introductory";

  /**
   * Creates a link element that represents a resource hint.
   *
   * @param {ResourceHintOption} opts Configure the resource hint.
   * @return {HTMLLinkElement} A link element ready to use.
   */
  function createResourceHint(opts) {
    const url = new URL(opts.href, document.baseURI);
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
        if ("as" in opts) {
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
   * @param {object} [options]
   * @param {string} [options.details]
   */
  function showInlineWarning(elems, msg, title, options = {}) {
    if (!Array.isArray(elems)) elems = [elems];
    const message = getErrorMessage(elems, msg, title, options);
    pub("warn", message);
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
  function showInlineError(elems, msg, title, options = {}) {
    if (!Array.isArray(elems)) elems = [elems];
    const message = getErrorMessage(elems, msg, title, options);
    pub("error", message);
    console.error(msg, elems);
  }

  /**
   * @param {HTMLElement[]} elems
   * @param {String} msg
   * @param {String} title
   * @param {object} [options]
   * @param {string} [options.details]
   */
  function getErrorMessage(elems, msg, title, { details }) {
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
    return message;
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
        return items.join(l10n$2.x_and_y);
      default: {
        // x, y, and z
        const str = items.join(", ");
        const lastComma = str.lastIndexOf(",");
        const and = l10n$2.x_y_and_z;
        return `${str.substr(0, lastComma)}${and}${str.slice(lastComma + 2)}`;
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

  /**
   * @param {string} lang
   */
  function resolveLanguageAlias(lang) {
    const aliases = {
      "zh-hans": "zh",
      "zh-cn": "zh",
    };
    return aliases[lang] || lang;
  }

  /**
   * @template {Record<string, Record<string, string|Function>>} T
   * @param {T} localizationStrings
   * @returns {T[keyof T]}
   */
  function getIntlData(localizationStrings, lang$1 = lang) {
    lang$1 = resolveLanguageAlias(lang$1.toLowerCase());
    // Proxy return type is a known bug:
    // https://github.com/Microsoft/TypeScript/issues/20846
    // @ts-ignore
    return new Proxy(localizationStrings, {
      /** @param {string} key */
      get(data, key) {
        const result = (data[lang$1] && data[lang$1][key]) || data.en[key];
        if (!result) {
          throw new Error(`No l10n data for key: "${key}"`);
        }
        return result;
      },
    });
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
   * @param {string} content
   * @param {string} [flist]
   */
  function runTransforms(content, flist, ...funcArgs) {
    const args = [this, content, ...funcArgs];
    if (flist) {
      const methods = flist.split(/\s+/);
      for (const meth of methods) {
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
      customHeaders.set("Expires", expiryDate.toISOString());
      const cacheResponse = new Response(await clonedResponse.blob(), {
        headers: customHeaders,
      });
      // put in cache, and forget it (there is no recovery if it throws, but that's ok).
      await cache.put(request, cacheResponse).catch(console.error);
    }
    return response;
  }

  // --- DOM HELPERS -------------------------------

  function htmlJoinComma(array, mapper = item => item) {
    const items = array.map(mapper);
    const joined = items.slice(0, -1).map(item => html$1`${item}, `);
    return html$1`${joined}${items[items.length - 1]}`;
  }

  /**
   * Creates and sets an ID to an element (elem)
   * using a specific prefix if provided, and a specific text if given.
   * @param {Element} elem element
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
    } else if (/\.$/.test(id) || !/^[a-z]/i.test(pfx || id)) {
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

    // We could have done this with @data-lt (as the logic is same), but if
    // @data-lt was not present, we would end up using @data-local-lt as element's
    // id (in other words, we prefer textContent over @data-local-lt for dfn id)
    if (elem.dataset.localLt) {
      const localLt = elem.dataset.localLt.split("|");
      localLt.forEach(item => titleSet.add(norm(item)));
    }

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
      if (!linkForElem) result.push({ for: title, title });

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
  function wrapInner$1(outer, wrapper) {
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
   * Calculates indentation when the element starts after a newline.
   * The value will be empty if no newline or any non-whitespace exists after one.
   * @param {Element} element
   *
   * @example `    <div></div>` returns "    " (4 spaces).
   */
  function getElementIndentation(element) {
    const { previousSibling } = element;
    if (!previousSibling || previousSibling.nodeType !== Node.TEXT_NODE) {
      return "";
    }
    const index = previousSibling.textContent.lastIndexOf("\n");
    if (index === -1) {
      return "";
    }
    const slice = previousSibling.textContent.slice(index + 1);
    if (/\S/.test(slice)) {
      return "";
    }
    return slice;
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

  /**
   * @template ValueType
   * @extends {Map<string, ValueType>}
   */
  class CaseInsensitiveMap extends Map {
    /**
     * @param {Array<[string, ValueType]>} [entries]
     */
    constructor(entries = []) {
      super();
      entries.forEach(([key, elem]) => {
        this.set(key, elem);
      });
      return this;
    }
    /**
     * @param {String} key
     * @param {ValueType} value
     */
    set(key, value) {
      super.set(key.toLowerCase(), value);
      return this;
    }
    /**
     * @param {String} key
     */
    get(key) {
      return super.get(key.toLowerCase());
    }
    /**
     * @param {String} key
     */
    has(key) {
      return super.has(key.toLowerCase());
    }
    /**
     * @param {String} key
     */
    delete(key) {
      return super.delete(key.toLowerCase());
    }
  }

  // @ts-check

  const name$2 = "core/base-runner";

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
        performance.mark(`${name}-start`);
        try {
          if (plug.Plugin) {
            await new plug.Plugin(config).run();
            resolve();
          } else if (plug.run) {
            await plug.run(config);
            resolve();
          }
        } catch (err) {
          reject(err);
        } finally {
          clearTimeout(timerId);
        }
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      });
    };
  }

  function isRunnableModule(plug) {
    return plug && (plug.run || plug.Plugin);
  }

  async function runAll(plugs) {
    init();

    pub("start-all", respecConfig);
    performance.mark(`${name$2}-start`);
    await done$1;
    const runnables = plugs.filter(isRunnableModule).map(toRunnable);
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
    performance.mark(`${name$2}-end`);
    performance.measure(name$2, `${name$2}-start`, `${name$2}-end`);
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
    const response = await fetch(new URL(`../../${path}`, (document.currentScript && document.currentScript.src || new URL('respec-pcisig.js', document.baseURI).href)));
    return await response.text();
  }

  /**
   * @param {string} fileName
   */
  async function fetchAsset(fileName) {
    return fetchBase(`assets/${fileName}`);
  }

  // @ts-check
  /**
   * Module core/reindent
   *
   * Removes common indents across the IDL texts,
   * so that indentation inside <pre> won't affect the rendered result.
   */

  const name$3 = "core/reindent";

  /**
   * @param {string} text
   */
  function reindent(text) {
    if (!text) {
      return text;
    }
    const lines = text.trimEnd().split("\n");
    while (lines.length && !lines[0].trim()) {
      lines.shift();
    }
    const indents = lines.filter(s => s.trim()).map(s => s.search(/[^\s]/));
    const leastIndent = Math.min(...indents);
    return lines.map(s => s.slice(leastIndent)).join("\n");
  }

  function run$1() {
    for (const pre of document.getElementsByTagName("pre")) {
      pre.innerHTML = reindent(pre.innerHTML);
    }
  }

  var reindent$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$3,
    reindent: reindent,
    run: run$1
  });

  // @ts-check
  const name$4 = "core/markdown";

  const gtEntity = /&gt;/gm;
  const ampEntity = /&amp;/gm;

  class Renderer extends marked$1.Renderer {
    code(code, infoString, isEscaped) {
      const { language, ...metaData } = Renderer.parseInfoString(infoString);

      // regex to check whether the language is webidl
      if (/(^webidl$)/i.test(language)) {
        return `<pre class="idl">${code}</pre>`;
      }

      const html = super.code(code, language, isEscaped);

      const { example, illegalExample } = metaData;
      if (!example && !illegalExample) return html;

      const title = example || illegalExample;
      const className = `${language} ${example ? "example" : "illegal-example"}`;
      return html.replace("<pre>", `<pre title="${title}" class="${className}">`);
    }

    /**
     * @param {string} infoString
     */
    static parseInfoString(infoString) {
      const firstSpace = infoString.search(/\s/);
      if (firstSpace === -1) {
        return { language: infoString };
      }

      const language = infoString.slice(0, firstSpace);
      const metaDataStr = infoString.slice(firstSpace + 1);
      let metaData;
      if (metaDataStr) {
        try {
          metaData = JSON.parse(`{ ${metaDataStr} }`);
        } catch (error) {
          console.error(error);
        }
      }

      return { language, ...metaData };
    }

    heading(text, level, raw, slugger) {
      const headingWithIdRegex = /(.+)\s+{#([\w-]+)}$/;
      if (headingWithIdRegex.test(text)) {
        const [, textContent, id] = text.match(headingWithIdRegex);
        return `<h${level} id="${id}">${textContent}</h${level}>`;
      }
      return super.heading(text, level, raw, slugger);
    }
  }

  /**
   * @param {string} text
   */
  function markdownToHtml(text) {
    const normalizedLeftPad = reindent(text);
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
      langPrefix: "",
      renderer: new Renderer(),
    });
    return result;
  }

  /**
   * @param {string} selector
   * @return {(el: Element) => Element[]}
   */
  function convertElements(selector) {
    return element => {
      const elements = element.querySelectorAll(selector);
      elements.forEach(convertElement);
      return Array.from(elements);
    };
  }

  /**
   * @param {Element} element
   */
  function convertElement(element) {
    for (const pre of element.getElementsByTagName("pre")) {
      // HTML parser implicitly removes a newline after <pre>
      // which breaks reindentation algorithm
      pre.prepend("\n");
    }
    element.innerHTML = markdownToHtml(element.innerHTML);
  }

  /**
   * CommonMark requires additional empty newlines between markdown and HTML lines.
   * This function adds them as a backward compatibility workaround.
   * @param {HTMLElement} element
   * @param {string} selector
   */
  function workaroundBlockLevelMarkdown(element, selector) {
    /** @type {NodeListOf<HTMLElement>} */
    const elements = element.querySelectorAll(selector);
    for (const element of elements) {
      const { innerHTML } = element;
      if (/^<\w/.test(innerHTML.trimStart())) {
        // if the block content starts with HTML-like format
        // then assume it doesn't need a workaround
        continue;
      }
      // Double newlines are needed to be parsed as Markdown
      const lines = innerHTML.split("\n");
      const firstTwo = lines.slice(0, 2).join("\n");
      const lastTwo = lines.slice(-2).join("\n");
      if (firstTwo.trim()) {
        element.prepend("\n\n");
      }
      if (lastTwo.trim()) {
        // keep the indentation of the end tag
        const indentation = getElementIndentation(element);
        element.append(`\n\n${indentation}`);
      }
    }
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
   * Re-structure DOM around elem whose markdown has been processed.
   * @param {Element} elem
   */
  function restructure(elem) {
    const structuredInternals = structure(elem, elem.ownerDocument);
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
  }

  /**
   * @param {Iterable<Element>} elements
   */
  function substituteWithTextNodes(elements) {
    Array.from(elements).forEach(element => {
      element.replaceWith(element.textContent);
    });
  }

  const processMDSections = convertElements("[data-format='markdown']:not(body)");
  const blockLevelElements =
    "[data-format=markdown], section, div, address, article, aside, figure, header, main";

  function run$2(conf) {
    const hasMDSections = !!document.querySelector(
      "[data-format=markdown]:not(body)"
    );
    const isMDFormat = conf.format === "markdown";
    if (!isMDFormat && !hasMDSections) {
      return; // Nothing to be done
    }
    // Only has markdown-format sections
    if (!isMDFormat) {
      for (const processedElem of processMDSections(document.body)) {
        restructure(processedElem);
      }
      return;
    }
    // We transplant the UI to do the markdown processing
    const rsUI = document.getElementById("respec-ui");
    rsUI.remove();
    // The new body will replace the old body
    const newBody = document.body.cloneNode(true);
    // Marked expects markdown be flush against the left margin
    // so we need to normalize the inner text of some block
    // elements.
    workaroundBlockLevelMarkdown(newBody, blockLevelElements);
    convertElement(newBody);
    // Remove links where class .nolinks
    substituteWithTextNodes(newBody.querySelectorAll(".nolinks a[href]"));
    // Restructure the document properly
    const fragment = structure(newBody, document);
    // Frankenstein the whole thing back together
    newBody.append(rsUI, fragment);
    document.body.replaceWith(newBody);
  }

  var markdown = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$4,
    markdownToHtml: markdownToHtml,
    restructure: restructure,
    run: run$2
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
  const name$5 = "core/ui";

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

  const respecUI = html$1`<div id="respec-ui" class="removeOnSave" hidden></div>`;
  const menu = html$1`<ul
  id="respec-menu"
  role="menu"
  aria-labelledby="respec-pill"
  hidden
></ul>`;
  const closeButton = html$1`<button
  class="close-button"
  onclick=${() => ui.closeModal()}
  title="Close"
>
  ❌
</button>`;
  window.addEventListener("load", () => trapFocus(menu));
  let modal;
  let overlay;
  const errors = [];
  const warnings = [];
  const buttons = {};

  sub("start-all", () => document.body.prepend(respecUI), { once: true });
  sub("end-all", () => document.body.prepend(respecUI), { once: true });

  const respecPill = html$1`<button id="respec-pill" disabled>ReSpec</button>`;
  respecUI.appendChild(respecPill);
  respecPill.addEventListener("click", e => {
    e.stopPropagation();
    respecPill.setAttribute("aria-expanded", String(menu.hidden));
    toggleMenu();
    menu.querySelector("li:first-child button").focus();
  });

  document.documentElement.addEventListener("click", () => {
    if (!menu.hidden) {
      toggleMenu();
    }
  });
  respecUI.appendChild(menu);

  menu.addEventListener("keydown", e => {
    if (e.key === "Escape" && !menu.hidden) {
      respecPill.setAttribute("aria-expanded", String(menu.hidden));
      toggleMenu();
      respecPill.focus();
    }
  });

  function toggleMenu() {
    menu.classList.toggle("respec-hidden");
    menu.classList.toggle("respec-visible");
    menu.hidden = !menu.hidden;
  }

  // Code adapted from https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
  function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
      "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])"
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    if (firstFocusableEl) {
      firstFocusableEl.focus();
    }
    element.addEventListener("keydown", e => {
      if (e.key !== "Tab") {
        return;
      }
      // shift + tab
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      }
      // tab
      else if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    });
  }

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
    const button = buttons[butName];
    button.textContent = arr.length;
    const label = arr.length === 1 ? pluralize$1.singular(title) : title;
    const ariaMap = new Map([["label", `${arr.length} ${label}`]]);
    ariaDecorate(button, ariaMap);
  }

  function createWarnButton(butName, arr, title) {
    const buttonId = `respec-pill-${butName}`;
    const button = html$1`<button
    id="${buttonId}"
    class="respec-info-button"
  ></button>`;
    button.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "true");
      const ol = html$1`<ol class="${`respec-${butName}-list`}"></ol>`;
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
      const button = html$1`<button
      id="${id}"
      class="respec-option"
      title="${keyShort}"
    >
      <span class="respec-cmd-icon" aria-hidden="true">${icon}</span> ${label}…
    </button>`;
      const menuItem = html$1`<li role="menuitem">${button}</li>`;
      menuItem.addEventListener("click", handler);
      menu.appendChild(menuItem);
      if (keyShort) shortcut.add(keyShort, handler);
      return button;
    },
    error(msg) {
      errWarn(msg, errors, "error", "ReSpec Errors");
    },
    warning(msg) {
      errWarn(msg, warnings, "warning", "ReSpec Warnings");
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
      respecPill.focus();
    },
    freshModal(title, content, currentOwner) {
      if (modal) modal.remove();
      if (overlay) overlay.remove();
      overlay = html$1`<div id="respec-overlay" class="removeOnSave"></div>`;
      const id = `${currentOwner.id}-modal`;
      const headingId = `${id}-heading`;
      modal = html$1`<div
      id="${id}"
      class="respec-modal removeOnSave"
      role="dialog"
      aria-labelledby="${headingId}"
    >
      ${closeButton}
      <h3 id="${headingId}">${title}</h3>
      <div class="inside">${content}</div>
    </div>`;
      const ariaMap = new Map([["labelledby", headingId]]);
      ariaDecorate(modal, ariaMap);
      document.body.append(overlay, modal);
      overlay.addEventListener("click", () => this.closeModal(currentOwner));
      overlay.classList.toggle("respec-show-overlay");
      modal.hidden = false;
      trapFocus(modal);
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
    name: name$5,
    ui: ui
  });

  // @ts-check
  // Module core/location-hash
  // Resets window.location.hash to jump to the right point in the document

  const name$6 = "core/location-hash";

  function run$3() {
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
    zh: {
      description: `文档只能包含一个 charset 属性为 utf-8 的 \`<meta>\` 标签`,
      howToFix: `将此行添加到文档的 \`<head>\` 部分—— \`<meta charset="utf-8">\` 或将 charset 设置为 utf-8（如果尚未设置）。`,
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
      val.push(meta.getAttribute("charset").trim().toLowerCase());
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
    const doc = elem.ownerDocument;
    return !doc.getElementById(id) && !doc.getElementsByName(id).length;
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
    zh: {
      description: "所有章节（section）都必须以 `h2-6` 元素开头。",
      howToFix: "将 `h2-6` 添加到有问题的章节或使用 `<div>`。",
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
    zh: {
      description: "`respecConfig` 中不允许使用不安全的URL.",
      howToFix: "请将以下属性更改为 https://：",
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

  const name$e = "no-unused-vars";

  const meta$6 = {
    en: {
      description: "Variable was defined, but never used.",
      howToFix: "Add a `data-ignore-unused` attribute to the `<var>`.",
      help: "See developer console.",
    },
  };
  // Fall back to english, if language is missing
  const lang$7 = lang in meta$6 ? lang : "en";

  /**
   * @param {*} _
   * @param {Document} doc
   * @return {import("../LinterRule").LinterResult}
   */
  function linterFunction$4(_, doc) {
    const offendingElements = [];

    /**
     * Check if a <section> contains a `".algorithm"`
     *
     * The selector matches:
     * ``` html
     * <section><ul class="algorithm"></ul></section>
     * <section><div><ul class="algorithm"></ul></div></section>
     * ```
     * The selector does not match:
     * ``` html
     * <section><section><ul class="algorithm"></ul></section></section>
     * ```
     * @param {HTMLElement} section
     */
    const sectionContainsAlgorithm = section =>
      !!section.querySelector(
        ":scope > :not(section) ~ .algorithm, :scope > :not(section) .algorithm"
      );

    for (const section of doc.querySelectorAll("section")) {
      if (!sectionContainsAlgorithm(section)) continue;

      /**
       * `<var>` in this section, but excluding those in child sections.
       * @type {NodeListOf<HTMLElement>}
       */
      const varElems = section.querySelectorAll(":scope > :not(section) var");
      if (!varElems.length) continue;

      /** @type {Map<string, HTMLElement[]>} */
      const varUsage = new Map();
      for (const varElem of varElems) {
        const key = norm(varElem.textContent);
        const elems = varUsage.get(key) || varUsage.set(key, []).get(key);
        elems.push(varElem);
      }

      for (const vars of varUsage.values()) {
        if (vars.length === 1 && !vars[0].hasAttribute("data-ignore-unused")) {
          offendingElements.push(vars[0]);
        }
      }
    }

    if (!offendingElements.length) {
      return;
    }
    return {
      name: name$e,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$6[lang$7],
    };
  }
  const rule$6 = new LinterRule(name$e, linterFunction$4);

  // @ts-check
  const name$f = "privsec-section";
  const meta$7 = {
    en: {
      description:
        "Document must a 'Privacy and/or Security' Considerations section.",
      howToFix: "Add a privacy and/or security considerations section.",
      help:
        "See the [Self-Review Questionnaire](https://w3ctag.github.io/security-questionnaire/).",
    },
  };

  // Fall back to english, if language is missing
  const lang$8 = lang in meta$7 ? lang : "en";

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
      return { name: name$f, occurrences: 1, ...meta$7[lang$8] };
    }
  }

  const rule$7 = new LinterRule(name$f, lintingFunction$2);

  // @ts-check

  linter.register(
    rule$5,
    rule$4,
    rule$6,
    rule$2,
    rule$3,
    rule$1,
    rule,
    rule$7
  );

  const coreDefaults = {
    lint: {
      "no-headingless-sections": true,
      "no-http-props": true,
      "no-unused-vars": false,
      "check-punctuation": false,
      "local-refs-exist": true,
      "check-internal-slots": false,
      "check-charset": false,
      "privsec-section": false,
    },
    pluralize: true,
    specStatus: "base",
    highlightVars: true,
    addSectionLinks: true,
  };

  // @ts-check

  /** @type {CaseInsensitiveMap<Set<HTMLElement>>} */
  const definitionMap = new CaseInsensitiveMap();

  /**
   * @param {HTMLElement} dfn A definition element to register
   * @param {string[]} names Names to register the element by
   */
  function registerDefinition(dfn, names) {
    for (const name of names) {
      if (!definitionMap.has(name)) {
        definitionMap.set(name, new Set());
      }
      definitionMap.get(name).add(dfn);
    }
  }

  // @ts-check

  const name$g = "wpt-tests-exist";

  const meta$8 = {
    en: {
      description: "Non-existent Web Platform Tests",
      howToFix: "Please fix the tests mentioned.",
      help: "See developer console.",
    },
  };

  const lang$9 = lang in meta$8 ? lang : "en";

  /**
   * Runs linter rule.
   * @param {Object} conf The ReSpec config.
   * @param  {Document} doc The document to be checked.
   * @return {Promise<import("../LinterRule").LinterResult>}
   */
  async function linterFunction$5(conf, doc) {
    const filesInWPT = await getFilesInWPT(conf.testSuiteURI, conf.githubAPI);
    if (!filesInWPT) {
      return;
    }

    const offendingElements = [];
    const offendingTests = new Set();

    /** @type {NodeListOf<HTMLElement>} */
    const elems = doc.querySelectorAll("[data-tests]");
    const testables = [...elems].filter(elem => elem.dataset.tests);

    for (const elem of testables) {
      const tests = elem.dataset.tests
        .split(/,/gm)
        .map(test => test.trim().split("#")[0])
        .filter(test => test);

      const missingTests = tests.filter(test => !filesInWPT.has(test));
      if (missingTests.length) {
        offendingElements.push(elem);
        missingTests.forEach(test => offendingTests.add(test));
      }
    }

    if (!offendingElements.length) {
      return;
    }

    const missingTests = [...offendingTests].map(test => `\`${test}\``);
    return {
      name: name$g,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$8[lang$9],
      description: `${meta$8[lang$9].description}: ${missingTests.join(", ")}.`,
    };
  }

  const rule$8 = new LinterRule(name$g, linterFunction$5);

  /**
   * @param {string} testSuiteURI
   * @param {string} githubAPIBase
   */
  async function getFilesInWPT(testSuiteURI, githubAPIBase) {
    let wptDirectory;
    try {
      const testSuiteURL = new URL(testSuiteURI);
      if (
        testSuiteURL.pathname.startsWith("/web-platform-tests/wpt/tree/master/")
      ) {
        const re = /web-platform-tests\/wpt\/tree\/master\/(.+)/;
        wptDirectory = testSuiteURL.pathname.match(re)[1].replace(/\//g, "");
      } else {
        wptDirectory = testSuiteURL.pathname.replace(/\//g, "");
      }
    } catch (error) {
      const msg = "Failed to parse WPT directory from testSuiteURI";
      pub("warn", msg);
      console.error(error);
      return null;
    }

    const url = new URL("web-platform-tests/wpt/files", `${githubAPIBase}/`);
    url.searchParams.set("path", wptDirectory);

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.text();
      const msg =
        "Failed to fetch files from WPT repository. " +
        `Request failed with error: ${error} (${response.status})`;
      pub("warn", msg);
      return null;
    }
    /** @type {{ entries: string[] }} */
    const { entries } = await response.json();
    const files = entries.filter(entry => !entry.endsWith("/"));
    return new Set(files);
  }

  /**
   * Sets the defaults for pcisig specs
   */
  const name$h = "pcisig/pcisig-defaults";

  linter.register(rule$7, rule$8);

  const pcisigDefaults = {
    lint: {
      "privsec-section": true,
      "wpt-tests-exist": false,
    },
    pluralize: true,
    doJsonLd: false,
    numberByChapter: true,
    sectionRefsByNumber: true,
    license: "pcisig-software-doc",
    logos: [
      {
        src:
          "https://sglaser.github.io/respec/Spec/StyleSheets/2019/logos/pci_express_PMS.svg",
        alt: "pcisig",
        height: 40,
        width: 105,
        url: "https://www.pcisig.com/",
      },
    ],
    xref: false,
  };

  function run$5(conf) {
    conf.respecRFC2119Keywords = conf.respecRFC2119Keywords || [
      "\\bMUST(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
      "\\bSHOULD(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
      "\\bSHALL(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
      "\\bMAY\\b",
      "\\b(?:IS|ARE)(?:\\s+NOT)?\\s+PERMITTED\\s+TO\\b",
      "\\b(?:NOT\\s+)?REQUIRED\\b",
      "\\b(?:STRONGLY\\s+)?(?:NOT\\s+)?RECOMMENDED\\b",
      "\\b(?:INDEPENDENTLY\\s+)?OPTIONAL\\b",
    ];
    if (conf.specStatus === "unofficial") return;
    // assign the defaults
    const lint =
      conf.lint === false
        ? false
        : {
            ...coreDefaults.lint,
            ...pcisigDefaults.lint,
            ...conf.lint,
          };
    Object.assign(conf, {
      ...coreDefaults,
      ...pcisigDefaults,
      ...conf,
      lint,
    });

    // TODO: eventually, we want to remove this.
    // It's here for legacy support of json-ld specs
    // see https://github.com/pcisig/respec/issues/2019
    Object.assign(conf, { definitionMap });
  }

  var pcisigDefaults$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$h,
    run: run$5
  });

  // @ts-check
  const name$i = "core/style";

  // Opportunistically inserts the style, with the chance to reduce some FOUC
  const styleElement = insertStyle$1();

  async function loadStyle$1() {
    try {
      return (await Promise.resolve().then(function () { return respec$1; })).default;
    } catch {
      return fetchAsset("respec.css");
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
    name: name$i,
    run: run$6
  });

  // @ts-check

  const name$j = "pcisig/style";

  function attachFixupScript(document, version) {
    const script = document.createElement("script");
    script.addEventListener(
      "load",
      () => {
        if (window.location.hash) {
          // eslint-disable-next-line no-self-assign
          window.location = window.location;
        }
      },
      { once: true }
    );
    script.src = `https://sglaser.github.io/respec/Spec/scripts/${version}/fixup.js`;
    document.body.appendChild(script);
  }

  // Make a best effort to attach meta viewport at the top of the head.
  // Other plugins might subsequently push it down, but at least we start
  // at the right place. When ReSpec exports the HTML, it again moves the
  // meta viewport to the top of the head - so to make sure it's the first
  // thing the browser sees. See js/ui/save-html.js.
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
    link.href = "https://sglaser.github.io/respec/Spec/StyleSheets/2019/base.css";
    link.classList.add("removeOnSave");
    return link;
  }

  function selectStyleVersion(styleVersion) {
    let version = "";
    switch (styleVersion) {
      case null:
      case true:
        version = "2019";
        break;
      default:
        if (styleVersion && !isNaN(styleVersion)) {
          version = styleVersion.toString().trim();
        }
    }
    return version;
  }

  function createResourceHints(conf) {
    const resourceHints = [
      {
        hint: "preconnect", // for PCISIG styles and scripts.
        href: "https://sglaser.github.io/respec/Spec",
      },
      {
        hint: "preload", // all specs need it, and we attach it on end-all.
        href: "https://sglaser.github.io/respec/Spec/scripts/2019/fixup.js",
        as: "script",
      },
      {
        hint: "preload", // all specs include on base.css.
        href: "https://sglaser.github.io/respec/Spec/StyleSheets/2019/base.css",
        as: "style",
      },
      {
        hint: "preload", // all specs show the logo.
        href:
          "https://sglaser.github.io/respec/Spec/StyleSheets/2019/logos/pci_express_PMS.svg",
        as: "image",
      },
    ]
      .map(createResourceHint)
      .reduce((frag, link) => {
        frag.appendChild(link);
        return frag;
      }, document.createDocumentFragment());
    return conf.cssOverride ? document.createDocumentFragment() : resourceHints;
  }

  function insertInitialElements(conf) {
    // Collect elements for insertion (document fragment)
    const elements = createResourceHints(conf);

    // Opportunistically apply base style unless overridden
    if (!conf.cssOverride) elements.appendChild(createBaseStyle());
    if (!document.head.querySelector("meta[name=viewport]")) {
      // Make meta viewport the first element in the head.
      elements.insertBefore(createMetaViewport(), elements.firstChild);
    }

    document.head.insertBefore(elements, document.head.firstChild);
  }

  function run$7(conf) {
    if (!conf.specStatus) {
      const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
      conf.specStatus = "base";
      pub("warn", warn);
    }
    insertInitialElements(conf);

    let styleFile = "PCISIG-";

    // Figure out which style file to use.
    switch (conf.specStatus.toUpperCase()) {
      case "WG-DRAFT-NOTE":
      case "PUB-DRAFT-NOTE":
        styleFile += "NOTE";
        break;
      case "WG-NOTE":
      case "PUB-NOTE":
        styleFile += "NOTE";
        break;
      case "ED":
      case "ED-CWG":
        styleFile += "DRAFT-ED";
        break;
      case "ED-MEM":
      case "ED-FINAL":
        styleFile += "ED";
        break;
      case "WD":
      case "WD-CWG":
        styleFile += "DRAFT-WD";
        break;
      case "WD-MEM":
      case "WD-FINAL":
        styleFile += "WD";
        break;
      case "RC":
      case "RC-CWG":
      case "RC-MEM":
        styleFile += "DRAFT-RC";
        break;
      case "RC-FINAL":
        styleFile += "RC";
        break;
      case "PUB":
      case "PUB-CWG":
        styleFile += "DRAFT-PUB";
        break;
      case "PUB-MEM":
        styleFile += "PUB";
        break;
      case "FINAL":
        styleFile += "FINAL";
        break;
      case "DRAFT-NOTE":
        styleFile = "DRAFT";
        break;
      case "UNOFFICIAL":
      case "PRIVATE":
      case "BASE":
      case "NOTE":
      case "MEMBER-PRIVATE":
      case "MEMBER-SUBMISSION":
      case "TEAM-PRIVATE":
      case "TEAM-SUBMISSION":
        styleFile = "base";
        break;
      default:
        styleFile = "base";
    }

    // Select between released styles and experimental style.
    const version = selectStyleVersion(conf.useExperimentalStyles || "2019");
    // Attach PCISIG fixup script after we are done.
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
    const finalStyleURL = `https://sglaser.github.io/respec/Spec/StyleSheets/${finalVersionPath}${styleFile}.css`;

    if (conf.cssOverride) {
      linkCSS(document, conf.cssOverride);
    } else {
      linkCSS(document, finalStyleURL);
    }
  }

  var pcisigStyle = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$j,
    run: run$7
  });

  // Module pcisig/l10n
  const name$k = "pcisig/l10n";
  const additions = {
    en: {
      sotd: "Status of this Document",
      status_at_publication:
        "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current PCISIG publications and the latest revision of this specification can be found at <a href='https://www.pcisig.com'>pcisig.com</a>",
    },
  };

  Object.keys(additions).forEach(key => {
    if (!l10n[key]) l10n[key] = {};
    Object.assign(l10n[key], additions[key]);
  });

  var l10n$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$k
  });

  // @ts-check
  const name$l = "core/github";

  let resolveGithubPromise;
  let rejectGithubPromise;
  /** @type {Promise<{ apiBase: string, fullName: string, branch: string, repoURL: string } | null>} */
  const github = new Promise((resolve, reject) => {
    resolveGithubPromise = resolve;
    rejectGithubPromise = message => {
      pub("error", message);
      reject(new Error(message));
    };
  });

  const localizationStrings$1 = {
    en: {
      file_a_bug: "File a bug",
      participate: "Participate",
      commit_history: "Commit history",
    },
    ko: {
      participate: "참여",
    },
    zh: {
      participate: "参与：",
      file_a_bug: "反馈错误",
    },
    ja: {
      file_a_bug: "問題報告",
      participate: "参加方法：",
      commit_history: "変更履歴",
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
    de: {
      file_a_bug: "Fehler melden",
      participate: "Mitmachen",
      commit_history: "Revisionen",
    },
  };
  const l10n$4 = getIntlData(localizationStrings$1);

  async function run$8(conf) {
    if (!conf.hasOwnProperty("github") || !conf.github) {
      // nothing to do, bail out.
      resolveGithubPromise(null);
      return;
    }
    if (
      typeof conf.github === "object" &&
      !conf.github.hasOwnProperty("repoURL")
    ) {
      const msg =
        "Config option `[github](https://github.com/w3c/respec/wiki/github)` " +
        "is missing property `repoURL`.";
      rejectGithubPromise(msg);
      return;
    }
    let tempURL = conf.github.repoURL || conf.github;
    if (!tempURL.endsWith("/")) tempURL += "/";
    let ghURL;
    try {
      ghURL = new URL(tempURL, "https://github.com");
    } catch {
      const msg = `\`respecConf.github\` is not a valid URL? (${ghURL})`;
      rejectGithubPromise(msg);
      return;
    }
    if (ghURL.origin !== "https://github.com") {
      const msg = `\`respecConf.github\` must be HTTPS and pointing to GitHub. (${ghURL})`;
      rejectGithubPromise(msg);
      return;
    }
    const [org, repo] = ghURL.pathname.split("/").filter(item => item);
    if (!org || !repo) {
      const msg =
        "`respecConf.github` URL needs a path with, for example, w3c/my-spec";
      rejectGithubPromise(msg);
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
      key: l10n$4.participate,
      data: [
        {
          value: `GitHub ${org}/${repo}`,
          href: ghURL,
        },
        {
          value: l10n$4.file_a_bug,
          href: newProps.issueBase,
        },
        {
          value: l10n$4.commit_history,
          href: new URL(`./commits/${branch}`, ghURL.href).href,
        },
        {
          value: "Pull requests",
          href: newProps.pullBase,
        },
      ],
    };
    // Assign new properties, but retain existing ones
    let githubAPI = "https://respec.org/github";
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
      apiBase: githubAPI,
      fullName: `${org}/${repo}`,
    };
    resolveGithubPromise(normalizedGHObj);

    const normalizedConfig = {
      ...newProps,
      ...conf,
      github: normalizedGHObj,
      githubAPI,
    };
    Object.assign(conf, normalizedConfig);
    conf.otherLinks.unshift(otherLink);
  }

  var github$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$l,
    github: github,
    run: run$8
  });

  // @ts-check

  const name$m = "core/data-include";

  /**
   * @param {HTMLElement} el
   * @param {string} data
   * @param {object} options
   * @param {boolean} options.replace
   */
  function fillWithText(el, data, { replace }) {
    const { includeFormat } = el.dataset;
    let fill = data;
    if (includeFormat === "markdown") {
      fill = markdownToHtml(fill);
    }

    if (includeFormat === "text") {
      el.textContent = fill;
    } else {
      el.innerHTML = fill;
    }

    if (includeFormat === "markdown") {
      restructure(el);
    }

    if (replace) {
      el.replaceWith(...el.childNodes);
    }
  }

  /**
   * @param {string} rawData
   * @param {string} id
   * @param {string} url
   */
  function processResponse(rawData, id, url) {
    /** @type {HTMLElement} */
    const el = document.querySelector(`[data-include-id=${id}]`);
    const data = runTransforms(rawData, el.dataset.oninclude, url);
    const replace = typeof el.dataset.includeReplace === "string";
    fillWithText(el, data, { replace });
    // If still in the dom tree, clean up
    if (!replace) {
      removeIncludeAttributes(el);
    }
  }
  /**
   * Removes attributes after they are used for inclusion, if present.
   *
   * @param {Element} el The element to clean up.
   */
  function removeIncludeAttributes(el) {
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
    name: name$m,
    run: run$9
  });

  /**
   * This module handles the creation of the h1#title of a spec and
   * makes sure the <title> always matches the h1.
   *
   * If no h1#title is included, then the <title> becomes the h1#title.
   *
   * When a h1#title is included, it always takes precedence over the
   * <title> of a spec. An error will be displayed in case of
   * any mismatch.
   *
   */
  const name$n = "core/title";

  const localizationStrings$2 = {
    en: {
      default_title: "No Title",
    },
    de: {
      default_title: "Kein Titel",
    },
    zh: {
      default_title: "无标题",
    },
  };

  const l10n$5 = getIntlData(localizationStrings$2);

  function run$a(conf) {
    /** @type {HTMLElement} */
    const h1Elem =
      document.querySelector("h1#title") || html$1`<h1 id="title"></h1>`;

    // check existing element is ok to use
    if (h1Elem.isConnected && h1Elem.textContent.trim() === "") {
      const msg =
        "The document is missing a title, so using a default title. " +
        "To fix this, please give your document a `<title>`. " +
        "If you need special markup in the document's title, " +
        'please use a `<h1 id="title">`.';
      const msgTitle = "Document is missing a title";
      showInlineError(h1Elem, msg, msgTitle);
    }

    // Decorate the spec title
    if (!h1Elem.id) h1Elem.id = "title";
    h1Elem.classList.add("title");

    setDocumentTitle(conf, h1Elem);

    // This will get relocated by a template later.
    document.body.prepend(h1Elem);
  }

  function setDocumentTitle(conf, h1Elem) {
    // If the h1 is newly created, it won't be connected. In this case
    // we use the <title> or a localized fallback.
    if (!h1Elem.isConnected) {
      h1Elem.textContent = document.title || `${l10n$5.default_title}`;
    }

    let documentTitle = norm(h1Elem.textContent);

    if (conf.isPreview && conf.prNumber) {
      const prUrl = conf.prUrl || `${conf.github.repoURL}pull/${conf.prNumber}`;
      const { childNodes } = html$1`
      Preview of PR <a href="${prUrl}">#${conf.prNumber}</a>:
    `;
      h1Elem.prepend(...childNodes);
      documentTitle = `Preview of PR #${conf.prNumber}: ${documentTitle}`;
    }

    document.title = documentTitle;

    // conf.title is deperecated - we are keeping this here just to
    // retain backwards compat as we think the ePub generator
    // relies on it.
    conf.title = documentTitle;
  }

  var title = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$n,
    run: run$a
  });

  // @ts-check

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
    const a = html$1`
    <a href="${obj.url || ""}" class="logo"></a>
  `;
    if (!obj.alt) {
      showInlineWarning(a, "Found spec logo without an `alt` attribute");
    }
    /** @type {HTMLImageElement} */
    const img = html$1`
    <img
      id="${obj.id}"
      alt="${obj.alt}"
      width="${obj.width}"
      height="${obj.height}"
    />
  `;
    // avoid triggering 404 requests from dynamically generated
    // html attribute values
    img.src = obj.src;
    a.append(img);
    return a;
  };

  // @ts-check

  const localizationStrings$3 = {
    en: {
      until: "Until",
    },
    es: {
      until: "Hasta",
    },
  };

  const lang$a = lang in localizationStrings$3 ? lang : "en";

  var showPeople = (items = []) => {
    const l10n = localizationStrings$3[lang$a];
    return items.map(getItem);

    function getItem(p) {
      const personName = [p.name]; // treated as opt-in HTML by html
      const company = [p.company];
      const editorid = p.w3cid ? parseInt(p.w3cid, 10) : null;
      /** @type {HTMLElement} */
      const dd = html$1`
      <dd class="p-author h-card vcard" data-editor-id="${editorid}"></dd>
    `;
      const span = document.createDocumentFragment();
      const contents = [];
      if (p.mailto) {
        contents.push(html$1`
        <a class="ed_mailto u-email email p-name" href="${`mailto:${p.mailto}`}"
          >${personName}</a
        >
      `);
      } else if (p.url) {
        contents.push(html$1`
        <a class="u-url url p-name fn" href="${p.url}">${personName}</a>
      `);
      } else {
        contents.push(
          html$1`
          <span class="p-name fn">${personName}</span>
        `
        );
      }
      if (p.orcid) {
        contents.push(
          html$1`
          <a class="p-name orcid" href="${p.orcid}"
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
        `
        );
      }
      if (p.company) {
        if (p.companyURL) {
          contents.push(
            html$1`
            (<a class="p-org org h-org h-card" href="${p.companyURL}"
              >${company}</a
            >)
          `
          );
        } else {
          contents.push(
            html$1`
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
          html$1`
          - ${l10n.until.concat(" ")}${timeElem}
        `
        );
      }

      // @ts-ignore: html types only support Element but we use a DocumentFragment here
      html$1.bind(span)`${contents}`;
      dd.appendChild(span);
      return dd;
    }

    function getExtra(extra) {
      const span = html$1`
      <span class="${extra.class || null}"></span>
    `;
      let textContainer = span;
      if (extra.href) {
        textContainer = html$1`
        <a href="${extra.href}"></a>
      `;
        span.appendChild(textContainer);
      }
      textContainer.textContent = extra.name;
      return span;
    }
  };

  // @ts-check

  const localizationStrings$4 = {
    en: {
      author: "Author:",
      authors: "Authors:",
      editor: "Editor:",
      editors: "Editors:",
      former_editor: "Former editor:",
      former_editors: "Former editors:",
      latest_editors_draft: "Latest editor's draft:",
      latest_published_version: "Latest published version:",
      this_version: "This version:",
    },
    ko: {
      author: "저자:",
      authors: "저자:",
      editor: "편집자:",
      editors: "편집자:",
      former_editor: "이전 편집자:",
      former_editors: "이전 편집자:",
      latest_editors_draft: "최신 편집 초안:",
      latest_published_version: "최신 버전:",
      this_version: "현재 버전:",
    },
    zh: {
      editor: "编辑：",
      editors: "编辑：",
      former_editor: "原编辑：",
      former_editors: "原编辑：",
      latest_editors_draft: "最新编辑草稿：",
      latest_published_version: "最新发布版本：",
      this_version: "本版本：",
    },
    ja: {
      author: "著者：",
      authors: "著者：",
      editor: "編者：",
      editors: "編者：",
      former_editor: "以前の版の編者：",
      former_editors: "以前の版の編者：",
      latest_editors_draft: "最新の編集用草案：",
      latest_published_version: "最新バージョン：",
      this_version: "このバージョン：",
    },
    nl: {
      author: "Auteur:",
      authors: "Auteurs:",
      editor: "Redacteur:",
      editors: "Redacteurs:",
      latest_editors_draft: "Laatste werkversie:",
      latest_published_version: "Laatst gepubliceerde versie:",
      this_version: "Deze versie:",
    },
    es: {
      author: "Autor:",
      authors: "Autores:",
      editor: "Editor:",
      editors: "Editores:",
      latest_editors_draft: "Borrador de editor mas reciente:",
      latest_published_version: "Versión publicada mas reciente:",
      this_version: "Ésta versión:",
    },
  };

  const l10n$6 = getIntlData(localizationStrings$4);

  const ccLicense = "https://creativecommons.org/licenses/by/3.0/";

  function getSpecTitleElem(conf) {
    const specTitleElem =
      document.querySelector("h1#title") || document.createElement("h1");
    if (specTitleElem.parentElement) {
      specTitleElem.remove();
    } else {
      specTitleElem.textContent = conf.title;
      specTitleElem.id = "title";
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
    return html$1`
    <div class="head">
      <div id="respec-banner">
        <span id="respec-banner-status">${conf.maturity}</span>&nbsp;&mdash;&nbsp;
        <span id="respec-banner-spec-name">${conf.title}</span>
      </div>
      ${conf.logos.map(showLogo)} ${getSpecTitleElem(conf)}
      ${getSpecSubTitleElem(conf)}
      <h2>
        ${conf.prependPCISIG ? "PCI-SIG " : ""}${conf.textStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${!conf.isNoTrack
          ? html$1`
              <dt>${l10n$6.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
              <dt>${l10n$6.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion
                  ? html$1`
                      <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                    `
                  : "none"}
              </dd>
            `
          : ""}
        ${conf.edDraftURI
          ? html$1`
              <dt>${l10n$6.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.testSuiteURI
          ? html$1`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? html$1`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.bugTrackerHTML
          ? html$1`
              <dt>${l10n$6.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            `
          : ""}
        ${conf.isED && conf.prevED
          ? html$1`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            `
          : ""}
        ${conf.showPreviousVersion
          ? html$1`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.prevRecURI
          ? ""
          : conf.isRec
          ? html$1`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `
          : html$1`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        <dt>${conf.multipleEditors ? l10n$6.editors : l10n$6.editor}</dt>
        ${showPeople(conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? html$1`
              <dt>
                ${conf.multipleFormerEditors
                  ? l10n$6.former_editors
                  : l10n$6.former_editor}
              </dt>
              ${showPeople(conf.formerEditors)}
            `
          : ""}
        ${conf.authors
          ? html$1`
              <dt>
                ${conf.multipleAuthors ? l10n$6.authors : l10n$6.author}
              </dt>
              ${showPeople(conf.authors)}
            `
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
      ${conf.errata
        ? html$1`
            <p>
              Please check the
              <a href="${conf.errata}"><strong>errata</strong></a> for any
              errors or issues reported since publication.
            </p>
          `
        : ""}
      ${conf.alternateFormats
        ? html$1`
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
    return html$1`
    <a rel="license" href="${url}" class="${cssClass}">${text}</a>
  `;
  }

  function renderCopyright(conf) {
    return conf.isUnofficial
      ? conf.additionalCopyrightHolders
        ? html$1`
          <p class="copyright">${[conf.additionalCopyrightHolders]}</p>
        `
        : conf.overrideCopyright
        ? [conf.overrideCopyright]
        : html$1`
          <p class="copyright">
            This document is licensed under a
            ${linkLicense(
              "Creative Commons Attribution 3.0 License",
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
    return html$1`
    <p class="copyright">
      Copyright&copy;
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      <a href="http://www.pcisig.com">PCI-SIG</a>
      ${conf.additionalCopyrightHolders
        ? html$1`
            &amp; ${[conf.additionalCopyrightHolders]}
          `
        : ""}
    </p>
    <dl class="copyright">
      <dt>Web Site</dt>
      <dd><a href="http://www.pcisig.com">http://www.pcisig.com</a></dd>
      <dt>Membership Services</dt>
      <dd>
        <a href="mailto:administration@pcisig.com">administration@pcisig.com</a>
      </dd>
      <dd><a href="tel:+1-503-619-0569">+1.503.619.0569</a> (Phone)</dd>
      <dd><a href="tel:+1-503-644-6708">+1.503.644.6708</a> (Fax)</dd>
      <dt>Technical Support</dt>
      <dd><a href="mailto:techsupp@pcisig.com">techsupp@pcisig.com</a></dd>
    </dl>
    <p class="copyright">
      PCI-SIG disclaims all warranties and liability for the use of this
      document and the information contained herein and assumes no
      responsibility for any errors that may appear in this document, nor does
      PCI-SIG make a commitment to update the information contained herein.
    </p>
    <p class="copyright">
      This PCI Specification is provided “as is” without any warranties of any
      kind, including any warranty of merchantability, non-infringement, fitness
      for any particular purpose, or any warranty otherwise arising out of any
      proposal, specification, or sample. PCI-SIG disclaims all liability for
      infringement of proprietary rights, relating to use of information in this
      specification. This document itself may not be modified in any way,
      including by removing the copyright notice or references to PCI-SIG. No
      license, express or implied, by estoppel or otherwise, to any intellectual
      property rights is granted herein. PCI, PCI Express, PCIe, and PCI-SIG are
      trademarks or registered trademarks of PCI-SIG. All other product names
      are trademarks, registered trademarks, or servicemarks of their respective
      owners.
    </p>
  `;
  }

  // @ts-check

  var sotdTmpl = (conf, opts) => {
    return html$1`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview ? renderPreview(conf) : ""}
    ${conf.isUnofficial
      ? renderIsUnofficial(opts)
      : conf.isTagFinding
      ? opts.additionalContent
      : conf.isNoTrack
      ? renderIsNoTrack(conf, opts)
      : html$1`
          <p><em>${[conf.l10n.status_at_publication]}</em></p>
          ${conf.isSubmission
            ? noteForSubmission(conf, opts)
            : html$1`
                ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${!conf.overrideStatus
                  ? html$1`
                      ${linkToWorkingGroup(conf)} ${linkToCommunity(conf, opts)}
                      ${conf.isCR || conf.isPER || conf.isPR
                        ? html$1`
                            <p>
                              ${conf.isCR
                                ? `
                  PCI-SIG publishes a Candidate Recommendation to indicate that the document is believed to be
                  stable and to encourage implementation by the developer community. This Candidate
                  Recommendation is expected to advance to Proposed Recommendation no earlier than
                  ${conf.humanCREnd}.
                `
                                : ""}
                              ${conf.isPER
                                ? html$1`
                                    PCI-SIG Advisory Committee Members are
                                    invited to send formal review comments on
                                    this Proposed Edited Recommendation to the
                                    PCI-SIG Team until ${conf.humanPEREnd}.
                                    Members of the Advisory Committee will find
                                    the appropriate review form for this
                                    document by consulting their list of current
                                    <a
                                      href="https://www.pcisig.com/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >.
                                  `
                                : ""}
                              ${conf.isPR
                                ? html$1`
                                    The PCI-SIG Membership and other interested
                                    parties are invited to review the document
                                    and send comments to
                                    <a
                                      rel="discussion"
                                      href="${opts.mailToWGPublicList}"
                                      >${conf.wgPublicList}@pcisig.com</a
                                    >
                                    (<a
                                      href="${opts.mailToWGPublicListSubscription}"
                                      >subscribe</a
                                    >,
                                    <a
                                      href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
                                      >archives</a
                                    >) through ${conf.humanPREnd}. Advisory
                                    Committee Representatives should consult
                                    their
                                    <a
                                      href="https://www.pcisig.com/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >. Note that substantive technical comments
                                    were expected during the Candidate
                                    Recommendation review period that ended
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
                <p>
                  This document is governed by the
                  <a
                    id="pcisig_process_revision"
                    href="https://members.pcisig.com/wg/PCI-SIG/document/previewpdf/1107"
                    >PCI-SIG Specification Development Procedures 08/08/2017</a
                  >.
                </p>
                ${conf.addPatentNote
                  ? html$1`
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
    return html$1`
    <details class="annoying-warning" open="">
      <summary
        >This is a
        preview${prUrl && prNumber
          ? html$1`
              of pull request
              <a href="${prUrl}">#${prNumber}</a>
            `
          : ""}</summary
      >
      <p>
        Do not attempt to implement this version of the specification. Do not
        reference this version as authoritative in any way.
        ${edDraftURI
          ? html$1`
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
    return html$1`
    <p>
      This document is draft of a potential specification. It has no official
      standing of any kind and does not represent the support or consensus of
      any standards organization.
    </p>
    ${additionalContent}
  `;
  }

  function renderIsNoTrack(conf, opts) {
    const { isMO } = conf;
    const { additionalContent } = opts;
    return html$1`
    <p>
      This document is merely a PCI-SIG-internal
      ${isMO ? "member-confidential" : ""} document. It has no official standing
      of any kind and does not represent consensus of the PCI-SIG Membership.
    </p>
    ${additionalContent}
  `;
  }

  function renderImplementationReportURI(conf) {
    const { implementationReportURI } = conf;
    return html$1`
    <p>
      Please see the Working Group's
      <a href="${implementationReportURI}">implementation report</a>.
    </p>
  `;
  }

  function renderNotRec(conf) {
    const { anOrA, textStatus } = conf;
    return html$1`
    <p>
      Publication as ${anOrA} ${textStatus} does not imply endorsement by the
      PCI-SIG Membership. This is a draft document and may be updated, replaced
      or obsoleted by other documents at any time. It is inappropriate to cite
      this document as other than work in progress.
    </p>
  `;
  }

  function noteForSubmission(conf, opts) {
    return html$1`
    ${opts.additionalContent}
    ${conf.isMemberSubmission
      ? noteForMemberSubmission(conf)
      : conf.isTeamSubmission
      ? noteForTeamSubmission(conf, opts)
      : ""}
  `;
  }

  function noteForMemberSubmission(conf) {
    const teamComment = `https://www.pcisig.com/Submission/${conf.publishDate.getUTCFullYear()}/${
    conf.submissionCommentNumber
  }/Comment/`;
    return html$1`
    <p>
      By publishing this document, PCI-SIG acknowledges that the
      <a href="${conf.thisVersion}">Submitting Members</a> have made a formal
      Submission request to PCI-SIG for discussion. Publication of this document
      by PCI-SIG indicates no endorsement of its content by PCI-SIG, nor that
      PCI-SIG has, is, or will be allocating any resources to the issues
      addressed by it. This document is not the product of a chartered PCI-SIG
      group, but is published as potential input to the
      <a href="https://www.pcisig.com/Consortium/Process">PCI-SIG Process</a>. A
      <a href="${teamComment}">PCI-SIG Team Comment</a> has been published in
      conjunction with this Member Submission. Publication of acknowledged
      Member Submissions at the PCI-SIG site is one of the benefits of
      <a href="https://www.pcisig.com/Consortium/Prospectus/Joining">
        PCI-SIG Membership</a
      >. Please consult the requirements associated with Member Submissions of
      <a href="https://www.pcisig.com/Consortium/Patent-Policy/#sec-submissions"
        >section 3.3 of the PCI-SIG Patent Policy</a
      >. Please consult the complete
      <a href="https://www.pcisig.com/Submission"
        >list of acknowledged PCI-SIG Member Submissions</a
      >.
    </p>
  `;
  }

  function noteForTeamSubmission(conf, opts) {
    return html$1`
    <p>
      If you wish to make comments regarding this document, please send them to
      <a href="${opts.mailToWGPublicListWithSubject}"
        >${conf.wgPublicList}@pcisig.com</a
      >
      (<a href="${opts.mailToWGPublicListSubscription}">subscribe</a>,
      <a
        href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
        >archives</a
      >)${conf.subjectPrefix
        ? html$1`
            with <code>${conf.subjectPrefix}</code> at the start of your email's
            subject
          `
        : ""}.
    </p>
    <p>
      Please consult the complete
      <a href="https://www.pcisig.com/TeamSubmission/"
        >list of Team Submissions</a
      >.
    </p>
  `;
  }

  function linkToWorkingGroup(conf) {
    if (!conf.wg) {
      return;
    }
    return html$1`
    <p>
      This document was published by ${[conf.wgHTML]} as ${conf.anOrA}
      ${conf.longStatus}.
      ${conf.notYetRec
        ? "This document is intended to become a PCI-SIG Recommendation."
        : ""}
    </p>
  `;
  }

  function linkToCommunity(conf, opts) {
    if (!conf.github && !conf.wgPublicList) {
      return;
    }
    return html$1`
    <p>
      ${conf.github
        ? html$1`
            <a href="${conf.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `
        : ""}
      ${conf.wgPublicList
        ? html$1`
            ${conf.github && conf.wgPublicList
              ? "Alternatively, you can send comments to our mailing list."
              : "Comments regarding this document are welcome."}
            Please send them to
            <a href="${opts.mailToWGPublicListWithSubject}"
              >${conf.wgPublicList}@pcisig.com</a
            >
            (<a
              href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
              >archives</a
            >)${conf.subjectPrefix
              ? html$1`
                  with <code>${conf.subjectPrefix}</code> at the start of your
                  email's subject
                `
              : ""}.
          `
        : ""}
    </p>
  `;
  }

  /*
  <h2>{{l10n.sotd}}</h2>
  {{#if isPreview}}
    <details class="annoying-warning" open="">
      <summary>This is a preview</summary>
      <p>
        Do not attempt to implement this version of the specification. Do not reference this
        version as authoritative in any way.
      </p>
    </details>
  {{/if}}
  {{#if isUnofficial}}
    <p>
      This document is draft of a potential specification. It has no official standing of
      any kind and does not represent the support or consensus of any standards organisation.
    </p>
    {{{additionalContent}}}
  {{else}}
    {{#if isNoTrack}}
      <p>
        This document is a PCISIG internal document. It has no official standing of any kind and does not represent
        consensus of the PCISIG Membership.
      </p>
      {{{additionalContent}}}
    {{else}}
      {{#unless overrideStatus}}
        {{#if isFinal}}
          <p>
            This specification is an official publication of the PCISIG. The PCISIG
            may publish errata to this specification and may develop future revisions to this
            specification.
          </p>
        {{else}}
          <p>
            This specification is intended to become a PCISIG Standard.
            This particular document is a <strong>{{specStatusLong}}</strong>
            {{#if specLevelLong}}
              of the <strong>{{specLevelLong}}</strong> document
              {{#if specReviewLong}}
                for <strong>{{specReviewLong}}</strong>
              {{/if}}
            {{/if}}.
            {{#if specReviewLong}}
              {{#if humanReviewEndDate}}
                The {{specReviewLong}} period ends 5:00 PM US Pacific Time on <b>{{humanReviewEndDate}}</b>.
              {{/if}}
            {{/if}}
          </p>
          {{#if is09}}
            <p>PCISIG publishes a 0.9 maturity level specification to indicate that the document is believed to be
              stable and to encourage implementation by the developer community.</p>
          {{/if}}
          {{#if is07}}
            <p>
              PCISIG publishes a 0.7 maturity level specification to indicate that the ...
            </p>
          {{/if}}
          {{#if is05}}
            <p>PCISIG publishes a 0.5 maturity level specification to indicate that the ...</p>
          {{/if}}
          {{#if is03}}
            <p>PCISIG publishes a 0.3 maturity level specification to indicate that the ...</p>
          {{/if}}
        {{/if}}
      {{/unless}}
    {{/if}}
    {{#if isSubmission}}
      {{{additionalContent}}}
      <p>PCISIG acknowledges that the Submitting Member have made a formal Submission request to PCISIG for
        discussion. Publication of this document by PCISIG indicates no endorsement of its content by PCISIG, nor that
        PCISIG has, is, or will be allocating any resources to the issues addressed by it. This document is not the
        product of a chartered PCISIG Workgroup. </p>
    {{else}}
      {{#unless sotdAfterWGinfo}}
        {{{additionalContent}}}
      {{/unless}}
      {{#if notRec}}
        <p>
          Publication as {{anOrA}} {{textStatus}} does not imply endorsement by the PCISIG. This is a draft document and
          may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document
          as other than work in progress.
        </p>
      {{/if}}
      {{#if addPatentNote}}<p>{{{addPatentNote}}}</p>{{/if}}
    {{/if}}
  {{/if}}
  {{{additionalSections}}}
   */

  // @ts-check

  const name$o = "pcisig/pcisig-headers";

  const PCISIGDate = new Intl.DateTimeFormat(["en-AU"], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const status2rdf = {
    "WG-NOTE": "pcisigp:NOTE",
    "WG-DRAFT-NOTE": "pcisigp:NOTE",
    "PUB-NOTE": "pcisigp:NOTE",
    "PUB-DRAFT-NOTE": "pcisigp:NOTE",
    ED: "pcisigp:ED",
    "ED-CWG": "pcisigp:ED",
    "ED-MEM": "pcisigp:ED",
    "ED-FINAL": "pcisigp:ED",
    WD: "pcisigp:WD",
    "WD-CWG": "pcisigp:WD",
    "WD-MEM": "pcisigp:WD",
    "WD-FINAL": "pcisigp:WD",
    RC: "pcisigp:RC",
    "RC-CWG": "pcisigp:RC",
    "RC-MEM": "pcisigp:RC",
    "RC-FINAL": "pcisigp:RC",
    PUB: "pcisigp:CWG",
    "PUB-CWG": "pcisigp:CWG",
    "PUB-MEM": "pcisigp:MEM",
    "PUB-FINAL": "pcisigp:FINAL",
    FINAL: "pcisigp:FINAL",

    RESCINDED: "pcisigp:RESCINDED",
    REPLACED: "pcisigp:REPLACED",
    PRIVATE: "pcisigp:PRIVATE",
  };
  const status2text = {
    "WG-DRAFT-NOTE": "Draft Working Group Note",
    "WG-NOTE": "Working Group Note",
    "PUB-DRAFT-NOTE": "Published Draft Note",
    "PUB-NOTE": "Published Note",
    "member-private": "Member Private Document",
    "member-submission": "Member Submission",
    "team-private": "Team Private Document",
    "team-submission": "Team Submission",

    ED: "Editor's Draft",
    "ED-CWG": "Editor's Draft",
    "ED-MEM": "Editor's Draft",
    "ED-FINAL": "Editor's Draft",

    WD: "Working Draft",
    "WD-CWG": "Working Draft",
    "WD-MEM": "Working Draft",
    "WD-FINAL": "Working Draft",

    RC: "Release Candidate",
    "RC-CWG": "Release Candidate",
    "RC-MEM": "Release Candidate",
    "RC-FINAL": "Release Candidate",

    PUB: "Draft Spec.",
    "PUB-CWG": "Draft Spec.",
    "PUB-MEM": "Draft Spec.",
    "PUB-FINAL": "Final Spec.",
    FINAL: "Final Spec.",

    RESCINDED: "Specification Rescinded",
    REPLACED: "Specification Replaced",
    PRIVATE: "Private Document",
    unofficial: "Unofficial Document",
    base: "Document",
  };
  const status2long = {
    WD: "Unpublished Working Draft",
    ED: "Unpublished Editor's Draft",
    RC: "Unpublished Release Candidate",
    PUB: "Published Specification",
    "WD-CWG": "Unpublished Cross Workgroup Review Working Draft",
    "ED-CWG": "Unpublished Cross Workgroup Review Editor's Draft",
    "RC-CWG": "Unpublished Cross Workgroup Review Release Candidate",
    "PUB-CWG": "Published Cross Workgroup Review Draft",
    "WD-MEM": "Unpublished Member Review Working Draft",
    "ED-MEM": "Unpublished Member Review Editor's Draft",
    "RC-MEM": "Unpublished Member Review Release Candidate",
    "RC-FINAL": "Unpublished Final Release Candidate",
    "WD-FINAL": "Unpublished Final Working Draft",
    "ED-FINAL": "Unpublished Final Editor's Draft",
    "PUB-MEM": "Published Member Review Draft",
    FINAL: "Published Final Specification",
  };
  const specTrackStatus = [
    "WD",
    "ED",
    "RC",
    "PUB",
    "FINAL",
    "WD-CWG",
    "ED-CWG",
    "RC-CWG",
    "PUB-CWG",
    "WD-MEM",
    "ED-MEM",
    "RC-MEM",
    "PUB-MEM",
    "WD-FINAL",
    "ED-FINAL",
    "RC-FINAL",
    "PUB-FINAL",
  ];

  // Chapters are never published standalone. if conf.specChapter is present,
  // this map is used to convert "final" specStatus values to equivalent "RC" values.
  const specFinal2Draft = {
    WD: "WD",
    ED: "ED",
    RC: "RC",
    PUB: "RC",
    FINAL: "RC",
    "WD-CWG": "WD-CWG",
    "ED-CWG": "ED-CWG",
    "RC-CWG": "RC-CWG",
    "PUB-CWG": "RC-CWG",
    "WD-MEM": "WD-MEM",
    "ED-MEM": "ED-MEM",
    "RC-MEM": "RC-MEM",
    "PUB-MEM": "RC-MEM",
    "WD-FINAL": "WD-FINAL",
    "ED-FINAL": "ED-FINAL",
    "RC-FINAL": "RC-FINAL",
    "PUB-FINAL": "RC-FINAL",
  };

  const noTrackStatus = [
    "unofficial",
    "private",
    "base",
    "note",
    "draft-note",
    "member-private",
    "member-submission",
    "team-private",
    "team-submission",
  ];

  // specStatus values that should grammatically be preceded by an instead of a.
  const precededByAn = ["ED", "ED-CWG", "ED-MEM", "ED-FINAL", "unofficial"];

  const licenses = {
    "pcisig-draft": {
      name: "PCISIG Specification License",
      short: "PCISIG Spec",
      url:
        "https://sglaser.github.io/respec/Spec/Legal/2017/copyright-draft-specification",
    },
    "pcisig-final": {
      name: "PCISIG Specification License",
      short: "PCISIG Spec",
      url:
        "https://sglaser.github.io/respec/Spec/Legal/2017/copyright-final-specification",
    },
    "pcisig-note": {
      name: "PCISIG Note, Whitepaper, or Presentation License",
      short: "PCISIG Spec",
      url: "https://sglaser.github.io/respec/Spec/Legal/2017/copyright-note",
    },
    nda: {
      name: "PCISIG Document under Non-Disclosure Agreement",
      short: "PCISIG NDA",
      url: "https://sglaser.github.io/respec/Spec/Legal/2017/copyright-nda",
    },
    "cc-by": {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
    cc0: {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
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
      `[\`${prop}\`](https://github.com/pcisig/respec/wiki/${prop}) ` +
      `is not a valid date: "${conf[prop]}". Expected format 'YYYY-MM-DD'.`;
    pub("error", msg);
    return new Date(ISODate.format(new Date()));
  }

  function run$b(conf) {
    conf.isUnofficial = conf.specStatus === "unofficial";
    if (conf.isUnofficial && !Array.isArray(conf.logos)) {
      conf.logos = [];
    }

    if (
      conf.specStatus &&
      conf.specChapter &&
      specFinal2Draft.hasOwnProperty(conf.specStatus)
    ) {
      conf.specStatus = specFinal2Draft[conf.specStatus];
    }
    // Default include RDFa document metadata
    if (conf.doRDFa === undefined) conf.doRDFa = true;
    // validate configuration and derive new configuration values
    if (!conf.license) {
      conf.license = "pcisig-draft";
    }
    if (["cc0", "cc-by"].includes(conf.license)) {
      let msg = `You cannot use license "${conf.license}" with PCISIG Specs. `;
      const non_cc0 = licenses.keys
        .remove("cc0")
        .remove("cc-by")
        .toString();
      msg += `Please set 'respecConfig.license:' to one of ${non_cc0} instead.`;
      pub("error", msg);
    }
    conf.licenseInfo = licenses[conf.license];
    if (["final"].includes(conf.license)) {
      if (conf.specChapter) {
        conf.license = conf.license.sub("final", "draft");
      }
    }
    conf.isBasic = conf.specStatus === "base";
    conf.isRegular = !conf.isBasic;
    if (!conf.specStatus) {
      pub("error", "Missing required configuration: `specStatus`");
    }
    if (conf.isRegular && !conf.shortName) {
      pub("error", "Missing required configuration: `shortName`");
    }
    conf.title = document.title || "No Title";
    if (!conf.subtitle) conf.subtitle = "";
    conf.publishDate = validateDateAndRecover(
      conf,
      "publishDate",
      document.lastModified
    );
    conf.publishYear = conf.publishDate.getUTCFullYear();
    conf.publishHumanDate = PCISIGDate.format(conf.publishDate);
    conf.isNoTrack = noTrackStatus.includes(conf.specStatus) || conf.specChapter;
    conf.isSpecTrack = conf.noSpecTrack
      ? false
      : specTrackStatus.includes(conf.specStatus);
    if (conf.isSpecTrack && !conf.specRevision) {
      pub("error", "Missing required configuration: `specRevision`");
    }
    if (conf.isSpecTrack && !conf.specDraftLevel) {
      pub("error", "Missing required configuration: `specDraftLevel`");
    }
    conf.isMemberSubmission = conf.specStatus === "member-submission";
    conf.isSubmission = conf.isMemberSubmission || conf.isTeamSubmission;
    conf.anOrA = precededByAn.includes(conf.specStatus) ? "an" : "a";

    let temp = [];
    if (conf.specRevision) {
      temp.push(conf.specRevision);
    }
    if (conf.specDraftLevel) {
      temp.push(conf.specDraftLevel);
    }
    if (conf.specStatus) {
      temp.push(conf.specStatus);
    }
    if (conf.specChapter) {
      temp.push(conf.specChapter);
    }
    conf.maturity = temp.join("-");

    let publishSpace = "Spec/Published";
    if (conf.specStatus === "member-submission") publishSpace = "Spec/Submission";
    else if (conf.specStatus === "team-submission")
      publishSpace = "Spec/TeamSubmission";
    if (conf.isRegular)
      conf.thisVersion = `https://sglaser.github.io/respec/${publishSpace}/${conf.publishDate.getUTCFullYear()}/${
      conf.shortName
    }-${conf.maturity}-${concatDate(conf.publishDate)}/`;
    if (conf.isRegular)
      conf.latestVersion = `https://sglaser.github.io/respec/${publishSpace}/${conf.shortName}/`;

    if (conf.previousPublishDate) {
      if (!conf.previousStatus) {
        pub("error", "`previousPublishDate` is set, but not `previousStatus`.");
      }
      if (!conf.previousRevision) {
        pub("error", "`previousPublishDate` is set, but not `previousRevision`.");
      }
      if (!conf.previousDraftLevel) {
        pub(
          "error",
          "`previousPublishDate` is set, but not `previousDraftLevel`."
        );
      }

      conf.previousPublishDate = validateDateAndRecover(
        conf,
        "previousPublishDate"
      );

      temp = [];
      if (conf.previousRevision) {
        temp.push(conf.previousRevision);
      }
      if (conf.previousDraftLevel) {
        temp.push(conf.previousDraftLevel);
      }
      if (conf.previousStatus) {
        temp.push(conf.previousStatus);
      }
      const pmat = temp.join("-");

      if (conf.isBasic) {
        conf.prevVersion = "";
      } else {
        conf.prevVersion = `https://sglaser.github.io/respec/Spec/${conf.previousPublishDate.getUTCFullYear()}/${
        conf.shortName
      }-${pmat}-${concatDate(conf.previousPublishDate)}/`;
      }
    } else {
      if (
        !/NOTE$/.test(conf.specStatus) &&
        !conf.prevStatus === "none" &&
        !conf.noSpecTrack &&
        !conf.isNoTrack &&
        !conf.isSubmission
      )
        pub(
          "error",
          "Document on specification track but has no previous version:" +
            " Add `previousStatus`, `previousRevision`, `previousDraftLevel`, and `previousPublishDate` to ReSpec's config."
        );
      if (!conf.prevVersion) conf.prevVersion = "";
    }
    if (!conf.wg) {
      if (!conf.editors || conf.editors.length === 0)
        pub("error", "At least one editor is required");
    }

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
    (conf.alternateFormats || []).forEach((i, it) => {
      if (!it.uri || !it.label)
        pub("error", "All alternate formats must have a uri and a label.");
    });
    conf.multipleAlternates =
      conf.alternateFormats && conf.alternateFormats.length > 1;
    conf.alternatesHTML =
      conf.alternateFormats &&
      joinAnd(conf.alternateFormats, alt => {
        let optional =
          alt.hasOwnProperty("lang") && alt.lang ? `hreflang='${alt.lang}'` : "";
        optional +=
          alt.hasOwnProperty("type") && alt.type ? `type='${alt.type}'` : "";
        return `<a rel='alternate' href='${alt.uri}' ${optional}>${alt.label}</a>`;
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
    for (const k in status2text) {
      if (status2long[k]) continue;
      status2long[k] = status2text[k];
    }
    conf.longStatus = status2long[conf.specStatus];
    conf.textStatus = status2text[conf.specStatus];
    if (status2rdf[conf.specStatus]) {
      conf.rdfStatus = status2rdf[conf.specStatus];
    }
    conf.showThisVersion = !conf.isNoTrack;
    conf.showPreviousVersion =
      !conf.previousStatus === "none" && !conf.isNoTrack && !conf.isSubmission;
    if (conf.specStatus.endsWith("NOTE") && !conf.prevVersion)
      conf.showPreviousVersion = false;
    conf.notYetFinal =
      conf.isSpecTrack &&
      (conf.specStatus !== "FINAL" || conf.specStatus !== "PUB-FINAL");
    conf.isFinal =
      conf.isSpecTrack &&
      (conf.specStatus === "FINAL" || conf.specStatus === "PUB-FINAL");
    if (conf.isFinal && !conf.errata)
      pub("error", "Recommendations must have an errata link.");
    conf.isUnofficial = conf.specStatus === "unofficial";
    conf.prependPCISIG = !conf.isUnofficial;
    conf.isED =
      conf.specStatus === "ED" ||
      conf.specStatus === "ED-CWG" ||
      conf.specStatus === "ED-MEM" ||
      conf.specStatus === "ED-FINAL";
    conf.isWD =
      conf.specStatus === "WD" ||
      conf.specStatus === "WD-CWG" ||
      conf.specStatus === "WD-MEM" ||
      conf.specStatus === "WD-FINAL";
    conf.isRC =
      conf.specStatus === "RC" ||
      conf.specStatus === "RC-CWG" ||
      conf.specStatus === "RC-MEM" ||
      conf.specStatus === "RC-FINAL";
    conf.isPUB =
      conf.specStatus === "PUB" ||
      conf.specStatus === "PUB-CWG" ||
      conf.specStatus === "PUB-MEM";
    conf.dashDate = ISODate.format(conf.publishDate);
    conf.publishISODate = conf.publishDate.toISOString();
    conf.shortISODate = ISODate.format(conf.publishDate);
    // configuration done - yay!

    // NOTE:
    if (Array.isArray(conf.wg)) {
      conf.multipleWGs = conf.wg.length > 1;
      conf.wgHTML = joinAnd(conf.wg);
    } else {
      conf.multipleWGs = false;
      conf.wgHTML = conf.wg;
    }

    // insert into document
    const header = headersTmpl(conf);
    document.body.prepend(header);
    document.body.classList.add("h-entry");

    // handle SotD
    const sotd =
      document.getElementById("sotd") || document.createElement("section");
    if (!conf.isNoTrack && !sotd.id) {
      pub(
        "error",
        "A custom SotD paragraph is required for your type of document."
      );
    }
    sotd.id = sotd.id || "stod";
    sotd.classList.add("introductory");

    // invent toc if not already present
    if (!document.body.querySelector("#toc")) {
      document
        .querySelector("body")
        .prepend('<nav id="toc"><section class="introductory"></section></nav>');
    }

    // handle Revision History
    const revision_history =
      document.body.querySelector("#revision-history") ||
      document.createElement("section");
    if (!conf.isNoTrack && !revision_history.id) {
      pub(
        "error",
        "A Revision History section is required for your type of document."
      );
    }
    revision_history.id = revision_history.id || "revision-history";
    revision_history.classList.add("introductory");

    if (conf.specStatus === "PUB-CWG" && !conf.cwgReviewEnd) {
      pub(
        "error",
        `'specStatus' is "PUB-CWG" but no 'cwgReviewEnd' is specified (needed to indicate end of the Cross Workgroup Review).`
      );
    }
    conf.cwgReviewEnd = validateDateAndRecover(conf, "cwgReviewEnd");
    conf.humanCwgReviewEnd = PCISIGDate.format(conf.cwgReviewEnd);

    if (conf.specStatus === "PUB-MEM" && !conf.memReviewEnd) {
      pub(
        "error",
        `'specStatus' is "PUB-MEM", but no 'memReviewEnd' is specified (needed to indicate end of the Member Review).`
      );
    }
    conf.memReviewEnd = validateDateAndRecover(conf, "memReviewEnd");
    conf.humanMemReviewEnd = PCISIGDate.format(conf.memReviewEnd);

    html$1.bind(sotd)`${populateSoTD(conf, sotd)}`;

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
      ...collectSotdContent(sotd),

      get mailToWGPublicList() {
        return `mailto:${conf.wgPublicList}@pcisig.com`;
      },
      get mailToWGPublicListWithSubject() {
        const fragment = conf.subjectPrefix
          ? `?subject=${encodeURIComponent(conf.subjectPrefix)}`
          : "";
        return this.mailToWGPublicList + fragment;
      },
      get mailToWGPublicListSubscription() {
        return `mailto:${conf.wgPublicList}-request@pcisig.com?subject=subscribe`;
      },
    };
    const template = sotdTmpl;
    return template(conf, options);
  }

  /**
   * @param {HTMLElement} sotd
   */
  function collectSotdContent(sotd) {
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

  var pcisigHeaders = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$o,
    run: run$b
  });

  // @ts-check

  const name$p = "pcisig/footnotes";

  function run$c() {
    document.querySelectorAll("span.footnote").forEach((footnote, index) => {
      const id = addId(footnote, "footnote", `${index + 1}`);
      footnote.insertAdjacentHTML(
        "beforebegin",
        html$1`
        <label class="footnote-online">
          Footnote:
          <input
            class="footnote-checkbox"
            type="checkbox"
            name="${id}"
            value="checked"
        /></label>
      `
      );
      footnote.insertAdjacentHTML(
        "afterbegin",
        html$1`
        <span class="footnote-online"> [</span>
      `
      );
      footnote.insertAdjacentHTML(
        "beforeend",
        html$1`
        <span class="footnote-online">] </span>
      `
      );
    });
  }

  var footnotes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$p,
    run: run$c
  });

  // @ts-check

  const name$q = "pcisig/tablenotes";

  function run$d() {
    // console.log("in tablenotes");
    const tableid_to_notes_entries = new Map();
    //
    // find all tables that contain elements with index entries, go through them sequentially
    //
    const note_list = document.querySelectorAll("table span.tablenote");
    note_list.forEach(note => {
      // console.log(`tablenotes: note = ${note.outerHTML}`);
      const table = note.closest("table");
      if (table) {
        addId(table, "tbl");
        // console.log(`tablenotes: tf.closest("table") = ${table.id}`);
        if (!tableid_to_notes_entries.has(table.id)) {
          tableid_to_notes_entries.set(table.id, []);
          // console.log(
          //   `tablenotes: tableid_to_notes_entries.keys() = ${Array.from(
          //     tableid_to_notes_entries.keys()
          //   )}`
          // );
        }
        const ent = tableid_to_notes_entries.get(table.id);
        const str = note.innerHTML;
        // check to see if the entry is there already, if not add it
        const initial_note = ent.indexOf(str) < 0;
        if (initial_note) {
          ent.push(str);
        }
        const tfnum = ent.indexOf(str) + 1;
        // replace content of original element
        const tfid = `${table.id}_tablenote_${tfnum}`;
        note.innerHTML = `&nbsp;<a href="#li_${tfid}"><sup>[${tfnum}]</sup></a>`;
      } else {
        // should never happen since selector for note_list requires ancestor table element
        note.classList.add("respec-error");
      }
    });

    tableid_to_notes_entries.forEach((entries, tableid) => {
      // for each table that has tablenotes
      const table = document.getElementById(tableid);
      const tbody = document.createElement("tbody");
      tbody.classList.add("notes");
      tbody.innerHTML =
        '<tr><td colspan="1000"><b>Notes:</b><ol class="notes"></ol></td></tr>';
      const tfcontainer = tbody.querySelector("ol.notes");
      entries.forEach((entry, index) => {
        // for each unique note in that table
        const tfid = `${tableid}_tablenote_${index + 1}`;
        const li = document.createElement("li");
        // console.log(`tablenotes: add li for "${tfid}"`);
        li.id = `li_${tfid}`;
        li.classList.add("tablenote-li");
        const refs = table.querySelectorAll(`a[href="#${li.id}"]`);
        const alist = [];
        // console.log(`tablenotes: refs.length = ${refs.length}`);
        refs.forEach(a => {
          a.setAttribute("id", `a_${tfid}_${alist.length + 1}`);
          alist.push(`<a href="#${a.id}">&#8673;</a>&nbsp;`);
        });
        li.innerHTML = `${alist.join("")}${entry}`;
        tfcontainer.appendChild(li);
      });
      // console.log(`tablenotes: add notes tbody to "${table.id}"`);
      table.appendChild(tbody);
    });
  }

  var tablenotes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$q,
    run: run$d
  });

  // @ts-check

  const name$r = "core/data-transform";

  function run$e() {
    /** @type {NodeListOf<HTMLElement>} */
    const transformables = document.querySelectorAll("[data-transform]");
    transformables.forEach(el => {
      el.innerHTML = runTransforms(el.innerHTML, el.dataset.transform);
      el.removeAttribute("data-transform");
    });
  }

  var dataTransform = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$r,
    run: run$e
  });

  // @ts-check
  const name$s = "core/dfn-abbr";

  function run$f() {
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
    name: name$s,
    run: run$f
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
      return html$1`<a data-xref-type="_IDL_" data-link-type="idl"
      ><code>${identifier}</code></a
    >`;
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
    const element = html$1`${parent && renderParent ? "." : ""}<a
      data-xref-type="attribute"
      data-link-for=${linkFor}
      data-xref-for=${linkFor}
      data-lt="${lt}"
      ><code>[[${identifier}]]</code></a
    >`;
    return element;
  }

  /**
   * Attribute: .identifier
   * @param {IdlAttribute} details
   */
  function renderAttribute(details) {
    const { parent, identifier, renderParent } = details;
    const { identifier: linkFor } = parent || {};
    const element = html$1`${renderParent ? "." : ""}<a
      data-link-type="idl"
      data-xref-type="attribute|dict-member"
      data-link-for="${linkFor}"
      data-xref-for="${linkFor}"
      ><code>${identifier}</code></a
    >`;
    return element;
  }

  /**
   * Method: .identifier(arg1, arg2, ...), identifier(arg1, arg2, ...)
   * @param {IdlMethod} details
   */
  function renderMethod(details) {
    const { args, identifier, type, parent, renderParent } = details;
    const { identifier: linkFor } = parent || {};
    const argsText = htmlJoinComma(args, arg => html$1`<var>${arg}</var>`);
    const searchText = `${identifier}(${args.join(", ")})`;
    const element = html$1`${parent && renderParent ? "." : ""}<a
      data-link-type="idl"
      data-xref-type="${type}"
      data-link-for="${linkFor}"
      data-xref-for="${linkFor}"
      data-lt="${searchText}"
      ><code>${identifier}</code></a
    ><code>(${argsText})</code>`;
    return element;
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
    const element = html$1`"<a
      data-link-type="idl"
      data-xref-type="enum-value"
      data-link-for="${forContext}"
      data-xref-for="${forContext}"
      data-lt="${!enumValue ? "the-empty-string" : null}"
      ><code>${enumValue}</code></a
    >"`;
    return element;
  }

  /**
   * Exception value: "NotAllowedError"
   * Only the WebIDL spec can define exceptions
   * @param {IdlException} details
   */
  function renderException(details) {
    const { identifier } = details;
    const element = html$1`"<a
      data-link-type="idl"
      data-cite="WebIDL"
      data-xref-type="exception"
      ><code>${identifier}</code></a
    >"`;
    return element;
  }

  /**
   * Interface types: {{ unrestricted double }} {{long long}}
   * Only the WebIDL spec defines these types.
   * @param {IdlPrimitive} details
   */
  function renderIdlPrimitiveType(details) {
    const { identifier } = details;
    const element = html$1`<a
    data-link-type="idl"
    data-cite="WebIDL"
    data-xref-type="interface"
    ><code>${identifier}</code></a
  >`;
    return element;
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
      const el = html$1`<span>{{ ${str} }}</span>`;
      showInlineError(el, error.message, "Error: Invalid inline IDL string");
      return el;
    }
    const render = html$1(document.createDocumentFragment());
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
    const result = render`${output}`;
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
      const aliasesAndRefs = { alias: [], reference: [] };
      for (const id of Object.keys(data)) {
        const obj = { id, ...data[id] };
        if (obj.aliasOf) {
          aliasesAndRefs.alias.push(obj);
        } else {
          aliasesAndRefs.reference.push(obj);
        }
      }
      const promisesToAdd = [...ALLOWED_TYPES].flatMap(type => {
        return aliasesAndRefs[type].map(details => this.add(type, details));
      });
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

  /** @type {Conf['biblio']} */
  const biblio = {};

  const name$t = "core/biblio";

  const bibrefsURL = new URL("https://specref.herokuapp.com/bibrefs?refs=");

  // Opportunistically dns-prefetch to bibref server, as we don't know yet
  // if we will actually need to download references yet.
  const link = createResourceHint({
    hint: "dns-prefetch",
    href: bibrefsURL.origin,
  });
  document.head.appendChild(link);
  let doneResolver$2;

  /** @type {Promise<Conf['biblio']>} */
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
    /** @type {Conf['biblio']} */
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
   * @returns {Promise<BiblioData>}
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

  /**
   * @param {string[]} neededRefs
   */
  async function getReferencesFromIdb(neededRefs) {
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

    return idbRefs;
  }

  class Plugin {
    /** @param {Conf} conf */
    constructor(conf) {
      this.conf = conf;
    }

    /**
     * Normative references take precedence over informative ones,
     * so any duplicates ones are removed from the informative set.
     */
    normalizeReferences() {
      const normalizedNormativeRefs = new Set(
        [...this.conf.normativeReferences].map(key => key.toLowerCase())
      );
      Array.from(this.conf.informativeReferences)
        .filter(key => normalizedNormativeRefs.has(key.toLowerCase()))
        .forEach(redundantKey =>
          this.conf.informativeReferences.delete(redundantKey)
        );
    }

    getRefKeys() {
      return {
        informativeReferences: Array.from(this.conf.informativeReferences),
        normativeReferences: Array.from(this.conf.normativeReferences),
      };
    }

    async run() {
      const finish = () => {
        doneResolver$2(this.conf.biblio);
      };
      if (!this.conf.localBiblio) {
        this.conf.localBiblio = {};
      }
      this.conf.biblio = biblio;
      const localAliases = Object.keys(this.conf.localBiblio)
        .filter(key => this.conf.localBiblio[key].hasOwnProperty("aliasOf"))
        .map(key => this.conf.localBiblio[key].aliasOf)
        .filter(key => !this.conf.localBiblio.hasOwnProperty(key));
      this.normalizeReferences();
      const allRefs = this.getRefKeys();
      const neededRefs = Array.from(
        new Set(
          allRefs.normativeReferences
            .concat(allRefs.informativeReferences)
            // Filter, as to not go to network for local refs
            .filter(key => !this.conf.localBiblio.hasOwnProperty(key))
            // but include local aliases which refer to external specs
            .concat(localAliases)
            .sort()
        )
      );
      const idbRefs = await getReferencesFromIdb(neededRefs);
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
      Object.assign(biblio, this.conf.localBiblio);
      finish();
    }
  }

  var biblio$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    biblio: biblio,
    name: name$t,
    updateFromNetwork: updateFromNetwork,
    resolveRef: resolveRef,
    Plugin: Plugin,
    wireReference: wireReference,
    stringifyReference: stringifyReference
  });

  // @ts-check

  const name$u = "core/render-biblio";

  const localizationStrings$5 = {
    en: {
      info_references: "Informative references",
      norm_references: "Normative references",
      references: "References",
    },
    ko: {
      references: "참조",
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
    ja: {
      info_references: "参照用参考文献",
      norm_references: "規範的参考文献",
      references: "参考文献",
    },
    de: {
      info_references: "Weiterführende Informationen",
      norm_references: "Normen und Spezifikationen",
      references: "Referenzen",
    },
    zh: {
      info_references: "非规范性引用",
      norm_references: "规范性引用",
      references: "参考文献",
    },
  };

  const l10n$7 = getIntlData(localizationStrings$5);

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

  /** @param {Conf} conf */
  function run$g(conf) {
    const informs = Array.from(conf.informativeReferences);
    const norms = Array.from(conf.normativeReferences);

    if (!informs.length && !norms.length) return;

    /** @type {HTMLElement} */
    const refSection =
      document.querySelector("section#references") ||
      html$1`<section id="references"></section>`;

    if (!document.querySelector("section#references > h2")) {
      refSection.prepend(html$1`<h2>${l10n$7.references}</h2>`);
    }

    refSection.classList.add("appendix");

    if (norms.length) {
      const sec = createReferencesSection(norms, l10n$7.norm_references);
      refSection.appendChild(sec);
    }
    if (informs.length) {
      const sec = createReferencesSection(informs, l10n$7.info_references);
      refSection.appendChild(sec);
    }

    document.body.appendChild(refSection);
  }

  /**
   * @param {string[]} refs
   * @param {string} title
   * @returns {HTMLElement}
   */
  function createReferencesSection(refs, title) {
    const { goodRefs, badRefs } = groupRefs(refs.map(toRefContent));
    const uniqueRefs = getUniqueRefs(goodRefs);

    const refsToShow = uniqueRefs
      .concat(badRefs)
      .sort((a, b) =>
        a.ref.toLocaleLowerCase().localeCompare(b.ref.toLocaleLowerCase())
      );

    const sec = html$1`<section>
    <h3>${title}</h3>
    <dl class="bibliography">${refsToShow.map(showRef)}</dl>
  </section>`;
    addId(sec, "", title);

    const aliases = getAliases(goodRefs);
    decorateInlineReference(uniqueRefs, aliases);
    warnBadRefs(badRefs);

    return sec;
  }

  /**
   * returns refcontent and unique key for a reference among its aliases
   * and warns about circular references
   * @param {String} ref
   * @typedef {ReturnType<typeof toRefContent>} Ref
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

  /** @param {Ref[]} refs */
  function groupRefs(refs) {
    const goodRefs = [];
    const badRefs = [];
    for (const ref of refs) {
      if (ref.refcontent) {
        goodRefs.push(ref);
      } else {
        badRefs.push(ref);
      }
    }
    return { goodRefs, badRefs };
  }

  /** @param {Ref[]} refs */
  function getUniqueRefs(refs) {
    /** @type {Map<string, Ref>} */
    const uniqueRefs = new Map();
    for (const ref of refs) {
      if (!uniqueRefs.has(ref.refcontent.id)) {
        // the condition ensures that only the first used [[TERM]]
        // shows up in #references section
        uniqueRefs.set(ref.refcontent.id, ref);
      }
    }
    return [...uniqueRefs.values()];
  }

  /**
   * Render an inline citation
   *
   * @param {String} ref the inline reference.
   * @param {String} [linkText] custom link text
   * @returns HTMLElement
   */
  function renderInlineCitation(ref, linkText) {
    const key = ref.replace(/^(!|\?)/, "");
    const href = `#bib-${key.toLowerCase()}`;
    const text = linkText || key;
    const elem = html$1`<cite
    ><a class="bibref" href="${href}" data-link-type="biblio">${text}</a></cite
  >`;
    return linkText ? elem : html$1`[${elem}]`;
  }

  /**
   * renders a reference
   * @param {Ref} ref
   */
  function showRef({ ref, refcontent }) {
    const refId = `bib-${ref.toLowerCase()}`;
    if (refcontent) {
      return html$1`
      <dt id="${refId}">[${ref}]</dt>
      <dd>${{ html: stringifyReference(refcontent) }}</dd>
    `;
    } else {
      return html$1`
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
    return html$1.wire(ref)`
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

  /** @param {BiblioData|string} ref */
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
    name: name$u,
    run: run$g,
    renderInlineCitation: renderInlineCitation,
    wireReference: wireReference,
    stringifyReference: stringifyReference
  });

  // @ts-check

  const name$v = "core/inlines";
  const rfc2119Usage = {};

  const localizationStrings$6 = {
    en: {
      rfc2119Keywords() {
        return new RegExp(
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
      },
    },
    de: {
      rfc2119Keywords() {
        return new RegExp(
          [
            "\\bMUSS\\b",
            "\\bERFORDERLICH\\b",
            "\\b(?:NICHT\\s+)?NÖTIG\\b",
            "\\bDARF(?:\\s+NICHT)?\\b",
            "\\bVERBOTEN\\b",
            "\\bSOLL(?:\\s+NICHT)?\\b",
            "\\b(?:NICHT\\s+)?EMPFOHLEN\\b",
            "\\bKANN\\b",
            "\\bOPTIONAL\\b",
          ].join("|")
        );
      },
    },
  };
  const l10n$8 = getIntlData(localizationStrings$6);

  // Inline `code`
  // TODO: Replace (?!`) at the end with (?:<!`) at the start when Firefox + Safari
  // add support.
  const inlineCodeRegExp = /(?:`[^`]+`)(?!`)/; // `code`
  const inlineIdlReference = /(?:{{[^}]+}})/; // {{ WebIDLThing }}
  const inlineVariable = /\B\|\w[\w\s]*(?:\s*:[\w\s&;<>]+)?\|\B/; // |var : Type|
  const inlineCitation = /(?:\[\[(?:!|\\|\?)?[\w.-]+(?:|[^\]]+)?\]\])/; // [[citation]]
  const inlineExpansion = /(?:\[\[\[(?:!|\\|\?)?#?[\w-.]+\]\]\])/; // [[[expand]]]
  const inlineAnchor = /(?:\[=[^=]+=\])/; // Inline [= For/link =]
  const inlineElement = /(?:\[\^[^^]+\^\])/; // Inline [^element^]

  /**
   * @example [^iframe^] // [^element^]
   * @example [^iframe/allow^] // [^element/element-attr^]
   * @param {string} matched
   * @return {HTMLElement}
   */
  function inlineElementMatches(matched) {
    const value = matched.slice(2, -2).trim();
    const [element, attribute] = value.split("/", 2).map(s => s && s.trim());
    const [xrefType, xrefFor, textContent] = attribute
      ? ["element-attr", element, attribute]
      : ["element", null, element];
    const code = html$1`<code
    ><a data-xref-type="${xrefType}" data-xref-for="${xrefFor}"
      >${textContent}</a
    ></code
  >`;
    return code;
  }

  /**
   * @param {string} matched
   * @return {HTMLElement}
   */
  function inlineRFC2119Matches(matched) {
    const value = norm(matched);
    const nodeElement = html$1`<em class="rfc2119">${value}</em>`;
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
      return html$1`<a data-cite="${ref}"></a>`;
    }
    if (document.querySelector(ref)) {
      return html$1`<a href="${ref}"></a>`;
    }
    const badReference = html$1`<span>${matched}</span>`;
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

    const [spec, linkText] = ref.split("|").map(norm);
    const { type, illegal } = refTypeFromContext(spec, txt.parentNode);
    const cite = renderInlineCitation(spec, linkText);
    const cleanRef = spec.replace(/^(!|\?)/, "");
    if (illegal && !conf.normativeReferences.has(cleanRef)) {
      const citeElem = cite.childNodes[1] || cite;
      showInlineWarning(
        citeElem,
        "Normative references in informative sections are not allowed. " +
          `Remove '!' from the start of the reference \`[[${ref}]]\``
      );
    }

    if (type === "informative" && !illegal) {
      conf.informativeReferences.add(cleanRef);
    } else {
      conf.normativeReferences.add(cleanRef);
    }
    return cite.childNodes[1] ? cite.childNodes : [cite];
  }

  /**
   * @param {string} matched
   * @param {Text} txt
   * @param {Map<string, string>} abbrMap
   */
  function inlineAbbrMatches(matched, txt, abbrMap) {
    return txt.parentElement.tagName === "ABBR"
      ? matched
      : html$1`<abbr title="${abbrMap.get(matched)}">${matched}</abbr>`;
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
    return html$1`<var data-type="${type}">${varName}</var>`;
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
    const parts = splitBySlash(matched, 2);
    const [isFor, content] = parts.length === 2 ? parts : [null, parts[0]];
    const [linkingText, text] = content.includes("|")
      ? content.split("|", 2).map(s => s.trim())
      : [null, content];
    const processedContent = processInlineContent(text);
    const forContext = isFor ? norm(isFor) : null;
    return html$1`<a
    data-link-type="dfn"
    data-link-for="${forContext}"
    data-xref-for="${forContext}"
    data-lt="${linkingText}"
    >${processedContent}</a
  >`;
  }

  function inlineCodeMatches(matched) {
    const clean = matched.slice(1, -1); // Chop ` and `
    return html$1`<code>${clean}</code>`;
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

  function run$h(conf) {
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
    const keywords = l10n$8.rfc2119Keywords();
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

  /**
   * Split a string by slash (`/`) unless it's escaped by a backslash (`\`)
   * @param {string} str
   *
   * TODO: Use negative lookbehind (`str.split(/(?<!\\)\//)`) when supported.
   * https://github.com/w3c/respec/issues/2869
   */
  function splitBySlash(str, limit = Infinity) {
    return str
      .replace("\\/", "%%")
      .split("/", limit)
      .map(s => s && s.trim().replace("%%", "/"));
  }

  var inlines = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$v,
    rfc2119Usage: rfc2119Usage,
    run: run$h
  });

  // @ts-check
  const name$w = "pcisig/pcisig-conformance";

  /**
   * @param {Element} conformance
   */
  function processConformance(conformance) {
    const terms = [...Object.keys(rfc2119Usage)];

    // Put in the 2119 clause and reference
    const keywords = joinAnd(
      terms.sort(),
      item => `<em class="rfc2119">${item}</em>`
    );
    const plural = terms.length > 1;
    const content = html$1`
    <h2>Conformance</h2>
    <p>
      As well as sections marked as non-normative, all examples, implementation
      notes, and notes in this specification are non-normative. Everything else
      in this specification is normative.
    </p>
    ${terms.length
      ? html$1`
          <p>
            The key word${plural ? "s" : ""} ${[keywords]} in this document
            ${plural ? "are" : "is"} to be interpreted as described when, and
            only when, they appear in all capitals, as shown here.
          </p>
        `
      : null}
  `;
    conformance.prepend(...content.childNodes);
  }

  function run$i() {
    const conformance = document.querySelector("section#conformance");
    if (conformance) {
      processConformance(conformance);
    }
  }

  var pcisigConformance = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$w,
    run: run$i
  });

  // Module pcisig/pre-dfn
  // Finds all <dfn> elements and adjust dfn-type attribute.

  const name$x = "pcisig/pre-dfn";

  function run$j() {
    const dfnClass = [
      "dfn",
      "pin",
      "signal",
      "op",
      "opcode",
      "operation",
      "request",
      "response",
      "bit",
      "reply",
      "message",
      "msg",
      "command",
      "term",
      "field",
      "register",
      "regpict",
      "state",
      "value",
      "parameter",
      "argument",
    ];

    document.querySelectorAll("dfn:not([data-dfn-type])").forEach(dfn => {
      let tag = dfnClass[0]; // default "dfn"
      dfnClass.forEach(t => {
        if (dfn.classList && dfn.classList.contains(t)) tag = t;
      });
      dfn.setAttribute("data-dfn-type", tag); // core/dfn will convert this to data-dfn-type
    });
  }

  var preDfn = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$x,
    run: run$j
  });

  // @ts-check

  const name$y = "core/dfn";

  function run$k() {
    document.querySelectorAll("dfn").forEach(dfn => {
      const titles = getDfnTitles(dfn);
      registerDefinition(dfn, titles);

      // Treat Internal Slots as IDL.
      if (!dfn.dataset.dfnType && /^\[\[\w+\]\]$/.test(titles[0])) {
        dfn.dataset.dfnType = "idl";
      }

      // Only add `lt`s that are different from the text content
      if (titles.length === 1 && titles[0] === norm(dfn.textContent)) {
        return;
      }
      dfn.dataset.lt = titles.join("|");
    });
  }

  var dfn = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$y,
    run: run$k
  });

  // @ts-check

  const name$z = "core/pluralize";

  function run$l(conf) {
    if (!conf.pluralize) return;

    const pluralizeDfn = getPluralizer();

    /** @type {NodeListOf<HTMLElement>} */
    const dfns = document.querySelectorAll(
      "dfn:not([data-lt-no-plural]):not([data-lt-noDefault])"
    );
    dfns.forEach(dfn => {
      const terms = [dfn.textContent];
      if (dfn.dataset.lt) terms.push(...dfn.dataset.lt.split("|"));
      if (dfn.dataset.localLt) {
        terms.push(...dfn.dataset.localLt.split("|"));
      }

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
      if (dfn.dataset.localLt) {
        dfn.dataset.localLt.split("|").forEach(lt => dfnTexts.add(lt));
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
    name: name$z,
    run: run$l
  });

  // @ts-check

  const name$A = "core/examples";

  const localizationStrings$7 = {
    en: {
      example: "Example",
    },
    nl: {
      example: "Voorbeeld",
    },
    es: {
      example: "Ejemplo",
    },
    ko: {
      example: "예시",
    },
    ja: {
      example: "例",
    },
    de: {
      example: "Beispiel",
    },
    zh: {
      example: "例",
    },
  };

  const l10n$9 = getIntlData(localizationStrings$7);

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
      ? html$1`<span class="example-title">: ${report.title}</span>`
      : "";
    return html$1`<div class="marker">
    <a class="self-link">${l10n$9.example}<bdi>${number}</bdi></a
    >${title}
  </div>`;
  }

  async function run$m() {
    /** @type {NodeListOf<HTMLElement>} */
    const examples = document.querySelectorAll(
      "pre.example, pre.illegal-example, aside.example"
    );
    if (!examples.length) return;

    const css = await cssPromise;
    document.head.insertBefore(
      html$1`<style>
      ${css}
    </style>`,
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
          addId(example, "example", String(number));
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
        const div = html$1`<div class="example" id="${id}">
        ${exampleTitle} ${example.cloneNode(true)}
      </div>`;
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
    name: name$A,
    run: run$m
  });

  // @ts-check

  const name$B = "core/issues-notes";

  const localizationStrings$8 = {
    en: {
      editors_note: "Editor's note",
      feature_at_risk: "(Feature at Risk) Issue",
      issue: "Issue",
      issue_summary: "Issue Summary",
      implementation_note: "Implementation Note",
      no_issues_in_spec: "There are no issues listed in this specification.",
      note: "Note",
      warning: "Warning",
    },
    ja: {
      note: "注",
      editors_note: "編者注",
      feature_at_risk: "(変更の可能性のある機能) Issue",
      issue: "Issue",
      issue_summary: "Issue の要約",
      no_issues_in_spec: "この仕様には未解決の issues は含まれていません．",
      warning: "警告",
    },
    nl: {
      editors_note: "Redactionele noot",
      issue_summary: "Lijst met issues",
      no_issues_in_spec: "Er zijn geen problemen vermeld in deze specificatie.",
      note: "Noot",
      warning: "Waarschuwing",
    },
    es: {
      editors_note: "Nota de editor",
      issue: "Cuestión",
      issue_summary: "Resumen de la cuestión",
      note: "Nota",
      no_issues_in_spec: "No hay problemas enumerados en esta especificación.",
      warning: "Aviso",
    },
    de: {
      editors_note: "Redaktioneller Hinweis",
      issue: "Frage",
      issue_summary: "Offene Fragen",
      no_issues_in_spec: "Diese Spezifikation enthält keine offenen Fragen.",
      note: "Hinweis",
      warning: "Warnung",
    },
    zh: {
      editors_note: "编者注",
      feature_at_risk: "（有可能变动的特性）Issue",
      issue: "Issue",
      issue_summary: "Issue 总结",
      no_issues_in_spec: "本规范中未列出任何 issue。",
      note: "注",
      warning: "警告",
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

  const l10n$a = getIntlData(localizationStrings$8);

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
    const getIssueNumber = createIssueNumberGetter();
    const issueList = document.createElement("ul");
    ins.forEach(inno => {
      const { type, displayType, isFeatureAtRisk } = getIssueType(inno);
      const isIssue = type === "issue";
      const isInline = inno.localName === "span";
      const { number: dataNum } = inno.dataset;
      const report = {
        type,
        inline: isInline,
        title: inno.title,
        number: getIssueNumber(inno),
      };
      // wrap
      if (!isInline) {
        const cssClass = isFeatureAtRisk ? `${type} atrisk` : type;
        const ariaRole = type === "note" || type === "impnote" ? "note" : null;
        const div = html$1`<div class="${cssClass}" role="${ariaRole}"></div>`;
        const title = document.createElement("span");
        const className = `${type}-title marker`;
        // prettier-ignore
        const titleParent = html$1`<div role="heading" class="${className}">${title}</div>`;
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
          if (report.number !== undefined) {
            text += ` ${report.number}`;
          }
          if (inno.dataset.hasOwnProperty("number")) {
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
            issueList.append(createIssueSummaryEntry(l10n$a.issue, report, div.id));
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

  function createIssueNumberGetter() {
    if (document.querySelector(".issue[data-number]")) {
      return element => {
        if (element.dataset.number) {
          return Number(element.dataset.number);
        }
      };
    }

    let issueNumber = 0;
    return element => {
      if (element.classList.contains("issue") && element.localName !== "span") {
        return ++issueNumber;
      }
    };
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
  function getIssueType(inno) {
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
        ? l10n$a.feature_at_risk
        : l10n$a.issue
      : isWarning
      ? l10n$a.warning
      : isEdNote
      ? l10n$a.editors_note
      : isImpNote
      ? l10n$a.implementation_note
      : l10n$a.note;
    return { type, displayType, isFeatureAtRisk };
  }

  /**
   * @param {string} dataNum
   * @param {*} conf
   */
  function linkToIssueTracker(dataNum, conf, { isFeatureAtRisk = false } = {}) {
    // Set issueBase to cause issue to be linked to the external issue tracker
    if (!isFeatureAtRisk && conf.issueBase) {
      return html$1`<a href="${conf.issueBase + dataNum}" />`;
    } else if (isFeatureAtRisk && conf.atRiskBase) {
      return html$1`<a href="${conf.atRiskBase + dataNum}" />`;
    }
  }

  /**
   * @param {string} l10nIssue
   * @param {Report} report
   */
  function createIssueSummaryEntry(l10nIssue, report, id) {
    const issueNumberText = `${l10nIssue} ${report.number}`;
    const title = report.title
      ? html$1`<span style="text-transform: none">: ${report.title}</span>`
      : "";
    return html$1`<li><a href="${`#${id}`}">${issueNumberText}</a>${title}</li>`;
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
      : issueSummaryElement.append(html$1`<p>${l10n$a.no_issues_in_spec}</p>`);
    if (
      !heading ||
      (heading && heading !== issueSummaryElement.firstElementChild)
    ) {
      issueSummaryElement.insertAdjacentHTML(
        "afterbegin",
        `<h2>${l10n$a.issue_summary}</h2>`
      );
    }
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
      return html$1`<span class="issue-label" aria-label="${ariaLabel}"
      >: ${title}${labelsGroup}</span
    >`;
    }
    return html$1`<span class="issue-label">: ${title}${labelsGroup}</span>`;
  }

  /** @param {string} bgColorHex background color as a hex value without '#' */
  function textColorFromBgColor(bgColorHex) {
    return parseInt(bgColorHex, 16) > 0xffffff / 2 ? "#000" : "#fff";
  }

  /**
   * @param {GitHubLabel} label
   * @param {string} repoURL
   */
  function createLabel(label, repoURL) {
    const { color: bgColor, name } = label;
    const issuesURL = new URL("./issues/", repoURL);
    issuesURL.searchParams.set("q", `is:issue is:open label:"${label.name}"`);
    const color = textColorFromBgColor(bgColor);
    const style = `background-color: #${bgColor}; color: ${color}`;
    return html$1`<a
    class="respec-gh-label"
    style="${style}"
    href="${issuesURL.href}"
    >${name}</a
  >`;
  }

  /**
   * @returns {Promise<Map<string, GitHubIssue>>}
   */
  async function fetchAndStoreGithubIssues(github) {
    if (!github || !github.apiBase) {
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

    const url = new URL("issues", `${github.apiBase}/${github.fullName}/`);
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

  async function run$n(conf) {
    const query = ".issue, .note, .warning, .ednote, .impnote";
    /** @type {NodeListOf<HTMLElement>} */
    const issuesAndNotes = document.querySelectorAll(query);
    if (!issuesAndNotes.length) {
      return; // nothing to do.
    }
    const ghIssues = await fetchAndStoreGithubIssues(conf.github);
    const css = await cssPromise$1;
    const { head: headElem } = document;
    headElem.insertBefore(
      html$1`<style>
      ${css}
    </style>`,
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
    name: name$B,
    run: run$n
  });

  // @ts-check

  const name$C = "core/best-practices";

  const localizationStrings$9 = {
    en: {
      best_practice: "Best Practice ",
    },
    ja: {
      best_practice: "最良実施例 ",
    },
    de: {
      best_practice: "Musterbeispiel ",
    },
    zh: {
      best_practice: "最佳实践 ",
    },
  };
  const l10n$b = getIntlData(localizationStrings$9);
  const lang$b = lang in localizationStrings$9 ? lang : "en";

  function run$o() {
    /** @type {NodeListOf<HTMLElement>} */
    const bps = document.querySelectorAll(".practicelab");
    const bpSummary = document.getElementById("bp-summary");
    const summaryItems = bpSummary ? document.createElement("ul") : null;
    [...bps].forEach((bp, num) => {
      const id = addId(bp, "bp");
      const localizedBpName = html$1`<a class="marker self-link" href="${`#${id}`}"
      ><bdi lang="${lang$b}">${l10n$b.best_practice}${num + 1}</bdi></a
    >`;

      // Make the summary items, if we have a summary
      if (summaryItems) {
        const li = html$1`<li>${localizedBpName}: ${makeSafeCopy(bp)}</li>`;
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
      const title = html$1`${localizedBpName.cloneNode(true)}: ${bp}`;
      container.prepend(...title.childNodes);
    });
    if (bps.length) {
      if (bpSummary) {
        bpSummary.appendChild(html$1`<h2>Best Practices Summary</h2>`);
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
    name: name$C,
    run: run$o
  });

  // @ts-check

  /**
   * @param {string} type
   * @param {string} parent
   * @param {string} name
   */
  function getAlternativeNames(idlAst, parent, name) {
    const { type } = idlAst;
    const asQualifiedName = `${parent}.${name}`;
    switch (type) {
      case "constructor":
      case "operation": {
        // Allow linking to "method()", method(arg) and "method" name.
        const asMethodName = `${name}()`;
        const asFullyQualifiedName = `${asQualifiedName}()`;
        const asMethodWithArgs = generateMethodNamesWithArgs(
          name,
          idlAst.arguments
        );
        return {
          local: [asQualifiedName, asFullyQualifiedName, name],
          exportable: [asMethodName, ...asMethodWithArgs],
        };
      }
      case "attribute":
        return {
          local: [asQualifiedName],
          exportable: [name],
        };
    }
  }

  /**
   * Generates all possible permutations of a method name based
   * on what arguments they method accepts.

   * Required arguments are always present, and optional ones
   * are stacked one by one.
   *
   * For examples: foo(req1, req2), foo(req1, req2, opt1) and so on.
   *
   * @param {String} operationName
   * @param {*} argsAst
   */
  function generateMethodNamesWithArgs(operationName, argsAst) {
    const operationNames = [];
    if (argsAst.length === 0) {
      return operationNames;
    }
    const required = []; // required arguments
    const optional = []; // optional arguments, including variadic ones
    for (const { name, optional: isOptional, variadic } of argsAst) {
      if (isOptional || variadic) {
        optional.push(name);
      } else {
        required.push(name);
      }
    }
    const requiredArgs = required.join(", ");
    const requiredOperation = `${operationName}(${requiredArgs})`;
    operationNames.push(requiredOperation);
    const optionalOps = optional.map((_, index) => {
      const optionalArgs = optional.slice(0, index + 1).join(", ");
      const result = `${operationName}(${requiredArgs}${
      optionalArgs ? `, ${optionalArgs}` : ""
    })`;
      return result;
    });
    operationNames.push(...optionalOps);
    return operationNames;
  }

  /**
   * @param {HTMLElement} dfn
   * @param {Record<"local" | "exportable", string[]>} names
   */
  function addAlternativeNames(dfn, names) {
    const { local, exportable } = names;
    const lt = dfn.dataset.lt ? new Set(dfn.dataset.lt.split("|")) : new Set();
    for (const item of exportable) {
      lt.add(item);
    }
    // Fix any ill-placed ones - local ones don't belong here
    local.filter(item => lt.has(item)).forEach(item => lt.delete(item));
    dfn.dataset.lt = [...lt].join("|");
    dfn.dataset.localLt = local.join("|");
    registerDefinition(dfn, [...local, ...exportable]);
  }

  /**
   * @param {HTMLElement} dfnElem
   * @param {*} idlAst
   * @param {string} parent
   * @param {string} name
   */
  function decorateDfn(dfnElem, idlAst, parent, name) {
    if (!dfnElem.id) {
      const lCaseParent = parent.toLowerCase();
      const middle = lCaseParent ? `${lCaseParent}-` : "";
      let last = name.toLowerCase().replace(/[()]/g, "").replace(/\s/g, "-");
      if (last === "") last = "the-empty-string";
      dfnElem.id = `dom-${middle}${last}`;
    }
    dfnElem.dataset.idl = idlAst.type;
    dfnElem.dataset.title = dfnElem.textContent;
    dfnElem.dataset.dfnFor = parent;
    // Derive the data-type for dictionary members, interface attributes,
    // and methods
    switch (idlAst.type) {
      case "operation":
      case "attribute":
      case "field":
        dfnElem.dataset.type = getDataType(idlAst);
        break;
    }

    // Mark the definition as code.
    if (
      !dfnElem.querySelector("code") &&
      !dfnElem.closest("code") &&
      dfnElem.children
    ) {
      const code = dfnElem.ownerDocument.createElement("code");
      code.classList.add("code-dfn");
      wrapInner$1(dfnElem, code);
    }

    // Add data-lt and data-local-lt values and register them
    switch (idlAst.type) {
      case "attribute":
      case "constructor":
      case "operation":
        addAlternativeNames(dfnElem, getAlternativeNames(idlAst, parent, name));
        break;
    }

    return dfnElem;
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

  // @ts-check

  const name$D = "pcisig/draw-csrs";

  /**
   * insert_unused_table_rows inserts "reserved" rows into a tables for
   * unused register bits.
   * @param  {HTMLElement} tbl   table to insert into (modified)
   * @param  {Object}      json  parsed JSON describing register
   * @access  public
   */
  function insert_unused_table_rows(tbl, json) {
    let last_lsb = json.width;
    const field_slot = [];
    const tbody = tbl.querySelector("tbody:first-of-type");
    if (tbody !== null) {
      // console.log("non-empty tbody");
      const rows = tbody.childNodes;
      if (rows.length > 0) {
        // console.log(`rows.length=${rows.length}`);
        // console.log(`json=${JSON.stringify(json, null, 2)}`);
        // console.log(`Object.keys(json.fields).length=${Object.keys(json.fields).length}`);
        if (json.fields.length > 0) {
          json.fields.forEach(item => {
            // console.log(`field_slot[${item.msb}]=${JSON.stringify(item, null, 2)}`);
            field_slot[item.msb] = item;
          });
          for (let msb = json.width; msb >= 0; msb--) {
            const item = field_slot[msb];
            if (item !== undefined) {
              // console.log(`msb=${msb} item.index=${item.index} last_lsb=${last_lsb}`);
              if (msb < last_lsb - 1) {
                const bit_location =
                  last_lsb - 1 === msb
                    ? `${msb + 1}`
                    : `${last_lsb - 1}:${msb + 1}`;
                const new_row = html$1`
                <tr>
                  <td>${bit_location}</td>
                  <td>${json.defaultUnused}</td>
                  <td>${json.defaultUnused}</td>
                </tr>
              `;
                tbody.appendChild(new_row);
                // console.log(`rows[${item.index}].after(${new_row})`);
              }
              last_lsb = item.lsb;
            }
          }
        }
        if (last_lsb > 0) {
          const bit_location = last_lsb - 1 === 1 ? "0" : `${last_lsb - 1}:0`;
          const new_row = html$1`
          <tr>
            <td>${bit_location}</td>
            <td>${json.defaultUnused}</td>
            <td>${json.defaultUnused}</td>
          </tr>
        `;
          tbody.appendChild(new_row);
          // console.log(`tbody.appendChild(${new_row}`);
          // console.log(`tbody=${tbody.innerHTML}`);
        }
      } else {
        const bit_location = last_lsb - 1 === 1 ? "0" : `${last_lsb - 1}:0`;
        const new_row = html$1`
        <tr>
          <td>${bit_location}</td>
          <td>${json.defaultUnused}</td>
          <td>${json.defaultUnused}</td>
        </tr>
      `;
        tbody.appendChild(new_row);
        // console.log(`tbody.appendChild(${new_row})`);
      }
    }
  }

  /**
   * parse_table
   * @param   {HTMLElement} tbl  (modified)
   * @returns {Object}
   * @access   public
   */
  function parse_table(tbl) {
    const json = { fields: [] };
    // console.log(`pcisig_reg: ${tbl.outerHTML} tbody="${tbl.querySelector("tbody:first-of-type").outerHTML}"`);
    if (tbl.hasAttribute("id")) {
      json.figName = tbl.getAttribute("id").replace(/^tbl-/, "");
    } else if (tbl.hasAttribute("title")) {
      json.figName = tbl.getAttribute("title");
    } else if (tbl.querySelector("caption")) {
      json.figName = tbl.querySelector("caption").textContent;
    } else {
      json.figName = "";
    }
    json.figName = json.figName
      .toLowerCase()
      .replace(/^\s+/, "")
      .replace(/\s+$/, "")
      .replace(/[^\-.0-9a-z_]+/gi, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/\.$/, ".x")
      .replace(/^([^a-z])/i, "x$1")
      .replace(/^$/, "generatedID");

    if (tbl.hasAttribute("data-json")) {
      try {
        mergeJSON(json, tbl.getAttribute("data-json"));
      } catch {
        showInlineError(tbl, "Invalid data-json attribute on <table>", "");
      }
    }

    if (!tbl.hasAttribute("id")) {
      tbl.setAttribute("id", `tbl-${json.figName}`);
    }
    // console.log(`core/draw-csrs table id="${tbl.getAttribute("id")}"`);
    if (!tbl.hasAttribute("dfn-data-for")) {
      tbl.setAttribute("data-dfn-for", json.figName);
    }

    if (tbl.hasAttribute("data-width"))
      json.width = tbl.getAttribute("data-width");
    if (tbl.hasAttribute("data-unused")) {
      json.defaultUnused = tbl.getAttribute("data-unused");
    } else if (!json.hasOwnProperty("data-unused")) {
      json.defaultUnused = "RsvdP";
    }
    if (tbl.hasAttribute("data-href")) json.href = tbl.getAttribute("data-href");
    if (tbl.hasAttribute("data-register"))
      json.register = tbl.getAttribute("data-register");

    const tblName = makeSafeCopy(tbl.querySelector("caption")).textContent.trim();

    tbl
      .querySelectorAll(":scope > tbody:first-of-type > tr, :scope > tr")
      .forEach(tr => {
        const td = tr.children;
        if (td.length >= 3) {
          const bits = td[0].textContent.trim();
          const desc = td[1];
          let attr = td[2].textContent.toLowerCase().trim();
          let lsb = -1;
          let msb = -1;
          const match = /^\s*(\d+)\s*(:\s*(\d+))?\s*$/.exec(bits);
          if (match) {
            msb = lsb = Number(match[1]);
            if (typeof match[3] === "string" && match[3] !== "") {
              lsb = Number(match[3]);
            }
            if (lsb > msb) {
              msb = lsb;
              lsb = Number(match[1]);
            }
          }
          let fieldName;
          let dfn = desc.querySelector("dfn:first-of-type");
          if (!dfn) {
            fieldName = /^\s*([-_\w]+)/.exec(desc.textContent);
            if (fieldName) {
              fieldName = fieldName[1]; // first word of text content (1st paren in regexp)
            } else {
              fieldName = `Field_${
              lsb !== msb ? `${msb}_${lsb}` : `${lsb}`
            }_${desc.textContent.trim().replace(/\s+/g, "_")}`;
            }
            desc.insertAdjacentHTML("afterbegin", `<dfn>${fieldName}</dfn>`);
            dfn = desc.querySelector("dfn:first-of-type");
          }
          fieldName = dfn.textContent.trim();
          if (!dfn.hasAttribute("class")) dfn.classList.add("field");
          // dfn.setAttribute("data-dfn-for", lt);
          dfn.setAttribute("data-dfn-type", "field");
          addId(dfn, "field", `${tblName}-${fieldName.toLowerCase()}`);
          decorateDfn(
            // @ts-ignore
            dfn,
            { type: "field", generic: "field" },
            tblName,
            fieldName
          );
          // console.log(`decorateDfn(${dfn.outerHTML})`);
          const val = desc.querySelector("span.value:first-of-type");
          let value = "";
          if (val) {
            try {
              value = JSON.parse(val.textContent.trim());
            } catch {
              value = val.textContent.trim();
            }
          }
          const validAttr = /^(rw|rws|ro|ros|rw1c|rw1cs|rw1s|rw1ss|wo|wos|hardwired|fixed|hwinit|rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused|other)$/i;
          if (!validAttr.test(attr)) {
            attr = "other";
          }
          const unusedAttr = /^(rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused)$/i;
          const isUnused = !!unusedAttr.test(attr);
          // console.log(`field: ${fieldName} bits="${bits}"  match=${match}  lsb=${lsb} msb=${msb} attr=${attr} isUnused=${isUnused}`);
          json.fields.push({
            name: fieldName,
            msb,
            lsb,
            attr,
            isUnused,
            value,
          });
        }
      });
    // console.log(`json=${JSON.stringify(json, null, 2)}`);
    return json;
  }

  /**
   * Merges two JSON objects together.
   * Src object properties override existing target properties.
   * @param {Object} target starting object (modified)
   * @param {Object} inputSrc merging object
   * @returns {Object} modified target
   */
  function mergeJSON(target, inputSrc) {
    const src = typeof inputSrc !== "string" ? inputSrc : JSON.parse(inputSrc);
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (typeof src[prop] === "object" && !!src[prop]) {
          target[prop] = mergeJSON(target, src[prop]);
        } else {
          target[prop] = src[prop];
        }
      }
    }
    return target;
  }

  /**
   * Locate all table.register elements and insert a figure before them with JSON
   * representing the table.
   * @returns {Promise<void>}
   */
  async function run$p() {
    document
      .querySelectorAll("figure.regipct-generated")
      .forEach(item => item.remove());
    document.querySelectorAll("table.register").forEach(tbl => {
      // @ts-ignore
      const json = parse_table(tbl);
      // console.log(
      //   `draw-csrs.table.register json = ${JSON.stringify(json, null, 2)}`
      // );

      // insert a figure before this table
      tbl.insertAdjacentHTML(
        "beforebegin",
        `<figure class="regpict-generated register"
                id="fig-${tbl.getAttribute("id").replace(/^#tbl-/, "")}">
                <pre class="json">
                ${JSON.stringify(json, null, 2)}
                </pre>
                <figcaption>
                  ${tbl.querySelector("caption").textContent}
                </figcaption>
              </figure>`
      );
      // insert_unused_table_rows(tbl, json);
    });
  }

  var drawCsrs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$D,
    insert_unused_table_rows: insert_unused_table_rows,
    parse_table: parse_table,
    run: run$p
  });

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule$2(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var shared = createCommonjsModule$2(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.3.6',
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(functionToString.call(WeakMap$1));

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule$2(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$2 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$2[name] || (store$2[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var userAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var v8Version = version && +version;

  var SPECIES = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return v8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var SPECIES$1 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var defineProperty = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.github.io/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return nativeGetOwnPropertyNames(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : nativeGetOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$5
  };

  var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;

  var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    getOwnPropertyNames: nativeGetOwnPropertyNames$1
  });

  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html$2 = getBuiltIn('document', 'documentElement');

  var IE_PROTO = sharedKey('IE_PROTO');

  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$2.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO] = true;

  var f$6 = wellKnownSymbol;

  var wrappedWellKnownSymbol = {
  	f: f$6
  };

  var defineProperty$1 = objectDefineProperty.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wrappedWellKnownSymbol.f(NAME)
    });
  };

  var defineProperty$2 = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty$2(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var SPECIES$2 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = bindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE$1];
  var $Symbol = global_1.Symbol;
  var JSON$1 = global_1.JSON;
  var nativeJSONStringify = JSON$1 && JSON$1.stringify;
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty$1 = objectDefineProperty.f;
  var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global_1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty$1({}, 'a', {
      get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty$1(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty$1;

  var wrap$1 = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty$1(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable$1.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames$2(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames$2(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.github.io/ecma262/#sec-symbol-constructor
  if (!nativeSymbol) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap$1(tag, description);
    };

    redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable;
    objectDefineProperty.f = $defineProperty;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }

    wrappedWellKnownSymbol.f = function (name) {
      return wrap$1(wellKnownSymbol(name), name);
    };
  }

  _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
    // `Symbol.for` method
    // https://tc39.github.io/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.github.io/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
    // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.github.io/ecma262/#sec-json.stringify
  JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return nativeJSONStringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || nativeJSONStringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || nativeJSONStringify(Object(symbol)) != '{}';
  }) }, {
    stringify: function stringify(it) {
      var args = [it];
      var index = 1;
      var replacer, $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer = args[1];
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return nativeJSONStringify.apply(JSON$1, args);
    }
  });

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys[HIDDEN] = true;

  var defineProperty$3 = objectDefineProperty.f;


  var NativeSymbol = global_1.Symbol;

  if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var native = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$3(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `Symbol.iterator` well-known symbol
  // https://tc39.github.io/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol('iterator');

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, objectCreate(null));
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.github.io/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var nativeAssign = Object.assign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  // should work with symbols and should have deterministic property order (V8 bug)
  var objectAssign = !nativeAssign || fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = String(test) !== '[object z]' ? function toString() {
    return '[object ' + classof(this) + ']';
  } : test.toString;

  var ObjectPrototype$2 = Object.prototype;

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (objectToString !== ObjectPrototype$2.toString) {
    redefine(ObjectPrototype$2, 'toString', objectToString, { unsafe: true });
  }

  var freezing = !fails(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule$2(function (module) {
  var defineProperty = objectDefineProperty.f;



  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + ++id, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;
  });

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var iterate_1 = createCommonjsModule$2(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES
            ? boundFunction(anObject(step = iterable[index])[0], step[1])
            : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
  });

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
    var NativeConstructor = global_1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var ADDER = IS_MAP ? 'set' : 'add';
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    // eslint-disable-next-line max-len
    if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    })))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty$4 = objectDefineProperty.f;








  var fastKey = internalMetadata.fastKey;


  var setInternalState$2 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$2(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty$4(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$2(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  // `Set` constructor
  // https://tc39.github.io/ecma262/#sec-set-objects
  var es_set = collection('Set', function (get) {
    return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = internalState.set;
  var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$3(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$5] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
      }
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  var methods = {};
  var names = [];
  function registerMethods(name, m) {
    if (Array.isArray(name)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _name = _step.value;
          registerMethods(_name, m);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return;
    }

    if (_typeof(name) === 'object') {
      for (var _name2 in name) {
        registerMethods(_name2, name[_name2]);
      }

      return;
    }

    addMethodNames(Object.getOwnPropertyNames(m));
    methods[name] = Object.assign(methods[name] || {}, m);
  }
  function getMethodsFor(name) {
    return methods[name] || {};
  }
  function getMethodNames() {
    return _toConsumableArray(new Set(names));
  }
  function addMethodNames(_names) {
    names.push.apply(names, _toConsumableArray(_names));
  }

  var $includes = arrayIncludes.includes;


  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (e) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) { /* empty */ }
    } return false;
  };

  // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var SPECIES$4 = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$4] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
      if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
    }
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  var max$2 = Math.max;
  var min$2 = Math.min;
  var floor$1 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$2(min$2(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$1(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim$2 = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$3 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim$2, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
    start: createMethod$3(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
    end: createMethod$3(2),
    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    trim: createMethod$3(3)
  };

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var forcedStringTrimMethod = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
  };

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  // Map function
  function map(array, block) {
    var i;
    var il = array.length;
    var result = [];

    for (i = 0; i < il; i++) {
      result.push(block(array[i]));
    }

    return result;
  } // Filter function

  function radians(d) {
    return d % 360 * Math.PI / 180;
  } // Radians to degrees

  function camelCase(s) {
    return s.toLowerCase().replace(/-(.)/g, function (m, g) {
      return g.toUpperCase();
    });
  } // Convert camel cased string to string seperated

  function unCamelCase(s) {
    return s.replace(/([A-Z])/g, function (m, g) {
      return '-' + g.toLowerCase();
    });
  } // Capitalize first letter of a string

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  } // Calculate proportional width and height values when necessary

  function proportionalSize(element, width, height, box) {
    if (width == null || height == null) {
      box = box || element.bbox();

      if (width == null) {
        width = box.width / box.height * height;
      } else if (height == null) {
        height = box.height / box.width * width;
      }
    }

    return {
      width: width,
      height: height
    };
  }
  function getOrigin(o, element) {
    // Allow origin or around as the names
    var origin = o.origin; // o.around == null ? o.origin : o.around

    var ox, oy; // Allow the user to pass a string to rotate around a given point

    if (typeof origin === 'string' || origin == null) {
      // Get the bounding box of the element with no transformations applied
      var string = (origin || 'center').toLowerCase().trim();

      var _element$bbox = element.bbox(),
          height = _element$bbox.height,
          width = _element$bbox.width,
          x = _element$bbox.x,
          y = _element$bbox.y; // Calculate the transformed x and y coordinates


      var bx = string.includes('left') ? x : string.includes('right') ? x + width : x + width / 2;
      var by = string.includes('top') ? y : string.includes('bottom') ? y + height : y + height / 2; // Set the bounds eg : "bottom-left", "Top right", "middle" etc...

      ox = o.ox != null ? o.ox : bx;
      oy = o.oy != null ? o.oy : by;
    } else {
      ox = origin[0];
      oy = origin[1];
    } // Return the origin as it is if it wasn't a string


    return [ox, oy];
  }

  // Default namespaces
  var ns = 'http://www.w3.org/2000/svg';
  var xmlns = 'http://www.w3.org/2000/xmlns/';
  var xlink = 'http://www.w3.org/1999/xlink';
  var svgjs = 'http://svgjs.com/svgjs';

  var globals = {
    window: typeof window === 'undefined' ? null : window,
    document: typeof document === 'undefined' ? null : document
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Base = function Base() {
    _classCallCheck(this, Base);
  };

  var elements = {};
  var root = '___SYMBOL___ROOT___'; // Method for element creation

  function create(name) {
    // create element
    return globals.document.createElementNS(ns, name);
  }
  function makeInstance(element) {
    if (element instanceof Base) return element;

    if (_typeof(element) === 'object') {
      return adopter(element);
    }

    if (element == null) {
      return new elements[root]();
    }

    if (typeof element === 'string' && element.charAt(0) !== '<') {
      return adopter(globals.document.querySelector(element));
    }

    var node = create('svg');
    node.innerHTML = element; // We can use firstChild here because we know,
    // that the first char is < and thus an element

    element = adopter(node.firstChild);
    return element;
  }
  function nodeOrNew(name, node) {
    return node instanceof globals.window.Node ? node : create(name);
  } // Adopt existing svg elements

  function adopt(node) {
    // check for presence of node
    if (!node) return null; // make sure a node isn't already adopted

    if (node.instance instanceof Base) return node.instance; // initialize variables

    var className = capitalize(node.nodeName || 'Dom'); // Make sure that gradients are adopted correctly

    if (className === 'LinearGradient' || className === 'RadialGradient') {
      className = 'Gradient'; // Fallback to Dom if element is not known
    } else if (!elements[className]) {
      className = 'Dom';
    }

    return new elements[className](node);
  }
  var adopter = adopt;
  function register(element) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.name;
    var asRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    elements[name] = element;
    if (asRoot) elements[root] = element;
    addMethodNames(Object.getOwnPropertyNames(element.prototype));
    return element;
  }
  function getClass(name) {
    return elements[name];
  } // Element id sequence

  var did = 1000; // Get next named element id

  function eid(name) {
    return 'Svgjs' + capitalize(name) + did++;
  } // Deep new id assignment

  function assignNewId(node) {
    // do the same for SVG child nodes as well
    for (var i = node.children.length - 1; i >= 0; i--) {
      assignNewId(node.children[i]);
    }

    if (node.id) {
      return adopt(node).id(eid(node.nodeName));
    }

    return adopt(node);
  } // Method for extending objects

  function extend(modules, methods, attrCheck) {
    var key, i;
    modules = Array.isArray(modules) ? modules : [modules];

    for (i = modules.length - 1; i >= 0; i--) {
      for (key in methods) {
        var method = methods[key];

        if (attrCheck) {
          method = wrapWithAttrCheck(methods[key]);
        }

        modules[i].prototype[key] = method;
      }
    }
  } // export function extendWithAttrCheck (...args) {
  //   extend(...args, true)
  // }

  function wrapWithAttrCheck(fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var o = args[args.length - 1];

      if (o && o.constructor === Object && !(o instanceof Array)) {
        return fn.apply(this, args.slice(0, -1)).attr(o);
      } else {
        return fn.apply(this, args);
      }
    };
  }

  function siblings() {
    return this.parent().children();
  } // Get the curent position siblings

  function position() {
    return this.parent().index(this);
  } // Get the next element (will return null if there is none)

  function next() {
    return this.siblings()[this.position() + 1];
  } // Get the next element (will return null if there is none)

  function prev() {
    return this.siblings()[this.position() - 1];
  } // Send given element one step forward

  function forward() {
    var i = this.position() + 1;
    var p = this.parent(); // move node one step forward

    p.removeElement(this).add(this, i); // make sure defs node is always at the top

    if (typeof p.isRoot === 'function' && p.isRoot()) {
      p.node.appendChild(p.defs().node);
    }

    return this;
  } // Send given element one step backward

  function backward() {
    var i = this.position();

    if (i > 0) {
      this.parent().removeElement(this).add(this, i - 1);
    }

    return this;
  } // Send given element all the way to the front

  function front() {
    var p = this.parent(); // Move node forward

    p.node.appendChild(this.node); // Make sure defs node is always at the top

    if (typeof p.isRoot === 'function' && p.isRoot()) {
      p.node.appendChild(p.defs().node);
    }

    return this;
  } // Send given element all the way to the back

  function back() {
    if (this.position() > 0) {
      this.parent().removeElement(this).add(this, 0);
    }

    return this;
  } // Inserts a given element before the targeted element

  function before(element) {
    element = makeInstance(element);
    element.remove();
    var i = this.position();
    this.parent().add(element, i);
    return this;
  } // Inserts a given element after the targeted element

  function after(element) {
    element = makeInstance(element);
    element.remove();
    var i = this.position();
    this.parent().add(element, i + 1);
    return this;
  }
  function insertBefore(element) {
    element = makeInstance(element);
    element.before(this);
    return this;
  }
  function insertAfter(element) {
    element = makeInstance(element);
    element.after(this);
    return this;
  }
  registerMethods('Dom', {
    siblings: siblings,
    position: position,
    next: next,
    prev: prev,
    forward: forward,
    backward: backward,
    front: front,
    back: back,
    before: before,
    after: after,
    insertBefore: insertBefore,
    insertAfter: insertAfter
  });

  var $filter = arrayIteration.filter;


  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var sloppyArrayMethod = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !method || !fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $indexOf = arrayIncludes.indexOf;


  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',');

  // `Array.prototype.join` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD$1 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var SPECIES$5 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.github.io/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var arrayPush = [].push;
  var min$3 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SUPPORTS_Y);

  // Parse unit value
  var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i; // Parse hex value

  var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i; // Parse rgb value

  var rgb = /rgb\((\d+),(\d+),(\d+)\)/; // Parse reference id

  var reference = /(#[a-z0-9\-_]+)/i; // splits a transformation chain

  var transforms = /\)\s*,?\s*/; // Whitespace

  var whitespace$1 = /\s/g; // Test hex value

  var isHex = /^#[a-f0-9]{3,6}$/i; // Test rgb value

  var isRgb = /^rgb\(/; // Test css declaration

  var isBlank = /^(\s+)?$/; // Test for numeric string

  var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; // Test for percent value

  var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i; // split at whitespace and comma

  var delimiter = /[\s,]+/; // The following regex are used to parse the d attribute of a path
  // Matches all hyphens which are not after an exponent

  var hyphen = /([^e])-/gi; // Replaces and tests for all path letters

  var pathLetters = /[MLHVCSQTAZ]/gi; // yes we need this one, too

  var isPathLetter = /[MLHVCSQTAZ]/i; // matches 0.154.23.45

  var numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi; // matches .

  var dots = /\./g;

  function classes() {
    var attr = this.attr('class');
    return attr == null ? [] : attr.trim().split(delimiter);
  } // Return true if class exists on the node, false otherwise

  function hasClass(name) {
    return this.classes().indexOf(name) !== -1;
  } // Add class to the node

  function addClass(name) {
    if (!this.hasClass(name)) {
      var array = this.classes();
      array.push(name);
      this.attr('class', array.join(' '));
    }

    return this;
  } // Remove class from the node

  function removeClass(name) {
    if (this.hasClass(name)) {
      this.attr('class', this.classes().filter(function (c) {
        return c !== name;
      }).join(' '));
    }

    return this;
  } // Toggle the presence of a class on the node

  function toggleClass(name) {
    return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
  }
  registerMethods('Dom', {
    classes: classes,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass
  });

  var $forEach$1 = arrayIteration.forEach;


  // `Array.prototype.forEach` method implementation
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  } : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
    forEach: arrayForEach
  });

  for (var COLLECTION_NAME$1 in domIterables) {
    var Collection$1 = global_1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype$1.forEach = arrayForEach;
    }
  }

  function css(style, val) {
    var ret = {};

    if (arguments.length === 0) {
      // get full style as object
      this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
        return !!el.length;
      }).forEach(function (el) {
        var t = el.split(/\s*:\s*/);
        ret[t[0]] = t[1];
      });
      return ret;
    }

    if (arguments.length < 2) {
      // get style properties in the array
      if (Array.isArray(style)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = style[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var name = _step.value;
            var cased = camelCase(name);
            ret[cased] = this.node.style[cased];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return ret;
      } // get style for property


      if (typeof style === 'string') {
        return this.node.style[camelCase(style)];
      } // set styles in object


      if (_typeof(style) === 'object') {
        for (var _name in style) {
          // set empty string if null/undefined/'' was given
          this.node.style[camelCase(_name)] = style[_name] == null || isBlank.test(style[_name]) ? '' : style[_name];
        }
      }
    } // set style for property


    if (arguments.length === 2) {
      this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? '' : val;
    }

    return this;
  } // Show element

  function show() {
    return this.css('display', '');
  } // Hide element

  function hide() {
    return this.css('display', 'none');
  } // Is element visible?

  function visible() {
    return this.css('display') !== 'none';
  }
  registerMethods('Dom', {
    css: css,
    show: show,
    hide: hide,
    visible: visible
  });

  function data$1(a, v, r) {
    if (_typeof(a) === 'object') {
      for (v in a) {
        this.data(v, a[v]);
      }
    } else if (arguments.length < 2) {
      try {
        return JSON.parse(this.attr('data-' + a));
      } catch (e) {
        return this.attr('data-' + a);
      }
    } else {
      this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
    }

    return this;
  }
  registerMethods('Dom', {
    data: data$1
  });

  function remember(k, v) {
    // remember every item in an object individually
    if (_typeof(arguments[0]) === 'object') {
      for (var key in k) {
        this.remember(key, k[key]);
      }
    } else if (arguments.length === 1) {
      // retrieve memory
      return this.memory()[k];
    } else {
      // store memory
      this.memory()[k] = v;
    }

    return this;
  } // Erase a given memory

  function forget() {
    if (arguments.length === 0) {
      this._memory = {};
    } else {
      for (var i = arguments.length - 1; i >= 0; i--) {
        delete this.memory()[arguments[i]];
      }
    }

    return this;
  } // This triggers creation of a new hidden class which is not performant
  // However, this function is not rarely used so it will not happen frequently
  // Return local memory object

  function memory() {
    return this._memory = this._memory || {};
  }
  registerMethods('Dom', {
    remember: remember,
    forget: forget,
    memory: memory
  });

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject(that);
      var self = indexedObject(O);
      var length = toLength(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true)
  };

  var $reduce = arrayReduce.left;


  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  _export({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduce') }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var listenerId = 0;
  var windowEvents = {};

  function getEvents(instance) {
    var n = instance.getEventHolder(); // We dont want to save events in global space

    if (n === globals.window) n = windowEvents;
    if (!n.events) n.events = {};
    return n.events;
  }

  function getEventTarget(instance) {
    return instance.getEventTarget();
  }

  function clearEvents(instance) {
    var n = instance.getEventHolder();
    if (n.events) n.events = {};
  } // Add event binder in the SVG namespace


  function on(node, events, listener, binding, options) {
    var l = listener.bind(binding || node);
    var instance = makeInstance(node);
    var bag = getEvents(instance);
    var n = getEventTarget(instance); // events can be an array of events or a string of events

    events = Array.isArray(events) ? events : events.split(delimiter); // add id to listener

    if (!listener._svgjsListenerId) {
      listener._svgjsListenerId = ++listenerId;
    }

    events.forEach(function (event) {
      var ev = event.split('.')[0];
      var ns = event.split('.')[1] || '*'; // ensure valid object

      bag[ev] = bag[ev] || {};
      bag[ev][ns] = bag[ev][ns] || {}; // reference listener

      bag[ev][ns][listener._svgjsListenerId] = l; // add listener

      n.addEventListener(ev, l, options || false);
    });
  } // Add event unbinder in the SVG namespace

  function off(node, events, listener, options) {
    var instance = makeInstance(node);
    var bag = getEvents(instance);
    var n = getEventTarget(instance); // listener can be a function or a number

    if (typeof listener === 'function') {
      listener = listener._svgjsListenerId;
      if (!listener) return;
    } // events can be an array of events or a string or undefined


    events = Array.isArray(events) ? events : (events || '').split(delimiter);
    events.forEach(function (event) {
      var ev = event && event.split('.')[0];
      var ns = event && event.split('.')[1];
      var namespace, l;

      if (listener) {
        // remove listener reference
        if (bag[ev] && bag[ev][ns || '*']) {
          // removeListener
          n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
          delete bag[ev][ns || '*'][listener];
        }
      } else if (ev && ns) {
        // remove all listeners for a namespaced event
        if (bag[ev] && bag[ev][ns]) {
          for (l in bag[ev][ns]) {
            off(n, [ev, ns].join('.'), l);
          }

          delete bag[ev][ns];
        }
      } else if (ns) {
        // remove all listeners for a specific namespace
        for (event in bag) {
          for (namespace in bag[event]) {
            if (ns === namespace) {
              off(n, [event, ns].join('.'));
            }
          }
        }
      } else if (ev) {
        // remove all listeners for the event
        if (bag[ev]) {
          for (namespace in bag[ev]) {
            off(n, [ev, namespace].join('.'));
          }

          delete bag[ev];
        }
      } else {
        // remove all listeners on a given node
        for (event in bag) {
          off(n, event);
        }

        clearEvents(instance);
      }
    });
  }
  function dispatch(node, event, data) {
    var n = getEventTarget(node); // Dispatch event

    if (event instanceof globals.window.Event) {
      n.dispatchEvent(event);
    } else {
      event = new globals.window.CustomEvent(event, {
        detail: data,
        cancelable: true
      });
      n.dispatchEvent(event);
    }

    return event;
  }

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var $map = arrayIteration.map;


  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING = 'toString';
  var nativeDateToString = DatePrototype[TO_STRING];
  var getTime = DatePrototype.getTime;

  // `Date.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-date.prototype.tostring
  if (new Date(NaN) + '' != INVALID_DATE) {
    redefine(DatePrototype, TO_STRING, function toString() {
      var value = getTime.call(this);
      // eslint-disable-next-line no-self-compare
      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    });
  }

  var trim = stringTrim.trim;


  var nativeParseInt = global_1.parseInt;
  var hex$1 = /^[+-]?0[Xx]/;
  var FORCED$1 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

  // `parseInt` method
  // https://tc39.github.io/ecma262/#sec-parseint-string-radix
  var _parseInt = FORCED$1 ? function parseInt(string, radix) {
    var S = trim(String(string));
    return nativeParseInt(S, (radix >>> 0) || (hex$1.test(S) ? 16 : 10));
  } : nativeParseInt;

  // `parseInt` method
  // https://tc39.github.io/ecma262/#sec-parseint-string-radix
  _export({ global: true, forced: parseInt != _parseInt }, {
    parseInt: _parseInt
  });

  var TO_STRING$1 = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING$1];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

  // `RegExp.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING$1, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function sixDigitHex(hex) {
    return hex.length === 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
  }

  function componentHex(component) {
    var integer = Math.round(component);
    var bounded = Math.max(0, Math.min(255, integer));
    var hex = bounded.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function is(object, space) {
    for (var i = space.length; i--;) {
      if (object[space[i]] == null) {
        return false;
      }
    }

    return true;
  }

  function getParameters(a, b) {
    var params = is(a, 'rgb') ? {
      _a: a.r,
      _b: a.g,
      _c: a.b,
      space: 'rgb'
    } : is(a, 'xyz') ? {
      _a: a.x,
      _b: a.y,
      _c: a.z,
      _d: 0,
      space: 'xyz'
    } : is(a, 'hsl') ? {
      _a: a.h,
      _b: a.s,
      _c: a.l,
      _d: 0,
      space: 'hsl'
    } : is(a, 'lab') ? {
      _a: a.l,
      _b: a.a,
      _c: a.b,
      _d: 0,
      space: 'lab'
    } : is(a, 'lch') ? {
      _a: a.l,
      _b: a.c,
      _c: a.h,
      _d: 0,
      space: 'lch'
    } : is(a, 'cmyk') ? {
      _a: a.c,
      _b: a.m,
      _c: a.y,
      _d: a.k,
      space: 'cmyk'
    } : {
      _a: 0,
      _b: 0,
      _c: 0,
      space: 'rgb'
    };
    params.space = b || params.space;
    return params;
  }

  function cieSpace(space) {
    if (space === 'lab' || space === 'xyz' || space === 'lch') {
      return true;
    } else {
      return false;
    }
  }

  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  var Color =
  /*#__PURE__*/
  function () {
    function Color() {
      _classCallCheck(this, Color);

      this.init.apply(this, arguments);
    }

    _createClass(Color, [{
      key: "init",
      value: function init() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgb';
        // This catches the case when a falsy value is passed like ''
        a = !a ? 0 : a; // Reset all values in case the init function is rerun with new color space

        if (this.space) {
          for (var component in this.space) {
            delete this[this.space[component]];
          }
        }

        if (typeof a === 'number') {
          // Allow for the case that we don't need d...
          space = typeof d === 'string' ? d : space;
          d = typeof d === 'string' ? 0 : d; // Assign the values straight to the color

          Object.assign(this, {
            _a: a,
            _b: b,
            _c: c,
            _d: d,
            space: space
          }); // If the user gave us an array, make the color from it
        } else if (a instanceof Array) {
          this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
          Object.assign(this, {
            _a: a[0],
            _b: a[1],
            _c: a[2],
            _d: a[3] || 0
          });
        } else if (a instanceof Object) {
          // Set the object up and assign its values directly
          var values = getParameters(a, b);
          Object.assign(this, values);
        } else if (typeof a === 'string') {
          if (isRgb.test(a)) {
            var noWhitespace = a.replace(whitespace$1, '');

            var _rgb$exec$slice$map = rgb.exec(noWhitespace).slice(1, 4).map(function (v) {
              return parseInt(v);
            }),
                _rgb$exec$slice$map2 = _slicedToArray(_rgb$exec$slice$map, 3),
                _a2 = _rgb$exec$slice$map2[0],
                _b2 = _rgb$exec$slice$map2[1],
                _c2 = _rgb$exec$slice$map2[2];

            Object.assign(this, {
              _a: _a2,
              _b: _b2,
              _c: _c2,
              _d: 0,
              space: 'rgb'
            });
          } else if (isHex.test(a)) {
            var hexParse = function hexParse(v) {
              return parseInt(v, 16);
            };

            var _hex$exec$map = hex.exec(sixDigitHex(a)).map(hexParse),
                _hex$exec$map2 = _slicedToArray(_hex$exec$map, 4),
                _a3 = _hex$exec$map2[1],
                _b3 = _hex$exec$map2[2],
                _c3 = _hex$exec$map2[3];

            Object.assign(this, {
              _a: _a3,
              _b: _b3,
              _c: _c3,
              _d: 0,
              space: 'rgb'
            });
          } else throw Error('Unsupported string format, can\'t construct Color');
        } // Now add the components as a convenience


        var _a = this._a,
            _b = this._b,
            _c = this._c,
            _d = this._d;
        var components = this.space === 'rgb' ? {
          r: _a,
          g: _b,
          b: _c
        } : this.space === 'xyz' ? {
          x: _a,
          y: _b,
          z: _c
        } : this.space === 'hsl' ? {
          h: _a,
          s: _b,
          l: _c
        } : this.space === 'lab' ? {
          l: _a,
          a: _b,
          b: _c
        } : this.space === 'lch' ? {
          l: _a,
          c: _b,
          h: _c
        } : this.space === 'cmyk' ? {
          c: _a,
          m: _b,
          y: _c,
          k: _d
        } : {};
        Object.assign(this, components);
      }
      /*
      Conversion Methods
      */

    }, {
      key: "rgb",
      value: function rgb() {
        if (this.space === 'rgb') {
          return this;
        } else if (cieSpace(this.space)) {
          // Convert to the xyz color space
          var x = this.x,
              y = this.y,
              z = this.z;

          if (this.space === 'lab' || this.space === 'lch') {
            // Get the values in the lab space
            var l = this.l,
                a = this.a,
                _b4 = this.b;

            if (this.space === 'lch') {
              var c = this.c,
                  h = this.h;
              var dToR = Math.PI / 180;
              a = c * Math.cos(dToR * h);
              _b4 = c * Math.sin(dToR * h);
            } // Undo the nonlinear function


            var yL = (l + 16) / 116;
            var xL = a / 500 + yL;
            var zL = yL - _b4 / 200; // Get the xyz values

            var ct = 16 / 116;
            var mx = 0.008856;
            var nm = 7.787;
            x = 0.95047 * (Math.pow(xL, 3) > mx ? Math.pow(xL, 3) : (xL - ct) / nm);
            y = 1.00000 * (Math.pow(yL, 3) > mx ? Math.pow(yL, 3) : (yL - ct) / nm);
            z = 1.08883 * (Math.pow(zL, 3) > mx ? Math.pow(zL, 3) : (zL - ct) / nm);
          } // Convert xyz to unbounded rgb values


          var rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
          var gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
          var bU = x * 0.0557 + y * -0.2040 + z * 1.0570; // Convert the values to true rgb values

          var pow = Math.pow;
          var bd = 0.0031308;
          var r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
          var g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
          var b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU; // Make and return the color

          var color = new Color(255 * r, 255 * g, 255 * b);
          return color;
        } else if (this.space === 'hsl') {
          // https://bgrins.github.io/TinyColor/docs/tinycolor.html
          // Get the current hsl values
          var _h = this.h,
              s = this.s,
              _l = this.l;
          _h /= 360;
          s /= 100;
          _l /= 100; // If we are grey, then just make the color directly

          if (s === 0) {
            _l *= 255;

            var _color2 = new Color(_l, _l, _l);

            return _color2;
          } // TODO I have no idea what this does :D If you figure it out, tell me!


          var q = _l < 0.5 ? _l * (1 + s) : _l + s - _l * s;
          var p = 2 * _l - q; // Get the rgb values

          var _r = 255 * hueToRgb(p, q, _h + 1 / 3);

          var _g = 255 * hueToRgb(p, q, _h);

          var _b5 = 255 * hueToRgb(p, q, _h - 1 / 3); // Make a new color


          var _color = new Color(_r, _g, _b5);

          return _color;
        } else if (this.space === 'cmyk') {
          // https://gist.github.com/felipesabino/5066336
          // Get the normalised cmyk values
          var _c4 = this.c,
              m = this.m,
              _y = this.y,
              k = this.k; // Get the rgb values

          var _r2 = 255 * (1 - Math.min(1, _c4 * (1 - k) + k));

          var _g2 = 255 * (1 - Math.min(1, m * (1 - k) + k));

          var _b6 = 255 * (1 - Math.min(1, _y * (1 - k) + k)); // Form the color and return it


          var _color3 = new Color(_r2, _g2, _b6);

          return _color3;
        } else {
          return this;
        }
      }
    }, {
      key: "lab",
      value: function lab() {
        // Get the xyz color
        var _this$xyz = this.xyz(),
            x = _this$xyz.x,
            y = _this$xyz.y,
            z = _this$xyz.z; // Get the lab components


        var l = 116 * y - 16;
        var a = 500 * (x - y);
        var b = 200 * (y - z); // Construct and return a new color

        var color = new Color(l, a, b, 'lab');
        return color;
      }
    }, {
      key: "xyz",
      value: function xyz() {
        // Normalise the red, green and blue values
        var _this$rgb = this.rgb(),
            r255 = _this$rgb._a,
            g255 = _this$rgb._b,
            b255 = _this$rgb._c;

        var _map = [r255, g255, b255].map(function (v) {
          return v / 255;
        }),
            _map2 = _slicedToArray(_map, 3),
            r = _map2[0],
            g = _map2[1],
            b = _map2[2]; // Convert to the lab rgb space


        var rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        var gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        var bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92; // Convert to the xyz color space without bounding the values

        var xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
        var yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
        var zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883; // Get the proper xyz values by applying the bounding

        var x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
        var y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
        var z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116; // Make and return the color

        var color = new Color(x, y, z, 'xyz');
        return color;
      }
    }, {
      key: "lch",
      value: function lch() {
        // Get the lab color directly
        var _this$lab = this.lab(),
            l = _this$lab.l,
            a = _this$lab.a,
            b = _this$lab.b; // Get the chromaticity and the hue using polar coordinates


        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var h = 180 * Math.atan2(b, a) / Math.PI;

        if (h < 0) {
          h *= -1;
          h = 360 - h;
        } // Make a new color and return it


        var color = new Color(l, c, h, 'lch');
        return color;
      }
    }, {
      key: "hsl",
      value: function hsl() {
        // Get the rgb values
        var _this$rgb2 = this.rgb(),
            _a = _this$rgb2._a,
            _b = _this$rgb2._b,
            _c = _this$rgb2._c;

        var _map3 = [_a, _b, _c].map(function (v) {
          return v / 255;
        }),
            _map4 = _slicedToArray(_map3, 3),
            r = _map4[0],
            g = _map4[1],
            b = _map4[2]; // Find the maximum and minimum values to get the lightness


        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var l = (max + min) / 2; // If the r, g, v values are identical then we are grey

        var isGrey = max === min; // Calculate the hue and saturation

        var delta = max - min;
        var s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        var h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0; // Construct and return the new color

        var color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
        return color;
      }
    }, {
      key: "cmyk",
      value: function cmyk() {
        // Get the rgb values for the current color
        var _this$rgb3 = this.rgb(),
            _a = _this$rgb3._a,
            _b = _this$rgb3._b,
            _c = _this$rgb3._c;

        var _map5 = [_a, _b, _c].map(function (v) {
          return v / 255;
        }),
            _map6 = _slicedToArray(_map5, 3),
            r = _map6[0],
            g = _map6[1],
            b = _map6[2]; // Get the cmyk values in an unbounded format


        var k = Math.min(1 - r, 1 - g, 1 - b);

        if (k === 1) {
          // Catch the black case
          return new Color(0, 0, 0, 1, 'cmyk');
        }

        var c = (1 - r - k) / (1 - k);
        var m = (1 - g - k) / (1 - k);
        var y = (1 - b - k) / (1 - k); // Construct the new color

        var color = new Color(c, m, y, k, 'cmyk');
        return color;
      }
      /*
      Input and Output methods
      */

    }, {
      key: "_clamped",
      value: function _clamped() {
        var _this$rgb4 = this.rgb(),
            _a = _this$rgb4._a,
            _b = _this$rgb4._b,
            _c = _this$rgb4._c;

        var max = Math.max,
            min = Math.min,
            round = Math.round;

        var format = function format(v) {
          return max(0, min(round(v), 255));
        };

        return [_a, _b, _c].map(format);
      }
    }, {
      key: "toHex",
      value: function toHex() {
        var _this$_clamped$map = this._clamped().map(componentHex),
            _this$_clamped$map2 = _slicedToArray(_this$_clamped$map, 3),
            r = _this$_clamped$map2[0],
            g = _this$_clamped$map2[1],
            b = _this$_clamped$map2[2];

        return "#".concat(r).concat(g).concat(b);
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.toHex();
      }
    }, {
      key: "toRgb",
      value: function toRgb() {
        var _this$_clamped = this._clamped(),
            _this$_clamped2 = _slicedToArray(_this$_clamped, 3),
            rV = _this$_clamped2[0],
            gV = _this$_clamped2[1],
            bV = _this$_clamped2[2];

        var string = "rgb(".concat(rV, ",").concat(gV, ",").concat(bV, ")");
        return string;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        var _a = this._a,
            _b = this._b,
            _c = this._c,
            _d = this._d,
            space = this.space;
        return [_a, _b, _c, _d, space];
      }
      /*
      Generating random colors
      */

    }], [{
      key: "random",
      value: function random() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vibrant';
        var t = arguments.length > 1 ? arguments[1] : undefined;
        // Get the math modules
        var random = Math.random,
            round = Math.round,
            sin = Math.sin,
            pi = Math.PI; // Run the correct generator

        if (mode === 'vibrant') {
          var l = (81 - 57) * random() + 57;
          var c = (83 - 45) * random() + 45;
          var h = 360 * random();
          var color = new Color(l, c, h, 'lch');
          return color;
        } else if (mode === 'sine') {
          t = t == null ? random() : t;
          var r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
          var g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
          var b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);

          var _color4 = new Color(r, g, b);

          return _color4;
        } else if (mode === 'pastel') {
          var _l2 = (94 - 86) * random() + 86;

          var _c5 = (26 - 9) * random() + 9;

          var _h2 = 360 * random();

          var _color5 = new Color(_l2, _c5, _h2, 'lch');

          return _color5;
        } else if (mode === 'dark') {
          var _l3 = 10 + 10 * random();

          var _c6 = (125 - 75) * random() + 86;

          var _h3 = 360 * random();

          var _color6 = new Color(_l3, _c6, _h3, 'lch');

          return _color6;
        } else if (mode === 'rgb') {
          var _r3 = 255 * random();

          var _g3 = 255 * random();

          var _b7 = 255 * random();

          var _color7 = new Color(_r3, _g3, _b7);

          return _color7;
        } else if (mode === 'lab') {
          var _l4 = 100 * random();

          var a = 256 * random() - 128;

          var _b8 = 256 * random() - 128;

          var _color8 = new Color(_l4, a, _b8, 'lab');

          return _color8;
        } else if (mode === 'grey') {
          var grey = 255 * random();

          var _color9 = new Color(grey, grey, grey);

          return _color9;
        }
      }
      /*
      Constructing colors
      */
      // Test if given value is a color string

    }, {
      key: "test",
      value: function test(color) {
        return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
      } // Test if given value is an rgb object

    }, {
      key: "isRgb",
      value: function isRgb(color) {
        return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
      } // Test if given value is a color

    }, {
      key: "isColor",
      value: function isColor(color) {
        return color && (color instanceof Color || this.isRgb(color) || this.test(color));
      }
    }]);

    return Color;
  }();

  var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$5 = objectDefineProperty.f;
  var trim$1 = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global_1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.github.io/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim$1(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  // `Number` constructor
  // https://tc39.github.io/ecma262/#sec-number-constructor
  if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
          ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j = 0, key; keys$1.length > j; j++) {
      if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
        defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

  var trim$2 = stringTrim.trim;


  var nativeParseFloat = global_1.parseFloat;
  var FORCED$2 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

  // `parseFloat` method
  // https://tc39.github.io/ecma262/#sec-parsefloat-string
  var _parseFloat = FORCED$2 ? function parseFloat(string) {
    var trimmedString = trim$2(String(string));
    var result = nativeParseFloat(trimmedString);
    return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
  } : nativeParseFloat;

  // `parseFloat` method
  // https://tc39.github.io/ecma262/#sec-parsefloat-string
  _export({ global: true, forced: parseFloat != _parseFloat }, {
    parseFloat: _parseFloat
  });

  var Point =
  /*#__PURE__*/
  function () {
    // Initialize
    function Point() {
      _classCallCheck(this, Point);

      this.init.apply(this, arguments);
    }

    _createClass(Point, [{
      key: "init",
      value: function init(x, y) {
        var base = {
          x: 0,
          y: 0
        }; // ensure source as object

        var source = Array.isArray(x) ? {
          x: x[0],
          y: x[1]
        } : _typeof(x) === 'object' ? {
          x: x.x,
          y: x.y
        } : {
          x: x,
          y: y
        }; // merge source

        this.x = source.x == null ? base.x : source.x;
        this.y = source.y == null ? base.y : source.y;
        return this;
      } // Clone point

    }, {
      key: "clone",
      value: function clone() {
        return new Point(this);
      }
    }, {
      key: "transform",
      value: function transform(m) {
        return this.clone().transformO(m);
      } // Transform point with matrix

    }, {
      key: "transformO",
      value: function transformO(m) {
        if (!Matrix.isMatrixLike(m)) {
          m = new Matrix(m);
        }

        var x = this.x,
            y = this.y; // Perform the matrix multiplication

        this.x = m.a * x + m.c * y + m.e;
        this.y = m.b * x + m.d * y + m.f;
        return this;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.x, this.y];
      }
    }]);

    return Point;
  }();
  function point(x, y) {
    return new Point(x, y).transform(this.screenCTM().inverse());
  }

  function closeEnough(a, b, threshold) {
    return Math.abs(b - a) < (threshold || 1e-6);
  }

  var Matrix =
  /*#__PURE__*/
  function () {
    function Matrix() {
      _classCallCheck(this, Matrix);

      this.init.apply(this, arguments);
    } // Initialize


    _createClass(Matrix, [{
      key: "init",
      value: function init(source) {
        var base = Matrix.fromArray([1, 0, 0, 1, 0, 0]); // ensure source as object

        source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : _typeof(source) === 'object' && Matrix.isMatrixLike(source) ? source : _typeof(source) === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base; // Merge the source matrix with the base matrix

        this.a = source.a != null ? source.a : base.a;
        this.b = source.b != null ? source.b : base.b;
        this.c = source.c != null ? source.c : base.c;
        this.d = source.d != null ? source.d : base.d;
        this.e = source.e != null ? source.e : base.e;
        this.f = source.f != null ? source.f : base.f;
        return this;
      } // Clones this matrix

    }, {
      key: "clone",
      value: function clone() {
        return new Matrix(this);
      } // Transform a matrix into another matrix by manipulating the space

    }, {
      key: "transform",
      value: function transform(o) {
        // Check if o is a matrix and then left multiply it directly
        if (Matrix.isMatrixLike(o)) {
          var matrix = new Matrix(o);
          return matrix.multiplyO(this);
        } // Get the proposed transformations and the current transformations


        var t = Matrix.formatTransforms(o);
        var current = this;

        var _transform = new Point(t.ox, t.oy).transform(current),
            ox = _transform.x,
            oy = _transform.y; // Construct the resulting matrix


        var transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy); // If we want the origin at a particular place, we force it there

        if (isFinite(t.px) || isFinite(t.py)) {
          var origin = new Point(ox, oy).transform(transformer); // TODO: Replace t.px with isFinite(t.px)

          var dx = t.px ? t.px - origin.x : 0;
          var dy = t.py ? t.py - origin.y : 0;
          transformer.translateO(dx, dy);
        } // Translate now after positioning


        transformer.translateO(t.tx, t.ty);
        return transformer;
      } // Applies a matrix defined by its affine parameters

    }, {
      key: "compose",
      value: function compose(o) {
        if (o.origin) {
          o.originX = o.origin[0];
          o.originY = o.origin[1];
        } // Get the parameters


        var ox = o.originX || 0;
        var oy = o.originY || 0;
        var sx = o.scaleX || 1;
        var sy = o.scaleY || 1;
        var lam = o.shear || 0;
        var theta = o.rotate || 0;
        var tx = o.translateX || 0;
        var ty = o.translateY || 0; // Apply the standard matrix

        var result = new Matrix().translateO(-ox, -oy).scaleO(sx, sy).shearO(lam).rotateO(theta).translateO(tx, ty).lmultiplyO(this).translateO(ox, oy);
        return result;
      } // Decomposes this matrix into its affine parameters

    }, {
      key: "decompose",
      value: function decompose() {
        var cx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var cy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // Get the parameters from the matrix
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = this.d;
        var e = this.e;
        var f = this.f; // Figure out if the winding direction is clockwise or counterclockwise

        var determinant = a * d - b * c;
        var ccw = determinant > 0 ? 1 : -1; // Since we only shear in x, we can use the x basis to get the x scale
        // and the rotation of the resulting matrix

        var sx = ccw * Math.sqrt(a * a + b * b);
        var thetaRad = Math.atan2(ccw * b, ccw * a);
        var theta = 180 / Math.PI * thetaRad;
        var ct = Math.cos(thetaRad);
        var st = Math.sin(thetaRad); // We can then solve the y basis vector simultaneously to get the other
        // two affine parameters directly from these parameters

        var lam = (a * c + b * d) / determinant;
        var sy = c * sx / (lam * a - b) || d * sx / (lam * b + a); // Use the translations

        var tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
        var ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy); // Construct the decomposition and return it

        return {
          // Return the affine parameters
          scaleX: sx,
          scaleY: sy,
          shear: lam,
          rotate: theta,
          translateX: tx,
          translateY: ty,
          originX: cx,
          originY: cy,
          // Return the matrix parameters
          a: this.a,
          b: this.b,
          c: this.c,
          d: this.d,
          e: this.e,
          f: this.f
        };
      } // Left multiplies by the given matrix

    }, {
      key: "multiply",
      value: function multiply(matrix) {
        return this.clone().multiplyO(matrix);
      }
    }, {
      key: "multiplyO",
      value: function multiplyO(matrix) {
        // Get the matrices
        var l = this;
        var r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
        return Matrix.matrixMultiply(l, r, this);
      }
    }, {
      key: "lmultiply",
      value: function lmultiply(matrix) {
        return this.clone().lmultiplyO(matrix);
      }
    }, {
      key: "lmultiplyO",
      value: function lmultiplyO(matrix) {
        var r = this;
        var l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
        return Matrix.matrixMultiply(l, r, this);
      } // Inverses matrix

    }, {
      key: "inverseO",
      value: function inverseO() {
        // Get the current parameters out of the matrix
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = this.d;
        var e = this.e;
        var f = this.f; // Invert the 2x2 matrix in the top left

        var det = a * d - b * c;
        if (!det) throw new Error('Cannot invert ' + this); // Calculate the top 2x2 matrix

        var na = d / det;
        var nb = -b / det;
        var nc = -c / det;
        var nd = a / det; // Apply the inverted matrix to the top right

        var ne = -(na * e + nc * f);
        var nf = -(nb * e + nd * f); // Construct the inverted matrix

        this.a = na;
        this.b = nb;
        this.c = nc;
        this.d = nd;
        this.e = ne;
        this.f = nf;
        return this;
      }
    }, {
      key: "inverse",
      value: function inverse() {
        return this.clone().inverseO();
      } // Translate matrix

    }, {
      key: "translate",
      value: function translate(x, y) {
        return this.clone().translateO(x, y);
      }
    }, {
      key: "translateO",
      value: function translateO(x, y) {
        this.e += x || 0;
        this.f += y || 0;
        return this;
      } // Scale matrix

    }, {
      key: "scale",
      value: function scale(x, y, cx, cy) {
        var _this$clone;

        return (_this$clone = this.clone()).scaleO.apply(_this$clone, arguments);
      }
    }, {
      key: "scaleO",
      value: function scaleO(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
        var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        // Support uniform scaling
        if (arguments.length === 3) {
          cy = cx;
          cx = y;
          y = x;
        }

        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        this.a = a * x;
        this.b = b * y;
        this.c = c * x;
        this.d = d * y;
        this.e = e * x - cx * x + cx;
        this.f = f * y - cy * y + cy;
        return this;
      } // Rotate matrix

    }, {
      key: "rotate",
      value: function rotate(r, cx, cy) {
        return this.clone().rotateO(r, cx, cy);
      }
    }, {
      key: "rotateO",
      value: function rotateO(r) {
        var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        // Convert degrees to radians
        r = radians(r);
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        this.a = a * cos - b * sin;
        this.b = b * cos + a * sin;
        this.c = c * cos - d * sin;
        this.d = d * cos + c * sin;
        this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
        this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
        return this;
      } // Flip matrix on x or y, at a given offset

    }, {
      key: "flip",
      value: function flip(axis, around) {
        return this.clone().flipO(axis, around);
      }
    }, {
      key: "flipO",
      value: function flipO(axis, around) {
        return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
      } // Shear matrix

    }, {
      key: "shear",
      value: function shear(a, cx, cy) {
        return this.clone().shearO(a, cx, cy);
      }
    }, {
      key: "shearO",
      value: function shearO(lx) {
        var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        this.a = a + b * lx;
        this.c = c + d * lx;
        this.e = e + f * lx - cy * lx;
        return this;
      } // Skew Matrix

    }, {
      key: "skew",
      value: function skew(x, y, cx, cy) {
        var _this$clone2;

        return (_this$clone2 = this.clone()).skewO.apply(_this$clone2, arguments);
      }
    }, {
      key: "skewO",
      value: function skewO(x) {
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
        var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        // support uniformal skew
        if (arguments.length === 3) {
          cy = cx;
          cx = y;
          y = x;
        } // Convert degrees to radians


        x = radians(x);
        y = radians(y);
        var lx = Math.tan(x);
        var ly = Math.tan(y);
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        this.a = a + b * lx;
        this.b = b + a * ly;
        this.c = c + d * lx;
        this.d = d + c * ly;
        this.e = e + f * lx - cy * lx;
        this.f = f + e * ly - cx * ly;
        return this;
      } // SkewX

    }, {
      key: "skewX",
      value: function skewX(x, cx, cy) {
        return this.skew(x, 0, cx, cy);
      }
    }, {
      key: "skewXO",
      value: function skewXO(x, cx, cy) {
        return this.skewO(x, 0, cx, cy);
      } // SkewY

    }, {
      key: "skewY",
      value: function skewY(y, cx, cy) {
        return this.skew(0, y, cx, cy);
      }
    }, {
      key: "skewYO",
      value: function skewYO(y, cx, cy) {
        return this.skewO(0, y, cx, cy);
      } // Transform around a center point

    }, {
      key: "aroundO",
      value: function aroundO(cx, cy, matrix) {
        var dx = cx || 0;
        var dy = cy || 0;
        return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
      }
    }, {
      key: "around",
      value: function around(cx, cy, matrix) {
        return this.clone().aroundO(cx, cy, matrix);
      } // Check if two matrices are equal

    }, {
      key: "equals",
      value: function equals(other) {
        var comp = new Matrix(other);
        return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
      } // Convert matrix to string

    }, {
      key: "toString",
      value: function toString() {
        return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.a, this.b, this.c, this.d, this.e, this.f];
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return {
          a: this.a,
          b: this.b,
          c: this.c,
          d: this.d,
          e: this.e,
          f: this.f
        };
      }
    }], [{
      key: "fromArray",
      value: function fromArray(a) {
        return {
          a: a[0],
          b: a[1],
          c: a[2],
          d: a[3],
          e: a[4],
          f: a[5]
        };
      }
    }, {
      key: "isMatrixLike",
      value: function isMatrixLike(o) {
        return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
      }
    }, {
      key: "formatTransforms",
      value: function formatTransforms(o) {
        // Get all of the parameters required to form the matrix
        var flipBoth = o.flip === 'both' || o.flip === true;
        var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
        var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
        var skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
        var skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
        var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
        var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
        var shear = o.shear || 0;
        var theta = o.rotate || o.theta || 0;
        var origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
        var ox = origin.x;
        var oy = origin.y;
        var position = new Point(o.position || o.px || o.positionX, o.py || o.positionY);
        var px = position.x;
        var py = position.y;
        var translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
        var tx = translate.x;
        var ty = translate.y;
        var relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
        var rx = relative.x;
        var ry = relative.y; // Populate all of the values

        return {
          scaleX: scaleX,
          scaleY: scaleY,
          skewX: skewX,
          skewY: skewY,
          shear: shear,
          theta: theta,
          rx: rx,
          ry: ry,
          tx: tx,
          ty: ty,
          ox: ox,
          oy: oy,
          px: px,
          py: py
        };
      } // left matrix, right matrix, target matrix which is overwritten

    }, {
      key: "matrixMultiply",
      value: function matrixMultiply(l, r, o) {
        // Work out the product directly
        var a = l.a * r.a + l.c * r.b;
        var b = l.b * r.a + l.d * r.b;
        var c = l.a * r.c + l.c * r.d;
        var d = l.b * r.c + l.d * r.d;
        var e = l.e + l.a * r.e + l.c * r.f;
        var f = l.f + l.b * r.e + l.d * r.f; // make sure to use local variables because l/r and o could be the same

        o.a = a;
        o.b = b;
        o.c = c;
        o.d = d;
        o.e = e;
        o.f = f;
        return o;
      }
    }]);

    return Matrix;
  }();
  function ctm() {
    return new Matrix(this.node.getCTM());
  }
  function screenCTM() {
    /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
       This is needed because FF does not return the transformation matrix
       for the inner coordinate system when getScreenCTM() is called on nested svgs.
       However all other Browsers do that */
    if (typeof this.isRoot === 'function' && !this.isRoot()) {
      var rect = this.rect(1, 1);
      var m = rect.node.getScreenCTM();
      rect.remove();
      return new Matrix(m);
    }

    return new Matrix(this.node.getScreenCTM());
  }
  register(Matrix, 'Matrix');

  function parser() {
    // Reuse cached element if possible
    if (!parser.nodes) {
      var svg = makeInstance().size(2, 0);
      svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
      svg.attr('focusable', 'false');
      svg.attr('aria-hidden', 'true');
      var path = svg.path().node;
      parser.nodes = {
        svg: svg,
        path: path
      };
    }

    if (!parser.nodes.svg.node.parentNode) {
      var b = globals.document.body || globals.document.documentElement;
      parser.nodes.svg.addTo(b);
    }

    return parser.nodes;
  }

  function isNulledBox(box) {
    return !box.width && !box.height && !box.x && !box.y;
  }

  function domContains(node) {
    return node === globals.document || (globals.document.documentElement.contains || function (node) {
      // This is IE - it does not support contains() for top-level SVGs
      while (node.parentNode) {
        node = node.parentNode;
      }

      return node === globals.document;
    }).call(globals.document.documentElement, node);
  }

  var Box =
  /*#__PURE__*/
  function () {
    function Box() {
      _classCallCheck(this, Box);

      this.init.apply(this, arguments);
    }

    _createClass(Box, [{
      key: "init",
      value: function init(source) {
        var base = [0, 0, 0, 0];
        source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : _typeof(source) === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
        this.x = source[0] || 0;
        this.y = source[1] || 0;
        this.width = this.w = source[2] || 0;
        this.height = this.h = source[3] || 0; // Add more bounding box properties

        this.x2 = this.x + this.w;
        this.y2 = this.y + this.h;
        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;
        return this;
      } // Merge rect box with another, return a new instance

    }, {
      key: "merge",
      value: function merge(box) {
        var x = Math.min(this.x, box.x);
        var y = Math.min(this.y, box.y);
        var width = Math.max(this.x + this.width, box.x + box.width) - x;
        var height = Math.max(this.y + this.height, box.y + box.height) - y;
        return new Box(x, y, width, height);
      }
    }, {
      key: "transform",
      value: function transform(m) {
        if (!(m instanceof Matrix)) {
          m = new Matrix(m);
        }

        var xMin = Infinity;
        var xMax = -Infinity;
        var yMin = Infinity;
        var yMax = -Infinity;
        var pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
        pts.forEach(function (p) {
          p = p.transform(m);
          xMin = Math.min(xMin, p.x);
          xMax = Math.max(xMax, p.x);
          yMin = Math.min(yMin, p.y);
          yMax = Math.max(yMax, p.y);
        });
        return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
      }
    }, {
      key: "addOffset",
      value: function addOffset() {
        // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
        this.x += globals.window.pageXOffset;
        this.y += globals.window.pageYOffset;
        return this;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.x, this.y, this.width, this.height];
      }
    }, {
      key: "isNulled",
      value: function isNulled() {
        return isNulledBox(this);
      }
    }]);

    return Box;
  }();

  function getBox(cb, retry) {
    var box;

    try {
      box = cb(this.node);

      if (isNulledBox(box) && !domContains(this.node)) {
        throw new Error('Element not in the dom');
      }
    } catch (e) {
      box = retry(this);
    }

    return box;
  }

  function bbox() {
    return new Box(getBox.call(this, function (node) {
      return node.getBBox();
    }, function (el) {
      try {
        var clone = el.clone().addTo(parser().svg).show();
        var box = clone.node.getBBox();
        clone.remove();
        return box;
      } catch (e) {
        throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString());
      }
    }));
  }
  function rbox(el) {
    var box = new Box(getBox.call(this, function (node) {
      return node.getBoundingClientRect();
    }, function (el) {
      throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible');
    }));
    if (el) return box.transform(el.screenCTM().inverse());
    return box.addOffset();
  }
  registerMethods({
    viewbox: {
      viewbox: function viewbox(x, y, width, height) {
        // act as getter
        if (x == null) return new Box(this.attr('viewBox')); // act as setter

        return this.attr('viewBox', new Box(x, y, width, height));
      },
      zoom: function zoom(level, point) {
        var width = this.node.clientWidth;
        var height = this.node.clientHeight;
        var v = this.viewbox(); // Firefox does not support clientHeight and returns 0
        // https://bugzilla.mozilla.org/show_bug.cgi?id=874811

        if (!width && !height) {
          var style = window.getComputedStyle(this.node);
          width = parseFloat(style.getPropertyValue('width'));
          height = parseFloat(style.getPropertyValue('height'));
        }

        var zoomX = width / v.width;
        var zoomY = height / v.height;
        var zoom = Math.min(zoomX, zoomY);

        if (level == null) {
          return zoom;
        }

        var zoomAmount = zoom / level;
        if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;
        point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
        var box = new Box(v).transform(new Matrix({
          scale: zoomAmount,
          origin: point
        }));
        return this.viewbox(box);
      }
    }
  });
  register(Box, 'Box');

  /* eslint no-new-func: "off" */
  var subClassArray = function () {
    try {
      // try es6 subclassing
      return Function('name', 'baseClass', '_constructor', ['baseClass = baseClass || Array', 'return {', '  [name]: class extends baseClass {', '    constructor (...args) {', '      super(...args)', '      _constructor && _constructor.apply(this, args)', '    }', '  }', '}[name]'].join('\n'));
    } catch (e) {
      // Use es5 approach
      return function (name) {
        var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Array;

        var _constructor = arguments.length > 2 ? arguments[2] : undefined;

        var Arr = function Arr() {
          baseClass.apply(this, arguments);
          _constructor && _constructor.apply(this, arguments);
        };

        Arr.prototype = Object.create(baseClass.prototype);
        Arr.prototype.constructor = Arr;

        Arr.prototype.map = function (fn) {
          var arr = new Arr();
          arr.push.apply(arr, Array.prototype.map.call(this, fn));
          return arr;
        };

        return Arr;
      };
    }
  }();

  var List = subClassArray('List', Array, function () {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push.apply(this, _toConsumableArray(arr));
  });
  extend(List, {
    each: function each(fnOrMethodName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (typeof fnOrMethodName === 'function') {
        return this.map(function (el) {
          return fnOrMethodName.call(el, el);
        });
      } else {
        return this.map(function (el) {
          return el[fnOrMethodName].apply(el, args);
        });
      }
    },
    toArray: function toArray() {
      return Array.prototype.concat.apply([], this);
    }
  });
  var reserved = ['toArray', 'constructor', 'each'];

  List.extend = function (methods) {
    methods = methods.reduce(function (obj, name) {
      // Don't overwrite own methods
      if (reserved.includes(name)) return obj; // Don't add private methods

      if (name[0] === '_') return obj; // Relay every call to each()

      obj[name] = function () {
        for (var _len2 = arguments.length, attrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          attrs[_key2] = arguments[_key2];
        }

        return this.each.apply(this, [name].concat(attrs));
      };

      return obj;
    }, {});
    extend(List, methods);
  };

  function baseFind(query, parent) {
    return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
      return adopt(node);
    }));
  } // Scoped find method

  function find(query) {
    return baseFind(query, this.node);
  }
  function findOne(query) {
    return adopt(this.node.querySelector(query));
  }

  var EventTarget =
  /*#__PURE__*/
  function (_Base) {
    _inherits(EventTarget, _Base);

    function EventTarget() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$events = _ref.events,
          events = _ref$events === void 0 ? {} : _ref$events;

      _classCallCheck(this, EventTarget);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTarget).call(this));
      _this.events = events;
      return _this;
    }

    _createClass(EventTarget, [{
      key: "addEventListener",
      value: function addEventListener() {}
    }, {
      key: "dispatch",
      value: function dispatch$1(event, data) {
        return dispatch(this, event, data);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        var bag = this.getEventHolder().events;
        if (!bag) return true;
        var events = bag[event.type];

        for (var i in events) {
          for (var j in events[i]) {
            events[i][j](event);
          }
        }

        return !event.defaultPrevented;
      } // Fire given event

    }, {
      key: "fire",
      value: function fire(event, data) {
        this.dispatch(event, data);
        return this;
      }
    }, {
      key: "getEventHolder",
      value: function getEventHolder() {
        return this;
      }
    }, {
      key: "getEventTarget",
      value: function getEventTarget() {
        return this;
      } // Unbind event from listener

    }, {
      key: "off",
      value: function off$1(event, listener) {
        off(this, event, listener);

        return this;
      } // Bind given event to listener

    }, {
      key: "on",
      value: function on$1(event, listener, binding, options) {
        on(this, event, listener, binding, options);

        return this;
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener() {}
    }]);

    return EventTarget;
  }(Base);
  register(EventTarget, 'EventTarget');

  function noop() {} // Default animation values

  var timeline = {
    duration: 400,
    ease: '>',
    delay: 0
  }; // Default attribute values

  var attrs = {
    // fill and stroke
    'fill-opacity': 1,
    'stroke-opacity': 1,
    'stroke-width': 0,
    'stroke-linejoin': 'miter',
    'stroke-linecap': 'butt',
    fill: '#000000',
    stroke: '#000000',
    opacity: 1,
    // position
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    // size
    width: 0,
    height: 0,
    // radius
    r: 0,
    rx: 0,
    ry: 0,
    // gradient
    offset: 0,
    'stop-opacity': 1,
    'stop-color': '#000000',
    // text
    'text-anchor': 'start'
  };

  var SVGArray = subClassArray('SVGArray', Array, function (arr) {
    this.init(arr);
  });
  extend(SVGArray, {
    init: function init(arr) {
      // This catches the case, that native map tries to create an array with new Array(1)
      if (typeof arr === 'number') return this;
      this.length = 0;
      this.push.apply(this, _toConsumableArray(this.parse(arr)));
      return this;
    },
    toArray: function toArray() {
      return Array.prototype.concat.apply([], this);
    },
    toString: function toString() {
      return this.join(' ');
    },
    // Flattens the array if needed
    valueOf: function valueOf() {
      var ret = [];
      ret.push.apply(ret, _toConsumableArray(this));
      return ret;
    },
    // Parse whitespace separated string
    parse: function parse() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // If already is an array, no need to parse it
      if (array instanceof Array) return array;
      return array.trim().split(delimiter).map(parseFloat);
    },
    clone: function clone() {
      return new this.constructor(this);
    },
    toSet: function toSet() {
      return new Set(this);
    }
  });

  var SVGNumber =
  /*#__PURE__*/
  function () {
    // Initialize
    function SVGNumber() {
      _classCallCheck(this, SVGNumber);

      this.init.apply(this, arguments);
    }

    _createClass(SVGNumber, [{
      key: "init",
      value: function init(value, unit) {
        unit = Array.isArray(value) ? value[1] : unit;
        value = Array.isArray(value) ? value[0] : value; // initialize defaults

        this.value = 0;
        this.unit = unit || ''; // parse value

        if (typeof value === 'number') {
          // ensure a valid numeric value
          this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
        } else if (typeof value === 'string') {
          unit = value.match(numberAndUnit);

          if (unit) {
            // make value numeric
            this.value = parseFloat(unit[1]); // normalize

            if (unit[5] === '%') {
              this.value /= 100;
            } else if (unit[5] === 's') {
              this.value *= 1000;
            } // store unit


            this.unit = unit[5];
          }
        } else {
          if (value instanceof SVGNumber) {
            this.value = value.valueOf();
            this.unit = value.unit;
          }
        }

        return this;
      }
    }, {
      key: "toString",
      value: function toString() {
        return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.toString();
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.value, this.unit];
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.value;
      } // Add number

    }, {
      key: "plus",
      value: function plus(number) {
        number = new SVGNumber(number);
        return new SVGNumber(this + number, this.unit || number.unit);
      } // Subtract number

    }, {
      key: "minus",
      value: function minus(number) {
        number = new SVGNumber(number);
        return new SVGNumber(this - number, this.unit || number.unit);
      } // Multiply number

    }, {
      key: "times",
      value: function times(number) {
        number = new SVGNumber(number);
        return new SVGNumber(this * number, this.unit || number.unit);
      } // Divide number

    }, {
      key: "divide",
      value: function divide(number) {
        number = new SVGNumber(number);
        return new SVGNumber(this / number, this.unit || number.unit);
      }
    }, {
      key: "convert",
      value: function convert(unit) {
        return new SVGNumber(this.value, unit);
      }
    }]);

    return SVGNumber;
  }();

  var hooks = [];
  function registerAttrHook(fn) {
    hooks.push(fn);
  } // Set svg element attribute

  function attr(attr, val, ns) {
    var _this = this;

    // act as full getter
    if (attr == null) {
      // get an object of attributes
      attr = {};
      val = this.node.attributes;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return attr;
    } else if (attr instanceof Array) {
      // loop through array and get all values
      return attr.reduce(function (last, curr) {
        last[curr] = _this.attr(curr);
        return last;
      }, {});
    } else if (_typeof(attr) === 'object' && attr.constructor === Object) {
      // apply every attribute individually if an object is passed
      for (val in attr) {
        this.attr(val, attr[val]);
      }
    } else if (val === null) {
      // remove value
      this.node.removeAttribute(attr);
    } else if (val == null) {
      // act as a getter if the first and only argument is not an object
      val = this.node.getAttribute(attr);
      return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
    } else {
      // Loop through hooks and execute them to convert value
      val = hooks.reduce(function (_val, hook) {
        return hook(attr, _val, _this);
      }, val); // ensure correct numeric values (also accepts NaN and Infinity)

      if (typeof val === 'number') {
        val = new SVGNumber(val);
      } else if (Color.isColor(val)) {
        // ensure full hex color
        val = new Color(val);
      } else if (val.constructor === Array) {
        // Check for plain arrays and parse array values
        val = new SVGArray(val);
      } // if the passed attribute is leading...


      if (attr === 'leading') {
        // ... call the leading method instead
        if (this.leading) {
          this.leading(val);
        }
      } else {
        // set given attribute on node
        typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
      } // rebuild if required


      if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
        this.rebuild();
      }
    }

    return this;
  }

  var Dom =
  /*#__PURE__*/
  function (_EventTarget) {
    _inherits(Dom, _EventTarget);

    function Dom(node, attrs) {
      var _this2;

      _classCallCheck(this, Dom);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Dom).call(this, node));
      _this2.node = node;
      _this2.type = node.nodeName;

      if (attrs && node !== attrs) {
        _this2.attr(attrs);
      }

      return _this2;
    } // Add given element at a position


    _createClass(Dom, [{
      key: "add",
      value: function add(element, i) {
        element = makeInstance(element);

        if (i == null) {
          this.node.appendChild(element.node);
        } else if (element.node !== this.node.childNodes[i]) {
          this.node.insertBefore(element.node, this.node.childNodes[i]);
        }

        return this;
      } // Add element to given container and return self

    }, {
      key: "addTo",
      value: function addTo(parent) {
        return makeInstance(parent).put(this);
      } // Returns all child elements

    }, {
      key: "children",
      value: function children() {
        return new List(map(this.node.children, function (node) {
          return adopt(node);
        }));
      } // Remove all elements in this container

    }, {
      key: "clear",
      value: function clear() {
        // remove children
        while (this.node.hasChildNodes()) {
          this.node.removeChild(this.node.lastChild);
        }

        return this;
      } // Clone element

    }, {
      key: "clone",
      value: function clone() {
        // write dom data to the dom so the clone can pickup the data
        this.writeDataToDom(); // clone element and assign new id

        return assignNewId(this.node.cloneNode(true));
      } // Iterates over all children and invokes a given block

    }, {
      key: "each",
      value: function each(block, deep) {
        var children = this.children();
        var i, il;

        for (i = 0, il = children.length; i < il; i++) {
          block.apply(children[i], [i, children]);

          if (deep) {
            children[i].each(block, deep);
          }
        }

        return this;
      }
    }, {
      key: "element",
      value: function element(nodeName) {
        return this.put(new Dom(create(nodeName)));
      } // Get first child

    }, {
      key: "first",
      value: function first() {
        return adopt(this.node.firstChild);
      } // Get a element at the given index

    }, {
      key: "get",
      value: function get(i) {
        return adopt(this.node.childNodes[i]);
      }
    }, {
      key: "getEventHolder",
      value: function getEventHolder() {
        return this.node;
      }
    }, {
      key: "getEventTarget",
      value: function getEventTarget() {
        return this.node;
      } // Checks if the given element is a child

    }, {
      key: "has",
      value: function has(element) {
        return this.index(element) >= 0;
      } // Get / set id

    }, {
      key: "id",
      value: function id(_id) {
        // generate new id if no id set
        if (typeof _id === 'undefined' && !this.node.id) {
          this.node.id = eid(this.type);
        } // dont't set directly width this.node.id to make `null` work correctly


        return this.attr('id', _id);
      } // Gets index of given element

    }, {
      key: "index",
      value: function index(element) {
        return [].slice.call(this.node.childNodes).indexOf(element.node);
      } // Get the last child

    }, {
      key: "last",
      value: function last() {
        return adopt(this.node.lastChild);
      } // matches the element vs a css selector

    }, {
      key: "matches",
      value: function matches(selector) {
        var el = this.node;
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
      } // Returns the parent element instance

    }, {
      key: "parent",
      value: function parent(type) {
        var parent = this; // check for parent

        if (!parent.node.parentNode) return null; // get parent element

        parent = adopt(parent.node.parentNode);
        if (!type) return parent; // loop trough ancestors if type is given

        while (parent) {
          if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
          if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null; // #759, #720

          parent = adopt(parent.node.parentNode);
        }
      } // Basically does the same as `add()` but returns the added element instead

    }, {
      key: "put",
      value: function put(element, i) {
        this.add(element, i);
        return element;
      } // Add element to given container and return container

    }, {
      key: "putIn",
      value: function putIn(parent) {
        return makeInstance(parent).add(this);
      } // Remove element

    }, {
      key: "remove",
      value: function remove() {
        if (this.parent()) {
          this.parent().removeElement(this);
        }

        return this;
      } // Remove a given child

    }, {
      key: "removeElement",
      value: function removeElement(element) {
        this.node.removeChild(element.node);
        return this;
      } // Replace this with element

    }, {
      key: "replace",
      value: function replace(element) {
        element = makeInstance(element);
        this.node.parentNode.replaceChild(element.node, this.node);
        return element;
      }
    }, {
      key: "round",
      value: function round() {
        var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var map = arguments.length > 1 ? arguments[1] : undefined;
        var factor = Math.pow(10, precision);
        var attrs = this.attr(); // If we have no map, build one from attrs

        if (!map) {
          map = Object.keys(attrs);
        } // Holds rounded attributes


        var newAttrs = {};
        map.forEach(function (key) {
          newAttrs[key] = Math.round(attrs[key] * factor) / factor;
        });
        this.attr(newAttrs);
        return this;
      } // Return id on string conversion

    }, {
      key: "toString",
      value: function toString() {
        return this.id();
      } // Import raw svg

    }, {
      key: "svg",
      value: function svg(svgOrFn, outerHTML) {
        var well, len, fragment;

        if (svgOrFn === false) {
          outerHTML = false;
          svgOrFn = null;
        } // act as getter if no svg string is given


        if (svgOrFn == null || typeof svgOrFn === 'function') {
          // The default for exports is, that the outerNode is included
          outerHTML = outerHTML == null ? true : outerHTML; // write svgjs data to the dom

          this.writeDataToDom();
          var current = this; // An export modifier was passed

          if (svgOrFn != null) {
            current = adopt(current.node.cloneNode(true)); // If the user wants outerHTML we need to process this node, too

            if (outerHTML) {
              var result = svgOrFn(current);
              current = result || current; // The user does not want this node? Well, then he gets nothing

              if (result === false) return '';
            } // Deep loop through all children and apply modifier


            current.each(function () {
              var result = svgOrFn(this);

              var _this = result || this; // If modifier returns false, discard node


              if (result === false) {
                this.remove(); // If modifier returns new node, use it
              } else if (result && this !== _this) {
                this.replace(_this);
              }
            }, true);
          } // Return outer or inner content


          return outerHTML ? current.node.outerHTML : current.node.innerHTML;
        } // Act as setter if we got a string
        // The default for import is, that the current node is not replaced


        outerHTML = outerHTML == null ? false : outerHTML; // Create temporary holder

        well = globals.document.createElementNS(ns, 'svg');
        fragment = globals.document.createDocumentFragment(); // Dump raw svg

        well.innerHTML = svgOrFn; // Transplant nodes into the fragment

        for (len = well.children.length; len--;) {
          fragment.appendChild(well.firstElementChild);
        }

        var parent = this.parent(); // Add the whole fragment at once

        return outerHTML ? this.replace(fragment) && parent : this.add(fragment);
      }
    }, {
      key: "words",
      value: function words(text) {
        // This is faster than removing all children and adding a new one
        this.node.textContent = text;
        return this;
      } // write svgjs data to the dom

    }, {
      key: "writeDataToDom",
      value: function writeDataToDom() {
        // dump variables recursively
        this.each(function () {
          this.writeDataToDom();
        });
        return this;
      }
    }]);

    return Dom;
  }(EventTarget);
  extend(Dom, {
    attr: attr,
    find: find,
    findOne: findOne
  });
  register(Dom, 'Dom');

  var Element =
  /*#__PURE__*/
  function (_Dom) {
    _inherits(Element, _Dom);

    function Element(node, attrs) {
      var _this;

      _classCallCheck(this, Element);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Element).call(this, node, attrs)); // initialize data object

      _this.dom = {}; // create circular reference

      _this.node.instance = _assertThisInitialized(_this);

      if (node.hasAttribute('svgjs:data')) {
        // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
        _this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
      }

      return _this;
    } // Move element by its center


    _createClass(Element, [{
      key: "center",
      value: function center(x, y) {
        return this.cx(x).cy(y);
      } // Move by center over x-axis

    }, {
      key: "cx",
      value: function cx(x) {
        return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
      } // Move by center over y-axis

    }, {
      key: "cy",
      value: function cy(y) {
        return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
      } // Get defs

    }, {
      key: "defs",
      value: function defs() {
        return this.root().defs();
      } // Relative move over x and y axes

    }, {
      key: "dmove",
      value: function dmove(x, y) {
        return this.dx(x).dy(y);
      } // Relative move over x axis

    }, {
      key: "dx",
      value: function dx() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return this.x(new SVGNumber(x).plus(this.x()));
      } // Relative move over y axis

    }, {
      key: "dy",
      value: function dy() {
        var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return this.y(new SVGNumber(y).plus(this.y()));
      } // Get parent document

    }, {
      key: "root",
      value: function root$1() {
        var p = this.parent(getClass(root));
        return p && p.root();
      }
    }, {
      key: "getEventHolder",
      value: function getEventHolder() {
        return this;
      } // Set height of element

    }, {
      key: "height",
      value: function height(_height) {
        return this.attr('height', _height);
      } // Checks whether the given point inside the bounding box of the element

    }, {
      key: "inside",
      value: function inside(x, y) {
        var box = this.bbox();
        return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
      } // Move element to given x and y values

    }, {
      key: "move",
      value: function move(x, y) {
        return this.x(x).y(y);
      } // return array of all ancestors of given type up to the root svg

    }, {
      key: "parents",
      value: function parents() {
        var until = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globals.document;
        until = makeInstance(until);
        var parents = new List();
        var parent = this;

        while ((parent = parent.parent()) && parent.node !== until.node && parent.node !== globals.document) {
          parents.push(parent);
        }

        return parents;
      } // Get referenced element form attribute value

    }, {
      key: "reference",
      value: function reference$1(attr) {
        attr = this.attr(attr);
        if (!attr) return null;
        var m = attr.match(reference);
        return m ? makeInstance(m[1]) : null;
      } // set given data to the elements data property

    }, {
      key: "setData",
      value: function setData(o) {
        this.dom = o;
        return this;
      } // Set element size to given width and height

    }, {
      key: "size",
      value: function size(width, height) {
        var p = proportionalSize(this, width, height);
        return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
      } // Set width of element

    }, {
      key: "width",
      value: function width(_width) {
        return this.attr('width', _width);
      } // write svgjs data to the dom

    }, {
      key: "writeDataToDom",
      value: function writeDataToDom() {
        // remove previously set data
        this.node.removeAttribute('svgjs:data');

        if (Object.keys(this.dom).length) {
          this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
        }

        return _get(_getPrototypeOf(Element.prototype), "writeDataToDom", this).call(this);
      } // Move over x-axis

    }, {
      key: "x",
      value: function x(_x) {
        return this.attr('x', _x);
      } // Move over y-axis

    }, {
      key: "y",
      value: function y(_y) {
        return this.attr('y', _y);
      }
    }]);

    return Element;
  }(Dom);
  extend(Element, {
    bbox: bbox,
    rbox: rbox,
    point: point,
    ctm: ctm,
    screenCTM: screenCTM
  });
  register(Element, 'Element');

  var sugar = {
    stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
    fill: ['color', 'opacity', 'rule'],
    prefix: function prefix(t, a) {
      return a === 'color' ? t : t + '-' + a;
    }
  } // Add sugar for fill and stroke
  ;
  ['fill', 'stroke'].forEach(function (m) {
    var extension = {};
    var i;

    extension[m] = function (o) {
      if (typeof o === 'undefined') {
        return this.attr(m);
      }

      if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
        this.attr(m, o);
      } else {
        // set all attributes from sugar.fill and sugar.stroke list
        for (i = sugar[m].length - 1; i >= 0; i--) {
          if (o[sugar[m][i]] != null) {
            this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
          }
        }
      }

      return this;
    };

    registerMethods(['Element', 'Runner'], extension);
  });
  registerMethods(['Element', 'Runner'], {
    // Let the user set the matrix directly
    matrix: function matrix(mat, b, c, d, e, f) {
      // Act as a getter
      if (mat == null) {
        return new Matrix(this);
      } // Act as a setter, the user can pass a matrix or a set of numbers


      return this.attr('transform', new Matrix(mat, b, c, d, e, f));
    },
    // Map rotation to transform
    rotate: function rotate(angle, cx, cy) {
      return this.transform({
        rotate: angle,
        ox: cx,
        oy: cy
      }, true);
    },
    // Map skew to transform
    skew: function skew(x, y, cx, cy) {
      return arguments.length === 1 || arguments.length === 3 ? this.transform({
        skew: x,
        ox: y,
        oy: cx
      }, true) : this.transform({
        skew: [x, y],
        ox: cx,
        oy: cy
      }, true);
    },
    shear: function shear(lam, cx, cy) {
      return this.transform({
        shear: lam,
        ox: cx,
        oy: cy
      }, true);
    },
    // Map scale to transform
    scale: function scale(x, y, cx, cy) {
      return arguments.length === 1 || arguments.length === 3 ? this.transform({
        scale: x,
        ox: y,
        oy: cx
      }, true) : this.transform({
        scale: [x, y],
        ox: cx,
        oy: cy
      }, true);
    },
    // Map translate to transform
    translate: function translate(x, y) {
      return this.transform({
        translate: [x, y]
      }, true);
    },
    // Map relative translations to transform
    relative: function relative(x, y) {
      return this.transform({
        relative: [x, y]
      }, true);
    },
    // Map flip to transform
    flip: function flip(direction, around) {
      var directionString = typeof direction === 'string' ? direction : isFinite(direction) ? 'both' : 'both';
      var origin = direction === 'both' && isFinite(around) ? [around, around] : direction === 'x' ? [around, 0] : direction === 'y' ? [0, around] : isFinite(direction) ? [direction, direction] : [0, 0];
      return this.transform({
        flip: directionString,
        origin: origin
      }, true);
    },
    // Opacity
    opacity: function opacity(value) {
      return this.attr('opacity', value);
    }
  });
  registerMethods('radius', {
    // Add x and y radius
    radius: function radius(x, y) {
      var type = (this._element || this).type;
      return type === 'radialGradient' || type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y == null ? x : y);
    }
  });
  registerMethods('Path', {
    // Get path length
    length: function length() {
      return this.node.getTotalLength();
    },
    // Get point at length
    pointAt: function pointAt(length) {
      return new Point(this.node.getPointAtLength(length));
    }
  });
  registerMethods(['Element', 'Runner'], {
    // Set font
    font: function font(a, v) {
      if (_typeof(a) === 'object') {
        for (v in a) {
          this.font(v, a[v]);
        }

        return this;
      }

      return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
    }
  });
  registerMethods('Text', {
    ax: function ax(x) {
      return this.attr('x', x);
    },
    ay: function ay(y) {
      return this.attr('y', y);
    },
    amove: function amove(x, y) {
      return this.ax(x).ay(y);
    }
  }); // Add events to elements

  var methods$1 = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].reduce(function (last, event) {
    // add event to Element
    var fn = function fn(f) {
      if (f === null) {
        off(this, event);
      } else {
        on(this, event, f);
      }

      return this;
    };

    last[event] = fn;
    return last;
  }, {});
  registerMethods('Element', methods$1);

  var nativeReverse = [].reverse;
  var test$1 = [1, 2];

  // `Array.prototype.reverse` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reverse
  // fix for Safari 12.0 bug
  // https://bugs.webkit.org/show_bug.cgi?id=188794
  _export({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
    reverse: function reverse() {
      // eslint-disable-next-line no-self-assign
      if (isArray(this)) this.length = this.length;
      return nativeReverse.call(this);
    }
  });

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
    defineProperties: objectDefineProperties
  });

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
    defineProperty: objectDefineProperty.f
  });

  var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


  var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
  var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES$2;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  _export({ target: 'Object', stat: true, forced: FORCED$3, sham: !descriptors }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
    }
  });

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  _export({ target: 'Object', stat: true, sham: !descriptors }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject(object);
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var keys = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty(result, key, descriptor);
      }
      return result;
    }
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function untransform() {
    return this.attr('transform', null);
  } // merge the whole transformation chain into one matrix and returns it

  function matrixify() {
    var matrix = (this.attr('transform') || ''). // split transformations
    split(transforms).slice(0, -1).map(function (str) {
      // generate key => value pairs
      var kv = str.trim().split('(');
      return [kv[0], kv[1].split(delimiter).map(function (str) {
        return parseFloat(str);
      })];
    }).reverse() // merge every transformation into one matrix
    .reduce(function (matrix, transform) {
      if (transform[0] === 'matrix') {
        return matrix.lmultiply(Matrix.fromArray(transform[1]));
      }

      return matrix[transform[0]].apply(matrix, transform[1]);
    }, new Matrix());
    return matrix;
  } // add an element to another parent without changing the visual representation on the screen

  function toParent(parent) {
    if (this === parent) return this;
    var ctm = this.screenCTM();
    var pCtm = parent.screenCTM().inverse();
    this.addTo(parent).untransform().transform(pCtm.multiply(ctm));
    return this;
  } // same as above with parent equals root-svg

  function toRoot() {
    return this.toParent(this.root());
  } // Add transformations

  function transform(o, relative) {
    // Act as a getter if no object was passed
    if (o == null || typeof o === 'string') {
      var decomposed = new Matrix(this).decompose();
      return o == null ? decomposed : decomposed[o];
    }

    if (!Matrix.isMatrixLike(o)) {
      // Set the origin according to the defined transform
      o = _objectSpread({}, o, {
        origin: getOrigin(o, this)
      });
    } // The user can pass a boolean, an Element or an Matrix or nothing


    var cleanRelative = relative === true ? this : relative || false;
    var result = new Matrix(cleanRelative).transform(o);
    return this.attr('transform', result);
  }
  registerMethods('Element', {
    untransform: untransform,
    matrixify: matrixify,
    toParent: toParent,
    toRoot: toRoot,
    transform: transform
  });

  function rx(rx) {
    return this.attr('rx', rx);
  } // Radius y value

  function ry(ry) {
    return this.attr('ry', ry);
  } // Move over x-axis

  function x(x) {
    return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
  } // Move over y-axis

  function y(y) {
    return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
  } // Move by center over x-axis

  function cx(x) {
    return x == null ? this.attr('cx') : this.attr('cx', x);
  } // Move by center over y-axis

  function cy(y) {
    return y == null ? this.attr('cy') : this.attr('cy', y);
  } // Set width of element

  function width(width) {
    return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
  } // Set height of element

  function height(height) {
    return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
  }

  var circled = ({
  	__proto__: null,
  	rx: rx,
  	ry: ry,
  	x: x,
  	y: y,
  	cx: cx,
  	cy: cy,
  	width: width,
  	height: height
  });

  var Shape =
  /*#__PURE__*/
  function (_Element) {
    _inherits(Shape, _Element);

    function Shape() {
      _classCallCheck(this, Shape);

      return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
    }

    return Shape;
  }(Element);
  register(Shape, 'Shape');

  var Circle =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Circle, _Shape);

    function Circle(node) {
      _classCallCheck(this, Circle);

      return _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, nodeOrNew('circle', node), node));
    }

    _createClass(Circle, [{
      key: "radius",
      value: function radius(r) {
        return this.attr('r', r);
      } // Radius x value

    }, {
      key: "rx",
      value: function rx(_rx) {
        return this.attr('r', _rx);
      } // Alias radius x value

    }, {
      key: "ry",
      value: function ry(_ry) {
        return this.rx(_ry);
      }
    }, {
      key: "size",
      value: function size(_size) {
        return this.radius(new SVGNumber(_size).divide(2));
      }
    }]);

    return Circle;
  }(Shape);
  extend(Circle, {
    x: x,
    y: y,
    cx: cx,
    cy: cy,
    width: width,
    height: height
  });
  registerMethods({
    Container: {
      // Create circle element
      circle: wrapWithAttrCheck(function (size) {
        return this.put(new Circle()).size(size).move(0, 0);
      })
    }
  });
  register(Circle, 'Circle');

  var Container =
  /*#__PURE__*/
  function (_Element) {
    _inherits(Container, _Element);

    function Container() {
      _classCallCheck(this, Container);

      return _possibleConstructorReturn(this, _getPrototypeOf(Container).apply(this, arguments));
    }

    _createClass(Container, [{
      key: "flatten",
      value: function flatten(parent) {
        this.each(function () {
          if (this instanceof Container) return this.flatten(parent).ungroup(parent);
          return this.toParent(parent);
        }); // we need this so that the root does not get removed

        this.node.firstElementChild || this.remove();
        return this;
      }
    }, {
      key: "ungroup",
      value: function ungroup(parent) {
        parent = parent || this.parent();
        this.each(function () {
          return this.toParent(parent);
        });
        this.remove();
        return this;
      }
    }]);

    return Container;
  }(Element);
  register(Container, 'Container');

  var Defs =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Defs, _Container);

    function Defs(node) {
      _classCallCheck(this, Defs);

      return _possibleConstructorReturn(this, _getPrototypeOf(Defs).call(this, nodeOrNew('defs', node), node));
    }

    _createClass(Defs, [{
      key: "flatten",
      value: function flatten() {
        return this;
      }
    }, {
      key: "ungroup",
      value: function ungroup() {
        return this;
      }
    }]);

    return Defs;
  }(Container);
  register(Defs, 'Defs');

  var Ellipse =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Ellipse, _Shape);

    function Ellipse(node) {
      _classCallCheck(this, Ellipse);

      return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).call(this, nodeOrNew('ellipse', node), node));
    }

    _createClass(Ellipse, [{
      key: "size",
      value: function size(width, height) {
        var p = proportionalSize(this, width, height);
        return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
      }
    }]);

    return Ellipse;
  }(Shape);
  extend(Ellipse, circled);
  registerMethods('Container', {
    // Create an ellipse
    ellipse: wrapWithAttrCheck(function () {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
      return this.put(new Ellipse()).size(width, height).move(0, 0);
    })
  });
  register(Ellipse, 'Ellipse');

  var Stop =
  /*#__PURE__*/
  function (_Element) {
    _inherits(Stop, _Element);

    function Stop(node) {
      _classCallCheck(this, Stop);

      return _possibleConstructorReturn(this, _getPrototypeOf(Stop).call(this, nodeOrNew('stop', node), node));
    } // add color stops


    _createClass(Stop, [{
      key: "update",
      value: function update(o) {
        if (typeof o === 'number' || o instanceof SVGNumber) {
          o = {
            offset: arguments[0],
            color: arguments[1],
            opacity: arguments[2]
          };
        } // set attributes


        if (o.opacity != null) this.attr('stop-opacity', o.opacity);
        if (o.color != null) this.attr('stop-color', o.color);
        if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
        return this;
      }
    }]);

    return Stop;
  }(Element);
  register(Stop, 'Stop');

  function from(x, y) {
    return (this._element || this).type === 'radialGradient' ? this.attr({
      fx: new SVGNumber(x),
      fy: new SVGNumber(y)
    }) : this.attr({
      x1: new SVGNumber(x),
      y1: new SVGNumber(y)
    });
  }
  function to(x, y) {
    return (this._element || this).type === 'radialGradient' ? this.attr({
      cx: new SVGNumber(x),
      cy: new SVGNumber(y)
    }) : this.attr({
      x2: new SVGNumber(x),
      y2: new SVGNumber(y)
    });
  }

  var gradiented = ({
  	__proto__: null,
  	from: from,
  	to: to
  });

  var Gradient =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Gradient, _Container);

    function Gradient(type, attrs) {
      _classCallCheck(this, Gradient);

      return _possibleConstructorReturn(this, _getPrototypeOf(Gradient).call(this, nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs));
    } // Add a color stop


    _createClass(Gradient, [{
      key: "stop",
      value: function stop(offset, color, opacity) {
        return this.put(new Stop()).update(offset, color, opacity);
      } // Update gradient

    }, {
      key: "update",
      value: function update(block) {
        // remove all stops
        this.clear(); // invoke passed block

        if (typeof block === 'function') {
          block.call(this, this);
        }

        return this;
      } // Return the fill id

    }, {
      key: "url",
      value: function url() {
        return 'url(#' + this.id() + ')';
      } // Alias string convertion to fill

    }, {
      key: "toString",
      value: function toString() {
        return this.url();
      } // custom attr to handle transform

    }, {
      key: "attr",
      value: function attr(a, b, c) {
        if (a === 'transform') a = 'gradientTransform';
        return _get(_getPrototypeOf(Gradient.prototype), "attr", this).call(this, a, b, c);
      }
    }, {
      key: "targets",
      value: function targets() {
        return baseFind('svg [fill*="' + this.id() + '"]');
      }
    }, {
      key: "bbox",
      value: function bbox() {
        return new Box();
      }
    }]);

    return Gradient;
  }(Container);
  extend(Gradient, gradiented);
  registerMethods({
    Container: {
      // Create gradient element in defs
      gradient: wrapWithAttrCheck(function (type, block) {
        return this.defs().gradient(type, block);
      })
    },
    // define gradient
    Defs: {
      gradient: wrapWithAttrCheck(function (type, block) {
        return this.put(new Gradient(type)).update(block);
      })
    }
  });
  register(Gradient, 'Gradient');

  var Pattern =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Pattern, _Container);

    // Initialize node
    function Pattern(node) {
      _classCallCheck(this, Pattern);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pattern).call(this, nodeOrNew('pattern', node), node));
    } // Return the fill id


    _createClass(Pattern, [{
      key: "url",
      value: function url() {
        return 'url(#' + this.id() + ')';
      } // Update pattern by rebuilding

    }, {
      key: "update",
      value: function update(block) {
        // remove content
        this.clear(); // invoke passed block

        if (typeof block === 'function') {
          block.call(this, this);
        }

        return this;
      } // Alias string convertion to fill

    }, {
      key: "toString",
      value: function toString() {
        return this.url();
      } // custom attr to handle transform

    }, {
      key: "attr",
      value: function attr(a, b, c) {
        if (a === 'transform') a = 'patternTransform';
        return _get(_getPrototypeOf(Pattern.prototype), "attr", this).call(this, a, b, c);
      }
    }, {
      key: "targets",
      value: function targets() {
        return baseFind('svg [fill*="' + this.id() + '"]');
      }
    }, {
      key: "bbox",
      value: function bbox() {
        return new Box();
      }
    }]);

    return Pattern;
  }(Container);
  registerMethods({
    Container: {
      // Create pattern element in defs
      pattern: function pattern() {
        var _this$defs;

        return (_this$defs = this.defs()).pattern.apply(_this$defs, arguments);
      }
    },
    Defs: {
      pattern: wrapWithAttrCheck(function (width, height, block) {
        return this.put(new Pattern()).update(block).attr({
          x: 0,
          y: 0,
          width: width,
          height: height,
          patternUnits: 'userSpaceOnUse'
        });
      })
    }
  });
  register(Pattern, 'Pattern');

  var Image =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Image, _Shape);

    function Image(node) {
      _classCallCheck(this, Image);

      return _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, nodeOrNew('image', node), node));
    } // (re)load image


    _createClass(Image, [{
      key: "load",
      value: function load(url, callback) {
        if (!url) return this;
        var img = new globals.window.Image();
        on(img, 'load', function (e) {
          var p = this.parent(Pattern); // ensure image size

          if (this.width() === 0 && this.height() === 0) {
            this.size(img.width, img.height);
          }

          if (p instanceof Pattern) {
            // ensure pattern size if not set
            if (p.width() === 0 && p.height() === 0) {
              p.size(this.width(), this.height());
            }
          }

          if (typeof callback === 'function') {
            callback.call(this, e);
          }
        }, this);
        on(img, 'load error', function () {
          // dont forget to unbind memory leaking events
          off(img);
        });
        return this.attr('href', img.src = url, xlink);
      }
    }]);

    return Image;
  }(Shape);
  registerAttrHook(function (attr, val, _this) {
    // convert image fill and stroke to patterns
    if (attr === 'fill' || attr === 'stroke') {
      if (isImage.test(val)) {
        val = _this.root().defs().image(val);
      }
    }

    if (val instanceof Image) {
      val = _this.root().defs().pattern(0, 0, function (pattern) {
        pattern.add(val);
      });
    }

    return val;
  });
  registerMethods({
    Container: {
      // create image element, load image and set its size
      image: wrapWithAttrCheck(function (source, callback) {
        return this.put(new Image()).size(0, 0).load(source, callback);
      })
    }
  });
  register(Image, 'Image');

  var PointArray = subClassArray('PointArray', SVGArray);
  extend(PointArray, {
    // Convert array to string
    toString: function toString() {
      // convert to a poly point string
      for (var i = 0, il = this.length, array = []; i < il; i++) {
        array.push(this[i].join(','));
      }

      return array.join(' ');
    },
    // Convert array to line object
    toLine: function toLine() {
      return {
        x1: this[0][0],
        y1: this[0][1],
        x2: this[1][0],
        y2: this[1][1]
      };
    },
    // Get morphed array at given position
    at: function at(pos) {
      // make sure a destination is defined
      if (!this.destination) return this; // generate morphed point string

      for (var i = 0, il = this.length, array = []; i < il; i++) {
        array.push([this[i][0] + (this.destination[i][0] - this[i][0]) * pos, this[i][1] + (this.destination[i][1] - this[i][1]) * pos]);
      }

      return new PointArray(array);
    },
    // Parse point string and flat array
    parse: function parse() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[0, 0]];
      var points = []; // if it is an array

      if (array instanceof Array) {
        // and it is not flat, there is no need to parse it
        if (array[0] instanceof Array) {
          return array;
        }
      } else {
        // Else, it is considered as a string
        // parse points
        array = array.trim().split(delimiter).map(parseFloat);
      } // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
      // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.


      if (array.length % 2 !== 0) array.pop(); // wrap points in two-tuples

      for (var i = 0, len = array.length; i < len; i = i + 2) {
        points.push([array[i], array[i + 1]]);
      }

      return points;
    },
    // transform points with matrix (similar to Point.transform)
    transform: function transform(m) {
      var points = [];

      for (var i = 0; i < this.length; i++) {
        var point = this[i]; // Perform the matrix multiplication

        points.push([m.a * point[0] + m.c * point[1] + m.e, m.b * point[0] + m.d * point[1] + m.f]);
      } // Return the required point


      return new PointArray(points);
    },
    // Move point string
    move: function move(x, y) {
      var box = this.bbox(); // get relative offset

      x -= box.x;
      y -= box.y; // move every point

      if (!isNaN(x) && !isNaN(y)) {
        for (var i = this.length - 1; i >= 0; i--) {
          this[i] = [this[i][0] + x, this[i][1] + y];
        }
      }

      return this;
    },
    // Resize poly string
    size: function size(width, height) {
      var i;
      var box = this.bbox(); // recalculate position of all points according to new size

      for (i = this.length - 1; i >= 0; i--) {
        if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
        if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
      }

      return this;
    },
    // Get bounding box of points
    bbox: function bbox() {
      var maxX = -Infinity;
      var maxY = -Infinity;
      var minX = Infinity;
      var minY = Infinity;
      this.forEach(function (el) {
        maxX = Math.max(el[0], maxX);
        maxY = Math.max(el[1], maxY);
        minX = Math.min(el[0], minX);
        minY = Math.min(el[1], minY);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }
  });

  var MorphArray = PointArray; // Move by left top corner over x-axis

  function x$1(x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y);
  } // Move by left top corner over y-axis

  function y$1(y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y);
  } // Set width of element

  function width$1(width) {
    var b = this.bbox();
    return width == null ? b.width : this.size(width, b.height);
  } // Set height of element

  function height$1(height) {
    var b = this.bbox();
    return height == null ? b.height : this.size(b.width, height);
  }

  var pointed = ({
  	__proto__: null,
  	MorphArray: MorphArray,
  	x: x$1,
  	y: y$1,
  	width: width$1,
  	height: height$1
  });

  var Line =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Line, _Shape);

    // Initialize node
    function Line(node) {
      _classCallCheck(this, Line);

      return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, nodeOrNew('line', node), node));
    } // Get array


    _createClass(Line, [{
      key: "array",
      value: function array() {
        return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
      } // Overwrite native plot() method

    }, {
      key: "plot",
      value: function plot(x1, y1, x2, y2) {
        if (x1 == null) {
          return this.array();
        } else if (typeof y1 !== 'undefined') {
          x1 = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
          };
        } else {
          x1 = new PointArray(x1).toLine();
        }

        return this.attr(x1);
      } // Move by left top corner

    }, {
      key: "move",
      value: function move(x, y) {
        return this.attr(this.array().move(x, y).toLine());
      } // Set element size to given width and height

    }, {
      key: "size",
      value: function size(width, height) {
        var p = proportionalSize(this, width, height);
        return this.attr(this.array().size(p.width, p.height).toLine());
      }
    }]);

    return Line;
  }(Shape);
  extend(Line, pointed);
  registerMethods({
    Container: {
      // Create a line element
      line: wrapWithAttrCheck(function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // make sure plot is called as a setter
        // x1 is not necessarily a number, it can also be an array, a string and a PointArray
        return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
      })
    }
  });
  register(Line, 'Line');

  var Marker =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Marker, _Container);

    // Initialize node
    function Marker(node) {
      _classCallCheck(this, Marker);

      return _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, nodeOrNew('marker', node), node));
    } // Set width of element


    _createClass(Marker, [{
      key: "width",
      value: function width(_width) {
        return this.attr('markerWidth', _width);
      } // Set height of element

    }, {
      key: "height",
      value: function height(_height) {
        return this.attr('markerHeight', _height);
      } // Set marker refX and refY

    }, {
      key: "ref",
      value: function ref(x, y) {
        return this.attr('refX', x).attr('refY', y);
      } // Update marker

    }, {
      key: "update",
      value: function update(block) {
        // remove all content
        this.clear(); // invoke passed block

        if (typeof block === 'function') {
          block.call(this, this);
        }

        return this;
      } // Return the fill id

    }, {
      key: "toString",
      value: function toString() {
        return 'url(#' + this.id() + ')';
      }
    }]);

    return Marker;
  }(Container);
  registerMethods({
    Container: {
      marker: function marker() {
        var _this$defs;

        // Create marker element in defs
        return (_this$defs = this.defs()).marker.apply(_this$defs, arguments);
      }
    },
    Defs: {
      // Create marker
      marker: wrapWithAttrCheck(function (width, height, block) {
        // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
        return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
      })
    },
    marker: {
      // Create and attach markers
      marker: function marker(_marker, width, height, block) {
        var attr = ['marker']; // Build attribute name

        if (_marker !== 'all') attr.push(_marker);
        attr = attr.join('-'); // Set marker attribute

        _marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
        return this.attr(attr, _marker);
      }
    }
  });
  register(Marker, 'Marker');

  var nativeSort = [].sort;
  var test$2 = [1, 2, 3];

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function () {
    test$2.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function () {
    test$2.sort(null);
  });
  // Old WebKit
  var SLOPPY_METHOD$2 = sloppyArrayMethod('sort');

  var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$2;

  // `Array.prototype.sort` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.sort
  _export({ target: 'Array', proto: true, forced: FORCED$4 }, {
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? nativeSort.call(toObject(this))
        : nativeSort.call(toObject(this), aFunction$1(comparefn));
    }
  });

  /***
  Base Class
  ==========
  The base stepper class that will be
  ***/

  function makeSetterGetter(k, f) {
    return function (v) {
      if (v == null) return this[v];
      this[k] = v;
      if (f) f.call(this);
      return this;
    };
  }

  var easing = {
    '-': function _(pos) {
      return pos;
    },
    '<>': function _(pos) {
      return -Math.cos(pos * Math.PI) / 2 + 0.5;
    },
    '>': function _(pos) {
      return Math.sin(pos * Math.PI / 2);
    },
    '<': function _(pos) {
      return -Math.cos(pos * Math.PI / 2) + 1;
    },
    bezier: function bezier(x1, y1, x2, y2) {
      // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
      return function (t) {
        if (t < 0) {
          if (x1 > 0) {
            return y1 / x1 * t;
          } else if (x2 > 0) {
            return y2 / x2 * t;
          } else {
            return 0;
          }
        } else if (t > 1) {
          if (x2 < 1) {
            return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
          } else if (x1 < 1) {
            return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
          } else {
            return 1;
          }
        } else {
          return 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3);
        }
      };
    },
    // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
    steps: function steps(_steps) {
      var stepPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';
      // deal with "jump-" prefix
      stepPosition = stepPosition.split('-').reverse()[0];
      var jumps = _steps;

      if (stepPosition === 'none') {
        --jumps;
      } else if (stepPosition === 'both') {
        ++jumps;
      } // The beforeFlag is essentially useless


      return function (t) {
        var beforeFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        // Step is called currentStep in referenced url
        var step = Math.floor(t * _steps);
        var jumping = t * step % 1 === 0;

        if (stepPosition === 'start' || stepPosition === 'both') {
          ++step;
        }

        if (beforeFlag && jumping) {
          --step;
        }

        if (t >= 0 && step < 0) {
          step = 0;
        }

        if (t <= 1 && step > jumps) {
          step = jumps;
        }

        return step / jumps;
      };
    }
  };
  var Stepper =
  /*#__PURE__*/
  function () {
    function Stepper() {
      _classCallCheck(this, Stepper);
    }

    _createClass(Stepper, [{
      key: "done",
      value: function done() {
        return false;
      }
    }]);

    return Stepper;
  }();
  /***
  Easing Functions
  ================
  ***/

  var Ease =
  /*#__PURE__*/
  function (_Stepper) {
    _inherits(Ease, _Stepper);

    function Ease(fn) {
      var _this;

      _classCallCheck(this, Ease);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Ease).call(this));
      _this.ease = easing[fn || timeline.ease] || fn;
      return _this;
    }

    _createClass(Ease, [{
      key: "step",
      value: function step(from, to, pos) {
        if (typeof from !== 'number') {
          return pos < 1 ? from : to;
        }

        return from + (to - from) * this.ease(pos);
      }
    }]);

    return Ease;
  }(Stepper);
  /***
  Controller Types
  ================
  ***/

  var Controller =
  /*#__PURE__*/
  function (_Stepper2) {
    _inherits(Controller, _Stepper2);

    function Controller(fn) {
      var _this2;

      _classCallCheck(this, Controller);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Controller).call(this));
      _this2.stepper = fn;
      return _this2;
    }

    _createClass(Controller, [{
      key: "step",
      value: function step(current, target, dt, c) {
        return this.stepper(current, target, dt, c);
      }
    }, {
      key: "done",
      value: function done(c) {
        return c.done;
      }
    }]);

    return Controller;
  }(Stepper);

  function recalculate() {
    // Apply the default parameters
    var duration = (this._duration || 500) / 1000;
    var overshoot = this._overshoot || 0; // Calculate the PID natural response

    var eps = 1e-10;
    var pi = Math.PI;
    var os = Math.log(overshoot / 100 + eps);
    var zeta = -os / Math.sqrt(pi * pi + os * os);
    var wn = 3.9 / (zeta * duration); // Calculate the Spring values

    this.d = 2 * zeta * wn;
    this.k = wn * wn;
  }

  var Spring =
  /*#__PURE__*/
  function (_Controller) {
    _inherits(Spring, _Controller);

    function Spring(duration, overshoot) {
      var _this3;

      _classCallCheck(this, Spring);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Spring).call(this));

      _this3.duration(duration || 500).overshoot(overshoot || 0);

      return _this3;
    }

    _createClass(Spring, [{
      key: "step",
      value: function step(current, target, dt, c) {
        if (typeof current === 'string') return current;
        c.done = dt === Infinity;
        if (dt === Infinity) return target;
        if (dt === 0) return current;
        if (dt > 100) dt = 16;
        dt /= 1000; // Get the previous velocity

        var velocity = c.velocity || 0; // Apply the control to get the new position and store it

        var acceleration = -this.d * velocity - this.k * (current - target);
        var newPosition = current + velocity * dt + acceleration * dt * dt / 2; // Store the velocity

        c.velocity = velocity + acceleration * dt; // Figure out if we have converged, and if so, pass the value

        c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
        return c.done ? target : newPosition;
      }
    }]);

    return Spring;
  }(Controller);
  extend(Spring, {
    duration: makeSetterGetter('_duration', recalculate),
    overshoot: makeSetterGetter('_overshoot', recalculate)
  });
  var PID =
  /*#__PURE__*/
  function (_Controller2) {
    _inherits(PID, _Controller2);

    function PID(p, i, d, windup) {
      var _this4;

      _classCallCheck(this, PID);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(PID).call(this));
      p = p == null ? 0.1 : p;
      i = i == null ? 0.01 : i;
      d = d == null ? 0 : d;
      windup = windup == null ? 1000 : windup;

      _this4.p(p).i(i).d(d).windup(windup);

      return _this4;
    }

    _createClass(PID, [{
      key: "step",
      value: function step(current, target, dt, c) {
        if (typeof current === 'string') return current;
        c.done = dt === Infinity;
        if (dt === Infinity) return target;
        if (dt === 0) return current;
        var p = target - current;
        var i = (c.integral || 0) + p * dt;
        var d = (p - (c.error || 0)) / dt;
        var windup = this.windup; // antiwindup

        if (windup !== false) {
          i = Math.max(-windup, Math.min(i, windup));
        }

        c.error = p;
        c.integral = i;
        c.done = Math.abs(p) < 0.001;
        return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
      }
    }]);

    return PID;
  }(Controller);
  extend(PID, {
    windup: makeSetterGetter('windup'),
    p: makeSetterGetter('P'),
    i: makeSetterGetter('I'),
    d: makeSetterGetter('D')
  });

  var PathArray = subClassArray('PathArray', SVGArray);
  function pathRegReplace(a, b, c, d) {
    return c + d.replace(dots, ' .');
  }

  function arrayToString(a) {
    for (var i = 0, il = a.length, s = ''; i < il; i++) {
      s += a[i][0];

      if (a[i][1] != null) {
        s += a[i][1];

        if (a[i][2] != null) {
          s += ' ';
          s += a[i][2];

          if (a[i][3] != null) {
            s += ' ';
            s += a[i][3];
            s += ' ';
            s += a[i][4];

            if (a[i][5] != null) {
              s += ' ';
              s += a[i][5];
              s += ' ';
              s += a[i][6];

              if (a[i][7] != null) {
                s += ' ';
                s += a[i][7];
              }
            }
          }
        }
      }
    }

    return s + ' ';
  }

  var pathHandlers = {
    M: function M(c, p, p0) {
      p.x = p0.x = c[0];
      p.y = p0.y = c[1];
      return ['M', p.x, p.y];
    },
    L: function L(c, p) {
      p.x = c[0];
      p.y = c[1];
      return ['L', c[0], c[1]];
    },
    H: function H(c, p) {
      p.x = c[0];
      return ['H', c[0]];
    },
    V: function V(c, p) {
      p.y = c[0];
      return ['V', c[0]];
    },
    C: function C(c, p) {
      p.x = c[4];
      p.y = c[5];
      return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
    },
    S: function S(c, p) {
      p.x = c[2];
      p.y = c[3];
      return ['S', c[0], c[1], c[2], c[3]];
    },
    Q: function Q(c, p) {
      p.x = c[2];
      p.y = c[3];
      return ['Q', c[0], c[1], c[2], c[3]];
    },
    T: function T(c, p) {
      p.x = c[0];
      p.y = c[1];
      return ['T', c[0], c[1]];
    },
    Z: function Z(c, p, p0) {
      p.x = p0.x;
      p.y = p0.y;
      return ['Z'];
    },
    A: function A(c, p) {
      p.x = c[5];
      p.y = c[6];
      return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
    }
  };
  var mlhvqtcsaz = 'mlhvqtcsaz'.split('');

  for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
    pathHandlers[mlhvqtcsaz[i]] = function (i) {
      return function (c, p, p0) {
        if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
          c[5] = c[5] + p.x;
          c[6] = c[6] + p.y;
        } else {
          for (var j = 0, jl = c.length; j < jl; ++j) {
            c[j] = c[j] + (j % 2 ? p.y : p.x);
          }
        }
        return pathHandlers[i](c, p, p0);
      };
    }(mlhvqtcsaz[i].toUpperCase());
  }

  extend(PathArray, {
    // Convert array to string
    toString: function toString() {
      return arrayToString(this);
    },
    // Move path string
    move: function move(x, y) {
      // get bounding box of current situation
      var box = this.bbox(); // get relative offset

      x -= box.x;
      y -= box.y;

      if (!isNaN(x) && !isNaN(y)) {
        // move every point
        for (var l, i = this.length - 1; i >= 0; i--) {
          l = this[i][0];

          if (l === 'M' || l === 'L' || l === 'T') {
            this[i][1] += x;
            this[i][2] += y;
          } else if (l === 'H') {
            this[i][1] += x;
          } else if (l === 'V') {
            this[i][1] += y;
          } else if (l === 'C' || l === 'S' || l === 'Q') {
            this[i][1] += x;
            this[i][2] += y;
            this[i][3] += x;
            this[i][4] += y;

            if (l === 'C') {
              this[i][5] += x;
              this[i][6] += y;
            }
          } else if (l === 'A') {
            this[i][6] += x;
            this[i][7] += y;
          }
        }
      }

      return this;
    },
    // Resize path string
    size: function size(width, height) {
      // get bounding box of current situation
      var box = this.bbox();
      var i, l; // If the box width or height is 0 then we ignore
      // transformations on the respective axis

      box.width = box.width === 0 ? 1 : box.width;
      box.height = box.height === 0 ? 1 : box.height; // recalculate position of all points according to new size

      for (i = this.length - 1; i >= 0; i--) {
        l = this[i][0];

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
          this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
        } else if (l === 'H') {
          this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        } else if (l === 'V') {
          this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
          this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
          this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
          this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;

          if (l === 'C') {
            this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
            this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
          }
        } else if (l === 'A') {
          // resize radii
          this[i][1] = this[i][1] * width / box.width;
          this[i][2] = this[i][2] * height / box.height; // move position values

          this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
          this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
        }
      }

      return this;
    },
    // Test if the passed path array use the same path data commands as this path array
    equalCommands: function equalCommands(pathArray) {
      var i, il, equalCommands;
      pathArray = new PathArray(pathArray);
      equalCommands = this.length === pathArray.length;

      for (i = 0, il = this.length; equalCommands && i < il; i++) {
        equalCommands = this[i][0] === pathArray[i][0];
      }

      return equalCommands;
    },
    // Make path array morphable
    morph: function morph(pathArray) {
      pathArray = new PathArray(pathArray);

      if (this.equalCommands(pathArray)) {
        this.destination = pathArray;
      } else {
        this.destination = null;
      }

      return this;
    },
    // Get morphed path array at given position
    at: function at(pos) {
      // make sure a destination is defined
      if (!this.destination) return this;
      var sourceArray = this;
      var destinationArray = this.destination.value;
      var array = [];
      var pathArray = new PathArray();
      var i, il, j, jl; // Animate has specified in the SVG spec
      // See: https://www.w3.org/TR/SVG11/paths.html#PathElement

      for (i = 0, il = sourceArray.length; i < il; i++) {
        array[i] = [sourceArray[i][0]];

        for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
          array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
        } // For the two flags of the elliptical arc command, the SVG spec say:
        // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
        // Elliptical arc command as an array followed by corresponding indexes:
        // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
        //   0    1   2        3                 4             5      6  7


        if (array[i][0] === 'A') {
          array[i][4] = +(array[i][4] !== 0);
          array[i][5] = +(array[i][5] !== 0);
        }
      } // Directly modify the value of a path array, this is done this way for performance


      pathArray.value = array;
      return pathArray;
    },
    // Absolutize and parse path to array
    parse: function parse() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [['M', 0, 0]];
      // if it's already a patharray, no need to parse it
      if (array instanceof PathArray) return array; // prepare for parsing

      var s;
      var paramCnt = {
        M: 2,
        L: 2,
        H: 1,
        V: 1,
        C: 6,
        S: 4,
        Q: 4,
        T: 2,
        A: 7,
        Z: 0
      };

      if (typeof array === 'string') {
        array = array.replace(numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
        .replace(pathLetters, ' $& ') // put some room between letters and numbers
        .replace(hyphen, '$1 -') // add space before hyphen
        .trim() // trim
        .split(delimiter); // split into array
      } else {
        array = array.reduce(function (prev, curr) {
          return [].concat.call(prev, curr);
        }, []);
      } // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]


      var result = [];
      var p = new Point();
      var p0 = new Point();
      var index = 0;
      var len = array.length;

      do {
        // Test if we have a path letter
        if (isPathLetter.test(array[index])) {
          s = array[index];
          ++index; // If last letter was a move command and we got no new, it defaults to [L]ine
        } else if (s === 'M') {
          s = 'L';
        } else if (s === 'm') {
          s = 'l';
        }

        result.push(pathHandlers[s].call(null, array.slice(index, index = index + paramCnt[s.toUpperCase()]).map(parseFloat), p, p0));
      } while (len > index);

      return result;
    },
    // Get bounding box of path
    bbox: function bbox() {
      parser().path.setAttribute('d', this.toString());
      return parser.nodes.path.getBBox();
    }
  });

  var Morphable =
  /*#__PURE__*/
  function () {
    function Morphable(stepper) {
      _classCallCheck(this, Morphable);

      this._stepper = stepper || new Ease('-');
      this._from = null;
      this._to = null;
      this._type = null;
      this._context = null;
      this._morphObj = null;
    }

    _createClass(Morphable, [{
      key: "from",
      value: function from(val) {
        if (val == null) {
          return this._from;
        }

        this._from = this._set(val);
        return this;
      }
    }, {
      key: "to",
      value: function to(val) {
        if (val == null) {
          return this._to;
        }

        this._to = this._set(val);
        return this;
      }
    }, {
      key: "type",
      value: function type(_type) {
        // getter
        if (_type == null) {
          return this._type;
        } // setter


        this._type = _type;
        return this;
      }
    }, {
      key: "_set",
      value: function _set(value) {
        if (!this._type) {
          var type = _typeof(value);

          if (type === 'number') {
            this.type(SVGNumber);
          } else if (type === 'string') {
            if (Color.isColor(value)) {
              this.type(Color);
            } else if (delimiter.test(value)) {
              this.type(pathLetters.test(value) ? PathArray : SVGArray);
            } else if (numberAndUnit.test(value)) {
              this.type(SVGNumber);
            } else {
              this.type(NonMorphable);
            }
          } else if (morphableTypes.indexOf(value.constructor) > -1) {
            this.type(value.constructor);
          } else if (Array.isArray(value)) {
            this.type(SVGArray);
          } else if (type === 'object') {
            this.type(ObjectBag);
          } else {
            this.type(NonMorphable);
          }
        }

        var result = new this._type(value);

        if (this._type === Color) {
          result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
        }

        result = result.toArray();
        this._morphObj = this._morphObj || new this._type();
        this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
          o.done = true;
          return o;
        });
        return result;
      }
    }, {
      key: "stepper",
      value: function stepper(_stepper) {
        if (_stepper == null) return this._stepper;
        this._stepper = _stepper;
        return this;
      }
    }, {
      key: "done",
      value: function done() {
        var complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
          return last && curr;
        }, true);

        return complete;
      }
    }, {
      key: "at",
      value: function at(pos) {
        var _this = this;

        return this._morphObj.fromArray(this._from.map(function (i, index) {
          return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context);
        }));
      }
    }]);

    return Morphable;
  }();
  var NonMorphable =
  /*#__PURE__*/
  function () {
    function NonMorphable() {
      _classCallCheck(this, NonMorphable);

      this.init.apply(this, arguments);
    }

    _createClass(NonMorphable, [{
      key: "init",
      value: function init(val) {
        val = Array.isArray(val) ? val[0] : val;
        this.value = val;
        return this;
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.value;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return [this.value];
      }
    }]);

    return NonMorphable;
  }();
  var TransformBag =
  /*#__PURE__*/
  function () {
    function TransformBag() {
      _classCallCheck(this, TransformBag);

      this.init.apply(this, arguments);
    }

    _createClass(TransformBag, [{
      key: "init",
      value: function init(obj) {
        if (Array.isArray(obj)) {
          obj = {
            scaleX: obj[0],
            scaleY: obj[1],
            shear: obj[2],
            rotate: obj[3],
            translateX: obj[4],
            translateY: obj[5],
            originX: obj[6],
            originY: obj[7]
          };
        }

        Object.assign(this, TransformBag.defaults, obj);
        return this;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        var v = this;
        return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
      }
    }]);

    return TransformBag;
  }();
  TransformBag.defaults = {
    scaleX: 1,
    scaleY: 1,
    shear: 0,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    originX: 0,
    originY: 0
  };
  var ObjectBag =
  /*#__PURE__*/
  function () {
    function ObjectBag() {
      _classCallCheck(this, ObjectBag);

      this.init.apply(this, arguments);
    }

    _createClass(ObjectBag, [{
      key: "init",
      value: function init(objOrArr) {
        this.values = [];

        if (Array.isArray(objOrArr)) {
          this.values = objOrArr;
          return;
        }

        objOrArr = objOrArr || {};
        var entries = [];

        for (var i in objOrArr) {
          entries.push([i, objOrArr[i]]);
        }

        entries.sort(function (a, b) {
          return a[0] - b[0];
        });
        this.values = entries.reduce(function (last, curr) {
          return last.concat(curr);
        }, []);
        return this;
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        var obj = {};
        var arr = this.values;

        for (var i = 0, len = arr.length; i < len; i += 2) {
          obj[arr[i]] = arr[i + 1];
        }

        return obj;
      }
    }, {
      key: "toArray",
      value: function toArray() {
        return this.values;
      }
    }]);

    return ObjectBag;
  }();
  var morphableTypes = [NonMorphable, TransformBag, ObjectBag];
  function registerMorphableType() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    morphableTypes.push.apply(morphableTypes, _toConsumableArray([].concat(type)));
  }
  function makeMorphable() {
    extend(morphableTypes, {
      to: function to(val) {
        return new Morphable().type(this.constructor).from(this.valueOf()).to(val);
      },
      fromArray: function fromArray(arr) {
        this.init(arr);
        return this;
      }
    });
  }

  var Path =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Path, _Shape);

    // Initialize node
    function Path(node) {
      _classCallCheck(this, Path);

      return _possibleConstructorReturn(this, _getPrototypeOf(Path).call(this, nodeOrNew('path', node), node));
    } // Get array


    _createClass(Path, [{
      key: "array",
      value: function array() {
        return this._array || (this._array = new PathArray(this.attr('d')));
      } // Plot new path

    }, {
      key: "plot",
      value: function plot(d) {
        return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
      } // Clear array cache

    }, {
      key: "clear",
      value: function clear() {
        delete this._array;
        return this;
      } // Move by left top corner

    }, {
      key: "move",
      value: function move(x, y) {
        return this.attr('d', this.array().move(x, y));
      } // Move by left top corner over x-axis

    }, {
      key: "x",
      value: function x(_x) {
        return _x == null ? this.bbox().x : this.move(_x, this.bbox().y);
      } // Move by left top corner over y-axis

    }, {
      key: "y",
      value: function y(_y) {
        return _y == null ? this.bbox().y : this.move(this.bbox().x, _y);
      } // Set element size to given width and height

    }, {
      key: "size",
      value: function size(width, height) {
        var p = proportionalSize(this, width, height);
        return this.attr('d', this.array().size(p.width, p.height));
      } // Set width of element

    }, {
      key: "width",
      value: function width(_width) {
        return _width == null ? this.bbox().width : this.size(_width, this.bbox().height);
      } // Set height of element

    }, {
      key: "height",
      value: function height(_height) {
        return _height == null ? this.bbox().height : this.size(this.bbox().width, _height);
      }
    }, {
      key: "targets",
      value: function targets() {
        return baseFind('svg textpath [href*="' + this.id() + '"]');
      }
    }]);

    return Path;
  }(Shape); // Define morphable array
  Path.prototype.MorphArray = PathArray; // Add parent method

  registerMethods({
    Container: {
      // Create a wrapped path element
      path: wrapWithAttrCheck(function (d) {
        // make sure plot is called as a setter
        return this.put(new Path()).plot(d || new PathArray());
      })
    }
  });
  register(Path, 'Path');

  function array() {
    return this._array || (this._array = new PointArray(this.attr('points')));
  } // Plot new path

  function plot(p) {
    return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
  } // Clear array cache

  function clear() {
    delete this._array;
    return this;
  } // Move by left top corner

  function move(x, y) {
    return this.attr('points', this.array().move(x, y));
  } // Set element size to given width and height

  function size(width, height) {
    var p = proportionalSize(this, width, height);
    return this.attr('points', this.array().size(p.width, p.height));
  }

  var poly = ({
  	__proto__: null,
  	array: array,
  	plot: plot,
  	clear: clear,
  	move: move,
  	size: size
  });

  var Polygon =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Polygon, _Shape);

    // Initialize node
    function Polygon(node) {
      _classCallCheck(this, Polygon);

      return _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, nodeOrNew('polygon', node), node));
    }

    return Polygon;
  }(Shape);
  registerMethods({
    Container: {
      // Create a wrapped polygon element
      polygon: wrapWithAttrCheck(function (p) {
        // make sure plot is called as a setter
        return this.put(new Polygon()).plot(p || new PointArray());
      })
    }
  });
  extend(Polygon, pointed);
  extend(Polygon, poly);
  register(Polygon, 'Polygon');

  var Polyline =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Polyline, _Shape);

    // Initialize node
    function Polyline(node) {
      _classCallCheck(this, Polyline);

      return _possibleConstructorReturn(this, _getPrototypeOf(Polyline).call(this, nodeOrNew('polyline', node), node));
    }

    return Polyline;
  }(Shape);
  registerMethods({
    Container: {
      // Create a wrapped polygon element
      polyline: wrapWithAttrCheck(function (p) {
        // make sure plot is called as a setter
        return this.put(new Polyline()).plot(p || new PointArray());
      })
    }
  });
  extend(Polyline, pointed);
  extend(Polyline, poly);
  register(Polyline, 'Polyline');

  var Rect =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Rect, _Shape);

    // Initialize node
    function Rect(node) {
      _classCallCheck(this, Rect);

      return _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, nodeOrNew('rect', node), node));
    }

    return Rect;
  }(Shape);
  extend(Rect, {
    rx: rx,
    ry: ry
  });
  registerMethods({
    Container: {
      // Create a rect element
      rect: wrapWithAttrCheck(function (width, height) {
        return this.put(new Rect()).size(width, height);
      })
    }
  });
  register(Rect, 'Rect');

  var max$3 = Math.max;
  var min$4 = Math.min;
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var Queue =
  /*#__PURE__*/
  function () {
    function Queue() {
      _classCallCheck(this, Queue);

      this._first = null;
      this._last = null;
    }

    _createClass(Queue, [{
      key: "push",
      value: function push(value) {
        // An item stores an id and the provided value
        var item = value.next ? value : {
          value: value,
          next: null,
          prev: null
        }; // Deal with the queue being empty or populated

        if (this._last) {
          item.prev = this._last;
          this._last.next = item;
          this._last = item;
        } else {
          this._last = item;
          this._first = item;
        } // Return the current item


        return item;
      }
    }, {
      key: "shift",
      value: function shift() {
        // Check if we have a value
        var remove = this._first;
        if (!remove) return null; // If we do, remove it and relink things

        this._first = remove.next;
        if (this._first) this._first.prev = null;
        this._last = this._first ? this._last : null;
        return remove.value;
      } // Shows us the first item in the list

    }, {
      key: "first",
      value: function first() {
        return this._first && this._first.value;
      } // Shows us the last item in the list

    }, {
      key: "last",
      value: function last() {
        return this._last && this._last.value;
      } // Removes the item that was returned from the push

    }, {
      key: "remove",
      value: function remove(item) {
        // Relink the previous item
        if (item.prev) item.prev.next = item.next;
        if (item.next) item.next.prev = item.prev;
        if (item === this._last) this._last = item.prev;
        if (item === this._first) this._first = item.next; // Invalidate item

        item.prev = null;
        item.next = null;
      }
    }]);

    return Queue;
  }();

  var Animator = {
    nextDraw: null,
    frames: new Queue(),
    timeouts: new Queue(),
    immediates: new Queue(),
    timer: function timer() {
      return globals.window.performance || globals.window.Date;
    },
    transforms: [],
    frame: function frame(fn) {
      // Store the node
      var node = Animator.frames.push({
        run: fn
      }); // Request an animation frame if we don't have one

      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      } // Return the node so we can remove it easily


      return node;
    },
    timeout: function timeout(fn, delay) {
      delay = delay || 0; // Work out when the event should fire

      var time = Animator.timer().now() + delay; // Add the timeout to the end of the queue

      var node = Animator.timeouts.push({
        run: fn,
        time: time
      }); // Request another animation frame if we need one

      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      }

      return node;
    },
    immediate: function immediate(fn) {
      // Add the immediate fn to the end of the queue
      var node = Animator.immediates.push(fn); // Request another animation frame if we need one

      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      }

      return node;
    },
    cancelFrame: function cancelFrame(node) {
      node != null && Animator.frames.remove(node);
    },
    clearTimeout: function clearTimeout(node) {
      node != null && Animator.timeouts.remove(node);
    },
    cancelImmediate: function cancelImmediate(node) {
      node != null && Animator.immediates.remove(node);
    },
    _draw: function _draw(now) {
      // Run all the timeouts we can run, if they are not ready yet, add them
      // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
      var nextTimeout = null;
      var lastTimeout = Animator.timeouts.last();

      while (nextTimeout = Animator.timeouts.shift()) {
        // Run the timeout if its time, or push it to the end
        if (now >= nextTimeout.time) {
          nextTimeout.run();
        } else {
          Animator.timeouts.push(nextTimeout);
        } // If we hit the last item, we should stop shifting out more items


        if (nextTimeout === lastTimeout) break;
      } // Run all of the animation frames


      var nextFrame = null;
      var lastFrame = Animator.frames.last();

      while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
        nextFrame.run(now);
      }

      var nextImmediate = null;

      while (nextImmediate = Animator.immediates.shift()) {
        nextImmediate();
      } // If we have remaining timeouts or frames, draw until we don't anymore


      Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
    }
  };

  var makeSchedule = function makeSchedule(runnerInfo) {
    var start = runnerInfo.start;
    var duration = runnerInfo.runner.duration();
    var end = start + duration;
    return {
      start: start,
      duration: duration,
      end: end,
      runner: runnerInfo.runner
    };
  };

  var defaultSource = function defaultSource() {
    var w = globals.window;
    return (w.performance || w.Date).now();
  };

  var Timeline =
  /*#__PURE__*/
  function (_EventTarget) {
    _inherits(Timeline, _EventTarget);

    // Construct a new timeline on the given element
    function Timeline() {
      var _this;

      var timeSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSource;

      _classCallCheck(this, Timeline);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
      _this._timeSource = timeSource; // Store the timing variables

      _this._startTime = 0;
      _this._speed = 1.0; // Determines how long a runner is hold in memory. Can be a dt or true/false

      _this._persist = 0; // Keep track of the running animations and their starting parameters

      _this._nextFrame = null;
      _this._paused = true;
      _this._runners = [];
      _this._runnerIds = [];
      _this._lastRunnerId = -1;
      _this._time = 0;
      _this._lastSourceTime = 0;
      _this._lastStepTime = 0; // Make sure that step is always called in class context

      _this._step = _this._stepFn.bind(_assertThisInitialized(_this), false);
      _this._stepImmediate = _this._stepFn.bind(_assertThisInitialized(_this), true);
      return _this;
    } // schedules a runner on the timeline


    _createClass(Timeline, [{
      key: "schedule",
      value: function schedule(runner, delay, when) {
        if (runner == null) {
          return this._runners.map(makeSchedule);
        } // The start time for the next animation can either be given explicitly,
        // derived from the current timeline time or it can be relative to the
        // last start time to chain animations direclty


        var absoluteStartTime = 0;
        var endTime = this.getEndTime();
        delay = delay || 0; // Work out when to start the animation

        if (when == null || when === 'last' || when === 'after') {
          // Take the last time and increment
          absoluteStartTime = endTime;
        } else if (when === 'absolute' || when === 'start') {
          absoluteStartTime = delay;
          delay = 0;
        } else if (when === 'now') {
          absoluteStartTime = this._time;
        } else if (when === 'relative') {
          var _runnerInfo = this._runners[runner.id];

          if (_runnerInfo) {
            absoluteStartTime = _runnerInfo.start + delay;
            delay = 0;
          }
        } else {
          throw new Error('Invalid value for the "when" parameter');
        } // Manage runner


        runner.unschedule();
        runner.timeline(this);
        var persist = runner.persist();
        var runnerInfo = {
          persist: persist === null ? this._persist : persist,
          start: absoluteStartTime + delay,
          runner: runner
        };
        this._lastRunnerId = runner.id;

        this._runners.push(runnerInfo);

        this._runners.sort(function (a, b) {
          return a.start - b.start;
        });

        this._runnerIds = this._runners.map(function (info) {
          return info.runner.id;
        });

        this.updateTime()._continue();

        return this;
      } // Remove the runner from this timeline

    }, {
      key: "unschedule",
      value: function unschedule(runner) {
        var index = this._runnerIds.indexOf(runner.id);

        if (index < 0) return this;

        this._runners.splice(index, 1);

        this._runnerIds.splice(index, 1);

        runner.timeline(null);
        return this;
      } // Calculates the end of the timeline

    }, {
      key: "getEndTime",
      value: function getEndTime() {
        var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];

        var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
        var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
        return lastStartTime + lastDuration;
      }
    }, {
      key: "getEndTimeOfTimeline",
      value: function getEndTimeOfTimeline() {
        var lastEndTime = 0;

        for (var i = 0; i < this._runners.length; i++) {
          var runnerInfo = this._runners[i];
          var duration = runnerInfo ? runnerInfo.runner.duration() : 0;
          var startTime = runnerInfo ? runnerInfo.start : 0;
          var endTime = startTime + duration;

          if (endTime > lastEndTime) {
            lastEndTime = endTime;
          }
        }

        return lastEndTime;
      } // Makes sure, that after pausing the time doesn't jump

    }, {
      key: "updateTime",
      value: function updateTime() {
        if (!this.active()) {
          this._lastSourceTime = this._timeSource();
        }

        return this;
      }
    }, {
      key: "play",
      value: function play() {
        // Now make sure we are not paused and continue the animation
        this._paused = false;
        return this.updateTime()._continue();
      }
    }, {
      key: "pause",
      value: function pause() {
        this._paused = true;
        return this._continue();
      }
    }, {
      key: "stop",
      value: function stop() {
        // Go to start and pause
        this.time(0);
        return this.pause();
      }
    }, {
      key: "finish",
      value: function finish() {
        // Go to end and pause
        this.time(this.getEndTimeOfTimeline() + 1);
        return this.pause();
      }
    }, {
      key: "speed",
      value: function speed(_speed) {
        if (_speed == null) return this._speed;
        this._speed = _speed;
        return this;
      }
    }, {
      key: "reverse",
      value: function reverse(yes) {
        var currentSpeed = this.speed();
        if (yes == null) return this.speed(-currentSpeed);
        var positive = Math.abs(currentSpeed);
        return this.speed(yes ? positive : -positive);
      }
    }, {
      key: "seek",
      value: function seek(dt) {
        return this.time(this._time + dt);
      }
    }, {
      key: "time",
      value: function time(_time) {
        if (_time == null) return this._time;
        this._time = _time;
        return this._continue(true);
      }
    }, {
      key: "persist",
      value: function persist(dtOrForever) {
        if (dtOrForever == null) return this._persist;
        this._persist = dtOrForever;
        return this;
      }
    }, {
      key: "source",
      value: function source(fn) {
        if (fn == null) return this._timeSource;
        this._timeSource = fn;
        return this;
      }
    }, {
      key: "_stepFn",
      value: function _stepFn() {
        var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // Get the time delta from the last time and update the time
        var time = this._timeSource();

        var dtSource = time - this._lastSourceTime;
        if (immediateStep) dtSource = 0;
        var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
        this._lastSourceTime = time; // Only update the time if we use the timeSource.
        // Otherwise use the current time

        if (!immediateStep) {
          // Update the time
          this._time += dtTime;
          this._time = this._time < 0 ? 0 : this._time;
        }

        this._lastStepTime = this._time;
        this.fire('time', this._time); // This is for the case that the timeline was seeked so that the time
        // is now before the startTime of the runner. Thats why we need to set
        // the runner to position 0
        // FIXME:
        // However, reseting in insertion order leads to bugs. Considering the case,
        // where 2 runners change the same attriute but in different times,
        // reseting both of them will lead to the case where the later defined
        // runner always wins the reset even if the other runner started earlier
        // and therefore should win the attribute battle
        // this can be solved by reseting them backwards

        for (var k = this._runners.length; k--;) {
          // Get and run the current runner and ignore it if its inactive
          var runnerInfo = this._runners[k];
          var runner = runnerInfo.runner; // Make sure that we give the actual difference
          // between runner start time and now

          var dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet
          // and try to reset it

          if (dtToStart <= 0) {
            runner.reset();
          }
        } // Run all of the runners directly


        var runnersLeft = false;

        for (var i = 0, len = this._runners.length; i < len; i++) {
          // Get and run the current runner and ignore it if its inactive
          var _runnerInfo2 = this._runners[i];
          var _runner = _runnerInfo2.runner;
          var dt = dtTime; // Make sure that we give the actual difference
          // between runner start time and now

          var _dtToStart = this._time - _runnerInfo2.start; // Dont run runner if not started yet


          if (_dtToStart <= 0) {
            runnersLeft = true;
            continue;
          } else if (_dtToStart < dt) {
            // Adjust dt to make sure that animation is on point
            dt = _dtToStart;
          }

          if (!_runner.active()) continue; // If this runner is still going, signal that we need another animation
          // frame, otherwise, remove the completed runner

          var finished = _runner.step(dt).done;

          if (!finished) {
            runnersLeft = true; // continue
          } else if (_runnerInfo2.persist !== true) {
            // runner is finished. And runner might get removed
            var endTime = _runner.duration() - _runner.time() + this._time;

            if (endTime + _runnerInfo2.persist < this._time) {
              // Delete runner and correct index
              _runner.unschedule();

              --i;
              --len;
            }
          }
        } // Basically: we continue when there are runners right from us in time
        // when -->, and when runners are left from us when <--


        if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
          this._continue();
        } else {
          this.pause();
          this.fire('finished');
        }

        return this;
      } // Checks if we are running and continues the animation

    }, {
      key: "_continue",
      value: function _continue() {
        var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        Animator.cancelFrame(this._nextFrame);
        this._nextFrame = null;
        if (immediateStep) return this._stepImmediate();
        if (this._paused) return this;
        this._nextFrame = Animator.frame(this._step);
        return this;
      }
    }, {
      key: "active",
      value: function active() {
        return !!this._nextFrame;
      }
    }]);

    return Timeline;
  }(EventTarget);
  registerMethods({
    Element: {
      timeline: function timeline(_timeline) {
        if (_timeline == null) {
          this._timeline = this._timeline || new Timeline();
          return this._timeline;
        } else {
          this._timeline = _timeline;
          return this;
        }
      }
    }
  });

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Runner =
  /*#__PURE__*/
  function (_EventTarget) {
    _inherits(Runner, _EventTarget);

    function Runner(options) {
      var _this;

      _classCallCheck(this, Runner);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Runner).call(this)); // Store a unique id on the runner, so that we can identify it later

      _this.id = Runner.id++; // Ensure a default value

      options = options == null ? timeline.duration : options; // Ensure that we get a controller

      options = typeof options === 'function' ? new Controller(options) : options; // Declare all of the variables

      _this._element = null;
      _this._timeline = null;
      _this.done = false;
      _this._queue = []; // Work out the stepper and the duration

      _this._duration = typeof options === 'number' && options;
      _this._isDeclarative = options instanceof Controller;
      _this._stepper = _this._isDeclarative ? options : new Ease(); // We copy the current values from the timeline because they can change

      _this._history = {}; // Store the state of the runner

      _this.enabled = true;
      _this._time = 0;
      _this._lastTime = 0; // At creation, the runner is in reseted state

      _this._reseted = true; // Save transforms applied to this runner

      _this.transforms = new Matrix();
      _this.transformId = 1; // Looping variables

      _this._haveReversed = false;
      _this._reverse = false;
      _this._loopsDone = 0;
      _this._swing = false;
      _this._wait = 0;
      _this._times = 1;
      _this._frameId = null; // Stores how long a runner is stored after beeing done

      _this._persist = _this._isDeclarative ? true : null;
      return _this;
    }
    /*
    Runner Definitions
    ==================
    These methods help us define the runtime behaviour of the Runner or they
    help us make new runners from the current runner
    */


    _createClass(Runner, [{
      key: "element",
      value: function element(_element) {
        if (_element == null) return this._element;
        this._element = _element;

        _element._prepareRunner();

        return this;
      }
    }, {
      key: "timeline",
      value: function timeline(_timeline) {
        // check explicitly for undefined so we can set the timeline to null
        if (typeof _timeline === 'undefined') return this._timeline;
        this._timeline = _timeline;
        return this;
      }
    }, {
      key: "animate",
      value: function animate(duration, delay, when) {
        var o = Runner.sanitise(duration, delay, when);
        var runner = new Runner(o.duration);
        if (this._timeline) runner.timeline(this._timeline);
        if (this._element) runner.element(this._element);
        return runner.loop(o).schedule(o.delay, o.when);
      }
    }, {
      key: "schedule",
      value: function schedule(timeline, delay, when) {
        // The user doesn't need to pass a timeline if we already have one
        if (!(timeline instanceof Timeline)) {
          when = delay;
          delay = timeline;
          timeline = this.timeline();
        } // If there is no timeline, yell at the user...


        if (!timeline) {
          throw Error('Runner cannot be scheduled without timeline');
        } // Schedule the runner on the timeline provided


        timeline.schedule(this, delay, when);
        return this;
      }
    }, {
      key: "unschedule",
      value: function unschedule() {
        var timeline = this.timeline();
        timeline && timeline.unschedule(this);
        return this;
      }
    }, {
      key: "loop",
      value: function loop(times, swing, wait) {
        // Deal with the user passing in an object
        if (_typeof(times) === 'object') {
          swing = times.swing;
          wait = times.wait;
          times = times.times;
        } // Sanitise the values and store them


        this._times = times || Infinity;
        this._swing = swing || false;
        this._wait = wait || 0; // Allow true to be passed

        if (this._times === true) {
          this._times = Infinity;
        }

        return this;
      }
    }, {
      key: "delay",
      value: function delay(_delay) {
        return this.animate(0, _delay);
      }
      /*
      Basic Functionality
      ===================
      These methods allow us to attach basic functions to the runner directly
      */

    }, {
      key: "queue",
      value: function queue(initFn, runFn, retargetFn, isTransform) {
        this._queue.push({
          initialiser: initFn || noop,
          runner: runFn || noop,
          retarget: retargetFn,
          isTransform: isTransform,
          initialised: false,
          finished: false
        });

        var timeline = this.timeline();
        timeline && this.timeline()._continue();
        return this;
      }
    }, {
      key: "during",
      value: function during(fn) {
        return this.queue(null, fn);
      }
    }, {
      key: "after",
      value: function after(fn) {
        return this.on('finished', fn);
      }
      /*
      Runner animation methods
      ========================
      Control how the animation plays
      */

    }, {
      key: "time",
      value: function time(_time) {
        if (_time == null) {
          return this._time;
        }

        var dt = _time - this._time;
        this.step(dt);
        return this;
      }
    }, {
      key: "duration",
      value: function duration() {
        return this._times * (this._wait + this._duration) - this._wait;
      }
    }, {
      key: "loops",
      value: function loops(p) {
        var loopDuration = this._duration + this._wait;

        if (p == null) {
          var loopsDone = Math.floor(this._time / loopDuration);
          var relativeTime = this._time - loopsDone * loopDuration;
          var position = relativeTime / this._duration;
          return Math.min(loopsDone + position, this._times);
        }

        var whole = Math.floor(p);
        var partial = p % 1;
        var time = loopDuration * whole + this._duration * partial;
        return this.time(time);
      }
    }, {
      key: "persist",
      value: function persist(dtOrForever) {
        if (dtOrForever == null) return this._persist;
        this._persist = dtOrForever;
        return this;
      }
    }, {
      key: "position",
      value: function position(p) {
        // Get all of the variables we need
        var x = this._time;
        var d = this._duration;
        var w = this._wait;
        var t = this._times;
        var s = this._swing;
        var r = this._reverse;
        var position;

        if (p == null) {
          /*
          This function converts a time to a position in the range [0, 1]
          The full explanation can be found in this desmos demonstration
            https://www.desmos.com/calculator/u4fbavgche
          The logic is slightly simplified here because we can use booleans
          */
          // Figure out the value without thinking about the start or end time
          var f = function f(x) {
            var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
            var backwards = swinging && !r || !swinging && r;
            var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
            var clipped = Math.max(Math.min(uncliped, 1), 0);
            return clipped;
          }; // Figure out the value by incorporating the start time


          var endTime = t * (w + d) - w;
          position = x <= 0 ? Math.round(f(1e-5)) : x < endTime ? f(x) : Math.round(f(endTime - 1e-5));
          return position;
        } // Work out the loops done and add the position to the loops done


        var loopsDone = Math.floor(this.loops());
        var swingForward = s && loopsDone % 2 === 0;
        var forwards = swingForward && !r || r && swingForward;
        position = loopsDone + (forwards ? p : 1 - p);
        return this.loops(position);
      }
    }, {
      key: "progress",
      value: function progress(p) {
        if (p == null) {
          return Math.min(1, this._time / this.duration());
        }

        return this.time(p * this.duration());
      }
    }, {
      key: "step",
      value: function step(dt) {
        // If we are inactive, this stepper just gets skipped
        if (!this.enabled) return this; // Update the time and get the new position

        dt = dt == null ? 16 : dt;
        this._time += dt;
        var position = this.position(); // Figure out if we need to run the stepper in this frame

        var running = this._lastPosition !== position && this._time >= 0;
        this._lastPosition = position; // Figure out if we just started

        var duration = this.duration();
        var justStarted = this._lastTime <= 0 && this._time > 0;
        var justFinished = this._lastTime < duration && this._time >= duration;
        this._lastTime = this._time;

        if (justStarted) {
          this.fire('start', this);
        } // Work out if the runner is finished set the done flag here so animations
        // know, that they are running in the last step (this is good for
        // transformations which can be merged)


        var declarative = this._isDeclarative;
        this.done = !declarative && !justFinished && this._time >= duration; // Runner is running. So its not in reseted state anymore

        this._reseted = false; // Call initialise and the run function

        if (running || declarative) {
          this._initialise(running); // clear the transforms on this runner so they dont get added again and again


          this.transforms = new Matrix();

          var converged = this._run(declarative ? dt : position);

          this.fire('step', this);
        } // correct the done flag here
        // declaritive animations itself know when they converged


        this.done = this.done || converged && declarative;

        if (justFinished) {
          this.fire('finished', this);
        }

        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this._reseted) return this;
        this.time(0);
        this._reseted = true;
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        return this.step(Infinity);
      }
    }, {
      key: "reverse",
      value: function reverse(_reverse) {
        this._reverse = _reverse == null ? !this._reverse : _reverse;
        return this;
      }
    }, {
      key: "ease",
      value: function ease(fn) {
        this._stepper = new Ease(fn);
        return this;
      }
    }, {
      key: "active",
      value: function active(enabled) {
        if (enabled == null) return this.enabled;
        this.enabled = enabled;
        return this;
      }
      /*
      Private Methods
      ===============
      Methods that shouldn't be used externally
      */
      // Save a morpher to the morpher list so that we can retarget it later

    }, {
      key: "_rememberMorpher",
      value: function _rememberMorpher(method, morpher) {
        this._history[method] = {
          morpher: morpher,
          caller: this._queue[this._queue.length - 1]
        }; // We have to resume the timeline in case a controller
        // is already done without beeing ever run
        // This can happen when e.g. this is done:
        //    anim = el.animate(new SVG.Spring)
        // and later
        //    anim.move(...)

        if (this._isDeclarative) {
          var timeline = this.timeline();
          timeline && timeline.play();
        }
      } // Try to set the target for a morpher if the morpher exists, otherwise
      // do nothing and return false

    }, {
      key: "_tryRetarget",
      value: function _tryRetarget(method, target, extra) {
        if (this._history[method]) {
          // if the last method wasnt even initialised, throw it away
          if (!this._history[method].caller.initialised) {
            var index = this._queue.indexOf(this._history[method].caller);

            this._queue.splice(index, 1);

            return false;
          } // for the case of transformations, we use the special retarget function
          // which has access to the outer scope


          if (this._history[method].caller.retarget) {
            this._history[method].caller.retarget(target, extra); // for everything else a simple morpher change is sufficient

          } else {
            this._history[method].morpher.to(target);
          }

          this._history[method].caller.finished = false;
          var timeline = this.timeline();
          timeline && timeline.play();
          return true;
        }

        return false;
      } // Run each initialise function in the runner if required

    }, {
      key: "_initialise",
      value: function _initialise(running) {
        // If we aren't running, we shouldn't initialise when not declarative
        if (!running && !this._isDeclarative) return; // Loop through all of the initialisers

        for (var i = 0, len = this._queue.length; i < len; ++i) {
          // Get the current initialiser
          var current = this._queue[i]; // Determine whether we need to initialise

          var needsIt = this._isDeclarative || !current.initialised && running;
          running = !current.finished; // Call the initialiser if we need to

          if (needsIt && running) {
            current.initialiser.call(this);
            current.initialised = true;
          }
        }
      } // Run each run function for the position or dt given

    }, {
      key: "_run",
      value: function _run(positionOrDt) {
        // Run all of the _queue directly
        var allfinished = true;

        for (var i = 0, len = this._queue.length; i < len; ++i) {
          // Get the current function to run
          var current = this._queue[i]; // Run the function if its not finished, we keep track of the finished
          // flag for the sake of declarative _queue

          var converged = current.runner.call(this, positionOrDt);
          current.finished = current.finished || converged === true;
          allfinished = allfinished && current.finished;
        } // We report when all of the constructors are finished


        return allfinished;
      }
    }, {
      key: "addTransform",
      value: function addTransform(transform, index) {
        this.transforms.lmultiplyO(transform);
        return this;
      }
    }, {
      key: "clearTransform",
      value: function clearTransform() {
        this.transforms = new Matrix();
        return this;
      } // TODO: Keep track of all transformations so that deletion is faster

    }, {
      key: "clearTransformsFromQueue",
      value: function clearTransformsFromQueue() {
        if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
          this._queue = this._queue.filter(function (item) {
            return !item.isTransform;
          });
        }
      }
    }], [{
      key: "sanitise",
      value: function sanitise(duration, delay, when) {
        // Initialise the default parameters
        var times = 1;
        var swing = false;
        var wait = 0;
        duration = duration || timeline.duration;
        delay = delay || timeline.delay;
        when = when || 'last'; // If we have an object, unpack the values

        if (_typeof(duration) === 'object' && !(duration instanceof Stepper)) {
          delay = duration.delay || delay;
          when = duration.when || when;
          swing = duration.swing || swing;
          times = duration.times || times;
          wait = duration.wait || wait;
          duration = duration.duration || timeline.duration;
        }

        return {
          duration: duration,
          delay: delay,
          swing: swing,
          times: times,
          wait: wait,
          when: when
        };
      }
    }]);

    return Runner;
  }(EventTarget);
  Runner.id = 0;

  var FakeRunner =
  /*#__PURE__*/
  function () {
    function FakeRunner() {
      var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Matrix();
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _classCallCheck(this, FakeRunner);

      this.transforms = transforms;
      this.id = id;
      this.done = done;
    }

    _createClass(FakeRunner, [{
      key: "clearTransformsFromQueue",
      value: function clearTransformsFromQueue() {}
    }]);

    return FakeRunner;
  }();

  extend([Runner, FakeRunner], {
    mergeWith: function mergeWith(runner) {
      return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
    }
  }); // FakeRunner.emptyRunner = new FakeRunner()

  var lmultiply = function lmultiply(last, curr) {
    return last.lmultiplyO(curr);
  };

  var getRunnerTransform = function getRunnerTransform(runner) {
    return runner.transforms;
  };

  function mergeTransforms() {
    // Find the matrix to apply to the element and apply it
    var runners = this._transformationRunners.runners;
    var netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
    this.transform(netTransform);

    this._transformationRunners.merge();

    if (this._transformationRunners.length() === 1) {
      this._frameId = null;
    }
  }

  var RunnerArray =
  /*#__PURE__*/
  function () {
    function RunnerArray() {
      _classCallCheck(this, RunnerArray);

      this.runners = [];
      this.ids = [];
    }

    _createClass(RunnerArray, [{
      key: "add",
      value: function add(runner) {
        if (this.runners.includes(runner)) return;
        var id = runner.id + 1;
        this.runners.push(runner);
        this.ids.push(id);
        return this;
      }
    }, {
      key: "getByID",
      value: function getByID(id) {
        return this.runners[this.ids.indexOf(id + 1)];
      }
    }, {
      key: "remove",
      value: function remove(id) {
        var index = this.ids.indexOf(id + 1);
        this.ids.splice(index, 1);
        this.runners.splice(index, 1);
        return this;
      }
    }, {
      key: "merge",
      value: function merge() {
        var _this2 = this;

        var lastRunner = null;
        this.runners.forEach(function (runner, i) {
          var condition = lastRunner && runner.done && lastRunner.done // don't merge runner when persisted on timeline
          && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

          if (condition) {
            // the +1 happens in the function
            _this2.remove(runner.id);

            _this2.edit(lastRunner.id, runner.mergeWith(lastRunner));
          }

          lastRunner = runner;
        });
        return this;
      }
    }, {
      key: "edit",
      value: function edit(id, newRunner) {
        var index = this.ids.indexOf(id + 1);
        this.ids.splice(index, 1, id + 1);
        this.runners.splice(index, 1, newRunner);
        return this;
      }
    }, {
      key: "length",
      value: function length() {
        return this.ids.length;
      }
    }, {
      key: "clearBefore",
      value: function clearBefore(id) {
        var deleteCnt = this.ids.indexOf(id + 1) || 1;
        this.ids.splice(0, deleteCnt, 0);
        this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(function (r) {
          return r.clearTransformsFromQueue();
        });
        return this;
      }
    }]);

    return RunnerArray;
  }();

  registerMethods({
    Element: {
      animate: function animate(duration, delay, when) {
        var o = Runner.sanitise(duration, delay, when);
        var timeline = this.timeline();
        return new Runner(o.duration).loop(o).element(this).timeline(timeline.play()).schedule(o.delay, o.when);
      },
      delay: function delay(by, when) {
        return this.animate(0, by, when);
      },
      // this function searches for all runners on the element and deletes the ones
      // which run before the current one. This is because absolute transformations
      // overwfrite anything anyway so there is no need to waste time computing
      // other runners
      _clearTransformRunnersBefore: function _clearTransformRunnersBefore(currentRunner) {
        this._transformationRunners.clearBefore(currentRunner.id);
      },
      _currentTransform: function _currentTransform(current) {
        return this._transformationRunners.runners // we need the equal sign here to make sure, that also transformations
        // on the same runner which execute before the current transformation are
        // taken into account
        .filter(function (runner) {
          return runner.id <= current.id;
        }).map(getRunnerTransform).reduce(lmultiply, new Matrix());
      },
      _addRunner: function _addRunner(runner) {
        this._transformationRunners.add(runner); // Make sure that the runner merge is executed at the very end of
        // all Animator functions. Thats why we use immediate here to execute
        // the merge right after all frames are run


        Animator.cancelImmediate(this._frameId);
        this._frameId = Animator.immediate(mergeTransforms.bind(this));
      },
      _prepareRunner: function _prepareRunner() {
        if (this._frameId == null) {
          this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
        }
      }
    }
  });
  extend(Runner, {
    attr: function attr(a, v) {
      return this.styleAttr('attr', a, v);
    },
    // Add animatable styles
    css: function css(s, v) {
      return this.styleAttr('css', s, v);
    },
    styleAttr: function styleAttr(type, name, val) {
      // apply attributes individually
      if (_typeof(name) === 'object') {
        for (var key in name) {
          this.styleAttr(type, key, name[key]);
        }

        return this;
      }

      var morpher = new Morphable(this._stepper).to(val);
      this.queue(function () {
        morpher = morpher.from(this.element()[type](name));
      }, function (pos) {
        this.element()[type](name, morpher.at(pos));
        return morpher.done();
      });
      return this;
    },
    zoom: function zoom(level, point) {
      if (this._tryRetarget('zoom', to, point)) return this;
      var morpher = new Morphable(this._stepper).to(new SVGNumber(level));
      this.queue(function () {
        morpher = morpher.from(this.element().zoom());
      }, function (pos) {
        this.element().zoom(morpher.at(pos), point);
        return morpher.done();
      }, function (newLevel, newPoint) {
        point = newPoint;
        morpher.to(newLevel);
      });

      this._rememberMorpher('zoom', morpher);

      return this;
    },

    /**
     ** absolute transformations
     **/
    //
    // M v -----|-----(D M v = F v)------|----->  T v
    //
    // 1. define the final state (T) and decompose it (once)
    //    t = [tx, ty, the, lam, sy, sx]
    // 2. on every frame: pull the current state of all previous transforms
    //    (M - m can change)
    //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
    // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
    //   - Note F(0) = M
    //   - Note F(1) = T
    // 4. Now you get the delta matrix as a result: D = F * inv(M)
    transform: function transform(transforms, relative, affine) {
      // If we have a declarative function, we should retarget it if possible
      relative = transforms.relative || relative;

      if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
        return this;
      } // Parse the parameters


      var isMatrix = Matrix.isMatrixLike(transforms);
      affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix; // Create a morepher and set its type

      var morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
      var origin;
      var element;
      var current;
      var currentAngle;
      var startTransform;

      function setup() {
        // make sure element and origin is defined
        element = element || this.element();
        origin = origin || getOrigin(transforms, element);
        startTransform = new Matrix(relative ? undefined : element); // add the runner to the element so it can merge transformations

        element._addRunner(this); // Deactivate all transforms that have run so far if we are absolute


        if (!relative) {
          element._clearTransformRunnersBefore(this);
        }
      }

      function run(pos) {
        // clear all other transforms before this in case something is saved
        // on this runner. We are absolute. We dont need these!
        if (!relative) this.clearTransform();

        var _transform = new Point(origin).transform(element._currentTransform(this)),
            x = _transform.x,
            y = _transform.y;

        var target = new Matrix(_objectSpread$1({}, transforms, {
          origin: [x, y]
        }));
        var start = this._isDeclarative && current ? current : startTransform;

        if (affine) {
          target = target.decompose(x, y);
          start = start.decompose(x, y); // Get the current and target angle as it was set

          var rTarget = target.rotate;
          var rCurrent = start.rotate; // Figure out the shortest path to rotate directly

          var possibilities = [rTarget - 360, rTarget, rTarget + 360];
          var distances = possibilities.map(function (a) {
            return Math.abs(a - rCurrent);
          });
          var shortest = Math.min.apply(Math, _toConsumableArray(distances));
          var index = distances.indexOf(shortest);
          target.rotate = possibilities[index];
        }

        if (relative) {
          // we have to be careful here not to overwrite the rotation
          // with the rotate method of Matrix
          if (!isMatrix) {
            target.rotate = transforms.rotate || 0;
          }

          if (this._isDeclarative && currentAngle) {
            start.rotate = currentAngle;
          }
        }

        morpher.from(start);
        morpher.to(target);
        var affineParameters = morpher.at(pos);
        currentAngle = affineParameters.rotate;
        current = new Matrix(affineParameters);
        this.addTransform(current);

        element._addRunner(this);

        return morpher.done();
      }

      function retarget(newTransforms) {
        // only get a new origin if it changed since the last call
        if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
          origin = getOrigin(transforms, element);
        } // overwrite the old transformations with the new ones


        transforms = _objectSpread$1({}, newTransforms, {
          origin: origin
        });
      }

      this.queue(setup, run, retarget, true);
      this._isDeclarative && this._rememberMorpher('transform', morpher);
      return this;
    },
    // Animatable x-axis
    x: function x(_x, relative) {
      return this._queueNumber('x', _x);
    },
    // Animatable y-axis
    y: function y(_y) {
      return this._queueNumber('y', _y);
    },
    dx: function dx() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this._queueNumberDelta('x', x);
    },
    dy: function dy() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this._queueNumberDelta('y', y);
    },
    dmove: function dmove(x, y) {
      return this.dx(x).dy(y);
    },
    _queueNumberDelta: function _queueNumberDelta(method, to) {
      to = new SVGNumber(to); // Try to change the target if we have this method already registerd

      if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

      var morpher = new Morphable(this._stepper).to(to);
      var from = null;
      this.queue(function () {
        from = this.element()[method]();
        morpher.from(from);
        morpher.to(from + to);
      }, function (pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done();
      }, function (newTo) {
        morpher.to(from + new SVGNumber(newTo));
      }); // Register the morpher so that if it is changed again, we can retarget it

      this._rememberMorpher(method, morpher);

      return this;
    },
    _queueObject: function _queueObject(method, to) {
      // Try to change the target if we have this method already registerd
      if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

      var morpher = new Morphable(this._stepper).to(to);
      this.queue(function () {
        morpher.from(this.element()[method]());
      }, function (pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done();
      }); // Register the morpher so that if it is changed again, we can retarget it

      this._rememberMorpher(method, morpher);

      return this;
    },
    _queueNumber: function _queueNumber(method, value) {
      return this._queueObject(method, new SVGNumber(value));
    },
    // Animatable center x-axis
    cx: function cx(x) {
      return this._queueNumber('cx', x);
    },
    // Animatable center y-axis
    cy: function cy(y) {
      return this._queueNumber('cy', y);
    },
    // Add animatable move
    move: function move(x, y) {
      return this.x(x).y(y);
    },
    // Add animatable center
    center: function center(x, y) {
      return this.cx(x).cy(y);
    },
    // Add animatable size
    size: function size(width, height) {
      // animate bbox based size for all other elements
      var box;

      if (!width || !height) {
        box = this._element.bbox();
      }

      if (!width) {
        width = box.width / box.height * height;
      }

      if (!height) {
        height = box.height / box.width * width;
      }

      return this.width(width).height(height);
    },
    // Add animatable width
    width: function width(_width) {
      return this._queueNumber('width', _width);
    },
    // Add animatable height
    height: function height(_height) {
      return this._queueNumber('height', _height);
    },
    // Add animatable plot
    plot: function plot(a, b, c, d) {
      // Lines can be plotted with 4 arguments
      if (arguments.length === 4) {
        return this.plot([a, b, c, d]);
      }

      if (this._tryRetarget('plot', a)) return this;
      var morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
      this.queue(function () {
        morpher.from(this._element.array());
      }, function (pos) {
        this._element.plot(morpher.at(pos));

        return morpher.done();
      });

      this._rememberMorpher('plot', morpher);

      return this;
    },
    // Add leading method
    leading: function leading(value) {
      return this._queueNumber('leading', value);
    },
    // Add animatable viewbox
    viewbox: function viewbox(x, y, width, height) {
      return this._queueObject('viewbox', new Box(x, y, width, height));
    },
    update: function update(o) {
      if (_typeof(o) !== 'object') {
        return this.update({
          offset: arguments[0],
          color: arguments[1],
          opacity: arguments[2]
        });
      }

      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
      if (o.color != null) this.attr('stop-color', o.color);
      if (o.offset != null) this.attr('offset', o.offset);
      return this;
    }
  });
  extend(Runner, {
    rx: rx,
    ry: ry,
    from: from,
    to: to
  });
  register(Runner, 'Runner');

  var Svg =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Svg, _Container);

    function Svg(node) {
      var _this;

      _classCallCheck(this, Svg);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Svg).call(this, nodeOrNew('svg', node), node));

      _this.namespace();

      return _this;
    }

    _createClass(Svg, [{
      key: "isRoot",
      value: function isRoot() {
        return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) || this.node.parentNode.nodeName === '#document';
      } // Check if this is a root svg
      // If not, call docs from this element

    }, {
      key: "root",
      value: function root() {
        if (this.isRoot()) return this;
        return _get(_getPrototypeOf(Svg.prototype), "root", this).call(this);
      } // Add namespaces

    }, {
      key: "namespace",
      value: function namespace() {
        if (!this.isRoot()) return this.root().namespace();
        return this.attr({
          xmlns: ns,
          version: '1.1'
        }).attr('xmlns:xlink', xlink, xmlns).attr('xmlns:svgjs', svgjs, xmlns);
      } // Creates and returns defs element

    }, {
      key: "defs",
      value: function defs() {
        if (!this.isRoot()) return this.root().defs();
        return adopt(this.node.querySelector('defs')) || this.put(new Defs());
      } // custom parent method

    }, {
      key: "parent",
      value: function parent(type) {
        if (this.isRoot()) {
          return this.node.parentNode.nodeName === '#document' ? null : adopt(this.node.parentNode);
        }

        return _get(_getPrototypeOf(Svg.prototype), "parent", this).call(this, type);
      }
    }, {
      key: "clear",
      value: function clear() {
        // remove children
        while (this.node.hasChildNodes()) {
          this.node.removeChild(this.node.lastChild);
        } // remove defs reference


        delete this._defs;
        return this;
      }
    }]);

    return Svg;
  }(Container);
  registerMethods({
    Container: {
      // Create nested svg document
      nested: wrapWithAttrCheck(function () {
        return this.put(new Svg());
      })
    }
  });
  register(Svg, 'Svg', true);

  var _Symbol =
  /*#__PURE__*/
  function (_Container) {
    _inherits(_Symbol, _Container);

    // Initialize node
    function _Symbol(node) {
      _classCallCheck(this, _Symbol);

      return _possibleConstructorReturn(this, _getPrototypeOf(_Symbol).call(this, nodeOrNew('symbol', node), node));
    }

    return _Symbol;
  }(Container);
  registerMethods({
    Container: {
      symbol: wrapWithAttrCheck(function () {
        return this.put(new _Symbol());
      })
    }
  });
  register(_Symbol, 'Symbol');

  function plain(text) {
    // clear if build mode is disabled
    if (this._build === false) {
      this.clear();
    } // create text node


    this.node.appendChild(globals.document.createTextNode(text));
    return this;
  } // Get length of text element

  function length() {
    return this.node.getComputedTextLength();
  }

  var textable = ({
  	__proto__: null,
  	plain: plain,
  	length: length
  });

  var Text =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Text, _Shape);

    // Initialize node
    function Text(node) {
      var _this;

      _classCallCheck(this, Text);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, nodeOrNew('text', node), node));
      _this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding

      _this._rebuild = true; // enable automatic updating of dy values

      _this._build = false; // disable build mode for adding multiple lines

      return _this;
    } // Move over x-axis
    // Text is moved its bounding box
    // text-anchor does NOT matter


    _createClass(Text, [{
      key: "x",
      value: function x(_x) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

        if (_x == null) {
          return box.x;
        }

        return this.attr('x', this.attr('x') + _x - box.x);
      } // Move over y-axis

    }, {
      key: "y",
      value: function y(_y) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

        if (_y == null) {
          return box.y;
        }

        return this.attr('y', this.attr('y') + _y - box.y);
      }
    }, {
      key: "move",
      value: function move(x, y) {
        var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
        return this.x(x, box).y(y, box);
      } // Move center over x-axis

    }, {
      key: "cx",
      value: function cx(x) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

        if (x == null) {
          return box.cx;
        }

        return this.attr('x', this.attr('x') + x - box.cx);
      } // Move center over y-axis

    }, {
      key: "cy",
      value: function cy(y) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

        if (y == null) {
          return box.cy;
        }

        return this.attr('y', this.attr('y') + y - box.cy);
      }
    }, {
      key: "center",
      value: function center(x, y) {
        var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
        return this.cx(x, box).cy(y, box);
      } // Set the text content

    }, {
      key: "text",
      value: function text(_text) {
        // act as getter
        if (_text === undefined) {
          var children = this.node.childNodes;
          var firstLine = 0;
          _text = '';

          for (var i = 0, len = children.length; i < len; ++i) {
            // skip textPaths - they are no lines
            if (children[i].nodeName === 'textPath') {
              if (i === 0) firstLine = 1;
              continue;
            } // add newline if its not the first child and newLined is set to true


            if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
              _text += '\n';
            } // add content of this node


            _text += children[i].textContent;
          }

          return _text;
        } // remove existing content


        this.clear().build(true);

        if (typeof _text === 'function') {
          // call block
          _text.call(this, this);
        } else {
          // store text and make sure text is not blank
          _text = _text.split('\n'); // build new lines

          for (var j = 0, jl = _text.length; j < jl; j++) {
            this.tspan(_text[j]).newLine();
          }
        } // disable build mode and rebuild lines


        return this.build(false).rebuild();
      } // Set / get leading

    }, {
      key: "leading",
      value: function leading(value) {
        // act as getter
        if (value == null) {
          return this.dom.leading;
        } // act as setter


        this.dom.leading = new SVGNumber(value);
        return this.rebuild();
      } // Rebuild appearance type

    }, {
      key: "rebuild",
      value: function rebuild(_rebuild) {
        // store new rebuild flag if given
        if (typeof _rebuild === 'boolean') {
          this._rebuild = _rebuild;
        } // define position of all lines


        if (this._rebuild) {
          var self = this;
          var blankLineOffset = 0;
          var leading = this.dom.leading;
          this.each(function () {
            var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
            var dy = leading * new SVGNumber(fontSize);

            if (this.dom.newLined) {
              this.attr('x', self.attr('x'));

              if (this.text() === '\n') {
                blankLineOffset += dy;
              } else {
                this.attr('dy', dy + blankLineOffset);
                blankLineOffset = 0;
              }
            }
          });
          this.fire('rebuild');
        }

        return this;
      } // Enable / disable build mode

    }, {
      key: "build",
      value: function build(_build) {
        this._build = !!_build;
        return this;
      } // overwrite method from parent to set data properly

    }, {
      key: "setData",
      value: function setData(o) {
        this.dom = o;
        this.dom.leading = new SVGNumber(o.leading || 1.3);
        return this;
      }
    }]);

    return Text;
  }(Shape);
  extend(Text, textable);
  registerMethods({
    Container: {
      // Create text element
      text: wrapWithAttrCheck(function (text) {
        return this.put(new Text()).text(text);
      }),
      // Create plain text element
      plain: wrapWithAttrCheck(function (text) {
        return this.put(new Text()).plain(text);
      })
    }
  });
  register(Text, 'Text');

  var Tspan =
  /*#__PURE__*/
  function (_Text) {
    _inherits(Tspan, _Text);

    // Initialize node
    function Tspan(node) {
      _classCallCheck(this, Tspan);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tspan).call(this, nodeOrNew('tspan', node), node));
    } // Set text content


    _createClass(Tspan, [{
      key: "text",
      value: function text(_text) {
        if (_text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');
        typeof _text === 'function' ? _text.call(this, this) : this.plain(_text);
        return this;
      } // Shortcut dx

    }, {
      key: "dx",
      value: function dx(_dx) {
        return this.attr('dx', _dx);
      } // Shortcut dy

    }, {
      key: "dy",
      value: function dy(_dy) {
        return this.attr('dy', _dy);
      }
    }, {
      key: "x",
      value: function x(_x) {
        return this.attr('x', _x);
      }
    }, {
      key: "y",
      value: function y(_y) {
        return this.attr('x', _y);
      }
    }, {
      key: "move",
      value: function move(x, y) {
        return this.x(x).y(y);
      } // Create new line

    }, {
      key: "newLine",
      value: function newLine() {
        // fetch text parent
        var t = this.parent(Text); // mark new line

        this.dom.newLined = true;
        var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
        var dy = t.dom.leading * new SVGNumber(fontSize); // apply new position

        return this.dy(dy).attr('x', t.x());
      }
    }]);

    return Tspan;
  }(Text);
  extend(Tspan, textable);
  registerMethods({
    Tspan: {
      tspan: wrapWithAttrCheck(function (text) {
        var tspan = new Tspan(); // clear if build mode is disabled

        if (!this._build) {
          this.clear();
        } // add new tspan


        this.node.appendChild(tspan.node);
        return tspan.text(text);
      })
    }
  });
  register(Tspan, 'Tspan');

  var ClipPath =
  /*#__PURE__*/
  function (_Container) {
    _inherits(ClipPath, _Container);

    function ClipPath(node) {
      _classCallCheck(this, ClipPath);

      return _possibleConstructorReturn(this, _getPrototypeOf(ClipPath).call(this, nodeOrNew('clipPath', node), node));
    } // Unclip all clipped elements and remove itself


    _createClass(ClipPath, [{
      key: "remove",
      value: function remove() {
        // unclip all targets
        this.targets().forEach(function (el) {
          el.unclip();
        }); // remove clipPath from parent

        return _get(_getPrototypeOf(ClipPath.prototype), "remove", this).call(this);
      }
    }, {
      key: "targets",
      value: function targets() {
        return baseFind('svg [clip-path*="' + this.id() + '"]');
      }
    }]);

    return ClipPath;
  }(Container);
  registerMethods({
    Container: {
      // Create clipping element
      clip: wrapWithAttrCheck(function () {
        return this.defs().put(new ClipPath());
      })
    },
    Element: {
      // Distribute clipPath to svg element
      clipWith: function clipWith(element) {
        // use given clip or create a new one
        var clipper = element instanceof ClipPath ? element : this.parent().clip().add(element); // apply mask

        return this.attr('clip-path', 'url("#' + clipper.id() + '")');
      },
      // Unclip element
      unclip: function unclip() {
        return this.attr('clip-path', null);
      },
      clipper: function clipper() {
        return this.reference('clip-path');
      }
    }
  });
  register(ClipPath, 'ClipPath');

  var ForeignObject =
  /*#__PURE__*/
  function (_Element) {
    _inherits(ForeignObject, _Element);

    function ForeignObject(node) {
      _classCallCheck(this, ForeignObject);

      return _possibleConstructorReturn(this, _getPrototypeOf(ForeignObject).call(this, nodeOrNew('foreignObject', node), node));
    }

    return ForeignObject;
  }(Element);
  registerMethods({
    Container: {
      foreignObject: wrapWithAttrCheck(function (width, height) {
        return this.put(new ForeignObject()).size(width, height);
      })
    }
  });
  register(ForeignObject, 'ForeignObject');

  var G =
  /*#__PURE__*/
  function (_Container) {
    _inherits(G, _Container);

    function G(node) {
      _classCallCheck(this, G);

      return _possibleConstructorReturn(this, _getPrototypeOf(G).call(this, nodeOrNew('g', node), node));
    }

    _createClass(G, [{
      key: "x",
      value: function x(_x) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
        if (_x == null) return box.x;
        return this.move(_x, box.y, box);
      }
    }, {
      key: "y",
      value: function y(_y) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
        if (_y == null) return box.y;
        return this.move(box.x, _y, box);
      }
    }, {
      key: "move",
      value: function move() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
        var dx = x - box.x;
        var dy = y - box.y;
        return this.dmove(dx, dy);
      }
    }, {
      key: "dx",
      value: function dx(_dx) {
        return this.dmove(_dx, 0);
      }
    }, {
      key: "dy",
      value: function dy(_dy) {
        return this.dmove(0, _dy);
      }
    }, {
      key: "dmove",
      value: function dmove(dx, dy) {
        this.children().forEach(function (child, i) {
          // Get the childs bbox
          var bbox = child.bbox(); // Get childs matrix

          var m = new Matrix(child); // Translate childs matrix by amount and
          // transform it back into parents space

          var matrix = m.translate(dx, dy).transform(m.inverse()); // Calculate new x and y from old box

          var p = new Point(bbox.x, bbox.y).transform(matrix); // Move element

          child.move(p.x, p.y);
        });
        return this;
      }
    }, {
      key: "width",
      value: function width(_width) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
        if (_width == null) return box.width;
        return this.size(_width, box.height, box);
      }
    }, {
      key: "height",
      value: function height(_height) {
        var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
        if (_height == null) return box.height;
        return this.size(box.width, _height, box);
      }
    }, {
      key: "size",
      value: function size(width, height) {
        var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
        var p = proportionalSize(this, width, height, box);
        var scaleX = p.width / box.width;
        var scaleY = p.height / box.height;
        this.children().forEach(function (child, i) {
          var o = new Point(box).transform(new Matrix(child).inverse());
          child.scale(scaleX, scaleY, o.x, o.y);
        });
        return this;
      }
    }]);

    return G;
  }(Container);
  registerMethods({
    Container: {
      // Create a group element
      group: wrapWithAttrCheck(function () {
        return this.put(new G());
      })
    }
  });
  register(G, 'G');

  var A =
  /*#__PURE__*/
  function (_Container) {
    _inherits(A, _Container);

    function A(node) {
      _classCallCheck(this, A);

      return _possibleConstructorReturn(this, _getPrototypeOf(A).call(this, nodeOrNew('a', node), node));
    } // Link url


    _createClass(A, [{
      key: "to",
      value: function to(url) {
        return this.attr('href', url, xlink);
      } // Link target attribute

    }, {
      key: "target",
      value: function target(_target) {
        return this.attr('target', _target);
      }
    }]);

    return A;
  }(Container);
  registerMethods({
    Container: {
      // Create a hyperlink element
      link: wrapWithAttrCheck(function (url) {
        return this.put(new A()).to(url);
      })
    },
    Element: {
      // Create a hyperlink element
      linkTo: function linkTo(url) {
        var link = new A();

        if (typeof url === 'function') {
          url.call(link, link);
        } else {
          link.to(url);
        }

        return this.parent().put(link).put(this);
      }
    }
  });
  register(A, 'A');

  var Mask =
  /*#__PURE__*/
  function (_Container) {
    _inherits(Mask, _Container);

    // Initialize node
    function Mask(node) {
      _classCallCheck(this, Mask);

      return _possibleConstructorReturn(this, _getPrototypeOf(Mask).call(this, nodeOrNew('mask', node), node));
    } // Unmask all masked elements and remove itself


    _createClass(Mask, [{
      key: "remove",
      value: function remove() {
        // unmask all targets
        this.targets().forEach(function (el) {
          el.unmask();
        }); // remove mask from parent

        return _get(_getPrototypeOf(Mask.prototype), "remove", this).call(this);
      }
    }, {
      key: "targets",
      value: function targets() {
        return baseFind('svg [mask*="' + this.id() + '"]');
      }
    }]);

    return Mask;
  }(Container);
  registerMethods({
    Container: {
      mask: wrapWithAttrCheck(function () {
        return this.defs().put(new Mask());
      })
    },
    Element: {
      // Distribute mask to svg element
      maskWith: function maskWith(element) {
        // use given mask or create a new one
        var masker = element instanceof Mask ? element : this.parent().mask().add(element); // apply mask

        return this.attr('mask', 'url("#' + masker.id() + '")');
      },
      // Unmask element
      unmask: function unmask() {
        return this.attr('mask', null);
      },
      masker: function masker() {
        return this.reference('mask');
      }
    }
  });
  register(Mask, 'Mask');

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function cssRule(selector, rule) {
    if (!selector) return '';
    if (!rule) return selector;
    var ret = selector + '{';

    for (var i in rule) {
      ret += unCamelCase(i) + ':' + rule[i] + ';';
    }

    ret += '}';
    return ret;
  }

  var Style =
  /*#__PURE__*/
  function (_Element) {
    _inherits(Style, _Element);

    function Style(node) {
      _classCallCheck(this, Style);

      return _possibleConstructorReturn(this, _getPrototypeOf(Style).call(this, nodeOrNew('style', node), node));
    }

    _createClass(Style, [{
      key: "addText",
      value: function addText() {
        var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.node.textContent += w;
        return this;
      }
    }, {
      key: "font",
      value: function font(name, src) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.rule('@font-face', _objectSpread$2({
          fontFamily: name,
          src: src
        }, params));
      }
    }, {
      key: "rule",
      value: function rule(selector, obj) {
        return this.addText(cssRule(selector, obj));
      }
    }]);

    return Style;
  }(Element);
  registerMethods('Dom', {
    style: wrapWithAttrCheck(function (selector, obj) {
      return this.put(new Style()).rule(selector, obj);
    }),
    fontface: wrapWithAttrCheck(function (name, src, params) {
      return this.put(new Style()).font(name, src, params);
    })
  });
  register(Style, 'Style');

  var TextPath =
  /*#__PURE__*/
  function (_Text) {
    _inherits(TextPath, _Text);

    // Initialize node
    function TextPath(node) {
      _classCallCheck(this, TextPath);

      return _possibleConstructorReturn(this, _getPrototypeOf(TextPath).call(this, nodeOrNew('textPath', node), node));
    } // return the array of the path track element


    _createClass(TextPath, [{
      key: "array",
      value: function array() {
        var track = this.track();
        return track ? track.array() : null;
      } // Plot path if any

    }, {
      key: "plot",
      value: function plot(d) {
        var track = this.track();
        var pathArray = null;

        if (track) {
          pathArray = track.plot(d);
        }

        return d == null ? pathArray : this;
      } // Get the path element

    }, {
      key: "track",
      value: function track() {
        return this.reference('href');
      }
    }]);

    return TextPath;
  }(Text);
  registerMethods({
    Container: {
      textPath: wrapWithAttrCheck(function (text, path) {
        // Convert text to instance if needed
        if (!(text instanceof Text)) {
          text = this.text(text);
        }

        return text.path(path);
      })
    },
    Text: {
      // Create path for text to run on
      path: wrapWithAttrCheck(function (track) {
        var importNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var textPath = new TextPath(); // if track is a path, reuse it

        if (!(track instanceof Path)) {
          // create path element
          track = this.defs().path(track);
        } // link textPath to path and add content


        textPath.attr('href', '#' + track, xlink); // Transplant all nodes from text to textPath

        var node;

        if (importNodes) {
          while (node = this.node.firstChild) {
            textPath.node.appendChild(node);
          }
        } // add textPath element as child node and return textPath


        return this.put(textPath);
      }),
      // Get the textPath children
      textPath: function textPath() {
        return this.findOne('textPath');
      }
    },
    Path: {
      // creates a textPath from this path
      text: wrapWithAttrCheck(function (text) {
        // Convert text to instance if needed
        if (!(text instanceof Text)) {
          text = new Text().addTo(this.parent()).text(text);
        } // Create textPath from text and path and return


        return text.path(this);
      }),
      targets: function targets() {
        return baseFind('svg [href*="' + this.id() + '"]');
      }
    }
  });
  TextPath.prototype.MorphArray = PathArray;
  register(TextPath, 'TextPath');

  var Use =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Use, _Shape);

    function Use(node) {
      _classCallCheck(this, Use);

      return _possibleConstructorReturn(this, _getPrototypeOf(Use).call(this, nodeOrNew('use', node), node));
    } // Use element as a reference


    _createClass(Use, [{
      key: "element",
      value: function element(_element, file) {
        // Set lined element
        return this.attr('href', (file || '') + '#' + _element, xlink);
      }
    }]);

    return Use;
  }(Shape);
  registerMethods({
    Container: {
      // Create a use element
      use: wrapWithAttrCheck(function (element, file) {
        return this.put(new Use()).element(element, file);
      })
    }
  });
  register(Use, 'Use');

  /* Optional Modules */
  var SVG = makeInstance;
  extend([Svg, _Symbol, Image, Pattern, Marker], getMethodsFor('viewbox'));
  extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
  extend(Text, getMethodsFor('Text'));
  extend(Path, getMethodsFor('Path'));
  extend(Defs, getMethodsFor('Defs'));
  extend([Text, Tspan], getMethodsFor('Tspan'));
  extend([Rect, Ellipse, Circle, Gradient], getMethodsFor('radius'));
  extend(EventTarget, getMethodsFor('EventTarget'));
  extend(Dom, getMethodsFor('Dom'));
  extend(Element, getMethodsFor('Element'));
  extend(Shape, getMethodsFor('Shape')); // extend(Element, getConstructor('Memory'))

  extend(Container, getMethodsFor('Container'));
  extend(Runner, getMethodsFor('Runner'));
  List.extend(getMethodNames());
  registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray]);
  makeMorphable();

  // @ts-check
  // import css from "text!../../src/pcisig/css/regpict.css";

  const name$E = "pcisig/regpict";

  const cssPromise$2 = loadStyle$4();

  const debugOverride = false;

  class Path$1 {
    constructor(container) {
      this.thePath = container.path();
      this.pathString = "";
    }
    move(x, y, relative = false) {
      this.pathString += `${relative ? "m" : "M"}${x} ${y} `;
      this.thePath.plot(this.pathString);
    }
    line(x, y, relative = false) {
      this.pathString += `${relative ? "l" : "L"}${x} ${y} `;
      this.thePath.plot(this.pathString);
    }
    horiz(x, relative = false) {
      this.pathString += `${relative ? "h" : "H"}${x}`;
      this.thePath.plot(this.pathString);
    }
    vert(y, relative = false) {
      this.pathString += `${relative ? "v" : "V"}${y}`;
      this.thePath.plot(this.pathString);
    }
    fill(arg) {
      this.thePath.fill(arg);
    }
    stroke(arg) {
      this.thePath.stroke(arg);
    }
    opacity(arg) {
      this.thePath.opacity(arg);
    }
    curveTo(pointArray, relative = false) {
      if (pointArray.length % 6 !== 0) {
        console.log(`Path.curveTo: invalid pointArray Length`);
      } else {
        this.pathString += `${relative ? "c" : "C"}${pointArray.join(" ")}`;
        this.thePath.plot(this.pathString);
      }
    }
    smoothCurveTo(pointArray, relative = false) {
      if (pointArray.length % 4 !== 0) {
        console.log(`Path.smoothCurveTo: invalid pointArray Length`);
      } else {
        this.pathString += `${relative ? "s" : "S"}${pointArray.join(" ")}`;
        this.thePath.plot(this.pathString);
      }
    }
    quadCurveTo(pointArray, relative = false) {
      if (pointArray.length % 4 !== 0) {
        console.log(`Path.quadCurveTo: invalid pointArray Length`);
      } else {
        this.pathString += `${relative ? "q" : "Q"}${pointArray.join(" ")}`;
        this.thePath.plot(this.pathString);
      }
    }
    smoothQuadCurveTo(pointArray, relative = false) {
      if (pointArray.length % 2 !== 0) {
        console.log(`Path.smoothQuadCurveTo: invalid pointArray Length`);
      } else {
        this.pathString += `${relative ? "t" : "T"}${pointArray.join(" ")}`;
        this.thePath.plot(this.pathString);
      }
    }
    elipticalArc(pointArray, relative = false) {
      if (pointArray.length % 7 !== 0) {
        console.log(`Path.elipricalArc: invalid pointArray Length`);
      } else {
        this.pathString += `${relative ? "a" : "A"}${pointArray.join(" ")}`;
        this.thePath.plot(this.pathString);
      }
    }
    close() {
      this.pathString += "Z";
      this.thePath.plot(this.pathString);
    }
    addClass(cls) {
      this.thePath.addClass(cls);
    }
  }

  async function loadStyle$4() {
    try {
      return (await Promise.resolve().then(function () { return regpict$2; })).default;
    } catch {
      return fetchAsset("regpict.css");
    }
  }

  let mergeCount = 0;

  /**
   * Merges two JSON objects together.
   * Src object properties override existing target properties.
   * @param {Object} target starting object (modified)
   * @param {object} src merging object
   * @returns {Object} modified target
   */
  function mergeJSON$1(target, src) {
    const cnt = ++mergeCount;
    const json = typeof src !== "string" ? src : JSON.parse(src);
    if (Array.isArray(json.fields)) {
      json.fields = json.fields.reduce((obj, item) => {
        obj[item.name] = Object.assign(
          {},
          obj.hasOwnProperty(item.name) ? obj[item.name] : {},
          item
        );
        return obj;
      }, {});
    }
    Object.keys(json).forEach(prop => {
      if (json.hasOwnProperty(prop)) {
        if (prop !== "fields") {
          // everything except fields is a primitive value
          target[prop] = json[prop];
        } else {
          // ensure target.fields exists
          if (!target.hasOwnProperty("fields")) target.fields = {};
          // convert array source into an Object (key is field.name)
          // target.fields is always an Object
          {
            // copy all fields in json.fields
            Object.keys(json.fields).forEach(name => {
              target.fields[name] = Object.assign(
                {},
                target.fields.hasOwnProperty(name) ? target.fields[name] : {},
                json.fields[name]
              );
            });
          }
        }
      }
    });
    return target;
  }

  /**
   * Merges an HTMLElement containing JSON into an existing JSON object.
   * HTMLElement properties override existing properties.
   * @param {Object} result starting object (modified)
   * @param {Element} me element with json content to merge in
   */
  function mergeElementJSON(result, me) {
    const cnt = ++mergeCount;
    const debug2 = debugOverride;
    if (me && me instanceof HTMLElement) {
      if (me.hasAttribute("data-parents")) {
        me.getAttribute("data-parents")
          .split(/\s+/)
          .forEach(parent => {
            const temp = document.querySelector(`#${parent}`);
            result = mergeElementJSON(result, temp);
          });
      }
      try {
        result = mergeJSON$1(result, me.textContent);
        me.classList.add("hide");
        if (debug2) ;
      } catch (e) {
        showInlineError(me, `Invalid JSON in element ${e.toString()}`, "");
      }
    }
    return result;
  }

  /**
   * choose_defaults
   * Returns new JSON that's a copy of the input but fills in default values.
   *
   * @param   {Object} inputJSON
   * @return  {Object}
   * @access  public
   */
  function choose_defaults(inputJSON) {
    /**
     * pget(string, object)
     * Returns the value of a inputJSON property, substituting a default
     * if the property is not present or is null.
     *
     * @param  {String} prop  Property Name
     * @param  {Object} def   Default Value
     * @return {Object} Value
     * @access  public
     */
    function pget(prop, def) {
      return inputJSON !== null &&
        inputJSON.hasOwnProperty(prop) &&
        inputJSON[prop] !== null
        ? inputJSON[prop]
        : def;
    }

    /**
     * pget_String(string, string)
     * Returns the string value of a inputJSON property, substituting a default if the property is not present or is null.
     *
     * @param  {String} prop Property Name
     * @param  {Object} def Default Value (convertible to String if not already one)
     * @return {String}
     * @access  public
     */
    function pget_String(prop, def) {
      return String(pget(prop, def));
    }

    /**
     * pget_Number(string, string)
     * Returns the numeric value of a inputJSON property, substituting a default if the property is not present or is null.
     *
     * @param   {String} prop string  Property Name
     * @param   {Object} def  object  Default Value (convertible to Number if not already one)
     * @return  {Number}
     * @access  public
     */
    function pget_Number(prop, def) {
      return Number(pget(prop, def));
    }

    /**
     * pget_Boolean(string, string)
     * Returns the boolean value of a inputJSON property, substituting a default if the property is not present or is null.
     *
     * @param   {String} prop string  Property Name
     * @param   {Object} def  object  Default Value (convertible to Number if not already one)
     * @return  {Boolean}
     * @access  public
     */
    function pget_Boolean(prop, def) {
      return Boolean(pget(prop, def));
    }

    const debug = pget_Boolean("debug", debugOverride);
    const json = {
      preClass: pget_String("preClass", "hide"),
      width: pget_Number("width", 32),
      wordWidth: pget_Number("wordWidth", 32),
      debug,
      defaultUnused: pget_String("defaultUnused", "RsvdP"),
      defaultAttr: pget_String("defaultAttr", "other"),
      cellWidth: pget_Number("cellWidth", 16),
      cellHeight: pget_Number("cellHeight", 32),
      cellInternalHeight: pget_Number("cellInternalHeight", 8),
      bracketHeight: pget_Number("bracketHeight", 4),
      cellTop: pget_Number("cellTop", 40),
      bitWidthPos: pget_Number("bitWidthPos", 20),
      figName: pget_String("figName", "???"),
      maxFigWidth: pget_Number("maxFigWidth", 624), // 6.5 inches (assuming 96 px per inch)
      visibleLSB: pget_Number("visibleLSB", 0),
      isRegister: pget_Boolean("isRegister", true), // default
      isMessage: pget_Boolean("isMessage", false),
      isMemoryBlock: pget_Boolean("isMemoryBlock", false),
    };
    json.visibleMSB = pget_Number("visibleMSB", json.width);

    // isMessage, isMemoryBlock, and isRegister are mutually exclusive.
    // 1. isMessage has highest priority
    // 2. isMemoryBlock has middle priority
    // 3. isRegister has lowest priority and is the default
    if (json.isMessage) {
      json.isRegister = false;
      json.isMemoryBlock = false;
    } else if (json.isMemoryBlock) {
      json.isRegister = false;
      json.isMessage = false;
    } else {
      json.isRegister = true;
      json.isMemoryBlock = false;
      json.isMessage = false;
    }

    json.rowLabelTop = pget_Number("rowLabelTop", 20); // top of text for regLabel
    json.cellValueTop = pget_Number("cellValueTop", 18); // top of text for regFieldValueInternal
    json.cellBitValueTop = pget_Number("cellBitValueTop", 22); // top of text for regFieldBitValue
    json.cellNameTop = pget_Number("cellNameTop", 18); // top of text for regFieldNameInternal

    json.left_to_right = pget_Boolean("leftToRight", json.isMessage);
    json.forceFit = pget_Boolean(
      "forceFit",
      json.isMessage || json.isMemoryBlock
    );
    json.figLeft = pget_Number("figLeft", json.left_to_right ? 96 : 40);

    json.fields = pget("fields", {}); // default to empty register

    if (json.visibleMSB < 0) {
      json.visibleMSB = 0;
    }
    if (json.visibleMSB > json.width) {
      json.visibleMSB = json.width;
    }
    if (json.visibleLSB < 0) {
      json.visibleLSB = 0;
    }
    if (json.visibleLSB > json.width) {
      json.visibleLSB = json.width;
    }

    if (debug) {
      console.log(
        `choose_defaults: width=${json.width} defaultUnused=${json.defaultUnused} cellWidth=${json.cellWidth} cellHeight=${json.cellHeight} cellInternalHeight=${json.cellInternalHeight} cellTop=${json.cellTop} bracketHeight=${json.bracketHeight}`
      );
      console.log(`choose_defaults: fields=${JSON.stringify(json, null, 2)}`);
    }
    // copy fields element over and sanitize it
    for (const old_item_name in inputJSON.fields) {
      // if (!inputJSON.hasOwnProperty(old_item_name)) continue;
      const item = Object.assign({}, inputJSON.fields[old_item_name]);
      if (debug) {
        console.log(
          `choose_defaults: Object.assign() "${old_item_name}": ${JSON.stringify(
          item
        )}`
        );
      }
      if (item.hasOwnProperty("msbit") || item.hasOwnProperty("msbyte")) {
        let byte = 0;
        let bit = 0;
        if (item.hasOwnProperty("msbit")) {
          byte = Math.floor(item.msbit / 8);
          bit = item.msbit % 8;
        }
        if (item.hasOwnProperty("msbyte")) {
          byte = byte + item.msbyte;
        }
        item.msb = byte * 8 + (json.isMessage ? 7 - bit : bit);
      }
      if (item.hasOwnProperty("lsbit") || item.hasOwnProperty("lsbyte")) {
        let byte = 0;
        let bit = 0;
        if (item.hasOwnProperty("lsbit")) {
          byte = Math.floor(item.lsbit / 8);
          bit = item.lsbit % 8;
        }
        if (item.hasOwnProperty("lsbyte")) {
          byte = byte + item.lsbyte;
        }
        item.lsb = byte * 8 + (json.isMessage ? 7 - bit : bit);
      }
      if (item.hasOwnProperty("msb") && !item.hasOwnProperty("lsb")) {
        item.lsb = item.msb;
      }
      if (item.hasOwnProperty("lsb") && !item.hasOwnProperty("msb")) {
        item.msb = item.lsb;
      }
      if (item.msb < item.lsb) {
        const temp = item.lsb;
        item.lsb = item.msb;
        item.msb = temp;
      }
      if (!item.hasOwnProperty("lsbyte") || !item.hasOwnProperty("lsbit")) {
        item.lsbyte = Math.floor(item.lsb / 8);
        item.lsbit = item.lsb % 8;
      }
      if (!item.hasOwnProperty("msbyte") || !item.hasOwnProperty("msbit")) {
        item.msbyte = Math.floor(item.msb / 8);
        item.msbit = item.msb % 8;
      }
      if (!item.hasOwnProperty("isUnused")) {
        item.isUnused = false;
      }
      if (!item.hasOwnProperty("attr")) {
        item.attr = json.defaultAttr;
      }
      if (!item.hasOwnProperty("name")) {
        item.name = old_item_name;
      }
      if (!item.hasOwnProperty("value")) {
        item.value = "";
      }
      json.fields[item.name] = item;
      if (debug) {
        console.log(
          `choose_defaults: field: msb=${item.msb} lsb=${item.lsb} attr=${item.attr} isUnused=${item.isUnused} name="${item.name}"`
        );
      }
    }
    return json;
  }

  /**
   * draw_regpict
   * Creates an SVG drawing for the register descriped by inputJSoN in the
   * otherwise empty HTMLElement divsvg.
   *
   * @param   {HTMLElement} divsvg
   * @param   {Object}      inputJSON
   * @return  {Object}      JSON used to draw the register
   * @access  public
   */
  function draw_regpict(divsvg, inputJSON) {
    const reg = choose_defaults(inputJSON);
    const width = reg.width;
    // console.log(`width=${reg.width}`);
    const wordWidth = reg.wordWidth;
    const left_to_right = reg.left_to_right;
    const forceFit = reg.forceFit;
    const debug = reg.debug;
    const preClass = reg.preClass;
    const defaultUnused = reg.defaultUnused;
    // const defaultAttr = reg.defaultAttr;
    const cellWidth = reg.cellWidth;
    const cellHeight = reg.cellHeight;
    const cellInternalHeight = reg.cellInternalHeight;
    const rowLabelTop = reg.rowLabelTop;
    const cellValueTop = reg.cellValueTop;
    const cellBitValueTop = reg.cellBitValueTop;
    const cellNameTop = reg.cellNameTop;
    const bracketHeight = reg.bracketHeight;
    const cellTop = reg.cellTop;
    const bitWidthPos = reg.bitWidthPos;
    const figName = reg.figName;
    const maxFigWidth = reg.maxFigWidth;
    const figLeft = reg.figLeft;
    const visibleLSB = reg.visibleLSB;
    const visibleMSB = reg.visibleMSB;
    const fields = reg.fields;
    const isRegister = reg.isRegister;
    const isMessage = reg.isMessage;
    const isMemoryBlock = reg.isMemoryBlock;
    const isMultiRow = isMessage || isMemoryBlock;

    if (debug) {
      console.log(`start draw_regpic(${figName} width=${width}`);
    }
    const bitarray = []; // Array indexed by bit # in register range 0:width
    // bitarray[N] == fields[x] where field x contains bit N
    // bitarray[N] == null for unused bits
    // bitarray[N] == 1000 for first bit outside register width

    let item;
    let j;
    for (item = 0; item < width; ++item) {
      bitarray[item] = null;
    }
    bitarray[width] = 1000; // ???

    for (const item in fields) {
      if (fields.hasOwnProperty(item)) {
        for (let i = fields[item].lsb; i <= fields[item].msb; ++i) {
          bitarray[i] = item;
        }
      }
    }

    let lsb = -1; // if >= 0, contains bit# of lsb of a string of unused bits
    for (item = 0; item <= width; ++item) {
      // note: includes bitarray[width]
      if (lsb >= 0 && bitarray[item] !== null) {
        // first "used" bit after stretch of unused bits, invent an "unused" field
        let unused_item = `_unused_${item - 1}`; // _unused_msb
        if (lsb !== item - 1) {
          unused_item = `${unused_item}_${lsb}`; // _unused_msb_lsb
        }
        fields[unused_item] = {
          msb: item - 1,
          lsb,
          // "name": ((i - lsb) * 2 - 1) >= defaultUnused.length ? defaultUnused : defaultUnused[0].toUpperCase(), // use full name if if fits, else use 1st char
          name: defaultUnused,
          attr: defaultUnused.toLowerCase(), // attribute is name
          isUnused: true,
          value: "",
        };
        for (j = lsb; j < item; j++) {
          bitarray[j] = unused_item;
        }
        lsb = -1;
      }
      if (lsb < 0 && bitarray[item] === null) {
        // starting a string of unused bits
        lsb = item;
      }
    }

    function max(a, b) {
      return a > b ? a : b;
    }

    function min(a, b) {
      return a < b ? a : b;
    }

    // x position of left edge of bit i
    function leftOf(i) {
      let adj_bit = i;
      if (i >= 0) {
        if (i > visibleMSB) {
          adj_bit = visibleMSB;
        }
        if (i < visibleLSB) {
          adj_bit = visibleLSB;
        }
        if (left_to_right) {
          adj_bit = adj_bit - visibleLSB;
        } else {
          adj_bit = visibleMSB - adj_bit;
        }
        if (isMultiRow) {
          adj_bit = adj_bit % wordWidth; // modulo
          adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
        }
      } else {
        // negative bit #, always to the right
        if (isMultiRow) {
          adj_bit = wordWidth - i - 0.5;
        } else {
          adj_bit = visibleMSB - visibleLSB - i - 0.5;
        }
      }
      const ret = figLeft + cellWidth * (adj_bit - 0.5);
      if (debug) {
        console.log(
          `${`${i} leftOf   left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit= ${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret= ${ret}`
        );
      }
      return ret;
    }

    // x position of right edge of bit i
    function rightOf(i) {
      let adj_bit = i;
      if (i >= 0) {
        if (i > visibleMSB) {
          adj_bit = visibleMSB;
        }
        if (i < visibleLSB) {
          adj_bit = visibleLSB;
        }
        if (left_to_right) {
          adj_bit = adj_bit - visibleLSB;
        } else {
          adj_bit = visibleMSB - adj_bit;
        }
        if (isMultiRow) {
          adj_bit = adj_bit % wordWidth; // modulo
          adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
        }
      } else {
        // negative bit #, always to the right
        if (isMultiRow) {
          adj_bit = wordWidth - i - 0.5;
        } else {
          adj_bit = visibleMSB - visibleLSB - i - 0.5;
        }
      }
      const ret = figLeft + cellWidth * (adj_bit + 0.5);
      if (debug) {
        console.log(
          `${`${i} rightOf  left_to_right= ${left_to_right} ` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret=${ret}`
        );
      }
      return ret;
    }

    // x position of middle of bit i
    function middleOf(i) {
      let adj_bit = i;
      if (i >= 0) {
        if (i > visibleMSB) {
          adj_bit = visibleMSB;
        }
        if (i < visibleLSB) {
          adj_bit = visibleLSB;
        }
        if (left_to_right) {
          adj_bit = adj_bit - visibleLSB;
        } else {
          adj_bit = visibleMSB - adj_bit;
        }
        if (isMultiRow) {
          adj_bit = adj_bit % wordWidth; // modulo
          adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
        }
      } else {
        // negative bit #, always to the right
        if (isMultiRow) {
          adj_bit = wordWidth - i - 0.5;
        } else {
          adj_bit = visibleMSB - visibleLSB - i - 0.5;
        }
      }
      const ret = figLeft + cellWidth * adj_bit;
      if (debug) {
        console.log(
          `${`${i} middleOf left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret=${ret}`
        );
      }
      return ret;
    }

    function rowOf(i) {
      return isMultiRow && i >= 0 ? Math.floor(i / wordWidth) : 0;
    }

    if (debug) {
      console.log(JSON.stringify(reg, null, " "));
      console.log(` forceFit=${forceFit} left_to_right=${left_to_right}`);
    }
    if (debug) {
      divsvg.insertAdjacentHTML(
        "beforebegin",
        `<pre class="${preClass}">
 ${JSON.stringify(reg, null, " ")}
 </pre>`
      );
    }

    let g;
    let p;
    let text;
    let nextBitLine = cellTop + cellHeight + 20; // 76;
    let bitLineCount = 0;
    let max_text_width = 12 * 8; // allow for 12 characters at 8px each

    const svg = SVG()
      .addTo(divsvg)
      .attr({ width: 800, height: 500 }); // will be overridden

    if (isMemoryBlock) {
      // create header for memory block (31..0)
      let pos;
      const text_height = 18; // Assume 18px: 1 row of text, 15px high
      g = svg.group();
      for (let b = 0; b < wordWidth; b++) {
        g.text(b.toString())
          .x(middleOf(b))
          .y(cellTop - 20)
          .addClass("regBitNumMiddle");
        if (debug) {
          console.log(`bitnum-middle ${b} at x=${middleOf(b)} y=${cellTop - 18}`);
        }
        pos = left_to_right ? leftOf(b) : rightOf(b);
        g.line(
          pos,
          cellTop,
          pos,
          cellTop - text_height * (b % 8 === 0 ? 1.0 : 0.75)
        ).addClass("regBitNumLine");
      }
      pos = left_to_right ? rightOf(wordWidth - 1) : leftOf(wordWidth - 1);
      g.line(pos, cellTop, pos, cellTop - text_height).addClass("regBitNumLine");
      g.text("Byte Offset")
        .x(rightOf(-1.5) - 6)
        .y(cellTop - 20)
        .addClass("regRowTagRight")
        .addClass("rowTagByteOffset");
    } else if (isMessage) {
      // create header for message (+0/+1/+2/+3 then 4 of 7..0)
      let pos;
      const text_height = 18; // Assume 18px: 1 row of text, 15px high
      g = svg.group();
      for (let byte = 0; byte < wordWidth; byte += 8) {
        for (let bit = 0; bit < 8; bit++) {
          g.text(String(7 - bit))
            .x(middleOf(byte + bit))
            .y(cellTop - 20)
            .addClass("regBitNumMiddle");
          if (debug) {
            console.log(
              `bitnum-middle +${byte}/${bit} at x=${middleOf(
              bit + byte
            )} y=${cellTop - 20}`
            );
          }
          pos = left_to_right ? leftOf(byte + bit) : rightOf(byte + bit);
          g.line(
            pos,
            cellTop,
            pos,
            cellTop - text_height * (bit === 0 ? 1.75 : 0.75)
          ).addClass("regBitNumLine");
        }

        const byteHeight = cellTop - 18 - text_height;
        g.text(`+${byte / 8}`)
          .x(leftOf(byte) + cellWidth * 4)
          .y(byteHeight)
          .addClass("regByteNumMiddle");
        if (debug) {
          console.log(
            `bitnum-middle +${byte} at x=${leftOf(byte) +
            cellWidth * 4} y= ${byteHeight}`
          );
        }
      }
      pos = left_to_right ? rightOf(wordWidth - 1) : leftOf(wordWidth - 1);
      g.line(pos, cellTop, pos, cellTop - text_height * 1.75).addClass(
        "regBitNumLine"
      );
    }

    for (let b2 = 0; b2 < width; b2++) {
      const b = left_to_right ? width - b2 - 1 : b2;
      for (const name in fields) {
        const f = fields[name];
        const gAddClass = ["regFieldInternal", `regAttr_${f.attr}`, "regLink"];

        if (b === f.lsb) {
          g = svg.group();
          if (isRegister) {
            // create header for register (msb and lsb of each field)
            // let bitnum_width;
            if (f.lsb === f.msb) {
              g.text(String(f.lsb))
                .x(middleOf(f.lsb))
                .y(cellTop - 20)
                .addClass("regBitNumMiddle");
              if (debug) {
                console.log(
                  `bitnum-middle ${f.lsb} at x=${middleOf(f.lsb)} y=${cellTop -
                  20}`
                );
              }
            } else {
              let pos;
              let cls;
              let str;
              if (f.lsb < visibleLSB) {
                if (left_to_right) {
                  gAddClass.push("regFieldOverflowMSB");
                  str = `${f.lsb} ... ${visibleLSB}`;
                  pos = rightOf(f.lsb) - 2;
                  cls = "regBitNumEnd";
                } else {
                  gAddClass.push("regFieldOverflowLSB");
                  str = `${visibleLSB} ... ${f.lsb}`;
                  pos = leftOf(f.lsb) + 2;
                  cls = "regBitNumStart";
                }
              } else {
                str = f.lsb;
                if (left_to_right) {
                  pos = leftOf(f.lsb) + 2;
                  cls = "regBitNumStart";
                } else {
                  pos = rightOf(f.lsb) - 2;
                  cls = "regBitNumEnd";
                }
              }
              g.text(String(str))
                .x(pos)
                .y(cellTop - 20)
                .addClass(cls);
              if (debug) {
                console.log(
                  `bitnum-lsb ${f.lsb} at x=${pos} y=${cellTop -
                  20} left_to_right=${left_to_right}`
                );
              }

              if (f.msb > visibleMSB) {
                if (left_to_right) {
                  gAddClass.push("regFieldOverflowLSB");
                  str = `${visibleMSB} ... ${f.msb}`;
                  pos = leftOf(f.msb) + 2;
                  cls = "regBitNumStart";
                } else {
                  gAddClass.push("regFieldOverflowMSB");
                  str = `${f.msb} ... ${visibleMSB}`;
                  pos = rightOf(f.msb) - 2;
                  cls = "regBitNumEnd";
                }
              } else {
                str = f.msb;
                if (left_to_right) {
                  pos = rightOf(f.msb) - 2;
                  cls = "regBitNumEnd";
                } else {
                  pos = leftOf(f.msb) + 2;
                  cls = "regBitNumStart";
                }
              }
              g.text(String(str))
                .x(pos)
                .y(cellTop - 20)
                .addClass(cls);
              if (debug) {
                console.log(
                  `bitnum-msb ${f.msb} at x=${pos} y=${cellTop -
                  20} left_to_right=${left_to_right}`
                );
              }
            }
            if (f.lsb >= visibleLSB) {
              const pos = left_to_right ? leftOf(f.lsb) : rightOf(f.lsb);
              const text_height = 18; // Assume 18px: 1 row of text, 15px high
              g.line(pos, cellTop, pos, cellTop - text_height * 0.75).addClass(
                f.lsb === visibleLSB ? "regBitNumLine" : "regBitNumLine_Hide"
              );
            }
            if (f.msb <= visibleMSB) {
              const pos = left_to_right ? rightOf(f.msb) : leftOf(f.msb);
              const text_height = 18; // Assume 18px: 1 row of text, 15px high
              g.line(pos, cellTop, pos, cellTop - text_height * 0.75).addClass(
                "regBitNumLine"
              );
            }
          }
          if (f.hasOwnProperty("addClass") && typeof f.addClass === "string") {
            f.addClass.split(/\s+/).forEach(cls => gAddClass.push(cls));
          }
          if (f.isUnused) {
            gAddClass.push("regFieldUnused");
          }

          const startRow = rowOf(f.lsb);
          const endRow = rowOf(f.msb);

          if (isMultiRow && startRow !== endRow) {
            let leftCol1;
            let rightCol1;
            let leftCol2;
            let rightCol2;
            let rightEdge;
            let leftEdge;
            if (left_to_right) {
              // if (isMessage)
              leftCol1 = leftOf(f.lsb);
              rightCol2 = rightOf(f.msb);

              leftCol2 = leftOf(0);
              rightCol1 = rightOf(wordWidth - 1);

              leftEdge = leftOf(0);
              rightEdge = rightOf(wordWidth - 1);
            } else {
              // if (isMemoryBlock)
              leftCol1 = leftOf(wordWidth - 1);
              rightCol2 = rightOf(0);

              leftCol2 = leftOf(f.msb);
              rightCol1 = rightOf(f.lsb);

              leftEdge = leftOf(wordWidth - 1);
              rightEdge = rightOf(0);
            }
            if (debug) {
              console.log(
                `+++ field="${f.name}" leftCol1=${leftCol1} leftCol2=${leftCol2} leftEdge=${leftEdge} rightCol1=${rightCol1} rightCol2=${rightCol2} rightEdge=${rightEdge} startRow=${startRow} endRow=${endRow}`
              );
            }
            const p = new Path$1(g);
            p.move(leftCol1, cellTop + cellHeight * startRow);
            if (rightCol1 !== leftCol1) {
              p.line(rightCol1 - leftCol1, 0, true);
            }
            p.line(0, cellHeight, true); // move down 1 row
            if (startRow + 1 !== endRow) {
              if (rightEdge !== rightCol1) {
                p.line(rightEdge - rightCol1, 0, true);
              }
              p.line(0, cellHeight * (endRow - startRow - 1), true);
              if (rightCol2 !== rightEdge) {
                p.line(rightCol2 - rightEdge, 0, true);
              }
            } else {
              if (rightCol2 !== rightCol1) {
                p.line(rightCol2 - rightCol1, 0, true);
              }
            }
            p.line(0, cellHeight, true);
            p.line(leftCol2 - rightCol2, 0, true);
            p.line(0, -cellHeight, true);
            if (startRow + 1 !== endRow) {
              if (leftEdge !== leftCol2) {
                p.line(leftEdge - leftCol2, 0, true);
              }
              p.line(0, -cellHeight * (endRow - startRow - 1), true);
              if (leftCol1 !== leftEdge) {
                p.line(leftCol1 - leftEdge, 0, true);
              }
            } else {
              if (leftCol1 !== leftCol2) {
                p.line(leftCol1 - leftCol2, 0, true);
              }
            }
            p.line(0, -cellHeight, true); // move back to start col
            p.addClass("regFieldBox");
            p.close();
            g.rect({ width: rightCol1, height: cellHeight })
              // (leftCol1, cellTop + cellHeight * startRow, rightCol1 - leftCol1, cellHeight)
              .x(leftCol1)
              .y(cellTop + cellHeight * startRow)
              .addClass("regFieldBox")
              .addClass("hide");
            g.rect({ width: rightCol2 - leftCol2, height: cellHeight })
              // (leftCol2, cellTop + cellHeight * endRow, rightCol2 - leftCol2, cellHeight)
              .x(leftCol2)
              .y(cellTop + cellHeight * startRow)
              .addClass("regFieldBox")
              .addClass("hide");
            for (j = 1; j <= f.msb % wordWidth; j++) {
              const pos = left_to_right ? leftOf(j) : rightOf(j);
              g.line(
                pos,
                cellTop + cellHeight - cellInternalHeight + cellHeight * endRow,
                pos,
                cellTop + cellHeight + cellHeight * endRow
              ).addClass("regFieldBox");
            }
          } else {
            const leftCol = left_to_right ? leftOf(f.lsb) : leftOf(f.msb);
            const rightCol = left_to_right ? rightOf(f.msb) : rightOf(f.lsb);
            g.rect({ width: rightCol - leftCol, height: cellHeight })
              // (leftCol, cellTop + cellHeight * startRow, rightCol - leftCol, cellHeight)
              .x(leftCol)
              .y(cellTop + cellHeight * startRow)
              .addClass("regFieldBox");
            for (j = f.lsb + 1; j <= f.msb; j++) {
              if (j >= visibleLSB && j <= visibleMSB) {
                const pos = left_to_right ? leftOf(j) : rightOf(j);
                g.line(
                  pos,
                  cellTop +
                    cellHeight -
                    cellInternalHeight +
                    cellHeight * startRow,
                  pos,
                  cellTop + cellHeight + cellHeight * startRow
                ).addClass("regFieldBox");
              }
            }
          }

          if (isRegister) {
            g.text(f.msb === f.lsb ? "1 bit" : `${f.msb - f.lsb + 1} bits`)
              .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
              .y(cellTop - bitWidthPos - 20)
              .addClass("regBitWidth");
          }
          text = g.text(f.name);
          text
            .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
            .y(
              cellTop +
                cellNameTop +
                cellHeight * (startRow + (endRow - startRow) / 2) -
                20
            )
            .addClass("regFieldName");
          if (!f.isUnused && f.lsb <= visibleMSB && f.msb >= visibleLSB) {
            const temp_dom = document.createElement("span");
            divsvg.prepend(temp_dom);
            const unique_id = addId(
              temp_dom,
              "regpict",
              f.id ? f.id : `${figName}-${f.name}`
            );
            temp_dom.remove();
            g.attr({ id: unique_id });
          }
          let hasValue = false;
          if ("value" in f) {
            if (Array.isArray(f.value) && f.value.length === f.msb - f.lsb + 1) {
              hasValue = true;
              for (item = 0; item < f.value.length; ++item) {
                const temp = g
                  .text(f.value[item])
                  .x((leftOf(f.lsb + item) + rightOf(f.lsb + item)) / 2)
                  .y(cellTop + cellBitValueTop + cellHeight * startRow - 10)
                  .addClass("regFieldValue")
                  .addClass("regFieldBitValue")
                  .addClass(`regFieldBitValue-${item.toString()}`);
                if (item === f.value.length - 1) {
                  temp.addClass("regFieldBitValue-msb");
                }
              }
            } else if (typeof f.value === "string" || f.value instanceof String) {
              if (f.value.length > 0) {
                hasValue = true;
                g.text(f.value)
                  .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
                  .y(
                    cellTop +
                      (f.msb === f.lsb ? cellBitValueTop : cellValueTop) +
                      cellHeight * startRow -
                      10
                  )
                  .addClass("regFieldValue");
              }
            } else {
              g.text("INVALID VALUE")
                .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
                .y(cellTop + cellValueTop + cellHeight * startRow - 20)
                .addClass("svg_error");
            }
          }
          let text_width = 0; // text.clientWidth;
          if (text_width === 0) {
            // bogus fix to guess width when clientWidth is 0 (e.g. IE10)
            text_width = f.name.length * 8; // Assume 8px per character on average for 15px height chars
          }
          let text_height = 0; // text.clientHeight; // TODO
          if (text_height === 0) {
            // bogus fix to guess width when clientHeight is 0 (e.g. IE10)
            text_height = 18; // Assume 18px: 1 row of text, 15px high
          }
          const boxLeft = leftOf(
            left_to_right ? max(visibleLSB, f.lsb) : min(visibleMSB, f.msb)
          );
          const boxRight = rightOf(
            left_to_right ? min(visibleMSB, f.msb) : max(visibleLSB, f.lsb)
          );
          const boxTop = cellTop + cellHeight * startRow;
          if (debug) {
            console.log(
              `${`field ${f.name}` +
              ` msb=${f.msb}` +
              ` lsb=${f.lsb}` +
              ` attr=${f.attr}` +
              ` isUnused=${f.isUnused}`}${"id" in f ? f.id : ""}${
              hasValue ? " hasValue" : ""
            }`
            );
            console.log(
              // ` text.clientWidth=${text.clientWidth}` +
              ` text_width=${text_width}` +
                // ` text.clientHeight=${text.clientHeight}` +
                ` text_height=${text_height}` +
                ` boxLeft=${boxLeft}` +
                ` boxRight=${boxRight}` +
                ` boxWidth=${boxRight - boxLeft}` +
                ` boxTop=${boxTop}`
            );
          }
          /* if field has a specified value,
            the field name is too wide for the box,
            or the field name is too tall for the box */
          if (f.lsb > visibleMSB || f.msb < visibleLSB) {
            gAddClass[0] = "regFieldHidden";
          } else {
            if (
              !(forceFit || f.forceFit) &&
              (hasValue ||
                text_width + 2 > boxRight - boxLeft ||
                text_height + 2 > cellHeight - cellInternalHeight)
            ) {
              if (text_width > max_text_width) {
                max_text_width = text_width;
              }
              text
                .x(rightOf(-0.5))
                .y(nextBitLine - 15)
                .addClass("regFieldName");
              p = new Path$1(g);
              p.move(boxLeft, cellTop + cellHeight * (startRow + 1));
              p.line((boxRight - boxLeft) / 2, bracketHeight, true);
              p.line(boxRight, cellTop + cellHeight * (startRow + 1));
              p.addClass("regBitBracket");
              p.fill("none");
              p = new Path$1(g);
              p.move(
                boxLeft + (boxRight - boxLeft) / 2,
                cellTop + cellHeight * (startRow + 1) + bracketHeight
              );
              p.vert(nextBitLine - text_height / 4);
              p.horiz(rightOf(-0.4));
              p.addClass("regBitLine");
              p.fill("none");
              gAddClass[0] = "regFieldExternal";
              gAddClass.push(`regFieldExternal${bitLineCount < 2 ? "0" : "1"}`);
              nextBitLine += text_height + 2;
              bitLineCount = (bitLineCount + 1) % 4;
            }
          }
          if (f.msb > visibleLSB && f.lsb < visibleLSB) {
            if (left_to_right) {
              g.text("...")
                .x(leftOf(0) - 2)
                .y(cellTop + cellNameTop + cellHeight * startRow - 20)
                .addClass("regFieldExtendsLeft");
            } else {
              g.text("...")
                .x(rightOf(0) + 2)
                .y(cellTop + cellNameTop + cellHeight * startRow - 20)
                .addClass("regFieldExtendsRight");
            }
          }
          if (f.msb > visibleMSB && f.lsb < visibleMSB) {
            if (left_to_right) {
              g.text("...")
                .x(rightOf(f.msb) + 2)
                .y(cellTop + cellNameTop + cellHeight * startRow - 20)
                .addClass("regFieldExtendsRight");
            } else {
              g.text("...")
                .x(leftOf(f.msb) - 2)
                .y(cellTop + cellNameTop + cellHeight * startRow - 20)
                .addClass("regFieldExtendsLeft");
            }
          }
          gAddClass.forEach(cls => g.addClass(cls));
        }
      }
    }

    if (isMultiRow) {
      const g2 = svg.group();
      for (let i = 0; i < width; i += wordWidth) {
        const rowLabel = isMemoryBlock
          ? `+${Math.floor(i / 8)
            .toString(16)
            .padStart(3, "0")
            .toUpperCase()}h`
          : `Byte ${i / 8} → `;
        g2.text(rowLabel)
          .x(left_to_right ? leftOf(0) - 8 : rightOf(-1.5) + 2)
          .y(cellTop + rowLabelTop + cellHeight * (i / wordWidth) - 20)
          .addClass(left_to_right ? "regRowTagLeft" : "regRowTagRight");
      }
    }

    let scale = 1.0;
    max_text_width = max_text_width + rightOf(-1);
    if (isRegister && maxFigWidth > 0 && max_text_width > maxFigWidth) {
      scale = maxFigWidth / max_text_width;
    }
    const svgClass = [
      isMessage ? "isMessage" : isMemoryBlock ? "isMemoryBlock" : "isRegister",
      left_to_right ? "isLeftToRight" : "isRightToLeft",
    ];
    svg.attr({
      height: `${Math.ceil(
      scale * Math.ceil(nextBitLine + cellHeight * rowOf(width - 1))
    )}`,
      width: `${Math.ceil(scale * max_text_width)}`,
      viewBox: `0 0 ${max_text_width} ${Math.ceil(
      nextBitLine + cellHeight * rowOf(width - 1)
    )}`,
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      class_: svgClass.join(" "),
    });
    if (debug) {
      console.log(`end draw_regpicg(${figName} width=${width}`);
    }
    return reg;
  }

  /**
   * Copy indicated attribute from src Element to dest property if present.
   * @param {Object} dest starting object
   * @param {Element} src merging object
   * @param {String} attribute name
   * @param {String} property
   */
  function copyAttribute(dest, src, attribute, property) {
    if (src.hasAttribute(attribute)) dest[property] = src.getAttribute(attribute);
  }

  async function run$q(conf) {
    pub("start", "core/regpict");
    if (!conf.noRegpictCSS) {
      const css = await cssPromise$2;
      document.head.insertBefore(
        html$1`
        <style>
          ${css}
        </style>
      `,
        document.querySelector("link")
      );
    }

    document
      .querySelectorAll("figure.register, figure.message, figure.capability")
      .forEach(fig => {
        // let isRegister = $fig.classList.contains("register");
        let isMessage = fig.classList.contains("message");
        let isCapability = fig.classList.contains("capability");
        let isMemoryBlock = fig.classList.contains("memoryBlock");
        // isMessage, isMemoryBlock, and isRegister are mutually exclusive.
        // 1. isMessage has highest priority
        // 2. isMemoryBlock and isCapability have middle priority, isCapability implies isMemoryBlock
        // 3. isRegister has lowest priority and is the default
        if (isMessage) {
          // isRegister = false;
          isMemoryBlock = false;
          isCapability = false;
        } else if (isMemoryBlock || isCapability) {
          // isRegister = false;
          isMessage = false;
          isMemoryBlock = true; // implied by isCapability
        } else {
          // isRegister = true;
          isMessage = false;
          isMemoryBlock = false;
          isCapability = false;
        }

        const debug = debugOverride;

        let json = { fields: {}, debug };

        let figNum = 0;
        if (fig.getAttribute("id")) {
          json.figName = fig.getAttribute("id").replace(/^fig-/, "");
        } else {
          json.figName =
            fig.getAttribute("title") ||
            fig.querySelector("figcaption").textContent ||
            `unnamed-${++figNum}`;
        }
        addId(fig, "fig", json.figName);

        if (fig.hasAttribute("data-json")) {
          try {
            mergeJSON$1(json, fig.getAttribute("data-json"));
          } catch (e) {
            console.log(`error: ${e.toString()}`);
            // @ts-ignore
            showInlineError(fig, "Invalid data-json attribute", "");
          }
        }

        copyAttribute(json, fig, "data-width", "width");
        copyAttribute(json, fig, "data-wordWidth", "wordWidth");
        copyAttribute(json, fig, "data-unused", "defaultUnused");
        // copyAttribute(json, fig, "data-href", "href");
        copyAttribute(json, fig, "data-table", "table");
        // copyAttribute(json, fig, "data-register", "register");

        fig.querySelectorAll("pre.json,div.json,span.json").forEach(pre => {
          try {
            json = mergeElementJSON(json, pre);
            pre.classList.add("hide");
          } catch (e) {
            showInlineError(
              // @ts-ignore
              pre,
              `Invalid JSON in pre.json, div.json, or span.json ${e.toString()}`,
              ""
            );
          }
        });

        // if (json.hasOwnProperty("table")) {
        //   const tbl = document.querySelector(json.table, document);
        //   json = mergeJSON(parse_table(tbl), json);
        // }

        // invent a div to hold the svg
        const cap = fig.querySelector("figcaption");
        function create_divsvg() {
          if (cap) {
            cap.insertAdjacentHTML("beforebegin", `<div class="svg"></div>`);
          } else {
            fig.insertAdjacentHTML("beforeend", `<div class="svg"></div>`);
          }
          return fig.querySelector("div.svg:last-of-type");
        }

        const render = fig.querySelectorAll("pre.render,div.render,span.render");
        if (render.length > 0) {
          render.forEach(node => {
            const temp = mergeElementJSON(mergeJSON$1({}, json), node);
            const divsvg = create_divsvg();
            // @ts-ignore
            draw_regpict(divsvg, temp);
          });
        } else {
          // @ts-ignore
          draw_regpict(create_divsvg(), json);
        }
      });
  }

  var regpict = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$E,
    draw_regpict: draw_regpict,
    run: run$q
  });

  // @ts-check

  const name$F = "core/figures";

  const localizationStrings$a = {
    en: {
      list_of_figures: "List of Figures",
      fig: "Figure ",
    },
    ja: {
      fig: "図 ",
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
      fig: "图 ",
      list_of_figures: "规范中包含的图",
    },
    de: {
      fig: "Abbildung",
      list_of_figures: "Abbildungsverzeichnis",
    },
  };

  const l10n$c = getIntlData(localizationStrings$a);

  function run$r() {
    normalizeImages(document);

    const tof = collectFigures();

    // Create a Table of Figures if a section with id 'tof' exists.
    const tofElement = document.getElementById("tof");
    if (tof.length && tofElement) {
      decorateTableOfFigures(tofElement);
      tofElement.append(
        html$1`<h2>${l10n$c.list_of_figures}</h2>`,
        html$1`<ul class="tof">
        ${tof}
      </ul>`
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
    wrapInner$1(caption, html$1`<span class='fig-title'></span>`);
    caption.prepend(
      html$1`<span class='fighdr'>${l10n$c.fig}</span>`,
      html$1`<bdi class='figno'>${i + 1}</bdi>`,
      " "
    );
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
    return html$1`<li class='tofline'>
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
    name: name$F,
    run: run$r
  });

  // @ts-check

  const name$G = "core/equations";

  const localizationStrings$b = {
    en: {
      list_of_equations: "List of Equations",
      eqn: "Equation ",
    },
  };

  const l10n$d = getIntlData(localizationStrings$b);

  function run$s() {
    normalizeImages$1(document);

    const toe = collectEquations();

    // Create a Table of Equations if a section with id 'toe' exists.
    const toeElement = document.getElementById("toe");
    if (toe.length && toeElement) {
      decorateTableOfEquations(toeElement);
      toeElement.append(
        html$1`
        <h2>${l10n$d.list_of_equations}</h2>
      `,
        html$1`
        <ul class="toe">
          ${toe}
        </ul>
      `
      );
    }
  }

  /**
   * process all equations
   */
  function collectEquations() {
    /** @type {HTMLElement[]} */
    const toe = [];
    document.querySelectorAll("figure.equation").forEach((eqn, i) => {
      const caption = eqn.querySelector("figcaption");

      if (caption) {
        decorateEquation(eqn, caption, i);
        toe.push(getTableOfEquationsListItem(eqn.id, caption));
      } else {
        // @ts-ignore
        showInlineWarning(eqn, "Found a `<figure>` without a `<figcaption>`");
      }
    });
    return toe;
  }

  /**
   * @param {Element} equation
   * @param {HTMLElement} caption
   * @param {number} i
   */
  function decorateEquation(equation, caption, i) {
    const title = caption.textContent;
    addId(equation, "eqn", title);
    // set proper caption title
    wrapInner$1(
      caption,
      html$1`
      <span class="eqn-title"></span>
    `
    );
    caption.prepend(
      html$1`
      <span class="eqnhdr">${l10n$d.eqn}</span>
    `,
      html$1`
      <bdi class="eqnno">${i + 1}</bdi>
    `,
      " "
    );
  }

  /**
   * @param {string} equationId
   * @param {HTMLElement} caption
   * @return {HTMLElement}
   */
  function getTableOfEquationsListItem(equationId, caption) {
    const toeCaption = caption.cloneNode(true);
    toeCaption.querySelectorAll("a").forEach(anchor => {
      renameElement(anchor, "span").removeAttribute("href");
    });
    toeCaption.querySelectorAll("dfn").forEach(dfn => {
      renameElement(dfn, "span");
    });
    toeCaption.querySelectorAll("[id]").forEach(anchor => {
      anchor.removeAttribute("id");
    });
    toeCaption
      .querySelectorAll(
        "span.footnote, span.issue, span.respec-error, span.noToc"
      )
      .forEach(anchor => {
        // footnotes, issues, errors, and text explicitly marked noToC are not in a ToC
        anchor.remove();
      });
    return html$1`
    <li class="toeline">
      <a class="tocxref" href="${`#${equationId}`}">${toeCaption.childNodes}</a>
    </li>
  `;
  }

  function normalizeImages$1(doc) {
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
   * @param {Element} toeElement
   */
  function decorateTableOfEquations(toeElement) {
    if (
      toeElement.classList.contains("appendix") ||
      toeElement.classList.contains("introductory") ||
      toeElement.closest("section")
    ) {
      return;
    }

    const previousSections = getPreviousSections$1(toeElement);
    if (previousSections.every(sec => sec.classList.contains("introductory"))) {
      toeElement.classList.add("introductory");
    } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
      toeElement.classList.add("appendix");
    }
  }

  /**
   * @param {Element} element
   */
  function getPreviousSections$1(element) {
    /** @type {Element[]} */
    const sections = [];
    for (const previous of iteratePreviousElements$1(element)) {
      if (previous.localName === "section") {
        sections.push(previous);
      }
    }
    return sections;
  }

  /**
   * @param {Element} element
   */
  function* iteratePreviousElements$1(element) {
    let previous = element;
    while (previous.previousElementSibling) {
      previous = previous.previousElementSibling;
      yield previous;
    }
  }

  var equations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$G,
    run: run$s
  });

  // @ts-check

  const name$H = "core/tables";

  const localizationStrings$c = {
    en: {
      list_of_tables: "List of Tables",
      tbl: "Table ",
    },
  };

  const l10n$e = getIntlData(localizationStrings$c);

  function run$t() {
    const tot = collectTables();

    // Create a Table of Tables if a section with id 'tot' exists.
    const totElement = document.getElementById("tot");
    if (tot.length && totElement) {
      decorateTableOfTables(totElement);
      totElement.append(
        html$1`
        <h2>${l10n$e.list_of_tables}</h2>
      `,
        html$1`
        <ul class="tot">
          ${tot}
        </ul>
      `
      );
    }
  }

  /**
   * process all tables
   */
  function collectTables() {
    /** @type {HTMLElement[]} */
    const tot = [];
    document.querySelectorAll("table").forEach((tbl, i) => {
      const caption = tbl.querySelector("caption");

      if (caption) {
        decorateTable(tbl, caption, i);
        tot.push(getTableOfTablesListItem(tbl.id, caption));
        // } else {
        //   showInlineWarning(tbl, "Found a `<table>` without a `<caption>`");
      }
    });
    return tot;
  }

  /**
   * @param {HTMLElement} table
   * @param {HTMLElement} caption
   * @param {number} i
   */
  function decorateTable(table, caption, i) {
    const title = caption.textContent;
    addId(table, "tbl", title);
    // set proper caption title
    wrapInner$1(
      caption,
      html$1`
      <span class="tbl-title"></span>
    `
    );
    caption.prepend(
      html$1`
      <span class="tblhdr">${l10n$e.tbl}</span>
    `,
      html$1`
      <bdi class="tblno">${i + 1}</bdi>
    `,
      " "
    );
  }

  /**
   * @param {string} tableId
   * @param {HTMLElement} caption
   * @return {HTMLElement}
   */
  function getTableOfTablesListItem(tableId, caption) {
    const totCaption = caption.cloneNode(true);
    totCaption.querySelectorAll("a").forEach(anchor => {
      renameElement(anchor, "span").removeAttribute("href");
    });
    totCaption.querySelectorAll("dfn").forEach(dfn => {
      renameElement(dfn, "span");
    });
    totCaption.querySelectorAll("[id]").forEach(anchor => {
      anchor.removeAttribute("id");
    });
    totCaption
      .querySelectorAll(
        "span.footnote, span.issue, span.respec-error, span.noToc"
      )
      .forEach(anchor => {
        // footnotes, issues, errors, and text explicitly marked noToC are not in a ToC
        anchor.remove();
      });
    return html$1`
    <li class="totline">
      <a class="tocxref" href="${`#${tableId}`}">${totCaption.childNodes}</a>
    </li>
  `;
  }

  /**
   * if it has a parent section, don't touch it
   * if it has a class of appendix or introductory, don't touch it
   * if all the preceding section siblings are introductory, make it introductory
   * if there is a preceding section sibling which is an appendix, make it appendix
   * @param {Element} totElement
   */
  function decorateTableOfTables(totElement) {
    if (
      totElement.classList.contains("appendix") ||
      totElement.classList.contains("introductory") ||
      totElement.closest("section")
    ) {
      return;
    }

    const previousSections = getPreviousSections$2(totElement);
    if (previousSections.every(sec => sec.classList.contains("introductory"))) {
      totElement.classList.add("introductory");
    } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
      totElement.classList.add("appendix");
    }
  }

  /**
   * @param {Element} element
   */
  function getPreviousSections$2(element) {
    /** @type {Element[]} */
    const sections = [];
    for (const previous of iteratePreviousElements$2(element)) {
      if (previous.localName === "section") {
        sections.push(previous);
      }
    }
    return sections;
  }

  /**
   * @param {Element} element
   */
  function* iteratePreviousElements$2(element) {
    let previous = element;
    while (previous.previousElementSibling) {
      previous = previous.previousElementSibling;
      yield previous;
    }
  }

  var tables = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$H,
    run: run$t
  });

  // @ts-check
  const name$I = "core/data-cite";

  /**
   * An arbitrary constant value used as an alias to current spec's shortname. It
   * exists to simplify code as passing `conf.shortName` everywhere gets clumsy.
   */
  const THIS_SPEC = "__SPEC__";

  /**
   * @param {CiteDetails} citeDetails
   */
  async function getLinkProps(citeDetails) {
    const { key, frag, path } = citeDetails;
    let href = "";
    let title = "";
    // This is just referring to this document
    if (key === THIS_SPEC) {
      href = document.location.href;
    } else {
      // Let's go look it up in spec ref...
      const entry = await resolveRef(key);
      if (!entry) {
        return null;
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
    return { href, title };
  }

  /**
   * @param {HTMLElement} elem
   * @param {object} linkProps
   * @param {string} linkProps.href
   * @param {string} linkProps.title
   * @param {CiteDetails} citeDetails
   */
  function linkElem(elem, linkProps, citeDetails) {
    const { href, title } = linkProps;
    const wrapInCiteEl = !citeDetails.path && !citeDetails.frag;

    if (elem.localName === "a") {
      const anchor = /** @type {HTMLAnchorElement} */ (elem);
      if (anchor.textContent === "" && anchor.dataset.lt !== "the-empty-string") {
        anchor.textContent = title;
      }
      anchor.href = href;
      if (wrapInCiteEl) {
        const cite = document.createElement("cite");
        anchor.replaceWith(cite);
        cite.append(anchor);
      }
      return;
    }

    if (elem.localName === "dfn") {
      const anchor = document.createElement("a");
      anchor.href = href;
      if (!elem.textContent) {
        anchor.textContent = title;
        elem.append(anchor);
      } else {
        wrapInner$1(elem, anchor);
      }
      if (wrapInCiteEl) {
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
    }
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

  const findFrag = makeComponentFinder("#");
  const findPath = makeComponentFinder("/");

  /**
   * @typedef {object} CiteDetails
   * @property {string} key
   * @property {boolean} isNormative
   * @property {string} frag
   * @property {string} path
   *
   * @param {HTMLElement} elem
   * @return {CiteDetails};
   */
  function toCiteDetails(elem) {
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
        : { key: THIS_SPEC, isNormative: false };
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
  }

  async function run$u() {
    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll(
      "dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])"
    );

    await updateBiblio([...elems]);

    for (const elem of elems) {
      const originalKey = elem.dataset.cite;
      const citeDetails = toCiteDetails(elem);
      const linkProps = await getLinkProps(citeDetails);
      if (linkProps) {
        linkElem(elem, linkProps, citeDetails);
      } else {
        showInlineWarning(elem, `Couldn't find a match for "${originalKey}"`);
      }
    }

    sub("beforesave", cleanup);
  }

  /**
   * Fetch and update `biblio` with entries corresponding to given elements
   * @param {HTMLElement[]} elems
   */
  async function updateBiblio(elems) {
    const promisesForBibEntries = elems.map(toCiteDetails).map(async entry => {
      const result = await resolveRef(entry.key);
      return { entry, result };
    });
    const bibEntries = await Promise.all(promisesForBibEntries);

    const missingBibEntries = bibEntries
      .filter(({ result }) => result === null)
      .map(({ entry: { key } }) => key);

    const newEntries = await updateFromNetwork(missingBibEntries);
    if (newEntries) {
      Object.assign(biblio, newEntries);
    }
  }

  /** @param {Document} doc */
  function cleanup(doc) {
    const attrToRemove = ["data-cite", "data-cite-frag", "data-cite-path"];
    const elems = doc.querySelectorAll("a[data-cite], dfn[data-cite]");
    elems.forEach(elem =>
      attrToRemove.forEach(attr => elem.removeAttribute(attr))
    );
  }

  var dataCite = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$I,
    THIS_SPEC: THIS_SPEC,
    toCiteDetails: toCiteDetails,
    run: run$u
  });

  // @ts-check

  const name$J = "core/link-to-dfn";

  /** @type {HTMLElement[]} */
  const possibleExternalLinks = [];

  const localizationStrings$d = {
    en: {
      /**
       * @param {string} title
       */
      duplicateMsg(title) {
        return `Duplicate definition(s) of '${title}'`;
      },
      duplicateTitle: "This is defined more than once in the document.",
    },
    ja: {
      /**
       * @param {string} title
       */
      duplicateMsg(title) {
        return `'${title}' の重複定義`;
      },
      duplicateTitle: "この文書内で複数回定義されています．",
    },
    de: {
      /**
       * @param {string} title
       */
      duplicateMsg(title) {
        return `Mehrfache Definition von '${title}'`;
      },
      duplicateTitle:
        "Das Dokument enthält mehrere Definitionen dieses Eintrags.",
    },
    zh: {
      /**
       * @param {string} title
       */
      duplicateMsg(title) {
        return `'${title}' 的重复定义`;
      },
      duplicateTitle: "在文档中有重复的定义。",
    },
  };
  const l10n$f = getIntlData(localizationStrings$d);

  async function run$v(conf) {
    const titleToDfns = mapTitleToDfns();
    /** @type {HTMLAnchorElement[]} */
    const badLinks = [];

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const localAnchors = document.querySelectorAll(
      "a[data-cite=''], a:not([href]):not([data-cite]):not(.logo):not(.externalDFN)"
    );
    for (const anchor of localAnchors) {
      const dfn = findMatchingDfn(anchor, titleToDfns);
      if (dfn) {
        const foundLocalMatch = processAnchor(anchor, dfn, titleToDfns);
        if (!foundLocalMatch) {
          possibleExternalLinks.push(anchor);
        }
      } else {
        if (anchor.dataset.cite === "") {
          badLinks.push(anchor);
        } else {
          possibleExternalLinks.push(anchor);
        }
      }
    }

    showLinkingError(badLinks);

    // This needs to run before core/xref adds its data-cite and updates
    // conf.normativeReferences and conf.informativeReferences.
    updateReferences(conf);

    if (!conf.xref) {
      showLinkingError(possibleExternalLinks);
    }
  }

  function mapTitleToDfns() {
    /** @type {CaseInsensitiveMap<Map<string, Map<string, HTMLElement>>>} */
    const titleToDfns = new CaseInsensitiveMap();
    for (const key of definitionMap.keys()) {
      const { result, duplicates } = collectDfns(key);
      titleToDfns.set(key, result);
      if (duplicates.length > 0) {
        showInlineError(duplicates, l10n$f.duplicateMsg(key), l10n$f.duplicateTitle);
      }
    }
    return titleToDfns;
  }

  /**
   * @param {string} title
   */
  function collectDfns(title) {
    /** @type {Map<string, Map<string, HTMLElement>>} */
    const result = new Map();
    const duplicates = [];
    for (const dfn of definitionMap.get(title)) {
      const { dfnFor = "", dfnType = "dfn" } = dfn.dataset;
      // check for potential duplicate definition
      if (result.has(dfnFor) && result.get(dfnFor).has(dfnType)) {
        const oldDfn = result.get(dfnFor).get(dfnType);
        // We want <dfn> definitions to take precedence over
        // definitions from WebIDL. WebIDL definitions wind
        // up as <span>s instead of <dfn>.
        const oldIsDfn = oldDfn.localName === "dfn";
        const newIsDfn = dfn.localName === "dfn";
        const isSameDfnType = dfnType === (oldDfn.dataset.dfnType || "dfn");
        const isSameDfnFor = dfnFor === (oldDfn.dataset.dfnFor || "");
        if (oldIsDfn && newIsDfn && isSameDfnType && isSameDfnFor) {
          duplicates.push(dfn);
          continue;
        }
      }
      const type = "idl" in dfn.dataset || dfnType !== "dfn" ? "idl" : "dfn";
      if (!result.has(dfnFor)) {
        result.set(dfnFor, new Map());
      }
      result.get(dfnFor).set(type, dfn);
      addId(dfn, "dfn", title);
    }

    return { result, duplicates };
  }

  /**
   * Find a potentially matching <dfn> for given anchor.
   * @param {HTMLAnchorElement} anchor
   * @param {ReturnType<typeof mapTitleToDfns>} titleToDfns
   */
  function findMatchingDfn(anchor, titleToDfns) {
    const linkTargets = getLinkTargets(anchor);
    const target = linkTargets.find(
      target =>
        titleToDfns.has(target.title) &&
        titleToDfns.get(target.title).has(target.for)
    );
    if (!target) return;

    const dfnsByType = titleToDfns.get(target.title).get(target.for);
    const { linkType } = anchor.dataset;
    if (linkType) {
      const type = linkType === "dfn" ? "dfn" : "idl";
      return dfnsByType.get(type) || dfnsByType.get("dfn");
    } else {
      // Assumption: if it's for something, it's more likely IDL.
      const type = target.for ? "idl" : "dfn";
      return dfnsByType.get(type) || dfnsByType.get("idl");
    }
  }

  /**
   * @param {HTMLAnchorElement} anchor
   * @param {HTMLElement} dfn
   * @param {ReturnType<typeof mapTitleToDfns>} titleToDfns
   */
  function processAnchor(anchor, dfn, titleToDfns) {
    let noLocalMatch = false;
    const { linkFor } = anchor.dataset;
    const { dfnFor } = dfn.dataset;
    if (dfn.dataset.cite) {
      anchor.dataset.cite = dfn.dataset.cite;
    } else if (linkFor && !titleToDfns.get(linkFor) && linkFor !== dfnFor) {
      noLocalMatch = true;
    } else if (dfn.classList.contains("externalDFN")) {
      // data-lt[0] serves as unique id for the dfn which this element references
      const lt = dfn.dataset.lt ? dfn.dataset.lt.split("|") : [];
      anchor.dataset.lt = lt[0] || dfn.textContent;
      noLocalMatch = true;
    } else if (anchor.dataset.idl !== "partial") {
      anchor.href = `#${dfn.id}`;
      anchor.classList.add("internalDFN");
    } else {
      noLocalMatch = true;
    }
    if (!anchor.hasAttribute("data-link-type")) {
      anchor.dataset.linkType = "idl" in dfn.dataset ? "idl" : "dfn";
    }
    if (isCode(dfn)) {
      wrapAsCode(anchor, dfn);
    }
    return !noLocalMatch;
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
   * @param {HTMLAnchorElement} anchor a link
   * @param {HTMLElement} dfn a definition
   */
  function wrapAsCode(anchor, dfn) {
    // only add code to IDL when the definition matches
    const term = anchor.textContent.trim();
    const isIDL = dfn.dataset.hasOwnProperty("idl");
    const needsCode = shouldWrapByCode(anchor) || shouldWrapByCode(dfn, term);
    if (!isIDL || needsCode) {
      wrapInner$1(anchor, document.createElement("code"));
    }
  }

  /**
   * @param {HTMLElement} elem
   * @param {string} term
   */
  function shouldWrapByCode(elem, term = "") {
    switch (elem.localName) {
      case "a":
        if (elem.querySelector("code")) {
          return true;
        }
        break;
      default: {
        const { dataset } = elem;
        if (elem.textContent.trim() === term) {
          return true;
        } else if (dataset.title === term) {
          return true;
        } else if (dataset.lt || dataset.localLt) {
          const terms = [];
          if (dataset.lt) {
            terms.push(...dataset.lt.split("|"));
          }
          if (dataset.localLt) {
            terms.push(...dataset.localLt.split("|"));
          }
          return terms.includes(term);
        }
      }
    }
    return false;
  }

  function showLinkingError(elems) {
    elems.forEach(elem => {
      showInlineWarning(
        elem,
        `Found linkless \`a\` element with text "${elem.textContent}" but no matching \`dfn\``,
        "Linking error: not matching `dfn`"
      );
    });
  }

  /**
   * Update references due to `data-cite` attributes.
   *
   * Also, make sure self-citing doesn't cause current document getting added to
   * bibliographic references section.
   * @param {Conf} conf
   */
  function updateReferences(conf) {
    const shortName = new RegExp(
      String.raw`\b${(conf.shortName || "").toLowerCase()}([^-])\b`,
      "i"
    );

    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll(
      "dfn[data-cite]:not([data-cite='']), a[data-cite]:not([data-cite=''])"
    );
    for (const elem of elems) {
      elem.dataset.cite = elem.dataset.cite.replace(shortName, `${THIS_SPEC}$1`);
      const { key, isNormative } = toCiteDetails(elem);
      if (key === THIS_SPEC) continue;

      if (!isNormative && !conf.normativeReferences.has(key)) {
        conf.informativeReferences.add(key);
      } else {
        conf.normativeReferences.add(key);
        conf.informativeReferences.delete(key);
      }
    }
  }

  var linkToDfn = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$J,
    possibleExternalLinks: possibleExternalLinks,
    run: run$v
  });

  // @ts-check
  const name$K = "core/contrib";

  async function run$w(conf) {
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
    const apiURL = `${conf.github.apiBase}/${conf.github.fullName}/`;
    await showContributors(editors, apiURL);
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
      html$1(element)`${sortedContributors.map(
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
    name: name$K,
    run: run$w
  });

  // @ts-check

  const name$L = "core/fix-headers";

  function run$x() {
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
    name: name$L,
    run: run$x
  });

  // @ts-check

  const lowerHeaderTags = ["h2", "h3", "h4", "h5", "h6"];
  const headerTags = ["h1", ...lowerHeaderTags];

  const name$M = "core/structure";

  const localizationStrings$e = {
    en: {
      toc: "Table of Contents",
      section: "Section ",
      chapter: "Chapter ",
      appendix: "Appendix ",
    },
    zh: {
      toc: "内容大纲",
    },
    ko: {
      toc: "목차",
    },
    ja: {
      toc: "目次",
    },
    nl: {
      toc: "Inhoudsopgave",
    },
    es: {
      toc: "Tabla de Contenidos",
    },
    de: {
      toc: "Inhaltsverzeichnis",
    },
  };

  const l10n$g = getIntlData(localizationStrings$e);

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
    const ol = html$1`<ol class="toc"></ol>`;
    for (const section of sections) {
      if (section.isAppendix && !prefix && !appendixMode) {
        lastNonAppendix = index;
        appendixMode = true;
      }
      let secno = section.isIntro
        ? ""
        : appendixMode
        ? appendixNumber(index - lastNonAppendix + 1)
        : prefix + index;
      const level = secno.split(".").length;
      if (level === 1) {
        secno += ".";
        // if this is a top level item, insert
        // an OddPage comment so html2ps will correctly
        // paginate the output
        section.header.before(document.createComment("OddPage"));
      }
      const secthdr =
        level === 1
          ? appendixMode
            ? l10n$g.appendix
            : l10n$g.chapter
          : l10n$g.section;
      wrapInner(section.header, html$1`<span class="sect-title"></span>`);
      if (!section.isIntro) {
        index += 1;
        section.header.prepend(
          html$1`<span class="secthdr" hidden>${secthdr}</span>`,
          html$1`<bdi class="secno">${secno} </bdi>`
        );
      }

      if (level <= maxTocLevel) {
        const id = section.header.id || section.element.id;
        const item = createTocListItem(section.header, id);
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
   * Convert a number to spreadsheet like column name.
   * For example, 1=A, 26=Z, 27=AA, 28=AB and so on..
   * @param {number} num
   */
  function appendixNumber(num) {
    let s = "";
    while (num > 0) {
      num -= 1;
      s = String.fromCharCode(65 + (num % 26)) + s;
      num = Math.floor(num / 26);
    }
    return s;
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
    /** @type {NodeListOf<HTMLElement>} */
    const sectionElements = tocIntroductory
      ? parent.querySelectorAll(":scope > section")
      : parent.querySelectorAll(":scope > section:not(.introductory)");
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
    const anchor = html$1`<a href="${`#${id}`}" class="tocxref" />`;
    anchor.append(...header.cloneNode(true).childNodes);
    filterHeader(anchor);
    return html$1`<li class="tocline">${anchor}</li>`;
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

  function run$y(conf) {
    if ("tocIntroductory" in conf === false) {
      conf.tocIntroductory = false;
    }
    if ("maxTocLevel" in conf === false) {
      conf.maxTocLevel = Infinity;
    }

    renameSectionHeaders();

    // makeTOC
    if (!conf.noTOC) {
      skipFromToC();
      const sectionTree = getSectionTree(document.body, {
        tocIntroductory: conf.tocIntroductory,
      });
      const result = scanSections(sectionTree, conf.maxTocLevel);
      if (result) {
        createTableOfContents(result);
      }
    }

    // See core/dfn-index
    pub("toc");
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
   * Skip descendent sections from appearing in ToC using data-max-toc.
   */
  function skipFromToC() {
    /** @type {NodeListOf<HTMLElement>} */
    const sections = document.querySelectorAll("section[data-max-toc]");
    for (const section of sections) {
      const maxToc = parseInt(section.dataset.maxToc, 10);
      if (maxToc < 0 || maxToc > 6 || Number.isNaN(maxToc)) {
        const msg = "`data-max-toc` must have a value between 0-6 (inclusive).";
        showInlineError(section, msg, msg);
        continue;
      }

      // `data-max-toc=0` is equivalent to adding a ".notoc" to current section.
      if (maxToc === 0) {
        section.classList.add("notoc");
        continue;
      }

      // When `data-max-toc=2`, we skip all ":scope > section > section" from ToC
      // i.e., at §1, we will keep §1.1 but not §1.1.1
      // Similarly, `data-max-toc=1` will keep §1, but not §1.1
      const sectionToSkipFromToC = section.querySelectorAll(
        `:scope > ${Array.from({ length: maxToc }, () => "section").join(" > ")}`
      );
      for (const el of sectionToSkipFromToC) {
        el.classList.add("notoc");
      }
    }
  }

  /**
   * @param {HTMLElement} ol
   */
  function createTableOfContents(ol) {
    if (!ol) {
      return;
    }
    const nav = html$1`<nav id="toc"></nav>`;
    const h2 = html$1`<h2 class="introductory">${l10n$g.toc}</h2>`;
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

    const link = html$1`<p role="navigation" id="back-to-top">
    <a href="#title"><abbr title="Back to Top">&uarr;</abbr></a>
  </p>`;
    document.body.append(link);
  }

  var structure$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$M,
    run: run$y
  });

  // Module pcisig/fig-tbl-eqn-numbering
  // Find figure numbers and adjust them to include the chapter number.
  // Edit the Table of Figures as well.
  // This happens as a distinct pass for two reasons:
  // 1. core/figures runs before core/structure and thus doesn't know Chapter and Appendix numbers
  // 2. A second pass means that this plugin is not part of the src/core.

  const name$N = "pcisig/fig-tbl-eqn-numbering";

  function numberItems(sec, chapter, map, selector) {
    // Process Figure Captions, populating figNumMap
    let first = 0;
    sec.querySelectorAll(selector).forEach(elem => {
      const num = parseInt(elem.textContent, 10);
      if (first === 0) first = num;
      const new_num = `${chapter}-${num - first + 1}`;
      map.set(num, new_num);
    });
  }

  function renumberItems(selector, map) {
    document.querySelectorAll(selector).forEach(item => {
      const old_num = parseInt(item.textContent, 10);
      if (map.has(old_num)) {
        item.textContent = map.get(old_num);
      }
    });
  }

  function run$z(conf) {
    if (conf.numberByChapter) {
      const chapterSecnos = document.querySelectorAll(
        "body > section:not(.introductory) h2:first-child bdi.secno"
      );
      const figNumMap = new Map();
      const tblNumMap = new Map();
      const eqnNumMap = new Map();
      for (const bdi of chapterSecnos) {
        const chapter = bdi.textContent.replace(/\..*$/, "");
        const section = bdi.closest("section");
        // Process Figure Captions, populating figNumMap
        numberItems(section, chapter, figNumMap, "figcaption bdi.figno");
        // Process Table Captions, populating tblNumMap
        numberItems(section, chapter, tblNumMap, "caption bdi.tblno");
        // Process Eqnure Captions, populating eqnNumMap
        numberItems(section, chapter, eqnNumMap, "figcaption bdi.eqnno");
      }
      // Convert all Figure references using figNumMap
      renumberItems("bdi.figno", figNumMap);
      // Convert all Table references using tblNumMap
      renumberItems("bdi.tblno", tblNumMap);
      // Convert all Equation references using eqnNumMap
      renumberItems("bdi.eqnno", eqnNumMap);
    }
  }

  var figTblEqnNumbering = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$N,
    run: run$z
  });

  // @ts-check

  const name$O = "core/informative";

  const localizationStrings$f = {
    en: {
      informative: "This section is non-normative.",
    },
    nl: {
      informative: "Dit onderdeel is niet normatief.",
    },
    ko: {
      informative: "이 부분은 비규범적입니다.",
    },
    ja: {
      informative: "この節は仕様には含まれません．",
    },
    de: {
      informative: "Dieser Abschnitt ist nicht normativ.",
    },
    zh: {
      informative: "本章节不包含规范性内容。",
    },
  };

  const l10n$h = getIntlData(localizationStrings$f);

  function run$A() {
    Array.from(document.querySelectorAll("section.informative"))
      .map(informative => informative.querySelector("h2, h3, h4, h5, h6"))
      .filter(heading => heading)
      .forEach(heading => {
        heading.after(html$1`<p><em>${l10n$h.informative}</em></p>`);
      });
  }

  var informative = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$O,
    run: run$A
  });

  // @ts-check
  // Module core/id-headers
  // All headings are expected to have an ID, unless their immediate container has one.
  // This is currently in core though it comes from a W3C rule. It may move in the future.

  const name$P = "core/id-headers";

  function run$B(conf) {
    /** @type {NodeListOf<HTMLElement>} */
    const headings = document.querySelectorAll(
      `section:not(.head):not(.introductory) h2, h3, h4, h5, h6, figcaption, caption, div.impnote-title, div.note-title`
    );
    for (const h of headings) {
      // prefer for ID: heading.id > parentElement.id > newly generated heading.id
      let id = h.id;
      if (!id) {
        addId(h);
        id = h.parentElement.id || h.id;
      }
      if (!conf.addSectionLinks) continue;
      h.appendChild(html$1`
      <a href="${`#${id}`}" class="self-link" aria-label="§"></a>
    `);
    }
  }

  var idHeaders = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$P,
    run: run$B
  });

  // @ts-check

  const name$Q = "core/caniuse";

  const API_URL = "https://respec.org/caniuse/";

  const BROWSERS = new Set([
    "and_chr",
    "and_ff",
    "and_uc",
    "android",
    "bb",
    "chrome",
    "edge",
    "firefox",
    "ie",
    "ios_saf",
    "op_mini",
    "op_mob",
    "opera",
    "safari",
    "samsung",
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

  async function run$C(conf) {
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
    document.head.appendChild(html$1`<style class="removeOnSave">
    ${caniuseCss}
  </style>`);

    const headDlElem = document.querySelector(".head dl");
    const contentPromise = (async () => {
      try {
        const apiUrl = options.apiURL || API_URL;
        const stats = await fetchStats(apiUrl, options);
        return html$1`${{ html: stats }}`;
      } catch (err) {
        console.error(err);
        const msg =
          `Couldn't find feature "${options.feature}" on caniuse.com? ` +
          "Please check the feature key on [caniuse.com](https://caniuse.com)";
        pub("error", msg);
        return html$1`<a href="${featureURL}">caniuse.com</a>`;
      }
    })();
    const definitionPair = html$1`<dt class="caniuse-title">Browser support:</dt>
    <dd class="caniuse-stats">
      ${{
        any: contentPromise,
        placeholder: "Fetching data from caniuse.com...",
      }}
    </dd>`;
    headDlElem.append(...definitionPair.childNodes);
    await contentPromise;

    // remove from export
    pub("amend-user-config", { caniuse: options.feature });
    sub("beforesave", outputDoc => {
      html$1.bind(outputDoc.querySelector(".caniuse-stats"))`
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
    searchParams.set("format", "html");
    const url = `${apiURL}?${searchParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      const { status, statusText } = response;
      throw new Error(`Failed to get caniuse data: (${status}) ${statusText}`);
    }
    const stats = await response.text();
    return stats;
  }

  var caniuse = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$Q,
    run: run$C
  });

  // @ts-check

  const name$R = "core/mdn-annotation";

  const BASE_JSON_PATH = "https://w3c.github.io/mdn-spec-links/";
  const MDN_URL_BASE = "https://developer.mozilla.org/en-US/docs/Web/";
  const MDN_BROWSERS = {
    // The browser IDs here must match the ones in the imported JSON data.
    // See the list of browser IDs at:
    // https://github.com/mdn/browser-compat-data/blob/master/schemas/compat-data-schema.md#browser-identifiers.
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

  const localizationStrings$g = {
    en: {
      inAllEngines: "This feature is in all major engines.",
      inSomeEngines: "This feature has limited support.",
    },
    zh: {
      inAllEngines: "所有主要引擎均支持此特性。",
      inSomeEngines: "此功能支持有限。",
    },
  };
  const l10n$i = getIntlData(localizationStrings$g);

  async function loadStyle$6() {
    try {
      return (await Promise.resolve().then(function () { return mdnAnnotation$2; })).default;
    } catch {
      return fetchAsset("mdn-annotation.css");
    }
  }

  /**
   * @param {HTMLElement} node
   */
  function insertMDNBox(node) {
    const targetAncestor = node.closest("section");
    if (!targetAncestor) return;
    const { previousElementSibling: targetSibling } = targetAncestor;
    if (targetSibling && targetSibling.classList.contains("mdn")) {
      // If the target ancestor already has a mdnBox inserted, we just use it
      return targetSibling;
    }
    const mdnBox = html$1`<aside class="mdn"></aside>`;
    targetAncestor.before(mdnBox);
    return mdnBox;
  }

  /**
   * @param {MdnEntry} mdnSpec
   * @returns {HTMLDetailsElement}
   */
  function attachMDNDetail(mdnSpec) {
    const { name, slug, summary, support, engines } = mdnSpec;
    const mdnSubPath = slug.slice(slug.indexOf("/") + 1);
    const href = `${MDN_URL_BASE}${slug}`;
    const label = `Expand MDN details for ${name}`;
    const engineSupport = getEngineSupportIcons(engines);
    return html$1`<details>
    <summary aria-label="${label}"><span>MDN</span>${engineSupport}</summary>
    <a title="${summary}" href="${href}">${mdnSubPath}</a>
    ${getEngineSupport(engines)}
    ${support
      ? buildBrowserSupportTable(support)
      : html$1`<p class="nosupportdata">No support data.</p>`}
  </details>`;
  }

  /**
   * @param {MdnEntry['support']} support
   * @returns {HTMLTableElement}
   */
  function buildBrowserSupportTable(support) {
    /**
     * @param {string | keyof MDN_BROWSERS} browserId
     * @param {"Yes" | "No" | "Unknown"} yesNoUnknown
     * @param {string} version
     * @returns {HTMLTableRowElement}
     */
    function createRow(browserId, yesNoUnknown, version) {
      const displayStatus = yesNoUnknown === "Unknown" ? "?" : yesNoUnknown;
      const classList = `${browserId} ${yesNoUnknown.toLowerCase()}`;
      return html$1`<tr class="${classList}">
      <td>${MDN_BROWSERS[browserId]}</td>
      <td>${version ? version : displayStatus}</td>
    </tr>`;
    }

    /**
     * @param {string | keyof MDN_BROWSERS} browserId
     * @param {VersionDetails} versionData
     */
    function createRowFromBrowserData(browserId, versionData) {
      if (versionData.version_removed) {
        return createRow(browserId, "No", "");
      }
      const versionAdded = versionData.version_added;
      if (typeof versionAdded === "boolean") {
        return createRow(browserId, versionAdded ? "Yes" : "No", "");
      } else if (!versionAdded) {
        return createRow(browserId, "Unknown", "");
      } else {
        return createRow(browserId, "Yes", `${versionAdded}+`);
      }
    }

    return html$1`<table>
    ${Object.keys(MDN_BROWSERS).map(browserId => {
      return support[browserId]
        ? createRowFromBrowserData(browserId, support[browserId])
        : createRow(browserId, "Unknown", "");
    })}
  </table>`;
  }

  async function run$D(conf) {
    const mdnKey = getMdnKey(conf);
    if (!mdnKey) return;

    const mdnSpecJson = await getMdnData(mdnKey, conf.mdn);
    if (!mdnSpecJson) return;

    const style = document.createElement("style");
    style.textContent = await loadStyle$6();
    document.head.append(style);

    for (const elem of findElements(mdnSpecJson)) {
      const mdnSpecArray = mdnSpecJson[elem.id];
      const mdnBox = insertMDNBox(elem);
      if (!mdnBox) continue;
      for (const spec of mdnSpecArray) {
        mdnBox.append(attachMDNDetail(spec));
      }
    }
  }

  /** @returns {string} */
  function getMdnKey(conf) {
    const { shortName, mdn } = conf;
    if (!mdn) return;
    if (typeof mdn === "string") return mdn;
    return mdn.key || shortName;
  }

  /**
   * @param {string} key MDN key
   * @param {object} mdnConf
   * @param {string} [mdnConf.specMapUrl]
   * @param {string} [mdnConf.baseJsonPath]
   * @param {number} [mdnConf.maxAge]
   *
   * @typedef {{ version_added: string|boolean|null, version_removed?: string }} VersionDetails
   * @typedef {Record<string | keyof MDN_BROWSERS, VersionDetails>} MdnSupportEntry
   * @typedef {{ name: string, title: string, slug: string, summary: string, support: MdnSupportEntry, engines: string[] }} MdnEntry
   * @typedef {Record<string, MdnEntry[]>} MdnData
   * @returns {Promise<MdnData|undefined>}
   */
  async function getMdnData(key, mdnConf) {
    const {
      baseJsonPath = BASE_JSON_PATH,
      maxAge = 60 * 60 * 24 * 1000,
    } = mdnConf;
    const url = new URL(`${key}.json`, baseJsonPath).href;
    const res = await fetchAndCache(url, maxAge);
    if (res.status === 404) {
      const msg = `Could not find MDN data associated with key "${key}".`;
      const hint = "Please add a valid key to `respecConfig.mdn`";
      pub("error", `${msg} ${hint}`);
      return;
    }
    return await res.json();
  }

  /**
   * Find elements that can have an annotation box attached.
   * @param {MdnData} data
   */
  function findElements(data) {
    /** @type {NodeListOf<HTMLElement>} */
    const elemsWithId = document.body.querySelectorAll("[id]:not(script)");
    return [...elemsWithId].filter(({ id }) => Array.isArray(data[id]));
  }

  /**
   * @param {MdnEntry['engines']} engines
   * @returns {HTMLSpanElement}
   */
  function getEngineSupportIcons(engines) {
    if (engines.length === 3) {
      return html$1`<span title="${l10n$i.inAllEngines}">✅</span>`;
    }
    if (engines.length < 2) {
      return html$1`<span title="${l10n$i.inSomeEngines}">🚫</span>`;
    }
    return html$1`<span>&emsp;</span>`;
  }

  /**
   * @param {MdnEntry['engines']} engines
   * @returns {HTMLParagraphElement|undefined}
   */
  function getEngineSupport(engines) {
    if (engines.length === 3) {
      return html$1`<p class="engines-all">${l10n$i.inAllEngines}</p>`;
    }
    if (engines.length < 2) {
      return html$1`<p class="engines-some">${l10n$i.inSomeEngines}</p>`;
    }
  }

  var mdnAnnotation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$R,
    run: run$D
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
    cleanup$1(cloneDoc);
    let result = "";
    switch (format) {
      case "xml":
        result = new XMLSerializer().serializeToString(cloneDoc);
        break;
      default: {
        prettify(cloneDoc);
        if (cloneDoc.doctype) {
          result += new XMLSerializer().serializeToString(cloneDoc.doctype);
        }
        result += cloneDoc.documentElement.outerHTML;
      }
    }
    return result;
  }

  function cleanup$1(cloneDoc) {
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
      metaCharset = html$1`<meta charset="utf-8" />`;
    }
    insertions.appendChild(metaCharset);

    // Add meta generator
    const respecVersion = `ReSpec ${window.respecVersion || "Developer Channel"}`;
    const metaGenerator = html$1`
    <meta name="generator" content="${respecVersion}" />
  `;

    insertions.appendChild(metaGenerator);
    head.prepend(insertions);
    pub("beforesave", documentElement);
  }

  /** @param {Document} cloneDoc */
  function prettify(cloneDoc) {
    cloneDoc.querySelectorAll("style").forEach(el => {
      el.innerHTML = `\n${el.innerHTML}\n`;
    });
    cloneDoc.querySelectorAll("head > *").forEach(el => {
      el.outerHTML = `\n${el.outerHTML}`;
    });
  }

  expose("core/exporter", { rsDocToDataURL });

  // @ts-check

  const name$S = "ui/save-html";

  const localizationStrings$h = {
    en: {
      save_snapshot: "Export",
    },
    nl: {
      save_snapshot: "Bewaar Snapshot",
    },
    ja: {
      save_snapshot: "保存する",
    },
    de: {
      save_snapshot: "Exportieren",
    },
    zh: {
      save_snapshot: "导出",
    },
  };
  const l10n$j = getIntlData(localizationStrings$h);

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
      get href() {
        // Create and download an EPUB 3.2 version of the content
        // Using the EPUB 3.2 conversion service set up at labs.w3.org/r2epub
        // For more details on that service, see https://github.com/iherman/respec2epub
        const epubURL = new URL("https://labs.w3.org/r2epub/");
        epubURL.searchParams.append("respec", "true");
        epubURL.searchParams.append("url", document.location.href);
        return epubURL.href;
      },
    },
  ];

  function toDownloadLink(details) {
    const { id, href, fileName, title, type } = details;
    return html$1`<a
    href="${href}"
    id="${id}"
    download="${fileName}"
    type="${type}"
    class="respec-save-button"
    onclick=${() => ui.closeModal()}
    >${title}</a
  >`;
  }

  const saveDialog = {
    async show(button) {
      await document.respecIsReady;
      const div = html$1`<div class="respec-save-buttons">
      ${downloadLinks.map(toDownloadLink)}
    </div>`;
      ui.freshModal(l10n$j.save_snapshot, div, button);
    },
  };

  const supportsDownload = "download" in HTMLAnchorElement.prototype;
  let button;
  if (supportsDownload) {
    button = ui.addCommand(l10n$j.save_snapshot, show$1, "Ctrl+Shift+Alt+S", "💾");
  }

  function show$1() {
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
    name: name$S,
    exportDocument: exportDocument
  });

  // @ts-check

  const localizationStrings$i = {
    en: {
      about_respec: "About",
    },
    zh: {
      about_respec: "关于",
    },
    nl: {
      about_respec: "Over",
    },
    ja: {
      about_respec: "これについて",
    },
    de: {
      about_respec: "Über",
    },
  };
  const l10n$k = getIntlData(localizationStrings$i);

  // window.respecVersion is added at build time (see tools/builder.js)
  window.respecVersion = window.respecVersion || "Developer Edition";
  const div = document.createElement("div");
  const render = html$1.bind(div);
  const button$1 = ui.addCommand(
    `${l10n$k.about_respec} ${window.respecVersion}`,
    show$2,
    "Ctrl+Shift+Alt+A",
    "ℹ️"
  );

  function show$2() {
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
    render`
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
`;
    ui.freshModal(`${l10n$k.about_respec} - ${window.respecVersion}`, div, button$1);
  }

  function perfEntryToTR({ name, duration }) {
    const moduleURL = `https://github.com/w3c/respec/blob/develop/src/${name}.js`;
    return html$1`
    <tr>
      <td><a href="${moduleURL}">${name}</a></td>
      <td>${duration}</td>
    </tr>
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

  const name$T = "core/seo";

  function run$E() {
    const firstParagraph = document.querySelector("#abstract p:first-of-type");
    if (!firstParagraph) {
      return; // no abstract, so nothing to do
    }
    // Normalize whitespace: trim, remove new lines, tabs, etc.
    const content = firstParagraph.textContent.replace(/\s+/, " ").trim();
    const metaElem = document.createElement("meta");
    metaElem.name = "description";
    metaElem.content = content;
    document.head.appendChild(metaElem);
  }

  var seo = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$T,
    run: run$E
  });

  // @ts-check
  const localizationStrings$j = {
    en: {
      missing_test_suite_uri:
        "Found tests in your spec, but missing '" +
        "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' in your ReSpec config.",
      tests: "tests",
      test: "test",
    },
    ja: {
      missing_test_suite_uri:
        "この仕様内にテストの項目を検出しましたが，ReSpec の設定に '" +
        "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' が見つかりません．",
      tests: "テスト",
      test: "テスト",
    },
    de: {
      missing_test_suite_uri:
        "Die Spezifikation enthält Tests, aber in der ReSpec-Konfiguration ist keine '" +
        "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)' angegeben.",
      tests: "Tests",
      test: "Test",
    },
    zh: {
      missing_test_suite_uri:
        "本规范中包含测试，但在 ReSpec 配置中缺少 '" +
        "[`testSuiteURI`](https://github.com/w3c/respec/wiki/testSuiteURI)'。",
      tests: "测试",
      test: "测试",
    },
  };

  const l10n$l = getIntlData(localizationStrings$j);

  const name$U = "core/data-tests";

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

    const testList = html$1`
    <li>
      <a href="${href}">${testFileName}</a>
      ${emojiList}
    </li>
  `;
    return testList;
  }

  function run$F(conf) {
    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll("[data-tests]");
    const testables = [...elems].filter(elem => elem.dataset.tests);

    if (!testables.length) {
      return;
    }
    if (!conf.testSuiteURI) {
      pub("error", l10n$l.missing_test_suite_uri);
      return;
    }

    for (const elem of testables) {
      const tests = elem.dataset.tests.split(/,/gm).map(url => url.trim());
      const testURLs = toTestURLs(tests, conf.testSuiteURI);
      handleDuplicates(testURLs, elem);
      const details = toHTML$1(testURLs);
      elem.append(details);
    }
  }

  /**
   * @param {string[]} tests
   * @param {string} testSuiteURI
   */
  function toTestURLs(tests, testSuiteURI) {
    return tests
      .map(test => {
        try {
          return new URL(test, testSuiteURI).href;
        } catch {
          pub("warn", `Bad URI: ${test}`);
        }
      })
      .filter(href => href);
  }

  /**
   * @param {string[]} testURLs
   * @param {HTMLElement} elem
   */
  function handleDuplicates(testURLs, elem) {
    const duplicates = testURLs.filter(
      (link, i, self) => self.indexOf(link) !== i
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
  }

  /**
   * @param {string[]} testURLs
   */
  function toHTML$1(testURLs) {
    const uniqueList = [...new Set(testURLs)];
    const details = html$1`
    <details class="respec-tests-details removeOnSave">
      <summary>tests: ${uniqueList.length}</summary>
      <ul>
        ${uniqueList.map(toListItem)}
      </ul>
    </details>
  `;
    return details;
  }

  var dataTests = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$U,
    run: run$F
  });

  // @ts-check
  const name$V = "core/list-sorter";

  function makeSorter(direction) {
    const order = direction === "ascending" ? 1 : -1;
    return ({ textContent: a }, { textContent: b }) => {
      return order * a.trim().localeCompare(b.trim());
    };
  }
  /**
   * Shallow sort list items in OL, and UL elements.
   *
   * @param {HTMLUListElement} elem
   * @returns {DocumentFragment}
   */
  function sortListItems(elem, dir) {
    const elements = [...elem.querySelectorAll(":scope > li")];
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
    const elements = [...dl.querySelectorAll(":scope > dt")];
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
    name: name$V,
    sortListItems: sortListItems,
    sortDefinitionTerms: sortDefinitionTerms,
    run: run$G
  });

  // @ts-check

  const name$W = "core/dfn-panel";

  async function run$H() {
    const css = await loadStyle$7();
    document.head.insertBefore(
      html$1`<style>
      ${css}
    </style>`,
      document.querySelector("link")
    );

    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll(
      "dfn[id], #index-defined-elsewhere .index-term"
    );
    const panels = document.createDocumentFragment();
    for (const el of elems) {
      panels.append(createPanel(el));
    }
    document.body.append(panels);

    const script = document.createElement("script");
    script.id = "respec-dfn-panel";
    script.textContent = await loadScript();
    document.body.append(script);
  }

  /** @param {HTMLElement} dfn */
  function createPanel(dfn) {
    const { id } = dfn;
    const href = dfn.dataset.href || `#${id}`;
    /** @type {NodeListOf<HTMLAnchorElement>} */
    const links = document.querySelectorAll(`a[href="${href}"]:not(.index-term)`);

    const panelId = `dfn-panel-for-${dfn.id}`;
    /** @type {HTMLElement} */
    const panel = html$1`
    <aside class="dfn-panel" id="${panelId}" hidden>
      <span class="caret"></span>
      <div>
        <a class="self-link" href="${href}">Permalink</a>
        ${dfnExportedMarker(dfn)}
      </div>
      <b>Referenced in:</b>
      ${referencesToHTML(id, links)}
    </aside>
  `;
    return panel;
  }

  /** @param {HTMLElement} dfn */
  function dfnExportedMarker(dfn) {
    if (!dfn.matches("dfn[data-export]")) return null;
    return html$1`<span
    class="dfn-exported"
    title="Definition can be referenced by other specifications"
    >exported</span
  >`;
  }

  /**
   * @param {string} id dfn id
   * @param {NodeListOf<HTMLAnchorElement>} links
   * @returns {HTMLUListElement}
   */
  function referencesToHTML(id, links) {
    if (!links.length) {
      return html$1`<ul>
      <li>Not referenced in this document.</li>
    </ul>`;
    }

    /** @type {Map<string, string[]>} */
    const titleToIDs = new Map();
    links.forEach((link, i) => {
      const linkID = link.id || `ref-for-${id}-${i + 1}`;
      if (!link.id) link.id = linkID;
      const title = getReferenceTitle(link);
      const ids = titleToIDs.get(title) || titleToIDs.set(title, []).get(title);
      ids.push(linkID);
    });

    /**
     * Returns a list that is easier to render in `listItemToHTML`.
     * @param {[string, string[]]} entry an entry from `titleToIDs`
     * @returns {{ title: string, id: string }[]} The first list item contains
     * title from `getReferenceTitle`, rest of items contain strings like `(2)`,
     * `(3)` as title.
     */
    const toLinkProps = ([title, ids]) => {
      return [{ title, id: ids[0] }].concat(
        ids.slice(1).map((id, i) => ({ title: `(${i + 2})`, id }))
      );
    };

    /**
     * @param {[string, string[]]} entry
     * @returns {HTMLLIElement}
     */
    const listItemToHTML = entry => html$1`<li>
    ${toLinkProps(entry).map(
      link => html$1`<a href="#${link.id}">${link.title}</a>${" "}`
    )}
  </li>`;

    return html$1`<ul>
    ${[...titleToIDs].map(listItemToHTML)}
  </ul>`;
  }

  /** @param {HTMLAnchorElement} link */
  function getReferenceTitle(link) {
    const section = link.closest("section");
    if (!section) return null;
    const heading = section.querySelector("h1, h2, h3, h4, h5, h6");
    if (!heading) return null;
    return norm(heading.textContent);
  }

  async function loadStyle$7() {
    try {
      return (await Promise.resolve().then(function () { return dfnPanel$2; })).default;
    } catch {
      return fetchAsset("dfn-panel.css");
    }
  }

  async function loadScript() {
    try {
      return (await Promise.resolve().then(function () { return dfnPanel_runtime$1; })).default;
    } catch {
      return fetchBase("./src/core/dfn-panel.runtime.js");
    }
  }

  var dfnPanel = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$W,
    run: run$H
  });

  // @ts-check

  const name$X = "core/data-type";

  const tooltipStylePromise = loadStyle$8();

  async function loadStyle$8() {
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
    name: name$X,
    run: run$I
  });

  // @ts-check

  const name$Y = "core/algorithms";

  const cssPromise$3 = loadStyle$9();

  async function loadStyle$9() {
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
    name: name$Y,
    run: run$J
  });

  // @ts-check

  const name$Z = "core/anchor-expander";

  let sectionRefsByNumber = false;

  function run$K(conf) {
    if (conf.hasOwnProperty("sectionRefsByNumber")) {
      sectionRefsByNumber = conf.sectionRefsByNumber;
    }
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
        case "section":
        case "nav": {
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
        case "p":
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
    if (
      matchingElement.classList.contains("impnote") ||
      matchingElement.classList.contains("note")
    ) {
      const marker = matchingElement.querySelector(".marker");
      if (marker) {
        const children = [...makeSafeCopy(marker).childNodes].filter(
          node => !node.classList || !node.classList.contains("self-link")
        );
        a.append(...children);
        if (selfLink) a.prepend("§\u00A0");
        a.classList.add("note-ref");
      }
    } else {
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
  }

  function processFigure(matchingElement, id, a) {
    const figcaption = matchingElement.querySelector("figcaption");
    const figEqn =
      matchingElement.classList && matchingElement.classList.contains("equation")
        ? "eqn"
        : "fig";
    if (!figcaption) {
      a.textContent = a.getAttribute("href");
      const msg = `Found matching figure "${id}", but figure is lacking a \`<figcaption>\`.`;
      showInlineError(a, msg, "Missing figcaption in referenced figure.");
      return;
    }
    const hadSelfLink = figcaption.querySelector(".self-link");
    // remove the figure's title
    const children = [...makeSafeCopy(figcaption).childNodes].filter(
      node =>
        !node.classList ||
        !(
          node.classList.contains(`${figEqn}-title`) ||
          node.classList.contains("self-link")
        )
    );
    // drop an empty space at the end.
    children.pop();
    a.append(...children);
    if (hadSelfLink) a.prepend("§\u00A0");
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
    const hadSelfLink = caption.querySelector(".self-link");
    // remove the table's title
    const children = [...makeSafeCopy(caption).childNodes].filter(
      node =>
        !node.classList ||
        !(
          node.classList.contains("tbl-title") ||
          node.classList.contains("self-link")
        )
    );
    // drop an empty space at the end.
    children.pop();
    a.append(...children);
    if (hadSelfLink) a.prepend("§\u00A0");
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
    let children = [...makeSafeCopy(heading).childNodes].filter(
      node => !node.classList || !node.classList.contains("self-link")
    );
    if (sectionRefsByNumber) {
      children = children.filter(
        node => !node.classList || !node.classList.contains("sect-title")
      );
      children.forEach(
        node => node instanceof HTMLElement && node.removeAttribute("hidden")
      );
    }
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
    name: name$Z,
    run: run$K
  });

  // @ts-check

  const name$_ = "pcisig/include-final-config";

  function run$L(conf) {
    const script = document.createElement("script");
    script.id = "finalUserConfig";
    script.type = "application/json";
    script.innerHTML = JSON.stringify(conf, null, 2);
    document.head.appendChild(script);
  }

  var includeFinalConfig = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$_,
    run: run$L
  });

  // @ts-check

  const name$$ = "rs-changelog";

  const element = class ChangelogElement extends HTMLElement {
    constructor() {
      super();
      this.props = {
        from: this.getAttribute("from"),
        to: this.getAttribute("to") || "HEAD",
        /** @type {(commit: Commit) => boolean} */
        filter:
          typeof window[this.getAttribute("filter")] === "function"
            ? window[this.getAttribute("filter")]
            : () => true,
      };
    }

    connectedCallback() {
      const { from, to, filter } = this.props;
      html$1.bind(this)`
      <ul>
      ${{
        any: fetchCommits(from, to, filter)
          .then(commits => toHTML$2(commits))
          .catch(error => showInlineError(this, error.message, error.message))
          .finally(() => {
            this.dispatchEvent(new CustomEvent("done"));
          }),
        placeholder: "Loading list of commits...",
      }}
      </ul>
    `;
    }
  };

  async function fetchCommits(from, to, filter) {
    /** @type {Commit[]} */
    let commits;
    try {
      const gh = await github;
      if (!gh) {
        throw new Error("`respecConfig.github` is not set");
      }
      const url = new URL("commits", `${gh.apiBase}/${gh.fullName}/`);
      url.searchParams.set("from", from);
      url.searchParams.set("to", to);

      const res = await fetch(url.href);
      if (!res.ok) {
        throw new Error(
          `Request to ${url} failed with status code ${res.status}`
        );
      }
      commits = await res.json();
      if (!commits.length) {
        throw new Error(`No commits between ${from}..${to}.`);
      }
      commits = commits.filter(filter);
    } catch (error) {
      const msg = `Error loading commits from GitHub. ${error.message}`;
      console.error(error);
      throw new Error(msg);
    }
    return commits;
  }

  async function toHTML$2(commits) {
    const { repoURL } = await github;
    return commits.map(commit => {
      const [message, prNumber = null] = commit.message.split(/\(#(\d+)\)/, 2);
      const commitURL = `${repoURL}commit/${commit.hash}`;
      const prURL = prNumber ? `${repoURL}pull/${prNumber}` : null;
      const pr = prNumber && html$1` (<a href="${prURL}">#${prNumber}</a>)`;
      return html$1`<li><a href="${commitURL}">${message.trim()}</a>${pr}</li>`;
    });
  }

  var changelog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$$,
    element: element
  });

  // @ts-check
  /** @type {CustomElementDfn[]} */
  const CUSTOM_ELEMENTS = [changelog];

  const name$10 = "core/custom-elements/index";

  async function run$M() {
    // prepare and register elements
    CUSTOM_ELEMENTS.forEach(el => {
      customElements.define(el.name, el.element);
    });

    // wait for each element to be ready
    const selectors = CUSTOM_ELEMENTS.map(el => el.name).join(", ");
    const elems = document.querySelectorAll(selectors);
    const readyPromises = [...elems].map(
      el => new Promise(res => el.addEventListener("done", res, { once: true }))
    );
    await Promise.all(readyPromises);
  }

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$10,
    run: run$M
  });

  // import { html } from "../core/import-maps.js";

  const name$11 = "pcisig/railroad";
  // const funcs = {};
  // export default funcs;

  const cssPromise$4 = loadStyle$a();

  async function loadStyle$a() {
    try {
      return (await Promise.resolve().then(function () { return railroad$2; })).default;
    } catch {
      return fetchAsset("railroad.css");
    }
  }

  /* export */
  const Options = {
    DEBUG: true, // if true, writes some debug information into attributes
    VS: 8, // minimum vertical separation between things. For a 3px stroke, must be at least 4
    AR: 10, // radius of arcs
    DIAGRAM_CLASS: "railroad-diagram", // class to put on the root <svg>
    STROKE_ODD_PIXEL_LENGTH: true, // is the stroke width an odd (1px, 3px, etc) pixel length?
    INTERNAL_ALIGNMENT: "center", // how to align items when they have extra space. left/right/center
    CHAR_WIDTH: 8.5, // width of each monospace character. play until you find the right value for your font
    COMMENT_CHAR_WIDTH: 7, // comments are in smaller text by default
  };

  /* export */ class FakeSVG {
    constructor(tagName, attrs, text) {
      if (text) this.children = text;
      else this.children = [];
      this.tagName = tagName;
      this.attrs = unnull(attrs, {});
    }
    format(_x, _y, _width) {
      // Virtual
    }
    addTo(parent) {
      if (parent instanceof FakeSVG) {
        parent.children.push(this);
        return this;
      } else {
        const svg = this.toSVG();
        parent.appendChild(svg);
        return svg;
      }
    }
    toSVG() {
      const el = SVG$1(this.tagName, this.attrs);
      if (typeof this.children == "string") {
        el.textContent = this.children;
      } else {
        this.children.forEach(e => {
          el.appendChild(e.toSVG());
        });
      }
      return el;
    }
    toString() {
      let str = `<${this.tagName}`;
      const group = this.tagName === "g" || this.tagName === "svg";
      for (const attr in this.attrs) {
        if (this.attrs.hasOwnProperty(attr))
          str += ` ${attr}="${`${this.attrs[attr]}`
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")}"`;
      }
      str += ">";
      if (group) str += "\n";
      if (typeof this.children == "string") {
        str += escapeString(this.children);
      } else {
        this.children.forEach(e => {
          str += e;
        });
      }
      str += `</${this.tagName}>\n`;
      return str;
    }
    walk(cb) {
      cb(this);
    }
  }

  /* export */ class Path$2 extends FakeSVG {
    constructor(x, y) {
      super("path");
      this.attrs.d = `M${x} ${y}`;
    }
    m(x, y) {
      this.attrs.d += `m${x} ${y}`;
      return this;
    }
    h(val) {
      this.attrs.d += `h${val}`;
      return this;
    }
    right(val) {
      return this.h(Math.max(0, val));
    }
    left(val) {
      return this.h(-Math.max(0, val));
    }
    v(val) {
      this.attrs.d += `v${val}`;
      return this;
    }
    down(val) {
      return this.v(Math.max(0, val));
    }
    up(val) {
      return this.v(-Math.max(0, val));
    }
    arc(sweep) {
      // 1/4 of a circle
      let x = Options.AR;
      let y = Options.AR;
      if (sweep[0] === "e" || sweep[1] === "w") {
        x *= -1;
      }
      if (sweep[0] === "s" || sweep[1] === "n") {
        y *= -1;
      }
      let cw;
      if (sweep === "ne" || sweep === "es" || sweep === "sw" || sweep === "wn") {
        cw = 1;
      } else {
        cw = 0;
      }
      this.attrs.d += `a${Options.AR} ${Options.AR} 0 0 ${cw} ${x} ${y}`;
      return this;
    }
    arc_8(start, dir) {
      // 1/8 of a circle
      const arc = Options.AR;
      const s2 = (1 / Math.sqrt(2)) * arc;
      const s2inv = arc - s2;
      let path = `a ${arc} ${arc} 0 0 ${dir === "cw" ? "1" : "0"} `;
      const sd = start + dir;
      const offset =
        sd === "ncw"
          ? [s2, s2inv]
          : sd === "necw"
          ? [s2inv, s2]
          : sd === "ecw"
          ? [-s2inv, s2]
          : sd === "secw"
          ? [-s2, s2inv]
          : sd === "scw"
          ? [-s2, -s2inv]
          : sd === "swcw"
          ? [-s2inv, -s2]
          : sd === "wcw"
          ? [s2inv, -s2]
          : sd === "nwcw"
          ? [s2, -s2inv]
          : sd === "nccw"
          ? [-s2, s2inv]
          : sd === "nwccw"
          ? [-s2inv, s2]
          : sd === "wccw"
          ? [s2inv, s2]
          : sd === "swccw"
          ? [s2, s2inv]
          : sd === "sccw"
          ? [s2, -s2inv]
          : sd === "seccw"
          ? [s2inv, -s2]
          : sd === "eccw"
          ? [-s2inv, -s2]
          : sd === "neccw"
          ? [-s2, -s2inv]
          : null;
      path += offset.join(" ");
      this.attrs.d += path;
      return this;
    }
    l(x, y) {
      this.attrs.d += `l${x} ${y}`;
      return this;
    }
    format() {
      // All paths in this library start/end horizontally.
      // The extra .5 ensures a minor overlap, so there's no seams in bad rasterizers.
      this.attrs.d += "h.5";
      return this;
    }
  }

  /* export */ class DiagramMultiContainer extends FakeSVG {
    constructor(tagName, items, attrs, text) {
      super(tagName, attrs, text);
      this.items = items.map(wrapString);
    }
    walk(cb) {
      cb(this);
      this.items.forEach(x => x.walk(cb));
    }
  }

  /* export */ class Diagram extends DiagramMultiContainer {
    constructor(...items) {
      super("svg", items, { class: Options.DIAGRAM_CLASS });
      if (!(this.items[0] instanceof Start)) {
        this.items.unshift(new Start());
      }
      if (!(this.items[this.items.length - 1] instanceof End)) {
        this.items.push(new End());
      }
      this.up = this.down = this.height = this.width = 0;
      for (const item of this.items) {
        this.width += item.width + (item.needsSpace ? 20 : 0);
        this.up = Math.max(this.up, item.up - this.height);
        this.height += item.height;
        this.down = Math.max(this.down - item.height, item.down);
      }
      this.formatted = false;
    }
    format(paddingt, paddingr, paddingb, paddingl) {
      paddingt = unnull(paddingt, 20);
      paddingr = unnull(paddingr, paddingt, 20);
      paddingb = unnull(paddingb, paddingt, 20);
      paddingl = unnull(paddingl, paddingr, 20);
      let x = paddingl;
      let y = paddingt;
      y += this.up;
      const g = new FakeSVG(
        "g",
        Options.STROKE_ODD_PIXEL_LENGTH ? { transform: "translate(.5 .5)" } : {}
      );
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.needsSpace) {
          new Path$2(x, y).h(10).addTo(g);
          x += 10;
        }
        item.format(x, y, item.width).addTo(g);
        x += item.width;
        y += item.height;
        if (item.needsSpace) {
          new Path$2(x, y).h(10).addTo(g);
          x += 10;
        }
      }
      this.attrs.width = this.width + paddingl + paddingr;
      this.attrs.height = this.up + this.height + this.down + paddingt + paddingb;
      this.attrs.viewBox = `0 0 ${this.attrs.width} ${this.attrs.height}`;
      g.addTo(this);
      this.formatted = true;
      return this;
    }
    addTo(parent) {
      if (!parent) {
        let scriptTag = document.getElementsByTagName("script");
        scriptTag = scriptTag[scriptTag.length - 1];
        parent = scriptTag.parentNode;
      }
      return super.addTo.call(this, parent);
    }
    toSVG() {
      if (!this.formatted) {
        this.format();
      }
      return super.toSVG.call(this);
    }
    toString() {
      if (!this.formatted) {
        this.format();
      }
      return super.toString.call(this);
    }
    // toStandalone(style) {
    //   if (!this.formatted) {
    //     this.format();
    //   }
    //   const s = new FakeSVG("style", {}, style || defaultCSS);
    //   this.children.push(s);
    //   this.attrs.xmlns = "http://www.w3.org/2000/svg";
    //   this.attrs["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
    //   const result = super.toString.call(this);
    //   this.children.pop();
    //   delete this.attrs.xmlns;
    //   return result;
    // }
  }
  // funcs.Diagram = (...args) => new Diagram(...args);

  /* export */ class ComplexDiagram extends Diagram {
    constructor(...items) {
      super(...items);
      this.items[0] = new Start({ type: "complex" });
      this.items[this.items.length - 1] = new End({ type: "complex" });
    }
  }
  // funcs.ComplexDiagram = (...args) => new ComplexDiagram(...args);

  /* export */ class Sequence extends DiagramMultiContainer {
    constructor(...items) {
      super("g", items);
      // const numberOfItems = this.items.length;
      this.needsSpace = true;
      this.up = this.down = this.height = this.width = 0;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.width += item.width + (item.needsSpace ? 20 : 0);
        this.up = Math.max(this.up, item.up - this.height);
        this.height += item.height;
        this.down = Math.max(this.down - item.height, item.down);
      }
      if (this.items[0].needsSpace) this.width -= 10;
      if (this.items[this.items.length - 1].needsSpace) this.width -= 10;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "sequence";
      }
    }
    format(x, y, width) {
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.needsSpace && i > 0) {
          new Path$2(x, y).h(10).addTo(this);
          x += 10;
        }
        item.format(x, y, item.width).addTo(this);
        x += item.width;
        y += item.height;
        if (item.needsSpace && i < this.items.length - 1) {
          new Path$2(x, y).h(10).addTo(this);
          x += 10;
        }
      }
      return this;
    }
  }
  // funcs.Sequence = (...args) => new Sequence(...args);

  /* export */ class Element$1 extends Sequence {
    constructor(tag, ...items) {
      super(`<${tag}>`, ...items, `</${tag.split(" ")[0]}>`);
    }
  }

  /* export */ class Stack extends DiagramMultiContainer {
    constructor(...items) {
      super("g", items);
      if (items.length === 0) {
        throw new RangeError("Stack() must have at least one child.");
      }
      this.width = Math.max.apply(
        null,
        this.items.map(e => {
          return e.width + (e.needsSpace ? 20 : 0);
        })
      );
      // if (this.items[0].needsSpace) this.width -= 10;
      // if (this.items[this.items.length-1].needsSpace) this.width -= 10;
      if (this.items.length > 1) {
        this.width += Options.AR * 2;
      }
      this.needsSpace = true;
      this.up = this.items[0].up;
      this.down = this.items[this.items.length - 1].down;

      this.height = 0;
      const last = this.items.length - 1;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.height += item.height;
        if (i > 0) {
          this.height += Math.max(Options.AR * 2, item.up + Options.VS);
        }
        if (i < last) {
          this.height += Math.max(Options.AR * 2, item.down + Options.VS);
        }
      }
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "stack";
      }
    }
    format(x, y, width) {
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      x += gaps[0];
      const xInitial = x;
      if (this.items.length > 1) {
        new Path$2(x, y).h(Options.AR).addTo(this);
        x += Options.AR;
      }

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        const innerWidth =
          this.width - (this.items.length > 1 ? Options.AR * 2 : 0);
        item.format(x, y, innerWidth).addTo(this);
        x += innerWidth;
        y += item.height;

        if (i !== this.items.length - 1) {
          new Path$2(x, y)
            .arc("ne")
            .down(Math.max(0, item.down + Options.VS - Options.AR * 2))
            .arc("es")
            .left(innerWidth)
            .arc("nw")
            .down(Math.max(0, this.items[i + 1].up + Options.VS - Options.AR * 2))
            .arc("ws")
            .addTo(this);
          y +=
            Math.max(item.down + Options.VS, Options.AR * 2) +
            Math.max(this.items[i + 1].up + Options.VS, Options.AR * 2);
          // y += Math.max(Options.AR*4, item.down + Options.VS*2 + this.items[i+1].up)
          x = xInitial + Options.AR;
        }
      }

      if (this.items.length > 1) {
        new Path$2(x, y).h(Options.AR).addTo(this);
        x += Options.AR;
      }
      new Path$2(x, y).h(gaps[1]).addTo(this);

      return this;
    }
  }
  // funcs.Stack = (...args) => new Stack(...args);

  /* export */ class OptionalSequence extends DiagramMultiContainer {
    constructor(...items) {
      super("g", items);
      if (items.length === 0) {
        throw new RangeError("OptionalSequence() must have at least one child.");
      }
      if (items.length === 1) {
        return new Sequence(items);
      }
      const arc = Options.AR;
      this.needsSpace = false;
      this.width = 0;
      this.up = 0;
      this.height = sum(this.items, x => {
        return x.height;
      });
      this.down = this.items[0].down;
      let heightSoFar = 0;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.up = Math.max(
          this.up,
          Math.max(arc * 2, item.up + Options.VS) - heightSoFar
        );
        heightSoFar += item.height;
        if (i > 0) {
          this.down =
            Math.max(
              this.height + this.down,
              heightSoFar + Math.max(arc * 2, item.down + Options.VS)
            ) - this.height;
        }
        const itemWidth = (item.needsSpace ? 10 : 0) + item.width;
        if (i === 0) {
          this.width += arc + Math.max(itemWidth, arc);
        } else {
          this.width += arc * 2 + Math.max(itemWidth, arc) + arc;
        }
      }
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "optseq";
      }
    }
    format(x, y, width) {
      const arc = Options.AR;
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).right(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height)
        .right(gaps[1])
        .addTo(this);
      x += gaps[0];
      const upperLineY = y - this.up;
      const last = this.items.length - 1;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        const itemSpace = item.needsSpace ? 10 : 0;
        const itemWidth = item.width + itemSpace;
        if (i === 0) {
          // Upper skip
          new Path$2(x, y)
            .arc("se")
            .up(y - upperLineY - arc * 2)
            .arc("wn")
            .right(itemWidth - arc)
            .arc("ne")
            .down(y + item.height - upperLineY - arc * 2)
            .arc("ws")
            .addTo(this);
          // Straight line
          new Path$2(x, y).right(itemSpace + arc).addTo(this);
          item.format(x + itemSpace + arc, y, item.width).addTo(this);
          x += itemWidth + arc;
          y += item.height;
          // x ends on the far side of the first element,
          // where the next element's skip needs to begin
        } else if (i < last) {
          // Upper skip
          new Path$2(x, upperLineY)
            .right(arc * 2 + Math.max(itemWidth, arc) + arc)
            .arc("ne")
            .down(y - upperLineY + item.height - arc * 2)
            .arc("ws")
            .addTo(this);
          // Straight line
          new Path$2(x, y).right(arc * 2).addTo(this);
          item.format(x + arc * 2, y, item.width).addTo(this);
          new Path$2(x + item.width + arc * 2, y + item.height)
            .right(itemSpace + arc)
            .addTo(this);
          // Lower skip
          new Path$2(x, y)
            .arc("ne")
            .down(
              item.height + Math.max(item.down + Options.VS, arc * 2) - arc * 2
            )
            .arc("ws")
            .right(itemWidth - arc)
            .arc("se")
            .up(item.down + Options.VS - arc * 2)
            .arc("wn")
            .addTo(this);
          x += arc * 2 + Math.max(itemWidth, arc) + arc;
          y += item.height;
        } else {
          // Straight line
          new Path$2(x, y).right(arc * 2).addTo(this);
          item.format(x + arc * 2, y, item.width).addTo(this);
          new Path$2(x + arc * 2 + item.width, y + item.height)
            .right(itemSpace + arc)
            .addTo(this);
          // Lower skip
          new Path$2(x, y)
            .arc("ne")
            .down(
              item.height + Math.max(item.down + Options.VS, arc * 2) - arc * 2
            )
            .arc("ws")
            .right(itemWidth - arc)
            .arc("se")
            .up(item.down + Options.VS - arc * 2)
            .arc("wn")
            .addTo(this);
        }
      }
      return this;
    }
  }
  // funcs.OptionalSequence = (...args) => new OptionalSequence(...args);

  /* export */ class AlternatingSequence extends DiagramMultiContainer {
    constructor(...items) {
      super("g", items);
      if (items.length === 1) {
        return new Sequence(items);
      }
      if (items.length !== 2) {
        throw new RangeError(
          "AlternatingSequence() must have one or two children."
        );
      }
      this.needsSpace = false;

      const arc = Options.AR;
      const vert = Options.VS;
      const max = Math.max;
      const first = this.items[0];
      const second = this.items[1];

      const arcX = (1 / Math.sqrt(2)) * arc * 2;
      const arcY = (1 - 1 / Math.sqrt(2)) * arc * 2;
      const crossY = Math.max(arc, Options.VS);
      const crossX = crossY - arcY + arcX;

      const firstOut = max(
        arc + arc,
        crossY / 2 + arc + arc,
        crossY / 2 + vert + first.down
      );
      this.up = firstOut + first.height + first.up;

      const secondIn = max(
        arc + arc,
        crossY / 2 + arc + arc,
        crossY / 2 + vert + second.up
      );
      this.down = secondIn + second.height + second.down;

      this.height = 0;

      const firstWidth = 2 * (first.needsSpace ? 10 : 0) + first.width;
      const secondWidth = 2 * (second.needsSpace ? 10 : 0) + second.width;
      this.width = 2 * arc + max(firstWidth, crossX, secondWidth) + 2 * arc;

      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "altseq";
      }
    }
    format(x, y, width) {
      const arc = Options.AR;
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).right(gaps[0]).addTo(this);
      x += gaps[0];
      new Path$2(x + this.width, y).right(gaps[1]).addTo(this);
      // bounding box
      // new Path(x+gaps[0], y).up(this.up).right(this.width).down(this.up+this.down).left(this.width).up(this.down).addTo(this);
      const first = this.items[0];
      const second = this.items[1];

      // top
      const firstIn = this.up - first.up;
      const firstOut = this.up - first.up - first.height;
      new Path$2(x, y)
        .arc("se")
        .up(firstIn - 2 * arc)
        .arc("wn")
        .addTo(this);
      first.format(x + 2 * arc, y - firstIn, this.width - 4 * arc).addTo(this);
      new Path$2(x + this.width - 2 * arc, y - firstOut)
        .arc("ne")
        .down(firstOut - 2 * arc)
        .arc("ws")
        .addTo(this);

      // bottom
      const secondIn = this.down - second.down - second.height;
      const secondOut = this.down - second.down;
      new Path$2(x, y)
        .arc("ne")
        .down(secondIn - 2 * arc)
        .arc("ws")
        .addTo(this);
      second.format(x + 2 * arc, y + secondIn, this.width - 4 * arc).addTo(this);
      new Path$2(x + this.width - 2 * arc, y + secondOut)
        .arc("se")
        .up(secondOut - 2 * arc)
        .arc("wn")
        .addTo(this);

      // crossover
      const arcX = (1 / Math.sqrt(2)) * arc * 2;
      const arcY = (1 - 1 / Math.sqrt(2)) * arc * 2;
      const crossY = Math.max(arc, Options.VS);
      const crossX = crossY - arcY + arcX;
      const crossBar = (this.width - 4 * arc - crossX) / 2;
      new Path$2(x + arc, y - crossY / 2 - arc)
        .arc("ws")
        .right(crossBar)
        .arc_8("n", "cw")
        .l(crossX - arcX, crossY - arcY)
        .arc_8("sw", "ccw")
        .right(crossBar)
        .arc("ne")
        .addTo(this);
      new Path$2(x + arc, y + crossY / 2 + arc)
        .arc("wn")
        .right(crossBar)
        .arc_8("s", "ccw")
        .l(crossX - arcX, -(crossY - arcY))
        .arc_8("nw", "cw")
        .right(crossBar)
        .arc("se")
        .addTo(this);

      return this;
    }
  }
  // funcs.AlternatingSequence = (...args) => new AlternatingSequence(...args);

  /* export */ class Choice extends DiagramMultiContainer {
    constructor(normal, ...items) {
      super("g", items);
      if (typeof normal !== "number" || normal !== Math.floor(normal)) {
        throw new TypeError("The first argument of Choice() must be an integer.");
      } else if (normal < 0 || normal >= items.length) {
        throw new RangeError(
          "The first argument of Choice() must be an index for one of the items."
        );
      } else {
        this.normal = normal;
      }
      const first = 0;
      const last = items.length - 1;
      this.width =
        Math.max.apply(
          null,
          this.items.map(el => {
            return el.width;
          })
        ) +
        Options.AR * 4;
      this.height = this.items[normal].height;
      this.up = this.items[first].up;
      let arcs;
      for (let i = first; i < normal; i++) {
        if (i === normal - 1) arcs = Options.AR * 2;
        else arcs = Options.AR;
        this.up += Math.max(
          arcs,
          this.items[i].height +
            this.items[i].down +
            Options.VS +
            this.items[i + 1].up
        );
      }
      this.down = this.items[last].down;
      for (let i = normal + 1; i <= last; i++) {
        if (i === normal + 1) arcs = Options.AR * 2;
        else arcs = Options.AR;
        this.down += Math.max(
          arcs,
          this.items[i - 1].height +
            this.items[i - 1].down +
            Options.VS +
            this.items[i].up
        );
      }
      this.down -= this.items[normal].height; // already counted in Choice.height
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "choice";
      }
    }
    format(x, y, width) {
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      const last = this.items.length - 1;
      const innerWidth = this.width - Options.AR * 4;

      // Do the elements that curve above
      let distanceFromY;
      for (let i = this.normal - 1; i >= 0; i--) {
        const item = this.items[i];
        if (i === this.normal - 1) {
          distanceFromY = Math.max(
            Options.AR * 2,
            this.items[this.normal].up + Options.VS + item.down + item.height
          );
        }
        new Path$2(x, y)
          .arc("se")
          .up(distanceFromY - Options.AR * 2)
          .arc("wn")
          .addTo(this);
        item
          .format(x + Options.AR * 2, y - distanceFromY, innerWidth)
          .addTo(this);
        new Path$2(x + Options.AR * 2 + innerWidth, y - distanceFromY + item.height)
          .arc("ne")
          .down(distanceFromY - item.height + this.height - Options.AR * 2)
          .arc("ws")
          .addTo(this);
        distanceFromY += Math.max(
          Options.AR,
          item.up +
            Options.VS +
            (i === 0 ? 0 : this.items[i - 1].down + this.items[i - 1].height)
        );
      }

      // Do the straight-line path.
      new Path$2(x, y).right(Options.AR * 2).addTo(this);
      this.items[this.normal]
        .format(x + Options.AR * 2, y, innerWidth)
        .addTo(this);
      new Path$2(x + Options.AR * 2 + innerWidth, y + this.height)
        .right(Options.AR * 2)
        .addTo(this);

      // Do the elements that curve below
      for (let i = this.normal + 1; i <= last; i++) {
        const item = this.items[i];
        if (i === this.normal + 1) {
          distanceFromY = Math.max(
            Options.AR * 2,
            this.height + this.items[this.normal].down + Options.VS + item.up
          );
        }
        new Path$2(x, y)
          .arc("ne")
          .down(distanceFromY - Options.AR * 2)
          .arc("ws")
          .addTo(this);
        item
          .format(x + Options.AR * 2, y + distanceFromY, innerWidth)
          .addTo(this);
        new Path$2(x + Options.AR * 2 + innerWidth, y + distanceFromY + item.height)
          .arc("se")
          .up(distanceFromY - Options.AR * 2 + item.height - this.height)
          .arc("wn")
          .addTo(this);
        distanceFromY += Math.max(
          Options.AR,
          item.height +
            item.down +
            Options.VS +
            (i === last ? 0 : this.items[i + 1].up)
        );
      }

      return this;
    }
  }
  // funcs.Choice = (...args) => new Choice(...args);

  /* export */ class HorizontalChoice extends DiagramMultiContainer {
    constructor(...items) {
      super("g", items);
      if (items.length === 0) {
        throw new RangeError("HorizontalChoice() must have at least one child.");
      }
      if (items.length === 1) {
        return new Sequence(items);
      }
      const allButLast = this.items.slice(0, -1);
      const middles = this.items.slice(1, -1);
      const first = this.items[0];
      const last = this.items[this.items.length - 1];
      this.needsSpace = false;

      this.width = Options.AR; // starting track
      this.width += Options.AR * 2 * (this.items.length - 1); // inbetween tracks
      this.width += sum(this.items, x => x.width + (x.needsSpace ? 20 : 0)); // items
      this.width += last.height > 0 ? Options.AR : 0; // needs space to curve up
      this.width += Options.AR; // ending track

      // Always exits at entrance height
      this.height = 0;

      // All but the last have a track running above them
      this._upperTrack = Math.max(
        Options.AR * 2,
        Options.VS,
        max$4(allButLast, x => x.up) + Options.VS
      );
      this.up = Math.max(this._upperTrack, last.up);

      // All but the first have a track running below them
      // Last either straight-lines or curves up, so has different calculation
      this._lowerTrack = Math.max(
        Options.VS,
        max$4(
          middles,
          x => x.height + Math.max(x.down + Options.VS, Options.AR * 2)
        ),
        last.height + last.down + Options.VS
      );
      if (first.height < this._lowerTrack) {
        // Make sure there's at least 2*AR room between first exit and lower track
        this._lowerTrack = Math.max(
          this._lowerTrack,
          first.height + Options.AR * 2
        );
      }
      this.down = Math.max(this._lowerTrack, first.height + first.down);

      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "horizontalchoice";
      }
    }
    format(x, y, width) {
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      const first = this.items[0];
      const last = this.items[this.items.length - 1];
      const allButFirst = this.items.slice(1);
      const allButLast = this.items.slice(0, -1);

      // upper track
      const upperSpan =
        sum(allButLast, x => x.width + (x.needsSpace ? 20 : 0)) +
        (this.items.length - 2) * Options.AR * 2 -
        Options.AR;
      new Path$2(x, y)
        .arc("se")
        .v(-(this._upperTrack - Options.AR * 2))
        .arc("wn")
        .h(upperSpan)
        .addTo(this);

      // lower track
      const lowerSpan =
        sum(allButFirst, x => x.width + (x.needsSpace ? 20 : 0)) +
        (this.items.length - 2) * Options.AR * 2 +
        (last.height > 0 ? Options.AR : 0) -
        Options.AR;
      const lowerStart =
        x +
        Options.AR +
        first.width +
        (first.needsSpace ? 20 : 0) +
        Options.AR * 2;
      new Path$2(lowerStart, y + this._lowerTrack)
        .h(lowerSpan)
        .arc("se")
        .v(-(this._lowerTrack - Options.AR * 2))
        .arc("wn")
        .addTo(this);

      // Items
      for (const [i, item] of enumerate(this.items)) {
        // input track
        if (i === 0) {
          new Path$2(x, y).h(Options.AR).addTo(this);
          x += Options.AR;
        } else {
          new Path$2(x, y - this._upperTrack)
            .arc("ne")
            .v(this._upperTrack - Options.AR * 2)
            .arc("ws")
            .addTo(this);
          x += Options.AR * 2;
        }

        // item
        const itemWidth = item.width + (item.needsSpace ? 20 : 0);
        item.format(x, y, itemWidth).addTo(this);
        x += itemWidth;

        // output track
        if (i === this.items.length - 1) {
          if (item.height === 0) {
            new Path$2(x, y).h(Options.AR).addTo(this);
          } else {
            new Path$2(x, y + item.height).arc("se").addTo(this);
          }
        } else if (i === 0 && item.height > this._lowerTrack) {
          // Needs to arc up to meet the lower track, not down.
          if (item.height - this._lowerTrack >= Options.AR * 2) {
            new Path$2(x, y + item.height)
              .arc("se")
              .v(this._lowerTrack - item.height + Options.AR * 2)
              .arc("wn")
              .addTo(this);
          } else {
            // Not enough space to fit two arcs
            // so just bail and draw a straight line for now.
            new Path$2(x, y + item.height)
              .l(Options.AR * 2, this._lowerTrack - item.height)
              .addTo(this);
          }
        } else {
          new Path$2(x, y + item.height)
            .arc("ne")
            .v(this._lowerTrack - item.height - Options.AR * 2)
            .arc("ws")
            .addTo(this);
        }
      }
      return this;
    }
  }
  // funcs.HorizontalChoice = (...args) => new HorizontalChoice(...args);

  /* export */ class MultipleChoice extends DiagramMultiContainer {
    constructor(normal, type, ...items) {
      super("g", items);
      if (typeof normal !== "number" || normal !== Math.floor(normal)) {
        throw new TypeError(
          "The first argument of MultipleChoice() must be an integer."
        );
      } else if (normal < 0 || normal >= items.length) {
        throw new RangeError(
          "The first argument of MultipleChoice() must be an index for one of the items."
        );
      } else {
        this.normal = normal;
      }
      if (type !== "any" && type !== "all") {
        throw new SyntaxError(
          'The second argument of MultipleChoice must be "any" or "all".'
        );
      } else {
        this.type = type;
      }
      this.needsSpace = true;
      this.innerWidth = max$4(this.items, x => {
        return x.width;
      });
      this.width = 30 + Options.AR + this.innerWidth + Options.AR + 20;
      this.up = this.items[0].up;
      this.down = this.items[this.items.length - 1].down;
      this.height = this.items[normal].height;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        let minimum;
        if (i === normal - 1 || i === normal + 1) minimum = 10 + Options.AR;
        else minimum = Options.AR;
        if (i < normal) {
          this.up += Math.max(
            minimum,
            item.height + item.down + Options.VS + this.items[i + 1].up
          );
        } else if (i > normal) {
          this.down += Math.max(
            minimum,
            item.up +
              Options.VS +
              this.items[i - 1].down +
              this.items[i - 1].height
          );
        }
      }
      this.down -= this.items[normal].height; // already counted in this.height
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "multiplechoice";
      }
    }
    format(x, y, width) {
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).right(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height)
        .right(gaps[1])
        .addTo(this);
      x += gaps[0];

      const normal = this.items[this.normal];

      // Do the elements that curve above
      let distanceFromY;
      for (let i = this.normal - 1; i >= 0; i--) {
        const item = this.items[i];
        if (i === this.normal - 1) {
          distanceFromY = Math.max(
            10 + Options.AR,
            normal.up + Options.VS + item.down + item.height
          );
        }
        new Path$2(x + 30, y)
          .up(distanceFromY - Options.AR)
          .arc("wn")
          .addTo(this);
        item
          .format(x + 30 + Options.AR, y - distanceFromY, this.innerWidth)
          .addTo(this);
        new Path$2(
          x + 30 + Options.AR + this.innerWidth,
          y - distanceFromY + item.height
        )
          .arc("ne")
          .down(distanceFromY - item.height + this.height - Options.AR - 10)
          .addTo(this);
        if (i !== 0) {
          distanceFromY += Math.max(
            Options.AR,
            item.up +
              Options.VS +
              this.items[i - 1].down +
              this.items[i - 1].height
          );
        }
      }

      new Path$2(x + 30, y).right(Options.AR).addTo(this);
      normal.format(x + 30 + Options.AR, y, this.innerWidth).addTo(this);
      new Path$2(x + 30 + Options.AR + this.innerWidth, y + this.height)
        .right(Options.AR)
        .addTo(this);

      for (let i = this.normal + 1; i < this.items.length; i++) {
        const item = this.items[i];
        if (i === this.normal + 1) {
          distanceFromY = Math.max(
            10 + Options.AR,
            normal.height + normal.down + Options.VS + item.up
          );
        }
        new Path$2(x + 30, y)
          .down(distanceFromY - Options.AR)
          .arc("ws")
          .addTo(this);
        item
          .format(x + 30 + Options.AR, y + distanceFromY, this.innerWidth)
          .addTo(this);
        new Path$2(
          x + 30 + Options.AR + this.innerWidth,
          y + distanceFromY + item.height
        )
          .arc("se")
          .up(distanceFromY - Options.AR + item.height - normal.height)
          .addTo(this);
        if (i !== this.items.length - 1) {
          distanceFromY += Math.max(
            Options.AR,
            item.height + item.down + Options.VS + this.items[i + 1].up
          );
        }
      }
      const text = new FakeSVG("g", { class: "diagram-text" }).addTo(this);
      new FakeSVG(
        "title",
        {},
        this.type === "any"
          ? "take one or more branches, once each, in any order"
          : "take all branches, once each, in any order"
      ).addTo(text);
      new FakeSVG("path", {
        d: `M ${x + 30} ${
        y - 10
      } h -26 a 4 4 0 0 0 -4 4 v 12 a 4 4 0 0 0 4 4 h 26 z`,
        class: "diagram-text",
      }).addTo(text);
      new FakeSVG(
        "text",
        {
          x: x + 15,
          y: y + 4,
          class: "diagram-text",
        },
        this.type === "any" ? "1+" : "all"
      ).addTo(text);
      new FakeSVG("path", {
        d: `M ${x + this.width - 20} ${
        y - 10
      } h 16 a 4 4 0 0 1 4 4 v 12 a 4 4 0 0 1 -4 4 h -16 z`,
        class: "diagram-text",
      }).addTo(text);
      new FakeSVG("path", {
        d: `M ${x + this.width - 13} ${
        y - 2
      } a 4 4 0 1 0 6 -1 m 2.75 -1 h -4 v 4 m 0 -3 h 2`,
        style: "stroke-width: 1.75",
      }).addTo(text);
      return this;
    }
  }
  // funcs.MultipleChoice = (...args) => new MultipleChoice(...args);

  /* export */ class Optional extends Choice {
    constructor(item, skip) {
      if (skip === undefined) super(1, new Skip(), item);
      else if (skip === "skip") super(0, new Skip(), item);
      else throw 'Unknown value for Optional()\'s "skip" argument.';
    }
  }
  // funcs.Optional = (...args) => new Optional(...args);

  /* export */ class OneOrMore extends FakeSVG {
    constructor(item, rep) {
      super("g");
      rep = rep || new Skip();
      this.item = wrapString(item);
      this.rep = wrapString(rep);
      this.width = Math.max(this.item.width, this.rep.width) + Options.AR * 2;
      this.height = this.item.height;
      this.up = this.item.up;
      this.down = Math.max(
        Options.AR * 2,
        this.item.down +
          Options.VS +
          this.rep.up +
          this.rep.height +
          this.rep.down
      );
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "oneormore";
      }
    }
    format(x, y, width) {
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      // Draw item
      new Path$2(x, y).right(Options.AR).addTo(this);
      this.item
        .format(x + Options.AR, y, this.width - Options.AR * 2)
        .addTo(this);
      new Path$2(x + this.width - Options.AR, y + this.height)
        .right(Options.AR)
        .addTo(this);

      // Draw repeat arc
      const distanceFromY = Math.max(
        Options.AR * 2,
        this.item.height + this.item.down + Options.VS + this.rep.up
      );
      new Path$2(x + Options.AR, y)
        .arc("nw")
        .down(distanceFromY - Options.AR * 2)
        .arc("ws")
        .addTo(this);
      this.rep
        .format(x + Options.AR, y + distanceFromY, this.width - Options.AR * 2)
        .addTo(this);
      new Path$2(x + this.width - Options.AR, y + distanceFromY + this.rep.height)
        .arc("se")
        .up(distanceFromY - Options.AR * 2 + this.rep.height - this.item.height)
        .arc("en")
        .addTo(this);

      return this;
    }
    walk(cb) {
      cb(this);
      this.item.walk(cb);
      this.rep.walk(cb);
    }
  }
  // funcs.OneOrMore = (...args) => new OneOrMore(...args);

  /* export */ class ZeroOrMore extends Optional {
    constructor(item, rep, skip) {
      super(new OneOrMore(item, rep), skip);
    }
  }
  // funcs.ZeroOrMore = (...args) => new ZeroOrMore(...args);

  /* export */ class Group extends FakeSVG {
    constructor(item, label) {
      super("g");
      this.item = wrapString(item);
      this.label =
        label instanceof FakeSVG ? label : label ? new Comment(label) : undefined;

      this.width = Math.max(
        this.item.width + (this.item.needsSpace ? 20 : 0),
        this.label ? this.label.width : 0,
        Options.AR * 2
      );
      this.height = this.item.height;
      this.boxUp = this.up = Math.max(this.item.up + Options.VS, Options.AR);
      if (this.label) {
        this.up += this.label.up + this.label.height + this.label.down;
      }
      this.down = Math.max(this.item.down + Options.VS, Options.AR);
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "group";
      }
    }
    format(x, y, width) {
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      new FakeSVG("rect", {
        x,
        y: y - this.boxUp,
        width: this.width,
        height: this.boxUp + this.height + this.down,
        rx: Options.AR,
        ry: Options.AR,
        class: "group-box",
      }).addTo(this);

      this.item.format(x, y, this.width).addTo(this);
      if (this.label) {
        this.label
          .format(
            x,
            y - (this.boxUp + this.label.down + this.label.height),
            this.label.width
          )
          .addTo(this);
      }

      return this;
    }
    walk(cb) {
      cb(this);
      this.item.walk(cb);
      this.label.walk(cb);
    }
  }
  // funcs.Group = (...args) => new Group(...args);

  /* export */ class Start extends FakeSVG {
    constructor({ type = "simple", label } = {}) {
      super("g");
      this.width = 20;
      this.height = 0;
      this.up = 10;
      this.down = 10;
      this.type = type;
      if (label) {
        this.label = `${label}`;
        this.width = Math.max(20, this.label.length * Options.CHAR_WIDTH + 10);
      }
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "start";
      }
    }
    format(x, y) {
      const path = new Path$2(x, y - 10);
      if (this.type === "complex") {
        path.down(20).m(0, -10).right(this.width).addTo(this);
      } else {
        path
          .down(20)
          .m(10, -20)
          .down(20)
          .m(-10, -10)
          .right(this.width)
          .addTo(this);
      }
      if (this.label) {
        new FakeSVG(
          "text",
          { x, y: y - 15, style: "text-anchor:start" },
          this.label
        ).addTo(this);
      }
      return this;
    }
  }
  // funcs.Start = (...args) => new Start(...args);

  /* export */ class End extends FakeSVG {
    constructor({ type = "simple" } = {}) {
      super("path");
      this.width = 20;
      this.height = 0;
      this.up = 10;
      this.down = 10;
      this.type = type;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "end";
      }
    }
    format(x, y) {
      if (this.type === "complex") {
        this.attrs.d = `M ${x} ${y} h 20 m 0 -10 v 20`;
      } else {
        this.attrs.d = `M ${x} ${y} h 20 m -10 -10 v 20 m 10 -20 v 20`;
      }
      return this;
    }
  }
  // funcs.End = (...args) => new End(...args);

  /* export */ class Terminal extends FakeSVG {
    constructor(text, { href, title, cls } = {}) {
      super("g", { class: ["terminal", cls].join(" ") });
      this.text = `${text}`;
      this.href = href;
      this.title = title;
      this.cls = cls;
      this.width =
        this.text.length * Options.CHAR_WIDTH +
        20; /* Assume that each char is .5em, and that the em is 16px */
      this.height = 0;
      this.up = 11;
      this.down = 11;
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "terminal";
      }
    }
    format(x, y, width) {
      // in SVG 1.1, title must be first
      if (this.title) new FakeSVG("title", {}, this.title).addTo(this);
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
      x += gaps[0];

      new FakeSVG("rect", {
        x,
        y: y - 11,
        width: this.width,
        height: this.up + this.down,
        rx: 10,
        ry: 10,
      }).addTo(this);
      const text = new FakeSVG(
        "text",
        { x: x + this.width / 2, y: y + 4 },
        this.text
      );
      if (this.href)
        new FakeSVG("a", { "xlink:href": this.href }, [text]).addTo(this);
      else text.addTo(this);
      // if (this.title) console.log(`returning terminal title ${this.toString()}`);
      return this;
    }
  }
  // funcs.Terminal = (...args) => new Terminal(...args);

  /* export */ class NonTerminal extends FakeSVG {
    constructor(text, { href, title, cls = "" } = {}) {
      super("g", { class: ["non-terminal", cls].join(" ") });
      this.text = `${text}`;
      this.href = href;
      this.title = title;
      this.cls = cls;
      this.width = this.text.length * Options.CHAR_WIDTH + 20;
      this.height = 0;
      this.up = 11;
      this.down = 11;
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "nonterminal";
      }
    }
    format(x, y, width) {
      // in SVG 1.1, title must be first
      if (this.title) new FakeSVG("title", {}, this.title).addTo(this);
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
      x += gaps[0];

      new FakeSVG("rect", {
        x,
        y: y - 11,
        width: this.width,
        height: this.up + this.down,
      }).addTo(this);
      const text = new FakeSVG(
        "text",
        { x: x + this.width / 2, y: y + 4 },
        this.text
      );
      if (this.href)
        new FakeSVG("a", { "xlink:href": this.href }, [text]).addTo(this);
      else text.addTo(this);
      // if (this.title) console.log(`returning nonterminal title ${this.toString()}`);
      return this;
    }
  }
  // funcs.NonTerminal = (...args) => new NonTerminal(...args);

  /* export */ class Comment extends FakeSVG {
    constructor(text, { href, title, cls = "" } = {}) {
      super("g", { class: ["comment", cls].join(" ") });
      this.text = `${text}`;
      this.href = href;
      this.title = title;
      this.cls = cls;
      this.width = this.text.length * Options.COMMENT_CHAR_WIDTH + 10;
      this.height = 0;
      this.up = 8;
      this.down = 8;
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "comment";
      }
    }
    format(x, y, width) {
      // in SVG 1.1, <title> must come first
      if (this.title) new FakeSVG("title", {}, this.title).addTo(this);
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      const text = new FakeSVG(
        "text",
        { x: x + this.width / 2, y: y + 5, class: "comment" },
        this.text
      );
      if (this.href)
        new FakeSVG("a", { "xlink:href": this.href }, [text]).addTo(this);
      else text.addTo(this);
      return this;
    }
  }
  // funcs.Comment = (...args) => new Comment(...args);

  /* export */ class Skip extends FakeSVG {
    constructor() {
      super("g");
      this.width = 0;
      this.height = 0;
      this.up = 0;
      this.down = 0;
      this.needsSpace = false;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "skip";
      }
    }
    format(x, y, width) {
      new Path$2(x, y).right(width).addTo(this);
      return this;
    }
  }
  // funcs.Skip = (...args) => new Skip(...args);

  /* export */ class Block extends FakeSVG {
    constructor({
      width = 50,
      up = 15,
      height = 25,
      down = 15,
      // needsSpace = true,
    } = {}) {
      super("g");
      this.width = width;
      this.height = height;
      this.up = up;
      this.down = down;
      this.needsSpace = true;
      if (Options.DEBUG) {
        this.attrs["data-updown"] = `${this.up} ${this.height} ${this.down}`;
        this.attrs["data-type"] = "block";
      }
    }
    format(x, y, width) {
      // Hook up the two sides if this is narrower than its stated width.
      const gaps = determineGaps(width, this.width);
      new Path$2(x, y).h(gaps[0]).addTo(this);
      new Path$2(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
      x += gaps[0];

      new FakeSVG("rect", {
        x,
        y: y - this.up,
        width: this.width,
        height: this.up + this.height + this.down,
      }).addTo(this);
      return this;
    }
  }
  // funcs.Block = (...args) => new Block(...args);

  function unnull(...args) {
    // Return the first value that isn't undefined.
    // More correct than `v1 || v2 || v3` because falsey values will be returned.
    return args.reduce((sofar, x) => {
      return sofar !== undefined ? sofar : x;
    });
  }

  function determineGaps(outer, inner) {
    const diff = outer - inner;
    switch (Options.INTERNAL_ALIGNMENT) {
      case "left":
        return [0, diff];
      case "right":
        return [diff, 0];
      default:
        return [diff / 2, diff / 2];
    }
  }

  function wrapString(value) {
    return value instanceof FakeSVG ? value : new Terminal(`${value}`);
  }

  function sum(iter, func) {
    if (!func)
      func = function (x) {
        return x;
      };
    return iter.map(func).reduce((a, b) => {
      return a + b;
    }, 0);
  }

  function max$4(iter, func) {
    if (!func)
      func = function (x) {
        return x;
      };
    return Math.max.apply(null, iter.map(func));
  }

  function SVG$1(name, attrs, text) {
    attrs = attrs || {};
    text = text || "";
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        if (attr === "xlink:href")
          el.setAttributeNS("http://www.w3.org/1999/xlink", "href", attrs[attr]);
        else el.setAttribute(attr, attrs[attr]);
      }
    }
    el.textContent = text;
    return el;
  }

  function escapeString(string) {
    // Escape markdown and HTML special characters
    return string.replace(/[*_`[\]<&]/g, charString => {
      return `&#${charString.charCodeAt(0)};`;
    });
  }

  function* enumerate(iter) {
    let count = 0;
    for (const x of iter) {
      yield [count, x];
      count++;
    }
  }

  function jsonToSVG(item, level = 0) {
    let retval = "";
    if (item instanceof FakeSVG) {
      retval = item;
    } else if (typeof item == "string") {
      retval = /^\s*\d+\s*$/.test(item) ? parseInt(item) : item;
    } else if (typeof item == "number") {
      retval = item;
    } else if (Array.isArray(item)) {
      if (item.length > 0 && typeof item[0] == "string") {
        const first = item.shift();
        let attrs = {};
        const itemMap = item.reduce((accum, x) => {
          if (x instanceof FakeSVG) {
            accum.push(x);
          } else if (typeof x == "object" && !Array.isArray(x)) {
            attrs = { ...attrs, ...x };
          } else {
            accum.push(jsonToSVG(x, level + 1));
          }
          return accum;
        }, []);
        switch (first) {
          case "Path":
            retval = new Path$2(...itemMap);
            break;
          case "Diagram":
            retval = new Diagram(...itemMap);
            break;
          case "ComplexDiagram":
            retval = new ComplexDiagram(...itemMap);
            break;
          case "Sequence":
            retval = new Sequence(...itemMap);
            break;
          case "Element":
            retval = new Element$1(...itemMap);
            break;
          case "Stack":
            retval = new Stack(...itemMap);
            break;
          case "OptionalSequence":
            retval = new OptionalSequence(...itemMap);
            break;
          case "AlternatingSequence":
            retval = new AlternatingSequence(...itemMap);
            break;
          case "Choice":
            retval = new Choice(...itemMap);
            break;
          case "HorizontalChoice":
            retval = new HorizontalChoice(...itemMap);
            break;
          case "MultipleChoice":
            retval = new MultipleChoice(...itemMap);
            break;
          case "Optional":
            retval = new Optional(...itemMap);
            break;
          case "OneOrMore":
            retval = new OneOrMore(...itemMap, attrs);
            break;
          case "ZeroOrMore":
            retval = new ZeroOrMore(...itemMap);
            break;
          case "Group":
            retval = new Group(...itemMap);
            break;
          case "Start":
            retval = new Start(attrs);
            break;
          case "End":
            retval = new End(attrs);
            break;
          case "Terminal":
            retval = new Terminal(...itemMap, attrs);
            break;
          case "NonTerminal":
            retval = new NonTerminal(...itemMap, attrs);
            break;
          case "Comment":
            retval = new Comment(...itemMap, attrs);
            break;
          case "Skip":
            retval = new Skip(...itemMap);
            break;
          case "Block":
            retval = new Block(attrs);
            break;
          default:
            retval = new Comment(
              `UNKNOWN: first="${first}" "${item.toString()}"`
            );
        }
      }
    } else {
      retval = item.toString();
    }
    return retval;
  }

  async function run$N(conf) {
    if (!("noRailroad" in conf)) {
      if ("railroad" in conf) {
        for (const opt in Options) {
          if (opt in conf.railroad) {
            Options[opt] = conf.railroad[opt];
          }
        }
      }

      let css = await cssPromise$4;
      css = css.replace(/\bsvg\b/g, `svg.${Options.DIAGRAM_CLASS}`);
      css = `<style id="respec-railroad-style">${css}</style>`;
      // console.log(`railroad.css = ${css}`);
      if (document.head.querySelector("link")) {
        document.head
          // insert CSS before the first <link>
          .querySelector("link")
          .insertAdjacentHTML("beforebegin", css);
      } else {
        // No <link> found in <head>, insert CSS at beginning of <head>
        // so defaults can be overridden
        document.head.insertAdjacentHTML("afterbegin", css);
      }

      document.querySelectorAll("figure.railroad pre").forEach(pre => {
        let error = null;
        try {
          const json = JSON.parse(pre.textContent);
          try {
            const svg = jsonToSVG(json);
            try {
              pre.insertAdjacentElement("afterend", svg.toSVG());
            } catch {
              error = `<p class="respec-error">Error in svg.toSVG: ${escapeString(
              pre.textContent
            )}</p>`;
            }
          } catch {
            error = `<p class="respec-error">Error in jsonToSVG: ${escapeString(
            JSON.stringify(json)
          )}</p>`;
          }
        } catch {
          error = `<p class="respec-error">Invalid JSON: ${escapeString(
          pre.textContent
        )}</p>`;
        }
        if (error) {
          pre.insertAdjacentHTML("beforebegin", error);
        }
      });
    }
  }

  var railroad = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$11,
    run: run$N
  });

  var ui$2 = ".respec-modal .close-button{position:absolute;z-index:inherit;padding:.2em;font-weight:700;cursor:pointer;margin-left:5px;border:none;background:0 0}\n#respec-ui{position:fixed;display:flex;flex-direction:row-reverse;top:20px;right:20px;width:202px;text-align:right;z-index:9000}\n#respec-pill,.respec-info-button{background:#fff;height:2.5em;color:#787878;border:1px solid #ccc;box-shadow:1px 1px 8px 0 rgba(100,100,100,.5)}\n.respec-info-button{border:none;opacity:.75;border-radius:2em;margin-right:1em;min-width:3.5em}\n.respec-info-button:focus,.respec-info-button:hover{opacity:1;transition:opacity .2s}\n#respec-pill:disabled{font-size:2.8px;text-indent:-9999em;border-top:1.1em solid rgba(40,40,40,.2);border-right:1.1em solid rgba(40,40,40,.2);border-bottom:1.1em solid rgba(40,40,40,.2);border-left:1.1em solid #fff;transform:translateZ(0);animation:respec-spin .5s infinite linear;box-shadow:none}\n#respec-pill:disabled,#respec-pill:disabled:after{border-radius:50%;width:10em;height:10em}\n@keyframes respec-spin{\n0%{transform:rotate(0)}\n100%{transform:rotate(360deg)}\n}\n.respec-hidden{visibility:hidden;opacity:0;transition:visibility 0s .2s,opacity .2s linear}\n.respec-visible{visibility:visible;opacity:1;transition:opacity .2s linear}\n#respec-pill:focus,#respec-pill:hover{color:#000;background-color:#f5f5f5;transition:color .2s}\n#respec-menu{position:absolute;margin:0;padding:0;font-family:sans-serif;background:#fff;box-shadow:1px 1px 8px 0 rgba(100,100,100,.5);width:200px;display:none;text-align:left;margin-top:32px;font-size:.8em}\n#respec-menu:not([hidden]){display:block}\n#respec-menu li{list-style-type:none;margin:0;padding:0}\n.respec-save-buttons{display:grid;grid-template-columns:repeat(auto-fill,minmax(47%,2fr));grid-gap:.5cm;padding:.5cm}\n.respec-save-button:link{padding-top:16px;color:#f0f0f0;background:#2a5aa8;justify-self:stretch;height:1cm;text-decoration:none;text-align:center;font-size:inherit;border:none;border-radius:.2cm}\n.respec-save-button:link:hover{color:#fff;background:#2a5aa8;padding:0;margin:0;border:0;padding-top:16px}\n.respec-save-button:link:focus{background:#193766}\n#respec-pill:focus,#respec-ui button:focus,.respec-option:focus{outline:0;outline-style:none}\n#respec-pill-error{background-color:red;color:#fff}\n#respec-pill-warning{background-color:orange;color:#fff}\n.respec-error-list,.respec-warning-list{margin:0;padding:0;list-style:none;font-family:sans-serif;background-color:#fffbe6;font-size:.85em}\n.respec-error-list>li,.respec-warning-list>li{padding:.4em .7em}\n.respec-warning-list>li::before{content:\"⚠️\";padding-right:.5em}\n.respec-error-list p,.respec-warning-list p{padding:0;margin:0}\n.respec-warning-list li{color:#5c3b00;border-bottom:thin solid #fff5c2}\n.respec-error-list,.respec-error-list li{background-color:#fff0f0}\n.respec-error-list li::before{content:\"💥\";padding-right:.5em}\n.respec-error-list li{padding:.4em .7em;color:#5c3b00;border-bottom:thin solid #ffd7d7}\n.respec-error-list li>p{margin:0;padding:0;display:inline-block}\n.respec-error-list li>p:first-child,.respec-warning-list li>p:first-child{display:inline}\n.respec-error-list>li li,.respec-warning-list>li li{margin:0;list-style:disc}\n#respec-overlay{display:block;position:fixed;z-index:10000;top:0;left:0;height:100%;width:100%;background:#000}\n.respec-show-overlay{transition:opacity .2s linear;opacity:.5}\n.respec-hide-overlay{transition:opacity .2s linear;opacity:0}\n.respec-modal{display:block;position:fixed;z-index:11000;margin:auto;top:10%;background:#fff;border:5px solid #666;min-width:20%;width:79%;padding:0;max-height:80%;overflow-y:auto;margin:0 -.5cm}\n@media screen and (min-width:78em){\n.respec-modal{width:62%}\n}\n.respec-modal h3{margin:0;padding:.2em;text-align:center;color:#000;background:linear-gradient(to bottom,#eee 0,#eee 50%,#ccc 100%);font-size:1em}\n.respec-modal .inside div p{padding-left:1cm}\n#respec-menu button.respec-option{background:#fff;padding:0 .2cm;border:none;width:100%;text-align:left;font-size:inherit;padding:1.2em 1.2em}\n#respec-menu button.respec-option:hover,#respec-menu button:focus{background-color:#eee}\n.respec-cmd-icon{padding-right:.5em}\n#respec-ui button.respec-option:last-child{border:none;border-radius:inherit}\n.respec-button-copy-paste{position:absolute;height:28px;width:40px;cursor:pointer;background-image:linear-gradient(#fcfcfc,#eee);border:1px solid #90b8de;border-left:0;border-radius:0 0 3px 0;-webkit-user-select:none;user-select:none;-webkit-appearance:none;top:0;left:127px}\n#specref-ui{margin:0 2%;margin-bottom:.5cm}\n#specref-ui header{font-size:.7em;background-color:#eee;text-align:center;padding:.2cm;margin-bottom:.5cm;border-radius:0 0 .2cm .2cm}\n#specref-ui header h1{padding:0;margin:0;color:#000}\n#specref-ui p{padding:0;margin:0;font-size:.8em;text-align:center}\n#specref-ui p.state{margin:1cm}\n#specref-ui .searchcomponent{font-size:16px;display:grid;grid-template-columns:auto 2cm}\n#specref-ui button,#specref-ui input{border:0;padding:6px 12px}\n#specref-ui label{font-size:.6em;grid-column-end:3;text-align:right;grid-column-start:1}\n#specref-ui input[type=search]{-webkit-appearance:none;font-size:16px;border-radius:.1cm 0 0 .1cm;border:1px solid #ccc}\n#specref-ui button[type=submit]{color:#fff;border-radius:0 .1cm .1cm 0;background-color:#337ab7}\n#specref-ui button[type=submit]:hover{background-color:#286090;border-color:#204d74}\n#specref-ui .result-stats{margin:0;padding:0;color:grey;font-size:.7em;font-weight:700}\n#specref-ui .specref-results{font-size:.8em}\n#specref-ui .specref-results dd+dt{margin-top:.51cm}\n#specref-ui .specref-results a{text-transform:capitalize}\n#specref-ui .specref-results .authors{display:block;color:#006621}\n@media print{\n#respec-ui{display:none}\n}\n#xref-ui{width:100%;min-height:550px;height:100%;overflow:hidden;padding:0;margin:0;border:0}\n#xref-ui:not(.ready){background:url(https://respec.org/xref/loader.gif) no-repeat center}\n.respec-dfn-list .dfn-status{margin-left:.5em;padding:.1em;text-align:center;white-space:nowrap;font-size:90%;border-radius:.2em}\n.respec-dfn-list .exported{background:#d1edfd;color:#040b1c;box-shadow:0 0 0 .125em #1ca5f940}\n.respec-dfn-list .unused{background:#fde0e6;color:#9d0c29;box-shadow:0 0 0 .125em #f1466840}\n#xref-ui+a[href]{font-size:.9rem;float:right;margin:0 .5em .5em;border-bottom-width:1px}";

  var ui$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ui$2
  });

  var respec = "@keyframes pop{\n0%{transform:scale(1,1)}\n25%{transform:scale(1.25,1.25);opacity:.75}\n100%{transform:scale(1,1)}\n}\n.hljs{background:0 0!important}\na abbr,h1 abbr,h2 abbr,h3 abbr,h4 abbr,h5 abbr,h6 abbr{border:none}\ndfn{font-weight:700}\na.internalDFN{color:inherit;border-bottom:1px solid #99c;text-decoration:none}\na.externalDFN{color:inherit;border-bottom:1px dotted #ccc;text-decoration:none}\na.bibref{text-decoration:none}\n.respec-offending-element:target{animation:pop .25s ease-in-out 0s 1}\n.respec-offending-element,a[href].respec-offending-element{text-decoration:red wavy underline}\n@supports not (text-decoration:red wavy underline){\n.respec-offending-element:not(pre){display:inline-block}\n.respec-offending-element{background:url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=) bottom repeat-x}\n}\n#references :target{background:#eaf3ff;animation:pop .4s ease-in-out 0s 1}\ncite .bibref{font-style:normal}\ncode{color:#c63501}\nth code{color:inherit}\na[href].orcid{padding-left:4px;padding-right:4px}\na[href].orcid>svg{margin-bottom:-2px}\n.toc a,.tof a{text-decoration:none}\na .figno,a .secno{color:#000}\nol.tof,ul.tof{list-style:none outside none}\n.caption{margin-top:.5em;font-style:italic}\ntable.simple{border-spacing:0;border-collapse:collapse;border-bottom:3px solid #005a9c}\n.simple th{background:#005a9c;color:#fff;padding:3px 5px;text-align:left}\n.simple th a{color:#fff;padding:3px 5px;text-align:left}\n.simple th[scope=row]{background:inherit;color:inherit;border-top:1px solid #ddd}\n.simple td{padding:3px 10px;border-top:1px solid #ddd}\n.simple tr:nth-child(even){background:#f0f6ff}\n.section dd>p:first-child{margin-top:0}\n.section dd>p:last-child{margin-bottom:0}\n.section dd{margin-bottom:1em}\n.section dl.attrs dd,.section dl.eldef dd{margin-bottom:0}\n#issue-summary>ul,.respec-dfn-list{column-count:2}\n#issue-summary li,.respec-dfn-list li{list-style:none}\ndetails.respec-tests-details{margin-left:1em;display:inline-block;vertical-align:top}\ndetails.respec-tests-details>*{padding-right:2em}\ndetails.respec-tests-details[open]{z-index:999999;position:absolute;border:thin solid #cad3e2;border-radius:.3em;background-color:#fff;padding-bottom:.5em}\ndetails.respec-tests-details[open]>summary{border-bottom:thin solid #cad3e2;padding-left:1em;margin-bottom:1em;line-height:2em}\ndetails.respec-tests-details>ul{width:100%;margin-top:-.3em}\ndetails.respec-tests-details>li{padding-left:1em}\na[href].self-link:hover{opacity:1;text-decoration:none;background-color:transparent}\nh2,h3,h4,h5,h6{position:relative}\naside.example .marker>a.self-link{color:inherit}\ncaption>a.self-link,div.marker>a.self-link,figcaption>a.self-link,h2>a.self-link,h3>a.self-link,h4>a.self-link,h5>a.self-link,h6>a.self-link{border:none;color:inherit;font-size:83%;height:2em;left:-1.6em;opacity:.5;position:absolute;text-align:center;text-decoration:none;top:0;transition:opacity .2s;width:2em}\ncaption>a.self-link::before,div.marker>a.self-link::before,figcaption>a.self-link::before,h2>a.self-link::before,h3>a.self-link::before,h4>a.self-link::before,h5>a.self-link::before,h6>a.self-link::before{content:\"§\";display:block}\n@media (max-width:767px){\ndd{margin-left:0}\ncaption>a.self-link,div.marker>a.self-link,figcaption>a.self-link,h2>a.self-link,h3>a.self-link,h4>a.self-link,h5>a.self-link,h6>a.self-link{left:auto;top:auto}\n}\n@media print{\n.removeOnSave{display:none}\n}";

  var respec$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': respec
  });

  var examples$1 = "span.example-title{text-transform:none}\naside.example,div.example,div.illegal-example{padding:.5em;margin:1em 0;position:relative;clear:both}\ndiv.illegal-example{color:red}\ndiv.illegal-example p{color:#000}\naside.example,div.example{padding:.5em;border-left-width:.5em;border-left-style:solid;border-color:#e0cb52;background:#fcfaee}\naside.example div.example{border-left-width:.1em;border-color:#999;background:#fff}\naside.example div.example span.example-title{color:#999}";

  var examples$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': examples$1
  });

  var issuesNotes$1 = ".issue-label{text-transform:initial}\n.warning>p:first-child{margin-top:0}\n.warning{padding:.5em;border-left-width:.5em;border-left-style:solid}\nspan.warning{padding:.1em .5em .15em}\n.issue.closed span.issue-number{text-decoration:line-through}\n.warning{border-color:#f11;border-width:.2em;border-style:solid;background:#fbe9e9}\n.warning-title:before{content:\"⚠\";font-size:1.3em;float:left;padding-right:.3em;margin-top:-.3em}\nli.task-list-item{list-style:none}\ninput.task-list-item-checkbox{margin:0 .35em .25em -1.6em;vertical-align:middle}\n.issue a.respec-gh-label{padding:5px;margin:0 2px 0 2px;font-size:10px;text-transform:none;text-decoration:none;font-weight:700;border-radius:4px;position:relative;bottom:2px;border:none;display:inline-block}\ndiv.impnote-title{padding-right:1em;min-width:7.5em;color:#0060a9}\ndiv.impnote-title span{text-transform:uppercase}\ndiv.impnote{margin-top:1em;margin-bottom:1em}\n.impnote>p:first-child{margin-top:0}\n.impnote{padding:.5em;border-left-width:.5em;border-left-style:solid}\ndiv.impnote{padding:1em 1.2em .5em;margin:1em 0;position:relative;clear:both}\nspan.impnote{padding:.1em .5em .15em}\n.impnote{border-color:#0060a9;background:#e5f4ff}";

  var issuesNotes$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': issuesNotes$1
  });

  var regpict$1 = "text.regBitNumMiddle{text-anchor:middle;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitNumEnd{text-anchor:end;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitNumStart{text-anchor:start;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitWidth{text-anchor:middle;fill:none;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-weight:700;font-size:11pt}\ntext.regByteNumMiddle{text-anchor:middle;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ntext.regRowTagLeft{text-anchor:end;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ntext.regRowTagRight{text-anchor:start;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ng line.regBitNumLine{stroke:grey;stroke-width:1px}\ng line.regBitNumLine_Hide{stroke:none;stroke-width:1px}\ng path.regFieldBox,g rect.regFieldBox{fill:#fff;stroke:#000;stroke-width:1.5px}\ng.regAttr_reserved path.regFieldBox,g.regAttr_reserved rect.regFieldBox,g.regAttr_rsvd path.regFieldBox,g.regAttr_rsvd rect.regFieldBox,g.regAttr_rsvdp path.regFieldBox,g.regAttr_rsvdp rect.regFieldBox,g.regAttr_rsvdz path.regFieldBox,g.regAttr_rsvdz rect.regFieldBox,g.regAttr_unused path.regFieldBox,g.regAttr_unused rect.regFieldBox,g.regFieldUnused path.regFieldBox,g.regFieldUnused rect.regFieldBox{fill:#e8e8e8}\ng.regFieldExternal line.regFieldBox,g.regFieldInternal line.regFieldBox{stroke:#000}\ng.regFieldUnused line.regFieldBox,g.regFieldUnused path.regFieldBox,g.regFieldUnused rect.regFieldBox{stroke:grey}\ng.regFieldUnused text.regFieldName,g.regFieldUnused text.regFieldValue{fill:grey}\ng.regFieldHidden line.regBitNumLine,g.regFieldHidden line.regBitNumLine_Hide,g.regFieldHidden line.regFieldBox,g.regFieldHidden path.regBitBracket,g.regFieldHidden path.regBitLine,g.regFieldHidden path.regFieldBox,g.regFieldHidden rect.regFieldBox,g.regFieldHidden text.regBitNumEnd,g.regFieldHidden text.regBitNumMiddle,g.regFieldHidden text.regBitNumStart,g.regFieldHidden text.regFieldExtendsLeft,g.regFieldHidden text.regFieldExtendsRight,g.regFieldHidden text.regFieldName,g.regFieldHidden text.regFieldValue{fill:none;stroke:none}\ng text.regFieldValue,g.regFieldInternal text.regFieldName{text-anchor:middle}\ng text.regFieldExtendsRight,g.regFieldOverflowLSB text.regBitNumEnd{text-anchor:start}\ng text.regFieldExtendsLeft,g.regFieldOverflowMSB text.regBitNumStart{text-anchor:end}\ng text.regFieldName,g text.regFieldValue{font-size:11pt;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif}\ng.regFieldExternal1 path.regBitBracket,g.regFieldExternal1 path.regBitLine{stroke:#000;stroke-width:1px}\ng.regFieldExternal0 path.regBitLine{stroke:green;stroke-dasharray:4,2;stroke-width:1px}\ng.regFieldExternal0 path.regBitBracket{stroke:green;stroke-width:1px}\nsvg text.regFieldValue{fill:#0060a9;font-family:monospace}\nsvg.regpict{color:green}\nsvg .svg_error text:not(.regBitWidth):not(.regBitNumMiddle):not(.regBitNumEnd):not(.regBitNumStart){fill:red;font-size:12pt;font-weight:700;font-style:normal;font-family:monospace}\nfigure div.json,figure pre.json{color:#005a9c;display:inherit}\n@media screen{\ng.regLink:focus path.regFieldBox,g.regLink:focus rect.regFieldBox,g.regLink:hover path.regFieldBox,g.regLink:hover rect.regFieldBox{fill:#ffa;stroke:#00f;stroke-width:2.5px}\ng.regLink.regFieldExternal:focus path.regBitBracket,g.regLink.regFieldExternal:hover path.regBitBracket,g.regLink:focus line.regBitNumLine,g.regLink:focus line.regBitNumLine_Hide,g.regLink:focus line.regFieldBox,g.regLink:focus path.regBitLine,g.regLink:focus path.regFieldBox,g.regLink:hover line.regBitNumLine,g.regLink:hover line.regBitNumLine_Hide,g.regLink:hover line.regFieldBox,g.regLink:hover path.regBitLine,g.regLink:hover path.regFieldBox{stroke:#00f}\ng.regLink.regFieldExternal:focus text.regFieldValue,g.regLink.regFieldExternal:hover text.regFieldValue,g.regLink:focus text.regFieldName,g.regLink:hover text.regFieldName{fill:#00f;font-weight:700}\ng.regLink:focus text.regBitNumEnd,g.regLink:focus text.regBitNumMiddle,g.regLink:focus text.regBitNumStart,g.regLink:hover text.regBitNumEnd,g.regLink:hover text.regBitNumMiddle,g.regLink:hover text.regBitNumStart{fill:#00f;font-weight:700;font-size:9pt}\ng.regLink:focus text.regBitWidth,g.regLink:hover text.regBitWidth{fill:#00f}\n}";

  var regpict$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': regpict$1
  });

  var caniuse$1 = ".caniuse-stats{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:baseline;cursor:pointer}\nbutton.caniuse-cell{margin:1px 1px 0 0;border:none}\n.caniuse-browser{position:relative}\n@media print{\n.caniuse-cell.y::before{content:\"✔️\";padding:.5em}\n.caniuse-cell.n::before{content:\"❌\";padding:.5em}\n.caniuse-cell.a::before,.caniuse-cell.d::before,.caniuse-cell.p::before,.caniuse-cell.x::before{content:\"⚠️\";padding:.5em}\n}\n.caniuse-browser ul{display:none;margin:0;padding:0;list-style:none;position:absolute;left:0;z-index:2;background:#fff;margin-top:1px}\n.caniuse-stats a{white-space:nowrap;align-self:center;margin-left:.5em}\n.caniuse-cell{display:flex;color:rgba(0,0,0,.8);font-size:90%;height:.8cm;margin-right:1px;margin-top:0;min-width:3cm;overflow:visible;justify-content:center;align-items:center}\nli.caniuse-cell{margin-bottom:1px}\n.caniuse-cell:focus{outline:0}\n.caniuse-cell:hover{color:#000}\n.caniuse-cell.y{background:#8bc34a}\n.caniuse-cell.n{background:#e53935}\n.caniuse-cell.a,.caniuse-cell.d,.caniuse-cell.p,.caniuse-cell.x{background:#ffc107}\n.caniuse-stats .caniuse-browser:hover>ul,.caniuse-stats button:focus+ul{display:block}";

  var caniuse$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': caniuse$1
  });

  var mdnAnnotation$1 = ".mdn{font-size:.75em;position:absolute;right:.3em;min-width:0;margin-top:3em}\n.mdn details{width:100%;margin:1px 0;position:relative;z-index:10;box-sizing:border-box;padding:.4em;padding-top:0}\n.mdn details[open]{min-width:25ch;max-width:32ch;background:#fff;box-shadow:0 1em 3em -.4em rgba(0,0,0,.3),0 0 1px 1px rgba(0,0,0,.05);border-radius:2px;z-index:11;margin-bottom:.4em}\n.mdn summary{text-align:right;cursor:default;margin-right:-.4em}\n.mdn summary span{font-family:zillaslab,Palatino,\"Palatino Linotype\",serif;color:#fff;background-color:#000;display:inline-block;padding:3px}\n.mdn a{display:inline-block;word-break:break-all}\n.mdn p{margin:0}\n.mdn .engines-all{color:#058b00}\n.mdn .engines-some{color:#b00}\n.mdn table{width:100%;font-size:.9em}\n.mdn td{border:none}\n.mdn td:nth-child(2){text-align:right}\n.mdn .nosupportdata{font-style:italic;margin:0}\n.mdn tr::before{content:\"\";display:table-cell;width:1.5em;height:1.5em;background:no-repeat center center/contain;font-size:.75em}\n.mdn .no,.mdn .unknown{color:#ccc;filter:grayscale(100%)}\n.mdn .no::before,.mdn .unknown::before{opacity:.5}\n.mdn .chrome::before,.mdn .chrome_android::before{background-image:url(https://resources.whatwg.org/browser-logos/chrome.svg)}\n.mdn .edge::before,.mdn .edge_mobile::before{background-image:url(https://resources.whatwg.org/browser-logos/edge.svg)}\n.mdn .firefox::before,.mdn .firefox_android::before{background-image:url(https://resources.whatwg.org/browser-logos/firefox.png)}\n.mdn .ie::before{background-image:url(https://resources.whatwg.org/browser-logos/ie.png)}\n.mdn .opera::before,.mdn .opera_android::before{background-image:url(https://resources.whatwg.org/browser-logos/opera.svg)}\n.mdn .safari::before{background-image:url(https://resources.whatwg.org/browser-logos/safari.png)}\n.mdn .safari_ios::before{background-image:url(https://resources.whatwg.org/browser-logos/safari-ios.svg)}\n.mdn .samsunginternet_android::before{background-image:url(https://resources.whatwg.org/browser-logos/samsung.svg)}\n.mdn .webview_android::before{background-image:url(https://resources.whatwg.org/browser-logos/android-webview.png)}";

  var mdnAnnotation$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': mdnAnnotation$1
  });

  var dfnPanel$1 = "dfn{cursor:pointer}\n.dfn-panel{position:absolute;z-index:35;min-width:300px;max-width:500px;padding:.5em .75em;margin-top:.6em;font:small Helvetica Neue,sans-serif,Droid Sans Fallback;background:#fff;color:#000;box-shadow:0 1em 3em -.4em rgba(0,0,0,.3),0 0 1px 1px rgba(0,0,0,.05);border-radius:2px}\n.dfn-panel:not(.docked)>.caret{position:absolute;top:-9px}\n.dfn-panel:not(.docked)>.caret::after,.dfn-panel:not(.docked)>.caret::before{content:\"\";position:absolute;border:10px solid transparent;border-top:0;border-bottom:10px solid #fff;top:0}\n.dfn-panel:not(.docked)>.caret::before{border-bottom:9px solid #a2a9b1}\n.dfn-panel *{margin:0}\n.dfn-panel b{display:block;color:#000;margin-top:.25em}\n.dfn-panel ul a[href]{color:#333}\n.dfn-panel a.self-link{font-weight:700}\n.dfn-panel .dfn-exported{float:right;padding:.1em;border-radius:.2em;text-align:center;white-space:nowrap;font-size:90%;background:#d1edfd;color:#040b1c;box-shadow:0 0 0 .125em #1ca5f940}\n.dfn-panel a:not(:hover){text-decoration:none!important;border-bottom:none!important}\n.dfn-panel a[href]:hover{border-bottom-width:1px}\n.dfn-panel ul{padding:0}\n.dfn-panel li{margin-left:1em}\n.dfn-panel.docked{position:fixed;left:.5em;top:unset;bottom:2em;margin:0 auto;max-width:calc(100vw - .75em * 2 - .5em - .2em * 2);max-height:30vh;overflow:auto}";

  var dfnPanel$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': dfnPanel$1
  });

  var dfnPanel_runtime = "(() => {\n// @ts-check\nif (document.respecIsReady) {\n  document.respecIsReady.then(dfnPanel);\n} else {\n  dfnPanel();\n}\n\nfunction dfnPanel() {\n  /** @type {HTMLElement} */\n  let panel;\n  document.body.addEventListener(\"click\", event => {\n    if (!(event.target instanceof HTMLElement)) return;\n\n    /** @type {HTMLElement} */\n    const el = event.target;\n\n    const action = deriveAction(el);\n    switch (action) {\n      case \"show\": {\n        if (panel) hidePanel(panel);\n        /** @type {HTMLElement} */\n        const dfn = el.closest(\"dfn, .index-term\");\n        panel = document.getElementById(`dfn-panel-for-${dfn.id}`);\n        displayPanel(dfn, panel, { x: event.clientX, y: event.clientY });\n        break;\n      }\n      case \"dock\": {\n        panel.style.left = null;\n        panel.style.top = null;\n        panel.classList.add(\"docked\");\n        break;\n      }\n      case \"hide\": {\n        hidePanel(panel);\n        break;\n      }\n    }\n  });\n}\n\n/** @param {HTMLElement} clickTarget */\nfunction deriveAction(clickTarget) {\n  const hitALink = !!clickTarget.closest(\"a\");\n  if (clickTarget.closest(\"dfn, .index-term\")) {\n    return hitALink ? null : \"show\";\n  }\n  if (clickTarget.closest(\".dfn-panel\")) {\n    if (hitALink) {\n      const clickedSelfLink = clickTarget.classList.contains(\"self-link\");\n      return clickedSelfLink ? \"hide\" : \"dock\";\n    }\n    const panel = clickTarget.closest(\".dfn-panel\");\n    return panel.classList.contains(\"docked\") ? \"hide\" : null;\n  }\n  if (document.querySelector(\".dfn-panel:not([hidden])\")) {\n    return \"hide\";\n  }\n  return null;\n}\n\n/**\n * @param {HTMLElement} dfn\n * @param {HTMLElement} panel\n * @param {{ x: number, y: number }} clickPosition\n */\nfunction displayPanel(dfn, panel, { x, y }) {\n  panel.hidden = false;\n  // distance (px) between edge of panel and the pointing triangle (caret)\n  const MARGIN = 20;\n\n  const dfnRects = dfn.getClientRects();\n  // Find the `top` offset when the `dfn` can be spread across multiple lines\n  let closestTop = 0;\n  let minDiff = Infinity;\n  for (const rect of dfnRects) {\n    const { top, bottom } = rect;\n    const diffFromClickY = Math.abs((top + bottom) / 2 - y);\n    if (diffFromClickY < minDiff) {\n      minDiff = diffFromClickY;\n      closestTop = top;\n    }\n  }\n\n  const top = window.scrollY + closestTop + dfnRects[0].height;\n  const left = x - MARGIN;\n  panel.style.left = `${left}px`;\n  panel.style.top = `${top}px`;\n\n  // Find if the panel is flowing out of the window\n  const panelRect = panel.getBoundingClientRect();\n  const SCREEN_WIDTH = Math.min(window.innerWidth, window.screen.width);\n  if (panelRect.right > SCREEN_WIDTH) {\n    const newLeft = Math.max(MARGIN, x + MARGIN - panelRect.width);\n    const newCaretOffset = left - newLeft;\n    panel.style.left = `${newLeft}px`;\n    /** @type {HTMLElement} */\n    const caret = panel.querySelector(\".caret\");\n    caret.style.left = `${newCaretOffset}px`;\n  }\n}\n\n/** @param {HTMLElement} panel */\nfunction hidePanel(panel) {\n  panel.hidden = true;\n  panel.classList.remove(\"docked\");\n}\n})()";

  var dfnPanel_runtime$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': dfnPanel_runtime
  });

  var datatype = "var{position:relative;cursor:pointer}\nvar[data-type]::after,var[data-type]::before{position:absolute;left:50%;top:-6px;opacity:0;transition:opacity .4s;pointer-events:none}\nvar[data-type]::before{content:\"\";transform:translateX(-50%);border-width:4px 6px 0 6px;border-style:solid;border-color:transparent;border-top-color:#000}\nvar[data-type]::after{content:attr(data-type);transform:translateX(-50%) translateY(-100%);background:#000;text-align:center;font-family:\"Dank Mono\",\"Fira Code\",monospace;font-style:normal;padding:6px;border-radius:3px;color:#daca88;text-indent:0;font-weight:400}\nvar[data-type]:hover::after,var[data-type]:hover::before{opacity:1}";

  var datatype$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': datatype
  });

  var algorithms$1 = ".assert{background:#eee;border-left:.5em solid #aaa;padding:.3em}";

  var algorithms$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': algorithms$1
  });

  var railroad$1 = "svg{background-color:#f4f2ef}\nsvg path{stroke-width:3;stroke:#000;fill:transparent}\nsvg text{text-anchor:middle;white-space:pre}\nsvg text.diagram-text{font-size:12px}\nsvg text.diagram-arrow{font-size:16px}\nsvg text.label{text-anchor:start}\nsvg text.comment{font:italic 12px monospace}\nsvg rect{stroke-width:3;stroke:#000;fill:#ccfecc}\nsvg rect.group-box{stroke:gray;stroke-dasharray:10,5;fill:none}\nsvg path.diagram-text{stroke-width:3;stroke:#000;fill:#fff;cursor:help}\nsvg g.diagram-text:hover path.diagram-text{fill:#eee}\nfigure.railroad pre{display:none}\nfigure.railroad pre.debug,figure.railroad.debug pre{display:inherit}";

  var railroad$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': railroad$1
  });

}());
//# sourceMappingURL=respec-pcisig.js.map
