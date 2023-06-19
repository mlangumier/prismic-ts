"use client";

import { notFound, usePathname } from "next/navigation";
import { filter } from "@prismicio/client";
import { LinkNextComponent } from "@/components/link";
import { createClient } from "@/routes/prismicio";
import { ERoutingPath } from "@/routes/routes";

interface IProps {
  region: string;
}

const getPageData = async (params: IProps) => {
  const client = createClient();
  const page = await client.getByUID("region", params.region).catch(notFound);

  const departments = await client.getAllByType("department", {
    filters: [filter.at("my.department.region", page.id)],
  });

  //* Current option: iterate on all hotels (filter city?dpt?)
  // then get thematic list from then, then get thematic data from th.list
  // TODO: find another way to not iterate on all hotels

  // console.log(
  //   "-----HOTELS----- \n",
  //   hotelsInRegion
  //     .map((hotel) => {
  //       return hotel.data.thematics.map(({ thematic }) => thematic.id);
  //     })
  //     .flat()
  // );

  // TODO: display only thematics available for region
  const thematics = await client.getAllByType("thematic").catch(notFound);

  return { page, thematics, departments };
};

export default async function Page({ params }: { params: IProps }) {
  const pathname = usePathname();

  const { page, thematics, departments } = await getPageData(params);

  return (
    <>
      <div className="py-8 max-w-[500px] m-auto text-center">
        <h2>Region: {page.data.name}</h2>
      </div>

      <div className="py-4 text-center">
        <h4 className="my-2 uppercase">Departments</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {departments.map((dept) => (
            <LinkNextComponent href={`${pathname}/${dept.uid}`} key={dept.id}>
              {dept.data.name}
            </LinkNextComponent>
          ))}
        </div>
      </div>

      <div className="py-4 text-center">
        <h4 className="my-2 uppercase">Thematics</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {thematics.map((thematic) => (
            <LinkNextComponent
              href={`${pathname}/${ERoutingPath.THEMATIC}/${thematic.uid}`}
              key={thematic.id}
            >
              {thematic.data.label}
            </LinkNextComponent>
          ))}
        </div>
      </div>
    </>
  );
}
