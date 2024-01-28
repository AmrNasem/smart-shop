import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { server } from "../../App";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const SimilarProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${server}/products`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts(data);
      } catch {
        toast.error("Unable to fetch products :(");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    (products.length || loading) && (
      <section style={{ margin: "80px 0" }}>
        <div className="container">
          <h5
            style={{ borderBottom: "2px solid" }}
            className="my-4 w-fit-content mx-auto p-2 border-color-main"
          >
            منتجات مشابهة
          </h5>
          <div className="d-flex gap-3 overflow-auto scrollbar-none">
            {loading
              ? [...Array(3).keys()].map((i) => (
                  <ProductCardSkeleton minWidth="240px" key={i} delay={i} />
                ))
              : products.map((product, i) => (
                  <ProductCard key={i} product={product} minWidth="240px" />
                ))}
          </div>
        </div>
      </section>
    )
  );
};

export default SimilarProduct;
