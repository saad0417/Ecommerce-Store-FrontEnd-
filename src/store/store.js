import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import loaderReducer from "./loaderSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        auth: authReducer,
        loader: loaderReducer,
    },
});

// Persist cart to localStorage on every state change
store.subscribe(() => {
  const { items } = store.getState().cart;
  localStorage.setItem("cart", JSON.stringify(items));
});

export default store;