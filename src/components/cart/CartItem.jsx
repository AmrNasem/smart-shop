import React, { memo, useCallback, useState } from "react";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { toast } from "react-toastify";
import { loginUser } from "../../store/authSlice";
import { server } from "../../App";
import { Link } from "react-router-dom";

const CartItem = ({ cartItem, handleCartClosure }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const authedUser = useSelector((state) => state.auth.user);

  const handleRemoveFromCart = useCallback(
    (e) => {
      if (authedUser) {
        e?.preventDefault();
        e?.stopPropagation();
        setDeleteLoading(true);
        fetch(`${server}/users/${authedUser.id}`, {
          method: "PUT",
          body: JSON.stringify(authedUser),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then((data) => {
            setDeleteLoading(false);
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
    (newValue, e) => {
      if (newValue <= 0) {
        handleRemoveFromCart(e);
        return;
      }
      if (authedUser) {
        e.preventDefault();
        e.stopPropagation();
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
      onClick={handleCartClosure}
      style={{ borderBottom: "1px solid", opacity: deleteLoading ? 0.5 : 1 }}
      className="p-3 text-black text-decoration-none border-color-main d-flex align-items-center justify-content-between"
    >
      <div className="d-flex gap-3">
        <div
          className="overflow-hidden rounded-2"
          style={{ width: "90px", height: "90px" }}
        >
          <img
            className="w-100 object-fit-cover h-100 d-block"
            src={require(`../../${cartItem.path}`)}
            alt={cartItem.title}
          />
        </div>
        <div className="d-flex justify-content-between flex-column">
          <h6 className="mb-0">{cartItem.title}</h6>
          <div
            style={{ fontSize: "0.85rem" }}
            className="mb-2 fw-semibold d-flex justify-content-between"
          >
            <span className="d-block">x1</span>
            <span className="d-block text-main">
              {cartItem.discount
                ? cartItem.price - cartItem.price * cartItem.discount
                : cartItem.price}{" "}
              ج.م
            </span>
          </div>
          <Counter
            aside
            disabled={loading}
            value={cartItem.amount}
            changeValue={handleChangeValue}
          />
        </div>
      </div>
      <button
        disabled={deleteLoading}
        onClick={handleRemoveFromCart}
        className={`btn p-2 border-0`}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </Link>
  );
};

export default memo(CartItem);
