// @ts-check
// Module pcisig/regpict
// Handles register pictures in the document. This encompasses two primary operations. One is
// extracting register information from a variety of table styles. The other is inventing an
// svg diagram that represents the fields in the table.

import { addId, showInlineError } from "../core/utils.js";
// import { SVG } from "../../js/deps/builds/svg.esm.js";
import { fetchAsset } from "../core/text-loader.js";
import { hyperHTML } from "../core/import-maps.js";
// import { parse_table } from "./draw-csrs.js";
import { pub } from "../core/pubsubhub.js";
// import css from "text!../../src/pcisig/css/regpict.css";

export const name = "pcisig/regpict";

const cssPromise = loadStyle();

async function loadStyle() {
  try {
    return (await import("text!../../assets/examples.css")).default;
  } catch {
    return fetchAsset("examples.css");
  }
}

/**
 * Merges two JSON objects together.
 * Src object properties override existing target properties.
 * @param {Object} target starting object (modified)
 * @param {object} src merging object
 * @returns {Object} modified target
 */
function mergeJSON(target, src) {
  const json = typeof src !== "string" ? src : JSON.parse(src);
  console.log(`

before: mergeJSON.target=${JSON.stringify(target, null, 2)}`);
  console.log(`before: mergeJSON.src=${JSON.stringify(src, null, 2)}`);
  console.log(`before: mergeJSON.json=${JSON.stringify(json, null, 2)}`);
  for (const prop in json) {
    if (json.hasOwnProperty(prop)) {
      if (target.hasOwnProperty(prop)) {
        mergeJSON(target[prop], json[prop]);
      } else if (Array.isArray(json[prop])) {
        target[prop] = [...json[prop]];
      } else {
        target[prop] = Object.assign(json[prop]);
      }

      // if the value is a nested object, recursively copy all it's properties
      if (typeof json[prop] === "object" && !!json[prop]) {
        if (target.hasOwnProperty(prop))
          target[prop] = [prop] = mergeJSON(target[prop], json[prop]);
      } else {
        target[prop] = json[prop];
      }
    }
  }
  console.log(`after: mergeJSON.target=${JSON.stringify(target, null, 2)}

  `);
  return target;
}

/**
 * Merges an HTMLElement containing JSON into an existing JSON object.
 * HTMLElement properties override existing properties.
 * @param {Object} result starting object (modified)
 * @param {HTMLElement} me element with json content to merge in
 */
function mergeElementJSON(result, me) {
  if (me && me instanceof HTMLElement) {
    if (me.hasAttribute("data-parents")) {
      me.getAttribute("data-parents")
        .split(/\s+/)
        .forEach(parent => {
          const temp = document.querySelector(`#${parent}`);
          console.log(`merging: #${parent}`);
          if (temp) {
            console.log(`mergeElementJSON: recursive call to merge #${parent}`);
            mergeElementJSON(result, temp);
          }
        });
    }
    console.log(`mergeElementJSON: adding "${me.textContent}"`);
    try {
      mergeJSON(result, me.textContent);
      me.classList.add("hidden");
    } catch {
      showInlineError(me, "Invalid JSON in element", "");
    }
    console.log(`result=${JSON.stringify(result, null, 2)}`);
  }
}

/**
 * choose-defaults
 * Returns new JSON that's a copy of the input but fills in default values.
 *
 * @param   {Object} inputJSON
 * @return  {Object}
 * @access  public
 */
