import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import styles from "./Signup.module.scss";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import IconButton from "@material-ui/core/IconButton";

import { signup } from "queries";

import { Button } from "Components";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: 0,
    width: "250px",
    fontSize: "14",
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

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

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
        props.history.push("/");
      }
    },
    [fields, props.history, signup]
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className={styles.grid}>
      <div className={styles.formContainer}>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className={styles.profileImageWrapper}>
              <div className={styles.fileWrapper}>
                <input
                  type="file"
                  id={styles.image}
                  onChange={imageOnChange}
                  accept="image/*"
                />
                <label for={styles.image}>
                  <img
                    src={fields.imgUrl ? fields.imgUrl : "/defaultProfile.png"}
                  />
                </label>
              </div>
            </div>
            <div className="form-group">
              <TextField
                name="name"
                label="Name"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                onChange={(e) => {
                  setFields({
                    ...fields,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                name="username"
                label="Email"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                type="email"
                onChange={(e) => {
                  setFields({
                    ...fields,
                    email: e.target.value,
                  });
                }}
                autoComplete="username"
              />
            </div>
            <FormControl>
              <InputLabel
                htmlFor="outlined-adornment-password"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
                classes={{
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                }}
              >
                Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                value={fields.password}
                name="password"
                label="Password"
                className={classes.textField}
                onChange={(e) => {
                  setFields({
                    ...fields,
                    password: e.target.value,
                  });
                }}
                autoComplete="new-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <div className={styles.buttonWrapper}>
              <Button variant="filled" type="submit">
                Sign Up
              </Button>
            </div>
            <p className={styles.linkText}>
              Have got an account already?{" "}
              <u>
                <Link to="/" className={styles.link}>
                  Sign in
                </Link>
              </u>
            </p>
          </form>
        </div>
      </div>
      <div className={styles.formImage}></div>
    </div>
  );
};

export default Signup;
