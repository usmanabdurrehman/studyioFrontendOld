import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import styles from "./Signup.module.scss";

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
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    imgUrl: "",
  });

  let imageOnChange = (e) => {
    if (e.target.files[0]) {
      let imgUrl = URL.createObjectURL(e.target.files[0]);
      setFields({ ...fields, image: e.target.files[0], imgUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    const { status } = await signup(formdata);
    if (res.data.status == true) {
      props.history.push("/");
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.formContainer}>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className={styles.profileImageWrapper}>
              <div className={styles.fileWrapper}>
                <input type="file" id={styles.image} onChange={imageOnChange} />
                <label for={styles.image}>
                  <img
                    src={fields.imgUrl ? fields.imgUrl : "defaultProfile.png"}
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
                onChange={(e) => {
                  setFields({
                    ...fields,
                    email: e.target.value,
                  });
                }}
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <TextField
                name="password"
                label="Password"
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
                    password: e.target.value,
                  });
                }}
                autoComplete="new-password"
              />
            </div>
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
