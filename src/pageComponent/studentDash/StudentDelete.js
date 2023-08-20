import { useEffect, useState } from "react";
import styles from "../schoolDash/sd.module.css"
import axios from "axios";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from 'js-cookie';

const StudentDelete =({scId, setIsDelete, ststusID})=>{
  const token = Cookies.get('jwtToken');
  const [isSwitchOn, setIsSwitchOn] = useState(ststusID === "Inactive" ? false : true);
  
    const studentDetailFunc = async (val) => {
        try {
        const response = await axios.post(`${BASE_URL}/student/change_student_status`, {
          student_id: scId,
          student_status: val
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
        );

        if(response?.status === 400){
          toast.error(response?.data?.message);
        } else{
          toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast'});
          let timer = setTimeout(()=>{
            setIsDelete(false)
            clearTimeout(timer)
          },3000)
        }

        } catch (error) {
          console.log(error);
        }
      }

      const studentDeleteHit=(val)=>{
        studentDetailFunc(val); 
      }


      const toggleSwitch = (val) => {
        setIsSwitchOn(!isSwitchOn);
        studentDetailFunc(val)
      };

    return(
        <div className={styles.sdDelete}>
            <p>Are you sure you want to change  ststus</p>    

            <hgroup><h6><b>Inactive</b>  <button
              className={`${styles.switch} ${isSwitchOn ? styles.on : ""}`}
              onClick={()=> toggleSwitch(isSwitchOn ? "Inactive" : "Active")}
            ></button> <span>Active</span></h6>   <ButtonGlobal disable={ststusID === "Delete"} width="auto" size="small" title="Delete" onClick={()=> studentDeleteHit("Delete")} /> 
            </hgroup>

            <ToastContainer />  
        </div>
    )
}

export default StudentDelete;