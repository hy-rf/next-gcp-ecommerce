/* eslint no-use-before-define: 0 */
import { NextResponse, NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest, locales: Array<string>) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  const languages =
    new Negotiator({ headers: negotiatorHeaders }).languages() ?? [];
  const defaultLocale = "en-US";

  return matchLocale(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  // const geo = request.geo;
  // console.log(geo);

  const { pathname } = request.nextUrl;
  if (
    pathname.endsWith("jpg") ||
    pathname.endsWith("png") ||
    pathname.endsWith("ico") ||
    pathname.endsWith("svg") ||
    pathname.endsWith("webp")
  )
    return;
  // Validate permission of admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const cookie = cookies();
    const token = cookie.get("token");
    console.log("token: ", token);

    // if isn't admin redirect to another page
    if (false) {
      request.nextUrl.pathname = "/test";
      return NextResponse.rewrite(request.nextUrl);
    }

    return;
  }
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return;
  }

  // handle locale
  const locales = ["en-US", "zh-TW", "zh-CN"];
  const pathContainsLocale =
    pathname.startsWith("/en-US") ||
    pathname.startsWith("/zh-TW") ||
    pathname.startsWith("/zh-CN");
  let currentLocale: string;
  const cookie = (await cookies()).get("locale");
  if (cookie) {
    currentLocale = cookie.value;
  } else {
    try {
      currentLocale = getLocale(request, locales);
    } catch {
      currentLocale = "en-US";
    }
  }
  if (pathContainsLocale) {
    // this if is for avoiding repeating redirect when locale in cookie matches locale in pathneme
    if (cookie && cookie.value === pathname.slice(1, 6)) return;
    request.nextUrl.pathname = `/${currentLocale}/${pathname.slice(6)}`;
  } else {
    // currect the locale in pathname when locale in pathname doesn't match locale in cookie
    request.nextUrl.pathname = `/${currentLocale}${pathname}`;
  }
  // final result is setting locale cookie and redirect
  //(await cookies()).set("locale", currentLocale);
  request.cookies.set("locale", currentLocale);
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
