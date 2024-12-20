import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const newLocale = searchParams.get("newLocale");
  if (!newLocale) return Response.error();

  (await cookies()).set("locale", newLocale);
  return Response.json({ code: 200 });
}
