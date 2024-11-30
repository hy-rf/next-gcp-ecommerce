"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // To get the current pathname
import { Dictionary } from "@/model";

export default function Sidebar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname(); // Get current path

  // Function to check if the current route matches
  const isActive = (route: string) => pathname.endsWith(route);

  return (
    <nav className="w-33 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      <ul>
        <li className={`${pathname.endsWith("user") && "bg-gray-700 text-white shadow-md dark:bg-gray-600"} space-y-4 rounded-md text-gray-700 px-1 py-2`}>
          <Link href="/user" aria-label="User Dashboard">
            <h2 className={`text-2xl font-bold ml-3 mb-1`}>
              {dict.layout_title}
            </h2>
          </Link>
        </li>
        {[
          { path: "/user/basic", label: "Basic" },
          { path: "/user/login-method", label: "Authorization" },
          { path: "/user/payment", label: "Payment" },
          { path: "/user/order", label: "Order" },
          { path: "/user/store", label: "Store" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link
              href={path}
              className={`block px-4 py-2 rounded-md transition ${isActive(path)
                ? "bg-gray-700 text-white shadow-md dark:bg-gray-600"
                : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
