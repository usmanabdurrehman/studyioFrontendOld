import React, { memo } from 'react';

import PropTypes from 'prop-types';

import { classNames, typeToColorMapping } from 'utils';
import styles from './Button.module.scss';

const Button = memo(({
  className,
  children,
  color,
  variant,
  size,
  fullWidth,
  classes,
  onClick,
  ...rest
}) => {
  const typeToSizeMapper = (sizeToMap) => {
    const typeToSizeMap = {
      small: styles.buttonSmall,
      medium: styles.buttonMedium,
      large: styles.buttonLarge,
    };
    return typeToSizeMap[sizeToMap] || typeToSizeMap.small;
  };

  return (
    <button
      onClick={() => {
        onClick && onClick();
      }}
      className={classNames({
        [styles.button]: true,
        [typeToSizeMapper(size)]: true,
        [typeToColorMapping({ color, variant })]: true,
        [styles.fullWidth]: fullWidth,
        [classes?.button]: classes?.button,
      })}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;

Button.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'danger',
    'default',
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  classes: PropTypes.object,
};

Button.defaultProps = {
  color: 'default',
  variant: 'outlined',
  size: 'small',
  fullWidth: false,
};
