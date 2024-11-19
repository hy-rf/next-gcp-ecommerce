import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import database from "@/lib/database/database";
import { tokenPayload } from "@/model";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const decoded: tokenPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  const db = database();
  const userRef = decoded.userId;
  const userLoginMethodSnapshot = (
    await db.collection("UserLoginMethod").where("userId", "==", userRef).get()
  ).docs;
  const loginMethods: string[] = [];
  for (var i = 0; i < userLoginMethodSnapshot.length; i++) {
    loginMethods.push(userLoginMethodSnapshot[i].data().method);
  }
  return NextResponse.json({
    message: "Token verified successfully!",
    loginMethods,
  });
}

interface PostBody {
  method: string;
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")!;
  const decoded: tokenPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  return Response.json(decoded);
}
