import styles from "./index.module.css";
import { withRouter } from "next/router";
import A from "@components/common/A";
import FlexRow from "@components/common/FlexRow";

const TabsMenu = ({ options, router, slug, path, typeStyle }) => {
  const { query } = router;

  return (
    <FlexRow className={styles[typeStyle]}>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={[
              styles.menuOption,
              query[slug] === option.link ? styles.menuOptionActive : " ",
            ].join(" ")}
          >
            <A href={{ pathname: path, query: option.query }}>{option.name}</A>
          </li>
        ))}
      </ul>
    </FlexRow>
  );
};

TabsMenu.defaultProps = {
  typeStyle: "default",
};

export default withRouter(TabsMenu);
