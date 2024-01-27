import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../styles/cards.module.css";
import { CiDeliveryTruck, CiMobile2, CiWallet, CiGift } from "react-icons/ci";

const Cards = () => {
  return (
    <div className={`flex-wrap gap-3 container ${styles.container}`}>
      <div className={`flex-grow-1 align-items-start ${styles.row}`}>
        <div
          className={`border fs-3 d-flex justify-content-center align-items-center rounded-3 p-2 ${styles.icons}`}
        >
          <CiDeliveryTruck className="d-block" />
        </div>
        <div className={styles.text}>
          <h3>توصيل مجاني</h3>
          <p>للطلبات أعلي من 200 جنيه</p>
        </div>
      </div>
      <div className={`flex-grow-1 align-items-start ${styles.row}`}>
        <div
          className={`border fs-3 d-flex justify-content-center align-items-center rounded-3 p-2 ${styles.icons}`}
        >
          <CiDeliveryTruck className="d-block" />
        </div>
        <div className={styles.text}>
          <h3>دعم فني</h3>
          <p>دعم علي مدار الساعة</p>
        </div>
      </div>
      <div className={`flex-grow-1 align-items-start ${styles.row}`}>
        <div
          className={`border fs-3 d-flex justify-content-center align-items-center rounded-3 p-2 ${styles.icons}`}
        >
          <CiDeliveryTruck className="d-block" />
        </div>
        <div className={styles.text}>
          <h3>استرجاع الأموال</h3>
          <p>استرداد امن لأموالك أو الاستبدال</p>
        </div>
      </div>
      <div className={`flex-grow-1 align-items-start ${styles.row}`}>
        <div
          className={`border fs-3 d-flex justify-content-center align-items-center rounded-3 p-2 ${styles.icons}`}
        >
          <CiDeliveryTruck className="d-block" />
        </div>
        <div className={styles.text}>
          <h3>عروض حصرية</h3>
          <p>خصومات كبيرة علي منتجاتنا</p>
        </div>
      </div>

      {/* <Col className={styles.cards}>
        <Row className={styles.row}>
          <Col className={styles.icons}>
            <CiMobile2 />
          </Col>
          <Col className={styles.text}>
            <h3>دعم فني</h3>
            <p>دعم علي مدار الساعة</p>
          </Col>
        </Row>
      </Col>

      <Col className={styles.cards}>
        <Row className={styles.row}>
          <Col className={styles.icons}>
            <CiWallet />
          </Col>
          <Col className={styles.text}>
            <h3>استرجاع الأموال</h3>
            <p>استرداد امن لأموالك أو الاستبدال</p>
          </Col>
        </Row>
      </Col>

      <Col className={styles.cards}>
        <Row className={styles.row}>
          <Col className={styles.icons}>
            <CiGift />
          </Col>
          <Col className={styles.text}>
            <h3>عروض حصرية</h3>
            <p>خصومات كبيرة علي منتجاتنا</p>
          </Col>
        </Row>
      </Col> */}
    </div>
  );
};

export default Cards;
