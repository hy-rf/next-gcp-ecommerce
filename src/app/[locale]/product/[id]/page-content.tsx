"use client";

import { Product } from "@/model";
import AddToCartButton from "../_component/AddToCartButton";
import Image from "next/image";
import { useState } from "react";

export default function PageContent({ product }: { product: Product }) {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const handleMovingZoomPosition = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const { clientWidth, clientHeight } = target as HTMLImageElement;

    // Calculate zoom position as a percentage
    const x = (offsetX / clientWidth) * 100;
    const y = (offsetY / clientHeight) * 100;

    // Update zoom position state
    setZoomPosition({ x, y });
  };
  const handleChangingingZoomLevel = (
    event: React.WheelEvent<HTMLImageElement>
  ) => {
    event.preventDefault();

    // Determine zoom increment or decrement based on scroll direction
    const delta = event.deltaY > 0 ? -0.1 : 0.1;

    // Calculate the new zoom level with bounds
    setZoomLevel((prevZoom) => prevZoom + delta); // Min zoom: 1, Max zoom: 3
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h4 className="text-2xl font-semibold text-gray-800">{product.name}</h4>

      {/* Flex container for left (details) and right (controls) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Images */}
        <div className="w-40 h-40 overflow-hidden rounded-md">
          <Image
            src={`${"https://storage.googleapis.com/3596b15827ad/product/"}${product.id}-0?ignoreCache=1`}
            alt={product.name}
            width={160}
            height={160}
            className={`object-cover`}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: showImageZoom ? `scale(${zoomLevel})` : "",
            }}
            onMouseEnter={() => setShowImageZoom(true)}
            onMouseLeave={() => setShowImageZoom(false)}
            onMouseMove={handleMovingZoomPosition}
            onScroll={handleChangingingZoomLevel}
          />
        </div>

        {/* Left side: Product details */}
        <div className="flex-1 space-y-4">
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-bold text-green-600">${product.price}</p>
          <p className="text-sm text-gray-500">Sold: {product.sold}</p>
          <p className="text-sm text-gray-500">In Stock: {product.stock}</p>

          {/* Product Category and Subcategory */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Category ID:</span>{" "}
              {product.categoryId}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Subcategory ID:</span>{" "}
              {product.subCategoryId}
            </p>
          </div>

          {/* Timestamps */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Created At:</span>{" "}
              {product.createdAt}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Updated At:</span>{" "}
              {product.updatedAt}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          product={product}
          showSpec={true}
          showQuantity={true}
        />
      </div>
    </div>
  );
}
