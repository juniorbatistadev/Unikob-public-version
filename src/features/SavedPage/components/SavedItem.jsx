import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import styles from "./SavedItem.module.css";
import Moment from "react-moment";
import "moment/locale/es";
import { JOB_READ_PATH, READ_POST_PATH } from "src/paths";
import A from "@components/common/A";

function SavedItem({ item }) {
  const getHref = () => {
    if (item.attributes.type === "post") {
      return READ_POST_PATH.replace(
        ":slug",
        item.attributes.post.attributes.slug
      );
    }

    if (item.attributes.type === "job") {
      return JOB_READ_PATH.replace(":job", item.attributes.job.attributes.slug);
    }
  };

  return (
    <FlexColumn className={styles.container}>
      <A href={getHref()}>
        <Title text={item.attributes.title} fontSize={18} />
      </A>

      <Moment className={styles.date} fromNow locale="es">
        {item.attributes.createdAt}
      </Moment>
    </FlexColumn>
  );
}

export default SavedItem;
