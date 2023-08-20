import styles from "../Fee/fee.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import Select from 'react-select';

const EditModule = ({setIsEdit, detail}) => {
  const token = Cookies.get('jwtToken');

  const formList = {
    module_name: detail?.module_name,
    module_id: detail?.module_id,
  };

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
        transportPostFunc();
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.module_name) {
      errors.module_name = "Module Name is required";
    }
    
    return errors;
  };

  const transportPostFunc = async () => {
    axios
      .post(`${BASE_URL}/module/add_edit_module`, formData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((response) => {
        toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast'});
        let timer = setTimeout(()=>{
          setIsEdit(false)
          clearTimeout(timer)
        },3000)
     
      })
      .catch((error) => {
        toast.error(error?.message, {autoClose: 2000, position: "top-center", className: 'customToastError'});
        console.log(error)
      });
  };

  return (
    <Fragment>
      <div className={styles.feeProfileSt +" "+ styles.feeProfileStTop}>
      
          <form onSubmit={handleSubmit}>
            <ol className={styles.feeForm +" "+styles.feeFormFull}>
              <li>
                <InputFields
                  label="Module Name"
                  id="module_name"
                  name="module_name"
                  placeholder="Type text here"
                  value={formData.module_name}
                  onChange={handleChange}
                  require
                />
                {errors?.module_name && <ErrorBox title={errors?.module_name} />}
              </li>

            </ol>
            <ButtonGlobal
              type="submit"
              bgColor="green"
              width="auto"
              title="Submit"
            />
          </form>
          <ToastContainer />

      </div>
    </Fragment>
  );
};

export default EditModule;
