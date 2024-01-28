import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ second, third }) => {
  return (
    <section
      className="position-relative p-4 justify-content-end align-items-center d-flex"
      style={{ height: "330px", margin: "4rem 0" }}
    >
      <img
        className="d-block position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        style={{ zIndex: -1 }}
        src={require("../../images/Header.png")}
        alt=""
      />
      <div style={{ flexBasis: "80%" }} className="text-center">
        <h2
          className="mb-5 text-white"
          style={{ userSelect: "none", fontWeight: "800" }}
        >
          تسوق احدث المنتجات العصرية{" "}
        </h2>
        <div>
          <Link className="text-decoration-none text-white" to="/">
            الرئيسية{" "}
          </Link>
          {second && (
            <>
              <span
                className="d-inline-block mx-2"
                style={{ color: "red", userSelect: "none" }}
              >
                /
              </span>
              <Link
                className="text-decoration-none text-white"
                to={second.link}
              >
                {second.text}
              </Link>
            </>
          )}
          {third && (
            <>
              <span
                className="d-inline-block mx-2"
                style={{ color: "red", userSelect: "none" }}
              >
                /
              </span>
              <span
                className="text-white d-inline-block"
                style={{ userSelect: "none" }}
              >
                {third}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
