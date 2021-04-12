// @ts-check
// fixes mathml <mfenched>

export const name = "core/mathml-polyfill";

// @ts-check
/* -*- Mode: Java; tab-width: 4; indent-tabs-mode:nil; c-basic-offset: 4 -*- */
/* vim: set ts=4 et sw=4 tw=80: */

export const MATHML_NS = "http://www.w3.org/1998/Math/MathML";

/*
    A really basic implementation, this will be a module.
 */
const _MathTransforms = {
  _plugins: new Map(),
  _css: "",
  _createStyleSheet: str => {
    if (str.length !== _MathTransforms.cssKey) {
      // always true the first time because _MathTransforms.cssKey is undefined
      _MathTransforms.cssKey = str.length;
      const style = document.createElement("style");
      style.textContent = str;
      document.head.appendChild(style);
      _MathTransforms.styleSheet = style; // cached stylesheet
      document.head.removeChild(style);
    }
    return _MathTransforms.styleSheet;
  },

  getCSSStyleSheet: () => {
    const foo = _MathTransforms
      ._createStyleSheet(_MathTransforms._css)
      .cloneNode(true);
    return foo;
  },

  transform: root => {
    for (const selector of _MathTransforms._plugins.keys()) {
      const transformer = _MathTransforms._plugins.get(selector);

      // find the matching elements..
      // this is problematic since you could add some
      const matches = Array.from(root.querySelectorAll(selector));

      // Since these are in tree-order, if we process them in reverse order (child first)
      // we should side-step the gnarliest of potential nesting issues
      matches.reverse().forEach(el => {
        const transformed = transformer(el);
        if (transformed && transformed !== el) {
          el.parentElement.replaceChild(transformed, el);
        }
      });
    }
  },

  add: (selector, cb, css = "") => {
    _MathTransforms._plugins.set(selector, cb);
    _MathTransforms._css += css;
  },
};

/**
 * Same as cloneNode(true) except that shadow roots are copied
 * If you are using the transforms and you need to clone a node that potentially has a shadowRoot, use this so the shadowRoot is copied
 * As of November, 2020, Elementary Math and Linebreaking transforms are the only transforms that have shadowRoots.
 * @param {Element} el
 * @param {Element} [clone]
 * @returns {Element} -- the clone (only useful if function is called with one arg)
 */
function cloneElementWithShadowRoot(el, clone) {
  if (clone === undefined) {
    clone = el.cloneNode(true);
  }

  // rather than clone each element and then the children, we're assuming cloning the whole tree is most efficient
  // however, we still need to search 'el' to check for a shadowRoot.
  if (el.shadowRoot) {
    clone.attachShadow({ mode: "open" });
    for (let i = 0; i < el.shadowRoot.childElementCount; i++) {
      clone.shadowRoot.appendChild(
        cloneElementWithShadowRoot(el.shadowRoot.children[i])
      );
    }
  }

  for (let i = 0; i < el.childElementCount; i++) {
    cloneElementWithShadowRoot(el.children[i], clone.children[i]);
  }

  return clone;
}

/**
 * Converts a CSS length unit to pixels and returns that as a number
 * @param{Element} element
 * @param {string} length
 * @returns {number}
 */
/* export function convertToPx(element, length) {
  // quick check to see if we have common case of 'px'
  if (/px/.test(length)) {
    return parseFloat(length);
  }

  // add a temp element with desired length; set it as the width; record the width, then delete the temp element.
  // In Safari (Aug 2020), unknown elements in MathML are thrown out, so adding a 'div' results in 0 width. For some reason, 'img' is ok.
  const img = document.createElement("img"); // create temporary element
  const leafWrapper = document.createElementNS(MATHML_NS, "mtext"); // mtext is integration point for HTML
  leafWrapper.appendChild(img);
  leafWrapper.style.overflow = "hidden";
  leafWrapper.style.visibility = "hidden";
  img.style.width = length;
  element.appendChild(leafWrapper);
  const result = leafWrapper.getBoundingClientRect().width;
  leafWrapper.remove();

  return result;
}
*/

