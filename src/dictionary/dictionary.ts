import "server-only";
import { Dictionary } from "@/model";

export default async function getDictionary(
  locale: string
): Promise<Dictionary> {
  switch (locale) {
    case "en-US":
      return (await import("./en-US.json")).default;
    default:
      return (await import("./en-US.json")).default;
  }
}
