import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "@/app/[locale]/_component/Header";
import LocaleProvider from "@/app/[locale]/_component/LocaleProvider";

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
    title: "台灣鐵路時刻表",
    description: "取得最新台灣鐵路時刻表",
  },
  "zh-CN": {
    title: "台湾铁路时刻表",
    description: "取得最新台湾铁路时刻表",
  },
};

export async function generateMetadata({ params }: {params : Promise<Params>}) {
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
  return (
    <LocaleProvider>
      <html lang={locale}>
        <body className="flex flex-col h-screen">
          <Header params={params} />
          <main>{children}</main>
          <footer>
            <p>@ 2023 E-Shop. All Rights Reserved.</p>
          </footer>
        </body>
      </html>
    </LocaleProvider>
  );
}
