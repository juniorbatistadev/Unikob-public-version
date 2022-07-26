import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { CURRENT_USER_PROFILE_COMMENTS_PATH } from "src/paths";
import { useEffect, useState } from "react";
import getCommentSectionLink from "src/helpers/getCommentSectionLink";

const ResponseCommentNotification = ({ notification }) => {
  const [link, setLink] = useState();

  useEffect(() => {
    const getLink = async () => {
      const data = await getCommentSectionLink(
        notification.attributes.commentSection
      );
      setLink(data);
    };

    getLink();
  }, []);

  return (
    <FlexRow alignItems="center" className={styles.notification}>
      <Avatar
        image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
        linkToUser={notification.attributes.triggeredBy.username}
      />
      <FlexColumn className={styles.content}>
        <FlexRow>
          <Text
            text={
              <>
                <DisplayUsername
                  type={"primary"}
                  className={styles.username}
                  username={
                    notification.attributes.triggeredBy.attributes.username
                  }
                />
                respondio tu comentario
                {link && (
                  <A href={link}>
                    <span className={styles.link}> comentario: </span>
                  </A>
                )}
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
  );
};

export default ResponseCommentNotification;
