import defaultImage from "@assets/images/default-avatar.jpg";
import styles from "./index.module.css";
import { PROFILE_PATH } from "src/paths";
import A from "../A";
import FlexColumn from "../FlexColumn";

function Avatar({ image, width, linkToUser, ...props }) {
  const classNames = [styles.avatar, props.className].join(" ");

  return (
    <FlexColumn className={styles.container} {...props}>
      <A href={linkToUser && PROFILE_PATH.replace(":user", linkToUser)}>
        <img
          style={{
            width,
            height: width,
            cursor: linkToUser ? "pointer" : "auto",
          }}
          src={image ? image.src : defaultImage.src}
          className={classNames}
          alt="Profile Avatar"
        />
      </A>
    </FlexColumn>
  );
}

Avatar.defaultProps = {
  image: defaultImage,
  width: "45px",
  className: " ",
};

export default Avatar;
