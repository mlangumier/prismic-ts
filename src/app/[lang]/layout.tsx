"use client";

import { ReactNode } from "react";
import { Metadata } from "next";
import { createClient } from "@/routes/prismicio";
import { notFound } from "next/navigation";
import { getLocales } from "@/lib/getLocales";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

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
