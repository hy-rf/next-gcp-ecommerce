"use client";

import { AddReviewDto } from "@/model/dto";
import { useState } from "react";
import { toast } from "sonner";

export default function AddReviewForm({ productId }: { productId: string }) {
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);

  const handleAddReview = async () => {
    const postBody: AddReviewDto = {
      stars: stars,
      content: content,
      productId: productId,
    };
    const res = await fetch("/api/review", {
      method: "post",
      body: JSON.stringify(postBody),
    });
    if (res.status === 200) toast.success("Add review success");
  };
  return (
    <>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="number"
        value={stars}
        onChange={(e) => setStars(parseInt(e.target.value))}
      />
      <button onClick={handleAddReview}>Review</button>
    </>
  );
}
