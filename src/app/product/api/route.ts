import database from "@/lib/database/database";
import { Category, Product, SubCategory, tokenPayload } from "@/model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import storage from "@/lib/database/storage";
import { Readable } from "stream";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("token", "test");
  return Response.json({
    message: "success",
  });
}

interface PostBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageList: File[];
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
  const categoryref = db
    .collection("Category")
    .where("name", "==", body.category);
  if ((await categoryref.get()).empty) {
    const newCategory: Category = {
      name: body.category,
    };
    const newCategoryRef = await db.collection("Category").add(newCategory);
    categoryId = newCategoryRef.id;
  } else {
    categoryId = (await categoryref.limit(1).get()).docs[0].id;
  }

  // check if subcategory is created
  let subCategoryId: string = "";
  const subCategoryref = db
    .collection("SubCategory")
    .where("name", "==", body.subCategory);
  if ((await subCategoryref.get()).empty) {
    const newSubCategory: SubCategory = {
      name: body.subCategory,
      categoryId: categoryId,
    };
    const newSubCategoryRef = await db
      .collection("SubCategory")
      .add(newSubCategory);
    subCategoryId = newSubCategoryRef.id;
  } else {
    subCategoryId = (await subCategoryref.limit(1).get()).docs[0].id;
  }

  // upload images to cloud storage
  const st = storage();
  const bucketName = "";
  const path = "images/";

  function webReadableToNodeReadable(
    webStream: ReadableStream<Uint8Array>
  ): Readable {
    const nodeReadable = new Readable({
      async read() {
        const reader = webStream.getReader();
        try {
          let result = await reader.read();
          while (!result.done) {
            this.push(result.value);
            result = await reader.read();
          }
          this.push(null); // Signal end of stream
        } catch (err) {
          this.emit("error", err);
        }
      },
    });
    return nodeReadable;
  }

  async function uploadFilesAndGetUrls(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const destination = `${path}${file.name}`;

      try {
        // Convert the Web ReadableStream to a Node.js Readable stream
        const nodeStream = webReadableToNodeReadable(file.stream());

        // Create a reference to the file in the bucket
        const fileRef = st.bucket(bucketName).file(destination);

        // Pipe the file stream to the destination
        await new Promise<void>((resolve, reject) => {
          const writeStream = fileRef.createWriteStream({
            metadata: {
              contentType: file.type, // Use the File's MIME type
            },
          });

          nodeStream
            .pipe(writeStream)
            .on("finish", resolve)
            .on("error", reject);
        });

        console.log(`Uploaded: ${file.name} to ${bucketName}/${destination}`);

        // Get public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
        urls.push(publicUrl);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }

    return urls;
  }
  const urls: string[] = await uploadFilesAndGetUrls(body.imageList);

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
    message: newProductRef.id,
  });
}
