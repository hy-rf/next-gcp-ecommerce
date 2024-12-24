"use client";

import { Review } from "@/model";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  // get user minimal info
  return (
    <div>
      {reviews.map((el) => {
        return (
          <div key={el.id}>
            <p>{el.stars}</p>
            <p>{el.content}</p>
            <p>{el.userId}</p>
          </div>
        );
      })}
    </div>
  );
}
