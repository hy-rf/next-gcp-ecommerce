"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // To get the current pathname
import { Dictionary } from "@/model";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname(); // Get current path

  // Function to check if the current route matches
  const isActive = (route: string) => pathname.endsWith(route);
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="w-33 p-3 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      <div className="flex">
        <ul>
          <li
            className={`${pathname.endsWith("user") && "bg-gray-700 text-white shadow-md dark:bg-gray-600"} space-y-4 rounded-md text-gray-700 p-2`}
          >
            <Link href="/user" aria-label="User Dashboard">
              <h2 className={`text-2xl font-bold`}>{dict.layout_title}</h2>
            </Link>
          </li>
        </ul>
        <button
          className={` before:bg-gray-600 after:bg-gray-600 toggle-user-menu-button relative w-[2rem] ml-auto md:hidden before:block before:w-[1rem] before:h-[2px] after:block after:w-[1rem] after:h-[2px] before:absolute after:absolute before:right-[0.36rem] ${showLinks && "toggled"}`}
          onClick={() => setShowLinks(!showLinks)}
        ></button>
      </div>
      <ul
        className={`${showLinks ? "opacity-100 h-auto" : "opacity-0  h-0"} overflow-hidden transform ease-in-out duration-500 flex-col md:flex-col links`}
      >
        {[
          { path: "/user/login-method", label: "Authorization" },
          { path: "/user/payment", label: "Payment" },
          { path: "/user/order", label: "Order" },
          { path: "/user/store", label: "Store" },
        ].map(({ path, label }) => (
          <li key={path} onClick={() => setShowLinks(false)}>
            <Link
              href={path}
              className={`block px-4 py-2 rounded-md transition ${
                isActive(path)
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
