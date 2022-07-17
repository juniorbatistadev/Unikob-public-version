import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import FeedBox from "../FeedBox";
import DisplayUsername from "@components/common/DisplayUsername";
// import { ReactComponent as CorrectIcon } from "../../assets/icons/correct.svg";
// import { useNavigate, Link } from "react-router-dom";

function CrushFeedItem({ crush }) {
  //   const navigate = useNavigate();

  return (
    <FeedBox color={"rgb(210 143 143)"}>
      <FlexColumn padding={15}>
        {crush.attributes.isSecret ? (
          <FlexRow className={styles.title}>
            <FlexRow>
              <Avatar
                linkToUser={crush.attributes.toUser.attributes.username}
                className={styles.avatar}
                width="25px"
                image={crush.attributes.toUser?.attributes.profilePicture?.url()}
              />
              <DisplayUsername
                username={crush.attributes.toUser.attributes.username}
              />
              <Text
                text={" recibio un Crush secreto "}
                margin="0px 0px 0px 5px"
              />
            </FlexRow>
          </FlexRow>
        ) : (
          <FlexRow className={styles.title}>
            <FlexRow>
              <Avatar
                linkToUser={crush.attributes.createdBy?.attributes.username}
                className={styles.avatar}
                width="25px"
                image={crush.attributes.createdBy?.attributes.profilePicture?.url()}
              />
              <DisplayUsername
                className={styles.usernameText}
                username={crush.attributes.createdBy.attributes.username}
              />
            </FlexRow>
            <Text text={"tiene un crush en "} margin="0px 5px 0px 5px" />

            <FlexRow>
              <Avatar
                linkToUser={crush.attributes.toUser?.attributes.username}
                className={styles.avatar}
                width="25px"
                image={crush.attributes.toUser?.attributes.profilePicture?.url()}
              />
              <DisplayUsername
                className={styles.usernameText}
                username={crush.attributes.toUser.attributes.username}
              />
            </FlexRow>
          </FlexRow>
        )}
        <FlexRow alignItems="center">
          <Moment
            className={styles.date}
            //   format="MMMM DD, YYYY"
            fromNow
            locale="es"
            style={{ fontSize: "14px" }}
          >
            {crush.attributes.createdAt}
          </Moment>
        </FlexRow>
        <FlexRow>
          <Text text={crush.attributes.text} />
        </FlexRow>
      </FlexColumn>
    </FeedBox>
  );
}

export default CrushFeedItem;
