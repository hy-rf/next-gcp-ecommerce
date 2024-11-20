interface StoreSubmissionParam {
  id: string;
}

export default async function Page({
  params,
}: {
  params: Promise<StoreSubmissionParam>;
}) {
  return (
    <>
      <p>
        A store submission of id:
        <span>
          <code>{(await params).id}</code>
        </span>
      </p>
    </>
  );
}
