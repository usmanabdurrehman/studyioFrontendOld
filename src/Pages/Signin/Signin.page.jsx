import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import styles from "./Signin.module.scss";

import { useDispatch } from "react-redux";

import { signin } from "queries";

import { Button, Checkbox } from "Components";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  labelRoot: {
    fontSize: "14px",
  },
  labelFocused: {
    fontSize: "17px",
  },
  select: {
    fontSize: "14px",
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { auth, user, token } = await signin(fields);
      if (auth) {
        dispatch({ type: "SET_USER", payload: user });
        props.history.push("/timeline");
      }
    },
    [signin, dispatch, props.history]
  );

  return (
    <div className={styles.grid}>
      <div className={styles.formImage}></div>
      <div className={styles.formContainer}>
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Email"
              type="email"
              className={styles.input}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              onChange={(e) => {
                setFields({
                  ...fields,
                  email: e.target.value,
                });
              }}
              autoComplete="username"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              className={styles.input}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              onChange={(e) => {
                setFields({
                  ...fields,
                  password: e.target.value,
                });
              }}
              autoComplete="current-password"
            />
            <div className={styles.checkboxWrapper}>
              <Checkbox
                checked={fields.rememberMe}
                onChange={(checked) => {
                  setFields({
                    ...fields,
                    rememberMe: checked,
                  });
                }}
                className={styles.checkbox}
                inputProps={{
                  "aria-label": "checkbox with default color",
                }}
              />
              <p className={styles.checkboxDescription}>Remember me</p>
            </div>
            <Button type="submit" variant="filled">
              Sign In
            </Button>
          </form>
          <p className={styles.linkText}>
            Haven't got an account?{" "}
            <u>
              <Link className={styles.link} to="/signup">
                Sign up
              </Link>
            </u>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
