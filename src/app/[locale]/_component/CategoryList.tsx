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
      <div className="flex flex-row flex-wrap gap-1">
        {categories.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col items-center justify-center p-1 min-w-40 bg-white border-black shadow-category-card rounded-lg "
          >
            <Link href={`/product?categoryId=${ele.id}&page=1&sort=sold-desc`}>
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
