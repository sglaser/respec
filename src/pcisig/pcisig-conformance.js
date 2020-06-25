// @ts-check
// Module pcisig/conformance
// Handle the conformance section properly.
import { html } from "../core/import-maps.js";
import { joinAnd } from "../core/utils.js";
import { rfc2119Usage } from "../core/inlines.js";
export const name = "pcisig/pcisig-conformance";

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

export function run() {
  const conformance = document.querySelector("section#conformance");
  if (conformance) {
    processConformance(conformance);
  }
}
