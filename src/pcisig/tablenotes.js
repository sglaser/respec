// @ts-check
// Module pcisig/tablenotes
//  Handles tablenotes ("footnotes" in tables).
//  Invents id for table (if none present)

import { addId } from "../core/utils.js";

export const name = "pcisig/tablenotes";

export function run() {
  // console.log("in tablenotes");
  const tableid_to_notes_entries = new Map();
  //
  // find all tables that contain elements with index entries, go through them sequentially
  //
  const note_list = document.querySelectorAll("table span.tablenote");
  note_list.forEach(note => {
    // console.log(`tablenotes: note = ${note.outerHTML}`);
    /** @type {HTMLElement} */
    const table = note.closest("table");
    if (table) {
      addId(table, "tbl");
      // console.log(`tablenotes: tf.closest("table") = ${table.id}`);
      if (!tableid_to_notes_entries.has(table.id)) {
        tableid_to_notes_entries.set(table.id, []);
        // console.log(
        //   `tablenotes: tableid_to_notes_entries.keys() = ${Array.from(
        //     tableid_to_notes_entries.keys()
        //   )}`
        // );
      }
      const ent = tableid_to_notes_entries.get(table.id);
      const str = note.innerHTML;
      // check to see if the entry is there already, if not add it
      const initial_note = ent.indexOf(str) < 0;
      if (initial_note) {
        ent.push(str);
      }
      const tfnum = ent.indexOf(str) + 1;
      // replace content of original element
      const tfid = `${table.id}_tablenote_${tfnum}`;
      note.innerHTML = `&nbsp;<a href="#li_${tfid}"><sup>[${tfnum}]</sup></a>`;
    } else {
      // should never happen since selector for note_list requires ancestor table element
      note.classList.add("respec-error");
    }
  });

  tableid_to_notes_entries.forEach((entries, tableid) => {
    // for each table that has tablenotes
    const table = document.getElementById(tableid);
    const tbody = document.createElement("tbody");
    tbody.classList.add("notes");
    tbody.innerHTML =
      '<tr><td colspan="1000"><b>Notes:</b><ol class="notes"></ol></td></tr>';
    const tfcontainer = tbody.querySelector("ol.notes");
    entries.forEach((entry, index) => {
      // for each unique note in that table
      const tfid = `${tableid}_tablenote_${index + 1}`;
      const li = document.createElement("li");
      // console.log(`tablenotes: add li for "${tfid}"`);
      li.id = `li_${tfid}`;
      li.classList.add("tablenote-li");
      const refs = table.querySelectorAll(`a[href="#${li.id}"]`);
      const alist = [];
      // console.log(`tablenotes: refs.length = ${refs.length}`);
      refs.forEach(a => {
        a.setAttribute("id", `a_${tfid}_${alist.length + 1}`);
        alist.push(`<a href="#${a.id}">&#8673;</a>&nbsp;`);
      });
      li.innerHTML = `${alist.join("")}${entry}`;
      tfcontainer.appendChild(li);
    });
    // console.log(`tablenotes: add notes tbody to "${table.id}"`);
    table.appendChild(tbody);
  });
}
