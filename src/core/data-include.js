// @ts-check
// Module core/data-include
// Support for the data-include attribute. Causes external content to be included inside an
// element that has data-include='some URI'. There is also a data-oninclude attribute that
// features a white space separated list of global methods that will be called with the
// module object, the content, and the included URI.
//
// IMPORTANT:
//  This module only really works when you are in an HTTP context, and will most likely
//  fail if you are editing your documents on your local drive. That is due to security
//  restrictions in the browser.
import { runTransforms, showError } from "./utils.js";
import { markdownToHtml } from "./markdown.js";
import { restructure } from "./sections.js";

export const name = "core/data-include";

/**
 * `data-include-format="first-section"` is a PCI-SIG convention: the included
 * file is a standalone ReSpec document in its own right (with its own
 * boilerplate and, often, a trailing block of placeholder stub sections used
 * to satisfy cross-references when the file is previewed on its own). The
 * single section actually meant to be pulled into the master document is
 * marked with `data-top="yes"` there, and it shares its `id` with the
 * placeholder element that's including it. Grabbing just that section's
 * contents (rather than the whole fetched document body) avoids nesting a
 * second, duplicate-id copy of the placeholder's own section inside itself,
 * and drops any trailing placeholder stubs along with it.
 * @param {string} rawHtml
 * @param {string} targetId
 */
function extractFirstSection(rawHtml, targetId) {
  const doc = new DOMParser().parseFromString(rawHtml, "text/html");
  const candidates = [...doc.querySelectorAll('[data-top="yes"]')];
  const matched =
    candidates.find(section => section.id === targetId) || candidates[0];
  return matched ? matched.innerHTML : rawHtml;
}

/**
 * @param {HTMLElement} el
 * @param {string} data
 * @param {object} options
 * @param {boolean} options.replace
 */
function fillWithText(el, data, { replace }) {
  const { includeFormat } = el.dataset;
  let fill = data;
  if (includeFormat === "markdown") {
    fill = markdownToHtml(fill);
  } else if (includeFormat === "first-section") {
    fill = extractFirstSection(fill, el.id);
  }

  if (includeFormat === "text") {
    el.textContent = fill;
  } else {
    el.innerHTML = fill;
  }

  if (includeFormat === "markdown") {
    restructure(el);
  }

  if (replace) {
    el.replaceWith(...el.childNodes);
  }
}

/**
 * @param {string} rawData
 * @param {string} id
 * @param {string} url
 */
function processResponse(rawData, id, url) {
  /** @type {HTMLElement} */
  const el = document.querySelector(`[data-include-id=${id}]`);
  const data = runTransforms(rawData, el.dataset.oninclude, url);
  const replace = typeof el.dataset.includeReplace === "string";
  fillWithText(el, data, { replace });
  // If still in the dom tree, clean up
  if (!replace) {
    removeIncludeAttributes(el);
  }
}
/**
 * Removes attributes after they are used for inclusion, if present.
 *
 * @param {Element} el The element to clean up.
 */
function removeIncludeAttributes(el) {
  [
    "data-include",
    "data-include-format",
    "data-include-replace",
    "data-include-id",
    "oninclude",
  ].forEach(attr => el.removeAttribute(attr));
}

export async function run() {
  await runIncludes(document, 1, document.baseURI);
}

/**
 * A nested `data-include` (one found inside a file that was itself pulled in
 * by an earlier include) commonly points to a sibling file with a bare
 * relative path, e.g. `sect-logical-sub-block.html` written inside
 * `Chapter-4/Chapter-4.html`. `fetch()` resolves relative URLs against the
 * page's own URL, not against whichever included file happened to contain
 * the reference, so without tracking a per-level base URL those nested
 * fetches resolve to the wrong path and silently 404. `baseURL` is threaded
 * through the recursion so each level resolves against the file that
 * actually contained its `data-include` attribute.
 * @param {HTMLElement | Document} root
 * @param {number} currentDepth
 * @param {string} baseURL
 */
async function runIncludes(root, currentDepth, baseURL) {
  /** @type {NodeListOf<HTMLElement>} */
  const includables = root.querySelectorAll("[data-include]");
  const promisesToInclude = Array.from(includables).map(async el => {
    const url = el.dataset.include;
    if (!url) {
      return; // just skip it
    }
    const resolvedURL = new URL(url, baseURL).href;
    const id = `include-${String(Math.random()).slice(2)}`;
    el.dataset.includeId = id;
    try {
      const response = await fetch(resolvedURL);
      const text = await response.text();
      processResponse(text, id, resolvedURL);
      if (currentDepth < 5) {
        // For performance reasons, only allow limited nesting. (The PCI-SIG
        // chapter-splitting convention needs up to 4 levels of `data-include`
        // to reach its deepest subsections, so this leaves a little headroom
        // beyond that.)
        await runIncludes(el, currentDepth + 1, resolvedURL);
      }
    } catch (err) {
      const msg = `\`data-include\` failed: \`${url}\` (${err.message}).`;
      showError(msg, name, { elements: [el], cause: err });
    }
  });
  await Promise.all(promisesToInclude);
}
