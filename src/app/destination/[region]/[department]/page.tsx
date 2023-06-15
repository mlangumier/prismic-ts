import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    region: string;
    department: string;
  };
}

const getPageData = async (departmentUid: string, regionUid: string) => {
  const client = createClient();

  const department = await client
    .getByUID("department", departmentUid)
    .catch(notFound);

  const region = await client.getByUID("region", regionUid).catch(notFound);

  const cities = await client.getAllByType("city", {
    filters: [filter.at("my.city.department", department.id)],
  });

  return { department, region, cities };
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { department } = await getPageData(params.department, params.region);

  return { title: department.data.meta_title || "Prismic TS" };
}

export default async function Page({ params }: IProps) {
  const { department, region, cities } = await getPageData(
    params.department,
    params.region
  );

  return (
    <div className="text-center m-auto">
      <h2>
        Department: {department.data.name}, region of {region.data.name}
      </h2>

      <div className="mt-8">
        <h4 className="my-2 uppercase">Departments</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {cities.map((city) => (
            <LinkComponent document={city} key={city.id}>
              {city.data.name}
            </LinkComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
