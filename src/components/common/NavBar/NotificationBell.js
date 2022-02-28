import { useEffect, useContext, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styles from "./NotificationBell.module.css";
import BellImg from "@assets/icons/notification.svg";
import BellWithCircleImg from "@assets/icons/notification-with-red-circle.svg";
import { getUnreadNumberOfNotifications } from "src/data/queryNotifications";
import Toast from "@components/common/Toast";
import { useRouter } from "next/router";
import { NOTIFICATIONS_PATH } from "src/paths";
import FlexColumn from "../FlexColumn";

function NotificationBell() {
  const { currentUser } = useContext(AuthContext);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const navigate = () => {};
  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { amount, subscrition } = await getUnreadNumberOfNotifications(
        currentUser
      );

      setNotificationNumber(amount);

      //receive new notifications
      subscrition.on("create", (notification) => {
        Toast.fire({
          title: notification.get("data"),
        });

        setNotificationNumber((prev) => prev + 1);
      });

      //if notification was read
      subscrition.on("leave", () => {
        setNotificationNumber((prev) => prev - 1);
      });
    };

    getData();
  }, [currentUser]);

  return (
    <FlexColumn
      onClick={() => {
        push(NOTIFICATIONS_PATH);
      }}
    >
      {notificationNumber > 0 ? (
        <BellWithCircleImg className={styles.bell} alt="Notifications" />
      ) : (
        <BellImg className={styles.bell} alt="Notifications" />
      )}
    </FlexColumn>
  );
}

export default NotificationBell;
