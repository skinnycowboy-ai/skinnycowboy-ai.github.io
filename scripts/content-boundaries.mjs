const projectLightwellContext = /\bProject\s+Lightwell\b/i;

const withdrawnLightwellClaims = [
  /field-developed buying motion/i,
  /not a Red Hat product/i,
];

export function exposesWithdrawnLightwellPositioning(content) {
  return (
    projectLightwellContext.test(content) &&
    withdrawnLightwellClaims.some((claim) => claim.test(content))
  );
}
