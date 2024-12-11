import database from "@/lib/database/database";
import { NextRequest } from "next/server";

// import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    // Respond all categories if no id specified
    const db = database();
    const categorySnapshot = (await db.collection("Category").get()).docs;
    categorySnapshot.forEach((el) => {
      console.log("jjj");

      console.log("kkk", el.data());
    });
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
  return Response.json(categorySnapshot.data());
}
