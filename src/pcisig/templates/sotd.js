// @ts-check
import { hyperHTML } from "../../core/import-maps.js";

export default (conf, opts) => {
  return hyperHTML`
    <h2>${conf.l10n.sotd}</h2>
    ${conf.isPreview ? renderPreview(conf) : ""}
    ${
      conf.isUnofficial
        ? renderIsUnofficial(opts)
        : conf.isTagFinding
        ? opts.additionalContent
        : conf.isNoTrack
        ? renderIsNoTrack(conf, opts)
        : hyperHTML`
          <p><em>${[conf.l10n.status_at_publication]}</em></p>
          ${
            conf.isSubmission
              ? noteForSubmission(conf, opts)
              : hyperHTML`
                ${!conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${
                  !conf.overrideStatus
                    ? hyperHTML`
                      ${linkToWorkingGroup(conf)} ${linkToCommunity(conf, opts)}
                      ${
                        conf.isCR || conf.isPER || conf.isPR
                          ? hyperHTML`
                            <p>
                              ${
                                conf.isCR
                                  ? `
                  PCI-SIG publishes a Candidate Recommendation to indicate that the document is believed to be
                  stable and to encourage implementation by the developer community. This Candidate
                  Recommendation is expected to advance to Proposed Recommendation no earlier than
                  ${conf.humanCREnd}.
                `
                                  : ""
                              }
                              ${
                                conf.isPER
                                  ? hyperHTML`
                                    PCI-SIG Advisory Committee Members are invited
                                    to send formal review comments on this
                                    Proposed Edited Recommendation to the PCI-SIG
                                    Team until ${conf.humanPEREnd}. Members of
                                    the Advisory Committee will find the
                                    appropriate review form for this document by
                                    consulting their list of current
                                    <a
                                      href="https://www.pcisig.com/2002/09/wbs/myQuestionnaires"
                                      >WBS questionnaires</a
                                    >.
                                  `
                                  : ""
                              }
                              ${
                                conf.isPR
                                  ? hyperHTML`
                                    The PCI-SIG Membership and other interested
                                    parties are invited to review the document
                                    and send comments to
                                    <a
                                      rel="discussion"
                                      href="${opts.mailToWGPublicList}"
                                      >${conf.wgPublicList}@pcisig.com</a
                                    >
                                    (<a
                                      href="${
                                        opts.mailToWGPublicListSubscription
                                      }"
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
                                  : ""
                              }
                            </p>
                          `
                          : ""
                      }
                    `
                    : ""
                }
                ${
                  conf.implementationReportURI
                    ? renderImplementationReportURI(conf)
                    : ""
                }
                ${conf.sotdAfterWGinfo ? opts.additionalContent : ""}
                ${conf.notRec ? renderNotRec(conf) : ""}
                ${conf.isRec ? renderIsRec() : ""} ${renderDeliverer(conf)}
                <p>
                  This document is governed by the
                  <a
                    id="pcisig_process_revision"
                    href="https://www.pcisig.com/2019/Process-20190301/"
                    >1 March 2019 PCI-SIG Process Document</a
                  >.
                </p>
                ${
                  conf.addPatentNote
                    ? hyperHTML`
                      <p>${[conf.addPatentNote]}</p>
                    `
                    : ""
                }
              `
          }
        `
    }
    ${opts.additionalSections}
  `;
};

function renderPreview(conf) {
  const { prUrl, prNumber, edDraftURI } = conf;
  return hyperHTML`
    <details class="annoying-warning" open="">
      <summary
        >This is a
        preview${
          prUrl && prNumber
            ? hyperHTML`
              of pull request
              <a href="${prUrl}">#${prNumber}</a>
            `
            : ""
        }</summary
      >
      <p>
        Do not attempt to implement this version of the specification. Do not
        reference this version as authoritative in any way.
        ${
          edDraftURI
            ? hyperHTML`
              Instead, see
              <a href="${edDraftURI}">${edDraftURI}</a> for the Editor's draft.
            `
            : ""
        }
      </p>
    </details>
  `;
}

function renderIsUnofficial(opts) {
  const { additionalContent } = opts;
  return hyperHTML`
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
  return hyperHTML`
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
  return hyperHTML`
    <p>
      Please see the Working Group's
      <a href="${implementationReportURI}">implementation report</a>.
    </p>
  `;
}

function renderNotRec(conf) {
  const { anOrA, textStatus } = conf;
  return hyperHTML`
    <p>
      Publication as ${anOrA} ${textStatus} does not imply endorsement by the
      PCI-SIG Membership. This is a draft document and may be updated, replaced or
      obsoleted by other documents at any time. It is inappropriate to cite this
      document as other than work in progress.
    </p>
  `;
}

function renderIsRec() {
  hyperHTML`
    <p>
      This document has been reviewed by PCI-SIG Members, by software developers,
      and by other PCI-SIG groups and interested parties, and is endorsed by the
      Director as a PCI-SIG Recommendation. It is a stable document and may be used
      as reference material or cited from another document. PCI-SIG's role in making
      the Recommendation is to draw attention to the specification and to
      promote its widespread deployment. This enhances the functionality and
      interoperability of the Web.
    </p>
  `;
}

function renderDeliverer(conf) {
  const {
    isNote,
    wgId,
    isIGNote,
    multipleWGs,
    recNotExpected,
    wgPatentHTML,
    wgPatentURI,
    charterDisclosureURI,
  } = conf;

  const producers = !isIGNote
    ? hyperHTML`
        This document was produced by ${multipleWGs ? "groups" : "a group"}
        operating under the
        <a href="https://www.pcisig.com/Consortium/Patent-Policy/"
          >PCI-SIG Patent Policy</a
        >.
      `
    : "";
  const wontBeRec = recNotExpected
    ? "The group does not expect this document to become a PCI-SIG Recommendation."
    : "";
  return hyperHTML`
    <p data-deliverer="${isNote ? wgId : null}">
      ${producers} ${wontBeRec}
      ${
        !isNote && !isIGNote
          ? hyperHTML`
            ${
              multipleWGs
                ? hyperHTML`
                  PCI-SIG maintains ${[wgPatentHTML]}
                `
                : hyperHTML`
                  PCI-SIG maintains a
                  <a href="${[wgPatentURI]}" rel="disclosure"
                    >public list of any patent disclosures</a
                  >
                `
            }
            made in connection with the deliverables of
            ${
              multipleWGs
                ? "each group; these pages also include"
                : "the group; that page also includes"
            }
            instructions for disclosing a patent. An individual who has actual
            knowledge of a patent which the individual believes contains
            <a href="https://www.pcisig.com/Consortium/Patent-Policy/#def-essential"
              >Essential Claim(s)</a
            >
            must disclose the information in accordance with
            <a
              href="https://www.pcisig.com/Consortium/Patent-Policy/#sec-Disclosure"
              >section 6 of the PCI-SIG Patent Policy</a
            >.
          `
          : ""
      }
      ${
        isIGNote
          ? hyperHTML`
            The disclosure obligations of the Participants of this group are
            described in the
            <a href="${charterDisclosureURI}">charter</a>.
          `
          : ""
      }
    </p>
  `;
}

function noteForSubmission(conf, opts) {
  return hyperHTML`
    ${opts.additionalContent}
    ${
      conf.isMemberSubmission
        ? noteForMemberSubmission(conf)
        : conf.isTeamSubmission
        ? noteForTeamSubmission(conf, opts)
        : ""
    }
  `;
}

function noteForMemberSubmission(conf) {
  const teamComment = `https://www.pcisig.com/Submission/${conf.publishDate.getUTCFullYear()}/${
    conf.submissionCommentNumber
  }/Comment/`;
  return hyperHTML`
    <p>
      By publishing this document, PCI-SIG acknowledges that the
      <a href="${conf.thisVersion}">Submitting Members</a> have made a formal
      Submission request to PCI-SIG for discussion. Publication of this document by
      PCI-SIG indicates no endorsement of its content by PCI-SIG, nor that PCI-SIG has, is,
      or will be allocating any resources to the issues addressed by it. This
      document is not the product of a chartered PCI-SIG group, but is published as
      potential input to the
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
  return hyperHTML`
    <p>
      If you wish to make comments regarding this document, please send them to
      <a href="${opts.mailToWGPublicListWithSubject}"
        >${conf.wgPublicList}@pcisig.com</a
      >
      (<a href="${opts.mailToWGPublicListSubscription}">subscribe</a>,
      <a href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
        >archives</a
      >)${
        conf.subjectPrefix
          ? hyperHTML`
            with <code>${conf.subjectPrefix}</code> at the start of your email's
            subject
          `
          : ""
      }.
    </p>
    <p>
      Please consult the complete
      <a href="https://www.pcisig.com/TeamSubmission/">list of Team Submissions</a>.
    </p>
  `;
}

