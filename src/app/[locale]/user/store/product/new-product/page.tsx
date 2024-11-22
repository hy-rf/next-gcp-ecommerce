"use client";

import { useState } from "react";
import FileUploader from "./_component/FileUploader";

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
    console.log(res.code);
  }
  return (
    <div className="mt-1 max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="sub-category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            SubCategory:
          </label>
          <input
            type="text"
            id="sub-category"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image:
          </label>
          <FileUploader onFilesSelected={setImage} />
        </div>
        <button
          type="button"
          onClick={handleSubmitNewProduct}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
