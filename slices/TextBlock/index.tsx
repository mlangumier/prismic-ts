import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";

interface IProps {
  slice: Content.TextBlockSlice;
}

const TextBlock = ({ slice }: IProps) => {
  const variant = slice.variation === "textBlockColumns";

  return (
    <section className={`${!variant ? "md:w-[50vw] m-auto" : "m-8"} mt-8`}>
      <div
        className={`${
          variant && "text-center"
        } small-block-title text-slate-700`}
      >
        <PrismicRichText field={slice.primary.title} />
      </div>
      <div className={`${variant && "md:columns-2 md:gap-6"} mt-4`}>
        <PrismicRichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default TextBlock;
