import { Category, FilterOptions, Product } from "@/model";
import FilteredProducts from "./_component/FilteredProducts";
import fetchData from "@/lib/fetchData";

type SearchParams = {
  page?: number;
  filter?: string;
  categoryId?: string;
  subCategoryId?: string;
  minPrice: number;
  maxPrice: number;
  storeId: string;
  sort: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    page,
    sort,
    filter,
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice,
    storeId,
  } = await searchParams;
  const defaultFilterOptions: FilterOptions = {
    page: 1,
    storeId: "",
    categoryId: "",
    subCategoryId: "",
    minPrice: 0,
    maxPrice: Infinity,
    sortOption: "sold-desc",
  };

  let searchParam = `page=${page}`;
  if (storeId) searchParam += `&storeId=${storeId}`;
  if (categoryId) searchParam += `&categoryId=${categoryId}`;
  if (subCategoryId) searchParam += `&subCategoryId=${subCategoryId}`;
  if (minPrice) searchParam += `&minPrice=${minPrice}`;
  if (maxPrice) searchParam += `&maxPrice=${maxPrice}`;
  if (sort) searchParam += `&sort=${sort}`;
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
    <div className="relative h-full">
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
          page: page || 1,
          storeId: storeId || "",
          categoryId: categoryId || "",
          subCategoryId: subCategoryId || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || Infinity,
          sortOption: "sold-desc",
        }}
        defaultFilterOptions={defaultFilterOptions}
        products={products}
        maxP={maxPages}
        totalFromServerCpomonent={total}
        categories={categories}
      />
    </div>
  );
}
