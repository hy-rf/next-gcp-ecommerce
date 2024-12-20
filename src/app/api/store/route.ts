import { NextRequest } from "next/server";
import database from "@/lib/database/database";
import { Store, StoreSubmission } from "@/model";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const db = database();
  if (id) {
    const storeSnapshot = await db
      .collection("Store")
      .doc(req.nextUrl.searchParams.get("id")!)
      .get();
    return Response.json({
      id: storeSnapshot.id,
      ...storeSnapshot.data(),
    });
  }
  const storesSnapshot = db.collection("Store");
  const stores = (await storesSnapshot.get()).docs;
  return Response.json(
    stores.map((el) => {
      return {
        id: el.id,
        ...el.data(),
      };
    })
  );
}

interface PostBody {
  id: string;
}

export async function POST(req: NextRequest) {
  let body: PostBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({
      code: 400,
      message: "Invalid request",
    });
  }
  const db = database();
  // TODO: if user is not admin response unauthorized
  const storeSubmission: StoreSubmission = (
    await db.collection("StoreSubmission").doc(body.id).get()
  ).data() as StoreSubmission;
  if (storeSubmission.status !== "pending") {
    return Response.error();
  }
  const newStore: Store = {
    name: storeSubmission.name,
    description: storeSubmission.description,
    createdUserId: storeSubmission.createdUserId,
    ownerUserId: storeSubmission.createdUserId,
    // coupon: [],
  };
  const newStoreRef = (await db.collection("Store").add(newStore)).id;
  // TODO: send an email to notify store was approved

  return Response.json({
    code: 200,
    message: newStoreRef,
  });
}
