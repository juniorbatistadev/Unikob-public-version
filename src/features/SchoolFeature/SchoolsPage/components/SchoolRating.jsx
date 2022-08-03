// import RankingNumber from "@components/common/RankingNumber";
import FlexRow from "@components/common/FlexRow";
import Rater from "@components/formikFields/Rater";
import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import Text from "@components/common/Text";
import styles from "./SchoolRating.module.css";
import A from "@components/common/A";
import { SCHOOL_READ_PATH } from "src/paths";

const SchoolRating = ({ school, avg, number }) => {
  return (
    <FlexRow>
      {number && (
        <Text
          text={`${number}.`}
          margin={"3px 10px 0px 0px"}
          fontSize={"var(--text-xl)"}
          className={styles.rankingNumber}
        />
      )}
      <FlexColumn margin="0px 0px 20px 0px">
        <FlexRow alignItems={"center"}>
          <A href={SCHOOL_READ_PATH.replace(":school", school.attributes.slug)}>
            <Title text={school.attributes.name} />
          </A>
        </FlexRow>

        <Text
          fontSize="var(--text-base)"
          text={school.attributes.country.attributes.name}
        />
        {avg && (
          <FlexRow>
            <Rater disable={true} value={avg} size="20px" />
            <Text text={avg} />
          </FlexRow>
        )}
      </FlexColumn>
    </FlexRow>
  );
};

export default SchoolRating;
