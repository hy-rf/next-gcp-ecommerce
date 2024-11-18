import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return Response.json({
    message: "success",
  });
}

export async function POST() {
  return Response.json({
    message: "success",
  });
}
