import { useEffect, useState } from "react";
import styles from "../../pageComponent/schoolDash/news/news.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";

const DeleteTransport =({transportID, setIsDelete})=>{
  const token = Cookies.get('jwtToken');
    const holidayDeleteFunc = async () => {
        try {
        const response = await axios.post(`${BASE_URL}/transport/change_transport_status`, {
          transport_id: transportID,
          status: "Delete"
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

      const transportDeleteHit=()=>{
        holidayDeleteFunc(); 
      }

    return(
        <div className={styles.nsDelete}>
            <p>Are you sure you want to delete</p>    
            <ButtonGlobal width="auto" title="Delete" onClick={transportDeleteHit} />      
            <ToastContainer />  
        </div>
    )
}

export default DeleteTransport;