import getDictionary from "@/dictionary/dictionary";
import { Store } from "@/model";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale, "index");
  const stores: Store[] = await fetch(`${process.env.URL}/api/user/store`, {
    headers: { Cookie: (await cookies()).toString() },
  }).then((res) => res.json());
  if (stores.length < 1) {
    return (
      <div className="text-center">
        <h2>Start Your Business and Maximize Your Profits!</h2>
        <Link
          href="/user/store/submit"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Create Store
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2>Your Business</h2>
      <div className="flex flex-col md:grid md:grid-cols-2 border">
        <div className="w-[500px] md:w-auto md:mx-0 mx-auto border-2 border-blue-500 rounded-lg p-4 bg-gray-50 shadow-md">
          <h2 className="text-xl font-bold text-blue-500 mb-4">
            {dict.business_subtitle_sales_performance_metrics}
          </h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-700">Total Items Sold:</strong> 5,234
            </li>
            <li>
              <strong className="text-gray-700">Revenue Generated:</strong>{" "}
              $78,450
            </li>
            <li>
              <strong className="text-gray-700">Sell-Through Rate:</strong> 92%
            </li>
            <li>
              <strong className="text-gray-700">Average Selling Price:</strong>{" "}
              $15.00
            </li>
            <li>
              <strong className="text-gray-700">Repeat Customers Rate:</strong>{" "}
              38%
            </li>
            <li>
              <strong className="text-gray-700">Positive Feedback:</strong> 98%
            </li>
            <li>
              <strong className="text-gray-700">Average Rating:</strong> 4.9/5
            </li>
            <li>
              <strong className="text-gray-700">Return Rate:</strong> 2%
            </li>
            <li>
              <strong className="text-gray-700">Shipping Speed:</strong> 99% on
              time
            </li>
            <li>
              <strong className="text-gray-700">Top Seller Rank:</strong> Top 5%
              in Electronics
            </li>
          </ul>
        </div>
        <div className="w-[500px] md:w-auto md:mx-0 mx-auto border-2 border-green-500 rounded-lg p-4 bg-gray-50 shadow-md">
          <h2 className="text-xl font-bold text-green-500 mb-4">
            {dict.business_subtitle_customer_satisfaction_metrics}
          </h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-700">Positive Feedback:</strong> 98%
            </li>
            <li>
              <strong className="text-gray-700">Average Rating:</strong> 4.9/5
            </li>
            <li>
              <strong className="text-gray-700">Response Time:</strong> 1 hour
            </li>
            <li>
              <strong className="text-gray-700">Return Rate:</strong> 2%
            </li>
          </ul>
        </div>

        <div className="w-[500px] md:w-auto md:mx-0 mx-auto border-2 border-yellow-500 rounded-lg p-4 bg-gray-50 shadow-md">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">
            {dict.business_subtitle_market_comparison}
          </h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-700">Top Seller Rank:</strong> Top 5%
              in Electronics
            </li>
            <li>
              <strong className="text-gray-700">Category Leaderboard:</strong>{" "}
              #3 in Mobile Accessories
            </li>
          </ul>
        </div>

        <div className="w-[500px] md:w-auto md:mx-0 mx-auto border-2 border-blue-500 rounded-lg p-4 bg-gray-50 shadow-md">
          <h2 className="text-xl font-bold text-blue-500 mb-4">
            {dict.business_subtitle_trust_and_reliability_indicators}
          </h2>
          <ul className="space-y-2">
            <li>
              <strong className="text-gray-700">Shipping Speed:</strong> 99% on
              time
            </li>
            <li>
              <strong className="text-gray-700">Verified Listings:</strong> All
              items verified
            </li>
            <li>
              <strong className="text-gray-700">Top Rated Seller:</strong> eBay
              Verified
            </li>
          </ul>
        </div>
      </div>
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
