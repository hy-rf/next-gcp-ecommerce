import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { Review, tokenPayload } from "@/model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productid");
  const db = database();
  // Build query
  const reviewQuery = db
    .collection("Review")
    .where("productId", "==", productId);
  // Execute query
  const reviewDocuments = (await reviewQuery.get()).docs;
  // Process data to include ids of each documents and assert type
  const reviews: Review[] = reviewDocuments.map((el) => {
    const data = el.data() as Omit<Review, "id">;
    return {
      id: el.id,
      ...data,
    };
  });
  return new Response(JSON.stringify(reviews), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  let postBody: {
    stars: number;
    productId: string;
  };
  try {
    postBody = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  console.log(postBody);

  const decoded: tokenPayload = (await getTokenPayload()) as tokenPayload;
  if (!decoded) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  // Check if user has permission to review product(bought, reviewed)
  // Check if review content is acceptable
  // Add review to database
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
