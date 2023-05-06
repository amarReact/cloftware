import { useState } from "react";
import styles from "./logo.module.css"
import { Link } from "react-router-dom";
import classnames from 'classnames';
export const Logo = ({white, width, className}) => {
    return(
      <Link to="/" 
      className={classnames({
        [styles.logoDiv]: true,
        [styles[width]]: true,
        [className]: true,
      })} >
       {white ?   <img src={process.env.PUBLIC_URL + '/images/logoWhite.png'} fill contain alt="" /> : 
       <img src={process.env.PUBLIC_URL + '/images/logo.png'} fill contain alt="" />
       } 
      
      </Link>
    )
}

// width use small is default , medium, large 
