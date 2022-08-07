import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import styles from "./index.module.css";
import Icon from "@assets/icons/logo.svg";

function UnderMaintenancePage() {
  return (
    <FlexColumn className={styles.container} padding={20}>
      <Icon />
      <Title text="¡Gracias por tu visita!" />
      <Text
        text="Vuelve el 12 agosto cuando todo este listo."
        className={styles.text}
      />
    </FlexColumn>
  );
}

export default UnderMaintenancePage;
