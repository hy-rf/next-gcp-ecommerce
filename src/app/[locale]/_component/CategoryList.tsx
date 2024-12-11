import fetchData from "@/lib/fetchData";
import { Category } from "@/model";
import Link from "next/link";

export default async function CategoryList() {
  const categories: Category[] = (await fetchData<Category[]>(
    `${process.env.URL}/api/category`
  )) as Category[];
  return (
    <div className="p-4">
      <div className="flex flex-row flex-wrap gap-1">
        {categories.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col items-center justify-center p-1 min-w-40 bg-white border-black shadow-category-card rounded-lg "
          >
            <Link href={`/product?categoryId=${ele.id}&page=1&sort=sold-desc`}>
              <p className="text-lg font-medium text-gray-800">{ele.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
