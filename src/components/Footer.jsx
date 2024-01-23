import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 px-2 bg-footer">
      <ul
        className={`py-3 d-flex flex-wrap gap-3 justify-content-center mb-0 list-unstyled`}
      >
        <li>
          <Link className="text-white d-block text-decoration-none" to="/">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link
            className="text-white d-block text-decoration-none"
            to="/products"
          >
            المنتجات
          </Link>
        </li>
        <li>
          <Link className={`text-white d-block text-decoration-none`}>
            الخدمات
          </Link>
        </li>
        <li>
          <Link className={`text-white d-block text-decoration-none`}>
            نبذة عنّا
          </Link>
        </li>
        <li>
          <Link className={`text-white d-block text-decoration-none`}>
            الشروط والأحكام
          </Link>
        </li>
        <li>
          <Link className={`text-white d-block text-decoration-none`}>
            المدونة
          </Link>
        </li>
        <li>
          <Link className={`text-white d-block text-decoration-none`}>
            اتصل بنا
          </Link>
        </li>
      </ul>
      <div className="d-flex flex-wrap justify-content-center my-3 gap-3">
        <img
          src={require("../assets/Twitter.png")}
          alt="Twitter"
          style={{ width: "35px", height: "35px" }}
          className="d-block"
        />
        <img
          src={require("../assets/Facebook.png")}
          alt="Facebook"
          style={{ width: "35px", height: "35px" }}
          className="d-block"
        />
        <img
          src={require("../assets/Youtube.png")}
          alt="Youtube"
          style={{ width: "35px", height: "35px" }}
          className="d-block"
        />
        <img
          src={require("../assets/Whatsapp.png")}
          alt="Whatsapp"
          style={{ width: "35px", height: "35px" }}
          className="d-block"
        />
      </div>
      <h5 className="mb-5 text-white text-center">ابق على تواصل</h5>
      <p
        style={{ fontSize: "0.9rem" }}
        className="fw-semibold mb-0 text-white text-center"
      >
        جميع الحقوق محفوظة لشركة سمارت كود
      </p>
    </footer>
  );
};

export default Footer;
