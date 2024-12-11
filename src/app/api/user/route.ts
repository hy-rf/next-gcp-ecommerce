import database from "@/lib/database/database";
import { tokenPayload, User } from "@/model";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const tokenInRequestCookie = cookies().get("token");
  if (!tokenInRequestCookie) {
    return new Response(null, {
      status: 400,
    });
  }
  const token = tokenInRequestCookie.value;
  const decoded: tokenPayload = verify(
    token,
    process.env.JWT_SECRET!
  ) as tokenPayload;
  const db = database();
  const user = (
    await db.collection("User").doc(decoded.userId).get()
  ).data() as User;
  return Response.json({
    name: user.name,
    email: user.email,
    lastLogin: user.lastLogin,
  });
}

/**
 * Password Login or Register endpoint
 *
 */
export async function POST(req: NextRequest) {
  const body: {
    name: string;
    password: string;
  } = await req.json();
  // Validate login info
  if (body.name.trim() === "" || body.password.trim() === "")
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  const db = database();
  // Check if user exists, register if not exist
  const userRef = db.collection("User").where("name", "==", body.name).get();
  if ((await userRef).empty) {
    db.collection("User").add({
      name: body.name,
      password: body.password,
    });
    return new Response(null, {
      status: 206,
      statusText: "Register succeed",
    });
  }
  // User exists then validate password
  const user = (await userRef).docs[0];
  const userId = user.id;
  const userData = user.data() as User;
  if (userData.password && userData.password !== body.password) {
    return new Response(null, {
      status: 401,
      statusText: "Wrong password",
    });
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!);
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  cookieStore.set("refresh", refreshToken, {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  cookieStore.set("loggedIn", "1", {
    sameSite: "none",
    secure: true,
  });
  return new Response(null, {
    status: 201,
    statusText: "Login Succeed",
  });
}
