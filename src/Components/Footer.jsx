import React from 'react'
import '../css/Footer.css'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="links">
          <NavLink to="/g" className="linkFooter">الرئيسية</NavLink>
          <NavLink to="/f" className="linkFooter">المنتجات </NavLink>
          <NavLink to="/e" className="linkFooter">الخدمات </NavLink>
          <NavLink to="/d" className="linkFooter">نبذة عنا </NavLink>
          <NavLink to="/c" className="linkFooter">الشروط والاحكام </NavLink>
          <NavLink to="/b" className="linkFooter">المدونة </NavLink>
          <NavLink to="/a" className="linkFooter">اتصل بنا </NavLink>
        </div>
        <div className="ContactIcons">
          <NavLink to="/"><img
            src={require("../assets/Whatsapp.png")}
            alt="Whatsapp"
            style={{ width: "35px", height: "35px" }}
            className="d-block"
          /></NavLink>
          <NavLink to="/"><img
            src={require("../assets/Youtube.png")}
            alt="Youtube"
            style={{ width: "35px", height: "35px" }}
            className="d-block"
          /></NavLink>
          <NavLink to="/"><img
            src={require("../assets/Facebook.png")}
            alt="Facebook"
            style={{ width: "35px", height: "35px" }}
            className="d-block"
          /></NavLink>
          <NavLink to="/"> <img
            src={require("../assets/Twitter.png")}
            alt="Twitter"
            style={{ width: "35px", height: "35px" }}
            className="d-block"
          /></NavLink>
        </div>
        <h1 className="linkFooter contactUs">ابق على تواصل </h1>
        <h5 className="copyRights linkFooter" style={{ position: "relative", left: "37%", top: "32%", fontSize: "16px" }}>جميع حقوق النشر محفوظه لشركة سمارت كود</h5>
      </div>
    </>
  )
}

export default Footer