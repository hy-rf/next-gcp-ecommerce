import fetchData from "@/lib/fetchData";
import { Product } from "@/model";

import AddToCartButton from "../_component/AddToCartButton";
import type { Metadata } from "next";
import ZoomImage from "./_component/ZoomImage";

/**
 * This component is a Next.js page component.
 * It displays product details. The product id is passed as a parameter in the URL.
 */

async function getProduct(id: string) {
  const product: Product = await fetchData<Product>(
    `${process.env.URL}/api/product/${id}`
  );
  return product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product: Product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
    applicationName: "E-Commerce",
    keywords: `${product.name},${product.description}`,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${process.env.URL}/product/${product.id}`,
      images: [
        {
          url: product.imageUrl[0],
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "E-Commerce",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const product: Product = await getProduct(id);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h4 className="text-2xl font-semibold text-gray-800">{product.name}</h4>

      {/* Flex container for left (details) and right (controls) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: Product details */}
        <div className="flex-1 space-y-4">
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-bold text-green-600">${product.price}</p>
          <p className="text-sm text-gray-500">Sold: {product.sold}</p>
          <p className="text-sm text-gray-500">In Stock: {product.stock}</p>

          {/* Product Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.imageUrl.map((ele, index) => (
              <ZoomImage key={index} index={index} ele={ele} />
            ))}
          </div>

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
