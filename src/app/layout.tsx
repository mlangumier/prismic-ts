import { ReactNode } from "react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/routes/prismicio";
import { Metadata } from "next";
import "./globals.css";

// const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

export async function generateMetaData(): Promise<Metadata> {
  return {
    title: {
      template: "Prismic TS",
      default: "Prismic TS",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({ children }: IProps) {
  return (
    <html className="h-screen">
      {/* <body className={`${roboto.className} min-h-screen flex flex-col`}> */}
      <body className="min-h-screen flex flex-col">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
