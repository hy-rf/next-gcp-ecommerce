"use client";

import Organizer from "@/app/[locale]/product/_component/Organizer";
import fetchData from "@/lib/fetchData";
import { Product } from "@/model";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
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
        {filteredProducts.map((ele) => (
          <ProductItem ele={ele} key={ele.id} />
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
      <Organizer filterOption={options} setFilterOption={setOptions} />
    </>
  );
}
