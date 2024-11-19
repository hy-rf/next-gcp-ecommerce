import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "./_component/Header";

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
  return (
    <html lang={locale}>
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
