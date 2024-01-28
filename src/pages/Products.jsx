import React from "react";
import ProductsSection from "../components/product/ProductsSection";
import SimilarProduct from "../components/product/SimilarProduct";
import Layout from "../components/UI/Layout";

const Products = () => {
  return (
    <Layout>
      <ProductsSection />
      <SimilarProduct />
    </Layout>
  );
};

export default Products;
