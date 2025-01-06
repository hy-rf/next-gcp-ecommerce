import { Category, FilterOptions, Product } from "@/model";
import FilteredProducts from "./component/FilteredProducts";
import fetchData from "@/lib/fetchData";

type SearchParams = {
  q?: string;
  page?: number;
  filter?: string;
  category?: string;
  subcategory?: string;
  minprice: number;
  maxprice: number;
  storeid: string;
  sort: string;
  pagesize: number;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    q,
    page,
    sort,
    filter,
    category,
    subcategory,
    minprice,
    maxprice,
    storeid,
    pagesize,
  } = await searchParams;
  const defaultFilterOptions: FilterOptions = {
    q: "",
    page: 1,
    storeId: "",
    categoryId: "",
    subCategoryId: "",
    minPrice: 0,
    maxPrice: Infinity,
    sortOption: "sold-desc",
    pageSize: 10,
  };

  let searchParam = `page=${page}`;
  if (q) searchParam += `&q=${q}`;
  if (storeid) searchParam += `&store=${storeid}`;
  if (category) searchParam += `&category=${category}`;
  if (subcategory) searchParam += `&subcategory=${subcategory}`;
  if (minprice) searchParam += `&minprice=${minprice}`;
  if (maxprice) searchParam += `&maxprice=${maxprice}`;
  if (sort) searchParam += `&sort=${sort}`;
  if (pagesize) searchParam += `&pagesize=${pagesize}`;
  const response = await fetch(
    `${process.env.URL}/api/product?${searchParam}`
  ).then((res) => res.json());
  const products = response.products as Product[];
  const maxPages = response.pages as number;
  const total = response.total as number;
  const categories = (await fetchData<Category[]>(
    `${process.env.URL}/api/category/`
  )) as Category[];
  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold text-gray-800">{filter}</h2>
      <div className="hidden">
        {products.map((ele, index) => (
          <a key={index} href={`/product/${ele.id}`}>
            <h3>{ele.name}</h3>
          </a>
        ))}
        {page && page > 1 && (
          <a href={`/product?page=${parseInt(page.toString()) - 1}`}>page-</a>
        )}
        {page && page < maxPages && (
          <a href={`/product?page=${parseInt(page.toString()) + 1}`}>page+</a>
        )}
      </div>
      <FilteredProducts
        filterOptions={{
          q: q || "",
          page: page || 1,
          storeId: storeid || "",
          categoryId: category || "",
          subCategoryId: subcategory || "",
          minPrice: minprice || 0,
          maxPrice: maxprice || Infinity,
          sortOption: "sold-desc",
          pageSize: pagesize || 10,
        }}
        defaultFilterOptions={defaultFilterOptions}
        products={products}
        maxP={maxPages}
        total={total}
        categories={categories}
      />
    </div>
  );
}
