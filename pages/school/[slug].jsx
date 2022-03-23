import ShowSchoolPage from "@pages/SchoolFeature/ShowSchoolPage";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSchoolFromServerBySlug } from "src/data/server/querySchoolsFromServer";

function ShowSchool({ data }) {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <title>{`${data.name} - GenteUni`}</title>
        <meta name="description" content={data.description} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_ES" />
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_APP_FACEBOOK_APP_ID}
        />
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.description} />
        <meta
          property="og:url"
          content={`https://genteuni-next.vercel.app${asPath}`}
        />
        {/* <meta property="og:image" content={firstImageUrl} /> */}

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@genteuniapp" />
        <meta name="twitter:creator" content="@genteuniapp" />
      </Head>
      <ShowSchoolPage data={data} />{" "}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const school = await getSchoolFromServerBySlug(slug);

  if (!school) {
    return {
      notFound: true,
    };
  }

  //fomart data
  const schoolData = await school.toJSON();
  schoolData.country = school.attributes.country.toJSON();

  return {
    props: { data: schoolData },
  };
}

export default ShowSchool;
