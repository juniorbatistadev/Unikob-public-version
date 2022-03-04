import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";
import { CURRENT_USER_PROFILE_GIFTS_PATH } from "src/paths";
import A from "@components/common/A";

const GiftNotification = ({ notification }) => {
  return (
    <FlexRow alignItems="center" className={styles.notification}>
      <Avatar
        image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
        linkToUser={notification.attributes.triggeredBy.username}
      />
      <FlexColumn className={styles.content}>
        <FlexRow>
          <DisplayUsername
            className={styles.username}
            username={notification.attributes.triggeredBy.attributes.username}
          />

          <Text
            text={
              <>
                te envio un{" "}
                <A href={CURRENT_USER_PROFILE_GIFTS_PATH}>
                  <span className={styles.link}> regalo.</span>
                </A>
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

export default GiftNotification;
