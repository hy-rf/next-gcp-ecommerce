import { Storage } from "@google-cloud/storage";
import uploadBase64Image from "../uploadBase64Image";

export default function storage() {
  return new Storage();
}

const directory = "product";

export async function uploadBase64ImagesAndGetUrls(
  newProductId: string,
  images: string[]
): Promise<string[]> {
  const urls: string[] = [];
  let index = 0;
  for (const image of images) {
    const destination = `${directory}/${newProductId}-${index}`;

    try {
      // Create a reference to the file in the bucket
      await uploadBase64Image(image, destination);

      // Get public URL
      const publicUrl = `https://storage.googleapis.com/3596b15827ad/${destination}`;
      urls.push(publicUrl);
      index++;
    } catch (error) {
      console.error(`Error uploading`, error);
    }
  }
  return urls;
}
