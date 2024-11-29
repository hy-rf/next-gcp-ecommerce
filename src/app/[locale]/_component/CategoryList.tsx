import fetchData from "@/lib/fetchData";
import { Category } from "@/model";

export default async function CategoryList() {
  const categories: Category[] = await fetchData<Category[]>(
    `${process.env.URL}/api/category`
  );
  return (
    <div className="pt-4">
      <div className="flex flex-row flex-wrap gap-1">
        {categories.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col items-center justify-center p-1 min-w-40 bg-white border-black shadow-category-card rounded-lg "
          >
            <a href={`/category/${ele.id}`}>
              <p className="text-lg font-medium text-gray-800">{ele.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
