import NoDataSVG from "@assets/icons/no-data.svg";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import styles from "./index.module.css";
import { DISCOVER_PATH } from "src/paths";

export default function NoFoundPage() {
  return (
    <FlexColumn className={styles.container}>
      <FlexColumn alignItems="center">
        <NoDataSVG width={125} height={125} />
        <FlexColumn margin="0px 0px 0px 20px" alignItems="center">
          <Title text="Pagina No Encontrada" margin="10px 0px" />
          <FlexColumn margin="10px 0px">
            <Text text="Intenta explorando nuestra comunidad." />
            <Button as="a" href={DISCOVER_PATH}>
              Explora
            </Button>
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>
    </FlexColumn>
  );
}
