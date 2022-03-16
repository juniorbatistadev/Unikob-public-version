import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styles from "./index.module.css";
import NotificationBell from "./NotificationBell";
import MessagesBell from "./MessagesBell";
import SearchBar from "@components/SearchBar";
// import Logo from "../Logo";
import Avatar from "@components/common/Avatar";
import MenuButton from "@components/common/MenuButton";
import { useRouter } from "next/router";
import useIsMounted from "src/hooks/useIsMounted";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const { isMounted } = useIsMounted();

  return (
    <div className={styles.container}>
      <div className={styles["left-side"]}>
        {/* <Logo className={styles.logo} /> */}
        <MenuButton />
      </div>

      <div className={styles["search-bar-container"]}>
        <SearchBar />
      </div>

      <div className={styles["right-side"]}>
        {isMounted && currentUser ? (
          <>
            <NotificationBell />
            <MessagesBell />

            <Avatar
              onClick={() => router.push("/me")}
              className={styles.avatar}
              image={
                currentUser.get("profilePicture") &&
                currentUser.get("profilePicture").url()
              }
            />
          </>
        ) : (
          <span>Inicia Sesion!</span>
        )}
      </div>
    </div>
  );
}

export default NavBar;
