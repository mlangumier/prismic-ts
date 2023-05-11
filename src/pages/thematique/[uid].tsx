import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Content, predicate } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { createClient, linkResolver } from "../../../prismicio";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

interface IProps {
  page: Content.ThematiqueDocument;
  experiences: any;
}

const Page: NextPage<IProps> = ({ page, experiences }) => {
  return (
    <>
      <Head>
        <title>{prismicH.asText(page.data.title)} | Experience</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="my-8 flex flex-col justify-center items-center">
          <div className="mb-8">
            <PrismicRichText field={page.data.title} />
          </div>

          <div className="max-w-[250px]">
            <PrismicNextImage
              field={page.data.image}
              imgixParams={{ sat: -75 }}
            />
          </div>
        </div>

        <div className="mt-8 text-center border-y-[1px] py-8 border-slate-300">
          <h4 className="text-xl mb-6">Experiences:</h4>
          <div className="flex justify-center items-center gap-4">
            {experiences.results?.map(
              (experience: Content.ExperienceDocument) => {
                return (
                  <Link
                    href={{
                      pathname: "/experience/[uid]",
                      query: { uid: experience.uid },
                    }}
                    className="relative flex flex-col justify-center items-center w-max py-4 px-6 shadow-md hover:shadow-xl rounded-xl"
                    key={experience.id}
                  >
                    <PrismicRichText field={experience.data.title} />
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const uid = typeof params?.uid === "string" ? params.uid : "";
  const client = createClient({ previewData });

  const page = await client.getByUID("thematique", uid);

  const experiences = await client.get({
    predicates: [
      predicate.at("document.type", "experience"),
      predicate.at("document.tags", page.tags),
    ],
  });

  return {
    props: {
      page,
      experiences,
    },
  };
};

export async function getStaticPaths() {
  const client = createClient();
  const pages = await client.getAllByType("thematique");

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
