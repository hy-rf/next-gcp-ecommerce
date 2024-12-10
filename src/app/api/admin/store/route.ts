import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}
export async function POST(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}
export async function PUT(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}
export async function DELETE(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}
