export default function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <>
      <h3>Order success!</h3>
      <p>your order: {searchParams.id}</p>
    </>
  );
}
