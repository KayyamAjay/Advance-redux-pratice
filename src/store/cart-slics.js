import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalquantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalquantity = action.payload.totalquantity;
      state.items = action.payload.items;
    },
    additems(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalquantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          price: newItem.price,
          id: newItem.id,
          quantity: 1,
          totalprice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalprice = existingItem.totalprice + newItem.price;
      }
    },
    removeitems(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalquantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalprice = existingItem.totalprice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
