import React, { memo } from 'react';

import PropTypes from 'prop-types';

import { classNames, typeToColorMapping } from 'utils';
import styles from './FAB.module.scss';

const FAB = memo(({
  children,
  color,
  variant,
  disabled,
  classes,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={classNames({
      [styles.button]: true,
      [typeToColorMapping({ color, variant })]: true,
      [styles.disabled]: disabled,
      [classes?.FAB]: classes?.FAB,
    })}
    type="button"
  >
    {children}
  </button>
));

export default FAB;
FAB.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined']),
  disabled: PropTypes.bool,
  classes: PropTypes.object,
};

FAB.defaultProps = {
  color: 'default',
  variant: 'outlined',
  disabled: false,
};
