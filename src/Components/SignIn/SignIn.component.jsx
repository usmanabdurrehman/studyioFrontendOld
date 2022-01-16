import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Button } from 'Components';
import styles from './SignIn.module.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  labelRoot: {
    fontSize: '14px',
  },
  labelFocused: {
    fontSize: '17px',
  },
  select: {
    fontSize: '14px',
  },
}));

const SignIn = memo(({ handleSubmit, onChange, fields }) => {
  const classes = useStyles();

  return (
    <div className={styles.grid}>
      <div className={styles.formImage} />
      <div className={styles.formContainer}>
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email"
              type="email"
              className={styles.input}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              onChange={onChange}
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
              onChange={onChange}
              autoComplete="current-password"
            />
            <div className={styles.checkboxWrapper}>
              <Checkbox
                name="rememberMe"
                checked={fields.rememberMe}
                onChange={onChange}
                className={styles.checkbox}
                color="primary"
              />
              <p className={styles.checkboxDescription}>Remember me</p>
            </div>
            <Button type="submit" variant="filled">
              Sign In
            </Button>
          </form>
          <p className={styles.linkText}>
            Haven&apos;t got an account?
            {' '}
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
});

export default SignIn;
