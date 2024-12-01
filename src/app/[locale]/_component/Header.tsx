import { cookies } from "next/headers";
import Link from "next/link";
import type React from "react";
import NavigationBar from "./NavigationBar";

export default async function Header() {
  const loggedIn = (await cookies()).get("token") ? true : false;
  return (
    <header className="flex bg-[rgba(128,128,128,0.9)]">
      <NavigationBar loggedIn={loggedIn} />
      {/* for seo */}
      <div className="hidden">
        <Link href={"/product"}>Product</Link>
      </div>
    </header>
  );
}
