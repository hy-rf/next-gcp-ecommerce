type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  return (
    <>
      <p>carousel</p>
    </>
  );
}
