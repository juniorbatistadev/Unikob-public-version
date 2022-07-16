import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Parse from "parse";
import styles from "./index.module.css";
import Title from "@components/common/Title";
import SettingOption from "./components/SettingOption";
import ProfileIcon from "@assets/icons/profile.svg";
import CameraIcon from "@assets/icons/photograph.svg";
import PhotoIcon from "@assets/icons/photo.svg";
import SchoolIcon from "@assets/icons/school.svg";
import KeyIcon from "@assets/icons/key.svg";
import FacebookIcon from "@assets/icons/facebook-out-line.svg";
import LogoutIcon from "@assets/icons/logout.svg";
import BellIcon from "@assets/icons/bell.svg";
import { useRouter } from "next/router";
import {
  SETTINGS_COVER_PATH,
  SETTINGS_FACEBOOK_PATH,
  SETTINGS_NOTIFICATION_PATH,
  SETTINGS_PASSWORD_PATH,
  SETTINGS_PICTURE_PATH,
  SETTINGS_PROFILE_PATH,
  SETTINGS_SCHOOL_PATH,
} from "src/paths";

function SettingsMenu() {
  const { push } = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const logout = () => {
    Parse.User.logOut().then(async () => {
      await setCurrentUser(Parse.User.current());
      push("/");
    });
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title} text="Adjustes" />

      <Title
        className={styles["secondary-title"]}
        text="Informacion Basica"
        typeStyle="secondary"
      />
      <SettingOption
        title="Perfil"
        description="Tu informacion de perfil"
        Icon={ProfileIcon}
        onClick={() => {
          push(SETTINGS_PROFILE_PATH);
        }}
      />
      <SettingOption
        title="Foto de Perfil"
        description="Cambia tu foto de perfil"
        Icon={CameraIcon}
        onClick={() => {
          push(SETTINGS_PICTURE_PATH);
        }}
      />
      <SettingOption
        title="Cambiar Cover"
        description="Elegir imagen de tu cover"
        Icon={PhotoIcon}
        onClick={() => {
          push(SETTINGS_COVER_PATH);
        }}
      />
      <SettingOption
        title="Escuelas"
        description="Maneja tus escuelas"
        Icon={SchoolIcon}
        onClick={() => push(SETTINGS_SCHOOL_PATH)}
      />

      <Title
        className={styles["secondary-title"]}
        text="Tu Cuenta"
        typeStyle="secondary"
      />
      <SettingOption
        title="Contraseña"
        description="Cambia tu Contraseña"
        Icon={KeyIcon}
        onClick={() => {
          push(SETTINGS_PASSWORD_PATH);
        }}
      />
      <SettingOption
        title="Facebook Login"
        description="Administra Facebook Login"
        Icon={FacebookIcon}
        onClick={() => {
          push(SETTINGS_FACEBOOK_PATH);
        }}
      />
      <SettingOption
        title="Notificaciones"
        description="Configura las notificaciones de dispositivo"
        Icon={BellIcon}
        onClick={() => {
          push(SETTINGS_NOTIFICATION_PATH);
        }}
      />
      <SettingOption
        title="Cerrar Sesion"
        description="Cierra sesion en este dipositivo"
        Icon={LogoutIcon}
        onClick={logout}
      />
    </div>
  );
}

export default SettingsMenu;
