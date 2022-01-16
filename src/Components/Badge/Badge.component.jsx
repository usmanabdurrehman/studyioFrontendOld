import React, { memo } from 'react';

import PropTypes from 'prop-types';

import { typeToColorMapping, classNames } from 'utils';
import styles from './Badge.module.scss';

const Badge = memo(({
  color,
  number,
  max,
  invisible,
  showZero,
  classes,
  children,
}) => {
  if (typeof number === 'undefined') {
    throw new Error('A number must be supplied for displaying the badge');
  }

  return (
    <div className={styles.badgeWrapper}>
      {!invisible && (number === 0 ? showZero : true) && (
        <div
          className={classNames({
            [styles.badge]: true,
            [typeToColorMapping({ color })]: true,
            [classes?.badge]: classes?.badge,
          })}
        >
          <div>{Math.min(number, max)}</div>
        </div>
      )}
      <div className={styles.badgeContent}>{children}</div>
    </div>
  );
});

export default Badge;

Badge.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  number: PropTypes.number.isRequired,
  max: PropTypes.number,
  showZero: PropTypes.bool,
  invisible: PropTypes.bool,
  classes: { [PropTypes.string]: PropTypes.string },
};

Badge.defaultProps = {
  color: 'default',
  max: 99,
  showZero: false,
  invisible: false,
  classes: {},
};
