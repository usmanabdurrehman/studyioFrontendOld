import React, { useCallback } from "react";

import { Signup } from "Containers";

const SignupPage = (props) => {
  const navigateToSignin = useCallback(() => {
    props.history.push("/");
  }, [props.history]);
  return <Signup navigateToSignin={navigateToSignin} />;
};

export default SignupPage;
