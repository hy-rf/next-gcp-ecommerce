import { Firestore } from "@google-cloud/firestore";
export default function database() {
  if (process.env.NODE_ENV === "production") {
    return new Firestore();
  } else {
    console.log("The app is not running in production mode.");
  }

  return new Firestore({
    projectId: "e-commerce-442014",
    keyFilename: "./key.json",
  });
}
