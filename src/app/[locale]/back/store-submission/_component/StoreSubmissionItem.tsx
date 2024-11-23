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
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <a
        href={`/store-submission/${ele.id}`}
        className="block text-lg font-semibold text-blue-500 hover:underline"
      >
        {ele.name}
      </a>
      <p className="text-gray-700">{ele.description}</p>
      <p className="text-sm text-gray-500">Submitted At: {ele.submittedAt}</p>
      <p
        className={`text-sm font-medium ${
          ele.status === "approved"
            ? "text-green-600"
            : ele.status === "rejected"
              ? "text-red-600"
              : "text-yellow-600"
        }`}
      >
        Status: {ele.status}
      </p>
      <button
        onClick={() => ApproveStoreSubmission(ele.id!)}
        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Approve
      </button>
    </div>
  );
}
