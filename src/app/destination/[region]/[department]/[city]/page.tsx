"use client";

import { notFound, usePathname } from "next/navigation";
import { LinkNextComponent } from "@/components/link";
import { filter } from "@prismicio/client";
import { createClient } from "@/routes/prismicio";

interface IParams {
  params: IProps;
}
interface IProps {
  city: string;
}

const getPageData = async (params: IProps) => {
  const client = createClient();

  const city = await client
    .getByUID("city", params.city, {
      fetchLinks: ["department.name", "department.region"],
    })
    .catch(notFound);

  if (
    city.data.department.uid !== params.department ||
    city.data.department.data.region.uid !== params.region
  ) {
    notFound();
  }

  const districts = await client
    .getAllByType("district", {
      filters: [filter.at("my.district.city", city.id)],
    })
    .catch(() => null);

  return { city, districts };
};

// export async function generateMetadata({ params }: IProps): Promise<Metadata> {
//   const { city } = await getPageData(params.city);

//   return { title: city.data.meta_title || "Prismic TS" };
// }

const Page = async ({ params }: IParams) => {
  const pathname = usePathname();

  const { city, districts } = await getPageData(params);

  return (
    <div className="text-center m-auto">
      <h2>City: {city.data.name}</h2>

      {districts && districts.length ? (
        <div className="mt-8">
          <h4 className="my-2 uppercase">Districts</h4>
          <div className="flex flex-row justify-center items-center gap-2">
            {districts.map((district) => {
              return (
                <LinkNextComponent
                  href={`${pathname}/${district.uid}`}
                  key={district.id}
                >
                  {district.data.name}
                </LinkNextComponent>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
