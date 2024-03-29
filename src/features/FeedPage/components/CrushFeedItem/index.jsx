import styles from "./index.module.css";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Text from "@components/common/Text";
import Avatar from "@components/common/Avatar";
import Moment from "react-moment";
import FeedBox from "../FeedBox";
import DisplayUsername from "@components/common/DisplayUsername";
import A from "@components/common/A";
import { CRUSH_READ_PATH } from "src/paths";
import { getCommentsNumberBySectionId } from "src/data/queryComments";
import { useEffect, useState } from "react";

function CrushFeedItem({ crush, displayAsHeader }) {
  const [comments, setComments] = useState(0);
  const [createdBy, setCreatedBy] = useState(null);
  const [toUser, setToUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (!crush) {
        return;
      }
      const createdBy = await crush.attributes.createdBy.fetch();
      const toUser = await crush.attributes.toUser.fetch();
      setCreatedBy(createdBy);
      setToUser(toUser);
    };

    getData().finally(() => setIsLoading(false));

    if (!displayAsHeader)
      getCommentsNumberBySectionId(crush?.id).then((data) => setComments(data));
  }, [crush]);

  return (
    <>
      {!isLoading && crush && (
        <FeedBox
          color={displayAsHeader ? null : "var(--color-red-800)"}
          text="✨ Nuevo Crush"
        >
          <FlexColumn padding={15}>
            {crush.attributes.isSecret ? (
              <FlexRow className={styles.title}>
                <FlexRow>
                  <Avatar
                    linkToUser={
                      toUser?.attributes.username ??
                      crush.attributes.toUser.attributes.username
                    }
                    className={styles.avatar}
                    width="25px"
                    image={
                      toUser?.attributes.profilePicture?.url() ??
                      crush.attributes.toUser?.attributes.profilePicture?.url()
                    }
                  />
                  <DisplayUsername user={toUser ?? crush.attributes.toUser} />
                  <Text
                    text={" recibio un crush secreto "}
                    margin="0px 0px 0px 5px"
                  />
                </FlexRow>
              </FlexRow>
            ) : (
              <FlexRow className={styles.title}>
                <FlexRow>
                  <Avatar
                    linkToUser={
                      createdBy?.attributes.username ??
                      crush.attributes.createdBy?.attributes.username
                    }
                    className={styles.avatar}
                    width="25px"
                    image={
                      createdBy?.attributes.profilePicture?.url() ??
                      crush.attributes.createdBy?.attributes.profilePicture?.url()
                    }
                  />
                  <DisplayUsername
                    className={styles.usernameText}
                    user={createdBy ?? crush.attributes.createdBy}
                  />
                </FlexRow>

                <Text text={"tiene un crush en "} margin="0px 5px 0px 5px" />

                <FlexRow>
                  <Avatar
                    linkToUser={crush.attributes.toUser?.attributes.username}
                    className={styles.avatar}
                    width="25px"
                    image={
                      toUser?.attributes.profilePicture?.url() ??
                      crush.attributes.toUser?.attributes.profilePicture?.url()
                    }
                  />
                  <DisplayUsername
                    type={"primary"}
                    className={styles.usernameText}
                    user={toUser ?? crush.attributes.toUser}
                  />
                </FlexRow>
              </FlexRow>
            )}
            <A href={CRUSH_READ_PATH.replace(":crush", crush.id)}>
              <FlexRow alignItems="center">
                <Moment
                  className={styles.date}
                  fromNow
                  locale="es"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {crush.attributes.createdAt}
                </Moment>
              </FlexRow>
              <FlexRow>
                <Text text={crush.attributes.text} />
              </FlexRow>
              {!displayAsHeader && (
                <FlexRow>
                  <span role="img" aria-label="comment">
                    {/* 📣 */}
                  </span>
                  <Text
                    margin={"10px 0px 0px 0px"}
                    text={
                      comments === 1
                        ? ` ${comments} comentario`
                        : ` ${comments} comentarios`
                    }
                    fontSize={"var(--text-sm)"}
                  />
                </FlexRow>
              )}
            </A>
          </FlexColumn>
        </FeedBox>
      )}
    </>
  );
}

CrushFeedItem.defaultProps = {
  displayAsHeader: false,
};

export default CrushFeedItem;
