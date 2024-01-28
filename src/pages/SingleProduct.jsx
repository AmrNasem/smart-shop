import React, { useEffect, useState } from "react";
import Product from "../components/product/Product";
import Review from "../components/product/Review";
import SimilarProduct from "../components/product/SimilarProduct";
import Layout from "../components/UI/Layout";
import Banner from "../components/product/Banner";
import { useParams } from "react-router-dom";
import { server } from "../App";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${server}/products/${productId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);
      } catch {
        toast.error("Unable to load the product!");
      }
      setLoading(false);
    };
    fetchProduct();
  });
  return (
    <Layout>
      {loading ? (
        <p className="text-center">جار التحميل..</p>
      ) : (
        product && (
          <>
            <Banner
              second={{ text: "المنتجات", link: "/products" }}
              third={product.title}
            />
            <Product />
            <Review />
            <SimilarProduct />
          </>
        )
      )}
    </Layout>
  );
};

export default SingleProduct;
