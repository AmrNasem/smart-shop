import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.module.css";


const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <Link to="/">
                        الرئيسية
                    </Link>
                </li>
                <li>
                    <Link to="/products">
                        المنتجات
                    </Link>
                </li>
                <li>
                    <Link>
                        الخدمات
                    </Link>
                </li>
                <li>
                    <Link>
                        نبذة عنّا
                    </Link>
                </li>
                <li>
                    <Link>
                        الشروط والأحكام
                    </Link>
                </li>
                <li>
                    <Link>
                        المدونة
                    </Link>
                </li>
                <li>
                    <Link>
                        اتصل بنا
                    </Link>
                </li>
            </ul>
            <div>
                <img src={require("../assets/Twitter.png")} alt="Twitter" />
                <img src={require("../assets/Facebook.png")} alt="Facebook" />
                <img src={require("../assets/Youtube.png")} alt="Youtube" />
                <img src={require("../assets/Whatsapp.png")} alt="Whatsapp" />
            </div>
            <h5 className="mb-5 text-white text-center">ابق على تواصل</h5>
            <p style={{ fontSize: "0.9rem" }} className="fw-semibold mb-0 text-white text-center">
                جميع الحقوق محفوظة لشركة سمارت كود
            </p>
        </footer>
    );
};

export default Footer;