/**
 * Sets the defaults for pcisig specs
 */
import { coreDefaults } from "../core/defaults.js";
import { definitionMap } from "../core/dfn-map.js";
import linter from "../core/linter.js";
import { rule as privsecSectionRule } from "../core/linter-rules/privsec-section.js";

export const name = "pcisig/pcisig-defaults";

linter.register(privsecSectionRule);

const pcisigDefaults = {
  lint: {
    "privsec-section": true,
  },
  pluralize: true,
  doJsonLd: false,
  numberByChapter: true,
  sectionRefsByNumber: true,
  license: "pcisig-software-doc",
  logos: [
    {
      src:
        "https://sglaser.github.io/respec/Spec/StyleSheets/2019/logos/pci_express_PMS.svg",
      alt: "pcisig",
      height: 40,
      width: 105,
      url: "https://www.pcisig.com/",
    },
  ],
  xref: false,
};

export function run(conf) {
  conf.respecRFC2119Keywords = conf.respecRFC2119Keywords || [
    "\\bMUST(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
    "\\bSHOULD(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
    "\\bSHALL(?:\\s+NOT)?(?:@FLIT|@64|@32|@16|@8)?\\b",
    "\\bMAY\\b",
    "\\b(?:IS|ARE)\\s+(?:NOT\\s+)PERMITTED\\s+TO\\b",
    "\\b(?:NOT\\s+)?REQUIRED\\b",
    "\\b(?:STRONGLY\\s+)?(?:NOT\\s+)?RECOMMENDED\\b",
    "\\b(?:INDEPENDENTLY\\s+)?OPTIONAL\\b",
  ];
  if (conf.specStatus === "unofficial") return;
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...pcisigDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...pcisigDefaults,
    ...conf,
    lint,
  });

  // TODO: eventually, we want to remove this.
  // It's here for legacy support of json-ld specs
  // see https://github.com/pcisig/respec/issues/2019
  Object.assign(conf, { definitionMap });
}
