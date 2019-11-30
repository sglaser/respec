// Module pcisig/empty-references
// Find references with empty content and invent content.
// This must run AFTER structure.js

export const name = "pcisig/empty-references";

export function run() {
  // Update all anchors with empty content that are not in a table of contents
  document
    .querySelectorAll("a[href^='#']:empty():not(.tocxref)")
    .forEach(empty => {
      const href = empty.attr("href");
      const was = empty.attr("data-was");
      if (href) {
        empty.addclass("respec-error");
        empty.appendChild(
          document.createTextNode(
            `[[${href}${was ? ` data-was="${was}"` : ""}]]`
          )
        );
      }
    });
}
