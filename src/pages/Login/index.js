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

const Login = () => {
  const formList = {
    email: "",
    password: "",
  };

  const [selectSchool, setSelectSchool] = useState("");
  const [selectBoxSelect, setSelectBoxSelect] = useState(false);
  const [getSchoolCode, setGetSchoolCode] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

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
      toast.error("Please fill in the required field!", {
        position: "top-center",
      });
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

  /*******user rolebase start********/
  const userRole = 2;
  const userRoleBaseFunc = () => {
    switch (userRole) {
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
  };
  /******user role base end******/

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

      console.log("response", response)

      if (responseData.success) {
        const token = responseData?.body?.token;
        localStorage.setItem("user", JSON.stringify(responseData?.body));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success(responseData?.message, { position: "top-center" });
        let timer = setTimeout(() => {
          userRoleBaseFunc();
          clearTimeout(timer);
        }, 3000);
      } else {
        const errorCode = responseData.code;
        const errorMessage = responseData.message;
        toast.error(responseData?.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error(error?.message, { position: "top-center" });
      console.log(error);
    }
  };

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

  /*********if useer login start*******/
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard");
    }
  }, []);
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
            <h2>Welcome Cloftware solutions</h2>
            <p>Enter your credentials to access your account</p>

            {!selectBoxSelect ? (
              <ul>
                {options && (
                  <li>
                    <label>Select your school</label>
                    <Select
                      options={options}
                      onChange={changeHandler}
                      className={styles.loginSelect}
                    />
                  </li>
                )}
                <li>
                  <button className={styles.gbtn}>
                    <AiFillGoogleCircle /> Sign in With Google
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
                <li>
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
                  <button className={styles.forgotPass}>
                    <Link to="/forgot-password">Forgotten password?</Link>
                  </button>
                  {errors?.password && <ErrorBox title={errors?.password} />}
                </li>
                <li>
                  <ButtonGlobal title="Submit" onClick={handleSubmit} />
                  <ToastContainer />
                </li>
              </ul>
            )}
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
