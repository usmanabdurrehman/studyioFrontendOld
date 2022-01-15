import React, { useMemo } from "react";

import { Layout } from "Layouts";

import { Profile } from "Containers";

const ProfilePage = (props) => {
  const id = useMemo(() => props.match.params.id, [props]);

  return (
    <Layout useGutter={false}>
      <Profile id={id} />
    </Layout>
  );
};

export default ProfilePage;
