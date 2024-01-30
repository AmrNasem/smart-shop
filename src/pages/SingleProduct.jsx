import React, { useEffect, useState } from "react";
import ProductDetails from "../components/product/ProductDetails";
import { useParams } from "react-router-dom";
import { server } from "../App";
import { toast } from "react-toastify";
import Reviews from "../components/product/Reviews";
import SimilarProduct from "../components/product/SimilarProduct";
import ProductDetailsSkeleton from "../components/skeleton/ProductDetailsSkeleton";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${server}/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        toast.error("Error loading the product!");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  return (
    <main>
      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <ProductDetails product={product} />
      )}
      <Reviews loading={loading} product={product} setProduct={setProduct} />
      <SimilarProduct />
    </main>
  );
};

export default SingleProduct;
