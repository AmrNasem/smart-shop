import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FiShoppingCart, FiHeart, FiUser, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../assets/Smart_Shop_Logo.png';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <Row className={styles.container}>
      <Col className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </Col>

      <Col className={styles.pages}>
        <a className={styles.active}>
          <Link to="/">الرئيسية</Link>
        </a>
        <a>
          <Link to="/products">المنتجات</Link>
        </a>
        <a>
          <Link to="/services">الخدمات</Link>
        </a>
        <a>
          <Link to="/aboutus">نبذة عنا</Link>
        </a>
        <a>
          <Link to="/terms">الشروط و الأحكام</Link>
        </a>
        <a>
          <Link to="/note">المدونة</Link>
        </a>
        <a>
          <Link to="/contactus">اتصل بنا</Link>
        </a>
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
