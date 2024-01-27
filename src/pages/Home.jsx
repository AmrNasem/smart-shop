import React from "react";
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import Sales from "../components/Sales";
import Product from "../components/Product";
import Timer from "../components/Timer";
import ProductsSlider from "../components/ProductsSlider";
import Brands from "../components/Brands";
import Posters from "../components/Posters";
const Home = () => {
  return (
    <div>
      <Slider />
      <Cards />
      <hr style={{ width: "90%", color: "#54A4AF" }} />
      <Sales />
      <Product />
      <Timer />
      <ProductsSlider />
      <Brands />
      <Posters />
    </div>
  );
};

export default Home;
