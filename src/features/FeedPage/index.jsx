import styles from "./index.module.css";
// import usePushNotifications from "../../hooks/usePushNotification";
// import { useNavigate } from "react-router-dom";

import Text from "@components/common/Text";

function HomePage() {
  // const askForPermissioToReceiveNotifications = usePushNotifications();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   askForPermissioToReceiveNotifications();
  // }, [askForPermissioToReceiveNotifications]);

  return (
    <div className={styles.container}>
      <Text text="Welcome" />
    </div>
  );
}

export default HomePage;
