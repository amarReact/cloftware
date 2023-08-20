import { useEffect, useState } from "react";
import styles from "../../pageComponent/schoolDash/sd.module.css"
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";

const DeleteHoliday = ({ setIsDelete, holidayID, ststusID }) => {
  const token = Cookies.get("jwtToken");
  const [isSwitchOn, setIsSwitchOn] = useState(
    ststusID === "Inactive" ? false : true
  );

  const holidayDeleteFunc = async (val) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/holiday/change_holiday_status`,
        {
          holiday_id: holidayID,
          status: val
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 400) {
        toast.error(response?.data?.message);
      } else {
        toast.success(response?.data?.message, {
          autoClose: 2000,
          position: "top-center",
          className: 'customToast'
        });
        let timer = setTimeout(() => {
          setIsDelete(false);
          clearTimeout(timer);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const holidayDeleteHit = (val) => {
    holidayDeleteFunc(val);
  };

  const toggleSwitch = (val) => {
    setIsSwitchOn(!isSwitchOn);
    holidayDeleteFunc(val);
  };

  return (
    <div className={styles.sdDelete}>
      <p>Are you sure you want to change ststus</p>

      <hgroup>
        <h6>
          <b>Inactive</b>
          <button
            className={`${styles.switch} ${isSwitchOn ? styles.on : ""}`}
            onClick={() => toggleSwitch(isSwitchOn ? "Inactive" : "Active")}
          ></button>
          <span>Active</span>
        </h6>
        <ButtonGlobal
          // disable={ststusID === "Delete"}
          width="auto"
          size="small"
          title="Delete"
          onClick={() => holidayDeleteHit("Delete")}
        />
      </hgroup>

      <ToastContainer />
    </div>
  );
};

export default DeleteHoliday;