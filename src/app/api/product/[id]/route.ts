import database from "@/lib/database/database";
import { NextRequest } from "next/server";

/**
 * Working api
 */
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;
  const productSnapshot = await database().collection("Product").doc(id).get();
  return Response.json({
    id: productSnapshot.id,
    ...productSnapshot.data(),
    createdAtJSDate: productSnapshot.data()!.createdDate.toDate(),
  });
}
