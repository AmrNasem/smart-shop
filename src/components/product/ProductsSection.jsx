import React, { useCallback, useEffect, useState } from "react";
import Select from "../UI/Select";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import Paginator from "../UI/Paginator";

const sortOptions = [
  {
    id: "LOWEST-PRICE",
    text: "الأقل سعرًا",
  },
  {
    id: "HIGHEST-PRICE",
    text: "الأعلى سعرًا",
  },
];

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageItems, setpageItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts(data);
      } catch {
        toast.error("Unable to load products :(");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handlePaginatation = useCallback((items) => {
    setpageItems(items);
  }, []);
  const handleChangeSort = useCallback(
    (option) => {
      if (option.id === "LOWEST-PRICE") {
        setFilteredProducts([
          ...products.sort(
            (a, b) =>
              (a.discount ? a.price - a.price * a.discount : a.price) -
              (b.discount ? b.price - b.price * b.discount : b.price)
          ),
        ]);
      } else if (option.id === "HIGHEST-PRICE") {
        setFilteredProducts([
          ...products.sort(
            (b, a) =>
              (a.discount ? a.price - a.price * a.discount : a.price) -
              (b.discount ? b.price - b.price * b.discount : b.price)
          ),
        ]);
      }
    },
    [products]
  );
  return (
    <div>
      <div className="container">
        <div className="p-3 rounded-3 border bg-light">
          <div className="d-flex align-items-center justify-content-end gap-3 flex-wrap">
            <span
              style={{ fontSize: "0.9rem", color: "#444" }}
              className="d-block"
            >
              ترتيب حسب
            </span>
            <Select
              defaultValue={sortOptions[0]}
              options={sortOptions}
              onChange={handleChangeSort}
            />
          </div>
        </div>
        {loading ? (
          <p className="text-center my-3">جارٍ تحميل المنتجات..</p>
        ) : products.length ? (
          <div className="row my-3 gy-5">
            {pageItems.map((product, i) => (
              <div key={i} className="col col-md-4 my-3 col-lg-3">
                <ProductCard minWidth="200px" product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center my-3">لم يتم العثور على أية منتجات!</p>
        )}
      </div>
      <Paginator
        items={filteredProducts}
        itemsPerPage={3}
        numOfShownButtons={4}
        onPaginate={handlePaginatation}
      />
    </div>
  );
};

export default ProductsSection;
