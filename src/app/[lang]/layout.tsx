"use client";

import { ReactNode } from "react";
import { Metadata } from "next";
import { SettingsDocument } from "../../../prismicio-types";
import { LinkNextComponent } from "@/components/link";
import { createClient } from "@/routes/prismicio";
import { notFound, usePathname } from "next/navigation";
import { getLocales } from "@/lib/getLocales";
import { PrismicNextLink } from "@prismicio/next";

interface IProps {
  lang: string;
}

async function getPageData(lang: string) {
  const client = createClient();

  try {
    const settings = await client.getSingle("settings", { lang });

    const page = await client.getSingle("homepage", { lang });

    const locales = await getLocales(settings, client);

    return { settings, page, locales };
  } catch (error) {
    console.log("----Layout error:", error);
    notFound();
  }
}

export async function generateMetaData({
  params,
}: {
  params: IProps;
}): Promise<Metadata> {
  const { page } = await getPageData(params.lang);

  return {
    title: page.data.meta_title || page.data.title || "Homepage",
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: IProps;
}) {
  const { settings, locales } = await getPageData(params.lang);

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Header settings={settings} locales={locales} lang={params.lang} />

      <main className="flex-1">{children}</main>

      {/* @ts-expect-error Async Server Component */}
      <Footer />
    </>
  );
}

async function Header({
  settings,
  locales,
  lang,
}: {
  settings: SettingsDocument;
  locales: any[];
  lang: string;
}) {
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = locale;

    return segments.join("/");
  };

  return (
    <header className="bg-slate-50 mb-12 shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <LinkNextComponent href={`/`} className="">
          {settings.data.site_title}
        </LinkNextComponent>

        <nav className="">
          <ul className="">
            {settings.data.navigation.map((item) => (
              <li
                key={item.label}
                className="text-slate-700 hover:text-slate-500  transition "
              >
                <LinkNextComponent href={`/`}>{item.label}</LinkNextComponent>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ul className="flex flex-row gap-2">
            {locales.map((locale) => {
              return lang !== locale.lang ? (
                <li className="" key={locale.lang}>
                  <PrismicNextLink
                    href={redirectedPathname(locale.lang)}
                    locale={locale.lang}
                    aria-label={`Change language to ${locale.lang_name}`}
                  >
                    {locale.lang}
                  </PrismicNextLink>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

async function Footer() {
  return (
    <footer className="h-20 bg-slate-800 text-white flex justify-center items-center">
      <p>Footer</p>
    </footer>
  );
}
