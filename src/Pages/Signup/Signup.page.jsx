import React, { useCallback } from 'react';

import { Signup } from 'Containers';

function SignupPage({ history }) {
  const navigateToSignin = useCallback(() => {
    history.push('/');
  }, [history]);
  return <Signup navigateToSignin={navigateToSignin} />;
}

export default SignupPage;
