
import styles from "../schoolDash/addEditSch.module.css";
import ButtonGlobal from "../../component/ButtonGlobal";
import InputFields from "../../component/inputFields/InputFields";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ErrorBox } from "../../component/MessageBox/ErrorBox";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import classnames from 'classnames';
import { BASE_URL } from "../../redux/constants/constants";
import Select from "react-select";
import axios from "axios";
import Cookies from 'js-cookie';
import { useAuthData,  useUserDetailData} from "../../utlis";

const EditTeacher = ({techId, setIsEdit, className}) =>{
  const  {userDataGlobal} = useUserDetailData()
  const token = Cookies.get('jwtToken');
  const [skillData, setSkillData] = useState([]);
  const [interestsData, setInterestsData] = useState([]);
  const [hobbiesData, setHobbiesData] = useState(null);
  const [employmentStatus, setEmploymentStatus] = useState("")

  const [studentDetailData, setStudentDetailData] = useState([])
  const [isTitleMr, setIsTitleMr] = useState("")
  const [startDob, setStartDob] = useState(new Date());
  const [dateHiring, setDateHiring] = useState(new Date());
  const [isGender, setIsGender] = useState("")
  const [isMaritalStatus, setIsMaritalStatus] = useState("")
  const [languagesSpoken, setLanguagesSpoken] = useState([])

  const genderOptions =[
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]   

  const languages = ["hindi", "english", "others"]

   /*******manage skill start***/
   const handleKeyPress = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      const newName = event.target.value.trim();

      if (newName !== '') {
        setSkillData((prevNames1) => [...prevNames1, newName]);
        event.target.value = '';
      }
    }
  };

  const removeSection = (id) => {
    setSkillData((prevNames1) => {
      const updatedData = [...prevNames1];
      updatedData.splice(id, 1);
      return updatedData;
    });
  };
    /*******manage skill end***/

    /*******manage interestsData start***/
  const handleKeyPressInterests = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      const newName = event.target.value.trim();

      if (newName !== '') {
        setInterestsData((prevNames) => [...prevNames, newName]);
        event.target.value = '';
      }
    }
  };

  const removeInterests = (id) => {
    setInterestsData((prevNames) => {
      const updatedData = [...prevNames];
      updatedData.splice(id, 1);
      return updatedData;
    });
  };
    /*******manage interestsData end***/

      /*******manage setHobbiesData start***/
  const handleKeyPressHobbies = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      const newName = event.target.value.trim();

      if (newName !== '') {
        setHobbiesData((prevNames) => [...prevNames, newName]);
        event.target.value = '';
      }
    }
  };

  const removeHobbies = (id) => {
    setHobbiesData((prevNames) => {
      const updatedData = [...prevNames];
      updatedData.splice(id, 1);
      return updatedData;
    });
  };
    /*******manage setHobbiesData end***/

  const studentDetailFunc = async () => {
    try {
    const response = await axios.post(`${BASE_URL}/teacher/get_teacher_details`, {
      teacher_id: techId
    },
    {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }
    );
   
    setStudentDetailData(response?.data?.body)
    
    setFormData({...formData, 
      teacher_id: techId,
      school_id: userDataGlobal?.body?.school_id,
      email: response?.data?.body?.email_id,
      first_name: response?.data?.body?.first_name,
      last_name: response?.data?.body?.first_name,
      address_line1: response?.data?.body?.address_line1,
      state: response?.data?.body?.state,
      city: response?.data?.body?.city,
      pin_code: response?.data?.body?.pin_code,
      phone_number:response?.data?.body?.phone_number,
      job_title: response?.data?.body?.teacher_other_details?.job_title,
      
      middle_name: response?.data?.body?.middle_name,
      social_security_number: response?.data?.body?.social_security_number,
      emergency_contact_name: response?.data?.body?.emergency_contact_name,
      emergency_contact_relationship: response?.data?.body?.emergency_contact_relationship,
      emergency_phone_number: response?.data?.body?.emergency_phone_number,
      spouse_name: response?.data?.body?.spouse_name,
      dependents: response?.data?.body?.dependents,
      educational_qualifications: response?.data?.body?.educational_qualifications,
      teaching_certifications: response?.data?.body?.teaching_certifications,
      previous_teaching_experience: response?.data?.body?.previous_teaching_experience,

      address_line2: response?.data?.body?.address_line2,
      primary_teaching_location: response?.data?.body?.primary_teaching_location,
      secondary_teaching_location: response?.data?.body?.secondary_teaching_location,
      professional_development_courses: response?.data?.body?.professional_development_courses,
      professional_development_certificates: response?.data?.body?.professional_development_certificates,
      professional_development_goals: response?.data?.body?.professional_development_goals, 
      emp_id: response?.data?.body?.teacher_other_details?.emp_id, 
      work_schedule: response?.data?.body?.teacher_other_details?.work_schedule, 
      job_description: response?.data?.body?.teacher_other_details?.job_description, 
      performance_evaluations: response?.data?.body?.teacher_other_details?.performance_evaluations, 
      disciplinary_actions: response?.data?.body?.teacher_other_details?.disciplinary_actions, 
      reason_for_termination: response?.data?.body?.teacher_other_details?.reason_for_termination, 
      salary_amount: response?.data?.body?.teacher_other_details?.salary_amount, 
      pay_frequency: response?.data?.body?.teacher_other_details?.pay_frequency, 
      bank_name: response?.data?.body?.teacher_other_details?.bank_name, 
      account_number:response?.data?.body?.teacher_other_details?.account_number, 
      ifcs_code:response?.data?.body?.teacher_other_details?.ifcs_code,
      routing_number:response?.data?.body?.teacher_other_details?.routing_number,
      tax_information:response?.data?.body?.teacher_other_details?.tax_information,
      retirement_plan_information:response?.data?.body?.teacher_other_details?.retirement_plan_information,
      insurance_information:response?.data?.body?.teacher_other_details?.insurance_information,
      background_check_results:response?.data?.body?.teacher_other_details?.background_check_results,
      drug_test_results:response?.data?.body?.teacher_other_details?.drug_test_results,
      driving_record: response?.data?.body?.teacher_other_details?.driving_record,
      
      nationality: "Indian",
      country: "Indian"
    }) 

    setIsTitleMr({ value: response?.data?.body?.title, label: response?.data?.body?.title })
    setIsGender({ value: response?.data?.body?.gender, label: response?.data?.body?.gender })
    setIsMaritalStatus({ value: response?.data?.body?.marital_status, label: response?.data?.body?.marital_status })
    setStartDob(new Date(response?.data?.body?.dob));
    setDateHiring(new Date(response?.data?.body?.teacher_other_details?.date_hiring))
    setLanguagesSpoken(response?.data?.body?.languages_spoken?.split(","))
    setSkillData(response?.data?.body?.skills ? response?.data?.body?.skills?.split(",") : [])
    setInterestsData(response?.data?.body?.interests ? response?.data?.body?.interests?.split(",") : [])
    setHobbiesData(response?.data?.body?.hobbies ? response?.data?.body?.hobbies?.split(",") : [])
    setEmploymentStatus({ value: response?.data?.body?.teacher_other_details?.employment_status, label: response?.data?.body?.teacher_other_details?.employment_status })

    } catch (error) {
      console.log(error);
    }
  }

  const formList = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email:'',
    phone_number: '',
    address_line1: '',
    job_title:'',
  
    state: '',
    city: '',
    pin_code: '',

    social_security_number: '',
    emergency_contact_name: '',
    emergency_contact_relationship: '',
    emergency_phone_number:'',
    spouse_name:'',
    dependents: '',
    educational_qualifications: '',
    teaching_certifications:'',
    previous_teaching_experience: '',

    address_line2: '',
    primary_teaching_location:'',
    secondary_teaching_location:'',
    professional_development_courses:'',
    professional_development_certificates:'',
    professional_development_goals:'',
    emp_id:'',
    work_schedule: '',
    job_description: '',
    performance_evaluations:'',
    disciplinary_actions:'',
    reason_for_termination: '',
    salary_amount:'',
    pay_frequency:'',
    bank_name:'',
    account_number:'',
    ifcs_code:'',
    routing_number: '',
    tax_information:'',
    retirement_plan_information: '',
    insurance_information:'',
    background_check_results:'',
    drug_test_results:'',
    driving_record:''
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
             teacherPostFunc()
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
        if (!formData.job_title) {
          errors.job_title = 'Job Title is required';
        }  
   
        if (!formData.address_line1) {
          errors.address_line1 = 'Address is required';
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
    
        if (!formData.phone_number) {
          errors.phone_number = 'Phone number required';
        }
       
        if (!isGender) {
          errors.gender = 'Please select an Gender option.';
        }

        if (!isTitleMr) {
          errors.titleMr = 'Please select an Title option.';
        }

        if (!isMaritalStatus) {
          errors.maritalStatus = 'Please select an Marital Status option.';
        }

        if (languagesSpoken.length === 0) {
          errors.language = 'Please select at least one language';
        }

        if (!employmentStatus) {
          errors.employment_status = 'Employment status is required';
        }  

        return errors;
      };

      const titleMrOptions = [
        { value: "Mr.", label: "Mr." },
        { value: "Ms.", label: "Ms." },
        { value: "Mrs.", label: "Mrs." },
        { value: "Dr.", label: "Dr." },
        { value: "Prof.", label: "Prof." }
      ]

      const maritalStatusOptions = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
      ]

      const employmentStatusOption = [
        { value: "Salaried", label: "Salaried" },
        { value: "Unemployed", label: "Unemployed" },
        { value: "Selfemployed", label: "Selfemployed" },
      ]

      const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD");
      };

      const handleCheckboxChange=(name)=>{
        if(languagesSpoken.includes(name)){
          setLanguagesSpoken(languagesSpoken.filter((item)=> item !== name ))
        }
        else(
          setLanguagesSpoken([...languagesSpoken, name])
        )
     
      }

      const teacherPostFunc = async () => {
        let languagesSpokenList =  languagesSpoken.join(',')

        const teacherList = {
          school_id: `${userDataGlobal?.body?.school_id}`,
          teacher_id: techId,
          email: formData?.email,
          title: isTitleMr?.value,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          dob: formatDate(startDob),
          gender: isGender?.value,
          address_line1: formData?.address_line1,
          state: formData?.state,
          city: formData?.city,
          pin_code: formData?.pin_code,
          phone_number:formData?.phone_number,
          marital_status:isMaritalStatus?.value,
          job_title: formData?.job_title,
          date_hiring: formatDate(dateHiring),
          languages_spoken:languagesSpokenList,
          
          middle_name: formData?.middle_name,
          social_security_number: formData?.social_security_number,
          emergency_contact_name: formData?.emergency_contact_name,
          emergency_contact_relationship:  formData?.emergency_contact_relationship,
          emergency_phone_number: formData?.emergency_phone_number,
          spouse_name: formData?.spouse_name,
          dependents: formData?.dependents, 
          educational_qualifications: formData?.educational_qualifications,  
          teaching_certifications: formData?.teaching_certifications,
          previous_teaching_experience: formData?.previous_teaching_experience, 

          address_line2: formData?.address_line2,
          primary_teaching_location: formData?.primary_teaching_location,
          secondary_teaching_location: formData?.secondary_teaching_location,
          professional_development_courses: formData?.professional_development_courses,
          professional_development_certificates: formData?.professional_development_certificates, 
          professional_development_goals: formData?.professional_development_goals, 
          skills: skillData?.join(","), 
          interests: interestsData?.join(","), 
          hobbies: hobbiesData?.join(","),   
          emp_id: formData?.emp_id, 
          work_schedule: formData?.work_schedule, 
          job_description:formData?.job_description, 
          performance_evaluations:formData?.performance_evaluations, 
          disciplinary_actions:formData?.disciplinary_actions, 
          reason_for_termination: formData?.reason_for_termination,
          salary_amount: formData?.salary_amount,
          pay_frequency: formData?.pay_frequency,
          bank_name: formData?.bank_name,
          account_number: formData?.account_number,
          ifcs_code: formData?.ifcs_code,
          routing_number: formData?.routing_number,
          tax_information: formData?.tax_information,
          retirement_plan_information:formData?.retirement_plan_information,
          insurance_information:formData?.insurance_information,
          background_check_results:formData?.background_check_results,
          drug_test_results:formData?.drug_test_results,
          driving_record: formData?.driving_record,
          employment_status: employmentStatus?.value,
          nationality: "Indian",
          country: "Indian"
          
        }

        axios
          .post(`${BASE_URL}/teacher/add_edit_teacher`, teacherList, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          })
          .then((response) => {
            if(response?.status == 400 || response?.code == 400){
              toast.error(response?.data?.message, {position: "bottom-center"});
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
        
      },[techId])

      console.log('skillData', skillData)

    return(
      <div 
      className={classnames({
        [styles.purchaseCntr]: true,
        [styles.purchaseCntrEdit]: true,
        [className]: true,
        
      })}>
      {
      studentDetailData &&  
      
      <div className={styles.purchaseCntr}>
      <div className={styles.allForm}>
      <section>
        <ul className={styles.formFields}>

        <li className={styles.threeIn }>
        <label>Title <em>*</em></label>
      <Select 
        value={isTitleMr} 
        options={titleMrOptions} 
        onChange={option => setIsTitleMr(option)}
        className="loginSelectGlb"
         />
        {errors?.titleMr && <ErrorBox title={errors?.titleMr} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="First Name" 
            id="first_name" 
            name="first_name" 
            placeholder="Type text here" 
            value={formData.first_name}
            onChange={handleChange}  
            require
          />
          {errors?.first_name && <ErrorBox title={errors?.first_name} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Middle name" 
            id="middle_name" 
            name="middle_name" 
            placeholder="Type text here" 
            value={formData.middle_name}
            onChange={handleChange}  
          />
          {/* {errors?.middle_name && <ErrorBox title={errors?.middle_name} />} */}
        </li>


        <li className={styles.threeIn}>
          <InputFields 
            label="Last name" 
            id="last_name" 
            name="last_name" 
            placeholder="Type text here" 
            value={formData.last_name}
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
            type="email"
            placeholder="Type email here" 
            value={formData.email}
            onChange={handleChange}  
            require
          />
          {errors?.email && <ErrorBox title={errors?.email} />}
        </li>
          
        <li className={styles.threeIn }>
        <label>Gender <em>*</em></label>
        <Select 
         value={isGender} 
        options={genderOptions} 
        onChange={option => setIsGender(option)}
        hideSelectedOptions isSearchable={false}
        className="loginSelectGlb searchHide" />
        {errors?.gender && <ErrorBox title={errors?.gender} />}
        </li>

  

        <li className={styles.threeIn }>
            <label>Date of Birth <em>*</em></label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={startDob} onChange={(date) => setStartDob(date)} scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60} calendarClassName="datePicketCalander" maxDate={new Date()} />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Phone number" 
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          placeholder="Type number here" 
          onChange={(e) => (e.target.value.length <= 10 ? handleChange(e) : null)}
          type="number"
          require
        />
          {errors?.phone_number && <ErrorBox title={errors?.phone_number} />}
        </li>

        <li className={styles.threeIn }>
        <label>Marital Status <em>*</em></label>
        <Select 
        value={isMaritalStatus} 
        options={maritalStatusOptions} 
        onChange={option => setIsMaritalStatus(option)}
        hideSelectedOptions isSearchable={false}
        className="loginSelectGlb searchHide" />
        {errors?.maritalStatus && <ErrorBox title={errors?.maritalStatus} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="State" 
          id="state"
          name="state"
          value={formData.state}
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
          value={formData.city}
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
          name="pin_code"
          value={formData.pin_code}
          placeholder="Type number here" 
          onChange={handleChange}  
          require
          type="number"
        />
          {errors?.pin_code && <ErrorBox title={errors?.pin_code} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Address Line 1" 
          id="address_line1"
          name="address_line1"
          value={formData.address_line1}
          placeholder="Type Address Line 1 here" 
          onChange={handleChange}  
          fieldname="textarea"
          height="medium"
          require
        />
          {errors?.address_line1 && <ErrorBox title={errors?.address_line1} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Job title " 
          id="job_title"
          name="job_title"
          value={formData.job_title}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        />
          {errors?.job_title && <ErrorBox title={errors?.job_title} />}
        </li>


        <li className={styles.threeIn }>
           <label>Languages spoken <em>*</em></label>
           <hgroup className={styles.checkBoxCustome}>
            {languages.map((item, ind)=>{
               return (
                <button className={languagesSpoken.includes(item) && styles.activated} onClick={()=> handleCheckboxChange(item)} key={item}>
                  <span></span>{item}
               </button>
               )
            })}
            
           </hgroup>
          {errors?.language && <ErrorBox title={errors?.language} />}
        </li>

        <li className={styles.threeIn }>
            <label>Hiring Date <em>*</em></label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={dateHiring} onChange={(date) => setDateHiring(date)} calendarClassName="datePicketCalander" scrollableYearDropdown showYearDropdown showMonthDropdown yearDropdownItemNumber={60} />
        </li>

        <li className={styles.threeIn }>
          <label>Employment status <em>*</em></label>
        <Select 
        value={employmentStatus}
        options={employmentStatusOption} 
        onChange={option => setEmploymentStatus(option)}
        hideSelectedOptions 
        isSearchable={false} 
        className="loginSelectGlb searchHide"
        />
{/*         
        <li className={styles.threeIn }>
        <InputFields 
          label="Employment status" 
          id="employment_status"
          name="employment_status"
          value={formData.employment_status}
          placeholder="Type text here" 
          onChange={handleChange}  
          require
        /> */}
          {errors?.employment_status && <ErrorBox title={errors?.employment_status} />}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Social security number" 
          id="social_security_number"
          name="social_security_number"
          value={formData.social_security_number}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.social_security_number && <ErrorBox title={errors?.social_security_number} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency contact name" 
          id="emergency_contact_name"
          name="emergency_contact_name"
          value={formData.emergency_contact_name}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.emergency_contact_name && <ErrorBox title={errors?.emergency_contact_name} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency contact relationship" 
          id="emergency_contact_relationship"
          name="emergency_contact_relationship"
          value={formData.emergency_contact_relationship}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.emergency_contact_relationship && <ErrorBox title={errors?.emergency_contact_relationship} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Emergency phone number" 
          id="emergency_phone_number"
          type="number"
          name="emergency_phone_number"
          value={formData.emergency_phone_number}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
          {/* {errors?.emergency_phone_number && <ErrorBox title={errors?.emergency_phone_number} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Spouse name" 
          id="spouse_name"
          name="spouse_name"
          value={formData.spouse_name}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.spouse_name && <ErrorBox title={errors?.spouse_name} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Dependents" 
          id="dependents"
          name="dependents"
          value={formData.dependents}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.dependents && <ErrorBox title={errors?.dependents} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Educational qualifications" 
          id="educational_qualifications"
          name="educational_qualifications"
          value={formData.educational_qualifications}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.educational_qualifications && <ErrorBox title={errors?.educational_qualifications} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Teaching certifications" 
          id="teaching_certifications"
          name="teaching_certifications"
          value={formData.teaching_certifications}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.teaching_certifications && <ErrorBox title={errors?.teaching_certifications} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Previous teaching experience" 
          id="previous_teaching_experience"
          name="previous_teaching_experience"
          value={formData.previous_teaching_experience}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
          {/* {errors?.previous_teaching_experience && <ErrorBox title={errors?.previous_teaching_experience} />} */}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Address Line 2" 
          id="address_line2"
          name="address_line2"
          value={formData.address_line2}
          placeholder="Type address line 2 here" 
          onChange={handleChange}  
        />
         {/* {errors?.address_line2 && <ErrorBox title={errors?.address_line2} />} */}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Primary teaching location" 
          id="primary_teaching_location"
          name="primary_teaching_location"
          value={formData.primary_teaching_location}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.primary_teaching_location && <ErrorBox title={errors?.primary_teaching_location} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Secondary teaching location" 
          id="secondary_teaching_location"
          name="secondary_teaching_location"
          value={formData.secondary_teaching_location}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.secondary_teaching_location && <ErrorBox title={errors?.secondary_teaching_location} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Professional development courses" 
          id="professional_development_courses"
          name="professional_development_courses"
          value={formData.professional_development_courses}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.professional_development_courses && <ErrorBox title={errors?.professional_development_courses} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Professional development certificates" 
          id="professional_development_certificates"
          name="professional_development_certificates"
          value={formData.professional_development_certificates}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.professional_development_certificates && <ErrorBox title={errors?.professional_development_certificates} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Professional development goals" 
          id="professional_development_goals"
          name="professional_development_goals"
          value={formData.professional_development_goals}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.professional_development_goals && <ErrorBox title={errors?.professional_development_goals} />} */}
        </li>

        {/* <li className={styles.threeIn }>
        <InputFields 
          label="Skills" 
          id="skills"
          name="skills"
          value={formData.skills}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {errors?.skills && <ErrorBox title={errors?.skills} />}
        </li> */}

            <li className={`${styles.threeIn} inputLists`}>
            <label>skills</label>
                        <input
                        className="globalInputs"
                        name="skills"
                        id="skills"
                        label="skills" 
                        placeholder="Enter title here..." 
                        onKeyPress={handleKeyPress}
                        />
                        {skillData && <aside>
                            {skillData?.map((name, index) => (
                              <ButtonGlobal title="" bgColor="border" width="auto" size="small"  key={index}>
                                {name}
                                <b onClick={()=> removeSection(index)}>X</b>
                              </ButtonGlobal>
                            ))}
                          </aside>}
                          {/* {errors?.sections && <ErrorBox title={errors?.sections} />} */}
           </li>

<li className={`${styles.threeIn} inputLists`}>
            <label>Interests</label>
                        <input
                        className="globalInputs"
                        name="interests"
                        id="interests"
                        label="interests" 
                        placeholder="Enter title here..." 
                        onKeyPress={handleKeyPressInterests}
                        />
                        {interestsData && <aside>
                            {interestsData?.map((name, index) => (
                              <ButtonGlobal title="" bgColor="border" width="auto" size="small"  key={index}>
                                {name}
                                <b onClick={()=> removeInterests(index)}>X</b>
                              </ButtonGlobal>
                            ))}
                          </aside>}
                          {/* {errors?.sections && <ErrorBox title={errors?.sections} />} */}
         </li>

         <li className={`${styles.threeIn} inputLists`}>
            <label>Hobbies</label>
                        <input
                        className="globalInputs"
                        name="hobbies"
                        id="hobbies"
                        label="hobbies" 
                        placeholder="Enter title here..." 
                        onKeyPress={handleKeyPressHobbies}
                        />
                        {hobbiesData && <aside>
                            {hobbiesData?.map((name, index) => (
                              <ButtonGlobal title="" bgColor="border" width="auto" size="small"  key={index}>
                                {name}
                                <b onClick={()=> removeHobbies(index)}>X</b>
                              </ButtonGlobal>
                            ))}
                          </aside>}
                          {/* {errors?.sections && <ErrorBox title={errors?.sections} />} */}
         </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Emp ID" 
          id="emp_id"
          name="emp_id"
          type="number"
          value={formData.emp_id}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
         {/* {errors?.emp_id && <ErrorBox title={errors?.emp_id} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Work schedule" 
          id="work_schedule"
          name="work_schedule"
          value={formData.work_schedule}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.work_schedule && <ErrorBox title={errors?.work_schedule} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Job description" 
          id="job_description"
          name="job_description"
          value={formData.job_description}
          placeholder="Type Job description here" 
          onChange={handleChange} 
          fieldname="textarea"
          height="medium" 
        />
         {/* {errors?.job_description && <ErrorBox title={errors?.job_description} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Performance evaluations" 
          id="performance_evaluations"
          name="performance_evaluations"
          value={formData.performance_evaluations}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.performance_evaluations && <ErrorBox title={errors?.performance_evaluations} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Disciplinary actions" 
          id="disciplinary_actions"
          name="disciplinary_actions"
          value={formData.disciplinary_actions}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.disciplinary_actions && <ErrorBox title={errors?.disciplinary_actions} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Reason for termination" 
          id="reason_for_termination"
          name="reason_for_termination"
          value={formData.reason_for_termination}
          placeholder="Type Reason for termination here" 
          onChange={handleChange}  
          fieldname="textarea"
          height="medium" 
        />
         {/* {errors?.reason_for_termination && <ErrorBox title={errors?.reason_for_termination} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Salary amount" 
          id="salary_amount"
          type="number"
          name="salary_amount"
          value={formData.salary_amount}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
         {/* {errors?.salary_amount && <ErrorBox title={errors?.salary_amount} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Pay frequency" 
          id="pay_frequency"
          type="number"
          name="pay_frequency"
          value={formData.pay_frequency}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
         {/* {errors?.pay_frequency && <ErrorBox title={errors?.pay_frequency} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Bank name" 
          id="bank_name"
          name="bank_name"
          value={formData.bank_name}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.bank_name && <ErrorBox title={errors?.bank_name} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Account number" 
          id="account_number"
          name="account_number"
          type="number"
          value={formData.account_number}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
         {/* {errors?.account_number && <ErrorBox title={errors?.account_number} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="IFCS Code" 
          id="ifcs_code"
          name="ifcs_code"
          value={formData.ifcs_code}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.ifcs_code && <ErrorBox title={errors?.ifcs_code} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Routing number" 
          id="routing_number"
          name="routing_number"
          type="number"
          value={formData.routing_number}
          placeholder="Type number here" 
          onChange={handleChange}  
        />
         {/* {errors?.routing_number && <ErrorBox title={errors?.routing_number} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="TAX Information" 
          id="tax_information"
          name="tax_information"
          value={formData.tax_information}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.tax_information && <ErrorBox title={errors?.tax_information} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Retirement plan information" 
          id="retirement_plan_information"
          name="retirement_plan_information"
          // type="number"
          value={formData.retirement_plan_information}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.retirement_plan_information && <ErrorBox title={errors?.retirement_plan_information} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Insurance information" 
          id="insurance_information"
          name="insurance_information"
          value={formData.insurance_information}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.insurance_information && <ErrorBox title={errors?.insurance_information} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Background check results" 
          id="background_check_results"
          name="background_check_results"
          value={formData.background_check_results}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.background_check_results && <ErrorBox title={errors?.background_check_results} />} */}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Drug test results" 
          id="drug_test_results"
          name="drug_test_results"
          value={formData.drug_test_results}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.drug_test_results && <ErrorBox title={errors?.drug_test_results} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Driving record" 
          id="driving_record"
          name="driving_record"
          value={formData.driving_record}
          placeholder="Type text here" 
          onChange={handleChange}  
        />
         {/* {errors?.driving_record && <ErrorBox title={errors?.driving_record} />} */}
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

export default EditTeacher;