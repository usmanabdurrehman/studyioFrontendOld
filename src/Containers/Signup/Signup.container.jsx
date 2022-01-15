import React, { useState, useCallback } from "react";

import { signup } from "queries";

import { Signup } from "Components";

const SignupContainer = ({ navigateToSignin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    imgUrl: "",
  });

  let imageOnChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        let imgUrl = URL.createObjectURL(e.target.files[0]);
        setFields((fields) => ({
          ...fields,
          image: e.target.files[0],
          imgUrl,
        }));
      }
    },
    [setFields]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      let formdata = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formdata.append(key, value);
      });
      const { status } = await signup(formdata);
      if (status) {
        navigateToSignin();
      }
    },
    [fields, navigateToSignin, signup]
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
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
};

export default SignupContainer;
