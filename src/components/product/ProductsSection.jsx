import React, { memo, useCallback, useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  {
    text: "الأقل سعرًا",
    action: (prev) => ({
      ...prev,
      items: [
        ...prev.items.sort(
          (a, b) =>
            (a.discount ? a.price - a.price * a.discount : a.price) -
            (b.discount ? b.price - b.price * b.discount : b.price)
        ),
      ],
    }),
  },
  {
    text: "الأعلى سعرًا",
    action: (prev) => ({
      ...prev,
      items: [
        ...prev.items.sort(
          (b, a) =>
            (a.discount ? a.price - a.price * a.discount : a.price) -
            (b.discount ? b.price - b.price * b.discount : b.price)
        ),
      ],
    }),
  },
];

const numOfDisplays = [6, 12, 18, 24, 30];
const maxRangeOfPrice = 30000;

const ProductsSection = () => {
  const [filters, setFilters] = useState({
    items: null,
    loading: true,
    isOpen: true,
  });
  const [products, setProducts] = useState({ items: [], loading: true });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(numOfDisplays[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [matchedFilters, setMatchedFilters] = useState({
    category: searchParams.get("category")?.split(" ") || [],
    price: searchParams.get("price") || maxRangeOfPrice,
    size: searchParams.get("size")?.split(" ") || [],
    color: searchParams.get("color")?.split(" ") || [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setFilters((prev) => ({ ...prev, loading: true }));
        const res = await fetch("http://localhost:8000/filters");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFilters((prev) => ({ ...prev, items: data }));
      } catch {
        toast.error("Unable to load filters :(");
      }
      setFilters((prev) => ({ ...prev, loading: false }));
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts((prev) => ({ ...prev, loading: true }));
        const res = await fetch("http://localhost:8000/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts((prev) => ({ ...prev, items: data }));
      } catch {
        toast.error("Unable to load products :(");
      }
      setProducts((prev) => ({ ...prev, loading: false }));
    };
    fetchProducts();
  }, []);

  const handleToggleQueries = useCallback(
    (key, value) => {
      setSearchParams((params) => {
        if (value) params.set(key, value);
        else params.delete(key);
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    let filtered = products.items.filter((p) => {
      const myPrice = p.price - p.price * (p.discount || 0);
      return myPrice <= matchedFilters.price && myPrice >= 100;
    });

    if (matchedFilters.price < maxRangeOfPrice)
      handleToggleQueries("price", matchedFilters.price);
    else handleToggleQueries("price");

    if (matchedFilters.category.length) {
      filtered = filtered.filter((p) =>
        matchedFilters.category.find((mc) => mc === p.category)
      );
      handleToggleQueries("category", matchedFilters.category.join(" "));
    } else handleToggleQueries("category");

    if (matchedFilters.size.length) {
      filtered = filtered.filter((p) =>
        matchedFilters.size.find((ms) => ms === p.sizes.find((ps) => ps === ms))
      );
      handleToggleQueries("size", matchedFilters.size.join(" "));
    } else handleToggleQueries("size");

    if (matchedFilters.color.length) {
      filtered = filtered.filter((p) =>
        matchedFilters.color.find((mc) => mc === p.color.text)
      );
      handleToggleQueries("color", matchedFilters.color.join(" "));
    } else handleToggleQueries("color");

    setFilteredProducts(filtered);
  }, [matchedFilters, products.items, handleToggleQueries]);

  return (
    <div className="container d-flex flex-wrap flex-lg-nowrap gap-3">
      {filters.isOpen && (
        <div className={`d-lg-block flex-grow-1 d-flex gap-3 flex-wrap`}>
          {filters.loading ? (
            <p className="text-center my-4">جارٍ تحميل الفلاتر..</p>
          ) : filters.items ? (
            <>
              <CategoryFilter
                matchedFilters={matchedFilters}
                filters={filters.items}
                setMatchedFilters={setMatchedFilters}
              />
              <PriceFilter
                matchedFilters={matchedFilters}
                setMatchedFilters={setMatchedFilters}
              />
              <SizeFilter
                matchedFilters={matchedFilters}
                filters={filters.items}
                setMatchedFilters={setMatchedFilters}
              />
              <ColorFilter
                matchedFilters={matchedFilters}
                filters={filters.items}
                setMatchedFilters={setMatchedFilters}
              />
            </>
          ) : (
            <p className="text-center my-4">لا يوجد فلاتر!</p>
          )}
        </div>
      )}
      <div className="flex-grow-1" style={{ flexBasis: "70%" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-2 rounded-3 border bg-light">
          <button
            className="btn border-0"
            onClick={() =>
              setFilters((prev) => ({ ...prev, isOpen: !prev.isOpen }))
            }
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
                onChange={setProducts}
              />
            </div>
          </div>
        </div>
        {products.loading ? (
          <p className="text-center my-3">جارٍ تحميل المنتجات..</p>
        ) : products.items.length ? (
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

export default memo(ProductsSection);