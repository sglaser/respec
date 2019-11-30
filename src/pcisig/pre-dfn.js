// Module pcisig/pre-dfn
// Finds all <dfn> elements and adjust dfn-type attribute.

export const name = "pcisig/pre-dfn";

export function run() {
  "use strict";
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
