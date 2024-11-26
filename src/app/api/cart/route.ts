import { Cart, tokenPayload } from "@/model";
import getTokenPayload from "@/lib/getTokenPayload";
import database from "@/lib/database/database";

export async function GET() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const userId = decoded.userId;
  const db = database();
  const cartSnapshot = await db
    .collection("Cart")
    .where("userId", "==", userId)
    .get();
  // Now only one cart per user
  return Response.json(cartSnapshot.docs.map((doc) => doc.data())[0]);
}

export async function POST() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const userId = decoded.userId;
  const db = database();
  const newCart: Cart = {
    userId: userId,
  };
  const newCartSnapshot = await db.collection("Cart").add(newCart);
  return Response.json({
    newCartId: newCartSnapshot.id,
  });
}
