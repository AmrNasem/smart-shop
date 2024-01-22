import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import classes from "./Select.module.css";

const Select = ({
  defaultValue,
  options,
  className,
  buttonClassName,
  onChange,
  reverse,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const listRef = useRef();

  const closeSelect = useCallback(() => {
    if (listRef.current) {
      listRef.current.classList.add(classes["show-down"]);
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [listRef]);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    window.addEventListener("click", closeSelect);
    return () => window.removeEventListener("click", closeSelect);
  }, [closeSelect]);

  return (
    <div className={`${className} position-relative`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) {
            closeSelect();
          } else setIsOpen(true);
        }}
        style={{ minWidth: "170px", fontSize: "0.95rem" }}
        className={`d-flex align-items-center justify-content-between gap-2 w-100 ${
          isOpen
            ? reverse
              ? "rounded-bottom-3"
              : "rounded-top-3"
            : "rounded-3"
        } transition-main text-white bg-main ${buttonClassName} justify-content-between h-100 btn rounded-0 ${
          classes.button
        }`}
      >
        <span className="d-block text-nowrap">{selected.text}</span>
        {reverse ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </button>
      {isOpen && (
        <div
          ref={listRef}
          className={`${classes.options} ${
            reverse
              ? `rounded-top-3 ${classes["bottom-to-top"]}`
              : `rounded-bottom-3 ${classes["top-to-bottom"]}`
          } position-absolute w-100 p-1 bg-white`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(option)}
              className="text-end d-block w-100 text-start border-0 p-2 btn"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Select);
