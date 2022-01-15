import React, { useMemo } from "react";

import { PostFetch } from "Containers";

import { Layout } from "Layouts";

export default function PostPage(props) {
  const id = useMemo(() => props.match.params.id, [props.match]);

  return (
    <Layout>
      <PostFetch id={id} />
    </Layout>
  );
}
