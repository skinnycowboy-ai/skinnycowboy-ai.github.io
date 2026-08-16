import assert from 'node:assert/strict';
import { exposesWithdrawnLightwellPositioning } from './content-boundaries.mjs';

const longSeparation = 'validated customer context '.repeat(30);

assert.equal(
  exposesWithdrawnLightwellPositioning(
    `Project Lightwell ${longSeparation} field-developed buying motion`,
  ),
  true,
  'Detects a withdrawn Lightwell claim regardless of forward distance.',
);

assert.equal(
  exposesWithdrawnLightwellPositioning(
    `Not a Red Hat product. ${longSeparation} Project Lightwell`,
  ),
  true,
  'Detects a withdrawn Lightwell claim regardless of phrase order.',
);

assert.equal(
  exposesWithdrawnLightwellPositioning('Project Vaquero is not a Red Hat product.'),
  false,
  'Allows legitimate product-boundary language for an unrelated project.',
);

assert.equal(
  exposesWithdrawnLightwellPositioning(
    'Lightwell is a joint IBM and Red Hat commercial offering.',
  ),
  false,
  'Allows the verified Lightwell product positioning.',
);

console.log('Validated withdrawn Lightwell claim detection and scope.');
