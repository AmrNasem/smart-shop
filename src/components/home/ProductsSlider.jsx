import React, { useState, useEffect } from "react";
import styles from "../../styles/products_slider.module.css";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import ProductCard from "../product/ProductCard";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";
import { server } from "../../App";

const ProductsSlider = () => {
  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`container flex-wrap gap-4 ${styles.container}`}>
      <table className="flex-grow-1">
        <thead>
          <tr>
            <th className="text-center rounded-top-4 border-0 p-3">
              تسوق عبر الفئات
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border">رجالي</td>
          </tr>
          <tr>
            <td className="border">حريمي</td>
          </tr>
          <tr>
            <td className="border">أطفال</td>
          </tr>
          <tr>
            <td className="border">اكسسوارات</td>
          </tr>
          <tr>
            <td className="border rounded-bottom-4">ألعاب</td>
          </tr>
        </tbody>
      </table>
      {(loading || !!products.length) && (
        <div className={`flex-grow-1 ${styles.slider}`}>
          <div className={`w-100 gap-3 ${styles.cards}`}>
            <i
              style={{ cursor: "pointer" }}
              className=" d-block"
              onClick={handlePrev}
            >
              <IoArrowForwardCircle />
            </i>
            <div className={`row ${styles.cards}`}>
              {loading
                ? [...Array(3).keys()].map((i) => (
                    <div
                      key={i}
                      className="col col-lg-3 col-md-4 col-sm-6 gy-4"
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))
                : !!visibleProducts.length &&
                  visibleProducts.map((product, index) => (
                    <div
                      key={index}
                      className="col col-lg-3 col-md-4 col-sm-6 gy-4"
                    >
                      <ProductCard
                        product={product}
                        className="flex-grow-1"
                        minWidth="230px"
                      />
                    </div>
                  ))}
            </div>
            <i
              style={{ cursor: "pointer" }}
              className=" d-block"
              onClick={handleNext}
            >
              <IoArrowBackCircle />
            </i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSlider;
