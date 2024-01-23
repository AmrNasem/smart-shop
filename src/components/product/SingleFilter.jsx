import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";

const SingleFilter = ({
  children,
  title,
  className,
  active,
  bodyClassName,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={style} className={`text-black-50 mb-5 mt-3 ${className}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fs-5 fw-bold bg-transparent border-0 d-flex gap-2 align-items-center ${
          active ? "text-warning" : "text-black-50"
        }`}
      >
        <FontAwesomeIcon
          className=" transition-main"
          style={{ transform: isOpen ? "" : "rotate(-90deg)" }}
          icon={faCaretLeft}
        />
        <span className="d-block">{title}</span>
      </button>
      {isOpen && <div className={`my-3 px-3 ${bodyClassName}`}>{children}</div>}
    </div>
  );
};

export default memo(SingleFilter);
