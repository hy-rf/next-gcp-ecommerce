"use client";

import { Product } from "@/model";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState(
    product.specs ? product.specs[0] : null
  );
  const handleAddToCart = () => {
    alert(
      `Added ${quantity} of ${product.name} to cart with spec: ${selectedSpec}`
    );
    // Logic to add to cart here
  };
  return (
    <>
      {/* Right side: Controls (Specs, Quantity, Add to Cart) */}
      <div className="flex flex-col items-end space-y-4 w-full sm:w-auto">
        {/* Specification Dropdown */}
        {product.specs && (
          <div className="w-full">
            <label
              htmlFor="spec"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Specification
            </label>
            <select
              id="spec"
              className="mt-1 p-2 border rounded-md w-full"
              value={selectedSpec!}
              onChange={(e) => setSelectedSpec(e.target.value)}
            >
              {product.specs.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <label htmlFor="quantity" className="text-sm text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
            min="1"
            className="p-2 border rounded-md w-20"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
