import ShowJobPage from "@pages/JobFeature/ShowJobPage";
import Head from "next/head";
import { useRouter } from "next/router";
import { getJobBySlugServerSide } from "src/data/server/queryJobsFromServer";
import extractTextFromPost from "src/helpers/extractTextFromPost";

function ReadJob({ data }) {
  const { asPath } = useRouter();

  function addPostJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title  ": "${data.title}",
      "datePosted": "${data.createdAt}",
      "hiringOrganization" : "confidential",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        }
      },
      "description": "${extractTextFromPost(data.content.blocks, 100)}"
    }
  `,
    };
  }
  return (
    <>
      <Head>
        <title>{`${data.title} - Unikob`}</title>
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
          content={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
        />

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@unikob_app" />
        <meta name="twitter:creator" content="@unikob_app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJobJsonLd()}
          key="-jsojobnld"
        />
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

  return {
    props: { data: jobData },
  };
}

export default ReadJob;
