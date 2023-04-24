import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { walletReducer } from "../reducers/walletReduer";
import { shoppingReducer } from "../reducers/shoppingReducer";
import { productsReducer } from "../reducers/ProductsReducer";
import { usersReducer } from "../reducers/usersReducer";
import { loadingReducer } from "../reducers/LoadingReducer";

const reducer = {
  user: userReducer,
  shopping: shoppingReducer,
  wallet: walletReducer,
  products: productsReducer,
  allUsers: usersReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
