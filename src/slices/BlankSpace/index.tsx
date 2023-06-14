import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlankSpace`.
 */
export type BlankSpaceProps = SliceComponentProps<Content.BlankSpaceSlice>;

/**
 * Component for "BlankSpace" Slices.
 */
const BlankSpace = ({ slice }: BlankSpaceProps): JSX.Element => {
  let variation = {
    height: "h-24",
  };

  if (slice.variation === "small") {
    variation.height = "h-16";
  } else if (slice.variation === "large") {
    variation.height = "h-32";
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`w-full ${variation.height}`}
    />
  );
};

export default BlankSpace;
