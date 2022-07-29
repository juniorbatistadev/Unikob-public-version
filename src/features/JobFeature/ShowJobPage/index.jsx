import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import FeedBox from "@pages/FeedPage/components/FeedBox";
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
import Button from "@components/common/Button";
import Alert from "@components/common/Alert";
import { JOBS_PATH } from "src/paths";
import { deleteJob } from "src/data/queryJobs";
import { useRouter } from "next/router";

function ShowJobPage({ data }) {
  const { currentUser } = useContext(AuthContext);
  const { replace } = useRouter();

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este trabajo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await replace(JOBS_PATH);
      await deleteJob(data.objectId);
    }
  };

  return (
    <FlexColumn>
      <FlexColumn margin={"15px 0px 0px 0px"}>
        <FeedBox color={"rgb(210 187 143)"}>
          <FlexColumn className={styles.header} padding={15}>
            <Title text={data.title} className={styles.title} />

            <FlexRow alignItems="center">
              <Moment
                className={styles.date}
                format="MMMM DD, YYYY"
                locale="es"
              >
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
      </FlexColumn>
      <FlexColumn className={styles.content}>
        <RenderHTML json={data.content} />
      </FlexColumn>

      {currentUser && currentUser.id === data.createdBy.objectId && (
        <FlexRow margin={"10px"}>
          <Button typeStyle="secondary" onClick={onDelete}>
            Borrar
          </Button>
        </FlexRow>
      )}
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
