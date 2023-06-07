import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";
import { LinkComponent } from "@/components/link";

interface IProps {
  uid: string;
}

export async function generateMetadata({
  params,
}: {
  params: IProps;
}): Promise<Metadata> {
  const client = createClient();

  const page = await client
    .getByUID("region", params.uid)
    .catch(() => notFound());

  return { title: page.data.meta_title || "Region | Prismic TS" };
}

export default async function Page({ params }: { params: IProps }) {
  const client = createClient();

  const page = await client
    .getByUID("region", params.uid)
    .catch(() => notFound());

  const cities = await client
    .getAllByType("city", {
      filters: [filter.at("my.city.region", page.id)],
    })
    .catch(() => notFound());

  const thematics = await client
    .getAllByType("thematic")
    .catch(() => notFound());

  return (
    <>
      <div className="my-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          <h2 className="text-2xl uppercase">Région : {page.data.name}</h2>
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Villes</h4>
        <div className="flex justify-center items-center gap-4">
          {cities?.map((city: Content.CityDocument) => (
            <LinkComponent
              url={city.url!}
              text={city.data.name}
              key={city.id}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Thématiques</h4>
        <div className="flex justify-center items-center gap-4">
          {thematics?.map((thematic: Content.ThematicDocument) => (
            <LinkComponent
              url={thematic.url!}
              text={thematic.data.label}
              key={thematic.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
