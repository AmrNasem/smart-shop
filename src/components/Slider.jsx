import React from "react";
import styles from "../styles/slider.module.css";
import { Row, Col } from "react-bootstrap";
import img from "../assets/Slider_Image.png";
import {
  IoArrowBackCircle,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

const Slider = () => {
  return (
    <div className={styles.container}>
      <Row className={styles.slide}>
        <Col className={styles.text}>
          <h3>براندات نسائي عالمية</h3>
          <h1>احدث ادوات الجمال</h1>
          <h3>براندات نسائي عالمية</h3>
          <button className={styles.btn}>اكتشف الان</button>
        </Col>
        <Col className={styles.img}>
          <img src={img} />
        </Col>
      </Row>
      <Row className={styles.icons}>
        <Col>
          <i>
            <IoArrowForwardCircleOutline />
          </i>
          <i>
            <BsThreeDots />
          </i>
          <i>
            <IoArrowBackCircle />
          </i>
        </Col>
      </Row>
    </div>
  );
};
export default Slider;
