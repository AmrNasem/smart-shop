import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import { fetchCartItems } from "./store/cart-slice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<h3>Home</h3>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<h3>Products</h3>} />
        <Route path="/product/:productId" element={<h3>Single product</h3>} />
        <Route path="*" />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
