import { shoppingTypes } from "../types/shoppingTypes";
const initialState = {
  shoppings: [],
  status: "loading",
  currentShopping: {},
};

export const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case shoppingTypes.CREATE_SHOPPING:
      return {
        ...state,
        shoppings: [...state.shoppings, action.payload.item],
        status: action.payload.status,
      };

    case shoppingTypes.GET_SHOPPING:
      return {
        ...state,
        shoppings: [...action.payload],
      };

    case shoppingTypes.CURRENT_SHOPPING:
      return {
        ...state,
        currentShopping: action.payload,
      };

    case shoppingTypes.UPDATE_SHOPPING:
      const dummyShop = [...state.shoppings];
      const index = dummyShop.findIndex(
        (shop) => shop.id === action.payload.shopping.id
      );
      dummyShop[index] = action.payload.shopping;

      return {
        ...state,
        shoppings: [...dummyShop],
        status: action.payload.status,
      };
    default:
      return state;
  }
};