import getDictionary from "@/dictionary/dictionary";
import Sidebar from "./component/Sidebar";
import React from "react";

type Params = Promise<{ locale: string }>;

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const dict = await getDictionary((await params).locale, "index");
  return (
    <div className="flex flex-col bg-gray-50 md:flex-row user-sidebar h-full">
      {/* Sidebar */}
      <Sidebar dict={dict} />

      {/* Main Content */}
      <div className="flex-grow p-6 h-full">{children}</div>
    </div>
  );
}
