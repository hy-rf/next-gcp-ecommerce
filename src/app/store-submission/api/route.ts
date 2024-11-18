import database from "@/lib/database/database";
import { StoreSubmission, tokenPayload } from "@/model";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  return Response.error();
}

interface PostBody {
  name: string;
  description: string;
}

export async function POST(req: NextRequest) {
  var body: PostBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({
      code: 400,
      message: "Invalid request",
    });
  }
  const db = database();
  const userId: string = (() => {
    const payload: tokenPayload = jwt.verify(
      req.headers.get("Authorization")!,
      process.env.JWT_SECRET!
    ) as tokenPayload;
    return payload.userId;
  })();
  const newStoreSubmission: StoreSubmission = {
    name: body.name,
    description: body.description,
    createdUserId: userId,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  const newStoreSubmissionRef = db
    .collection("StoreSubmission")
    .add(newStoreSubmission);
  return Response.json({
    code: 200,
    message: (await newStoreSubmissionRef).id,
  });
}
