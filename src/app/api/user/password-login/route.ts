import { NextRequest } from "next/server";

interface PostBody {
  email?: string;
  name?: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: PostBody = await req.json();
  return Response.json(body);
}
