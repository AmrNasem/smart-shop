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
import Products from "./pages/Products";
import { Login } from "./authentication/Login";
import { Signup } from "./authentication/Signup";
import Home from "./pages/Home";
import Product from "./components/Product2";
import Review from "./components/Review";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="App d-flex flex-column">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/product/:productId"
          element={
            <>
              <Product />
              <Review />
            </>
          }
        />
        <Route path="*" />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
