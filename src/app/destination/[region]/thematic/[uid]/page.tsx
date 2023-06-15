import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

interface IProps {
  uid: string;
  region: string;
}

// const getPageData = async (thematicUid: string, regionUid: string) => {
//   const client = createClient();

//   const thematic = await client
//     .getByUID("thematic", thematicUid)
//     .catch(notFound);

//   const region = await client.getByUID("region", regionUid).catch(notFound);

//   return { thematic, region };
// };

export default async function Page({ params }: { params: IProps }) {
  console.log("----Params:", params);
  // const { thematic, region } = await getPageData(params.uid, params.region);

  return (
    <div>
      <h2>{/* Thematic {thematic.data.label} in {region.data.name} */}</h2>
    </div>
  );
}
