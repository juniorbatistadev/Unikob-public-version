import styles from "./index.module.css";
import Button from "@components/common/Button";
import { CREATE_POST_PATH, FEED_PATH } from "src/paths";
import { useRouter } from "next/router";
import TabsMenu from "@components/TabsMenu";
import TabsContent from "@components/TabsContent";
import FlexRow from "@components/common/FlexRow";
import FlexColumn from "@components/common/FlexColumn";
import RecentFeed from "./RecentFeed";
import FollowingFeed from "./FollowingFeed";

function HomePage() {
  const { push } = useRouter();

  return (
    <FlexColumn>
      <FlexRow margin={"20px 0px 10px 0px"} alignItems="center">
        <TabsMenu
          typeStyle="clear"
          path={FEED_PATH}
          slug="section"
          options={[
            { name: "Feed", query: {} },

            {
              link: "following",
              name: "Seguidos",
              query: { section: "following" },
            },
          ]}
        />

        <Button
          className={styles.createPostButton}
          onClick={() => push(CREATE_POST_PATH)}
        >
          Crear Post
        </Button>
      </FlexRow>

      <TabsContent
        slug={"section"}
        tabs={{
          default: <RecentFeed />,
          following: <FollowingFeed />,
        }}
      />
    </FlexColumn>
  );
}

export default HomePage;
