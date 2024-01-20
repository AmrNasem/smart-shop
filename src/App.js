import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useCallback, useEffect, useState } from "react";
import AsideCart from "./components/cart/AsideCart";
import { fetchCartItems } from "./store/cart-slice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleClosure = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setCartIsOpen(false);
      setClosing(false);
    }, 500);
  }, []);

  return (
    <div className="App">
      {cartIsOpen && (
        <AsideCart closing={closing} handleClosure={handleClosure} />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h3>Home</h3>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<h3>Products</h3>} />
          <Route path="/product/:productId" element={<h3>Single product</h3>} />
          <Route path="*" />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
