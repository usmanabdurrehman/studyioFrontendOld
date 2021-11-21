import React from "react";
import styles from "./FAB.module.scss";

import PropTypes from "prop-types";

import { classNames, typeToColorMapping } from "utils";

export default function FAB({
  children,
  color,
  variant,
  disabled,
  classes,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={classNames({
        [styles.button]: true,
        [typeToColorMapping({ color, variant })]: true,
        [styles.disabled]: disabled,
        [classes?.FAB]: classes?.FAB,
      })}
    >
      {children}
    </button>
  );
}

FAB.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "success",
    "warning",
    "danger",
    "default",
  ]),
  variant: PropTypes.oneOf(["filled", "outlined"]),
  disabled: PropTypes.bool,
  classes: PropTypes.object,
};

FAB.defaultProps = {
  color: "default",
  variant: "outlined",
  disabled: false,
};
