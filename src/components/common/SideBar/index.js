import React, { useContext } from "react";
import styles from "./index.module.css";
import { AuthContext } from "src/contexts/AuthContext";
import Avatar from "../Avatar";
import arrowIcon from "@assets/icons/arrow.svg";
import homeIcon from "@assets/icons/home-run.svg";
import chatIcon from "@assets/icons/comment.svg";
import rocketIcon from "@assets/icons/start-button.svg";
import schoolIcon from "@assets/icons/school.svg";
import questionIcon from "@assets/icons/question.svg";
import loveIcon from "@assets/icons/love.svg";
import workIcon from "@assets/icons/work.svg";
import settingsIcon from "@assets/icons/settings.svg";
// import SearchBar from "../SearchBar";

function SideBar({ setMenuOpen, className, ...props }) {
  const { currentUser } = useContext(AuthContext);

  const goTo = (link) => {
    // navigate(link);
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={className}>
      <img
        src={arrowIcon.src}
        className={styles["close-button"]}
        alt="close"
        onClick={() => {
          setMenuOpen(false);
        }}
      />

      {currentUser && (
        <>
          <Avatar
            width="100px"
            className={styles.avatar}
            image={
              currentUser.get("profilePicture") &&
              currentUser.get("profilePicture").url()
            }
          />
          <span className={styles.username}>
            @{currentUser.attributes.username}
          </span>
        </>
      )}
      {/* <SearchBar className={styles.searchbar} /> */}

      <ul className={styles.menu}>
        <li
          onClick={() => {
            goTo("/app");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={homeIcon.src}
          />
          <span>Feed</span>
        </li>
        <li>
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={rocketIcon.src}
          />
          <span>Descubre</span>
        </li>
        <li>
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={chatIcon.src}
          />
          <span>Chat Global</span>
        </li>

        <li
          onClick={() => {
            goTo("/app/schools");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={schoolIcon.src}
          />
          <span>Escuelas</span>
        </li>
        <li
          onClick={() => {
            goTo("/app/question/");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={questionIcon.src}
          />
          <span>Pregunta</span>
        </li>
        <li
          onClick={() => {
            goTo("/app/unicrush/");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={loveIcon.src}
          />
          <span>UniCrush</span>
        </li>
        <li
          onClick={() => {
            goTo("/app/job/");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={workIcon.src}
          />
          <span>Trabajos</span>
        </li>
      </ul>

      <div className={styles.footer}>
        <div
          className={styles["settingsOption"]}
          onClick={() => {
            goTo("/app/settings");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={settingsIcon.src}
          />
          <span>Adjustes</span>
        </div>
        <span>Contactanos!</span>
      </div>
    </div>
  );
}

SideBar.defaultProps = {
  className: styles.container,
};

export default SideBar;
