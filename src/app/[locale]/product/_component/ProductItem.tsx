"use client";
import Image from "next/image";
import { Product } from "@/model";
import AddToCartButton from "./AddToCartButton";

export default function ProductItem({ ele }: { ele: Product }) {
  return (
    <div className="flex bg-white p-4 rounded-md shadow-product-card transition-shadow w-full gap-4">
      <div className="w-40 h-40 flex-shrink-0">
        <Image
          src={ele.imageUrl[0]}
          alt={ele.name}
          width={160}
          height={160}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between">
        <a href={`/product/${ele.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{ele.name}</h3>
        </a>
        <p className="text-sm text-gray-600">{ele.description}</p>
        <p className="text-xl font-bold text-green-600">${ele.price}</p>
        <p className="text-md text-gray-700">Sold: {ele.sold}</p>
        <p className="text-md text-gray-700">In Stock: {ele.stock}</p>
        <AddToCartButton product={ele} />
      </div>
    </div>
  );
}
