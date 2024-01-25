import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/NavBar.css'
function NavBar() {
  const [active, setactive] = useState("");

  return (
    <>
      <nav className="navBar">
        <div className="navIcons">
          <NavLink to="/">  <img
            src={require("../assets/cartcart.png")}
            alt="Youtube"
            style={{ width: "20px", height: "20px" }}
            className="d-block"
          /></NavLink>
          <NavLink to="/"> <img
            src={require("../assets/Vectorheart.png")}
            alt="Youtube"
            style={{ width: "20px", height: "20px" }}
            className="d-block"
          /> </NavLink>
          <NavLink to="/"> <img
            src={require("../assets/useruser.png")}
            alt="Youtube"
            style={{ width: "20px", height: "20px" }}
            className="d-block"
          /> </NavLink>
          <NavLink to="/">  <img
            src={require("../assets/Group 9291search.png")}
            alt="Youtube"
            style={{ width: "20px", height: "20px" }}
            className="d-block"
          /> </NavLink>

        </div>
        <div className="navLinks">
          <div className="links">
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"} style={{ color: "rgb(127, 211, 223)" }}>الرئيسية</NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"} >المنتجات </NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"}>الخدمات </NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"}>نبذة عنا </NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"}>الشروط والاحكام </NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"}>المدونة </NavLink>
            <NavLink to="/" className={({isactive})=>isactive?"linktitle active":"linktitle"}>اتصل بنا </NavLink>
          </div>
          <div className="smtShop">
            <img
              className="d-block logoImg"
              src={require("../assets/logo.png")}
              alt="Smart Shop"
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar