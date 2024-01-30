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
import SingleProduct from "./pages/SingleProduct";

export const server = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="App d-flex flex-column">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h3>Home</h3>
            </main>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="*" />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
