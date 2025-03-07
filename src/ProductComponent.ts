import {escape} from 'lodash';
import {IbuComponent} from './IbuComponent.ts';
import {PercentageComponent} from './PercentageComponent.ts';
import type {ProductType} from './ProductType.ts';

/**
 * Render product card
 */
export const ProductComponent = (
  {id, name, ibu, abv, image_url}: ProductType
): string => `
<li>
  <a href="${import.meta.env.BASE_URL}products/${id}" data-ibu="${ibu}">
    <img src="${escape(image_url)}" alt="${escape(name)}"/>
    <header>
      ${escape(name)}
    </header>
    ${IbuComponent(ibu)}
    <aside>
      <div>
        ${PercentageComponent(abv)}
      </div>
    </aside>
  </a>
</li>`;
