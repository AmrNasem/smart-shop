import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import '../css/Header.css'
function Header() {
  const SingleProductName = [
    {
      ProductName: "فستان ازرق عصري "
    }
  ]
  const [ProName, setProName] = useState(SingleProductName[0])
  setProName()
  return (
    <>
      <div className="header">
        <div className="headTitle">
          <div className="Title" style={{ userSelect: "none" }}>تسوق احدث المنتجات العصرية </div>
          <div className="headlinks">
            <NavLink to="/" className="HeadLink">الرئيسية </NavLink>
            <div className="slash" style={{ userSelect: "none" }}>/</div>
            <NavLink to="/" className="HeadLink">المنتجات </NavLink>
            <div className="slash" style={{ userSelect: "none" }}>/</div>
            <div className="HeadLink" style={{ userSelect: "none" }}>{ProName.ProductName}</div >

          </div>
        </div>
      </div>
    </>
  )
}

export default Header