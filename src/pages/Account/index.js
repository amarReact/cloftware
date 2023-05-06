import styles from "./account.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/checkboxGlobal/CheckBoxGlobal";
import { useState } from "react";
import {WhiteBox} from "../../component/WhiteBox"
// import sch from "../../../public/images/parents.png"
import {AiOutlinePlusCircle} from "react-icons/ai"

const Account = () => {
    const datalist = [
        {title: "child one"},
        {title: "child two"},
        {title: "child three"}
    ]
  return (
    <div className={styles.accountCntr}>
      <h2>User Profile</h2>
      <div className={`gridRow`}>
        {/* <div className="grid_4"> */}
        <div className={styles.accountSettingCntr}>

                    <button className={styles.parentList}>
                        <label>
                        <img src={process.env.PUBLIC_URL + '/images/parents.png'} alt=""  />
                        </label> <p>Parents</p></button>

                    <hgroup>
                    <ul>
                        {datalist?.map((item, ind)=>{
                            return(
                                <li key={ind}><label>
                                    <img src={process.env.PUBLIC_URL + '/images/boy.png'} alt=""  />
                                    </label> <p>{item?.title}</p></li>
                            )
                        })}              
                    </ul>
                    </hgroup>
                </div>

           
    
      </div>

    </div>
  );
};

export default Account;
