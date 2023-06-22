import { notFound } from "next/navigation";
import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";

interface IParams {
  params: IProps;
}
interface IProps {
  city: string;
  district: string;
}

const getPageData = async (params: IProps) => {
  const client = createClient();

  const district = await client
    .getByUID("district", params.district)
    .catch(notFound);

  const city = await client
    .getByUID("city", params.city, {
      fetchLinks: ["department.region"],
    })
    .catch(notFound);

  if (
    district.data.city.uid !== params.city ||
    city.data.department.uid !== params.department ||
    city.data.department.data.region.uid !== params.region
  ) {
    notFound();
  }

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

// export async function generateMetadata({ params }: IParams): Promise<Metadata> {
//   const { district } = await getPageData(params);

//   return { title: district.data.meta_title || district.data.name };
// }

export default async function Page({ params }: IParams) {
  const { district } = await getPageData(params);

  return (
    <div className="text-center m-auto">
      <h2>District: {district.data.name}</h2>
    </div>
  );
}
