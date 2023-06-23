import { NextRequest, NextResponse } from "next/server";

import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "../i18n-config";

const locales = ["en-US", "fr-FR"];

function getLocale(request: NextRequest): string | undefined {
  // Negociator needs object -> we transform headers:
  const negociatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negociatorHeaders[key] = value));

  // Use negociator & intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negociatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually:
  if (["/manifest.json", "/favicon.ico"].includes(pathname)) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );

  // Redirect if no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // console.log(
    //   `----MIDDLEWARE:  ${request.nextUrl.origin}/${locale}${pathname}`
    // );

    // add locale to request
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
