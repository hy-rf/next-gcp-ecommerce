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
      <NavigationBar dict={dict} loggedIn={loggedIn} />
      {/* for seo */}
      <div className="hidden">
        <Link href={"/product"}>Product</Link>
      </div>
    </header>
  );
}
