// @ts-check
// Module core/table
// Handles tables in the document.
// This is to enable the generation of a Table of Tables wherever there is a #tot element
// to be found as well as normalise the titles of tables.

import {
  addId,
  getIntlData,
  renameElement,
  // showInlineWarning,
  wrapInner,
} from "./utils.js";
import { html } from "./import-maps.js";

export const name = "core/tables";

const localizationStrings = {
  en: {
    list_of_tables: "List of Tables",
    tbl: "Table ",
  },
};

const l10n = getIntlData(localizationStrings);

export function run() {
  const tot = collectTables();

  // Create a Table of Tables if a section with id 'tot' exists.
  const totElement = document.getElementById("tot");
  if (tot.length && totElement) {
    decorateTableOfTables(totElement);
    totElement.append(
      html`<h2>${l10n.list_of_tables}</h2>`,
      html`
        <ul class="tot">
          ${tot}
        </ul>
      `
    );
  }
}

/**
 * process all tables
 */
function collectTables() {
  /** @type {HTMLElement[]} */
  const tot = [];
  document.querySelectorAll("table").forEach((tbl, i) => {
    const caption = tbl.querySelector("caption");

    if (caption) {
      decorateTable(tbl, caption, i);
      tot.push(getTableOfTablesListItem(tbl.id, caption));
      // } else {
      //   showInlineWarning(tbl, "Found a `<table>` without a `<caption>`");
    }
  });
  return tot;
}

/**
 * @param {HTMLElement} table
 * @param {HTMLElement} caption
 * @param {number} i
 */
function decorateTable(table, caption, i) {
  const title = caption.textContent;
  addId(table, "tbl", title);
  // set proper caption title
  wrapInner(caption, html`<span class="tbl-title"></span>`);
  caption.prepend(
    html`<span class="tblhdr">${l10n.tbl}</span>`,
    html`<bdi class="tblno">${i + 1}</bdi>`,
    " "
  );
}

/**
 * @param {string} tableId
 * @param {HTMLElement} caption
 * @return {HTMLElement}
 */
function getTableOfTablesListItem(tableId, caption) {
  const totCaption = caption.cloneNode(true);
  totCaption.querySelectorAll("a").forEach(anchor => {
    renameElement(anchor, "span").removeAttribute("href");
  });
  totCaption.querySelectorAll("dfn").forEach(dfn => {
    renameElement(dfn, "span");
  });
  totCaption.querySelectorAll("[id]").forEach(anchor => {
    anchor.removeAttribute("id");
  });
  totCaption
    .querySelectorAll(
      "span.footnote, span.issue, span.respec-error, span.noToc"
    )
    .forEach(anchor => {
      // footnotes, issues, errors, and text explicitly marked noToC are not in a ToC
      anchor.remove();
    });
  return html`
    <li class="totline">
      <a class="tocxref" href="${`#${tableId}`}">${totCaption.childNodes}</a>
    </li>
  `;
}

/**
 * if it has a parent section, don't touch it
 * if it has a class of appendix or introductory, don't touch it
 * if all the preceding section siblings are introductory, make it introductory
 * if there is a preceding section sibling which is an appendix, make it appendix
 * @param {Element} totElement
 */
function decorateTableOfTables(totElement) {
  if (
    totElement.classList.contains("appendix") ||
    totElement.classList.contains("introductory") ||
    totElement.closest("section")
  ) {
    return;
  }

  const previousSections = getPreviousSections(totElement);
  if (previousSections.every(sec => sec.classList.contains("introductory"))) {
    totElement.classList.add("introductory");
  } else if (previousSections.some(sec => sec.classList.contains("appendix"))) {
    totElement.classList.add("appendix");
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
