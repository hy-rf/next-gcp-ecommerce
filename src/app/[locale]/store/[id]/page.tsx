import { Product } from "@/model";
import Filter from "@/app/[locale]/store/[id]/Filter";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    page: number;
    filter?: string;
    categoryId?: string;
    subCategoryId?: string;
    minPrice: number;
    maxPrice: number;
    sort: string;
  };
}) {
  const { id } = params;
  const { page, sort } = searchParams;
  const queryString = `?page=${page || 1}&store=${id}&sort=${sort || "sold-desc"}`;
  const response = await fetch(`${process.env.URL}/api/product${queryString}`);
  let products: Product[] = [];
  if (response.status === 200) {
    products = (await response.json()).products;
  }
  return (
    <>
      <div>
        {products.map((el) => (
          <div key={el.id}>{el.name}</div>
        ))}
      </div>
      <div>
        <Link
          href={{
            pathname: `/store/${id}`,
            query: {
              sort: "sold-asc",
              page: 1,
            },
          }}
        >
          to asc
        </Link>
        <Filter />
      </div>
    </>
  );
}
