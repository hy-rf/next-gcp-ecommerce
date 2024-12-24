"use client";

import { AddReviewDto } from "@/model/dto";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "sonner";
import LocaleContext from "../../component/LocaleContext";

export default function AddReviewForm({ productId }: { productId: string }) {
  const [currentStar, setCurrentStar] = useState(0);
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);
  const { dict } = useContext(LocaleContext);
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
      <label htmlFor="review-content">
        {dict.product_review_content_label_text}
      </label>
      <input
        className="border border-gray-500 rounded-sm"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div onMouseLeave={() => setCurrentStar(0)} className="flex" id="stars">
        {[1, 2, 3, 4, 5].map((el, index) => {
          return (
            <div
              key={el}
              className={`w-4 h-4`}
              onMouseOver={() => setCurrentStar(index + 1)}
              onClick={() => {
                setStars(index + 1);
                setCurrentStar(0);
                document.getElementById("stars")?.children[index].animate(
                  [
                    { transform: "scale(1)", transformOrigin: "center" },
                    { transform: "scale(1.5)", transformOrigin: "center" },
                    { transform: "scale(1)", transformOrigin: "center" },
                  ],
                  {
                    duration: 300,
                    iterations: 1,
                  }
                );
              }}
            >
              {currentStar >= index + 1 ||
              (stars >= index + 1 && currentStar == 0) ? (
                <Image
                  src={"/star-fill.svg"}
                  alt={"fill"}
                  width={64}
                  height={64}
                ></Image>
              ) : (
                <Image
                  src={"/star-empty.svg"}
                  alt={"empty"}
                  width={64}
                  height={64}
                ></Image>
              )}
            </div>
          );
        })}
        <p>Your Star: {stars}</p>
      </div>
      <button onClick={handleAddReview}>Review</button>
    </>
  );
}
