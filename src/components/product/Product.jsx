import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Product.css";
import { useState } from "react";
import img2 from "../../images/Rectangle 3691p6.png";
import img1 from "../../images/Rectangle 3690mainProduct.png";
import img3 from "../../images/Rectangle 3693p4.png";
import img4 from "../../images/Rectangle 3692p5.png";

const productDetails = [
  {
    id: 1,
    color: "blue",
    title: "فستان ازرق عصري ",
    price: 2000,
    discount: 0.75,
    rate: 5,
    about:
      "مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
    path: [img1, img2, img3, img4],
    weight: ["2 كيلو", "3 كيلو ", "5 كيلو "],
    reviews: [
      {
        reviewRate: 5,
        reviewTitle: "منتج رائع. التعبئة والتغليف كانت جيدة أيضا!",
        reviewText:
          "مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
        reviewName: "احمد بلال ",
        reviewDate: ">9 اغسطس, 2022 ",
      },
    ],
  },
];

function Product({ product }) {
  const [count, setCount] = useState(1);
  const [MainImg, setMainImg] = useState(productDetails[0].path[0]);

  const WColorHandler = (e) => {
    [...e.target.parentNode.children].forEach((element) => {
      element.style.backgroundColor = "white";
    });

    e.target.style.backgroundColor = "gray";
  };
  const MainImgHandler = (e) => {
    setMainImg(e.target.src);
  };

  const addFavHandler = (e) => {
    e.target.style.color = "blue";
  };

  return (
    <>
      <div className="productDiv">
        <div className="aboutPro">
          <div className="details" style={{ direction: "rtl" }}>
            <h1 className="proName fs-3">{productDetails[0].title}</h1>
            <h5 className="Price fs-6">
              {productDetails[0].discount * productDetails[0].price} ج.م -
            </h5>{" "}
            <h5 className="Price fs-6">
              <s>{productDetails[0].price} ج.م </s>{" "}
            </h5>
            <div className="star">
              {[...Array(5).keys()].map((i) =>
                i < productDetails[0].rate ? (
                  <h3 key={i}>
                    <i className="fa-solid fa-star"></i>
                  </h3>
                ) : (
                  <h3 key={i}>
                    <i className="fa-regular fa-star"></i>
                  </h3>
                )
              )}
              (50)
            </div>
            <h3 className="aboutProduct proName fs-6 text-black-50">
              {productDetails[0].about}
            </h3>
            <h3 className="colorProduct proName fs-4">اللون : </h3>
            <div className="colors">
              {productDetails[0].path.map((path, i) => (
                <img
                  key={i}
                  className="colorImg"
                  onClick={MainImgHandler}
                  src={path}
                  alt="#"
                ></img>
              ))}
            </div>
            <h3 className="weightProduct proName fs-4">الوزن : </h3>
            <div className="weights">
              {productDetails[0].weight.map((w, i) => (
                <NavLink
                  to=""
                  className={"weight1"}
                  key={i}
                  onClick={WColorHandler}
                >
                  {w}
                </NavLink>
              ))}
            </div>
            <div className="Counter">
              <div
                className="inc"
                onClick={() => setCount((prev) => prev + 1)}
                style={{
                  userSelect: "none",
                  cursor: "pointer",
                  backgroundColor: "rgba(217, 217, 217, 0.5)",
                  borderLeft: "1px solid #00000020",
                  padding: "0 12px",
                }}
              >
                {" "}
                +{" "}
              </div>
              <div
                className="count"
                style={{ userSelect: "none", padding: "0 7px" }}
              >
                {count}
              </div>
              <div
                className="dec"
                onClick={() =>
                  setCount((prev) => (prev === 1 ? prev : prev - 1))
                }
                style={{
                  userSelect: "none",
                  cursor: "pointer",
                  backgroundColor: "rgba(217, 217, 217, 0.5)",
                  borderRight: "1px solid #00000020",
                  padding: "0 12px",
                }}
              >
                {" "}
                -{" "}
              </div>
            </div>
            <div className="addCart proName" data-name="addCart">
              اضف للسلة{" "}
            </div>
            <div
              className="addFav proName"
              data-name="addFav"
              onClick={addFavHandler}
            >
              <i className="fa-solid fa-heart favHeart"></i> اضف للمفضلة
            </div>
            <div className="buyNow proName" data-name="buyNow">
              اشتري الان
            </div>
            <div className="socialMedia">
              <h1
                className="proName"
                style={{ width: "50%", fontWeight: "600", fontSize: "20px" }}
              >
                {" "}
                شارك عبر مواقع التواصل{" "}
              </h1>
              <div
                className="socialIcons"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <NavLink to="">
                  {" "}
                  <img
                    src={require("../../assets/Twitter.png")}
                    alt="Twitter"
                    style={{ width: "35px", height: "35px" }}
                    className="d-block"
                  />
                </NavLink>
                <NavLink to="">
                  <img
                    src={require("../../assets/Facebook.png")}
                    alt="Facebook"
                    style={{ width: "35px", height: "35px" }}
                    className="d-block"
                  />
                </NavLink>
                <NavLink to="">
                  <img
                    src={require("../../assets/Youtube.png")}
                    alt="Youtube"
                    style={{ width: "35px", height: "35px" }}
                    className="d-block"
                  />
                </NavLink>
                <NavLink to="">
                  <img
                    src={require("../../assets/Whatsapp.png")}
                    alt="Whatsapp"
                    style={{ width: "35px", height: "35px" }}
                    className="d-block"
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div
          className="proImg"
          style={{
            gridTemplateColumns: `repeat(${productDetails[0].path.length},17%)`,
          }}
        >
          <img
            className="mainImg"
            src={MainImg}
            alt="#"
            style={{ gridColumn: `1/${productDetails[0].path.length + 1}` }}
          ></img>
          {productDetails[0].path.map((path, i) => (
            <img
              className="Img2"
              key={i}
              onClick={MainImgHandler}
              src={path}
              alt="#"
            ></img>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
