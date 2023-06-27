"use client";

import { useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { Query, asText, filter } from "@prismicio/client";
import { createClient } from "@/routes/prismicio";
import { ArticleDocument, BlogDocument } from "../../../prismicio-types";

interface IProps {
  blog: BlogDocument;
  dictionary: any;
  articles: Query<ArticleDocument>;
}

// TODO: Check why once tag selected, can't change website language.
// TODO: Sometimes, can't interact with tags after refresh

export default function BlogView({ blog, dictionary, articles }: IProps) {
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [articleList, setArticleList] =
    useState<Query<ArticleDocument>>(articles);
  const [inclusiveSearch, setInclusiveSearch] = useState<boolean>(true);
  const client = createClient();

  useEffect(() => {
    const searchArticles = async () => {
      const articles = await client.getByType("article", {
        lang: blog.lang,
        // If not tags selected, get all articles without filters.
        filters: searchTags.length
          ? [
              inclusiveSearch === true
                ? filter.any("document.tags", searchTags) // Inclusive search (articles with at least one of those tags)
                : filter.at("document.tags", searchTags), // Exclusive search (articles with all those tags)
              filter.not("document.type", "blog"), // Blog has tags but we don't want that page in the article list.
            ]
          : [],
      });
      setArticleList(articles);
    };

    searchArticles();
  }, [blog.lang, searchTags, inclusiveSearch]); //! client -> causes fetch loop

  const handleTagSelector = (tag: string) => {
    if (searchTags.find((t) => t === tag)) {
      setSearchTags((prev) => prev.filter((t) => t !== tag));
    } else {
      searchTags.length
        ? setSearchTags((prev) => [...prev, tag])
        : setSearchTags([tag]);
    }
  };

  return (
    <>
      <div className="my-8 p-4 border-t-[1px] border-b-[1px] border-slate-300">
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={inclusiveSearch}
            onChange={() => setInclusiveSearch(!inclusiveSearch)}
          />
          <p>Inclusive search</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {blog.tags.sort().map((tag: string) => (
            <button
              onClick={() => handleTagSelector(tag)}
              key={tag}
              className={`border-[1px] border-slate-300 rounded-full px-2 py-1 text-sm hover:bg-slate-200 ${
                searchTags?.find((t) => t === tag)
                  ? "bg-slate-700 text-white hover:bg-slate-500"
                  : null
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {articleList?.results.length ? (
        <div className="my-8 mx-4">
          <ul className="flex justify-start gap-x-2 gap-y-4 flex-wrap">
            {articleList.results?.map((article: ArticleDocument) => (
              <li
                key={article.id}
                className="rounded-md w-[240px] shadow-lg hover:drop-shadow-lg"
              >
                <PrismicNextImage
                  field={article.data.main_image}
                  className="object-cover h-40 rounded-t-md self-center"
                />

                <div className="px-2 py-4 flex flex-col gap-2">
                  <h5 className="text-lg font-semibold">
                    {article.data.title}
                  </h5>

                  <p className="flex-1">{asText(article.data.description)}</p>

                  <div className="flex items-center flex-wrap gap-1 text-sm">
                    {article.tags.map((tag) => (
                      <button
                        key={tag}
                        className="border-[1px] border-slate-300 rounded-full px-2 py-[2px] text-xs"
                        onClick={() => handleTagSelector(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center py-4">({dictionary.blog.articles.empty})</p>
      )}
    </>
  );
}
