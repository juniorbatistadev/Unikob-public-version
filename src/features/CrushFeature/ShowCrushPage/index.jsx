import CommentSection from "@components/CommentsSection";
import { CRUSH_COMMENT } from "@components/CommentsSection/commentsType";
import FlexColumn from "@components/common/FlexColumn";
import Spinner from "@components/common/Spinner";
import CrushFeedItem from "@pages/FeedPage/components/CrushFeedItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCrushById } from "src/data/queryCrushes";
import { NO_FOUND_PATH } from "src/paths";

function ShowCrushPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [crush, setCrush] = useState();
  const { query, push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      const result = await getCrushById(query.id);

      setCrush(result);
    };

    getData()
      .catch(() => push(NO_FOUND_PATH))
      .finally(() => setIsLoading(false));
  }, [query.id]);

  return (
    <FlexColumn margin="10px">
      {isLoading && <Spinner />}
      {!isLoading && crush && (
        <FlexColumn>
          <CrushFeedItem crush={crush} displayComments={false} />
          <FlexColumn margin={"30px 0px 0px 0px"}>
            <CommentSection section={crush.id} type={CRUSH_COMMENT} />
          </FlexColumn>
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

export default ShowCrushPage;
