import Link from "next/link";
import type React from "react";
import NavigationBar from "./NavigationBar";

export default async function Header() {
  return (
    <>
      <NavigationBar />
      <div className="hidden">
        <Link href={"/product"}>Product</Link>
      </div>
    </>
  );
}
