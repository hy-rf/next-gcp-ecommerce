"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // To get the current pathname
import { Dictionary } from "@/model";

export default function Sidebar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname(); // Get current path

  // Function to check if the current route matches
  const isActive = (route: string) => pathname.endsWith(route);

  return (
    <nav className="w-64 bg-white shadow-md p-6">
      <Link href="/user">
        <h2 className="text-xl font-bold text-blue-600 hover:underline mb-4">
          {dict.layout_title}
        </h2>
      </Link>
      <ul className="space-y-4">
        <li>
          <Link
            href="/user/basic"
            className={`block text-gray-700 hover:text-blue-600 hover:underline ${
              isActive("/user/basic") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Basic
          </Link>
        </li>
        <li>
          <Link
            href="/user/login-method"
            className={`block text-gray-700 hover:text-blue-600 hover:underline ${
              isActive("/user/login-method")
                ? "text-blue-600 font-semibold"
                : ""
            }`}
          >
            Authorization
          </Link>
        </li>
        <li>
          <Link
            href="/user/payment"
            className={`block text-gray-700 hover:text-blue-600 hover:underline ${
              isActive("/user/payment") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Payment
          </Link>
        </li>
        <li>
          <Link
            href="/user/order"
            className={`block text-gray-700 hover:text-blue-600 hover:underline ${
              isActive("/user/order") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Order
          </Link>
        </li>
        <li>
          <Link
            href="/user/store"
            className={`block text-gray-700 hover:text-blue-600 hover:underline ${
              isActive("/user/store") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Store
          </Link>
        </li>
      </ul>
    </nav>
  );
}
