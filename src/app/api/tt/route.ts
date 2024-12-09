import { tokenPayload } from "@/model";
import { verify, TokenExpiredError } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("token");
  if (!token)
    return new Response(null, { status: 401, statusText: "Unauthorized" });
  let tokenPayload: tokenPayload | null = null;
  try {
    tokenPayload = verify(
      token?.value,
      process.env.JWT_SECRET!
    ) as tokenPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return new Response("Token Expired", {
        status: 400,
        statusText: "Token Expired",
      });
    }
  }
  if (!tokenPayload) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized Invalid Token",
    });
  }
  return new Response(JSON.stringify(tokenPayload), {
    status: 200,
    statusText: "OK",
  });
}
