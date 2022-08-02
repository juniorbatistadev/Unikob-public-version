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
import PenIcon from "@assets/icons/pen.svg";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";

function HomePage() {
  const { push } = useRouter();
  const { currentUser } = useContext(AuthContext);

  return (
    <FlexColumn>
      <FlexColumn>
        {currentUser && (
          <>
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
                onClick={async () => await push(CREATE_POST_PATH)}
                padding={10}
              >
                Escribir Post
                <PenIcon className={styles.penIcon} />
              </Button>
            </FlexRow>

            <TabsContent
              slug={"section"}
              tabs={{
                default: <RecentFeed />,
                following: <FollowingFeed />,
              }}
            />
          </>
        )}
      </FlexColumn>
      {!currentUser && (
        <FlexColumn margin={"20px 0px 0px 0px"}>
          <RecentFeed />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default HomePage;
