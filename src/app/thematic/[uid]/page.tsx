import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
    .getByUID("thematic", params.uid)
    .catch(() => notFound());

  return { title: page.data.meta_title || "Thematique | Prismic TS" };
}

export default async function Page({ params }: { params: IProps }) {
  const client = createClient();

  const page = await client
    .getByUID("thematic", params.uid)
    .catch(() => notFound());

  const hotels = await client
    .getAllByType("hotel", {
      filters: [
        filter.at("my.hotel.thematics.thematic", page.id),
        // filter.at("my.hotel.city", "ZIA8ARUAACoAzgba"), // Annecy
      ],
    })
    .catch(() => notFound());

  return (
    <>
      <div className="my-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          <h2 className="uppercase">Thématique : {page.data.label}</h2>
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Hôtels</h4>
        <div className="flex justify-center items-center gap-4">
          {hotels?.map((hotel: Content.HotelDocument) => {
            return (
              <LinkComponent
                pageType="hotel"
                uid={hotel.uid}
                typeDataTitle={hotel.data.name}
                key={hotel.uid}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
