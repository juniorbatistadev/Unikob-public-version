import FlexColumn from "@components/common/FlexColumn";
import { useEffect, useState } from "react";
import CrushFeedItem from "./components/CrushFeedItem";
import PostFeedItem from "./components/PostFeedItem";
import { CRUSH_FEED_ITEM, POST_FEED_ITEM } from "./FeedItemTypes";

const FetchItemData = ({ feedItem, Component, typeProp, itemsToFetch }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await feedItem.fetch();
      await itemsToFetch.forEach(async (item) => {
        await feedItem.get(item).fetch();
      });
      setData(data);
    };

    getData();
  }, []);

  const props = {
    [typeProp]: data,
  };

  // console.log(data?.attributes?.createdBy);

  return <>{data && <Component {...props} />}</>;
};

const FeedItem = ({ feedItem }) => {
  const renderFeedItem = (feedItem) => {
    switch (feedItem.attributes.type) {
      case CRUSH_FEED_ITEM:
        return <CrushFeedItem crush={feedItem.attributes.crush} />;
      case POST_FEED_ITEM:
        return <PostFeedItem post={feedItem.attributes.post} />;

      default:
        return <> </>;
    }
  };

  return <FlexColumn>{renderFeedItem(feedItem)}</FlexColumn>;
};

export default FeedItem;