function choose_defaults(inputJSON) {
  /**
   * pget(string, object)
   * Returns the value of a inputJSON property, substituting a default
   * if the property is not present or is null.
   *
   * @param  {String} prop  Property Name
   * @param  {Object} def   Default Value
   * @return {Object} Value
   * @access  public
   */
  function pget(prop, def) {
    return inputJSON !== null &&
      inputJSON.hasOwnProperty(prop) &&
      inputJSON[prop] !== null
      ? inputJSON[prop]
      : def;
  }

  /**
   * pget_String(string, string)
   * Returns the string value of a inputJSON property, substituting a default if the property is not present or is null.
   *
   * @param  {String} prop Property Name
   * @param  {Object} def Default Value (convertible to String if not already one)
   * @return {String}
   * @access  public
   */
  function pget_String(prop, def) {
    return String(pget(prop, def));
  }

  /**
   * pget_Number(string, string)
   * Returns the numeric value of a inputJSON property, substituting a default if the property is not present or is null.
   *
   * @param   {String} prop string  Property Name
   * @param   {Object} def  object  Default Value (convertible to Number if not already one)
   * @return  {Number}
   * @access  public
   */
  function pget_Number(prop, def) {
    return Number(pget(prop, def));
  }

  /**
   * pget_Boolean(string, string)
   * Returns the boolean value of a inputJSON property, substituting a default if the property is not present or is null.
   *
   * @param   {String} prop string  Property Name
   * @param   {Object} def  object  Default Value (convertible to Number if not already one)
   * @return  {Boolean}
   * @access  public
   */
  function pget_Boolean(prop, def) {
    return Boolean(pget(prop, def));
  }

  const json = {
    preClass: pget_String("preClass", "hide"),
    width: pget_Number("width", 32),
    wordWidth: pget_Number("wordWidth", 32),
    debug: pget_Boolean("debug", false),
    defaultUnused: pget_String("defaultUnused", "RsvdP"),
    defaultAttr: pget_String("defaultAttr", "other"),
    cellWidth: pget_Number("cellWidth", 16),
    cellHeight: pget_Number("cellHeight", 32),
    cellInternalHeight: pget_Number("cellInternalHeight", 8),
    bracketHeight: pget_Number("bracketHeight", 4),
    cellTop: pget_Number("cellTop", 40),
    bitWidthPos: pget_Number("bitWidthPos", 20),
    figName: pget_String("figName", "???"),
    maxFigWidth: pget_Number("maxFigWidth", 624), // 6.5 inches (assuming 96 px per inch)
    visibleLSB: pget_Number("visibleLSB", 0),
    isRegister: pget_Boolean("isRegister", true), // default
    isMessage: pget_Boolean("isMessage", false),
    isMemoryBlock: pget_Boolean("isMemoryBlock", false),
  };
  json.visibleMSB = pget_Number("visibleMSB", json.width);

  // isMessage, isMemoryBlock, and isRegister are mutually exclusive.
  // 1. isMessage has highest priority
  // 2. isMemoryBlock has middle priority
  // 3. isRegister has lowest priority and is the default
  if (json.isMessage) {
    json.isRegister = false;
    json.isMemoryBlock = false;
  } else if (json.isMemoryBlock) {
    json.isRegister = false;
    json.isMessage = false;
  } else {
    json.isRegister = true;
    json.isMemoryBlock = false;
    json.isMessage = false;
  }

  if (json.isRegister) {
    json.rowLabelTop = pget_Number("rowLabelTop", 20); // top of text for regLabel
    json.cellValueTop = pget_Number("cellValueTop", 20); // top of text for regFieldValueInternal
    json.cellBitValueTop = pget_Number("cellBitValueTop", 20); // top of text for regFieldBitValue
    json.cellNameTop = pget_Number("cellNameTop", 16); // top of text for regFieldNameInternal
  } else {
    json.rowLabelTop = pget_Number("rowLabelTop", 20); // top of text for regLabel
    json.cellValueTop = pget_Number("cellValueTop", 28); // top of text for regFieldValueInternal
    json.cellBitValueTop = pget_Number("cellBitValueTop", 28); // top of text for regFieldBitValue
    json.cellNameTop = pget_Number("cellNameTop", 14); // top of text for regFieldNameInternal
  }

  json.left_to_right = pget_Boolean("leftToRight", json.isMessage);
  json.forceFit = pget_Boolean(
    "forceFit",
    json.isMessage || json.isMemoryBlock
  );
  json.figLeft = pget_Number("figLeft", json.left_to_right ? 96 : 40);

  json.fields = pget("fields", {}); // default to empty register

  if (json.visibleMSB < 0) {
    json.visibleMSB = 0;
  }
  if (json.visibleMSB > json.width) {
    json.visibleMSB = json.width;
  }
  if (json.visibleLSB < 0) {
    json.visibleLSB = 0;
  }
  if (json.visibleLSB > json.width) {
    json.visibleLSB = json.width;
  }

  console.log(
    `choose_defaults: width=${json.width} defaultUnused=${json.defaultUnused} cellWidth=${json.cellWidth} cellHeight=${json.cellHeight} cellInternalHeight=${json.cellInternalHeight} cellTop=${json.cellTop} bracketHeight=${json.bracketHeight}`
  );
  console.log(`choose_defaults: fields=${JSON.stringify(json, null, 2)}`);

  // copy fields element over and sanitize it
  for (const old_item in inputJSON.fields) {
    const item = { ...old_item };
    if (item.hasOwnProperty("msbit") || item.hasOwnProperty("msbyte")) {
      let byte = 0;
      let bit = 0;
      if (item.hasOwnProperty("msbit")) {
        byte = Math.floor(item.msbit / 8);
        bit = item.msbit % 8;
      }
      if (item.hasOwnProperty("msbyte")) {
        byte = byte + item.msbyte;
      }
      item.msb = byte * 8 + (json.isMessage ? 7 - bit : bit);
    }
    if (item.hasOwnProperty("lsbit") || item.hasOwnProperty("lsbyte")) {
      let byte = 0;
      let bit = 0;
      if (item.hasOwnProperty("lsbit")) {
        byte = Math.floor(item.lsbit / 8);
        bit = item.lsbit % 8;
      }
      if (item.hasOwnProperty("lsbyte")) {
        byte = byte + item.lsbyte;
      }
      item.lsb = byte * 8 + (json.isMessage ? 7 - bit : bit);
    }
    if (item.hasOwnProperty("msb") && !item.hasOwnProperty("lsb")) {
      item.lsb = item.msb;
    }
    if (item.hasOwnProperty("lsb") && !item.hasOwnProperty("msb")) {
      item.msb = item.lsb;
    }
    if (item.msb < item.lsb) {
      const temp = item.lsb;
      item.lsb = item.msb;
      item.msb = temp;
    }
    if (!item.hasOwnProperty("lsbyte") || !item.hasOwnProperty("lsbit")) {
      item.lsbyte = Math.floor(item.lsb / 8);
      item.lsbit = item.lsb % 8;
    }
    if (!item.hasOwnProperty("msbyte") || !item.hasOwnProperty("msbit")) {
      item.msbyte = Math.floor(item.msb / 8);
      item.msbit = item.msb % 8;
    }
    if (!item.hasOwnProperty("isUnused")) {
      item.isUnused = false;
    }
    if (!item.hasOwnProperty("attr")) {
      item.attr = json.defaultAttr;
    }
    if (!item.hasOwnProperty("name")) {
      item.name = json.json;
    }
    if (!item.hasOwnProperty("value")) {
      item.value = "";
    }
    json.fields.push(item);
    console.log(
      `choose_defaults: field: msb=${item.msb} lsb=${item.lsb} attr=${item.attr} isUnused=${item.isUnused} name="${item.name}" index=${item.index}`
    );
  }
  return json;
}

