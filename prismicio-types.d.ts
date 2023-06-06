// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for City documents */
interface CityDocumentData {
  /**
   * Name field in *City*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Name of the city
   * - **API ID Path**: city.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  name: prismic.KeyTextField;
  /**
   * Region field in *City*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: city.region
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  region: prismic.ContentRelationshipField<"region">;
  /**
   * Meta Description field in *City*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: city.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  meta_description: prismic.RichTextField;
  /**
   * Meta Image field in *City*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: city.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *City*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: city.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * City document from Prismic
 *
 * - **API ID**: `city`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CityDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<CityDocumentData>, "city", Lang>;
/** Content for Homepage documents */
interface HomepageDocumentData {
  /**
   * Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Name of the website or title of the page
   * - **API ID Path**: homepage.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  title: prismic.KeyTextField;
  /**
   * Description field in *Homepage*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Short description to explain what this project is about
   * - **API ID Path**: homepage.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;
  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  meta_description: prismic.RichTextField;
  /**
   * Meta Image field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Slice for *Homepage → Slice Zone*
 *
 */
type HomepageDocumentDataSlicesSlice = never;
/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;
/** Content for Hotel documents */
interface HotelDocumentData {
  /**
   * Name field in *Hotel*
   *
   * - **Field Type**: Text
   * - **Placeholder**: The name of the hotel
   * - **API ID Path**: hotel.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  name: prismic.KeyTextField;
  /**
   * City field in *Hotel*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: hotel.city
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  city: prismic.ContentRelationshipField<"city">;
  /**
   * Thematics field in *Hotel*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: hotel.thematics[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/group
   *
   */
  thematics: prismic.GroupField<Simplify<HotelDocumentDataThematicsItem>>;
  /**
   * Meta Description field in *Hotel*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: hotel.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  meta_description: prismic.RichTextField;
  /**
   * Meta Image field in *Hotel*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hotel.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *Hotel*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: hotel.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Item in Hotel → Thematics
 *
 */
export interface HotelDocumentDataThematicsItem {
  /**
   * Thematic field in *Hotel → Thematics*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: hotel.thematics[].thematic
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  thematic: prismic.ContentRelationshipField<"thematic">;
}
/**
 * Hotel document from Prismic
 *
 * - **API ID**: `hotel`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HotelDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<HotelDocumentData>, "hotel", Lang>;
/** Content for Region documents */
interface RegionDocumentData {
  /**
   * Name field in *Region*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Name of the region
   * - **API ID Path**: region.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  name: prismic.KeyTextField;
  /**
   * Meta Description field in *Region*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: region.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  meta_description: prismic.RichTextField;
  /**
   * Meta Image field in *Region*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: region.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *Region*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: region.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Region document from Prismic
 *
 * - **API ID**: `region`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RegionDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<RegionDocumentData>, "region", Lang>;
/** Content for Thematic documents */
interface ThematicDocumentData {
  /**
   * Label field in *Thematic*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Label of the thematic
   * - **API ID Path**: thematic.label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  label: prismic.KeyTextField;
  /**
   * Meta Description field in *Thematic*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: thematic.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  meta_description: prismic.RichTextField;
  /**
   * Meta Image field in *Thematic*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: thematic.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *Thematic*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: thematic.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Thematic document from Prismic
 *
 * - **API ID**: `thematic`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ThematicDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ThematicDocumentData>,
    "thematic",
    Lang
  >;
export type AllDocumentTypes =
  | CityDocument
  | HomepageDocument
  | HotelDocument
  | RegionDocument
  | ThematicDocument;
/**
 * Primary content in CardImageText → Primary
 *
 */
interface CardImageTextSliceDefaultPrimary {
  /**
   * Title field in *CardImageText → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: Card title
   * - **API ID Path**: card_image_text.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Image field in *CardImageText → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: card_image_text.primary.image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * link_path field in *CardImageText → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: card_image_text.primary.link_path
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  link_path: prismic.LinkField;
}
/**
 * Default variation for CardImageText Slice
 *
 * - **API ID**: `default`
 * - **Description**: `CardImageText`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type CardImageTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<CardImageTextSliceDefaultPrimary>,
  never
>;
/**
 * Slice variation for *CardImageText*
 *
 */
type CardImageTextSliceVariation = CardImageTextSliceDefault;
/**
 * CardImageText Shared Slice
 *
 * - **API ID**: `card_image_text`
 * - **Description**: `CardImageText`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type CardImageTextSlice = prismic.SharedSlice<
  "card_image_text",
  CardImageTextSliceVariation
>;
/**
 * Primary content in ImageTextCta → Primary
 *
 */
interface ImageTextCtaSliceDefaultPrimary {
  /**
   * Image field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_text_cta.primary.image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * Title field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: This is where it all begins...
   * - **API ID Path**: image_text_cta.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Description field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A nice description of your feature
   * - **API ID Path**: image_text_cta.primary.description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * Cta link field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: My link
   * - **API ID Path**: image_text_cta.primary.cta_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  cta_link: prismic.LinkField;
  /**
   * Cta_text field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: My link's text here
   * - **API ID Path**: image_text_cta.primary.cta_text
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  cta_text: prismic.KeyTextField;
}
/**
 * Default variation for ImageTextCta Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ImageTextCta`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageTextCtaSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ImageTextCtaSliceDefaultPrimary>,
  never
>;
/**
 * Primary content in ImageTextCta → Primary
 *
 */
interface ImageTextCtaSliceImageRightSidePrimary {
  /**
   * Image field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_text_cta.primary.image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * Title field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: This is where it all begins...
   * - **API ID Path**: image_text_cta.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Description field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A nice description of your feature
   * - **API ID Path**: image_text_cta.primary.description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * Cta link field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: My link
   * - **API ID Path**: image_text_cta.primary.cta_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  cta_link: prismic.LinkField;
  /**
   * Cta_text field in *ImageTextCta → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: My link's text here
   * - **API ID Path**: image_text_cta.primary.cta_text
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  cta_text: prismic.KeyTextField;
}
/**
 * ImageRightSide variation for ImageTextCta Slice
 *
 * - **API ID**: `imageRightSide`
 * - **Description**: `ImageTextCta`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageTextCtaSliceImageRightSide = prismic.SharedSliceVariation<
  "imageRightSide",
  Simplify<ImageTextCtaSliceImageRightSidePrimary>,
  never
>;
/**
 * Slice variation for *ImageTextCta*
 *
 */
type ImageTextCtaSliceVariation =
  | ImageTextCtaSliceDefault
  | ImageTextCtaSliceImageRightSide;
/**
 * ImageTextCta Shared Slice
 *
 * - **API ID**: `image_text_cta`
 * - **Description**: `ImageTextCta`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageTextCtaSlice = prismic.SharedSlice<
  "image_text_cta",
  ImageTextCtaSliceVariation
>;
/**
 * Primary content in TextBlock → Primary
 *
 */
interface TextBlockSliceDefaultPrimary {
  /**
   * Title field in *TextBlock → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: This is where it all begins...
   * - **API ID Path**: text_block.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Description field in *TextBlock → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A nice description of your feature
   * - **API ID Path**: text_block.primary.description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
}
/**
 * Default variation for TextBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `TextBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextBlockSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<TextBlockSliceDefaultPrimary>,
  never
>;
/**
 * Primary content in TextBlock → Primary
 *
 */
interface TextBlockSliceTextBlockColumnsPrimary {
  /**
   * Title field in *TextBlock → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: This is where it all begins...
   * - **API ID Path**: text_block.primary.title
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.TitleField;
  /**
   * Description field in *TextBlock → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: A nice description of your feature
   * - **API ID Path**: text_block.primary.description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
}
/**
 * TextBlockColumns variation for TextBlock Slice
 *
 * - **API ID**: `textBlockColumns`
 * - **Description**: `TextBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextBlockSliceTextBlockColumns = prismic.SharedSliceVariation<
  "textBlockColumns",
  Simplify<TextBlockSliceTextBlockColumnsPrimary>,
  never
>;
/**
 * Slice variation for *TextBlock*
 *
 */
type TextBlockSliceVariation =
  | TextBlockSliceDefault
  | TextBlockSliceTextBlockColumns;
/**
 * TextBlock Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: `TextBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextBlockSlice = prismic.SharedSlice<
  "text_block",
  TextBlockSliceVariation
>;
declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      CityDocumentData,
      CityDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      HomepageDocument,
      HotelDocumentData,
      HotelDocumentDataThematicsItem,
      HotelDocument,
      RegionDocumentData,
      RegionDocument,
      ThematicDocumentData,
      ThematicDocument,
      AllDocumentTypes,
      CardImageTextSliceDefaultPrimary,
      CardImageTextSliceDefault,
      CardImageTextSliceVariation,
      CardImageTextSlice,
      ImageTextCtaSliceDefaultPrimary,
      ImageTextCtaSliceDefault,
      ImageTextCtaSliceImageRightSidePrimary,
      ImageTextCtaSliceImageRightSide,
      ImageTextCtaSliceVariation,
      ImageTextCtaSlice,
      TextBlockSliceDefaultPrimary,
      TextBlockSliceDefault,
      TextBlockSliceTextBlockColumnsPrimary,
      TextBlockSliceTextBlockColumns,
      TextBlockSliceVariation,
      TextBlockSlice,
    };
  }
}
