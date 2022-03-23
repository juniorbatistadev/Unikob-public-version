import A from "@components/common/A";
import { PROFILE_PATH } from "src/paths";
import { boolean } from "yup";
import styles from "./index.module.css";

export default function DisplayUsername({ username, className, link, type }) {
  const classNames = [styles[type], className].join(" ");

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

//SCHEMA
// {
//   link: boolean,
//   type: secondary, primary
// }

DisplayUsername.defaultProps = {
  link: true,
  type: "secondary",
};
