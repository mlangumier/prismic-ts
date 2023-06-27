import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import type { FilledLinkToDocumentField } from "@prismicio/types";
import sm from "../../slicemachine.config.json";
import { ERoutingPath } from "./routes";

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
  // {
  //   type: "homepage",
  //   uid: "homepage",
  //   path: ERoutingPath.HOMEPAGE,
  // },
];

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 * *Not necessary right now, but might be useful at some point
 */
// export const linkResolver: prismic.LinkResolverFunction = (
//   doc: FilledLinkToDocumentField
// ) => {
//   switch (doc.type) {
//     case "district": {
//       //* City.URL provides full URL + district provides its own param
//       const cityUrl = doc.data.city.url;
//       return `${cityUrl}/${doc.uid}`;
//     }

//     default: {
//       return null;
//     }
//   }
// };

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
