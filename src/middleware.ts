/* eslint no-use-before-define: 0 */
import { NextResponse, NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
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
  const { pathname } = request.nextUrl;
  // return if it is api request after check
  if (pathname.startsWith("/api")) return;
  const pathDividedBySlash = request.nextUrl.pathname.split("/");
  if ("api" === pathDividedBySlash[pathDividedBySlash.length - 1]) {
    return;
  }
  // return if it is favicon.ico
  if ("/favicon.ico" === request.nextUrl.pathname) {
    return;
  }
  // handle locale

  console.log(pathname);
  const locales = ["en-US", "zh-TW", "zh-CN"];
  if (
    pathname.startsWith("/en-US") ||
    pathname.startsWith("/zh-TW") ||
    pathname.startsWith("/zh-CN")
  ) {
    return;
  }
  const locale = getLocale(request, locales);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
