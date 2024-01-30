import { memo } from "react";

const Counter = ({ className, value, changeValue, disabled, aside }) => {
  return (
    <div
      style={{
        width: "90px",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={(e) => e.preventDefault()}
      className={`${
        disabled ? "cursor-not-allowed" : "cursor-default"
      } rounded-2 overflow-hidden d-flex align-items-center ${
        aside ? "bg-counter" : ""
      } ${className}`}
    >
      <button
        className={`p-0 flex-grow-1 ${
          aside ? "bg-transparent border-0" : "border rounded-end-pill"
        }`}
        onClick={(e) => changeValue(value + 1, e)}
        disabled={disabled}
      >
        +
      </button>
      <span
        className={`flex-basis-33 text-center ${
          aside ? "" : "border-top border-bottom"
        } px-2`}
      >
        {value || 0}
      </span>
      <button
        className={`p-0 flex-grow-1 ${
          aside ? "bg-transparent border-0" : "border rounded-start-pill"
        }`}
        onClick={(e) => changeValue(value - 1, e)}
        disabled={disabled}
      >
        -
      </button>
    </div>
  );
};

export default memo(Counter);
