import { createClient } from "@/routes/prismicio";
import { Metadata } from "next";
import { ReactNode } from "react";

interface IProps {
  lang: string;
}

// export async function generateMetaData({ lang }: IProps): Promise<Metadata> {
//   const client = createClient();
//   const blog = await client.getSingle("blog", { lang });

//   return {
//     title: blog.data.meta_title || blog.data.title || "Blog",
//   };
// }

export default async function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
