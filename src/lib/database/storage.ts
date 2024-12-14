import { Storage } from "@google-cloud/storage";

export default function storage() {
  return new Storage({
    credentials: {
      client_email: process.env.CE,
      private_key: process.env.PK,
    },
  });
}
