import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { walletReducer } from "../reducers/walletReduer";
import { shoppingReducer } from "../reducers/shoppingReducer";
import { productsReducer } from "../reducers/ProductsReducer";

const reducer = {
    user: userReducer,
    shopping: shoppingReducer,
    wallet: walletReducer,
    products: productsReducer,
};

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
