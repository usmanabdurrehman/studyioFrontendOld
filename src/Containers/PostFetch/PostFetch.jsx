import React, { useState, useEffect, useCallback } from "react";

import { PostCardSkeleton } from "Components";
import { PostCard } from "Containers";

import { getPostById } from "queries";

export default function PostFetch({ id }) {
  const [post, setPost] = useState(null);

  const getPostHandler = useCallback(async () => {
    const data = await getPostById(id);
    setPost(data);
  }, [getPostById, setPost]);

  useEffect(() => {
    getPostHandler();
  }, [getPostHandler]);

  return post ? (
    <PostCard post={post} fetchFunction={getPostHandler} />
  ) : (
    <PostCardSkeleton />
  );
}
