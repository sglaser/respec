// @ts-check
import { hyperHTML } from "../../core/import-maps.js";
import { norm } from "../../core/utils.js";
import { pub } from "../../core/pubsubhub.js";
import showLink from "./show-link.js";
import showLogo from "./show-logo.js";
import showPeople from "./show-people.js";

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
  return hyperHTML`
  <div id="respec-banner">
    <span id="respec-banner-status">${conf.maturity}</span>&nbsp;&mdash;&nbsp;
    <span id="respec-banner-spec-name">${conf.title}</span>
  </div>
  <div class="head">
    ${conf.logos.map(showLogo)} ${getSpecTitleElem(conf)}
    ${getSpecSubTitleElem(conf)}
    <h2>
      ${conf.prependPCISIG ? "PCI-SIG " : ""}${conf.textStatus}
      <time class="dt-published" datetime="${conf.dashDate}"
        >${conf.publishHumanDate}</time
      >
    </h2>
    <dl>
      ${
        !conf.isNoTrack
          ? hyperHTML`
            <dt>${conf.l10n.this_version}</dt>
            <dd>
              <a class="u-url" href="${conf.thisVersion}"
                >${conf.thisVersion}</a
              >
            </dd>
            <dt>${conf.l10n.latest_published_version}</dt>
            <dd>
              ${
                conf.latestVersion
                  ? hyperHTML`
                    <a href="${conf.latestVersion}">${conf.latestVersion}</a>
                  `
                  : "none"
              }
            </dd>
          `
          : ""
      }
      ${
        conf.edDraftURI
          ? hyperHTML`
            <dt>${conf.l10n.latest_editors_draft}</dt>
            <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
          `
          : ""
      }
      ${
        conf.testSuiteURI
          ? hyperHTML`
            <dt>Test suite:</dt>
            <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
          `
          : ""
      }
      ${
        conf.implementationReportURI
          ? hyperHTML`
            <dt>Implementation report:</dt>
            <dd>
              <a href="${conf.implementationReportURI}"
                >${conf.implementationReportURI}</a
              >
            </dd>
          `
          : ""
      }
      ${
        conf.bugTrackerHTML
          ? hyperHTML`
            <dt>${conf.l10n.bug_tracker}</dt>
            <dd>${[conf.bugTrackerHTML]}</dd>
          `
          : ""
      }
      ${
        conf.isED && conf.prevED
          ? hyperHTML`
            <dt>Previous editor's draft:</dt>
            <dd><a href="${conf.prevED}">${conf.prevED}</a></dd>
          `
          : ""
      }
      ${
        conf.showPreviousVersion
          ? hyperHTML`
            <dt>Previous version:</dt>
            <dd><a href="${conf.prevVersion}">${conf.prevVersion}</a></dd>
          `
          : ""
      }
      ${
        !conf.prevRecURI
          ? ""
          : conf.isRec
          ? hyperHTML`
            <dt>Previous Recommendation:</dt>
            <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
          `
          : hyperHTML`
            <dt>Latest Recommendation:</dt>
            <dd><a href="${conf.prevRecURI}">${conf.prevRecURI}</a></dd>
          `
      }
      <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
      ${showPeople(conf.editors)}
      ${
        Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? hyperHTML`
            <dt>
              ${
                conf.multipleFormerEditors
                  ? conf.l10n.former_editors
                  : conf.l10n.former_editor
              }
            </dt>
            ${showPeople(conf.formerEditors)}
          `
          : ""
      }
      ${
        conf.authors
          ? hyperHTML`
            <dt>
              ${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}
            </dt>
            ${showPeople(conf.authors)}
          `
          : ""
      }
      ${conf.otherLinks ? conf.otherLinks.map(showLink) : ""}
    </dl>
    ${
      conf.errata
        ? hyperHTML`
          <p>
            Please check the
            <a href="${conf.errata}"><strong>errata</strong></a> for any
            errors or issues reported since publication.
          </p>
        `
        : ""
    }
    ${
      conf.alternateFormats
        ? hyperHTML`
          <p>
            ${
              conf.multipleAlternates
                ? "This document is also available in these non-normative formats:"
                : "This document is also available in this non-normative format:"
            }
            ${[conf.alternatesHTML]}
          </p>
        `
        : ""
    }
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
  return hyperHTML`
    <a rel="license" href="${url}" class="${cssClass}">${text}</a>
  `;
}

function renderCopyright(conf) {
  return conf.isUnofficial
    ? conf.additionalCopyrightHolders
      ? hyperHTML`
          <p class="copyright">${[conf.additionalCopyrightHolders]}</p>
        `
      : conf.overrideCopyright
      ? [conf.overrideCopyright]
      : hyperHTML`
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
  return hyperHTML`
    <p class="copyright">
      <a href="https://members.pcisig.com/wg/PCI-SIG/document/folder/106"
        >Copyright</a
      >
      &copy;
      ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
      ${
        conf.additionalCopyrightHolders
          ? hyperHTML`
            ${[conf.additionalCopyrightHolders]} &amp;
          `
          : ""
      }
    <dl class="copyright">
      <dt>Web Site</dt>
      <dd><a href="http://www.pcisig.com">http://www.pcisig.com</a></dd>
      <dt>Membership Services</dt>
      <dd><a href="mailto:administration@pcisig.com">administration@pcisig.com</a></dd>
      <dd><a href="tel:+1-503-619-0569">+1-503-619-0569</a> (Phone)</dd>
      <dd><a href="tel:+1-503-644-6708">+1-503-644-6708</a> (Fax)</dd>
      <dt>Technical Support</dt>
      <dd><a href="mailto:techsupp@pcisig.com">techsupp@pcisig.com</a></dd>
      </dl>
      <p class="copyright">PCI-SIG disclaims all warranties and liability for the use of this document
        and the information contained herein and assumes no responsibility
        for any errors that may appear in this document, nor does PCI-SIG make a commitment
        to update the information contained herein.
      </p>
      <p class="copyright">
        This PCI Specification is provided “as is” without any warranties of any kind,
        including any warranty of merchantability, non-infringement, fitness for any
        particular purpose, or any warranty otherwise arising out of any proposal,
        specification, or sample. PCI-SIG disclaims all liability for infringement
        of proprietary rights, relating to use of information in this specification.
        This document itself may not be modified in any way, including by removing the
        copyright notice or references to PCI-SIG.
        No license, express or implied, by estoppel or otherwise, to any intellectual
        property rights is granted herein.
        PCI, PCI Express, PCIe, and PCI-SIG are trademarks or registered trademarks of
        PCI-SIG.
        All other product names are trademarks, registered trademarks, or servicemarks of
        their respective owners.
      </p>
  `;
}
