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
  const subCategorySnapshot = await database()
    .collection("SubCategory")
    .doc(id)
    .get();
  if (!subCategorySnapshot.exists) {
    return new Response(null, { status: 404 });
  }
  return new Response(
    JSON.stringify({
      id: subCategorySnapshot.id,
      ...subCategorySnapshot.data(),
    }),
    { status: 200 }
  );
}
