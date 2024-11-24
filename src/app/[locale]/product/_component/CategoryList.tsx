import fetchData from "@/lib/fetchData";
import { CategoryViewModel } from "@/model";

export default async function CategoryList() {
  const categories: CategoryViewModel[] = await fetchData(`${process.env.URL}/category/api`) as CategoryViewModel[]
  return (
    <div className="flex flex-col w-[15%] border-[2px] border-[#000000ff]">
      {categories.map((item) => {
        return (
          <div key={item.id} className="p-1 hover:bg-gray-100">
            <a href={`/category/${item.id}`}>
              <p>{item.name}</p>
            </a>
          </div>
        )
      })}
    </div>
  )
}