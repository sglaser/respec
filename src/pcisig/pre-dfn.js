// Module pcisig/pre-dfn
// Finds all <dfn> elements and adjust dfn-type attribute.

export const name = "pcisig/pre-dfn";

export function run() {
  "use strict";
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
