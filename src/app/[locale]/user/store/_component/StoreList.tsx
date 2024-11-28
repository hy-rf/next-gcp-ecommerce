import { StoreListViewModel } from "@/model";
import { cookies } from "next/headers";

export default async function StoreList() {
  const stores: StoreListViewModel[] = await fetch(
    `${process.env.URL}/api/user/store`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  ).then((res) => res.json());
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stores.map((ele, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <a href={`/store/${ele.id}`} className="block">
            <h5 className="text-lg font-bold text-blue-600 hover:underline">
              {ele.name}
            </h5>
          </a>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-medium">Description:</span> {ele.description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium">Owned by:</span> {ele.ownerUserId}
          </p>
        </div>
      ))}
    </div>
  );
}
