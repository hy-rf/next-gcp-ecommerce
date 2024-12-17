import database from "@/lib/database/database";

export async function GET({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
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
