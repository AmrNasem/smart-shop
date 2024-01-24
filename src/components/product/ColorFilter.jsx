import React, { memo } from "react";
import SingleFilter from "./SingleFilter";

const ColorFilter = ({ matchedFilters, filters, setMatchedFilters }) => {
  return (
    <SingleFilter
      style={{ flexBasis: "calc(50% - 1rem)" }}
      className="flex-grow-1"
      active={matchedFilters.color.length}
      bodyClassName="d-flex flex-wrap gap-2"
      title="اللون"
    >
      {filters.color.map((c, i) => (
        <button
          key={i}
          title={c.text}
          className={`d-block rounded-circle transition-main ${
            matchedFilters.color.find((mc) => mc === c.text)
              ? "active-border border-info"
              : "border"
          }`}
          value={JSON.stringify(c)}
          onClick={() =>
            setMatchedFilters((prev) => ({
              ...prev,
              color: prev.color.find((mc) => mc === c.text)
                ? prev.color.filter((mc) => mc !== c.text)
                : [...prev.color, c.text],
            }))
          }
          style={{ width: "20px", height: "20px", backgroundColor: c.hexa }}
        ></button>
      ))}
    </SingleFilter>
  );
};

export default memo(ColorFilter);
