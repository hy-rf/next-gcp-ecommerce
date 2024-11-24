import fetchData from "@/lib/fetchData";
import { ProductViewModel } from "@/model";
import Image from "next/image";

type Params = {
  id: string;
};
/**
 * This component is a Next.js page component.
 * It displays product details. The product id is passed as a parameter in the URL.
 */

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const product: ProductViewModel = await fetchData<ProductViewModel>(
    `${process.env.URL}/product/api?id=${id}`,
  );
  for (let i = 0; i < product.imageUrl.length; i++) {
    product.imageUrl[i] = await fetch(product.imageUrl[i]).then((res) =>
      res.text(),
    );
  }
  return (
    <>
      <h4>Product detail</h4>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.stock}</p>
      {product.imageUrl.map((ele, index) => {
        return (
          <div key={index}>
            <Image
              src={ele}
              alt={`${index % 10 == 1 ? index + "st" : index % 10 == 2 ? index + "nd" : index % 10 == 3 ? index + "rd" : index + "th"}`}
              width={30}
              height={30}
              className="w-60 h-60 object-cover rounded-md mb-4"
            />
          </div>
        );
      })}
      <p>Category id: {product.categoryId}</p>
      <p>Subcategory id: {product.subCategoryId}</p>
      <p>createdAt: {product.createdAt}</p>
      <p>updatedAt: {product.updatedAt}</p>
      <p>createdShopId: {product.createdShopId}</p>
    </>
  );
}
