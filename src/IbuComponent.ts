import './IbuComponent.less';

/**
 * Render IBU label
 */
export const IbuComponent = (
  value: number
): string => `
<dl class="ibu">
  <dt>
    IBU
  </dt>
  <dd>
    ${value}
  </dd>
</dl>`;
