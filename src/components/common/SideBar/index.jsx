import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Avatar from "@components/common/Avatar";
import SearchBar from "@components/SearchBar";
import useIsMounted from "src/hooks/useIsMounted";

import ArrowIcon from "@assets/icons/arrow.svg";
import HomeIcon from "@assets/icons/home-run.svg";
import ChatIcon from "@assets/icons/comment.svg";
import RocketIcon from "@assets/icons/start-button.svg";
import SchoolIcon from "@assets/icons/school.svg";
import QuestionIcon from "@assets/icons/question.svg";
import LoveIcon from "@assets/icons/love.svg";
import WorkIcon from "@assets/icons/work.svg";
import SettingsIcon from "@assets/icons/settings.svg";

import styles from "./index.module.css";
import { useRouter } from "next/router";
import {
  CHAT_PATH,
  CRUSHS_PATH,
  FEED_PATH,
  JOBS_PATH,
  SCHOOLS_PATH,
  SETTINGS_PATH,
} from "src/paths";

function SideBar({ setMenuOpen, className, ...props }) {
  const { currentUser } = useContext(AuthContext);
  const { push } = useRouter();

  const { isMounted } = useIsMounted();

  const goTo = (link) => {
    push(link);
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={className}>
      <ArrowIcon
        className={styles["close-button"]}
        alt="close"
        onClick={() => {
          setMenuOpen(false);
        }}
      />

      {isMounted && currentUser && (
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
      <SearchBar className={styles.searchbar} />

      <ul className={styles.menu}>
        <li
          onClick={() => {
            goTo(FEED_PATH);
          }}
        >
          <HomeIcon alt="option" className={styles["menu-icon"]} />
          <span>Feed</span>
        </li>
        <li>
          <RocketIcon alt="option" className={styles["menu-icon"]} />
          <span>Descubre</span>
        </li>
        <li
          onClick={() => {
            goTo(CHAT_PATH);
          }}
        >
          <ChatIcon alt="option" className={styles["menu-icon"]} />
          <span>Chat Global</span>
        </li>

        <li
          onClick={() => {
            goTo(SCHOOLS_PATH);
          }}
        >
          <SchoolIcon alt="option" className={styles["menu-icon"]} />
          <span>Escuelas</span>
        </li>
        <li
          onClick={() => {
            goTo(QUESTIONS_PATH);
          }}
        >
          <QuestionIcon alt="option" className={styles["menu-icon"]} />
          <span>Pregunta</span>
        </li>
        <li
          onClick={() => {
            goTo(CRUSHS_PATH);
          }}
        >
          <LoveIcon alt="option" className={styles["menu-icon"]} />

          <span>UniCrush</span>
        </li>
        <li
          onClick={() => {
            goTo(JOBS_PATH);
          }}
        >
          <WorkIcon alt="option" className={styles["menu-icon"]} />

          <span>Trabajos</span>
        </li>
      </ul>

      <div className={styles.footer}>
        <div
          className={styles["settingsOption"]}
          onClick={() => {
            goTo(SETTINGS_PATH);
          }}
        >
          <SettingsIcon alt="option" className={styles["menu-icon"]} />
          <span>Adjustes</span>
        </div>
        <span>Contactanos!</span>
      </div>
    </nav>
  );
}

SideBar.defaultProps = {
  className: styles.container,
};

export default SideBar;
