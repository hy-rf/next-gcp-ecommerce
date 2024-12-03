import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "@/app/[locale]/_component/Header";
import getDictionary from "@/dictionary/dictionary";
import LocaleProvider from "./_component/LocaleProvider";

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
  const dict = await getDictionary(locale, "index");
  return (
    <LocaleProvider dict={dict}>
      <html lang={locale}>
        <body className="flex flex-col h-screen">
          <Header />
          <main>{children}</main>
          <footer>
            <p>@ 2023 E-Shop. All Rights Reserved.</p>
          </footer>
        </body>
      </html>
    </LocaleProvider>
  );
}
