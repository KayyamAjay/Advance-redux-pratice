import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/cart-slics";
import Notification from "./components/UI/Notification";
let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
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
