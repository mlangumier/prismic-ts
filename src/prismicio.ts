import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "../sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * A list of Route Resolver objects that define how a document's `url` field
 * is resolved.
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * If fails, add a Link Resolver that will take priority, and keep Route Resolver as backup
 * {@link https://prismic.io/docs/route-resolver}
 *
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    uid: "homepage",
    path: "/",
  },
  {
    type: "region",
    path: "/destination/:uid",
  },
  {
    type: "city",
    resolvers: { region: "region" },
    path: "/city/:region/:uid",
  },
  {
    type: "hotel",
    path: "/hotel/:uid",
  },
  {
    type: "thematic",
    path: "/inspiration/:uid",
  },
  // -----
  // {
  //   type: "thematic",
  //   path: "/:lang/inspiration/:uid",
  // },
  //* OR
  // {
  //   type: "typology",
  //   path: "/:lang/inspiration/:uid",
  // },
  // -----
  // {
  //   type: "region",
  //   path: "/:lang/destination/:uid",
  // },
  // {
  //   type: "city",
  //   resolvers: {
  //     region: "city.region",
  //   },
  //   path: "/:lang/destination/:region?/:uid",
  // },
  // {
  //   type: "region",
  //   resolvers: {
  //     thematic: "thematic",
  //   },
  //   path: "/:lang/destination/:uid/:thematic",
  // },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      //   cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store",
      next: { tags: ["prismic"] },
    },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
