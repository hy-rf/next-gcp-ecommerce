import { Firestore } from "@google-cloud/firestore";
export default function database() {
  return new Firestore({
    projectId: "e-commerce-442014",
    // keyFilename: "./key.json"
  });
}