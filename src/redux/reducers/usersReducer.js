import { usersTypes } from "../types/usersTypes";
const initialState = {
  users: [],
  status: "loading",
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersTypes.GET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };

    default:
      return state;
  }
};