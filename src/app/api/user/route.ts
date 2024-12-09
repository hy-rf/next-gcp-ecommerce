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

/**
 * Password Login or Register endpoint
 * @param req
 */
export async function POST(req: NextRequest) {
  const body: {
    name: string;
    password: string;
  } = await req.json();
  // validate login
  if (body.name.trim() === "" || body.password.trim() === "")
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  const db = database();
  const userRef = db.collection("User").where("name", "==", body.name).get();
  if ((await userRef).empty) {
    db.collection("User").add({
      name: body.name,
      password: body.password,
    });
    return new Response(null, {
      status: 200,
      statusText: "Register succeed!",
    });
  }

  const user = (await userRef).docs[0];
  const userId = user.id;
  const userData = user.data() as User;
  if (userData.password && userData.password !== body.password) {
    return new Response(null, {
      status: 401,
      statusText: "Wrong password!",
    });
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "24h",
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  cookieStore.set("refresh", refreshToken);
  return new Response(null, {
    status: 200,
    statusText: "Login Succeed",
  });
}
