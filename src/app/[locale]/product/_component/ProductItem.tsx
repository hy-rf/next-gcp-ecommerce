"use client";
import Image from "next/image";
import { Product } from "@/model";
import AddToCartButton from "./AddToCartButton";

export default function ProductItem({ ele }: { ele: Product }) {
  return (
    <div className="flex bg-white p-4 rounded-md shadow-product-card transition-shadow">
      <div>
        <Image
          src={ele.imageUrl[0]}
          alt={ele.name}
          width={100}
          height={100}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      </div>
      <div>
        <a href={`/product/${ele.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{ele.name}</h3>
        </a>
        <p className="text-sm text-gray-600">{ele.description}</p>
        <p className="text-xl font-bold text-green-600">${ele.price}</p>
        <p className="text-xl font-bold text-green-600">Sold: {ele.sold}</p>
        <p className="text-xl font-bold text-green-600">
          In Stock: {ele.stock}
        </p>
        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p>Category: {ele.categoryId}</p>
          <p>Subcategory: {ele.subCategoryId}</p>
        </div>
        <AddToCartButton product={ele} />
      </div>
    </div>
  );
}
