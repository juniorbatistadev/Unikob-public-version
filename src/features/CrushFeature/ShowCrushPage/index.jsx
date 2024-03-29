import CommentSection from "@components/CommentsSection";
import { CRUSH_COMMENT } from "@components/CommentsSection/commentsType";
import Alert from "@components/common/Alert";
import Button from "@components/common/Button";
import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import Spinner from "@components/common/Spinner";
import { AuthContext } from "@context/AuthContext";
import CrushFeedItem from "@pages/FeedPage/components/CrushFeedItem";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { deleteCrush, getCrushById } from "src/data/queryCrushes";
import { CRUSHES_PATH, NO_FOUND_PATH } from "src/paths";
import { getUserRoles } from "src/data/queryRoles";
import ReportButton from "@components/ReportButton";

function ShowCrushPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [crush, setCrush] = useState();
  const { query, replace } = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (query.id !== undefined)
      getCrushById(query.id)
        .then((crush) => {
          setCrush(crush);
        })
        .catch((err) => {
          if (err?.code === 101) replace(NO_FOUND_PATH);
        })
        .finally(() => setIsLoading(false));
  }, [query.id]);

  const onDelete = async () => {
    const response = await Alert.fire({
      text: "¿Estas seguro que quieres borrar este crush?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await deleteCrush(crush.id).finally(() => replace(CRUSHES_PATH));
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
      currentUser?.id === crush?.attributes.createdBy.id ||
      userRoles.some((role) => ["admin", "moderator"].includes(role))
    );
  };

  return (
    <FlexColumn margin="10px">
      {isLoading && <Spinner />}
      {!isLoading && crush && (
        <FlexColumn>
          <CrushFeedItem crush={crush} displayAsHeader={true} />

          {canUserDelete() && (
            <FlexRow margin={"30px 0px"}>
              <Button typeStyle="secondary" onClick={onDelete}>
                Borrar
              </Button>
            </FlexRow>
          )}

          {currentUser && (
            <FlexRow margin={"20px 10px"}>
              <ReportButton
                content={`Crush: ${crush?.attributes.text} ${crush.id}`}
              />
            </FlexRow>
          )}

          <FlexColumn margin={"20px 0px 0px 0px"}>
            <CommentSection section={crush.id} type={CRUSH_COMMENT} />
          </FlexColumn>
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ShowCrushPage;
