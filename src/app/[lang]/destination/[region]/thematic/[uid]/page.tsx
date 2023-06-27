import { notFound } from "next/navigation";
import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";

interface IProps {
  uid: string;
  region: string;
}

const getPageData = async (params: IProps) => {
  const client = createClient();

  const thematic = await client
    .getByUID("thematic", params.uid)
    .catch(notFound);

  const region = await client.getByUID("region", params.region).catch(notFound);

  const hotels = await client
    .getAllByType("hotel", {
      fetchLinks: ["city.department", "department.region"],
      filters: [filter.at("my.hotel.thematics.thematic", thematic.id)],
    })
    .catch(notFound);

  const hotelsInRegion = hotels.filter((hotel) => {
    return (
      (hotel.data.city as any).data.department.data.region.uid === params.region
    );
  });

  return { thematic, region, hotels: hotelsInRegion };
};

export default async function Page({ params }: { params: IProps }) {
  const { thematic, region, hotels } = await getPageData(params);

  return (
    <>
      <div className="py-8 max-w-[500px] m-auto text-center">
        <h2>
          Thematic: {thematic.data.label} ({region.data.name})
        </h2>
      </div>

      <div className="py-4 text-center">
        <h4 className="my-2 uppercase">Hotels</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {hotels.map((hotel) => (
            <ul key={hotel.id}>
              <li>{hotel.data.name}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
