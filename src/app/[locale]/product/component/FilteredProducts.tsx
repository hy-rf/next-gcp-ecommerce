"use client";

import Organizer from "@/app/[locale]/product/component/Organizer";
import { Category, FilterOptions, Product } from "@/model";
import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import LocaleContext from "../../component/LocaleContext";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";
/**
 * Content of filtered products
 * There is no need of token to fetch products
 */
export default function FilteredProducts({
  products,
  filterOptions,
  maxP,
  totalFromServerCpomonent,
  defaultFilterOptions,
  categories,
}: {
  products: Product[];
  filterOptions: FilterOptions;
  maxP: number;
  totalFromServerCpomonent: number;
  defaultFilterOptions: FilterOptions;
  categories: Category[];
}) {
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const storeId = searchParams.get("store");
      const categoryId = searchParams.get("category");
      const subCategoryId = searchParams.get("subcategory");
      const minPrice = searchParams.get("minprice");
      const maxPrice = searchParams.get("maxprice");
      const page = searchParams.get("page");
      const sort = searchParams.get("sort");
      const pageSize = searchParams.get("pagesize");
      setOptions({
        page: page ? parseInt(page) : 1,
        storeId: storeId ? storeId : "",
        categoryId: categoryId ? categoryId : "",
        subCategoryId: subCategoryId ? subCategoryId : "",
        minPrice: minPrice ? parseFloat(minPrice) : 0,
        maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
        sortOption: sort ? sort : "sold-desc",
        pageSize: pageSize ? parseInt(pageSize) : 10,
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const { dict } = useContext(LocaleContext);
  useEffect(() => {
    document?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement; // Typecasting e.target as HTMLElement
      if (target.id === "product-page-link") {
        setOptions(defaultFilterOptions);
      }
    });
  }, []);
  const [options, setOptions] = useState<FilterOptions>(filterOptions);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [maxPages, setMaxPages] = useState(maxP);
  const [total, setTotal] = useState(totalFromServerCpomonent);
  const [isNotFirstFetch, setIsNotFirstFetch] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isNotFirstFetch === false) {
      setIsNotFirstFetch(true);
      return;
    } else {
      setIsLoading(true);
      console.log("GETTING");

      let searchParam = `page=${options.page}`;
      if (options.storeId !== "") searchParam += `&store=${options.storeId}`;
      if (options.categoryId !== "")
        searchParam += `&category=${options.categoryId}`;
      if (options.subCategoryId !== "")
        searchParam += `&subcategory=${options.subCategoryId}`;
      if (options.minPrice > 0) searchParam += `&minprice=${options.minPrice}`;
      if (options.maxPrice < Infinity)
        searchParam += `&maxprice=${options.maxPrice}`;
      if (options.sortOption) {
        searchParam += `&sort=${options.sortOption}`;
      }
      if (options.pageSize) {
        searchParam += `&pagesize=${options.pageSize}`;
      }

      fetch(`/api/product?${searchParam}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredProducts(data.products);
          setMaxPages(data.pages);
          setTotal(data.total);
          if (data.pages < options.page) {
            // TODO: this causes one additonal re-render and api call
            setOptions((old) => {
              return {
                ...old,
                page: data.pages,
              };
            });
          }
          setIsLoading(false);
          try {
            router.push(`product?${searchParam}`);
            // window.history.pushState(null, "", `product?${searchParam}`);
          } catch {
            console.log("fail to update url");
          }
        });
    }
  }, [options]);
  return (
    <>
      <div className="flex h-full">
        {false && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Filter Options
            </h3>
            <div className="space-y-4 flex justify-around w-full">
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Sort Option:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  {options.sortOption}
                </p>
              </div>
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Min Price:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  ${options.minPrice}
                </p>
              </div>
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Max Price:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  ${options.maxPrice}
                </p>
              </div>
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Category:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  {options.categoryId || "All"}
                </p>
              </div>
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Subcategory:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  {options.subCategoryId || "All"}
                </p>
              </div>
              <div className="w-full m-0" style={{ marginTop: 0 }}>
                <p className="text-gray-600 font-medium mb-1">Store:</p>
                <p className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  {options.storeId || "All"}
                </p>
              </div>
            </div>
          </div>
        )}

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
              value={options.pageSize} // Bind the value to the current page size
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
            className="grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 transform duration-100"
            style={{
              opacity: isLoading ? "0.5" : "1",
            }}
          >
            {filteredProducts.map((ele) => (
              <ProductItem product={ele} key={ele.id} />
            ))}
          </div>

          <div className="flex relative mt-auto mb-12 md:pb-4">
            <div className="pagination flex text-center relative bottom-0 mt-auto mx-auto gap-8 pb-4">
              <Pagination
                page={parseInt(options.page.toString())}
                count={maxPages}
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
