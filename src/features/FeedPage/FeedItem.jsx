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
        return <CrushFeedItem crush={feedItem.attributes.crush} />;
      case POST_FEED_ITEM:
        return <PostFeedItem post={feedItem.attributes.post} />;
      case JOB_FEED_ITEM:
        return <JobFeedItem job={feedItem.attributes.job} />;

      default:
        return <> </>;
    }
  };

  return <FlexColumn>{renderFeedItem(feedItem)}</FlexColumn>;
};

export default FeedItem;
