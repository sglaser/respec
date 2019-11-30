// @ts-check
// Module pcisig/regpict
// Handles register pictures in the document. This encompasses two primary operations. One is
// extracting register information from a variety of table styles. The other is inventing an
// svg diagram that represents the fields in the table.

import { SVG } from "../../js/deps/builds/svg.esm.js";
import css from "text!../../src/pcisig/css/regpict.css";
import { pub } from "../core/pubsubhub.js";

export const name = "pcisig/regpict";

function choose_defaults(reg) {
  function pget(prop, def) {
    /**
     * this.pget(string, object)
     * Returns the value of a reg property, substituting a default if the property is not present or is null.
     *
     * @param   prop string  Property Name
     * @param   def  object  Default Value
     * @return  object
     * @access  public
     */
    if (reg !== null && reg.hasOwnProperty(prop) && this[reg] !== null) {
      return reg[prop];
    }
    return def;
  }

  function pget_String(prop, def) {
    /**
     * this.pget_String(string, string)
     * Returns the string value of a reg property, substituting a default if the property is not present or is null.
     *
     * @param   prop string  Property Name
     * @param   def  object  Default Value (convertible to String if not already one)
     * @return  string
     * @access  public
     */
    return String(pget(prop, def));
  }

  function pget_Number(prop, def) {
    /**
     * this.pget_Number(string, string)
     * Returns the numeric value of a reg property, substituting a default if the property is not present or is null.
     *
     * @param   prop string  Property Name
     * @param   def  object  Default Value (convertible to Number if not already one)
     * @return  number
     * @access  public
     */
    return Number(pget(prop, def));
  }

  function pget_Boolean(prop, def) {
    /**
     * this.pget_Boolean(string, string)
     * Returns the boolean value of a reg property, substituting a default if the property is not present or is null.
     *
     * @param   prop string  Property Name
     * @param   def  object  Default Value (convertible to Number if not already one)
     * @return  boolean
     * @access  public
     */
    return Boolean(pget(prop, def));
  }

  const json = {};
  json.preClass = pget_String("preClass", "hide");
  json.width = pget_Number("width", 32);
  json.wordWidth = pget_Number("wordWidth", 32);
  json.debug = pget_Boolean("debug", false);
  json.defaultUnused = pget_String("defaultUnused", "RsvdP");
  json.defaultAttr = pget_String("defaultAttr", "other");
  json.cellWidth = pget_Number("cellWidth", 16);
  json.cellHeight = pget_Number("cellHeight", 32);
  json.cellInternalHeight = pget_Number("cellInternalHeight", 8);
  json.bracketHeight = pget_Number("bracketHeight", 4);
  json.cellTop = pget_Number("cellTop", 40);
  json.bitWidthPos = pget_Number("bitWidthPos", 20);
  json.figName = pget_String("figName", "???");
  json.maxFigWidth = pget_Number("maxFigWidth", 624); // 6.5 inches (assuming 96 px per inch)
  json.visibleLSB = pget_Number("visibleLSB", 0);
  json.visibleMSB = pget_Number("visibleMSB", json.width);

  json.isRegister = pget_Boolean("isRegister", true); // default
  json.isMessage = pget_Boolean("isMessage", false);
  json.isMemoryBlock = pget_Boolean("isMemoryBlock", false);
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

  // console.log(`choose_defaults: width=${json.width} defaultUnused=${json.defaultUnused} cellWidth=${json.cellWidth} cellHeight=${json.cellHeight} cellInternalHeight=${json.cellInternalHeight} cellTop=${json.cellTop} bracketHeight=${json.bracketHeight}`);
  // console.log(`choose_defaults: fields=${json.fields.toString()}`);

  // sanitize field array to avoid subsequent problems
  for (const index in json.fields) {
    if (json.fields.hasOwnProperty(index)) {
      const item = json.fields[index];
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
        item.name = index;
      }
      if (!item.hasOwnProperty("value")) {
        item.value = "";
      }
      if (!item.hasOwnProperty("index")) {
        item.index = -1; // no associated table row
      }
      json.fields[index] = item;
      // console.log(`choose_defaults: field: msb=${item.msb} lsb=${item.lsb} attr=${item.attr} isUnused=${item.isUnused} name="${item.name}" index=${item.index}`);
    }
  }

  return json;
}

