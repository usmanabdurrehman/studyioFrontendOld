import React, { useState, useCallback, memo } from 'react';

import {
  likePost,
  unlikePost,
  commentOnPost,
  deletePost,
  hidePost,
  unhidePost,
} from 'queries';
import { PostCard } from 'Components';
import { useDispatch } from 'react-redux';

import { AddPostCard } from 'Containers';

const PostCardContainer = memo(({ post, fetchFunction }) => {
  const [comment, setComment] = useState('');
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();

  const likePostHandler = useCallback(async () => {
    const postId = post._id;
    const { status } = await likePost(postId);
    status && fetchFunction();
  }, [post, fetchFunction]);

  const unlikePostHandler = useCallback(async () => {
    const postId = post._id;
    const { status } = await unlikePost(postId);
    status && fetchFunction();
  }, [post, fetchFunction]);

  const commentOnPostHandler = useCallback(
    async (e) => {
      e && e.preventDefault();
      const postId = post._id;
      const { status } = await commentOnPost(comment, postId);
      if (status) {
        fetchFunction();
        setComment('');
      }
    },
    [comment, post, fetchFunction, setComment],
  );

  const deletePostHandler = useCallback(
    async (id) => {
      const { status } = await deletePost(id);
      status && fetchFunction();
    },
    [fetchFunction],
  );

  const showDeleteModal = useCallback(
    (id) => dispatch({
      type: 'SHOW_CONFIRM_MODAL',
      payload: {
        text: 'Are you sure you want to delete this post?',
        onConfirm: () => deletePostHandler(id),
        buttons: [
          {
            text: 'Yes',
            color: 'danger',
            confirm: true,
          },
          {
            text: 'Cancel',
            color: 'default',
          },
        ],
      },
    }),
    [deletePostHandler, dispatch],
  );

  const showEditModal = useCallback(
    () => {
      dispatch({
        type: 'SHOW_COMPONENT_MODAL',
        payload: <AddPostCard post={post} fetchFunction={fetchFunction} />,
      });
    },
    [fetchFunction, post, dispatch],
  );

  const commentOnChange = useCallback(
    (e) => {
      setComment(e.target.value);
    },
    [setComment],
  );

  const toggleShowMore = useCallback(
    () => setShowMore((prevShowMore) => !prevShowMore),
    [setShowMore],
  );

  const hidePostHandler = useCallback(
    async (postId) => {
      const { status } = await hidePost(postId);
      status && fetchFunction();
    },
    [fetchFunction],
  );

  const unhidePostHandler = useCallback(
    async (postId) => {
      const { status } = await unhidePost(postId);
      status && fetchFunction();
    },
    [fetchFunction],
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
});

export default PostCardContainer;
