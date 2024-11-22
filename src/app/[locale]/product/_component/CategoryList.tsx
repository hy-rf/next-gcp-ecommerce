import fetchData from "@/lib/fetchData";
import { CategoryViewModel } from "@/model";

export default async function CategoryList() {
  const categories: CategoryViewModel[] = await fetchData(`${process.env.URL}/category/api`) as CategoryViewModel[]
  return (
    <>
      {categories.map((item) => {
        return (
          <div key={item.id}>
            <a href={`/category/${item.id}`}>
              <h4>{item.name}</h4>
            </a>
          </div>
        )
      })}
    </>
  )
}