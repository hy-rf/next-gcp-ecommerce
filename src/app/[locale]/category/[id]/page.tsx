import fetchData from "@/lib/fetchData";
import { Category, SubCategoryViewModel } from "@/model";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  console.log(id);

  const category: Category = await fetchData<Category>(
    `${process.env.URL}/api/category?id=${id}`
  );
  const subCategories: SubCategoryViewModel[] = await fetchData<
    SubCategoryViewModel[]
  >(`${process.env.URL}/api/subcategory?id=${id}`);
  return (
    <>
      <h4>{category.name}</h4>
      <div>
        {subCategories.map((ele) => {
          return (
            <div key={ele.id}>
              <h5>Subcategory name: {ele.name}</h5>
              <p>Category Id: {ele.categoryId}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
