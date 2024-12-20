import { Store } from "@/model";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const stores: Store[] = await fetch(`${process.env.URL}/api/user/store`, {
    headers: { Cookie: (await cookies()).toString() },
  }).then((res) => res.json());
  if (stores.length < 1) {
    return (
      <>
        <Link
          href="/user/store/submit"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Create Store
        </Link>
      </>
    );
  }
  return (
    <div>
      {stores.map((ele, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex">
            <a
              href={`/product?page=1&storeId=${ele.id}&sort=sold-desc`}
              className="block mr-auto"
            >
              <h5 className="text-lg font-bold text-blue-600 hover:underline">
                {ele.name}
              </h5>
            </a>
            <Link
              href={`/user/product/new-product?id=${ele.id}`}
              className="px-4 py-2 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg transition"
            >
              New Product
            </Link>
          </div>
          <div className="store-details">
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium">Description:</span>{" "}
              {ele.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
