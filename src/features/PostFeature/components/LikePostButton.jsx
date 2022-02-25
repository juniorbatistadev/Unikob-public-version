import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import Button from "@components/common/Button";
import { saveLike, isPostLiked, deleteLike } from "src/data/queryPostLike";
import styles from "./LikePostButton.module.css";
import { getPostById } from "src/data/queryPosts";

const LikePostButtonContainer = ({ post: postData }) => {
  const [post, setPost] = useState();

  //load post
  useEffect(() => {
    const getPost = async () => {
      const PostObject = await getPostById(postData.objectId);
      setPost(PostObject);
    };
    getPost();
  }, [postData.objectId]);
  return (
    <>
      <LikePostButton post={post} />
    </>
  );
};

const LikePostButton = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    isPostLiked(currentUser, post).then((result) => {
      setIsLiked(result);
    });
  }, [currentUser, post]);

  const onLike = () => {
    saveLike(currentUser, post).then(() => setIsLiked(true));
  };

  const onDeleteLike = () => {
    deleteLike(currentUser, post).then(() => setIsLiked(false));
  };

  return (
    <Button
      typeStyle={isLiked ? "secondary" : "primary"}
      onClick={isLiked ? onDeleteLike : onLike}
    >
      <span className={styles.buttonText}>
        {" "}
        {isLiked ? "Te gusto " : "Me gusta "}
      </span>
      <span role="img" aria-label="heart">
        🤍
      </span>
    </Button>
  );
};

export default LikePostButtonContainer;
