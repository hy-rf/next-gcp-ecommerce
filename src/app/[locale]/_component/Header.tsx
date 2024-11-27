import { cookies } from "next/headers";
import Link from "next/link";
import type React from "react";
import getDictionary from "@/dictionary/dictionary";
import NavigationBar from "./NavigationBar";

type Params = {
  locale: string;
};

export default async function Header({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "index");
  const loggedIn = (await cookies()).get("token") ? true : false;
  return (
    <header className="flex bg-[rgba(128,128,128,0.9)]">
      <Link href={"/"}>
        <h1 className="whitespace-nowrap">{dict.title}</h1>
      </Link>
      <NavigationBar loggedIn={loggedIn} />
      <div className="hidden">
        <Link href={"/product"}>Product</Link>
        <Link href={"/user"}>User</Link>
        <Link href={"/cart"}>Cart</Link>
        <Link href={"/user/logout"}>Logout</Link>
        <Link href={"/user/login"}>Login</Link>
      </div>
    </header>
  );
}
