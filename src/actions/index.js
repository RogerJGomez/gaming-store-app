
import {ADD_PRODUCT, REMOVE_PRODUCT, PLUS_PRODUCT, MINUS_PRODUCT, PURCHASE_PRODUCTS} from './types'

export const add = (product) => {
    return {
      type: ADD_PRODUCT,
      product
    }
}


export const remove = (product) => {
    return {
      type: REMOVE_PRODUCT,
      product
    }
}

export const plus = (product) => {
    return {
      type: PLUS_PRODUCT,
      product
    }
}

export const minus = (product) => {
    return {
      type: MINUS_PRODUCT,
      product
    }
}


export const purchase = (product) => {
    return {
      type: PURCHASE_PRODUCTS,
      product
    }
}



