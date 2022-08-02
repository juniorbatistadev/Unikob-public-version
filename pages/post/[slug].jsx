import ReadPostPage from "@pages/PostFeature/ReadPostPage";
import Head from "next/head";
import { savePostView } from "src/data/server/queryPostInfo";
import { getPostBySlugServerSide } from "src/data/server/queryPostsFromServer";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import extractFirstImageFromPost from "src/helpers/extractFirstImageFromPost";
import { useRouter } from "next/router";
import { PROFILE_PATH } from "src/paths";

function ReadPost({ data }) {
  const firstImageUrl = extractFirstImageFromPost(data.content.blocks);
  const { asPath } = useRouter();

  const defaultImage =
    "https://media.istockphoto.com/photos/young-woman-reading-the-news-on-a-modern-tablet-computer-while-in-picture-id1177502660?k=20&m=1177502660&s=612x612&w=0&h=ynHK8Q0kyZJ6xaAKBqtFBBzZw5pOkegYx3TLKIxEzKM=";

  function addPostJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Article",
      "headline": "${data.title}",
      ${firstImageUrl && `"image": "${firstImageUrl}",`}
      "datePublished": "${data.createdAt}",
      "dateModified": "${data.updatedAt}",
      "author": {
        "@type": "Person",
        "name": "${data.createdBy.username}",
        "url": "${process.env.NEXT_PUBLIC_APP_SITE_URL}${PROFILE_PATH.replace(
        ":user",
        data.createdBy.username
      )}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Unikob"
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
          content={`${process.env.NEXT_PUBLIC_APP_SITE_URL}${asPath}`}
        />
        {firstImageUrl && <meta property="og:image" content={firstImageUrl} />}

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@unikob_app" />
        <meta name="twitter:creator" content="@unikon_app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addPostJsonLd()}
          key="post-jsonld"
        />
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
