"use client";

import Organizer from "@/app/[locale]/product/_component/Organizer";
import { FilterOptions, Product } from "@/model";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

export default function FilteredProducts({
  products,
  filterOptions,
  maxP,
}: {
  products: Product[];
  filterOptions: FilterOptions;
  maxP: number;
}) {
  useEffect(() => {
    document?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement; // Typecasting e.target as HTMLElement
      if (target.id === "product-page-link") {
        setOptions({
          page: 1,
          storeId: "",
          categoryId: "",
          subCategoryId: "",
          minPrice: 0,
          maxPrice: Infinity,
          sortOption: "sold-desc",
        });
      }
    });
  }, []);
  const [options, setOptions] = useState<FilterOptions>(filterOptions);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [maxPages, setMaxPages] = useState(maxP);
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
    if (options.sortOption) {
      searchParam += `&sort=${options.sortOption}`;
    }

    fetch(`/api/product?${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data.products);
        setMaxPages(data.pages);
        try {
          window.history.pushState(null, "", `product?${searchParam}`);
        } catch {
          console.log("fail to update url");
        }
      });
  }, [options]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts.map((ele) => (
          <ProductItem ele={ele} key={ele.id} />
        ))}
      </div>
      <Organizer filterOption={options} setFilterOption={setOptions} />
      {options.page > 1 && (
        <button
          className="z-[100]"
          onClick={() => {
            const currentPage: number = options.page;
            setOptions((old) => {
              return {
                ...old,
                page: currentPage - 1,
              };
            });
          }}
        >
          Previous page
        </button>
      )}
      {options.page < maxPages && (
        <button
          className="z-[100]"
          onClick={() => {
            const currentPage: number = options.page;

            console.log(currentPage);

            setOptions((old) => {
              return {
                ...old,
                page: currentPage + 1,
              };
            });
          }}
        >
          Next page
        </button>
      )}
    </>
  );
}
