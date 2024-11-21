import getDictionary from "@/dictionary/dictionary";
import { Dictionary } from "@/model";

type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  const dict: Dictionary = await getDictionary((await props.params).locale);
  return (
    <>
      <h1>{dict.title}</h1>
      <p>carousel</p>
      <p>{(await props.params).locale}</p>
    </>
  );
}
