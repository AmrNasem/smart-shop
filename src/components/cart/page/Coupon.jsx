import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { toast } from "react-toastify";

const Coupon = ({ className, style }) => {
  const { totalPrice, appliedCoupons } = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState({ pattern: "", valid: true });
  const [isApplying, setIsApplying] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsApplying(true);
    fetch("http://localhost:8000/coupons")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setIsApplying(false);
        const appliedCoupon = data.find((c) => c.pattern === coupon.pattern);

        if (
          appliedCoupon &&
          !appliedCoupons.find((ac) => ac.pattern === appliedCoupon.pattern)
        ) {
          setCoupon({ pattern: "", valid: true });
          dispatch(cartActions.applyCoupon(appliedCoupon));
        } else setCoupon({ pattern: "", valid: false });
      })
      .catch(() => {
        setIsApplying(false);
        toast.error("Unable to apply coupon :(");
      });
  };

  return (
    <div style={style} className={`p-4 rounded-3 shadow ${className}`}>
      <h5>الكوبون</h5>
      <p style={{ fontWeight: 350 }} className="text-black-50 my-4">
        أدخل رمز الكوبون الخاص بك إذا كان لديك واحد..
      </p>
      <form
        style={{ opacity: isApplying ? 0.5 : 1 }}
        onSubmit={handleSubmit}
        className="d-flex flex-wrap align-items-center mt-3 mb-1 gap-3"
      >
        <input
          type="text"
          placeholder="رمز الكوبون"
          name="coupon"
          value={coupon.pattern}
          style={{ fontWeight: 350 }}
          onChange={(e) =>
            setCoupon((prevState) => ({
              ...prevState,
              pattern: e.target.value,
            }))
          }
          className="input transition-main outline-none p-2 border rounded-2"
        />
        <button
          style={{ fontWeight: 350 }}
          disabled={isApplying}
          className="bg-main border-0 text-white py-2 px-3 rounded-2"
        >
          تأكيد الكوبون
        </button>
      </form>
      {!coupon.valid && (
        <p
          style={{ fontSize: "0.8rem" }}
          className="mb-0 text-danger fw-semibold"
        >
          كوبون خاطئ
        </p>
      )}
      {appliedCoupons.map((ac, i) => (
        <p
          key={i}
          style={{ fontSize: "0.8rem" }}
          className="d-flex gap-3 align-items-center text-success mb-0 fw-semibold"
        >
          <span className="d-block">{ac.pattern}: مُطبَق</span>
          <span className="d-block">{ac.discount * 100}% خصم</span>
        </p>
      ))}
      <h5 className="mt-4">ملحوظة</h5>
      <p style={{ fontWeight: 350 }} className="text-black-50 my-4">
        إضافة ملحوظة للبائع...
      </p>
      <textarea
        style={{ maxHeight: "200px", minHeight: "80px" }}
        name="note"
        rows="5"
        placeholder="اكتب ملحوظتك هنا"
        className="input transition-main my-2 outline-none w-100 py-3 px-4 rounded-2 border"
      ></textarea>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <p>المجموع الفرعي</p>
        <p>{totalPrice} ج.م</p>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <p className="mb-0">المجموع الإجمالي</p>
        <p className="mb-0">{totalPrice} ج.م</p>
      </div>
      <p style={{ fontWeight: 350 }} className="text-black-50 my-4">
        الشحن والضرائب محسوبة عند الدفع
      </p>
      <div className="d-flex align-items-center justify-content-between gap-3">
        <button
          style={{ fontWeight: 350 }}
          className="bg-main border-0 text-white py-2 px-3 rounded-2"
        >
          تحديث السلة
        </button>
        <button
          style={{ fontWeight: 350 }}
          className="bg-main border-0 text-white py-2 px-3 rounded-2"
        >
          الدفع
        </button>
      </div>
    </div>
  );
};

export default Coupon;
