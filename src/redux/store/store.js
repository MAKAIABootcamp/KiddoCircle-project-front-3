import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { loadingReducer } from "../reducers/LoadingReducer";

const reducer = {
  user: userReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
