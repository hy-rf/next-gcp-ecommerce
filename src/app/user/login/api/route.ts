import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);
  return Response.json({
    message: "success",
  });
}