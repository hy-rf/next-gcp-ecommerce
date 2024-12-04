import { cookies } from "next/headers";
import Link from "next/link";
import type React from "react";
import NavigationBar from "./NavigationBar";

export default async function Header() {
  const loggedIn = (await cookies()).get("token") ? true : false;
  return (
    <>
      <NavigationBar loggedIn={loggedIn} />
      <div className="hidden">
        <Link href={"/product"}>Product</Link>
      </div>
    </>
  );
}
