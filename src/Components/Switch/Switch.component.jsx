import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { classNames, typeToColorMapping, returnDefault } from 'utils';
import styles from './Switch.module.scss';

export default function Switch({ onChange, color, classes }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={classNames({
        [styles.switch]: true,
        [styles[`switchBG-${returnDefault({ color })}`]]: clicked,
        [classes?.switchBG]: classes?.switchBG,
      })}
      onClick={() => {
        setClicked(!clicked);
        onChange && onChange(clicked);
      }}
      onKeyPress={() => {
        setClicked(!clicked);
        onChange && onChange(clicked);
      }}
      role="button"
      tabIndex="-1"
    >
      <div
        className={classNames({
          [styles.switchCircle]: true,
          [styles.switchClicked]: clicked,
          [styles.switchUnclicked]: !clicked,
          [typeToColorMapping({ color })]: clicked,
          [classes?.switchCircle]: classes?.switchCircle,
        })}
      />
    </div>
  );
}

Switch.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  color: 'default',
};
