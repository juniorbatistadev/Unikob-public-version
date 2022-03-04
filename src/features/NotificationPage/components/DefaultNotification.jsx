import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import styles from "./index.module.css";
import Moment from "react-moment";
import "moment/locale/es";

const DefaultNotification = ({ notification }) => {
  return (
    <FlexRow className={styles.notification}>
      <Text text={notification.attributes?.data} />
      <Moment className={styles.date} fromNow locale="es">
        {notification.attributes.createdAt}
      </Moment>
    </FlexRow>
  );
};

export default DefaultNotification;
