import { PrismicPreview } from "@prismicio/next";
import "./globals.css";

import { ReactNode } from "react";
import { repositoryName } from "../prismicio";
import { asText } from "@prismicio/client";
// import { createClient } from "./prismicio";

export async function generateMetadata() {
  //     const client = createClient();
  //     const settings = await client.getSingle("settings");

  return {
    // title: asText(settings.data.site_title)
    title: "Prismic TS",
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
        {/* header */}
        {children}
        {/* footer */}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
