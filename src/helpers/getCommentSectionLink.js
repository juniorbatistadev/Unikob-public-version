import {
  POST_COMMENT,
  PROFILE_COMMENT,
} from "@components/CommentsSection/commentsType";
import { getPostById } from "src/data/queryPosts";
import { getUserById } from "src/data/queryUsers";
import { PROFILE_COMMENTS_PATH, READ_POST_PATH } from "src/paths";

const { getFirstCommentBySection } = require("src/data/queryComments");

async function getCommentSectionLink(section) {
  const comment = await getFirstCommentBySection(section);

  let link;

  if (comment.attributes.type === POST_COMMENT) {
    const post = await getPostById(section);

    link = READ_POST_PATH.replace(":slug", post.attributes.slug);
  }

  if (comment.attributes.type === PROFILE_COMMENT) {
    const user = await getUserById(section);

    link = PROFILE_COMMENTS_PATH.replace(":user", user.attributes.username);
  }

  return link;
}

export default getCommentSectionLink;
