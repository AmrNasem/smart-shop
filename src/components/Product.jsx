import React, { useEffect, useState } from "react";
import styles from "../styles/product.module.css";
import { FaHeart } from "react-icons/fa";
import star from "../assets/star.png";
import size from "../assets/size.png";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>احدث المنتجات</h2>
      <hr />
      <div className={styles.cards}>
        {products.map((product, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.img}>
              <img
                src={require(`../assets/${product.imgSrc}`)}
                alt={`Product ${index + 1}`}
              />
              <FaHeart />
            </div>
            <div className={styles.txt}>
              <div className={styles.disc}>
                <img src={star} alt="Star" />
                <p>{product.description}</p>
                <img src={size} alt="Size" />
              </div>
              <div className={styles.price}>
                <h4>{product.price} ج م</h4>
                <p>
                  <del>{product.oldPrice} ج م</del>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
