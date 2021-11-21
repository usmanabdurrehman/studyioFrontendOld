import React, { useState, useEffect, useRef } from "react";

import styles from "./Checkbox.module.scss";
import globalStyles from "styles/global.module.css";

import Check from "./Check.svg";

import PropTypes from "prop-types";

import { classNames, typeToColorMapping } from "utils";

import InputBase from "../InputBase/InputBase.component";

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
      onClick={(e) => {
        !disabled && onChange && onChange(!checked);
      }}
    >
      <img src={Check} className={styles.check} alt="Check mark" />
      {required && <InputBase value={checked} />}
    </div>
  );
}

Checkbox.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "success",
    "warning",
    "danger",
    "default",
  ]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.object,
};

Checkbox.defaultProps = {
  color: "default",
  disabled: false,
  required: false,
};
