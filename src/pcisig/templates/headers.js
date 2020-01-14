// @ts-check
import { getIntlData } from "../../core/l10n";
import { hyperHTML as html } from "../../core/import-maps.js";
import { norm } from "../../core/utils.js";
import { pub } from "../../core/pubsubhub.js";
import showLink from "./show-link.js";
import showLogo from "./show-logo.js";
import showPeople from "./show-people.js";

const localizationStrings = {
  en: {
    author: "Author:",
    authors: "Authors:",
    editor: "Editor:",
    editors: "Editors:",
    former_editor: "Former editor:",
    former_editors: "Former editors:",
    latest_editors_draft: "Latest editor's draft:",
    latest_published_version: "Latest published version:",
    this_version: "This version:",
  },
  ko: {
    author: "저자:",
    authors: "저자:",
    editor: "편집자:",
    editors: "편집자:",
    former_editor: "이전 편집자:",
    former_editors: "이전 편집자:",
    latest_editors_draft: "최신 편집 초안:",
    latest_published_version: "최신 버전:",
    this_version: "현재 버전:",
  },
  zh: {
    editor: "编辑：",
    editors: "编辑：",
    former_editor: "原编辑：",
    former_editors: "原编辑：",
    latest_editors_draft: "最新编辑草稿：",
    latest_published_version: "最新发布版本：",
    this_version: "本版本：",
  },
  ja: {
    author: "著者：",
    authors: "著者：",
    editor: "編者：",
    editors: "編者：",
    former_editor: "以前の版の編者：",
    former_editors: "以前の版の編者：",
    latest_editors_draft: "最新の編集用草案：",
    latest_published_version: "最新バージョン：",
    this_version: "このバージョン：",
  },
  nl: {
    author: "Auteur:",
    authors: "Auteurs:",
    editor: "Redacteur:",
    editors: "Redacteurs:",
    latest_editors_draft: "Laatste werkversie:",
    latest_published_version: "Laatst gepubliceerde versie:",
    this_version: "Deze versie:",
  },
  es: {
    author: "Autor:",
    authors: "Autores:",
    editor: "Editor:",
    editors: "Editores:",
    latest_editors_draft: "Borrador de editor mas reciente:",
    latest_published_version: "Versión publicada mas reciente:",
    this_version: "Ésta versión:",
  },
};

export const l10n = getIntlData(localizationStrings);

const ccLicense = "https://creativecommons.org/licenses/by/3.0/";

function getSpecTitleElem(conf) {
  const specTitleElem =
    document.querySelector("h1#title") || document.createElement("h1");
  if (specTitleElem.parentElement) {
    specTitleElem.remove();
  } else {
    specTitleElem.textContent = conf.title;
    specTitleElem.id = "title";
  }
  conf.title = norm(specTitleElem.textContent);
  specTitleElem.classList.add("title", "p-name");
  if (document.querySelector("title") === null) {
    document.title = conf.title;
  } else if (document.title !== conf.title) {
    pub("warn", "The document's title and the `<title>` element differ.");
  }
  return specTitleElem;
}

function getSpecSubTitleElem(conf) {
  let specSubTitleElem = document.querySelector("h2#subtitle");

  if (specSubTitleElem && specSubTitleElem.parentElement) {
    specSubTitleElem.remove();
    conf.subtitle = specSubTitleElem.textContent.trim();
  } else if (conf.subtitle) {
    specSubTitleElem = document.createElement("h2");
    specSubTitleElem.textContent = conf.subtitle;
    specSubTitleElem.id = "subtitle";
  }
  if (specSubTitleElem) {
    specSubTitleElem.classList.add("subtitle");
  }
  return specSubTitleElem;
}

