import styles from "../../pageComponent/schoolDash/news/news.module.css"
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useState} from "react";
import Select from 'react-select';
import Cookies from 'js-cookie';
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../redux/constants/constants";
import AllCamera from "./AllCamera";
import Camera from "./Camera";

const EditVisitor =({setIsEdit, details})=>{
  console.log("details", details)

  const formList = {
    name: details?.name,
    purpose: details?.purpose,
    phone: details?.phone,
    person_to_be_visited: details?.person_to_be_visited,
  }

  const token = Cookies.get('jwtToken');
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [entryDob, setEntryDob] = useState(new Date());
  const [exitDob, setExitDob] = useState(new Date());
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
         visitorPostFunc()
        toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
    } else {
      // toast.error("Please fill in the required field!", {position: "top-center"})
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

    const visitorPostFunc = async () => {
      const visitorList = {
        ...formData,
        entry_date_time: formatDate(entryDob),
        exit_date_time: formatDate(exitDob),
        visitor_id:details?.visitorID
      }

      axios
        .post(`${BASE_URL}/visitor/add_edit_visitor`, visitorList, {
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
              setIsEdit(false)
              clearTimeout(timer)
            },3000)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    };

    const validate =(formData)=>{
        const errors = {};
          if (!formData.name) {
            errors.name = 'Name is required';
          }
          if (!formData.purpose) {
            errors.purpose = 'Purpose is required';
          }
          if (!formData.phone) {
            errors.phone = 'Phone number is required';
          }
          if (!formData.person_to_be_visited) {
            errors.person_to_be_visited = 'Person to be visited is required';
          }
         
         return errors;
    }

    console.log("formData", formData)
    

    return(
        <div className={styles.newsProfiForm}>
                <form onSubmit={handleSubmit}>
                    <ol className={styles.threeparts}>
                        <li>
                           <InputFields 
                            label="Name Of visitor" 
                            id="name" 
                            name="name" 
                            placeholder="Type text here" 
                            value={formData.name}
                            onChange={handleChange}  
                            require
                          />
                            {errors?.name && <ErrorBox title={errors?.name} />}
                        </li>

                        <li>
                         <InputFields 
                          label="Purpose of visit" 
                          id="purpose" 
                          name="purpose" 
                          placeholder="Type text here" 
                          value={formData.purpose}
                          onChange={handleChange}  
                          fieldname="textarea"
                          height="medium"
                          require
                        />
                          {errors?.purpose && <ErrorBox title={errors?.purpose} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Phone" 
                          id="phone" 
                          name="phone" 
                          placeholder="Type text here" 
                          value={formData.phone} 
                          type="number"
                          require
                          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
                        />
                          {errors?.phone && <ErrorBox title={errors?.phone} />}
                      </li>

                      <li>
                         <InputFields 
                          label="Person to be visited" 
                          id="person_to_be_visited" 
                          name="person_to_be_visited" 
                          placeholder="Type text here" 
                          value={formData.person_to_be_visited}
                          onChange={handleChange}  
                          require
                        />
                          {errors?.person_to_be_visited && <ErrorBox title={errors?.person_to_be_visited} />}
                      </li>

                      <li>
                        <label>Entry Time <em>*</em></label>
                          <DatePicker
                            className="datePicker"
                            selected={entryDob}
                            onChange={(date) => setEntryDob(date)}
                            calendarClassName="datePicketCalander"
                            scrollableYearDropdown 
                            showYearDropdown 
                            showMonthDropdown 
                            yearDropdownItemNumber={60} 
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            dateFormat="yyyy-MM-dd HH:mm"
                          />
                          {/* {errors?.student_phone && <ErrorBox title={errors?.student_phone} />} */}
                      </li>
                      <li>
                        <label>Exit Time <em>*</em></label>
                          <DatePicker
                         className="datePicker"
                         selected={exitDob}
                         onChange={(date) => setExitDob(date)}
                         calendarClassName="datePicketCalander"
                         scrollableYearDropdown 
                         showYearDropdown 
                         showMonthDropdown 
                         yearDropdownItemNumber={60} 
                         showTimeSelect
                         timeFormat="HH:mm"
                         timeIntervals={10}
                         dateFormat="yyyy-MM-dd HH:mm"
                          />
                          {/* {errors?.student_phone && <ErrorBox title={errors?.student_phone} />} */}
                      </li>

                      <li className={styles.fullVideo}>
                     
                        {/* <AllCamera /> */}
                        <Camera />
                      </li>
            
                        <li className={styles.fullLi}><ButtonGlobal title="Save" bgColor="green" size="medium" radius="medium" width="auto" />
                       
                        </li>
                    </ol>
                </form>
           
            <ToastContainer />
        </div>
           
    )
}

export default EditVisitor;