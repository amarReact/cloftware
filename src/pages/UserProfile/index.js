import styles from "./userProfile.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/checkboxGlobal/CheckBoxGlobal";
import { useState } from "react";

import {WhiteBox} from "../../component/WhiteBox"

const UserProfile = () => {
  return (
    <div className={styles.userProCntr}>
      <h2>User Profile</h2>
      <div className={`gridRow`}>
        <div className="grid_4">
            <WhiteBox title="Vidya mandir school noida" >
                <div className={styles.schoolImg}><img src={process.env.PUBLIC_URL + '/images/sch.jpeg'} alt="" /></div>
                <ul className={styles.schoolUl}>
                    <li><label>Email</label> <span>vidya@gmail.com</span></li>
                    <li><label>Phone Number</label>  <span>+91 9999999999</span></li>
                    <li><label>Address</label> <span>C-217, Baraula, Sector 49, Noida, Uttar Pradesh 201301</span> </li>
                </ul>
            </WhiteBox>
        </div>
        <div className="grid_8">
            <WhiteBox title="About" >
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <h4>Student List <span>201-500 Students</span></h4>
            </WhiteBox>
        </div>
      </div>

      {/* <div className={`gridRow`}>
        <div className="grid_4">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_4">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_4">
            <WhiteBox title="Sales Analytics" />
        </div>
      </div>

      <div className={`gridRow`}>
        <div className="grid_3">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_3">
            <WhiteBox title="Total Revenue" />
        </div>
      </div>

      <div className={`gridRow`}>
        <div className="grid_2">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Sales Analytics" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
        <div className="grid_2">
            <WhiteBox title="Total Revenue" />
        </div>
      </div> */}

    </div>
  );
};

export default UserProfile;
