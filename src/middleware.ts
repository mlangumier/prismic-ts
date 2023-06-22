import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en-US", "fr-FR"];

function getLocale(request: NextRequest) {
  const headers = { "accept-language": "en-US,en;q=0.5" };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en-US";

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: NextRequest) {
  // Check if locale present in pathname
  let pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );

  // Redirect if no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    if (pathname === "/favicon.ico") {
      pathname = "/";
    }

    console.log(
      `----MIDDLEWARE:  ${request.nextUrl.origin}/${locale}${pathname}`
    );

    // add locale to request
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.nextUrl.origin)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root ("/") url
    // "/",
  ],
};
