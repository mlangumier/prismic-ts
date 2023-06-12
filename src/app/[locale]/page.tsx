import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

interface IProps {
  params: {
    locale: string;
  };
}

export async function generateMetaData({ params }: IProps): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage", { lang: params.locale });

  return {
    title: page.data.title,
    description: asText(page.data.meta_description),
  };
}

export default async function Home({ params: { locale } }: IProps) {
  const client = createClient();

  const page = await client.getSingle("homepage", { lang: locale });

  const thematics = await client
    .getAllByType("thematic", { lang: locale })
    .catch(() => notFound());
  const regions = await client
    .getAllByType("region", { lang: locale })
    .catch(() => notFound());
  const cities = await client
    .getAllByType("city", { lang: locale })
    .catch(() => notFound());
  const hotels = await client
    .getAllByType("hotel", { lang: locale })
    .catch(() => notFound());

  return (
    <main className="mx-2">
      <div className="py-8 max-w-[500px] m-auto text-center">
        <PrismicRichText field={page.data.description} />
      </div>

      <div className="text-center py-4">
        <h4 className="text-xl mb-6">Thématiques</h4>
        <div className="flex justify-center items-center gap-4">
          {thematics?.map((thematic) => (
            <LinkComponent
              url={thematic.url!}
              text={thematic.data.label}
              key={thematic.id}
            />
          ))}
        </div>
      </div>

      <div className="text-center py-4">
        <h4 className="text-xl mb-6">Régions</h4>
        <div className="flex justify-center items-center gap-4">
          {regions?.map((region) => (
            <LinkComponent
              url={region.url!}
              text={region.data.name}
              key={region.id}
            />
          ))}
        </div>
      </div>

      <div className="text-center py-4">
        <h4 className="text-xl mb-6">Villes</h4>
        <div className="flex justify-center items-center gap-4">
          {cities?.map((city) => (
            <LinkComponent
              url={city.url!}
              text={city.data.name}
              key={city.id}
            />
          ))}
        </div>
      </div>

      <div className="text-center py-4">
        <h4 className="text-xl mb-6">Villes</h4>
        <div className="flex justify-center items-center gap-4">
          {hotels?.map((hotel) => (
            <LinkComponent
              url={hotel.url!}
              text={hotel.data.name}
              key={hotel.id}
            />
          ))}
        </div>
      </div>

      {/* <SliceZone slices={page.data.slices} components={components} /> */}
    </main>
  );
}
