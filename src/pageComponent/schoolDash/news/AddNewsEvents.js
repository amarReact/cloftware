import styles from "./news.module.css"
import InputFields from "../../../component/inputFields/InputFields";
import ButtonGlobal from "../../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import {useState} from "react";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../../redux/constants/constants";

const AddNewsEvents =({setAddNews, yearID})=>{
  const token = Cookies.get('jwtToken');
    const formList = {
        title: '',
        description: '',
    }

    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});
    const [selectDate, setSelectDate] = useState(new Date());

    const formatDate = (date) => {
      return moment(date).format("YYYY-MM-DD");
    };

    const validate =(formData)=>{
        const errors = {};
          if (!formData.title?.trim()) {
            errors.title = 'Title is required';
          }

          if (!formData.description?.trim()) {
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
                   newsEventsPostFunc()
            toast.success(formData, {autoClose: 2000, position: "top-center", className: 'customToast'});
        } else {
          // toast.error("Please fill in the required field!", {position: "top-center"})
          setErrors(validationErrors);
        }
      };

      const newsEventsPostFunc = async () => {
        const newsEventList = {
          title: formData?.title,
          description:formData?.description,
          date:formatDate(selectDate),
          year_id:yearID
        }
  
        axios
          .post(`${BASE_URL}/event/add_edit_events`, newsEventList, {
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
                setAddNews(false)
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
                            <DatePicker  minDate={new Date()} dateFormat="MMM d, yyyy" scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander" selected={selectDate} onChange={(date) => setSelectDate(date)} />
                            {errors?.selectDate && <ErrorBox title={errors?.selectDate} />}
                        </li>
                      
                        <li><InputFields 
                        fieldname="textarea"
                        label="Description" 
                        name="description"
                        id="description"
                        value={formData?.description}
                        placeholder="Enter Message..." 
                        onChange={handleChange} 
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

export default AddNewsEvents;