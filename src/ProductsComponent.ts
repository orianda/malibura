import {ProductComponent} from './ProductComponent.ts';
import type {ProductType} from './ProductType.ts';
import "./ProductsComponent.less"

/**
 * Render products
 */
export const ProductsComponent = (
  products: readonly ProductType[]
): string => `
<ol class="products">
  ${products
  .slice()
  .sort((productA, productB) => productA.name.localeCompare(productB.name))
  .map(ProductComponent)
  .join('')}
</ol>
`;
