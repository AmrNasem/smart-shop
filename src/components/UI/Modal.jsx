import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ children, className, onClick, style, closing }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClick}
        className={`position-fixed top-0 start-0 w-100 h-100 bg-backdrop ${
          closing ? classes.disappear : classes.appear
        }`}
      ></div>
      <Popup style={style} className={className}>
        {children}
      </Popup>
    </>,
    document.getElementById("root-backdrop")
  );
};

const Popup = ({ style, children, className }) => {
  return ReactDOM.createPortal(
    <div style={style} className={`position-fixed bg-white ${className}`}>
      {children}
    </div>,

    document.getElementById("root-popup")
  );
};

export default Modal;
