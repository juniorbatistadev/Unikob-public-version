import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Text from "@components/common/Text";
import FlexColumn from "@components/common/FlexColumn";
import Alert from "@components/common/Alert";

import ManageNotificationsForm from "./ManageNotificationsForm";

// import usePushNotifications from "@hooks/usePushNotification";

function NotificationSettings() {
  // const askForPermissioToReceiveNotifications = usePushNotifications();

  const askForPermissioToReceiveNotifications = async () => {};

  const handleClick = () => {
    askForPermissioToReceiveNotifications()
      .then(() => {
        Alert.fire({
          icon: "success",
          text: "Dipostivio Registrado",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Alert.fire({
          icon: "error",
          text: `${error}`,
        });
      });
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Notificaciones" className={styles.title} />
      </FlexRow>

      <FlexColumn margin="10px">
        <Title
          typeStyle="secondary"
          text="Notificar cuando:"
          margin="0px 0px 10px 0px"
        />
        <ManageNotificationsForm />

        <Title
          typeStyle="secondary"
          text="Dispositivos"
          margin="10px 0px 10px 0px"
        />

        {/* <Text text="Las notificaciones se activan en el ultimo dispostivos que hizo login." />
        <Text text="Para activarlas en este dispositivo presiona 'Activar en este dispositivo'  " />

        <Button onClick={handleClick}>Activar en este dispositivo</Button> */}
      </FlexColumn>
    </motion.div>
  );
}

export default NotificationSettings;
