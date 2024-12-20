import database from "@/lib/database/database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: {
    name: string;
    password: string;
  } = await req.json();
  const db = database();
  const isUserExists = !(
    await db.collection("User").where("name", "==", body.name).get()
  ).empty;
  if (isUserExists)
    return new Response(null, {
      status: 200,
    });
  return new Response(null, {
    status: 206,
  });
}
