import { AllDocumentTypes } from "./../prismicio-types.d";
import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "../slicemachine.config.json";

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
    path: "/:lang?",
  },
  // {
  //   type: "destination",
  //   uid: "destination",
  //   path: "/:lang/destination",
  // },
  // TODO: setup linkResolver for destinations (area,region,city)
  {
    type: "region",
    path: "/:lang/destination/:uid",
  },
  // {
  //   type: "inspiration",
  //   uid: "inspiration",
  //   path: "/:lang/inspiration",
  // },
  {
    type: "thematic",
    path: "/:lang/inspriation/:uid",
  },
  //* NEED: path: "/:lang/destination/:destination/inspiration/:thematic"
  {
    type: "city",
    resolvers: { region: "region" },
    path: "/:lang/destination/:region?/:uid",
  },
  {
    type: "hotel",
    resolvers: { city: "city", region: "city.region" },
    path: "/:lang/destination/:region?/:city/:uid",
  },
];

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (link: any) => {
  console.log("------WAS HERE!", link);

  switch (link.type) {
    case "thematic": {
      return `/${link.lang}/inspiration/${link.uid}`;
    }
    default: {
      return null;
    }
  }
};

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
