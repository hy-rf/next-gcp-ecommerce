import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { CartItem, Product, tokenPayload } from "@/model";
import { UpdateCartItemBody } from "@/model/dto";
import { NextRequest } from "next/server";

export async function GET() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.json({ code: 400 });
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
      message: "already in cart",
      cartItemId: (
        await db
          .collection("CartItem")
          .where("userId", "==", decoded.userId)
          .where("productId", "==", body.productId)
          .get()
      ).docs[0].id,
    });
  }
  const newCartItemId = await db.collection("CartItem").add({
    ...body,
    userId: decoded.userId,
  });
  const productRef = db.collection("Product").doc(body.productId);
  const product: Product = (await productRef.get()).data() as Product;
  productRef.update({
    stock: product.stock - body.quantity,
  });
  return Response.json(newCartItemId.id);
}

export async function PUT(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const body: UpdateCartItemBody = await req.json();
  const db = database();
  const productRef = db.collection("Product").doc(body.productId);
  async function getIsStockEnough() {
    const data: Product = (await productRef.get()).data() as Product;
    if (body.mode == "plus" && data.stock < body.number) return false;
    return true;
  }
  if (!(await getIsStockEnough()))
    return Response.json({
      code: 400,
      message: "No stock",
    });
  const product: Product = (await productRef.get()).data() as Product;
  productRef.update({
    stock:
      product.stock + (body.mode == "minus" ? body.number : -1 * body.number),
  });
  const oldCartItem = db.collection("CartItem").doc(body.id);
  if (
    body.mode == "minus" &&
    ((await oldCartItem.get()).data() as CartItem).quantity == 1
  ) {
    oldCartItem.delete();
  } else {
    oldCartItem.update({
      quantity:
        ((await oldCartItem.get()).data() as CartItem).quantity +
        (body.mode == "plus" ? body.number : -1 * body.number),
    });
  }
  return Response.json(body);
}
