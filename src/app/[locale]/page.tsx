import Link from "next/link";
import CategoryList from "./_component/CategoryList";
import Hero from "./_component/Hero";
import getDictionary from "@/dictionary/dictionary";

type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  const dict = await getDictionary((await props.params).locale, "index");
  return (
    <>
      <Hero />
      <p className="hidden">{(await props.params).locale}</p>
      <div className="text-center px-4 py-2 border box-content rounded-lg mt-2 mx-auto w-max shadow-sm">
        <Link href="/product?page=1&sort=sold-desc">
          <h3>{dict.all_product_link}</h3>
        </Link>
      </div>
      <CategoryList />
    </>
  );
}
