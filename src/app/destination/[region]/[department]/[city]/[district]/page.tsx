import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";

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

  const hotels = await client.getAllByType("hotel", {
    filters: [filter.at("my.hotel.city.district", district.id)],
  });

  // const currentThematics = await hotels
  //   .map((h) => h.data.thematics.map(({ thematic }) => thematic.id))
  //   .flat();

  // const thematics = await client.getAllByType("thematic", {
  //   filters: [filter.any("my.hotel.thematics.thematic", currentThematics[0])],
  // });

  // console.log("-----Hotels:", thematics);

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
