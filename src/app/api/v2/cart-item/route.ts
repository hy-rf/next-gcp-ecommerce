import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { CartItem, tokenPayload } from "@/model";
import { NextRequest } from "next/server";

export async function GET() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  return Response.json(
    (
      await database()
        .collection("CartItem")
        .where("userId", "==", decoded.userId)
        .get()
    ).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
  );
}

export async function POST(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const body: CartItem = await req.json();
  const db = database();
  if (
    !(
      await db
        .collection("CartItem")
        .where("userId", "==", decoded.userId)
        .where("productId", "==", body.productId)
        .get()
    ).empty
  ) {
    return Response.json({
      code: 400,
      message: "product is already in cart",
    });
  }
  const newCartItemId = await db.collection("CartItem").add({
    ...body,
    userId: decoded.userId,
  });
  return Response.json(newCartItemId.id);
}

export async function PUT(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const body: CartItem = await req.json();
  return Response.json(body);
}
