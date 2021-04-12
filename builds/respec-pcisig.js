window.respecVersion = "26.2.0";

(function () {
  'use strict';

  // In case everything else fails, we want the error
  window.addEventListener("error", ev => {
    console.error(ev.error, ev.message, ev);
  });

  const modules = [
    // order is significant
    Promise.resolve().then(function () { return baseRunner; }),
    Promise.resolve().then(function () { return ui$3; }),
    Promise.resolve().then(function () { return locationHash; }),
    Promise.resolve().then(function () { return l10n$k; }),
    Promise.resolve().then(function () { return pcisigDefaults$1; }),
    Promise.resolve().then(function () { return style; }),
    Promise.resolve().then(function () { return pcisigStyle; }),
    Promise.resolve().then(function () { return l10n$h; }),
    // import("../src/core/github.js"),
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
    Promise.resolve().then(function () { return drawCsrs; }),
    Promise.resolve().then(function () { return regpict$2; }),
    Promise.resolve().then(function () { return dfn; }),
    Promise.resolve().then(function () { return pluralize; }),
    Promise.resolve().then(function () { return examples$2; }),
    Promise.resolve().then(function () { return issuesNotes$2; }),
    Promise.resolve().then(function () { return bestPractices; }),
    Promise.resolve().then(function () { return mathmlPolyfill; }),
    Promise.resolve().then(function () { return figures; }),
    Promise.resolve().then(function () { return equations; }),
    Promise.resolve().then(function () { return tables; }),
    Promise.resolve().then(function () { return webidl$2; }),
    // import("../src/core/biblio.js"),
    Promise.resolve().then(function () { return linkToDfn; }),
    Promise.resolve().then(function () { return xref; }),
    Promise.resolve().then(function () { return dataCite; }),
    Promise.resolve().then(function () { return webidlIndex; }),
    // import("../src/core/render-biblio.js"),
    Promise.resolve().then(function () { return dfnIndex$2; }),
    Promise.resolve().then(function () { return contrib; }),
    Promise.resolve().then(function () { return fixHeaders; }),
    Promise.resolve().then(function () { return structure; }),
    // must run after structure, equations, figures, and tables
    Promise.resolve().then(function () { return figTblEqnNumbering; }),
    Promise.resolve().then(function () { return informative; }),
    Promise.resolve().then(function () { return idHeaders; }),
    Promise.resolve().then(function () { return caniuse$2; }),
    Promise.resolve().then(function () { return mdnAnnotation$2; }),
    Promise.resolve().then(function () { return saveHtml; }),
    // import("../src/ui/search-specref.js"),
    // import("../src/ui/search-xref.js"),
    Promise.resolve().then(function () { return aboutRespec; }),
    Promise.resolve().then(function () { return seo; }),
    // import("../src/w3c/seo.js"),
    // import("../src/core/highlight.js"),
    Promise.resolve().then(function () { return webidlClipboard; }),
    Promise.resolve().then(function () { return dataTests; }),
    Promise.resolve().then(function () { return listSorter; }),
    // import("../src/core/highlight-vars.js"),
    Promise.resolve().then(function () { return dfnPanel$2; }),
    Promise.resolve().then(function () { return dataType; }),
    Promise.resolve().then(function () { return algorithms$2; }),
    Promise.resolve().then(function () { return anchorExpander; }),
    Promise.resolve().then(function () { return includeFinalConfig; }),
    Promise.resolve().then(function () { return index; }),
    Promise.resolve().then(function () { return railroad$2; }),
    /* Linters must be the last thing to run */
    Promise.resolve().then(function () { return linter$1; }),
    Promise.resolve().then(function () { return a11y; }),
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
   * Module core/l10n
   *
   * Looks at the lang attribute on the root element and uses it
   * to manage the config.l10n object so that other parts of the system can
   * localize their text.
   */

  const name$1a = "core/l10n";

  const html$1 = document.documentElement;
  if (html$1 && !html$1.hasAttribute("lang")) {
    html$1.lang = "en";
    if (!html$1.hasAttribute("dir")) {
      html$1.dir = "ltr";
    }
  }

  const l10n$j = {};

  const lang$b = html$1.lang;

  function run$V(config) {
    config.l10n = l10n$j[lang$b] || l10n$j.en;
  }

  var l10n$k = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$1a,
    l10n: l10n$j,
    lang: lang$b,
    run: run$V
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
          // Must reject if op rejects.
          // If it's a write operation, must reject if tx.done rejects.
          // Must reject with op rejection first.
          // Must resolve with op value.
          // Must handle both promises (no unhandled rejections)
          return (await Promise.all([
              target[targetFuncName](...args),
              isWrite && tx.done,
          ]))[0];
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
   * @param {string} text
   */
  function lastLine(text) {
    const splitted = text.split("\n");
    return splitted[splitted.length - 1];
  }

  function appendIfExist(base, target) {
    let result = base;
    if (target) {
      result += ` ${target}`;
    }
    return result;
  }

  function contextAsText(node) {
    const hierarchy = [node];
    while (node && node.parent) {
      const { parent } = node;
      hierarchy.unshift(parent);
      node = parent;
    }
    return hierarchy.map(n => appendIfExist(n.type, n.name)).join(" -> ");
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
    const grammaticalContext = (current && current.name) ? `, ${contextType} \`${current.partial ? "partial " : ""}${contextAsText(current)}\`` : "";
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

  class Base$1 {
    /**
     * @param {object} initializer
     * @param {Base["source"]} initializer.source
     * @param {Base["tokens"]} initializer.tokens
     */
    constructor({ source, tokens }) {
      Object.defineProperties(this, {
        source: { value: source },
        tokens: { value: tokens, writable: true },
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
    // Set cached result to indeterminate to short-circuit circular definitions.
    // The final result will be updated to true or false.
    defs.cache.dictionaryIncludesRequiredField.set(dict, undefined);
    let result = dict.members.some(field => field.required);
    if (!result && dict.inheritance) {
      const superdict = defs.unique.get(dict.inheritance);
      if (!superdict) {
        // Assume required members in the supertype if it is unknown.
        result = true;
      } else if (dictionaryIncludesRequiredField(superdict, defs)) {
        result = true;
      }
    }
    defs.cache.dictionaryIncludesRequiredField.set(dict, result);
    return result;
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

  class Token extends Base$1 {
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
      return unescape$2(this.tokens.value.value);
    }
  }

  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {string} tokenName
   */
  function tokens(tokeniser, tokenName) {
    return list(tokeniser, {
      parser: Token.parser(tokeniser, tokenName),
      listName: tokenName + " list"
    });
  }

  const extAttrValueSyntax = ["identifier", "decimal", "integer", "string"];

  const shouldBeLegacyPrefixed = [
    "NoInterfaceObject",
    "LenientSetter",
    "LenientThis",
    "TreatNonObjectAsNull",
    "Unforgeable",
  ];

  const renamedLegacies = new Map([
    ...shouldBeLegacyPrefixed.map(name => [name, `Legacy${name}`]),
    ["NamedConstructor", "LegacyFactoryFunction"],
    ["OverrideBuiltins", "LegacyOverrideBuiltIns"],
    ["TreatNullAs", "LegacyNullToEmptyString"],
  ]);

  /**
   * This will allow a set of extended attribute values to be parsed.
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  function extAttrListItems(tokeniser) {
    for (const syntax of extAttrValueSyntax) {
      const toks = tokens(tokeniser, syntax);
      if (toks.length) {
        return toks;
      }
    }
    tokeniser.error(`Expected identifiers, strings, decimals, or integers but none found`);
  }


  class ExtendedAttributeParameters extends Base$1 {
    /**
     * @param {import("../tokeniser").Tokeniser} tokeniser
     */
    static parse(tokeniser) {
      const tokens = { assign: tokeniser.consume("=") };
      const ret = autoParenter(new ExtendedAttributeParameters({ source: tokeniser.source, tokens }));
      if (tokens.assign) {
        tokens.secondaryName = tokeniser.consume(...extAttrValueSyntax);
      }
      tokens.open = tokeniser.consume("(");
      if (tokens.open) {
        ret.list = ret.rhsIsList ?
          // [Exposed=(Window,Worker)]
          extAttrListItems(tokeniser) :
          // [LegacyFactoryFunction=Audio(DOMString src)] or [Constructor(DOMString str)]
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

  class SimpleExtendedAttribute extends Base$1 {
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
      const value = this.params.rhsIsList ? list : unescape$2(tokens.secondaryName.value);
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
      const { name } = this;
      if (name === "LegacyNoInterfaceObject") {
        const message = `\`[LegacyNoInterfaceObject]\` extended attribute is an \
undesirable feature that may be removed from Web IDL in the future. Refer to the \
[relevant upstream PR](https://github.com/heycam/webidl/pull/609) for more \
information.`;
        yield validationError(this.tokens.name, this, "no-nointerfaceobject", message, { level: "warning" });
      } else if (renamedLegacies.has(name)) {
        const message = `\`[${name}]\` extended attribute is a legacy feature \
that is now renamed to \`[${renamedLegacies.get(name)}]\`. Refer to the \
[relevant upstream PR](https://github.com/heycam/webidl/pull/870) for more \
information.`;
        yield validationError(this.tokens.name, this, "renamed-legacy", message, {
          level: "warning",
          autofix: renameLegacyExtendedAttribute(this)
        });
      }
      for (const arg of this.arguments) {
        yield* arg.validate(defs);
      }
    }
  }

  /**
   * @param {SimpleExtendedAttribute} extAttr
   */
  function renameLegacyExtendedAttribute(extAttr) {
    return () => {
      const { name } = extAttr;
      extAttr.tokens.name.value = renamedLegacies.get(name);
      if (name === "TreatNullAs") {
        extAttr.params.tokens = {};
      }
    };
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

  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   * @param {string} typeName
   */
  function generic_type(tokeniser, typeName) {
    const base = tokeniser.consume("FrozenArray", "ObservableArray", "Promise", "sequence", "record");
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
      case "FrozenArray":
      case "ObservableArray": {
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

  class Type extends Base$1 {
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
      this.extAttrs = new ExtendedAttributes({});
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
      return unescape$2(name);
    }

    *validate(defs) {
      yield* this.extAttrs.validate(defs);

      if (this.idlType === "void") {
        const message = `\`void\` is now replaced by \`undefined\`. Refer to the \
[relevant GitHub issue](https://github.com/heycam/webidl/issues/60) \
for more information.`;
        yield validationError(this.tokens.base, this, "replace-void", message, {
          autofix: replaceVoid(this)
        });
      }

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
          const message = "Nullable union cannot include a dictionary type.";
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

  /**
   * @param {Type} type
   */
  function replaceVoid(type) {
    return () => {
      type.tokens.base.value = "undefined";
    };
  }

  class Default extends Base$1 {
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

  class Argument extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
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

  class Operation extends Base$1 {
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
      return unescape$2(name.value);
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

  class Attribute extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }

    *validate(defs) {
      yield* this.extAttrs.validate(defs);
      yield* this.idlType.validate(defs);
    }
  }

  /**
   * @param {string} identifier
   */
  function unescape$2(identifier) {
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
    const base = tokeniser.consume("bigint", "boolean", "byte", "octet", "undefined");
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
    "ObservableArray",
    "Promise",
    "bigint",
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
    "undefined",
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

  const reserved$1 = [
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
            if (reserved$1.includes(token.value)) {
              const message = `${unescape$2(token.value)} is a reserved identifier and must not be used.`;
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

  class Enum extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }
  }

  // @ts-check

  class Includes extends Base$1 {
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
      return unescape$2(this.tokens.target.value);
    }
    get includes() {
      return unescape$2(this.tokens.mixin.value);
    }
  }

  class Typedef extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }

    *validate(defs) {
      yield* this.idlType.validate(defs);
    }
  }

  class CallbackFunction extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }

    *validate(defs) {
      yield* this.extAttrs.validate(defs);
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

  class Container$1 extends Base$1 {
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
        return unescape$2(this.tokens.name.value);
      }
      get inheritance() {
        if (!this.tokens.inheritance) {
          return null;
        }
        return unescape$2(this.tokens.inheritance.value);
      }

      *validate(defs) {
        for (const member of this.members) {
          if (member.validate) {
            yield* member.validate(defs);
          }
        }
      }
    }

  class Constant extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }
    get value() {
      return const_data(this.tokens.value);
    }
  }

  class IterableLike extends Base$1 {
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
      const secondTypeRequired = type === "maplike";
      const secondTypeAllowed = secondTypeRequired || type === "iterable";
      const argumentAllowed = ret.async && type === "iterable";

      tokens.open = tokeniser.consume("<") || tokeniser.error(`Missing less-than sign \`<\` in ${type} declaration`);
      const first = type_with_extended_attributes(tokeniser) || tokeniser.error(`Missing a type argument in ${type} declaration`);
      ret.idlType = [first];
      ret.arguments = [];

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

      if (tokeniser.probe("(")) {
        if (argumentAllowed) {
          tokens.argsOpen = tokeniser.consume("(");
          ret.arguments.push(...argument_list(tokeniser));
          tokens.argsClose = tokeniser.consume(")") || tokeniser.error("Unterminated async iterable argument list");
        } else {
          tokeniser.error(`Arguments are only allowed for \`async iterable\``);
        }
      }

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

    *validate(defs) {
      for (const type of this.idlType) {
        yield* type.validate(defs);
      }
      for (const argument of this.arguments) {
        yield* argument.validate(defs);
      }
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

  class Constructor extends Base$1 {
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

  class Interface extends Container$1 {
    /**
     * @param {import("../tokeniser").Tokeniser} tokeniser
     */
    static parse(tokeniser, base, { partial = null } = {}) {
      const tokens = { partial, base };
      return Container$1.parse(tokeniser, new Interface({ source: tokeniser.source, tokens }), {
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
        this.extAttrs.every(extAttr => extAttr.name !== "Exposed")
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
        const factoryFunctions = this.extAttrs.filter(extAttr => extAttr.name === "LegacyFactoryFunction");
        for (const named of factoryFunctions) {
          const message = `Interfaces marked as \`[Global]\` cannot have factory functions.`;
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
      constructorOp.extAttrs = new ExtendedAttributes({});
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

  class Mixin extends Container$1 {
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
      return Container$1.parse(tokeniser, new Mixin({ source: tokeniser.source, tokens }), {
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

  class Field extends Base$1 {
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
      return unescape$2(this.tokens.name.value);
    }
    get required() {
      return !!this.tokens.required;
    }

    *validate(defs) {
      yield* this.idlType.validate(defs);
    }
  }

  // @ts-check

  class Dictionary extends Container$1 {
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
      return Container$1.parse(tokeniser, new Dictionary({ source: tokeniser.source, tokens }), {
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

  class Namespace extends Container$1 {
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
      return Container$1.parse(tokeniser, new Namespace({ source: tokeniser.source, tokens }), {
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

  class CallbackInterface extends Container$1 {
    /**
     * @param {import("../tokeniser").Tokeniser} tokeniser
     */
    static parse(tokeniser, callback, { partial = null } = {}) {
      const tokens = { callback };
      tokens.base = tokeniser.consume("interface");
      if (!tokens.base) {
        return;
      }
      return Container$1.parse(tokeniser, new CallbackInterface({ source: tokeniser.source, tokens }), {
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

  function noop$1(arg) {
    return arg;
  }

  const templates$1 = {
    wrap: items => items.join(""),
    trivia: noop$1,
    name: noop$1,
    reference: noop$1,
    type: noop$1,
    generic: noop$1,
    nameless: noop$1,
    inheritance: noop$1,
    definition: noop$1,
    extendedAttribute: noop$1,
    extendedAttributeReference: noop$1
  };

  function write(ast, { templates: ts = templates$1 } = {}) {
    ts = Object.assign({}, templates$1, ts);

    function reference(raw, { unescaped, context }) {
      if (!unescaped) {
        unescaped = raw.startsWith("_") ? raw.slice(1) : raw;
      }
      return ts.reference(raw, unescaped, context);
    }

    function token(t, wrapper = noop$1, ...args) {
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
    function extended_attribute_listitem(str) {
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
              rhsType && rhsType.endsWith("-list") ? extended_attribute_listitem :
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
        token(it.tokens.argsOpen),
        ts.wrap(it.arguments.map(argument)),
        token(it.tokens.argsClose),
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
  function flatten(array) {
    if (array.flat) {
      return array.flat();
    }
    return [].concat(...array);
  }

  /**
   * @param {*} ast AST or array of ASTs
   */
  function validate(ast) {
    return [...validateIterable(flatten(ast))];
  }

  var _webidl2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parse: parse,
    write: write,
    validate: validate,
    WebIDLParseError: WebIDLParseError
  });

  /**
   * marked - a markdown parser
   * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/markedjs/marked
   */

  /**
   * DO NOT EDIT THIS FILE
   * The code in this file is generated from files in ./src/
   */

  function createCommonjsModule$1(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var defaults = createCommonjsModule$1(function (module) {
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

  // copied from https://stackoverflow.com/a/5450113/806777
  function repeatString(pattern, count) {
    if (count < 1) {
      return '';
    }
    let result = '';
    while (count > 1) {
      if (count & 1) {
        result += pattern;
      }
      count >>= 1;
      pattern += pattern;
    }
    return result + pattern;
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
    checkSanitizeDeprecation,
    repeatString
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

    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(/^ {1,4}/gm, '');
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
        let text = cap[2].trim();

        // remove trailing #s
        if (/#$/.test(text)) {
          const trimmed = rtrim$1(text, '#');
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            // CommonMark requires space before trailing #s
            text = trimmed.trim();
          }
        }

        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text: text
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
          bcurr,
          bnext,
          addBack,
          loose,
          istask,
          ischecked,
          endMatch;

        let l = itemMatch.length;
        bcurr = this.rules.block.listItemStart.exec(itemMatch[0]);
        for (let i = 0; i < l; i++) {
          item = itemMatch[i];
          raw = item;

          if (!this.options.pedantic) {
            // Determine if current item contains the end of the list
            endMatch = item.match(new RegExp('\\n\\s*\\n {0,' + (bcurr[0].length - 1) + '}\\S'));
            if (endMatch) {
              addBack = item.length - endMatch.index + itemMatch.slice(i + 1).join('\n').length;
              list.raw = list.raw.substring(0, list.raw.length - addBack);

              item = item.substring(0, endMatch.index);
              raw = item;
              l = i + 1;
            }
          }

          // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.
          if (i !== l - 1) {
            bnext = this.rules.block.listItemStart.exec(itemMatch[i + 1]);
            if (
              !this.options.pedantic
                ? bnext[1].length >= bcurr[0].length || bnext[1].length > 3
                : bnext[1].length > bcurr[1].length
            ) {
              // nested list or continuation
              itemMatch.splice(i, 2, itemMatch[i] + (!this.options.pedantic && bnext[1].length < bcurr[0].length && !itemMatch[i].match(/\n$/) ? '' : '\n') + itemMatch[i + 1]);
              i--;
              l--;
              continue;
            } else if (
              // different bullet style
              !this.options.pedantic || this.options.smartLists
                ? bnext[2][bnext[2].length - 1] !== bull[bull.length - 1]
                : isordered === (bnext[2].length === 1)
            ) {
              addBack = itemMatch.slice(i + 1).join('\n').length;
              list.raw = list.raw.substring(0, list.raw.length - addBack);
              i = l - 1;
            }
            bcurr = bnext;
          }

          // Remove the list item's bullet
          // so it is seen as the next token.
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+[.)]) ?/, '');

          // Outdent whatever the
          // list item contains. Hacky.
          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic
              ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
              : item.replace(/^ {1,4}/gm, '');
          }

          // trim item newlines at end
          item = rtrim$1(item, '\n');
          if (i !== l - 1) {
            raw = raw + '\n';
          }

          // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.
          loose = next || /\n\n(?!\s*$)/.test(raw);
          if (i !== l - 1) {
            next = raw.slice(-2) === '\n\n';
            if (!loose) loose = next;
          }

          if (loose) {
            list.loose = true;
          }

          // Check for task list items
          if (this.options.gfm) {
            istask = /^\[[ xX]\] /.test(item);
            ischecked = undefined;
            if (istask) {
              ischecked = item[1] !== ' ';
              item = item.replace(/^\[[ xX]\] +/, '');
            }
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

    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
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
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && /^</.test(trimmedUrl)) {
          // commonmark requires matching angle brackets
          if (!(/>$/.test(trimmedUrl))) {
            return;
          }

          // ending angle bracket cannot be escaped
          const rtrimSlash = rtrim$1(trimmedUrl.slice(0, -1), '\\');
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          // find closing parenthesis
          const lastParenIndex = findClosingBracket$1(cap[2], '()');
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf('!') === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = '';
          }
        }
        let href = cap[2];
        let title = '';
        if (this.options.pedantic) {
          // split pedantic href and title
          const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : '';
        }

        href = href.trim();
        if (/^</.test(href)) {
          if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
            // pedantic allows starting angle bracket without ending angle bracket
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
          title: title ? title.replace(this.rules.inline._escapes, '$1') : title
        }, cap[0]);
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
        return outputLink(cap, link, cap[0]);
      }
    }

    emStrong(src, maskedSrc, prevChar = '') {
      let match = this.rules.inline.emStrong.lDelim.exec(src);
      if (!match) return;

      if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return; // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well

      const nextChar = match[1] || match[2] || '';

      if (!nextChar || (nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
        const lLength = match[0].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;

        const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        endReg.lastIndex = 0;

        maskedSrc = maskedSrc.slice(-1 * src.length + lLength); // Bump maskedSrc to same section of string as src (move to lexer?)

        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];

          if (!rDelim) continue; // matched the first alternative in rules.js (skip the * in __abc*abc__)

          rLength = rDelim.length;

          if (match[3] || match[4]) { // found another Left Delim
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) { // either Left or Right Delim
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue; // CommonMark Emphasis Rules 9-10
            }
          }

          delimTotal -= rLength;

          if (delimTotal > 0) continue; // Haven't found enough closing delimiters

          // If this is the last rDelimiter, remove extra characters. *a*** -> *a*
          if (delimTotal + midDelimTotal - rLength <= 0 && !maskedSrc.slice(endReg.lastIndex).match(endReg)) {
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          }

          if (Math.min(lLength, rLength) % 2) {
            return {
              type: 'em',
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text: src.slice(1, lLength + match.index + rLength)
            };
          }
          if (Math.min(lLength, rLength) % 2 === 0) {
            return {
              type: 'strong',
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text: src.slice(2, lLength + match.index + rLength - 1)
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
        const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
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
          text: cap[2]
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
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
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
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
  };

  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit$1(block.def)
    .replace('label', block._label)
    .replace('title', block._title)
    .getRegex();

  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/;
  block.item = edit$1(block.item, 'gm')
    .replace(/bull/g, block.bullet)
    .getRegex();

  block.listItemStart = edit$1(/^( *)(bull) */)
    .replace('bull', block.bullet)
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
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
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
    emStrong: {
      lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
      //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
      //        () Skip other delimiter (1) #***                (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
      rDelimAst: /\_\_[^_]*?\*[^_]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
      rDelimUnd: /\*\*[^*]*?\_[^*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest$1,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/
  };

  // list of punctuation marks from CommonMark spec
  // without * and _ to handle the different emphasis markers * and _
  inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
  inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

  // sequences em should skip over [title](link), `code`, <html>
  inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
  inline.escapedEmSt = /\\\*|\\_/g;

  inline._comment = edit$1(block._comment).replace('(?:-->|$)', '-->').getRegex();

  inline.emStrong.lDelim = edit$1(inline.emStrong.lDelim)
    .replace(/punct/g, inline._punctuation)
    .getRegex();

  inline.emStrong.rDelimAst = edit$1(inline.emStrong.rDelimAst, 'g')
    .replace(/punct/g, inline._punctuation)
    .getRegex();

  inline.emStrong.rDelimUnd = edit$1(inline.emStrong.rDelimUnd, 'g')
    .replace(/punct/g, inline._punctuation)
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
  inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
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
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
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
  const { repeatString: repeatString$1 } = helpers;

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
      if (this.options.pedantic) {
        src = src.replace(/^ +$/gm, '');
      }
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
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          // An indented code block cannot interrupt a paragraph.
          if (lastToken && lastToken.type === 'paragraph') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          } else {
            tokens.push(token);
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
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += '\n' + token.raw;
            lastToken.text += '\n' + token.text;
          } else {
            tokens.push(token);
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
    inlineTokens(src, tokens = [], inLink = false, inRawBlock = false) {
      let token, lastToken;

      // String with links masked to avoid interference with em and strong
      let maskedSrc = src;
      let match;
      let keepPrevChar, prevChar;

      // Mask out reflinks
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      // Mask out other blocks
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }

      // Mask out escaped em & strong delimiters
      while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      }

      while (src) {
        if (!keepPrevChar) {
          prevChar = '';
        }
        keepPrevChar = false;

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
          const lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
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
          const lastToken = tokens[tokens.length - 1];
          if (token.type === 'link') {
            token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            tokens.push(token);
          } else if (lastToken && token.type === 'text' && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }

        // em & strong
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
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
          if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === 'text') {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
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

      code = code.replace(/\n$/, '') + '\n';

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
  function marked$1(src, opt, callback) {
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

    opt = merge$2({}, marked$1.defaults, opt || {});
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
      marked$1.walkTokens(tokens, function(token) {
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
        marked$1.walkTokens(tokens, opt.walkTokens);
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

  marked$1.options =
  marked$1.setOptions = function(opt) {
    merge$2(marked$1.defaults, opt);
    changeDefaults(marked$1.defaults);
    return marked$1;
  };

  marked$1.getDefaults = getDefaults;

  marked$1.defaults = defaults$5;

  /**
   * Use Extension
   */

  marked$1.use = function(extension) {
    const opts = merge$2({}, extension);
    if (extension.renderer) {
      const renderer = marked$1.defaults.renderer || new Renderer_1();
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
      const tokenizer = marked$1.defaults.tokenizer || new Tokenizer_1();
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
      const walkTokens = marked$1.defaults.walkTokens;
      opts.walkTokens = (token) => {
        extension.walkTokens(token);
        if (walkTokens) {
          walkTokens(token);
        }
      };
    }
    marked$1.setOptions(opts);
  };

  /**
   * Run callback for every token
   */

  marked$1.walkTokens = function(tokens, callback) {
    for (const token of tokens) {
      callback(token);
      switch (token.type) {
        case 'table': {
          for (const cell of token.tokens.header) {
            marked$1.walkTokens(cell, callback);
          }
          for (const row of token.tokens.cells) {
            for (const cell of row) {
              marked$1.walkTokens(cell, callback);
            }
          }
          break;
        }
        case 'list': {
          marked$1.walkTokens(token.items, callback);
          break;
        }
        default: {
          if (token.tokens) {
            marked$1.walkTokens(token.tokens, callback);
          }
        }
      }
    }
  };

  /**
   * Parse Inline
   */
  marked$1.parseInline = function(src, opt) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked.parseInline(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked.parseInline(): input parameter is of type '
        + Object.prototype.toString.call(src) + ', string expected');
    }

    opt = merge$2({}, marked$1.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);

    try {
      const tokens = Lexer_1.lexInline(src, opt);
      if (opt.walkTokens) {
        marked$1.walkTokens(tokens, opt.walkTokens);
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

  marked$1.Parser = Parser_1;
  marked$1.parser = Parser_1.parse;

  marked$1.Renderer = Renderer_1;
  marked$1.TextRenderer = TextRenderer_1;

  marked$1.Lexer = Lexer_1;
  marked$1.lexer = Lexer_1.lex;

  marked$1.Tokenizer = Tokenizer_1;

  marked$1.Slugger = Slugger_1;

  marked$1.parse = marked$1;

  var marked_1 = marked$1;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var pluralize$2 = createCommonjsModule(function (module, exports) {
  (function (root, pluralize) {
    if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
      module.exports = pluralize();
    } else {
      root.pluralize = pluralize();
    }
  })(commonjsGlobal, function () {
    var pluralRules = [];
    var singularRules = [];
    var uncountables = {};
    var irregularPlurals = {};
    var irregularSingles = {};
    function sanitizeRule (rule) {
      if (typeof rule === 'string') {
        return new RegExp('^' + rule + '$', 'i');
      }
      return rule;
    }
    function restoreCase (word, token) {
      if (word === token) return token;
      if (word === word.toLowerCase()) return token.toLowerCase();
      if (word === word.toUpperCase()) return token.toUpperCase();
      if (word[0] === word[0].toUpperCase()) {
        return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
      }
      return token.toLowerCase();
    }
    function interpolate (str, args) {
      return str.replace(/\$(\d{1,2})/g, function (match, index) {
        return args[index] || '';
      });
    }
    function replace (word, rule) {
      return word.replace(rule[0], function (match, index) {
        var result = interpolate(rule[1], arguments);
        if (match === '') {
          return restoreCase(word[index - 1], result);
        }
        return restoreCase(match, result);
      });
    }
    function sanitizeWord (token, word, rules) {
      if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
      }
      var len = rules.length;
      while (len--) {
        var rule = rules[len];
        if (rule[0].test(word)) return replace(word, rule);
      }
      return word;
    }
    function replaceWord (replaceMap, keepMap, rules) {
      return function (word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) {
          return restoreCase(word, token);
        }
        if (replaceMap.hasOwnProperty(token)) {
          return restoreCase(word, replaceMap[token]);
        }
        return sanitizeWord(token, word, rules);
      };
    }
    function checkWord (replaceMap, keepMap, rules, bool) {
      return function (word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) return true;
        if (replaceMap.hasOwnProperty(token)) return false;
        return sanitizeWord(token, token, rules) === token;
      };
    }
    function pluralize (word, count, inclusive) {
      var pluralized = count === 1
        ? pluralize.singular(word) : pluralize.plural(word);
      return (inclusive ? count + ' ' : '') + pluralized;
    }
    pluralize.plural = replaceWord(
      irregularSingles, irregularPlurals, pluralRules
    );
    pluralize.isPlural = checkWord(
      irregularSingles, irregularPlurals, pluralRules
    );
    pluralize.singular = replaceWord(
      irregularPlurals, irregularSingles, singularRules
    );
    pluralize.isSingular = checkWord(
      irregularPlurals, irregularSingles, singularRules
    );
    pluralize.addPluralRule = function (rule, replacement) {
      pluralRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize.addSingularRule = function (rule, replacement) {
      singularRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize.addUncountableRule = function (word) {
      if (typeof word === 'string') {
        uncountables[word.toLowerCase()] = true;
        return;
      }
      pluralize.addPluralRule(word, '$0');
      pluralize.addSingularRule(word, '$0');
    };
    pluralize.addIrregularRule = function (single, plural) {
      plural = plural.toLowerCase();
      single = single.toLowerCase();
      irregularSingles[single] = plural;
      irregularPlurals[plural] = single;
    };
    [
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
      ['echo', 'echoes'],
      ['dingo', 'dingoes'],
      ['volcano', 'volcanoes'],
      ['tornado', 'tornadoes'],
      ['torpedo', 'torpedoes'],
      ['genus', 'genera'],
      ['viscus', 'viscera'],
      ['stigma', 'stigmata'],
      ['stoma', 'stomata'],
      ['dogma', 'dogmata'],
      ['lemma', 'lemmata'],
      ['schema', 'schemata'],
      ['anathema', 'anathemata'],
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
    [
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
      /[^aeiou]ese$/i,
      /deer$/i,
      /fish$/i,
      /measles$/i,
      /o[iu]s$/i,
      /pox$/i,
      /sheep$/i
    ].forEach(pluralize.addUncountableRule);
    return pluralize;
  });
  });

  /*! (c) Andrea Giammarchi (ISC) */var hyperHTML=function(N){var t={};try{t.WeakMap=WeakMap;}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this);}function o(e){this.set(e[0],e[1]);}}(Math.random(),Object);}var s=t.WeakMap,i={};try{i.WeakSet=WeakSet;}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++});}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},i.WeakSet=r;}(Math.random(),Object.defineProperty);}function m(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var c,l=e(n[r],1);t.insertBefore(l,a),o&&u&&l.selected&&(u=!u,c=t.selectedIndex,t.selectedIndex=c<0?r:f.call(t.querySelectorAll("option"),l)),r++;}}function y(e,t){return e==t}function b(e){return e}function w(e,t,n,r,i,a,o){var u=a-i;if(u<1)return -1;for(;u<=n-t;){for(var c=t,l=i;c<n&&l<a&&o(e[c],r[l]);)c++,l++;if(l===a)return t;t=c+1;}return -1}function x(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i}function E(e,t,n,r){for(;n<r;)a(e(t[n++],-1));}function C(e,t,n,r,i,a,o,u,c,l,s,f,h){!function(e,t,n,r,i,a,o,u,c){for(var l=[],s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:i++,f++;break;case 1:l.push(r[i]),m(t,n,r,i++,i,f<u?t(a[f],0):c);break;case-1:f++;}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:-1<l.indexOf(a[o])?o++:E(t,a,o++,o);}}(function(e,t,n,r,i,a,o){var u,c,l,s,f,h,d=n+a,v=[];e:for(m=0;m<=d;m++){if(50<m)return null;for(h=m-1,s=m?v[m-1]:[0,0],f=v[m]=[],u=-m;u<=m;u+=2){for(c=(l=u===-m||u!==m&&s[h+u-1]<s[h+u+1]?s[h+u+1]:s[h+u-1]+1)-u;l<a&&c<n&&o(r[i+l],e[t+c]);)l++,c++;if(l===a&&c===n)break e;f[m+u]=l;}}for(var p=Array(m/2+d/2),g=p.length-1,m=v.length-1;0<=m;m--){for(;0<l&&0<c&&o(r[i+l-1],e[t+c-1]);)p[g--]=0,l--,c--;if(!m)break;h=m-1,s=m?v[m-1]:[0,0],(u=l-c)===-m||u!==m&&s[h+u-1]<s[h+u+1]?(c--,p[g--]=1):(l--,p[g--]=-1);}return p}(n,r,a,o,u,l,f)||function(e,t,n,r,i,a,o,u){var c=0,l=r<u?r:u,s=Array(l++),f=Array(l);f[0]=-1;for(var h=1;h<l;h++)f[h]=o;for(var d=i.slice(a,o),v=t;v<n;v++){var p,g=d.indexOf(e[v]);-1<g&&(-1<(c=k(f,l,p=g+a))&&(f[c]=p,s[c]={newi:v,oldi:p,prev:s[c-1]}));}for(c=--l,--o;f[c]>o;)--c;l=u+r-c;var m=Array(l),y=s[c];for(--n;y;){for(var b=y.newi,w=y.oldi;b<n;)m[--l]=1,--n;for(;w<o;)m[--l]=-1,--o;m[--l]=0,--n,--o,y=y.prev;}for(;t<=n;)m[--l]=1,--n;for(;a<=o;)m[--l]=-1,--o;return m}(n,r,i,a,o,u,c,l),e,t,n,r,o,u,s,h);}var e=i.WeakSet,f=[].indexOf,k=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=1+a;}return r},a=function(e){return (e.remove||function(){var e=this.parentNode;e&&e.removeChild(this);}).call(e)};function l(e,t,n,r){for(var i=(r=r||{}).compare||y,a=r.node||b,o=null==r.before?null:a(r.before,0),u=t.length,c=u,l=0,s=n.length,f=0;l<c&&f<s&&i(t[l],n[f]);)l++,f++;for(;l<c&&f<s&&i(t[c-1],n[s-1]);)c--,s--;var h=l===c,d=f===s;if(h&&d)return n;if(h&&f<s)return m(a,e,n,f,s,x(a,t,l,u,o)),n;if(d&&l<c)return E(a,t,l,c),n;var v=c-l,p=s-f,g=-1;if(v<p){if(-1<(g=w(n,f,s,t,l,c,i)))return m(a,e,n,f,g,a(t[l],0)),m(a,e,n,g+v,s,x(a,t,c,u,o)),n}else if(p<v&&-1<(g=w(t,l,c,n,f,s,i)))return E(a,t,l,g),E(a,t,g+p,c),n;return v<2||p<2?(m(a,e,n,f,s,a(t[l],0)),E(a,t,l,c)):v==p&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,l,c,i)?m(a,e,n,f,s,x(a,t,c,u,o)):C(a,e,n,f,s,p,t,l,c,v,u,i,o),n}var n,r={};function o(e,t){t=t||{};var n=N.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}r.CustomEvent="function"==typeof CustomEvent?CustomEvent:(o[n="prototype"]=new o("").constructor[n],o);var u=r.CustomEvent,c={};try{c.Map=Map;}catch(e){c.Map=function(){var n=0,i=[],a=[];return {delete:function(e){var t=r(e);return t&&(i.splice(n,1),a.splice(n,1)),t},forEach:function(n,r){i.forEach(function(e,t){n.call(r,a[t],e,this);},this);},get:function(e){return r(e)?a[n]:void 0},has:r,set:function(e,t){return a[r(e)?n:i.push(e)-1]=t,this}};function r(e){return -1<(n=i.indexOf(e))}};}var h=c.Map;function d(){return this}function v(e,t){var n="_"+e+"$";return {get:function(){return this[n]||p(this,n,t.call(this,e))},set:function(e){p(this,n,e);}}}var p=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(d.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}});var g,A,S,O,T,M,_={},j={},L=[],P=j.hasOwnProperty,D=0,W={attributes:_,define:function(e,t){e.indexOf("-")<0?(e in j||(D=L.push(e)),j[e]=t):_[e]=t;},invoke:function(e,t){for(var n=0;n<D;n++){var r=L[n];if(P.call(e,r))return j[r](e[r],t)}}},$=Array.isArray||(A=(g={}.toString).call([]),function(e){return g.call(e)===A}),R=(S=N,O="fragment",M="content"in H(T="template")?function(e){var t=H(T);return t.innerHTML=e,t.content}:function(e){var t,n=H(O),r=H(T);return F(n,/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)?(t=RegExp.$1,r.innerHTML="<table>"+e+"</table>",r.querySelectorAll(t)):(r.innerHTML=e,r.childNodes)),n},function(e,t){return ("svg"===t?function(e){var t=H(O),n=H("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",F(t,n.firstChild.childNodes),t}:M)(e)});function F(e,t){for(var n=t.length;n--;)e.appendChild(t[0]);}function H(e){return e===O?S.createDocumentFragment():S.createElementNS("http://www.w3.org/1999/xhtml",e)}var I,z,V,Z,G,q,B,J,K,Q,U=(z="appendChild",V="cloneNode",Z="createTextNode",q=(G="importNode")in(I=N),(B=I.createDocumentFragment())[z](I[Z]("g")),B[z](I[Z]("")),(q?I[G](B,!0):B[V](!0)).childNodes.length<2?function e(t,n){for(var r=t[V](),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r[z](e(i[o],n));return r}:q?I[G]:function(e,t){return e[V](!!t)}),X="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},Y="-"+Math.random().toFixed(6)+"%",ee=!1;try{J=N.createElement("template"),Q="tabindex",(K="content")in J&&(J.innerHTML="<p "+Q+'="'+Y+'"></p>',J[K].childNodes[0].getAttribute(Q)==Y)||(Y="_dt: "+Y.slice(1,-1)+";",ee=!0);}catch(e){}var te="\x3c!--"+Y+"--\x3e",ne=8,re=1,ie=3,ae=/^(?:style|textarea)$/i,oe=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var ue=" \\f\\n\\r\\t",ce="[^"+ue+"\\/>\"'=]+",le="["+ue+"]+"+ce,se="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",fe="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+ce.replace("\\/","")+"))?)",he=new RegExp(se+le+fe+"+)(["+ue+"]*/?>)","g"),de=new RegExp(se+le+fe+"*)(["+ue+"]*/>)","g"),ve=new RegExp("("+le+"\\s*=\\s*)(['\"]?)"+te+"\\2","gi");function pe(e,t,n,r){return "<"+t+n.replace(ve,ge)+r}function ge(e,t,n){return t+(n||'"')+Y+(n||'"')}function me(e,t,n){return oe.test(t)?e:"<"+t+n+"></"+t+">"}var ye=ee?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort(function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1})}:function(e,t){return t.slice.call(e,0)};function be(e,t,n,r){for(var i=e.childNodes,a=i.length,o=0;o<a;){var u=i[o];switch(u.nodeType){case re:var c=r.concat(o);!function(e,t,n,r){var i,a=e.attributes,o=[],u=[],c=ye(a,n),l=c.length,s=0;for(;s<l;){var f=c[s++],h=f.value===Y;if(h||1<(i=f.value.split(te)).length){var d=f.name;if(o.indexOf(d)<0){o.push(d);var v=n.shift().replace(h?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+d+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),p=a[v]||a[v.toLowerCase()];if(h)t.push(we(p,r,v,null));else {for(var g=i.length-2;g--;)n.shift();t.push(we(p,r,v,i));}}u.push(f);}}l=u.length;var m=(s=0)<l&&ee&&!("ownerSVGElement"in e);for(;s<l;){var y=u[s++];m&&(y.value=""),e.removeAttribute(y.name);}var b=e.nodeName;if(/^script$/i.test(b)){var w=N.createElement(b);for(l=a.length,s=0;s<l;)w.setAttributeNode(a[s++].cloneNode(!0));w.textContent=e.textContent,e.parentNode.replaceChild(w,e);}}(u,t,n,c),be(u,t,n,c);break;case ne:var l=u.textContent;if(l===Y)n.shift(),t.push(ae.test(e.nodeName)?Ne(e,r):{type:"any",node:u,path:r.concat(o)});else switch(l.slice(0,2)){case"/*":if("*/"!==l.slice(-2))break;case"👻":e.removeChild(u),o--,a--;}break;case ie:ae.test(e.nodeName)&&X.call(u.textContent)===te&&(n.shift(),t.push(Ne(e,r)));}o++;}}function we(e,t,n,r){return {type:"attr",node:e,path:t,name:n,sparse:r}}function Ne(e,t){return {type:"text",node:e,path:t}}var xe,Ee=(xe=new s,{get:function(e){return xe.get(e)},set:function(e,t){return xe.set(e,t),t}});function Ce(o,f){var e=(o.convert||function(e){return e.join(te).replace(de,me).replace(he,pe)})(f),t=o.transform;t&&(e=t(e));var n=R(e,o.type);Se(n);var u=[];return be(n,u,f.slice(0),[]),{content:n,updates:function(c){for(var l=[],s=u.length,e=0,t=0;e<s;){var n=u[e++],r=function(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}(c,n.path);switch(n.type){case"any":l.push({fn:o.any(r,[]),sparse:!1});break;case"attr":var i=n.sparse,a=o.attribute(r,n.name,n.node);null===i?l.push({fn:a,sparse:!1}):(t+=i.length-2,l.push({fn:a,sparse:!0,values:i}));break;case"text":l.push({fn:o.text(r),sparse:!1}),r.textContent="";}}return s+=t,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+f.join("${value}"));for(var t=1,n=1;t<e;){var r=l[t-n];if(r.sparse){var i=r.values,a=i[0],o=1,u=i.length;for(n+=u-2;o<u;)a+=arguments[t++]+i[o++];r.fn(a);}else r.fn(arguments[t++]);}return c}}}}var ke=[];function Ae(i){var a=ke,o=Se;return function(e){var t,n,r;return a!==e&&(t=i,n=a=e,r=Ee.get(n)||Ee.set(n,Ce(t,n)),o=r.updates(U.call(N,r.content,!0))),o.apply(null,arguments)}}function Se(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===X.call(r.textContent).length&&e.removeChild(r);}}var Oe,Te,Me=(Oe=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Te=/([^A-Z])([A-Z]+)/g,function(e,t){return "ownerSVGElement"in e?function(e,t){var n;return (n=t?t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),e.getAttributeNode("style"))).value="",e.setAttributeNode(n),je(n,!0)}(e,t):je(e.style,!1)});function _e(e,t,n){return t+"-"+n.toLowerCase()}function je(a,o){var u,c;return function(e){var t,n,r,i;switch(typeof e){case"object":if(e){if("object"===u){if(!o&&c!==e)for(n in c)n in e||(a[n]="");}else o?a.value="":a.cssText="";for(n in t=o?{}:a,e)r="number"!=typeof(i=e[n])||Oe.test(n)?i:i+"px",!o&&/^--/.test(n)?t.setProperty(n,r):t[n]=r;u="object",o?a.value=function(e){var t,n=[];for(t in e)n.push(t.replace(Te,_e),":",e[t],";");return n.join("")}(c=t):c=e;break}default:c!=e&&(u="string",c=e,o?a.value=e||"":a.cssText=e||"");}}}var Le,Pe,De=(Le=[].slice,(Pe=We.prototype).ELEMENT_NODE=1,Pe.nodeType=111,Pe.remove=function(e){var t,n=this.childNodes,r=this.firstChild,i=this.lastChild;return this._=null,e&&2===n.length?i.parentNode.removeChild(i):((t=this.ownerDocument.createRange()).setStartBefore(e?n[1]:r),t.setEndAfter(i),t.deleteContents()),r},Pe.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},We);function We(e){var t=this.childNodes=Le.call(e,0);this.firstChild=t[0],this.lastChild=t[t.length-1],this.ownerDocument=t[0].ownerDocument,this._=null;}function $e(e){return {html:e}}function Re(e,t){switch(e.nodeType){case Ke:return 1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild;case Je:return Re(e.render(),t);default:return e}}function Fe(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then($e).then(t):Promise.resolve(W.invoke(e,t)).then(t);}function He(e){return null!=e&&"then"in e}var Ie,ze,Ve,Ze,Ge,qe="ownerSVGElement",Be="connected",Je=d.prototype.nodeType,Ke=De.prototype.nodeType,Qe=(ze=(Ie={Event:u,WeakSet:e}).Event,Ve=Ie.WeakSet,Ze=!0,Ge=null,function(e){return Ze&&(Ze=!Ze,Ge=new Ve,function(t){var i=new Ve,a=new Ve;try{new MutationObserver(u).observe(t,{subtree:!0,childList:!0});}catch(e){var n=0,r=[],o=function(e){r.push(e),clearTimeout(n),n=setTimeout(function(){u(r.splice(n=0,r.length));},0);};t.addEventListener("DOMNodeRemoved",function(e){o({addedNodes:[],removedNodes:[e.target]});},!0),t.addEventListener("DOMNodeInserted",function(e){o({addedNodes:[e.target],removedNodes:[]});},!0);}function u(e){for(var t,n=e.length,r=0;r<n;r++)c((t=e[r]).removedNodes,"disconnected",a,i),c(t.addedNodes,"connected",i,a);}function c(e,t,n,r){for(var i,a=new ze(t),o=e.length,u=0;u<o;1===(i=e[u++]).nodeType&&function e(t,n,r,i,a){Ge.has(t)&&!i.has(t)&&(a.delete(t),i.add(t),t.dispatchEvent(n));for(var o=t.children||[],u=o.length,c=0;c<u;e(o[c++],n,r,i,a));}(i,a,t,n,r));}}(e.ownerDocument)),Ge.add(e),e}),Ue=/^(?:form|list)$/i,Xe=[].slice;function Ye(e){return this.type=e,Ae(this)}var et=!(Ye.prototype={attribute:function(n,r,e){var i,t=qe in n;if("style"===r)return Me(n,e,t);if("."===r.slice(0,1))return l=n,s=r.slice(1),t?function(t){try{l[s]=t;}catch(e){l.setAttribute(s,t);}}:function(e){l[s]=e;};if("?"===r.slice(0,1))return o=n,u=r.slice(1),function(e){c!==!!e&&((c=!!e)?o.setAttribute(u,""):o.removeAttribute(u));};if(/^on/.test(r)){var a=r.slice(2);return a===Be||"disconnected"===a?Qe(n):r.toLowerCase()in n&&(a=a.toLowerCase()),function(e){i!==e&&(i&&n.removeEventListener(a,i,!1),(i=e)&&n.addEventListener(a,e,!1));}}if("data"===r||!t&&r in n&&!Ue.test(r))return function(e){i!==e&&(i=e,n[r]!==e&&null==e?(n[r]="",n.removeAttribute(r)):n[r]=e);};if(r in W.attributes)return function(e){var t=W.attributes[r](n,e);i!==t&&(null==(i=t)?n.removeAttribute(r):n.setAttribute(r,t));};var o,u,c,l,s,f=!1,h=e.cloneNode(!0);return function(e){i!==e&&(i=e,h.value!==e&&(null==e?(f&&(f=!1,n.removeAttributeNode(h)),h.value=e):(h.value=e,f||(f=!0,n.setAttributeNode(h)))));}},any:function(r,i){var a,o={node:Re,before:r},u=qe in r?"svg":"html",c=!1;return function e(t){switch(typeof t){case"string":case"number":case"boolean":c?a!==t&&(a=t,i[0].textContent=t):(c=!0,a=t,i=l(r.parentNode,i,[(n=t,r.ownerDocument.createTextNode(n))],o));break;case"function":e(t(r));break;case"object":case"undefined":if(null==t){c=!1,i=l(r.parentNode,i,[],o);break}default:if(c=!1,$(a=t))if(0===t.length)i.length&&(i=l(r.parentNode,i,[],o));else switch(typeof t[0]){case"string":case"number":case"boolean":e({html:t});break;case"object":if($(t[0])&&(t=t.concat.apply([],t)),He(t[0])){Promise.all(t).then(e);break}default:i=l(r.parentNode,i,t,o);}else "ELEMENT_NODE"in t?i=l(r.parentNode,i,11===t.nodeType?Xe.call(t.childNodes):[t],o):He(t)?t.then(e):"placeholder"in t?Fe(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?i=l(r.parentNode,i,Xe.call(R([].concat(t.html).join(""),u).childNodes),o):"length"in t?e(Xe.call(t)):e(W.invoke(t,e));}var n;}},text:function(r){var i;return function e(t){var n;i!==t&&("object"==(n=typeof(i=t))&&t?He(t)?t.then(e):"placeholder"in t?Fe(t,e):"text"in t?e(String(t.text)):"any"in t?e(t.any):"html"in t?e([].concat(t.html).join("")):"length"in t?e(Xe.call(t).join("")):e(W.invoke(t,e)):"function"==n?e(t(r)):r.textContent=null==t?"":t);}}}),tt=function(e){var t,r,i,a,n=(t=(N.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(t)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(t)),o=!("raw"in e)||e.propertyIsEnumerable("raw")||!Object.isFrozen(e.raw);return n||o?(r={},i=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return r[t]||(r[t]=e)},tt=o?i:(a=new s,function(e){return a.get(e)||(n=i(t=e),a.set(t,n),n);var t,n;})):et=!0,nt(e)};function nt(e){return et?e:tt(e)}function rt(e){for(var t=arguments.length,n=[nt(e)],r=1;r<t;)n.push(arguments[r++]);return n}var it=new s,at=function(t){var n,r,i;return function(){var e=rt.apply(null,arguments);return i!==e[0]?(i=e[0],r=new Ye(t),n=ut(r.apply(r,e))):r.apply(r,e),n}},ot=function(e,t){var n=t.indexOf(":"),r=it.get(e),i=t;return -1<n&&(i=t.slice(n+1),t=t.slice(0,n)||"html"),r||it.set(e,r={}),r[i]||(r[i]=at(t))},ut=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new De(t):e},ct=new s;function lt(){var e=ct.get(this),t=rt.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new Ye(qe in this?"svg":"html");ct.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments));}.apply(this,t),this}var st,ft,ht,dt,vt=W.define,pt=Ye.prototype;function gt(e){return arguments.length<2?null==e?at("html"):"string"==typeof e?gt.wire(null,e):"raw"in e?at("html")(e):"nodeType"in e?gt.bind(e):ot(e,"html"):("raw"in e?at("html"):gt.wire).apply(null,arguments)}return gt.Component=d,gt.bind=function(e){return lt.bind(e)},gt.define=vt,gt.diff=l,(gt.hyper=gt).observe=Qe,gt.tagger=pt,gt.wire=function(e,t){return null==e?at(t||"html"):ot(e,t||"html")},gt._={WeakMap:s,WeakSet:e},st=at,ft=new s,ht=Object.create,dt=function(e,t){var n={w:null,p:null};return t.set(e,n),n},Object.defineProperties(d,{for:{configurable:!0,value:function(e,t){return function(e,t,n,r){var i,a,o,u=t.get(e)||dt(e,t);switch(typeof r){case"object":case"function":var c=u.w||(u.w=new s);return c.get(r)||(i=c,a=r,o=new e(n),i.set(a,o),o);default:var l=u.p||(u.p=ht(null));return l[r]||(l[r]=new e(n))}}(this,ft.get(e)||(n=e,r=new h,ft.set(n,r),r),e,null==t?"default":t);var n,r;}}}),Object.defineProperties(d.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e);}},html:v("html",st),svg:v("svg",st),state:v("state",function(){return this.defaultState}),defaultState:{get:function(){return {}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var r=new u(e,{bubbles:!0,cancelable:!0,detail:t});return r.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(r)}return !1}},setState:{value:function(e,t){var n=this.state,r="function"==typeof e?e.call(this,n):e;for(var i in r)n[i]=r[i];return !1!==t&&this.render(),this}}}),gt}(document);

  // @ts-check

  /** @type {import("idb")} */
  // @ts-ignore
  const idb = _idb;
  const webidl2 = _webidl2;
  /** @type {import("hyperhtml").default} */
  // @ts-ignore
  const html = hyperHTML;
  /** @type {import("marked")} */
  // @ts-ignore
  const marked = marked_1;
  /** @type {import("pluralize")} */
  // @ts-ignore
  const pluralize$1 = pluralize$2;

  // @ts-check

  const dashes = /-/g;
  /**
   * Hashes a string from char code. Can return a negative number.
   * Based on https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
   *
   * @param {String} text
   */
  function hashString(text) {
    let hash = 0;
    for (const char of text) {
      hash = (Math.imul(31, hash) + char.charCodeAt(0)) | 0;
    }
    return String(hash);
  }

  const localizationStrings$k = {
    en: {
      x_and_y: " and ",
      x_y_and_z: ", and ",
    },
    de: {
      x_and_y: " und ",
      x_y_and_z: " und ",
    },
  };
  const l10n$i = getIntlData(localizationStrings$k);

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

  // STRING HELPERS
  // Takes an array and returns a string that separates each of its items with the proper commas and
  // "and". The second argument is a mapping function that can convert the items before they are
  // joined
  function joinAnd(array = [], mapper = item => item, lang = lang$b) {
    const items = array.map(mapper);
    if (Intl.ListFormat && typeof Intl.ListFormat === "function") {
      const formatter = new Intl.ListFormat(lang, {
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
        return items.join(l10n$i.x_and_y);
      default: {
        // x, y, and z
        const str = items.join(", ");
        const lastComma = str.lastIndexOf(",");
        const and = l10n$i.x_y_and_z;
        return `${str.substr(0, lastComma)}${and}${str.slice(lastComma + 2)}`;
      }
    }
  }

  // Takes a string, applies some XML escapes, and returns the escaped string.
  // Note that overall using either Handlebars' escaped output or jQuery is much
  // preferred to operating on strings directly.
  function xmlEscape(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
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
  function getIntlData(localizationStrings, lang = lang$b) {
    lang = resolveLanguageAlias(lang.toLowerCase());
    // Proxy return type is a known bug:
    // https://github.com/Microsoft/TypeScript/issues/20846
    // @ts-ignore
    return new Proxy(localizationStrings, {
      /** @param {string} key */
      get(data, key) {
        const result = (data[lang] && data[lang][key]) || data.en[key];
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
            const msg = `call to \`${meth}()\` failed with: ${e}.`;
            const hint = "See developer console for stack trace.";
            showWarning(msg, "utils/runTransforms", { hint });
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
    const joined = items.slice(0, -1).map(item => html`${item}, `);
    return html`${joined}${items[items.length - 1]}`;
  }

  /**
   * Creates and sets an ID to an element (elem) by hashing the text content.
   *
   * @param {HTMLElement} elem element to hash from
   * @param {String} prefix prefix to prepend to the generated id
   */
  function addHashId(elem, prefix = "") {
    const text = norm(elem.textContent);
    const hash = hashString(text);
    return addId(elem, prefix, hash);
  }

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

  class RespecError extends Error {
    /**
     * @param {Parameters<typeof showError>[0]} message
     * @param {Parameters<typeof showError>[1]} plugin
     * @param {Parameters<typeof showError>[2] & { isWarning: boolean }} options
     */
    constructor(message, plugin, options) {
      super(message);
      const name = options.isWarning ? "ReSpecWarning" : "ReSpecError";
      Object.assign(this, { message, plugin, name, ...options });
      if (options.elements) {
        options.elements.forEach(elem =>
          markAsOffending(elem, message, options.title)
        );
      }
    }

    toJSON() {
      const { message, name, stack } = this;
      // @ts-expect-error https://github.com/microsoft/TypeScript/issues/26792
      const { plugin, hint, elements, title, details } = this;
      return { message, name, plugin, hint, elements, title, details, stack };
    }
  }

  /**
   * @param {string} message
   * @param {string} pluginName Name of plugin that caused the error.
   * @param {object} [options]
   * @param {string} [options.hint] How to solve the error?
   * @param {HTMLElement[]} [options.elements] Offending elements.
   * @param {string} [options.title] Title attribute for offending elements. Can be a shorter form of the message.
   * @param {string} [options.details] Any further details/context.
   */
  function showError(message, pluginName, options = {}) {
    const opts = { ...options, isWarning: false };
    pub("error", new RespecError(message, pluginName, opts));
  }

  /**
   * @param {string} message
   * @param {string} pluginName Name of plugin that caused the error.
   * @param {object} [options]
   * @param {string} [options.hint] How to solve the error?
   * @param {HTMLElement[]} [options.elements] Offending elements.
   * @param {string} [options.title] Title attribute for offending elements. Can be a shorter form of the message.
   * @param {string} [options.details] Any further details/context.
   */
  function showWarning(message, pluginName, options = {}) {
    const opts = { ...options, isWarning: true };
    pub("warn", new RespecError(message, pluginName, opts));
  }

  // @ts-check

  /**
   * Module core/pubsubhub
   *
   * Returns a singleton that can be used for message broadcasting
   * and message receiving. Replaces legacy "msg" code in ReSpec.
   */
  const name$19 = "core/pubsubhub";

  const subscriptions = new Map();

  function pub(topic, ...data) {
    if (!subscriptions.has(topic)) {
      return; // Nothing to do...
    }
    Array.from(subscriptions.get(topic)).forEach(cb => {
      try {
        cb(...data);
      } catch (err) {
        const msg = `Error when calling function ${cb.name}.`;
        const hint = "See developer console.";
        showError(msg, name$19, { hint });
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

  expose(name$19, { sub });

  // @ts-check

  const removeList = ["githubToken", "githubUser"];

  function run$U(config) {
    const userConfig = {};
    const amendConfig = newValues => Object.assign(userConfig, newValues);

    amendConfig(config);
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
  }

  // @ts-check

  const name$18 = "core/respec-global";

  class ReSpec {
    constructor() {
      /** @type {Promise<void>} */
      this._respecDonePromise = new Promise(resolve => {
        sub("end-all", resolve, { once: true });
      });

      this.errors = [];
      this.warnings = [];

      sub("error", rsError => {
        console.error(rsError, rsError.toJSON());
        this.errors.push(rsError);
      });
      sub("warn", rsError => {
        console.warn(rsError, rsError.toJSON());
        this.warnings.push(rsError);
      });
    }

    get version() {
      return window.respecVersion;
    }

    get ready() {
      return this._respecDonePromise;
    }
  }

  function init() {
    const respec = new ReSpec();
    Object.defineProperty(document, "respec", { value: respec });

    let respecIsReadyWarningShown = false;
    Object.defineProperty(document, "respecIsReady", {
      get() {
        if (!respecIsReadyWarningShown) {
          const msg =
            "`document.respecIsReady` is deprecated and will be removed in a future release.";
          const hint = "Use `document.respec.ready` instead.";
          showWarning(msg, name$18, { hint });
          respecIsReadyWarningShown = true;
        }
        return document.respec.ready;
      },
    });
  }

  // @ts-check

  function run$T(config) {
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

  // @ts-check

  const name$17 = "core/post-process";

  async function run$S(config) {
    if (Array.isArray(config.postProcess)) {
      const promises = config.postProcess
        .filter(f => {
          const isFunction = typeof f === "function";
          if (!isFunction) {
            const msg = "Every item in `postProcess` must be a JS function.";
            showError(msg, name$17);
          }
          return isFunction;
        })
        .map(async f => {
          try {
            return await f(config, document);
          } catch (err) {
            const msg = `Function ${f.name} threw an error during \`postProcess\`.`;
            const hint = "See developer console.";
            showError(msg, name$17, { hint });
            console.error(err);
          }
        });
      await Promise.all(promises);
    }
    if (typeof config.afterEnd === "function") {
      await config.afterEnd(config, document);
    }
  }

  // @ts-check

  const name$16 = "core/pre-process";

  async function run$R(config) {
    if (Array.isArray(config.preProcess)) {
      const promises = config.preProcess
        .filter(f => {
          const isFunction = typeof f === "function";
          if (!isFunction) {
            const msg = "Every item in `preProcess` must be a JS function.";
            showError(msg, name$16);
          }
          return isFunction;
        })
        .map(async f => {
          try {
            return await f(config, document);
          } catch (err) {
            const msg = `Function ${f.name} threw an error during \`preProcess\`.`;
            const hint = "See developer console.";
            showError(msg, name$16, { hint });
            console.error(err);
          }
        });
      await Promise.all(promises);
    }
  }

  // @ts-check

  const name$15 = "core/base-runner";

  async function runAll(plugs) {
    init();

    pub("start-all", respecConfig);
    run$U(respecConfig);
    run$T(respecConfig);
    performance.mark(`${name$15}-start`);
    await run$R(respecConfig);

    const runnables = plugs.filter(p => isRunnableModule(p));
    runnables.forEach(
      plug => !plug.name && console.warn("Plugin lacks name:", plug)
    );
    respecConfig.state = {};
    await executePreparePass(runnables, respecConfig);
    await executeRunPass(runnables, respecConfig);
    respecConfig.state = {};
    pub("plugins-done", respecConfig);

    await run$S(respecConfig);
    pub("end-all");
    removeReSpec(document);
    performance.mark(`${name$15}-end`);
    performance.measure(name$15, `${name$15}-start`, `${name$15}-end`);
  }

  function isRunnableModule(plug) {
    return plug && (plug.run || plug.Plugin);
  }

  async function executePreparePass(runnables, config) {
    for (const plug of runnables.filter(p => p.prepare)) {
      try {
        await plug.prepare(config);
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function executeRunPass(runnables, config) {
    for (const plug of runnables) {
      const name = plug.name || "";

      try {
        // eslint-disable-next-line no-async-promise-executor
        await new Promise(async (resolve, reject) => {
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
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  var baseRunner = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$15,
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

  const name$14 = "core/reindent";

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

  function run$Q() {
    for (const pre of document.getElementsByTagName("pre")) {
      pre.innerHTML = reindent(pre.innerHTML);
    }
  }

  var reindent$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$14,
    reindent: reindent,
    run: run$Q
  });

  // @ts-check
  const name$13 = "core/markdown";

  const gtEntity = /&gt;/gm;
  const ampEntity = /&amp;/gm;

  class Renderer extends marked.Renderer {
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
    const result = marked(potentialMarkdown, {
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

  function structure$1(fragment, doc) {
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
    const structuredInternals = structure$1(elem, elem.ownerDocument);
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

  function run$P(conf) {
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
    const fragment = structure$1(newBody, document);
    // Frankenstein the whole thing back together
    newBody.append(rsUI, fragment);
    document.body.replaceWith(newBody);
  }

  var markdown = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$13,
    markdownToHtml: markdownToHtml,
    restructure: restructure,
    run: run$P
  });

  // @ts-check
  const name$12 = "core/ui";

  // Opportunistically inserts the style, with the chance to reduce some FOUC
  insertStyle$1();

  async function loadStyle$c() {
    try {
      return (await Promise.resolve().then(function () { return ui$1; })).default;
    } catch {
      return fetchAsset("ui.css");
    }
  }

  async function insertStyle$1() {
    const styleElement = document.createElement("style");
    styleElement.id = "respec-ui-styles";
    styleElement.textContent = await loadStyle$c();
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

  const respecUI = html`<div id="respec-ui" class="removeOnSave" hidden></div>`;
  const menu = html`<ul
  id="respec-menu"
  role="menu"
  aria-labelledby="respec-pill"
  hidden
></ul>`;
  const closeButton = html`<button
  class="close-button"
  onclick=${() => ui$2.closeModal()}
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

  const respecPill = html`<button id="respec-pill" disabled>ReSpec</button>`;
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

  function errWarn(err, arr, butName, title) {
    arr.push(err);
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
    const button = html`<button
    id="${buttonId}"
    class="respec-info-button"
  ></button>`;
    button.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "true");
      const ol = html`<ol class="${`respec-${butName}-list`}"></ol>`;
      for (const err of arr) {
        const fragment = document
          .createRange()
          .createContextualFragment(rsErrorToHTML(err));
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
      ui$2.freshModal(title, ol, button);
    });
    const ariaMap = new Map([
      ["expanded", "false"],
      ["haspopup", "true"],
      ["controls", `respec-pill-${butName}-modal`],
    ]);
    ariaDecorate(button, ariaMap);
    return button;
  }

  const ui$2 = {
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
    /**
     * @param {string} _keyShort shortcut key. unused - kept for backward compatibility.
     */
    addCommand(label, handler, _keyShort, icon) {
      icon = icon || "";
      const id = `respec-button-${label.toLowerCase().replace(/\s+/, "-")}`;
      const button = html`<button id="${id}" class="respec-option">
      <span class="respec-cmd-icon" aria-hidden="true">${icon}</span> ${label}…
    </button>`;
      const menuItem = html`<li role="menuitem">${button}</li>`;
      menuItem.addEventListener("click", handler);
      menu.appendChild(menuItem);
      return button;
    },
    error(rsError) {
      errWarn(rsError, errors, "error", "ReSpec Errors");
    },
    warning(rsError) {
      errWarn(rsError, warnings, "warning", "ReSpec Warnings");
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
      overlay = html`<div id="respec-overlay" class="removeOnSave"></div>`;
      const id = `${currentOwner.id}-modal`;
      const headingId = `${id}-heading`;
      modal = html`<div
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
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape") {
      ui$2.closeModal();
    }
  });
  window.respecUI = ui$2;
  sub("error", details => ui$2.error(details));
  sub("warn", details => ui$2.warning(details));

  function rsErrorToHTML(err) {
    if (typeof err === "string") {
      return err;
    }

    const plugin = err.plugin ? `(${err.plugin}): ` : "";
    const hint = err.hint ? ` ${err.hint}` : "";
    const elements = Array.isArray(err.elements)
      ? ` Occurred at: ${joinAnd(err.elements.map(generateMarkdownLink))}.`
      : "";
    const details = err.details
      ? `\n\n<details>\n${err.details}\n</details>\n`
      : "";

    const text = `${plugin}${err.message}${hint}${elements}${details}`;
    return markdownToHtml(text);
  }

  /**
   * @param {Element} element
   * @param {number} i
   */
  function generateMarkdownLink(element, i) {
    return `[${i + 1}](#${element.id})`;
  }

  var ui$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$12,
    ui: ui$2
  });

  // @ts-check
  // Module core/location-hash
  // Resets window.location.hash to jump to the right point in the document

  const name$11 = "core/location-hash";

  function run$O() {
    if (!location.hash) {
      return;
    }
    document.respec.ready.then(() => {
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
    name: name$11,
    run: run$O
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

  const name$10 = "check-charset";
  const meta$8 = {
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
  const lang$a = lang$b in meta$8 ? lang$b : "en";

  /**
   * Runs linter rule.
   *
   * @param {Object} _ The ReSpec config.
   * @param {Document} doc The document to be checked.
   */
  function linterFunction$5(_, doc) {
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
      name: name$10,
      occurrences: metas.length,
      ...meta$8[lang$a],
    };
  }
  const rule$8 = new LinterRule(name$10, linterFunction$5);

  // @ts-check

  const name$$ = "check-internal-slots";

  const meta$7 = {
    en: {
      description: "Internal slots should be preceded by a '.'",
      howToFix: "Add a '.' between the elements mentioned.",
      help: "See developer console.",
    },
  };

  // Fall back to english, if language is missing
  const lang$9 = lang$b in meta$7 ? lang$b : "en";

  /**
   * Runs linter rule.
   * @param {Object} _ The ReSpec config.
   * @param {Document} doc The document to be checked.
   * @return {import("../../core/LinterRule").LinterResult}
   */
  function linterFunction$4(_, doc) {
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
      name: name$$,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$7[lang$9],
    };
  }

  const rule$7 = new LinterRule(name$$, linterFunction$4);

  // @ts-check

  const name$_ = "check-punctuation";
  const punctuationMarks = [".", ":", "!", "?"];
  const humanMarks = punctuationMarks.map(mark => `"${mark}"`).join(", ");
  const meta$6 = {
    en: {
      description: "`p` elements should end with a punctuation mark.",
      howToFix: `Please make sure \`p\` elements end with one of: ${humanMarks}.`,
    },
  };
  // Fall back to english, if language is missing
  const lang$8 = lang$b in meta$6 ? lang$b : "en";

  /**
   * Runs linter rule.
   *
   * @param {Object} _ The ReSpec config.
   * @param  {Document} doc The document to be checked.
   * @return {import("../../core/LinterRule").LinterResult}
   */
  function lintingFunction$2(_, doc) {
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
      name: name$_,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$6[lang$8],
    };
  }
  const rule$6 = new LinterRule(name$_, lintingFunction$2);

  // @ts-check
  const name$Z = "core/linter";

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
      name: linterName,
      occurrences,
      offendingElements,
    } = output;
    const msg = offendingElements.length
      ? description
      : `${description} (Count: ${occurrences})`;
    const plugin = `${name$Z}/${linterName}`;
    const hint = `${howToFix} ${help}`;
    showWarning(msg, plugin, { hint, elements: offendingElements });
  }

  function run$N(conf) {
    if (conf.lint === false) {
      return; // nothing to do
    }
    // return early, continue processing other things
    (async () => {
      await document.respec.ready;
      try {
        await linter.lint(conf, document);
      } catch (err) {
        console.error("Error ocurred while running the linter", err);
      }
    })();
  }

  var linter$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$Z,
    'default': linter,
    run: run$N
  });

  // @ts-check

  const name$Y = "local-refs-exist";

  const meta$5 = {
    en: {
      description: "Broken local reference found in document.",
      howToFix: "Please fix the links mentioned.",
      help: "See developer console.",
    },
  };

  // Fall back to english, if language is missing
  const lang$7 = lang$b in meta$5 ? lang$b : "en";

  /**
   * Runs linter rule.
   * @param {Object} _ The ReSpec config.
   * @param  {Document} doc The document to be checked.
   * @return {import("../../core/LinterRule").LinterResult}
   */
  function linterFunction$3(_, doc) {
    const offendingElements = [...doc.querySelectorAll("a[href^='#']")].filter(
      isBrokenHyperlink
    );
    if (!offendingElements.length) {
      return;
    }
    return {
      name: name$Y,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$5[lang$7],
    };
  }

  const rule$5 = new LinterRule(name$Y, linterFunction$3);

  function isBrokenHyperlink(elem) {
    const id = elem.getAttribute("href").substring(1);
    const doc = elem.ownerDocument;
    return !doc.getElementById(id) && !doc.getElementsByName(id).length;
  }

  // @ts-check
  const name$X = "no-headingless-sections";
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
  const lang$6 = lang$b in meta$4 ? lang$b : "en";
  const hasNoHeading = ({ firstElementChild: elem }) => {
    return elem === null || /^h[1-6]$/.test(elem.localName) === false;
  };

  /**
   * @param {*} _
   * @param {Document} doc
   * @return {import("../../core/LinterRule").LinterResult}
   */
  function linterFunction$2(_, doc) {
    const offendingElements = [...doc.querySelectorAll("section")].filter(
      hasNoHeading
    );
    if (!offendingElements.length) {
      return;
    }
    return {
      name: name$X,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$4[lang$6],
    };
  }
  const rule$4 = new LinterRule(name$X, linterFunction$2);

  // @ts-check

  const name$W = "no-http-props";

  const meta$3 = {
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
  const lang$5 = lang$b in meta$3 ? lang$b : "en";

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
      name: name$W,
      occurrences: offendingMembers.length,
      ...meta$3[lang$5],
    };
    result.howToFix += `${offendingMembers
    .map(item => `\`${item}\``)
    .join(", ")}.`;
    return result;
  }

  const rule$3 = new LinterRule(name$W, lintingFunction$1);

  // @ts-check

  const name$V = "no-unused-vars";

  const meta$2 = {
    en: {
      description: "Variable was defined, but never used.",
      howToFix: "Add a `data-ignore-unused` attribute to the `<var>`.",
      help: "See developer console.",
    },
  };
  // Fall back to english, if language is missing
  const lang$4 = lang$b in meta$2 ? lang$b : "en";

  /**
   * @param {*} _
   * @param {Document} doc
   * @return {import("../LinterRule").LinterResult}
   */
  function linterFunction$1(_, doc) {
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
      name: name$V,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta$2[lang$4],
    };
  }
  const rule$2 = new LinterRule(name$V, linterFunction$1);

  // @ts-check
  const name$U = "privsec-section";
  const meta$1 = {
    en: {
      description:
        "Document must a 'Privacy and/or Security' Considerations section.",
      howToFix: "Add a privacy and/or security considerations section.",
      help:
        "See the [Self-Review Questionnaire](https://w3ctag.github.io/security-questionnaire/).",
    },
  };

  // Fall back to english, if language is missing
  const lang$3 = lang$b in meta$1 ? lang$b : "en";

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
  function lintingFunction(conf, doc) {
    if (conf.isRecTrack && !hasPriSecConsiderations(doc)) {
      return { name: name$U, occurrences: 1, ...meta$1[lang$3] };
    }
  }

  const rule$1 = new LinterRule(name$U, lintingFunction);

  // @ts-check

  linter.register(
    rule$3,
    rule$4,
    rule$2,
    rule$6,
    rule$5,
    rule$7,
    rule$8,
    rule$1
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

  const name$T = "wpt-tests-exist";

  const meta = {
    en: {
      description: "Non-existent Web Platform Tests",
      howToFix: "Please fix the tests mentioned.",
      help: "See developer console.",
    },
  };

  const lang$2 = lang$b in meta ? lang$b : "en";

  /**
   * Runs linter rule.
   * @param {Object} conf The ReSpec config.
   * @param  {Document} doc The document to be checked.
   * @return {Promise<import("../LinterRule").LinterResult>}
   */
  async function linterFunction(conf, doc) {
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
      name: name$T,
      offendingElements,
      occurrences: offendingElements.length,
      ...meta[lang$2],
      description: `${meta[lang$2].description}: ${missingTests.join(", ")}.`,
    };
  }

  const rule = new LinterRule(name$T, linterFunction);

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
      showWarning(msg, `linter/${name$T}`);
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
      showWarning(msg, `linter/${name$T}`);
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
  const name$S = "pcisig/pcisig-defaults";

  linter.register(rule$1, rule);

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

  function run$M(conf) {
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
    name: name$S,
    run: run$M
  });

  // @ts-check
  const name$R = "core/style";

  // Opportunistically inserts the style, with the chance to reduce some FOUC
  const styleElement = insertStyle();

  async function loadStyle$b() {
    try {
      return (await Promise.resolve().then(function () { return respec$1; })).default;
    } catch {
      return fetchAsset("respec.css");
    }
  }

  async function insertStyle() {
    const styleElement = document.createElement("style");
    styleElement.id = "respec-mainstyle";
    styleElement.textContent = await loadStyle$b();
    document.head.appendChild(styleElement);
    return styleElement;
  }

  async function run$L(conf) {
    if (conf.noReSpecCSS) {
      (await styleElement).remove();
    }
  }

  var style = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$R,
    run: run$L
  });

  // @ts-check

  const name$Q = "pcisig/style";

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
    /** @type ResourceHintOption[]  */
    const opts = [
      {
        hint: "preconnect", // for PCISIG styles and scripts.
        href: "https://sglaser.github.io/respec/Spec",
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
    ];

    const resourceHints = document.createDocumentFragment();
    for (const link of opts.map(createResourceHint)) {
      resourceHints.appendChild(link);
    }
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

  function run$K(conf) {
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
    name: name$Q,
    run: run$K
  });

  // Module pcisig/l10n
  const name$P = "pcisig/l10n";
  const additions = {
    en: {
      sotd: "Status of this Document",
      status_at_publication:
        "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current PCISIG publications and the latest revision of this specification can be found at <a href='https://www.pcisig.com'>pcisig.com</a>",
    },
  };

  Object.keys(additions).forEach(key => {
    if (!l10n$j[key]) l10n$j[key] = {};
    Object.assign(l10n$j[key], additions[key]);
  });

  var l10n$h = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$P
  });

  // @ts-check

  const name$O = "core/data-include";

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

  async function run$J() {
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
        const msg = `\`data-include\` failed: \`${url}\` (${err.message}).`;
        console.error(msg, el, err);
        showError(msg, name$O, { elements: [el] });
      }
    });
    await Promise.all(promisesToInclude);
  }

  var dataInclude = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$O,
    run: run$J
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
  const name$N = "core/title";

  const localizationStrings$j = {
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

  const l10n$g = getIntlData(localizationStrings$j);

  function run$I(conf) {
    /** @type {HTMLElement} */
    const h1Elem =
      document.querySelector("h1#title") || html`<h1 id="title"></h1>`;

    // check existing element is ok to use
    if (h1Elem.isConnected && h1Elem.textContent.trim() === "") {
      const msg =
        "The document is missing a title, so using a default title. " +
        "To fix this, please give your document a `<title>`. " +
        "If you need special markup in the document's title, " +
        'please use a `<h1 id="title">`.';
      const title = "Document is missing a title";
      showError(msg, name$N, { title, elements: [h1Elem] });
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
      h1Elem.textContent = document.title || `${l10n$g.default_title}`;
    }

    let documentTitle = norm(h1Elem.textContent);

    if (conf.isPreview && conf.prNumber) {
      const prUrl = conf.prUrl || `${conf.github.repoURL}pull/${conf.prNumber}`;
      const { childNodes } = html`
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
    name: name$N,
    run: run$I
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
    return html`
    <dt class="${link.class ? link.class : null}">${link.key}:</dt>
    ${link.data ? link.data.map(showLinkData) : showLinkData(link)}
  `;
  };

  function showLinkData(data) {
    return html`
    <dd class="${data.class ? data.class : null}">
      ${data.href
        ? html`<a href="${data.href}">${data.value || data.href}</a>`
        : ""}
    </dd>
  `;
  }

  // @ts-check

  const name$M = "pcisig/templates.show-logo";

  var showLogo = obj => {
    /** @type {HTMLAnchorElement} */
    const a = html`<a href="${obj.url || ""}" class="logo"></a>`;
    if (!obj.alt) {
      showWarning(`Found spec logo ${obj.url} without an alt attribute`, name$M);
    }
    /** @type {HTMLImageElement} */
    const img = html`
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

  const name$L = "pcisig/templates/show-people";

  const localizationStrings$i = {
    en: {
      until: "Until",
    },
    es: {
      until: "Hasta",
    },
  };

  const lang$1 = lang$b in localizationStrings$i ? lang$b : "en";

  var showPeople = (items = []) => {
    const l10n = localizationStrings$i[lang$1];
    return items.map(getItem);

    function getItem(p) {
      const personName = [p.name]; // treated as opt-in HTML by html
      const company = [p.company];
      const editorid = p.w3cid ? parseInt(p.w3cid, 10) : null;
      /** @type {HTMLElement} */
      const dd = html`
      <dd class="p-author h-card vcard" data-editor-id="${editorid}"></dd>
    `;
      const span = document.createDocumentFragment();
      const contents = [];
      if (p.mailto) {
        contents.push(html`
        <a class="ed_mailto u-email email p-name" href="${`mailto:${p.mailto}`}"
          >${personName}</a
        >
      `);
      } else if (p.url) {
        contents.push(html`
        <a class="u-url url p-name fn" href="${p.url}">${personName}</a>
      `);
      } else {
        contents.push(html`<span class="p-name fn">${personName}</span>`);
      }
      if (p.orcid) {
        contents.push(
          html`
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
            html`
            (<a class="p-org org h-org h-card" href="${p.companyURL}"
              >${company}</a
            >)
          `
          );
        } else {
          contents.push(html`(${company})`);
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
          showError(
            "The date is invalid. The expected format is YYYY-MM-DD.",
            name$L,
            { title: "Invalid date" }
          );
        }
        timeElem.dateTime = toShortIsoDate(retiredDate);
        contents.push(html`- ${l10n.until.concat(" ")}${timeElem}`);
      }

      // @ts-ignore: html types only support Element but we use a DocumentFragment here
      html.bind(span)`${contents}`;
      dd.appendChild(span);
      return dd;
    }

    function getExtra(extra) {
      const span = html`<span class="${extra.class || null}"></span>`;
      let textContainer = span;
      if (extra.href) {
        textContainer = html`<a href="${extra.href}"></a>`;
        span.appendChild(textContainer);
      }
      textContainer.textContent = extra.name;
      return span;
    }
  };

  // @ts-check

  const localizationStrings$h = {
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

  const l10n$f = getIntlData(localizationStrings$h);

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
    return html`
    <div class="head">
      <div id="respec-banner">
        <span id="respec-banner-status">${conf.maturity}</span
        >&nbsp;&mdash;&nbsp;
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
          ? html`
              <dt>${l10n$f.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
              <dt>${l10n$f.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion
                  ? html`
                      <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                    `
                  : "none"}
              </dd>
            `
          : ""}
        ${conf.edDraftURI
          ? html`
              <dt>${l10n$f.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.testSuiteURI
          ? html`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? html`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.bugTrackerHTML
          ? html`
              <dt>${l10n$f.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            `
          : ""}
        ${conf.isED && conf.prevED
          ? html`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            `
          : ""}
        ${conf.showPreviousVersion
          ? html`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.prevRecURI
          ? ""
          : conf.isRec
          ? html`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `
          : html`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        <dt>${conf.multipleEditors ? l10n$f.editors : l10n$f.editor}</dt>
        ${showPeople(conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? html`
              <dt>
                ${conf.multipleFormerEditors
                  ? l10n$f.former_editors
                  : l10n$f.former_editor}
              </dt>
              ${showPeople(conf.formerEditors)}
            `
          : ""}
        ${conf.authors
          ? html`
              <dt>${conf.multipleAuthors ? l10n$f.authors : l10n$f.author}</dt>
              ${showPeople(conf.authors)}
            `
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
      ${conf.errata
        ? html`
            <p>
              Please check the
              <a href="${conf.errata}"><strong>errata</strong></a> for any
              errors or issues reported since publication.
            </p>
          `
        : ""}
      ${conf.alternateFormats
        ? html`
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
    return html`<a rel="license" href="${url}" class="${cssClass}">${text}</a>`;
  }

  function renderCopyright(conf) {
    return conf.isUnofficial
      ? conf.additionalCopyrightHolders
        ? html`<p class="copyright">${[conf.additionalCopyrightHolders]}</p>`
        : conf.overrideCopyright
        ? [conf.overrideCopyright]
        : html`
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
    return html`
    <p class="copyright">
      Copyright&copy;
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      <a href="http://www.pcisig.com">PCI-SIG</a>
      ${conf.additionalCopyrightHolders
        ? html`&amp; ${[conf.additionalCopyrightHolders]}`
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
    return html`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview ? renderPreview(conf) : ""}
    ${conf.isUnofficial
      ? renderIsUnofficial(opts)
      : conf.isTagFinding
      ? opts.additionalContent
      : conf.isNoTrack
      ? renderIsNoTrack(conf, opts)
      : html`
          <p><em>${[conf.l10n.status_at_publication]}</em></p>
          ${conf.isSubmission
            ? noteForSubmission(conf, opts)
            : html`
                ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${!conf.overrideStatus
                  ? html`
                      ${linkToWorkingGroup(conf)} ${linkToCommunity(conf, opts)}
                      ${conf.isCR || conf.isPER || conf.isPR
                        ? html`
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
                                ? html`
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
                                ? html`
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
                  ? html`<p>${[conf.addPatentNote]}</p>`
                  : ""}
              `}
        `}
    ${opts.additionalSections}
  `;
  };

  function renderPreview(conf) {
    const { prUrl, prNumber, edDraftURI } = conf;
    return html`
    <details class="annoying-warning" open="">
      <summary>
        This is a
        preview${prUrl && prNumber
          ? html`
              of pull request
              <a href="${prUrl}">#${prNumber}</a>
            `
          : ""}
      </summary>
      <p>
        Do not attempt to implement this version of the specification. Do not
        reference this version as authoritative in any way.
        ${edDraftURI
          ? html`
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
    return html`
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
    return html`
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
    return html`
    <p>
      Please see the Working Group's
      <a href="${implementationReportURI}">implementation report</a>.
    </p>
  `;
  }

  function renderNotRec(conf) {
    const { anOrA, textStatus } = conf;
    return html`
    <p>
      Publication as ${anOrA} ${textStatus} does not imply endorsement by the
      PCI-SIG Membership. This is a draft document and may be updated, replaced
      or obsoleted by other documents at any time. It is inappropriate to cite
      this document as other than work in progress.
    </p>
  `;
  }

  function noteForSubmission(conf, opts) {
    return html`
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
    return html`
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
    return html`
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
        ? html`
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
    return html`
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
    return html`
    <p>
      ${conf.github
        ? html`
            <a href="${conf.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `
        : ""}
      ${conf.wgPublicList
        ? html`
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
              ? html`
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

  const name$K = "pcisig/pcisig-headers";

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

  function run$H(conf) {
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
      const non_cc0 = licenses.keys.remove("cc0").remove("cc-by").toString();
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
        conf.prevStatus !== "none" &&
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

    const peopCheck = function (it) {
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
    // eslint-disable-next-line no-unused-vars
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
      conf.previousStatus !== "none" && !conf.isNoTrack && !conf.isSubmission;
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

    html.bind(sotd)`${populateSoTD(conf, sotd)}`;

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
    name: name$K,
    run: run$H
  });

  // @ts-check

  const name$J = "pcisig/footnotes";

  function run$G() {
    /** @type {NodeListOf<HTMLElement>} */
    const footnotes = document.querySelectorAll("span.footnote");
    footnotes.forEach((footnote, index) => {
      const id = addId(footnote, "footnote", `${index + 1}`);
      footnote.insertAdjacentHTML(
        "beforebegin",
        `<span class="footnote-online"> [</span>
       <label class="footnote-online for="${id}">Footnote:</label>
       <input class="footnote-checkbox footnote-online"
              type="checkbox"
              name="${id}"
              value="checked"/>`
      );
      footnote.insertAdjacentHTML(
        "afterend",
        `<span class="footnote-online">] </span>`
      );
    });
  }

  var footnotes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$J,
    run: run$G
  });

  // @ts-check

  const name$I = "pcisig/tablenotes";

  function run$F() {
    // console.log("in tablenotes");
    const tableid_to_notes_entries = new Map();
    //
    // find all tables that contain elements with index entries, go through them sequentially
    //
    const note_list = document.querySelectorAll("table span.tablenote");
    note_list.forEach(note => {
      // console.log(`tablenotes: note = ${note.outerHTML}`);
      /** @type {HTMLElement} */
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
    name: name$I,
    run: run$F
  });

  // @ts-check

  const name$H = "core/data-transform";

  function run$E() {
    /** @type {NodeListOf<HTMLElement>} */
    const transformables = document.querySelectorAll("[data-transform]");
    transformables.forEach(el => {
      el.innerHTML = runTransforms(el.innerHTML, el.dataset.transform);
      el.removeAttribute("data-transform");
    });
  }

  var dataTransform = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$H,
    run: run$E
  });

  // @ts-check
  const name$G = "core/dfn-abbr";

  function run$D() {
    /** @type {NodeListOf<HTMLElement>} */
    const elements = document.querySelectorAll("[data-abbr]");
    for (const elem of elements) {
      const { localName } = elem;
      switch (localName) {
        case "dfn":
          processDfnElement(elem);
          break;
        default: {
          const msg = `\`data-abbr\` attribute not supported on \`${localName}\` elements.`;
          showError(msg, name$G, {
            elements: [elem],
            title: "Error: unsupported.",
          });
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
    name: name$G,
    run: run$D
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
      return html`<a data-xref-type="_IDL_" data-link-type="idl"
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
    const element = html`${parent && renderParent ? "." : ""}<a
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
    const element = html`${renderParent ? "." : ""}<a
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
    const argsText = htmlJoinComma(args, arg => html`<var>${arg}</var>`);
    const searchText = `${identifier}(${args.join(", ")})`;
    const element = html`${parent && renderParent ? "." : ""}<a
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
    const element = html`"<a
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
    const element = html`"<a
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
    const element = html`<a
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
      const el = html`<span>{{ ${str} }}</span>`;
      const title = "Error: Invalid inline IDL string.";
      showError(error.message, "core/inlines", { title, elements: [el] });
      return el;
    }
    const render = html(document.createDocumentFragment());
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

  const bibrefsURL = new URL("https://specref.herokuapp.com/bibrefs?refs=");

  // Opportunistically dns-prefetch to bibref server, as we don't know yet
  // if we will actually need to download references yet.
  const link = createResourceHint({
    hint: "dns-prefetch",
    href: bibrefsURL.origin,
  });
  document.head.appendChild(link);

  /** @type {Promise<Conf['biblio']>} */
  const done = new Promise(resolve => {
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
    const biblio = await done;
    if (!biblio.hasOwnProperty(key)) {
      return null;
    }
    const entry = biblio[key];
    if (entry.aliasOf) {
      return await resolveRef(entry.aliasOf);
    }
    return entry;
  }

  // @ts-check

  const localizationStrings$g = {
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

  getIntlData(localizationStrings$g);

  Object.freeze({
    authors: [],
    date: "",
    href: "",
    publisher: "",
    status: "",
    title: "",
    etAl: false,
  });

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
    const elem = html`<cite
    ><a class="bibref" href="${href}" data-link-type="biblio">${text}</a></cite
  >`;
    return linkText ? elem : html`[${elem}]`;
  }

  // @ts-check

  const name$F = "core/inlines";
  const rfc2119Usage = {};

  const localizationStrings$f = {
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
  const l10n$e = getIntlData(localizationStrings$f);

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
    const code = html`<code
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
    const nodeElement = html`<em class="rfc2119">${value}</em>`;
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
      return html`<a data-cite="${ref}"></a>`;
    }
    if (document.querySelector(ref)) {
      return html`<a href="${ref}"></a>`;
    }
    const badReference = html`<span>${matched}</span>`;
    const msg = `Wasn't able to expand ${matched} as it didn't match any id in the document.`;
    const hint = `Please make sure there is element with id ${ref} in the document.`;
    showError(msg, name$F, { hint, elements: [badReference] });
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
      const msg = `Normative references in informative sections are not allowed. `;
      const hint = `Remove '!' from the start of the reference \`[[${ref}]]\``;
      showWarning(msg, name$F, { elements: [citeElem], hint });
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
      : html`<abbr title="${abbrMap.get(matched)}">${matched}</abbr>`;
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
    return html`<var data-type="${type}">${varName}</var>`;
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
    return html`<a
    data-link-type="dfn"
    data-link-for="${forContext}"
    data-xref-for="${forContext}"
    data-lt="${linkingText}"
    >${processedContent}</a
  >`;
  }

  function inlineCodeMatches(matched) {
    const clean = matched.slice(1, -1); // Chop ` and `
    return html`<code>${clean}</code>`;
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

  function run$C(conf) {
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
    const keywords = l10n$e.rfc2119Keywords();
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
    name: name$F,
    rfc2119Usage: rfc2119Usage,
    run: run$C
  });

  // @ts-check
  const name$E = "pcisig/pcisig-conformance";

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
    const content = html`
    <h2>Conformance</h2>
    <p>
      As well as sections marked as non-normative, all examples, implementation
      notes, and notes in this specification are non-normative. Everything else
      in this specification is normative.
    </p>
    ${terms.length
      ? html`
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

  function run$B() {
    const conformance = document.querySelector("section#conformance");
    if (conformance) {
      processConformance(conformance);
    }
  }

  var pcisigConformance = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$E,
    run: run$B
  });

  // Module pcisig/pre-dfn
  // Finds all <dfn> elements and adjust dfn-type attribute.

  const name$D = "pcisig/pre-dfn";

  function run$A() {
    const dfnClass = [
      "term",
      "argument",
      "bit",
      "command",
      "data",
      "data-block",
      "encoding",
      "enum",
      "field",
      "message",
      "msg",
      "op",
      "opcode",
      "operation",
      "parameter",
      "pin",
      "register",
      "regpict",
      "reply",
      "request",
      "response",
      "signal",
      "state",
      "value",
    ];

    document.querySelectorAll("dfn:not([data-dfn-type])").forEach(dfn => {
      let tag = dfnClass[0]; // default "term"
      dfnClass.forEach(t => {
        if (dfn.classList && dfn.classList.contains(t)) tag = t;
      });
      if (tag === "field") {
        dfn.setAttribute("data-dfn-idl", tag);
        dfn.setAttribute("data-dfn-type", "idl");
      } else {
        dfn.setAttribute("data-dfn-type", tag);
      }
    });
  }

  var preDfn = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$D,
    run: run$A
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
   * @param {Object} idlAst
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
   * @param {*} defn
   * @param {string} parent
   * @param {...string} names
   */
  function findNormalDfn(defn, parent, ...names) {
    const { type } = defn;
    for (const name of names) {
      let resolvedName =
        type === "enum-value" && name === "" ? "the-empty-string" : name;
      let dfns = getDfns(resolvedName, parent, name, type);
      // If we haven't found any definitions with explicit [for]
      // and [title], look for a dotted definition, "parent.name".
      if (dfns.length === 0 && parent !== "") {
        resolvedName = `${parent}.${resolvedName}`;
        const alternativeDfns = definitionMap.get(resolvedName);
        if (alternativeDfns && alternativeDfns.size === 1) {
          dfns = [...alternativeDfns];
          registerDefinition(dfns[0], [resolvedName]);
        }
      } else {
        resolvedName = name;
      }
      if (dfns.length > 1) {
        const msg = `WebIDL identifier \`${name}\` ${
        parent ? `for \`${parent}\`` : ""
      } is defined multiple times`;
        const title = "Duplicate definition.";
        showError(msg, name, { title, elements: dfns });
      }
      if (dfns.length) {
        return dfns[0];
      }
    }
  }

  /**
   * @param {HTMLElement} dfnElem
   * @param {*} idlAst
   * @param {string} parent
   * @param {string} name
   */
  function decorateDfn(dfnElem, idlAst, parent, name) {
    if (!dfnElem.id) {
      const lCaseParent = parent.toLowerCase().replace(/\s/g, "-");
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
      wrapInner(dfnElem, code);
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
   * @param {string} name
   * @param {string} parent data-dfn-for
   * @param {string} originalName
   * @param {string} type
   */
  function getDfns(name, parent, originalName, type) {
    const foundDfns = definitionMap.get(name);
    if (!foundDfns || foundDfns.size === 0) {
      return [];
    }
    const dfnForArray = [...foundDfns];
    // Definitions that have a name and [data-dfn-for] that exactly match the
    // IDL entity:
    const dfns = dfnForArray.filter(dfn => {
      // This is explicitly marked as a concept, so we can't use it
      if (dfn.dataset.dfnType === "dfn") return false;

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
  function getDataType(idlStruct = {}) {
    const { idlType, generic, union } = idlStruct;
    if (idlType === undefined) return "";
    if (typeof idlType === "string") return idlType;
    if (generic) return generic;
    // join on "|" handles for "unsigned short" etc.
    if (union) return idlType.map(getDataType).join("|");
    return getDataType(idlType);
  }

  // @ts-check

  const name$C = "pcisig/draw-csrs";

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
                const new_row = html`
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
          const new_row = html`
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
        const new_row = html`
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
      // console.log(`draw_csrs.parse_table 1 json.figName = ${json.figName}`);
    } else {
      if (tbl.hasAttribute("title")) {
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
      tbl.setAttribute("id", `tbl-${json.figName}`);
      // console.log(`draw_csrs.parse_table 2 json.figName = ${json.figName}`);
    }
    if (tbl.hasAttribute("data-json")) {
      try {
        mergeJSON$1(json, tbl.getAttribute("data-json"));
      } catch {
        showError("Invalid data-json attribute on <table>", name$C);
      }
    }

    if (!tbl.hasAttribute("id")) {
      tbl.setAttribute("id", `tbl-${json.figName}`);
    }
    // console.log(`core/draw-csrs table id="${tbl.getAttribute("id")}"`);
    if (!tbl.hasAttribute("dfn-data-for")) {
      tbl.setAttribute("data-dfn-for", json.figName);
      // console.log(`draw_csrs.parse_table 3 tbl.data-dfn-for = ${json.figName}`);
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
          /** @type {HTMLElement} */
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
          // console.log(`draw_csrs.parse_table 4 addID = ${dfn.outerHTML}`);
          addId(dfn, "field", `${json.figName}-${fieldName.toLowerCase()}`);
          // console.log(`draw_csrs.parse_table 5 addID = ${dfn.outerHTML}`);
          decorateDfn(
            // @ts-ignore
            dfn,
            { type: "field", generic: "field" },
            tblName,
            fieldName
          );
          // console.log(`draw_csrs.decorateDfn(${dfn.outerHTML})`);
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
  function mergeJSON$1(target, inputSrc) {
    const src = typeof inputSrc !== "string" ? inputSrc : JSON.parse(inputSrc);
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (typeof src[prop] === "object" && !!src[prop]) {
          target[prop] = mergeJSON$1(target, src[prop]);
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
  async function run$z() {
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
                id="fig-${tbl.getAttribute("id").replace(/^tbl-/, "")}">
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
    name: name$C,
    insert_unused_table_rows: insert_unused_table_rows,
    parse_table: parse_table,
    run: run$z
  });

  const methods$1 = {};
  const names = [];
  function registerMethods (name, m) {
    if (Array.isArray(name)) {
      for (const _name of name) {
        registerMethods(_name, m);
      }
      return
    }
    if (typeof name === 'object') {
      for (const _name in name) {
        registerMethods(_name, name[_name]);
      }
      return
    }
    addMethodNames(Object.getOwnPropertyNames(m));
    methods$1[name] = Object.assign(methods$1[name] || {}, m);
  }
  function getMethodsFor (name) {
    return methods$1[name] || {}
  }
  function getMethodNames () {
    return [ ...new Set(names) ]
  }
  function addMethodNames (_names) {
    names.push(..._names);
  }

  function map (array, block) {
    var i;
    var il = array.length;
    var result = [];
    for (i = 0; i < il; i++) {
      result.push(block(array[i]));
    }
    return result
  }
  function radians (d) {
    return d % 360 * Math.PI / 180
  }
  function camelCase (s) {
    return s.toLowerCase().replace(/-(.)/g, function (m, g) {
      return g.toUpperCase()
    })
  }
  function unCamelCase (s) {
    return s.replace(/([A-Z])/g, function (m, g) {
      return '-' + g.toLowerCase()
    })
  }
  function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  function proportionalSize (element, width, height, box) {
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
    }
  }
  function getOrigin (o, element) {
    const origin = o.origin;
    let ox, oy;
    if (typeof origin === 'string' || origin == null) {
      const string = (origin || 'center').toLowerCase().trim();
      const { height, width, x, y } = element.bbox();
      const bx = string.includes('left') ? x
        : string.includes('right') ? x + width
        : x + width / 2;
      const by = string.includes('top') ? y
        : string.includes('bottom') ? y + height
        : y + height / 2;
      ox = o.ox != null ? o.ox : bx;
      oy = o.oy != null ? o.oy : by;
    } else {
      ox = origin[0];
      oy = origin[1];
    }
    return [ ox, oy ]
  }

  const ns = 'http://www.w3.org/2000/svg';
  const xmlns = 'http://www.w3.org/2000/xmlns/';
  const xlink = 'http://www.w3.org/1999/xlink';
  const svgjs = 'http://svgjs.com/svgjs';

  const globals = {
    window: typeof window === 'undefined' ? null : window,
    document: typeof document === 'undefined' ? null : document
  };

  class Base {
  }

  const elements = {};
  const root = '___SYMBOL___ROOT___';
  function create (name) {
    return globals.document.createElementNS(ns, name)
  }
  function makeInstance (element) {
    if (element instanceof Base) return element
    if (typeof element === 'object') {
      return adopter(element)
    }
    if (element == null) {
      return new elements[root]()
    }
    if (typeof element === 'string' && element.charAt(0) !== '<') {
      return adopter(globals.document.querySelector(element))
    }
    var node = create('svg');
    node.innerHTML = element;
    element = adopter(node.firstChild);
    return element
  }
  function nodeOrNew (name, node) {
    return node instanceof globals.window.Node ? node : create(name)
  }
  function adopt (node) {
    if (!node) return null
    if (node.instance instanceof Base) return node.instance
    var className = capitalize(node.nodeName || 'Dom');
    if (className === 'LinearGradient' || className === 'RadialGradient') {
      className = 'Gradient';
    } else if (!elements[className]) {
      className = 'Dom';
    }
    return new elements[className](node)
  }
  let adopter = adopt;
  function register (element, name = element.name, asRoot = false) {
    elements[name] = element;
    if (asRoot) elements[root] = element;
    addMethodNames(Object.getOwnPropertyNames(element.prototype));
    return element
  }
  function getClass (name) {
    return elements[name]
  }
  let did = 1000;
  function eid (name) {
    return 'Svgjs' + capitalize(name) + (did++)
  }
  function assignNewId (node) {
    for (var i = node.children.length - 1; i >= 0; i--) {
      assignNewId(node.children[i]);
    }
    if (node.id) {
      return adopt(node).id(eid(node.nodeName))
    }
    return adopt(node)
  }
  function extend (modules, methods, attrCheck) {
    var key, i;
    modules = Array.isArray(modules) ? modules : [ modules ];
    for (i = modules.length - 1; i >= 0; i--) {
      for (key in methods) {
        let method = methods[key];
        if (attrCheck) {
          method = wrapWithAttrCheck(methods[key]);
        }
        modules[i].prototype[key] = method;
      }
    }
  }
  function wrapWithAttrCheck (fn) {
    return function (...args) {
      const o = args[args.length - 1];
      if (o && o.constructor === Object && !(o instanceof Array)) {
        return fn.apply(this, args.slice(0, -1)).attr(o)
      } else {
        return fn.apply(this, args)
      }
    }
  }

  function siblings () {
    return this.parent().children()
  }
  function position () {
    return this.parent().index(this)
  }
  function next () {
    return this.siblings()[this.position() + 1]
  }
  function prev () {
    return this.siblings()[this.position() - 1]
  }
  function forward () {
    var i = this.position() + 1;
    var p = this.parent();
    p.removeElement(this).add(this, i);
    if (typeof p.isRoot === 'function' && p.isRoot()) {
      p.node.appendChild(p.defs().node);
    }
    return this
  }
  function backward () {
    var i = this.position();
    if (i > 0) {
      this.parent().removeElement(this).add(this, i - 1);
    }
    return this
  }
  function front () {
    var p = this.parent();
    p.node.appendChild(this.node);
    if (typeof p.isRoot === 'function' && p.isRoot()) {
      p.node.appendChild(p.defs().node);
    }
    return this
  }
  function back () {
    if (this.position() > 0) {
      this.parent().removeElement(this).add(this, 0);
    }
    return this
  }
  function before (element) {
    element = makeInstance(element);
    element.remove();
    var i = this.position();
    this.parent().add(element, i);
    return this
  }
  function after (element) {
    element = makeInstance(element);
    element.remove();
    var i = this.position();
    this.parent().add(element, i + 1);
    return this
  }
  function insertBefore (element) {
    element = makeInstance(element);
    element.before(this);
    return this
  }
  function insertAfter (element) {
    element = makeInstance(element);
    element.after(this);
    return this
  }
  registerMethods('Dom', {
    siblings,
    position,
    next,
    prev,
    forward,
    backward,
    front,
    back,
    before,
    after,
    insertBefore,
    insertAfter
  });

  const numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i;
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const rgb = /rgb\((\d+),(\d+),(\d+)\)/;
  const reference = /(#[a-z0-9\-_]+)/i;
  const transforms = /\)\s*,?\s*/;
  const whitespace = /\s/g;
  const isHex = /^#[a-f0-9]{3,6}$/i;
  const isRgb = /^rgb\(/;
  const isBlank = /^(\s+)?$/;
  const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  const isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i;
  const delimiter = /[\s,]+/;
  const hyphen = /([^e])-/gi;
  const pathLetters = /[MLHVCSQTAZ]/gi;
  const isPathLetter = /[MLHVCSQTAZ]/i;
  const numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi;
  const dots = /\./g;

  function classes () {
    var attr = this.attr('class');
    return attr == null ? [] : attr.trim().split(delimiter)
  }
  function hasClass (name) {
    return this.classes().indexOf(name) !== -1
  }
  function addClass (name) {
    if (!this.hasClass(name)) {
      var array = this.classes();
      array.push(name);
      this.attr('class', array.join(' '));
    }
    return this
  }
  function removeClass (name) {
    if (this.hasClass(name)) {
      this.attr('class', this.classes().filter(function (c) {
        return c !== name
      }).join(' '));
    }
    return this
  }
  function toggleClass (name) {
    return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
  }
  registerMethods('Dom', {
    classes, hasClass, addClass, removeClass, toggleClass
  });

  function css (style, val) {
    const ret = {};
    if (arguments.length === 0) {
      this.node.style.cssText.split(/\s*;\s*/)
        .filter(function (el) {
          return !!el.length
        })
        .forEach(function (el) {
          const t = el.split(/\s*:\s*/);
          ret[t[0]] = t[1];
        });
      return ret
    }
    if (arguments.length < 2) {
      if (Array.isArray(style)) {
        for (const name of style) {
          const cased = camelCase(name);
          ret[cased] = this.node.style[cased];
        }
        return ret
      }
      if (typeof style === 'string') {
        return this.node.style[camelCase(style)]
      }
      if (typeof style === 'object') {
        for (const name in style) {
          this.node.style[camelCase(name)]
            = (style[name] == null || isBlank.test(style[name])) ? '' : style[name];
        }
      }
    }
    if (arguments.length === 2) {
      this.node.style[camelCase(style)]
        = (val == null || isBlank.test(val)) ? '' : val;
    }
    return this
  }
  function show$2 () {
    return this.css('display', '')
  }
  function hide () {
    return this.css('display', 'none')
  }
  function visible () {
    return this.css('display') !== 'none'
  }
  registerMethods('Dom', {
    css, show: show$2, hide, visible
  });

  function data (a, v, r) {
    if (typeof a === 'object') {
      for (v in a) {
        this.data(v, a[v]);
      }
    } else if (arguments.length < 2) {
      try {
        return JSON.parse(this.attr('data-' + a))
      } catch (e) {
        return this.attr('data-' + a)
      }
    } else {
      this.attr('data-' + a,
        v === null ? null
        : r === true || typeof v === 'string' || typeof v === 'number' ? v
        : JSON.stringify(v)
      );
    }
    return this
  }
  registerMethods('Dom', { data });

  function remember (k, v) {
    if (typeof arguments[0] === 'object') {
      for (var key in k) {
        this.remember(key, k[key]);
      }
    } else if (arguments.length === 1) {
      return this.memory()[k]
    } else {
      this.memory()[k] = v;
    }
    return this
  }
  function forget () {
    if (arguments.length === 0) {
      this._memory = {};
    } else {
      for (var i = arguments.length - 1; i >= 0; i--) {
        delete this.memory()[arguments[i]];
      }
    }
    return this
  }
  function memory () {
    return (this._memory = this._memory || {})
  }
  registerMethods('Dom', { remember, forget, memory });

  let listenerId = 0;
  const windowEvents = {};
  function getEvents (instance) {
    let n = instance.getEventHolder();
    if (n === globals.window) n = windowEvents;
    if (!n.events) n.events = {};
    return n.events
  }
  function getEventTarget (instance) {
    return instance.getEventTarget()
  }
  function clearEvents (instance) {
    const n = instance.getEventHolder();
    if (n.events) n.events = {};
  }
  function on (node, events, listener, binding, options) {
    var l = listener.bind(binding || node);
    var instance = makeInstance(node);
    var bag = getEvents(instance);
    var n = getEventTarget(instance);
    events = Array.isArray(events) ? events : events.split(delimiter);
    if (!listener._svgjsListenerId) {
      listener._svgjsListenerId = ++listenerId;
    }
    events.forEach(function (event) {
      var ev = event.split('.')[0];
      var ns = event.split('.')[1] || '*';
      bag[ev] = bag[ev] || {};
      bag[ev][ns] = bag[ev][ns] || {};
      bag[ev][ns][listener._svgjsListenerId] = l;
      n.addEventListener(ev, l, options || false);
    });
  }
  function off (node, events, listener, options) {
    var instance = makeInstance(node);
    var bag = getEvents(instance);
    var n = getEventTarget(instance);
    if (typeof listener === 'function') {
      listener = listener._svgjsListenerId;
      if (!listener) return
    }
    events = Array.isArray(events) ? events : (events || '').split(delimiter);
    events.forEach(function (event) {
      var ev = event && event.split('.')[0];
      var ns = event && event.split('.')[1];
      var namespace, l;
      if (listener) {
        if (bag[ev] && bag[ev][ns || '*']) {
          n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
          delete bag[ev][ns || '*'][listener];
        }
      } else if (ev && ns) {
        if (bag[ev] && bag[ev][ns]) {
          for (l in bag[ev][ns]) {
            off(n, [ ev, ns ].join('.'), l);
          }
          delete bag[ev][ns];
        }
      } else if (ns) {
        for (event in bag) {
          for (namespace in bag[event]) {
            if (ns === namespace) {
              off(n, [ event, ns ].join('.'));
            }
          }
        }
      } else if (ev) {
        if (bag[ev]) {
          for (namespace in bag[ev]) {
            off(n, [ ev, namespace ].join('.'));
          }
          delete bag[ev];
        }
      } else {
        for (event in bag) {
          off(n, event);
        }
        clearEvents(instance);
      }
    });
  }
  function dispatch (node, event, data) {
    var n = getEventTarget(node);
    if (event instanceof globals.window.Event) {
      n.dispatchEvent(event);
    } else {
      event = new globals.window.CustomEvent(event, { detail: data, cancelable: true });
      n.dispatchEvent(event);
    }
    return event
  }

  function sixDigitHex (hex) {
    return hex.length === 4
      ? [ '#',
        hex.substring(1, 2), hex.substring(1, 2),
        hex.substring(2, 3), hex.substring(2, 3),
        hex.substring(3, 4), hex.substring(3, 4)
      ].join('')
      : hex
  }
  function componentHex (component) {
    const integer = Math.round(component);
    const bounded = Math.max(0, Math.min(255, integer));
    const hex = bounded.toString(16);
    return hex.length === 1 ? '0' + hex : hex
  }
  function is (object, space) {
    for (let i = space.length; i--;) {
      if (object[space[i]] == null) {
        return false
      }
    }
    return true
  }
  function getParameters (a, b) {
    const params = is(a, 'rgb') ? { _a: a.r, _b: a.g, _c: a.b, space: 'rgb' }
      : is(a, 'xyz') ? { _a: a.x, _b: a.y, _c: a.z, _d: 0, space: 'xyz' }
      : is(a, 'hsl') ? { _a: a.h, _b: a.s, _c: a.l, _d: 0, space: 'hsl' }
      : is(a, 'lab') ? { _a: a.l, _b: a.a, _c: a.b, _d: 0, space: 'lab' }
      : is(a, 'lch') ? { _a: a.l, _b: a.c, _c: a.h, _d: 0, space: 'lch' }
      : is(a, 'cmyk') ? { _a: a.c, _b: a.m, _c: a.y, _d: a.k, space: 'cmyk' }
      : { _a: 0, _b: 0, _c: 0, space: 'rgb' };
    params.space = b || params.space;
    return params
  }
  function cieSpace (space) {
    if (space === 'lab' || space === 'xyz' || space === 'lch') {
      return true
    } else {
      return false
    }
  }
  function hueToRgb (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  class Color {
    constructor (...inputs) {
      this.init(...inputs);
    }
    init (a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
      a = !a ? 0 : a;
      if (this.space) {
        for (const component in this.space) {
          delete this[this.space[component]];
        }
      }
      if (typeof a === 'number') {
        space = typeof d === 'string' ? d : space;
        d = typeof d === 'string' ? 0 : d;
        Object.assign(this, { _a: a, _b: b, _c: c, _d: d, space });
      } else if (a instanceof Array) {
        this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
        Object.assign(this, { _a: a[0], _b: a[1], _c: a[2], _d: a[3] || 0 });
      } else if (a instanceof Object) {
        const values = getParameters(a, b);
        Object.assign(this, values);
      } else if (typeof a === 'string') {
        if (isRgb.test(a)) {
          const noWhitespace = a.replace(whitespace, '');
          const [ _a, _b, _c ] = rgb.exec(noWhitespace)
            .slice(1, 4).map(v => parseInt(v));
          Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' });
        } else if (isHex.test(a)) {
          const hexParse = v => parseInt(v, 16);
          const [ , _a, _b, _c ] = hex.exec(sixDigitHex(a)).map(hexParse);
          Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' });
        } else throw Error('Unsupported string format, can\'t construct Color')
      }
      const { _a, _b, _c, _d } = this;
      const components = this.space === 'rgb' ? { r: _a, g: _b, b: _c }
        : this.space === 'xyz' ? { x: _a, y: _b, z: _c }
        : this.space === 'hsl' ? { h: _a, s: _b, l: _c }
        : this.space === 'lab' ? { l: _a, a: _b, b: _c }
        : this.space === 'lch' ? { l: _a, c: _b, h: _c }
        : this.space === 'cmyk' ? { c: _a, m: _b, y: _c, k: _d }
        : {};
      Object.assign(this, components);
    }
    rgb () {
      if (this.space === 'rgb') {
        return this
      } else if (cieSpace(this.space)) {
        let { x, y, z } = this;
        if (this.space === 'lab' || this.space === 'lch') {
          let { l, a, b } = this;
          if (this.space === 'lch') {
            const { c, h } = this;
            const dToR = Math.PI / 180;
            a = c * Math.cos(dToR * h);
            b = c * Math.sin(dToR * h);
          }
          const yL = (l + 16) / 116;
          const xL = a / 500 + yL;
          const zL = yL - b / 200;
          const ct = 16 / 116;
          const mx = 0.008856;
          const nm = 7.787;
          x = 0.95047 * ((xL ** 3 > mx) ? xL ** 3 : (xL - ct) / nm);
          y = 1.00000 * ((yL ** 3 > mx) ? yL ** 3 : (yL - ct) / nm);
          z = 1.08883 * ((zL ** 3 > mx) ? zL ** 3 : (zL - ct) / nm);
        }
        const rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
        const gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
        const bU = x * 0.0557 + y * -0.2040 + z * 1.0570;
        const pow = Math.pow;
        const bd = 0.0031308;
        const r = (rU > bd) ? (1.055 * pow(rU, 1 / 2.4) - 0.055) : 12.92 * rU;
        const g = (gU > bd) ? (1.055 * pow(gU, 1 / 2.4) - 0.055) : 12.92 * gU;
        const b = (bU > bd) ? (1.055 * pow(bU, 1 / 2.4) - 0.055) : 12.92 * bU;
        const color = new Color(255 * r, 255 * g, 255 * b);
        return color
      } else if (this.space === 'hsl') {
        let { h, s, l } = this;
        h /= 360;
        s /= 100;
        l /= 100;
        if (s === 0) {
          l *= 255;
          const color = new Color(l, l, l);
          return color
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const r = 255 * hueToRgb(p, q, h + 1 / 3);
        const g = 255 * hueToRgb(p, q, h);
        const b = 255 * hueToRgb(p, q, h - 1 / 3);
        const color = new Color(r, g, b);
        return color
      } else if (this.space === 'cmyk') {
        const { c, m, y, k } = this;
        const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
        const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
        const b = 255 * (1 - Math.min(1, y * (1 - k) + k));
        const color = new Color(r, g, b);
        return color
      } else {
        return this
      }
    }
    lab () {
      const { x, y, z } = this.xyz();
      const l = (116 * y) - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      const color = new Color(l, a, b, 'lab');
      return color
    }
    xyz () {
      const { _a: r255, _b: g255, _c: b255 } = this.rgb();
      const [ r, g, b ] = [ r255, g255, b255 ].map(v => v / 255);
      const rL = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      const gL = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      const bL = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
      const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
      const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883;
      const x = (xU > 0.008856) ? Math.pow(xU, 1 / 3) : (7.787 * xU) + 16 / 116;
      const y = (yU > 0.008856) ? Math.pow(yU, 1 / 3) : (7.787 * yU) + 16 / 116;
      const z = (zU > 0.008856) ? Math.pow(zU, 1 / 3) : (7.787 * zU) + 16 / 116;
      const color = new Color(x, y, z, 'xyz');
      return color
    }
    lch () {
      const { l, a, b } = this.lab();
      const c = Math.sqrt(a ** 2 + b ** 2);
      let h = 180 * Math.atan2(b, a) / Math.PI;
      if (h < 0) {
        h *= -1;
        h = 360 - h;
      }
      const color = new Color(l, c, h, 'lch');
      return color
    }
    hsl () {
      const { _a, _b, _c } = this.rgb();
      const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const isGrey = max === min;
      const delta = max - min;
      const s = isGrey ? 0
        : l > 0.5 ? delta / (2 - max - min)
        : delta / (max + min);
      const h = isGrey ? 0
        : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6
        : max === g ? ((b - r) / delta + 2) / 6
        : max === b ? ((r - g) / delta + 4) / 6
        : 0;
      const color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
      return color
    }
    cmyk () {
      const { _a, _b, _c } = this.rgb();
      const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255);
      const k = Math.min(1 - r, 1 - g, 1 - b);
      if (k === 1) {
        return new Color(0, 0, 0, 1, 'cmyk')
      }
      const c = (1 - r - k) / (1 - k);
      const m = (1 - g - k) / (1 - k);
      const y = (1 - b - k) / (1 - k);
      const color = new Color(c, m, y, k, 'cmyk');
      return color
    }
    _clamped () {
      const { _a, _b, _c } = this.rgb();
      const { max, min, round } = Math;
      const format = v => max(0, min(round(v), 255));
      return [ _a, _b, _c ].map(format)
    }
    toHex () {
      const [ r, g, b ] = this._clamped().map(componentHex);
      return `#${r}${g}${b}`
    }
    toString () {
      return this.toHex()
    }
    toRgb () {
      const [ rV, gV, bV ] = this._clamped();
      const string = `rgb(${rV},${gV},${bV})`;
      return string
    }
    toArray () {
      const { _a, _b, _c, _d, space } = this;
      return [ _a, _b, _c, _d, space ]
    }
    static random (mode = 'vibrant', t, u) {
      const { random, round, sin, PI: pi } = Math;
      if (mode === 'vibrant') {
        const l = (81 - 57) * random() + 57;
        const c = (83 - 45) * random() + 45;
        const h = 360 * random();
        const color = new Color(l, c, h, 'lch');
        return color
      } else if (mode === 'sine') {
        t = t == null ? random() : t;
        const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
        const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
        const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
        const color = new Color(r, g, b);
        return color
      } else if (mode === 'pastel') {
        const l = (94 - 86) * random() + 86;
        const c = (26 - 9) * random() + 9;
        const h = 360 * random();
        const color = new Color(l, c, h, 'lch');
        return color
      } else if (mode === 'dark') {
        const l = 10 + 10 * random();
        const c = (125 - 75) * random() + 86;
        const h = 360 * random();
        const color = new Color(l, c, h, 'lch');
        return color
      } else if (mode === 'rgb') {
        const r = 255 * random();
        const g = 255 * random();
        const b = 255 * random();
        const color = new Color(r, g, b);
        return color
      } else if (mode === 'lab') {
        const l = 100 * random();
        const a = 256 * random() - 128;
        const b = 256 * random() - 128;
        const color = new Color(l, a, b, 'lab');
        return color
      } else if (mode === 'grey') {
        const grey = 255 * random();
        const color = new Color(grey, grey, grey);
        return color
      }
    }
    static test (color) {
      return (typeof color === 'string')
        && (isHex.test(color) || isRgb.test(color))
    }
    static isRgb (color) {
      return color && typeof color.r === 'number'
        && typeof color.g === 'number'
        && typeof color.b === 'number'
    }
    static isColor (color) {
      return color && (
        color instanceof Color
        || this.isRgb(color)
        || this.test(color)
      )
    }
  }

  class Point {
    constructor (...args) {
      this.init(...args);
    }
    init (x, y) {
      const base = { x: 0, y: 0 };
      const source = Array.isArray(x) ? { x: x[0], y: x[1] }
        : typeof x === 'object' ? { x: x.x, y: x.y }
        : { x: x, y: y };
      this.x = source.x == null ? base.x : source.x;
      this.y = source.y == null ? base.y : source.y;
      return this
    }
    clone () {
      return new Point(this)
    }
    transform (m) {
      return this.clone().transformO(m)
    }
    transformO (m) {
      if (!Matrix.isMatrixLike(m)) {
        m = new Matrix(m);
      }
      const { x, y } = this;
      this.x = m.a * x + m.c * y + m.e;
      this.y = m.b * x + m.d * y + m.f;
      return this
    }
    toArray () {
      return [ this.x, this.y ]
    }
  }
  function point (x, y) {
    return new Point(x, y).transform(this.screenCTM().inverse())
  }

  function closeEnough (a, b, threshold) {
    return Math.abs(b - a) < (threshold || 1e-6)
  }
  class Matrix {
    constructor (...args) {
      this.init(...args);
    }
    init (source) {
      var base = Matrix.fromArray([ 1, 0, 0, 1, 0, 0 ]);
      source = source instanceof Element$1 ? source.matrixify()
        : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat))
        : Array.isArray(source) ? Matrix.fromArray(source)
        : (typeof source === 'object' && Matrix.isMatrixLike(source)) ? source
        : (typeof source === 'object') ? new Matrix().transform(source)
        : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments))
        : base;
      this.a = source.a != null ? source.a : base.a;
      this.b = source.b != null ? source.b : base.b;
      this.c = source.c != null ? source.c : base.c;
      this.d = source.d != null ? source.d : base.d;
      this.e = source.e != null ? source.e : base.e;
      this.f = source.f != null ? source.f : base.f;
      return this
    }
    clone () {
      return new Matrix(this)
    }
    transform (o) {
      if (Matrix.isMatrixLike(o)) {
        var matrix = new Matrix(o);
        return matrix.multiplyO(this)
      }
      var t = Matrix.formatTransforms(o);
      var current = this;
      const { x: ox, y: oy } = new Point(t.ox, t.oy).transform(current);
      var transformer = new Matrix()
        .translateO(t.rx, t.ry)
        .lmultiplyO(current)
        .translateO(-ox, -oy)
        .scaleO(t.scaleX, t.scaleY)
        .skewO(t.skewX, t.skewY)
        .shearO(t.shear)
        .rotateO(t.theta)
        .translateO(ox, oy);
      if (isFinite(t.px) || isFinite(t.py)) {
        const origin = new Point(ox, oy).transform(transformer);
        const dx = t.px ? t.px - origin.x : 0;
        const dy = t.py ? t.py - origin.y : 0;
        transformer.translateO(dx, dy);
      }
      transformer.translateO(t.tx, t.ty);
      return transformer
    }
    compose (o) {
      if (o.origin) {
        o.originX = o.origin[0];
        o.originY = o.origin[1];
      }
      var ox = o.originX || 0;
      var oy = o.originY || 0;
      var sx = o.scaleX || 1;
      var sy = o.scaleY || 1;
      var lam = o.shear || 0;
      var theta = o.rotate || 0;
      var tx = o.translateX || 0;
      var ty = o.translateY || 0;
      var result = new Matrix()
        .translateO(-ox, -oy)
        .scaleO(sx, sy)
        .shearO(lam)
        .rotateO(theta)
        .translateO(tx, ty)
        .lmultiplyO(this)
        .translateO(ox, oy);
      return result
    }
    decompose (cx = 0, cy = 0) {
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f;
      var determinant = a * d - b * c;
      var ccw = determinant > 0 ? 1 : -1;
      var sx = ccw * Math.sqrt(a * a + b * b);
      var thetaRad = Math.atan2(ccw * b, ccw * a);
      var theta = 180 / Math.PI * thetaRad;
      var ct = Math.cos(thetaRad);
      var st = Math.sin(thetaRad);
      var lam = (a * c + b * d) / determinant;
      var sy = ((c * sx) / (lam * a - b)) || ((d * sx) / (lam * b + a));
      const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
      const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy);
      return {
        scaleX: sx,
        scaleY: sy,
        shear: lam,
        rotate: theta,
        translateX: tx,
        translateY: ty,
        originX: cx,
        originY: cy,
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      }
    }
    multiply (matrix) {
      return this.clone().multiplyO(matrix)
    }
    multiplyO (matrix) {
      var l = this;
      var r = matrix instanceof Matrix
        ? matrix
        : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this)
    }
    lmultiply (matrix) {
      return this.clone().lmultiplyO(matrix)
    }
    lmultiplyO (matrix) {
      var r = this;
      var l = matrix instanceof Matrix
        ? matrix
        : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this)
    }
    inverseO () {
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f;
      var det = a * d - b * c;
      if (!det) throw new Error('Cannot invert ' + this)
      var na = d / det;
      var nb = -b / det;
      var nc = -c / det;
      var nd = a / det;
      var ne = -(na * e + nc * f);
      var nf = -(nb * e + nd * f);
      this.a = na;
      this.b = nb;
      this.c = nc;
      this.d = nd;
      this.e = ne;
      this.f = nf;
      return this
    }
    inverse () {
      return this.clone().inverseO()
    }
    translate (x, y) {
      return this.clone().translateO(x, y)
    }
    translateO (x, y) {
      this.e += x || 0;
      this.f += y || 0;
      return this
    }
    scale (x, y, cx, cy) {
      return this.clone().scaleO(...arguments)
    }
    scaleO (x, y = x, cx = 0, cy = 0) {
      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      }
      const { a, b, c, d, e, f } = this;
      this.a = a * x;
      this.b = b * y;
      this.c = c * x;
      this.d = d * y;
      this.e = e * x - cx * x + cx;
      this.f = f * y - cy * y + cy;
      return this
    }
    rotate (r, cx, cy) {
      return this.clone().rotateO(r, cx, cy)
    }
    rotateO (r, cx = 0, cy = 0) {
      r = radians(r);
      const cos = Math.cos(r);
      const sin = Math.sin(r);
      const { a, b, c, d, e, f } = this;
      this.a = a * cos - b * sin;
      this.b = b * cos + a * sin;
      this.c = c * cos - d * sin;
      this.d = d * cos + c * sin;
      this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
      this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
      return this
    }
    flip (axis, around) {
      return this.clone().flipO(axis, around)
    }
    flipO (axis, around) {
      return axis === 'x' ? this.scaleO(-1, 1, around, 0)
        : axis === 'y' ? this.scaleO(1, -1, 0, around)
        : this.scaleO(-1, -1, axis, around || axis)
    }
    shear (a, cx, cy) {
      return this.clone().shearO(a, cx, cy)
    }
    shearO (lx, cx = 0, cy = 0) {
      const { a, b, c, d, e, f } = this;
      this.a = a + b * lx;
      this.c = c + d * lx;
      this.e = e + f * lx - cy * lx;
      return this
    }
    skew (x, y, cx, cy) {
      return this.clone().skewO(...arguments)
    }
    skewO (x, y = x, cx = 0, cy = 0) {
      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      }
      x = radians(x);
      y = radians(y);
      const lx = Math.tan(x);
      const ly = Math.tan(y);
      const { a, b, c, d, e, f } = this;
      this.a = a + b * lx;
      this.b = b + a * ly;
      this.c = c + d * lx;
      this.d = d + c * ly;
      this.e = e + f * lx - cy * lx;
      this.f = f + e * ly - cx * ly;
      return this
    }
    skewX (x, cx, cy) {
      return this.skew(x, 0, cx, cy)
    }
    skewXO (x, cx, cy) {
      return this.skewO(x, 0, cx, cy)
    }
    skewY (y, cx, cy) {
      return this.skew(0, y, cx, cy)
    }
    skewYO (y, cx, cy) {
      return this.skewO(0, y, cx, cy)
    }
    aroundO (cx, cy, matrix) {
      var dx = cx || 0;
      var dy = cy || 0;
      return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy)
    }
    around (cx, cy, matrix) {
      return this.clone().aroundO(cx, cy, matrix)
    }
    equals (other) {
      var comp = new Matrix(other);
      return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b)
        && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d)
        && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f)
    }
    toString () {
      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')'
    }
    toArray () {
      return [ this.a, this.b, this.c, this.d, this.e, this.f ]
    }
    valueOf () {
      return {
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      }
    }
    static fromArray (a) {
      return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
    }
    static isMatrixLike (o) {
      return (
        o.a != null
        || o.b != null
        || o.c != null
        || o.d != null
        || o.e != null
        || o.f != null
      )
    }
    static formatTransforms (o) {
      var flipBoth = o.flip === 'both' || o.flip === true;
      var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
      var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
      var skewX = o.skew && o.skew.length ? o.skew[0]
        : isFinite(o.skew) ? o.skew
        : isFinite(o.skewX) ? o.skewX
        : 0;
      var skewY = o.skew && o.skew.length ? o.skew[1]
        : isFinite(o.skew) ? o.skew
        : isFinite(o.skewY) ? o.skewY
        : 0;
      var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX
        : isFinite(o.scale) ? o.scale * flipX
        : isFinite(o.scaleX) ? o.scaleX * flipX
        : flipX;
      var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY
        : isFinite(o.scale) ? o.scale * flipY
        : isFinite(o.scaleY) ? o.scaleY * flipY
        : flipY;
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
      var ry = relative.y;
      return {
        scaleX, scaleY, skewX, skewY, shear, theta, rx, ry, tx, ty, ox, oy, px, py
      }
    }
    static matrixMultiply (l, r, o) {
      var a = l.a * r.a + l.c * r.b;
      var b = l.b * r.a + l.d * r.b;
      var c = l.a * r.c + l.c * r.d;
      var d = l.b * r.c + l.d * r.d;
      var e = l.e + l.a * r.e + l.c * r.f;
      var f = l.f + l.b * r.e + l.d * r.f;
      o.a = a;
      o.b = b;
      o.c = c;
      o.d = d;
      o.e = e;
      o.f = f;
      return o
    }
  }
  function ctm () {
    return new Matrix(this.node.getCTM())
  }
  function screenCTM () {
    if (typeof this.isRoot === 'function' && !this.isRoot()) {
      var rect = this.rect(1, 1);
      var m = rect.node.getScreenCTM();
      rect.remove();
      return new Matrix(m)
    }
    return new Matrix(this.node.getScreenCTM())
  }
  register(Matrix, 'Matrix');

  function parser () {
    if (!parser.nodes) {
      const svg = makeInstance().size(2, 0);
      svg.node.style.cssText = [
        'opacity: 0',
        'position: absolute',
        'left: -100%',
        'top: -100%',
        'overflow: hidden'
      ].join(';');
      svg.attr('focusable', 'false');
      svg.attr('aria-hidden', 'true');
      const path = svg.path().node;
      parser.nodes = { svg, path };
    }
    if (!parser.nodes.svg.node.parentNode) {
      const b = globals.document.body || globals.document.documentElement;
      parser.nodes.svg.addTo(b);
    }
    return parser.nodes
  }

  function isNulledBox (box) {
    return !box.width && !box.height && !box.x && !box.y
  }
  function domContains (node) {
    return node === globals.document
      || (globals.document.documentElement.contains || function (node) {
        while (node.parentNode) {
          node = node.parentNode;
        }
        return node === globals.document
      }).call(globals.document.documentElement, node)
  }
  class Box {
    constructor (...args) {
      this.init(...args);
    }
    init (source) {
      var base = [ 0, 0, 0, 0 ];
      source = typeof source === 'string' ? source.split(delimiter).map(parseFloat)
        : Array.isArray(source) ? source
        : typeof source === 'object' ? [ source.left != null ? source.left
        : source.x, source.top != null ? source.top : source.y, source.width, source.height ]
        : arguments.length === 4 ? [].slice.call(arguments)
        : base;
      this.x = source[0] || 0;
      this.y = source[1] || 0;
      this.width = this.w = source[2] || 0;
      this.height = this.h = source[3] || 0;
      this.x2 = this.x + this.w;
      this.y2 = this.y + this.h;
      this.cx = this.x + this.w / 2;
      this.cy = this.y + this.h / 2;
      return this
    }
    merge (box) {
      const x = Math.min(this.x, box.x);
      const y = Math.min(this.y, box.y);
      const width = Math.max(this.x + this.width, box.x + box.width) - x;
      const height = Math.max(this.y + this.height, box.y + box.height) - y;
      return new Box(x, y, width, height)
    }
    transform (m) {
      if (!(m instanceof Matrix)) {
        m = new Matrix(m);
      }
      let xMin = Infinity;
      let xMax = -Infinity;
      let yMin = Infinity;
      let yMax = -Infinity;
      const pts = [
        new Point(this.x, this.y),
        new Point(this.x2, this.y),
        new Point(this.x, this.y2),
        new Point(this.x2, this.y2)
      ];
      pts.forEach(function (p) {
        p = p.transform(m);
        xMin = Math.min(xMin, p.x);
        xMax = Math.max(xMax, p.x);
        yMin = Math.min(yMin, p.y);
        yMax = Math.max(yMax, p.y);
      });
      return new Box(
        xMin, yMin,
        xMax - xMin,
        yMax - yMin
      )
    }
    addOffset () {
      this.x += globals.window.pageXOffset;
      this.y += globals.window.pageYOffset;
      return this
    }
    toString () {
      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
    }
    toArray () {
      return [ this.x, this.y, this.width, this.height ]
    }
    isNulled () {
      return isNulledBox(this)
    }
  }
  function getBox (cb, retry) {
    let box;
    try {
      box = cb(this.node);
      if (isNulledBox(box) && !domContains(this.node)) {
        throw new Error('Element not in the dom')
      }
    } catch (e) {
      box = retry(this);
    }
    return box
  }
  function bbox () {
    return new Box(getBox.call(this, (node) => node.getBBox(), (el) => {
      try {
        const clone = el.clone().addTo(parser().svg).show();
        const box = clone.node.getBBox();
        clone.remove();
        return box
      } catch (e) {
        throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString())
      }
    }))
  }
  function rbox (el) {
    const box = new Box(getBox.call(this, (node) => node.getBoundingClientRect(), (el) => {
      throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible')
    }));
    if (el) return box.transform(el.screenCTM().inverse())
    return box.addOffset()
  }
  registerMethods({
    viewbox: {
      viewbox (x, y, width, height) {
        if (x == null) return new Box(this.attr('viewBox'))
        return this.attr('viewBox', new Box(x, y, width, height))
      },
      zoom (level, point) {
        let width = this.node.clientWidth;
        let height = this.node.clientHeight;
        const v = this.viewbox();
        if (!width && !height) {
          var style = window.getComputedStyle(this.node);
          width = parseFloat(style.getPropertyValue('width'));
          height = parseFloat(style.getPropertyValue('height'));
        }
        const zoomX = width / v.width;
        const zoomY = height / v.height;
        const zoom = Math.min(zoomX, zoomY);
        if (level == null) {
          return zoom
        }
        let zoomAmount = zoom / level;
        if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;
        point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
        const box = new Box(v).transform(
          new Matrix({ scale: zoomAmount, origin: point })
        );
        return this.viewbox(box)
      }
    }
  });
  register(Box, 'Box');

  const subClassArray = (function () {
    try {
      return Function('name', 'baseClass', '_constructor', [
        'baseClass = baseClass || Array',
        'return {',
        '  [name]: class extends baseClass {',
        '    constructor (...args) {',
        '      super(...args)',
        '      _constructor && _constructor.apply(this, args)',
        '    }',
        '  }',
        '}[name]'
      ].join('\n'))
    } catch (e) {
      return (name, baseClass = Array, _constructor) => {
        const Arr = function () {
          baseClass.apply(this, arguments);
          _constructor && _constructor.apply(this, arguments);
        };
        Arr.prototype = Object.create(baseClass.prototype);
        Arr.prototype.constructor = Arr;
        Arr.prototype.map = function (fn) {
          const arr = new Arr();
          arr.push.apply(arr, Array.prototype.map.call(this, fn));
          return arr
        };
        return Arr
      }
    }
  })();

  const List = subClassArray('List', Array, function (arr = []) {
    if (typeof arr === 'number') return this
    this.length = 0;
    this.push(...arr);
  });
  extend(List, {
    each (fnOrMethodName, ...args) {
      if (typeof fnOrMethodName === 'function') {
        return this.map((el) => {
          return fnOrMethodName.call(el, el)
        })
      } else {
        return this.map(el => {
          return el[fnOrMethodName](...args)
        })
      }
    },
    toArray () {
      return Array.prototype.concat.apply([], this)
    }
  });
  const reserved = [ 'toArray', 'constructor', 'each' ];
  List.extend = function (methods) {
    methods = methods.reduce((obj, name) => {
      if (reserved.includes(name)) return obj
      if (name[0] === '_') return obj
      obj[name] = function (...attrs) {
        return this.each(name, ...attrs)
      };
      return obj
    }, {});
    extend(List, methods);
  };

  function baseFind (query, parent) {
    return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
      return adopt(node)
    }))
  }
  function find (query) {
    return baseFind(query, this.node)
  }
  function findOne (query) {
    return adopt(this.node.querySelector(query))
  }

  class EventTarget extends Base {
    constructor ({ events = {} } = {}) {
      super();
      this.events = events;
    }
    addEventListener () {}
    dispatch (event, data) {
      return dispatch(this, event, data)
    }
    dispatchEvent (event) {
      const bag = this.getEventHolder().events;
      if (!bag) return true
      const events = bag[event.type];
      for (const i in events) {
        for (const j in events[i]) {
          events[i][j](event);
        }
      }
      return !event.defaultPrevented
    }
    fire (event, data) {
      this.dispatch(event, data);
      return this
    }
    getEventHolder () {
      return this
    }
    getEventTarget () {
      return this
    }
    off (event, listener) {
      off(this, event, listener);
      return this
    }
    on (event, listener, binding, options) {
      on(this, event, listener, binding, options);
      return this
    }
    removeEventListener () {}
  }
  register(EventTarget, 'EventTarget');

  function noop () {}
  const timeline = {
    duration: 400,
    ease: '>',
    delay: 0
  };
  const attrs = {
    'fill-opacity': 1,
    'stroke-opacity': 1,
    'stroke-width': 0,
    'stroke-linejoin': 'miter',
    'stroke-linecap': 'butt',
    fill: '#000000',
    stroke: '#000000',
    opacity: 1,
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    width: 0,
    height: 0,
    r: 0,
    rx: 0,
    ry: 0,
    offset: 0,
    'stop-opacity': 1,
    'stop-color': '#000000',
    'text-anchor': 'start'
  };

  const SVGArray = subClassArray('SVGArray', Array, function (arr) {
    this.init(arr);
  });
  extend(SVGArray, {
    init (arr) {
      if (typeof arr === 'number') return this
      this.length = 0;
      this.push(...this.parse(arr));
      return this
    },
    toArray () {
      return Array.prototype.concat.apply([], this)
    },
    toString () {
      return this.join(' ')
    },
    valueOf () {
      const ret = [];
      ret.push(...this);
      return ret
    },
    parse (array = []) {
      if (array instanceof Array) return array
      return array.trim().split(delimiter).map(parseFloat)
    },
    clone () {
      return new this.constructor(this)
    },
    toSet () {
      return new Set(this)
    }
  });

  class SVGNumber {
    constructor (...args) {
      this.init(...args);
    }
    init (value, unit) {
      unit = Array.isArray(value) ? value[1] : unit;
      value = Array.isArray(value) ? value[0] : value;
      this.value = 0;
      this.unit = unit || '';
      if (typeof value === 'number') {
        this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value;
      } else if (typeof value === 'string') {
        unit = value.match(numberAndUnit);
        if (unit) {
          this.value = parseFloat(unit[1]);
          if (unit[5] === '%') {
            this.value /= 100;
          } else if (unit[5] === 's') {
            this.value *= 1000;
          }
          this.unit = unit[5];
        }
      } else {
        if (value instanceof SVGNumber) {
          this.value = value.valueOf();
          this.unit = value.unit;
        }
      }
      return this
    }
    toString () {
      return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6
        : this.unit === 's' ? this.value / 1e3
        : this.value
      ) + this.unit
    }
    toJSON () {
      return this.toString()
    }
    toArray () {
      return [ this.value, this.unit ]
    }
    valueOf () {
      return this.value
    }
    plus (number) {
      number = new SVGNumber(number);
      return new SVGNumber(this + number, this.unit || number.unit)
    }
    minus (number) {
      number = new SVGNumber(number);
      return new SVGNumber(this - number, this.unit || number.unit)
    }
    times (number) {
      number = new SVGNumber(number);
      return new SVGNumber(this * number, this.unit || number.unit)
    }
    divide (number) {
      number = new SVGNumber(number);
      return new SVGNumber(this / number, this.unit || number.unit)
    }
    convert (unit) {
      return new SVGNumber(this.value, unit)
    }
  }

  const hooks = [];
  function registerAttrHook (fn) {
    hooks.push(fn);
  }
  function attr (attr, val, ns) {
    if (attr == null) {
      attr = {};
      val = this.node.attributes;
      for (const node of val) {
        attr[node.nodeName] = isNumber.test(node.nodeValue)
          ? parseFloat(node.nodeValue)
          : node.nodeValue;
      }
      return attr
    } else if (attr instanceof Array) {
      return attr.reduce((last, curr) => {
        last[curr] = this.attr(curr);
        return last
      }, {})
    } else if (typeof attr === 'object' && attr.constructor === Object) {
      for (val in attr) this.attr(val, attr[val]);
    } else if (val === null) {
      this.node.removeAttribute(attr);
    } else if (val == null) {
      val = this.node.getAttribute(attr);
      return val == null ? attrs[attr]
        : isNumber.test(val) ? parseFloat(val)
        : val
    } else {
      val = hooks.reduce((_val, hook) => {
        return hook(attr, _val, this)
      }, val);
      if (typeof val === 'number') {
        val = new SVGNumber(val);
      } else if (Color.isColor(val)) {
        val = new Color(val);
      } else if (val.constructor === Array) {
        val = new SVGArray(val);
      }
      if (attr === 'leading') {
        if (this.leading) {
          this.leading(val);
        }
      } else {
        typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString())
          : this.node.setAttribute(attr, val.toString());
      }
      if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
        this.rebuild();
      }
    }
    return this
  }

  class Dom extends EventTarget {
    constructor (node, attrs) {
      super(node);
      this.node = node;
      this.type = node.nodeName;
      if (attrs && node !== attrs) {
        this.attr(attrs);
      }
    }
    add (element, i) {
      element = makeInstance(element);
      if (i == null) {
        this.node.appendChild(element.node);
      } else if (element.node !== this.node.childNodes[i]) {
        this.node.insertBefore(element.node, this.node.childNodes[i]);
      }
      return this
    }
    addTo (parent) {
      return makeInstance(parent).put(this)
    }
    children () {
      return new List(map(this.node.children, function (node) {
        return adopt(node)
      }))
    }
    clear () {
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      }
      return this
    }
    clone () {
      this.writeDataToDom();
      return assignNewId(this.node.cloneNode(true))
    }
    each (block, deep) {
      var children = this.children();
      var i, il;
      for (i = 0, il = children.length; i < il; i++) {
        block.apply(children[i], [ i, children ]);
        if (deep) {
          children[i].each(block, deep);
        }
      }
      return this
    }
    element (nodeName) {
      return this.put(new Dom(create(nodeName)))
    }
    first () {
      return adopt(this.node.firstChild)
    }
    get (i) {
      return adopt(this.node.childNodes[i])
    }
    getEventHolder () {
      return this.node
    }
    getEventTarget () {
      return this.node
    }
    has (element) {
      return this.index(element) >= 0
    }
    id (id) {
      if (typeof id === 'undefined' && !this.node.id) {
        this.node.id = eid(this.type);
      }
      return this.attr('id', id)
    }
    index (element) {
      return [].slice.call(this.node.childNodes).indexOf(element.node)
    }
    last () {
      return adopt(this.node.lastChild)
    }
    matches (selector) {
      const el = this.node;
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
    }
    parent (type) {
      var parent = this;
      if (!parent.node.parentNode) return null
      parent = adopt(parent.node.parentNode);
      if (!type) return parent
      while (parent) {
        if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent
        if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null
        parent = adopt(parent.node.parentNode);
      }
    }
    put (element, i) {
      this.add(element, i);
      return element
    }
    putIn (parent) {
      return makeInstance(parent).add(this)
    }
    remove () {
      if (this.parent()) {
        this.parent().removeElement(this);
      }
      return this
    }
    removeElement (element) {
      this.node.removeChild(element.node);
      return this
    }
    replace (element) {
      element = makeInstance(element);
      this.node.parentNode.replaceChild(element.node, this.node);
      return element
    }
    round (precision = 2, map) {
      const factor = 10 ** precision;
      const attrs = this.attr();
      if (!map) {
        map = Object.keys(attrs);
      }
      const newAttrs = {};
      map.forEach((key) => {
        newAttrs[key] = Math.round(attrs[key] * factor) / factor;
      });
      this.attr(newAttrs);
      return this
    }
    toString () {
      return this.id()
    }
    svg (svgOrFn, outerHTML) {
      var well, len, fragment;
      if (svgOrFn === false) {
        outerHTML = false;
        svgOrFn = null;
      }
      if (svgOrFn == null || typeof svgOrFn === 'function') {
        outerHTML = outerHTML == null ? true : outerHTML;
        this.writeDataToDom();
        let current = this;
        if (svgOrFn != null) {
          current = adopt(current.node.cloneNode(true));
          if (outerHTML) {
            const result = svgOrFn(current);
            current = result || current;
            if (result === false) return ''
          }
          current.each(function () {
            const result = svgOrFn(this);
            const _this = result || this;
            if (result === false) {
              this.remove();
            } else if (result && this !== _this) {
              this.replace(_this);
            }
          }, true);
        }
        return outerHTML
          ? current.node.outerHTML
          : current.node.innerHTML
      }
      outerHTML = outerHTML == null ? false : outerHTML;
      well = globals.document.createElementNS(ns, 'svg');
      fragment = globals.document.createDocumentFragment();
      well.innerHTML = svgOrFn;
      for (len = well.children.length; len--;) {
        fragment.appendChild(well.firstElementChild);
      }
      const parent = this.parent();
      return outerHTML
        ? this.replace(fragment) && parent
        : this.add(fragment)
    }
    words (text) {
      this.node.textContent = text;
      return this
    }
    writeDataToDom () {
      this.each(function () {
        this.writeDataToDom();
      });
      return this
    }
  }
  extend(Dom, { attr, find, findOne });
  register(Dom, 'Dom');

  class Element$1 extends Dom {
    constructor (node, attrs) {
      super(node, attrs);
      this.dom = {};
      this.node.instance = this;
      if (node.hasAttribute('svgjs:data')) {
        this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
      }
    }
    center (x, y) {
      return this.cx(x).cy(y)
    }
    cx (x) {
      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
    }
    cy (y) {
      return y == null
        ? this.y() + this.height() / 2
        : this.y(y - this.height() / 2)
    }
    defs () {
      return this.root().defs()
    }
    dmove (x, y) {
      return this.dx(x).dy(y)
    }
    dx (x = 0) {
      return this.x(new SVGNumber(x).plus(this.x()))
    }
    dy (y = 0) {
      return this.y(new SVGNumber(y).plus(this.y()))
    }
    root () {
      const p = this.parent(getClass(root));
      return p && p.root()
    }
    getEventHolder () {
      return this
    }
    height (height) {
      return this.attr('height', height)
    }
    inside (x, y) {
      const box = this.bbox();
      return x > box.x
        && y > box.y
        && x < box.x + box.width
        && y < box.y + box.height
    }
    move (x, y) {
      return this.x(x).y(y)
    }
    parents (until = globals.document) {
      until = makeInstance(until);
      const parents = new List();
      let parent = this;
      while (
        (parent = parent.parent())
        && parent.node !== until.node
        && parent.node !== globals.document
      ) {
        parents.push(parent);
      }
      return parents
    }
    reference (attr) {
      attr = this.attr(attr);
      if (!attr) return null
      const m = attr.match(reference);
      return m ? makeInstance(m[1]) : null
    }
    setData (o) {
      this.dom = o;
      return this
    }
    size (width, height) {
      const p = proportionalSize(this, width, height);
      return this
        .width(new SVGNumber(p.width))
        .height(new SVGNumber(p.height))
    }
    width (width) {
      return this.attr('width', width)
    }
    writeDataToDom () {
      this.node.removeAttribute('svgjs:data');
      if (Object.keys(this.dom).length) {
        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom));
      }
      return super.writeDataToDom()
    }
    x (x) {
      return this.attr('x', x)
    }
    y (y) {
      return this.attr('y', y)
    }
  }
  extend(Element$1, {
    bbox, rbox, point, ctm, screenCTM
  });
  register(Element$1, 'Element');

  var sugar = {
    stroke: [ 'color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset' ],
    fill: [ 'color', 'opacity', 'rule' ],
    prefix: function (t, a) {
      return a === 'color' ? t : t + '-' + a
    }
  }
  ;[ 'fill', 'stroke' ].forEach(function (m) {
    var extension = {};
    var i;
    extension[m] = function (o) {
      if (typeof o === 'undefined') {
        return this.attr(m)
      }
      if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || (o instanceof Element$1)) {
        this.attr(m, o);
      } else {
        for (i = sugar[m].length - 1; i >= 0; i--) {
          if (o[sugar[m][i]] != null) {
            this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
          }
        }
      }
      return this
    };
    registerMethods([ 'Element', 'Runner' ], extension);
  });
  registerMethods([ 'Element', 'Runner' ], {
    matrix: function (mat, b, c, d, e, f) {
      if (mat == null) {
        return new Matrix(this)
      }
      return this.attr('transform', new Matrix(mat, b, c, d, e, f))
    },
    rotate: function (angle, cx, cy) {
      return this.transform({ rotate: angle, ox: cx, oy: cy }, true)
    },
    skew: function (x, y, cx, cy) {
      return arguments.length === 1 || arguments.length === 3
        ? this.transform({ skew: x, ox: y, oy: cx }, true)
        : this.transform({ skew: [ x, y ], ox: cx, oy: cy }, true)
    },
    shear: function (lam, cx, cy) {
      return this.transform({ shear: lam, ox: cx, oy: cy }, true)
    },
    scale: function (x, y, cx, cy) {
      return arguments.length === 1 || arguments.length === 3
        ? this.transform({ scale: x, ox: y, oy: cx }, true)
        : this.transform({ scale: [ x, y ], ox: cx, oy: cy }, true)
    },
    translate: function (x, y) {
      return this.transform({ translate: [ x, y ] }, true)
    },
    relative: function (x, y) {
      return this.transform({ relative: [ x, y ] }, true)
    },
    flip: function (direction, around) {
      var directionString = typeof direction === 'string' ? direction
        : isFinite(direction) ? 'both'
        : 'both';
      var origin = (direction === 'both' && isFinite(around)) ? [ around, around ]
        : (direction === 'x') ? [ around, 0 ]
        : (direction === 'y') ? [ 0, around ]
        : isFinite(direction) ? [ direction, direction ]
        : [ 0, 0 ];
      return this.transform({ flip: directionString, origin: origin }, true)
    },
    opacity: function (value) {
      return this.attr('opacity', value)
    }
  });
  registerMethods('radius', {
    radius: function (x, y) {
      var type = (this._element || this).type;
      return type === 'radialGradient' || type === 'radialGradient'
        ? this.attr('r', new SVGNumber(x))
        : this.rx(x).ry(y == null ? x : y)
    }
  });
  registerMethods('Path', {
    length: function () {
      return this.node.getTotalLength()
    },
    pointAt: function (length) {
      return new Point(this.node.getPointAtLength(length))
    }
  });
  registerMethods([ 'Element', 'Runner' ], {
    font: function (a, v) {
      if (typeof a === 'object') {
        for (v in a) this.font(v, a[v]);
        return this
      }
      return a === 'leading'
        ? this.leading(v)
        : a === 'anchor'
          ? this.attr('text-anchor', v)
          : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style'
            ? this.attr('font-' + a, v)
            : this.attr(a, v)
    }
  });
  registerMethods('Text', {
    ax (x) {
      return this.attr('x', x)
    },
    ay (y) {
      return this.attr('y', y)
    },
    amove (x, y) {
      return this.ax(x).ay(y)
    }
  });
  const methods = [ 'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'touchstart',
    'touchmove',
    'touchleave',
    'touchend',
    'touchcancel' ].reduce(function (last, event) {
    const fn = function (f) {
      if (f === null) {
        off(this, event);
      } else {
        on(this, event, f);
      }
      return this
    };
    last[event] = fn;
    return last
  }, {});
  registerMethods('Element', methods);

  function untransform () {
    return this.attr('transform', null)
  }
  function matrixify () {
    var matrix = (this.attr('transform') || '')
      .split(transforms).slice(0, -1).map(function (str) {
        var kv = str.trim().split('(');
        return [ kv[0],
          kv[1].split(delimiter)
            .map(function (str) {
              return parseFloat(str)
            })
        ]
      })
      .reverse()
      .reduce(function (matrix, transform) {
        if (transform[0] === 'matrix') {
          return matrix.lmultiply(Matrix.fromArray(transform[1]))
        }
        return matrix[transform[0]].apply(matrix, transform[1])
      }, new Matrix());
    return matrix
  }
  function toParent (parent) {
    if (this === parent) return this
    var ctm = this.screenCTM();
    var pCtm = parent.screenCTM().inverse();
    this.addTo(parent).untransform().transform(pCtm.multiply(ctm));
    return this
  }
  function toRoot () {
    return this.toParent(this.root())
  }
  function transform (o, relative) {
    if (o == null || typeof o === 'string') {
      var decomposed = new Matrix(this).decompose();
      return o == null ? decomposed : decomposed[o]
    }
    if (!Matrix.isMatrixLike(o)) {
      o = { ...o, origin: getOrigin(o, this) };
    }
    var cleanRelative = relative === true ? this : (relative || false);
    var result = new Matrix(cleanRelative).transform(o);
    return this.attr('transform', result)
  }
  registerMethods('Element', {
    untransform, matrixify, toParent, toRoot, transform
  });

  function rx (rx) {
    return this.attr('rx', rx)
  }
  function ry (ry) {
    return this.attr('ry', ry)
  }
  function x$1 (x) {
    return x == null
      ? this.cx() - this.rx()
      : this.cx(x + this.rx())
  }
  function y$1 (y) {
    return y == null
      ? this.cy() - this.ry()
      : this.cy(y + this.ry())
  }
  function cx (x) {
    return x == null
      ? this.attr('cx')
      : this.attr('cx', x)
  }
  function cy (y) {
    return y == null
      ? this.attr('cy')
      : this.attr('cy', y)
  }
  function width$1 (width) {
    return width == null
      ? this.rx() * 2
      : this.rx(new SVGNumber(width).divide(2))
  }
  function height$1 (height) {
    return height == null
      ? this.ry() * 2
      : this.ry(new SVGNumber(height).divide(2))
  }

  var circled = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rx: rx,
    ry: ry,
    x: x$1,
    y: y$1,
    cx: cx,
    cy: cy,
    width: width$1,
    height: height$1
  });

  class Shape extends Element$1 {}
  register(Shape, 'Shape');

  class Circle extends Shape {
    constructor (node) {
      super(nodeOrNew('circle', node), node);
    }
    radius (r) {
      return this.attr('r', r)
    }
    rx (rx) {
      return this.attr('r', rx)
    }
    ry (ry) {
      return this.rx(ry)
    }
    size (size) {
      return this.radius(new SVGNumber(size).divide(2))
    }
  }
  extend(Circle, { x: x$1, y: y$1, cx, cy, width: width$1, height: height$1 });
  registerMethods({
    Container: {
      circle: wrapWithAttrCheck(function (size) {
        return this.put(new Circle())
          .size(size)
          .move(0, 0)
      })
    }
  });
  register(Circle, 'Circle');

  class Container extends Element$1 {
    flatten (parent) {
      this.each(function () {
        if (this instanceof Container) return this.flatten(parent).ungroup(parent)
        return this.toParent(parent)
      });
      this.node.firstElementChild || this.remove();
      return this
    }
    ungroup (parent) {
      parent = parent || this.parent();
      this.each(function () {
        return this.toParent(parent)
      });
      this.remove();
      return this
    }
  }
  register(Container, 'Container');

  class Defs extends Container {
    constructor (node) {
      super(nodeOrNew('defs', node), node);
    }
    flatten () {
      return this
    }
    ungroup () {
      return this
    }
  }
  register(Defs, 'Defs');

  class Ellipse extends Shape {
    constructor (node) {
      super(nodeOrNew('ellipse', node), node);
    }
    size (width, height) {
      var p = proportionalSize(this, width, height);
      return this
        .rx(new SVGNumber(p.width).divide(2))
        .ry(new SVGNumber(p.height).divide(2))
    }
  }
  extend(Ellipse, circled);
  registerMethods('Container', {
    ellipse: wrapWithAttrCheck(function (width = 0, height = width) {
      return this.put(new Ellipse()).size(width, height).move(0, 0)
    })
  });
  register(Ellipse, 'Ellipse');

  class Stop extends Element$1 {
    constructor (node) {
      super(nodeOrNew('stop', node), node);
    }
    update (o) {
      if (typeof o === 'number' || o instanceof SVGNumber) {
        o = {
          offset: arguments[0],
          color: arguments[1],
          opacity: arguments[2]
        };
      }
      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
      if (o.color != null) this.attr('stop-color', o.color);
      if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
      return this
    }
  }
  register(Stop, 'Stop');

  function from (x, y) {
    return (this._element || this).type === 'radialGradient'
      ? this.attr({ fx: new SVGNumber(x), fy: new SVGNumber(y) })
      : this.attr({ x1: new SVGNumber(x), y1: new SVGNumber(y) })
  }
  function to (x, y) {
    return (this._element || this).type === 'radialGradient'
      ? this.attr({ cx: new SVGNumber(x), cy: new SVGNumber(y) })
      : this.attr({ x2: new SVGNumber(x), y2: new SVGNumber(y) })
  }

  var gradiented = /*#__PURE__*/Object.freeze({
    __proto__: null,
    from: from,
    to: to
  });

  class Gradient extends Container {
    constructor (type, attrs) {
      super(
        nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type),
        attrs
      );
    }
    stop (offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity)
    }
    update (block) {
      this.clear();
      if (typeof block === 'function') {
        block.call(this, this);
      }
      return this
    }
    url () {
      return 'url(#' + this.id() + ')'
    }
    toString () {
      return this.url()
    }
    attr (a, b, c) {
      if (a === 'transform') a = 'gradientTransform';
      return super.attr(a, b, c)
    }
    targets () {
      return baseFind('svg [fill*="' + this.id() + '"]')
    }
    bbox () {
      return new Box()
    }
  }
  extend(Gradient, gradiented);
  registerMethods({
    Container: {
      gradient: wrapWithAttrCheck(function (type, block) {
        return this.defs().gradient(type, block)
      })
    },
    Defs: {
      gradient: wrapWithAttrCheck(function (type, block) {
        return this.put(new Gradient(type)).update(block)
      })
    }
  });
  register(Gradient, 'Gradient');

  class Pattern extends Container {
    constructor (node) {
      super(nodeOrNew('pattern', node), node);
    }
    url () {
      return 'url(#' + this.id() + ')'
    }
    update (block) {
      this.clear();
      if (typeof block === 'function') {
        block.call(this, this);
      }
      return this
    }
    toString () {
      return this.url()
    }
    attr (a, b, c) {
      if (a === 'transform') a = 'patternTransform';
      return super.attr(a, b, c)
    }
    targets () {
      return baseFind('svg [fill*="' + this.id() + '"]')
    }
    bbox () {
      return new Box()
    }
  }
  registerMethods({
    Container: {
      pattern (...args) {
        return this.defs().pattern(...args)
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
        })
      })
    }
  });
  register(Pattern, 'Pattern');

  class Image extends Shape {
    constructor (node) {
      super(nodeOrNew('image', node), node);
    }
    load (url, callback) {
      if (!url) return this
      var img = new globals.window.Image();
      on(img, 'load', function (e) {
        var p = this.parent(Pattern);
        if (this.width() === 0 && this.height() === 0) {
          this.size(img.width, img.height);
        }
        if (p instanceof Pattern) {
          if (p.width() === 0 && p.height() === 0) {
            p.size(this.width(), this.height());
          }
        }
        if (typeof callback === 'function') {
          callback.call(this, e);
        }
      }, this);
      on(img, 'load error', function () {
        off(img);
      });
      return this.attr('href', (img.src = url), xlink)
    }
  }
  registerAttrHook(function (attr, val, _this) {
    if (attr === 'fill' || attr === 'stroke') {
      if (isImage.test(val)) {
        val = _this.root().defs().image(val);
      }
    }
    if (val instanceof Image) {
      val = _this.root().defs().pattern(0, 0, (pattern) => {
        pattern.add(val);
      });
    }
    return val
  });
  registerMethods({
    Container: {
      image: wrapWithAttrCheck(function (source, callback) {
        return this.put(new Image()).size(0, 0).load(source, callback)
      })
    }
  });
  register(Image, 'Image');

  const PointArray = subClassArray('PointArray', SVGArray);
  extend(PointArray, {
    toString () {
      for (var i = 0, il = this.length, array = []; i < il; i++) {
        array.push(this[i].join(','));
      }
      return array.join(' ')
    },
    toLine () {
      return {
        x1: this[0][0],
        y1: this[0][1],
        x2: this[1][0],
        y2: this[1][1]
      }
    },
    at (pos) {
      if (!this.destination) return this
      for (var i = 0, il = this.length, array = []; i < il; i++) {
        array.push([
          this[i][0] + (this.destination[i][0] - this[i][0]) * pos,
          this[i][1] + (this.destination[i][1] - this[i][1]) * pos
        ]);
      }
      return new PointArray(array)
    },
    parse (array = [ [ 0, 0 ] ]) {
      var points = [];
      if (array instanceof Array) {
        if (array[0] instanceof Array) {
          return array
        }
      } else {
        array = array.trim().split(delimiter).map(parseFloat);
      }
      if (array.length % 2 !== 0) array.pop();
      for (var i = 0, len = array.length; i < len; i = i + 2) {
        points.push([ array[i], array[i + 1] ]);
      }
      return points
    },
    transform (m) {
      const points = [];
      for (let i = 0; i < this.length; i++) {
        const point = this[i];
        points.push([
          m.a * point[0] + m.c * point[1] + m.e,
          m.b * point[0] + m.d * point[1] + m.f
        ]);
      }
      return new PointArray(points)
    },
    move (x, y) {
      var box = this.bbox();
      x -= box.x;
      y -= box.y;
      if (!isNaN(x) && !isNaN(y)) {
        for (var i = this.length - 1; i >= 0; i--) {
          this[i] = [ this[i][0] + x, this[i][1] + y ];
        }
      }
      return this
    },
    size (width, height) {
      var i;
      var box = this.bbox();
      for (i = this.length - 1; i >= 0; i--) {
        if (box.width) this[i][0] = ((this[i][0] - box.x) * width) / box.width + box.x;
        if (box.height) this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y;
      }
      return this
    },
    bbox () {
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
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }
  });

  const MorphArray = PointArray;
  function x (x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
  }
  function y (y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
  }
  function width (width) {
    const b = this.bbox();
    return width == null ? b.width : this.size(width, b.height)
  }
  function height (height) {
    const b = this.bbox();
    return height == null ? b.height : this.size(b.width, height)
  }

  var pointed = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MorphArray: MorphArray,
    x: x,
    y: y,
    width: width,
    height: height
  });

  class Line extends Shape {
    constructor (node) {
      super(nodeOrNew('line', node), node);
    }
    array () {
      return new PointArray([
        [ this.attr('x1'), this.attr('y1') ],
        [ this.attr('x2'), this.attr('y2') ]
      ])
    }
    plot (x1, y1, x2, y2) {
      if (x1 == null) {
        return this.array()
      } else if (typeof y1 !== 'undefined') {
        x1 = { x1: x1, y1: y1, x2: x2, y2: y2 };
      } else {
        x1 = new PointArray(x1).toLine();
      }
      return this.attr(x1)
    }
    move (x, y) {
      return this.attr(this.array().move(x, y).toLine())
    }
    size (width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr(this.array().size(p.width, p.height).toLine())
    }
  }
  extend(Line, pointed);
  registerMethods({
    Container: {
      line: wrapWithAttrCheck(function (...args) {
        return Line.prototype.plot.apply(
          this.put(new Line())
          , args[0] != null ? args : [ 0, 0, 0, 0 ]
        )
      })
    }
  });
  register(Line, 'Line');

  class Marker extends Container {
    constructor (node) {
      super(nodeOrNew('marker', node), node);
    }
    width (width) {
      return this.attr('markerWidth', width)
    }
    height (height) {
      return this.attr('markerHeight', height)
    }
    ref (x, y) {
      return this.attr('refX', x).attr('refY', y)
    }
    update (block) {
      this.clear();
      if (typeof block === 'function') {
        block.call(this, this);
      }
      return this
    }
    toString () {
      return 'url(#' + this.id() + ')'
    }
  }
  registerMethods({
    Container: {
      marker (...args) {
        return this.defs().marker(...args)
      }
    },
    Defs: {
      marker: wrapWithAttrCheck(function (width, height, block) {
        return this.put(new Marker())
          .size(width, height)
          .ref(width / 2, height / 2)
          .viewbox(0, 0, width, height)
          .attr('orient', 'auto')
          .update(block)
      })
    },
    marker: {
      marker (marker, width, height, block) {
        var attr = [ 'marker' ];
        if (marker !== 'all') attr.push(marker);
        attr = attr.join('-');
        marker = arguments[1] instanceof Marker
          ? arguments[1]
          : this.defs().marker(width, height, block);
        return this.attr(attr, marker)
      }
    }
  });
  register(Marker, 'Marker');

  function makeSetterGetter (k, f) {
    return function (v) {
      if (v == null) return this[v]
      this[k] = v;
      if (f) f.call(this);
      return this
    }
  }
  const easing = {
    '-': function (pos) {
      return pos
    },
    '<>': function (pos) {
      return -Math.cos(pos * Math.PI) / 2 + 0.5
    },
    '>': function (pos) {
      return Math.sin(pos * Math.PI / 2)
    },
    '<': function (pos) {
      return -Math.cos(pos * Math.PI / 2) + 1
    },
    bezier: function (x1, y1, x2, y2) {
      return function (t) {
        if (t < 0) {
          if (x1 > 0) {
            return y1 / x1 * t
          } else if (x2 > 0) {
            return y2 / x2 * t
          } else {
            return 0
          }
        } else if (t > 1) {
          if (x2 < 1) {
            return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2)
          } else if (x1 < 1) {
            return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1)
          } else {
            return 1
          }
        } else {
          return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3
        }
      }
    },
    steps: function (steps, stepPosition = 'end') {
      stepPosition = stepPosition.split('-').reverse()[0];
      let jumps = steps;
      if (stepPosition === 'none') {
        --jumps;
      } else if (stepPosition === 'both') {
        ++jumps;
      }
      return (t, beforeFlag = false) => {
        let step = Math.floor(t * steps);
        const jumping = (t * step) % 1 === 0;
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
        return step / jumps
      }
    }
  };
  class Stepper {
    done () {
      return false
    }
  }
  class Ease extends Stepper {
    constructor (fn) {
      super();
      this.ease = easing[fn || timeline.ease] || fn;
    }
    step (from, to, pos) {
      if (typeof from !== 'number') {
        return pos < 1 ? from : to
      }
      return from + (to - from) * this.ease(pos)
    }
  }
  class Controller extends Stepper {
    constructor (fn) {
      super();
      this.stepper = fn;
    }
    step (current, target, dt, c) {
      return this.stepper(current, target, dt, c)
    }
    done (c) {
      return c.done
    }
  }
  function recalculate () {
    var duration = (this._duration || 500) / 1000;
    var overshoot = this._overshoot || 0;
    var eps = 1e-10;
    var pi = Math.PI;
    var os = Math.log(overshoot / 100 + eps);
    var zeta = -os / Math.sqrt(pi * pi + os * os);
    var wn = 3.9 / (zeta * duration);
    this.d = 2 * zeta * wn;
    this.k = wn * wn;
  }
  class Spring extends Controller {
    constructor (duration, overshoot) {
      super();
      this.duration(duration || 500)
        .overshoot(overshoot || 0);
    }
    step (current, target, dt, c) {
      if (typeof current === 'string') return current
      c.done = dt === Infinity;
      if (dt === Infinity) return target
      if (dt === 0) return current
      if (dt > 100) dt = 16;
      dt /= 1000;
      var velocity = c.velocity || 0;
      var acceleration = -this.d * velocity - this.k * (current - target);
      var newPosition = current
        + velocity * dt
        + acceleration * dt * dt / 2;
      c.velocity = velocity + acceleration * dt;
      c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
      return c.done ? target : newPosition
    }
  }
  extend(Spring, {
    duration: makeSetterGetter('_duration', recalculate),
    overshoot: makeSetterGetter('_overshoot', recalculate)
  });
  class PID extends Controller {
    constructor (p, i, d, windup) {
      super();
      p = p == null ? 0.1 : p;
      i = i == null ? 0.01 : i;
      d = d == null ? 0 : d;
      windup = windup == null ? 1000 : windup;
      this.p(p).i(i).d(d).windup(windup);
    }
    step (current, target, dt, c) {
      if (typeof current === 'string') return current
      c.done = dt === Infinity;
      if (dt === Infinity) return target
      if (dt === 0) return current
      var p = target - current;
      var i = (c.integral || 0) + p * dt;
      var d = (p - (c.error || 0)) / dt;
      var windup = this.windup;
      if (windup !== false) {
        i = Math.max(-windup, Math.min(i, windup));
      }
      c.error = p;
      c.integral = i;
      c.done = Math.abs(p) < 0.001;
      return c.done ? target : current + (this.P * p + this.I * i + this.D * d)
    }
  }
  extend(PID, {
    windup: makeSetterGetter('windup'),
    p: makeSetterGetter('P'),
    i: makeSetterGetter('I'),
    d: makeSetterGetter('D')
  });

  const PathArray = subClassArray('PathArray', SVGArray);
  function pathRegReplace (a, b, c, d) {
    return c + d.replace(dots, ' .')
  }
  function arrayToString (a) {
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
    return s + ' '
  }
  const pathHandlers = {
    M: function (c, p, p0) {
      p.x = p0.x = c[0];
      p.y = p0.y = c[1];
      return [ 'M', p.x, p.y ]
    },
    L: function (c, p) {
      p.x = c[0];
      p.y = c[1];
      return [ 'L', c[0], c[1] ]
    },
    H: function (c, p) {
      p.x = c[0];
      return [ 'H', c[0] ]
    },
    V: function (c, p) {
      p.y = c[0];
      return [ 'V', c[0] ]
    },
    C: function (c, p) {
      p.x = c[4];
      p.y = c[5];
      return [ 'C', c[0], c[1], c[2], c[3], c[4], c[5] ]
    },
    S: function (c, p) {
      p.x = c[2];
      p.y = c[3];
      return [ 'S', c[0], c[1], c[2], c[3] ]
    },
    Q: function (c, p) {
      p.x = c[2];
      p.y = c[3];
      return [ 'Q', c[0], c[1], c[2], c[3] ]
    },
    T: function (c, p) {
      p.x = c[0];
      p.y = c[1];
      return [ 'T', c[0], c[1] ]
    },
    Z: function (c, p, p0) {
      p.x = p0.x;
      p.y = p0.y;
      return [ 'Z' ]
    },
    A: function (c, p) {
      p.x = c[5];
      p.y = c[6];
      return [ 'A', c[0], c[1], c[2], c[3], c[4], c[5], c[6] ]
    }
  };
  const mlhvqtcsaz = 'mlhvqtcsaz'.split('');
  for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
    pathHandlers[mlhvqtcsaz[i]] = (function (i) {
      return function (c, p, p0) {
        if (i === 'H') c[0] = c[0] + p.x;
        else if (i === 'V') c[0] = c[0] + p.y;
        else if (i === 'A') {
          c[5] = c[5] + p.x;
          c[6] = c[6] + p.y;
        } else {
          for (var j = 0, jl = c.length; j < jl; ++j) {
            c[j] = c[j] + (j % 2 ? p.y : p.x);
          }
        }
        return pathHandlers[i](c, p, p0)
      }
    })(mlhvqtcsaz[i].toUpperCase());
  }
  extend(PathArray, {
    toString () {
      return arrayToString(this)
    },
    move (x, y) {
      var box = this.bbox();
      x -= box.x;
      y -= box.y;
      if (!isNaN(x) && !isNaN(y)) {
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
      return this
    },
    size (width, height) {
      var box = this.bbox();
      var i, l;
      box.width = box.width === 0 ? 1 : box.width;
      box.height = box.height === 0 ? 1 : box.height;
      for (i = this.length - 1; i >= 0; i--) {
        l = this[i][0];
        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
          this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y;
        } else if (l === 'H') {
          this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
        } else if (l === 'V') {
          this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
          this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y;
          this[i][3] = ((this[i][3] - box.x) * width) / box.width + box.x;
          this[i][4] = ((this[i][4] - box.y) * height) / box.height + box.y;
          if (l === 'C') {
            this[i][5] = ((this[i][5] - box.x) * width) / box.width + box.x;
            this[i][6] = ((this[i][6] - box.y) * height) / box.height + box.y;
          }
        } else if (l === 'A') {
          this[i][1] = (this[i][1] * width) / box.width;
          this[i][2] = (this[i][2] * height) / box.height;
          this[i][6] = ((this[i][6] - box.x) * width) / box.width + box.x;
          this[i][7] = ((this[i][7] - box.y) * height) / box.height + box.y;
        }
      }
      return this
    },
    equalCommands (pathArray) {
      var i, il, equalCommands;
      pathArray = new PathArray(pathArray);
      equalCommands = this.length === pathArray.length;
      for (i = 0, il = this.length; equalCommands && i < il; i++) {
        equalCommands = this[i][0] === pathArray[i][0];
      }
      return equalCommands
    },
    morph (pathArray) {
      pathArray = new PathArray(pathArray);
      if (this.equalCommands(pathArray)) {
        this.destination = pathArray;
      } else {
        this.destination = null;
      }
      return this
    },
    at (pos) {
      if (!this.destination) return this
      var sourceArray = this;
      var destinationArray = this.destination.value;
      var array = [];
      var pathArray = new PathArray();
      var i, il, j, jl;
      for (i = 0, il = sourceArray.length; i < il; i++) {
        array[i] = [ sourceArray[i][0] ];
        for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
          array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
        }
        if (array[i][0] === 'A') {
          array[i][4] = +(array[i][4] !== 0);
          array[i][5] = +(array[i][5] !== 0);
        }
      }
      pathArray.value = array;
      return pathArray
    },
    parse (array = [ [ 'M', 0, 0 ] ]) {
      if (array instanceof PathArray) return array
      var s;
      var paramCnt = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
      if (typeof array === 'string') {
        array = array
          .replace(numbersWithDots, pathRegReplace)
          .replace(pathLetters, ' $& ')
          .replace(hyphen, '$1 -')
          .trim()
          .split(delimiter);
      } else {
        array = array.reduce(function (prev, curr) {
          return [].concat.call(prev, curr)
        }, []);
      }
      var result = [];
      var p = new Point();
      var p0 = new Point();
      var index = 0;
      var len = array.length;
      do {
        if (isPathLetter.test(array[index])) {
          s = array[index];
          ++index;
        } else if (s === 'M') {
          s = 'L';
        } else if (s === 'm') {
          s = 'l';
        }
        result.push(pathHandlers[s].call(null,
          array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
          p, p0
        )
        );
      } while (len > index)
      return result
    },
    bbox () {
      parser().path.setAttribute('d', this.toString());
      return parser.nodes.path.getBBox()
    }
  });

  class Morphable {
    constructor (stepper) {
      this._stepper = stepper || new Ease('-');
      this._from = null;
      this._to = null;
      this._type = null;
      this._context = null;
      this._morphObj = null;
    }
    from (val) {
      if (val == null) {
        return this._from
      }
      this._from = this._set(val);
      return this
    }
    to (val) {
      if (val == null) {
        return this._to
      }
      this._to = this._set(val);
      return this
    }
    type (type) {
      if (type == null) {
        return this._type
      }
      this._type = type;
      return this
    }
    _set (value) {
      if (!this._type) {
        var type = typeof value;
        if (type === 'number') {
          this.type(SVGNumber);
        } else if (type === 'string') {
          if (Color.isColor(value)) {
            this.type(Color);
          } else if (delimiter.test(value)) {
            this.type(pathLetters.test(value)
              ? PathArray
              : SVGArray
            );
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
      var result = (new this._type(value));
      if (this._type === Color) {
        result = this._to ? result[this._to[4]]()
          : this._from ? result[this._from[4]]()
          : result;
      }
      result = result.toArray();
      this._morphObj = this._morphObj || new this._type();
      this._context = this._context
        || Array.apply(null, Array(result.length))
          .map(Object)
          .map(function (o) {
            o.done = true;
            return o
          });
      return result
    }
    stepper (stepper) {
      if (stepper == null) return this._stepper
      this._stepper = stepper;
      return this
    }
    done () {
      var complete = this._context
        .map(this._stepper.done)
        .reduce(function (last, curr) {
          return last && curr
        }, true);
      return complete
    }
    at (pos) {
      var _this = this;
      return this._morphObj.fromArray(
        this._from.map(function (i, index) {
          return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context)
        })
      )
    }
  }
  class NonMorphable {
    constructor (...args) {
      this.init(...args);
    }
    init (val) {
      val = Array.isArray(val) ? val[0] : val;
      this.value = val;
      return this
    }
    valueOf () {
      return this.value
    }
    toArray () {
      return [ this.value ]
    }
  }
  class TransformBag {
    constructor (...args) {
      this.init(...args);
    }
    init (obj) {
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
      return this
    }
    toArray () {
      var v = this;
      return [
        v.scaleX,
        v.scaleY,
        v.shear,
        v.rotate,
        v.translateX,
        v.translateY,
        v.originX,
        v.originY
      ]
    }
  }
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
  class ObjectBag {
    constructor (...args) {
      this.init(...args);
    }
    init (objOrArr) {
      this.values = [];
      if (Array.isArray(objOrArr)) {
        this.values = objOrArr;
        return
      }
      objOrArr = objOrArr || {};
      var entries = [];
      for (const i in objOrArr) {
        entries.push([ i, objOrArr[i] ]);
      }
      entries.sort((a, b) => {
        return a[0] - b[0]
      });
      this.values = entries.reduce((last, curr) => last.concat(curr), []);
      return this
    }
    valueOf () {
      var obj = {};
      var arr = this.values;
      for (var i = 0, len = arr.length; i < len; i += 2) {
        obj[arr[i]] = arr[i + 1];
      }
      return obj
    }
    toArray () {
      return this.values
    }
  }
  const morphableTypes = [
    NonMorphable,
    TransformBag,
    ObjectBag
  ];
  function registerMorphableType (type = []) {
    morphableTypes.push(...[].concat(type));
  }
  function makeMorphable () {
    extend(morphableTypes, {
      to (val) {
        return new Morphable()
          .type(this.constructor)
          .from(this.valueOf())
          .to(val)
      },
      fromArray (arr) {
        this.init(arr);
        return this
      }
    });
  }

  class Path$2 extends Shape {
    constructor (node) {
      super(nodeOrNew('path', node), node);
    }
    array () {
      return this._array || (this._array = new PathArray(this.attr('d')))
    }
    plot (d) {
      return (d == null) ? this.array()
        : this.clear().attr('d', typeof d === 'string' ? d : (this._array = new PathArray(d)))
    }
    clear () {
      delete this._array;
      return this
    }
    move (x, y) {
      return this.attr('d', this.array().move(x, y))
    }
    x (x) {
      return x == null ? this.bbox().x : this.move(x, this.bbox().y)
    }
    y (y) {
      return y == null ? this.bbox().y : this.move(this.bbox().x, y)
    }
    size (width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr('d', this.array().size(p.width, p.height))
    }
    width (width) {
      return width == null ? this.bbox().width : this.size(width, this.bbox().height)
    }
    height (height) {
      return height == null ? this.bbox().height : this.size(this.bbox().width, height)
    }
    targets () {
      return baseFind('svg textpath [href*="' + this.id() + '"]')
    }
  }
  Path$2.prototype.MorphArray = PathArray;
  registerMethods({
    Container: {
      path: wrapWithAttrCheck(function (d) {
        return this.put(new Path$2()).plot(d || new PathArray())
      })
    }
  });
  register(Path$2, 'Path');

  function array () {
    return this._array || (this._array = new PointArray(this.attr('points')))
  }
  function plot (p) {
    return (p == null) ? this.array()
      : this.clear().attr('points', typeof p === 'string' ? p
      : (this._array = new PointArray(p)))
  }
  function clear () {
    delete this._array;
    return this
  }
  function move (x, y) {
    return this.attr('points', this.array().move(x, y))
  }
  function size (width, height) {
    const p = proportionalSize(this, width, height);
    return this.attr('points', this.array().size(p.width, p.height))
  }

  var poly = /*#__PURE__*/Object.freeze({
    __proto__: null,
    array: array,
    plot: plot,
    clear: clear,
    move: move,
    size: size
  });

  class Polygon extends Shape {
    constructor (node) {
      super(nodeOrNew('polygon', node), node);
    }
  }
  registerMethods({
    Container: {
      polygon: wrapWithAttrCheck(function (p) {
        return this.put(new Polygon()).plot(p || new PointArray())
      })
    }
  });
  extend(Polygon, pointed);
  extend(Polygon, poly);
  register(Polygon, 'Polygon');

  class Polyline extends Shape {
    constructor (node) {
      super(nodeOrNew('polyline', node), node);
    }
  }
  registerMethods({
    Container: {
      polyline: wrapWithAttrCheck(function (p) {
        return this.put(new Polyline()).plot(p || new PointArray())
      })
    }
  });
  extend(Polyline, pointed);
  extend(Polyline, poly);
  register(Polyline, 'Polyline');

  class Rect extends Shape {
    constructor (node) {
      super(nodeOrNew('rect', node), node);
    }
  }
  extend(Rect, { rx, ry });
  registerMethods({
    Container: {
      rect: wrapWithAttrCheck(function (width, height) {
        return this.put(new Rect()).size(width, height)
      })
    }
  });
  register(Rect, 'Rect');

  class Queue {
    constructor () {
      this._first = null;
      this._last = null;
    }
    push (value) {
      var item = value.next ? value : { value: value, next: null, prev: null };
      if (this._last) {
        item.prev = this._last;
        this._last.next = item;
        this._last = item;
      } else {
        this._last = item;
        this._first = item;
      }
      return item
    }
    shift () {
      var remove = this._first;
      if (!remove) return null
      this._first = remove.next;
      if (this._first) this._first.prev = null;
      this._last = this._first ? this._last : null;
      return remove.value
    }
    first () {
      return this._first && this._first.value
    }
    last () {
      return this._last && this._last.value
    }
    remove (item) {
      if (item.prev) item.prev.next = item.next;
      if (item.next) item.next.prev = item.prev;
      if (item === this._last) this._last = item.prev;
      if (item === this._first) this._first = item.next;
      item.prev = null;
      item.next = null;
    }
  }

  const Animator = {
    nextDraw: null,
    frames: new Queue(),
    timeouts: new Queue(),
    immediates: new Queue(),
    timer: () => globals.window.performance || globals.window.Date,
    transforms: [],
    frame (fn) {
      var node = Animator.frames.push({ run: fn });
      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      }
      return node
    },
    timeout (fn, delay) {
      delay = delay || 0;
      var time = Animator.timer().now() + delay;
      var node = Animator.timeouts.push({ run: fn, time: time });
      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      }
      return node
    },
    immediate (fn) {
      var node = Animator.immediates.push(fn);
      if (Animator.nextDraw === null) {
        Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
      }
      return node
    },
    cancelFrame (node) {
      node != null && Animator.frames.remove(node);
    },
    clearTimeout (node) {
      node != null && Animator.timeouts.remove(node);
    },
    cancelImmediate (node) {
      node != null && Animator.immediates.remove(node);
    },
    _draw (now) {
      var nextTimeout = null;
      var lastTimeout = Animator.timeouts.last();
      while ((nextTimeout = Animator.timeouts.shift())) {
        if (now >= nextTimeout.time) {
          nextTimeout.run();
        } else {
          Animator.timeouts.push(nextTimeout);
        }
        if (nextTimeout === lastTimeout) break
      }
      var nextFrame = null;
      var lastFrame = Animator.frames.last();
      while ((nextFrame !== lastFrame) && (nextFrame = Animator.frames.shift())) {
        nextFrame.run(now);
      }
      var nextImmediate = null;
      while ((nextImmediate = Animator.immediates.shift())) {
        nextImmediate();
      }
      Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first()
        ? globals.window.requestAnimationFrame(Animator._draw)
        : null;
    }
  };

  var makeSchedule = function (runnerInfo) {
    var start = runnerInfo.start;
    var duration = runnerInfo.runner.duration();
    var end = start + duration;
    return { start: start, duration: duration, end: end, runner: runnerInfo.runner }
  };
  const defaultSource = function () {
    const w = globals.window;
    return (w.performance || w.Date).now()
  };
  class Timeline extends EventTarget {
    constructor (timeSource = defaultSource) {
      super();
      this._timeSource = timeSource;
      this._startTime = 0;
      this._speed = 1.0;
      this._persist = 0;
      this._nextFrame = null;
      this._paused = true;
      this._runners = [];
      this._runnerIds = [];
      this._lastRunnerId = -1;
      this._time = 0;
      this._lastSourceTime = 0;
      this._lastStepTime = 0;
      this._step = this._stepFn.bind(this, false);
      this._stepImmediate = this._stepFn.bind(this, true);
    }
    schedule (runner, delay, when) {
      if (runner == null) {
        return this._runners.map(makeSchedule)
      }
      var absoluteStartTime = 0;
      var endTime = this.getEndTime();
      delay = delay || 0;
      if (when == null || when === 'last' || when === 'after') {
        absoluteStartTime = endTime;
      } else if (when === 'absolute' || when === 'start') {
        absoluteStartTime = delay;
        delay = 0;
      } else if (when === 'now') {
        absoluteStartTime = this._time;
      } else if (when === 'relative') {
        const runnerInfo = this._runners[runner.id];
        if (runnerInfo) {
          absoluteStartTime = runnerInfo.start + delay;
          delay = 0;
        }
      } else {
        throw new Error('Invalid value for the "when" parameter')
      }
      runner.unschedule();
      runner.timeline(this);
      const persist = runner.persist();
      const runnerInfo = {
        persist: persist === null ? this._persist : persist,
        start: absoluteStartTime + delay,
        runner
      };
      this._lastRunnerId = runner.id;
      this._runners.push(runnerInfo);
      this._runners.sort((a, b) => a.start - b.start);
      this._runnerIds = this._runners.map(info => info.runner.id);
      this.updateTime()._continue();
      return this
    }
    unschedule (runner) {
      var index = this._runnerIds.indexOf(runner.id);
      if (index < 0) return this
      this._runners.splice(index, 1);
      this._runnerIds.splice(index, 1);
      runner.timeline(null);
      return this
    }
    getEndTime () {
      var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];
      var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
      var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
      return lastStartTime + lastDuration
    }
    getEndTimeOfTimeline () {
      let lastEndTime = 0;
      for (var i = 0; i < this._runners.length; i++) {
        const runnerInfo = this._runners[i];
        var duration = runnerInfo ? runnerInfo.runner.duration() : 0;
        var startTime = runnerInfo ? runnerInfo.start : 0;
        const endTime = startTime + duration;
        if (endTime > lastEndTime) {
          lastEndTime = endTime;
        }
      }
      return lastEndTime
    }
    updateTime () {
      if (!this.active()) {
        this._lastSourceTime = this._timeSource();
      }
      return this
    }
    play () {
      this._paused = false;
      return this.updateTime()._continue()
    }
    pause () {
      this._paused = true;
      return this._continue()
    }
    stop () {
      this.time(0);
      return this.pause()
    }
    finish () {
      this.time(this.getEndTimeOfTimeline() + 1);
      return this.pause()
    }
    speed (speed) {
      if (speed == null) return this._speed
      this._speed = speed;
      return this
    }
    reverse (yes) {
      var currentSpeed = this.speed();
      if (yes == null) return this.speed(-currentSpeed)
      var positive = Math.abs(currentSpeed);
      return this.speed(yes ? positive : -positive)
    }
    seek (dt) {
      return this.time(this._time + dt)
    }
    time (time) {
      if (time == null) return this._time
      this._time = time;
      return this._continue(true)
    }
    persist (dtOrForever) {
      if (dtOrForever == null) return this._persist
      this._persist = dtOrForever;
      return this
    }
    source (fn) {
      if (fn == null) return this._timeSource
      this._timeSource = fn;
      return this
    }
    _stepFn (immediateStep = false) {
      var time = this._timeSource();
      var dtSource = time - this._lastSourceTime;
      if (immediateStep) dtSource = 0;
      var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
      this._lastSourceTime = time;
      if (!immediateStep) {
        this._time += dtTime;
        this._time = this._time < 0 ? 0 : this._time;
      }
      this._lastStepTime = this._time;
      this.fire('time', this._time);
      for (var k = this._runners.length; k--;) {
        const runnerInfo = this._runners[k];
        const runner = runnerInfo.runner;
        const dtToStart = this._time - runnerInfo.start;
        if (dtToStart <= 0) {
          runner.reset();
        }
      }
      var runnersLeft = false;
      for (var i = 0, len = this._runners.length; i < len; i++) {
        const runnerInfo = this._runners[i];
        const runner = runnerInfo.runner;
        let dt = dtTime;
        const dtToStart = this._time - runnerInfo.start;
        if (dtToStart <= 0) {
          runnersLeft = true;
          continue
        } else if (dtToStart < dt) {
          dt = dtToStart;
        }
        if (!runner.active()) continue
        var finished = runner.step(dt).done;
        if (!finished) {
          runnersLeft = true;
        } else if (runnerInfo.persist !== true) {
          var endTime = runner.duration() - runner.time() + this._time;
          if (endTime + runnerInfo.persist < this._time) {
            runner.unschedule();
            --i;
            --len;
          }
        }
      }
      if ((runnersLeft && !(this._speed < 0 && this._time === 0)) || (this._runnerIds.length && this._speed < 0 && this._time > 0)) {
        this._continue();
      } else {
        this.pause();
        this.fire('finished');
      }
      return this
    }
    _continue (immediateStep = false) {
      Animator.cancelFrame(this._nextFrame);
      this._nextFrame = null;
      if (immediateStep) return this._stepImmediate()
      if (this._paused) return this
      this._nextFrame = Animator.frame(this._step);
      return this
    }
    active () {
      return !!this._nextFrame
    }
  }
  registerMethods({
    Element: {
      timeline: function (timeline) {
        if (timeline == null) {
          this._timeline = (this._timeline || new Timeline());
          return this._timeline
        } else {
          this._timeline = timeline;
          return this
        }
      }
    }
  });

  class Runner extends EventTarget {
    constructor (options) {
      super();
      this.id = Runner.id++;
      options = options == null
        ? timeline.duration
        : options;
      options = typeof options === 'function'
        ? new Controller(options)
        : options;
      this._element = null;
      this._timeline = null;
      this.done = false;
      this._queue = [];
      this._duration = typeof options === 'number' && options;
      this._isDeclarative = options instanceof Controller;
      this._stepper = this._isDeclarative ? options : new Ease();
      this._history = {};
      this.enabled = true;
      this._time = 0;
      this._lastTime = 0;
      this._reseted = true;
      this.transforms = new Matrix();
      this.transformId = 1;
      this._haveReversed = false;
      this._reverse = false;
      this._loopsDone = 0;
      this._swing = false;
      this._wait = 0;
      this._times = 1;
      this._frameId = null;
      this._persist = this._isDeclarative ? true : null;
    }
    element (element) {
      if (element == null) return this._element
      this._element = element;
      element._prepareRunner();
      return this
    }
    timeline (timeline) {
      if (typeof timeline === 'undefined') return this._timeline
      this._timeline = timeline;
      return this
    }
    animate (duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var runner = new Runner(o.duration);
      if (this._timeline) runner.timeline(this._timeline);
      if (this._element) runner.element(this._element);
      return runner.loop(o).schedule(o.delay, o.when)
    }
    schedule (timeline, delay, when) {
      if (!(timeline instanceof Timeline)) {
        when = delay;
        delay = timeline;
        timeline = this.timeline();
      }
      if (!timeline) {
        throw Error('Runner cannot be scheduled without timeline')
      }
      timeline.schedule(this, delay, when);
      return this
    }
    unschedule () {
      var timeline = this.timeline();
      timeline && timeline.unschedule(this);
      return this
    }
    loop (times, swing, wait) {
      if (typeof times === 'object') {
        swing = times.swing;
        wait = times.wait;
        times = times.times;
      }
      this._times = times || Infinity;
      this._swing = swing || false;
      this._wait = wait || 0;
      if (this._times === true) { this._times = Infinity; }
      return this
    }
    delay (delay) {
      return this.animate(0, delay)
    }
    queue (initFn, runFn, retargetFn, isTransform) {
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
      return this
    }
    during (fn) {
      return this.queue(null, fn)
    }
    after (fn) {
      return this.on('finished', fn)
    }
    time (time) {
      if (time == null) {
        return this._time
      }
      const dt = time - this._time;
      this.step(dt);
      return this
    }
    duration () {
      return this._times * (this._wait + this._duration) - this._wait
    }
    loops (p) {
      var loopDuration = this._duration + this._wait;
      if (p == null) {
        var loopsDone = Math.floor(this._time / loopDuration);
        var relativeTime = (this._time - loopsDone * loopDuration);
        var position = relativeTime / this._duration;
        return Math.min(loopsDone + position, this._times)
      }
      var whole = Math.floor(p);
      var partial = p % 1;
      var time = loopDuration * whole + this._duration * partial;
      return this.time(time)
    }
    persist (dtOrForever) {
      if (dtOrForever == null) return this._persist
      this._persist = dtOrForever;
      return this
    }
    position (p) {
      var x = this._time;
      var d = this._duration;
      var w = this._wait;
      var t = this._times;
      var s = this._swing;
      var r = this._reverse;
      var position;
      if (p == null) {
        const f = function (x) {
          var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
          var backwards = (swinging && !r) || (!swinging && r);
          var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
          var clipped = Math.max(Math.min(uncliped, 1), 0);
          return clipped
        };
        var endTime = t * (w + d) - w;
        position = x <= 0 ? Math.round(f(1e-5))
          : x < endTime ? f(x)
          : Math.round(f(endTime - 1e-5));
        return position
      }
      var loopsDone = Math.floor(this.loops());
      var swingForward = s && (loopsDone % 2 === 0);
      var forwards = (swingForward && !r) || (r && swingForward);
      position = loopsDone + (forwards ? p : 1 - p);
      return this.loops(position)
    }
    progress (p) {
      if (p == null) {
        return Math.min(1, this._time / this.duration())
      }
      return this.time(p * this.duration())
    }
    step (dt) {
      if (!this.enabled) return this
      dt = dt == null ? 16 : dt;
      this._time += dt;
      var position = this.position();
      var running = this._lastPosition !== position && this._time >= 0;
      this._lastPosition = position;
      var duration = this.duration();
      var justStarted = this._lastTime <= 0 && this._time > 0;
      var justFinished = this._lastTime < duration && this._time >= duration;
      this._lastTime = this._time;
      if (justStarted) {
        this.fire('start', this);
      }
      var declarative = this._isDeclarative;
      this.done = !declarative && !justFinished && this._time >= duration;
      this._reseted = false;
      if (running || declarative) {
        this._initialise(running);
        this.transforms = new Matrix();
        var converged = this._run(declarative ? dt : position);
        this.fire('step', this);
      }
      this.done = this.done || (converged && declarative);
      if (justFinished) {
        this.fire('finished', this);
      }
      return this
    }
    reset () {
      if (this._reseted) return this
      this.time(0);
      this._reseted = true;
      return this
    }
    finish () {
      return this.step(Infinity)
    }
    reverse (reverse) {
      this._reverse = reverse == null ? !this._reverse : reverse;
      return this
    }
    ease (fn) {
      this._stepper = new Ease(fn);
      return this
    }
    active (enabled) {
      if (enabled == null) return this.enabled
      this.enabled = enabled;
      return this
    }
    _rememberMorpher (method, morpher) {
      this._history[method] = {
        morpher: morpher,
        caller: this._queue[this._queue.length - 1]
      };
      if (this._isDeclarative) {
        var timeline = this.timeline();
        timeline && timeline.play();
      }
    }
    _tryRetarget (method, target, extra) {
      if (this._history[method]) {
        if (!this._history[method].caller.initialised) {
          const index = this._queue.indexOf(this._history[method].caller);
          this._queue.splice(index, 1);
          return false
        }
        if (this._history[method].caller.retarget) {
          this._history[method].caller.retarget(target, extra);
        } else {
          this._history[method].morpher.to(target);
        }
        this._history[method].caller.finished = false;
        var timeline = this.timeline();
        timeline && timeline.play();
        return true
      }
      return false
    }
    _initialise (running) {
      if (!running && !this._isDeclarative) return
      for (var i = 0, len = this._queue.length; i < len; ++i) {
        var current = this._queue[i];
        var needsIt = this._isDeclarative || (!current.initialised && running);
        running = !current.finished;
        if (needsIt && running) {
          current.initialiser.call(this);
          current.initialised = true;
        }
      }
    }
    _run (positionOrDt) {
      var allfinished = true;
      for (var i = 0, len = this._queue.length; i < len; ++i) {
        var current = this._queue[i];
        var converged = current.runner.call(this, positionOrDt);
        current.finished = current.finished || (converged === true);
        allfinished = allfinished && current.finished;
      }
      return allfinished
    }
    addTransform (transform, index) {
      this.transforms.lmultiplyO(transform);
      return this
    }
    clearTransform () {
      this.transforms = new Matrix();
      return this
    }
    clearTransformsFromQueue () {
      if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
        this._queue = this._queue.filter((item) => {
          return !item.isTransform
        });
      }
    }
    static sanitise (duration, delay, when) {
      var times = 1;
      var swing = false;
      var wait = 0;
      duration = duration || timeline.duration;
      delay = delay || timeline.delay;
      when = when || 'last';
      if (typeof duration === 'object' && !(duration instanceof Stepper)) {
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
      }
    }
  }
  Runner.id = 0;
  class FakeRunner {
    constructor (transforms = new Matrix(), id = -1, done = true) {
      this.transforms = transforms;
      this.id = id;
      this.done = done;
    }
    clearTransformsFromQueue () { }
  }
  extend([ Runner, FakeRunner ], {
    mergeWith (runner) {
      return new FakeRunner(
        runner.transforms.lmultiply(this.transforms),
        runner.id
      )
    }
  });
  const lmultiply = (last, curr) => last.lmultiplyO(curr);
  const getRunnerTransform = (runner) => runner.transforms;
  function mergeTransforms () {
    const runners = this._transformationRunners.runners;
    const netTransform = runners
      .map(getRunnerTransform)
      .reduce(lmultiply, new Matrix());
    this.transform(netTransform);
    this._transformationRunners.merge();
    if (this._transformationRunners.length() === 1) {
      this._frameId = null;
    }
  }
  class RunnerArray {
    constructor () {
      this.runners = [];
      this.ids = [];
    }
    add (runner) {
      if (this.runners.includes(runner)) return
      const id = runner.id + 1;
      this.runners.push(runner);
      this.ids.push(id);
      return this
    }
    getByID (id) {
      return this.runners[this.ids.indexOf(id + 1)]
    }
    remove (id) {
      const index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1);
      this.runners.splice(index, 1);
      return this
    }
    merge () {
      let lastRunner = null;
      this.runners.forEach((runner, i) => {
        const condition = lastRunner
          && runner.done && lastRunner.done
          && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id))
          && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));
        if (condition) {
          this.remove(runner.id);
          this.edit(lastRunner.id, runner.mergeWith(lastRunner));
        }
        lastRunner = runner;
      });
      return this
    }
    edit (id, newRunner) {
      const index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1, id + 1);
      this.runners.splice(index, 1, newRunner);
      return this
    }
    length () {
      return this.ids.length
    }
    clearBefore (id) {
      const deleteCnt = this.ids.indexOf(id + 1) || 1;
      this.ids.splice(0, deleteCnt, 0);
      this.runners.splice(0, deleteCnt, new FakeRunner())
        .forEach((r) => r.clearTransformsFromQueue());
      return this
    }
  }
  registerMethods({
    Element: {
      animate (duration, delay, when) {
        var o = Runner.sanitise(duration, delay, when);
        var timeline = this.timeline();
        return new Runner(o.duration)
          .loop(o)
          .element(this)
          .timeline(timeline.play())
          .schedule(o.delay, o.when)
      },
      delay (by, when) {
        return this.animate(0, by, when)
      },
      _clearTransformRunnersBefore (currentRunner) {
        this._transformationRunners.clearBefore(currentRunner.id);
      },
      _currentTransform (current) {
        return this._transformationRunners.runners
          .filter((runner) => runner.id <= current.id)
          .map(getRunnerTransform)
          .reduce(lmultiply, new Matrix())
      },
      _addRunner (runner) {
        this._transformationRunners.add(runner);
        Animator.cancelImmediate(this._frameId);
        this._frameId = Animator.immediate(mergeTransforms.bind(this));
      },
      _prepareRunner () {
        if (this._frameId == null) {
          this._transformationRunners = new RunnerArray()
            .add(new FakeRunner(new Matrix(this)));
        }
      }
    }
  });
  extend(Runner, {
    attr (a, v) {
      return this.styleAttr('attr', a, v)
    },
    css (s, v) {
      return this.styleAttr('css', s, v)
    },
    styleAttr (type, name, val) {
      if (typeof name === 'object') {
        for (var key in name) {
          this.styleAttr(type, key, name[key]);
        }
        return this
      }
      var morpher = new Morphable(this._stepper).to(val);
      this.queue(function () {
        morpher = morpher.from(this.element()[type](name));
      }, function (pos) {
        this.element()[type](name, morpher.at(pos));
        return morpher.done()
      });
      return this
    },
    zoom (level, point) {
      if (this._tryRetarget('zoom', to, point)) return this
      var morpher = new Morphable(this._stepper).to(new SVGNumber(level));
      this.queue(function () {
        morpher = morpher.from(this.element().zoom());
      }, function (pos) {
        this.element().zoom(morpher.at(pos), point);
        return morpher.done()
      }, function (newLevel, newPoint) {
        point = newPoint;
        morpher.to(newLevel);
      });
      this._rememberMorpher('zoom', morpher);
      return this
    },
    transform (transforms, relative, affine) {
      relative = transforms.relative || relative;
      if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
        return this
      }
      var isMatrix = Matrix.isMatrixLike(transforms);
      affine = transforms.affine != null
        ? transforms.affine
        : (affine != null ? affine : !isMatrix);
      const morpher = new Morphable(this._stepper)
        .type(affine ? TransformBag : Matrix);
      let origin;
      let element;
      let current;
      let currentAngle;
      let startTransform;
      function setup () {
        element = element || this.element();
        origin = origin || getOrigin(transforms, element);
        startTransform = new Matrix(relative ? undefined : element);
        element._addRunner(this);
        if (!relative) {
          element._clearTransformRunnersBefore(this);
        }
      }
      function run (pos) {
        if (!relative) this.clearTransform();
        const { x, y } = new Point(origin).transform(element._currentTransform(this));
        let target = new Matrix({ ...transforms, origin: [ x, y ] });
        let start = this._isDeclarative && current
          ? current
          : startTransform;
        if (affine) {
          target = target.decompose(x, y);
          start = start.decompose(x, y);
          const rTarget = target.rotate;
          const rCurrent = start.rotate;
          const possibilities = [ rTarget - 360, rTarget, rTarget + 360 ];
          const distances = possibilities.map(a => Math.abs(a - rCurrent));
          const shortest = Math.min(...distances);
          const index = distances.indexOf(shortest);
          target.rotate = possibilities[index];
        }
        if (relative) {
          if (!isMatrix) {
            target.rotate = transforms.rotate || 0;
          }
          if (this._isDeclarative && currentAngle) {
            start.rotate = currentAngle;
          }
        }
        morpher.from(start);
        morpher.to(target);
        const affineParameters = morpher.at(pos);
        currentAngle = affineParameters.rotate;
        current = new Matrix(affineParameters);
        this.addTransform(current);
        element._addRunner(this);
        return morpher.done()
      }
      function retarget (newTransforms) {
        if (
          (newTransforms.origin || 'center').toString()
          !== (transforms.origin || 'center').toString()
        ) {
          origin = getOrigin(transforms, element);
        }
        transforms = { ...newTransforms, origin };
      }
      this.queue(setup, run, retarget, true);
      this._isDeclarative && this._rememberMorpher('transform', morpher);
      return this
    },
    x (x, relative) {
      return this._queueNumber('x', x)
    },
    y (y) {
      return this._queueNumber('y', y)
    },
    dx (x = 0) {
      return this._queueNumberDelta('x', x)
    },
    dy (y = 0) {
      return this._queueNumberDelta('y', y)
    },
    dmove (x, y) {
      return this.dx(x).dy(y)
    },
    _queueNumberDelta (method, to) {
      to = new SVGNumber(to);
      if (this._tryRetarget(method, to)) return this
      var morpher = new Morphable(this._stepper).to(to);
      var from = null;
      this.queue(function () {
        from = this.element()[method]();
        morpher.from(from);
        morpher.to(from + to);
      }, function (pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done()
      }, function (newTo) {
        morpher.to(from + new SVGNumber(newTo));
      });
      this._rememberMorpher(method, morpher);
      return this
    },
    _queueObject (method, to) {
      if (this._tryRetarget(method, to)) return this
      var morpher = new Morphable(this._stepper).to(to);
      this.queue(function () {
        morpher.from(this.element()[method]());
      }, function (pos) {
        this.element()[method](morpher.at(pos));
        return morpher.done()
      });
      this._rememberMorpher(method, morpher);
      return this
    },
    _queueNumber (method, value) {
      return this._queueObject(method, new SVGNumber(value))
    },
    cx (x) {
      return this._queueNumber('cx', x)
    },
    cy (y) {
      return this._queueNumber('cy', y)
    },
    move (x, y) {
      return this.x(x).y(y)
    },
    center (x, y) {
      return this.cx(x).cy(y)
    },
    size (width, height) {
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
      return this
        .width(width)
        .height(height)
    },
    width (width) {
      return this._queueNumber('width', width)
    },
    height (height) {
      return this._queueNumber('height', height)
    },
    plot (a, b, c, d) {
      if (arguments.length === 4) {
        return this.plot([ a, b, c, d ])
      }
      if (this._tryRetarget('plot', a)) return this
      var morpher = new Morphable(this._stepper)
        .type(this._element.MorphArray).to(a);
      this.queue(function () {
        morpher.from(this._element.array());
      }, function (pos) {
        this._element.plot(morpher.at(pos));
        return morpher.done()
      });
      this._rememberMorpher('plot', morpher);
      return this
    },
    leading (value) {
      return this._queueNumber('leading', value)
    },
    viewbox (x, y, width, height) {
      return this._queueObject('viewbox', new Box(x, y, width, height))
    },
    update (o) {
      if (typeof o !== 'object') {
        return this.update({
          offset: arguments[0],
          color: arguments[1],
          opacity: arguments[2]
        })
      }
      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
      if (o.color != null) this.attr('stop-color', o.color);
      if (o.offset != null) this.attr('offset', o.offset);
      return this
    }
  });
  extend(Runner, { rx, ry, from, to });
  register(Runner, 'Runner');

  class Svg extends Container {
    constructor (node) {
      super(nodeOrNew('svg', node), node);
      this.namespace();
    }
    isRoot () {
      return !this.node.parentNode
        || !(this.node.parentNode instanceof globals.window.SVGElement)
        || this.node.parentNode.nodeName === '#document'
    }
    root () {
      if (this.isRoot()) return this
      return super.root()
    }
    namespace () {
      if (!this.isRoot()) return this.root().namespace()
      return this
        .attr({ xmlns: ns, version: '1.1' })
        .attr('xmlns:xlink', xlink, xmlns)
        .attr('xmlns:svgjs', svgjs, xmlns)
    }
    defs () {
      if (!this.isRoot()) return this.root().defs()
      return adopt(this.node.querySelector('defs'))
        || this.put(new Defs())
    }
    parent (type) {
      if (this.isRoot()) {
        return this.node.parentNode.nodeName === '#document'
          ? null
          : adopt(this.node.parentNode)
      }
      return super.parent(type)
    }
    clear () {
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      }
      delete this._defs;
      return this
    }
  }
  registerMethods({
    Container: {
      nested: wrapWithAttrCheck(function () {
        return this.put(new Svg())
      })
    }
  });
  register(Svg, 'Svg', true);

  class Symbol extends Container {
    constructor (node) {
      super(nodeOrNew('symbol', node), node);
    }
  }
  registerMethods({
    Container: {
      symbol: wrapWithAttrCheck(function () {
        return this.put(new Symbol())
      })
    }
  });
  register(Symbol, 'Symbol');

  function plain (text) {
    if (this._build === false) {
      this.clear();
    }
    this.node.appendChild(globals.document.createTextNode(text));
    return this
  }
  function length () {
    return this.node.getComputedTextLength()
  }

  var textable = /*#__PURE__*/Object.freeze({
    __proto__: null,
    plain: plain,
    length: length
  });

  class Text$1 extends Shape {
    constructor (node) {
      super(nodeOrNew('text', node), node);
      this.dom.leading = new SVGNumber(1.3);
      this._rebuild = true;
      this._build = false;
    }
    x (x, box = this.bbox()) {
      if (x == null) {
        return box.x
      }
      return this.attr('x', this.attr('x') + x - box.x)
    }
    y (y, box = this.bbox()) {
      if (y == null) {
        return box.y
      }
      return this.attr('y', this.attr('y') + y - box.y)
    }
    move (x, y, box = this.bbox()) {
      return this.x(x, box).y(y, box)
    }
    cx (x, box = this.bbox()) {
      if (x == null) {
        return box.cx
      }
      return this.attr('x', this.attr('x') + x - box.cx)
    }
    cy (y, box = this.bbox()) {
      if (y == null) {
        return box.cy
      }
      return this.attr('y', this.attr('y') + y - box.cy)
    }
    center (x, y, box = this.bbox()) {
      return this.cx(x, box).cy(y, box)
    }
    text (text) {
      if (text === undefined) {
        var children = this.node.childNodes;
        var firstLine = 0;
        text = '';
        for (var i = 0, len = children.length; i < len; ++i) {
          if (children[i].nodeName === 'textPath') {
            if (i === 0) firstLine = 1;
            continue
          }
          if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
            text += '\n';
          }
          text += children[i].textContent;
        }
        return text
      }
      this.clear().build(true);
      if (typeof text === 'function') {
        text.call(this, this);
      } else {
        text = text.split('\n');
        for (var j = 0, jl = text.length; j < jl; j++) {
          this.tspan(text[j]).newLine();
        }
      }
      return this.build(false).rebuild()
    }
    leading (value) {
      if (value == null) {
        return this.dom.leading
      }
      this.dom.leading = new SVGNumber(value);
      return this.rebuild()
    }
    rebuild (rebuild) {
      if (typeof rebuild === 'boolean') {
        this._rebuild = rebuild;
      }
      if (this._rebuild) {
        var self = this;
        var blankLineOffset = 0;
        var leading = this.dom.leading;
        this.each(function () {
          var fontSize = globals.window.getComputedStyle(this.node)
            .getPropertyValue('font-size');
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
      return this
    }
    build (build) {
      this._build = !!build;
      return this
    }
    setData (o) {
      this.dom = o;
      this.dom.leading = new SVGNumber(o.leading || 1.3);
      return this
    }
  }
  extend(Text$1, textable);
  registerMethods({
    Container: {
      text: wrapWithAttrCheck(function (text) {
        return this.put(new Text$1()).text(text)
      }),
      plain: wrapWithAttrCheck(function (text) {
        return this.put(new Text$1()).plain(text)
      })
    }
  });
  register(Text$1, 'Text');

  class Tspan extends Text$1 {
    constructor (node) {
      super(nodeOrNew('tspan', node), node);
    }
    text (text) {
      if (text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')
      typeof text === 'function' ? text.call(this, this) : this.plain(text);
      return this
    }
    dx (dx) {
      return this.attr('dx', dx)
    }
    dy (dy) {
      return this.attr('dy', dy)
    }
    x (x) {
      return this.attr('x', x)
    }
    y (y) {
      return this.attr('x', y)
    }
    move (x, y) {
      return this.x(x).y(y)
    }
    newLine () {
      var t = this.parent(Text$1);
      this.dom.newLined = true;
      var fontSize = globals.window.getComputedStyle(this.node)
        .getPropertyValue('font-size');
      var dy = t.dom.leading * new SVGNumber(fontSize);
      return this.dy(dy).attr('x', t.x())
    }
  }
  extend(Tspan, textable);
  registerMethods({
    Tspan: {
      tspan: wrapWithAttrCheck(function (text) {
        var tspan = new Tspan();
        if (!this._build) {
          this.clear();
        }
        this.node.appendChild(tspan.node);
        return tspan.text(text)
      })
    }
  });
  register(Tspan, 'Tspan');

  class ClipPath extends Container {
    constructor (node) {
      super(nodeOrNew('clipPath', node), node);
    }
    remove () {
      this.targets().forEach(function (el) {
        el.unclip();
      });
      return super.remove()
    }
    targets () {
      return baseFind('svg [clip-path*="' + this.id() + '"]')
    }
  }
  registerMethods({
    Container: {
      clip: wrapWithAttrCheck(function () {
        return this.defs().put(new ClipPath())
      })
    },
    Element: {
      clipWith (element) {
        const clipper = element instanceof ClipPath
          ? element
          : this.parent().clip().add(element);
        return this.attr('clip-path', 'url("#' + clipper.id() + '")')
      },
      unclip () {
        return this.attr('clip-path', null)
      },
      clipper () {
        return this.reference('clip-path')
      }
    }
  });
  register(ClipPath, 'ClipPath');

  class ForeignObject extends Element$1 {
    constructor (node) {
      super(nodeOrNew('foreignObject', node), node);
    }
  }
  registerMethods({
    Container: {
      foreignObject: wrapWithAttrCheck(function (width, height) {
        return this.put(new ForeignObject()).size(width, height)
      })
    }
  });
  register(ForeignObject, 'ForeignObject');

  class G extends Container {
    constructor (node) {
      super(nodeOrNew('g', node), node);
    }
    x (x, box = this.bbox()) {
      if (x == null) return box.x
      return this.move(x, box.y, box)
    }
    y (y, box = this.bbox()) {
      if (y == null) return box.y
      return this.move(box.x, y, box)
    }
    move (x = 0, y = 0, box = this.bbox()) {
      const dx = x - box.x;
      const dy = y - box.y;
      return this.dmove(dx, dy)
    }
    dx (dx) {
      return this.dmove(dx, 0)
    }
    dy (dy) {
      return this.dmove(0, dy)
    }
    dmove (dx, dy) {
      this.children().forEach((child, i) => {
        const bbox = child.bbox();
        const m = new Matrix(child);
        const matrix = m.translate(dx, dy).transform(m.inverse());
        const p = new Point(bbox.x, bbox.y).transform(matrix);
        child.move(p.x, p.y);
      });
      return this
    }
    width (width, box = this.bbox()) {
      if (width == null) return box.width
      return this.size(width, box.height, box)
    }
    height (height, box = this.bbox()) {
      if (height == null) return box.height
      return this.size(box.width, height, box)
    }
    size (width, height, box = this.bbox()) {
      const p = proportionalSize(this, width, height, box);
      const scaleX = p.width / box.width;
      const scaleY = p.height / box.height;
      this.children().forEach((child, i) => {
        const o = new Point(box).transform(new Matrix(child).inverse());
        child.scale(scaleX, scaleY, o.x, o.y);
      });
      return this
    }
  }
  registerMethods({
    Container: {
      group: wrapWithAttrCheck(function () {
        return this.put(new G())
      })
    }
  });
  register(G, 'G');

  class A extends Container {
    constructor (node) {
      super(nodeOrNew('a', node), node);
    }
    to (url) {
      return this.attr('href', url, xlink)
    }
    target (target) {
      return this.attr('target', target)
    }
  }
  registerMethods({
    Container: {
      link: wrapWithAttrCheck(function (url) {
        return this.put(new A()).to(url)
      })
    },
    Element: {
      linkTo: function (url) {
        var link = new A();
        if (typeof url === 'function') {
          url.call(link, link);
        } else {
          link.to(url);
        }
        return this.parent().put(link).put(this)
      }
    }
  });
  register(A, 'A');

  class Mask extends Container {
    constructor (node) {
      super(nodeOrNew('mask', node), node);
    }
    remove () {
      this.targets().forEach(function (el) {
        el.unmask();
      });
      return super.remove()
    }
    targets () {
      return baseFind('svg [mask*="' + this.id() + '"]')
    }
  }
  registerMethods({
    Container: {
      mask: wrapWithAttrCheck(function () {
        return this.defs().put(new Mask())
      })
    },
    Element: {
      maskWith (element) {
        var masker = element instanceof Mask
          ? element
          : this.parent().mask().add(element);
        return this.attr('mask', 'url("#' + masker.id() + '")')
      },
      unmask () {
        return this.attr('mask', null)
      },
      masker () {
        return this.reference('mask')
      }
    }
  });
  register(Mask, 'Mask');

  function cssRule (selector, rule) {
    if (!selector) return ''
    if (!rule) return selector
    var ret = selector + '{';
    for (var i in rule) {
      ret += unCamelCase(i) + ':' + rule[i] + ';';
    }
    ret += '}';
    return ret
  }
  class Style extends Element$1 {
    constructor (node) {
      super(nodeOrNew('style', node), node);
    }
    addText (w = '') {
      this.node.textContent += w;
      return this
    }
    font (name, src, params = {}) {
      return this.rule('@font-face', {
        fontFamily: name,
        src: src,
        ...params
      })
    }
    rule (selector, obj) {
      return this.addText(cssRule(selector, obj))
    }
  }
  registerMethods('Dom', {
    style: wrapWithAttrCheck(function (selector, obj) {
      return this.put(new Style()).rule(selector, obj)
    }),
    fontface: wrapWithAttrCheck(function (name, src, params) {
      return this.put(new Style()).font(name, src, params)
    })
  });
  register(Style, 'Style');

  class TextPath extends Text$1 {
    constructor (node) {
      super(nodeOrNew('textPath', node), node);
    }
    array () {
      var track = this.track();
      return track ? track.array() : null
    }
    plot (d) {
      var track = this.track();
      var pathArray = null;
      if (track) {
        pathArray = track.plot(d);
      }
      return (d == null) ? pathArray : this
    }
    track () {
      return this.reference('href')
    }
  }
  registerMethods({
    Container: {
      textPath: wrapWithAttrCheck(function (text, path) {
        if (!(text instanceof Text$1)) {
          text = this.text(text);
        }
        return text.path(path)
      })
    },
    Text: {
      path: wrapWithAttrCheck(function (track, importNodes = true) {
        var textPath = new TextPath();
        if (!(track instanceof Path$2)) {
          track = this.defs().path(track);
        }
        textPath.attr('href', '#' + track, xlink);
        let node;
        if (importNodes) {
          while ((node = this.node.firstChild)) {
            textPath.node.appendChild(node);
          }
        }
        return this.put(textPath)
      }),
      textPath () {
        return this.findOne('textPath')
      }
    },
    Path: {
      text: wrapWithAttrCheck(function (text) {
        if (!(text instanceof Text$1)) {
          text = new Text$1().addTo(this.parent()).text(text);
        }
        return text.path(this)
      }),
      targets () {
        return baseFind('svg [href*="' + this.id() + '"]')
      }
    }
  });
  TextPath.prototype.MorphArray = PathArray;
  register(TextPath, 'TextPath');

  class Use extends Shape {
    constructor (node) {
      super(nodeOrNew('use', node), node);
    }
    element (element, file) {
      return this.attr('href', (file || '') + '#' + element, xlink)
    }
  }
  registerMethods({
    Container: {
      use: wrapWithAttrCheck(function (element, file) {
        return this.put(new Use()).element(element, file)
      })
    }
  });
  register(Use, 'Use');

  const SVG$1 = makeInstance;
  extend([
    Svg,
    Symbol,
    Image,
    Pattern,
    Marker
  ], getMethodsFor('viewbox'));
  extend([
    Line,
    Polyline,
    Polygon,
    Path$2
  ], getMethodsFor('marker'));
  extend(Text$1, getMethodsFor('Text'));
  extend(Path$2, getMethodsFor('Path'));
  extend(Defs, getMethodsFor('Defs'));
  extend([
    Text$1,
    Tspan
  ], getMethodsFor('Tspan'));
  extend([
    Rect,
    Ellipse,
    Circle,
    Gradient
  ], getMethodsFor('radius'));
  extend(EventTarget, getMethodsFor('EventTarget'));
  extend(Dom, getMethodsFor('Dom'));
  extend(Element$1, getMethodsFor('Element'));
  extend(Shape, getMethodsFor('Shape'));
  extend(Container, getMethodsFor('Container'));
  extend(Runner, getMethodsFor('Runner'));
  List.extend(getMethodNames());
  registerMorphableType([
    SVGNumber,
    Color,
    Box,
    Matrix,
    SVGArray,
    PointArray,
    PathArray
  ]);
  makeMorphable();

  // @ts-check
  // import css from "text!../../src/pcisig/css/regpict.css";

  const name$B = "pcisig/regpict";

  const cssPromise$5 = loadStyle$a();

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

  async function loadStyle$a() {
    try {
      return (await Promise.resolve().then(function () { return regpict$1; })).default;
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
  function mergeJSON(target, src) {
    ++mergeCount;
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
        result = mergeJSON(result, me.textContent);
        me.classList.add("hide");
        if (debug2) ;
      } catch (e) {
        const title = `Invalid JSON in element ${me} ${e.toString()}`;
        showError(title, name$B);
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
          `${
          `${i} leftOf   left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit= ${adj_bit}`
        }${isMultiRow ? ` wordWidth=${wordWidth}` : ""}\t--> ret= ${ret}`
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
          `${
          `${i} rightOf  left_to_right= ${left_to_right} ` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`
        }${isMultiRow ? ` wordWidth=${wordWidth}` : ""}\t--> ret=${ret}`
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
          `${
          `${i} middleOf left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`
        }${isMultiRow ? ` wordWidth=${wordWidth}` : ""}\t--> ret=${ret}`
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

    const svg = SVG$1().addTo(divsvg).attr({ width: 800, height: 500 }); // will be overridden

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
              `bitnum-middle +${byte}/${bit} at x=${middleOf(bit + byte)} y=${
              cellTop - 20
            }`
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
            `bitnum-middle +${byte} at x=${
            leftOf(byte) + cellWidth * 4
          } y= ${byteHeight}`
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
                  `bitnum-middle ${f.lsb} at x=${middleOf(f.lsb)} y=${
                  cellTop - 20
                }`
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
                  `bitnum-lsb ${f.lsb} at x=${pos} y=${
                  cellTop - 20
                } left_to_right=${left_to_right}`
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
                  `bitnum-msb ${f.msb} at x=${pos} y=${
                  cellTop - 20
                } left_to_right=${left_to_right}`
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
              `${
              `field ${f.name}` +
              ` msb=${f.msb}` +
              ` lsb=${f.lsb}` +
              ` attr=${f.attr}` +
              ` isUnused=${f.isUnused}`
            }${"id" in f ? f.id : ""}${hasValue ? " hasValue" : ""}`
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

  async function run$y(conf) {
    pub("start", "core/regpict");
    if (!conf.noRegpictCSS) {
      const css = await cssPromise$5;
      document.head.insertBefore(
        html`
        <style>
          ${css}
        </style>
      `,
        document.querySelector("link")
      );
    }
    /** @type {NodeListOf<HTMLElement>} */
    const figs = document.querySelectorAll(
      "figure.register, figure.message, figure.capability"
    );
    figs.forEach(fig => {
      // let isRegister = $fig.classList.contains("register");
      fig.classList.contains("message");
      fig.classList.contains("capability");
      fig.classList.contains("memoryBlock");

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
          mergeJSON(json, fig.getAttribute("data-json"));
        } catch (e) {
          console.log(`error: ${e.toString()}`);
          // @ts-ignore
          const err = `Invalid data-json attribute ${fig} ${e.toString()}`;
          showError(err, name$B);
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
          const err = `Invalid JSON in pre.json, div.json, or span.json $${pre} ${e.toString()}`;
          showError(err, name$B);
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
          const temp = mergeElementJSON(mergeJSON({}, json), node);
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

  var regpict$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$B,
    draw_regpict: draw_regpict,
    run: run$y
  });

  // @ts-check

  const name$A = "core/dfn";

  function run$x() {
    document.querySelectorAll("dfn").forEach(dfn => {
      const titles = getDfnTitles(dfn);
      registerDefinition(dfn, titles);

      // Treat Internal Slots as IDL.
      if (!dfn.dataset.dfnType && /^\[\[\w+\]\]$/.test(titles[0])) {
        dfn.dataset.dfnType = "idl";
      }

      // Per https://tabatkins.github.io/bikeshed/#dfn-export, a dfn with dfnType
      // other than dfn and not marked with data-no-export is to be exported.
      // We also skip "imported" definitions via data-cite.
      const ds = dfn.dataset;
      if (ds.dfnType && ds.dfnType !== "dfn" && !ds.cite && !ds.noExport) {
        dfn.dataset.export = "";
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
    name: name$A,
    run: run$x
  });

  // @ts-check

  const name$z = "core/pluralize";

  function run$w(conf) {
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

  var pluralize = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$z,
    run: run$w
  });

  // @ts-check

  const name$y = "core/examples";

  const localizationStrings$e = {
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

  const l10n$d = getIntlData(localizationStrings$e);

  const cssPromise$4 = loadStyle$9();

  async function loadStyle$9() {
    try {
      return (await Promise.resolve().then(function () { return examples$1; })).default;
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
      ? html`<span class="example-title">: ${report.title}</span>`
      : "";
    return html`<div class="marker">
    <a class="self-link">${l10n$d.example}<bdi>${number}</bdi></a
    >${title}
  </div>`;
  }

  async function run$v() {
    /** @type {NodeListOf<HTMLElement>} */
    const examples = document.querySelectorAll(
      "pre.example, pre.illegal-example, aside.example"
    );
    if (!examples.length) return;

    const css = await cssPromise$4;
    document.head.insertBefore(
      html`<style>
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
        const div = html`<div class="example" id="${id}">
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

  var examples$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$y,
    run: run$v
  });

  // @ts-check

  const name$x = "core/issues-notes";

  const localizationStrings$d = {
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

  const cssPromise$3 = loadStyle$8();

  async function loadStyle$8() {
    try {
      return (await Promise.resolve().then(function () { return issuesNotes$1; })).default;
    } catch {
      return fetchAsset("issues-notes.css");
    }
  }

  const l10n$c = getIntlData(localizationStrings$d);

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
        const div = html`<div class="${cssClass}" role="${ariaRole}"></div>`;
        const title = document.createElement("span");
        const className = `${type}-title marker`;
        // prettier-ignore
        const titleParent = html`<div role="heading" class="${className}">${title}</div>`;
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
            issueList.append(createIssueSummaryEntry(l10n$c.issue, report, div.id));
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
        ? l10n$c.feature_at_risk
        : l10n$c.issue
      : isWarning
      ? l10n$c.warning
      : isEdNote
      ? l10n$c.editors_note
      : isImpNote
      ? l10n$c.implementation_note
      : l10n$c.note;
    return { type, displayType, isFeatureAtRisk };
  }

  /**
   * @param {string} dataNum
   * @param {*} conf
   */
  function linkToIssueTracker(dataNum, conf, { isFeatureAtRisk = false } = {}) {
    // Set issueBase to cause issue to be linked to the external issue tracker
    if (!isFeatureAtRisk && conf.issueBase) {
      return html`<a href="${conf.issueBase + dataNum}" />`;
    } else if (isFeatureAtRisk && conf.atRiskBase) {
      return html`<a href="${conf.atRiskBase + dataNum}" />`;
    }
  }

  /**
   * @param {string} l10nIssue
   * @param {Report} report
   */
  function createIssueSummaryEntry(l10nIssue, report, id) {
    const issueNumberText = `${l10nIssue} ${report.number}`;
    const title = report.title
      ? html`<span style="text-transform: none">: ${report.title}</span>`
      : "";
    return html`<li><a href="${`#${id}`}">${issueNumberText}</a>${title}</li>`;
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
      : issueSummaryElement.append(html`<p>${l10n$c.no_issues_in_spec}</p>`);
    if (
      !heading ||
      (heading && heading !== issueSummaryElement.firstElementChild)
    ) {
      issueSummaryElement.insertAdjacentHTML(
        "afterbegin",
        `<h2>${l10n$c.issue_summary}</h2>`
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
      return html`<span class="issue-label" aria-label="${ariaLabel}"
      >: ${title}${labelsGroup}</span
    >`;
    }
    return html`<span class="issue-label">: ${title}${labelsGroup}</span>`;
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
    return html`<a
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

  async function run$u(conf) {
    const query = ".issue, .note, .warning, .ednote, .impnote";
    /** @type {NodeListOf<HTMLElement>} */
    const issuesAndNotes = document.querySelectorAll(query);
    if (!issuesAndNotes.length) {
      return; // nothing to do.
    }
    const ghIssues = await fetchAndStoreGithubIssues(conf.github);
    const css = await cssPromise$3;
    const { head: headElem } = document;
    headElem.insertBefore(
      html`<style>
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

  var issuesNotes$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$x,
    run: run$u
  });

  // @ts-check

  const name$w = "core/best-practices";

  const localizationStrings$c = {
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
  const l10n$b = getIntlData(localizationStrings$c);
  const lang = lang$b in localizationStrings$c ? lang$b : "en";

  function run$t() {
    /** @type {NodeListOf<HTMLElement>} */
    const bps = document.querySelectorAll(".practicelab");
    const bpSummary = document.getElementById("bp-summary");
    const summaryItems = bpSummary ? document.createElement("ul") : null;
    [...bps].forEach((bp, num) => {
      const id = addId(bp, "bp");
      const localizedBpName = html`<a class="marker self-link" href="${`#${id}`}"
      ><bdi lang="${lang}">${l10n$b.best_practice}${num + 1}</bdi></a
    >`;

      // Make the summary items, if we have a summary
      if (summaryItems) {
        const li = html`<li>${localizedBpName}: ${makeSafeCopy(bp)}</li>`;
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
      const title = html`${localizedBpName.cloneNode(true)}: ${bp}`;
      container.prepend(...title.childNodes);
    });
    if (bps.length) {
      if (bpSummary) {
        bpSummary.appendChild(html`<h2>Best Practices Summary</h2>`);
        bpSummary.appendChild(summaryItems);
      }
    } else if (bpSummary) {
      const msg = `Using best practices summary (#bp-summary) but no best practices found.`;
      showWarning(msg, name$w);
      bpSummary.remove();
    }
  }

  var bestPractices = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$w,
    run: run$t
  });

  // @ts-check
  // fixes mathml <mfenched>

  const name$v = "core/mathml-polyfill";

  // @ts-check
  /* -*- Mode: Java; tab-width: 4; indent-tabs-mode:nil; c-basic-offset: 4 -*- */
  /* vim: set ts=4 et sw=4 tw=80: */

  const MATHML_NS = "http://www.w3.org/1998/Math/MathML";

  /*
      A really basic implementation, this will be a module.
   */
  const _MathTransforms = {
    _plugins: new Map(),
    _css: "",
    _createStyleSheet: str => {
      if (str.length !== _MathTransforms.cssKey) {
        // always true the first time because _MathTransforms.cssKey is undefined
        _MathTransforms.cssKey = str.length;
        const style = document.createElement("style");
        style.textContent = str;
        document.head.appendChild(style);
        _MathTransforms.styleSheet = style; // cached stylesheet
        document.head.removeChild(style);
      }
      return _MathTransforms.styleSheet;
    },

    getCSSStyleSheet: () => {
      const foo = _MathTransforms
        ._createStyleSheet(_MathTransforms._css)
        .cloneNode(true);
      return foo;
    },

    transform: root => {
      for (const selector of _MathTransforms._plugins.keys()) {
        const transformer = _MathTransforms._plugins.get(selector);

        // find the matching elements..
        // this is problematic since you could add some
        const matches = Array.from(root.querySelectorAll(selector));

        // Since these are in tree-order, if we process them in reverse order (child first)
        // we should side-step the gnarliest of potential nesting issues
        matches.reverse().forEach(el => {
          const transformed = transformer(el);
          if (transformed && transformed !== el) {
            el.parentElement.replaceChild(transformed, el);
          }
        });
      }
    },

    add: (selector, cb, css = "") => {
      _MathTransforms._plugins.set(selector, cb);
      _MathTransforms._css += css;
    },
  };

  /**
   * Same as cloneNode(true) except that shadow roots are copied
   * If you are using the transforms and you need to clone a node that potentially has a shadowRoot, use this so the shadowRoot is copied
   * As of November, 2020, Elementary Math and Linebreaking transforms are the only transforms that have shadowRoots.
   * @param {Element} el
   * @param {Element} [clone]
   * @returns {Element} -- the clone (only useful if function is called with one arg)
   */
  function cloneElementWithShadowRoot(el, clone) {
    if (clone === undefined) {
      clone = el.cloneNode(true);
    }

    // rather than clone each element and then the children, we're assuming cloning the whole tree is most efficient
    // however, we still need to search 'el' to check for a shadowRoot.
    if (el.shadowRoot) {
      clone.attachShadow({ mode: "open" });
      for (let i = 0; i < el.shadowRoot.childElementCount; i++) {
        clone.shadowRoot.appendChild(
          cloneElementWithShadowRoot(el.shadowRoot.children[i])
        );
      }
    }

    for (let i = 0; i < el.childElementCount; i++) {
      cloneElementWithShadowRoot(el.children[i], clone.children[i]);
    }

    return clone;
  }

  /**
   * Converts a CSS length unit to pixels and returns that as a number
   * @param{Element} element
   * @param {string} length
   * @returns {number}
   */
  /* export function convertToPx(element, length) {
    // quick check to see if we have common case of 'px'
    if (/px/.test(length)) {
      return parseFloat(length);
    }

    // add a temp element with desired length; set it as the width; record the width, then delete the temp element.
    // In Safari (Aug 2020), unknown elements in MathML are thrown out, so adding a 'div' results in 0 width. For some reason, 'img' is ok.
    const img = document.createElement("img"); // create temporary element
    const leafWrapper = document.createElementNS(MATHML_NS, "mtext"); // mtext is integration point for HTML
    leafWrapper.appendChild(img);
    leafWrapper.style.overflow = "hidden";
    leafWrapper.style.visibility = "hidden";
    img.style.width = length;
    element.appendChild(leafWrapper);
    const result = leafWrapper.getBoundingClientRect().width;
    leafWrapper.remove();

    return result;
  }
  */

  /* -*- Mode: Java; tab-width: 4; indent-tabs-mode:nil; c-basic-offset: 4 -*- */
  /* vim: set ts=4 et sw=4 tw=80: */
  /*
    Copyright (c) 2016-2019 Igalia S.L.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
  */

  const namespaceURI = "http://www.w3.org/1998/Math/MathML";

  function collapseWhiteSpace(text) {
    // Collapse the whitespace as specified by the MathML specification.
    // https://mathml-refresh.github.io/mathml/chapter2.html#fund.collapse
    return text.replace(/^[\s]+|[\s]+$/g, "").replace(/[\s]+/g, " ");
  }

  function newOperator(text, separator) {
    // Create <mo fence="true">text</mo> or <mo separator="true">text</mo>.
    const operator = document.createElementNS(namespaceURI, "mo");
    operator.appendChild(document.createTextNode(text));
    operator.setAttribute(separator ? "separator" : "fence", "true");
    return operator;
  }

  function newMrow() {
    // Create an empty <mrow>.
    return document.createElementNS(namespaceURI, "mrow");
  }

  function getSeparatorList(text) {
    // Split the separators attribute into a list of characters.
    // We ignore whitespace and handle surrogate pairs.
    if (text === null) {
      return [","];
    }
    const separatorList = [];
    for (let i = 0; i < text.length; i++) {
      if (!/\s/g.test(text.charAt(i))) {
        const c = text.charCodeAt(i);
        if (c >= 0xd800 && c < 0xdc00 && i + 1 < text.length) {
          separatorList.push(text.substr(i, 2));
          i++;
        } else {
          separatorList.push(text.charAt(i));
        }
      }
    }
    return separatorList;
  }

  function shouldCopyAttribute(attribute) {
    // The <mfenced> and <mrow> elements have the same attributes except
    // that dir is only accepted on <mrow> and open/close/separators are
    // only accepted on <mfenced>.
    // https://mathml-refresh.github.io/mathml/appendixa.html#parsing.rnc.pres
    const excludedAttributes = ["dir", "open", "close", "separators"];
    return (
      attribute.namespaceURI || !excludedAttributes.includes(attribute.localName)
    );
  }

  const expandFencedElement = mfenced => {
    // Return an <mrow> element representing the expanded <mfenced>.
    // https://mathml-refresh.github.io/mathml/chapter3.html#presm.mfenced
    const outerMrow = newMrow();
    outerMrow.appendChild(
      newOperator(collapseWhiteSpace(mfenced.getAttribute("open") || "("))
    );
    if (mfenced.childElementCount === 1) {
      outerMrow.appendChild(
        cloneElementWithShadowRoot(mfenced.firstElementChild)
      );
    } else if (mfenced.childElementCount > 1) {
      const separatorList = getSeparatorList(mfenced.getAttribute("separators"));
      const innerMrow = newMrow();
      let child = mfenced.firstElementChild;
      while (child) {
        innerMrow.appendChild(cloneElementWithShadowRoot(child));
        child = child.nextElementSibling;
        if (child && separatorList.length) {
          innerMrow.appendChild(
            newOperator(
              separatorList.length > 1 ? separatorList.shift() : separatorList[0]
            )
          );
        }
      }
      outerMrow.appendChild(innerMrow);
    }
    outerMrow.appendChild(
      newOperator(collapseWhiteSpace(mfenced.getAttribute("close") || ")"))
    );
    for (let i = 0; i < mfenced.attributes.length; i++) {
      const attribute = mfenced.attributes[i];
      if (shouldCopyAttribute(attribute)) {
        outerMrow.setAttributeNS(
          attribute.namespaceURI,
          attribute.localName,
          attribute.value
        );
      }
    }
    return outerMrow;
  };

  function run$s() {
    _MathTransforms.add("mfenced", expandFencedElement);
    _MathTransforms.transform(document);
  }

  var mathmlPolyfill = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$v,
    MATHML_NS: MATHML_NS,
    run: run$s
  });

  // @ts-check

  const name$u = "core/figures";

  const localizationStrings$b = {
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

  const l10n$a = getIntlData(localizationStrings$b);

  function run$r() {
    normalizeImages$1(document);

    const tof = collectFigures();

    // Create a Table of Figures if a section with id 'tof' exists.
    const tofElement = document.getElementById("tof");
    if (tof.length && tofElement) {
      decorateTableOfFigures(tofElement);
      tofElement.append(
        html`<h2>${l10n$a.list_of_figures}</h2>`,
        html`<ul class="tof">
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
    /** @type {NodeListOf<HTMLElement>} */
    const figs = document.querySelectorAll("figure:not(.equation)");
    figs.forEach((fig, i) => {
      const caption = fig.querySelector("figcaption");

      if (caption) {
        decorateFigure(fig, caption, i);
        tof.push(getTableOfFiguresListItem(fig.id, caption));
      } else {
        const msg = "Found a '<figure>' without a `<figcaption>`";
        showWarning(msg, name$u);
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
    wrapInner(caption, html`<span class="fig-title"></span>`);
    caption.prepend(
      html`<span class="fighdr">${l10n$a.fig}</span>`,
      html`<bdi class="figno">${i + 1}</bdi>`,
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
    return html`<li class="tofline">
    <a class="tocxref" href="${`#${figureId}`}">${tofCaption.childNodes}</a>
  </li>`;
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

    const previousSections = getPreviousSections$2(tofElement);
    if (previousSections.every(sec => sec.classList.contains("introductory"))) {
      tofElement.classList.add("introductory");
    } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
      tofElement.classList.add("appendix");
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

  var figures = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$u,
    run: run$r
  });

  // @ts-check

  const name$t = "core/equations";

  const localizationStrings$a = {
    en: {
      list_of_equations: "List of Equations",
      eqn: "Equation ",
    },
  };

  const l10n$9 = getIntlData(localizationStrings$a);

  function run$q() {
    normalizeImages(document);

    const toe = collectEquations();

    // Create a Table of Equations if a section with id 'toe' exists.
    const toeElement = document.getElementById("toe");
    if (toe.length && toeElement) {
      decorateTableOfEquations(toeElement);
      toeElement.append(
        html`<h2>${l10n$9.list_of_equations}</h2>`,
        html`
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
    /** @type {NodeListOf<HTMLElement>} */
    const eqns = document.querySelectorAll("figure.equation");
    eqns.forEach((eqn, i) => {
      const caption = eqn.querySelector("figcaption");

      if (caption) {
        decorateEquation(eqn, caption, i);
        toe.push(getTableOfEquationsListItem(eqn.id, caption));
      } else {
        const msg = "Found a '<figure>' without a `<figcaption>`";
        showWarning(msg, name$t);
      }
    });
    return toe;
  }

  /**
   * @param {HTMLElement} equation
   * @param {HTMLElement} caption
   * @param {number} i
   */
  function decorateEquation(equation, caption, i) {
    const title = caption.textContent;
    addId(equation, "eqn", title);
    // set proper caption title
    wrapInner(caption, html`<span class="eqn-title"></span>`);
    caption.prepend(
      html`<span class="eqnhdr">${l10n$9.eqn}</span>`,
      html`<bdi class="eqnno">${i + 1}</bdi>`,
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
    return html`
    <li class="toeline">
      <a class="tocxref" href="${`#${equationId}`}">${toeCaption.childNodes}</a>
    </li>
  `;
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
    name: name$t,
    run: run$q
  });

  // @ts-check

  const name$s = "core/tables";

  const localizationStrings$9 = {
    en: {
      list_of_tables: "List of Tables",
      tbl: "Table ",
    },
  };

  const l10n$8 = getIntlData(localizationStrings$9);

  function run$p() {
    const tot = collectTables();

    // Create a Table of Tables if a section with id 'tot' exists.
    const totElement = document.getElementById("tot");
    if (tot.length && totElement) {
      decorateTableOfTables(totElement);
      totElement.append(
        html`<h2>${l10n$8.list_of_tables}</h2>`,
        html`
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
    wrapInner(caption, html`<span class="tbl-title"></span>`);
    caption.prepend(
      html`<span class="tblhdr">${l10n$8.tbl}</span>`,
      html`<bdi class="tblno">${i + 1}</bdi>`,
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
    return html`
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

    const previousSections = getPreviousSections(totElement);
    if (previousSections.every(sec => sec.classList.contains("introductory"))) {
      totElement.classList.add("introductory");
    } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
      totElement.classList.add("appendix");
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

  var tables = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$s,
    run: run$p
  });

  // @ts-check
  /**
   * Module core/webidl-clipboard
   *
   * This module adds a button to each IDL pre making it possible to copy
   * well-formatted IDL to the clipboard.
   *
   */
  const name$r = "core/webidl-clipboard";

  function createButton() {
    const copyButton = document.createElement("button");
    copyButton.innerHTML =
      '<svg height="16" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"/></svg>';
    copyButton.title = "Copy IDL to clipboard";
    copyButton.classList.add("respec-button-copy-paste", "removeOnSave");
    return copyButton;
  }

  const copyButton = createButton();

  /**
   * Adds a HTML button that copies WebIDL to the clipboard.
   *
   * @param {HTMLSpanElement} idlHeader
   */
  function addCopyIDLButton(idlHeader) {
    // There may be multiple <span>s of IDL, so we take everything
    // apart from the idl header.
    const pre = idlHeader.closest("pre.idl");
    const idl = pre.cloneNode(true);
    idl.querySelector(".idlHeader").remove();
    const { textContent: idlText } = idl;
    const button = copyButton.cloneNode(true);
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(idlText);
    });
    idlHeader.append(button);
  }

  var webidlClipboard = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$r,
    addCopyIDLButton: addCopyIDLButton
  });

  // Module core/webidl

  const name$q = "core/webidl";
  const pluginName = name$q;

  const operationNames = {};
  const idlPartials = {};

  const templates = {
    wrap(items) {
      return items
        .flat()
        .filter(x => x !== "")
        .map(x => (typeof x === "string" ? new Text(x) : x));
    },
    trivia(t) {
      if (!t.trim()) {
        return t;
      }
      return html`<span class="idlSectionComment">${t}</span>`;
    },
    generic(keyword) {
      // Shepherd classifies "interfaces" as starting with capital letters,
      // like Promise, FrozenArray, etc.
      return /^[A-Z]/.test(keyword)
        ? html`<a data-xref-type="interface" data-cite="WebIDL">${keyword}</a>`
        : // Other keywords like sequence, maplike, etc...
          html`<a data-xref-type="dfn" data-cite="WebIDL">${keyword}</a>`;
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
      return html`<a data-xref-type="${type}" data-cite="${cite}" data-lt="${lt}"
      >${wrapped}</a
    >`;
    },
    name(escaped, { data, parent }) {
      if (data.idlType && data.idlType.type === "argument-type") {
        return html`<span class="idlParamName">${escaped}</span>`;
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
        case "operation":
        case "constructor":
          return defineIdlName(escaped, data, parent);
        default:
          return escaped;
      }
    },
    type(contents) {
      return html`<span class="idlType">${contents}</span>`;
    },
    inheritance(contents) {
      return html`<span class="idlSuperclass">${contents}</span>`;
    },
    definition(contents, { data, parent }) {
      const className = getIdlDefinitionClassName(data);
      switch (data.type) {
        case "includes":
        case "enum-value":
          return html`<span class="${className}">${contents}</span>`;
      }
      const parentName = parent ? parent.name : "";
      const { name, idlId } = getNameAndId(data, parentName);
      return html`<span
      class="${className}"
      id="${idlId}"
      data-idl
      data-title="${name}"
      >${contents}</span
    >`;
    },
    extendedAttribute(contents) {
      const result = html`<span class="extAttr">${contents}</span>`;
      return result;
    },
    extendedAttributeReference(name) {
      return html`<a data-xref-type="extended-attribute">${name}</a>`;
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
      return html`<a
      data-link-for="${parentName}"
      data-link-type="${linkType}"
      href="${href}"
      class="internalDFN"
      ><code>${escaped}</code></a
    >`;
    }

    const isDefaultJSON =
      data.type === "operation" &&
      data.name === "toJSON" &&
      data.extAttrs.some(({ name }) => name === "Default");
    if (isDefaultJSON) {
      return html`<a data-link-type="dfn" data-lt="default toJSON steps"
      >${escaped}</a
    >`;
    }
    if (!data.partial) {
      const dfn = html`<dfn data-export data-dfn-type="${linkType}"
      >${escaped}</dfn
    >`;
      registerDefinition(dfn, [name]);
      decorateDfn(dfn, data, parentName, name);
      return dfn;
    }

    const unlinkedAnchor = html`<a
    data-idl="${data.partial ? "partial" : null}"
    data-link-type="${linkType}"
    data-title="${data.name}"
    data-xref-type="${linkType}"
    >${escaped}</a
  >`;

    const showWarnings =
      name && data.type !== "typedef" && !(data.partial && !dfn);
    if (showWarnings) {
      const styledName = data.type === "operation" ? `${name}()` : name;
      const ofParent = parentName ? ` \`${parentName}\`'s` : "";
      const msg = `Missing \`<dfn>\` for${ofParent} \`${styledName}\` ${data.type}. [More info](https://github.com/w3c/respec/wiki/WebIDL-thing-is-not-defined).`;
      showWarning(msg, pluginName, { elements: [unlinkedAnchor] });
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
    // For getters, setters, etc. "anonymous-getter",
    const prefix = defn.special && defn.name === "" ? "anonymous-" : "";
    let idlId = getIdlId(prefix + name, parent);
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
        return defn.name || defn.special;
      default:
        return defn.name || defn.type;
    }
  }

  /**
   * @param {Element} idlElement
   * @param {number} index
   */
  function renderWebIDL(idlElement, index) {
    let parse;
    try {
      parse = webidl2.parse(idlElement.textContent, {
        sourceName: String(index),
      });
    } catch (e) {
      const msg = `Failed to parse WebIDL: ${e.bareMessage}.`;
      showError(msg, pluginName, {
        title: e.bareMessage,
        details: `<pre>${e.context}</pre>`,
        elements: [idlElement],
      });
      // Skip this <pre> and move on to the next one.
      return [];
    }
    // we add "idl" as the canonical match, so both "webidl" and "idl" work
    idlElement.classList.add("def", "idl");
    const highlights = webidl2.write(parse, { templates });
    html.bind(idlElement)`${highlights}`;
    wrapInner(idlElement, document.createElement("code"));
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
      if (elem.localName === "dfn") {
        registerDefinition(elem, [title]);
      }
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
    addIDLHeader(idlElement);
    return parse;
  }
  /**
   * Adds a "WebIDL" decorative header/permalink to a block of WebIDL.
   * @param {HTMLPreElement} pre
   */
  function addIDLHeader(pre) {
    addHashId(pre, "webidl");
    const header = html`<span class="idlHeader"
    ><a class="self-link" href="${`#${pre.id}`}">WebIDL</a></span
  >`;
    pre.prepend(header);
    addCopyIDLButton(header);
  }

  const cssPromise$2 = loadStyle$7();

  async function loadStyle$7() {
    try {
      return (await Promise.resolve().then(function () { return webidl$1; })).default;
    } catch {
      return fetchAsset("webidl.css");
    }
  }

  let _hasWebIdl = undefined; // unknown
  function hasWebIdl() {
    if (_hasWebIdl == undefined) {
      const idls = document.querySelectorAll("pre.idl, pre.webidl");
      _hasWebIdl = idls.length;
    }
    return _hasWebIdl;
  }
  async function run$o() {
    const idls = document.querySelectorAll("pre.idl, pre.webidl");
    if (!idls.length) {
      return;
    }
    if (!document.querySelector(".idl:not(pre), .webidl:not(pre)")) {
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
        const idlToFix = webidl2.write(astArray[validation.sourceName]);
        const escaped = xmlEscape(idlToFix);
        details += `Try fixing as:
      <pre>${escaped}</pre>`;
      }
      const msg = `WebIDL validation error: ${validation.bareMessage}`;
      showError(msg, pluginName, {
        details,
        elements: [idls[validation.sourceName]],
        title: validation.bareMessage,
      });
    }
    document.normalize();
  }

  var webidl$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$q,
    addIDLHeader: addIDLHeader,
    hasWebIdl: hasWebIdl,
    run: run$o
  });

  // @ts-check
  const name$p = "core/data-cite";

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
        wrapInner(elem, anchor);
      }
      if (wrapInCiteEl) {
        const cite = document.createElement("cite");
        cite.append(anchor);
        elem.append(cite);
      }
      if ("export" in elem.dataset) {
        const msg = "Exporting an linked external definition is not allowed.";
        const hint = "Please remove the `data-export` attribute.";
        showError(msg, name$p, { hint, elements: [elem] });
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

  async function run$n() {
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
        const msg = `Couldn't find a match for "${originalKey}"`;
        showWarning(msg, name$p, { elements: [elem] });
      }
    }

    sub("beforesave", cleanup$3);
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
  function cleanup$3(doc) {
    const attrToRemove = ["data-cite", "data-cite-frag", "data-cite-path"];
    const elems = doc.querySelectorAll("a[data-cite], dfn[data-cite]");
    elems.forEach(elem =>
      attrToRemove.forEach(attr => elem.removeAttribute(attr))
    );
  }

  var dataCite = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$p,
    THIS_SPEC: THIS_SPEC,
    toCiteDetails: toCiteDetails,
    run: run$n
  });

  // @ts-check

  const name$o = "core/link-to-dfn";

  /** @type {HTMLElement[]} */
  const possibleExternalLinks = [];

  const localizationStrings$8 = {
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
  const l10n$7 = getIntlData(localizationStrings$8);

  async function run$m(conf) {
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

  // function resultToString(result) {
  //   let retval = `resultToString(result.size=${result.size}) =`;
  //   for (const dFor of result.keys()) {
  //     retval += `\n  result(${dFor}).size=${result.get(dFor).size}`;
  //     for (const dType of result.get(dFor).keys()) {
  //       retval += `\n    ${dFor}, ${dType}) = ${
  //         result.get(dFor).get(dType).outerHTML
  //       }`;
  //     }
  //   }
  //   return retval;
  // }

  function mapTitleToDfns() {
    /** @type {CaseInsensitiveMap<Map<string, Map<string, HTMLElement>>>} */
    const titleToDfns = new CaseInsensitiveMap();
    for (const key of definitionMap.keys()) {
      const { result, duplicates } = collectDfns(key);
      // console.log(
      //   `mapTitleToDfns: ${key} = result: ${resultToString(
      //     result
      //   )} duplicates:${duplicates}`
      // );
      titleToDfns.set(key, result);
      if (duplicates.length > 0) {
        showError(l10n$7.duplicateMsg(key), name$o, {
          elements: duplicates,
          title: l10n$7.duplicateTitle,
        });
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
    if (result.size === 1 && !result.has("")) {
      for (const value of result.values()) {
        if (value.size === 1) {
          result.set("", value);
        }
      }
    }
    // eslint-disable-next-line no-constant-condition
    // if (true) {
    //   console.log(`collectDfns(${title}) result.size=${result.size}`);
    //   for (const dFor of result.keys()) {
    //     console.log(
    //       `collectDfns(${title}) result(${dFor}).size=${result.get(dFor).size}`
    //     );
    //     for (const dType of result.get(dFor).keys()) {
    //       console.log(
    //         `collectDfns(${dFor}, ${dType}) = ${
    //           result.get(dFor).get(dType).outerHTML
    //         }`
    //       );
    //     }
    //   }
    // }
    return { result, duplicates };
  }

  /**
   * Find a potentially matching <dfn> for given anchor.
   * @param {HTMLAnchorElement} anchor
   * @param {ReturnType<typeof mapTitleToDfns>} titleToDfns
   */
  function findMatchingDfn(anchor, titleToDfns) {
    const linkTargets = getLinkTargets(anchor);
    // console.log(
    //   `findMatchingDfn(${anchor.outerHTML}) linkTargets=${JSON.stringify(
    //     linkTargets
    //   )}`
    // );
    const target = linkTargets.find(target => {
      // console.log(
      //   `findMatchingDfn(${anchor.outerHTML}) target=${JSON.stringify(target)}`
      // );
      // console.log(`findMatchingDfn(${anchor.outerHTML}) titleToDfns.has(${target.title})=${titleToDfns.has(target.title)}`);
      // console.log(`findMatchingDfn(${anchor.outerHTML}) titleToDfns.get(${target.title}).has(${target.for})=${titleToDfns.get(target.title).has(target.for)}`);
      return (
        titleToDfns.has(target.title) &&
        (titleToDfns.get(target.title).has(target.for) ||
          titleToDfns.get(target.title).size === 1)
      );
    });
    // console.log(
    //   `findMatchingDfn(${anchor.outerHTML}) target#2=${JSON.stringify(target)}`
    // );
    if (!target) return;
    // console.log(
    //   `findMatchingDfn(${anchor.outerHTML}) target#3=${JSON.stringify(target)}`
    // );
    const dfnsByType = titleToDfns.get(target.title).get(target.for);
    // console.log(`findMatchingDfn(${anchor.outerHTML}) dfnsByType = ${dfnsByType}`);
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
    // console.log(
    //   `processAnchor(anchor=${anchor.outerHTML}  dfn=${dfn.outerHTML}  titleToDfns=${titleToDfns})`
    // );
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
      wrapInner(
        anchor,
        document.createElement("code") // .setAttribute("class", "code-dfn")
      );
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
      const msg = `Found linkless \`a\` element with text "${elem.textContent}" but no matching \`dfn\``;
      showWarning(msg, name$o);
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
    name: name$o,
    possibleExternalLinks: possibleExternalLinks,
    run: run$m
  });

  // @ts-check

  /**
   * @typedef {import('core/xref').RequestEntry} RequestEntry
   * @typedef {import('core/xref').Response} Response
   * @typedef {import('core/xref').SearchResultEntry} SearchResultEntry
   * @typedef {import('core/xref').XrefDatabase} XrefDatabase
   */

  const STORE_NAME = "xrefs";
  const VERSION_CHECK_WAIT = 5 * 60 * 1000; // 5 min

  async function getIdbCache() {
    /** @type {XrefDatabase} */
    const db = await idb.openDB("xref", 2, {
      upgrade(db) {
        [...db.objectStoreNames].forEach(s => db.deleteObjectStore(s));
        const store = db.createObjectStore(STORE_NAME, { keyPath: "query.id" });
        store.createIndex("byTerm", "query.term", { unique: false });
      },
    });
    return db;
  }

  /** @param {RequestEntry[]} queries */
  async function resolveXrefCache(queries) {
    /** @type {Map<string, SearchResultEntry[]>} */
    const cachedData = new Map();

    const bustCache = await shouldBustCache();
    if (bustCache) {
      await clearXrefData();
      return cachedData;
    }

    const requiredKeySet = new Set(queries.map(query => query.id));
    try {
      const cache = await getIdbCache();
      let cursor = await cache.transaction(STORE_NAME).store.openCursor();
      while (cursor) {
        if (requiredKeySet.has(cursor.key)) {
          cachedData.set(cursor.key, cursor.value.result);
        }
        cursor = await cursor.continue();
      }
    } catch (err) {
      console.error(err);
    }
    return cachedData;
  }

  /**
   * Get last updated timestamp from server and bust cache based on that. This
   * way, we prevent dirty/erroneous/stale data being kept on a client (which is
   * possible if we use a `MAX_AGE` based caching strategy).
   */
  async function shouldBustCache() {
    const key = "XREF:LAST_VERSION_CHECK";
    const lastChecked = parseInt(localStorage.getItem(key), 10);
    const now = Date.now();

    if (!lastChecked) {
      localStorage.setItem(key, now.toString());
      return false;
    }
    if (now - lastChecked < VERSION_CHECK_WAIT) {
      // avoid checking network for any data update if old cache "fresh"
      return false;
    }

    const url = new URL("meta/version", API_URL$1).href;
    const res = await fetch(url);
    if (!res.ok) return false;
    const lastUpdated = await res.text();
    localStorage.setItem(key, now.toString());
    return parseInt(lastUpdated, 10) > lastChecked;
  }

  /**
   * @param {RequestEntry[]} queries
   * @param {Map<string, SearchResultEntry[]>} results
   */
  async function cacheXrefData(queries, results) {
    try {
      const cache = await getIdbCache();
      const tx = cache.transaction(STORE_NAME, "readwrite");
      for (const query of queries) {
        const result = results.get(query.id);
        tx.objectStore(STORE_NAME).add({ query, result });
      }
      await tx.done;
    } catch (e) {
      console.error(e);
    }
  }

  async function clearXrefData() {
    try {
      await getIdbCache().then(db => db.clear(STORE_NAME));
    } catch (e) {
      console.error(e);
    }
  }

  // @ts-check

  const name$n = "core/xref";

  const profiles = {
    "web-platform": ["HTML", "INFRA", "URL", "WEBIDL", "DOM", "FETCH"],
  };

  const API_URL$1 = "https://respec.org/xref/";

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
   * @param {Object} conf respecConfig
   */
  async function run$l(conf) {
    if (!conf.xref) {
      return;
    }

    const xref = normalizeConfig(conf.xref);
    if (xref.specs) {
      const bodyCite = document.body.dataset.cite
        ? document.body.dataset.cite.split(/\s+/)
        : [];
      document.body.dataset.cite = bodyCite.concat(xref.specs).join(" ");
    }

    const elems = possibleExternalLinks.concat(findExplicitExternalLinks());
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

    sub("beforesave", cleanup$2);
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

  /**
   * converts conf.xref to object with url and spec properties
   */
  function normalizeConfig(xref) {
    const defaults = {
      url: API_URL$1,
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
      default: {
        const msg = `Invalid value for \`xref\` configuration option. Received: "${xref}".`;
        showError(msg, name$n);
      }
    }
    return config;

    function invalidProfileError(profile) {
      const supportedProfiles = Object.keys(profiles)
        .map(p => `"${p}"`)
        .join(", ");
      const msg =
        `Invalid profile "${profile}" in \`respecConfig.xref\`. ` +
        `Please use one of the supported profiles: ${supportedProfiles}.`;
      showError(msg, name$n);
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

    const specs = getSpecContext(elem);
    const types = getTypeContext(elem, isIDL);
    const forContext = getForContext(elem, isIDL);

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
   * Get spec context as a fallback chain, where each level (sub-array) represents
   * decreasing priority.
   * @param {HTMLElement} elem
   */
  function getSpecContext(elem) {
    /** @type {string[][]} */
    const specs = [];

    /** @type {HTMLElement} */
    let dataciteElem = elem.closest("[data-cite]");

    // Traverse up towards the root element, adding levels of lower priority specs
    while (dataciteElem) {
      const cite = dataciteElem.dataset.cite.toLowerCase().replace(/[!?]/g, "");
      const cites = cite.split(/\s+/).filter(s => s);
      if (cites.length) {
        specs.push(cites);
      }
      if (dataciteElem === elem) break;
      dataciteElem = dataciteElem.parentElement.closest("[data-cite]");
    }

    // If element itself contains data-cite, we don't take inline context into
    // account. The inline bibref context has lowest priority, if available.
    if (dataciteElem !== elem) {
      const closestSection = elem.closest("section");
      /** @type {Iterable<HTMLElement>} */
      const bibrefs = closestSection
        ? closestSection.querySelectorAll("a.bibref")
        : [];
      const inlineRefs = [...bibrefs].map(el => el.textContent.toLowerCase());
      if (inlineRefs.length) {
        specs.push(inlineRefs);
      }
    }

    const uniqueSpecContext = dedupeSpecContext(specs);
    return uniqueSpecContext;
  }

  /**
   * If we already have a spec in a higher priority level (closer to element) of
   * fallback chain, skip it from low priority levels, to prevent duplication.
   * @param {string[][]} specs
   * */
  function dedupeSpecContext(specs) {
    /** @type {string[][]} */
    const unique = [];
    for (const level of specs) {
      const higherPriority = unique[unique.length - 1] || [];
      const uniqueSpecs = [...new Set(level)].filter(
        spec => !higherPriority.includes(spec)
      );
      unique.push(uniqueSpecs.sort());
    }
    return unique;
  }

  /**
   * @param {HTMLElement} elem
   * @param {boolean} isIDL
   */
  function getForContext(elem, isIDL) {
    if (elem.dataset.xrefFor) {
      return norm(elem.dataset.xrefFor);
    }

    if (isIDL) {
      /** @type {HTMLElement} */
      const dataXrefForElem = elem.closest("[data-xref-for]");
      if (dataXrefForElem) {
        return norm(dataXrefForElem.dataset.xrefFor);
      }
    }

    return null;
  }

  /**
   * @param {HTMLElement} elem
   * @param {boolean} isIDL
   */
  function getTypeContext(elem, isIDL) {
    if (isIDL) {
      if (elem.dataset.xrefType) {
        return elem.dataset.xrefType.split("|");
      }
      return ["_IDL_"];
    }

    return ["_CONCEPT_"];
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
      await cacheXrefData(uniqueQueryKeys, fetchedResults);
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
    const { term, specs = [] } = query;
    const { uri, shortname, spec, normative, type, for: forContext } = result;
    // if authored spec context had `result.spec`, use it instead of shortname
    const cite = specs.flat().includes(spec) ? spec : shortname;
    const url = new URL(uri, "https://example.org");
    const { pathname: citePath } = url;
    const citeFrag = url.hash.slice(1);
    const dataset = { cite, citePath, citeFrag, type };
    if (forContext) dataset.linkFor = forContext[0];
    Object.assign(elem.dataset, dataset);

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

    const msg = `Normative reference to "${term}" found but term is defined informatively in "${cite}"`;
    const title = "Error: Normative reference to informative term";
    showWarning(msg, name$n, { title, elements: [elem] });
  }

  /** @param {Errors} errors */
  function showErrors({ ambiguous, notFound }) {
    const getPrefilledFormURL = (term, query, specs = []) => {
      const url = new URL(API_URL$1);
      url.searchParams.set("term", term);
      if (query.for) url.searchParams.set("for", query.for);
      url.searchParams.set("types", query.types.join(","));
      if (specs.length) url.searchParams.set("specs", specs.join(","));
      return url;
    };

    const howToFix = howToCiteURL =>
      "[Learn more about this error](https://respec.org/docs/#error-term-not-found)" +
      ` or see [how to cite to resolve the error](${howToCiteURL})`;

    for (const { query, elems } of notFound.values()) {
      const specs = query.specs ? [...new Set(query.specs.flat())].sort() : [];
      const originalTerm = getTermFromElement(elems[0]);
      const formUrl = getPrefilledFormURL(originalTerm, query);
      const specsString = specs.map(spec => `\`${spec}\``).join(", ");
      const hint = howToFix(formUrl);
      const msg = `Couldn't match "**${originalTerm}**" to anything in the document or in any other document cited in this specification: ${specsString}.`;
      const title = "Error: No matching dfn found.";
      showError(msg, name$n, { title, elements: elems, hint });
    }

    for (const { query, elems, results } of ambiguous.values()) {
      const specs = [...new Set(results.map(entry => entry.shortname))].sort();
      const specsString = specs.map(s => `**${s}**`).join(", ");
      const originalTerm = getTermFromElement(elems[0]);
      const formUrl = getPrefilledFormURL(originalTerm, query, specs);
      const hint = howToFix(formUrl);
      const msg = `The term "**${originalTerm}**" is defined in ${specsString} in multiple ways, so it's ambiguous.`;
      const title = "Error: Linking an ambiguous dfn.";
      showError(msg, name$n, { title, elements: elems, hint });
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

  function cleanup$2(doc) {
    const elems = doc.querySelectorAll(
      "a[data-xref-for], a[data-xref-type], a[data-link-for]"
    );
    const attrToRemove = ["data-xref-for", "data-xref-type", "data-link-for"];
    elems.forEach(el => {
      attrToRemove.forEach(attr => el.removeAttribute(attr));
    });
  }

  var xref = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$n,
    API_URL: API_URL$1,
    run: run$l,
    getTermFromElement: getTermFromElement
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
  const name$m = "core/webidl-index";

  function run$k() {
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
      document.querySelectorAll("pre.idl:not(.exclude) > code")
    ).filter(idl => !idl.closest(nonNormativeSelector));

    if (idlIndex.length === 0) {
      const text = "This specification doesn't normatively declare any Web IDL.";
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

    // Add our own IDL header
    idlIndexSec.appendChild(pre);
    wrapInner(pre, document.createElement("code"));
    addIDLHeader(pre);
  }

  var webidlIndex = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$m,
    run: run$k
  });

  // @ts-check

  const name$l = "core/dfn-index";

  const localizationStrings$7 = {
    en: {
      heading: "Index",
      headingExternal: "Terms defined by reference",
      headlingLocal: "Terms defined by this specification",
      dfnOf: "definition of",
    },
  };
  const l10n$6 = getIntlData(localizationStrings$7);

  // Terms of these _types_ are wrapped in `<code>`.
  const CODE_TYPES = new Set([
    "attribute",
    "callback",
    "dict-member",
    "dictionary",
    "element-attr",
    "element",
    "enum-value",
    "enum",
    "exception",
    "extended-attribute",
    "interface",
    "method",
    "typedef",
  ]);

  /**
   * @typedef {{ term: string, type: string, linkFor: string, elem: HTMLAnchorElement }} Entry
   */

  async function run$j() {
    const index = document.querySelector("section#index");
    if (!index) {
      return;
    }

    const styleEl = document.createElement("style");
    styleEl.textContent = await loadStyle$6();
    document.head.appendChild(styleEl);

    index.classList.add("appendix");
    if (!index.querySelector("h2")) {
      index.prepend(html`<h2>${l10n$6.heading}</h2>`);
    }

    const localTermIndex = html`<section id="index-defined-here">
    <h3>${l10n$6.headlingLocal}</h3>
    ${createLocalTermIndex()}
  </section>`;
    index.append(localTermIndex);

    const externalTermIndex = html`<section id="index-defined-elsewhere">
    <h3>${l10n$6.headingExternal}</h3>
    ${createExternalTermIndex()}
  </section>`;
    index.append(externalTermIndex);
    for (const el of externalTermIndex.querySelectorAll(".index-term")) {
      addId(el, "index-term");
    }

    // XXX: This event is used to overcome an edge case with core/structure,
    // related to a circular dependency in plugin run order. We want
    // core/structure to run after dfn-index so the #index can be listed in the
    // TOC, but we also want section numbers in dfn-index. So, we "split"
    // core/dfn-index in two parts, one that runs before core/structure (using
    // plugin order in profile) and the other (following) after section numbers
    // are generated in core/structure (this event).
    sub("toc", appendSectionNumbers, { once: true });

    sub("beforesave", cleanup$1);
  }

  function createLocalTermIndex() {
    const dataSortedByTerm = collectLocalTerms();
    return html`<ul class="index">
    ${dataSortedByTerm.map(([term, dfns]) => renderLocalTerm(term, dfns))}
  </ul>`;
  }

  function collectLocalTerms() {
    /** @type {Map<string, HTMLElement[]>} */
    const data = new Map();
    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll("dfn:not([data-cite])");
    for (const elem of elems) {
      if (!elem.id) continue;
      const text = norm(elem.textContent);
      const elemsByTerm = data.get(text) || data.set(text, []).get(text);
      elemsByTerm.push(elem);
    }

    const dataSortedByTerm = [...data].sort(([a], [b]) =>
      a.slice(a.search(/\w/)).localeCompare(b.slice(b.search(/\w/)))
    );

    return dataSortedByTerm;
  }

  /**
   * @param {string} term
   * @param {HTMLElement[]} dfns
   * @returns {HTMLLIElement}
   */
  function renderLocalTerm(term, dfns) {
    const renderItem = (dfn, text, suffix) => {
      const href = `#${dfn.id}`;
      return html`<li data-id=${dfn.id}>
      <a class="index-term" href="${href}">${{ html: text }}</a> ${suffix
        ? { html: suffix }
        : ""}
    </li>`;
    };

    if (dfns.length === 1) {
      const dfn = dfns[0];
      const type = getLocalTermType(dfn);
      const text = getLocalTermText(dfn, type, term);
      const suffix = getLocalTermSuffix(dfn, type, term);
      return renderItem(dfn, text, suffix);
    }
    return html`<li>
    ${term}
    <ul>
      ${dfns.map(dfn => {
        const type = getLocalTermType(dfn);
        const text = getLocalTermSuffix(dfn, type, term) || l10n$6.dfnOf;
        return renderItem(dfn, text);
      })}
    </ul>
  </li>`;
  }

  /** @param {HTMLElement} dfn */
  function getLocalTermType(dfn) {
    const ds = dfn.dataset;
    const type = ds.dfnType || ds.idl || ds.linkType || "";
    switch (type) {
      case "":
      case "dfn":
        return "";
      default:
        return type;
    }
  }

  /** @param {HTMLElement} dfn */
  function getLocalTermParentContext(dfn) {
    /** @type {HTMLElement} */
    const dfnFor = dfn.closest("[data-dfn-for]:not([data-dfn-for=''])");
    return dfnFor ? dfnFor.dataset.dfnFor : "";
  }

  /**
   * @param {HTMLElement} dfn
   * @param {string} type
   * @param {string} term
   */
  function getLocalTermText(dfn, type, term) {
    let text = term;
    if (type === "enum-value") {
      text = `"${text}"`;
    }
    if (CODE_TYPES.has(type) || dfn.dataset.idl || dfn.closest("code")) {
      text = `<code>${text}</code>`;
    }
    return text;
  }

  /**
   * @param {HTMLElement} dfn
   * @param {string} type
   * @param {string} [term=""]
   */
  function getLocalTermSuffix(dfn, type, term = "") {
    if (term.startsWith("[[")) {
      const parent = getLocalTermParentContext(dfn);
      return `internal slot for <code>${parent}</code>`;
    }

    switch (type) {
      case "dict-member":
      case "method":
      case "attribute":
      case "enum-value": {
        const typeText =
          type === "dict-member" ? "member" : type.replace("-", " ");
        const parent = getLocalTermParentContext(dfn);
        return `${typeText} for <code>${parent}</code>`;
      }
      case "interface":
      case "dictionary":
      case "enum": {
        return type;
      }
      case "constructor": {
        const parent = getLocalTermParentContext(dfn);
        return `for <code>${parent}</code>`;
      }
      default:
        return "";
    }
  }

  function appendSectionNumbers() {
    const getSectionNumber = id => {
      const dfn = document.getElementById(id);
      const sectionNumberEl = dfn.closest("section").querySelector(".secno");
      const secNum = `§${sectionNumberEl.textContent.trim()}`;
      return html`<span class="print-only">${secNum}</span>`;
    };

    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll("#index-defined-here li[data-id]");
    elems.forEach(el => el.append(getSectionNumber(el.dataset.id)));
  }

  function createExternalTermIndex() {
    const data = collectExternalTerms();
    const dataSortedBySpec = [...data.entries()].sort(([specA], [specB]) =>
      specA.localeCompare(specB)
    );
    return html`<ul class="index">
    ${dataSortedBySpec.map(
      ([spec, entries]) => html`<li data-spec="${spec}">
        ${renderInlineCitation(spec)} defines the following:
        <ul>
          ${entries
            .sort((a, b) => a.term.localeCompare(b.term))
            .map(renderExternalTermEntry)}
        </ul>
      </li>`
    )}
  </ul>`;
  }

  function collectExternalTerms() {
    /** @type {Set<string>} */
    const uniqueReferences = new Set();
    /** @type {Map<string, Entry[]>} spec => entry[] */
    const data = new Map();

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const elements = document.querySelectorAll(`a[data-cite]`);
    for (const elem of elements) {
      if (!elem.dataset.cite) {
        continue;
      }
      const uniqueID = elem.href;
      if (uniqueReferences.has(uniqueID)) {
        continue;
      }

      const { type, linkFor } = elem.dataset;
      const term = getTermFromElement(elem);
      if (!term) {
        continue; // <a data-cite="SPEC"></a>
      }
      const spec = toCiteDetails(elem).key.toUpperCase();

      const entriesBySpec = data.get(spec) || data.set(spec, []).get(spec);
      entriesBySpec.push({ term, type, linkFor, elem });
      uniqueReferences.add(uniqueID);
    }

    return data;
  }

  /**
   * @param {Entry} entry
   * @returns {HTMLLIElement}
   */
  function renderExternalTermEntry(entry) {
    const { elem } = entry;
    const text = getTermText(entry);
    const el = html`<li>
    <span class="index-term" data-href="${elem.href}">${{ html: text }}</span>
  </li>`;
    return el;
  }

  // Terms of these _types_ are suffixed with their type info.
  const TYPED_TYPES = new Map([
    ["attribute", "attribute"],
    ["element-attr", "attribute"],
    ["element", "element"],
    ["enum", "enum"],
    ["exception", "exception"],
    ["extended-attribute", "extended attribute"],
    ["interface", "interface"],
  ]);

  // These _terms_ have type suffix "type".
  const TYPE_TERMS = new Set([
    // Following are primitive types as per WebIDL spec:
    "boolean",
    "byte",
    "octet",
    "short",
    "unsigned short",
    "long",
    "unsigned long",
    "long long",
    "unsigned long long",
    "float",
    "unrestricted float",
    "double",
    "unrestricted double",
    // Following are not primitive types, but aren't interfaces either.
    "undefined",
    "any",
    "object",
    "symbol",
  ]);

  /** @param {Entry} entry */
  function getTermText(entry) {
    const { term, type, linkFor } = entry;
    let text = term;

    if (CODE_TYPES.has(type)) {
      if (type === "extended-attribute") {
        text = `[${text}]`;
      }
      text = `<code>${text}</code>`;
    }

    const typeSuffix = TYPE_TERMS.has(term) ? "type" : TYPED_TYPES.get(type);
    if (typeSuffix) {
      text += ` ${typeSuffix}`;
    }

    if (linkFor) {
      let linkForText = linkFor;
      if (!/\s/.test(linkFor)) {
        // If linkFor is a single word, highlight it.
        linkForText = `<code>${linkForText}</code>`;
      }
      if (type === "element-attr") {
        linkForText += " element";
      }
      text += ` (for ${linkForText})`;
    }

    return text;
  }

  async function loadStyle$6() {
    try {
      return (await Promise.resolve().then(function () { return dfnIndex$1; })).default;
    } catch {
      return fetchAsset("dfn-index.css");
    }
  }

  /** @param {Document} doc */
  function cleanup$1(doc) {
    doc
      .querySelectorAll("#index-defined-elsewhere li[data-spec]")
      .forEach(el => el.removeAttribute("data-spec"));

    doc
      .querySelectorAll("#index-defined-here li[data-id]")
      .forEach(el => el.removeAttribute("data-id"));
  }

  var dfnIndex$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$l,
    run: run$j
  });

  // @ts-check
  const name$k = "core/contrib";

  async function run$i(conf) {
    const ghContributors = document.getElementById("gh-contributors");
    if (!ghContributors) {
      return;
    }

    if (!conf.github) {
      const msg =
        "Requested list of contributors from GitHub, but " +
        "[`github`](https://github.com/w3c/respec/wiki/github) configuration option is not set.";
      showError(msg, name$k);
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
      toHTML$2(contributors, elem);
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
        const msg = "Error loading contributors from GitHub.";
        showError(msg, name$k);
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
  function toHTML$2(contributors, element) {
    const sortedContributors = contributors.sort((a, b) => {
      const nameA = a.name || a.login;
      const nameB = b.name || b.login;
      return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
    });

    if (element.tagName === "UL") {
      html(element)`${sortedContributors.map(
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
    name: name$k,
    run: run$i
  });

  // @ts-check

  const name$j = "core/fix-headers";

  function run$h() {
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
    name: name$j,
    run: run$h
  });

  // @ts-check

  const lowerHeaderTags = ["h2", "h3", "h4", "h5", "h6"];
  const headerTags = ["h1", ...lowerHeaderTags];

  const name$i = "core/structure";

  const localizationStrings$6 = {
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

  const l10n$5 = getIntlData(localizationStrings$6);

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
    const ol = html`<ol class="toc"></ol>`;
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
            ? l10n$5.appendix
            : l10n$5.chapter
          : l10n$5.section;
      wrapInner(section.header, html`<span class="sect-title"></span>`);
      if (!section.isIntro) {
        index += 1;
        section.header.prepend(
          html`<span class="secthdr" hidden>${secthdr}</span>`,
          html`<bdi class="secno">${secno} </bdi>`
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
    const anchor = html`<a href="${`#${id}`}" class="tocxref" />`;
    anchor.append(...header.cloneNode(true).childNodes);
    filterHeader(anchor);
    return html`<li class="tocline">${anchor}</li>`;
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

  function run$g(conf) {
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
        showError(msg, name$i, { elements: [section] });
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
    const nav = html`<nav id="toc"></nav>`;
    const h2 = html`<h2 class="introductory">${l10n$5.toc}</h2>`;
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

    const link = html`<p role="navigation" id="back-to-top">
    <a href="#title"><abbr title="Back to Top">&uarr;</abbr></a>
  </p>`;
    document.body.append(link);
  }

  var structure = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$i,
    run: run$g
  });

  // Module pcisig/fig-tbl-eqn-numbering
  // Find figure numbers and adjust them to include the chapter number.
  // Edit the Table of Figures as well.
  // This happens as a distinct pass for two reasons:
  // 1. core/figures runs before core/structure and thus doesn't know Chapter and Appendix numbers
  // 2. A second pass means that this plugin is not part of the src/core.

  const name$h = "pcisig/fig-tbl-eqn-numbering";

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

  function run$f(conf) {
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
    name: name$h,
    run: run$f
  });

  // @ts-check

  const name$g = "core/informative";

  const localizationStrings$5 = {
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

  const l10n$4 = getIntlData(localizationStrings$5);

  function run$e() {
    Array.from(document.querySelectorAll("section.informative"))
      .map(informative => informative.querySelector("h2, h3, h4, h5, h6"))
      .filter(heading => heading)
      .forEach(heading => {
        heading.after(html`<p><em>${l10n$4.informative}</em></p>`);
      });
  }

  var informative = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$g,
    run: run$e
  });

  // @ts-check
  // Module core/id-headers
  // All headings are expected to have an ID, unless their immediate container has one.
  // This is currently in core though it comes from a W3C rule. It may move in the future.

  const name$f = "core/id-headers";

  function run$d(conf) {
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
      h.appendChild(html`
      <a href="${`#${id}`}" class="self-link" aria-label="§"></a>
    `);
    }
  }

  var idHeaders = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$f,
    run: run$d
  });

  // @ts-check

  const name$e = "core/caniuse";

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

  async function loadStyle$5() {
    try {
      return (await Promise.resolve().then(function () { return caniuse$1; })).default;
    } catch {
      return fetchAsset("caniuse.css");
    }
  }

  async function prepare(conf) {
    if (!conf.caniuse) {
      return; // nothing to do.
    }
    const options = getNormalizedConf(conf);
    conf.caniuse = options; // for tests
    if (!options.feature) {
      return; // no feature to show
    }

    const caniuseCss = await loadStyle$5();
    document.head.appendChild(html`<style class="removeOnSave">
    ${caniuseCss}
  </style>`);

    const apiUrl = options.apiURL || API_URL;
    // Initiate a fetch, but do not wait. Try to fill the cache early instead.
    conf.state[name$e] = {
      fetchPromise: fetchStats(apiUrl, options),
    };
  }

  async function run$c(conf) {
    const options = conf.caniuse;
    if (!options?.feature) return;

    const featureURL = new URL(options.feature, "https://caniuse.com/").href;

    const headDlElem = document.querySelector(".head dl");
    const contentPromise = (async () => {
      try {
        const stats = await conf.state[name$e].fetchPromise;
        return html`${{ html: stats }}`;
      } catch (err) {
        const msg = `Couldn't find feature "${options.feature}" on caniuse.com.`;
        const hint =
          "Please check the feature key on [caniuse.com](https://caniuse.com)";
        showError(msg, name$e, { hint });
        console.error(err);
        return html`<a href="${featureURL}">caniuse.com</a>`;
      }
    })();
    const definitionPair = html`<dt class="caniuse-title">Browser support:</dt>
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
      html.bind(outputDoc.querySelector(".caniuse-stats"))`
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
        const msg =
          `Ignoring invalid browser(s): ${names} in ` +
          "[`respecConfig.caniuse.browsers`](https://github.com/w3c/respec/wiki/caniuse)";
        showWarning(msg, name$e);
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

  var caniuse$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$e,
    prepare: prepare,
    run: run$c
  });

  // @ts-check

  const name$d = "core/mdn-annotation";

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

  const localizationStrings$4 = {
    en: {
      inAllEngines: "This feature is in all major engines.",
      inSomeEngines: "This feature has limited support.",
    },
    zh: {
      inAllEngines: "所有主要引擎均支持此特性。",
      inSomeEngines: "此功能支持有限。",
    },
  };
  const l10n$3 = getIntlData(localizationStrings$4);

  async function loadStyle$4() {
    try {
      return (await Promise.resolve().then(function () { return mdnAnnotation$1; })).default;
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
    const mdnBox = html`<aside class="mdn"></aside>`;
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
    return html`<details>
    <summary aria-label="${label}"><span>MDN</span>${engineSupport}</summary>
    <a title="${summary}" href="${href}">${mdnSubPath}</a>
    ${getEngineSupport(engines)}
    ${support
      ? buildBrowserSupportTable(support)
      : html`<p class="nosupportdata">No support data.</p>`}
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
      return html`<tr class="${classList}">
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

    return html`<table>
    ${Object.keys(MDN_BROWSERS).map(browserId => {
      return support[browserId]
        ? createRowFromBrowserData(browserId, support[browserId])
        : createRow(browserId, "Unknown", "");
    })}
  </table>`;
  }

  async function run$b(conf) {
    const mdnKey = getMdnKey(conf);
    if (!mdnKey) return;

    const mdnSpecJson = await getMdnData(mdnKey, conf.mdn);
    if (!mdnSpecJson) return;

    const style = document.createElement("style");
    style.textContent = await loadStyle$4();
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
      showError(msg, name$d, { hint });
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
      return html`<span title="${l10n$3.inAllEngines}">✅</span>`;
    }
    if (engines.length < 2) {
      return html`<span title="${l10n$3.inSomeEngines}">🚫</span>`;
    }
    return html`<span>&emsp;</span>`;
  }

  /**
   * @param {MdnEntry['engines']} engines
   * @returns {HTMLParagraphElement|undefined}
   */
  function getEngineSupport(engines) {
    if (engines.length === 3) {
      return html`<p class="engines-all">${l10n$3.inAllEngines}</p>`;
    }
    if (engines.length < 2) {
      return html`<p class="engines-some">${l10n$3.inSomeEngines}</p>`;
    }
  }

  var mdnAnnotation$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$d,
    run: run$b
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
        prettify(cloneDoc);
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
      metaCharset = html`<meta charset="utf-8" />`;
    }
    insertions.appendChild(metaCharset);

    // Add meta generator
    const respecVersion = `ReSpec ${window.respecVersion || "Developer Channel"}`;
    const metaGenerator = html`
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

  const name$c = "ui/save-html";

  const localizationStrings$3 = {
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
  const l10n$2 = getIntlData(localizationStrings$3);

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
    return html`<a
    href="${href}"
    id="${id}"
    download="${fileName}"
    type="${type}"
    class="respec-save-button"
    onclick=${() => ui$2.closeModal()}
    >${title}</a
  >`;
  }

  const saveDialog = {
    async show(button) {
      await document.respec.ready;
      const div = html`<div class="respec-save-buttons">
      ${downloadLinks.map(toDownloadLink)}
    </div>`;
      ui$2.freshModal(l10n$2.save_snapshot, div, button);
    },
  };

  const supportsDownload = "download" in HTMLAnchorElement.prototype;
  let button$1;
  if (supportsDownload) {
    button$1 = ui$2.addCommand(l10n$2.save_snapshot, show$1, "Ctrl+Shift+Alt+S", "💾");
  }

  function show$1() {
    if (!supportsDownload) return;
    saveDialog.show(button$1);
  }

  /**
   * @param {*} _
   * @param {string} mimeType
   */
  function exportDocument(_, mimeType) {
    const msg =
      "Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed.";
    const hint = "Use core/exporter `rsDocToDataURL()` instead.";
    showWarning(msg, name$c, { hint });
    return rsDocToDataURL(mimeType);
  }

  var saveHtml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$c,
    exportDocument: exportDocument
  });

  // @ts-check

  const localizationStrings$2 = {
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
  const l10n$1 = getIntlData(localizationStrings$2);

  // window.respecVersion is added at build time (see tools/builder.js)
  window.respecVersion = window.respecVersion || "Developer Edition";
  const div = document.createElement("div");
  const render = html.bind(div);
  const button = ui$2.addCommand(
    `${l10n$1.about_respec} ${window.respecVersion}`,
    show,
    "Ctrl+Shift+Alt+A",
    "ℹ️"
  );

  function show() {
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
    ui$2.freshModal(`${l10n$1.about_respec} - ${window.respecVersion}`, div, button);
  }

  function perfEntryToTR({ name, duration }) {
    const moduleURL = `https://github.com/w3c/respec/blob/develop/src/${name}.js`;
    return html`
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

  const name$b = "core/seo";

  function run$a() {
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
    name: name$b,
    run: run$a
  });

  // @ts-check
  const localizationStrings$1 = {
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

  const l10n = getIntlData(localizationStrings$1);

  const name$a = "core/data-tests";

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

    const testList = html`
    <li>
      <a href="${href}">${testFileName}</a>
      ${emojiList}
    </li>
  `;
    return testList;
  }

  function run$9(conf) {
    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll("[data-tests]");
    const testables = [...elems].filter(elem => elem.dataset.tests);

    if (!testables.length) {
      return;
    }
    if (!conf.testSuiteURI) {
      showError(l10n.missing_test_suite_uri, name$a);
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
          const msg = `Bad URI: ${test}`;
          showWarning(msg, name$a);
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
      const msg = `Duplicate tests found`;
      const hint = `To fix, remove duplicates from "data-tests": ${duplicates
      .map(url => new URL(url).pathname)
      .join(", ")}`;
      showWarning(msg, name$a, { hint, elements: [elem] });
    }
  }

  /**
   * @param {string[]} testURLs
   */
  function toHTML$1(testURLs) {
    const uniqueList = [...new Set(testURLs)];
    const details = html`
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
    name: name$a,
    run: run$9
  });

  // @ts-check
  const name$9 = "core/list-sorter";

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

  function run$8() {
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
        default: {
          const msg = `ReSpec can't sort ${elem.localName} elements.`;
          showWarning(msg, name$9, { elements: [elem] });
        }
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
    name: name$9,
    sortListItems: sortListItems,
    sortDefinitionTerms: sortDefinitionTerms,
    run: run$8
  });

  // @ts-check

  const name$8 = "core/dfn-panel";

  async function run$7() {
    const css = await loadStyle$3();
    document.head.insertBefore(
      html`<style>
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
    const panel = html`
    <aside class="dfn-panel" id="${panelId}" hidden>
      <span class="caret"></span>
      <div>
        <a class="self-link" href="${href}">Permalink</a>
        ${dfnExportedMarker(dfn)} ${idlMarker(dfn, links)}
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
    return html`<span
    class="marker dfn-exported"
    title="Definition can be referenced by other specifications"
    >exported</span
  >`;
  }

  /**
   * @param {HTMLElement} dfn
   * @param {NodeListOf<HTMLAnchorElement>} links
   */
  function idlMarker(dfn, links) {
    if (!dfn.hasAttribute("data-idl")) return null;

    for (const anchor of links) {
      if (anchor.dataset.linkType !== dfn.dataset.dfnType) continue;
      const parentIdlBlock = anchor.closest("pre.idl");
      if (parentIdlBlock && parentIdlBlock.id) {
        const href = `#${parentIdlBlock.id}`;
        return html`<a
        href="${href}"
        class="marker idl-block"
        title="Jump to IDL declaration"
        >IDL</a
      >`;
      }
    }
    return null;
  }

  /**
   * @param {string} id dfn id
   * @param {NodeListOf<HTMLAnchorElement>} links
   * @returns {HTMLUListElement}
   */
  function referencesToHTML(id, links) {
    if (!links.length) {
      return html`<ul>
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
    const listItemToHTML = entry => html`<li>
    ${toLinkProps(entry).map(
      link => html`<a href="#${link.id}">${link.title}</a>${" "}`
    )}
  </li>`;

    return html`<ul>
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

  async function loadStyle$3() {
    try {
      return (await Promise.resolve().then(function () { return dfnPanel$1; })).default;
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

  var dfnPanel$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$8,
    run: run$7
  });

  // @ts-check

  const name$7 = "core/data-type";

  const tooltipStylePromise = loadStyle$2();

  async function loadStyle$2() {
    try {
      return (await Promise.resolve().then(function () { return datatype$1; })).default;
    } catch {
      return fetchAsset("datatype.css");
    }
  }

  async function run$6(conf) {
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
    name: name$7,
    run: run$6
  });

  // @ts-check

  const name$6 = "core/algorithms";

  const cssPromise$1 = loadStyle$1();

  async function loadStyle$1() {
    try {
      return (await Promise.resolve().then(function () { return algorithms$1; })).default;
    } catch {
      return fetchAsset("algorithms.css");
    }
  }

  async function run$5() {
    const elements = Array.from(document.querySelectorAll("ol.algorithm li"));
    elements
      .filter(li => li.textContent.trim().startsWith("Assert: "))
      .forEach(li => li.classList.add("assert"));
    if (document.querySelector(".assert")) {
      const style = document.createElement("style");
      style.textContent = await cssPromise$1;
      document.head.appendChild(style);
    }
  }

  var algorithms$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$6,
    run: run$5
  });

  // @ts-check

  const name$5 = "core/anchor-expander";

  let sectionRefsByNumber = false;

  function run$4(conf) {
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
        const title = `No matching id in document: ${id}.`;
        showError(msg, name$5, { title, elements: [a] });
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
          const title = `Can't expand "#${id}".`;
          showError(msg, name$5, { title, elements: [a] });
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
        const title = "Missing title.";
        showError(msg, name$5, { title, elements: [a] });
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
      const title = "Missing figcaption in referenced figure.";
      showError(msg, name$5, { title, elements: [a] });
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
      const msg = `Found matching table "${id}", but table is lacking a \`<caption>\` ${a}.`;
      showError(msg, name$5);
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
      const title = `No matching id in document: "${id}".`;
      showError(msg, name$5, { title, elements: [a] });
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
    if (a.lastChild.nodeType === Node.TEXT_NODE) {
      a.lastChild.textContent = a.lastChild.textContent.trimEnd();
    }
    a.querySelectorAll("a").forEach(a => {
      const span = renameElement(a, "span");
      for (const attr of [...span.attributes]) {
        span.removeAttributeNode(attr);
      }
    });
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
    name: name$5,
    run: run$4
  });

  // @ts-check

  const name$4 = "pcisig/include-final-config";

  function run$3(conf) {
    const script = document.createElement("script");
    script.id = "finalUserConfig";
    script.type = "application/json";
    script.innerHTML = JSON.stringify(conf, null, 2);
    document.head.appendChild(script);
  }

  var includeFinalConfig = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$4,
    run: run$3
  });

  // @ts-check
  /** @type {Promise<{ apiBase: string, fullName: string, branch: string, repoURL: string } | null>} */
  const github = new Promise((resolve, reject) => {
  });

  const localizationStrings = {
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
  getIntlData(localizationStrings);

  // @ts-check

  const name$3 = "rs-changelog";

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
      html.bind(this)`
      <ul>
      ${{
        any: fetchCommits(from, to, filter)
          .then(commits => toHTML(commits))
          .catch(error => showError(error.message, name$3, { elements: [this] }))
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

  async function toHTML(commits) {
    const { repoURL } = await github;
    return commits.map(commit => {
      const [message, prNumber = null] = commit.message.split(/\(#(\d+)\)/, 2);
      const commitURL = `${repoURL}commit/${commit.hash}`;
      const prURL = prNumber ? `${repoURL}pull/${prNumber}` : null;
      const pr = prNumber && html` (<a href="${prURL}">#${prNumber}</a>)`;
      return html`<li><a href="${commitURL}">${message.trim()}</a>${pr}</li>`;
    });
  }

  var changelog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$3,
    element: element
  });

  // @ts-check
  /** @type {CustomElementDfn[]} */
  const CUSTOM_ELEMENTS = [changelog];

  const name$2 = "core/custom-elements/index";

  async function run$2() {
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
    name: name$2,
    run: run$2
  });

  // import { html } from "../core/import-maps.js";

  const name$1 = "pcisig/railroad";
  // const funcs = {};
  // export default funcs;

  const cssPromise = loadStyle();

  async function loadStyle() {
    try {
      return (await Promise.resolve().then(function () { return railroad$1; })).default;
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
      const el = SVG(this.tagName, this.attrs);
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

  /* export */ class Path extends FakeSVG {
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
          new Path(x, y).h(10).addTo(g);
          x += 10;
        }
        item.format(x, y, item.width).addTo(g);
        x += item.width;
        y += item.height;
        if (item.needsSpace) {
          new Path(x, y).h(10).addTo(g);
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.needsSpace && i > 0) {
          new Path(x, y).h(10).addTo(this);
          x += 10;
        }
        item.format(x, y, item.width).addTo(this);
        x += item.width;
        y += item.height;
        if (item.needsSpace && i < this.items.length - 1) {
          new Path(x, y).h(10).addTo(this);
          x += 10;
        }
      }
      return this;
    }
  }
  // funcs.Sequence = (...args) => new Sequence(...args);

  /* export */ class Element extends Sequence {
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
      new Path(x, y).h(gaps[0]).addTo(this);
      x += gaps[0];
      const xInitial = x;
      if (this.items.length > 1) {
        new Path(x, y).h(Options.AR).addTo(this);
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
          new Path(x, y)
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
        new Path(x, y).h(Options.AR).addTo(this);
        x += Options.AR;
      }
      new Path(x, y).h(gaps[1]).addTo(this);

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
      new Path(x, y).right(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height)
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
          new Path(x, y)
            .arc("se")
            .up(y - upperLineY - arc * 2)
            .arc("wn")
            .right(itemWidth - arc)
            .arc("ne")
            .down(y + item.height - upperLineY - arc * 2)
            .arc("ws")
            .addTo(this);
          // Straight line
          new Path(x, y).right(itemSpace + arc).addTo(this);
          item.format(x + itemSpace + arc, y, item.width).addTo(this);
          x += itemWidth + arc;
          y += item.height;
          // x ends on the far side of the first element,
          // where the next element's skip needs to begin
        } else if (i < last) {
          // Upper skip
          new Path(x, upperLineY)
            .right(arc * 2 + Math.max(itemWidth, arc) + arc)
            .arc("ne")
            .down(y - upperLineY + item.height - arc * 2)
            .arc("ws")
            .addTo(this);
          // Straight line
          new Path(x, y).right(arc * 2).addTo(this);
          item.format(x + arc * 2, y, item.width).addTo(this);
          new Path(x + item.width + arc * 2, y + item.height)
            .right(itemSpace + arc)
            .addTo(this);
          // Lower skip
          new Path(x, y)
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
          new Path(x, y).right(arc * 2).addTo(this);
          item.format(x + arc * 2, y, item.width).addTo(this);
          new Path(x + arc * 2 + item.width, y + item.height)
            .right(itemSpace + arc)
            .addTo(this);
          // Lower skip
          new Path(x, y)
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
      new Path(x, y).right(gaps[0]).addTo(this);
      x += gaps[0];
      new Path(x + this.width, y).right(gaps[1]).addTo(this);
      // bounding box
      // new Path(x+gaps[0], y).up(this.up).right(this.width).down(this.up+this.down).left(this.width).up(this.down).addTo(this);
      const first = this.items[0];
      const second = this.items[1];

      // top
      const firstIn = this.up - first.up;
      const firstOut = this.up - first.up - first.height;
      new Path(x, y)
        .arc("se")
        .up(firstIn - 2 * arc)
        .arc("wn")
        .addTo(this);
      first.format(x + 2 * arc, y - firstIn, this.width - 4 * arc).addTo(this);
      new Path(x + this.width - 2 * arc, y - firstOut)
        .arc("ne")
        .down(firstOut - 2 * arc)
        .arc("ws")
        .addTo(this);

      // bottom
      const secondIn = this.down - second.down - second.height;
      const secondOut = this.down - second.down;
      new Path(x, y)
        .arc("ne")
        .down(secondIn - 2 * arc)
        .arc("ws")
        .addTo(this);
      second.format(x + 2 * arc, y + secondIn, this.width - 4 * arc).addTo(this);
      new Path(x + this.width - 2 * arc, y + secondOut)
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
      new Path(x + arc, y - crossY / 2 - arc)
        .arc("ws")
        .right(crossBar)
        .arc_8("n", "cw")
        .l(crossX - arcX, crossY - arcY)
        .arc_8("sw", "ccw")
        .right(crossBar)
        .arc("ne")
        .addTo(this);
      new Path(x + arc, y + crossY / 2 + arc)
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
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
        new Path(x, y)
          .arc("se")
          .up(distanceFromY - Options.AR * 2)
          .arc("wn")
          .addTo(this);
        item
          .format(x + Options.AR * 2, y - distanceFromY, innerWidth)
          .addTo(this);
        new Path(x + Options.AR * 2 + innerWidth, y - distanceFromY + item.height)
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
      new Path(x, y).right(Options.AR * 2).addTo(this);
      this.items[this.normal]
        .format(x + Options.AR * 2, y, innerWidth)
        .addTo(this);
      new Path(x + Options.AR * 2 + innerWidth, y + this.height)
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
        new Path(x, y)
          .arc("ne")
          .down(distanceFromY - Options.AR * 2)
          .arc("ws")
          .addTo(this);
        item
          .format(x + Options.AR * 2, y + distanceFromY, innerWidth)
          .addTo(this);
        new Path(x + Options.AR * 2 + innerWidth, y + distanceFromY + item.height)
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
        max(allButLast, x => x.up) + Options.VS
      );
      this.up = Math.max(this._upperTrack, last.up);

      // All but the first have a track running below them
      // Last either straight-lines or curves up, so has different calculation
      this._lowerTrack = Math.max(
        Options.VS,
        max(
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
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
      new Path(x, y)
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
      new Path(lowerStart, y + this._lowerTrack)
        .h(lowerSpan)
        .arc("se")
        .v(-(this._lowerTrack - Options.AR * 2))
        .arc("wn")
        .addTo(this);

      // Items
      for (const [i, item] of enumerate(this.items)) {
        // input track
        if (i === 0) {
          new Path(x, y).h(Options.AR).addTo(this);
          x += Options.AR;
        } else {
          new Path(x, y - this._upperTrack)
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
            new Path(x, y).h(Options.AR).addTo(this);
          } else {
            new Path(x, y + item.height).arc("se").addTo(this);
          }
        } else if (i === 0 && item.height > this._lowerTrack) {
          // Needs to arc up to meet the lower track, not down.
          if (item.height - this._lowerTrack >= Options.AR * 2) {
            new Path(x, y + item.height)
              .arc("se")
              .v(this._lowerTrack - item.height + Options.AR * 2)
              .arc("wn")
              .addTo(this);
          } else {
            // Not enough space to fit two arcs
            // so just bail and draw a straight line for now.
            new Path(x, y + item.height)
              .l(Options.AR * 2, this._lowerTrack - item.height)
              .addTo(this);
          }
        } else {
          new Path(x, y + item.height)
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
      this.innerWidth = max(this.items, x => {
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
      new Path(x, y).right(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height)
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
        new Path(x + 30, y)
          .up(distanceFromY - Options.AR)
          .arc("wn")
          .addTo(this);
        item
          .format(x + 30 + Options.AR, y - distanceFromY, this.innerWidth)
          .addTo(this);
        new Path(
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

      new Path(x + 30, y).right(Options.AR).addTo(this);
      normal.format(x + 30 + Options.AR, y, this.innerWidth).addTo(this);
      new Path(x + 30 + Options.AR + this.innerWidth, y + this.height)
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
        new Path(x + 30, y)
          .down(distanceFromY - Options.AR)
          .arc("ws")
          .addTo(this);
        item
          .format(x + 30 + Options.AR, y + distanceFromY, this.innerWidth)
          .addTo(this);
        new Path(
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
      x += gaps[0];

      // Draw item
      new Path(x, y).right(Options.AR).addTo(this);
      this.item
        .format(x + Options.AR, y, this.width - Options.AR * 2)
        .addTo(this);
      new Path(x + this.width - Options.AR, y + this.height)
        .right(Options.AR)
        .addTo(this);

      // Draw repeat arc
      const distanceFromY = Math.max(
        Options.AR * 2,
        this.item.height + this.item.down + Options.VS + this.rep.up
      );
      new Path(x + Options.AR, y)
        .arc("nw")
        .down(distanceFromY - Options.AR * 2)
        .arc("ws")
        .addTo(this);
      this.rep
        .format(x + Options.AR, y + distanceFromY, this.width - Options.AR * 2)
        .addTo(this);
      new Path(x + this.width - Options.AR, y + distanceFromY + this.rep.height)
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
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
      const path = new Path(x, y - 10);
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y + this.height).h(gaps[1]).addTo(this);
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
      new Path(x, y).right(width).addTo(this);
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
      new Path(x, y).h(gaps[0]).addTo(this);
      new Path(x + gaps[0] + this.width, y).h(gaps[1]).addTo(this);
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

  function max(iter, func) {
    if (!func)
      func = function (x) {
        return x;
      };
    return Math.max.apply(null, iter.map(func));
  }

  function SVG(name, attrs, text) {
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
            retval = new Path(...itemMap);
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
            retval = new Element(...itemMap);
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

  async function run$1(conf) {
    if (!("noRailroad" in conf)) {
      if ("railroad" in conf) {
        for (const opt in Options) {
          if (opt in conf.railroad) {
            Options[opt] = conf.railroad[opt];
          }
        }
      }

      let css = await cssPromise;
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

  var railroad$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$1,
    run: run$1
  });

  // @ts-check

  const name = "core/a11y";

  const DISABLED_RULES = [
    "color-contrast", // too slow 🐢
    "landmark-one-main", // need to add a <main>, else it marks entire page as errored
    "landmark-unique",
    "region",
  ];

  async function run(conf) {
    if (!conf.a11y) {
      return;
    }

    const options = conf.a11y === true ? {} : conf.a11y;
    const violations = await getViolations(options);
    for (const violation of violations) {
      /**
       * We're grouping by failureSummary as it contains hints to fix the issue.
       * For example, with color-constrast rule, it tells about the present color
       * contrast and how to fix it. If we don't group, errors will be repetitive.
       * @type {Map<string, HTMLElement[]>}
       */
      const groupedBySummary = new Map();
      for (const node of violation.nodes) {
        const { failureSummary, element } = node;
        const elements =
          groupedBySummary.get(failureSummary) ||
          groupedBySummary.set(failureSummary, []).get(failureSummary);
        elements.push(element);
      }

      const { id, help, description, helpUrl } = violation;
      const title = `a11y/${id}: ${help}`;
      for (const [failureSummary, elements] of groupedBySummary) {
        const hints = formatHintsAsMarkdown(failureSummary);
        const details = `\n\n${description}.\n\n${hints}. ([Learn more](${helpUrl}))`;
        showWarning(title, name, { details, elements });
      }
    }
  }

  /**
   * @param {object} opts Options as described at https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
   */
  async function getViolations(opts) {
    const { rules, ...otherOptions } = opts;
    const options = {
      rules: {
        ...Object.fromEntries(DISABLED_RULES.map(id => [id, { enabled: false }])),
        ...rules,
      },
      ...otherOptions,
      elementRef: true,
      resultTypes: ["violations"],
      reporter: "v1", // v1 includes a `failureSummary`
    };

    let axe;
    try {
      axe = await importAxe();
    } catch (error) {
      const msg = "Failed to load a11y linter.";
      showError(msg, name);
      console.error(error);
      return [];
    }

    try {
      const result = await axe.run(document, options);
      return result.violations;
    } catch (error) {
      const msg = "Error while looking for a11y issues.";
      showError(msg, name);
      console.error(error);
      return [];
    }
  }

  /** @returns {Promise<typeof window.axe>} */
  function importAxe() {
    const script = document.createElement("script");
    script.classList.add("remove");
    script.src = "https://unpkg.com/axe-core@3/axe.min.js";
    document.head.appendChild(script);
    return new Promise((resolve, reject) => {
      script.onload = () => resolve(window.axe);
      script.onerror = reject;
    });
  }

  /** @param {string} text */
  function formatHintsAsMarkdown(text) {
    const results = [];
    for (const group of text.split("\n\n")) {
      const [msg, ...opts] = group.split(/^\s{2}/m);
      const options = opts.map(opt => `- ${opt.trimEnd()}`).join("\n");
      results.push(`${msg}${options}`);
    }
    return results.join("\n\n");
  }

  var a11y = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name,
    run: run
  });

  var ui = ".respec-modal .close-button{position:absolute;z-index:inherit;padding:.2em;font-weight:700;cursor:pointer;margin-left:5px;border:none;background:0 0}\n#respec-ui{position:fixed;display:flex;flex-direction:row-reverse;top:20px;right:20px;width:202px;text-align:right;z-index:9000}\n#respec-pill,.respec-info-button{background:#fff;height:2.5em;color:#787878;border:1px solid #ccc;box-shadow:1px 1px 8px 0 rgba(100,100,100,.5)}\n.respec-info-button{border:none;opacity:.75;border-radius:2em;margin-right:1em;min-width:3.5em}\n.respec-info-button:focus,.respec-info-button:hover{opacity:1;transition:opacity .2s}\n#respec-pill:disabled{font-size:2.8px;text-indent:-9999em;border-top:1.1em solid rgba(40,40,40,.2);border-right:1.1em solid rgba(40,40,40,.2);border-bottom:1.1em solid rgba(40,40,40,.2);border-left:1.1em solid #fff;transform:translateZ(0);animation:respec-spin .5s infinite linear;box-shadow:none}\n#respec-pill:disabled,#respec-pill:disabled:after{border-radius:50%;width:10em;height:10em}\n@keyframes respec-spin{\n0%{transform:rotate(0)}\n100%{transform:rotate(360deg)}\n}\n.respec-hidden{visibility:hidden;opacity:0;transition:visibility 0s .2s,opacity .2s linear}\n.respec-visible{visibility:visible;opacity:1;transition:opacity .2s linear}\n#respec-pill:focus,#respec-pill:hover{color:#000;background-color:#f5f5f5;transition:color .2s}\n#respec-menu{position:absolute;margin:0;padding:0;font-family:sans-serif;background:#fff;box-shadow:1px 1px 8px 0 rgba(100,100,100,.5);width:200px;display:none;text-align:left;margin-top:32px;font-size:.8em}\n#respec-menu:not([hidden]){display:block}\n#respec-menu li{list-style-type:none;margin:0;padding:0}\n.respec-save-buttons{display:grid;grid-template-columns:repeat(auto-fill,minmax(47%,2fr));grid-gap:0.5cm;padding:.5cm}\n.respec-save-button:link{padding-top:16px;color:#f0f0f0;background:#2a5aa8;justify-self:stretch;height:1cm;text-decoration:none;text-align:center;font-size:inherit;border:none;border-radius:.2cm}\n.respec-save-button:link:hover{color:#fff;background:#2a5aa8;padding:0;margin:0;border:0;padding-top:16px}\n.respec-save-button:link:focus{background:#193766}\n#respec-pill:focus,#respec-ui button:focus,.respec-option:focus{outline:0;outline-style:none}\n#respec-pill-error{background-color:red;color:#fff}\n#respec-pill-warning{background-color:orange;color:#fff}\n.respec-error-list,.respec-warning-list{margin:0;padding:0;list-style:none;font-family:sans-serif;background-color:#fffbe6;font-size:.85em}\n.respec-error-list>li,.respec-warning-list>li{padding:.4em .7em}\n.respec-warning-list>li::before{content:\"⚠️\";padding-right:.5em}\n.respec-error-list p,.respec-warning-list p{padding:0;margin:0}\n.respec-warning-list li{color:#5c3b00;border-bottom:thin solid #fff5c2}\n.respec-error-list,.respec-error-list li{background-color:#fff0f0}\n.respec-error-list li::before{content:\"💥\";padding-right:.5em}\n.respec-error-list li{padding:.4em .7em;color:#5c3b00;border-bottom:thin solid #ffd7d7}\n.respec-error-list li>p{margin:0;padding:0;display:inline-block}\n.respec-error-list li>p:first-child,.respec-warning-list li>p:first-child{display:inline}\n.respec-error-list>li li,.respec-warning-list>li li{margin:0;list-style:disc}\n#respec-overlay{display:block;position:fixed;z-index:10000;top:0;left:0;height:100%;width:100%;background:#000}\n.respec-show-overlay{transition:opacity .2s linear;opacity:.5}\n.respec-hide-overlay{transition:opacity .2s linear;opacity:0}\n.respec-modal{display:block;position:fixed;z-index:11000;margin:auto;top:10%;background:#fff;border:5px solid #666;min-width:20%;width:79%;padding:0;max-height:80%;overflow-y:auto;margin:0 -.5cm}\n@media screen and (min-width:78em){\n.respec-modal{width:62%}\n}\n.respec-modal h3{margin:0;padding:.2em;text-align:center;color:#000;background:linear-gradient(to bottom,#eee 0,#eee 50%,#ccc 100%);font-size:1em}\n.respec-modal .inside div p{padding-left:1cm}\n#respec-menu button.respec-option{background:#fff;padding:0 .2cm;border:none;width:100%;text-align:left;font-size:inherit;padding:1.2em 1.2em}\n#respec-menu button.respec-option:hover,#respec-menu button:focus{background-color:#eee}\n.respec-cmd-icon{padding-right:.5em}\n#respec-ui button.respec-option:last-child{border:none;border-radius:inherit}\n.respec-button-copy-paste{position:absolute;height:28px;width:40px;cursor:pointer;background-image:linear-gradient(#fcfcfc,#eee);border:1px solid #90b8de;border-left:0;border-radius:0 0 3px 0;-webkit-user-select:none;user-select:none;-webkit-appearance:none;top:0;left:127px}\n#specref-ui{margin:0 2%;margin-bottom:.5cm}\n#specref-ui header{font-size:.7em;background-color:#eee;text-align:center;padding:.2cm;margin-bottom:.5cm;border-radius:0 0 .2cm .2cm}\n#specref-ui header h1{padding:0;margin:0;color:#000}\n#specref-ui p{padding:0;margin:0;font-size:.8em;text-align:center}\n#specref-ui p.state{margin:1cm}\n#specref-ui .searchcomponent{font-size:16px;display:grid;grid-template-columns:auto 2cm}\n#specref-ui button,#specref-ui input{border:0;padding:6px 12px}\n#specref-ui label{font-size:.6em;grid-column-end:3;text-align:right;grid-column-start:1}\n#specref-ui input[type=search]{-webkit-appearance:none;font-size:16px;border-radius:.1cm 0 0 .1cm;border:1px solid #ccc}\n#specref-ui button[type=submit]{color:#fff;border-radius:0 .1cm .1cm 0;background-color:#337ab7}\n#specref-ui button[type=submit]:hover{background-color:#286090;border-color:#204d74}\n#specref-ui .result-stats{margin:0;padding:0;color:grey;font-size:.7em;font-weight:700}\n#specref-ui .specref-results{font-size:.8em}\n#specref-ui .specref-results dd+dt{margin-top:.51cm}\n#specref-ui .specref-results a{text-transform:capitalize}\n#specref-ui .specref-results .authors{display:block;color:#006621}\n@media print{\n#respec-ui{display:none}\n}\n#xref-ui{width:100%;min-height:550px;height:100%;overflow:hidden;padding:0;margin:0;border:0}\n#xref-ui:not(.ready){background:url(\"https://respec.org/xref/loader.gif\") no-repeat center}\n#xref-ui+a[href]{font-size:.9rem;float:right;margin:0 .5em .5em;border-bottom-width:1px}";

  var ui$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ui
  });

  var respec = "@keyframes pop{\n0%{transform:scale(1,1)}\n25%{transform:scale(1.25,1.25);opacity:.75}\n100%{transform:scale(1,1)}\n}\n.hljs{background:0 0!important}\na abbr,h1 abbr,h2 abbr,h3 abbr,h4 abbr,h5 abbr,h6 abbr{border:none}\ndfn{font-weight:700}\na.internalDFN{color:inherit;border-bottom:1px solid #99c;text-decoration:none}\na.externalDFN{color:inherit;border-bottom:1px dotted #ccc;text-decoration:none}\na.bibref{text-decoration:none}\n.respec-offending-element:target{animation:pop .25s ease-in-out 0s 1}\n.respec-offending-element,a[href].respec-offending-element{text-decoration:red wavy underline}\n@supports not (text-decoration:red wavy underline){\n.respec-offending-element:not(pre){display:inline-block}\n.respec-offending-element{background:url(data:image/gif;base64,R0lGODdhBAADAPEAANv///8AAP///wAAACwAAAAABAADAEACBZQjmIAFADs=) bottom repeat-x}\n}\n#references :target{background:#eaf3ff;animation:pop .4s ease-in-out 0s 1}\ncite .bibref{font-style:normal}\ncode{color:#c63501}\nth code{color:inherit}\na[href].orcid{padding-left:4px;padding-right:4px}\na[href].orcid>svg{margin-bottom:-2px}\n.toc a,.tof a{text-decoration:none}\na .figno,a .secno{color:#000}\nol.tof,ul.tof{list-style:none outside none}\n.caption{margin-top:.5em;font-style:italic}\ntable.simple{border-spacing:0;border-collapse:collapse;border-bottom:3px solid #005a9c}\n.simple th{background:#005a9c;color:#fff;padding:3px 5px;text-align:left}\n.simple th a{color:#fff;padding:3px 5px;text-align:left}\n.simple th[scope=row]{background:inherit;color:inherit;border-top:1px solid #ddd}\n.simple td{padding:3px 10px;border-top:1px solid #ddd}\n.simple tr:nth-child(even){background:#f0f6ff}\n.section dd>p:first-child{margin-top:0}\n.section dd>p:last-child{margin-bottom:0}\n.section dd{margin-bottom:1em}\n.section dl.attrs dd,.section dl.eldef dd{margin-bottom:0}\n#issue-summary>ul{column-count:2}\n#issue-summary li{list-style:none;display:inline-block}\ndetails.respec-tests-details{margin-left:1em;display:inline-block;vertical-align:top}\ndetails.respec-tests-details>*{padding-right:2em}\ndetails.respec-tests-details[open]{z-index:999999;position:absolute;border:thin solid #cad3e2;border-radius:.3em;background-color:#fff;padding-bottom:.5em}\ndetails.respec-tests-details[open]>summary{border-bottom:thin solid #cad3e2;padding-left:1em;margin-bottom:1em;line-height:2em}\ndetails.respec-tests-details>ul{width:100%;margin-top:-.3em}\ndetails.respec-tests-details>li{padding-left:1em}\na[href].self-link:hover{opacity:1;text-decoration:none;background-color:transparent}\nh2,h3,h4,h5,h6{position:relative}\naside.example .marker>a.self-link{color:inherit}\ncaption>a.self-link,div.marker>a.self-link,figcaption>a.self-link,h2>a.self-link,h3>a.self-link,h4>a.self-link,h5>a.self-link,h6>a.self-link{border:none;color:inherit;font-size:83%;height:2em;left:-1.6em;opacity:.5;position:absolute;text-align:center;text-decoration:none;top:0;transition:opacity .2s;width:2em}\ncaption>a.self-link::before,div.marker>a.self-link::before,figcaption>a.self-link::before,h2>a.self-link::before,h3>a.self-link::before,h4>a.self-link::before,h5>a.self-link::before,h6>a.self-link::before{content:\"§\";display:block}\n@media (max-width:767px){\ndd{margin-left:0}\ncaption>a.self-link,div.marker>a.self-link,figcaption>a.self-link,h2>a.self-link,h3>a.self-link,h4>a.self-link,h5>a.self-link,h6>a.self-link{left:auto;top:auto}\n}\n@media print{\n.removeOnSave{display:none}\n}";

  var respec$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': respec
  });

  var regpict = "text.regBitNumMiddle{text-anchor:middle;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitNumEnd{text-anchor:end;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitNumStart{text-anchor:start;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:8pt}\ntext.regBitWidth{text-anchor:middle;fill:none;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-weight:700;font-size:11pt}\ntext.regByteNumMiddle{text-anchor:middle;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ntext.regRowTagLeft{text-anchor:end;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ntext.regRowTagRight{text-anchor:start;fill:grey;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif;font-size:11pt}\ng line.regBitNumLine{stroke:grey;stroke-width:1px}\ng line.regBitNumLine_Hide{stroke:none;stroke-width:1px}\ng path.regFieldBox,g rect.regFieldBox{fill:white;stroke:black;stroke-width:1.5px}\ng.regAttr_reserved path.regFieldBox,g.regAttr_reserved rect.regFieldBox,g.regAttr_rsvd path.regFieldBox,g.regAttr_rsvd rect.regFieldBox,g.regAttr_rsvdp path.regFieldBox,g.regAttr_rsvdp rect.regFieldBox,g.regAttr_rsvdz path.regFieldBox,g.regAttr_rsvdz rect.regFieldBox,g.regAttr_unused path.regFieldBox,g.regAttr_unused rect.regFieldBox,g.regFieldUnused path.regFieldBox,g.regFieldUnused rect.regFieldBox{fill:#e8e8e8}\ng.regFieldExternal line.regFieldBox,g.regFieldInternal line.regFieldBox{stroke:black}\ng.regFieldUnused line.regFieldBox,g.regFieldUnused path.regFieldBox,g.regFieldUnused rect.regFieldBox{stroke:grey}\ng.regFieldUnused text.regFieldName,g.regFieldUnused text.regFieldValue{fill:grey}\ng.regFieldHidden line.regBitNumLine,g.regFieldHidden line.regBitNumLine_Hide,g.regFieldHidden line.regFieldBox,g.regFieldHidden path.regBitBracket,g.regFieldHidden path.regBitLine,g.regFieldHidden path.regFieldBox,g.regFieldHidden rect.regFieldBox,g.regFieldHidden text.regBitNumEnd,g.regFieldHidden text.regBitNumMiddle,g.regFieldHidden text.regBitNumStart,g.regFieldHidden text.regFieldExtendsLeft,g.regFieldHidden text.regFieldExtendsRight,g.regFieldHidden text.regFieldName,g.regFieldHidden text.regFieldValue{fill:none;stroke:none}\ng text.regFieldValue,g.regFieldInternal text.regFieldName{text-anchor:middle}\ng text.regFieldExtendsRight,g.regFieldOverflowLSB text.regBitNumEnd{text-anchor:start}\ng text.regFieldExtendsLeft,g.regFieldOverflowMSB text.regBitNumStart{text-anchor:end}\ng text.regFieldName,g text.regFieldValue{font-size:11pt;font-family:\"Source Sans Pro\",Calibri,Tahoma,\"Lucinda Grande\",Arial,Helvetica,sans-serif}\ng.regFieldExternal1 path.regBitBracket,g.regFieldExternal1 path.regBitLine{stroke:black;stroke-width:1px}\ng.regFieldExternal0 path.regBitLine{stroke:green;stroke-dasharray:4,2;stroke-width:1px}\ng.regFieldExternal0 path.regBitBracket{stroke:green;stroke-width:1px}\nsvg text.regFieldValue{fill:#0060A9;font-family:monospace}\nsvg.regpict{color:green}\nsvg .svg_error text:not(.regBitWidth):not(.regBitNumMiddle):not(.regBitNumEnd):not(.regBitNumStart){fill:red;font-size:12pt;font-weight:700;font-style:normal;font-family:monospace}\nfigure div.json,figure pre.json{color:#005a9c;display:inherit}\n@media screen{\ng.regLink:focus path.regFieldBox,g.regLink:focus rect.regFieldBox,g.regLink:hover path.regFieldBox,g.regLink:hover rect.regFieldBox{fill:#ffa;stroke:blue;stroke-width:2.5px}\ng.regLink.regFieldExternal:focus path.regBitBracket,g.regLink.regFieldExternal:hover path.regBitBracket,g.regLink:focus line.regBitNumLine,g.regLink:focus line.regBitNumLine_Hide,g.regLink:focus line.regFieldBox,g.regLink:focus path.regBitLine,g.regLink:focus path.regFieldBox,g.regLink:hover line.regBitNumLine,g.regLink:hover line.regBitNumLine_Hide,g.regLink:hover line.regFieldBox,g.regLink:hover path.regBitLine,g.regLink:hover path.regFieldBox{stroke:blue}\ng.regLink.regFieldExternal:focus text.regFieldValue,g.regLink.regFieldExternal:hover text.regFieldValue,g.regLink:focus text.regFieldName,g.regLink:hover text.regFieldName{fill:blue;font-weight:700}\ng.regLink:focus text.regBitNumEnd,g.regLink:focus text.regBitNumMiddle,g.regLink:focus text.regBitNumStart,g.regLink:hover text.regBitNumEnd,g.regLink:hover text.regBitNumMiddle,g.regLink:hover text.regBitNumStart{fill:blue;font-weight:700;font-size:9pt}\ng.regLink:focus text.regBitWidth,g.regLink:hover text.regBitWidth{fill:blue}\n}";

  var regpict$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': regpict
  });

  var examples = "span.example-title{text-transform:none}\naside.example,div.example,div.illegal-example{padding:.5em;margin:1em 0;position:relative;clear:both}\ndiv.illegal-example{color:red}\ndiv.illegal-example p{color:#000}\naside.example,div.example{padding:.5em;border-left-width:.5em;border-left-style:solid;border-color:#e0cb52;background:#fcfaee}\naside.example div.example{border-left-width:.1em;border-color:#999;background:#fff}\naside.example div.example span.example-title{color:#999}\n.example pre{background-color:rgba(0,0,0,.03)}";

  var examples$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': examples
  });

  var issuesNotes = ".issue-label{text-transform:initial}\n.warning>p:first-child{margin-top:0}\n.warning{padding:.5em;border-left-width:.5em;border-left-style:solid}\nspan.warning{padding:.1em .5em .15em}\n.issue.closed span.issue-number{text-decoration:line-through}\n.warning{border-color:#f11;border-width:.2em;border-style:solid;background:#fbe9e9}\n.warning-title:before{content:\"⚠\";font-size:1.3em;float:left;padding-right:.3em;margin-top:-.3em}\nli.task-list-item{list-style:none}\ninput.task-list-item-checkbox{margin:0 .35em .25em -1.6em;vertical-align:middle}\n.issue a.respec-gh-label{padding:5px;margin:0 2px 0 2px;font-size:10px;text-transform:none;text-decoration:none;font-weight:700;border-radius:4px;position:relative;bottom:2px;border:none;display:inline-block}\ndiv.impnote-title{padding-right:1em;min-width:7.5em;color:#0060a9}\ndiv.impnote-title span{text-transform:uppercase}\ndiv.impnote{margin-top:1em;margin-bottom:1em}\n.impnote>p:first-child{margin-top:0}\n.impnote{padding:.5em;border-left-width:.5em;border-left-style:solid}\ndiv.impnote{padding:1em 1.2em .5em;margin:1em 0;position:relative;clear:both}\nspan.impnote{padding:.1em .5em .15em}\n.impnote{border-color:#0060a9;background:#e5f4ff}";

  var issuesNotes$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': issuesNotes
  });

  var webidl = "pre.idl{padding:1em;position:relative}\npre.idl>code{color:#000}\n@media print{\npre.idl{white-space:pre-wrap}\n}\n.idlHeader{display:block;width:150px;background:#8ccbf2;color:#fff;font-family:sans-serif;font-weight:700;margin:-1em 0 1em -1em;height:28px;line-height:28px}\n.idlHeader a.self-link{margin-left:.3cm;text-decoration:none;border-bottom:none}\n.idlID{font-weight:700;color:#005a9c}\n.idlType{color:#005a9c}\n.idlName{color:#ff4500}\n.idlName a{color:#ff4500;border-bottom:1px dotted #ff4500;text-decoration:none}\na.idlEnumItem{color:#000;border-bottom:1px dotted #ccc;text-decoration:none}\n.idlSuperclass{font-style:italic;color:#005a9c}\n.idlDefaultValue,.idlParamName{font-style:italic}\n.extAttr{color:#666}\n.idlSectionComment{color:gray}\n.idlIncludes a{font-weight:700}\n.respec-button-copy-paste:focus{text-decoration:none;border-color:#51a7e8;outline:0;box-shadow:0 0 5px rgba(81,167,232,.5)}\n.respec-button-copy-paste.selected:focus,.respec-button-copy-paste:focus:hover{border-color:#51a7e8}\n.respec-button-copy-paste.zeroclipboard-is-active,.respec-button-copy-paste.zeroclipboard-is-hover,.respec-button-copy-paste:active,.respec-button-copy-paste:hover{text-decoration:none;background-color:#ddd;background-image:linear-gradient(#eee,#ddd);border-color:#ccc}\n.respec-button-copy-paste.selected,.respec-button-copy-paste.zeroclipboard-is-active,.respec-button-copy-paste:active{background-color:#dcdcdc;background-image:none;border-color:#b5b5b5;box-shadow:inset 0 2px 4px rgba(0,0,0,.15)}\n.respec-button-copy-paste.selected:hover{background-color:#cfcfcf}\n.respec-button-copy-paste.disabled,.respec-button-copy-paste.disabled:hover,.respec-button-copy-paste:disabled,.respec-button-copy-paste:disabled:hover{color:rgba(102,102,102,.5);cursor:default;background-color:rgba(229,229,229,.5);background-image:none;border-color:rgba(197,197,197,.5);box-shadow:none}\n@media print{\n.respec-button-copy-paste{visibility:hidden}\n}";

  var webidl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': webidl
  });

  var dfnIndex = "ul.index{columns:30ch;column-gap:1.5em}\nul.index li{list-style:inherit}\nul.index li span{color:inherit;cursor:pointer;white-space:normal}\n#index-defined-here ul.index li{font-size:.9rem}\nul.index code{color:inherit}\n#index-defined-here .print-only{display:none}\n@media print{\n#index-defined-here .print-only{display:initial}\n}";

  var dfnIndex$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': dfnIndex
  });

  var caniuse = ".caniuse-stats{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:baseline;cursor:pointer}\nbutton.caniuse-cell{margin:1px 1px 0 0;border:none}\n.caniuse-browser{position:relative}\n@media print{\n.caniuse-cell.y::before{content:\"✔️\";padding:.5em}\n.caniuse-cell.n::before{content:\"❌\";padding:.5em}\n.caniuse-cell.a::before,.caniuse-cell.d::before,.caniuse-cell.p::before,.caniuse-cell.x::before{content:\"⚠️\";padding:.5em}\n}\n.caniuse-browser ul{display:none;margin:0;padding:0;list-style:none;position:absolute;left:0;z-index:2;background:#fff;margin-top:1px}\n.caniuse-stats a{white-space:nowrap;align-self:center;margin-left:.5em}\n.caniuse-cell{display:flex;color:rgba(0,0,0,.8);font-size:90%;height:.8cm;margin-right:1px;margin-top:0;min-width:3cm;overflow:visible;justify-content:center;align-items:center}\nli.caniuse-cell{margin-bottom:1px}\n.caniuse-cell:focus{outline:0}\n.caniuse-cell:hover{color:#000}\n.caniuse-cell.y{background:#8bc34a}\n.caniuse-cell.n{background:#e53935}\n.caniuse-cell.a,.caniuse-cell.d,.caniuse-cell.p,.caniuse-cell.x{background:#ffc107}\n.caniuse-stats .caniuse-browser:hover>ul,.caniuse-stats button:focus+ul{display:block}";

  var caniuse$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': caniuse
  });

  var mdnAnnotation = ".mdn{font-size:.75em;position:absolute;right:.3em;min-width:0;margin-top:3em}\n.mdn details{width:100%;margin:1px 0;position:relative;z-index:10;box-sizing:border-box;padding:.4em;padding-top:0}\n.mdn details[open]{min-width:25ch;max-width:32ch;background:#fff;box-shadow:0 1em 3em -.4em rgba(0,0,0,.3),0 0 1px 1px rgba(0,0,0,.05);border-radius:2px;z-index:11;margin-bottom:.4em}\n.mdn summary{text-align:right;cursor:default;margin-right:-.4em}\n.mdn summary span{font-family:zillaslab,Palatino,\"Palatino Linotype\",serif;color:#fff;background-color:#000;display:inline-block;padding:3px}\n.mdn a{display:inline-block;word-break:break-all}\n.mdn p{margin:0}\n.mdn .engines-all{color:#058b00}\n.mdn .engines-some{color:#b00}\n.mdn table{width:100%;font-size:.9em}\n.mdn td{border:none}\n.mdn td:nth-child(2){text-align:right}\n.mdn .nosupportdata{font-style:italic;margin:0}\n.mdn tr::before{content:\"\";display:table-cell;width:1.5em;height:1.5em;background:no-repeat center center/contain;font-size:.75em}\n.mdn .no,.mdn .unknown{color:#ccc;filter:grayscale(100%)}\n.mdn .no::before,.mdn .unknown::before{opacity:.5}\n.mdn .chrome::before,.mdn .chrome_android::before{background-image:url(https://resources.whatwg.org/browser-logos/chrome.svg)}\n.mdn .edge::before,.mdn .edge_mobile::before{background-image:url(https://resources.whatwg.org/browser-logos/edge.svg)}\n.mdn .firefox::before,.mdn .firefox_android::before{background-image:url(https://resources.whatwg.org/browser-logos/firefox.png)}\n.mdn .ie::before{background-image:url(https://resources.whatwg.org/browser-logos/ie.png)}\n.mdn .opera::before,.mdn .opera_android::before{background-image:url(https://resources.whatwg.org/browser-logos/opera.svg)}\n.mdn .safari::before{background-image:url(https://resources.whatwg.org/browser-logos/safari.png)}\n.mdn .safari_ios::before{background-image:url(https://resources.whatwg.org/browser-logos/safari-ios.svg)}\n.mdn .samsunginternet_android::before{background-image:url(https://resources.whatwg.org/browser-logos/samsung.svg)}\n.mdn .webview_android::before{background-image:url(https://resources.whatwg.org/browser-logos/android-webview.png)}";

  var mdnAnnotation$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': mdnAnnotation
  });

  var dfnPanel = "dfn{cursor:pointer}\n.dfn-panel{position:absolute;z-index:35;min-width:300px;max-width:500px;padding:.5em .75em;margin-top:.6em;font:small Helvetica Neue,sans-serif,Droid Sans Fallback;background:#fff;color:#000;box-shadow:0 1em 3em -.4em rgba(0,0,0,.3),0 0 1px 1px rgba(0,0,0,.05);border-radius:2px}\n.dfn-panel:not(.docked)>.caret{position:absolute;top:-9px}\n.dfn-panel:not(.docked)>.caret::after,.dfn-panel:not(.docked)>.caret::before{content:\"\";position:absolute;border:10px solid transparent;border-top:0;border-bottom:10px solid #fff;top:0}\n.dfn-panel:not(.docked)>.caret::before{border-bottom:9px solid #a2a9b1}\n.dfn-panel *{margin:0}\n.dfn-panel b{display:block;color:#000;margin-top:.25em}\n.dfn-panel ul a[href]{color:#333}\n.dfn-panel>div{display:flex}\n.dfn-panel a.self-link{font-weight:700;margin-right:auto}\n.dfn-panel .marker{padding:.1em;margin-left:.5em;border-radius:.2em;text-align:center;white-space:nowrap;font-size:90%;color:#040b1c}\n.dfn-panel .marker.dfn-exported{background:#d1edfd;box-shadow:0 0 0 .125em #1ca5f940}\n.dfn-panel .marker.idl-block{background:#8ccbf2;box-shadow:0 0 0 .125em #0670b161}\n.dfn-panel a:not(:hover){text-decoration:none!important;border-bottom:none!important}\n.dfn-panel a[href]:hover{border-bottom-width:1px}\n.dfn-panel ul{padding:0}\n.dfn-panel li{margin-left:1em}\n.dfn-panel.docked{position:fixed;left:.5em;top:unset;bottom:2em;margin:0 auto;max-width:calc(100vw - .75em * 2 - .5em - .2em * 2);max-height:30vh;overflow:auto}";

  var dfnPanel$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': dfnPanel
  });

  var dfnPanel_runtime = "(() => {\n// @ts-check\nif (document.respec) {\n  document.respec.ready.then(dfnPanel);\n} else {\n  dfnPanel();\n}\n\nfunction dfnPanel() {\n  /** @type {HTMLElement} */\n  let panel;\n  document.body.addEventListener(\"click\", event => {\n    if (!(event.target instanceof HTMLElement)) return;\n\n    /** @type {HTMLElement} */\n    const el = event.target;\n\n    const action = deriveAction(el);\n    switch (action) {\n      case \"show\": {\n        if (panel) hidePanel(panel);\n        /** @type {HTMLElement} */\n        const dfn = el.closest(\"dfn, .index-term\");\n        panel = document.getElementById(`dfn-panel-for-${dfn.id}`);\n        displayPanel(dfn, panel, { x: event.clientX, y: event.clientY });\n        break;\n      }\n      case \"dock\": {\n        panel.style.left = null;\n        panel.style.top = null;\n        panel.classList.add(\"docked\");\n        break;\n      }\n      case \"hide\": {\n        hidePanel(panel);\n        break;\n      }\n    }\n  });\n}\n\n/** @param {HTMLElement} clickTarget */\nfunction deriveAction(clickTarget) {\n  const hitALink = !!clickTarget.closest(\"a\");\n  if (clickTarget.closest(\"dfn, .index-term\")) {\n    return hitALink ? null : \"show\";\n  }\n  if (clickTarget.closest(\".dfn-panel\")) {\n    if (hitALink) {\n      const clickedSelfLink = clickTarget.classList.contains(\"self-link\");\n      return clickedSelfLink ? \"hide\" : \"dock\";\n    }\n    const panel = clickTarget.closest(\".dfn-panel\");\n    return panel.classList.contains(\"docked\") ? \"hide\" : null;\n  }\n  if (document.querySelector(\".dfn-panel:not([hidden])\")) {\n    return \"hide\";\n  }\n  return null;\n}\n\n/**\n * @param {HTMLElement} dfn\n * @param {HTMLElement} panel\n * @param {{ x: number, y: number }} clickPosition\n */\nfunction displayPanel(dfn, panel, { x, y }) {\n  panel.hidden = false;\n  // distance (px) between edge of panel and the pointing triangle (caret)\n  const MARGIN = 20;\n\n  const dfnRects = dfn.getClientRects();\n  // Find the `top` offset when the `dfn` can be spread across multiple lines\n  let closestTop = 0;\n  let minDiff = Infinity;\n  for (const rect of dfnRects) {\n    const { top, bottom } = rect;\n    const diffFromClickY = Math.abs((top + bottom) / 2 - y);\n    if (diffFromClickY < minDiff) {\n      minDiff = diffFromClickY;\n      closestTop = top;\n    }\n  }\n\n  const top = window.scrollY + closestTop + dfnRects[0].height;\n  const left = x - MARGIN;\n  panel.style.left = `${left}px`;\n  panel.style.top = `${top}px`;\n\n  // Find if the panel is flowing out of the window\n  const panelRect = panel.getBoundingClientRect();\n  const SCREEN_WIDTH = Math.min(window.innerWidth, window.screen.width);\n  if (panelRect.right > SCREEN_WIDTH) {\n    const newLeft = Math.max(MARGIN, x + MARGIN - panelRect.width);\n    const newCaretOffset = left - newLeft;\n    panel.style.left = `${newLeft}px`;\n    /** @type {HTMLElement} */\n    const caret = panel.querySelector(\".caret\");\n    caret.style.left = `${newCaretOffset}px`;\n  }\n}\n\n/** @param {HTMLElement} panel */\nfunction hidePanel(panel) {\n  panel.hidden = true;\n  panel.classList.remove(\"docked\");\n}\n})()";

  var dfnPanel_runtime$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': dfnPanel_runtime
  });

  var datatype = "var{position:relative;cursor:pointer}\nvar[data-type]::after,var[data-type]::before{position:absolute;left:50%;top:-6px;opacity:0;transition:opacity .4s;pointer-events:none}\nvar[data-type]::before{content:\"\";transform:translateX(-50%);border-width:4px 6px 0 6px;border-style:solid;border-color:transparent;border-top-color:#000}\nvar[data-type]::after{content:attr(data-type);transform:translateX(-50%) translateY(-100%);background:#000;text-align:center;font-family:\"Dank Mono\",\"Fira Code\",monospace;font-style:normal;padding:6px;border-radius:3px;color:#daca88;text-indent:0;font-weight:400}\nvar[data-type]:hover::after,var[data-type]:hover::before{opacity:1}";

  var datatype$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': datatype
  });

  var algorithms = ".assert{background:#eee;border-left:.5em solid #aaa;padding:.3em}";

  var algorithms$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': algorithms
  });

  var railroad = "svg{background-color:#f4f2ef}\nsvg path{stroke-width:3;stroke:black;fill:rgba(0,0,0,0)}\nsvg text{text-anchor:middle;white-space:pre}\nsvg text.diagram-text{font-size:12px}\nsvg text.diagram-arrow{font-size:16px}\nsvg text.label{text-anchor:start}\nsvg text.comment{font:italic 12px monospace}\nsvg rect{stroke-width:3;stroke:black;fill:hsl(120,100%,90%)}\nsvg rect.group-box{stroke:gray;stroke-dasharray:10,5;fill:none}\nsvg path.diagram-text{stroke-width:3;stroke:black;fill:white;cursor:help}\nsvg g.diagram-text:hover path.diagram-text{fill:#eee}\nfigure.railroad pre{display:none}\nfigure.railroad pre.debug,figure.railroad.debug pre{display:inherit}";

  var railroad$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': railroad
  });

}());
//# sourceMappingURL=respec-pcisig.js.map
