import styles from "./index.module.css";
import Button from "@components/common/Button";
import Title from "@components/common/Title";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import { useRouter } from "next/router";

function WelcomeLoggedUser({ username }) {
  const router = useRouter();

  const goToFeed = () => {
    router.push("/feed");
  };

  return (
    <FlexColumn className={styles.container} alignItems="center">
      <Title text={`¡ Bienvenido, ${username} !`} />
      <FlexRow justifyContent="center">
        <Button width="170px" margin="0px 10px 0px 0px" onClick={goToFeed}>
          Ver feed
        </Button>
        <Button typeStyle="secondary" width="130px">
          Salir
        </Button>
      </FlexRow>
    </FlexColumn>
  );
}

export default WelcomeLoggedUser;
