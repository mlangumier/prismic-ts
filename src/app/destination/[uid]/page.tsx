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

// export async function generateMetadata({
//   params: { uid, locale },
// }: IProps): Promise<Metadata> {
//   const client = createClient();

//   const page = await client
//     .getByUID("city", uid, { lang: locale })
//     .catch(() => notFound());

//   return { title: page.data.meta_title || "Prismic TS" };
// }

// TODO: 3 views to display info (slices will be in views if required)

export default async function Page({ params }: IProps) {
  const page = await getPageData(params.uid);

  console.log("-----Page", page);

  // const page = await client
  //   .getByUID("region", params.uid)
  //   .catch(() => notFound());
  // console.log("----Page", page);

  // const hotels = await client
  //   .getAllByType("hotel", {
  //     fetchLinks: "thematic.label",
  //     filters: [filter.at("my.hotel.city", page.id)],
  //   })
  //   .catch(notFound);

  // const thematicsList = hotels
  //   .map((hotel) => hotel.data.thematics.map(({ thematic }) => thematic.id))
  //   .flat();

  // const thematics = await client
  //   .getAllByType("thematic", {
  //     filters: [filter.any("document.id", thematicsList)],
  //   })
  //   .catch(() => notFound());

  return (
    <>
      <div className="my-8 flex flex-col justify-center items-center">
        <div className="mb-8 flex gap-2">
          {/* <h2 className="text-2xl uppercase">{page.data.name}</h2> */}
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Thématiques</h4>
        <div className="flex justify-center items-center gap-4">
          {/* {thematics?.map((thematic: Content.ThematicDocument) => (
            <LinkComponent
              doc={thematic}
              text={thematic.data.label}
              key={thematic.id}
            />
          ))} */}
        </div>
      </div>

      <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
        <h4 className="text-xl mb-6">Hôtels</h4>
        <div className="flex justify-center items-center gap-4">
          {/* {hotels?.map((hotel: Content.HotelDocument) => (
            <LinkComponent doc={hotel} text={hotel.data.name} key={hotel.id}>
              <p className="text-xs flex gap-1 justify-center">
                (
                {hotel.data.thematics.map(({ thematic }: { thematic: any }) => (
                  <span key={thematic.id}>{thematic.data.label}</span>
                ))}
                )
              </p>
            </LinkComponent>
          ))} */}
        </div>
      </div>
    </>
  );
}
