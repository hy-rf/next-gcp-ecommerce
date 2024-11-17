import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("token", "test");
  return Response.json({
    message: "success",
  });
}