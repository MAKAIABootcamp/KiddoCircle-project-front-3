import { walletTypes } from "../types/walletTypes";
const initialState = {
  transactions: [],
  status: "loading",
};

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case walletTypes.CREATE_TRANSACTIONS:
      return {
        ...state,
        transactions: [action.payload.item, ...state.transactions],
        status: action.payload.status,
      };

    case walletTypes.GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload],
      };

    default:
      return state;
  }
};