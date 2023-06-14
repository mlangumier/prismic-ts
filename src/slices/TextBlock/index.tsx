import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";

interface IProps {
  slice: Content.TextBlockSlice;
}
interface IVariation {
  section: string;
  title?: string;
  description?: string;
}

const TextBlock = ({ slice }: IProps) => {
  const { title, description } = slice.primary;

  let variation: IVariation = {
    section: "md:w-[50vw] mx-auto",
  };

  if (slice.variation === "textBlockColumns") {
    variation = {
      section: "mx-8",
      title: "text-center",
      description: "md:columns-2 md:gap-6",
    };
  }

  return (
    <section className={`${variation.section} my-8`}>
      <div className={`${variation.title} small-block-title text-slate-700`}>
        <PrismicRichText field={title} />
      </div>
      <div className={`${variation.description} text-justify mt-4`}>
        <PrismicRichText field={description} />
      </div>
    </section>
  );
};

export default TextBlock;
