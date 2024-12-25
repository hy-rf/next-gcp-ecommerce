"use client";

import Organizer from "@/app/[locale]/product/component/Organizer";
import { Category, FilterOptions, Product } from "@/model";
import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import LocaleContext from "../../component/LocaleContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";
/**
 * Content of filtered products
 * There is no need of token to fetch products
 */
export default function FilteredProducts({
  products,
  filterOptions,
  maxP,
  total,
  defaultFilterOptions,
  categories,
}: {
  products: Product[];
  filterOptions: FilterOptions;
  maxP: number;
  total: number;
  defaultFilterOptions: FilterOptions;
  categories: Category[];
}) {
  const { dict } = useContext(LocaleContext);
  const [options, setOptions] = useState<FilterOptions>(filterOptions);
  const [isNotFirstFetch, setIsNotFirstFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Handle click on product page link on header
  useEffect(() => {
    document?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement; // Typecasting e.target as HTMLElement
      if (target.id === "product-page-link") {
        setOptions(defaultFilterOptions);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [products]);
  // Set options which is used by all child component when filterOptions passed from parent is changed
  useEffect(() => {
    const newOptions: FilterOptions = {
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page")!) > maxP
          ? maxP
          : parseInt(searchParams.get("page")!)
        : 1,
      storeId: searchParams.get("store") || "",
      categoryId: searchParams.get("category") || "",
      subCategoryId: searchParams.get("subcategory") || "",
      minPrice: parseInt(searchParams.get("minprice") || "0"),
      maxPrice: parseInt(searchParams.get("maxprice") || "Infinity"),
      pageSize: parseInt(searchParams.get("pagesize") || "10"),
      sortOption: searchParams.get("sort") || "sold-desc",
    };
    if (isNotFirstFetch === false) {
      setIsNotFirstFetch(true);
      return;
    } else {
      setOptions(newOptions);
    }
  }, [searchParams]);
  // Push route to url with new search params when options at client component is changed
  useEffect(() => {
    if (isNotFirstFetch === false) {
      setIsNotFirstFetch(true);
      return;
    } else {
      const searchParams = new URLSearchParams();
      searchParams.append("page", options.page.toString());
      if (options.storeId !== "") searchParams.append("store", options.storeId);
      if (options.categoryId !== "")
        searchParams.append("category", options.categoryId);
      if (options.subCategoryId !== "")
        searchParams.append("subcategory", options.subCategoryId);
      if (options.minPrice > 0)
        searchParams.append("minprice", options.minPrice.toString());
      if (options.maxPrice < Infinity)
        searchParams.append("maxprice", options.maxPrice.toString());
      if (options.sortOption) searchParams.append("sort", options.sortOption);
      if (options.pageSize)
        searchParams.append("pagesize", options.pageSize.toString());
      router.push(`/product?${searchParams.toString()}`);
      console.log("Push new route because options changed");
      console.log("New options:");
      console.table(options);
      return;
    }
  }, [options]);
  return (
    <>
      <div className="flex h-full">
        <Organizer
          filterOption={options}
          setFilterOption={setOptions}
          categories={categories}
        />
        <div className="flex flex-col w-full">
          <div className="flex px-8">
            <p className="leading-8">
              {dict.product_total_1}
              {total}
              {dict.product_total_2}
            </p>
            <p className="ml-auto leading-8">
              {dict.product_select_products_per_page_text_left}
            </p>
            <select
              className="mx-4"
              onChange={(e) =>
                setOptions((old) => {
                  return {
                    ...old,
                    pageSize: parseInt(e.target.value, 10), // Convert the value to an integer
                  };
                })
              }
              value={filterOptions.pageSize} // Bind the value to the current page size
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <p className="leading-8">
              {dict.product_select_products_per_page_text_right}
            </p>
          </div>

          <div
            className="grid items-stretch grid-cols-1 md:grid-cols-2 gap-6 p-4 transform duration-100"
            style={{
              opacity: isLoading ? "0.5" : "1",
            }}
          >
            {products.map((ele) => (
              <ProductItem product={ele} key={ele.id} />
            ))}
          </div>

          <div className="flex relative mt-auto mb-12 md:pb-4">
            <div className="pagination flex text-center relative bottom-0 mt-auto mx-auto gap-8 pb-4">
              <Pagination
                page={parseInt(options.page.toString())}
                count={maxP}
                showFirstButton
                showLastButton
                onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                  setOptions((old) => {
                    return {
                      ...old,
                      page: page,
                    };
                  });
                }}
                siblingCount={1}
                boundaryCount={0}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem", // Default size
                  },
                  "@media (max-width: 767px)": {
                    "& .MuiPaginationItem-root": {
                      fontSize: "1.5rem", // Larger font size for smaller screens
                      padding: "8px 16px", // Larger padding for smaller screens
                      marginBottom: "1rem !important",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
