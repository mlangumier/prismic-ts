import { ReactNode } from "react";
import Link from "next/link";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "../prismicio";
import "./globals.css";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title,
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Header />

        {/* TODO: h-full */}
        <main className="">{children}</main>

        {/* footer */}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <header className="bg-slate-50 shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="">
          {settings.data.site_title}
        </Link>

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

        <div>FR | EN</div>
      </div>
    </header>
  );
}
