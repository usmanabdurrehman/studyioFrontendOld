import React, { useCallback } from 'react';

import { SignIn } from 'Containers';

function SignInPage({ history }) {
  const navigateToTimeline = useCallback(() => {
    history.push('/timeline');
  }, [history]);
  return <SignIn navigateToTimeline={navigateToTimeline} />;
}

export default SignInPage;
