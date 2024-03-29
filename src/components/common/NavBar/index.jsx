import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styles from "./index.module.css";
import NotificationBell from "./NotificationBell";
import MessagesBell from "./MessagesBell";
import SearchBar from "@components/SearchBar";
import Logo from "@assets/images/logo.png";
import Avatar from "@components/common/Avatar";
import MenuButton from "@components/common/MenuButton";
import { useRouter } from "next/router";
import useIsMounted from "src/hooks/useIsMounted";
import { CURRENT_USER_PROFILE_PATH, FEED_PATH } from "src/paths";
import FlexRow from "../FlexRow";
import LoginToAccess from "@components/LoginToAccess";
import A from "../A";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const { isMounted } = useIsMounted();

  return (
    <nav className={styles.container}>
      <div className={styles["left-side"]}>
        <MenuButton />
        <A href={FEED_PATH} className={styles.logoLink}>
          <div className={styles.logo}>
            <img src={Logo.src} alt="logo" width={42} height={42} />
            <span className={styles.logoTitle}>Unikob</span>
          </div>
        </A>
      </div>

      <div className={styles["search-bar-container"]}>
        <SearchBar />
      </div>
      {isMounted && (
        <div className={styles["right-side"]}>
          {currentUser ? (
            <FlexRow alignItems={"center"}>
              <NotificationBell />
              <MessagesBell />

              <Avatar
                width={35}
                onClick={() => router.push(CURRENT_USER_PROFILE_PATH)}
                className={styles.avatar}
                image={
                  currentUser.get("profilePicture") &&
                  currentUser.get("profilePicture").url()
                }
              />
            </FlexRow>
          ) : (
            <LoginToAccess text={"Inicia o Registrate"} />
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
