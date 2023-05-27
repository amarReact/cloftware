
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
import { CheckBoxGlobal } from "../../component/CheckBoxGlobal";
import reactSelect from "react-select";

const EditTeacher = ({techId, setIsEdit, className}) =>{

  const [studentDetailData, setStudentDetailData] = useState([])
  const [isTitleMr, setIsTitleMr] = useState("")
  const [startDob, setStartDob] = useState(new Date());
  const [dateHiring, setDateHiring] = useState(new Date());
  const [isGender, setIsGender] = useState("")
  const [isMaritalStatus, setIsMaritalStatus] = useState("")
  const [hindiChecked, setHindiChecked] = useState(false);
  
  const [languagesSpoken, setLanguagesSpoken] = useState([])

  const genderOptions =[
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]   

  const languages = ["hindi", "english", "others"]


  const studentDetailFunc = async () => {
    try {
    const response = await axios.post(`${BASE_URL}/teacher/get_teacher_details`, {
      teacher_id: techId
    });
   
    setStudentDetailData(response?.data?.body)
    setFormData({...formData, 
      // first_name : response?.data?.body?.other_details?.first_name, 
      // last_name: response?.data?.body?.other_details?.last_name,
      // email: response?.data?.body?.email_id,
      // city: response?.data?.body?.stu_city,
      // state: response?.data?.body?.stu_state,
      // pin_code: response?.data?.body?.stu_pin_code,
      // current_address:  response?.data?.body?.stu_current_address,
      // permanent_address: response?.data?.body?.stu_permanent_address, 
      // parent_name: response?.data?.body?.parent_name, 
      // relationship_to_student: response?.data?.body?.relationship_to_student, 
      // parent_education_level: response?.data?.body?.parent_education_level, 
      // parents_occupations: response?.data?.body?.parents_occupations, 
      // registration_source: response?.data?.body?.registration_source, 
      // phone_number: response?.data?.body?.phone_number,  
      // parent_income: response?.data?.body?.parent_income,  
      // emg_contact_number: response?.data?.body?.emg_contact_number,  
      // emg_contact_name: response?.data?.body?.emg_contact_name,  
      // emg_email_id: response?.data?.body?.emg_email_id,  
      // emg_relationship_to_student: response?.data?.body?.emg_relationship_to_student,  
      teacher_id: techId,
      school_id: "22",
      email: response?.data?.body?.email_id,
      // title: response?.data?.body?.title,
      first_name: response?.data?.body?.first_name,
      last_name: response?.data?.body?.first_name,
      // dob: formatDate(response?.data?.body?.dob),
      // gender: response?.data?.body?.gender,
      address_line1: response?.data?.body?.address_line1,
      state: response?.data?.body?.state,
      city: response?.data?.body?.city,
      pin_code: response?.data?.body?.pin_code,
      phone_number:response?.data?.body?.phone_number,
      // marital_status:response?.data?.body?.marital_status,
      job_title: response?.data?.body?.teacher_other_details?.job_title,
      // date_hiring: formatDate(response?.data?.body?.date_hiring),
      employment_status:response?.data?.body?.teacher_other_details?.employment_status,
      languages_spoken:response?.data?.body?.languages_spoken,
      
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
      skills: response?.data?.body?.skills, 
      interests: response?.data?.body?.interests, 
      hobbies: response?.data?.body?.hobbies, 
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
      
      // setIsTitleMr()
      nationality: "Indian",
      country: "Indian"
    }) 

    setIsTitleMr({ value: response?.data?.body?.title, label: response?.data?.body?.title })
    setIsGender({ value: response?.data?.body?.gender, label: response?.data?.body?.gender })
    setIsMaritalStatus({ value: response?.data?.body?.marital_status, label: response?.data?.body?.marital_status })
    setStartDob(new Date(response?.data?.body?.dob));
    setDateHiring(new Date(response?.data?.body?.teacher_other_details?.date_hiring))
    setLanguagesSpoken(response?.data?.body?.languages_spoken?.split(","))
    // setStartDob(new Date(response?.data?.body?.stu_dob))
    // setIsGender(response?.data?.body?.stu_gender)

    } catch (error) {
      console.log(error);
    }
  }

  const formList = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email:'',
    // gender: '',
    phone_number: '',
    address_line1: '',
    employment_status: '',
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
    skills: '',
    interests: '',
    hobbies: '',
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
        // if (!formData.password) {
        //   errors.password = 'Password is required';
        // } 
        if (!formData.job_title) {
          errors.job_title = 'Job Title is required';
        }  
        if (!formData.employment_status) {
          errors.employment_status = 'Employment status is required';
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
      
       
        // if (!formData.parent_education_level) {
        //   errors.parent_education_level = 'Parent education level is required';
        // }

      
        // if (!formData.registration_source) {
        //   errors.registration_source = 'Registration source required';
        // }
        if (!formData.phone_number) {
          errors.phone_number = 'Phone number required';
        }
        // if (!formData.parent_income) {
        //   errors.parent_income = 'Parent income is required';
        // }
        // if (!formData.emg_contact_number) {
        //   errors.emg_contact_number = 'Emg contact number required';
        // }
        // if (!formData.emg_contact_name) {
        //   errors.emg_contact_name = 'Emg contact name required';
        // }
        
        // if (!formData.emg_email_id) {
        //   errors.emg_email_id = 'Email is required';
        // } else if (!/\S+@\S+\.\S+/.test(formData.emg_email_id)) {
        //   errors.emg_email_id = 'Invalid email address';
        // }

        // if (!formData.emg_relationship_to_student) {
        //   errors.emg_relationship_to_student = 'Emg relationship to student required';
        // }

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

      // const changeTitleMrHandler =(val)=>{
      //   setIsTitleMr(val.value)
      // }

      // const changeMaritalStatusHandler=(val)=>{
      //   setIsMaritalStatus(val.value)
      // }

      const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD");
      };

      // const handleHindiChange = (event) => {
      //   setHindiChecked(event.target.checked);
      // };

      // const handleEnglishChange = (event) => {
      //   setEnglishChecked(event.target.checked);
      // };

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
          email: formData?.email,
          school_id: "12",
          teacher_id: techId,
          title: isTitleMr?.value,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          // password: formData?.password,
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
          employment_status:formData?.employment_status,
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
          skills: formData?.skills, 
          interests: formData?.interests, 
          hobbies: formData?.hobbies,  
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

          nationality: "Indian",
          country: "Indian"
          
        }

        axios
          .post(`${BASE_URL}/teacher/add_edit_teacher`, teacherList)
          .then((response) => {
            if(response?.status == 400 || response?.code == 400){
              toast.error(response?.data?.message, {position: "bottom-center"});
            } else{
              toast.success(response?.data?.message, {position: "bottom-center"});
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

        <li className={styles.threeIn }>
        <label>Title *</label>
      <Select 
        value={isTitleMr} 
        options={titleMrOptions} 
        onChange={option => setIsTitleMr(option)}
        // onChange={changeTitleMrHandler} 
        className="loginSelectGlb" />
        {errors?.titleMr && <ErrorBox title={errors?.titleMr} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="First Name *" 
            id="first_name" 
            name="first_name" 
            placeholder="Type Text here" 
            value={formData.first_name}
            onChange={handleChange}  
          />
          {errors?.first_name && <ErrorBox title={errors?.first_name} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Middle name" 
            id="middle_name" 
            name="middle_name" 
            placeholder="Type Text here" 
            value={formData.middle_name}
            onChange={handleChange}  
          />
          {errors?.middle_name && <ErrorBox title={errors?.middle_name} />}
        </li>


        <li className={styles.threeIn}>
          <InputFields 
            label="Last name *" 
            id="last_name" 
            name="last_name" 
            placeholder="Type Text here" 
            value={formData.last_name}
            onChange={handleChange}  
          />
          {errors?.last_name && <ErrorBox title={errors?.last_name} />}
        </li>

        <li className={styles.threeIn}>
          <InputFields 
            label="Email ID *" 
            id="email" 
            name="email" 
            text="email"
            placeholder="Type Text here" 
            value={formData.email}
            onChange={handleChange}  
          />
          {errors?.email && <ErrorBox title={errors?.email} />}
        </li>
          
        <li className={styles.threeIn }>
        <label>Gender *</label>
        <Select 
         value={isGender} 
        options={genderOptions} 
        // onChange={changeGenderHandler} 
        onChange={option => setIsGender(option)}
        className="loginSelectGlb" />
        {errors?.gender && <ErrorBox title={errors?.gender} />}
        </li>

        {/* <li className={styles.threeIn}>
          <InputFields 
            label="Password *" 
            id="password" 
            name="password" 
            type="password"
            placeholder="Type Text here" 
            value={formData.password}
            onChange={handleChange}  
          />
          {errors?.password && <ErrorBox title={errors?.password} />}
        </li> */}

        <li className={styles.threeIn }>
            <label>Date of Birth *</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={startDob} onChange={(date) => setStartDob(date)} />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Phone number *" 
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.phone_number && <ErrorBox title={errors?.phone_number} />}
        </li>

        <li className={styles.threeIn }>
        <label>Marital Status *</label>
        <Select 
        value={isMaritalStatus} 
        options={maritalStatusOptions} 
        // onChange={changeMaritalStatusHandler} 
        onChange={option => setIsMaritalStatus(option)}
        className="loginSelectGlb" />
        {errors?.maritalStatus && <ErrorBox title={errors?.maritalStatus} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="State *" 
          id="state"
          name="state"
          value={formData.state}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.state && <ErrorBox title={errors?.state} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="City *" 
          id="city"
          name="city"
          value={formData.city}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.city && <ErrorBox title={errors?.city} />}
        </li>
        <li className={styles.threeIn }>
        <InputFields 
          label="Pincode *" 
          id="pin_code"
          name="pin_code"
          value={formData.pin_code}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.pin_code && <ErrorBox title={errors?.pin_code} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Address *" 
          id="address_line1"
          name="address_line1"
          value={formData.address_line1}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.address_line1 && <ErrorBox title={errors?.address_line1} />}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Job title *" 
          id="job_title"
          name="job_title"
          value={formData.job_title}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.job_title && <ErrorBox title={errors?.job_title} />}
        </li>


        <li className={styles.threeIn }>
           <label>languages spoken *</label>
           <hgroup className={styles.checkBoxCustome}>
            {languages.map((item, ind)=>{
               return (
                <button className={languagesSpoken.includes(item) && styles.activated} onClick={()=> handleCheckboxChange(item)} key={item}>
                  <span></span>{item}
               </button>
               )
            })}
            
           {/* <CheckBoxGlobal
                  className={styles.checkbox}
                  title="Hindi"
                  id="hindi"
                  name="hindi"
                  checked={hindiChecked}
                  onChange={()=> handleCheckboxChange("hindi")}
            />
            <CheckBoxGlobal
                  className={styles.checkbox}
                  title="English"
                  id="english"
                  name="english"
                  checked={englishChecked}
                  onChange={()=> handleCheckboxChange("english") }
            /> */}
           </hgroup>
          {errors?.language && <ErrorBox title={errors?.language} />}
        </li>

        {/* <li className={styles.threeIn }>
        <label>Hiring Date *</label>
        <Select options={maritalStatusOptions} onChange={changeMaritalStatusHandler} className="loginSelectGlb" />
        {errors?.maritalStatus && <ErrorBox title={errors?.maritalStatus} />}
        </li> */}

        <li className={styles.threeIn }>
            <label>Hiring Date *</label>
            <DatePicker dateFormat="yyyy-MM-dd"  className="datePicker" selected={dateHiring} onChange={(date) => setDateHiring(date)} />
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Employment status *" 
          id="employment_status"
          name="employment_status"
          value={formData.employment_status}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {errors?.employment_status && <ErrorBox title={errors?.employment_status} />}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Social security number" 
          id="social_security_number"
          name="social_security_number"
          value={formData.social_security_number}
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {/* {errors?.teaching_certifications && <ErrorBox title={errors?.teaching_certifications} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Previous teaching experience" 
          id="previous_teaching_experience"
          type="number"
          name="previous_teaching_experience"
          value={formData.previous_teaching_experience}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
          {/* {errors?.previous_teaching_experience && <ErrorBox title={errors?.previous_teaching_experience} />} */}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Address" 
          id="address_line2"
          name="address_line2"
          value={formData.address_line2}
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.professional_development_goals && <ErrorBox title={errors?.professional_development_goals} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Skills" 
          id="skills"
          name="skills"
          value={formData.skills}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.skills && <ErrorBox title={errors?.skills} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Interests" 
          id="interests"
          name="interests"
          value={formData.interests}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.interests && <ErrorBox title={errors?.interests} />} */}
        </li>


        <li className={styles.threeIn }>
        <InputFields 
          label="Hobbies" 
          id="hobbies"
          name="hobbies"
          value={formData.hobbies}
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.hobbies && <ErrorBox title={errors?.hobbies} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Emp ID" 
          id="emp_id"
          name="emp_id"
          type="number"
          value={formData.emp_id}
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.job_description && <ErrorBox title={errors?.job_description} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="Performance evaluations" 
          id="performance_evaluations"
          name="performance_evaluations"
          value={formData.performance_evaluations}
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
          onChange={handleChange}  
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
          onChange={handleChange}  
        />
         {/* {errors?.account_number && <ErrorBox title={errors?.account_number} />} */}
        </li>

        <li className={styles.threeIn }>
        <InputFields 
          label="IFCS Code" 
          id="ifcs_code"
          name="ifcs_code"
          type="number"
          value={formData.ifcs_code}
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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
          placeholder="Type Text here" 
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