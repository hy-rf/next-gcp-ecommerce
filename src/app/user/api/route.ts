import database from "@/lib/database/database";
import { tokenPayload } from "@/model";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  console.log("test", await (await cookies()).get("token"));
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  console.log(token);
  const decoded: tokenPayload = verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  const db = database();
  const user = (await db.collection("User").doc(decoded.userId).get()).data();
  return Response.json(user);
}
