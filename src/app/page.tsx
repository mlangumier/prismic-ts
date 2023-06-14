import { Metadata } from "next";
import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";

async function getHomepageData() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return page;
}

async function getDocuments() {
  const client = createClient();

  try {
    const regions = await client.getAllByType("region");

    const departments = await client.getAllByType("department");

    const cities = await client.getAllByType("city");

    const thematics = await client.getAllByType("thematic");

    const hotels = await client.getAllByType("hotel");

    return { regions, departments, cities, thematics, hotels };
  } catch (error) {
    console.log("----Homepage Error", error);
    notFound();
  }
}

export async function generateMetaData(): Promise<Metadata> {
  const page = await getHomepageData();

  return {
    title: page.data.title || "Prismic TS",
    description: asText(page.data.meta_description),
  };
}

export default async function Home() {
  const page = await getHomepageData();
  const { regions, departments, cities, thematics, hotels } =
    await getDocuments();

  return (
    <>
      <div className="py-8 max-w-[500px] m-auto text-center">
        <PrismicRichText field={page.data.description} />
      </div>

      {regions ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">Régions</h4>
          <div className="flex justify-center items-center gap-4">
            {regions?.map((region) => (
              <LinkComponent document={region} key={region.id}>
                {region.data.name}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}

      {departments ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">Departments</h4>
          <div className="flex justify-center items-center gap-4">
            {departments?.map((dept) => (
              <LinkComponent document={dept} key={dept.id}>
                {dept.data.name}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}

      {cities.length ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">Villes</h4>
          <div className="flex justify-center items-center gap-4">
            {cities?.map((city) => (
              <LinkComponent document={city} key={city.id}>
                {city.data.name}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}

      {thematics ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">Thématiques</h4>
          <div className="flex justify-center items-center gap-4">
            {thematics?.map((thematic) => (
              <LinkComponent document={thematic} key={thematic.id}>
                {thematic.data.label}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}

      {hotels ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">Hôtels</h4>
          <div className="flex justify-center items-center gap-4">
            {hotels?.map((hotel) => (
              <LinkComponent document={hotel} key={hotel.id}>
                {hotel.data.name}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}

      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
