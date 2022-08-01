import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import FeedBox from "../FeedBox";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { useEffect, useState } from "react";
import { SCHOOL_READ_PATH } from "src/paths";
import Rater from "@components/formikFields/Rater";

function SchoolReviewFeedItem({ schoolReview }) {
  const [createdBy, setCreatedBy] = useState(null);
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (!schoolReview) {
        return;
      }
      const createdBy = await schoolReview.attributes.createdBy.fetch();
      const school = await schoolReview.attributes.school.fetch();

      setCreatedBy(createdBy);
      setSchool(school);
    };

    getData().finally(() => setIsLoading(false));
  }, [schoolReview]);

  return (
    <>
      {!isLoading && schoolReview && (
        <FeedBox color={"var(--color-indigo-400)"}>
          <FlexColumn padding={15}>
            <FlexRow className={styles.title}>
              <FlexRow>
                <Avatar
                  linkToUser={
                    createdBy?.attributes.username ??
                    schoolReview.attributes.createdBy.attributes.username
                  }
                  className={styles.avatar}
                  width="25px"
                  image={
                    createdBy?.attributes.profilePicture?.url() ??
                    schoolReview.attributes.createdBy?.attributes.profilePicture?.url()
                  }
                />
                <DisplayUsername
                  type={"primary"}
                  user={createdBy ?? schoolReview.attributes.createdBy}
                />
                <Text text={" dejo un review"} margin="0px 0px 0px 5px" />
              </FlexRow>
            </FlexRow>

            <A
              href={SCHOOL_READ_PATH.replace(
                ":school",
                school.attributes.slug
              ).concat(`?section=reviews`)}
            >
              <FlexColumn margin={"5px 0px 10px 0px"}>
                <Rater
                  disable={true}
                  value={schoolReview.attributes.rating}
                  size={15}
                />

                <Text
                  text={schoolReview.attributes.description}
                  fontSize={"var(--text-lg)"}
                />
              </FlexColumn>
              <FlexRow alignItems="center">
                <Moment
                  className={styles.date}
                  fromNow
                  locale="es"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {schoolReview.attributes.createdAt}
                </Moment>
              </FlexRow>
            </A>
          </FlexColumn>
        </FeedBox>
      )}
    </>
  );
}

export default SchoolReviewFeedItem;
