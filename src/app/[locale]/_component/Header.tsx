import { cookies } from "next/headers";
import Link from "next/link";
import type React from "react";
import getDictionary from "@/dictionary/dictionary";

type Params = {
  locale: string;
};

export default async function Header({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const loggedIn = (await cookies()).get("token");
  return (
    <header className="flex bg-[rgba(128,128,128,0.9)]">
      <Link href={"/"}>
        <h1>{dict.title}</h1>
      </Link>
      <Link href={"/product"}>Product</Link>
      {loggedIn && (
        <>
          <Link href={"/user"}>User</Link>
          <Link href={"/cart"}>Cart</Link>
          <Link href={"/user/logout"}>Logout</Link>
        </>
      )}
      {!loggedIn && <Link href={"/user/login"}>Login</Link>}
    </header>
  );
}
