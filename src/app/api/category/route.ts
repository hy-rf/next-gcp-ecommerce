import database from "@/lib/database/database";
import { NextRequest } from "next/server";

/**
 * Get categories with search params
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    // Respond all categories if no id specified
    const db = database();
    const categorySnapshot = (await db.collection("Category").get()).docs;
    return Response.json(
      categorySnapshot.map((ele) => {
        return {
          id: ele.id,
          ...ele.data(),
        };
      })
    );
  }
  // Respond category which id is specified id
  const db = database();
  const categorySnapshot = await db.collection("Category").doc(id).get();
  if (!categorySnapshot.exists) {
    return new Response(null, { status: 404 });
  }
  return Response.json(categorySnapshot.data());
}