function linkToWorkingGroup(conf) {
  if (!conf.wg) {
    return;
  }
  return hyperHTML`
    <p>
      This document was published by ${[conf.wgHTML]} as ${conf.anOrA}
      ${conf.longStatus}.
      ${
        conf.notYetRec
          ? "This document is intended to become a PCI-SIG Recommendation."
          : ""
      }
    </p>
  `;
}

function linkToCommunity(conf, opts) {
  if (!conf.github && !conf.wgPublicList) {
    return;
  }
  return hyperHTML`
    <p>
      ${
        conf.github
          ? hyperHTML`
            <a href="${conf.issueBase}">GitHub Issues</a> are preferred for
            discussion of this specification.
          `
          : ""
      }
      ${
        conf.wgPublicList
          ? hyperHTML`
            ${
              conf.github && conf.wgPublicList
                ? "Alternatively, you can send comments to our mailing list."
                : "Comments regarding this document are welcome."
            }
            Please send them to
            <a href="${opts.mailToWGPublicListWithSubject}"
              >${conf.wgPublicList}@pcisig.com</a
            >
            (<a
              href="${`https://lists.pcisig.com/Archives/Public/${conf.wgPublicList}/`}"
              >archives</a
            >)${
              conf.subjectPrefix
                ? hyperHTML`
                  with <code>${conf.subjectPrefix}</code> at the start of your
                  email's subject
                `
                : ""
            }.
          `
          : ""
      }
    </p>
  `;
}
