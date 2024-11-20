"use client";

import { StoreSubmission } from "@/model";

export default function StoreSubmissionItem({ ele }: { ele: StoreSubmission }) {
  async function ApproveStoreSubmission(id: string) {
    const res = await fetch("/store/api", {
      method: "post",
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => res.json());
    console.log(res);
    console.log("id: ", res.id);
  }
  return (
    <div>
      <a href={`/store-submission/${ele.id}`}>
        <p>{ele.name}</p>
      </a>
      <p>{ele.description}</p>
      <p>{ele.submittedAt}</p>
      <p>{ele.status}</p>
      <button onClick={() => ApproveStoreSubmission(ele.id!)}>Approve</button>
    </div>
  );
}
