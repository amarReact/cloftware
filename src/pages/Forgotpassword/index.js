import styles from "./forgotpassword.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/checkboxGlobal/CheckBoxGlobal";
import { useState } from "react";
import {AiFillGoogleCircle} from "react-icons/ai"
const Forgotpassword = () => {
  const [name, setName] = useState("")
  const [selectSchool, setSelectSchool] = useState("")
  const options = [
    { value: "DAV public school", label: "DAV public school" },
    {
      value: "Dayananda Saraswati Public School",
      label: "Dayananda Saraswati Public School",
    },
    {
      value: "Vidya Bharti mandir school 222",
      label: "Vidya Bharti mandir school 222",
    },
    {
      value: "1111",
      label: "111",
    },
    {
      value: "ram Bharti mandir school delhi",
      label: "ram Bharti mandir school delhi",
    },
  ];

  const changeHandler=(val)=>{
    setSelectSchool(val.value)
  }

  return (
    <div className={styles.forCntr}>
      <div className={styles.forgotCntrIn}>
     
        <section>
          <h6>
            <Logo />
          </h6>
          <hgroup>
            <h2>FORGOTTEN YOUR PASSWORD?</h2>
            <ul>
              <li>
            <InputFields value={name} onChange={(e)=> setName(e.target.value)} type="password"  label="Change password" />
          </li>
          <li>
            <InputFields value={name} onChange={(e)=> setName(e.target.value)} type="password" label="Confirm password" />
          </li>
      
              <li>
                <ButtonGlobal title="Submit" />
              </li>
            </ul>
            <h5>&copy; 2023 CloftWare.com, All right Reserved</h5>
          </hgroup>
        </section>
      </div>
    </div>
  );
};

export default Forgotpassword;



// > Login Screen 
// School name   >  after school selection username and password will be visible.
// Username 
// Password

// Change password 
// Forgot password
// Profile 
// SignOut