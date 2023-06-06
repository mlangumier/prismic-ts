import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

interface IProps {
  slice: Content.CardImageTextSlice;
}

/**
 * @typedef {import("@prismicio/client").Content.CardImageTextSlice} CardImageTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardImageTextSlice>} CardImageTextProps
 * @param { CardImageTextProps }
 */
const CardImageText = ({ slice }: IProps) => (
  <PrismicLink field={slice.primary.link_path}>
    <div className="relative flex flex-col justify-center items-center w-max py-4 px-6 shadow-md hover:shadow-xl rounded-xl">
      <div className="">
        <PrismicNextImage
          field={slice.primary.image}
          imgixParams={{ sat: -75 }}
          className=""
        />
      </div>
      <div className="mt-4 text-2xl">
        <PrismicRichText field={slice.primary.title} />
      </div>
    </div>
  </PrismicLink>
);

export default CardImageText;
