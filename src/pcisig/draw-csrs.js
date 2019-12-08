// @ts-check
// Module pcisig/draw-csrs
// Create <figure> for csr registers by extracting information from <table class="register"> elements.

import { addId, makeSafeCopy, showInlineError } from "../core/utils.js";
import { decorateDfn } from "../core/dfn-finder.js";
import { hyperHTML } from "../core/import-maps.js";

export const name = "pcisig/draw-csrs";

/**
 * insert_unused_table_rows inserts "reserved" rows into a tables for
 * unused register bits.
 * @param  {HTMLElement} tbl   table to insert into (modified)
 * @param  {Object}      json  parsed JSON describing register
 * @access  public
 */
export function insert_unused_table_rows(tbl, json) {
  let last_lsb = json.width;
  const field_slot = [];
  const tbody = tbl.querySelector("tbody:first-of-type");
  if (tbody !== null) {
    // console.log("non-empty tbody");
    const rows = tbody.childNodes;
    if (rows.length > 0) {
      // console.log(`rows.length=${rows.length}`);
      // console.log(`json=${JSON.stringify(json, null, 2)}`);
      // console.log(`Object.keys(json.fields).length=${Object.keys(json.fields).length}`);
      if (json.fields.length > 0) {
        json.fields.forEach(item => {
          // console.log(`field_slot[${item.msb}]=${JSON.stringify(item, null, 2)}`);
          field_slot[item.msb] = item;
        });
        for (let msb = json.width; msb >= 0; msb--) {
          const item = field_slot[msb];
          if (item !== undefined) {
            // console.log(`msb=${msb} item.index=${item.index} last_lsb=${last_lsb}`);
            if (msb < last_lsb - 1) {
              const bit_location =
                last_lsb - 1 === msb
                  ? `${msb + 1}`
                  : `${last_lsb - 1}:${msb + 1}`;
              const new_row = hyperHTML`<tr><td>${bit_location}</td><td>${json.defaultUnused}</td><td>${json.defaultUnused}</td></tr>`;
              tbody.appendChild(new_row);
              // console.log(`rows[${item.index}].after(${new_row})`);
            }
            last_lsb = item.lsb;
          }
        }
      }
      if (last_lsb > 0) {
        const bit_location = last_lsb - 1 === 1 ? "0" : `${last_lsb - 1}:0`;
        const new_row = hyperHTML`<tr><td>${bit_location}</td><td>${json.defaultUnused}</td><td>${json.defaultUnused}</td></tr>`;
        tbody.appendChild(new_row);
        // console.log(`tbody.appendChild(${new_row}`);
        // console.log(`tbody=${tbody.innerHTML}`);
      }
    } else {
      const bit_location = last_lsb - 1 === 1 ? "0" : `${last_lsb - 1}:0`;
      const new_row = hyperHTML`<tr><td>${bit_location}</td><td>${json.defaultUnused}</td><td>${json.defaultUnused}</td></tr>`;
      tbody.appendChild(new_row);
      // console.log(`tbody.appendChild(${new_row})`);
    }
  }
}

/**
 * parse_table
 * @param   {HTMLElement} tbl  (modified)
 * @returns {Object}
 * @access   public
 */
