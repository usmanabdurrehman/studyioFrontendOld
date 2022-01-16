import React, { useMemo } from 'react';

import Layout from 'Layouts';

import { Profile } from 'Containers';

export default function ProfilePage({ match: { params: { id } } }) {
  const profileId = useMemo(() => id, [id]);

  return (
    <Layout useGutter={false}>
      <Profile id={profileId} />
    </Layout>
  );
}
