import database from "@/lib/database/database";
import {
  Category,
  Product,
  ProductListViewModel,
  SubCategory,
  tokenPayload,
} from "@/model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import storage from "@/lib/database/storage";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("storeId");
  if (!storeId) {
    return Response.error();
  }
  const db = database();
  const storeRef = db
    .collection("Product")
    .where("createdShopId", "==", storeId);
  const productSnapshot = await storeRef.get();
  const products: ProductListViewModel[] = productSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as ProductListViewModel[];
  console.log(products);
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
}

export async function POST(req: NextRequest) {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const body: PostBody = await req.json();
  const db = database();
  const userId: string = (() => {
    const payload: tokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
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
  const myBucket = storage().bucket("mybucket3rv");
  const directory = "photo/";

  async function uploadBase64ImagesAndGetUrls(
    images: string[],
  ): Promise<string[]> {
    const urls: string[] = [];

    for (const image of images) {
      const randomFileName = randomUUID();
      const destination = `${directory}${randomFileName}`;

      try {
        // Create a reference to the file in the bucket
        const fileRef = myBucket.file(destination);

        // Upload the buffer directly to the bucket
        await fileRef.save(image);

        // Get public URL
        const publicUrl = `https://storage.googleapis.com/mybucket3rv/${destination}`;
        urls.push(publicUrl);
      } catch (error) {
        console.error(`Error uploading ${randomFileName}:`, error);
      }
    }
    return urls;
  }
  const urls = await uploadBase64ImagesAndGetUrls(body.imageList);

  const newProduct: Product = {
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
    imageUrl: urls,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdShopId: body.createdShopId,
    salePrice: body.price,
  };
  const newProductRef = await db.collection("Product").add(newProduct);
  return Response.json({
    code: 200,
    message: (await newProductRef.get()).data(),
  });
}
