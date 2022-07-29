import FlexColumn from "@components/common/FlexColumn";
import CrushFeedItem from "./components/CrushFeedItem";
import JobFeedItem from "./components/JobFeedItem";
import NewTeacherFeedItem from "./components/NewTeacherFeedItem";
import PostFeedItem from "./components/PostFeedItem";
import SchoolReviewFeedItem from "./components/SchoolReviewFeedItem";
import TeacherReviewFeedItem from "./components/TeacherReviewFeedItem";
import {
  CRUSH_FEED_ITEM,
  JOB_FEED_ITEM,
  NEW_TEACHER_FEED_ITEM,
  POST_FEED_ITEM,
  SCHOOL_REVIEW_FEED_ITEM,
  TEACHER_REVIEW_FEED_ITEM,
} from "./FeedItemTypes";

const FeedItem = ({ feedItem }) => {
  const renderFeedItem = (feedItem) => {
    switch (feedItem.attributes.type) {
      case CRUSH_FEED_ITEM:
        return feedItem.attributes.crush ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <CrushFeedItem crush={feedItem.attributes.crush} />
          </FlexColumn>
        ) : (
          <></>
        );
      case POST_FEED_ITEM:
        return feedItem.attributes.post ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <PostFeedItem post={feedItem.attributes.post} />
          </FlexColumn>
        ) : (
          <></>
        );
      case JOB_FEED_ITEM:
        return feedItem.attributes.job ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <JobFeedItem job={feedItem.attributes.job} />
          </FlexColumn>
        ) : (
          <></>
        );

      case NEW_TEACHER_FEED_ITEM:
        return feedItem.attributes.teacher ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <NewTeacherFeedItem teacher={feedItem.attributes.teacher} />
          </FlexColumn>
        ) : (
          <></>
        );
      case SCHOOL_REVIEW_FEED_ITEM:
        return feedItem.attributes.schoolReview ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <SchoolReviewFeedItem
              schoolReview={feedItem.attributes.schoolReview}
            />
          </FlexColumn>
        ) : (
          <></>
        );
      case TEACHER_REVIEW_FEED_ITEM:
        return feedItem.attributes.teacherReview ? (
          <FlexColumn margin={"0px 0px 15px 0px"}>
            <TeacherReviewFeedItem
              teacherReview={feedItem.attributes.teacherReview}
            />
          </FlexColumn>
        ) : (
          <></>
        );

      default:
        return <> </>;
    }
  };

  return <>{renderFeedItem(feedItem)}</>;
};

export default FeedItem;
