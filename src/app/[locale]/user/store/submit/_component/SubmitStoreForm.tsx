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
      `${process.env.URL}/store-submission/${result.message}`
    );
  }
  function handleChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleChangeDescription(event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  }

  return (
    <>
      <input type="text" onChange={handleChangeName} value={name} />
      <input
        type="text"
        onChange={handleChangeDescription}
        value={description}
      />
      <button onClick={handleSubmitStore}>Submit</button>
    </>
  );
}
