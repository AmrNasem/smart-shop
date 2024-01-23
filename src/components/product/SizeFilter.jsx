import React, { memo } from "react";
import SingleFilter from "./SingleFilter";

const SizeFilter = ({ filters, setMatchedFilters, matchedFilters }) => {
  return (
    <SingleFilter
      style={{ flexBasis: "calc(50% - 1rem)" }}
      className="flex-grow-1"
      active={matchedFilters.size.length}
      title="المقاس"
    >
      <div className="d-flex gap-1 align-items-center flex-wrap">
        {filters.size.map((s, i) => (
          <button
            onClick={() =>
              setMatchedFilters((prev) => ({
                ...prev,
                size: prev.size.find((ms) => ms === s)
                  ? prev.size.filter((ms) => ms !== s)
                  : [...prev.size, s],
              }))
            }
            value={s}
            key={i}
            style={{ width: "40px", height: "40px" }}
            className={`py-0 transition-main px-1 ${
              matchedFilters.size.find((ms) => ms === s)
                ? "border-0 bg-main text-white"
                : "bg-white border"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
    </SingleFilter>
  );
};

export default memo(SizeFilter);
