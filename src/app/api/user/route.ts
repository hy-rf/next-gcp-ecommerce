import database from "@/lib/database/database";
import { tokenPayload, User } from "@/model";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return Response.error();
  }
  const token = tokenInRequestCookie.value;
  const decoded: tokenPayload = verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  const db = database();
  const user = (await db.collection("User").doc(decoded.userId).get()).data();
  return Response.json(user);
}

interface LoginPostBody {
  name: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: LoginPostBody = await req.json();
  if (body.name === "" || body.password === "")
    return Response.json({
      code: 400,
      message: "Invalid data",
    });
  const db = database();
  const userRef = db.collection("User").where("name", "==", body.name).get();
  if ((await userRef).empty) {
    db.collection("User").add({
      name: body.name,
      password: body.password,
    });
    return Response.json({
      message: "Register succeed",
    });
  }

  const user = (await userRef).docs[0];
  const userId = user.id;
  const userData = user.data() as User;
  if (userData.password && userData.password !== body.password) {
    return Response.json({
      message: "Wrong password",
    });
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
