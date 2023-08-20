import styles from "../Fee/fee.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from "../../redux/constants/constants";
import Select from 'react-select';

const AddModule = ({setAddTransport}) => {
  const token = Cookies.get('jwtToken');

  const formList = {
    module_name: "",
  };

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [selectLiveTracker, setSelectLiveTracker] = useState("");

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
      // toast.error("Please fill in the required field!", {
      //   position: "top-center",
      // });
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.route_number) {
      errors.route_number = "Route No is required";
    }
    if (!values.vehicle_type) {
      errors.vehicle_type = "Vehicle Type is required";
    }
    if (!values.vehicle_number) {
      errors.vehicle_number = "Vehicle No is required";
    }
    if (!values.driver_name) {
      errors.driver_name = "Driver Name is required";
    }
    if (!values.driver_phone) {
      errors.driver_phone = "Driver Contact No is required";
    }
    if (!values.helper_name) {
      errors.helper_name = "Helper Name is required";
    }
    if (!values.helper_phone) {
      errors.helper_phone = "Helper Contact No is required";
    }
    if (!selectLiveTracker) {
      errors.live_tracking = "Live Tracker is required";
    }
    return errors;
  };

  const liveTrackerOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
  ];


  const transportPostFunc = async () => {

    axios
      .post(`${BASE_URL}/transport/add_edit_transport`, {...formData, live_tracking: selectLiveTracker?.value}, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((response) => {
       
        if(response?.status === 400){
          toast.error(response?.data?.message);
        } else{
          toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast'});
          let timer = setTimeout(()=>{
            setAddTransport(false)
            clearTimeout(timer)
          },3000)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <Fragment>
      <div className={styles.feeProfileSt +" "+ styles.feeProfileStTop}>
      
          <form onSubmit={handleSubmit}>
            <ol className={styles.feeForm}>
              <li>
                <InputFields
                  label="Route No"
                  id="route_number"
                  name="route_number"
                  placeholder="Type text here"
                  value={formData.route_number}
                  onChange={handleChange}
                  require
                />
                {errors?.route_number && <ErrorBox title={errors?.route_number} />}
              </li>

              <li>
                <InputFields
                  label="Vehicle Type"
                  id="vehicle_type"
                  name="vehicle_type"
                  placeholder="Type text here"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  require
                />
                {errors?.vehicle_type && <ErrorBox title={errors?.vehicle_type} />}
              </li>
              <li>
                <InputFields
                  label="Vehicle No"
                  id="vehicle_number"
                  name="vehicle_number"
                  placeholder="Type text here"
                  value={formData.vehicle_number}
                  onChange={handleChange}
                  require
                />
                {errors?.vehicle_number && <ErrorBox title={errors?.vehicle_number} />}
              </li>
              <li>
                <InputFields
                  label="Driver Name"
                  id="driver_name"
                  name="driver_name"
                  placeholder="Type text here"
                  value={formData.driver_name}
                  onChange={handleChange}
                  require
                />
                {errors?.driver_name && <ErrorBox title={errors?.driver_name} />}
              </li>
              <li>
                <InputFields
                  label="Driver Contact No"
                  id="driver_phone"
                  name="driver_phone"
                  type="number"
                  placeholder="Type text here"
                  value={formData.driver_phone}
                  onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
                  require
                />
                {errors?.driver_phone && <ErrorBox title={errors?.driver_phone} />}
              </li>

              <li>
                <InputFields
                  label="Helper Name"
                  id="helper_name"
                  name="helper_name"
                  placeholder="Type text here"
                  value={formData.helper_name}
                  onChange={handleChange}
                  require
                />
                {errors?.helper_name && <ErrorBox title={errors?.helper_name} />}
              </li>

              <li>
                <InputFields
                  label="Helper Contact No"
                  id="helper_phone"
                  name="helper_phone"
                  type="number"
                  placeholder="Type text here"
                  value={formData.helper_phone}
                  onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
                  require
                />
                {errors?.helper_phone && <ErrorBox title={errors?.helper_phone} />}
              </li>

              <li>
                {/* <InputFields
                  label="Live Tracker"
                  id="live_tracking"
                  name="live_tracking"
                  placeholder="Type text here"
                  value={formData.live_tracking}
                  onChange={handleChange}
                  require
                /> */}
                  <label>Live Tracker <em>*</em></label>
                  <Select
                  value={selectLiveTracker}
                  options={liveTrackerOptions}
                  onChange={(option) => setSelectLiveTracker(option)}
                  maxMenuHeight={130}
                  className="loginSelectGlb"
                />

                {errors?.live_tracking && <ErrorBox title={errors?.live_tracking} />}
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

export default AddModule;
