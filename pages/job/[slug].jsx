import JobFeedItem from "@pages/FeedPage/components/JobFeedItem";
import ShowJobPage from "@pages/JobFeature/ShowJobPage";
import Head from "next/head";
import { useRouter } from "next/router";
import { getJobBySlugServerSide } from "src/data/server/queryJobsFromServer";
import extractTextFromPost from "src/helpers/extractTextFromPost";

function ReadJob({ data }) {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <title>{`${data.title} - GenteUni`}</title>
        <meta
          name="description"
          content={extractTextFromPost(data.content.blocks, 60)}
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={data.createdAt} />
        <meta property="article:modified_time" content={data.updatedAt} />
        <meta property="og:locale" content="es_ES" />
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_APP_FACEBOOK_APP_ID}
        />
        <meta property="og:title" content={data.title} />
        <meta
          property="og:description"
          content={extractTextFromPost(data.content.blocks, 60)}
        />
        <meta
          property="og:url"
          content={`https://genteuni-next.vercel.app${asPath}`}
        />

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@genteuniapp" />
        <meta name="twitter:creator" content="@genteuniapp" />
      </Head>
      <ShowJobPage data={data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const job = await getJobBySlugServerSide(slug);

  if (!job) {
    return {
      notFound: true,
    };
  }

  const jobData = await job.toJSON();
  const tags = await job.attributes.subjects.query().find();
  jobData.tags = tags.map((tag) => tag.attributes.name);

  console.log(tags);

  return {
    props: { data: jobData },
  };
}

export default ReadJob;
