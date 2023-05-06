import styles from "./login.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/checkboxGlobal/CheckBoxGlobal";
import { useEffect, useState } from "react";
import {AiFillGoogleCircle} from "react-icons/ai"
import { Link } from "react-router-dom";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../redux/constants/constants";

const Login = () => {
  const [selectSchool, setSelectSchool] = useState("")
  const [selectBoxSelect, setSelectBoxSelect] = useState(false)
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  /*********select box function  start*******/
  const changeHandler=(val)=>{
    setSelectSchool(val.value)
  }

  const continueHandler =()=>{
    setSelectBoxSelect(true)
  }
    /*********select box function  end*******/

      /*********login function  start*******/
  const loginPostFunc = async () => {
    const userLogin = {
      "email": name,
      "password": password,
      "school_id":2
    }

    axios
      .post("https://aa8b-203-212-233-211.ngrok-free.app/api/login", userLogin)
      .then((response) => {
        const token = response?.data?.body?.token;
        localStorage.setItem("user", JSON.stringify(response?.data?.body));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if(token){
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && password) {
      loginPostFunc()
    } else {
      if (!name) {
        setNameError("Name cannot be empty");
      }
      if (!password) {
        setPasswordError("Password cannot be empty");
      }
    }
  };
      /*********login function  end*******/

        /*********if useer login start*******/
        useEffect(()=>{
          const auth = localStorage.getItem("user")
          if(auth){
              navigate("/dashboard")
          }
        },[])
        /*********if useer login start  end*******/

  return (
    <div className={styles.loginCntr}>
      <div className={styles.loginCntrIn}>
        <aside>
          <hgroup>
            <h2>
              The simplest way to manage <span>your workflow</span>
            </h2>
            <p>Education and softwere solution provider</p>
            <main>
              <img src={process.env.PUBLIC_URL + "/images/log.png"} alt="" />
            </main>
          </hgroup>
        </aside>
        <section>
          <h6>
            <Logo />
          </h6>
          <hgroup>
            <h2>Welcome ASA solutions</h2>
            <p>Enter your credentials to access your account</p>

            {!selectBoxSelect ? 
            <ul>
            <li>
                <label>Select your school</label>
                <Select options={options} onChange={changeHandler} className={styles.loginSelect} />
              </li>
              <li>
                <button className={styles.gbtn}><AiFillGoogleCircle /> Sign in With Google</button>
              </li>
         
              <li>
                <CheckBoxGlobal
                  className={styles.checkbox}
                  title="I Agree to the terms & Condition"
                />
              </li>
              <li>
                <ButtonGlobal title="Continue" disable={selectSchool ? false : true} onClick={continueHandler} />
              </li>
            </ul>
            :
              <ul>
              <li>
  
            <InputFields value={name}  onChange={(event) => {
            setName(event.target.value);
            setNameError("");
          }}
           label="Username" />
           {nameError && <ErrorBox title={nameError} ></ErrorBox>}
          </li>
          <li>
            <InputFields value={password} 
            onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError("");
          }} type="password" label="Password" />
            <button className={styles.forgotPass}><Link to="/forgot-password">Forgotten password?</Link></button>
            {passwordError && <ErrorBox title={passwordError} ></ErrorBox>}
          </li>
          <li>
                <ButtonGlobal title="Submit" onClick={handleSubmit} />
              </li>
              </ul>          
             }
            <h5>&copy; 2023 CloftWare.com, All right Reserved</h5>
          </hgroup>
        </section>
      </div>
    </div>
  );
};

export default Login;



// > Login Screen 
// School name   >  after school selection username and password will be visible.
// Username 
// Password

// Change password 
// Forgot password
// Profile 
// SignOut