export function parse_table(tbl) {
  const json = { fields: [] };
  // console.log(`pcisig_reg: ${tbl.outerHTML} tbody="${tbl.querySelector("tbody:first-of-type").outerHTML}"`);
  if (tbl.hasAttribute("id")) {
    json.figName = tbl.getAttribute("id").replace(/^tbl-/, "");
  } else if (tbl.hasAttribute("title")) {
    json.figName = tbl.getAttribute("title");
  } else if (tbl.querySelector("caption")) {
    json.figName = tbl.querySelector("caption").textContent;
  } else {
    json.figName = "";
  }
  json.figName = json.figName
    .toLowerCase()
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/[^\-.0-9a-z_]+/gi, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/\.$/, ".x")
    .replace(/^([^a-z])/i, "x$1")
    .replace(/^$/, "generatedID");

  if (tbl.hasAttribute("data-json")) {
    try {
      mergeJSON(json, tbl.getAttribute("data-json"));
    } catch {
      showInlineError(tbl, "Invalid data-json attribute on <table>", "");
    }
  }

  if (!tbl.hasAttribute("id")) {
    tbl.setAttribute("id", `tbl-${json.figName}`);
  }
  // console.log(`core/draw-csrs table id="${tbl.getAttribute("id")}"`);
  if (!tbl.hasAttribute("dfn-data-for")) {
    tbl.setAttribute("data-dfn-for", json.figName);
  }

  if (tbl.hasAttribute("data-width"))
    json.width = tbl.getAttribute("data-width");
  if (tbl.hasAttribute("data-unused")) {
    json.defaultUnused = tbl.getAttribute("data-unused");
  } else if (!json.hasOwnProperty("data-unused")) {
    json.defaultUnused = "RsvdP";
  }
  if (tbl.hasAttribute("data-href")) json.href = tbl.getAttribute("data-href");
  if (tbl.hasAttribute("data-register"))
    json.register = tbl.getAttribute("data-register");

  const tblName = makeSafeCopy(tbl.querySelector("caption")).textContent.trim();

  tbl
    .querySelectorAll(":scope > tbody:first-of-type > tr, :scope > tr")
    .forEach(tr => {
      const td = tr.children;
      if (td.length >= 3) {
        const bits = td[0].textContent.trim();
        const desc = td[1];
        let attr = td[2].textContent.toLowerCase().trim();
        let lsb = -1;
        let msb = -1;
        const match = /^\s*(\d+)\s*(:\s*(\d+))?\s*$/.exec(bits);
        if (match) {
          msb = lsb = Number(match[1]);
          if (typeof match[3] === "string" && match[3] !== "") {
            lsb = Number(match[3]);
          }
          if (lsb > msb) {
            msb = lsb;
            lsb = Number(match[1]);
          }
        }
        let fieldName;
        let dfn = desc.querySelector("dfn:first-of-type");
        if (!dfn) {
          fieldName = /^\s*([-_\w]+)/.exec(desc.textContent);
          if (fieldName) {
            fieldName = fieldName[1]; // first word of text content (1st paren in regexp)
          } else {
            fieldName = `Field_${
              lsb !== msb ? `${msb}_${lsb}` : `${lsb}`
            }_${desc.textContent.trim().replace(/\s+/g, "_")}`;
          }
          desc.insertAdjacentHTML("afterbegin", `<dfn>${fieldName}</dfn>`);
          dfn = desc.querySelector("dfn:first-of-type");
        }
        fieldName = dfn.textContent.trim();
        if (!dfn.hasAttribute("class")) dfn.classList.add("field");
        // dfn.setAttribute("data-dfn-for", lt);
        dfn.setAttribute("data-dfn-type", "field");
        addId(dfn, "field", `${tblName}-${fieldName.toLowerCase()}`);
        decorateDfn(
          dfn,
          { type: "field", generic: "field" },
          tblName,
          fieldName
        );
        // console.log(`decorateDfn(${dfn.outerHTML})`);
        const val = desc.querySelector("span.value:first-of-type");
        let value = "";
        if (val) {
          try {
            value = JSON.parse(val.textContent.trim());
          } catch (e) {
            showInlineError(
              val,
              `Invalid json in next span.value ${e.toString()}`,
              ""
            );
          }
        }
        const validAttr = /^(rw|rws|ro|ros|rw1c|rw1cs|rw1s|rw1ss|wo|wos|hardwired|fixed|hwinit|rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused|other)$/i;
        if (!validAttr.test(attr)) {
          attr = "other";
        }
        const unusedAttr = /^(rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused)$/i;
        const isUnused = !!unusedAttr.test(attr);
        // console.log(`field: ${fieldName} bits="${bits}"  match=${match}  lsb=${lsb} msb=${msb} attr=${attr} isUnused=${isUnused}`);
        json.fields.push({
          name: fieldName,
          msb,
          lsb,
          attr,
          isUnused,
          value,
        });
      }
    });
  // console.log(`json=${JSON.stringify(json, null, 2)}`);
  return json;
}

/**
 * Merges two JSON objects together.
 * Src object properties override existing target properties.
 * @param {Object} target starting object (modified)
 * @param {Object} src merging object
 * @returns {Object} modified target
 */
function mergeJSON(target, src) {
  const json = typeof src !== "string" ? src : JSON.parse(src);
  for (const prop in json) {
    if (src.hasOwnProperty(prop)) {
      // if the value is a nested object, recursively copy all it's properties
      if (typeof src[prop] === "object" && !!src[prop]) {
        target[prop] = mergeJSON(target, src[prop]);
      } else {
        target[prop] = src[prop];
      }
    }
  }
  return target;
}

/**
 * Locate all table.register elements and insert a figure before them with JSON
 * representing the table.
 * @returns {Promise<void>}
 */
export async function run() {
  document
    .querySelectorAll("figure.regipct-generated")
    .forEach(item => item.remove());
  document.querySelectorAll("table.register").forEach(tbl => {
    const json = parse_table(tbl);
    // console.log(
    //   `draw-csrs.table.register json = ${JSON.stringify(json, null, 2)}`
    // );

    // insert a figure before this table
    tbl.insertAdjacentHTML(
      "beforebegin",
      `<figure class="regpict-generated register"
                id="fig-${tbl.getAttribute("id").replace(/^#tbl-/, "")}">
                <pre class="json">
                ${JSON.stringify(json, null, 2)}
                </pre>
                <figcaption>
                  ${tbl.querySelector("caption").textContent}
                </figcaption>
              </figure>`
    );
    insert_unused_table_rows(tbl, json);
  });
}
