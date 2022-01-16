import React, { useMemo } from 'react';

import { PostFetch } from 'Containers';

import Layout from 'Layouts';

export default function PostPage({ match: { params: { id } } }) {
  const postId = useMemo(() => id, [id]);

  return (
    <Layout>
      <PostFetch id={postId} />
    </Layout>
  );
}
