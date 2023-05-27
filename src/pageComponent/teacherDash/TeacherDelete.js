import { useEffect, useState } from "react";
import styles from "../schoolDash/sd.module.css"
import axios from "axios";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from "../../redux/constants/constants";
const TeacherDelete =({techId, setIsDelete})=>{

    const teacherDetailFunc = async () => {
        try {
        const response = await axios.post(`${BASE_URL}/teacher/change_teacher_status`, {
          teacher_id: techId,
          status: "Delete"
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

      const teacherDeleteHit=()=>{
        teacherDetailFunc(); 
     
      }

    return(
        <div className={styles.sdDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={teacherDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default TeacherDelete;