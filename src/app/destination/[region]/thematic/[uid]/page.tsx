import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";
import { notFound } from "next/navigation";

interface IProps {
  uid: string;
  region: string;
}

const getPageData = async (thematicUid: string, regionUid: string) => {
  const client = createClient();

  const thematic = await client
    .getByUID("thematic", thematicUid)
    .catch(notFound);

  const region = await client.getByUID("region", regionUid).catch(notFound);

  const hotels = await client
    .getAllByType("hotel", {
      filters: [filter.at("my.hotel.thematics.thematic", thematic.id)],
    })
    .catch(notFound);

  return { thematic, region, hotels };
};

export default async function Page({ params }: { params: IProps }) {
  const { thematic, region, hotels } = await getPageData(
    params.uid,
    params.region
  );

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
