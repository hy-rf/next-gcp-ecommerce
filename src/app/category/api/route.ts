import database from "@/lib/database/database";

export async function GET() {
  const db = database();
  const categorySnapshot = (await db.collection("Category").get()).docs
  return Response.json(
    categorySnapshot.map(ele => {
      return {
        id: ele.id,
        ...ele.data()
      }
    })
  )
}