import { cookies } from "next/headers";
import Link from "next/link";
import type React from "react";
import getDictionary from "@/dictionary/dictionary";

type Params = {
  locale: string;
};

export default async function Header({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "index");
  const loggedIn = (await cookies()).get("token");
  const isOpen = false;
  return (
    <header className="flex bg-[rgba(128,128,128,0.9)]">
      <Link href={"/"}>
        <h1 className="whitespace-nowrap">{dict.title}</h1>
      </Link>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } p-10 z-40 flex-col fixed m-auto bg-black color:white w-full h-full md:flex md:static md:flex md:flex-row md:gap-4 md:ml-auto md:mr-0 md:w-auto md:h-auto md:z-auto md:p-0 md:bg-transparent`}
      >
        <Link href={"/product"}>Product</Link>
        {loggedIn && (
          <>
            <Link href={"/user"}>User</Link>
            <Link href={"/cart"}>Cart</Link>
            <Link href={"/user/logout"}>Logout</Link>
          </>
        )}
        {!loggedIn && <Link href={"/user/login"}>Login</Link>}
      </nav>
      <button className="md:hidden">=</button>
    </header>
  );
}
