// utils/authUtil.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { tokenPayload } from "@/model";

export default async function getTokenPayload(): Promise<tokenPayload | null> {
  const tokenInRequestCookie = (await cookies()).get("token");
  if (!tokenInRequestCookie) {
    return null;
  }
  const token = tokenInRequestCookie.value;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as tokenPayload;
  } catch {
    console.log("token verification failed, need refresh");

    return null;
  }
}

export async function getRefreshTokenPayload(): Promise<tokenPayload | null> {
  const tokenInRequestCookie = (await cookies()).get("refresh");
  if (!tokenInRequestCookie) {
    return null;
  }
  const token = tokenInRequestCookie.value;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as tokenPayload;
  } catch {
    return null;
  }
}
