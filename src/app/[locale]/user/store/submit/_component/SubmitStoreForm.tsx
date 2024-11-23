"use client";

import { ChangeEvent, useState } from "react";

export default function SubmitStoreForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  async function handleSubmitStore() {
    if (name == "" || description == "") {
      alert("Invalid value");
      return;
    }
    const result = await fetch("/store-submission/api", {
      method: "post",
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    }).then((res) => res.json());
    setName("");
    setDescription("");
    window.location.replace(
      `${process.env.URL}/store-submission/${result.message}`,
    );
  }
  function handleChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleChangeDescription(event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <input
        type="text"
        onChange={handleChangeName}
        value={name}
        placeholder="Enter store name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        onChange={handleChangeDescription}
        value={description}
        placeholder="Enter store description"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSubmitStore}
        className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
}
