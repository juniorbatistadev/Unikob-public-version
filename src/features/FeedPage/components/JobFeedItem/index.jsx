import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import extractTextFromPost from "src/helpers/extractTextFromPost";
import FeedBox from "../FeedBox";
import Title from "@components/common/Title";
import DisplayUsername from "@components/common/DisplayUsername";
import Tag from "@components/common/Tag";
// import { ReactComponent as AreaIcon } from "@assets/icons/area.svg";
import PinIcon from "@assets/icons/pin.svg";
import { useEffect, useState } from "react";
import A from "@components/common/A";
import { JOB_READ_PATH } from "src/paths";
// import { useNavigate } from "react-router-dom";

function JobFeedItem({ job }) {
  const [subjectsTags, setSubjectsTags] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const tags = await job.attributes.subjects.query().find();
      const country = await job.attributes.country.fetch();

      setSubjectsTags(tags);
      setCountry(country);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [job.attributes.subjects]);

  console.log(country);

  return (
    <FeedBox color={"rgb(210 187 143)"}>
      <FlexColumn className={styles.header}>
        <A href={JOB_READ_PATH.replace(":job", job.attributes.slug)}>
          <Title text={job.attributes.title} className={styles.title} />
        </A>
        <FlexRow alignItems="center">
          <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
            {job.attributes.createdAt}
          </Moment>
          <Text text="|" />
          <Avatar
            linkToUser={job.attributes.createdBy.attributes.username}
            className={styles.avatar}
            width="25px"
            image={job.attributes.createdBy?.attributes.profilePicture?.url()}
          />
          <FlexColumn margin={"0px 0px 0px 5px"}>
            <DisplayUsername
              link={true}
              type={"primary"}
              username={job.attributes.createdBy.attributes.username}
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow alignItems="center">
          <PinIcon width="12px" height="12px" />
          <Text text={country?.attributes.name} margin={"0px 0px 0px 5px"} />
        </FlexRow>
        <FlexRow alignItems="center" margin={"5px 0px 5px 0px"}>
          {subjectsTags.map((subject, index) => (
            <FlexRow margin="0px 5px 0px 0px" key={index}>
              <Tag key={subject.id} text={subject.attributes.name} />
            </FlexRow>
          ))}
        </FlexRow>
        <A href={JOB_READ_PATH.replace(":job", job.attributes.slug)}>
          <FlexRow>
            <Text
              text={extractTextFromPost(job.attributes.content.blocks, 160)}
            />
          </FlexRow>
        </A>
      </FlexColumn>
    </FeedBox>
  );
}

export default JobFeedItem;
