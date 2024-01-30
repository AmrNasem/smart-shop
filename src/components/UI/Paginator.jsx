import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useMemo, useState } from "react";

const Paginator = ({
  numOfShownButtons = 3,
  onPaginate,
  items,
  itemsPerPage,
  className,
}) => {
  const [page, setPage] = useState({
    min: 0,
    current: 0,
    max: 0,
  });

  const numOfPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  useEffect(() => {
    setPage((prev) => ({
      ...prev,
      max: Math.min(numOfPages, numOfShownButtons),
      current: 0,
    }));
  }, [numOfPages, numOfShownButtons]);

  useEffect(() => {
    onPaginate(
      items.slice(
        page.current * itemsPerPage,
        (page.current + 1) * itemsPerPage
      )
    );
  }, [onPaginate, page, itemsPerPage, items]);

  return (
    numOfPages > 1 && (
      <div
        className={`flex-wrap d-flex align-items-center justify-content-center mb-4 gap-2 ${className}`}
      >
        <button
          onClick={() =>
            setPage((prev) => {
              if (prev.current + 1 === prev.max)
                return {
                  min: prev.min + 1,
                  max: prev.max + 1,
                  current: prev.current + 1,
                };
              return { ...prev, current: prev.current + 1 };
            })
          }
          disabled={page.current + 1 === numOfPages}
          style={{ width: "45px", height: "45px" }}
          className="fs-5 rounded-circle d-block bg-transparent d-flex justify-content-center align-items-center border"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        {[...Array(numOfPages).keys()]
          .slice(page.min, page.max)
          .reverse()
          .map((i) => (
            <button
              key={i}
              style={{ width: "45px", height: "45px" }}
              className={`${
                page.current === i
                  ? "bg-main text-white border-0"
                  : "border bg-transparent"
              } fs-5 rounded-circle d-block d-flex justify-content-center align-items-center`}
              disabled={page.current === i}
              onClick={() =>
                setPage((prev) => ({
                  ...prev,
                  current: i,
                }))
              }
            >
              {i + 1}
            </button>
          ))}
        <button
          onClick={() =>
            setPage((prev) => {
              if (prev.current === prev.min)
                return {
                  min: prev.min - 1,
                  max: prev.max - 1,
                  current: prev.current - 1,
                };
              return { ...prev, current: prev.current - 1 };
            })
          }
          disabled={page.current === 0}
          style={{ width: "45px", height: "45px" }}
          className="fs-5 rounded-circle d-block bg-transparent d-flex justify-content-center align-items-center border"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    )
  );
};

export default memo(Paginator);
