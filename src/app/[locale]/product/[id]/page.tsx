import fetchData from "@/lib/fetchData";
import { Category, Product, SubCategory } from "@/model";

import type { Metadata } from "next";
import PageContent from "./page-content";

/**
 * This component is a Next.js page component.
 * It displays product details. The product id is passed as a parameter in the URL.
 */

async function getProduct(id: string) {
  const product: Product = (await fetchData<Product>(
    `${process.env.URL}/api/product/${id}`
  )) as Product;
  return product;
}
async function getCategory(id: string) {
  const category: Category = (await fetchData<Category>(
    `${process.env.URL}/api/category/${id}`
  )) as Category;
  return category;
}
async function getSubCategory(id: string) {
  const subCategory: SubCategory = (await fetchData<Category>(
    `${process.env.URL}/api/subcategory/${id}`
  )) as SubCategory;
  return subCategory;
}
// async function getReviews(productId: string) {
//   const reviews: Review[] = (await fetchData<Review[]>(
//     `${process.env.URL}/api/review?productid=${productId}`
//   )) as Review[];
//   return reviews;
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product: Product = await getProduct(id);
  const category: Category = await getCategory(product.categoryId);
  const subCategory: SubCategory = await getSubCategory(product.subCategoryId);

  return {
    title: product.name,
    description: product.description,
    applicationName: "E-Commerce",
    keywords: `${product.name},${category.name},${subCategory.name}`,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${process.env.URL}/product/${product.id}`,
      images: [
        {
          url: `${"https://storage.googleapis.com/3596b15827ad/product/"}${product.id}-0?ignoreCache=1`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "E-Commerce",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const product: Product = await getProduct(id);
  const category: Category = await getCategory(product.categoryId);
  const subCategory: SubCategory = await getSubCategory(product.subCategoryId);

  return (
    <PageContent
      product={product}
      category={category}
      subCategory={subCategory}
    />
  );
}
