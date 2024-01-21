import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBarsStaggered, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import { useSelector } from "react-redux";
import classes from "./Header.module.css";
import AsideCart from "../cart/AsideCart";
import Search from "./Search";

const navLinkClasses =
  "py-lg-3 px-3 py-2 d-block text-decoration-none transition-main text-hover-main";

const Header = () => {
  const cartLength = useSelector((state) => state.cart.items).length;
  const [linksAreShown, setLinksAreShown] = useState(false);
  const [navClosing, setNavClosing] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartClosing, setCartClosing] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);

  useEffect(() => {
    const changeSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  const linksClosure = useCallback(() => {
    if (screenSize < 992) {
      setNavClosing(true);
      setTimeout(() => {
        setLinksAreShown(false);
        setNavClosing(false);
      }, 200);
    }
  }, [screenSize]);

  const handleToggleNavLinks = useCallback(
    (e) => {
      e.stopPropagation();
      if (linksAreShown) {
        linksClosure();
      } else setLinksAreShown(true);
    },
    [linksAreShown, linksClosure]
  );

  useEffect(() => {
    window.addEventListener("click", linksClosure);
    return () => window.removeEventListener("click", linksClosure);
  }, [linksClosure]);

  const handleCartClosure = useCallback(() => {
    setCartClosing(true);
    setTimeout(() => {
      setCartIsOpen(false);
      setCartClosing(false);
    }, 300);
  }, []);

  const handleSearchClosure = useCallback(() => {
    setSearchClosing(true);
    setTimeout(() => {
      setSearchIsOpen(false);
      setSearchClosing(false);
    }, 300);
  }, []);

  return (
    <header className="py-2 py-lg-0">
      <div className="container position-relative my-1 d-flex align-items-center gap-4">
        <Link to="/">
          <img
            className="d-block"
            src={require("../../assets/logo.png")}
            alt="Smart Shop"
          />
        </Link>
        <nav className={`flex-grow-1 ${classes.nav}`}>
          <button
            onClick={handleToggleNavLinks}
            className="btn d-lg-none border-0"
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
          {(linksAreShown || screenSize >= 992) && (
            <ul
              className={`d-lg-flex ${
                navClosing ? classes["list-up"] : ""
              } overflow-hidden bg-white mb-0 list-unstyled`}
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `text-main ${navLinkClasses}`
                      : ` text-black-50 ${navLinkClasses}`
                  }
                  to="/"
                >
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `text-main ${navLinkClasses}`
                      : ` text-black-50 ${navLinkClasses}`
                  }
                  to="/products"
                >
                  المنتجات
                </NavLink>
              </li>
              <li>
                <NavLink className={` text-black-50 ${navLinkClasses}`}>
                  الخدمات
                </NavLink>
              </li>
              <li>
                <NavLink className={` text-black-50 ${navLinkClasses}`}>
                  نبذة عنّا
                </NavLink>
              </li>
              <li>
                <NavLink className={` text-black-50 ${navLinkClasses}`}>
                  الشروط والأحكام
                </NavLink>
              </li>
              <li>
                <NavLink className={` text-black-50 ${navLinkClasses}`}>
                  المدونة
                </NavLink>
              </li>
              <li>
                <NavLink className={` text-black-50 ${navLinkClasses}`}>
                  اتصل بنا
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
        <div className="d-flex align-items-center gap-2">
          <div>
            <button
              onClick={() => setSearchIsOpen(true)}
              style={{ fontSize: "1.1rem" }}
              className="border-0 opacity-70 btn p-1"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {searchIsOpen && (
              <Search
                closing={searchClosing}
                handleClosure={handleSearchClosure}
              />
            )}
          </div>
          <div>
            <button
              style={{ fontSize: "1.1rem" }}
              className="border-0 opacity-70 btn p-1"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            {/* Authentication components here */}
          </div>
          <div>
            <button
              style={{ fontSize: "1.1rem" }}
              className="border-0 opacity-70 btn p-1"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            {/* Favorite list component here */}
          </div>
          <div>
            <button
              onClick={() => setCartIsOpen(true)}
              className="btn p-1 position-relative border-0"
            >
              <span
                style={{ fontSize: "0.65rem", width: "15px", height: "15px" }}
                className="d-flex justify-content-center align-items-center text-white fw-semibold rounded-circle bg-main position-absolute bottom-50 end-0"
              >
                {cartLength}
              </span>
              <CartIcon />
            </button>
            {cartIsOpen && (
              <AsideCart
                closing={cartClosing}
                handleClosure={handleCartClosure}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
