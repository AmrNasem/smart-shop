import React from "react";
import { Row, Col } from "react-bootstrap";
import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../assets/Smart_Shop_Logo.png";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <Row className={styles.container}>
      <Col className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </Col>

      <Col className={styles.pages}>
        <Link to="/">الرئيسية</Link>
        <Link to="/products">المنتجات</Link>
        <Link to="/services">الخدمات</Link>
        <Link to="/aboutus">نبذة عنا</Link>
        <Link to="/terms">الشروط و الأحكام</Link>
        <Link to="/note">المدونة</Link>
        <Link to="/contactus">اتصل بنا</Link>
      </Col>

      <Col className={styles.icons}>
        <i>
          <Link to="/cart">
            <FiShoppingCart />
          </Link>
        </i>
        <i>
          <Link to="/favorites">
            <FiHeart />
          </Link>
        </i>
        <i>
          <Link to="/profile">
            <FiUser />
          </Link>
        </i>
        <i>
          <FiSearch />
        </i>
      </Col>
    </Row>
  );
};

export default Navbar;
