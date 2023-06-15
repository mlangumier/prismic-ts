import { LinkComponent } from "@/components/link";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    region: string;
  };
}

// TODO: useCallback or useMemo here ?
const getPageData = async (uid: string) => {
  const client = createClient();
  const page = await client.getByUID("region", uid).catch(notFound);

  const departments = await client.getAllByType("department", {
    filters: [filter.at("my.department.region", page.id)],
  });

  const thematics = await client.getAllByType("thematic").catch(notFound);

  return { page, thematics, departments };
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { page } = await getPageData(params.region);

  return { title: page.data.meta_title || "Prismic TS" };
}

export default async function Page({ params }: IProps) {
  const { page, thematics, departments } = await getPageData(params.region);

  return (
    <div className="text-center m-auto">
      <h2>Region: {page.data.name}</h2>

      <div className="mt-8">
        <h4 className="my-2 uppercase">Departments</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {departments.map((dept) => (
            <LinkComponent document={dept} key={dept.id}>
              {dept.data.name}
            </LinkComponent>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="my-2 uppercase">Thematics</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {thematics.map((thematic) => (
            <LinkComponent document={thematic} key={thematic.id}>
              {thematic.data.label}
            </LinkComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
