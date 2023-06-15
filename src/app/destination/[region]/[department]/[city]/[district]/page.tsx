import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";

interface IProps {
  params: {
    district: string;
  };
}

const getPageData = async (districtUid: string) => {
  const client = createClient();

  const district = await client
    .getByUID("district", districtUid)
    .catch(notFound);

  return { district };
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { district } = await getPageData(params.district);

  return { title: district.data.meta_title || district.data.name };
}

export default async function Page({ params }: IProps) {
  const { district } = await getPageData(params.district);

  return (
    <div className="text-center m-auto">
      <h2>District: {district.data.name}</h2>
    </div>
  );
}
