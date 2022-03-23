import ReadPostPage from "@pages/PostFeature/ReadPostPage";
import Head from "next/head";
import { savePostView } from "src/data/server/queryPostInfo";
import { getPostBySlugServerSide } from "src/data/server/queryPostsFromServer";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import extractFirstImageFromPost from "src/helpers/extractFirstImageFromPost";
import { useRouter } from "next/router";

function ReadPost({ data }) {
  const firstImageUrl = extractFirstImageFromPost(data.content.blocks);
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
        {firstImageUrl && <meta property="og:image" content={firstImageUrl} />}

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@genteuniapp" />
        <meta name="twitter:creator" content="@genteuniapp" />
      </Head>
      <ReadPostPage post={data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const post = await getPostBySlugServerSide(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  //add view
  savePostView(post);

  //fix views number
  const postData = await post.toJSON();

  return {
    props: { data: postData },
  };
}

export default ReadPost;
