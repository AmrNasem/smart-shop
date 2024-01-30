import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useMemo } from "react";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيه",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const SingleReview = ({ review }) => {
  const date = useMemo(() => new Date(review.date), [review]);

  return (
    <div className="d-flex gap-4 mt-4 py-2">
      <div
        style={{
          maxWidth: "90px",
          maxHeight: "90px",
          minWidth: "90px",
          minHeight: "90px",
        }}
        className="rounded-circle overflow-hidden"
      >
        <img
          src={require(`../../${review.avatar || "assets/avatar.png"}`)}
          alt=""
          className="w-100 h-100 object-fit-cover d-block"
        />
      </div>
      <div>
        <h5 className="text-dark">{review.title}</h5>
        <p
          className="text-black-50 fw-semibold"
          style={{ lineHeight: "2", fontSize: "0.88rem" }}
        >
          {review.description}
        </p>
        <div style={{ fontSize: "0.7rem" }} className="d-flex gap-1">
          {[...Array(5).keys()].map((i) => (
            <FontAwesomeIcon
              icon={faStar}
              key={i}
              className={`${
                i < review.rate ? "text-warning" : "text-secondary"
              }`}
            />
          ))}
        </div>
        <div className="d-flex gap-4">
          <span className="d-block">{review.author}</span>
          <span className="d-block">
            {`${
              date.getDate().toString().length < 2
                ? `0${date.getDate()}`
                : date.getDate()
            } ${months[date.getMonth()]}، ${date.getFullYear()}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SingleReview);
