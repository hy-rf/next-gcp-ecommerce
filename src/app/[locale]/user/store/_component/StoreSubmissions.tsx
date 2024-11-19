"use client";

import { StoreSubmission } from "@/model";
import { useEffect, useState } from "react";

export default function StoreSubmissions() {
  const [storeSubmissions, setStoreSubmissions] = useState<StoreSubmission[]>();
  useEffect(() => {
    (async () => {
      const res = await fetch("/store-submission/api").then((res) =>
        res.json()
      );

      setStoreSubmissions(res.storeSubmittedByAuthorizedUser);
    })();
  }, []);
  return (
    <>
      {storeSubmissions?.map((ele, index) => {
        return (
          <div key={index}>
            <a>{ele.name}</a>
            <p>{ele.description}</p>
          </div>
        );
      })}
    </>
  );
}
