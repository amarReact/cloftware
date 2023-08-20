import React from 'react'
import styles from "./dnf.module.css";
import {GiArchiveResearch} from "react-icons/gi"
import {AiOutlineLoading3Quarters} from "react-icons/ai"

export const DataNotFound = ({title}) => {
  return (
    <div className={styles.dfnDiv}>
        <AiOutlineLoading3Quarters />
        {title ? title :  <h6><span></span> <b>Result  Not Found</b></h6>}
    </div>
  )
}
