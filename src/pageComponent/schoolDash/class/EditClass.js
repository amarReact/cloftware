import styles from "../news/news.module.css"
import InputFields from "../../../component/inputFields/InputFields";
import ButtonGlobal from "../../../component/ButtonGlobal"
import { ToastContainer, toast } from 'react-toastify';
import { ErrorBox } from "../../../component/MessageBox/ErrorBox";
import DatePicker from "react-datepicker";
import {useState} from "react";
import Select from 'react-select';

const EditClass =()=>{
  const [selectedOptions, setSelectedOptions] = useState([]);

    const formList = {
      classname: '',
    }

    const [names, setNames] = useState([]);

    const handleKeyPress = (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        const newName = event.target.value.trim();
  
        if (newName !== '') {
          setNames((prevNames) => [...prevNames, newName]);
          event.target.value = '';
        }
      }
    };

    const options = [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
      { value: 'D', label: 'D' },
      { value: 'E', label: 'E' },
      { value: 'F', label: 'F' },
      { value: 'G', label: 'G' },
    ];

    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});

    const validate =(formData)=>{
        const errors = {};
          if (!formData.classname) {
            errors.classname = 'Class Name is required';
          }
          
          if (names.length === 0) {
            errors.sections = 'Sections is required';
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

      const handleMultiChange = (selected) => {
        setSelectedOptions(selected);
      };

      const getOptionLabel = (option) => {
        return (
          <>
            <input
              type="checkbox"
              checked={selectedOptions.some((item) => item.value === option.value)}
              onChange={() => {}}
            />
            <label>{option.label}</label>
          </>
        );
      };
      const getOptionValue = (option) => option.value;

      const menuListStyles = {
        maxHeight: 200, // set maximum height to 200px
        overflowY: 'auto', // enable vertical scrolling
      };

      const removeSection =(id)=>{
        names.splice(id,id+1)
      }


    return(
        <div className={styles.newsProfiForm}>
                <form onSubmit={handleSubmit}>
                    <ol>
                        <li><InputFields
                        name="classname"
                        id="classname"
                        value={formData?.classname}
                        label="Class Name" 
                        placeholder="Enter title here..." 
                        onChange={handleChange} 
                        />
                            {errors?.classname && <ErrorBox title={errors?.classname} />}
                        </li>

                        <li>
                          <label>Sections</label>
                        <input
                        className="globalInputs"
                        name="sections"
                        id="sections"
                        label="Sections" 
                        placeholder="Enter title here..." 
                        onKeyPress={handleKeyPress}
                        />
                        <aside>
                            {names.map((name, index) => (
                              <ButtonGlobal title="" bgColor="border" width="auto" size="small"  key={index}>
                                {name}
                                <b onClick={()=> removeSection(index)}>X</b>
                              </ButtonGlobal>
                            ))}
                          </aside>
                          {errors?.sections && <ErrorBox title={errors?.sections} />}
                        </li>

                        {/* <li>
                        <Select
                          options={options}
                          isMulti
                          getOptionLabel={getOptionLabel}
                          getOptionValue={getOptionValue}
                          onChange={handleMultiChange}
                          value={selectedOptions}
                          className="loginSelectGlb" 
                          styles={{ menuList: (provided) => ({ ...provided, ...menuListStyles }) }}

                        />
                            {errors?.sections && <ErrorBox title={errors?.sections} />}
                        </li> */}
                      
                        <li><ButtonGlobal title="Save" size="small" radius="medium" width="auto" />
                       
                        </li>
                    </ol>
                </form>
           
            <ToastContainer />
        </div>
           
    )
}

export default EditClass;