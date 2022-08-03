import logo from "@assets/images/logo.png";
import styles from "./index.module.css";
import CommunityIcon from "@assets/icons/community.svg";
import FlexRow from "@components/common/FlexRow";

function InfoHero() {
  return (
    <div className={styles.container}>
      <FlexRow alignItems={"center"}>
        <img
          src={logo.src}
          alt="Logo"
          className={styles.logo}
          width={42}
          height={42}
        />
        <span className={styles.logoText}>Unikob</span>
      </FlexRow>

      <CommunityIcon className={styles.illustration} />
      <p className={styles.paragraph}>
        La comunidad de universitarios,
        <br />
        egresados y estudiantes mas
        <br />
        completa del internet.
      </p>
      {/* <div className={styles["btns-container"]}>
        <Button
          as={"a"}
          className={styles.call_to_action}
          typeStyle="transparent"
          width="200px"
          padding="15px"
          href={"/a"}
        >
          Leer Mas
        </Button>
      </div> */}
    </div>
  );
}

export default InfoHero;
