import styles from "../news/news.module.css"
import InputFields from "../../../component/inputFields/InputFields";
import ButtonGlobal from "../../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../../component/MessageBox/ErrorBox";
import {useState} from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../redux/constants/constants";

const AddClass =({setAddClass, yearId})=>{

  const formList = {
    class_name: '',
  }
  const token = Cookies.get('jwtToken');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [names, setNames] = useState([]);
  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
         classPostFunc()
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

    const classPostFunc = async () => {
      const classList = {
        class_name: formData?.class_name,
        year_id:yearId,
        sections:names?.join(",")
      }

      axios
        .post(`${BASE_URL}/class/add_edit_class`, classList, {
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
              setAddClass(false)
              clearTimeout(timer)
            },3000)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    };

    const handleKeyPress = (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        const newName = event.target.value.trim();
  
        if (newName !== '') {
          setNames((prevNames) => [...prevNames, newName]);
          event.target.value = '';
        }
      }
    };

    const validate =(formData)=>{
        const errors = {};
          if (!formData.class_name) {
            errors.class_name = 'Class Name is required';
          }
          
          if (names.length === 0) {
            errors.sections = 'Sections is required';
          }

         return errors;
    }

      const removeSection = (id) => {
        setNames((prevNames) => {
          const updatedData = [...prevNames];
          updatedData.splice(id, 1);
          return updatedData;
        });
      };


    return(
        <div className={styles.newsProfiForm}>
                {/* <form onSubmit={handleSubmit}> */}
                    <ol>
                        <li>
                         
                           <InputFields 
                            label="Class Name" 
                            id="class_name" 
                            name="class_name" 
                            placeholder="Type text here" 
                            value={formData.class_name}
                            onChange={handleChange}  
                            require
                          />
                            {errors?.class_name && <ErrorBox title={errors?.class_name} />}
                        </li>

                        <li>
                          <label>Sections <em>*</em></label>
                          <section className={styles.sectionsMerge}>
                        <input
                        className="globalInputs"
                        name="sections"
                        id="sections"
                        label="Sections" 
                        placeholder="Enter title here..." 
                        onKeyPress={handleKeyPress}
                        />
                        {names && <aside>
                            {names.map((name, index) => (
                              <ButtonGlobal title="" bgColor="border" width="auto" size="small"  key={index}>
                                {name}
                                <b onClick={()=> removeSection(index)}>X</b>
                              </ButtonGlobal>
                            ))}
                          </aside>}
                          </section>
                          {errors?.sections && <ErrorBox title={errors?.sections} />}
                        </li>
                        
                        <li><ButtonGlobal onClick={handleSubmit} title="Save" size="small" radius="medium" width="auto" />
                       
                        </li>
                    </ol>
                {/* </form> */}
           
            <ToastContainer />
        </div>
           
    )
}

export default AddClass;