import styles from "../Fee/fee.module.css";
import { WhiteBox } from "../../component/WhiteBox";
import ButtonGlobal from "../../component/ButtonGlobal";
import { ToastContainer, toast } from "react-toastify";
// import classnames from "classnames";  
import { useNavigate } from "react-router-dom";
import { AiOutlineImport, AiOutlinePlusCircle } from "react-icons/ai";
import InputFields from "../../component/inputFields/InputFields";
import { Fragment, useState } from "react";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {BiExport, BiImport} from "react-icons/bi"
import moment from "moment";
import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../redux/constants/constants";
import { useAuthData, useUserDetailData } from "../../utlis";

const AcademicYearManagement = () => {
  const navigate = useNavigate()
  const  {userDataGlobal} = useUserDetailData()
  const token = Cookies.get('jwtToken');
  const formList = {
    title: "",
  };

  const {authList} = useAuthData()
  let YEARID = userDataGlobal?.body?.year_id

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState("")

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
               newsEventsPostFunc()
        toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
    } else {
      // toast.error("Please fill in the required field!", {position: "top-center"})
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.title.trim()) {
      errors.title = "Title is required";
    }


    return errors;
  };

  const newsEventsPostFunc = async () => {
    const newsEventList = {
      title: formData?.title,
      start_date: startDate,
      end_date: endDate,
      is_current_year: currentYear ? 1 : 0
    }

    axios
      .post(`${BASE_URL}/year/add_edit_year`, newsEventList, {
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
            navigate("/academic-year-list")
            clearTimeout(timer)
          },3000)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const currentYearHandler=()=>{
    setCurrentYear(!currentYear)
  }


  return (
    <Fragment>
      <div className={styles.feeProfileSt}>
       

        <WhiteBox topBorder={true}>
          {/* <form onSubmit={handleSubmit}> */}
            <ul className={styles.feeForm}>
              <li>
                <InputFields
                  label="Title"
                  id="title"
                  name="title"
                  placeholder="Type text here"
                  value={formData.title}
                  onChange={handleChange}
                  require
                />
                {errors?.title && <ErrorBox title={errors?.title} />}
              </li>

              <li>
                <label>Start Date <em>*</em></label>
               
                <DatePicker
                  selected={startDate}
                  // onChange={handleStartDateChange}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select start date"
                  minDate={new Date()}
                  // calendarClassName="custom-datepicker-calendar"
                  scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander"
                />
              </li>

              <li>
                <label>End Date  <em>*</em></label>
               
                <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate ? new Date(startDate.getTime() + 86400000) : null}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date (next day)"
                scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander"
              />
              </li>

              <li className={styles.threeIn }>
              <label>Select Current year</label>
              <hgroup className={styles.currentYearChk}>
                    <button className={currentYear && styles.currentYear} onClick={()=> currentYearHandler()}>
                      <span></span> Current year
                  </button>
              </hgroup>
              </li>
              
            </ul>
            <ButtonGlobal
              type="submit"
              bgColor="green"
              width="auto"
              title="Submit"
              onClick={handleSubmit}
            />
          {/* </form> */}
          <ToastContainer />
        </WhiteBox>
      </div>
    </Fragment>
  );
};

export default AcademicYearManagement;
