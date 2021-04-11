// @ts-check
import { html } from "../../core/import-maps.js";
import { showWarning } from "../../core/utils.js";

export const name = "pcisig/templates.show-logo";

export default obj => {
  /** @type {HTMLAnchorElement} */
  const a = html`<a href="${obj.url || ""}" class="logo"></a>`;
  if (!obj.alt) {
    showWarning(`Found spec logo ${obj.url} without an alt attribute`, name);
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
