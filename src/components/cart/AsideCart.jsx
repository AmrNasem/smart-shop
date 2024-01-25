import React, { memo } from "react";
import Modal from "../UI/Modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./CartItem";
import classes from "./AsideCart.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";

const AsideCart = ({ handleClosure, className, closing }) => {
  const {
    items: cartItems,
    totalPrice,
    loading,
  } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <Modal
      style={{ width: "350px", left: "-450px" }}
      className={`bg-white transition-main d-flex flex-column top-0 start-0 h-100 ${
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
          [...Array(3).keys()].map((i) => (
            <AsideItemSkeleton key={i} delay={i} />
          ))
        ) : cartItems.length ? (
          cartItems.map((item, i) => (
            <CartItem
              handleCartClosure={handleClosure}
              cartItem={item}
              key={i}
            />
          ))
        ) : (
          <h6 className="text-center my-3">السلة فارغة.</h6>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 p-3 bg-main">
        <div>
          <span>المجموع: </span>
          <p className="mb-0 fw-semibold">{totalPrice} جنيه</p>
        </div>
        <button
          onClick={() => {
            navigate("/cart");
            handleClosure();
          }}
          className="rounded-3 fw-semibold bg-white border-0 py-2 px-4"
        >
          ادفع
        </button>
      </div>
    </Modal>
  );
};

export default memo(AsideCart);

export const AsideItemSkeleton = () => {
  return (
    <div className="d-flex gap-3 py-1 px-3">
      <Skeleton style={{ width: "91px", height: "91px" }} />
      <div className="flex-grow-1 d-flex flex-column justify-content-between">
        <Skeleton className="mt-2 w-75" />
        <div className="d-flex mt-1 mb-2 w-75 justify-content-between gap-2">
          <Skeleton className="w-25" />
          <Skeleton className="" style={{ width: "60px" }} />
        </div>
        <Skeleton className="my-2" style={{ width: "90px" }} />
      </div>
    </div>
  );
};
