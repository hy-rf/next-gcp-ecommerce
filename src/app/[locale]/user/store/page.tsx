import Link from "next/link";
import StoreList from "./_component/StoreList";

export default async function Page() {
  // Show seller dashboard if user owns a store
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Store
      </h3>

      {/* Navigation */}
      <nav className="flex justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Link
          href="/user/store/submit"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Create Store
        </Link>
        <Link
          href="/user/store"
          className="px-4 py-2 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-lg transition"
        >
          Store Profile
        </Link>
      </nav>

      {/* Store List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          My Stores
        </h4>
        <StoreList />
      </div>
    </div>
  );
}
