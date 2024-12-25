"use client";

import { GoogleGenerativeAI, SchemaType, Part } from "@google/generative-ai";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface Content {
  role: "user" | "model";
  parts: Part[];
}

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
  async function handleGenerate() {
    // if (!process.env.AI_API_KEY) {
    //   toast.error("AI not enabled!");
    //   return;
    // }
    const schema = {
      description: "Product details",
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Name of the product",
          nullable: false,
        },
        description: {
          type: SchemaType.STRING,
          description: "Description of the product",
          nullable: false,
        },
      },
    };

    const genAI = new GoogleGenerativeAI(
      "AIzaSyBM0sEmzpyj4MTrdXGNMkL37BMyubvqy70"
    );
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    const contents: Content[] = [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: fileString,
              mimeType: mimeType,
            },
          },
          { text: "Generate product name and description from the image" },
        ],
      },
    ];
    const result = await model.generateContent({ contents });
    console.log(result.response.text());
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
      <Image src={fileString} alt={""} width={300} height={300}></Image>
    </>
  );
}
