import { loadingTypes } from "../types/userTypes";

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadingTypes.TOGGLE_LOADING:
      return !state;

    default:
      return state;
  }
};
