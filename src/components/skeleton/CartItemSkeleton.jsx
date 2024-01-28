import React from "react";
import Skeleton from "./Skeleton";

const CartItemSkeleton = ({ delay }) => {
  return (
    <div className="gap-3 d-flex row align-items-center my-2 pe-5">
      <div className="pe-2 col-xs col-sm-8 col-lg-5 d-flex gap-3">
        <Skeleton delay={delay} style={{ width: "100px", height: "120px" }} />
        <div className="py-1 d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <Skeleton
              delay={delay}
              className="my-1 "
              style={{ height: "0.7rem" }}
            />
            <Skeleton
              delay={delay}
              className="my-1 w-50"
              style={{ height: "0.7rem" }}
            />
          </div>
          <div>
            <Skeleton
              delay={delay}
              className="my-2"
              style={{ height: "0.7rem" }}
            />
            <Skeleton
              delay={delay}
              className="my-2"
              style={{ height: "0.7rem" }}
            />
          </div>
        </div>
      </div>
      <div className="col col-lg-2 d-none d-sm-block flex-grow-1">
        <Skeleton
          delay={delay}
          className="mx-auto"
          style={{ width: "80px", height: "0.7rem" }}
        />
      </div>
      <div className="col col-sm-8 d-none d-lg-block col-lg-2 flex-grow-1">
        <Skeleton
          delay={delay}
          className="mx-auto"
          style={{ width: "80px", height: "0.7rem" }}
        />
      </div>
      <div className="col col-lg-2 d-none d-lg-block flex-grow-1">
        <Skeleton
          delay={delay}
          className="mx-auto"
          style={{ width: "80px", height: "0.7rem" }}
        />
      </div>
    </div>
  );
};

export default CartItemSkeleton;
