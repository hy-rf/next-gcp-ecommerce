"use client";

import AddToCartButton from "@/app/[locale]/product/_component/AddToCartButton";
import Organizer from "@/app/mobile-components/Organizer";
import fetchData from "@/lib/fetchData";
import { Product } from "@/model";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
type FilterOptions = {
  page: number;
  storeId: string;
  categoryId: string;
  subCategoryId: string;
  minPrice: number;
  maxPrice: number;
};
export default function FilteredProducts({
  products,
  filterOptions,
}: {
  products: Product[];
  filterOptions: FilterOptions;
}) {
  const [options, setOptions] = useState<FilterOptions>(filterOptions);
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    console.log(options);

    let searchParam = `page=${options.page}`;
    if (options.storeId !== "") searchParam += `&storeId=${options.storeId}`;
    if (options.categoryId !== "")
      searchParam += `&categoryId=${options.categoryId}`;
    if (options.subCategoryId !== "")
      searchParam += `&subCategoryId=${options.subCategoryId}`;
    if (options.minPrice > 0) searchParam += `&minPrice=${options.minPrice}`;
    if (options.maxPrice < Infinity)
      searchParam += `&maxPrice=${options.maxPrice}`;

    fetchData<Product[]>(`/api/product?${searchParam}`).then((res) =>
      setFilteredProducts(res)
    );
  }, [options]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((ele, index) => (
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
      <button
        onClick={() =>
          setOptions((old) => {
            return {
              ...old,
              minPrice: 888,
            };
          })
        }
      >
        setminprice
      </button>
      <Organizer filterOption={options} changeFilterOption={setOptions} />
    </>
  );
}
