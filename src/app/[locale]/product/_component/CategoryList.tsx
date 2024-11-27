import fetchData from "@/lib/fetchData";
import { CategoryViewModel } from "@/model";

export default async function CategoryList() {
  const categories: CategoryViewModel[] = (await fetchData(
    `${process.env.URL}/api/category`
  )) as CategoryViewModel[];
  return (
    <div className="flex flex-row gap-5 border-[2px] border-[#000000ff]">
      {categories.map((item) => {
        return (
          <div key={item.id} className="relative group">
            <a href={`/category/${item.id}`} className="p-1 hover:bg-gray-100">
              <p>{item.name}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
}
