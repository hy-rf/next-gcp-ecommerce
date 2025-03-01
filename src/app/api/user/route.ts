import database from "@/lib/database/database";
import { tokenPayload, User } from "@/model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import getTokenPayload from "@/lib/getTokenPayload";

export async function GET() {
  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
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
  // Add user refresh token to db
  if (
    userData.refreshToken == undefined ||
    userData.refreshToken.trim() == ""
  ) {
    db.collection("User").doc(userId).update({
      refreshToken: refreshToken,
    });
  }
  const cookieStore = cookies();
  cookieStore.set("token", token);
  cookieStore.set("refresh", refreshToken);
  cookieStore.set("loggedIn", "1");
  return new Response(null, {
    status: 201,
    statusText: "Login Succeed",
  });
}
