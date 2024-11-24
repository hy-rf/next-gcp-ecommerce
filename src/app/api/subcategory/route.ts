import database from "@/lib/database/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");
  const db = database();
  if (!categoryId) {
    const subCategorySnapshot = (await db.collection("SubCategory").get()).docs;
    return Response.json(
      subCategorySnapshot.map((ele) => {
        return {
          id: ele.id,
          ...ele.data(),
        };
      })
    );
  }
  const subCategorySnapshot = (
    await db
      .collection("SubCategory")
      .where("categoryId", "==", categoryId)
      .get()
  ).docs;
  return Response.json(
    subCategorySnapshot.map((ele) => {
      return {
        id: ele.id,
        ...ele.data(),
      };
    })
  );
}
