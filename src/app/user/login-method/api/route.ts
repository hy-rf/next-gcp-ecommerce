import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import database from "@/lib/database/database";

interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token")!;
  const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  const db = database();
  const userLoginMethodSnapshot = (await db.collection("UserLoginMethod").where("userId", "==", decoded.userId).get()).docs;
  const loginMethods: string[] = [];
  for(var i=0; i< userLoginMethodSnapshot.length; i++) {
    loginMethods.push(userLoginMethodSnapshot[i].data().method);
  }
  return NextResponse.json({
    message: "Token verified successfully!",
    loginMethods
  });
}

export async function POST(req: NextRequest) {
  console.log(req);
  return Response.json({
    message: "success",
  });
}