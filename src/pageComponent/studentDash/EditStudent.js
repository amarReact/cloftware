
import styles from "../schoolDash/addEditSch.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import { SuccessBox } from "../../component/MessageBox/SuccessBox"
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import classnames from 'classnames';
import Select from "react-select";
import { BASE_URL } from "../../redux/constants/constants";
import Cookies from 'js-cookie';
import axios from "axios";
import { useAuthData, useUserDetailData } from "../../utlis";

const EditStudent = ({scId, setIsEdit, className}) =>{
  const  {userDataGlobal} = useUserDetailData()
  const token = Cookies.get('jwtToken');
  const {authList} = useAuthData()
  const [studentDetailData, setStudentDetailData] = useState([])

  const [startDob, setStartDob] = useState(new Date());
  const [isGender, setIsGender] = useState("")

  const genderOptions =[
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]   

  const studentDetailFunc = async () => {
    try {
    const response = await axios.post(`${BASE_URL}/student/get_student_details`, {
      student_id: scId
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }
    );
   
    setFormData({...formData, 
      first_name : response?.data?.body?.stu_first_name, 
      last_name: response?.data?.body?.stu_last_name,
      email: response?.data?.body?.email_id,
      city: response?.data?.body?.stu_city,
      state: response?.data?.body?.stu_state,
      pin_code: response?.data?.body?.stu_pin_code,
      current_address:  response?.data?.body?.stu_current_address,
      permanent_address: response?.data?.body?.stu_permanent_address, 
      parent_name: response?.data?.body?.parent_name, 
      relationship_to_student: response?.data?.body?.relationship_to_student, 
      parent_education_level: response?.data?.body?.parent_education_level, 
      parents_occupations: response?.data?.body?.parents_occupations, 
      registration_source: response?.data?.body?.registration_source, 
      phone_number: response?.data?.body?.phone_number,  
      parent_income: response?.data?.body?.parent_income,  
      emg_contact_number: response?.data?.body?.emg_contact_number,  
      emg_contact_name: response?.data?.body?.emg_contact_name,  
      emg_email_id: response?.data?.body?.emg_email_id,  
      emg_relationship_to_student: response?.data?.body?.emg_relationship_to_student,  
    }) 

    setStartDob(new Date(response?.data?.body?.stu_dob))
    setIsGender({ value: response?.data?.body?.stu_gender, label: response?.data?.body?.stu_gender })

    } catch (error) {
      console.log(error);
    }
  }

  const formList = {
    first_name: '',
    last_name: '',
    email:'',
    gender: '',
    current_address: '',
    permanent_address: '',
    state: '',
    city: '',
    pin_code: '',
    parent_name: '',
    relationship_to_student: '',
    parent_education_level: '',
    parents_occupations: '',
    registration_source: '',
    phone_number: '',
    parent_income: '',
    emg_contact_number: '',
    emg_contact_name: '',
    emg_email_id: '',
    emg_relationship_to_student: '',
  }

  const [formData, setFormData] = useState(formList);
  const [errors, setErrors] = useState({});

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
             studentPostFunc()
        } else {
          toast.error("Please fill in the required field!", {position: "top-center"})
          setErrors(validationErrors);
        }
      };


      const validate = (formData) => {
        const errors = {};
        if (!formData.first_name) {
          errors.first_name = 'First Name is required';
        }
        if (!formData.last_name) {
          errors.last_name = 'Last name is required';
        }
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Invalid email address';
        }
  
        if (!formData.current_address) {
          errors.current_address = 'Current address is required';
        }
        if (!formData.permanent_address) {
          errors.permanent_address = 'Permanent address is required';
        }
        if (!formData.state) {
          errors.state = 'State is required';
        }

        if (!formData.city) {
          errors.city = 'City is required';
        }
        if (!formData.pin_code) {
          errors.pin_code = 'Pincode is required';
        }
        if (!formData.parent_name) {
          errors.parent_name = 'Parent name is required';
        }
        if (!formData.relationship_to_student) {
          errors.relationship_to_student = 'Relationship to student is required';
        }
   

        if (!formData.parents_occupations) {
          errors.parents_occupations = 'Parents occupations is required';
        }

        if (!formData.phone_number) {
          errors.phone_number = 'Phone number is required';
        }  

           if (!formData.emg_email_id) {
          errors.emg_email_id = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emg_email_id)) {
          errors.emg_email_id = 'Invalid email address';
        }


        if (!isGender) {
          errors.isGender = 'Please select an Gender option.';
        }

        return errors;
      };

      const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD");
      };

      const studentPostFunc = async () => {
        const schoolList = {
          email: formData?.email,
          student_id:scId,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          dob: formatDate(startDob),
          gender: isGender?.value,
          current_address: formData?.current_address,
          permanent_address: formData?.permanent_address,
          state: formData?.state,
          city: formData?.city,
          pin_code: formData?.pin_code,
          parent_name: formData?.parent_name,
          relationship_to_student: formData?.relationship_to_student,
          parent_education_level: formData?.parent_education_level,
          parents_occupations: formData?.parents_occupations,
          phone_number: formData?.phone_number,
          parent_income: formData?.parent_income,
          emg_contact_number: formData?.emg_contact_number,
          emg_contact_name: formData?.emg_contact_name,
          emg_email_id: formData?.emg_email_id,
          emg_relationship_to_student: formData?.emg_relationship_to_student,

          registration_source: "Web",
          school_id: `${userDataGlobal?.body?.school_id}`,
          profile_image: "416GC9D748KG9G5D5126BH1F7KHC.jpeg",
          
        }
        axios
          .post(`${BASE_URL}/student/edit_student`, schoolList, {
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

      useEffect(()=>{
        studentDetailFunc()
      },[scId])


    return(
      <div 
      className={classnames({
        [styles.purchaseCntr]: true,
        [styles.purchaseCntrEdit]: true,
        [className]: true,
        
      })}>
      {studentDetailData &&  
      
      <div className={styles.purchaseCntr}>
      <div className={styles.allForm}>
        <section>
        <ul className={styles.formFields}>

        <li className={styles.threeIn}>
          <InputFields 
            label="First Name" 
            id="first_name" 
            name="first_name" 
            placeholder="Type text here" 
            value={formData?.first_name}
            onChange={handleChange}  
            require
          />
          {errors?.first_name && <ErrorBox title={errors?.first_name} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Last name" 
            id="last_name" 
            name="last_name" 
            placeholder="Type text here" 
            value={formData?.last_name}
            onChange={handleChange}  
            require
          />
          {errors?.last_name && <ErrorBox title={errors?.last_name} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Email ID" 
            id="email" 
            name="email" 
            placeholder="Type text here" 
            value={formData?.email}
            onChange={handleChange}  
            require
          />
          {errors?.email && <ErrorBox title={errors?.email} />}
        </li>

        <li className={styles.threeIn }>
            <label>Date of Birth <em>*</em></label>
            <DatePicker dateFormat="yyyy-MM-dd" scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60}  className="datePicker" calendarClassName="datePicketCalander" maxDate={new Date()} selected={startDob} onChange={(date) => setStartDob(date)}  />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Current address" 
          id="current_address"
          name="current_address"
          value={formData?.current_address}
          placeholder="Type Current address here" 
          onChange={handleChange}  
          fieldname="textarea"
          height="medium"
          require
        />
          {errors?.current_address && <ErrorBox title={errors?.current_address} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Permanent address" 
          id="permanent_address"
          name="permanent_address"
          value={formData?.permanent_address}
          placeholder="Type Permanent address here" 
          onChange={handleChange} 
          fieldname="textarea"
          height="medium"
          require
        />
         {errors?.permanent_address && <ErrorBox title={errors?.permanent_address} />}
        </li>

        <li className={styles.threeIn }>
        <label>Gender <em>*</em></label>
        
        <Select 
        value={isGender} 
        options={genderOptions} 
        onChange={option => setIsGender(option)}
        hideSelectedOptions isSearchable={false}
        className="loginSelectGlb searchHide" />

        {errors?.isGender && <ErrorBox title={errors?.isGender} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="State" 
          id="state"
          name="state"
          value={formData?.state}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.state && <ErrorBox title={errors?.state} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="City" 
          id="city"
          name="city"
          value={formData?.city}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.city && <ErrorBox title={errors?.city} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Pincode" 
          id="pin_code"
          type="number"
          name="pin_code"
          value={formData?.pin_code}
          placeholder="Type number here" 
          onChange={handleChange}  
          require
        />
          {errors?.pin_code && <ErrorBox title={errors?.pin_code} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Parent name" 
          id="parent_name"
          name="parent_name"
          value={formData?.parent_name}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.parent_name && <ErrorBox title={errors?.parent_name} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Relationship to student" 
          id="relationship_to_student"
          name="relationship_to_student"
          value={formData?.relationship_to_student}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.relationship_to_student && <ErrorBox title={errors?.relationship_to_student} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Parents occupations" 
          id="parents_occupations"
          name="parents_occupations"
          value={formData?.parents_occupations}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.parents_occupations && <ErrorBox title={errors?.parents_occupations} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Parent education level " 
          id="parent_education_level"
          name="parent_education_level"
          value={formData?.parent_education_level}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.parent_education_level && <ErrorBox title={errors?.parent_education_level} />} */}
        </li>
      
        <li className={styles.threeIn }>
        <InputFields 
          label="Phone number" 
          id="phone_number"
          name="phone_number"
          value={formData?.phone_number}
          placeholder="Type number here" 
          type="number"
          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
          require
        />
          {errors?.phone_number && <ErrorBox title={errors?.phone_number} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Parent income" 
          id="parent_income"
          name="parent_income"
          type="number"
          value={formData?.parent_income}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
          {/* {errors?.parent_income && <ErrorBox title={errors?.parent_income} />} */}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency contact number " 
          id="emg_contact_number"
          type="number"
          name="emg_contact_number"
          value={formData?.emg_contact_number}
          placeholder="Type number here" 
          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
        />
          {/* {errors?.emg_contact_number && <ErrorBox title={errors?.emg_contact_number} />} */}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency contact name " 
          id="emg_contact_name"
          name="emg_contact_name"
          value={formData?.emg_contact_name}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.emg_contact_name && <ErrorBox title={errors?.emg_contact_name} />} */}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency email id " 
          type="email"
          id="emg_email_id"
          name="emg_email_id"
          value={formData?.emg_email_id}
          placeholder="Type email here" 
          onChange={handleChange}  
          require
        />
          {errors?.emg_email_id && <ErrorBox title={errors?.emg_email_id} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency relationship to student" 
          id="emg_relationship_to_student"
          name="emg_relationship_to_student"
          value={formData?.emg_relationship_to_student}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.emg_relationship_to_student && <ErrorBox title={errors?.emg_relationship_to_student} />} */}
        </li>
        </ul>

        <ButtonGlobal className={styles.nxtBtn} bgColor="green" onClick={handleSubmit} width="auto" title="Submit" />
       <ToastContainer />
        </section>

       </div>
    </div>
       
       }
    </div>
       
    )
}

export default EditStudent;