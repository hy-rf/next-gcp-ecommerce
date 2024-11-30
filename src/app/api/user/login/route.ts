import database from "@/lib/database/database";
import { User, UserLoginMethod } from "@/model";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface PostBody {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
}

export async function POST(req: NextRequest) {
  const body: PostBody = await req.json();
  const googleUserId = body.id;

  const db = database();
  let userId: string;
  const userLoginMethodSnapshot = await db
    .collection("UserLoginMethod")
    .where("method", "==", "google")
    .where("providerUserId", "==", googleUserId)
    .limit(1)
    .get();
  if (!userLoginMethodSnapshot.empty) {
    userId = userLoginMethodSnapshot.docs[0].data().userId;
    db.collection("User").doc(userId).update({
      lastLogin: new Date().toISOString(),
    });
  } else {
    const newUser: User = {
      email: "",
      name: body.info.name,
      lastLogin: new Date().toISOString(),
    };
    const newUserRef = await db.collection("User").add(newUser);
    const newUserLoginMethod: UserLoginMethod = {
      method: "google",
      userId: newUserRef.id,
      providerUserId: googleUserId,
    };
    db.collection("UserLoginMethod").add(newUserLoginMethod);
    userId = newUserRef.id;
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "24h",
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  cookieStore.set("refresh", refreshToken);

  return Response.json({
    code: 200,
    message: token,
  });
}
