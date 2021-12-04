import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalquantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    additems(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalquantity++;
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
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalprice = existingItem.totalprice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "Pending",
        title: "Sending...",
        message: "sending data to cart",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxprac-e15f1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.shownotification({
          status: "success",
          title: "Successfully",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
