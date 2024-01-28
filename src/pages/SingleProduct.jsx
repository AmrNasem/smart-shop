import React from "react";
import Header from "../components/Header";
import Product from "../components/Product2";
import Review from "../components/Review";
import Layout from "../components/UI/Layout";

const SingleProduct = () => {
  return (
    <Layout>
      <Header />
      <Product />
      <Review />
    </Layout>
  );
};

export default SingleProduct;
