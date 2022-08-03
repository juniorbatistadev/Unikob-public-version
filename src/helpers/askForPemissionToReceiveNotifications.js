import { getMessagingToken } from "initFirebase";
import { savePushToken } from "src/data/queryPushTokens";
import DeviceDetector from "device-detector-js";

export const askForPermissionToReceiveNotifications = async () => {
  await Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      const token = await getMessagingToken();

      const deviceDetector = new DeviceDetector();
      const device = deviceDetector.parse(navigator.userAgent);

      await savePushToken({
        token,
        device: `${device.os.name} ${device.device.type} ${device.client.type}`,
      });
    } else {
      throw "Permiso no otorgado, intenta usando la opción de adjustes de tu dispositivo.";
    }
  });
};
