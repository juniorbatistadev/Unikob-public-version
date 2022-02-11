import styles from "./index.module.css";
import { withRouter } from "next/router";
import A from "@components/common/A";
import FlexRow from "@components/common/FlexRow";

const TabsMenu = ({ options, router, slug, path }) => {
  const { query } = router;

  return (
    <FlexRow className={styles.menu}>
      <ul>
        {options.map((option, index) => (
          <A key={index} href={{ pathname: path, query: option.query }}>
            <li
              className={[
                styles.menuOption,
                query[slug] === option.link ? styles.menuOptionActive : " ",
              ].join(" ")}
            >
              {option.name}
            </li>
          </A>
        ))}
      </ul>
    </FlexRow>
  );
};

export default withRouter(TabsMenu);
