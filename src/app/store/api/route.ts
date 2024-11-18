import { NextRequest } from "next/server";
import database from "@/lib/database/database";
import { Store, StoreSubmission, tokenPayload } from "@/model";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  return Response.json({
    message: "success",
  });
}

interface PostBody {
  id: string;
}

export async function POST(req: NextRequest) {
  var body: PostBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({
      code: 400,
      message: "Invalid request",
    });
  }
  const db = database();
  const userId: string = (() => {
    const payload: tokenPayload = jwt.verify(
      req.headers.get("Authorization")!,
      process.env.JWT_SECRET!
    ) as tokenPayload;
    return payload.userId;
  })();
  // TODO: if user is not admin response unauthorized
  const storeSubmission: StoreSubmission = (
    await db.collection("StoreSubmission").doc(body.id).get()
  ).data() as StoreSubmission;
  const newStore: Store = {
    name: storeSubmission.name,
    description: storeSubmission.description,
    createdUserId: storeSubmission.createdUserId,
    ownerUserId: storeSubmission.createdUserId,
    coupon: [],
  };
  const newStoreRef = (await db.collection("Store").add(newStore)).id;
  // TODO: send an email to notify store was approved

  return Response.json({
    code: 200,
    message: newStoreRef,
  });
}
