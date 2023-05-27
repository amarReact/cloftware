import styles from "./addEditSch.module.css";
import { MdAddLocationAlt } from "react-icons/md";
import { WhiteBox } from "../../component/WhiteBox";
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import { useState } from "react";
const MyProfile = () => {
  const formList = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const errors = {};
    if (!formData.oldPassword) {
      errors.oldPassword = "Old Password is required";
    }
    if (!formData.newPassword) {
      errors.newPassword = "New Password is required";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      //  schoolPostFunc()
      toast.success(formData, { position: "bottom-center" });
    } else {
      toast.error("Please fill in the required field!", {
        position: "top-center",
      });
      setErrors(validationErrors);
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
            Mohan Kumar Gupta <span>Class 12th, Section A</span>
          </h4>
          <h5>
            <span>Subham Public School, Noida Uttar Pardesh</span>
          </h5>
        </aside>
      </section>

      <section className={styles.mpSectionsBot}>
        <WhiteBox width="half" className={styles.pdStr}>
          <h4>Personal Details</h4>
          <ul>
            <li>
              <span>Name :</span> <b>Mohan Kumar Gupta</b>
            </li>
            <li>
              <span>Date of Birth :</span> <b>24 Jul 1983</b>
            </li>
            <li>
              <span>Email ID :</span> <b>johndoe@example.com</b>
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
                  name="oldPassword"
                  id="oldPassword"
                  value={formData?.oldPassword}
                  label="Old Password"
                  placeholder="Enter old password..."
                  onChange={handleChange}
                  eye={true}
                />
                {errors?.oldPassword && (
                  <ErrorBox title={errors?.oldPassword} />
                )}
              </li>

              <li>
                <InputFields
                  label="New Password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new password..."
                  value={formData?.newPassword}
                  onChange={handleChange}
                  eye={true}
                />
                {errors?.newPassword && (
                  <ErrorBox title={errors?.newPassword} />
                )}
              </li>
              <li>
                <InputFields
                  eye={true}
                  label="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData?.confirmPassword}
                  placeholder="Enter confirm password..."
                  onChange={handleChange}
                  // type="password"
                />
                {errors?.confirmPassword && (
                  <ErrorBox title={errors?.confirmPassword} />
                )}
              </li>
              <li>
                <ButtonGlobal
                  title="Save"
                  size="small"
                  radius="medium"
                  width="auto"
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
