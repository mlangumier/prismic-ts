import { ReactNode } from "react";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/routes/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { SettingsDocument } from "../../prismicio-types";
import { Metadata } from "next";
import "./globals.css";

// const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

// TODO: Manage locale:
// https://nextjs.org/docs/app/building-your-application/routing/internationalization
// Get Next.config for languages

export async function generateMetaData(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title || "Prismic TS",
  };
}

export default async function RootLayout({ children }: IProps) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <html className="h-screen">
      {/* <body className={`${roboto.className} min-h-screen flex flex-col`}> */}
      <body className="min-h-screen flex flex-col">
        {/* @ts-expect-error Async Server Component */}
        <Header settings={settings} />

        <main className="flex-1">{children}</main>

        {/* @ts-expect-error Async Server Component */}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header({ settings }: { settings: SettingsDocument }) {
  // const client = createClient();
  // const locales = await getLocales(settings, client);

  return (
    <header className="bg-slate-50 mb-12 shadow-md py-4 px-6">
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
            <p>EN | FR</p>
            {/* {locales.map((locale, i) => {
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
            })} */}
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
