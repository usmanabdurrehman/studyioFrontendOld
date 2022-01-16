import React, { useState, useCallback, memo } from 'react';

import { signup } from 'queries';

import { Signup } from 'Components';

const SignupContainer = memo(({ navigateToSignin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    imgUrl: '',
  });

  const imageOnChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        setFields((prevFields) => ({
          ...prevFields,
          image: e.target.files[0],
          imgUrl,
        }));
      }
    },
    [setFields],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formdata.append(key, value);
      });
      const { status } = await signup(formdata);
      if (status) {
        navigateToSignin();
      }
    },
    [fields, navigateToSignin],
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, [setShowPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <Signup
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      showPassword={showPassword}
      handleSubmit={handleSubmit}
      imageOnChange={imageOnChange}
      fields={fields}
    />
  );
});

export default SignupContainer;
