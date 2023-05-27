import styles from './check.module.css';
import React, { useState } from 'react';
import classnames from 'classnames';
export const CheckBoxGlobal = ({ title, className, width, checked, disable, onChange, ...props }) => {
  return (
    <label
      className={classnames({
        [styles.checkGlb]: true,
        [className]: className,
        [styles[width]]: width,
        [styles.isTitle]: title,
        [styles.isDisable]: disable
      })}
    >
      <input type="checkbox" checked={checked} onChange={onChange} {...props} />
      <small className={styles.checkboxDesign}></small>
      {title && <em className={styles.checkboxLabel}>{title}</em>}
    </label>
  );
};

//title = add checkbox title
// width bydefault is auto, use full to 100%
// className customize your checkbox
// disable = to disable box
