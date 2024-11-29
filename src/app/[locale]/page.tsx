import CategoryList from "./_component/CategoryList";
import Hero from "./_component/Hero";

type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  return (
    <>
      <Hero />
      <p className="hidden">{(await props.params).locale}</p>
      <CategoryList />
    </>
  );
}
