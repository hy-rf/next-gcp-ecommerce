import { Firestore } from "@google-cloud/firestore";

export default function database() {
  return new Firestore();
}
