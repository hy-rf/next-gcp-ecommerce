import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import database from "@/lib/database/database";
import { tokenPayload } from "@/model";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token")!;
  const decoded: tokenPayload = jwt.verify(token, process.env.JWT_SECRET!) as tokenPayload;
  const db = database();
  const userRef = decoded.userId;
  const userLoginMethodSnapshot = (await db.collection("UserLoginMethod").where("userId", "==", userRef).get()).docs;
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