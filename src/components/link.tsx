"use client";

import { KeyTextField } from "@prismicio/client";
import Link from "next/link";
import { ReactNode } from "react";

interface IProps {
  url: string;
  text: KeyTextField | string;
  children?: ReactNode;
}

export const LinkComponent: React.FC<IProps> = ({ url, text, children }) => (
  <Link
    href={url}
    className="border-[1px] border-slate-300 py-2 px-4 cursor-pointer"
  >
    {text}
    {children}
  </Link>
);
