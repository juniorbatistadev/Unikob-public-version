import React from "react";
import styles from "./SettingOption.module.css";
import ArrowIcon from "@assets/icons/next.svg";

function SettingOption({ Icon, title, description, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles["icon-container"]}>
        <Icon className={styles.icon} alt="Menu Option" />
      </div>
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <div className={styles["arrow-container"]}>
        <ArrowIcon className={styles["arrow-icon"]} width={15} height={15} />
      </div>
    </div>
  );
}

SettingOption.defaultProps = {
  icon: null,
  title: " ",
  description: " ",
  onClick: null,
};

export default SettingOption;
