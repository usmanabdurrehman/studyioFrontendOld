import React from 'react';

import ClearIcon from '@material-ui/icons/Clear';

import PropTypes from 'prop-types';

import { classNames, returnDefault } from 'utils';
import styles from './Alert.module.scss';

export default function Alert({
  color, text, showAlert, classes, onClose,
}) {
  return (
    <div
      className={classNames({
        [styles.alertWrapper]: true,
      })}
    >
      <div
        className={classNames({
          [styles.alert]: true,
          [styles.showAlert]: showAlert,
          [styles[`alert-${returnDefault({ color })}`]]: true,
          [classes?.alert]: classes?.alert,
        })}
      >
        <img src={`/icons/alert-${color}.svg`} className={styles.alertIcon} alt="Alert icon" />
        <p className={styles.alertText}>{text}</p>
        <ClearIcon className={styles.icon} onClick={onClose} />
      </div>
    </div>
  );
}

Alert.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  text: PropTypes.string.isRequired,
  showAlert: PropTypes.bool,
  classes: { [PropTypes.string]: PropTypes.string },
};

Alert.defaultProps = {
  color: 'default',
  showAlert: false,
  classes: {},
};
