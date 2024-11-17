import database from "@/lib/database/database";
import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("token", "test");
  const db = database();
  const test = db.collection("user").doc("test");
  await test.set({
    created: new Date().toISOString(),
    lastlogin: new Date().toISOString(),
  });
  return Response.json({
    message: "success",
  });
}