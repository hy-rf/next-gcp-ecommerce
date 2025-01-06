import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { Order, OrderItem, tokenPayload } from "@/model";
import { APIOrderPostBody, R } from "@/model/dto";
import { NextRequest } from "next/server";

export async function GET() {
  const decoded = await getTokenPayload();
  if (!decoded) {
    return new Response(null, { status: 501 });
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

export async function POST(req: NextRequest) {
  const body: APIOrderPostBody = await req.json();
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    const res: R = {
      success: false,
      message: "Token expired",
    };
    return Response.json(res);
  }
  if (body.cartItems.length === 0) {
    const res: R = {
      success: false,
      message: "Empty order",
    };
    return Response.json(res);
  }
  const db = database();
  let total = 0;
  body.cartItems.forEach((ele) => (total += ele.price * ele.quantity));
  const orderItems: OrderItem[] = [];
  body.cartItems.forEach((ele) =>
    orderItems.push({
      productId: ele.productId,
      quantity: ele.quantity,
      unitPrice: ele.price,
    })
  );
  const newOrder: Order = {
    userId: decoded.userId,
    total: total,
    createdAt: new Date(),
    address: body.address,
    orderItems: orderItems,
  };
  body.cartItems.forEach((ele) => {
    db.collection("CartItem").doc(ele.id!).delete();
  });
  const orderRef = await db.collection("Order").add(newOrder);
  return new Response(orderRef.id, { status: 200 });
}
