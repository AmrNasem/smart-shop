import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import signed from "./SignedinUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../store/authSlice";
import { cartActions } from "../store/cart-slice";

export const UserSigned = ({ className }) => {
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div
      className={`${className} z-3 rounded-3 pt-4 pb-3 ${signed.container}`}
      dir="rtl"
    >
      {" "}
      {authedUser && (
        <>
          <div className={signed.above}>
            <FontAwesomeIcon icon={faCircleUser} className={signed.userLogo} />
            <div className={signed}>
              <p className="mb-0 pe-1">{authedUser.name}</p>
              <p className="mb-0">{authedUser.email}</p>
            </div>
          </div>
          <div className={signed.hr}></div>
        </>
      )}
      <div className={signed.down}>
        <div className={`transition-main py-2 my-2 ${signed.horzintal}`}>
          <FontAwesomeIcon icon={faSliders} />
          <p className="mb-0">لوحة التحكم</p>
        </div>
        <div className={`transition-main py-2 my-2 ${signed.horzintal}`}>
          <FontAwesomeIcon icon={faCircleUser} />
          <p className="mb-0">تفاصيل الحساب</p>
        </div>
        <button
          onClick={() => {
            dispatch(cartActions.resetCart());
            dispatch(logoutUser());
          }}
          className={`transition-main bg-transparent py-2 my-2 ${signed.horzintal}`}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <p className="mb-0">تسجيل الخروج</p>
        </button>
      </div>
    </div>
  );
};
