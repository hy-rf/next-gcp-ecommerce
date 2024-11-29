import database from "@/lib/database/database";
import { Category, Product, SubCategory, tokenPayload } from "@/model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import uploadBase64Image from "@/lib/uploadBase64Image";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("storeId");
  const productId = searchParams.get("id");
  const db = database();
  if (productId) {
    const productSnapshot = await db.collection("Product").doc(productId).get();
    return Response.json({
      id: productSnapshot.id,
      ...productSnapshot.data(),
    });
  }
  if (!storeId) {
    return Response.error();
  }
  const storeRef = db
    .collection("Product")
    .where("createdShopId", "==", storeId);
  const productSnapshot = await storeRef.get();
  const products: Product[] = productSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Product[];
  return Response.json(products);
}

interface PostBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageList: string[];
  category: string;
  subCategory: string;
  createdShopId: string;
  specs?: string[];
}

export async function POST(req: NextRequest) {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const body: PostBody = await req.json();
  if (body.name === "") {
    return Response.error();
  }
  if (body.description === "") {
    return Response.error();
  }
  if (body.price.toString() === "") {
    return Response.error();
  }
  if (body.stock.toString() === "") {
    return Response.error();
  }
  if (body.imageList.length === 0) {
    return Response.error();
  }
  if (body.category === "") {
    return Response.error();
  }
  if (body.subCategory === "") {
    return Response.error();
  }
  if (body.createdShopId === "") {
    return Response.error();
  }
  if (body.imageList.length > 5) {
    return Response.error();
  }
  if (
    body.specs &&
    (body.specs.some((ele) => ele === "") ||
      new Set(body.specs).size !== body.specs.length)
  ) {
    return Response.error();
  }
  const db = database();
  const userId: string = (() => {
    const payload: tokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as tokenPayload;
    return payload.userId;
  })();
  // check if user owns any store
  const storeRef = db.collection("Store").where("ownerUserId", "==", userId);
  if ((await storeRef.get()).empty) {
    return Response.error();
  }

  // check if user owns the store where store id equals storeid from body
  if (
    (await storeRef.get()).docs.every((ele) => ele.id !== body.createdShopId)
  ) {
    return Response.error();
  }

  // check if category is created
  let categoryId: string = "";
  const categoryRef = db
    .collection("Category")
    .where("name", "==", body.category);
  // Add new category if input category is not found else get category id for new product
  if ((await categoryRef.get()).empty) {
    const newCategory: Category = {
      name: body.category,
    };
    const newCategoryRef = await db.collection("Category").add(newCategory);
    categoryId = newCategoryRef.id;
  } else {
    categoryId = (await categoryRef.limit(1).get()).docs[0].id;
  }

  // check if subcategory is created
  let subCategoryId: string = "";
  const subCategoryRef = db
    .collection("SubCategory")
    .where("name", "==", body.subCategory);
  // Add new sub category if input category is not found else get sub category id for new product
  if ((await subCategoryRef.get()).empty) {
    const newSubCategory: SubCategory = {
      name: body.subCategory,
      categoryId: categoryId,
    };
    const newSubCategoryRef = await db
      .collection("SubCategory")
      .add(newSubCategory);
    subCategoryId = newSubCategoryRef.id;
  } else {
    subCategoryId = (await subCategoryRef.limit(1).get()).docs[0].id;
  }

  // upload images to cloud storage
  const directory = "product";

  async function uploadBase64ImagesAndGetUrls(
    newProductId: string,
    images: string[]
  ): Promise<string[]> {
    const urls: string[] = [];
    let index = 0;
    for (const image of images) {
      const destination = `${directory}/${newProductId}-${index}`;

      try {
        // Create a reference to the file in the bucket
        await uploadBase64Image(image, destination);

        // Get public URL
        const publicUrl = `https://storage.googleapis.com/mybucket3rv/${destination}`;
        urls.push(publicUrl);
        index++;
      } catch (error) {
        console.error(`Error uploading`, error);
      }
    }
    return urls;
  }

  const newProduct: Product = {
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
    imageUrl: [],
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdShopId: body.createdShopId,
    salePrice: body.price,
    specs: body.specs,
  };
  const newProductRef = await db.collection("Product").add(newProduct);
  const newProductId = newProductRef.id;

  const urls = await uploadBase64ImagesAndGetUrls(newProductId, body.imageList);

  await newProductRef.update({
    imageUrl: urls,
  });

  return Response.json({
    code: 200,
    message: (await newProductRef.get()).data(),
  });
}
