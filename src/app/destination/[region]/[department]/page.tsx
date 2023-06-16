"use client";

import { LinkNextComponent } from "@/components/link";
import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";
import { notFound, usePathname } from "next/navigation";

interface IProps {
  params: {
    region: string;
    department: string;
  };
}

const getPageData = async (departmentUid: string, regionUid: string) => {
  const client = createClient();

  const department = await client
    .getByUID("department", departmentUid, {
      fetchLinks: ["region.name"],
    })
    .catch(notFound);

  // Check if url.params are logic
  if (department.data.region.uid !== regionUid) {
    notFound();
  }

  const cities = await client.getAllByType("city", {
    filters: [filter.at("my.city.department", department.id)],
  });

  return { department, cities };
};

// export async function generateMetadata({ params }: IProps): Promise<Metadata> {
//   const { department } = await getPageData(params.department, params.region);

//   return { title: department.data.meta_title || "Prismic TS" };
// }

export default async function Page({ params }: IProps) {
  const pathname = usePathname();

  const { department, cities } = await getPageData(
    params.department,
    params.region
  );

  return (
    <div className="text-center m-auto">
      <h2>
        Department: {department.data.name} ({department.data.region.data.name})
      </h2>

      <div className="mt-8">
        <h4 className="my-2 uppercase">Departments</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {cities.map((city) => (
            <LinkNextComponent href={`${pathname}/${city.uid}`} key={city.id}>
              {city.data.name}
            </LinkNextComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
