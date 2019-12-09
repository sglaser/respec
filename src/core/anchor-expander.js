// @ts-check
// expands empty anchors based on their context
import { makeSafeCopy, norm, showInlineError } from "./utils.js";

export const name = "core/anchor-expander";

let sectionRefsByNumber = false;

export function run(conf) {
  if (conf.hasOwnProperty("sectionRefsByNumber")) {
    sectionRefsByNumber = conf.sectionRefsByNumber;
  }
  /** @type {NodeListOf<HTMLElement>} */
  const anchorElements = document.querySelectorAll(
    "a[href^='#']:not(.self-link):not([href$='the-empty-string'])"
  );
  const anchors = [...anchorElements].filter(a => a.textContent.trim() === "");
  for (const a of anchors) {
    const id = a.getAttribute("href").slice(1);
    const matchingElement = document.getElementById(id);
    if (!matchingElement) {
      a.textContent = a.getAttribute("href");
      const msg = `Couldn't expand inline reference. The id "${id}" is not in the document.`;
      showInlineError(a, msg, `No matching id in document: ${id}.`);
      continue;
    }
    switch (matchingElement.localName) {
      case "h6":
      case "h5":
      case "h4":
      case "h3":
      case "h2": {
        processHeading(matchingElement, a);
        break;
      }
      case "section":
      case "nav": {
        // find first heading in the section
        processSection(matchingElement, id, a);
        break;
      }
      case "figure": {
        processFigure(matchingElement, id, a);
        break;
      }
      case "table": {
        processTable(matchingElement, id, a);
        break;
      }
      case "aside":
      case "div": {
        processBox(matchingElement, id, a);
        break;
      }
      default: {
        a.textContent = a.getAttribute("href");
        const msg = "ReSpec doesn't support expanding this kind of reference.";
        showInlineError(a, msg, `Can't expand "#${id}".`);
      }
    }
    localize(matchingElement, a);
    a.normalize();
  }
}

function processBox(matchingElement, id, a) {
  const selfLink = matchingElement.querySelector(".marker .self-link");
  if (!selfLink) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching element "${id}", but it has no title or marker.`;
    showInlineError(a, msg, "Missing title.");
    return;
  }
  const copy = makeSafeCopy(selfLink);
  a.append(...copy.childNodes);
  a.classList.add("box-ref");
}

function processFigure(matchingElement, id, a) {
  const figcaption = matchingElement.querySelector("figcaption");
  const figEqn =
    !matchingElement.classList ||
    (!matchingElement.classList.contains("equation") ? "fig" : "eqn");
  if (!figcaption) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching figure "${id}", but figure is lacking a \`<figcaption>\`.`;
    showInlineError(a, msg, "Missing figcaption in referenced figure.");
    return;
  }
  const hadSelfLink = figcaption.querySelector(".self-link");
  // remove the figure's title
  const children = [...makeSafeCopy(figcaption).childNodes].filter(
    node =>
      !node.classList ||
      !(
        node.classList.contains(`${figEqn}-title`) ||
        node.classList.contains("self-link")
      )
  );
  // drop an empty space at the end.
  children.pop();
  a.append(...children);
  if (hadSelfLink) a.prepend("§\u00A0");
  a.classList.add(`${figEqn}-ref`);
  const figTitle = figcaption.querySelector(`.${figEqn}-title`);
  if (!a.hasAttribute("title") && figTitle) {
    a.title = norm(figTitle.textContent);
  }
}

function processTable(matchingElement, id, a) {
  const caption = matchingElement.querySelector("caption");
  if (!caption) {
    a.textContent = a.getAttribute("href");
    const msg = `Found matching table "${id}", but table is lacking a \`<caption>\`.`;
    showInlineError(a, msg, "Missing caption in referenced table.");
    return;
  }
  const hadSelfLink = caption.querySelector(".self-link");
  // remove the table's title
  const children = [...makeSafeCopy(caption).childNodes].filter(
    node =>
      !node.classList ||
      !(
        node.classList.contains("tbl-title") ||
        node.classList.contains("self-link")
      )
  );
  // drop an empty space at the end.
  children.pop();
  a.append(...children);
  if (hadSelfLink) a.prepend("§\u00A0");
  a.classList.add("tbl-ref");
  const tblTitle = caption.querySelector(".tbl-title");
  if (!a.hasAttribute("title") && tblTitle) {
    a.title = norm(tblTitle.textContent);
  }
}

function processSection(matchingElement, id, a) {
  const heading = matchingElement.querySelector("h6, h5, h4, h3, h2");
  if (!heading) {
    a.textContent = a.getAttribute("href");
    const msg =
      "Found matching section, but the section was lacking a heading element.";
    showInlineError(a, msg, `No matching id in document: "${id}".`);
    return;
  }
  processHeading(heading, a);
  localize(heading, a);
}

function processHeading(heading, a) {
  const hadSelfLink = heading.querySelector(".self-link");
  let children = [...makeSafeCopy(heading).childNodes].filter(
    node => !node.classList || !node.classList.contains("self-link")
  );
  if (sectionRefsByNumber) {
    children = children.filter(
      node => !node.classList || !node.classList.contains("sect-title")
    );
    children.forEach(
      node => node instanceof HTMLElement && node.removeAttribute("hidden")
    );
  }
  a.append(...children);
  if (hadSelfLink) a.prepend("§\u00A0");
  a.classList.add("sec-ref");
}

function localize(matchingElement, newElement) {
  for (const attrName of ["dir", "lang"]) {
    // Already set on element, don't override.
    if (newElement.hasAttribute(attrName)) continue;

    // Closest in tree setting the attribute
    const matchingClosest = matchingElement.closest(`[${attrName}]`);
    if (!matchingClosest) continue;

    // Closest to reference setting the attribute
    const newClosest = newElement.closest(`[${attrName}]`);

    // It's the same, so already inherited from closest (probably HTML element or body).
    if (
      newClosest &&
      newClosest.getAttribute(attrName) ===
        matchingClosest.getAttribute(attrName)
    )
      continue;
    // Otherwise, set it.
    newElement.setAttribute(attrName, matchingClosest.getAttribute(attrName));
  }
}
