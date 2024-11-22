import { Firestore } from "@google-cloud/firestore";
export default function database() {
  if (process.env.NODE_ENV === "production") {
    return new Firestore();
  }
  return new Firestore({
    projectId: "e-commerce-442014",
    keyFilename: "./key.json",
  });


}
