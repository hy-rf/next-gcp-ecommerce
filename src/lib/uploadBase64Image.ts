import storage from "./database/storage";

export default async function uploadBase64Image(
  base64String: string,
  destination: string
) {
  const bucket = storage().bucket("3596b15827ad");
  const match = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 string");
  }

  const mimeType = match[1]; // e.g., "image/jpeg"
  const base64Data = match[2]; // Base64 content

  // Decode base64 string to a buffer
  const buffer = Buffer.from(base64Data, "base64");

  // Create a file object in GCS
  const file = bucket.file(destination);

  // Upload the buffer to GCS
  await file.save(buffer, {
    metadata: {
      contentType: mimeType, // Set the MIME type
    },
    resumable: false,
  });

  // Make the file publicly accessible
}
