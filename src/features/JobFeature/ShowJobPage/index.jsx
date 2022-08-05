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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import ApplyToJobSection from "./components/ApplyToJobSection";
import JobApplicationList from "./components/JobApplicationsList";
import Button from "@components/common/Button";
import Alert from "@components/common/Alert";
import { JOBS_PATH } from "src/paths";
import { deleteJob } from "src/data/queryJobs";
import { useRouter } from "next/router";
import SaveButton from "@components/SaveButton";
import { getUserRoles } from "src/data/queryRoles";
import ShareButtons from "@components/ShareButtons";
import useIsMounted from "@hooks/useIsMounted";

function ShowJobPage({ data }) {
  const { currentUser } = useContext(AuthContext);
  const { replace } = useRouter();
  const [userRoles, setUserRoles] = useState([]);
  const { isMounted } = useIsMounted();

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este trabajo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await deleteJob(data.objectId);
      await replace(JOBS_PATH);
    }
  };

  useEffect(() => {
    getUserRoles(currentUser).then((roles) => {
      const rolesNames = roles.map((role) => role.get("name"));
      setUserRoles(rolesNames);
    });
  }, [currentUser]);

  const canUserDelete = () => {
    return (
      currentUser?.id === data.createdBy.objectId ||
      userRoles.some((role) => ["admin", "moderator"].includes(role))
    );
  };

  return (
    <FlexColumn>
      <FlexColumn margin={"15px 0px 0px 0px"}>
        <FeedBox>
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
                <DisplayUsername user={{ attributes: data.createdBy }} />
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
      <FlexRow margin={"10px 0px 0px 10px"} gap={10}>
        {currentUser && (
          <SaveButton
            title={data.title}
            type="job"
            itemId={data.objectId}
            typeClass="Job"
          />
        )}
        {isMounted && (
          <ShareButtons
            title={data.title}
            text="Mire lo que encontré en Unikob "
          />
        )}

        {canUserDelete() && (
          <Button typeStyle="secondary" onClick={onDelete}>
            Borrar
          </Button>
        )}
      </FlexRow>

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
