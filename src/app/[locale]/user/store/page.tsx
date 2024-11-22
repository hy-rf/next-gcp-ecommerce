import Link from "next/link";
import StoreSubmissions from "./_component/StoreSubmissions";
import StoreList from "./_component/StoreList";

export default async function Page() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800">Store</h3>
      <nav className="flex justify-between items-center gap-4 bg-white p-4 rounded-md shadow-sm">
        <Link
          href="/user/store/submit"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Create Store
        </Link>
        <Link
          href="/user/store/product/new-product"
          className="px-4 py-2 text-blue-500 hover:text-blue-600 border border-blue-500 hover:border-blue-600 rounded-md"
        >
          New Product for my Store
        </Link>
      </nav>
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">My Stores</h3>
        <StoreList />
      </div>
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          My Store Submissions
        </h3>
        <StoreSubmissions />
      </div>
    </div>
  );
}
