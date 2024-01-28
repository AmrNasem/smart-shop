import React from "react";
import ProductsSection from "../components/product/ProductsSection";
import SimilarProduct from "../components/product/SimilarProduct";
import Layout from "../components/UI/Layout";
import Banner from "../components/product/Banner";

const Products = () => {
  return (
    <Layout>
      <Banner second={{ text: "المنتجات", link: "/products" }} />
      <ProductsSection />
      <SimilarProduct />
    </Layout>
  );
};

export default Products;