export default conf => {
  return html`
    <div class="head">
      <div id="respec-banner">
        <span id="respec-banner-status">${conf.maturity}</span>&nbsp;&mdash;&nbsp;
        <span id="respec-banner-spec-name">${conf.title}</span>
      </div>
      ${conf.logos.map(showLogo)} ${getSpecTitleElem(conf)}
      ${getSpecSubTitleElem(conf)}
      <h2>
        ${conf.prependPCISIG ? "PCI-SIG " : ""}${conf.textStatus}
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        ${!conf.isNoTrack
          ? html`
              <dt>${l10n.this_version}</dt>
              <dd>
                <a class="u-url" href="${conf.thisVersion}"
                  >${conf.thisVersion}</a
                >
              </dd>
              <dt>${l10n.latest_published_version}</dt>
              <dd>
                ${conf.latestVersion
                  ? html`
                      <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                    `
                  : "none"}
              </dd>
            `
          : ""}
        ${conf.edDraftURI
          ? html`
              <dt>${l10n.latest_editors_draft}</dt>
              <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
            `
          : ""}
        ${conf.testSuiteURI
          ? html`
              <dt>Test suite:</dt>
              <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
            `
          : ""}
        ${conf.implementationReportURI
          ? html`
              <dt>Implementation report:</dt>
              <dd>
                <a href="${conf.implementationReportURI}"
                  >${conf.implementationReportURI}</a
                >
              </dd>
            `
          : ""}
        ${conf.bugTrackerHTML
          ? html`
              <dt>${l10n.bug_tracker}</dt>
              <dd>${[conf.bugTrackerHTML]}</dd>
            `
          : ""}
        ${conf.isED && conf.prevED
          ? html`
              <dt>Previous editor's draft:</dt>
              <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
            `
          : ""}
        ${conf.showPreviousVersion
          ? html`
              <dt>Previous version:</dt>
              <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
            `
          : ""}
        ${!conf.prevRecURI
          ? ""
          : conf.isRec
          ? html`
              <dt>Previous Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `
          : html`
              <dt>Latest Recommendation:</dt>
              <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
            `}
        <dt>${conf.multipleEditors ? l10n.editors : l10n.editor}</dt>
        ${showPeople(conf.editors)}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? html`
              <dt>
                ${conf.multipleFormerEditors
                  ? l10n.former_editors
                  : l10n.former_editor}
              </dt>
              ${showPeople(conf.formerEditors)}
            `
          : ""}
        ${conf.authors
          ? html`
              <dt>
                ${conf.multipleAuthors ? l10n.authors : l10n.author}
              </dt>
              ${showPeople(conf.authors)}
            `
          : ""}
        ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
      </dl>
      ${conf.errata
        ? html`
            <p>
              Please check the
              <a href="${conf.errata}"><strong>errata</strong></a> for any
              errors or issues reported since publication.
            </p>
          `
        : ""}
      ${conf.alternateFormats
        ? html`
            <p>
              ${conf.multipleAlternates
                ? "This document is also available in these non-normative formats:"
                : "This document is also available in this non-normative format:"}
              ${[conf.alternatesHTML]}
            </p>
          `
        : ""}
      ${renderCopyright(conf)}
      <hr title="Separator for header" />
    </div>
  `;
};

/**
 * @param {string} text
 * @param {string} url
 * @param {string=} cssClass
 */
function linkLicense(text, url, cssClass) {
  return html`
    <a rel="license" href="${url}" class="${cssClass}">${text}</a>
  `;
}

function renderCopyright(conf) {
  return conf.isUnofficial
    ? conf.additionalCopyrightHolders
      ? html`
          <p class="copyright">${[conf.additionalCopyrightHolders]}</p>
        `
      : conf.overrideCopyright
      ? [conf.overrideCopyright]
      : html`
          <p class="copyright">
            This document is licensed under a
            ${linkLicense(
              "Creative Commons Attribution 3.0 License",
              ccLicense,
              "subfoot"
            )}.
          </p>
        `
    : conf.overrideCopyright
    ? [conf.overrideCopyright]
    : renderOfficialCopyright(conf);
}

function renderOfficialCopyright(conf) {
  return html`
    <p class="copyright">
      Copyright&copy;
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      <a href="http://www.pcisig.com">PCI-SIG</a>
      ${conf.additionalCopyrightHolders
        ? html`
            &amp; ${[conf.additionalCopyrightHolders]}
          `
        : ""}
    </p>
    <dl class="copyright">
      <dt>Web Site</dt>
      <dd><a href="http://www.pcisig.com">http://www.pcisig.com</a></dd>
      <dt>Membership Services</dt>
      <dd>
        <a href="mailto:administration@pcisig.com">administration@pcisig.com</a>
      </dd>
      <dd><a href="tel:+1-503-619-0569">+1.503.619.0569</a> (Phone)</dd>
      <dd><a href="tel:+1-503-644-6708">+1.503.644.6708</a> (Fax)</dd>
      <dt>Technical Support</dt>
      <dd><a href="mailto:techsupp@pcisig.com">techsupp@pcisig.com</a></dd>
    </dl>
    <p class="copyright">
      PCI-SIG disclaims all warranties and liability for the use of this
      document and the information contained herein and assumes no
      responsibility for any errors that may appear in this document, nor does
      PCI-SIG make a commitment to update the information contained herein.
    </p>
    <p class="copyright">
      This PCI Specification is provided “as is” without any warranties of any
      kind, including any warranty of merchantability, non-infringement, fitness
      for any particular purpose, or any warranty otherwise arising out of any
      proposal, specification, or sample. PCI-SIG disclaims all liability for
      infringement of proprietary rights, relating to use of information in this
      specification. This document itself may not be modified in any way,
      including by removing the copyright notice or references to PCI-SIG. No
      license, express or implied, by estoppel or otherwise, to any intellectual
      property rights is granted herein. PCI, PCI Express, PCIe, and PCI-SIG are
      trademarks or registered trademarks of PCI-SIG. All other product names
      are trademarks, registered trademarks, or servicemarks of their respective
      owners.
    </p>
  `;
}
