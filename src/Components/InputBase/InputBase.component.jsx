import React from 'react';
import styles from './InputBase.module.scss';

export default function InputBase(props) {
  return (
    <input required="required" className={styles.requiredInput} {...props} />
  );
}
