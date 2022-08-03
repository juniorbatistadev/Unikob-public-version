import { getServerSideSitemap } from "next-sitemap";
import { getPostsWithPagination } from "src/data/server/queryPosts";
import { READ_POST_PATH } from "src/paths";

export const getServerSideProps = async (ctx) => {
  const postsRes = await getPostsWithPagination({
    startFrom: 0,
    perPage: 1000,
  });

  const newsSitemaps = postsRes.results.map((item) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_SITE_URL}${READ_POST_PATH.replace(
      ":slug",
      item.attributes.slug
    )}`,
    lastmod: item.attributes.updatedAt,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
