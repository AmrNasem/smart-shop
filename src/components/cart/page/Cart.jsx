import React, { useState } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { toast } from "react-toastify";

const Cart = ({ className }) => {
  const { items: cartItems, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [clearLoading, setClearLoading] = useState(false);
  const authedUser = useSelector((state) => state.auth.user);

  const hanldeClearCart = () => {
    if (authedUser) {
      setClearLoading(true);
      fetch(`http://localhost:8000/users/${authedUser.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...authedUser, cart: [] }),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(() => {
          setClearLoading(false);
          dispatch(cartActions.resetCart());
        })
        .catch(() => {
          setClearLoading(false);
          toast.error("Unable to wipe the cart :(");
        });
    } else dispatch(cartActions.resetCart());
  };

  return (
    <div style={{ minWidth: "50%" }} className={className}>
      <h4 className="mb-4">سلة التسوق</h4>
      <div>
        <div className="flex-nowrap row border-bottom py-2 gap-3 pe-sm-5">
          <h5 className="col col-sm-8 col-lg-5 text-center text-sm-end ">
            المنتج
          </h5>
          <h5 className="col col-lg-2 d-none d-sm-block text-center">السعر</h5>
          <h5 className="col-2 d-none d-lg-block text-center">الكمية</h5>
          <h5 className="col-2 d-none d-lg-block text-center">المجموع</h5>
        </div>
        <div>
          {loading ? (
            <h6 className="text-center my-3">جارٍ التحميل...</h6>
          ) : cartItems.length ? (
            cartItems.map((item, i) => (
              <CartItem deleting={clearLoading} cartItem={item} key={i} />
            ))
          ) : (
            <h6 className="text-center my-3">السلة فارغة.</h6>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/products" className="fw-semibold text-main btn">
            واصل التسوق
          </Link>
          {!!cartItems.length && (
            <button
              onClick={hanldeClearCart}
              className="fw-semibold text-main btn"
            >
              مسح السلة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
