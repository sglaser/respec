// @ts-check

export const name = "pcisig/include-final-config";

export function run(conf) {
  const script = document.createElement("script");
  script.id = "finalUserConfig";
  script.type = "application/json";
  script.innerHTML = JSON.stringify(conf, null, 2);
  document.head.appendChild(script);
}
