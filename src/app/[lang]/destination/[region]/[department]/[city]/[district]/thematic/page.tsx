import { LinkNextComponent } from "@/components/link";
import { createClient } from "@/routes/prismicio";
import { filter } from "@prismicio/client";
import { notFound } from "next/navigation";

interface IProps {
  uid: string;
  district: string;
}

const getPageData = async (thematicUid: string, districtUid: string) => {
  const client = createClient();

  const thematic = await client
    .getByUID("thematic", thematicUid)
    .catch(notFound);

  const district = await client
    .getByUID("district", districtUid)
    .catch(notFound);

  const hotels = await client.getAllByType("hotel", {
    filters: [
      filter.at("my.hotel.thematics.thematic", thematic.id),
      // filter.at("my.hotel.city.district", district.id),
    ],
  });

  // console.log("----Hotels", hotels.length);

  return { thematic, district, hotels };
};

export default async function Page({ params }: { params: IProps }) {
  const { thematic, district, hotels } = await getPageData(
    params.uid,
    params.district
  );

  return (
    <>
      <div className="py-8 max-w-[500px] m-auto text-center">
        <h2>
          Thematic: {thematic.data.label} ({district.data.name})
        </h2>
      </div>

      <div className="py-4 text-center">
        <h4 className="my-2 uppercase">Hotels</h4>
        <div className="flex flex-row justify-center items-center gap-2">
          {hotels.map((hotel) => (
            <LinkNextComponent href={`this-is-url`} key={hotel.id}>
              {hotel.data.name}
            </LinkNextComponent>
          ))}
        </div>
      </div>
    </>
  );
}
