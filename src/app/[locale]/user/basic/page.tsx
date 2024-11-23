import fetchData from "@/lib/fetchData";
import { cookies } from "next/headers";
import { User } from "@/model";

export default async function Page() {
  const user: User = await fetchData<User>(`${process.env.URL}/user/api`, {
    headers: { Cookie: (await cookies()).toString() },
  });
  return (
    <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Name:</span> {user.name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Last Login:</span>{" "}
          {user.lastLogin}
        </p>
      </div>
    </div>
  );
}
