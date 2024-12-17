import database from "@/lib/database/database";
import { Category, Product, SubCategory, tokenPayload } from "@/model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Query } from "@google-cloud/firestore";
import { z } from "zod";
import { uploadBase64ImagesAndGetUrls } from "@/lib/database/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("storeId");
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  let page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const productsPerPage = 5;
  const db = database();

  if (!page) {
    page = "1";
  }
  let productQuery: Query = db.collection("Product");
  if (storeId) {
    productQuery = productQuery.where("createdShopId", "==", storeId);
    // productQuery = productQuery.where(
    //   "createdShopId",
    //   "in",
    //   storeId.split(",")
    // );
  }
  if (categoryId) {
    productQuery = productQuery.where(
      "categoryId",
      "in",
      categoryId.split(",")
    );
  }
  if (subCategoryId) {
    productQuery = productQuery.where(
      "subCategoryId",
      "in",
      subCategoryId.split(",")
    );
  }
  if (sort) {
    switch (sort) {
      case "sold-desc":
        productQuery = productQuery.orderBy("sold", "desc");
        break;
      case "sold-asc":
        productQuery = productQuery.orderBy("sold", "asc");
        break;
      case "price-desc":
        productQuery = productQuery.orderBy("price", "desc");
        break;
      case "price-asc":
        productQuery = productQuery.orderBy("price", "asc");
        break;
      case "created-desc":
        productQuery = productQuery.orderBy("createdDate", "desc");
        break;
      case "created-asc":
        productQuery = productQuery.orderBy("createdDate", "asc");
        break;
      default:
        break;
    }
  }
  let products: Product[] = (await productQuery.get()).docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Product[];
  if (minPrice) {
    products = products.filter((ele) => ele.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    products = products.filter((ele) => ele.price <= parseInt(maxPrice));
  }
  const total = products.length;
  const pages =
    products.length % productsPerPage != 0
      ? Math.floor(products.length / productsPerPage) + 1
      : products.length / productsPerPage;
  products = products.slice(
    productsPerPage * (parseInt(page) - 1),
    productsPerPage * parseInt(page)
  );

  return Response.json({ pages: pages, products: products, total: total });
}

const PostBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  stock: z.number().min(0),
  imageList: z.array(z.string()),
  category: z.string(),
  subCategory: z.string(),
  createdShopId: z.string(),
  specs: z.array(z.string()).optional(),
  sold: z.number().min(0).optional(),
  condition: z.number().min(0).optional(),
});

// Infer TypeScript type directly from schema
type PostBody = z.infer<typeof PostBodySchema>;

export async function POST(req: NextRequest) {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return new Response(null, { status: 501 });
  }
  const token = tokenInRequestCookie.value;
  let body: PostBody = await req.json();
  body = PostBodySchema.parse(body);
  // Remove all leading and trailing spaces for all text inputs
  body.name = body.name.trim();
  body.description = body.description.trim();
  body.category = body.category.trim();
  body.subCategory = body.subCategory.trim();
  body.specs = body.specs?.map((spec) => spec.trim());

  const invalids = [];
  if (body.name === "") {
    invalids.push("Name Invalid");
  }
  if (body.description === "") {
    invalids.push("Description Invalid");
  }
  if (Number.isNaN(body.price)) {
    invalids.push("Price Invalid");
  }
  if (Number.isNaN(body.stock)) {
    invalids.push("Stock Invalid");
  }
  if (!body.hasOwnProperty("imageList")) {
    invalids.push("ImageList Invalid");
  }
  if (body.hasOwnProperty("imageList") && body.imageList.length === 0) {
    invalids.push("ImageList Invalid");
  }
  if (body.category === "") {
    invalids.push("Category Invalid");
  }
  if (body.subCategory === "") {
    invalids.push("SubCategory Invalid");
  }
  if (body.createdShopId === "") {
    invalids.push("CreatedShopId Invalid");
  }
  if (body.imageList.length > 5) {
    invalids.push("ImageList Too Long");
  }
  if (
    body.specs &&
    (body.specs.some((ele) => ele === "") ||
      new Set(body.specs).size !== body.specs.length)
  ) {
    invalids.push("Specs Invalid");
  }
  if (invalids.length > 0) {
    return new Response(JSON.stringify(invalids), {
      status: 400,
    });
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

  // check if category was created
  let categoryId: string = "";
  const categoryRef = db
    .collection("Category")
    .where("name", "==", body.category);
  // Add new category if input category was not found else get category id for new product
  if ((await categoryRef.get()).empty) {
    const newCategory: Category = {
      name: body.category,
    };
    const newCategoryRef = await db.collection("Category").add(newCategory);
    categoryId = newCategoryRef.id;
  } else {
    categoryId = (await categoryRef.limit(1).get()).docs[0].id;
  }

  // check if subcategory was created
  let subCategoryId: string = "";
  const subCategoryRef = db
    .collection("SubCategory")
    .where("name", "==", body.subCategory);
  // Add new sub category if input category was not found else get sub category id for new product
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
    sold: 0,
    createdDate: new Date(),
  };
  const newProductRef = await db.collection("Product").add(newProduct);
  const newProductId = newProductRef.id;

  // TODO: add watermark if condition
  if (body.condition) {
    console.log("add watermark");
  }
  const urls = await uploadBase64ImagesAndGetUrls(newProductId, body.imageList);

  await newProductRef.update({
    imageUrl: urls,
  });

  return Response.json({
    code: 200,
    message: (await newProductRef.get()).data(),
  });
}
