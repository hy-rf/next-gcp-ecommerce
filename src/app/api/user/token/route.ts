import getTokenPayload, { getRefreshTokenPayload } from "@/lib/getTokenPayload";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const token = await getTokenPayload();
  if (!token) {
    return Response.error();
  }
  const refreshToken = await getRefreshTokenPayload();
  if (!refreshToken) {
    return Response.error();
  }
  const newToken = jwt.sign(token, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  const newRefreshToken = jwt.sign(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "24h",
    }
  );
  const cookieStore = await cookies();
  cookieStore.set("token", newToken);
  cookieStore.set("refresh", newRefreshToken);
  return Response.json({
    code: 200,
  });
}
