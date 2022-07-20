import Parse from "parse";
import { getUsersFollowing } from "./queryFollows";

const Feed = Parse.Object.extend("Feed");
const query = new Parse.Query(Feed);

export const getFeedItemsWithPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Feed);

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

export default query;
