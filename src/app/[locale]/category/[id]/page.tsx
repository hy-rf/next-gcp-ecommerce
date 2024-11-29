import fetchData from "@/lib/fetchData";
import { Category, Product } from "@/model";
import Image from "next/image";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  console.log(id);

  const category: Category = await fetchData<Category>(
    `${process.env.URL}/api/category?id=${id}`,
  );
  const products: Product[] = await fetchData<Product[]>(
    `${process.env.URL}/api/product?categoryId=${id}`,
  );
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((ele, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-product-card transition-shadow"
          >
            <Image
              src={ele.imageUrl[0]}
              alt={ele.name}
              width={100}
              height={100}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <a href={`/product/${ele.id}`}>
              <h3 className="text-lg font-semibold text-gray-800">
                {ele.name}
              </h3>
            </a>
            <p className="text-sm text-gray-600">{ele.description}</p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>Category: {ele.categoryId}</p>
              <p>Subcategory: {ele.subCategoryId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
