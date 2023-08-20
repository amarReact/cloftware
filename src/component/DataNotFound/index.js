// LoadingAnimation.js

import React from 'react';
import styles from './dnf.module.css'; // Import the CSS file

export const DataNotFound = () => {
  return (
    <div className={styles.loading_spinnerUp}>
          <div className={styles.loading_spinner}></div>
          <span>Loading...</span>
    </div>

  );
};


