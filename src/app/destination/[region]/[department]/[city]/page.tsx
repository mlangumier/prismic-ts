import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    city: string;
  };
}

const getPageData = async (cityUid: string) => {
  const client = createClient();

  const city = await client.getByUID("city", cityUid).catch(notFound);

  const districts = await client
    .getAllByType("district", {
      filters: [filter.at("my.district.city", city.id)],
    })
    .catch(() => null);

  return { city, districts };
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { city } = await getPageData(params.city);

  return { title: city.data.meta_title || "Prismic TS" };
}

export default async function Page({ params }: IProps) {
  const { city, districts } = await getPageData(params.city);

  return (
    <div className="text-center m-auto">
      <h2>City: {city.data.name}</h2>

      {districts && districts.length ? (
        <div className="mt-8">
          <h4 className="my-2 uppercase">Districts</h4>
          <div className="flex flex-row justify-center items-center gap-2">
            {districts.map((district) => (
              <LinkComponent document={district} key={district.id}>
                {district.data.name}
              </LinkComponent>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
