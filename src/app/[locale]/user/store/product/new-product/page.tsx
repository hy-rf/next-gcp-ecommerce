"use client";

import { useCallback, useEffect, useState } from "react";
import FileUploader from "./_component/FileUploader";
import FileNameHint from "./_component/FileNameHint";
import Image from "next/image";
import Modal from "@/components/Modal";

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
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState<number>(1);
  const [specs, setSpecs] = useState<string[]>([]);
  const [image, setImage] = useState<File[] | null>(null);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  // const [isPriceValid, setIsPriceValid] = useState(true);
  // const [isCategoryValid, setIsCategoryValid] = useState(true);
  // const [isSubCategoryValid, setIsSubCategoryValid] = useState(true);
  // const [isStockValid, setIsStockValid] = useState(true);
  // const [isImageValid, setIsImageValid] = useState(true);
  const [isSpecsValid, setIsSpecsValid] = useState(true);

  const [showFileNameHint, setShowFileNameHint] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [hintPositionX, setHintPositionX] = useState(0);
  const [hintPositionY, setHintPositionY] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  async function handleMovingHint(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    setHintPositionX(e.clientX);
    setHintPositionY(e.clientY);
  }
  async function handleShowingImageName(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    image: File
  ) {
    setShowFileNameHint(true);
    setSelectedFileName(image.name);
  }

  async function handleChangeSpec(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    setSpecs((oldSpecs) => {
      const newSpecs = [...oldSpecs]; // Create a shallow copy of the old array
      newSpecs[index] = e.target.value; // Update the value at the specific index
      return newSpecs; // Return the updated array
    });
  }

  async function handleDeleteSpec(index: number) {
    const halfBeforeTheUnwantedElement = specs.slice(0, index);
    const halfAfterTheUnwantedElement = specs.slice(index + 1);
    setSpecs(halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement));
  }

  const handleSubmitNewProduct = useCallback(async () => {
    if (
      name == "" ||
      description == "" ||
      Number.isNaN(price) ||
      category == "" ||
      subCategory == "" ||
      image?.length == 0 ||
      image == null ||
      specs.some((ele) => ele === "") ||
      new Set(specs).size !== specs.length
    ) {
      alert("Invalid Input");
      setShowConfirmModal(false);
      return;
    }
    const imageBytes: string[] = await filesToBase64(image);

    const res = await fetch("/api/product", {
      method: "post",
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imageList: imageBytes,
        category: category,
        subCategory: subCategory,
        createdShopId: "7I9C1WozQl20WtsDkvut",
        specs: specs,
      }),
    }).then((res) => res.json());
    if (res.code == 400) {
      alert(res.message);
    }
    setIsFormSubmit(false);
    setShowConfirmModal(false);
  }, [category, description, image, name, price, specs, stock, subCategory]);
  useEffect(() => {
    if (isFormSubmit) handleSubmitNewProduct();
  }, [isFormSubmit, handleSubmitNewProduct]);
  return (
    <div className="mt-1 max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <div className="space-y-4">
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
            onBlur={() => setIsNameValid(name !== "")}
            className={`w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
            style={{
              borderColor: !isNameValid ? "red" : "",
            }}
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
            onBlur={() => setIsDescriptionValid(description !== "")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            style={{
              borderColor: !isDescriptionValid ? "red" : "",
            }}
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
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="0"
            step="1"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            min="0"
            step="1"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div
          className="flex flex-col gap-1"
          style={{
            borderColor: !isSpecsValid ? "red" : "",
          }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specs:
          </label>
          <button
            style={{ alignSelf: "flex-end" }}
            onClick={() => setSpecs((old) => [...old, ""])}
          >
            +
          </button>
          <div className="flex flex-col gap-1">
            {specs.map((ele, index) => (
              <div key={index} className="flex">
                <input
                  type="text"
                  value={ele}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeSpec(e, index)
                  }
                  onBlur={() => {
                    setIsSpecsValid(
                      !(
                        specs.some((ele) => ele === "") ||
                        new Set(specs).size !== specs.length
                      )
                    );
                  }}
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{
                    borderColor: !isSpecsValid ? "red" : "",
                  }}
                />
                <button onClick={() => handleDeleteSpec(index)}>x</button>
              </div>
            ))}
          </div>
        </div>
        {/* select category */}
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
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* select subcategory */}
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
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image:
          </label>
          <FileUploader onFilesSelected={setImage} />
          <div className="flex flex-row flex-wrap">
            {image?.map((item, index) => {
              return (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  src={URL.createObjectURL(item)}
                  alt={item.name}
                  onMouseEnter={(e) => handleShowingImageName(e, item)}
                  onMouseMove={handleMovingHint}
                  onMouseLeave={() => setShowFileNameHint(false)}
                />
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
      {showConfirmModal && (
        <Modal
          action={() => setIsFormSubmit(true)}
          action2={() => setShowConfirmModal(false)}
        />
      )}
      {showFileNameHint && (
        <FileNameHint
          hintPositionX={hintPositionX}
          hintPositionY={hintPositionY}
          selectedFileName={selectedFileName}
        />
      )}
    </div>
  );
}
