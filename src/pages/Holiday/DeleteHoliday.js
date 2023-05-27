import { useEffect, useState } from "react";
import styles from "../../pageComponent/schoolDash/news/news.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';

const DeleteHoliday =({scId, setIsDelete})=>{
    const [classDeleteData, setClassDeleteData] = useState([])

      const classDeleteHit=()=>{
        // schoolDetailFunc(); 
     
      }

    return(
        <div className={styles.nsDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={classDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default DeleteHoliday;