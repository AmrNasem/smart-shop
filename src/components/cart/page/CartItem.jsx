import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import Counter from "../Counter";
import { Link } from "react-router-dom";
import { cartActions } from "../../../store/cart-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartItem = ({ className, cartItem, deleting }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(
    (e) => {
      e?.preventDefault();
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
    },
    [dispatch, cartItem]
  );

  const handleChangeValue = useCallback(
    (newValue) => {
      if (newValue <= 0) {
        handleRemoveFromCart();
        return;
      }
      setLoading(true);
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
