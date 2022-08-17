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
import LoveIcon from "@assets/icons/love.svg";
import WorkIcon from "@assets/icons/work.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import BookMarkIcon from "@assets/icons/bookmark.svg";
import SupportIcon from "@assets/icons/support.svg";

import styles from "./index.module.css";
import { useRouter } from "next/router";
import {
  CHAT_PATH,
  FEED_PATH,
  JOBS_PATH,
  SCHOOLS_PATH,
  SETTINGS_PATH,
  CRUSHES_PATH,
  SAVED_PATH,
  DISCOVER_PATH,
  CURRENT_USER_PROFILE_PATH,
  CONTACT_PATH,
} from "src/paths";
import DisplayUsername from "../DisplayUsername";
import FlexRow from "../FlexRow";
import FlexColumn from "../FlexColumn";

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
    <aside className={className}>
      <FlexColumn className={styles.content}>
        <FlexColumn className={styles["close-button"]}>
          <ArrowIcon
            alt="close"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        </FlexColumn>

        {isMounted && currentUser && (
          <FlexRow
            className={styles.avatar}
            onClick={() => goTo(CURRENT_USER_PROFILE_PATH)}
          >
            <Avatar
              width="35px"
              image={
                currentUser.get("profilePicture") &&
                currentUser.get("profilePicture").url()
              }
            />
            <FlexRow margin={"0px 0px 0px 10px"}>
              <span className={styles.ad}>@</span>
              <DisplayUsername
                user={currentUser}
                fontSize={"var(--text-xl)"}
                link={false}
              />
            </FlexRow>
          </FlexRow>
        )}
        <SearchBar
          className={styles.searchbar}
          callBack={() => setMenuOpen(false)}
        />

        <ul className={styles.menu}>
          <li
            onClick={() => {
              goTo(FEED_PATH);
            }}
          >
            <HomeIcon alt="option" className={styles["menu-icon"]} />
            <span>Feed</span>
          </li>
          <li
            onClick={() => {
              goTo(DISCOVER_PATH);
            }}
          >
            <RocketIcon alt="option" className={styles["menu-icon"]} />
            <span>Descubre</span>
          </li>
          {isMounted && currentUser && (
            <li
              onClick={() => {
                goTo(SAVED_PATH);
              }}
            >
              <BookMarkIcon alt="option" className={styles["menu-icon"]} />
              <span>Guardados</span>
            </li>
          )}

          {isMounted && currentUser && (
            <li
              onClick={() => {
                goTo(CHAT_PATH);
              }}
            >
              <ChatIcon alt="option" className={styles["menu-icon"]} />
              <span>Chat Global</span>
            </li>
          )}

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
              goTo(CRUSHES_PATH);
            }}
          >
            <LoveIcon alt="option" className={styles["menu-icon"]} />

            <span>Crushes</span>
          </li>
          <li
            onClick={() => {
              goTo(JOBS_PATH);
            }}
          >
            <WorkIcon alt="option" className={styles["menu-icon"]} />

            <span>Trabajos</span>
          </li>
          {isMounted && currentUser && (
            <li
              onClick={() => {
                goTo(SETTINGS_PATH);
              }}
            >
              <SettingsIcon alt="option" className={styles["menu-icon"]} />

              <span>Ajustes</span>
            </li>
          )}
          <li
            onClick={() => {
              goTo(CONTACT_PATH);
            }}
          >
            <SupportIcon alt="option" className={styles["menu-icon"]} />
            <span>Contactanos</span>
          </li>
        </ul>

        <div className={styles.footer}></div>
      </FlexColumn>
    </aside>
  );
}

SideBar.defaultProps = {
  className: styles.container,
};

export default SideBar;
