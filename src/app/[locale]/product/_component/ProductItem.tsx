"use client";
import Image from "next/image";
import { Product } from "@/model";
import AddToCartButton from "./AddToCartButton";
// import { useContext } from "react";
// import LocaleContext from "../../_component/LocaleContext";
/**
 * Product Item Card with localization
 */
export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="flex bg-white p-2 rounded-md shadow-product-card transition-shadow w-full gap-3">
      <div className="w-40 h-40 flex-shrink-0">
        <Image
          src={product.imageUrl[0]}
          alt={product.name}
          width={160}
          height={160}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col w-full">
        <a href={`/product/${product.id}`}>
          <h3
            className="text-lg font-semibold overflow-hidden text-gray-800 text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              lineClamp: 1,
            }}
          >
            {product.name}
          </h3>
        </a>
        <p
          className="text-sm text-gray-600 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            lineClamp: 2,
          }}
        >
          {product.description}
        </p>
        <p className="text-xl font-bold text-green-600">${product.price}</p>
        <p className="text-sm text-gray-700">Sold: {product.sold}</p>
        <p className="text-sm text-gray-700">In Stock: {product.stock}</p>
        <div className="self-end mt-auto">
          <AddToCartButton
            product={product}
            showSpec={false}
            showQuantity={false}
          />
        </div>
      </div>
    </div>
  );
}
