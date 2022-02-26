import defaultImage from "@assets/images/default-avatar.jpg";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { PROFILE_PATH } from "src/paths";

function Avatar({ image, width, link, ...props }) {
  const classNames = [styles.avatar, props.className].join(" ");
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(`${PROFILE_PATH}`.replace(":username", link));
    }
  };

  return (
    <div className={styles.container} {...props}>
      <img
        style={{
          width,
          height: width,
          cursor: link ? "pointer" : "auto",
        }}
        src={image ? image.src : defaultImage.src}
        className={classNames}
        alt="Profile Avatar"
        onClick={handleClick}
      />
    </div>
  );
}

Avatar.defaultProps = {
  image: defaultImage,
  width: "45px",
  className: " ",
};

export default Avatar;
