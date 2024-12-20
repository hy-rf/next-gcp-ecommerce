import { Category } from "@/model";
import Link from "next/link";

export default async function CategoryList({
  categories,
  locale,
}: {
  categories: Category[];
  locale: string;
}) {
  return (
    <div className="p-4">
      <div className="">
        {categories.map((ele) => (
          <div
            key={ele.id}
            className="mx-4 my-2 px-4 py-2 text-center border border-gray-300 inline-block rounded-md"
          >
            <Link href={`/product?category=${ele.id}&page=1&sort=sold-desc`}>
              <p className="text-lg font-medium text-gray-800">
                {locale == "en-US"
                  ? ele.name
                  : (ele[`name-${locale}`] as string)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
