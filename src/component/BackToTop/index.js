import React, { useState } from 'react';
import {BsFillArrowUpCircleFill} from "react-icons/bs"
import styles from "./backtop.module.css"

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Attach scroll event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${styles.backtop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <BsFillArrowUpCircleFill />
    </button>
  );
};

export default BackToTop;
