import React, { useState, useCallback } from "react";

import {
  likePost,
  unlikePost,
  commentOnPost,
  deletePost,
  hidePost,
  unhidePost,
} from "queries";
import { PostCard } from "Components";
import { useDispatch } from "react-redux";

import { AddPostCard } from "Containers";

export default function PostCardContainer({ post, fetchFunction }) {
  const [comment, setComment] = useState("");
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();

  const likePostHandler = useCallback(async () => {
    let postId = post._id;
    const { status } = await likePost(postId);
    status && fetchFunction();
  }, [post, likePost, fetchFunction]);

  const unlikePostHandler = useCallback(async () => {
    let postId = post._id;
    const { status } = await unlikePost(postId);
    status && fetchFunction();
  }, [post, unlikePost, fetchFunction]);

  const commentOnPostHandler = useCallback(
    async (e) => {
      e && e.preventDefault();
      let postId = post._id;
      const { status } = await commentOnPost(comment, postId);
      if (status) {
        fetchFunction();
        setComment("");
      }
    },
    [post, commentOnPost, fetchFunction, setComment]
  );

  const showDeleteModal = useCallback(
    (id) =>
      dispatch({
        type: "SHOW_CONFIRM_MODAL",
        payload: {
          text: "Are you sure you want to delete this post?",
          onConfirm: () => deletePostHandler(id),
          buttons: [
            {
              text: "Yes",
              color: "danger",
              confirm: true,
            },
            {
              text: "Cancel",
              color: "default",
            },
          ],
        },
      }),
    [dispatch]
  );

  const deletePostHandler = useCallback(
    async (id) => {
      const { status } = await deletePost(id);
      status && fetchFunction();
    },
    [deletePost, fetchFunction]
  );

  const showEditModal = useCallback(
    (id) => {
      dispatch({
        type: "SHOW_COMPONENT_MODAL",
        payload: <AddPostCard post={post} fetchFunction={fetchFunction} />,
      });
    },
    [dispatch]
  );

  const commentOnChange = useCallback(
    (e) => {
      setComment(e.target.value);
    },
    [setComment]
  );

  const toggleShowMore = useCallback(
    () => setShowMore(!showMore),
    [setShowMore]
  );

  const hidePostHandler = useCallback(
    async (postId) => {
      const { status } = await hidePost(postId);
      status && fetchFunction();
    },
    [hidePost, fetchFunction]
  );

  const unhidePostHandler = useCallback(
    async (postId) => {
      const { status } = await unhidePost(postId);
      status && fetchFunction();
    },
    [unhidePost, fetchFunction]
  );

  return (
    <PostCard
      post={post}
      likePost={likePostHandler}
      unlikePost={unlikePostHandler}
      deletePost={showDeleteModal}
      editPost={showEditModal}
      hidePost={hidePostHandler}
      unhidePost={unhidePostHandler}
      commentOnPost={commentOnPostHandler}
      commentOnChange={commentOnChange}
      comment={comment}
      toggleShowMore={toggleShowMore}
      showMore={showMore}
    />
  );
}
