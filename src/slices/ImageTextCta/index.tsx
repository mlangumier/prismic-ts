import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

interface IProps {
  slice: Content.ImageTextCtaSlice;
}

const ImageTextCta = ({ slice }: IProps) => {
  const { image, title, description, cta_link, cta_text } = slice.primary;

  const variation = {
    section: "md:flex-row",
  };

  if (slice.variation === "imageRightSide") {
    variation.section = "md:flex-row-reverse";
  }

  return (
    <section
      className={`flex flex-col align-middle bg-slate-900 ${variation.section}`}
    >
      <div className="flex-1">
        <PrismicNextImage
          field={image}
          imgixParams={{ sat: -75 }}
          className="object-cover h-full"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-gray-200 py-12 px-8">
          <div className="small-block-title">
            <PrismicRichText field={title} />
          </div>

          <div className="mt-4">
            <PrismicRichText field={description} />
          </div>

          <div className=" mt-8">
            <PrismicLink
              field={cta_link}
              className="font-bold uppercase text-sm w-fit px-4 py-2 rounded-sm border-2 border-slate-100 text-slate-50 hover:text-slate-900 bg-slate-900 hover:bg-slate-50 transition"
            >
              {cta_text}
            </PrismicLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextCta;
