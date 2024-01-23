import React, { memo, useState } from "react";
import SingleFilter from "./SingleFilter";

const PriceFilter = ({ matchedFilters, setMatchedFilters }) => {
  const [maximumPrice, setMaximumPrice] = useState(matchedFilters.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target[1].blur();
  };

  return (
    <SingleFilter
      style={{ flexBasis: "calc(50% - 1rem)" }}
      className="flex-grow-1"
      active={matchedFilters.price < 30000}
      title="السعر"
    >
      <form onSubmit={handleSubmit} className="my-4">
        <div className="d-flex gap-3 align-items-center justify-content-between">
          <label
            style={{ fontSize: "0.86rem" }}
            className="d-inline-block fw-semibold"
            htmlFor="price"
          >
            100 ج.م
          </label>
          <label
            style={{ fontSize: "0.86rem" }}
            className="d-inline-block fw-semibold"
            htmlFor="price"
          >
            {maximumPrice} ج.م
          </label>
        </div>
        <input
          id="price"
          type="range"
          className="form-range my-2"
          min="100"
          max="30000"
          value={maximumPrice}
          onChange={(e) => setMaximumPrice(Math.max(e.target.value, 300))}
          onClick={(e) =>
            setMatchedFilters((prev) => ({
              ...prev,
              price: Math.max(e.target.value, 300),
            }))
          }
        />
        <div className="d-flex justify-content-between my-2 align-items-center gap-3">
          <label htmlFor="max" className="text-nowrap">
            الحد الأقصى
          </label>
          <input
            type="number"
            id="max"
            style={{ width: "80px" }}
            className="outline-none p-2 border rounded-2 input transition-main"
            max="30000"
            min="100"
            value={maximumPrice}
            onChange={(e) => setMaximumPrice(Math.min(e.target.value, 30000))}
            onBlur={(e) =>
              setMatchedFilters((prev) => ({
                ...prev,
                price: Math.max(e.target.value, 300),
              }))
            }
          />
        </div>
      </form>
    </SingleFilter>
  );
};

export default memo(PriceFilter);
