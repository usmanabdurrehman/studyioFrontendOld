import React, { useState } from "react";

import { likePost, unlikePost, commentOnPost } from "queries";
import { PostCard } from "Components";

export default function PostCardContainer({ post, fetchFunction }) {
  const [comment, setComment] = useState("");
  const [showMore, setShowMore] = useState(false);

  const likePostHandler = async () => {
    let postId = post._id;
    const { status } = await likePost(postId);
    status && fetchFunction();
  };

  const unlikePostHandler = async () => {
    let postId = post._id;
    const { status } = await unlikePost(postId);
    status && fetchFunction();
  };

  const commentOnPostHandler = async (e) => {
    e && e.preventDefault();
    let postId = post._id;
    const { status } = await commentOnPost(comment, postId);
    if (status) {
      fetchFunction();
      setComment("");
    }
  };

  const commentOnChange = (e) => {
    setComment(e.target.value);
  };

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <PostCard
      post={post}
      likePost={likePostHandler}
      unlikePost={unlikePostHandler}
      commentOnPost={commentOnPostHandler}
      commentOnChange={commentOnChange}
      comment={comment}
      toggleShowMore={toggleShowMore}
      showMore={showMore}
    />
  );
}
