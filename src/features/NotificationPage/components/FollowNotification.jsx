import FlexRow from "@components/common/FlexRow";
import Avatar from "@components/common/Avatar";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import DisplayUsername from "@components/common/DisplayUsername";

const FollowNotification = ({ notification }) => {
  return (
    <FlexRow alignItems="center" className={styles.notification}>
      <Avatar
        image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
        linkToUser={notification.attributes.triggeredBy.username}
      />
      <FlexColumn className={styles.content}>
        <FlexRow>
          <DisplayUsername
            type={"primary"}
            className={styles.username}
            username={notification.attributes.triggeredBy.attributes.username}
          />

          <Text text="te empezo a seguir" />
        </FlexRow>
        <Moment className={styles.date} fromNow locale="es">
          {notification.attributes.createdAt}
        </Moment>
      </FlexColumn>
    </FlexRow>
  );
};

export default FollowNotification;
