import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import database from "@/lib/database/database";
import { tokenPayload } from "@/model";
import getTokenPayload from "@/lib/getTokenPayload";

export async function GET() {
  const decoded = await getTokenPayload();
  if (!decoded) {
    return Response.error();
  }
  const db = database();
  const userRef = decoded.userId;
  const userLoginMethodSnapshot = (
    await db.collection("UserLoginMethod").where("userId", "==", userRef).get()
  ).docs;
  const loginMethods: string[] = [];
  for (let i = 0; i < userLoginMethodSnapshot.length; i++) {
    loginMethods.push(userLoginMethodSnapshot[i].data().method);
  }
  return NextResponse.json(loginMethods);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")!;
  const decoded: tokenPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as tokenPayload;
  return Response.json(decoded);
}
