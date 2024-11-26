"use client";

import { StoreSubmission } from "@/model";
import { useEffect, useState } from "react";

export default function StoreSubmissions() {
  const [storeSubmissions, setStoreSubmissions] = useState<StoreSubmission[]>();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/store-submission").then((res) =>
        res.json()
      );

      setStoreSubmissions(res);
    })();
  }, []);
  return (
    <>
      {storeSubmissions?.map((ele, index) => {
        return (
          <div key={index}>
            <a href={`/store-submission/${ele.id}`}>
              <p>{ele.name}</p>
            </a>
            <p>{ele.description}</p>
          </div>
        );
      })}
    </>
  );
}
