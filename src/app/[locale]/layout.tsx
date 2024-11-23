import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Link from "next/link";
import { cookies } from "next/headers";

type Params = {
  locale: string;
};

export const metadata: Metadata = {
  title: "E-Commerce | Everything",
  description: "E-Commerce | Everything",
  keywords: ["E-Commerce", "Everything", "Business"],
  openGraph: {
    title: "E-Commerce | Everything",
    description: "E-Commerce | Everything",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const loggedIn = (await cookies()).get("token");
  return (
    <html lang={locale}>
      <body className="flex flex-col h-screen">
        <header className="flex bg-[rgba(128,128,128,0.9)]">
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
        <main>{children}</main>
        <footer>
          <p>@ 2023 E-Shop. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
