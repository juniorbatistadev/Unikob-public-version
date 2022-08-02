import Head from "next/head";
import FeedPage from "src/features/FeedPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Feed - Unikob</title>
      </Head>
      <FeedPage />
    </>
  );
}
