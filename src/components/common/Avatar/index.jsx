import defaultImage from "@assets/images/default-avatar.jpg";
import styles from "./index.module.css";
import { PROFILE_PATH } from "src/paths";
import A from "../A";
import FlexColumn from "../FlexColumn";

function Avatar({ image, width, linkToUser, ...props }) {
  const classNames = [styles.avatar, props.className].join(" ");

  return (
    <FlexColumn
      className={styles.container}
      style={{ width, minHeight: width }}
      {...props}
    >
      <A
        href={linkToUser && PROFILE_PATH.replace(":user", linkToUser)}
        className={styles.link}
      >
        <img
          style={{
            width,
            height: width,
          }}
          src={image ? (image?.src ? image.src : image) : defaultImage.src}
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
