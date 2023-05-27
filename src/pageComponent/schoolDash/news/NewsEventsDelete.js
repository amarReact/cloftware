import { useEffect, useState } from "react";
import styles from "./news.module.css"
import ButtonGlobal from "../../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';

const NewsEventsDelete =({scId, setIsDelete})=>{
    const [schoolDeleteData, setSchoolDeleteData] = useState([])

      const schoolDeleteHit=()=>{
        // schoolDetailFunc(); 
     
      }

    return(
        <div className={styles.nsDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={schoolDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default NewsEventsDelete;