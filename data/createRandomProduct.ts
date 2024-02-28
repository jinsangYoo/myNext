import type { IProduct } from './types/iproduct-type'
import * as F from '../utils'

export const createRandomProduct = (randomValue?: number): IProduct => {
  return {
    id: F.randomId(),
    name: F.randomProduct() + randomValue,
    category: F.randomDepartment() + randomValue,
    price: F.randomPrice(),
    quantity: randomValue ?? 0,
    productId: F.randomWord() + randomValue,
    optionCodeName: F.randomProductMaterial() + randomValue
  }
}
