import { ReactNode } from "react";
import Link from "next/link";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "../../prismicio";
import { SettingsDocument } from "../../../prismicio-types";
import { getLocales } from "@/lib/getLocales";
import "../globals.css";

interface IProps {
  params: { locale: string };
  children?: ReactNode;
}

async function getSettings(locale: string) {
  const client = createClient();
  const settings = await client.getSingle("settings", {
    lang: locale,
  });

  return settings;
}

export async function generateMetadata({ params }: IProps) {
  const settings = await getSettings(params.locale);

  return {
    title: settings.data.site_title,
  };
}

export default async function RootLayout({ children, params }: IProps) {
  const settings = await getSettings(params.locale);

  return (
    <html className="h-screen">
      <body className="">
        {/* @ts-expect-error Async Server Component */}
        <Header settings={settings} />

        {/* TODO: h-full */}
        <main className="">{children}</main>

        {/* @ts-expect-error Async Server Component */}
        <Footer />

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

// TODO: change that to Object<{slug, initial,label, icon}> + manage: isActive
const localeLabels = {
  "en-us": "EN",
  "fr-fr": "FR",
};

async function Header({ settings }: { settings: SettingsDocument }) {
  const client = createClient();
  const locales = await getLocales(settings, client);

  return (
    <header className="bg-slate-50 shadow-md py-4 px-6 mb-12">
      <div className="flex justify-between items-center">
        <PrismicNextLink href="/" className="">
          {settings.data.site_title}
        </PrismicNextLink>

        <nav className="">
          <ul className="">
            {settings.data.navigation.map((item) => (
              <li
                key={item.label}
                className="text-slate-700 hover:text-slate-500  transition "
              >
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ul className="flex flex-row gap-2">
            {locales.map((locale, i) => {
              return (
                <li className="" key={locale.lang}>
                  <PrismicNextLink
                    href={locale.url || locale.lang}
                    locale={locale.lang}
                    aria-label={`Change language to ${locale.lang_name}`}
                  >
                    {localeLabels[locale.lang] || locale.lang}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

async function Footer() {
  return <footer className="h-[80px] mt-20 bg-slate-800 text-white"></footer>;
}
