import React from "react";
import Home from "./pages/Home";
import AboutUS from "./pages/AboutUS";
import ContactUS from "./pages/ContactUs";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Terms from "./pages/Terms";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/note" element={<Note />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
