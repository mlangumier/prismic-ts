import { notFound } from "next/navigation";
import { LinkNextComponent } from "@/components/link";
import { createClient } from "@/routes/prismicio";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { ERoutingPath } from "@/routes/routes";
import { getDictionary } from "../i18n/dicionaries";

interface IProps {
  lang: string;
}

async function getDocuments(lang: string) {
  const client = createClient();

  try {
    const page = await client.getSingle("homepage", { lang });

    const regions = await client.getAllByType("region", { lang });

    const thematics = await client.getAllByType("thematic", { lang });

    return { page, regions, thematics };
  } catch (error) {
    console.log("----Homepage Error", error);
    notFound();
  }
}

export default async function Home({ params }: { params: IProps }) {
  const { page, regions, thematics } = await getDocuments(params.lang);
  const dictionary = await getDictionary(params.lang);

  console.log("----Dictionary:", dictionary);

  return (
    <>
      <div className="py-8 max-w-[500px] m-auto text-center">
        <PrismicRichText field={page.data.description} />
      </div>

      {regions.length ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">{dictionary.homepage.regions.title}</h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {regions?.map((region) => (
              <LinkNextComponent
                href={`${ERoutingPath.DESTINATION}/${region.uid}`}
                key={region.id}
              >
                {region.data.name}
              </LinkNextComponent>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center py-4">
          ({dictionary.homepage.regions.empty})
        </p>
      )}

      {thematics.length ? (
        <div className="text-center py-4">
          <h4 className="text-xl mb-6">
            {dictionary.homepage.thematics.title}
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {thematics?.map((thematic) => (
              <LinkNextComponent
                href={`/${params.lang}${ERoutingPath.THEMATIC}/${thematic.uid}`}
                locale={params.lang}
                key={thematic.id}
              >
                {thematic.data.label}
              </LinkNextComponent>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center py-4">
          ({dictionary.homepage.thematics.empty})
        </p>
      )}

      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
