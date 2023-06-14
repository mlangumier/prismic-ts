import { createClient } from "@/prismicio";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    uid: string;
  };
}

// TODO: useCallback or useMemo here ?
const getPageData = async (uid: string) => {
  const client = createClient();

  try {
    //* Check for REGION
    const region = await client.getByUID("region", uid).catch(() => null);

    if (region) {
      return region;
    }

    //* Check for DEPARTMENT
    const department = await client
      .getByUID("department", uid)
      .catch(() => null);

    if (department) {
      return department;
    }

    //* Check for CITY
    const city = await client.getByUID("city", uid).catch(() => null);
    if (city) {
      return city;
    }

    //* If nothing has been found, throw error
    throw new Error(
      "The UID does not correspond to any Region, Department or City."
    );
  } catch (error) {
    notFound();
  }
};

export async function generateMetadata({
  params: { uid },
}: IProps): Promise<Metadata> {
  const page = await getPageData(uid);

  return { title: page.data.meta_title || "Prismic TS" };
}

// TODO: 3 views to display info (slices will be in views if required)

export default async function Page({ params }: IProps) {
  const page = await getPageData(params.uid);

  console.log("-----Page", page);

  if (page.type === "region") {
    return <div className="text-center m-auto">Region: {page.data.name}</div>;
  } else if (page.type === "department") {
    return (
      <div className="text-center m-auto">Department: {page.data.name}</div>
    );
  } else if (page.type === "city") {
    return <div className="text-center m-auto">City: {page.data.name}</div>;
  } else {
    return <div>No content found (should be a 404 instead of this)</div>;
  }
}
