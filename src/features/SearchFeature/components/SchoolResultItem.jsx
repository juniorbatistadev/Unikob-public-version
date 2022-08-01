import A from "@components/common/A";
import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import Title from "@components/common/Title";
import AddSchoolToProfileButton from "@pages/SchoolFeature/components/AddSchoolToProfileButton";
import { SCHOOL_READ_PATH } from "src/paths";
import styles from "./SchoolResultItem.module.css";

function SchoolResultItem({ school }) {
  return (
    <FlexColumn className={styles.container}>
      <A href={SCHOOL_READ_PATH.replace(":school", school.attributes.slug)}>
        <Title text={school.attributes.name} fontSize="var(--text-lg)" />
      </A>
      <Text text={school.attributes.country.attributes.name} />
      <Text text={school.attributes.website} />
      <AddSchoolToProfileButton school={school} />
    </FlexColumn>
  );
}

export default SchoolResultItem;
