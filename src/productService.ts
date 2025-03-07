import type {ProductType} from './ProductType.ts';

let promise: Promise<readonly ProductType[]> | undefined;

/**
 * Fetch products
 */
export const getProducts = (): Promise<readonly ProductType[]> => {
  promise ??= (async () => {
    try {
      const res = await fetch('https://api.jsonbin.io/v3/b/6630fd9be41b4d34e4ecd1f9');
      const body = await res.json();
      return body.record;
    } catch (error) {
      promise = undefined;
    }
  })();
  return promise;
};

/**
 * Fetch product
 */
export const getProduct = async (
  id: number
): Promise<ProductType | undefined> => {
  const products = await getProducts();
  return products.find((product) => product.id === id);
};
