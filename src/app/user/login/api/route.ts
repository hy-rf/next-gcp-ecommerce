import database from "@/lib/database/database";
import { User, UserLoginMethod } from "@/model";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface PostBody {
  id: string;
}

export async function POST(req: NextRequest) {
  const body: PostBody = await req.json();
  const googleUserId = body.id;
  var token: string = "";
  const db = database();
  const userLoginMethodSnapshot = await db.collection("UserLoginMethod").where("method", "==", "google").where("providerUserId", "==", googleUserId).limit(1).get();
  const localDate = new Date();
  if(!userLoginMethodSnapshot.empty) {
    const userId = userLoginMethodSnapshot.docs[0].data().userId;
    token = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    userId.update({
      lastLogin: new Date().toISOString()
    });
  } else {
    const newUser: User = {
      email: "",
      name: "",
      lastLogin: new Date().toISOString()
    }
    const newUserRef = await db.collection("User").add(newUser);
    const newUserLoginMethod: UserLoginMethod = {
      method: "google",
      userId: newUserRef.id,
      providerUserId: googleUserId
    }
    db.collection("UserLoginMethod").add(newUserLoginMethod);
    token = jwt.sign(
      { userId: newUserRef.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  }
  
  return Response.json({
    code: 200,
    message: token
  });
}