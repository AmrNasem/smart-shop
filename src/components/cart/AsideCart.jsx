import React, { memo } from "react";
import Modal from "../UI/Modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./CartItem";
import classes from "./AsideCart.module.css";
import { useSelector } from "react-redux";

const AsideCart = ({ handleClosure, className, closing }) => {
  const {
    items: cartItems,
    totalPrice,
    loading,
  } = useSelector((state) => state.cart);

  return (
    <Modal
      style={{ width: "350px", left: "-450px" }}
      className={`transition-main d-flex flex-column top-0 start-0 h-100 ${
        closing ? classes["sliding-left"] : classes["sliding-right"]
      } ${className}`}
      onClick={handleClosure}
      closing={closing}
    >
      <button
        onClick={handleClosure}
        className="btn align-self-start border-0 my-2"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="flex-grow-1 overflow-auto scrollbar-none">
        {loading ? (
          <h6 className="text-center">جارٍ التحميل...</h6>
        ) : cartItems.length ? (
          cartItems.map((item, i) => <CartItem cartItem={item} key={i} />)
        ) : (
          <h6 className="text-center my-3">السلة فارغة.</h6>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 p-3 bg-main">
        <div>
          <span>المجموع: </span>
          <p className="mb-0 fw-semibold">{totalPrice} جنيه</p>
        </div>
        <button className="rounded-3 fw-semibold bg-white border-0 py-2 px-4">
          ادفع
        </button>
      </div>
    </Modal>
  );
};

export default memo(AsideCart);
