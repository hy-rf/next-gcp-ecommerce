import database from "@/lib/database/database";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;
  const db = database();
  const orderRef = await db.collection("Order").doc(id).get();
  if (!orderRef.exists) {
    return new Response(null, { status: 404 });
  }
  console.log(orderRef.data()!.createdAt);

  return new Response(
    JSON.stringify({
      id: orderRef.id,
      fireBaseTimeStamp: orderRef.data()!.createdAt,
      ...orderRef.data(),
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}

export async function POST(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}

export async function PUT(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}

export async function DELETE(req: NextRequest) {
  return new Response(JSON.stringify(await req.json()), {
    status: 200,
    statusText: "OK",
  });
}
