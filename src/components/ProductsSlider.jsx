import React, { useState, useEffect } from "react";
import styles from "../styles/products_slider.module.css";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import ProductCard from "./product/ProductCard";
import { server } from "../App";

const ProductsSlider = () => {
  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${server}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>تسوق عبر الفئات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>رجالي</td>
          </tr>
          <tr>
            <td>حريمي</td>
          </tr>
          <tr>
            <td>أطفال</td>
          </tr>
          <tr>
            <td>اكسسوارات</td>
          </tr>
          <tr>
            <td>ألعاب</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.slider}>
        <div className={styles.cards}>
          <i onClick={handlePrev}>
            <IoArrowForwardCircle />
          </i>
          {visibleProducts.map((product, index) => (
            <div key={index} className="col col-lg-3 col-md-4 col-sm-6 gy-4">
              <ProductCard product={product} minWidth="220px" />
            </div>
          ))}
          <i onClick={handleNext}>
            <IoArrowBackCircle />
          </i>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
