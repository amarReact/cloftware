import styles from "../../pageComponent/schoolDash/news/news.module.css";
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useState} from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../redux/constants/constants";
import { useUserDetailData } from "../../utlis";

const EditHoliday =({setIsEdit, details})=>{

  const formList = {
    title: details?.title,
    description: details?.description,
  }
    const  {userDataGlobal} = useUserDetailData()
    const token = Cookies.get('jwtToken');
    const [selectDate, setSelectDate] = useState(new Date(details?.date));
    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});

    const formatDate = (date) => {
      return moment(date).format("YYYY-MM-DD");
    };

    const validate =(formData)=>{
        const errors = {};
          if (!formData.title) {
            errors.title = 'Title is required';
          }
          if (!formData.description) {
            errors.description = 'Description is required';
          }

         return errors;
    }
   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
             holidayEditPostFunc()
            toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
        } else {
          // toast.error("Please fill in the required field!", {position: "top-center"})
          setErrors(validationErrors);
        }
      };

      const holidayEditPostFunc = async () => {
        const classList = {
          title: formData?.title,
          year_id: userDataGlobal?.body?.year_id,
          holiday_id:details?.holiday_id,
          description: formData?.description,
          date: formatDate(selectDate)
        }
        axios
          .post(`${BASE_URL}/holiday/add_edit_holiday`, classList, {
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

    return(
        <div className={styles.newsProfiForm}>
                <form onSubmit={handleSubmit}>
                    <ol>
                        <li><InputFields
                        name="title"
                        id="title"
                        value={formData?.title}
                        label="Title" 
                        placeholder="Enter title here..." 
                        onChange={handleChange} 
                        require
                        />
                            {errors?.title && <ErrorBox title={errors?.title} />}
                        </li>

                        
                        <li>
                            <label>Date <em>*</em></label>
                            <DatePicker minDate={new Date()}
                             dateFormat="MMM d, yyyy"  scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander" selected={selectDate} onChange={(date) => setSelectDate(date)} />
                            {errors?.selectDate && <ErrorBox title={errors?.selectDate} />}
                        </li>

                        <li><InputFields
                        name="description"
                        id="description"
                        value={formData?.description}
                        label="Description" 
                        placeholder="Enter title here..." 
                        onChange={handleChange} 
                        fieldname="textarea"
                        require
                        />
                            {errors?.description && <ErrorBox title={errors?.description} />}
                        </li>
                      
                        <li><ButtonGlobal title="Save" size="small" radius="medium" width="auto" />
                       
                        </li>
                    </ol>
                </form>
           
            <ToastContainer />
        </div>
           
    )
}

export default EditHoliday;