import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";

export const server = "https://smart-shop.netlify.app/.netlify/functions/api";

function App() {
  const authedUser = useSelector((state) => state.auth.user);

  return (
    <div className="App d-flex flex-column">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authedUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authedUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="*" element={<h3>Not found</h3>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
