import styles from "../../pageComponent/schoolDash/news/news.module.css";
import InputFields from "../../component/inputFields/InputFields";
import ButtonGlobal from "../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useState} from "react";

const EditHoliday =()=>{
  const formList = {
    title: '',
    description:''
  }

  const [selectDate, setSelectDate] = useState(new Date());
    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});

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
            //  schoolPostFunc()
            toast.success(formData, {position: "bottom-center"});
        } else {
          // toast.error("Please fill in the required field!", {position: "top-center"})
          setErrors(validationErrors);
        }
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
                        />
                            {errors?.title && <ErrorBox title={errors?.title} />}
                        </li>

                        
                        <li>
                            <label>Date</label>
                            <DatePicker dateFormat="MMM d, yyyy"  className="datePicker" selected={selectDate} onChange={(date) => setSelectDate(date)} />
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