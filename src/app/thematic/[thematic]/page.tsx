import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/routes/prismicio";
import { Content, filter } from "@prismicio/client";

interface IProps {
  thematic: string;
}

export async function generateMetadata({
  params,
}: {
  params: IProps;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("thematic", params.thematic)
    .catch(() => notFound());

  return { title: page.data.meta_title || "Thématique | Prismic TS" };
}

export default async function Page({ params }: { params: IProps }) {
  const client = createClient();

  const page = await client
    .getByUID("thematic", params.thematic)
    .catch(() => notFound());

  // TODO: instead of hotels, get region/department/cities with current Thematic, on click -> /destination/:destination/thematic/:thematic
  const hotels = await client
    .getAllByType("hotel", {
      filters: [filter.at("my.hotel.thematics.thematic", page.id)],
    })
    .catch(() => notFound());

  return (
    <>
      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          <h2 className="text-2xl uppercase">Thématique : {page.data.label}</h2>
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Hôtels</h4>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {hotels?.map((hotel: Content.HotelDocument) => (
            <ul key={hotel.id}>
              <li>{hotel.data.name}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
