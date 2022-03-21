import React from "react";
import styles from "./HeaderSchool.module.css";
import bg from "@assets/images/classroom.jpg";

const HeaderSchool = ({ text, image }) => {
  return (
    <div
      className={styles.container}
      style={{
        background: ` linear-gradient(0deg, rgb(0 0 0 / 70%), rgb(28 33 72 / 70%)), url( ${image}) , url(${bg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <p className={styles.text}>{text}</p>
      <p>🧑🏻‍🤝‍🧑🏻201 ⭐4.3 (12)</p>
    </div>
  );
};

export default HeaderSchool;
