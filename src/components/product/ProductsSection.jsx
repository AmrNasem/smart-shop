import React, { useCallback, useEffect, useState } from "react";
import Select from "../UI/Select";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import Paginator from "../UI/Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";

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

const numOfDisplays = [6, 12, 18, 24, 30];

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);
  const [filtersAreShown, setFiltersAreShown] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(numOfDisplays[0]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [matchedFilters, setMatchedFilters] = useState({
    category: [],
    price: 30000,
    size: [],
    color: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setFiltersLoading(true);
        const res = await fetch("http://localhost:8000/filters");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFilters(data);
      } catch {
        toast.error("Unable to load filters :(");
      }
      setFiltersLoading(false);
    };
    fetchFilters();
  }, []);

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

  useEffect(() => {
    let filteredProducts = products.filter((p) => {
      const myPrice = p.price - p.price * (p.discount || 0);
      return myPrice <= matchedFilters.price && myPrice >= 100;
    });

    if (matchedFilters.category.length)
      filteredProducts = filteredProducts.filter((p) =>
        matchedFilters.category.find((mc) => mc.text === p.category)
      );

    if (matchedFilters.size.length)
      filteredProducts = filteredProducts.filter((p) =>
        matchedFilters.size.find((ms) => ms === p.sizes.find((ps) => ps === ms))
      );

    if (matchedFilters.color.length)
      filteredProducts = filteredProducts.filter((p) =>
        matchedFilters.color.find((mc) => mc.hexa === p.color.hexa)
      );

    setFilteredProducts(filteredProducts);
  }, [matchedFilters, products]);

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
    <div className="container d-flex flex-wrap flex-lg-nowrap gap-3">
      {filtersAreShown && (
        <div className={`d-lg-block flex-grow-1 d-flex gap-3 flex-wrap`}>
          {filtersLoading ? (
            <p className="text-center my-4">جارٍ تحميل الفلاتر..</p>
          ) : (
            filters && (
              <>
                <CategoryFilter
                  matchedFilters={matchedFilters}
                  filters={filters}
                  setMatchedFilters={setMatchedFilters}
                />
                <PriceFilter
                  matchedFilters={matchedFilters}
                  setMatchedFilters={setMatchedFilters}
                />
                <SizeFilter
                  matchedFilters={matchedFilters}
                  filters={filters}
                  setMatchedFilters={setMatchedFilters}
                />
                <ColorFilter
                  matchedFilters={matchedFilters}
                  filters={filters}
                  setMatchedFilters={setMatchedFilters}
                />
              </>
            )
          )}
        </div>
      )}
      <div className="flex-grow-1" style={{ flexBasis: "70%" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-2 rounded-3 border bg-light">
          <button
            className="btn border-0"
            onClick={() => setFiltersAreShown((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div style={{ flexBasis: "80%" }} className="d-flex gap-3 flex-wrap">
            <div className="flex-grow-1 d-flex align-items-center justify-content-end gap-3">
              <span
                style={{ fontSize: "0.9rem", color: "#444" }}
                className="d-block fw-semibold"
              >
                مشاهدة
              </span>
              <div className="d-flex gap-2 align-items-center">
                {numOfDisplays.map((n, i) => (
                  <button
                    key={i}
                    onClick={() => setProductsPerPage(n)}
                    className={`btn ${
                      productsPerPage === n ? "text-main" : "text-black-50"
                    } border-0 p-1`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-grow-1 d-flex align-items-center justify-content-end gap-3">
              <span
                style={{ fontSize: "0.9rem", color: "#444" }}
                className="d-block text-nowrap fw-semibold"
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
        </div>
        {loading || filtersLoading ? (
          <p className="text-center my-3">جارٍ تحميل المنتجات..</p>
        ) : products.length ? (
          <div className="row my-3 gy-5">
            {filteredProducts.length ? (
              pageItems.map((product, i) => (
                <div key={i} className="col col-md-6 my-3 col-lg-4">
                  <ProductCard minWidth="200px" product={product} />
                </div>
              ))
            ) : (
              <p className="text-center my-3">لم يتم العثور على أية منتجات!</p>
            )}
          </div>
        ) : (
          <p className="text-center my-3">لم يتم العثور على أية منتجات!</p>
        )}
        <Paginator
          items={filteredProducts}
          itemsPerPage={productsPerPage}
          numOfShownButtons={4}
          onPaginate={setPageItems}
        />
      </div>
    </div>
  );
};

export default ProductsSection;
