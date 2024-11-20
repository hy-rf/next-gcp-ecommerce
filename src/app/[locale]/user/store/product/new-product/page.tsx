"use client";

import { useState } from "react";
import DragNdrop from "./_component/DragNDrop";

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

async function filesToBase64(files: File[]): Promise<string[]> {
  const base64Promises = files.map((file) => fileToBase64(file));
  return Promise.all(base64Promises); // Wait for all files to be converted
}

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState<File[] | null>(null);
  async function handleSubmitNewProduct() {
    if (
      name == "" ||
      description == "" ||
      price == "" ||
      category == "" ||
      subCategory == "" ||
      image?.length == 0 ||
      image == null
    ) {
      return;
    }
    const imageBytes: string[] = await filesToBase64(image);

    const res = await fetch("/product/api", {
      method: "post",
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        stock: 1,
        imageList: imageBytes,
        category: category,
        subCategory: subCategory,
        createdShopId: "7I9C1WozQl20WtsDkvut",
      }),
    }).then((res) => res.json());
    console.log(res);
  }
  return (
    <div>
      <h2>Add New Product</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="sub-category">SubCategory:</label>
        <input
          type="text"
          id="sub-category"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
        />
      </div>
      <DragNdrop onFilesSelected={setImage} width="300px" height="400px" />
      <button type="submit" onClick={handleSubmitNewProduct}>
        Add Product
      </button>
    </div>
  );
}
