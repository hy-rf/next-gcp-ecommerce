import getTokenPayload from "@/lib/getTokenPayload";
import { CartItem, Product, tokenPayload } from "@/model";
import { NextRequest } from "next/server";
import database from "@/lib/database/database";

export async function GET(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    // return if unauthorized
    return Response.error();
  }
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cartId");
  const isDefaultCart = searchParams.get("isDefaultCart");
  const db = database();
  if (isDefaultCart) {
    const cartCollection = db
      .collection("User")
      .doc(decoded.userId)
      .collection("Cart");
    return Response.json(
      (await cartCollection.get()).docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }),
    );
  }
  if (!cartId) {
    // return if cart id was not provided
    return Response.error();
  }
  const cartDocument = db.collection("Cart").doc(cartId);
  if (!(await cartDocument.get()).exists) {
    // return if cart is not existed
    return Response.error();
  }
  const cartItemSnapshot = await cartDocument.collection("CartItem").get();
  const cartItems: CartItem[] = cartItemSnapshot.docs.map((doc) =>
    doc.data(),
  ) as CartItem[];
  return Response.json(cartItems);
}

// post is not in use
export async function POST(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const db = database();
  const { searchParams } = new URL(req.url);
  const cartItem: CartItem = await req.json();
  const cartId = searchParams.get("cartId");
  const isDefaultCart = searchParams.get("isDefaultCart");
  if (isDefaultCart) {
    const id = (
      await db
        .collection("User")
        .doc(decoded.userId)
        .collection("Cart")
        .add(cartItem)
    ).id;
    return Response.json({ id });
  }
  if (!cartId) return Response.error();
  const cartDocument = db.collection("Cart").doc(cartId);
  if (!(await cartDocument.get()).exists) {
    return Response.error();
  }
  const newCartItemRef = await cartDocument
    .collection("CartItem")
    .add(cartItem);
  return Response.json(newCartItemRef.id);
}

// unused
export async function DELETE() {
  return Response.json({
    message: "success",
  });
}

export async function PUT(req: NextRequest) {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return Response.error();
  }
  const body = (await req.json()) as CartItem[];
  const db = database();
  const cartCollection = db
    .collection("User")
    .doc(decoded.userId)
    .collection("Cart");

  // Step 1: Delete all documents in the collection
  const snapshot = await cartCollection.get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref); // Delete each document
  });
  body.forEach(async ele => {
    const product = await db.collection("Product").doc(ele.productId).get()
    const old = (await cartCollection.where("productId", "==", ele.productId).get()).docs
    if (!product.exists) {
      return Response.error()
    }
    if ((product.data() as Product).stock - ele.quantity + (old.length > 0 ? old[0].data().quantity : 0) < 0) {
      return Response.json({ message: "no stock" })
    }
  })

  // Step 2: Add the new documents

  body.forEach((item) => {
    const newDocRef = cartCollection.doc(); // Create a new document reference
    batch.set(newDocRef, item); // Add each item to the new document
  });

  // Commit the batch operation
  try {
    await batch.commit();
    return Response.json(
      (await cartCollection.get()).docs.map((doc) => doc.data()),
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
