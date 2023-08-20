import styles from "./login.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import Select from "react-select";
import { Logo } from "../../component/Logo";
import { CheckBoxGlobal } from "../../component/CheckBoxGlobal";
import { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_SCHOOL } from "../../redux/constants/constants";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie'; // Import js-cookie library
import {MdAdminPanelSettings} from "react-icons/md"
import { setAuthorizationToken } from "../../component/axiosConfig";
import { useUserDetailData } from "../../utlis";

const Login = () => {
  const formList = {
    email: "",
    password: "",
  };
  const  {userDataGlobal} = useUserDetailData()
  const [selectSchool, setSelectSchool] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [selectBoxSelect, setSelectBoxSelect] = useState(false);
  const [getSchoolCode, setGetSchoolCode] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      loginPostFunc();
    } else {
      // toast.error("Please fill in the required field!", {
      //   position: "top-center",
      // });
      setErrors(validationErrors);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  /*********select box function  start*******/
  const changeHandler = (val) => {
    const vdata = val.value.split(":")[1].trim();
    setSelectSchool(vdata);
    setSchoolName(val.value)
  };

  const continueHandler = () => {
    setSelectBoxSelect(true);
  };
  /*********select box function  end*******/

  /*********select box function  start*******/
  const schoolSelectFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL_SCHOOL}/get_school_name_code`
      );
      setGetSchoolCode(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const options =
    getSchoolCode &&
    getSchoolCode?.body?.map((item, ind) => {
      return {
        label: `${item?.school_name_code} : ${item?.scl_id}`,
        value: `${item?.school_name_code} : ${item?.scl_id}`,
      };
    });
  /*********select box function  end*******/


  /*********login function  start*******/

  const loginPostFunc = async () => {
    const userLogin = {
      email: formData?.email,
      password: formData?.password,
      school_id: parseInt(selectSchool),
    };

    try {
      const response = await axios.post(`${BASE_URL}/login`, userLogin);
      const responseData = response.data;

      if (responseData.success) {
        const token = responseData?.body?.token;
        localStorage.setItem("user", JSON.stringify(responseData?.body));
        Cookies.set('jwtToken', token); // Add this line
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthorizationToken(token);
        toast.success(responseData?.message, {autoClose: 2000, position: "top-center", className: 'customToast' });
        const auth = JSON.parse(localStorage.getItem("user"));
      
        let timer = setTimeout(() => {
          switch (auth?.role_id) {
            case 1:
              return navigate("/super-admin-dashboard");
            case 2:
              return navigate("/school-dashboard");
            case 3:
              return navigate("/teacher-dashboard");
            case 4:
              return navigate("/student-dashboard");
            default:
              return null;
          }
          clearTimeout(timer);
        }, 3000);
      } else {
        const errorCode = responseData.code;
        const errorMessage = responseData.message;
        toast.error(responseData?.message, { position: "top-center" });
        setErrors({})
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {autoClose: 1000, position: "top-center" });
      console.log(error);
    }
  };

  // useEffect(() => {
  //   toast.error("Success message", { autoClose: 200000000, position: "top-center", className: 'customToastError' });
  //   toast.success("Success message", { autoClose: 200000000, position: "top-center", className: 'customToast' });
  // }, []);

 
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password must be more than 3 characters";
    }
    return errors;
  };
  /*********login function  end*******/

  useEffect(() => {
    schoolSelectFunc();
  }, []);


  const backHandler=()=>{
    setSelectBoxSelect(!selectBoxSelect)
    setSelectSchool("")
    setIsChecked(false)
  }

  const superAdminHandler=()=>{
    setSelectBoxSelect(!selectBoxSelect)
    setSchoolName("")
  }


  /*********if useer login start*******/
  // useEffect(() => {

  //   // if (authList) {
  //   //   userRoleBaseFunc();
  //   // }
  // }, []);
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
            <h2>Welcome {(selectBoxSelect && schoolName) || "Cloftware solutions"}</h2>
            <p>Enter your credentials to access your account</p>

            {!selectBoxSelect ? (
              <ul>
                {options && (
                  <li>
                    <label>Select your school</label>
                    <Select
                      options={options}
                      onChange={changeHandler}
                      className="loginSelectGlb"
                      
                    />
                  </li>
                )}
                <li className={styles.twoSides}>
                  <button className={styles.gbtn}>
                    <AiFillGoogleCircle /> Sign in With Google
                  </button>
                  <button onClick={()=> superAdminHandler()} className={styles.gbtn}>
                    <MdAdminPanelSettings /> Super Admin
                  </button>
                </li>

                <li>
                  <CheckBoxGlobal
                    className={styles.checkbox}
                    title="I Agree to the terms & Condition"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </li>
                <li className={styles.btnFor}>
                  <ButtonGlobal
                    title="Continue"
                    disable={selectSchool && isChecked ? false : true}
                    onClick={continueHandler}
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <InputFields
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                  />
                  {errors?.email && <ErrorBox title={errors?.email} />}
                </li>
                <li>
                  <InputFields
                    eye={true}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                  />
                   {errors?.password && <ErrorBox title={errors?.password} />}
                  <button className={styles.forgotPass}>
                    <Link onClick={backHandler} to="#">Back</Link>
                    <Link to="/forgot-password">Forgotten password?</Link>
                  </button>
                 
                </li>
                <li className={styles.btnFor}>
                  <ButtonGlobal title="Submit" onClick={handleSubmit} />
                  <ToastContainer />
                </li>
              </ul>
            )}
            <h5>&copy; 2023 Cloftware.com, All right Reserved</h5>
            <ToastContainer />
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
