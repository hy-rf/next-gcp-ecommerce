import database from "@/lib/database/database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);
  const googleUserId = "";
  const db = database();
  const user = db.collection("UserLoginMethod").where("method", "==", "google").where("providerUserId", "==", googleUserId);
  console.log(user);
  
  return Response.json({
    message: "success",
  });
}