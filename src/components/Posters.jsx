import React from "react";
import Poster1 from "../assets/Poster1.png";
import Poster2 from "../assets/Poster2.png";
import Poster3 from "../assets/Poster3.png";
import styles from "../styles/posters.module.css";

const Posters = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src={Poster1} alt="" />
          <div className={styles.txt}>
            <h3>استمتعي بأجواء مبهره فى الخروجات</h3>
            <p>مع باقه من اجمل الملابس الكاجوال البناتي المودرن</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.txt}>
            <h3>اشتري اللي يخليك شيك</h3>
            <p>مع احدث واجمل ملابش الشباب الحديثه</p>
          </div>
          <img src={Poster2} alt="" />
        </div>
        <div className={styles.card}>
          <img src={Poster3} alt="" />
          <div className={styles.txt}>
            <h3>مع اجمل صيحات الموضه والفاشون</h3>
            <p>اطلاله فريده مع افضل تشكيله ملابس شبابي</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posters;
