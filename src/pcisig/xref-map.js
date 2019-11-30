// @ts-check
// Module core/structure
//  Handles producing the ToC and numbering sections across the document.

// CONFIGURATION:
//  - noTOC: if set to true, no TOC is generated and sections are not numbered
//  - tocIntroductory: if set to true, the introductory material is listed in the TOC
//  - lang: can change the generated text (supported: en, fr)
//  - maxTocLevel: only generate a TOC so many levels deep

export const name = "pcisig/xref-map";

export function run(conf, doc) {
  if (conf.addXrefMap) {
    const $refs = $("a.tocxref", doc);
    if ($refs.length > 0) {
      const $mapsec = $(
        "<section id='xref-map' class='introductory appendix'><h2>Section, Figure, Table, and Equation ID Map</h2></section>"
      ).appendTo($("body"));
      const $tbody = $(
        "<table class='data'><thead><tr><th>Number</th><th>Name</th><th>ID</th></tr></thead><tbody/></table>"
      )
        .appendTo($mapsec)
        .children("tbody");

      $refs.each(function() {
        const number = $(".secno, .figno, .tblno, .eqnno", this)
          .text()
          .replace(/ /g, "&nbsp;")
          .replace(/-/g, "&#8209;");
        const id = $(this).attr("href");
        const name = $(
          ".sect-title, .fig-title, .tbl-title, .eqn-title",
          this
        ).text();
        $(
          `<tr>
            <td>${number}</td>
            <td class='long'>${name}</td>
            <td class='long'><a href="${id}">${id.substr(1)}</a></td>
          </tr>`
        ).appendTo($tbody);
      });
    }
  }
}
