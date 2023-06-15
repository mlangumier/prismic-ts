"use client";

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { linkResolver } from "@/prismicio";
import { useRouter } from "next/navigation";

//TODO: add required props document + name
export const LinkComponent = (props: PrismicNextLinkProps) => {
  return (
    <PrismicNextLink
      linkResolver={linkResolver}
      className="min-w-fit border-[1px] py-2 px-4 cursor-pointer rounded-md border-slate-300 bg-slate-50 hover:bg-slate-700 text-slate-700 hover:text-slate-50 hover:shadow-md transition"
      {...props}
    />
  );
};
