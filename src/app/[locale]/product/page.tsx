import { Product } from "@/model";
import FilteredProducts from "./_component/FilteredProducts";

type SearchParams = {
  page?: string;
  filter?: string;
  categoryId?: string;
  subCategoryId?: string;
  minPrice: number;
  maxPrice: number;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, filter, categoryId, subCategoryId, minPrice, maxPrice } =
    await searchParams;

  const response = await fetch(
    `${process.env.URL}/api/product?categoryId=${categoryId}&page=${page}`
  ).then((res) => res.json());
  const products = response.products as Product[];
  const maxPages = response.pages as number;
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{filter}</h2>
      {!filter && (
        <div className="hidden">
          {products.map((ele, index) => (
            <a key={index} href={`/product/${ele.id}`}>
              <h3>{ele.name}</h3>
            </a>
          ))}
          <a href="page+">page+</a>
          <a href="page-">page-</a>
        </div>
      )}
      <FilteredProducts
        filterOptions={{
          page: 1,
          storeId: "",
          categoryId: categoryId || "",
          subCategoryId: subCategoryId || "",
          minPrice: minPrice,
          maxPrice: maxPrice,
        }}
        products={products}
        maxP={maxPages}
      />
    </div>
  );
}
