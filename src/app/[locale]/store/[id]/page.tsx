import fetchData from "@/lib/fetchData";
import { Product, Store } from "@/model";
import Image from "next/image";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const storeItem: Store = await fetchData<Store>(
    `${process.env.URL}/store/api?id=${id}`,
  );
  const products: Product[] = await fetchData<Product[]>(
    `${process.env.URL}/product/api?storeId=${id}`,
  );
  // get 1st of images each product
  for (const ele of products) {
    ele.imageUrl[0] = await fetch(ele.imageUrl[0]).then((res) => res.text());
  }

  return (
    <>
      <p>
        A store of id:
        <span>
          <code>{id}</code>
        </span>
      </p>
      <p>{storeItem.name}</p>
      <p>{storeItem.description}</p>
      <p>{storeItem.createdUserId}</p>
      <p>{storeItem.ownerUserId}</p>
      {products.map((ele, index) => {
        return (
          <div className="product-item" key={index}>
            <p>{ele.name}</p>
            <p>{ele.description}</p>
            <p>{ele.categoryId}</p>
            <p>{ele.subCategoryId}</p>
            <Image
              src={ele.imageUrl[0]}
              alt={ele.name}
              width={100}
              height={100}
            ></Image>
          </div>
        );
      })}
    </>
  );
}
