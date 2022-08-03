import {
  CRUSH_FEED_ITEM,
  JOB_FEED_ITEM,
  POST_FEED_ITEM,
} from "@pages/FeedPage/FeedItemTypes";
import Parse from "parse";
import { getUsersFollowing } from "./queryFollows";

const Feed = Parse.Object.extend("Feed");
const query = new Parse.Query(Feed);

export const getFeedItemsWithPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Feed);

  query.containedIn("type", [POST_FEED_ITEM, JOB_FEED_ITEM, CRUSH_FEED_ITEM]);
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.includeAll();
  query.withCount();

  const result = await query.find();

  return result;
};

export const getFollowingFeedItemsWithPagination = async ({
  startFrom,
  perPage,
  user,
}) => {
  const follows = await getUsersFollowing(user);
  const followingUsers = follows.map((follow) => follow.get("toUser"));

  const query = new Parse.Query(Feed);

  query.containedIn("createdBy", followingUsers);

  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.includeAll();
  query.withCount();

  const result = await query.find();

  return result;
};

export const getSchoolFeedItemsWithPagination = async ({
  startFrom,
  perPage,
  queryData,
}) => {
  const query = new Parse.Query(Feed);

  query.equalTo("schools", queryData);
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.includeAll();
  query.withCount();

  const result = await query.find();

  return result;
};

export const getUserFeedItemsWithPagination = async ({
  startFrom,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Feed);

  query.equalTo("createdBy", user);
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.includeAll();
  query.withCount();

  const result = await query.find();

  return result;
};

export default query;
