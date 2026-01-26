/*global define */

/* jshint browser: true */

// Module pcisig/footnotes
//  Handles footnotes.

// CONFIGURATION:
import { sub } from "../core/pubsubhub.js";

export const name = "pcisig/footnotes";

const meaningfulEmptyTags = new Set([
  "img",
  "svg",
  "math",
  "video",
  "audio",
  "object",
  "iframe",
  "canvas",
]);

function hasMeaningfulContent(node) {
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      if ((child.nodeValue || "").replace(/\u00a0/g, " ").trim()) {
        return true;
      }
      continue;
    }
    if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.classList?.contains("footnote-online")) {
        continue;
      }
      if (child.tagName && child.tagName.toLowerCase() === "input") {
        continue;
      }
      const tag = child.tagName.toLowerCase();
      if (meaningfulEmptyTags.has(tag)) {
        return true;
      }
      if (hasMeaningfulContent(child)) {
        return true;
      }
    }
  }
  return false;
}

function removeEmptyFootnotes(doc) {
  doc.querySelectorAll("span.footnote").forEach(footnote => {
    const content = footnote.querySelector("span.footnote-contents") || footnote;
    if (!hasMeaningfulContent(content)) {
      footnote.remove();
    }
  });
}

export function run(conf) {
  const doc = document;

  const styleId = "pcisig-footnotes-style";
  if (!doc.getElementById(styleId)) {
    const style = doc.createElement("style");
    style.id = styleId;
    style.textContent = `
      span.footnote > input { display: none; }
      span.footnote { color: #000 !important; }
      @media not print {
        span.footnote-contents,
        span.footnote > input,
        input#show-all-footnotes + label {
          color: #000 !important;
        }
      }
    `;
    doc.head.appendChild(style);
  }

  const footnotes = $("span.footnote", doc)
    .toArray()
    .filter(node => hasMeaningfulContent(node));
  $("span.footnote", doc).not(footnotes).remove();
  footnotes.forEach((node, index) => {
    const $footnote = $(node);
    $footnote
      .prepend("<span class='footnote-online'> [Footnote: </span>")
      .append("<span class='footnote-online'>] </span>");
    let id = "footnote-" + (index + 1);
    let span = "<span class='footnote-contents' id='" + id + "'></span>";
    let input = "<input type='checkbox' name='" + id + "' value='#" + id + "'></input>";
    $footnote.wrapInner(span).prepend(input);
  });
  sub(
    "end-all",
    () => {
      removeEmptyFootnotes(doc);
    },
    { once: true }
  );
  //cb();
}
