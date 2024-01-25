import React from "react";
import Skeleton from "./Skeleton";

const ProductCardSkeleton = ({ minWidth, className, delay }) => {
  return (
    <div>
      <Skeleton
        delay={delay}
        className={className}
        style={{ minHeight: "300px", minWidth }}
      />
      <div className="py-2">
        <div className="d-flex gap-3">
          <div style={{ flex: 2 }}>
            <Skeleton delay={delay} className="my-2" />
            <Skeleton delay={delay} className="my-2" />
          </div>
          <div className="flex-grow-1">
            <Skeleton delay={delay} className="my-2" />
            <Skeleton
              delay={delay}
              className="my-2 w-75 me-auto"
              style={{ height: "0.7rem" }}
            />
          </div>
        </div>
        <div className="w-75 my-2 d-flex gap-1">
          <Skeleton delay={delay} style={{ width: "2rem", height: "2rem" }} />
          <Skeleton delay={delay} style={{ width: "2rem", height: "2rem" }} />
          <Skeleton delay={delay} style={{ width: "2rem", height: "2rem" }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
