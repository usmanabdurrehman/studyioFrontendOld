import React from 'react';

import { classNames } from 'utils';

import PropTypes from 'prop-types';
import styles from './Container.module.scss';

// Have to convert these inline styles to classes

export default function Container({
  children,
  classes,
  maxWidth,
  disableGutters,
}) {
  const maxWidthMapper = (maxWidthToMap) => {
    const maxWidthMap = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    };
    return maxWidthMap[maxWidthToMap] || maxWidthMap.lg;
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [classes?.container]: classes?.container,
      })}
      style={{
        maxWidth: maxWidthMapper(maxWidth),
        padding: disableGutters ? 0 : '0 16px',
      }}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disableGutters: PropTypes.bool,
  classes: PropTypes.object,
};

Container.defaultProps = {
  maxWidth: 'lg',
  disableGutters: false,
};
