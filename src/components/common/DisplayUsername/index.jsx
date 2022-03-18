import A from "@components/common/A";
import { PROFILE_PATH } from "src/paths";
import styles from "./index.module.css";

export default function DisplayUsername({ username, className, link }) {
  const classNames = [styles.usernameText, className].join(" ");

  const Wrapper = link
    ? ({ children }) => (
        <A href={PROFILE_PATH.replace(":user", username)}>{children} </A>
      )
    : ({ children }) => <>{children} </>;

  return (
    <Wrapper>
      <span className={classNames}>{`${username}`}</span>
    </Wrapper>
  );
}

DisplayUsername.defaultProps = {
  link: true,
};
