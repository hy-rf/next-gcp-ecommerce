import Link from "next/link";
import React from "react";

export default function BackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="back-container">
      <nav>
        <Link href="/back">
          <h2>Back</h2>
        </Link>
        <Link href="/back/store-submission">Store Submissions</Link>
      </nav>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
