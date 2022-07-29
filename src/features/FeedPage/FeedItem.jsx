import FlexColumn from "@components/common/FlexColumn";
import Text from "@components/common/Text";
import { useEffect, useState } from "react";
import CrushFeedItem from "./components/CrushFeedItem";
import JobFeedItem from "./components/JobFeedItem";
import PostFeedItem from "./components/PostFeedItem";
import {
  CRUSH_FEED_ITEM,
  JOB_FEED_ITEM,
  POST_FEED_ITEM,
} from "./FeedItemTypes";
import styles from "./index.module.css";

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

      default:
        return <> </>;
    }
  };

  return <>{renderFeedItem(feedItem)}</>;
};

export default FeedItem;
