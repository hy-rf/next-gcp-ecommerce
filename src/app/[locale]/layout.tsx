import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "@/app/[locale]/_component/Header";
import getDictionary from "@/dictionary/dictionary";
import LocaleProvider from "./_component/LocaleProvider";
import { Toaster } from "sonner";
import AuthProvider from "@/services/auth/AuthProvider";
import { User } from "@/model";
import fetchData from "@/lib/fetchData";
import { cookies } from "next/headers";

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
    title: "拍賣網",
    description: "二手拍賣網",
    keywords: ["拍賣", "購物"],
    openGraph: {
      title: "拍賣網",
      description: "二手拍賣網",
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
  let user: User | null;
  try {
    user = await fetchData<User>(`${process.env.URL}/api/user/`, {
      headers: { Cookie: cookies().toString() },
    });
  } catch {
    user = null;
  }
  return (
    <LocaleProvider dict={dict} locale={locale}>
      <AuthProvider initialUser={user || null}>
        <html lang={locale}>
          <body className="flex flex-col h-screen">
            <Header />
            <main>{children}</main>
            <footer>
              <p>@ 2023-2024 E-Commerce. All Rights Reserved.</p>
            </footer>
            <Toaster position="top-center" />
          </body>
        </html>
      </AuthProvider>
    </LocaleProvider>
  );
}
