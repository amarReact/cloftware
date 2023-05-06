import { useEffect, useState } from "react";
import styles from "./sd.module.css"
import axios from "axios";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';

const SchoolDelete =({scId, setIsDelete})=>{
    const [schoolDeleteData, setSchoolDeleteData] = useState([])

    console.log("scId", scId)

    const schoolDetailFunc = async () => {
        try {
        const response = await axios.put(`https://aa8b-203-212-233-211.ngrok-free.app/api/change_school_status`, {
          school_id: scId,
          school_status: "Delete"
        });

        if(response?.status === 400){
          toast.error(response?.data?.message);
        } else{
          toast.success(response?.data?.message, {position: "bottom-center"});
          let timer = setTimeout(()=>{
            setIsDelete(false)
            clearTimeout(timer)
          },3000)
        }

        } catch (error) {
          console.log(error);
        }
      }

      const schoolDeleteHit=()=>{
        schoolDetailFunc(); 
     
      }

    return(
        <div className={styles.sdDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={schoolDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default SchoolDelete;