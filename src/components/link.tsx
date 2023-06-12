"use client";

import { KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { ReactNode } from "react";

interface IProps {
  url: string;
  text: KeyTextField | string;
  children?: ReactNode;
}

export const LinkComponent: React.FC<IProps> = ({ url, text, children }) => (
  <PrismicNextLink
    href={url}
    className="border-[1px] py-2 px-4 cursor-pointer rounded-md border-slate-300 bg-slate-50 hover:bg-slate-700 text-slate-700 hover:text-slate-50 hover:shadow-md transition"
  >
    {text}
    {children}
  </PrismicNextLink>
);
