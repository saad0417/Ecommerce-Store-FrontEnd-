import { createSlice } from "@reduxjs/toolkit";

const savedItems = JSON.parse(localStorage.getItem("cart")) || [];

const calcTotals = (items) => ({
  totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

const initialState = {
  items: savedItems,
  ...calcTotals(savedItems),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const {  price, ...rest } = action.payload;
      const existingItem = state.items.find((i) => i.id === rest.id);
      const quantity = Number(action.payload.quantity) || 1;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...rest, price, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },  

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      if (!existingItem) return;

      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existingItem.quantity -= 1;
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;

      // ✅ Fixed: always subtract full price regardless of quantity
      state.totalQuantity -= item.quantity;
      state.totalPrice -= item.price * item.quantity;
      state.items = state.items.filter((i) => i.id !== id);
    },

    decreaseItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
      // quantity === 1 → do nothing (use deleteItem to remove)
    },

    increaseItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existing.price;  // add just 1 unit price
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteItem, clearCart, decreaseItem, increaseItem } =
  cartSlice.actions;

export default cartSlice.reducer;