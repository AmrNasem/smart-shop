import React, { memo } from "react";
import SingleFilter from "./SingleFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const CategoryFilter = ({ matchedFilters, filters, setMatchedFilters }) => {
  return (
    <SingleFilter
      style={{ flexBasis: "calc(50% - 1rem)" }}
      className="flex-grow-1"
      active={matchedFilters.category.length}
      title="الفئات"
    >
      {filters.category.map((c, i) => {
        const matched = matchedFilters.category.find((mc) => mc === c);
        return (
          <button
            key={i}
            onClick={() =>
              setMatchedFilters((prev) => ({
                ...prev,
                category: matched
                  ? prev.category.filter((mc) => mc !== c)
                  : [...prev.category, c],
              }))
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
  );
};

export default memo(CategoryFilter);
