import { createClient, type QueryParams } from "next-sanity";

import { hasSanityEnv, sanityEnv } from "@/sanity/env";

const sanityClient = hasSanityEnv
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

interface SanityFetchArgs<T> {
  query: string;
  params?: QueryParams;
  fallback: T;
  revalidate?: number;
}

export async function sanityFetch<T>({
  query,
  params,
  fallback,
  revalidate = 120,
}: SanityFetchArgs<T>): Promise<T> {
  if (!sanityClient) {
    return fallback;
  }

  try {
    const data = await sanityClient.fetch<T | null>(query, params ?? {}, {
      next: { revalidate },
    });

    return data ?? fallback;
  } catch (error) {
    console.error("Sanity fetch failed, using fallback content:", error);
    return fallback;
  }
}
