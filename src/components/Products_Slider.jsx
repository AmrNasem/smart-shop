import React, { useState } from "react";
import styles from "../styles/products_slider.module.css";
import star from "../assets/star.png";
import size from "../assets/size.png";
import P1 from "../assets/P1.png";
import P2 from "../assets/P2.png";
import P3 from "../assets/P3.png";
import P4 from "../assets/P4.png";
import P5 from "../assets/P5.png";
import P6 from "../assets/P6.png";
import P7 from "../assets/P7.png";
import P8 from "../assets/P8.png";
import { FaHeart } from "react-icons/fa";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const Products_Slider = () => {
  const images = [P1, P2, P3, P4, P5, P6, P7, P8];
  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + itemsPerPage < images.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleImages = images.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>تسوق عبر الفئات</th>
          </tr>
        </thead>
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
      </table>
      <div className={styles.slider}>
        <div className={styles.cards}>
          <i onClick={handlePrev}>
            <IoArrowForwardCircle />
          </i>
          {visibleImages.map((img, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.img}>
                <img src={img} alt={`Product ${startIndex + index + 1}`} />
                <FaHeart />
              </div>
              <div className={styles.txt}>
                <div className={styles.disc}>
                  <img src={star} alt="Star" />
                  <p>بلوزة قطنيه بيضاء</p>
                  <img src={size} alt="Size" />
                </div>
                <div className={styles.price}>
                  <h4>800 ج م</h4>
                  <p>
                    <del>800 ج م</del>
                  </p>
                </div>
              </div>
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

export default Products_Slider;
