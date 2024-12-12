import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <>
      <h3>Order success!</h3>
      <p>your order: {searchParams.id}</p>
      <Link href={`/order/${searchParams.id}`}>To Order Details</Link>
    </>
  );
}
