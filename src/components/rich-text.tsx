import { PrismicRichText, PrismicRichTextProps } from "@prismicio/react";

// TODO: Add resolver
// https://prismic.io/docs/technical-reference/prismicio-next#globally-configure-a-link-resolver

export const RichTextComponent = (props: PrismicRichTextProps) => {
  <PrismicRichText
    // linkResolver={}
    {...props}
  />;
};
