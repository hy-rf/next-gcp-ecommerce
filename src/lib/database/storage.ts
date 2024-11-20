import { Storage } from "@google-cloud/storage";

export default function storage() {
  if (process.env.NODE_ENV === "production") {
    return new Storage();
  } else {
    return new Storage({
      projectId: "e-commerce-442014",
      keyFilename: "./key.json",
    });
  }
}
