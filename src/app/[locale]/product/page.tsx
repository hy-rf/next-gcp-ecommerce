import fetchData from "@/lib/fetchData";
import { Product } from "@/model";
import FilteredProducts from "./_component/FilteredProducts";

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
          categoryId: "",
          subCategoryId: "",
          minPrice: 0,
          maxPrice: Infinity,
        }}
        products={products}
      />
    </div>
  );
}
