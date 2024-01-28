import React from "react";
import Slider from "../components/home/Slider";
import Cards from "../components/home/Cards";
import Sales from "../components/home/Sales";
import Product from "../components/home/Product";
import Timer from "../components/home/Timer";
import ProductsSlider from "../components/home/ProductsSlider";
import Brands from "../components/home/Brands";
import Posters from "../components/home/Posters";
import Layout from "../components/UI/Layout";
const Home = () => {
  return (
    <Layout>
      <Slider />
      <Cards />
      <hr style={{ width: "85%", color: "#54A4AF", margin: "auto" }} />
      <Sales />
      <Product />
      <Timer />
      <ProductsSlider />
      <Brands />
      <Posters />
    </Layout>
  );
};

export default Home;
