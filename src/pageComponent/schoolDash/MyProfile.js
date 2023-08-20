import styles from "./addEditSch.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import { useState, useEffect } from "react";
import { useUserDetailData } from "../../utlis";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";

const MyProfile = () => {
  const token = Cookies.get('jwtToken');
  const  {userDataGlobal} = useUserDetailData()
  const [userProfileData, setUserProfileData] = useState({});

  console.log("userProfileData", userProfileData)

  const formList = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const profileData = userDataGlobal?.body 

  const validate = (formData) => {
    const errors = {};
    if (!formData.old_password) {
      errors.old_password = "Old Password is required";
    }
    if (!formData.new_password) {
      errors.new_password = "New Password is required";
    }
    if (!formData.confirm_password) {
      errors.confirm_password = "Confirm password is required";
    } else if (formData.confirm_password !== formData.new_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
       changePasswordFunc()
       setFormData({})
    } else {

      setErrors(validationErrors);
    }
  };

  const changePasswordFunc = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/change_password`,
        {
          old_password:formData?.old_password,
          new_password:formData?.new_password,
          confirm_password:formData?.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      setUserProfileData(response?.data);
      toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast' });
      setFormData(formList)
      setErrors({})
    } catch (error) {
      toast.error(error?.response?.data?.message, {autoClose: 1000, position: "top-center" });
      setFormData(formList)
      console.log(error);
    }
  };



  return (
    <div className={styles.myProfileSt}>
      <h3>My Profile</h3>
      <section className={styles.mpSections}>
        <label>
          <img src={process.env.PUBLIC_URL + "/images/man.png"} alt="" />
        </label>
        <aside>
          <h4>
            {profileData?.first_name} <span>Status : {profileData?.role_details?.status}</span>
          </h4>
          <h5>
            <span>Subham Public School, Noida Uttar Pardesh</span>
          </h5>
        </aside>
      </section>

      <section className={styles.mpSectionsBot}>
        <WhiteBox  width="half" className={styles.pdStr}>
          <h4>Personal Details</h4>
          <ul>
            <li>
              <span>Full Name :</span> <b>{profileData?.first_name}</b>
            </li>
            <li>
              <span>Date of Birth :</span> <b>24 Jul 1983</b>
            </li>
            <li>
              <span>Email ID :</span> <b>{profileData?.email_id}</b>
            </li>
            <li>
              <span>School Code :</span> <b>{profileData?.school_code}</b>
            </li>
            <li>
              <span>User Status :</span> <b>{profileData?.user_status}</b>
            </li>
            <li>
              <span>Mobile No :</span> <b>+91 9999999999</b>
            </li>
            <li>
              <span>Address :</span>{" "}
              <b>
                4663 Agriculture Lane, Miami, Florida - 33165, United States.
              </b>
            </li>
          </ul>
        </WhiteBox>
        <WhiteBox width="half" className={styles.cpStr}>
          <h4>Change Password</h4>
          <form onSubmit={handleSubmit}>
            <ol>
              <li>
                <InputFields
                  name="old_password"
                  id="old_password"
                  value={formData?.old_password}
                  label="Old Password"
                  placeholder="Enter old password..."
                  onChange={handleChange}
                  eye
                />
                {errors?.old_password && (
                  <ErrorBox title={errors?.old_password} />
                )}
              </li>

              <li>
                <InputFields
                  label="New Password"
                  name="new_password"
                  id="new_password"
                  placeholder="Enter new password..."
                  value={formData?.new_password}
                  onChange={handleChange}
                  eye
                />
                {errors?.new_password && (
                  <ErrorBox title={errors?.new_password} />
                )}
              </li>
              <li>
                <InputFields
                  eye
                  label="Confirm Password"
                  name="confirm_password"
                  id="confirm_password"
                  value={formData?.confirm_password}
                  placeholder="Enter confirm password..."
                  onChange={handleChange}
                  // type="password"
                />
                {errors?.confirm_password && (
                  <ErrorBox title={errors?.confirm_password} />
                )}
              </li>
              <li>
                <ButtonGlobal
                  title="Save"
                  size="small"
                  radius="medium"
                  width="auto"
                  bgColor="green"
                  onClick={handleSubmit}
                />
              </li>
            </ol>
          </form>
        </WhiteBox>
      </section>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
