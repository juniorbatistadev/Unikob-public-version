import { useContext, useEffect } from "react";
import Title from "@components/common/Title";
import { AuthContext } from "src/contexts/AuthContext";
import FlexColumn from "@components/common/FlexColumn";
import { getUserNotificationsWithPagination } from "src/data/queryNotifications";
import useInfiniteScrolling from "@hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroll-component";
import Notification from "./Notification";
import Parse from "parse";
import EmptyIlustration from "@assets/icons/empty.svg";
import styles from "./index.module.css";
import Spinner from "@components/common/Spinner";

function NotificationPage() {
  const { currentUser } = useContext(AuthContext);
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getUserNotificationsWithPagination,
      perPage: 10,
      user: currentUser,
    }
  );

  useEffect(() => {
    Parse.Cloud.run("readAllNotifications", null);
  }, []);

  console.log(items);

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <Title text="Notificaciones" />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlexColumn margin={"20px 0px 0px 0px"}>
          <InfiniteScroll
            dataLength={items.length}
            next={nextPage}
            hasMore={startFrom < count}
          >
            {items.map((item) => (
              <Notification key={item.id} notification={item} />
            ))}
          </InfiniteScroll>
        </FlexColumn>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="No tienes notificaciones" fontSize="var(--text-base)" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default NotificationPage;
