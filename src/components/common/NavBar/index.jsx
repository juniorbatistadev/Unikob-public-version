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
    <div className={styles.container}>
      <div className={styles["left-side"]}>
        <MenuButton />

        <A href={FEED_PATH}>
          <div className={styles.logo} alignItems="center">
            <img src={Logo.src} />
            <span className={styles.logoTitle}>Unikob</span>
          </div>
        </A>

        {/* <div style={{ display: "flex", alignItems: "center", marginLeft: 5 }}>
          <img src={Logo.src} width={20} height={20} />
          <span className={styles.logoTitle}>Unikob</span>
        </div> */}
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
            <LoginToAccess />
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
