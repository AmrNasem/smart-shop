import React from "react";
import Skeleton from "./Skeleton";

const SingleReviewSkeleton = ({ delay }) => {
  return (
    <div className="d-flex gap-4 mt-4 py-2">
      <Skeleton
        delay={delay}
        style={{
          width: "90px",
          height: "90px",
        }}
        className="rounded-circle"
      />
      <div className="flex-grow-1">
        <div>
          <Skeleton
            delay={delay}
            style={{ height: "1.4rem" }}
            className="w-50 mb-3"
          />
          <div className="my-3">
            <Skeleton delay={delay} className="my-1" />
            <Skeleton delay={delay} className="my-1" />
            <Skeleton delay={delay} className="my-1 w-50" />
          </div>
        </div>
        <Skeleton delay={delay} className="my-2 w-25" />
        <div className="d-flex w-50 gap-2">
          <Skeleton delay={delay} />
          <Skeleton delay={delay} />
        </div>
      </div>
    </div>
  );
};

export default SingleReviewSkeleton;
