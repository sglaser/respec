// @ts-check
// Module pcisig/footnotes
//  Handles footnotes.
//  Invents id for footnote (if none present)

import { addId } from "../core/utils.js";

export const name = "pcisig/footnotes";

export function run() {
  /** @type {NodeListOf<HTMLElement>} */
  const footnotes = document.querySelectorAll("span.footnote");
  footnotes.forEach((footnote, index) => {
    const id = addId(footnote, "footnote", `${index + 1}`);
    footnote.insertAdjacentHTML(
      "beforebegin",
      `<label class="footnote-online">
          Footnote:
          <input
            class="footnote-checkbox"
            type="checkbox"
            name="${id}"
            value="checked"
        /></label>`
    );
    footnote.insertAdjacentHTML(
      "afterbegin",
      `<span class="footnote-online"> [</span>`
    );
    footnote.insertAdjacentHTML(
      "beforeend",
      `<span class="footnote-online">] </span>`
    );
  });
}
