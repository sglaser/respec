// @ts-check
// Module pcisig/footnotes
//  Handles footnotes.
//  Invents id for footnote (if none present)

import { addId } from "../core/utils.js";
import { html } from "../core/import-maps.js";

export const name = "pcisig/footnotes";

export function run() {
  document.querySelectorAll("span.footnote").forEach((footnote, index) => {
    const id = addId(footnote, "footnote", `${index + 1}`);
    footnote.insertAdjacentHTML(
      "beforebegin",
      html`
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
      html`
        <span class="footnote-online"> [</span>
      `
    );
    footnote.insertAdjacentHTML(
      "beforeend",
      html`
        <span class="footnote-online">] </span>
      `
    );
  });
}
