// Module pcisig/l10n
// Looks at the lang attribute on the root element and uses it to manage the config.l10n object so
// that other parts of the system can localise their text
import { l10n } from "../core/l10n.js";
export const name = "pcisig/l10n";
const additions = {
  en: {
    sotd: "Status of this Document",
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current PCISIG publications and the latest revision of this specification can be found at <a href='https://www.pcisig.com'>pcisig.com</a>",
  },
};

Object.keys(additions).forEach(key => {
  if (!l10n[key]) l10n[key] = {};
  Object.assign(l10n[key], additions[key]);
});
