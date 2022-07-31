import A from "@components/common/A";
import { PROFILE_PATH } from "src/paths";
import styles from "./index.module.css";
import VerifiedIcon from "@assets/icons/verified.svg";

export default function DisplayUsername({ className, link, type, user }) {
  const classNames = [styles[type], className].join(" ");

  return (
    <A
      href={
        link ? PROFILE_PATH.replace(":user", user.attributes.username) : null
      }
    >
      <span className={classNames}>
        {`${user.attributes.username}`}
        {user.attributes.isVerified && (
          <VerifiedIcon
            width={15}
            height={15}
            fill={"var(--primary)"}
            style={{ marginLeft: 2 }}
          />
        )}
      </span>
    </A>
  );
}

DisplayUsername.defaultProps = {
  link: true,
  type: "primary",
};
