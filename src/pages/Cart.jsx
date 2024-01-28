import React from "react";
import Coupon from "../components/cart/page/Coupon";
import CartComponent from "../components/cart/page/Cart";
import SimilarProduct from "../components/product/SimilarProduct";
import Layout from "../components/UI/Layout";

const Cart = () => {
  return (
    <Layout>
      <div className="container my-5 d-flex gap-5 align-items-start flex-wrap justify-content-between">
        <CartComponent className="flex-grow-1" />
        <Coupon className="flex-grow-1" />
      </div>
      <SimilarProduct />
    </Layout>
  );
};

export default Cart;
