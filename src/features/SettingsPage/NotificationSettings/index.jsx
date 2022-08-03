import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import Button from "@components/common/Button";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import FlexColumn from "@components/common/FlexColumn";
import Alert from "@components/common/Alert";
import ManageNotificationsForm from "./ManageNotificationsForm";
import { useEffect, useState } from "react";
import PushIllustration from "@assets/icons/push-notification.svg";
import { askForPermissionToReceiveNotifications } from "src/helpers/askForPemissionToReceiveNotifications";

function NotificationSettings() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState();

  useEffect(() => {
    setIsNotificationEnabled(Notification.permission === "granted");
  }, []);

  // const askForPermissioToReceiveNotifications = async () => {
  //   await Notification.requestPermission().then(async (permission) => {
  //     if (permission === "granted") {
  //       const token = await getMessagingToken();

  //       const deviceDetector = new DeviceDetector();
  //       const device = deviceDetector.parse(navigator.userAgent);

  //       await savePushToken({
  //         token,
  //         device: `${device.os.name} ${device.device.type} ${device.client.type}`,
  //       });
  //     } else {
  //       throw "Permiso no otorgado, por favor intente nuevamente";
  //     }
  //   });
  // };

  const handleClick = () => {
    askForPermissionToReceiveNotifications()
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

      {!isNotificationEnabled && (
        <FlexColumn margin="0px 10px 20px 10px">
          <Title
            typeStyle="secondary"
            text="Activas las notificaciones en este dispositivo para que no pierdas ninguna."
            margin="10px 0px 10px 0px"
          />
          <PushIllustration
            width={"80%"}
            height={"100%"}
            style={{ margin: "30px auto 40px auto" }}
          />
          <Button onClick={handleClick}>Recibir Notificaciones</Button>
        </FlexColumn>
      )}

      <FlexColumn margin="10px">
        <Title
          typeStyle="secondary"
          text="Notificar cuando:"
          margin="0px 0px 10px 0px"
        />
        <ManageNotificationsForm />

        {/* <Text text="Las notificaciones se activan en el ultimo dispostivos que hizo login." />
        <Text text="Para activarlas en este dispositivo presiona 'Activar en este dispositivo'  " /> */}
      </FlexColumn>
    </motion.div>
  );
}

export default NotificationSettings;
