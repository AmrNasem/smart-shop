import { faHeart, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Counter from "../cart/Counter";
import classes from "./ProductDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../App";
import { cartActions } from "../../store/cart-slice";
import { toast } from "react-toastify";

const getStar = (index, rate) =>
  rate < index + 1 && index < rate ? (
    <div
      key={index}
      className="position-relative d-flex align-items-center justify-content-center"
    >
      <FontAwesomeIcon className="invisible" icon={faStar} />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 end-0 text-warning"
        style={{
          transform: "rotateY(180deg)",
        }}
      />
      <FontAwesomeIcon
        icon={faStarHalf}
        className="position-absolute top-0 start-0 text-secondary"
      />
    </div>
  ) : (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`${index < rate ? "text-warning" : "text-secondary"}`}
    />
  );

const ProductDetails = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [active, setActive] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const isAdded = useMemo(
    () => cartItems.find((item) => item.id === product?.id),
    [cartItems, product]
  );

  const avgReviewsRate = useMemo(
    () =>
      product.reviews.reduce((prev, cur) => prev + cur.rate, 0) /
      product.reviews.length,
    [product]
  );

  const handleChangeValue = useCallback(
    (newValue) => newValue && setAmount(newValue),
    []
  );

  useEffect(() => {
    if (product) setActive(product.images[0]);
  }, [product]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${server}/cart/${isAdded ? product.id : ""}`, {
      method: isAdded ? "DELETE" : "POST",
      body: JSON.stringify({ ...product, amount, size: "m" }),
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
    <section className="container my-5 d-flex flex-wrap flex-lg-nowrap gap-5">
      <div className={`w-100 ${classes.navigator}`}>
        <div className="mb-2 bg-light" style={{ height: "500px" }}>
          <img
            className="w-100 h-100 object-fit-cover d-block"
            src={require(`../../${active}`)}
            alt=""
          />
        </div>
        <div className="d-flex gap-2 overflow-auto scrollbar-none flex-grow-1">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(img)}
              className={`${
                active === img ? classes.active : "border"
              } bg-transparent transition-main rounded-2 ${classes.image}`}
            >
              <img
                className="w-100 h-100 object-fit-cover d-block"
                src={require(`../../${img}`)}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-grow-1">
        <h3>{product.title}</h3>
        <div className="d-flex gap-2 align-items-center my-3 text-secondary">
          <span className="text-nowrap fw-semibold d-block">
            {product.price - product.price * (product.discount || 0)} ج.م
          </span>
          {product.discount && (
            <>
              <span className=" d-block">-</span>
              <span
                className="text-nowrap d-block"
                style={{ fontSize: "0.8rem" }}
              >
                <del>{product.price} ج.م</del>
              </span>
            </>
          )}
        </div>
        <div
          className="d-flex gap-2 align-items-center my-3"
          style={{ fontSize: "0.8rem" }}
        >
          <div className="d-flex gap-1">
            {[...Array(5).keys()].map((i) => getStar(i, avgReviewsRate))}
          </div>
          <span className="text-black-50 d-block">
            ({product.reviews.length})
          </span>
        </div>
        <p className="my-4 text-secondary">{product.description}</p>
        <div className="my-4">
          <h5>اللون: </h5>
          <span
            className="border rounded-circle d-block"
            title={product.color.text}
            style={{
              backgroundColor: product.color.hexa,
              width: "20px",
              height: "20px",
            }}
          ></span>
        </div>
        <div className="my-4">
          <h5>الوزن: </h5>
          <span className="border py-1 px-3 mt-2 rounded-2 d-inline-block">
            {product.weight % 10
              ? (product.weight / 1000).toFixed(1)
              : product.weight / 1000}{" "}
            كيلو
          </span>
        </div>
        <div className="d-flex gap-3 my-3">
          <Counter
            disabled={loading}
            value={amount}
            changeValue={handleChangeValue}
          />
          <button
            onClick={handleAddToCart}
            className="px-3 py-1 text-white rounded-2 bg-main border"
          >
            {isAdded ? "أزٍل من السلة" : "أضف للسلة"}
          </button>
        </div>
        <button
          onClick={() => setIsFav((prev) => !prev)}
          className={`d-flex gap-3 transition-main ${
            isFav ? "text-main" : "text-secondary"
          } align-items-center bg-transparent border-0 my-3`}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className="d-block">
            {isFav ? "إزالة من المفضلة" : "أضف للمفضلة"}
          </span>
        </button>
        <button
          style={{ padding: "0.7rem 1rem" }}
          className="w-100 bg-main text-white rounded-2 border-0"
        >
          اشتري الآن
        </button>
        <div>
          <p className="mt-4">شارك عبر مواقع التواصل الاجتماعي</p>
          <div className="d-flex flex-wrap my-3 gap-2">
            <img
              src={require("../../assets/Twitter.png")}
              alt="Twitter"
              style={{ width: "25px", height: "25px" }}
              className="d-block"
            />
            <img
              src={require("../../assets/Facebook.png")}
              alt="Facebook"
              style={{ width: "25px", height: "25px" }}
              className="d-block"
            />
            <img
              src={require("../../assets/Youtube.png")}
              alt="Youtube"
              style={{ width: "25px", height: "25px" }}
              className="d-block"
            />
            <img
              src={require("../../assets/Whatsapp.png")}
              alt="Whatsapp"
              style={{ width: "25px", height: "25px" }}
              className="d-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
