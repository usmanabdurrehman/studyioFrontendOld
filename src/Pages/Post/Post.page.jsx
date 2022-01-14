import React, { useState, useEffect, useCallback } from "react";

import { Layout } from "Layouts";
import { PostCardSkeleton } from "Components";
import { PostCard } from "Containers";

import { getPostById } from "queries";

export default function PostPage(props) {
  const [post, setPost] = useState(null);
  const id = props.match.params.id;

  const getPostHandler = useCallback(async () => {
    const data = await getPostById(id);
    setPost(data);
  }, [getPostById, setPost]);

  useEffect(() => {
    getPostHandler();
  }, [getPostHandler]);

  return (
    <Layout>
      {post ? (
        <PostCard post={post} fetchFunction={getPostHandler} />
      ) : (
        <PostCardSkeleton />
      )}
    </Layout>
  );
}
