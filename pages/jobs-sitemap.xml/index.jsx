import { getServerSideSitemap } from "next-sitemap";
import { getJobsWithPaginationFromServer } from "src/data/server/queryJobs";
import { JOB_READ_PATH } from "src/paths";

export const getServerSideProps = async (ctx) => {
  const jobsRes = await getJobsWithPaginationFromServer({
    startFrom: 0,
    perPage: 1000,
  });

  const newsSitemaps = jobsRes.results.map((item) => ({
    loc: `${process.env.NEXT_PUBLIC_APP_SITE_URL}${JOB_READ_PATH.replace(
      ":job",
      item.attributes.slug
    )}`,
    lastmod: item.attributes.updatedAt,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
