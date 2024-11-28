import "server-only";
import { Dictionary } from "@/model";

export default async function getDictionary(
  locale: string,
  part: string
): Promise<Dictionary> {
  switch (locale) {
    case "en-US":
      return (await import(`./en/${part}.ts`)).default;
    case "zh-TW":
      return (await import(`./zh-TW/${part}.ts`)).default;
    default:
      return (await import(`./en/${part}.ts`)).default;
  }
}
