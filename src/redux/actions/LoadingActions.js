import { loadingTypes } from "../types/userTypes";

export const toggleLoading = (value = false) => {
  return {
    type: loadingTypes.TOGGLE_LOADING,
    payload: value,
  };
};
