import { productsTypes } from "../types/productsTypes";
const initialState = {
  products: [],
  status: "loading",
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.product],
        status: action.payload.status,
      };

    case productsTypes.GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };

    case productsTypes.UPDATE_PRODUCT:
      const dummyProduct = [...state.products];
      const index = dummyProduct.findIndex(
        (product) => product.id === action.payload.product.id
      );
      dummyProduct[index] = action.payload.product;

      return {
        ...state,
        products: [...dummyProduct],
        status: action.payload.status,
      };
    default:
      return state;
  }
};