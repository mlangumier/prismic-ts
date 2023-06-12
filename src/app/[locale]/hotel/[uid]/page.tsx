import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
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
    .getByUID("hotel", params.uid)
    .catch(() => notFound());

  return { title: page.data.meta_title };
}

export default async function Page({ params }: { params: IProps }) {
  const client = createClient();

  const page = await client
    .getByUID("hotel", params.uid, {
      fetchLinks: ["thematic.label", "city.name", "city.region", "region.name"],
    })
    .catch(notFound);

  return (
    <>
      <div className="my-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          <h2 className="text-2xl uppercase">Hôtel : {page.data.name}</h2>
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Thématiques</h4>
        <div className="flex justify-center items-center gap-4">
          {page.data.thematics?.map(({ thematic }) => (
            <LinkComponent
              url={thematic.url!}
              text={thematic.data.label}
              key={thematic.id}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Ville</h4>
        <div className="flex justify-center items-center gap-4">
          <LinkComponent
            url={page.data.city.url!}
            text={`${page.data.city.data.name} (${page.data.city.data.region.data.name})`}
          />
        </div>
      </div>
    </>
  );
}
