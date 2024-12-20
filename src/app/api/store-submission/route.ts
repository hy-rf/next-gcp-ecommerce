import database from "@/lib/database/database";
import { StoreSubmission, tokenPayload } from "@/model";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const decoded: tokenPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  const db = database();
  const storeSubmittedByAuthorizedUserSnapshot = userId
    ? (
        await db
          .collection("StoreSubmission")
          .where("createdUserId", "==", decoded.userId)
          .get()
      ).docs
    : (await db.collection("StoreSubmission").get()).docs;
  const storeSubmittedByAuthorizedUser: StoreSubmission[] = [];
  for (const snapshot of storeSubmittedByAuthorizedUserSnapshot) {
    const storeData = snapshot.data() as Partial<StoreSubmission>; // Ensure partial typing for data
    storeSubmittedByAuthorizedUser.push({
      id: snapshot.id,
      ...storeData,
    } as StoreSubmission);
  }
  return Response.json(storeSubmittedByAuthorizedUser);
}

interface PostBody {
  name: string;
  description: string;
}

export async function POST(req: NextRequest) {
  let body: PostBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({
      code: 400,
      message: "Invalid request",
    });
  }
  const db = database();
  const token = (await cookies()).get("token")!.value;
  const userId: string = (() => {
    const payload: tokenPayload = jwt.verify(
      token,
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
