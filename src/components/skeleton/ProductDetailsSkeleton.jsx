import React from "react";
import Skeleton from "./Skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <section className="container my-5 d-flex flex-wrap flex-lg-nowrap gap-5">
      <div className="w-50">
        <Skeleton style={{ height: "500px" }} className="mb-2" />
        <div className="d-flex gap-2 overflow-auto scrollbar-none flex-grow-1">
          {[...Array(10).keys()].map((i) => (
            <Skeleton
              key={i}
              style={{ minWidth: "100px", minHeight: "100px" }}
            />
          ))}
        </div>
      </div>
      <div className="flex-grow-1">
        <Skeleton className="mb-4 w-50" style={{ height: "1.8rem" }} />
        <Skeleton className="my-4 w-50" />
        <Skeleton className="my-4 w-25" />
        <div className="my-4">
          <Skeleton style={{ height: "2rem" }} />
        </div>
        <div className="my-4">
          <Skeleton className="my-2 w-25" style={{ height: "1.3rem" }} />
          <div className="my-2 d-flex gap-2">
            {[...Array(3).keys()].map((i) => (
              <Skeleton
                key={i}
                delay={i}
                className="rounded-circle"
                style={{ width: "25px", height: "25px" }}
              />
            ))}
          </div>
        </div>
        <div className="my-4">
          <Skeleton className="my-1 w-25" style={{ height: "1.3rem" }} />
          <div className="w-25 my-2 d-flex gap-2">
            {[...Array(3).keys()].map((i) => (
              <Skeleton
                key={i}
                delay={i}
                className=" w-25"
                style={{ height: "1.8rem" }}
              />
            ))}
          </div>
        </div>
        <div className="d-flex gap-3 my-3 w-50">
          <Skeleton className="rounded-pill" style={{ height: "2rem" }} />
          <Skeleton style={{ height: "2rem" }} />
        </div>
        <Skeleton className="my-4 w-25" style={{ height: "2rem" }} />
        <Skeleton className="my-4" style={{ height: "3rem" }} />
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
