import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";

export async function GET() {
  const decoded = await getTokenPayload();
  if (!decoded) {
    return Response.error();
  }
  const db = database();
  const userRef = decoded.userId;
  const orders = (
    await db.collection("Order").where("userId", "==", userRef).get()
  ).docs;
  return Response.json(
    orders.map((ele) => {
      return {
        id: ele.id,
        ...ele.data(),
      };
    })
  );
}
export async function POST() {
  return Response.json({
    message: "success",
  });
}
