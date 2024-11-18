import database from "@/lib/database/database";
import { User, UserLoginMethod } from "@/model";
import { NextRequest } from "next/server";

interface PostBody {
  id: string;
}
export async function POST(req: NextRequest) {
  const body: PostBody = await req.json();
  const googleUserId = body.id;
  const db = database();
  const userLoginMethodSnapshot = await db.collection("UserLoginMethod").where("method", "==", "google").where("providerUserId", "==", googleUserId).limit(1).get();
  if(!userLoginMethodSnapshot.empty) {
    const userId = userLoginMethodSnapshot.docs[0].data().userId;
    const userSnapshot = db.collection("User").doc(userId);
    userSnapshot.update({
      lastLogin: new Date().toISOString()
    });
  } else {
    const newUser: User = {
      email: "",
      name: "",
      lastLogin: new Date()
    }
    const newUserRef = await db.collection("User").add(newUser);
    const newUserLoginMethod: UserLoginMethod = {
      method: "google",
      userId: newUserRef.id,
      providerUserId: googleUserId
    }
    db.collection("UserLoginMethod").add(newUserLoginMethod)
  }
  
  return Response.json({
    code: 200,
    message: "success",
  });
}