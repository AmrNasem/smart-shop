import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState } from "react";
import SingleFilter from "./SingleFilter";

const ProductsFilter = ({
  products,
  onFilter,
  style,
  filters,
  filtersLoading,
  className,
}) => {
  const [category, setCategory] = useState([]);
  const [maximumPrice, setMaximumPrice] = useState(30000);
  const [price, setPrice] = useState(maximumPrice);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    let filteredProducts = products.filter((p) => {
      const myPrice = p.price - p.price * (p.discount || 0);
      return myPrice <= price && myPrice >= 100;
    });

    if (category.length)
      filteredProducts = filteredProducts.filter((p) =>
        category.find((mc) => mc.text === p.category)
      );

    if (size.length)
      filteredProducts = filteredProducts.filter((p) =>
        size.find((ms) => ms === p.sizes.find((ps) => ps === ms))
      );

    if (color.length)
      filteredProducts = filteredProducts.filter((p) =>
        color.find((mc) => mc.hexa === p.color.hexa)
      );

    onFilter(filteredProducts);
  }, [onFilter, category, price, size, color, products]);

  if (filtersLoading)
    return (
      <div style={style}>
        <p className="text-center">جارٍ تحميل الفلاتر..</p>
      </div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target[1].blur();
  };

  return (
    filters && (
      <div style={style} className={`${className} d-flex gap-3 flex-wrap`}>
        <SingleFilter
          style={{ flexBasis: "calc(50% - 1rem)" }}
          className="flex-grow-1"
          active={category.length}
          title="الفئات"
        >
          {filters.category.map((c, i) => {
            const matched = category.find((mc) => mc.id === i);
            return (
              <button
                key={i}
                onClick={() =>
                  setCategory((prev) =>
                    prev.find((mc) => mc.id === i)
                      ? prev.filter((mc) => mc.id !== i)
                      : [...prev, { id: i, text: c }]
                  )
                }
                style={{ border: "1px solid transparent" }}
                className={`d-block text-black-70 w-100 my-2 transition-main border-hover py-1 px-2 rounded-2 ${
                  matched ? "bg-counter" : "bg-transparent"
                } text-end`}
              >
                {matched && (
                  <FontAwesomeIcon className="ms-2" icon={faSquareCheck} />
                )}
                {c}
              </button>
            );
          })}
        </SingleFilter>
        <SingleFilter
          style={{ flexBasis: "calc(50% - 1rem)" }}
          className="flex-grow-1"
          active={price < 30000}
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
              onClick={(e) => setPrice(Math.max(e.target.value, 300))}
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
                onChange={(e) =>
                  setMaximumPrice(Math.min(e.target.value, 30000))
                }
                onBlur={(e) => setPrice(Math.max(e.target.value, 300))}
              />
            </div>
          </form>
        </SingleFilter>
        <SingleFilter
          style={{ flexBasis: "calc(50% - 1rem)" }}
          className="flex-grow-1"
          active={size.length}
          title="المقاس"
        >
          <div className="d-flex gap-1 align-items-center flex-wrap">
            {filters.size.map((s, i) => (
              <button
                onClick={() =>
                  setSize((prev) =>
                    prev.find((ms) => ms === s)
                      ? prev.filter((ms) => ms !== s)
                      : [...prev, s]
                  )
                }
                value={s}
                key={i}
                style={{ width: "40px", height: "40px" }}
                className={`py-0 transition-main px-1 ${
                  size.find((ms) => ms === s)
                    ? "border-0 bg-main text-white"
                    : "bg-white border"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </SingleFilter>
        <SingleFilter
          style={{ flexBasis: "calc(50% - 1rem)" }}
          className="flex-grow-1"
          active={color.length}
          bodyClassName="d-flex flex-wrap gap-2"
          title="اللون"
        >
          {filters.color.map((c, i) => (
            <button
              key={i}
              title={c.text}
              className={`d-block rounded-circle transition-main ${
                color.find((mc) => mc.hexa === c.hexa)
                  ? "active-border-shadow"
                  : "border"
              }`}
              onClick={() =>
                setColor((prev) =>
                  prev.find((mc) => mc.hexa === c.hexa)
                    ? prev.filter((mc) => mc.hexa !== c.hexa)
                    : [...prev, c]
                )
              }
              style={{ width: "20px", height: "20px", backgroundColor: c.hexa }}
            ></button>
          ))}
        </SingleFilter>
      </div>
    )
  );
};

export default memo(ProductsFilter);
