import React, { memo, useCallback, useState } from "react";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleRemoveFromCart = useCallback(() => {
    setDeleteLoading(true);
    fetch(`http://localhost:8000/cart/${cartItem.id}`, {
      method: "DELETE",
      body: JSON.stringify(cartItem),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setDeleteLoading(false);
        dispatch(cartActions.removeItem(data.id));
      })
      .catch(() => {
        setDeleteLoading(false);
        toast.error("Unable to remove this item :(");
      });
  }, [dispatch, cartItem]);

  const handleChangeValue = useCallback(
    (newValue) => {
      setLoading(true);
      if (newValue <= 0) {
        handleRemoveFromCart();
        return;
      }
      fetch(`http://localhost:8000/cart/${cartItem.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...cartItem,
          amount: newValue,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          dispatch(
            cartActions.changeAmount({ id: data.id, newAmount: data.amount })
          );
        })
        .catch(() => {
          setLoading(false);
          toast.error("Error changing the amount :(");
        });
    },
    [dispatch, cartItem, handleRemoveFromCart]
  );

  return (
    <div
      style={{ borderBottom: "1px solid", opacity: deleteLoading ? 0.5 : 1 }}
      className="p-3 border-color-main d-flex align-items-center justify-content-between"
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
    </div>
  );
};

export default memo(CartItem);
