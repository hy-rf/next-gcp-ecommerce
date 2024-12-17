import "server-only";
import { Dictionary } from "@/model";

export default async function getDictionary(
  locale: string,
  namespace: string
): Promise<Dictionary> {
  switch (locale) {
    case "en-US":
      return (await import(`./en/${namespace}.ts`)).default;
    case "zh-TW":
      return (await import(`./zh-TW/${namespace}.ts`)).default;
    default:
      return (await import(`./en/${namespace}.ts`)).default;
  }
}
