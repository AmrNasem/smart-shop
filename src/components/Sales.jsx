import React from "react";
import styles from "../styles/sales.module.css";
import imgR from "../assets/Sales_R.png";
import imgL from "../assets/Sales_L.png";

const Sales = () => {
  return (
    <div
      className={`container gap-3 flex-wrap flex-lg-nowrap ${styles.container}`}
    >
      <div className={` ${styles.childs} flex-grow-1 pt-2 ps-2`}>
        <img src={imgR} className={styles.img} alt="" />
        <div className={styles.txt}>
          <h1>ملابس أطفال</h1>
          <h3>خصم 50%</h3>
          <h4>تسوق الان</h4>
        </div>
      </div>
      <div
        className={` ${styles.childs} flex-grow-1 pt-2 ps-2`}
        style={{ backgroundColor: "#FFDBDF" }}
      >
        <img src={imgL} className={styles.img} alt="" />
        <div className={styles.txt}>
          <h3>خصم كبير</h3>
          <h1>فساتين بناتي</h1>
          <h4>تسوق الان</h4>
        </div>
      </div>
    </div>
  );
};

export default Sales;
