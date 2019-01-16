"use strict";
// In case everything else fails, we want the error
window.addEventListener("error", function(ev) {
  console.error(ev.error, ev.message, ev);
});

// this is only set in a build, not at all in the dev environment
require.config({
  shim: {
    shortcut: {
      exports: "shortcut"
    },
    "jquery.svg": {
      deps: ["jQuery"]
    },
    jquery: {
      exports: "jQuery"
    }

    //highlight: {
    //  exports: "hljs",
    //},
    //beautify: {
    //  exports: "beautify",
    //},
  },
  paths: {
    //"beautify-css": "deps/beautify-css",
    //"beautify-html": "deps/beautify-html",
    "handlebars.runtime": "deps/handlebars",
    //"deps/highlight": "https://www.w3.org/Tools/respec/respec-highlight",
  },
  deps: ["deps/hyperhtml", "deps/url-search-params"],
});

define(
  [
    // order is significant
    "deps/domReady",
    "core/base-runner",
    "core/ui",
    "core/l10n",
    "pcisig/pcisig-defaults",
    "core/aria",
    "core/style",
    "pcisig/pcisig-style",
    //"w3c/l10n",
    "core/github",
    "core/data-include",
    "core/data-include",
    "core/data-include",
    "core/data-include",
    "core/markdown",
    "pcisig/pcisig-headers",
    "pcisig/footnotes",
    "pcisig/pcisig-conformance",
    "core/data-transform",
    "core/inlines",
    "w3c/rfc2119",
    "core/examples",
    "core/issues-notes",
    "pcisig/impnote",
    "core/requirements",
    "core/best-practices",
    "pcisig/regpict",
    "core/figures",
    "pcisig/tables",
    "pcisig/equations",
    "pcisig/pre-dfn",
    "core/dfn",
    "core/data-cite",
    //"core/biblio",
    "pcisig/link-to-dfn",
    "core/contrib",
    "core/fix-headers",
    "core/structure",
    "w3c/informative",
    "w3c/permalinks",
    "core/id-headers",
    "pcisig/fig-tbl-eqn-numbering",
    "core/rdfa",
    "pcisig/aria",
    "pcisig/xref-map",
    "core/location-hash",
    "ui/about-respec",
    "ui/dfn-list",
    "ui/save-html",
    //"ui/search-specref",
    //"core/seo",
    //"w3c/seo",
    //"core/highlight",
    "core/data-tests",
    "pcisig/include-final-config",
    "pcisig/empty-references",
    /*Linter must be the last thing to run*/
    "core/linter",
  ],
  function(domReady, runner, ui) {
    ui = ui.ui;
    var args = Array.from(arguments).filter(function(item) {
      return item;
    });
    ui.show();
    domReady(function() {
      runner
        .runAll(args)
        .then(document.respecIsReady)
        .then(function() {
          ui.enable();
        })
        .catch(function(err) {
          console.error(err);
          // even if things go critically bad, we should still try to show the UI
          ui.enable();
        });
    });
  }
);
