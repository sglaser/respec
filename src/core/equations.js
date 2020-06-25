// @ts-check
// Module core/equation
// Handles equations in the document.
// Adds width and height to images, if they are missing.
// Generates a Table of Equations wherever there is a #tof element.

import {
  addId,
  getIntlData,
  renameElement,
  showInlineWarning,
  wrapInner,
} from "./utils.js";
import { html } from "./import-maps.js";

export const name = "core/equations";

const localizationStrings = {
  en: {
    list_of_equations: "List of Equations",
    eqn: "Equation ",
  },
};

const l10n = getIntlData(localizationStrings);

export function run() {
  normalizeImages(document);

  const toe = collectEquations();

  // Create a Table of Equations if a section with id 'toe' exists.
  const toeElement = document.getElementById("toe");
  if (toe.length && toeElement) {
    decorateTableOfEquations(toeElement);
    toeElement.append(
      html`
        <h2>${l10n.list_of_equations}</h2>
      `,
      html`
        <ul class="toe">
          ${toe}
        </ul>
      `
    );
  }
}

/**
 * process all equations
 */
function collectEquations() {
  /** @type {HTMLElement[]} */
  const toe = [];
  document.querySelectorAll("figure.equation").forEach((eqn, i) => {
    const caption = eqn.querySelector("figcaption");

    if (caption) {
      decorateEquation(eqn, caption, i);
      toe.push(getTableOfEquationsListItem(eqn.id, caption));
    } else {
      // @ts-ignore
      showInlineWarning(eqn, "Found a `<figure>` without a `<figcaption>`");
    }
  });
  return toe;
}

/**
 * @param {Element} equation
 * @param {HTMLElement} caption
 * @param {number} i
 */
function decorateEquation(equation, caption, i) {
  const title = caption.textContent;
  addId(equation, "eqn", title);
  // set proper caption title
  wrapInner(
    caption,
    html`
      <span class="eqn-title"></span>
    `
  );
  caption.prepend(
    html`
      <span class="eqnhdr">${l10n.eqn}</span>
    `,
    html`
      <bdi class="eqnno">${i + 1}</bdi>
    `,
    " "
  );
}

/**
 * @param {string} equationId
 * @param {HTMLElement} caption
 * @return {HTMLElement}
 */
function getTableOfEquationsListItem(equationId, caption) {
  const toeCaption = caption.cloneNode(true);
  toeCaption.querySelectorAll("a").forEach(anchor => {
    renameElement(anchor, "span").removeAttribute("href");
  });
  toeCaption.querySelectorAll("dfn").forEach(dfn => {
    renameElement(dfn, "span");
  });
  toeCaption.querySelectorAll("[id]").forEach(anchor => {
    anchor.removeAttribute("id");
  });
  toeCaption
    .querySelectorAll(
      "span.footnote, span.issue, span.respec-error, span.noToc"
    )
    .forEach(anchor => {
      // footnotes, issues, errors, and text explicitly marked noToC are not in a ToC
      anchor.remove();
    });
  return html`
    <li class="toeline">
      <a class="tocxref" href="${`#${equationId}`}">${toeCaption.childNodes}</a>
    </li>
  `;
}

function normalizeImages(doc) {
  doc
    .querySelectorAll(
      ":not(picture)>img:not([width]):not([height]):not([srcset])"
    )
    .forEach(img => {
      if (img.naturalHeight === 0 || img.naturalWidth === 0) return;
      img.height = img.naturalHeight;
      img.width = img.naturalWidth;
    });
}

/**
 * if it has a parent section, don't touch it
 * if it has a class of appendix or introductory, don't touch it
 * if all the preceding section siblings are introductory, make it introductory
 * if there is a preceding section sibling which is an appendix, make it appendix
 * @param {Element} toeElement
 */
function decorateTableOfEquations(toeElement) {
  if (
    toeElement.classList.contains("appendix") ||
    toeElement.classList.contains("introductory") ||
    toeElement.closest("section")
  ) {
    return;
  }

  const previousSections = getPreviousSections(toeElement);
  if (previousSections.every(sec => sec.classList.contains("introductory"))) {
    toeElement.classList.add("introductory");
  } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
    toeElement.classList.add("appendix");
  }
}

/**
 * @param {Element} element
 */
function getPreviousSections(element) {
  /** @type {Element[]} */
  const sections = [];
  for (const previous of iteratePreviousElements(element)) {
    if (previous.localName === "section") {
      sections.push(previous);
    }
  }
  return sections;
}

/**
 * @param {Element} element
 */
function* iteratePreviousElements(element) {
  let previous = element;
  while (previous.previousElementSibling) {
    previous = previous.previousElementSibling;
    yield previous;
  }
}
