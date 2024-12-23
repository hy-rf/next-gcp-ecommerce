import database from "@/lib/database/database";
import getTokenPayload from "@/lib/getTokenPayload";
import { Review, tokenPayload } from "@/model";
import { AddReviewDto } from "@/model/dto";
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
  let postBody: AddReviewDto;
  try {
    postBody = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
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
  const db = database();
  const newReview: Review = {
    stars: postBody.stars,
    productId: postBody.productId,
    userId: decoded.userId,
  };
  const result = await db.collection("Review").add(newReview);
  return new Response(
    JSON.stringify({
      result,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
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
