import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <div className="headTitle">
          <div className="Title" style={{ userSelect: "none" }}>
            تسوق احدث المنتجات العصرية{" "}
          </div>
          <div className="headlinks">
            <NavLink to="/" className="HeadLink">
              الرئيسية{" "}
            </NavLink>
            <div className="slash" style={{ userSelect: "none" }}>
              /
            </div>
            <NavLink to="/" className="HeadLink">
              المنتجات{" "}
            </NavLink>
            <div className="slash" style={{ userSelect: "none" }}>
              /
            </div>
            <div className="HeadLink" style={{ userSelect: "none" }}>
              فستان ازرق عصري
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
