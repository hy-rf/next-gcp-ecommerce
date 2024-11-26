import fetchData from "@/lib/fetchData";
import { ProductListViewModel, Store } from "@/model";
import Image from "next/image";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const storeItem: Store = await fetchData<Store>(
    `${process.env.URL}/api/store?id=${id}`,
  );
  const products: ProductListViewModel[] = await fetchData<
    ProductListViewModel[]
  >(`${process.env.URL}/api/product?storeId=${id}`);

  // Get 1st image of each product
  for (const ele of products) {
    ele.imageUrl[0] = await fetch(ele.imageUrl[0]).then((res) => res.text());
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg text-gray-800 hidden">
          A store of ID:
          <span className="text-blue-500">
            <code>{id}</code>
          </span>
        </p>
        <h1 className="text-3xl font-bold text-gray-900">{storeItem.name}</h1>
        <p className="text-gray-700">{storeItem.description}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Created by User ID: {storeItem.createdUserId}</p>
          <p>Owned by User ID: {storeItem.ownerUserId}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
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
    </div>
  );
}
