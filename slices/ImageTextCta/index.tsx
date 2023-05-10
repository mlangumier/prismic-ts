import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

interface IProps {
  slice: Content.ImageTextCtaSlice;
}

const ImageTextCta = ({ slice }: IProps) => (
  <section
    className={`h-[500px] flex align-middle bg-black ${
      slice.variation === "default" ? "" : "flex-row-reverse"
    }`}
  >
    <div className="flex-1 overflow-hidden h-[500px]">
      <PrismicNextImage
        field={slice.primary.image}
        imgixParams={{ sat: -75 }}
      />
    </div>

    <div className="flex-1 flex flex-col justify-center ">
      <div className="text-gray-200 m-4">
        <div className="small-block-title">
          <PrismicRichText field={slice.primary.title} />
        </div>

        <div className="mt-4">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <div className="bg-blue-800 hover:bg-gray-200 text-gray-200 hover:text-blue-800 font-bold uppercase text-sm w-fit px-4 py-2 mt-8">
          <PrismicLink field={slice.primary.cta_link}>
            {slice.primary.cta_text}
          </PrismicLink>
        </div>
      </div>
    </div>
  </section>
);

export default ImageTextCta;