/* -*- Mode: Java; tab-width: 4; indent-tabs-mode:nil; c-basic-offset: 4 -*- */
/* vim: set ts=4 et sw=4 tw=80: */
/*
  Copyright (c) 2016-2019 Igalia S.L.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

const namespaceURI = "http://www.w3.org/1998/Math/MathML";

function collapseWhiteSpace(text) {
  // Collapse the whitespace as specified by the MathML specification.
  // https://mathml-refresh.github.io/mathml/chapter2.html#fund.collapse
  return text.replace(/^[\s]+|[\s]+$/g, "").replace(/[\s]+/g, " ");
}

function newOperator(text, separator) {
  // Create <mo fence="true">text</mo> or <mo separator="true">text</mo>.
  const operator = document.createElementNS(namespaceURI, "mo");
  operator.appendChild(document.createTextNode(text));
  operator.setAttribute(separator ? "separator" : "fence", "true");
  return operator;
}

function newMrow() {
  // Create an empty <mrow>.
  return document.createElementNS(namespaceURI, "mrow");
}

function getSeparatorList(text) {
  // Split the separators attribute into a list of characters.
  // We ignore whitespace and handle surrogate pairs.
  if (text === null) {
    return [","];
  }
  const separatorList = [];
  for (let i = 0; i < text.length; i++) {
    if (!/\s/g.test(text.charAt(i))) {
      const c = text.charCodeAt(i);
      if (c >= 0xd800 && c < 0xdc00 && i + 1 < text.length) {
        separatorList.push(text.substr(i, 2));
        i++;
      } else {
        separatorList.push(text.charAt(i));
      }
    }
  }
  return separatorList;
}

function shouldCopyAttribute(attribute) {
  // The <mfenced> and <mrow> elements have the same attributes except
  // that dir is only accepted on <mrow> and open/close/separators are
  // only accepted on <mfenced>.
  // https://mathml-refresh.github.io/mathml/appendixa.html#parsing.rnc.pres
  const excludedAttributes = ["dir", "open", "close", "separators"];
  return (
    attribute.namespaceURI || !excludedAttributes.includes(attribute.localName)
  );
}

const expandFencedElement = mfenced => {
  // Return an <mrow> element representing the expanded <mfenced>.
  // https://mathml-refresh.github.io/mathml/chapter3.html#presm.mfenced
  const outerMrow = newMrow();
  outerMrow.appendChild(
    newOperator(collapseWhiteSpace(mfenced.getAttribute("open") || "("))
  );
  if (mfenced.childElementCount === 1) {
    outerMrow.appendChild(
      cloneElementWithShadowRoot(mfenced.firstElementChild)
    );
  } else if (mfenced.childElementCount > 1) {
    const separatorList = getSeparatorList(mfenced.getAttribute("separators"));
    const innerMrow = newMrow();
    let child = mfenced.firstElementChild;
    while (child) {
      innerMrow.appendChild(cloneElementWithShadowRoot(child));
      child = child.nextElementSibling;
      if (child && separatorList.length) {
        innerMrow.appendChild(
          newOperator(
            separatorList.length > 1 ? separatorList.shift() : separatorList[0]
          )
        );
      }
    }
    outerMrow.appendChild(innerMrow);
  }
  outerMrow.appendChild(
    newOperator(collapseWhiteSpace(mfenced.getAttribute("close") || ")"))
  );
  for (let i = 0; i < mfenced.attributes.length; i++) {
    const attribute = mfenced.attributes[i];
    if (shouldCopyAttribute(attribute)) {
      outerMrow.setAttributeNS(
        attribute.namespaceURI,
        attribute.localName,
        attribute.value
      );
    }
  }
  return outerMrow;
};

export function run() {
  _MathTransforms.add("mfenced", expandFencedElement);
  _MathTransforms.transform(document);
}
