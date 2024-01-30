import React, { useState } from "react";
import SingleReview from "./SingleReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../App";
import classes from "./Reviews.module.css";
import SingleReviewSkeleton from "../skeleton/SingleReviewSkeleton";

const itemsPerPage = 2;

const Reviews = ({ product, setProduct, loading }) => {
  const [page, setPage] = useState(1);
  const [rate, setRate] = useState({ valid: true, value: 0 });
  const [title, setTitle] = useState({ valid: true, value: "" });
  const [desc, setDesc] = useState({ valid: true, value: "" });
  const [name, setName] = useState({ valid: true, value: "" });
  const [email, setEmail] = useState({ valid: true, value: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;
    const validate = (condition, setValue) => {
      if (condition) {
        setValue((prev) => ({ ...prev, valid: false }));
        isFormValid = false;
      } else setValue((prev) => ({ ...prev, valid: true }));
    };
    validate(!rate.value, setRate);
    validate(!title.value.trim(), setTitle);
    validate(!desc.value.trim(), setDesc);
    validate(!name.value.trim(), setName);
    validate(!email.value.trim(), setEmail);

    if (isFormValid) {
      setRate({ valid: true, value: 0 });
      setTitle({ valid: true, value: "" });
      setDesc({ valid: true, value: "" });
      setName({ valid: true, value: "" });
      setEmail({ valid: true, value: "" });
      const addReview = async () => {
        try {
          const res = await fetch(`${server}/products/${product.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...product,
              reviews: [
                ...product.reviews,
                {
                  title: title.value,
                  description: desc.value,
                  rate: rate.value,
                  author: name.value,
                  date: new Date(),
                },
              ],
            }),
          });
          if (!res.ok) throw new Error();
          const data = await res.json();
          setProduct(data);
        } catch {
          toast.error("Unable to add review :(");
        }
      };
      addReview();
    }
  };

  return (
    <section style={{ marginTop: "4rem" }} className={`container mb-5 pe-lg-5`}>
      <div className="my-4 d-flex gap-2 gap-sm-4 justify-content-center align-items-center border-bottom">
        <Link className="d-block p-3 text-decoration-none text-secondary">
          الوصف
        </Link>
        <Link className="d-block p-3 text-decoration-none text-secondary">
          معلومات إضافية
        </Link>
        <Link className="d-block p-3 border-bottom border-secondary text-decoration-none text-dark">
          تقييمات المنتج
        </Link>
      </div>
      {!loading && <h5>تقييمات ({product.reviews?.length || 0})</h5>}
      <div className="d-flex gap-5 flex-wrap flex-lg-nowrap align-items-start">
        <div
          style={{ flexBasis: "50%" }}
          className="d-flex flex-column justify-content-between flex-grow-1"
        >
          <div>
            {loading ? (
              [...Array(itemsPerPage).keys()].map((i) => (
                <SingleReviewSkeleton delay={i} key={i} />
              ))
            ) : product.reviews && product.reviews.length ? (
              product.reviews
                .slice(0, page * itemsPerPage)
                .map((review, i) => <SingleReview key={i} review={review} />)
            ) : (
              <p className="text-center fw-semibold my-4">أضف أول تقييم.</p>
            )}
          </div>
          {page < Math.ceil(product?.reviews?.length / itemsPerPage) && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="text-white bg-main border-0 rounded-2 mx-auto px-3 py-2 mt-5"
            >
              مشاهدة المزيد
            </button>
          )}
        </div>
        <div
          className="flex-grow-1 my-4 position-sticky"
          style={{ top: "2rem" }}
        >
          <h5>أضف تقييمًا</h5>
          <div className="d-flex gap-4 align-items-center mt-2">
            <h6 className="mb-0">تقييمك</h6>
            <div
              style={{ fontSize: "0.8rem" }}
              className={`p-2 rounded-2 d-flex gap-1 ${
                rate.valid ? "" : `border ${classes.invalid}`
              }`}
            >
              {[...Array(5).keys()].map((i) => (
                <button
                  key={i}
                  onClick={() =>
                    setRate((prev) => ({
                      valid: true,
                      value: i + 1 === prev.value ? 0 : i + 1,
                    }))
                  }
                  className="bg-transparent border-0"
                >
                  {i < rate.value ? (
                    <FontAwesomeIcon
                      icon={faSolidStar}
                      className={`transition-main text-warning`}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faRegStar}
                      className={`transition-main text-warning`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={title.value}
              onChange={(e) => setTitle({ valid: true, value: e.target.value })}
              placeholder="عنوان التقييم"
              className={`px-4 outline-none ${
                title.valid ? "" : classes.invalid
              } input transition-main py-2 border my-2 rounded-pill w-100`}
            />
            <textarea
              className={`${
                desc.valid ? "" : classes.invalid
              } px-4 outline-none input transition-main py-2 border my-2 rounded-4 w-100`}
              cols="30"
              rows="10"
              style={{ resize: "none" }}
              value={desc.value}
              onChange={(e) => setDesc({ valid: true, value: e.target.value })}
              placeholder="اكتب تقييمك هنا.."
            ></textarea>
            <div className="d-flex gap-4 my-2">
              <input
                type="text"
                value={name.value}
                onChange={(e) =>
                  setName({ valid: true, value: e.target.value })
                }
                placeholder="اسمك"
                className={`${
                  name.valid ? "" : classes.invalid
                } px-4 outline-none input transition-main py-2 border rounded-pill w-100`}
              />
              <input
                type="email"
                value={email.value}
                onChange={(e) =>
                  setEmail({ valid: true, value: e.target.value })
                }
                placeholder="بريدك الإلكتروني"
                className={`${
                  email.valid ? "" : classes.invalid
                } px-4 outline-none input transition-main py-2 border rounded-pill w-100`}
              />
            </div>
            <button
              disabled={loading}
              className="text-white bg-main border-0 py-2 px-4 my-2 rounded-pill"
            >
              أضف الآن
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
