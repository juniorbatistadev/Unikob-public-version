import { useEffect, useContext, useState } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styles from "./NotificationBell.module.css";
import Bell from "@assets/icons/notification.svg";
import BellWithCircleImg from "@assets/icons/notification-with-circle.svg";
import { getUnreadNumberOfNotifications } from "src/data/queryNotifications";
import Toast from "@components/common/Toast";
import { useRouter } from "next/router";
import { NOTIFICATIONS_PATH } from "src/paths";
import FlexColumn from "@components/common/FlexColumn";
import getQuickToastText from "./getQuickToastText";
import FlexRow from "../FlexRow";

function NotificationBell() {
  const { currentUser } = useContext(AuthContext);
  const [notificationNumber, setNotificationNumber] = useState(0);
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
          title: getQuickToastText(notification.get("type")),
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Toast.stopTimer);
            toast.addEventListener("mouseleave", Toast.resumeTimer);
            toast.addEventListener("click", () => {
              push(NOTIFICATIONS_PATH);
            });
          },
        });

        setNotificationNumber((prev) => prev + 1);
      });

      //if notification was read
      subscrition.on("leave", () => {
        setNotificationNumber((prev) => prev - 1);
      });
    };

    getData();
  }, [currentUser, push]);

  return (
    <FlexColumn
      onClick={() => {
        push(NOTIFICATIONS_PATH);
      }}
      // justifyContent="center"
    >
      {notificationNumber > 0 ? (
        <BellWithCircleImg className={styles.bell} alt="Notifications" />
      ) : (
        <Bell
          className={styles.bell}
          alt="Notifications"
          fill="var(--color-gray-500)"
        />
      )}
    </FlexColumn>
  );
}

export default NotificationBell;
