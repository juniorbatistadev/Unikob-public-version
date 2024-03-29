import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { READ_POST_PATH } from "src/paths";

const PostCommentNotification = ({ notification }) => {
  return (
    <>
      {notification.attributes.post && (
        <FlexRow alignItems="center" className={styles.notification}>
          <Avatar
            image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
            linkToUser={notification.attributes.triggeredBy.username}
          />
          <FlexColumn className={styles.content}>
            <FlexRow className={styles.info}>
              <Text
                text={
                  <>
                    <DisplayUsername
                      type={"primary"}
                      className={styles.username}
                      user={notification.attributes.triggeredBy}
                    />
                    dejo un comentario en tu{" "}
                    <A
                      href={READ_POST_PATH.replace(
                        ":slug",
                        notification.attributes.post.attributes.slug
                      )}
                    >
                      <span className={styles.link}> post:</span>
                    </A>{" "}
                    {`${notification.attributes.data}`}
                  </>
                }
              />
            </FlexRow>
            <Moment className={styles.date} fromNow locale="es">
              {notification.attributes.createdAt}
            </Moment>
          </FlexColumn>
        </FlexRow>
      )}
    </>
  );
};

export default PostCommentNotification;
