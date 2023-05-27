import styles from "./news.module.css"
import InputFields from "../../../component/inputFields/InputFields";
import ButtonGlobal from "../../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useState} from "react";
const AddNewsEvents =()=>{
    const formList = {
        title: '',
        auther: '',
        message: '',
    }

    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});

    const validate =(formData)=>{
        const errors = {};
          if (!formData.title) {
            errors.title = 'Title is required';
          }
          if (!formData.auther) {
            errors.auther = 'Auther is required';
          }

          if (!formData.message) {
            errors.message = 'Message is required';
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
          toast.error("Please fill in the required field!", {position: "top-center"})
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

                        <li><InputFields 
                        label="Auther" 
                        name="auther"
                        id="auther"
                        placeholder="Enter auther name..." 
                        value={formData?.auther}
                        onChange={handleChange} 
                        />
                            {errors?.auther && <ErrorBox title={errors?.auther} />}
                        </li>
                      
                        <li><InputFields 
                        fieldname="textarea"
                        label="Message" 
                        name="message"
                        id="message"
                        value={formData?.message}
                        placeholder="Enter confirm password..." 
                        onChange={handleChange} 
                        />
                         {errors?.message && <ErrorBox title={errors?.message} />}
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