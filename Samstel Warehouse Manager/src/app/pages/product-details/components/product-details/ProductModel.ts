export interface IProduct {
  id?: string;
  name: string;
  modelNo: string;
  factoryPrice: number;
  category: string;
  retailPrice: number;
  perCtn: number;
  ctnQty: number;
  stockCount: number;
  onHold: boolean;
  reorderLevel: number;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultProduct: IProduct = {
  id: "",
  name: "",
  modelNo: "",
  factoryPrice: 0,
  category: "",
  retailPrice: 0,
  perCtn: 0,
  ctnQty: 0,
  stockCount: 0,
  onHold: false,
  reorderLevel: 0,
};

export const areProductsEqual = (productA: IProduct, productB: IProduct) => {
  const keys1 = Object.keys(productA);
  const keys2 = Object.keys(productB);
  console.log("checking");
  console.log(productA);
  console.log(productB);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (productA[key] !== productB[key]) {
      return false;
    }
  }

  return true;
};
