import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/routes/prismicio";
import { components } from "@/slices";
import { getDictionary } from "@/app/i18n/dicionaries";
import { notFound } from "next/navigation";
import { filter } from "@prismicio/client";
import BlogView from "@/views/blog";

interface IProps {
  lang: string;
}

const getPageData = async (lang: string) => {
  const client = createClient();

  try {
    const page = await client.getSingle("blog", { lang });

    const articles = await client.getByType("article", {
      lang,
      filters: [
        filter.any("document.tags", page.tags),
        filter.not("document.type", "blog"),
      ],
    });
    return { page, articles };
  } catch (error) {
    notFound();
  }
};

export default async function Page({ params }: { params: IProps }) {
  const dictionary = await getDictionary(params.lang);
  const { page, articles } = await getPageData(params.lang);

  return (
    <>
      <div className="max-w-[500px] m-auto text-center">
        <h2 className="mb-4">{page.data.title}</h2>
        <PrismicRichText field={page.data.description} />
      </div>

      <BlogView blog={page} articles={articles} dictionary={dictionary} />

      {/* <SliceZone slices={page.data.slices} components={components} /> */}
    </>
  );
}
