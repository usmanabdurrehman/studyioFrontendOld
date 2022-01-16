import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { signin } from 'queries';

import { SignIn } from 'Components';

function SignInContainer({ navigateToTimeline }) {
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { auth, user } = await signin(fields);
      if (auth) {
        dispatch({ type: 'SET_USER', payload: user });
        navigateToTimeline();
      }
    },
    [dispatch, fields, navigateToTimeline],
  );

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <SignIn onChange={onChange} handleSubmit={handleSubmit} fields={fields} />
  );
}

export default SignInContainer;
