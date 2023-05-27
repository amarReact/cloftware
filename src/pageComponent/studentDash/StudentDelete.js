import { useEffect, useState } from "react";
import styles from "../schoolDash/sd.module.css"
import axios from "axios";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from "../../redux/constants/constants";
const StudentDelete =({scId, setIsDelete})=>{

    const studentDetailFunc = async () => {
        try {
        const response = await axios.post(`${BASE_URL}/student/change_student_status`, {
          student_id: scId,
          student_status: "Delete"
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

      const studentDeleteHit=()=>{
        studentDetailFunc(); 
     
      }

    return(
        <div className={styles.sdDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={studentDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default StudentDelete;