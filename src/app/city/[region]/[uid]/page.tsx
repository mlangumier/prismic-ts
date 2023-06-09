import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    .getByUID("city", params.uid)
    .catch(() => notFound());

  return { title: page.data.meta_title || "Ville | Prismic TS" };
}

export default async function Page({ params }: { params: IProps }) {
  const client = createClient();

  const page = await client
    .getByUID("city", params.uid)
    .catch(() => notFound());

  const hotels = await client
    .getAllByType("hotel", {
      fetchLinks: "thematic.label",
      filters: [filter.at("my.hotel.city", page.id)],
    })
    .catch(notFound);

  const thematicsList = hotels
    .map((hotel) => hotel.data.thematics.map(({ thematic }) => thematic.id))
    .flat();

  const thematics = await client
    .getAllByType("thematic", {
      filters: [filter.any("document.id", thematicsList)],
    })
    .catch(() => notFound());

  return (
    <>
      <div className="my-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          <h2 className="text-2xl uppercase">Ville : {page.data.name}</h2>
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">
          Thématiques (need to only keep relevant ones)
        </h4>
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

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Hôtels</h4>
        <div className="flex justify-center items-center gap-4">
          {hotels?.map((hotel: Content.HotelDocument) => (
            <LinkComponent
              url={hotel.url!}
              text={hotel.data.name}
              key={hotel.id}
            >
              <p className="text-xs flex gap-1 justify-center">
                (
                {hotel.data.thematics.map(({ thematic }: { thematic: any }) => (
                  <span key={thematic.id}>{thematic.data.label}</span>
                ))}
                )
              </p>
            </LinkComponent>
          ))}
        </div>
      </div>
    </>
  );
}
