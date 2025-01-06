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
    console.log("refresh expired");

    return new Response(null, {
      status: 400,
    });
  }
  const newToken = jwt.sign(
    { userId: refreshToken.userId },
    process.env.JWT_SECRET!,
    {
      expiresIn: "5m",
    }
  );
  const newRefreshToken = jwt.sign(
    { userId: refreshToken.userId },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "24h",
    }
  );
  const cookieStore = await cookies();
  cookieStore.set("token", newToken);
  cookieStore.set("refresh", newRefreshToken);
  return new Response(null, {
    status: 200,
  });
}
