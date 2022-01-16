import React from 'react';

import globalStyles from 'styles/global.module.css';

import PropTypes from 'prop-types';

import { classNames, typeToColorMapping } from 'utils';
import Check from './Check.svg';
import styles from './Checkbox.module.scss';

import InputBase from '../InputBase/InputBase.component';

export default function Checkbox({
  color,
  checked,
  disabled,
  classes,
  required,
  onChange,
}) {
  return (
    <div
      className={classNames({
        [styles.checkbox]: true,
        [typeToColorMapping({ color })]: checked,
        [styles.removeBorder]: checked,
        [globalStyles.disabled]: disabled,
        [classes?.checkbox]: classes?.checkbox,
      })}
      onClick={() => {
        !disabled && onChange && onChange(!checked);
      }}
      onKeyPress={() => {
        !disabled && onChange && onChange(!checked);
      }}
      role="button"
      tabIndex="-1"
    >
      <img src={Check} className={styles.check} alt="Check mark" />
      {required && <InputBase value={checked} />}
    </div>
  );
}

Checkbox.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.object,
};

Checkbox.defaultProps = {
  color: 'default',
  disabled: false,
  required: false,
};
