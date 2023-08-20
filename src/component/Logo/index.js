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
       {white ? <img src={process.env.PUBLIC_URL + '/images/logoWhite.png'} fill contain alt="" /> : 
       <img src="http://cloftware.com/images/clof.png" fill contain alt="" />
       } 
      </Link>
    )
}

export const LogoGraph = ({white, width, className}) => {
  return(
    <Link to="/" 
    className={classnames({
      [styles.logoDivGraph]: true,
      [styles[width]]: true,
      [className]: true,
    })} >
     
     <img src={process.env.PUBLIC_URL + '/images/logoGraph.png'} fill contain alt="" />
    
    </Link>
  )
}

// width use small is default , medium, large 
