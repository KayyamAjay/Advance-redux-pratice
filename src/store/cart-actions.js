import { cartActions } from "./cart-slics";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxprac-e15f1-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("getting data failed");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalquantity: cartData.totalquantity,
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
          body: JSON.stringify({
            items: cart.items,
            totalquantity: cart.totalquantity,
          }),
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
