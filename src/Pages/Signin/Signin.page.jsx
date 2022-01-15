import React from "react";

import { SignIn } from "Containers";

const SignInPage = (props) => {
  const navigateToTimeline = () => {
    props.history.push("/timeline");
  };
  return <SignIn navigateToTimeline={navigateToTimeline} />;
};

export default SignInPage;
