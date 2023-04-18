import { IProduct } from '@/interface/product';

export const getUniqueSpaces = (products: IProduct[]) => [
  ...new Set(products.map((product) => product.spaceCategory)),
];

export const generateBoolMappedObj = (
  products: IProduct[],
  spaces: string[],
) => {
  const spaceList = getUniqueSpaces(products).reduce((acc, cur) => {
    if (spaces.includes(cur)) return { ...acc, [cur]: true };
    return { ...acc, [cur]: false };
  }, {});

  return spaceList;
};

export const getMaxPrice = (products: IProduct[]) =>
  Math.max(...products.map((product) => product.price));
