import Link from "next/link";
import CategoryList from "./component/CategoryList";
import Hero from "./component/Hero";
import getDictionary from "@/dictionary/dictionary";
import { Category, Store } from "@/model";
import fetchData from "@/lib/fetchData";

type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  const dict = await getDictionary((await props.params).locale, "index");
  const categories: Category[] = (await fetchData<Category[]>(
    `${process.env.URL}/api/category`
  )) as Category[];
  const stores: Store[] = (await fetchData<Store[]>(
    `${process.env.URL}/api/store`
  )) as Store[];
  return (
    <>
      <Hero />
      <p className="hidden">{(await props.params).locale}</p>
      <div className="text-center px-4 py-2 border box-content rounded-lg mt-2 mx-auto w-max shadow-sm">
        <Link href="/product?page=1&sort=sold-desc">
          <h3>{dict.all_product_link}</h3>
        </Link>
      </div>
      <CategoryList
        locale={(await props.params).locale}
        categories={categories}
      />
      <div className="text-center">
        <h4>Popular shops</h4>
        <div className="store-list">
          {stores.map((el) => (
            <div
              className="store-item mx-4 my-2 px-4 py-2 text-center border border-gray-300 inline-block rounded-md"
              key={el.id}
            >
              <Link href={`/store/${el.id}?page=1`}>{el.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
