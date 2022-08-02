import Head from "next/head";
import HomePage from "src/features/HomePage";
import EmptyLayout from "src/layouts/EmptyLayout";
import { SEARCH_PATH } from "src/paths";

function Home() {
  function addSearchJsonLd() {
    return {
      __html: ` {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "${process.env.NEXT_PUBLIC_APP_SITE_URL}",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "${process.env.NEXT_PUBLIC_APP_SITE_URL}${SEARCH_PATH}?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
  `,
    };
  }
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addSearchJsonLd()}
          key="search-jsonld"
        />
      </Head>
      <HomePage />
    </>
  );
}

Home.layout = EmptyLayout;

export default Home;
