import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "@/app/[locale]/_component/Header";
import LocaleProvider from "@/app/[locale]/_component/LocaleProvider";
import { cookies } from "next/headers";
import { CartItemProvider } from "@/app/[locale]/_component/CartItemContext";

type Params = {
  locale: string;
};

const metadataByLocale: Record<string, Metadata> = {
  "en-US": {
    title: "E-Commerce | Everything",
    description: "E-Commerce | Everything",
    keywords: ["E-Commerce", "Everything", "Business"],
    openGraph: {
      title: "E-Commerce | Everything",
      description: "E-Commerce | Everything",
    },
  },
  "zh-TW": {
    title: "便宜拍賣網",
    description: "世界最便宜拍賣網",
    keywords: ["便宜", "拍賣", "購物"],
    openGraph: {
      title: "便宜拍賣網",
      description: "世界最便宜拍賣網",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  return metadataByLocale[(await params).locale];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const token = (await cookies()).get("token");
  return (
    <LocaleProvider>
      <CartItemProvider token={token ? token.value : null}>
        <html lang={locale}>
          <body className="flex flex-col h-screen">
            <Header />
            <main>{children}</main>
            <footer>
              <p>@ 2023 E-Shop. All Rights Reserved.</p>
            </footer>
          </body>
        </html>
      </CartItemProvider>
    </LocaleProvider>
  );
}
