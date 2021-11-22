import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  const showCart = useSelector((state) => state.ui.cartisVisible);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    fetch("https://reduxprac-e15f1-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
