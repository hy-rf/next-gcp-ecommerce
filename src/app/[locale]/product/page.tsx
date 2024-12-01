import fetchData from "@/lib/fetchData";
import { Product } from "@/model";
import Image from "next/image";
import AddToCartButton from "@/app/[locale]/product/_component/AddToCartButton";

import Organizer from "@/app/mobile-components/Organizer";
import FilteredProducts from "../_component/FilteredProducts";

type SearchParams = {
  page?: string;
  filter?: string;
  categoryId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, filter, categoryId } = await searchParams;

  const products: Product[] = await fetchData<Product[]>(
    `${process.env.URL}/api/product?categoryId=${categoryId}&page=${page}`
  );
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{filter}</h2>
      {!filter && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((ele, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-product-card transition-shadow"
            >
              <Image
                src={ele.imageUrl[0]}
                alt={ele.name}
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <a href={`/product/${ele.id}`}>
                <h3 className="text-lg font-semibold text-gray-800">
                  {ele.name}
                </h3>
              </a>
              <p className="text-sm text-gray-600">{ele.description}</p>
              <div className="text-sm text-gray-500 mt-2 space-y-1">
                <p>Category: {ele.categoryId}</p>
                <p>Subcategory: {ele.subCategoryId}</p>
              </div>
              <AddToCartButton product={ele} />
            </div>
          ))}
        </div>
      )}
      {filter && <FilteredProducts products={products} />}
      <Organizer />
    </div>
  );
}