/**
 * draw_regpict
 * Creates an SVG drawing for the register descriped by inputJSoN in the
 * otherwise empty HTMLElement divsvg.
 *
 * @param   {HTMLElement} divsvg
 * @param   {Object}      inputJSON
 * @return  {Object}      JSON used to draw the register
 * @access  public
 */
export function draw_regpict(divsvg, inputJSON) {
  const reg = choose_defaults(inputJSON);
  const width = reg.width;
  // console.log(`width=${reg.width}`);
  const wordWidth = reg.wordWidth;
  const left_to_right = reg.left_to_right;
  const forceFit = reg.forceFit;
  const debug = reg.debug;
  const preClass = reg.preClass;
  const defaultUnused = reg.defaultUnused;
  // const defaultAttr = reg.defaultAttr;
  const cellWidth = reg.cellWidth;
  const cellHeight = reg.cellHeight;
  const cellInternalHeight = reg.cellInternalHeight;
  const rowLabelTop = reg.rowLabelTop;
  const cellValueTop = reg.cellValueTop;
  const cellBitValueTop = reg.cellBitValueTop;
  const cellNameTop = reg.cellNameTop;
  const bracketHeight = reg.bracketHeight;
  const cellTop = reg.cellTop;
  const bitWidthPos = reg.bitWidthPos;
  const figName = reg.figName;
  const maxFigWidth = reg.maxFigWidth;
  const figLeft = reg.figLeft;
  const visibleLSB = reg.visibleLSB;
  const visibleMSB = reg.visibleMSB;
  const fields = reg.fields;
  const isRegister = reg.isRegister;
  const isMessage = reg.isMessage;
  const isMemoryBlock = reg.isMemoryBlock;
  const isMultiRow = isMessage || isMemoryBlock;

  const bitarray = []; // Array indexed by bit # in register range 0:width
  // field[bitarray[N]] contains bit N
  // bitarray[N] == null for unused bits
  // bitarray[N] == 1000 for first bit outside register width

  let item;
  let j;
  bitarray[width] = 1000; // ???
  for (item = 0; item < width; item++) {
    bitarray[item] = null;
  }

  for (const item in fields) {
    if (fields.hasOwnProperty(item)) {
      for (item = fields[item].lsb; item <= fields[item].msb; item++) {
        bitarray[item] = item;
      }
    }
  }

  let lsb = -1; // if >= 0, contains bit# of lsb of a string of unused bits
  for (item = 0; item <= width; ++item) {
    // note: includes bitarray[width]
    if (lsb >= 0 && bitarray[item] !== null) {
      // first "used" bit after stretch of unused bits, invent an "unused" field
      let unused_item = `_unused_${item - 1}`; // _unused_msb
      if (lsb !== item - 1) {
        unused_item = `${unused_item}_${lsb}`; // _unused_msb_lsb
      }
      fields[unused_item] = {
        msb: item - 1,
        lsb,
        // "name": ((i - lsb) * 2 - 1) >= defaultUnused.length ? defaultUnused : defaultUnused[0].toUpperCase(), // use full name if if fits, else use 1st char
        name: defaultUnused,
        attr: defaultUnused.toLowerCase(), // attribute is name
        isUnused: true,
        value: "",
      };
      for (j = lsb; j < item; j++) {
        bitarray[j] = unused_item;
      }
      lsb = -1;
    }
    if (lsb < 0 && bitarray[item] === null) {
      // starting a string of unused bits
      lsb = item;
    }
  }

  function max(a, b) {
    return a > b ? a : b;
  }

  function min(a, b) {
    return a < b ? a : b;
  }

  // x position of left edge of bit i
  function leftOf(i) {
    let adj_bit = i;
    if (i >= 0) {
      if (i > visibleMSB) {
        adj_bit = visibleMSB;
      }
      if (i < visibleLSB) {
        adj_bit = visibleLSB;
      }
      if (left_to_right) {
        adj_bit = adj_bit - visibleLSB;
      } else {
        adj_bit = visibleMSB - adj_bit;
      }
      if (isMultiRow) {
        adj_bit = adj_bit % wordWidth; // modulo
        adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
      }
    } else {
      // negative bit #, always to the right
      if (isMultiRow) {
        adj_bit = wordWidth - i - 0.5;
      } else {
        adj_bit = visibleMSB - visibleLSB - i - 0.5;
      }
    }
    const ret = figLeft + cellWidth * (adj_bit - 0.5);
    if (debug) {
      console.log(
        `${`${i} leftOf   left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit= ${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret= ${ret}`
      );
    }
    return ret;
  }

  // x position of right edge of bit i
  function rightOf(i) {
    let adj_bit = i;
    if (i >= 0) {
      if (i > visibleMSB) {
        adj_bit = visibleMSB;
      }
      if (i < visibleLSB) {
        adj_bit = visibleLSB;
      }
      if (left_to_right) {
        adj_bit = adj_bit - visibleLSB;
      } else {
        adj_bit = visibleMSB - adj_bit;
      }
      if (isMultiRow) {
        adj_bit = adj_bit % wordWidth; // modulo
        adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
      }
    } else {
      // negative bit #, always to the right
      if (isMultiRow) {
        adj_bit = wordWidth - i - 0.5;
      } else {
        adj_bit = visibleMSB - visibleLSB - i - 0.5;
      }
    }
    const ret = figLeft + cellWidth * (adj_bit + 0.5);
    if (debug) {
      console.log(
        `${`${i} rightOf  left_to_right= ${left_to_right} ` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret=${ret}`
      );
    }
    return ret;
  }

  // x position of middle of bit i
  function middleOf(i) {
    let adj_bit = i;
    if (i >= 0) {
      if (i > visibleMSB) {
        adj_bit = visibleMSB;
      }
      if (i < visibleLSB) {
        adj_bit = visibleLSB;
      }
      if (left_to_right) {
        adj_bit = adj_bit - visibleLSB;
      } else {
        adj_bit = visibleMSB - adj_bit;
      }
      if (isMultiRow) {
        adj_bit = adj_bit % wordWidth; // modulo
        adj_bit = !left_to_right && adj_bit === 0 ? wordWidth : adj_bit;
      }
    } else {
      // negative bit #, always to the right
      if (isMultiRow) {
        adj_bit = wordWidth - i - 0.5;
      } else {
        adj_bit = visibleMSB - visibleLSB - i - 0.5;
      }
    }
    const ret = figLeft + cellWidth * adj_bit;
    if (debug) {
      console.log(
        `${`${i} middleOf left_to_right=${left_to_right}` +
          ` figLeft=${figLeft}` +
          ` cellWidth=${cellWidth}` +
          ` visibleLSB=${visibleLSB}` +
          ` visibleMSB=${visibleMSB}` +
          ` adj_bit=${adj_bit}`}${
          isMultiRow ? ` wordWidth=${wordWidth}` : ""
        }\t--> ret=${ret}`
      );
    }
    return ret;
  }

  function rowOf(i) {
    return isMultiRow && i >= 0 ? Math.floor(i / wordWidth) : 0;
  }

  if (debug) {
    console.log(JSON.stringify(reg, null, " "));
    console.log(` forceFit=${forceFit} left_to_right=${left_to_right}`);
  }
  divsvg.insertAdjacentHTML(
    "beforebegin",
    `<pre class="${preClass}">
 ${JSON.stringify(reg, null, " ")}
 </pre>`
  );
  if (false) {
    let g;
    let p;
    let text;
    let nextBitLine = cellTop + cellHeight + 20; // 76;
    let bitLineCount = 0;
    let max_text_width = 12 * 8; // allow for 12 characters at 8px each

    if (isMemoryBlock) {
      // create header for memory block (31..0)
      let pos;
      const text_height = 18; // Assume 18px: 1 row of text, 15px high
      g = svg.group();
      for (let b = 0; b < wordWidth; b++) {
        g.text(b)
          .x(middleOf(b))
          .y(cellTop - 4)
          .addClass("regBitNumMiddle");
        if (debug) {
          console.log(
            `bitnum-middle ${b} at x=${middleOf(b)} y=%{cellTop - 4}`
          );
        }
        pos = left_to_right ? leftOf(b) : rightOf(b);
        g.line(
          pos,
          cellTop,
          pos,
          cellTop - text_height * (b % 8 === 0 ? 1.0 : 0.75)
        ).addClass("regBitNumLine");
      }
      pos = left_to_right ? rightOf(wordWidth - 1) : leftOf(wordWidth - 1);
      g.line(pos, cellTop, pos, cellTop - text_height).addClass(
        "regBitNumLine"
      );
      g.text("Byte Offset")
        .x(rightOf(-1.5) - 6)
        .y(cellTop - 4)
        .addClass("regRowTagRight")
        .addClass("rowTagByteOffset");
    } else if (isMessage) {
      // create header for message (+0/+1/+2/+3 then 4 of 7..0)
      let pos;
      const text_height = 18; // Assume 18px: 1 row of text, 15px high
      g = svg.group();
      for (let byte = 0; byte < wordWidth; byte += 8) {
        for (let bit = 0; bit < 8; bit++) {
          g.text(String(7 - bit))
            .x(middleOf(byte + bit))
            .y(cellTop - 4)
            .addClass("regBitNumMiddle");
          if (debug) {
            console.log(
              `bitnum-middle +${byte}/${bit} at x=${middleOf(
                bit + byte
              )} y=${cellTop - 4}`
            );
          }
          pos = left_to_right ? leftOf(byte + bit) : rightOf(byte + bit);
          g.line(
            pos,
            cellTop,
            pos,
            cellTop - text_height * (bit === 0 ? 1.75 : 0.75)
          ).addClass("regBitNumLine");
        }

        const byteHeight = cellTop - 4 - text_height;
        g.text(`+${byte / 8}`)
          .x(leftOf(byte) + cellWidth * 4)
          .y(byteHeight)
          .addClass("regByteNumMiddle");
        if (debug) {
          console.log(
            `bitnum-middle +${byte} at x=${leftOf(byte) +
              cellWidth * 4} y= ${byteHeight}`
          );
        }
      }
      pos = left_to_right ? rightOf(wordWidth - 1) : leftOf(wordWidth - 1);
      g.line(pos, cellTop, pos, cellTop - text_height * 1.75).addClass(
        "regBitNumLine"
      );
    }

    for (let b2 = 0; b2 < width; b2++) {
      const b = left_to_right ? width - b2 - 1 : b2;
      for (const f in fields) {
        const gAddClass = ["regFieldInternal", `regAttr_${f.attr}`, "regLink"];

        if (b === f.lsb) {
          g = svg.group();
          if (isRegister) {
            // create header for register (msb and lsb of each field)
            // let bitnum_width;
            if (f.lsb === f.msb) {
              g.text(String(f.lsb))
                .x(middleOf(f.lsb))
                .y(cellTop - 4)
                .addClass("regBitNumMiddle");
              if (debug) {
                console.log(
                  `bitnum-middle ${f.lsb} at x=${middleOf(f.lsb)} y=${cellTop -
                    4}`
                );
              }
            } else {
              let pos;
              let cls;
              let str;
              if (f.lsb < visibleLSB) {
                if (left_to_right) {
                  gAddClass.push("regFieldOverflowMSB");
                  str = `${f.lsb} ... ${visibleLSB}`;
                  pos = rightOf(f.lsb) - 2;
                  cls = "regBitNumEnd";
                } else {
                  gAddClass.push("regFieldOverflowLSB");
                  str = `${visibleLSB} ... ${f.lsb}`;
                  pos = leftOf(f.lsb) + 2;
                  cls = "regBitNumStart";
                }
              } else {
                str = f.lsb;
                if (left_to_right) {
                  pos = leftOf(f.lsb) + 2;
                  cls = "regBitNumStart";
                } else {
                  pos = rightOf(f.lsb) - 2;
                  cls = "regBitNumEnd";
                }
              }
              g.text(str)
                .x(pos)
                .y(cellTop - 4)
                .addClass(cls);
              if (debug) {
                console.log(
                  `bitnum-lsb ${f.lsb} at x=${pos} y=${cellTop -
                    4} left_to_right=${left_to_right}`
                );
              }

              if (f.msb > visibleMSB) {
                if (left_to_right) {
                  gAddClass.push("regFieldOverflowLSB");
                  str = `${visibleMSB} ... ${f.msb}`;
                  pos = leftOf(f.msb) + 2;
                  cls = "regBitNumStart";
                } else {
                  gAddClass.push("regFieldOverflowMSB");
                  str = `${f.msb} ... ${visibleMSB}`;
                  pos = rightOf(f.msb) - 2;
                  cls = "regBitNumEnd";
                }
              } else {
                str = f.msb;
                if (left_to_right) {
                  pos = rightOf(f.msb) - 2;
                  cls = "regBitNumEnd";
                } else {
                  pos = leftOf(f.msb) + 2;
                  cls = "regBitNumStart";
                }
              }
              g.text(str)
                .x(pos)
                .y(cellTop - 4)
                .addClass(cls);
              if (debug) {
                console.log(
                  `bitnum-msb ${f.msb} at x=${pos} y=${cellTop -
                    4} left_to_right=${left_to_right}`
                );
              }
            }
            if (f.lsb >= visibleLSB) {
              const pos = left_to_right ? leftOf(f.lsb) : rightOf(f.lsb);
              const text_height = 18; // Assume 18px: 1 row of text, 15px high
              g.line(pos, cellTop, pos, cellTop - text_height * 0.75).addClass(
                f.lsb === visibleLSB ? "regBitNumLine" : "regBitNumLine_Hide"
              );
            }
            if (f.msb <= visibleMSB) {
              const pos = left_to_right ? rightOf(f.msb) : leftOf(f.msb);
              const text_height = 18; // Assume 18px: 1 row of text, 15px high
              g.line(pos, cellTop, pos, cellTop - text_height * 0.75).addClass(
                "regBitNumLine"
              );
            }
          }
          if (f.hasOwnProperty("addClass") && typeof f.addClass === "string") {
            f.addClass.split(/\s+/).forEach(cls => gAddClass.push(cls));
          }
          if (f.isUnused) {
            gAddClass.push("regFieldUnused");
          }

          const startRow = rowOf(f.lsb);
          const endRow = rowOf(f.msb);

          if (isMultiRow && startRow !== endRow) {
            let leftCol1;
            let rightCol1;
            let leftCol2;
            let rightCol2;
            let rightEdge;
            let leftEdge;
            if (left_to_right) {
              // if (isMessage)
              leftCol1 = leftOf(f.lsb);
              rightCol2 = rightOf(f.msb);

              leftCol2 = leftOf(0);
              rightCol1 = rightOf(wordWidth - 1);

              leftEdge = leftOf(0);
              rightEdge = rightOf(wordWidth - 1);
            } else {
              // if (isMemoryBlock)
              leftCol1 = leftOf(wordWidth - 1);
              rightCol2 = rightOf(0);

              leftCol2 = leftOf(f.msb);
              rightCol1 = rightOf(f.lsb);

              leftEdge = leftOf(wordWidth - 1);
              rightEdge = rightOf(0);
            }
            if (debug) {
              console.log(
                `+++ field="${f.name}" leftCol1=${leftCol1} leftCol2=${leftCol2} leftEdge=${leftEdge} rightCol1=${rightCol1} rightCol2=${rightCol2} rightEdge=${rightEdge} startRow=${startRow} endRow=${endRow}`
              );
            }
            const p = g.path();
            p.move(leftCol1, cellTop + cellHeight * startRow);
            if (rightCol1 !== leftCol1) {
              p.line(rightCol1 - leftCol1, 0, true);
            }
            p.line(0, cellHeight, true); // move down 1 row
            if (startRow + 1 !== endRow) {
              if (rightEdge !== rightCol1) {
                p.line(rightEdge - rightCol1, 0, true);
              }
              p.line(0, cellHeight * (endRow - startRow - 1), true);
              if (rightCol2 !== rightEdge) {
                p.line(rightCol2 - rightEdge, 0, true);
              }
            } else {
              if (rightCol2 !== rightCol1) {
                p.line(rightCol2 - rightCol1, 0, true);
              }
            }
            p.line(0, cellHeight, true);
            p.line(leftCol2 - rightCol2, 0, true);
            p.line(0, -cellHeight, true);
            if (startRow + 1 !== endRow) {
              if (leftEdge !== leftCol2) {
                p.line(leftEdge - leftCol2, 0, true);
              }
              p.line(0, -cellHeight * (endRow - startRow - 1), true);
              if (leftCol1 !== leftEdge) {
                p.line(leftCol1 - leftEdge, 0, true);
              }
            } else {
              if (leftCol1 !== leftCol2) {
                p.line(leftCol1 - leftCol2, 0, true);
              }
            }
            p.line(0, -cellHeight, true); // move back to start col
            p.close();
            p.addClass("regFieldBox");
            g.rect(
              leftCol1,
              cellTop + cellHeight * startRow,
              rightCol1 - leftCol1,
              cellHeight
            )
              .addClass("regFieldBox")
              .addClass("hide");
            g.rect(
              leftCol2,
              cellTop + cellHeight * endRow,
              rightCol2 - leftCol2,
              cellHeight
            )
              .addClass("regFieldBox")
              .addClass("hide");
            for (j = 1; j <= f.msb % wordWidth; j++) {
              const pos = left_to_right ? leftOf(j) : rightOf(j);
              g.line(
                pos,
                cellTop + cellHeight - cellInternalHeight + cellHeight * endRow,
                pos,
                cellTop + cellHeight + cellHeight * endRow
              ).addClass("regFieldBox");
            }
          } else {
            const leftCol = left_to_right ? leftOf(f.lsb) : leftOf(f.msb);
            const rightCol = left_to_right ? rightOf(f.msb) : rightOf(f.lsb);
            g.rect(
              leftCol,
              cellTop + cellHeight * startRow,
              rightCol - leftCol,
              cellHeight
            ).addClass("regFieldBox");
            for (j = f.lsb + 1; j <= f.msb; j++) {
              if (j >= visibleLSB && j <= visibleMSB) {
                const pos = left_to_right ? leftOf(j) : rightOf(j);
                g.line(
                  pos,
                  cellTop +
                    cellHeight -
                    cellInternalHeight +
                    cellHeight * startRow,
                  pos,
                  cellTop + cellHeight + cellHeight * startRow
                ).addClass("regFieldBox");
              }
            }
          }

          if (isRegister) {
            g.text(f.msb === f.lsb ? "1 bit" : `${f.msb - f.lsb + 1} bits`)
              .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
              .y(cellTop - bitWidthPos)
              .addClass("regBitWidth");
          }
          g.text(f.name)
            .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
            .y(
              cellTop +
                cellNameTop +
                cellHeight * (startRow + (endRow - startRow) / 2)
            )
            .addClass("regFieldName");
          if (!f.isUnused && f.lsb <= visibleMSB && f.msb >= visibleLSB) {
            const temp_dom = document.createElement("span");
            divsvg.prepend(temp_dom);
            const unique_id = temp_dom.makeID(
              "regpict",
              f.id ? f.id : `${figName}-${f.name}`
            );
            temp_dom.remove();
            g.attr({ id: unique_id });
          }
          let hasValue = false;
          if ("value" in f) {
            if (
              Array.isArray(f.value) &&
              f.value.length === f.msb - f.lsb + 1
            ) {
              hasValue = true;
              for (item = 0; item < f.value.length; ++item) {
                const temp = g
                  .text(f.value[item])
                  .x((leftOf(f.lsb + item) + rightOf(f.lsb + item)) / 2)
                  .y(cellTop + cellBitValueTop + cellHeight * startRow)
                  .addClass("regFieldValue")
                  .addClass("regFieldBitValue")
                  .addClass(`regFieldBitValue-${item.toString()}`);
                if (item === f.value.length - 1) {
                  temp.classList.add("regFieldBitValue-msb");
                }
              }
            } else if (
              typeof f.value === "string" ||
              f.value instanceof String
            ) {
              if (f.value.length > 0) {
                hasValue = true;
                g.text(f.value)
                  .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
                  .y(
                    cellTop +
                      (f.msb === f.lsb ? cellBitValueTop : cellValueTop) +
                      cellHeight * startRow
                  )
                  .addClass("regFieldValue");
              }
            } else {
              g.text("INVALID VALUE")
                .x((leftOf(f.msb) + rightOf(f.lsb)) / 2)
                .y(cellTop + cellValueTop + cellHeight * startRow)
                .addClass("svg_error");
            }
          }
          let text_width = 0; // text.clientWidth;
          if (text_width === 0) {
            // bogus fix to guess width when clientWidth is 0 (e.g. IE10)
            text_width = f.name.length * 8; // Assume 8px per character on average for 15px height chars
          }
          let text_height = text.clientHeight; // TODO
          if (text_height === 0) {
            // bogus fix to guess width when clientHeight is 0 (e.g. IE10)
            text_height = 18; // Assume 18px: 1 row of text, 15px high
          }
          const boxLeft = leftOf(
            left_to_right ? max(visibleLSB, f.lsb) : min(visibleMSB, f.msb)
          );
          const boxRight = rightOf(
            left_to_right ? min(visibleMSB, f.msb) : max(visibleLSB, f.lsb)
          );
          const boxTop = cellTop + cellHeight * startRow;
          if (debug) {
            console.log(
              `${`field ${f.name}` +
                ` msb=${f.msb}` +
                ` lsb=${f.lsb}` +
                ` attr=${f.attr}` +
                ` isUnused=${f.isUnused}`}${"id" in f ? f.id : ""}${
                hasValue ? " hasValue" : ""
              }`
            );
            console.log(
              ` text.clientWidth=${text.clientWidth}` +
                ` text_width=${text_width}` +
                ` text.clientHeight=${text.clientHeight}` +
                ` text_height=${text_height}` +
                ` boxLeft=${boxLeft}` +
                ` boxRight=${boxRight}` +
                ` boxWidth=${boxRight - boxLeft}` +
                ` boxTop=${boxTop}`
            );
          }
          /* if field has a specified value,
            the field name is too wide for the box,
            or the field name is too tall for the box */
          if (f.lsb > visibleMSB || f.msb < visibleLSB) {
            gAddClass[0] = "regFieldHidden";
          } else {
            if (
              !(forceFit || f.forceFit) &&
              (hasValue ||
                text_width + 2 > boxRight - boxLeft ||
                text_height + 2 > cellHeight - cellInternalHeight)
            ) {
              if (text_width > max_text_width) {
                max_text_width = text_width;
              }
              text
                .x(rightOf(-0.5))
                .y(nextBitLine)
                .addClass("regFieldName");
              p = g.path();
              p.move(boxLeft, cellTop + cellHeight * (startRow + 1));
              p.line((boxRight - boxLeft) / 2, bracketHeight, true);
              p.line(boxRight, cellTop + cellHeight * (startRow + 1));
              p.addClass("regBitBracket");
              p.fill("none");
              p = g.path();
              p.move(
                boxLeft + (boxRight - boxLeft) / 2,
                cellTop + cellHeight * (startRow + 1) + bracketHeight
              );
              p.vert(nextBitLine - text_height / 4);
              p.horiz(rightOf(-0.4));
              p.addClass("regBitLine");
              p.fill("none");
              gAddClass[0] = "regFieldExternal";
              gAddClass.push(`regFieldExternal${bitLineCount < 2 ? "0" : "1"}`);
              nextBitLine += text_height + 2;
              bitLineCount = (bitLineCount + 1) % 4;
            }
          }
          if (f.msb > visibleLSB && f.lsb < visibleLSB) {
            if (left_to_right) {
              g.text("...")
                .x(leftOf(0) - 2)
                .y(cellTop + cellNameTop + cellHeight * startRow)
                .addClass("regFieldExtendsLeft");
            } else {
              g.text("...")
                .x(rightOf(0) + 2)
                .y(cellTop + cellNameTop + cellHeight * startRow)
                .addClass("regFieldExtendsRight");
            }
          }
          if (f.msb > visibleMSB && f.lsb < visibleMSB) {
            if (left_to_right) {
              g.text("...")
                .x(rightOf(f.msb) + 2)
                .y(cellTop + cellNameTop + cellHeight * startRow)
                .addClass("regFieldExtendsRight");
            } else {
              g.text("...")
                .x(leftOf(f.msb) - 2)
                .y(cellTop + cellNameTop + cellHeight * startRow)
                .addClass("regFieldExtendsLeft");
            }
          }
          gAddClass.forEach(cls => g.addClass(cls));
        }
      }
    }

    if (isMultiRow) {
      const g2 = svg.group();
      for (let i = 0; i < width; i += wordWidth) {
        const rowLabel = isMemoryBlock
          ? `+${Math.floor(i / 8)
              .toString(16)
              .padStart(3, "0")
              .toUpperCase()}h`
          : `Byte ${i / 8} → `;
        g2.text(rowLabel)
          .x(left_to_right ? leftOf(0) - 8 : rightOf(-1.5) + 2)
          .y(cellTop + rowLabelTop + cellHeight * (i / wordWidth))
          .addClass(left_to_right ? "regRowTagLeft" : "regRowTagRight");
      }
    }

    let scale = 1.0;
    max_text_width = max_text_width + rightOf(-1);
    if (isRegister && maxFigWidth > 0 && max_text_width > maxFigWidth) {
      scale = maxFigWidth / max_text_width;
    }
    const svgClass = [
      isMessage ? "isMessage" : isMemoryBlock ? "isMemoryBlock" : "isRegister",
      left_to_right ? "isLeftToRight" : "isRightToLeft",
    ];
    svg.configure({
      height: `${Math.ceil(
        scale * Math.ceil(nextBitLine + cellHeight * rowOf(width - 1))
      )}`,
      width: `${Math.ceil(scale * max_text_width)}`,
      viewBox: `0 0 ${max_text_width} ${Math.ceil(
        nextBitLine + cellHeight * rowOf(width - 1)
      )}`,
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      class_: svgClass.join(" "),
    });
  }
  return reg;
}

/**
 * Copy indicated attribute from src Element to dest property if present.
 * @param {HTMLElement} dest starting object
 * @param {Object} src merging object
 * @param {String} attribute name
 * @param {String} property
 */
function copyAttribute(dest, src, attribute, property) {
  if (src.hasAttribute(attribute)) dest[property] = src.getAttribute(attribute);
}

export async function run(conf) {
  pub("start", "core/regpict");
  if (!conf.noRegpictCSS) {
    const css = await cssPromise;
    document.head.insertBefore(
      hyperHTML`<style>
${css}
</style>`,
      document.querySelector("link")
    );
  }

  document
    .querySelectorAll("figure.register, figure.message, figure.capability")
    .forEach(fig => {
      // let isRegister = $fig.classList.contains("register");
      let isMessage = fig.classList.contains("message");
      let isCapability = fig.classList.contains("capability");
      let isMemoryBlock = fig.classList.contains("memoryBlock");
      // isMessage, isMemoryBlock, and isRegister are mutually exclusive.
      // 1. isMessage has highest priority
      // 2. isMemoryBlock and isCapability have middle priority, isCapability implies isMemoryBlock
      // 3. isRegister has lowest priority and is the default
      if (isMessage) {
        // isRegister = false;
        isMemoryBlock = false;
        isCapability = false;
      } else if (isMemoryBlock || isCapability) {
        // isRegister = false;
        isMessage = false;
        isMemoryBlock = true; // implied by isCapability
      } else {
        // isRegister = true;
        isMessage = false;
        isMemoryBlock = false;
        isCapability = false;
      }
      let json = { fields: {} };
      let figNum = 0;
      if (fig.getAttribute("id")) {
        json.figName = fig.getAttribute("id").replace(/^fig-/, "");
      } else {
        json.figName =
          fig.getAttribute("title") ||
          fig.querySelector("figcaption").textContent ||
          `unnamed-${++figNum}`;
      }
      addId(fig, "fig", json.figName);
      console.log(
        `core/regpict figure.register id="${fig.getAttribute("id")}"`
      );

      if (!fig.hasAttribute("data-json")) {
        try {
          mergeJSON(json, fig.getAttribute("data-json"));
        } catch {
          showInlineError(fig, "Invalid data-json attribute", "");
        }
      }

      copyAttribute(json, fig, "data-width", "width");
      copyAttribute(json, fig, "data-wordWidth", "wordWidth");
      copyAttribute(json, fig, "data-unused", "defaultUnused");
      // copyAttribute(json, fig, "data-href", "href");
      copyAttribute(json, fig, "data-table", "table");
      // copyAttribute(json, fig, "data-register", "register");

      fig.querySelectorAll("pre.json,div.json,span.json").forEach(pre => {
        console.log(
          `before merging <pre> ${JSON.stringify(json, null, 2)} ${
            pre.outerHTML
          }`
        );
        try {
          json = mergeElementJSON(json, pre);
          pre.classList.add("hidden");
        } catch {
          showInlineError(
            pre,
            "Invalid JSON in pre.json, div.json, or span.json"
          );
        }
        console.log(`after merging <pre> ${JSON.stringify(json, null, 2)}`);
      });

      // if (json.hasOwnProperty("table")) {
      //   const tbl = document.querySelector(json.table, document);
      //   json = mergeJSON(parse_table(tbl), json);
      // }

      // invent a div to hold the svg
      const cap = fig.querySelector("figcaption");
      function create_divsvg() {
        if (cap) {
          console.log("inserting div.svg before <figcaption>");
          cap.insertAdjacentHTML("beforebegin", `<div class="svg"></div>`);
        } else {
          console.log("inserting div.svg at end of <figure>");
          fig.insertAdjacentHTML("beforeend", `<div class="svg"></div>`);
        }
        return fig.querySelector("div.svg:last-of-type");
      }

      const render = fig.querySelectorAll("pre.render,div.render,span.render");
      if (render.length > 0) {
        render.forEach(node => {
          const temp = mergeElementJSON(mergeJSON({}, json), node);
          const divsvg = create_divsvg();
          draw_regpict(divsvg, temp);
        });
      } else {
        if (json !== null) {
          draw_regpict(create_divsvg(), json);
        }
      }
      console.log(
        `core/regpict figure.register id="${fig.getAttribute("id")}"`
      );
    });
}
