"use client";

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import Link from "next/link";

const style =
  "min-w-fit border-[1px] py-2 px-4 cursor-pointer rounded-md border-slate-300 bg-slate-50 hover:bg-slate-700 text-slate-700 hover:text-slate-50 hover:shadow-md transition";

export const LinkPrismicComponent = (props: PrismicNextLinkProps) => {
  return <PrismicNextLink className={style} {...props} />;
};

export const LinkNextComponent = (props) => {
  return <Link {...props} className={style} />;
};
