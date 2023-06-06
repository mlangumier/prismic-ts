import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { Content, asText } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetaData(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: asText(page.data.title) || "Prismic TS",
    // description?: page.data.meta_description,
  };
}

export default async function Home() {
  const client = createClient();

  const page = await client.getSingle("homepage");

  const thematics = await client
    .getAllByType("thematic")
    .catch(() => notFound());
  const regions = await client.getAllByType("region").catch(() => notFound());
  const cities = await client.getAllByType("city").catch(() => notFound());
  const hotels = await client.getAllByType("hotel").catch(() => notFound());

  return (
    <main className="mx-2">
      <h2 className="mt-8 mb-16 text-center text-xl">Prismic TS TailwindCss</h2>

      <div className="my-4">
        <h2 className="uppercase">Thématiques</h2>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {thematics.map((thematic: Content.ThematicDocument) => (
            <LinkComponent
              pageType="thematic"
              uid={thematic.uid}
              typeDataTitle={thematic.data.label}
              key={thematic.id}
            />
          ))}
        </div>
      </div>

      <div className="my-4">
        <h2 className="uppercase">Régions</h2>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {regions.map((region: Content.RegionDocument) => (
            <LinkComponent
              pageType="location"
              uid={region.uid}
              typeDataTitle={region.data.name}
              key={region.id}
            />
          ))}
        </div>
      </div>

      <div className="my-4">
        <h2 className="uppercase">Villes</h2>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {cities.map((city: Content.CityDocument) => (
            <LinkComponent
              pageType="city"
              uid={city.uid}
              typeDataTitle={city.data.name}
              key={city.id}
            />
          ))}
        </div>
      </div>

      <div className="my-4">
        <h2 className="uppercase">Hôtels</h2>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {hotels.map((hotel: Content.HotelDocument) => (
            <LinkComponent
              pageType="experience"
              uid={hotel.uid}
              typeDataTitle={hotel.data.name}
              key={hotel.id}
            />
          ))}
        </div>
      </div>

      {/* <SliceZone slices={page.data.slices} components={components} /> */}
    </main>
  );
}
