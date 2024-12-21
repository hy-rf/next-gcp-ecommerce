import type { Metadata } from "next";
import type React from "react";
import "./layout.css";
import Header from "@/app/[locale]/component/Header";
import getDictionary from "@/dictionary/dictionary";
import LocaleProvider from "./component/LocaleProvider";
import { Toaster } from "sonner";
import AuthProvider from "@/services/auth/AuthProvider";
import { CartItem, User } from "@/model";
import fetchData from "@/lib/fetchData";
import { cookies } from "next/headers";
import CartProvider from "@/services/cart/CartProvider";
import NextTopLoader from "nextjs-toploader";

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
  if (cookies().get("token")) {
    user = await fetchData<User>(`${process.env.URL}/api/user/`, {
      headers: { Cookie: cookies().toString() },
    });
  } else {
    user = null;
  }
  let cart: CartItem[] = [];
  if (user) {
    cart = (await fetchData<CartItem[]>(`${process.env.URL}/api/v2/cart-item`, {
      headers: { Cookie: cookies().toString() },
    })) as CartItem[];
  }
  return (
    <LocaleProvider dict={dict} locale={locale}>
      <AuthProvider initialUser={user || null}>
        <CartProvider initialCart={cart}>
          <html lang={locale}>
            <body className="flex flex-col h-screen bg-gray-200 items-center">
              <Header />
              <NextTopLoader
                color="#FFFFFF"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                template='<div class="bar" role="bar"><div class="peg"></div></div>'
                zIndex={1600}
                showAtBottom={false}
              />
              <main className="mx-auto max-w-[1200px]">{children}</main>
              <footer>
                <p>@ 2023-2024 E-Commerce. All Rights Reserved.</p>
              </footer>
              <Toaster position="top-center" />
            </body>
          </html>
        </CartProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
