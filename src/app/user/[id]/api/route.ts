import database from "@/lib/database/database";
type Params = {
  id: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  const { id } = await params; // Extract the id parameter from the route

  if (!id) {
    // Handle the case when id is not present in the URL
    return new Response("Missing id parameter", { status: 400 });
  }
  const db = database();
  const user = (await db.collection("User").doc(id).get()).data();
  return Response.json(user);
}
