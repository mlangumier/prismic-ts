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
    path: "/lang?",
  },
  // {
  //   type: "destination",
  //   uid: "destination",
  //   path: "/destination",
  // },
  {
    type: "region",
    path: "/destination/:uid",
  },
  {
    type: "department",
    path: "/destination/:uid",
  },
  {
    type: "city",
    path: "/destination/:uid",
  },
  // {
  //   type: "thematic",
  //   uid: "thematic",
  //   path: "/thematic",
  // },
  {
    type: "thematic",
    path: "/thematic/:uid",
  },
  // {
  //   type: "hotel",
  //   resolvers: { destination: "destination", thematic: "thematic" },
  //   path: "/destination/:destination/thematic/:thematic",
  // },
];

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 * *Not necessary right now, but might be useful at some point
 */
export const linkResolver: prismic.LinkResolverFunction = (doc) => {
  // console.log("----- LINK RESOLVER ----- \n", doc);

  switch (doc.type) {
    // return `/destination/${doc.uid}/thematic/${thematic.uid}`
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
