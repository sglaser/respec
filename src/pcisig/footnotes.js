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
