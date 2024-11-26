import { cookies } from "next/headers";
import { tokenPayload } from "@/model";
import jwt from "jsonwebtoken";
import database from "@/lib/database/database";

export async function GET() {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const decoded: tokenPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as tokenPayload;
  const db = database();
  // get store document with certain id
  const storeSnapshot = await db
    .collection("Store")
    .where("ownerUserId", "==", decoded.userId)
    .get();
  return Response.json(
    storeSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }),
  );
}
export async function POST() {
  return Response.error();
}
