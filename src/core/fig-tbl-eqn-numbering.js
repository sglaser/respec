// Module pcisig/fig-tbl-eqn-numbering
// Find figure numbers and adjust them to include the chapter number.
// Edit the Table of Figures as well.
// This happens as a distinct pass for two reasons:
// 1. core/figures runs before core/structure and thus doesn't know Chapter and Appendix numbers
// 2. A second pass means that this plugin is not part of the src/core.

export const name = "pcisig/fig-tbl-eqn-numbering";

function numberItems(sec, chapter, map, selector) {
  // Process Figure Captions, populating figNumMap
  let first = 0;
  sec.querySelectorAll(selector).forEach(elem => {
    const num = parseInt(elem.textContent, 10);
    if (first === 0) first = num;
    const new_num = `${chapter}-${num - first + 1}`;
    map.set(num, new_num);
  });
}

function renumberItems(selector, map) {
  document.querySelectorAll(selector).forEach(item => {
    const old_num = parseInt(item.textContent, 10);
    if (map.has(old_num)) {
      item.textContent = map.get(old_num);
    }
  });
}

export function run(conf) {
  if (conf.numberByChapter) {
    const chapterSecnos = document.querySelectorAll(
      "body > section:not(.introductory) h2:first-child bdi.secno"
    );
    const figNumMap = new Map();
    const tblNumMap = new Map();
    const eqnNumMap = new Map();
    for (const bdi of chapterSecnos) {
      const chapter = bdi.textContent.replace(/\..*$/, "");
      const section = bdi.closest("section");
      // Process Figure Captions, populating figNumMap
      numberItems(section, chapter, figNumMap, "figcaption bdi.figno");
      // Process Table Captions, populating tblNumMap
      numberItems(section, chapter, tblNumMap, "caption bdi.tblno");
      // Process Eqnure Captions, populating eqnNumMap
      numberItems(section, chapter, eqnNumMap, "figcaption bdi.eqnno");
    }
    // Convert all Figure references using figNumMap
    renumberItems("bdi.figno", figNumMap);
    // Convert all Table references using tblNumMap
    renumberItems("bdi.tblno", tblNumMap);
    // Convert all Equation references using eqnNumMap
    renumberItems("bdi.eqnno", eqnNumMap);
  }
}
