"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Header() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setLoggedIn(true);
  }, []);

  return (
    <header>
      <Link href={"/"}>
        <h1>E-Commerce</h1>
      </Link>
      <Link href={"/product"}>Product</Link>
      {loggedIn && (
        <>
          <Link href={"/user"}>User</Link>
          <Link href={"/cart"}>Cart</Link>
        </>
      )}
      {!loggedIn && <Link href={"/user/login"}>Login</Link>}
    </header>
  );
}
