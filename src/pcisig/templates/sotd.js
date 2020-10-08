// @ts-check
import { html } from "../../core/import-maps.js";

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
                  ? html`
                      ${linkToWorkingGroup(conf)} ${linkToCommunity(conf, opts)}
                      ${conf.isCR || conf.isPER || conf.isPR
                        ? html`
                            <p>
                              ${conf.isCR
                                ? `
                  PCI-SIG publishes a Candidate Recommendation to indicate that the document is believed to be
                  stable and to encourage implementation by the developer community. This Candidate
                  Recommendation is expected to advance to Proposed Recommendation no earlier than
                  ${conf.humanCREnd}.
                `
                                : ""}
                              ${conf.isPER
                                ? html`
                                    PCI-SIG Advisory Committee Members are
                                    invited to send formal review comments on
                                    this Proposed Edited Recommendation to the
                                    PCI-SIG Team until ${conf.humanPEREnd}.
                                    Members of the Advisory Committee will find
                                    the appropriate review form for this
                                    document by consulting their list of current
                                    <a
                                      href="https://www.pcisig.com/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >.
                                  `
                                : ""}
                              ${conf.isPR
                                ? html`
                                    The PCI-SIG Membership and other interested
                                    parties are invited to review the document
                                    and send comments to
                                    <a
                                      rel="discussion"
                                      href="${opts.mailToWGPublicList}"
                                      >${conf.wgPublicList}@pcisig.com</a
                                    >
                                    (<a
                                      href="${opts.mailToWGPublicListSubscription}"
                                      >subscribe</a
                                    >,
                                    <a
                                      href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
                                      >archives</a
                                    >) through ${conf.humanPREnd}. Advisory
                                    Committee Representatives should consult
                                    their
                                    <a
                                      href="https://www.pcisig.com/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >. Note that substantive technical comments
                                    were expected during the Candidate
                                    Recommendation review period that ended
                                    ${conf.humanCREnd}.
                                  `
                                : ""}
                            </p>
                          `
                        : ""}
                    `
                  : ""}
                ${conf.implementationReportURI
                  ? renderImplementationReportURI(conf)
                  : ""}
                ${conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${conf.notRec ? renderNotRec(conf) : ""}
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

function renderImplementationReportURI(conf) {
  const { implementationReportURI } = conf;
  return html`
    <p>
      Please see the Working Group's
      <a href="${implementationReportURI}">implementation report</a>.
    </p>
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

function noteForSubmission(conf, opts) {
  return html`
    ${opts.additionalContent}
    ${conf.isMemberSubmission
      ? noteForMemberSubmission(conf)
      : conf.isTeamSubmission
      ? noteForTeamSubmission(conf, opts)
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

function noteForTeamSubmission(conf, opts) {
  return html`
    <p>
      If you wish to make comments regarding this document, please send them to
      <a href="${opts.mailToWGPublicListWithSubject}"
        >${conf.wgPublicList}@pcisig.com</a
      >
      (<a href="${opts.mailToWGPublicListSubscription}">subscribe</a>,
      <a
        href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
        >archives</a
      >)${conf.subjectPrefix
        ? html`
            with <code>${conf.subjectPrefix}</code> at the start of your email's
            subject
          `
        : ""}.
    </p>
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
        ? "This document is intended to become a PCI-SIG Recommendation."
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

/*
<h2>{{l10n.sotd}}</h2>
{{#if isPreview}}
  <details class="annoying-warning" open="">
    <summary>This is a preview</summary>
    <p>
      Do not attempt to implement this version of the specification. Do not reference this
      version as authoritative in any way.
    </p>
  </details>
{{/if}}
{{#if isUnofficial}}
  <p>
    This document is draft of a potential specification. It has no official standing of
    any kind and does not represent the support or consensus of any standards organisation.
  </p>
  {{{additionalContent}}}
{{else}}
  {{#if isNoTrack}}
    <p>
      This document is a PCISIG internal document. It has no official standing of any kind and does not represent
      consensus of the PCISIG Membership.
    </p>
    {{{additionalContent}}}
  {{else}}
    {{#unless overrideStatus}}
      {{#if isFinal}}
        <p>
          This specification is an official publication of the PCISIG. The PCISIG
          may publish errata to this specification and may develop future revisions to this
          specification.
        </p>
      {{else}}
        <p>
          This specification is intended to become a PCISIG Standard.
          This particular document is a <strong>{{specStatusLong}}</strong>
          {{#if specLevelLong}}
            of the <strong>{{specLevelLong}}</strong> document
            {{#if specReviewLong}}
              for <strong>{{specReviewLong}}</strong>
            {{/if}}
          {{/if}}.
          {{#if specReviewLong}}
            {{#if humanReviewEndDate}}
              The {{specReviewLong}} period ends 5:00 PM US Pacific Time on <b>{{humanReviewEndDate}}</b>.
            {{/if}}
          {{/if}}
        </p>
        {{#if is09}}
          <p>PCISIG publishes a 0.9 maturity level specification to indicate that the document is believed to be
            stable and to encourage implementation by the developer community.</p>
        {{/if}}
        {{#if is07}}
          <p>
            PCISIG publishes a 0.7 maturity level specification to indicate that the ...
          </p>
        {{/if}}
        {{#if is05}}
          <p>PCISIG publishes a 0.5 maturity level specification to indicate that the ...</p>
        {{/if}}
        {{#if is03}}
          <p>PCISIG publishes a 0.3 maturity level specification to indicate that the ...</p>
        {{/if}}
      {{/if}}
    {{/unless}}
  {{/if}}
  {{#if isSubmission}}
    {{{additionalContent}}}
    <p>PCISIG acknowledges that the Submitting Member have made a formal Submission request to PCISIG for
      discussion. Publication of this document by PCISIG indicates no endorsement of its content by PCISIG, nor that
      PCISIG has, is, or will be allocating any resources to the issues addressed by it. This document is not the
      product of a chartered PCISIG Workgroup. </p>
  {{else}}
    {{#unless sotdAfterWGinfo}}
      {{{additionalContent}}}
    {{/unless}}
    {{#if notRec}}
      <p>
        Publication as {{anOrA}} {{textStatus}} does not imply endorsement by the PCISIG. This is a draft document and
        may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document
        as other than work in progress.
      </p>
    {{/if}}
    {{#if addPatentNote}}<p>{{{addPatentNote}}}</p>{{/if}}
  {{/if}}
{{/if}}
{{{additionalSections}}}
 */
