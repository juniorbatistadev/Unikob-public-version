import styles from "./index.module.css";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import FlexRow from "@components/common/FlexRow";
import { useRouter } from "next/router";
import Parse from "parse";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";

function WelcomeLoggedUser({ username }) {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const goToFeed = () => {
    router.push("/feed");
  };

  const logout = () => {
    Parse.User.logOut().then(async () => {
      await setCurrentUser(Parse.User.current());
    });
  };

  return (
    <section className={styles.containerLogged}>
      <Title
        text={`¡ Bienvenido de nuevo, @${username} !`}
        className={styles.title}
      />
      <FlexRow justifyContent="center">
        <Button width="170px" margin="0px 10px 0px 0px" onClick={goToFeed}>
          Ver feed
        </Button>
        <Button typeStyle="secondary" width="130px" onClick={logout}>
          Salir
        </Button>
      </FlexRow>
    </section>
  );
}

export default WelcomeLoggedUser;
