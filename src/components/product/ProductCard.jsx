import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { toast } from "react-toastify";

const ProductCard = ({ className, product, minWidth, style }) => {
  const [size, setSize] = useState("m");
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = useMemo(
    () => cartItems.find((item) => item.id === product.id),
    [cartItems, product]
  );
  const dispatch = useDispatch();

  const handleSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:8000/cart/${isAdded ? product.id : ""}`, {
      method: isAdded ? "DELETE" : "POST",
      body: JSON.stringify({ ...product, amount: 1, userId: "1", size }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch(
          isAdded ? cartActions.removeItem(data.id) : cartActions.addItem(data)
        );
        toast.success(isAdded ? "Removed from cart" : "Added to cart");
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          isAdded ? "Unable to remove from cart :(" : "Unable to add to cart :("
        );
      });
  };
  return (
    <Link
      style={{ ...style, minWidth }}
      to={`/product/${product.id}`}
      className={`${className} d-block text-decoration-none ${classes.product}`}
    >
      <div
        style={{ backgroundColor: "#D9D9D9", minHeight: "300px" }}
        className="position-relative rounded-top-2 overflow-hidden"
      >
        <button
          onClick={(e) => e.preventDefault()}
          className="bg-transparent z-1 text-secondary py-2 px-3 border-0 position-absolute end-0 top-0"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <img
          src={require(`../../${product.path}`)}
          alt={product.title}
          className="w-100 h-100 position-absolute d-block object-fit-cover"
        />
        <button
          onClick={handleAddToCart}
          disabled={loading}
          style={{ backgroundColor: "#7fd2dfe6" }}
          className={`${classes["add-to-cart"]} ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          } position-absolute transition-main bottom-0 start-0 d-block w-100 py-4 rounded-top-3 border-0 text-white`}
        >
          {isAdded ? "أزِل من السلة" : "أضف إلى السلة"}
        </button>
      </div>
      <div className="p-3">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <div>
            <ul className="d-flex mb-0 list-unstyled gap-1">
              {[...Array(5).keys()].map((star) => (
                <li style={{ fontSize: "0.8rem" }} key={star}>
                  <FontAwesomeIcon
                    className={`${
                      star < product.rate ? "text-warning" : "text-secondary"
                    }`}
                    icon={faStar}
                  />
                </li>
              ))}
            </ul>
            <h6
              style={{ fontSize: "0.95rem" }}
              className="text-black opacity-70 my-2"
            >
              {product.title}
            </h6>
          </div>

          <div className="text-main text-start">
            <span className="fw-semibold d-block">
              {product.discount
                ? product.price - product.discount * product.price
                : product.price}{" "}
              ج.م
            </span>
            {product.discount && (
              <span
                title={product.price}
                style={{ fontSize: "0.8rem" }}
                className="d-block"
              >
                <del>{product.price} ج.م</del>
              </span>
            )}
          </div>
        </div>
        <div className="d-flex gap-1">
          {product.sizes.map((s, i) => (
            <button
              onClick={handleSize}
              value={s}
              style={{ width: "30px", height: "30px" }}
              key={i}
              className={`py-0 transition-main px-1 ${
                s === size ? "border-0 bg-main text-white" : "bg-white border"
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
