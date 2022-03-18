import styles from "./index.module.css";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { CREATE_POST_PATH } from "src/paths";
import { useRouter } from "next/router";

function HomePage() {
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <Text text="Welcome" />

      <Button onClick={() => push(CREATE_POST_PATH)}>Crear Post</Button>
    </div>
  );
}

export default HomePage;
