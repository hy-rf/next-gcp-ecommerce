"use client";

import Image from "next/image";
import { Review } from "@/model";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  // get user minimal info
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h5>Reviews</h5>
      {reviews.map((el) => {
        const userId =
          el.userId[0] +
          "*".repeat(el.userId.length / 2) +
          el.userId[el.userId.length - 1];
        return (
          <div key={el.id}>
            <span className="inline-block">Reviewer: </span>
            <span className="text-gray-600"> {userId}</span>
            <div className="flex">
              {[0, 1, 2, 3, 4].map((ele, i) => {
                if (ele < el.stars) {
                  return (
                    <div key={i} className={`w-4 h-4`}>
                      <Image
                        src={"/star-fill.svg"}
                        alt={"fill"}
                        width={64}
                        height={64}
                      ></Image>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className={`w-4 h-4`}>
                      <Image
                        src={"/star-empty.svg"}
                        alt={"empty"}
                        width={64}
                        height={64}
                      ></Image>
                    </div>
                  );
                }
              })}
            </div>
            <p>{el.content}</p>
          </div>
        );
      })}
    </div>
  );
}
