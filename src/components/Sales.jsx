import React from "react";
import styles from "../styles/sales.module.css";
import { Row, Col } from "react-bootstrap";
import imgR from "../assets/Sales_R.png";
import imgL from "../assets/Sales_L.png";

const Sales = () => {
  return (
    <Row className={styles.container}>
      <Col className={styles.childs}>
        <img src={imgR} className={styles.img} alt="" />
        <div className={styles.txt}>
          <h1>ملابس أطفال</h1>
          <h3>خصم 50%</h3>
          <h4>تسوق الان</h4>
        </div>
      </Col>
      <Col className={styles.childs} style={{ backgroundColor: "pink" }}>
        <img src={imgL} className={styles.img} alt="" />
        <div className={styles.txt}>
          <h3>خصم كبير</h3>
          <h1>فساتين بناتي</h1>
          <h4>تسوق الان</h4>
        </div>
      </Col>
    </Row>
  );
};

export default Sales;
