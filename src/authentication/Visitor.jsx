import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import visitor from "./Visitor.module.css";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export const Visitor = ({ className }) => {
  return (
    <div
      className={`${className} z-3 rounded-3 pt-4 pb-3 ${visitor.container}`}
      dir="rtl"
    >
      <Link
        to="/login"
        className={`transition-main py-2 my-2 ${visitor.child}`}
      >
        <FontAwesomeIcon icon={faCircleUser} />
        <p className={`mb-0 ${visitor.signinOp}`}>تسجيل الدخول</p>
      </Link>
      <Link
        to="/signup"
        className={`transition-main py-2 my-2 ${visitor.child}`}
      >
        <FontAwesomeIcon icon={faCircleUser} />
        <p className={`mb-0 ${visitor.signupOp}`}>تسجيل جديد</p>
      </Link>
    </div>
  );
};
