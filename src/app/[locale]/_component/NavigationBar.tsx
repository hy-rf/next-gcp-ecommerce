"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavigationBar({ loggedIn }: { loggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } p-10 z-40 flex-col ml-o mt-[70px] text-center bg-[#808080d0] fixed left-0 color:white w-[100dvw] h-[100dvh] md:flex md:static md:flex md:flex-row md:gap-4 md:ml-auto md:mr-0 md:mt-0 md:w-auto md:h-auto md:z-auto md:p-0 md:bg-transparent`}
      >
        <Link onClick={() => setIsOpen(false)} href={"/product"}>
          Product
        </Link>
        {loggedIn && (
          <>
            <Link onClick={() => setIsOpen(false)} href={"/user"}>
              User
            </Link>
            <Link onClick={() => setIsOpen(false)} href={"/cart"}>
              Cart
            </Link>
            <Link onClick={() => setIsOpen(false)} href={"/user/logout"}>
              Logout
            </Link>
          </>
        )}
        {!loggedIn && (
          <Link onClick={() => setIsOpen(false)} href={"/user/login"}>
            Login
          </Link>
        )}
      </nav>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        =
      </button>
    </>
  );
}
