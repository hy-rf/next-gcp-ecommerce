import { Firestore } from "@google-cloud/firestore";

export default function database() {
  return new Firestore({
    credentials: {
      client_email: process.env.CE,
      private_key: process.env.PK,
    },
  });
}
