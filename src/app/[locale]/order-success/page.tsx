import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Order Success!
        </h3>
        <p className="text-gray-600 mb-6">
          Your order ID:{" "}
          <span className="font-semibold text-gray-800">{searchParams.id}</span>
        </p>
        <Link
          href={`/order/${searchParams.id}`}
          className="inline-block rounded-md bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition duration-300"
        >
          View Order Details
        </Link>
      </div>
    </div>
  );
}
