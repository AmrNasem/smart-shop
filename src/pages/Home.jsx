import React from "react";
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import Sales from "../components/Sales";
import Product from "../components/Product";
import Timer from "../components/Timer";
import ProductsSlider from "../components/ProductsSlider";
import Brands from "../components/Brands";
import Posters from "../components/Posters";
import Layout from "../components/UI/Layout";
const Home = () => {
  return (
    <Layout>
      <Slider />
      <Cards />
      <hr style={{ width: "85%", color: "#54A4AF", margin:"auto" }} />
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
