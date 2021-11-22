import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const dipatch = useDispatch();
  useEffect(() => {
    const sentCartData = async () => {
      dipatch(
        uiActions.shownotification({
          status: "Pending",
          title: "Sending...",
          message: "sending data to cart",
        })
      );
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
      const responseData = response.json();

      dipatch(
        uiActions.shownotification({
          status: "success",
          title: "Successfully",
          message: "sent cart data successfully",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sentCartData().catch((err) => {
      dipatch(
        uiActions.shownotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    });
  }, [cart, dipatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
