import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { CartItem, Product, tokenPayload } from "@/model";
import { UpdateCartItemBody } from "@/model/dto";
import { NextRequest } from "next/server";

export async function GET() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
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
    return new Response(JSON.stringify({ error: "Auth is required" }), {
      status: 401,
    });
  }

  const body: CartItem = await req.json();
  console.log(body);
  const db = database();
  const cartItemRefOfSameUserIdAndSpec = db
    .collection("CartItem")
    .where("userId", "==", decoded.userId)
    .where("productId", "==", body.productId);

  if (cartItemRefOfSameUserIdAndSpec.count())
    if ((await cartItemRefOfSameUserIdAndSpec.count().get()).data().count > 0) {
      return new Response(
        JSON.stringify({
          cartItemId: (
            await db
              .collection("CartItem")
              .where("userId", "==", decoded.userId)
              .where("productId", "==", body.productId)
              .get()
          ).docs[0].id,
        }),
        {
          status: 409,
          statusText: "Conflict",
        }
      );
    }
  const productRef = db.collection("Product").doc(body.productId);
  const product: Product = (await productRef.get()).data() as Product;
  const newCartItemId = await db.collection("CartItem").add({
    ...body,
    userId: decoded.userId,
  });
  productRef.update({
    stock: product.stock - body.quantity,
  });
  return new Response(JSON.stringify({ id: newCartItemId }), {
    status: 200,
    statusText: "OK",
  });
}

export async function PUT(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return new Response(null, { status: 401, statusText: "Unauthorized" });
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
  return new Response(null, {
    status: 200,
    statusText: "OK",
  });
}

export async function DELETE(req: NextRequest) {
  const body: { id: string; productId: string } = await req.json();
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  return (async (db = database()) => {
    if (!decoded)
      return new Response(null, {
        status: 401,
      });
    const cartItemToDelete = db.collection("CartItem").doc(body.id);
    if (
      ((await cartItemToDelete.get()).data() as CartItem).userId !==
      decoded.userId
    )
      return new Response(null, {
        status: 403,
      });
    const productRef = db.collection("Product").doc(body.productId);
    await productRef.update({
      quantity:
        ((await productRef.get()).data() as Product).stock +
        ((await cartItemToDelete.get()).data() as CartItem).quantity,
    });
    const result = await cartItemToDelete.delete();
    return new Response(
      JSON.stringify({
        time: result.writeTime.toDate(),
      }),
      {
        status: 200,
      }
    );
  })();
}
