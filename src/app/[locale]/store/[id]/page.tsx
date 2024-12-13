import { Product } from "@/model";
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
  const queryString = `?page=${page}&storeId=${id}&sort=${sort || "sold-desc"}`;
  const response = await fetch(`${process.env.URL}/api/product${queryString}`);
  let products: Product[] = [];
  if (response.status === 200) {
    products = (await response.json()).products;
  }
  return (
    <>
      {products.map((el) => (
        <div key={el.id}>{el.name}</div>
      ))}
      <Link href={`/store/${id}?page=1&sort=sold-asc`}>to</Link>
    </>
  );
}
