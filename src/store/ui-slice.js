import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartisVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartisVisible = !state.cartisVisible;
    },
    shownotification(state, action) {
      state.notification = {
        title: action.payload.title,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
