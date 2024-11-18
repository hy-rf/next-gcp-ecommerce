import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "./_component/Header";

export const metadata: Metadata = {
  title: "E-Commerce | Everything",
  description: "E-Commerce | Everything",
  keywords: ["E-Commerce", "Everything", "Business"],
  openGraph: {
    title: "E-Commerce | Everything",
    description: "E-Commerce | Everything",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p>@ 2023 E-Shop. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
