import React, { useEffect, useState } from "react";
import styles from "../../styles/product.module.css";
// import { FaHeart } from "react-icons/fa";
// import star from "../../assets/star.png";
// import size from "../../assets/size.png";
import axios from "axios";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";
import { server } from "../../App";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/home_products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    (loading || !!products.length) && (
      <div className={`container ${styles.container}`}>
        <h2>احدث المنتجات</h2>
        <hr />
        <div className={styles.cards}>
          <div className="row">
            {loading
              ? [...Array(3).keys()].map((i) => (
                  <div key={i} className="col col-lg-3 col-md-4 col-sm-6 gy-4">
                    <ProductCardSkeleton minWidth="220px" />
                  </div>
                ))
              : products.map((product, index) => (
                  <div
                    key={index}
                    className="col col-lg-3 col-md-4 col-sm-6 gy-4"
                  >
                    <ProductCard product={product} minWidth="220px" />
                  </div>
                  // <div className={styles.card} key={index}>
                  //   <div className={styles.img}>
                  //     <img
                  //       src={require(`../../${product.path}`)}
                  //       alt={`Product ${index + 1}`}
                  //     />
                  //     <FaHeart />
                  //   </div>
                  //   <div className={styles.txt}>
                  //     <div className={styles.disc}>
                  //       <img src={star} alt="Star" />
                  //       <p>{product.title}</p>
                  //       <img src={size} alt="Size" />
                  //     </div>
                  //     <div className={styles.price}>
                  //       <h4>
                  //         {product.price - product.price * (products.discount || 0)} ج م
                  //       </h4>
                  //       <p>
                  //         <del>{product.price} ج م</del>
                  //       </p>
                  //     </div>
                  //   </div>
                  // </div>
                ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Product;
