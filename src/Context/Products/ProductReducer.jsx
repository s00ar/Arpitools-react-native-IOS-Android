import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_TO_CART,
  DELETE_ITEM_CART,
  SUM_ALL,
  DELETE_ALL_CART,
  SERCH_PRODUCT,
  SERCH_VALUE
} from "../types";

export default (state, action) => {
  const {payload, type} = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productsArray: payload,
        constProductArray: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartArray: payload,
      };
    case DELETE_ITEM_CART:
      return {
        ...state,
        cartArray: payload
      };
    case SUM_ALL:
      return {
        ...state,
        totalCart: payload
      }
    case DELETE_ALL_CART:
      return {
        ...state,
        cartArray: payload
      }
    case SERCH_PRODUCT:
      return {
        ...state,
        productsArray: payload
      }
    case SERCH_VALUE:
      return {
        ...state,
        value: payload
      }
    default:
      return state;
  }
};
