// @ts-check
import { getIntlData } from "../../core/utils.js";
import { html } from "../../core/import-maps.js";

const localizationStrings = {
  en: {
    sotd: "Status of This Document",
  },
  ko: {
    sotd: "현재 문서의 상태",
  },
  zh: {
    sotd: "关于本文档",
  },
  ja: {
    sotd: "この文書の位置付け",
  },
  nl: {
    sotd: "Status van dit document",
  },
  es: {
    sotd: "Estado de este Document",
  },
  de: {
    sotd: "Status dieses Dokuments",
  },
};

export const l10n = getIntlData(localizationStrings);

export default (conf, opts) => {
  return html`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview ? renderPreview(conf) : ""}
    ${conf.isUnofficial
      ? renderIsUnofficial(opts)
      : conf.isTagFinding
      ? opts.additionalContent
      : conf.isNoTrack
      ? renderIsNoTrack(conf, opts)
      : html`
          <p><em>${[conf.l10n.status_at_publication]}</em></p>
          ${conf.isSubmission
            ? noteForSubmission(conf, opts)
            : html`
                ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${!conf.overrideStatus
                  ? html`${linkToWorkingGroup(conf)}
                    ${linkToCommunity(conf, opts)}`
                  : ""}
                ${conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${conf.isRec ? renderIsRec(conf) : renderNotRec(conf)}
                <p>
                  This document is governed by the
                  <a
                    id="pcisig_process_revision"
                    href="https://members.pcisig.com/wg/PCI-SIG/document/previewpdf/1107"
                    >PCI-SIG Specification Development Procedures 08/08/2017</a
                  >.
                </p>
                ${conf.addPatentNote
                  ? html`<p>${[conf.addPatentNote]}</p>`
                  : ""}
              `}
        `}
    ${opts.additionalSections}
  `;
};

function renderPreview(conf) {
  const { prUrl, prNumber, edDraftURI } = conf;
  return html`
    <details class="annoying-warning" open="">
      <summary>
        This is a
        preview${prUrl && prNumber
          ? html`
              of pull request
              <a href="${prUrl}">#${prNumber}</a>
            `
          : ""}
      </summary>
      <p>
        Do not attempt to implement this version of the specification. Do not
        reference this version as authoritative in any way.
        ${edDraftURI
          ? html`
              Instead, see
              <a href="${edDraftURI}">${edDraftURI}</a> for the Editor's draft.
            `
          : ""}
      </p>
    </details>
  `;
}

function renderIsUnofficial(opts) {
  const { additionalContent } = opts;
  return html`
    <p>
      This document is draft of a potential specification. It has no official
      standing of any kind and does not represent the support or consensus of
      any standards organization.
    </p>
    ${additionalContent}
  `;
}

function renderIsNoTrack(conf, opts) {
  const { isMO } = conf;
  const { additionalContent } = opts;
  return html`
    <p>
      This document is merely a PCI-SIG-internal
      ${isMO ? "member-confidential" : ""} document. It has no official standing
      of any kind and does not represent consensus of the PCI-SIG Membership.
    </p>
    ${additionalContent}
  `;
}

function renderNotRec(conf) {
  const { anOrA, textStatus } = conf;
  return html`
    <p>
      Publication as ${anOrA} ${textStatus} does not imply endorsement by the
      PCI-SIG Membership. This is a draft document and may be updated, replaced
      or obsoleted by other documents at any time. It is inappropriate to cite
      this document as other than work in progress.
    </p>
  `;
}

function renderIsRec() {
  return html`<p>
    A PCI-SIG Specification is a specification that, after extensive review, has
    been approved by the PCI-SIG Board of Directors. PCI-SIG recommends the wide
    deployment of this specification.
  </p>`;
}

function noteForSubmission(conf, opts) {
  return html`
    ${opts.additionalContent}
    ${conf.isMemberSubmission
      ? noteForMemberSubmission(conf)
      : conf.isTeamSubmission
      ? noteForTeamSubmission()
      : ""}
  `;
}

function noteForMemberSubmission(conf) {
  const teamComment = `https://www.pcisig.com/Submission/${conf.publishDate.getUTCFullYear()}/${
    conf.submissionCommentNumber
  }/Comment/`;
  return html`
    <p>
      By publishing this document, PCI-SIG acknowledges that the
      <a href="${conf.thisVersion}">Submitting Members</a> have made a formal
      Submission request to PCI-SIG for discussion. Publication of this document
      by PCI-SIG indicates no endorsement of its content by PCI-SIG, nor that
      PCI-SIG has, is, or will be allocating any resources to the issues
      addressed by it. This document is not the product of a chartered PCI-SIG
      group, but is published as potential input to the
      <a href="https://www.pcisig.com/Consortium/Process">PCI-SIG Process</a>. A
      <a href="${teamComment}">PCI-SIG Team Comment</a> has been published in
      conjunction with this Member Submission. Publication of acknowledged
      Member Submissions at the PCI-SIG site is one of the benefits of
      <a href="https://www.pcisig.com/Consortium/Prospectus/Joining">
        PCI-SIG Membership</a
      >. Please consult the requirements associated with Member Submissions of
      <a href="https://www.pcisig.com/Consortium/Patent-Policy/#sec-submissions"
        >section 3.3 of the PCI-SIG Patent Policy</a
      >. Please consult the complete
      <a href="https://www.pcisig.com/Submission"
        >list of acknowledged PCI-SIG Member Submissions</a
      >.
    </p>
  `;
}

function noteForTeamSubmission() {
  return html`
    <p>
      Please consult the complete
      <a href="https://www.pcisig.com/TeamSubmission/"
        >list of Team Submissions</a
      >.
    </p>
  `;
}

function linkToWorkingGroup(conf) {
  if (!conf.wg) {
    return;
  }
  return html`
    <p>
      This document was published by ${[conf.wgHTML]} as ${conf.anOrA}
      ${conf.longStatus}.
      ${conf.notYetRec
        ? "This document is intended to become a PCI-SIG Specification."
        : ""}
    </p>
  `;
}

function linkToCommunity(conf, opts) {
  if (!conf.github && !conf.wgPublicList) {
    return;
  }
  return html`
    <p>
      ${conf.github
        ? html`
            <a href="${conf.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `
        : ""}
      ${conf.wgPublicList
        ? html`
            ${conf.github && conf.wgPublicList
              ? "Alternatively, you can send comments to our mailing list."
              : "Comments regarding this document are welcome."}
            Please send them to
            <a href="${opts.mailToWGPublicListWithSubject}"
              >${conf.wgPublicList}@pcisig.com</a
            >
            (<a
              href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
              >archives</a
            >)${conf.subjectPrefix
              ? html`
                  with <code>${conf.subjectPrefix}</code> at the start of your
                  email's subject
                `
              : ""}.
          `
        : ""}
    </p>
  `;
}
