import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import Counter from "../Counter";
import { Link } from "react-router-dom";
import { cartActions } from "../../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../../store/authSlice";
import { server } from "../../../App";

const CartItem = ({ className, cartItem, deleting }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(
    (e) => {
      e?.preventDefault();
      if (authedUser) {
        setDeleteLoading(true);
        fetch(`${server}/users/${authedUser.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...authedUser,
            cart: authedUser.cart.filter((item) => item.id === cartItem.id),
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then((data) => {
            setDeleteLoading(false);
            dispatch(loginUser(data));
            dispatch(cartActions.removeItem(cartItem.id));
          })
          .catch(() => {
            setDeleteLoading(false);
            toast.error("Unable to remove this item :(");
          });
      } else dispatch(cartActions.removeItem(cartItem.id));
    },
    [dispatch, cartItem, authedUser]
  );

  const handleChangeValue = useCallback(
    (newValue) => {
      if (newValue <= 0) {
        handleRemoveFromCart();
        return;
      }
      if (authedUser) {
        setLoading(true);
        fetch(`${server}/users/${authedUser.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...authedUser,
            cart: authedUser.cart.map((item) => {
              if (item.id === cartItem.id) return { ...item, amount: newValue };
              return item;
            }),
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then((data) => {
            setLoading(false);
            dispatch(loginUser(data));
            dispatch(
              cartActions.changeAmount({ id: cartItem.id, newAmount: newValue })
            );
          })
          .catch(() => {
            setLoading(false);
            toast.error("Error changing the amount :(");
          });
      } else
        dispatch(
          cartActions.changeAmount({
            id: cartItem.id,
            newAmount: newValue,
          })
        );
    },
    [dispatch, cartItem, handleRemoveFromCart, authedUser]
  );

  return (
    <Link
      to={`/product/${cartItem.id}`}
      className={`${className} ${
        deleteLoading || deleting ? "opacity-50" : "1"
      } text-decoration-none text-black d-flex gap-3 w-100 border-bottom py-3`}
    >
      <button
        onClick={handleRemoveFromCart}
        className="text-main border-0 bg-transparent p-2"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="flex-grow-1 gap-3 flex-wrap row align-items-center">
        <div className="col-xs col-sm-8 col-lg-5 d-flex gap-3 align-items-center">
          <div
            className="overflow-hidden rounded-2"
            style={{ width: "100px", hegiht: "100px" }}
          >
            <img
              className="w-100 h-100 object-fit-cover d-block"
              src={require(`../../../${cartItem.path}`)}
              alt={cartItem.title}
            />
          </div>
          <div>
            <h6>{cartItem.title}</h6>
            <p className="mb-1" style={{ fontWeight: 350 }}>
              اللون: {cartItem.color.text}
            </p>
            <p className="mb-1" style={{ fontWeight: 350 }}>
              الوزن:{" "}
              {cartItem.weight % 10
                ? (cartItem.weight / 1000).toFixed(1)
                : cartItem.weight / 1000}{" "}
              كيلو
            </p>
          </div>
        </div>
        <div className="col col-lg-2 text-center">
          <p className="mb-1 d-sm-none">السعر:</p>
          <h6 className="mb-0">
            {cartItem.discount
              ? cartItem.price - cartItem.price * cartItem.discount
              : cartItem.price}{" "}
            ج.م
          </h6>
        </div>
        <div className="col col-sm-8 col-lg-2">
          <p className="pe-4 mb-1 d-lg-none">الكمية:</p>
          <Counter
            className="mx-lg-auto"
            value={cartItem.amount}
            changeValue={handleChangeValue}
            disabled={loading}
          />
        </div>
        <div className="col col-lg-2 text-center">
          <p className="mb-1 d-lg-none">الإجمالي:</p>
          <h6 className="mb-0">
            {cartItem.amount * cartItem.price * (1 - (cartItem.discount || 0))}{" "}
            ج.م
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
