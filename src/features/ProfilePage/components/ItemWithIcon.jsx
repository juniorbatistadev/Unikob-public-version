import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import styles from "./IteamWithIcon.module.css";

function ItemWithIcon({ IconSVG, text, className = " ", ...props }) {
  const classNames = [styles.infoBox, className].join(" ");

  return (
    <FlexRow className={classNames} {...props} alignItems="center">
      <IconSVG className={styles.icon} />
      <Text text={text} />
    </FlexRow>
  );
}

export default ItemWithIcon;
