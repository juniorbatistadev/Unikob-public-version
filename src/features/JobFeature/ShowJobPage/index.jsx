import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import FeedBox from "@pages/FeedPage/components/FeedBox";
import JobFeedItem from "@pages/FeedPage/components/JobFeedItem";
import styles from "./index.module.css";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import DisplayUsername from "@components/common/DisplayUsername";
import Tag from "@components/common/Tag";
import PinIcon from "@assets/icons/pin.svg";
import RenderHTML from "@components/RenderHTML";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import ApplyToJobSection from "./components/ApplyToJobSection";
import JobApplicationList from "./components/JobApplicationsList";

function ShowJobPage({ data }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <FlexColumn>
      <FeedBox color={"rgb(210 187 143)"}>
        <FlexColumn className={styles.header} padding={15}>
          <Title text={data.title} className={styles.title} />

          <FlexRow alignItems="center">
            <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
              {data.createdAt}
            </Moment>
            <Text text="|" />
            <Avatar
              linkToUser={data.createdBy.username}
              className={styles.avatar}
              width="25px"
              image={data.createdBy?.profilePicture?.url}
            />
            <FlexColumn margin={"0px 0px 0px 5px"}>
              <DisplayUsername
                link={true}
                type={"primary"}
                username={data.createdBy.username}
              />
            </FlexColumn>
          </FlexRow>
          <FlexRow alignItems="center">
            <PinIcon width="12px" height="12px" />
            <Text text={data.country.name} margin={"0px 0px 0px 5px"} />
          </FlexRow>
          <FlexRow alignItems="center" margin={"5px 0px 5px 0px"}>
            {data.tags.map((subject, index) => (
              <FlexRow margin="0px 5px 0px 0px" key={index}>
                <Tag text={subject} />
              </FlexRow>
            ))}
          </FlexRow>
        </FlexColumn>
      </FeedBox>
      <FlexColumn className={styles.content}>
        <RenderHTML json={data.content} />
      </FlexColumn>
      <FlexColumn margin={"10px 0px 0px 0px"}>
        {currentUser?.id === data.createdBy.objectId ? (
          <JobApplicationList jobId={data.objectId} />
        ) : (
          currentUser && <ApplyToJobSection job={data} />
        )}
      </FlexColumn>
    </FlexColumn>
  );
}

export default ShowJobPage;
