import database from "@/lib/database/database";

/**
 * Working api
 */
export async function GET(
  req: Request,
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
  });
}