function draw_regpict(divsvg, svg, reg) {
  const reg2 = choose_defaults(reg);
  const width = reg2.width;
  // console.log(`width=${reg2.width}`);
  const wordWidth = reg2.wordWidth;
  const left_to_right = reg2.left_to_right;
  const forceFit = reg2.forceFit;
  const debug = reg2.debug;
  const preClass = reg2.preClass;
  const defaultUnused = reg2.defaultUnused;
  // const defaultAttr = reg2.defaultAttr;
  const cellWidth = reg2.cellWidth;
  const cellHeight = reg2.cellHeight;
  const cellInternalHeight = reg2.cellInternalHeight;
  const rowLabelTop = reg2.rowLabelTop;
  const cellValueTop = reg2.cellValueTop;
  const cellBitValueTop = reg2.cellBitValueTop;
  const cellNameTop = reg2.cellNameTop;
  const bracketHeight = reg2.bracketHeight;
  const cellTop = reg2.cellTop;
  const bitWidthPos = reg2.bitWidthPos;
  const figName = reg2.figName;
  const maxFigWidth = reg2.maxFigWidth;
  const figLeft = reg2.figLeft;
  const visibleLSB = reg2.visibleLSB;
  const visibleMSB = reg2.visibleMSB;
  const fields = reg2.fields;
  const isRegister = reg2.isRegister;
  const isMessage = reg2.isMessage;
  const isMemoryBlock = reg2.isMemoryBlock;
  const isMultiRow = isMessage || isMemoryBlock;

  const bitarray = []; // Array indexed by bit # in register range 0:width
  // field[bitarray[N]] contains bit N
  // bitarray[N] == null for unused bits
  // bitarray[N] == 1000 for first bit outside register width

  let i;
  let j;
  bitarray[width] = 1000; // ???
  for (i = 0; i < width; i++) {
    bitarray[i] = null;
  }

  for (const index in fields) {
    if (fields.hasOwnProperty(index)) {
      for (i = fields[index].lsb; i <= fields[index].msb; i++) {
        bitarray[i] = index;
      }
    }
  }

  let lsb = -1; // if >= 0, contains bit# of lsb of a string of unused bits
  for (i = 0; i <= width; ++i) {
    // note: includes bitarray[width]
    if (lsb >= 0 && bitarray[i] !== null) {
      // first "used" bit after stretch of unused bits, invent an "unused" field
      let index = `_unused_${i - 1}`; // _unused_msb
      if (lsb !== i - 1) {
        index = `${index}_${lsb}`; // _unused_msb_lsb
      }
      fields[index] = {
        msb: i - 1,
        lsb,
        // "name": ((i - lsb) * 2 - 1) >= defaultUnused.length ? defaultUnused : defaultUnused[0].toUpperCase(), // use full name if if fits, else use 1st char
        name: defaultUnused,
        attr: defaultUnused.toLowerCase(), // attribute is name
        isUnused: true,
        value: "",
      };
      for (j = lsb; j < i; j++) {
        bitarray[j] = index;
      }
      lsb = -1;
    }
    if (lsb < 0 && bitarray[i] === null) {
      // starting a string of unused bits
      lsb = i;
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
    console.log(JSON.stringify(reg2, null, " "));
    console.log(` forceFit=${forceFit} left_to_right=${left_to_right}`);
  }
  $(divsvg).after(
    `${`<pre class="${preClass}">` + "\n"}${JSON.stringify(
      reg2,
      null,
      " "
    )}\n</pre>`
  );

  let g;
  let p;
  let f;
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
        console.log(`bitnum-middle ${b} at x=${middleOf(b)} y=%{cellTop - 4}`);
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
    g.line(pos, cellTop, pos, cellTop - text_height).addClass("regBitNumLine");
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
    for (i in fields) {
      if (fields.hasOwnProperty(i)) {
        f = fields[i];
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
              for (i = 0; i < f.value.length; ++i) {
                const temp = g
                  .text(f.value[i])
                  .x((leftOf(f.lsb + i) + rightOf(f.lsb + i)) / 2)
                  .y(cellTop + cellBitValueTop + cellHeight * startRow)
                  .addClass("regFieldValue")
                  .addClass("regFieldBitValue")
                  .addClass(`regFieldBitValue-${i.toString()}`);
                if (i === f.value.length - 1) {
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
  return reg2;
}

function insert_unused_table_rows(tbl, json) {
  let last_lsb = json.width;
  const field_slot = [];
  const tbody = tbl.querySelector("tbody");
  if (tbody !== null) {
    // console.log("non-empty tbody");
    const rows = tbody.childNodes;
    if (rows.length > 0) {
      // console.log(`rows.length=${rows.length}`);
      // console.log(`json=${JSON.stringify(json, null, 2)}`);
      // console.log(`Object.keys(json.fields).length=${Object.keys(json.fields).length}`);
      if (Object.keys(json.fields).length > 0) {
        Object.keys(json.fields).forEach(name => {
          const item = json.fields[name];
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
        rows[0].insertAdjacentHTML("beforebegin", new_row);
        // console.log(`rows[0].insertAdjacentHTML("beforebegin",${new_row})`);
        // console.log(`$tbody=${$tbody}`);
      }
    } else {
      const bit_location = last_lsb - 1 === 1 ? "0" : `${last_lsb - 1}:0`;
      const new_row = hyperHTML`<tr><td>${bit_location}</td><td>${json.defaultUnused}</td><td>${json.defaultUnused}</td></tr>`;
      $tbody.append(new_row);
      // console.log(`$tbody.append(${new_row})`);
    }
  }
}

function parse_table(json, tbl) {
  const parsed = { fields: {} };
  const tbody = tbl.querySelector("tbody");
  // console.log(`pcisig_reg: tbody="${$tbody.get(0).outerHTML}"`);
  tbody.children().each(function(index) {
    const td = this.children();
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
      let dfn = desc.querySelector("dfn:first");
      if (dfn.length === 0) {
        fieldName = /^\s*([-_\w]+)/.exec(desc.textContent);
        if (fieldName) {
          fieldName = fieldName[1]; // first word of text content
        } else {
          fieldName = `Bogus_${desc.textContent.trim()}`;
        }
      } else {
        dfn = dfn.first();
        fieldName = dfn.textContent().trim();
        dfn.classList.add("field");
        const lt = tbl.getAttribute("id").replace(/^tbl-/, "");
        dfn.setAttribute("data-dfn-for", lt);
        dfn.setAttribute("data-dfn-type", "field");
        dfn.last().makeID("field", `${lt}-${fieldName.toLowerCase()}`);
      }
      const val = desc.querySelector("span.value:first");
      let value = "";
      if (val.length === 1) {
        try {
          value = JSON.parse(val.textContent().trim());
        } catch (e) {
          tbl.insertAdjacentHTML(
            "beforebegin",
            `<p class="issue">Invalid data-json attribute in next span.value</p>`
          );
          val.classList.add("respec-error");
        }
      }
      const validAttr = /^(rw|rws|ro|ros|rw1c|rw1cs|rw1s|rw1ss|wo|wos|hardwired|fixed|hwinit|rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused|other)$/i;
      if (!validAttr.test(attr)) {
        attr = "other";
      }
      const unusedAttr = /^(rsvd|rsvdp|rsvdz|reserved|ignored|ign|unused)$/i;
      const isUnused = !!unusedAttr.test(attr);
      // console.log(`field: ${fieldName} bits="${bits}"  match=${match}  lsb=${lsb} msb=${msb} attr=${attr} isUnused=${isUnused}`);
      parsed.fields[fieldName] = {
        index,
        msb,
        lsb,
        attr,
        isUnused,
        value,
      };
    }
  });
  // console.log(`parsed=${JSON.stringify(parsed, null, 2)}`);
  $.extend(true, json, parsed);
  // console.log(`json=${JSON.stringify(json, null, 2)}`);
  return json;
}

export function run(conf, doc, cb) {
  pub("start", "core/regpict");
  if (!conf.noRegpictCSS) {
    $(doc)
      .find("head link")
      .first()
      .insertAdjacentHTML(
        "beforebegin",
        $(`<style id="regpict"></style>`).text(css)
      );
  }
  let figNum = 1;
  $("figure.regipct-generated", doc).remove();
  $("table.register", doc).each(function() {
    const $tbl = $(this);
    let json = {};
    if ($tbl.attr("id")) {
      json.figName = $tbl.attr("id").replace(/^tbl-/, "");
    } else if ($tbl.attr("title")) {
      json.figName = $tbl.attr("title");
    } else if ($("caption", this)) {
      json.figName = $("caption", this).text();
    } else {
      json.figName = `unnamed-${figNum}`;
      figNum++;
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
    if (!$tbl.attr("id")) {
      $tbl.attr("id", `tbl-${json.figName}`);
    }
    pub("start", `core/regpict table id="${$tbl.attr("id")}"`);
    let temp = $tbl.attr("data-json");
    if (temp !== null && temp !== undefined && temp !== "") {
      let temp2 = {};
      try {
        temp2 = JSON.parse(temp);
        $.extend(true, json, temp2);
      } catch (e) {
        $tbl.insertAdjacentHTML(
          "beforebegin",
          `<p class="issue">Invalid data-json attribute in next table</p>`
        );
        $tbl.classList.add("respec-error");
      }
    }

    temp = $tbl.attr("data-width");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.width = temp;
    }

    temp = $tbl.attr("data-unused");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.defaultUnused = temp;
    }

    temp = $tbl.attr("data-href");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.href = temp;
    }

    json.table = `#${$tbl.attr("id")}`;

    temp = $tbl.attr("data-register");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.register = temp;
    }

    json = parse_table(json, $tbl);

    // console.log(`regpict.table.register json = ${JSON.stringify(json, null, 2)}`);

    // insert a figure before this table
    $tbl.insertAdjacentHTML(
      "beforebegin",
      `<figure id="fig-${json.table.replace(
        /^#tbl-/,
        ""
      )}" class="regpict-generated"><div class="svg"></div><figcaption>${$(
        "caption",
        $tbl
      ).text()}</figcaption></figure>`
    );
    const $divsvg = $("div.svg", $tbl.prev()).last();
    $divsvg.last().svg(function(svg) {
      json = draw_regpict(this, svg, json);
    });
    $tbl.insertAdjacentHTML(
      "beforebegin",
      `<pre style="display: none;">${JSON.stringify(json, null, 2)}</pre>`
    );
    insert_unused_table_rows($tbl, json);
    pub("end", `core/regpict table id="${$tbl.attr("id")}"`);
  });

  $("figure.register, figure.message, figure.capability", doc).each(function() {
    const $fig = $(this);
    // let isRegister = $fig.hasClass("register");
    let isMessage = $fig.hasClass("message");
    let isCapability = $fig.hasClass("capability");
    let isMemoryBlock = $fig.hasClass("memoryBlock");
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
    let $tbl = undefined;
    let json = {};
    if ($fig.attr("id")) {
      json.figName = $fig.attr("id").replace(/^fig-/, "");
    } else if ($fig.attr("title")) {
      json.figName = $fig.attr("title");
    } else if ($("figcaption", this)) {
      json.figName = $("figcaption", this).text();
    } else {
      json.figName = `unnamed-${figNum}`;
      figNum++;
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
    if (!$fig.attr("id")) {
      $fig.attr("id", `fig-${json.figName}`);
    }
    pub("start", `core/regpict figure.register id="${$fig.attr("id")}"`);

    let temp = $fig.attr("data-json");
    if (temp !== null && temp !== undefined && temp !== "") {
      let temp2 = {};
      try {
        temp2 = JSON.parse(temp);
        $.extend(true, json, temp2);
      } catch (e) {
        $fig.insertAdjacentHTML(
          "beforebegin",
          `<p class="issue">Invalid data-json attribute in next figure.register</p>`
        );
        $fig.classList.add("respec-error");
      }
    }

    temp = $fig.attr("data-width");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.width = temp;
    }

    temp = $fig.attr("data-wordWidth");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.wordWidth = temp;
    }

    temp = $fig.attr("data-unused");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.defaultUnused = temp;
    }

    temp = $fig.attr("data-href");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.href = temp;
    }

    temp = $fig.attr("data-table");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.table = temp;
    }

    temp = $fig.attr("data-register");
    if (temp !== null && temp !== undefined && temp !== "") {
      json.register = temp;
    }

    $("pre.json,div.json,span.json", $fig).each(function() {
      let temp2 = {};
      try {
        temp2 = JSON.parse(this.textContent);
        $.extend(true, json, temp2);
        $(this).hide();
      } catch (e) {
        $fig.insertAdjacentHTML(
          "beforebegin",
          `<p class="issue">Invalid JSON in pre.json, div.json, or span.json</p>`
        );
        $(this).classList.add("respec-error");
      }
    });

    if ($fig.hasClass("pcisig_reg") && json.hasOwnProperty("table")) {
      $tbl = $(json.table, doc);
      json = parse_table(json, $tbl);
    }

    // invent a div to hold the svg, if necessary
    let $divsvg = $("div.svg", this).last();
    if ($divsvg.length === 0) {
      const $cap = $("figcaption", this);
      if ($cap.length > 0) {
        // console.log("inserting div.svg before <figcaption>");
        $cap.insertAdjacentHTML("beforebegin", `<div class="svg"></div>`);
      } else {
        // console.log("inserting div.svg at end of <figure>");
        $(this).append(`<div class="svg"></div>`);
      }
      $divsvg = $("div.svg", this).last();
    }

    function merge_json(result, me) {
      const $me = $(me);
      let parents = $me.attr("data-parents");
      if (parents !== null && parents !== undefined && parents !== "") {
        // console.log(`parents = "${parents}"`);
        parents = parents.split(/\s+/);
        let i;
        for (i = 0; i < parents.length; i++) {
          const $temp = $(`#${parents[i]}`);
          // console.log(`merging: #${parents[i]}`);
          if ($temp.length > 0) {
            // console.log(`merge_json: adding "${$temp[0].textContent}"`);
            merge_json(result, $temp[0]);
            // $.extend(true, result, JSON.parse($temp[0].textContent));
            // console.log(`result=${JSON.stringify(result, null, 2)}`);
            $temp.hide();
          }
        }
      }
      // console.log(`merge_json: adding "${me.textContent}"`);
      let temp2 = {};
      try {
        temp2 = JSON.parse(me.textContent);
        $.extend(true, result, temp2);
        // console.log(`result=${JSON.stringify(result, null, 2)}`);
        $(me).hide();
      } catch (e) {
        $tbl.insertAdjacentHTML(
          "beforebegin",
          `<p class="issue">Invalid JSON in next merge_json</p>`
        );
        $(me).classList.add("respec-error");
      }
    }

    const $render = $("pre.render,div.render,span.render", $fig);
    if ($render.length > 0) {
      $render.each(function(index) {
        const temp_json = {};
        $.extend(true, temp_json, json);
        merge_json(temp_json, this);
        // $(this).hide();
        $divsvg.last().makeID("svg", `render-${index}`);
        $divsvg.last().svg(function(svg) {
          draw_regpict(this, svg, temp_json);
        });
        if (index < $render.length - 1) {
          $divsvg.after(`<div class="svg"></div>`);
          $divsvg = $("div.svg", $fig).last();
        }
      });
    } else if (json !== null) {
      $divsvg.last().svg(function(svg) {
        draw_regpict(this, svg, json);
      });
    } else {
      pub(
        "warn",
        `core/regpict: no register definition ${$fig.get(0).outerHTML}`
      );
    }
    if ($tbl !== undefined) {
      insert_unused_table_rows($tbl, choose_defaults(json));
    }
    pub("end", `core/regpict figure.register id="${$fig.attr("id")}"`);
  });

  cb();
}
