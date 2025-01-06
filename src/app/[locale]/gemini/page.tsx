"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string); // Resolving the Base64 string
      } else {
        reject("Failed to read file");
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // Read the file as a data URL (Base64)
  });
}

export default function Page() {
  const [mimeType, setMimeType] = useState("");
  const [fileString, setFileString] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  async function handleGenerate() {
    // TODO: call api
    if (mimeType === "" || fileString === "") {
      toast.error("No image");
      setName("");
      setDescription("");
      return;
    }
    const response = await fetch("/api/product/generate-name-description", {
      method: "post",
      body: JSON.stringify({
        imageBase64: fileString,
        mimeType: mimeType,
      }),
    });
    let data: { name: string; description: string };
    if (response.status == 200) {
      data = await response.json();
      setName(data.name);
      setDescription(data.description);
    }
  }
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    setFileString(await fileToBase64(files![0]));
    setMimeType(files![0].type);
  }

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleGenerate}>Generate name and description</button>
      <p>Preview</p>
      {fileString !== "" && (
        <Image src={fileString} alt={""} width={300} height={300}></Image>
      )}
      <p>Name: {name}</p>
      <p>Description: {description}</p>
    </>
  );
}
