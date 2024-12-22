import database from "@/lib/database/database";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  const categorySnapshot = await database()
    .collection("Category")
    .doc(id)
    .get();
  return Response.json({
    id: categorySnapshot.id,
    ...categorySnapshot.data(),
  });
}
