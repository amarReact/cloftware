import styles from "../../pageComponent/schoolDash/news/news.module.css";
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

const EditAcademicYear = ({details, setEditClass }) => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const  {userDataGlobal} = useUserDetailData()
  const navigate = useNavigate()
  const token = Cookies.get('jwtToken');
  const formList = {
    title: details?.title,
  };


  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(new Date(details?.start_date));
  const [endDate, setEndDate] = useState(new Date(details?.end_date));
  const [currentYear, setCurrentYear] = useState(details?.current_year == 1 ? true : false)

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
               editAcademicYearPostFunc()
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

  const editAcademicYearPostFunc = async () => {
    const newsEventList = {
      title: formData?.title,
      start_date: startDate,
      end_date: endDate,
      year_id: userDataGlobal?.body?.year_id,
      is_current_year: `${currentYear ? 1 : 0}`
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
            setEditClass(false)
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
        <div className={styles.newsProfiForm}>
                {/* <form onSubmit={handleSubmit}> */}
                    <ol>
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
                  scrollableYearDropdown 
                  showYearDropdown 
                  showMonthDropdown 
                  yearDropdownItemNumber={60}  
                  className="datePicker" 
                  calendarClassName="datePicketCalander"
                />
              </li>

              <li>
                <label>End Date <em>*</em></label>
               
                <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate ? new Date(startDate.getTime() + 86400000) : null}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date (next day)"
                scrollableYearDropdown 
                showYearDropdown 
                showMonthDropdown 
                yearDropdownItemNumber={60}  
                className="datePicker" 
                calendarClassName="datePicketCalander"
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
              
            </ol>
            <ButtonGlobal
              type="submit"
              bgColor="green"
              width="auto"
              title="Submit"
              onClick={handleSubmit}
            />
          {/* </form> */}
          <ToastContainer />

      </div>
    </Fragment>
  );
};

export default EditAcademicYear;
